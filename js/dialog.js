! function() {
    function e() {
        var a = f.attr("hl-cls");
        clearTimeout(g), f.removeClass(a).removeAttr("hl-cls"), f = null, h.off("touchend touchmove touchcancel", e)
    }
    var f, g, h = $(document);
    $.fn.highlight = function(a, b) {
        return this.each(function() {
            var c = $(this);
            c.css("-webkit-tap-highlight-color", "rgba(255,255,255,0)").off("touchstart.hl"), a && c.on("touchstart.hl", function(d) {
                var j;
                f = b ? (j = $(d.target).closest(b, this)) && j.length && j : c, f && (f.attr("hl-cls", a), g = setTimeout(function() {
                    f.addClass(a)
                }, 100), h.on("touchend touchmove touchcancel", e))
            })
        })
    }
}(),
    function() {
        function e(b) {
            this._options = this._options || {}, $.extend(this._options, h), $.extend(this._options, b), this.init()
        }

        function f(i) {
            var j, k, l, m = this,
                n = m._options;
            switch (i.type) {
                case n.RotateChangeEvent:
                    n._isOpen && this.refresh();
                    break;
                case "touchmove":
                    n.scrollMove && i.preventDefault();
                    break;
                case "click":
                    if (n._mask && ($.contains(n._mask[0], i.target) || n._mask[0] === i.target)) {
                        return "function" == typeof n.maskClick && n.maskClick()
                    }
                    k = n._wrap.get(0), (j = $(i.target).closest(".close", k)) && j.length ? m.close() : (j = $(i.target).closest(".ui-dialog-btns .ui-btn", k)) && j.length && (l = n.buttons[j.attr("data-key")], l && l.apply(m, arguments))
            }
        }
        var g = {
                close: '<a class="close" title="关闭"></a>',
                mask: '<div class="ui-mask"></div>',
                title: '<div class="ui-dialog-title"></div>',
                wrap: '<div class="ui-dialog"><div class="ui-dialog-content"></div>BTNSTRING</div> '
            },
            h = {
                autoOpen: !1,
                buttons: null,
                closeBtn: !1,
                mask: !0,
                width: 300,
                height: "auto",
                title: void 0,
                content: null,
                scrollMove: !0,
                container: null,
                maskClick: null,
                beforeOpen: null,
                afterOpen: null,
                beforeClose: null,
                afterClose: null,
                style: null,
                closeTime: 2000,
                className: ""
            };
        e.prototype.getWrap = function() {
            return this._options._wrap
        }, e.prototype.init = function() {
            var b, c = this,
                l = c._options,
                m = 0,
                n = $.proxy(f, c),
                o = {};
            l._container = $(l.container || document.body), (l._cIsBody = l._container.is("body")) || l._container.addClass("ui-dialog-container"), o.btns = b = [], l.buttons && $.each(l.buttons, function(a) {
                b.push({
                    index: ++m,
                    text: a,
                    key: a
                })
            }), l._mask = l.mask ? $(g.mask).appendTo(l._container) : null;
            var p = "";
            if (b[0]) {
                p = '<div class="ui-dialog-btns">';
                for (var m = 0, q = b.length; q > m; m++) {
                    var r = b[m];
                    p += '<a class="ui-btn ui-btn-' + m + '" data-key="' + r.key + '">' + r.text + "</a>"
                }
                p += "</div>"
            }
            l._wrap = $(g.wrap.replace("BTNSTRING", p)).appendTo(l._container), l._content = $(".ui-dialog-content", l._wrap), l._title = $(g.title), l._close = l.closeBtn && $(g.close).highlight("close-hover").on("click", function() {
                c.close()
            }), c.title(l.title), c.content(l.content), b.length && $(".ui-dialog-btns .ui-btn", l._wrap).highlight("ui-state-hover"), l._wrap.css({
                width: l.width,
                height: l.height
            }).addClass(l.className), l.RotateChangeEvent = "onorientationchange" in window ? "orientationchange" : "resize", $(window).on(l.RotateChangeEvent, n), l._wrap.on("click", n), l._mask && l._mask.on("click", n), l.autoOpen && c.open()
        }, e.prototype.calculate = function() {
            var i, j, k = this,
                l = k._options,
                m = document.body,
                n = {},
                o = l._cIsBody,
                p = Math.round;
            return l.mask && (n.mask = o ? {
                width: "100%",
                height: Math.max(m.scrollHeight, m.clientHeight) - 1
            } : {
                width: "100%",
                height: "100%"
            }), i = l._wrap.offset(), j = $(window), n.wrap = {
                left: "50%",
                marginLeft: -p(l._wrap.width() / 2) + "px",
                top: o ? p(j.height() / 2) + window.pageYOffset : "50%",
                marginTop: -p(l._wrap.height() / 2) + "px"
            }, n
        }, e.prototype.refresh = function() {
            var i, j, k = this,
                l = k._options;
            return j = function() {
                i = k.calculate(), i.mask && l._mask.css(i.mask), l._wrap.css(i.wrap)
            }, $.os && $.os.ios && document.activeElement && /input|textarea|select/i.test(document.activeElement.tagName) ? (document.body.scrollLeft = 0, setTimeout(j, 200)) : setTimeout(j, 200), k
        }, e.prototype.open = function(b) {
            var i, j = this._options,
                k = this;
            if (!j._isOpen) {
                if (b && k.content(b), j._isOpen = !0, "tip" == j.style) {
                    j.mask && j._mask.addClass("ui-dialog-tran-03"), j._wrap.addClass("ui-dialog-black");
                    var l = k.getWrap();
                    setTimeout(function() {
                        j.mask && j._mask.animate({
                            opacity: 0
                        }, 1000, "swing", function() {
                            j._mask.css({
                                opacity: ""
                            })
                        }), l.animate({
                            opacity: 0
                        }, 1000, "swing", function() {
                            l.css({
                                opacity: "1"
                            }), k.close()
                        })
                    }, j.closeTime)
                }
                if ("function" == typeof j.beforeOpen && (i = j.beforeOpen()), i) {
                    return this
                }
                j._wrap.css("display", "block"), j._mask && j._mask.css("display", "block"), this.refresh(), $(document).on("touchmove", $.proxy(f, this)), "function" == typeof j.afterOpen && j.afterOpen()
            }
        }, e.prototype.close = function(c) {
            var d = this._options;
            return "tip" == d.style && d.mask && d._mask.removeClass("ui-dialog-tran-03"), "function" == typeof d.beforeClose && d.beforeClose(), d._isOpen = !1, d._wrap.css("display", "none"), c ? this : (d._mask && d._mask.css("display", "none"), $(document).off("touchmove", this.eventHandler), "function" == typeof d.afterClose && d.afterClose(this), this)
        }, e.prototype.title = function(d) {
            var i = this._options,
                j = void 0 !== d;
            return j && (d = (i.title = d) ? "<h3>" + d + "</h3>" : d, i._title.html(d)[d ? "prependTo" : "remove"](i._wrap), i._close && i._close.prependTo(i.title ? i._title : i._wrap)), j ? this : i.title
        }, e.prototype.content = function(d) {
            var i = this._options,
                j = void 0 !== d;
            return j && i._content.empty().append(i.content = d), j ? this : i.content
        }, e.prototype.destroy = function() {
            var c = this._options,
                d = this.eventHandler;
            return $(window).off(c.RotateChangeEvent, d), $(document).off("touchmove", d), c._wrap.off("click", d).remove(), c._mask && c._mask.off("click", d).remove(), c._close && c._close.highlight(), this
        }, $.dialog = function(a) {
            return new e(a)
        }
    }(),
    function() {
        function e(d, i) {
            var j = {
                autoOpen: !0,
                closeBtn: !1,
                style: "tip",
                mask: i,
                closeTime: 1000,
                content: d
            };
            return $.dialog(j)
        }

        function f(a, c) {
            c ? "object" == typeof h ? h.open(a) : h = e(a, !0) : "object" == typeof g ? g.open(a) : g = e(a, !1)
        }
        var g, h;
        $.tip = f
    }();