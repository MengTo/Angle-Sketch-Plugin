export default function(context) {
  // context.document.showMessage("It's alive 🙌")

  //reference the Sketch Document
  var doc = context.document;
  var artboards = doc.artboards();
  var pages = doc.pages();
  var options = [];
  var names = [];

  // Just for deselect stuff - selection.clear();
  var sketch = context.api();
  var document = sketch.selectedDocument;
  var selection = document.selectedLayers;

  //loop through a list of artboards of the page
  for (var i = 0; i < artboards.count(); i++) {
    options.push({
      name: artboards[i].name(),
      artboard: artboards[i]
    });
    log(options);
  }

  //Sort the names alphabetically
  options.sort(sortName);

  // After sort, arrange it into the loop
  for (var j = 0; j < options.length; j++) {
    names.push(options[j].name);
    log(names);
  }

  //loop through the pages of the document
  for (var k = 0; k < pages.count(); k++) {
    //reference each pages
    var page = pages[k];

    //get the name of the pages
    var pageName = [page.name()];

    //show the page name in the console
    log("Pages in current document: " + pageName);
  }

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
  alert.setMessageText("Design+Code Angle");

  // Description
  alert.setInformativeText(
    "Choose an Artboard to mirror into the selected mockup:"
  );

  // Icon

  // Buttons
  alert.addButtonWithTitle("Angle!");
  alert.addButtonWithTitle("Close");

  // First Left Column - Label
  var groupArtboardLabel = createLabel(
    "Artboard",
    12,
    NSMakeRect(0, settingY + textOffset * 2, leftColWidth, labelHeight)
  );
  alertContent.addSubview(groupArtboardLabel);

  // First Right Column - Dropdown
  var groupArtboardSelect = createSelect(
    names,
    0,
    NSMakeRect(leftColWidth, settingY, fieldWidth, 28)
  );
  alertContent.addSubview(groupArtboardSelect);

  // Create some offset below the object, here is the dropdown, so that new element can show below it instead of overlapping
  settingY = CGRectGetMaxY(groupArtboardSelect.frame()) + textOffset;

  // Render those label, dropdown etc into the Alert view
  alertContent.frame = NSMakeRect(
    0,
    0,
    windowWidth,
    CGRectGetMaxY(groupArtboardSelect.frame())
  );

  alert.accessoryView = alertContent;

  // Reverse order of the content elements
  alertContent.setFlipped(true);

  // With this will run the modalbox
  var response = alert.runModal();

  // Get the index of the selected option in dropdown
  var sel = groupArtboardSelect.indexOfSelectedItem();

  if (response == NSAlertFirstButtonReturn) {
    // get artboard name with index
    var a = options[sel].artboard;

    // deselect all layers
    // selection.clear();

    // select artboard
    // context.document.currentPage().changeSelectionBySelectingLayers([a]);

    // Pasteboard
    // var pasteboard = NSPasteboard.generalPasteboard();
    // var pasteboardItems = pasteboard.pasteboardItems;
    // var imgData = pasteboard.dataForType(NSPasteboardTypePNG);
    var selectedLayers = context.selection.firstObject();
    var imgData = MSPasteboardLayers.pasteboardLayersWithLayers([a]);
    MSPasteboardManager.writePasteboardLayers_toPasteboard(
      imgData,
      NSPasteboard.generalPasteboard()
    );

    if (imgData) {
      var image = NSImage.alloc().initWithData(imgData);
      if (selectedLayers.isKindOfClass(MSShapeGroup)) {
        // Set the layer shape Fills to Pattern Fill
        var fill = selectedLayers
          .style()
          .fills()
          .firstObject();
        fill.setFillType(4);
        // Paste in the image from pasteboard and set the Pattern Fill type to Fill
        fill.setImage(MSImageData.alloc().initWithImage(image));
        selectedLayers
          .style()
          .fills()
          .firstObject()
          .setPatternFillType(1);
      }
    }

    log("ok");
  } else {
    log("close");
  }

  //show a message at the bottom of Sketch
  // doc.showMessage("Done");
}

// Generate a Label
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

// Generate a Dropdown
function createSelect(items, selectedItemIndex, frame) {
  var comboBox = NSComboBox.alloc().initWithFrame(frame),
    selectedItemIndex = selectedItemIndex > -1 ? selectedItemIndex : 0;

  comboBox.addItemsWithObjectValues(items);
  comboBox.selectItemAtIndex(selectedItemIndex);

  return comboBox;
}

// Sort name alphabetically
function sortName(_a, _b) {
  var a = _a.name;
  var b = _b.name;

  return naturalSort(a, b);
}

function naturalSort(a, b) {
  var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
    sre = /(^[ ]*|[ ]*$)/g,
    dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
    hre = /^0x[0-9a-f]+$/i,
    ore = /^0/,
    i = function(s) {
      return (naturalSort.insensitive && ("" + s).toLowerCase()) || "" + s;
    },
    // convert all to strings strip whitespace
    x = i(a).replace(sre, "") || "",
    y = i(b).replace(sre, "") || "",
    // chunk/tokenize
    xN = x
      .replace(re, "\0$1\0")
      .replace(/\0$/, "")
      .replace(/^\0/, "")
      .split("\0"),
    yN = y
      .replace(re, "\0$1\0")
      .replace(/\0$/, "")
      .replace(/^\0/, "")
      .split("\0"),
    // numeric, hex or date detection
    xD =
      parseInt(x.match(hre)) ||
      (xN.length != 1 && x.match(dre) && Date.parse(x)),
    yD =
      parseInt(y.match(hre)) || (xD && y.match(dre) && Date.parse(y)) || null,
    oFxNcL,
    oFyNcL;
  // first try and sort Hex codes or Dates
  if (yD)
    if (xD < yD) return -1;
    else if (xD > yD) return 1;
  // natural sorting through split numeric strings and default strings
  for (
    var cLoc = 0, numS = Math.max(xN.length, yN.length);
    cLoc < numS;
    cLoc++
  ) {
    // find floats not starting with '0', string or 0 if not defined (Clint Priest)
    oFxNcL =
      (!(xN[cLoc] || "").match(ore) && parseFloat(xN[cLoc])) || xN[cLoc] || 0;
    oFyNcL =
      (!(yN[cLoc] || "").match(ore) && parseFloat(yN[cLoc])) || yN[cLoc] || 0;
    // handle numeric vs string comparison - number < string - (Kyle Adams)
    if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
      return isNaN(oFxNcL) ? 1 : -1;
    } else if (typeof oFxNcL !== typeof oFyNcL) {
      // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
      oFxNcL += "";
      oFyNcL += "";
    }
    if (oFxNcL < oFyNcL) return -1;
    if (oFxNcL > oFyNcL) return 1;
  }
  return 0;
}
