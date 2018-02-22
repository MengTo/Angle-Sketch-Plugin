const Angle = require('./Angle');
const SymbolicAngle = require('./SymbolicAngle');
const ShapeAngle = require('./ShapeAngle');
require('./Shared');

import { Error } from './Error'

export default function (context) {

    let selectedLayersNSArray = context.selection;
    
    if (selectedLayersNSArray == null) {
        let error = Error.emptySelection
        context.document.showMessage(error.message);
        return
    }
    
    let selectedLayers = Array.fromNSArray(selectedLayersNSArray);

    if (selectedLayers.length == 0) {
        let error = Error.emptySelection
        context.document.showMessage(error.message);
        return
    }

    let possibleAngles = selectedLayers
        .map( a => {

            switch (a.class()) {
                case MSSymbolInstance:
                    return new SymbolicAngle({ selectedLayer: a, context: context});
                    break
                case MSShapeGroup:
                    return new ShapeAngle({ selectedLayer: a, context: context});
                    break
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

    angles.forEach( a => {
        a.reverseSimmetry();
        a.applyImage();
    });

    context.document.showMessage("Angle flipped! ↔️");

    return
}
