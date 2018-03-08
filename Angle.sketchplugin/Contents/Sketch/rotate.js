var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Error = exports.Error = {
    unsupportedSymbol: {
        message: "This does not seem to be a supported symbol."
    },
    unsupportedShapePath: {
        message: "There seems to be an issue with the shape we are trying to apply."
    },
    emptySelection: {
        message: "Please, select a Shape, Angle Mockup or Angle Composition"
    },
    unsupportedElement: {
        message: "Please, select a Shape, Angle Mockup or Angle Composition"
    },
    noImageOverrideOnSymbol: {
        message: "There is no image override for the selected symbol"
    },
    symbolWithBitMapLayer: {
        message: "Bitmat overrides are not supported"
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CompressionRatio = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Angle = function () {
    _createClass(Angle, [{
        key: "imprintValue_forKey",


        // ---------------------------------
        // PERSISTENCY METHODS
        // ---------------------------------

        value: function () {
            function imprintValue_forKey(value, key) {
                if (this.selectedLayer == null) {
                    print("🛑 Imprinting value before selected layer assignment");
                    return;
                }

                this.context.command.setValue_forKey_onLayer(value, key, this.selectedLayer);

                // print("☑️ Persistent data imprinted into layer: " + key);
                // print("Value: " + value);
            }

            return imprintValue_forKey;
        }()
    }, {
        key: "imprintValues_forKeys",
        value: function () {
            function imprintValues_forKeys(dictionary) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Object.entries(dictionary)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _ref = _step.value;

                        var _ref2 = _slicedToArray(_ref, 2);

                        var key = _ref2[0];
                        var value = _ref2[1];

                        this.imprintValue_forKey(key, dictionary[key]);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator["return"]) {
                            _iterator["return"]();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }

            return imprintValues_forKeys;
        }()
    }, {
        key: "loadValueForKey",
        value: function () {
            function loadValueForKey(key) {
                if (this.selectedLayer == null) {
                    print("🛑 Loading value before selected layer assignment");
                    return null;
                }

                var value = this.context.command.valueForKey_onLayer(key, this.selectedLayer);
                // print("☑️ Persistent data loaded from layer: " + key);
                // print("Value: " + value);
                return value;
            }

            return loadValueForKey;
        }()

        // ---------------------------------
        // CONSTRUCTOR
        // ---------------------------------

    }, {
        key: "artboardID",


        // ---------------------------------
        // PERSISTENT PROPERTIES
        // ---------------------------------

        get: function () {
            function get() {
                if (this._artboardID != undefined) {
                    return this._artboardID;
                }

                // Javascript string cohersion
                this._artboardID = this.loadValueForKey("artboard-id") + "";

                return this._artboardID;
            }

            return get;
        }(),
        set: function () {
            function set(value) {
                return;
            }

            return set;
        }()
    }, {
        key: "artboard",
        get: function () {
            function get() {
                if (this._artboard != undefined) {
                    return this._artboard;
                }

                if (this.artboardID == undefined) {
                    print("🛑 No artboard ID registered");
                    return;
                }

                var artboards = this.context.document.artboards();

                for (var index = 0; index < artboards.count(); index++) {
                    if (artboards[index].objectID() == this.artboardID) {
                        this._artboard = artboards[index];
                    }
                }

                if (this._artboard == undefined) {
                    print("🛑 Not able to retrieve artboard from id in document");
                    return;
                }

                return this._artboard;
            }

            return get;
        }(),
        set: function () {
            function set(value) {
                this._artboard = value;
                this.imprintValue_forKey(value.objectID(), "artboard-id");
            }

            return set;
        }()
    }, {
        key: "rotation",
        get: function () {
            function get() {
                if (this._rotation == undefined) {
                    this._rotation = this.loadValueForKey("rotation");
                }
                return this._rotation;
            }

            return get;
        }(),
        set: function () {
            function set(value) {
                this._rotation = value;
                this.imprintValue_forKey(value, "rotation");
            }

            return set;
        }()
    }, {
        key: "pixelDensity",
        get: function () {
            function get() {
                if (this._pixelDensity == undefined) {
                    this._pixelDensity = this.loadValueForKey("pixel-density") + 0;
                }

                if (this._pixelDensity == 0) {
                    var roundedEstimate = Math.round(2 * this.estimatePixelDensity() + 0.5);
                    return roundedEstimate == 0 ? 1 : roundedEstimate;
                }

                return this._pixelDensity;
            }

            return get;
        }(),
        set: function () {
            function set(value) {
                this._pixelDensity = value;
                this.imprintValue_forKey(value, "pixel-density");
            }

            return set;
        }()
    }, {
        key: "compressionRatio",
        get: function () {
            function get() {
                if (this._compressionRatio == undefined) {
                    this._compressionRatio = this.loadValueForKey("compression-ratio") + 0;
                }

                return this._compressionRatio;
            }

            return get;
        }(),
        set: function () {
            function set(value) {
                this._compressionRatio = value;
                this.imprintValue_forKey(value, "compression-ratio");
            }

            return set;
        }()
    }, {
        key: "reversed",
        get: function () {
            function get() {
                if (this._reversed == undefined) {
                    // Javascript boolean cohersion
                    this._reversed = this.loadValueForKey("reversed") == 1 ? true : false;
                }
                return this._reversed;
            }

            return get;
        }(),
        set: function () {
            function set(value) {
                this._reversed = value;
                this.imprintValue_forKey(value, "reversed");
            }

            return set;
        }()
    }]);

    function Angle() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Angle);

        this.context = options.context;
        this.selectedLayer = options.selectedLayer;
    }

    // ---------------------------------
    // IMAGE DATA
    // ---------------------------------

    _createClass(Angle, [{
        key: "guessRotationAndReversion",
        value: function () {
            function guessRotationAndReversion() {

                // Avoid double inference overriding user configuration

                var hasAlreadyGuessed = this.loadValueForKey("guessed-rotation") == 1 ? true : false;

                if (hasAlreadyGuessed) {
                    print("⚠️ Angle has already guessed rotation and simmetry for this shape");
                    return;
                }

                print("🔄↔️ Angle has just guessed rotation and simmetry for this shape");
                this.imprintValue_forKey(true, "guessed-rotation");

                var verticesLengths = this.verticesLengths;

                var artboardSize = void 0;

                if (this.artboard["class"]() == MSSymbolMaster) {
                    // artboard.frame == undefined
                    return;
                    artboardSize = this.artboard.optimalBoundingBox();
                } else {
                    artboardSize = this.artboard.frame();
                }

                var firstVerticeLength = verticesLengths[0];
                var secondVerticeLength = verticesLengths[1];

                var isHorizontal = firstVerticeLength > secondVerticeLength;
                var hasHorizontalArtboard = artboardSize.width() > artboardSize.height();

                if (isHorizontal) {
                    // Ensures that the first vertice is smaller
                    print("🛑 HORIZONTAL");
                    this.rotate();
                }

                if (hasHorizontalArtboard) {
                    print("🛑 HAS HORIZONTAL ARTBOARD");
                    this.rotate();
                }

                var points = this.pointsFromBezierPath;
                var minimumX = points.reduce(function (p, a, i, as) {
                    return p > a.x ? a.x : p;
                }, points[0].x);
                var minimumY = points.reduce(function (p, a, i, as) {
                    return p > a.y ? a.y : p;
                }, points[0].y);

                print(points);

                var mappedFirstPoint = points[this.mappedIndexFor(0)];
                var mappedSecondPoint = points[this.mappedIndexFor(1)];

                var isUpsideDown = !(mappedFirstPoint.y == minimumY || mappedSecondPoint.y == minimumY);

                if (isUpsideDown) {
                    print("🛑 UPSIDE DOWN");
                    this.rotate();
                    this.rotate();
                }

                var maximumY = points.reduce(function (p, a, i, as) {
                    return p < a.y ? a.y : p;
                }, points[0].y);

                var shoelaceSumOfPoints = Array.from({ length: 4 }, function (x, i) {
                    return i;
                }).reduce(function (p, a, i, as) {
                    var edgeSum = (-points[i].x + points[(i + 1) % 4].x) * (2 * maximumY - points[i].y - points[(i + 1) % 4].y);
                    return p + edgeSum;
                }, 0);

                if (shoelaceSumOfPoints < 0) {
                    print("🛑 COUNTERCLOCKWISE");
                    this.reverseSimmetry();
                } else if (shoelaceSumOfPoints > 0) {
                    print("🛑 CLOCKWISE");
                } else {
                    print("🛑 UNDEFINED CHIRALITY");
                }
            }

            return guessRotationAndReversion;
        }()

        // ---------------------------------
        // PATH
        // ---------------------------------

    }, {
        key: "maximumVerticesWidthAndHeight",
        value: function () {
            function maximumVerticesWidthAndHeight() {

                var verticesLengths = this.verticesLengths;

                var layerWidth = void 0,
                    layerHeight = void 0;

                if (this.rotation % 2 == 0) {
                    layerWidth = verticesLengths[0] > verticesLengths[2] ? verticesLengths[0] : verticesLengths[2];
                    layerHeight = verticesLengths[1] > verticesLengths[3] ? verticesLengths[1] : verticesLengths[3];
                } else {
                    layerWidth = verticesLengths[1] > verticesLengths[3] ? verticesLengths[1] : verticesLengths[3];
                    layerHeight = verticesLengths[0] > verticesLengths[2] ? verticesLengths[0] : verticesLengths[2];
                }

                return [layerWidth, layerHeight];
            }

            return maximumVerticesWidthAndHeight;
        }()
    }, {
        key: "rotate",


        // ---------------------------------
        // INTERFACE
        // ---------------------------------

        value: function () {
            function rotate() {

                this.rotation = (this.rotation + (this.reversed ? 1 : 3)) % 4;
            }

            return rotate;
        }()
    }, {
        key: "reverseSimmetry",
        value: function () {
            function reverseSimmetry() {

                this.rotation = (this.rotation + (this.reversed ? 1 : 3)) % 4;

                this.reversed = !this.reversed;
            }

            return reverseSimmetry;
        }()

        // ---------------------------------
        // DRAWING
        // ---------------------------------

    }, {
        key: "mappedIndexFor",
        value: function () {
            function mappedIndexFor(index) {

                if (this.reversed) {
                    return [0, 3, 2, 1][(index + this.rotation) % 4];
                }
                return (index + this.rotation) % 4;
            }

            return mappedIndexFor;
        }()
    }, {
        key: "lossyCompressionOfImage_atRate",
        value: function () {
            function lossyCompressionOfImage_atRate(image, rate) {

                var representation = NSBitmapImageRep.alloc().initWithCIImage(image);
                var properties = NSMutableDictionary.dictionary();

                properties.setObject_forKey(NSTIFFCompressionJPEG, NSImageCompressionMethod);
                properties.setObject_forKey(rate, NSImageCompressionFactor);
                properties.setObject_forKey(NSColor.whiteColor(), NSImageFallbackBackgroundColor);

                var compressed = representation.representationUsingType_properties(NSJPEGFileType, properties);
                var nsImage = NSImage.alloc().initWithData(compressed);

                return nsImage;
            }

            return lossyCompressionOfImage_atRate;
        }()
    }, {
        key: "pixelAccurateRepresentationOfImage",
        value: function () {
            function pixelAccurateRepresentationOfImage(image) {

                var representation = NSCIImageRep.imageRepWithCIImage(image);
                var nsImage = NSImage.alloc().initWithSize(representation.size());
                nsImage.addRepresentation(representation);

                return nsImage;
            }

            return pixelAccurateRepresentationOfImage;
        }()
    }, {
        key: "imageData",
        get: function () {
            function get() {

                var layerAncestry = MSImmutableLayerAncestry.alloc().initWithMSLayer(this.artboard);
                var exportFormat = MSExportFormat.formatWithScale_name_fileFormat(this.pixelDensity, "Angle", "png");
                var exportRequest = MSExportRequest.exportRequestsFromLayerAncestry_exportFormats(layerAncestry, [exportFormat]).firstObject();
                var exporter = MSExporter.exporterForRequest_colorSpace(exportRequest, NSColorSpace.sRGBColorSpace());
                var imageData = exporter.bitmapImageRep().TIFFRepresentation();

                if (imageData == undefined) {
                    print("🛑 Unable to retrieve image data");
                } else {
                    print("🖼 Image data retrieved");
                }

                return imageData;
            }

            return get;
        }()

        // ---------------------------------
        // PATH VALIDATION AND CORRECTION
        // ---------------------------------

    }, {
        key: "pointsAreValid",
        get: function () {
            function get() {

                var points = this.pointsFromBezierPath;
                if (points == null) {
                    return false;
                }

                var length = points.length;

                if (length != 7) {
                    return false;
                }

                // If the shape is an X crossing shape, fail
                // If two or more points coincide, fail

                // There seems to be something wrong with your shape 😕

                return true;
            }

            return get;
        }()
    }, {
        key: "pointsFromBezierPath",
        get: function () {
            function get() {
                var _this = this;

                if (this._pointsFromBezierPath != undefined) {
                    return this._pointsFromBezierPath;
                }

                var count = this.targetPath.elementCount();

                if (count != 7) {
                    return null;
                }

                var array = Array.from({ length: count }, function (x, i) {
                    return i;
                });

                var points = array.map(function (a, i, as) {
                    var pointsPointer = MOPointer.alloc().initWithValue_(CGPointMake(0, 0));
                    var element = _this.targetPath.elementAtIndex_associatedPoints_(i, pointsPointer);

                    var point = pointsPointer.value();

                    return point;
                });

                this._pointsFromBezierPath = points;

                return points;
            }

            return get;
        }()
    }, {
        key: "verticesLengths",
        get: function () {
            function get() {

                if (this._verticesLengths != undefined) {
                    return this._verticesLengths;
                }

                var points = this.pointsFromBezierPath;

                var verticesLengths = Array.from({ length: 4 }, function (x, i) {
                    return i;
                }).map(function (a, i, as) {
                    var width = points[i].x - points[(i + 1) % 4].x;
                    var height = points[i].y - points[(i + 1) % 4].y;
                    return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
                });

                this._verticesLengths = verticesLengths;

                return verticesLengths;
            }

            return get;
        }()
    }, {
        key: "normalizedCIVectors",
        get: function () {
            function get() {

                var points = this.pointsFromBezierPath;

                var minimumX = points.reduce(function (p, a, i, as) {
                    return p > a.x ? a.x : p;
                }, points[0].x);
                var minimumY = points.reduce(function (p, a, i, as) {
                    return p > a.y ? a.y : p;
                }, points[0].y);
                var maximumY = points.reduce(function (p, a, i, as) {
                    return p < a.y ? a.y : p;
                }, points[0].y);

                var pixelDensity = this.pixelDensity;

                return points.map(function (a, i, as) {
                    var xValue = minimumX >= 0 ? a.x - minimumX : a.x + minimumX;
                    var yValue = minimumY >= 0 ? a.y - minimumY : a.y + minimumY;
                    var vector = CIVector.vectorWithX_Y(xValue * pixelDensity, (maximumY - minimumY - yValue) * pixelDensity);

                    return vector;
                });
            }

            return get;
        }()
    }, {
        key: "transformedImage",
        get: function () {
            function get() {

                var vectors = this.normalizedCIVectors;

                var perspectiveTransform = CIFilter.filterWithName("CIPerspectiveTransform");

                perspectiveTransform.setValue_forKey(vectors[this.mappedIndexFor(0)], "inputTopLeft");
                perspectiveTransform.setValue_forKey(vectors[this.mappedIndexFor(1)], "inputTopRight");
                perspectiveTransform.setValue_forKey(vectors[this.mappedIndexFor(2)], "inputBottomRight");
                perspectiveTransform.setValue_forKey(vectors[this.mappedIndexFor(3)], "inputBottomLeft");

                var imageBitmap = NSBitmapImageRep.imageRepWithData(this.imageData);
                var image = CIImage.alloc().initWithBitmapImageRep(imageBitmap);

                perspectiveTransform.setValue_forKey(image, "inputImage");

                var perspectiveImage = perspectiveTransform.valueForKey("outputImage");

                if (!perspectiveImage) {
                    print("🛑 Unable to form perspective image");
                    return;
                }

                var ouputNSImage = void 0;

                var compressionRatio = Object.values(_CompressionRatio.CompressionRatio)[this.compressionRatio].ratio;

                if (compressionRatio != 1.0) {
                    ouputNSImage = this.lossyCompressionOfImage_atRate(perspectiveImage, compressionRatio);
                } else {
                    ouputNSImage = this.pixelAccurateRepresentationOfImage(perspectiveImage);
                }

                if (MSApplicationMetadata.metadata().appVersion < 47) {
                    return MSImageData.alloc().initWithImage_convertColorSpace(ouputNSImage, false);
                }

                return MSImageData.alloc().initWithImage_(ouputNSImage);
            }

            return get;
        }()
    }]);

    return Angle;
}();

