const Angle = require('./Angle');
const SymbolicAngle = require('./SymbolicAngle');
const ShapeAngle = require('./ShapeAngle');

Angle.angleFor = function (options = {}) {

    let angleInstance;

    if (options.selectedLayer.class() == MSSymbolInstance) {
        angleInstance = new SymbolicAngle(options)

        if (angleInstance.targetLayer == null) {
            context.document.showMessage("This does not seem to be a supported symbol.");
            print("🛑 Unable to retrieve target for override");
            return null
        }
    } else if (options.selectedLayer.class() == MSShapeGroup) {

        angleInstance = new ShapeAngle(options)
    } else {
        context.document.showMessage("Angle only supports shapes and symbols.");
        return null
    }

    if (!angleInstance.pointsAreValid) {
        context.document.showMessage("There seems to be an issue with the shape we are trying to apply.");
        return null
    }

    return angleInstance;
}
