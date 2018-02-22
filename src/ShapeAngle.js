const Angle = require('./Angle');
import { Error } from './Error'

const StyleFillType = { solid: 0, gradient: 1, pattern: 4, noise: 5 };

class ShapeAngle extends Angle {
    constructor (options = {}) {
        super(options);

        this.targetLayer = this.selectedLayer;
        this.targetPath = this.selectedLayer.bezierPath();

        if (!this.pointsAreValid) {
            return Error.unsupportedShapePath
        }
    }

    applyImage () {

        let imageFill = MSStyleFill.alloc().init();
        imageFill.setImage(this.transformedImage);
        imageFill.fillType = StyleFillType.pattern;
    
        this.targetLayer.style().removeAllStyleFills();
        this.targetLayer.style().addStyleFill(imageFill);
    }

    estimatePixelDensity () {

        // Best guess of a 2x sampling of the image if the mockup is in it's original scale
        
        let [layerWidth, layerHeight] = this.maximumVerticesWidthAndHeight();
        
        let widthRatio = layerWidth / this.artboard.rect().size.width;
        let heightRatio = layerHeight / this.artboard.rect().size.height;
        
        let estimate = widthRatio > heightRatio ? widthRatio : heightRatio;
        
        return estimate;
    }

    description () {
        return this.targetLayer.name();
    }
}

module.exports = ShapeAngle