exports["default"] = Angle;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
var CompressionRatio = exports.CompressionRatio = {
    best: {
        selectionLabel: "Best",
        ratio: 1.0
    },
    better: {
        selectionLabel: "Better",
        ratio: 0.9
    },
    good: {
        selectionLabel: "Good",
        ratio: 0.8
    },
    average: {
        selectionLabel: "Average",
        ratio: 0.7
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Angle2 = __webpack_require__(1);

var _Angle3 = _interopRequireDefault(_Angle2);

var _Error = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SymbolicAngle = function (_Angle) {
    _inherits(SymbolicAngle, _Angle);

    function SymbolicAngle() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, SymbolicAngle);

        var _this = _possibleConstructorReturn(this, (SymbolicAngle.__proto__ || Object.getPrototypeOf(SymbolicAngle)).call(this, options));

        _this.targetLayer = options.override.affectedLayer();

        if (_this.targetLayer['class']() == MSImmutableBitmapLayer) {
            var _ret;

            return _ret = _Error.Error.symbolWithBitMapLayer, _possibleConstructorReturn(_this, _ret);
        }

        _this.targetPath = options.override.affectedLayer().bezierPath();

        var parentSymbolIdentifier = void 0;
        if ((parentSymbolIdentifier = options.override.overridePoint().parent()) != null) {
            _this.overrideLayer = parentSymbolIdentifier;
        }

        if (!_this.pointsAreValid) {
            var _ret2;

            return _ret2 = _Error.Error.unsupportedShapePath, _possibleConstructorReturn(_this, _ret2);
        }
        return _this;
    }

    _createClass(SymbolicAngle, [{
        key: 'applyImage',
        value: function () {
            function applyImage() {

                var objectID = this.targetLayer.objectID();

                var existingOverrides = this.selectedLayer.overrides() || NSDictionary.dictionary();
                var overrides = NSMutableDictionary.dictionaryWithDictionary(existingOverrides);

                overrides.setObject_forKey(this.transformedImage, objectID);

                this.selectedLayer.overrides = overrides;
            }

            return applyImage;
        }()
    }, {
        key: 'estimatePixelDensity',
        value: function () {
            function estimatePixelDensity() {

                // Best guess of a 2x sampling of the image if the mockup is in it's original scale

                var _maximumVerticesWidth = this.maximumVerticesWidthAndHeight(),
                    _maximumVerticesWidth2 = _slicedToArray(_maximumVerticesWidth, 2),
                    layerWidth = _maximumVerticesWidth2[0],
                    layerHeight = _maximumVerticesWidth2[1];

                var widthRatio = this.selectedLayer.rect().size.width * layerWidth / (this.selectedLayer.naturalSize().width * this.artboard.rect().size.width);
                var heightRatio = this.selectedLayer.rect().size.height * layerHeight / (this.selectedLayer.naturalSize().height * this.artboard.rect().size.height);

                var estimate = widthRatio > heightRatio ? widthRatio : heightRatio;

                return estimate;
            }

            return estimatePixelDensity;
        }()
    }, {
        key: 'description',
        value: function () {
            function description() {
                return this.selectedLayer.name() + " " + this.targetLayer.name();
            }

            return description;
        }()
    }]);

    return SymbolicAngle;
}(_Angle3['default']);

