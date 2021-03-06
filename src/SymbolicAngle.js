import Angle from './Angle'
import { Error } from './Error'

export default class SymbolicAngle extends Angle {
    
    constructor (options = {}) {
        
        super(options);

        this.targetLayer = options.override.affectedLayer();

        if (this.targetLayer.class() === MSImmutableBitmapLayer)
            return Error.symbolWithBitMapLayer

        const sketchVersion = BCSketchInfo.shared().metadata().appVersion
        if (sketchVersion < 50) {
            this.targetPath = options.override.affectedLayer().bezierPath();
        } else if (sketchVersion < 52) {
            this.targetPath = options.override.affectedLayer().pathInFrameWithTransforms();
        }

        let parentSymbolIdentifier = options.override.overridePoint().parent()
        if (parentSymbolIdentifier !== null) {
            this.overrideLayer = parentSymbolIdentifier
        }

        if (!this.pointsAreValid) {
            return Error.unsupportedShapePath
        }
    }

    applyImage () {

        let objectID = this.targetLayer.objectID();

        const existingOverrides = this.selectedLayer.overrides() || NSDictionary.dictionary();
        const overrides = NSMutableDictionary.dictionaryWithDictionary(existingOverrides);

        overrides.setObject_forKey(this.transformedImage, objectID);

        this.selectedLayer.overrides = overrides;
    }

    estimatePixelDensity () {

        // Best guess of a 2x sampling of the image if the mockup is in it's original scale

        let [layerWidth, layerHeight] = this.maximumVerticesWidthAndHeight();
        
        let widthRatio = this.selectedLayer.rect().size.width * layerWidth / (this.selectedLayer.naturalSize().width * this.artboard.rect().size.width);
        let heightRatio = this.selectedLayer.rect().size.height * layerHeight / (this.selectedLayer.naturalSize().height * this.artboard.rect().size.height);
        
        let estimate = widthRatio > heightRatio ? widthRatio : heightRatio;
        
        return estimate;
    }

    description () {
        return this.selectedLayer.name() + " " + this.targetLayer.name();
    }
}
