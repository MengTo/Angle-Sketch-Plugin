const StyleFillType = { solid: 0, gradient: 1, pattern: 4, noise: 5 };

function descriptionForBezierPoint_(bezierPoint) {
  switch (bezierPoint.elementType) {
    case NSMoveToBezierPathElement: return "MOVE TO: x:" + bezierPoint.point.x + "\t\ty: " + bezierPoint.point.y
    case NSLineToBezierPathElement: return "LINE TO: x:" + bezierPoint.point.x + "\t\ty: " + bezierPoint.point.y
    case NSCurveToBezierPathElement: return "CURVE TO: x:" + bezierPoint.point.x + "\t\ty: " + bezierPoint.point.y
    case NSClosePathBezierPathElement: return "CLOSE PATH"
  }
}

function pointsFromBezierPath(bezierPath) {

  let count = bezierPath.elementCount();

  let array = Array.from({ length: count }, (x, i) => i);

  return array.map(
    (a, i, as) => {
      var pointsPointer = MOPointer.alloc().initWithValue_(CGPointMake(0, 0));
      var element = bezierPath.elementAtIndex_associatedPoints_(i, pointsPointer);

      let point = pointsPointer.value();

      return point
    }
  );
}

function introspect(type) {

  let mocha = type.class().mocha();

  print("-----------------------------------------------");
  print("PROPERTIES-------------------------------------");
  print("-----------------------------------------------");

  print(mocha.properties()); // array of MSDocument specific properties defined on a MSDocument instance
  print(mocha.propertiesWithAncestors()); // array of all the properties defined on a MSDocument instance

  print("-----------------------------------------------");
  print("INSTANCE METHODS-------------------------------");
  print("-----------------------------------------------");
  print(mocha.instanceMethods()); // array of methods defined on a MSDocument instance
  print(mocha.instanceMethodsWithAncestors());

  print("-----------------------------------------------");
  print("CLASS METHODS----------------------------------");
  print("-----------------------------------------------");
  print(mocha.classMethods()); // array of methods defined on the MSDocument class
  print(mocha.classMethodsWithAncestors());

  print("-----------------------------------------------");
  print("PROTOCOLS--------------------------------------");
  print("-----------------------------------------------");
  print(mocha.protocols()); // array of protocols the MSDocument class inherits from
  print(mocha.protocolsWithAncestors());
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

export default function (context) {

  let selectedLayers = context.selection;

  if (selectedLayers.count() != 1) {

    context.document.showMessage("Select only 1 shape at a time.");
    return
  }

  let artboards = context.document.artboards();

  // loop through a list of artboards of the page
  var options = [];

  for (var i = 0; i < artboards.count(); i++) {
    options.push({
      name: artboards[i].name(),
      artboard: artboards[i]
    });
  }

  //Sort artboards by name
  options.sort((a, b) => a.name > b.name);

  // Get sorted array of names for artboards
  var names = options.map((a) => a.name);

  // In earlier versions of Sketch, the modal does not layout properly.
  let response = getSelectionAlertResponseAndSelectionFor(names);
  // let response = { alertOption: NSAlertFirstButtonReturn, selectionElement: { indexOfSelectedItem : () => 0 }}

  if (response.alertOption != NSAlertFirstButtonReturn) { print("Close"); return }

  // Get the index of the selected option in dropdown
  var selectionIndex = response.selectionElement.indexOfSelectedItem();

  // get artboard name with index
  var artboardForSelection = options[selectionIndex].artboard;

  let pixelDensity = 2;

  let layerAncestry = MSImmutableLayerAncestry.alloc().initWithMSLayer(artboardForSelection);
  let exportFormat = MSExportFormat.formatWithScale_name_fileFormat(pixelDensity, "Angle", "jpg")
  var exportRequest = MSExportRequest.exportRequestsFromLayerAncestry_exportFormats(layerAncestry, [exportFormat]).firstObject();

  var exporter = MSExporter.exporterForRequest_colorSpace(exportRequest, NSColorSpace.sRGBColorSpace());

  var imageData = exporter.bitmapImageRep().TIFFRepresentation();

  var selectedLayer = selectedLayers.firstObject();
  let bezierPath = selectedLayer.bezierPath();
  var rawPoints = pointsFromBezierPath(bezierPath);
  let points = normalizedVectorFrom_atHorizontal_andVerticalRatio(rawPoints, pixelDensity, pixelDensity);

  transformedImage = perspectiveTransform_withPoints(imageData, points);

  let imageFill = MSStyleFill.alloc().init();

  let msImage = MSImageData.alloc().initWithImage_(transformedImage);
  imageFill.setImage(msImage);
  imageFill.fillType = StyleFillType.pattern;

  selectedLayer.style().addStyleFill(imageFill);

  context.document.showMessage("You got angled! 📱");
}

function normalizedVectorFrom_atHorizontal_andVerticalRatio(rawPoints, horizontalRatio, verticalRatio) {
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

function perspectiveTransform_withPoints(sourceImage, points) {

  let perspectiveTransform = CIFilter.filterWithName("CIPerspectiveTransform");

  perspectiveTransform.setValue_forKey(points[0], "inputTopLeft");
  perspectiveTransform.setValue_forKey(points[1], "inputTopRight");
  perspectiveTransform.setValue_forKey(points[2], "inputBottomRight");
  perspectiveTransform.setValue_forKey(points[3], "inputBottomLeft");

  let basePath = context.scriptPath
    .stringByDeletingLastPathComponent()
    .stringByDeletingLastPathComponent()
    .stringByDeletingLastPathComponent();

  let imageBitmap = NSBitmapImageRep.imageRepWithData(sourceImage);
  let image = CIImage.alloc().initWithBitmapImageRep(imageBitmap);

  perspectiveTransform.setValue_forKey(image, "inputImage");

  let perspectiveImage = perspectiveTransform.valueForKey("outputImage");

  if (!perspectiveImage) {
    print("There is no image.");
    return
  }

  let representation = NSCIImageRep.imageRepWithCIImage(perspectiveImage);
  let transformedImage = NSImage.alloc().initWithSize(representation.size());
  transformedImage.addRepresentation(representation);

  return transformedImage
}