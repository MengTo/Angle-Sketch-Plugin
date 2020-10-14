import Angle from './Angle';
import CompositionAngle from './CompositionAngle';
import SymbolicAngle from './SymbolicAngle';
import ShapeAngle from './ShapeAngle';

import { Error } from './Error';

Angle.tryCreating = function ({ for: selectedLayers, in: context }) {
  return selectedLayers
    .map((layer) => {
      switch (layer.class()) {
        case MSSymbolInstance:
          let overrides = Array.fromNSArray(layer.availableOverrides()) || [];

          let symbolAngles = overrides
            .filter(
              (override) => override.currentValue().class() == MSImageData
            )
            .map((override) => {
              return new SymbolicAngle({
                selectedLayer: layer,
                context: context,
                override: override,
              });
            });

          let nestedAngles = overrides
            .map((a) => a.children())
            .filter((a) => a != null)
            .reduce((p, a) => p.concat(a), [])
            .filter(function (a) {
              return a.class() == MSAvailableOverride;
            })
            .map(function (a) {
              return new CompositionAngle({
                override: a,
                selectedLayer: layer,
                context: context,
              });
            });
          return symbolAngles.concat(nestedAngles);
        case MSShapeGroup:
        case MSShapePathLayer:
        case MSRectangleShape:
          return new ShapeAngle({
            selectedLayer: layer,
            context: context,
          });
        default:
          return Error.unsupportedElement;
      }
    })
    .reduce((p, a, i, as) => p.concat(a), []);
};

Array.fromNSArray = function (nsArray) {
  let array = [];
  for (var i = 0; i < nsArray.length; i++) {
    array.push(nsArray[i]);
  }
  return array;
};

Array.prototype.print = function () {
  return this.map((a) => {
    print(a);
    return a;
  });
};

export function show({ message, inDocument: document }) {
  if (document != undefined && document.showMessage != undefined) {
    document.showMessage(message);
  }

  print(message);
}

export function filterPossibleArtboards(artboardOrSymbol) {
  let upperMaring = 0.8;
  let lowerMargin = 0.4;
  let minimumDimention = 250;

  let elementClass = artboardOrSymbol.class();

  switch (elementClass) {
    case MSArtboardGroup:
      let artboard = artboardOrSymbol;
      let frame = artboard.frame();

      if (
        frame.width() < minimumDimention ||
        frame.height() < minimumDimention
      ) {
        return false;
      }

      let ratio = frame.width() / frame.height();
      if (ratio > 1) {
        ratio = 1 / ratio;
      }

      if (ratio < lowerMargin) {
        return false;
      }
      break;
    case MSSymbolMaster:
      // Traversion of symbols does not work properly yet.
      return false;

    default:
      print(elementClass);
      return false;
  }

  return true;
}

export function compareByRatioAndAlphabet(a, b) {
  let upperMaring = 0.8;
  let lowerMargin = 0.4;

  let artboardSizeA = a.frame();
  let artboardSizeB = b.frame();

  let artboardARatio = artboardSizeA.width() / artboardSizeA.height();
  if (artboardARatio > 1) {
    artboardARatio = 1 / artboardARatio;
  }

  let artboardARatioInsideMargin =
    artboardARatio > lowerMargin && artboardARatio < upperMaring;

  let artboardBRatio = artboardSizeB.width() / artboardSizeB.height();
  if (artboardBRatio > 1) {
    artboardBRatio = 1 / artboardBRatio;
  }

  let artboardBRatioInsideMargin =
    artboardBRatio > lowerMargin && artboardBRatio < upperMaring;

  if (artboardARatioInsideMargin && !artboardBRatioInsideMargin) {
    return false;
  }

  if (artboardBRatioInsideMargin && !artboardARatioInsideMargin) {
    return true;
  }

  if (artboardARatio == artboardBRatio) {
    return a.name() > b.name();
  }

  return artboardARatio > artboardBRatio;
}

export function introspect(type) {
  let mocha = type.class().mocha();

  print('-----------------------------------------------');
  print('PROPERTIES-------------------------------------');
  print('-----------------------------------------------');

  print(mocha.properties());
  print(mocha.propertiesWithAncestors());

  print('-----------------------------------------------');
  print('INSTANCE METHODS-------------------------------');
  print('-----------------------------------------------');
  print(mocha.instanceMethods());
  print(mocha.instanceMethodsWithAncestors());

  print('-----------------------------------------------');
  print('CLASS METHODS----------------------------------');
  print('-----------------------------------------------');
  print(mocha.classMethods());
  print(mocha.classMethodsWithAncestors());

  print('-----------------------------------------------');
  print('PROTOCOLS--------------------------------------');
  print('-----------------------------------------------');
  print(mocha.protocols());
  print(mocha.protocolsWithAncestors());
}

export function createLabel(text, size, frame) {
  var label = NSTextField.alloc().initWithFrame(frame);

  label.setStringValue(text);
  label.setFont(NSFont.boldSystemFontOfSize(size));
  label.setBezeled(false);
  label.setDrawsBackground(false);
  label.setEditable(false);
  label.setSelectable(false);

  return label;
}

export function popUpButtonsforRectangleIndexer_withTitleIndexer_andImageIndexer_defaultSelected_onIndex(
  rectangle,
  titles,
  images,
  index
) {
  let button = NSPopUpButton.alloc().initWithFrame(rectangle(index));
  button.addItemsWithTitles(titles);

  if (images != null) {
    button.imageScaling = NSImageScaleProportionallyUpOrDown;

    Array.fromNSArray(button.itemArray()).forEach((a, i, as) => {
      a.image = images[i];
    });
  }

  return button;
}

export function smallImagesFromArtboard(artboard) {
  // var sketch = require('sketch/dom');
  // var artboard = sketch.fromNative(msartboard);

  // //let image = sketch.export(artboard);

  // print(msartboard.unselectedPreviewImage());

  // return nil

  if (artboard.class() == MSSymbolMaster) {
    print(artboard);
    return null;
  }

  if (artboard.frame == undefined) {
    print(artboard);
  }

  let artboardWidth = artboard.frame().width();
  let artboardHeight = artboard.frame().height();
  var artboardRatio = artboardWidth / artboardHeight;
  if (artboardRatio > 1) {
    artboardRatio = 1 / artboardRatio;
  }

  if (artboardRatio > 0.8 || artboardRatio < 0.4) {
    return null;
  }

  // let layerAncestry = MSImmutableLayerAncestry.alloc().initWithMSLayer(artboard);
  //   let layerAncestry = this.artboard.ancestry();

  // MSImmutableLayerAncestry has been renamed (As of V.66.1) and must be called from the class string
  let cls = NSClassFromString('SketchModel.MSImmutableLayerAncestry');
  let layerAncestry = cls.alloc().initWithMutableLayer(artboard);

  let biggerDimention =
    artboardWidth > artboardHeight ? artboardWidth : artboardHeight;
  let exportScale = 48 / biggerDimention;
  let exportFormat = MSExportFormat.formatWithScale_name_fileFormat(
    exportScale,
    '',
    'png'
  );
  let exportRequest = MSExportRequest.exportRequestsFromLayerAncestry_exportFormats(
    layerAncestry,
    [exportFormat]
  ).firstObject();
  let exporter = MSExporter.exporterForRequest_colorSpace(
    exportRequest,
    NSColorSpace.sRGBColorSpace()
  );

  return exporter.previewImage();
}
