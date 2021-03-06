/**
 * Created by Gordon on 15/05/2017.
 */
var __reflect = this && this.__reflect || function(e, t, i) {
        e.__class__ = t,
            i ? i.push(t) : i = [t],
            e.__types__ = e.__types__ ? i.concat(e.__types__) : i
    }
    , __extends = this && this.__extends || function(e, t) {
        function i() {
            this.constructor = e
        }
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n]);
        e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype,
            new i)
    }
    , MDisplay;
!function(e) {
    var t = function(e) {
        function t() {
            var t = e.call(this) || this;
            return t._mInit = !1,
                t._mLoadMod = new GLoadModule,
                t
        }
        return __extends(t, e),
            t.prototype.beforeLoad = function(e) {
                this._mLoadMod.GaddItem(e)
            }
            ,
            t.prototype.GinitUIConfig = function(e) {
                var i = e + ".json";
                this._mLoadMod.GaddGroupRes(i, GLoadModule.GroupType_UI) && (this._mUIConfigUrl = t.UIConfigUrl + i,
                    this._mLoadMod.Gbegin(this.onLoadedItems, this))
            }
            ,
            t.prototype.onLoadedItems = function() {
                this._mInit = !0,
                    this.initUI(),
                    this.onInit()
            }
            ,
            t.prototype.initUI = function() {
                for (var e = GResCache.getRes(this._mUIConfigUrl), i = e.list, n = 0, s = i.length; s > n; n++) {
                    var o = new egret.Bitmap(GResCache.getRes(t.UIImageUrl + i[n].path));
                    o.x = i[n].x,
                        o.y = i[n].y,
                        i[n].skx != i[n].sky ? (o.skewX = i[n].skx,
                            o.skewY = i[n].sky,
                            o.rotation = 0) : (o.rotation = i[n].r,
                            o.skewX = 0,
                            o.skewY = 0),
                        o.scaleX = i[n].sx,
                        o.scaleY = i[n].sy,
                        o.name = i[n].n,
                        this.addChild(o)
                }
            }
            ,
            t.prototype.onInit = function() {}
            ,
            t
    }(egret.DisplayObjectContainer);
    t.UIConfigUrl = "resource/assets/uiconfig/",
        t.UIImageUrl = "resource/assets/images/ui/",
        e.MUISprite = t,
        __reflect(t.prototype, "MDisplay.MUISprite")
}(MDisplay || (MDisplay = {}));
var MDisplay;
!function(e) {
    var t = function(e) {
        function t() {
            var t = e.call(this) || this;
            return t._mLoading = !1,
                t._mActionShow = !1,
                t._mActionHide = !1,
                t._mShowLoadUI = !1,
                t
        }
        return __extends(t, e),
            t.prototype.GWndConfig = function(e, t, n, s) {
                this._mWndName = e,
                    this._mPater = t,
                    this._mShowType = void 0 == n ? i.NONE : n,
                    this._mShowLoadUI = void 0 == s ? !1 : s
            }
            ,
            t.prototype.loadWndRes = function() {
                e.prototype.GinitUIConfig.call(this, this._mWndName)
            }
            ,
            t.prototype.onInit = function() {
                e.prototype.onInit.call(this),
                    this._mLoading = !1,
                    this._mInit = !0,
                this._mShowLoadUI && this.hideLoadingUI(),
                    this.actionShow()
            }
            ,
            t.prototype.show = function() {
                return void 0 != this._mWndName && "" != this._mWndName && 0 == this._mInit ? (this._mShowLoadUI && this.showLoadingUI(),
                    this._mLoading = !0,
                    void this.loadWndRes()) : void this.actionShow()
            }
            ,
            t.prototype.actionShow = function() {
                if (!this._mLoading) {
                    null != this._mPater && 0 == this._mPater.contains(this) && this._mPater.addChild(this),
                        egret.Tween.removeTweens(this);
                    var e;
                    switch (this._mShowType) {
                        case i.ALPHA:
                            this._mActionShow = !0,
                                this.alpha = .1,
                                e = egret.Tween.get(this),
                                e.to({
                                    alpha: 1
                                }, 300),
                                e.call(this.endShow, this);
                            break;
                        case i.DROP:
                            this._mActionShow = !0;
                            var t = this.y;
                            this.y = -this.height,
                                e = egret.Tween.get(this),
                                e.to({
                                    y: t
                                }, 500, egret.Ease.backIn),
                                e.call(this.endShow, this);
                            break;
                        case i.SCALE:
                            this._mActionShow = !0,
                                this.anchorOffsetX = .5 * this.width,
                                this.anchorOffsetY = .5 * this.height,
                                this.scaleX = .1,
                                this.scaleY = .1,
                                e = egret.Tween.get(this),
                                e.to({
                                    scaleX: 1,
                                    scaleY: 1
                                }, 300, egret.Ease.getBackInOut(1)),
                                e.call(this.endShow, this);
                            break;
                        default:
                            this.onShow()
                    }
                }
            }
            ,
            t.prototype.endShow = function() {
                this._mActionShow = !1,
                    this.onShow()
            }
            ,
            t.prototype.endHide = function() {
                this._mActionHide = !1,
                null != this.parent && this.parent.removeChild(this),
                    this.onHide()
            }
            ,
            t.prototype.hide = function() {
                if (!this._mActionHide && this._mInit) {
                    egret.Tween.removeTweens(this);
                    var e;
                    switch (this._mShowType) {
                        case i.SCALE:
                            this._mActionHide = !0,
                                this.scaleX = 1,
                                this.scaleY = 1,
                                e = egret.Tween.get(this),
                                e.to({
                                    scaleX: .1,
                                    scaleY: .1
                                }, 200),
                                e.call(this.endHide, this);
                            break;
                        case i.DROP:
                        case i.ALPHA:
                            this._mActionHide = !0,
                                this.alpha = 1,
                                e = egret.Tween.get(this),
                                e.to({
                                    alpha: .1
                                }, 300),
                                e.call(this.endHide, this);
                            break;
                        default:
                            this.endHide()
                    }
                }
            }
            ,
            t.prototype.onShow = function() {}
            ,
            t.prototype.onHide = function() {}
            ,
            t.prototype.showLoadingUI = function() {
                n.getInstance.show()
            }
            ,
            t.prototype.hideLoadingUI = function() {
                n.getInstance.hide()
            }
            ,
            t
    }(e.MUISprite);
    e.MUIWnd = t,
        __reflect(t.prototype, "MDisplay.MUIWnd");
    var i;
    !function(e) {
        e[e.NONE = 0] = "NONE",
            e[e.DROP = 1] = "DROP",
            e[e.SCALE = 2] = "SCALE",
            e[e.ALPHA = 3] = "ALPHA"
    }(i = e.WndShowType || (e.WndShowType = {}));
    var n = function(e) {
        function t() {
            var t = e.call(this) || this;
            return t._mLoadingBmp = new egret.Bitmap,
                t
        }
        return __extends(t, e),
            Object.defineProperty(t, "getInstance", {
                get: function() {
                    return void 0 == t._mInstance && (t._mInstance = new t),
                        t._mInstance
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.show = function() {
                void 0 == this._mLoadingBmp.bitmapData && (this._mLoadingBmp.bitmapData = GResCache.getRes("resource/assets/egret_icon.png")),
                    GUIManager.getInstance.topLay.addChild(this._mLoadingBmp),
                    this._mLoadingBmp.x = .5 * (GameMain.getInstance.StageWidth - this._mLoadingBmp.width),
                    this._mLoadingBmp.y = .5 * (GameMain.getInstance.StageHeight - this._mLoadingBmp.height)
            }
            ,
            t.prototype.hide = function() {
                null != this._mLoadingBmp.parent && this._mLoadingBmp.parent.removeChild(this._mLoadingBmp)
            }
            ,
            t
    }(e.MUISprite);
    e.MLoadingUI = n,
        __reflect(n.prototype, "MDisplay.MLoadingUI")
}(MDisplay || (MDisplay = {}));
var GStatus;
!function(e) {
    var t = function() {
        function e() {}
        return Object.defineProperty(e, "getInstance", {
            get: function() {
                return void 0 == e._mInstance && (e._mInstance = new e),
                    e._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
            e.prototype.enterStatus = function() {
                GUiwnd.LoadingWnd.getInstance
            }
            ,
            e.prototype.update = function(e) {
                GUiwnd.LoadingWnd.getInstance.update(e)
            }
            ,
            e.prototype.exitStatus = function() {
                GUiwnd.LoadingWnd.getInstance.hide()
            }
            ,
            e
    }();
    e.LoadingStatus = t,
        __reflect(t.prototype, "GStatus.LoadingStatus", ["GIGameStatus"])
}(GStatus || (GStatus = {}));
var MDisplay;
!function(e) {
    var t = function() {
        function e() {}
        return e
    }();
    e.MDisplay = t,
        __reflect(t.prototype, "MDisplay.MDisplay")
}(MDisplay || (MDisplay = {}));
var MDisplay;
!function(e) {
    var t = function() {
        function e(e, t, i, n, s, o, a, h, r, d, m) {
            void 0 === d && (d = 1),
                this.mImagePath = e,
                this.mBlendName = t,
                this.mRotation = i,
                this.mScaleX = n,
                this.mScaleY = s,
                this.mX = o,
                this.mY = a,
                this.mSkewX = h,
                this.mSkewY = r,
                this.mAlpha = d,
                this.mName = m
        }
        return e
    }();
    e.MDisplayConfig = t,
        __reflect(t.prototype, "MDisplay.MDisplayConfig")
}(MDisplay || (MDisplay = {}));
var MDisplay;
!function(e) {
    var t = function() {
        function e(e, t) {
            this._mDisplays = new Array,
                this._mIndex = e,
                this._mEventStr = t
        }
        return e.prototype.MaddDisplay = function(e) {
            this._mDisplays.push(e)
        }
            ,
            Object.defineProperty(e.prototype, "displays", {
                get: function() {
                    return this._mDisplays
                },
                enumerable: !0,
                configurable: !0
            }),
            e
    }();
    e.MFramData = t,
        __reflect(t.prototype, "MDisplay.MFramData")
}(MDisplay || (MDisplay = {}));
var MDisplay;
!function(e) {
    var t = function(e) {
        function t() {
            var t = e.call(this) || this;
            return t._mCurrentFramIndex = 1,
                t._mStartFrameIndex = 0,
                t._mEndFrameIndex = 0,
                t._mIsLoop = !0,
                t._mAutoClean = !1,
                t._mIsPause = !0,
                t
        }
        return __extends(t, e),
            t.prototype.MsetConfigData = function(e, t, i, n, s) {
                this._mConfigData = e,
                    this._mIsPause = !1,
                    this.GgoToAndPlay(t, i, n, s),
                    GMovieMag.getInstance.Madd2EnterFrame(this)
            }
            ,
            t.prototype.GgoToAndPlay = function(e, t, i, n) {
                this._mStartFrameIndex = void 0 == e ? 0 : e,
                    this._mEndFrameIndex = void 0 == t ? 0 : t,
                    this._mIsLoop = void 0 == i ? !0 : i,
                    this._mAutoClean = void 0 == n ? !1 : n,
                    this._mIsPause = !1,
                    this._mCurrentFramIndex = 0 == this._mStartFrameIndex ? 1 : this._mStartFrameIndex
            }
            ,
            t.prototype.Mupdate = function() {
                if (0 != this._mConfigData.mIsInit && !this._mIsPause) {
                    var e = this._mConfigData.GgetFrameData(this._mCurrentFramIndex);
                    if (null != e) {
                        for (var t = e.displays, i = this.numChildren, n = 0, s = t.length; s > n; n++) {
                            var o = t[n]
                                , a = void 0;
                            a = i > n ? this.getChildAt(n) : new egret.Bitmap,
                                a.bitmapData = GResCache.getRes(o.mImagePath, RES.ResourceItem.TYPE_IMAGE),
                                a.x = o.mX,
                                a.y = o.mY,
                                a.scaleX = o.mScaleX,
                                a.scaleY = o.mScaleY,
                                a.name = o.mName,
                                o.mSkewX != o.mSkewY ? (a.skewX = o.mSkewX,
                                    a.skewY = o.mSkewY,
                                    a.rotation = 0) : (a.rotation = o.mRotation,
                                    a.skewX = 0,
                                    a.skewY = 0),
                                a.alpha = o.mAlpha,
                            n >= i && this.addChild(a)
                        }
                        for (; this.numChildren > t.length; )
                            this.removeChildAt(this.numChildren - 1);
                        this.updateFrameIndex()
                    }
                }
            }
            ,
            t.prototype.updateFrameIndex = function() {
                var e = 0 == this._mEndFrameIndex ? this._mConfigData.mFrameTotal : this._mEndFrameIndex
                    , t = 0 == this._mStartFrameIndex ? 1 : this._mStartFrameIndex;
                this._mCurrentFramIndex >= e ? this._mIsLoop ? this._mCurrentFramIndex = t : (this._mIsPause = !0,
                    this.dispatchEventWith(GMovieClipEvent.played, !1, this),
                this._mAutoClean && GObjPool.getInstance.Gadd2Pool(this)) : this._mCurrentFramIndex++
            }
            ,
            t.prototype.clean = function() {
                GMovieMag.getInstance.MremoveEnterFrame(this),
                null != this.parent && this.parent.removeChild(this),
                    this.removeChildren()
            }
            ,
            t
    }(egret.DisplayObjectContainer);
    e.MMovieClip = t,
        __reflect(t.prototype, "MDisplay.MMovieClip", ["GIObjPool"])
}(MDisplay || (MDisplay = {}));
var MDisplay;
!function(e) {
    var t = function() {
        function t() {
            this.mIsInit = !1,
                this._mIsLoading = !1,
                this.framesArr = {},
                this._mLoader = new GLoadModule
        }
        return t.prototype.MloadConfig = function(e) {
            if (!this.mIsInit && !this._mIsLoading) {
                this._mIsLoading = !0;
                var i = e + ".json";
                this._mLoader.GaddGroupRes(i, GLoadModule.GroupType_Flash) && (this.mURL = t.configFileBaseUrl + i,
                    this._mLoader.Gbegin(this.onLoadedImage, this))
            }
        }
            ,
            t.prototype.onLoadedImage = function() {
                var e = GResCache.getRes(this.mURL);
                this.handleData(e),
                    this.mIsInit = !0
            }
            ,
            t.prototype.handleData = function(i) {
                var n = i.imageArr
                    , s = i.frames;
                this.mFrameTotal = s.length;
                for (var o = 0, a = s.length; a > o; o++) {
                    for (var h = s[o], r = new e.MFramData(h.index,h.eventStr), d = 0, m = h.list.length; m > d; d++) {
                        var l = h.list[d];
                        r.MaddDisplay(new e.MDisplayConfig(t.imageFileBaseUrl + n[l[0]],l[1],l[2],l[3],l[4],l[5],l[6],l[7],l[8],l[9],l[10]))
                    }
                    this.framesArr[h.index] = r
                }
            }
            ,
            t.prototype.GgetFrameData = function(e) {
                var t = this.framesArr[e];
                return void 0 == t ? null : t
            }
            ,
            t
    }();
    t.configFileBaseUrl = "resource/assets/flashconfig/",
        t.imageFileBaseUrl = "resource/assets/images/flash/",
        e.MMovieClipData = t,
        __reflect(t.prototype, "MDisplay.MMovieClipData")
}(MDisplay || (MDisplay = {}));
var GMovieClipEvent = function() {
    function e() {}
    return e
}();
GMovieClipEvent.loadedConfig = "loadedConfig",
    GMovieClipEvent.played = "MMovieClop_played",
    __reflect(GMovieClipEvent.prototype, "GMovieClipEvent");
var GUIManager = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mUIBg = new egret.DisplayObjectContainer,
            t._mUITop = new egret.DisplayObjectContainer,
            t._mUITips = new egret.DisplayObjectContainer,
            t._mUIMost = new egret.DisplayObjectContainer,
            t.addChild(t._mUIBg),
            t.addChild(t._mUITop),
            t.addChild(t._mUITips),
            t.addChild(t._mUIMost),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "bgLay", {
            get: function() {
                return this._mUIBg
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "topLay", {
            get: function() {
                return this._mUITop
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "tipLay", {
            get: function() {
                return this._mUITips
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "mostLay", {
            get: function() {
                return this._mUIMost
            },
            enumerable: !0,
            configurable: !0
        }),
        t
}(egret.DisplayObjectContainer);
__reflect(GUIManager.prototype, "GUIManager");
var GHttpMager = function() {
    function e() {
        this._mSendingMap = {}
    }
    return Object.defineProperty(e, "getInstance", {
        get: function() {
            return void 0 == e._mInstance && (e._mInstance = new e),
                e._mInstance
        },
        enumerable: !0,
        configurable: !0
    }),
        e.prototype.GaddHttpSend = function(e, t, i, n, s, o, a) {
            void 0 === s && (s = null),
            void 0 === o && (o = egret.HttpMethod.GET),
            void 0 === a && (a = egret.HttpResponseType.TEXT);
            var h = new egret.HttpRequest;
            h.responseType = a,
                e = o == egret.HttpMethod.GET ? e + "?" + t : e,
                h.open(e, o),
                h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                this._mSendingMap[h.hashCode] = {
                    cf: i,
                    to: n,
                    d: s
                },
                o == egret.HttpMethod.GET ? h.send() : h.send(t),
                h.addEventListener(egret.Event.COMPLETE, this.onHttpComplete, this),
                h.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onHttpError, this)
        }
        ,
        e.prototype.onHttpComplete = function(e) {
            this.callFun(e.currentTarget, !0)
        }
        ,
        e.prototype.onHttpError = function(e) {
            this.callFun(e.currentTarget, !1)
        }
        ,
        e.prototype.callFun = function(e, t) {
            var i = this._mSendingMap[e.hashCode];
            if (void 0 != i) {
                var n = i.cf;
                void 0 != n && void 0 != i.to && n.call(i.to, t, e, n.d),
                    delete this._mSendingMap[e.hashCode]
            }
        }
        ,
        e
}();
__reflect(GHttpMager.prototype, "GHttpMager");
var GLoadModule = function() {
    function e() {
        this._mLoadArr = new Array
    }
    return e.prototype.GaddItem = function(e) {
        null == GResCache.getRes(e) && this._mLoadArr.push(e)
    }
        ,
        e.prototype.GaddGroupRes = function(t, i) {
            var n = GResCache.getResGroupConfig(t);
            if (null == n)
                return egret.error("加载组资源时出错 不存在对应命名的配置:" + t),
                    !1;
            for (var s = n.images, o = n.base, a = 0, h = s; a < h.length; a++) {
                var r = h[a];
                this.GaddItem(o + r)
            }
            return i == e.GroupType_UI ? this.GaddItem(MDisplay.MUISprite.UIConfigUrl + t) : i == e.GroupType_Flash && this.GaddItem(MDisplay.MMovieClipData.configFileBaseUrl + t),
                !0
        }
        ,
        e.prototype.removeItem = function(e) {
            var t = this._mLoadArr.indexOf(e);
            t > -1 && this._mLoadArr.splice(t, 1)
        }
        ,
        e.prototype.Gbegin = function(e, t) {
            if (this._mCallBackFun = e,
                    this._mThisObj = t,
                    this._mLoadTotal = this._mLoadArr.length,
                0 == this._mLoadArr.length)
                return void this._mCallBackFun.call(this._mThisObj);
            for (var i = 0, n = 0, s = this._mLoadArr; n < s.length; n++) {
                var o = s[n];
                null != GResCache.getRes(o) ? this.removeItem(o) : (GResCache.loadResByUrl(o, this.onLoaded, this),
                    i++)
            }
            0 == i && this.checkIsEnd()
        }
        ,
        e.prototype.onLoaded = function(e, t) {
            void 0 != e && (this.removeItem(t),
                this.checkIsEnd())
        }
        ,
        e.prototype.checkIsEnd = function() {
            this._mLoadArr.length <= 0 && void 0 !== this._mCallBackFun && (this._mLoadTotal = 0,
                this._mCallBackFun.call(this._mThisObj))
        }
        ,
        Object.defineProperty(e.prototype, "loadTotal", {
            get: function() {
                return this._mLoadTotal
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "loadOverplus", {
            get: function() {
                return this._mLoadArr.length
            },
            enumerable: !0,
            configurable: !0
        }),
        e
}();
GLoadModule.GroupType_UI = "GroupLoadType_UI",
    GLoadModule.GroupType_Flash = "GroupLoadType_Flash",
    __reflect(GLoadModule.prototype, "GLoadModule");
var GResCache = function() {
    function e() {}
    return e.init = function() {
        e._mInit === !1 && (e._mInit = !0,
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, e.onLoadError, null))
    }
        ,
        e.getResGroupConfig = function(t) {
            return void 0 == e.mResGroupConfig || void 0 == e.mResGroupConfig[t] ? null : e.mResGroupConfig[t]
        }
        ,
        e.onLoadError = function(e) {
            egret.error("加载资源出错:" + e.resItem.name)
        }
        ,
        e.loadResByUrl = function(t, i, n, s) {
            return e.init(),
            void 0 == s && (s = e._mTypeConfig[t] ? e._mTypeConfig[t] : e.getTypeByUrl(t)),
                "" == s ? void egret.error("加载资源:" + t + "类型有误") : (e.mIsDeBug && egret.log("请求加载游戏资源:" + t),
                    e._mTypeConfig[t] = s,
                    void RES.getResByUrl(t, i, n, s))
        }
        ,
        e["delete"] = function(t) {
            RES.destroyRes(t),
                delete e._mTypeConfig[t]
        }
        ,
        e.getRes = function(t, i) {
            if (!e._mTypeConfig[t])
                return null;
            void 0 == i && (i = e._mTypeConfig[t]);
            var n = RES.getAnalyzer(i);
            return n ? n.getRes(t) : null
        }
        ,
        e.getTypeByUrl = function(e) {
            var t = e.lastIndexOf(".");
            if (-1 == t)
                return "";
            var i = e.slice(t + 1);
            return "json" == i ? RES.ResourceItem.TYPE_JSON : "png" == i || "jpg" == i ? RES.ResourceItem.TYPE_IMAGE : "fnt" == i ? RES.ResourceItem.TYPE_FONT : "mp3" == i || "wav" == i ? RES.ResourceItem.TYPE_SOUND : ""
        }
        ,
        e
}();
GResCache._mTypeConfig = {},
    GResCache._mInit = !1,
    GResCache.mIsDeBug = !0,
    __reflect(GResCache.prototype, "GResCache");
var GHashMap = function() {
    function e() {
        this._mkeys = []
    }
    return e.prototype.onAdd = function(e) {
        void 0 == this[e] && this._mkeys.push(e)
    }
        ,
        e.prototype.onRemove = function(e) {
            if (void 0 != this[e]) {
                var t = this._mkeys.indexOf(e);
                t > -1 && this._mkeys.splice(t, 1)
            }
        }
        ,
        e.prototype.Gput = function(e, t) {
            void 0 != e && (this.onAdd(e),
                this[e] = t)
        }
        ,
        e.prototype.GhasKey = function(e) {
            return void 0 != this[e]
        }
        ,
        e.prototype.GhasValue = function(e) {
            if (void 0 == e)
                return !1;
            for (var t = 0, i = this._mkeys; t < i.length; t++) {
                var n = i[t];
                if (this[n] == e)
                    return !0
            }
            return !1
        }
        ,
        e.prototype.GremoveByKey = function(e) {
            if (0 == this.GhasKey(e))
                return null;
            this.onRemove(e);
            var t = this[e];
            return delete this[e],
                t
        }
        ,
        e.prototype.GremoveByValue = function(e) {
            if (void 0 == e)
                return !1;
            for (var t = 0, i = this._mkeys; t < i.length; t++) {
                var n = i[t];
                if (this[n] == e)
                    return this.GremoveByKey(n),
                        !0
            }
            return !1
        }
        ,
        e.prototype.Gget = function(e) {
            var t = this[e];
            return void 0 == t ? null : t
        }
        ,
        Object.defineProperty(e.prototype, "size", {
            get: function() {
                return this._mkeys.length
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "keys", {
            get: function() {
                return this._mkeys
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.clear = function() {
            for (var e = this._mkeys, t = e.length, i = t - 1; i >= 0; i--)
                this.GremoveByKey(e[i])
        }
        ,
        e
}();
__reflect(GHashMap.prototype, "GHashMap");
var GObjPool = function() {
    function e() {}
    return Object.defineProperty(e, "getInstance", {
        get: function() {
            return void 0 == e._mInstance && (e._mInstance = new e),
                e._mInstance
        },
        enumerable: !0,
        configurable: !0
    }),
        e.prototype.Gadd2Pool = function(t) {
            if (void 0 != t) {
                var i = egret.getQualifiedClassName(t);
                if (0 != i.length) {
                    var n = this[i];
                    if (void 0 == n && (n = new Array,
                            this[i] = n),
                            e.mIsCheck) {
                        var s = n.indexOf(t);
                        if (s > -1)
                            return void egret.error("重复向对象池插入相同对象实例 类型:" + i)
                    }
                    egret.is(t, "GIObjPool") && t.clean(),
                        n.push(t)
                }
            }
        }
        ,
        e.prototype.GgetObj = function(e) {
            if (void 0 == e)
                return null;
            var t = egret.getQualifiedClassName(e);
            if (0 == t.length)
                return null;
            var i = this[t];
            return void 0 == i || i.length <= 0 ? null : i.pop()
        }
        ,
        e.GgetMCObj = function() {
            var t = e.getInstance.GgetObj(MDisplay.MMovieClip);
            return null == t && (t = new MDisplay.MMovieClip),
                t
        }
        ,
        e.GgetBmObj = function() {
            var t = e.getInstance.GgetObj(egret.Bitmap);
            return null == t && (t = new egret.Bitmap),
                t
        }
        ,
        e.GgetTimerTaskObj = function() {
            var t = e.getInstance.GgetObj(MUtils.MTimerTask);
            return null == t && (t = new MUtils.MTimerTask),
                t
        }
        ,
        e
}();
GObjPool.mIsCheck = !0,
    __reflect(GObjPool.prototype, "GObjPool");
var GTimerMag = function() {
    function e() {
        this._mLastTime = egret.getTimer(),
            this._mTaskMap = new GHashMap
    }
    return Object.defineProperty(e, "getInstance", {
        get: function() {
            return void 0 == e._mInstance && (e._mInstance = new e),
                e._mInstance
        },
        enumerable: !0,
        configurable: !0
    }),
        e.prototype.addTimerTask = function(e, t, i, n, s) {
            var o = GObjPool.GgetTimerTaskObj();
            o.Minit(e, t, i, n, s),
                this._mTaskMap.Gput(e, o)
        }
        ,
        e.prototype.GremoveTimerTask = function(e) {
            var t = this._mTaskMap.GremoveByKey(e);
            void 0 != t && GObjPool.getInstance.Gadd2Pool(t)
        }
        ,
        e.prototype.update = function() {
            this._mCurrTime = egret.getTimer();
            for (var e = this._mCurrTime - this._mLastTime, t = this._mTaskMap.keys, i = t.length - 1; i >= 0; i--) {
                var n = this._mTaskMap.Gget(t[i]);
                n.Mupdate(e)
            }
            return this._mLastTime = this._mCurrTime,
                e
        }
        ,
        e.prototype.getCurrTime = function() {
            return this._mCurrTime
        }
        ,
        e
}();
__reflect(GTimerMag.prototype, "GTimerMag");
var GUtil = function() {
    function e() {}
    return e.colorMatrixIsNormal = function(e) {
        return void 0 == e || 8 != e.length ? !1 : 1 == e[0] && 0 == e[1] && 1 == e[2] && 0 == e[3] && 1 == e[4] && 0 == e[5] && 1 == e[6] && 0 == e[7] ? !0 : !1
    }
        ,
        e.to20ColorMatrix = function(t) {
            return 0 == e.colorMatrixIsNormal(t) ? null : void 0
        }
        ,
        e.getFileType = function(e) {
            var t = e.lastIndexOf(".");
            if (-1 == t)
                return "";
            var i = e.slice(t + 1);
            return i
        }
        ,
        e
}();
GUtil.COLOR_FILTER_LIGHT = new egret.ColorMatrixFilter([1, 0, 0, 0, 50, 0, 1, 0, 0, 50, 0, 0, 1, 0, 50, 0, 0, 0, 1, 0]),
    GUtil.COLOR_FILTER_LIGHT3 = new egret.ColorMatrixFilter([1, 0, 0, 0, 120, 0, 1, 0, 0, 120, 0, 0, 1, 0, 120, 0, 0, 0, 1, 0]),
    __reflect(GUtil.prototype, "GUtil");
var MUtils;
!function(e) {
    var t = function() {
        function e() {}
        return e.prototype.Minit = function(e, t, i, n, s) {
            this.mName = e,
                this.mTotal = t,
                this._mDeplete = this._mDelayed = i,
                this._mCallFun = n,
                this._mThisObj = s,
                this.mCurrentTime = 0
        }
            ,
            e.prototype.Mupdate = function(e) {
                this._mDeplete -= e,
                this._mDeplete <= 0 && (this.mCurrentTime++,
                    this._mCallFun.call(this._mThisObj, this),
                    this._mDeplete = this._mDelayed,
                this.mCurrentTime >= this.mTotal && GTimerMag.getInstance.GremoveTimerTask(this.mName))
            }
            ,
            e.prototype.clean = function() {}
            ,
            e
    }();
    e.MTimerTask = t,
        __reflect(t.prototype, "MUtils.MTimerTask", ["GIObjPool"])
}(MUtils || (MUtils = {}));
var GameMain = function(e) {
    function t() {
        var i = e.call(this) || this;
        return i._mIsInit = !1,
            i._mFrameIndex = 0,
            t._mInstance = i,
            i.once(egret.Event.ADDED_TO_STAGE, i.callFun, i),
            i
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.callFun = function(e) {
            egret.MainContext.deviceType == egret.MainContext.DEVICE_PC ? (this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL,
                this.stage.orientation = egret.OrientationMode.AUTO) : (this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT,
                this.stage.orientation = egret.OrientationMode.PORTRAIT),
                this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this),
                this.stage.addEventListener(egret.Event.ACTIVATE, this.onActivite, this)
        }
        ,
        t.prototype.init = function() {
            this._mIsInit = !0,
                GResCache.mResGroupConfig = ResGroup.resGroupConfig,
                RES.setMaxLoadingThread(5),
                this.addChild(GUIManager.getInstance),
                this.setGameState(GStatus.LoadingStatus.getInstance)
        }
        ,
        t.prototype.setGameState = function(e) {
            this._mCurrentState != e && void 0 != e && (void 0 != this._mCurrentState && this._mCurrentState.exitStatus(),
                this._mCurrentState = e,
                this._mCurrentState.enterStatus())
        }
        ,
        t.prototype.onEnterFrame = function(e) {
            0 == this._mIsInit && this._mFrameIndex > 2 && this.init();
            var t = GTimerMag.getInstance.update();
            GMovieMag.getInstance.GonEnterFrame(),
            void 0 != this._mCurrentState && this._mCurrentState.update(t),
                this._mFrameIndex++
        }
        ,
        Object.defineProperty(t.prototype, "StageWidth", {
            get: function() {
                return this.stage.stageWidth
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "StageHeight", {
            get: function() {
                return this.stage.$stageHeight
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.onActivite = function() {
            void 0 != PayWnd.getInstance.parent && PayWnd.getInstance.hide()
        }
        ,
        t
}(egret.DisplayObjectContainer);
__reflect(GameMain.prototype, "GameMain");
var GameValue = function() {
    function e() {
        this.codeTimes = "codeTimes",
            this.codeDay = "codeDay"
    }
    return Object.defineProperty(e, "getInstance", {
        get: function() {
            return void 0 == e._mInstance && (e._mInstance = new e),
                e._mInstance
        },
        enumerable: !0,
        configurable: !0
    }),
        e.prototype.saveData = function(e) {
            egret.localStorage.setItem(this.codeTimes, "" + e);
            var t = (new Date).getDate();
            egret.localStorage.setItem(this.codeDay, "" + t)
        }
        ,
        e.prototype.getData = function() {
            var e = (new Date).getDate()
                , t = Number(egret.localStorage.getItem(this.codeDay))
                , i = Number(egret.localStorage.getItem(this.codeTimes));
            return e == t && i > 0 ? !1 : (this.saveData(1),
                !0)
        }
        ,
        e
}();
GameValue.isDebug = !1,
    GameValue.userId = "2",
    GameValue.orderId = "oXuE4vyvnLvre1yehrP9_MuDoaMk",
    GameValue.residualGold = 0,
    GameValue.bonusdualGold = 0,
    GameValue.commissionGold = 0,
    GameValue.hbMoney = 0,
    GameValue.upperuLimit = 80,
    GameValue.upperu = 0,
    GameValue.yongjin = 0,
    GameValue.backTimes = 0,
    GameValue.tingshengNum = 0,
    GameValue.baojiNum = 0,
    GameValue.max5 = 50,
    GameValue.max10 = 100,
    GameValue.max20 = 200,
    GameValue.codeURL = "code_10",
    __reflect(GameValue.prototype, "GameValue");
var PriceRangeData = function() {
    function e() {
        this.yuan5 = [],
            this.yuan10 = [],
            this.yuan20 = []
    }
    return Object.defineProperty(e, "getInstance", {
        get: function() {
            return void 0 == e._mInstance && (e._mInstance = new e),
                e._mInstance
        },
        enumerable: !0,
        configurable: !0
    }),
        e.prototype.initData = function(e, t) {
            5 == e ? this.yuan5.push(t) : 10 == e ? this.yuan10.push(t) : 20 == e && this.yuan20.push(t)
        }
        ,
        e.prototype.getLength = function() {
            return this.yuan5.length < 4 ? 4 : this.yuan5.length
        }
        ,
        e.prototype.getPrice = function(e, t) {
            var i;
            return i = 2 == e ? this.yuan10 : 3 == e ? this.yuan20 : this.yuan5,
                void 0 != i[t - 1] ? i[t - 1] : i[0]
        }
        ,
        e.prototype.getPriceSpend = function(e, t) {
            return 2 == e ? 10 : 3 == e ? 20 : 5
        }
        ,
        e.prototype.isMysteriousM = function(e, t) {
            return 2 == e && t == GameValue.max10 ? !0 : 3 == e && t == GameValue.max20 ? !0 : t == GameValue.max5 ? !0 : !1
        }
        ,
        e
}();
__reflect(PriceRangeData.prototype, "PriceRangeData");
var RedBonsData = function() {
    function e() {
        this.redBonsDataMap = new GHashMap;
        for (var e = 0; 4 > e; e++)
            this.initData(e, 100 - 15 * e, 100 - 10 * e, !1, 10 * (e + 1))
    }
    return Object.defineProperty(e, "getInstance", {
        get: function() {
            return void 0 == e._mInstance && (e._mInstance = new e),
                e._mInstance
        },
        enumerable: !0,
        configurable: !0
    }),
        e.prototype.initData = function(e, t, i, n, s) {
            var o = new RedData;
            o.id = e,
                o.hasTimes = t,
                o.maxTimes = i,
                o.isReceive = n,
                o.money = s,
                this.redBonsDataMap.Gput(e, o)
        }
        ,
        e.prototype.getDataById = function(e) {
            return this.redBonsDataMap.GhasKey(e) ? this.redBonsDataMap.Gget(e) : void 0
        }
        ,
        e
}();
__reflect(RedBonsData.prototype, "RedBonsData");
var RedData = function() {
    function e() {}
    return e
}();
__reflect(RedData.prototype, "RedData");
var BackRowModle = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mModleNum = 4,
            t._mInitialPos = 100,
            t._mSpacing = 130,
            t._mSpeedMove = 2,
            t._mGroupMC = new egret.DisplayObjectContainer,
            WorldWnd.getInstance.groupBg.addChildAt(t._mGroupMC, 2),
            t._mModleMCMap = new GHashMap,
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.show = function() {
            this._mModleNum = PriceRangeData.getInstance.getLength(),
                this.initMC()
        }
        ,
        t.prototype.initMC = function() {
            for (var e, t = 1; t <= this._mModleNum; t++) {
                if (this._mModleMCMap.GhasKey("modleMC" + t))
                    e = this._mModleMCMap.Gget("modleMC" + t);
                else {
                    e = WWModle.getWWModle();
                    var i = t % 6 == 0 ? 6 : t % 6;
                    ModleMove.getInstance.getTimeSpeedWW() > 0 && void 0 != ModleMove.getInstance.getChangeId() && (i = ModleMove.getInstance.getChangeId() + 1);
                    var n = "modleMC" + ModleMove._mModleIdList[i - 1];
                    e.showData(n, 10, null, !1, 1, 1),
                        this._mModleMCMap.Gput("modleMC" + t, e)
                }
                e.name = "modleMC" + t,
                    e.x = this._mInitialPos + (t - 1) * this._mSpacing,
                    e.y = 530,
                    e.scaleX = .5,
                    e.scaleY = .5,
                    this._mGroupMC.addChild(e)
            }
            this._mGroupMC.stage.dirtyRegionPolicy = "off"
        }
        ,
        t.prototype.changeModleMC = function(e) {
            for (var t, i = 1; i <= this._mModleNum; i++)
                if (this._mModleMCMap.GhasKey("modleMC" + i))
                    if (t = this._mModleMCMap.Gget("modleMC" + i),
                        void 0 != e)
                        t.playChangeWWMC("modleMC" + e);
                    else {
                        var n = i % 6 == 0 ? 6 : i % 6
                            , s = "modleMC" + ModleMove._mModleIdList[n - 1];
                        t.playChangeWWMC(s)
                    }
        }
        ,
        t.prototype.changeSpeedMove = function(e) {
            1 == e ? this._mSpeedMove = 2 : 2 == e && (this._mSpeedMove = 1)
        }
        ,
        t.prototype.changeWWPrice = function(e, t) {
            for (var i, n = 1; n <= this._mModleNum; n++)
                if (this._mModleMCMap.GhasKey("modleMC" + n)) {
                    i = this._mModleMCMap.Gget("modleMC" + n),
                        i.changeWW(e, t);
                    var s = PriceRangeData.getInstance.getPrice(e, n);
                    PriceRangeData.getInstance.isMysteriousM(e, s) ? (i.setMoneyPrice(s, !0),
                        i.setMoney(-65, -65)) : (i.setMoneyPrice(s, !1),
                        i.setMoney(-35, -40))
                }
            ModleMove.getInstance.getTimeSpeedWW() > 0 && void 0 != ModleMove.getInstance.getChangeId() && this.changeWWPrice1(ModleMove.getInstance.getPriceType(), ModleMove.getInstance.getChangeId(), !0)
        }
        ,
        t.prototype.changeWWPrice1 = function(e, t, i) {
            for (var n, s = PriceRangeData.getInstance.getPrice(e, t + 1), o = 1; o <= this._mModleNum; o++) {
                if (n = this._mModleMCMap.Gget("modleMC" + o),
                    void 0 == n)
                    return;
                n.changeWW(e, i),
                    PriceRangeData.getInstance.isMysteriousM(e, s) ? (n.setMoneyPrice(s, !0),
                        n.setMoney(-65, -65)) : (n.setMoneyPrice(s, !1),
                        n.setMoney(-35, -40))
            }
        }
        ,
        t.prototype.update = function(e) {
            for (var t, i = 1; i <= this._mModleNum; i++)
                this._mModleMCMap.GhasKey("modleMC" + i) && (t = this._mModleMCMap.Gget("modleMC" + i),
                    t.x -= this._mSpeedMove,
                t.x <= this._mInitialPos - this._mSpacing && (t.x = this._mInitialPos + this._mSpacing * (this._mModleNum - 1)))
        }
        ,
        t.prototype.hide = function() {
            for (var e, t = 1; t <= this._mModleNum; t++)
                this._mModleMCMap.GhasKey("modleMC" + t) && (e = this._mModleMCMap.GremoveByKey("modleMC" + t),
                    e.hide(),
                    GObjPool.getInstance.Gadd2Pool(e),
                    e = null)
        }
        ,
        t
}(MDisplay.MUISprite);
__reflect(BackRowModle.prototype, "BackRowModle");
var ClipMove = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mSpeedMoveDown = 12,
            t._mSpeedMoveUp = 5,
            t._mInitialPos = egret.Point.create(143, -450),
            t._mEndPos = egret.Point.create(143, -65),
            t._mCliType = 1,
            t._mClipMCPos = [250, 635],
            t._mIsSet = !1,
            t.isShak = !1,
            t._mShakingRange = 3,
            t._mAccClipSpeed = !1,
            t._mTimeSpeed = 0,
            t._mGroupCli = WorldWnd.getInstance.groupClip,
            t._mCli = new egret.Bitmap,
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.show = function() {
            this._mCliState = 1,
                this._mCli.$setBitmapData(GResCache.getRes("resource/assets/images/ui/jiazi" + this._mCliType + ".1.png")),
                this._mCli.x = this._mInitialPos.x,
                this._mCli.y = this._mInitialPos.y,
                this._mGroupCli.addChild(this._mCli)
        }
        ,
        t.prototype.begin = function() {
            1 == this._mCliState && 0 != ModleMove.getInstance.finish && (this._mSpeedMoveUp = this.getSpeed(1),
                this.clipShaked(),
                ModleMove.getInstance.setFinish(!1),
                this.changeCli(1),
                ModleMove.getInstance.isCheck())
        }
        ,
        t.prototype.changeCli = function(e) {
            this._mCli.alpha = 1,
                1 == e ? this._mCli.$setBitmapData(GResCache.getRes("resource/assets/images/ui/jiazi" + this._mCliType + ".2.png")) : 2 == e && this._mCli.$setBitmapData(GResCache.getRes("resource/assets/images/ui/jiazi" + this._mCliType + ".1.png")),
                1 == this._mCliState ? (this._mJZSoundDown = SoundMgr.getInstance.play(SoundMgr.SOUND_JIAZI),
                    this._mCliState = 2) : 3 == this._mCliState && ModleMove.getInstance.isClip()
        }
        ,
        t.prototype.changeClitype = function(e) {
            this._mCliType = e,
                this._mCli.$setBitmapData(GResCache.getRes("resource/assets/images/ui/jiazi" + this._mCliType + ".1.png"))
        }
        ,
        t.prototype.cliUp = function() {
            this._mJZSoundUp = SoundMgr.getInstance.play(SoundMgr.SOUND_JIAZI),
                this._mCliState = 4
        }
        ,
        t.prototype.playClipMC11 = function() {
            this.cleanClipMC11(),
                this._mIsSet = !1,
                this._mClipMC11 = GMovieMag.getInstance.GgetMovieClip("clipMC" + this._mCliType + "_" + this._mShakingRange, void 0, void 0, !0),
                this._mClipMC11.x = 270,
                this._mClipMC11.y = this._mClipMCPos[0],
                this._mGroupCli.addChild(this._mClipMC11);
            var e = egret.Tween.get(this._mCli);
            e.to({
                alpha: 0
            }, 200)
        }
        ,
        t.prototype.stopClipMC11 = function() {
            this._mCli.alpha = 1,
                this.cleanClipMC11()
        }
        ,
        Object.defineProperty(t.prototype, "clipState", {
            get: function() {
                return this._mCliState
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.changeUpSpeed = function() {
            this._mSpeedMoveUp = this.getSpeed(2)
        }
        ,
        t.prototype.clipShaking = function() {
            0 != this.isShak && (this._mCli.alpha = 0,
                this._mClipShakingMC = GMovieMag.getInstance.GgetMovieClip("clipMC" + this._mCliType, void 0, void 0, !1),
                this._mClipShakingMC.x = 270,
                this._mClipShakingMC.y = -12,
                1 == this._mCliType ? (this._mClipShakingMC.x = 269,
                    this._mClipShakingMC.y = -2) : 2 == this._mCliType && (this._mClipShakingMC.x = 269,
                        this._mClipShakingMC.y = -2),
                this._mGroupCli.addChild(this._mClipShakingMC),
                this._mClipShakingMC.addEventListener(GMovieClipEvent.played, this.clipShaked, this))
        }
        ,
        t.prototype.clipShaked = function() {
            this._mCli.alpha = 1,
                this.cleanClipShakingMC()
        }
        ,
        t.prototype.getDownTime = function() {
            var e = Math.abs(this._mEndPos.y - this._mInitialPos.y) / this._mSpeedMoveDown;
            return e
        }
        ,
        t.prototype.chagneAccClipSpeed = function(e) {
            1 == e ? (this._mAccClipSpeed = !1,
                this._mTimeSpeed = 0,
                this._mSpeedMoveDown = 12,
                this._mSpeedMoveUp = this.getSpeed(1),
                SkillTimer.getInstance.hideTime(SkillTimer.TYPE_JZJS)) : 2 == e && (this._mAccClipSpeed = !0,
                    this._mTimeSpeed = 6e4,
                    this._mSpeedMoveDown = 36,
                    this._mSpeedMoveUp = this.getSpeed(1),
                    SkillTimer.getInstance.showTime(SkillTimer.TYPE_JZJS, 6e4))
        }
        ,
        t.prototype.getTimeSpeed = function() {
            return this._mTimeSpeed
        }
        ,
        t.prototype.isAccClipSpeed = function() {
            return this._mAccClipSpeed
        }
        ,
        t.prototype.getSpeed = function(e) {
            var t = 5;
            return 1 == this._mAccClipSpeed ? 1 == e ? t = 15 : 2 == e && (t = 30) : 1 == e ? t = 5 : 2 == e && (t = 10),
                t
        }
        ,
        t.prototype.update = function(e) {
            1 == this._mAccClipSpeed && (this._mTimeSpeed -= e,
                SkillTimer.getInstance.updateType(SkillTimer.TYPE_JZJS, Math.floor(this._mTimeSpeed / 1e3)),
            this._mTimeSpeed <= 0 && this.chagneAccClipSpeed(1)),
                2 == this._mCliState ? (this._mCli.y += this._mSpeedMoveDown,
                this._mCli.y >= this._mEndPos.y && (this._mCli.y = this._mEndPos.y,
                    this._mCliState = 3,
                    this.changeCli(2),
                this._mJZSoundDown && this._mJZSoundDown.stop())) : 4 == this._mCliState && (this._mCli.y -= this._mSpeedMoveUp,
                        this._mCli.y <= this._mInitialPos.y ? (this._mCli.y = this._mInitialPos.y,
                            this._mCliState = 1,
                            ModleMove.getInstance.modleClip(this._mSpeedMoveUp, !0),
                            this.stopClipMC11(),
                            this.clipShaking(),
                        this._mJZSoundUp && this._mJZSoundUp.stop()) : ModleMove.getInstance.modleClip(this._mSpeedMoveUp, !1),
                    void 0 != this._mClipMC11 && (0 == this._mIsSet && (this._mIsSet = !0,
                        this._mClipMC11.y = this._mClipMCPos[1]),
                        this._mClipMC11.y -= this._mSpeedMoveUp,
                    this._mClipMC11.y <= this._mClipMCPos[0] && (this._mClipMC11.y = this._mClipMCPos[0])))
        }
        ,
        t.prototype.cleanClipShakingMC = function() {
            void 0 != this._mClipShakingMC && (this._mClipShakingMC.removeEventListener(GMovieClipEvent.played, this.clipShaked, this),
                GObjPool.getInstance.Gadd2Pool(this._mClipShakingMC),
            void 0 != this._mClipShakingMC.parent && this._mClipShakingMC.parent.removeChild(this._mClipShakingMC),
                delete this._mClipShakingMC)
        }
        ,
        t.prototype.cleanClipMC11 = function() {
            void 0 != this._mClipMC11 && (GObjPool.getInstance.Gadd2Pool(this._mClipMC11),
            void 0 != this._mClipMC11.parent && this._mClipMC11.parent.removeChild(this._mClipMC11),
                delete this._mClipMC11)
        }
        ,
        t.prototype.hide = function() {
            this._mCliState = 1,
            void 0 != this._mCli.parent && this._mCli.parent.removeChild(this._mCli),
                this.removeChildren(),
                this.cleanClipShakingMC(),
                this.cleanClipMC11(),
            this._mJZSoundDown && this._mJZSoundDown.stop(),
            this._mJZSoundUp && this._mJZSoundUp.stop()
        }
        ,
        t
}(MDisplay.MUISprite);
__reflect(ClipMove.prototype, "ClipMove");
var Fail = function() {
    function e() {
        this._mIsTouch = !1,
            this._mHeiBG = new egret.Bitmap,
            this._mGroup = GUIManager.getInstance.topLay
    }
    return Object.defineProperty(e, "getInstance", {
        get: function() {
            return void 0 == e._mInstance && (e._mInstance = new e),
                e._mInstance
        },
        enumerable: !0,
        configurable: !0
    }),
        e.prototype.show = function() {
            this.shadowMC()
        }
        ,
        e.prototype.shadowMC = function() {
            this._mHeiBG.$setBitmapData(GResCache.getRes("resource/assets/images/ui/heise.png")),
                this._mHeiBG.x = 0,
                this._mHeiBG.y = 0,
                this._mHeiBG.touchEnabled = !0,
                this._mGroup.addChild(this._mHeiBG),
                this._mHeiBG.alpha = 0;
            var e = egret.Tween.get(this._mHeiBG);
            1 == ClipMove.getInstance.isAccClipSpeed() ? (e.to({
                alpha: .5
            }, 60),
                e.wait(50)) : (e.to({
                alpha: .5
            }, 200),
                e.wait(150)),
                e.call(this.playHongBao, this)
        }
        ,
        e.prototype.redEnvelopes = function() {
            var e = "redEnvelopesMC";
            1 == ClipMove.getInstance.isAccClipSpeed() && (e = "redEnvelopesMC3"),
                this._mRedEnvelopesMC = GMovieMag.getInstance.GgetMovieClip(e, void 0, void 0, !1),
                this._mRedEnvelopesMC.x = 270,
                this._mRedEnvelopesMC.y = 701.85,
                WorldWnd.getInstance.groupBg.addChildAt(this._mRedEnvelopesMC, 2),
                this._mRedEnvelopesMC.addEventListener(GMovieClipEvent.played, this.redLoop, this)
        }
        ,
        e.prototype.redLoop = function() {
            this._mRedEnvelopesMC.GgoToAndPlay(64, 108, !0)
        }
        ,
        e.prototype.playRedRandomMC = function() {
            egret.Tween.removeTweens(this._mHeiBG),
                this._mRedRandomMC = GMovieMag.getInstance.GgetMovieClip("redRandomMC", void 0, void 0, !1),
                this._mRedRandomMC.x = 270,
                this._mRedRandomMC.y = 390,
                this._mGroup.addChild(this._mRedRandomMC);
            var e = Math.ceil(7 * Math.random());
            this._mRedRandomTextMC = GMovieMag.getInstance.GgetMovieClip("redRandomTextMC" + e, void 0, void 0, !1),
                this._mRedRandomTextMC.x = 270,
                this._mRedRandomTextMC.y = 390,
                this._mGroup.addChild(this._mRedRandomTextMC),
                this._mIsTouch = !1,
                this._mRedRandomOpenMC = GMovieMag.getInstance.GgetMovieClip("redRandomOpenMC", void 0, void 0, !1),
                this._mRedRandomOpenMC.x = 270,
                this._mRedRandomOpenMC.y = 480,
                this._mGroup.addChild(this._mRedRandomOpenMC),
                this._mRedRandomOpenMC.touchEnabled = !0,
                this._mRedRandomOpenMC.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this);
            var t = egret.Tween.get(this._mRedRandomOpenMC);
            t.wait(500),
                t.call(this.canOpen, this)
        }
        ,
        e.prototype.canOpen = function() {
            egret.Tween.resumeTweens(this._mRedRandomOpenMC),
                this._mIsTouch = !0
        }
        ,
        e.prototype.scaleBnt = function(e) {
            if (0 != this._mIsTouch) {
                SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
                var t = egret.Tween.get(e.target).to({
                    scaleX: .85,
                    scaleY: .85
                }, 100).to({
                    scaleX: 1,
                    scaleY: 1
                }, 100);
                t.call(this.playHongBao, this)
            }
        }
        ,
        e.prototype.playHongBao = function() {
            WorldWnd.getInstance.freshTimes(),
                this._mIsTouch = !1,
                this.cleanRedRandomTextMC(),
                this.cleanRedRandomOpenMC(),
                this.cleanRedEnvelopesMC(),
                this.cleanRedRandomMC(),
                WorldWnd.getInstance.getPriceType() < GameValue.hbMoney ? SmallProfitUI.getInstance.show() : HongBaoUI.getInstance.show(2)
        }
        ,
        e.prototype.cleanHeiBG = function() {
            void 0 != this._mHeiBG.parent && this._mHeiBG.parent.removeChild(this._mHeiBG)
        }
        ,
        e.prototype.cleanRedEnvelopesMC = function() {
            void 0 != this._mRedEnvelopesMC && (this._mRedEnvelopesMC.removeEventListener(GMovieClipEvent.played, this.redLoop, this),
                GObjPool.getInstance.Gadd2Pool(this._mRedEnvelopesMC),
            void 0 != this._mRedEnvelopesMC.parent && this._mRedEnvelopesMC.parent.removeChild(this._mRedEnvelopesMC),
                delete this._mRedEnvelopesMC)
        }
        ,
        e.prototype.cleanRedRandomMC = function() {
            void 0 != this._mRedRandomMC && (GObjPool.getInstance.Gadd2Pool(this._mRedRandomMC),
            void 0 != this._mRedRandomMC.parent && this._mRedRandomMC.parent.removeChild(this._mRedRandomMC),
                delete this._mRedRandomMC)
        }
        ,
        e.prototype.cleanRedRandomTextMC = function() {
            void 0 != this._mRedRandomTextMC && (GObjPool.getInstance.Gadd2Pool(this._mRedRandomTextMC),
            void 0 != this._mRedRandomTextMC.parent && this._mRedRandomTextMC.parent.removeChild(this._mRedRandomTextMC),
                delete this._mRedRandomTextMC)
        }
        ,
        e.prototype.cleanRedRandomOpenMC = function() {
            void 0 != this._mRedRandomOpenMC && (this._mRedRandomOpenMC.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.playHongBao, this),
                GObjPool.getInstance.Gadd2Pool(this._mRedRandomOpenMC),
            void 0 != this._mRedRandomOpenMC.parent && this._mRedRandomOpenMC.parent.removeChild(this._mRedRandomOpenMC),
                delete this._mRedRandomOpenMC)
        }
        ,
        e.prototype.hide = function() {
            this.cleanRedRandomTextMC(),
                this.cleanRedRandomOpenMC(),
                this.cleanRedEnvelopesMC(),
                this.cleanRedRandomMC(),
                this.cleanHeiBG(),
                ModleMove.getInstance.setFinish(!0)
        }
        ,
        e
}();
__reflect(Fail.prototype, "Fail");
var ModleMove = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mModleNum = 4,
            t._mSpeedMove = 3,
            t._mInitialPos = 100,
            t._mSpacing = 150,
            t._mRange = [.5 * GameMain.getInstance.StageWidth - 75, .5 * GameMain.getInstance.StageWidth + 75],
            t._mShackRange1 = [.5 * GameMain.getInstance.StageWidth - 15, .5 * GameMain.getInstance.StageWidth + 15],
            t._mShackRange2 = [.5 * GameMain.getInstance.StageWidth - 35, .5 * GameMain.getInstance.StageWidth + 35],
            t._mIsStop = !0,
            t.isisClip = !1,
            t.isSuccess = !1,
            t._mModleType = 1,
            t.isFinish = !0,
            t._mPriceType = 1,
            t._mIsBack = !1,
            t._mDropRand = 10,
            t._mShakingRange = 3,
            t._mServerResult = 0,
            t._mFlood = !1,
            t._mDecT = !1,
            t._mTimeSpeed = 0,
            t._mDecTWW = !1,
            t._mTimeSpeedWW = 0,
            t._mChangeId = void 0,
            t._mWWCanTouch = !1,
            t.modleTempId = void 0,
            t._mGroupMC = WorldWnd.getInstance.groupMC,
            t._mModleMCMap = new GHashMap,
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.initData = function() {}
        ,
        t.prototype.show = function() {
            this._mModleNum = PriceRangeData.getInstance.getLength(),
                this.initMC(),
                this._mIsStop = !0,
                this.isFinish = !0
        }
        ,
        Object.defineProperty(t.prototype, "finish", {
            get: function() {
                return this.isFinish
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.setFinish = function(e) {
            this.isFinish = e
        }
        ,
        t.prototype.initMC = function() {
            for (var e, i = 1; i <= this._mModleNum; i++) {
                if (this._mModleMCMap.GhasKey("modleMC" + i))
                    e = this._mModleMCMap.Gget("modleMC" + i);
                else {
                    e = WWModle.getWWModle();
                    var n = i % 6 == 0 ? 6 : i % 6;
                    t.getInstance.getTimeSpeedWW() > 0 && void 0 != this._mChangeId && (n = this._mChangeId + 1);
                    var s = "modleMC" + t._mModleIdList[n - 1];
                    e.showData(s, 10, null, !1, 1, 1),
                        this._mModleMCMap.Gput("modleMC" + i, e),
                        e.name = "modleMC" + (i - 1)
                }
                e.x = this._mInitialPos + (i - 1) * this._mSpacing,
                    e.y = 613,
                    this._mGroupMC.addChild(e),
                    e.touchEnabled = !0,
                    e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchWW, this)
            }
            this._mGroupMC.stage.dirtyRegionPolicy = "off"
        }
        ,
        t.prototype.setWWCanTouch = function(e) {
            this._mWWCanTouch = e
        }
        ,
        t.prototype.touchWW = function(e) {
            if (0 != this._mWWCanTouch && 0 != MallWnd.getInstance.isEnough(1)) {
                MallWnd.getInstance.buyPropServer(SkillTimer.TYPE_WWJS);
                var t = e.target.name.replace(/[^0-9]/gi, "");
                this.modleTempId = Number(t)
            }
        }
        ,
        t.prototype.buyBS_PropBack = function() {
            MallWnd.getInstance.onH(),
                this.setWWCanTouch(!1),
                this.changeWWModle(2, this.modleTempId),
                this.modleTempId = void 0
        }
        ,
        t.prototype.changeWWModle = function(e, t) {
            if (1 == e)
                this._mDecTWW = !1,
                    this._mTimeSpeedWW = 0,
                    this._mChangeId = void 0,
                    this.changeModleMC(void 0),
                    this.changeWWPrice(this._mPriceType, !1),
                    BackRowModle.getInstance.changeModleMC(void 0),
                    BackRowModle.getInstance.changeWWPrice1(this._mPriceType, void 0, !1);
            else if (2 == e) {
                if (this._mDecTWW)
                    return;
                SkillTimer.getInstance.showTime(SkillTimer.TYPE_WWBS, 6e4),
                    this._mDecTWW = !0,
                    this._mTimeSpeedWW = 6e4,
                    this._mChangeId = t,
                    this.changeModleMC(t),
                    this.changeWWPrice1(t, !1),
                    BackRowModle.getInstance.changeModleMC(t),
                    BackRowModle.getInstance.changeWWPrice1(this._mPriceType, t, !1)
            }
        }
        ,
        t.prototype.getTimeSpeedWW = function() {
            return this._mTimeSpeedWW
        }
        ,
        t.prototype.getTimeSpeed = function() {
            return this._mTimeSpeed
        }
        ,
        t.prototype.getChangeId = function() {
            return this._mChangeId
        }
        ,
        t.prototype.getPriceType = function() {
            return this._mPriceType
        }
        ,
        t.prototype.changeModleMC = function(e) {
            for (var i, n = 1; n <= this._mModleNum; n++)
                if (this._mModleMCMap.GhasKey("modleMC" + n))
                    if (i = this._mModleMCMap.Gget("modleMC" + n),
                        void 0 != e)
                        i.playChangeWWMC("modleMC" + e);
                    else {
                        var s = n % 6 == 0 ? 6 : n % 6
                            , o = "modleMC" + t._mModleIdList[s - 1];
                        i.playChangeWWMC(o)
                    }
        }
        ,
        t.prototype.changeWWPrice = function(e, i) {
            var n;
            this._mPriceType = e;
            for (var s = 1; s <= this._mModleNum; s++)
                if (this._mModleMCMap.GhasKey("modleMC" + s)) {
                    n = this._mModleMCMap.Gget("modleMC" + s),
                        n.changeWW(this._mPriceType, i);
                    var o = PriceRangeData.getInstance.getPrice(e, s);
                    PriceRangeData.getInstance.isMysteriousM(this._mPriceType, o) ? (n.setMoneyPrice(o, !0),
                        n.setMoney(-65, -65)) : (n.setMoneyPrice(o, !1),
                        n.setMoney(-35, -40))
                }
            t.getInstance.getTimeSpeedWW() > 0 && void 0 != this._mChangeId && this.changeWWPrice1(this._mChangeId, !0)
        }
        ,
        t.prototype.changeWWPrice1 = function(e, t) {
            for (var i, n = PriceRangeData.getInstance.getPrice(this._mPriceType, e + 1), s = 1; s <= this._mModleNum; s++)
                i = this._mModleMCMap.Gget("modleMC" + s),
                    i.changeWW(this._mPriceType, t),
                    PriceRangeData.getInstance.isMysteriousM(this._mPriceType, n) ? (i.setMoneyPrice(n, !0),
                        i.setMoney(-65, -65)) : (i.setMoneyPrice(n, !1),
                        i.setMoney(-35, -40))
        }
        ,
        t.prototype.isCheck = function() {
            var e = Math.floor(ClipMove.getInstance.getDownTime() * this._mSpeedMove);
            this.isisClip = !1;
            var t;
            this._mShakingRange = 1;
            for (var i = 1; i <= this._mModleNum; i++)
                if (this._mModleMCMap.GhasKey("modleMC" + i) && (t = this._mModleMCMap.Gget("modleMC" + i),
                    t.x >= this._mRange[0] - e && t.x <= this._mRange[1] - e)) {
                    t.x >= this._mShackRange1[0] - e && t.x <= this._mShackRange1[1] - e ? this._mShakingRange = 1 : t.x >= this._mShackRange2[0] - e && t.x <= this._mShackRange2[1] - e ? this._mShakingRange = 2 : this._mShakingRange = 3,
                        ClipMove.getInstance._mShakingRange = this._mShakingRange,
                        this._mModleType = i,
                        this.isisClip = !0;
                    break
                }
            0 == this.isisClip ? this.reqServer(0) : 1 == this.isisClip && this.reqServer(1)
        }
        ,
        t.prototype.isClip = function() {
            this._mIsStop = !1,
                this._mFlood = !0
        }
        ,
        t.prototype.reqServer = function(e) {
            egret.Tween.removeTweens(this);
            var t = egret.Tween.get(this);
            t.wait(2e3),
                t.call(this.playLoadingMC, this),
                this._mIsBack = !1,
                HTTPRequest.getInstance.jwwRequest(PriceRangeData.getInstance.getPriceSpend(this._mPriceType, this._mModleType), PriceRangeData.getInstance.getPrice(this._mPriceType, this._mModleType), e)
        }
        ,
        t.prototype.playLoadingMC = function() {
            0 == this._mIsBack && (this._mLoadingMC = GMovieMag.getInstance.GgetMovieClip("mcNetLoading"),
                this._mLoadingMC.x = .5 * GameMain.getInstance.StageWidth,
                this._mLoadingMC.y = .5 * GameMain.getInstance.StageHeight,
                this._mGroupMC.addChild(this._mLoadingMC))
        }
        ,
        t.prototype.reqServerBack = function(e) {
            this._mServerResult = e
        }
        ,
        t.prototype.playSuccess = function(e) {
            this._mIsBack = !0,
                this.cleanLoadingMC(),
                this._mIsStop = !0,
                ClipMove.getInstance.cliUp();
            var t;
            if (ClipMove.getInstance.isShak = !0,
                1 == e || 0 == e)
                this.isSuccess = !1,
                    this.isisClip = !1,
                    WorldWnd.getInstance.freshTimes();
            else if (2 == e) {
                1 != this._mShakingRange && ClipMove.getInstance.playClipMC11(),
                    this._mDropRand = Math.floor(105 * Math.random() + 275),
                    this.isSuccess = !1;
                for (var i = 1; i <= this._mModleNum; i++)
                    if (this._mModleMCMap.GhasKey("modleMC" + i) && i == this._mModleType) {
                        t = this._mModleMCMap.Gget("modleMC" + i);
                        var n = egret.Tween.get(t._mGroupMC);
                        n.to({
                            alpha: 0
                        }, 100)
                    }
                this.wwClip()
            } else if (3 == e) {
                1 != this._mShakingRange && ClipMove.getInstance.playClipMC11(),
                    ClipMove.getInstance.isShak = !1,
                    this.isSuccess = !0;
                for (var i = 1; i <= this._mModleNum; i++)
                    if (this._mModleMCMap.GhasKey("modleMC" + i) && i == this._mModleType) {
                        t = this._mModleMCMap.Gget("modleMC" + i);
                        var n = egret.Tween.get(t._mGroupMC);
                        n.to({
                            alpha: 0
                        }, 100)
                    }
                this.wwClip()
            }
            0 == this.isisClip ? (TipUI.getInstance._mTipNum = 1,
                TipUI.getInstance.show(),
                this.setFinish(!0),
                ClipMove.getInstance.changeUpSpeed()) : 1 == this.isisClip && (SoundMgr.getInstance.play(SoundMgr.SOUND_GET, 1),
                    this.setFinish(!1))
        }
        ,
        t.prototype.wwClip = function() {
            this._mClipModle = WWModle.getWWModle(),
                1 == this._mDecTWW && void 0 != this._mChangeId ? this._mClipModle.showData(this.getClipModleName(), PriceRangeData.getInstance.getPrice(this._mPriceType, this._mChangeId + 1), null) : this._mClipModle.showData(this.getClipModleName(), PriceRangeData.getInstance.getPrice(this._mPriceType, this._mModleType), null),
                this._mClipModle.setMoney(-35, -40),
                this._mClipModle.x = 276,
                this._mClipModle.y = 613,
                this._mGroupMC.addChild(this._mClipModle)
        }
        ,
        t.prototype.getClipModleName = function() {
            var e = this._mModleType % 6 == 0 ? 6 : this._mModleType % 6;
            1 == this._mDecTWW && void 0 != this._mChangeId && (e = this._mChangeId + 1);
            var i = "modleClipMC" + t._mModleIdList[e - 1] + "_" + this._mShakingRange;
            return i
        }
        ,
        t.prototype.modleClip = function(e, t) {
            1 == this.isisClip && void 0 != this._mClipModle && (this._mClipModle.y -= e,
                0 == this.isSuccess && this._mClipModle.y <= this._mDropRand && 0 == t ? (1 != this._mShakingRange && ClipMove.getInstance.stopClipMC11(),
                    ClipMove.getInstance.changeUpSpeed(),
                    this.dropWW(),
                    this.isisClip = !1) : 1 == this.isSuccess && 1 == t && Success.getInstance.show())
        }
        ,
        t.prototype.dropWW = function() {
            SoundMgr.getInstance.play(SoundMgr.SOUND_DROP, 1);
            var e = this._mModleType % 6 == 0 ? 6 : this._mModleType % 6;
            1 == this._mDecTWW && void 0 != this._mChangeId && (e = this._mChangeId + 1),
                this._mModleDropMC = GMovieMag.getInstance.GgetMovieClip("modleDropMC" + t._mModleIdList[e - 1]),
                this._mModleDropMC.x = this._mClipModle.x,
                this._mModleDropMC.y = this._mClipModle.y,
                this._mModleDropMC.scaleX = .85,
                this._mModleDropMC.scaleY = .85,
                WorldWnd.getInstance.groupBg.addChildAt(this._mModleDropMC, 2),
                this.cleanClipWW();
            var i = egret.Tween.get(this._mModleDropMC);
            i.to({
                y: 780
            }, 400),
                i.call(this.modleBreak, this)
        }
        ,
        t.prototype.modleBreak = function() {
            egret.Tween.removeTweens(this._mModleDropMC),
                TipUI.getInstance._mTipNum = Math.floor(3 * Math.random() + 2),
                TipUI.getInstance.show(),
                Fail.getInstance.redEnvelopes(),
            void 0 != this._mModleDropMC && (this._mModleBreakMC = GMovieMag.getInstance.GgetMovieClip("modleBreakMC", void 0, void 0, !1),
                this._mModleBreakMC.x = this._mModleDropMC.x,
                this._mModleBreakMC.y = this._mModleDropMC.y - 160,
                WorldWnd.getInstance.groupBg.addChildAt(this._mModleBreakMC, 2),
                this._mModleBreakMC.addEventListener(GMovieClipEvent.played, this.cleanBreakWW, this),
                this.cleanDropWW())
        }
        ,
        t.prototype.cleanBreakWW = function() {
            void 0 != this._mModleBreakMC && (this._mModleBreakMC.removeEventListener(GMovieClipEvent.played, this.cleanBreakWW, this),
                GObjPool.getInstance.Gadd2Pool(this._mModleBreakMC),
            void 0 != this._mModleBreakMC.parent && this._mModleBreakMC.parent.removeChild(this._mModleBreakMC),
                delete this._mModleBreakMC)
        }
        ,
        t.prototype.cleanClipWW = function() {
            void 0 != this._mClipModle && (this._mClipModle.hide(),
                GObjPool.getInstance.Gadd2Pool(this._mClipModle),
                this._mClipModle = null)
        }
        ,
        t.prototype.cleanDropWW = function() {
            void 0 != this._mModleDropMC && (this._mModleDropMC.scaleX = 1,
                this._mModleDropMC.scaleY = 1,
                GObjPool.getInstance.Gadd2Pool(this._mModleDropMC),
            void 0 != this._mModleDropMC.parent && this._mModleDropMC.parent.removeChild(this._mModleDropMC),
                delete this._mModleDropMC)
        }
        ,
        t.prototype.cleanLoadingMC = function() {
            void 0 != this._mLoadingMC && (GObjPool.getInstance.Gadd2Pool(this._mLoadingMC),
            void 0 != this._mLoadingMC.parent && this._mLoadingMC.parent.removeChild(this._mLoadingMC),
                delete this._mLoadingMC)
        }
        ,
        t.prototype.changeSpeedMove = function(e) {
            if (1 == e)
                this._mSpeedMove = 3,
                    this._mDecT = !1,
                    this._mTimeSpeed = 0;
            else if (2 == e) {
                if (this._mDecT)
                    return;
                SkillTimer.getInstance.showTime(SkillTimer.TYPE_WWJS, 60),
                    this._mSpeedMove = 1.5,
                    this._mDecT = !0,
                    this._mTimeSpeed = 6e4
            }
            BackRowModle.getInstance.changeSpeedMove(e)
        }
        ,
        t.prototype.update = function(e) {
            if (this._mDecTWW && (this._mTimeSpeedWW -= e,
                    SkillTimer.getInstance.updateType(SkillTimer.TYPE_WWBS, Math.floor(this._mTimeSpeedWW / 1e3)),
                this._mTimeSpeedWW <= 500 && (SkillTimer.getInstance.hideTime(SkillTimer.TYPE_WWBS),
                    this.changeWWModle(1, void 0))),
                this._mDecT && (this._mTimeSpeed -= e,
                    SkillTimer.getInstance.updateType(SkillTimer.TYPE_WWJS, Math.floor(this._mTimeSpeed / 1e3)),
                this._mTimeSpeed <= 500 && (SkillTimer.getInstance.hideTime(SkillTimer.TYPE_WWJS),
                    this.changeSpeedMove(1))),
                0 != this._mServerResult && 1 == this._mFlood && (this.playSuccess(this._mServerResult),
                    this._mServerResult = 0,
                    this._mFlood = !1),
                0 != this._mIsStop) {
                for (var t, i = 1; i <= this._mModleNum; i++)
                    this._mModleMCMap.GhasKey("modleMC" + i) && (t = this._mModleMCMap.Gget("modleMC" + i),
                        t.x += this._mSpeedMove,
                    t.x >= this._mInitialPos + this._mSpacing * (this._mModleNum - 1) && (t._mGroupMC.alpha = 1,
                        t.x = this._mInitialPos - this._mSpacing));
                if (void 0 != this._mClipModle) {
                    var n = PriceRangeData.getInstance.getPrice(this._mPriceType, this._mModleType);
                    1 == this._mDecTWW && void 0 != this._mChangeId && (n = PriceRangeData.getInstance.getPrice(this._mPriceType, this._mChangeId + 1)),
                        PriceRangeData.getInstance.isMysteriousM(this._mPriceType, n) ? this._mClipModle.changeHongBao(n, this._mPriceType, !0) : this._mClipModle.changeHongBao(n, this._mPriceType, !1)
                }
            }
        }
        ,
        t.prototype.hide = function() {
            for (var e, t = 1; t <= this._mModleNum; t++)
                this._mModleMCMap.GhasKey("modleMC" + t) && (e = this._mModleMCMap.GremoveByKey("modleMC" + t),
                    e.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchWW, this),
                    e.alpha = 1,
                    e.hide(),
                    GObjPool.getInstance.Gadd2Pool(e),
                    e = null);
            Fail.getInstance.hide(),
                Success.getInstance.hide(),
                this.cleanClipWW(),
                this.cleanDropWW(),
                this.cleanBreakWW(),
                this.cleanLoadingMC(),
                HongBaoUI.getInstance.hide(),
                SmallProfitUI.getInstance.hide()
        }
        ,
        t
}(MDisplay.MUISprite);
ModleMove._mModleIdList = [1, 1, 2, 3, 4, 5],
    __reflect(ModleMove.prototype, "ModleMove");
var Success = function() {
    function e() {
        this._mHeiBG = new egret.Bitmap,
            this._mGroup = GUIManager.getInstance.topLay,
            this._mHongBaoText = FontMgr.getText(FontMgr.FONT_2),
            this._mHongBaoText.letterSpacing = -2,
            this._mHongBaoText.width = 500,
            this._mHongBaoText.textAlign = egret.HorizontalAlign.CENTER
    }
    return Object.defineProperty(e, "getInstance", {
        get: function() {
            return void 0 == e._mInstance && (e._mInstance = new e),
                e._mInstance
        },
        enumerable: !0,
        configurable: !0
    }),
        e.prototype.show = function() {
            this.shadowMC()
        }
        ,
        e.prototype.shadowMC = function() {
            this._mHeiBG.$setBitmapData(GResCache.getRes("resource/assets/images/ui/heise.png")),
                this._mHeiBG.x = 0,
                this._mHeiBG.y = 0,
                this._mGroup.addChild(this._mHeiBG),
                this._mHeiBG.alpha = 0,
                this._mHeiBG.touchEnabled = !0;
            var e = egret.Tween.get(this._mHeiBG);
            1 == ClipMove.getInstance.isAccClipSpeed() ? e.to({
                alpha: .5
            }, 100) : e.to({
                alpha: .5
            }, 300),
                e.call(this.begin, this)
        }
        ,
        e.prototype.begin = function() {
            ModleMove.getInstance.cleanClipWW(),
                SoundMgr.getInstance.play(SoundMgr.SOUND_SALUTE, 1),
                this._mBurstOpenMC = GMovieMag.getInstance.GgetMovieClip("burstOpenMC", void 0, void 0, !1),
                this._mBurstOpenMC.x = 270,
                this._mBurstOpenMC.y = 159.5,
                this._mGroup.addChild(this._mBurstOpenMC);
            var e = egret.Tween.get(this);
            1 == ClipMove.getInstance.isAccClipSpeed() ? e.wait(200) : e.wait(500),
                e.call(this.successBack, this)
        }
        ,
        e.prototype.successBack = function() {
            SoundMgr.getInstance.play(SoundMgr.SOUND_ZHONGJ, 1);
            var e = "successBackMC"
                , t = 1;
            1 == ClipMove.getInstance.isAccClipSpeed() && (e = "successBackMC3",
                t = .3),
                this.successBackMC = GMovieMag.getInstance.GgetMovieClip(e, void 0, void 0, !1),
                this.successBackMC.x = 270,
                this.successBackMC.y = 417.1,
                this._mGroup.addChild(this.successBackMC),
                this.playStarMC();
            var i = egret.Tween.get(this);
            i.wait(2300 * t),
                i.call(this.setMoneyPrice, this);
            var n = egret.Tween.get(this);
            n.wait(2600 * t),
                n.call(this.playContinueBnt, this);
            var s = egret.Tween.get(this);
            s.wait(1700 * t),
                s.call(this.playSmallProfit, this)
        }
        ,
        e.prototype.playSmallProfit = function() {
            SoundMgr.getInstance.play(SoundMgr.SOUND_PROFIT, 1)
        }
        ,
        e.prototype.playContinueBnt = function() {
            this._mContinueBntMC = GMovieMag.getInstance.GgetMovieClip("continueBntMC", void 0, void 0, !1),
                this._mContinueBntMC.x = 270,
                this._mContinueBntMC.y = 581.2,
                this._mGroup.addChild(this._mContinueBntMC),
                this._mContinueBntMC.touchEnabled = !0,
                this._mContinueBntMC.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this.playPustBnt()
        }
        ,
        e.prototype.playPustBnt = function() {}
        ,
        e.prototype.playStarMC = function() {
            this._mStarMC = GMovieMag.getInstance.GgetMovieClip("starsMC", void 0, void 0, !0),
                this._mStarMC.x = 140,
                this._mStarMC.y = 280,
                this._mGroup.addChild(this._mStarMC),
                this._mRibbonMC = GMovieMag.getInstance.GgetMovieClip("ribbonMC", void 0, void 0, !0),
                this._mRibbonMC.x = 74,
                this._mRibbonMC.y = 450,
                this._mGroup.addChild(this._mRibbonMC)
        }
        ,
        e.prototype.scaleBnt = function(e) {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
            var t = egret.Tween.get(e.target).to({
                scaleX: .85,
                scaleY: .85
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100);
            e.target == this._mContinueBntMC && t.call(this.hide, this)
        }
        ,
        e.prototype.pustWnd = function() {
            this.hide(),
                PushWnd.getInstance.show()
        }
        ,
        e.prototype.setMoneyPrice = function() {
            WorldWnd.getInstance.freshTimes(),
                this._mHongBaoText.text = GameValue.hbMoney + "元",
                this._mHongBaoText.x = 22,
                this._mHongBaoText.y = 312,
                this._mGroup.addChild(this._mHongBaoText)
        }
        ,
        e.prototype.touchBackMC = function() {
            GTimerMag.getInstance.GremoveTimerTask("successBackMC")
        }
        ,
        e.prototype.playHongBao = function() {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1),
                this.cleanSuccessBack(),
                HongBaoUI.getInstance.show(1)
        }
        ,
        e.prototype.cleanSuccessBack = function() {
            void 0 != this.successBackMC && (GObjPool.getInstance.Gadd2Pool(this.successBackMC),
            void 0 != this.successBackMC.parent && this.successBackMC.parent.removeChild(this.successBackMC),
                delete this.successBackMC)
        }
        ,
        e.prototype.cleanBurstOpenMC = function() {
            void 0 != this._mBurstOpenMC && (GObjPool.getInstance.Gadd2Pool(this._mBurstOpenMC),
            void 0 != this._mBurstOpenMC.parent && this._mBurstOpenMC.parent.removeChild(this._mBurstOpenMC),
                delete this._mBurstOpenMC)
        }
        ,
        e.prototype.cleanContinueBntMC = function() {
            void 0 != this._mContinueBntMC && (this._mContinueBntMC.anchorOffsetY = 0,
                this._mContinueBntMC.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                GObjPool.getInstance.Gadd2Pool(this._mContinueBntMC),
            void 0 != this._mContinueBntMC.parent && this._mContinueBntMC.parent.removeChild(this._mContinueBntMC),
                delete this._mContinueBntMC)
        }
        ,
        e.prototype.cleanStarMC = function() {
            void 0 != this._mStarMC && (GObjPool.getInstance.Gadd2Pool(this._mStarMC),
            void 0 != this._mStarMC.parent && this._mStarMC.parent.removeChild(this._mStarMC),
                delete this._mStarMC)
        }
        ,
        e.prototype.cleanPustBntMC = function() {}
        ,
        e.prototype.cleanRibbonMC = function() {
            void 0 != this._mRibbonMC && (GObjPool.getInstance.Gadd2Pool(this._mRibbonMC),
            void 0 != this._mRibbonMC.parent && this._mRibbonMC.parent.removeChild(this._mRibbonMC),
                delete this._mRibbonMC)
        }
        ,
        e.prototype.cleanHeiBG = function() {
            void 0 != this._mHeiBG.parent && this._mHeiBG.parent.removeChild(this._mHeiBG)
        }
        ,
        e.prototype.hide = function() {
            egret.Tween.removeTweens(this),
                GTimerMag.getInstance.GremoveTimerTask("successBackMC"),
                this.cleanSuccessBack(),
                this.cleanHeiBG(),
                this.cleanBurstOpenMC(),
                this.cleanContinueBntMC(),
                this.cleanPustBntMC(),
                this.cleanStarMC(),
                this.cleanRibbonMC(),
                ModleMove.getInstance.setFinish(!0),
            void 0 != this._mHongBaoText.parent && this._mHongBaoText.parent.removeChild(this._mHongBaoText)
        }
        ,
        e
}();
__reflect(Success.prototype, "Success");
var WWModle = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mNum = 0,
            t._mbitmapMoney = FontMgr.getText(FontMgr.FONT_1),
            t._mbitmapMoney.letterSpacing = -1,
            t._mbitmapMoney.width = 200,
            t._mbitmapMoney.textAlign = egret.HorizontalAlign.CENTER,
            t._mbitmapMoney.scaleX = .7,
            t._mbitmapMoney.scaleY = .7,
            t._mGroupMC = new egret.DisplayObjectContainer,
            t.addChild(t._mGroupMC),
            t._mYun = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/yun.png")),
            t._mYun.x = -98,
            t._mYun.y = -15,
            t.addChild(t._mYun),
            t
    }
    return __extends(t, e),
        t.getWWModle = function() {
            var e = GObjPool.getInstance.GgetObj(t);
            return null == e && (e = new t),
                e
        }
        ,
        t.prototype.showData = function(e, t, i, n, s, o) {
            this.scaleX = .85,
                this.scaleY = .85,
                this._mCallBackFun = i,
            void 0 == n && (n = !0),
                this.creatMC(e, n, s, o),
                this.setMoneyPrice(t, !1),
                this._mGroupMC.addChild(this._mbitmapMoney)
        }
        ,
        t.prototype.creatMC = function(e, t, i, n) {
            this._mMC = GMovieMag.getInstance.GgetMovieClip(e, i, n, t),
                this._mGroupMC.addChildAt(this._mMC, 0),
                this._mMC.x = 0,
                this._mMC.y = 0,
            void 0 != this._mCallBackFun && this._mMC.addEventListener(GMovieClipEvent.played, this._mCallBackFun, this);
            var s = e.split("_");
            Number(s[1]) > 0 && this._mbitmapMoney.$setVisible(!1),
                "modleMC" == e.substr(0, 7) ? this._mYun.$setVisible(!0) : this._mYun.$setVisible(!1)
        }
        ,
        t.prototype.playChangeWWMC = function(e) {
            var t = this;
            this._mChangeWWMC = GMovieMag.getInstance.GgetMovieClip("changeWWMC", void 0, void 0, !1),
                this._mGroupMC.addChild(this._mChangeWWMC),
                this._mChangeWWMC.x = 0,
                this._mChangeWWMC.y = -20,
                this._mChangeWWMC.addEventListener(GMovieClipEvent.played, this.cleanChangeWWMC, this);
            var i = egret.Tween.get(this);
            i.wait(300),
                i.call(function() {
                    t.changeWWModle(e)
                })
        }
        ,
        t.prototype.changeWWModle = function(e) {
            this.cleanMC(),
                this.creatMC(e, !0)
        }
        ,
        t.prototype.changeHongBao = function(e, t, i) {
            this._mHB = this._mMC.getChildByName("ww"),
            void 0 != this._mHB && (void 0 == WWRedNum.getInstance.parent && (WWRedNum.getInstance.setPrice(e, t, i),
                this._mGroupMC.addChild(WWRedNum.getInstance)),
                WWRedNum.getInstance.rotation = this._mHB.rotation,
                WWRedNum.getInstance.x = this._mHB.x,
                WWRedNum.getInstance.y = this._mHB.y)
        }
        ,
        t.prototype.getMC = function() {
            return this._mMC
        }
        ,
        t.prototype.setMoneyPrice = function(e, t) {
            this._mNum = e,
                1 == t ? (this._mbitmapMoney.text = "?",
                1 != this._mbitmapMoney.scaleX && (this._mbitmapMoney.scaleX = 1,
                    this._mbitmapMoney.scaleY = 1)) : (.7 != this._mbitmapMoney.scaleX && (this._mbitmapMoney.scaleX = .7,
                    this._mbitmapMoney.scaleY = .7),
                    this._mbitmapMoney.text = e + "")
        }
        ,
        t.prototype.getMoney = function() {
            return this._mbitmapMoney
        }
        ,
        t.prototype.setMoney = function(e, t) {
            this._mbitmapMoney.x = e - 36 - 21,
                this._mbitmapMoney.y = t + 7 + 5
        }
        ,
        t.prototype.changeWW = function(e, t) {
            0 == t && (this.cleanRedEffectsMC(),
                this._mRedEffectsMC = GMovieMag.getInstance.GgetMovieClip("redEffectsMC", void 0, void 0, !1),
                this._mGroupMC.addChild(this._mRedEffectsMC),
                this._mRedEffectsMC.x = 0,
                this._mRedEffectsMC.y = -30,
                this._mRedEffectsMC.addEventListener(GMovieClipEvent.played, this.cleanRedEffectsMC, this))
        }
        ,
        t.prototype.bitmapMoneyTween = function() {
            this._mbitmapMoney.anchorOffsetX = 100,
                this._mbitmapMoney.anchorOffsetY = -100,
                this._mbitmapMoney.x = 0,
                this._mbitmapMoney.y = -105,
                this._mbitmapMoney.rotation = 10;
            var e = egret.Tween.get(this._mbitmapMoney, {
                loop: !0
            });
            e.to({
                rotation: -11
            }, 230),
                e.to({
                    rotation: 10
                }, 230)
        }
        ,
        t.prototype.cleanMC = function() {
            void 0 != this._mMC && (this._mMC.scaleX = 1,
                this._mMC.scaleY = 1,
            void 0 != this._mCallBackFun && this._mMC.removeEventListener(GMovieClipEvent.played, this._mCallBackFun, this),
                GObjPool.getInstance.Gadd2Pool(this._mMC),
            void 0 != this._mMC.parent && this._mMC.parent.removeChild(this._mMC),
                delete this._mMC)
        }
        ,
        t.prototype.cleanChangeWWMC = function() {
            void 0 != this._mChangeWWMC && (this._mChangeWWMC.scaleX = 1,
                this._mChangeWWMC.scaleY = 1,
            void 0 != this._mChangeWWMC && this._mChangeWWMC.removeEventListener(GMovieClipEvent.played, this.cleanChangeWWMC, this),
                GObjPool.getInstance.Gadd2Pool(this._mChangeWWMC),
            void 0 != this._mChangeWWMC.parent && this._mChangeWWMC.parent.removeChild(this._mChangeWWMC),
                delete this._mChangeWWMC)
        }
        ,
        t.prototype.cleanRedEffectsMC = function() {
            void 0 != this._mRedEffectsMC && (this._mRedEffectsMC.removeEventListener(GMovieClipEvent.played, this.cleanRedEffectsMC, this),
                GObjPool.getInstance.Gadd2Pool(this._mRedEffectsMC),
            void 0 != this._mRedEffectsMC.parent && this._mRedEffectsMC.parent.removeChild(this._mRedEffectsMC),
                delete this._mRedEffectsMC)
        }
        ,
        t.prototype.hide = function() {
            egret.Tween.removeTweens(this._mbitmapMoney),
                this._mbitmapMoney.anchorOffsetX = 0,
                this._mbitmapMoney.anchorOffsetY = 0,
                this._mbitmapMoney.$setVisible(!0),
                this.scaleX = 1,
                this.scaleY = 1,
                this._mbitmapMoney.scaleX = .7,
                this._mbitmapMoney.scaleY = .7,
                this._mGroupMC.alpha = 1,
                this.cleanMC(),
                this.cleanChangeWWMC(),
                this.cleanRedEffectsMC(),
            void 0 != WWRedNum.getInstance.parent && WWRedNum.getInstance.parent.removeChild(WWRedNum.getInstance),
            void 0 != this.parent && this.parent.removeChild(this),
                this._mYun.$setVisible(!0)
        }
        ,
        t.prototype.clean = function() {}
        ,
        t
}(egret.DisplayObjectContainer);
__reflect(WWModle.prototype, "WWModle", ["GIObjPool"]);
var WWRedNum = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mbitmapMoney = FontMgr.getText(FontMgr.FONT_1),
            t._mbitmapMoney.letterSpacing = -1,
            t._mbitmapMoney.width = 200,
            t._mbitmapMoney.textAlign = egret.HorizontalAlign.CENTER,
            t._mbitmapMoney.scaleX = .7,
            t._mbitmapMoney.scaleY = .7,
            t.addChild(t._mbitmapMoney),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.setPrice = function(e, t, i) {
            1 == i ? (this._mbitmapMoney.text = "?",
                this.setMoney(-55, 88),
            1 != this._mbitmapMoney.scaleX && (this._mbitmapMoney.scaleX = 1,
                this._mbitmapMoney.scaleY = 1)) : (this._mbitmapMoney.text = e + "",
                this.setMoney(-25, 113),
            1 == this._mbitmapMoney.scaleX && (this._mbitmapMoney.scaleX = .7,
                this._mbitmapMoney.scaleY = .7))
        }
        ,
        t.prototype.setMoney = function(e, t) {
            this._mbitmapMoney.x = e,
                this._mbitmapMoney.y = t
        }
        ,
        t
}(egret.DisplayObjectContainer);
__reflect(WWRedNum.prototype, "WWRedNum");
var FontMgr = function() {
    function e() {}
    return e.preloadRes = function(t) {
        t.GaddItem("resource/assets/font/" + e.FONT_1 + ".fnt"),
            t.GaddItem("resource/assets/font/" + e.FONT_1 + ".png"),
            t.GaddItem("resource/assets/font/" + e.FONT_2 + ".fnt"),
            t.GaddItem("resource/assets/font/" + e.FONT_2 + ".png"),
            t.GaddItem("resource/assets/font/" + e.FONT_3 + ".fnt"),
            t.GaddItem("resource/assets/font/" + e.FONT_3 + ".png")
    }
        ,
        e.getText = function(e) {
            var t = new egret.BitmapText;
            return t.font = GResCache.getRes("resource/assets/font/" + e + ".fnt"),
                t
        }
        ,
        e
}();
FontMgr.FONT_1 = "font_1",
    FontMgr.FONT_2 = "font_2",
    FontMgr.FONT_3 = "font_3",
    __reflect(FontMgr.prototype, "FontMgr");
var SoundMgr = function() {
    function e() {}
    return Object.defineProperty(e, "getInstance", {
        get: function() {
            return void 0 == e._mInstance && (e._mInstance = new e),
                e._mInstance
        },
        enumerable: !0,
        configurable: !0
    }),
        e.preloadRes = function(t) {
            t.GaddItem(e.SOUND_CLICK),
                t.GaddItem(e.SOUND_DROP),
                t.GaddItem(e.SOUND_GET),
                t.GaddItem(e.SOUND_JIAZI),
                t.GaddItem(e.SOUND_ZHONGJ),
                t.GaddItem(e.SOUND_SALUTE),
                t.GaddItem(e.SOUND_PROFIT),
                t.GaddItem(e.SOUND_SMALL)
        }
        ,
        e.prototype.play = function(e, t, i, n) {
            var s = GResCache.getRes(e)
                , o = s.play(n, t);
            return o.volume = void 0 == i ? 1 : i,
                o
        }
        ,
        e
}();
SoundMgr.SOUND_CLICK = "resource/assets/sound/click.mp3",
    SoundMgr.SOUND_DROP = "resource/assets/sound/drop.mp3",
    SoundMgr.SOUND_GET = "resource/assets/sound/get.mp3",
    SoundMgr.SOUND_JIAZI = "resource/assets/sound/jiazi.mp3",
    SoundMgr.SOUND_ZHONGJ = "resource/assets/sound/zhongj.mp3",
    SoundMgr.SOUND_SALUTE = "resource/assets/sound/salute.mp3",
    SoundMgr.SOUND_PROFIT = "resource/assets/sound/profit.mp3",
    SoundMgr.SOUND_SMALL = "resource/assets/sound/small.mp3",
    __reflect(SoundMgr.prototype, "SoundMgr");
var GStatus;
!function(e) {
    var t = function() {
        function e() {}
        return Object.defineProperty(e, "getInstance", {
            get: function() {
                return void 0 == e._mInstance && (e._mInstance = new e),
                    e._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
            e.prototype.enterStatus = function() {}
            ,
            e.prototype.update = function(e) {}
            ,
            e.prototype.exitStatus = function() {}
            ,
            e
    }();
    e.CommonStatus = t,
        __reflect(t.prototype, "GStatus.CommonStatus", ["GIGameStatus"])
}(GStatus || (GStatus = {}));
var GStatus;
!function(e) {
    var t = function() {
        function e() {}
        return Object.defineProperty(e, "getInstance", {
            get: function() {
                return void 0 == e._mInstance && (e._mInstance = new e),
                    e._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
            e.prototype.enterStatus = function() {
                MainBettom.getInstance.show()
            }
            ,
            e.prototype.update = function(e) {
                ModleMove.getInstance.update(e),
                    BackRowModle.getInstance.update(e),
                    ClipMove.getInstance.update(e),
                    NoticeUI.getInstance.updata()
            }
            ,
            e.prototype.exitStatus = function() {
                MainBettom.getInstance.hide()
            }
            ,
            e
    }();
    e.GameStatus = t,
        __reflect(t.prototype, "GStatus.GameStatus", ["GIGameStatus"])
}(GStatus || (GStatus = {}));
var GMovieMag = function() {
    function e() {
        this._mConfigDataMap = new GHashMap,
            this._mEnterFrameItems = new GHashMap
    }
    return Object.defineProperty(e, "getInstance", {
        get: function() {
            return void 0 == e._mInstance && (e._mInstance = new e),
                e._mInstance
        },
        enumerable: !0,
        configurable: !0
    }),
        e.prototype.GonEnterFrame = function() {
            for (var e = this._mEnterFrameItems.keys, t = 0, i = e; t < i.length; t++) {
                var n = i[t]
                    , s = this._mEnterFrameItems.Gget(n);
                s.Mupdate()
            }
        }
        ,
        e.prototype.Madd2EnterFrame = function(e) {
            void 0 != e && this._mEnterFrameItems.Gput(e.hashCode, e)
        }
        ,
        e.prototype.MremoveEnterFrame = function(e) {
            void 0 != e && this._mEnterFrameItems.GremoveByKey(e.hashCode)
        }
        ,
        e.prototype.GgetMovieClip = function(e, t, i, n, s) {
            var o = this._mConfigDataMap.Gget(e);
            null == o && (o = new MDisplay.MMovieClipData,
                this._mConfigDataMap.Gput(e, o)),
                o.MloadConfig(e);
            var a = GObjPool.getInstance.GgetObj(MDisplay.MMovieClip);
            return null == a && (a = new MDisplay.MMovieClip),
                a.MsetConfigData(o, t, i, n, s),
                a
        }
        ,
        e
}();
__reflect(GMovieMag.prototype, "GMovieMag");
var Exchange = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.init(),
            t
    }
    return __extends(t, e),
        t.prototype.init = function() {
            this.itemBg = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/zq_tiao_1.png")),
                this.addChild(this.itemBg),
                this.dollDes = new egret.TextField,
                this.addChild(this.dollDes),
                this.moneyNum = new egret.TextField,
                this.addChild(this.moneyNum),
                this.bettingText = new egret.TextField,
                this.addChild(this.bettingText),
                this.dollDes.text = "110",
                this.moneyNum.text = "  100.00金币",
                this.bettingText.text = "第一名",
                this.dollDes.x = 52,
                this.dollDes.y = 25,
                this.moneyNum.x = 210,
                this.moneyNum.y = 25,
                this.bettingText.x = 245,
                this.bettingText.y = 28,
                this.moneyNum.textAlign = egret.HorizontalAlign.CENTER,
                this.moneyNum.verticalAlign = egret.VerticalAlign.MIDDLE,
                this.bettingText.textAlign = egret.HorizontalAlign.RIGHT,
                this.dollDes.width = 205,
                this.moneyNum.width = 65,
                this.bettingText.width = 205,
                this.setTextStyle(this.dollDes),
                this.setTextStyle(this.moneyNum),
                this.setTextStyle1(this.bettingText)
        }
        ,
        t.prototype.setTextStyle = function(e) {
            e.textColor = 14042624,
                e.fontFamily = "黑体",
                e.size = 20
        }
        ,
        t.prototype.setTextStyle1 = function(e) {
            e.textColor = 14042624,
                e.fontFamily = "黑体",
                e.size = 14
        }
        ,
        t.prototype.removeItem = function() {
            void 0 != this.dollDes.parent && (this.dollDes.parent.removeChild(this.dollDes),
                this.moneyNum.parent.removeChild(this.moneyNum),
                this.bettingText.parent.removeChild(this.bettingText),
                this.itemBg.parent.removeChild(this.itemBg)),
            void 0 != this.parent && this.parent.removeChild(this)
        }
        ,
        Object.defineProperty(t.prototype, "setExchangeMoney", {
            set: function(e) {
                this.dollDes.text = e
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "setExchangeState", {
            set: function(e) {
                this.moneyNum.text = e
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "setExchangeTime", {
            set: function(e) {
                this.bettingText.text = e
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.setBitmap = function() {
            this.itemBg.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zq_tiao_2.png"))
        }
        ,
        t
}(egret.DisplayObjectContainer);
__reflect(Exchange.prototype, "Exchange");
var MoneyMgr = function() {
    function e() {
        this.mWinMap = new GHashMap,
            this.mMonMap = new GHashMap,
            this.mRanKing = new GHashMap,
            this.mExchange = new GHashMap,
            this.todayRanKing = new GHashMap,
            this.yesData = new GHashMap
    }
    return Object.defineProperty(e, "getInstance", {
        get: function() {
            return void 0 == this.mInstance && (this.mInstance = new e),
                this.mInstance
        },
        enumerable: !0,
        configurable: !0
    }),
        e.prototype.putWinMoney = function(e, t) {
            this.mWinMap.Gput(e, t)
        }
        ,
        e.prototype.getWinMoney = function(e) {
            return this.mWinMap.GhasKey(e) ? this.mWinMap.Gget(e) : null
        }
        ,
        Object.defineProperty(e.prototype, "winSize", {
            get: function() {
                return this.mWinMap.size
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.putMoney = function(e, t) {
            this.mMonMap.Gput(e, t)
        }
        ,
        e.prototype.getMoney = function(e) {
            return this.mMonMap.GhasKey(e) ? this.mMonMap.Gget(e) : null
        }
        ,
        Object.defineProperty(e.prototype, "MonSize", {
            get: function() {
                return this.mMonMap.size
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.putRanKing = function(e, t) {
            this.mRanKing.Gput(e, t)
        }
        ,
        e.prototype.getRanKing = function(e) {
            return this.mRanKing.GhasKey(e) ? this.mRanKing.Gget(e) : null
        }
        ,
        Object.defineProperty(e.prototype, "ranSize", {
            get: function() {
                return this.mRanKing.size
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.putExchange = function(e, t) {
            this.mExchange.Gput(e, t)
        }
        ,
        e.prototype.getExchange = function(e) {
            return this.mExchange.GhasKey(e) ? this.mExchange.Gget(e) : null
        }
        ,
        Object.defineProperty(e.prototype, "exchangeSize", {
            get: function() {
                return this.mExchange.size
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.putTodayRanData = function(e, t) {
            this.todayRanKing.Gput(e, t)
        }
        ,
        e.prototype.getTodayRanData = function(e) {
            return this.todayRanKing.GhasKey(e) ? this.todayRanKing.Gget(e) : null
        }
        ,
        Object.defineProperty(e.prototype, "todayRanSize", {
            get: function() {
                return this.todayRanKing.size
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.putYesdayRanData = function(e, t) {
            this.yesData.Gput(e, t)
        }
        ,
        e.prototype.getYesdayRanData = function(e) {
            return this.yesData.GhasKey(e) ? this.yesData.Gget(e) : null
        }
        ,
        Object.defineProperty(e.prototype, "yesdayRanSize", {
            get: function() {
                return this.yesData.size
            },
            enumerable: !0,
            configurable: !0
        }),
        e
}();
MoneyMgr.mNoJsMon = "0",
    MoneyMgr.mExchangeAdd = 0,
    __reflect(MoneyMgr.prototype, "MoneyMgr");
var WinData = function() {
    function e() {}
    return e
}();
__reflect(WinData.prototype, "WinData");
var CurrMoneyData = function() {
    function e() {}
    return e
}();
__reflect(CurrMoneyData.prototype, "CurrMoneyData");
var RanKingData = function() {
    function e() {}
    return e
}();
__reflect(RanKingData.prototype, "RanKingData");
var ExchangeData = function() {
    function e() {}
    return e
}();
__reflect(ExchangeData.prototype, "ExchangeData");
var TodayRanData = function() {
    function e() {}
    return e
}();
__reflect(TodayRanData.prototype, "TodayRanData");
var YesdayRanData = function() {
    function e() {}
    return e
}();
__reflect(YesdayRanData.prototype, "YesdayRanData");
var MoneyRecord = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.money = 0,
            t.init(),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == this.mInstance && (this.mInstance = new t),
                    this.mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.init = function() {
            this.addMoney = new egret.TextField,
                this.addChild(this.addMoney),
                this.addMoney.text = "累计佣金\n 1111金币",
                this.addMoney.fontFamily = "微软雅黑",
                this.addMoney.x = 180,
                this.addMoney.y = 1,
                this.setTextStyle(this.addMoney),
                this.exchangeMoney = new egret.TextField,
                this.addChild(this.exchangeMoney),
                this.exchangeMoney.text = "1000",
                this.exchangeMoney.fontFamily = "微软雅黑",
                this.exchangeMoney.x = 180,
                this.exchangeMoney.y = 40,
                this.exchangeMoney.size = 30,
                this.setTextStyle(this.exchangeMoney),
                this.exchangeBimap = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/btn_tx.png")),
                this.addChild(this.exchangeBimap),
                this.exchangeBimap.x = 155,
                this.exchangeBimap.y = 74,
                this.exchangeBimap.anchorOffsetX = this.exchangeBimap.width / 2,
                this.exchangeBimap.anchorOffsetY = this.exchangeBimap.height / 2,
                this.exchangeBimap.x = 155 + this.exchangeBimap.width / 2,
                this.exchangeBimap.y = 74 + this.exchangeBimap.height / 2,
                this.exchangeBimap.touchEnabled = !0,
                this.exchangeBimap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnChickQCode, this),
                this.mMonArr = new GHashMap,
                this.mDateArr = new GHashMap,
                this.addScroll()
        }
        ,
        t.prototype.OnChickQCode = function(e) {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
            var t = egret.Tween.get(e.target);
            t.to({
                scaleX: .95,
                scaleY: .95
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100),
            this.exchangeBimap == e.target && t.call(this.CallBack, this)
        }
        ,
        t.prototype.CallBack = function() {
            egret.Tween.removeTweens(this.exchangeBimap),
                this.exchangeBimap.touchEnabled = !0,
                this.autoPush()
        }
        ,
        t.prototype.autoPush = function() {
            this.money = 0,
                GameValue.commissionGold < 1 ? this.money = 0 : GameValue.commissionGold > 1e3 ? this.money = 1e3 : this.money = Math.floor(GameValue.commissionGold),
            this.money > 0 && HTTPRequest.getInstance.pushYJRequest(this.money),
                FakeMallWnd.getInstance.show()
        }
        ,
        t.prototype.setTextStyle = function(e) {
            e.size = 20,
                e.textColor = 14042624,
                e.width = 230,
                e.textAlign = egret.HorizontalAlign.CENTER,
                e.lineSpacing = 15
        }
        ,
        t.prototype.addScroll = function() {
            this.mMonCon = new egret.DisplayObjectContainer,
                this.addChild(this.mMonCon),
                this.scrollView = new egret.ScrollView,
                this.scrollView.y = 160,
                this.scrollView.setContent(this.mMonCon),
                this.scrollView.bounces = !0,
                this.scrollView.verticalScrollPolicy = "on",
                this.scrollView.width = 490,
                this.scrollView.height = 435,
                this.addChild(this.scrollView)
        }
        ,
        t.prototype.updataMoney = function() {
            for (var e, t, i, n = 0; n < MoneyMgr.getInstance.MonSize; n++) {
                var s = MoneyMgr.getInstance.getMoney(n + 1);
                i = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/zq_tiao_" + (n % 2 == 0 ? 1 : 2) + ".png")),
                    this.mMonCon.addChild(i),
                    i.x = 12,
                    i.y = 48 * n + 12,
                    e = new egret.TextField,
                    e.fontFamily = "微软雅黑",
                    e.width = 235,
                    e.height = 40,
                    e.size = 18,
                    e.wordWrap = !0,
                    e.text = s.mGetMon + "金币",
                    e.textAlign = egret.HorizontalAlign.CENTER,
                    e.verticalAlign = egret.VerticalAlign.MIDDLE,
                    e.y = 48 * n + 19,
                    e.textColor = 14042624,
                    this.mMonCon.addChild(e),
                    this.mMonArr.Gput(n, e);
                var o = new Date(1e3 * s.mTime)
                    , a = o.getFullYear() + "-" + this.getNumberDate(o.getMonth() + 1) + "-" + this.getNumberDate(o.getDate()) + " " + this.getNumberDate(o.getHours()) + ":" + this.getNumberDate(o.getMinutes());
                t = new egret.TextField,
                    t.fontFamily = "微软雅黑",
                    t.width = 235,
                    t.height = 40,
                    t.size = 18,
                    t.wordWrap = !0,
                    t.text = a,
                    t.textAlign = egret.HorizontalAlign.CENTER,
                    t.verticalAlign = egret.VerticalAlign.MIDDLE,
                    t.x = 245,
                    t.y = 48 * n + 19,
                    t.textColor = 14042624,
                    this.mMonCon.addChild(t),
                    this.mDateArr.Gput(n, t)
            }
        }
        ,
        t.prototype.getNumberDate = function(e) {
            var t;
            return 10 > e ? t = "0" + e : e
        }
        ,
        t.prototype.removeRecord = function() {
            for (var e = 0; e < MoneyMgr.getInstance.MonSize; e++)
                null != this.mMonArr.Gget(e) && this.mMonCon.removeChild(this.mMonArr.Gget(e)),
                null != this.mDateArr.Gget(e) && this.mMonCon.removeChild(this.mDateArr.Gget(e));
            this.scrollView.setScrollTop(0)
        }
        ,
        Object.defineProperty(t.prototype, "setAddMoneyText", {
            set: function(e) {
                this.addMoney.text = e,
                    this.addMoney.size = 30
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.setexchangeMoney = function(e) {
            this.exchangeMoney.text = e,
                this.exchangeMoney.size = 30
        }
        ,
        Object.defineProperty(t.prototype, "setNoJsMoneyText", {
            set: function(e) {},
            enumerable: !0,
            configurable: !0
        }),
        t
}(egret.DisplayObjectContainer);
__reflect(MoneyRecord.prototype, "MoneyRecord");
var RanKing = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.init(),
            t
    }
    return __extends(t, e),
        t.prototype.init = function() {
            this.itemBg = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/zq_tiao_1.png")),
                this.addChild(this.itemBg),
                this.dollDes = new egret.TextField,
                this.addChild(this.dollDes),
                this.moneyNum = new egret.TextField,
                this.addChild(this.moneyNum),
                this.bettingText = new egret.TextField,
                this.addChild(this.bettingText),
                this.dollDes.text = "110",
                this.moneyNum.text = "100.00金币",
                this.bettingText.text = "第一名",
                this.dollDes.x = 55,
                this.dollDes.y = 25,
                this.moneyNum.x = 75,
                this.moneyNum.y = 25,
                this.bettingText.x = 205,
                this.bettingText.y = 25,
                this.moneyNum.textAlign = egret.HorizontalAlign.RIGHT,
                this.bettingText.textAlign = egret.HorizontalAlign.RIGHT,
                this.dollDes.width = 205,
                this.moneyNum.width = 205,
                this.bettingText.width = 205,
                this.setTextStyle(this.dollDes),
                this.setTextStyle(this.moneyNum),
                this.setTextStyle(this.bettingText)
        }
        ,
        t.prototype.setTextStyle = function(e) {
            e.textColor = 14042624,
                e.fontFamily = "黑体",
                e.size = 20
        }
        ,
        t.prototype.removeItem = function() {
            void 0 != this.dollDes.parent && (this.dollDes.parent.removeChild(this.dollDes),
                this.moneyNum.parent.removeChild(this.moneyNum),
                this.bettingText.parent.removeChild(this.bettingText),
                this.itemBg.parent.removeChild(this.itemBg)),
            void 0 != this.parent && this.parent.removeChild(this)
        }
        ,
        Object.defineProperty(t.prototype, "setUserIdText", {
            set: function(e) {
                this.dollDes.text = e
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "setMoneyText", {
            set: function(e) {
                this.moneyNum.text = e
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "setRankingText", {
            set: function(e) {
                this.bettingText.text = e
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.setBitmap = function() {
            this.itemBg.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zq_tiao_2.png"))
        }
        ,
        t
}(egret.DisplayObjectContainer);
__reflect(RanKing.prototype, "RanKing");
var WinRecordItem = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.init(),
            t
    }
    return __extends(t, e),
        t.prototype.init = function() {
            this.itemBg = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/zq_tiao_1.png")),
                this.addChild(this.itemBg),
                this.dollDes = new egret.TextField,
                this.addChild(this.dollDes),
                this.dDate = new egret.TextField,
                this.addChild(this.dDate),
                this.moneyNum = new egret.TextField,
                this.addChild(this.moneyNum),
                this.bettingText = new egret.TextField,
                this.addChild(this.bettingText),
                this.dollDes.text = "100金币娃娃",
                this.dDate.text = "2017-02-02 15:30",
                this.moneyNum.text = "100.00金币",
                this.bettingText.text = "投注5金币",
                this.dollDes.x = 12,
                this.dollDes.y = 10,
                this.dDate.x = 12,
                this.dDate.y = 37,
                this.moneyNum.x = 237,
                this.moneyNum.y = 10,
                this.bettingText.x = 237,
                this.bettingText.y = 37,
                this.moneyNum.textAlign = egret.HorizontalAlign.RIGHT,
                this.bettingText.textAlign = egret.HorizontalAlign.RIGHT,
                this.dollDes.width = 205,
                this.dDate.width = 205,
                this.moneyNum.width = 205,
                this.bettingText.width = 205,
                this.setTextStyle(this.dollDes),
                this.setTextStyle(this.dDate),
                this.setTextStyle(this.moneyNum),
                this.setTextStyle(this.bettingText)
        }
        ,
        t.prototype.setTextStyle = function(e) {
            e.textColor = 14042624,
                e.fontFamily = "黑体",
                e.size = 20
        }
        ,
        t.prototype.removeItem = function() {
            void 0 != this.dollDes.parent && (this.dollDes.parent.removeChild(this.dollDes),
                this.dDate.parent.removeChild(this.dDate),
                this.moneyNum.parent.removeChild(this.moneyNum),
                this.bettingText.parent.removeChild(this.bettingText),
                this.itemBg.parent.removeChild(this.itemBg)),
            void 0 != this.parent && this.parent.removeChild(this)
        }
        ,
        Object.defineProperty(t.prototype, "setDollDesText", {
            set: function(e) {
                this.dollDes.text = e
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "setDateText", {
            set: function(e) {
                this.dDate.text = e
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "setMoneyText", {
            set: function(e) {
                this.moneyNum.text = e
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "setBettingText", {
            set: function(e) {
                this.bettingText.text = e
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.setBitmap = function() {
            this.itemBg.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zq_tiao_2.png"))
        }
        ,
        t
}(egret.DisplayObjectContainer);
__reflect(WinRecordItem.prototype, "WinRecordItem");
var EveryDayRanKing = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.GWndConfig("everydayRan", GUIManager.getInstance.bgLay, MDisplay.WndShowType.ALPHA),
            HTTPRequest.getInstance.dailyRanking_YT(),
            HTTPRequest.getInstance.dailyRankingTime(),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == this.mInstance && (this.mInstance = new t),
                    this.mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.show = function() {
            e.prototype.show.call(this),
                this.updataInfo(1)
        }
        ,
        t.prototype.onInit = function() {
            e.prototype.onInit.call(this),
                this.touchEnabled = !0,
                this.btnToday = this.getChildByName("btnToday"),
                this.btnYesterday = this.getChildByName("btnYesterday"),
                this.btnClose = this.getChildByName("btnClose"),
                this.btnClose.anchorOffsetX = this.btnClose.width / 2,
                this.btnClose.anchorOffsetY = this.btnClose.height / 2,
                this.btnClose.x = 482 + this.btnClose.width / 2,
                this.btnClose.y = 114.95 + this.btnClose.height / 2,
                this.todayTitle = this.getChildByName("todayTitle"),
                this.todayBg = this.getChildByName("todayBg"),
                this.todayText = this.getChildByName("todayText"),
                this.yesterdayText = this.getChildByName("yesterdayText"),
                this.btnToday.touchEnabled = !0,
                this.btnYesterday.touchEnabled = !0,
                this.btnClose.touchEnabled = !0,
                this.btnToday.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this),
                this.btnYesterday.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this),
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this)
        }
        ,
        t.prototype.onTouch = function(e) {
            if (SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1),
                    e.target.touchEnabled = !1,
                e.target == this.btnToday)
                this.updataInfo(1);
            else if (e.target == this.btnYesterday)
                this.updataInfo(2);
            else if (e.target == this.btnClose) {
                var t = egret.Tween.get(this.btnClose);
                t.to({
                    scaleX: .95,
                    scaleY: .95
                }, 100).to({
                    scaleX: 1,
                    scaleY: 1
                }, 100),
                    t.call(this.CallBack, this)
            }
        }
        ,
        t.prototype.CallBack = function() {
            egret.Tween.removeTweens(this.btnClose),
                t.getInstance.hide(),
                this.btnClose.touchEnabled = !0
        }
        ,
        t.prototype.updataInfo = function(e) {
            1 == e ? (this.btnToday.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zq_btn2.png")),
                this.btnYesterday.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zq_btn1.png")),
                this.todayTitle.$setBitmapData(GResCache.getRes("resource/assets/images/ui/mrph_jinri_2.png")),
                this.todayBg.$setBitmapData(GResCache.getRes("resource/assets/images/ui/mrph_jinri_di.png")),
                this.showRanKingData(),
                this.hideYesterdaData(),
                this.btnToday.touchEnabled = !0,
                this.todayText.y = 137,
                this.yesterdayText.y = 135) : 2 == e && (this.btnToday.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zq_btn1.png")),
                    this.btnYesterday.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zq_btn2.png")),
                    this.todayTitle.$setBitmapData(GResCache.getRes("resource/assets/images/ui/mrph_zuori_2.png")),
                    this.todayBg.$setBitmapData(GResCache.getRes("resource/assets/images/ui/mrph_zuori_di.png")),
                    this.hideRanKingData(),
                    this.showYesterdayData(),
                    this.btnYesterday.touchEnabled = !0,
                    this.todayText.y = 135,
                    this.yesterdayText.y = 137)
        }
        ,
        t.prototype.showRanKingData = function() {
            var e = TodayRanking.getInstance;
            e.yjphData(),
                this.addChild(e)
        }
        ,
        t.prototype.showYesterdayData = function() {
            var e = YesterdayRan.getInstance;
            e.YesterdayRanData(),
                this.addChild(e)
        }
        ,
        t.prototype.hideRanKingData = function() {
            void 0 != TodayRanking.getInstance.parent && TodayRanking.getInstance.removeYjphData()
        }
        ,
        t.prototype.hideYesterdaData = function() {
            void 0 != YesterdayRan.getInstance.parent && YesterdayRan.getInstance.removeYesterdayRanData()
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this),
                this.hideRanKingData(),
                this.hideYesterdaData(),
            void 0 != this.parent && this.parent.removeChild(this)
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(EveryDayRanKing.prototype, "EveryDayRanKing");
var TodayRanking = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.removeRankingData = new GHashMap,
            t.addScroll(),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == this.mInstance && (this.mInstance = new t),
                    this.mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.yjphData = function() {
            for (var e = 0; e < MoneyMgr.getInstance.todayRanSize; e++) {
                var t = MoneyMgr.getInstance.getTodayRanData(e + 1);
                this.bgTiao = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/mrph_tiao" + (e % 2 == 0 ? 1 : 2) + ".png")),
                    this.userID = new egret.TextField,
                    this.userID.text = t.todayUser,
                    this.userID.textAlign = egret.HorizontalAlign.CENTER,
                    this.userID.verticalAlign = egret.VerticalAlign.MIDDLE,
                    this.userID.width = 100,
                    this.userID.y = 13,
                    this.userID.x = 8,
                    this.todayMoney = new egret.TextField,
                    this.todayMoney.text = Math.floor(t.todayMoney / 100) + "金币",
                    this.todayMoney.textAlign = egret.HorizontalAlign.CENTER,
                    this.todayMoney.verticalAlign = egret.VerticalAlign.MIDDLE,
                    this.todayMoney.width = 100,
                    this.todayMoney.y = 13,
                    this.todayMoney.x = 175,
                    this.ranToday = new egret.TextField,
                    this.ranToday.text = "第" + t.todayRan + "名",
                    this.ranToday.textAlign = egret.HorizontalAlign.CENTER,
                    this.ranToday.verticalAlign = egret.VerticalAlign.MIDDLE,
                    this.ranToday.width = 100,
                    this.ranToday.y = 13,
                    this.ranToday.x = 327,
                    this.setTextStyle(this.userID),
                    this.setTextStyle(this.todayMoney),
                    this.setTextStyle(this.ranToday),
                    this.ranKingMap = new egret.DisplayObjectContainer,
                    this.ranKingMap.addChild(this.bgTiao),
                    this.ranKingMap.addChild(this.todayMoney),
                    this.ranKingMap.addChild(this.userID),
                    this.ranKingMap.addChild(this.ranToday),
                    this.ranKingMap.y = 41 * e,
                    this.ranKingMapMap.addChild(this.ranKingMap),
                    this.removeRankingData.Gput(e, this.ranKingMap)
            }
        }
        ,
        t.prototype.setTextStyle = function(e) {
            e.textColor = 14042624,
                e.fontFamily = "微软雅黑",
                e.size = 20
        }
        ,
        t.prototype.addScroll = function() {
            this.ranKingMapMap = new egret.DisplayObjectContainer,
                this.addChild(this.ranKingMapMap),
                this.scrollView = new egret.ScrollView,
                this.addChild(this.scrollView),
                this.scrollView.setContent(this.ranKingMapMap),
                this.scrollView.x = 41,
                this.scrollView.y = 320,
                this.scrollView.bounces = !1,
                this.scrollView.horizontalScrollPolicy = "off",
                this.scrollView.verticalScrollPolicy = "on",
                this.scrollView.width = 540,
                this.scrollView.height = 493
        }
        ,
        t.prototype.removeYjphData = function() {
            for (var e = 0; 20 > e; e++)
                void 0 != this.removeRankingData.Gget(e) && this.ranKingMapMap.removeChild(this.removeRankingData.Gget(e));
            void 0 != this.parent && this.parent.removeChild(this),
                this.scrollView.setScrollTop(0)
        }
        ,
        t
}(egret.DisplayObjectContainer);
__reflect(TodayRanking.prototype, "TodayRanking");
var YesterdayRan = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.removeRankingData = new GHashMap,
            t.addScroll(),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == this.mInstance && (this.mInstance = new t),
                    this.mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.YesterdayRanData = function() {
            for (var e = 0; e < MoneyMgr.getInstance.yesdayRanSize; e++) {
                var t = MoneyMgr.getInstance.getYesdayRanData(e + 1);
                this.bgTiao = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/mrph_tiao" + (e % 2 == 0 ? 1 : 2) + ".png")),
                    this.userID = new egret.TextField,
                    this.userID.text = t.yesdayUser,
                    this.userID.textAlign = egret.HorizontalAlign.CENTER,
                    this.userID.verticalAlign = egret.VerticalAlign.MIDDLE,
                    this.userID.width = 100,
                    this.userID.y = 13,
                    this.userID.x = 8,
                    this.yesterdayMoney = new egret.TextField,
                    this.yesterdayMoney.text = Math.floor(t.yesdayMoney / 100) + "金币",
                    this.yesterdayMoney.textAlign = egret.HorizontalAlign.CENTER,
                    this.yesterdayMoney.verticalAlign = egret.VerticalAlign.MIDDLE,
                    this.yesterdayMoney.width = 100,
                    this.yesterdayMoney.y = 13,
                    this.yesterdayMoney.x = 175,
                    this.ranyesterday = new egret.TextField,
                    this.ranyesterday.text = "第" + t.yesdayRan + "名",
                    this.ranyesterday.textAlign = egret.HorizontalAlign.CENTER,
                    this.ranyesterday.verticalAlign = egret.VerticalAlign.MIDDLE,
                    this.ranyesterday.width = 100,
                    this.ranyesterday.y = 13,
                    this.ranyesterday.x = 327,
                    this.setTextStyle(this.userID),
                    this.setTextStyle(this.yesterdayMoney),
                    this.setTextStyle(this.ranyesterday),
                    this.ranKingMap = new egret.DisplayObjectContainer,
                    this.ranKingMap.addChild(this.bgTiao),
                    this.ranKingMap.addChild(this.yesterdayMoney),
                    this.ranKingMap.addChild(this.userID),
                    this.ranKingMap.addChild(this.ranyesterday),
                    this.ranKingMap.y = 41 * e,
                    this.ranKingMapMap.addChild(this.ranKingMap),
                    this.removeRankingData.Gput(e, this.ranKingMap)
            }
        }
        ,
        t.prototype.setTextStyle = function(e) {
            e.textColor = 14042624,
                e.fontFamily = "微软雅黑",
                e.size = 20
        }
        ,
        t.prototype.addScroll = function() {
            this.ranKingMapMap = new egret.DisplayObjectContainer,
                this.addChild(this.ranKingMapMap),
                this.scrollView = new egret.ScrollView,
                this.addChild(this.scrollView),
                this.scrollView.setContent(this.ranKingMapMap),
                this.scrollView.x = 41,
                this.scrollView.y = 320,
                this.scrollView.bounces = !1,
                this.scrollView.horizontalScrollPolicy = "off",
                this.scrollView.verticalScrollPolicy = "on",
                this.scrollView.width = 540,
                this.scrollView.height = 493
        }
        ,
        t.prototype.removeYesterdayRanData = function() {
            for (var e = 0; 20 > e; e++)
                void 0 != this.removeRankingData.Gget(e) && this.ranKingMapMap.removeChild(this.removeRankingData.Gget(e));
            void 0 != this.parent && this.parent.removeChild(this),
                this.scrollView.setScrollTop(0)
        }
        ,
        t
}(egret.DisplayObjectContainer);
__reflect(YesterdayRan.prototype, "YesterdayRan");
var FakeMallWnd = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mGroup = new egret.DisplayObjectContainer,
            t._mHeiBG = new egret.Bitmap,
            GUIManager.getInstance.tipLay.addChild(t._mGroup),
            t.GWndConfig("fakeMallWnd", GUIManager.getInstance.tipLay, MDisplay.WndShowType.SCALE),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.show = function() {
            e.prototype.show.call(this),
                this.shadowMC(),
                this.x = .5 * GameMain.getInstance.StageWidth,
                this.y = .5 * GameMain.getInstance.StageHeight - 20,
                this._mCloseBnt = this.getChildByName("closeBnt"),
                this._mCloseBnt.x = 469 + .5 * this._mCloseBnt.width,
                this._mCloseBnt.y = 97 + .5 * this._mCloseBnt.height,
                this._mCloseBnt.anchorOffsetX = .5 * this._mCloseBnt.width,
                this._mCloseBnt.anchorOffsetY = .5 * this._mCloseBnt.height,
                this._mCloseBnt.touchEnabled = !0,
                this._mCloseBnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mGoods1 = this.getChildByName("bnt1"),
                this._mGoods1.x = 62 + .5 * this._mGoods1.width,
                this._mGoods1.y = 202 + .5 * this._mGoods1.height,
                this._mGoods1.anchorOffsetX = .5 * this._mGoods1.width,
                this._mGoods1.anchorOffsetY = .5 * this._mGoods1.height,
                this._mGoods1.touchEnabled = !0,
                this._mGoods1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mGoods2 = this.getChildByName("bnt2"),
                this._mGoods2.x = 282 + .5 * this._mGoods2.width,
                this._mGoods2.y = 202 + .5 * this._mGoods2.height,
                this._mGoods2.anchorOffsetX = .5 * this._mGoods2.width,
                this._mGoods2.anchorOffsetY = .5 * this._mGoods2.height,
                this._mGoods2.touchEnabled = !0,
                this._mGoods2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mGoods3 = this.getChildByName("bnt3"),
                this._mGoods3.x = 62 + .5 * this._mGoods3.width,
                this._mGoods3.y = 440 + .5 * this._mGoods3.height,
                this._mGoods3.anchorOffsetX = .5 * this._mGoods3.width,
                this._mGoods3.anchorOffsetY = .5 * this._mGoods3.height,
                this._mGoods3.touchEnabled = !0,
                this._mGoods3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mGoods4 = this.getChildByName("bnt4"),
                this._mGoods4.x = 282 + .5 * this._mGoods4.width,
                this._mGoods4.y = 440 + .5 * this._mGoods4.height,
                this._mGoods4.anchorOffsetX = .5 * this._mGoods4.width,
                this._mGoods4.anchorOffsetY = .5 * this._mGoods4.height,
                this._mGoods4.touchEnabled = !0,
                this._mGoods4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this)
        }
        ,
        t.prototype.scaleBnt = function(e) {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
            var t = egret.Tween.get(e.target).to({
                scaleX: .85,
                scaleY: .85
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100);
            e.target == this._mCloseBnt ? t.call(this.hide, this) : e.target == this._mGoods1 ? (this.hide(),
                GameValue.residualGold >= 500 ? (promptWnd._mType = 2,
                    promptWnd.getInstance.show()) : (promptWnd._mType = 1,
                    promptWnd.getInstance.show())) : e.target == this._mGoods2 ? (this.hide(),
                GameValue.residualGold >= 800 ? (promptWnd._mType = 2,
                    promptWnd.getInstance.show()) : (promptWnd._mType = 1,
                    promptWnd.getInstance.show())) : e.target == this._mGoods3 ? (this.hide(),
                GameValue.residualGold >= 1e3 ? (promptWnd._mType = 2,
                    promptWnd.getInstance.show()) : (promptWnd._mType = 1,
                    promptWnd.getInstance.show())) : e.target == this._mGoods4 && (this.hide(),
                    GameValue.residualGold >= 1200 ? (promptWnd._mType = 2,
                        promptWnd.getInstance.show()) : (promptWnd._mType = 1,
                        promptWnd.getInstance.show()))
        }
        ,
        t.prototype.shadowMC = function() {
            this._mHeiBG.$setBitmapData(GResCache.getRes("resource/assets/images/ui/heise.png")),
                this._mHeiBG.x = 0,
                this._mHeiBG.y = 0,
                this._mHeiBG.alpha = 0,
                this._mHeiBG.touchEnabled = !0,
                this._mGroup.addChild(this._mHeiBG),
                this._mHeiBG.touchEnabled = !0;
            var e = egret.Tween.get(this._mHeiBG);
            e.to({
                alpha: .5
            }, 300)
        }
        ,
        t.prototype.cleanHeiBG = function() {
            void 0 != this._mHeiBG.parent && (this._mHeiBG.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mHeiBG.parent.removeChild(this._mHeiBG))
        }
        ,
        t.prototype.onInit = function() {
            e.prototype.onInit.call(this)
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this),
                this._mCloseBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mGoods1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mGoods2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mGoods3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mGoods4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this.cleanHeiBG()
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(FakeMallWnd.prototype, "FakeMallWnd");
var HongBaoUI = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.res = 0,
            t._mGroup = new egret.DisplayObjectContainer,
            t.GinitUIConfig("HongBaoUI"),
            t._mHongBaoText = FontMgr.getText(FontMgr.FONT_2),
            t._mHongBaoText.letterSpacing = -2,
            t._mHongBaoText.width = 420,
            t._mHongBaoText.textAlign = egret.HorizontalAlign.CENTER,
            t._mHongBaoText.scaleX = .9,
            t._mHongBaoText.scaleY = .9,
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.show = function(e) {
            GUIManager.getInstance.topLay.addChild(this._mGroup),
                this._mGroup.addChild(this),
                this.res = e,
                this.x = 42,
                this.y = 65,
                this.initBnt(),
                this._mGroup.alpha = 0,
                this._mGroup.x = .5 * this._mGroup.width,
                this._mGroup.y = .5 * this._mGroup.height,
                this._mGroup.anchorOffsetX = .5 * this._mGroup.width,
                this._mGroup.anchorOffsetY = .5 * this._mGroup.height,
                this._mGroup.scaleX = .9,
                this._mGroup.scaleY = .9;
            var t = egret.Tween.get(this._mGroup);
            1 == ClipMove.getInstance.isAccClipSpeed() ? (t.to({
                alpha: 1
            }, 70),
                t.to({
                    scaleX: 1.08,
                    scaleY: 1.08
                }, 30).to({
                    scaleX: 1,
                    scaleY: 1
                }, 30)) : (t.to({
                alpha: 1
            }, 200),
                t.to({
                    scaleX: 1.08,
                    scaleY: 1.08
                }, 100).to({
                    scaleX: 1,
                    scaleY: 1
                }, 200)),
                this.setMoneyPrice()
        }
        ,
        t.prototype.setMoneyPrice = function() {
            this._mHongBaoText.text = GameValue.hbMoney + "元",
                this._mHongBaoText.x = 83,
                this._mHongBaoText.y = 195,
                this._mGroup.addChild(this._mHongBaoText)
        }
        ,
        t.prototype.initBnt = function() {
            this._mCloseBnt = this.getChildByName("closeBnt"),
                this._mCloseBnt.touchEnabled = !0,
                this._mCloseBnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mCloseBnt.x = 335 + .5 * this._mCloseBnt.width,
                this._mCloseBnt.y = 20 + .5 * this._mCloseBnt.height,
                this._mCloseBnt.anchorOffsetX = .5 * this._mCloseBnt.width,
                this._mCloseBnt.anchorOffsetY = .5 * this._mCloseBnt.height,
                this._mContinueBnt = this.getChildByName("continueBnt"),
                this._mContinueBnt.touchEnabled = !0,
                this._mContinueBnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mContinueBnt.x = 121 + .5 * this._mContinueBnt.width,
                this._mContinueBnt.y = 412 + .5 * this._mContinueBnt.height,
                this._mContinueBnt.anchorOffsetX = .5 * this._mContinueBnt.width,
                this._mContinueBnt.anchorOffsetY = .5 * this._mContinueBnt.height,
                this._mPustBnt = this.getChildByName("pustBnt"),
                this._mPustBnt.$setVisible(!1)
        }
        ,
        t.prototype.scaleBnt = function(e) {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
            var t = egret.Tween.get(e.target).to({
                scaleX: .85,
                scaleY: .85
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100);
            e.target == this._mCloseBnt || e.target == this._mContinueBnt ? t.call(this.hide, this) : e.target == this._mPustBnt && t.call(this.pustWnd, this)
        }
        ,
        t.prototype.pustWnd = function() {
            this.hide(),
                PushWnd.getInstance.show()
        }
        ,
        t.prototype.hide = function() {
            0 != this.res && (this._mCloseBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mContinueBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mPustBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this)),
                2 == this.res ? Fail.getInstance.hide() : 1 == this.res && Success.getInstance.hide(),
            void 0 != this._mHongBaoText.parent && this._mHongBaoText.parent.removeChild(this._mHongBaoText),
            void 0 != this.parent && this.parent.removeChild(this),
                this.res = 0
        }
        ,
        t
}(MDisplay.MUISprite);
__reflect(HongBaoUI.prototype, "HongBaoUI");
var HTTPRequest = function() {
    function e() {
        this.httpHeadUrl = "http://s.jaydx.cn",
            this.httpHeadUrlCDN = "http://cdn.jaydx.cn",
            this.url = "/hgame2/game_zww/"
    }
    return Object.defineProperty(e, "getInstance", {
        get: function() {
            return void 0 == e._mInstance && (e._mInstance = new e),
                e._mInstance
        },
        enumerable: !0,
        configurable: !0
    }),
        e.prototype.getAction = function() {
            var e = this.httpHeadUrl + this.url + "/g/action.php"
                , t = "id=" + GameValue.userId + "&o=" + GameValue.orderId;
            GHttpMager.getInstance.GaddHttpSend(e, t, void 0, this)
        }
        ,
        e.prototype.getData = function() {
            var e = this.httpHeadUrl + this.url + "/g/getData.php"
                , t = "id=" + GameValue.userId + "&o=" + GameValue.orderId;
            GHttpMager.getInstance.GaddHttpSend(e, t, this.onDataHTTPed, this)
        }
        ,
        e.prototype.onDataHTTPed = function(e, t, i) {
            if (1 == e && "" != t.response) {
                var n = JSON.parse(t.response);
                if (GameValue.residualGold = n.m,
                        GameValue.bonusdualGold = n.rm,
                    void 0 == GameValue.bonusdualGold && (GameValue.bonusdualGold = 0),
                        GameValue.commissionGold = n.bm,
                    void 0 == GameValue.commissionGold && (GameValue.commissionGold = 0),
                        GameValue.upperu = n.tm,
                        GameValue.yongjin = n.bt,
                    void 0 == GameValue.yongjin && (GameValue.yongjin = 0),
                    -1 == GameValue.residualGold)
                    return;
                if (0 != n.a) {
                    var s = n.a;
                    if (void 0 != s)
                        for (var o = 0, a = s; o < a.length; o++) {
                            var h = a[o];
                            PriceRangeData.getInstance.initData(h[0], h[1])
                        }
                }
                GUiwnd.LoadingWnd.getInstance.getHTTPDataSucc()
            }
        }
        ,
        e.prototype.jwwRequest = function(e, t, i) {
            var n = this.httpHeadUrl + this.url + "/g/play.php"
                , s = "id=" + GameValue.userId + "&a=" + e + "&b=" + t + "&c=" + i + "&o=" + GameValue.orderId;
            GHttpMager.getInstance.GaddHttpSend(n, s, this.onJwwRequested, this)
        }
        ,
        e.prototype.onJwwRequested = function(e, t, i) {
            if (1 == e && "" != t.response) {
                var n = JSON.parse(t.response)
                    , s = n.res;
                WorldWnd.getInstance.freshTimesTemp(GameValue.residualGold),
                    s > 1 ? (GameValue.hbMoney = n.pa,
                        GameValue.residualGold = n.pc,
                        GameValue.bonusdualGold = n.rm,
                    void 0 == GameValue.bonusdualGold && (GameValue.bonusdualGold = 0),
                        GameValue.upperu++) : 1 == s && (GameValue.residualGold = n.pc,
                            GameValue.bonusdualGold = n.rm,
                        void 0 == GameValue.bonusdualGold && (GameValue.bonusdualGold = 0),
                            GameValue.upperu++),
                    ModleMove.getInstance.reqServerBack(s)
            }
        }
        ,
        e.prototype.buyPropRequest = function(e) {
            var t = this.httpHeadUrl + this.url + "/g/buyItem.php"
                , i = "id=" + GameValue.userId + "&o=" + GameValue.orderId + "&i=" + e;
            GHttpMager.getInstance.GaddHttpSend(t, i, this.onBuyPropRequested, this)
        }
        ,
        e.prototype.onBuyPropRequested = function(e, t, i) {
            if (1 == e && "" != t.response) {
                var n = JSON.parse(t.response)
                    , s = n.m;
                if (s >= 0) {
                    GameValue.residualGold = s;
                    var o = n.res;
                    GameValue.tingshengNum = n.item1,
                        GameValue.baojiNum = n.item2,
                        WorldWnd.getInstance.freshTimes(),
                        MallWnd.getInstance.buyPropBack(o)
                }
            }
        }
        ,
        e.prototype.freshMoneyRequest = function() {
            var e = this.httpHeadUrl + this.url + "/p/pay_get.php"
                , t = "id=" + GameValue.userId + "&o=" + GameValue.orderId;
            GHttpMager.getInstance.GaddHttpSend(e, t, this.onFreshMoneyRequest, this, null, egret.HttpMethod.GET)
        }
        ,
        e.prototype.onFreshMoneyRequest = function(e, t, i) {
            if (1 == e && "" != t.response) {
                var n = JSON.parse(t.response)
                    , s = n.r;
                1 == s && (GameValue.residualGold = n.m,
                    WorldWnd.getInstance.freshTimes())
            }
        }
        ,
        e.prototype.pushRequest = function(e) {
            var t = this.httpHeadUrl + this.url + "/g/withdraw.php"
                , i = "id=" + GameValue.userId + "&o=" + GameValue.orderId + "&m=" + e;
            GHttpMager.getInstance.GaddHttpSend(t, i, this.onPushRequest, this, null, egret.HttpMethod.GET)
        }
        ,
        e.prototype.onPushRequest = function(e, t, i) {
            if (1 == e && "" != t.response) {
                var n = JSON.parse(t.response)
                    , s = n.res;
                1 == s && (GameValue.bonusdualGold = n.m,
                    WorldWnd.getInstance.freshTimes())
            }
        }
        ,
        e.prototype.pushYJRequest = function(e) {
            var t = this.httpHeadUrl + this.url + "/g/withdrawb.php"
                , i = "id=" + GameValue.userId + "&o=" + GameValue.orderId + "&m=" + e;
            GHttpMager.getInstance.GaddHttpSend(t, i, this.onPushYJRequest, this, null, egret.HttpMethod.GET)
        }
        ,
        e.prototype.onPushYJRequest = function(e, t, i) {
            if (1 == e && "" != t.response) {
                var n = JSON.parse(t.response)
                    , s = n.res;
                1 == s && (GameValue.commissionGold = n.m,
                    MoneyRecord.getInstance.setexchangeMoney(GameValue.commissionGold + ""))
            }
        }
        ,
        e.prototype.yjRequest = function() {
            this.mTimer(),
                GTimerMag.getInstance.addTimerTask("MoneyWnd", 99999999, 12e4, this.mTimer, this)
        }
        ,
        e.prototype.mTimer = function() {
            var e = this.httpHeadUrl + this.url + "/g/awardData.php"
                , t = "id=" + GameValue.userId + "&o=" + GameValue.orderId;
            GHttpMager.getInstance.GaddHttpSend(e, t, this.yjRequested, this, null, egret.HttpMethod.GET)
        }
        ,
        e.prototype.yjRequested = function(e, t, i) {
            if (1 == e && "" != t.response) {
                var n = JSON.parse(t.response);
                if (GameValue.commissionGold = n.bm,
                    void 0 == GameValue.commissionGold && (GameValue.commissionGold = 0),
                    0 != n.r) {
                    var s = n.a;
                    void 0 != s && this.aArray(s);
                    var o = n.b;
                    void 0 != o && this.bArray(o);
                    var a = n.c;
                    void 0 != a && (GameValue.yongjin = Number(a[0]),
                        MoneyMgr.mNoJsMon = a[1] + "")
                }
            }
        }
        ,
        e.prototype.aArray = function(e) {
            for (var t, i = 1, n = 0, s = e; n < s.length; n++) {
                var o = s[n];
                t = new WinData,
                    t.mCurrTime = o[0],
                    t.mExAmount = o[1],
                    t.mWaAmount = o[2],
                    t.mResultAmount = o[3],
                    MoneyMgr.getInstance.putWinMoney(i, t),
                    i++
            }
        }
        ,
        e.prototype.bArray = function(e) {
            for (var t, i = 1, n = 0, s = e; n < s.length; n++) {
                var o = s[n];
                t = new CurrMoneyData,
                    t.mTime = o[0],
                    t.mGetMon = o[1],
                    MoneyMgr.getInstance.putMoney(i, t),
                    i++
            }
        }
        ,
        e.prototype.yjRankingRequest = function() {
            this.yjRankingTimer(),
                GTimerMag.getInstance.addTimerTask("yjRankingRequest", 99999999, 6e5, this.yjRankingTimer, this)
        }
        ,
        e.prototype.yjRankingTimer = function() {
            var e = this.httpHeadUrl + this.url + "/g/getBRank.php"
                , t = "";
            GHttpMager.getInstance.GaddHttpSend(e, t, this.yjRankingRequested, this, null, egret.HttpMethod.GET)
        }
        ,
        e.prototype.yjRankingRequested = function(e, t, i) {
            if (1 == e && "" != t.response) {
                var n = JSON.parse(t.response);
                void 0 != n && this.dArray(n)
            }
        }
        ,
        e.prototype.dArray = function(e) {
            for (var t, i = 1, n = 0, s = 0, o = e; s < o.length; s++) {
                var a = o[s];
                t = new RanKingData,
                    t.userId = a[0],
                    t.yMoeny = a[1],
                    t.ranKing = ++n,
                    MoneyMgr.getInstance.putRanKing(i, t),
                    i++
            }
        }
        ,
        e.prototype.dhRankingRequest = function() {
            this.dhRankingTimer(),
                GTimerMag.getInstance.addTimerTask("dhRankingRequest", 99999999, 6e5, this.dhRankingTimer, this)
        }
        ,
        e.prototype.dhRankingTimer = function() {
            var e = this.httpHeadUrl + this.url + "/g/getWdata.php"
                , t = "id=" + GameValue.userId + "&o=" + GameValue.orderId;
            GHttpMager.getInstance.GaddHttpSend(e, t, this.dhRankingRequested, this, null, egret.HttpMethod.GET)
        }
        ,
        e.prototype.dhRankingRequested = function(e, t, i) {
            if (1 == e && "" != t.response) {
                var n = JSON.parse(t.response);
                MoneyMgr.mExchangeAdd = n.wt;
                var s = n.l;
                void 0 != s && this.eArray(s)
            }
        }
        ,
        e.prototype.eArray = function(e) {
            for (var t, i = 1, n = 0, s = e; n < s.length; n++) {
                var o = s[n];
                t = new ExchangeData,
                    t.exchangeMoney = o[0] / 100,
                    t.exchangeState = o[1],
                    t.exchangeTime = o[2],
                    MoneyMgr.getInstance.putExchange(i, t),
                    i++
            }
        }
        ,
        e.prototype.dailyRankingTime = function() {
            this.dailyRanking(),
                GTimerMag.getInstance.addTimerTask("dailyRankingTime", 99999999, 6e5, this.dailyRanking, this)
        }
        ,
        e.prototype.dailyRanking = function() {
            var e = this.httpHeadUrl + this.url + "/g/getBRank_t.php"
                , t = "";
            GHttpMager.getInstance.GaddHttpSend(e, t, this.onDailyRanking, this, null, egret.HttpMethod.GET)
        }
        ,
        e.prototype.onDailyRanking = function(e, t, i) {
            if (1 == e && "" != t.response) {
                var n = JSON.parse(t.response)
                    , s = void 0
                    , o = new Array;
                for (var a in n)
                    n.hasOwnProperty(a) && (s = new TodayRanData,
                        s.todayUser = a,
                        s.todayMoney = n[a],
                        o.push(s));
                for (var h = void 0, r = 0; r < o.length; r++)
                    for (var d = r + 1; d < o.length; d++)
                        o[r].todayMoney < o[d].todayMoney && (h = o[r],
                            o[r] = o[d],
                            o[d] = h);
                for (var r = 0; r < o.length; r++)
                    o[r].todayRan = r + 1,
                        MoneyMgr.getInstance.putTodayRanData(r + 1, o[r]);
                EveryDayRanKing.getInstance.showRanKingData()
            }
        }
        ,
        e.prototype.dailyRanking_YT = function() {
            var e = this.httpHeadUrl + this.url + "/g/getBRank_yt.php"
                , t = "";
            GHttpMager.getInstance.GaddHttpSend(e, t, this.onDailyRanking_YT, this, null, egret.HttpMethod.GET)
        }
        ,
        e.prototype.onDailyRanking_YT = function(e, t, i) {
            if (1 == e && "" != t.response) {
                var n = void 0
                    , s = JSON.parse(t.response)
                    , o = new Array;
                for (var a in s)
                    s.hasOwnProperty(a) && (n = new YesdayRanData,
                        n.yesdayUser = a,
                        n.yesdayMoney = s[a],
                        o.push(n));
                for (var h = void 0, r = 0; r < o.length; r++)
                    for (var d = r + 1; d < o.length; d++)
                        o[r].yesdayMoney < o[d].yesdayMoney && (h = o[r],
                            o[r] = o[d],
                            o[d] = h);
                for (var r = 0; r < o.length; r++)
                    o[r].yesdayRan = r + 1,
                        MoneyMgr.getInstance.putYesdayRanData(r + 1, o[r])
            }
        }
        ,
        e.prototype.payRequest = function(t) {
            var i = e.getInstance.httpHeadUrl + e.getInstance.url + "/p/pay_apply.php"
                , n = "id=" + GameValue.userId + "&a=" + t + "&t=" + GTimerMag.getInstance.getCurrTime() + "&o=" + GameValue.orderId;
            GHttpMager.getInstance.GaddHttpSend(i, n, this.onPayRequest, this, null, egret.HttpMethod.GET)
        }
        ,
        e.prototype.onPayRequest = function(e, t, i) {
            if (1 == e && "" != t.response) {
                var n = JSON.parse(t.response)
                    , s = n.url;
                window.gotoUrl(s)
            }
        }
        ,
        e.prototype.pushBackTimer = function() {
            GTimerMag.getInstance.addTimerTask("pushBackTimer", 99999999, 4e3, this.pushBackRequest, this)
        }
        ,
        e.prototype.pushBackRequest = function() {}
        ,
        e.prototype.onPushBackRequest = function(e, t, i) {
            if (1 == e && "" != t.response) {
                var n = JSON.parse(t.response);
                if (void 0 != ReminderUI.getInstance.parent || void 0 != PushSucc.getInstance.parent)
                    return;
                void 0 != n && Number(n) > GameValue.backTimes && (this.freshMoneyRequest(),
                    GameValue.backTimes = Number(n),
                    PushTipWnd.getInstance.show())
            }
        }
        ,
        e
}();
__reflect(HTTPRequest.prototype, "HTTPRequest");
var KefuWnd = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.GWndConfig("KefuWnd", GUIManager.getInstance.bgLay, MDisplay.WndShowType.NONE),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == this.mInstance && (this.mInstance = new t),
                    this.mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.show = function() {
            e.prototype.show.call(this),
                this.x = 0,
                this.y = 0,
                this.playStarMc(),
                this.showCode()
        }
        ,
        t.prototype.playStarMc = function() {
            this.mStar = GMovieMag.getInstance.GgetMovieClip("starMc", 0, 0, !0),
                this.mStar.x = 108,
                this.mStar.y = 178,
                this.addChild(this.mStar)
        }
        ,
        t.prototype.onHide = function() {
            void 0 != this.mStar && (GObjPool.getInstance.Gadd2Pool(this.mStar),
            void 0 != this.mStar.parent && this.mStar.parent.removeChild(this.mStar),
                delete this.mStar),
                this.clearCode()
        }
        ,
        t.prototype.showCode = function() {
            if (void 0 == this._codeRect && (this._codeRect = new egret.Rectangle(105,276,335,335)),
                null == this._codeImg) {
                var e = document.getElementById("gameDiv");
                this._codeImg = document.createElement("img"),
                    this._codeImg.src = HTTPRequest.getInstance.httpHeadUrlCDN + "/game_zww2/code/" + GameValue.codeURL + "/kefuCode.png",
                    this._codeImg.style.position = "absolute",
                    e.appendChild(this._codeImg)
            }
            this._codeImg.style.display = "inline",
                this.onResize(),
                GameMain.getInstance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this)
        }
        ,
        t.prototype.clearCode = function() {
            this._codeImg && (this._codeImg.style.display = "none"),
                GameMain.getInstance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this)
        }
        ,
        t.prototype.onResize = function() {
            if (this._codeImg && this._codeRect) {
                var e = document.body.clientWidth / 540
                    , t = document.body.clientHeight / 878;
                this._codeImg.style.width = this._codeRect.width * e + "px",
                    this._codeImg.style.height = this._codeRect.height * t + "px",
                    this._codeImg.style.left = this._codeRect.x * e + "px",
                    this._codeImg.style.top = this._codeRect.y * t + "px"
            }
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(KefuWnd.prototype, "KefuWnd");
var GUiwnd;
!function(e) {
    var t = function(e) {
        function t() {
            var t = e.call(this) || this;
            return t._mResourcesFinish = !1,
                t._mHTTPDataFinish = !1,
                t._mIllegalUser = !1,
                t._mTime = 1e3,
                t._mInitSuc = !1,
                t._mLoadTotal = 0,
                t.beforeLoad("resource/assets/images/flash/jin01.png"),
                t.beforeLoad("resource/assets/images/flash/jin02.png"),
                t.beforeLoad("resource/assets/images/flash/jin03.png"),
                t.beforeLoad("resource/assets/images/flash/jin04.png"),
                t.beforeLoad("resource/assets/images/flash/jin05.png"),
                t.beforeLoad("resource/assets/images/flash/jin06.png"),
                t.beforeLoad("resource/assets/images/flash/loading_zi1.png"),
                t.beforeLoad("resource/assets/images/flash/loading_zi2.png"),
                t.beforeLoad("resource/assets/images/ui/loading_zi1.png"),
                t.beforeLoad("resource/assets/images/ui/loading_zi2.png"),
                t.beforeLoad("resource/assets/images/ui/loading_zi3.png"),
                t.beforeLoad("resource/assets/images/ui/loading_zi4.png"),
                t.beforeLoad("resource/assets/images/ui/loading_zi5.png"),
                t.beforeLoad("resource/assets/images/ui/loading_zi6.png"),
                t.GinitUIConfig("loading"),
                t._mLoadMod1 = new GLoadModule,
                t
        }
        return __extends(t, e),
            Object.defineProperty(t, "getInstance", {
                get: function() {
                    return void 0 == t._mInstance && (t._mInstance = new t),
                        t._mInstance
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.onInit = function() {
                this._mLoadMod1.Gbegin(this.playLoading, this),
                    GUIManager.getInstance.bgLay.addChild(this),
                    this._mInitSuc = !0,
                    this._mLoadingMC = GMovieMag.getInstance.GgetMovieClip("loadTextMc"),
                    this._mLoadingMC.x = .5 * (GameMain.getInstance.StageWidth - this._mLoadingMC.width) + 10,
                    this._mLoadingMC.y = .5 * GameMain.getInstance.StageHeight - 40,
                    this._mLoadingTextTip = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/loading_zi" + Math.ceil(5 * Math.random()) + ".png")),
                    this._mLoadingTextTip.x = .5 * (GameMain.getInstance.StageWidth - this._mLoadingTextTip.width),
                    this._mLoadingTextTip.y = .5 * GameMain.getInstance.StageHeight + 35,
                    this.addChild(this._mLoadingMC),
                    this.addChild(this._mLoadingTextTip),
                    this.loadingNum()
            }
            ,
            t.prototype.playLoading = function() {
                this.resourcesLoad(),
                "-1" != GameValue.userId && (this._mIllegalUser = !0),
                    HTTPRequest.getInstance.getData(),
                    HTTPRequest.getInstance.pushBackTimer()
            }
            ,
            t.prototype.loadingNum = function() {
                this.getChildByName("bar").x = -300,
                    this._mLoadingText = new egret.TextField,
                    this._mLoadingText.text = "0%",
                    this._mLoadingText.size = 18,
                    this._mLoadingText.strokeColor = 0,
                    this._mLoadingText.stroke = 2,
                    this._mLoadingText.x = .5 * (GameMain.getInstance.StageWidth - this._mLoadingText.width),
                    this._mLoadingText.y = .5 * GameMain.getInstance.StageHeight,
                    this.addChild(this._mLoadingText)
            }
            ,
            t.prototype.resourcesLoad = function() {
                this._mLoadMod1.GaddItem("resource/assets/egret_icon.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/bg_2.jpg"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/pingtai_qian.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/pingtai_hou.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/pingtai_hou.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/jiazi1.1.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/jiazi1.2.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/jiazi2.1.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/jiazi2.2.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/jiazi3.1.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/jiazi3.2.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/heise.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/zq_tiao_2.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/zq_tiao_1.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/idbg.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/timeTip.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/yun.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/wenzi_7.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/wenzi_8.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/wenzi_9.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/wenzi_10.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/wenzi_11.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/wenzi_12.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/wenzi_16.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/wenzi_17.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/wenzi_18.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/wenzi_19.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/kuang_tishi2.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/sctb_miaos.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/wenzi_djgz.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/kuang_gonggao.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/dgonggao.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/gonggao_hb.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang00.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang01.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang02.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang03.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang04.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang05.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang06.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang07.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang08.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang09.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang010.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang011.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang012.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang013.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang014.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang015.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang016.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang017.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang018.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang019.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang020.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang021.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang022.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang023.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang024.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang025.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang026.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang027.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang028.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang029.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang030.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang031.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang032.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang033.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang034.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang035.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang036.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/touxiang037.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/zq_bg_yj.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/zq_bg_ph.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/zq_bg_ph.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/fs2vm.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/hpi_ylqui.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/zi_yongjin.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/wupin2.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/wupin3.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/zi_paihangbang.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/sctswz_1.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/zq_bg_dh.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/zi_ljdhd.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/zi_yongjin.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/zi_paihangbang.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/zi_duihuandezi.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/zq_btn1.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/zq_btn2.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/mrph_zuori_2.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/mrph_jinri_2.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/mrph_tiao1.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/mrph_tiao2.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/mrph_jinri_di.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/mrph_zuori_di.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/jl_tiaotiao.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/zi_kdhjb.png"),
                    this._mLoadMod1.GaddItem("resource/assets/images/ui/btn_tx.png"),
                    this._mLoadMod1.GaddGroupRes("gameUI.json", GLoadModule.GroupType_UI),
                    this._mLoadMod1.GaddGroupRes("HongBaoUI.json", GLoadModule.GroupType_UI),
                    this._mLoadMod1.GaddGroupRes("KefuWnd.json", GLoadModule.GroupType_UI),
                    this._mLoadMod1.GaddGroupRes("QrodeWnd.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("MoneyWnd.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("bettomBtn.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("TipUI.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("RechargeWnd.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("RulesOrSkillUI.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("payWnd.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("reminderUI.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("pushWnd.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("PushTipWnd.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("RedBonusWnd.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("mallWnd.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("mallWnd.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("PushSucc.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("fakeMallWnd.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("tsWnd.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("everydayRan.json", GLoadModule.GroupType_UI),
                this._mLoadMod1.GaddGroupRes("mcNetLoading.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("bntBeginMC.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleMC1.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleMC2.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleMC3.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleMC4.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleMC5.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("starMc.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleDropMC1.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleDropMC2.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleDropMC3.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleDropMC4.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleDropMC5.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleBreakMC.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("successBackMC.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("successBackMC3.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("redEnvelopesMC.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("redEnvelopesMC3.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("clipMC1.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("clipMC2.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("clipMC3.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("clipMC1_2.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("clipMC1_3.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("clipMC2_2.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("clipMC2_3.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("clipMC3_2.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("clipMC3_3.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleClipMC1_1.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleClipMC2_1.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleClipMC3_1.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleClipMC4_1.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleClipMC5_1.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleClipMC1_2.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleClipMC2_2.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleClipMC3_2.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleClipMC4_2.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleClipMC5_2.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleClipMC1_3.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleClipMC2_3.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleClipMC3_3.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleClipMC4_3.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("modleClipMC5_3.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("redRandomMC.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("redRandomOpenMC.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("redRandomTextMC1.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("redRandomTextMC2.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("redRandomTextMC3.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("redRandomTextMC4.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("redRandomTextMC5.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("redRandomTextMC6.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("redRandomTextMC7.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("burstOpenMC.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("continueBntMC.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("pustBntMC.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("profitMC.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("profitMC3.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("feedbackBntMC.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("changeWWMC.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("receiveSuccMC.json", GLoadModule.GroupType_Flash),
                this._mLoadMod1.GaddGroupRes("MomeyMC.json", GLoadModule.GroupType_Flash),
                SoundMgr.preloadRes(this._mLoadMod1),
                FontMgr.preloadRes(this._mLoadMod1),
                this._mLoadMod1.Gbegin(this.onLoaded, this),
                this._mLoadTotal = this._mLoadMod1.loadTotal
            }
            ,
            t.prototype.getHTTPDataSucc = function() {
                this._mHTTPDataFinish = !0
            }
            ,
            t.prototype.onLoaded = function() {
                GResCache.mIsDeBug && egret.log("所有预加载的资源已经加载完毕"),
                    this._mResourcesFinish = !0
            }
            ,
            t.prototype.update = function(e) {
                if (this._mLoadMod1.loadOverplus > 0 && GResCache.mIsDeBug && egret.log("当前还剩余的加载数量为:" + this._mLoadMod1.loadOverplus),
                        this._mTime -= e,
                        this._mInitSuc) {
                    var t = 1 - this._mLoadMod1.loadOverplus / this._mLoadTotal;
                    t = t > 1 ? 1 : t;
                    var i = -300 + 380 * t
                        , n = Math.round(100 * t - 1);
                    this._mLoadingText.text = (0 > n ? 0 : n) + "%",
                        this.getChildByName("bar").x = i
                }
                1 == this._mResourcesFinish && this._mHTTPDataFinish && this._mTime <= 0 && 1 == this._mIllegalUser && GameMain.getInstance.setGameState(GStatus.GameStatus.getInstance)
            }
            ,
            t.prototype.show = function() {}
            ,
            t.prototype.cleanLoading = function() {
                void 0 != this._mLoadingMC && (GObjPool.getInstance.Gadd2Pool(this._mLoadingMC),
                void 0 != this._mLoadingMC.parent && this._mLoadingMC.parent.removeChild(this._mLoadingMC),
                    delete this._mLoadingMC)
            }
            ,
            t.prototype.hide = function() {
                this.removeChildren(),
                    this.cleanLoading()
            }
            ,
            t.prototype.touchDown = function(e) {
                GameMain.getInstance.setGameState(GStatus.GameStatus.getInstance)
            }
            ,
            t
    }(MDisplay.MUISprite);
    e.LoadingWnd = t,
        __reflect(t.prototype, "GUiwnd.LoadingWnd")
}(GUiwnd || (GUiwnd = {}));
var MainBettom = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.select = 1,
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == this.mInstance && (this.mInstance = new t),
                    this.mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.show = function() {
            this.GinitUIConfig("bettomBtn"),
                GUIManager.getInstance.tipLay.addChild(this)
        }
        ,
        t.prototype.onInit = function() {
            this.x = 0,
                this.y = GameMain.getInstance.StageHeight - this.height,
                WorldWnd.getInstance.show(),
                this._mbntJWW = this.getChildByName("bntjww"),
                this._mbntYJ = this.getChildByName("bntyj"),
                this._mbntEWM = this.getChildByName("bntewm"),
                this._mbntKF = this.getChildByName("bntkf"),
                this.selected(1, !1, !0, !0, !0),
                this._mbntJWW.touchEnabled = !0,
                this._mbntYJ.touchEnabled = !0,
                this._mbntEWM.touchEnabled = !0,
                this._mbntKF.touchEnabled = !0,
                this._mbntJWW.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this),
                this._mbntYJ.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this),
                this._mbntEWM.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this),
                this._mbntKF.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this)
        }
        ,
        t.prototype.touchDown = function(e) {
            0 != ModleMove.getInstance.finish && (SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1),
                e.target == this._mbntJWW ? (this.selected(1, !1, !0, !0, !0),
                    WorldWnd.getInstance.show(),
                void 0 != MoneyWnd.getInstance.parent && MoneyWnd.getInstance.hide(),
                void 0 != QcodeWnd.getInstance.parent && QcodeWnd.getInstance.hide(),
                void 0 != KefuWnd.getInstance.parent && KefuWnd.getInstance.hide()) : e.target == this._mbntYJ ? (this.selected(2, !0, !1, !0, !0),
                    MoneyWnd.getInstance.show(),
                void 0 != WorldWnd.getInstance.parent && WorldWnd.getInstance.hide(),
                void 0 != QcodeWnd.getInstance.parent && QcodeWnd.getInstance.hide(),
                void 0 != KefuWnd.getInstance.parent && KefuWnd.getInstance.hide()) : e.target == this._mbntEWM ? (this.selected(3, !0, !0, !1, !0),
                    QcodeWnd.getInstance.show(),
                void 0 != WorldWnd.getInstance.parent && WorldWnd.getInstance.hide(),
                void 0 != MoneyWnd.getInstance.parent && MoneyWnd.getInstance.hide(),
                void 0 != KefuWnd.getInstance.parent && KefuWnd.getInstance.hide()) : e.target == this._mbntKF && (this.selected(4, !0, !0, !0, !1),
                        KefuWnd.getInstance.show(),
                    void 0 != WorldWnd.getInstance.parent && WorldWnd.getInstance.hide(),
                    void 0 != MoneyWnd.getInstance.parent && MoneyWnd.getInstance.hide(),
                    void 0 != QcodeWnd.getInstance.parent && QcodeWnd.getInstance.hide()))
        }
        ,
        t.prototype.selected = function(e, t, i, n, s) {
            this.select = e,
                this.getChildByName("jwwBG").visible = !t,
                this.getChildByName("yjBG").visible = !i,
                this.getChildByName("ewmBG").visible = !n,
                this.getChildByName("kfBG").visible = !s,
                this._mbntJWW.touchEnabled = t,
                this._mbntYJ.touchEnabled = i,
                this._mbntEWM.touchEnabled = n,
                this._mbntKF.touchEnabled = s
        }
        ,
        t.prototype.hide = function() {
            WorldWnd.getInstance.hide(),
                MoneyWnd.getInstance.hide(),
                QcodeWnd.getInstance.hide(),
                KefuWnd.getInstance.hide(),
                this._mbntJWW.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this),
                this._mbntYJ.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this),
                this._mbntEWM.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this),
                this._mbntKF.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this)
        }
        ,
        t
}(MDisplay.MUISprite);
__reflect(MainBettom.prototype, "MainBettom");
var MallWnd = function(e) {
    function t() {
        var t = e.call(this) || this;
        t._mMoneyList = [1, 1, 1, 5, 8, 10],
            t.nowIndex = 1,
            t.lastIndex = 0,
            t._mUp = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/heise.png")),
            t._mDown = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/heise.png")),
            t._mUp.$alpha = .5,
            t._mDown.$alpha = .5,
            t._mGroup = new egret.DisplayObjectContainer,
            t._mHeiBG = new egret.Bitmap,
            GUIManager.getInstance.topLay.addChild(t._mGroup),
            t.GWndConfig("mallWnd", GUIManager.getInstance.topLay, MDisplay.WndShowType.DROP),
            t._mMoneyMap = new GHashMap;
        for (var i, n = 0, s = 0; 2 > s; s++)
            for (var o = 0; 3 > o; o++) {
                var a = t._mMoneyList[n++];
                i = t.initText("使用( " + a + "元 )", 63 + 152 * o, 137 + 143.3 * s),
                6 == n && (i = t.initText(a + "元", 63 + 152 * o, 137 + 143.3 * s)),
                    t._mMoneyMap.Gput(n, i)
            }
        return t._mTishengText = t.initText(GameValue.tingshengNum + "次", 60, 340),
            t._mTishengText.textColor = 16514945,
            t._mTishengText.strokeColor = 1796494,
            t._mTishengText.size = 18,
            t._mBaojiText = t.initText(GameValue.baojiNum + "次", 214, 340),
            t._mBaojiText.textColor = 16514945,
            t._mBaojiText.strokeColor = 1796494,
            t._mBaojiText.size = 18,
            t.touchEnabled = !0,
            t.x = 6,
            t.y = 30,
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.initText = function(e, t, i) {
            var n = new egret.TextField;
            return n.textAlign = egret.HorizontalAlign.CENTER,
                n.lineSpacing = 2,
                n.textColor = 16777215,
                n.width = 100,
                n.size = 18,
                n.x = t,
                n.y = i,
                n.text = e,
                n.strokeColor = 1477559,
                n.stroke = 1,
                n.fontFamily = "微软雅黑",
                n
        }
        ,
        t.prototype.show = function() {
            e.prototype.show.call(this),
                this.alpha = 1,
                this.shadowMC(),
                this._mSelect = this.getChildByName("select"),
                this.lastIndex = 0,
                this._mSelect.$setVisible(!1),
                this._mCloseBnt = this.bntPos("closeBnt", 485, 11, 1),
                this._mExplainBnt = this.bntPos("explainBnt", 22, 12, 1),
                this._mBianshenBnt = this.bntPos("bianshenBnt", 40, 59, 2),
                this._mWwjiansuBnt = this.bntPos("wwjiansuBnt", 193, 59, 2),
                this._mJiazijiansuBnt = this.bntPos("jiazijiansuBnt", 346, 59, 2),
                this._mTishengBnt = this.bntPos("tishengBnt", 38, 202, 2),
                this._mBaojiBnt = this.bntPos("baojiBnt", 193, 202, 2),
                this._mFanbeiBnt = this.bntPos("fanbeiBnt", 347, 202, 2);
            for (var t, i = 0, n = 0; 2 > n; n++)
                for (var s = 0; 3 > s; s++)
                    i++,
                        t = this._mMoneyMap.Gget(i),
                    void 0 != t && void 0 == t.parent && this.addChild(t);
            this.addChild(this._mTishengText),
                this.addChild(this._mBaojiText),
                this.freshTSNum(),
                this.freshBJNum()
        }
        ,
        t.prototype.freshTSNum = function() {
            this._mTishengText.text = (void 0 == GameValue.tingshengNum ? 0 : GameValue.tingshengNum) + "次"
        }
        ,
        t.prototype.freshBJNum = function() {
            this._mBaojiText.text = (void 0 == GameValue.baojiNum ? 0 : GameValue.baojiNum) + "次"
        }
        ,
        t.prototype.bntPos = function(e, t, i, n) {
            var s = this.getChildByName(e);
            return s.x = t + .5 * s.width,
                s.y = i + .5 * s.height,
                s.anchorOffsetX = .5 * s.width,
                s.anchorOffsetY = .5 * s.height,
                s.touchEnabled = !0,
                1 == n ? s.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this) : 2 == n && s.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt1, this),
                s
        }
        ,
        t.prototype.inMaskBack = function() {
            this._mHeiBG.touchEnabled = !1,
                this._mUp.touchEnabled = !0,
                this._mDown.touchEnabled = !0,
                this._mUp.y = -GameMain.getInstance.StageHeight,
                this._mDown.y = GameMain.getInstance.StageHeight,
                this._mGroup.addChild(this._mUp),
                this._mGroup.addChild(this._mDown),
                this._mUp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onH, this),
                this._mDown.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onH, this);
            egret.Tween.get(this._mUp).to({
                y: -410
            }, 150),
                egret.Tween.get(this._mDown).to({
                    y: 655
                }, 150)
        }
        ,
        t.prototype.outMaskBack = function() {
            if (this._mHeiBG.touchEnabled = !0,
                void 0 != this._mUp.parent) {
                var e = egret.Tween.get(this._mUp).to({
                    y: -GameMain.getInstance.StageHeight
                }, 200);
                e.call(this.cleanUpMask, this)
            }
            if (void 0 != this._mDown.parent) {
                var t = egret.Tween.get(this._mDown).to({
                    y: GameMain.getInstance.StageHeight
                }, 200);
                t.call(this.cleanDownMask, this)
            }
        }
        ,
        t.prototype.scaleBnt1 = function(e) {
            if (TipUI.getInstance.hide(),
                e.target == this._mBianshenBnt) {
                if (this.nowIndex = 1,
                    ModleMove.getInstance.getTimeSpeedWW() > 0)
                    return void this.popText();
                if (0 == this.isSame(this.nowIndex, e))
                    return;
                ModleMove.getInstance.setWWCanTouch(!0),
                    this.inMaskBack()
            } else if (e.target == this._mWwjiansuBnt) {
                if (this.nowIndex = 2,
                    ModleMove.getInstance.getTimeSpeed() > 0)
                    return ModleMove.getInstance.setWWCanTouch(!1),
                        this.outMaskBack(),
                        this.popText(),
                        void (this.lastIndex = 2);
                if (0 == this.isSame(this.nowIndex, e))
                    return;
                if (0 == this.isEnough(this.nowIndex))
                    return;
                this.buyPropServer(SkillTimer.TYPE_WWJS)
            } else if (e.target == this._mJiazijiansuBnt) {
                if (this.nowIndex = 3,
                    ClipMove.getInstance.getTimeSpeed() > 0)
                    return ModleMove.getInstance.setWWCanTouch(!1),
                        this.outMaskBack(),
                        this.popText(),
                        void (this.lastIndex = 3);
                if (0 == this.isSame(this.nowIndex, e))
                    return;
                if (0 == this.isEnough(this.nowIndex))
                    return;
                this.buyPropServer(SkillTimer.TYPE_JZJS)
            } else if (e.target == this._mTishengBnt) {
                if (this.nowIndex = 4,
                    0 == this.isSame(this.nowIndex, e))
                    return;
                if (0 == this.isEnough(this.nowIndex))
                    return;
                this.buyPropServer(SkillTimer.TYPE_ZJTS)
            } else if (e.target == this._mBaojiBnt) {
                if (this.nowIndex = 5,
                    0 == this.isSame(this.nowIndex, e))
                    return;
                if (0 == this.isEnough(this.nowIndex))
                    return;
                this.buyPropServer(SkillTimer.TYPE_BJ)
            } else if (e.target == this._mFanbeiBnt)
                return;
            e.target != this._mBianshenBnt && (ModleMove.getInstance.setWWCanTouch(!1),
                this.outMaskBack()),
                this.selectPos(e.target.x, e.target.y)
        }
        ,
        t.prototype.buyPropServer = function(e) {
            HTTPRequest.getInstance.buyPropRequest(e)
        }
        ,
        t.prototype.buyPropBack = function(e) {
            var i;
            e == SkillTimer.TYPE_WWBS ? (i = this._mBianshenBnt,
                ModleMove.getInstance.buyBS_PropBack()) : e == SkillTimer.TYPE_WWJS ? (i = this._mWwjiansuBnt,
                ModleMove.getInstance.changeSpeedMove(2)) : e == SkillTimer.TYPE_JZJS ? (i = this._mJiazijiansuBnt,
                ClipMove.getInstance.chagneAccClipSpeed(2)) : e == SkillTimer.TYPE_ZJTS ? (i = this._mTishengBnt,
                t.getInstance.freshTSNum()) : e == SkillTimer.TYPE_BJ && (i = this._mBaojiBnt,
                    t.getInstance.freshBJNum())
        }
        ,
        t.prototype.isEnough = function(e) {
            return this._mMoneyList[e] < GameValue.residualGold ? !0 : (this.nowIndex = 0,
                this.lastIndex = -1,
                RechargeWnd.getInstance.show(),
                !1)
        }
        ,
        t.prototype.popText = function() {
            TipUI.getInstance._mTipNum = 10,
                TipUI.getInstance.show(),
                this._mSelect.$setVisible(!1)
        }
        ,
        t.prototype.isSame = function(e, t) {
            if (this.nowIndex == this.lastIndex)
                return !1;
            this.lastIndex = this.nowIndex,
                SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
            egret.Tween.get(t.target).to({
                scaleX: .95,
                scaleY: .95
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100);
            return !0
        }
        ,
        t.prototype.selectPos = function(e, t) {
            this._mSelect.x = e - 76,
                this._mSelect.y = t - 42,
                this._mSelect.$setVisible(!0)
        }
        ,
        t.prototype.scaleBnt = function(e) {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
            var t = egret.Tween.get(e.target).to({
                scaleX: .85,
                scaleY: .85
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100);
            e.target == this._mCloseBnt ? t.call(this.onH, this) : e.target == this._mExplainBnt && (RulesOrSkillUI.getInstance._mContent = 3,
                    RulesOrSkillUI.getInstance.show())
        }
        ,
        t.prototype.shadowMC = function() {
            this._mHeiBG.$setBitmapData(GResCache.getRes("resource/assets/images/ui/heise.png")),
                this._mHeiBG.x = 0,
                this._mHeiBG.y = 0,
                this._mHeiBG.alpha = 0,
                this._mHeiBG.touchEnabled = !0,
                this._mGroup.addChild(this._mHeiBG),
                this._mHeiBG.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onH, this);
            var e = egret.Tween.get(this._mHeiBG);
            e.to({
                alpha: .01
            }, 300)
        }
        ,
        t.prototype.cleanHeiBG = function() {
            void 0 != this._mHeiBG.parent && (this._mHeiBG.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onH, this),
                this._mHeiBG.parent.removeChild(this._mHeiBG))
        }
        ,
        t.prototype.cleanUpMask = function() {
            void 0 != this._mUp.parent && (this._mUp.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onH, this),
                this._mUp.parent.removeChild(this._mUp))
        }
        ,
        t.prototype.cleanDownMask = function() {
            void 0 != this._mDown.parent && (this._mDown.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onH, this),
                this._mDown.parent.removeChild(this._mDown))
        }
        ,
        t.prototype.onH = function() {
            this.hide(),
                this.outMaskBack()
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this),
                this.cleanHeiBG(),
                this._mCloseBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mExplainBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mBianshenBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt1, this),
                this._mWwjiansuBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt1, this),
                this._mJiazijiansuBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt1, this),
                this._mTishengBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt1, this),
                this._mBaojiBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt1, this),
                this._mFanbeiBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt1, this),
                this.cleanUpMask(),
                this.cleanDownMask()
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(MallWnd.prototype, "MallWnd");
var MoneyWnd = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.mMoneyMap = new GHashMap,
            t.mRanKingMap = new GHashMap,
            t.mExchangeMap = new GHashMap,
            t.GWndConfig("MoneyWnd", GUIManager.getInstance.bgLay, MDisplay.WndShowType.NONE),
            HTTPRequest.getInstance.yjRankingRequest(),
            HTTPRequest.getInstance.yjRequest(),
            HTTPRequest.getInstance.dhRankingRequest(),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == this.mInstance && (this.mInstance = new t),
                    this.mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.onInit = function() {
            e.prototype.onInit.call(this),
                this.updataText = new egret.TextField,
                this.updataText.x = 9,
                this.updataText.y = 7,
                this.updataText.size = 17,
                this.updataText.text = "数据每10分钟更新1次",
                this.addChild(this.updataText),
                this.mMonCon = new egret.DisplayObjectContainer,
                this.addChild(this.mMonCon),
                this.mRanCon = new egret.DisplayObjectContainer,
                this.addChild(this.mRanCon),
                this.mExchangeCon = new egret.DisplayObjectContainer,
                this.addChild(this.mExchangeCon),
                this.scrollView = new egret.ScrollView,
                this.scrollRanView = new egret.ScrollView,
                this.scrollExchangeView = new egret.ScrollView,
                this._mUserBG = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/idbg.png")),
                this._mUserBG.x = 172,
                this._mUserBG.y = 60,
                this.addChild(this._mUserBG),
                this.userIdText(),
                this.moneyTip(),
                this.addMoneyText = new egret.Bitmap,
                this.addMoneyText.x = 165,
                this.addMoneyText.y = 240,
                this.addChild(this.addMoneyText),
                this.exchangeMoneyText = new egret.Bitmap,
                this.exchangeMoneyText.x = 140,
                this.exchangeMoneyText.y = 280,
                this.addChild(this.exchangeMoneyText),
                this.addMoney = new egret.TextField,
                this.addMoney.fontFamily = "微软雅黑",
                this.addMoney.x = 220,
                this.addMoney.y = 255,
                this.setTextStyle(this.addMoney)
        }
        ,
        t.prototype.setTextStyle = function(e) {
            e.size = 30,
                e.textColor = 14042624,
                e.width = 230,
                e.textAlign = egret.HorizontalAlign.CENTER,
                e.lineSpacing = 15
        }
        ,
        t.prototype.refesh = function() {
            void 0 != this.addMoney && (this.addMoney.text = (MoneyMgr.mExchangeAdd / 100).toString())
        }
        ,
        t.prototype.userIdText = function() {
            this._mUserIdText = new egret.TextField,
                this._mUserIdText.textColor = 16777215,
                this._mUserIdText.width = 500,
                this._mUserIdText.size = 19,
                this._mUserIdText.x = 18,
                this._mUserIdText.y = 67,
                this._mUserIdText.textAlign = egret.HorizontalAlign.CENTER,
                this._mUserIdText.strokeColor = 0,
                this._mUserIdText.stroke = 1,
                this._mUserIdText.fontFamily = "宋体",
                this.addChild(this._mUserIdText)
        }
        ,
        t.prototype.moneyTip = function() {
            this._mMoneyTip = new egret.TextField,
                this._mMoneyTip.text = "佣金累计满 5 金币后每1分钟自动到账",
                this._mMoneyTip.size = 30,
                this._mMoneyTip.x = 33,
                this._mMoneyTip.y = 313,
                this._mMoneyTip.textColor = 16685346
        }
        ,
        t.prototype.show = function() {
            e.prototype.show.call(this),
                this.x = 0,
                this.y = 0,
                this.playStarMc(),
                this.onInitData(),
                this.updataInfo(1),
                this._mUserIdText.text = "用户ID:" + GameValue.userId
        }
        ,
        t.prototype.addScroll = function() {
            this.scrollView.x = 25,
                this.scrollView.y = 240,
                this.scrollView.setContent(this.mMonCon),
                this.scrollView.bounces = !0,
                this.scrollView.verticalScrollPolicy = "on",
                this.scrollView.width = 490,
                this.scrollView.height = 574,
                this.addChild(this.scrollView)
        }
        ,
        t.prototype.addRanScroll = function() {
            this.scrollRanView.x = 25,
                this.scrollRanView.y = 280,
                this.scrollRanView.setContent(this.mRanCon),
                this.scrollRanView.bounces = !0,
                this.scrollRanView.verticalScrollPolicy = "on",
                this.scrollRanView.width = 490,
                this.scrollRanView.height = 534,
                this.addChild(this.scrollRanView)
        }
        ,
        t.prototype.addExchangeScroll = function() {
            this.scrollExchangeView.x = 25,
                this.scrollExchangeView.y = 280,
                this.scrollExchangeView.setContent(this.mExchangeCon),
                this.scrollExchangeView.bounces = !0,
                this.scrollExchangeView.verticalScrollPolicy = "on",
                this.scrollExchangeView.width = 490,
                this.scrollExchangeView.height = 534,
                this.addChild(this.scrollExchangeView)
        }
        ,
        t.prototype.initMoneyData = function() {
            for (var e, t = 0; t < MoneyMgr.getInstance.winSize; t++)
                if (!(t >= 100)) {
                    var i = MoneyMgr.getInstance.getWinMoney(t + 1)
                        , n = PriceRangeData.getInstance.isMysteriousM(this.getType(i.mExAmount), i.mWaAmount)
                        , s = new Date(1e3 * i.mCurrTime)
                        , o = s.getFullYear() + "-" + this.getNumberDate(s.getMonth() + 1) + "-" + this.getNumberDate(s.getDate()) + " " + this.getNumberDate(s.getHours()) + ":" + this.getNumberDate(s.getMinutes());
                    e = new WinRecordItem,
                        this.mMonCon.addChild(e),
                        e.setDateText = o,
                        n ? e.setDollDesText = "神秘娃娃" : e.setDollDesText = i.mWaAmount + "金币娃娃",
                        e.setMoneyText = i.mResultAmount + "金币",
                        e.setBettingText = "投注" + i.mExAmount + "金币",
                        e.x = 18,
                        e.y = 68 * t,
                    t % 2 != 0 && e.setBitmap(),
                        this.mMoneyMap.Gput(t, e)
                }
        }
        ,
        t.prototype.initRanKingData = function() {
            for (var e, t = 0; t < MoneyMgr.getInstance.ranSize; t++)
                if (!(t >= 100)) {
                    var i = MoneyMgr.getInstance.getRanKing(t + 1);
                    void 0 != i && (e = new RanKing,
                        this.mRanCon.addChild(e),
                        e.setUserIdText = i.userId,
                        e.setMoneyText = Math.floor(i.yMoeny / 100) + "金币",
                        e.setRankingText = "第" + i.ranKing + "名",
                        e.x = 18,
                        e.y = 68 * t,
                    t % 2 != 0 && e.setBitmap(),
                        this.mRanKingMap.Gput(t, e))
                }
        }
        ,
        t.prototype.initExchangeData = function() {
            for (var e, t = 0; t < MoneyMgr.getInstance.exchangeSize; t++)
                if (!(t >= 100)) {
                    var i = MoneyMgr.getInstance.getExchange(t + 1);
                    if (void 0 != i) {
                        e = new Exchange,
                            this.mExchangeCon.addChild(e),
                            e.setExchangeMoney = i.exchangeMoney + "金币",
                            0 == i.exchangeState ? e.setExchangeState = "未兑换" : 1 == i.exchangeState ? e.setExchangeState = "已兑换" : 2 == i.exchangeState && (e.setExchangeState = "异常");
                        var n = new Date(1e3 * i.exchangeTime)
                            , s = n.getFullYear() + "-" + this.getNumberDate(n.getMonth() + 1) + "-" + this.getNumberDate(n.getDate()) + " " + this.getNumberDate(n.getHours()) + ":" + this.getNumberDate(n.getMinutes());
                        e.setExchangeTime = s,
                            e.x = 18,
                            e.y = 68 * t,
                        t % 2 != 0 && e.setBitmap(),
                            this.mExchangeMap.Gput(t, e)
                    }
                }
        }
        ,
        t.prototype.getType = function(e) {
            return 5 == e ? 1 : 10 == e ? 2 : 20 == e ? 3 : void 0
        }
        ,
        t.prototype.getNumberDate = function(e) {
            var t;
            return 10 > e ? t = "0" + e : e
        }
        ,
        t.prototype.playStarMc = function() {
            this.mStar = GMovieMag.getInstance.GgetMovieClip("starMc", 0, 0, !0),
                this.mStar.x = 130,
                this.mStar.y = 170,
                this.addChild(this.mStar)
        }
        ,
        t.prototype.onInitData = function() {
            this.mBg = this.getChildByName("bg"),
                this.btnWin = this.getChildByName("btnWin1"),
                this.btnMony = this.getChildByName("btnMony1"),
                this.btnRanKing = this.getChildByName("btnRanKing1"),
                this.btnExchange = this.getChildByName("btnExchange1"),
                this.bgCon1 = this.getChildByName("bg_con1"),
                this.bgCon2 = this.getChildByName("bg_con2"),
                this.zText1 = this.getChildByName("zText1"),
                this.yText1 = this.getChildByName("yText1"),
                this.ranText = this.getChildByName("ranText"),
                this.exchangeText = this.getChildByName("exchangeText"),
                this.btnWin.touchEnabled = !0,
                this.btnMony.touchEnabled = !0,
                this.btnRanKing.touchEnabled = !0,
                this.btnExchange.touchEnabled = !0,
                this.btnWin.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouch, this),
                this.btnMony.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouch, this),
                this.btnRanKing.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouch, this),
                this.btnExchange.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouch, this),
                this.addScroll(),
                this.addRanScroll(),
                this.addExchangeScroll(),
                this.RanKingTitle = new egret.Bitmap,
                this.addChild(this.RanKingTitle)
        }
        ,
        t.prototype.updataInfo = function(e) {
            1 == e ? (this.mBg.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zq_bg_zj.png")),
                this.btnWin.visible = !1,
                this.bgCon2.visible = !1,
                this.zText1.visible = !1,
                this._mMoneyTip.visible = !1,
                this.bgCon1.visible = !0,
                this.btnMony.visible = !0,
                this.yText1.visible = !0,
                this.btnRanKing.visible = !0,
                this.ranText.visible = !0,
                this.RanKingTitle.visible = !1,
                this.btnExchange.visible = !0,
                this.exchangeText.visible = !0,
                this.addMoney.visible = !1,
                this.initMoneyData(),
                this.hideMoneyRecord(),
                this.removeRanKingData(),
                this.addMoneyText.visible = !1,
                this.exchangeMoneyText.visible = !1,
                this.removeExchangeData()) : 2 == e ? (this.mBg.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zq_bg_yj.png")),
                this.addMoneyText.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zi_yongjin.png")),
                this.addMoneyText.visible = !0,
                this.exchangeMoneyText.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zi_kdhjb.png")),
                this.exchangeMoneyText.visible = !0,
                this.btnWin.visible = !0,
                this.bgCon2.visible = !0,
                this.bgCon2.$setBitmapData(GResCache.getRes("resource/assets/images/ui/jl_tiaotiao.png")),
                this.zText1.visible = !0,
                this._mMoneyTip.visible = !0,
                this.bgCon1.visible = !1,
                this.btnMony.visible = !1,
                this.btnRanKing.visible = !0,
                this.yText1.visible = !1,
                this.ranText.visible = !0,
                this.RanKingTitle.visible = !1,
                this.btnExchange.visible = !0,
                this.exchangeText.visible = !0,
                this.addMoney.visible = !1,
                this.removeMoneyData(),
                this.showMoneyRecord(),
                this.removeRanKingData(),
                this.removeExchangeData()) : 3 == e ? (t.getInstance.refesh(),
                this.mBg.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zq_bg_dh.png")),
                this.btnWin.visible = !0,
                this.bgCon2.visible = !0,
                this.bgCon2.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zq_jl_di.png")),
                this.zText1.visible = !0,
                this._mMoneyTip.visible = !0,
                this.addMoneyText.visible = !1,
                this.exchangeMoneyText.visible = !1,
                this.bgCon1.visible = !1,
                this.btnMony.visible = !0,
                this.btnRanKing.visible = !0,
                this.btnExchange.visible = !1,
                this.yText1.visible = !0,
                this.ranText.visible = !0,
                this.RanKingTitle.visible = !0,
                this.addMoney.visible = !0,
                this.RanKingTitle.y = 235,
                this.RanKingTitle.x = 0,
                this.RanKingTitle.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zi_duihuandezi.png")),
                this.exchangeText.visible = !1,
                this.removeMoneyData(),
                this.hideMoneyRecord(),
                this.removeRanKingData(),
                this.addMoneyText.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zi_ljdhd.png")),
                this.initExchangeData()) : 4 == e && (this.mBg.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zq_bg_ph.png")),
                    this.btnWin.visible = !0,
                    this.bgCon2.visible = !1,
                    this.zText1.visible = !0,
                    this.ranText.visible = !1,
                    this._mMoneyTip.visible = !1,
                    this.bgCon1.visible = !0,
                    this.btnMony.visible = !0,
                    this.btnRanKing.visible = !1,
                    this.yText1.visible = !0,
                    this.btnExchange.visible = !0,
                    this.exchangeText.visible = !0,
                    this.addMoney.visible = !1,
                    this.RanKingTitle.y = 235,
                    this.RanKingTitle.x = 0,
                    this.RanKingTitle.$setBitmapData(GResCache.getRes("resource/assets/images/ui/zi_paihangbang.png")),
                    this.RanKingTitle.visible = !0,
                    this.removeMoneyData(),
                    this.hideMoneyRecord(),
                    this.initRanKingData(),
                    this.addMoneyText.visible = !1,
                    this.exchangeMoneyText.visible = !1,
                    this.removeExchangeData())
        }
        ,
        t.prototype.showMoneyRecord = function() {
            var e = MoneyRecord.getInstance;
            e.updataMoney(),
                e.x = 30,
                e.y = 240,
                e.setAddMoneyText = GameValue.yongjin + "",
                e.setexchangeMoney(GameValue.commissionGold + ""),
                e.setNoJsMoneyText = MoneyMgr.mNoJsMon,
                this.addChild(e)
        }
        ,
        t.prototype.hideMoneyRecord = function() {
            void 0 != MoneyRecord.getInstance.parent && (MoneyRecord.getInstance.removeRecord(),
                this.removeChild(MoneyRecord.getInstance))
        }
        ,
        t.prototype.removeMoneyData = function() {
            for (var e = 0; e < this.mMoneyMap.size; e++)
                this.mMoneyMap.Gget(e).removeItem();
            this.scrollView.setScrollTop(0)
        }
        ,
        t.prototype.removeRanKingData = function() {
            for (var e = 0; e < this.mRanKingMap.size; e++)
                this.mRanKingMap.Gget(e).removeItem();
            this.scrollRanView.setScrollTop(0)
        }
        ,
        t.prototype.removeExchangeData = function() {
            for (var e = 0; e < this.mExchangeMap.size; e++)
                this.mExchangeMap.Gget(e).removeItem();
            this.scrollExchangeView.setScrollTop(0)
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this),
                this.removeMoneyData(),
                this.hideMoneyRecord(),
                this.removeRanKingData(),
            void 0 != this.mStar && (GObjPool.getInstance.Gadd2Pool(this.mStar),
            void 0 != this.mStar.parent && this.mStar.parent.removeChild(this.mStar),
                delete this.mStar),
            this.btnWin.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) && this.btnWin.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouch, this),
            this.btnMony.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) && this.btnMony.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouch, this),
            this.btnRanKing.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) && this.btnRanKing.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouch, this),
            this.btnExchange.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) && this.btnExchange.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouch, this),
            void 0 != this.scrollView.parent && this.scrollView.parent.removeChild(this.scrollView),
            void 0 != this.scrollRanView.parent && this.scrollRanView.parent.removeChild(this.scrollRanView),
            void 0 != this.scrollExchangeView.parent && this.scrollExchangeView.parent.removeChild(this.scrollExchangeView),
                this.RanKingTitle.visible = !1
        }
        ,
        t.prototype.OnTouch = function(e) {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1),
                e.target == this.btnWin ? this.updataInfo(1) : e.target == this.btnMony ? this.updataInfo(2) : e.target == this.btnExchange ? this.updataInfo(3) : e.target == this.btnRanKing && this.updataInfo(4)
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(MoneyWnd.prototype, "MoneyWnd");
var NoticeUI = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.num1 = 0,
            t.num2 = 0,
            t.mSpaceNum = 50,
            t.mIs = !1,
            t.mLeftIs = !1,
            t.mNameArr = ["阳光暖男", "傲然于心", "Amor︶瑾年°", "北岛情书", "安初夏", "初遇″", "薇笶向暖", "风无痕", "習慣有袮", "李君昊", "张瑾宛", "刘国艳", "陈李文", "毛婧藐", "谢文婍", "郭雨莫", "董艾静"],
            t.mLeftNoticeNum = ["200", "160", "120", "100", "80", "60", "50", "40", "30"],
            t.mNoticeTextArr = ["哈哈哈，真给力，第一次就中50金币！", "花了2000，赚回2400了，略有小赚！", "睡前一抓，100入账，这波不亏。", "这几天运气真的好，20中160。", "抓了一周小亏，终于爆发了，连中2个200！", "佣金真是爽，半夜叮叮叮的，真是躺着赚钱了。", "100连抽，中的少，小红包多，整体不亏，关键刺激，明天继续。", "6金币的中奖率超高，可惜就是金额小。", "第8次中200，赚翻了，哈哈。", "祖传秘方，夹的越准，中奖率越高！"],
            t.mSec = 0,
            t.mSec2 = 0,
            t.mNtCon = new egret.DisplayObjectContainer,
            t.mNoticeCon1 = new egret.DisplayObjectContainer,
            t.mNoticeCon2 = new egret.DisplayObjectContainer,
            t.initData(),
            t.mNtCon.addChild(t.mNoticeCon1),
            t.mNtCon.addChild(t.mNoticeCon2),
            t.addChild(t.mNtCon),
            t.mLeftNoticeCon = new egret.DisplayObjectContainer,
            t.addChild(t.mLeftNoticeCon),
            t.sideNotice(),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == this.mInstance && (this.mInstance = new t),
                    this.mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.initData = function() {
            this.mNtCon.x = 8,
                this.mNtCon.y = 668,
                this.mNoticeCon2.x = 0,
                this.mNoticeCon2.y = this.mSpaceNum,
                this.mHeadImg1 = new egret.Bitmap,
                this.mHeadImg2 = new egret.Bitmap,
                this.mHeadImg1.y = 2,
                this.mHeadImg2.y = 2,
                this.mNoticeCon1.addChild(this.mHeadImg1),
                this.mNoticeCon2.addChild(this.mHeadImg2),
                this.mNoticeText1 = new egret.TextField,
                this.mNoticeText2 = new egret.TextField,
                this.mNoticeText1.x = this.mHeadImg1.$getWidth() + 15,
                this.mNoticeText1.y = 5,
                this.mNoticeText2.x = this.mHeadImg2.$getWidth() + 15,
                this.mNoticeText2.y = 5,
                this.mNoticeCon1.addChild(this.mNoticeText1),
                this.mNoticeCon2.addChild(this.mNoticeText2),
                this.setStyle(this.mNoticeText1),
                this.setStyle(this.mNoticeText2),
                this.initSmake(),
                this.notice1(),
                this.notice2()
        }
        ,
        t.prototype.mTimer = function() {
            this.mIs = !0
        }
        ,
        t.prototype.initSmake = function() {
            this.mSheMake = new egret.Shape,
                this.mSheMake.graphics.beginFill(0),
                this.mSheMake.graphics.drawRect(8, 666, 524, 35),
                this.mSheMake.graphics.endFill(),
                this.addChild(this.mSheMake),
                this.mNtCon.mask = this.mSheMake
        }
        ,
        t.prototype.setStyle = function(e) {
            e.textColor = 16776960,
                e.width = 700,
                e.textAlign = "left",
                e.size = 21,
                e.fontFamily = "微软雅黑"
        }
        ,
        t.prototype.sideNotice = function() {
            this.mLeftNoticeCon.x = -300,
                this.mLeftNoticeCon.y = 350,
                this.mNoticeBg = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/kuang_gonggao.png")),
                this.mHeadImg3 = new egret.Bitmap,
                this.mHongBao = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/gonggao_hb.png")),
                this.mHeadImg3.x = 8,
                this.mHeadImg3.y = 18,
                this.mHongBao.x = 160,
                this.mHongBao.y = .5 * this.mNoticeBg.height - 28,
                this.mLeftNoticeCon.addChild(this.mNoticeBg),
                this.mLeftNoticeCon.addChild(this.mHeadImg3),
                this.mLeftNoticeCon.addChild(this.mHongBao),
                this.mLeftNoticeText = new egret.TextField,
                this.mLeftNoticeText.x = 48,
                this.mLeftNoticeText.y = .5 * this.mNoticeBg.height - 23,
                this.mLeftNoticeText.lineSpacing = 7,
                this.mLeftNoticeText.size = 18,
                this.mLeftNoticeCon.addChild(this.mLeftNoticeText),
                this.leftNotice()
        }
        ,
        t.prototype.mTimer2 = function() {
            this.mT1 = egret.Tween.get(this.mLeftNoticeCon),
                this.mT1.to({
                    x: 0
                }, 500),
                this.mT1.wait(2500),
                this.mT1.call(this.mTween, this)
        }
        ,
        t.prototype.mTween = function() {
            this.mT2 = egret.Tween.get(this.mLeftNoticeCon),
                this.mT2.to({
                    x: -300
                }, 500),
                this.mT2.call(this.mTween2, this)
        }
        ,
        t.prototype.mTween2 = function() {
            this.leftNotice(),
                egret.Tween.removeTweens(this.mLeftNoticeCon)
        }
        ,
        t.prototype.updata = function() {
            this.mSec++,
                this.mSec2++,
            this.mSec >= this.randomTmpe(350, 6500) && (this.mSec = 0,
                this.mIs = !0),
            this.mSec2 >= this.randomTmpe(450, 8500) && (this.mSec2 = 0,
                this.mTimer2()),
            0 != this.mIs && (this.mNoticeCon1.y -= 2,
                this.mNoticeCon2.y -= 2,
            this.mNoticeCon1.y == -this.mSpaceNum && (this.mNoticeCon1.y = this.mSpaceNum,
                this.mIs = !1,
                this.notice1()),
            this.mNoticeCon2.y == -this.mSpaceNum && (this.mNoticeCon2.y = this.mSpaceNum,
                this.mIs = !1,
                this.notice2()))
        }
        ,
        t.prototype.randomTmpe = function(e, t) {
            var i = t - e + 1;
            return Math.floor(Math.random() * i + e)
        }
        ,
        t.prototype.notice1 = function() {
            var e = this.randomTmpe(0, this.mNoticeTextArr.length - 1);
            this.mNoticeText1.text = this.mNoticeTextArr[e],
                this.moveText(e, this.mNoticeText1, this.mHeadImg1, 2),
                this.mNoticeText1.x = this.mHeadImg1.$getWidth() + 15,
                this.addTween(this.mNoticeText2, this.mNoticeCon2)
        }
        ,
        t.prototype.notice2 = function() {
            var e = this.randomTmpe(0, this.mNoticeTextArr.length - 1);
            this.mNoticeText2.text = this.mNoticeTextArr[e],
                this.moveText(e, this.mNoticeText2, this.mHeadImg2, 1),
                this.mNoticeText2.x = this.mHeadImg2.$getWidth() + 15,
                this.addTween(this.mNoticeText1, this.mNoticeCon1)
        }
        ,
        t.prototype.moveText = function(e, t, i, n) {
            10 == e || 11 == e ? (t.width = 10 == e ? 1350 : 800,
                i.$setBitmapData(GResCache.getRes("resource/assets/images/ui/dgonggao.png"))) : (t.width = 700,
                i.$setBitmapData(GResCache.getRes("resource/assets/images/ui/touxiang0" + this.randomTmpe(0, 36) + ".png")))
        }
        ,
        t.prototype.leftNotice = function() {
            var e = this.mLeftNoticeNum[this.randomTmpe(0, this.mLeftNoticeNum.length - 1)];
            this.mHeadImg3.$setBitmapData(GResCache.getRes("resource/assets/images/ui/touxiang0" + this.randomTmpe(1, 36) + ".png")),
                this.mLeftNoticeText.textFlow = [{
                    text: this.mNameArr[this.randomTmpe(0, this.mNameArr.length - 1)] + "\n",
                    style: {
                        textColor: 16777215
                    }
                }, {
                    text: "中了",
                    style: {
                        textColor: 16305178
                    }
                }, {
                    text: e,
                    style: {
                        textColor: 16776960
                    }
                }, {
                    text: "金币。",
                    style: {
                        textColor: 16305178
                    }
                }]
        }
        ,
        t.prototype.addTween = function(e, t) {
            if (e.textWidth >= 407) {
                var i = e.$getWidth() - 407
                    , n = egret.Tween.get(t);
                n.wait(1e3),
                    n.to({
                        x: -i
                    }, 6.5 * e.textWidth),
                    n.wait(1200),
                    n.call(this.mT, this)
            }
        }
        ,
        t.prototype.mT = function() {
            egret.Tween.removeTweens(this.mNoticeCon1),
                egret.Tween.removeTweens(this.mNoticeCon2),
                this.mNoticeCon1.x = 0,
                this.mNoticeCon2.x = 0
        }
        ,
        t.prototype.hide = function() {}
        ,
        t
}(MDisplay.MUISprite);
__reflect(NoticeUI.prototype, "NoticeUI");
var PayWnd = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.GWndConfig("payWnd", GUIManager.getInstance.topLay, MDisplay.WndShowType.ALPHA),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == this.mInstance && (this.mInstance = new t),
                    this.mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.show = function() {
            e.prototype.show.call(this),
                RechargeWnd.getInstance.hide(),
                this.x = 0,
                this.y = -10,
                this.touchEnabled = !0,
                this._mCloseBnt = this.getChildByName("closeBnt"),
                this._mCloseBnt.touchEnabled = !0,
                this._mCloseBnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mCloseBnt.x = 452 + .5 * this._mCloseBnt.width,
                this._mCloseBnt.y = 15 + .5 * this._mCloseBnt.height,
                this._mCloseBnt.anchorOffsetX = .5 * this._mCloseBnt.width,
                this._mCloseBnt.anchorOffsetY = .5 * this._mCloseBnt.height,
                this._mWXBnt = this.getChildByName("wxBnt"),
                this._mWXBnt.touchEnabled = !0,
                this._mWXBnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mWXBnt.x = 163 + .5 * this._mWXBnt.width,
                this._mWXBnt.y = 698 + .5 * this._mWXBnt.height,
                this._mWXBnt.anchorOffsetX = .5 * this._mWXBnt.width,
                this._mWXBnt.anchorOffsetY = .5 * this._mWXBnt.height,
                this.showCode()
        }
        ,
        t.prototype.scaleBnt = function(e) {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
            var t = egret.Tween.get(e.target).to({
                scaleX: .85,
                scaleY: .85
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100);
            e.target == this._mCloseBnt ? t.call(this.hide, this) : e.target == this._mWXBnt && window.callWXSYS()
        }
        ,
        t.prototype.showData = function(e) {
            this._mPayNum = e,
                this.show()
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this),
                this.fresh(),
                GTimerMag.getInstance.addTimerTask("freshMoneyRequest", 6, 1500, this.fresh, this),
                this._mCloseBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mWXBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this)
        }
        ,
        t.prototype.fresh = function() {
            HTTPRequest.getInstance.freshMoneyRequest()
        }
        ,
        t.prototype.hide = function() {
            e.prototype.hide.call(this),
                this.clearCode()
        }
        ,
        t.prototype.showCode = function() {
            void 0 == this._codeRect && (this._codeRect = new egret.Rectangle(117,273,305,305));
            var e = document.getElementById("gameDiv");
            this._codeImg = document.createElement("img"),
                this._codeImg.style.position = "absolute",
                e.appendChild(this._codeImg);
            var t = HTTPRequest.getInstance.httpHeadUrl + HTTPRequest.getInstance.url + "/p/pay_apply.php";
            this._codeImg.src = t + "?id=" + GameValue.userId + "&a=" + this._mPayNum + "&t=" + GTimerMag.getInstance.getCurrTime(),
                this._codeImg.style.display = "inline",
                this.onResize(),
                GameMain.getInstance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this)
        }
        ,
        t.prototype.clearCode = function() {
            this._codeImg && this._codeImg.remove(),
                GameMain.getInstance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this)
        }
        ,
        t.prototype.onResize = function() {
            if (this._codeImg && this._codeRect) {
                var e = document.body.clientWidth / 540
                    , t = document.body.clientHeight / 878;
                this._codeImg.style.width = this._codeRect.width * e + "px",
                    this._codeImg.style.height = this._codeRect.height * t + "px",
                    this._codeImg.style.left = this._codeRect.x * e + "px",
                    this._codeImg.style.top = this._codeRect.y * t + "px"
            }
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(PayWnd.prototype, "PayWnd");
var promptWnd = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mGroup = new egret.DisplayObjectContainer,
            t._mHeiBG = new egret.Bitmap,
            GUIManager.getInstance.tipLay.addChild(t._mGroup),
            t.GWndConfig("tsWnd", GUIManager.getInstance.tipLay, MDisplay.WndShowType.SCALE),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.show = function() {
            e.prototype.show.call(this),
                this.shadowMC(),
                this.x = .5 * GameMain.getInstance.StageWidth,
                this.y = .5 * GameMain.getInstance.StageHeight - 20,
                this._mTipText = this.getChildByName("text"),
                1 == t._mType ? this._mTipText.$setBitmapData(GResCache.getRes("resource/assets/images/ui/sctswz_1.png")) : this._mTipText.$setBitmapData(GResCache.getRes("resource/assets/images/ui/sctswz_2.png")),
                this._mColseBnt = this.getChildByName("btnClose"),
                this._mColseBnt.x = 464.8 + .5 * this._mColseBnt.width,
                this._mColseBnt.y = 96.95 + .5 * this._mColseBnt.height,
                this._mColseBnt.anchorOffsetX = .5 * this._mColseBnt.width,
                this._mColseBnt.anchorOffsetY = .5 * this._mColseBnt.height,
                this._mColseBnt.touchEnabled = !0,
                this._mColseBnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mSureBnt = this.getChildByName("btnSure"),
                this._mSureBnt.x = 192.5 + .5 * this._mSureBnt.width,
                this._mSureBnt.y = 566 + .5 * this._mSureBnt.height,
                this._mSureBnt.anchorOffsetX = .5 * this._mSureBnt.width,
                this._mSureBnt.anchorOffsetY = .5 * this._mSureBnt.height,
                this._mSureBnt.touchEnabled = !0,
                this._mSureBnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this)
        }
        ,
        t.prototype.scaleBnt = function(e) {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
            var t = egret.Tween.get(e.target).to({
                scaleX: .85,
                scaleY: .85
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100);
            (e.target == this._mColseBnt || e.target == this._mSureBnt) && t.call(this.hide, this)
        }
        ,
        t.prototype.shadowMC = function() {
            this._mHeiBG.$setBitmapData(GResCache.getRes("resource/assets/images/ui/heise.png")),
                this._mHeiBG.x = 0,
                this._mHeiBG.y = 0,
                this._mHeiBG.alpha = 0,
                this._mHeiBG.touchEnabled = !0,
                this._mGroup.addChild(this._mHeiBG),
                this._mHeiBG.touchEnabled = !0;
            var e = egret.Tween.get(this._mHeiBG);
            e.to({
                alpha: .5
            }, 300)
        }
        ,
        t.prototype.cleanHeiBG = function() {
            void 0 != this._mHeiBG.parent && (this._mHeiBG.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mHeiBG.parent.removeChild(this._mHeiBG))
        }
        ,
        t.prototype.onInit = function() {
            e.prototype.onInit.call(this)
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this),
                this._mColseBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mSureBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this.cleanHeiBG()
        }
        ,
        t
}(MDisplay.MUIWnd);
promptWnd._mType = 1,
    __reflect(promptWnd.prototype, "promptWnd");
var PushSucc = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mType = 1,
            t._mGroup = new egret.DisplayObjectContainer,
            t._mHeiBG = new egret.Bitmap,
            GUIManager.getInstance.tipLay.addChild(t._mGroup),
            t.GWndConfig("PushSucc", GUIManager.getInstance.tipLay, MDisplay.WndShowType.ALPHA),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == this.mInstance && (this.mInstance = new t),
                    this.mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.showData = function(e) {
            this._mType = e,
                this.show()
        }
        ,
        t.prototype.show = function() {
            e.prototype.show.call(this),
                this.shadowMC(),
                this.x = 0,
                this.y = -20,
                this._mType == t.Change_wnd ? this.getChildByName("title").$setVisible(!0) : this.getChildByName("title").$setVisible(!1),
                this._mSureBnt = this.getChildByName("closeBnt"),
                this._mSureBnt.x = 192.5 + .5 * this._mSureBnt.width,
                this._mSureBnt.y = 594.3 + .5 * this._mSureBnt.height,
                this._mSureBnt.anchorOffsetX = .5 * this._mSureBnt.width,
                this._mSureBnt.anchorOffsetY = .5 * this._mSureBnt.height,
                this._mSureBnt.touchEnabled = !0,
                this._mSureBnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this)
        }
        ,
        t.prototype.scaleBnt = function(e) {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
            var t = egret.Tween.get(e.target).to({
                scaleX: .85,
                scaleY: .85
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100);
            e.target == this._mSureBnt && t.call(this.hide, this)
        }
        ,
        t.prototype.shadowMC = function() {
            this._mHeiBG.$setBitmapData(GResCache.getRes("resource/assets/images/ui/heise.png")),
                this._mHeiBG.x = 0,
                this._mHeiBG.y = 0,
                this._mHeiBG.alpha = 0,
                this._mHeiBG.touchEnabled = !0,
                this._mGroup.addChild(this._mHeiBG);
            var e = egret.Tween.get(this._mHeiBG);
            e.to({
                alpha: .5
            }, 300),
                e.call(this.showCode, this)
        }
        ,
        t.prototype.cleanHeiBG = function() {
            void 0 != this._mHeiBG.parent && this._mHeiBG.parent.removeChild(this._mHeiBG)
        }
        ,
        t.prototype.showCode = function() {
            if (void 0 == this._codeRect && (this._codeRect = new egret.Rectangle(64,150,413,413)),
                null == this._codeImg) {
                var e = document.getElementById("gameDiv");
                this._codeImg = document.createElement("img"),
                    this._codeImg.src = HTTPRequest.getInstance.httpHeadUrlCDN + "/game_zww2/code/" + GameValue.codeURL + "/agentCode1.png",
                    GameValue.yongjin >= 1e3 && GameValue.yongjin < 2e3 ? this._codeImg.src = HTTPRequest.getInstance.httpHeadUrlCDN + "/game_zww2/code/" + GameValue.codeURL + "/agentCode1.png" : GameValue.yongjin >= 2e3 && GameValue.yongjin < 5e3 ? this._codeImg.src = HTTPRequest.getInstance.httpHeadUrlCDN + "/game_zww2/code/" + GameValue.codeURL + "/agentCode2.png" : GameValue.yongjin > 5e3 && (this._codeImg.src = HTTPRequest.getInstance.httpHeadUrlCDN + "/game_zww2/code/" + GameValue.codeURL + "/agentCode3.png"),
                    this._codeImg.style.position = "absolute",
                    e.appendChild(this._codeImg)
            }
            this._codeImg.style.display = "inline",
                this.onResize(),
                GameMain.getInstance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this)
        }
        ,
        t.prototype.clearCode = function() {
            this._codeImg && (this._codeImg.style.display = "none"),
                GameMain.getInstance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this)
        }
        ,
        t.prototype.onResize = function() {
            if (this._codeImg && this._codeRect) {
                var e = document.body.clientWidth / 540
                    , t = document.body.clientHeight / 878;
                this._codeImg.style.width = this._codeRect.width * e + "px",
                    this._codeImg.style.height = this._codeRect.height * t + "px",
                    this._codeImg.style.left = this._codeRect.x * e + "px",
                    this._codeImg.style.top = this._codeRect.y * t + "px"
            }
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this),
                this._mSureBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this.cleanHeiBG(),
                this.clearCode(),
            this._mType == t.DaiLi_wnd && (TipUI.getInstance._mTipNum = 7,
                TipUI.getInstance.show())
        }
        ,
        t
}(MDisplay.MUIWnd);
PushSucc.Change_wnd = 1,
    PushSucc.DaiLi_wnd = 2,
    __reflect(PushSucc.prototype, "PushSucc");
var PushTipWnd = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mGroup = new egret.DisplayObjectContainer,
            t._mHeiBG = new egret.Bitmap,
            GUIManager.getInstance.mostLay.addChild(t._mGroup),
            t.GWndConfig("PushTipWnd", GUIManager.getInstance.mostLay, MDisplay.WndShowType.ALPHA),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == this.mInstance && (this.mInstance = new t),
                    this.mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.show = function() {
            e.prototype.show.call(this),
                this.shadowMC(),
                this.x = 0,
                this.y = 72,
                this._mSureBnt = this.getChildByName("closeBnt"),
                this._mSureBnt.$setVisible(!0),
                this._mSureBnt.x = 462 + .5 * this._mSureBnt.width,
                this._mSureBnt.y = 16 + .5 * this._mSureBnt.height,
                this._mSureBnt.anchorOffsetX = .5 * this._mSureBnt.width,
                this._mSureBnt.anchorOffsetY = .5 * this._mSureBnt.height,
                this._mSureBnt.touchEnabled = !0,
                this._mSureBnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this)
        }
        ,
        t.prototype.scaleBnt = function(e) {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
            var t = egret.Tween.get(e.target).to({
                scaleX: .85,
                scaleY: .85
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100);
            e.target == this._mSureBnt && t.call(this.hide, this)
        }
        ,
        t.prototype.shadowMC = function() {
            this._mHeiBG.$setBitmapData(GResCache.getRes("resource/assets/images/ui/heise.png")),
                this._mHeiBG.x = 0,
                this._mHeiBG.y = 0,
                this._mHeiBG.alpha = 0,
                this._mHeiBG.touchEnabled = !0,
                this._mGroup.addChild(this._mHeiBG),
                this._mHeiBG.touchEnabled = !0,
                this._mHeiBG.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.hide, this);
            var e = egret.Tween.get(this._mHeiBG);
            e.to({
                alpha: .5
            }, 300),
                e.call(this.showCode, this)
        }
        ,
        t.prototype.cleanHeiBG = function() {
            void 0 != this._mHeiBG.parent && (this._mHeiBG.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.hide, this),
                this._mHeiBG.parent.removeChild(this._mHeiBG))
        }
        ,
        t.prototype.showCode = function() {
            if (void 0 == this._codeRect && (this._codeRect = new egret.Rectangle(120,320,303,303)),
                null == this._codeImg) {
                var e = document.getElementById("gameDiv");
                this._codeImg = document.createElement("img"),
                    this._codeImg.src = HTTPRequest.getInstance.httpHeadUrlCDN + "/game_zww2/code/" + GameValue.codeURL + "/questionCode.png",
                    this._codeImg.style.position = "absolute",
                    e.appendChild(this._codeImg)
            }
            this._codeImg.style.display = "inline",
                this.onResize(),
                GameMain.getInstance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this)
        }
        ,
        t.prototype.clearCode = function() {
            this._codeImg && (this._codeImg.style.display = "none"),
                GameMain.getInstance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this)
        }
        ,
        t.prototype.onResize = function() {
            if (this._codeImg && this._codeRect) {
                var e = document.body.clientWidth / 540
                    , t = document.body.clientHeight / 878;
                this._codeImg.style.width = this._codeRect.width * e + "px",
                    this._codeImg.style.height = this._codeRect.height * t + "px",
                    this._codeImg.style.left = this._codeRect.x * e + "px",
                    this._codeImg.style.top = this._codeRect.y * t + "px"
            }
        }
        ,
        t.prototype.hide = function() {
            e.prototype.hide.call(this),
            void 0 != this._mSureBnt && this._mSureBnt.$setVisible(!1)
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this),
                this._mSureBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this.cleanHeiBG(),
                this.clearCode()
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(PushTipWnd.prototype, "PushTipWnd");
var PushWnd = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.money = 0,
            t._mGroup = new egret.DisplayObjectContainer,
            t._mHeiBG = new egret.Bitmap,
            GUIManager.getInstance.topLay.addChild(t._mGroup),
            t.GWndConfig("pushWnd", GUIManager.getInstance.topLay, MDisplay.WndShowType.SCALE),
            t._mHongBaoText = FontMgr.getText(FontMgr.FONT_2),
            t._mHongBaoText.letterSpacing = -2,
            t._mHongBaoText.width = 500,
            t._mHongBaoText.textAlign = egret.HorizontalAlign.CENTER,
            t.timeTipText(),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.timeTipText = function() {
            this._mText = new egret.TextField,
                this._mText.textAlign = egret.HorizontalAlign.CENTER,
                this._mText.textColor = 8838911,
                this._mText.width = 500,
                this._mText.size = 27,
                this._mText.x = 20,
                this._mText.y = 570,
                this._mText.text = "每次兑换取整,上限为200金币.",
                this._mText.fontFamily = "宋体"
        }
        ,
        t.prototype.show = function() {
            e.prototype.show.call(this),
                this.shadowMC(),
                this.x = .5 * GameMain.getInstance.StageWidth + 2,
                this.y = .5 * GameMain.getInstance.StageHeight - 20,
                this._mContinueBnt = this.getChildByName("pushBnt"),
                this._mContinueBnt.x = 163 + .5 * this._mContinueBnt.width,
                this._mContinueBnt.y = 455 + .5 * this._mContinueBnt.height,
                this._mContinueBnt.anchorOffsetX = .5 * this._mContinueBnt.width,
                this._mContinueBnt.anchorOffsetY = .5 * this._mContinueBnt.height,
                this._mContinueBnt.touchEnabled = !0,
                this._mContinueBnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mCloseBnt = this.getChildByName("closeBnt"),
                this._mCloseBnt.x = 464 + .5 * this._mCloseBnt.width,
                this._mCloseBnt.y = 16 + .5 * this._mCloseBnt.height,
                this._mCloseBnt.anchorOffsetX = .5 * this._mCloseBnt.width,
                this._mCloseBnt.anchorOffsetY = .5 * this._mCloseBnt.height,
                this._mCloseBnt.touchEnabled = !0,
                this._mCloseBnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this.setMoneyPrice(),
                this.addChild(this._mText)
        }
        ,
        t.prototype.setMoneyPrice = function() {
            this.money = 0,
                GameValue.residualGold < 1 ? this.money = 0 : GameValue.residualGold > 200 ? this.money = 200 : this.money = Math.floor(GameValue.residualGold),
                this._mHongBaoText.text = this.money + "元",
                this._mHongBaoText.x = 22,
                this._mHongBaoText.y = 373,
                this.addChild(this._mHongBaoText);
            var e = 1;
            this.money > 50 && this.money <= 100 ? e = 2 : this.money > 100 && this.money <= 150 ? e = 3 : this.money > 150 && this.money <= 200 && (e = 4),
                this._mWpTextrue = this.getChildByName("wp"),
                this._mWpTextrue.$setBitmapData(GResCache.getRes("resource/assets/images/ui/wupin" + e + ".png"))
        }
        ,
        t.prototype.scaleBnt = function(e) {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
            var t = egret.Tween.get(e.target).to({
                scaleX: .85,
                scaleY: .85
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100);
            e.target == this._mContinueBnt ? t.call(this.requestSever, this) : e.target == this._mCloseBnt && t.call(this.hide, this)
        }
        ,
        t.prototype.autoPush = function() {
            this.money = 0,
                GameValue.bonusdualGold < 1 ? this.money = 0 : GameValue.bonusdualGold > 1e3 ? this.money = 1e3 : this.money = Math.floor(GameValue.bonusdualGold),
                this.requestSever()
        }
        ,
        t.prototype.requestSever = function() {
            this.money > 0 && HTTPRequest.getInstance.pushRequest(this.money),
                FakeMallWnd.getInstance.show()
        }
        ,
        t.prototype.shadowMC = function() {
            this._mHeiBG.$setBitmapData(GResCache.getRes("resource/assets/images/ui/heise.png")),
                this._mHeiBG.x = 0,
                this._mHeiBG.y = 0,
                this._mHeiBG.alpha = 0,
                this._mHeiBG.touchEnabled = !0,
                this._mGroup.addChild(this._mHeiBG);
            var e = egret.Tween.get(this._mHeiBG);
            e.to({
                alpha: .5
            }, 300)
        }
        ,
        t.prototype.cleanHeiBG = function() {
            void 0 != this._mHeiBG.parent && this._mHeiBG.parent.removeChild(this._mHeiBG)
        }
        ,
        t.prototype.onInit = function() {
            e.prototype.onInit.call(this)
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this),
                this.cleanHeiBG(),
                this._mContinueBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mCloseBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
            void 0 != this._mHongBaoText.parent && this._mHongBaoText.parent.removeChild(this._mHongBaoText)
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(PushWnd.prototype, "PushWnd");
var QCodeDistinguish = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._loadedImg1 = !1,
            t._loadedImg2 = !1,
            t.GWndConfig("QCodeDistinguish", GUIManager.getInstance.topLay),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == this._mInstance && (this._mInstance = new t),
                    this._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.onInit = function() {
            e.prototype.onInit.call(this),
                this.getChildByName("closeBnt").touchEnabled = !0
        }
        ,
        t.prototype.show = function() {
            e.prototype.show.call(this)
        }
        ,
        t.prototype.onShow = function() {
            this.showCode(),
                this.touchEnabled = !0,
                this.getChildByName("closeBnt").addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this),
                this.getChildByName("closeBnt").x = 470 + .5 * this.getChildByName("closeBnt").width,
                this.getChildByName("closeBnt").y = 3 + .5 * this.getChildByName("closeBnt").height,
                this.getChildByName("closeBnt").anchorOffsetX = .5 * this.getChildByName("closeBnt").width,
                this.getChildByName("closeBnt").anchorOffsetY = .5 * this.getChildByName("closeBnt").height
        }
        ,
        t.prototype.hide = function() {
            e.prototype.hide.call(this),
                this.clearCode(),
            this.getChildByName("closeBnt") && this.getChildByName("closeBnt").removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this)
        }
        ,
        t.prototype.showCode = function() {
            var e = document.getElementById("gameDiv");
            this._codeImg = document.getElementById("codeImg"),
            null == this._codeImg && (this._codeImg = document.createElement("img"),
                this._codeImg.id = "codeImg",
                this._codeImg.style.position = "absolute",
                e.appendChild(this._codeImg)),
                this._codeImg.style.display = "inline",
            void 0 == this._canvas && (this._canvas = document.createElement("canvas"),
                this._canvas.width = 462,
                this._canvas.height = 683),
            void 0 == this._img && (this._img = document.createElement("img")),
            void 0 == this._img2 && (this._img2 = document.createElement("img")),
                this._img.onload = this.img1Onload,
                this._img2.onload = this.img2Onload,
                this._img.src = "resource/assets/images/ui/fs2vm.png";
            var t = HTTPRequest.getInstance.httpHeadUrl + HTTPRequest.getInstance.url + "/g/getTG.php";
            GResCache.loadResByUrl(t + "?id=" + GameValue.userId, this.onloaded, this, RES.ResourceItem.TYPE_TEXT),
                GameMain.getInstance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this)
        }
        ,
        t.prototype.onloaded = function(e) {
            this._img2.src = "data:image/png;base64," + e
        }
        ,
        t.prototype.img2Onload = function() {
            t.getInstance.finishLoad(2)
        }
        ,
        t.prototype.img1Onload = function() {
            t.getInstance.finishLoad(1)
        }
        ,
        t.prototype.finishLoad = function(e) {
            1 == e && (this._loadedImg1 = !0),
            2 == e && (this._loadedImg2 = !0),
                this.imgDraw()
        }
        ,
        t.prototype.imgDraw = function() {
            if (this._loadedImg1 && this._loadedImg2) {
                var e = this._canvas.getContext("2d");
                e.drawImage(this._img, 0, 0),
                    e.drawImage(this._img2, 150, 317, 165, 165),
                    e.fillStyle = "#FFFFFF",
                    e.font = "16px Microsoft YaHei",
                    e.textAlign = "center",
                    e.fillText("用户ID:" + GameValue.userId, 231, 665),
                    this._codeImg.src = this._canvas.toDataURL("image/png"),
                    this.onResize()
            }
        }
        ,
        t.prototype.clearCode = function() {
            this._codeImg && (this._codeImg.style.display = "none"),
                GameMain.getInstance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this)
        }
        ,
        t.prototype.onResize = function() {
            if (this._codeImg) {
                var e = document.body.clientWidth / 540
                    , t = document.body.clientHeight / 878;
                this._codeImg.style.width = 431 * e + "px",
                    this._codeImg.style.height = 707 * t + "px",
                    this._codeImg.style.left = 55 * e + "px",
                    this._codeImg.style.top = 94 * t + "px"
            }
        }
        ,
        t.prototype.clickClose = function() {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
            var e = egret.Tween.get(this.getChildByName("closeBnt"));
            e.to({
                scaleX: .85,
                scaleY: .85
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100),
                e.call(this.hide, this)
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(QCodeDistinguish.prototype, "QCodeDistinguish");
var QcodeWnd = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.GWndConfig("QrodeWnd", GUIManager.getInstance.bgLay, MDisplay.WndShowType.NONE),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.playStarMc = function() {
            this.mStar = GMovieMag.getInstance.GgetMovieClip("starMc", 0, 0, !0),
                this.mStar.x = 108,
                this.mStar.y = 178,
                this.addChild(this.mStar)
        }
        ,
        t.prototype.show = function() {
            e.prototype.show.call(this),
                this.x = 0,
                this.y = 0,
                this.playStarMc()
        }
        ,
        t.prototype.onInit = function() {
            e.prototype.onInit.call(this),
                this.mBtnQcode = this.getChildByName("createQCode"),
                this.mBtnQcode.anchorOffsetX = this.mBtnQcode.width / 2,
                this.mBtnQcode.anchorOffsetY = this.mBtnQcode.height / 2,
                this.mBtnQcode.x = 103 + this.mBtnQcode.width / 2,
                this.mBtnQcode.y = 393 + this.mBtnQcode.height / 2,
                this.mBtnQcode.touchEnabled = !0,
                this.mBtnQcode.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnChickQCode, this),
                this.mBtnSkill = this.getChildByName("skillBnt"),
                this.mBtnSkill.anchorOffsetX = this.mBtnSkill.width / 2,
                this.mBtnSkill.anchorOffsetY = this.mBtnSkill.height / 2,
                this.mBtnSkill.x = 360 + this.mBtnSkill.width / 2,
                this.mBtnSkill.y = 30 + this.mBtnSkill.height / 2,
                this.mBtnSkill.touchEnabled = !0,
                this.mBtnSkill.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnChickQCode, this),
                this.btnRan = this.getChildByName("btnRan"),
                this.btnRan.anchorOffsetX = this.btnRan.width / 2,
                this.btnRan.anchorOffsetY = this.btnRan.height / 2,
                this.btnRan.x = -4 + this.btnRan.width / 2,
                this.btnRan.y = 30 + this.btnRan.height / 2,
                this.btnRan.touchEnabled = !0,
                this.btnRan.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnChickQCode, this)
        }
        ,
        t.prototype.OnChickQCode = function(e) {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1),
                e.target.touchEnabled = !1;
            var t = egret.Tween.get(e.target);
            t.to({
                scaleX: .95,
                scaleY: .95
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100),
                this.mBtnQcode == e.target ? t.call(this.CallBack, this) : this.mBtnSkill == e.target ? t.call(this.CallBack1, this) : this.btnRan == e.target && t.call(this.CallBack2, this)
        }
        ,
        t.prototype.CallBack = function() {
            egret.Tween.removeTweens(this.mBtnQcode),
                QCodeDistinguish.getInstance.show(),
                this.mBtnQcode.touchEnabled = !0
        }
        ,
        t.prototype.CallBack1 = function() {
            egret.Tween.removeTweens(this.mBtnSkill),
                RulesOrSkillUI.getInstance._mContent = 2,
                RulesOrSkillUI.getInstance.show(),
                this.mBtnSkill.touchEnabled = !0
        }
        ,
        t.prototype.CallBack2 = function() {
            egret.Tween.removeTweens(this.btnRan),
                EveryDayRanKing.getInstance.show(),
                this.btnRan.touchEnabled = !0
        }
        ,
        t.prototype.removeDisplay = function() {
            void 0 != this.mStar && (GObjPool.getInstance.Gadd2Pool(this.mStar),
            void 0 != this.mStar.parent && this.mStar.parent.removeChild(this.mStar),
                delete this.mStar),
                QCodeDistinguish.getInstance.hide()
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this),
                this.removeDisplay(),
                EveryDayRanKing.getInstance.hide()
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(QcodeWnd.prototype, "QcodeWnd");
var ReceiveEffect = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mHongBaoText = FontMgr.getText(FontMgr.FONT_2),
            t._mHongBaoText.letterSpacing = -2,
            t._mHongBaoText.width = 300,
            t._mHongBaoText.textAlign = egret.HorizontalAlign.CENTER,
            t._mHongBaoText.anchorOffsetX = .5 * t._mHongBaoText.width,
            t._mHongBaoText.anchorOffsetY = .5 * t._mHongBaoText.height,
            t
    }
    return __extends(t, e),
        t.getReceiveEffect = function() {
            var e = GObjPool.getInstance.GgetObj(t);
            return null == e && (e = new t),
                e
        }
        ,
        t.prototype.palySuccessMC = function(e, t, i, n, s) {
            this.y_m = e,
                this._mHongBaoText.text = n + "元",
                this.nameN = s,
                this._mSuccessMC = GMovieMag.getInstance.GgetMovieClip("receiveSuccMC", void 0, void 0, !1),
                this._mSuccessMC.x = t,
                this._mSuccessMC.y = i,
                this.addChild(this._mSuccessMC),
                this._mSuccessMC.addEventListener(GMovieClipEvent.played, this.cleanSuccessMC, this),
                this._mMoneyMC = GMovieMag.getInstance.GgetMovieClip("MomeyMC", void 0, void 0, !1),
                this._mMoneyMC.x = t,
                this._mMoneyMC.y = i,
                this._mMoneyMC.addEventListener(GMovieClipEvent.played, this.cleanMoneyMC, this),
                GTimerMag.getInstance.addTimerTask(this.nameN, 99999, 1, this.updateMoney, this)
        }
        ,
        t.prototype.updateMoney = function() {
            this._mHB = this._mMoneyMC.getChildByName("money"),
            void 0 != this._mHB && (this._mHongBaoText.x = this._mHB.x + 360,
                this._mHongBaoText.y = this._mHB.y + 180 + 115.2 * (this.y_m - 1),
                this._mHongBaoText.scaleX = this._mHB.scaleX,
                this._mHongBaoText.scaleX = this._mHB.scaleX,
                this._mHongBaoText.alpha = this._mHB.alpha,
                this._mHongBaoText.anchorOffsetX = .5 * this._mHongBaoText.width,
                this._mHongBaoText.anchorOffsetY = .5 * this._mHongBaoText.height,
            void 0 == this._mHongBaoText.parent && this.addChild(this._mHongBaoText))
        }
        ,
        t.prototype.cleanSuccessMC = function() {
            void 0 != this._mSuccessMC && (this._mSuccessMC.removeEventListener(GMovieClipEvent.played, this.cleanSuccessMC, this),
                GObjPool.getInstance.Gadd2Pool(this._mSuccessMC),
            void 0 != this._mSuccessMC.parent && this._mSuccessMC.parent.removeChild(this._mSuccessMC),
                delete this._mSuccessMC)
        }
        ,
        t.prototype.cleanMoneyMC = function() {
            void 0 != this._mMoneyMC && (this._mMoneyMC.removeEventListener(GMovieClipEvent.played, this.cleanMoneyMC, this),
                GObjPool.getInstance.Gadd2Pool(this._mMoneyMC),
            void 0 != this._mMoneyMC.parent && this._mMoneyMC.parent.removeChild(this._mMoneyMC),
                delete this._mMoneyMC),
            void 0 != this._mHongBaoText.parent && (this._mHongBaoText.x = 0,
                this._mHongBaoText.y = 0,
                this._mHongBaoText.scaleX = 1,
                this._mHongBaoText.scaleX = 1,
                this._mHongBaoText.alpha = 1,
                this._mHongBaoText.anchorOffsetX = 0,
                this._mHongBaoText.anchorOffsetY = 0,
                this._mHongBaoText.parent.removeChild(this._mHongBaoText)),
                GTimerMag.getInstance.GremoveTimerTask(this.nameN),
                GObjPool.getInstance.Gadd2Pool(this),
            void 0 != this.parent && this.parent.removeChild(this),
                delete this
        }
        ,
        t.prototype.clean = function() {}
        ,
        t
}(egret.DisplayObjectContainer);
__reflect(ReceiveEffect.prototype, "ReceiveEffect", ["GIObjPool"]);
var RechargeWnd = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.GWndConfig("RechargeWnd", GUIManager.getInstance.tipLay, MDisplay.WndShowType.NONE),
            t.mBg = new egret.Shape,
            t.mBg.graphics.beginFill(0),
            t.mBg.alpha = .5,
            t.mBg.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight),
            t.mBg.graphics.endFill(),
            t.addChildAt(t.mBg, 0),
            t.mBg.touchEnabled = !0,
            t.mBg.y = -70,
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == this.mInstance && (this.mInstance = new t),
                    this.mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.show = function() {
            e.prototype.show.call(this),
                this.initData(),
                this.anchorOffsetX = .5 * this.width,
                this.anchorOffsetY = .5 * this.height,
                this.x = 270,
                this.y = 510;
            var t = egret.Tween.get(this);
            t.to({
                alpha: 1
            }, 50),
                t.to({
                    scaleX: 1.08,
                    scaleY: 1.08
                }, 150).to({
                    scaleX: 1,
                    scaleY: 1
                }, 200),
                t.wait(2200)
        }
        ,
        t.prototype.initData = function() {
            this.mBtnClose = this.getChildByName("btnClose"),
                this.mBtnPay5 = this.getChildByName("btnPay5"),
                this.mBtnPay10 = this.getChildByName("btnPay10"),
                this.mBtnPay20 = this.getChildByName("btnPay20"),
                this.mBtnPay50 = this.getChildByName("btnPay50"),
                this.mBtnPay100 = this.getChildByName("btnPay100"),
                this.mBtnPay200 = this.getChildByName("btnPay200"),
                this.mBtnClose.touchEnabled = !0,
                this.mBtnPay5.touchEnabled = !0,
                this.mBtnPay10.touchEnabled = !0,
                this.mBtnPay20.touchEnabled = !0,
                this.mBtnPay50.touchEnabled = !0,
                this.mBtnPay100.touchEnabled = !0,
                this.mBtnPay200.$setVisible(!1),
                this.mBtnClose.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this),
                this.mBtnPay5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this),
                this.mBtnPay10.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this),
                this.mBtnPay20.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this),
                this.mBtnPay50.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this),
                this.mBtnPay100.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this),
                this.mBtnPay200.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this),
                this.setPos(this.mBtnClose, 501.3, 53.35),
                this.setPos(this.mBtnPay5, 152, 185.9),
                this.setPos(this.mBtnPay10, 387, 185.9),
                this.setPos(this.mBtnPay20, 152, 348.5),
                this.setPos(this.mBtnPay50, 387, 348.5),
                this.setPos(this.mBtnPay100, 152, 512.85),
                this.setPos(this.mBtnPay200, 387, 512.85)
        }
        ,
        t.prototype.setPos = function(e, t, i) {
            e.anchorOffsetX = e.width / 2,
                e.anchorOffsetY = e.height / 2,
                e.x = t,
                e.y = i
        }
        ,
        t.prototype.removeUi = function() {
            this.mBtnClose.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) && this.mBtnClose.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this),
            this.mBtnPay5.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) && this.mBtnPay5.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this),
            this.mBtnPay10.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) && this.mBtnPay10.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this),
            this.mBtnPay20.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) && this.mBtnPay20.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this),
            this.mBtnPay50.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) && this.mBtnPay50.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this),
            this.mBtnPay100.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) && this.mBtnPay100.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this),
            this.mBtnPay200.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) && this.mBtnPay200.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this)
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this),
                this.removeUi()
        }
        ,
        t.prototype.OnTouchBegin = function(e) {
            this._mTouch = e.target,
                this.tw = egret.Tween.get(e.target).to({
                    scaleX: .85,
                    scaleY: .85
                }, 100).to({
                    scaleX: 1,
                    scaleY: 1
                }, 100),
                this.tw.call(this.tweenEnd, this)
        }
        ,
        t.prototype.tweenEnd = function() {
            switch (SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1),
                egret.Tween.removeTweens(this.tw),
                this._mTouch) {
                case this.mBtnClose:
                    this.hide();
                    break;
                case this.mBtnPay5:
                    HTTPRequest.getInstance.payRequest(5);
                    break;
                case this.mBtnPay10:
                    HTTPRequest.getInstance.payRequest(10);
                    break;
                case this.mBtnPay20:
                    HTTPRequest.getInstance.payRequest(20);
                    break;
                case this.mBtnPay50:
                    HTTPRequest.getInstance.payRequest(50);
                    break;
                case this.mBtnPay100:
                    HTTPRequest.getInstance.payRequest(100);
                    break;
                case this.mBtnPay200:
                    HTTPRequest.getInstance.payRequest(200)
            }
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(RechargeWnd.prototype, "RechargeWnd");
var RedBonusWnd = function(e) {
    function t() {
        var t = e.call(this) || this;
        t.index = 0,
            t._mGroup = new egret.DisplayObjectContainer,
            t._mHeiBG = new egret.Bitmap,
            GUIManager.getInstance.topLay.addChild(t._mGroup),
            t.GWndConfig("RedBonusWnd", GUIManager.getInstance.topLay, MDisplay.WndShowType.SCALE),
            t._mMoneyMap = new GHashMap,
            t._mBonusMap = new GHashMap;
        for (var i, n = 0; 4 > n; n++)
            i = t.initMoney(10 * (n + 1) + "元", 25, 188 + 115.2 * n),
                t._mMoneyMap.Gput(n, i);
        for (var s, n = 0; 4 > n; n++)
            s = t.initText(10 * (n + 1) + "/100 次", 240, 192 + 115.2 * n),
                t._mBonusMap.Gput(n, s);
        return t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.initMoney = function(e, t, i) {
            var n = FontMgr.getText(FontMgr.FONT_1);
            return n.letterSpacing = -1,
                n.width = 200,
                n.textAlign = egret.HorizontalAlign.CENTER,
                n.x = t,
                n.y = i,
                n.text = e,
                n
        }
        ,
        t.prototype.initText = function(e, t, i) {
            var n = new egret.TextField;
            return n.textAlign = egret.HorizontalAlign.RIGHT,
                n.lineSpacing = 2,
                n.textColor = 16766796,
                n.width = 200,
                n.size = 30,
                n.x = t,
                n.y = i,
                n.text = e,
                n.strokeColor = 12274434,
                n.stroke = 1,
                n.fontFamily = "微软雅黑",
                n
        }
        ,
        t.prototype.show = function() {
            e.prototype.show.call(this),
                this.shadowMC(),
                this.x = .5 * GameMain.getInstance.StageWidth + 2,
                this.y = .5 * GameMain.getInstance.StageHeight - 20,
                this.initBnt();
            for (var t, i, n = 0; 4 > n; n++)
                t = RedBonsData.getInstance.getDataById(n),
                    i = this._mMoneyMap.Gget(n),
                    i.text = t.money + "元",
                void 0 != i && void 0 == i.parent && this.addChild(i);
            this.showText()
        }
        ,
        t.prototype.showText = function() {
            for (var e, t, i = 0; 4 > i; i++)
                if (t = RedBonsData.getInstance.getDataById(i),
                    void 0 != t) {
                    var n = this.setBnt(i + 1);
                    t.hasTimes < t.maxTimes ? (n.$setVisible(!1),
                        e = this._mBonusMap.Gget(i),
                        e.text = t.hasTimes + "/" + t.maxTimes + " 次",
                    void 0 != e && void 0 == e.parent && this.addChild(e)) : t.hasTimes == t.maxTimes && void 0 != e && void 0 != e.parent && (e.parent.removeChild(e),
                            n.$setVisible(!0)),
                        this.receiveBntType(n, t)
                }
        }
        ,
        t.prototype.receiveBntType = function(e, t) {
            void 0 != t && (1 == t.isReceive ? (e.touchEnabled = !1,
                e.$setBitmapData(GResCache.getRes("resource/assets/images/ui/hpi_ylqui.png"))) : (e.touchEnabled = !0,
                e.$setBitmapData(GResCache.getRes("resource/assets/images/ui/btn_lqjl.png"))))
        }
        ,
        t.prototype.palySuccessMC = function(e) {
            var t = this.setBnt(e)
                , i = RedBonsData.getInstance.getDataById(e - 1);
            i.isReceive = !0,
                this.receiveBntType(t, i);
            var n = ReceiveEffect.getReceiveEffect();
            this.addChild(n),
                n.palySuccessMC(e, 375, 200 + 115.2 * (e - 1), i.money, "timer" + this.index++)
        }
        ,
        t.prototype.initBnt = function() {
            this._mCloseBnt = this.bntPos("closeBnt", 448, 36),
                this._mBnt1 = this.bntPos("bnt1", 288, 174),
                this._mBnt2 = this.bntPos("bnt2", 288, 289),
                this._mBnt3 = this.bntPos("bnt3", 288, 405),
                this._mBnt4 = this.bntPos("bnt4", 288, 520)
        }
        ,
        t.prototype.setBnt = function(e) {
            return 1 == e ? this._mBnt1 : 2 == e ? this._mBnt2 : 3 == e ? this._mBnt3 : 4 == e ? this._mBnt4 : void 0
        }
        ,
        t.prototype.bntPos = function(e, t, i) {
            var n = this.getChildByName(e);
            return n.x = t + .5 * n.width,
                n.y = i + .5 * n.height,
                n.anchorOffsetX = .5 * n.width,
                n.anchorOffsetY = .5 * n.height,
                n.touchEnabled = !0,
                n.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                n
        }
        ,
        t.prototype.scaleBnt = function(e) {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
            var t = egret.Tween.get(e.target).to({
                scaleX: .85,
                scaleY: .85
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100);
            e.target == this._mCloseBnt ? t.call(this.hide, this) : e.target == this._mBnt1 ? this.palySuccessMC(1) : e.target == this._mBnt2 ? this.palySuccessMC(2) : e.target == this._mBnt3 ? this.palySuccessMC(3) : e.target == this._mBnt4 && this.palySuccessMC(4)
        }
        ,
        t.prototype.shadowMC = function() {
            this._mHeiBG.$setBitmapData(GResCache.getRes("resource/assets/images/ui/heise.png")),
                this._mHeiBG.x = 0,
                this._mHeiBG.y = 0,
                this._mHeiBG.alpha = 0,
                this._mHeiBG.touchEnabled = !0,
                this._mGroup.addChild(this._mHeiBG);
            var e = egret.Tween.get(this._mHeiBG);
            e.to({
                alpha: .5
            }, 300)
        }
        ,
        t.prototype.cleanHeiBG = function() {
            void 0 != this._mHeiBG.parent && this._mHeiBG.parent.removeChild(this._mHeiBG)
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this),
                this.cleanHeiBG(),
                this._mCloseBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mBnt1.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mBnt2.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mBnt3.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mBnt4.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this)
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(RedBonusWnd.prototype, "RedBonusWnd");
var ReminderUI = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mGroup = new egret.DisplayObjectContainer,
            t._mHeiBG = new egret.Bitmap,
            GUIManager.getInstance.mostLay.addChild(t._mGroup),
            t.GWndConfig("reminderUI", GUIManager.getInstance.mostLay, MDisplay.WndShowType.ALPHA),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.show = function() {
            e.prototype.show.call(this),
                this.shadowMC(),
                this.x = .5 * (GameMain.getInstance.StageWidth - this.width),
                this.y = .5 * (GameMain.getInstance.StageHeight - this.height),
                this.touchEnabled = !0,
                this._mHeiBG.touchEnabled = !0,
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.hide, this),
                this._mHeiBG.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.hide, this)
        }
        ,
        t.prototype.shadowMC = function() {
            this._mHeiBG.$setBitmapData(GResCache.getRes("resource/assets/images/ui/heise.png")),
                this._mHeiBG.x = 0,
                this._mHeiBG.y = 0,
                this._mHeiBG.alpha = 0,
                this._mHeiBG.touchEnabled = !0,
                this._mGroup.addChild(this._mHeiBG);
            var e = egret.Tween.get(this._mHeiBG);
            e.to({
                alpha: .5
            }, 200)
        }
        ,
        t.prototype.cleanHeiBG = function() {
            void 0 != this._mHeiBG.parent && this._mHeiBG.parent.removeChild(this._mHeiBG)
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this),
                this.cleanHeiBG(),
                this.removeEventListener(GMovieClipEvent.played, this.hide, this),
                this._mHeiBG.removeEventListener(GMovieClipEvent.played, this.hide, this),
                GameValue.yongjin >= 1e3 && GameValue.getInstance.getData() ? PushSucc.getInstance.showData(PushSucc.DaiLi_wnd) : (TipUI.getInstance._mTipNum = 7,
                    TipUI.getInstance.show())
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(ReminderUI.prototype, "ReminderUI");
var RulesOrSkillUI = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mContent = 1,
            t._mGroup = new egret.DisplayObjectContainer,
            t._mHeiBG = new egret.Bitmap,
            GUIManager.getInstance.tipLay.addChild(t._mGroup),
            t.GWndConfig("RulesOrSkillUI", GUIManager.getInstance.tipLay, MDisplay.WndShowType.SCALE),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.show = function() {
            e.prototype.show.call(this),
                this.shadowMC(),
                this.x = .5 * GameMain.getInstance.StageWidth,
                this.y = .5 * GameMain.getInstance.StageHeight - 20,
                1 == this._mContent ? (this.getChildByName("rules").$setVisible(!0),
                    this.getChildByName("skill").$setVisible(!1)) : (this.getChildByName("rules").$setVisible(!1),
                    this.getChildByName("skill").$setVisible(!0),
                    this.mSkill = this.getChildByName("skill"),
                    2 == this._mContent ? this.mSkill.$setBitmapData(GResCache.getRes("resource/assets/images/ui/wenzi_zqjq.png")) : 3 == this._mContent && this.mSkill.$setBitmapData(GResCache.getRes("resource/assets/images/ui/wenzi_djgz.png")))
        }
        ,
        t.prototype.scaleBnt = function(e) {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
            var t = egret.Tween.get(e.target).to({
                scaleX: .85,
                scaleY: .85
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100);
            e.target == this._mHeiBG && t.call(this.hide, this)
        }
        ,
        t.prototype.shadowMC = function() {
            this._mHeiBG.$setBitmapData(GResCache.getRes("resource/assets/images/ui/heise.png")),
                this._mHeiBG.x = 0,
                this._mHeiBG.y = 0,
                this._mHeiBG.alpha = 0,
                this._mHeiBG.touchEnabled = !0,
                this._mGroup.addChild(this._mHeiBG),
                this._mHeiBG.touchEnabled = !0,
                this._mHeiBG.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.hide, this);
            var e = egret.Tween.get(this._mHeiBG);
            e.to({
                alpha: .5
            }, 300)
        }
        ,
        t.prototype.cleanHeiBG = function() {
            void 0 != this._mHeiBG.parent && (this._mHeiBG.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mHeiBG.parent.removeChild(this._mHeiBG))
        }
        ,
        t.prototype.onInit = function() {
            e.prototype.onInit.call(this)
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this),
                this.cleanHeiBG()
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(RulesOrSkillUI.prototype, "RulesOrSkillUI");
var SkillTimer = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mTextMap = new GHashMap,
            t.initText(),
            WorldWnd.getInstance.groupBg.addChild(t),
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.initText = function() {
            for (var e, t = 1; 6 >= t; t++)
                e = new SurplusText,
                    e.time = 0,
                    this._mTextMap.Gput(t, e)
        }
        ,
        t.prototype.showTime = function(e, t) {
            if (this._mTextMap.GhasKey(e)) {
                var i = this._mTextMap.Gget(e)
                    , n = this.getTimes();
                i.time = t,
                    i.index_pos = n,
                    egret.log("showNum:" + i.index_pos),
                void 0 == i.parent && this.addChild(i),
                    i.x = 420,
                    i.y = 200 + 50 * n
            }
        }
        ,
        t.prototype.hideTime = function(e) {
            var t, i = (this.getTimes(),
                0);
            this._mTextMap.GhasKey(e) && (t = this._mTextMap.Gget(e),
                i = t.index_pos,
                t.time = 0,
            void 0 != t.parent && t.parent.removeChild(t));
            for (var n = 1; 6 >= n; n++)
                if (this._mTextMap.GhasKey(n) && (t = this._mTextMap.Gget(n),
                    t.index_pos >= i)) {
                    t.index_pos = t.index_pos - 1;
                    var s = egret.Tween.get(t);
                    egret.log("type " + e + "," + n + "_" + t.index_pos),
                        s.to({
                            y: 200 + 50 * t.index_pos
                        }, 150)
                }
        }
        ,
        t.prototype.getTimes = function() {
            for (var e, t = 0, i = 1; 6 >= i; i++)
                this._mTextMap.GhasKey(i) && (e = this._mTextMap.Gget(i),
                e.time > 0 && t++);
            return t
        }
        ,
        t.prototype.getTime = function(e) {
            return this._mTextMap.GhasKey(e) ? this._mTextMap.Gget(e).time : 0
        }
        ,
        t.prototype.setTime = function(e, t) {
            this._mTextMap.GhasKey(e) && (this._mTextMap.Gget(e).time = t)
        }
        ,
        t.prototype.updateType = function(e, t) {
            if (this._mTextMap.GhasKey(e)) {
                var i = this._mTextMap.Gget(e);
                i.time = t,
                    i.setText(e, t)
            }
        }
        ,
        t.prototype.hide = function() {
            for (var e, t = 1; 6 >= t; t++)
                this._mTextMap.GhasKey(t) && (e = this._mTextMap.Gget(t),
                void 0 != e.parent && e.parent.removeChild(e))
        }
        ,
        t
}(egret.DisplayObjectContainer);
SkillTimer.TYPE_WWBS = 1,
    SkillTimer.TYPE_WWJS = 2,
    SkillTimer.TYPE_JZJS = 3,
    SkillTimer.TYPE_ZJTS = 4,
    SkillTimer.TYPE_BJ = 5,
    SkillTimer.TYPE_FB = 6,
    __reflect(SkillTimer.prototype, "SkillTimer");
var SurplusText = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.time = 0,
            t.index_pos = -1,
            t.desc = ["变身 : ", "减速 : ", "加速 : ", "加奖 : ", "暴击 : "],
            t._mBG = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/sctb_miaos.png")),
            t.addChildAt(t._mBG, 0),
            t.surplusText(),
            t
    }
    return __extends(t, e),
        t.prototype.surplusText = function() {
            this._mSurplusText = new egret.TextField,
                this._mSurplusText.textAlign = egret.HorizontalAlign.CENTER,
                this._mSurplusText.textColor = 16777215,
                this._mSurplusText.width = 200,
                this._mSurplusText.size = 19,
                this._mSurplusText.x = -40,
                this._mSurplusText.y = 11,
                this._mSurplusText.fontFamily = "微软雅黑",
                this.addChild(this._mSurplusText)
        }
        ,
        t.prototype.setText = function(e, t) {
            var i = "" + t;
            10 > t ? i = "0" + t : 0 >= t && (i = "00"),
                this._mSurplusText.textFlow = [{
                    text: this.desc[e - 1],
                    style: {
                        textColor: 16634626
                    }
                }, {
                    text: i,
                    style: {
                        size: 19
                    }
                }]
        }
        ,
        t
}(egret.DisplayObjectContainer);
__reflect(SurplusText.prototype, "SurplusText");
var SmallProfitUI = function() {
    function e() {
        this._mGroup = new egret.DisplayObjectContainer,
            this._mHongBaoText = FontMgr.getText(FontMgr.FONT_2),
            this._mHongBaoText.letterSpacing = -2,
            this._mHongBaoText.width = 500,
            this._mHongBaoText.textAlign = egret.HorizontalAlign.CENTER
    }
    return Object.defineProperty(e, "getInstance", {
        get: function() {
            return void 0 == e._mInstance && (e._mInstance = new e),
                e._mInstance
        },
        enumerable: !0,
        configurable: !0
    }),
        e.prototype.show = function() {
            GUIManager.getInstance.topLay.addChild(this._mGroup),
                this.smallProfit()
        }
        ,
        e.prototype.smallProfit = function() {
            SoundMgr.getInstance.play(SoundMgr.SOUND_PROFIT, 1),
                SoundMgr.getInstance.play(SoundMgr.SOUND_SMALL, 1);
            var e = "profitMC";
            1 == ClipMove.getInstance.isAccClipSpeed() && (e = "profitMC3"),
                this._mSmallProfitMC = GMovieMag.getInstance.GgetMovieClip(e, void 0, void 0, !1),
                this._mSmallProfitMC.x = 270,
                this._mSmallProfitMC.y = 417,
                this._mGroup.addChild(this._mSmallProfitMC);
            var t = egret.Tween.get(this);
            1 == ClipMove.getInstance.isAccClipSpeed() ? t.wait(550) : t.wait(700),
                t.call(this.setMoneyPrice, this);
            var i = egret.Tween.get(this);
            1 == ClipMove.getInstance.isAccClipSpeed() ? i.wait(300) : i.wait(900),
                i.call(this.playContinueBnt, this)
        }
        ,
        e.prototype.playContinueBnt = function() {
            this._mContinueBntMC = GMovieMag.getInstance.GgetMovieClip("continueBntMC", void 0, void 0, !1),
                this._mContinueBntMC.x = 270,
                this._mContinueBntMC.y = 581.2,
                this._mGroup.addChild(this._mContinueBntMC),
                this._mContinueBntMC.touchEnabled = !0,
                this._mContinueBntMC.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this.playPustBnt()
        }
        ,
        e.prototype.playPustBnt = function() {}
        ,
        e.prototype.scaleBnt = function(e) {
            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
            var t = egret.Tween.get(e.target).to({
                scaleX: .85,
                scaleY: .85
            }, 100).to({
                scaleX: 1,
                scaleY: 1
            }, 100);
            e.target == this._mContinueBntMC && t.call(this.hide, this)
        }
        ,
        e.prototype.pustWnd = function() {
            this.hide(),
                PushWnd.getInstance.show()
        }
        ,
        e.prototype.setMoneyPrice = function() {
            WorldWnd.getInstance.freshTimes(),
                this.smallProfitTip(),
                this._mHongBaoText.text = GameValue.hbMoney + "元",
                this._mHongBaoText.x = 22,
                this._mHongBaoText.y = 312,
                this._mGroup.addChild(this._mHongBaoText)
        }
        ,
        e.prototype.smallProfitTip = function() {
            this._mSmallProfitTipMC = GMovieMag.getInstance.GgetMovieClip("smallProfitTipMC", void 0, void 0, !1),
                this._mSmallProfitTipMC.x = 80,
                this._mSmallProfitTipMC.y = 100,
                this._mGroup.addChild(this._mSmallProfitTipMC)
        }
        ,
        e.prototype.cleanContinueBntMC = function() {
            void 0 != this._mContinueBntMC && (this._mContinueBntMC.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                GObjPool.getInstance.Gadd2Pool(this._mContinueBntMC),
            void 0 != this._mContinueBntMC.parent && this._mContinueBntMC.parent.removeChild(this._mContinueBntMC),
                delete this._mContinueBntMC)
        }
        ,
        e.prototype.cleanPustBntMC = function() {}
        ,
        e.prototype.cleanSmallProfitTipMC = function() {
            void 0 != this._mSmallProfitTipMC && (GObjPool.getInstance.Gadd2Pool(this._mSmallProfitTipMC),
            void 0 != this._mSmallProfitTipMC.parent && this._mSmallProfitTipMC.parent.removeChild(this._mSmallProfitTipMC),
                delete this._mSmallProfitTipMC)
        }
        ,
        e.prototype.cleanSmallProfitMC = function() {
            void 0 != this._mSmallProfitMC && (GObjPool.getInstance.Gadd2Pool(this._mSmallProfitMC),
            void 0 != this._mSmallProfitMC.parent && this._mSmallProfitMC.parent.removeChild(this._mSmallProfitMC),
                delete this._mSmallProfitMC)
        }
        ,
        e.prototype.hide = function() {
            Fail.getInstance.hide(),
                this.cleanContinueBntMC(),
                this.cleanPustBntMC(),
                this.cleanSmallProfitMC(),
                this.cleanSmallProfitTipMC(),
            void 0 != this._mHongBaoText.parent && this._mHongBaoText.parent.removeChild(this._mHongBaoText)
        }
        ,
        e
}();
__reflect(SmallProfitUI.prototype, "SmallProfitUI");
var TipUI = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mTipNum = 1,
            t.id = 7,
            t.GWndConfig("TipUI", GUIManager.getInstance.topLay),
            t._mBackText = FontMgr.getText(FontMgr.FONT_1),
            t._mBackText.letterSpacing = -1,
            t._mBackText.width = 200,
            t._mBackText.textAlign = egret.HorizontalAlign.CENTER,
            t._mBackText.x = 240,
            t._mBackText.y = 42,
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.show = function() {
            if (void 0 == this.parent) {
                e.prototype.show.call(this),
                    this.changeTip();
                var t = 300;
                7 == this._mTipNum && (t = 800),
                    this.x = 0,
                    this.y = 230,
                    this.alpha = 0;
                var i = egret.Tween.get(this);
                1 == ClipMove.getInstance.isAccClipSpeed() ? (i.to({
                    alpha: 1
                }, 100),
                    i.wait(300)) : (i.to({
                    alpha: 1
                }, 300),
                    i.wait(900)),
                    i.to({
                        alpha: 0
                    }, t),
                    i.call(this.hide, this)
            }
        }
        ,
        t.prototype.changeTip = function() {
            this._mTip = this.getChildByName("wenzi"),
                this._mTip.y = 35,
                7 == this._mTipNum ? this.id = 16 : 8 == this._mTipNum ? this.id = 17 : 9 == this._mTipNum ? this.id = 18 : 10 == this._mTipNum ? (this.id = 19,
                    this._mTip.y = 0) : (this.id++,
                    this.id = this.id > 12 ? 7 : this.id),
                this._mTip.$setBitmapData(GResCache.getRes("resource/assets/images/ui/wenzi_" + this.id + ".png")),
                this._mBG = this.getChildByName("bg"),
                6 == this._mTipNum ? (this.addChild(this._mBackText),
                    this._mBackText.text = GameValue.hbMoney + "元",
                    this._mBG.$setBitmapData(GResCache.getRes("resource/assets/images/ui/kuang_tishi2.png"))) : (void 0 != this._mBackText.parent && this._mBackText.parent.removeChild(this._mBackText),
                    this._mBG.$setBitmapData(GResCache.getRes("resource/assets/images/ui/kuang_tishi.png"))),
                this._mTip.x = .5 * (GameMain.getInstance.StageWidth - this._mTip.width)
        }
        ,
        t.prototype.hide = function() {
            e.prototype.hide.call(this),
                1 != this._mTipNum && 6 != this._mTipNum && 7 != this._mTipNum && 8 != this._mTipNum && 9 != this._mTipNum && 10 != this._mTipNum ? Fail.getInstance.show() : 6 == this._mTipNum && Success.getInstance.show(),
                this._mTipNum = 1
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this)
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(TipUI.prototype, "TipUI");
var WorldWnd = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t._mPriceType = 1,
            t._mFirst = !0,
            t._mLoadMod1 = new GLoadModule,
            t._mGroup = new egret.DisplayObjectContainer,
            t._mGroupBG = new egret.DisplayObjectContainer,
            t._mGroupClip = new egret.DisplayObjectContainer,
            t._mGroupMC = new egret.DisplayObjectContainer,
            t._mGroupUI = new egret.DisplayObjectContainer,
            GUIManager.getInstance.bgLay.addChild(t._mGroup),
            t._mGroup.addChild(t._mGroupBG),
            t._mGroup.addChild(t._mGroupClip),
            t._mGroup.addChild(t._mGroupMC),
            t._mGroup.addChild(t._mGroupUI),
            t.GWndConfig("gameUI", t._mGroupUI, MDisplay.WndShowType.ALPHA),
            t._mGroup.addChild(NoticeUI.getInstance),
            t.userIdText(),
            t.timeTipText(),
            t.mBg = new egret.Bitmap,
            t._mTimeTip = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/timeTip.png")),
            t._mSurplusText = FontMgr.getText(FontMgr.FONT_1),
            t._mSurplusText.letterSpacing = -1,
            t._mSurplusText.width = 200,
            t._mSurplusText.scaleX = .7,
            t._mSurplusText.scaleY = .7,
            t._mSurplusText.x = 57,
            t._mSurplusText.y = 17,
            t._mBonusdualText = FontMgr.getText(FontMgr.FONT_1),
            t._mBonusdualText.letterSpacing = -1,
            t._mBonusdualText.width = 200,
            t._mBonusdualText.scaleX = .8,
            t._mBonusdualText.scaleY = .8,
            t._mBonusdualText.x = 95,
            t._mBonusdualText.y = 75,
            t
    }
    return __extends(t, e),
        Object.defineProperty(t, "getInstance", {
            get: function() {
                return void 0 == t._mInstance && (t._mInstance = new t),
                    t._mInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.userIdText = function() {
            this._mUserIdText = new egret.TextField,
                this._mUserIdText.textColor = 16777215,
                this._mUserIdText.width = 500,
                this._mUserIdText.size = 19,
                this._mUserIdText.x = 23,
                this._mUserIdText.y = 175,
                this._mUserIdText.strokeColor = 0,
                this._mUserIdText.stroke = 1,
                this._mUserIdText.fontFamily = "宋体"
        }
        ,
        t.prototype.timeTipText = function() {
            this._mTimeTipText = new egret.TextField,
                this._mTimeTipText.textColor = 16777215,
                this._mTimeTipText.width = 500,
                this._mTimeTipText.size = 20,
                this._mTimeTipText.x = 407,
                this._mTimeTipText.y = 180,
                this._mTimeTipText.strokeColor = 0,
                this._mTimeTipText.stroke = 1,
                this._mTimeTipText.text = "7:00-24:00",
                this._mTimeTipText.fontFamily = "宋体"
        }
        ,
        t.prototype.show = function() {
            e.prototype.show.call(this),
                this.timeTip(),
                this.x = 0,
                this.y = 2,
                this.on(),
                this.changePriceBnt(this._mPriceType, !0),
                this.freshTimes(),
            1 == this._mFirst && (ReminderUI.getInstance.show(),
                this._mFirst = !1)
        }
        ,
        t.prototype.timeTip = function() {}
        ,
        t.prototype.on = function() {
            this.mBg.$setBitmapData(GResCache.getRes("resource/assets/images/ui/bg_2.jpg")),
                this._mGroupBG.addChildAt(this.mBg, 0),
                ModleMove.getInstance.show(),
                ClipMove.getInstance.show(),
                BackRowModle.getInstance.show(),
                this.addChild(this._mSurplusText),
                this.addChild(this._mBonusdualText),
                this.addChild(this._mUserIdText),
                this._mUserIdText.text = "用户ID:" + GameValue.userId,
                this._mbeginMC = GMovieMag.getInstance.GgetMovieClip("btnStart", 1, 1, !1),
                this._mbeginMC.x = 425,
                this._mbeginMC.y = 775,
                this._mbeginMC.touchEnabled = !0,
                this._mbeginMC.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this),
                this._mGroupUI.addChild(this._mbeginMC),
                this._mbeginMC.addEventListener(GMovieClipEvent.played, this.end, this),
                this.initBnt()
        }
        ,
        t.prototype.freshTimes = function() {
            var e = 5;
            2 == this._mPriceType ? e = 10 : 3 == this._mPriceType && (e = 20),
                this.freshBonusdual();
            var t = Math.floor(GameValue.residualGold / e);
            return 0 >= t && (t = Math.floor(GameValue.bonusdualGold / e)),
                this._mSurplusText.text = "" + (GameValue.residualGold < 0 ? 0 : GameValue.residualGold).toFixed(2),
                t
        }
        ,
        t.prototype.freshTimesTemp = function(e) {
            var t = 5;
            2 == this._mPriceType ? t = 10 : 3 == this._mPriceType && (t = 20);
            var i = e - t;
            0 > i ? (i = GameValue.bonusdualGold - t,
                this._mBonusdualText.text = "" + (0 > i ? 0 : i).toFixed(2)) : this._mSurplusText.text = "" + (0 > i ? 0 : i).toFixed(2)
        }
        ,
        t.prototype.freshBonusdual = function() {
            this._mBonusdualText.text = "" + GameValue.bonusdualGold.toFixed(2)
        }
        ,
        Object.defineProperty(t.prototype, "groupBg", {
            get: function() {
                return this._mGroupBG
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "groupClip", {
            get: function() {
                return this._mGroupClip
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "groupMC", {
            get: function() {
                return this._mGroupMC
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.initBnt = function() {
            this._mRulesBnt = this.getChildByName("rulesBnt"),
                this._mSkillBnt = this.getChildByName("skillBnt"),
                this._mPushBnt = this.getChildByName("pushBnt"),
                this._mMallBnt = this.getChildByName("mallBnt"),
                this._mFeedbackBntMC = this.getChildByName("feedbackBnt"),
                this._mFeedbackBntMC.$setVisible(!1),
                this._mRulesBnt.x = 410 + .5 * this._mRulesBnt.width,
                this._mRulesBnt.y = 48 + .5 * this._mRulesBnt.height,
                this._mRulesBnt.anchorOffsetX = .5 * this._mRulesBnt.width,
                this._mRulesBnt.anchorOffsetY = .5 * this._mRulesBnt.height,
                this._mSkillBnt.x = 470 + .5 * this._mSkillBnt.width,
                this._mSkillBnt.y = 49 + .5 * this._mSkillBnt.height,
                this._mSkillBnt.anchorOffsetX = .5 * this._mSkillBnt.width,
                this._mSkillBnt.anchorOffsetY = .5 * this._mSkillBnt.height,
                this._mPushBnt.x = -9 + .5 * this._mPushBnt.width,
                this._mPushBnt.y = 123.3 + .5 * this._mPushBnt.height,
                this._mPushBnt.anchorOffsetX = .5 * this._mPushBnt.width,
                this._mPushBnt.anchorOffsetY = .5 * this._mPushBnt.height,
                this._mMallBnt.x = 453 + .5 * this._mMallBnt.width,
                this._mMallBnt.y = 108 + .5 * this._mMallBnt.height,
                this._mMallBnt.anchorOffsetX = .5 * this._mMallBnt.width,
                this._mMallBnt.anchorOffsetY = .5 * this._mMallBnt.height,
                this._mFeedbackBntMC.x = 466 + .5 * this._mFeedbackBntMC.width,
                this._mFeedbackBntMC.y = 109 + .5 * this._mFeedbackBntMC.height,
                this._mFeedbackBntMC.anchorOffsetX = .5 * this._mFeedbackBntMC.width,
                this._mFeedbackBntMC.anchorOffsetY = .5 * this._mFeedbackBntMC.height,
                this._mRulesBnt.touchEnabled = !0,
                this._mSkillBnt.touchEnabled = !0,
                this._mPushBnt.touchEnabled = !0,
                this._mMallBnt.touchEnabled = !0,
                this._mFeedbackBntMC.touchEnabled = !0,
                this._mRulesBnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mSkillBnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mPushBnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mMallBnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mFeedbackBntMC.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mbnt100 = this.getChildByName("bnt100MC"),
                this._mbnt1000 = this.getChildByName("bnt1000MC"),
                this._mbnt10000 = this.getChildByName("bnt10000MC"),
                this._mbtnBig5 = this.getChildByName("btnBig5"),
                this._mbtnBig10 = this.getChildByName("btnBig10"),
                this._mbtnBig20 = this.getChildByName("btnBig20"),
                this._mbnt100.touchEnabled = !0,
                this._mbnt1000.touchEnabled = !0,
                this._mbnt10000.touchEnabled = !0,
                this._mbnt100.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this),
                this._mbnt1000.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this),
                this._mbnt10000.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this)
        }
        ,
        t.prototype.scaleBnt = function(e) {
            if (1 == ClipMove.getInstance.clipState && 0 != ModleMove.getInstance.finish) {
                SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1);
                egret.Tween.get(e.target).to({
                    scaleX: .85,
                    scaleY: .85
                }, 100).to({
                    scaleX: 1,
                    scaleY: 1
                }, 100);
                e.target == this._mRulesBnt ? (RulesOrSkillUI.getInstance._mContent = 1,
                    RulesOrSkillUI.getInstance.show()) : e.target == this._mSkillBnt ? (RulesOrSkillUI.getInstance._mContent = 2,
                    RulesOrSkillUI.getInstance.show()) : e.target == this._mPushBnt ? PushWnd.getInstance.autoPush() : e.target == this._mFeedbackBntMC ? RedBonusWnd.getInstance.show() : e.target == this._mMallBnt && FakeMallWnd.getInstance.show()
            }
        }
        ,
        t.prototype.touchDown = function(e) {
            if (1 == ClipMove.getInstance.clipState && 0 != ModleMove.getInstance.finish)
                if (e.target == this._mbeginMC) {
                    if (void 0 != TipUI.getInstance.parent && TipUI.getInstance.hide(),
                            SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1),
                        GameValue.upperu >= GameValue.upperuLimit)
                        return TipUI.getInstance._mTipNum = 8,
                            void TipUI.getInstance.show();
                    if (this.freshTimes() <= 0)
                        return void RechargeWnd.getInstance.show();
                    this._mbeginMC.touchEnabled = !1,
                        this._mbeginMC.GgoToAndPlay(1, 5, !1),
                        ClipMove.getInstance.begin()
                } else if (e.target == this._mbnt100) {
                    if (ModleMove.getInstance.getTimeSpeedWW() > 0)
                        return;
                    1 != this._mPriceType && (SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1),
                        this.changePriceBnt(1, !1))
                } else if (e.target == this._mbnt1000) {
                    if (ModleMove.getInstance.getTimeSpeedWW() > 0)
                        return;
                    2 != this._mPriceType && (SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1),
                        this.changePriceBnt(2, !1))
                } else if (e.target == this._mbnt10000) {
                    if (ModleMove.getInstance.getTimeSpeedWW() > 0)
                        return;
                    3 != this._mPriceType && (SoundMgr.getInstance.play(SoundMgr.SOUND_CLICK, 1),
                        this.changePriceBnt(3, !1))
                }
        }
        ,
        t.prototype.changePriceBnt = function(e, t) {
            0 != ModleMove.getInstance.finish && (this._mPriceType = e,
                1 == e ? (this._mbtnBig5.visible = !0,
                    this._mbtnBig10.visible = !1,
                    this._mbtnBig20.visible = !1) : 2 == e ? (this._mbtnBig5.visible = !1,
                    this._mbtnBig10.visible = !0,
                    this._mbtnBig20.visible = !1) : 3 == e && (this._mbtnBig5.visible = !1,
                        this._mbtnBig10.visible = !1,
                        this._mbtnBig20.visible = !0),
                ClipMove.getInstance.changeClitype(e),
                ModleMove.getInstance.changeWWPrice(e, t),
                BackRowModle.getInstance.changeWWPrice(e, t))
        }
        ,
        t.prototype.getPriceType = function() {
            return 3 == this._mPriceType ? 20 : 2 == this._mPriceType ? 10 : 5
        }
        ,
        t.prototype.end = function() {
            this._mbeginMC.touchEnabled = !0
        }
        ,
        t.prototype.cleanBeginMC = function() {
            void 0 != this._mbeginMC && (this._mbeginMC.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this),
                this._mbeginMC.removeEventListener(GMovieClipEvent.played, this.end, this),
                GObjPool.getInstance.Gadd2Pool(this._mbeginMC),
            void 0 != this._mbeginMC.parent && this._mbeginMC.parent.removeChild(this._mbeginMC),
                delete this._mbeginMC)
        }
        ,
        t.prototype.hide = function() {
            e.prototype.hide.call(this),
            void 0 != this.mBg.parent && this.mBg.parent.removeChild(this.mBg),
            void 0 != this._mTimeTip.parent && this._mTimeTip.parent.removeChild(this._mTimeTip),
            void 0 != this._mTimeTipText.parent && this._mTimeTipText.parent.removeChild(this._mTimeTipText),
                MallWnd.getInstance.hide(),
                RedBonusWnd.getInstance.hide(),
                PushTipWnd.getInstance.hide(),
                TipUI.getInstance.hide(),
                ModleMove.getInstance.hide(),
                BackRowModle.getInstance.hide(),
                ClipMove.getInstance.hide(),
                RulesOrSkillUI.getInstance.hide(),
                RechargeWnd.getInstance.hide(),
                PayWnd.getInstance.hide(),
                this.cleanBeginMC(),
                this._mbnt100.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this),
                this._mbnt1000.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this),
                this._mbnt10000.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this),
                this._mRulesBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mSkillBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mPushBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mMallBnt.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this),
                this._mFeedbackBntMC.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBnt, this)
        }
        ,
        t.prototype.onHide = function() {
            e.prototype.onHide.call(this)
        }
        ,
        t
}(MDisplay.MUIWnd);
__reflect(WorldWnd.prototype, "WorldWnd");
var Main = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.once(egret.Event.ADDED_TO_STAGE, t.init, t),
            t
    }
    return __extends(t, e),
        t.prototype.init = function(e) {
            if (0 == GameValue.isDebug) {
                GameValue.userId = window.geta(),
                    GameValue.orderId = window.getb(),
                    GameValue.max5 = window.getc(),
                    GameValue.max10 = window.getd(),
                    GameValue.max20 = window.gete(),
                    GameValue.codeURL = window.getCodeVer(),
                void 0 == GameValue.codeURL && (GameValue.codeURL = "code_1");
                var t = document.domain
                    , i = t.replace("cdn.", "s.");
                HTTPRequest.getInstance.httpHeadUrlCDN = "http://" + t,
                    HTTPRequest.getInstance.httpHeadUrl = "http://" + i,
                    HTTPRequest.getInstance.url = "/hgame2/game_zww/"
            }
            var n = new GameMain;
            this.addChild(n)
        }
        ,
        t
}(egret.DisplayObjectContainer);
__reflect(Main.prototype, "Main");
var ResGroup = function() {
    function e() {}
    return e
}();
ResGroup.resGroupConfig = {
    "modleClipMC3_2.json": {
        images: ["wb.png", "shen.png", "maozi_2.png", "lian.png"],
        base: "resource/assets/images/flash/"
    },
    "loadTextMc.json": {
        images: ["loading_zi1.png"],
        base: "resource/assets/images/flash/"
    },
    "pustBntMC.json": {
        images: ["btn_tx.png"],
        base: "resource/assets/images/flash/"
    },
    "MomeyMC.json": {
        images: ["tx_0y.png", "tx_01.png", "tx_00.png"],
        base: "resource/assets/images/flash/"
    },
    "MoneyWnd.json": {
        images: ["zq_bg_zj.png", "zq_jl_di.png", "zq_yj_di.png", "updateText.png", "zq_btn2.png", "zq_zjjl_1.png", "zq_yj_1.png", "zq_ph_1.png", "zq_dhmx_1.png", "zq_btn1.png"],
        base: "resource/assets/images/ui/"
    },
    "modleDropMC3.json": {
        images: ["wb.png", "shen.png", "maozi_2.png", "lian.png"],
        base: "resource/assets/images/flash/"
    },
    "redRandomTextMC3.json": {
        images: ["yw_04.png", "yw_xx.png"],
        base: "resource/assets/images/flash/"
    },
    "RulesOrSkillUI.json": {
        images: ["wxts_bg.png", "wenzi_yxgz.png", "wenzi_zqjq.png"],
        base: "resource/assets/images/ui/"
    },
    "clipMC2.json": {
        images: ["shengzi.png", "jia_2a.png"],
        base: "resource/assets/images/flash/"
    },
    "burstOpenMC.json": {
        images: ["ppp.png", "peng_1.png", "levelup_button.png", "peng_2.png", "peng_3.png", "peng_4.png", "peng_5.png"],
        base: "resource/assets/images/flash/"
    },
    "btnStart.json": {
        images: ["btn_1_up.png", "btn_1_down.png"],
        base: "resource/assets/images/flash/"
    },
    "redRandomTextMC6.json": {
        images: ["yw_07.png", "yw_xx.png"],
        base: "resource/assets/images/flash/"
    },
    "modleDropMC4.json": {
        images: ["wb.png", "shen.png", "lian3.png", "lian.png", "maozi_3.png"],
        base: "resource/assets/images/flash/"
    },
    "KefuWnd.json": {
        images: ["zq_bg_zj.png", "zq_btn2.png", "zq_zjjl_1.png", "zq_btn1.png", "zq_yj_1.png", "zq_jl_di.png", "zq_yj_di.png", "zq_2vm_bg.png", "btn_2vm.png", "kefu.jpg"],
        base: "resource/assets/images/ui/"
    },
    "ribbonMC.json": {
        images: ["caid.png"],
        base: "resource/assets/images/flash/"
    },
    "clipMC3.json": {
        images: ["shengzi.png", "jia_3a.png"],
        base: "resource/assets/images/flash/"
    },
    "changeWWMC.json": {
        images: ["levelup_button.png", "yan_01.png"],
        base: "resource/assets/images/flash/"
    },
    "mcNetLoading.json": {
        images: ["dikuang.png", "yuan.png", "loading.png"],
        base: "resource/assets/images/flash/"
    },
    "modleDropMC1.json": {
        images: ["wb.png", "shen.png", "lian.png"],
        base: "resource/assets/images/flash/"
    },
    "everydayRan.json": {
        images: ["mrph_ban.png", "mrph_jinri_di.png", "zq_ph_di.png", "mrph_jinri_2.png", "zq_btn1.png", "mrph_jinri.png", "mrph_zuori.png", "xxx.png"],
        base: "resource/assets/images/ui/"
    },
    "pushWnd.json": {
        images: ["txqr_bg.png", "btn_txqr.png", "colse.png", "wupin1.png"],
        base: "resource/assets/images/ui/"
    },
    "modleClipMC5_1.json": {
        images: ["wb.png", "shen.png", "lian4.png", "maozi_4.png"],
        base: "resource/assets/images/flash/"
    },
    "bettomBtn.json": {
        images: ["ruzhang_bg.png", "ruzhang_1.png", "ruzhang_yuan.png", "ruzhang_0.png", "ruzhang_dian.png", "ruzhang_btn1.png", "ruzhang_btn2.png", "ruzhang_bg_x.png", "kuang.png", "btn_2_down.png", "5yuan.png", "btn_2_up.png", "10yuan.png", "20yuan.png", "touxiang.png", "btn_d_2.png", "btn_d_1.png", "btn_d_jww.png", "btn_d_kf.png", "btn_d_yj.png", "btn_d_ewm.png"],
        base: "resource/assets/images/ui/"
    },
    "clipMC2_2.json": {
        images: ["shengzi.png", "jia_2a.png"],
        base: "resource/assets/images/flash/"
    },
    "clipMC1_3.json": {
        images: ["shengzi.png", "jia_1a.png"],
        base: "resource/assets/images/flash/"
    },
    "HongBaoUI.json": {
        images: ["ruzhang_bg.png", "ruzhang_bg_x.png", "ruzhang_btn1.png", "ruzhang_btn2.png"],
        base: "resource/assets/images/ui/"
    },
    "modleClipMC4_2.json": {
        images: ["wb.png", "shen.png", "lian3.png", "lian.png", "maozi_3.png"],
        base: "resource/assets/images/flash/"
    },
    "modleClipMC2_2.json": {
        images: ["wb.png", "maozi_1b.png", "shen.png", "lian2.png", "maozi_1a.png", "lian.png"],
        base: "resource/assets/images/flash/"
    },
    "modleMC4.json": {
        images: ["wb.png", "shen.png", "lian3.png", "maozi_3.png"],
        base: "resource/assets/images/flash/"
    },
    "tsWnd.json": {
        images: ["dhcgh_bg.png", "2vmx.png", "sctswz_2.png", "btn_qd.png"],
        base: "resource/assets/images/ui/"
    },
    "modleBreakMC.json": {
        images: ["ji_yumao.png", "ji_chentu.png"],
        base: "resource/assets/images/flash/"
    },
    "clipMC2_3.json": {
        images: ["shengzi.png", "jia_2a.png"],
        base: "resource/assets/images/flash/"
    },
    "modleClipMC1_1.json": {
        images: ["wb.png", "shen.png"],
        base: "resource/assets/images/flash/"
    },
    "modleMC3.json": {
        images: ["wb.png", "shen.png", "maozi_2.png"],
        base: "resource/assets/images/flash/"
    },
    "smallProfitTipMC.json": {
        images: ["xzyb_d.png", "xzyb.png", "sl_syxx.png", "levelup_button.png"],
        base: "resource/assets/images/flash/"
    },
    "modleDropMC2.json": {
        images: ["wb.png", "maozi_1b.png", "shen.png", "lian2.png", "maozi_1a.png", "lian.png"],
        base: "resource/assets/images/flash/"
    },
    "modleClipMC5_2.json": {
        images: ["wb.png", "shen.png", "lian4.png", "lian.png", "maozi_4.png"],
        base: "resource/assets/images/flash/"
    },
    "modleDropMC5.json": {
        images: ["wb.png", "shen.png", "lian4.png", "lian.png", "maozi_4.png"],
        base: "resource/assets/images/flash/"
    },
    "redEnvelopesMC3.json": {
        images: ["ji_hb1.png"],
        base: "resource/assets/images/flash/"
    },
    "profitMC.json": {
        images: ["peng_hongbao_3.png", "peng_hongbao_2.png", "peng_hongbao_1.png", "gongxi.png", "zhuanru.png"],
        base: "resource/assets/images/flash/"
    },
    "modleMC1.json": {
        images: ["wb.png", "shen.png"],
        base: "resource/assets/images/flash/"
    },
    "modleClipMC5_3.json": {
        images: ["wb.png", "shen.png", "lian4.png", "lian.png", "maozi_4.png"],
        base: "resource/assets/images/flash/"
    },
    "modleClipMC3_3.json": {
        images: ["wb.png", "shen.png", "maozi_2.png", "lian.png"],
        base: "resource/assets/images/flash/"
    },
    "successBackMC3.json": {
        images: ["yw_bg.png", "bfl.png", "zjl.png", "peng_hongbao_3.png", "peng_hongbao_2.png", "peng_hongbao_1.png", "gongxi.png", "zhuanru.png"],
        base: "resource/assets/images/flash/"
    },
    "modleClipMC4_3.json": {
        images: ["wb.png", "shen.png", "lian3.png", "lian.png", "maozi_3.png"],
        base: "resource/assets/images/flash/"
    },
    "modleClipMC2_3.json": {
        images: ["wb.png", "maozi_1b.png", "shen.png", "lian2.png", "maozi_1a.png", "lian.png"],
        base: "resource/assets/images/flash/"
    },
    "PushSucc.json": {
        images: ["bbg.png", "loading_bar.png", "loading_bg.png", "dhcgh_bg.png", "btn_qd.png", "dhcgaaaaa.png"],
        base: "resource/assets/images/ui/"
    },
    "QCodeDistinguish.json": {
        images: ["fs2vm_bg.png", "2vmx.png"],
        base: "resource/assets/images/ui/"
    },
    "gameUI.json": {
        images: ["kuang2.png", "shengyu.png", "btn_tr1.png", "btn_tr2.png", "gonggaolan.png", "btn_10a.png", "btn_5a.png", "btn_20a.png", "btn_5b.png", "btn_10b.png", "btn_20b.png", "btn_tx.png", "tubiao_sctb.png", "sctb_honbaobubiao.png", "shengyu_jiangjin.png"],
        base: "resource/assets/images/ui/"
    },
    "bntBeginMC.json": {
        images: ["btn_1_up.png", "btn_1_down.png"],
        base: "resource/assets/images/flash/"
    },
    "clipMC1_2.json": {
        images: ["shengzi.png", "jia_1a.png"],
        base: "resource/assets/images/flash/"
    },
    "RedBonusWnd.json": {
        images: ["tongyong_kk.png", "cs_tiao.png", "cs_wenzi.png", "cs_hb.png", "btn_lqjl.png", "scjm_kc.png"],
        base: "resource/assets/images/ui/"
    },
    "redEffectsMC.json": {
        images: ["safafa.png", "bar_get.png", "levelup_button.png"],
        base: "resource/assets/images/flash/"
    },
    "PushTipWnd.json": {
        images: ["txqr_bg.png", "colse.png"],
        base: "resource/assets/images/ui/"
    },
    "redRandomTextMC4.json": {
        images: ["yw_05.png", "yw_xx.png"],
        base: "resource/assets/images/flash/"
    },
    "payWnd.json": {
        images: ["payBG.png", "zhifu_btn_x.png", "btn_sys.png"],
        base: "resource/assets/images/ui/"
    },
    "continueBntMC.json": {
        images: ["btn_da.png"],
        base: "resource/assets/images/flash/"
    },
    "loading.json": {
        images: ["bbg.png", "loading_bar.png", "loading_bg.png"],
        base: "resource/assets/images/ui/"
    },
    "RechargeWnd.json": {
        images: ["cz_bg.png", "cz_btn_5.png", "cz_btn_10.png", "cz_btn_20.png", "cz_btn_50.png", "cz_btn_100.png", "cz_btn_200.png", "2vmx.png"],
        base: "resource/assets/images/ui/"
    },
    "reminderUI.json": {
        images: ["wxts_bg.png"],
        base: "resource/assets/images/ui/"
    },
    "fakeMallWnd.json": {
        images: ["dhcgh_bg.png", "jinbsc_wz.png", "2vmx.png", "duihuan_1.png", "duihuan_2.png", "duihuan_4.png", "duihuan_3.png"],
        base: "resource/assets/images/ui/"
    },
    "modleMC2.json": {
        images: ["wb.png", "maozi_1b.png", "shen.png", "lian2.png", "maozi_1a.png"],
        base: "resource/assets/images/flash/"
    },
    "modleClipMC1_2.json": {
        images: ["wb.png", "shen.png", "lian.png"],
        base: "resource/assets/images/flash/"
    },
    "redRandomTextMC5.json": {
        images: ["yw_06.png", "yw_xx.png"],
        base: "resource/assets/images/flash/"
    },
    "starMc.json": {
        images: ["sl_syxx.png"],
        base: "resource/assets/images/flash/"
    },
    "feedbackBntMC.json": {
        images: ["cs_rukou.png", "cs_rukou1.png", "sl_syxx.png"],
        base: "resource/assets/images/flash/"
    },
    "QrodeWnd.json": {
        images: ["zq_2vm_bg.png", "btn_2vm.png", "btn_yongjingz.png", "btn_mrph.png"],
        base: "resource/assets/images/ui/"
    },
    "modleMC5.json": {
        images: ["wb.png", "shen.png", "lian4.png", "maozi_4.png"],
        base: "resource/assets/images/flash/"
    },
    "redRandomTextMC7.json": {
        images: ["yw_08.png", "yw_xx.png"],
        base: "resource/assets/images/flash/"
    },
    "redRandomTextMC1.json": {
        images: ["yw_03.png", "yw_xx.png"],
        base: "resource/assets/images/flash/"
    },
    "modleClipMC3_1.json": {
        images: ["wb.png", "shen.png", "maozi_2.png"],
        base: "resource/assets/images/flash/"
    },
    "modleClipMC4_1.json": {
        images: ["wb.png", "shen.png", "lian3.png", "maozi_3.png"],
        base: "resource/assets/images/flash/"
    },
    "profitMC3.json": {
        images: ["peng_hongbao_3.png", "peng_hongbao_2.png", "peng_hongbao_1.png", "gongxi.png", "zhuanru.png"],
        base: "resource/assets/images/flash/"
    },
    "redRandomOpenMC.json": {
        images: ["yw_k1.png"],
        base: "resource/assets/images/flash/"
    },
    "redRandomMC.json": {
        images: ["yw_bg.png", "yw_a.png", "yw_hd.png", "yw_01.png"],
        base: "resource/assets/images/flash/"
    },
    "redRandomTextMC2.json": {
        images: ["yw_02.png", "yw_xx.png"],
        base: "resource/assets/images/flash/"
    },
    "receiveSuccMC.json": {
        images: ["hongbao.png", "gaizi2.png", "safafa.png", "bar_get.png", "levelup_button.png", "gaizi.png"],
        base: "resource/assets/images/flash/"
    },
    "mallWnd.json": {
        images: ["sc_scjmdadadbj.png", "sc_baojizi.png", "sc_daojusc.png", "sc_jiazijiashuzi.png", "sc_jlfanbei3.png", "sc_wwaobshenzi.png", "sc_wwaojieshuzi.png", "sc_zjlutshenzi.png", "scjm_kc.png", "sc_wwaobshen.png", "sc_wwaojieshu.png", "sc_jiazijiashu.png", "sc_zjlutshen.png", "sc_baoji.png", "sc_jlfanbei1.png", "sc_xzhfg.png", "sc_daojusmtiao.png", "sc_daojusm.png", "sc_shiyonjyundxiaokuan.png"],
        base: "resource/assets/images/ui/"
    },
    "redEnvelopesMC.json": {
        images: ["ji_hb1.png"],
        base: "resource/assets/images/flash/"
    },
    "modleClipMC1_3.json": {
        images: ["wb.png", "shen.png", "lian.png"],
        base: "resource/assets/images/flash/"
    },
    "modleClipMC2_1.json": {
        images: ["wb.png", "maozi_1b.png", "shen.png", "lian2.png", "maozi_1a.png"],
        base: "resource/assets/images/flash/"
    },
    "clipMC3_3.json": {
        images: ["shengzi.png", "jia_3a.png"],
        base: "resource/assets/images/flash/"
    },
    "successBackMC.json": {
        images: ["yw_bg.png", "bfl.png", "zjl.png", "peng_hongbao_3.png", "peng_hongbao_2.png", "peng_hongbao_1.png", "gongxi.png", "zhuanru.png"],
        base: "resource/assets/images/flash/"
    },
    "starsMC.json": {
        images: ["sl_syxx.png"],
        base: "resource/assets/images/flash/"
    },
    "TipUI.json": {
        images: ["kuang_tishi.png", "wenzi_7.png"],
        base: "resource/assets/images/ui/"
    },
    "clipMC1.json": {
        images: ["shengzi.png", "jia_1a.png"],
        base: "resource/assets/images/flash/"
    },
    "clipMC3_2.json": {
        images: ["shengzi.png", "jia_3a.png"],
        base: "resource/assets/images/flash/"
    }
},
    __reflect(ResGroup.prototype, "ResGroup");
