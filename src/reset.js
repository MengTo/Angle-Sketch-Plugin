import Angle from './Angle'
import * as Shared from './Shared'

export default function ({ document, selection, command }) {

    if (selection == undefined || selection.count() != 1) {
        Shared.show({
            message: "Please, select 1️⃣ element to reset",
            inDocument: document
        });
        return
    }

    let layer = selection.firstObject();
    let possibleAngle = Angle.tryCreating({ for: [layer], in: { document, selection, command } });

    if (!(possibleAngle instanceof Angle)) {

        Shared.show({
            message: "Reset only works on shapes and symbols.",
            inDocument: document
        });
        return
    }

    context.command.setValue_forKey_onLayer(null, "pixel-density", layer);
    context.command.setValue_forKey_onLayer(null, "rotation", layer);
    context.command.setValue_forKey_onLayer(null, "artboard-id", layer);
    context.command.setValue_forKey_onLayer(null, "compression-ratio", layer);
    context.command.setValue_forKey_onLayer(null, "reversed", layer);
    context.command.setValue_forKey_onLayer(null, "guessed-rotation", layer);

    Shared.show({
        message: "Angle Mockup metadata reset.",
        inDocument: document
    });
}
