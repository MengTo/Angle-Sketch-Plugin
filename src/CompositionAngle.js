const SymbolicAngle = require('./SymbolicAngle');
import { Error } from './Error'

class CompositionAngle extends SymbolicAngle {
    
    constructor (options = {}) {
        
        super(options);

        this.override = options.override;
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

    description () {
        return this.override.parent().affectedLayer().name() + " " + this.targetLayer.name();
    }
}

module.exports = CompositionAngle
