const Angle = require('./Angle');

class CompositionAngle extends Angle {
    
    constructor (options = {}) {
        
        super(options);

        this.targetPath = this.targetLayer.bezierPath();
        this.overrideLayer = options.overrideLayer;
    }

    estimatePixelDensity () {

        // Best guess of a 2x sampling of the image if the mockup is in it's original scale

        let [layerWidth, layerHeight] = this.maximumVerticesWidthAndHeight();
        
        let widthRatio = this.selectedLayer.rect().size.width * layerWidth / (this.selectedLayer.naturalSize().width * this.artboard.rect().size.width);
        let heightRatio = this.selectedLayer.rect().size.height * layerHeight / (this.selectedLayer.naturalSize().height * this.artboard.rect().size.height);
        
        let estimate = widthRatio > heightRatio ? widthRatio : heightRatio;
        
        return estimate;
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
