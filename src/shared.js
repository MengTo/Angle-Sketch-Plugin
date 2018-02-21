const _SharedModule = true;

const Angle = require('./Angle');
const SymbolicAngle = require('./SymbolicAngle');
const ShapeAngle = require('./ShapeAngle');
const PixelDensity = require('./PixelDensity');
const CompressionRatio = require('./CompressionRatio');

Angle.angleFor = function (options = {}) {

    let angleInstance;

    if (options.selectedLayer.class() == MSSymbolInstance) {
        angleInstance = new SymbolicAngle(options);

        if (angleInstance.targetLayer == null) {
            context.document.showMessage("This does not seem to be a supported symbol.");
            print("🛑 Unable to retrieve target for override");
            return null
        }
    } else if (options.selectedLayer.class() == MSShapeGroup) {
        angleInstance = new ShapeAngle(options);

    } else {
        context.document.showMessage("Angle only supports shapes and symbols.");
        return null
    }

    if (!angleInstance.pointsAreValid) {
        context.document.showMessage("There seems to be an issue with the shape we are trying to apply.");
        return null
    }

    return angleInstance;
}

Array.fromNSArray = function (NSArray) {
    let array = []
    for (var i = 0; i < NSArray.count(); i++) { array.push(NSArray[i]) }
    return array
}

export function compareByRatioAndAlphabet (a, b) {
    let reference = 3/4;

    let artboardSizeA = a.frame();
    let artboardSizeB = b.frame();

    let artboardARatio = artboardSizeA.width() / artboardSizeA.height();
    if (artboardARatio > 1) { artboardARatio = 1/artboardARatio; }

    let arboardARatioDifference = Math.abs(reference - artboardARatio);

    let artboardBRatio = artboardSizeB.width() / artboardSizeB.height();
    if (artboardBRatio > 1) { artboardBRatio = 1/artboardBRatio; }

    let arboardBRatioDifference = Math.abs(reference - artboardBRatio);

    if (arboardARatioDifference == arboardBRatioDifference) {
        return a.name() > b.name()
    }

    return arboardARatioDifference > arboardBRatioDifference;
}

function createLabel(text, size, frame) {
    var label = NSTextField.alloc().initWithFrame(frame);

    label.setStringValue(text);
    label.setFont(NSFont.boldSystemFontOfSize(size));
    label.setBezeled(false);
    label.setDrawsBackground(false);
    label.setEditable(false);
    label.setSelectable(false);

    return label;
}

export function loadLocalImage (context, filePath) {

    let basePath = context.scriptPath
      .stringByDeletingLastPathComponent()
      .stringByDeletingLastPathComponent()
      .stringByDeletingLastPathComponent();
  
    if(!NSFileManager.defaultManager().fileExistsAtPath(basePath + "/" + filePath)) {
        print("File does not exist at path");
        return null;
    }
  
    print("Image loaded");
  
    return NSImage.alloc().initWithContentsOfFile(basePath + "/" + filePath);
  }

function popUpButtonsforRectangleIndexer_withTitleIndexer_andImageIndexer_defaultSelected_onIndex (rectangle, titles, images, index) {

    let button = NSPopUpButton.alloc().initWithFrame(rectangle(index));
    button.addItemsWithTitles(titles);
    button.imageScaling = NSImageScaleProportionallyUpOrDown;

    if (images != null) {
        images.forEach(function (a, i, as) {
            let item = button.itemAtIndex(i);
            item.image = a;
        });
    }

    return button
}

function smallImagesFromArtboard (artboard) {

    let layerAncestry = MSImmutableLayerAncestry.alloc().initWithMSLayer(artboard);
    let artboardWidth = artboard.frame().width();
    let arboardHeight = artboard.frame().height();
    let biggerDimention = artboardWidth > arboardHeight ? artboardWidth : arboardHeight;
    let exportScale = 48/biggerDimention;
    let exportFormat = MSExportFormat.formatWithScale_name_fileFormat(exportScale, "", "png");
    let exportRequest = MSExportRequest.exportRequestsFromLayerAncestry_exportFormats(layerAncestry, [exportFormat]).firstObject();
    let exporter = MSExporter.exporterForRequest_colorSpace(exportRequest, NSColorSpace.sRGBColorSpace());
    let imageData = exporter.bitmapImageRep().TIFFRepresentation();
    let nsImage = NSImage.alloc().initWithData(imageData);
    return nsImage;
}

