import Angle from './Angle';
import * as Shared from './Shared';

import { Error } from './Error';

export default function (context) {
  let selectedLayersNSArray = context.selection[0];

  if (selectedLayersNSArray == null) {
    Shared.show({
      message: Error.emptySelection.message,
      inDocument: context.document,
    });
    return;
  }

  let selectedLayers = Array.fromNSArray(selectedLayersNSArray);
  // console.log('SELECTED LAYERS', selectedLayers);

  if (selectedLayers.length == 0) {
    Shared.show({
      message: Error.emptySelection.message,
      inDocument: context.document,
    });
    return;
  }

  let possibleAngles = Angle.tryCreating({ for: selectedLayers, in: context });

  let angles = possibleAngles.filter((a) => a instanceof Angle);
  let errors = possibleAngles.filter((a) => !(a instanceof Angle));

  if (angles.length == 0) {
    let error = errors[0];
    Shared.show({
      message: error.message,
      inDocument: context.document,
    });
    return;
  }

  angles.forEach((a) => {
    a.rotate();
    a.applyImage();
  });

  Shared.show({
    message: 'Angle rotated! 🔄',
    inDocument: context.document,
  });

  return;
}
