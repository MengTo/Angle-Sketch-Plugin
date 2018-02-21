const Angle = require('./Angle');
const CompositionAngle = require('./CompositionAngle');
const PixelDensity = require('./PixelDensity');
const CompressionRatio = require('./CompressionRatio');

import * as Shared from './Shared';
import * as Alert from './Alert';

require('./Shared');

const angleLogo = Shared.loadLocalImage(context, "/Contents/Resources/logo.png");

function applyAngleComposition_onSelectedLayer_withArtboards_forContext (composition, selectedLayers, artboards, context) {

  let selectedLayer = selectedLayers[0];

  if (selectedLayer.class() != MSSymbolInstance) {
    context.document.showMessage("Please, select an Angle Composition.");
    return
  }

  let allAvailableOverridesNSArray = selectedLayer.availableOverrides();
  let allAvailableOverrides = Array.fromNSArray(allAvailableOverridesNSArray);

  let angles = allAvailableOverrides
      .map ( a => a.children() )
      .map ( Array.fromNSArray )
      .reduce ( (p, a) => p.concat(a), [] )
      .filter ( function (a) { return a.class() == MSAvailableOverride } )
      .map ( function (a) {

          let angleInstance = new CompositionAngle ({
              overrideLayer: a.overridePoint().parent(),
              targetLayer: a.affectedLayer(),
              selectedLayer: selectedLayer,
              context: context
          });

          if (!angleInstance.pointsAreValid) { return null }
          return angleInstance
      })
      .filter ( a => a != null );

  if (artboards.length == 1) {
      angles.forEach(function (a, i, as) {
          a.artboard = artboards[0];
          a.pixelDensity = 0;
          a.compressionRatio = 0;
      });
  } else {
      let response = Shared.getSelectionAndOptions_forAngleInstances(artboards, angles);
      
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

function applyAngles_onSelectedLayers_withArtboards_forContext (angles, selectedLayers, artboards, context) {

  if (artboards.length == 1) {
    angles.forEach(function (a, i, as) {
      a.artboard = artboards[0];
      a.pixelDensity = 0;
      a.selectedCompressionRatio = 0;
    });
  } else {

    let response = Shared.getSelectionAndOptions_forAngleInstances(artboards, angles);

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

export default function (context) {

  let selectedLayersNSArray = context.selection;

  if (selectedLayersNSArray == null) {
    context.document.showMessage("Select a shape layer, an Angle Mockup, or an Angle Composition.");
    return
  }

  let selectedLayers = Array.fromNSArray(selectedLayersNSArray);

  let angles = selectedLayers.map(function (a, i, as) {

    let angleInstance = Angle.angleFor({
      selectedLayer: a,
      context: context,
    });

    return angleInstance
  }).filter( (a, i, as) => a != null );

  let parentArtboard = selectedLayers[0].parentArtboard();
  let artboardsNSArray = context.document.artboards();
  let artboards = Array.fromNSArray(artboardsNSArray)
    .filter( a => a != parentArtboard );

  artboards.sort(Shared.compareByRatioAndAlphabet);

  if (artboards.length == 0) {
    Alert.noArtboards(angleLogo);
    return
  }

  if (angles.length != 0) {
    applyAngles_onSelectedLayers_withArtboards_forContext(angles, selectedLayers, artboards, context);
    return
  }

  if (selectedLayersNSArray.count() != 1) {
    context.document.showMessage("Select only one Angle Composition.");
    return
  }

  applyAngleComposition_onSelectedLayer_withArtboards_forContext(null, selectedLayers, artboards, context);
}
