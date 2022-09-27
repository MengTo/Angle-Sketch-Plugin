![](https://cl.ly/2g211R2e2U3B/download/Angle-Logo.png)
Angle is a free and lightweight Sketch plugin for applying perspective transforms for your mockups. You can get the **[starting template](https://angle.sh)** to help you design beautiful mockups from scratch. Check out the **[full tutorial](https://www.youtube.com/watch?v=5uffgI-J29I)**.

# Getting Started

The only thing that Angle needs to work is an Artboard containing your Screen. That's it!
![](https://cl.ly/0D1l3y2D453a/download/Angle-GIF.gif)

## Installation

Make sure you have the latest version of Sketch (72+) running on macOS Catalina (10.15.0) or newer.

- [Download the zip file](https://github.com/MengTo/Angle-Sketch-Plugin/archive/master.zip).
- Double-click on Angle.sketchplugin

#### Important note:
- This plugin may not work for Sketch 93+. When we created this plugin, there was no other option at the time. Today, there is a great alternative called [Mockup](https://github.com/ruslanlatypov/Mockup-Plugin-for-Sketch). This will work with Angle mockups.
- use version [1.1.7](https://github.com/MengTo/Angle-Sketch-Plugin/releases/download/v1.1.7/Angle.sketchplugin.zip) for Sketch 86+
- use version [1.1.6](https://github.com/MengTo/Angle-Sketch-Plugin/releases/download/v1.1.6/Angle.sketchplugin.zip) for Sketch 72 to Sketch 85.1
- use version [1.1.5](https://github.com/MengTo/Angle-Sketch-Plugin/releases/download/v1.1.5/Angle.sketchplugin.zip) for Sketch 66 to Sketch 71.2
- use version [1.1.4](https://github.com/MengTo/Angle-Sketch-Plugin/releases/download/v1.1.4/Angle.sketchplugin.zip) for Sketch 65 and earlier.

Apply perspective transforms on screen mockups. Auto-detect screens by resolution and works on shapes and symbols.

## Usage

Select a shape layer and do **Apply Mockup** `Command + \`.
![](https://images.ctfassets.net/l7neci24wkw8/ebI08E1aZfvpMN1pChH1J/0fdfa8806ca1443aaeb786fd449adb72/Apply.png)

- **Apply Mockup** `Command + \`: this will apply an Artboard to your selected shape.

## Auto-Detect

When applying a mockup, Angle automatically detects all the Artboards, except the current Artboard. No expensive operations while you're designing, as this only happens when you run one of Angle's commands.
![](https://cl.ly/2W3o332N0p25/download/Angle-Detect.png)

## Single Artboard

If you have a single Artboard with your screen, Angle will skip the modal and apply right away. Boom!

## Working with Symbols

If you have a Symbol that contains your Mockup, make sure to have an **Image Fill**. That's how Angle knows that your Symbol contains a mockup.
![](https://cl.ly/1L2Q3u1n0T33/download/Angle-Symbol.png)

## Multiple Shapes and Nested Symbols

If you have multiple shapes or a Nested Symbols, you can apply the mockups to multiple destinations.

## Pixel Density

By default, it's set to **Auto**, which will detect the size of selected shape and apply a **2x** pixel density. You can set to **1x**, **2x**, **3x** or **4x**.

## Image Quality

By default, it's set the **Best**. While you'll get the highest quality possible, this will increase your filesize dramatically. By setting to **Better**, **Good** or **Average**, you will make the file smaller.

## Credit

This plugin was made by the team at [Design+Code](https://designcode.io), including [Tiago Mergulhao](https://github.com/tmergulhao), [Meng To](https://twitter.com/mengto) and [Kwan Yip Yap](http://twitter.com/pizza0502).
