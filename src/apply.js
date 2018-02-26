import Angle from './Angle'
import * as Shared from './Shared'
import * as Alert from './Alert'

import { Error } from './Error'
import { PixelDensity } from './PixelDensity'
import { CompressionRatio } from './CompressionRatio'

require('./Shared');

function applyAngles (options) {

  let angles = options.angles;
  let artboards = options.artboards;
  let context = options.context;

  if (artboards.length == 1) {
    
    angles.forEach(function (a) {
      a.artboard = artboards[0];
      a.pixelDensity = 0;
      a.selectedCompressionRatio = 0;
    });
  
  } else {

    const angleLogo = Shared.loadLocalImage(context, "Contents/Resources/logo.png");

    let response = Shared.getSelectionAndOptions_forAngleInstances(artboards, angles, angleLogo);
    
    if (response.alertOption != NSAlertFirstButtonReturn) { return false }

    angles.forEach(function (a, i, as) {
      let artboardSelectionIndex = response.artboardSelections[i].indexOfSelectedItem();

      a.artboard = artboards[artboardSelectionIndex];
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

  if (selectedLayersNSArray == null) {
    context.document.showMessage(Error.emptySelection.message);
    return
  }

  let selectedLayers = Array.fromNSArray(selectedLayersNSArray);

  if (selectedLayers.length == 0) {
    context.document.showMessage(Error.emptySelection.message);
    return
  }

  let parentArtboard = selectedLayers[0].parentArtboard();
  let artboardsNSArray = context.document.artboards();
  let artboards = Array
     .fromNSArray( artboardsNSArray )
     .filter( a => a != parentArtboard )
     .sort(Shared.compareByRatioAndAlphabet);

  if (artboards.length == 0) {
    Alert.noArtboards(angleLogo);
    return
  }

  let possibleAngles = Angle.forSelectedLayers_inContext(selectedLayers, context);

  let angles = possibleAngles.filter( a => a instanceof Angle );
  let errors = possibleAngles.filter( a => !(a instanceof Angle) );

  if (angles.length != 0) {
    let appliedShapeAngles = applyAngles({
      angles: angles,
      artboards: artboards,
      context: context
    });
  
    if (appliedShapeAngles) {
      context.document.showMessage("You got Angled! 📱");
    }

    return
  }

  if (errors.length == 0) {
    context.document.showMessage(Error.unsupportedElement.message);
  } else {
    context.document.showMessage(errors[0].message);
  }
  
}
