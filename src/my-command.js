const StyleFillType = { solid: 0, gradient: 1, pattern: 4, noise: 5 };

var debug = function(arg) {
	log(arg);
}

// var resourcesPath = function(context) {
// 	var basePath = NSString.stringWithFormat_(context.scriptPath)
// 	.stringByDeletingLastPathComponent()
// 	.stringByDeletingLastPathComponent()
//   .stringByDeletingLastPathComponent()

// 	var plugin = context.plugin
// 	if ( ! basePath || ! plugin) {
// 		var _application = NSApplication.sharedApplication();
// 		var _delegate = _application.delegate()
// 		var _plugins = _delegate.pluginManager().plugins()
// 		var _plugin = _plugins["design.angle"]
// 		var _path = _plugin.url().copy().path() + "/Contents/Resources"
// 		return _path
//   }
// 	return basePath + "/Contents/Resources/";
// }

// var loadFramework = function(frameworkName, directory){
//   var mocha = Mocha.sharedRuntime();
// 	if (mocha.loadFrameworkWithName_inDirectory_(frameworkName,directory)) {
// 		debug("loadFramework: `" + frameworkName + "` success!");
// 		return true;
//   }
// 	debug("❌  loadFramework: `" + frameworkName + "` failed!");
// 	return false;
// }

// var initialize = function(context) {
//   var path = context.scriptPath
//     .stringByDeletingLastPathComponent()
//     .stringByDeletingLastPathComponent()
//     .stringByDeletingLastPathComponent();
// 	// var path = resourcesPath(context);
// 	log("resource:" + path);
// 	if (NSClassFromString("Angle") == null) {

//     let contents = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error_(path, null);

//     print(contents);

// 		loadFramework("Angle", path);
// 	}
// }

function descriptionForBezierPoint_(bezierPoint) {
  switch (bezierPoint.elementType) {
    case NSMoveToBezierPathElement:
      return "MOVE TO: x:" + bezierPoint.point.x + "\t\ty: " + bezierPoint.point.y
    case NSLineToBezierPathElement:
      return "LINE TO: x:" + bezierPoint.point.x + "\t\ty: " + bezierPoint.point.y
    case NSCurveToBezierPathElement:
      return "CURVE TO: x:" + bezierPoint.point.x + "\t\ty: " + bezierPoint.point.y
    case NSClosePathBezierPathElement:
      return "CLOSE PATH"
  }
}

function pointsFromBezierPath(bezierPath) {

  let count = bezierPath.elementCount();

  let array = Array.from({length: count}, (x, i) => i);

  return array.map(
    (a,i,as) => {
      var pointsPointer = MOPointer.alloc().initWithValue_(CGPointMake(0,0));
      var element = bezierPath.elementAtIndex_associatedPoints_(i, pointsPointer);

      let point = pointsPointer.value();

      // print(descriptionForBezierPoint_({elementType: element, point: point}));

      return point
    }
  );
}

function loadLocalImage(filePath) {
  if(!NSFileManager.defaultManager().fileExistsAtPath(filePath)) {
      print("File does not exist at path");
      return null;
  }

  print("Image loaded");

  return NSImage.alloc().initWithContentsOfFile(filePath);
}

function fetchImage(url,ingnoreCache) {
  var request = ingnoreCache ?NSURLRequest.requestWithURL_cachePolicy_timeoutInterval(NSURL.URLWithString(url),NSURLRequestReloadIgnoringLocalCacheData,60) : NSURLRequest.requestWithURL(NSURL.URLWithString(url));
  var responsePtr = MOPointer.alloc().init();
  var errorPtr = MOPointer.alloc().init();

  var data = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, responsePtr, errorPtr);
  if(errorPtr.value() != null) {
      print(errorPtr.value());
      return null;
  }

  var response = responsePtr.value();
  if(response.statusCode() != 200) {
      return null;
  }

  var mimeType = response.allHeaderFields()["Content-Type"];
  if(!mimeType || !mimeType.hasPrefix("image/")) {
      return null;
  }

  return data; // NSImage.alloc().initWithData(data)
}

