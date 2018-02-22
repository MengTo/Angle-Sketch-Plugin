const SymbolicAngle = require('./SymbolicAngle');
import { Error } from './Error'

class CompositionAngle extends SymbolicAngle {
    
    constructor (options = {}) {
        
        super(options);
    }

    loadValueForKey (key) {
        return super.loadValueForKey(this.targetLayer.objectID() + "-" + key);
    }

    imprintValue_forKey (value, key) {
        super.imprintValue_forKey(value, this.targetLayer.objectID() + "-" + key);
    }

    applyImage () {

        const existingTopOverrides = this.selectedLayer.overrides() || NSDictionary.dictionary();
        const topOverrides = NSMutableDictionary.dictionaryWithDictionary(existingTopOverrides);

        const overrideBranchAddress = (this.overrideLayer + "").replace("_symbolID", "");
        
        let overrideBranch = NSMutableDictionary.dictionary();

        const objectID = this.targetLayer.objectID();
        overrideBranch.setObject_forKey(this.transformedImage, objectID)
        topOverrides.setObject_forKey(overrideBranch, overrideBranchAddress)

        this.selectedLayer.overrides = topOverrides;
    }
}

module.exports = CompositionAngle
