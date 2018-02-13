const Angle = require('./Angle');

class SymbolicAngle extends Angle {
    constructor (options = {}) {
        super(options);
  
        const existingOverrides = this.selectedLayer.overrides() || NSDictionary.dictionary();
        const overrides = NSMutableDictionary.dictionaryWithDictionary(existingOverrides);
    
        let availableOverrides = this.selectedLayer.availableOverrides();
        let imageOverride = availableOverrides.reduce ( function (p, a, i, as) {
            if (a.currentValue().class() == MSImageData && a.affectedLayer().name().trim() == "Screen") { return a }
            return p
        }, null);

        if (imageOverride == undefined) { return }

        this.targetLayer = imageOverride.affectedLayer();
        this.targetPath = imageOverride.affectedLayer().bezierPath();
    }

    addImageFill () {

        let objectID = this.targetLayer.objectID();

        const existingOverrides = this.selectedLayer.overrides() || NSDictionary.dictionary();
        const overrides = NSMutableDictionary.dictionaryWithDictionary(existingOverrides);

        overrides.setObject_forKey(this.transformedImage, objectID);

        this.selectedLayer.overrides = overrides;
    }
}

module.exports = SymbolicAngle