function introspect (type) {

  let mocha = type.class().mocha();

  print(mocha.properties()); // array of MSDocument specific properties defined on a MSDocument instance
  print(mocha.propertiesWithAncestors()); // array of all the properties defined on a MSDocument instance

  print(mocha.instanceMethods()); // array of methods defined on a MSDocument instance
  print(mocha.instanceMethodsWithAncestors());

  print(mocha.classMethods()); // array of methods defined on the MSDocument class
  print(mocha.classMethodsWithAncestors());

  print(mocha.protocols()); // array of protocols the MSDocument class inherits from
  print(mocha.protocolsWithAncestors());
}

export default function(context) {

  // var imageData = fetchImage("https://s3.amazonaws.com/sketch-plugins-cookbook/jake_the_dog.png");
  // let nsImage = NSImage.alloc().initWithData(imageData);

  var selectedLayers = context.selection;

  if (selectedLayers.count() != 1) {

    context.document.showMessage("Please, select only one element at a time")
    return
  }
  
  var layer = selectedLayers.firstObject();

  //introspect(MSImageData);

  let bezierPath = layer.bezierPath();
  var rawPoints = pointsFromBezierPath(bezierPath);
  
  let minimumX = rawPoints.reduce(( (p, a, i, as) => p > a.x ? a.x : p ), rawPoints[0].x);
  let minimumY = rawPoints.reduce(( (p, a, i, as) => p > a.y ? a.y : p ), rawPoints[0].y);
  let maximumY = rawPoints.reduce(( (p, a, i, as) => p < a.y ? a.y : p ), rawPoints[0].y);

  let points = rawPoints.map(
    function (a, i, as) {
      let xValue = minimumX >= 0 ? a.x - minimumX : a.x + minimumX;
      let yValue = minimumY >= 0 ? a.y - minimumY : a.y + minimumY;

      return CIVector.vectorWithX_Y(xValue, maximumY - minimumY - yValue);
  });

  let perspectiveTransform = CIFilter.filterWithName("CIPerspectiveTransform");

  perspectiveTransform.setValue_forKey(points[0], "inputTopLeft");
  perspectiveTransform.setValue_forKey(points[1], "inputTopRight");
  perspectiveTransform.setValue_forKey(points[2], "inputBottomRight");
  perspectiveTransform.setValue_forKey(points[3], "inputBottomLeft");

  let basePath = context.scriptPath
    .stringByDeletingLastPathComponent()
    .stringByDeletingLastPathComponent()
    .stringByDeletingLastPathComponent();

  let imageNSImage = NSImage.alloc().initWithContentsOfFile(basePath + "/screen.png");

  let imageTiff = imageNSImage.TIFFRepresentation();
  let imageBitmap = NSBitmapImageRep.imageRepWithData(imageTiff);
  let image = CIImage.alloc().initWithBitmapImageRep(imageBitmap);

  perspectiveTransform.setValue_forKey(image, "inputImage");
  print(perspectiveTransform);

  let perspectiveImage = perspectiveTransform.valueForKey("outputImage");

  print(perspectiveImage);

  if (perspectiveImage) {
    print("There is an image");
  } else {
    print("There is no image");
    return
  }

  // Angle.angleImage_forPoints();

  // print(NSCIImageRep.class().mocha().classMethods());

  // var pointerForImageRepresentation = MOPointer.alloc().initWithValue_(perspectiveImage);

  let representation = NSCIImageRep.imageRepWithCIImage(perspectiveImage);
  let transformedImage = NSImage.alloc().initWithSize(representation.size());
  transformedImage.addRepresentation(representation);

  let newFill = MSStyleFill.alloc().init();

  let msImage = MSImageData.alloc().initWithImage_convertColorSpace_(transformedImage, true);
  newFill.setImage(msImage);
  newFill.fillType = StyleFillType.pattern;

  layer.style().addStyleFill(newFill);

  //let transformedImage = NSImage.alloc().initWithCIImage_(composite.outputImage());

  // const fill = layer.style().firstEnabledFill();

  //fill.image = MSImageData.alloc().initWithImage(image);

  // print("I'm here");
}

  // var documentName = context.document.displayName();
  // log('The current document is named: ' + documentName)
  // print(CIImage.class().mocha().classMethods());