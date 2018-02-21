// ---------------------------------
// CREATE LABEL ELEMENT
// ---------------------------------

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

// ---------------------------------
// GET RESPONSE FOR OPTIONS
// ---------------------------------

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

  let artboardNames = artboards.map((a) => a.name);
  let artboardImages = artboards.map(function (a, i ,as) {
    let layerAncestry = MSImmutableLayerAncestry.alloc().initWithMSLayer(a.artboard);
    let artboardWidth = a.artboard.frame().width()
    let arboardHeight = a.artboard.frame().height();
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

// ---------------------------------
// MAIN FUNCTION
// ---------------------------------

const Angle = require('./Angle');
require('./shared');

const angleLogo = loadLocalImage(context, "/Contents/Resources/logo.png");

export default function (context) {

  let selectedLayersNSArray = context.selection;

  if (selectedLayersNSArray == null) { return }

  let selectedLayers = [];

  for (var i = 0; i < selectedLayersNSArray.count(); i++) {
    selectedLayers.push({
      name: selectedLayersNSArray[i].name(),
      layer: selectedLayersNSArray[i]
    });
  }

  let angles = selectedLayers.map(function (a, i, as) {

    let angleInstance = Angle.angleFor({
      selectedLayer: a.layer,
      context: context,
    });

    return angleInstance
  }).filter( (a, i, as) => a != null );

  if (angles.length == 0) {

    // It was not possible to trigger angle for a single object
    return
  }

  // ---------------------------------
  // ARTBOARDS IN CONTEXT
  // ---------------------------------

  let parentArtboard = selectedLayers[0].layer.parentArtboard();
  let artboardsNSArray = context.document.artboards();
  let artboards = [];

  for (var i = 0; i < artboardsNSArray.count(); i++) {

    // Not list the parent artboard of the select symbol or shape
    if (artboardsNSArray[i] != parentArtboard) {
      artboards.push({ name: artboardsNSArray[i].name(), artboard: artboardsNSArray[i] });
    }
  }

  artboards.sort(function (a, b) {

    let reference = 3/4;

    let artboardSizeA = a.artboard.frame();
    let artboardSizeB = b.artboard.frame();
    
    let artboardARatio = artboardSizeA.width() / artboardSizeA.height();
    if (artboardARatio > 1) { artboardARatio = 1/artboardARatio; }

    let arboardARatioDifference = Math.abs(reference - artboardARatio);
    
    let artboardBRatio = artboardSizeB.width() / artboardSizeB.height();
    if (artboardBRatio > 1) { artboardBRatio = 1/artboardBRatio; }

    let arboardBRatioDifference = Math.abs(reference - artboardBRatio);

    if (arboardARatioDifference == arboardBRatioDifference) {
      return a.name > b.name
    }

    return arboardARatioDifference > arboardBRatioDifference;
  });

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
      a.selectedCompressionRatio = 0;
    });
  } else {

    // In earlier versions of Sketch, the modal does not layout properly.
    let response = getSelectionAndOptions_forAngleInstances(artboards, angles.count);
    // let response = { alertOption: NSAlertFirstButtonReturn, artboardSelectionElement: { indexOfSelectedItem : () => 0 }}

    if (response.alertOption != NSAlertFirstButtonReturn) { return }

    angles.forEach(function (a, i, as) {
      let artboardSelectionIndex = response.artboardSelections[i].indexOfSelectedItem();

      a.artboard = artboards[artboardSelectionIndex].artboard;
      a.pixelDensity = response.densitySelections[i].indexOfSelectedItem();
      a.compressionRatio = response.compressionSelections[i].indexOfSelectedItem();
    });
  }

  angles.forEach(function (a, i, as) {

    a.guessRotationAndReversion();
    a.applyImage();
  });

  context.document.showMessage("You got Angled! 📱");
}
