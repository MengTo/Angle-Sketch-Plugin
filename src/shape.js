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
// CREATE NEW SELECTION BOX
// ---------------------------------

// Generate a Dropdown
function createSelect(options = {}) {

  if (options.items === null || options.items.count < 1) { return }

  if (options.selected === null || options.selected < 0) {
    options.selected = 0
  }

  var comboBox = NSComboBox.alloc().initWithFrame(options.frame);

  comboBox.addItemsWithObjectValues(options.items);
  comboBox.selectItemAtIndex(options.selected);

  return comboBox;
}

// ---------------------------------
// GET RESPONSE FOR OPTIONS
// ---------------------------------

function getSelectionAlertResponseAndSelectionFor(options) {

  //show a native popup box
  var alert = NSAlert.alloc().init();
  var alertContent = NSView.alloc().init();
  var settingY = 0;
  var textOffset = 2;
  var leftColWidth = 120;
  var labelHeight = 16;
  var windowWidth = 310;
  var fieldWidth = 190;

  // Title
  alert.setMessageText("Apply Mockup");

  // Description
  alert.setInformativeText("Choose an Artboard to apply into the selected shape");

  // Icon

  // Buttons
  alert.addButtonWithTitle("Apply");
  alert.addButtonWithTitle("Cancel");

  // First Left Column - Label
  var groupArtboardLabel = createLabel(
    "Artboard",
    12,
    NSMakeRect(0, settingY + textOffset * 2, leftColWidth, labelHeight)
  );

  alertContent.addSubview(groupArtboardLabel);

  // First Right Column - Dropdown
  let groupArtboardSelectRect = NSMakeRect(leftColWidth, settingY, fieldWidth, 28);

  var groupArtboardSelect = createSelect({
    items: options,
    selected: 0,
    frame: groupArtboardSelectRect
  });

  alertContent.addSubview(groupArtboardSelect);

  // Create some offset below the object, here is the dropdown, so that new element can show below it instead of overlapping
  settingY = CGRectGetMaxY(groupArtboardSelect.frame()) + textOffset;

  // Render those label, dropdown etc into the Alert view
  alertContent.frame = NSMakeRect(
    0, 0,
    windowWidth, CGRectGetMaxY(groupArtboardSelect.frame())
  );

  alert.accessoryView = alertContent;

  // Reverse order of the content elements
  alertContent.setFlipped(true);

  // With this will run the modal and return a reference to the selection element
  return { alertOption: alert.runModal(), selectionElement: groupArtboardSelect }
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
  // SORTED ARTBOARDS IN CONTEXT
  // ---------------------------------

  let parentArtboard = layer.parentArtboard();
  let allArtboards = context.document.artboards();
  let artboards = [];

  for (var i = 0; i < allArtboards.count(); i++) {
    if (allArtboards[i] != parentArtboard) {
      artboards.push({ name: allArtboards[i].name(), artboard: allArtboards[i] });
    }
  }

  var names = artboards.map((a) => a.name);

  // In earlier versions of Sketch, the modal does not layout properly.
  let response = getSelectionAlertResponseAndSelectionFor(names);
  // let response = { alertOption: NSAlertFirstButtonReturn, selectionElement: { indexOfSelectedItem : () => 0 }}

  if (response.alertOption != NSAlertFirstButtonReturn) { print("Close"); return }

  // Get the index of the selected option in dropdown
  var selectionIndex = response.selectionElement.indexOfSelectedItem();

  return

  angleInstance.artboard = artboards[selectionIndex].artboard;

  angleInstance.addImageFill();

  context.document.showMessage("You got angled! 📱");
}