export function getSelectionAndOptions_forAngleInstances(artboards, angles) {

    let anglesCount = angles.length;

    let array = Array.from({ length: anglesCount }, (x, i) => i);

    if (artboards === null || artboards.length < 1) {
        return {
        alertOption: NSAlertFirstButtonReturn,
        artboardSelections:     array.map((a,i,as) => { indexOfSelectedItem: () => 0 }),
        densitySelections:      array.map((a,i,as) => { indexOfSelectedItem: () => 0 }),
        compressionSelections:  array.map((a,i,as) => { indexOfSelectedItem: () => 0 }),
        };
    }

    //show a native popup box
    var alert = NSAlert.alloc().init();
    var alertContent = NSView.alloc().init();

    alert.setMessageText("Apply Mockup");
    alert.setInformativeText("Choose an Artboard to apply into the selected shape.");
    alert.addButtonWithTitle("Apply");
    alert.addButtonWithTitle("Cancel");
    // alert.icon = angleLogo;

    var movingYPosition = 0;
    var labelHeight = 16;

    var fisrtColumnWidth = 260;
    var secondColumnWidth = 90;
    var thirdColumnWidth = 90;

    const windowWidth = fisrtColumnWidth + secondColumnWidth + thirdColumnWidth;

    var rectangle;

    // Artboard selection element

    rectangle = NSMakeRect(0, 0, fisrtColumnWidth, labelHeight);
    var artboardLabel = createLabel("Artboard", 12, rectangle);
    alertContent.addSubview(artboardLabel);

    rectangle = NSMakeRect(fisrtColumnWidth, 0, secondColumnWidth, labelHeight);
    var densityLabel = createLabel("Pixel Density", 12, rectangle);
    alertContent.addSubview(densityLabel);

    rectangle = NSMakeRect(fisrtColumnWidth + secondColumnWidth, 0, thirdColumnWidth, labelHeight);
    var compressionLabel = createLabel("Quality", 12, rectangle);
    alertContent.addSubview(compressionLabel);

    let spacing = array.length > 1 ? 50 : 28;

    if (array.length > 1) {
        let targetLabels = array.map( function (a, i, as) {
            let rectangle = NSMakeRect(0, labelHeight + 4 + (spacing * i), fisrtColumnWidth, labelHeight);
            let label = createLabel(angles[i].targetLayer.name(), 12, rectangle);
    
            return label
        });
        targetLabels.forEach( (a) => alertContent.addSubview(a));
    }

    let artboardNames = artboards.map((a) => a.name());
    let artboardImages = artboards.map((a) => smallImagesFromArtboard(a));
    let artboardSelections = array.map( (a,index,as) => popUpButtonsforRectangleIndexer_withTitleIndexer_andImageIndexer_defaultSelected_onIndex (
        ((i) => NSMakeRect(0, labelHeight + 4 + (spacing * i) + 16, fisrtColumnWidth, 28)),
        artboardNames, artboardImages, index
    ));
    artboardSelections.forEach( (a) => alertContent.addSubview(a));

    let pixelDensityNames = PixelDensity.map((a) => a.selectionLabel);
    let pixelDensitySelections = array.map( (a,index,as) => popUpButtonsforRectangleIndexer_withTitleIndexer_andImageIndexer_defaultSelected_onIndex (
        ((i) => NSMakeRect(fisrtColumnWidth, labelHeight + 4 + (spacing * i) + 16, secondColumnWidth, 28)),
        pixelDensityNames, null, index
    ));
    pixelDensitySelections.forEach( (a) => alertContent.addSubview(a));

    let compressionRatioNames = Object.values(CompressionRatio).map((a) => a.selectionLabel);
    let compressionRatioSelections = array.map( (a,index,as) => popUpButtonsforRectangleIndexer_withTitleIndexer_andImageIndexer_defaultSelected_onIndex (
        ((i) => NSMakeRect(fisrtColumnWidth + secondColumnWidth, labelHeight + 4 + (spacing * i) + 16, thirdColumnWidth, 28)),
        compressionRatioNames, null, index
    ));
    compressionRatioSelections.forEach( (a) => alertContent.addSubview(a));

    movingYPosition = labelHeight + 4 + (spacing * anglesCount) + 28;

    // Render those label, dropdown etc into the Alert view
    alertContent.frame = NSMakeRect(0, 0, windowWidth, movingYPosition);

    // Reverse order of the content elements
    alertContent.setFlipped(true);

    alert.accessoryView = alertContent;

    // With this will run the modal and return a reference to the selection element
    return {
        alertOption: alert.runModal(),
        artboardSelections: artboardSelections,
        densitySelections: pixelDensitySelections,
        compressionSelections: compressionRatioSelections,
    }
}
