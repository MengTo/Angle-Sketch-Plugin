import Angle from './Angle'
import * as Shared from './Shared'

import { Error } from './Error'
import { PixelDensity } from './PixelDensity'
import { CompressionRatio } from './CompressionRatio'

String.prototype.repeat = ((i) => (new Array(i + 1).join(this)));

function noArtboards (logo) {
  // There are no artboards
  // Explain that Angle leverages artboards
  var alert = NSAlert.alloc().init();

  // alert.showsHelp = true;
  alert.setMessageText("Angle needs an Artboard");
  alert.setInformativeText("To start using Angle, create a new Artboard that contains your screen.");
  alert.addButtonWithTitle("OK");
  alert.icon = logo;

  alert.runModal();
}

export function getSelectionAndOptions_forAngleInstances(options) {

  let artboards = options.artboards;
  let otherArtboards = options.otherArtboards;
  let alertImage = options.alertImage;
  let angles = options.angles;

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

function applyAngles (options) {

  let angles = options.angles;
  let artboards = options.artboards;
  let context = options.context;
  let otherArtboards = options.otherArtboards;

  if (artboards.length == 1) {
    
    angles.forEach(function (a) {
      a.artboard = artboards[0];
      a.pixelDensity = 0;
      a.selectedCompressionRatio = 0;
    });
  
  } else {

    const angleLogo = Shared.loadLocalImage(context, "Contents/Resources/logo.png");

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

export default function (context) {

  let selectedLayersNSArray = context.selection;
  const angleLogo = Shared.loadLocalImage(context, "Contents/Resources/logo.png");

  if (selectedLayersNSArray == null) {
    Shared.showMessage_inContext(Error.emptySelection.message, context);
    return
  }

  let selectedLayers = Array.fromNSArray(selectedLayersNSArray);

  if (selectedLayers.length == 0) {
    Shared.showMessage_inContext(Error.emptySelection.message, context);
    return
  }

  let document = context.document;

  let parentArtboard = selectedLayers[0].parentArtboard();
  let artboardsNSArray = document.artboards();
  let artboards = Array
     .fromNSArray( artboardsNSArray )
     .filter( a => a != parentArtboard )
     .sort(Shared.compareByRatioAndAlphabet);

  let otherArtboards = Array
    .fromNSArray(document.pages())
    .filter( a => a != document.currentPage())
    .map( a => a.artboards() )
    .map( a => Array.fromNSArray(a) )
    .reduce ( (p, a) => { return p.concat(a) }, new Array )
    .filter(Shared.filterPossibleArtboards)
    .sort(Shared.compareByRatioAndAlphabet);
  
  if ((artboards.length + otherArtboards.length) == 0) {
    noArtboards(angleLogo);
    return
  }

  let possibleAngles = Angle.forSelectedLayers_inContext(selectedLayers, context);

  let angles = possibleAngles.filter( a => a instanceof Angle );
  let errors = possibleAngles.filter( a => !(a instanceof Angle) );

  if (angles.length != 0) {
    let appliedShapeAngles = applyAngles({
      angles: angles,
      artboards: artboards,
      otherArtboards: otherArtboards,
      context: context
    });
  
    if (appliedShapeAngles) {
      Shared.showMessage_inContext("You got Angled! 📱", context);
    }

    return
  }

  if (errors.length == 0) {
    Shared.showMessage_inContext(Error.unsupportedElement.message, context);
  } else {
    Shared.showMessage_inContext(errors[0].message, context);
  }
  
}
