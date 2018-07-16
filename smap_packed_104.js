/*!
 * Bootstrap.js by @fat & @mdo
 * Copyright 2012 Twitter, Inc.
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 */
!function (e) {
    e(function () {
        "use strict";
        e.support.transition = function () {
            var e = function () {
                var e = document.createElement("bootstrap"), t = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                }, n;
                for (n in t)if (e.style[n] !== undefined)return t[n]
            }();
            return e && {end: e}
        }()
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = '[data-dismiss="alert"]', n = function (n) {
        e(n).on("click", t, this.close)
    };
    n.prototype.close = function (t) {
        function s() {
            i.trigger("closed").remove()
        }

        var n = e(this), r = n.attr("data-target"), i;
        r || (r = n.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), i = e(r), t && t.preventDefault(), i.length || (i = n.hasClass("alert") ? n : n.parent()), i.trigger(t = e.Event("close"));
        if (t.isDefaultPrevented())return;
        i.removeClass("in"), e.support.transition && i.hasClass("fade") ? i.on(e.support.transition.end, s) : s()
    }, e.fn.alert = function (t) {
        return this.each(function () {
            var r = e(this), i = r.data("alert");
            i || r.data("alert", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.alert.Constructor = n, e(function () {
        e("body").on("click.alert.data-api", t, n.prototype.close)
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
    };
    t.prototype.setState = function (e) {
        var t = "disabled", n = this.$element, r = n.data(), i = n.is("input") ? "val" : "html";
        e += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[e] || this.options[e]), setTimeout(function () {
            e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }, t.prototype.toggle = function () {
        var e = this.$element.closest('[data-toggle="buttons-radio"]');
        e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
    }, e.fn.button = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("button"), s = typeof n == "object" && n;
            i || r.data("button", i = new t(this, s)), n == "toggle" ? i.toggle() : n && i.setState(n)
        })
    }, e.fn.button.defaults = {loadingText: "loading..."}, e.fn.button.Constructor = t, e(function () {
        e("body").on("click.button.data-api", "[data-toggle^=button]", function (t) {
            var n = e(t.target);
            n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
        })
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = n, this.options.slide && this.slide(this.options.slide), this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.prototype = {
        cycle: function (t) {
            return t || (this.paused = !1), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
        }, to: function (t) {
            var n = this.$element.find(".item.active"), r = n.parent().children(), i = r.index(n), s = this;
            if (t > r.length - 1 || t < 0)return;
            return this.sliding ? this.$element.one("slid", function () {
                s.to(t)
            }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", e(r[t]))
        }, pause: function (t) {
            return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle()), clearInterval(this.interval), this.interval = null, this
        }, next: function () {
            if (this.sliding)return;
            return this.slide("next")
        }, prev: function () {
            if (this.sliding)return;
            return this.slide("prev")
        }, slide: function (t, n) {
            var r = this.$element.find(".item.active"), i = n || r[t](), s = this.interval,
                o = t == "next" ? "left" : "right", u = t == "next" ? "first" : "last", a = this,
                f = e.Event("slide", {relatedTarget: i[0]});
            this.sliding = !0, s && this.pause(), i = i.length ? i : this.$element.find(".item")[u]();
            if (i.hasClass("active"))return;
            if (e.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(f);
                if (f.isDefaultPrevented())return;
                i.addClass(t), i[0].offsetWidth, r.addClass(o), i.addClass(o), this.$element.one(e.support.transition.end, function () {
                    i.removeClass([t, o].join(" ")).addClass("active"), r.removeClass(["active", o].join(" ")), a.sliding = !1, setTimeout(function () {
                        a.$element.trigger("slid")
                    }, 0)
                })
            } else {
                this.$element.trigger(f);
                if (f.isDefaultPrevented())return;
                r.removeClass("active"), i.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return s && this.cycle(), this
        }
    }, e.fn.carousel = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("carousel"),
                s = e.extend({}, e.fn.carousel.defaults, typeof n == "object" && n),
                o = typeof n == "string" ? n : s.slide;
            i || r.data("carousel", i = new t(this, s)), typeof n == "number" ? i.to(n) : o ? i[o]() : s.interval && i.cycle()
        })
    }, e.fn.carousel.defaults = {interval: 5e3, pause: "hover"}, e.fn.carousel.Constructor = t, e(function () {
        e("body").on("click.carousel.data-api", "[data-slide]", function (t) {
            var n = e(this), r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")),
                s = !i.data("modal") && e.extend({}, i.data(), n.data());
            i.carousel(s), t.preventDefault()
        })
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
    };
    t.prototype = {
        constructor: t, dimension: function () {
            var e = this.$element.hasClass("width");
            return e ? "width" : "height"
        }, show: function () {
            var t, n, r, i;
            if (this.transitioning)return;
            t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), r = this.$parent && this.$parent.find("> .accordion-group > .in");
            if (r && r.length) {
                i = r.data("collapse");
                if (i && i.transitioning)return;
                r.collapse("hide"), i || r.data("collapse", null)
            }
            this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), e.support.transition && this.$element[t](this.$element[0][n])
        }, hide: function () {
            var t;
            if (this.transitioning)return;
            t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0)
        }, reset: function (e) {
            var t = this.dimension();
            return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[e !== null ? "addClass" : "removeClass"]("collapse"), this
        }, transition: function (t, n, r) {
            var i = this, s = function () {
                n.type == "show" && i.reset(), i.transitioning = 0, i.$element.trigger(r)
            };
            this.$element.trigger(n);
            if (n.isDefaultPrevented())return;
            this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, s) : s()
        }, toggle: function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    }, e.fn.collapse = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("collapse"), s = typeof n == "object" && n;
            i || r.data("collapse", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.collapse.defaults = {toggle: !0}, e.fn.collapse.Constructor = t, e(function () {
        e("body").on("click.collapse.data-api", "[data-toggle=collapse]", function (t) {
            var n = e(this), r,
                i = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""),
                s = e(i).data("collapse") ? "toggle" : n.data();
            n[e(i).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), e(i).collapse(s)
        })
    })
}(window.jQuery), !function (e) {
    "use strict";
    function r() {
        i(e(t)).removeClass("open")
    }

    function i(t) {
        var n = t.attr("data-target"), r;
        return n || (n = t.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")), r = e(n), r.length || (r = t.parent()), r
    }

    var t = "[data-toggle=dropdown]", n = function (t) {
        var n = e(t).on("click.dropdown.data-api", this.toggle);
        e("html").on("click.dropdown.data-api", function () {
            n.parent().removeClass("open")
        })
    };
    n.prototype = {
        constructor: n, toggle: function (t) {
            var n = e(this), s, o;
            if (n.is(".disabled, :disabled"))return;
            return s = i(n), o = s.hasClass("open"), r(), o || (s.toggleClass("open"), n.focus()), !1
        }, keydown: function (t) {
            var n, r, s, o, u, a;
            if (!/(38|40|27)/.test(t.keyCode))return;
            n = e(this), t.preventDefault(), t.stopPropagation();
            if (n.is(".disabled, :disabled"))return;
            o = i(n), u = o.hasClass("open");
            if (!u || u && t.keyCode == 27)return n.click();
            r = e("[role=menu] li:not(.divider) a", o);
            if (!r.length)return;
            a = r.index(r.filter(":focus")), t.keyCode == 38 && a > 0 && a--, t.keyCode == 40 && a < r.length - 1 && a++, ~a || (a = 0), r.eq(a).focus()
        }
    }, e.fn.dropdown = function (t) {
        return this.each(function () {
            var r = e(this), i = r.data("dropdown");
            i || r.data("dropdown", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.dropdown.Constructor = n, e(function () {
        e("html").on("click.dropdown.data-api touchstart.dropdown.data-api", r), e("body").on("click.dropdown touchstart.dropdown.data-api", ".dropdown form", function (e) {
            e.stopPropagation()
        }).on("click.dropdown.data-api touchstart.dropdown.data-api", t, n.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", t + ", [role=menu]", n.prototype.keydown)
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t, n) {
        this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    t.prototype = {
        constructor: t, toggle: function () {
            return this[this.isShown ? "hide" : "show"]()
        }, show: function () {
            var t = this, n = e.Event("show");
            this.$element.trigger(n);
            if (this.isShown || n.isDefaultPrevented())return;
            e("body").addClass("modal-open"), this.isShown = !0, this.escape(), this.backdrop(function () {
                var n = e.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1).focus(), t.enforceFocus(), n ? t.$element.one(e.support.transition.end, function () {
                    t.$element.trigger("shown")
                }) : t.$element.trigger("shown")
            })
        }, hide: function (t) {
            t && t.preventDefault();
            var n = this;
            t = e.Event("hide"), this.$element.trigger(t);
            if (!this.isShown || t.isDefaultPrevented())return;
            this.isShown = !1, e("body").removeClass("modal-open"), this.escape(), e(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
        }, enforceFocus: function () {
            var t = this;
            e(document).on("focusin.modal", function (e) {
                t.$element[0] !== e.target && !t.$element.has(e.target).length && t.$element.focus()
            })
        }, escape: function () {
            var e = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (t) {
                t.which == 27 && e.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        }, hideWithTransition: function () {
            var t = this, n = setTimeout(function () {
                t.$element.off(e.support.transition.end), t.hideModal()
            }, 500);
            this.$element.one(e.support.transition.end, function () {
                clearTimeout(n), t.hideModal()
            })
        }, hideModal: function (e) {
            this.$element.hide().trigger("hidden"), this.backdrop()
        }, removeBackdrop: function () {
            this.$backdrop.remove(), this.$backdrop = null
        }, backdrop: function (t) {
            var n = this, r = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var i = e.support.transition && r;
                this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.options.backdrop != "static" && this.$backdrop.click(e.proxy(this.hide, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), i ? this.$backdrop.one(e.support.transition.end, t) : t()
            } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, e.proxy(this.removeBackdrop, this)) : this.removeBackdrop()) : t && t()
        }
    }, e.fn.modal = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("modal"),
                s = e.extend({}, e.fn.modal.defaults, r.data(), typeof n == "object" && n);
            i || r.data("modal", i = new t(this, s)), typeof n == "string" ? i[n]() : s.show && i.show()
        })
    }, e.fn.modal.defaults = {backdrop: !0, keyboard: !0, show: !0}, e.fn.modal.Constructor = t, e(function () {
        e("body").on("click.modal.data-api", '[data-toggle="modal"]', function (t) {
            var n = e(this), r = n.attr("href"), i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
                s = i.data("modal") ? "toggle" : e.extend({remote: !/#/.test(r) && r}, i.data(), n.data());
            t.preventDefault(), i.modal(s).one("hide", function () {
                n.focus()
            })
        })
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("tooltip", e, t)
    };
    t.prototype = {
        constructor: t, init: function (t, n, r) {
            var i, s;
            this.type = t, this.$element = e(n), this.options = this.getOptions(r), this.enabled = !0, this.options.trigger == "click" ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : this.options.trigger != "manual" && (i = this.options.trigger == "hover" ? "mouseenter" : "focus", s = this.options.trigger == "hover" ? "mouseleave" : "blur", this.$element.on(i + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.leave, this))), this.options.selector ? this._options = e.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, getOptions: function (t) {
            return t = e.extend({}, e.fn[this.type].defaults, t, this.$element.data()), t.delay && typeof t.delay == "number" && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), t
        }, enter: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            if (!n.options.delay || !n.options.delay.show)return n.show();
            clearTimeout(this.timeout), n.hoverState = "in", this.timeout = setTimeout(function () {
                n.hoverState == "in" && n.show()
            }, n.options.delay.show)
        }, leave: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            this.timeout && clearTimeout(this.timeout);
            if (!n.options.delay || !n.options.delay.hide)return n.hide();
            n.hoverState = "out", this.timeout = setTimeout(function () {
                n.hoverState == "out" && n.hide()
            }, n.options.delay.hide)
        }, show: function () {
            var e, t, n, r, i, s, o;
            if (this.hasContent() && this.enabled) {
                e = this.tip(), this.setContent(), this.options.animation && e.addClass("fade"), s = typeof this.options.placement == "function" ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, t = /in/.test(s), e.remove().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).appendTo(t ? this.$element : document.body), n = this.getPosition(t), r = e[0].offsetWidth, i = e[0].offsetHeight;
                switch (t ? s.split(" ")[1] : s) {
                    case"bottom":
                        o = {top: n.top + n.height, left: n.left + n.width / 2 - r / 2};
                        break;
                    case"top":
                        o = {top: n.top - i, left: n.left + n.width / 2 - r / 2};
                        break;
                    case"left":
                        o = {top: n.top + n.height / 2 - i / 2, left: n.left - r};
                        break;
                    case"right":
                        o = {top: n.top + n.height / 2 - i / 2, left: n.left + n.width}
                }
                e.css(o).addClass(s).addClass("in")
            }
        }, setContent: function () {
            var e = this.tip(), t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
        }, hide: function () {
            function r() {
                var t = setTimeout(function () {
                    n.off(e.support.transition.end).remove()
                }, 500);
                n.one(e.support.transition.end, function () {
                    clearTimeout(t), n.remove()
                })
            }

            var t = this, n = this.tip();
            return n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? r() : n.remove(), this
        }, fixTitle: function () {
            var e = this.$element;
            (e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").removeAttr("title")
        }, hasContent: function () {
            return this.getTitle()
        }, getPosition: function (t) {
            return e.extend({}, t ? {top: 0, left: 0} : this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        }, getTitle: function () {
            var e, t = this.$element, n = this.options;
            return e = t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title), e
        }, tip: function () {
            return this.$tip = this.$tip || e(this.options.template)
        }, validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, enable: function () {
            this.enabled = !0
        }, disable: function () {
            this.enabled = !1
        }, toggleEnabled: function () {
            this.enabled = !this.enabled
        }, toggle: function () {
            this[this.tip().hasClass("in") ? "hide" : "show"]()
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }, e.fn.tooltip = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("tooltip"), s = typeof n == "object" && n;
            i || r.data("tooltip", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover",
        title: "",
        delay: 0,
        html: !0
    }
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("popover", e, t)
    };
    t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {
        constructor: t, setContent: function () {
            var e = this.tip(), t = this.getTitle(), n = this.getContent();
            e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content > *")[this.options.html ? "html" : "text"](n), e.removeClass("fade top bottom left right in")
        }, hasContent: function () {
            return this.getTitle() || this.getContent()
        }, getContent: function () {
            var e, t = this.$element, n = this.options;
            return e = t.attr("data-content") || (typeof n.content == "function" ? n.content.call(t[0]) : n.content), e
        }, tip: function () {
            return this.$tip || (this.$tip = e(this.options.template)), this.$tip
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }), e.fn.popover = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("popover"), s = typeof n == "object" && n;
            i || r.data("popover", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    })
}(window.jQuery), !function (e) {
    "use strict";
    function t(t, n) {
        var r = e.proxy(this.process, this), i = e(t).is("body") ? e(window) : e(t), s;
        this.options = e.extend({}, e.fn.scrollspy.defaults, n), this.$scrollElement = i.on("scroll.scroll-spy.data-api", r), this.selector = (this.options.target || (s = e(t).attr("href")) && s.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = e("body"), this.refresh(), this.process()
    }

    t.prototype = {
        constructor: t, refresh: function () {
            var t = this, n;
            this.offsets = e([]), this.targets = e([]), n = this.$body.find(this.selector).map(function () {
                var t = e(this), n = t.data("target") || t.attr("href"), r = /^#\w/.test(n) && e(n);
                return r && r.length && [[r.position().top, n]] || null
            }).sort(function (e, t) {
                return e[0] - t[0]
            }).each(function () {
                t.offsets.push(this[0]), t.targets.push(this[1])
            })
        }, process: function () {
            var e = this.$scrollElement.scrollTop() + this.options.offset,
                t = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                n = t - this.$scrollElement.height(), r = this.offsets, i = this.targets, s = this.activeTarget, o;
            if (e >= n)return s != (o = i.last()[0]) && this.activate(o);
            for (o = r.length; o--;)s != i[o] && e >= r[o] && (!r[o + 1] || e <= r[o + 1]) && this.activate(i[o])
        }, activate: function (t) {
            var n, r;
            this.activeTarget = t, e(this.selector).parent(".active").removeClass("active"), r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', n = e(r).parent("li").addClass("active"), n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
        }
    }, e.fn.scrollspy = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("scrollspy"), s = typeof n == "object" && n;
            i || r.data("scrollspy", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.defaults = {offset: 10}, e(window).on("load", function () {
        e('[data-spy="scroll"]').each(function () {
            var t = e(this);
            t.scrollspy(t.data())
        })
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t) {
        this.element = e(t)
    };
    t.prototype = {
        constructor: t, show: function () {
            var t = this.element, n = t.closest("ul:not(.dropdown-menu)"), r = t.attr("data-target"), i, s, o;
            r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
            if (t.parent("li").hasClass("active"))return;
            i = n.find(".active a").last()[0], o = e.Event("show", {relatedTarget: i}), t.trigger(o);
            if (o.isDefaultPrevented())return;
            s = e(r), this.activate(t.parent("li"), n), this.activate(s, s.parent(), function () {
                t.trigger({type: "shown", relatedTarget: i})
            })
        }, activate: function (t, n, r) {
            function o() {
                i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
            }

            var i = n.find("> .active"), s = r && e.support.transition && i.hasClass("fade");
            s ? i.one(e.support.transition.end, o) : o(), i.removeClass("in")
        }
    }, e.fn.tab = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("tab");
            i || r.data("tab", i = new t(this)), typeof n == "string" && i[n]()
        })
    }, e.fn.tab.Constructor = t, e(function () {
        e("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (t) {
            t.preventDefault(), e(this).tab("show")
        })
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.typeahead.defaults, n), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.$menu = e(this.options.menu).appendTo("body"), this.source = this.options.source, this.shown = !1, this.listen()
    };
    t.prototype = {
        constructor: t, select: function () {
            var e = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(e)).change(), this.hide()
        }, updater: function (e) {
            return e
        }, show: function () {
            var t = e.extend({}, this.$element.offset(), {height: this.$element[0].offsetHeight});
            return this.$menu.css({top: t.top + t.height, left: t.left}), this.$menu.show(), this.shown = !0, this
        }, hide: function () {
            return this.$menu.hide(), this.shown = !1, this
        }, lookup: function (t) {
            var n;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (n = e.isFunction(this.source) ? this.source(this.query, e.proxy(this.process, this)) : this.source, n ? this.process(n) : this)
        }, process: function (t) {
            var n = this;
            return t = e.grep(t, function (e) {
                return n.matcher(e)
            }), t = this.sorter(t), t.length ? this.render(t.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        }, matcher: function (e) {
            return ~e.toLowerCase().indexOf(this.query.toLowerCase())
        }, sorter: function (e) {
            var t = [], n = [], r = [], i;
            while (i = e.shift())i.toLowerCase().indexOf(this.query.toLowerCase()) ? ~i.indexOf(this.query) ? n.push(i) : r.push(i) : t.push(i);
            return t.concat(n, r)
        }, highlighter: function (e) {
            var t = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return e.replace(new RegExp("(" + t + ")", "ig"), function (e, t) {
                return "<strong>" + t + "</strong>"
            })
        }, render: function (t) {
            var n = this;
            return t = e(t).map(function (t, r) {
                return t = e(n.options.item).attr("data-value", r), t.find("a").html(n.highlighter(r)), t[0]
            }), t.first().addClass("active"), this.$menu.html(t), this
        }, next: function (t) {
            var n = this.$menu.find(".active").removeClass("active"), r = n.next();
            r.length || (r = e(this.$menu.find("li")[0])), r.addClass("active")
        }, prev: function (e) {
            var t = this.$menu.find(".active").removeClass("active"), n = t.prev();
            n.length || (n = this.$menu.find("li").last()), n.addClass("active")
        }, listen: function () {
            this.$element.on("blur", e.proxy(this.blur, this)).on("keypress", e.proxy(this.keypress, this)).on("keyup", e.proxy(this.keyup, this)), (e.browser.chrome || e.browser.webkit || e.browser.msie) && this.$element.on("keydown", e.proxy(this.keydown, this)), this.$menu.on("click", e.proxy(this.click, this)).on("mouseenter", "li", e.proxy(this.mouseenter, this))
        }, move: function (e) {
            if (!this.shown)return;
            switch (e.keyCode) {
                case 9:
                case 13:
                case 27:
                    e.preventDefault();
                    break;
                case 38:
                    e.preventDefault(), this.prev();
                    break;
                case 40:
                    e.preventDefault(), this.next()
            }
            e.stopPropagation()
        }, keydown: function (t) {
            this.suppressKeyPressRepeat = !~e.inArray(t.keyCode, [40, 38, 9, 13, 27]), this.move(t)
        }, keypress: function (e) {
            if (this.suppressKeyPressRepeat)return;
            this.move(e)
        }, keyup: function (e) {
            switch (e.keyCode) {
                case 40:
                case 38:
                    break;
                case 9:
                case 13:
                    if (!this.shown)return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown)return;
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
            e.stopPropagation(), e.preventDefault()
        }, blur: function (e) {
            var t = this;
            setTimeout(function () {
                t.hide()
            }, 150)
        }, click: function (e) {
            e.stopPropagation(), e.preventDefault(), this.select()
        }, mouseenter: function (t) {
            this.$menu.find(".active").removeClass("active"), e(t.currentTarget).addClass("active")
        }
    }, e.fn.typeahead = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("typeahead"), s = typeof n == "object" && n;
            i || r.data("typeahead", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, e.fn.typeahead.Constructor = t, e(function () {
        e("body").on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (t) {
            var n = e(this);
            if (n.data("typeahead"))return;
            t.preventDefault(), n.typeahead(n.data())
        })
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t, n) {
        this.options = e.extend({}, e.fn.affix.defaults, n), this.$window = e(window).on("scroll.affix.data-api", e.proxy(this.checkPosition, this)), this.$element = e(t), this.checkPosition()
    };
    t.prototype.checkPosition = function () {
        if (!this.$element.is(":visible"))return;
        var t = e(document).height(), n = this.$window.scrollTop(), r = this.$element.offset(), i = this.options.offset,
            s = i.bottom, o = i.top, u = "affix affix-top affix-bottom", a;
        typeof i != "object" && (s = o = i), typeof o == "function" && (o = i.top()), typeof s == "function" && (s = i.bottom()), a = this.unpin != null && n + this.unpin <= r.top ? !1 : s != null && r.top + this.$element.height() >= t - s ? "bottom" : o != null && n <= o ? "top" : !1;
        if (this.affixed === a)return;
        this.affixed = a, this.unpin = a == "bottom" ? r.top - n : null, this.$element.removeClass(u).addClass("affix" + (a ? "-" + a : ""))
    }, e.fn.affix = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("affix"), s = typeof n == "object" && n;
            i || r.data("affix", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.affix.Constructor = t, e.fn.affix.defaults = {offset: 0}, e(window).on("load", function () {
        e('[data-spy="affix"]').each(function () {
            var t = e(this), n = t.data();
            n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
        })
    })
}(window.jQuery);
;

/* ========================================================================
 * bootstrap-switch - v3.3.2
 * http://www.bootstrap-switch.org
 * ========================================================================
 * Copyright 2012-2013 Mattia Larentis
 *
 * ========================================================================
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================================
 */

(function () {
    var t = [].slice;
    !function (e, i) {
        "use strict";
        var n;
        return n = function () {
            function t(t, i) {
                null == i && (i = {}), this.$element = e(t), this.options = e.extend({}, e.fn.bootstrapSwitch.defaults, {
                    state: this.$element.is(":checked"),
                    size: this.$element.data("size"),
                    animate: this.$element.data("animate"),
                    disabled: this.$element.is(":disabled"),
                    readonly: this.$element.is("[readonly]"),
                    indeterminate: this.$element.data("indeterminate"),
                    inverse: this.$element.data("inverse"),
                    radioAllOff: this.$element.data("radio-all-off"),
                    onColor: this.$element.data("on-color"),
                    offColor: this.$element.data("off-color"),
                    onText: this.$element.data("on-text"),
                    offText: this.$element.data("off-text"),
                    labelText: this.$element.data("label-text"),
                    handleWidth: this.$element.data("handle-width"),
                    labelWidth: this.$element.data("label-width"),
                    baseClass: this.$element.data("base-class"),
                    wrapperClass: this.$element.data("wrapper-class")
                }, i), this.$wrapper = e("<div>", {
                    "class": function (t) {
                        return function () {
                            var e;
                            return e = ["" + t.options.baseClass].concat(t._getClasses(t.options.wrapperClass)), e.push(t.options.state ? "" + t.options.baseClass + "-on" : "" + t.options.baseClass + "-off"), null != t.options.size && e.push("" + t.options.baseClass + "-" + t.options.size), t.options.disabled && e.push("" + t.options.baseClass + "-disabled"), t.options.readonly && e.push("" + t.options.baseClass + "-readonly"), t.options.indeterminate && e.push("" + t.options.baseClass + "-indeterminate"), t.options.inverse && e.push("" + t.options.baseClass + "-inverse"), t.$element.attr("id") && e.push("" + t.options.baseClass + "-id-" + t.$element.attr("id")), e.join(" ")
                        }
                    }(this)()
                }), this.$container = e("<div>", {"class": "" + this.options.baseClass + "-container"}), this.$on = e("<span>", {
                    html: this.options.onText,
                    "class": "" + this.options.baseClass + "-handle-on " + this.options.baseClass + "-" + this.options.onColor
                }), this.$off = e("<span>", {
                    html: this.options.offText,
                    "class": "" + this.options.baseClass + "-handle-off " + this.options.baseClass + "-" + this.options.offColor
                }), this.$label = e("<span>", {
                    html: this.options.labelText,
                    "class": "" + this.options.baseClass + "-label"
                }), this.$element.on("init.bootstrapSwitch", function (e) {
                    return function () {
                        return e.options.onInit.apply(t, arguments)
                    }
                }(this)), this.$element.on("switchChange.bootstrapSwitch", function (e) {
                    return function () {
                        return e.options.onSwitchChange.apply(t, arguments)
                    }
                }(this)), this.$container = this.$element.wrap(this.$container).parent(), this.$wrapper = this.$container.wrap(this.$wrapper).parent(), this.$element.before(this.options.inverse ? this.$off : this.$on).before(this.$label).before(this.options.inverse ? this.$on : this.$off), this.options.indeterminate && this.$element.prop("indeterminate", !0), this._init(), this._elementHandlers(), this._handleHandlers(), this._labelHandlers(), this._formHandler(), this._externalLabelHandler(), this.$element.trigger("init.bootstrapSwitch")
            }

            return t.prototype._constructor = t, t.prototype.state = function (t, e) {
                return "undefined" == typeof t ? this.options.state : this.options.disabled || this.options.readonly ? this.$element : this.options.state && !this.options.radioAllOff && this.$element.is(":radio") ? this.$element : (this.options.indeterminate && this.indeterminate(!1), t = !!t, this.$element.prop("checked", t).trigger("change.bootstrapSwitch", e), this.$element)
            }, t.prototype.toggleState = function (t) {
                return this.options.disabled || this.options.readonly ? this.$element : this.options.indeterminate ? (this.indeterminate(!1), this.state(!0)) : this.$element.prop("checked", !this.options.state).trigger("change.bootstrapSwitch", t)
            }, t.prototype.size = function (t) {
                return "undefined" == typeof t ? this.options.size : (null != this.options.size && this.$wrapper.removeClass("" + this.options.baseClass + "-" + this.options.size), t && this.$wrapper.addClass("" + this.options.baseClass + "-" + t), this._width(), this._containerPosition(), this.options.size = t, this.$element)
            }, t.prototype.animate = function (t) {
                return "undefined" == typeof t ? this.options.animate : (t = !!t, t === this.options.animate ? this.$element : this.toggleAnimate())
            }, t.prototype.toggleAnimate = function () {
                return this.options.animate = !this.options.animate, this.$wrapper.toggleClass("" + this.options.baseClass + "-animate"), this.$element
            }, t.prototype.disabled = function (t) {
                return "undefined" == typeof t ? this.options.disabled : (t = !!t, t === this.options.disabled ? this.$element : this.toggleDisabled())
            }, t.prototype.toggleDisabled = function () {
                return this.options.disabled = !this.options.disabled, this.$element.prop("disabled", this.options.disabled), this.$wrapper.toggleClass("" + this.options.baseClass + "-disabled"), this.$element
            }, t.prototype.readonly = function (t) {
                return "undefined" == typeof t ? this.options.readonly : (t = !!t, t === this.options.readonly ? this.$element : this.toggleReadonly())
            }, t.prototype.toggleReadonly = function () {
                return this.options.readonly = !this.options.readonly, this.$element.prop("readonly", this.options.readonly), this.$wrapper.toggleClass("" + this.options.baseClass + "-readonly"), this.$element
            }, t.prototype.indeterminate = function (t) {
                return "undefined" == typeof t ? this.options.indeterminate : (t = !!t, t === this.options.indeterminate ? this.$element : this.toggleIndeterminate())
            }, t.prototype.toggleIndeterminate = function () {
                return this.options.indeterminate = !this.options.indeterminate, this.$element.prop("indeterminate", this.options.indeterminate), this.$wrapper.toggleClass("" + this.options.baseClass + "-indeterminate"), this._containerPosition(), this.$element
            }, t.prototype.inverse = function (t) {
                return "undefined" == typeof t ? this.options.inverse : (t = !!t, t === this.options.inverse ? this.$element : this.toggleInverse())
            }, t.prototype.toggleInverse = function () {
                var t, e;
                return this.$wrapper.toggleClass("" + this.options.baseClass + "-inverse"), e = this.$on.clone(!0), t = this.$off.clone(!0), this.$on.replaceWith(t), this.$off.replaceWith(e), this.$on = t, this.$off = e, this.options.inverse = !this.options.inverse, this.$element
            }, t.prototype.onColor = function (t) {
                var e;
                return e = this.options.onColor, "undefined" == typeof t ? e : (null != e && this.$on.removeClass("" + this.options.baseClass + "-" + e), this.$on.addClass("" + this.options.baseClass + "-" + t), this.options.onColor = t, this.$element)
            }, t.prototype.offColor = function (t) {
                var e;
                return e = this.options.offColor, "undefined" == typeof t ? e : (null != e && this.$off.removeClass("" + this.options.baseClass + "-" + e), this.$off.addClass("" + this.options.baseClass + "-" + t), this.options.offColor = t, this.$element)
            }, t.prototype.onText = function (t) {
                return "undefined" == typeof t ? this.options.onText : (this.$on.html(t), this._width(), this._containerPosition(), this.options.onText = t, this.$element)
            }, t.prototype.offText = function (t) {
                return "undefined" == typeof t ? this.options.offText : (this.$off.html(t), this._width(), this._containerPosition(), this.options.offText = t, this.$element)
            }, t.prototype.labelText = function (t) {
                return "undefined" == typeof t ? this.options.labelText : (this.$label.html(t), this._width(), this.options.labelText = t, this.$element)
            }, t.prototype.handleWidth = function (t) {
                return "undefined" == typeof t ? this.options.handleWidth : (this.options.handleWidth = t, this._width(), this._containerPosition(), this.$element)
            }, t.prototype.labelWidth = function (t) {
                return "undefined" == typeof t ? this.options.labelWidth : (this.options.labelWidth = t, this._width(), this._containerPosition(), this.$element)
            }, t.prototype.baseClass = function () {
                return this.options.baseClass
            }, t.prototype.wrapperClass = function (t) {
                return "undefined" == typeof t ? this.options.wrapperClass : (t || (t = e.fn.bootstrapSwitch.defaults.wrapperClass), this.$wrapper.removeClass(this._getClasses(this.options.wrapperClass).join(" ")), this.$wrapper.addClass(this._getClasses(t).join(" ")), this.options.wrapperClass = t, this.$element)
            }, t.prototype.radioAllOff = function (t) {
                return "undefined" == typeof t ? this.options.radioAllOff : (t = !!t, t === this.options.radioAllOff ? this.$element : (this.options.radioAllOff = t, this.$element))
            }, t.prototype.onInit = function (t) {
                return "undefined" == typeof t ? this.options.onInit : (t || (t = e.fn.bootstrapSwitch.defaults.onInit), this.options.onInit = t, this.$element)
            }, t.prototype.onSwitchChange = function (t) {
                return "undefined" == typeof t ? this.options.onSwitchChange : (t || (t = e.fn.bootstrapSwitch.defaults.onSwitchChange), this.options.onSwitchChange = t, this.$element)
            }, t.prototype.destroy = function () {
                var t;
                return t = this.$element.closest("form"), t.length && t.off("reset.bootstrapSwitch").removeData("bootstrap-switch"), this.$container.children().not(this.$element).remove(), this.$element.unwrap().unwrap().off(".bootstrapSwitch").removeData("bootstrap-switch"), this.$element
            }, t.prototype._width = function () {
                var t, e;
                return t = this.$on.add(this.$off), t.add(this.$label).css("width", ""), e = "auto" === this.options.handleWidth ? Math.max(this.$on.width(), this.$off.width()) : this.options.handleWidth, t.width(e), this.$label.width(function (t) {
                    return function (i, n) {
                        return "auto" !== t.options.labelWidth ? t.options.labelWidth : e > n ? e : n
                    }
                }(this)), this._handleWidth = this.$on.outerWidth(), this._labelWidth = this.$label.outerWidth(), this.$container.width(2 * this._handleWidth + this._labelWidth), this.$wrapper.width(this._handleWidth + this._labelWidth)
            }, t.prototype._containerPosition = function (t, e) {
                return null == t && (t = this.options.state), this.$container.css("margin-left", function (e) {
                    return function () {
                        var i;
                        return i = [0, "-" + e._handleWidth + "px"], e.options.indeterminate ? "-" + e._handleWidth / 2 + "px" : t ? e.options.inverse ? i[1] : i[0] : e.options.inverse ? i[0] : i[1]
                    }
                }(this)), e ? setTimeout(function () {
                    return e()
                }, 50) : void 0
            }, t.prototype._init = function () {
                var t, e;
                return t = function (t) {
                    return function () {
                        return t._width(), t._containerPosition(null, function () {
                            return t.options.animate ? t.$wrapper.addClass("" + t.options.baseClass + "-animate") : void 0
                        })
                    }
                }(this), this.$wrapper.is(":visible") ? t() : e = i.setInterval(function (n) {
                    return function () {
                        return n.$wrapper.is(":visible") ? (t(), i.clearInterval(e)) : void 0
                    }
                }(this), 50)
            }, t.prototype._elementHandlers = function () {
                return this.$element.on({
                    "change.bootstrapSwitch": function (t) {
                        return function (i, n) {
                            var o;
                            return i.preventDefault(), i.stopImmediatePropagation(), o = t.$element.is(":checked"), t._containerPosition(o), o !== t.options.state ? (t.options.state = o, t.$wrapper.toggleClass("" + t.options.baseClass + "-off").toggleClass("" + t.options.baseClass + "-on"), n ? void 0 : (t.$element.is(":radio") && e("[name='" + t.$element.attr("name") + "']").not(t.$element).prop("checked", !1).trigger("change.bootstrapSwitch", !0), t.$element.trigger("switchChange.bootstrapSwitch", [o]))) : void 0
                        }
                    }(this), "focus.bootstrapSwitch": function (t) {
                        return function (e) {
                            return e.preventDefault(), t.$wrapper.addClass("" + t.options.baseClass + "-focused")
                        }
                    }(this), "blur.bootstrapSwitch": function (t) {
                        return function (e) {
                            return e.preventDefault(), t.$wrapper.removeClass("" + t.options.baseClass + "-focused")
                        }
                    }(this), "keydown.bootstrapSwitch": function (t) {
                        return function (e) {
                            if (e.which && !t.options.disabled && !t.options.readonly)switch (e.which) {
                                case 37:
                                    return e.preventDefault(), e.stopImmediatePropagation(), t.state(!1);
                                case 39:
                                    return e.preventDefault(), e.stopImmediatePropagation(), t.state(!0)
                            }
                        }
                    }(this)
                })
            }, t.prototype._handleHandlers = function () {
                return this.$on.on("click.bootstrapSwitch", function (t) {
                    return function (e) {
                        return e.preventDefault(), e.stopPropagation(), t.state(!1), t.$element.trigger("focus.bootstrapSwitch")
                    }
                }(this)), this.$off.on("click.bootstrapSwitch", function (t) {
                    return function (e) {
                        return e.preventDefault(), e.stopPropagation(), t.state(!0), t.$element.trigger("focus.bootstrapSwitch")
                    }
                }(this))
            }, t.prototype._labelHandlers = function () {
                return this.$label.on({
                    "mousedown.bootstrapSwitch touchstart.bootstrapSwitch": function (t) {
                        return function (e) {
                            return t._dragStart || t.options.disabled || t.options.readonly ? void 0 : (e.preventDefault(), e.stopPropagation(), t._dragStart = (e.pageX || e.originalEvent.touches[0].pageX) - parseInt(t.$container.css("margin-left"), 10), t.options.animate && t.$wrapper.removeClass("" + t.options.baseClass + "-animate"), t.$element.trigger("focus.bootstrapSwitch"))
                        }
                    }(this), "mousemove.bootstrapSwitch touchmove.bootstrapSwitch": function (t) {
                        return function (e) {
                            var i;
                            if (null != t._dragStart && (e.preventDefault(), i = (e.pageX || e.originalEvent.touches[0].pageX) - t._dragStart, !(i < -t._handleWidth || i > 0)))return t._dragEnd = i, t.$container.css("margin-left", "" + t._dragEnd + "px")
                        }
                    }(this), "mouseup.bootstrapSwitch touchend.bootstrapSwitch": function (t) {
                        return function (e) {
                            var i;
                            if (t._dragStart)return e.preventDefault(), t.options.animate && t.$wrapper.addClass("" + t.options.baseClass + "-animate"), t._dragEnd ? (i = t._dragEnd > -(t._handleWidth / 2), t._dragEnd = !1, t.state(t.options.inverse ? !i : i)) : t.state(!t.options.state), t._dragStart = !1
                        }
                    }(this), "mouseleave.bootstrapSwitch": function (t) {
                        return function () {
                            return t.$label.trigger("mouseup.bootstrapSwitch")
                        }
                    }(this)
                })
            }, t.prototype._externalLabelHandler = function () {
                var t;
                return t = this.$element.closest("label"), t.on("click", function (e) {
                    return function (i) {
                        return i.preventDefault(), i.stopImmediatePropagation(), i.target === t[0] ? e.toggleState() : void 0
                    }
                }(this))
            }, t.prototype._formHandler = function () {
                var t;
                return t = this.$element.closest("form"), t.data("bootstrap-switch") ? void 0 : t.on("reset.bootstrapSwitch", function () {
                    return i.setTimeout(function () {
                        return t.find("input").filter(function () {
                            return e(this).data("bootstrap-switch")
                        }).each(function () {
                            return e(this).bootstrapSwitch("state", this.checked)
                        })
                    }, 1)
                }).data("bootstrap-switch", !0)
            }, t.prototype._getClasses = function (t) {
                var i, n, o, s;
                if (!e.isArray(t))return ["" + this.options.baseClass + "-" + t];
                for (n = [], o = 0, s = t.length; s > o; o++)i = t[o], n.push("" + this.options.baseClass + "-" + i);
                return n
            }, t
        }(), e.fn.bootstrapSwitch = function () {
            var i, o, s;
            return o = arguments[0], i = 2 <= arguments.length ? t.call(arguments, 1) : [], s = this, this.each(function () {
                var t, a;
                return t = e(this), a = t.data("bootstrap-switch"), a || t.data("bootstrap-switch", a = new n(this, o)), "string" == typeof o ? s = a[o].apply(a, i) : void 0
            }), s
        }, e.fn.bootstrapSwitch.Constructor = n, e.fn.bootstrapSwitch.defaults = {
            state: !0,
            size: null,
            animate: !0,
            disabled: !1,
            readonly: !1,
            indeterminate: !1,
            inverse: !1,
            radioAllOff: !1,
            onColor: "primary",
            offColor: "default",
            onText: "ON",
            offText: "OFF",
            labelText: "&nbsp;",
            handleWidth: "auto",
            labelWidth: "auto",
            baseClass: "bootstrap-switch",
            wrapperClass: "wrapper",
            onInit: function () {
            },
            onSwitchChange: function () {
            }
        }
    }(window.jQuery, window)
}).call(this);
;

/*! nanoScrollerJS - v0.8.5 - (c) 2015 James Florentino; Licensed MIT */

!function (a) {
    return "function" == typeof define && define.amd ? define(["jquery"], function (b) {
        return a(b, window, document)
    }) : a(jQuery, window, document)
}(function (a, b, c) {
    "use strict";
    var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H;
    z = {
        paneClass: "nano-pane",
        sliderClass: "nano-slider",
        contentClass: "nano-content",
        iOSNativeScrolling: !1,
        preventPageScrolling: !1,
        disableResize: !1,
        alwaysVisible: !1,
        flashDelay: 1500,
        sliderMinHeight: 20,
        sliderMaxHeight: null,
        documentContext: null,
        windowContext: null
    }, u = "scrollbar", t = "scroll", l = "mousedown", m = "mouseenter", n = "mousemove", p = "mousewheel", o = "mouseup", s = "resize", h = "drag", i = "enter", w = "up", r = "panedown", f = "DOMMouseScroll", g = "down", x = "wheel", j = "keydown", k = "keyup", v = "touchmove", d = "Microsoft Internet Explorer" === b.navigator.appName && /msie 7./i.test(b.navigator.appVersion) && b.ActiveXObject, e = null, D = b.requestAnimationFrame, y = b.cancelAnimationFrame, F = c.createElement("div").style, H = function () {
        var a, b, c, d, e, f;
        for (d = ["t", "webkitT", "MozT", "msT", "OT"], a = e = 0, f = d.length; f > e; a = ++e)if (c = d[a], b = d[a] + "ransform", b in F)return d[a].substr(0, d[a].length - 1);
        return !1
    }(), G = function (a) {
        return H === !1 ? !1 : "" === H ? a : H + a.charAt(0).toUpperCase() + a.substr(1)
    }, E = G("transform"), B = E !== !1, A = function () {
        var a, b, d;
        return a = c.createElement("div"), b = a.style, b.position = "absolute", b.width = "100px", b.height = "100px", b.overflow = t, b.top = "-9999px", c.body.appendChild(a), d = a.offsetWidth - a.clientWidth, c.body.removeChild(a), d
    }, C = function () {
        var a, c, d;
        return c = b.navigator.userAgent, (a = /(?=.+Mac OS X)(?=.+Firefox)/.test(c)) ? (d = /Firefox\/\d{2}\./.exec(c), d && (d = d[0].replace(/\D+/g, "")), a && +d > 23) : !1
    }, q = function () {
        function j(d, f) {
            this.el = d, this.options = f, e || (e = A()), this.$el = a(this.el), this.doc = a(this.options.documentContext || c), this.win = a(this.options.windowContext || b), this.body = this.doc.find("body"), this.$content = this.$el.children("." + this.options.contentClass), this.$content.attr("tabindex", this.options.tabIndex || 0), this.content = this.$content[0], this.previousPosition = 0, this.options.iOSNativeScrolling && null != this.el.style.WebkitOverflowScrolling ? this.nativeScrolling() : this.generate(), this.createEvents(), this.addEvents(), this.reset()
        }

        return j.prototype.preventScrolling = function (a, b) {
            if (this.isActive)if (a.type === f) (b === g && a.originalEvent.detail > 0 || b === w && a.originalEvent.detail < 0) && a.preventDefault(); else if (a.type === p) {
                if (!a.originalEvent || !a.originalEvent.wheelDelta)return;
                (b === g && a.originalEvent.wheelDelta < 0 || b === w && a.originalEvent.wheelDelta > 0) && a.preventDefault()
            }
        }, j.prototype.nativeScrolling = function () {
            this.$content.css({WebkitOverflowScrolling: "touch"}), this.iOSNativeScrolling = !0, this.isActive = !0
        }, j.prototype.updateScrollValues = function () {
            var a, b;
            a = this.content, this.maxScrollTop = a.scrollHeight - a.clientHeight, this.prevScrollTop = this.contentScrollTop || 0, this.contentScrollTop = a.scrollTop, b = this.contentScrollTop > this.previousPosition ? "down" : this.contentScrollTop < this.previousPosition ? "up" : "same", this.previousPosition = this.contentScrollTop, "same" !== b && this.$el.trigger("update", {
                position: this.contentScrollTop,
                maximum: this.maxScrollTop,
                direction: b
            }), this.iOSNativeScrolling || (this.maxSliderTop = this.paneHeight - this.sliderHeight, this.sliderTop = 0 === this.maxScrollTop ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop)
        }, j.prototype.setOnScrollStyles = function () {
            var a;
            B ? (a = {}, a[E] = "translate(0, " + this.sliderTop + "px)") : a = {top: this.sliderTop}, D ? (y && this.scrollRAF && y(this.scrollRAF), this.scrollRAF = D(function (b) {
                return function () {
                    return b.scrollRAF = null, b.slider.css(a)
                }
            }(this))) : this.slider.css(a)
        }, j.prototype.createEvents = function () {
            this.events = {
                down: function (a) {
                    return function (b) {
                        return a.isBeingDragged = !0, a.offsetY = b.pageY - a.slider.offset().top, a.slider.is(b.target) || (a.offsetY = 0), a.pane.addClass("active"), a.doc.bind(n, a.events[h]).bind(o, a.events[w]), a.body.bind(m, a.events[i]), !1
                    }
                }(this), drag: function (a) {
                    return function (b) {
                        return a.sliderY = b.pageY - a.$el.offset().top - a.paneTop - (a.offsetY || .5 * a.sliderHeight), a.scroll(), a.contentScrollTop >= a.maxScrollTop && a.prevScrollTop !== a.maxScrollTop ? a.$el.trigger("scrollend") : 0 === a.contentScrollTop && 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"), !1
                    }
                }(this), up: function (a) {
                    return function () {
                        return a.isBeingDragged = !1, a.pane.removeClass("active"), a.doc.unbind(n, a.events[h]).unbind(o, a.events[w]), a.body.unbind(m, a.events[i]), !1
                    }
                }(this), resize: function (a) {
                    return function () {
                        a.reset()
                    }
                }(this), panedown: function (a) {
                    return function (b) {
                        return a.sliderY = (b.offsetY || b.originalEvent.layerY) - .5 * a.sliderHeight, a.scroll(), a.events.down(b), !1
                    }
                }(this), scroll: function (a) {
                    return function (b) {
                        a.updateScrollValues(), a.isBeingDragged || (a.iOSNativeScrolling || (a.sliderY = a.sliderTop, a.setOnScrollStyles()), null != b && (a.contentScrollTop >= a.maxScrollTop ? (a.options.preventPageScrolling && a.preventScrolling(b, g), a.prevScrollTop !== a.maxScrollTop && a.$el.trigger("scrollend")) : 0 === a.contentScrollTop && (a.options.preventPageScrolling && a.preventScrolling(b, w), 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"))))
                    }
                }(this), wheel: function (a) {
                    return function (b) {
                        var c;
                        if (null != b)return c = b.delta || b.wheelDelta || b.originalEvent && b.originalEvent.wheelDelta || -b.detail || b.originalEvent && -b.originalEvent.detail, c && (a.sliderY += -c / 3), a.scroll(), !1
                    }
                }(this), enter: function (a) {
                    return function (b) {
                        var c;
                        if (a.isBeingDragged)return 1 !== (b.buttons || b.which) ? (c = a.events)[w].apply(c, arguments) : void 0
                    }
                }(this)
            }
        }, j.prototype.addEvents = function () {
            var a;
            this.removeEvents(), a = this.events, this.options.disableResize || this.win.bind(s, a[s]), this.iOSNativeScrolling || (this.slider.bind(l, a[g]), this.pane.bind(l, a[r]).bind("" + p + " " + f, a[x])), this.$content.bind("" + t + " " + p + " " + f + " " + v, a[t])
        }, j.prototype.removeEvents = function () {
            var a;
            a = this.events, this.win.unbind(s, a[s]), this.iOSNativeScrolling || (this.slider.unbind(), this.pane.unbind()), this.$content.unbind("" + t + " " + p + " " + f + " " + v, a[t])
        }, j.prototype.generate = function () {
            var a, c, d, f, g, h, i;
            return f = this.options, h = f.paneClass, i = f.sliderClass, a = f.contentClass, (g = this.$el.children("." + h)).length || g.children("." + i).length || this.$el.append('<div class="' + h + '"><div class="' + i + '" /></div>'), this.pane = this.$el.children("." + h), this.slider = this.pane.find("." + i), 0 === e && C() ? (d = b.getComputedStyle(this.content, null).getPropertyValue("padding-right").replace(/[^0-9.]+/g, ""), c = {
                right: -14,
                paddingRight: +d + 14
            }) : e && (c = {right: -e}, this.$el.addClass("has-scrollbar")), null != c && this.$content.css(c), this
        }, j.prototype.restore = function () {
            this.stopped = !1, this.iOSNativeScrolling || this.pane.show(), this.addEvents()
        }, j.prototype.reset = function () {
            var a, b, c, f, g, h, i, j, k, l, m, n;
            return this.iOSNativeScrolling ? void(this.contentHeight = this.content.scrollHeight) : (this.$el.find("." + this.options.paneClass).length || this.generate().stop(), this.stopped && this.restore(), a = this.content, f = a.style, g = f.overflowY, d && this.$content.css({height: this.$content.height()}), b = a.scrollHeight + e, l = parseInt(this.$el.css("max-height"), 10), l > 0 && (this.$el.height(""), this.$el.height(a.scrollHeight > l ? l : a.scrollHeight)), i = this.pane.outerHeight(!1), k = parseInt(this.pane.css("top"), 10), h = parseInt(this.pane.css("bottom"), 10), j = i + k + h, n = Math.round(j / b * j), n < this.options.sliderMinHeight ? n = this.options.sliderMinHeight : null != this.options.sliderMaxHeight && n > this.options.sliderMaxHeight && (n = this.options.sliderMaxHeight), g === t && f.overflowX !== t && (n += e), this.maxSliderTop = j - n, this.contentHeight = b, this.paneHeight = i, this.paneOuterHeight = j, this.sliderHeight = n, this.paneTop = k, this.slider.height(n), this.events.scroll(), this.pane.show(), this.isActive = !0, a.scrollHeight === a.clientHeight || this.pane.outerHeight(!0) >= a.scrollHeight && g !== t ? (this.pane.hide(), this.isActive = !1) : this.el.clientHeight === a.scrollHeight && g === t ? this.slider.hide() : this.slider.show(), this.pane.css({
                opacity: this.options.alwaysVisible ? 1 : "",
                visibility: this.options.alwaysVisible ? "visible" : ""
            }), c = this.$content.css("position"), ("static" === c || "relative" === c) && (m = parseInt(this.$content.css("right"), 10), m && this.$content.css({
                right: "",
                marginRight: m
            })), this)
        }, j.prototype.scroll = function () {
            return this.isActive ? (this.sliderY = Math.max(0, this.sliderY), this.sliderY = Math.min(this.maxSliderTop, this.sliderY), this.$content.scrollTop(this.maxScrollTop * this.sliderY / this.maxSliderTop), this.iOSNativeScrolling || (this.updateScrollValues(), this.setOnScrollStyles()), this) : void 0
        }, j.prototype.scrollBottom = function (a) {
            return this.isActive ? (this.$content.scrollTop(this.contentHeight - this.$content.height() - a).trigger(p), this.stop().restore(), this) : void 0
        }, j.prototype.scrollTop = function (a) {
            return this.isActive ? (this.$content.scrollTop(+a).trigger(p), this.stop().restore(), this) : void 0
        }, j.prototype.scrollTo = function (a) {
            return this.isActive ? (this.scrollTop(this.$el.find(a).get(0).offsetTop), this) : void 0
        }, j.prototype.stop = function () {
            return y && this.scrollRAF && (y(this.scrollRAF), this.scrollRAF = null), this.stopped = !0, this.removeEvents(), this.iOSNativeScrolling || this.pane.hide(), this
        }, j.prototype.destroy = function () {
            return this.stopped || this.stop(), !this.iOSNativeScrolling && this.pane.length && this.pane.remove(), d && this.$content.height(""), this.$content.removeAttr("tabindex"), this.$el.hasClass("has-scrollbar") && (this.$el.removeClass("has-scrollbar"), this.$content.css({right: ""})), this
        }, j.prototype.flash = function () {
            return !this.iOSNativeScrolling && this.isActive ? (this.reset(), this.pane.addClass("flashed"), setTimeout(function (a) {
                return function () {
                    a.pane.removeClass("flashed")
                }
            }(this), this.options.flashDelay), this) : void 0
        }, j
    }(), a.fn.nanoScroller = function (b) {
        return this.each(function () {
            var c, d;
            if ((d = this.nanoscroller) || (c = a.extend({}, z, b), this.nanoscroller = d = new q(this, c)), b && "object" == typeof b) {
                if (a.extend(d.options, b), null != b.scrollBottom)return d.scrollBottom(b.scrollBottom);
                if (null != b.scrollTop)return d.scrollTop(b.scrollTop);
                if (b.scrollTo)return d.scrollTo(b.scrollTo);
                if ("bottom" === b.scroll)return d.scrollBottom(0);
                if ("top" === b.scroll)return d.scrollTop(0);
                if (b.scroll && b.scroll instanceof a)return d.scrollTo(b.scroll);
                if (b.stop)return d.stop();
                if (b.destroy)return d.destroy();
                if (b.flash)return d.flash()
            }
            return d.reset()
        })
    }, a.fn.nanoScroller.Constructor = q
});
//# sourceMappingURL=jquery.nanoscroller.min.js.map
;

/*
 *	jQuery dotdotdot 1.7.2
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	dotdotdot.frebsite.nl
 *
 *	Licensed under the MIT license.
 *	http://en.wikipedia.org/wiki/MIT_License
 */
!function (t, e) {
    function n(t, e, n) {
        var r = t.children(), o = !1;
        t.empty();
        for (var i = 0, d = r.length; d > i; i++) {
            var l = r.eq(i);
            if (t.append(l), n && t.append(n), a(t, e)) {
                l.remove(), o = !0;
                break
            }
            n && n.detach()
        }
        return o
    }

    function r(e, n, i, d, l) {
        var s = !1,
            c = "a table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",
            u = "script, .dotdotdot-keep";
        return e.contents().detach().each(function () {
            var f = this, h = t(f);
            if ("undefined" == typeof f || 3 == f.nodeType && 0 == t.trim(f.data).length)return !0;
            if (h.is(u)) e.append(h); else {
                if (s)return !0;
                e.append(h), !l || h.is(d.after) || h.find(d.after).length || e[e.is(c) ? "after" : "append"](l), a(i, d) && (s = 3 == f.nodeType ? o(h, n, i, d, l) : r(h, n, i, d, l), s || (h.detach(), s = !0)), s || l && l.detach()
            }
        }), s
    }

    function o(e, n, r, o, d) {
        var c = e[0];
        if (!c)return !1;
        var f = s(c), h = -1 !== f.indexOf(" ") ? " " : "гАА", p = "letter" == o.wrap ? "" : h, g = f.split(p), v = -1,
            w = -1, b = 0, y = g.length - 1;
        for (o.fallbackToLetter && 0 == b && 0 == y && (p = "", g = f.split(p), y = g.length - 1); y >= b && (0 != b || 0 != y);) {
            var m = Math.floor((b + y) / 2);
            if (m == w)break;
            w = m, l(c, g.slice(0, w + 1).join(p) + o.ellipsis), a(r, o) ? (y = w, o.fallbackToLetter && 0 == b && 0 == y && (p = "", g = g[0].split(p), v = -1, w = -1, b = 0, y = g.length - 1)) : (v = w, b = w)
        }
        if (-1 == v || 1 == g.length && 0 == g[0].length) {
            var x = e.parent();
            e.detach();
            var T = d && d.closest(x).length ? d.length : 0;
            x.contents().length > T ? c = u(x.contents().eq(-1 - T), n) : (c = u(x, n, !0), T || x.detach()), c && (f = i(s(c), o), l(c, f), T && d && t(c).parent().append(d))
        } else f = i(g.slice(0, v + 1).join(p), o), l(c, f);
        return !0
    }

    function a(t, e) {
        return t.innerHeight() > e.maxHeight
    }

    function i(e, n) {
        for (; t.inArray(e.slice(-1), n.lastCharacter.remove) > -1;)e = e.slice(0, -1);
        return t.inArray(e.slice(-1), n.lastCharacter.noEllipsis) < 0 && (e += n.ellipsis), e
    }

    function d(t) {
        return {width: t.innerWidth(), height: t.innerHeight()}
    }

    function l(t, e) {
        t.innerText ? t.innerText = e : t.nodeValue ? t.nodeValue = e : t.textContent && (t.textContent = e)
    }

    function s(t) {
        return t.innerText ? t.innerText : t.nodeValue ? t.nodeValue : t.textContent ? t.textContent : ""
    }

    function c(t) {
        do t = t.previousSibling; while (t && 1 !== t.nodeType && 3 !== t.nodeType);
        return t
    }

    function u(e, n, r) {
        var o, a = e && e[0];
        if (a) {
            if (!r) {
                if (3 === a.nodeType)return a;
                if (t.trim(e.text()))return u(e.contents().last(), n)
            }
            for (o = c(a); !o;) {
                if (e = e.parent(), e.is(n) || !e.length)return !1;
                o = c(e[0])
            }
            if (o)return u(t(o), n)
        }
        return !1
    }

    function f(e, n) {
        return e ? "string" == typeof e ? (e = t(e, n), e.length ? e : !1) : e.jquery ? e : !1 : !1
    }

    function h(t) {
        for (var e = t.innerHeight(), n = ["paddingTop", "paddingBottom"], r = 0, o = n.length; o > r; r++) {
            var a = parseInt(t.css(n[r]), 10);
            isNaN(a) && (a = 0), e -= a
        }
        return e
    }

    if (!t.fn.dotdotdot) {
        t.fn.dotdotdot = function (e) {
            if (0 == this.length)return t.fn.dotdotdot.debug('No element found for "' + this.selector + '".'), this;
            if (this.length > 1)return this.each(function () {
                t(this).dotdotdot(e)
            });
            var o = this;
            o.data("dotdotdot") && o.trigger("destroy.dot"), o.data("dotdotdot-style", o.attr("style") || ""), o.css("word-wrap", "break-word"), "nowrap" === o.css("white-space") && o.css("white-space", "normal"), o.bind_events = function () {
                return o.bind("update.dot", function (e, d) {
                    e.preventDefault(), e.stopPropagation(), l.maxHeight = "number" == typeof l.height ? l.height : h(o), l.maxHeight += l.tolerance, "undefined" != typeof d && (("string" == typeof d || d instanceof HTMLElement) && (d = t("<div />").append(d).contents()), d instanceof t && (i = d)), g = o.wrapInner('<div class="dotdotdot" />').children(), g.contents().detach().end().append(i.clone(!0)).find("br").replaceWith("  <br />  ").end().css({
                        height: "auto",
                        width: "auto",
                        border: "none",
                        padding: 0,
                        margin: 0
                    });
                    var c = !1, u = !1;
                    return s.afterElement && (c = s.afterElement.clone(!0), c.show(), s.afterElement.detach()), a(g, l) && (u = "children" == l.wrap ? n(g, l, c) : r(g, o, g, l, c)), g.replaceWith(g.contents()), g = null, t.isFunction(l.callback) && l.callback.call(o[0], u, i), s.isTruncated = u, u
                }).bind("isTruncated.dot", function (t, e) {
                    return t.preventDefault(), t.stopPropagation(), "function" == typeof e && e.call(o[0], s.isTruncated), s.isTruncated
                }).bind("originalContent.dot", function (t, e) {
                    return t.preventDefault(), t.stopPropagation(), "function" == typeof e && e.call(o[0], i), i
                }).bind("destroy.dot", function (t) {
                    t.preventDefault(), t.stopPropagation(), o.unwatch().unbind_events().contents().detach().end().append(i).attr("style", o.data("dotdotdot-style") || "").data("dotdotdot", !1)
                }), o
            }, o.unbind_events = function () {
                return o.unbind(".dot"), o
            }, o.watch = function () {
                if (o.unwatch(), "window" == l.watch) {
                    var e = t(window), n = e.width(), r = e.height();
                    e.bind("resize.dot" + s.dotId, function () {
                        n == e.width() && r == e.height() && l.windowResizeFix || (n = e.width(), r = e.height(), u && clearInterval(u), u = setTimeout(function () {
                            o.trigger("update.dot")
                        }, 100))
                    })
                } else c = d(o), u = setInterval(function () {
                    if (o.is(":visible")) {
                        var t = d(o);
                        (c.width != t.width || c.height != t.height) && (o.trigger("update.dot"), c = t)
                    }
                }, 500);
                return o
            }, o.unwatch = function () {
                return t(window).unbind("resize.dot" + s.dotId), u && clearInterval(u), o
            };
            var i = o.contents(), l = t.extend(!0, {}, t.fn.dotdotdot.defaults, e), s = {}, c = {}, u = null, g = null;
            return l.lastCharacter.remove instanceof Array || (l.lastCharacter.remove = t.fn.dotdotdot.defaultArrays.lastCharacter.remove), l.lastCharacter.noEllipsis instanceof Array || (l.lastCharacter.noEllipsis = t.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis), s.afterElement = f(l.after, o), s.isTruncated = !1, s.dotId = p++, o.data("dotdotdot", !0).bind_events().trigger("update.dot"), l.watch && o.watch(), o
        }, t.fn.dotdotdot.defaults = {
            ellipsis: "... ",
            wrap: "word",
            fallbackToLetter: !0,
            lastCharacter: {},
            tolerance: 0,
            callback: null,
            after: null,
            height: null,
            watch: !1,
            windowResizeFix: !0
        }, t.fn.dotdotdot.defaultArrays = {
            lastCharacter: {
                remove: [" ", "гАА", ",", ";", ".", "!", "?"],
                noEllipsis: []
            }
        }, t.fn.dotdotdot.debug = function () {
        };
        var p = 1, g = t.fn.html;
        t.fn.html = function (n) {
            return n != e && !t.isFunction(n) && this.data("dotdotdot") ? this.trigger("update", [n]) : g.apply(this, arguments)
        };
        var v = t.fn.text;
        t.fn.text = function (n) {
            return n != e && !t.isFunction(n) && this.data("dotdotdot") ? (n = t("<div />").text(n).html(), this.trigger("update", [n])) : v.apply(this, arguments)
        }
    }
}(jQuery);
;

/**
 * Lightbox v2.7.1
 * by Lokesh Dhakar - http://lokeshdhakar.com/projects/lightbox2/
 *
 * @license http://creativecommons.org/licenses/by/2.5/
 * - Free for use in both personal and commercial projects
 * - Attribution requires leaving author name, author link, and the license info intact
 */
(function () {
    var a = jQuery, b = function () {
        function a() {
            this.fadeDuration = 500, this.fitImagesInViewport = !0, this.resizeDuration = 700, this.positionFromTop = 50, this.showImageNumberLabel = !0, this.alwaysShowNavOnTouchDevices = !1, this.wrapAround = !1
        }

        return a.prototype.albumLabel = function (a, b) {
            return "Image " + a + " of " + b
        }, a
    }(), c = function () {
        function b(a) {
            this.options = a, this.album = [], this.currentImageIndex = void 0, this.init()
        }

        return b.prototype.init = function () {
            this.enable(), this.build()
        }, b.prototype.enable = function () {
            var b = this;
            a("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function (c) {
                return b.start(a(c.currentTarget)), !1
            })
        }, b.prototype.build = function () {
            var b = this;
            a("<div id='lightboxOverlay' class='lightboxOverlay'></div><div id='lightbox' class='lightbox'><div class='lb-outerContainer'><div class='lb-container'><img class='lb-image' src='' /><div class='lb-nav'><a class='lb-prev' href='' ></a><a class='lb-next' href='' ></a></div><div class='lb-loader'><a class='lb-cancel'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'></span><span class='lb-number'></span></div><div class='lb-closeContainer'><a class='lb-close'></a></div></div></div></div>").appendTo(a("body")), this.$lightbox = a("#lightbox"), this.$overlay = a("#lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".lb-outerContainer"), this.$container = this.$lightbox.find(".lb-container"), this.containerTopPadding = parseInt(this.$container.css("padding-top"), 10), this.containerRightPadding = parseInt(this.$container.css("padding-right"), 10), this.containerBottomPadding = parseInt(this.$container.css("padding-bottom"), 10), this.containerLeftPadding = parseInt(this.$container.css("padding-left"), 10), this.$overlay.hide().on("click", function () {
                return b.end(), !1
            }), this.$lightbox.hide().on("click", function (c) {
                return "lightbox" === a(c.target).attr("id") && b.end(), !1
            }), this.$outerContainer.on("click", function (c) {
                return "lightbox" === a(c.target).attr("id") && b.end(), !1
            }), this.$lightbox.find(".lb-prev").on("click", function () {
                return b.changeImage(0 === b.currentImageIndex ? b.album.length - 1 : b.currentImageIndex - 1), !1
            }), this.$lightbox.find(".lb-next").on("click", function () {
                return b.changeImage(b.currentImageIndex === b.album.length - 1 ? 0 : b.currentImageIndex + 1), !1
            }), this.$lightbox.find(".lb-loader, .lb-close").on("click", function () {
                return b.end(), !1
            })
        }, b.prototype.start = function (b) {
            function c(a) {
                d.album.push({link: a.attr("href"), title: a.attr("data-title") || a.attr("title")})
            }

            var d = this, e = a(window);
            e.on("resize", a.proxy(this.sizeOverlay, this)), a("select, object, embed").css({visibility: "hidden"}), this.sizeOverlay(), this.album = [];
            var f, g = 0, h = b.attr("data-lightbox");
            if (h) {
                f = a(b.prop("tagName") + '[data-lightbox="' + h + '"]');
                for (var i = 0; i < f.length; i = ++i)c(a(f[i])), f[i] === b[0] && (g = i)
            } else if ("lightbox" === b.attr("rel")) c(b); else {
                f = a(b.prop("tagName") + '[rel="' + b.attr("rel") + '"]');
                for (var j = 0; j < f.length; j = ++j)c(a(f[j])), f[j] === b[0] && (g = j)
            }
            var k = e.scrollTop() + this.options.positionFromTop, l = e.scrollLeft();
            this.$lightbox.css({top: k + "px", left: l + "px"}).fadeIn(this.options.fadeDuration), this.changeImage(g)
        }, b.prototype.changeImage = function (b) {
            var c = this;
            this.disableKeyboardNav();
            var d = this.$lightbox.find(".lb-image");
            this.$overlay.fadeIn(this.options.fadeDuration), a(".lb-loader").fadeIn("slow"), this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(), this.$outerContainer.addClass("animating");
            var e = new Image;
            e.onload = function () {
                var f, g, h, i, j, k, l;
                d.attr("src", c.album[b].link), f = a(e), d.width(e.width), d.height(e.height), c.options.fitImagesInViewport && (l = a(window).width(), k = a(window).height(), j = l - c.containerLeftPadding - c.containerRightPadding - 20, i = k - c.containerTopPadding - c.containerBottomPadding - 120, (e.width > j || e.height > i) && (e.width / j > e.height / i ? (h = j, g = parseInt(e.height / (e.width / h), 10), d.width(h), d.height(g)) : (g = i, h = parseInt(e.width / (e.height / g), 10), d.width(h), d.height(g)))), c.sizeContainer(d.width(), d.height())
            }, e.src = this.album[b].link, this.currentImageIndex = b
        }, b.prototype.sizeOverlay = function () {
            this.$overlay.width(a(window).width()).height(a(document).height())
        }, b.prototype.sizeContainer = function (a, b) {
            function c() {
                d.$lightbox.find(".lb-dataContainer").width(g), d.$lightbox.find(".lb-prevLink").height(h), d.$lightbox.find(".lb-nextLink").height(h), d.showImage()
            }

            var d = this, e = this.$outerContainer.outerWidth(), f = this.$outerContainer.outerHeight(),
                g = a + this.containerLeftPadding + this.containerRightPadding,
                h = b + this.containerTopPadding + this.containerBottomPadding;
            e !== g || f !== h ? this.$outerContainer.animate({
                width: g,
                height: h
            }, this.options.resizeDuration, "swing", function () {
                c()
            }) : c()
        }, b.prototype.showImage = function () {
            this.$lightbox.find(".lb-loader").hide(), this.$lightbox.find(".lb-image").fadeIn("slow"), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav()
        }, b.prototype.updateNav = function () {
            var a = !1;
            try {
                document.createEvent("TouchEvent"), a = this.options.alwaysShowNavOnTouchDevices ? !0 : !1
            } catch (b) {
            }
            this.$lightbox.find(".lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (a && this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"), this.$lightbox.find(".lb-prev, .lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".lb-prev").show(), a && this.$lightbox.find(".lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".lb-next").show(), a && this.$lightbox.find(".lb-next").css("opacity", "1"))))
        }, b.prototype.updateDetails = function () {
            var b = this;
            "undefined" != typeof this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title && this.$lightbox.find(".lb-caption").html(this.album[this.currentImageIndex].title).fadeIn("fast").find("a").on("click", function () {
                location.href = a(this).attr("href")
            }), this.album.length > 1 && this.options.showImageNumberLabel ? this.$lightbox.find(".lb-number").text(this.options.albumLabel(this.currentImageIndex + 1, this.album.length)).fadeIn("fast") : this.$lightbox.find(".lb-number").hide(), this.$outerContainer.removeClass("animating"), this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration, function () {
                return b.sizeOverlay()
            })
        }, b.prototype.preloadNeighboringImages = function () {
            if (this.album.length > this.currentImageIndex + 1) {
                var a = new Image;
                a.src = this.album[this.currentImageIndex + 1].link
            }
            if (this.currentImageIndex > 0) {
                var b = new Image;
                b.src = this.album[this.currentImageIndex - 1].link
            }
        }, b.prototype.enableKeyboardNav = function () {
            a(document).on("keyup.keyboard", a.proxy(this.keyboardAction, this))
        }, b.prototype.disableKeyboardNav = function () {
            a(document).off(".keyboard")
        }, b.prototype.keyboardAction = function (a) {
            var b = 27, c = 37, d = 39, e = a.keyCode, f = String.fromCharCode(e).toLowerCase();
            e === b || f.match(/x|o|c/) ? this.end() : "p" === f || e === c ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : ("n" === f || e === d) && (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0))
        }, b.prototype.end = function () {
            this.disableKeyboardNav(), a(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), a("select, object, embed").css({visibility: "visible"})
        }, b
    }();
    a(function () {
        {
            var a = new b;
            new c(a)
        }
    })
}).call(this);
//# sourceMappingURL=lightbox.min.map
;

eval(function (p, a, c, k, e, r) {
    e = function (c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--)r[e(c)] = k[c] || e(c);
        k = [function (e) {
            return r[e]
        }];
        e = function () {
            return '\\w+'
        };
        c = 1
    }
    ;
    while (c--)if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('6 8(a){a=a||{};9.p.1O.2h(2,33);2.M=a.1s||"";2.1A=a.1n||G;2.Y=a.1F||0;2.E=a.1y||1e 9.p.1V(0,0);2.z=a.X||1e 9.p.2x(0,0);2.T=a.S||t;2.1k=a.1j||"2d";2.1i=a.D||{};2.1C=a.1B||"35";2.K=a.1g||"31://2W.9.2Q/2J/2I/2G/1v.2D";3(a.1g===""){2.K=""}2.17=a.1x||1e 9.p.1V(1,1);2.V=a.1o||G;2.16=a.1m||G;2.1J=a.2j||"2g";2.14=a.1q||G;2.4=t;2.w=t;2.P=t;2.O=t;2.B=t;2.N=t}8.q=1e 9.p.1O();8.q.24=6(){5 i;5 f;5 a;5 d=2;5 c=6(e){e.21=Z;3(e.15){e.15()}};5 b=6(e){e.2Z=G;3(e.1Y){e.1Y()}3(!d.14){c(e)}};3(!2.4){2.4=1f.2P("2M");2.1d();3(s 2.M.1r==="r"){2.4.L=2.F()+2.M}v{2.4.L=2.F();2.4.1a(2.M)}2.2C()[2.1J].1a(2.4);2.1z();3(2.4.7.C){2.N=Z}v{3(2.Y!==0&&2.4.W>2.Y){2.4.7.C=2.Y;2.4.7.2z="2w";2.N=Z}v{a=2.1N();2.4.7.C=(2.4.W-a.Q-a.13)+"12";2.N=G}}2.1p(2.1A);3(!2.14){2.B=[];f=["2p","1L","2o","2n","1K","2m","2l","2k","2i"];1l(i=0;i<f.1I;i++){2.B.1H(9.p.u.19(2.4,f[i],c))}2.B.1H(9.p.u.19(2.4,"1L",6(e){2.7.1G="2f"}))}2.O=9.p.u.19(2.4,"2e",b);9.p.u.R(2,"2c")}};8.q.F=6(){5 a="";3(2.K!==""){a="<2b";a+=" 2a=\'"+2.K+"\'";a+=" 29=13";a+=" 7=\'";a+=" X: 28;";a+=" 1G: 27;";a+=" 26: "+2.1C+";";a+="\'>"}J a};8.q.1z=6(){5 a;3(2.K!==""){a=2.4.3d;2.w=9.p.u.19(a,\'1K\',2.25())}v{2.w=t}};8.q.25=6(){5 a=2;J 6(e){e.21=Z;3(e.15){e.15()}9.p.u.R(a,"3c");a.1v()}};8.q.1p=6(d){5 m;5 n;5 e=0,H=0;3(!d){m=2.3a();3(m 39 9.p.38){3(!m.23().37(2.z)){m.36(2.z)}n=m.23();5 a=m.34();5 h=a.W;5 f=a.22;5 k=2.E.C;5 l=2.E.1h;5 g=2.4.W;5 b=2.4.22;5 i=2.17.C;5 j=2.17.1h;5 o=2.20().32(2.z);3(o.x<(-k+i)){e=o.x+k-i}v 3((o.x+g+k+i)>h){e=o.x+g+k+i-h}3(2.16){3(o.y<(-l+j+b)){H=o.y+l-j-b}v 3((o.y+l+j)>f){H=o.y+l+j-f}}v{3(o.y<(-l+j)){H=o.y+l-j}v 3((o.y+b+l+j)>f){H=o.y+b+l+j-f}}3(!(e===0&&H===0)){5 c=m.30();m.2Y(e,H)}}}};8.q.1d=6(){5 i,D;3(2.4){2.4.2X=2.1k;2.4.7.2V="";D=2.1i;1l(i 2U D){3(D.2R(i)){2.4.7[i]=D[i]}}3(s 2.4.7.18!=="r"&&2.4.7.18!==""){2.4.7.2O="2N(18="+(2.4.7.18*2L)+")"}2.4.7.X="2K";2.4.7.11=\'1u\';3(2.T!==t){2.4.7.S=2.T}}};8.q.1N=6(){5 c;5 a={1c:0,1b:0,Q:0,13:0};5 b=2.4;3(1f.1t&&1f.1t.1W){c=b.2H.1t.1W(b,"");3(c){a.1c=A(c.1U,10)||0;a.1b=A(c.1T,10)||0;a.Q=A(c.1X,10)||0;a.13=A(c.1S,10)||0}}v 3(1f.2F.I){3(b.I){a.1c=A(b.I.1U,10)||0;a.1b=A(b.I.1T,10)||0;a.Q=A(b.I.1X,10)||0;a.13=A(b.I.1S,10)||0}}J a};8.q.2E=6(){3(2.4){2.4.2S.2T(2.4);2.4=t}};8.q.1E=6(){2.24();5 a=2.20().2B(2.z);2.4.7.Q=(a.x+2.E.C)+"12";3(2.16){2.4.7.1b=-(a.y+2.E.1h)+"12"}v{2.4.7.1c=(a.y+2.E.1h)+"12"}3(2.V){2.4.7.11=\'1u\'}v{2.4.7.11="1R"}};8.q.2A=6(a){3(s a.1j!=="r"){2.1k=a.1j;2.1d()}3(s a.D!=="r"){2.1i=a.D;2.1d()}3(s a.1s!=="r"){2.1Q(a.1s)}3(s a.1n!=="r"){2.1A=a.1n}3(s a.1F!=="r"){2.Y=a.1F}3(s a.1y!=="r"){2.E=a.1y}3(s a.1m!=="r"){2.16=a.1m}3(s a.X!=="r"){2.1w(a.X)}3(s a.S!=="r"){2.1P(a.S)}3(s a.1B!=="r"){2.1C=a.1B}3(s a.1g!=="r"){2.K=a.1g}3(s a.1x!=="r"){2.17=a.1x}3(s a.1o!=="r"){2.V=a.1o}3(s a.1q!=="r"){2.14=a.1q}3(2.4){2.1E()}};8.q.1Q=6(a){2.M=a;3(2.4){3(2.w){9.p.u.U(2.w);2.w=t}3(!2.N){2.4.7.C=""}3(s a.1r==="r"){2.4.L=2.F()+a}v{2.4.L=2.F();2.4.1a(a)}3(!2.N){2.4.7.C=2.4.W+"12";3(s a.1r==="r"){2.4.L=2.F()+a}v{2.4.L=2.F();2.4.1a(a)}}2.1z()}9.p.u.R(2,"2y")};8.q.1w=6(a){2.z=a;3(2.4){2.1E()}9.p.u.R(2,"1Z")};8.q.1P=6(a){2.T=a;3(2.4){2.4.7.S=a}9.p.u.R(2,"2v")};8.q.2u=6(){J 2.M};8.q.1D=6(){J 2.z};8.q.2t=6(){J 2.T};8.q.2s=6(){2.V=G;3(2.4){2.4.7.11="1R"}};8.q.2r=6(){2.V=Z;3(2.4){2.4.7.11="1u"}};8.q.2q=6(c,b){5 a=2;3(b){2.z=b.1D();2.P=9.p.u.3b(b,"1Z",6(){a.1w(2.1D())})}2.1M(c);3(2.4){2.1p()}};8.q.1v=6(){5 i;3(2.w){9.p.u.U(2.w);2.w=t}3(2.B){1l(i=0;i<2.B.1I;i++){9.p.u.U(2.B[i])}2.B=t}3(2.P){9.p.u.U(2.P);2.P=t}3(2.O){9.p.u.U(2.O);2.O=t}2.1M(t)};', 62, 200, '||this|if|div_|var|function|style|InfoBox|google||||||||||||||||maps|prototype|undefined|typeof|null|event|else|closeListener_|||position_|parseInt|eventListeners_|width|boxStyle|pixelOffset_|getCloseBoxImg_|false|yOffset|currentStyle|return|closeBoxURL_|innerHTML|content_|fixedWidthSet_|contextListener_|moveListener_|left|trigger|zIndex|zIndex_|removeListener|isHidden_|offsetWidth|position|maxWidth_|true||visibility|px|right|enableEventPropagation_|stopPropagation|alignBottom_|infoBoxClearance_|opacity|addDomListener|appendChild|bottom|top|setBoxStyle_|new|document|closeBoxURL|height|boxStyle_|boxClass|boxClass_|for|alignBottom|disableAutoPan|isHidden|panBox_|enableEventPropagation|nodeType|content|defaultView|hidden|close|setPosition|infoBoxClearance|pixelOffset|addClickHandler_|disableAutoPan_|closeBoxMargin|closeBoxMargin_|getPosition|draw|maxWidth|cursor|push|length|pane_|click|mouseover|setMap|getBoxWidths_|OverlayView|setZIndex|setContent|visible|borderRightWidth|borderBottomWidth|borderTopWidth|Size|getComputedStyle|borderLeftWidth|preventDefault|position_changed|getProjection|cancelBubble|offsetHeight|getBounds|createInfoBoxDiv_|getCloseClickHandler_|margin|pointer|relative|align|src|img|domready|infoBox|contextmenu|default|floatPane|apply|touchmove|pane|touchend|touchstart|dblclick|mouseup|mouseout|mousedown|open|hide|show|getZIndex|getContent|zindex_changed|auto|LatLng|content_changed|overflow|setOptions|fromLatLngToDivPixel|getPanes|gif|onRemove|documentElement|mapfiles|ownerDocument|en_us|intl|absolute|100|div|alpha|filter|createElement|com|hasOwnProperty|parentNode|removeChild|in|cssText|www|className|panBy|returnValue|getCenter|http|fromLatLngToContainerPixel|arguments|getDiv|2px|setCenter|contains|Map|instanceof|getMap|addListener|closeclick|firstChild'.split('|'), 0, {}))
;

$(document).on("show.bs.modal", ".modal", function () {
    $(this).appendTo($("body"))
}).on("shown.bs.modal", ".modal.in", function () {
    setModalsAndBackdropsOrder()
}).on("hidden.bs.modal", ".modal", function () {
    setModalsAndBackdropsOrder()
});
function setModalsAndBackdropsOrder() {
    var a = 1040;
    $(".modal.in").each(function () {
        var b = $(this);
        a++;
        b.css("zIndex", a);
        b.next(".modal-backdrop.in").addClass("hidden").css("zIndex", a - 1)
    });
    $(".modal.in:visible:last").focus().next(".modal-backdrop.in").removeClass("hidden")
};var PNGURLPREFIX = "http://wpng.sightsmap.netdna-cdn.com/", JSURLPREFIX = "http://wjs4.sightsmap.netdna-cdn.com/",
    PHPURLPREFIX = "http://www.sightsmap.com/index.php", MOBPHPURLPREFIX = "http://www.sightsmap.com/index.php",
    SCRIPTURLPREFIX = "http://www.sightsmap.com/", PHOTOPREFIX = "http://mw2.google.com/mw-panoramio/photos/thumbnail/",
    MEDIUMPHOTOPREFIX = "http://mw2.google.com/mw-panoramio/photos/medium/",
    PANORAMIOPREFIX = "http://www.panoramio.com/photo/", PANORAMIOUSERPREFIX = "http://www.panoramio.com/user/",
    HTML_MENU =
        !0, EMBEDDED = !1, TOUCH = !1, IMGSIZEPRECALC = !1, IMGSIZESIMPLEPRECALC = !1, SOCIAL = !0, SOCIALNOSERVER = !1,
    SOCIALLOCAL = !0, GOOGLEPLACES = !0, GEOCODER = !0, WORLDJSTIMEOUT = 5E3, SOCIALMEMAXLEN = 1E3,
    PANOLAYERZOOM_FIX = 17, PANOLAYERZOOM_NOFIX = 14, IMGLOADTIMEOUT = 2E3, WORLD_POI_CACHE_MAX = 7,
    GOOGLE_POI_CACHE_MAX = 15, MAP_CENTER_LAT = 20, MAP_CENTER_LNG = -30, INITIAL_SEARCH = null,
    DO_INITIAL_SEARCH = null, INITIAL_ZOOM = 3, INITIAL_TITLEPREF = null, INITIAL_NOTE = null, INITIAL_HEATMAP = 1,
    INITIAL_BIGPHOTOS = 0, INITIAL_PHOTOITER = 0, INITIAL_BIGPHOTONR = 0, INITIAL_STREETVIEW =
        0, INITIAL_STREETVIEW_LARGE = !1, INITIAL_STREETVIEW_LAT = 0, INITIAL_STREETVIEW_LNG = 0,
    INITIAL_STREETVIEW_POVHEAD = 270, INITIAL_STREETVIEW_POVPITCH = 0, INITIAL_STREETVIEW_POVZOOM = 2,
    INITIAL_PLACES = 10, INITIAL_MARKER_SHOW = !1, INITIAL_MARKER_LAT = null, INITIAL_MARKER_LNG = null,
    INITIAL_TOP_PLACE_WRANK = null, INITIAL_TOP_PLACE_LAT = null, INITIAL_TOP_PLACE_LNG = null, INITIAL_TRIP = null,
    DEFAULT_ZOOM = 3, DEFAULT_SETTINGS = "100", DEFAULT_PLACES = 10, DEFAULT_PHOTOITER = 0, DEFAULT_POVHEAD = 270,
    DEFAULT_POVPITCH = 0, DEFAULT_POVZOOM = 2, DEFAULT_TRAVEL_SPEED =
        30, DEFAULT_TIME_FACTOR = 1.2, DEFAULT_WALKING_SPEED = 3, NEVER_WALK_DISTANCE = 1500,
    ALWAYS_WALK_DISTANCE = 600, RECOMMENDER_MAX_ITERS = 1E3, RECOMMENDER_TRY_ITERS = 80,
    GOOD_GOOGLE_TYPES = "amusement_park aquarium art_gallery cemetery church city_hall mosque museum park hindu_temple spa synagogue university point_of_interest place_of_worship".split(" "),
    GOOD_GOOGLE_NAMES = "cathedral church abbey cloister mosque temple palace castle manor hall court house fort museum gallery university college resort spa sanctuary port park lighthouse beach mountain bridge port river lake waterfall falls rapids peak aqueduct zoo marina seashore gorge cave ch\u00e2teau jardins prieur\u00e9 parc muse\u00e9 palacio castell casa museo praia playa slott m\u00f5is muuseum tuletorn basilica palazzo galleria duomo castello villa grotto lido porto kirche schloss slott kloster".split(" "),
    CITYMAPNUM = 11, googleMap = !1, googleGeocoder = !1, panoramioLayer = !1, googlePlacesService = !1,
    fixOverlay = !1, userLat = null, userLng = null, lastCityPois = [], lastViewPois = [], lastUserHiddenPois = [],
    lastShownPois = [], cityPoisLoaded = !1, iconMsize, iconOpoint, iconApoint,
    iconShape = {coord: [6, 1, 1, 7, 1, 14, 6, 17, 10, 30, 14, 17, 18, 14, 18, 7, 14, 1], type: "poly"},
    heatmapFlag = !0, photosFlag = !1, socialSelected = "nosocial", cityspotsSelected = "see20c",
    topspotsSelected = "20", gtypeSelected = "*", otypeSelected = "*", peopleSelected = "*", tripPlanMode = !1,
    hideTripPlanHints =
        !1, hideTripItinHints = !1, lastBoundsChange = 0, lastPoiLoad = 0, lastSocialChange = 1, omlist = [],
    mapMarkersArray = [], photoWidget = null, photoOptions = {width: 500, height: 400}, smapTimeOutInterval = null,
    smapImgTimeOut = null, smapImgLoading = !1, photoIter = 0, photoWidgetChangedListener = null,
    initialBigPhoto = null, lastBigPhoto = null, bigPhotoLat, bigPhotoLng, bigPhotoWrank, tagFill, tagList = [],
    uiTagList = [], revCategories = {}, filterTypeWord = !1, filterTypeList = !1, tmpTypeMatch = !1, tmpGenMatch = !1,
    panorama = null, panoramaSv = null, largeSv = !1, initialProcessSv =
        !1, svLat = null, svLng = null, svHead = 270, svPitch = 0, svZoom = 2, maps = [], latStepArray = [];
latStepArray[90] = 2010;
latStepArray[45] = 2020;
latStepArray[10] = 2050;
latStepArray[2] = 3E3;
latStepArray[1] = 23E3;
var fsa = [], soa = [], topCities = null, loadPoiTracer = {}, worldPoiCache = [], googlePoiCache = [], soa_id_p = 0,
    soa_uid_p = 1, soa_lat_p = 2, soa_lng_p = 3, soa_type_p = 4, soa_rank_p = 5, soa_zoom_p = 6, soa_title_p = 7,
    soa_descr_p = 8, soa_users_p = 9, lastShownMarker = null, lastShownFreeMarker = null, lastShownFreePoi = null,
    currentInfoWindow = null, lastShownMarkers = [], lastShownBox = null, curWrank = 0, userMarker = null, inited = !1,
    curZoom = null, idnums = 0, newPoiMode = !1, newPoiInfowindow = null, socialnoserverid = 1E3,
    mapClickHandler = null, INITIAL_ALERT_TIME = 15E3,
    shownInitialAlert = !1, inialertTimeOutInterval = null, doneZoomAction = !1, doneIBoxAction = !1,
    doneFreeclickAction = !1, doneTripPlanAction = !1, shownSavedZoomAlert = !1, shownZoomAlert = !1,
    userItinerary = [], tripStartLat = null, tripStartLng = null, tripStartMarker = null;
$(document).ready(function () {
    if (MOBILE || isTouchDevice()) TOUCH = !0;
    MOBILE && (INITIAL_PLACES = 5);
    firstUiFixes();
    SOCIAL && loadSocial("");
    debug(USER_QUERY);
    "undefined" !== typeof USER_QUERY && USER_QUERY && handleQuery(USER_QUERY);
    INITIAL_TITLEPREF && ($("#title").html(INITIAL_TITLEPREF + " Sightsmap"), $("#logotxt").html(INITIAL_TITLEPREF + " Sightsmap"));
    INITIAL_NOTE && showNote(INITIAL_NOTE);
    initializeMaps();
    google.maps.event.addDomListener(window, "load", mapLoadDone);
    setCityspotsSelected("see" + INITIAL_PLACES + "c");
    setTopspotsSelected(INITIAL_PLACES);
    loadTopcities();
    loadTagsList();
    laterUiFixes();
    "undefined" == typeof localStorage && (SOCIAL = !1);
    INITIAL_TRIP && showTripBar();
    $("#tripplant").on("sortupdate", function (a, b) {
        tripItemMoveEvent(b.idx, b.item.index())
    });
    setupTypeAutocomplete();
    hideTagCloud()
});
(function (a, b) {
    var c, h;
    a.uaMatch = function (a) {
        var a = a.toLowerCase(),
            b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || 0 > a.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [],
            a = /(ipad)/.exec(a) || /(iphone)/.exec(a) || /(android)/.exec(a) || [];
        return {browser: b[1] || "", version: b[2] || "0", platform: a[0] || ""}
    };
    c = a.uaMatch(b.navigator.userAgent);
    h = {};
    c.browser && (h[c.browser] = !0, h.version = c.version);
    c.platform &&
    (h[c.platform] = !0);
    h.chrome ? h.webkit = !0 : h.webkit && (h.safari = !0);
    a.browser = h
})(jQuery, window);
function mapLoadDone() {
    var a;
    debug("maploaddone");
    USER_QUERY && (a = searchQuery(USER_QUERY));
    USER_QUERY && a ? (a = a.replace("_", " "), INITIAL_SEARCH = a = a.replace("/", " "), inited = DO_INITIAL_SEARCH = !0, gSearch(a)) : MOBILE && !USER_QUERY ? ulocation() : nolocInit();
    initDirections();
    initStreetMapPhotos();
    inialertTimeOutInterval = setInterval(function () {
        showInitialAlert()
    }, INITIAL_ALERT_TIME)
}
function searchQuery(a) {
    if ("search=" == a.substring(0, 7)) {
        if (a = a.substring(7, a.length), 0 > a.lastIndexOf("=") && 50 > a.length)return debug(a), a
    } else return !1
}
function firstUiFixes() {
    $("map_canvas").off(".data-api");
    $("a.dropdown-toggle, .dropdown-menu a").on("touchstart", function (a) {
        a.stopPropagation()
    });
    $("body").on("touchstart.dropdown", ".dropdown-menu", function (a) {
        a.stopPropagation()
    })
}
function laterUiFixes() {
    $("[rel=tooltip]").tooltip({delay: {show: 500, hide: 100}});
    $(".tglbtn").click(function () {
        $(this).toggleClass("active")
    });
    jQuery("ul.nav li.dropdown").hover(function () {
        jQuery(this).find(".dropdown-menu").stop(!0, !0).delay(100).fadeIn()
    }, function () {
        jQuery(this).find(".dropdown-menu").stop(!0, !0).delay(100).fadeOut()
    });
    $("#help_modal").modal("hide");
    $("#help_modal").css("visibility", "none")
}
function nolocInit() {
    var a, b;
    INITIAL_HEATMAP || (setHeatMapEnabled(!1), $("#heatmap_button").button("toggle"));
    inited = !0;
    lastBoundsChange = 0;
    INITIAL_TOP_PLACE_WRANK || 0 === INITIAL_TOP_PLACE_WRANK ? (debug("openCity from nolocInit " + INITIAL_TOP_PLACE_LAT + " " + INITIAL_TOP_PLACE_LNG), b = new google.maps.LatLng(INITIAL_TOP_PLACE_LAT, INITIAL_TOP_PLACE_LNG), a = new google.maps.LatLng(MAP_CENTER_LAT, MAP_CENTER_LNG), openCity(b, INITIAL_TOP_PLACE_WRANK, INITIAL_ZOOM, !0), googleMap.setCenter(a)) : (debug("boundsChanged from nolocInit"),
        boundsChanged(1))
}
function ulocation() {
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(ulocationHandler, ulocationErrorHandler, {
        enableHighAccuracy: !0,
        timeout: 5E3,
        maximumAge: 6E4
    }) : inited = !0
}
function ulocationHandler(a) {
    userLat = a.coords.latitude;
    userLng = a.coords.longitude;
    null != userLat && null != userLng && (inited = !0, zoomToLoc(userLat, userLng))
}
function ulocationErrorHandler() {
    showQuickAlert("Your browser does not support location.");
    nolocInit()
};function initializeMaps() {
    var a, b;
    try {
        a = void 0, a = new google.maps.LatLng(MAP_CENTER_LAT, MAP_CENTER_LNG)
    } catch (c) {
        showError("Cannot access google maps.");
        hideLoading();
        return
    }
    makeMapsArray(90, 180);
    makeMapsArray(45, 90);
    makeMapsArray(10, 20);
    makeMapsArray(2, 4);
    makeMapsArray(1, 2);
    b = {};
    b.zoom = INITIAL_ZOOM;
    b.center = a;
    b.mapTypeId = google.maps.MapTypeId.ROADMAP;
    b.styles = [{featureType: "road", elementType: "labels", stylers: [{visibility: "off"}]}];
    b.mapTypeControl = !0;
    b.streetViewControl = !0;
    b.zoomControl = !0;
    b.panControl =
        !1;
    b.scaleControl = !0;
    b.scaleControlOptions = {position: google.maps.ControlPosition.RIGHT};
    b.overviewMapControl = !0;
    googleMap = new google.maps.Map(document.getElementById("map_canvas"), b);
    iconMsize = new google.maps.Size(37, 34);
    iconOpoint = new google.maps.Point(0, 0);
    iconApoint = new google.maps.Point(10, 34);
    google.maps.event.addListener(googleMap, "idle", function () {
        lastBoundsChange++;
        debug("map idle");
        boundsChanged(lastBoundsChange)
    });
    google.maps.event.addListener(googleMap, "click", function (a) {
        null != mapClickHandler &&
        mapClickHandler(a.latLng)
    });
    GOOGLEPLACES && (googlePlacesService = new google.maps.places.PlacesService(googleMap));
    GEOCODER && (googleGeocoder = new google.maps.Geocoder);
    google.maps.event.addListener(googleMap, "tilesloaded", function () {
        hideLoading()
    });
    setNormalMapState()
}
function initPanoramioLayer() {
    panoramioLayer || (panoramioLayer = new google.maps.panoramio.PanoramioLayer({suppressInfoWindows: !0}), google.maps.event.addListener(panoramioLayer, "click", function (a) {
        showOnePhoto(a.featureDetails)
    }))
}
function makeMapsArray(a, b) {
    var c, h, j, k;
    k = 0;
    for (h = 90; -90 < h; h -= a)for (j = -180; 180 > j; j += b)c = {}, c.ll_lat = h - a, c.ll_lng = j, c.ru_lat = h, c.ru_lng = j + b, c.latstep = a, maps[latStepArray[a] + k] = c, k++
}
function getMapFn(a) {
    var b = a.latstep;
    return void 0 === a.overlay_file ? "w1_" + b + "_" + a.ll_lat + "_" + a.ru_lat + "_" + a.ll_lng + "_" + a.ru_lng + ".png" : a.overlay_file
}
function makeCityMap(a, b, c) {
    var h;
    h = makeCityFname(a);
    return {
        wrank: a,
        overlay_file: h,
        lat: b,
        lng: c,
        ll_lat: b - 0.06,
        ll_lng: c - 0.1,
        ru_lat: b + 0.06,
        ru_lng: c + 0.1
    }
}
function makeCityFname(a) {
    return "w2_" + a + ".png"
}
function boundsChanged(a) {
    var b, c, h, j, k, m;
    if (inited && !(lastBoundsChange > a) && (b = googleMap.getZoom(), 5 <= b && (doneZoomAction = !0), c = googleMap.getCenter(), h = c.lat(), j = c.lng(), c = googleMap.getBounds(), debug("boundsChanged, zoom: " + b + " fixOverlay: " + fixOverlay + " t: " + a), void 0 != c)) {
        c.getNorthEast();
        c.getSouthWest();
        a = new google.maps.LatLng(h, j);
        if (fixOverlay)if (debug("fixoverlay"), k = maps[fixOverlay[0]], debug("map lat " + k.ru_lat + " lng " + k.ru_lng), debug("latdf " + Math.abs(h - (k.ru_lat + k.ll_lat) / 2) + " lngdf " + Math.abs(j -
                    (k.ru_lng + k.ll_lng) / 2)), m = new google.maps.LatLngBounds(new google.maps.LatLng(k.ll_lat, k.ll_lng), new google.maps.LatLng(k.ru_lat, k.ru_lng)), 12 > b || 0.1 < Math.abs(h - (k.ru_lat + k.ll_lat) / 2) || 0.2 < Math.abs(j - (k.ru_lng + k.ll_lng) / 2) || !c.intersects(m)) k.overlay && k.overlay.setMap(null), fixOverlay = !1, omlist = [], fsa = [], clearMarkers(), cityPoisLoaded = !1, autoPanoLayer(b, !1), clearCityMenu(); else {
            autoPanoLayer(b, !0);
            setCityMenu();
            cityPoisLoaded && cityPoiUpdate();
            return
        }
        debug("cp1");
        cityAutozoom(h, j, a, !1) ? (autoPanoLayer(b,
            !0), setCityMenu()) : (debug("cp2"), cityPoisLoaded = !1, h = getMapslist(c), hideMapslist(omlist, h), omlist = h, showMapslist(h), startPoiFetch(!1, c, h), autoPanoLayer(b, !1), clearCityMenu())
    }
}
function autoPanoLayer(a, b) {
    b && a >= PANOLAYERZOOM_FIX || !b && a >= PANOLAYERZOOM_NOFIX ? heatMapEnabled() && (initPanoramioLayer(), panoramioLayer.setMap(googleMap)) : panoramioLayer && panoramioLayer.setMap(null)
}
function getMapslist(a) {
    var b, c, h, j;
    b = a.getNorthEast();
    c = a.getSouthWest();
    h = b.lat();
    j = b.lng();
    b = c.lat();
    c = c.lng();
    debug("getMapslist " + h + " " + b + " " + j + " " + c + " difflat " + (h - b) + " difflng " + (j - c));
    return 45 < h - b || 90 < j - c ? getMapslistAux(90, 180, a) : 10 < h - b || 20 < j - c ? getMapslistAux(45, 90, a) : 2 < h - b || 4 < j - c ? getMapslistAux(10, 20, a) : 1 < h - b || 2 < j - c ? getMapslistAux(2, 4, a) : getMapslistAux(1, 2, a)
}
function getMapslistAux(a, b, c) {
    var h, j, k, m;
    h = c.getNorthEast().lat();
    c.getNorthEast().lng();
    j = c.getSouthWest().lng();
    c.getSouthWest().lat();
    k = Math.floor((90 - h) / a);
    h = k + 1;
    j = Math.floor(0 - (-180 - j) / b);
    m = Math.round(360 / b);
    b = Math.round(180 / a);
    i1 = k * m + j;
    i2 = h * m + j;
    j = latStepArray[a];
    debug("in getMapslistAux s " + j);
    k = [];
    h = 90 <= a ? [j, j + 1, j + 2, j + 3] : h >= b ? [j + i1, j + i1 + 1] : [j + i1, j + i1 + 1, j + i2, j + i2 + 1];
    for (a = 0; a < h.length; a++)if (b = maps[h[a]]) b = new google.maps.LatLngBounds(new google.maps.LatLng(b.ll_lat, b.ll_lng), new google.maps.LatLng(b.ru_lat,
        b.ru_lng)), c.intersects(b) && k.push(h[a]);
    return k
}
function showMapslist(a) {
    var b, c, h;
    if (inited && heatMapEnabled()) {
        c = a.length;
        for (b = 0; b < c; b++)h = maps[a[b]], debug("i " + b + " m " + h + " fname " + h.fname + " ll_lat " + h.ll_lat + "  ll_lng " + h.ll_lng + " ru_lat " + h.ru_lat + " ru_lng " + h.ru_lng), "undefined" === typeof h ? debug("m undefined") : ("undefined" === typeof h.latlng && (debug("create LatLng "), h.latlng = new google.maps.LatLng(h.centerlat, h.centerlng)), "undefined" === typeof h.imagebounds && (debug("create LatLngBounds "), h.imagebounds = new google.maps.LatLngBounds(new google.maps.LatLng(h.ll_lat,
            h.ll_lng), new google.maps.LatLng(h.ru_lat, h.ru_lng))), "undefined" === typeof h.overlay ? (debug("create overlay " + getMapFn(h) + " bounds " + h.imagebounds), h.overlay = new google.maps.GroundOverlay(PNGURLPREFIX + getMapFn(h), h.imagebounds), google.maps.event.addListener(h.overlay, "click", function (a) {
            null != mapClickHandler && mapClickHandler(a.latLng)
        }), google.maps.event.addListener(h.overlay, "rightclick", function (a) {
            google.maps.event.trigger(googleMap, "rightclick", a)
        }), google.maps.event.addListener(h.overlay, "mousemove",
            function (a) {
                google.maps.event.trigger(googleMap, "mousemove", a)
            }), h.overlay.setMap(googleMap)) : null == h.overlay.getMap() && (debug("m.overlay.setMap"), h.overlay.setMap(googleMap)))
    }
}
function hideMapslist(a, b) {
    var c, h, j;
    h = a.length;
    for (c = 0; c < h; c++)contains(b, a[c]) || (j = maps[a[c]], "undefined" !== typeof j && "undefined" !== typeof j.overlay && j.overlay.setMap(null))
};function clearMarkers() {
    l = mapMarkersArray.length;
    for (i = 0; i < l; i++)mapMarkersArray[i].marker.setMap(null);
    mapMarkersArray.length = 0
}
function startPoiFetch(a, b, c) {
    var h;
    h = getSocialSelected();
    lastPoiLoad++;
    loadPoiTracer = {id: lastPoiLoad, result: []};
    if ("off" == h) donePoiFetch(); else {
        a || 0 === a ? (loadPoiTracer.city = !0, GOOGLEPLACES && (loadPoiTracer.google = !0)) : (loadPoiTracer.world = 4, loadPoiTracer.google = !1);
        showLoadPoiTracer();
        b || (b = googleMap.getBounds());
        loadPoiTracer.city && startCityPoiFetch(a);
        if (loadPoiTracer.world) {
            c || (c = getMapslist(b));
            loadPoiTracer.world = c.length;
            showLoadPoiTracer();
            for (a = 0; a < c.length; a++)debug("maplist el " + c[a] + " " +
                maps[c[a]] + " " + getMapFn(maps[c[a]]));
            startWorldPoiFetch(b, c)
        }
        loadPoiTracer.google && startGooglePoiFetch(googleMap.getCenter(), b)
    }
}
function checkDonePoiFetch() {
    for (var a in loadPoiTracer)if (!("id" == a || "result" == a) && loadPoiTracer[a])return !1;
    return !0
}
function donePoiFetch() {
    var a, b, c, h, j, k, m, q, r, n, u = [], t = [], w = [];
    debug("donePoiFetch called");
    a = googleMap.getBounds();
    if (b = loadPoiTracer.result) {
        showLoadPoiTracer();
        showWorldPoiCache();
        for (k = n = 0; k < b.length; k++)if (c = b[k], "google" == c[0]) w = c[1]; else if (0 == c[0].indexOf("wtop")) t = c[1]; else {
            h = c[1];
            j = h.length;
            for (m = 0; m < j; m++)if (c = h[m]) q = c.lat, r = c.lng, q = new google.maps.LatLng(q, r), a.contains(q) && (u.push(c), n++)
        }
        "mymap" == getSocialSelected() ? u = getMyMap().slice() : "shared" == getSocialSelected() && (u = getSharedMap().slice());
        t && 0 < t.length ? (k = t, b = !0) : (k = u, b = !1);
        lastCityPois = [];
        k = googleExtendPois(k, w, a);
        k = socialExtendPois(k, a);
        lastCityPois = b ? k : [];
        a = makeShowPoiList(k, b);
        "mymap" == getSocialSelected() ? a = getMyMap() : "shared" == getSocialSelected() && (a = getSharedMap());
        clearMarkers();
        showPoiList(a);
        if (INITIAL_MARKER_SHOW) {
            debug("INITIAL_MARKER_SHOW case mapMarkersArray.length " + mapMarkersArray.length);
            for (k = 0; k < mapMarkersArray.length; k++)c = mapMarkersArray[k], q = round6(c.poi.lat), r = round6(c.poi.lng), debug("lat " + q + " lng " + r), q == INITIAL_MARKER_LAT &&
            r == INITIAL_MARKER_LNG && (debug("found marker" + k), markerInfoboxEvent(null, !0, c.marker, c.contentstring, googleMap, 1), INITIAL_BIGPHOTOS ? (showPhotos(q, r), INITIAL_PHOTOITER ? 1 == INITIAL_PHOTOITER && showPhotos(q, r, 0) : showOnePhoto(INITIAL_BIGPHOTONR)) : INITIAL_STREETVIEW && showStreetmap(q, r));
            INITIAL_MARKER_SHOW = !1
        }
        INITIAL_TRIP && (loadTrip(INITIAL_TRIP), tripPlanMode = !0, INITIAL_TRIP = !1);
        cityPoisLoaded = b ? !0 : !1
    }
}
function cityPoiUpdate() {
    var a;
    debug("cityPoiUpdate with lastCityPois.length " + lastCityPois.length);
    lastCityPois.length && (lastShownPois = a = makeShowPoiList(lastCityPois, !0), clearMarkers(), showPoiList(a))
}
function googleExtendPois(a, b) {
    var c, h, j, k, m, q, r, n, u;
    if (!b || 1 > b.length)return a;
    n = [];
    j = a.length;
    k = b.length;
    for (h = 0; h < j; h++)if (m = a[h]) {
        u = !1;
        for (c = 0; c < k; c++)if (q = b[c], m.name)if (0.001 > Math.abs(m.lat - q.lat) && 0.001 > Math.abs(m.lng - q.lng) && similarNames(m.name, q.name, 0.5) && !contains(n, q.gplace.reference)) {
            u = !0;
            break
        } else {
            if (0.005 > Math.abs(m.lat - q.lat) && 0.005 > Math.abs(m.lng - q.lng) && similarNames(m.name, q.name, 0.7) && !contains(n, q.gplace.reference)) {
                u = !0;
                break
            }
        } else if (fixOverlay) {
            if (0.001 > Math.abs(m.lat - q.lat) &&
                0.001 > Math.abs(m.lng - q.lng) && !contains(n, q.gplace.reference)) {
                u = !0;
                break
            }
        } else if (0.002 > Math.abs(m.lat - q.lat) && 0.002 > Math.abs(m.lng - q.lng) && !contains(n, q.gplace.reference)) {
            u = !0;
            break
        }
        u && (n.push(q.gplace.reference), r++, m.gplace = q.gplace, !m.name && q.name && (m.name = q.name))
    }
    gflist = [];
    m = [];
    for (h = 0; h < j && 3 > h; h++)m.push(a[h]);
    r = 10;
    k < r && (r = k);
    c = 0;
    for (h = 3; h < j; h++, c++)c < r && (q = b[c], !contains(n, q.gplace.reference) && suitableGplace(q) && (m.push(q), n.push(q.gplace.reference))), m.push(a[h]);
    if (5 > m.length)for (c = 0; c <
    k && 4 > c; c++)q = b[c], contains(n, q.gplace.reference) || (m.push(q), n.push(q.gplace.reference)); else if (20 > m.length)for (c = 0; c < k; c++)q = b[c], !contains(n, q.gplace.reference) && suitableGplace(q) && (m.push(q), n.push(q.gplace.reference));
    return m
}
function suitableGplace(a) {
    var b, c;
    if (!a || !a.name)return !1;
    if (c = a.gplace.types)for (b = 0; b < c.length; b++)if (contains(GOOD_GOOGLE_TYPES, c[b]))return !0;
    a = a.name.toLowerCase().split(" ");
    for (b = 0; b < a.length; b++)if (contains(GOOD_GOOGLE_NAMES, a[b]))return !0;
    return !1
}
function socialExtendPois(a, b) {
    var c, h, j, k, m, q, r;
    j = getSocialSelected();
    if (!SOCIAL || !soa.length && ("all" == j || "standard" == j || "allme" == j || "me" == j))return a;
    k = !1;
    for (c = 0; c < soa.length; c++)if (m = soa[c], loc = new google.maps.LatLng(m.lat, m.lng), b.contains(loc)) {
        k = !0;
        break
    }
    if (!k)return a;
    q = [];
    h = a.length;
    if ("nosocial" == j) {
        for (c = 0; c < h; c++)a[c].sid && removePoiSocialEls(a[c]);
        return a
    }
    if ("all" == j || "allme" == j || "me" == j || "mymap" == j || "shared" == j)for (c = 0; c < h; c++)if (j = a[c]) j.tsoanr = lastSocialChange, (m = getSocialData(j.lat,
        j.lng, j.name)) ? (q.push(m.sid), k = j.name, copyPoiSocialEls(m, j), k && (j.name = k)) : j.sid && removePoiSocialEls(j);
    h = soa.length;
    for (c = 0; c < h; c++)if (m = soa[c], !(5 < m.rank) && ("E" != m.utype && !contains(q, m.sid)) && (j = m.lat, r = m.lng, loc = new google.maps.LatLng(j, r), b.contains(loc))) {
        if (c < h - 1 && (k = soa[c + 1], k.lat == j && k.lng == r))continue;
        j = {lat: m.lat, lng: m.lng, tcrank: m.rank, gpop: 1, orig: 3, tsoanr: lastSocialChange};
        copyPoiSocialEls(m, j);
        a.push(j)
    }
    return a
}
function removePoiSocialEls(a) {
    delete a.sid;
    delete a.uid;
    delete a.utype;
    delete a.rank;
    delete a.zoom;
    delete a.desc;
    delete a.users
}
function copyPoiSocialEls(a, b) {
    a.sid && (b.sid = a.sid);
    a.uid && (b.uid = a.uid);
    a.name && (b.name = a.name);
    a.utype && (b.utype = a.utype);
    a.rank && (b.rank = a.rank);
    a.zoom && (b.zoom = a.zoom);
    a.desc && (b.desc = a.desc);
    a.users && (b.users = a.users)
}
function makeShowPoiList(a, b) {
    var c, h, j, k, m, q, r, n, u, t, w, A;
    debug("makeShowPoiList len " + a.length + " " + b);
    u = getSocialSelected();
    n = getGtypeSelected();
    pvals = getPeopleSelected();
    b ? (c = getCityspotsSelected(), r = "hide" == c ? 0 : 0 < c.search("5c") ? 5 : 0 < c.search("10c") ? 10 : 0 < c.search("20c") ? 20 : 0 < c.search("50c") ? 50 : 0 < c.search("100c") ? 100 : 0 < c.search("500c") ? 500 : 0 < c.search("1000c") ? 1E3 : 2E3) : (r = getTopspotsSelected(), a.sort(sortGpop));
    curZoom = googleMap.getZoom();
    13 < curZoom && (curZoom = 13);
    1 > curZoom && (curZoom = 1);
    c = a.length;
    c < r && (r = c);
    if ("me" === u || "allme" === u || "friends" === u || "mymap" === u || "shared" == u && r < SOCIALMEMAXLEN) r = SOCIALMEMAXLEN;
    t = [];
    q = 0;
    A = googleMap.getBounds();
    for (j = 0; j < c; j++)if ((m = a[j]) && (m.sid || !("me" === u || "allme" === u || "friends" === u || "mymap" === u || "shared" == u)))if (!(("me" == u || "mymap" == u || "shared" == u) && m.zoom > curZoom) && !("nofriends" === u && m.sid && m.uid))if (h = new google.maps.LatLng(m.lat, m.lng), A.contains(h) && (h = m.fsgtype, !b || !("*" != n && h != n && !("a" == n && m.fstype && ("Art Gallery" == m.fstype || 0 <= m.fstype.indexOf("Museum")))))) {
        if (!b &&
            "*" != pvals && "m" == pvals)if (m.inhabit) {
            if (1E5 < m.inhabit)continue
        } else {
            if (!m.fs || !m.fnear || 40 < m.fnear)continue
        } else if (!b && "*" != pvals && "s" == pvals)if (m.inhabit) {
            if (1E4 < m.inhabit)continue
        } else {
            if (!m.fs || !m.fnear || 20 < m.fnear)continue
        } else if (!b && "*" != pvals && "t" == pvals)if (m.inhabit) {
            if (1E3 < m.inhabit)continue
        } else {
            if (!m.fs || !m.fnear || 7 < m.fnear)continue
        } else if (!b && "*" != pvals && "r" == pvals)if (m.inhabit) {
            if (100 < m.inhabit)continue
        } else if (!m.fs || !m.fnear || 4 < m.fnear)continue;
        if (!b && filterTypeList && filterTypeList !==
            []) {
            if (!m.tags)continue;
            tagl = m.tags;
            for (h = w = 0; h < filterTypeList.length; h += 1)for (k = 0; k < m.tags.length; k += 4)if (m.tags.charCodeAt(k) === filterTypeList[h].charCodeAt(0) && m.tags.charCodeAt(k + 1) === filterTypeList[h].charCodeAt(1)) {
                k = (40 * (m.tags.charCodeAt(k + 2) - 48) + (m.tags.charCodeAt(k + 3) - 48)) / 10;
                w += k;
                break
            }
            if (0 === w)continue
        }
        m.fmatch = filteredMatchPop(m, w);
        t.push(m);
        q++
    }
    !b && (filterTypeList && filterTypeList !== []) && t.sort(sortMatchOrder);
    t.length < r && (r = t.length);
    for (h = 0; h < t.length; h++)m = t[h], m.tpi = h, m.tname = m.name ?
        m.name : "", m.tcrank = colorRank(m, h, r);
    t.sort(sortRankOrder);
    if (b)for (h = 0; h < t.length; h++)t[h].tpi = h; else {
        w = [];
        for (h = 0; h < t.length; h++)t[h].tpi = h, w.push(t[h]);
        w.sort(sortLngOrder);
        t = removeNear(t, w);
        t.length < r && (r = t.length);
        for (h = 0; h < t.length && h < r; h++)t[h].tcrank = colorRank(t[h], h, r)
    }
    lastViewPois = t = extendForRecommender(t.length, t);
    shown = [];
    lastUserHiddenPois = [];
    for (h = 0; h < t.length && h < r; h++)m = t[h], m.sid && 9 == m.rank ? lastUserHiddenPois.push(m) : shown.push(m);
    c = shown.length;
    for (h = 0; h < userItinerary.length; h++)if (!smap.recommender.isMeta(userItinerary[h])) {
        r =
            userItinerary[h].origin;
        w = !1;
        for (j = 0; j < c; j++)if (samePOI(r, shown[j])) {
            w = !0;
            break
        }
        w || shown.push(r)
    }
    lastShownPois = shown;
    debug("shown length " + shown.length);
    return shown
}
function filteredMatchPop(a, b) {
    return 199E7 < a.gpop ? Math.pow(a.gpop / 1E5 + 6E3, 3) * (Math.log(b) / 100) : 1E5 < a.gpop ? Math.pow(a.gpop / 1E5 + 6E3, 2) * (Math.log(b) / 100) : Math.pow(a.gpop, 2) * (Math.log(Math.log(b)) / 100)
}
function sortMatchOrder(a, b) {
    return b.fmatch - a.fmatch
}
function decodeTags(a) {
    var b, c, h, j, k;
    if (!a)return [];
    b = [];
    c = a.length;
    for (h = 0; h < c; h += 4)j = 40 * (a.charCodeAt(h) - 48) + (a.charCodeAt(h + 1) - 48), j = tagList[j], k = (40 * (a.charCodeAt(h + 2) - 48) + (a.charCodeAt(h + 3) - 48)) / 10, b.push([j, k]);
    return b
}
function encodeTag(a) {
    var b;
    b = tagList.length;
    for (i = 0; i < b; i += 1)if (a === tagList[i])return a = Math.floor(i / 40), b = i - 40 * a, a = String.fromCharCode(a + 48, b + 48);
    return !1
}
function colorRank(a, b, c) {
    return a.rank ? a.rank : 0 == b ? 1 : 0.12 > b / c ? 2 : 0.3 > b / c ? 3 : 0.6 > b / c ? 4 : 5
}
function removeNear(a, b) {
    var c, h, j, k, m, q, r, n, u, t, w;
    c = googleMap.getBounds();
    c.getNorthEast().lat();
    c.getSouthWest().lat();
    c.getNorthEast().lng();
    c.getSouthWest().lng();
    c = Math.pow(2, googleMap.getZoom());
    m = 20 / c;
    k = 10 / c;
    w = {};
    for (c = 0; c < a.length && 200 > c; c++)if (u = a[c], !w[u.tpi]) {
        r = u.lat;
        n = u.lng;
        q = n - m;
        for (j = h = binarySearchPoiLng(b, n); 0 < j; j--) {
            t = b[j];
            if (t.lng < q)break;
            Math.abs(t.lat - r) < k && u.tpi < t.tpi && (w[t.tpi] = !0)
        }
        q = n + m;
        for (j = h; j < b.length; j++) {
            t = b[j];
            if (t.lng > q)break;
            Math.abs(t.lat - r) < k && u.tpi < t.tpi && (w[t.tpi] =
                !0)
        }
    }
    m = [];
    for (c = 0; c < a.length; c++)w[a[c].tpi] || m.push(a[c]);
    return m
}
function binarySearchPoiLng(a, b) {
    var c = 0, h, j, k;
    for (h = a.length - 1; c <= h;)if (j = Math.floor((c + h) / 2), k = a[j], k.lng < b) c = j + 1; else if (k.lng > b) h = j - 1; else break;
    return j
}
function sortGpop(a, b) {
    return b.gpop - a.gpop
}
function sortPpop(a, b) {
    return b.ppop - a.ppop
}
function sortRankOrder(a, b) {
    return a.tcrank < b.tcrank && (13 <= curZoom || a.zoom && a.zoom <= curZoom) ? -1 : a.tcrank > b.tcrank && (13 <= curZoom || b.zoom && b.zoom <= curZoom) ? 1 : a.tpi - b.tpi
}
function tmp_donotuse_sortRankOrder(a, b) {
    return (a.tcrank || 0 === a.tcrank) && (b.tcrank || 0 === b.tcrank) ? a.tcrank < b.tcrank && (13 <= curZoom || a.zoom && a.zoom <= curZoom) ? -1 : a.tcrank > b.tcrank && (13 <= curZoom || b.zoom && b.zoom <= curZoom) ? 1 : (a.tpi || 0 === a.tpi) && (b.tpi || 0 === b.tpi) ? a.tpi - b.tpi : a.tpi || 0 === a.tpi ? -1 : 1 : (a.tpi || 0 === a.tpi) && (b.tpi || 0 === b.tpi) ? a.tpi - b.tpi : a.tpi || 0 === a.tpi ? -1 : 1
}
function sortLngOrder(a, b) {
    return a.lng < b.lng ? -1 : 1
}
function extendForRecommender(a, b) {
    var c, h, j;
    h = b.length;
    h < a && (a = h);
    for (c = 0; c < a; c++)j = b[c], j.rpop = calcRecPop(j, h), j.rtime = calcRecTime(j, h);
    return b
}
function calcRecPop(a, b) {
    var c;
    c = Math.pow(2 * ((b - a.tpi) / b), 10);
    c /= 100;
    if (a.wpi || 0 === a.wpi) c = 100 * (c + 1E3);
    return c
}
function calcRecTime(a) {
    return a.wpi || 0 === a.wpi ? a.inhabit && 5E3 > a.inhabit || !a.inhabit && a.fnear && 20 > a.fnear ? 8E3 > a.wpi ? 2 : 1 : 70 > a.wpi ? 10 : 240 > a.wpi ? 8 : 350 > a.wpi ? 6 : 3E3 > a.wpi ? 4 : 1E4 > a.wpi ? 2 : 1 : 3 == a.orig && "N" == a.utype ? !a.zoom ? 1 : 13 <= a.zoom ? 0.5 : 10 < a.zoom ? 1 : 5 < a.zoom ? 2 : 4 : hasFsType(a, "Museum") || hasFsType(a, "Gallery") || hasGplaceType(a, "museum") || hasGplaceType(a, "art_gallery") || hasNameType(a, "muse") || hasNameType(a, "gallery") ? (a.rtype = hasFsType(a, "Gallery") || hasGplaceType(a, "art_gallery") || hasNameType(a, "gallery") ||
    hasNameType(a, " art") ? "gallery" : "museum", a.fsu && 700 < a.fsu || a.wpop && 1E3 < a.wpop ? 2 : (!a.fsu || 20 > a.fsu) && (!a.wpop || 30 > a.wpop) ? 0.5 : 1) : hasFsType(a, "Beach") || hasFsType(a, "Surf") || hasNameType(a, "beach") ? (a.rtype = "beach", 1) : hasFsType(a, "Theme Park") || hasFsType(a, "Water Park") || hasFsType(a, "amusement_park") ? (a.rtype = "amusement park", 2) : hasFsType(a, "Zoo") || hasFsType(a, "Aquarium") || hasGplaceType(a, "zoo") || hasGplaceType(a, "aquarium") || hasNameType(a, " zoo") || hasNameType(a, "aquarium") ? (a.rtype = "zoo", 1.5) : hasFsType(a,
        "Restaurant") || hasGplaceType(a, "restaurant") || hasNameType(a, "restaurant") || hasFsType(a, "Diner") || hasFsType(a, "Gastropub") ? (a.rtype = "restaurant", 1) : hasFsType(a, "Hotel") ? (a.rtype = "hotel", 1) : hasFsType(a, "Burger Joint") || hasFsType(a, "Coffee Shop") || hasFsType(a, "Caf\u00e9") ? (a.rtype = "cafe", 0.5) : hasGplaceType(a, "spa") ? (a.rtype = "spa", 1.5) : a.wpop && 2E3 < a.wpop && a.fsu && 1500 < a.fsu || a.wpop && 1E4 < a.wpop || a.fsu && 3E3 < a.fsu ? 1 : 0.5
}
function hasFsType(a, b) {
    debugPoiAux(a);
    return a.fstype && 0 <= a.fstype.indexOf(b) ? !0 : !1
}
function hasGplaceType(a, b) {
    return a.gplace && a.gplace.types && contains(a.gplace.types, b) ? !0 : !1
}
function hasNameType(a, b) {
    return !a.fstype && (!a.gplace || !a.gplace.types) && a.name && 0 <= a.name.toLowerCase().indexOf(b) ? !0 : !1
}
function showPoiList(a) {
    var b, c, h;
    b = getSocialSelected();
    debug("showPoiList: zoom " + googleMap.getZoom());
    if ((c = a.length) || !soa.length || shownSavedZoomAlert || !("me" == b || "allme" == b || "mymap" == b || "shared" == b))if (c < getTopspotsSelected() - 2 && !fixOverlay && !shownZoomAlert && !("me" == b || "allme" == b || "mymap" == b || "shared" == b) && 50 > getTopspotsSelected() && 9 > googleMap.getZoom()) shownZoomAlert = !0, showQuickAlert("Zoom deeper to see more places");
    for (b = 0; b < c; b++) {
        h = a[b];
        var j = !1;
        b == highlightedMarkerIndex && (j = !0);
        h = addMarker(googleMap,
            h, j);
        j && (highlightedMarker = h[1], google.maps.event.trigger(highlightedMarker, "mouseover"))
    }
    lastShownPois = a
}
function showLoadPoiTracer() {
    var a, b, c, h;
    b = "loadPoiTracer: ";
    for (c in loadPoiTracer)if ("id" == c) b += " id: " + loadPoiTracer.id; else if ("result" == c) {
        a = loadPoiTracer[c];
        for (h = 0; h < a.length; h++)a[h][0] && (b += " res [" + a[h][0] + " "), a[h][1] && (b += a[h][1].length + "]")
    } else b += " " + c + ": " + loadPoiTracer[c];
    debug(b)
}
function showWorldPoiCache() {
    var a, b;
    a = "worldPoiCache: ";
    for (b = 0; b < worldPoiCache.length; b++)a += " " + worldPoiCache[b][0] + " " + worldPoiCache[b][1].length;
    debug(a)
}
function zoomToLoc(a, b) {
    var c;
    c = new google.maps.LatLng(a, b);
    MOBILE && closeInfoBox();
    null != userMarker && (userMarker.setMap(null), userMarker = null);
    var h = new google.maps.Size(38, 38), j = new google.maps.Point(0, 0), k = new google.maps.Point(10, 34),
        h = new google.maps.MarkerImage(PNGURLPREFIX + "blue_dot_circle.png", h, j, k);
    userMarker = new google.maps.Marker({position: c, zIndex: 1, icon: h, map: googleMap});
    cityAutozoom(a, b, c, !0)
}
function cityAutozoom(a, b, c, h) {
    var j, k, m = !1, q = -1;
    if (!h && 13 > googleMap.getZoom())return !1;
    k = topCities.length;
    for (j = 0; j < k; j++)if (0.055 > Math.abs(a - topCities[j][0]) && 0.1 > Math.abs(b - topCities[j][1])) {
        m = !0;
        q = j;
        break
    }
    if (!m && h)return googleMap.getZoom(), c = new google.maps.LatLng(a, b), googleMap.setCenter(c), googleMap.setZoom(11), !0;
    if (m) {
        if (h && fixOverlay && maps[fixOverlay[0]].wrank === j)return googleMap.setCenter(c), googleMap.setZoom(13), !0;
        wrank = q;
        el = makeCityMap(wrank, topCities[q][0], topCities[q][1]);
        hideMapslist(omlist,
            []);
        maps[CITYMAPNUM] = el;
        omlist = fixOverlay = a = [CITYMAPNUM];
        h && (googleMap.setCenter(c), googleMap.setZoom(13));
        curWrank = wrank;
        showMapslist(a);
        startPoiFetch(wrank, !1, a);
        return !0
    }
    k = lastViewPois.length;
    for (j = 0; j < k; j++)if (0.1 > Math.abs(b - lastViewPois[j].lng) && 0.055 > Math.abs(a - lastViewPois[j].lat) && (15285 > lastViewPois[j].wpi || 0 === lastViewPois[j].wpi))return debug("to open city " + lastViewPois[j].wpi), zoomTopMarker(0, lastViewPois[j].wpi, lastViewPois[j].lat, lastViewPois[j].lng, a, b), !0;
    return !1
}
function openCity(a, b, c, h) {
    var j;
    if (h && fixOverlay && maps[fixOverlay[0]].wrank === b)return googleMap.setCenter(a), googleMap.setZoom(c), !0;
    j = makeCityMap(b, a.lat(), a.lng());
    maps[CITYMAPNUM] = j;
    fixOverlay = nmlist = [CITYMAPNUM];
    hideMapslist(omlist, nmlist);
    omlist = nmlist;
    h && (googleMap.setCenter(a), googleMap.setZoom(c));
    curWrank = b;
    showMapslist(nmlist);
    startPoiFetch(b, !1, nmlist)
}
function zoomTopMarker(a, b, c, h, j, k) {
    debug("zoomTopMarker(num,wrank,lat,lng):" + a + " " + b + " " + c + " " + h);
    closeAllModals();
    a = j && k ? new google.maps.LatLng(j, k) : new google.maps.LatLng(c, h);
    MOBILE && closeInfoBox();
    fixOverlay ? (googleMap.setCenter(a), googleMap.setZoom(13)) : !b && 0 !== b ? zoomCloser(c, h) : (closeLastShownMarkers(), j = [CITYMAPNUM], c = makeCityMap(b, c, h), maps[CITYMAPNUM] = c, fixOverlay = j, fixmapFlag = !0, hideMapslist(omlist, j), omlist = j, googleMap.setCenter(a), googleMap.setZoom(13), curWrank = b, showMapslist(j), startPoiFetch(b,
        !1, j))
}
function zoomCloser(a, b) {
    var c = googleMap.getZoom(), h = new google.maps.LatLng(a, b);
    closeAllModals();
    googleMap.setCenter(h);
    fixOverlay || 0 === fixOverlay ? googleMap.setZoom(17) : 10 <= c && 14 > c ? googleMap.setZoom(14) : 11 <= c ? googleMap.setZoom(c + 2) : googleMap.setZoom(11);
    cityAutozoom(a, b, h, !1)
}
function getFreeClickPoi(a, b) {
    var c, h, j, k, m;
    if (!lastViewPois)return null;
    doneFreeclickAction = !0;
    h = lastViewPois.length;
    googleMap.getZoom();
    c = googleMap.getBounds();
    j = Math.abs(c.getNorthEast().lat() - c.getSouthWest().lat());
    c = Math.abs(c.getNorthEast().lng() - c.getSouthWest().lng());
    j /= 70;
    k = c / 140;
    debug("lastViewPois len " + h + " latd " + j + " lngd " + k);
    for (c = 0; c < h; c++)if (m = lastViewPois[c], Math.abs(m.lat - a) < j && Math.abs(m.lng - b) < k)return debug("found " + m.lat + " " + m.lng + " " + m.name), m;
    return null
}
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
};
var categoriesTag;
function addToCategoriesTag(a, b) {
    var c = categoriesTag[a];
    c ? c.push(b) : (c = [], c.push(b), categoriesTag[a] = c)
}
function buildCategoriesTag() {
    categoriesTag = [];
    for (var a in tagCategories)if (Array.isArray(tagCategories[a]))for (var b = tagCategories[a],
                                                                             c = 0; c < b.length; c++)addToCategoriesTag(b[c], a); else addToCategoriesTag(tagCategories[a], a)
}
function getMatchedTagList(a) {
    for (var b = [], c, h = tagList, j = 0; j < h.length; j++)h[j].substring(0, a.length) === a && b.push(h[j]);
    categoriesTag || buildCategoriesTag();
    if (0 >= b.length)for (var k in categoriesTag) {
        if (k.substring(0, a.length) === a || k.substring(0, a.length) === a.capitalizeFirstLetter()) b.push(k), c || (c = k)
    } else b.push("LINE");
    if (0 < b.length) {
        k = b[0];
        (void 0)[k] === k.capitalizeFirstLetter() && (k = k.capitalizeFirstLetter(), b[0] = k, c || (c = k));
        for (; (void 0)[k];)if ("string" === typeof(void 0)[k]) b.push((void 0)[k]), k =
            (void 0)[k], c || (c = k); else {
            a = (void 0)[k];
            for (j = 0; j < a.length; j++)b.push(a[j]), c || (c = k);
            break
        }
        if (c) {
            b.push("LINE");
            for (j = a = 0; j < categoriesTag[c].length && 2 > a; j++)k = categoriesTag[c][j], -1 == b.indexOf(k) && -1 == b.indexOf(k.capitalizeFirstLetter()) && (b.push(k), a++)
        }
    }
    return b
};function startCityPoiFetch(a) {
    var a = "wtop_" + a + ".js", b = arrassoc(a, worldPoiCache);
    b ? (debug("loadfromcache " + a), fsa = b, loadPoiTracer.result.push([a, b]), loadPoiTracer.city = !1, checkDonePoiFetch() && donePoiFetch()) : (fsa = [], $.ajax({
        type: "GET",
        url: JSURLPREFIX + a,
        dataType: "script",
        cache: !0,
        crossDomain: !0
    }))
}
function wtop_named_load(a, b) {
    var c, h, j, k;
    if (cel = arrassoc(a, worldPoiCache)) b = cel; else {
        h = b.length;
        for (c = 0; c < h; c++) {
            j = b[c];
            k = {lat: j[3], lng: j[4], orig: 1};
            if (j[0] && (j[1] || j[2])) k.name = j[0];
            j[1] && (k.wp = j[1]);
            j[2] && (k.fs = j[2]);
            k.gpop = j[5];
            j[6] && (k.wpop = j[6]);
            j[7] && (k.fsu = j[7]);
            j[8] && (k.fstype = j[8]);
            j[9] && (k.fsgtype = j[9]);
            j[10] && (k.mergepos = j[10]);
            11 < j.length && j[11] && (k.photo = Math.round(j[11]));
            0 < c && (b[c - 1] = k)
        }
        b.pop();
        worldPoiCache.length >= WORLD_POI_CACHE_MAX && worldPoiCache.pop();
        worldPoiCache = [[a, b]].concat(worldPoiCache)
    }
    fsa =
        b;
    loadPoiTracer.result.push([a, b]);
    loadPoiTracer.city = !1;
    checkDonePoiFetch() && donePoiFetch()
}
function startWorldPoiFetch(a, b) {
    var c, h, j, k, m, q = {
        "w1_90_0_90_-180_0.js": "w1_180_-90_90_-180_180.js",
        "w1_90_0_90_0_180.js": "w1_180_-90_90_-180_180.js",
        "w1_90_-90_0_-180_0.js": "w1_180_-90_90_-180_180.js",
        "w1_90_-90_0_0_180.js": "w1_180_-90_90_-180_180.js"
    };
    m = [];
    h = b.length;
    for (c = 0; c < h; c++)if (j = maps[b[c]], "undefined" !== typeof j)if ("undefined" === typeof j.latlng && (j.latlng = new google.maps.LatLng(j.centerlat, j.centerlng)), "undefined" === typeof j.imagebounds && (j.imagebounds = new google.maps.LatLngBounds(new google.maps.LatLng(j.ll_lat,
            j.ll_lng), new google.maps.LatLng(j.ru_lat, j.ru_lng))), j = getMapFn(j), j = j.substr(0, j.lastIndexOf(".")) + ".js", (k = q[j]) && (j = k), contains(m, j)) {
        if (debug("alreadyloaded " + j), loadPoiTracer.world--, showLoadPoiTracer(), checkDonePoiFetch()) {
            donePoiFetch();
            break
        }
    } else if (m.push(j), k = arrassoc(j, worldPoiCache)) {
        if (debug("loadfromcache " + j), loadPoiTracer.result.push([j, k]), loadPoiTracer.world--, checkDonePoiFetch()) {
            donePoiFetch();
            break
        }
    } else debug("loading " + j), $.ajax({
        type: "GET", url: JSURLPREFIX + j, dataType: "script",
        cache: !0, crossDomain: !0, timeout: WORLDJSTIMEOUT, error: function () {
            loadPoiTracer.world--;
            checkDonePoiFetch() && donePoiFetch()
        }
    })
}
function wiki_named_load(a, b) {
    var c, h, j, k;
    if (c = arrassoc(a, worldPoiCache)) b = c; else {
        h = b.length;
        for (c = 0; c < h; c++)j = b[c], k = {
            lat: j[1],
            lng: j[2],
            gpop: j[3],
            tags: j[4]
        }, j[0] && (k.name = j[0]), 5 < h && j[5] && (k.photo = j[5]), k.ppop = 6 < h ? j[6] ? j[6] : j[3] : j[3], 7 < h && j[7] && (k.wp = 1 == j[7] ? j[0] : j[7]), 8 < h && j[8] && (k.wt = k.wp), 9 < h && j[9] && (k.fstype = j[9]), 10 < h && j[10] && (k.fsgtype = j[10]), 11 < h && j[11] && (k.fs = j[11]), 12 < h && j[12] && (k.fpop = j[12]), 13 < h && j[13] && (k.fnear = j[13]), 14 < h && (k.tile = makeCityFname(j[14]), k.wpi = j[14]), 15 < h && j[15] && (k.inhabit =
            j[15]), b[c] = k;
        worldPoiCache.length >= WORLD_POI_CACHE_MAX && worldPoiCache.pop();
        worldPoiCache = [[fnameProper(a), b]].concat(worldPoiCache)
    }
    "../data/wpng/w1_topcities.js" == a ? donePoiFetch() : (loadPoiTracer.result.push([a, b]), loadPoiTracer.world--, checkDonePoiFetch() && donePoiFetch())
}
function fnameProper(a) {
    var b;
    b = a.lastIndexOf("/");
    return 0 > b ? a : a.substring(b + 1)
}
function startGooglePoiFetch(a, b) {
    var c, h, j, k;
    h = b.getNorthEast();
    j = b.getSouthWest();
    k = 0.3 * distanceFlat(h.lat(), h.lng(), j.lat(), j.lng());
    debug("ne " + h + " sw " + j + "radius : " + k);
    if (!googlePlacesService || !k || 1E5 < k) loadPoiTracer.google = !1, checkDonePoiFetch() && donePoiFetch(); else {
        5E4 < k && (k = 5E4);
        c = {location: a, radius: k};
        for (h = 0; h < googlePoiCache.length; h++)if (j = googlePoiCache[h], 5E-7 > Math.abs(j[0].location.lat() - c.location.lat()) / j[0].radius && 5E-7 > Math.abs(j[0].location.lng() - c.location.lng()) / j[0].radius &&
            0.001 > Math.abs(j[0].radius - c.radius) / j[0].radius) {
            debug("found in google cache");
            loadPoiTracer.result.push(["google", j[1]]);
            loadPoiTracer.google = !1;
            checkDonePoiFetch() && donePoiFetch();
            return
        }
        debug("doing google call");
        googlePlacesService.search(c, function (a, b) {
            returnGooglePoiFetch(a, b, c)
        })
    }
}
function returnGooglePoiFetch(a, b, c) {
    var h, j, k;
    if (b == google.maps.places.PlacesServiceStatus.OK) {
        h = a.length;
        for (b = 0; b < h; b++)j = a[b], k = {
            lat: j.geometry.location.lat(),
            lng: j.geometry.location.lng(),
            orig: 2
        }, j.name && (k.name = j.name), k.gplace = j, a[b] = k;
        loadPoiTracer.result.push(["google", a])
    }
    loadPoiTracer.google = !1;
    googlePoiCache.length >= GOOGLE_POI_CACHE_MAX && googlePoiCache.pop();
    googlePoiCache = [[c, a]].concat(googlePoiCache);
    checkDonePoiFetch() && donePoiFetch()
};function makeMarkerObject(a, b, c, h, j, k) {
    c = "object" === typeof c ? c : new google.maps.MarkerImage(c, iconMsize, iconOpoint, iconApoint);
    return new google.maps.Marker({position: b, title: h, zIndex: j, icon: c, animation: k, map: a, shape: iconShape})
}
function addGenericMarker(a, b, c, h, j, k) {
    a = makeMarkerObject(a, b, c, h, j);
    null !== k && void 0 !== k && google.maps.event.addListener(a, "click", k);
    return a
}
function getWikiUrl() {
    return MOBILE ? "http://en.m.wikipedia.org/wiki/" : "http://www.wikipedia.org/wiki/"
}
function getWikiVoyageUrl() {
    return MOBILE ? "http://en.m.wikivoyage.org/wiki/" : "http://en.wikivoyage.org/wiki/"
}
function getWikiVoyageApiUrl() {
    return "http://en.wikivoyage.org/w/api.php?format=json&callback=myWikiInfoResultWV&action=query&prop=extracts&exintro=&explaintext=&titles="
}
function getWikiApiUrl() {
    return "https://en.wikipedia.org/w/api.php?format=json&callback=myWikiInfoResultWP&action=query&prop=extracts&exintro=&explaintext=&titles="
}
function poiGetSummaryTitle(a) {
    var b = poiGetWikiVoyagePage(a);
    if ("" != b && "undefined" !== typeof b)return b;
    b = poiGetWikiPage(a);
    return "" != b && "undefined" !== typeof b ? b : ""
}
function poiGetSummaryUrl(a) {
    var b = poiGetWikiVoyagePage(a);
    if ("" != b)return getWikiVoyageApiUrl();
    b = poiGetWikiPage(a);
    return "" != b ? getWikiApiUrl() : ""
}
function poiGetTitle(a) {
    return a.name ? a.name : ""
}
function poiGetWikiPage(a) {
    return 1 == a.wp ? a.name : a.wp
}
function poiGetWikiVoyagePage(a) {
    return 1 == a.wt ? a.name : a.wt
}
function poiGetFourSquareId(a) {
    return a.fs
}
function poiGetInfoboxString() {
    return contentString
}
function poiGetRank(a) {
    return a.wpi
}
function poiGetLocalRank(a) {
    return a.tpi
}
function poiGetWikiHtml(a) {
    var b = getWikiUrl(), a = poiGetWikiPage(a);
    return !a ? "" : poiCreateLinkIconHtml(b + a, "wikipedia", "wiki", PNGURLPREFIX + "wikipedia.png")
}
function poiGetWikiVoyageHtml(a) {
    var b = getWikiVoyageUrl(), a = poiGetWikiVoyagePage(a);
    return !a ? "" : poiCreateLinkIconHtml(b + a, "wikivoyage", "wiki", PNGURLPREFIX + "wikivoyage_32.png")
}
function poiGetGoogleSearchHtml(a) {
    a = poiGetTitle(a);
    return !a ? "" : poiCreateLinkIconHtml("http://www.google.com/search?q=" + escape(a), "google search", "wiki", PNGURLPREFIX + "google_g_32.png")
}
function poiGetTripAdvisorSearchHtml(a) {
    a = poiGetTitle(a);
    return !a ? "" : poiCreateLinkIconHtml("http://www.tripadvisor.com/search?q=" + encodeURIComponent(a), "tripadvisor search", "wiki", PNGURLPREFIX + "tripadvisor_32.png")
}
function poiGetFourSquareHtml(a) {
    a = poiGetFourSquareId(a);
    return !a ? "" : poiCreateLinkIconHtml("http://foursquare.com/venue/" + a, "foursquare", "wiki", PNGURLPREFIX + "foursquare.png")
}
function poiCreateLinkIconHtml(a, b, c, h) {
    return poiCreateIconHtml("openExtUrl('" + a + "')", b, h, c)
}
function poiCreateIconHtml(a, b, c, h) {
    "undefined" === h && (h = "");
    a = "<a href='javascript:' onclick=\"" + a + "\" title='" + b + "' target='" + h + "' style='text-decoration:none'><img src='" + c + "' border='0' align='middle'/></a>";
    MOBILE || (a += "&nbsp;");
    return a
}
function poiGetStreetViewHtml(a) {
    return poiCreateIconHtml("showStreetmap(" + a.lat + "," + a.lng + ")", "google streetview", PNGURLPREFIX + "streetview.png")
}
function poiGetGooglePlaceHtml(a) {
    return !a.gplace ? "" : poiCreateIconHtml("showGoogleMarkerDetails('" + a.gplace.reference + "');", "google place", PNGURLPREFIX + "gplus_32.png", "wiki")
}
function poiHasPanoramio(a) {
    return a.photo ? !0 : !1
}
function poiHasImage(a) {
    return "undefined" === typeof a.images ? !1 : 0 < a.images.length ? !0 : !1
}
function getImageThumb(a) {
    if (!a)return "";
    a = a.split(".");
    a[a.length - 2] += "l";
    return a = a.join(".")
}
function poiGetImages(a) {
    if ("undefined" !== typeof a.images && a.images.length) {
        var b = [];
        for (key in a.images)if (a.images[key].link) {
            var c = getImageThumb(a.images[key].link);
            b[b.length] = {image: a.images[key].link, thumb: c}
        }
        return b
    }
    return []
}
function poiGetImage(a, b) {
    return "undefined" !== typeof a.images && a.images.length ? b ? "" : {
        image: a.images[Object.keys(a.images)[0]].link,
        thumb: getImageThumb(a.images[Object.keys(a.images)[0]].link)
    } : a.photo ? b ? a.photo : {image: PHOTOPREFIX + a.photo + ".jpg", thumb: PHOTOPREFIX + a.photo + ".jpg"} : null
}
function poiGetPanoramioHtml(a, b) {
    var c = poiGetImage(a, !0), h = "", h = poiHasPanoramio(a),
        h = c && h ? "<a href='#' title='Click for Panoramio photos. Photos are copyrighted by their owners.' style='font-size: 12px' onclick='showPhotos(" + a.lat + "," + a.lng + "," + poiGetRank(a) + "," + c + ")'>" : "<a href='#' title='Click for Panoramio photos. Photos are copyrighted by their owners.'style='font-size: 12px' onclick='showPhotos(" + a.lat + "," + a.lng + "," + poiGetRank(a) + ")'>";
    b || (b = "<img src='" + PNGURLPREFIX + "panoramio.png' border='0' align='middle'/>");
    h += b + "</a>";
    MOBILE || (h += "&nbsp;");
    return h
}
function poiGetPhotosHtml(a, b) {
    var c = poiGetImage(a);
    poiHasPanoramio(a);
    var h = poiHasImage(a), j = "", b = b || "lightbox-poi-";
    if (c) {
        var k = c.image, c = c.thumb, j = "<div class='mrkthumbsurr' style='min-height: 100px;'>";
        h && (j += '<a href="' + k + '" data-lightbox="' + b + a.un + '">');
        MOBILE ? j = j + ("<img src='" + c + "' border='0' align='middle' ") + " onerror='$(this).parent().hide();' style='min-height: 75px; max-width: 100px; max-height: 100px;' " : (j += "<img src='" + c + "' border='0' align='middle' width='100' height='75' ", j += " onerror='$(this).parent().hide();' style='min-height: 75px; min-width: 50px; max-width: 100px; max-height: 100px;' ");
        if (h) {
            if (j += " class='mrkthumb'", j += ">", k = poiGetImages(a), "undefined" !== typeof k)for (c = 1; c < k.length; c++)j += '<a href="' + k[c].image + '" data-lightbox="' + b + a.un + '" style="display:none"><img src="' + k[c].thumb + '" onerror="$(this).parent().remove();" class="mrkthumb"></a>'
        } else j += " onclick='showPhotos(" + a.lat + "," + a.lng + "," + poiGetRank(a) + "," + poiGetImage(a, !0) + ")' class='mrkthumb' ", j += "title='Click for Panoramio photos. Photos are copyrighted by their owners.'>", j += "<div style='vertical-align: bottom'>" +
            poiGetPanoramioHtml(a, "Panoramio photos") + "</a></div>";
        h && (j += "</a>", "undefined" !== typeof a.images && (h = a.images.length, k = h + " image", 1 < h && (k += "s"), j += "<div style='vertical-align: bottom;text-align:center;'><a href='#' title='Click for images.'style='font-size: 12px' onclick='$(this).parents(\".mrkthumbsurr\").find(\"a\").first().click();return false;'>" + k + "</a></div>"));
        j += "</div>"
    }
    return j
}
function poiGetWorldRankHtml(a) {
    var a = poiGetRank(a), b = "";
    a && (b = TOUCH && MOBILE ? "<span class='touchrankstr'>world rank: " + (a + 1) + "</span>" : "<span class='rankstr'>world rank: <b>" + (a + 1) + "</b></span>");
    return b
}
function poiGetUserRank(a) {
    a = a.urank;
    "undefined" === typeof a && (a = "");
    return a
}
function poiIsInCity(a) {
    return 1 == a.orig
}
function poiGetRankHtml(a) {
    var b = poiGetRank(a), c = poiGetLocalRank(a), h = "", j = poiIsInCity(a);
    b || 0 === b ? (curWrank = b, MOBILE || (h = poiGetWorldRankHtml(a), h = c < b ? h + ("<br><span class='rankstr'>in visible area: <b>" + (c + 1) + "</b></span><br>") : h + "<br>")) : (curWrank = -1, h = j ? TOUCH && MOBILE ? "<span class='touchrankstr'>rank in area: <b>" + (c + 1) + "</b></span><br>" : "<span class='rankstr'>rank in area: <b>" + (c + 1) + "</b></span><br>" : TOUCH && MOBILE ? !c && 0 !== c ? "" : "<span class='rankstr'>rank in area: <b>" + (c + 1) + "</b></span>" : !c && 0 !==
    c ? "" : "<span class='touchrankstr'>rank in area: <b>" + (c + 1) + "</b></span><p/>");
    return h
}
function poiGetUserRankHtml(a) {
    var a = poiGetUserRank(a), b = "";
    "" != a && (a = $("<div/>").text(a).html(), b = TOUCH && MOBILE ? "<span class='touchrankstr'>rating: <b>" + a + "</b></span><br>" : "<span class='rankstr'>rating: <b>" + a + "</b></span><br>");
    return b
}
function poiGetZoomButtonHtml(a, b) {
    var c = poiGetRank(a), h = "", h = poiIsInCity(a);
    b || (b = "btn-infobox");
    c || 0 === c ? (h = poiGetLocalRank(a), h = MOBILE ? "<a class='btn btn-primary " + b + "' style='width: 40px;' href='javascript:zoomTopMarker(" + h + "," + c + "," + a.lat + "," + a.lng + ");'>zoom</a>" : "<a href='javascript:zoomTopMarker(" + h + "," + c + "," + a.lat + "," + a.lng + ");' class='btn btn-primary " + b + "''>zoom</a>") : h = h ? TOUCH && MOBILE ? "<a href='javascript:zoomCloser(" + a.lat + "," + a.lng + ");' class='btn btn-primary' style='width: 40px'>zoom</a>" :
        "<a href='javascript:zoomCloser(" + a.lat + "," + a.lng + ");' class='btn btn-primary " + b + "'>zoom</a>" : TOUCH && MOBILE ? "<a class='btn btn-primary' style='width: 40px' href='javascript:zoomCloser(" + a.lat + "," + a.lng + ");'>zoom</a>" : "<a href='javascript:zoomCloser(" + a.lat + "," + a.lng + ");' class='btn btn-primary " + b + "'>zoom</a>";
    return h
}
function poiMarkerInfoboxHtml(a) {
    var b, c, h, j, k;
    b = poiGetTitle(a);
    var m = a.un;
    poiGetWikiHtml(a);
    poiGetGoogleSearchHtml(a);
    poiGetTripAdvisorSearchHtml(a);
    var q = poiGetWikiVoyageHtml(a), r = poiGetFourSquareHtml(a);
    k = poiGetGooglePlaceHtml(a);
    var n = poiGetPhotosHtml(a, "marker-poi-");
    poiGetPanoramioHtml(a);
    poiGetImage(a);
    poiGetStreetViewHtml(a);
    var u = poiGetRankHtml(a), t = poiGetUserRankHtml(a), w = poiGetZoomButtonHtml(a);
    SOCIAL && !MOBILE && "nonsocial" !== getSocialSelected() ? (j = getSocPoiDataForInfoStr(a.lat, a.lng, b),
        c = makeSocialinfoStr(a, j, m), h = makeSaveBtn(m)) : socialInfoBtn = c = "";
    TOUCH && MOBILE ? (j = '<div class="touch_tmarker" id=\'tmarker' + m + "'><div><div class='boxtop'>", MOBILE ? (j = ("" != b ? j + ("<span class='touch_boxtitle'>" + b + "</span></div>") : j + "<p/></div>") + n, j += "<a class='btn btn-primary' style='margin-bottom: 10px; width: 40px;' href='javascript:closeInfoBox();'>close</a><br>", j += w) : (j = "" != b ? j + ("<span class='touch_boxtitle'>" + b + "</span><div style='margin-bottom: 0px; margin-top: 0px; font-size: 14px; font-weight: normal;'>" +
        u + "</div></div></div>") : j + u, j += n, j += "<div style='text-align: right; margin-right: 20px; margin-bottom: 20px;'>", j += "<a class='btn btn-primary' style='margin-bottom: 5px; width: 40px;'", j += " href='javascript:closeInfoBox();'>close</a><br>", j += w, j += "<div style='height:5px'></div>" + h, n || (j += "</div>")), j += "</div></div>" + c) : (n ? (j = "" != b ? '<div class="tmarker" id=\'tmarker' + m + "'><div class='boxtop'>" + ("<span class='boxtitle'>" + b + "</span>") : "<div class=\"tmarker\" style='min-height: 150px' id='tmarker" + m +
        "'><div class='boxtop'>", j += "</div>", j += "<table><tr><td style='vertical-align:top;'>", j += n, j += "</td><td style='vertical-align:top;'>", j += "<div class='iboxtxt'>", j += "<div class='zoombtn'><a class='btn btn-primary btn-infobox' href=\"javascript:poiShowMoreInfo('" + m + "');\">see more</a></div>", j += "<div class='zoombtn'>" + w + "</div>", "mymap" != getSocialSelected() ? j += "<div class='zoombtn'><a class=\"btn btn-primary btn-infobox\" href=\"javascript:addToMyMap('" + m + '\');" title="save this place to a custom map">save</a></div>' :
        (j += '<div class=\'zoombtn\'><a class="" style="padding-right:5px;" href="javascript:myPoiEdit(findPoiKeyByIndex(\'' + m + '\'));" title="edit this place">edit</a>', CUSTOM_MAP_INFOBOX_DELETE_BUTTON && (j += '<a class=""  style="padding-left:5px;" title="delete this place" onclick="myPoiDeleteConfirmation(null, findPoiKeyByIndex(' + m + "), '" + jsEscape(b) + "'); return false;\">delete</a>"), j += "</div>"), j += u + t + h + "</div>") : (j = "" != b ? "<div class=\"tmarker\" style='min-height: 120px' id='tmarker" + m + "'><div class='boxtop'>" +
        ("<span class='boxtitle'>" + b + "</span>") : "<div class=\"tmarker\" style='min-height: 100px' id='tmarker" + m + "'><div class='boxtop'>", j += "<div>" + t + "</div>", a.description && (j += '<div class="user-description infobox-user-description">' + a.description + "</div>"), j += "</div>", j += "<table><tr><td style='vertical-align:top;'>", j += "<div class='zoombtn'>", j += "<a class='btn btn-primary btn-infobox' href=\"javascript:poiShowMoreInfo('" + m + "');\">see more</a> " + w, "mymap" != getSocialSelected() ? j += ' <a class="btn btn-primary btn-infobox" style="width:60px;" href="javascript:addToMyMap(\'' +
        m + '\');" title="save this place to a custom map">save</a>' : (j += "</div>", j += '<div class=\'zoombtn\'><a class="" style="padding-right: 5px;" href="javascript:myPoiEdit(findPoiKeyByIndex(\'' + m + '\'));" title="edit this place">edit</a>', CUSTOM_MAP_INFOBOX_DELETE_BUTTON && (j += ' <a class="" style="padding-left: 5px;" title="delete this place" onclick="myPoiDeleteConfirmation(null, findPoiKeyByIndex(' + m + "), '" + jsEscape(b) + "'); return false;\">delete</a>")), j += "</div>", j += "</td><td style='vertical-align:top;'></td></tr><td style='vertical-align:top;'>",
        j += "<div class='iboxtxt' style='margin-left: 5px;'>" + u + h + "</div>"), j += "</td></tr></table>", j += "</div>" + c);
    b = 0;
    q && b++;
    r && b++;
    k && b++;
    a.exticons = b;
    return j
}
function addMarker(a, b, c) {
    var h, j, k, m, q, r, n, u, t;
    h = b.lat;
    j = b.lng;
    k = poiGetTitle(b);
    m = b.tpi;
    q = b.wpi;
    colorrank = b.tcrank;
    colorrank || (colorrank = b.rank);
    colorrank || (colorrank = 5);
    r = poiIsInCity(b);
    t = idnums++;
    b.un = t;
    var w = PNGURLPREFIX + "gmarker" + colorrank + ".png", A = null;
    c && (w = pinSymbol("orange"), A = highlightAnimation);
    n = makeMarkerObject(a, new google.maps.LatLng(h, j), w, k, 6 - colorrank, A);
    u = poiMarkerInfoboxHtml(b);
    TOUCH || google.maps.event.addListener(n, "mouseover", function (b) {
        markerInfoboxEvent(b, inited, n, u, a, t, void 0);
        $(".infobox-user-description").dotdotdot()
    });
    google.maps.event.addListener(n, "click", function (c) {
        tripPlanMode ? markerTripEvent(c, b) : TOUCH && MOBILE ? (markerInfoboxEventMobile(c, n, u, a, b.exticons), $(".infobox-user-description").dotdotdot()) : TOUCH && !MOBILE ? (markerInfoboxEvent(c, inited, n, u, a, t, void 0), $(".infobox-user-description").dotdotdot()) : r ? zoomCloser(h, j) : markerZoomEvent(c, m, q, h, j)
    });
    mapMarkersArray.push({marker: n, poi: b});
    return [b, n, u]
}
function markerInfoboxEvent(a, b, c, h, j, k, m) {
    var q;
    if (!0 == b && (!smapImgLoading || !m)) {
        if (m)if (IMGSIZEPRECALC) {
            var r = new Image;
            smapImgLoading = !0;
            smapImgTimeOut = setTimeout(function () {
                imgLoaderTimeout({event: a, inited: b, marker: c, contentString: h, map: j, un: k, imgurl: m})
            }, IMGLOADTIMEOUT);
            r.onload = function () {
                debug(this.width + "x" + this.height);
                q = "width='100'";
                q = q.replace("100", this.width + "");
                h = h.replace("width='100'", q);
                q = "height='75'";
                q = q.replace("75", this.height + "");
                h = h.replace("height='75'", q);
                smapImgLoading =
                    !1
            };
            r.onerror = function () {
                debug("img loading error");
                window.clearInterval(smapImgTimeOut);
                smapImgTimeOut = null;
                smapImgLoading = !1
            };
            r.src = m
        } else IMGSIZESIMPLEPRECALC && $("<img/>").attr("src", m), h = h.replace("width='100'", ""), h = h.replace("height='75'", "");
        markerInfoboxEventAux(a, b, c, h, j, k, m)
    }
}
function imgLoaderTimeout() {
    smapImgLoading && smapImgTimeOut ? (window.clearInterval(smapImgTimeOut), smapImgTimeOut = null, smapImgLoading = !1, debug("active imgLoaderTimeout")) : (debug("inactive imgLoaderTimeout"), smapImgTimeOut && (window.clearInterval(smapImgTimeOut), smapImgTimeOut = null))
}
function markerInfoboxEventAux(a, b, c, h, j) {
    a = new google.maps.InfoWindow({content: h, maxWidth: 300, maxHeight: 400, disableAutoPan: !0});
    null != lastShownMarker && lastShownMarker.infowindow.close();
    closeLastShownMarkers();
    lastShownMarkers.push(c);
    doneIBoxAction = !0;
    c.infowindow = a;
    lastShownMarker = c;
    currentInfoWindow = a;
    a.setPosition(c.getPosition());
    a.open(j, c);
    google.maps.event.addListener(a, "closeclick", function () {
        if ("mymap" == getSocialSelected() || "shared" == getSocialSelected()) highlightedMarkerIndex = -1, $("#leftmenu_list li.highlight .mypoifocus .icon").addClass("icon-white"),
            $("#leftmenu_list li.highlight").removeClass("highlight"), donePoiFetch();
        currentInfoWindow = null
    })
}
function markerInfoboxEventMobile(a, b, c, h, j, k) {
    c = {
        content: c,
        disableAutoPan: !1,
        maxWidth: 800,
        pixelOffset: new google.maps.Size(-60, -50),
        zIndex: 1E3,
        boxStyle: {opacity: 1},
        closeBoxMargin: "10px 2px 2px 2px",
        closeBoxURL: "",
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: !1,
        pane: "floatPane",
        enableEventPropagation: !1
    };
    MOBILE ? c.boxStyle.width = "185px" : (a = 220, j && (a += 32 * (j - 1)), c.boxStyle.width = a + "px");
    k && IMGSIZESIMPLEPRECALC && $("<img/>").attr("src", k);
    j = new InfoBox(c);
    doneIBoxAction = !0;
    null != lastShownBox && lastShownBox.close();
    lastShownBox = j;
    j.setPosition(b.getPosition());
    j.open(h, b)
}
function markerWikiEvent(a, b, c) {
    window.open(0 != b ? 1 == b ? "http://www.wikipedia.org/wiki/" + title : "http://www.wikipedia.org/wiki/" + b : "http://foursquare.com/venue/" + c, "wiki")
}
function markerZoomEvent(a, b, c, h, j) {
    debug(a + "," + b + "," + c + "," + h + "," + j + "," + fixOverlay);
    fixOverlay || 0 === fixOverlay ? (h = new google.maps.LatLng(h, j), googleMap.setCenter(h), googleMap.setZoom(17)) : 0 === c || "" != c ? zoomTopMarker(b, c, h, j) : (a = googleMap.getZoom(), h = new google.maps.LatLng(h, j), googleMap.setCenter(h), 10 <= a && 14 > a ? googleMap.setZoom(14) : 11 <= a ? googleMap.setZoom(a + 2) : googleMap.setZoom(11))
}
function markerTripEvent(a, b) {
    var c;
    null == tripStartLat || null == tripStartLng || (c = isInItinerary(userItinerary, b), null != c ? tripRemovePOI(c) : tripAddPOI(b))
}
function showGoogleMarkerDetails(a) {
    googlePlacesService.getDetails({reference: a}, showGoogleMarkerDetailsCallback)
}
function showGoogleMarkerDetailsCallback(a, b) {
    var c;
    b == google.maps.places.PlacesServiceStatus.OK && (c = a.url, window.open(c, "wiki"))
}
function closeLastShownMarkers() {
    for (i = 0; i < lastShownMarkers.length; i++)null != lastShownMarkers[i] && lastShownMarkers[i].infowindow.close();
    currentInfoWindow = null;
    lastShownMarkers = []
}
function makeSocialinfoStr(a, b, c) {
    getSocialSelected();
    return !b ? makeSocialInfoForm(!1, !1, a, c, !1, !1, !1, !1) : ""
}
function makeSocialinfoRateb(a) {
    var b, c;
    b = TOUCH && MOBILE ? "rateshow_touch" : "rateshow";
    9 == a ? c = "<span class='" + b + " rateb9'>hide</span>" : 5 == a ? c = "<span class='" + b + " rateb5'>ok</span>" : 3 == a ? c = "<span class='" + b + " rateb3'>cool</span>" : 1 == a && (c = "<span class='" + b + " rateb1'>must</span>");
    return c
}
function replaceDescLinks(a) {
    var b, c, h, a = a.split(" ");
    b = "";
    for (c = 0; c < a.length; c++)h = 0 === a[c].indexOf("http://") || 0 === a[c].indexOf("https://") ? "<a href='" + a[c] + "' target='wiki'>link</a>" : 0 === a[c].indexOf("www.") ? "<a href='http://" + a[c] + "' target='wiki'>link</a>" : a[c], 0 < c && (b += " "), b += h;
    return b
}
function makeUnameFromUid(a) {
    return a ? a + "" : "I"
}
function makeSaveBtn() {
    return ""
}
function makeSocialInfoForm(a, b, c, h, j, k, m, q) {
    var r, n;
    k || (k = c.name);
    a ? (r = "", n = "<div class='rating' id='rating" + h + "' style='display: block'>") : (r = "", n = "<div class='rating' id='rating" + h + "' style='display: none'>");
    k || (n = n + ("<input type='text' size='23' placeholder='Title' id='titlefld" + h + "' value='' ") + "class='socinputfld'></br>");
    n += "Rate:<br/> ";
    m || (m = 5);
    n = 9 == m ? n + ('<button onclick="poiRank(' + h + ",this,9)\" id='rbtn9" + h + "' class='ratebsel rateb9'>ok</button>") : n + ('<button onclick="poiRank(' + h + ",this,9)\" id='rbtn9" +
        h + "' class='rateb rateb9'>hide</button>");
    n = 5 == m ? n + ('<button onclick="poiRank(' + h + ",this,5)\" id='rbtn5" + h + "' class='ratebsel rateb5'>ok</button>") : n + ('<button onclick="poiRank(' + h + ",this,5)\" id='rbtn5" + h + "' class='rateb rateb5'>ok</button>");
    n = 3 == m ? n + ('<button onclick="poiRank(' + h + ",this,3)\" id='rbtn3" + h + "' class='ratebsel rateb3'>cool</button>") : n + ('<button onclick="poiRank(' + h + ",this,3)\" id='rbtn3" + h + "' class='rateb rateb3'>cool</button>");
    n = 1 == m ? n + ('<button onclick="poiRank(' + h + ",this,1)\" id='rbtn1" +
        h + "' class='ratebsel rateb1'>must</button>") : n + ('<button onclick="poiRank(' + h + ",this,1)\" id='rbtn1" + h + "' class='rateb rateb1'>must</button>");
    n += "<br/>";
    n += "<input type='hidden' id='rankfld" + h + "' value='" + m + "'>";
    n += "<textarea class='socinputfld' rows='2' cols='18' placeholder='My link or note' id='noteid" + h + "'>";
    q && (n += q);
    n += "</textarea><br/>";
    n = a ? n + ("<button class='btn btn-primary' onclick=\"poiSave('N'," + j + "," + h + "," + c.lat + "," + c.lng + ",'" + jsEscape(k) + "')\">save</button>") : b ? n + ("<button class='btn btn-primary' onclick=\"poiSave('N'," +
        j + "," + h + "," + c.lat + "," + c.lng + ",'" + jsEscape(k) + "')\">save</button>") : n + ("<button class='btn btn-primary' onclick=\"poiSave('E'," + j + "," + h + "," + c.lat + "," + c.lng + ",'" + jsEscape(k) + "')\">save</button>");
    if (!b && (m || q)) n += "<button class='btn btn-primary' onclick=\"poiDelete(" + j + "," + h + "," + c.lat + "," + c.lng + ",'" + jsEscape(k) + "')\" style='margin-left: 10px;'>remove rating</button>";
    n += "</div>";
    return r + n
}
function showRate(a) {
    $("#tmarker" + a).css("display", "none");
    $("#socinfo" + a).css("display", "none");
    $("#ratebtndiv" + a).css("display", "none");
    $("#rating" + a).css("display", "block")
}
function poiRank(a, b, c) {
    $("#rankfld" + a).val(c);
    $("#rbtn9" + a).css("opacity", 0.3);
    $("#rbtn5" + a).css("opacity", 0.3);
    $("#rbtn3" + a).css("opacity", 0.3);
    $("#rbtn1" + a).css("opacity", 0.3);
    $(b).css("opacity", 1)
}
function jsEscape(a) {
    return !a ? a : a = a.replace(/'/g, "&quot;")
};function getSocPoiDataForInfoStr(a, b, c) {
    var h, j, k;
    h = getSocialDataPos(soa, a, b, c);
    if (!h)return !1;
    c = soa[h - 1];
    if (c.lat == a && c.lng == b) {
        j = [];
        for (h -= 2; 0 <= h; h--)if (k = soa[h], k.lat == a && k.lng == b) j.push(k); else break;
        j != [] && (c.users = j);
        return c
    }
    return !1
}
function poiSave(a, b, c, h, j, k) {
    var m, q, r;
    r = googleMap.getZoom();
    m = $("#rankfld" + c).val();
    q = $("#noteid" + c).val();
    if (!k || "undefined" === k) k = $("#titlefld" + c).val();
    closeInfoBox();
    saveSocialdata(a, b, h, j, k, m, r, q);
    socialselectUpdate()
}
function poiDelete(a, b, c, h, j) {
    closeInfoBox();
    deleteSocialData(a, c, h, j);
    socialselectUpdate()
}
function poiGo(a, b, c, h) {
    a = new google.maps.LatLng(a, b);
    googleMap.setCenter(a);
    "undefined" !== typeof h && switchToMyMap(h);
    c || (c = 7);
    googleMap.setZoom(c)
}
function getSocialData(a, b, c) {
    c = getSocialDataPos(soa, a, b, c);
    if (!c)return !1;
    c = soa[c - 1];
    return c.lat == a && c.lng == b ? c : !1
}
function getSocialDataPos(a, b, c) {
    var h, j, k, m;
    if (!a)return !1;
    h = a.length;
    j = 0;
    for (k = h; ;) {
        if (k <= j)return j;
        m = j + Math.floor((k - j) / 2);
        a = soa[m];
        if (a.lat == b) {
            for (j = m; j < h; j++) {
                a = soa[j];
                if (a.lat == b && a.lng == c) {
                    for (; j < h; j++)if (a = soa[j], a.lat != b || a.lng != c)return j;
                    break
                }
                if (a.lat > b)return j
            }
            return h
        }
        if (a.lat < b) {
            if (m + 1 >= h || soa[m + 1].lat > b || k == j + 1)return m + 1;
            j = m
        } else {
            if (k == j + 1)return m;
            k = m
        }
    }
}
function saveSocialdata(a, b, c, h, j, k, m, q) {
    var r, n, u;
    SOCIAL || showQuickAlert("Your browser does not support data storage");
    r = getSocialDataPos(soa, c, h, j);
    if (!1 === r)return !1;
    lastSocialChange++;
    j = sanitizeTxt(j, 40);
    k = sanitizeTxt(k, 10);
    q = sanitizeTxt(q, 140);
    u = round6(c) + "|" + round6(h);
    if (0 != r && "N" != a && soa[r - 1].lat == c && soa[r - 1].lng == h) soa[r - 1].name = j, soa[r - 1].rank = k, soa[r - 1].zoom = m, soa[r - 1].desc = q; else {
        for (n = soa.length; n > r; n--)soa[n] = soa[n - 1];
        n = {lat: c, lng: h, rank: k, zoom: m, name: j, desc: q, type: a, sid: u};
        soa[r] = n
    }
    k =
        "N" === a ? {
            op: "insert_poi",
            type: "N",
            lat: c,
            lng: h,
            rank: k,
            zoom: m,
            title: j,
            descr: q
        } : b ? {op: "update_poi", id: b, lat: c, lng: h, rank: k, zoom: m, title: j, descr: q} : {
            op: "insert_poi",
            type: "E",
            lat: c,
            lng: h,
            rank: k,
            zoom: m,
            title: j,
            descr: q
        };
    SOCIALNOSERVER ? (socialnoserverid++, "N" === a ? socialInsertedPoi(["N", socialnoserverid, c, h, j]) : b ? socialInsertedPoi(["", b, c, h, j]) : socialInsertedPoi(["E", socialnoserverid, c, h, j])) : SOCIALLOCAL ? (a = JSON.stringify([u, "", k.lat, k.lng, k.type, k.rank, k.zoom, k.title, k.descr]), localStorage.setItem(u, a)) :
        $.ajax({
            type: "POST",
            url: SCRIPTURLPREFIX + "fbsp.php",
            data: k,
            dataType: "script",
            cache: !1,
            crossDomain: !0
        });
    return !1
}
function deleteSocialData(a, b, c, h) {
    var j;
    j = getSocialDataPos(soa, b, c, h);
    if (!j)return !1;
    lastSocialChange++;
    if (soa[j - 1].lat == b && soa[j - 1].lng == c) {
        h = soa.length;
        for (j -= 1; j < h - 1; j++)soa[j] = soa[j + 1];
        soa.pop()
    }
    newd = {op: "delete_poi", id: a, lat: b, lng: c};
    SOCIALNOSERVER ? sdebug("social: noserver delete " + a + " " + b + " " + c) : SOCIALLOCAL ? (lid = round6(b) + "|" + round6(c), debug("deleting " + lid), localStorage.removeItem(lid)) : $.ajax({
        type: "POST",
        url: SCRIPTURLPREFIX + "fbsp.php",
        data: newd,
        dataType: "json",
        cache: !1,
        crossDomain: !0
    });
    return !1
}
function loadSocial() {
    var a, b, c, h;
    if (SOCIALNOSERVER) sdebug("social: noserver loading pois"); else if (SOCIALLOCAL) {
        debug("social: to load local data, len " + localStorage.length);
        h = [];
        for (a = 0; a < localStorage.length; a++)b = localStorage.key(a), c = localStorage.getItem(b), debug(a + " " + b + " " + c), h.push(JSON.parse(c));
        h && socialLoadPois(h)
    } else $.ajax({
        type: "GET",
        url: SCRIPTURLPREFIX + "fbsp.php?op=load_pois",
        dataType: "script",
        crossDomain: !0,
        cache: !1
    })
}
function socialLoadPois(a) {
    var b, c, h, j;
    a.sort(function (a, b) {
        return a[soa_lat_p] == b[soa_lat_p] && a[soa_lng_p] == b[soa_lng_p] ? a[soa_uid_p] > b[soa_uid_p] ? -1 : 1 : a[soa_lat_p] - b[soa_lat_p]
    });
    c = a.length;
    for (b = 0; b < c; b++) {
        h = a[b];
        j = {lat: h[soa_lat_p], lng: h[soa_lng_p], orig: 3};
        h[soa_id_p] && (j.sid = h[soa_id_p]);
        h[soa_uid_p] && (j.uid = h[soa_uid_p]);
        h[soa_type_p] && (j.utype = h[soa_type_p]);
        if (h[soa_rank_p] || 0 === h[soa_rank_p]) j.rank = h[soa_rank_p];
        if (h[soa_zoom_p] || 0 === h[soa_zoom_p]) j.zoom = h[soa_zoom_p];
        h[soa_title_p] && (j.name =
            h[soa_title_p]);
        h[soa_descr_p] && (j.desc = h[soa_descr_p]);
        h[soa_users_p] && (j.users = h[soa_users_p]);
        a[b] = j
    }
    soa = a
}
function socialInsertedPoi(a) {
    var b, c, h, j;
    if (a && a instanceof Array && !(5 > a.length)) {
        b = a[1];
        c = a[2];
        h = a[3];
        a = a[4];
        a = getSocialDataPos(soa, c, h, a);
        for (a -= 1; 0 <= a; a--) {
            j = soa[a];
            if (j.lat < c)break;
            if (j.lat == c && j.lng == h) {
                j.sid = b;
                socialselectUpdate();
                break
            }
        }
    }
}
function sortMyPlaces(a, b) {
    var c, h;
    c = (c = a.name) ? c.toLowerCase() : "";
    h = (h = b.name) ? h.toLowerCase() : "";
    return c < h ? -1 : 1
}
function makePlaceUrl(a) {
    var b, c, h, j, k, m, q, r, n, u, t, w;
    if ("mymap" == getSocialSelected())return "undefined" === typeof myMapPois[a] && (a = selectedMyMap), res = SITEURL + SITEPATH + "?map=" + myMapGetId(a);
    b = googleMap.getCenter();
    a = round6(b.lat());
    b = round6(b.lng());
    c = googleMap.getZoom();
    u = getTopspotsSelected();
    j = "";
    j = heatMapEnabled() ? j + "1" : j + "0";
    j += "0";
    $("#strview").is(":visible") ? (j += "1", h = panorama.getPosition(), k = h.lat(), m = h.lng(), q = panorama.getPov(), r = q.heading, n = q.pitch, q = q.zoom) : j += "0";
    res = MOBILE ? MOBPHPURLPREFIX +
        "?lt=" + a + "&lg=" + b : PHPURLPREFIX + "?lt=" + a + "&lg=" + b;
    c != DEFAULT_ZOOM && (res += "&z=" + c);
    u != DEFAULT_PLACES && (res += "&p=" + u);
    j != DEFAULT_SETTINGS && (res += "&s=" + j);
    "all" != getSocialSelected() && (res += "&sv=" + getSocialSelected());
    h && (res += "&slt=" + round6(k) + "&slg=" + round6(m), r != DEFAULT_POVHEAD && (res += "&sh=" + Math.round(10 * r) / 10), n != DEFAULT_POVPITCH && (res += "&sp=" + Math.round(10 * n) / 10), q != DEFAULT_POVZOOM && (res += "&sz=" + q), largeSv && (res += "&sl=1"));
    fixOverlay && omlist && (h = maps[omlist[0]].wrank, res += "&w=" + h, round6(maps[omlist[0]].lat) !=
    a && (res += "&wlt=" + round6(maps[omlist[0]].lat)), round6(maps[omlist[0]].lng) != b && (res += "&wlg=" + round6(maps[omlist[0]].lng)));
    0 < lastShownMarkers.length && (t = lastShownMarkers[lastShownMarkers.length - 1]);
    t && (w = currentInfoWindow);
    debug(lastShownMarker + " " + lastShownMarkers.length + " " + t + "  " + w);
    w && (debug(w + " " + w.getPosition()), w = round6(t.getPosition().lat()), t = round6(t.getPosition().lng()), w && t && (res += "&ilt=" + w + "&ilg=" + t));
    tripPlanMode && !smap.recommender.isEmptyItinerary(userItinerary) && (res += "&tr=" + saveTrip());
    a = "";
    k = 2E3 - (20 + res.length);
    if ("nosocial" != getSocialSelected() && soa.length) {
        t = googleMap.getBounds();
        r = lastShownPois.concat(lastUserHiddenPois);
        w = [];
        for (h = 0; h < r.length; h++)if (r[h].sid && !contains(w, r[h].sid) && (debugPoi(h, r[h]), m = encSpoiForUrl(r[h], t))) {
            if (a.len + m.len > k)break;
            w.push(r[h].sid);
            a && (a += "+");
            a += m
        }
        decSpoiForUrl(a)
    }
    a && (res += "&up=" + a);
    return res
}
function encSpoiForUrl(a, b) {
    var c;
    c = new google.maps.LatLng(a.lat, a.lng);
    if (!b.contains(c))return "";
    c = a.lat + "~" + a.lng + "~" + a.zoom + "~" + a.rank;
    if (9 == a.wrank)return encodeURIComponent(c);
    "N" == a.utype ? c += "~" + a.name.replace("~", " ").replace("+", " ") : a.desc && (c += "~");
    a.desc && (c += "~" + a.desc.replace("~", " ").replace("+", " "));
    return encodeURI(c)
}
function decSpoiForUrl(a) {
    var b, c, h, j, k, m, q, r, n, a = a.split("+");
    for (c = 0; c < a.length; c++)if ((b = a[c].split("~")) && !(4 > b.length))if (h = Number(b[0]), j = Number(b[1]), n = round6(Number(b[2])), !isNaN(h) && !isNaN(j) && !isNaN(n))if (r = Number(b[3]), isNaN(r) && (r = 3), k = h + "|" + j, 4 < b.length && b[4] ? (q = decodeURIComponent(b[4]), m = "N") : (q = "", m = "E"), b = 5 < b.length ? decodeURIComponent(b[5]) : "", q = sanitizeTxt(q, 40), b = sanitizeTxt(b, 140), pos = getSocialDataPos(soa, h, j, q), 0 != pos && "N" != m && soa[pos - 1].lat == h && soa[pos - 1].lng == j) soa[pos - 1].name =
        q, soa[pos - 1].rank = r, soa[pos - 1].zoom = n, soa[pos - 1].desc = b; else {
        for (c = soa.length; c > pos; c--)soa[c] = soa[c - 1];
        debug(h + " " + j + " " + r + " " + n + " " + q + " " + b + " " + m + " " + k);
        h = {lat: h, lng: j, rank: r, zoom: n, name: q, desc: b, type: m, sid: k};
        soa[pos] = h
    }
}
function handleQuery(a) {
    var b, c, h;
    b = a.split("&");
    a = {};
    for (c = 0; c < b.length; c++)h = b[c].split("="), a[decodeURIComponent(h[0])] = decodeURIComponent(h[1]), debug(decodeURIComponent(h[0]) + ":" + decodeURIComponent(h[1]));
    !a.map && (a.lt && a.lg && 90 > Number(a.lt) && -90 < Number(a.lt) && 180 > Number(a.lg) && -180 < Number(a.lg)) && (MAP_CENTER_LAT = Number(a.lt), MAP_CENTER_LNG = Number(a.lg), a.z && (0 <= Number(a.z) && 22 > Number(a.z)) && (INITIAL_ZOOM = Number(a.z)), a.t && 20 >= a.t.length && (INITIAL_TITLEPREF = a.t.replace(/\</g, "&lt;").replace(/\>/g,
        "&gt;")), a.n && 1E3 >= a.n.length && (INITIAL_NOTE = a.n.replace(/\</g, "&lt;").replace(/\>/g, "&gt;")), a.w && (0 <= Number(a.w) && 16E3 > Number(a.w)) && (INITIAL_TOP_PLACE_WRANK = Number(a.w), INITIAL_TOP_PLACE_LAT = a.wlt && 90 > Number(a.wlt) && -90 < Number(a.wlt) ? Number(a.wlt) : MAP_CENTER_LAT, INITIAL_TOP_PLACE_LNG = a.wlg && 180 > Number(a.wlg) && -180 < Number(a.wlg) ? Number(a.wlg) : MAP_CENTER_LNG), a.s && (b = a.s, 0 < b.length && (INITIAL_HEATMAP = "1" == a.s[0] ? 1 : 0), 1 < b.length && ("1" == a.s[1] ? (INITIAL_BIGPHOTOS = 1, a.pn && (INITIAL_BIGPHOTONR = Number(a.pn)),
    a.pi && 4 > Number(a.pi) && (INITIAL_PHOTOITER = Number(a.pi))) : INITIAL_BIGPHOTOS = 0), 2 < b.length && ("1" == a.s[2] ? (INITIAL_STREETVIEW = 1, a.slt && (INITIAL_STREETVIEW_LAT = Number(a.slt)), a.slg && (INITIAL_STREETVIEW_LNG = Number(a.slg)), a.sl && "1" == a.sl && (INITIAL_STREETVIEW_LARGE = !0), a.sh && (INITIAL_STREETVIEW_POVHEAD = Number(a.sh)), a.sp && (INITIAL_STREETVIEW_POVPITCH = Number(a.sp)), a.sz && (INITIAL_STREETVIEW_POVZOOM = Number(a.sz))) : INITIAL_STREETVIEW = 0)), a.p && contains([0, 5, 10, 20, 50, 100, 500, 1E3], Number(a.p)) && (INITIAL_PLACES =
        Number(a.p)), a.ilt && (a.ilg && 90 > Number(a.ilt) && -90 < Number(a.ilt) && 180 > Number(a.ilg) && -180 < Number(a.ilg)) && (INITIAL_MARKER_LAT = Number(a.ilt), INITIAL_MARKER_LNG = Number(a.ilg), INITIAL_MARKER_SHOW = !0), a.up && decSpoiForUrl(a.up), a.tr && (INITIAL_TRIP = a.tr))
};function isTouchDevice() {
    return !!("ontouchstart" in window)
}
function getMapWidth() {
    return $("#map_canvas").width()
}
function getMapHeight() {
    return $("#map_canvas").height()
}
function getTopspotsSelected() {
    return topspotsSelected
}
function setTopspotsSelected(a) {
    setNormalMapState();
    topspotsSelected = a;
    HTML_MENU && (0 == a ? (setCityspotsSelected("hide"), $("#markernrlabel").html("no places")) : (setCityspotsSelected("see" + a + "c"), $("#markernrlabel").html(a + " places")))
}
function old_do_not_use_setTopspotsSelected(a) {
    setNormalMapState();
    topspotsSelected = a;
    HTML_MENU && $("#topspots").val("" + a);
    return !1
}
function getCityspotsSelected() {
    return cityspotsSelected
}
function setCityspotsSelected(a) {
    setNormalMapState();
    cityspotsSelected = a;
    HTML_MENU && $("#cityselect").val(a)
}
function photosEnabled() {
    return photosFlag
}
function setPhotosEnabled(a) {
    setNormalMapState();
    a ? (panoramioLayer.setMap(googleMap), photosFlag = !0) : (panoramioLayer.setMap(null), photosFlag = !1)
}
function photosToggle() {
    setNormalMapState();
    photosFlag ? (panoramioLayer.setMap(null), photosFlag = !1) : (panoramioLayer.setMap(googleMap), photosFlag = !0);
    HTML_MENU && $("#photos_btn").html("photos")
}
function heatMapEnabled() {
    return heatmapFlag
}
function setHeatMapEnabled(a) {
    setNormalMapState();
    a ? heatmapFlag || heatmapToggle() : heatmapFlag && heatmapToggle()
}
function setCityMenu() {
    $("#otype-dropdown-outer").hide();
    $("#people-dropdown-outer").hide();
    $("#city-dropdown-outer").show();
    $("#saved-dropdown-outer").show()
}
function clearCityMenu() {
    $("#otype-dropdown-outer").show();
    $("#people-dropdown-outer").show();
    $("#city-dropdown-outer").hide();
    $("#saved-dropdown-outer").show()
}
function heatmapToggle() {
    var a;
    setNormalMapState();
    heatMapEnabled() ? (heatmapFlag = !1, $("#heatmap_btn,#heatmap_button").removeClass("active"), a = [], hideMapslist(omlist, a), panoramioLayer && panoramioLayer.setMap(null)) : (heatmapFlag = !0, $("#heatmap_btn,#heatmap_button").addClass("active"), fixOverlay ? (a = fixOverlay, autoPanoLayer(googleMap.getZoom(), !0)) : (a = googleMap.getBounds(), a = getMapslist(a), autoPanoLayer(googleMap.getZoom(), !1)), showMapslist(a));
    HTML_MENU && $("#heatmap_btn,#heatmap_button").html("heat")
}
function getSocialSelected() {
    return socialSelected
}
function setSocialSelected(a) {
    socialSelected = a;
    "all" == a ? a = "all places" : "nosocial" == a ? a = "standard places" : "mymap" == a ? a = "my map" : "shared" == a ? a = "shared" : "allme" == a ? a = "all saved" : "me" == a && (a = "saved places");
    $("#sociallabel").html(a)
}
function getGtypeSelected() {
    return gtypeSelected
}
function setGtypeSelected(a) {
    gtypeSelected = a;
    fixOverlay || showQuickAlert("Place types have effect only <b>in high-res city views</b>", 2500);
    HTML_MENU && ("*" == a ? $("#gtypelabel").html("top sights") : "s" == a ? $("#gtypelabel").html("seeworthy") : "e" == a ? $("#gtypelabel").html("entertainment") : "a" == a ? $("#gtypelabel").html("museums") : "o" == a ? $("#gtypelabel").html("outdoors") : "h" == a ? $("#gtypelabel").html("shopping") : "t" == a ? $("#gtypelabel").html("slow food") : "f" == a ? $("#gtypelabel").html("fast food") : "n" == a ? $("#gtypelabel").html("nightlife") :
        "l" == a ? $("#gtypelabel").html("sleep") : "r" == a ? $("#gtypelabel").html("transport") : $("#gtypelabel").html(a))
}
function getOtypeSelected() {
    return otypeSelected
}
function setOtypeSelected(a) {
    fixOverlay && showQuickAlert("These types have effect only <b>outside</b> high-res city views", 2E3);
    otypeSelected = a;
    HTML_MENU && ("*" == a ? $("#otypeSelected").html("all types") : $("#otypeSelected").html(a))
}
function getPeopleSelected() {
    return peopleSelected
}
function setPeopleSelected(a) {
    fixOverlay && showQuickAlert("Place size has effect only <b>outside</b> high-res city views", 2E3);
    peopleSelected = a;
    HTML_MENU && ("*" == a ? $("#peoplenrlabel").html("all sizes") : "m" == a ? $("#peoplenrlabel").html("medium") : "s" == a ? $("#peoplenrlabel").html("small") : "t" == a ? $("#peoplenrlabel").html("tiny") : "r" == a ? $("#peoplenrlabel").html("remote") : $("#peoplenrlabel").html(a))
}
function setTripDuration(a) {
    HTML_MENU && ($("#trip_duration").val(a), $("#tripdurationlabel").html(a + " hours"))
}
function setTripMode(a) {
    HTML_MENU && ($("#trip_mode").val(a), "w" == a ? $("#tripmodelabel").html("walk") : $("#tripmodelabel").html("drive"))
}
function peopleUpdate() {
    fixOverlay || topspotsUpdate()
}
function otypeUpdate() {
    fixOverlay || topspotsUpdate()
}
function gtypeUpdate() {
    fixOverlay && cityselectUpdate()
}
function socialselectUpdate() {
    fixOverlay ? cityselectUpdate() : topspotsUpdate()
}
function topspotsUpdate() {
    0 == getTopspotsSelected() ? clearMarkers() : fixOverlay ? startPoiFetch(maps[fixOverlay[0]].wrank, !1, !0) : startPoiFetch(!1, !1, !1)
}
function cityselectUpdate() {
    "hide" == getCityspotsSelected() ? clearMarkers() : fixOverlay ? ($("#otype-dropdown-outer").hide(), startPoiFetch(maps[fixOverlay[0]].wrank, !1, fixOverlay)) : startPoiFetch(!1, !1, !1)
}
function hideDropdown(a) {
    $(a).parent().parent().hide()
}
function showLoading() {
    $("#spinner").show()
}
function hideLoading() {
    smapTimeOutInterval = setInterval(hideLoadingAux, 1E3)
}
function hideLoadingAux() {
    smapTimeOutInterval && clearInterval(smapTimeOutInterval);
    $("#spinner").hide();
    $("#onload_info_outer").hide()
}
function closeInfoBox() {
    null != lastShownBox && lastShownBox.close();
    null != newPoiInfowindow && newPoiInfowindow.close();
    lastShownBox = lastShownMarker = newPoiInfowindow = null;
    closeLastShownMarkers()
}
function showUserItinerary() {
    smap.recommender.isEmptyItinerary(userItinerary) ? showQuickAlert("You have not added any places to the trip yet.") : (listUserItinerary(), $("#trip_modal").modal({}))
}
function closeUserItinerary() {
    $("#itinhints").hide()
}
function showMyPlacesList(a) {
    $("#myplacest").html(a);
    $("#myplaces_modal").modal({})
}
function closeMyPlacesList() {
    $("#myplaces_modal").modal("hide")
}
function closeAllModals() {
    $(".modal").modal("hide")
}
function showTripBar() {
    $("#tripbar").css("display", "block");
    $("#map_wrapper").addClass("pos2");
    $("#tripplan_btn").css("display", "none")
}
function hideTripBar() {
    $("#tripplan_btn").css("display", "inline");
    $("#map_wrapper").removeClass("pos2");
    $("#tripbar").css("display", "none");
    $("#triphints").hide()
}
function showSelectBar() {
    $("#selectbar").css("display", "block");
    $("#map_wrapper").addClass("pos2")
}
function hideSelectBar() {
    $("#map_wrapper").removeClass("pos2");
    $("#selectbar").css("display", "none")
}
function defaultMapClickHandler(a) {
    var b;
    b = a.lat();
    a = a.lng();
    googleMap.getZoom();
    debug("mapclick " + b + " " + a);
    lastShownFreeMarker && (TOUCH || lastShownFreeMarker.infowindow.close(), lastShownFreeMarker.setMap(null));
    lastShownFreePoi && (lastShownPois = lastShownPois.slice(0, -1), lastShownFreePoi = null);
    if (b = getFreeClickPoi(b, a)) a = addMarker(googleMap, b), lastShownFreeMarker = a[1], lastShownFreePoi = b, lastShownPois[lastShownPois.length] = b, TOUCH && MOBILE ? markerInfoboxEventMobile(null, a[1], a[2], googleMap, null) : markerInfoboxEvent(null,
        !0, a[1], a[2], googleMap, null)
}
function getMapLocation(a) {
    mapClickHandler = function (b) {
        setNormalMapState();
        a(b)
    };
    document.body.style.cursor = "pointer";
    googleMap.setOptions({draggableCursor: "crosshair"})
}
function newPoi() {
    newPoiMode = !0;
    getMapLocation(placeNewPoi)
}
function placeNewPoi(a) {
    var b, c;
    newPoiMode && (newPoiMode = !1, null != lastShownMarker && lastShownMarker.infowindow.close(), closeLastShownMarkers(), null != newPoiInfowindow && newPoiInfowindow.close(), b = idnums++, c = [], c.lat = round6(a.lat()), c.lng = round6(a.lng()), b = makeSocialInfoForm(!0, !1, c, b, !1, !1, !1, !1), TOUCH ? (c = {
        content: b,
        position: new google.maps.LatLng(c.lat, c.lng),
        disableAutoPan: !1,
        maxWidth: 800,
        pixelOffset: new google.maps.Size(-60, -50),
        zIndex: 1E3,
        boxStyle: {marginTop: "5px", opacity: 1, width: "205px"},
        closeBoxMargin: "10px 2px 2px 2px",
        closeBoxURL: "",
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: !1,
        pane: "floatPane",
        enableEventPropagation: !1
    }, c = new InfoBox(c), doneIBoxAction = !0, null != lastShownBox && lastShownBox.close(), lastShownBox = c) : newPoiInfowindow = c = new google.maps.InfoWindow({
        content: b,
        maxWidth: 300,
        disableAutoPan: !1
    }), c.setPosition(a), c.open(googleMap))
}
function storeTripStart(a) {
    tripStartLat = round6(a.lat());
    tripStartLng = round6(a.lng());
    $("#newstart_text").hide();
    hideAlert();
    placeStartMarker()
}
function tripPlanStart() {
    tripPlanMode || (doneTripPlanAction = tripPlanMode = !0, showTripBar(), isInViewport(tripStartLat, tripStartLng, googleMap) ? tripPlanStartOld() : smap.recommender.isEmptyItinerary(userItinerary) ? tripPlanStartNewLocation() : showConfirm("You have started a trip that is not currently on screen. Would you like to start a new trip in currently visible area? (this will delete the previous trip)", function () {
        userItinerary = [];
        refreshRoute();
        updateItemCount();
        tripPlanStartNewLocation()
    }, tripPlanStartOld))
}
function tripPlanStartNewLocation() {
    var a = !1;
    isInViewport(userLat, userLng, googleMap) ? (tripStartLat = userLat, tripStartLng = userLng, placeStartMarker()) : (getMapLocation(storeTripStart), a = !0);
    showTripPlanHints(a)
}
function tripPlanStartOld() {
    showStartMarker();
    refreshRoute();
    updateItemCount();
    showTripPlanHints(!1)
}
function tripPlanClose() {
    tripPlanMode = !1;
    hideAlert();
    hideConfirm();
    hideTripBar();
    hideRoute();
    hideStartMarker();
    setNormalMapState();
    $("#planhints").hide()
}
function showTripPlanHints(a) {
    hideTripPlanHints ? a && showQuickAlert("Click on the map with the CROSSHAIR cursor to select the starting spot for the new trip.", 1E4) : (a ? $("#newstart_text").show() : $("#newstart_text").hide(), $("#planhints").fadeIn())
}
function tripDurationUpdate() {
}
function showAlert(a, b) {
    $("#alertbar_text").html(a);
    $("#alertbar").fadeIn();
    isNaN(1 * b) && (b = 1500);
    $("#alertbar").css("z-index", b)
}
function hideAlert() {
    $("#alertbar").hide()
}
function showQuickAlert(a, b) {
    isNaN(1 * b) && (b = 1600);
    smapTimeOutInterval && clearInterval(smapTimeOutInterval);
    $("#alertbar_text").html(a);
    $("#alertbar").fadeIn();
    smapTimeOutInterval = setInterval(function () {
        smapTimeOutAlert()
    }, b)
}
function smapTimeOutAlert() {
    $("#alertbar").fadeOut();
    smapTimeOutInterval && clearInterval(smapTimeOutInterval);
    smapTimeOutInterval = null
}
function showError(a) {
    $("#alertbar").hide();
    $("#errorbar_text").html(a);
    $("#errorbar").fadeIn()
}
function hideError() {
    $("#errorbar").hide()
}
function showNote(a) {
    $("#notebar_text").html(a);
    $("#notebar").fadeIn()
}
function hideNote() {
    $("#notebar").hide()
}
function confirmBtnHandler(a, b, c) {
    $(a).blur();
    hideConfirm();
    b.preventDefault();
    c && c()
}
function showConfirm(a, b, c, h) {
    $("#confirmbar_text").html(a);
    $("#confirmok").on("click.confirmhnd", function (a) {
        confirmBtnHandler(this, a, b)
    });
    $("#confirmcancel").on("click.confirmhnd", function (a) {
        confirmBtnHandler(this, a, c)
    });
    $("#confirmbar").fadeIn();
    isNaN(1 * h) && (h = 1500);
    $("#confirmbar").css("z-index", h)
}
function hideConfirm() {
    $("#confirmbar").hide();
    $("#confirmbar button").off(".confirmhnd")
}
function showInitialAlert(a) {
    var b;
    b = "<div style='text-align: left'><b>Tips:</b> <p><ul><li>Hotness of a spot indicates the nr of photos taken there.</li><li>Click on hot spots to explore the place.</li>";
    b += "<li>Zoom deeper to see more: down to street level</li>";
    b += "<li>Markers show the hottest places on the map: lighter markers are hotter.</li>";
    b = TOUCH ? b + "<li>Click on a marker to see the details.</li>" : b + "<li>Hover on a marker to see the details.</li>";
    b += "<li><b><a href='#' style='text-decoration: underline' onclick='$(\"#alertbar\").hide(); moreTips();'>Get more tips</a></b></li></ul></div>";
    inialertTimeOutInterval && clearInterval(inialertTimeOutInterval);
    if (a || !shownInitialAlert && (!doneZoomAction || !doneIBoxAction || !doneFreeclickAction) && !doneTripPlanAction && "mymap" != getSocialSelected() && "shared" != getSocialSelected()) shownInitialAlert = !0, $("#alertbar_text").html(b), $("#alertbar").fadeIn(), smapTimeOutInterval = setInterval(function () {
        iniTimeOutAlert()
    }, 3E4)
}
function iniTimeOutAlert() {
    clearInterval(smapTimeOutInterval);
    $("#alertbar").fadeOut();
    smapTimeOutInterval = null
}
function moreTips() {
    var a;
    a = MOBILE ? "<div style='text-align: left'><ul>" : "<div style='text-align: left'><b>More tips:</b> <p><ul>";
    a += "<li>Zoom to street level to see all the photos: click for the larger versions.</li><li>Click on the marker infobox icons to learn more about the place.</li>";
    a += "<li>Click on the marker infobox photo to see more and larger photos.</li>";
    MOBILE ? (a += "<li>Use the <b>places</b> menu to find less crowded and special spots and save your own places.</li>", a += "<li>Use the <b>share</b> button in place menu to show the cool places you found.</li>",
        a += "<li><b><a class='btn-link' style='text-decoration: underline' onclick=\"javascript: $('#help').show();\"  ") : (a += "<li>The <b>world rank nr</b> is the absolute worldwide popularity rank of a place.</li>", a += "<li>The <b>visible area nr</b> is the relative popularity rank in a currently visible map area.</li>", a += "<li>Use the <b>places</b> menu to find less crowded and special spots and save your own places.</li>", a += "<li>Use the <b>trip plan</b> menu to get help while planning a trip.</li>", a +=
        "<li>Use the <b>share</b> button to show the cool places you found or rated and the trip you built.</li>", a += "<li><b><a href='#' class='btn-link' style='text-decoration: underline' href='#help_modal' data-target='#help_modal' data-toggle='modal' ");
    a += " >Read more about sightsmap</a></b></li></ul><p></div>";
    showQuickAlert(a, 3E4)
}
function gSearch(a) {
    var b, c, h, j, k;
    b = a ? a : $("#searchfield").val();
    debug("search name: " + b);
    b ? (j = localSearch(b), -1 < j ? (debug("local find city " + j), DO_INITIAL_SEARCH = !1, a = topCities[j][0], j = topCities[j][1], k = new google.maps.LatLng(a, j), DO_INITIAL_SEARCH && hideLoadingAux(), cityAutozoom(a, j, k, !0)) : (a = {address: b}, 3 < googleMap.getZoom() && (a.bounds = googleMap.getBounds()), googleGeocoder.geocode(a, function (a, j) {
        j == google.maps.GeocoderStatus.OK ? (c = a[0].geometry, c.viewport ? (h = c.viewport, debug("result viewport: " +
            h + " " + (h.getNorthEast().lat() - h.getSouthWest().lat()) + " " + (h.getNorthEast().lng() - h.getSouthWest().lng())), latw = h.getNorthEast().lat() - h.getSouthWest().lat(), lngw = h.getNorthEast().lng() - h.getSouthWest().lng(), (0.3 > latw || 0.6 > lngw) && 0.035 < latw && 0.07 < lngw ? (googleMap.setCenter(c.location), googleMap.setZoom(13)) : 12 > latw && 22 > lngw && 4 < latw && 8 < lngw ? (googleMap.setCenter(c.location), googleMap.setZoom(7)) : googleMap.fitBounds(c.viewport)) : debug("No viewport returned"), DO_INITIAL_SEARCH = !1) : (DO_INITIAL_SEARCH &&
        (nolocInit(), hideLoadingAux()), DO_INITIAL_SEARCH = !1, "ZERO_RESULTS" == j ? showQuickAlert("No results found for " + sanitizeTxt(b, 30)) : showQuickAlert("Place search was not successful: " + j))
    }))) : showQuickAlert("Please enter search text")
}
function localSearch(a) {
    var b, c, a = a.toLowerCase(), a = a.replace(" ", ""), a = a.replace("_", ""), a = a.replace("/", "");
    for (b = 0; b < topCities.length; b++)if (c = topCities[b][2].toLowerCase(), c = c.replace(" ", ""), c === a || 3 < topCities[b].length && (c = topCities[b][3].toLowerCase(), c = c.replace(" ", ""), c === a))return b;
    return -1
}
function showPhotos(a, b, c, h, j) {
    var k, m, q, r, n, u, t, w;
    bigPhotoLat = a;
    bigPhotoLng = b;
    bigPhotoWrank = c;
    $("#strview").hide();
    $("#strviewclose").hide();
    setStreetMapPhotosSizes(!1);
    isNaN(1 * j) && (j = 1100);
    $("#bigphotos").css("z-index", j);
    MOBILE || $("#bigphotosclose").css("z-index", j);
    j = googleMap.getZoom();
    u = googleMap.getBounds();
    t = Math.abs(u.getNorthEast().lat() - u.getSouthWest().lat());
    u = Math.abs(u.getNorthEast().lng() - u.getSouthWest().lng());
    k = 0.02;
    m = 0.06;
    11 > j && (c || 0 === c) && 90 > c ? (k = 0.05, m = 0.1) : 9 > j && c ? (k = 0.02, m =
        0.06) : 9 > j ? (k = t / 100, m = u / 200) : 9 <= j && 13 > j ? (k = t / 70, m = u / 140) : 13 <= j && (k = 0.002, m = 0.004);
    n = photoIter = 0;
    r = Math.pow(2, photoIter);
    h && (initialBigPhoto = h, lastBigPhoto = null, c = "<img src='" + MEDIUMPHOTOPREFIX + h + ".jpg' id='bigPhotoImg' onerror='nextPhotoClick()' style='position: absolute; background-color: black; display: block; margin-left: auto;   margin-right: auto; visibility: visible;  clip: rect(0 499px 378px 0);'>", $("#bigphotos_cover").html(c), $("#bigphotos_cover").show(), MOBILE ? showPhotoWidget(!0, !0) : showPhotoWidget(!1,
        !0));
    photoWidget ? (h && photoWidget.setRequest(null), panoramio.events.unlistenByKey(photoWidgetChangedListener), c = !1) : (c = !0, photoOptions.disableDefaultEvents = [panoramio.events.EventType.PHOTO_CLICKED], MOBILE && (photoOptions = {
        width: 320,
        height: 320
    }), photoWidget = new panoramio.PhotoWidget("bigphotos_inner", null, photoOptions), panoramio.events.listen(photoWidget, panoramio.events.EventType.PHOTO_CLICKED, function (a) {
        onListPhotoClicked(a)
    }), photoWidget.enablePreviousArrow(!1), photoWidget.enableNextArrow(!1));
    if (!h) {
        try {
            var A = new panoramio.PhotoRequest({rect: {sw: {lat: a - k, lng: b - m}, ne: {lat: a + k, lng: b + m}}})
        } catch (N) {
            showQuickAlert("Cannot show photos for this place");
            return
        }
        photoWidgetChangedListener = panoramio.events.listen(photoWidget, panoramio.events.EventType.PHOTO_CHANGED, function (c) {
            if (photoWidget)if (initialBigPhoto && (initialBigPhoto = null, $("#bigphotos_cover").fadeOut({duration: 1E3})), q = photoWidget.getPhoto(), debug("photoIter " + photoIter + " changed " + c + "end " + photoWidget.getAtEnd() + " start " + photoWidget.getAtStart() +
                    "got photo " + q + " nr " + photoWidget.getPosition()), null !== q) n++, w = photoWidget.getPhoto().getPhotoUrl(), debug("url : " + w + " lastBigPhoto " + lastBigPhoto), -1 < photoWidget.getPhoto().getPhotoUrl().indexOf(lastBigPhoto) && (debug("found old photo"), photoWidget.setPosition(photoWidget.getPosition() + 1)); else if (0 <= photoIter) 0 == n ? ($("#bigphotos").hide(), $("#bigphotosclose").hide(), photoWidget = null, showQuickAlert("No photos found nearby")) : showQuickAlert("No more photos nearby"); else {
                photoIter++;
                r = Math.pow(2, photoIter);
                debug("photoWidget iteration " + photoIter + " latdf*mult" + k * r + " lngdf*mult " + m * r);
                try {
                    var h = new panoramio.PhotoRequest({
                        rect: {
                            sw: {lat: a - k * r, lng: b - m * r},
                            ne: {lat: a + k * r, lng: b + m * r}
                        }, set: panoramio.PhotoSet.ALL
                    })
                } catch (j) {
                    debug("err " + j)
                }
                0 < n && showQuickAlert("Looking at a wider area");
                photoWidget.setRequest(h);
                photoWidget.setPosition(0)
            }
        });
        photoWidget.setRequest(A);
        INITIAL_MARKER_SHOW && 1 == INITIAL_PHOTOITER ? photoWidget.setPosition(INITIAL_BIGPHOTONR) : photoWidget.setPosition(0);
        c && showPhotoWidget(!1, !0)
    }
}
function showOnePhoto(a) {
    var b;
    debug("showOnePhoto called: " + a.photoId + " " + a.author + " " + a.userId);
    $("#strview").hide();
    $("#strviewclose").hide();
    $("#bigphotos_inner").hide();
    setStreetMapPhotosSizes(!1);
    initialBigPhoto = a.photoId;
    lastBigPhoto = null;
    cps = "<img src='" + MEDIUMPHOTOPREFIX + a.photoId + ".jpg' id='bigPhotoImg' onerror=\"showQuickAlert('Photo not available'); $('#bigphotos').hide(); $('#bigphotosclose').hide(); \" photoWidget=null;' style='position: absolute; background-color: black; display: block; margin-left: auto;  margin-right: auto; visibility: visible; clip: rect(0 500px 378px 0); ' />";
    b = a.title ? 50 < a.title.length ? a.title.substr(0, 50) + "..." : a.title : "";
    b += " by <a class='panophototitle' href='" + PANORAMIOUSERPREFIX + a.userId + "' target='wiki'>" + a.author + "</a>";
    $("#bigPhotoImg").hide(cps);
    $("#bigphotos_cover").html(cps);
    $("#bigphotos_author").html(b);
    $("#bigphotos_cover").show();
    showPhotoWidget(!0, !1)
}
function showPhotoWidget(a, b) {
    debug("showPhotoWidget " + a + " " + b);
    $("#bigphotos").show();
    a ? ($("#bigphotos_inner").hide(), $("#bigphotos_tos").show(), b ? $("#bigphotos_author").hide() : $("#bigphotos_author").show(), !MOBILE && b ? $("#bigphotosclose").css("left", "20px") : MOBILE || $("#bigphotosclose").css("left", "210px"), MOBILE && a && b ? ($("#prevphotoarrow").show(), $("#nextphotoarrow").show()) : ($("#prevphotoarrow").hide(), $("#nextphotoarrow").hide())) : ($("#bigphotos_inner").show(), $("#bigphotos_tos").hide(), $("#bigphotos_author").hide(),
    MOBILE || $("#bigphotosclose").css("left", "160px"), $("#prevphotoarrow").show(), $("#nextphotoarrow").show());
    $("#bigphotos").css("box-shadow", "2px 2px 2px 2px #333");
    $("#bigphotos").css("-webkit-box-shadow", "2px 2px 2px 2px #333");
    $("#bigphotos").css("-moz-box-shadow", "2px 2px 2px 2px #333");
    $("#bigphotosclose").css("visibility", "visible");
    $("#bigphotosclose").show()
}
function showPhotoWidget_old(a, b) {
    debug("showPhotoWidget " + a + " " + b);
    $("#bigphotos").show();
    a ? ($("#bigphotos_inner").hide(), $("#bigphotos_tos").show(), b ? $("#bigphotos_author").hide() : $("#bigphotos_author").show(), MOBILE && b ? $("#bigphotosclose").css("left", "20px") : MOBILE && !b ? $("#bigphotosclose").css("left", "70px") : $("#bigphotosclose").css("left", "210px"), MOBILE && a && b ? ($("#prevphotoarrow").show(), $("#nextphotoarrow").show()) : ($("#prevphotoarrow").hide(), $("#nextphotoarrow").hide())) : ($("#bigphotos_inner").show(),
        $("#bigphotos_tos").hide(), $("#bigphotos_author").hide(), MOBILE ? $("#bigphotosclose").css("left", "20px") : $("#bigphotosclose").css("left", "160px"), $("#prevphotoarrow").show(), $("#nextphotoarrow").show());
    $("#bigphotos").css("box-shadow", "2px 2px 2px 2px #333");
    $("#bigphotos").css("-webkit-box-shadow", "2px 2px 2px 2px #333");
    $("#bigphotos").css("-moz-box-shadow", "2px 2px 2px 2px #333");
    $("#bigphotosclose").css("visibility", "visible");
    $("#bigphotosclose").show()
}
function onListPhotoClicked(a) {
    initialBigPhoto ? window.open(PANORAMIOPREFIX + initialBigPhoto, "wiki") : (a = a.getPosition(), null !== a && photoDetails())
}
function photoDetails() {
    initialBigPhoto ? window.open(PANORAMIOPREFIX + initialBigPhoto, "wiki") : window.open(photoWidget.getPhoto().getPhotoUrl(), "wiki")
}
function nextPhotoClick() {
    initialBigPhoto ? (lastBigPhoto = initialBigPhoto, MOBILE && $("#bigphotos_cover").hide(), showPhotos(bigPhotoLat, bigPhotoLng, bigPhotoWrank, null, $("#bigphotos").css("z-index"))) : photoWidget.setPosition(photoWidget.getPosition() + 1)
}
function showStreetmap(a, b) {
    $("#bigphotos").hide();
    $("#bigphotosclose").hide();
    photoWidget = null;
    googleMap.getZoom();
    svHead = DEFAULT_POVHEAD;
    svPitch = DEFAULT_POVPITCH;
    svZoom = DEFAULT_POVZOOM;
    panoramaSv || (panoramaSv = new google.maps.StreetViewService);
    INITIAL_MARKER_SHOW ? (svLat = INITIAL_STREETVIEW_LAT, svLng = INITIAL_STREETVIEW_LNG, initialProcessSv = !0, debug("SV LOC and large: " + svLat + " " + svLng + " " + INITIAL_STREETVIEW_LARGE), INITIAL_STREETVIEW_LARGE ? largeStreetview() : panoramaSv.getPanoramaByLocation(new google.maps.LatLng(svLat,
        svLng), 1, processSVData)) : (svLat = a, svLng = b, panoramaSv.getPanoramaByLocation(new google.maps.LatLng(a, b), 1E3, processSVData))
}
function processSVData(a, b) {
    b == google.maps.StreetViewStatus.OK ? ($("#strview").show(), $("#strview").css("box-shadow", "2px 2px 2px 2px #333"), $("#strview").css("-webkit-box-shadow", "2px 2px 2px 2px #333"), $("#strview").css("-moz-box-shadow", "2px 2px 2px 2px #333"), $("#bigphotosclose").css("visibility", "visible"), $("#strviewclose").css("visibility", "visible"), $("#strviewclose").show(), panorama || (panorama = new google.maps.StreetViewPanorama(document.getElementById("strview"))), panorama.setPano(a.location.pano),
        initialProcessSv ? (debug("POV: " + INITIAL_STREETVIEW_POVHEAD + " " + INITIAL_STREETVIEW_POVPITCH + " " + INITIAL_STREETVIEW_POVZOOM), panorama.setPov({
            heading: INITIAL_STREETVIEW_POVHEAD,
            pitch: INITIAL_STREETVIEW_POVPITCH,
            zoom: INITIAL_STREETVIEW_POVZOOM
        }), initialProcessSv = !1) : panorama.setPov({
            heading: svHead,
            pitch: svPitch,
            zoom: svZoom
        }), panorama.setVisible(!0)) : ($("#strview").hide(), $("#strviewclose").hide(), showQuickAlert("No streetviews found for this place"))
}
function changeStreetviewSize() {
    "40px" == $("#strview").css("top") ? smallStreetview() : largeStreetview()
}
function largeStreetview() {
    var a;
    largeSv = !0;
    a = window.innerHeight;
    $("#strview").css("top", "40px");
    $("#strview").css("left", "0px");
    $("#strview").css("width", "100%");
    $("#strview").css("height", a - 40 + "px");
    $("#strviewclose").css("top", "120px");
    $("#strviewclose").css("left", "97px");
    $("#largestrviewbtn").html("small streetview");
    debug("large " + panorama);
    panorama ? (a = panorama.getPosition(), svLat = a.lat(), svLng = a.lng(), a = panorama.getPov(), svHead = a.heading, svPitch = a.pitch, svZoom = a.zoom, debug("large " + svLat + " " +
        svLng + " " + INITIAL_MARKER_SHOW)) : panorama = new google.maps.StreetViewPanorama(document.getElementById("strview"));
    INITIAL_MARKER_SHOW && debug("largeStreetview INITIAL: " + svLat + " " + svLng);
    panoramaSv.getPanoramaByLocation(new google.maps.LatLng(svLat, svLng), 1, processSVData)
}
function smallStreetview() {
    var a;
    largeSv = !1;
    MOBILE ? ($("#strview").css("top", "80px"), $("#strview").css("left", "5px"), $("#strviewclose").css("left", "5px")) : ($("#strview").css("top", "100px"), $("#strview").css("left", "70px"), $("#strviewclose").css("left", "185px"));
    $("#strview").css("width", "500px");
    setStreetMapPhotosSizes(!0);
    $("#largestrviewbtn").html("large streetview");
    debug("small " + panorama);
    panorama ? (a = panorama.getPosition(), svLat = a.lat(), svLng = a.lng(), a = panorama.getPov(), svHead = a.heading, svPitch =
        a.pitch, svZoom = a.zoom, debug("small " + svLat + " " + svLng + " " + INITIAL_MARKER_SHOW)) : panorama = new google.maps.StreetViewPanorama(document.getElementById("strview"));
    panoramaSv.getPanoramaByLocation(new google.maps.LatLng(svLat, svLng), 1, processSVData)
}
function initStreetMapPhotos() {
    $("#bigphotos").hide();
    $("#bigphotosclose").hide();
    $("#strview").hide();
    $("#strviewclose").hide();
    setStreetMapPhotosSizes(!1)
}
function setStreetMapPhotosSizes(a) {
    var b = window.innerHeight;
    if (MOBILE) $("#bigphotos").css("height", 320), $("#strview").css("height", 320), $("#strviewclose").css("top", 45), photoOptions.height = 400; else if (550 < b && (a || 300 >= photoOptions.height)) $("#bigphotos").css("height", 400), $("#bigphotosclose").css("top", 520), $("#strview").css("height", 400), $("#strviewclose").css("top", 520), photoOptions.height = 400; else if (550 >= b && (a || 300 < photoOptions.height)) $("#bigphotos").css("height", 300), $("#bigphotosclose").css("top",
        400), $("#strview").css("height", 300), $("#strviewclose").css("top", 400), photoOptions.height = 280;
    photoWidget = null
}
function setFilterTypeWord(a) {
    var b, c;
    if (a)if (filterTypeWord = a, filterTypeList = [], revCategories[a]) {
        a = revCategories[a];
        debug("wl: " + a);
        for (b = 0; b < a.length; b++)(c = encodeTag(a[b])) && filterTypeList.push(c)
    } else if (c = encodeTag(a)) filterTypeList.push(c); else return $("#typefield").val(""), filterTypeList = filterTypeWord = !1; else return filterTypeList = filterTypeWord = !1;
    return !0
}
function tagCloud(a) {
    var b, c, a = decodeTags(a);
    b = [];
    for (var h = 0; h < a.length; h++)c = a[h][1], 50 < a[0][1] ? c /= 5 : 30 < a[0][1] ? c /= 3 : 20 < a[0][1] && (c /= 2), 12 < c && (c = 12), c = 12 + 3 * c, c = {
        text: a[h][0],
        size: c
    }, b.push(c);
    $("#tagview").show();
    $("#tagview").css("background-color", "#333333");
    $("#tagview").css("opacity", 0.9);
    $("#tagviewclose").show();
    tagFill = d3.scale.category20();
    d3.layout.cloud().size([300, 300]).words(b).rotate(function () {
        return 0.5 < Math.random() ? ~~(2 * Math.random()) * 45 * Math.random() : ~~(2 * Math.random()) * -45 * Math.random()
    }).font("Impact").fontSize(function (a) {
        return a.size
    }).on("end",
        tagDraw).start()
}
function hideTagCloud() {
    $("#tagSvg").remove();
    $("#tagview").hide();
    $("#tagviewclose").hide()
}
function tagDraw(a) {
    $("#tagSvg").remove();
    d3.select("#tagview").append("svg").attr("width", 300).attr("height", 300).attr("id", "tagSvg").append("g").attr("transform", "translate(150,150)").selectAll("text").data(a).enter().append("text").style("font-size", function (a) {
        return a.size + "px"
    }).style("font-family", "Impact").style("fill", function (a, c) {
        return tagFill(c)
    }).attr("text-anchor", "middle").attr("transform", function (a) {
        return "translate(" + [a.x, a.y] + ")rotate(" + a.rotate + ")"
    }).text(function (a) {
        return a.text
    })
}
function setupTypeAutocomplete() {
    $("#typefield").typeahead({
        source: uiTagList, matcher: function (a) {
            var b;
            b = this.query.trim().toLowerCase();
            "view" == a && (tmpGenMatch = tmpTypeMatch = !1);
            return "A" <= a.charAt(0) && "Z" >= a.charAt(0) && tmpTypeMatch && tagCategories[tmpTypeMatch] && a == tagCategories[tmpTypeMatch] ? (tmpGenMatch = a, !0) : "A" <= a.charAt(0) && "Z" >= a.charAt(0) && tmpGenMatch && tagCategories[tmpGenMatch] && a == tagCategories[tmpGenMatch] ? !0 : "A" <= a.charAt(0) && "Z" >= a.charAt(0) ? !1 : 0 == a.indexOf(b) ? (tmpTypeMatch || (tmpTypeMatch =
                a), !0) : !1
        }, updater: function (a) {
            tmpGenMatch = tmpTypeMatch = !1;
            if (setFilterTypeWord(a))return topspotsUpdate(), a;
            $("#typefield").val("");
            return ""
        }, highlighter: function (a) {
            return "A" <= a.charAt(0) && "Z" >= a.charAt(0) ? "<b>" + a + "</b>" : a
        }
    })
}
function openShare(a) {
    a = makePlaceUrl(a);
    $("#share_url").val(a);
    $("#share_tiny_url").html("");
    $("#share_try").attr("href", a);
    $("#share_modal").modal()
}
function myTitleShare() {
    var a, b, c;
    a = makePlaceUrl();
    b = $("#mytitle").val();
    c = $("#mynote").val();
    b && (a += "&t=" + encodeURIComponent(b));
    c && (a += "&n=" + encodeURIComponent(c));
    $("#share_url").val(a);
    $("#share_tiny_url").html("");
    $("#share_try").attr("href", a)
}
function makeTinyUrl() {
    var a;
    a = $("#share_url").val();
    $("#share_tiny_url").html("");
    a = "http://is.gd/create.php?format=json&callback=tinyCallback&url=" + encodeURIComponent(a);
    $.ajax({
        type: "GET",
        url: a,
        dataType: "script",
        cache: !1,
        crossDomain: !0,
        timeout: WORLDJSTIMEOUT,
        error: function () {
            showQuickAlert("Cannot create a tiny url")
        }
    });
    $("#share_tiny_url").html(void 0)
}
function tinyCallback(a) {
    $("#share_tiny_url").html(a.shorturl)
}
function fbShare(a) {
    var b = $("#share_url").val(), c = $("#mytitle").val(), h = $("#mynote").val();
    if (!b || a) b = "http://www.sightsmap.com", USER_QUERY && (b += "/" + USER_QUERY.substring(7).replace(" ", "_"));
    c = sanitizeTxt(c, 20);
    (h = sanitizeTxt(h, 200)) || (h = "Discover and share beautiful places");
    FB.ui({
        method: "feed",
        display: "popup",
        name: c ? c + " Sightsmap" : "Sightsmap",
        link: b,
        picture: "http://wpng.sightsmap.netdna-cdn.com/sm_90_90.png",
        caption: "www.sightsmap.com",
        description: h
    }, function (a) {
        a && a.post_id && showQuickAlert("Your post was published.")
    })
}
function gplusShare(a) {
    var b = "https://plus.google.com/share?url=", c = $("#share_url").val();
    if (!c || a) c = "http://www.sightsmap.com", USER_QUERY && (c += "/" + USER_QUERY.substring(7).replace(" ", "_"));
    b += encodeURIComponent(c);
    debug(b);
    window.open(b, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600")
}
function twitterShare(a) {
    var b = "https://twitter.com/share?url=", c = $("#share_url").val();
    if (!c || a) c = "http://www.sightsmap.com", USER_QUERY && (c += "/" + USER_QUERY.substring(7).replace(" ", "_"));
    b += encodeURIComponent(c);
    debug(b);
    window.open(b, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600")
}
function pinterestShare() {
    var a, b = "http://pinterest.com/pin/create/button/?url=";
    (a = $("#share_url").val()) || (a = "http://www.sightsmap.com");
    b += encodeURIComponent(a);
    a = "&media=" + encodeURIComponent("http://wpng.sightsmap.netdna-cdn.com/sm_496_496.png");
    b += a;
    a = $("#mytitle").val() ? "&description=" + encodeURIComponent($("#mytitle").val() + " sightsmap") : $("#mynote").val() ? "&description=" + encodeURIComponent($("#mynote").val()) : "&description=" + encodeURIComponent("Sightsmap");
    b += a;
    debug(b);
    window.open(b, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600")
}
function openExtUrl(a) {
    window.open(a, "wiki")
}
function d(a) {
    var b, c;
    if (!this.length)return this;
    b = this[0];
    b.ownerDocument ? c = b.ownerDocument : (c = b, b = c.documentElement);
    if (null == a) {
        if (!c.cancelFullScreen && !c.webkitCancelFullScreen && !c.mozCancelFullScreen)return null;
        a = !!c.fullScreen || !!c.webkitIsFullScreen || !!c.mozFullScreen;
        return !a ? a : c.fullScreenElement || c.webkitCurrentFullScreenElement || c.mozFullScreenElement || a
    }
    a ? (a = b.requestFullScreen || b.webkitRequestFullScreen || b.mozRequestFullScreen) && a.call(b) : (a = c.cancelFullScreen || c.webkitCancelFullScreen ||
            c.mozCancelFullScreen) && a.call(c);
    return this
}
jQuery.fn.fullScreen = d;
jQuery.fn.toggleFullScreen = function () {
    return d.call(this, !d.call(this))
};
var e, f, g;
e = document;
e.webkitCancelFullScreen ? (f = "webkitfullscreenchange", g = "webkitfullscreenerror") : e.mozCancelFullScreen ? (f = "mozfullscreenchange", g = "mozfullscreenerror") : (f = "fullscreenchange", g = "fullscreenerror");
jQuery(document).bind(f, function () {
    jQuery(document).trigger(new jQuery.Event("fullscreenchange"))
});
jQuery(document).bind(g, function () {
    jQuery(document).trigger(new jQuery.Event("fullscreenerror"))
});
jQuery.fn.sortElements = function () {
    var a = [].sort;
    return function (b, c) {
        var c = c || function () {
                return this
            }, h = this.map(function () {
            var a = c.call(this), b = a.parentNode, h = b.insertBefore(document.createTextNode(""), a.nextSibling);
            return function () {
                if (b === this)throw Error("You can't sort elements if any one is a descendant of another.");
                b.insertBefore(this, h);
                b.removeChild(h)
            }
        });
        return a.call(this, b).each(function (a) {
            h[a].call(c.call(this))
        })
    }
}();
function contains(a, b) {
    if (!a)return !1;
    for (var c = 0; c < a.length; c++)if (a[c] === b)return !0;
    return !1
}
function arrassoc(a, b) {
    var c, h = b.length;
    for (c = 0; c < h; c++)if (b[c][0] == a)return b[c][1];
    return !1
}
function round6(a) {
    return Math.round(1E6 * a) / 1E6
}
function sameCoord(a, b, c, h) {
    return 1E-6 > Math.abs(a - c) && 1E-6 > Math.abs(b - h)
}
function samePOI(a, b) {
    return a === b ? !0 : sameCoord(a.lat, a.lng, b.lat, b.lng) ? !0 : !1
}
function similarNames(a, b, c) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a.length < b.length) {
        if (0 === b.indexOf(a))return !0
    } else if (0 === a.indexOf(b))return !0;
    return string_similarity(a, b) > c ? !0 : !1
}
function get_bigrams(a) {
    var b = Array(a.length - 1);
    for (i = 0; i < b.length; i++)b[i] = a.slice(i, i + 2);
    return b
}
function string_similarity(a, b) {
    var c = get_bigrams(a), h = get_bigrams(b), j = c.length + h.length, k = 0;
    for (x in c)for (y in h)c[x] == h[y] && k++;
    return 2 * k / j
}
function sanitizeTxt(a, b) {
    a = $.trim(a);
    if ("" == a)return "";
    a = a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    a = a.replace(/"/g, "&quot;").replace(/'/g, "&quot;").replace(/(\r\n|\n|\r)/gm, " ");
    return a = a.substring(0, b)
}
function getFloatParam(a, b) {
    var c;
    try {
        if (c = parseFloat($("#" + a).val()), isNaN(c))throw"isNaN";
    } catch (h) {
        c = b
    }
    return c
}
function isInViewport(a, b, c) {
    return null === a || null === b ? !1 : c.getBounds().contains(new google.maps.LatLng(a, b))
}
function setNormalMapState() {
    googleMap.setOptions({draggableCursor: null});
    mapClickHandler = defaultMapClickHandler
}
function debugPoi(a, b) {
    var c = "";
    if (a || 0 === a) c += a + " ";
    c = b ? c + debugPoiAux(b) : c + "none";
    debug(c)
}
function debugPoiAux(a) {
    var b, c;
    if (!a)return "";
    c = "" + a.name;
    a.lat && (c += " lat:" + a.lat);
    a.lng && (c += " lng:" + a.lng);
    a.zoom && (c += " zoom:" + a.zoom);
    a.orig && (c += " orig:" + a.orig);
    a.uid && (c += " uid:" + a.uid);
    a.utype && (c += " utype:" + a.utype);
    a.tcrank && (c += " tcrank:" + a.tcrank);
    if (a.wpi || 0 === a.wpi) c += " wpi:" + a.wpi;
    if (a.tpi || 0 === a.wpi) c += " tpi:" + a.tpi;
    a.wp && (c += " wp:" + a.wp);
    a.fs && (c += " fs:+");
    a.fstype && (c += " fstype:" + a.fstype);
    a.fsgtype && (c += " fsgtype:" + a.fsgtype);
    a.fnear && (c += " fnear:" + a.fnear);
    a.inhabit && (c += " inhabit:" +
        a.inhabit);
    a.gplace && (c += " gplace:+");
    a.sid && (c += " sid:" + a.sid);
    a.rank && (c += " rank:" + a.rank);
    a.gpop && (c += " gpop:" + a.gpop);
    a.wpop && (c += " wpop:" + a.wpop);
    a.ppop && (c += " ppop:" + a.ppop);
    a.fsu && (c += " fsu:" + a.fsu);
    a.googlerank && (c += " googlerank:" + a.googlerank);
    if (a.rpop || 0 === a.rpop) c += " rpop:" + a.rpop;
    if (a.rtime || 0 === a.rtime) c += " rtime:" + a.rtime;
    a.desc && (c += " desc:" + a.desc);
    if (a.users && 0 < a.users.length) {
        c += " users:[";
        for (b = 0; b < a.users.length; b++)c += "{ ", c += debugPoiAux(a.users[b]), c += " }";
        c += "]"
    }
    return c
}
function debug() {
}
function sdebug() {
};function loadTopcities() {
    topCities = [[40.76, -73.98, "New York City", "New York"], [41.9, 12.48, "Rome"], [41.38, 2.18, "Barcelona"], [48.88, 2.34, "Paris"], [41.02, 28.98, "Istanbul"], [45.44, 12.34, "Venice"], [43.74, 7.42, "Monte Carlo"], [43.76, 11.26, "Florence"], [-34.6, -58.38, "Buenos Aires"], [47.5, 19.04, "Budapest"], [50.08, 14.42, "Prague"], [40.42, -3.7, "Madrid"], [43.08, -79.08, "Niagara Falls", "Niagara"], [-33.86, 151.22, "Sydney"], [51.5, -0.12, "London"], [29.98, 31.14, "Great Pyramid of Giza", "Pyramid"], [41.88, -87.62, "Chicago"],
        [31.24, 121.48, "Shanghai"], [39.9, 116.4, "Beijing"], [37.8, -122.4, "San Francisco"], [23.14, -82.36, "Havana"], [43.72, 10.4, "Pisa"], [38.72, -9.14, "Lisbon"], [22.28, 114.16, "Kowloon"], [38.88, -77.04, "Washington, D.C.", "Washington"], [36.12, -115.18, "Las Vegas Strip", "Las Vegas"], [48.14, 11.58, "Munich"], [45.44, 11, "Verona"], [43.64, -79.38, "Greater Toronto Area", "Toronto"], [47.56, 10.74, "Neuschwanstein Castle", "Neuschwanstein"], [48.2, 16.38, "Vienna"], [47.8, 13.04, "Salzburg"], [37.18, -3.6, "Granada"], [48.8, 2.12, "Palace of Versailles",
            "Versailles"], [37.98, 23.74, "Athens"], [35.68, 139.76, "Tokyo"], [48.14, 17.1, "Bratislava"], [-23.54, -46.64, "S\u00e3o Paulo"], [39.86, -4.02, "Toledo, Spain", "Toledo"], [52.52, 13.38, "Berlin"], [19.44, -99.14, "Mexico City"], [41.14, -8.62, "Porto"], [43.7, 7.28, "Nice"], [52.36, 4.88, "Amsterdam"], [42.36, -71.06, "Boston"], [36.46, 25.38, "Fira"], [43.32, -1.98, "San Sebasti\u00e1n"], [39.46, -0.36, "Valencia, Spain", "Valencia"], [53.34, -6.26, "Dublin"], [37.38, -5.98, "Andalusia"], [-22.96, -43.22, "Ipanema"], [-37.82, 144.96, "Melbourne"],
        [-25.68, -54.44, "Iguazu Falls", "Iguazu"], [50.94, 6.96, "Cologne"], [13.76, 100.5, "Bangkok"], [36.54, 32, "Alanya"], [45.46, 9.18, "Milan"], [37.88, -4.78, "C\u00f3rdoba, Spain", "Cordoba"], [45.08, 13.64, "Rovinj"], [37.92, 29.12, "Pamukkale"], [25.7, 32.64, "Valley of the Kings"], [1.28, 103.86, "Singapore"], [55.68, 12.6, "Copenhagen"], [43.26, -2.94, "Bilbao"], [50.84, 4.36, "Brussels"], [35, 135.78, "Kyoto"], [25.14, 55.18, "Palm Islands"], [36.72, -4.42, "M\u00e1laga"], [35.9, 14.52, "Valletta"], [40.94, -4.12, "Segovia"], [43.5, 16.44, "Split, Croatia"],
        [39.56, 2.64, "Palma de Mallorca Airport"], [3.16, 101.72, "Kuala Lumpur"], [43.38, -8.4, "Estadio Riazor"], [36.02, -114.74, "Hoover Dam"], [47.38, 8.54, "Zurich"], [53.56, 10, "Hamburg"], [48.58, 7.74, "Strasbourg"], [35.52, 24.02, "Chania"], [45.5, -73.56, "Montreal"], [-13.52, -71.98, "Cusco"], [36.74, -5.16, "Ronda"], [39.62, 19.92, "Corfu International Airport", "Corfu"], [13.42, 103.86, "Angkor Wat"], [49.28, -123.12, "Vancouver"], [40.96, -5.66, "Salamanca"], [27.18, 78.04, "Taj Mahal"], [51.2, 3.22, "Bruges"], [47.26, 11.4, "Innsbruck"], [-33.44,
            -70.66, "Santiago"], [44.44, 26.1, "Bucharest"], [44.5, 11.34, "Bologna"], [31.62, -7.98, "Marrakech"], [31.78, 35.24, "Jerusalem"], [50.06, 19.94, "Krak\u00f3w"], [59.94, 30.3, "Saint Petersburg"], [44.12, 15.22, "Zadar"], [55.74, 37.6, "Moscow"], [46.48, 30.74, "Odessa"], [51.18, -1.82, "Stonehenge"], [51.06, 13.74, "Dresden"], [25.2, 55.28, "Burj Khalifa"], [45.42, -75.7, "Ottawa"], [40.84, 14.26, "Naples"], [37.94, 27.34, "Ephesus"], [-13.16, -72.54, "Machu Picchu"], [49.46, 11.08, "Nuremberg"], [20.22, -87.42, "Tulum"], [37.44, 25.32, "Mykonos"], [47.6,
            -122.34, "Seattle"], [38.34, -0.48, "Alicante"], [47.8, 18.74, "Esztergom"], [38.12, 13.36, "Palermo"], [44.82, 20.46, "Belgrade"], [42.88, -8.54, "Santiago de Compostela"], [36.44, 28.22, "Colossus of Rhodes"], [51.48, 0, "Greenwich"], [46.2, 6.14, "Geneva"], [45.5, 10.6, "Sirmione"], [40.64, 22.94, "Thessaloniki"], [50.12, 8.68, "Frankfurt"], [46.82, -71.2, "Quebec City"], [44.88, 15.62, "Plitvi\u010dka Jezera"], [47.06, 8.3, "Lucerne"], [50.82, -0.14, "Brighton"], [21.42, 39.82, "Mecca"], [43.84, 10.5, "Lucca"], [59.32, 18.08, "Stockholm"], [38.42,
            27.12, "Izmir"], [51.22, 4.4, "Antwerp"], [48.88, 2.78, "Disneyland Paris"], [37.56, 126.98, "Seoul"], [41.98, 2.82, "Girona"], [24.56, -81.8, "Key West"], [28.42, -81.58, "Walt Disney World Resort"], [51.38, -2.36, "Bath, Somerset"], [42.64, 18.12, "Dubrovnik"], [36.1, 28.08, "Acropolis"], [43.46, 11.04, "San Gimignano"], [43.96, 4.8, "Avignon"], [51.92, 4.48, "Rotterdam"], [34.26, 108.94, "Xi'an"], [43.34, 17.82, "Mostar"], [42.34, -3.7, "Burgos"], [20.68, -88.56, "Chichen Itza"], [41.66, -0.88, "Zaragoza"], [59.92, 10.74, "Oslo"], [55.96, -3.18, "Edinburgh"],
        [60.4, 5.32, "Bergen"], [51.22, 6.76, "D\u00fcsseldorf"], [37.56, 22.8, "Palamidi"], [25.04, 121.52, "Taipei 101"], [42.7, 23.32, "Sofia"], [47.68, 8.62, "Schaffhausen"], [60.16, 24.96, "Helsinki"], [-33.04, -71.62, "Valpara\u00edso"], [48.64, -1.52, "Mont Saint-Michel"], [4.6, -74.08, "Bogot\u00e1"], [43.32, 11.34, "Siena"], [36.88, 30.7, "Antalya"], [21.28, -157.82, "Honolulu"], [35.46, 139.64, "Yokohama"], [43.54, -5.66, "Gij\u00f3n"], [52.4, 13.04, "Potsdam"], [48.78, 9.18, "Stuttgart"], [52.24, 21.02, "Warsaw"], [53.96, -1.08, "York"], [42.66, 27.74,
            "Nesebar"], [43.2, 2.36, "Carcassonne"], [34.06, -118.24, "Los Angeles"], [51.06, 3.72, "Ghent"], [28.42, -16.54, "Puerto de la Cruz"], [-12.98, -38.52, "Salvador, Bahia"], [43.28, 6.64, "Saint-Tropez"], [34.1, -118.34, "Hollywood"], [39.92, 32.86, "An\u0131tkabir"], [41.38, 9.16, "Bonifacio, Corse-du-Sud"], [40.66, -4.7, "\u00c1vila, Spain"], [10.78, 106.7, "Ho Chi Minh City"], [41.6, 1.84, "Santa Maria de Montserrat"], [50.44, 30.52, "Kiev"], [-22.9, -43.18, "Rio de Janeiro"], [29.96, -90.06, "New Orleans"], [44.5, 34.16, "Massandra"], [45.76,
            4.82, "Lyon"], [22.2, 113.54, "Macau Tower"], [55.82, 37.64, "Ostankino Tower"], [51.34, 12.38, "Leipzig"], [46.36, 14.1, "Bled"], [45.06, 7.7, "Turin"], [44.1, 9.74, "Manarola"], [25.78, -80.18, "Miami"], [40.64, 14.6, "Amalfi Coast"], [37.88, 32.5, "Konya"], [25.26, 55.3, "Dubai"], [51.76, -1.26, "Oxford"], [45.82, 15.98, "Zagreb"], [45.4, 11.88, "Padua"], [52.2, 0.12, "Cambridge"], [41.1, 29.06, "Bosphorus"], [40, 116.38, "Beijing National Stadium"], [39.72, 21.64, "\u039c\u03b5\u03c4\u03ad\u03c9\u03c1\u03b1 (Meteora)"], [36.54, -6.3, "Cadiz"], [43.48,
            -1.56, "Biarritz"], [47.9, 20.38, "Eger"], [41.72, 2.94, "Tossa de Mar"], [49.76, 6.64, "Trier"], [46.94, 7.44, "Bern"], [54.68, 25.28, "Vilnius"], [37.86, 15.28, "Taormina"], [41.12, 1.26, "Tarragona"], [53.86, 10.68, "L\u00fcbeck"], [53.4, -3, "Liverpool"], [40.18, 29.06, "Bursa"], [42.28, 18.84, "Budva"], [44.4, 8.94, "Genoa"], [18.46, -66.12, "Fort San Felipe del Morro"], [59.44, 24.74, "Tallinn"], [51.12, 17.04, "Wroc\u0142aw"], [48.82, 14.32, "\u010cesk\u00fd Krumlov"], [36.14, -5.34, "Gibraltar Airport"], [49.42, 8.7, "Heidelberg"], [53.48, -2.24,
            "Manchester"], [49.38, 10.18, "Rothenburg ob der Tauber"], [33.52, 36.3, "Damascus"], [35.34, 25.14, "Heraklion Archaeological Museum"], [53.08, 8.8, "Bremen"], [49.02, 12.1, "Regensburg"], [-34.9, -56.2, "Ciudad Vieja, Montevideo"], [20.68, -103.34, "Guadalajara, Jalisco"], [44.62, 33.52, "Italian battleship Giulio Cesare"], [52.08, 4.32, "The Hague"], [32.06, 34.76, "Jaffa"], [37.86, 27.26, "Ku\u015fadas\u0131"], [43.94, 12.44, "City of San Marino"], [46.92, 17.88, "Tihany"], [38.78, -9.5, "Cabo da Roca"], [-38, -57.54, "Mar del Plata"], [45.22,
            13.6, "Pore\u010d"], [40.56, 14.24, "Capri"], [48.08, 7.36, "Colmar"], [37.04, 27.42, "Bodrum"], [35.62, 139.78, "Odaiba"], [45.82, 9.08, "Como"], [28.08, -16.74, "Siam Park (Tenerife)"], [21.04, 105.84, "Hanoi"], [36.06, -112.14, "Grand Canyon National Park"], [-36.84, 174.76, "Auckland"], [-15.8, -47.88, "Bras\u00edlia"], [19.7, -98.84, "Teotihuacan"], [44.88, 13.84, "Pula"], [30.32, 35.44, "Al Khazneh"], [50.22, 12.88, "Karlovy Vary"], [43.8, 15.96, "Krka National Park"], [43.6, 1.44, "Toulouse"], [27.1, 33.84, "Beach Hurghada"], [55.62, 37.68, "Southern Administrative Okrug"],
        [37.62, -112.16, "Bryce Canyon National Park"], [46.08, 18.22, "P\u00e9cs"], [45.9, 6.12, "Palais de l'Isle"], [40, 116.26, "Summer Palace"], [43.56, 7.02, "Cannes"], [42.52, 3.08, "Collioure"], [42.82, -1.64, "Pamplona"], [27.74, -15.6, "Playa del Ingl\u00e9s"], [43.36, -5.84, "Oviedo"], [49.12, 20.06, "\u0160trbsk\u00e9 Pleso"], [51.48, -0.6, "Windsor Castle"], [24.46, 39.62, "Medina"], [22.34, 31.62, "Abu Simbel temples"], [36.76, 31.38, "Side"], [40.36, 0.4, "Peniscola"], [43.2, 27.92, "Nikola Vaptsarov Naval Academy"], [59.88, 29.9, "Peterhof Palace"],
        [43.3, 5.36, "Marseille"], [47.54, 9.68, "Lindau"], [59.72, 30.4, "Tsarskoye Selo"], [34.68, 135.84, "T\u014ddai-ji"], [30.24, 120.14, "Hangzhou"], [57.28, -5.52, "Eilean Donan"], [50.36, 7.6, "Koblenz"], [28.22, -16.64, "Roque Cinchado"], [44.5, 33.6, "Baryshivka Raion"], [27.82, -15.76, "Puerto de Mog\u00e1n"], [-31.42, -64.18, "C\u00f3rdoba, Argentina"], [49.42, 0.24, "Honfleur"], [46.06, 14.5, "Ljubljana"], [43.08, 12.6, "Assisi"], [32.64, -16.9, "Funchal"], [38.92, -6.34, "Emerita Augusta"], [38.04, 14.02, "Cefal\u00f9"], [42.42, 18.78, "Kotor"],
        [47.62, 1.52, "Ch\u00e2teau de Chambord"], [44.84, -0.58, "Bordeaux"], [45.64, 25.58, "Biserica Neagr\u0103"], [42.28, 3.28, "Cadaqu\u00e9s"], [44.84, 34.96, "Sudak"], [42.6, -5.58, "Le\u00f3n, Spain"], [43.52, 16.26, "Trogir"], [48.42, -123.36, "Victoria, British Columbia"], [42, 21.44, "Skopje"], [34.02, -118.5, "Santa Monica, California"], [48.64, -2.02, "Saint-Malo"], [42.96, 17.14, "Kor\u010dula"], [38.9, 1.44, "Ibiza Town"], [54.18, 12.08, "Warnem\u00fcnde"], [56.84, 60.6, "Yekaterinburg"], [22.88, -109.9, "Cabo San Lucas"], [38.7, -9.42,
            "Estoril"], [20.62, -87.08, "Riviera Maya"], [45.88, 10.84, "Riva del Garda"], [45.7, 9.66, "Bergamo"], [53.9, 27.56, "Minsk"], [30.04, 31.26, "Egyptian Museum"], [45.6, 24.62, "Transf\u0103g\u0103r\u0103\u015fan"], [-34.96, -54.94, "Punta del Este"], [46.42, 6.92, "Montreux"], [43.3, 17.02, "Makarska"], [39.6, -9.08, "Nazar\u00e9 Funicular"], [12.94, 100.88, "Pattaya"], [41.7, 2.84, "Lloret de Mar"], [7.9, 98.3, "Patong"], [55.8, 49.1, "Kazan Kremlin"], [39.36, -9.16, "\u00d3bidos, Portugal"], [35.3, 10.7, "El Djem"], [47.56, 13.64, "Hallstatt"],
        [-23.22, -44.72, "Paraty"], [34.4, 132.46, "Hiroshima"], [48, 7.86, "Freiburg Minster"], [41.12, 20.8, "Ohrid"], [-12.04, -77.04, "Lima"], [50.78, 6.08, "Aachen"], [10.42, -75.54, "Colombian Navy"], [40.08, -2.12, "Cuenca Cathedral"], [49.2, 16.6, "Brno"], [42.42, 27.7, "Sozopol"], [38.8, -9.38, "Pena National Palace"], [47.66, 9.18, "Konstanz"], [43.94, 4.54, "Pont du Gard"], [50.8, -1.1, "Gosport"], [49.7, 0.2, "\u00c9tretat"], [43.3, -5.06, "Santuario De Covadonga"], [43.46, -3.8, "Santander, Cantabria"], [55.86, -4.26, "Glasgow"], [38.64, 34.84, "Kapadokya"],
        [39.96, -75.16, "Philadelphia"], [40.62, 14.48, "Positano"], [35.82, 10.64, "Sousse"], [47.56, 7.6, "Basel"], [45.8, 24.16, "Sibiu"], [47.08, 15.44, "Graz"], [26.88, 100.24, "Lijiang, Yunnan"], [46, 8.96, "Lugano"], [50, 36.24, "Freedom Square, Kharkiv"], [40.2, -8.42, "Coimbra"], [40.74, 14.48, "Pompeii"], [32.66, 51.68, "Naqsh-e Jahan Square"], [28.24, -16.84, "Los Gigantes"], [-34.48, -57.86, "Colonia del Sacramento"], [34.7, 135.5, "Osaka"], [46.16, -1.16, "La Rochelle"], [27.22, 33.84, "Hurghada Marina"], [26.92, 75.82, "Jaipur"], [14.56, -90.74,
            "Antigua Guatemala"], [-27.6, -48.56, "Est\u00e1dio Orlando Scarpelli"], [38.62, -90.18, "St. Louis, Missouri"], [41.84, -88.08, "Area codes 630 and 331"], [32.72, -117.18, "San Diego"], [37.06, 15.3, "Ortygia"], [36.8, 10.18, "Tunis"], [48.4, 10, "Ulm"], [38.54, -0.14, "Benidorm"], [48.72, 21.26, "Ko\u0161ice"], [-16.4, -71.54, "Arequipa"], [46.02, 7.74, "Zermatt"], [49.62, 6.14, "Court of Justice of the European Union"], [-20.38, -43.5, "Ouro Preto"], [54.52, 18.56, "ORP B\u0142yskawica"], [52.48, 4.82, "Zaanse Schans"], [48.22, 11.62, "Allianz Arena"],
        [35.38, 24.48, "Archaeological Museum of Rethymno"], [21.02, -101.26, "Guanajuato"], [39.28, 20.4, "\u039b\u03b9\u03bc\u03ac\u03bd\u03b9 \u03a0\u03ac\u03c1\u03b3\u03b1\u03c2 (Port of Parga)"], [33.82, -117.92, "Disneyland"], [21.8, -79.98, "Trinidad, Cuba"], [44.42, 34.06, "Alupka"], [36.86, 10.34, "Carthage"], [46.22, 24.8, "Sighi\u015foara"], [-33.9, 18.42, "Cape Town Stadium"], [33.6, -7.64, "Hassan II Mosque"], [49.3, 19.94, "Zakopane"], [54.04, 19.02, "Malbork"], [37.6, -0.98, "Cartagena, Spain"], [37.02, -9, "Cape St. Vincent"], [-34.42,
            -58.58, "Tigre, Buenos Aires"], [50.96, 14.08, "Bastei"], [53.42, 14.56, "Szczecin"], [41.68, 26.56, "Edirne"], [19.04, -98.2, "Puebla, Puebla"], [51.42, -116.22, "Chateau Lake Louise"]]
}
function loadTagsList() {
    var a, b, c, h, j;
    tagList = "view church house park saint old road sunset street near river bridge panoramic beach tower center night hotel lake sea sun new south north water city square village winter station mountain town looking day home island castle school main west tree hill monument big high building restaurant front snow valley harbour entry market bay photo east gate garden side entrance top beautiful rock sight boat museum morning sunrise stone background national coast path small chapel end sky spring hall highway port blue spot pool train forest inside landscape white seen way area green red fountain walk temple waterfall autumn evening dawn avenue clouds club point bar central fishing close cross towards moon field trail villa trees light statue bank air cathedral buzzer railway great ruin municipal shop mary interior pond dam post bike office flowers storm source flower car inn palace black creek peak memorial nature window mall input resort world back good low sand houses detail mill corner lighthouse country rampart crossing marine court john little fall sign jetty art parking state farm brazil ride mountains former antique canal camping direction library lady college rain life fog fire downtown zone wharf part hospital colors rainbow nice ice visa afternoon range cave rocks long cafe behind saw early coming family bus across neighborhood time stadium room summer iii van airport sculpture housing gazebo website just line know fort lagoon university nad parish monastery cemetery cemetary theatre door right fish ship lodge wind virgin historic natural mosque cove paradise rise christmas wood dusk walking general king ferry party facade edge tunnel dog arc camp place around rest shrine lane shore construction county left outside international summit access clock course pub cape stones canyon since head ground snowy next ave cottage pink santa overview aerial terrace mount border sierra district festival ocean golden spa local store pod set palm railroad plant bell reservoir lookout horse christ foot flood pass track pedro public route southern complex alley full portal aug golf bird large wild going boats patio cliff upper welcome waiting real bij yard stream stop hdr fields gorge abandoned falls mist gardens holy yellow base face northern royal anthony catholic hills sleep channel another look power nov years roof pogled without pine swimming entering bath rail taken reflections giant ancient ski last roundabout century love deck dock tide fishermen group best het gold image manor output rose belfry molder fortress late residence mouth fair bir dead flag martin peace fisherman like far francisco cold flight beauty year ridge culture together gallery ali middle star dunes victory altar tip templom refuge reserve scene historical work people land round wooden desert passage lateral indian mother leaving open western feb surf police net service jose higher skyline queen sports masjid block drive gulf partial lights peter jump factory facing mine landing bahia institute show final palms hostel frozen cliffs toward traditional lot hole sunday waves miguel campus rocky province tank lakes ulica hot clear volcano reflection distance birds cruise wide mural dec food carlos homes convent super still steps navy trip viewed overlooking hut cloud parade horses lift take riverside zima god tourist floor flying rural lower walls jpg approaching paul platform jesus santiago collar kerk arch don slope headquarters waters shot sunny holiday sanctuary cultural sweet novel glacier buildings military mini dry junction residential barn apartment balcony community george cat traffic plane eagle municipality boulevard caves sailing lion football ann picture grave luis colony arrival apartments dan cabin heritage pacific dome peninsula leave james eastern scenery bread plan campsite coffee ile ben waterfront blogspot eye region young carnival children chinese ranch pole jeans stara cami bunker boy orange deer union sheep wedding race heavy freedom angel cactus coastal iris sector kids distaff bull gas basilica taxi sale branch baby motel radio pedestrian tomb turtle windmill grass dragon isle nam coastline zoo casino republic german panorama circle rainy pagoda kings pines streets woman tea industrial cable san jungle salt history parku heading guest ravine oasis bush dune priest orthodox saints lost elephant africa colonial jul yacht bazar belle reef photos linda coconut cottages government ltd butterfly coral carmen british plateau project diving buddha play season atlantic bungalow girl khan truck pavilion saintly terminal monkey provincial versus tropical savior sto somewhere views hope typical stary french med shops rosary jezero cellar sandy crater olive cattle breakfast game anna trinity canoe michael rice baba manuel academy castling vicente grove waterfalls springs nest independence russian madera sands stick girls fernando wildlife primary pelican rica jorge transport boys dolina oil joseph grad rafael echo pablo floating catolica china lorenzo futbol lands health princess runway villas computer tall women ste venta shah lizard reaching solar botanical whale potok blok safari medium hacienda observatory seal bolivar mission fruit knoll fjord cricket lenin countryside site camel spomenik bamboo diego stari odds dive plantation dar child reka wreck pred france reception iguana estate crocodile mud sultan frameworks baltic ahmed turkish gora dios selo sugar salud shark til buffalo sam retour rincon tent guesthouse comercio caribe garcia kong buddhist secondary destroyed handle via mala mangrove hostal banana saltworks bazaar pres mercedes lucia maj stupa caribbean sable coco islands ruins malecon mausoleum mali alcaldia planina abu bungalows petra soviet zebra nouvelle wadi african kamp sveti catalina ain deserto voda ras giraffe vrh isidro comunidad mohammad sahara izvor kamen cay anchorage cabins fleuve nikola mango elephants ceiba paddy leopard muzej baobab hippo pirogue beaches camels ace impala jebel indies monasteries hippos coated stillwater recumbent behold login httpwww".split(" ");
    tagCategories =
        {
            church: "Religious architecture",
            cathedral: "Religious architecture",
            chapel: "Religious architecture",
            monastery: "Religious architecture",
            mosque: "Religious architecture",
            shrine: "Religious architecture",
            basilica: "Religious architecture",
            cemetary: "Religious architecture",
            cemetery: "Religious architecture",
            templom: "Religious architecture",
            temple: "Religious architecture",
            holy: "Religious architecture",
            catholic: "Religious architecture",
            cami: "Religious architecture",
            kerk: "Religious architecture",
            "Religious architecture": "Landmark",
            night: "Nightlife",
            evening: "Nightlife",
            club: "Nightlife",
            Nightlife: "Entertainment",
            theatre: "Art",
            art: "Art",
            gallery: "Art",
            culture: "Art",
            Art: "Entertainment",
            resort: "Relaxation",
            spa: "Relaxation",
            pool: "Relaxation",
            Relaxation: "Entertainment",
            nature: "Nature",
            tree: "Nature",
            forest: "Nature",
            green: "Nature",
            trees: "Nature",
            fog: "Nature",
            park: "Park",
            Park: "Nature",
            garden: "Garden",
            flowers: "Garden",
            flower: "Garden",
            gazebo: "Garden",
            patio: "Garden",
            Garden: "Nature",
            river: "River",
            canal: "River",
            water: "River",
            River: "Nature",
            sea: "Sea",
            beach: "Sea",
            coast: "Sea",
            water: "Sea",
            marine: "Sea",
            surf: "Sea",
            ocean: "Sea",
            Sea: "Nature",
            lake: "Lake",
            pond: "Lake",
            water: "Lake",
            reservoir: "Lake",
            Lake: "Nature",
            mountain: "Mountain",
            hill: "Mountain",
            high: "Mountain",
            peak: "Mountain",
            Mountain: "Nature",
            canyon: "Valley",
            gorge: "Valley",
            valley: "Valley",
            Valley: "Nature",
            island: "Island",
            Island: "Nature",
            fall: "Waterfall",
            falls: "Waterfall",
            waterfall: "Waterfall",
            water: "Waterfall",
            Waterfall: "Nature",
            cave: "Cave",
            caves: "Cave",
            rock: "Cave",
            rocks: "Cave",
            Cave: "Nature",
            bay: "Bay",
            cove: "Bay",
            water: "Bay",
            Bay: "Nature",
            lagoon: "Lagoon",
            water: "Lagoon",
            Lagoon: "Nature",
            tower: "Tower",
            Tower: "Landmark",
            dam: "Bridge & Dam",
            bridge: "Bridge & Dam",
            "Bridge & Dam": "Landmark",
            monument: "Monument & Memorial",
            memorial: "Monument & Memorial",
            statue: "Monument & Memorial",
            sculpture: "Monument & Memorial",
            "Monument & Memorial": "Landmark",
            fountain: "Landmark",
            villa: "Landmark",
            lighthouse: "Landmark",
            mill: "Landmark",
            hall: "Landmark",
            harbour: "Harbour",
            port: "Harbour",
            boat: "Harbour",
            ferry: "Harbour",
            ship: "Harbour",
            wharf: "Harbour",
            jetty: "Harbour",
            Harbour: "Landmark",
            lighthouse: "Landmark",
            school: "Education",
            college: "Education",
            library: "Education",
            university: "Education",
            inn: "Food and drink",
            pub: "Food and drink",
            cafe: "Food and drink",
            bar: "Food and drink",
            restaurant: "Food and drink",
            old: "Historic",
            antique: "Historic",
            historic: "Historic",
            ruin: "Historic",
            royal: "Historic",
            ancient: "Historic",
            castle: "Castle & Fortress",
            fortress: "Castle & Fortress",
            fort: "Castle & Fortress",
            rampart: "Castle & Fortress",
            walls: "Castle & Fortress",
            "Castle & Fortress": "Historic",
            manor: "Manor & Villa",
            villa: "Manor & Villa",
            villas: "Manor & Villa",
            "Manor & Villa": "Historic",
            museum: "Museum",
            Museum: "Historic",
            palace: "Palace",
            Palace: "Historic",
            view: "View",
            sunset: "View",
            sun: "View",
            looking: "View",
            dawn: "View",
            landscape: "View",
            beautiful: "View",
            sunrise: "View",
            background: "View",
            sky: "View",
            clouds: "View",
            moon: "View",
            fog: "View",
            panoramic: "View",
            hotel: "Accommodation",
            housing: "Accommodation",
            landmark: "Landmark",
            "Religious architecture": "Historic"
        };
    j = "Religious architecture;Art;Relaxation;Park;Garden;River;Lagoon;Sea;Lake;Mountain;Valley;Island;Waterfall;Cave;Bay;Tower;Bridge & Dam;Monument & Memorial;Harbour;Education;Castle & Fortress;Manor & Villa;Museum;Palace;Accommodation;Entertainment;Historic;Nature;Landmark;View".split(";");
    a = "saint house road near center new street big world spot floor looking day west north south east main sun input detail source inside jeans cami ali kong seen china towards night nov alley mary entry home paul course van best little sam giant stari grad iii winter summer real set jpg gif hdr corner side low back seen kerk national christ guest end aug next buzzer francisco jose point central republic lady kong".split(" ");
    h = {};
    for (b = 0; b < a.length; b++)h[a[b]] = 1;
    uiTagList = [];
    for (b = 0; b < tagList.length; b++)h[tagList[b]] ||
    uiTagList.push(tagList[b]);
    revCategories = {};
    for (var k in tagCategories)tagCategories.hasOwnProperty(k) && (h = tagCategories[k], revCategories[h] ? revCategories[h].push(k) : revCategories[h] = [k]);
    for (c = 0; 2 > c; c++)for (k in revCategories)if (revCategories.hasOwnProperty(k))for (b = 0; b < revCategories[k].length; b++)if ("A" <= revCategories[k][b].charAt(0) && "Z" >= revCategories[k][b].charAt(0) && (h = revCategories[revCategories[k][b]]))for (a = 0; a < h.length; a++)0 > revCategories[k].indexOf(h[a]) && revCategories[k].push(h[a]);
    for (b =
             0; b < j.length; b++)uiTagList.push(j[b])
};function pickTravelMode(a, b, c, h) {
    if (a <= NEVER_WALK_DISTANCE) {
        var j = a / (1E3 * DEFAULT_WALKING_SPEED);
        if (a <= ALWAYS_WALK_DISTANCE || j <= b)return b = c, "UNKNOWN" != b && (b = google.maps.TravelMode.WALKING), {
            travelTime: j,
            travelMode: b,
            distance: a
        }
    }
    return {travelTime: b, travelMode: c, distance: h}
}
function travelTimePickCached(a, b) {
    var c = travelTimeCached(a, b, DEFAULT_TRAVEL_SPEED * DEFAULT_TIME_FACTOR, google.maps.TravelMode.DRIVING);
    return pickTravelMode(distanceFlat(a.latitude, a.longitude, b.latitude, b.longitude), c.travelTime * DEFAULT_TIME_FACTOR, c.travelMode, c.distance)
}
function travelTimePickFast(a, b) {
    var c = distanceFlat(a.latitude, a.longitude, b.latitude, b.longitude);
    return pickTravelMode(c, c / (1E3 * DEFAULT_TRAVEL_SPEED), google.maps.TravelMode.DRIVING, c)
}
function travelTimeWalkFast(a, b) {
    var c = distanceFlat(a.latitude, a.longitude, b.latitude, b.longitude);
    return {travelTime: c / (1E3 * DEFAULT_WALKING_SPEED), travelMode: google.maps.TravelMode.WALKING, distance: c}
}
function travelTimeDriveCached(a, b) {
    var c = travelTimeCached(a, b, DEFAULT_TRAVEL_SPEED * DEFAULT_TIME_FACTOR, google.maps.TravelMode.DRIVING);
    return {travelTime: c.travelTime * DEFAULT_TIME_FACTOR, travelMode: c.travelMode, distance: c.distance}
}
function travelTimeDriveFast(a, b) {
    var c = distanceFlat(a.latitude, a.longitude, b.latitude, b.longitude);
    return {travelTime: c / (1E3 * DEFAULT_TRAVEL_SPEED), travelMode: google.maps.TravelMode.DRIVING, distance: c}
}
function getTravelTimeFunction(a, b) {
    return b ? "WALKING" == b ? travelTimeWalkFast : a ? travelTimeDriveFast : travelTimeDriveCached : "w" == $("#trip_mode").val() ? travelTimeWalkFast : a ? travelTimePickFast : travelTimePickCached
}
function isInItinerary(a, b) {
    var c = null, h, j = a.length;
    for (h = 0; h < j; h++)if (!smap.recommender.isMeta(a[h]) && samePOI(a[h].origin, b)) {
        c = h;
        break
    }
    return c
}
function findPOIByCoord(a, b) {
    for (var c = null,
             h = 0; h < lastViewPois.length; h++)if (sameCoord(a, b, lastViewPois[h].lat, lastViewPois[h].lng)) {
        c = lastViewPois[h];
        break
    }
    return c
}
function getPOIDuration(a) {
    var b = 1 * a.rtime;
    if (isNaN(b) || 0 >= b) b = 0.5, debug(a.name + " has invalid duration (rtime) '" + a.rtime + "'");
    return b
}
function getPOIScore(a) {
    var b = 1 * a.rpop;
    if (isNaN(b) || 0 >= b) b = 1E-4, debug(a.name + " has invalid score (rpop) '" + a.rpop + "'");
    return b
}
function makeCand(a) {
    return smap.recommender.resultAtom(a.lat, a.lng, a.name, getPOIScore(a), getPOIDuration(a), -1, a)
}
function tripAddPOI(a) {
    var b, c;
    null == tripStartLat || null == tripStartLng || (b = getFloatParam("trip_duration", 10), c = {}, a = makeCand(a), 0 == userItinerary.length && (userItinerary = smap.recommender.initItinerary(tripStartLat, tripStartLng, null, null)), c.cand = a, c.result = userItinerary, c.ttFunc = getTravelTimeFunction(!1), c.duration = b, updateItineraryWithDistCache(a, userItinerary, insertPOICallback, c))
}
function tripRemovePOI(a) {
    0 > a || a >= userItinerary.length ? showAlert("Error.", 2500) : (smap.recommender.removeItem(userItinerary[a], userItinerary, a, getTravelTimeFunction(!1)), refreshRoute(), listUserItinerary(), updateItemCount())
}
function insertPOICallback(a) {
    null != smap.recommender.updateH(a.cand, a.result, a.ttFunc, a.duration, !0) ? (smap.recommender.insertItem(a.cand, a.result), userItinerary = a.result, refreshRoute(), updateItemCount()) : showAlert("There was a problem adding this place to the trip.")
}
function tripMovePOI(a, b) {
    if (0 >= b) showAlert("Cannot move at that position.", 2500); else if (b >= userItinerary.length) showAlert("Cannot move past the end.", 2500); else if (smap.recommender.isMeta(userItinerary[a])) showAlert("Cannot move that item.", 2500); else if (smap.recommender.isMeta(userItinerary[b])) showAlert("Can't swap with that item.", 2500); else {
        var c = userItinerary[a], h = makeCand(c.origin), j = getFloatParam("trip_duration", 10);
        smap.recommender.removeItem(c, userItinerary, a, getTravelTimeFunction(!1));
        h.h = null;
        h.duration = c.duration;
        smap.recommender.testCandPositionH(h, userItinerary, b, getTravelTimeFunction(!1), j, !0) ? (c.idx = b, c.start = h.start, c.end = h.end, c.shift = h.shift, c.mode = h.mode, c.nextmode = h.nextmode, smap.recommender.insertItem(c, userItinerary), refreshRoute(), listUserItinerary(), updateItemCount()) : (smap.recommender.insertItem(c, userItinerary), showAlert("Cannot move there.", 2500), listUserItinerary())
    }
}
function prefilterBundles(a, b) {
    var c = a.length, h;
    if (5 > c)return a;
    h = b / 0.5 | 0;
    h > c / 2 && (h = c / 2);
    return createItemBundles(a.slice(0, h), a.slice(h, c), ["hotel", "restaurant", "cafe"])
}
function prefilterExisting(a, b) {
    for (var c = [], h = a.length, j = 0; j < h; j++)isInItinerary(b, a[j].origin) || c.push(a[j]);
    return c
}
function recommendDayTrip() {
    var a = getFloatParam("trip_duration", 10);
    !tripStartLat || !tripStartLng ? showQuickAlert("Please select a starting location first.") : ($("#trip_loader").show(), setTimeout(function () {
        var b = smap.recommender.makeDaytrip(lastShownPois, tripStartLat, tripStartLng, getTravelTimeFunction(!0), makeCand, checkBundleOverlap, function (b) {
            return prefilterBundles(prefilterExisting(b, userItinerary), a)
        }, bundledItemTypes, a, userItinerary, {hotel: 0, restaurant: 1, cafe: 1});
        null !== b && (b = extractItemBundles(b,
            getTravelTimeFunction(!0), a), b.length > userItinerary.length && !smap.recommender.isEmptyItinerary(b) ? (userItinerary = b, updateItemCount(), hideRoute(), postprocessRoute(userItinerary)) : showAlert("<div style='text-align: left'>No places were added to the trip:<br> the planner creates only <b>short trips</b> automatically. <p> You may want to <ul><li>zoom in</li><li>increase the number of places shown</li><li>increase the trip length</li><li>or add places yourself: click on the markers</li></ul></div>"));
        $("#trip_loader").hide()
    }, 100))
}
function generateTripFromItems(a, b, c, h, j) {
    for (var k = getFloatParam("trip_duration", 10), a = smap.recommender.initItinerary(a, b, c, h), b = j.length,
             c = 1, h = 0; h < b; h++) {
        var m = j[h];
        smap.recommender.testCandPositionH(m, a, c, getTravelTimeFunction(!1, m.mode), k, !0) && (m.idx = c++, smap.recommender.insertItem(m, a))
    }
    return a
}
function clearTrip() {
    userItinerary = [];
    hideRoute();
    updateItemCount()
}
function showStartMarker() {
    null !== tripStartMarker ? tripStartMarker.setMap(googleMap) : placeStartMarker()
}
function hideStartMarker() {
    null !== tripStartMarker && tripStartMarker.setMap(null)
}
function placeStartMarker() {
    null !== tripStartLat && null !== tripStartLng && (null !== tripStartMarker && tripStartMarker.setMap(null), tripStartMarker = addGenericMarker(googleMap, new google.maps.LatLng(tripStartLat, tripStartLng), PNGURLPREFIX + "gmarkers.png", "Trip start (click to change the location)", 7, function () {
        startTripStartChange()
    }))
}
function startTripStartChange() {
    tripPlanMode && (showQuickAlert("Click on the map to select the new starting spot.", 1E4), getMapLocation(continueTripStartChange))
}
function continueTripStartChange(a) {
    if (tripPlanMode) {
        var b = getFloatParam("trip_duration", 10), c = smap.recommender.makeMeta(a.lat(), a.lng(), "Start", 0),
            a = {cand: c, location: a, result: userItinerary, ttFunc: getTravelTimeFunction(!1), duration: b};
        1 < userItinerary.length ? updateItineraryWithDistCache(c, userItinerary, finishTripStartChange, a) : finishTripStartChange(a)
    }
}
function finishTripStartChange(a) {
    tripPlanMode && (smap.recommender.replaceStartLocation(a.cand, a.result, a.ttFunc, a.duration, !0) ? (userItinerary = a.result, storeTripStart(a.location), refreshRoute()) : showConfirm("New location is too far from the current trip, start a new trip?", function () {
        userItinerary = [];
        updateItemCount();
        storeTripStart(a.location);
        refreshRoute()
    }, hideAlert))
}
var directionsService = null, directionsDisplay = null;
function initDirections() {
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = []
}
function refreshRoute() {
    hideRoute();
    showRoute(userItinerary)
}
function itinItemToLatLng(a) {
    return new google.maps.LatLng(a.latitude, a.longitude)
}
function showRoute(a) {
    a = splitRoute(a);
    if (null !== a)for (var b = a.length, c = 0; c < b; c++) {
        var h = a[c];
        1 < h.items.length && 10 > h.items.length && ("UNKNOWN" == h.travelMode ? renderPolyRouteSegment(h) : renderRouteSegment(h))
    }
}
function postprocessRoute(a) {
    a = splitRoute(a);
    if (null !== a)for (var b = a.length, c = 0; c < b; c++) {
        var h = a[c];
        1 < h.items.length && 10 > h.items.length ? postprocessRouteSegment(h) : debug("Invalid segment")
    }
}
function makeRouteSegment() {
    return {items: [], travelMode: google.maps.TravelMode.DRIVING, idx: 0}
}
function splitRoute(a) {
    if (2 > a.length)return null;
    var b = [], c = a.length, h = makeRouteSegment();
    h.travelMode = a[1].mode;
    for (var j = 0; j < c; j++)if (h.items.push(a[j]), j + 1 < c && (9 <= h.items.length || a[j + 1].mode != h.travelMode)) b.push(h), h = makeRouteSegment(), h.items.push(a[j]), h.travelMode = a[j + 1].mode, h.idx = j;
    b.push(h);
    return b
}
function segmentRenderOptions(a) {
    return {suppressMarkers: !0, preserveViewport: !0, polylineOptions: segmentPolyOptions(a)}
}
function segmentPolyOptions(a) {
    var b = {strokeOpacity: 0.6, strokeWeight: 7};
    b.strokeColor = a.travelMode == google.maps.TravelMode.WALKING ? "#ff0000" : a.travelMode == google.maps.TravelMode.DRIVING ? "#0000ff" : "#000000";
    return b
}
function postprocessRouteSegment(a) {
    var b = a.items.length, a = {
        chainedParams: a,
        chainedFunc: finishPPRouteSegment,
        origins: itineraryToLatLng(a.items.slice(0, b - 1)),
        destinations: itineraryToLatLng(a.items.slice(1, b))
    };
    callDistService(a)
}
function finishPPRouteSegment(a) {
    for (var b = a.items.length, c = 1; c < b; c++) {
        var h = travelTimeCached(a.items[c - 1], a.items[c], DEFAULT_TRAVEL_SPEED * DEFAULT_TIME_FACTOR, google.maps.TravelMode.DRIVING);
        "UNKNOWN" == h.travelMode && (a.items[c].mode = h.travelMode)
    }
    showRoute(a.items)
}
function renderRouteSegment(a) {
    for (var b = a.items.length, c = itinItemToLatLng(a.items[0]), h = itinItemToLatLng(a.items[b - 1]), j = [],
             k = 1; k < b - 1; k++)j.push({location: itinItemToLatLng(a.items[k]), stopover: !0});
    directionsService.route({
        origin: c,
        destination: h,
        waypoints: j,
        optimizeWaypoints: !1,
        travelMode: a.travelMode
    }, function (b, c) {
        if (c == google.maps.DirectionsStatus.OK) {
            var h = new google.maps.DirectionsRenderer;
            h.setOptions(segmentRenderOptions(a));
            h.setMap(googleMap);
            h.setDirections(b);
            directionsDisplay.push(h)
        }
    })
}
function renderPolyRouteSegment(a) {
    var b = a.items.length, c = segmentPolyOptions(a);
    c.path = [];
    for (var h = 0; h < b; h++)c.path.push(itinItemToLatLng(a.items[h]));
    a = new google.maps.Polyline(c);
    a.setMap(googleMap);
    directionsDisplay.push(a)
}
function hideRoute() {
    for (; directionsDisplay.length;)directionsDisplay.pop().setMap(null)
}
function timeRepr(a) {
    var b = Math.floor(a), a = Math.floor(60 * (a - b));
    return (10 > b ? "0" : "") + b + ":" + (10 > a ? "0" : "") + a
}
function makeTimeStr(a, b, c) {
    var h;
    1 > a ? (a = Math.round(60 * a), 2 > a ? (a = 1, h = "minute") : 59 < a ? (a = 1, h = "hour") : h = "minutes") : 1 == a ? (h = "hour", a = 1) : (h = "hours", a = 6 < a ? Math.round(a) : Math.round(10 * a) / 10);
    b || (b = "");
    c || (c = "");
    return b + a + c + " " + h
}
function makeTravelStr(a) {
    return "WALKING" == a.mode ? "walk" : (a.mode = "DRIVING", "drive")
}
function makeItemBox(a, b) {
    var c = a.latitude, h = a.longitude, j = a.origin.wpi, k = a.origin.photo;
    k ? (c = "showPhotos(" + c + "," + h + "," + j + "," + k + ", 2400)", k = "<div class='itinthumbsurr'><div class='itinthumbbound'><img src='" + PHOTOPREFIX + k + ".jpg' border='0' align='middle' onerror='$(this).parent().hide();' onclick='" + c + "' class='itinthumb' title='Click for Panoramio photos. Photos are copyrighted by their owners.'></div><a href='#' title='Click for Panoramio photos. Photos are copyrighted by their owners.' style='font-size: 12px' onclick='" +
        c + "'><img class='itinthumbtxt' src='" + PNGURLPREFIX + "logo-tos.png'/></a></div>") : k = "<div class='itinthumbsurr'>&nbsp;</div>";
    a.tst && debug("item.tst " + a.tst);
    a.origin.tst && debug("item.origin.tst " + a.origin.tst);
    c = (0 === a.origin.wpi || a.origin.wpi && 8E3 > a.origin.wpi) && (a.origin.inhabit && 5E3 < a.origin.inhabit || a.origin.fnear && 10 < a.origin.fnear) ? "" : a.origin.fstype && ("Other Great Outdoors" == a.origin.fstype || "General Travel" == a.origin.fstype) ? "" : a.origin.rtype ? a.origin.rtype : a.origin.fstype ? a.origin.fstype :
        "";
    debug("ext " + a.origin.extlinks);
    k = k + "<h4>" + sanitizeTxt(a.title) + '</h4><div class="itemdetails">' + c + " " + b;
    a.origin.extlinks && (k += "<span style='float: right; margin-right: 10px;'>" + a.origin.extlinks + "</span>");
    return '<div class="itemdesc">' + (k + "</div>") + "</div>"
}
function makeItineraryItem(a, b, c, h) {
    return smap.recommender.isMeta(a) ? "" : "<li><div class=\"itemlink\" style='margin-bottom: 5px'>" + makeTravelStr(a) + " " + makeTimeStr(c) + '</div><div class="itemsortable" title="drag to rearrange places in your trip" style=\'background-color: #eee;\'>  <a class="btn btn-small close" style=\'opacity: 0.8; font-weight: normal;\' onClick="tripRemovePOI(' + b + ')">delete</a>' + makeItemBox(a, makeTimeStr(h)) + "</div></li>"
}
function listUserItinerary() {
    var a = $("#tripplant");
    a.find("li").remove();
    $(userItinerary).each(function (b) {
        var c = userItinerary[b];
        smap.recommender.isMeta(c) || a.append(makeItineraryItem(c, b, 0 < b ? c.start - userItinerary[b - 1].end : 0, c.end - c.start))
    });
    a.sortable({handle: ".itemsortable"})
}
function updateItemCount() {
    var a, b = userItinerary.length, c = 0;
    for (a = 0; a < b; a++)smap.recommender.isMeta(userItinerary[a]) || c++;
    1 > c && (c = "no");
    $("#itemcount").html(c);
    $("#tpitemcount").html(c);
    updateItinTime()
}
function updateItinTime() {
    var a;
    a = userItinerary.length;
    a = 1 > a ? 0 : userItinerary[a - 1].end - userItinerary[0].start;
    a = 0 >= a ? "" : ", " + makeTimeStr(a);
    $("#triptime").html(a);
    $("#tptriptime").html(a)
}
function tripItemMoveEvent(a, b) {
    for (var c = a, h = b, j = userItinerary.length,
             k = 0; k < j; k++)smap.recommender.isMeta(userItinerary[k]) && (k <= c && c++, k <= h && h++);
    tripMovePOI(c, h)
}
function serializeTrip(a) {
    for (var b = [], c = a.length, h = 0; h < c; h++)b.push([a[h].latitude, a[h].longitude, a[h].duration, a[h].mode]);
    return smap.tripDataEncoder.enc(b)
}
function unSerializeTrip(a) {
    for (var b = null, c = null, h = null, j = null, k = [], a = smap.tripDataEncoder.dec(a), m = a.length,
             q = 0; q < m; q++) {
        var r = a[q][0], n = a[q][1], u = a[q][2], t = a[q][3];
        if (0 == u) 0 == q ? (b = r, c = n) : q == m - 1 && (h = r, j = n); else {
            var w = findPOIByCoord(r, n);
            null === w && (w = {lat: r, lng: n, rtime: u, rpop: 10, name: ""});
            r = makeCand(w);
            r.duration = u;
            r.mode = t;
            k.push(r)
        }
    }
    return null !== b && null !== c ? generateTripFromItems(b, c, h, j, k) : null
}
function extractPOICoords(a) {
    for (var b = [], a = smap.tripDataEncoder.dec(a), c = a.length, h = 0; h < c; h++) {
        var j = a[h][0], k = a[h][1];
        0 < a[h][2] && b.push([j, k])
    }
    return b
}
function saveTrip() {
    return serializeTrip(userItinerary)
}
function loadTrip(a) {
    a = unSerializeTrip(a);
    null !== a && 0 < a.length && (userItinerary = a, tripStartLat = a[0].latitude, tripStartLng = a[0].longitude, placeStartMarker(), updateItemCount(), hideRoute(), postprocessRoute(userItinerary))
};var ITEM_PROXIMITY = 400, MAX_BUNDLE_SIZE = 3, BUNDLED_TIME = 0.1, BUNDLED_SCORE = 0.5, BUNDLE_LINK = 0.1;
function createItemBundlesSimple(a, b) {
    return createItemBundles(a, a, b)
}
function createItemBundles(a, b, c) {
    for (var h = addLatitude(0, ITEM_PROXIMITY), j = a.length, k = b.length, m = [], q = null, r = 0; r < j; r++) {
        for (var n = a[r], u = addLongitude(0, ITEM_PROXIMITY, n.latitude),
                 t = 0; t < k; t++)!samePOI(n.origin, b[t].origin) && isBundleCandidate(n, b[t], u, h, c) && (null === q && (q = createBundle(n)), addItemToBundle(q, b[t], compareScore));
        null !== q && (m.push(q), q = null)
    }
    return a.concat(m)
}
function createBundle(a) {
    var b = smap.recommender.copyResultAtom(a);
    b.origin = [a];
    return b
}
function isBundleCandidate(a, b, c, h, j) {
    return Math.abs(a.latitude - b.latitude) > h ? !1 : Math.abs(a.longitude - b.longitude) > c ? !1 : a.score <= b.score ? !1 : j && isBlacklisted(b, j) ? !1 : !0
}
function isBlacklisted(a, b) {
    for (var c = b.length, h = 0; h < c; h++)if (a.origin.rtype == b[h])return !0;
    return !1
}
function compareScore(a, b) {
    return a.score > b.score
}
function addItemToBundle(a, b, c) {
    for (var h = a.origin.length, j = 1; j < h && !c(b, a.origin[j]); j++);
    if (h >= MAX_BUNDLE_SIZE) {
        if (j >= h)return;
        c = a.origin.pop();
        a.score += c.score * BUNDLED_SCORE;
        a.duration += c.duration * BUNDLED_TIME + BUNDLE_LINK
    }
    a.origin.splice(j, 0, b);
    a.score += b.score * BUNDLED_SCORE;
    a.duration += b.duration * BUNDLED_TIME + BUNDLE_LINK
}
function isBundle(a) {
    return "[object Array]" === Object.prototype.toString.call(a.origin) ? !0 : !1
}
function itemAsList(a) {
    return isBundle(a) ? a.origin : [a]
}
function checkBundleOverlap(a, b) {
    for (var c = itemAsList(a), h = itemAsList(b), j = c.length, k = h.length,
             m = 0; m < j; m++)for (var q = 0; q < k; q++)if (c[m] == h[q])return !0;
    return !1
}
function extractItemBundles(a, b, c) {
    for (var a = smap.recommender.copyResult(a), h = 0; h < a.length;)if (isBundle(a[h])) {
        var j = a[h];
        smap.recommender.removeItem(j, a, h, b);
        for (var k = 0; k < j.origin.length; k++) {
            var m = j.origin[k];
            m.h = null;
            0 < k && (m.duration *= BUNDLED_TIME);
            if (smap.recommender.testCandPositionH(m, a, h, b, c)) smap.recommender.insertItem(m, a), h++; else break
        }
    } else h++;
    return a
}
function bundledItemTypes(a) {
    for (var b = [], a = itemAsList(a), c = a.length, h = 0; h < c; h++)b.push(a[h].origin.rtype);
    return b
};var smap = smap || {};
smap.recommender = function () {
    function a(a, b) {
        var j = a.length;
        return 0 < j ? a[j - 1].end > b - 0.5 ? !0 : !1 : !1
    }

    var b = {
        makeDaytripSimple: function (a, h, j, k, m, q) {
            return b.makeDaytrip(a, h, j, k, m, function (a, b) {
                return a == b
            }, function (a) {
                return a
            }, function (a) {
                return [a.origin.rtype]
            }, q)
        }, makeDaytrip: function (c, h, j, k, m, q, r, n, u, t, w) {
            for (var A = travelArea(h, j, null, null, DEFAULT_TRAVEL_SPEED, u), N = [], D = 0,
                     J = c.length; 25 > N.length && D < J;)0 != wnPnPoly({
                x: c[D].lng,
                y: c[D].lat
            }, A) && N.push(m(c[D])), D++;
            c = r(N);
            m = null;
            N = A = r = 0;
            for (D = RECOMMENDER_MAX_ITERS; A <
            D && A < N + RECOMMENDER_TRY_ITERS;) {
                var J = c, z = h, E = j, H = k, B = q, R = n, T = u, Q = t, C = w, p = A ? 0.5 : 0, s = void 0, K = [],
                    G = [];
                for (itemtype in C)isNaN(1 * C[itemtype]) || (G[itemtype] = C[itemtype]);
                for (s = null === Q || void 0 === Q || 0 == Q.length ? b.initItinerary(z, E, null, null) : b.copyResult(Q); !a(s, T);) {
                    var z = J, E = B, C = p, Q = K, v = void 0, v = z, I = s, M = H, F = R, L = T, aa = G, xa = null,
                        Ua = 0, ya = v.length;
                    if (0 < ya)for (var U = 0; U < ya; U++) {
                        var ra = null, ga;
                        if (!(ga = !aa))a:{
                            ga = aa;
                            for (var ba = F(v[U]), Va = ba.length, za = 0; za < Va; za++) {
                                var Aa = ba[za];
                                if (Aa && void 0 !== ga[Aa] && 0 >= ga[Aa]) {
                                    ga =
                                        !1;
                                    break a
                                }
                            }
                            ga = !0
                        }
                        ga ? ra = b.updateH(v[U], I, M, L) : v[U].h = null;
                        if (null != ra && (null == xa || Ua < ra)) xa = v[U], Ua = ra
                    }
                    v = xa;
                    if (null != v) {
                        if (0 < C) {
                            v = z;
                            I = v.length;
                            M = [];
                            F = aa = null;
                            for (L = 0; L < I; L++)null !== v[L].h && (null === aa ? (aa = v[L].h, F = v[L].h) : (v[L].h > F && (F = v[L].h), v[L].h < aa && (aa = v[L].h)));
                            if (null !== aa) {
                                C = aa + C * (F - aa);
                                C > F && (C = F);
                                for (L = 0; L < I; L++)v[L].h >= C && M.push(v[L])
                            }
                            C = M;
                            v = Math.floor(Math.random() * C.length);
                            v = C[v]
                        }
                        for (C = z.length - 1; 0 <= C; C--)(v == z[C] || E(v, z[C])) && Q.push(z.splice(C, 1)[0])
                    }
                    E = v;
                    if (null != E) {
                        b.insertItem(b.copyResultAtom(E),
                            s);
                        z = G;
                        E = R(E);
                        Q = E.length;
                        for (C = 0; C < Q; C++)(v = E[C]) && void 0 !== z[v] && z[v]--
                    } else break
                }
                for (; K.length;)J.push(K.pop());
                H = J = s;
                B = void 0;
                R = H.length;
                for (B = K = s = p = T = 0; B < R; B++)b.isMeta(H[B]) || (weighted_link = H[B].distance / (1E3 * DEFAULT_TRAVEL_SPEED), K += H[B].duration + weighted_link, p += H[B].duration, s += H[B].score, T += 1);
                H = s / T * (p / K);
                if (null == m || H > r) m = J, r = H, N = A;
                A++
            }
            return m
        }, resultAtom: function (a, b, j, k, m, q, r) {
            return {
                title: j,
                latitude: a,
                longitude: b,
                score: k,
                h: 0,
                duration: m,
                start: 0,
                end: 0,
                shift: 0,
                idx: q,
                origin: r,
                mode: null,
                nextmode: null,
                distance: 0,
                nextdist: 0
            }
        }, copyResultAtom: function (a) {
            return {
                title: a.title,
                latitude: a.latitude,
                longitude: a.longitude,
                score: a.score,
                h: a.h,
                duration: a.duration,
                start: a.start,
                end: a.end,
                shift: a.shift,
                idx: a.idx,
                origin: a.origin,
                mode: a.mode,
                nextmode: a.nextmode,
                distance: a.distance,
                nextdist: a.nextdist
            }
        }, makeMeta: function (a, h, j, k) {
            return b.resultAtom(a, h, j, 0, 0, k, null)
        }, isMeta: function (a) {
            return 0 >= a.duration ? !0 : !1
        }, initItinerary: function (a, h, j, k) {
            var m = [];
            b.insertItem(b.makeMeta(a, h, "Start", 0), m);
            null != j && null != k && b.insertItem(b.makeMeta(j, k, "End", 1), m);
            return m
        }, insertItem: function (a, b) {
            var j;
            for (j = a.idx; j < b.length; j++)b[j].start += a.shift, b[j].end += a.shift;
            a.idx < b.length && (b[a.idx].mode = a.nextmode, b[a.idx].distance = a.nextdist);
            b.splice(a.idx, 0, a)
        }, removeItem: function (a, b, j, k) {
            var m;
            a.idx = j;
            a.shift = a.end - b[j - 1].end;
            j + 1 < b.length && (m = b[j + 1], j = k(b[j - 1], m), a.shift += m.start - a.end - j.travelTime, a.nextmode = m.mode, m.mode = j.travelMode);
            b.splice(a.idx, 1);
            for (m = a.idx; m < b.length; m++)b[m].start -= a.shift,
                b[m].end -= a.shift
        }, replaceStartLocation: function (a, b, j, k, m) {
            var q = b.length;
            if (1 < q) {
                var r = b[1], n = j(a, r), j = n.travelTime - (r.start - b[0].end), k = k - b[q - 1].end;
                if (!m && j > k)return !1;
                r.mode = n.travelMode;
                for (m = 1; m < q; m++)b[m].start += j, b[m].end += j
            }
            0 < q && b.splice(0, 1, a);
            return !0
        }, copyResult: function (a) {
            for (var h = [], j = a.length, k = 0; k < j; k++)h.push(b.copyResultAtom(a[k]));
            return h
        }, isEmptyItinerary: function (a) {
            for (var h = a.length, j = 0; j < h; j++)if (!b.isMeta(a[j]))return !1;
            return !0
        }, testCandPositionH: function (a, b, j, k, m, q) {
            var r,
                n = b[j - 1], u = k(n, a);
            r = u.travelTime + a.duration;
            var t = u.distance / (1E3 * DEFAULT_TRAVEL_SPEED) + a.duration, w = null, A = 0;
            if (j < b.length) {
                var N = b[j], A = k(a, N);
                r += A.travelTime;
                t += A.distance / (1E3 * DEFAULT_TRAVEL_SPEED);
                w = A.travelMode;
                A = A.distance;
                if (0 < j) {
                    var k = b[j - 1], D = N.start - k.end;
                    r -= N.start - k.end;
                    "WALKING" == N.mode && (D *= DEFAULT_WALKING_SPEED / DEFAULT_TRAVEL_SPEED);
                    t -= D
                }
            }
            q || (0 < j && 0 >= b[j - 1].duration && "End" == b[j - 1].title ? q = !1 : j < b.length && 0 >= b[j].duration && "Start" == b[j].title ? q = !1 : (q = b.length, q = r <= (0 < q ? m - b[q - 1].end :
                m) ? !0 : !1));
            return q && (b = a.score * (m / t), null === a.h || b > a.h) ? (a.h = b, n = n.end, a.idx = j, a.start = n + u.travelTime, a.end = a.start + a.duration, a.shift = r, a.mode = u.travelMode, a.nextmode = w, a.distance = u.distance, a.nextdist = A, !0) : !1
        }, updateH: function (a, h, j, k, m) {
            var q = h.length + 1;
            a.h = null;
            for (var r = 1; r < q; r++)b.testCandPositionH(a, h, r, j, k, m);
            return a.h
        }
    };
    return b
}();
var distCache = {data: [], service: new google.maps.DistanceMatrixService, travelMode: google.maps.TravelMode.DRIVING};
function updateItineraryWithDistCache(a, b, c, h) {
    a = {chainedParams: h, chainedFunc: c, origins: itineraryToLatLng([a]), destinations: itineraryToLatLng(b)};
    if (smap.recommender.isEmptyItinerary(b) && 1 < b.length) {
        b = a.destinations.length - 1;
        for (c = 0; c < b; c++)a.origins.push(a.destinations[c]);
        a.destinations.splice(0, 1);
        a.destinations.push(a.origins[0])
    }
    callDistService(a)
}
function travelTimeCached(a, b, c, h) {
    var j = distCache.travelMode, k = checkDistCache(a.latitude, a.longitude, b.latitude, b.longitude), m;
    null === k || null === k.travel ? (null === k || null === k.distance ? (m = distanceFlat(a.latitude, a.longitude, b.latitude, b.longitude), j = null === k ? h : "UNKNOWN") : m = k.distance, c = m / (1E3 * c), distCache.travelMode == j && updDistCache(a.latitude, a.longitude, b.latitude, b.longitude, c, m, !1)) : (c = k.travel, m = k.distance);
    return {travelTime: c, travelMode: j, distance: m}
}
function findChainElem(a, b, c) {
    for (var h = a.length, j = null, k = 0; k < h; k++)if (sameCoord(b, c, a[k].latitude, a[k].longitude)) {
        j = a[k];
        break
    }
    return j
}
function findSubChain(a, b, c) {
    a = findChainElem(a, b, c);
    return null == a ? null : a.chain
}
function checkDistCache(a, b, c, h) {
    a = findSubChain(distCache.data, a, b);
    return null != a ? findChainElem(a, c, h) : null
}
function updDistCacheEntry(a, b, c, h, j, k) {
    var m = findSubChain(distCache.data, a, b);
    if (null == m) m = [], distCache.data.push({
        latitude: a,
        longitude: b,
        chain: m
    }); else if (a = findChainElem(m, c, h), null != a) {
        a.travel = j;
        a.distance = k;
        return
    }
    m.push({latitude: c, longitude: h, travel: j, distance: k})
}
function updDistCache(a, b, c, h, j, k, m) {
    sameCoord(a, b, c, h) || (updDistCacheEntry(a, b, c, h, j, k), m && updDistCacheEntry(c, h, a, b, j, k))
}
function distservUpdateCache(a, b, c) {
    for (var h = a.originAddresses.length, j = 0; j < h; j++)for (var k = a.rows[j].elements, m = k.length,
                                                                      q = 0; q < m; q++)if ("OK" == k[q].status) {
        var r = k[q].distance.value, n = k[q].duration.value / 3600;
        updDistCache(b[j].lat(), b[j].lng(), c[q].lat(), c[q].lng(), n, r, !0)
    } else updDistCache(b[j].lat(), b[j].lng(), c[q].lat(), c[q].lng(), null, null, !0)
}
function distservCallback(a, b, c) {
    b == google.maps.DistanceMatrixStatus.OK && distservUpdateCache(a, c.origins, c.destinations);
    c.chainedFunc(c.chainedParams)
}
function itineraryToLatLng(a) {
    for (var b = [], c = a.length, h = 0; h < c; h++)b.push(new google.maps.LatLng(a[h].latitude, a[h].longitude));
    return b
}
function callDistService(a) {
    distCache.service.getDistanceMatrix({
        origins: a.origins,
        destinations: a.destinations,
        travelMode: distCache.travelMode,
        avoidHighways: !1,
        avoidTolls: !1
    }, function (b, c) {
        distservCallback(b, c, a)
    })
};var EARTH_RADIUS = 6371009;
function distanceFlat(a, b, c, h) {
    var j;
    j = a * Math.PI / 180 - c * Math.PI / 180;
    b = b * Math.PI / 180 - h * Math.PI / 180;
    a = (a + c) * Math.PI / 360;
    return EARTH_RADIUS * Math.pow(Math.pow(j, 2) + Math.pow(Math.cos(a) * b, 2), 0.5)
}
function distanceSpherical(a, b, c, h) {
    var j = Math.PI * (c - a) / 180, b = Math.PI * (h - b) / 180, a = Math.PI * a / 180, c = Math.PI * c / 180,
        j = Math.sin(j / 2) * Math.sin(j / 2) + Math.cos(a) * Math.cos(c) * Math.sin(b / 2) * Math.sin(b / 2),
        j = 2 * Math.atan2(Math.sqrt(j), Math.sqrt(1 - j));
    return EARTH_RADIUS * j
}
function addLatitude(a, b) {
    return a + 180 * (b / EARTH_RADIUS) / Math.PI
}
function addLongitude(a, b, c) {
    return a + 180 * (b / (EARTH_RADIUS * Math.cos(c * Math.PI / 180))) / Math.PI
}
function latDistance(a) {
    return EARTH_RADIUS * (a * Math.PI / 180)
}
function longDistance(a, b) {
    return EARTH_RADIUS * (a * Math.PI / 180) * Math.cos(b * Math.PI / 180)
}
function travelArea(a, b, c, h, j, k) {
    var m = {}, q = {};
    m.x = b;
    m.y = a;
    null != c && null != h ? (q.x = h, q.y = c) : (q.x = m.x, q.y = m.y);
    a = 1E3 * k * j;
    1E7 < a && (a = 1E7);
    return travelAreaPoly(m, q, a)
}
function travelAreaPoly(a, b, c) {
    var h, j, k = distanceFlat(a.y, a.x, b.y, b.x) / 2, m, q, r, n, u = [];
    h = c / 4;
    k > h && (h = k);
    j = Math.sqrt(h * h - k * k);
    k / 4 > j && (j = k / 4);
    c = (a.x + b.x) / 2;
    m = (a.y + b.y) / 2;
    1 > k ? (q = r = 0, a = b = h / Math.sqrt(2), h = k = j / Math.sqrt(2)) : (q = longDistance(Math.abs(a.x - c), m), r = latDistance(Math.abs(a.y - m)), n = a.x >= b.x ? a.y >= b.y ? -1 : 1 : a.y < b.y ? -1 : 1, a = q * (h - k) / k, b = r * (h - k) / k, h = r * j / k, r *= n, b *= n, k = n * (q * j / k));
    u.push({x: addLongitude(c, -q - a + h, m), y: addLatitude(m, r + b + k)});
    u.push({x: addLongitude(c, -q - a - h, m), y: addLatitude(m, r + b - k)});
    u.push({
        x: addLongitude(c,
            q + a - h, m), y: addLatitude(m, -r - b - k)
    });
    u.push({x: addLongitude(c, q + a + h, m), y: addLatitude(m, -r - b + k)});
    u.push({x: u[0].x, y: u[0].y});
    return u
}
function isLeft(a, b, c) {
    return (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y)
}
function wnPnPoly(a, b) {
    var c = 0, h, j = b.length - 1;
    for (h = 0; h < j; h++)b[h].y <= a.y ? b[h + 1].y > a.y && 0 < isLeft(b[h], b[h + 1], a) && ++c : b[h + 1].y <= a.y && 0 > isLeft(b[h], b[h + 1], a) && --c;
    return c
};smap = smap || {};
smap.tripDataEncoder = function () {
    function a(a) {
        var m = [];
        m.push(b(h(a[0]), w));
        m.push(b(c(a[1]), A));
        m.push(b(j(a[2]), N));
        m.push(b(k(a[3]), D));
        return m.join("")
    }

    function b(a, b) {
        for (var c = [], h = a, j = 0; j < b; j++) {
            var k = Math.pow(T, b - 1 - j), m = h / k | 0, h = h - m * k;
            if (m > T - 1)throw Error("encint(): integer too large to encode");
            c.push(R[m])
        }
        return c.join("")
    }

    function c(a) {
        for (; 180 <= a;)a -= 180;
        for (; -180 >= a;)a += 180;
        return (a + 180) / 360 * C | 0
    }

    function h(a) {
        90 <= a && (a = 180 - a);
        -90 >= a && (a = -180 + a);
        return (a + 90) / 180 * Q | 0
    }

    function j(a) {
        if (0.0166 > a)return 0;
        if (0.166 >= a)return 60 * a | 0;
        if (1 > a)return 10 + 12 * (a - 0.166) | 0;
        if (2 > a)return 21 + 6 * (a - 1) | 0;
        if (5 > a)return 27 + 4 * (a - 2) | 0;
        if (10 > a)return 39 + 2 * (a - 5) | 0;
        a = 49 + (a - 10) | 0;
        a >= p && (a = p - 1);
        return a
    }

    function k(a) {
        var b = 0;
        "WALKING" == a && (b |= 1);
        return b
    }

    function m(a) {
        var b = [], c = a.slice(J, z), h = a.slice(z, E), j = a.slice(E, H), a = a.slice(H, B);
        b.push(n(q(c, w)));
        b.push(r(q(h, A)));
        b.push(u(q(j, N)));
        c = "DRIVING";
        q(a, D) & 1 && (c = "WALKING");
        b.push(c);
        return b
    }

    function q(a, b) {
        for (var c = 0, h = 0; h < b; h++)c += R.indexOf(a[h]) * Math.pow(T, b - 1 - h);
        return c
    }

    function r(a) {
        return 360 * (a / C) - 180
    }

    function n(a) {
        return 180 * (a / Q) - 90
    }

    function u(a) {
        return 0 == a ? 0 : 10 > a ? a / 60 : 21 > a ? (a - 10) / 12 + 0.166 : 27 > a ? (a - 21) / 6 + 1 : 39 > a ? (a - 27) / 4 + 2 : 49 > a ? (a - 39) / 2 + 5 : a - 39
    }

    var t = {}, w = 5, A = 5, N = 1, D = 1, J = 0, z = J + w, E = z + A, H = E + N, B = H + D, R;
    R = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.~{}|"`^<>';
    var T = R.length, Q = Math.pow(T, w), C = Math.pow(T, A), p = Math.pow(T, N);
    Math.pow(T, D);
    t.enc = function (b) {
        for (var c = [], h = 0; h < b.length; h++)c.push(a(b[h]));
        return "1" + c.join("")
    };
    t.dec = function (a) {
        var b =
            [];
        if ("1" == a[0])for (var c = 1,
                                 h = a.slice(c, c + B); h.length == B;)b.push(m(h)), c += B, h = a.slice(c, c + B);
        return b
    };
    return t
}();
eval(function (a, b, c, h, j, k) {
    j = function (a) {
        return (a < b ? "" : j(parseInt(a / b))) + (35 < (a %= b) ? String.fromCharCode(a + 29) : a.toString(36))
    };
    if (!"".replace(/^/, String)) {
        for (; c--;)k[j(c)] = h[c] || j(c);
        h = [function (a) {
            return k[a]
        }];
        j = function () {
            return "\\w+"
        };
        c = 1
    }
    for (; c--;)h[c] && (a = a.replace(RegExp("\\b" + j(c) + "\\b", "g"), h[c]));
    return a
}('6 8(a){a=a||{};9.p.1O.2h(2,33);2.M=a.1s||"";2.1A=a.1n||G;2.Y=a.1F||0;2.E=a.1y||1e 9.p.1V(0,0);2.z=a.X||1e 9.p.2x(0,0);2.T=a.S||t;2.1k=a.1j||"2d";2.1i=a.D||{};2.1C=a.1B||"35";2.K=a.1g||"31://2W.9.2Q/2J/2I/2G/1v.2D";3(a.1g===""){2.K=""}2.17=a.1x||1e 9.p.1V(1,1);2.V=a.1o||G;2.16=a.1m||G;2.1J=a.2j||"2g";2.14=a.1q||G;2.4=t;2.w=t;2.P=t;2.O=t;2.B=t;2.N=t}8.q=1e 9.p.1O();8.q.24=6(){5 i;5 f;5 a;5 d=2;5 c=6(e){e.21=Z;3(e.15){e.15()}};5 b=6(e){e.2Z=G;3(e.1Y){e.1Y()}3(!d.14){c(e)}};3(!2.4){2.4=1f.2P("2M");2.1d();3(s 2.M.1r==="r"){2.4.L=2.F()+2.M}v{2.4.L=2.F();2.4.1a(2.M)}2.2C()[2.1J].1a(2.4);2.1z();3(2.4.7.C){2.N=Z}v{3(2.Y!==0&&2.4.W>2.Y){2.4.7.C=2.Y;2.4.7.2z="2w";2.N=Z}v{a=2.1N();2.4.7.C=(2.4.W-a.Q-a.13)+"12";2.N=G}}2.1p(2.1A);3(!2.14){2.B=[];f=["2p","1L","2o","2n","1K","2m","2l","2k","2i"];1l(i=0;i<f.1I;i++){2.B.1H(9.p.u.19(2.4,f[i],c))}2.B.1H(9.p.u.19(2.4,"1L",6(e){2.7.1G="2f"}))}2.O=9.p.u.19(2.4,"2e",b);9.p.u.R(2,"2c")}};8.q.F=6(){5 a="";3(2.K!==""){a="<2b";a+=" 2a=\'"+2.K+"\'";a+=" 29=13";a+=" 7=\'";a+=" X: 28;";a+=" 1G: 27;";a+=" 26: "+2.1C+";";a+="\'>"}J a};8.q.1z=6(){5 a;3(2.K!==""){a=2.4.3d;2.w=9.p.u.19(a,\'1K\',2.25())}v{2.w=t}};8.q.25=6(){5 a=2;J 6(e){e.21=Z;3(e.15){e.15()}9.p.u.R(a,"3c");a.1v()}};8.q.1p=6(d){5 m;5 n;5 e=0,H=0;3(!d){m=2.3a();3(m 39 9.p.38){3(!m.23().37(2.z)){m.36(2.z)}n=m.23();5 a=m.34();5 h=a.W;5 f=a.22;5 k=2.E.C;5 l=2.E.1h;5 g=2.4.W;5 b=2.4.22;5 i=2.17.C;5 j=2.17.1h;5 o=2.20().32(2.z);3(o.x<(-k+i)){e=o.x+k-i}v 3((o.x+g+k+i)>h){e=o.x+g+k+i-h}3(2.16){3(o.y<(-l+j+b)){H=o.y+l-j-b}v 3((o.y+l+j)>f){H=o.y+l+j-f}}v{3(o.y<(-l+j)){H=o.y+l-j}v 3((o.y+b+l+j)>f){H=o.y+b+l+j-f}}3(!(e===0&&H===0)){5 c=m.30();m.2Y(e,H)}}}};8.q.1d=6(){5 i,D;3(2.4){2.4.2X=2.1k;2.4.7.2V="";D=2.1i;1l(i 2U D){3(D.2R(i)){2.4.7[i]=D[i]}}3(s 2.4.7.18!=="r"&&2.4.7.18!==""){2.4.7.2O="2N(18="+(2.4.7.18*2L)+")"}2.4.7.X="2K";2.4.7.11=\'1u\';3(2.T!==t){2.4.7.S=2.T}}};8.q.1N=6(){5 c;5 a={1c:0,1b:0,Q:0,13:0};5 b=2.4;3(1f.1t&&1f.1t.1W){c=b.2H.1t.1W(b,"");3(c){a.1c=A(c.1U,10)||0;a.1b=A(c.1T,10)||0;a.Q=A(c.1X,10)||0;a.13=A(c.1S,10)||0}}v 3(1f.2F.I){3(b.I){a.1c=A(b.I.1U,10)||0;a.1b=A(b.I.1T,10)||0;a.Q=A(b.I.1X,10)||0;a.13=A(b.I.1S,10)||0}}J a};8.q.2E=6(){3(2.4){2.4.2S.2T(2.4);2.4=t}};8.q.1E=6(){2.24();5 a=2.20().2B(2.z);2.4.7.Q=(a.x+2.E.C)+"12";3(2.16){2.4.7.1b=-(a.y+2.E.1h)+"12"}v{2.4.7.1c=(a.y+2.E.1h)+"12"}3(2.V){2.4.7.11=\'1u\'}v{2.4.7.11="1R"}};8.q.2A=6(a){3(s a.1j!=="r"){2.1k=a.1j;2.1d()}3(s a.D!=="r"){2.1i=a.D;2.1d()}3(s a.1s!=="r"){2.1Q(a.1s)}3(s a.1n!=="r"){2.1A=a.1n}3(s a.1F!=="r"){2.Y=a.1F}3(s a.1y!=="r"){2.E=a.1y}3(s a.1m!=="r"){2.16=a.1m}3(s a.X!=="r"){2.1w(a.X)}3(s a.S!=="r"){2.1P(a.S)}3(s a.1B!=="r"){2.1C=a.1B}3(s a.1g!=="r"){2.K=a.1g}3(s a.1x!=="r"){2.17=a.1x}3(s a.1o!=="r"){2.V=a.1o}3(s a.1q!=="r"){2.14=a.1q}3(2.4){2.1E()}};8.q.1Q=6(a){2.M=a;3(2.4){3(2.w){9.p.u.U(2.w);2.w=t}3(!2.N){2.4.7.C=""}3(s a.1r==="r"){2.4.L=2.F()+a}v{2.4.L=2.F();2.4.1a(a)}3(!2.N){2.4.7.C=2.4.W+"12";3(s a.1r==="r"){2.4.L=2.F()+a}v{2.4.L=2.F();2.4.1a(a)}}2.1z()}9.p.u.R(2,"2y")};8.q.1w=6(a){2.z=a;3(2.4){2.1E()}9.p.u.R(2,"1Z")};8.q.1P=6(a){2.T=a;3(2.4){2.4.7.S=a}9.p.u.R(2,"2v")};8.q.2u=6(){J 2.M};8.q.1D=6(){J 2.z};8.q.2t=6(){J 2.T};8.q.2s=6(){2.V=G;3(2.4){2.4.7.11="1R"}};8.q.2r=6(){2.V=Z;3(2.4){2.4.7.11="1u"}};8.q.2q=6(c,b){5 a=2;3(b){2.z=b.1D();2.P=9.p.u.3b(b,"1Z",6(){a.1w(2.1D())})}2.1M(c);3(2.4){2.1p()}};8.q.1v=6(){5 i;3(2.w){9.p.u.U(2.w);2.w=t}3(2.B){1l(i=0;i<2.B.1I;i++){9.p.u.U(2.B[i])}2.B=t}3(2.P){9.p.u.U(2.P);2.P=t}3(2.O){9.p.u.U(2.O);2.O=t}2.1M(t)};',
    62, 200, "  this if div_ var function style InfoBox google                maps prototype undefined typeof null event else closeListener_   position_ parseInt eventListeners_ width boxStyle pixelOffset_ getCloseBoxImg_ false yOffset currentStyle return closeBoxURL_ innerHTML content_ fixedWidthSet_ contextListener_ moveListener_ left trigger zIndex zIndex_ removeListener isHidden_ offsetWidth position maxWidth_ true  visibility px right enableEventPropagation_ stopPropagation alignBottom_ infoBoxClearance_ opacity addDomListener appendChild bottom top setBoxStyle_ new document closeBoxURL height boxStyle_ boxClass boxClass_ for alignBottom disableAutoPan isHidden panBox_ enableEventPropagation nodeType content defaultView hidden close setPosition infoBoxClearance pixelOffset addClickHandler_ disableAutoPan_ closeBoxMargin closeBoxMargin_ getPosition draw maxWidth cursor push length pane_ click mouseover setMap getBoxWidths_ OverlayView setZIndex setContent visible borderRightWidth borderBottomWidth borderTopWidth Size getComputedStyle borderLeftWidth preventDefault position_changed getProjection cancelBubble offsetHeight getBounds createInfoBoxDiv_ getCloseClickHandler_ margin pointer relative align src img domready infoBox contextmenu default floatPane apply touchmove pane touchend touchstart dblclick mouseup mouseout mousedown open hide show getZIndex getContent zindex_changed auto LatLng content_changed overflow setOptions fromLatLngToDivPixel getPanes gif onRemove documentElement mapfiles ownerDocument en_us intl absolute 100 div alpha filter createElement com hasOwnProperty parentNode removeChild in cssText www className panBy returnValue getCenter http fromLatLngToContainerPixel arguments getDiv 2px setCenter contains Map instanceof getMap addListener closeclick firstChild".split(" "),
    0, {}));
(function (a) {
    var b, c = a();
    a.fn.sortable = function (h) {
        var j = String(h), h = a.extend({connectWith: !1}, h);
        return this.each(function () {
            if (/^enable|disable|destroy$/.test(j)) {
                var k = a(this).children(a(this).data("items")).attr("draggable", "enable" == j);
                "destroy" == j && k.add(this).removeData("connectWith items").off("dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s")
            } else {
                var m, q, k = a(this).children(h.items),
                    r = a("<" + (/^ul|ol$/i.test(this.tagName) ? "li" : "div") + ' class="sortable-placeholder">');
                k.find(h.handle).mousedown(function () {
                    m = !0
                }).mouseup(function () {
                    m = !1
                });
                a(this).data("items", h.items);
                c = c.add(r);
                h.connectWith && a(h.connectWith).add(this).data("connectWith", h.connectWith);
                k.attr("draggable", "true").on("dragstart.h5s", function (c) {
                    if (h.handle && !m)return !1;
                    m = !1;
                    c = c.originalEvent.dataTransfer;
                    c.effectAllowed = "move";
                    c.setData("Text", "dummy");
                    q = (b = a(this)).addClass("sortable-dragging").index()
                }).on("dragend.h5s", function () {
                    b.removeClass("sortable-dragging").show();
                    c.detach();
                    q != b.index() &&
                    k.parent().trigger("sortupdate", {item: b, idx: q});
                    b = null
                }).not("a[href], img").on("selectstart.h5s", function () {
                    this.dragDrop && this.dragDrop();
                    return !1
                }).end().add([this, r]).on("dragover.h5s dragenter.h5s drop.h5s", function (j) {
                    if (!k.is(b) && h.connectWith !== a(b).parent().data("connectWith"))return !0;
                    if ("drop" == j.type)return j.stopPropagation(), c.filter(":visible").after(b), !1;
                    j.preventDefault();
                    j.originalEvent.dataTransfer.dropEffect = "move";
                    k.is(this) ? (h.forcePlaceholderSize && r.height(b.outerHeight()),
                        b.hide(), a(this)[r.index() < a(this).index() ? "after" : "before"](r), c.not(r).detach()) : !c.is(this) && !a(this).children(h.items).length && (c.detach(), a(this).append(r));
                    return !1
                })
            }
        })
    }
})(jQuery);
var TRACKING_CLICK_ALLOWED_DRIFT = 10, TRACKING_MOUSEMOVE_ALLOWED_DRIFT = 20, TRACKING_MOUSEMOVE_WAIT_TIME = 3E3,
    TRACKING_MOUSEMOVE_START_TIME = 500, trackingData = [], trackingTimer = null, trackingSent = !1,
    pageLoadTimestamp = (new Date).getTime(), clickStamp,
    trackingMouseData = {x: 0, y: 0, lastWait: pageLoadTimestamp, timeout: null};
function constructTrackingElData(a) {
    var b = a.tagName.toLowerCase(), c = a.getAttribute("id"),
        h = a.className.trim().replace(/\s+/, " ").split(" ").join(".");
    c && (b += "#" + c);
    h && (b += "." + h);
    a = a.attributes;
    for (c = 0; c < a.length; c++)h = a[c].nodeName, "id" === h || "class" === h || (b += " " + h + '="' + a[c].nodeValue + '"');
    return b
}
function getElementsAtCoordinates(a, b, c) {
    var h = {direct: [], near: []};
    $(".track,a,button,input").each(function () {
        var j = this.getBoundingClientRect(), k = j.left <= a && j.right >= a && j.top <= b && j.bottom >= b,
            m = this.getAttribute("data-track");
        if (k) j = {
            x: j.left,
            y: j.top,
            r: j.right,
            b: j.bottom,
            el: this.outerHTML,
            eldata: constructTrackingElData(this),
            id: m
        }, h.direct.push(j); else if (0 < c) {
            k = j.right + c;
            if (j.left - c > a || k < a)return !0;
            k = j.bottom + c;
            if (j.top - c > b || k < b)return !0;
            j = {
                x: j.left, y: j.top, r: j.right, b: j.bottom, el: this.outerHTML,
                eldata: constructTrackingElData(this), id: m
            };
            h.near.push(j)
        }
    });
    return h
}
$(document).mousedown(function () {
    clickStamp = (new Date).getTime()
});
$(document).mouseup(function (a) {
    a || (a = window.event);
    var b = a.pageX, a = a.pageY, c = TRACKING_CLICK_ALLOWED_DRIFT, h = (new Date).getTime(), j = h - clickStamp,
        c = getElementsAtCoordinates(b, a, c);
    if (c.direct.length || c.near.length) trackingData[trackingData.length] = {
        t: "c",
        x: b,
        y: a,
        ts: h,
        wt: j,
        fbid: fbLoginUid,
        sts: pageLoadTimestamp,
        full: c.direct,
        near: c.near
    }
});
function trackEvent(a) {
    if (!(null == a || "undefined" === typeof a)) {
        var a = "string" === typeof a ? {data: a} : a.slice(), b = (new Date).getTime();
        a.t = "e";
        a.fbId = fbLoginUid;
        a.sts = pageLoadTimestamp;
        a.ts = b;
        trackingData[trackingData.length] = a
    }
}
function saveTrackerData(a) {
    if (0 != trackingData.length) {
        var b = !0;
        a && (b = !1);
        a = 5E3;
        b || (a = 1500);
        var c = JSON.stringify(trackingData);
        trackingData = [];
        $.ajax("code/mylog.php", {data: {data: c}, cache: !1, timeout: a, method: "POST", async: b}).done(function () {
        })
    }
}
$(document).mousemove(function (a) {
    a || (a = window.event);
    var b = a.pageX, c = a.pageY, a = (new Date).getTime();
    b >= trackingMouseData.x - TRACKING_MOUSEMOVE_ALLOWED_DRIFT && b <= trackingMouseData.x + TRACKING_MOUSEMOVE_ALLOWED_DRIFT && c >= trackingMouseData.y - TRACKING_MOUSEMOVE_ALLOWED_DRIFT && c <= trackingMouseData.y + TRACKING_MOUSEMOVE_ALLOWED_DRIFT || (null != trackingMouseData.timeout && (window.clearTimeout(trackingMouseData.timeout), trackingMouseData.timeout = null), trackingMouseData.x = b, trackingMouseData.y = c, trackingMouseData.lastWait =
        a, trackingMouseData.timeout = window.setTimeout(function () {
        if (b >= trackingMouseData.x - TRACKING_MOUSEMOVE_ALLOWED_DRIFT && b <= trackingMouseData.x + TRACKING_MOUSEMOVE_ALLOWED_DRIFT && c >= trackingMouseData.y - TRACKING_MOUSEMOVE_ALLOWED_DRIFT && c <= trackingMouseData.y + TRACKING_MOUSEMOVE_ALLOWED_DRIFT) {
            var a = getElementsAtCoordinates(b, c);
            if (a.direct.length || a.near.length) {
                var j = (new Date).getTime();
                trackingData[trackingData.length] = {
                    t: "w", x: trackingMouseData.x, y: trackingMouseData.y, ts: j, wt: j - trackingMouseData.lastWait,
                    fbid: fbLoginUid, sts: pageLoadTimestamp, full: a.direct, near: a.near
                }
            }
        }
        trackingMouseData.timeout = null
    }, TRACKING_MOUSEMOVE_WAIT_TIME))
});
trackingTimer = window.setInterval(function () {
    saveTrackerData()
}, 3E5);
window.onbeforeunload = function () {
    var a = (new Date).getTime();
    trackingData[trackingData.length] = {t: "x", ts: a, fbid: fbLoginUid, sts: pageLoadTimestamp};
    saveTrackerData(!0)
};
(function () {
    function a(a) {
        for (var b = -1, c = a.length, h = []; ++b < c;)h.push(a[b]);
        return h
    }

    function b() {
        return this
    }

    function c(a, b, c) {
        return function () {
            var h = c.apply(b, arguments);
            return arguments.length ? a : h
        }
    }

    function h(a) {
        return null != a && !isNaN(a)
    }

    function j(a) {
        return a.length
    }

    function k(a) {
        return null == a
    }

    function m(a) {
        return a.replace(/(^\s+)|(\s+$)/g, "").replace(/\s+/g, " ")
    }

    function q() {
    }

    function r(a) {
        function b() {
            for (var h = c, j = -1, ca = h.length, k; ++j < ca;)(k = h[j].on) && k.apply(this, arguments);
            return a
        }

        var c =
            [], h = {};
        b.on = function (b, j) {
            var ca, k;
            if (2 > arguments.length)return (ca = h[b]) && ca.on;
            if (ca = h[b]) ca.on = null, c = c.slice(0, k = c.indexOf(ca)).concat(c.slice(k + 1)), delete h[b];
            j && c.push(h[b] = {on: j});
            return a
        };
        return b
    }

    function n(a, b) {
        return b - (a ? 1 + Math.floor(Math.log(a + Math.pow(10, 1 + Math.floor(Math.log(a) / Math.LN10) - b)) / Math.LN10) : 1)
    }

    function u(a) {
        return a + ""
    }

    function t(a) {
        for (var b = a.lastIndexOf("."), c = 0 <= b ? a.substring(b) : (b = a.length, ""),
                 h = []; 0 < b;)h.push(a.substring(b -= 3, b + 3));
        return h.reverse().join(",") +
            c
    }

    function w(a) {
        return function (b) {
            return 1 - a(1 - b)
        }
    }

    function A(a) {
        return function (b) {
            return 0.5 * (0.5 > b ? a(2 * b) : 2 - a(2 - 2 * b))
        }
    }

    function N(a) {
        return a
    }

    function D(a) {
        return function (b) {
            return Math.pow(b, a)
        }
    }

    function J(a) {
        return 1 - Math.cos(a * Math.PI / 2)
    }

    function z(a) {
        return Math.pow(2, 10 * (a - 1))
    }

    function E(a) {
        return 1 - Math.sqrt(1 - a * a)
    }

    function H(a) {
        return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
    }

    function B() {
        d3.event.stopPropagation();
        d3.event.preventDefault()
    }

    function R(a, b) {
        b = b - (a = +a) ? 1 / (b - a) : 0;
        return function (c) {
            return (c - a) * b
        }
    }

    function T(a, b) {
        b = b - (a = +a) ? 1 / (b - a) : 0;
        return function (c) {
            return Math.max(0, Math.min(1, (c - a) * b))
        }
    }

    function Q(a, b, c) {
        return new C(a, b, c)
    }

    function C(a, b, c) {
        this.r = a;
        this.g = b;
        this.b = c
    }

    function p(a) {
        return 16 > a ? "0" + Math.max(0, a).toString(16) : Math.min(255, a).toString(16)
    }

    function s(a, b, c) {
        var h = 0, j = 0, k = 0, m, p;
        if (m = /([a-z]+)\((.*)\)/i.exec(a))switch (p = m[2].split(","), m[1]) {
            case "hsl":
                return c(parseFloat(p[0]),
                    parseFloat(p[1]) / 100, parseFloat(p[2]) / 100);
            case "rgb":
                return b(G(p[0]), G(p[1]), G(p[2]))
        }
        if (c = Ka[a])return b(c.r, c.g, c.b);
        null != a && "#" === a.charAt(0) && (4 === a.length ? (h = a.charAt(1), h += h, j = a.charAt(2), j += j, k = a.charAt(3), k += k) : 7 === a.length && (h = a.substring(1, 3), j = a.substring(3, 5), k = a.substring(5, 7)), h = parseInt(h, 16), j = parseInt(j, 16), k = parseInt(k, 16));
        return b(h, j, k)
    }

    function K(a, b, c) {
        var h = Math.min(a /= 255, b /= 255, c /= 255), j = Math.max(a, b, c), k = j - h, m = (j + h) / 2;
        k ? (h = 0.5 > m ? k / (j + h) : k / (2 - j - h), a = 60 * (a == j ? (b - c) / k + (b <
                c ? 6 : 0) : b == j ? (c - a) / k + 2 : (a - b) / k + 4)) : h = a = 0;
        return v(a, h, m)
    }

    function G(a) {
        var b = parseFloat(a);
        return "%" === a.charAt(a.length - 1) ? Math.round(2.55 * b) : b
    }

    function v(a, b, c) {
        return new I(a, b, c)
    }

    function I(a, b, c) {
        this.h = a;
        this.s = b;
        this.l = c
    }

    function M(a, b, c) {
        function h(a) {
            360 < a ? a -= 360 : 0 > a && (a += 360);
            return 60 > a ? j + (k - j) * a / 60 : 180 > a ? k : 240 > a ? j + (k - j) * (240 - a) / 60 : j
        }

        var j, k, a = a % 360;
        0 > a && (a += 360);
        b = 0 > b ? 0 : 1 < b ? 1 : b;
        c = 0 > c ? 0 : 1 < c ? 1 : c;
        k = 0.5 >= c ? c * (1 + b) : c + b - c * b;
        j = 2 * c - k;
        return Q(Math.round(255 * h(a + 120)), Math.round(255 * h(a)), Math.round(255 *
            h(a - 120)))
    }

    function F(a) {
        kb(a, P);
        return a
    }

    function L(a) {
        return function () {
            return Wa(a, this)
        }
    }

    function aa(a) {
        return function () {
            return Hb(a, this)
        }
    }

    function xa(a, b) {
        function c() {
            if (b = this.classList)return b.add(a);
            var b = this.className, h = null != b.baseVal, j = h ? b.baseVal : b;
            k.lastIndex = 0;
            k.test(j) || (j = m(j + " " + a), h ? b.baseVal = j : this.className = j)
        }

        function h() {
            if (b = this.classList)return b.remove(a);
            var b = this.className, c = null != b.baseVal, j = c ? b.baseVal : b, j = m(j.replace(k, " "));
            c ? b.baseVal = j : this.className = j
        }

        function j() {
            (b.apply(this,
                arguments) ? c : h).call(this)
        }

        var k = RegExp("(^|\\s+)" + d3.requote(a) + "(\\s+|$)", "g");
        if (2 > arguments.length) {
            var p = this.node();
            if (Ja = p.classList)return Ja.contains(a);
            var Ja = p.className;
            k.lastIndex = 0;
            return k.test(null != Ja.baseVal ? Ja.baseVal : Ja)
        }
        return this.each("function" === typeof b ? j : b ? c : h)
    }

    function Ua(a) {
        arguments.length || (a = d3.ascending);
        return function (b, c) {
            return a(b && b.__data__, c && c.__data__)
        }
    }

    function ya(a, b, c) {
        kb(a, Z);
        var h = {}, j = d3.dispatch("start", "end"), k = qc;
        a.id = b;
        a.time = c;
        a.tween = function (b,
                            c) {
            if (2 > arguments.length)return h[b];
            null == c ? delete h[b] : h[b] = c;
            return a
        };
        a.ease = function (b) {
            if (!arguments.length)return k;
            k = "function" === typeof b ? b : d3.ease.apply(d3, arguments);
            return a
        };
        a.each = function (b, c) {
            if (2 > arguments.length)return ga.call(a, b);
            j.on(b, c);
            return a
        };
        d3.timer(function (m) {
            a.each(function (p, s, n) {
                function q(a) {
                    if (t.active > b)return K();
                    t.active = b;
                    for (var S in h)(S = h[S].call(r, p, s)) && G.push(S);
                    j.start.call(r, p, s);
                    v(a) || d3.timer(v, 0, c);
                    return 1
                }

                function v(a) {
                    if (t.active !== b)return K();
                    for (var a = (a - I) / u, c = k(a), h = G.length; 0 < h;)G[--h].call(r, c);
                    if (1 <= a)return K(), Ca = b, j.end.call(r, p, s), Ca = 0, 1
                }

                function K() {
                    --t.count || delete r.__transition__;
                    return 1
                }

                var G = [], r = this, I = a[n][s].delay, u = a[n][s].duration,
                    t = r.__transition__ || (r.__transition__ = {active: 0, count: 0});
                ++t.count;
                I <= m ? q(m) : d3.timer(q, I, c)
            });
            return 1
        }, 0, c);
        return a
    }

    function U(a, b, c) {
        return "" != c && La
    }

    function ra(a, b) {
        function c(a, h, S) {
            a = b.call(this, a, h);
            return null == a ? "" != S && La : S != a && j(S, a)
        }

        function h(a, c, S) {
            return S != b && j(S, b)
        }

        var j =
            "transform" == a ? d3.interpolateTransform : d3.interpolate;
        return "function" === typeof b ? c : null == b ? U : (b += "", h)
    }

    function ga(a) {
        for (var b = 0, c = this.length; b < c; b++)for (var h = this[b], j = 0, k = h.length; j < k; j++) {
            var m = h[j];
            m && a.call(m = m.node, m.__data__, j, b)
        }
        return this
    }

    function ba() {
        for (var a, b = Date.now(), c = sa; c;)a = b - c.then, a >= c.delay && (c.flush = c.callback(a)), c = c.next;
        a = Va() - b;
        24 < a ? (isFinite(a) && (clearTimeout(Xa), Xa = setTimeout(ba, a)), Ya = 0) : (Ya = 1, Ib(ba))
    }

    function Va() {
        for (var a = null, b = sa, c = Infinity; b;)b.flush ? b = a ?
            a.next = b.next : sa = b.next : (c = Math.min(c, b.then + b.delay), b = (a = b).next);
        return c
    }

    function za(a) {
        var b = [a.a, a.b], c = [a.c, a.d], h = Aa(b), j = b[0] * c[0] + b[1] * c[1], k = -j;
        c[0] += k * b[0];
        c[1] += k * b[1];
        k = Aa(c) || 0;
        b[0] * c[1] < c[0] * b[1] && (b[0] *= -1, b[1] *= -1, h *= -1, j *= -1);
        this.rotate = (h ? Math.atan2(b[1], b[0]) : Math.atan2(-c[0], c[1])) * Jb;
        this.translate = [a.e, a.f];
        this.scale = [h, k];
        this.skew = k ? Math.atan2(j, k) * Jb : 0
    }

    function Aa(a) {
        var b = Math.sqrt(a[0] * a[0] + a[1] * a[1]);
        b && (a[0] /= b, a[1] /= b);
        return b
    }

    function Ma(a) {
        var b = a[0], a = a[a.length -
        1];
        return b < a ? [b, a] : [a, b]
    }

    function Za(a) {
        return a.rangeExtent ? a.rangeExtent() : Ma(a.range())
    }

    function lb(a, b) {
        var c = 0, h = a.length - 1, j = a[c], k = a[h], m;
        k < j && (m = c, c = h, h = m, m = j, j = k, k = m);
        if (m = k - j) b = b(m), a[c] = b.floor(j), a[h] = b.ceil(k);
        return a
    }

    function rc() {
        return Math
    }

    function Kb(a, b, c, h) {
        function j() {
            var da = 2 == a.length ? sc : fa, s = h ? T : R;
            m = da(a, b, s, c);
            p = da(b, a, s, d3.interpolate);
            return k
        }

        function k(a) {
            return m(a)
        }

        var m, p;
        k.invert = function (a) {
            return p(a)
        };
        k.domain = function (b) {
            if (!arguments.length)return a;
            a = b.map(Number);
            return j()
        };
        k.range = function (a) {
            if (!arguments.length)return b;
            b = a;
            return j()
        };
        k.rangeRound = function (a) {
            return k.range(a).interpolate(d3.interpolateRound)
        };
        k.clamp = function (a) {
            if (!arguments.length)return h;
            h = a;
            return j()
        };
        k.interpolate = function (a) {
            if (!arguments.length)return c;
            c = a;
            return j()
        };
        k.ticks = function (b) {
            return d3.range.apply(d3, O(a, b))
        };
        k.tickFormat = function (b) {
            return Lb(a, b)
        };
        k.nice = function () {
            lb(a, Mb);
            return j()
        };
        k.copy = function () {
            return Kb(a, b, c, h)
        };
        return j()
    }

    function Nb(a, b) {
        return d3.rebind(a,
            b, "range", "rangeRound", "interpolate", "clamp")
    }

    function Mb(a) {
        a = Math.pow(10, Math.round(Math.log(a) / Math.LN10) - 1);
        return {
            floor: function (b) {
                return Math.floor(b / a) * a
            }, ceil: function (b) {
                return Math.ceil(b / a) * a
            }
        }
    }

    function O(a, b) {
        var c = Ma(a), h = c[1] - c[0], j = Math.pow(10, Math.floor(Math.log(h / b) / Math.LN10)), h = b / h * j;
        0.15 >= h ? j *= 10 : 0.35 >= h ? j *= 5 : 0.75 >= h && (j *= 2);
        c[0] = Math.ceil(c[0] / j) * j;
        c[1] = Math.floor(c[1] / j) * j + 0.5 * j;
        c[2] = j;
        return c
    }

    function Lb(a, b) {
        return d3.format(",." + Math.max(0, -Math.floor(Math.log(O(a, b)[2]) /
                Math.LN10 + 0.01)) + "f")
    }

    function sc(a, b, c, h) {
        var j = c(a[0], a[1]), k = h(b[0], b[1]);
        return function (a) {
            return k(j(a))
        }
    }

    function fa(a, b, c, h) {
        var j = [], k = [], m = 0, p = a.length - 1;
        a[p] < a[0] && (a = a.slice().reverse(), b = b.slice().reverse());
        for (; ++m <= p;)j.push(c(a[m - 1], a[m])), k.push(h(b[m - 1], b[m]));
        return function (b) {
            var c = d3.bisect(a, b, 1, p) - 1;
            return k[c](j[c](b))
        }
    }

    function X(a, b) {
        function c(h) {
            return a(b(h))
        }

        var h = b.pow;
        c.invert = function (b) {
            return h(a.invert(b))
        };
        c.domain = function (j) {
            if (!arguments.length)return a.domain().map(h);
            b = 0 > j[0] ? ma : Y;
            h = b.pow;
            a.domain(j.map(b));
            return c
        };
        c.nice = function () {
            a.domain(lb(a.domain(), rc));
            return c
        };
        c.ticks = function () {
            var c = Ma(a.domain()), j = [];
            if (c.every(isFinite)) {
                var k = Math.floor(c[0]), ka = Math.ceil(c[1]), m = h(c[0]), c = h(c[1]);
                if (b === ma)for (j.push(h(k)); k++ < ka;)for (var p = 9; 0 < p; p--)j.push(h(k) * p); else {
                    for (; k < ka; k++)for (p = 1; 10 > p; p++)j.push(h(k) * p);
                    j.push(h(k))
                }
                for (k = 0; j[k] < m; k++);
                for (ka = j.length; j[ka - 1] > c; ka--);
                j = j.slice(k, ka)
            }
            return j
        };
        c.tickFormat = function (a, j) {
            2 > arguments.length && (j = tc);
            if (1 > arguments.length)return j;
            var S = a / c.ticks().length, k = b === ma ? (m = -1E-12, Math.floor) : (m = 1E-12, Math.ceil), m;
            return function (a) {
                return a / h(k(b(a) + m)) < S ? j(a) : ""
            }
        };
        c.copy = function () {
            return X(a.copy(), b)
        };
        return Nb(c, a)
    }

    function Y(a) {
        return Math.log(0 > a ? 0 : a) / Math.LN10
    }

    function ma(a) {
        return -Math.log(0 < a ? 0 : -a) / Math.LN10
    }

    function na(a, b) {
        function c(b) {
            return a(h(b))
        }

        var h = $a(b), j = $a(1 / b);
        c.invert = function (b) {
            return j(a.invert(b))
        };
        c.domain = function (b) {
            if (!arguments.length)return a.domain().map(j);
            a.domain(b.map(h));
            return c
        };
        c.ticks = function (a) {
            var b = c.domain();
            return d3.range.apply(d3, O(b, a))
        };
        c.tickFormat = function (a) {
            return Lb(c.domain(), a)
        };
        c.nice = function () {
            return c.domain(lb(c.domain(), Mb))
        };
        c.exponent = function (a) {
            if (!arguments.length)return b;
            var S = c.domain();
            h = $a(b = a);
            j = $a(1 / b);
            return c.domain(S)
        };
        c.copy = function () {
            return na(a.copy(), b)
        };
        return Nb(c, a)
    }

    function $a(a) {
        return function (b) {
            return 0 > b ? -Math.pow(-b, a) : Math.pow(b, a)
        }
    }

    function Ob(a, b) {
        function c(b) {
            return k[((j[b] || (j[b] = a.push(b))) - 1) % k.length]
        }

        function h(b, c) {
            return d3.range(a.length).map(function (a) {
                return b + c * a
            })
        }

        var j, k, m;
        c.domain = function (h) {
            if (!arguments.length)return a;
            a = [];
            j = {};
            for (var k = -1, m = h.length, jb; ++k < m;)if (!j[jb = h[k]]) j[jb] = a.push(jb);
            return c[b.t](b.x, b.p)
        };
        c.range = function (a) {
            if (!arguments.length)return k;
            k = a;
            m = 0;
            b = {t: "range", x: a};
            return c
        };
        c.rangePoints = function (j, p) {
            2 > arguments.length && (p = 0);
            var da = j[0], s = j[1], n = (s - da) / (a.length - 1 + p);
            k = h(2 > a.length ? (da + s) / 2 : da + n * p / 2, n);
            m = 0;
            b = {t: "rangePoints", x: j, p: p};
            return c
        };
        c.rangeBands =
            function (j, p) {
                2 > arguments.length && (p = 0);
                var da = j[0], s = (j[1] - da) / (a.length + p);
                k = h(da + s * p, s);
                m = s * (1 - p);
                b = {t: "rangeBands", x: j, p: p};
                return c
            };
        c.rangeRoundBands = function (j, p) {
            2 > arguments.length && (p = 0);
            var da = j[0], s = j[1], n = Math.floor((s - da) / (a.length + p));
            k = h(da + Math.round((s - da - (a.length - p) * n) / 2), n);
            m = Math.round(n * (1 - p));
            b = {t: "rangeRoundBands", x: j, p: p};
            return c
        };
        c.rangeBand = function () {
            return m
        };
        c.rangeExtent = function () {
            return "range" === b.t ? Ma(b.x) : b.x
        };
        c.copy = function () {
            return Ob(a, b)
        };
        return c.domain(a)
    }

    function Pb(a, b) {
        function c() {
            var k = 0, ka = b.length;
            for (j = []; ++k < ka;)j[k - 1] = d3.quantile(a, k / ka);
            return h
        }

        function h(a) {
            return isNaN(a = +a) ? NaN : b[d3.bisect(j, a)]
        }

        var j;
        h.domain = function (b) {
            if (!arguments.length)return a;
            a = b.filter(function (a) {
                return !isNaN(a)
            }).sort(d3.ascending);
            return c()
        };
        h.range = function (a) {
            if (!arguments.length)return b;
            b = a;
            return c()
        };
        h.quantiles = function () {
            return j
        };
        h.copy = function () {
            return Pb(a, b)
        };
        return c()
    }

    function Qb(a, b, c) {
        function h(b) {
            return c[Math.max(0, Math.min(m, Math.floor(k *
                (b - a))))]
        }

        function j() {
            k = c.length / (b - a);
            m = c.length - 1;
            return h
        }

        var k, m;
        h.domain = function (c) {
            if (!arguments.length)return [a, b];
            a = +c[0];
            b = +c[c.length - 1];
            return j()
        };
        h.range = function (a) {
            if (!arguments.length)return c;
            c = a;
            return j()
        };
        h.copy = function () {
            return Qb(a, b, c)
        };
        return j()
    }

    function uc(a) {
        return a.innerRadius
    }

    function vc(a) {
        return a.outerRadius
    }

    function Rb(a) {
        return a.startAngle
    }

    function Sb(a) {
        return a.endAngle
    }

    function Tb(a) {
        function b(j) {
            return 1 > j.length ? null : "M" + k(a(mb(this, j, c, h)), m)
        }

        var c = nb,
            h = Ub, j = "linear", k = ob[j], m = 0.7;
        b.x = function (a) {
            if (!arguments.length)return c;
            c = a;
            return b
        };
        b.y = function (a) {
            if (!arguments.length)return h;
            h = a;
            return b
        };
        b.interpolate = function (a) {
            if (!arguments.length)return j;
            k = ob[j = a];
            return b
        };
        b.tension = function (a) {
            if (!arguments.length)return m;
            m = a;
            return b
        };
        return b
    }

    function mb(a, b, c, h) {
        var j = [], k = -1, m = b.length, p = "function" === typeof c, s = "function" === typeof h, n;
        if (p && s)for (; ++k < m;)j.push([c.call(a, n = b[k], k), h.call(a, n, k)]); else if (p)for (; ++k < m;)j.push([c.call(a, b[k],
            k), h]); else if (s)for (; ++k < m;)j.push([c, h.call(a, b[k], k)]); else for (; ++k < m;)j.push([c, h]);
        return j
    }

    function nb(a) {
        return a[0]
    }

    function Ub(a) {
        return a[1]
    }

    function oa(a) {
        for (var b = 0, c = a.length, h = a[0], j = [h[0], ",", h[1]]; ++b < c;)j.push("L", (h = a[b])[0], ",", h[1]);
        return j.join("")
    }

    function pb(a) {
        for (var b = 0, c = a.length, h = a[0], j = [h[0], ",", h[1]]; ++b < c;)j.push("V", (h = a[b])[1], "H", h[0]);
        return j.join("")
    }

    function qb(a) {
        for (var b = 0, c = a.length, h = a[0], j = [h[0], ",", h[1]]; ++b < c;)j.push("H", (h = a[b])[0], "V", h[1]);
        return j.join("")
    }

    function ab(a, b) {
        if (1 > b.length || a.length != b.length && a.length != b.length + 2)return oa(a);
        var c = a.length != b.length, h = "", j = a[0], k = a[1], m = b[0], p = m, s = 1;
        c && (h += "Q" + (k[0] - 2 * m[0] / 3) + "," + (k[1] - 2 * m[1] / 3) + "," + k[0] + "," + k[1], j = a[1], s = 2);
        if (1 < b.length) {
            p = b[1];
            k = a[s];
            s++;
            h += "C" + (j[0] + m[0]) + "," + (j[1] + m[1]) + "," + (k[0] - p[0]) + "," + (k[1] - p[1]) + "," + k[0] + "," + k[1];
            for (j = 2; j < b.length; j++, s++)k = a[s], p = b[j], h += "S" + (k[0] - p[0]) + "," + (k[1] - p[1]) + "," + k[0] + "," + k[1]
        }
        c && (c = a[s], h += "Q" + (k[0] + 2 * p[0] / 3) + "," + (k[1] + 2 * p[1] / 3) + "," + c[0] + "," +
            c[1]);
        return h
    }

    function rb(a, b) {
        for (var c = [], h = (1 - b) / 2, j, k = a[0], m = a[1], p = 1,
                 s = a.length; ++p < s;)j = k, k = m, m = a[p], c.push([h * (m[0] - j[0]), h * (m[1] - j[1])]);
        return c
    }

    function Vb(a) {
        if (3 > a.length)return oa(a);
        var b = 1, c = a.length, h = a[0], j = h[0], k = h[1], m = [j, j, j, (h = a[1])[0]], p = [k, k, k, h[1]],
            j = [j, ",", k];
        for (Na(j, m, p); ++b < c;)h = a[b], m.shift(), m.push(h[0]), p.shift(), p.push(h[1]), Na(j, m, p);
        for (b = -1; 2 > ++b;)m.shift(), m.push(h[0]), p.shift(), p.push(h[1]), Na(j, m, p);
        return j.join("")
    }

    function ha(a, b) {
        return a[0] * b[0] + a[1] * b[1] +
            a[2] * b[2] + a[3] * b[3]
    }

    function Na(a, b, c) {
        a.push("C", ha(Wb, b), ",", ha(Wb, c), ",", ha(Xb, b), ",", ha(Xb, c), ",", ha(Da, b), ",", ha(Da, c))
    }

    function sb(a, b) {
        return (b[1] - a[1]) / (b[0] - a[0])
    }

    function Yb(a) {
        for (var b, c = -1, h = a.length, j,
                 k; ++c < h;)b = a[c], j = b[0], k = b[1] + ta, b[0] = j * Math.cos(k), b[1] = j * Math.sin(k);
        return a
    }

    function Zb(a) {
        function b(m) {
            if (1 > m.length)return null;
            var ca = mb(this, m, c, j), m = mb(this, m, c === h ? function (a, b) {
                return ca[b][0]
            } : h, j === k ? function (a, b) {
                return ca[b][1]
            } : k);
            return "M" + p(a(m), n) + "L" + s(a(ca.reverse()),
                    n) + "Z"
        }

        var c = nb, h = nb, j = 0, k = Ub, m, p, s, n = 0.7;
        b.x = function (a) {
            if (!arguments.length)return h;
            c = h = a;
            return b
        };
        b.x0 = function (a) {
            if (!arguments.length)return c;
            c = a;
            return b
        };
        b.x1 = function (a) {
            if (!arguments.length)return h;
            h = a;
            return b
        };
        b.y = function (a) {
            if (!arguments.length)return k;
            j = k = a;
            return b
        };
        b.y0 = function (a) {
            if (!arguments.length)return j;
            j = a;
            return b
        };
        b.y1 = function (a) {
            if (!arguments.length)return k;
            k = a;
            return b
        };
        b.interpolate = function (a) {
            if (!arguments.length)return m;
            p = ob[m = a];
            s = p.reverse || p;
            return b
        };
        b.tension = function (a) {
            if (!arguments.length)return n;
            n = a;
            return b
        };
        return b.interpolate("linear")
    }

    function $b(a) {
        return a.source
    }

    function ac(a) {
        return a.target
    }

    function wc(a) {
        return a.radius
    }

    function bc(a) {
        return [a.x, a.y]
    }

    function cc(a, b) {
        var c = (a.ownerSVGElement || a).createSVGPoint();
        if (0 > tb && (window.scrollX || window.scrollY)) {
            var h = d3.select(document.body).append("svg").style("position", "absolute").style("top", 0).style("left", 0),
                j = h[0][0].getScreenCTM();
            tb = !(j.f || j.e);
            h.remove()
        }
        tb ? (c.x = b.pageX, c.y =
            b.pageY) : (c.x = b.clientX, c.y = b.clientY);
        c = c.matrixTransform(a.getScreenCTM().inverse());
        return [c.x, c.y]
    }

    function xc() {
        return 64
    }

    function yc() {
        return "circle"
    }

    function dc(a, b) {
        a.attr("transform", function (a) {
            return "translate(" + b(a) + ",0)"
        })
    }

    function ec(a, b) {
        a.attr("transform", function (a) {
            return "translate(0," + b(a) + ")"
        })
    }

    function fc(a, b) {
        a.select(".extent").attr("x", b[0][0]);
        a.selectAll(".n,.s,.w,.nw,.sw").attr("x", b[0][0] - 2);
        a.selectAll(".e,.ne,.se").attr("x", b[1][0] - 3);
        a.selectAll(".extent,.n,.s").attr("width",
            b[1][0] - b[0][0])
    }

    function gc(a, b) {
        a.select(".extent").attr("y", b[0][1]);
        a.selectAll(".n,.e,.w,.nw,.ne").attr("y", b[0][1] - 3);
        a.selectAll(".s,.se,.sw").attr("y", b[1][1] - 4);
        a.selectAll(".extent,.e,.w").attr("height", b[1][1] - b[0][1])
    }

    function zc() {
        32 == d3.event.keyCode && (ua && !la) && (ia = null, V[0] -= W[1][0], V[1] -= W[1][1], la = 2, B())
    }

    function Ac() {
        32 == d3.event.keyCode && 2 == la && (V[0] += W[1][0], V[1] += W[1][1], la = 0, B())
    }

    function ub() {
        if (V) {
            var a = d3.svg.mouse(ua), b = d3.select(ua);
            la || (d3.event.altKey ? (ia || (ia = [(W[0][0] +
            W[1][0]) / 2, (W[0][1] + W[1][1]) / 2]), V[0] = W[+(a[0] < ia[0])][0], V[1] = W[+(a[1] < ia[1])][1]) : ia = null);
            bb && (hc(a, bb, 0), fc(b, W));
            cb && (hc(a, cb, 1), gc(b, W));
            Oa("brush")
        }
    }

    function hc(a, b, c) {
        var h = Za(b), b = h[0], j = h[1], h = V[c], k = W[1][c] - W[0][c];
        la && (b -= h, j -= k + h);
        a = Math.max(b, Math.min(j, a[c]));
        la ? b = (a += h) + k : (ia && (h = Math.max(b, Math.min(j, 2 * ia[c] - a))), h < a ? (b = a, a = h) : b = h);
        W[0][c] = a;
        W[1][c] = b
    }

    function Bc() {
        V && (ub(), d3.select(ua).selectAll(".resize").style("pointer-events", vb.empty() ? "none" : "all"), Oa("brushend"), vb = Oa = ua =
            bb = cb = W = la = Ea = ia = V = null, B())
    }

    function wb(a) {
        var b = ic(), c = d3.event, h = d3.event = {type: a};
        b && (h.x = b[0] + pa[0], h.y = b[1] + pa[1], h.dx = b[0] - va[0], h.dy = b[1] - va[1], wa |= h.dx | h.dy, va = b);
        try {
            xb[a].apply(qa, db)
        } finally {
            d3.event = c
        }
        c.stopPropagation();
        c.preventDefault()
    }

    function ic() {
        var a = qa.parentNode, b = d3.event.changedTouches;
        return a && (b ? d3.svg.touches(a, b)[0] : d3.svg.mouse(a))
    }

    function jc() {
        if (qa) {
            if (!qa.parentNode)return yb();
            wb("drag");
            B()
        }
    }

    function yb() {
        qa && (wb("dragend"), wa && (B(), wa = d3.event.target === zb), xb =
            zb = qa = db = pa = va = null)
    }

    function Cc() {
        wa && (B(), wa = 0)
    }

    function eb(a) {
        return [a[0] - ea[0], a[1] - ea[1], ea[2]]
    }

    function kc() {
        for (var a = d3.svg.touches(ja), b = -1, c = a.length, h; ++b < c;)Pa[(h = a[b]).identifier] = eb(h);
        return a
    }

    function Dc() {
        var a = d3.svg.touches(ja);
        switch (a.length) {
            case 1:
                a = a[0];
                Fa(ea[2], a, Pa[a.identifier]);
                break;
            case 2:
                var b = a[0], c = a[1], a = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2], b = Pa[b.identifier],
                    c = Pa[c.identifier], c = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2, b[2]];
                Fa(Math.log(d3.event.scale) / Math.LN2 + b[2], a, c)
        }
    }

    function Ec() {
        fb =
            null;
        Qa && (Ga = 1, Fa(ea[2], d3.svg.mouse(ja), Qa))
    }

    function Fc() {
        Qa && (Ga && (B(), Ga = Ab === d3.event.target), ea = Bb = Cb = Ab = ja = Db = Qa = null)
    }

    function Gc() {
        Ga && (B(), Ga = 0)
    }

    function Fa(a, b, c) {
        function h(a, b, c) {
            a.domain(a.range().map(function (h) {
                return a.invert((h - c) * j / k + b)
            }))
        }

        var a = Eb(a, 2), j = Math.pow(2, ea[2]), k = Math.pow(2, a), a = Math.pow(2, (ea[2] = a) - c[2]), m = ea[0],
            p = ea[1], s = ea[0] = Eb(b[0] - c[0] * a, 0, k), n = ea[1] = Eb(b[1] - c[1] * a, 1, k), b = d3.event;
        d3.event = {
            scale: k, translate: [s, n], transform: function (a, b) {
                a && h(a, m, s);
                b && h(b, p, n)
            }
        };
        try {
            Cb.apply(ja, Db)
        } finally {
            d3.event = b
        }
        b.preventDefault()
    }

    function Eb(a, b, c) {
        var h = Bb[b], j = h[0], h = h[1];
        return 3 === arguments.length ? Math.max(h * (Infinity === h ? -Infinity : 1 / c - 1), Math.min(-Infinity === j ? Infinity : j, a / c)) * c : Math.max(j, Math.min(h, a))
    }

    Date.now || (Date.now = function () {
        return +new Date
    });
    try {
        document.createElement("div").style.setProperty("opacity", 0, "")
    } catch (Zc) {
        var lc = CSSStyleDeclaration.prototype, Hc = lc.setProperty;
        lc.setProperty = function (a, b, c) {
            Hc.call(this, a, b + "", c)
        }
    }
    d3 = {version: "2.7.4"};
    var Ra =
        function (a) {
            return Array.prototype.slice.call(a)
        };
    try {
        Ra(document.documentElement.childNodes)[0].nodeType
    } catch ($c) {
        Ra = a
    }
    var kb = [].__proto__ ? function (a, b) {
        a.__proto__ = b
    } : function (a, b) {
        for (var c in b)a[c] = b[c]
    };
    d3.functor = function (a) {
        return "function" === typeof a ? a : function () {
            return a
        }
    };
    d3.rebind = function (a, b) {
        for (var h = 1, j = arguments.length, k; ++h < j;)a[k = arguments[h]] = c(a, b, b[k]);
        return a
    };
    d3.ascending = function (a, b) {
        return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN
    };
    d3.descending = function (a, b) {
        return b < a ? -1 : b > a ? 1 : b >= a ?
            0 : NaN
    };
    d3.mean = function (a, b) {
        var c = a.length, j, k = 0, m = -1, p = 0;
        if (1 === arguments.length)for (; ++m < c;) {
            if (h(j = a[m])) k += (j - k) / ++p
        } else for (; ++m < c;)if (h(j = b.call(a, a[m], m))) k += (j - k) / ++p;
        return p ? k : void 0
    };
    d3.median = function (a, b) {
        1 < arguments.length && (a = a.map(b));
        a = a.filter(h);
        return a.length ? d3.quantile(a.sort(d3.ascending), 0.5) : void 0
    };
    d3.min = function (a, b) {
        var c = -1, h = a.length, j, k;
        if (1 === arguments.length) {
            for (; ++c < h && (null == (j = a[c]) || j != j);)j = void 0;
            for (; ++c < h;)if (null != (k = a[c]) && j > k) j = k
        } else {
            for (; ++c < h && (null ==
            (j = b.call(a, a[c], c)) || j != j);)j = void 0;
            for (; ++c < h;)if (null != (k = b.call(a, a[c], c)) && j > k) j = k
        }
        return j
    };
    d3.max = function (a, b) {
        var c = -1, h = a.length, j, k;
        if (1 === arguments.length) {
            for (; ++c < h && (null == (j = a[c]) || j != j);)j = void 0;
            for (; ++c < h;)if (null != (k = a[c]) && k > j) j = k
        } else {
            for (; ++c < h && (null == (j = b.call(a, a[c], c)) || j != j);)j = void 0;
            for (; ++c < h;)if (null != (k = b.call(a, a[c], c)) && k > j) j = k
        }
        return j
    };
    d3.extent = function (a, b) {
        var c = -1, h = a.length, j, k, m;
        if (1 === arguments.length) {
            for (; ++c < h && (null == (j = m = a[c]) || j != j);)j = m = void 0;
            for (; ++c <
                   h;)if (null != (k = a[c])) j > k && (j = k), m < k && (m = k)
        } else {
            for (; ++c < h && (null == (j = m = b.call(a, a[c], c)) || j != j);)j = void 0;
            for (; ++c < h;)if (null != (k = b.call(a, a[c], c))) j > k && (j = k), m < k && (m = k)
        }
        return [j, m]
    };
    d3.random = {
        normal: function (a, b) {
            2 > arguments.length && (b = 1);
            1 > arguments.length && (a = 0);
            return function () {
                var c, h;
                do c = 2 * Math.random() - 1, h = 2 * Math.random() - 1, h = c * c + h * h; while (!h || 1 < h);
                return a + b * c * Math.sqrt(-2 * Math.log(h) / h)
            }
        }
    };
    d3.sum = function (a, b) {
        var c = 0, h = a.length, j, k = -1;
        if (1 === arguments.length)for (; ++k < h;) {
            if (!isNaN(j =
                    +a[k])) c += j
        } else for (; ++k < h;)if (!isNaN(j = +b.call(a, a[k], k))) c += j;
        return c
    };
    d3.quantile = function (a, b) {
        var c = (a.length - 1) * b + 1, h = Math.floor(c), j = a[h - 1];
        return (c -= h) ? j + c * (a[h] - j) : j
    };
    d3.transpose = function (a) {
        return d3.zip.apply(d3, a)
    };
    d3.zip = function () {
        if (!(k = arguments.length))return [];
        for (var a = -1, b = d3.min(arguments, j), c = Array(b); ++a < b;)for (var h = -1, k,
                                                                                   m = c[a] = Array(k); ++h < k;)m[h] = arguments[h][a];
        return c
    };
    d3.bisectLeft = function (a, b, c, h) {
        3 > arguments.length && (c = 0);
        4 > arguments.length && (h = a.length);
        for (; c <
               h;) {
            var j = c + h >> 1;
            a[j] < b ? c = j + 1 : h = j
        }
        return c
    };
    d3.bisect = d3.bisectRight = function (a, b, c, h) {
        3 > arguments.length && (c = 0);
        4 > arguments.length && (h = a.length);
        for (; c < h;) {
            var j = c + h >> 1;
            b < a[j] ? h = j : c = j + 1
        }
        return c
    };
    d3.first = function (a, b) {
        var c = 0, h = a.length, j = a[0], k;
        1 === arguments.length && (b = d3.ascending);
        for (; ++c < h;)if (0 < b.call(a, j, k = a[c])) j = k;
        return j
    };
    d3.last = function (a, b) {
        var c = 0, h = a.length, j = a[0], k;
        1 === arguments.length && (b = d3.ascending);
        for (; ++c < h;)if (0 >= b.call(a, j, k = a[c])) j = k;
        return j
    };
    d3.nest = function () {
        function a(b,
                   j) {
            if (j >= h.length)return m ? m.call(c, b) : k ? b.sort(k) : b;
            for (var p = -1, ca = b.length, s = h[j++], n, q,
                     v = {}; ++p < ca;)(n = s(q = b[p])) in v ? v[n].push(q) : v[n] = [q];
            for (n in v)v[n] = a(v[n], j);
            return v
        }

        function b(a, c) {
            if (c >= h.length)return a;
            var k = [], S = j[c++], m;
            for (m in a)k.push({key: m, values: b(a[m], c)});
            S && k.sort(function (a, b) {
                return S(a.key, b.key)
            });
            return k
        }

        var c = {}, h = [], j = [], k, m;
        c.map = function (b) {
            return a(b, 0)
        };
        c.entries = function (c) {
            return b(a(c, 0), 0)
        };
        c.key = function (a) {
            h.push(a);
            return c
        };
        c.sortKeys = function (a) {
            j[h.length -
            1] = a;
            return c
        };
        c.sortValues = function (a) {
            k = a;
            return c
        };
        c.rollup = function (a) {
            m = a;
            return c
        };
        return c
    };
    d3.keys = function (a) {
        var b = [], c;
        for (c in a)b.push(c);
        return b
    };
    d3.values = function (a) {
        var b = [], c;
        for (c in a)b.push(a[c]);
        return b
    };
    d3.entries = function (a) {
        var b = [], c;
        for (c in a)b.push({key: c, value: a[c]});
        return b
    };
    d3.permute = function (a, b) {
        for (var c = [], h = -1, j = b.length; ++h < j;)c[h] = a[b[h]];
        return c
    };
    d3.merge = function (a) {
        return Array.prototype.concat.apply([], a)
    };
    d3.split = function (a, b) {
        var c = [], h = [], j, m = -1,
            p = a.length;
        for (2 > arguments.length && (b = k); ++m < p;)b.call(h, j = a[m], m) ? h = [] : (h.length || c.push(h), h.push(j));
        return c
    };
    d3.range = function (a, b, c) {
        3 > arguments.length && (c = 1, 2 > arguments.length && (b = a, a = 0));
        if (Infinity == (b - a) / c)throw Error("infinite range");
        var h = [], j = -1, k;
        if (0 > c)for (; (k = a + c * ++j) > b;)h.push(k); else for (; (k = a + c * ++j) < b;)h.push(k);
        return h
    };
    d3.requote = function (a) {
        return a.replace(Ic, "\\$&")
    };
    var Ic = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
    d3.round = function (a, b) {
        return b ? Math.round(a * (b = Math.pow(10, b))) /
            b : Math.round(a)
    };
    d3.xhr = function (a, b, c) {
        var h = new XMLHttpRequest;
        3 > arguments.length ? (c = b, b = null) : b && h.overrideMimeType && h.overrideMimeType(b);
        h.open("GET", a, !0);
        b && h.setRequestHeader("Accept", b);
        h.onreadystatechange = function () {
            4 === h.readyState && c(300 > h.status ? h : null)
        };
        h.send(null)
    };
    d3.text = function (a, b, c) {
        3 > arguments.length && (c = b, b = null);
        d3.xhr(a, b, function (a) {
            c(a && a.responseText)
        })
    };
    d3.json = function (a, b) {
        d3.text(a, "application/json", function (a) {
            b(a ? JSON.parse(a) : null)
        })
    };
    d3.html = function (a, b) {
        d3.text(a,
            "text/html", function (a) {
                if (null != a) {
                    var c = document.createRange();
                    c.selectNode(document.body);
                    a = c.createContextualFragment(a)
                }
                b(a)
            })
    };
    d3.xml = function (a, b, c) {
        3 > arguments.length && (c = b, b = null);
        d3.xhr(a, b, function (a) {
            c(a && a.responseXML)
        })
    };
    var gb = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    d3.ns = {
        prefix: gb, qualify: function (a) {
            var b = a.indexOf(":");
            return 0 > b ?
                a in gb ? {space: gb[a], local: a} : a : {space: gb[a.substring(0, b)], local: a.substring(b + 1)}
        }
    };
    d3.dispatch = function () {
        for (var a = new q, b = -1, c = arguments.length; ++b < c;)a[arguments[b]] = r(a);
        return a
    };
    q.prototype.on = function (a, b) {
        var c = a.indexOf("."), h = "";
        0 < c && (h = a.substring(c + 1), a = a.substring(0, c));
        return 2 > arguments.length ? this[a].on(h) : this[a].on(h, b)
    };
    d3.format = function (a) {
        var a = Jc.exec(a), b = a[1] || " ", c = a[3] || "", h = a[5], j = +a[6], k = a[7], m = a[8], p = a[9], s = 1,
            n = "", q = !1;
        m && (m = +m.substring(1));
        h && (b = "0", k && (j -= Math.floor((j -
            1) / 4)));
        switch (p) {
            case "n":
                k = !0;
                p = "g";
                break;
            case "%":
                s = 100;
                n = "%";
                p = "f";
                break;
            case "p":
                s = 100;
                n = "%";
                p = "r";
                break;
            case "d":
                q = !0;
                m = 0;
                break;
            case "s":
                s = -1, p = "r"
        }
        "r" == p && !m && (p = "g");
        p = Kc[p] || u;
        return function (a) {
            if (q && a % 1)return "";
            var S = 0 > a && (a = -a) ? "\u2212" : c;
            if (0 > s) {
                var v = d3.formatPrefix(a, m), a = a * v.scale;
                n = v.symbol
            } else a *= s;
            a = p(a, m);
            h ? (v = a.length + S.length, v < j && (a = Array(j - v + 1).join(b) + a), k && (a = t(a)), a = S + a) : (k && (a = t(a)), a = S + a, v = a.length, v < j && (a = Array(j - v + 1).join(b) + a));
            return a + n
        }
    };
    var Jc = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/,
        Kc = {
            g: function (a, b) {
                return a.toPrecision(b)
            }, e: function (a, b) {
                return a.toExponential(b)
            }, f: function (a, b) {
                return a.toFixed(b)
            }, r: function (a, b) {
                return d3.round(a, b = n(a, b)).toFixed(Math.max(0, Math.min(20, b)))
            }
        }, Lc = "y z a f p n \u03bc m  k M G T P E Z Y".split(" ").map(function (a, b) {
            return {scale: Math.pow(10, 3 * (8 - b)), symbol: a}
        });
    d3.formatPrefix = function (a, b) {
        var c = 0;
        a && (0 > a && (a *= -1), b && (a = d3.round(a, n(a, b))), c = 1 + Math.floor(1E-12 + Math.log(a) / Math.LN10), c = Math.max(-24, Math.min(24, 3 * Math.floor((0 >= c ? c + 1 : c -
                    1) / 3))));
        return Lc[8 + c / 3]
    };
    var Mc = D(2), Nc = D(3), Oc = {
            linear: function () {
                return N
            }, poly: D, quad: function () {
                return Mc
            }, cubic: function () {
                return Nc
            }, sin: function () {
                return J
            }, exp: function () {
                return z
            }, circle: function () {
                return E
            }, elastic: function (a, b) {
                var c;
                2 > arguments.length && (b = 0.45);
                1 > arguments.length ? (a = 1, c = b / 4) : c = b / (2 * Math.PI) * Math.asin(1 / a);
                return function (h) {
                    return 1 + a * Math.pow(2, 10 * -h) * Math.sin(2 * (h - c) * Math.PI / b)
                }
            }, back: function (a) {
                a || (a = 1.70158);
                return function (b) {
                    return b * b * ((a + 1) * b - a)
                }
            }, bounce: function () {
                return H
            }
        },
        Pc = {
            "in": function (a) {
                return a
            }, out: w, "in-out": A, "out-in": function (a) {
                return A(w(a))
            }
        };
    d3.ease = function (a) {
        var b = a.indexOf("-"), c = 0 <= b ? a.substring(0, b) : a, b = 0 <= b ? a.substring(b + 1) : "in",
            h = Pc[b](Oc[c].apply(null, Array.prototype.slice.call(arguments, 1)));
        return function (a) {
            return 0 >= a ? 0 : 1 <= a ? 1 : h(a)
        }
    };
    d3.event = null;
    d3.interpolate = function (a, b) {
        for (var c = d3.interpolators.length, h; 0 <= --c && !(h = d3.interpolators[c](a, b)););
        return h
    };
    d3.interpolateNumber = function (a, b) {
        b -= a;
        return function (c) {
            return a + b * c
        }
    };
    d3.interpolateRound =
        function (a, b) {
            b -= a;
            return function (c) {
                return Math.round(a + b * c)
            }
        };
    d3.interpolateString = function (a, b) {
        var c, h, j = 0, k = [], m = [], p, s;
        for (h = hb.lastIndex = 0; c = hb.exec(b); ++h)c.index && k.push(b.substring(j, c.index)), m.push({
            i: k.length,
            x: c[0]
        }), k.push(null), j = hb.lastIndex;
        j < b.length && k.push(b.substring(j));
        h = 0;
        for (p = m.length; (c = hb.exec(a)) && h < p; ++h)if (s = m[h], s.x == c[0]) {
            if (s.i)if (null == k[s.i + 1]) {
                k[s.i - 1] += s.x;
                k.splice(s.i, 1);
                for (c = h + 1; c < p; ++c)m[c].i--
            } else {
                k[s.i - 1] += s.x + k[s.i + 1];
                k.splice(s.i, 2);
                for (c = h + 1; c < p; ++c)m[c].i -=
                    2
            } else if (null == k[s.i + 1]) k[s.i] = s.x; else {
                k[s.i] = s.x + k[s.i + 1];
                k.splice(s.i + 1, 1);
                for (c = h + 1; c < p; ++c)m[c].i--
            }
            m.splice(h, 1);
            p--;
            h--
        } else s.x = d3.interpolateNumber(parseFloat(c[0]), parseFloat(s.x));
        for (; h < p;)s = m.pop(), null == k[s.i + 1] ? k[s.i] = s.x : (k[s.i] = s.x + k[s.i + 1], k.splice(s.i + 1, 1)), p--;
        return 1 === k.length ? null == k[0] ? m[0].x : function () {
            return b
        } : function (a) {
            for (h = 0; h < p; ++h)k[(s = m[h]).i] = s.x(a);
            return k.join("")
        }
    };
    d3.interpolateTransform = function (a, b) {
        var c = [], h = [], j, k = d3.transform(a), m = d3.transform(b), p =
            k.translate, s = m.translate, n = k.rotate, q = m.rotate, v = k.skew, K = m.skew, k = k.scale, m = m.scale;
        p[0] != s[0] || p[1] != s[1] ? (c.push("translate(", null, ",", null, ")"), h.push({
            i: 1,
            x: d3.interpolateNumber(p[0], s[0])
        }, {i: 3, x: d3.interpolateNumber(p[1], s[1])})) : s[0] || s[1] ? c.push("translate(" + s + ")") : c.push("");
        n != q ? h.push({
            i: c.push(c.pop() + "rotate(", null, ")") - 2,
            x: d3.interpolateNumber(n, q)
        }) : q && c.push(c.pop() + "rotate(" + q + ")");
        v != K ? h.push({
            i: c.push(c.pop() + "skewX(", null, ")") - 2,
            x: d3.interpolateNumber(v, K)
        }) : K && c.push(c.pop() +
                "skewX(" + K + ")");
        k[0] != m[0] || k[1] != m[1] ? (j = c.push(c.pop() + "scale(", null, ",", null, ")"), h.push({
            i: j - 4,
            x: d3.interpolateNumber(k[0], m[0])
        }, {
            i: j - 2,
            x: d3.interpolateNumber(k[1], m[1])
        })) : (1 != m[0] || 1 != m[1]) && c.push(c.pop() + "scale(" + m + ")");
        j = h.length;
        return function (a) {
            for (var b = -1, k; ++b < j;)c[(k = h[b]).i] = k.x(a);
            return c.join("")
        }
    };
    d3.interpolateRgb = function (a, b) {
        var a = d3.rgb(a), b = d3.rgb(b), c = a.r, h = a.g, j = a.b, k = b.r - c, m = b.g - h, s = b.b - j;
        return function (a) {
            return "#" + p(Math.round(c + k * a)) + p(Math.round(h + m * a)) + p(Math.round(j +
                    s * a))
        }
    };
    d3.interpolateHsl = function (a, b) {
        var a = d3.hsl(a), b = d3.hsl(b), c = a.h, h = a.s, j = a.l, k = b.h - c, m = b.s - h, p = b.l - j;
        return function (a) {
            return M(c + k * a, h + m * a, j + p * a).toString()
        }
    };
    d3.interpolateArray = function (a, b) {
        var c = [], h = [], j = a.length, k = b.length, m = Math.min(a.length, b.length), p;
        for (p = 0; p < m; ++p)c.push(d3.interpolate(a[p], b[p]));
        for (; p < j; ++p)h[p] = a[p];
        for (; p < k; ++p)h[p] = b[p];
        return function (a) {
            for (p = 0; p < m; ++p)h[p] = c[p](a);
            return h
        }
    };
    d3.interpolateObject = function (a, b) {
        var c = {}, h = {}, j;
        for (j in a)j in b ? c[j] =
            ("transform" == j ? d3.interpolateTransform : d3.interpolate)(a[j], b[j]) : h[j] = a[j];
        for (j in b)j in a || (h[j] = b[j]);
        return function (a) {
            for (j in c)h[j] = c[j](a);
            return h
        }
    };
    var hb = /[-+]?(?:\d*\.?\d+)(?:[eE][-+]?\d+)?/g;
    d3.interpolators = [d3.interpolateObject, function (a, b) {
        return b instanceof Array && d3.interpolateArray(a, b)
    }, function (a, b) {
        return ("string" === typeof a || "string" === typeof b) && d3.interpolateString(a + "", b + "")
    }, function (a, b) {
        return ("string" === typeof b ? b in Ka || /^(#|rgb\(|hsl\()/.test(b) : b instanceof C ||
                b instanceof I) && d3.interpolateRgb(a, b)
    }, function (a, b) {
        return !isNaN(a = +a) && !isNaN(b = +b) && d3.interpolateNumber(a, b)
    }];
    d3.rgb = function (a, b, c) {
        return 1 === arguments.length ? a instanceof C ? Q(a.r, a.g, a.b) : s("" + a, Q, M) : Q(~~a, ~~b, ~~c)
    };
    C.prototype.brighter = function (a) {
        var a = Math.pow(0.7, arguments.length ? a : 1), b = this.r, c = this.g, h = this.b;
        if (!b && !c && !h)return Q(30, 30, 30);
        b && 30 > b && (b = 30);
        c && 30 > c && (c = 30);
        h && 30 > h && (h = 30);
        return Q(Math.min(255, Math.floor(b / a)), Math.min(255, Math.floor(c / a)), Math.min(255, Math.floor(h /
            a)))
    };
    C.prototype.darker = function (a) {
        a = Math.pow(0.7, arguments.length ? a : 1);
        return Q(Math.floor(a * this.r), Math.floor(a * this.g), Math.floor(a * this.b))
    };
    C.prototype.hsl = function () {
        return K(this.r, this.g, this.b)
    };
    C.prototype.toString = function () {
        return "#" + p(this.r) + p(this.g) + p(this.b)
    };
    var Ka = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    }, Fb;
    for (Fb in Ka)Ka[Fb] = s(Ka[Fb], Q, M);
    d3.hsl = function (a, b, c) {
        return 1 === arguments.length ? a instanceof I ? v(a.h, a.s, a.l) : s("" + a, K, v) : v(+a, +b, +c)
    };
    I.prototype.brighter = function (a) {
        a = Math.pow(0.7, arguments.length ? a : 1);
        return v(this.h, this.s, this.l / a)
    };
    I.prototype.darker = function (a) {
        a = Math.pow(0.7, arguments.length ? a : 1);
        return v(this.h, this.s, a * this.l)
    };
    I.prototype.rgb = function () {
        return M(this.h,
            this.s, this.l)
    };
    I.prototype.toString = function () {
        return this.rgb().toString()
    };
    var Wa = function (a, b) {
            return b.querySelector(a)
        }, Hb = function (a, b) {
            return b.querySelectorAll(a)
        }, Ha = document.documentElement,
        Qc = Ha.matchesSelector || Ha.webkitMatchesSelector || Ha.mozMatchesSelector || Ha.msMatchesSelector || Ha.oMatchesSelector,
        mc = function (a, b) {
            return Qc.call(a, b)
        };
    "function" === typeof Sizzle && (Wa = function (a, b) {
        return Sizzle(a, b)[0]
    }, Hb = function (a, b) {
        return Sizzle.uniqueSort(Sizzle(a, b))
    }, mc = Sizzle.matchesSelector);
    var P = [];
    d3.selection = function () {
        return Sa
    };
    d3.selection.prototype = P;
    P.select = function (a) {
        var b = [], c, h, j, k;
        "function" !== typeof a && (a = L(a));
        for (var m = -1, p = this.length; ++m < p;) {
            b.push(c = []);
            c.parentNode = (j = this[m]).parentNode;
            for (var s = -1,
                     n = j.length; ++s < n;)(k = j[s]) ? (c.push(h = a.call(k, k.__data__, s)), h && "__data__" in k && (h.__data__ = k.__data__)) : c.push(null)
        }
        return F(b)
    };
    P.selectAll = function (a) {
        var b = [], c, h;
        "function" !== typeof a && (a = aa(a));
        for (var j = -1, k = this.length; ++j < k;)for (var m = this[j], p = -1, s = m.length; ++p <
        s;)if (h = m[p]) b.push(c = Ra(a.call(h, h.__data__, p))), c.parentNode = h;
        return F(b)
    };
    P.attr = function (a, b) {
        function c() {
            this.removeAttribute(a)
        }

        function h() {
            this.removeAttributeNS(a.space, a.local)
        }

        function j() {
            this.setAttribute(a, b)
        }

        function k() {
            this.setAttributeNS(a.space, a.local, b)
        }

        function m() {
            var c = b.apply(this, arguments);
            null == c ? this.removeAttribute(a) : this.setAttribute(a, c)
        }

        function p() {
            var c = b.apply(this, arguments);
            null == c ? this.removeAttributeNS(a.space, a.local) : this.setAttributeNS(a.space, a.local,
                c)
        }

        a = d3.ns.qualify(a);
        if (2 > arguments.length) {
            var s = this.node();
            return a.local ? s.getAttributeNS(a.space, a.local) : s.getAttribute(a)
        }
        return this.each(null == b ? a.local ? h : c : "function" === typeof b ? a.local ? p : m : a.local ? k : j)
    };
    P.classed = function (a, b) {
        var c = a.split(Rc), h = c.length, j = -1;
        if (1 < arguments.length) {
            for (; ++j < h;)xa.call(this, c[j], b);
            return this
        }
        for (; ++j < h;)if (!xa.call(this, c[j]))return !1;
        return !0
    };
    var Rc = /\s+/g;
    P.style = function (a, b, c) {
        function h() {
            this.style.removeProperty(a)
        }

        function j() {
            this.style.setProperty(a,
                b, c)
        }

        function k() {
            var h = b.apply(this, arguments);
            null == h ? this.style.removeProperty(a) : this.style.setProperty(a, h, c)
        }

        3 > arguments.length && (c = "");
        return 2 > arguments.length ? window.getComputedStyle(this.node(), null).getPropertyValue(a) : this.each(null == b ? h : "function" === typeof b ? k : j)
    };
    P.property = function (a, b) {
        function c() {
            delete this[a]
        }

        function h() {
            this[a] = b
        }

        function j() {
            var c = b.apply(this, arguments);
            null == c ? delete this[a] : this[a] = c
        }

        return 2 > arguments.length ? this.node()[a] : this.each(null == b ? c : "function" ===
        typeof b ? j : h)
    };
    P.text = function (a) {
        return 1 > arguments.length ? this.node().textContent : this.each("function" === typeof a ? function () {
            var b = a.apply(this, arguments);
            this.textContent = null == b ? "" : b
        } : null == a ? function () {
            this.textContent = ""
        } : function () {
            this.textContent = a
        })
    };
    P.html = function (a) {
        return 1 > arguments.length ? this.node().innerHTML : this.each("function" === typeof a ? function () {
            var b = a.apply(this, arguments);
            this.innerHTML = null == b ? "" : b
        } : null == a ? function () {
            this.innerHTML = ""
        } : function () {
            this.innerHTML = a
        })
    };
    P.append =
        function (a) {
            function b() {
                return this.appendChild(document.createElementNS(this.namespaceURI, a))
            }

            function c() {
                return this.appendChild(document.createElementNS(a.space, a.local))
            }

            a = d3.ns.qualify(a);
            return this.select(a.local ? c : b)
        };
    P.insert = function (a, b) {
        function c() {
            return this.insertBefore(document.createElementNS(this.namespaceURI, a), Wa(b, this))
        }

        function h() {
            return this.insertBefore(document.createElementNS(a.space, a.local), Wa(b, this))
        }

        a = d3.ns.qualify(a);
        return this.select(a.local ? h : c)
    };
    P.remove = function () {
        return this.each(function () {
            var a =
                this.parentNode;
            a && a.removeChild(this)
        })
    };
    P.data = function (a, b) {
        function c(a, m) {
            var p, s = a.length, S = m.length, n = Math.min(s, S), q = Math.max(s, S), v = [], K = [], G = [], r, I;
            if (b) {
                var n = {}, q = [], Ba;
                I = m.length;
                for (p = -1; ++p < s;)Ba = b.call(r = a[p], r.__data__, p), Ba in n ? G[I++] = r : n[Ba] = r, q.push(Ba);
                for (p = -1; ++p < S;)(r = n[Ba = b.call(m, I = m[p], p)]) ? (r.__data__ = I, v[p] = r, K[p] = G[p] = null) : (K[p] = {__data__: I}, v[p] = G[p] = null), delete n[Ba];
                for (p = -1; ++p < s;)q[p] in n && (G[p] = a[p])
            } else {
                for (p = -1; ++p < n;)r = a[p], I = m[p], r ? (r.__data__ = I, v[p] = r,
                    K[p] = G[p] = null) : (K[p] = {__data__: I}, v[p] = G[p] = null);
                for (; p < S; ++p)K[p] = {__data__: m[p]}, v[p] = G[p] = null;
                for (; p < q; ++p)G[p] = a[p], K[p] = v[p] = null
            }
            K.update = v;
            K.parentNode = v.parentNode = G.parentNode = a.parentNode;
            h.push(K);
            j.push(v);
            k.push(G)
        }

        var h = [], j = [], k = [], m = -1, p = this.length, s;
        if ("function" === typeof a)for (; ++m < p;)c(s = this[m], a.call(s, s.parentNode.__data__, m)); else for (; ++m < p;)c(s = this[m], a);
        m = F(j);
        m.enter = function () {
            var a = h;
            kb(a, Ia);
            return a
        };
        m.exit = function () {
            return F(k)
        };
        return m
    };
    P.filter = function (a) {
        var b =
            [], c, h, j;
        if ("function" !== typeof a)var k = a, a = function () {
            return mc(this, k)
        };
        for (var m = 0, p = this.length; m < p; m++) {
            b.push(c = []);
            c.parentNode = (h = this[m]).parentNode;
            for (var s = 0, n = h.length; s < n; s++)(j = h[s]) && a.call(j, j.__data__, s) && c.push(j)
        }
        return F(b)
    };
    P.map = function (a) {
        return this.each(function () {
            this.__data__ = a.apply(this, arguments)
        })
    };
    P.order = function () {
        for (var a = -1, b = this.length; ++a < b;)for (var c = this[a], h = c.length - 1, j = c[h],
                                                            k; 0 <= --h;)if (k = c[h]) j && j !== k.nextSibling && j.parentNode.insertBefore(k, j), j = k;
        return this
    };
    P.sort = function (a) {
        for (var a = Ua.apply(this, arguments), b = -1, c = this.length; ++b < c;)this[b].sort(a);
        return this.order()
    };
    P.on = function (a, b, c) {
        3 > arguments.length && (c = !1);
        var h = "__on" + a, j = a.indexOf(".");
        0 < j && (a = a.substring(0, j));
        return 2 > arguments.length ? (j = this.node()[h]) && j._ : this.each(function (j, k) {
            function m(a) {
                var c = d3.event;
                d3.event = a;
                try {
                    b.call(p, p.__data__, k)
                } finally {
                    d3.event = c
                }
            }

            var p = this;
            p[h] && p.removeEventListener(a, p[h], c);
            b && p.addEventListener(a, p[h] = m, c);
            m._ = b
        })
    };
    P.each = function (a) {
        for (var b =
            -1, c = this.length; ++b < c;)for (var h = this[b], j = -1, k = h.length; ++j < k;) {
            var m = h[j];
            m && a.call(m, m.__data__, j, b)
        }
        return this
    };
    P.call = function (a) {
        a.apply(this, (arguments[0] = this, arguments));
        return this
    };
    P.empty = function () {
        return !this.node()
    };
    P.node = function () {
        for (var a = 0, b = this.length; a < b; a++)for (var c = this[a], h = 0, j = c.length; h < j; h++) {
            var k = c[h];
            if (k)return k
        }
        return null
    };
    P.transition = function () {
        for (var a = [], b, c, h = -1, j = this.length; ++h < j;) {
            a.push(b = []);
            for (var k = this[h], m = -1, p = k.length; ++m < p;)b.push((c = k[m]) ?
                {node: c, delay: 0, duration: 250} : null)
        }
        return ya(a, Ca || ++Sc, Date.now())
    };
    var Sa = F([[document]]);
    Sa[0].parentNode = Ha;
    d3.select = function (a) {
        return "string" === typeof a ? Sa.select(a) : F([[a]])
    };
    d3.selectAll = function (a) {
        return "string" === typeof a ? Sa.selectAll(a) : F([Ra(a)])
    };
    var Ia = [];
    Ia.append = P.append;
    Ia.insert = P.insert;
    Ia.empty = P.empty;
    Ia.node = P.node;
    Ia.select = function (a) {
        for (var b = [], c, h, j, k, m, p = -1, s = this.length; ++p < s;) {
            j = (k = this[p]).update;
            b.push(c = []);
            c.parentNode = k.parentNode;
            for (var n = -1, q = k.length; ++n <
            q;)(m = k[n]) ? (c.push(j[n] = h = a.call(k.parentNode, m.__data__, n)), h.__data__ = m.__data__) : c.push(null)
        }
        return F(b)
    };
    var La = {}, Z = [], Sc = 0, Ca = 0, qc = d3.ease("cubic-in-out");
    Z.call = P.call;
    d3.transition = function () {
        return Sa.transition()
    };
    d3.transition.prototype = Z;
    Z.select = function (a) {
        var b = [], c, h, j;
        "function" !== typeof a && (a = L(a));
        for (var k = -1, m = this.length; ++k < m;) {
            b.push(c = []);
            for (var p = this[k], s = -1,
                     n = p.length; ++s < n;)(j = p[s]) && (h = a.call(j.node, j.node.__data__, s)) ? ("__data__" in j.node && (h.__data__ = j.node.__data__),
                c.push({node: h, delay: j.delay, duration: j.duration})) : c.push(null)
        }
        return ya(b, this.id, this.time).ease(this.ease())
    };
    Z.selectAll = function (a) {
        var b = [], c, h, j;
        "function" !== typeof a && (a = aa(a));
        for (var k = -1, m = this.length; ++k < m;)for (var p = this[k], s = -1, n = p.length; ++s < n;)if (j = p[s]) {
            h = a.call(j.node, j.node.__data__, s);
            b.push(c = []);
            for (var q = -1, v = h.length; ++q < v;)c.push({node: h[q], delay: j.delay, duration: j.duration})
        }
        return ya(b, this.id, this.time).ease(this.ease())
    };
    Z.attr = function (a, b) {
        return this.attrTween(a,
            ra(a, b))
    };
    Z.attrTween = function (a, b) {
        function c(a, h) {
            var k = b.call(this, a, h, this.getAttribute(j));
            return k === La ? (this.removeAttribute(j), null) : k && function (a) {
                    this.setAttribute(j, k(a))
                }
        }

        function h(a, c) {
            var k = b.call(this, a, c, this.getAttributeNS(j.space, j.local));
            return k === La ? (this.removeAttributeNS(j.space, j.local), null) : k && function (a) {
                    this.setAttributeNS(j.space, j.local, k(a))
                }
        }

        var j = d3.ns.qualify(a);
        return this.tween("attr." + a, j.local ? h : c)
    };
    Z.style = function (a, b, c) {
        3 > arguments.length && (c = "");
        return this.styleTween(a,
            ra(a, b), c)
    };
    Z.styleTween = function (a, b, c) {
        3 > arguments.length && (c = "");
        return this.tween("style." + a, function (h, j) {
            var k = b.call(this, h, j, window.getComputedStyle(this, null).getPropertyValue(a));
            return k === La ? (this.style.removeProperty(a), null) : k && function (b) {
                    this.style.setProperty(a, k(b), c)
                }
        })
    };
    Z.text = function (a) {
        return this.tween("text", function (b, c) {
            this.textContent = "function" === typeof a ? a.call(this, b, c) : a
        })
    };
    Z.remove = function () {
        return this.each("end.transition", function () {
            var a;
            !this.__transition__ &&
            (a = this.parentNode) && a.removeChild(this)
        })
    };
    Z.delay = function (a) {
        var b = this;
        return b.each("function" === typeof a ? function (c, h, j) {
            b[j][h].delay = +a.apply(this, arguments)
        } : (a = +a, function (c, h, j) {
            b[j][h].delay = a
        }))
    };
    Z.duration = function (a) {
        var b = this;
        return b.each("function" === typeof a ? function (c, h, j) {
            b[j][h].duration = +a.apply(this, arguments)
        } : (a = +a, function (c, h, j) {
            b[j][h].duration = a
        }))
    };
    Z.transition = function () {
        return this.select(b)
    };
    var sa = null, Ya, Xa;
    d3.timer = function (a, b, c) {
        var h = !1, j = sa;
        if (3 > arguments.length) {
            if (2 >
                arguments.length) b = 0; else if (!isFinite(b))return;
            c = Date.now()
        }
        for (; j;) {
            if (j.callback === a) {
                j.then = c;
                j.delay = b;
                h = !0;
                break
            }
            j = j.next
        }
        h || (sa = {callback: a, then: c, delay: b, next: sa});
        Ya || (Xa = clearTimeout(Xa), Ya = 1, Ib(ba))
    };
    d3.timer.flush = function () {
        for (var a, b = Date.now(), c = sa; c;)a = b - c.then, c.delay || (c.flush = c.callback(a)), c = c.next;
        Va()
    };
    var Ib = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
            setTimeout(a,
                17)
        };
    d3.transform = function (a) {
        var b = document.createElementNS(d3.ns.prefix.svg, "g"), c = {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0};
        return (d3.transform = function (a) {
            b.setAttribute("transform", a);
            a = b.transform.baseVal.consolidate();
            return new za(a ? a.matrix : c)
        })(a)
    };
    za.prototype.toString = function () {
        return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    };
    var Jb = 180 / Math.PI;
    d3.scale = {};
    d3.scale.linear = function () {
        return Kb([0, 1], [0, 1], d3.interpolate, !1)
    };
    d3.scale.log = function () {
        return X(d3.scale.linear(),
            Y)
    };
    var tc = d3.format(".0e");
    Y.pow = function (a) {
        return Math.pow(10, a)
    };
    ma.pow = function (a) {
        return -Math.pow(10, -a)
    };
    d3.scale.pow = function () {
        return na(d3.scale.linear(), 1)
    };
    d3.scale.sqrt = function () {
        return d3.scale.pow().exponent(0.5)
    };
    d3.scale.ordinal = function () {
        return Ob([], {t: "range", x: []})
    };
    d3.scale.category10 = function () {
        return d3.scale.ordinal().range(Tc)
    };
    d3.scale.category20 = function () {
        return d3.scale.ordinal().range(Uc)
    };
    d3.scale.category20b = function () {
        return d3.scale.ordinal().range(Vc)
    };
    d3.scale.category20c =
        function () {
            return d3.scale.ordinal().range(Wc)
        };
    var Tc = "#1f77b4 #ff7f0e #2ca02c #d62728 #9467bd #8c564b #e377c2 #7f7f7f #bcbd22 #17becf".split(" "),
        Uc = "#1f77b4 #aec7e8 #ff7f0e #ffbb78 #2ca02c #98df8a #d62728 #ff9896 #9467bd #c5b0d5 #8c564b #c49c94 #e377c2 #f7b6d2 #7f7f7f #c7c7c7 #bcbd22 #dbdb8d #17becf #9edae5".split(" "),
        Vc = "#393b79 #5254a3 #6b6ecf #9c9ede #637939 #8ca252 #b5cf6b #cedb9c #8c6d31 #bd9e39 #e7ba52 #e7cb94 #843c39 #ad494a #d6616b #e7969c #7b4173 #a55194 #ce6dbd #de9ed6".split(" "),
        Wc =
            "#3182bd #6baed6 #9ecae1 #c6dbef #e6550d #fd8d3c #fdae6b #fdd0a2 #31a354 #74c476 #a1d99b #c7e9c0 #756bb1 #9e9ac8 #bcbddc #dadaeb #636363 #969696 #bdbdbd #d9d9d9".split(" ");
    d3.scale.quantile = function () {
        return Pb([], [])
    };
    d3.scale.quantize = function () {
        return Qb(0, 1, [0, 1])
    };
    d3.svg = {};
    d3.svg.arc = function () {
        function a() {
            var k = b.apply(this, arguments), m = c.apply(this, arguments), p = h.apply(this, arguments) + ta,
                s = j.apply(this, arguments) + ta, n = (s < p && (n = p, p = s, s = n), s - p),
                q = n < Math.PI ? "0" : "1", v = Math.cos(p), p = Math.sin(p),
                K = Math.cos(s), s = Math.sin(s);
            return n >= Xc ? k ? "M0," + m + "A" + m + "," + m + " 0 1,1 0," + -m + "A" + m + "," + m + " 0 1,1 0," + m + "M0," + k + "A" + k + "," + k + " 0 1,0 0," + -k + "A" + k + "," + k + " 0 1,0 0," + k + "Z" : "M0," + m + "A" + m + "," + m + " 0 1,1 0," + -m + "A" + m + "," + m + " 0 1,1 0," + m + "Z" : k ? "M" + m * v + "," + m * p + "A" + m + "," + m + " 0 " + q + ",1 " + m * K + "," + m * s + "L" + k * K + "," + k * s + "A" + k + "," + k + " 0 " + q + ",0 " + k * v + "," + k * p + "Z" : "M" + m * v + "," + m * p + "A" + m + "," + m + " 0 " + q + ",1 " + m * K + "," + m * s + "L0,0Z"
        }

        var b = uc, c = vc, h = Rb, j = Sb;
        a.innerRadius = function (c) {
            if (!arguments.length)return b;
            b = d3.functor(c);
            return a
        };
        a.outerRadius = function (b) {
            if (!arguments.length)return c;
            c = d3.functor(b);
            return a
        };
        a.startAngle = function (b) {
            if (!arguments.length)return h;
            h = d3.functor(b);
            return a
        };
        a.endAngle = function (b) {
            if (!arguments.length)return j;
            j = d3.functor(b);
            return a
        };
        a.centroid = function () {
            var a = (b.apply(this, arguments) + c.apply(this, arguments)) / 2,
                k = (h.apply(this, arguments) + j.apply(this, arguments)) / 2 + ta;
            return [Math.cos(k) * a, Math.sin(k) * a]
        };
        return a
    };
    var ta = -Math.PI / 2, Xc = 2 * Math.PI - 1E-6;
    d3.svg.line = function () {
        return Tb(Object)
    };
    var ob = {
        linear: oa, "step-before": pb, "step-after": qb, basis: Vb, "basis-open": function (a) {
            if (4 > a.length)return oa(a);
            for (var b = [], c = -1, h = a.length, j, k = [0], m = [0]; 3 > ++c;)j = a[c], k.push(j[0]), m.push(j[1]);
            b.push(ha(Da, k) + "," + ha(Da, m));
            for (--c; ++c < h;)j = a[c], k.shift(), k.push(j[0]), m.shift(), m.push(j[1]), Na(b, k, m);
            return b.join("")
        }, "basis-closed": function (a) {
            for (var b, c = -1, h = a.length, j = h + 4, k, m = [],
                     p = []; 4 > ++c;)k = a[c % h], m.push(k[0]), p.push(k[1]);
            b = [ha(Da, m), ",", ha(Da, p)];
            for (--c; ++c < j;)k = a[c % h], m.shift(), m.push(k[0]),
                p.shift(), p.push(k[1]), Na(b, m, p);
            return b.join("")
        }, bundle: function (a, b) {
            for (var c = a.length - 1, h = a[0][0], j = a[0][1], k = a[c][0] - h, m = a[c][1] - j, p = -1, s,
                     n; ++p <= c;)s = a[p], n = p / c, s[0] = b * s[0] + (1 - b) * (h + n * k), s[1] = b * s[1] + (1 - b) * (j + n * m);
            return Vb(a)
        }, cardinal: function (a, b) {
            return 3 > a.length ? oa(a) : a[0] + ab(a, rb(a, b))
        }, "cardinal-open": function (a, b) {
            return 4 > a.length ? oa(a) : a[1] + ab(a.slice(1, a.length - 1), rb(a, b))
        }, "cardinal-closed": function (a, b) {
            return 3 > a.length ? oa(a) : a[0] + ab((a.push(a[0]), a), rb([a[a.length - 2]].concat(a,
                    [a[1]]), b))
        }, monotone: function (a) {
            if (3 > a.length) a = oa(a); else {
                var b = a[0], c = [], h, j, k, m;
                h = 0;
                j = a.length - 1;
                var p = [];
                k = a[1];
                for (m = p[0] = sb(a[0], k); ++h < j;)p[h] = m + (m = sb(k, k = a[h + 1]));
                p[h] = m;
                for (var s = -1,
                         n = a.length - 1; ++s < n;)h = sb(a[s], a[s + 1]), 1E-6 > Math.abs(h) ? p[s] = p[s + 1] = 0 : (j = p[s] / h, k = p[s + 1] / h, m = j * j + k * k, 9 < m && (m = 3 * h / Math.sqrt(m), p[s] = m * j, p[s + 1] = m * k));
                for (s = -1; ++s <= n;)m = (a[Math.min(n, s + 1)][0] - a[Math.max(0, s - 1)][0]) / (6 * (1 + p[s] * p[s])), c.push([m || 0, p[s] * m || 0]);
                a = b + ab(a, c)
            }
            return a
        }
    }, Wb = [0, 2 / 3, 1 / 3, 0], Xb = [0, 1 / 3, 2 / 3,
        0], Da = [0, 1 / 6, 2 / 3, 1 / 6];
    d3.svg.line.radial = function () {
        var a = Tb(Yb);
        a.radius = a.x;
        delete a.x;
        a.angle = a.y;
        delete a.y;
        return a
    };
    pb.reverse = qb;
    qb.reverse = pb;
    d3.svg.area = function () {
        return Zb(Object)
    };
    d3.svg.area.radial = function () {
        var a = Zb(Yb);
        a.radius = a.x;
        delete a.x;
        a.innerRadius = a.x0;
        delete a.x0;
        a.outerRadius = a.x1;
        delete a.x1;
        a.angle = a.y;
        delete a.y;
        a.startAngle = a.y0;
        delete a.y0;
        a.endAngle = a.y1;
        delete a.y1;
        return a
    };
    d3.svg.chord = function () {
        function a(j, k) {
            var m = b(this, c, j, k), p = b(this, h, j, k);
            return "M" + m.p0 +
                ("A" + m.r + "," + m.r + " 0 " + +(m.a1 - m.a0 > Math.PI) + ",1 " + m.p1) + (m.a0 == p.a0 && m.a1 == p.a1 ? "Q 0,0 " + m.p0 : "Q 0,0 " + p.p0 + ("A" + p.r + "," + p.r + " 0 " + +(p.a1 - p.a0 > Math.PI) + ",1 " + p.p1) + ("Q 0,0 " + m.p0)) + "Z"
        }

        function b(a, c, h, p) {
            var s = c.call(a, h, p), c = j.call(a, s, p), h = k.call(a, s, p) + ta, a = m.call(a, s, p) + ta;
            return {r: c, a0: h, a1: a, p0: [c * Math.cos(h), c * Math.sin(h)], p1: [c * Math.cos(a), c * Math.sin(a)]}
        }

        var c = $b, h = ac, j = wc, k = Rb, m = Sb;
        a.radius = function (b) {
            if (!arguments.length)return j;
            j = d3.functor(b);
            return a
        };
        a.source = function (b) {
            if (!arguments.length)return c;
            c = d3.functor(b);
            return a
        };
        a.target = function (b) {
            if (!arguments.length)return h;
            h = d3.functor(b);
            return a
        };
        a.startAngle = function (b) {
            if (!arguments.length)return k;
            k = d3.functor(b);
            return a
        };
        a.endAngle = function (b) {
            if (!arguments.length)return m;
            m = d3.functor(b);
            return a
        };
        return a
    };
    d3.svg.diagonal = function () {
        function a(j, k) {
            var m = b.call(this, j, k), p = c.call(this, j, k), s = (m.y + p.y) / 2,
                m = [m, {x: m.x, y: s}, {x: p.x, y: s}, p], m = m.map(h);
            return "M" + m[0] + "C" + m[1] + " " + m[2] + " " + m[3]
        }

        var b = $b, c = ac, h = bc;
        a.source = function (c) {
            if (!arguments.length)return b;
            b = d3.functor(c);
            return a
        };
        a.target = function (b) {
            if (!arguments.length)return c;
            c = d3.functor(b);
            return a
        };
        a.projection = function (b) {
            if (!arguments.length)return h;
            h = b;
            return a
        };
        return a
    };
    d3.svg.diagonal.radial = function () {
        var a = d3.svg.diagonal(), b = bc, c = a.projection;
        a.projection = function (a) {
            var h;
            if (arguments.length) {
                var j = b = a;
                h = c(function () {
                    var a = j.apply(this, arguments), b = a[0], a = a[1] + ta;
                    return [b * Math.cos(a), b * Math.sin(a)]
                })
            } else h = b;
            return h
        };
        return a
    };
    d3.svg.mouse = function (a) {
        return cc(a, d3.event)
    };
    var tb =
        /WebKit/.test(navigator.userAgent) ? -1 : 0;
    d3.svg.touches = function (a, b) {
        2 > arguments.length && (b = d3.event.touches);
        return b ? Ra(b).map(function (b) {
            var c = cc(a, b);
            c.identifier = b.identifier;
            return c
        }) : []
    };
    d3.svg.symbol = function () {
        function a(h, j) {
            return (Gb[b.call(this, h, j)] || Gb.circle)(c.call(this, h, j))
        }

        var b = yc, c = xc;
        a.type = function (c) {
            if (!arguments.length)return b;
            b = d3.functor(c);
            return a
        };
        a.size = function (b) {
            if (!arguments.length)return c;
            c = d3.functor(b);
            return a
        };
        return a
    };
    var Gb = {
        circle: function (a) {
            a = Math.sqrt(a /
                Math.PI);
            return "M0," + a + "A" + a + "," + a + " 0 1,1 0," + -a + "A" + a + "," + a + " 0 1,1 0," + a + "Z"
        }, cross: function (a) {
            a = Math.sqrt(a / 5) / 2;
            return "M" + -3 * a + "," + -a + "H" + -a + "V" + -3 * a + "H" + a + "V" + -a + "H" + 3 * a + "V" + a + "H" + a + "V" + 3 * a + "H" + -a + "V" + a + "H" + -3 * a + "Z"
        }, diamond: function (a) {
            var a = Math.sqrt(a / (2 * nc)), b = a * nc;
            return "M0," + -a + "L" + b + ",0 0," + a + " " + -b + ",0Z"
        }, square: function (a) {
            a = Math.sqrt(a) / 2;
            return "M" + -a + "," + -a + "L" + a + "," + -a + " " + a + "," + a + " " + -a + "," + a + "Z"
        }, "triangle-down": function (a) {
            var a = Math.sqrt(a / ib), b = a * ib / 2;
            return "M0," + b + "L" + a + "," +
                -b + " " + -a + "," + -b + "Z"
        }, "triangle-up": function (a) {
            var a = Math.sqrt(a / ib), b = a * ib / 2;
            return "M0," + -b + "L" + a + "," + b + " " + -a + "," + b + "Z"
        }
    };
    d3.svg.symbolTypes = d3.keys(Gb);
    var ib = Math.sqrt(3), nc = Math.tan(30 * Math.PI / 180);
    d3.svg.axis = function () {
        function a(q) {
            q.each(function (a, v, K) {
                var G = d3.select(this), r = q.delay ? function (a) {
                        var b = Ca;
                        try {
                            return Ca = q.id, a.transition().delay(q[K][v].delay).duration(q[K][v].duration).ease(q.ease())
                        } finally {
                            Ca = b
                        }
                    } : Object, I = b.ticks ? b.ticks.apply(b, p) : b.domain(),
                    a = null == s ? b.tickFormat ? b.tickFormat.apply(b,
                        p) : String : s, u = n, t = [];
                if (u && 1 < I.length) {
                    for (var M = Ma(b.domain()), t, F = -1, w = I.length, D = (I[1] - I[0]) / ++u, ba,
                             U; ++F < w;)for (ba = u; 0 < --ba;)(U = +I[F] - ba * D) >= M[0] && t.push(U);
                    --F;
                    for (ba = 0; ++ba < u && (U = +I[F] + ba * D) < M[1];)t.push(U)
                }
                M = G.selectAll(".minor").data(t, String);
                U = M.enter().insert("line", "g").attr("class", "tick minor").style("opacity", 1E-6);
                u = r(M.exit()).style("opacity", 1E-6).remove();
                M = r(M).style("opacity", 1);
                F = G.selectAll("g").data(I, String);
                I = F.enter().insert("g", "path").style("opacity", 1E-6);
                t = r(F.exit()).style("opacity",
                    1E-6).remove();
                var F = r(F).style("opacity", 1), L, w = Za(b), G = G.selectAll(".domain").data([0]);
                G.enter().append("path").attr("class", "domain");
                var r = r(G), A = b.copy(), G = this.__chart__ || A;
                this.__chart__ = A;
                I.append("line").attr("class", "tick");
                I.append("text");
                F.select("text").text(a);
                switch (c) {
                    case "bottom":
                        L = dc;
                        U.attr("y2", j);
                        M.attr("x2", 0).attr("y2", j);
                        I.select("line").attr("y2", h);
                        I.select("text").attr("y", Math.max(h, 0) + m);
                        F.select("line").attr("x2", 0).attr("y2", h);
                        F.select("text").attr("x", 0).attr("y",
                            Math.max(h, 0) + m).attr("dy", ".71em").attr("text-anchor", "middle");
                        r.attr("d", "M" + w[0] + "," + k + "V0H" + w[1] + "V" + k);
                        break;
                    case "top":
                        L = dc;
                        U.attr("y2", -j);
                        M.attr("x2", 0).attr("y2", -j);
                        I.select("line").attr("y2", -h);
                        I.select("text").attr("y", -(Math.max(h, 0) + m));
                        F.select("line").attr("x2", 0).attr("y2", -h);
                        F.select("text").attr("x", 0).attr("y", -(Math.max(h, 0) + m)).attr("dy", "0em").attr("text-anchor", "middle");
                        r.attr("d", "M" + w[0] + "," + -k + "V0H" + w[1] + "V" + -k);
                        break;
                    case "left":
                        L = ec;
                        U.attr("x2", -j);
                        M.attr("x2", -j).attr("y2",
                            0);
                        I.select("line").attr("x2", -h);
                        I.select("text").attr("x", -(Math.max(h, 0) + m));
                        F.select("line").attr("x2", -h).attr("y2", 0);
                        F.select("text").attr("x", -(Math.max(h, 0) + m)).attr("y", 0).attr("dy", ".32em").attr("text-anchor", "end");
                        r.attr("d", "M" + -k + "," + w[0] + "H0V" + w[1] + "H" + -k);
                        break;
                    case "right":
                        L = ec, U.attr("x2", j), M.attr("x2", j).attr("y2", 0), I.select("line").attr("x2", h), I.select("text").attr("x", Math.max(h, 0) + m), F.select("line").attr("x2", h).attr("y2", 0), F.select("text").attr("x", Math.max(h, 0) + m).attr("y",
                            0).attr("dy", ".32em").attr("text-anchor", "start"), r.attr("d", "M" + k + "," + w[0] + "H0V" + w[1] + "H" + k)
                }
                if (b.ticks) I.call(L, G), F.call(L, A), t.call(L, A), U.call(L, G), M.call(L, A), u.call(L, A); else {
                    var ga = A.rangeBand() / 2, a = function (a) {
                        return A(a) + ga
                    };
                    I.call(L, a);
                    F.call(L, a)
                }
            })
        }

        var b = d3.scale.linear(), c = "bottom", h = 6, j = 6, k = 6, m = 3, p = [10], s, n = 0;
        a.scale = function (c) {
            if (!arguments.length)return b;
            b = c;
            return a
        };
        a.orient = function (b) {
            if (!arguments.length)return c;
            c = b;
            return a
        };
        a.ticks = function () {
            if (!arguments.length)return p;
            p = arguments;
            return a
        };
        a.tickFormat = function (b) {
            if (!arguments.length)return s;
            s = b;
            return a
        };
        a.tickSize = function (b, c, m) {
            if (!arguments.length)return h;
            var p = arguments.length - 1;
            h = +b;
            j = 1 < p ? +c : h;
            k = 0 < p ? +arguments[p] : h;
            return a
        };
        a.tickPadding = function (b) {
            if (!arguments.length)return m;
            m = +b;
            return a
        };
        a.tickSubdivide = function (b) {
            if (!arguments.length)return n;
            n = +b;
            return a
        };
        return a
    };
    d3.svg.brush = function () {
        function a(c) {
            var m = h && j ? "n e s w nw ne se sw".split(" ") : h ? ["e", "w"] : j ? ["n", "s"] : [];
            c.each(function () {
                var c =
                        d3.select(this).on("mousedown.brush", b), p = c.selectAll(".background").data([0]),
                    s = c.selectAll(".extent").data([0]), n = c.selectAll(".resize").data(m, String);
                p.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("pointer-events", "all").style("cursor", "crosshair");
                s.enter().append("rect").attr("class", "extent").style("cursor", "move");
                n.enter().append("rect").attr("class", function (a) {
                    return "resize " + a
                }).attr("width", 6).attr("height", 6).style("visibility", "hidden").style("cursor",
                    function (a) {
                        return Yc[a]
                    });
                n.style("pointer-events", a.empty() ? "none" : "all");
                n.exit().remove();
                h && (s = Za(h), p.attr("x", s[0]).attr("width", s[1] - s[0]), fc(c, k));
                j && (s = Za(j), p.attr("y", s[0]).attr("height", s[1] - s[0]), gc(c, k))
            })
        }

        function b() {
            var m = d3.select(d3.event.target);
            vb = a;
            ua = this;
            W = k;
            V = d3.svg.mouse(ua);
            (la = m.classed("extent")) ? (V[0] = k[0][0] - V[0], V[1] = k[0][1] - V[1]) : m.classed("resize") ? (Ea = d3.event.target.__data__, V[0] = k[+/w$/.test(Ea)][0], V[1] = k[+/^n/.test(Ea)][1]) : d3.event.altKey && (ia = V.slice());
            bb =
                !/^(n|s)$/.test(Ea) && h;
            cb = !/^(e|w)$/.test(Ea) && j;
            var p = this, s = arguments;
            Oa = function (b) {
                var h = d3.event;
                try {
                    d3.event = {type: b, target: a}, c[b].apply(p, s)
                } finally {
                    d3.event = h
                }
            };
            Oa("brushstart");
            ub();
            B()
        }

        var c = d3.dispatch("brushstart", "brush", "brushend"), h, j, k = [[0, 0], [0, 0]];
        a.x = function (b) {
            if (!arguments.length)return h;
            h = b;
            return a
        };
        a.y = function (b) {
            if (!arguments.length)return j;
            j = b;
            return a
        };
        a.extent = function (b) {
            var c, m, p, s, n;
            if (!arguments.length)return h && (c = k[0][0], m = k[1][0], h.invert && (c = h.invert(c), m =
                h.invert(m)), m < c && (n = c, c = m, m = n)), j && (p = k[0][1], s = k[1][1], j.invert && (p = j.invert(p), s = j.invert(s)), s < p && (n = p, p = s, s = n)), h && j ? [[c, p], [m, s]] : h ? [c, m] : j && [p, s];
            h && (c = b[0], m = b[1], j && (c = c[0], m = m[0]), h.invert && (c = h(c), m = h(m)), m < c && (n = c, c = m, m = n), k[0][0] = c, k[1][0] = m);
            j && (p = b[0], s = b[1], h && (p = p[1], s = s[1]), j.invert && (p = j(p), s = j(s)), s < p && (n = p, p = s, s = n), k[0][1] = p, k[1][1] = s);
            return a
        };
        a.clear = function () {
            k[0][0] = k[0][1] = k[1][0] = k[1][1] = 0;
            return a
        };
        a.empty = function () {
            return h && k[0][0] === k[1][0] || j && k[0][1] === k[1][1]
        };
        d3.select(window).on("mousemove.brush", ub).on("mouseup.brush", Bc).on("keydown.brush", zc).on("keyup.brush", Ac);
        return d3.rebind(a, c, "on")
    };
    var vb, Oa, ua, bb, cb, W, la, Ea, ia, V, Yc = {
        n: "ns-resize",
        e: "ew-resize",
        s: "ns-resize",
        w: "ew-resize",
        nw: "nwse-resize",
        ne: "nesw-resize",
        se: "nwse-resize",
        sw: "nesw-resize"
    };
    d3.behavior = {};
    d3.behavior.drag = function () {
        function a() {
            this.on("mousedown.drag", c).on("touchstart.drag", c);
            d3.select(window).on("mousemove.drag", jc).on("touchmove.drag", jc).on("mouseup.drag", yb, !0).on("touchend.drag",
                yb, !0).on("click.drag", Cc, !0)
        }

        function b() {
            xb = h;
            zb = d3.event.target;
            qa = this;
            db = arguments;
            va = ic();
            j ? (pa = j.apply(qa, db), pa = [pa.x - va[0], pa.y - va[1]]) : pa = [0, 0];
            wa = 0
        }

        function c() {
            b.apply(this, arguments);
            wb("dragstart")
        }

        var h = d3.dispatch("drag", "dragstart", "dragend"), j = null;
        a.origin = function (b) {
            if (!arguments.length)return j;
            j = b;
            return a
        };
        return d3.rebind(a, h, "on")
    };
    var xb, zb, qa, db, pa, va, wa;
    d3.behavior.zoom = function () {
        function a() {
            this.on("mousedown.zoom", c).on("mousewheel.zoom", h).on("DOMMouseScroll.zoom",
                h).on("dblclick.zoom", j).on("touchstart.zoom", k);
            d3.select(window).on("mousemove.zoom", Ec).on("mouseup.zoom", Fc).on("touchmove.zoom", Dc).on("touchend.zoom", kc).on("click.zoom", Gc, !0)
        }

        function b() {
            ea = m;
            Bb = s;
            Cb = p.zoom;
            Ab = d3.event.target;
            ja = this;
            Db = arguments
        }

        function c() {
            b.apply(this, arguments);
            Qa = eb(d3.svg.mouse(ja));
            Ga = 0;
            d3.event.preventDefault();
            window.focus()
        }

        function h() {
            b.apply(this, arguments);
            fb || (fb = eb(d3.svg.mouse(ja)));
            Ta || (Ta = d3.select("body").append("div").style("visibility", "hidden").style("top",
                0).style("height", 0).style("width", 0).style("overflow-y", "scroll").append("div").style("height", "2000px").node().parentNode);
            var a = d3.event, c;
            try {
                Ta.scrollTop = 1E3, Ta.dispatchEvent(a), c = 1E3 - Ta.scrollTop
            } catch (j) {
                c = a.wheelDelta || 5 * -a.detail
            }
            Fa(0.005 * c + m[2], d3.svg.mouse(ja), fb)
        }

        function j() {
            b.apply(this, arguments);
            var a = d3.svg.mouse(ja);
            Fa(d3.event.shiftKey ? Math.ceil(m[2] - 1) : Math.floor(m[2] + 1), a, eb(a))
        }

        function k() {
            b.apply(this, arguments);
            var a = kc(), c, h = Date.now();
            1 === a.length && 300 > h - oc && Fa(1 + Math.floor(m[2]),
                c = a[0], Pa[c.identifier]);
            oc = h
        }

        var m = [0, 0, 0], p = d3.dispatch("zoom"), s = pc;
        a.extent = function (b) {
            if (!arguments.length)return s;
            s = null == b ? pc : b;
            return a
        };
        return d3.rebind(a, p, "on")
    };
    var Ta, Qa, fb, Pa = {}, oc = 0, ea, Bb, Cb, Ab, ja, Db, Ga,
        pc = [[-Infinity, Infinity], [-Infinity, Infinity], [-Infinity, Infinity]]
})();
(function (a) {
    function b(a) {
        return a.text
    }

    function c() {
        return "serif"
    }

    function h() {
        return "normal"
    }

    function j(a) {
        return Math.sqrt(a.value)
    }

    function k() {
        return 30 * (~~(6 * Math.random()) - 3)
    }

    function m() {
        return 1
    }

    function q(a) {
        var b = a[0] / a[1];
        return function (a) {
            return [b * (a *= 0.1) * Math.cos(a), a * Math.sin(a)]
        }
    }

    var r = Math.PI / 180, n = 64, u = 2048, t, w = 1;
    "undefined" !== typeof document ? (t = document.createElement("canvas"), t.width = 1, t.height = 1, w = Math.sqrt(t.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2), t.width = (n <<
        5) / w, t.height = u / w) : t = new (require("canvas"))(n << 5, u);
    var A = t.getContext("2d"), N = {
        archimedean: q, rectangular: function (a) {
            var b = 4 * a[0] / a[1], c = 0, h = 0;
            return function (a) {
                var j = 0 > a ? -1 : 1;
                switch (Math.sqrt(1 + 4 * j * a) - j & 3) {
                    case 0:
                        c += b;
                        break;
                    case 1:
                        h += 4;
                        break;
                    case 2:
                        c -= b;
                        break;
                    default:
                        h -= 4
                }
                return [c, h]
            }
        }
    };
    A.fillStyle = "red";
    A.textAlign = "center";
    a.cloud = function () {
        var a = [256, 256], t = b, z = c, E = j, H = h, B = h, R = k, T = m, Q = q, C = [], p = Infinity,
            s = d3.dispatch("word", "end"), K = null, G = {
                start: function () {
                    function b() {
                        for (var h = +new Date,
                                 j; +new Date - h < p && ++N < q && K;) {
                            j = U[N];
                            j.x = a[0] * (Math.random() + 0.5) >> 1;
                            j.y = a[1] * (Math.random() + 0.5) >> 1;
                            a:{
                                var k = j, v = U, t = N;
                                if (!k.sprite) {
                                    A.clearRect(0, 0, (n << 5) / w, u / w);
                                    var M = 0, F = 0, L = 0, C = v.length;
                                    for (--t; ++t < C;) {
                                        k = v[t];
                                        A.save();
                                        A.font = k.style + " " + k.weight + " " + ~~((k.size + 1) / w) + "px " + k.font;
                                        var z = A.measureText(k.text + "m").width * w, E = k.size << 1;
                                        if (k.rotate)var B = Math.sin(k.rotate * r), H = Math.cos(k.rotate * r), O = z * H,
                                            J = z * B, H = E * H, z = E * B,
                                            z = Math.max(Math.abs(O + z), Math.abs(O - z)) + 31 >> 5 << 5,
                                            E = ~~Math.max(Math.abs(J + H), Math.abs(J -
                                                H)); else z = z + 31 >> 5 << 5;
                                        E > L && (L = E);
                                        M + z >= n << 5 && (M = 0, F += L, L = 0);
                                        if (F + E >= u)break;
                                        A.translate((M + (z >> 1)) / w, (F + (E >> 1)) / w);
                                        k.rotate && A.rotate(k.rotate * r);
                                        A.fillText(k.text, 0, 0);
                                        A.restore();
                                        k.width = z;
                                        k.height = E;
                                        k.xoff = M;
                                        k.yoff = F;
                                        k.x1 = z >> 1;
                                        k.y1 = E >> 1;
                                        k.x0 = -k.x1;
                                        k.y0 = -k.y1;
                                        k.hasText = !0;
                                        M += z
                                    }
                                    L = A.getImageData(0, 0, (n << 5) / w, u / w).data;
                                    for (C = []; 0 <= --t;)if (k = v[t], k.hasText) {
                                        z = k.width;
                                        O = z >> 5;
                                        E = k.y1 - k.y0;
                                        J = k.padding;
                                        for (B = 0; B < E * O; B++)C[B] = 0;
                                        M = k.xoff;
                                        if (null == M)break a;
                                        for (var F = k.yoff, H = 0, R = -1, fa = 0; fa < E; fa++) {
                                            for (B = 0; B <
                                            z; B++) {
                                                var X = O * fa + (B >> 5),
                                                    Y = L[(F + fa) * (n << 5) + (M + B) << 2] ? 1 << 31 - B % 32 : 0;
                                                J && (fa && (C[X - O] |= Y), fa < z - 1 && (C[X + O] |= Y), Y |= Y << 1 | Y >> 1);
                                                C[X] |= Y;
                                                H |= Y
                                            }
                                            H ? R = fa : (k.y0++, E--, fa--, F++)
                                        }
                                        k.y1 = k.y0 + R;
                                        k.sprite = C.slice(0, (k.y1 - k.y0) * O)
                                    }
                                }
                            }
                            if (k = j.hasText)a:{
                                k = c;
                                v = j;
                                t = m;
                                M = v.x;
                                F = v.y;
                                z = Math.sqrt(a[0] * a[0] + a[1] * a[1]);
                                E = Q(a);
                                L = 0.5 > Math.random() ? 1 : -1;
                                C = -L;
                                for (J = O = J = void 0; J = E(C += L);) {
                                    O = ~~J[0];
                                    J = ~~J[1];
                                    if (Math.min(O, J) > z)break;
                                    v.x = M + O;
                                    v.y = F + J;
                                    if (!(0 > v.x + v.x0 || 0 > v.y + v.y0 || v.x + v.x1 > a[0] || v.y + v.y1 > a[1])) {
                                        if (!(O = !t)) {
                                            b:{
                                                for (var O = a[0], O =
                                                        O >> 5, J = v.sprite, B = v.width >> 5, X = v.x - (B << 4), H = X & 127,
                                                         R = 32 - H, fa = v.y1 - v.y0, X = (v.y + v.y0) * O + (X >> 5),
                                                         Y = void 0, ma = 0; ma < fa; ma++) {
                                                    for (var na = Y = 0; na <= B; na++)if ((Y << R | (na < B ? (Y = J[ma * B + na]) >>> H : 0)) & k[X + na]) {
                                                        O = !0;
                                                        break b
                                                    }
                                                    X += O
                                                }
                                                O = !1
                                            }
                                            O = !O
                                        }
                                        if (O && (!t || v.x + v.x1 > t[0].x && v.x + v.x0 < t[1].x && v.y + v.y1 > t[0].y && v.y + v.y0 < t[1].y)) {
                                            t = v.sprite;
                                            M = v.width >> 5;
                                            F = a[0] >> 5;
                                            C = v.x - (M << 4);
                                            z = C & 127;
                                            E = 32 - z;
                                            L = v.y1 - v.y0;
                                            C = (v.y + v.y0) * F + (C >> 5);
                                            for (J = 0; J < L; J++) {
                                                for (B = O = 0; B <= M; B++)k[C + B] |= O << E | (B < M ? (O = t[J * M + B]) >>> z : 0);
                                                C += F
                                            }
                                            delete v.sprite;
                                            k = !0;
                                            break a
                                        }
                                    }
                                }
                                k =
                                    !1
                            }
                            k && (T.push(j), s.word(j), m ? (k = j, v = m[0], t = m[1], k.x + k.x0 < v.x && (v.x = k.x + k.x0), k.y + k.y0 < v.y && (v.y = k.y + k.y0), k.x + k.x1 > t.x && (t.x = k.x + k.x1), k.y + k.y1 > t.y && (t.y = k.y + k.y1)) : m = [{
                                x: j.x + j.x0,
                                y: j.y + j.y0
                            }, {x: j.x + j.x1, y: j.y + j.y1}], j.x -= a[0] >> 1, j.y -= a[1] >> 1)
                        }
                        N >= q && (G.stop(), s.end(T, m))
                    }

                    for (var c, h = (a[0] >> 5) * a[1], j = [], k = -1; ++k < h;)j[k] = 0;
                    c = j;
                    var m = null, q = C.length, N = -1, T = [], U = C.map(function (a, b) {
                        a.text = t.call(this, a, b);
                        a.font = z.call(this, a, b);
                        a.style = H.call(this, a, b);
                        a.weight = B.call(this, a, b);
                        a.rotate = R.call(this,
                            a, b);
                        a.size = ~~E.call(this, a, b);
                        a.padding = 1;
                        return a
                    }).sort(function (a, b) {
                        return b.size - a.size
                    });
                    K && clearInterval(K);
                    K = setInterval(b, 0);
                    b();
                    return G
                }, stop: function () {
                    K && (clearInterval(K), K = null);
                    return G
                }, timeInterval: function (a) {
                    if (!arguments.length)return p;
                    p = null == a ? Infinity : a;
                    return G
                }, words: function (a) {
                    if (!arguments.length)return C;
                    C = a;
                    return G
                }, size: function (b) {
                    if (!arguments.length)return a;
                    a = [+b[0], +b[1]];
                    return G
                }, font: function (a) {
                    if (!arguments.length)return z;
                    z = d3.functor(a);
                    return G
                }, fontStyle: function (a) {
                    if (!arguments.length)return H;
                    H = d3.functor(a);
                    return G
                }, fontWeight: function (a) {
                    if (!arguments.length)return B;
                    B = d3.functor(a);
                    return G
                }, rotate: function (a) {
                    if (!arguments.length)return R;
                    R = d3.functor(a);
                    return G
                }, text: function (a) {
                    if (!arguments.length)return t;
                    t = d3.functor(a);
                    return G
                }, spiral: function (a) {
                    if (!arguments.length)return Q;
                    Q = N[a + ""] || a;
                    return G
                }, fontSize: function (a) {
                    if (!arguments.length)return E;
                    E = d3.functor(a);
                    return G
                }, padding: function (a) {
                    if (!arguments.length)return T;
                    T = d3.functor(a);
                    return G
                }
            };
        return d3.rebind(G, s, "on")
    }
})("undefined" ===
typeof exports ? d3.layout || (d3.layout = {}) : exports);
var mapCurrentCenter = null, currentHighlightedMarker = null, highlightedMarkerIndex = -1, highlightedMarker = null,
    myMapLastPrivacy = "public", highlightAnimation = null, myMapAddedFiles = [], myMapDeletedFiles = [],
    myPoiToBeAdded = null, MAX_ALLOWED_POIS = 100, MAX_ALLOWED_MAPS = 20, OPEN_TAB_WITH_SHARED_MAP = !1,
    ADDMAPTYPE = "modal", MYALERTTYPE = "original", CUSTOM_MAP_INFOBOX_DELETE_BUTTON = !0, myMapLoaded = !1,
    sharedMapLoaded = !1, myMapUseRemote = !0, userMarkerFlashes = ["yellow", "red"], currentUserMarker = null,
    userMarkerFlashTimeout = 500, minUserZoomLevel =
        12, selectedMyMap = -1, myMapChanged = !0, KB_ARROW_LEFT = 37, KB_ARROW_UP = 38, KB_ARROW_RIGHT = 39,
    KB_ARROW_DOWN = 40, dropZoneConfig, dropZone = null, myMapPois = {}, sharedMapPois = {};
function toggleMyMap() {
    "mymap" != getSocialSelected() ? (switchToMyMap(), currentCustomMapAutoFit(), refreshCurrentCustomMapList(!0)) : (setSocialSelected("nosocial"), closeMyMapTab());
    socialselectUpdate()
}
function customMapGetId(a, b) {
    "undefined" === typeof b && (b = selectedMyMap);
    var c = a[b];
    return "undefined" === typeof c ? "" : c.db_id
}
function currentCustomMapGetId(a) {
    return "shared" == getSocialSelected() ? customMapGetId(sharedMapPois, a) : customMapGetId(myMapPois, a)
}
function myMapGetId(a) {
    return customMapGetId(myMapPois, a)
}
function myPoiGroupClick(a) {
    var a = $(a).parent(), b = a.find(".my-container");
    b.is(":visible") || (cancelSaveLocation(), $("#user_group_list .mymap-group").removeClass("group-active"), a.addClass("group-active"), a.parent().find(".my-container:visible").slideToggle(300), b.slideToggle(300), b.find("li .mypoifocus .icon").addClass("icon-white"), b.find("li").removeClass("highlight"), selectedMyMap = a.attr("data-key"), setCustomMapHeat(getCurrentCustomPois(), selectedMyMap), donePoiFetch(), currentCustomMapAutoFit())
}
function customMapAutoFit(a) {
    if (a[selectedMyMap] && a[selectedMyMap].poiList.length) {
        var b = new google.maps.LatLngBounds, c;
        for (c in a[selectedMyMap].poiList) {
            var h = a[selectedMyMap].poiList[c];
            b.extend(new google.maps.LatLng(h.lat, h.lng))
        }
        googleMap.fitBounds(b);
        var j = google.maps.event.addListener(googleMap, "idle", function () {
            10 < googleMap.getZoom() && googleMap.setZoom(10);
            google.maps.event.removeListener(j)
        })
    }
}
function myMapAutoFit() {
    return customMapAutoFit(myMapPois)
}
function currentCustomMapAutoFit() {
    return "shared" == getSocialSelected() ? customMapAutoFit(sharedMapPois) : customMapAutoFit(myMapPois)
}
function clearMyMapSelection() {
    $("#leftmenu_list li.highlight .mypoifocus .icon").addClass("icon-white");
    $("#leftmenu_list li.highlight").removeClass("highlight");
    highlightedMarkerIndex = -1;
    closeInfoBox();
    removeCurrentUserMarker();
    donePoiFetch()
}
function getCurrentCustomPois() {
    return "shared" == getSocialSelected() ? sharedMapPois : myMapPois
}
function myPoiListClick(a) {
    var a = $(a), b = a.parent(), c = b.find("li.highlight");
    c.find(".mypoifocus .icon").addClass("icon-white");
    c.removeClass("highlight");
    var b = b.attr("data-key"), h = a.attr("data-key");
    highlightAnimation = null;
    -1 != highlightedMarkerIndex && (highlightedMarkerIndex = -1, closeInfoBox());
    a[0] == c[0] ? clearMyMapSelection() : (null != currentUserMarker && removeCurrentUserMarker(), highlightedMarkerIndex = h, c = null, "undefined" !== typeof getCurrentCustomPois()[b] && "undefined" !== typeof getCurrentCustomPois()[b].poiList[h] &&
    (c = new google.maps.LatLng(getCurrentCustomPois()[b].poiList[h].lat, getCurrentCustomPois()[b].poiList[h].lng), null != c && (a.find(".mypoifocus .icon").removeClass("icon-white"), a.addClass("highlight"), donePoiFetch(), googleMap.setCenter(c))))
}
function deleteMyMapPoi(a, b, c) {
    if (myMapLoaded) {
        if ("undefined" === typeof myMapPois[a])return !1;
        var h = myMapPois[a].poiList;
        if (null == h || "undefined" === typeof h[b])return !1;
        var j = [], k;
        for (k in h)k != b && (j[j.length] = h[k]);
        mydeb(myMapPois[a].poiList, j);
        myMapPois[a].poiList = j;
        highlightedMarkerIndex = -1;
        saveMyPoiList();
        refreshMyMapList(!0);
        c || donePoiFetch();
        return !0
    }
}
function myPoiDelete(a) {
    fbForceLogin(function () {
        myPoiDeleteReal(a)
    }, !0)
}
function myPoiDeleteReal(a) {
    if (myMapLoaded) {
        var a = $(a), a = a.parent(), b = a.attr("data-key"), c = a.parent().attr("data-key"),
            a = a.contents().get(0).nodeValue;
        confirmModal({
            title: "Delete " + a,
            content: "Would you like to delete " + a + "?",
            buttons: [{
                caption: "Ok", click: function () {
                    deleteMyMapPoi(c, b, !1)
                }
            }, {
                caption: "Cancel", click: function () {
                }
            }]
        });
        return !1
    }
}
function myMapDeleteWin() {
    var a = $("#mapedit-id").val();
    return myMapDelete(a)
}
function myMapDelete(a) {
    if (myMapLoaded) {
        var b = myMapPois[a];
        "undefined" !== typeof b ? confirmModal({
            title: "Delete " + b.name,
            content: "Would you like to the map " + b.name + "?",
            buttons: [{
                caption: "Ok", click: function () {
                    var b = {}, h;
                    for (h in myMapPois)if (h != a) {
                        var j = h;
                        h > a && j--;
                        b[j] = myMapPois[h]
                    }
                    myMapPois = b;
                    saveMyPoiList();
                    refreshMyMapList(!0);
                    donePoiFetch()
                }
            }, {
                caption: "Cancel", click: function () {
                    refreshMyMapList(!0)
                }
            }]
        }) : (refreshMyMapList(!0), mydeb("map not found"))
    }
}
function myGroupBlur() {
    var a = $(this);
    if ("true" == a.attr("contenteditable")) {
        a.removeAttr("contenteditable", "");
        var b = a.html();
        if (a.attr("data-original") != b) {
            a.attr("data-original", b);
            var c = a.parent().attr("data-key");
            "undefined" !== typeof myMapPois[c] && (myMapPois[c].name = b, saveMyPoiList())
        }
        a.removeAttr("tabindex", "")
    }
}
function myGroupDblClick(a) {
    if (myMapLoaded && "shared" != getSocialSelected()) {
        var b = $(this).parent().attr("data-key");
        myMapEdit(b);
        (a || window.event).stopPropagation()
    }
}
function myPoiEditClick(a) {
    var b = $(this), a = a || window.event, c = b.parent().attr("data-key"), h = b.attr("data-key");
    myPoiEdit(h, c);
    b.hasClass("highlight") && a.stopPropagation();
    myPoiListClick(this)
}
function myGroupKeyDown(a) {
    13 == a.which ? ($(this).trigger("blur"), a.preventDefault()) : 27 == a.which && ($(this).html($(this).attr("data-original")), $(this).trigger("blur"), a.preventDefault())
}
function myMapShare(a) {
    "undefined" === typeof a && (a = selectedMyMap);
    var b = myMapPois[a];
    if ("friends" != b.privacy && "public" != b.privacy) myError('You can only share maps marked as "friends" or "public"', "Error"); else {
        var c = b.name;
        0 < b.db_id ? (openShare(a), $("#mytitle").val(c)) : saveMyPoiList(a, function () {
            openShare(a);
            $("#mytitle").val(c)
        })
    }
}
function myMapPrivacyClick(a) {
    myMapLoaded && (a = $(a).find("ul.my-privacy"), a.is(":visible") || a.show())
}
function setMyMapPrivacy(a, b) {
    if (myMapLoaded) {
        mydeb("click");
        var c = $(b).parents(".mymap-group"), h = c.attr("data-key"), h = a[h], j = $(b).attr("data-key");
        if ("undefined" !== typeof h) {
            var k = h.privacy;
            myMapLastPrivacy = h.privacy = j;
            c.removeClass("my-privacy-" + k);
            c.addClass("my-privacy-" + j);
            c.find(".my-privacy-current").html(j);
            c.find("li.my-privacy").removeClass("selected");
            $(b).addClass("selected");
            mydeb(c.find("ul.my-privacy"));
            c.find("ul.my-privacy").hide();
            saveMyPoiList()
        }
    }
}
function refreshCustomMapList(a, b, c) {
    if (myMapChanged || b) {
        $("#leftmenu_list");
        b = $("#user_group_list");
        b.empty();
        "undefined" === typeof a[selectedMyMap] && (selectedMyMap = Object.keys(a)[0]);
        for (var h in a) {
            var j = a[h], k = $("<li></li>"), m = !1;
            h == selectedMyMap && (m = !0);
            k.addClass("mymap-group");
            k.addClass("mymap-" + h);
            k.attr("data-key", h);
            var q = $('<span class="mymap-group-name track" spellcheck="false">' + j.name + "</span>");
            q.click(function () {
                myPoiGroupClick(this)
            });
            q.dblclick(myGroupDblClick);
            q.appendTo(k);
            var q =
                    $('<div class="my-container"></div>'),
                r = $('<div class="mymap-privacy track" style="float:right;position:relative;"><span class="my-privacy-current"></span><ul class="my-privacy"><li class="my-privacy my-privacy-public track" data-key="public">public</li><li class="my-privacy my-privacy-friends track" data-key="friends">visible to friends</li><li class="my-privacy my-privacy-private track" data-key="private">visible only to me</li></ul></div>');
            "" == j.privacy && (j.privacy = myMapLastPrivacy);
            c || (r.click(function () {
                myMapPrivacyClick(this)
            }),
                r.addClass("clickable"), r.mouseleave(function () {
                $(this).find("ul.my-privacy").hide()
            }), r.find("li.my-privacy").click(function (b) {
                var c = this;
                fbForceLogin(function () {
                    setMyMapPrivacy(a, c)
                }, !0);
                b.stopPropagation()
            }));
            "" != j.privacy && (k.addClass("my-privacy-" + j.privacy), r.find(".my-privacy-current").html(j.privacy), r.find(".my-privacy").removeClass("selected"), r.find(".my-privacy-" + j.privacy).addClass("selected"));
            var n = $('<div style="position:absolute;top:0px;right:5px;"></div>');
            n.appendTo(k);
            c || $('<div style="float:right;padding-top:3px;"><a class="mymap-button" onclick="myMapShare(' +
                h + ')" title="share this map">share</a><a class="mymap-button" style="" onclick="myMapEdit(' + h + ');" title="edit map settings">settings</a><a class="mymap-button" onclick="myMapDelete(' + h + ');" title="delete this map">delete</a></div>').appendTo(n);
            r.appendTo(n);
            j = j.poiList;
            if (null != j && j.length) {
                r = $("<ul></ul>");
                r.addClass("my-group");
                r.attr("data-key", h);
                for (var u in j) {
                    n = $('<li data-key="' + u + '">' + j[u].name + "</li>");
                    $('<div class="mypoidel track">X</div>').click(function () {
                        return myPoiDelete(this)
                    });
                    c ? n.click(function () {
                        myPoiListClick(this)
                    }) : n.click(myPoiEditClick);
                    var t = $('<div class="mypoifocus" title="click here to focus"><i class="icon icon-chevron-right icon-white"></i></div>');
                    t.click(function (a) {
                        myPoiListClick(this.parentNode);
                        (a || window.event).stopPropagation()
                    });
                    t.appendTo(n);
                    n.appendTo(r)
                }
                r.appendTo(q)
            }
            q.appendTo(k);
            k.appendTo(b);
            m ? (k.addClass("group-active"), q.show()) : q.hide()
        }
        $(".nano").nanoScroller();
        myMapChanged = !1
    }
}
function refreshMyMapList(a) {
    return refreshCustomMapList(myMapPois, a)
}
function refreshCurrentCustomMapList(a) {
    return "shared" == getSocialSelected() ? refreshCustomMapList(sharedMapPois, a, !0) : refreshCustomMapList(myMapPois, a)
}
function clearSavedLocationStorage() {
    try {
        localStorage.removeItem("savedLocations")
    } catch (a) {
    }
}
function initLocalSavedLocations() {
    try {
        if ("undefined" !== typeof Storage) {
            mydeb("trying local storage");
            var a = localStorage.getItem("savedLocations");
            if (void 0 !== a && null !== a)try {
                a = JSON.parse(a), "undefined" !== typeof a && (myMapPois = a)
            } catch (b) {
            }
        }
    } catch (c) {
    }
    refreshCurrentCustomMapList(!0)
}
function setMyMapLoaded() {
    myMapLoaded = !0;
    $("#leftmenu_overlay").hide()
}
function setSharedMapLoaded() {
    sharedMapLoaded = !0
}
function myMapRemoteFinished(a) {
    mydeb("remote answered with: " + a);
    if (void 0 !== a && null !== a) {
        try {
            a = JSON.parse(a)
        } catch (b) {
            delete a
        }
        if ("undefined" !== typeof a) {
            var c = a.listType;
            "shared" == c ? sharedMapPois = {} : myMapPois = {};
            var h = a.gotResults, a = a.mapList;
            "undefined" === typeof a && (a = []);
            for (var j = 0; j < a.length; j++) {
                curMyMap = j;
                for (var k = JSON.parse(a[j].poilist), m = [],
                         q = 0; q < k.length; q++)k[q] && ("undefined" === typeof k[q].lat || ("undefined" === typeof k[q].lng || null == k[q].lat || null == k[q].lng) || (m[m.length] = k[q]));
                "shared" ==
                c ? sharedMapPois[j] = {
                    id: curMyMap,
                    db_id: a[j].id,
                    name: a[j].name,
                    heatmap: a[j].heatmap,
                    poiList: m,
                    privacy: a[j].privacy
                } : myMapPois[j] = {
                    id: curMyMap,
                    db_id: a[j].id,
                    name: a[j].name,
                    heatmap: a[j].heatmap,
                    poiList: m,
                    privacy: a[j].privacy
                }
            }
            "shared" == c && (h ? 0 == a.length ? -1 == fbLoginUid ? fbModal("The map you tried to access requires you to log in with Facebook.", !0) : fbModal("The map you tried to access is private and requires you to be friends with the author.", !1) : ($("#shared_map_menu").show(), OPEN_TAB_WITH_SHARED_MAP &&
            openMyMapTab(!0), switchToSharedMap(), setSharedMapTitle(), currentCustomMapAutoFit()) : alertModal("The map you tried to view was not found. It might have been deleted. Please contact the person who sent you the link.", "Map not found"));
            refreshCurrentCustomMapList(!0)
        }
    }
    setMyMapLoaded()
}
function initRemoteSavedLocations() {
    myMapUseRemote ? (mydeb("trying remote"), $.post("code/mymap.php", {
        list: 1,
        token: fbToken,
        sts: pageLoadTimestamp,
        ts: (new Date).getTime()
    }, myMapRemoteFinished)) : setMyMapLoaded()
}
function cancelSaveLocation() {
    $("#myplacehelp").hide();
    $("#newmarkerhelp").hide();
    $("#poiedit_modal").modal("hide");
    removeCurrentUserMarker();
    var a;
    "modal" == ADDMAPTYPE ? (a = $("#location_modal"), a.find(".location_name").val(""), a.find(".location_rank").val(""), a.find(".location_description").val(""), a.find(".link-add").show(), a.find(".links-container").empty(), a.find(".location_add").hide()) : (a = $("#location_add"), a.remove());
    $(".mymap-" + selectedMyMap + " .my-new").find("button").show();
    endAddLocation()
}
function keepCurrentUserMarker() {
    null != currentUserMarker && (window.clearTimeout(currentUserMarker.flashTimeout), currentUserMarker = currentUserMarker.flashTimeout = null)
}
function createMyMapTitle(a) {
    var b = "My Map", c = a + 1;
    1 < c && (b += " " + c);
    for (var h in myMapPois)if (myMapPois[h].name == b)return createMyMapTitle(a + 1);
    return b
}
function setCurrentMap(a) {
    return "shared" == getSocialSelected() ? setSharedMap(a) : setMyMap(a)
}
function setCustomMapHeat(a, b) {
    "undefined" !== typeof a[b] && ("n" == a[b].heatmap && heatmapFlag ? heatmapToggle() : "n" != a[b].heatmap && !heatmapFlag && heatmapToggle(), heatmapFlag ? $("#heatmap_button").addClass("active") : $("#heatmap_button").removeClass("active"))
}
function setMyMap(a) {
    var b;
    null == a && -1 == selectedMyMap ? a = b = 0 : b = a;
    if (null == a || "undefined" === typeof myMapPois[b]) {
        b = createNewMyMap(b);
        if ("undefined" === typeof b)return;
        myMapChanged = !0
    }
    if (null == myMapPois[b].poiList) {
        myMapPois[b].poiList = lastShownPois.slice();
        for (var c in mapMarkersArray);
        myMapChanged = !0
    }
    selectedMyMap != b && (myMapChanged = !0);
    selectedMyMap = b;
    setCustomMapHeat(myMapPois, selectedMyMap);
    refreshCurrentCustomMapList();
    return b
}
function setSharedMap(a) {
    if (!(null == a && "undefined" === typeof sharedMapPois[0])) {
        if (null == sharedMapPois[0].poiList) {
            sharedMapPois[0].poiList = lastShownPois.slice();
            for (var b in mapMarkersArray);
            myMapChanged = !0
        }
        0 != selectedMyMap && (selectedMyMap = 0, myMapChanged = !0);
        setCustomMapHeat(sharedMapPois, selectedMyMap);
        refreshCurrentCustomMapList();
        return 0
    }
}
function getMyMap(a) {
    if ("shared" == getSocialSelected())return getSharedMap(a);
    null == a && (a = selectedMyMap);
    return "undefined" === typeof myMapPois[a] ? [] : myMapPois[a].poiList
}
function getSharedMap(a) {
    null == a && (a = 0);
    return "undefined" === typeof sharedMapPois[a] ? [] : sharedMapPois[a].poiList
}
function createNewMyMap(a, b) {
    if (myMapLoaded) {
        for ("undefined" === typeof a && (a = 0); "undefined" !== typeof myMapPois[a];)a++;
        var c = "n";
        heatmapFlag && (c = "y");
        var h;
        h = b ? [] : lastShownPois.slice();
        var j = 1, k;
        for (k in h)h[k].name || (h[k].name = "Unnamed place", 1 < j && (h[k].name += " " + j), j++);
        myMapPois[a] = {id: a, db_id: 0, name: createMyMapTitle(a), heatmap: c, poiList: h, privacy: myMapLastPrivacy};
        return a
    }
}
function switchToMyMap(a) {
    fbForceLogin(function () {
        switchToMyMapReal(a)
    })
}
function switchToMyMapReal(a) {
    myMapLoaded || window.setTimeout(function () {
        switchToMyMap(a)
    }, 50);
    "mymap" != getSocialSelected() ? (setSocialSelected("mymap"), a || (a = Object.keys(myMapPois)[0]), "undefined" === typeof myMapPois[a] && (a = Object.keys(myMapPois)[0])) : null == a && (a = selectedMyMap);
    setMyMap(a);
    openMyMapTab();
    setCustomMapHeat(myMapPois, selectedMyMap);
    refreshMyMapList(!0)
}
function switchToSharedMap(a) {
    "shared" != getSocialSelected() ? (setSocialSelected("shared"), a || (a = Object.keys(myMapPois)[0]), "undefined" === typeof sharedMapPois[a] && (a = Object.keys(sharedMapPois)[0])) : null == a && (a = selectedMyMap);
    setSharedMap(a);
    refreshCurrentCustomMapList(!0);
    OPEN_TAB_WITH_SHARED_MAP ? openMyMapTab() : closeMyMapTab()
}
function setSharedMapTitle() {
    var a = Object.keys(sharedMapPois);
    if (0 != a.length && (a = sharedMapPois[a[0]].name, "" != a))for ($("#logotxt").text(a); 350 < $("#logotxt").width();)$("#logotxt").css("font-size", parseInt($("#logotxt").css("font-size")) - 1 + "px")
}
function saveMyPoiListRemote(a, b) {
    var c;
    if (a) {
        if (c = myMapPois[a], "undefined" === typeof c)return !1
    } else c = myMapPois;
    $.post("code/mymap.php", {
        data: JSON.stringify(c),
        id: a,
        token: fbToken,
        sts: pageLoadTimestamp,
        ts: (new Date).getTime()
    }, function (a) {
        mydeb("remote save:", a);
        try {
            a = JSON.parse(a)
        } catch (c) {
            delete a
        }
        if ("undefined" === typeof a)return !1;
        if ("undefined" === typeof a.ids)return !0;
        for (var k in myMapPois)"undefined" !== typeof a.ids[k] && (myMapPois[k].db_id = a.ids[k]);
        "function" === typeof b && b(a)
    })
}
function myAlert(a, b) {
    "original" === MYALERTTYPE ? showAlert(a) : alertModal(a, b)
}
function myError(a, b) {
    "original" === MYALERTTYPE ? showError(a) : alertModal(a, b)
}
function saveMyPoiList(a, b) {
    try {
        localStorage.setItem("savedLocations", JSON.stringify(myMapPois))
    } catch (c) {
    }
    saveMyPoiListRemote(a, b)
}
function fixUrlProtocol(a) {
    return a.match(/^h+p+t+$/i) ? "http" : a.match(/^h+p+t+s+$/i) ? "https" : a.match(/^h+t+p+$/i) ? "http" : a.match(/^h+t+p+s+$/i) ? "https" : a.toLowerCase()
}
function fixUrl(a) {
    var a = a.trim(), b = a.split("://");
    if (1 == b.length) {
        if (a.match(/^mailto:/i))return a;
        b = a.split(/\:+\/+/);
        return 1 < b.length ? (b[0] = fixUrlProtocol(b[0]), b.join("://")) : "http://" + a
    }
    b[0] = fixUrlProtocol(b[0]);
    return b.join("://")
}
function saveLocation() {
    fbForceLogin(function () {
        saveLocationReal()
    })
}
function saveLocationReal() {
    if (myMapLoaded) {
        var a;
        a = "modal" == ADDMAPTYPE ? $("#location_modal") : $("#location_add");
        var b = a.find(".location_id").val();
        switchToMyMap();
        var c = a.find(".location_name").val().trim(), h = a.find(".location_rank").val().trim(),
            j = a.find(".location_description").val().trim(),
            k = {lat: null, lng: null, links: [], urank: h, images: myMapAddedFiles, name: c, description: j};
        null == currentUserMarker && !b ? ("" == c.trim() ? cancelSaveLocation() : myError("Please click on the map first and choose a location.",
            "Error"), mydeb("nothing to save")) : (null != currentUserMarker && (k.lat = currentUserMarker.position.lat(), k.lng = currentUserMarker.position.lng()), "" == c ? myError("Please enter a name", "Error") : (a.find(".link").each(function () {
            var a = $(this).find(".location_link_url").val().trim(),
                b = $(this).find(".location_link_desc").val().trim();
            if ("" == a)return !0;
            a = fixUrl(a);
            "" == b && (b = a);
            k.links.push({url: a, title: b})
        }), h = a.find(".location_group").val(), "undefined" !== typeof myMapPois[h] && ("" != b ? "undefined" !== typeof myMapPois[h].poiList[b] &&
            (myMapPois[h].poiList[b].name = k.name, myMapPois[h].poiList[b].urank = k.urank, myMapPois[h].poiList[b].description = k.description, myMapPois[h].poiList[b].links = k.links, myMapPois[h].poiList[b].images = k.images) : myMapPois[h].poiList.push(k), $("#newmarkerhelp").hide(), saveMyPoiList(), refreshMyMapList(!0), hideAlerts(), b ? showQuickAlert(k.name + " has been updated!", 2E3) : showQuickAlert("Your place has been saved! You may add another.", 2E3), endAddLocation(), null != currentUserMarker && (currentUserMarker.setDraggable(!1),
            currentUserMarker.setTitle(c)), removeCurrentUserMarker(), $("#poiedit_modal").modal("hide"), donePoiFetch(), a.find(".links-container").empty(), a.find(".link-add").show(), a.find(".location_name").val(""), a.find(".location_description").val(""), a.find(".location_rank").val(""), a.find(".location_id").val(""), a.find(".location_name").focus(), $("#poiinfo_modal").is(":visible") && b && poiShowMoreInfoModal(myMapPois[h].poiList[b].un))))
    }
}
function mydeb() {
}
function flashCurrentMarker() {
    if (!(null == currentUserMarker || null == currentUserMarker.flashTimeout) && !(1 >= userMarkerFlashes.length)) {
        var a = currentUserMarker.currentIconNumber;
        a++;
        a >= userMarkerFlashes.length && (a = 0);
        var b = pinSymbol(userMarkerFlashes[a]);
        currentUserMarker.setIcon(b);
        currentUserMarker.currentIconNumber = a;
        currentUserMarker.flashTimeout = window.setTimeout(flashCurrentMarker, userMarkerFlashTimeout)
    }
}
function pinSymbol(a) {
    return {
        path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0",
        fillColor: a,
        fillOpacity: 0.9,
        strokeColor: "#000",
        strokeWeight: 2,
        scale: 1.3
    }
}
function closeMyMapTab() {
    removeCurrentUserMarker();
    highlightedMarkerIndex = -1;
    return $("#map_leftmenu").is(":visible") ? ($("#map_leftmenu").hide("slide", {direction: "left"}, 500), $("#map_canvas").animate({left: 0}, 500, function () {
        $(".alert").css("left", "70px")
    }), $("#alertbar").animate({left: 70}), donePoiFetch(), !0) : !1
}
function openMyMapTab(a) {
    initUserLocationGroups();
    $("#leftmenu_main").hide();
    $("#leftmenu_list").show();
    if (!$("#map_leftmenu").is(":visible")) {
        var b = $("#map_leftmenu").outerWidth();
        a ? ($("#map_leftmenu").show(), $("#map_canvas").css("left", b + "px"), $("#alertbar").css("left", b + 70 + "px"), $(".alert").css("left", b + 70 + "px"), currentCustomMapAutoFit()) : ($("#map_leftmenu").show("slide", {direction: "left"}, 500), $("#map_canvas").animate({left: b}, 500, function () {
            $(".alert").css("left", b + 70 + "px");
            currentCustomMapAutoFit()
        }),
            $("#alertbar").animate({left: b + 70}));
        return !0
    }
    return !1
}
function openDataTab() {
    initUserLocationGroups();
    $("#leftmenu_main").show();
    $("#leftmenu_list").hide();
    if (!$("#map_leftmenu").is(":visible")) {
        var a = $("#map_leftmenu").outerWidth();
        $("#map_leftmenu").show("slide", {direction: "left"}, 500);
        $("#map_canvas").animate({left: a}, 500, function () {
        });
        $("#alertbar").animate({left: a + 70});
        return !0
    }
    return !1
}
function alertModal(a, b) {
    b || (b = "Alert");
    var c = $("#alert_modal");
    c.find(".alert-title").html(b);
    c.find(".alert-content").html(a);
    c.modal({})
}
function addLocation(a, b) {
    fbForceLogin(function () {
        addLocationReal(a, b)
    }, !0)
}
function addLocationReal(a, b) {
    if (myMapLoaded) {
        $("#alertbar").hide();
        a && $("#newmarker-placeadded").attr("disabled", "disabled").removeClass("btn-primary");
        document.body.style.cursor = "pointer";
        googleMap.setOptions({draggableCursor: "crosshair"});
        highlightedMarkerIndex = -1;
        clearMyMapSelection();
        openMyMapTab();
        switchToMyMap();
        donePoiFetch();
        if (Object.keys(myPoiListAll()).length >= MAX_ALLOWED_POIS)return alertModal("You have reached the limit of " + MAX_ALLOWED_POIS + " places per map.", "Cannot add location"),
            !1;
        openAddMap();
        b && $("#newmarkerhelp").show();
        mapClickHandler = mapClickHandlerNewLocation
    }
}
function mapClickHandlerNewLocation(a) {
    $("#newmarker-placeadded").removeAttr("disabled").addClass("btn-primary");
    userAddMarker(a)
}
function myLinkChange(a) {
    a = $(a);
    a.parent().is(":last-child") && "" != a.val() && $("#location_modal .link-add").click()
}
function myLinkRemove(a) {
    $(a).parent().remove();
    0 == $("#location_modal .links_container .link").length && ($("#location_modal .location_links").hide(), locationParent.find(".link-add").show());
    return !1
}
function confirmModal(a) {
    var b = $("#confirm_modal");
    a.title && b.find(".confirm-title").text(a.title);
    a.content && b.find(".confirm-content").text(a.content);
    a.buttons || (a.buttons = [{
        caption: "Ok", click: function () {
        }
    }]);
    var c = b.find(".modal-footer");
    c.empty();
    for (var h in a.buttons) {
        var j = a.buttons[h].click,
            k = $('<a href="#" class="btn btn-primary confirm-btn" data-dismiss="modal">' + a.buttons[h].caption + "</a>");
        j && k.click(j);
        c.append(k)
    }
    b.modal({})
}
function myPoiDeleteConfirmation(a, b, c) {
    null == a && (a = selectedMyMap);
    confirmModal({
        title: "Delete " + c,
        content: "Would you like to delete " + c + "?",
        buttons: [{
            caption: "Ok", click: function () {
                deleteMyMapPoi(a, b, !1);
                $("#poiedit_modal").modal("hide")
            }
        }, {
            caption: "Cancel", click: function () {
            }
        }]
    })
}
function myPoiDeleteWin() {
    if (!myMapLoaded)return !1;
    var a;
    a = "modal" == ADDMAPTYPE ? $("#location_modal") : $("#location_add");
    var b = a.find(".location_id").val(), c = a.find(".location_group").val(),
        h = a.find(".location_name").attr("data-original").trim(), j = a.find(".location_name").val().trim();
    a.find(".location_rank").val().trim();
    a = a.find(".location_description").val().trim();
    if ("" == h && "" == j && "" == a)return cancelSaveLocation(), !1;
    "" != j && (h = j);
    "" == h && (h = "Untitled Location");
    myPoiDeleteConfirmation(c, b, h);
    return !1
}
function myPoiEdit(a, b, c) {
    myPoiEditReal(a, b, c)
}
function myPoiEditReal(a, b) {
    if (myMapLoaded) {
        "undefined" === typeof b && (b = selectedMyMap);
        var c = myMapPois[b];
        if ("undefined" === typeof c) mydeb("no map", b, myMapPois); else {
            var h = c.poiList[a];
            if ("undefined" === typeof h) mydeb("no poi", b, a, c.poiList); else {
                "modal" == ADDMAPTYPE ? (c = $("#location_modal"), $("#poiedit_modal h3").text("Edit " + h.name), c.find(".link-add").show(), c.find(".links-container").empty()) : c = $("#location_add");
                c.find(".location_group").val(b);
                c.find(".location_name").val(h.name);
                c.find(".location_rank").val(h.urank);
                c.find(".location_name").attr("data-original", h.name);
                c.find(".location_description").val(h.description);
                c.find(".location_id").val(a);
                c.find(".link").remove();
                var j = c.find("div.location_images");
                j[0].dropzone && (j[0].dropzone.destroy(), j.empty());
                if (!h.images || "undefined" === typeof h.images) h.images = [];
                createDropzone(j[0], h.images);
                myMapAddedFiles = h.images.slice();
                "undefined" !== typeof h.images && h.images.length ? j.show() : j.hide();
                if ((h = h.links) && h.length) {
                    for (var j = c.find(".link_dummy").clone(!0, !0).removeClass("link_dummy").addClass("link").show(),
                             k = c.find(".links_container"), m = 0; m < h.length; m++) {
                        var q = j.clone(!0, !0);
                        q.find(".location_link_url").val(h[m].url);
                        q.find(".location_link_desc").val(h[m].title);
                        k.append(q)
                    }
                    c.find(".location_links").show()
                } else c.find(".location_links").hide();
                myMapDeletedFiles = [];
                $("#poiedit_modal").modal({})
            }
        }
    }
}
function myMapEdit(a) {
    fbForceLogin(function () {
        myMapEditReal(a)
    }, !0)
}
function myMapEditReal(a) {
    if (myMapLoaded) {
        "undefined" === typeof a && (a = selectedMyMap);
        var b = myMapPois[a];
        "undefined" === typeof b ? mydeb("no map", a, myMapPois) : ($("#mapedit_modal").find("h3").text("Edit " + b.name), $("#mapedit-id").val(a), "y" == b.heatmap ? ($("#mapedit-heatmap").prop("checked", !0), $("#mapedit-heatmap").bootstrapSwitch("state", !0, !0)) : ($("#mapedit-heatmap").prop("checked", !1), $("#mapedit-heatmap").bootstrapSwitch("state", !1, !0)), $("#mapedit-privacy").val(b.privacy), $("#mapedit-name").val(b.name),
            $("#mapedit-privacy-buttons .btn").removeClass("active"), $("#mapedit-privacy-buttons .btn[data-privacy='" + b.privacy + "']").addClass("active"), $("#mapedit_modal").modal({}))
    }
}
function setMyMapEditPrivacy(a) {
    a = $(a);
    $("#mapedit-privacy-buttons .btn").removeClass("active");
    $("#mapedit-privacy").val(a.attr("data-privacy"));
    a.addClass("active")
}
function saveMyMap() {
    if (myMapLoaded) {
        var a = $("#mapedit-id").val();
        if (!("undefined" === typeof a || "undefined" === typeof myMapPois[a])) {
            var b = myMapPois[a], c = $("#mapedit-name").val().trim();
            "" != c && (b.name = c);
            b.heatmap = $("#mapedit-heatmap").prop("checked") ? "y" : "n";
            b.privacy = $("#mapedit-privacy").val();
            hideAlerts();
            showQuickAlert("Your map settings have been updated.", 2E3);
            refreshMyMapList(!0);
            saveMyPoiList();
            a == selectedMyMap && setCustomMapHeat(getCurrentCustomPois(), selectedMyMap);
            $("#mapedit_modal").modal("hide")
        }
    }
}
function cancelMyMapSave() {
}
function createDropzone(a, b) {
    if ("undefined" === typeof b || null == b) b = [];
    var c = new Dropzone(a, dropZoneConfig);
    c.on("removedfile", function (a) {
        var b = null;
        try {
            b = a.name
        } catch (c) {
        }
        if (!(null == b || "undefined" === typeof b)) {
            var a = [], h;
            for (h in myMapAddedFiles)try {
                var j = myMapAddedFiles[h].link;
                "undefined" !== typeof j && (j = j.split("/").slice(-1)[0], j != b && (a[a.length] = myMapAddedFiles[h]))
            } catch (u) {
            }
            myMapAddedFiles = a
        }
    });
    c.on("processing", function () {
        $("#saveLocationBtn").removeAttr("onclick");
        $("#saveLocationBtn").removeClass("btn-blue btn-primary");
        $("#saveLocationBtn").unbind("click");
        $("#saveLocationBtn").bind("click", function () {
            alertModal("Please wait until the files have finished uploading and then try to save again.", "Files are uploading")
        })
    });
    c.on("queuecomplete", function () {
        $("#saveLocationBtn").addClass("btn-blue btn-primary");
        $("#saveLocationBtn").unbind("click");
        $("#saveLocationBtn").bind("click", function () {
            saveLocation()
        })
    });
    c.on("success", function (a) {
        var b = {}, c;
        try {
            b = JSON.parse(a.xhr.responseText);
            if (null == b || "undefined" === typeof b) b =
                {};
            c = JSON.parse(b.images[0]).data
        } catch (h) {
            return
        }
        myMapAddedFiles[myMapAddedFiles.length] = c
    });
    for (var h in b)if (b[h].link) {
        var j = {name: b[h].link.split("/").slice(-1)[0], size: b[h].size};
        c.emit("addedfile", j);
        c.emit("thumbnail", j, getImageThumb(b[h].link));
        c.emit("complete", j)
    }
}
function openAddMapModal(a) {
    if (myMapLoaded) {
        openMyMapTab();
        myMapAddedFiles = [];
        myMapDeletedFiles = [];
        var b;
        if ("modal" == ADDMAPTYPE) b = $("#location_modal"), $("#poiedit_modal h3").text("New place"); else {
            b = $("#location_add_modal_dummy").children().clone(!0, !0);
            $("#location_add").remove();
            var c = $("#poiedit-content");
            c.find("button").hide();
            c.find(".location_add").attr("id", "location_add");
            b.appendTo(c);
            b.show();
            b = $("#location_add")
        }
        c = b.find("div.location_images");
        c[0].dropzone && (c[0].dropzone.destroy(), c.empty());
        c.hide();
        createDropzone(c[0]);
        $(".mymap-" + selectedMyMap);
        b.find(".location_group").val(selectedMyMap);
        b.find(".location_id").val("");
        a || $("#newmarkerhelp").show()
    }
}
$(function () {
    $(window).resize(function () {
        1200 > $(window).width() ? $(".btn").css("padding", "4px 5px") : $(".btn").css("padding", "")
    });
    $(window).trigger("resize");
    var a;
    a = "321udram".split("").reverse().join("");
    a += "@";
    a += ["a", "m", "g"].reverse().join("") + "il";
    a += ".";
    a += ["m", "o", "c"].reverse().join("");
    var b;
    b = ["o", "t", "l", "i"].reverse().join("");
    $("#feedback-button").attr("href", "ma" + b + ":" + a + "?subject=Sightsmap");
    $('input[type="checkbox"], input[type="radio"]').not("[data-switch-no-init]").bootstrapSwitch();
    $("#mymaps_modal").on("hidden", function () {
        myPoiToBeAdded = null
    });
    dropZoneConfig = {
        url: "code/myimage.php",
        uploadMultiple: !0,
        paramName: "image",
        autoProcessQueue: !0,
        parallelUploads: 2,
        clickable: !0,
        addRemoveLinks: !0,
        maxFileSize: 10,
        dictDefaultMessage: "Click here or drop files here to upload them."
    };
    Dropzone.autoDiscover = !1;
    Dropzone.confirm = function (a, b, j) {
        confirmModal({
            title: "Image Upload", content: a, buttons: [{
                caption: "Ok", click: function () {
                    b()
                }
            }, {
                caption: "Cancel", click: function () {
                    "undefined" !== typeof j && j()
                }
            }]
        })
    }
});
function openAddMap() {
    if ("modal" == ADDMAPTYPE)return openAddMapModal();
    if (myMapLoaded) {
        openMyMapTab();
        var a = $("#location_add_dummy").children().clone(!0, !0), b = $(".mymap-" + selectedMyMap).find(".my-new");
        b.find("button").hide();
        $("#location_add").remove();
        a.appendTo(b);
        b.find(".location_add").attr("id", "location_add");
        $("#location_add .location_group").val(selectedMyMap);
        $("#location_add .location_id").val("");
        a.show();
        $("#location_add div.location_images").dropzone({
            url: "code/myimage.php", uploadMultiple: !0,
            maxFileSize: 10, paramName: "image", autoProcessQueue: !0, parallelUploads: 2, clickable: !0
        })
    }
}
function endAddLocation() {
    setNormalMapState();
    mapClickHandler = defaultMapClickHandler
}
function removeCurrentUserMarker() {
    null != currentUserMarker && (window.clearTimeout(currentUserMarker.flashTimeout), currentUserMarker.flashTimeout = null, currentUserMarker.setMap(null), currentUserMarker = null)
}
function userAddMarker(a) {
    -1 != highlightedMarkerIndex && clearMyMapSelection();
    googleMap.getZoom() < minUserZoomLevel && mydeb("Too far away, zooming in");
    null != currentUserMarker && removeCurrentUserMarker();
    var b = pinSymbol("yellow"), b = new google.maps.Marker({
        map: googleMap,
        draggable: !0,
        animation: google.maps.Animation.DROP,
        icon: b,
        position: a
    });
    b.currentIconNumber = 0;
    currentUserMarker = b;
    b.flashTimeout = window.setTimeout(flashCurrentMarker, userMarkerFlashTimeout);
    mydeb("right", a.lat(), a.lng());
    $("#location_add .location_name").focus()
}
function initUserLocationGroups() {
}
function checkMapLimit() {
    return Object.keys(myMapPois).length >= MAX_ALLOWED_MAPS ? (alertModal("You have reached the limit of " + MAX_ALLOWED_MAPS + " maps.", "Cannot add new map"), !1) : !0
}
function newMyMap() {
    $("#newmap-dropdown").hide();
    fbForceLogin(function () {
        newMyMapReal()
    }, !0)
}
function newMyMapReal() {
    myMapLoaded && checkMapLimit() && (newMapId = createNewMyMap(), switchToMyMap(newMapId), donePoiFetch(), saveMyPoiList(), refreshMyMapList(!0))
}
function newEmptyMyMap() {
    $("#newmap-dropdown").hide();
    fbForceLogin(function () {
        lastShownPois = [];
        newMyMapReal()
    }, !0)
}
function newEmptyMyMapReal() {
    myMapLoaded && checkMapLimit() && (lastShownPois = [], newMyMap())
}
function findPoiByIndex(a) {
    for (var b in lastShownPois)if (lastShownPois[b].un == a)return lastShownPois[b];
    return !1
}
function findPoiKeyByIndex(a) {
    for (var b in lastShownPois)if (lastShownPois[b].un == a)return b;
    return !1
}
function poiCloseMoreInfo() {
    "mymap" == getSocialSelected() ? openMyMapTab() : closeMyMapTab()
}
function myWikiInfoResultWP(a) {
    return myWikiInfoResult(a, "Wikipedia")
}
function myWikiInfoResultWV(a) {
    return myWikiInfoResult(a, "Wikivoyage")
}
function myWikiInfoResult(a, b) {
    b || (b = "Read more");
    var c = $("#place-api-description"), h = c.attr("data-fallback-title"), j = c.attr("data-fallback"),
        k = c.attr("data-fallback-readmore");
    if (0 != c.length) {
        "1" == c.attr("data-loading") && c.html("");
        try {
            if (null == a || "undefined" === typeof a)throw 1;
            var m = a.query.pages, q = Object.keys(m)[0], r = m[q].title, n = m[q].extract;
            if (null == n || "undefined" === typeof n)throw 2;
            if (decodeURIComponent(c.attr("data-title")) == r) {
                var u = c.attr("data-readmore");
                c.css("text-align", "justify");
                c.attr("data-loading",
                    0);
                c.text(n);
                "" != u && "undefined" !== typeof u && c.append(' <a href="' + u + '" target="_blank" class="readmore">' + b + "</a>");
                $(c).dotdotdot({height: 200, after: "a.readmore"})
            } else throw 3;
        } catch (t) {
            "" != j && "undefined" !== typeof j && ("" != h && "undefined" !== typeof h && c.attr("data-title", h), "" != k && "undefined" !== typeof k && c.attr("data-readmore", k), c.html('<script onerror="myWikiInfoResult()" src="' + j + '"><\/script>'))
        }
        c.removeAttr("data-fallback");
        c.removeAttr("data-fallback-readmore");
        c.removeAttr("data-fallback-title")
    }
}
function poiIsCustom(a) {
    return null == a.photo || "undefined" === typeof a.photo
}
function poiShowMoreInfoModal(a) {
    var b = findPoiByIndex(a);
    if ("undefined" !== typeof b) {
        var c = findPoiKeyByIndex(a), a = $("#poiinfo-content");
        a.empty();
        var h = $("#poiinfo_modal .footer-buttons");
        h.empty();
        var j = poiGetWikiHtml(b), k = poiGetGoogleSearchHtml(b), m = poiGetTripAdvisorSearchHtml(b),
            q = poiGetWikiVoyageHtml(b), r = poiGetFourSquareHtml(b), n = poiGetGooglePlaceHtml(b),
            u = poiGetPhotosHtml(b, "modal-poi-"), t = poiGetPanoramioHtml(b);
        poiGetImage(b);
        var w = poiGetStreetViewHtml(b);
        poiIsCustom(b) && (m = t = "");
        var A = poiGetRankHtml(b),
            N = poiGetZoomButtonHtml(b, "btn-detailedinfo"), D = "", J;
        J = "" + (" <a href=\"javascript:addToMyMap('" + b.un + "');\" class='btn btn-primary btn-detailedinfo' title=\"save this place to a custom map\">add to map</a>");
        "mymap" == getSocialSelected() && (J += " <a class='btn btn-primary btn-detailedinfo' href=\"javascript:myPoiEdit('" + c + "');\">edit</a>");
        b.tags && (J += " <a class='btn btn-primary btn-detailedinfo' href=\"javascript:tagCloud('" + b.tags + "','#tmarker" + b.un + "');\">tagcloud</a>");
        h.html(J + ("" + N));
        "" != u && (D +=
            '<div style="float:left;">' + u + '<div style="clear:both;"></div></div>');
        if (b.description) D += '<div class="user-description">' + b.description + "</div>"; else {
            J = N = u = h = c = "";
            var z = poiGetSummaryTitle(b);
            if ("" != z) {
                var E = poiGetWikiVoyagePage(b);
                "" != E && "undefined" !== typeof E && (c = getWikiVoyageApiUrl() + E, h = getWikiVoyageUrl() + E);
                E = poiGetWikiPage(b);
                if ("" != E && "undefined" !== typeof E) {
                    var H = getWikiApiUrl() + E;
                    "" != c ? (u = H, N = E, J = getWikiUrl() + E) : (c = H, h = getWikiUrl() + E)
                }
                D += "<div class='user-description' id='place-api-description' data-loading='1' data-title='" +
                    jsEscape(z) + "' data-readmore=\"" + h + "\" data-fallback='" + jsEscape(u) + "' data-fallback-title='" + jsEscape(N) + "' data-fallback-readmore=\"" + J + '">';
                "" != c && (D += "<script onerror='myWikiInfoResult()' src='" + c + "'><\/script>");
                D += "</div>"
            }
        }
        D += '<div style="clear:both;"></div>';
        "" != A && (D += "<br>" + A + "<br>");
        if (b.links && b.links.length) {
            D += '<div class="user-links">';
            for (A = 0; A < b.links.length; A++) {
                h = b.links[A];
                c = h.url;
                h = h.title;
                "" == h && (h = c);
                try {
                    new URL(c)
                } catch (B) {
                }
                D += '<div><a href="' + c + '" target="_blank">' + h;
                D += "</a></div>"
            }
            D +=
                "</div>"
        }
        a.html(D + ('<div style="background-color:white;padding:6px;width:auto;margin-top:10px;">' + t + w + j + q + r + n + m + k + "</div>"));
        $("#poiinfo_modal h3").text(poiGetTitle(b));
        $("#poiinfo_modal").modal({})
    }
}
function poiShowMoreInfo(a) {
    return poiShowMoreInfoModal(a)
}
$(function () {
    $(".modal").on("show", function () {
        hideAlerts()
    });
    $(".modal").on("shown", function () {
        $(this).find("[autofocus]:first").focus()
    });
    initLocalSavedLocations();
    $(".nano").nanoScroller()
});
function getUrlParameter(a) {
    for (var b = window.location.search.substring(1).split("&"), c = 0; c < b.length; c++) {
        var h = b[c].split("=");
        if (h[0] == a)return h[1]
    }
}
function addToMyMap(a) {
    var b = findPoiByIndex(a);
    "undefined" !== typeof b && (b.name || (b.name = "Unnamed place"), $("#mymaps_modal h3").text(b.name), myPoiToBeAdded = b, listMyMaps(a))
}
function listMyMaps(a) {
    var b, c;
    b = soa == [] ? "" : listMyMapsStr();
    "" == b ? (b = "No custom maps", $("#mymaps_modal_addto").hide()) : $("#mymaps_modal_addto").show();
    showMyMapsList(b, a);
    c = $("table");
    $("#my_map_title_header, #my_map_poicount_header, #my_map_privacy_header").wrapInner('<span title="sort this column"/>').each(function () {
        var a = $(this), b = a.index(), k = !1;
        a.click(function () {
            c.find("td").filter(function () {
                return $(this).index() === b
            }).sortElements(function (a, b) {
                    return $.text([a]) > $.text([b]) ? k ? -1 : 1 : k ? 1 : -1
                },
                function () {
                    return this.parentNode
                });
            k = !k
        })
    })
}
function listMyMapsStr() {
    var a, b, c, h, j;
    if (1 > myMapPois.length)return "";
    b = [];
    for (var k in myMapPois)b[k] = myMapPois[k];
    if (b == [])return "";
    b.sort(sortMyMaps);
    tbl = "<table id='mymapstbl' class='table table-condensed'>\n";
    tbl += "<tr><th></th><th id='my_map_title_header'>Map Name</th><th id='my_map_poicount_header'>Number of Places</th><th id='my_map_privacy_header'>Privacy</th>\n";
    var m = Object.keys(b).length;
    0 == m && (b[0] = {poiList: [], name: createMyMapTitle(0), privacy: "public", id: 0}, m = 1);
    for (k in b) {
        var q = !1;
        1 == m && (q = !0);
        mapdata = b[k];
        if ("undefined" === typeof mapdata.poiList || null == mapdata.poiList) mapdata.poiList = [], b[k] = mapdata;
        a = mapdata.name;
        h = 40 < a.length ? a.substring(0, 40) + "..." : a;
        j = mapdata.privacy;
        poicount = mapdata.poiList.length;
        id = mapdata.id;
        c = '<input type="checkbox" name="addToMyMapField[]" class="addToMyMapField" value="' + k + '" title="Check to add place to this map" style="width:18px;height:18px;padding:0;margin:0;"';
        q && (c += " checked");
        c += ">";
        tbl += "<tr><td>" + c + "</td>";
        tbl += "<td><a href='javascript:;' title='" +
            sanitizeTxt(a, 100) + '\' onclick=\'addPoiToMyMaps($("#mymapst").attr("data-poi"),[' + k + "]);return false;'>" + sanitizeTxt(h, 40) + "</td>";
        tbl += "<td>" + poicount + "</td>";
        tbl += "<td class='my-privacy-list my-privacy-" + j + "'>" + j + "</td>";
        tbl += "</tr>\n"
    }
    return tbl += "</table>\n"
}
function sortMyMaps(a, b) {
    var c, h;
    c = (c = a.name) ? c.toLowerCase() : "";
    h = (h = b.name) ? h.toLowerCase() : "";
    return c < h ? -1 : 1
}
function myPoiListAll() {
    return customPoiListAll(myMapPois)
}
function customPoiListAll(a) {
    var b = {}, c;
    for (c in a) {
        var h = a[c];
        if (h.poiList)for (var j in h.poiList) {
            var k = h.poiList[j], m = k.lat + "," + k.lng + "," + k.name;
            "undefined" === typeof b[m] && (b[m] = {poi: null, maps: {}}, b[m].poi = k);
            b[m].maps[c] = j
        }
    }
    return b
}
function listMyPlaces() {
    var a, b;
    a = myPoiListAll();
    a = 0 == Object.keys(a).length ? "No places saved" : listMyPlacesStr(a);
    showMyPlacesList(a);
    b = $("table");
    $("#my_title_header, #my_lat_header, #my_lng_header").wrapInner('<span title="sort this column"/>').each(function () {
        var a = $(this), h = a.index(), j = !1;
        a.click(function () {
            b.find("td").filter(function () {
                return $(this).index() === h
            }).sortElements(function (a, b) {
                return $.text([a]) > $.text([b]) ? j ? -1 : 1 : j ? 1 : -1
            }, function () {
                return this.parentNode
            });
            j = !j
        })
    })
}
function listMyPlacesStr(a) {
    var b, c, h, j, k, m, q;
    if (0 == Object.keys(a).length)return "";
    j = "<table id='myplacetbl' class='table table-condensed'>\n<tr><th></th><th id='my_title_header'>Title</th><th id='my_rate_header'>Rating</th><th id='my_lat_header'>Lat</th><th id='my_lng_header'>Lng</th></tr>\n";
    for (var r in a) {
        q = a[r].maps;
        b = a[r].poi;
        var n;
        console.log(b.maps);
        try {
            n = Object.keys(q)[0]
        } catch (u) {
            continue
        }
        k = b.zoom;
        c = b.name;
        h = b.description;
        (q = b.urank) || (q = "");
        h || (h = "");
        stitle = 20 < c.length ? c.substring(0, 20) +
            "..." : c;
        20 < h.length && h.substring(0, 20);
        surank = 20 < q.length ? q.substring(0, 20) + "..." : q;
        h = b.lat;
        c = round6(h);
        m = b.lng;
        b = round6(m);
        k = "<button class='btn btn-primary btn-small flat' onclick=\"poiGo(" + h + "," + m + "," + k + "," + n + '); closeMyPlacesList(); ">go</button>';
        j += "<tr><td>" + k + "</td>";
        j += "<td>" + stitle + "</td>";
        j += "<td><a href='#' rel='tooltip' title='" + sanitizeTxt(q, 200) + "'>" + sanitizeTxt(surank, 30) + "</a></td>";
        j += "<td>" + c + "</td><td>" + b + "</td></tr>\n"
    }
    return j + "</table>\n"
}
function hideAlerts() {
    $(".alert").hide()
}
function showMyMapsList(a, b) {
    $("#mymapst").html(a);
    $("#mymapst").attr("data-poi", b);
    $("#mymaps_modal").modal({})
}
function closeMyMapsList() {
    $("#mymaps_modal").modal("hide")
}
function addPoiToMyMaps(a, b) {
    var c = myPoiToBeAdded;
    null == c && (c = findPoiByIndex(a));
    if ("undefined" !== typeof c) {
        0 == Object.keys(myMapPois).length && "0" == b.join("") && createNewMyMap(0, !0);
        for (var h = [], j = 0; j < b.length; j++) {
            var k = myMapPois[b[j]];
            "undefined" !== typeof k && (k.poiList.push(c), h.push(k.name))
        }
        hideAlerts();
        h.length ? (showQuickAlert("<b>" + c.name + "</b> added to " + h.join(", "), 3E3), closeMyMapsList(), saveMyPoiList(), myPoiToBeAdded = null, refreshMyMapList(!0)) : showError("No maps selected. Please select a map and try again.")
    }
}
function sendFeedback() {
};(function () {
    var a, b, c, h, j, k, m = [].slice, q = {}.hasOwnProperty;
    j = function () {
    };
    var r = function () {
    };
    r.prototype.addEventListener = r.prototype.on;
    r.prototype.on = function (a, b) {
        this._callbacks = this._callbacks || {};
        this._callbacks[a] || (this._callbacks[a] = []);
        this._callbacks[a].push(b);
        return this
    };
    r.prototype.emit = function () {
        var a, b, c, h, j;
        b = arguments[0];
        a = 2 <= arguments.length ? m.call(arguments, 1) : [];
        this._callbacks = this._callbacks || {};
        if (c = this._callbacks[b]) {
            h = 0;
            for (j = c.length; h < j; h++)b = c[h], b.apply(this, a)
        }
        return this
    };
    r.prototype.removeListener = r.prototype.off;
    r.prototype.removeAllListeners = r.prototype.off;
    r.prototype.removeEventListener = r.prototype.off;
    r.prototype.off = function (a, b) {
        var c, h, j, k, m;
        if (!this._callbacks || 0 === arguments.length)return this._callbacks = {}, this;
        h = this._callbacks[a];
        if (!h)return this;
        if (1 === arguments.length)return delete this._callbacks[a], this;
        j = k = 0;
        for (m = h.length; k < m; j = ++k)if (c = h[j], c === b) {
            h.splice(j, 1);
            break
        }
        return this
    };
    var n = function (a, b) {
        var c, h, j;
        this.element = a;
        this.version = n.version;
        this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, "");
        this.clickableElements = [];
        this.listeners = [];
        this.files = [];
        "string" === typeof this.element && (this.element = document.querySelector(this.element));
        if (!(this.element && null != this.element.nodeType))throw Error("Invalid dropzone element.");
        if (this.element.dropzone)throw Error("Dropzone already attached.");
        n.instances.push(this);
        this.element.dropzone = this;
        c = null != (j = n.optionsForElement(this.element)) ? j : {};
        this.options =
            u({}, this.defaultOptions, c, null != b ? b : {});
        if (this.options.forceFallback || !n.isBrowserSupported())return this.options.fallback.call(this);
        null == this.options.url && (this.options.url = this.element.getAttribute("action"));
        if (!this.options.url)throw Error("No URL provided.");
        if (this.options.acceptedFiles && this.options.acceptedMimeTypes)throw Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
        this.options.acceptedMimeTypes && (this.options.acceptedFiles =
            this.options.acceptedMimeTypes, delete this.options.acceptedMimeTypes);
        this.options.method = this.options.method.toUpperCase();
        (h = this.getExistingFallback()) && h.parentNode && h.parentNode.removeChild(h);
        !1 !== this.options.previewsContainer && (this.previewsContainer = this.options.previewsContainer ? n.getElement(this.options.previewsContainer, "previewsContainer") : this.element);
        this.options.clickable && (this.clickableElements = !0 === this.options.clickable ? [this.element] : n.getElements(this.options.clickable, "clickable"));
        this.init()
    }, u, t, w = n, A = function () {
        this.constructor = w
    }, N;
    for (N in r)q.call(r, N) && (w[N] = r[N]);
    A.prototype = r.prototype;
    w.prototype = new A;
    w.__super__ = r.prototype;
    n.prototype.Emitter = r;
    n.prototype.events = "drop dragstart dragend dragenter dragover dragleave addedfile removedfile thumbnail error errormultiple processing processingmultiple uploadprogress totaluploadprogress sending sendingmultiple success successmultiple canceled canceledmultiple complete completemultiple reset maxfilesexceeded maxfilesreached queuecomplete".split(" ");
    n.prototype.defaultOptions = {
        url: null,
        method: "post",
        withCredentials: !1,
        parallelUploads: 2,
        uploadMultiple: !1,
        maxFilesize: 256,
        paramName: "file",
        createImageThumbnails: !0,
        maxThumbnailFilesize: 10,
        thumbnailWidth: 120,
        thumbnailHeight: 120,
        filesizeBase: 1E3,
        maxFiles: null,
        filesizeBase: 1E3,
        params: {},
        clickable: !0,
        ignoreHiddenFiles: !0,
        acceptedFiles: null,
        acceptedMimeTypes: null,
        autoProcessQueue: !0,
        autoQueue: !0,
        addRemoveLinks: !1,
        previewsContainer: null,
        capture: null,
        dictDefaultMessage: "Drop files here to upload",
        dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
        dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
        dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
        dictInvalidFileType: "You can't upload files of this type.",
        dictResponseError: "Server responded with {{statusCode}} code.",
        dictCancelUpload: "Cancel upload",
        dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
        dictRemoveFile: "Remove file",
        dictRemoveFileConfirmation: null,
        dictMaxFilesExceeded: "You can not upload any more files.",
        accept: function (a, b) {
            return b()
        },
        init: function () {
            return j
        },
        forceFallback: !1,
        fallback: function () {
            var a, b, c, h, j;
            this.element.className = "" + this.element.className + " dz-browser-not-supported";
            j = this.element.getElementsByTagName("div");
            c = 0;
            for (h = j.length; c < h; c++)a = j[c], /(^| )dz-message($| )/.test(a.className) && (b = a, a.className = "dz-message");
            b || (b = n.createElement('<div class="dz-message"><span></span></div>'), this.element.appendChild(b));
            if (a = b.getElementsByTagName("span")[0]) a.textContent = this.options.dictFallbackMessage;
            return this.element.appendChild(this.getFallbackForm())
        },
        resize: function (a) {
            var b, c, h;
            b = {srcX: 0, srcY: 0, srcWidth: a.width, srcHeight: a.height};
            c = a.width / a.height;
            b.optWidth = this.options.thumbnailWidth;
            b.optHeight = this.options.thumbnailHeight;
            null == b.optWidth && null == b.optHeight ? (b.optWidth = b.srcWidth, b.optHeight = b.srcHeight) : null == b.optWidth ? b.optWidth = c * b.optHeight : null == b.optHeight && (b.optHeight = 1 / c * b.optWidth);
            h = b.optWidth / b.optHeight;
            a.height < b.optHeight || a.width < b.optWidth ? (b.trgHeight = b.srcHeight,
                b.trgWidth = b.srcWidth) : c > h ? (b.srcHeight = a.height, b.srcWidth = b.srcHeight * h) : (b.srcWidth = a.width, b.srcHeight = b.srcWidth / h);
            b.srcX = (a.width - b.srcWidth) / 2;
            b.srcY = (a.height - b.srcHeight) / 2;
            return b
        },
        drop: function () {
            return this.element.classList.remove("dz-drag-hover")
        },
        dragstart: j,
        dragend: function () {
            return this.element.classList.remove("dz-drag-hover")
        },
        dragenter: function () {
            return this.element.classList.add("dz-drag-hover")
        },
        dragover: function () {
            return this.element.classList.add("dz-drag-hover")
        },
        dragleave: function () {
            return this.element.classList.remove("dz-drag-hover")
        },
        paste: j,
        reset: function () {
            return this.element.classList.remove("dz-started")
        },
        addedfile: function (a) {
            var b, c, h, j, k, m;
            this.element === this.previewsContainer && this.element.classList.add("dz-started");
            if (this.previewsContainer) {
                a.previewElement = n.createElement(this.options.previewTemplate.trim());
                a.previewTemplate = a.previewElement;
                this.previewsContainer.appendChild(a.previewElement);
                j = a.previewElement.querySelectorAll("[data-dz-name]");
                c = 0;
                for (h = j.length; c < h; c++)b = j[c], b.textContent = a.name;
                j = a.previewElement.querySelectorAll("[data-dz-size]");
                c = 0;
                for (h = j.length; c < h; c++)b = j[c], b.innerHTML = this.filesize(a.size);
                this.options.addRemoveLinks && (a._removeLink = n.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>' + this.options.dictRemoveFile + "</a>"), a.previewElement.appendChild(a._removeLink));
                var q = this;
                b = function (b) {
                    b.preventDefault();
                    b.stopPropagation();
                    return a.status === n.UPLOADING ? n.confirm(q.options.dictCancelUploadConfirmation, function () {
                        return q.removeFile(a)
                    }) : q.options.dictRemoveFileConfirmation ? n.confirm(q.options.dictRemoveFileConfirmation,
                        function () {
                            return q.removeFile(a)
                        }) : q.removeFile(a)
                };
                k = a.previewElement.querySelectorAll("[data-dz-remove]");
                m = [];
                h = 0;
                for (j = k.length; h < j; h++)c = k[h], m.push(c.addEventListener("click", b));
                return m
            }
        },
        removedfile: function (a) {
            var b;
            a.previewElement && null != (b = a.previewElement) && b.parentNode.removeChild(a.previewElement);
            return this._updateMaxFilesReachedClass()
        },
        thumbnail: function (a, b) {
            var c, h, j, k;
            if (a.previewElement) {
                a.previewElement.classList.remove("dz-file-preview");
                k = a.previewElement.querySelectorAll("[data-dz-thumbnail]");
                h = 0;
                for (j = k.length; h < j; h++)c = k[h], c.alt = a.name, c.src = b;
                return setTimeout(function () {
                    return a.previewElement.classList.add("dz-image-preview")
                }, 1)
            }
        },
        error: function (a, b) {
            var c, h, j, k, m;
            if (a.previewElement) {
                a.previewElement.classList.add("dz-error");
                "String" !== typeof b && b.error && (b = b.error);
                k = a.previewElement.querySelectorAll("[data-dz-errormessage]");
                m = [];
                h = 0;
                for (j = k.length; h < j; h++)c = k[h], m.push(c.textContent = b);
                return m
            }
        },
        errormultiple: j,
        processing: function (a) {
            if (a.previewElement && (a.previewElement.classList.add("dz-processing"),
                    a._removeLink))return a._removeLink.textContent = this.options.dictCancelUpload
        },
        processingmultiple: j,
        uploadprogress: function (a, b) {
            var c, h, j, k, m;
            if (a.previewElement) {
                k = a.previewElement.querySelectorAll("[data-dz-uploadprogress]");
                m = [];
                h = 0;
                for (j = k.length; h < j; h++)c = k[h], "PROGRESS" === c.nodeName ? m.push(c.value = b) : m.push(c.style.width = "" + b + "%");
                return m
            }
        },
        totaluploadprogress: j,
        sending: j,
        sendingmultiple: j,
        success: function (a) {
            if (a.previewElement)return a.previewElement.classList.add("dz-success")
        },
        successmultiple: j,
        canceled: function (a) {
            return this.emit("error", a, "Upload canceled.")
        },
        canceledmultiple: j,
        complete: function (a) {
            a._removeLink && (a._removeLink.textContent = this.options.dictRemoveFile);
            if (a.previewElement)return a.previewElement.classList.add("dz-complete")
        },
        completemultiple: j,
        maxfilesexceeded: j,
        maxfilesreached: j,
        queuecomplete: j,
        previewTemplate: '<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>'
    };
    u = function () {
        var a, b, c, h, j, k, n;
        h = arguments[0];
        c = 2 <= arguments.length ? m.call(arguments, 1) : [];
        k = 0;
        for (n = c.length; k < n; k++)for (a in b = c[k], b)j = b[a], h[a] = j;
        return h
    };
    n.prototype.getAcceptedFiles = function () {
        var a, b, c, h, j;
        h = this.files;
        j = [];
        b = 0;
        for (c = h.length; b < c; b++)a = h[b], a.accepted && j.push(a);
        return j
    };
    n.prototype.getRejectedFiles = function () {
        var a, b, c, h, j;
        h = this.files;
        j = [];
        b = 0;
        for (c = h.length; b < c; b++)a = h[b], a.accepted || j.push(a);
        return j
    };
    n.prototype.getFilesWithStatus = function (a) {
        var b, c, h, j, k;
        j = this.files;
        k = [];
        c = 0;
        for (h = j.length; c < h; c++)b = j[c], b.status === a && k.push(b);
        return k
    };
    n.prototype.getQueuedFiles = function () {
        return this.getFilesWithStatus(n.QUEUED)
    };
    n.prototype.getUploadingFiles = function () {
        return this.getFilesWithStatus(n.UPLOADING)
    };
    n.prototype.getActiveFiles = function () {
        var a, b, c, h, j;
        h = this.files;
        j = [];
        b = 0;
        for (c = h.length; b < c; b++)a = h[b], (a.status === n.UPLOADING || a.status === n.QUEUED) && j.push(a);
        return j
    };
    n.prototype.init = function () {
        var a, b, c, h, j, k;
        "form" === this.element.tagName && this.element.setAttribute("enctype",
            "multipart/form-data");
        this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message") && this.element.appendChild(n.createElement('<div class="dz-default dz-message"><span>' + this.options.dictDefaultMessage + "</span></div>"));
        if (this.clickableElements.length) {
            var m = this;
            c = function () {
                m.hiddenFileInput && document.body.removeChild(m.hiddenFileInput);
                m.hiddenFileInput = document.createElement("input");
                m.hiddenFileInput.setAttribute("type", "file");
                (null == m.options.maxFiles || 1 < m.options.maxFiles) &&
                m.hiddenFileInput.setAttribute("multiple", "multiple");
                m.hiddenFileInput.className = "dz-hidden-input";
                null != m.options.acceptedFiles && m.hiddenFileInput.setAttribute("accept", m.options.acceptedFiles);
                null != m.options.capture && m.hiddenFileInput.setAttribute("capture", m.options.capture);
                m.hiddenFileInput.style.visibility = "hidden";
                m.hiddenFileInput.style.position = "absolute";
                m.hiddenFileInput.style.top = "0";
                m.hiddenFileInput.style.left = "0";
                m.hiddenFileInput.style.height = "0";
                m.hiddenFileInput.style.width = "0";
                document.body.appendChild(m.hiddenFileInput);
                return m.hiddenFileInput.addEventListener("change", function () {
                    var a, b, h, j;
                    b = m.hiddenFileInput.files;
                    if (b.length) {
                        h = 0;
                        for (j = b.length; h < j; h++)a = b[h], m.addFile(a)
                    }
                    return c()
                })
            };
            c()
        }
        this.URL = null != (a = window.URL) ? a : window.webkitURL;
        k = this.events;
        h = 0;
        for (j = k.length; h < j; h++)a = k[h], this.on(a, this.options[a]);
        this.on("uploadprogress", function (a) {
            return function () {
                return a.updateTotalUploadProgress()
            }
        }(this));
        this.on("removedfile", function (a) {
            return function () {
                return a.updateTotalUploadProgress()
            }
        }(this));
        this.on("canceled", function (a) {
            return function (b) {
                return a.emit("complete", b)
            }
        }(this));
        this.on("complete", function (a) {
            return function () {
                if (0 === a.getUploadingFiles().length && 0 === a.getQueuedFiles().length)return setTimeout(function () {
                    return a.emit("queuecomplete")
                }, 0)
            }
        }(this));
        b = function (a) {
            a.stopPropagation();
            return a.preventDefault ? a.preventDefault() : a.returnValue = !1
        };
        var q = this, r = this, t = this, u = this, w = this, A = this;
        this.listeners = [{
            element: this.element, events: {
                dragstart: function (a) {
                    return q.emit("dragstart",
                        a)
                }, dragenter: function (a) {
                    b(a);
                    return r.emit("dragenter", a)
                }, dragover: function (a) {
                    var c;
                    try {
                        c = a.dataTransfer.effectAllowed
                    } catch (h) {
                    }
                    a.dataTransfer.dropEffect = "move" === c || "linkMove" === c ? "move" : "copy";
                    b(a);
                    return t.emit("dragover", a)
                }, dragleave: function (a) {
                    return u.emit("dragleave", a)
                }, drop: function (a) {
                    b(a);
                    return w.drop(a)
                }, dragend: function (a) {
                    return A.emit("dragend", a)
                }
            }
        }];
        this.clickableElements.forEach(function (a) {
            return function (b) {
                return a.listeners.push({
                    element: b, events: {
                        click: function (c) {
                            if (b !==
                                a.element || c.target === a.element || n.elementInside(c.target, a.element.querySelector(".dz-message")))return a.hiddenFileInput.click()
                        }
                    }
                })
            }
        }(this));
        this.enable();
        return this.options.init.call(this)
    };
    n.prototype.destroy = function () {
        var a;
        this.disable();
        this.removeAllFiles(!0);
        if (null != (a = this.hiddenFileInput) && a.parentNode) this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput), this.hiddenFileInput = null;
        delete this.element.dropzone;
        return n.instances.splice(n.instances.indexOf(this), 1)
    };
    n.prototype.updateTotalUploadProgress =
        function () {
            var a, b, c, h, j, k;
            b = c = 0;
            if (this.getActiveFiles().length) {
                k = this.getActiveFiles();
                h = 0;
                for (j = k.length; h < j; h++)a = k[h], c += a.upload.bytesSent, b += a.upload.total;
                a = 100 * c / b
            } else a = 100;
            return this.emit("totaluploadprogress", a, b, c)
        };
    n.prototype._getParamName = function (a) {
        return "function" === typeof this.options.paramName ? this.options.paramName(a) : "" + this.options.paramName + (this.options.uploadMultiple ? "[" + a + "]" : "")
    };
    n.prototype.getFallbackForm = function () {
        var a, b;
        if (a = this.getExistingFallback())return a;
        a = '<div class="dz-fallback">';
        this.options.dictFallbackText && (a += "<p>" + this.options.dictFallbackText + "</p>");
        a += '<input type="file" name="' + this._getParamName(0) + '" ' + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + ' /><input type="submit" value="Upload!"></div>';
        a = n.createElement(a);
        "FORM" !== this.element.tagName ? (b = n.createElement('<form action="' + this.options.url + '" enctype="multipart/form-data" method="' + this.options.method + '"></form>'), b.appendChild(a)) : (this.element.setAttribute("enctype",
            "multipart/form-data"), this.element.setAttribute("method", this.options.method));
        return null != b ? b : a
    };
    n.prototype.getExistingFallback = function () {
        var a, b, c, h, j;
        b = function (a) {
            var b, c, h;
            c = 0;
            for (h = a.length; c < h; c++)if (b = a[c], /(^| )fallback($| )/.test(b.className))return b
        };
        j = ["div", "form"];
        c = 0;
        for (h = j.length; c < h; c++)if (a = j[c], a = b(this.element.getElementsByTagName(a)))return a
    };
    n.prototype.setupEventListeners = function () {
        var a, b, c, h, j, k, m;
        k = this.listeners;
        m = [];
        h = 0;
        for (j = k.length; h < j; h++)a = k[h], m.push(function () {
            var h,
                j;
            h = a.events;
            j = [];
            for (b in h)c = h[b], j.push(a.element.addEventListener(b, c, !1));
            return j
        }());
        return m
    };
    n.prototype.removeEventListeners = function () {
        var a, b, c, h, j, k, m;
        k = this.listeners;
        m = [];
        h = 0;
        for (j = k.length; h < j; h++)a = k[h], m.push(function () {
            var h, j;
            h = a.events;
            j = [];
            for (b in h)c = h[b], j.push(a.element.removeEventListener(b, c, !1));
            return j
        }());
        return m
    };
    n.prototype.disable = function () {
        var a, b, c, h, j;
        this.clickableElements.forEach(function (a) {
            return a.classList.remove("dz-clickable")
        });
        this.removeEventListeners();
        h = this.files;
        j = [];
        b = 0;
        for (c = h.length; b < c; b++)a = h[b], j.push(this.cancelUpload(a));
        return j
    };
    n.prototype.enable = function () {
        this.clickableElements.forEach(function (a) {
            return a.classList.add("dz-clickable")
        });
        return this.setupEventListeners()
    };
    n.prototype.filesize = function (a) {
        var b, c, h, j, k, m, n, q;
        if ("undefined" === typeof a)return "";
        m = ["TB", "GB", "MB", "KB", "b"];
        h = j = null;
        c = n = 0;
        for (q = m.length; n < q; c = ++n)if (k = m[c], b = Math.pow(this.options.filesizeBase, 4 - c) / 10, a >= b) {
            h = a / Math.pow(this.options.filesizeBase, 4 - c);
            j = k;
            break
        }
        h = Math.round(10 * h) / 10;
        return "<strong>" + h + "</strong> " + j
    };
    n.prototype._updateMaxFilesReachedClass = function () {
        return null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (this.getAcceptedFiles().length === this.options.maxFiles && this.emit("maxfilesreached", this.files), this.element.classList.add("dz-max-files-reached")) : this.element.classList.remove("dz-max-files-reached")
    };
    n.prototype.drop = function (a) {
        var b;
        a.dataTransfer && (this.emit("drop", a), b = a.dataTransfer.files,
        b.length && ((a = a.dataTransfer.items) && a.length && null != a[0].webkitGetAsEntry ? this._addFilesFromItems(a) : this.handleFiles(b)))
    };
    n.prototype.paste = function (a) {
        var b;
        if (null != (null != a ? null != (b = a.clipboardData) ? b.items : void 0 : void 0))if (this.emit("paste", a), a = a.clipboardData.items, a.length)return this._addFilesFromItems(a)
    };
    n.prototype.handleFiles = function (a) {
        var b, c, h, j;
        j = [];
        c = 0;
        for (h = a.length; c < h; c++)b = a[c], j.push(this.addFile(b));
        return j
    };
    n.prototype._addFilesFromItems = function (a) {
        var b, c, h, j, k;
        k = [];
        h = 0;
        for (j = a.length; h < j; h++)c = a[h], null != c.webkitGetAsEntry && (b = c.webkitGetAsEntry()) ? b.isFile ? k.push(this.addFile(c.getAsFile())) : b.isDirectory ? k.push(this._addFilesFromDirectory(b, b.name)) : k.push(void 0) : null != c.getAsFile ? null == c.kind || "file" === c.kind ? k.push(this.addFile(c.getAsFile())) : k.push(void 0) : k.push(void 0);
        return k
    };
    n.prototype._addFilesFromDirectory = function (a, b) {
        var c = this;
        return a.createReader().readEntries(function (a) {
            var h, j, k;
            j = 0;
            for (k = a.length; j < k; j++)h = a[j], h.isFile ? h.file(function (a) {
                if (!(c.options.ignoreHiddenFiles &&
                    "." === a.name.substring(0, 1)))return a.fullPath = "" + b + "/" + a.name, c.addFile(a)
            }) : h.isDirectory && c._addFilesFromDirectory(h, "" + b + "/" + h.name)
        }, function (a) {
            return "undefined" !== typeof console && null !== console ? "function" === typeof console.log ? console.log(a) : void 0 : void 0
        })
    };
    n.prototype.accept = function (a, b) {
        return a.size > 1048576 * this.options.maxFilesize ? b(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(a.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize)) : n.isValidFile(a,
            this.options.acceptedFiles) ? null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (b(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles)), this.emit("maxfilesexceeded", a)) : this.options.accept.call(this, a, b) : b(this.options.dictInvalidFileType)
    };
    n.prototype.addFile = function (a) {
        a.upload = {progress: 0, total: a.size, bytesSent: 0};
        this.files.push(a);
        a.status = n.ADDED;
        this.emit("addedfile", a);
        this._enqueueThumbnail(a);
        return this.accept(a, function (b) {
            return function (c) {
                c ?
                    (a.accepted = !1, b._errorProcessing([a], c)) : (a.accepted = !0, b.options.autoQueue && b.enqueueFile(a));
                return b._updateMaxFilesReachedClass()
            }
        }(this))
    };
    n.prototype.enqueueFiles = function (a) {
        var b, c, h;
        c = 0;
        for (h = a.length; c < h; c++)b = a[c], this.enqueueFile(b);
        return null
    };
    n.prototype.enqueueFile = function (a) {
        if (a.status === n.ADDED && !0 === a.accepted) {
            if (a.status = n.QUEUED, this.options.autoProcessQueue) {
                var b = this;
                return setTimeout(function () {
                    return b.processQueue()
                }, 0)
            }
        } else throw Error("This file can't be queued because it has already been processed or was rejected.");
    };
    n.prototype._thumbnailQueue = [];
    n.prototype._processingThumbnail = !1;
    n.prototype._enqueueThumbnail = function (a) {
        if (this.options.createImageThumbnails && a.type.match(/image.*/) && a.size <= 1048576 * this.options.maxThumbnailFilesize) {
            this._thumbnailQueue.push(a);
            var b = this;
            return setTimeout(function () {
                return b._processThumbnailQueue()
            }, 0)
        }
    };
    n.prototype._processThumbnailQueue = function () {
        if (!(this._processingThumbnail || 0 === this._thumbnailQueue.length))return this._processingThumbnail = !0, this.createThumbnail(this._thumbnailQueue.shift(),
            function (a) {
                return function () {
                    a._processingThumbnail = !1;
                    return a._processThumbnailQueue()
                }
            }(this))
    };
    n.prototype.removeFile = function (a) {
        a.status === n.UPLOADING && this.cancelUpload(a);
        this.files = k(this.files, a);
        this.emit("removedfile", a);
        if (0 === this.files.length)return this.emit("reset")
    };
    n.prototype.removeAllFiles = function (a) {
        var b, c, h, j;
        null == a && (a = !1);
        j = this.files.slice();
        c = 0;
        for (h = j.length; c < h; c++)b = j[c], (b.status !== n.UPLOADING || a) && this.removeFile(b);
        return null
    };
    n.prototype.createThumbnail = function (a,
                                            b) {
        var c;
        c = new FileReader;
        var h = this;
        c.onload = function () {
            if ("image/svg+xml" === a.type) h.emit("thumbnail", a, c.result), null != b && b(); else return h.createThumbnailFromUrl(a, c.result, b)
        };
        return c.readAsDataURL(a)
    };
    n.prototype.createThumbnailFromUrl = function (a, b, c) {
        var j;
        j = document.createElement("img");
        var k = this;
        j.onload = function () {
            var b, m, n, s, q, r, t;
            a.width = j.width;
            a.height = j.height;
            n = k.options.resize.call(k, a);
            null == n.trgWidth && (n.trgWidth = n.optWidth);
            null == n.trgHeight && (n.trgHeight = n.optHeight);
            b = document.createElement("canvas");
            m = b.getContext("2d");
            b.width = n.trgWidth;
            b.height = n.trgHeight;
            h(m, j, null != (s = n.srcX) ? s : 0, null != (q = n.srcY) ? q : 0, n.srcWidth, n.srcHeight, null != (r = n.trgX) ? r : 0, null != (t = n.trgY) ? t : 0, n.trgWidth, n.trgHeight);
            b = b.toDataURL("image/png");
            k.emit("thumbnail", a, b);
            if (null != c)return c()
        };
        null != c && (j.onerror = c);
        return j.src = b
    };
    n.prototype.processQueue = function () {
        var a, b, c, h;
        b = this.options.parallelUploads;
        a = c = this.getUploadingFiles().length;
        if (!(c >= b) && (h = this.getQueuedFiles(), 0 < h.length)) {
            if (this.options.uploadMultiple)return this.processFiles(h.slice(0,
                b - c));
            for (; a < b && h.length;)this.processFile(h.shift()), a++
        }
    };
    n.prototype.processFile = function (a) {
        return this.processFiles([a])
    };
    n.prototype.processFiles = function (a) {
        var b, c, h;
        c = 0;
        for (h = a.length; c < h; c++)b = a[c], b.processing = !0, b.status = n.UPLOADING, this.emit("processing", b);
        this.options.uploadMultiple && this.emit("processingmultiple", a);
        return this.uploadFiles(a)
    };
    n.prototype._getFilesWithXhr = function (a) {
        var b, c, h, j, k;
        j = this.files;
        k = [];
        c = 0;
        for (h = j.length; c < h; c++)b = j[c], b.xhr === a && k.push(b);
        return k
    };
    n.prototype.cancelUpload =
        function (a) {
            var b, c, h, j;
            if (a.status === n.UPLOADING) {
                c = this._getFilesWithXhr(a.xhr);
                h = 0;
                for (j = c.length; h < j; h++)b = c[h], b.status = n.CANCELED;
                a.xhr.abort();
                a = 0;
                for (h = c.length; a < h; a++)b = c[a], this.emit("canceled", b);
                this.options.uploadMultiple && this.emit("canceledmultiple", c)
            } else if ((b = a.status) === n.ADDED || b === n.QUEUED) a.status = n.CANCELED, this.emit("canceled", a), this.options.uploadMultiple && this.emit("canceledmultiple", [a]);
            if (this.options.autoProcessQueue)return this.processQueue()
        };
    t = function () {
        var a,
            b;
        b = arguments[0];
        a = 2 <= arguments.length ? m.call(arguments, 1) : [];
        return "function" === typeof b ? b.apply(this, a) : b
    };
    n.prototype.uploadFile = function (a) {
        return this.uploadFiles([a])
    };
    n.prototype.uploadFiles = function (a) {
        var b, c, h, j, k, m, q, r, w, A, C, B, z, E, D;
        z = new XMLHttpRequest;
        k = 0;
        for (B = a.length; k < B; k++)b = a[k], b.xhr = z;
        k = t(this.options.method, a);
        B = t(this.options.url, a);
        z.open(k, B, !0);
        z.withCredentials = !!this.options.withCredentials;
        A = null;
        var H = this;
        h = function () {
            var c, h, j;
            j = [];
            c = 0;
            for (h = a.length; c < h; c++)b = a[c],
                j.push(H._errorProcessing(a, A || H.options.dictResponseError.replace("{{statusCode}}", z.status), z));
            return j
        };
        var J = this;
        C = function (c) {
            var h, j, k;
            if (null != c) {
                h = 100 * c.loaded / c.total;
                j = 0;
                for (k = a.length; j < k; j++)b = a[j], b.upload = {progress: h, total: c.total, bytesSent: c.loaded}
            } else {
                c = !0;
                h = 100;
                j = 0;
                for (k = a.length; j < k; j++)b = a[j], 100 === b.upload.progress && b.upload.bytesSent === b.upload.total || (c = !1), b.upload.progress = h, b.upload.bytesSent = b.upload.total;
                if (c)return
            }
            k = [];
            c = 0;
            for (j = a.length; c < j; c++)b = a[c], k.push(J.emit("uploadprogress",
                b, h, b.upload.bytesSent));
            return k
        };
        var N = this;
        z.onload = function (b) {
            var c;
            if (a[0].status !== n.CANCELED && 4 === z.readyState) {
                A = z.responseText;
                if (z.getResponseHeader("content-type") && ~z.getResponseHeader("content-type").indexOf("application/json"))try {
                    A = JSON.parse(A)
                } catch (j) {
                    b = j, A = "Invalid JSON response from server."
                }
                C();
                return 200 <= (c = z.status) && 300 > c ? N._finished(a, A, b) : h()
            }
        };
        z.onerror = function () {
            if (a[0].status !== n.CANCELED)return h()
        };
        (null != (j = z.upload) ? j : z).onprogress = C;
        k = {
            Accept: "application/json",
            "Cache-Control": "no-cache", "X-Requested-With": "XMLHttpRequest"
        };
        this.options.headers && u(k, this.options.headers);
        for (c in k)j = k[c], z.setRequestHeader(c, j);
        c = new FormData;
        if (this.options.params)for (r in k = this.options.params, k)j = k[r], c.append(r, j);
        r = 0;
        for (j = a.length; r < j; r++)b = a[r], this.emit("sending", b, z, c);
        this.options.uploadMultiple && this.emit("sendingmultiple", a, z, c);
        if ("FORM" === this.element.tagName) {
            B = this.element.querySelectorAll("input, textarea, select, button");
            j = 0;
            for (k = B.length; j < k; j++)if (q =
                    B[j], r = q.getAttribute("name"), w = q.getAttribute("type"), "SELECT" === q.tagName && q.hasAttribute("multiple")) {
                D = q.options;
                w = 0;
                for (E = D.length; w < E; w++)q = D[w], q.selected && c.append(r, q.value)
            } else(!w || "checkbox" !== (m = w.toLowerCase()) && "radio" !== m || q.checked) && c.append(r, q.value)
        }
        m = r = 0;
        for (j = a.length - 1; 0 <= j ? r <= j : r >= j; m = 0 <= j ? ++r : --r)c.append(this._getParamName(m), a[m], a[m].name);
        return z.send(c)
    };
    n.prototype._finished = function (a, b, c) {
        var h, j, k;
        j = 0;
        for (k = a.length; j < k; j++)h = a[j], h.status = n.SUCCESS, this.emit("success",
            h, b, c), this.emit("complete", h);
        this.options.uploadMultiple && (this.emit("successmultiple", a, b, c), this.emit("completemultiple", a));
        if (this.options.autoProcessQueue)return this.processQueue()
    };
    n.prototype._errorProcessing = function (a, b, c) {
        var h, j, k;
        j = 0;
        for (k = a.length; j < k; j++)h = a[j], h.status = n.ERROR, this.emit("error", h, b, c), this.emit("complete", h);
        this.options.uploadMultiple && (this.emit("errormultiple", a, b, c), this.emit("completemultiple", a));
        if (this.options.autoProcessQueue)return this.processQueue()
    };
    a = n;
    a.version = "4.0.1";
    a.options = {};
    a.optionsForElement = function (c) {
        if (c.getAttribute("id"))return a.options[b(c.getAttribute("id"))]
    };
    a.instances = [];
    a.forElement = function (a) {
        "string" === typeof a && (a = document.querySelector(a));
        if (null == (null != a ? a.dropzone : void 0))throw Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
        return a.dropzone
    };
    a.autoDiscover = !0;
    a.discover = function () {
        var b, c, h, j, k;
        document.querySelectorAll ? c = document.querySelectorAll(".dropzone") : (c = [], b = function (a) {
            var b, h, j, k;
            k = [];
            h = 0;
            for (j = a.length; h < j; h++)b = a[h], /(^| )dropzone($| )/.test(b.className) ? k.push(c.push(b)) : k.push(void 0);
            return k
        }, b(document.getElementsByTagName("div")), b(document.getElementsByTagName("form")));
        k = [];
        h = 0;
        for (j = c.length; h < j; h++)b = c[h], !1 !== a.optionsForElement(b) ? k.push(new a(b)) : k.push(void 0);
        return k
    };
    a.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i];
    a.isBrowserSupported = function () {
        var b, c, h, j, k;
        b = !0;
        if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector)if ("classList" in document.createElement("a")) {
            k = a.blacklistedBrowsers;
            h = 0;
            for (j = k.length; h < j; h++)c = k[h], c.test(navigator.userAgent) && (b = !1)
        } else b = !1; else b = !1;
        return b
    };
    k = function (a, b) {
        var c, h, j, k;
        k = [];
        h = 0;
        for (j = a.length; h < j; h++)c = a[h], c !== b && k.push(c);
        return k
    };
    b = function (a) {
        return a.replace(/[\-_](\w)/g, function (a) {
            return a.charAt(1).toUpperCase()
        })
    };
    a.createElement = function (a) {
        var b;
        b = document.createElement("div");
        b.innerHTML = a;
        return b.childNodes[0]
    };
    a.elementInside = function (a, b) {
        if (a === b)return !0;
        for (; a = a.parentNode;)if (a === b)return !0;
        return !1
    };
    a.getElement = function (a, b) {
        var c;
        "string" === typeof a ? c = document.querySelector(a) : null != a.nodeType && (c = a);
        if (null == c)throw Error("Invalid `" + b + "` option provided. Please provide a CSS selector or a plain HTML element.");
        return c
    };
    a.getElements = function (a, b) {
        var c, h, j, k, m;
        if (a instanceof Array) {
            h = [];
            try {
                j =
                    0;
                for (k = a.length; j < k; j++)c = a[j], h.push(this.getElement(c, b))
            } catch (n) {
                h = null
            }
        } else if ("string" === typeof a) {
            h = [];
            m = document.querySelectorAll(a);
            j = 0;
            for (k = m.length; j < k; j++)c = m[j], h.push(c)
        } else null != a.nodeType && (h = [a]);
        if (!(null != h && h.length))throw Error("Invalid `" + b + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
        return h
    };
    a.confirm = function (a, b, c) {
        if (window.confirm(a))return b();
        if (null != c)return c()
    };
    a.isValidFile = function (a, b) {
        var c, h, j, k, m;
        if (!b)return !0;
        b = b.split(",");
        h = a.type;
        c = h.replace(/\/.*$/, "");
        k = 0;
        for (m = b.length; k < m; k++)if (j = b[k], j = j.trim(), "." === j.charAt(0)) {
            if (-1 !== a.name.toLowerCase().indexOf(j.toLowerCase(), a.name.length - j.length))return !0
        } else if (/\/\*$/.test(j)) {
            if (c === j.replace(/\/.*$/, ""))return !0
        } else if (h === j)return !0;
        return !1
    };
    "undefined" !== typeof jQuery && null !== jQuery && (jQuery.fn.dropzone = function (b) {
        return this.each(function () {
            return new a(this, b)
        })
    });
    "undefined" !== typeof module && null !== module ? module.exports = a : window.Dropzone =
        a;
    a.ADDED = "added";
    a.QUEUED = "queued";
    a.ACCEPTED = a.QUEUED;
    a.UPLOADING = "uploading";
    a.PROCESSING = a.UPLOADING;
    a.CANCELED = "canceled";
    a.ERROR = "error";
    a.SUCCESS = "success";
    c = function (a) {
        var b, c, h, j, k;
        h = a.naturalHeight;
        b = document.createElement("canvas");
        b.width = 1;
        b.height = h;
        b = b.getContext("2d");
        b.drawImage(a, 0, 0);
        b = b.getImageData(0, 0, 1, h).data;
        k = 0;
        for (j = c = h; j > k;)a = b[4 * (j - 1) + 3], 0 === a ? c = j : k = j, j = c + k >> 1;
        h = j / h;
        return 0 === h ? 1 : h
    };
    h = function (a, b, h, j, k, m, n, q, r, t) {
        var u;
        u = c(b);
        return a.drawImage(b, h, j, k, m, n, q, r, t / u)
    };
    a._autoDiscoverFunction = function () {
        if (a.autoDiscover)return a.discover()
    };
    var D = window, J = a._autoDiscoverFunction, z, E, H, B, R, T, Q;
    E = !1;
    r = !0;
    z = D.document;
    Q = z.documentElement;
    q = z.addEventListener ? "addEventListener" : "attachEvent";
    T = z.addEventListener ? "removeEventListener" : "detachEvent";
    R = z.addEventListener ? "" : "on";
    H = function (a) {
        if (!("readystatechange" === a.type && "complete" !== z.readyState) && (("load" === a.type ? D : z)[T](R + a.type, H, !1), !E && (E = !0)))return J.call(D, a.type || a)
    };
    B = function () {
        try {
            Q.doScroll("left")
        } catch (a) {
            setTimeout(B,
                50);
            return
        }
        return H("poll")
    };
    if ("complete" !== z.readyState) {
        if (z.createEventObject && Q.doScroll) {
            try {
                r = !D.frameElement
            } catch (C) {
            }
            r && B()
        }
        z[q](R + "DOMContentLoaded", H, !1);
        z[q](R + "readystatechange", H, !1);
        D[q](R + "load", H, !1)
    }
}).call(this);
var fbLoginUid = -1, fbToken = "";
function fbClearData() {
    $("#fb-data").empty();
    $("#fb-login-btn").html('<a href="#" onclick="fbLogin();return false;" class="fb-username">login</a>')
}
function fbLogout() {
    try {
        FB.logout()
    } catch (a) {
    }
}
function fbSetLoginUid(a, b) {
    fbLoginUid = a;
    fbToken = b;
    FB.api("/v2.3/me", function (a) {
        $("#fb-data").empty().append('<a target="_blank" class="fb-username" href="' + a.link + '">' + (a.first_name + " " + a.last_name).trim() + "</a>");
        $("#fb-login-btn").html('<a href="#" onclick="fbLogout();return false;" class="fb-username">logout</a>')
    })
}
function fbModal(a, b, c) {
    c || (c = "Log in with Facebook");
    $("#fb_modal h3").html(c);
    $("#fbmodal-login").show();
    $("#fbmodal-content").html(a);
    b ? $("#fbmodal-login").show() : $("#fbmodal-login").hide();
    $("#fb_modal").modal()
}
function fbCheckLogin(a) {
    "object" !== typeof a && (a = {});
    "function" !== typeof a.connected && (a.connected = function (a) {
        var c = a.authResponse.userID, a = a.authResponse.accessToken;
        c != fbLoginUid && (fbSetLoginUid(c, a), initRemoteSavedLocations(), c = getUrlParameter("map"), 0 < c && $.post("code/mymap.php", {
            show: c,
            token: fbToken,
            sts: pageLoadTimestamp,
            ts: (new Date).getTime()
        }, myMapRemoteFinished));
        $("#fb_modal").modal("hide")
    });
    "function" !== typeof a.unauthorized && (a.unauthorized = function (a) {
        var c = a.authResponse.userID, a = a.authResponse.accessToken;
        c != fbLoginUid && (fbSetLoginUid(c, a), c = getUrlParameter("map"), 0 < c && $.post("code/mymap.php", {
            show: c,
            token: fbToken,
            sts: pageLoadTimestamp,
            ts: (new Date).getTime()
        }, myMapRemoteFinished))
    });
    "function" !== typeof a.loggedout && (a.loggedout = function () {
        fbClearData();
        fbLoginUid = -1;
        fbToken = "";
        if (a.initial) {
            var b = getUrlParameter("map");
            0 < b && $.post("code/mymap.php", {
                show: b,
                token: fbToken,
                sts: pageLoadTimestamp,
                ts: (new Date).getTime()
            }, myMapRemoteFinished)
        }
        "mymap" != getSocialSelected() && getSocialSelected()
    });
    FB.getLoginStatus(function (b) {
        "connected" ===
        b.status ? a.connected(b) : "not_authorized" === b.status ? a.unauthorized(b) : a.loggedout(b)
    }, a.forceCheckStatus)
}
function fbLogin(a) {
    try {
        "object" !== typeof a && (a = {}), FB.login(function () {
            fbCheckLogin(a)
        }, {scope: "public_profile,email,user_friends"})
    } catch (b) {
    }
}
function fbForceLogin(a, b) {
    var c = function () {
        fbModal("You need to log in with your Facebook account to create and share your own map.<br><br>The public map does not require logging in.", !0);
        fbLogin({
            connected: function (b) {
                a(b)
            }, unauthorized: function () {
                fbModal("You have not authorized Sightsmap to access your Facebook account. Please try again.", !0)
            }, loggedout: function () {
                fbModal("You need to log in with your Facebook account to create and share your own map.<br><br>The public map does not require logging in.",
                    !0)
            }
        })
    };
    -1 == fbLoginUid && (b = !1);
    fbCheckLogin({
        connected: function (b) {
            a(b);
            $("#fb_modal").modal("hide")
        }, unauthorized: c, loggedout: c, forceCheckStatus: b
    })
};
