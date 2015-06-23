# ★ Utility Belt

An always-expanding collection of small, simple, focused plugins for Sketch 3.3.

## Font →

* `List all Fonts`: displays an alert with the PostScript names of all the fonts used by the document. (Warning: if you're using a lot of fonts the alert could get huge.)

## Guide →

* `Selected Layer to Guides (Horizontal)`: draws horizontal guides along the top and bottom edges of the selected object(s).
* `Selected Layer to Guides (Vertical)`: draws vertical guides along the left and right edges of the selected object(s).
* `Selected Layer to Guides (Both)`: draws both horizontal and vertical guides along all four sides of the selected object(s).
* `Selected Layer to Center Guide (Horizontal)`: draws a horizontal guide at the vertical center point of the selected object(s).
* `Selected Layer to Center Guide (Vertical)`: draws a vertical guide at the horizontal center point of the selected object(s).
* `Selected Layer to Center Guide (Both)`: draws a horizontal and vertical guide at center point of the selected object(s).
* `Remove Guides from Selected Artboard`: removes all guides from the selected artboard

## Image →

* `Image (Clipboard) to Layer Pattern Fill`: if an image is in the clipboard, it will be pasted as a pattern fill on to the currently selected layer(s)
* `Image (URL) to Layer Pattern Fill`: prompts the user for an image URL, which is downloaded and set as a pattern fill on to the currently selected layer(s)
  * [**Be careful.** There's no error-checking in this yet, so be sure you're pasting a URL to a bitmap image, otherwise Sketch will crash.]

## Move →

* `Move Selected Layers to [x,y]`: prompts the user for new x,y coordinates and moves the selected objects to those new coordinates, _preserving each object's relative position_.

## Select →

* `Select Layers by Name`: takes a user-inputted string and selects all artboards, layer groups, and/or layers that contain that string
* `Select Layers by Font Name`: enter a font's PostScript family name and this will select all text layers in the current page matching the inputted font (use `Font → List all Fonts` to get a list of all document fonts.)
* `Select Similar Color Border`: finds layers with a border color matching the currently selected layer
* `Select Similar Color Fill`: finds layers with a fill color matching the currently selected layer
