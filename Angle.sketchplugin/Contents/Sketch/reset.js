var that = this;
function __skpm_run(e, t) {
  that.context = t;
  var r = (function (e) {
    var t = {};
    function r(n) {
      if (t[n]) return t[n].exports;
      var o = (t[n] = { i: n, l: !1, exports: {} });
      return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
    }
    return (
      (r.m = e),
      (r.c = t),
      (r.d = function (e, t, n) {
        r.o(e, t) ||
          Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: n,
          });
      }),
      (r.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return r.d(t, "a", t), t;
      }),
      (r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (r.p = ""),
      r((r.s = 3))
    );
  })([
    function (e, r, n) {
      Object.defineProperty(r, "__esModule", { value: !0 });
      var o = (function () {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function (t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        i = n(4);
      function a(e) {
        if (Array.isArray(e)) {
          for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
          return r;
        }
        return Array.from(e);
      }
      var s = { linear: 0, quadratic: 1, cubic: 2 };
      Array.prototype.rotated = function (e) {
        return this.slice(e, this.length).concat(this.slice(0, e));
      };
      var u = (function () {
        function e() {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
            (this.context = t.context),
            (this.selectedLayer = t.selectedLayer);
        }
        return (
          o(e, [
            {
              key: "imprintValue_forKey",
              value: (function () {
                return function (e, t) {
                  null != this.selectedLayer
                    ? this.context.command.setValue_forKey_onLayer(
                        e,
                        t,
                        this.selectedLayer
                      )
                    : print(
                        "🛑 Imprinting value before selected layer assignment"
                      );
                };
              })(),
            },
            {
              key: "loadValueForKey",
              value: (function () {
                return function (e) {
                  return null == this.selectedLayer
                    ? (print(
                        "🛑 Loading value before selected layer assignment"
                      ),
                      null)
                    : this.context.command.valueForKey_onLayer(
                        e,
                        this.selectedLayer
                      );
                };
              })(),
            },
            {
              key: "artboardID",
              get: (function () {
                return function () {
                  return void 0 != this._artboardID
                    ? this._artboardID
                    : ((this._artboardID =
                        this.loadValueForKey("artboard-id") + ""),
                      this._artboardID);
                };
              })(),
              set: (function () {
                return function (e) {};
              })(),
            },
            {
              key: "artboard",
              get: (function () {
                return function () {
                  if (void 0 != this._artboard) return this._artboard;
                  if (void 0 != this.artboardID) {
                    for (
                      var e = this.context.document.artboards(), t = 0;
                      t < e.count();
                      t++
                    )
                      e[t].objectID() == this.artboardID &&
                        (this._artboard = e[t]);
                    if (void 0 != this._artboard) return this._artboard;
                    print(
                      "🛑 Not able to retrieve artboard from id in document"
                    );
                  } else print("🛑 No artboard ID registered");
                };
              })(),
              set: (function () {
                return function (e) {
                  (this._artboard = e),
                    this.imprintValue_forKey(e.objectID(), "artboard-id");
                };
              })(),
            },
            {
              key: "rotation",
              get: (function () {
                return function () {
                  return (
                    void 0 == this._rotation &&
                      (this._rotation = this.loadValueForKey("rotation")),
                    this._rotation
                  );
                };
              })(),
              set: (function () {
                return function (e) {
                  (this._rotation = e), this.imprintValue_forKey(e, "rotation");
                };
              })(),
            },
            {
              key: "pixelDensity",
              get: (function () {
                return function () {
                  if (
                    (void 0 == this._pixelDensity &&
                      (this._pixelDensity =
                        this.loadValueForKey("pixel-density") + 0),
                    0 == this._pixelDensity)
                  ) {
                    var e = Math.round(2 * this.estimatePixelDensity() + 0.5);
                    return 0 == e ? 1 : e;
                  }
                  return this._pixelDensity;
                };
              })(),
              set: (function () {
                return function (e) {
                  (this._pixelDensity = e),
                    this.imprintValue_forKey(e, "pixel-density");
                };
              })(),
            },
            {
              key: "compressionRatio",
              get: (function () {
                return function () {
                  return (
                    void 0 == this._compressionRatio &&
                      (this._compressionRatio =
                        this.loadValueForKey("compression-ratio") + 0),
                    this._compressionRatio
                  );
                };
              })(),
              set: (function () {
                return function (e) {
                  (this._compressionRatio = e),
                    this.imprintValue_forKey(e, "compression-ratio");
                };
              })(),
            },
            {
              key: "reversed",
              get: (function () {
                return function () {
                  return (
                    void 0 == this._reversed &&
                      (this._reversed = 1 == this.loadValueForKey("reversed")),
                    this._reversed
                  );
                };
              })(),
              set: (function () {
                return function (e) {
                  (this._reversed = e), this.imprintValue_forKey(e, "reversed");
                };
              })(),
            },
          ]),
          o(e, [
            {
              key: "exportRequest_lessThan52",
              value: (function () {
                return function () {
                  var e = NSClassFromString(
                      "SketchModel.MSImmutableLayerAncestry"
                    )
                      .alloc()
                      .initWithMutableLayer(t.selection[0]),
                    r = MSExportFormat.formatWithScale_name_fileFormat(
                      this.pixelDensity,
                      "Angle",
                      "png"
                    );
                  return MSExportRequest.exportRequestsFromLayerAncestry_exportFormats(
                    e,
                    [r]
                  ).firstObject();
                };
              })(),
            },
            {
              key: "exporter",
              value: (function () {
                return function () {
                  var e = this.context.document.colorSpace();
                  if (BCSketchInfo.shared().metadata().appVersion < 52)
                    return MSExporter.exporterForRequest_colorSpace(
                      this.exportRequest_lessThan52(),
                      e
                    );
                  var t = MSExportFormat.alloc().init();
                  (t.fileFormat = "png"), (t.scale = this.pixelDensity);
                  var r =
                    MSExportRequest.exportRequestsFromExportableLayer_exportFormats_useIDForName(
                      this.artboard,
                      [t],
                      !0
                    ).firstObject();
                  return MSExporter.exporterForRequest_colorSpace(r, e);
                };
              })(),
            },
            {
              key: "ciImage",
              value: (function () {
                return function () {
                  var e = this.exporter().bitmapImageRep();
                  return CIImage.alloc().initWithCGImage(e.CGImage());
                };
              })(),
            },
            {
              key: "guessRotationAndReversion",
              value: (function () {
                return function () {
                  if (1 === this.loadValueForKey("guessed-rotation"))
                    print(
                      "⚠️ Angle has already guessed rotation and symmetry for this shape"
                    );
                  else {
                    var e = this.verticesLengths,
                      t = void 0;
                    if (this.artboard.class() != MSSymbolMaster) {
                      t = this.artboard.frame();
                      var r = e[0] > e[1],
                        n = t.width() > t.height();
                      r && (print("🛑 HORIZONTAL"), this.rotate()),
                        n &&
                          (print("🛑 HAS HORIZONTAL ARTBOARD"), this.rotate());
                      var o = this.pointsFromBezierPath,
                        i = Math.min.apply(
                          Math,
                          a(
                            o.map(function (e) {
                              return e.y;
                            })
                          )
                        ),
                        s = o[this.mappedIndexFor(0)],
                        u = o[this.mappedIndexFor(1)];
                      s.y != i &&
                        u.y != i &&
                        (print("🛑 UPSIDE DOWN"), this.rotate(), this.rotate());
                      var l = BCSketchInfo.shared().metadata().appVersion;
                      if (l < 50 || l >= 52) {
                        var c = this.shorlaceSum();
                        c < 0
                          ? (print("🛑 COUNTERCLOCKWISE"),
                            this.reverseSymmetry())
                          : c > 0
                          ? print("🛑 CLOCKWISE")
                          : print("🛑 UNDEFINED CHIRALITY");
                      } else
                        l < 52 &&
                          (1 ===
                          this.targetPath.contours().firstObject().isClockwise()
                            ? (this.reverseSymmetry(), print("🛑 CLOCKWISE"))
                            : print("🛑 COUNTERCLOCKWISE"),
                          print("🛑 UNDEFINED CHIRALITY"));
                      print(
                        "🔄↔️ Angle has just guessed rotation and symmetry for this shape"
                      ),
                        this.imprintValue_forKey(!0, "guessed-rotation");
                    }
                  }
                };
              })(),
            },
            {
              key: "shorlaceSum",
              value: (function () {
                return function () {
                  var e = this.pointsFromBezierPath,
                    t = Math.max.apply(
                      Math,
                      a(
                        e.map(function (e) {
                          return e.y;
                        })
                      )
                    );
                  return Array.from({ length: 4 }, function (e, t) {
                    return t;
                  }).reduce(function (r, n) {
                    return (
                      r +
                      (-e[n].x + e[(n + 1) % 4].x) *
                        (2 * t - e[n].y - e[(n + 1) % 4].y)
                    );
                  }, 0);
                };
              })(),
            },
            {
              key: "maximumVerticesWidthAndHeight",
              value: (function () {
                return function () {
                  var e = this.verticesLengths.rotated(this.rotation % 2);
                  return [Math.max(e[0], e[2]), Math.max(e[1], e[3])];
                };
              })(),
            },
            {
              key: "rotate",
              value: (function () {
                return function () {
                  this.rotation = (this.rotation + (this.reversed ? 1 : 3)) % 4;
                };
              })(),
            },
            {
              key: "reverseSymmetry",
              value: (function () {
                return function () {
                  this.rotate(), (this.reversed = !this.reversed);
                };
              })(),
            },
            {
              key: "mappedIndexFor",
              value: (function () {
                return function (e) {
                  return this.reversed
                    ? [0, 3, 2, 1][(e + this.rotation) % 4]
                    : (e + this.rotation) % 4;
                };
              })(),
            },
            {
              key: "lossyCompressionOfImage_atRate",
              value: (function () {
                return function (e, t) {
                  var r = NSBitmapImageRep.alloc().initWithCIImage(e),
                    n = NSMutableDictionary.dictionary();
                  n.setObject_forKey(
                    NSTIFFCompressionJPEG,
                    NSImageCompressionMethod
                  ),
                    n.setObject_forKey(t, NSImageCompressionFactor),
                    n.setObject_forKey(
                      NSColor.whiteColor(),
                      NSImageFallbackBackgroundColor
                    );
                  var o = r.representationUsingType_properties(
                    NSJPEGFileType,
                    n
                  );
                  return NSImage.alloc().initWithData(o);
                };
              })(),
            },
            {
              key: "pixelAccurateRepresentationOfImage",
              value: (function () {
                return function (e) {
                  var t = NSCIImageRep.alloc().initWithCIImage(e),
                    r = NSImage.alloc().initWithSize(t.size());
                  return r.addRepresentation(t), r;
                };
              })(),
            },
            {
              key: "pointsAreValid_lessThan50",
              get: (function () {
                return function () {
                  var e = this.pointsFromBezierPath;
                  return null !== e && 7 === e.length;
                };
              })(),
            },
            {
              key: "pointsAreValid_lessThan52",
              get: (function () {
                return function () {
                  var e = this.targetPath.contours().firstObject(),
                    t = Array.fromNSArray(e.segments());
                  return (
                    null !== t &&
                    4 === t.length &&
                    !t.some(function (e) {
                      return e.segmentType() != s.linear;
                    })
                  );
                };
              })(),
            },
            {
              key: "pointsAreValid",
              get: (function () {
                return function () {
                  var e = BCSketchInfo.shared().metadata().appVersion;
                  if (e < 50) return this.pointsAreValid_lessThan50;
                  if (e < 52) return this.pointsAreValid_lessThan52;
                  var t = this.targetLayer.points();
                  return (
                    null !== t &&
                    4 === t.length &&
                    !t.some(function (e) {
                      return !e.isStraight();
                    })
                  );
                };
              })(),
            },
            {
              key: "pointsFromBezierPath",
              get: (function () {
                return function () {
                  var e = this,
                    t = BCSketchInfo.shared().metadata().appVersion;
                  if (t < 50) {
                    var r = this.targetPath.elementCount();
                    return 7 != r
                      ? null
                      : Array.from({ length: r }, function (e, t) {
                          return t;
                        }).map(function (t) {
                          var r = MOPointer.alloc().initWithValue_(
                            CGPointMake(0, 0)
                          );
                          return (
                            e.targetPath.elementAtIndex_associatedPoints_(t, r),
                            r.value()
                          );
                        });
                  }
                  if (t < 52) {
                    var n = this.targetPath.contours().firstObject();
                    return Array.fromNSArray(n.segments()).map(function (e) {
                      return e.endPoint1();
                    });
                  }
                  var o = this.targetLayer.rect().size;
                  return Array.fromNSArray(this.targetLayer.points())
                    .map(function (e) {
                      return e.point();
                    })
                    .map(function (e) {
                      return {
                        x: Number(e.x) * Number(o.width),
                        y: Number(e.y) * Number(o.height),
                      };
                    });
                };
              })(),
            },
            {
              key: "verticesLengths",
              get: (function () {
                return function () {
                  var e = this.pointsFromBezierPath;
                  return Array.from({ length: 4 }, function (e, t) {
                    return t;
                  }).map(function (t) {
                    var r = (t + 1) % 4,
                      n = e[t].x - e[r].x,
                      o = e[t].y - e[r].y;
                    return Math.sqrt(Math.pow(n, 2) + Math.pow(o, 2));
                  });
                };
              })(),
            },
            {
              key: "normalizedCIVectors",
              get: (function () {
                return function () {
                  var e = this.pointsFromBezierPath,
                    t = Math.max.apply(
                      Math,
                      a(
                        e.map(function (e) {
                          return e.y;
                        })
                      )
                    ),
                    r = this.pixelDensity;
                  return e.map(function (e) {
                    return CIVector.vectorWithX_Y(e.x * r, (t - e.y) * r);
                  });
                };
              })(),
            },
            {
              key: "transformedImage",
              get: (function () {
                return function () {
                  var e = this.normalizedCIVectors,
                    t = CIFilter.filterWithName("CIPerspectiveTransform");
                  t.setValue_forKey(e[this.mappedIndexFor(0)], "inputTopLeft"),
                    t.setValue_forKey(
                      e[this.mappedIndexFor(1)],
                      "inputTopRight"
                    ),
                    t.setValue_forKey(
                      e[this.mappedIndexFor(2)],
                      "inputBottomRight"
                    ),
                    t.setValue_forKey(
                      e[this.mappedIndexFor(3)],
                      "inputBottomLeft"
                    );
                  var r = this.ciImage();
                  t.setValue_forKey(r, "inputImage");
                  var n = t.valueForKey("outputImage");
                  if (n) {
                    var o = void 0,
                      a = i.CompressionRatio[this.compressionRatio].ratio;
                    return (
                      (o =
                        1 != a
                          ? this.lossyCompressionOfImage_atRate(n, a)
                          : this.pixelAccurateRepresentationOfImage(n)),
                      BCSketchInfo.shared().metadata().appVersion < 47
                        ? MSImageData.alloc().initWithImage_convertColorSpace(
                            o,
                            !0
                          )
                        : MSImageData.alloc().initWithImage_(o)
                    );
                  }
                  print("🛑 Unable to form perspective image");
                };
              })(),
            },
          ]),
          e
        );
      })();
      r.default = u;
    },
    function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      t.Error = {
        unsupportedSymbol: {
          message: "This does not seem to be a supported symbol.",
        },
        unsupportedShapePath: {
          message:
            "There seems to be an issue with the shape we are trying to apply.",
        },
        emptySelection: {
          message: "Please, select a Shape, Angle Mockup or Angle Composition",
        },
        unsupportedElement: {
          message: "Please, select a Shape, Angle Mockup or Angle Composition",
        },
        noImageOverrideOnSymbol: {
          message: "There is no image override for the selected symbol",
        },
        symbolWithBitMapLayer: {
          message: "Bitmat overrides are not supported",
        },
      };
    },
    function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = (function () {
          return function (e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e))
              return (function (e, t) {
                var r = [],
                  n = !0,
                  o = !1,
                  i = void 0;
                try {
                  for (
                    var a, s = e[Symbol.iterator]();
                    !(n = (a = s.next()).done) &&
                    (r.push(a.value), !t || r.length !== t);
                    n = !0
                  );
                } catch (e) {
                  (o = !0), (i = e);
                } finally {
                  try {
                    !n && s.return && s.return();
                  } finally {
                    if (o) throw i;
                  }
                }
                return r;
              })(e, t);
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          };
        })(),
        i = (function () {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function (t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        a = r(0),
        s = (n = a) && n.__esModule ? n : { default: n },
        u = r(1);
      function l(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      var c = (function (e) {
        function t() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          var r = l(
            this,
            (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)
          );
          if (
            ((r.targetLayer = e.override.affectedLayer()),
            r.targetLayer.class() === MSImmutableBitmapLayer)
          )
            return l(r, u.Error.symbolWithBitMapLayer);
          var n = BCSketchInfo.shared().metadata().appVersion;
          n < 50
            ? (r.targetPath = e.override.affectedLayer().bezierPath())
            : n < 52 &&
              (r.targetPath = e.override
                .affectedLayer()
                .pathInFrameWithTransforms());
          var o = e.override.overridePoint().parent();
          return (
            null !== o && (r.overrideLayer = o),
            r.pointsAreValid ? r : l(r, u.Error.unsupportedShapePath)
          );
        }
        return (
          (function (e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, s["default"]),
          i(t, [
            {
              key: "applyImage",
              value: (function () {
                return function () {
                  var e = this.targetLayer.objectID(),
                    t =
                      this.selectedLayer.overrides() ||
                      NSDictionary.dictionary(),
                    r = NSMutableDictionary.dictionaryWithDictionary(t);
                  r.setObject_forKey(this.transformedImage, e),
                    (this.selectedLayer.overrides = r);
                };
              })(),
            },
            {
              key: "estimatePixelDensity",
              value: (function () {
                return function () {
                  var e = this.maximumVerticesWidthAndHeight(),
                    t = o(e, 2),
                    r = t[0],
                    n = t[1],
                    i =
                      (this.selectedLayer.rect().size.width * r) /
                      (this.selectedLayer.naturalSize().width *
                        this.artboard.rect().size.width),
                    a =
                      (this.selectedLayer.rect().size.height * n) /
                      (this.selectedLayer.naturalSize().height *
                        this.artboard.rect().size.height);
                  return i > a ? i : a;
                };
              })(),
            },
            {
              key: "description",
              value: (function () {
                return function () {
                  return (
                    this.selectedLayer.name() + " " + this.targetLayer.name()
                  );
                };
              })(),
            },
          ]),
          t
        );
      })();
      t.default = c;
    },
    function (e, r, n) {
      Object.defineProperty(r, "__esModule", { value: !0 }),
        (r.default = function (e) {
          var r = e.document,
            n = e.selection,
            o = e.command;
          if (void 0 != n && 1 == n.count()) {
            var i = n.firstObject();
            a.default.tryCreating({
              for: [i],
              in: { document: r, selection: n, command: o },
            }) instanceof a.default
              ? (t.command.setValue_forKey_onLayer(null, "pixel-density", i),
                t.command.setValue_forKey_onLayer(null, "rotation", i),
                t.command.setValue_forKey_onLayer(null, "artboard-id", i),
                t.command.setValue_forKey_onLayer(null, "compression-ratio", i),
                t.command.setValue_forKey_onLayer(null, "reversed", i),
                t.command.setValue_forKey_onLayer(null, "guessed-rotation", i),
                s.show({
                  message: "Angle Mockup metadata reset.",
                  inDocument: r,
                }))
              : s.show({
                  message: "Reset only works on shapes and symbols.",
                  inDocument: r,
                });
          } else
            s.show({
              message: "Please, select 1️⃣ element to reset",
              inDocument: r,
            });
        });
      var o,
        i = n(0),
        a = (o = i) && o.__esModule ? o : { default: o },
        s = (function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var r in e)
              Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          return (t.default = e), t;
        })(n(5));
    },
    function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      t.CompressionRatio = [
        { selectionLabel: "Best", ratio: 1 },
        { selectionLabel: "Better", ratio: 0.9 },
        { selectionLabel: "Good", ratio: 0.8 },
        { selectionLabel: "Average", ratio: 0.7 },
      ];
    },
    function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.show = function (e) {
          var t = e.message,
            r = e.inDocument;
          void 0 != r && void 0 != r.showMessage && r.showMessage(t);
          print(t);
        }),
        (t.filterPossibleArtboards = function (e) {
          var t = e.class();
          switch (t) {
            case MSArtboardGroup:
              var r = e,
                n = r.frame();
              if (n.width() < 250 || n.height() < 250) return !1;
              var o = n.width() / n.height();
              if ((o > 1 && (o = 1 / o), o < 0.4)) return !1;
              break;
            case MSSymbolMaster:
              return !1;
            default:
              return print(t), !1;
          }
          return !0;
        }),
        (t.compareByRatioAndAlphabet = function (e, t) {
          var r = e.frame(),
            n = t.frame(),
            o = r.width() / r.height();
          o > 1 && (o = 1 / o);
          var i = o > 0.4 && o < 0.8,
            a = n.width() / n.height();
          a > 1 && (a = 1 / a);
          var s = a > 0.4 && a < 0.8;
          if (i && !s) return !1;
          if (s && !i) return !0;
          if (o == a) return e.name() > t.name();
          return o > a;
        }),
        (t.introspect = function (e) {
          var t = e.class().mocha();
          print("-----------------------------------------------"),
            print("PROPERTIES-------------------------------------"),
            print("-----------------------------------------------"),
            print(t.properties()),
            print(t.propertiesWithAncestors()),
            print("-----------------------------------------------"),
            print("INSTANCE METHODS-------------------------------"),
            print("-----------------------------------------------"),
            print(t.instanceMethods()),
            print(t.instanceMethodsWithAncestors()),
            print("-----------------------------------------------"),
            print("CLASS METHODS----------------------------------"),
            print("-----------------------------------------------"),
            print(t.classMethods()),
            print(t.classMethodsWithAncestors()),
            print("-----------------------------------------------"),
            print("PROTOCOLS--------------------------------------"),
            print("-----------------------------------------------"),
            print(t.protocols()),
            print(t.protocolsWithAncestors());
        }),
        (t.createLabel = function (e, t, r) {
          var n = NSTextField.alloc().initWithFrame(r);
          return (
            n.setStringValue(e),
            n.setFont(NSFont.boldSystemFontOfSize(t)),
            n.setBezeled(!1),
            n.setDrawsBackground(!1),
            n.setEditable(!1),
            n.setSelectable(!1),
            n
          );
        }),
        (t.popUpButtonsforRectangleIndexer_withTitleIndexer_andImageIndexer_defaultSelected_onIndex =
          function (e, t, r, n) {
            var o = NSPopUpButton.alloc().initWithFrame(e(n));
            o.addItemsWithTitles(t),
              null != r &&
                ((o.imageScaling = NSImageScaleProportionallyUpOrDown),
                Array.fromNSArray(o.itemArray()).forEach(function (e, t, n) {
                  e.image = r[t];
                }));
            return o;
          }),
        (t.smallImagesFromArtboard = function (e) {
          if (e.class() == MSSymbolMaster) return print(e), null;
          void 0 == e.frame && print(e);
          var t = e.frame().width(),
            r = e.frame().height(),
            n = t / r;
          n > 1 && (n = 1 / n);
          if (n > 0.8 || n < 0.4) return null;
          var o = NSClassFromString("SketchModel.MSImmutableLayerAncestry")
              .alloc()
              .initWithMutableLayer(e),
            i = 48 / (t > r ? t : r),
            a = MSExportFormat.formatWithScale_name_fileFormat(i, "", "png"),
            s = MSExportRequest.exportRequestsFromLayerAncestry_exportFormats(
              o,
              [a]
            ).firstObject();
          return MSExporter.exporterForRequest_colorSpace(
            s,
            NSColorSpace.sRGBColorSpace()
          ).previewImage();
        });
      var n = u(r(0)),
        o = u(r(6)),
        i = u(r(2)),
        a = u(r(7)),
        s = r(1);
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      (n.default.tryCreating = function (e) {
        var t = e.for,
          r = e.in;
        return t
          .map(function (e) {
            switch (e.class()) {
              case MSSymbolInstance:
                var t = Array.fromNSArray(e.availableOverrides()) || [],
                  n = t
                    .filter(function (e) {
                      return e.currentValue().class() == MSImageData;
                    })
                    .map(function (t) {
                      return new i.default({
                        selectedLayer: e,
                        context: r,
                        override: t,
                      });
                    }),
                  u = t
                    .map(function (e) {
                      return e.children();
                    })
                    .filter(function (e) {
                      return null != e;
                    })
                    .map(Array.fromNSArray)
                    .reduce(function (e, t) {
                      return e.concat(t);
                    }, [])
                    .filter(function (e) {
                      return e.class() == MSAvailableOverride;
                    })
                    .map(function (t) {
                      return new o.default({
                        override: t,
                        selectedLayer: e,
                        context: r,
                      });
                    });
                return n.concat(u);
              case MSShapeGroup:
              case MSShapePathLayer:
              case MSRectangleShape:
                return new a.default({ selectedLayer: e, context: r });
              default:
                return s.Error.unsupportedElement;
            }
          })
          .reduce(function (e, t, r, n) {
            return e.concat(t);
          }, []);
      }),
        (Array.fromNSArray = function (e) {
          for (var t = [], r = 0; r < e.length; r++) t.push(e[r]);
          return t;
        }),
        (Array.prototype.print = function () {
          return this.map(function (e) {
            return print(e), e;
          });
        });
    },
    function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = (function () {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function (t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        i = (function () {
          return function e(t, r, n) {
            null === t && (t = Function.prototype);
            var o = Object.getOwnPropertyDescriptor(t, r);
            if (void 0 === o) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, r, n);
            }
            if ("value" in o) return o.value;
            var a = o.get;
            return void 0 !== a ? a.call(n) : void 0;
          };
        })(),
        a = r(2),
        s = (n = a) && n.__esModule ? n : { default: n };
      r(1);
      var u = (function (e) {
        function t() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          var r = (function (e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !t || ("object" != typeof t && "function" != typeof t)
              ? e
              : t;
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return (r.override = e.override), r;
        }
        return (
          (function (e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, s["default"]),
          o(t, [
            {
              key: "loadValueForKey",
              value: (function () {
                return function (e) {
                  return i(
                    t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                    "loadValueForKey",
                    this
                  ).call(this, this.targetLayer.objectID() + "-" + e);
                };
              })(),
            },
            {
              key: "imprintValue_forKey",
              value: (function () {
                return function (e, r) {
                  i(
                    t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                    "imprintValue_forKey",
                    this
                  ).call(this, e, this.targetLayer.objectID() + "-" + r);
                };
              })(),
            },
            {
              key: "applyImage",
              value: (function () {
                return function () {
                  var e =
                      this.selectedLayer.overrides() ||
                      NSDictionary.dictionary(),
                    t = NSMutableDictionary.dictionaryWithDictionary(e),
                    r = (this.overrideLayer + "").replace("_symbolID", ""),
                    n = t.objectForKey(r) || NSMutableDictionary.dictionary(),
                    o = NSMutableDictionary.dictionaryWithDictionary(n),
                    i = this.targetLayer.objectID();
                  o.setObject_forKey(this.transformedImage, i),
                    t.setObject_forKey(o, r),
                    (this.selectedLayer.overrides = t);
                };
              })(),
            },
            {
              key: "description",
              value: (function () {
                return function () {
                  return (
                    this.override.parent().affectedLayer().name() +
                    " " +
                    this.targetLayer.name()
                  );
                };
              })(),
            },
          ]),
          t
        );
      })();
      t.default = u;
    },
    function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        o = (function () {
          return function (e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e))
              return (function (e, t) {
                var r = [],
                  n = !0,
                  o = !1,
                  i = void 0;
                try {
                  for (
                    var a, s = e[Symbol.iterator]();
                    !(n = (a = s.next()).done) &&
                    (r.push(a.value), !t || r.length !== t);
                    n = !0
                  );
                } catch (e) {
                  (o = !0), (i = e);
                } finally {
                  try {
                    !n && s.return && s.return();
                  } finally {
                    if (o) throw i;
                  }
                }
                return r;
              })(e, t);
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          };
        })(),
        i = (function () {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function (t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        a = r(0),
        s = (n = a) && n.__esModule ? n : { default: n },
        u = r(1);
      function l(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      var c = { solid: 0, gradient: 1, pattern: 4, noise: 5 },
        f = (function (e) {
          function t() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, t);
            var r = l(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)
            );
            r.targetLayer = r.selectedLayer;
            var n = BCSketchInfo.shared().metadata().appVersion;
            return (
              n < 50
                ? (r.targetPath = r.selectedLayer.bezierPath())
                : n < 52 &&
                  (r.targetPath = r.selectedLayer.pathInFrameWithTransforms()),
              r.pointsAreValid ? r : l(r, u.Error.unsupportedShapePath)
            );
          }
          return (
            (function (e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Super expression must either be null or a function, not " +
                    typeof t
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                t &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, t)
                    : (e.__proto__ = t));
            })(t, s["default"]),
            i(t, [
              {
                key: "applyImage",
                value: (function () {
                  return function () {
                    var e = MSStyleFill.alloc().init();
                    e.setImage(this.transformedImage),
                      (e.fillType = c.pattern),
                      this.targetLayer.style().removeAllStyleFills(),
                      this.targetLayer.style().addStyleFill(e);
                  };
                })(),
              },
              {
                key: "estimatePixelDensity",
                value: (function () {
                  return function () {
                    var e = this.maximumVerticesWidthAndHeight(),
                      t = o(e, 2),
                      r = t[0],
                      n = t[1],
                      i = r / this.artboard.rect().size.width,
                      a = n / this.artboard.rect().size.height;
                    return i > a ? i : a;
                  };
                })(),
              },
              {
                key: "description",
                value: (function () {
                  return function () {
                    return this.targetLayer.name();
                  };
                })(),
              },
            ]),
            t
          );
        })();
      t.default = f;
    },
  ]);
  "default" === e && "function" == typeof r ? r(t) : r[e](t);
}
that.onRun = __skpm_run.bind(this, "default");