exports['default'] = SymbolicAngle;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports['default'] = function (context) {

    var selectedLayersNSArray = context.selection;

    if (selectedLayersNSArray == null) {
        var error = _Error.Error.emptySelection;
        Shared.showMessage_inContext(_Error.Error.message, context);
        return;
    }

    var selectedLayers = Array.fromNSArray(selectedLayersNSArray);

    if (selectedLayers.length == 0) {
        var _error = _Error.Error.emptySelection;
        Shared.showMessage_inContext(_Error.Error.message, context);
        return;
    }

    var possibleAngles = _Angle2['default'].forSelectedLayers_inContext(selectedLayers, context);

    var angles = possibleAngles.filter(function (a) {
        return a instanceof _Angle2['default'];
    });
    var errors = possibleAngles.filter(function (a) {
        return !(a instanceof _Angle2['default']);
    });

    // if (!((angleInstance = getAngle(options)) instanceof Angle)) {
    if (angles.length == 0) {
        var _error2 = errors[0];
        Shared.showMessage_inContext(_Error.Error.message, context);
        return;
    }

    angles.forEach(function (a) {
        a.rotate();
        a.applyImage();
    });

    Shared.showMessage_inContext("Angle rotated! 🔄", context);

    return;
};

var _Angle = __webpack_require__(1);

