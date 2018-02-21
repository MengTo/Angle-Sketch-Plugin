const Angle = require('./Angle');
require('./shared');

export default function (context) {

    let selectedLayers = context.selection;

    if (selectedLayers == null) { return }

    if (selectedLayers.count() != 1) {
      context.document.showMessage("Please, select only 1️⃣ element at a time");
      return
    }

    let angleInstance = Angle.angleFor({
        selectedLayer: selectedLayers.firstObject(),
        context: context,
    });

    if (angleInstance == null) { return }

    angleInstance.reverseSimmetry();

    angleInstance.applyImage();

    context.document.showMessage("Angle flipped! ↔️");

    return
}
