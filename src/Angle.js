// ---------------------------------
// SKETCH MNEMONIC ENUMS
// ---------------------------------

const StyleFillType = { solid: 0, gradient: 1, pattern: 4, noise: 5 };

class Angle {

    static angleFor(options = {}) {

        let angleInstance;
        
        if (options.selectedLayer.class() == MSSymbolInstance) {
            angleInstance = new SymbolicAngle(options)
        } else {
            angleInstance = new ShapeAngle(options)
        }

        if (!angleInstance.validatePoints()) {
            return null
        }

        angleInstance.context = options.context;

        if (options.artboard != null) {
            angleInstance.artboard = options.artboard;
        } else {
            angleInstance.loadPersistentData();
        }

        angleInstance.imageData = angleInstance.retrieveImageData();

        angleInstance.imprintPersistenceData();

        return angleInstance;
    }

    imprintValue_forKey(value, key) {
        if (this.selectedLayer == null) {
            print("🛑 Imprinting value before selected layer assignment");
            return
        }
        this.context.command.setValue_forKey_onLayer(value, key, this.selectedLayer);
    }

    imprintValues_forKeys(dictionary) {
        for (let [key, value] of Object.entries(dictionary)) {
            this.imprintValue_forKey(key, dictionary[key]);
        }
    }

    imprintPersistenceData() {
        this.imprintValue_forKey(this.artboard.objectID(), "artboard-id");
        this.imprintValue_forKey(this.pixelDensity, "pixel-density");
        this.imprintValue_forKey(this.rotation, "rotation");
        this.imprintValue_forKey(this.reversed, "reversed");
    }

    loadPersistentData() {
        let artboardID = this.context.command.valueForKey_onLayer("artboard-id", this.selectedLayer);
        let artboards = this.context.document.artboards();

        for (let index = 0; index < artboards.count(); index++) {
            if (artboards[index].objectID() == artboardID) {
                this.artboard = artboards[index];
            }
        }

        if (this.artboard == null) {
            print("🛑 Not able to retrieve artboard from id in document");
        }

        this.rotation = this.context.command.valueForKey_onLayer("rotation", this.selectedLayer);
        this.reversed = this.context.command.valueForKey_onLayer("reversed", this.selectedLayer) == 0 ? false : true;
        this.pixelDensity = this.context.command.valueForKey_onLayer("pixel-density", this.selectedLayer);
    }

    constructor (options = {}) {

        options.rotation = options.rotation || 0;
        options.reversed = options.reversed || false;
        options.pixelDensity = options.pixelDensity || 2;
        
        this.rotation = options.rotation;
        this.reversed = options.reversed;
        this.pixelDensity = options.pixelDensity;

        this.selectedLayer = options.selectedLayer;
    }

    retrieveImageData () {

        let layerAncestry = MSImmutableLayerAncestry.alloc().initWithMSLayer(this.artboard);      
        let exportFormat = MSExportFormat.formatWithScale_name_fileFormat(this.pixelDensity, "Angle", "jpg");
        let exportRequest = MSExportRequest.exportRequestsFromLayerAncestry_exportFormats(layerAncestry, [exportFormat]).firstObject();
        let exporter = MSExporter.exporterForRequest_colorSpace(exportRequest, NSColorSpace.sRGBColorSpace());
      
        return exporter.bitmapImageRep().TIFFRepresentation();
    }

    validatePoints() {
        let points = this.pointsFromBezierPath();
        let length = points.length;

        if (length != 7) { // Not a quadrilater

            if (length > 7) {
            context.document.showMessage("Maybe your shape has too many sides.");
            return false
            }
        
            if (length < 7) {
            context.document.showMessage("Maybe your shape does not have enought sides.");
            return false
            }
        }

        // If the shape is an X crossing shape, fail
        // If two or more points coincide, fail

        // There seems to be something wrong with your shape 😕

        return true
    }

    pointsFromBezierPath () {

        let count = this.targetPath.elementCount();

        let array = Array.from({ length: count }, (x, i) => i);

        return array.map(
            (a, i, as) => {
            var pointsPointer = MOPointer.alloc().initWithValue_(CGPointMake(0, 0));
            var element = this.targetPath.elementAtIndex_associatedPoints_(i, pointsPointer);

            let point = pointsPointer.value();

            return point
            }
        );
    }

