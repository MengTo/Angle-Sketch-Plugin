const Angle = require('./Angle');
const CardAngle = require('./CardAngle');
const CompositionAngle = require('./CompositionAngle');
const SymbolicAngle = require('./SymbolicAngle');
const ShapeAngle = require('./ShapeAngle');
const PixelDensity = require('./PixelDensity');
const CompressionRatio = require('./CompressionRatio');

import * as Shared from './Shared';
import * as Alert from './Alert';
import { Error } from './Error'

require('./Shared');

const angleLogo = Shared.loadLocalImage(context, "/Contents/Resources/logo.png");

function getCompositionAngles (options) {
  
  let selectedLayer = options.selectedLayer;
  let context = options.context;

  if (selectedLayer.class() != MSSymbolInstance) { return null }

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

    if (angles.length == 0) { return null }

    return angles
}

function applyCompositionAngles (options) {

  let angles = options.angles;
  let artboards = options.artboards;
  let context = options.context;

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

function applyAngles (options) {

  let angles = options.angles;
  let selectedLayers = options.selectedLayers;
  let artboards = options.artboards;
  let context = options.context;

  if (artboards.length == 1) {
    
    angles.forEach(function (a) {
      a.artboard = artboards[0];
      a.pixelDensity = 0;
      a.selectedCompressionRatio = 0;
    });
  
  } else {

    let response = Shared.getSelectionAndOptions_forAngleInstances(artboards, angles);

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

function getCardAngles (options) {

  let context = options.context;

  let selectedLayer = options.selectedLayer;
  if (selectedLayer.class() != MSSymbolInstance) { return null }

  let availableOverridesNSArray = selectedLayer.availableOverrides();
  if (availableOverridesNSArray == null) { return null }
  let availableOverrides = Array.fromNSArray(availableOverridesNSArray);
  if (availableOverrides.length == 0) { return null }

  let imageOverrides = availableOverrides.filter( (a) => a.currentValue().class() == MSImageData);
  if (imageOverrides == null || imageOverrides.length == 0) { return null }

  let angles = imageOverrides
    .map(function (a, i, as) {
      
      let angleInstance = new CardAngle ({
        selectedLayer: selectedLayer,
        targetLayer: a.affectedLayer(),
        targetPath: a.affectedLayer().bezierPath(),
        context: context
      });

      if (!angleInstance.pointsAreValid) { return null }
      return angleInstance
    })
    .filter( a => a != null)

  if (angles.length == 0) { return null }

  return angles
}

function applyCardAngles (options) {

  let angles = options.angles;
  let selectedLayers = options.selectedLayers;
  let artboards = options.artboards;
  let context = options.context;

  if (artboards.length == 1) {
    
    angles.forEach(function (a) {
      a.artboard = artboards[0];
      a.pixelDensity = 0;
      a.selectedCompressionRatio = 0;
    });
  
  } else {

    let response = Shared.getSelectionAndOptions_forAngleInstances(artboards, angles);

    if (response.alertOption != NSAlertFirstButtonReturn) { return true }

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
    context.document.showMessage("Select a shape layer, an Angle Mockup, or an Angle Composition.");
    return
  }

  let selectedLayers = Array.fromNSArray(selectedLayersNSArray);

  if (selectedLayers.length == 0) { return }

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

  if (selectedLayers.length == 1) {

    let selectedLayer = selectedLayers[0]

    let cardAngles = getCardAngles({
      selectedLayer: selectedLayer,
      context: context
    });

    if (cardAngles != null) {
      
      let appliedCardAngles = applyCardAngles({
        angles: cardAngles,
        selectedLayer: selectedLayer,
        artboards: artboards,
        context: context
      });

      if (appliedCardAngles) {
        context.document.showMessage("You got Angled! 📱");
      }

      return
    }

    let compositionAngles = getCompositionAngles({
      selectedLayer: selectedLayer,
      context: context
    });

    if (compositionAngles != null) {

      let appliedCompositionAngles = applyCompositionAngles({
        angles: compositionAngles,
        artboards: artboards,
        context: context
      });

      if (appliedCompositionAngles) {
        context.document.showMessage("You got Angled! 📱");
      }

      return
    }
  }

  let possibleAngles = selectedLayers
    .map( a => {
      let options = { selectedLayer: a, context: context};
      switch (a.class()) {
        case MSSymbolInstance:
          return new SymbolicAngle(options);
        case MSShapeGroup:
          return new ShapeAngle(options);
        default:
          return Error.unsupportedElement
      }
    });

  let angles = possibleAngles.filter( a => a instanceof Angle );
  let errors = possibleAngles.filter( a => !(a instanceof Angle) );

  if (angles.length == 0) {
    let error = errors[0];
    context.document.showMessage(error.message);
    return
  }

  let appliedShapeAngles = applyAngles({
    angles: angles,
    selectedLayers: selectedLayers,
    artboards: artboards,
    context: context
  });

  if (appliedShapeAngles) {
    context.document.showMessage("You got Angled! 📱");
  }
}
