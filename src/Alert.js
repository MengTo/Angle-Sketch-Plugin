export var context = null;

export function noArtboards (logo) {
    // There are no artboards
    // Explain that Angle leverages artboards
    var alert = NSAlert.alloc().init();

    // alert.showsHelp = true;
    alert.setMessageText("Angle needs an Artboard");
    alert.setInformativeText("To start using Angle, create a new Artboard that contains your screen.");
    alert.addButtonWithTitle("OK");
    alert.icon = logo;

    alert.runModal();
}
