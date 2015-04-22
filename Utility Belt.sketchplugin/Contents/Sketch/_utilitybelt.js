var UtilityBelt = {
  "artboard": {
    "getCurrentArtboard": function(obj,page) {
      while ([obj parentGroup] != page) {
        obj = [obj parentGroup];
      }
      return obj;
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
    "displayMessage": function(doc,text) {
      log(text);
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