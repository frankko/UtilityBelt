var UtilityBelt = {
  "array": {
    "arrayFlatten": function(arr) {
      var flattened = [];
      if (arr.length > 0) {
        for (var x = 0; x < arr.length; x++) {
          var arrX = arr[x];
          for (var y = 0; y < [arrX count]; y++) {
            flattened.push(arrX[y]);
          }
        }
      }
      return flattened;
    },
    "arrayUnique": function(a) {
      return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
      }, []);
    }
  },
  "artboard": {
    "getCurrentArtboard": function(obj,page) {
      while ([obj parentGroup] != page) {
        obj = [obj parentGroup];
      }
      return obj;
    }
  },
  "guide": {
    "addGuide": function(artboard,dir,val) {
      if (dir == "h") {
        var rulerData = [artboard verticalRulerData];
      } else {
        var rulerData = [artboard horizontalRulerData];
      }
      [rulerData addGuideWithValue:val];
    },
    "removeGuidesFromArtboard": function(artboard) {
      var rulerDataH = [artboard horizontalRulerData];
      while ([rulerDataH numberOfGuides] > 0) {
        [rulerDataH removeGuideAtIndex:0];
      }
      var rulerDataV = [artboard verticalRulerData];
      while ([rulerDataV numberOfGuides] > 0) {
        [rulerDataV removeGuideAtIndex:0];
      }
    }
  },
  "image": {
    "getImageFromClipboard": function() {
      var pasteBoard = [NSPasteboard generalPasteboard];
      var validPBTypes = [[NSArray alloc] initWithObjects:[NSImage class], nil];
      var pbOptions = [NSDictionary dictionary];
      var copiedItems = [pasteBoard readObjectsForClasses:validPBTypes options:pbOptions];
      if ([copiedItems count] > 0) {
        return [copiedItems objectAtIndex:0];
      } else {
        return false;
      }
    },
    "setImageAsFill": function(layer,img) {
      var layerWidth = [[layer frame] width];
      var fill = layer.style().fills().firstObject();
      var coll = layer.style().fills().firstObject().documentData().images();
      [fill setPatternImage:img collection:coll]
      [fill setFillType:4];
      [fill setPatternFillType:1];
    },
    "setImageURLasFill": function(layer,url) {
      var imageData = UtilityBelt.network.getURL(url);
      var img = [[NSImage alloc] initWithData:imageData];
      UtilityBelt.image.setImageAsFill(layer,img);
    }
  },
  "layer": {
    "getRect": function(selection) {
      var allLeft = [],
          allTop = [],
          allRight = [],
          allBottom = [];

      var loop = [selection objectEnumerator];
      while (layer = [loop nextObject]) {
        var layerX = parseFloat([[layer frame] x]);
        var layerY = parseFloat([[layer frame] y]);
        var layerR = parseFloat(layerX + [[layer frame] width]);
        var layerB = parseFloat(layerY + [[layer frame] height]);

        allLeft.push(layerX);
        allTop.push(layerY);
        allRight.push(layerR);
        allBottom.push(layerB);
      }

      allLeft.sort(function(a,b){return a-b});
      allTop.sort(function(a,b){return a-b});

      allRight.sort(function(a,b){return b-a});
      allBottom.sort(function(a,b){return b-a});

      var returnObj = {
        top:allTop[0],
        right:allRight[0],
        bottom:allBottom[0],
        left:allLeft[0]
      };

      return returnObj;
    },
    "moveLayersToXY": function(layers,newX,newY) {
      var minX, minY;
      var layersRect = UtilityBelt.layer.getRect(layers);

      minX = layersRect.left;
      minY = layersRect.top;

      var loop = [layers objectEnumerator];
      while (layer = [loop nextObject]) {
        var layerX = parseFloat([[layer frame] x]);
        var layerY = parseFloat([[layer frame] y]);
        var layerNewX = newX + layerX - minX;
        var layerNewY = newY + layerY - minY;

        [[layer frame] setX:layerNewX];
        [[layer frame] setY:layerNewY];
      }
    }
  },
  "network": {
    "getJSON": function(url) {
      var response = UtilityBelt.network.getURL(url);
      return JSON.parse(NSString.alloc().initWithData_encoding(response, NSUTF8StringEncoding));
    },
    "getURL": function(url) {
      var request = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
      var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);
      return response;
    }
  },
  "select": {
    "selectSimilarColorBorder": function(context,target,hexValue) {
      var doc = context.document;
      var scope = [target children];
      var predicate = NSPredicate.predicateWithFormat("style.border.color.hexValue == %@",hexValue);
      var queryResult = scope.filteredArrayUsingPredicate(predicate);

      if ([queryResult count] > 1) {
        [[doc currentPage] deselectAllLayers];
        [target selectLayers:queryResult];
      } else {
        UtilityBelt.util.displayMessage(doc,"No similar layers (border color) found.");
      }
    },
    "selectSimilarColorFill": function(context,target,hexValue) {
      var doc = context.document;
      var scope = [target children];
      var predicate = NSPredicate.predicateWithFormat("style.fill.color.hexValue == %@",hexValue);
      var queryResult = scope.filteredArrayUsingPredicate(predicate);

      if ([queryResult count] > 1) {
        [[doc currentPage] deselectAllLayers];
        [target selectLayers:queryResult];
      } else {
        UtilityBelt.util.displayMessage(doc,"No similar layers (fill color) found.");
      }
    }
  },
  "util": {
    "displayAlert": function(title,text) {
      var app = [NSApplication sharedApplication];
      [app displayDialog:text withTitle:title];
    },
    "displayPrompt": function(doc,text,initialValue) {
      var capturedInput = [doc askForUserInput:text initialValue:initialValue];
      return capturedInput;
    },
    "displayMessage": function(doc,text) {
      [doc showMessage:text];
    },
    "dumpObj": function(obj) {
      log("#####################################################################################")
      log("## Dumping object " + obj )
      log("## obj class is: " + [obj className])
      log("#####################################################################################")

      log("obj.properties:")
      log([obj class].mocha().properties())
      log("obj.propertiesWithAncestors:")
      log([obj class].mocha().propertiesWithAncestors())

      log("obj.classMethods:")
      log([obj class].mocha().classMethods())
      log("obj.classMethodsWithAncestors:")
      log([obj class].mocha().classMethodsWithAncestors())

      log("obj.instanceMethods:")
      log([obj class].mocha().instanceMethods())
      log("obj.instanceMethodsWithAncestors:")
      log([obj class].mocha().instanceMethodsWithAncestors())

      log("obj.protocols:")
      log([obj class].mocha().protocols())
      log("obj.protocolsWithAncestors:")
      log([obj class].mocha().protocolsWithAncestors())

      log("obj.treeAsDictionary():")
      log(obj.treeAsDictionary())
    },
    "reloadInspector": function(doc) {
      [doc reloadInspector];
    },
    "sanitizeHexValue": function(hexValue) {
      hexValue = hexValue.replace("#","");
      hexValue = hexValue.toUpperCase();

      hexValueLength = hexValue.length;

      if (hexValueLength == 3) {
        var hexR = hexValue.substr(0,1);
        var hexG = hexValue.substr(1,1);
        var hexB = hexValue.substr(2,1);
        hexValue = hexR + hexR + hexG + hexG + hexB + hexB;
      } else if (hexValueLength == 6) {
      } else {
        hexValue = hexValue.substr(0,6);
      }

      return hexValue;
    },
    "sendAction": function(context,commandToPerform) {
      var doc = context.document;
      try {
        [NSApp sendAction:commandToPerform to:nil from:doc];
      } catch(e) {
        log(e);
      }
    }
  }
};