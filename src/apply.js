const Angle = require('./Angle');
const PixelDensity = require('./PixelDensity');
const CompressionRatio = require('./CompressionRatio');

import * as Shared from './Shared';
import * as Alert from './Alert';

require('./Shared');

const angleLogo = Shared.loadLocalImage(context, "/Contents/Resources/logo.png");

export default function (context) {

  let selectedLayersNSArray = context.selection;

  if (selectedLayersNSArray == null) { return }

  let selectedLayers = Array.fromNSArray(selectedLayersNSArray);

  let angles = selectedLayers.map(function (a, i, as) {

    let angleInstance = Angle.angleFor({
      selectedLayer: a,
      context: context,
    });

    return angleInstance
  }).filter( (a, i, as) => a != null );

  if (angles.length == 0) { return }

  // ---------------------------------
  // ARTBOARDS IN CONTEXT
  // ---------------------------------

  let parentArtboard = selectedLayers[0].parentArtboard();
  let artboardsNSArray = context.document.artboards();
  let artboards = Array.fromNSArray(artboardsNSArray)
    .filter( a => a != parentArtboard );

  artboards.sort(Shared.compareByRatioAndAlphabet);

  if (artboards.length == 0) {
    Alert.noArtboards(angleLogo);
    return
  }

  if (artboards.length == 1) {

    angles.forEach(function (a, i, as) {
      a.artboard = artboards[0];
      a.pixelDensity = 0;
      a.selectedCompressionRatio = 0;
    });
  } else {

    let response = getSelectionAndOptions_forAngleInstances(artboards, angles.count);

    if (response.alertOption != NSAlertFirstButtonReturn) { return }

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

  context.document.showMessage("You got Angled! 📱");
}