var _Angle2 = _interopRequireDefault(_Angle);

var _Shared = __webpack_require__(5);

var Shared = _interopRequireWildcard(_Shared);

var _Error = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showMessage_inContext = showMessage_inContext;
exports.filterPossibleArtboards = filterPossibleArtboards;
exports.compareByRatioAndAlphabet = compareByRatioAndAlphabet;
exports.createLabel = createLabel;
exports.loadLocalImage = loadLocalImage;
exports.popUpButtonsforRectangleIndexer_withTitleIndexer_andImageIndexer_defaultSelected_onIndex = popUpButtonsforRectangleIndexer_withTitleIndexer_andImageIndexer_defaultSelected_onIndex;
exports.smallImagesFromArtboard = smallImagesFromArtboard;

var _Angle = __webpack_require__(1);

var _Angle2 = _interopRequireDefault(_Angle);

var _CompositionAngle = __webpack_require__(6);

var _CompositionAngle2 = _interopRequireDefault(_CompositionAngle);

var _SymbolicAngle = __webpack_require__(3);

var _SymbolicAngle2 = _interopRequireDefault(_SymbolicAngle);

var _ShapeAngle = __webpack_require__(7);

var _ShapeAngle2 = _interopRequireDefault(_ShapeAngle);

var _Error = __webpack_require__(0);

