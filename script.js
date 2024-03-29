///* uniform */
(function(e, t) {
    "use strict";

    function n(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return e.prop ? e.prop.apply(e, t) : e.attr.apply(e, t)
    }

    function s(e, t, n) {
        var s, a;
        for (s in n) n.hasOwnProperty(s) && (a = s.replace(/ |$/g, t.eventNamespace), e.bind(a, n[s]))
    }

    function a(e, t, n) {
        s(e, n, {
            focus: function() {
                t.addClass(n.focusClass)
            },
            blur: function() {
                t.removeClass(n.focusClass), t.removeClass(n.activeClass)
            },
            mouseenter: function() {
                t.addClass(n.hoverClass)
            },
            mouseleave: function() {
                t.removeClass(n.hoverClass), t.removeClass(n.activeClass)
            },
            "mousedown touchbegin": function() {
                e.is(":disabled") || t.addClass(n.activeClass)
            },
            "mouseup touchend": function() {
                t.removeClass(n.activeClass)
            }
        })
    }

    function i(e, t) {
        e.removeClass(t.hoverClass + " " + t.focusClass + " " + t.activeClass)
    }

    function r(e, t, n) {
        n ? e.addClass(t) : e.removeClass(t)
    }

    function l(e, t, n) {
        var s = "checked",
            a = t.is(":" + s);
        t.prop ? t.prop(s, a) : a ? t.attr(s, s) : t.removeAttr(s), r(e, n.checkedClass, a)
    }

    function u(e, t, n) {
        r(e, n.disabledClass, t.is(":disabled"))
    }

    function o(e, t, n) {
        switch (n) {
            case "after":
                return e.after(t), e.next();
            case "before":
                return e.before(t), e.prev();
            case "wrap":
                return e.wrap(t), e.parent()
        }
        return null
    }

    function c(t, s, a) {
        var i, r, l;
        return a || (a = {}), a = e.extend({
            bind: {},
            divClass: null,
            divWrap: "wrap",
            spanClass: null,
            spanHtml: null,
            spanWrap: "wrap"
        }, a), i = e("<div />"), r = e("<span />"), s.autoHide && t.is(":hidden") && "none" === t.css("display") && i.hide(), a.divClass && i.addClass(a.divClass), s.wrapperClass && i.addClass(s.wrapperClass), a.spanClass && r.addClass(a.spanClass), l = n(t, "id"), s.useID && l && n(i, "id", s.idPrefix + "-" + l), a.spanHtml && r.html(a.spanHtml), i = o(t, i, a.divWrap), r = o(t, r, a.spanWrap), u(i, t, s), {
            div: i,
            span: r
        }
    }

    function d(t, n) {
        var s;
        return n.wrapperClass ? (s = e("<span />").addClass(n.wrapperClass), s = o(t, s, "wrap")) : null
    }

    function f() {
        var t, n, s, a;
        return a = "rgb(120,2,153)", n = e('<div style="width:0;height:0;color:' + a + '">'), e("body").append(n), s = n.get(0), t = window.getComputedStyle ? window.getComputedStyle(s, "").color : (s.currentStyle || s.style || {}).color, n.remove(), t.replace(/ /g, "") !== a
    }

    function p(t) {
        return t ? e("<span />").text(t).html() : ""
    }

    function m() {
        return navigator.cpuClass && !navigator.product
    }

    function v() {
        return window.XMLHttpRequest !== void 0 ? !0 : !1
    }

    function h(e) {
        var t;
        return e[0].multiple ? !0 : (t = n(e, "size"), !t || 1 >= t ? !1 : !0)
    }

    function C() {
        return !1
    }

    function w(e, t) {
        var n = "none";
        s(e, t, {
            "selectstart dragstart mousedown": C
        }), e.css({
            MozUserSelect: n,
            msUserSelect: n,
            webkitUserSelect: n,
            userSelect: n
        })
    }

    function b(e, t, n) {
        var s = e.val();
        "" === s ? s = n.fileDefaultHtml : (s = s.split(/[\/\\]+/), s = s[s.length - 1]), t.text(s)
    }

    function y(e, t, n) {
        var s, a;
        for (s = [], e.each(function() {
                var e;
                for (e in t) Object.prototype.hasOwnProperty.call(t, e) && (s.push({
                    el: this,
                    name: e,
                    old: this.style[e]
                }), this.style[e] = t[e])
            }), n(); s.length;) a = s.pop(), a.el.style[a.name] = a.old
    }

    function g(e, t) {
        var n;
        n = e.parents(), n.push(e[0]), n = n.not(":visible"), y(n, {
            visibility: "hidden",
            display: "block",
            position: "absolute"
        }, t)
    }

    function k(e, t) {
        return function() {
            e.unwrap().unwrap().unbind(t.eventNamespace)
        }
    }
    var H = !0,
        x = !1,
        A = [{
            match: function(e) {
                return e.is("a, button, :submit, :reset, input[type='button']")
            },
            apply: function(e, t) {
                var r, l, o, d, f;
                return l = t.submitDefaultHtml, e.is(":reset") && (l = t.resetDefaultHtml), d = e.is("a, button") ? function() {
                    return e.html() || l
                } : function() {
                    return p(n(e, "value")) || l
                }, o = c(e, t, {
                    divClass: t.buttonClass,
                    spanHtml: d()
                }), r = o.div, a(e, r, t), f = !1, s(r, t, {
                    "click touchend": function() {
                        var t, s, a, i;
                        f || e.is(":disabled") || (f = !0, e[0].dispatchEvent ? (t = document.createEvent("MouseEvents"), t.initEvent("click", !0, !0), s = e[0].dispatchEvent(t), e.is("a") && s && (a = n(e, "target"), i = n(e, "href"), a && "_self" !== a ? window.open(i, a) : document.location.href = i)) : e.click(), f = !1)
                    }
                }), w(r, t), {
                    remove: function() {
                        return r.after(e), r.remove(), e.unbind(t.eventNamespace), e
                    },
                    update: function() {
                        i(r, t), u(r, e, t), e.detach(), o.span.html(d()).append(e)
                    }
                }
            }
        }, {
            match: function(e) {
                return e.is(":checkbox")
            },
            apply: function(e, t) {
                var n, r, o;
                return n = c(e, t, {
                    divClass: t.checkboxClass
                }), r = n.div, o = n.span, a(e, r, t), s(e, t, {
                    "click touchend": function() {
                        l(o, e, t)
                    }
                }), l(o, e, t), {
                    remove: k(e, t),
                    update: function() {
                        i(r, t), o.removeClass(t.checkedClass), l(o, e, t), u(r, e, t)
                    }
                }
            }
        }, {
            match: function(e) {
                return e.is(":file")
            },
            apply: function(t, r) {
                function l() {
                    b(t, p, r)
                }
                var d, f, p, v;
                return d = c(t, r, {
                    divClass: r.fileClass,
                    spanClass: r.fileButtonClass,
                    spanHtml: r.fileButtonHtml,
                    spanWrap: "after"
                }), f = d.div, v = d.span, p = e("<span />").html(r.fileDefaultHtml), p.addClass(r.filenameClass), p = o(t, p, "after"), n(t, "size") || n(t, "size", f.width() / 10), a(t, f, r), l(), m() ? s(t, r, {
                    click: function() {
                        t.trigger("change"), setTimeout(l, 0)
                    }
                }) : s(t, r, {
                    change: l
                }), w(p, r), w(v, r), {
                    remove: function() {
                        return p.remove(), v.remove(), t.unwrap().unbind(r.eventNamespace)
                    },
                    update: function() {
                        i(f, r), b(t, p, r), u(f, t, r)
                    }
                }
            }
        }, {
            match: function(e) {
                if (e.is("input")) {
                    var t = (" " + n(e, "type") + " ").toLowerCase(),
                        s = " color date datetime datetime-local email month number password search tel text time url week ";
                    return s.indexOf(t) >= 0
                }
                return !1
            },
            apply: function(e, t) {
                var s, i;
                return s = n(e, "type"), e.addClass(t.inputClass), i = d(e, t), a(e, e, t), t.inputAddTypeAsClass && e.addClass(s), {
                    remove: function() {
                        e.removeClass(t.inputClass), t.inputAddTypeAsClass && e.removeClass(s), i && e.unwrap()
                    },
                    update: C
                }
            }
        }, {
            match: function(e) {
                return e.is(":radio")
            },
            apply: function(t, r) {
                var o, d, f;
                return o = c(t, r, {
                    divClass: r.radioClass
                }), d = o.div, f = o.span, a(t, d, r), s(t, r, {
                    "click touchend": function() {
                        e.uniform.update(e(':radio[name="' + n(t, "name") + '"]'))
                    }
                }), l(f, t, r), {
                    remove: k(t, r),
                    update: function() {
                        i(d, r), l(f, t, r), u(d, t, r)
                    }
                }
            }
        }, {
            match: function(e) {
                return e.is("select") && !h(e) ? !0 : !1
            },
            apply: function(t, n) {
                var r, l, o, d;
                return n.selectAutoWidth && g(t, function() {
                    d = t.width()
                }), r = c(t, n, {
                    divClass: n.selectClass,
                    spanHtml: (t.find(":selected:first") || t.find("option:first")).html(),
                    spanWrap: "before"
                }), l = r.div, o = r.span, n.selectAutoWidth ? g(t, function() {
                    y(e([o[0], l[0]]), {
                        display: "block"
                    }, function() {
                        var e;
                        e = o.outerWidth() - o.width(), l.width(d + e), o.width(d)
                    })
                }) : l.addClass("fixedWidth"), a(t, l, n), s(t, n, {
                    change: function() {
                        o.html(t.find(":selected").html()), l.removeClass(n.activeClass)
                    },
                    "click touchend": function() {
                        var e = t.find(":selected").html();
                        o.html() !== e && t.trigger("change")
                    },
                    keyup: function() {
                        o.html(t.find(":selected").html())
                    }
                }), w(o, n), {
                    remove: function() {
                        return o.remove(), t.unwrap().unbind(n.eventNamespace), t
                    },
                    update: function() {
                        n.selectAutoWidth ? (e.uniform.restore(t), t.uniform(n)) : (i(l, n), o.html(t.find(":selected").html()), u(l, t, n))
                    }
                }
            }
        }, {
            match: function(e) {
                return e.is("select") && h(e) ? !0 : !1
            },
            apply: function(e, t) {
                var n;
                return e.addClass(t.selectMultiClass), n = d(e, t), a(e, e, t), {
                    remove: function() {
                        e.removeClass(t.selectMultiClass), n && e.unwrap()
                    },
                    update: C
                }
            }
        }, {
            match: function(e) {
                return e.is("textarea")
            },
            apply: function(e, t) {
                var n;
                return e.addClass(t.textareaClass), n = d(e, t), a(e, e, t), {
                    remove: function() {
                        e.removeClass(t.textareaClass), n && e.unwrap()
                    },
                    update: C
                }
            }
        }];
    m() && !v() && (H = !1), e.uniform = {
        defaults: {
            activeClass: "active",
            autoHide: !0,
            buttonClass: "button",
            checkboxClass: "checker",
            checkedClass: "checked",
            disabledClass: "disabled",
            eventNamespace: ".uniform",
            fileButtonClass: "action",
            fileButtonHtml: "�����...",
            fileClass: "uploader",
            fileDefaultHtml: "���� �� ������",
            filenameClass: "filename",
            focusClass: "focus",
            hoverClass: "hover",
            idPrefix: "uniform",
            inputAddTypeAsClass: !0,
            inputClass: "uniform-input",
            radioClass: "radio",
            resetDefaultHtml: "Reset",
            resetSelector: !1,
            selectAutoWidth: !0,
            selectClass: "selector",
            selectMultiClass: "uniform-multiselect",
            submitDefaultHtml: "Submit",
            textareaClass: "uniform",
            useID: !0,
            wrapperClass: null
        },
        elements: []
    }, e.fn.uniform = function(t) {
        var n = this;
        return t = e.extend({}, e.uniform.defaults, t), x || (x = !0, f() && (H = !1)), H ? (t.resetSelector && e(t.resetSelector).mouseup(function() {
            window.setTimeout(function() {
                e.uniform.update(n)
            }, 10)
        }), this.each(function() {
            var n, s, a, i = e(this);
            if (i.data("uniformed")) return e.uniform.update(i), void 0;
            for (n = 0; A.length > n; n += 1)
                if (s = A[n], s.match(i, t)) return a = s.apply(i, t), i.data("uniformed", a), e.uniform.elements.push(i.get(0)), void 0
        })) : this
    }, e.uniform.restore = e.fn.uniform.restore = function(n) {
        n === t && (n = e.uniform.elements), e(n).each(function() {
            var t, n, s = e(this);
            n = s.data("uniformed"), n && (n.remove(), t = e.inArray(this, e.uniform.elements), t >= 0 && e.uniform.elements.splice(t, 1), s.removeData("uniformed"))
        })
    }, e.uniform.update = e.fn.uniform.update = function(n) {
        n === t && (n = e.uniform.elements), e(n).each(function() {
            var t, n = e(this);
            t = n.data("uniformed"), t && t.update(n, t.options)
        })
    }
})(jQuery);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* masked input */
(function(e) {
    function t() {
        var e = document.createElement("input"),
            t = "onpaste";
        return e.setAttribute(t, ""), "function" == typeof e[t] ? "paste" : "input"
    }
    var n, a = t() + ".mask",
        r = navigator.userAgent,
        i = /iphone/i.test(r),
        o = /android/i.test(r);
    e.mask = {
        definitions: {
            9: "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        dataName: "rawMaskFn",
        placeholder: "_"
    }, e.fn.extend({
        caret: function(e, t) {
            var n;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function() {
                this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && (n = this.createTextRange(), n.collapse(!0), n.moveEnd("character", t), n.moveStart("character", e), n.select())
            })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (n = document.selection.createRange(), e = 0 - n.duplicate().moveStart("character", -1e5), t = e + n.text.length), {
                begin: e,
                end: t
            })
        },
        unmask: function() {
            return this.trigger("unmask")
        },
        mask: function(t, r) {
            var c, l, s, u, f, h;
            return !t && this.length > 0 ? (c = e(this[0]), c.data(e.mask.dataName)()) : (r = e.extend({
                placeholder: e.mask.placeholder,
                completed: null
            }, r), l = e.mask.definitions, s = [], u = h = t.length, f = null, e.each(t.split(""), function(e, t) {
                "?" == t ? (h--, u = e) : l[t] ? (s.push(RegExp(l[t])), null === f && (f = s.length - 1)) : s.push(null)
            }), this.trigger("unmask").each(function() {
                function c(e) {
                    for (; h > ++e && !s[e];);
                    return e
                }

                function d(e) {
                    for (; --e >= 0 && !s[e];);
                    return e
                }

                function m(e, t) {
                    var n, a;
                    if (!(0 > e)) {
                        for (n = e, a = c(t); h > n; n++)
                            if (s[n]) {
                                if (!(h > a && s[n].test(R[a]))) break;
                                R[n] = R[a], R[a] = r.placeholder, a = c(a)
                            } b(), x.caret(Math.max(f, e))
                    }
                }

                function p(e) {
                    var t, n, a, i;
                    for (t = e, n = r.placeholder; h > t; t++)
                        if (s[t]) {
                            if (a = c(t), i = R[t], R[t] = n, !(h > a && s[a].test(i))) break;
                            n = i
                        }
                }

                function g(e) {
                    var t, n, a, r = e.which;
                    8 === r || 46 === r || i && 127 === r ? (t = x.caret(), n = t.begin, a = t.end, 0 === a - n && (n = 46 !== r ? d(n) : a = c(n - 1), a = 46 === r ? c(a) : a), k(n, a), m(n, a - 1), e.preventDefault()) : 27 == r && (x.val(S), x.caret(0, y()), e.preventDefault())
                }

                function v(t) {
                    var n, a, i, l = t.which,
                        u = x.caret();
                    t.ctrlKey || t.altKey || t.metaKey || 32 > l || l && (0 !== u.end - u.begin && (k(u.begin, u.end), m(u.begin, u.end - 1)), n = c(u.begin - 1), h > n && (a = String.fromCharCode(l), s[n].test(a) && (p(n), R[n] = a, b(), i = c(n), o ? setTimeout(e.proxy(e.fn.caret, x, i), 0) : x.caret(i), r.completed && i >= h && r.completed.call(x))), t.preventDefault())
                }

                function k(e, t) {
                    var n;
                    for (n = e; t > n && h > n; n++) s[n] && (R[n] = r.placeholder)
                }

                function b() {
                    x.val(R.join(""))
                }

                function y(e) {
                    var t, n, a = x.val(),
                        i = -1;
                    for (t = 0, pos = 0; h > t; t++)
                        if (s[t]) {
                            for (R[t] = r.placeholder; pos++ < a.length;)
                                if (n = a.charAt(pos - 1), s[t].test(n)) {
                                    R[t] = n, i = t;
                                    break
                                } if (pos > a.length) break
                        } else R[t] === a.charAt(pos) && t !== u && (pos++, i = t);
                    return e ? b() : u > i + 1 ? (x.val(""), k(0, h)) : (b(), x.val(x.val().substring(0, i + 1))), u ? t : f
                }
                var x = e(this),
                    R = e.map(t.split(""), function(e) {
                        return "?" != e ? l[e] ? r.placeholder : e : void 0
                    }),
                    S = x.val();
                x.data(e.mask.dataName, function() {
                    return e.map(R, function(e, t) {
                        return s[t] && e != r.placeholder ? e : null
                    }).join("")
                }), x.attr("readonly") || x.one("unmask", function() {
                    x.unbind(".mask").removeData(e.mask.dataName)
                }).bind("focus.mask", function() {
                    clearTimeout(n);
                    var e;
                    S = x.val(), e = y(), n = setTimeout(function() {
                        b(), e == t.length ? x.caret(0, e) : x.caret(e)
                    }, 10)
                }).bind("blur.mask", function() {
                    y(), x.val() != S && x.change()
                }).bind("keydown.mask", g).bind("keypress.mask", v).bind(a, function() {
                    setTimeout(function() {
                        var e = y(!0);
                        x.caret(e), r.completed && e == x.val().length && r.completed.call(x)
                    }, 0)
                }), y()
            }))
        }
    })
})(jQuery);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/* ajax form */
;
! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("undefined" != typeof jQuery ? jQuery : window.Zepto)
}

