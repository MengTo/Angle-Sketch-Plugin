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

function getSelectionAlertResponseAndSelectionFor(options) {

  if (options === null || options.length < 1) {
    return { alertOption: NSAlertFirstButtonReturn, artboardSelectionElement: { indexOfSelectedItem: () => 0 } };
  }

  //show a native popup box
  var alert = NSAlert.alloc().init();
  var alertContent = NSView.alloc().init();

  alert.setMessageText("Apply Mockup");
  alert.setInformativeText("Choose an Artboard to apply into the selected shape.");
  alert.addButtonWithTitle("Apply");
  alert.addButtonWithTitle("Cancel");

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

  rectangle = NSMakeRect(0, labelHeight + 4, fisrtColumnWidth, 28);
  var popUpButton = NSPopUpButton.alloc().initWithFrame(rectangle);
  popUpButton.addItemsWithTitles(options);
  popUpButton.selectItemAtIndex(0);

  alertContent.addSubview(popUpButton);

  // Pixel density selection element
  
  rectangle = NSMakeRect(fisrtColumnWidth, 0, secondColumnWidth, labelHeight);
  var densityLabel = createLabel("Pixel Density", 12, rectangle);
  alertContent.addSubview(densityLabel);

  rectangle = NSMakeRect(fisrtColumnWidth, labelHeight + 4, secondColumnWidth, 28);
  var resolutionPopUp = NSPopUpButton.alloc().initWithFrame(rectangle);
  resolutionPopUp.addItemsWithTitles(PixelDensities.map((a) => a.selectionLabel));
  resolutionPopUp.selectItemAtIndex(0);
  alertContent.addSubview(resolutionPopUp);

  // Compression ratio selection element
    
  rectangle = NSMakeRect(fisrtColumnWidth + secondColumnWidth, 0, thirdColumnWidth, labelHeight);
  var compressionLabel = createLabel("Quality", 12, rectangle);
  alertContent.addSubview(compressionLabel);

  rectangle = NSMakeRect(fisrtColumnWidth + secondColumnWidth, labelHeight + 4, thirdColumnWidth, 28);
  var compressionPopUp = NSPopUpButton.alloc().initWithFrame(rectangle);
  compressionPopUp.addItemsWithTitles(Object.values(CompressionRatio).map((a) => a.selectionLabel));
  compressionPopUp.selectItemAtIndex(0);
  alertContent.addSubview(compressionPopUp);

  movingYPosition = CGRectGetMaxY(rectangle);

  // Render those label, dropdown etc into the Alert view
  alertContent.frame = NSMakeRect(0, 0, windowWidth, movingYPosition);

  // Reverse order of the content elements
  alertContent.setFlipped(true);

  alert.accessoryView = alertContent;

  // With this will run the modal and return a reference to the selection element
  return {
    alertOption: alert.runModal(),
    artboardSelectionElement: popUpButton,
    densitySelectionElement: resolutionPopUp,
    compressionSelectionElement: compressionPopUp,
  }
}

// ---------------------------------
// MAIN FUNCTION
// ---------------------------------

const Angle = require('./Angle');
require('./shared');


export default function (context) {

  let selectedLayers = context.selection;

  if (selectedLayers == null) { return }

  if (selectedLayers.count() != 1) {

    context.document.showMessage("Select only 1 shape at a time.");
    return
  }

  let layer = selectedLayers.firstObject();

  let angleInstance = Angle.angleFor({
    selectedLayer: layer,
    context: context,
  });

  if (angleInstance == null) { return }

  // ---------------------------------
  // ARTBOARDS IN CONTEXT
  // ---------------------------------

  let parentArtboard = layer.parentArtboard();
  let allArtboards = context.document.artboards();
  let artboards = [];

  for (var i = 0; i < allArtboards.count(); i++) {

    // Not list the parent artboard of the select symbol or shape
    if (allArtboards[i] != parentArtboard) {
      artboards.push({ name: allArtboards[i].name(), artboard: allArtboards[i] });
    }
  }

  if (artboards.length == 0) {
    // There are no artboards
    // Explain that Angle leverages artboards
    var alert = NSAlert.alloc().init();

    // alert.showsHelp = true;
    alert.setMessageText("Angle needs an Artboard");
    alert.setInformativeText("To start using Angle, create a new Artboard that contains your screen.");
    alert.addButtonWithTitle("OK");

    alert.runModal();

    return
  }

  // TODO: Sort and filter artboards by relevance

  let selectedArtboard;
  let selectedPixelDensity;
  let selectedCompressionRatio;

  if (artboards.length == 1) {

    selectedArtboard = artboards[0].artboard;
    selectedPixelDensity = 0;
    selectedCompressionRatio = 0;
  } else {

    var artboardNames = artboards.map((a) => a.name);
    var resolutions = [];

    // In earlier versions of Sketch, the modal does not layout properly.
    let response = getSelectionAlertResponseAndSelectionFor(artboardNames);
    // let response = { alertOption: NSAlertFirstButtonReturn, artboardSelectionElement: { indexOfSelectedItem : () => 0 }}

    if (response.alertOption != NSAlertFirstButtonReturn) { print("Close"); return }

    // Get the index of the selected option in dropdown
    var artboardSelectionIndex = response.artboardSelectionElement.indexOfSelectedItem();
    var densitySelectionIndex = response.densitySelectionElement.indexOfSelectedItem();
    var compressionSelectionIndex = response.compressionSelectionElement.indexOfSelectedItem();

    selectedArtboard = artboards[artboardSelectionIndex].artboard;
    selectedPixelDensity = densitySelectionIndex;
    selectedCompressionRatio = compressionSelectionIndex;
  }

  angleInstance.artboard = selectedArtboard;
  angleInstance.pixelDensity = selectedPixelDensity;
  angleInstance.compressionRatio = selectedCompressionRatio;

  angleInstance.applyImage();

  context.document.showMessage("You got Angled! 📱");
}
