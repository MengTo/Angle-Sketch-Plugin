import SymbolicAngle from './SymbolicAngle'
import { Error } from './Error'

export default class CompositionAngle extends SymbolicAngle {
    
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
        
        const existingOverrideBranch = topOverrides.objectForKey(overrideBranchAddress) || NSMutableDictionary.dictionary();
        let overrideBranch = NSMutableDictionary.dictionaryWithDictionary(existingOverrideBranch);

        const objectID = this.targetLayer.objectID();
        overrideBranch.setObject_forKey(this.transformedImage, objectID);
        topOverrides.setObject_forKey(overrideBranch, overrideBranchAddress);

        this.selectedLayer.overrides = topOverrides;
    }

    description () {
        return this.override.parent().affectedLayer().name() + " " + this.targetLayer.name();
    }
}