var _PixelDensity = __webpack_require__(8);

var _CompressionRatio = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_Angle2['default'].forSelectedLayers_inContext = function (selectedLayers, context) {

    return selectedLayers.map(function (layer) {
        switch (layer['class']()) {
            case MSSymbolInstance:

                var overrides = Array.fromNSArray(layer.availableOverrides()) || [];

                var symbolAngles = overrides.filter(function (override) {
                    return override.currentValue()['class']() == MSImageData;
                }).map(function (override) {
                    return new _SymbolicAngle2['default']({
                        selectedLayer: layer,
                        context: context,
                        override: override
                    });
                });

                var nestedAngles = overrides.map(function (a) {
                    return a.children();
                }).filter(function (a) {
                    return a != null;
                }).map(Array.fromNSArray).reduce(function (p, a) {
                    return p.concat(a);
                }, []).filter(function (a) {
                    return a['class']() == MSAvailableOverride;
                }).map(function (a) {
                    return new _CompositionAngle2['default']({
                        override: a,
                        selectedLayer: layer,
                        context: context
                    });
                });

                return symbolAngles.concat(nestedAngles);
            case MSShapeGroup:
                return new _ShapeAngle2['default']({
                    selectedLayer: layer,
                    context: context
                });
            default:
                return [_Error.Error.unsupportedElement];
        }
    }).reduce(function (p, a, i, as) {
        return p.concat(a);
    }, []);
};

