export default function (context) {

    let selectedLayers = context.selection;

    if (selectedLayers == null) { return }

    if (selectedLayers.count() != 1) {
        context.document.showMessage("Please, select only 1️⃣ element at a time");
        return
    }

    let selectedLayer = selectedLayers.firstObject();

    if ((selectedLayer.class() != MSSymbolInstance) && (selectedLayer.class() != MSShapeGroup)) {
        context.document.showMessage("Angle only supports shapes and symbols.");
        return
    }
        
    context.command.setValue_forKey_onLayer(null, "pixel-density", selectedLayer);
    context.command.setValue_forKey_onLayer(null, "rotation", selectedLayer);
    context.command.setValue_forKey_onLayer(null, "artboard-id", selectedLayer);
    context.command.setValue_forKey_onLayer(null, "compression-ratio", selectedLayer);
    context.command.setValue_forKey_onLayer(null, "reversed", selectedLayer);
    context.command.setValue_forKey_onLayer(null, "guessed-rotation", selectedLayer);

    context.document.showMessage("Angle Mockup metadata reset.");
}