    normalizedVector () {

        rawPoints = this.pointsFromBezierPath();
        horizontalRatio = this.pixelDensity;
        verticalRatio = this.pixelDensity;

        let minimumX = rawPoints.reduce(((p, a, i, as) => p > a.x ? a.x : p), rawPoints[0].x);
        let minimumY = rawPoints.reduce(((p, a, i, as) => p > a.y ? a.y : p), rawPoints[0].y);
        let maximumY = rawPoints.reduce(((p, a, i, as) => p < a.y ? a.y : p), rawPoints[0].y);
    
        return rawPoints.map(
            function (a, i, as) {
                let xValue = minimumX >= 0 ? a.x - minimumX : a.x + minimumX;
                let yValue = minimumY >= 0 ? a.y - minimumY : a.y + minimumY;
    
                return CIVector.vectorWithX_Y(xValue * horizontalRatio, (maximumY - minimumY - yValue) * verticalRatio);
        });
    }

    mappedIndexFor (index) {

        if (this.reversed) {
            return [0,3,2,1][(index + this.rotation) % 4];
        }
        return (index + this.rotation) % 4;
    }

    rotate () {

        this.rotation = (this.rotation + (this.reversed ? 1 : 3))%4;

        this.imprintValue_forKey(this.rotation, "rotation");
    }

    reverseSimmetry () {

        this.rotation = (this.rotation + (this.reversed ? 1 : 3))%4;

        this.reversed = !this.reversed;

        this.imprintValue_forKey(this.rotation, "rotation");
        this.imprintValue_forKey(this.reversed, "reversed");
    }

    perspectiveTransform_withPoints () {

        let sourceImage = this.imageData;

        let points = this.normalizedVector();

        let perspectiveTransform = CIFilter.filterWithName("CIPerspectiveTransform");
        
        perspectiveTransform.setValue_forKey(points[this.mappedIndexFor(0)], "inputTopLeft");
        perspectiveTransform.setValue_forKey(points[this.mappedIndexFor(1)], "inputTopRight");
        perspectiveTransform.setValue_forKey(points[this.mappedIndexFor(2)], "inputBottomRight");
        perspectiveTransform.setValue_forKey(points[this.mappedIndexFor(3)], "inputBottomLeft");
    
        let imageBitmap = NSBitmapImageRep.imageRepWithData(sourceImage);
        let image = CIImage.alloc().initWithBitmapImageRep(imageBitmap);
    
        perspectiveTransform.setValue_forKey(image, "inputImage");
    
        let perspectiveImage = perspectiveTransform.valueForKey("outputImage");
    
        if (!perspectiveImage) {
            print("There is no image");
            return
        }
    
        let representation = NSCIImageRep.imageRepWithCIImage(perspectiveImage);
        let transformedImage = NSImage.alloc().initWithSize(representation.size());
        transformedImage.addRepresentation(representation);
    
        return transformedImage
    }
}

class SymbolicAngle extends Angle {
    constructor (options = {}) {
        super(options);
  
        const existingOverrides = this.selectedLayer.overrides() || NSDictionary.dictionary();
        const overrides = NSMutableDictionary.dictionaryWithDictionary(existingOverrides);
    
        let availableOverrides = this.selectedLayer.availableOverrides();
        this.imageOverride = availableOverrides.reduce ( function (p, a, i, as) {
            if (a.currentValue().class() == MSImageData) { return a }
            return p
        }, nil);
    
        this.targetLayer = this.imageOverride.affectedLayer();
    
        this.targetPath = this.targetLayer.bezierPath();
    }

    addImageFill () {

        let transformedImage = this.perspectiveTransform_withPoints();

        let image = MSImageData.alloc().initWithImage_(transformedImage);

        let objectID = this.targetLayer.objectID();

        const existingOverrides = this.selectedLayer.overrides() || NSDictionary.dictionary();
        const overrides = NSMutableDictionary.dictionaryWithDictionary(existingOverrides);

        overrides.setObject_forKey(image, objectID);

        this.selectedLayer.overrides = overrides;
    }
}

class ShapeAngle extends Angle {
    constructor (options = {}) {
        super(options);

        this.targetLayer = this.selectedLayer;

        this.targetPath = this.selectedLayer.bezierPath();
    }

    addImageFill () {

        let transformedImage = this.perspectiveTransform_withPoints();

        let image = MSImageData.alloc().initWithImage_(transformedImage);

        let imageFill = MSStyleFill.alloc().init();
        imageFill.setImage(image);
        imageFill.fillType = StyleFillType.pattern;
    
        this.targetLayer.style().addStyleFill(imageFill);
    }
}

module.exports = Angle