Array.fromNSArray = function (nsArray) {
    var array = [];
    for (var i = 0; i < nsArray.count(); i++) {
        array.push(nsArray[i]);
    }
    return array;
};

Array.prototype.print = function () {
    return this.map(function (a) {
        print(a);return a;
    });
};

function showMessage_inContext(message, context) {
    if (context.document.showMessage != undefined) {
        context.document.showMessage(message);
    }

    print(message);
}

function filterPossibleArtboards(artboardOrSymbol) {

    var upperMaring = 0.8;
    var lowerMargin = 0.4;
    var minimumDimention = 250;

    var elementClass = artboardOrSymbol['class']();

    switch (elementClass) {
        case MSArtboardGroup:

            var artboard = artboardOrSymbol;
            var frame = artboard.frame();

            if (frame.width() < minimumDimention || frame.height() < minimumDimention) {
                return false;
            }

            var ratio = frame.width() / frame.height();
            if (ratio > 1) {
                ratio = 1 / ratio;
            }

            if (ratio < lowerMargin) {
                return false;
            }
            break;
        case MSSymbolMaster:
            // Traversion of symbols does not work properly yet.
            return false;

        default:
            print(elementClass);
            return false;
    }

    return true;
}

function compareByRatioAndAlphabet(a, b) {
    var upperMaring = 0.8;
    var lowerMargin = 0.4;

    var artboardSizeA = a.frame();
    var artboardSizeB = b.frame();

    var artboardARatio = artboardSizeA.width() / artboardSizeA.height();
    if (artboardARatio > 1) {
        artboardARatio = 1 / artboardARatio;
    }

    var artboardARatioInsideMargin = artboardARatio > lowerMargin && artboardARatio < upperMaring;

    var artboardBRatio = artboardSizeB.width() / artboardSizeB.height();
    if (artboardBRatio > 1) {
        artboardBRatio = 1 / artboardBRatio;
    }

    var artboardBRatioInsideMargin = artboardBRatio > lowerMargin && artboardBRatio < upperMaring;

    if (artboardARatioInsideMargin && !artboardBRatioInsideMargin) {
        return false;
    }

    if (artboardBRatioInsideMargin && !artboardARatioInsideMargin) {
        return true;
    }

    if (artboardARatio == artboardBRatio) {
        return a.name() > b.name();
    }

    return artboardARatio > artboardBRatio;
}

