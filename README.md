# ★ Utility Belt

An always-expanding collection of small, simple, focused plugins for Sketch.

## Image →

* `Image (Clipboard) to Layer Pattern Fill`: if an image is in the clipboard, it will be pasted as a pattern fill on to the currently selected layer(s)
* `Image (URL) to Layer Pattern Fill`: prompts the user for an image URL, which is downloaded and set as a pattern fill on to the currently selected layer(s)
  * [**Be careful.** There's no error-checking in this yet, so be sure you're pasting a URL to a bitmap image, otherwise Sketch will crash.]

## Move →

* `Move Selected Layers to [x,y]`: prompts the user for new x,y coordinates and moves the selected objects to those new coordinates, _preserving each object's relative position_.