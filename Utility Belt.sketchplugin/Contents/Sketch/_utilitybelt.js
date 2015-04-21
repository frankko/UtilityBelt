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
      var layerWidth = [[layer frame] width];
      var imageData = UtilityBelt.network.getURL(url);
      var img = [[NSImage alloc] initWithData:imageData];
      var fill = layer.style().fills().firstObject();
      var coll = layer.style().fills().firstObject().documentData().images();
      [fill setPatternImage:img collection:coll]
      [fill setFillType:4];
      [fill setPatternFillType:1];
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
  "util": {
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