//alert(a);
//window.console.log(a);


(function(a) {
    "use strict";

    function b(b) {
        var c = b.data;
        b.isDefaultPrevented() || (b.preventDefault(), a(b.target).ajaxSubmit(c))
    }

    function c(b) {
        var c = b.target,
            d = a(c);
        if (!d.is("[type=submit],[type=image]")) {
            var e = d.closest("[type=submit]");
            if (0 === e.length) return;
            c = e[0]
        }
        var f = this;
        if (f.clk = c, "image" == c.type)
            if (void 0 !== b.offsetX) f.clk_x = b.offsetX, f.clk_y = b.offsetY;
            else if ("function" == typeof a.fn.offset) {
            var g = d.offset();
            f.clk_x = b.pageX - g.left, f.clk_y = b.pageY - g.top
        } else f.clk_x = b.pageX - c.offsetLeft, f.clk_y = b.pageY - c.offsetTop;
        setTimeout(function() {
            f.clk = f.clk_x = f.clk_y = null
        }, 100)
    }

    function d() {
    	// if(1)
    	// {
    	// 	var b = "[jquery.form] " + Array.prototype.join.call(arguments, "");
    	// 	alert(b);
    	// }


        if (a.fn.ajaxSubmit.debug) {
            var b = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(b) : window.opera && window.opera.postError && window.opera.postError(b)
        }
    }
    var e = {};
    e.fileapi = void 0 !== a("<input type='file'/>").get(0).files, e.formdata = void 0 !== window.FormData;
    var f = !!a.fn.prop;
    a.fn.attr2 = function() {
        if (!f) return this.attr.apply(this, arguments);
        var a = this.prop.apply(this, arguments);
        return a && a.jquery || "string" == typeof a ? a : this.attr.apply(this, arguments)
    }, a.fn.ajaxSubmit = function(b) {
        function c(c) {
            var d, e, f = a.param(c, b.traditional).split("&"),
                g = f.length,
                h = [];
            for (d = 0; g > d; d++) f[d] = f[d].replace(/\+/g, " "), e = f[d].split("="), h.push([decodeURIComponent(e[0]), decodeURIComponent(e[1])]);
            //alert(e[0]);
            return h
        }

        function g(d) {
        	//alert(d);
            for (var e = new FormData, f = 0; f < d.length; f++) e.append(d[f].name, d[f].value);
            if (b.extraData) {
                var g = c(b.extraData);
                for (f = 0; f < g.length; f++) g[f] && e.append(g[f][0], g[f][1])
            }
            b.data = null;
            var h = a.extend(!0, {}, a.ajaxSettings, b, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: i || "POST"
            });
            b.uploadProgress && (h.xhr = function() {
                var c = a.ajaxSettings.xhr();
                return c.upload && c.upload.addEventListener("progress", function(a) {
                    var c = 0,
                        d = a.loaded || a.position,
                        e = a.total;
                    a.lengthComputable && (c = Math.ceil(d / e * 100)), b.uploadProgress(a, d, e, c)
                }, !1), c
            }), h.data = null;
            var j = h.beforeSend;
            return h.beforeSend = function(a, c) {
                c.data = b.formData ? b.formData : e, j && j.call(this, a, c)
            }, a.ajax(h)
        }

        function h(c) {
            function e(a) {
                var b = null;
                try {
                    a.contentWindow && (b = a.contentWindow.document)
                } catch (c) {
                    d("cannot get iframe.contentWindow document: " + c)
                }
                if (b) return b;
                try {
                    b = a.contentDocument ? a.contentDocument : a.document
                } catch (c) {
                    d("cannot get iframe.contentDocument: " + c), b = a.document
                }
                return b
            }

            function g() {
                function b() {
                    try {
                        var a = e(r).readyState;
                        d("state = " + a), a && "uninitialized" == a.toLowerCase() && setTimeout(b, 50)
                    } catch (c) {
                        d("Server abort: ", c, " (", c.name, ")"), h(A), w && clearTimeout(w), w = void 0
                    }
                }
                var c = l.attr2("target"),
                    f = l.attr2("action"),
                    g = "multipart/form-data",
                    j = l.attr("enctype") || l.attr("encoding") || g;
                x.setAttribute("target", o), (!i || /post/i.test(i)) && x.setAttribute("method", "POST"), f != m.url && x.setAttribute("action", m.url), m.skipEncodingOverride || i && !/post/i.test(i) || l.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), m.timeout && (w = setTimeout(function() {
                    v = !0, h(z)
                }, m.timeout));
                var k = [];
                try {
                    if (m.extraData)
                        for (var n in m.extraData) m.extraData.hasOwnProperty(n) && (a.isPlainObject(m.extraData[n]) && m.extraData[n].hasOwnProperty("name") && m.extraData[n].hasOwnProperty("value") ? k.push(a('<input type="hidden" name="' + m.extraData[n].name + '">').val(m.extraData[n].value).appendTo(x)[0]) : k.push(a('<input type="hidden" name="' + n + '">').val(m.extraData[n]).appendTo(x)[0]));
                    m.iframeTarget || q.appendTo("body"), r.attachEvent ? r.attachEvent("onload", h) : r.addEventListener("load", h, !1), setTimeout(b, 15);
                    try {
                        x.submit()
                    } catch (p) {
                        var s = document.createElement("form").submit;
                        s.apply(x)
                    }
                } finally {
                    x.setAttribute("action", f), x.setAttribute("enctype", j), c ? x.setAttribute("target", c) : l.removeAttr("target"), a(k).remove()
                }
            }

            function h(b) {
                if (!s.aborted && !F) {
                    if (E = e(r), E || (d("cannot access response document"), b = A), b === z && s) return s.abort("timeout"), y.reject(s, "timeout"), void 0;
                    if (b == A && s) return s.abort("server abort"), y.reject(s, "error", "server abort"), void 0;
                    if (E && E.location.href != m.iframeSrc || v) {
                        r.detachEvent ? r.detachEvent("onload", h) : r.removeEventListener("load", h, !1);
                        var c, f = "success";
                        try {
                            if (v) throw "timeout";
                            var g = "xml" == m.dataType || E.XMLDocument || a.isXMLDoc(E);
                            if (d("isXml=" + g), !g && window.opera && (null === E.body || !E.body.innerHTML) && --G) return d("requeing onLoad callback, DOM not available"), setTimeout(h, 250), void 0;
                            var i = E.body ? E.body : E.documentElement;
                            s.responseText = i ? i.innerHTML : null, s.responseXML = E.XMLDocument ? E.XMLDocument : E, g && (m.dataType = "xml"), s.getResponseHeader = function(a) {
                                var b = {
                                    "content-type": m.dataType
                                };
                                return b[a.toLowerCase()]
                            }, i && (s.status = Number(i.getAttribute("status")) || s.status, s.statusText = i.getAttribute("statusText") || s.statusText);
                            var j = (m.dataType || "").toLowerCase(),
                                k = /(json|script|text)/.test(j);
                            if (k || m.textarea) {
                                var l = E.getElementsByTagName("textarea")[0];
                                if (l) s.responseText = l.value, s.status = Number(l.getAttribute("status")) || s.status, s.statusText = l.getAttribute("statusText") || s.statusText;
                                else if (k) {
                                    var o = E.getElementsByTagName("pre")[0],
                                        p = E.getElementsByTagName("body")[0];
                                    o ? s.responseText = o.textContent ? o.textContent : o.innerText : p && (s.responseText = p.textContent ? p.textContent : p.innerText)
                                }
                            } else "xml" == j && !s.responseXML && s.responseText && (s.responseXML = H(s.responseText));
                            try {
                                D = J(s, j, m)
                            } catch (t) {
                                f = "parsererror", s.error = c = t || f
                            }
                        } catch (t) {
                            d("error caught: ", t), f = "error", s.error = c = t || f
                        }
                        s.aborted && (d("upload aborted"), f = null), s.status && (f = s.status >= 200 && s.status < 300 || 304 === s.status ? "success" : "error"), "success" === f ? (m.success && m.success.call(m.context, D, "success", s), y.resolve(s.responseText, "success", s), n && a.event.trigger("ajaxSuccess", [s, m])) : f && (void 0 === c && (c = s.statusText), m.error && m.error.call(m.context, s, f, c), y.reject(s, "error", c), n && a.event.trigger("ajaxError", [s, m, c])), n && a.event.trigger("ajaxComplete", [s, m]), n && !--a.active && a.event.trigger("ajaxStop"), m.complete && m.complete.call(m.context, s, f), F = !0, m.timeout && clearTimeout(w), setTimeout(function() {
                            m.iframeTarget ? q.attr("src", m.iframeSrc) : q.remove(), s.responseXML = null
                        }, 100)
                    }
                }
            }
            var j, k, m, n, o, q, r, s, t, u, v, w, x = l[0],
                y = a.Deferred();
            if (y.abort = function(a) {
                    s.abort(a)
                }, c)
                for (k = 0; k < p.length; k++) j = a(p[k]), f ? j.prop("disabled", !1) : j.removeAttr("disabled");
            if (m = a.extend(!0, {}, a.ajaxSettings, b), m.context = m.context || m, o = "jqFormIO" + (new Date).getTime(), m.iframeTarget ? (q = a(m.iframeTarget), u = q.attr2("name"), u ? o = u : q.attr2("name", o)) : (q = a('<iframe name="' + o + '" src="' + m.iframeSrc + '" />'), q.css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                })), r = q[0], s = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function() {},
                    getResponseHeader: function() {},
                    setRequestHeader: function() {},
                    abort: function(b) {
                        var c = "timeout" === b ? "timeout" : "aborted";
                        d("aborting upload... " + c), this.aborted = 1;
                        try {
                            r.contentWindow.document.execCommand && r.contentWindow.document.execCommand("Stop")
                        } catch (e) {}
                        q.attr("src", m.iframeSrc), s.error = c, m.error && m.error.call(m.context, s, c, b), n && a.event.trigger("ajaxError", [s, m, c]), m.complete && m.complete.call(m.context, s, c)
                    }
                }, n = m.global, n && 0 === a.active++ && a.event.trigger("ajaxStart"), n && a.event.trigger("ajaxSend", [s, m]), m.beforeSend && m.beforeSend.call(m.context, s, m) === !1) return m.global && a.active--, y.reject(), y;
            if (s.aborted) return y.reject(), y;
            t = x.clk, t && (u = t.name, u && !t.disabled && (m.extraData = m.extraData || {}, m.extraData[u] = t.value, "image" == t.type && (m.extraData[u + ".x"] = x.clk_x, m.extraData[u + ".y"] = x.clk_y)));
            var z = 1,
                A = 2,
                B = a("meta[name=csrf-token]").attr("content"),
                C = a("meta[name=csrf-param]").attr("content");
            C && B && (m.extraData = m.extraData || {}, m.extraData[C] = B), m.forceSync ? g() : setTimeout(g, 10);
            var D, E, F, G = 50,
                H = a.parseXML || function(a, b) {
                    return window.ActiveXObject ? (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a)) : b = (new DOMParser).parseFromString(a, "text/xml"), b && b.documentElement && "parsererror" != b.documentElement.nodeName ? b : null
                },
                I = a.parseJSON || function(a) {
                    return window.eval("(" + a + ")")
                },
                J = function(b, c, d) {
                    var e = b.getResponseHeader("content-type") || "",
                        f = "xml" === c || !c && e.indexOf("xml") >= 0,
                        g = f ? b.responseXML : b.responseText;
                    return f && "parsererror" === g.documentElement.nodeName && a.error && a.error("parsererror"), d && d.dataFilter && (g = d.dataFilter(g, c)), "string" == typeof g && ("json" === c || !c && e.indexOf("json") >= 0 ? g = I(g) : ("script" === c || !c && e.indexOf("javascript") >= 0) && a.globalEval(g)), g
                };
            return y
        }
        if (!this.length) return d("ajaxSubmit: skipping submit process - no element selected"), this;
        var i, j, k, l = this;
        "function" == typeof b ? b = {
            success: b
        } : void 0 === b && (b = {}), i = b.type || this.attr2("method"), j = b.url || this.attr2("action"), k = "string" == typeof j ? a.trim(j) : "", k = k || window.location.href || "", k && (k = (k.match(/^([^#]+)/) || [])[1]), b = a.extend(!0, {
            url: k,
            success: a.ajaxSettings.success,
            type: i || a.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, b);
        var m = {};
        if (this.trigger("form-pre-serialize", [this, b, m]), m.veto) return d("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (b.beforeSerialize && b.beforeSerialize(this, b) === !1) return d("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        var n = b.traditional;
        void 0 === n && (n = a.ajaxSettings.traditional);
        var o, p = [],
            q = this.formToArray(b.semantic, p);
        if (b.data && (b.extraData = b.data, o = a.param(b.data, n)), b.beforeSubmit && b.beforeSubmit(q, this, b) === !1) return d("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
        if (this.trigger("form-submit-validate", [q, this, b, m]), m.veto) return d("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        var r = a.param(q, n);
        o && (r = r ? r + "&" + o : o), "GET" == b.type.toUpperCase() ? (b.url += (b.url.indexOf("?") >= 0 ? "&" : "?") + r, b.data = null) : b.data = r;
        var s = [];
        if (b.resetForm && s.push(function() {
                l.resetForm()
            }), b.clearForm && s.push(function() {
                l.clearForm(b.includeHidden)
            }), !b.dataType && b.target) {
            var t = b.success || function() {};
            s.push(function(c) {
                var d = b.replaceTarget ? "replaceWith" : "html";
                a(b.target)[d](c).each(t, arguments)
            })
        } else b.success && s.push(b.success);
        if (b.success = function(a, c, d) {
                for (var e = b.context || this, f = 0, g = s.length; g > f; f++) s[f].apply(e, [a, c, d || l, l])
            }, b.error) {
            var u = b.error;
            b.error = function(a, c, d) {
                var e = b.context || this;
                u.apply(e, [a, c, d, l])
            }
        }
        if (b.complete) {
            var v = b.complete;
            b.complete = function(a, c) {
                var d = b.context || this;
                v.apply(d, [a, c, l])
            }
        }
        var w = a("input[type=file]:enabled", this).filter(function() {
                return "" !== a(this).val()
            }),
            x = w.length > 0,
            y = "multipart/form-data",
            z = l.attr("enctype") == y || l.attr("encoding") == y,
            A = e.fileapi && e.formdata;
        d("fileAPI :" + A);
        var B, C = (x || z) && !A;
        b.iframe !== !1 && (b.iframe || C) ? b.closeKeepAlive ? a.get(b.closeKeepAlive, function() {
            B = h(q)
        }) : B = h(q) : B = (x || z) && A ? g(q) : a.ajax(b), l.removeData("jqxhr").data("jqxhr", B);
        for (var D = 0; D < p.length; D++) p[D] = null;
        return this.trigger("form-submit-notify", [this, b]), this
    }, a.fn.ajaxForm = function(e) {
        if (e = e || {}, e.delegation = e.delegation && a.isFunction(a.fn.on), !e.delegation && 0 === this.length) {
            var f = {
                s: this.selector,
                c: this.context
            };
            return !a.isReady && f.s ? (d("DOM not ready, queuing ajaxForm"), a(function() {
                a(f.s, f.c).ajaxForm(e)
            }), this) : (d("terminating; zero elements found by selector" + (a.isReady ? "" : " (DOM not ready)")), this)
        }
        return e.delegation ? (a(document).off("submit.form-plugin", this.selector, b).off("click.form-plugin", this.selector, c).on("submit.form-plugin", this.selector, e, b).on("click.form-plugin", this.selector, e, c), this) : this.ajaxFormUnbind().bind("submit.form-plugin", e, b).bind("click.form-plugin", e, c)
    }, a.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    }, a.fn.formToArray = function(b, c) {
        var d = [];
        if (0 === this.length) return d;
        var f, g = this[0],
            h = this.attr("id"),
            i = b ? g.getElementsByTagName("*") : g.elements;
        if (i && !/MSIE 8/.test(navigator.userAgent) && (i = a(i).get()), h && (f = a(":input[form=" + h + "]").get(), f.length && (i = (i || []).concat(f))), !i || !i.length) return d;
        var j, k, l, m, n, o, p;
        for (j = 0, o = i.length; o > j; j++)
            if (n = i[j], l = n.name, l && !n.disabled)
                if (b && g.clk && "image" == n.type) g.clk == n && (d.push({
                    name: l,
                    value: a(n).val(),
                    type: n.type
                }), d.push({
                    name: l + ".x",
                    value: g.clk_x
                }, {
                    name: l + ".y",
                    value: g.clk_y
                }));
                else if (m = a.fieldValue(n, !0), m && m.constructor == Array)
            for (c && c.push(n), k = 0, p = m.length; p > k; k++) d.push({
                name: l,
                value: m[k]
            });
        else if (e.fileapi && "file" == n.type) {
            c && c.push(n);
            var q = n.files;
            if (q.length)
                for (k = 0; k < q.length; k++) d.push({
                    name: l,
                    value: q[k],
                    type: n.type
                });
            else d.push({
                name: l,
                value: "",
                type: n.type
            })
        } else null !== m && "undefined" != typeof m && (c && c.push(n), d.push({
            name: l,
            value: m,
            type: n.type,
            required: n.required
        }));
        if (!b && g.clk) {
            var r = a(g.clk),
                s = r[0];
            l = s.name, l && !s.disabled && "image" == s.type && (d.push({
                name: l,
                value: r.val()
            }), d.push({
                name: l + ".x",
                value: g.clk_x
            }, {
                name: l + ".y",
                value: g.clk_y
            }))
        }
        return d
    }, a.fn.formSerialize = function(b) {
        return a.param(this.formToArray(b))
    }, a.fn.fieldSerialize = function(b) {
        var c = [];
        return this.each(function() {
            var d = this.name;
            if (d) {
                var e = a.fieldValue(this, b);
                if (e && e.constructor == Array)
                    for (var f = 0, g = e.length; g > f; f++) c.push({
                        name: d,
                        value: e[f]
                    });
                else null !== e && "undefined" != typeof e && c.push({
                    name: this.name,
                    value: e
                })
            }
        }), a.param(c)
    }, a.fn.fieldValue = function(b) {
        for (var c = [], d = 0, e = this.length; e > d; d++) {
            var f = this[d],
                g = a.fieldValue(f, b);
            null === g || "undefined" == typeof g || g.constructor == Array && !g.length || (g.constructor == Array ? a.merge(c, g) : c.push(g))
        }
        return c
    }, a.fieldValue = function(b, c) {
        var d = b.name,
            e = b.type,
            f = b.tagName.toLowerCase();
        if (void 0 === c && (c = !0), c && (!d || b.disabled || "reset" == e || "button" == e || ("checkbox" == e || "radio" == e) && !b.checked || ("submit" == e || "image" == e) && b.form && b.form.clk != b || "select" == f && -1 == b.selectedIndex)) return null;
        if ("select" == f) {
            var g = b.selectedIndex;
            if (0 > g) return null;
            for (var h = [], i = b.options, j = "select-one" == e, k = j ? g + 1 : i.length, l = j ? g : 0; k > l; l++) {
                var m = i[l];
                if (m.selected) {
                    var n = m.value;
                    if (n || (n = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), j) return n;
                    h.push(n)
                }
            }
            return h
        }
        return a(b).val()
    }, a.fn.clearForm = function(b) {
        return this.each(function() {
            a("input,select,textarea", this).clearFields(b)
        })
    }, a.fn.clearFields = a.fn.clearInputs = function(b) {
        var c = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var d = this.type,
                e = this.tagName.toLowerCase();
            c.test(d) || "textarea" == e ? this.value = "" : "checkbox" == d || "radio" == d ? this.checked = !1 : "select" == e ? this.selectedIndex = -1 : "file" == d ? /MSIE/.test(navigator.userAgent) ? a(this).replaceWith(a(this).clone(!0)) : a(this).val("") : b && (b === !0 && /hidden/.test(d) || "string" == typeof b && a(this).is(b)) && (this.value = "")
        })
    }, a.fn.resetForm = function() {
        return this.each(function() {
            ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
        })
    }, a.fn.enable = function(a) {
        return void 0 === a && (a = !0), this.each(function() {
            this.disabled = !a
        })
    }, a.fn.selected = function(b) {
        return void 0 === b && (b = !0), this.each(function() {
            var c = this.type;
            if ("checkbox" == c || "radio" == c) this.checked = b;
            else if ("option" == this.tagName.toLowerCase()) {
                var d = a(this).parent("select");
                b && d[0] && "select-one" == d[0].type && d.find("option").selected(!1), this.selected = b
            }
        })
    }, a.fn.ajaxSubmit.debug = !1
});




//////////////////////////////////////////////////////////////

$(document).ready(function(){
    $('.unif-form .field[data-mask]').each(function(){
        $(this).find('input, select, textarea').mask($(this).attr('data-mask'));
    });

    $('.unif-form .new-captcha').click(function(){
        var jqForm = $(this).parents('.unif-form');

        $.getJSON("/bitrix/components/nsandrey/mailform/ajax.php", { REQUEST_TYPE: "NEW_CAPTCHA" }).done(function(data) {
            if (data.TYPE == 'NEW_CAPTCHA')
            {
                jqForm.find('#captcha input[type=text]').val('');
                jqForm.find('#captcha input[name=CAPTCHA_SID]').val(data.NEW_CAPTCHA);
                jqForm.find('#captcha img').attr('src', '/bitrix/tools/captcha.php?captcha_sid=' + data.NEW_CAPTCHA);
            }
        });

        return false;
    });

 //beforeSubmit: function(){document.getElementById('sub_button').style.display="none";document.getElementById('sub_preloader').style.display="block";},

    $('.unif-form').ajaxForm({
        dataType: 'json',
	beforeSubmit: function(){

var Mass_tagname = document.getElementsByTagName("*");
//alert(Mass_tagname);
for (var Mass_count = 0; Mass_count < Mass_tagname.length; Mass_count++) 
{
	if(Mass_tagname[Mass_count].getAttribute('id') == "sub_preloader") 
	{
		Mass_tagname[Mass_count].style.display="block";
	}

	if(Mass_tagname[Mass_count].getAttribute('id') == "sub_button") 
	{
		Mass_tagname[Mass_count].style.display="none";
	}


}
//document.getElementById('sub_button').style.display="none";
//document.getElementById('sub_preloader').style.display="block";
},
        success: function(responseText, statusText, xhr, $form){
            var jqForm = $('#' + responseText.FORM_ID);


            window.console.log(responseText);
           //alert(responseText.text());
			//alert(jqForm.html);
			//alert($form.html);
			//alert(xhr.val);
			//alert(jqForm.find('.field').find('error').find('.errors').val);
			//alert($(this).html);

			//alert(jqForm.find('.field').find('error').val);
			//alert($.placeholder.log);
			//alert(msg);

            jqForm.find('.field').removeClass('error').find('.errors').html('');



            if (responseText.TYPE == 'ERRORS')
            {
                window.console.log(responseText);

//alert("SOME ERRORS");

				var Mass_tagname = document.getElementsByTagName("*");

				for (var Mass_count = 0; Mass_count < Mass_tagname.length; Mass_count++) 
				{
//replaced functions for all DOM
					//document.getElementById('sub_preloader').style.display="none";
					if(Mass_tagname[Mass_count].getAttribute('id') == "sub_preloader") 
					{
						//alert("sub_preloader");
						Mass_tagname[Mass_count].style.display="none";
					}
					//document.getElementById('sub_button').style.display="block";
					if(Mass_tagname[Mass_count].getAttribute('id') == "sub_button") 
					{
						//alert("sub_button");
						Mass_tagname[Mass_count].style.display="block";
					}

				}


                for (var fieldName in responseText.MESSAGES)
                {
                    var errorMessage = unifMessages[responseText.MESSAGES[fieldName].FIELD_TYPE + '_' + responseText.MESSAGES[fieldName].ERROR_TYPE];

						//alert(errorMessage);
						//jqForm.resetForm();
//alert(jqForm.children);
					//alert(jqForm.attr);
					//alert(jqForm.find('#' + fieldName.toLowerCase()).val);
					//alert(jqForm.find('#' + fieldName.toLowerCase()).html);
					//alert(jqForm.find('#' + fieldName.toLowerCase()).trigger);
					//alert((jqForm.find('#' + fieldName.toLowerCase())).addClass('error').find('.errors').html);

                    jqForm.find('#' + fieldName.toLowerCase()).addClass('error').find('.errors').html(errorMessage);
                }

				//alert(jqForm.find('#captcha input[type=text]').val(''));
                jqForm.find('#captcha input[type=text]').val('');
                jqForm.find('#captcha input[name=CAPTCHA_SID]').val(responseText.MESSAGES.NEW_CAPTCHA);
                jqForm.find('#captcha img').attr('src', '/bitrix/tools/captcha.php?captcha_sid=' + responseText.MESSAGES.NEW_CAPTCHA);
            }
            else if (responseText.TYPE == 'OK')
            {
                // get new captcha
                jqForm.find('.new-captcha').trigger('click');
                // reset form
                jqForm.resetForm();
                jqForm.find('.uploader .filename').html(savedFileLabels[jqForm.attr('id')]);
                // success message show
                jqForm.find('.success').fadeIn(250);

                var Mass_tagname = document.getElementsByTagName("*");
                for (var Mass_count = 0; Mass_count < Mass_tagname.length; Mass_count++) 
                {
                	if(Mass_tagname[Mass_count].getAttribute('id') == "sub_preloader") 
                	{
                		Mass_tagname[Mass_count].style.display="none";
                	}

                	if(Mass_tagname[Mass_count].getAttribute('id') == "sub_button") 
                	{
                		Mass_tagname[Mass_count].style.display="block";
                	}

                	if(Mass_tagname[Mass_count].getAttribute('id') == "for_hiding") 
                	{
                		Mass_tagname[Mass_count].style.display="none";
                	}


                }

		//document.getElementById('sub_preloader').style.display="none";
		//document.getElementById('sub_button').style.display="block";
		//document.getElementById('for_hiding').style.display="none";
/*
                setTimeout(function(){
                    jqForm.find('.success').fadeOut(250);
                }, 10000);
*/
            }
        }
    });

    $('.unif-form input:not([type=submit]), .unif-form select, .unif-form textarea').uniform();

    // uniform file labels fix
    var savedFileLabels = {};

    $('.unif-form').each(function(){
        savedFileLabels[$(this).attr('id')] = $(this).find('.uploader .filename').html();
    });
});