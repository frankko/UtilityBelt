var UtilityBelt = {
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
  "images": {
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
  "utils": {
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