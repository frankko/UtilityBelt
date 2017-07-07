# ★ Utility Belt

An always-expanding collection of small, simple, focused plugins for Sketch 45+.

## Font →

* `List all Fonts`: displays an alert with the PostScript names of all the fonts used by the document. (Warning: if you’re using a lot of fonts the alert could get huge.)

## Guide →

* **[Temporarily Disabled]** `New Horizontal Guide at…`: prompts you for a location to create a horizontal guide. (An object or an artboard must be selected so the plugin knows where to place the guide.)
* **[Temporarily Disabled]** `New Vertical Guide at…`: prompts you for a location to create a vertical guide. (An object or an artboard must be selected so the plugin knows where to place the guide.)
* **[Temporarily Disabled]** `Selected Layer to Guides (Horizontal)`: draws horizontal guides along the top and bottom edges of the selected object(s).
* **[Temporarily Disabled]** `Selected Layer to Guides (Vertical)`: draws vertical guides along the left and right edges of the selected object(s).
* **[Temporarily Disabled]** `Selected Layer to Guides (Both)`: draws both horizontal and vertical guides along all four sides of the selected object(s).
* **[Temporarily Disabled]** `Selected Layer to Center Guide (Horizontal)`: draws a horizontal guide at the vertical center point of the selected object(s).
* **[Temporarily Disabled]** `Selected Layer to Center Guide (Vertical)`: draws a vertical guide at the horizontal center point of the selected object(s).
* **[Temporarily Disabled]** `Selected Layer to Center Guide (Both)`: draws a horizontal and vertical guide at center point of the selected object(s).
* **[Temporarily Disabled]** `Remove Guides from Selected Artboard`: removes all guides from the selected artboard

## Image →

* `Image (Clipboard) to Layer Pattern Fill`: if an image is in the clipboard, it will be pasted as a pattern fill on to the currently selected layer(s)
* `Image (URL) to Layer Pattern Fill`: prompts you for an image URL, which is downloaded and set as a pattern fill on to the currently selected layer(s)
  * [**Be careful.** There’s no error-checking in this yet, so be sure you’re pasting a URL to a bitmap image, otherwise Sketch will crash.]

## Info →

* **[Temporarily Disabled]** `Get Info on Selected Layers`: pops an alert box containing the cumulative x, y, width, and height of the selected layers.

## Move →

* `Move Selected Layers to [x,y]`: prompts you for new x,y coordinates and moves the selected objects to those new coordinates, _preserving each object’s relative position_.

## Select →

* `Select Layers by Name`: takes a user-inputted string and selects all artboards, layer groups, and/or layers that contain that string
* `Select Layers by Font Name`: enter a font’s PostScript family name and this will select all text layers in the current page matching the inputted font (use `Font → List all Fonts` to get a list of all document fonts.)
* **[Temporarily Disabled]** `Select Similar Color Border`: finds layers with a border color matching the currently selected layer
* **[Temporarily Disabled]** `Select Similar Color Fill`: finds layers with a fill color matching the currently selected layer

* * * 

### Who?

I’m Frank Kolodziej, a Wichita, KS-based freelance designer & developer. I am [available for hire](http://kolo.io/). I’m [@frankko](https://twitter.com/frankko) on Twitter.

#### Other Plugins

- [Place Linked Bitmap](https://github.com/frankko/Place-Linked-Bitmap): A plugin to place external bitmap files into Sketch and update Sketch layers after external bitmaps are updated
- [Artboard Tools](https://github.com/frankko/Artboard-Tools): Plugins for arranging artboards and navigating between artboards.