function createLabel(text, size, frame) {
    var label = NSTextField.alloc().initWithFrame(frame);

    label.setStringValue(text);
    label.setFont(NSFont.boldSystemFontOfSize(size));
    label.setBezeled(false);
    label.setDrawsBackground(false);
    label.setEditable(false);
    label.setSelectable(false);

    return label;
}

function loadLocalImage(context, filePath) {

    var basePath = context.scriptPath.stringByDeletingLastPathComponent().stringByDeletingLastPathComponent().stringByDeletingLastPathComponent();

    if (!NSFileManager.defaultManager().fileExistsAtPath(basePath + "/" + filePath)) {
        print("File does not exist at path");
        return null;
    }

    return NSImage.alloc().initWithContentsOfFile(basePath + "/" + filePath);
}

function popUpButtonsforRectangleIndexer_withTitleIndexer_andImageIndexer_defaultSelected_onIndex(rectangle, titles, images, index) {

    var button = NSPopUpButton.alloc().initWithFrame(rectangle(index));
    button.addItemsWithTitles(titles);

    if (images != null) {

        button.imageScaling = NSImageScaleProportionallyUpOrDown;

        Array.fromNSArray(button.itemArray()).forEach(function (a, i, as) {
            a.image = images[i];
        });
    }

    return button;
}

function smallImagesFromArtboard(artboard) {

    // var sketch = require('sketch/dom');
    // var artboard = sketch.fromNative(msartboard);

    // //let image = sketch.export(artboard);

    // print(msartboard.unselectedPreviewImage());

    // return nil

    if (artboard['class']() == MSSymbolMaster) {
        print(artboard);
        return null;
    }

    if (artboard.frame == undefined) {
        print(artboard);
    }

    var artboardWidth = artboard.frame().width();
    var artboardHeight = artboard.frame().height();
    var artboardRatio = artboardWidth / artboardHeight;
    if (artboardRatio > 1) {
        artboardRatio = 1 / artboardRatio;
    }

    if (artboardRatio > 0.8 || artboardRatio < 0.4) {
        return null;
    }

    var layerAncestry = MSImmutableLayerAncestry.alloc().initWithMSLayer(artboard);

    var biggerDimention = artboardWidth > artboardHeight ? artboardWidth : artboardHeight;
    var exportScale = 48 / biggerDimention;
    var exportFormat = MSExportFormat.formatWithScale_name_fileFormat(exportScale, "", "png");
    var exportRequest = MSExportRequest.exportRequestsFromLayerAncestry_exportFormats(layerAncestry, [exportFormat]).firstObject();
    var exporter = MSExporter.exporterForRequest_colorSpace(exportRequest, NSColorSpace.sRGBColorSpace());

    return exporter.previewImage();
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function () {
    function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }

    return get;
}();

var _SymbolicAngle2 = __webpack_require__(3);

var _SymbolicAngle3 = _interopRequireDefault(_SymbolicAngle2);

