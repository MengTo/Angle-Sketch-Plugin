const Angle = require('./Angle');

// ---------------------------------
// SKETCH MNEMONIC ENUMS
// ---------------------------------

const StyleFillType = { solid: 0, gradient: 1, pattern: 4, noise: 5 };

class ShapeAngle extends Angle {
    constructor (options = {}) {
        super(options);

        this.targetLayer = this.selectedLayer;

        this.targetPath = this.selectedLayer.bezierPath();
    }

    applyImage () {

        let imageFill = MSStyleFill.alloc().init();
        imageFill.setImage(this.transformedImage);
        imageFill.fillType = StyleFillType.pattern;
    
        this.targetLayer.style().removeAllStyleFills();
        this.targetLayer.style().addStyleFill(imageFill);
    }
}

module.exports = ShapeAngle
