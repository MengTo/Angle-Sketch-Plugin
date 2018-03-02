import * as Shared from './Shared'

export default function (context) {

    let selectedLayers = context.selection;

    if (selectedLayers == null) { return }

    if (selectedLayers.count() != 1) {
        Shared.showMessage_inContext("Please, select only 1️⃣ element at a time", context);
        return
    }

    let selectedLayer = selectedLayers.firstObject();

    if ((selectedLayer.class() != MSSymbolInstance) && (selectedLayer.class() != MSShapeGroup)) {
        Shared.showMessage_inContext("Angle only supports shapes and symbols.", context);
        return
    }
        
    context.command.setValue_forKey_onLayer(null, "pixel-density", selectedLayer);
    context.command.setValue_forKey_onLayer(null, "rotation", selectedLayer);
    context.command.setValue_forKey_onLayer(null, "artboard-id", selectedLayer);
    context.command.setValue_forKey_onLayer(null, "compression-ratio", selectedLayer);
    context.command.setValue_forKey_onLayer(null, "reversed", selectedLayer);
    context.command.setValue_forKey_onLayer(null, "guessed-rotation", selectedLayer);

    Shared.showMessage_inContext("Angle Mockup metadata reset.", context);
}