var _Error = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompositionAngle = function (_SymbolicAngle) {
    _inherits(CompositionAngle, _SymbolicAngle);

    function CompositionAngle() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, CompositionAngle);

        var _this = _possibleConstructorReturn(this, (CompositionAngle.__proto__ || Object.getPrototypeOf(CompositionAngle)).call(this, options));

        _this.override = options.override;
        return _this;
    }

    _createClass(CompositionAngle, [{
        key: 'loadValueForKey',
        value: function () {
            function loadValueForKey(key) {
                return _get(CompositionAngle.prototype.__proto__ || Object.getPrototypeOf(CompositionAngle.prototype), 'loadValueForKey', this).call(this, this.targetLayer.objectID() + "-" + key);
            }

            return loadValueForKey;
        }()
    }, {
        key: 'imprintValue_forKey',
        value: function () {
            function imprintValue_forKey(value, key) {
                _get(CompositionAngle.prototype.__proto__ || Object.getPrototypeOf(CompositionAngle.prototype), 'imprintValue_forKey', this).call(this, value, this.targetLayer.objectID() + "-" + key);
            }

            return imprintValue_forKey;
        }()
    }, {
        key: 'applyImage',
        value: function () {
            function applyImage() {

                var existingTopOverrides = this.selectedLayer.overrides() || NSDictionary.dictionary();
                var topOverrides = NSMutableDictionary.dictionaryWithDictionary(existingTopOverrides);

                var overrideBranchAddress = (this.overrideLayer + "").replace("_symbolID", "");

                var existingOverrideBranch = topOverrides.objectForKey(overrideBranchAddress) || NSMutableDictionary.dictionary();
                var overrideBranch = NSMutableDictionary.dictionaryWithDictionary(existingOverrideBranch);

                var objectID = this.targetLayer.objectID();
                overrideBranch.setObject_forKey(this.transformedImage, objectID);
                topOverrides.setObject_forKey(overrideBranch, overrideBranchAddress);

                this.selectedLayer.overrides = topOverrides;
            }

            return applyImage;
        }()
    }, {
        key: 'description',
        value: function () {
            function description() {
                return this.override.parent().affectedLayer().name() + " " + this.targetLayer.name();
            }

            return description;
        }()
    }]);

    return CompositionAngle;
}(_SymbolicAngle3['default']);

exports['default'] = CompositionAngle;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Angle2 = __webpack_require__(1);

var _Angle3 = _interopRequireDefault(_Angle2);

var _Error = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StyleFillType = { solid: 0, gradient: 1, pattern: 4, noise: 5 };

var ShapeAngle = function (_Angle) {
    _inherits(ShapeAngle, _Angle);

    function ShapeAngle() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, ShapeAngle);

        var _this = _possibleConstructorReturn(this, (ShapeAngle.__proto__ || Object.getPrototypeOf(ShapeAngle)).call(this, options));

        _this.targetLayer = _this.selectedLayer;
        _this.targetPath = _this.selectedLayer.bezierPath();

        if (!_this.pointsAreValid) {
            var _ret;

            return _ret = _Error.Error.unsupportedShapePath, _possibleConstructorReturn(_this, _ret);
        }
        return _this;
    }

    _createClass(ShapeAngle, [{
        key: 'applyImage',
        value: function () {
            function applyImage() {

                var imageFill = MSStyleFill.alloc().init();
                imageFill.setImage(this.transformedImage);
                imageFill.fillType = StyleFillType.pattern;

                this.targetLayer.style().removeAllStyleFills();
                this.targetLayer.style().addStyleFill(imageFill);
            }

            return applyImage;
        }()
    }, {
        key: 'estimatePixelDensity',
        value: function () {
            function estimatePixelDensity() {

                // Best guess of a 2x sampling of the image if the mockup is in it's original scale

                var _maximumVerticesWidth = this.maximumVerticesWidthAndHeight(),
                    _maximumVerticesWidth2 = _slicedToArray(_maximumVerticesWidth, 2),
                    layerWidth = _maximumVerticesWidth2[0],
                    layerHeight = _maximumVerticesWidth2[1];

                var widthRatio = layerWidth / this.artboard.rect().size.width;
                var heightRatio = layerHeight / this.artboard.rect().size.height;

                var estimate = widthRatio > heightRatio ? widthRatio : heightRatio;

                return estimate;
            }

            return estimatePixelDensity;
        }()
    }, {
        key: 'description',
        value: function () {
            function description() {
                return this.targetLayer.name();
            }

            return description;
        }()
    }]);

    return ShapeAngle;
}(_Angle3['default']);

exports['default'] = ShapeAngle;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
var PixelDensity = exports.PixelDensity = [{ title: "Auto", selectionLabel: "Auto" }, { title: "1x", selectionLabel: "1x" }, { title: "2x", selectionLabel: "2x" }, { title: "3x", selectionLabel: "3x" }, { title: "4x", selectionLabel: "4x" }];

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')
