const Angle = require('./Angle');

const PixelDensities = [
    { title: "Auto", selectionLabel: "Auto" },
    { title: "1x", selectionLabel: "1x" },
    { title: "2x", selectionLabel: "2x" },
    { title: "3x", selectionLabel: "3x" },
    { title: "4x", selectionLabel: "4x" },
  ]

  const CompressionRatio = {
    best: {
      selectionLabel: "Best",
      ratio: 1.0
    },
    better: {
      selectionLabel: "Better",
      ratio: 0.9
    },
    good: {
      selectionLabel: "Good",
      ratio: 0.8
    },
    average: {
      selectionLabel: "Average",
      ratio: 0.7
    }
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

function loadLocalImage(context, filePath) {

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

const angleLogo = loadLocalImage(context, "/Contents/Resources/logo.png");

function getSelectionAndOptions_forAngleInstances(artboards, anglesCount) {

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
    alert.icon = angleLogo;
  
    var movingYPosition = 0;
    var labelHeight = 16;
  
    var fisrtColumnWidth = 180;
    var secondColumnWidth = 130;
    var thirdColumnWidth = 130;
  
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

    let artboardNames = artboards.map((a) => a.name());
    let artboardImages = artboards.map(function (a, i ,as) {
      let layerAncestry = MSImmutableLayerAncestry.alloc().initWithMSLayer(a);
      let artboardWidth = a.frame().width()
      let arboardHeight = a.frame().height();
      let biggerDimention = artboardWidth > arboardHeight ? artboardWidth : arboardHeight;
      let exportScale = 32/biggerDimention;
      let exportFormat = MSExportFormat.formatWithScale_name_fileFormat(exportScale, "", "png");
      let exportRequest = MSExportRequest.exportRequestsFromLayerAncestry_exportFormats(layerAncestry, [exportFormat]).firstObject();
      let exporter = MSExporter.exporterForRequest_colorSpace(exportRequest, NSColorSpace.sRGBColorSpace());
      let imageData = exporter.bitmapImageRep().TIFFRepresentation();
      let nsImage = NSImage.alloc().initWithData(imageData);
      return nsImage;
    });
  
    // Artboard Selection
  
    let artboardSelections = array.map(function (a,i,as) {
      
      let rectangle = NSMakeRect(0, labelHeight + 4 + (28 * i), fisrtColumnWidth, 28);
      let button = NSPopUpButton.alloc().initWithFrame(rectangle);
      button.addItemsWithTitles(artboardNames);
      button.selectItemAtIndex(0);
      
      artboardImages.forEach(function (a, i, as) {
        let item = button.itemAtIndex(i);
        item.image = a;
      });
  
      alertContent.addSubview(button);
  
      return button;
    });
  
    // Pixel Density Selection
  
    let pixelDensitySelections = array.map(function (a,i,as) {
      
      let rectangle = NSMakeRect(fisrtColumnWidth, labelHeight + 4 + (28 * i), secondColumnWidth, 28);
      let button = NSPopUpButton.alloc().initWithFrame(rectangle);
      button.addItemsWithTitles(PixelDensities.map((a) => a.selectionLabel));
      button.selectItemAtIndex(0);
  
      alertContent.addSubview(button);
  
      return button;
    });
  
    // Compression Ratio Selection
  
    let compressionDensitySelections = array.map(function (a,i,as) {
      
      let rectangle = NSMakeRect(fisrtColumnWidth + secondColumnWidth, labelHeight + 4 + (28 * i), thirdColumnWidth, 28);
      let button = NSPopUpButton.alloc().initWithFrame(rectangle);
      button.addItemsWithTitles(Object.values(CompressionRatio).map((a) => a.selectionLabel));
      button.selectItemAtIndex(0);
  
      alertContent.addSubview(button);
  
      return button;
    });
  
    movingYPosition = labelHeight + 4 + (28 * anglesCount) + 28;
  
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
      compressionSelections: compressionDensitySelections,
    }
  }

const compareByRatioAndAlphabet = function (a, b) {
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

class BlindAngle extends Angle {
    constructor (options = {}) {
        super(options);

        this.targetPath = this.targetLayer.bezierPath();
        this.overrideLayer = options.overrideLayer;
    }

    estimatePixelDensity () {

        // Best guess of a 2x sampling of the image if the mockup is in it's original scale

        let [layerWidth, layerHeight] = this.maximumVerticesWidthAndHeight();
        
        let widthRatio = this.selectedLayer.rect().size.width * layerWidth / (this.selectedLayer.naturalSize().width * this.artboard.rect().size.width);
        let heightRatio = this.selectedLayer.rect().size.height * layerHeight / (this.selectedLayer.naturalSize().height * this.artboard.rect().size.height);
        
        let estimate = widthRatio > heightRatio ? widthRatio : heightRatio;
        
        return estimate;
    }

    loadValueForKey (key) {
        return super.loadValueForKey(this.targetLayer.objectID() + "-" + key);
    }

    imprintValue_forKey (value, key) {
        super.imprintValue_forKey(value, this.targetLayer.objectID() + "-" + key);
    }

    applyImage () {

        const existingTopOverrides = this.selectedLayer.overrides() || NSDictionary.dictionary();
        const topOverrides = NSMutableDictionary.dictionaryWithDictionary(existingTopOverrides);

        const overrideBranchAddress = (this.overrideLayer + "").replace("_symbolID", "");
        
        let overrideBranch = NSMutableDictionary.dictionary();

        const objectID = this.targetLayer.objectID();
        overrideBranch.setObject_forKey(this.transformedImage, objectID)
        topOverrides.setObject_forKey(overrideBranch, overrideBranchAddress)

        this.selectedLayer.overrides = topOverrides;
    }
}

const NSArrayIntoArray = function (NSArray) {
    let array = []
    for (var i = 0; i < NSArray.count(); i++) { array.push(NSArray[i]) }
    return array
}

function symbolDictionaryFor(context) {
    let symbolMasters = context.document.documentData().allSymbols().reverse();
    let symbolMasterDictionary = symbolMasters.reduce(function (p, a, i, as) {
        p[a.objectID()] = a;
        return p
    }, {});
    return symbolMasterDictionary
}

export default function (context) {

    let selectedLayersNSArray = context.selection;
    
    if (selectedLayersNSArray == null) {
        context.document.showMessage("Select an Angle Composition.");
        return
    }
    if (selectedLayersNSArray.count() != 1) {
        context.document.showMessage("Select only one Angle Composition.");
        return
    }

    let selectedLayer = selectedLayersNSArray[0];
    let angleInstance;

    if (selectedLayer.class() != MSSymbolInstance) { return }

    let allAvailableOverridesNSArray = selectedLayer.availableOverrides();
    let allAvailableOverrides = NSArrayIntoArray(allAvailableOverridesNSArray);

    let angles = allAvailableOverrides
        .map ( a => a.children() )
        .map ( NSArrayIntoArray )
        .reduce ( (p, a) => p.concat(a), [] )
        .filter ( function (a) { return a.class() == MSAvailableOverride } )
        .map ( function (a) {

            let angleInstance = new BlindAngle ({
                overrideLayer: a.overridePoint().parent(),
                targetLayer: a.affectedLayer(),
                selectedLayer: selectedLayer,
                context: context
            });

            if (!angleInstance.pointsAreValid) { return null }
            return angleInstance
        })
        .filter ( a => a != null );

    let parentArtboard = selectedLayer.parentArtboard();
    let artboardsNSArray = context.document.artboards();
    let artboards = NSArrayIntoArray(artboardsNSArray)
        .filter( a => a != parentArtboard );

    artboards.sort(compareByRatioAndAlphabet);

    if (artboards.length == 0) {
        // There are no artboards
        // Explain that Angle leverages artboards
        var alert = NSAlert.alloc().init();

        // alert.showsHelp = true;
        alert.setMessageText("Angle needs an Artboard");
        alert.setInformativeText("To start using Angle, create a new Artboard that contains your screen.");
        alert.addButtonWithTitle("OK");
        alert.icon = angleLogo;

        alert.runModal();

        return
    }

    if (artboards.length == 1) {
        
        angles.forEach(function (a, i, as) {
            a.artboard = artboards[0].artboard;
            a.pixelDensity = 0;
            a.compressionRatio = 0;
        });
    } else {

        // In earlier versions of Sketch, the modal does not layout properly.
        let response = getSelectionAndOptions_forAngleInstances(artboards, angles.length);
        
        if (response.alertOption != NSAlertFirstButtonReturn) { return }

        angles.forEach(function (a, i, as) {
            let artboardSelectionIndex = response.artboardSelections[i].indexOfSelectedItem();

            a.artboard = artboards[artboardSelectionIndex];
            a.pixelDensity = response.densitySelections[i].indexOfSelectedItem();
            a.compressionRatio = response.compressionSelections[i].indexOfSelectedItem();
        });
    }

    angles.forEach(function (a, i, as) {

        // a.guessRotationAndReversion();
        a.applyImage();
    });

    context.document.showMessage("You got Angled! 📱");
}
