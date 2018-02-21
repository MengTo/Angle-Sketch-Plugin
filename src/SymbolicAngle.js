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

    applyImage () {

        let objectID = this.targetLayer.objectID();

        const existingOverrides = this.selectedLayer.overrides() || NSDictionary.dictionary();
        const overrides = NSMutableDictionary.dictionaryWithDictionary(existingOverrides);

        overrides.setObject_forKey(this.transformedImage, objectID);

        this.selectedLayer.overrides = overrides;
    }

    estimatePixelDensity () {

        // Best guess of a 2x sampling of the image if the mockup is in it's original scale

        let [layerWidth, layerHeight] = this.maximumVerticesWidthAndHeight();
        
        let widthRatio = this.selectedLayer.rect().size.width * layerWidth / (this.selectedLayer.naturalSize().width * this.artboard.rect().size.width);
        let heightRatio = this.selectedLayer.rect().size.height * layerHeight / (this.selectedLayer.naturalSize().height * this.artboard.rect().size.height);
        
        let estimate = widthRatio > heightRatio ? widthRatio : heightRatio;
        
        return estimate;
    }
}

module.exports = SymbolicAngle
