import Angle from './Angle'
import * as Shared from './Shared'

import { Error } from './Error'
import { PixelDensity } from './PixelDensity'
import { CompressionRatio } from './CompressionRatio'

String.prototype.repeat = ((i) => (new Array(i + 1).join(this)));

export function getSelectionAndOptions_forAngleInstances(options) {

  let { artboards, otherArtboards, alertImage, angles } = options;

  let array = Array.from({ length: angles.length }, (x, i) => i);

  if (artboards.length == 1) {
      return {
      alertOption: NSAlertFirstButtonReturn,
      artboardSelections:     array.map((a,i,as) => { indexOfSelectedItem: () => 0 }),
      densitySelections:      array.map((a,i,as) => { indexOfSelectedItem: () => 0 }),
      compressionSelections:  array.map((a,i,as) => { indexOfSelectedItem: () => 0 }),
      };
  }

  var alert = NSAlert.alloc().init();
  var alertContent = NSView.alloc().init();

  alert.setMessageText("Apply Mockup");
  alert.setInformativeText("Choose an Artboard to apply into the selected shape.");
  alert.addButtonWithTitle("Apply");
  alert.addButtonWithTitle("Cancel");
  alert.icon = alertImage;

  var movingYPosition = 0;
  var labelHeight = 16;

  var fisrtColumnWidth = 260;
  var secondColumnWidth = 90;
  var thirdColumnWidth = 90;

  const windowWidth = fisrtColumnWidth + secondColumnWidth + thirdColumnWidth;

  var rectangle;

  rectangle = NSMakeRect(0, 0, fisrtColumnWidth, labelHeight);
  var artboardLabel = Shared.createLabel("Artboard", 12, rectangle);
  alertContent.addSubview(artboardLabel);

  rectangle = NSMakeRect(fisrtColumnWidth, 0, secondColumnWidth, labelHeight);
  var densityLabel = Shared.createLabel("Pixel Density", 12, rectangle);
  alertContent.addSubview(densityLabel);

  rectangle = NSMakeRect(fisrtColumnWidth + secondColumnWidth, 0, thirdColumnWidth, labelHeight);
  var compressionLabel = Shared.createLabel("Quality", 12, rectangle);
  alertContent.addSubview(compressionLabel);

  let spacing = array.length > 1 ? 50 : 28;

  if (array.length > 1) {
      let targetLabels = array.map( function (a, i, as) {
          let rectangle = NSMakeRect(0, labelHeight + 4 + (spacing * i), fisrtColumnWidth, labelHeight);
          let label = Shared.createLabel(angles[i].description(), 12, rectangle);
  
          return label
      });
      targetLabels.forEach( (a) => alertContent.addSubview(a));
  }

  let allArtboards = artboards.concat(otherArtboards);

  let artboardNames = allArtboards
  .map(function (a) {
    if (a.name != undefined) {
      if (a.name instanceof String) {
        return a.name;
      }
      return a.name();
    }
  })
  .map(function (a, i, as) {
    let indexesWithSameName = as
      .map( (b, j, bs) => a == b ? j : -1 )
      .filter( (a, i, as) => a != -1 );

    if (indexesWithSameName.length > 1) {
      let indexOfIndex = indexesWithSameName.indexOf(i);
      return a + " ".repeat(indexOfIndex);
    }

    return a
  });

  let artboardImages = allArtboards.map((a) => Shared.smallImagesFromArtboard(a));

  let artboardSelections = array.map( (a,index,as) => Shared.popUpButtonsforRectangleIndexer_withTitleIndexer_andImageIndexer_defaultSelected_onIndex (
      ((i) => NSMakeRect(0, labelHeight + 4 + (spacing * i) + 16, fisrtColumnWidth, 28)),
      artboardNames, artboardImages, index
  ));
  artboardSelections.forEach( (a) => alertContent.addSubview(a));

  let pixelDensityNames = PixelDensity.map((a) => a.selectionLabel);
  let pixelDensitySelections = array.map( (a,index,as) => Shared.popUpButtonsforRectangleIndexer_withTitleIndexer_andImageIndexer_defaultSelected_onIndex (
      ((i) => NSMakeRect(fisrtColumnWidth, labelHeight + 4 + (spacing * i) + 16, secondColumnWidth, 28)),
      pixelDensityNames, null, index
  ));
  pixelDensitySelections.forEach( (a) => alertContent.addSubview(a));

  let compressionRatioNames = Object.values(CompressionRatio).map((a) => a.selectionLabel);
  let compressionRatioSelections = array.map( (a,index,as) => Shared.popUpButtonsforRectangleIndexer_withTitleIndexer_andImageIndexer_defaultSelected_onIndex (
      ((i) => NSMakeRect(fisrtColumnWidth + secondColumnWidth, labelHeight + 4 + (spacing * i) + 16, thirdColumnWidth, 28)),
      compressionRatioNames, null, index
  ));
  compressionRatioSelections.forEach( (a) => alertContent.addSubview(a));

  movingYPosition = labelHeight + 4 + (spacing * angles.length) + 28;

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

function loadLocalImage (context, filePath) {

  let basePath = context.scriptPath
    .stringByDeletingLastPathComponent()
    .stringByDeletingLastPathComponent()
    .stringByDeletingLastPathComponent();

  return NSImage.alloc().initWithContentsOfFile(basePath + "/" + filePath);
}

function applyAngles (options) {

  let { angles, artboardsOnSelectPage:artboards, context, artboardsOnOtherPages:otherArtboards } = options;

  if (artboards.length == 1) {
    
    angles.forEach(function (a) {
      a.artboard = artboards[0];
      a.pixelDensity = 0;
      a.selectedCompressionRatio = 0;
    });
  
  } else {

    const angleLogo = loadLocalImage(context, "Contents/Resources/logo.png");

    let response = getSelectionAndOptions_forAngleInstances({
      artboards: artboards,
      otherArtboards: otherArtboards,
      angles: angles,
      alertImage: angleLogo
    });
    
    if (response.alertOption != NSAlertFirstButtonReturn) { return false }

    angles.forEach(function (a, i, as) {
      let artboardSelectionIndex = response.artboardSelections[i].indexOfSelectedItem();

      let allArtboards = artboards.concat(otherArtboards);

      a.artboard = allArtboards[artboardSelectionIndex];
      a.pixelDensity = response.densitySelections[i].indexOfSelectedItem();
      a.compressionRatio = response.compressionSelections[i].indexOfSelectedItem();
    });
  }

  angles.forEach(function (a, i, as) {

    a.guessRotationAndReversion();
    a.applyImage();
  });

  return true
}

const Sketch = require('sketch');

export default function (context) {

  let { api, command, document, plugin, scriptPath, scriptURL, selection } = context;

  const angleLogo = loadLocalImage(context, "Contents/Resources/logo.png");

  if (selection == null) {
    Shared.show({
      message: Error.emptySelection.message,
      inDocument: document
    });
    return
  }

  selectedLayers = Array.fromNSArray(selection);

  if (selectedLayers.length == 0) {
    Shared.show({
      message: Error.emptySelection.message,
      inDocument: document
    });
    return
  }

  let parentArtboard = selectedLayers[0].parentArtboard();

  let artboardsOnSelectPage = Array
    .fromNSArray(document.artboards())
    .filter( a => a != parentArtboard )
    .sort(Shared.compareByRatioAndAlphabet);

  let artboardsOnOtherPages = Array
    .fromNSArray(document.pages())
    .filter( a => a != document.currentPage())
    .map( a => a.artboards() )
    .map( a => Array.fromNSArray(a) )
    .reduce ( (p, a) => { return p.concat(a) }, new Array )
    .filter(Shared.filterPossibleArtboards)
    .sort(Shared.compareByRatioAndAlphabet);
  
  if ((artboardsOnSelectPage.length + artboardsOnOtherPages.length) == 0) {

    var alert = NSAlert.alloc().init();

    alert.setMessageText("Angle needs an Artboard");
    alert.setInformativeText("To start using Angle, create a new Artboard that contains your screen.");
    alert.addButtonWithTitle("OK");
    alert.icon = angleLogo;

    alert.runModal();
    return
  }

  let possibleAngles = Angle.tryCreating({ for: selectedLayers, in: context });

  let angles = possibleAngles.filter( a => a instanceof Angle );
  let errors = possibleAngles.filter( a => !(a instanceof Angle) );

  if (angles.length != 0) {
    let appliedShapeAngles = applyAngles({
      angles: angles,
      artboardsOnSelectPage: artboardsOnSelectPage,
      artboardsOnOtherPages: artboardsOnOtherPages,
      context: context
    });
  
    if (appliedShapeAngles) {
      Shared.show({
        message: "You got Angled! 📱",
        inDocument: document
      });
    }

    return
  }

  if (errors.length == 0) {
    Shared.show({
      message: Error.unsupportedElement.message,
      inDocument: document
    });
  } else {
    Shared.show({
      message: errors[0].message,
      inDocument: document
    });
  }
}
