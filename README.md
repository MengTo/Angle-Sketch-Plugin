Angle is a free and lightweight Sketch plugin for applying perspective transforms on your mockups.

## Getting Started
The only thing that you need for Angle to work is an Artboard containing your Screen. Nothing else. Don't need to set each Artboard manually.

## Usage
All you need to do is select a Screen shape and Apply Mockup. That's it.
- Apply Mockup (`Command + \`): this will apply an Artboard to your selected shape.
- Flip Mockup (`Command + Shift + \`): once a mockup is applied, you can decide to Flip it.
- Rotate Mockup (`Control + \`).
- Reset Mockup (`Control + Command + \`): remove the metadata that's applied to your mockup.

## Auto-Detection
When applying a mockup (only then), Angle automatically detects all the Artboards, except the current Artboard. No expensive operations while you're designing, as this only happens when you activate Angle.

## Single Artboard
If you have a single Artboard with your screen, Angle will skip the modal and apply right away. Boom!

## Working with Symbols
If you have a Symbol that contains your Mockup, make sure to add a **Single Fill with Image**. That's how Angle knows that your Symbol contains a mockup.

## Pixel Density
By default, it's set to Auto, which will detect the size of selected Shape and apply a 2X pixel density.

## Image Quality
By default, it's set the Best. While you'll get the highest quality possible, this will increase your File size dramatically. By setting to lower quality, you will save a lot.

## Credit
This plugin was made possible by awesome team at [Design+Code](https://designcode.io), including [Tiago](https://github.com/tmergulhao) and [Kwan Yip Yap](http://twitter.com/pizza0502) and [Meng To](https://twitter.com/mengto).
