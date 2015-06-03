/**
 * 
 *
 *
 * Copyright (c) 2015
 * Licensed MIT <>
 */
! function(a, b, c) {
    function d(a) {
        this.mode = j.MODE_8BIT_BYTE, this.data = a
    }

    function e(a, b) {
        this.typeNumber = a, this.errorCorrectLevel = b, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = new Array
    }

    function f(a, b) {
        if (a.length == c) throw new Error(a.length + "/" + b);
        for (var d = 0; d < a.length && 0 == a[d];) d++;
        this.num = new Array(a.length - d + b);
        for (var e = 0; e < a.length - d; e++) this.num[e] = a[e + d]
    }

    function g(a, b) {
        this.totalCount = a, this.dataCount = b
    }

    function h() {
        this.buffer = new Array, this.length = 0
    }

    function i(a) {
            for (var b = 0, c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                d >= 1 && 126 >= d || d >= 65376 && 65439 >= d ? b++ : b += 2
            }
            return b
        }! function(a) {
            function b(a) {
                function b(a, b, c) {
                    return a[b] || (a[b] = c())
                }
                var c = b(a, "eqShow", Object);
                return b(c, "templateParser", function() {
                    var a = {};
                    return function(c, d) {
                        if ("hasOwnProperty" === c) throw new Error("hasOwnProperty is not a valid name");
                        return d && a.hasOwnProperty(c) && (a[c] = null), b(a, c, d)
                    }
                })
            }

            function c() {
                templateParser = b(a)
            }
            var d = a.eqShow || (a.eqShow = {});
            c(d)
        }(a, document),
        function(a) {
            a.fn.qrcode = function(b) {
                "string" == typeof b && (b = {
                    text: b
                }), b = a.extend({}, {
                    render: "canvas",
                    width: 256,
                    height: 256,
                    typeNumber: -1,
                    correctLevel: k.H,
                    background: "#ffffff",
                    foreground: "#000000"
                }, b);
                var c = function() {
                        var a = new e(b.typeNumber, b.correctLevel);
                        a.addData(b.text), a.make();
                        var c = document.createElement("canvas");
                        c.width = b.width, c.height = b.height;
                        for (var d = c.getContext("2d"), f = b.width / a.getModuleCount(), g = b.height / a.getModuleCount(), h = 0; h < a.getModuleCount(); h++)
                            for (var i = 0; i < a.getModuleCount(); i++) {
                                d.fillStyle = a.isDark(h, i) ? b.foreground : b.background;
                                var j = Math.ceil((i + 1) * f) - Math.floor(i * f),
                                    k = Math.ceil((h + 1) * f) - Math.floor(h * f);
                                d.fillRect(Math.round(i * f), Math.round(h * g), j, k)
                            }
                        return c
                    },
                    d = function() {
                        var c = new e(b.typeNumber, b.correctLevel);
                        c.addData(b.text), c.make();
                        for (var d = a("<table></table>").css("width", b.width + "px").css("height", b.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", b.background), f = b.width / c.getModuleCount(), g = b.height / c.getModuleCount(), h = 0; h < c.getModuleCount(); h++)
                            for (var i = a("<tr></tr>").css("height", g + "px").appendTo(d), j = 0; j < c.getModuleCount(); j++) a("<td></td>").css("width", f + "px").css("background-color", c.isDark(h, j) ? b.foreground : b.background).appendTo(i);
                        return d
                    };
                return this.each(function() {
                    var e = "canvas" == b.render ? c() : d();
                    a(e).appendTo(this)
                })
            }
        }(jQuery), d.prototype = {
            getLength: function() {
                return this.data.length
            },
            write: function(a) {
                for (var b = 0; b < this.data.length; b++) a.put(this.data.charCodeAt(b), 8)
            }
        }, e.prototype = {
            addData: function(a) {
                var b = new d(a);
                this.dataList.push(b), this.dataCache = null
            },
            isDark: function(a, b) {
                if (0 > a || this.moduleCount <= a || 0 > b || this.moduleCount <= b) throw new Error(a + "," + b);
                return this.modules[a][b]
            },
            getModuleCount: function() {
                return this.moduleCount
            },
            make: function() {
                if (this.typeNumber < 1) {
                    var a = 1;
                    for (a = 1; 40 > a; a++) {
                        for (var b = g.getRSBlocks(a, this.errorCorrectLevel), c = new h, d = 0, e = 0; e < b.length; e++) d += b[e].dataCount;
                        for (var e = 0; e < this.dataList.length; e++) {
                            var f = this.dataList[e];
                            c.put(f.mode, 4), c.put(f.getLength(), m.getLengthInBits(f.mode, a)), f.write(c)
                        }
                        if (c.getLengthInBits() <= 8 * d) break
                    }
                    this.typeNumber = a
                }
                this.makeImpl(!1, this.getBestMaskPattern())
            },
            makeImpl: function(a, b) {
                this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
                for (var c = 0; c < this.moduleCount; c++) {
                    this.modules[c] = new Array(this.moduleCount);
                    for (var d = 0; d < this.moduleCount; d++) this.modules[c][d] = null
                }
                this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(a, b), this.typeNumber >= 7 && this.setupTypeNumber(a), null == this.dataCache && (this.dataCache = e.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, b)
            },
            setupPositionProbePattern: function(a, b) {
                for (var c = -1; 7 >= c; c++)
                    if (!(-1 >= a + c || this.moduleCount <= a + c))
                        for (var d = -1; 7 >= d; d++) - 1 >= b + d || this.moduleCount <= b + d || (this.modules[a + c][b + d] = c >= 0 && 6 >= c && (0 == d || 6 == d) || d >= 0 && 6 >= d && (0 == c || 6 == c) || c >= 2 && 4 >= c && d >= 2 && 4 >= d ? !0 : !1)
            },
            getBestMaskPattern: function() {
                for (var a = 0, b = 0, c = 0; 8 > c; c++) {
                    this.makeImpl(!0, c);
                    var d = m.getLostPoint(this);
                    (0 == c || a > d) && (a = d, b = c)
                }
                return b
            },
            createMovieClip: function(a, b, c) {
                var d = a.createEmptyMovieClip(b, c),
                    e = 1;
                this.make();
                for (var f = 0; f < this.modules.length; f++)
                    for (var g = f * e, h = 0; h < this.modules[f].length; h++) {
                        var i = h * e,
                            j = this.modules[f][h];
                        j && (d.beginFill(0, 100), d.moveTo(i, g), d.lineTo(i + e, g), d.lineTo(i + e, g + e), d.lineTo(i, g + e), d.endFill())
                    }
                return d
            },
            setupTimingPattern: function() {
                for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this.modules[a][6] = a % 2 == 0);
                for (var b = 8; b < this.moduleCount - 8; b++) null == this.modules[6][b] && (this.modules[6][b] = b % 2 == 0)
            },
            setupPositionAdjustPattern: function() {
                for (var a = m.getPatternPosition(this.typeNumber), b = 0; b < a.length; b++)
                    for (var c = 0; c < a.length; c++) {
                        var d = a[b],
                            e = a[c];
                        if (null == this.modules[d][e])
                            for (var f = -2; 2 >= f; f++)
                                for (var g = -2; 2 >= g; g++) this.modules[d + f][e + g] = -2 == f || 2 == f || -2 == g || 2 == g || 0 == f && 0 == g ? !0 : !1
                    }
            },
            setupTypeNumber: function(a) {
                for (var b = m.getBCHTypeNumber(this.typeNumber), c = 0; 18 > c; c++) {
                    var d = !a && 1 == (b >> c & 1);
                    this.modules[Math.floor(c / 3)][c % 3 + this.moduleCount - 8 - 3] = d
                }
                for (var c = 0; 18 > c; c++) {
                    var d = !a && 1 == (b >> c & 1);
                    this.modules[c % 3 + this.moduleCount - 8 - 3][Math.floor(c / 3)] = d
                }
            },
            setupTypeInfo: function(a, b) {
                for (var c = this.errorCorrectLevel << 3 | b, d = m.getBCHTypeInfo(c), e = 0; 15 > e; e++) {
                    var f = !a && 1 == (d >> e & 1);
                    6 > e ? this.modules[e][8] = f : 8 > e ? this.modules[e + 1][8] = f : this.modules[this.moduleCount - 15 + e][8] = f
                }
                for (var e = 0; 15 > e; e++) {
                    var f = !a && 1 == (d >> e & 1);
                    8 > e ? this.modules[8][this.moduleCount - e - 1] = f : 9 > e ? this.modules[8][15 - e - 1 + 1] = f : this.modules[8][15 - e - 1] = f
                }
                this.modules[this.moduleCount - 8][8] = !a
            },
            mapData: function(a, b) {
                for (var c = -1, d = this.moduleCount - 1, e = 7, f = 0, g = this.moduleCount - 1; g > 0; g -= 2)
                    for (6 == g && g--;;) {
                        for (var h = 0; 2 > h; h++)
                            if (null == this.modules[d][g - h]) {
                                var i = !1;
                                f < a.length && (i = 1 == (a[f] >>> e & 1));
                                var j = m.getMask(b, d, g - h);
                                j && (i = !i), this.modules[d][g - h] = i, e--, -1 == e && (f++, e = 7)
                            }
                        if (d += c, 0 > d || this.moduleCount <= d) {
                            d -= c, c = -c;
                            break
                        }
                    }
            }
        }, e.PAD0 = 236, e.PAD1 = 17, e.createData = function(a, b, c) {
            for (var d = g.getRSBlocks(a, b), f = new h, i = 0; i < c.length; i++) {
                var j = c[i];
                f.put(j.mode, 4), f.put(j.getLength(), m.getLengthInBits(j.mode, a)), j.write(f)
            }
            for (var k = 0, i = 0; i < d.length; i++) k += d[i].dataCount;
            if (f.getLengthInBits() > 8 * k) throw new Error("code length overflow. (" + f.getLengthInBits() + ">" + 8 * k + ")");
            for (f.getLengthInBits() + 4 <= 8 * k && f.put(0, 4); f.getLengthInBits() % 8 != 0;) f.putBit(!1);
            for (;;) {
                if (f.getLengthInBits() >= 8 * k) break;
                if (f.put(e.PAD0, 8), f.getLengthInBits() >= 8 * k) break;
                f.put(e.PAD1, 8)
            }
            return e.createBytes(f, d)
        }, e.createBytes = function(a, b) {
            for (var c = 0, d = 0, e = 0, g = new Array(b.length), h = new Array(b.length), i = 0; i < b.length; i++) {
                var j = b[i].dataCount,
                    k = b[i].totalCount - j;
                d = Math.max(d, j), e = Math.max(e, k), g[i] = new Array(j);
                for (var l = 0; l < g[i].length; l++) g[i][l] = 255 & a.buffer[l + c];
                c += j;
                var n = m.getErrorCorrectPolynomial(k),
                    o = new f(g[i], n.getLength() - 1),
                    p = o.mod(n);
                h[i] = new Array(n.getLength() - 1);
                for (var l = 0; l < h[i].length; l++) {
                    var q = l + p.getLength() - h[i].length;
                    h[i][l] = q >= 0 ? p.get(q) : 0
                }
            }
            for (var r = 0, l = 0; l < b.length; l++) r += b[l].totalCount;
            for (var s = new Array(r), t = 0, l = 0; d > l; l++)
                for (var i = 0; i < b.length; i++) l < g[i].length && (s[t++] = g[i][l]);
            for (var l = 0; e > l; l++)
                for (var i = 0; i < b.length; i++) l < h[i].length && (s[t++] = h[i][l]);
            return s
        };
    for (var j = {
        MODE_NUMBER: 1,
        MODE_ALPHA_NUM: 2,
        MODE_8BIT_BYTE: 4,
        MODE_KANJI: 8
    }, k = {
        L: 1,
        M: 0,
        Q: 3,
        H: 2
    }, l = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
    }, m = {
        PATTERN_POSITION_TABLE: [
            [],
            [6, 18],
            [6, 22],
            [6, 26],
            [6, 30],
            [6, 34],
            [6, 22, 38],
            [6, 24, 42],
            [6, 26, 46],
            [6, 28, 50],
            [6, 30, 54],
            [6, 32, 58],
            [6, 34, 62],
            [6, 26, 46, 66],
            [6, 26, 48, 70],
            [6, 26, 50, 74],
            [6, 30, 54, 78],
            [6, 30, 56, 82],
            [6, 30, 58, 86],
            [6, 34, 62, 90],
            [6, 28, 50, 72, 94],
            [6, 26, 50, 74, 98],
            [6, 30, 54, 78, 102],
            [6, 28, 54, 80, 106],
            [6, 32, 58, 84, 110],
            [6, 30, 58, 86, 114],
            [6, 34, 62, 90, 118],
            [6, 26, 50, 74, 98, 122],
            [6, 30, 54, 78, 102, 126],
            [6, 26, 52, 78, 104, 130],
            [6, 30, 56, 82, 108, 134],
            [6, 34, 60, 86, 112, 138],
            [6, 30, 58, 86, 114, 142],
            [6, 34, 62, 90, 118, 146],
            [6, 30, 54, 78, 102, 126, 150],
            [6, 24, 50, 76, 102, 128, 154],
            [6, 28, 54, 80, 106, 132, 158],
            [6, 32, 58, 84, 110, 136, 162],
            [6, 26, 54, 82, 110, 138, 166],
            [6, 30, 58, 86, 114, 142, 170]
        ],
        G15: 1335,
        G18: 7973,
        G15_MASK: 21522,
        getBCHTypeInfo: function(a) {
            for (var b = a << 10; m.getBCHDigit(b) - m.getBCHDigit(m.G15) >= 0;) b ^= m.G15 << m.getBCHDigit(b) - m.getBCHDigit(m.G15);
            return (a << 10 | b) ^ m.G15_MASK
        },
        getBCHTypeNumber: function(a) {
            for (var b = a << 12; m.getBCHDigit(b) - m.getBCHDigit(m.G18) >= 0;) b ^= m.G18 << m.getBCHDigit(b) - m.getBCHDigit(m.G18);
            return a << 12 | b
        },
        getBCHDigit: function(a) {
            for (var b = 0; 0 != a;) b++, a >>>= 1;
            return b
        },
        getPatternPosition: function(a) {
            return m.PATTERN_POSITION_TABLE[a - 1]
        },
        getMask: function(a, b, c) {
            switch (a) {
                case l.PATTERN000:
                    return (b + c) % 2 == 0;
                case l.PATTERN001:
                    return b % 2 == 0;
                case l.PATTERN010:
                    return c % 3 == 0;
                case l.PATTERN011:
                    return (b + c) % 3 == 0;
                case l.PATTERN100:
                    return (Math.floor(b / 2) + Math.floor(c / 3)) % 2 == 0;
                case l.PATTERN101:
                    return b * c % 2 + b * c % 3 == 0;
                case l.PATTERN110:
                    return (b * c % 2 + b * c % 3) % 2 == 0;
                case l.PATTERN111:
                    return (b * c % 3 + (b + c) % 2) % 2 == 0;
                default:
                    throw new Error("bad maskPattern:" + a)
            }
        },
        getErrorCorrectPolynomial: function(a) {
            for (var b = new f([1], 0), c = 0; a > c; c++) b = b.multiply(new f([1, n.gexp(c)], 0));
            return b
        },
        getLengthInBits: function(a, b) {
            if (b >= 1 && 10 > b) switch (a) {
                case j.MODE_NUMBER:
                    return 10;
                case j.MODE_ALPHA_NUM:
                    return 9;
                case j.MODE_8BIT_BYTE:
                    return 8;
                case j.MODE_KANJI:
                    return 8;
                default:
                    throw new Error("mode:" + a)
            } else if (27 > b) switch (a) {
                case j.MODE_NUMBER:
                    return 12;
                case j.MODE_ALPHA_NUM:
                    return 11;
                case j.MODE_8BIT_BYTE:
                    return 16;
                case j.MODE_KANJI:
                    return 10;
                default:
                    throw new Error("mode:" + a)
            } else {
                if (!(41 > b)) throw new Error("type:" + b);
                switch (a) {
                    case j.MODE_NUMBER:
                        return 14;
                    case j.MODE_ALPHA_NUM:
                        return 13;
                    case j.MODE_8BIT_BYTE:
                        return 16;
                    case j.MODE_KANJI:
                        return 12;
                    default:
                        throw new Error("mode:" + a)
                }
            }
        },
        getLostPoint: function(a) {
            for (var b = a.getModuleCount(), c = 0, d = 0; b > d; d++)
                for (var e = 0; b > e; e++) {
                    for (var f = 0, g = a.isDark(d, e), h = -1; 1 >= h; h++)
                        if (!(0 > d + h || d + h >= b))
                            for (var i = -1; 1 >= i; i++) 0 > e + i || e + i >= b || (0 != h || 0 != i) && g == a.isDark(d + h, e + i) && f++;
                    f > 5 && (c += 3 + f - 5)
                }
            for (var d = 0; b - 1 > d; d++)
                for (var e = 0; b - 1 > e; e++) {
                    var j = 0;
                    a.isDark(d, e) && j++, a.isDark(d + 1, e) && j++, a.isDark(d, e + 1) && j++, a.isDark(d + 1, e + 1) && j++, (0 == j || 4 == j) && (c += 3)
                }
            for (var d = 0; b > d; d++)
                for (var e = 0; b - 6 > e; e++) a.isDark(d, e) && !a.isDark(d, e + 1) && a.isDark(d, e + 2) && a.isDark(d, e + 3) && a.isDark(d, e + 4) && !a.isDark(d, e + 5) && a.isDark(d, e + 6) && (c += 40);
            for (var e = 0; b > e; e++)
                for (var d = 0; b - 6 > d; d++) a.isDark(d, e) && !a.isDark(d + 1, e) && a.isDark(d + 2, e) && a.isDark(d + 3, e) && a.isDark(d + 4, e) && !a.isDark(d + 5, e) && a.isDark(d + 6, e) && (c += 40);
            for (var k = 0, e = 0; b > e; e++)
                for (var d = 0; b > d; d++) a.isDark(d, e) && k++;
            var l = Math.abs(100 * k / b / b - 50) / 5;
            return c += 10 * l
        }
    }, n = {
        glog: function(a) {
            if (1 > a) throw new Error("glog(" + a + ")");
            return n.LOG_TABLE[a]
        },
        gexp: function(a) {
            for (; 0 > a;) a += 255;
            for (; a >= 256;) a -= 255;
            return n.EXP_TABLE[a]
        },
        EXP_TABLE: new Array(256),
        LOG_TABLE: new Array(256)
    }, o = 0; 8 > o; o++) n.EXP_TABLE[o] = 1 << o;
    for (var o = 8; 256 > o; o++) n.EXP_TABLE[o] = n.EXP_TABLE[o - 4] ^ n.EXP_TABLE[o - 5] ^ n.EXP_TABLE[o - 6] ^ n.EXP_TABLE[o - 8];
    for (var o = 0; 255 > o; o++) n.LOG_TABLE[n.EXP_TABLE[o]] = o;
    f.prototype = {
            get: function(a) {
                return this.num[a]
            },
            getLength: function() {
                return this.num.length
            },
            multiply: function(a) {
                for (var b = new Array(this.getLength() + a.getLength() - 1), c = 0; c < this.getLength(); c++)
                    for (var d = 0; d < a.getLength(); d++) b[c + d] ^= n.gexp(n.glog(this.get(c)) + n.glog(a.get(d)));
                return new f(b, 0)
            },
            mod: function(a) {
                if (this.getLength() - a.getLength() < 0) return this;
                for (var b = n.glog(this.get(0)) - n.glog(a.get(0)), c = new Array(this.getLength()), d = 0; d < this.getLength(); d++) c[d] = this.get(d);
                for (var d = 0; d < a.getLength(); d++) c[d] ^= n.gexp(n.glog(a.get(d)) + b);
                return new f(c, 0).mod(a)
            }
        }, g.RS_BLOCK_TABLE = [
            [1, 26, 19],
            [1, 26, 16],
            [1, 26, 13],
            [1, 26, 9],
            [1, 44, 34],
            [1, 44, 28],
            [1, 44, 22],
            [1, 44, 16],
            [1, 70, 55],
            [1, 70, 44],
            [2, 35, 17],
            [2, 35, 13],
            [1, 100, 80],
            [2, 50, 32],
            [2, 50, 24],
            [4, 25, 9],
            [1, 134, 108],
            [2, 67, 43],
            [2, 33, 15, 2, 34, 16],
            [2, 33, 11, 2, 34, 12],
            [2, 86, 68],
            [4, 43, 27],
            [4, 43, 19],
            [4, 43, 15],
            [2, 98, 78],
            [4, 49, 31],
            [2, 32, 14, 4, 33, 15],
            [4, 39, 13, 1, 40, 14],
            [2, 121, 97],
            [2, 60, 38, 2, 61, 39],
            [4, 40, 18, 2, 41, 19],
            [4, 40, 14, 2, 41, 15],
            [2, 146, 116],
            [3, 58, 36, 2, 59, 37],
            [4, 36, 16, 4, 37, 17],
            [4, 36, 12, 4, 37, 13],
            [2, 86, 68, 2, 87, 69],
            [4, 69, 43, 1, 70, 44],
            [6, 43, 19, 2, 44, 20],
            [6, 43, 15, 2, 44, 16],
            [4, 101, 81],
            [1, 80, 50, 4, 81, 51],
            [4, 50, 22, 4, 51, 23],
            [3, 36, 12, 8, 37, 13],
            [2, 116, 92, 2, 117, 93],
            [6, 58, 36, 2, 59, 37],
            [4, 46, 20, 6, 47, 21],
            [7, 42, 14, 4, 43, 15],
            [4, 133, 107],
            [8, 59, 37, 1, 60, 38],
            [8, 44, 20, 4, 45, 21],
            [12, 33, 11, 4, 34, 12],
            [3, 145, 115, 1, 146, 116],
            [4, 64, 40, 5, 65, 41],
            [11, 36, 16, 5, 37, 17],
            [11, 36, 12, 5, 37, 13],
            [5, 109, 87, 1, 110, 88],
            [5, 65, 41, 5, 66, 42],
            [5, 54, 24, 7, 55, 25],
            [11, 36, 12],
            [5, 122, 98, 1, 123, 99],
            [7, 73, 45, 3, 74, 46],
            [15, 43, 19, 2, 44, 20],
            [3, 45, 15, 13, 46, 16],
            [1, 135, 107, 5, 136, 108],
            [10, 74, 46, 1, 75, 47],
            [1, 50, 22, 15, 51, 23],
            [2, 42, 14, 17, 43, 15],
            [5, 150, 120, 1, 151, 121],
            [9, 69, 43, 4, 70, 44],
            [17, 50, 22, 1, 51, 23],
            [2, 42, 14, 19, 43, 15],
            [3, 141, 113, 4, 142, 114],
            [3, 70, 44, 11, 71, 45],
            [17, 47, 21, 4, 48, 22],
            [9, 39, 13, 16, 40, 14],
            [3, 135, 107, 5, 136, 108],
            [3, 67, 41, 13, 68, 42],
            [15, 54, 24, 5, 55, 25],
            [15, 43, 15, 10, 44, 16],
            [4, 144, 116, 4, 145, 117],
            [17, 68, 42],
            [17, 50, 22, 6, 51, 23],
            [19, 46, 16, 6, 47, 17],
            [2, 139, 111, 7, 140, 112],
            [17, 74, 46],
            [7, 54, 24, 16, 55, 25],
            [34, 37, 13],
            [4, 151, 121, 5, 152, 122],
            [4, 75, 47, 14, 76, 48],
            [11, 54, 24, 14, 55, 25],
            [16, 45, 15, 14, 46, 16],
            [6, 147, 117, 4, 148, 118],
            [6, 73, 45, 14, 74, 46],
            [11, 54, 24, 16, 55, 25],
            [30, 46, 16, 2, 47, 17],
            [8, 132, 106, 4, 133, 107],
            [8, 75, 47, 13, 76, 48],
            [7, 54, 24, 22, 55, 25],
            [22, 45, 15, 13, 46, 16],
            [10, 142, 114, 2, 143, 115],
            [19, 74, 46, 4, 75, 47],
            [28, 50, 22, 6, 51, 23],
            [33, 46, 16, 4, 47, 17],
            [8, 152, 122, 4, 153, 123],
            [22, 73, 45, 3, 74, 46],
            [8, 53, 23, 26, 54, 24],
            [12, 45, 15, 28, 46, 16],
            [3, 147, 117, 10, 148, 118],
            [3, 73, 45, 23, 74, 46],
            [4, 54, 24, 31, 55, 25],
            [11, 45, 15, 31, 46, 16],
            [7, 146, 116, 7, 147, 117],
            [21, 73, 45, 7, 74, 46],
            [1, 53, 23, 37, 54, 24],
            [19, 45, 15, 26, 46, 16],
            [5, 145, 115, 10, 146, 116],
            [19, 75, 47, 10, 76, 48],
            [15, 54, 24, 25, 55, 25],
            [23, 45, 15, 25, 46, 16],
            [13, 145, 115, 3, 146, 116],
            [2, 74, 46, 29, 75, 47],
            [42, 54, 24, 1, 55, 25],
            [23, 45, 15, 28, 46, 16],
            [17, 145, 115],
            [10, 74, 46, 23, 75, 47],
            [10, 54, 24, 35, 55, 25],
            [19, 45, 15, 35, 46, 16],
            [17, 145, 115, 1, 146, 116],
            [14, 74, 46, 21, 75, 47],
            [29, 54, 24, 19, 55, 25],
            [11, 45, 15, 46, 46, 16],
            [13, 145, 115, 6, 146, 116],
            [14, 74, 46, 23, 75, 47],
            [44, 54, 24, 7, 55, 25],
            [59, 46, 16, 1, 47, 17],
            [12, 151, 121, 7, 152, 122],
            [12, 75, 47, 26, 76, 48],
            [39, 54, 24, 14, 55, 25],
            [22, 45, 15, 41, 46, 16],
            [6, 151, 121, 14, 152, 122],
            [6, 75, 47, 34, 76, 48],
            [46, 54, 24, 10, 55, 25],
            [2, 45, 15, 64, 46, 16],
            [17, 152, 122, 4, 153, 123],
            [29, 74, 46, 14, 75, 47],
            [49, 54, 24, 10, 55, 25],
            [24, 45, 15, 46, 46, 16],
            [4, 152, 122, 18, 153, 123],
            [13, 74, 46, 32, 75, 47],
            [48, 54, 24, 14, 55, 25],
            [42, 45, 15, 32, 46, 16],
            [20, 147, 117, 4, 148, 118],
            [40, 75, 47, 7, 76, 48],
            [43, 54, 24, 22, 55, 25],
            [10, 45, 15, 67, 46, 16],
            [19, 148, 118, 6, 149, 119],
            [18, 75, 47, 31, 76, 48],
            [34, 54, 24, 34, 55, 25],
            [20, 45, 15, 61, 46, 16]
        ], g.getRSBlocks = function(a, b) {
            var d = g.getRsBlockTable(a, b);
            if (d == c) throw new Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + b);
            for (var e = d.length / 3, f = new Array, h = 0; e > h; h++)
                for (var i = d[3 * h + 0], j = d[3 * h + 1], k = d[3 * h + 2], l = 0; i > l; l++) f.push(new g(j, k));
            return f
        }, g.getRsBlockTable = function(a, b) {
            switch (b) {
                case k.L:
                    return g.RS_BLOCK_TABLE[4 * (a - 1) + 0];
                case k.M:
                    return g.RS_BLOCK_TABLE[4 * (a - 1) + 1];
                case k.Q:
                    return g.RS_BLOCK_TABLE[4 * (a - 1) + 2];
                case k.H:
                    return g.RS_BLOCK_TABLE[4 * (a - 1) + 3];
                default:
                    return c
            }
        }, h.prototype = {
            get: function(a) {
                var b = Math.floor(a / 8);
                return 1 == (this.buffer[b] >>> 7 - a % 8 & 1)
            },
            put: function(a, b) {
                for (var c = 0; b > c; c++) this.putBit(1 == (a >>> b - c - 1 & 1))
            },
            getLengthInBits: function() {
                return this.length
            },
            putBit: function(a) {
                var b = Math.floor(this.length / 8);
                this.buffer.length <= b && this.buffer.push(0), a && (this.buffer[b] |= 128 >>> this.length % 8), this.length++
            }
        },
        function(a) {
            a.fn.slides = function(b) {
                return b = a.extend({}, a.fn.slides.option, b), this.each(function() {
                    function c() {
                        clearInterval(j.data("interval"))
                    }

                    function d() {
                        b.pause ? (clearTimeout(j.data("pause")), clearInterval(j.data("interval")), pauseTimeout = setTimeout(function() {
                            clearTimeout(j.data("pause")), playInterval = setInterval(function() {
                                e("next", p)
                            }, b.play), j.data("interval", playInterval)
                        }, b.pause), j.data("pause", pauseTimeout)) : c()
                    }

                    function e(c, d, e) {
                        if (!g && f) {
                            switch (g = !0, c) {
                                case "next":
                                    s = u, r = u + 1, r = l === r ? 0 : r, i = 2 * m, c = 2 * -m, u = r;
                                    break;
                                case "prev":
                                    s = u, r = u - 1, r = -1 === r ? l - 1 : r, i = 0, c = 0, u = r;
                                    break;
                                case "pagination":
                                    r = parseInt(e, 10), s = a("." + b.paginationClass + " li.current a", j).attr("rel"), r > s ? (i = 2 * m, c = 2 * -m) : (i = 0, c = 0), u = r
                            }
                            "fade" === d ? (b.animationStart(), b.crossfade ? k.children(":eq(" + r + ")", j).css({
                                zIndex: 10
                            }).fadeIn(b.fadeSpeed, function() {
                                k.children(":eq(" + s + ")", j).css({
                                    display: "none",
                                    zIndex: 0
                                }), a(this).css({
                                    zIndex: 0
                                }), b.animationComplete(r + 1), g = !1
                            }) : (b.animationStart(), k.children(":eq(" + s + ")", j).fadeOut(b.fadeSpeed, function() {
                                b.autoHeight ? k.animate({
                                    height: k.children(":eq(" + r + ")", j).outerHeight()
                                }, b.autoHeightSpeed, function() {
                                    k.children(":eq(" + r + ")", j).fadeIn(b.fadeSpeed)
                                }) : k.children(":eq(" + r + ")", j).fadeIn(b.fadeSpeed, function() {
                                    a.browser.msie && a(this).get(0).style.removeAttribute("filter")
                                }), b.animationComplete(r + 1), g = !1
                            }))) : (k.children(":eq(" + r + ")").css({
                                left: i,
                                display: "block"
                            }), b.autoHeight ? (b.animationStart(), k.animate({
                                left: c,
                                height: k.children(":eq(" + r + ")").outerHeight()
                            }, b.slideSpeed, function() {
                                k.css({
                                    left: -m
                                }), k.children(":eq(" + r + ")").css({
                                    left: m,
                                    zIndex: 5
                                }), k.children(":eq(" + s + ")").css({
                                    left: m,
                                    display: "none",
                                    zIndex: 0
                                }), b.animationComplete(r + 1), g = !1
                            })) : (b.animationStart(), k.animate({
                                left: c
                            }, b.slideSpeed, function() {
                                k.css({
                                    left: -m
                                }), k.children(":eq(" + r + ")").css({
                                    left: m,
                                    zIndex: 5
                                }), k.children(":eq(" + s + ")").css({
                                    left: m,
                                    display: "none",
                                    zIndex: 0
                                }), b.animationComplete(r + 1), g = !1
                            }))), b.pagination && (a("." + b.paginationClass + " li.current", j).removeClass("current"), a("." + b.paginationClass + " li a:eq(" + r + ")", j).parent().addClass("current"))
                        }
                    }
                    a("." + b.container, a(this)).children().wrapAll('<div class="slides_control"/>');
                    var f, g, h, i, j = a(this),
                        k = a(".slides_control", j),
                        l = k.children().size(),
                        m = k.children().outerWidth(),
                        n = k.children().outerHeight(),
                        o = b.start - 1,
                        p = b.effect.indexOf(",") < 0 ? b.effect : b.effect.replace(" ", "").split(",")[0],
                        q = b.effect.indexOf(",") < 0 ? p : b.effect.replace(" ", "").split(",")[1],
                        r = 0,
                        s = 0,
                        t = 0,
                        u = 0;
                    if (!(2 > l)) {
                        if (0 > o && (o = 0), o > l && (o = l - 1), b.start && (u = o), b.randomize && k.randomize(), a("." + b.container, j).css({
                            overflow: "hidden",
                            position: "relative"
                        }), k.css({
                            position: "relative",
                            width: 3 * m,
                            height: n,
                            left: -m
                        }), k.children().css({
                            position: "absolute",
                            top: 0,
                            left: m,
                            zIndex: 0,
                            display: "none"
                        }), b.autoHeight && k.animate({
                            height: k.children(":eq(" + o + ")").outerHeight()
                        }, b.autoHeightSpeed), b.preload && "IMG" == k.children()[0].tagName) {
                            j.css({
                                background: "url(" + b.preloadImage + ") no-repeat 50% 50%"
                            });
                            var v = a("img:eq(" + o + ")", j).attr("src") + "?" + (new Date).getTime();
                            a("img:eq(" + o + ")", j).attr("src", v).load(function() {
                                a(this).fadeIn(b.fadeSpeed, function() {
                                    a(this).css({
                                        zIndex: 5
                                    }), j.css({
                                        background: ""
                                    }), f = !0
                                })
                            })
                        } else k.children(":eq(" + o + ")").fadeIn(b.fadeSpeed, function() {
                            f = !0
                        });
                        b.bigTarget && (k.children().css({
                            cursor: "pointer"
                        }), k.children().click(function() {
                            return e("next", p), !1
                        })), b.hoverPause && b.play && (k.children().bind("mouseover", function() {
                            c()
                        }), k.children().bind("mouseleave", function() {
                            d()
                        })), b.generateNextPrev && (a("." + b.container, j).after('<a href="#" class="' + b.prev + '">Prev</a>'), a("." + b.prev, j).after('<a href="#" class="' + b.next + '">Next</a>')), a("." + b.next, j).click(function(a) {
                            a.preventDefault(), b.play && d(), e("next", p)
                        }), a("." + b.prev, j).click(function(a) {
                            a.preventDefault(), b.play && d(), e("prev", p)
                        }), b.generatePagination ? (j.append("<ul class=" + b.paginationClass + "></ul>"), k.children().each(function() {
                            a("." + b.paginationClass, j).append("<li><a rel=" + t + ' href="#">' + (t + 1) + "</a></li>"), t++
                        })) : a("." + b.paginationClass + " li a", j).each(function() {
                            a(this).attr("rel", t), t++
                        }), a("." + b.paginationClass + " li a:eq(" + o + ")", j).parent().addClass("current"), a("." + b.paginationClass + " li a", j).click(function() {
                            return b.play && d(), h = a(this).attr("rel"), u != h && e("pagination", q, h), !1
                        }), b.play && (playInterval = setInterval(function() {
                            e("next", p)
                        }, b.play), j.data("interval", playInterval))
                    }
                })
            }, a.fn.slides.option = {
                preload: !1,
                preloadImage: "/img/loading.gif",
                container: "slides_container",
                generateNextPrev: !1,
                next: "next",
                prev: "prev",
                pagination: !0,
                generatePagination: !0,
                paginationClass: "pagination",
                fadeSpeed: 350,
                slideSpeed: 350,
                start: 1,
                effect: "slide",
                crossfade: !1,
                randomize: !1,
                play: 0,
                pause: 0,
                hoverPause: !1,
                autoHeight: !1,
                autoHeightSpeed: 350,
                bigTarget: !1,
                animationStart: function() {},
                animationComplete: function() {}
            }, a.fn.randomize = function(b) {
                function d() {
                    return Math.round(Math.random()) - .5
                }
                return a(this).each(function() {
                    var e = a(this),
                        f = e.children(),
                        g = f.length;
                    if (g > 1) {
                        f.hide();
                        var h = [];
                        for (o = 0; g > o; o++) h[h.length] = o;
                        h = h.sort(d), a.each(h, function(a, d) {
                            var g = f.eq(d),
                                h = g.clone(!0);
                            h.show().appendTo(e), b !== c && b(g, h), g.remove()
                        })
                    }
                })
            }
        }(jQuery),
        function(b) {
            function c(a, b, c, d) {
                var e = {},
                    f = a / b,
                    g = c / d;
                return f > g ? (e.width = c, e.height = c / f) : (e.height = d, e.width = d * f), e
            }
            var d = b.templateParser("jsonParser", function() {
                function a(a) {
                    return function(b, c) {
                        a[b] = c
                    }
                }

                function b(a, b) {
                    var c = i[("" + a.type).charAt(0)](a);
                    if (c) {
                        var d = $('<li comp-drag comp-rotate class="comp-resize comp-rotate inside" id="inside_' + c.id + '" num="' + a.num + '" ctype="' + a.type + '"></li>');
                        3 != ("" + a.type).charAt(0) && 1 != ("" + a.type).charAt(0) && d.attr("comp-resize", ""), "p" == ("" + a.type).charAt(0) && d.removeAttr("comp-rotate"), 1 == ("" + a.type).charAt(0) && d.removeAttr("comp-drag"), 2 == ("" + a.type).charAt(0) && d.addClass("wsite-text"), 4 == ("" + a.type).charAt(0) && (a.properties.imgStyle && $(c).css(a.properties.imgStyle), d.addClass("wsite-image")), 5 == ("" + a.type).charAt(0) && d.addClass("wsite-input"), 6 == ("" + a.type).charAt(0) && d.addClass("wsite-button"), 8 == ("" + a.type).charAt(0) && d.addClass("wsite-button"), "v" == ("" + a.type).charAt(0) && d.addClass("wsite-video"), d.mouseenter(function() {
                            $(this).addClass("inside-hover")
                        }), d.mouseleave(function() {
                            $(this).removeClass("inside-hover")
                        });
                        var e = $('<div class="element-box">').append($('<div class="element-box-contents">').append(c));
                        return d.append(e), 5 != ("" + a.type).charAt(0) && 6 != ("" + a.type).charAt(0) || "edit" != b || $(c).before($('<div class="element" style="position: absolute; height: 100%; width: 100%;">')), a.css && (d.css({
                            width: 320 - parseInt(a.css.left)
                        }), d.css({
                            width: a.css.width,
                            height: a.css.height,
                            left: a.css.left,
                            top: a.css.top,
                            zIndex: a.css.zIndex,
                            bottom: a.css.bottom,
                            transform: a.css.transform
                        }), e.css(a.css).css({
                            width: "100%",
                            height: "100%",
                            transform: "none"
                        }), e.children(".element-box-contents").css({
                            width: "100%",
                            height: "100%"
                        }), 4 != ("" + a.type).charAt(0) && "p" != ("" + a.type).charAt(0) && $(c).css({
                            width: a.css.width,
                            height: a.css.height
                        })), d
                    }
                }

                function c(a) {
                    for (var b = 0; b < a.length - 1; b++)
                        for (var c = b + 1; c < a.length; c++)
                            if (parseInt(a[b].css.zIndex, 10) > parseInt(a[c].css.zIndex, 10)) {
                                var d = a[b];
                                a[b] = a[c], a[c] = d
                            }
                    for (var e = 0; e < a.length; e++) a[e].css.zIndex = e + 1 + "";
                    return a
                }

                function d(a, d, e) {
                    d = d.find(".edit_area").css({
                        overflow: "hidden"
                    });
                    var f, g = a.elements;
                    if (g)
                        for (g = c(g), f = 0; f < g.length; f++)
                            if (3 == g[f].type) {
                                var h = i[("" + g[f].type).charAt(0)](g[f]);
                                "edit" == e && j[("" + g[f].type).charAt(0)] && j[("" + g[f].type).charAt(0)](h, g[f])
                            } else {
                                var m = b(g[f], e);
                                if (!m) continue;
                                d.append(m);
                                for (var n = 0; n < l.length; n++) l[n](m, g[f]);
                                k[("" + g[f].type).charAt(0)] && k[("" + g[f].type).charAt(0)](m, g[f]), "edit" == e && j[("" + g[f].type).charAt(0)] && j[("" + g[f].type).charAt(0)](m, g[f])
                            }
                }

                function e() {
                    return j
                }

                function f() {
                    return i
                }

                function g(a) {
                    l.push(a)
                }

                function h() {
                    return l
                }
                var i = {},
                    j = {},
                    k = {},
                    l = [],
                    m = containerWidth = 320,
                    n = containerHeight = 486,
                    o = 1,
                    q = 1,
                    r = {
                        getComponents: f,
                        getEventHandlers: e,
                        addComponent: a(i),
                        bindEditEvent: a(j),
                        bindAfterRenderEvent: a(k),
                        addInterceptor: g,
                        getInterceptors: h,
                        wrapComp: b,
                        mode: "view",
                        parse: function(a) {
                            var b = $('<div class="edit_wrapper"><ul id="edit_area' + a.def.id + '" comp-droppable paste-element class="edit_area weebly-content-area weebly-area-active"></div>'),
                                c = this.mode = a.mode;
                            this.def = a.def, "view" == c && p++;
                            var e = $(a.appendTo);
                            return containerWidth = e.width(), containerHeight = e.height(), o = m / containerWidth, q = n / containerHeight, d(a.def, b.appendTo($(a.appendTo)), c)
                        }
                    };
                return r
            });
            d.addInterceptor(function(a, b) {
                function c(a, b, c) {
                    a.css("animation", b + " " + c.duration + "s ease " + c.delay + "s " + (c.countNum ? c.countNum : "")), "view" == d.mode ? (c.count && a.css("animation-iteration-count", "infinite"), a.css("animation-fill-mode", "both")) : (a.css("animation-iteration-count", "1"), a.css("animation-fill-mode", "backwards")), c.linear && a.css("animation-timing-function", "linear")
                }
                if (b.properties && b.properties.anim) {
                    var e = b.properties.anim,
                        f = $(".element-box", a),
                        g = "";
                    0 === e.type && (g = "fadeIn"), 1 === e.type && (0 === e.direction && (g = "fadeInLeft"), 1 === e.direction && (g = "fadeInDown"), 2 === e.direction && (g = "fadeInRight"), 3 === e.direction && (g = "fadeInUp")), 6 === e.type && (g = "wobble"), 5 === e.type && (g = "rubberBand"), 7 === e.type && (g = "rotateIn"), 8 === e.type && (g = "flip"), 9 === e.type && (g = "swing"), 2 === e.type && (0 === e.direction && (g = "bounceInLeft"), 1 === e.direction && (g = "bounceInDown"), 2 === e.direction && (g = "bounceInRight"), 3 === e.direction && (g = "bounceInUp")), 3 === e.type && (g = "bounceIn"), 4 === e.type && (g = "zoomIn"), 10 === e.type && (g = "fadeOut"), 11 === e.type && (g = "flipOutY"), 12 === e.type && (g = "rollIn"), 13 === e.type && (g = "lightSpeedIn"), b.properties.anim.trigger ? a.click(function() {
                        c(f, g, b.properties.anim)
                    }) : c(f, g, b.properties.anim)
                }
            }), d.addComponent("1", function(a) {
                var b = document.createElement("div");
                if (b.id = a.id, b.setAttribute("class", "element comp_title"), a.content && (b.textContent = a.content), a.css) {
                    var c, d = a.css;
                    for (c in d) b.style[c] = d[c]
                }
                if (a.properties.labels)
                    for (var e = a.properties.labels, f = 0; f < e.length; f++) $('<a class = "label_content" style = "display: inline-block;">').appendTo($(b)).html(e[f].title).css(e[f].color).css("width", 100 / e.length + "%");
                return b
            }), d.addComponent("2", function(a) {
                var b = document.createElement("div");
                return b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_paragraph editable-text"), a.content && (b.innerHTML = a.content), b.style.cursor = "default", b
            }), d.addComponent("3", function(a) {
                var b = document.getElementsByClassName("edit_area")[0];
                return "view" == d.mode && (b = document.getElementById("edit_area" + d.def.id)), b = $(b).parent()[0], a.properties.bgColor && (b.style.backgroundColor = a.properties.bgColor), a.properties.imgSrc && (b.style.backgroundImage = /^http.*/.test(a.properties.imgSrc) ? "url(" + a.properties.imgSrc + ")" : "url(" + ((a.properties.imgSrc.indexOf('syspic/') >=0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + "" + a.properties.imgSrc + ")", b.style.backgroundOrigin = "element content-box", b.style.backgroundSize = "cover", b.style.backgroundPosition = "50% 50%"), b
            }), d.addComponent("4", function(a) {
                var b = document.createElement("img");
                return b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_image editable-image"), b.src = /^http.*/.test(a.properties.src) ? a.properties.src : ((a.properties.src.indexOf('syspic/') >=0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + a.properties.src, b
            }), d.addComponent("v", function(a) {
                var b = document.createElement("a");
                return b.setAttribute("class", "element video_area"), b.id = a.id, b.setAttribute("ctype", a.type), a.properties.src && b.setAttribute("videourl", a.properties.src), b
            }), d.addComponent("5", function(a) {
                var b = document.createElement("textarea");
                return b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_input editable-text"), a.properties.required && b.setAttribute("required", a.properties.required), a.properties.placeholder && b.setAttribute("placeholder", a.properties.placeholder), b.setAttribute("name", "eq[f_" + a.id + "]"), b.style.width = "100%", b
            }), d.addComponent("p", function(a) {
                if (a.properties && a.properties.children) {
                    var b = 320,
                        d = 160,
                        e = a.css.width || b,
                        f = a.css.height || d,
                        g = $('<div id="' + a.id + '" class="slide element" ctype="' + a.type + '"></div>'),
                        h = $("<ul>").appendTo(g),
                        i = $('<div class="dot">').appendTo(g);
                    for (var j in a.properties.children) {
                        var k = c(a.properties.children[j].width, a.properties.children[j].height, e, f),
                            l = $('<img data-src="' + ((a.properties.children[j].src.indexOf('syspic/') >=0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + a.properties.children[j].src + '" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC">');
                        l.css({
                            width: k.width,
                            height: k.height
                        });
                        var m = $("<li>").css({
                            lineHeight: f + "px"
                        });
                        m.append(l), h.append(m), i.append($("<span>"))
                    }
                    return INTERVAL_OBJ[a.id] && (clearInterval(INTERVAL_OBJ[a.id]), delete INTERVAL_OBJ[a.id]), g.attr("length", a.properties.children.length).attr("autoscroll", a.properties.autoPlay).attr("interval", a.properties.interval), g.swipeSlide({
                        autoSwipe: a.properties.autoPlay,
                        continuousScroll: !0,
                        speed: a.properties.interval,
                        transitionType: "cubic-bezier(0.22, 0.69, 0.72, 0.88)",
                        lazyLoad: !0,
                        width: e
                    }, function(b, c) {
                        i.children().eq(b).addClass("cur").siblings().removeClass("cur"), c && (INTERVAL_OBJ[a.id] = c)
                    }), g.get(0)
                }
            }), d.addComponent("6", function(a) {
                var b = document.createElement("button");
                if (b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_button editable-text"), a.properties.title) {
                    var c = a.properties.title.replace(/ /g, "&nbsp;");
                    b.innerHTML = c
                }
                return b.style.width = "100%", b
            }), d.addComponent("8", function(a) {
                var b = document.createElement("a");
                if (b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_anchor editable-text"), a.properties.title) {
                    var c = a.properties.title.replace(/ /g, "&nbsp;");
                    $(b).html(c), "view" == d.mode && $(b).attr("href", "tel:" + a.properties.number)
                }
                return b.style.cursor = "default", b.style.width = "100%", b
            }), d.addComponent("7", function(a) {
                var b = document.createElement("div");
                if (b.id = "map_" + a.id, b.setAttribute("class", "element comp_map_wrapper"), a.content && (b.textContent = a.content), a.css) {
                    var c, d = a.css;
                    for (c in d) b.style[c] = d[c]
                }
                return b.style.height = "250px", b
            }), d.bindAfterRenderEvent("1", function(a, b) {
                if (a = $("div", a)[0], "view" == d.mode && 1 == b.type) {
                    var c = b.properties.labels;
                    for (key in c)! function(b) {
                        $($(a).find(".label_content")[b]).on("click", function() {
                            pageScroll(c[b])
                        })
                    }(key)
                }
            }), d.bindAfterRenderEvent("8", function(a, b) {
                a = $("a", a)[0];
                var c = {
                    id: b.sceneId,
                    num: b.properties.number
                };
                if ("view" == d.mode) {
                    var e = function() {
                        $.ajax({
                            cache: !0,
                            type: "POST",
                            url: PREFIX_S1_URL + "scenedata-links",
                            data: $.param(c),
                            async: !1,
                            error: function() {
                                alert("Connection error")
                            },
                            success: function() {}
                        })
                    };
                    a.addEventListener("click", e)
                }
            }), d.bindAfterRenderEvent("4", function(b, c) {
                "view" == d.mode && c.properties.url && $(b).click(function() {
                    {
                        var b = c.properties.url;
                        isNaN(b) ? a.open(b) : pageScroll(b)
                    }
                })
            }), d.bindAfterRenderEvent("v", function(a, b) {
                "view" == d.mode && $(a).click(function() {
                    $(a).hide(), $("#audio_btn").hasClass("video_exist") && ($("#audio_btn").hide(), $("#media")[0].pause()), $('<div class="video_mask" id="mask_' + b.id + '"></div>').appendTo($(a).closest(".m-img")), $('<a class = "close_mask" id="close_' + b.id + '"></a>').appendTo($(a).closest(".m-img")), $(b.properties.src).appendTo($("#mask_" + b.id)).attr("style", "position: absolute;top:0; min-height: 45%; max-height: 100%; top: 20%;").attr("width", "100%").removeAttr("height"), $("#close_" + b.id).bind("click", function() {
                        $(a).show(), $("#mask_" + b.id).remove(), $("#close_" + b.id).remove(), $("#audio_btn").hasClass("video_exist") && $("#audio_btn").show(function() {
                            $(this).hasClass("off") || $("#media")[0].play()
                        })
                    })
                })
            }), d.bindAfterRenderEvent("2", function(a) {
                for (var b = $(a).find("a[data]"), c = 0; c < b.length; c++)
                    if (b[c] && "view" == d.mode) {
                        $(b[c]).css("color", "#428bca").css("cursor", "pointer");
                        var e = $(b[c]).attr("data");
                        ! function(a) {
                            $(b[c]).click(function() {
                                pageScroll(a)
                            })
                        }(e)
                    }
            }), d.bindAfterRenderEvent("6", function(a) {
                if (a = $("button", a)[0], "view" == d.mode) {
                    var b = function(b, c) {
                            var d = !0,
                                e = $(a).parents("ul"),
                                f = {};
                            $("textarea", e).each(function() {
                                if (d) {
                                    if ("required" == $(this).attr("required") && "" == $(this).val().trim()) return alert($(this).attr("placeholder") + "为必填项"), void(d = !1);
                                    if ("502" == $(this).attr("ctype")) {
                                        var a = new RegExp(/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/g);
                                        if (!a.test($(this).val())) return alert("手机号码格式错误"), void(d = !1)
                                    }
                                    if ("503" == $(this).attr("ctype")) {
                                        var b = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g);
                                        if (!b.test($(this).val())) return alert("邮箱格式错误"), void(d = !1)
                                    }
                                    f[$(this).attr("name")] = $(this).val()
                                }
                            }), d && $.ajax({
                                cache: !0,
                                type: "POST",
                                url: JSON_URL + "?c=scenedata&a=add&id=" + c,
                                data: $.param(f),
                                async: !1,
                                error: function() {
                                    alert("Connection error")
                                },
                                success: function() {
                                    $(b).unbind("click").click(function() {
                                        alert("请不要重复提交")
                                    }), alert("提交成功")
                                }
                            })
                        },
                        c = d.def.sceneId;
                    $(a).bind("click", function() {
                        b(this, c)
                    })
                }
            }), d.bindAfterRenderEvent("7", function(a, b) {
                var c = new BMap.Map("map_" + b.id, {
                        enableMapClick: !1
                    }),
                    d = new BMap.Point(b.properties.x, b.properties.y),
                    e = new BMap.Marker(d);
                c.addOverlay(e);
                var f = new BMap.Label(b.properties.markTitle, {
                    offset: new BMap.Size(20, -10)
                });
                e.setLabel(f), c.disableDoubleClickZoom(), c.centerAndZoom(d, 15)
            })
        }(a.eqShow);
    var p = 0,
        q = !1;
    b.module("app", ["ngRoute", "home", "sample", "main", "reg", "scene", "my", "data", "error", "usercenter", "ui.bootstrap", "ui.grid", "ui.grid.selection", "ngSanitize", "ui.select", "services.i18nNotifications", "services.httpRequestTracker", "services.sample", "security", "app.upload", "templates-app", "templates-common", "ui.sortable", "I18N.MESSAGES", "app.directives.notification"]), b.module("app").config(["$routeProvider", "$locationProvider", "securityAuthorizationProvider", "uiSelectConfig",
            function(a, b, c, d) {
                d.theme = "bootstrap", a.when("/home", {
                    templateUrl: "main/main.tpl.html",
                    controller: "MainCtrl"
                }).when("/home/:id", {
                    templateUrl: "main/main.tpl.html",
                    controller: "MainCtrl"
                }).when("/reg", {
                    templateUrl: "reg/reg.tpl.html",
                    controller: "RegCtrl"
                }).when("/otherRegister", {
                    templateUrl: "common/security/register/otherRegister.tpl.html"
                }).when("/agreement", {
                    templateUrl: "reg/agreement.tpl.html"
                }).when("/about", {
                    templateUrl: "about.tpl.html"
                }).when("/error/:codeid", {
                    templateUrl: "error/error.tpl.html",
                    controller: "ErrorCtrl"
                }).when("/sample", {
                    templateUrl: "sample/sample.tpl.html",
                    controller: "SampleCtrl"
                }).when("/main", {
                    templateUrl: "main/main.tpl.html",
                    controller: "MainCtrl",
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/main/spread", {
                    templateUrl: "main/spread.tpl.html",
                    controller: "SpreadCtrl",
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/main/customer", {
                    templateUrl: "main/customer.tpl.html",
                    controller: "CustomerCtrl",
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/main/spread/:sceneId", {
                    templateUrl: "main/spreadDetail.tpl.html",
                    controller: "SpreadDetailCtrl",
                    reloadOnSearch: !0,
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/usercenter/:id", {
                    templateUrl: "usercenter/usercenter.tpl.html",
                    controller: "UserCenterCtrl",
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/scene", {
                    templateUrl: "scene/scene.tpl.html",
                    controller: "SceneCtrl",
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/scene/create/:sceneId", {
                    templateUrl: "scene/create.tpl.html",
                    controller: "CreateSceneCtrl",
                    reloadOnSearch: !1,
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/my/scene/:sceneId", {
                    templateUrl: "my/myscene.tpl.html",
                    controller: "MySceneCtrl",
                    reloadOnSearch: !1,
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/my/sceneSetting/:sceneId", {
                    templateUrl: "my/sceneSetting.tpl.html",
                    controller: "SceneSettingCtrl",
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).otherwise({
                    redirectTo: "/main"
                })
            }
        ]), b.module("app").run(["security", "$rootScope",
            function(a, b) {
                b.CLIENT_CDN = CLIENT_CDN, a.requestCurrentUser()
            }
        ]), b.module("app").run(["$route", "$rootScope", "$location",
            function(a, b, c) {
                var d = c.path;
                c.path = function(e, f) {
                    if (f === !1) var g = a.current,
                        h = b.$on("$locationChangeSuccess", function() {
                            a.current = g, h()
                        });
                    return d.apply(c, [e])
                }
            }
        ]), b.module("app").controller("AppCtrl", ["SpreadService", "$window", "$scope", "$rootScope", "$location", "$modal", "security", "sceneService", "$routeParams", "$timeout", "i18nNotifications",
            function(a, b, c, d, e, f, g, h, i, j, k) {
                c.notifications = k, c.removeNotification = function(a) {
                    k.remove(a)
                }, c.weiChatCode = e.absUrl().split("&")[0].split("=")[1], c.$on("$locationChangeStart", function() {
                    if ("/home/login" != e.path() || g.currentUser ? "/home/register" != e.path() || g.currentUser || g.showRegister() : g.showLogin(), e.search().resetToken) {
                        var a = e.search().resetToken;
                        g.requestResetPassword(a)
                    }
                });
                var l = new RegExp("token"),
                    m = new RegExp("uid"),
                    n = b.location.hash;
                if (m.test(n)) {
                    var o = n.split("=");
                    c.weiboAccessToken = o[1].split("&")[0], c.weiboRemindIn = o[2].split("&")[0], c.weiboExpires = o[3].split("&")[0], c.weiboUId = o[4].split("&")[0]
                } else l.test(n) && (c.accessToken = n.split("&")[0].split("=")[1], c.expiresIn = n.split("&")[1].split("=")[1]);
                c.openLogin = function() {
                    e.path("/home/login", !1)
                }, c.openRegister = function() {
                    e.path("/home/register", !1)
                }, c.isAuthenticated = g.isAuthenticated, c.$watch(function() {
                    return g.currentUser
                }, function(b) {
                    b && (c.user = b, d.user = b, c.isEditor = g.isEditor(), d.isEditor = g.isEditor(), c.isAdvancedUser = g.isAdvancedUser(), d.isAdvancedUser = g.isAdvancedUser(), c.isVendorUser = g.isVendorUser(), d.isVendorUser = g.isVendorUser(), a.getActivityDetail("001").then(function(a) {
                        var b = a.data.obj;
                        if (b) {
                            d.sendXd = b;
                            var c = (new Date).getTime();
                            c >= b.startDate && c <= b.endDate && (d.sendXd.state = 1)
                        }
                    }))
                }, !0), c.openReg = function() {
                    f.open({
                        windowClass: "request_contain",
                        templateUrl: "usercenter/request_reg.tpl.html",
                        controller: "UsercenterrequestCtrl",
                        resolve: {}
                    }).result.then(function() {}, function() {})
                }, c.login = function() {
                    g.showLogin()
                }, c.register = function() {
                    g.showRegister()
                }, c.showToolBar = function() {
                    return e.$$path.indexOf("/scene/create") >= 0 ? !1 : !0
                }, c.showPanel = function() {
                    $("#helpPanel").stop().animate({
                        right: "0"
                    }, 500)
                }, c.hidePanel = function() {
                    $("#helpPanel").stop().animate({
                        right: "-120"
                    }, 500)
                }, c.suggestionUrl = "javascript:void(0);", c.feedbackUrl = "javascript:void(0);", c.qqChatUrl = "http://shang.qq.com/wpa/qunwpa?idkey=4a2d63670009360b878aa9a1e1437ef4caec132f74a0e2c4df4a686168cc73dc", c.helpUrl = "javascript:void(0);", c.createSkillUrl = "javascript:void(0);"
            }
        ]).filter("fixnum", function() {
            return function(a) {
                var b = a;
                return a >= 1e4 && 1e8 > a ? b = (a / 1e4).toFixed(1) + "万" : a >= 1e8 && (b = (a / 1e8).toFixed(1) + "亿"), b
            }
        }), b.module("data.associate", []), b.module("data.associate").controller("AssociateFieldCtrl", ["$scope", "dataService",
            function(a, b) {
                a.staticFileds = [{
                    id: "name",
                    name: "姓名"
                }, {
                    id: "mobile",
                    name: "手机"
                }, {
                    id: "email",
                    name: "邮箱"
                }, {
                    id: "sex",
                    name: "性别"
                }, {
                    id: "company",
                    name: "公司"
                }, {
                    id: "job",
                    name: "职位"
                }, {
                    id: "address",
                    name: "地址"
                }, {
                    id: "tel",
                    name: "电话"
                }, {
                    id: "website",
                    name: "个人网站"
                }, {
                    id: "qq",
                    name: "QQ"
                }, {
                    id: "weixin",
                    name: "微信"
                }, {
                    id: "remark",
                    name: "其它"
                }], a.associateMap = [], a.person = {}, a.selectScene = function(c) {
                    b.getSceneField(c).then(function(b) {
                        a.fields = b.data.list
                    })
                }, a.associate = function(b) {
                    for (var c = 0; c < a.associateMap.length; c++) c != b && a.associateMap[c].id == a.associateMap[b].id && (a.associateMap[c] = null)
                }, a.confirm = function() {
                    for (var c = {}, d = 0, e = a.associateMap; d < e.length; d++) e[d] && (c[e[d].id] = a.fields[d].id);
                    b.mergeSceneData(a.person.selected.ID, c).then(function() {
                        a.$close()
                    }, function() {
                        a.$dismiss()
                    })
                }, a.cancel = function() {
                    a.$dismiss()
                }, b.getPremergeScenes().then(function(b) {
                    a.PremergeScenes = b.data.list
                })
            }
        ]).filter("propsFilter", function() {
            return function(a, c) {
                var d = [];
                return b.isArray(a) ? a.forEach(function(a) {
                    for (var b = !1, e = Object.keys(c), f = 0; f < e.length; f++) {
                        var g = e[f],
                            h = c[g].toLowerCase();
                        if (-1 !== a[g].toString().toLowerCase().indexOf(h)) {
                            b = !0;
                            break
                        }
                    }
                    b && d.push(a)
                }) : d = a, d
            }
        }), b.module("data", ["data.associate"]), b.module("data", ["services.usercenter"]), b.module("data").controller("editDataCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", "dataService", "id",
            function(a, b, c, d, e, f, g, h, i, j, k) {
                b.PREFIX_FILE_HOST = PREFIX_FILE_HOST, b.PREFIX_SERVER_HOST = PREFIX_URL, b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.sexOptions = [{
                    id: 0,
                    name: "请选择性别"
                }, {
                    id: 1,
                    name: "男"
                }, {
                    id: 2,
                    name: "女"
                }], b.sex = b.sexOptions[0];
                var l = {};
                b.getDataDetail = function(a) {
                    b.dataId = a, j.getDataDetail(a).then(function(a) {
                        b.dataDetail = a.data.obj, l = a.data.obj;
                        var c = b.dataDetail.email,
                            d = b.dataDetail.sex,
                            e = b.dataDetail.mobile,
                            f = b.dataDetail.tel;
                        b.formEmails = c ? c.split(",") : [""], b.formMobiles = e ? e.split(",") : [""], b.formTels = f ? f.split(",") : [""], d && (b.sex = "男" == d ? b.sexOptions[1] : b.sexOptions[2])
                    })
                }, b.getDataDetail(k), b.updateData = function(a, c) {
                    var d = a.name,
                        e = {};
                    if ("email" == d || "mobile" == d || "tel" == d) {
                        e[d] = "";
                        var f, g = [];
                        for (f = 0; f < c.length; f++) c[f] && g.push(c[f]);
                        for (f = 0; f < g.length - 1; f++) e[d] += g[f] + ",";
                        e[d] += g[f]
                    } else e[d] = b.dataDetail[d];
                    l[d] = e[d]
                }, b.updateSex = function(a) {
                    var c = {};
                    c.id = b.dataId, c.sex = 0 !== a.id ? a.name : "", l.sex = c.sex
                }, b.formEmails = [""], b.formMobiles = [""], b.formTels = [""], b.removeInputs = function(a, c, d) {
                    if (d.length > 1) {
                        if (!d[a]) return void d.splice(a, 1);
                        d.splice(a, 1), b.updateData({
                            name: c
                        }, d)
                    } else 1 === d.length && "" !== d[0] && (d[a] = "", b.updateData({
                        name: c
                    }, d))
                }, b.addInputs = function(a) {
                    a.push("")
                }, b.saveData = function() {
                    b.$close(l), j.saveData($.param(l))
                }
            }
        ]), b.module("confirm-dialog", []).controller("ConfirmDialogCtrl", ["$scope", "confirmObj",
            function(a, b) {
                a.confirmObj = b, a.ok = function() {
                    a.$close()
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("message-dialog", []).controller("MessageDialogCtrl", ["$scope", "msgObj",
            function(a, b) {
                a.msgObj = b, a.close = function() {
                    a.$close()
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("error", ["services.sample"]), b.module("error").controller("ErrorCtrl", ["$rootScope", "$http", "$scope", "$timeout", "security", "$window", "sampleService",
            function() {}
        ]), b.module("home", ["services.sample", "app.directives.addelement", "services.scene", "app.directives.qrcode", "app.directives.loading"]), b.module("home").controller("HomeCtrl", ["$rootScope", "$http", "$scope", "$timeout", "security", "$window", "sampleService", "sceneService", "$routeParams", "$route", "$location",
            function(a, b, c, d, e, f, g, h, i, j, k) {
                c.showCode = !1, c.isAuthenticated = e.isAuthenticated, c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.PREFIX_SERVER_HOST = PREFIX_URL, c.scene || (c.scene = {}), c.weiChatCode && e.weiChatLogin(c.weiChatCode).then(function(a) {
                    200 == a.data.code && k.path("main")
                }), c.typeindex = "all", c.pageSize = 9, c.pageNo = 1, c.getHomes = function(a, b, d, e) {
                    c.typeindex = a, g.getSamples(b, d, e).then(function(a) {
                        c.homes = a.data.list
                    }, function() {})
                }, c.getSceneType = function() {
                    h.getSceneType().then(function(a) {
                        c.sceneTypes = a.data.list
                    })
                }, c.getSceneType(), c.getHomes("all", null, 1, 9);
                if (c.accessToken && c.expiresIn) {
                    var l = "https://graph.qq.com/oauth2.0/me?access_token=" + c.accessToken;
                    $.ajax({
                        type: "get",
                        url: l,
                        dataType: "jsonp",
                        jsonp: "jsoncallback",
                        jsonpCallback: "callback",
                        xhrFields: {
                            withCredentials: !0
                        },
                        success: function(a) {
                            c.openId = a.openid, c.appId = a.client_id;
                            var b = {
                                email: "",
                                password: "",
                                openId: c.openId,
                                accessToken: c.accessToken,
                                type: "qq",
                                expires: c.expiresIn
                            };
                            e.thirdPartLogin(b)
                        }
                    })
                }
                if (c.weiboAccessToken && c.weiboRemindIn && c.weiboExpires && c.weiboUId) {
                    var m = {
                        email: "",
                        password: "",
                        type: "weibo",
                        openId: c.weiboUId,
                        accessToken: c.weiboAccessToken,
                        expires: c.weiboExpires
                    };
                    e.thirdPartLogin(m)
                }
                c.getBannerStyle = function() {
                    return {
                        width: 255 * c.imgArr.length + "px"
                    }
                }, c.goLeft = function() {
                    $(".img_box").is(":animated") || $(".img_box").css("left").split("px")[0] >= 0 || $(".img_box").animate({
                        left: "+=255"
                    }, 1e3)
                }, c.goRight = function() {
                    $(".img_box").is(":animated") || parseInt($(".img_box").css("left").split("px")[0], 10) <= -($(".img_box").width() - 20 - 1e3) || $(".img_box").animate({
                        left: "-=255"
                    }, 1e3)
                }, d(function() {
                    $(".banner1").animate({
                        right: "0px"
                    }, 200)
                }, 700), d(function() {
                    $(".banner2").animate({
                        right: "0px"
                    }, 200)
                }, 1e3), d(function() {
                    $(".banner3").animate({
                        right: "0px"
                    }, 200, function() {
                        $(".banner_left").fadeIn(800)
                    })
                }, 1300), c.load2 = function() {
                    $("#eq_main").scroll(function() {
                        s = $("#eq_main").scrollTop(), s > 100 ? $(".scroll").css("display", "block") : $(".scroll").css("display", "none")
                    })
                }, c.getSamplesPV = function() {
                    g.getSamplesPV().then(function(a) {
                        c.SamplesPVs = a.data, c.dayTop = c.SamplesPVs.obj.dayTop, c.monthTop = c.SamplesPVs.obj.monthTop, c.weekTop = c.SamplesPVs.obj.weekTop, c.page = "month"
                    }, function() {})
                }
            }
        ]), b.module("main.data", ["app.directives.dataDraggable"]), b.module("main.data").controller("CustomerCtrl", ["$scope", "$route", "$location", "dataService", "$modal", "ModalService",
            function(a, b, c, d, e, f) {
                function g(b) {
                    b || (b = 1), d.getAllData(b).then(function(b) {
                        a.customerDatas = b.data.list, a.totalItems = b.data.map.count, a.currentPage = b.data.map.pageNo, a.toPage = ""
                    })
                }
                a.PREFIX_URL = PREFIX_URL, a.isActive = "customer", a.select = 0, a.staticFileds = [{
                    id: "name",
                    name: "姓名"
                }, {
                    id: "mobile",
                    name: "手机"
                }, {
                    id: "email",
                    name: "邮箱"
                }, {
                    id: "sex",
                    name: "性别"
                }, {
                    id: "company",
                    name: "公司"
                }, {
                    id: "job",
                    name: "职位"
                }, {
                    id: "address",
                    name: "地址"
                }, {
                    id: "tel",
                    name: "电话"
                }, {
                    id: "website",
                    name: "个人网站"
                }, {
                    id: "qq",
                    name: "QQ"
                }, {
                    id: "weixin",
                    name: "微信"
                }, {
                    id: "remark",
                    name: "其它"
                }], a.selectScene = function(b, c) {
                    a.selectedSceneId = b, d.getSceneField(b).then(function(b) {
                        a.fields = b.data.list, a.select = c, $(".list_attribute").html("拖拽到此处")
                    })
                }, a.clickScene = function() {
                    c.path("main")
                }, a.clickSpread = function() {
                    c.path("main/spread")
                }, a.clickCustomer = function() {
                    c.path("main/customer")
                }, a.editCustomer = function(b) {
                    a.getDataDetail(b.id), a.editData = !0
                }, a.removeCustomer = function(b) {
                    f.openConfirmDialog({
                        msg: "确定删除此条数据?"
                    }, function() {
                        d.deleteDataById(b.id).then(function() {
                            g(1 === a.customerDatas.length && a.currentPage > 1 ? a.currentPage - 1 : a.currentPage), i()
                        })
                    })
                }, a.addColor = function(b) {
                    a.trIndex = b
                }, a.removeColor = function() {
                    a.trIndex = -1
                }, a.totalItems = 0, a.currentPage = 0, a.toPage = "", a.pageChanged = function(b) {
                    return 1 > b || b > a.totalItems / 10 + 1 ? void alert("此页超出范围") : void g(b)
                }, a.editCustom = function(b, c) {
                    e.open({
                        windowClass: "addCustom",
                        templateUrl: "data/editData.tpl.html",
                        controller: "editDataCtrl",
                        resolve: {
                            id: function() {
                                return b.id
                            }
                        }
                    }).result.then(function(b) {
                        a.customerDatas[c].name = b.name, a.customerDatas[c].mobile = b.mobile
                    }, function() {})
                };
                var h = function() {
                        d.getProspectDataAccount().then(function(b) {
                            a.prospectDataAccount = b.data.obj
                        })
                    },
                    i = function() {
                        d.getAllDataCount().then(function(b) {
                            a.allDataCount = b.data.obj
                        })
                    };
                a.importDatas = function() {
                    d.getPremergeScenes().then(function(b) {
                        a.importDatas = b.data.list, b.data.list.length > 0 && a.selectScene(b.data.list[0].ID, 0)
                    })
                }, a.associateData = {};
                var j = !0;
                a.confirm = function() {
                    j ? jQuery.isEmptyObject(a.associateData, {}) ? (alert("请导入数据！"), j = !0) : (d.mergeSceneData(a.selectedSceneId, a.associateData).then(function() {
                        alert("你已成功导入客户！"), b.reload()
                    }, function() {}), j = !1) : alert("请不要重复提交！")
                }, a.importDatas(), h(), i(), g(0)
            }
        ]), b.module("main", ["services.mine", "services.data", "app.directives.pageTplTypes", "app.directives.addelement", "main.spread", "main.data", "main.spread.detail", "services.usercenter", "main.userGuide", "app.directives.qrcode", "services.i18nNotifications"]), b.module("main").controller("MainCtrl", ["$rootScope", "$scope", "$location", "security", "MineService", "dataService", "sceneService", "ModalService", "$modal", "usercenterService", "i18nNotifications",
            function(a, b, c, d, e, f, g, h, i, j, k) {
                b.PREFIX_URL = PREFIX_URL, b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.client_cdn = CLIENT_CDN, b.scene = {
                    type: {}
                }, b.pageSize = 12, b.showCloseStatus = [], b.showOpenStatus = [], b.isActive = "main", b.editScene = function(a) {
                    c.path("scene/create/" + a).search("pageId", 1)
                }, b.openScene = function(a, b) {
                    b ? g.openScene(a.id).then(function() {
                        a.status = 1, g.publishScene(a.id).then(function() {})
                    }) : g.closeScene(a.id).then(function() {
                        a.status = 2
                    })
                }, b.addColor = function(a) {
                    b.trIndex = a
                }, b.removeColor = function() {
                    b.trIndex = -1
                }, b.sceneSettings = function(a) {
                    c.path("my/sceneSetting/" + a)
                }, b.clickScene = function() {
                    c.path("main")
                }, b.clickSpread = function() {
                    c.path("main/spread")
                }, b.clickCustomer = function() {
                    c.path("main/customer")
                }, b.register = d.getRegisterInfo(), b.logout = function() {
                    d.logout()
                }, b.copyScene = function(a) {
                    h.openConfirmDialog({
                        msg: "确定复制此场景?"
                    }, function() {
                        g.copySceneById(a).then(function(a) {
                            c.path("scene/create/" + a.data.obj).search("pageId", 1)
                        })
                    })
                }, b.deleteScene = function(a) {
                    h.openConfirmDialog({
                        msg: "确定删除此场景?"
                    }, function() {
                        g.deleteSceneById(a).then(function() {
                            b.getMyScenes()
                        })
                    })
                }, b.getStyle = function(a) {
                    return {
                        "background-image": "url(" + ((a.indexOf('syspic/') >= 0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + a + ")"
                    }
                }, b.getMyScenes = function(a) {
                    e.getMyScenes(b.scene.type ? b.scene.type.value : "0", a, b.pageSize).then(function(a) {
                        a.data.list && a.data.list.length > 0 ? (b.myScenes = a.data.list, b.totalItems = a.data.map.count, b.currentPage = a.data.map.pageNo, b.allPageCount = a.data.map.count, b.toPage = "") : (b.myScenes = [], b.allPageCount = 0)
                    })
                }, b.pageChanged = function(a) {
                    return 1 > a || a > b.totalItems / 10 + 1 ? void alert("此页超出范围") : void b.getMyScenes(a)
                }, b.getTdStyle = function(a) {
                    var b = $(".header_table td:eq(" + a + ")").outerWidth();
                    return {
                        width: b + "px",
                        maxWidth: b + "px"
                    }
                };
                var l = function() {
                        f.getAllDataCount().then(function(a) {
                            b.allDataCount = a.data.obj
                        })
                    },
                    m = function() {
                        f.getAllSceneDataCount().then(function(a) {
                            b.allSceneDataCount = a.data.obj
                        })
                    };
                m(), b.getMyScenes(), l(), g.getSceneType().then(function(a) {
                    b.scene.types = a.data.list
                }), b.dataDetail = {};
                var n = function() {
                    f.getProspectDataAccount().then(function(a) {
                        b.prospectDataAccount = a.data.obj
                    })
                };
                n();
                var o = function() {
                    f.getAllPageView().then(function(a) {
                        b.allPageView = a.data.obj
                    })
                };
                o(), b.showDetail = function(a) {
                    c.path("my/scene/" + a)
                }, b.publishScene = function(a, b) {
                    b && b.stopPropagation(), g.publishScene(a.id).then(function(b) {
                        b.data.success && (a.publishTime = (new Date).getTime(), k.pushForCurrentRoute("scene.publish.success", "notify.success"))
                    })
                }, b.totalItems = 0, b.currentPage = 0, b.toPage = ""
            }
        ]), b.module("main.spread", ["app.directives.pieChart", "app.directives.numChangeAnim"]), b.module("main.spread").controller("SpreadCtrl", ["$scope", "$location", "MineService", "dataService",
            function(a, b, c, d) {
                a.isActive = "spread", a.clickScene = function() {
                    b.path("main")
                }, a.clickSpread = function() {
                    b.path("main/spread")
                }, a.clickCustomer = function() {
                    b.path("main/customer")
                }, a.addColor = function(b) {
                    a.trIndex = b
                }, a.removeColor = function() {
                    a.trIndex = -1
                }, a.getMyScenes = function(d) {
                    c.getMyScenes(null, d, 10).then(function(c) {
                        c.data.list && c.data.list.length > 0 && (a.allPageCount = c.data.map.count, (!c.data.list || c.data.list.length <= 0) && b.path("scene"), a.spreadDatas = c.data.list, a.totalItems = c.data.map.count, a.currentPage = c.data.map.pageNo, a.toPage = "")
                    })
                }, a.pageChanged = function(b) {
                    return 1 > b || b > a.totalItems / 10 + 1 ? void alert("此页超出范围") : void a.getMyScenes(b)
                }, a.viewDetail = function(a) {
                    b.path("/main/spread/" + a.id)
                }, d.getOpenCount().then(function(b) {
                    a.openCount = b.data.obj
                }), d.getAllPageView().then(function(b) {
                    a.allPageView = b.data.obj, a.allPageViewData = [{
                        value: b.data.obj,
                        color: "#08a1ef",
                        highlight: "#78cbf5",
                        label: "场景展示"
                    }], d.getAllSceneDataCount().then(function(b) {
                        a.allSceneDataCount = b.data.obj, a.dataRatio = 0 == a.allPageView ? 0 : 100 * (a.allSceneDataCount / a.allPageView).toFixed(2), a.allSceneDataCountData = [{
                            value: a.allSceneDataCount,
                            color: "#9ad64b",
                            highlight: "#c3f286",
                            label: "收集数据"
                        }], a.dataConversionRateData = [{
                            value: (a.allSceneDataCount / a.allPageView).toFixed(2),
                            color: "#68dcc7",
                            highlight: "#92f5e3",
                            label: "转化率"
                        }]
                    })
                }), a.totalItems = 0, a.currentPage = 0, a.toPage = "", a.getMyScenes()
            }
        ]), b.module("main.spread.detail", ["services.spread", "app.directives.lineChart", "app.directives.pieChart", "app.directives.numChangeAnim"]), b.module("main.spread.detail").controller("SpreadDetailCtrl", ["$scope", "$location", "$routeParams", "sceneService", "SpreadService",
            function(a, b, c, d, e) {
                a.PREFIX_FILE_HOST = PREFIX_FILE_HOST, a.PREFIX_CLIENT_HOST = PREFIX_HOST, a.PREFIX_SERVER_HOST = PREFIX_URL;
                var f = c.sceneId;
                a.spreadViewGridOptions = {
                    headerRowHeight: 50,
                    rowHeight: 50,
                    enableScrollbars: !1,
                    enableColumnMenu: !1,
                    disableColumnMenu: !0
                }, a.spreadViewGridOptions.columnDefs = [{
                    name: "STAT_DATE",
                    displayName: "统计时间"
                }, {
                    name: "SHOW",
                    displayName: "展示次数"
                }, {
                    name: "DATA",
                    displayName: "收集数据"
                }], a.spreadMobileGridOptions = {
                    headerRowHeight: 50,
                    rowHeight: 50,
                    enableScrollbars: !1,
                    enableColumnMenu: !1,
                    disableColumnMenu: !0
                }, a.spreadMobileGridOptions.columnDefs = [{
                    name: "STAT_DATE",
                    displayName: "统计时间"
                }, {
                    name: "S_WX_TIMELINE",
                    displayName: "朋友圈"
                }, {
                    name: "S_WX_GROUP",
                    displayName: "微信群"
                }, {
                    name: "S_WX_SINGLE",
                    displayName: "微信朋友"
                }], a.spreadClickGridOptions = {
                    headerRowHeight: 50,
                    rowHeight: 50,
                    enableScrollbars: !1,
                    enableColumnMenu: !1,
                    disableColumnMenu: !0
                }, a.spreadClickGridOptions.columnDefs = [{
                    name: "STAT_DATE",
                    displayName: "统计时间"
                }, {
                    name: "LINK",
                    displayName: "链接点击"
                }, {
                    name: "TEL",
                    displayName: "电话直拨点击"
                }];
                var g = function() {
                        d.getSceneDetail(f).then(function(b) {
                            a.scene = b.data.obj, a.url = VIEW_URL + "v-" + a.scene.code, a.getLast7dayStats()
                        }, function() {})
                    },
                    h = function(b, c) {
                        e.getDataBySceneId(f, b, c, 30, 0).then(function(b) {
                            a.pageView = 0, a.stats = b.data.list, a.spreadViewGridOptions.data = a.stats, a.spreadMobileGridOptions.data = a.stats, a.spreadClickGridOptions.data = a.stats, a.viewLineChartData = {
                                labels: [],
                                datasets: [{
                                    label: "1",
                                    fillColor: "rgba(220,220,220,0.2)",
                                    strokeColor: "rgba(220,220,220,1)",
                                    pointColor: "rgba(220,220,220,1)",
                                    pointStrokeColor: "#fff",
                                    pointHighlightFill: "#fff",
                                    pointHighlightStroke: "rgba(220,220,220,1)",
                                    data: []
                                }]
                            }, a.dataLineChartData = {
                                labels: [],
                                datasets: [{
                                    label: "2",
                                    fillColor: "rgba(220,220,220,0.2)",
                                    strokeColor: "rgba(220,220,220,1)",
                                    pointColor: "rgba(220,220,220,1)",
                                    pointStrokeColor: "#fff",
                                    pointHighlightFill: "#fff",
                                    pointHighlightStroke: "rgba(220,220,220,1)",
                                    data: []
                                }]
                            };
                            var c = 0;
                            cntTimeline = 0, cntWeixin = 0, cntWeixinGroup = 0, cntOther = 0;
                            for (var d = 0; d < a.stats.length; d++) a.viewLineChartData.labels.push(a.stats[d].STAT_DATE), a.viewLineChartData.datasets[0].data.push(a.stats[d].SHOW), a.dataLineChartData.labels.push(a.stats[d].STAT_DATE), a.dataLineChartData.datasets[0].data.push(a.stats[d].DATA), a.pageView += a.stats[d].SHOW, c += a.stats[d].S_MOBILE, cntTimeline += a.stats[d].S_WX_TIMELINE, cntWeixin += a.stats[d].S_WX_SINGLE, cntWeixinGroup += a.stats[d].S_WX_GROUP;
                            a.viewLineChartData.labels && 1 == a.viewLineChartData.labels.length && (a.viewLineChartData.labels.unshift("更早"), a.viewLineChartData.datasets[0].data.unshift(0)), a.dataLineChartData.labels && 1 == a.dataLineChartData.labels.length && (a.dataLineChartData.labels.unshift("更早"), a.dataLineChartData.datasets[0].data.unshift(0)), cntOther = c - cntTimeline - cntWeixin - cntWeixinGroup, a.timelineData = cntTimeline, a.weixinData = cntWeixin, a.weixinGroupData = cntWeixinGroup, $(".myGrid1").height(50 * (a.stats.length + 1) + 1), $(".myGrid1 .ui-grid-viewport").height(50 * a.stats.length + 1)
                        }, function() {})
                    },
                    i = function(a) {
                        var b = new Date;
                        return b.setDate(b.getDate() + a), b.setHours(0), b.setMinutes(0), b.setSeconds(0), b.setMilliseconds(0), b.getTime()
                    };
                a.getAllStats = function() {
                    h()
                }, a.getLastdayStats = function() {
                    h(i(-1), i(0))
                }, a.getLast7dayStats = function() {
                    h(i(-6), i(1))
                }, a.getLast30dayStats = function() {
                    h(i(-29), i(0))
                }, a.clickScene = function() {
                    b.path("main")
                }, a.clickSpread = function() {
                    b.path("main/spread")
                }, a.clickCustomer = function() {
                    b.path("main/customer")
                }, g()
            }
        ]),
        function() {
            b.module("main.userGuide", []).controller("userGuideCtrl", ["$rootScope", "$scope",
                function(b, c) {
                    if (a.localStorage) {
                        var d = JSON.parse(localStorage.getItem("loginInfo"));
                        d && d[b.user.id] ? c.firstLogin = !1 : (c.firstLogin = !0, d = d || {}, d[b.user.id] = 1, localStorage.setItem("loginInfo", JSON.stringify(d)))
                    }
                }
            ])
        }(), b.module("my", ["my.scene", "my.scenesetting"]), b.module("my.scene", ["services.scene", "services.mine", "services.data", "scene.create.console", "app.directives.addelement", "services.usercenter", "app.directives.qrcode"]), b.module("my.scene").controller("MySceneCtrl", ["$anchorScroll", "$route", "$location", "$rootScope", "$window", "$scope", "$routeParams", "sceneService", "MineService", "dataService", "$sce", "$modal", "usercenterService", "security", "pageTplService",
            function(b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
                function p(a, b, c) {
                    k.getDataBySceneId(a, b, c).then(function(a) {
                        g.dataHeader = a.data.list.shift(), g.dataList = a.data.list, g.totalItems = a.data.map.count, g.currentPage = a.data.map.pageNo
                    })
                }
                g.loading = !1, g.url = "", g.sceneId = h.sceneId, g.isVendorUser = e.isVendorUser, g.isAllowToAccessLastPageSetting = o.isAllowToAccess(2);
                var q = 0;
                g.PREFIX_FILE_HOST = PREFIX_FILE_HOST, g.PREFIX_URL = PREFIX_URL, g.alwaysOpen = !0;
                if (g.scene || (g.scene = {}), document.getElementById("sharescript")) {
                    $("#sharescript").remove();
                    var r = document.getElementsByTagName("head")[0],
                        s = document.createElement("script");
                    s.id = "sharescript", s.src = "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=" + ~(-new Date / 36e5), r.appendChild(s)
                } else {
                    var r = document.getElementsByTagName("head")[0],
                        s = document.createElement("script");
                    s.id = "sharescript", s.src = "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=" + ~(-new Date / 36e5), r.appendChild(s)
                }
                g.getSceneDetail = function() {
                    i.getSceneDetail(g.sceneId).then(function(b) {
                        g.scene = b.data.obj, g.scene.applyPromotion = "" + g.scene.applyPromotion, g.scene.applyTemplate = "" + g.scene.applyTemplate, g.code = PREFIX_URL + "eqs/qrcode/" + g.scene.code + ".png", g.url = VIEW_URL + "v-" + g.scene.code, g.customUrl = l.trustAsResourceUrl(VIEW_URL + "v-" + g.scene.id + "?preview=preview"), g.scene.image.isAdvancedUser = e.isAdvancedUser || e.isVendorUser ? !0 : !1, a._bd_share_config = {
                            common: {
                                bdText: g.scene.name,
                                bdDesc: g.scene.name,
                                bdUrl: g.url,
                                bdSign: "on",
                                bdSnsKey: {}
                            },
                            share: [{
                                bdSize: 32
                            }],
                            slide: [{
                                bdImg: 0,
                                bdPos: "right",
                                bdTop: 100
                            }]
                        }, q = g.scene.pageCount, 2 == g.scene.status ? (g.showOpenSceneBtn = !0, g.showCloseSceneBtn = !1) : 1 == g.scene.status && (g.showOpenSceneBtn = !1, g.showCloseSceneBtn = !0)
                    })
                }, g.getSceneDetail(), g.publishScene = function(a) {
                    g.scene.publishTime && g.scene.publishTime >= g.scene.updateTime ? alert("场景已发布！") : i.publishScene(a).then(function(a) {
                        a.data.success && alert("场景发布成功")
                    })
                }, g.closeScene = function(a) {
                    i.closeScene(a).then(function() {
                        g.showOpenSceneBtn = !0, g.showCloseSceneBtn = !1
                    })
                }, g.openScene = function(a) {
                    i.openScene(a).then(function() {
                        g.showOpenSceneBtn = !1, g.showCloseSceneBtn = !0
                    })
                }, g.totalItems = 0, g.currentPage = 1, g.toPage = "", g.pageChanged = function(a) {
                    return 1 > a || a > g.totalItems / 10 + 1 ? void alert("此页超出范围") : void p(g.sceneId, a, 10)
                }, g.getTdStyle = function(a) {
                    var b = $(".header_table td:eq(" + a + ")").outerWidth();
                    return {
                        width: b + "px",
                        maxWidth: b + "px"
                    }
                }, p(g.sceneId, g.currentPage, 10);
                var t = new ZeroClipboard(document.getElementById("copy-button"), {
                    moviePath: CLIENT_CDN+"images/ZeroClipboard.swf"
                });
                t.on("dataRequested", function(a) {
                    a.setText(g.url), setTimeout(function() {
                        alert("复制成功")
                    }, 500)
                }), g.goData = function() {
                    d.hash("collectData"), b()
                }
            }
        ]), b.module("my.scenesetting", ["services.scene", "services.mine", "services.data", "scene.create.console", "app.directives.addelement", "services.usercenter"]), b.module("my.scenesetting").controller("SceneSettingCtrl", ["$route", "$location", "$rootScope", "$window", "$scope", "$routeParams", "sceneService", "MineService", "dataService", "$sce", "$modal", "usercenterService", "security", "pageTplService",
            function(a, c, d, e, f, g, h, j, k, l, m, n, o, p) {
                f.loading = !1, f.url = "", f.sceneId = g.sceneId, f.isVendorUser = d.isVendorUser, f.isAllowToAccessLastPageSetting = o.isAllowToAccess(2);
                var q = 0;
                f.PREFIX_FILE_HOST = PREFIX_FILE_HOST, f.alwaysOpen = !0;
                var r;
                f.scene || (f.scene = {}), f.switchOpen = function() {
                    f.alwaysOpen && (f.startDate = null, f.endDate = null)
                }, f.openImageModal = function() {
                    m.open({
                        windowClass: "img_console console",
                        templateUrl: "scene/console/bg.tpl.html",
                        controller: "BgConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return {
                                    fileType: 1,
                                    elemDef: null,
                                    coverImage: "coverImage"
                                }
                            }
                        }
                    }).result.then(function(a) {
                        f.newCoverImage = a, f.newCoverImage.tmbPath = a.data, f.newCoverImage.path = a.data, f.coverImages.unshift(f.newCoverImage), f.scene.image.imgSrc = f.newCoverImage.path
                    }, function() {})
                }, f.chooseCover = function(a) {
                    f.scene.image.imgSrc = a.path
                }, f.openmin = function(a) {
                    a.preventDefault(), a.stopPropagation(), f.openedmax = !1, f.openedmin = !0, f.minDateStart = new Date, f.maxDateStart = f.endDate ? new Date(new Date(f.endDate).getTime() - 864e5) : null
                }, f.openmax = function(a) {
                    a.preventDefault(), a.stopPropagation(), f.openedmin = !1, f.openedmax = !0, f.minDateEnd = f.startDate ? new Date(new Date(f.startDate).getTime() + 864e5) : new Date
                }, f.dateOptions = {
                    formatYear: "yy",
                    startingDay: 1
                }, f.formats = ["dd-MMMM-yyyy", "yyyy/MM/dd", "dd.MM.yyyy", "shortDate"], f.format = f.formats[1], f.saveSceneSettings = function() {
                    if (f.startDate && !f.endDate) return void(f.invalidText = "请选择结束时间");
                    if (f.endDate && !f.startDate) return void(f.invalidText = "请选择结束时间");
                    if (f.scene.description && f.scene.description.trim().length > 30) return void(f.invalidText = "场景描述不能超过30个字");
                    if (!f.scene.name || !f.scene.name.trim()) return void(f.invalidText = "请填写场景名称");
                    var a = i(f.scene.name.trim());
                    return a > 48 ? void alert("场景名称不能超过48个字符或24个汉字") : (f.startDate && f.endDate && (f.scene.startDate = f.startDate.getTime(), f.scene.endDate = f.endDate.getTime()), f.startDate && f.endDate || (f.scene.startDate = null, f.scene.endDate = null), f.scene.type = f.scene.type.value, f.scene.pageMode = f.scene.pageMode.id, void h.saveSceneSettings(f.scene).then(function() {
                        c.path("my/scene/" + f.sceneId).search({}), d.showSetScenePanel = !1
                    }, function() {}))
                }, f.getSceneDetail = function() {
                    h.getSceneDetail(f.sceneId).then(function(a) {
                        f.scene = a.data.obj, f.scene.applyPromotion = "" + f.scene.applyPromotion, f.scene.applyTemplate = "" + f.scene.applyTemplate, 2 == a.data.obj.pageMode && (a.data.obj.pageMode = 0), b.forEach(f.pagemodes, function(b) {
                            a.data.obj.pageMode == b.id && (f.scene.pageMode = b)
                        }), f.code = PREFIX_URL + "eqs/qrcode/" + f.scene.code + ".png", f.url = VIEW_URL + "v-" + f.scene.code, f.customUrl = l.trustAsResourceUrl(VIEW_URL + "v-" + f.scene.id + "?preview=preview"), f.scene.image.isAdvancedUser = d.isAdvancedUser || d.isVendorUser ? !0 : !1, f.hideAd = f.scene.image.hideEqAd ? !0 : !1, q = f.scene.pageCount, f.scene.startDate && f.scene.endDate && (f.startDate = new Date(f.scene.startDate), f.endDate = new Date(f.scene.endDate), f.alwaysOpen = !1), h.getSceneType().then(function(a) {
                            f.types = a.data.list, b.forEach(f.types, function(a) {
                                a.value == f.scene.type && (f.scene.type = a)
                            })
                        }), h.getCoverImages().then(function(a) {
                            f.coverImages = a.data.list;
                            for (var b, c = 0; c < f.coverImages.length; c++) {
                                if (f.scene.image.imgSrc == f.coverImages[c].path) {
                                    r = f.coverImages[c], f.coverImages.splice(c, 1), b = 0;
                                    break
                                }
                                r = {
                                    tmbPath: f.scene.image.imgSrc,
                                    path: f.scene.image.imgSrc
                                }, b = 1
                            }
                            f.coverImages.unshift(r)
                        })
                    })
                }, f.getSceneDetail(), f.pagemodes = [{
                    id: 0,
                    name: "上下翻页"
                }, {
                    id: 1,
                    name: "上下惯性翻页"
                }, {
                    id: 4,
                    name: "左右翻页"
                }, {
                    id: 3,
                    name: "左右惯性翻页"
                }, {
                    id: 5,
                    name: "左右连续翻页"
                }], f.scene.pageMode = f.pagemodes[0], f.getUserXd = function() {
                    n.getUserXd().then(function(a) {
                        f.userXd = a.data.obj
                    })
                }, f.getUserXd(), f.hideAdd = function() {
                    f.scene.image.hideEqAd && f.userXd < 100 && (alert("积分不足！"), f.scene.image.hideEqAd = !1)
                }, p.getPageTpls(1301).then(function(a) {
                    f.pageTpls = a.data.list && a.data.list.length > 0 ? a.data.list : []
                }), f.chooseLastPage = function(a) {
                    f.scene.image.lastPageId = a
                }
            }
        ]), b.module("scene.my.upload", ["angularFileUpload"]), b.module("scene.my.upload").controller("UploadCtrl", ["$scope", "FileUploader", "fileService", "category", "$timeout", "$interval",
            function(a, b, c, d, e, f) {
                a.category = d;
                var g;
                g = a.uploader = new b(a.category.scratch || a.category.headerImage ? {
                    url: JSON_URL+"?c=upfile&a=upload&ID=" + getCookie("USERID") + "&keycode=" + getCookie("MD5STR") + "&bizType=" + d.categoryId + "&fileType=" + d.fileType,
                    withCredentials: !0,
                    queueLimit: 1,
                    onSuccessItem: function(b, c) {
                        function d() {
                            f.cancel(e), alert("上传完毕"), a.$close(c.obj.path)
                        }
                        a.progressNum = 0;
                        var e = f(function() {
                            a.progressNum < 100 ? a.progressNum += 15 : d()
                        }, 100)
                    }
                } : {
                    url: JSON_URL+"?c=upfile&a=upload&ID=" + getCookie("USERID") + "&keycode=" + getCookie("MD5STR") + "&bizType=" + d.categoryId + "&fileType=" + d.fileType,
                    withCredentials: !0,
                    queueLimit: 5,
                    onCompleteAll: function() {
                        function b() {
                            f.cancel(c), alert("上传完毕"), a.$close()
                        }
                        a.progressNum = 0;
                        var c = f(function() {
                            a.progressNum < 100 ? a.progressNum += 15 : b()
                        }, 100)
                    }
                });
                var h;
                ("0" == d.fileType || "1" == d.fileType) && (h = "|jpg|png|jpeg|bmp|gif|", limitSize = 3145728), "2" == d.fileType && (h = "|mp3|mpeg|", limitSize = 3145728), g.filters.push({
                    name: "imageFilter",
                    fn: function(a) {
                        var b = "|" + a.type.slice(a.type.lastIndexOf("/") + 1) + "|";
                        return -1 !== h.indexOf(b)
                    }
                }), g.filters.push({
                    name: "imageSizeFilter",
                    fn: function(a) {
                        var b = a.size;
                        return b >= limitSize && alert("上传文件大小限制在" + limitSize / 1024 / 1024 + "M以内"), b < limitSize
                    }
                }), g.filters.push({
                    name: "fileNameFilter",
                    fn: function(a) {
                        return a.name.length > 50 && alert("文件名应限制在50字符以内"), a.name.length <= 50
                    }
                });
                var i = function() {
                    c.listFileCategory().then(function(b) {
                        a.categoryList = b.data.list, a.categoryList || (a.categoryList = []), a.categoryList.push({
                            name: "我的背景",
                            value: "0"
                        })
                    })
                };
                i(), a.removeQueue = function() {}
            }
        ]), b.module("reg", []), b.module("reg").controller("TestLoginCtrl", ["$rootScope", "$scope",
            function(a, b) {
                b.weiChatUrl = "https://open.weixin.qq.com/connect/qrconnect?appid=wxc5f1bbae4bb93ced&redirect_uri=http://www.hjtmt.com/testlogin.html&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect"
            }
        ]), b.module("sample", ["services.sample", "services.mine", "services.scene", "app.directives.addelement", "app.directives.qrcode"]), b.module("sample").controller("SampleCtrl", ["$rootScope", "$http", "$scope", "$timeout", "security", "$window", "sampleService", "MineService", "sceneService", "$routeParams",
            function(a, b, c, d, e, f, g, h, i) {
                c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_SERVER_HOST = PREFIX_URL, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.load = function() {
                    t = $(".fixed").offset().top, mh = $(".mains").height(), fh = $(".fixed").height(), $("#eq_main").scroll(function() {
                        s = $("#eq_main").scrollTop(), s > t - 10 ? ($(".fixed").css("position", "fixed"), s + fh > mh && $(".fixed").css("top", "0px")) : $(".fixed").css("position", "")
                    })
                }, c.$on("$destroy", function() {
                    $("#eq_main").unbind("scroll")
                }), c.pageNo = 1, c.pageSize = 9, c.scene || (c.scene = {}), c.typeindex = "all", c.getHomes = function(a, b, d, e) {
                    c.pageNo = 1, c.typeindex = a, c.currentType = b, c.showMoreButton = !0, g.getSamples(b, d, e).then(function(a) {
                        c.homes = a.data.list
                    }, function() {})
                }, c.getSceneType = function() {
                    i.getSceneType().then(function(a) {
                        c.sceneTypes = a.data.list
                    })
                }, c.showMore = function() {
                    c.pageNo++, g.getSamples(c.currentType, c.pageNo, c.pageSize).then(function(a) {
                        a.data.list.length > 0 ? c.homes = c.homes.concat(a.data.list) : c.showMoreButton = !1
                    }, function() {})
                }, c.getSceneType(), c.getHomes("all", null, 1, 9), c.getSamplesPV = function() {
                    g.getSamplesPV().then(function(a) {
                        c.SamplesPVs = a.data, c.dayTop = c.SamplesPVs.obj.dayTop, c.monthTop = c.SamplesPVs.obj.monthTop, c.weekTop = c.SamplesPVs.obj.weekTop, c.page = "month"
                    }, function() {})
                }
            }
        ]), b.module("scene.create.console", ["scene.create.console.bg", "scene.create.console.map", "scene.create.console.input", "scene.create.console.button", "scene.create.console.setting", "scene.create.console.audio", "scene.create.console.tel", "scene.create.console.fake", "scene.create.console.pic_lunbo", "scene.create.console.micro", "scene.create.console.link", "scene.create.console.video", "scene.create.console.category", "scene.create.console.cropImage"]), b.module("scene.create.console").controller("ConsoleCtrl", ["$scope",
            function() {}
        ]), b.module("scene.create.console.setting.anim", ["app.directives.uislider", "app.directives.limitInput"]), b.module("scene.create.console.setting.anim").controller("AnimConsoleCtrl", ["$scope", "sceneService",
            function(a, b) {
                var c = a.elemDef = b.currentElemDef,
                    d = $("#inside_" + a.elemDef.id + " .element-box");
                if (a.animTypeEnum = [{
                    id: -1,
                    name: "无"
                }, {
                    id: 0,
                    name: "淡入"
                }, {
                    id: 1,
                    name: "移入"
                }, {
                    id: 2,
                    name: "弹入"
                }, {
                    id: 3,
                    name: "中心弹入"
                }, {
                    id: 4,
                    name: "中心放大"
                }, {
                    id: 12,
                    name: "翻滚进入"
                }, {
                    id: 13,
                    name: "光速进入"
                }, {
                    id: 6,
                    name: "摇摆"
                }, {
                    id: 5,
                    name: "抖动"
                }, {
                    id: 7,
                    name: "旋转"
                }, {
                    id: 8,
                    name: "翻转"
                }, {
                    id: 9,
                    name: "悬摆"
                }, {
                    id: 10,
                    name: "淡出"
                }, {
                    id: 11,
                    name: "翻转消失"
                }], a.animDirectionEnum = [{
                    id: 0,
                    name: "从左向右"
                }, {
                    id: 1,
                    name: "从上到下"
                }, {
                    id: 2,
                    name: "从右向左"
                }, {
                    id: 3,
                    name: "从下到上"
                }], c.properties || (c.properties = {}), c.properties.anim && null != c.properties.anim.type) {
                    var e;
                    for (e = 0; e < a.animTypeEnum.length; e++) a.animTypeEnum[e].id == c.properties.anim.type && (a.activeAnim = a.animTypeEnum[e]);
                    a.model = {
                        type: c.properties.anim.type,
                        direction: c.properties.anim.direction,
                        duration: parseFloat(c.properties.anim.duration),
                        delay: parseFloat(c.properties.anim.delay),
                        countNum: parseInt(c.properties.anim.countNum, 10) || 1,
                        count: c.properties.anim.count,
                        linear: c.properties.anim.linear
                    }, a.direction = null != c.properties.anim.direction ? a.animDirectionEnum[c.properties.anim.direction] : a.animDirectionEnum[0]
                } else a.activeAnim = a.animTypeEnum[0], a.direction = a.animDirectionEnum[0], a.model = {
                    type: null,
                    direction: null,
                    duration: 2,
                    delay: 0,
                    countNum: 1,
                    count: null
                };
                a.$watch("model", function() {
                    a.direction && (a.model.direction = a.direction.id), c.properties.anim = a.model, f()
                }, !0), a.$watch("direction", function() {
                    a.direction && (a.model.direction = a.direction.id), c.properties.anim = a.model, f()
                }, !0), a.confirm = function() {
                    a.cancel()
                };
                var f = function() {
                    d.css("animation", ""), d.css("animation", a.animationClass + " " + a.model.duration + "s ease 0s"), d.css("animation-fill-mode", "backwards")
                };
                a.changeAnimation = function() {
                    a.animationClass = "";
                    var b = a.model;
                    0 === b.type && (a.animationClass = "fadeIn"), 1 === b.type && (0 === a.direction.id && (a.animationClass = "fadeInLeft"), 1 === a.direction.id && (a.animationClass = "fadeInDown"), 2 === a.direction.id && (a.animationClass = "fadeInRight"), 3 === a.direction.id && (a.animationClass = "fadeInUp")), 6 === b.type && (a.animationClass = "wobble"), 5 === b.type && (a.animationClass = "rubberBand"), 7 === b.type && (a.animationClass = "rotateIn"), 8 === b.type && (a.animationClass = "flip"), 9 === b.type && (a.animationClass = "swing"), 2 === b.type && (0 === a.direction.id && (a.animationClass = "bounceInLeft"), 1 === a.direction.id && (a.animationClass = "bounceInDown"), 2 === a.direction.id && (a.animationClass = "bounceInRight"), 3 === a.direction.id && (a.animationClass = "bounceInUp")), 3 === b.type && (a.animationClass = "bounceIn"), 4 === b.type && (a.animationClass = "zoomIn"), 10 === b.type && (a.animationClass = "fadeOut"), 11 === b.type && (a.animationClass = "flipOutY"), 12 === b.type && (a.animationClass = "rollIn"), 13 === b.type && (a.animationClass = "lightSpeedIn")
                }
            }
        ]), b.module("scene.create.console.audio", []), b.module("scene.create.console.audio").controller("AudioConsoleCtrl", ["$scope", "$sce", "$timeout", "$modal", "fileService", "obj",
            function(a, b, c, d, e, f) {
                function g() {
                    e.getFileByCategory(1, 30, "1", "2").then(function(b) {
                        a.reservedAudios = b.data.list;
                        for (var c = 0; c < a.reservedAudios.length; c++) "3" == a.model.bgAudio.type && PREFIX_FILE_HOST + a.reservedAudios[c].path == a.model.type3 && (a.model.selectedAudio = a.reservedAudios[c])
                    })
                }

                function h() {
                    e.getFileByCategory(1, 10, "0", "2").then(function(b) {
                        a.myAudios = b.data.list;
                        for (var c = 0; c < a.myAudios.length; c++) "2" == a.model.bgAudio.type && PREFIX_FILE_HOST + a.myAudios[c].path == a.model.type2 && (a.model.selectedMyAudio = a.myAudios[c])
                    })
                }
                a.PREFIX_FILE_HOST = PREFIX_FILE_HOST, a.model = {
                    bgAudio: {
                        url: f.url ? f.url : "",
                        type: f.type ? f.type : "3"
                    },
                    compType: "bgAudio"
                }, c(function() {
                    "1" == f.type && f.url && (a.model.type1 = f.url), "2" == f.type && f.url && (a.model.type2 = b.trustAsResourceUrl(((f.url.indexOf('syspic/') >= 0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + f.url)), "3" == f.type && f.url && (a.model.type3 = b.trustAsResourceUrl(((f.url.indexOf('syspic/') >= 0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + f.url))
                }), a.categoryList = [{
                    name: "音乐库",
                    value: "3"
                }, {
                    name: "外部链接",
                    value: "1"
                }, {
                    name: "我的音乐",
                    value: "2"
                }], a.goUpload = function() {
                    d.open({
                        windowClass: "upload-console",
                        templateUrl: "my/upload.tpl.html",
                        controller: "UploadCtrl",
                        resolve: {
                            category: function() {
                                return {
                                    categoryId: 0,
                                    fileType: 2
                                }
                            }
                        }
                    }).result.then(function() {
                        h()
                    })
                }, a.selectAudio = function(c) {
                    "3" == c && (a.model.type3 = a.model.selectedAudio ? b.trustAsResourceUrl(PREFIX_FILE_HOST + a.model.selectedAudio.path) : null), "2" == c && (a.model.type2 = a.model.selectedMyAudio ? b.trustAsResourceUrl(PREFIX_FILE_HOST + a.model.selectedMyAudio.path) : null)
                }, a.playAudio = function(a) {
                    $("#audition" + a)[0].play()
                }, a.pauseAudio = function(a) {
                    $("#audition" + a)[0].pause()
                }, a.confirm = function() {
                    "1" == a.model.bgAudio.type && (a.model.bgAudio.url = a.model.type1), "2" == a.model.bgAudio.type && (a.model.bgAudio.url = a.model.selectedMyAudio.path), "3" == a.model.bgAudio.type && (a.model.bgAudio.url = a.model.selectedAudio.path), a.$close(a.model)
                }, a.cancel = function() {
                    a.$dismiss()
                }, g(), h()
            }
        ]), b.module("scene.create.console.bg", ["services.file", "scene.my.upload", "app.directives.responsiveImage", "app.directives.rightclick"]), b.module("scene.create.console.bg").controller("BgConsoleCtrl", ["$scope", "$timeout", "$rootScope", "$modal", "ModalService", "sceneService", "fileService", "localizedMessages", "obj",
            function(a, b, c, d, e, f, g, h, i) {
                a.PREFIX_FILE_HOST = PREFIX_FILE_HOST, a.first = !0, a.categoryList = [], a.imgList = [], a.otherCategory = [], a.categoryId = "1", a.fileType = i.fileType, a.pageSize = h.get("file.bg.pageSize"), a.myTags = [], a.selectedImgs = [], a.selectedImages = [], a.toPage = 1, a.isEditor = c.isEditor;
                var j = function() {
                    g.listFileCategory(a.fileType).then(function(b) {
                        a.categoryList = b.data.list, a.changeCategory("0", 1)
                    })
                };
                a.totalItems = 0, a.currentPage = 1;
                var k = function(b, c) {
                    if ("c" == b) {
                        a.numPages = 2, a.totalItems = 35;
                        var d = [{
                            color: "#6366C3"
                        }, {
                            color: "#29A1D6"
                        }, {
                            color: "#332E42"
                        }, {
                            color: "#DBF3FF"
                        }, {
                            color: "#434A54"
                        }, {
                            color: "#000000"
                        }, {
                            color: "#F1F03E"
                        }, {
                            color: "#FCF08E"
                        }, {
                            color: "#972D53"
                        }, {
                            color: "#724192"
                        }, {
                            color: "#967BDC"
                        }, {
                            color: "#EC87C1"
                        }, {
                            color: "#D870AF"
                        }, {
                            color: "#F6F7FB"
                        }, {
                            color: "#666C78"
                        }, {
                            color: "#ABB1BD"
                        }, {
                            color: "#CCD0D9"
                        }, {
                            color: "#E6E9EE"
                        }, {
                            color: "#48CFAE"
                        }, {
                            color: "#36BC9B"
                        }, {
                            color: "#3BAEDA"
                        }, {
                            color: "#50C1E9"
                        }, {
                            color: "#AC92ED"
                        }, {
                            color: "#4B89DC"
                        }, {
                            color: "#4B89DC"
                        }, {
                            color: "#5D9CEC"
                        }, {
                            color: "#8DC153"
                        }, {
                            color: "#ED5564"
                        }, {
                            color: "#DB4453"
                        }, {
                            color: "#FB6E52"
                        }, {
                            color: "#FFCE55"
                        }, {
                            color: "#F6BB43"
                        }, {
                            color: "#E9573E"
                        }, {
                            color: "#9FF592"
                        }, {
                            color: "#A0D468"
                        }];
                        a.toPage = c, a.imgList = c && 1 != c ? d.slice(18) : d.slice(0, 18), a.currentPage = c
                    } else "all" == b && (b = ""), g.getFileByCategory(c ? c : 1, a.pageSize, b, a.fileType).then(function(b) {
                        a.imgList = b.data.list, a.totalItems = b.data.map.count, a.currentPage = b.data.map.pageNo, a.allPageCount = b.data.map.count, a.toPage = b.data.map.pageNo, a.numPages = Math.ceil(a.totalItems / a.pageSize)
                    })
                };
                a.replaceImage = function() {
                    if (a.selectedImages.length > 1) return alert("只能选择一张图片进行替换！"), !1;
                    if (!a.selectedImages.length) return alert("还没有选择替换图片"), !1;
                    if ("c" != a.categoryId) {
                        var b = a.selectedImages[0].path,
                            c = $(".hovercolor").children("img")[0];
                        a.$close({
                            type: "imgSrc",
                            data: b,
                            width: c.width,
                            height: c.height
                        })
                    } else {
                        var d = a.selectedImages[0].color;
                        a.$close({
                            type: "backgroundColor",
                            color: d
                        })
                    }
                }, a.getImagesByPage = function(b, c) {
                    a.currentPage = c, 0 == b ? isNaN(a.tagIndex) || -1 == a.tagIndex ? a.changeCategory(b, c) : a.getImagesByTag(a.myTags[a.tagIndex].id, a.tagIndex, c) : isNaN(a.sysTagIndex) || -1 == a.sysTagIndex ? a.changeCategory(b, c) : a.getImagesBySysTag(a.childCatrgoryList[a.sysTagIndex].id, a.sysTagIndex, c, b)
                }, a.replaceBgImage = function(b, c) {
                    var d, e = c.target;
                    d = "IMG" == e.nodeName.toUpperCase() ? e : $("img", e)[0], a.$close({
                        type: "imgSrc",
                        data: b,
                        width: d.width,
                        height: d.height
                    })
                }, a.replaceBgColor = function(b) {
                    a.$close({
                        type: "backgroundColor",
                        color: b
                    })
                }, a.changeCategory = function(b, c) {
                    return ("c" == b || "all" == b || "0" == b) && (a.allImages.checked = !1, a.sysTagIndex = -1), a.selectedImages = [], 1 > c || c > a.totalItems / a.pageSize + 1 ? void alert("此页超出范围") : (a.imgList = [], b || (b = "0"), a.categoryId = b, void(0 == b ? (a.pageSize = h.get("file.bg.pageSize") - 1, a.getImagesByTag("", a.tagIndex, c), a.tagIndex = -1) : (a.pageSize = h.get("file.bg.pageSize"), k(b, c))))
                };
                var l = null;
                a.createCategory = function() {
                    return a.myTags.length >= 8 ? void alert("最多能创建8个自定义标签！") : void(l = d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/category.tpl.html",
                        controller: "CategoryConsoleCtrl"
                    }).result.then(function(b) {
                        a.myTags.push(b)
                    }, function() {}))
                }, a.getCustomTags = function() {
                    g.getCustomTags().then(function(b) {
                        a.myTags = b.data.list
                    }, function() {
                        alert("服务器异常")
                    })
                }, a.getCustomTags(), a.deleteTag = function(b, c) {
                    g.deleteTag(b).then(function() {
                        a.myTags.splice(c, 1)
                    }, function() {
                        alert("服务器异常")
                    })
                }, a.hover = function(a) {
                    a.showOp = !a.showOp
                }, a.switchSelect = function(b, c) {
                    if (c.target.id != b.id)
                        if (b.selected = !b.selected, b.selected) a.selectedImages.push(b);
                        else
                            for (var d in a.selectedImages) a.selectedImages[d] == b && a.selectedImages.splice(d, 1)
                }, a.selectTag = function(b, c) {
                    a.dropTagIndex = c, a.id = a.myTags[c].id
                }, a.setCategory = function(b, c) {
                    a.dropTagIndex = -1;
                    var d = [];
                    if (!c)
                        for (var e in a.selectedImages) d.push(a.selectedImages[e].id);
                    var f = c ? c : d.join(",");
                    g.setCategory(a.id, f).then(function() {}, function() {})
                }, a.hoverTag = function(a) {
                    a.hovered = !a.hovered
                }, a.prevent = function(b) {
                    b.selected || (b.selected = !0, a.selectedImages.push(b))
                }, a.prevent = function() {}, a.unsetTag = function() {
                    var b = [];
                    for (var c in a.selectedImages) b.push(a.selectedImages[c].id);
                    g.unsetTag(a.myTags[a.tagIndex].id, b.join(",")).then(function() {
                        a.getImagesByTag(a.myTags[a.tagIndex].id, a.tagIndex, a.currentPage)
                    }, function() {})
                }, a.setIndex = function(b) {
                    a.dropTagIndex = -1, a.selectedImages.length || (alert("请您选中图片再进行分类！"), b.stopPropagation())
                }, a.getChildCategory = function(b) {
                    g.getChildCategory(b).then(function(b) {
                        a.sysTagIndex = -1, 200 == b.data.code && (a.childCatrgoryList = b.data.list)
                    }, function() {})
                }, a.goUpload = function() {
                    d.open({
                        windowClass: "upload-console",
                        templateUrl: "my/upload.tpl.html",
                        controller: "UploadCtrl",
                        resolve: {
                            category: function() {
                                return {
                                    categoryId: a.categoryId,
                                    fileType: a.fileType,
                                    coverImage: i.coverImage
                                }
                            }
                        }
                    }).result.then(function() {
                        a.changeCategory(a.categoryId)
                    }, function() {})
                }, a.allImages = {
                    checked: !1
                }, a.selectAll = function() {
                    for (var b in a.imgList) a.allImages.checked ? (a.imgList[b].selected = !0, a.selectedImages.push(a.imgList[b])) : (a.imgList[b].selected = !1, a.selectedImages = [])
                }, a.getImagesByTag = function(b, c, d) {
                    return 1 > d || d > a.totalItems / a.pageSize + 1 ? void alert("此页超出范围") : (a.allImages.checked = !1, a.selectedImages = [], a.tagIndex = c, void g.getImagesByTag(b, a.fileType, d, a.pageSize).then(function(b) {
                        a.imgList = b.data.list, a.totalItems = b.data.map.count, a.currentPage = b.data.map.pageNo, a.allPageCount = b.data.map.count, a.toPage = b.data.map.pageNo, a.numPages = Math.ceil(a.totalItems / a.pageSize)
                    }, function() {
                        alert("服务器异常")
                    }))
                }, a.getImagesBySysTag = function(b, c, d, e) {
                    return 1 > d || d > a.totalItems / a.pageSize + 1 ? void alert("此页超出范围") : (a.allImages.checked = !1, a.selectedImages = [], a.sysTagIndex = c, void g.getImagesBySysTag(b, a.fileType, d, a.pageSize, e).then(function(b) {
                        a.imgList = b.data.list, a.totalItems = b.data.map.count, a.currentPage = b.data.map.pageNo, a.allPageCount = b.data.map.count, a.toPage = b.data.map.pageNo, a.numPages = Math.ceil(a.totalItems / a.pageSize)
                    }, function() {
                        alert("服务器异常")
                    }))
                }, a.deleteImage = function(b, c) {
                    var d = [];
                    if (!b && 0 == a.selectedImages.length) return void alert("请您选中图片后再进行删除操作！");
                    c && c.stopPropagation();
                    var f = b ? "确定删除此图片？" : "确定删除所选图片？";
                    if (!b)
                        for (var h in a.imgList) a.imgList[h].selected && d.push(a.imgList[h].id);
                    var i = b ? b : d.join(",");
                    e.openConfirmDialog({
                        msg: f
                    }, function() {
                        g.deleteFile(i).then(function() {
                            isNaN(a.tagIndex) || -1 == a.tagIndex ? a.changeCategory("0", a.currentPage) : a.getImagesByTag(a.myTags[a.tagIndex].id, a.tagIndex, a.currentPage)
                        })
                    })
                }, j()
            }
        ]), b.module("scene.create.console.button", []), b.module("scene.create.console.button").controller("ButtonConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "obj",
            function(a, b, c, d) {
                a.model = {
                    title: d.properties.title
                }, a.confirm = function() {
                    return a.model.title && 0 !== a.model.title.length ? void a.$close(a.model) : (alert("按钮名称不能为空"), void $('.bg_console input[type="text"]').focus())
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("scene.create.console.category", ["services.file"]), b.module("scene.create.console.category").controller("CategoryConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "fileService",
            function(a, c, d, e) {
                a.category = {}, a.confirm = function() {
                    return a.category.name && a.category.name.trim() ? i(a.category.name) > 16 ? void alert("类别字数不能超过16个字符！") : void e.createCategory(b.copy(a.category.name)).then(function(c) {
                        a.category.id = c.data.obj, a.$close(b.copy(a.category))
                    }, function() {
                        alert("创建失败")
                    }) : void alert("类别不能为空！")
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("scene.create.console.cropImage", ["services.file"]).directive("cropImage", ["sceneService", "fileService", "$compile",
            function(a, b) {
                return {
                    restrict: "EAC",
                    scope: {},
                    replace: !0,
                    templateUrl: "scene/console/cropimage.tpl.html",
                    link: function(c, d) {
                        c.PREFIX_FILE_HOST = PREFIX_FILE_HOST;
                        var e, f = a.currentElemDef,
                            g = a.currentElemDef.properties.src;
                        c.$on("changeElemDef", function(b, d) {
                            d = a.currentElemDef, g = a.currentElemDef.properties.src, c.preSelectImage(g)
                        }), c.preSelectImage = function(a) {
                            var b = $("#target");
                            e ? (b.attr("src", PREFIX_FILE_HOST + a), e.setImage(PREFIX_FILE_HOST + a), e.setSelect([0, 0, 100, 100])) : b.attr("src", PREFIX_FILE_HOST + a).load(function() {
                                b.Jcrop({
                                    keySupport: !1,
                                    setSelect: [0, 0, 100, 100],
                                    boxHeight: 200,
                                    boxWidth: 300
                                }, function() {
                                    e = this
                                }), a && b.Jcrop({
                                    keySupport: !1,
                                    aspectRatio: f.css.width / f.css.height,
                                    setSelect: [-f.properties.imgStyle.marginLeft.split("px")[0], -f.properties.imgStyle.marginTop.split("px")[0], f.css.width, f.css.height]
                                })
                            })
                        }, c.preSelectImage(g), c.crop = function() {
                            var c = a.currentElemDef,
                                f = e.tellSelect();
                            f.x = parseInt(f.x, 10), f.y = parseInt(f.y, 10), f.w = parseInt(f.w, 10), f.h = parseInt(f.h, 10), f.x2 = parseInt(f.x2, 10), f.y2 = parseInt(f.y2, 10), f.src = $("#target").attr("src").split(PREFIX_FILE_HOST)[1], b.cropImage(f).then(function(a) {
                                var b = {
                                    type: "imgSrc",
                                    data: a.data.obj,
                                    width: f.w,
                                    height: f.h
                                };
                                c.properties.src = b.data;
                                var e = b.width / b.height,
                                    g = $("#" + c.id),
                                    h = $("#inside_" + c.id).width(),
                                    i = $("#inside_" + c.id).height(),
                                    j = h / i;
                                e >= j ? (g.outerHeight(i), g.outerWidth(i * e), g.css("marginLeft", -(g.outerWidth() - h) / 2), g.css("marginTop", 0)) : (g.outerWidth(h), g.outerHeight(h / e), g.css("marginTop", -(g.outerHeight() - i) / 2), g.css("marginLeft", 0)), g.attr("src", PREFIX_FILE_HOST + b.data), c.properties.imgStyle = {}, c.properties.imgStyle.width = g.outerWidth(), c.properties.imgStyle.height = g.outerHeight(), c.properties.imgStyle.marginTop = g.css("marginTop"), c.properties.imgStyle.marginLeft = g.css("marginLeft"), $(d).hide()
                            }, function() {
                                c.properties.src || (elements.splice(elements.indexOf(elementsMap[c.id]), 1), delete elementsMap[c.id])
                            })
                        }, c.cancel = function() {
                            $(d).hide()
                        }
                    }
                }
            }
        ]), b.module("scene.create.console.fake", []), b.module("scene.create.console.fake").controller("FakeConsoleCtrl", ["$scope", "type",
            function(a, b) {
                a.type = b
            }
        ]), b.module("scene.create.console.input", []), b.module("scene.create.console.input").controller("InputConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "obj",
            function(a, b, c, d) {
                a.model = {
                    title: d.title,
                    type: d.type,
                    required: d.properties.required
                }, a.confirm = function() {
                    return a.model.title && 0 !== a.model.title.length ? void a.$close(a.model) : (alert("输入框名称不能为空"), void $('.bg_console input[type="text"]').focus())
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("scene.create.console.link", ["services.scene"]), b.module("scene.create.console.link").controller("LinkConsoleCtrl", ["$scope", "$timeout", "obj", "sceneService",
            function(a, c, d, e) {
                a.url = {}, a.url.externalLink = "http://";
                var f;
                a.confirm = function() {
                    "external" == a.url.link ? f = a.url.externalLink : "internal" == a.url.link && (f = a.url.internalLink.num), a.$close(f)
                }, a.cancel = function() {
                    a.$dismiss()
                }, a.removeLink = function(b) {
                    "external" == b ? a.url.externalLink = "http://" : "internal" == b && (a.url.internalLink = a.pageList[0]), a.url.link = ""
                }, a.changed = function() {
                    "external" == a.url.link ? a.url.internalLink = a.pageList[0] : a.url.externalLink = "http://"
                }, a.selectRadio = function(b) {
                    a.url.link || ("external" == b ? a.url.link = "external" : "internal" == b && (a.url.link = "internal"))
                }, a.getPageNames = function() {
                    var c = d.sceneId;
                    e.getPageNames(c).then(function(c) {
                        a.pageList = c.data.list, a.pageList.unshift({
                            id: 0,
                            name: "无"
                        }), b.forEach(a.pageList, function(a) {
                            a.name || (a.name = "第" + a.num + "页")
                        }), a.url.internalLink = a.pageList[0], d.properties.url && (isNaN(d.properties.url) ? (a.url.link = "external", a.url.externalLink = decodeURIComponent(d.properties.url.split("=")[2])) : (a.url.link = "internal", a.url.internalLink = a.pageList[d.properties.url]))
                    })
                }, a.getPageNames()
            }
        ]), b.module("scene.create.console.map", ["app.directives.comp.editor"]), b.module("scene.create.console.map").controller("MapConsoleCtrl", ["$scope", "sceneService", "$timeout",
            function(a, b, c) {
                var d = null,
                    e = null;
                a.address = {
                    address: "",
                    lat: "",
                    lng: ""
                }, a.search = {
                    address: ""
                }, a.searchResult = [], c(function() {
                    d = new BMap.Map("l-map"), d.addControl(new BMap.NavigationControl), d.centerAndZoom(new BMap.Point(116.404, 39.915), 12);
                    var b = {
                        onSearchComplete: function(b) {
                            e.getStatus() == BMAP_STATUS_SUCCESS && (a.searchResult = b.Fn, a.$apply())
                        }
                    };
                    e = new BMap.LocalSearch(d, b)
                }), a.searchAddress = function() {
                    e.search(a.search.address)
                }, a.setPoint = function(b, c, e) {
                    a.address.address = e, a.address.lat = b, a.address.lng = c, d.clearOverlays();
                    var f = new BMap.Point(c, b),
                        g = new BMap.Marker(f);
                    d.addOverlay(g);
                    var h = new BMap.Label(e, {
                        offset: new BMap.Size(20, -10)
                    });
                    g.setLabel(h), d.centerAndZoom(f, 12)
                }, a.resetAddress = function() {
                    a.$close(a.address)
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("scene.create.console.micro", ["app.directives.addelement", "services.scene"]), b.module("scene.create.console.micro").controller("MicroConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "obj", "sceneService",
            function(a, c, d, e, f) {
                a.model || (a.model = {});
                var g = [];
                a.isSelected = [], a.backgroundColors = [{
                    backgroundColor: "#D34141"
                }, {
                    backgroundColor: "#000"
                }, {
                    backgroundColor: "#23A3D3"
                }, {
                    backgroundColor: "#79C450"
                }, {
                    backgroundColor: "#fafafa"
                }], a.labelNames = [{
                    id: 1,
                    title: "栏目一",
                    color: {
                        backgroundColor: ""
                    }
                }, {
                    id: 2,
                    title: "栏目二",
                    color: {
                        backgroundColor: ""
                    }
                }, {
                    id: 3,
                    title: "栏目三",
                    color: {
                        backgroundColor: ""
                    }
                }, {
                    id: 4,
                    title: "栏目四",
                    color: {
                        backgroundColor: ""
                    }
                }], a.model.color = e.properties.labels[0].color.backgroundColor, a.selectColor = function(c) {
                    a.model.color = c.backgroundColor, b.forEach(a.labelNames, function(a) {
                        a.color.backgroundColor && (a.color.backgroundColor = c.backgroundColor)
                    })
                }, b.forEach(e.properties.labels, function(c) {
                    b.forEach(a.labelNames, function(a) {
                        c.id == a.id && (a.title = c.title, a.color.backgroundColor = c.color.backgroundColor, a.link = c.link, a.selected = !0, c.mousedown = !1)
                    })
                }), a.confirm = function() {
                    g = [];
                    var c = 0,
                        d = 0;
                    b.forEach(a.labelNames, function(a) {
                        a.selected && (a.link ? g.push(a) : d++, c++)
                    }), 2 > c ? alert("导航标签不能少于两个！") : d > 0 ? alert("每个导航必须有链接页面！") : a.$close(g)
                }, a.cancel = function() {
                    a.$dismiss()
                }, a.switchLabel = function(b, c) {
                    a.label = b, b.selected ? a.labelIndex == c ? (b.color.backgroundColor = "", b.selected = !1, b.mousedown = !1) : (a.labelIndex = c, b.mousedown = !0) : (b.color.backgroundColor = a.model.color, a.labelIndex = c, b.selected = !0, b.mousedown = !0), b.mousedown ? (a.model.title = b.title, a.model.link = b.link ? a.pageList[b.link] : a.pageList[0]) : (a.model.title = "", a.model.link = a.pageList[0])
                }, a.selectLink = function(b) {
                    a.label.mousedown && (a.label.link = b.num, console.log(a.labelNames))
                }, a.changeLabelName = function() {
                    a.label.mousedown && (a.label.title = a.model.title)
                }, a.getPageNames = function() {
                    var c = e.sceneId;
                    f.getPageNames(c).then(function(c) {
                        a.pageList = c.data.list, a.pageList.unshift({
                            id: 0,
                            name: "无"
                        }), b.forEach(a.pageList, function(a) {
                            a.name || (a.name = "第" + a.num + "页")
                        }), a.model.link = a.pageList[0]
                    })
                }, a.getPageNames()
            }
        ]), b.module("scene.create.console.pic_lunbo", ["scene.my.upload"]), b.module("scene.create.console.pic_lunbo").controller("picsCtrl", ["$scope", "$timeout", "$rootScope", "$modal", "ModalService", "sceneService", "fileService", "obj",
            function(a, b, d, e, f, g, h, i) {
                var j = {
                        lunBo: 1,
                        jiuGongGe: 2
                    },
                    k = {
                        autoPlay: i.properties.autoPlay == c ? !0 : i.properties.autoPlay,
                        interval: i.properties.interval == c ? 3e3 : i.properties.interval,
                        picStyle: i.properties.picStyle == c ? j.lunBo : i.properties.picStyle,
                        children: []
                    },
                    l = i.properties.children;
                if (l && l.length > 0)
                    for (var m in l) k.children.push(l[m]);
                a.imgList = k.children, a.isAutoPlay = k.autoPlay, a.fileDomain = PREFIX_FILE_HOST, a.autoPlay = function(b) {
                    a.isAutoPlay = k.autoPlay = b
                }, a.choosePic = function() {
                    return k.children.length >= 6 ? void alert("最多选择6张图片") : void e.open({
                        windowClass: "console img_console",
                        templateUrl: "scene/console/bg.tpl.html",
                        controller: "BgConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return {
                                    fileType: 1,
                                    elemDef: i
                                }
                            }
                        }
                    }).result.then(function(b) {
                        a.imgList.push({
                            src: b.data,
                            desc: "",
                            height: b.height,
                            width: b.width
                        })
                    }, function() {})
                }, a.remove = function(b) {
                    a.imgList.splice(b, 1)
                }, a.ok = function() {
                    return 0 == k.children.length ? void alert("请选择图片") : (i.properties = k, void a.$close(k))
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("scene.create.console.setting", ["scene.create.console.setting.style", "scene.create.console.setting.anim"]), b.module("scene.create.console.setting").directive("styleModal", ["sceneService", "$compile",
            function() {
                return {
                    restrict: "AE",
                    replace: !0,
                    scope: {},
                    templateUrl: "scene/console/setting.tpl.html",
                    link: function(a, b, c) {
                        var d = "style";
                        a.$on("showStylePanel", function(b, c) {
                            d = a.activeTab, a.activeTab = "", a.$apply(), a.activeTab = c && c.activeTab ? c.activeTab : d, a.$apply()
                        }), a.activeTab = c.activeTab, a.cancel = function() {
                            $(b).hide()
                        }, a.$on("$locationChangeStart", function() {
                            a.cancel()
                        })
                    },
                    controller: ["$scope",
                        function() {}
                    ]
                }
            }
        ]), b.module("scene.create.console.setting.style", ["colorpicker.module", "app.directives.style", "app.directives.uislider", "app.directives.limitInput"]), b.module("scene.create.console.setting.style").controller("StyleConsoleCtrl", ["$scope", "sceneService",
            function(a, b) {
                var c = a.elemDef = b.currentElemDef;
                delete c.css.borderTopLeftRadius, delete c.css.borderTopRightRadius, delete c.css.borderBottomLeftRadius, delete c.css.borderBottomRightRadius, delete c.css.border;
                var d = c.css,
                    e = $("#inside_" + a.elemDef.id + " > .element-box");
                if (a.model = {
                    backgroundColor: d.backgroundColor || "",
                    opacity: 100 - 100 * d.opacity || 0,
                    color: d.color || "#676767",
                    borderWidth: parseInt(d.borderWidth, 10) || 0,
                    borderStyle: d.borderStyle || "solid",
                    borderColor: d.borderColor || "rgba(0,0,0,1)",
                    paddingBottom: parseInt(d.paddingBottom, 10) || 0,
                    paddingTop: parseInt(d.paddingTop, 10) || 0,
                    lineHeight: +d.lineHeight || 1,
                    borderRadius: parseInt(d.borderRadius, 10) || 0,
                    transform: d.transform && parseInt(d.transform.replace("rotateZ(", "").replace("deg)", ""), 10) || 0
                }, a.maxRadius = Math.min(e.outerWidth(), e.outerHeight()) / 2 + 10, d.borderRadiusPerc ? a.model.borderRadiusPerc = parseInt(d.borderRadiusPerc, 10) : d.borderRadius ? "999px" == d.borderRadius ? a.model.borderRadiusPerc = 100 : (a.model.borderRadiusPerc = parseInt(100 * parseInt(d.borderRadius, 10) * 2 / Math.min(e.outerWidth(), e.outerHeight()), 10), a.model.borderRadiusPerc > 100 && (a.model.borderRadiusPerc = 100)) : a.model.borderRadiusPerc = 0, a.tmpModel = {
                    boxShadowDirection: 0,
                    boxShadowX: 0,
                    boxShadowY: 0,
                    boxShadowBlur: 0,
                    boxShadowSize: 0,
                    boxShadowColor: "rgba(0,0,0,0.5)"
                }, d.boxShadow) {
                    var f = d.boxShadow.split(" ");
                    a.tmpModel.boxShadowX = parseInt(f[0], 10), a.tmpModel.boxShadowY = parseInt(f[1], 10), a.tmpModel.boxShadowDirection = parseInt(d.boxShadowDirection, 10) || 0, a.tmpModel.boxShadowBlur = parseInt(f[2], 10), a.tmpModel.boxShadowColor = f[3], a.tmpModel.boxShadowSize = parseInt(d.boxShadowSize, 10) || 0
                }
                a.clear = function() {
                    a.model = {
                        backgroundColor: "",
                        opacity: 0,
                        color: "#676767",
                        borderWidth: 0,
                        borderStyle: "solid",
                        borderColor: "rgba(0,0,0,1)",
                        paddingBottom: 0,
                        paddingTop: 0,
                        lineHeight: 1,
                        borderRadius: 0,
                        transform: 0
                    }, a.tmpModel = {
                        boxShadowDirection: 0,
                        boxShadowX: 0,
                        boxShadowY: 0,
                        boxShadowBlur: 0,
                        boxShadowSize: 0,
                        boxShadowColor: "rgba(0,0,0,0.5)"
                    }
                }, a.$watch("tmpModel", function() {
                    var b = {};
                    $.extend(!0, b, a.model), b.borderRadius += "px", b.borderTopLeftRadius = b.borderTopRightRadius = b.borderBottomLeftRadius = b.borderBottomRightRadius = b.borderRadius, b.opacity = (100 - a.model.opacity) / 100, b.boxShadow = Math.round(a.tmpModel.boxShadowX) + "px " + Math.round(a.tmpModel.boxShadowY) + "px " + a.tmpModel.boxShadowBlur + "px " + a.tmpModel.boxShadowColor, b.boxShadowDirection = a.tmpModel.boxShadowDirection, b.boxShadowSize = a.tmpModel.boxShadowSize, b.transform = "rotateZ(" + a.model.transform + "deg)", $.extend(!0, c.css, b)
                }, !0), a.$watch("model", function() {
                    var b = {};
                    $.extend(!0, b, a.model), b.borderRadius += "px", b.borderTopLeftRadius = b.borderTopRightRadius = b.borderBottomLeftRadius = b.borderBottomRightRadius = b.borderRadius, b.opacity = (100 - a.model.opacity) / 100, b.boxShadow = Math.round(a.tmpModel.boxShadowX) + "px " + Math.round(a.tmpModel.boxShadowY) + "px " + a.tmpModel.boxShadowBlur + "px " + a.tmpModel.boxShadowColor, b.boxShadowDirection = a.tmpModel.boxShadowDirection, b.boxShadowSize = a.tmpModel.boxShadowSize, b.transform = "rotateZ(" + a.model.transform + "deg)", $.extend(!0, c.css, b)
                }, !0)
            }
        ]).directive("styleInput", function() {
            return {
                restrict: "AE",
                link: function(a, b, c) {
                    var d = $("#inside_" + a.elemDef.id + " > .element-box");
                    a.$watch(function() {
                        return $(b).val()
                    }, function() {
                        if ("borderWidth" == c.cssItem) {
                            d.css({
                                borderStyle: a.model.borderStyle,
                                borderWidth: $(b).val()
                            });
                            var e = {
                                width: d.width(),
                                height: d.height()
                            };
                            if (4 == a.elemDef.type) {
                                var f = d.find("img"),
                                    g = f.width() / f.height(),
                                    h = e.width / e.height;
                                g >= h ? (f.outerHeight(e.height), f.outerWidth(e.height * g), f.css("marginLeft", -(f.outerWidth() - e.width) / 2), f.css("marginTop", 0)) : (f.outerWidth(e.width), f.outerHeight(e.width / g), f.css("marginTop", -(f.outerHeight() - e.height) / 2), f.css("marginLeft", 0)), a.elemDef.properties.imgStyle.marginTop = f.css("marginTop"), a.elemDef.properties.imgStyle.marginLeft = f.css("marginLeft"), a.elemDef.properties.imgStyle.width = f.outerWidth(), a.elemDef.properties.imgStyle.height = f.outerHeight()
                            }
                        }
                        "borderRadius" == c.cssItem && d.css({
                            borderRadius: a.model.borderRadius
                        }), "opacity" == c.cssItem && d.css({
                            opacity: (100 - $(b).val()) / 100
                        }), "backgroundColor" == c.cssItem && d.css({
                            backgroundColor: $(b).val()
                        }), "color" == c.cssItem && d.css({
                            color: $(b).val()
                        }), "borderStyle" == c.cssItem && d.css({
                            borderStyle: a.model.borderStyle
                        }), "borderColor" == c.cssItem && d.css({
                            borderColor: a.model.borderColor
                        }), "padding" == c.cssItem && d.css({
                            paddingTop: a.model.paddingTop,
                            marginTop: -a.model.paddingBottom
                        }), "lineHeight" == c.cssItem && d.css({
                            lineHeight: a.model.lineHeight
                        }), "transform" == c.cssItem && d.parents("li").css({
                            transform: "rotateZ(" + a.model.transform + "deg)"
                        }), "boxShadow" == c.cssItem && (a.tmpModel.boxShadowX = -Math.sin(a.tmpModel.boxShadowDirection * Math.PI / 180) * a.tmpModel.boxShadowSize, a.tmpModel.boxShadowY = Math.cos(a.tmpModel.boxShadowDirection * Math.PI / 180) * a.tmpModel.boxShadowSize, d.css({
                            boxShadow: Math.round(a.tmpModel.boxShadowX) + "px " + Math.round(a.tmpModel.boxShadowY) + "px " + a.tmpModel.boxShadowBlur + "px " + a.tmpModel.boxShadowColor
                        }))
                    })
                }
            }
        }).directive("angleKnob", function() {
            return {
                restrict: "AE",
                templateUrl: "scene/console/angle-knob.tpl.html",
                link: function(a, b) {
                    function c(a, b) {
                        var c = Math.sqrt((a - 28) * (a - 28) + (b - 28) * (b - 28)) / 28,
                            d = 28 + (a - 28) / c,
                            e = 28 + (b - 28) / c;
                        f.css({
                            top: Math.round(e),
                            left: Math.round(d)
                        })
                    }

                    function d(a, b) {
                        var c = a - 28,
                            d = 28 - b,
                            e = 180 * Math.atan(c / d) / Math.PI;
                        return b > 28 && (e += 180), 28 >= b && 28 > a && (e += 360), Math.round(e)
                    }
                    var e = $(b).find(".sliderContainer"),
                        f = $(b).find(".sliderKnob");
                    a.$watch(function() {
                        return a.tmpModel.boxShadowDirection
                    }, function(a) {
                        f.css({
                            top: 28 - 28 * Math.cos(a * Math.PI / 180),
                            left: 28 + 28 * Math.sin(a * Math.PI / 180)
                        })
                    }), 0 != a.tmpModel.boxShadowDirection && f.css({
                        top: 28 - 28 * Math.cos(a.tmpModel.boxShadowDirection * Math.PI / 180),
                        left: 28 + 28 * Math.sin(a.tmpModel.boxShadowDirection * Math.PI / 180)
                    }), e.bind("mousedown", function(b) {
                        b.stopPropagation();
                        var f = e.offset().left,
                            g = e.offset().top;
                        c(b.pageX - f, b.pageY - g);
                        var h = d(b.pageX - f, b.pageY - g);
                        a.tmpModel.boxShadowDirection = h, a.$apply(), $(this).bind("mousemove", function(b) {
                            b.stopPropagation(), c(b.pageX - f, b.pageY - g);
                            var e = d(b.pageX - f, b.pageY - g);
                            a.tmpModel.boxShadowDirection = e, a.$apply()
                        }), $(this).bind("mouseup", function() {
                            $(this).unbind("mousemove"), $(this).unbind("mouseup")
                        })
                    })
                }
            }
        }), b.module("scene.create.console.tel", ["app.directives.addelement"]), b.module("scene.create.console.tel").controller("TelConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "obj",
            function(a, c, d, e) {
                a.model = {
                    title: e.properties.title,
                    number: e.properties.number
                }, a.confirm = function() {
                    if (!a.model.title || 0 === a.model.title.length) return alert("按钮名称不能为空"), void $('.bg_console input[type="text"]').focus();
                    if (!a.model.number || 0 === a.model.title.number) return alert("电话号码不能为空"), void $('.bg_console input[type="text"]').focus();
                    var b = new RegExp(/(\d{11})|^((\d{7,8})|(^400[0-9]\d{6})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/g);
                    return b.test(a.model.number) ? void a.$close(a.model) : void alert("手机号码格式错误")
                }, a.cancel = function() {
                    a.$dismiss()
                }, a.removePlaceHolder = function() {
                    $(".tel-button").attr("placeholder", "")
                }, a.addPlaceHolder = function() {
                    $(".tel-button").attr("placeholder", "010-88888888")
                }, a.chooseTelButton = function(b, c, d) {
                    a.model.title = b.text, "A" == d.target.nodeName && (a.model.btnStyle = b.btnStyle), a.btnIndex = c
                }, a.buttons = [{
                    id: 1,
                    text: "一键拨号",
                    btnStyle: {
                        width: "90px",
                        backgroundColor: "rgb(244, 113, 31)",
                        height: "30px",
                        "text-algn": "center",
                        "line-height": "30px",
                        color: "rgb(255, 255, 255)",
                        "-webkit-border-radius": "5px",
                        "-moz-border-radius": "5px",
                        "border-radius": "3px"
                    }
                }, {
                    id: 2,
                    text: "热线电话",
                    btnStyle: {
                        width: "90px",
                        backgroundColor: "rgb(253, 175, 7)",
                        height: "30px",
                        "text-algn": "center",
                        "line-height": "30px",
                        color: "rgb(255, 255, 255)",
                        "-webkit-border-radius": "40px",
                        "-moz-border-radius": "40px",
                        "border-radius": "3px"
                    }
                }, {
                    id: 3,
                    text: "拨打电话",
                    btnStyle: {
                        width: "90px",
                        backgroundColor: "rgb(121, 196, 80)",
                        height: "30px",
                        "text-algn": "center",
                        "line-height": "30px",
                        color: "rgb(255, 255, 255)",
                        "-webkit-border-radius": "5px",
                        "-moz-border-radius": "5px",
                        "border-radius": "3px"
                    }
                }, {
                    id: 4,
                    text: "一键拨号",
                    btnStyle: {
                        width: "90px",
                        height: "30px",
                        backgroundColor: "#fff",
                        "text-algn": "center",
                        border: "1px solid #3FB816",
                        "line-height": "30px",
                        color: "rgb(0, 0, 0)",
                        "-webkit-border-radius": "5px",
                        "-moz-border-radius": "5px",
                        "border-radius": "3px"
                    }
                }], b.forEach(a.buttons, function(b, c) {
                    e.css.background && e.css.background == b.btnStyle.background && (a.btnIndex = c)
                })
            }
        ]), b.module("scene.create.console.video", []), b.module("scene.create.console.video").controller("VideoCtrl", ["$scope", "$timeout", "obj",
            function(a, b, c) {
                a.model || (a.model = {}), a.model.src = c.properties.src, a.confirm = function() {
                    return a.model.src ? void a.$close(a.model.src) : void alert("请输入视频地址")
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("scene.create", ["app.directives.editor", "services.scene", "confirm-dialog", "services.modal", "app.directives.component", "services.pagetpl", "scene.create.console", "app.directives.comp.editor", "app.directives.addelement", "scene.my.upload", "services.i18nNotifications"]), b.module("scene.create").controller("CreateSceneCtrl", ["$timeout", "$compile", "$rootScope", "$scope", "$routeParams", "$route", "$location", "sceneService", "pageTplService", "$modal", "ModalService", "security", "$window", "i18nNotifications",
            function(c, d, e, f, g, h, j, k, l, m, n, o, p, r) {
                function s(a, c, d) {
                    f.loading = !0, $("#editBG").hide(), f.pageId = f.pages[a - 1].id, k.getSceneByPage(f.pageId, c, d).then(function(g) {
                        f.loading = !1, f.tpl = g.data, w = JSON.stringify(f.tpl), f.sceneId = f.tpl.obj.sceneId, f.tpl.obj.properties && (f.tpl.obj.properties.image || f.tpl.obj.properties.scratch) ? (f.tpl.obj.properties.scratch ? f.scratch = f.tpl.obj.properties.scratch : f.tpl.obj.properties.image && (f.scratch.image = f.tpl.obj.properties.image, f.scratch.percentage = f.tpl.obj.properties.percentage, f.tpl.obj.properties.tip && (f.scratch.tip = f.tpl.obj.properties.tip)), f.effectName = "涂抹", b.forEach(f.scratches, function(a) {
                            a.path == f.scratch.image.path && (f.scratch.image = a)
                        }), b.forEach(f.percentages, function(a) {
                            a.value == f.scratch.percentage.value && (f.scratch.percentage = a)
                        })) : (f.scratch = {}, f.scratch.image = f.scratches[0], f.scratch.percentage = f.percentages[0]), f.tpl.obj.properties && f.tpl.obj.properties.finger ? (f.finger = f.tpl.obj.properties.finger, f.effectName = "指纹", b.forEach(f.fingerZws, function(a) {
                            a.path == f.finger.zwImage.path && (f.finger.zwImage = a)
                        }), b.forEach(f.fingerBackgrounds, function(a) {
                            a.path == f.finger.bgImage.path && (f.finger.bgImage = a)
                        })) : (f.finger = {}, f.finger.zwImage = f.fingerZws[0], f.finger.bgImage = f.fingerBackgrounds[0]), f.tpl.obj.properties && f.tpl.obj.properties.effect && "money" == f.tpl.obj.properties.effect.name && (f.effectName = "数钱", f.money = {
                            tip: f.tpl.obj.properties.effect.tip
                        }), f.tpl.obj.properties && f.tpl.obj.properties.fallingObject ? (f.falling = f.tpl.obj.properties.fallingObject, b.forEach(f.fallings, function(a) {
                            a.path == f.falling.src.path && (f.falling.src = a)
                        }), f.effectName = "环境") : f.falling = {
                            src: f.fallings[0],
                            density: 2
                        }, (c || d) && (j.$$search = {}, j.search("pageId", ++a), f.getPageNames()), f.pageNum = a, v = f.tpl.obj.scene.name, $(".nr").empty(), k.templateEditor.parse({
                            def: f.tpl.obj,
                            appendTo: ".nr",
                            mode: "edit"
                        }), e.$broadcast("dom.changed")
                    }, function() {
                        f.loading = !1
                    })
                }

                function t() {
                    r.pushForCurrentRoute("scene.save.success.nopublish", "notify.success")
                }
                f.loading = !1, f.PREFIX_FILE_HOST = PREFIX_FILE_HOST, f.tpl = {};
                var u, v = "",
                    w = "",
                    x = "";
                f.templateType = 1, f.categoryId = -1, f.isEditor = e.isEditor, f.createComp = k.createComp, f.createCompGroup = k.createCompGroup, f.updateCompPosition = k.updateCompPosition, f.updateCompAngle = k.updateCompAngle, f.updateCompSize = k.updateCompSize, f.openAudioModal = k.openAudioModal, f.isAllowToAccessScrollImage = o.isAllowToAccess(4);
                var y = null;
                f.scratch || (f.scratch = {}), f.finger || (f.finger = {}), f.effectList = [{
                    type: "scratch",
                    name: "涂抹",
                    src: CLIENT_CDN + "images/create/waterdrop.jpg"
                }, {
                    type: "finger",
                    name: "指纹",
                    src: CLIENT_CDN + "images/create/fingers/zhiwen1.png"
                }, {
                    type: "money",
                    name: "数钱",
                    src: CLIENT_CDN + "images/create/money_thumb1.jpg"
                }, {
                    type: "fallingObject",
                    name: "环境",
                    src: CLIENT_CDN + "images/create/falling.png"
                }], f.scratches = [{
                    name: "水滴",
                    path: CLIENT_CDN + "images/create/waterdrop.jpg"
                }, {
                    name: "细沙",
                    path: CLIENT_CDN + "images/create/sand.jpg"
                }, {
                    name: "花瓣",
                    path: CLIENT_CDN + "images/create/flowers.jpg"
                }, {
                    name: "金沙",
                    path: CLIENT_CDN + "images/create/goldsand.jpg"
                }, {
                    name: "白雪",
                    path: CLIENT_CDN + "images/create/snowground.jpg"
                }, {
                    name: "模糊",
                    path: CLIENT_CDN + "images/create/mohu.jpg"
                }, {
                    name: "落叶",
                    path: CLIENT_CDN + "images/create/leaves.jpg"
                }, {
                    name: "薄雾",
                    path: CLIENT_CDN + "images/create/smoke.png"
                }], f.percentages = [{
                    id: 1,
                    value: .15,
                    name: "15%"
                }, {
                    id: 2,
                    value: .3,
                    name: "30%"
                }, {
                    id: 3,
                    value: .6,
                    name: "60%"
                }], f.fingerZws = [{
                    name: "粉色指纹",
                    path: CLIENT_CDN + "images/create/fingers/zhiwen1.png"
                }, {
                    name: "白色指纹",
                    path: CLIENT_CDN + "images/create/fingers/zhiwen2.png"
                }, {
                    name: "蓝色指纹",
                    path: CLIENT_CDN + "images/create/fingers/zhiwen3.png"
                }], f.fingerBackgrounds = [{
                    name: "粉红回忆",
                    path: CLIENT_CDN + "images/create/fingers/bg1.jpg"
                }, {
                    name: "深蓝花纹",
                    path: CLIENT_CDN + "images/create/fingers/bg2.jpg"
                }, {
                    name: "淡绿清新",
                    path: CLIENT_CDN + "images/create/fingers/bg3.jpg"
                }, {
                    name: "深紫典雅",
                    path: CLIENT_CDN + "images/create/fingers/bg4.jpg"
                }, {
                    name: "淡紫水滴",
                    path: CLIENT_CDN + "images/create/fingers/bg5.jpg"
                }, {
                    name: "蓝白晶格",
                    path: CLIENT_CDN + "images/create/fingers/bg6.jpg"
                }, {
                    name: "蓝色水滴",
                    path: CLIENT_CDN + "images/create/fingers/bg7.jpg"
                }, {
                    name: "朦胧绿光",
                    path: CLIENT_CDN + "images/create/fingers/bg8.jpg"
                }, {
                    name: "灰色金属",
                    path: CLIENT_CDN + "images/create/fingers/bg9.jpg"
                }], f.fallings = [{
                    name: "福字",
                    path: CLIENT_CDN + "images/create/fallings/fuzi1.png",
                    rotate: 180,
                    vy: 3
                }, {
                    name: "红包",
                    path: CLIENT_CDN + "images/create/fallings/hongbao2.png",
                    rotate: 180,
                    vy: 3
                }, {
                    name: "绿枫叶",
                    path: CLIENT_CDN + "images/create/fallings/lvfengye.png",
                    rotate: 180,
                    vy: 3
                }, {
                    name: "星星",
                    path: CLIENT_CDN + "images/create/fallings/xing.png",
                    rotate: 180,
                    vy: 3
                }, {
                    name: "雪花",
                    path: CLIENT_CDN + "images/create/fallings/snow.png",
                    rotate: 0,
                    vy: 1
                }], f.scratch.image = f.scratches[0], f.scratch.percentage = f.percentages[0], f.finger.zwImage = f.fingerZws[0], f.finger.bgImage = f.fingerBackgrounds[0], f.$on("dom.changed", function() {
                    d($(".nr"))(f)
                }), f.openUploadModal = function() {
                    y || (y = m.open({
                        windowClass: "upload-console",
                        templateUrl: "my/upload.tpl.html",
                        controller: "UploadCtrl",
                        resolve: {
                            category: function() {
                                return {
                                    categoryId: "0",
                                    fileType: "1",
                                    scratch: "scratch"
                                }
                            }
                        }
                    }).result.then(function(a) {
                        f.scratch.image.path = f.PREFIX_FILE_HOST + a, f.scratch.image.name = "", y = null
                    }, function() {
                        y = null
                    }))
                }, f.cancel = function() {}, f.cancelEffect = function() {
                    f.effectType = "", $("#modalBackdrop1").remove()
                };
                var z = null;
                f.$on("showCropPanel", function(a, b) {
                    var c = $(".content").eq(0);
                    z ? (e.$broadcast("changeElemDef", b), z.show()) : z = d("<div crop-image></div>")(f), c.append(z)
                }), f.saveEffect = function(a) {
                    if (f.tpl.obj.properties = {}, "scratch" == f.effectType) f.tpl.obj.properties.scratch = a, f.effectName = "涂抹";
                    else if ("finger" == f.effectType) f.tpl.obj.properties.finger = a, f.effectName = "指纹";
                    else if ("money" == f.effectType) {
                        if (a && a.tip && i(a.tip) > 24) return alert("提示文字不能超过24个字符！"), void(f.tpl.obj.properties = null);
                        a || (a = {
                            tip: "握紧钱币，数到手抽筋吧！"
                        }), f.tpl.obj.properties.effect = {
                            name: "money",
                            tip: a.tip
                        }, f.effectName = "数钱"
                    }
                    "fallingObject" == f.effectType && (f.tpl.obj.properties.fallingObject = a, f.effectName = "环境"), f.saveScene(), f.cancelEffect()
                };
                var A = null;
                f.$on("showStylePanel", function(a, b) {
                    var c = $(".content").eq(0);
                    A ? A.show() : "style" == b.activeTab ? A = d('<div style-modal active-tab="style"></div>')(f) : "anim" == b.activeTab && (A = d('<div style-modal active-tab="anim"></div>')(f)), c.append(A)
                }), f.$on("hideStylePanel", function() {
                    A && A.hide()
                });
                var z = null;
                f.$on("showCropPanel", function(a, b) {
                    var c = $(".content").eq(0);
                    z ? (e.$broadcast("changeElemDef", b), z.show()) : z = d("<div crop-image></div>")(f), c.append(z)
                }), f.navTo = function(a, b) {
                    f.pageList = !0, !f.isEditor || 1101 !== f.sceneId && 1102 !== f.sceneId && 1103 !== f.sceneId || (f.pageLabelAll.length = 0, f.pageIdTag = a.id, f.getPageTagLabel()), a.id != f.tpl.obj.id && f.saveScene(null, function() {
                        s(b + 1), j.$$search = {}, j.search("pageId", a.num)
                    })
                }, f.stopCopy = function() {
                    q = !1
                }, f.getOriginPageName = function(a) {
                    x = a.name
                }, f.getPageNames = function() {
                    var a = g.sceneId;
                    k.getPageNames(a).then(function(a) {
                        f.pages = a.data.list, b.forEach(f.pages, function(a, b) {
                            a.name || (a.name = "第" + (b + 1) + "页")
                        }), s(j.search().pageId ? j.search().pageId : f.pages[0].num)
                    })
                }, f.getPageNames(), f.editableStatus = [], f.savePageNames = function(a, b) {
                    a.name || (a.name = "第" + (b + 1) + "页"), f.tpl.obj.name = a.name, x != a.name && k.savePageNames(f.tpl.obj).then(function() {})
                }, f.stopCopy = function() {
                    q = !1
                }, f.removeScratch = function(a) {
                    a.stopPropagation(), f.tpl.obj.properties = null
                }, f.$on("text.click", function(a, b) {
                    $("#btn-toolbar").remove(), $("body").append(d("<toolbar></toolbar>")(f));
                    var e = $(b).offset().top;
                    c(function() {
                        $("#btn-toolbar").css("top", e - 50), $("#btn-toolbar").show(), $("#btn-toolbar").bind("click mousedown", function(a) {
                            a.stopPropagation()
                        }), $(b).wysiwyg_destroy(), $(b).wysiwyg(), b.focus()
                    })
                }), f.updatePosition = function(a) {
                    var b, c, d = f.tpl.obj.elements,
                        e = [];
                    for (c = 0; c < d.length; c++)
                        if ("3" == d[c].type) {
                            d[c].num = 0, e.push(d[c]), d.splice(c, 1);
                            break
                        }
                    for (b = 0; b < a.length; b++)
                        for (c = 0; c < d.length; c++)
                            if (d[c].num == a[b]) {
                                d[c].num = b + 1, e.push(d[c]), d.splice(c, 1);
                                break
                            }
                    f.tpl.obj.elements = e
                }, f.updateEditor = function() {
                    $(".nr").empty(), k.templateEditor.parse({
                        def: f.tpl.obj,
                        appendTo: ".nr",
                        mode: "edit"
                    }), d($(".nr"))(f)
                }, f.saveScene = function(a, c) {
                    return w == JSON.stringify(f.tpl) ? (c && c(), void(a && (!f.tpl.obj.scene.publishTime || f.tpl.obj.scene.updateTime > f.tpl.obj.scene.publishTime ? t() : r.pushForCurrentRoute("scene.save.success.published", "notify.success")))) : ("" === f.tpl.obj.scene.name && (f.tpl.obj.scene.name = v), f.tpl.obj.scene.name = f.tpl.obj.scene.name.replace(/(<([^>]+)>)/gi, ""), k.getSceneObj().obj.scene.image && k.getSceneObj().obj.scene.image.bgAudio && (f.tpl.obj.scene.image || (f.tpl.obj.scene.image = {}), f.tpl.obj.scene.image.bgAudio = k.getSceneObj().obj.scene.image.bgAudio), k.resetCss(), f.tpl.obj.scene.image.isAdvancedUser = e.isAdvancedUser || e.isVendorUser ? !0 : !1, void k.saveScene(f.tpl.obj).then(function() {
                        f.tpl.obj.scene.updateTime = (new Date).getTime(), w = b.toJson(f.tpl), u && (k.recordTplUsage(u), u = null), c && c(), a && t()
                    }, function() {}))
                }, f.publishScene = function() {
                    return f.tpl.obj.scene.publishTime && f.tpl.obj.scene.updateTime <= f.tpl.obj.scene.publishTime && w == b.toJson(f.tpl) ? void j.path("my/scene/" + f.sceneId) : void f.saveScene(null, function() {
                        k.publishScene(f.tpl.obj.sceneId).then(function(a) {
                            a.data.success && (r.pushForNextRoute("scene.publish.success", "notify.success"), q = !1, j.path(f.tpl.obj.scene.publishTime ? "my/scene/" + f.sceneId : "my/sceneSetting/" + f.sceneId))
                        })
                    })
                }, f.exitScene = function() {
                    q = !1, w == b.toJson(f.tpl) ? p.history.back() : n.openConfirmDialog({
                        msg: "是否保存更改内容？",
                        confirmName: "保存",
                        cancelName: "不保存"
                    }, function() {
                        f.saveScene(), p.history.back()
                    }, function() {
                        p.history.back()
                    })
                }, f.duplicatePage = function() {
                    f.saveScene(null, function() {
                        s(f.pageNum, !1, !0)
                    })
                }, f.insertPage = function() {
                    f.saveScene(null, function() {
                        s(f.pageNum, !0, !1)
                    }), $("#pageList").height() >= 360 && c(function() {
                        var a = document.getElementById("pageList");
                        a.scrollTop = a.scrollHeight
                    }, 200)
                }, f.deletePage = function(a) {
                    a.stopPropagation(), f.loading || (f.loading = !0, k.deletePage(f.tpl.obj.id).then(function() {
                        f.loading = !1, j.$$search = {}, f.pages.length == f.pageNum ? (f.pages.pop(), j.search("pageId", --f.pageNum), s(f.pageNum, !1, !1)) : (f.pages.splice(f.pageNum - 1, 1), j.search("pageId", f.pageNum), s(f.pageNum, !1, !1))
                    }, function() {
                        f.loading = !1
                    }))
                }, f.removeBG = function(a) {
                    a.stopPropagation();
                    var b, c = f.tpl.obj.elements;
                    for (b = 0; b < c.length; b++)
                        if (3 == c[b].type) {
                            c.splice(b, 1);
                            var d;
                            for (d = b; d < c.length; d++) c[d].num--;
                            break
                        }
                    $(".edit_area").parent().css({
                        backgroundColor: "transparent",
                        backgroundImage: "none"
                    }), $("#editBG").hide()
                }, f.removeBGAudio = function(a) {
                    a.stopPropagation(), delete f.tpl.obj.scene.image.bgAudio
                }, $(".scene_title").on("paste", function(a) {
                    a.preventDefault();
                    var b = (a.originalEvent || a).clipboardData.getData("text/plain") || prompt("Paste something..");
                    document.execCommand("insertText", !1, b)
                }), f.showPageEffect = !1, f.openPageSetPanel = function() {
                    f.showPageEffect || (f.showPageEffect = !0, $('<div id="modalBackdrop" class="modal-backdrop fade in" ng-class="{in: animate}" ng-style="{\'z-index\': 1040 + (index &amp;&amp; 1 || 0) + index*10}" modal-backdrop="" style="z-index: 1040;"></div>').appendTo("body").click(function() {
                        f.showPageEffect = !1, f.$apply(), $(this).remove()
                    }))
                }, f.openOneEffectPanel = function(a) {
                    f.showPageEffect = !1, $("#modalBackdrop").remove(), f.effectType = a.type ? a.type : a.image || a.scratch ? "scratch" : a.finger ? "finger" : a.fallingObject ? "fallingObject" : a.effect.name, $('<div id="modalBackdrop1" class="modal-backdrop fade in" ng-class="{in: animate}" ng-style="{\'z-index\': 1040 + (index &amp;&amp; 1 || 0) + index*10}" modal-backdrop="" style="z-index: 1040;"></div>').appendTo("body").click(function() {
                        f.effectType = "", f.$apply(), $(this).remove()
                    })
                }, f.getPageTplsByType = function(a) {
                    D(a)
                };
                var B = function() {
                        var a = "1" == f.type ? 3 : 4;
                        f.childCatrgoryList && f.childCatrgoryList.length > a ? (f.otherCategory = f.childCatrgoryList.slice(a), f.childCatrgoryList = f.childCatrgoryList.slice(0, a)) : f.otherCategory = []
                    },
                    C = {},
                    D = function(a) {
                        C[a] ? (f.childCatrgoryList = C[a], B(), f.getPageTplTypestemp(f.childCatrgoryList[0].id, a)) : l.getPageTagLabel(a).then(function(b) {
                            f.childCatrgoryList = C[a] = b.data.list, B(), f.getPageTplTypestemp(f.childCatrgoryList[0].id, a)
                        })
                    },
                    E = {};
                f.getPageTagLabel = function(a) {
                    E[a] ? (f.pageLabel = E[a], G()) : l.getPageTagLabel(a).then(function(b) {
                        f.pageLabel = E[a] = b.data.list, G()
                    })
                }, f.pageLabelAll = [];
                var F, G = function() {
                    l.getPageTagLabelCheck(f.pageIdTag).then(function(a) {
                        F = a.data.list;
                        for (var b = 0; b < f.pageLabel.length; b++) {
                            for (var c = {
                                id: f.pageLabel[b].id,
                                name: f.pageLabel[b].name
                            }, d = 0; d < F.length; d++) {
                                if (F[d].id === f.pageLabel[b].id) {
                                    c.ischecked = !0;
                                    break
                                }
                                c.ischecked = !1
                            }
                            f.pageLabelAll.push(c)
                        }
                    })
                };
                f.pageChildLabel = function() {
                    var a, b = [];
                    for (a = 0; a < f.pageLabelAll.length; a++) f.pageLabelAll[a].ischecked && b.push(f.pageLabelAll[a].id);
                    l.updataChildLabel(b, f.pageIdTag).then(function() {
                        alert("分配成功！"), h.reload()
                    }, function() {})
                }, f.getPageTplTypestemp = function(a, b) {
                    l.getPageTplTypestemp(a, b).then(function(b) {
                        if (f.categoryId = a, f.pageTpls = b.data.list && b.data.list.length > 0 ? b.data.list : [], f.otherCategory.length > 0) {
                            var c;
                            c = f.childCatrgoryList[0];
                            for (var d = 0; d < f.otherCategory.length; d++) f.categoryId == f.otherCategory[d].id && (f.childCatrgoryList[0] = f.otherCategory[d], f.otherCategory[d] = c)
                        }
                    })
                }, l.getPageTplTypes().then(function(a) {
                    f.pageTplTypes = a.data.list && a.data.list.length > 0 ? a.data.list.splice(0, 3) : []
                }).then(function() {
                    f.getPageTplsByType(f.pageTplTypes[0].value)
                }), f.exitPageTplPreview = function() {
                    $(".nr").empty(), k.templateEditor.parse({
                        def: f.tpl.obj,
                        appendTo: ".nr",
                        mode: "edit"
                    }), e.$broadcast("dom.changed")
                }, f.insertPageTpl = function(a) {
                    f.loading = !0;
                    var b = function(a) {
                        k.getSceneTpl(a).then(function(a) {
                            f.loading = !1, u = a.data.obj.id, f.tpl.obj.elements = k.getElements(), $(".nr").empty(), k.templateEditor.parse({
                                def: f.tpl.obj,
                                appendTo: ".nr",
                                mode: "edit"
                            }), e.$broadcast("dom.changed")
                        }, function() {
                            f.loading = !1
                        })
                    };
                    f.tpl.obj.elements && f.tpl.obj.elements.length > 0 ? n.openConfirmDialog({
                        msg: "页面模板会覆盖编辑区域已有组件，是否继续？",
                        confirmName: "是",
                        cancelName: "取消"
                    }, function() {
                        b(a)
                    }) : b(a)
                }, f.chooseThumb = function() {
                    m.open({
                        windowClass: "console",
                        templateUrl: "scene/console/bg.tpl.html",
                        controller: "BgConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return {
                                    fileType: "0"
                                }
                            }
                        }
                    }).result.then(function(a) {
                        f.tpl.obj.properties || (f.tpl.obj.properties = {}), f.tpl.obj.properties.thumbSrc = a.data
                    }, function() {
                        f.tpl.obj.properties.thumbSrc = null
                    })
                }, $(a).bind("beforeunload", function() {
                    return "请确认您的场景已保存"
                }), f.$on("$destroy", function() {
                    $(a).unbind("beforeunload")
                }), f.sortableOptions = {
                    placeholder: "ui-state-highlight ui-sort-position",
                    containment: "#containment",
                    update: function(a, b) {
                        var c = b.item.sortable.dropindex + 1,
                            d = f.pages[b.item.sortable.index].id;
                        f.saveScene(null, function() {
                            k.changePageSort(c, d).then(function() {
                                s(c, !1, !1, !0), j.$$search = {}, j.search("pageId", c), f.pageNum = c
                            })
                        })
                    }
                }
            }
        ]).directive("changeColor", function() {
            return {
                link: function(a, b) {
                    b.bind("click", function() {
                        $(b).addClass("current")
                    })
                }
            }
        }), b.module("scene.create.new", ["services.scene"]), b.module("scene.create.new").controller("SceneNewCtrl", ["$scope", "$location", "sceneService", "items",
            function(a, c, d, e) {
                a.scene = {
                    name: ""
                }, e && (a.scene.name = e.name), d.getSceneType().then(function(c) {
                    a.scene.types = c.data.list, e ? b.forEach(a.scene.types, function(b) {
                        var c = "" + e.type;
                        b.value === c && (a.scene.type = b)
                    }) : a.scene.type = c.data.list[0]
                }), a.create = function() {
                    if ("" === a.scene.name.trim()) return void alert("请输入场景名称");
                    var b = i(a.scene.name.trim());
                    if (b > 48) return void alert("场景名称不能超过48个字符或24个汉字");
                    if (e) {
                        var f = {
                            id: e.id,
                            name: a.scene.name,
                            type: a.scene.type.value,
                            pageMode: a.scene.pageMode.id
                        };
                        d.createByTpl(f).then(function(a) {
                            c.path("scene/create/" + a.data.obj), c.search("pageId", 1)
                        }, function() {})
                    } else d.createBlankScene(a.scene.name, a.scene.type.value, a.scene.pageMode.id).then(function(a) {
                        c.path("scene/create/" + a.data.obj), c.search("pageId", 1)
                    });
                    a.$close()
                }, a.cancel = function() {
                    a.$dismiss()
                }, a.pagemodes = [{
                    id: 2,
                    name: "上下翻页"
                }, {
                    id: 1,
                    name: "左右翻页"
                }], a.scene.pageMode = a.pagemodes[0]
            }
        ]), b.module("scene", ["scene.create", "services.scene", "scene.create.new", "app.directives.addelement"]), b.module("scene").controller("SceneCtrl", ["$window", "$scope", "$location", "sceneService", "$modal",
            function(b, c, d, e, f) {
                c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.isActive = "scene", c.scene = {
                    type: null
                }, c.totalItems = 0, c.currentPage = 1, c.toPage = "", c.tabindex = 0, c.childcat = 0, c.order = "new";
                var g = 12,
                    h = 0;
                c.pageChanged = function(a) {
                    return i.targetPage = a, 1 > a || a > c.totalItems / 11 + 1 ? void alert("此页超出范围") : void c.getPageTpls(1, i.sceneType, i.tagId, a, g, c.order)
                }, c.preview = function(b) {
                    var c = VIEW_URL + "v-" + b;
                    a.open(c, "_blank")
                }, c.createScene = function(a) {
                    f.open({
                        windowClass: "login-container",
                        templateUrl: "scene/createNew.tpl.html",
                        controller: "SceneNewCtrl",
                        resolve: {
                            items: function() {
                                return a
                            }
                        }
                    })
                }, c.getStyle = function(a) {
                    return {
                        "background-image": "url(" + ((a.indexOf('syspic/') >= 0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + a + ")"
                    }
                }, c.show = function(a) {
                    console.log(a.target), $(a.target).children(".cc").css("display", "block")
                }, e.getSceneType().then(function(a) {
                    c.pageTplTypes = a.data.list && a.data.list.length > 0 ? a.data.list : []
                }).then(function() {}), c.tplnew = function(a) {
                    c.order = a, i.orderby = a, i.tagId ? c.getPageTpls(null, i.sceneType, i.tagId, h, g, a) : c.getPageTpls(1)
                };
                var i = {
                        sceneType: null,
                        tagId: "",
                        orderby: "new",
                        pageNo: "0",
                        targetPage: ""
                    },
                    j = {};
                c.getPageTplsByType = function(a) {
                    i.sceneType = a, c.childcat = a, c.categoryId = 0, j[a] ? (c.childCatrgoryList = j[a], c.getPageTpls(1, i.sceneType, c.childCatrgoryList[0].id, h, g, c.order)) : e.getPageTplTypesTwo(a, a).then(function(b) {
                        c.childCatrgoryList = j[a] = b.data.list, c.getPageTpls(1, i.sceneType, c.childCatrgoryList[0].id, h, g, c.order)
                    })
                }, c.allpage = function(a) {
                    i.sceneType = a, c.childcat = 0, c.getPageTpls(1), c.childCatrgoryList = []
                }, c.getPageTpls = function(a, b, d, f, g) {
                    var g = 11;
                    c.categoryId = d, i.tagId = d, e.getPageTpls(a, b, d, f, g, i.orderby).then(function(a) {
                        a.data.list && a.data.list.length > 0 ? (c.tpls = a.data.list, c.totalItems = a.data.map.count, c.currentPage = a.data.map.pageNo, c.allPageCount = a.data.map.count, c.toPage = "") : c.tpls = []
                    })
                }, c.getPageTpls(1)
            }
        ]), b.module("usercenter.relAccount", ["services.usercenter"]), b.module("usercenter.relAccount").controller("RelAccountCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", "userinfo",
            function(a, c, d, e, f, g, h, i, j, k) {
                c.relAccount = function() {
                    var d = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    return d.test(c.user.email) ? c.user.password.trim() ? void f.relAccount(k.id, c.user.email, c.user.password).then(function(d) {
                        if (200 == d.data.code) {
                            alert("绑定成功！"), /qq/gi.test(d.data.msg) && (c.relType = "qq"), /weixin/gi.test(d.data.msg) && (c.relType = "weixin"), /weibo/gi.test(d.data.msg) && (c.relType = "weibo");
                            var e = {
                                type: c.relType,
                                email: b.copy(c.user.email)
                            };
                            c.$close(e), a.$broadcast
                        } else c.relErr = d.data.msg
                    }, function() {
                        c.$dismiss()
                    }) : void alert("密码不能为空！") : void alert("请输入正确得邮箱格式")
                }, c.checkUpperCase = function() {
                    /[A-Z]/g.test(c.user.email) && (c.user.email = c.user.email.toLowerCase(), alert("请用小写字母邮箱注册，已将邮箱中的大写字母自动转换成小写"))
                }, c.cancel = function() {
                    c.$dismiss()
                }
            }
        ]), b.module("usercenter.request", ["services.usercenter", "app.directives.qrcode"]), b.module("usercenter.request").controller("UsercenterrequestCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location",
            function(a, b, c, d, e, f) {
                b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.currentUser = f.currentUser, b.cancel = function() {
                    b.$dismiss()
                }
            }
        ]), b.module("usercenter.transfer", ["services.usercenter"]), b.module("usercenter.transfer").controller("UsercentertransferCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", "username",
            function(a, b, c, d, e, f, g, h, i, j) {
                b.actionerror = !1, b.retrieverror = !1, b.transfer = !0, b.userXd = {
                    toUser: "",
                    xdCount: ""
                }, b.submit = !1, b.getUserXd = function() {
                    e.getUserXd().then(function(a) {
                        a.data.success && (b.xdCount = a.data.obj)
                    })
                }, b.getUserXd(), b.confirm = function() {
                    b.submit = !0, b.getgiveXd()
                }, b.getgiveXd = function() {
                    return b.userXd.toUser ? b.userXd.toUser == j ? void(b.actionerror = "不能把积分转送给自己") : /^\+?[1-9][0-9]*$/.test(b.userXd.xdCount) ? (b.userXd.xdCount > b.xdCount && (b.retrieverror = "积分不足"), void e.getgiveXd(b.userXd).then(function(a) {
                        200 == a.data.code ? b.transfer = !1 : 1003 == a.data.code ? (b.actionerror = a.data.msg, b.retrieverror = "") : 1010 == a.data.code && (b.retrieverror = a.data.msg, b.actionerror = "")
                    })) : void(b.retrieverror = "正确填写积分数目") : void(b.actionerror = "账号不能为空")
                }, b.cancel = function() {
                    b.$dismiss()
                }
            }
        ]), b.module("usercenter", ["usercenter.transfer", "usercenter.request", "services.usercenter", "services.localizedMessages", "security.service", "app.directives.addelement", "services.modal", "usercenter.relAccount"]), b.module("usercenter").controller("UserCenterCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", "$filter", "fixnumFilter",
            function(a, c, d, e, f, g, h, i, j) {
                c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_SERVER_HOST = PREFIX_URL, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.isVendorUser = g.isVendorUser(), c.password = {}, c.pageSize = 5, c.XdpageSize = 10, c.XdpageNo = 1, c.XdtoPage = "", c.pageNo = 1, c.XdcurrentPage = 1, c.msgCurrentPage = 1, c.toPage = 1, c.getUserInfo = function() {
                    f.getUserInfo().then(function(a) {
                        c.userinfo = a.data.obj, c.master = b.copy(c.userinfo), c.userinfo.headImg ? /^http.*/.test(c.userinfo.headImg) && (c.headImg = c.userinfo.headImg) : c.headImg = CLIENT_CDN + "images/defaultuser.jpg";
                        var d = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                        "eqs" != c.userinfo.loginName.substr(0, 3) || d.test(c.userinfo.loginName) || (c.userinfo.noRel = "未绑定", c.showRelButton = !0), /qq/gi.test(c.userinfo.relType) && (c.qqRel = !0), /weixin/gi.test(c.userinfo.relType) && (c.wxRel = !0), /weibo/gi.test(c.userinfo.relType) && (c.wbRel = !0)
                    })
                }, c.getUserInfo(), c.saveUserInfo = function(a) {
                    var b = /^1\d{10}$/;
                    if (a.phone && !b.test(a.phone)) return alert("手机号码格式错误"), void(a.phone = "");
                    var d = /(^[1-9]\d*$)/;
                    if (a.qq && !d.test(a.qq)) return alert("qq号码格式错误"), void(a.qq = "");
                    if (a.tel && !d.test(a.tel)) return alert("电话号码格式错误"), void(a.tel = "");
                    var e = {
                        id: a.id,
                        name: a.name,
                        sex: a.sex,
                        phone: a.phone,
                        tel: a.tel,
                        qq: a.qq,
                        headImg: a.headImg
                    };
                    f.saveUserInfo(e).then(function(a) {
                        a.data.success && (c.isEditable = !1, alert("保存成功"))
                    })
                }, c.tabid = e.id, c.getUserXd = function() {
                    f.getUserXd().then(function(a) {
                        a.data.success && (c.xdCounts = a.data.obj)
                    })
                }, c.getUserXd(), c.getXdlog = function(a) {
                    var b = a;
                    f.getXdlog(b, c.XdpageSize).then(function(a) {
                        a.data.success && (c.xdLogs = a.data.list, c.XdCount = a.data.map.count, c.XdcurrentPage = a.data.map.pageNo, c.XdNumPages = Math.ceil(c.XdCount / c.XdpageSize))
                    })
                }, c.getXdlog(c.XdpageNo), c.XdpageChanged = function(a) {
                    c.XdcurrentPage = a, c.getXdlog(a)
                }, c.getXdStat = function() {
                    f.getXdStat().then(function(a) {
                        c.getXdStat = a.data.map
                    })
                }, c.getXdStat(), c.reset = function() {
                    return c.password.newPw != c.password.confirm ? (c.authError = "新密码与重复密码不一致", c.password.newPw = "", c.password.confirm = "", void $('input[name="newPassword"]').focus()) : b.equals(c.master, c.password) ? void alert("请不要重复提交！") : void g.resetPassword(c.password.old, c.password.newPw).then(function(a) {
                        a.data.success ? (c.authError = "", alert("修改成功"), c.master = b.copy(c.password)) : c.authError = a.data.msg
                    })
                }, c.openXd = function() {
                    h.open({
                        windowClass: "transfer_contain",
                        templateUrl: "usercenter/transfer.tpl.html",
                        controller: "UsercentertransferCtrl",
                        resolve: {
                            username: function() {
                                return c.userinfo.loginName
                            }
                        }
                    }).result.then(function() {}, function() {})
                }, c.customerUpload = function() {
                    h.open({
                        windowClass: "upload-console",
                        templateUrl: "my/upload.tpl.html",
                        controller: "UploadCtrl",
                        resolve: {
                            category: function() {
                                return {
                                    categoryId: "0",
                                    fileType: "1",
                                    headerImage: "headerImage"
                                }
                            }
                        }
                    }).result.then(function(a) {
                        $showCustomButton = !1, c.userinfo.headImg = a;
                        var b = {
                            headImg: a,
                            id: c.userinfo.id
                        };
                        f.saveUserInfo(b).then(function(a) {
                            a.data.success && (c.isEditable = !1, alert("保存成功"))
                        })
                    }, function() {})
                }, c.cancel = function() {
                    c.userinfo = b.copy(c.master), c.isEditable = !1
                }, c.getUserMsg = function(a) {
                    var d = a;
                    f.getNewMessage(d, c.pageSize).then(function(a) {
                        b.forEach(a.data.list, function(a) {
                            1 == a.bizType ? a.type = "系统通知" : 2 == a.bizType ? a.type = "审核通知" : 3 == a.bizType && (a.type = "活动通知")
                        }), c.newMsgs = a.data.list, c.msgCount = a.data.map.count, c.msgNumPages = Math.ceil(c.msgCount / c.pageSize)
                    })
                }, c.getUserMsg(c.pageNo), c.$watch("msgCurrentPage", function(a, b) {
                    a != b && (c.getUserMsg(a), c.toPage = a)
                }), c.pageChanged = function(a) {
                    c.msgCurrentPage = a
                }, c.setRead = function(c) {
                    var d = [];
                    b.forEach(c, function(a) {
                        1 == a.status && this.push(a.id)
                    }, d);
                    var e = d.join();
                    f.setRead(e).then(function(e) {
                        200 == e.data.code && (a.$broadcast("minusCount", d.length), b.forEach(c, function(a) {
                            a.status = 2
                        }))
                    })
                }, c.goBaseInfo = function() {
                    j.path("/usercenter/userinfo", !1), c.tabid = "userinfo"
                }, c.goXd = function() {
                    j.path("/usercenter/xd", !1), c.tabid = "xd"
                }, c.goReset = function() {
                    j.path("/usercenter/reset", !1), c.tabid = "reset"
                }, c.goMessage = function() {
                    j.path("/usercenter/message", !1), c.tabid = "message"
                }, c.goAccount = function() {
                    j.path("/usercenter/account", !1), c.tabid = "account"
                }, c.relAccount = function() {
                    h.open({
                        windowClass: "transfer_contain",
                        templateUrl: "usercenter/console/relAccount.tpl.html",
                        controller: "RelAccountCtrl",
                        resolve: {
                            userinfo: function() {
                                return {
                                    id: c.userinfo.id
                                }
                            }
                        }
                    }).result.then(function(a) {
                        console.log(a), c.userinfo.noRel = null, c.userinfo.loginName = a.email, /qq/gi.test(a.type) && (c.qqRel = !0), /weixin/gi.test(a.type) && (c.wxRel = !0), /weibo/gi.test(a.type) && (c.wbRel = !0)
                    }, function() {})
                }
            }
        ]), b.module("app.directives.addelement", []).directive("addElement", ["$compile",
            function(a) {
                return {
                    restrict: "EA",
                    link: function(c, d, e) {
                        var f = $("#emailAddress"),
                            g = $("#emailAddress").size() + 1;
                        d.bind("click", function() {
                            var d = b.element('<div><input type="text" id="p_scnt" style="width:100%; height: 30px; margin-top: 15px;" ng-model="attrs.addElement" name="p_scnt_' + g + '" placeholder="Input Value" /></div>');
                            f.append(d);
                            var h = d.find("input");
                            console.log(e.addElement), a(h)(c), g++
                        })
                    }
                }
            }
        ]).directive("showIcon", ["$compile", "$timeout",
            function(a) {
                return {
                    restrict: "EA",
                    require: "ngModel",
                    scope: {
                        check: "&callbackFn"
                    },
                    link: function(b, c, d, e) {
                        var f, g, h = a('<a><span class = "glyphicon glyphicon-ok-circle" ng-show="enabled" style = "margin-top: 8px; color: #9ad64b; font-size: 15px;"></span></a>')(b);
                        b.update = function() {
                            c[0].blur(), b.check({
                                arg1: {
                                    name: e.$name
                                }
                            })
                        }, c.bind("focus", function() {
                            f = e.$viewValue, c.parent().after(h), b.enabled = !0, ("email" === d.name || "mobile" === d.name || "tel" === d.name) && (b.enabled = !1), b.$apply()
                        }).bind("blur", function() {
                            b.enabled = !1, g = e.$viewValue;
                            var a = new RegExp(/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/g);
                            if ("mobile" === d.name && g && !a.test(c.val())) return void alert("手机号码格式错误");
                            if ("email" === d.name && g) {
                                var h = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g);
                                if (!h.test(c.val())) return void alert("邮箱格式错误")
                            }(g || f) && f !== g && b.update(), b.$apply()
                        })
                    }
                }
            }
        ]).directive("ngHover", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).hover(function() {
                        $(b.children()[0]).css("display", "block"), $(b.children()[3]).css("display", "block"), $(b.children()[4]).css("display", "block")
                    }, function() {
                        $(b.children()[0]).css("display", "none"), $(b.children()[3]).css("display", "none"), $(b.children()[4]).css("display", "none")
                    })
                }
            }
        }).directive("imgClick", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).bind("click", function() {
                        $(b).find("img").css("border", "4px solid #F60"), $(b).siblings().find("img").css("border", 0)
                    })
                }
            }
        }).directive("customFocus", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).siblings().bind("click", function() {
                        b[0].focus()
                    })
                }
            }
        }).directive("blurChildren", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).on("click", function(a) {
                        (a.target == b[0] || $(a.target).hasClass("badge")) && $(".blurClass").find("input:visible").blur()
                    })
                }
            }
        }).directive("forbiddenClose", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).on("click", function(a) {
                        a.stopPropagation()
                    })
                }
            }
        }).directive("customeImage", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).hover(function() {
                        $("<div><a></a></div>")
                    }, function() {})
                }
            }
        }).directive("slides", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).slides({
                        preload: !0,
                        play: 5e3,
                        pause: 2500,
                        hoverPause: !0
                    })
                }
            }
        }).directive("addClass", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).closest(".textbox-wrap").find("[autofocus]").focus(), $(b).on("blur", function() {
                        $(b).closest(".textbox-wrap").removeClass("focused")
                    }).on("focus", function() {
                        $(b).closest(".textbox-wrap").addClass("focused")
                    })
                }
            }
        }).directive("loadScript", ["$http", "$timeout", "$rootScope",
            function(a) {
                return {
                    link: function(c, d) {
                        var e = function() {
                            c.captchaLoaded = !0
                        };
                        c.$watch(function() {
                            return d[0].getAttribute("src")
                        }, function(b) {
                            b && a.jsonp(d[0].getAttribute("src")).success(e).error(e)
                        }), c.$on("$destroy", function() {
                            b.element(".gt_widget").remove()
                        })
                    }
                }
            }
        ]), b.module("colorpicker.module", []).factory("Helper", function() {
            return {
                closestSlider: function(a) {
                    var b = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector;
                    return b.bind(a)("I") ? a.parentNode : a
                },
                getOffset: function(a, b) {
                    for (var c = 0, d = 0, e = 0, f = 0; a && !isNaN(a.offsetLeft) && !isNaN(a.offsetTop);) c += a.offsetLeft, d += a.offsetTop, b || "BODY" !== a.tagName ? (e += a.scrollLeft, f += a.scrollTop) : (e += document.documentElement.scrollLeft || a.scrollLeft, f += document.documentElement.scrollTop || a.scrollTop), a = a.offsetParent;
                    return {
                        top: d,
                        left: c,
                        scrollX: e,
                        scrollY: f
                    }
                },
                stringParsers: [{
                    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                    parse: function(a) {
                        return [a[1], a[2], a[3], a[4]]
                    }
                }, {
                    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                    parse: function(a) {
                        return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
                    }
                }, {
                    re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
                    parse: function(a) {
                        return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
                    }
                }, {
                    re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
                    parse: function(a) {
                        return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
                    }
                }]
            }
        }).factory("Color", ["Helper",
            function(a) {
                return {
                    value: {
                        h: 1,
                        s: 1,
                        b: 1,
                        a: 1
                    },
                    rgb: function() {
                        var a = this.toRGB();
                        return "rgb(" + a.r + "," + a.g + "," + a.b + ")"
                    },
                    rgba: function() {
                        var a = this.toRGB();
                        return "rgba(" + a.r + "," + a.g + "," + a.b + "," + a.a + ")"
                    },
                    hex: function() {
                        return this.toHex()
                    },
                    RGBtoHSB: function(a, b, c, d) {
                        a /= 255, b /= 255, c /= 255;
                        var e, f, g, h;
                        return g = Math.max(a, b, c), h = g - Math.min(a, b, c), e = 0 === h ? null : g === a ? (b - c) / h : g === b ? (c - a) / h + 2 : (a - b) / h + 4, e = (e + 360) % 6 * 60 / 360, f = 0 === h ? 0 : h / g, {
                            h: e || 1,
                            s: f,
                            b: g,
                            a: d || 1
                        }
                    },
                    setColor: function(b) {
                        b = b.toLowerCase();
                        for (var c in a.stringParsers)
                            if (a.stringParsers.hasOwnProperty(c)) {
                                var d = a.stringParsers[c],
                                    e = d.re.exec(b),
                                    f = e && d.parse(e);
                                if (f) return this.value = this.RGBtoHSB.apply(null, f), !1
                            }
                    },
                    setHue: function(a) {
                        this.value.h = 1 - a
                    },
                    setSaturation: function(a) {
                        this.value.s = a
                    },
                    setLightness: function(a) {
                        this.value.b = 1 - a
                    },
                    setAlpha: function(a) {
                        this.value.a = parseInt(100 * (1 - a), 10) / 100
                    },
                    toRGB: function(a, b, c, d) {
                        a || (a = this.value.h, b = this.value.s, c = this.value.b), a *= 360;
                        var e, f, g, h, i;
                        return a = a % 360 / 60, i = c * b, h = i * (1 - Math.abs(a % 2 - 1)), e = f = g = c - i, a = ~~a, e += [i, h, 0, 0, h, i][a], f += [h, i, i, h, 0, 0][a], g += [0, 0, h, i, i, h][a], {
                            r: Math.round(255 * e),
                            g: Math.round(255 * f),
                            b: Math.round(255 * g),
                            a: d || this.value.a
                        }
                    },
                    toHex: function(a, b, c, d) {
                        var e = this.toRGB(a, b, c, d);
                        return "#" + (1 << 24 | parseInt(e.r, 10) << 16 | parseInt(e.g, 10) << 8 | parseInt(e.b, 10)).toString(16).substr(1)
                    }
                }
            }
        ]).factory("Slider", ["Helper",
            function(b) {
                var c = {
                        maxLeft: 0,
                        maxTop: 0,
                        callLeft: null,
                        callTop: null,
                        knob: {
                            top: 0,
                            left: 0
                        }
                    },
                    d = {};
                return {
                    getSlider: function() {
                        return c
                    },
                    getLeftPosition: function(a) {
                        return Math.max(0, Math.min(c.maxLeft, c.left + ((a.pageX || d.left) - d.left)))
                    },
                    getTopPosition: function(a) {
                        return Math.max(0, Math.min(c.maxTop, c.top + ((a.pageY || d.top) - d.top)))
                    },
                    setSlider: function(e, f) {
                        var g = b.closestSlider(e.target),
                            h = b.getOffset(g, f);
                        c.knob = g.children[0].style, c.left = e.pageX - h.left - a.pageXOffset + h.scrollX, c.top = e.pageY - h.top - a.pageYOffset + h.scrollY, d = {
                            left: e.pageX,
                            top: e.pageY
                        }
                    },
                    setSaturation: function(a, b) {
                        c = {
                            maxLeft: 100,
                            maxTop: 100,
                            callLeft: "setSaturation",
                            callTop: "setLightness"
                        }, this.setSlider(a, b)
                    },
                    setHue: function(a, b) {
                        c = {
                            maxLeft: 0,
                            maxTop: 100,
                            callLeft: !1,
                            callTop: "setHue"
                        }, this.setSlider(a, b)
                    },
                    setAlpha: function(a, b) {
                        c = {
                            maxLeft: 0,
                            maxTop: 100,
                            callLeft: !1,
                            callTop: "setAlpha"
                        }, this.setSlider(a, b)
                    },
                    setKnob: function(a, b) {
                        c.knob.top = a + "px", c.knob.left = b + "px"
                    }
                }
            }
        ]).directive("colorpicker", ["$document", "$compile", "Color", "Slider", "Helper",
            function(a, c, d, e, f) {
                return {
                    require: "?ngModel",
                    restrict: "A",
                    link: function(g, h, i, j) {
                        var k, l = i.colorpicker ? i.colorpicker : "hex",
                            m = b.isDefined(i.colorpickerPosition) ? i.colorpickerPosition : "bottom",
                            n = b.isDefined(i.colorpickerInline) ? i.colorpickerInline : !1,
                            o = b.isDefined(i.colorpickerFixedPosition) ? i.colorpickerFixedPosition : !1,
                            p = b.isDefined(i.colorpickerParent) ? h.parent() : b.element(document.body),
                            q = b.isDefined(i.colorpickerWithInput) ? i.colorpickerWithInput : !1,
                            r = q ? '<input type="text" name="colorpicker-input">' : "",
                            s = n ? "" : '<button type="button" class="close close-colorpicker">&times;</button>',
                            t = '<div class="colorpicker dropdown"><div class="dropdown-menu"><colorpicker-saturation><i></i></colorpicker-saturation><colorpicker-hue><i></i></colorpicker-hue><colorpicker-alpha><i></i></colorpicker-alpha><colorpicker-preview></colorpicker-preview>' + r + s + "</div></div>",
                            u = b.element(t),
                            v = d,
                            w = u.find("colorpicker-hue"),
                            x = u.find("colorpicker-saturation"),
                            y = u.find("colorpicker-preview"),
                            z = u.find("i");
                        if (c(u)(g), q) {
                            var A = u.find("input");
                            A.on("mousedown", function(a) {
                                a.stopPropagation()
                            }).on("keyup", function(a) {
                                var b = this.value;
                                h.val(b), j && g.$apply(j.$setViewValue(b)), a.stopPropagation(), a.preventDefault()
                            }), h.on("keyup", function() {
                                A.val(h.val())
                            })
                        }
                        var B = function() {
                            a.on("mousemove", D), a.on("mouseup", E)
                        };
                        "rgba" === l && (u.addClass("alpha"), k = u.find("colorpicker-alpha"), k.on("click", function(a) {
                            e.setAlpha(a, o), D(a)
                        }).on("mousedown", function(a) {
                            e.setAlpha(a, o), B()
                        })), w.on("click", function(a) {
                            e.setHue(a, o), D(a)
                        }).on("mousedown", function(a) {
                            e.setHue(a, o), B()
                        }), x.on("click", function(a) {
                            e.setSaturation(a, o), D(a)
                        }).on("mousedown", function(a) {
                            e.setSaturation(a, o), B()
                        }), o && u.addClass("colorpicker-fixed-position"), u.addClass("colorpicker-position-" + m), "true" === n && u.addClass("colorpicker-inline"), p.append(u), j && (j.$render = function() {
                            h.val(j.$viewValue)
                        }, g.$watch(i.ngModel, function() {
                            F()
                        })), h.on("$destroy", function() {
                            u.remove()
                        });
                        var C = function() {
                                try {
                                    y.css("backgroundColor", v[l]())
                                } catch (a) {
                                    y.css("backgroundColor", v.toHex())
                                }
                                x.css("backgroundColor", v.toHex(v.value.h, 1, 1, 1)), "rgba" === l && (k.css.backgroundColor = v.toHex())
                            },
                            D = function(a) {
                                var b = e.getLeftPosition(a),
                                    c = e.getTopPosition(a),
                                    d = e.getSlider();
                                e.setKnob(c, b), d.callLeft && v[d.callLeft].call(v, b / 100), d.callTop && v[d.callTop].call(v, c / 100), C();
                                var f = v[l]();
                                return h.val(f), j && g.$apply(j.$setViewValue(f)), q && A.val(f), !1
                            },
                            E = function() {
                                a.off("mousemove", D), a.off("mouseup", E)
                            },
                            F = function() {
                                v.setColor(h.val()), z.eq(0).css({
                                    left: 100 * v.value.s + "px",
                                    top: 100 - 100 * v.value.b + "px"
                                }), z.eq(1).css("top", 100 * (1 - v.value.h) + "px"), z.eq(2).css("top", 100 * (1 - v.value.a) + "px"), C()
                            },
                            G = function() {
                                var a, c = f.getOffset(h[0]);
                                return b.isDefined(i.colorpickerParent) && (c.left = 0, c.top = 0), "top" === m ? a = {
                                    top: c.top - 147,
                                    left: c.left
                                } : "right" === m ? a = {
                                    top: c.top,
                                    left: c.left + 126
                                } : "bottom" === m ? a = {
                                    top: c.top + h[0].offsetHeight + 2,
                                    left: c.left
                                } : "left" === m && (a = {
                                    top: c.top,
                                    left: c.left - 150
                                }), {
                                    top: a.top + "px",
                                    left: a.left + "px"
                                }
                            },
                            H = function() {
                                J()
                            };
                        n === !1 ? h.on("click", function() {
                            F(), u.addClass("colorpicker-visible").css(G()), a.on("mousedown", H)
                        }) : (F(), u.addClass("colorpicker-visible").css(G())), u.on("mousedown", function(a) {
                            a.stopPropagation(), a.preventDefault()
                        });
                        var I = function(a) {
                                j && g.$emit(a, {
                                    name: i.ngModel,
                                    value: j.$modelValue
                                })
                            },
                            J = function() {
                                u.hasClass("colorpicker-visible") && (u.removeClass("colorpicker-visible"), I("colorpicker-closed"), a.off("mousedown", H))
                            };
                        u.find("button").on("click", function() {
                            J()
                        })
                    }
                }
            }
        ]), b.module("app.directives.rightclick", []).directive("rightClick", ["$compile",
            function(a) {
                return {
                    restrict: "EA",
                    link: function(b, c) {
                        var d;
                        $(c).on("contextmenu", function(e) {
                            if (e.preventDefault(), d && d[0] && d.remove(), "0" == b.categoryId) {
                                d = $('<ul class="right-menu dropdown-menu"></ul>'), d.appendTo($(c)), d.css({
                                    left: e.pageX - $(c).offset().left,
                                    top: e.pageY - $(c).offset().top
                                }).show();
                                for (var f in b.myTags) {
                                    var g = '<li class="tag_list" ng-class="{selected: dropTagIndex == ' + f + '}" ng-click="selectTag(' + b.myTags[f].id + "," + f + ')">' + b.myTags[f].name + "</li>",
                                        h = a(g)(b);
                                    d.append(h)
                                }
                                var i = a('<li class="tag_list add_cate clearfix" style="border-top:1px solid #ccc;margin-bottom:0px;" ng-click="createCategory()"><em>+</em><span>创建分类</span></li>')(b);
                                d.append(i);
                                var j = a('<li class="btn-main" style="width:100%; padding:0px; border: 0;margin:0px;height:25px; line-height:25px;"><a style="height:25px;line-height:25px;text-indent:0;color:#FFF;padding:0px;text-align:center;" ng-click="setCategory(' + b.dropTagIndex + "," + b.img.id + ')">确定</a></li>')(b);
                                d.append(j), $(j).on("click", function() {
                                    d.hide()
                                }), $(document).mousemove(function(a) {
                                    (a.pageX < d.offset().left - 20 || a.pageX > d.offset().left + d.width() + 20 || a.pageY < d.offset().top - 20 || a.pageY > d.offset().top + d.height() + 20) && (d.hide(), $(this).unbind("mousemove"))
                                })
                            }
                        })
                    }
                }
            }
        ]), b.module("app.directives.dataDraggable", []).directive("itemDraggable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    $(b).draggable({
                        zIndex: 2700,
                        scroll: !1,
                        iframeFix: !1,
                        revert: !1,
                        helper: "clone"
                    })
                }
            }
        }).directive("itemDroppable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    $(b).droppable({
                        hoverClass: "active",
                        out: function() {},
                        drop: function(b, c) {
                            a.$parent.associateData[$(b.target).attr("item-id")] = c.draggable.attr("item-id");
                            var d = $(b.target).find(".list_darggable");
                            d.length > 0 && (delete a.$parent.associateData[$(b.target).attr("item-id")], $(".item_remove_droppable").append(d)), c.draggable.css({
                                left: 0,
                                top: 0
                            }).prependTo(this)
                        }
                    })
                }
            }
        }).directive("itemRemoveDroppable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    $(b).droppable({
                        hoverClass: "active",
                        drop: function(b, c) {
                            $(c.draggable).parents(".list_attribute").length > 0 && delete a.$parent.associateData[$(c.draggable).parents(".list_attribute").attr("item-id")], c.draggable.css({
                                left: 0,
                                top: 0
                            }).appendTo(this)
                        }
                    })
                }
            }
        }), b.module("app.directives.limitInput", []).directive("limitInput", function() {
            return {
                require: "ngModel",
                link: function(a, b, c, d) {
                    "transform" == c.cssItem && a.$on("updateTransform", function(a, b) {
                        d.$setViewValue(parseInt(b, 10)), d.$render()
                    }), "borderRadius" == c.cssItem && a.$on("updateMaxRadius", function(b, c) {
                        a.maxRadius = parseInt(Math.min($(c).outerWidth(), $(c).outerHeight()) / 2 + 10, 10), a.maxRadius < a.model.borderRadius && (d.$setViewValue(a.maxRadius), d.$render()), a.$apply()
                    }), a.$watch(function() {
                        return $(b).val()
                    }, function(a) {
                        +a > c.max && (d.$setViewValue(c.max), d.$render()), +a < c.min && (d.$setViewValue(c.min), d.$render())
                    })
                }
            }
        }), b.module("app.directives.lineChart", []).directive("lineChart", ["$compile",
            function() {
                return {
                    restrict: "EA",
                    link: function(a, b, c) {
                        var d, e;
                        a.$watch(function() {
                            return c.data
                        }, function() {
                            c.data && (d = JSON.parse(c.data)), e ? (e.destroy(), e = new Chart(b[0].getContext("2d")).Line(d)) : e = new Chart(b[0].getContext("2d")).Line(d)
                        })
                    }
                }
            }
        ]), b.module("app.directives.loading", []).directive("loginLoading", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    a.$on("loginLoading", function() {
                        var a = $('<div class="homeMask" style="position: absolute;width: 100%;top:0;bottom:0;background-color:#ccc;opacity:0.8;">正在跳转，请稍后...</div>');
                        a.appendTo($(b))
                    })
                }
            }
        }), b.module("app.directives.comp.editor", []).directive("mapEditor", function() {
            return {
                restrict: "AE",
                templateUrl: "directives/mapeditor.tpl.html",
                link: function(a) {
                    var b = new BMap.Map("l-map");
                    b.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
                    var c = {
                            onSearchComplete: function(a) {
                                if (d.getStatus() == BMAP_STATUS_SUCCESS) {
                                    for (var b = [], c = 0; c < a.getCurrentNumPois(); c++) b.push(a.getPoi(c).title + ", " + a.getPoi(c).address);
                                    document.getElementById("r-result").innerHTML = b.join("<br/>")
                                }
                            }
                        },
                        d = new BMap.LocalSearch(b, c);
                    a.searchAddress = function() {
                        d.search(a.address)
                    }
                }
            }
        }), b.module("app.directives.notification", []).directive("notificationFadeout", ["i18nNotifications",
            function(a) {
                return {
                    restrict: "EA",
                    link: function(b, c) {
                        var d = $(c);
                        d.fadeOut(4e3, function() {
                            a.remove(b.notification)
                        })
                    }
                }
            }
        ]), b.module("app.directives.pageTplTypes", []).directive("pageTplTypes", ["pageTplService",
            function(a) {
                return {
                    restrict: "EA",
                    replace: !0,
                    templateUrl: "directives/page-tpl-types.tpl.html",
                    link: function(b) {
                        a.getPageTplTypes().then(function(a) {
                            b.pageTplTypes = a.data.list && a.data.list.length > 0 ? a.data.list : []
                        })
                    }
                }
            }
        ]), b.module("app.directives.pieChart", []).directive("pieChart", ["$compile",
            function() {
                return {
                    restrict: "EA",
                    link: function(a, b, c) {
                        var d, e;
                        a.$watch(function() {
                            return c.data
                        }, function() {
                            c.data && (e = JSON.parse(c.data)), d ? (d.destroy(), d = new Chart(b[0].getContext("2d")).Pie(e)) : d = new Chart(b[0].getContext("2d")).Pie(e)
                        })
                    }
                }
            }
        ]), b.module("app.directives.qrcode", []).directive("qrCode", function() {
            return {
                restrict: "A",
                link: function(a, b, c) {
                    a.$watch(function() {
                        return c.qrUrl
                    }, function() {
                        $("canvas", b).length > 0 && $("canvas", b).remove(), c.qrUrl && $(b).qrcode({
                            render: "canvas",
                            width: 200,
                            height: 200,
                            text: c.qrUrl + (/\?/.test(c.qrUrl) ? "&" : "?") + "eqrcode=1"
                        })
                    })
                }
            }
        }), b.module("app.directives.register", []).directive("qqButton", function() {
            return {
                restrict: "EA",
                scope: {
                    someCtrlFn: "&callbackFn",
                    openid: "=",
                    accesstoken: "="
                },
                link: function(a, b, c) {
                    QC.Login({
                        btnId: c.id,
                        scope: "all"
                    }, function(b) {
                        var c = b;
                        QC.Login.check() && QC.Login.getMe(function(b, d) {
                            a.openid = b, a.accesstoken = d, a.someCtrlFn({
                                arg1: {
                                    openId: b,
                                    accessToken: d,
                                    type: "qq",
                                    userInfo: c
                                }
                            })
                        })
                    }, function() {
                        alert("QQ登录 注销成功")
                    }), $("#qqLoginBtn a").removeAttr("onclick").click(function() {
                        alert("第三方注册功能即将开放")
                    })
                }
            }
        }).directive("wbButton", function() {
            return {
                restrict: "EA",
                link: function() {
                    WB2.anyWhere(function(a) {
                        a.widget.connectButton({
                            id: "wb_connect_btn",
                            type: "3,2",
                            callback: {
                                login: function() {},
                                logout: function() {}
                            }
                        })
                    }), $("#wb_connect_btn").removeAttr("onclick").click(function(a) {
                        return a.stopPropagation(), a.preventDefault(), alert("新浪微博注册功能即将开放"), !1
                    })
                }
            }
        }), b.module("app.directives.responsiveImage", []).directive("responsiveImage", ["$compile",
            function() {
                return {
                    restrict: "EA",
                    link: function(a, b) {
                        "0" != a.fileType && $(b).bind("load", function() {
                            $(this).removeAttr("style");
                            var a = $(this).parent().width(),
                                b = $(this).parent().height();
                            this.width > this.height ? (this.style.width = a + "px", this.style.height = this.height * a / this.width + "px", this.style.top = "50%", this.style.marginTop = "-" + this.height / 2 + "px") : (this.style.height = b + "px", this.style.width = this.width * b / this.height + "px", this.style.left = "50%", this.style.marginLeft = "-" + this.width / 2 + "px")
                        })
                    }
                }
            }
        ]), b.module("app.directives.numChangeAnim", []).directive("numChangeAnim", ["$filter",
            function(a) {
                return {
                    restrict: "A",
                    scope: {
                        content: "@"
                    },
                    link: function(b, c) {
                        function d(a, b) {
                            return Math.floor(a + Math.random() * (b - a))
                        }

                        function e(a, b) {
                            a = a > 0 ? a : 1;
                            for (var c = Math.floor(Math.log10(a)), e = Math.floor(a / Math.pow(10, c)), f = 0, g = 10, h = 0; g > h; h++)! function(h) {
                                setTimeout(function() {
                                    if (10 > g) f = h;
                                    else {
                                        var i = c > h ? h : c,
                                            j = Math.pow(10, i) * e;
                                        j = j.toString().length == a.toString().length ? a : j, f = d(f, j)
                                    }
                                    b(f, 9 == h)
                                }, (h * h + h + 2) / 2 * 30)
                            }(h)
                        }

                        function f(b, c) {
                            $(b).children("span").text(a("number")(c))
                        }
                        b.$watch("content", function(a) {
                            if (a) {
                                var b = parseInt(a, 10);
                                e(b, function(a, d) {
                                    f(c, a), d && (f(c, b), $(c).addClass("heartbeat").css({
                                        "animation-duration": "1s"
                                    }))
                                })
                            }
                        })
                    }
                }
            }
        ]), b.module("app.directives.style", []).directive("panelDraggable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    a.$on("$destroy", function() {
                        $(b).draggable(), $(b).draggable("destroy"), b = null
                    }), b.on("$destroy", function() {
                        $(b).draggable(), $(b).draggable("destroy"), b = null
                    }), $(b).draggable()
                }
            }
        }), b.module("app.directives.component", ["services.scene"]).directive("compDraggable", function() {
            return {
                restrict: "A",
                link: function(a, b, c) {
                    a.$on("$destroy", function() {
                        $(b).draggable(), $(b).draggable("destroy"), b = null
                    }), b.on("$destroy", function() {
                        $(b).draggable(), $(b).draggable("destroy"), b = null
                    }), $(b).draggable({
                        revert: !1,
                        stack: ".comp-draggable",
                        helper: "panel" == c.compDraggable || "page" == c.compDraggable ? "clone" : "",
                        appendTo: "parent",
                        containment: "panel" == c.compDraggable || "page" == c.compDraggable ? "" : "parent",
                        zIndex: 1049,
                        opacity: .35,
                        stop: function(a) {
                            $(a.toElement).one("click", function(a) {
                                a.stopImmediatePropagation()
                            })
                        }
                    })
                }
            }
        }).directive("compDroppable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    a.$on("$destroy", function() {
                        $(b).droppable(), $(b).droppable("destroy"), b = null
                    }), b.on("$destroy", function() {
                        $(b).droppable(), $(b).droppable("destroy"), b = null
                    }), $(b).droppable({
                        accept: ".comp-draggable",
                        hoverClass: "drop-hover",
                        drop: function(b, c) {
                            if (3 != c.draggable.attr("ctype")) {
                                var d = {
                                    left: c.offset.left - $(this).offset().left + "px",
                                    top: c.offset.top - $(this).offset().top + "px"
                                };
                                "panel" == c.draggable.attr("comp-draggable") ? a.createComp(c.draggable.attr("ctype"), d) : a.updateCompPosition(c.draggable.attr("id"), d)
                            } else a.createComp(3)
                        }
                    })
                }
            }
        }).directive("compSortable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    $(b).sortable({
                        axis: "y",
                        update: function() {}
                    })
                }
            }
        }).directive("compResizable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    $(b).resizable({
                        autoHide: !1,
                        containment: "parent",
                        stop: function(b, c) {
                            if ("4" == $(c.element).attr("ctype").charAt(0)) {
                                var d = {
                                    width: c.size.width,
                                    height: c.size.height,
                                    imgStyle: {
                                        width: c.element.find("img").width(),
                                        height: c.element.find("img").height(),
                                        marginTop: c.element.find("img").css("marginTop"),
                                        marginLeft: c.element.find("img").css("marginLeft")
                                    }
                                };
                                a.updateCompSize(c.element.attr("id"), d)
                            } else a.updateCompSize(c.element.attr("id"), c.size);
                            $(b.toElement).one("click", function(a) {
                                a.stopImmediatePropagation()
                            })
                        },
                        resize: function(a, c) {
                            var d = $(b).find("img").width() / $(b).find("img").height();
                            if ("4" == $(c.element).attr("ctype").charAt(0)) {
                                var e = c.size.width / c.size.height,
                                    f = c.element.find("img");
                                d >= e ? (f.outerHeight(c.size.height), f.outerWidth(c.size.height * d), f.css("marginLeft", -(f.outerWidth() - c.size.width) / 2), f.css("marginTop", 0)) : (f.outerWidth(c.size.width), f.outerHeight(c.size.width / d), f.css("marginTop", -(f.outerHeight() - c.size.height) / 2), f.css("marginLeft", 0))
                            } else c.element.find(".element").outerWidth(c.size.width), c.element.find(".element").outerHeight(c.size.height)
                        }
                    })
                }
            }
        }).directive("photoDraggable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    a.$on("$destroy", function() {
                        $(b).draggable(), $(b).draggable("destroy"), b = null
                    }), b.on("$destroy", function() {
                        $(b).draggable(), $(b).draggable("destroy"), b = null
                    }), $(b).draggable({
                        revert: !1,
                        helper: "clone",
                        appendTo: ".img_list",
                        zIndex: 1049,
                        opacity: .35,
                        stop: function(a) {
                            $(a.toElement).one("click", function(a) {
                                a.stopImmediatePropagation()
                            })
                        }
                    })
                }
            }
        }).directive("cropDroppable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    a.$on("$destroy", function() {
                        $(b).droppable(), $(b).droppable("destroy"), b = null
                    }), b.on("$destroy", function() {
                        $(b).droppable(), $(b).droppable("destroy"), b = null
                    }), $(b).droppable({
                        accept: "li",
                        hoverClass: "drop-hover",
                        drop: function(b, c) {
                            a.preSelectImage(c.draggable.attr("photo-draggable"))
                        }
                    })
                }
            }
        }).directive("compRotate", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    var c = $(b),
                        d = $('<div class="bar bar-rotate bar-radius">');
                    c.append(d).append('<div class="bar bar-line">');
                    var e, f = {},
                        g = new Hammer(d.get(0));
                    g.get("pan").set({
                        threshold: 0
                    }), g.on("panstart", function() {
                        c.addClass("no-drag"), $("body").css({
                            "user-select": "none"
                        });
                        var a = c.parent();
                        f = {
                            x: parseFloat(c.css("left")) + a.offset().left + c.width() / 2,
                            y: parseFloat(c.css("top")) + a.offset().top + c.height() / 2
                        }
                    }), g.on("panmove", function(a) {
                        var b = a.center,
                            d = b.x - f.x,
                            g = b.y - f.y,
                            h = Math.abs(d / g);
                        e = Math.atan(h) / (2 * Math.PI) * 360, d > 0 && 0 > g ? e = 360 + e : d > 0 && g > 0 ? e = 180 - e : 0 > d && g > 0 ? e = 180 + e : 0 > d && 0 > g && (e = 360 - e), e > 360 && (e -= 360), c.css({
                            transform: "rotateZ(" + e + "deg)"
                        })
                    }), g.on("panend", function() {
                        c.removeClass("no-drag"), $("body").css({
                            "user-select": "initial",
                            cursor: "default"
                        }), a.updateCompAngle(c.attr("id"), e), a.$broadcast("updateTransform", e)
                    })
                }
            }
        }).directive("compDrag", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    var c, d = 0,
                        e = 0,
                        f = {},
                        g = {},
                        h = {},
                        i = {},
                        j = $(b),
                        k = j.parent(),
                        l = {
                            width: k.width(),
                            height: k.height()
                        },
                        m = new Hammer(j.get(0));
                    m.get("pan").set({
                        threshold: 0
                    }), m.on("panstart", function(a) {
                        if (a.preventDefault(), a.srcEvent.preventDefault(), !j.hasClass("no-drag")) {
                            j.css("opacity", .35), $("body").css({
                                "user-select": "none",
                                cursor: "default"
                            }), c = k.offset();
                            var b = {
                                width: j.width(),
                                height: j.height()
                            };
                            d = j.get(0).style.transform || j.get(0).style.webkitTransform || 0, d = d && d.replace("rotateZ(", "").replace("deg)", ""), d = d && parseFloat(d), d >= 90 && 180 > d && (d = 180 - d), d >= 180 && 270 > d && (d = 270 - d), d >= 270 && 360 > d && (d = 360 - d), e = 2 * d * Math.PI / 360;
                            var m = 0 == e ? b.height : (b.width / 2 + b.height / 2 / Math.tan(e)) * Math.sin(e) * 2,
                                n = 0 == e ? b.width : (b.width / 2 + b.height / 2 / Math.tan(Math.PI / 2 - e)) * Math.sin(Math.PI / 2 - e) * 2;
                            i = {
                                height: m,
                                width: n
                            }, h = j.offset();
                            var o = j.position();
                            g = a.center, g.top = g.y - o.top, g.bottom = g.y + l.height - (o.top + i.height), g.left = g.x - o.left, g.right = g.x + l.width - (o.left + i.width), f.x = a.center.x - (parseFloat(j.css("left")) + c.left), f.y = a.center.y - (parseFloat(j.css("top")) + c.top)
                        }
                    }), m.on("panmove", function(a) {
                        a.preventDefault(), "img" == a.target.tagName.toLowerCase() && (a.target.ondragstart = function() {
                            return !1
                        }), j.hasClass("no-drag") || (a.center.y >= g.top && a.center.y <= g.bottom && j.css("top", a.center.y - c.top - f.y), a.center.x >= g.left && a.center.x <= g.right && j.css("left", a.center.x - c.left - f.x))
                    }), m.on("panend", function(b) {
                        j.css("opacity", 1), $("body").css({
                            "user-select": "initial",
                            cursor: "default"
                        });
                        var c = (j.position(), {
                            top: j.css("top"),
                            left: j.css("left")
                        });
                        a.updateCompPosition(j.attr("id"), c), $(b.srcEvent.target).one("click", function(a) {
                            return a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault(), !1
                        })
                    })
                }
            }
        }).directive("compResize", function() {
            function a(a, b, c, d) {
                var e = {},
                    f = a / b,
                    g = c / d;
                return f > g ? (e.width = c, e.height = c / f) : (e.height = d, e.width = d * f), e
            }

            function b(b) {
                var c = b.children(".element-box"),
                    d = {
                        width: c.width(),
                        height: c.height()
                    };
                if ("4" == b.attr("ctype").charAt(0)) {
                    var e = b.find("img"),
                        f = e.width() / e.height(),
                        g = d.width / d.height;
                    f >= g ? (e.outerHeight(d.height), e.outerWidth(d.height * f), e.css("marginLeft", -(e.outerWidth() - d.width) / 2), e.css("marginTop", 0)) : (e.outerWidth(d.width), e.outerHeight(d.width / f), e.css("marginTop", -(e.outerHeight() - d.height) / 2), e.css("marginLeft", 0))
                } else if ("p" == b.attr("ctype").charAt(0)) {
                    var h = b.find("li"),
                        i = b.find("img");
                    i.each(function(b) {
                        var c = $(this),
                            e = a(c.width(), c.height(), d.width, d.height);
                        c.css({
                            width: e.width,
                            height: e.height
                        }), h.eq(b).css({
                            lineHeight: d.height + "px"
                        })
                    })
                } else b.find(".element").css({
                    width: d.width,
                    height: d.height
                })
            }

            function c(a, b) {
                var c = {
                    width: b.width(),
                    height: b.height()
                };
                if ("4" == b.attr("ctype").charAt(0)) {
                    var d = b.find("img"),
                        e = {
                            width: c.width,
                            height: c.height,
                            imgStyle: {
                                width: d.width(),
                                height: d.height(),
                                marginTop: d.css("marginTop"),
                                marginLeft: d.css("marginLeft")
                            }
                        };
                    a.updateCompSize(b.attr("id"), e)
                } else if ("p" == b.attr("ctype").charAt(0)) {
                    var f = b.find(".slide"),
                        g = f.find(".dot"),
                        h = f.attr("id"),
                        i = f.attr("length");
                    INTERVAL_OBJ[h] && (clearInterval(INTERVAL_OBJ[h]), delete INTERVAL_OBJ[h]), f.swipeSlide({
                        autoSwipe: "true" == f.attr("autoscroll"),
                        continuousScroll: !0,
                        speed: f.attr("interval"),
                        transitionType: "cubic-bezier(0.22, 0.69, 0.72, 0.88)",
                        lazyLoad: !0,
                        clone: !1,
                        length: i
                    }, function(a, b) {
                        --a < 0 && (a = i - 1), g.children().eq(a).addClass("cur").siblings().removeClass("cur"), b && (INTERVAL_OBJ[h] = b)
                    }), a.updateCompSize(b.attr("id"), c)
                } else a.updateCompSize(b.attr("id"), c)
            }

            function d(a, d, f, g) {
                var h, i, j, k, l = $(d),
                    m = l.closest("ul"),
                    n = 0,
                    o = 0,
                    p = parseFloat(l.css("min-width") || 50),
                    q = parseFloat(l.css("min-height") || 30),
                    r = new Hammer($(f).get(0));
                r.get("pan").set({
                    threshold: 0,
                    direction: Hammer.DIRECTION_ALL
                }), r.on("panstart", function() {
                    l.addClass("no-drag"), h = l.width(), i = l.height(), j = parseFloat(l.css("left")), k = parseFloat(l.css("top")), m.css("cursor", g), $("body").css({
                        "user-select": "none",
                        cursor: "default"
                    }), n = l.get(0).style.transform, n = n && n.replace("rotateZ(", "").replace("deg)", ""), n = n && parseFloat(n), o = 2 * n * Math.PI / 360
                }), r.on("panmove", function(a) {
                    switch (g) {
                        case e.RESIZE_W:
                            if (h - a.deltaX <= p) break;
                            l.css({
                                left: j + a.deltaX,
                                width: h - a.deltaX
                            });
                            break;
                        case e.RESIZE_E:
                            l.css({
                                width: h + a.deltaX
                            });
                            break;
                        case e.RESIZE_N:
                            if (i - a.deltaY <= q) break;
                            l.css({
                                top: k + a.deltaY,
                                height: i - a.deltaY
                            });
                            break;
                        case e.RESIZE_S:
                            l.css({
                                height: i + a.deltaY
                            });
                            break;
                        case e.RESIZE_SE:
                            l.css({
                                height: i + a.deltaY,
                                width: h + a.deltaX
                            });
                            break;
                        case e.RESIZE_SW:
                            if (h - a.deltaX <= p) break;
                            l.css({
                                left: j + a.deltaX,
                                height: i + a.deltaY,
                                width: h - a.deltaX
                            });
                            break;
                        case e.RESIZE_NE:
                            if (i - a.deltaY <= q) break;
                            l.css({
                                top: k + a.deltaY,
                                height: i - a.deltaY,
                                width: h + a.deltaX
                            });
                            break;
                        case e.RESIZE_NW:
                            i - a.deltaY > q && l.css("top", k + a.deltaY), h - a.deltaX > p && l.css("left", j + a.deltaX), l.css({
                                height: i - a.deltaY,
                                width: h - a.deltaX
                            })
                    }
                    a.deltaX > 0 && l.width() > 320 - parseFloat(l.css("left")) && l.width(320 - parseFloat(l.css("left"))), a.deltaX < 0 && l.width() > j + h && (l.width(j + h), l.css("left", 0)), a.deltaY > 0 && l.height() > 486 - parseFloat(l.css("top")) && l.height(486 - parseFloat(l.css("top"))), a.deltaY < 0 && l.height() > k + i && (l.height(k + i), l.css("top", 0)), b(l)
                }), r.on("panend", function() {
                    l.removeClass("no-drag"), m.css("cursor", "default"), $("body").css({
                        "user-select": "initial",
                        cursor: "default"
                    }), c(a, l), a.$broadcast("updateMaxRadius", l)
                })
            }
            var e = {
                RESIZE_W: "w-resize",
                RESIZE_E: "e-resize",
                RESIZE_N: "n-resize",
                RESIZE_S: "s-resize",
                RESIZE_SE: "se-resize",
                RESIZE_SW: "sw-resize",
                RESIZE_NE: "ne-resize",
                RESIZE_NW: "nw-resize"
            };
            return {
                restrict: "A",
                link: function(a, b) {
                    var c = b,
                        f = $('<div class="bar bar-n" >'),
                        g = $('<div class="bar bar-s" >'),
                        h = $('<div class="bar bar-e" >'),
                        i = $('<div class="bar bar-w" >'),
                        j = $('<div class="bar bar-ne bar-radius">'),
                        k = $('<div class="bar bar-nw bar-radius">'),
                        l = $('<div class="bar bar-se bar-radius">'),
                        m = $('<div class="bar bar-sw bar-radius">');
                    c.append(f).append(g).append(h).append(i).append(j).append(k).append(l).append(m).unbind("mousedown").mousedown(function() {
                        $(this).children(".bar").show().end().siblings().children(".bar").hide()
                    }), c.parent().unbind("mousedown").mousedown(function(b) {
                        $(b.target).closest("li").length || ($(this).children("li").find(".bar").hide(), a.$emit("hideStylePanel"))
                    }), d(a, c, h, e.RESIZE_E), d(a, c, i, e.RESIZE_W), d(a, c, f, e.RESIZE_N), d(a, c, g, e.RESIZE_S), d(a, c, j, e.RESIZE_NE), d(a, c, k, e.RESIZE_NW), d(a, c, l, e.RESIZE_SE), d(a, c, m, e.RESIZE_SW)
                }
            }
        }).directive("pasteElement", ["sceneService",
            function(a) {
                function b() {
                    var b = $('<ul id="pasteMenu" class="dropdown-menu" style="min-width: 100px; display: block;" role="menu" aria-labelledby="dropdownMenu1">                            <li class="paste" role="presentation"><a role="menuitem" tabindex="-1"><div class="fa fa-paste" style="color: #08a1ef;"></div>&nbsp;&nbsp;粘贴</a></li>                    </ul>').css({
                        position: "absolute",
                        "user-select": "none"
                    });
                    return b.find(".paste").on("click", function() {
                        a.pasteElement(a.originalElemDef, a.copyElemDef, a.sameCopyCount), b.hide()
                    }), b
                }
                return {
                    restrict: "EA",
                    link: function(a, c) {
                        var d = $(c);
                        d.on("contextmenu", function(a) {
                            if (q) {
                                var c = b(),
                                    d = $("#pasteMenu");
                                d.length > 0 && d.remove(), $("#eq_main").append(c), c.css({
                                    left: a.pageX + $("#eq_main").scrollLeft() + 15,
                                    top: a.pageY + $("#eq_main").scrollTop()
                                }).show(), $("#eq_main").mousemove(function(a) {
                                    (a.pageX < $("#pasteMenu").offset().left - 20 || a.pageX > $("#pasteMenu").offset().left + $("#pasteMenu").width() + 20 || a.pageY < $("#pasteMenu").offset().top - 20 || a.pageY > $("#pasteMenu").offset().top + $("#pasteMenu").height() + 20) && ($("#pasteMenu").hide(), $(this).unbind("mousemove"))
                                })
                            }
                            return !1
                        })
                    }
                }
            }
        ]), b.module("app.directives.editor", []).directive("toolbar", ["$compile",
            function(a) {
                return {
                    restrict: "EA",
                    replace: !0,
                    templateUrl: "directives/toolbar.tpl.html",
                    link: function(c) {
                        c.internalLinks = b.copy(c.pages), c.internalLink || c.externalLink || (c.internalLink = c.internalLinks[0], c.externalLink = "http://");
                        var d = ["#000000", "#7e2412", "#ff5400", "#225801", "#0c529e", "#333333", "#b61b52", "#f4711f", "#3bbc1e", "#23a3d3", "#888888", "#d34141", "#f7951e", "#29b16a", "#97daf3", "#cccccc", "#ec7c7c", "#fdea02", "#79c450", "#563679", "#ffffff", "#ffcccc", "#d9ef7f", "#c3f649"],
                            e = $(".color-menu"),
                            f = $(".bgcolor-menu");
                        $.each(d, function(a, b) {
                            e.append($('<li><a dropdown-toggle class="btn" data-edit="foreColor ' + b + '" style="background-color: ' + b + '"></a></li>'))
                        }), a(e.append($('<li><a dropdown-toggle class="btn glyphicon glyphicon-remove" data-edit="foreColor transparent" style="background-color: transparent"></a></li>')))(c);
                        var g = function(a) {
                            var b = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                            a = a.replace(b, function(a, b, c, d) {
                                return b + b + c + c + d + d
                            });
                            var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
                            return c ? {
                                r: parseInt(c[1], 16),
                                g: parseInt(c[2], 16),
                                b: parseInt(c[3], 16)
                            } : null
                        };
                        $.each(d, function(a, b) {
                            var c = g(b);
                            f.append($('<li><a dropdown-toggle class="btn" data-edit="backColor rgba(' + c.r + "," + c.g + "," + c.b + ', 0.3)" style="background-color: rgba(' + c.r + "," + c.g + "," + c.b + ', 0.3)"></a></li>'))
                        }), a(f.append($('<li><a dropdown-toggle class="btn glyphicon glyphicon-remove" data-edit="backColor transparent" style="background-color: transparent"></a></li>')))(c)
                    }
                }
            }
        ]), b.module("app.directives.uislider", []).value("uiSliderConfig", {}).directive("uiSlider", ["uiSliderConfig", "$timeout",
            function(a, d) {
                return a = a || {}, {
                    require: "ngModel",
                    compile: function() {
                        return function(e, f, g, h) {
                            function i(a, b) {
                                return b ? parseFloat(a) : parseInt(a, 10)
                            }

                            function j() {
                                f.slider("destroy")
                            }
                            var k = b.extend(e.$eval(g.uiSlider) || {}, a),
                                l = {
                                    min: null,
                                    max: null
                                },
                                m = ["min", "max", "step"],
                                n = b.isUndefined(g.useDecimals) ? !1 : !0,
                                o = function() {
                                    b.isArray(h.$viewValue) && k.range !== !0 && (console.warn("Change your range option of ui-slider. When assigning ngModel an array of values then the range option should be set to true."), k.range = !0), b.forEach(m, function(a) {
                                        b.isDefined(g[a]) && (k[a] = i(g[a], n))
                                    }), f.slider(k), o = b.noop
                                };
                            b.forEach(m, function(a) {
                                g.$observe(a, function(b) {
                                    b && (o(), k[a] = i(b, n), f.slider("option", a, i(b, n)), h.$render())
                                })
                            }), g.$observe("disabled", function(a) {
                                o(), f.slider("option", "disabled", !!a)
                            }), e.$watch(g.uiSlider, function(a) {
                                o(), a !== c && f.slider("option", a)
                            }, !0), d(o, 0, !0), f.bind("slide", function(a, b) {
                                h.$setViewValue(b.values || b.value), e.$apply()
                            }), h.$render = function() {
                                o();
                                var a = k.range === !0 ? "values" : "value";
                                k.range || !isNaN(h.$viewValue) || h.$viewValue instanceof Array ? k.range && !b.isDefined(h.$viewValue) && (h.$viewValue = [0, 0]) : h.$viewValue = 0, k.range === !0 && (b.isDefined(k.min) && k.min > h.$viewValue[0] && (h.$viewValue[0] = k.min), b.isDefined(k.max) && k.max < h.$viewValue[1] && (h.$viewValue[1] = k.max), h.$viewValue[0] > h.$viewValue[1] && (l.min >= h.$viewValue[1] && (h.$viewValue[0] = l.min), l.max <= h.$viewValue[0] && (h.$viewValue[1] = l.max)), l.min = h.$viewValue[0], l.max = h.$viewValue[1]), f.slider(a, h.$viewValue)
                            }, e.$watch(g.ngModel, function() {
                                k.range === !0 && h.$render()
                            }, !0), f.bind("$destroy", j)
                        }
                    }
                }
            }
        ]), b.module("security.authorization", ["security.service"]).provider("securityAuthorization", {
            requireAdminUser: ["securityAuthorization",
                function(a) {
                    return a.requireAdminUser()
                }
            ],
            requireAuthenticatedUser: ["securityAuthorization",
                function(a) {
                    return a.requireAuthenticatedUser()
                }
            ],
            $get: ["security", "securityRetryQueue",
                function(a, b) {
                    var c = {
                        requireAuthenticatedUser: function() {
                            var d = a.requestCurrentUser().then(function() {
                                return a.isAuthenticated() ? void 0 : b.pushRetryFn("unauthenticated-client", c.requireAuthenticatedUser)
                            });
                            return d
                        },
                        requireAdminUser: function() {
                            var d = a.requestCurrentUser().then(function() {
                                return a.isAdmin() ? void 0 : b.pushRetryFn("unauthorized-client", c.requireAdminUser)
                            });
                            return d
                        }
                    };
                    return c
                }
            ]
        }), b.module("security", ["security.service", "security.interceptor", "security.login", "security.authorization"]), b.module("security.interceptor", ["security.retryQueue"]).factory("securityInterceptor", ["$injector", "$location", "securityRetryQueue",
            function(a, b, c) {
                return function(d) {
                    return d.then(null, function(e) {
                        if (401 === e.status) {
                            if ("/home" == b.path() || "/home/login" == b.path() || "/home/register" == b.path() || "/home/reset" == b.path() || "/agreement" == b.path() || "/reg" == b.path() || "/sample" == b.path() || "/error" == b.path()) return;
                            d = c.pushRetryFn("unauthorized-server", function() {
                                return a.get("$http")(e.config)
                            })
                        }
                        return 403 === e.status && (alert("对不起，您没有查看此内容的权限"), b.path("/home")), d
                    })
                }
            }
        ]).config(["$httpProvider",
            function(a) {
                a.responseInterceptors.push("securityInterceptor")
            }
        ]), b.module("security.login.form", ["services.localizedMessages", "app.directives.addelement"]).controller("LoginFormController", ["$scope", "$timeout", "security", "localizedMessages", "$location", "$sce",
            function(a, b, c, d, e, f) {
                a.user = {}, a.retrieve = {}, a.showLogin = !0, a.sendPassword = !1, a.unExist = !1, a.weiChatUrl = c.thirdPartyUrl.weiChatUrl, a.qqUrl = c.thirdPartyUrl.qqUrl, a.weiboUrl = c.thirdPartyUrl.weiboUrl, a.openWeibo = function() {
                    alert("新浪微博注册功能即将开放!")
                }, a.authError = null, a.isValidateCodeLogin = c.isValidateCodeLogin, a.validateCodeSrc = PREFIX_URL + "servlet/validateCodeServlet", a.authReason = null, c.getLoginReason() && (a.authReason = d.get(c.isAuthenticated() ? "login.reason.notAuthorized" : "login.reason.notAuthenticated")), a.rotate = function(c) {
                    $(".modal-content").addClass("flip"), $(".login-form-section").fadeOut(600), b(function() {
                        a.showLogin = !c, $(".login-form-section").fadeIn(0), $(".modal-content").removeClass("flip")
                    }, 600)
                }, a.login = function() {
                    a.authError = null;
                    var b = {
                        username: a.user.email,
                        password: a.user.password,
                        rememberMe: a.user.rememberMe
                    };
                    return !a.isValidateCodeLogin || (b.geetest_challenge = challenge, b.geetest_validate = validate, b.geetest_seccode = seccode, challenge && validate && seccode) ? a.user.email ? a.user.password ? void c.login($.param(b)).then(function(b) {
                        challenge = null, validate = null, seccode = null, b ? (selectorA && selectorA(".gt_refresh_button").click(), 1005 === b.code, a.isValidateCodeLogin = b.map.isValidateCodeLogin, a.authReason = "", a.authError = b.msg) : (a.authError = d.get("login.error.invalidCredentials"), submit = !1)
                    }, function(b) {
                        a.authError = d.get("login.error.serverError", {
                            exception: b
                        })
                    }) : (a.authReason = "", void(a.authError = "密码不能为空")) : (a.authReason = "", void(a.authError = "帐号不能为空")) : (a.authReason = "", void(a.authError = "验证码不能为空"))
                }, a.openRegister = function() {
                    e.path("/home/register", !1)
                }, a.clearForm = function() {
                    a.user = {}
                }, a.cancelLogin = function() {
                    c.cancelLogin()
                }, a.reset = function() {
                    a.user = {}, a.retrieve = {}
                };
                var g = "http://api.geetest.com/get.php?gt=1ebc844c9e3a8c23e2ea4b567a8afd2d&time=" + (new Date).getTime();
                a.validateCodeUrl = f.trustAsResourceUrl(g), b(function() {
                    $('input[name="userEmail"]').focus()
                }, 300), a.retrievePassword = function() {
                    return a.retrieve.email ? submit ? challenge && validate && seccode ? void c.retrievePassword(a.retrieve.email, challenge, validate, seccode).then(function(b) {
                        challenge = "", validate = "", seccode = "", 200 == b.data.code ? (a.sendPassword = !0, submit = !1) : (selectorA && selectorA(".gt_refresh_button").click(), 1003 == b.data.code ? a.retrieveError = "账号不存在" : 1005 == b.data.code && (a.retrieveError = "验证码错误"))
                    }) : void(a.retrieveError = "验证码不能为空") : void(a.retrieveError = "验证码匹配错误") : void(a.retrieveError = "邮箱不能为空")
                }
            }
        ]), b.module("security.login.reset", ["services.localizedMessages"]).controller("ResetFormController", ["$scope", "security", "localizedMessages", "$location", "resetKey",
            function(a, b, c, d, e) {
                a.password = {}, a.reset = function() {
                    return a.password.newPw != a.password.confirm ? (a.authError = c.get("login.reset.notmatch"), a.password.newPw = "", a.password.confirm = "", void $('input[name="newPassword"]').focus()) : void b.resetPassByKey(a.password.newPw, e).then(function(b) {
                        200 == b.data.code ? (alert("修改成功"), a.$close(), d.path("/main").search({})) : 1011 == b.data.code && (a.authError = b.data.msg)
                    })
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]).directive("equals", function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(a, b, c, d) {
                    if (d) {
                        a.$watch(c.ngModel, function() {
                            e()
                        }), c.$observe("equals", function() {
                            e()
                        });
                        var e = function() {
                            var a = d.$viewValue,
                                b = c.equals;
                            d.$setValidity("equals", a === b)
                        }
                    }
                }
            }
        }), b.module("security.login", ["security.login.form", "security.login.reset", "security.login.toolbar"]), b.module("security.login.toolbar", ["services.usercenter"]).directive("loginToolbar", ["security", "$rootScope", "usercenterService",
            function(a, b, c) {
                var d = {
                    templateUrl: "security/login/toolbar.tpl.html",
                    restrict: "E",
                    replace: !0,
                    scope: !0,
                    link: function(d) {
                        d.PREFIX_FILE_HOST = PREFIX_FILE_HOST, d.isAuthenticated = a.isAuthenticated, d.login = a.showLogin, d.logout = a.logout, d.requestResetPassword = a.requestResetPassword, d.isAdvancedUser = b.isAdvancedUser, d.isEditor = b.isEditor, d.isVendorUser = b.isVendorUser, d.$watch(function() {
                            return a.currentUser
                        }, function(a) {
                            d.currentUser = a, d.currentUser.headImg ? /^http.*/.test(a.headImg) && (d.headImg = a.headImg) : d.headImg = CLIENT_CDN + "images/defaultuser.jpg"
                        }), d.$on("minusCount", function(a, b) {
                            d.count -= b, d.newMsgCount = d.count > 9 ? "9+" : d.count
                        }), d.getNewMessage = function(a, b, e) {
                            c.getNewMessage(a, b, e).then(function(a) {
                                d.newMsgs = a.data.list, d.count = a.data.map.count, d.newMsgCount = a.data.map.count > 9 ? "9+" : a.data.map.count
                            })
                        }, d.getNewMessage(1, 4, !0), d.openMsgPanel = function() {
                            $(".mes_con").hasClass("open") || d.getNewMessage(1, 4, !0)
                        }
                    }
                };
                return d
            }
        ]), b.module("security.otherregister.form", ["services.localizedMessages", "app.directives.register"]), b.module("security.otherregister.form").controller("OtherRegisterFormController", ["$scope", "$timeout", "security", "localizedMessages", "$location", "$http", "$window", "otherRegisterInfo",
            function(a, b, c, d, e, f, g, h) {
                a.user = {}, a.user.agreement = !0, a.getUserDetail = function() {
                    var b = {
                        type: "qq",
                        openId: h.openId,
                        accessToken: h.accessToken
                    };
                    c.getUserDetail(b.type, b.openId, b.accessToken).then(function(b) {
                        a.otherUserInfo = b.data.obj
                    })
                }, a.getUserDetail()
            }
        ]), b.module("security.register.form", ["services.localizedMessages", "app.directives.register"]), b.module("security.register.form").controller("RegisterFormController", ["$scope", "$timeout", "security", "localizedMessages", "$location", "$http", "$window",
            function(a, b, c, d, e) {
                a.user = {}, a.user.agreement = !0, a.weiChatUrl = c.thirdPartyUrl.weiChatUrl, a.qqUrl = c.thirdPartyUrl.qqUrl, a.weiboUrl = c.thirdPartyUrl.weiboUrl, a.openWeibo = function() {
                    alert("新浪微博注册功能即将开放!")
                }, a.register = function() {
                    var b = {
                            email: a.user.email,
                            password: a.user.password
                        },
                        e = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    return e.test(a.user.email) ? void(a.user.password === a.user.repeatPassword && a.user.agreement ? c.register($.param(b)).then(function(b) {
                        b && (a.regErr = b.msg)
                    }, function(b) {
                        a.regErr = d.get("register.error.serverError", {
                            exception: b
                        })
                    }) : a.regErr = d.get(a.user.password != a.user.repeatPassword ? "register.error.match" : "register.error.agreement")) : void(a.regErr = "请输入正确的邮箱格式")
                }, a.checkUpperCase = function() {
                    /[A-Z]/g.test(a.user.email) && (a.user.email = a.user.email.toLowerCase(), alert("请用小写字母邮箱注册，已将邮箱中的大写字母自动转换成小写"))
                }, a.openLogin = function() {
                    e.path("/home/login", !1)
                }, a.reset = function() {
                    a.user = {}
                }
            }
        ]).controller("BindingController", ["$rootScope", "$scope", "$timeout", "security", "localizedMessages", "$location", "$http", "$window",
            function(a, b) {
                b.qq_url = "https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101149132&redirect_uri=" + redirect_uri + "&display=pc", b.weibo_url = "https://api.weibo.com/oauth2/authorize?client_id=3508809852&response_type=token&redirect_uri=" + PREFIX_HOST
            }
        ]), b.module("security.register", ["security.register.form", "security.otherregister.form"]), b.module("security.retryQueue", []).factory("securityRetryQueue", ["$q", "$log",
            function(a, d) {
                var e = [],
                    f = {
                        onItemAddedCallbacks: [],
                        hasMore: function() {
                            return e.length > 0
                        },
                        push: function(a) {
                            e.push(a), b.forEach(f.onItemAddedCallbacks, function(b) {
                                try {
                                    b(a)
                                } catch (c) {
                                    d.error("securityRetryQueue.push(retryItem): callback threw an error" + c)
                                }
                            })
                        },
                        pushRetryFn: function(b, d) {
                            1 === arguments.length && (d = b, b = c);
                            var e = a.defer(),
                                g = {
                                    reason: b,
                                    retry: function() {
                                        a.when(d()).then(function(a) {
                                            e.resolve(a)
                                        }, function(a) {
                                            e.reject(a)
                                        })
                                    },
                                    cancel: function() {
                                        e.reject()
                                    }
                                };
                            return f.push(g), e.promise
                        },
                        retryReason: function() {
                            return f.hasMore() && e[0].reason
                        },
                        cancelAll: function() {
                            for (; f.hasMore();) e.shift().cancel()
                        },
                        retryAll: function() {
                            for (; f.hasMore();) e.shift().retry()
                        }
                    };
                return f
            }
        ]), b.module("security.service", ["security.retryQueue", "security.login", "security.register", "ui.bootstrap.modal"]).factory("security", ["$http", "$q", "$location", "securityRetryQueue", "$modal", "ModalService",
            function(b, c, d, e, f, g) {
                function h(b) {
                    b = b || "/", a.location.href = b
                }

                function i() {
                    if (t && (j(t, !1), t = null), r) throw new Error("Trying to open a dialog that is already open!");
                    r = f.open({
                        windowClass: "login-container",
                        keyboard: !1,
                        templateUrl: "security/login/form.tpl.html",
                        controller: "LoginFormController"
                    }), r.result.then(k, k)
                }

                function j(a, b) {
                    a.close(b)
                }

                function k(a) {
                    r = null, a ? ("/home/login" == d.path() && d.path("/home", !1), e.retryAll()) : (e.cancelAll(), h())
                }

                function l(a) {
                    if (s) throw new Error("Trying to open a dialog that is already open!");
                    s = f.open({
                        windowClass: "login-container",
                        keyboard: !1,
                        templateUrl: "security/login/reset.tpl.html",
                        controller: "ResetFormController",
                        resolve: {
                            resetKey: function() {
                                return a
                            }
                        }
                    }), s.result.then(function() {
                        s = null
                    }, function() {
                        alert("cancel"), w.currentUser || d.path("/home", !1).search({}), s = null
                    })
                }

                function m() {
                    if (r && (j(r, !0), r = null), t) throw new Error("Trying to open a dialog that is already open!");
                    t = f.open({
                        windowClass: "login-container",
                        keyboard: !1,
                        templateUrl: "security/register/register.tpl.html",
                        controller: "RegisterFormController"
                    }), t.result.then(function() {
                        t = null
                    }, function() {
                        "/home/register" == d.path() && d.path("/home", !1), t = null
                    })
                }

                function n(a) {
                    if (u) throw new Error("Trying to open a dialog that is already open!");
                    u = f.open({
                        windowClass: "login-container",
                        keyboard: !1,
                        templateUrl: "security/register/otherregister.tpl.html",
                        controller: "OtherRegisterFormController",
                        resolve: {
                            otherRegisterInfo: function() {
                                return a
                            }
                        }
                    })
                }

                function o(a) {
                    v = a
                }

                function p() {
                    return v
                }
                var q = {
                        2: {
                            code: 5,
                            name: "普通用户"
                        },
                        3: {
                            code: 5,
                            name: "运维用户"
                        },
                        4: {
                            code: 7,
                            name: "编辑用户"
                        },
                        5: {
                            code: 5,
                            name: "编辑用户"
                        },
                        10: {
                            code: 7,
                            name: "高级用户"
                        },
                        11: {
                            code: 7,
                            name: "服务商用户"
                        }
                    },
                    r = null,
                    s = null,
                    t = null,
                    u = null;
                e.onItemAddedCallbacks.push(function() {
                    e.hasMore() && ("unauthorized-server" == e.retryReason() && w.showLogin(), "down-server" == e.retryReason() && g.openMsgDialog({
                        msg: "服务器忙碌，请稍后再试！"
                    }))
                });
                var v = {},
                    w = {
                        getLoginReason: function() {
                            return e.retryReason()
                        },
                        showLogin: function() {
                            i()
                        },
                        showRegister: function() {
                            m()
                        },
                        showOtherRegister: function() {
                            n()
                        },
                        getUserDetail: function(a, c, d) {
                            var e = PREFIX_URL + "base/relUserInfo?type=" + a + "&openId=" + c + "&accessToken=" + d,
                                f = new Date;
                            return e += "&date=" + f.getTime(), b({
                                method: "GET",
                                url: e,
                                withCredentials: !0
                            })
                        },
                        addRegisterInfo: o,
                        getRegisterInfo: p,
                        login: function(a) {
                            var c = this,
                                e = b.post(JSON_URL + "?c=user&a=login", a, {
                                    withCredentials: !0,
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                    }
                                });
                            return e.then(function(a) {
                                if (200 === a.status) {
                                    if (c.isValidateCodeLogin = !1, a.data.success !== !0) return a.data;
                                    ("/home" == d.path() || "/home/login" == d.path()) && d.path("main"), w.requestCurrentUser(), j(r, !0)
                                } else w.isAuthenticated()
                            }, function() {
                                w.isAuthenticated()
                            })
                        },
                        register: function(a) {
                            var c = b.post(JSON_URL + "?c=user&a=register", a, {
                                withCredentials: !0,
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                }
                            });
                            return c.then(function(a) {
                                if (200 === a.status) {
                                    if (a.data.success !== !0) return a.data;
                                    ("/home" == d.path() || "/home/register" == d.path()) && d.path("main"), w.requestCurrentUser(), j(t, !0)
                                } else w.isAuthenticated()
                            }, function() {
                                w.isAuthenticated()
                            })
                        },
                        thirdPartLogin: function(a) {
                            var c = b.post(PREFIX_URL + "eqs/relAccount", $.param(a), {
                                withCredentials: !0,
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                }
                            });
                            return c.then(function(a) {
                                if (200 === a.status) {
                                    if (a.data.success !== !0) return a.data;
                                    ("/home" == d.path() || "/home/login" == d.path()) && d.path("main"), w.requestCurrentUser(), j(u, !0)
                                } else w.isAuthenticated()
                            }, function() {
                                w.isAuthenticated()
                            })
                        },
                        weiChatLogin: function(a) {
                            return b.post(PREFIX_URL + "eqs/relWechatAccount?code=" + a + "&isMobile=1&time=" + (new Date).getTime(), {}, {
                                withCredentials: !0,
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                }
                            })
                        },
                        cancelRegister: function() {
                            j(t, !1), h("#/reg")
                        },
                        hasRel: function(a) {
                            t && j(t, !1);
                            var c = new Date,
                                e = PREFIX_URL + "base/user/hasRel?type=" + a.type + "&openId=" + a.openId + "&time=" + c.getTime(),
                                f = b.get(e, {
                                    withCredentials: !0
                                });
                            f.then(function(b) {
                                200 === b.status ? b.data.success === !0 ? (("/home" == d.path() || "/home/login" == d.path()) && d.path("main"), w.requestCurrentUser()) : "未关联账号" == b.data.msg && n(a) : w.isAuthenticated()
                            }, function() {
                                w.isAuthenticated()
                            })
                        },
                        cancelLogin: function() {
                            j(r, !1), h()
                        },
                        logout: function(a) {
                            b({
                                withCredentials: !0,
                                method: "GET",
                                url: PREFIX_URL + "logout"
                            }).then(function() {
                                w.currentUser = null, h(a)
                            }, function() {
                                w.currentUser = null, h(a)
                            })
                        },
                        requestCurrentUser: function() {
                            if (w.isAuthenticated()) return c.when(w.currentUser);
                            var a = new Date;
                            return b.get(JSON_URL + "?c=user&a=check&time=" + a.getTime(), {
                                withCredentials: !0
                            }).then(function(a) {
                                return a && (w.currentUser = a.data.obj, (!w.currentUser.roleIdList || w.currentUser.roleIdList.length <= 0) && (w.currentUser.roleIdList = [2])), w.currentUser
                            })
                        },
                        resetPassByKey: function(a, c) {
                            var d = {
                                key: c,
                                newPwd: a
                            };
                            return b.post(PREFIX_URL + "eqs/pwd/reset", $.param(d), {
                                withCredentials: !0,
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                }
                            })
                        },
                        currentUser: null,
                        isAuthenticated: function() {
                            return !!w.currentUser
                        },
                        accessDef: {
                            CREATE_STYLE_SETTING: 1,
                            SCENE_HIDE_LASTPAGE_SETTING: 2,
                            CREATE_SCROLL_IMAGE: 4
                        },
                        thirdPartyUrl: {
                            weiChatUrl: "https://open.weixin.qq.com/connect/qrconnect?appid=wxc5f1bbae4bb93ced&redirect_uri=http%3A%2F%2Fe.wesambo.com&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect",
                            qqUrl: "https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101149132&redirect_uri=http%3A%2F%2Fe.wesambo.com&scope=get_user_info",
                            weiboUrl: "https://api.weibo.com/oauth2/authorize?client_id=3508809852&response_type=token&redirect_uri=http://e.wesambo.com"
                        },
                        isAllowToAccess: function(a) {
                            for (var b = 0; b < w.currentUser.roleIdList.length; b++)
                                if (q[w.currentUser.roleIdList[b]]) {
                                    var c = q[w.currentUser.roleIdList[b]].code;
                                    if ((c & a) > 0) return !0
                                }
                            return !1
                        },
                        isEditor: function() {
                            if (!w.currentUser) return !1;
                            var a = w.currentUser.roleIdList;
                            if (!a) return !1;
                            for (var b = 0; b < a.length; b++)
                                if ("4" == a[b]) return !0;
                            return !1
                        },
                        isAdvancedUser: function() {
                            if (!w.currentUser) return !1;
                            var a = w.currentUser.roleIdList;
                            if (!a) return !1;
                            for (var b = 0; b < a.length; b++)
                                if ("10" == a[b]) return !0;
                            return !1
                        },
                        isVendorUser: function() {
                            if (!w.currentUser) return !1;
                            var a = w.currentUser.roleIdList;
                            if (!a) return !1;
                            for (var b = 0; b < a.length; b++)
                                if ("11" == a[b]) return !0;
                            return !1
                        },
                        requestResetPassword: function(a) {
                            l(a)
                        },
                        validateToken: function(a) {
                            var c = "changepw?token=" + a;
                            return b.get(PREFIX_URL + c, {
                                withCredentials: !0
                            })
                        },
                        resetPassword: function(a, c) {
                            var d = PREFIX_URL + "m/base/user/changePwd",
                                e = {
                                    oldPwd: a,
                                    newPwd: c
                                };
                            return b.post(d, $.param(e), {
                                withCredentials: !0,
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                }
                            })
                        },
                        retrievePassword: function(a, c, d, e) {
                            var f = PREFIX_URL + "eqs/pwd/retrieve",
                                g = {
                                    email: a,
                                    geetest_challenge: c,
                                    geetest_validate: d,
                                    geetest_seccode: e
                                };
                            return b.post(f, $.param(g), {
                                withCredentials: !0,
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                }
                            })
                        }
                    };
                return w
            }
        ]), b.module("services.breadcrumbs", []), b.module("services.breadcrumbs").factory("breadcrumbs", ["$rootScope", "$location",
            function(a, b) {
                var c = [],
                    d = {};
                return a.$on("$routeChangeSuccess", function() {
                    var a, d = b.path().split("/"),
                        e = [],
                        f = function(a) {
                            return "/" + d.slice(0, a + 1).join("/")
                        };
                    for (d.shift(), a = 0; a < d.length; a++) e.push({
                        name: d[a],
                        path: f(a)
                    });
                    c = e
                }), d.getAll = function() {
                    return c
                }, d.getFirst = function() {
                    return c[0] || {}
                }, d
            }
        ]), b.module("services.crud", ["services.crudRouteProvider"]), b.module("services.crud").factory("crudEditMethods", function() {
            return function(a, c, d, e, f) {
                var g = {};
                return g[a] = c, g[a + "Copy"] = b.copy(c), g.save = function() {
                    this[a].$saveOrUpdate(e, e, f, f)
                }, g.canSave = function() {
                    return this[d].$valid && !b.equals(this[a], this[a + "Copy"])
                }, g.revertChanges = function() {
                    this[a] = b.copy(this[a + "Copy"])
                }, g.canRevert = function() {
                    return !b.equals(this[a], this[a + "Copy"])
                }, g.remove = function() {
                    this[a].$id() ? this[a].$remove(e, f) : e()
                }, g.canRemove = function() {
                    return c.$id()
                }, g.getCssClasses = function(a) {
                    var b = this[d][a];
                    return {
                        error: b.$invalid && b.$dirty,
                        success: b.$valid && b.$dirty
                    }
                }, g.showError = function(a, b) {
                    return this[d][a].$error[b]
                }, g
            }
        }), b.module("services.crud").factory("crudListMethods", ["$location",
            function(a) {
                return function(b) {
                    var c = {};
                    return c["new"] = function() {
                        a.path(b + "/new")
                    }, c.edit = function(c) {
                        a.path(b + "/" + c)
                    }, c
                }
            }
        ]),
        function() {
            function a(a) {
                this.$get = b.noop, this.routesFor = function(d, e, f) {
                    var g = d.toLowerCase(),
                        h = "/" + d.toLowerCase();
                    f = f || e, b.isString(e) && "" !== e && (g = e + "/" + g), null !== f && f !== c && "" !== f && (h = "/" + f + h);
                    var i = function(a) {
                            return g + "/" + d.toLowerCase() + "-" + a.toLowerCase() + ".tpl.html"
                        },
                        j = function(a) {
                            return d + a + "Ctrl"
                        },
                        k = {
                            whenList: function(a) {
                                return k.when(h, {
                                    templateUrl: i("List"),
                                    controller: j("List"),
                                    resolve: a
                                }), k
                            },
                            whenNew: function(a) {
                                return k.when(h + "/new", {
                                    templateUrl: i("Edit"),
                                    controller: j("Edit"),
                                    resolve: a
                                }), k
                            },
                            whenEdit: function(a) {
                                return k.when(h + "/:itemId", {
                                    templateUrl: i("Edit"),
                                    controller: j("Edit"),
                                    resolve: a
                                }), k
                            },
                            when: function(b, c) {
                                return a.when(b, c), k
                            },
                            otherwise: function(b) {
                                return a.otherwise(b), k
                            },
                            $routeProvider: a
                        };
                    return k
                }
            }
            a.$inject = ["$routeProvider"], b.module("services.crudRouteProvider", ["ngRoute"]).provider("crudRoute", a)
        }(), b.module("services.data", []), b.module("services.data").factory("dataService", ["$http",
            function(a) {
                var b = {};
                return b.getDataBySceneId = function(b, c, d) {
                    c = c || 1, d = d || 10;
                    var e = "?c=scenedata&a=getdata&id=" + b + "&pageNo=" + c + "&pageSize=" + d,
                        f = new Date;
                    return e += "&time=" + f.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + e
                    })
                }, b.getDataDetail = function(b) {
                    var c = "m/c/detail/" + b,
                        d = new Date;
                    return c += "?time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, b.getAllData = function(b) {
                    var c = "m/c/data?pageSize=10&pageNo=" + b,
                        d = new Date;
                    return c += "&time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, b.getProspectDataAccount = function() {
                    var b = "m/c/prospectCount?time=" + (new Date).getTime();
                    return a('')
                }, b.getAllPageView = function() {
                    var b = "?c=scene&a=pvcount&time=" + (new Date).getTime();
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + b
                    })
                }, b.deleteDataById = function(b) {
                    var c = "m/c/delete/" + b;
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, b.getAllDataCount = function() {
                    var b = "c-count.php",
                        c = new Date;
                    return b += "?time=" + c.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + b
                    })
                }, b.getOpenCount = function() {
                    var b = "?c=scene&a=opencount",
                        c = new Date;
                    return b += "&time=" + c.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + b
                    })
                }, b.getAllSceneDataCount = function() {
                    var b = "?c=scenedata&a=getcount",
                        c = new Date;
                    return b += "&time=" + c.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + b
                    })
                }, b.saveData = function(b) {
                    var c = PREFIX_URL + "m/c/save",
                        d = a.post(c, b, {
                            withCredentials: !0,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                            }
                        });
                    return d.then(function(a) {
                        200 === a.status && (a.data.success === !0 || alert(a.data.msg))
                    }, function() {})
                }, b.getSceneField = function(b) {
                    var c = "m/c/formField/" + b,
                        d = new Date;
                    return c += "?time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, b.getPremergeScenes = function() {
                    var b = "m/scene/newDataScene",
                        c = new Date;
                    return b += "?time=" + c.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + b
                    })
                }, b.mergeSceneData = function(b, c) {
                    var d = "m/c/imps/" + b;
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: PREFIX_URL + d,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(c)
                    })
                }, b
            }
        ]), b.module("services.exceptionHandler", ["services.i18nNotifications"]), b.module("services.exceptionHandler").factory("exceptionHandlerFactory", ["$injector",
            function(a) {
                return function(b) {
                    return function(c, d) {
                        var e = a.get("i18nNotifications");
                        b(c, d), e.pushForCurrentRoute("error.fatal", "error", {}, {
                            exception: c,
                            cause: d
                        })
                    }
                }
            }
        ]), b.module("services.exceptionHandler").config(["$provide",
            function(a) {
                a.decorator("$exceptionHandler", ["$delegate", "exceptionHandlerFactory",
                    function(a, b) {
                        return b(a)
                    }
                ])
            }
        ]), b.module("services.file", []), b.module("services.file").factory("fileService", ["$http",
            function(a) {
                var b = {};
                return b.listFileCategory = function(b) {
                    var c = "class-" + ("1" == b ? "tpType" : "bgType")+".htm",
                        d = new Date;
                    return c += "?time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, b.deleteFile = function(b) {
                    var c = JSON_URL+"?c=upfile&a=delete",
                        d = {
                            id: b,
                            keycode: getCookie("MD5STR"),
                            UID: getCookie("USERID"),
                        };
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: c,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(d)
                    })
                }, b.createCategory = function(b) {
                    var c = "?c=tag&a=create",
                        d = {
                            tagName: b
                        };
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: JSON_URL + c,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(d)
                    })
                }, b.getCustomTags = function() {
                    var b = "?c=tag&a=my&?time" + (new Date).getTime();
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + b
                    })
                }, b.deleteTag = function(b) {
                    var c = "?c=tag&a=delete",
                        d = {
                            id: b
                        };
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: JSON_URL + c,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(d)
                    })
                }, b.setCategory = function(b, c) {
                    var d = "?c=tag&a=set",
                        e = {
                            tagId: b,
                            fileIds: c
                        };
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: JSON_URL + d,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(e)
                    })
                }, b.getImagesByTag = function(b, c, d, e) {
                    var f = "?c=upfile&a=userlist&";
                    return f += "fileType=" + c, b && (f += "&tagId=" + b), f += "&pageNo=" + (d ? d : 1), f += "&pageSize=" + (e ? e : 12), f += "&time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + f
                    })
                }, b.getImagesBySysTag = function(b, c, d, e, f) {
                    var g = "?c=upfile&a=syslist&";
                    return g += "tagId=" + b, g += "&fileType=" + c, g += "&bizType=" + f, g += "&pageNo=" + (d ? d : 1), g += "&pageSize=" + (e ? e : 12), g += "&time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + g
                    })
                }, b.unsetTag = function(b, c) {
                    var d = "m/base/file/tag/unset",
                        e = {
                            tagId: b,
                            fileIds: c
                        };
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: PREFIX_URL + d,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(e)
                    })
                }, b.getChildCategory = function(b) {
                    var c = "?c=upfile&a=systag&type=11";
                    return b && (c += "&bizType=" + b), c += (/\?/.test(c) ? "&" : "?") + "time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, b.getFileByCategory = function(b, c, d, e) {
                    var f = "?c=upfile&a=syslist&";
                    0 == d && 2 == e && (f = "?c=upfile&a=userlist&"), f += "pageNo=" + (b ? b : 1), f += "&pageSize=" + (c ? c : 12), d && "all" != d && (f += "&bizType=" + (d ? d : -1)), f += "&fileType=" + (e ? e : -1);
                    var g = new Date;
                    return f += "&time=" + g.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + f
                    })
                }, b.cropImage = function(b) {
                    var c = "m/base/file/crop";
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: PREFIX_URL + c,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(b)
                    })
                }, b
            }
        ]), b.module("services.httpRequestTracker", []), b.module("services.httpRequestTracker").factory("httpRequestTracker", ["$http",
            function(a) {
                var b = {};
                return b.hasPendingRequests = function() {
                    return a.pendingRequests.length > 0
                }, b
            }
        ]), b.module("services.i18nNotifications", ["services.notifications", "services.localizedMessages"]), b.module("services.i18nNotifications").factory("i18nNotifications", ["localizedMessages", "notifications",
            function(a, c) {
                var d = function(c, d, e, f) {
                        return b.extend({
                            message: a.get(c, e),
                            type: a.get(d, e)
                        }, f)
                    },
                    e = {
                        pushSticky: function(a, b, e, f) {
                            return c.pushSticky(d(a, b, e, f))
                        },
                        pushForCurrentRoute: function(a, b, e, f) {
                            return c.pushForCurrentRoute(d(a, b, e, f))
                        },
                        pushForNextRoute: function(a, b, e, f) {
                            return c.pushForNextRoute(d(a, b, e, f))
                        },
                        getCurrent: function() {
                            return c.getCurrent()
                        },
                        remove: function(a) {
                            return c.remove(a)
                        }
                    };
                return e
            }
        ]), b.module("services.localizedMessages", []).factory("localizedMessages", ["$interpolate", "I18N.MESSAGES",
            function(a, b) {
                var c = function(a, b) {
                    return a || "?" + b + "?"
                };
                return {
                    get: function(d, e) {
                        var f = b[d];
                        return f ? a(f)(e) : c(f, d)
                    }
                }
            }
        ]), b.module("services.mine", []), b.module("services.mine").factory("MineService", ["$http",
            function(a) {
                var b = {};
                return b.getMyScenes = function(b, c, d) {
                    var e = "?c=scene&a=my&type";
                    b && (e += "=" + b), e += "&pageNo=" + (c ? c : 1), e += "&pageSize=" + (d ? d : 12);
                    var f = new Date;
                    return e += (/\?/.test(e) ? "&" : "?") + "time=" + f.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + e
                    })
                }, b
            }
        ]), b.module("services.modal", ["confirm-dialog", "message-dialog"]).factory("ModalService", ["$modal",
            function(a) {
                var b = {};
                return b.openConfirmDialog = function(b, c, d) {
                    a.open({
                        backdrop: "static",
                        keyboard: !1,
                        backdropClick: !1,
                        windowClass: "confirm-dialog",
                        templateUrl: "dialog/confirm.tpl.html",
                        controller: "ConfirmDialogCtrl",
                        resolve: {
                            confirmObj: function() {
                                return b
                            }
                        }
                    }).result.then(c, d)
                }, b.openMsgDialog = function(b, c, d) {
                    a.open({
                        backdrop: "static",
                        keyboard: !1,
                        backdropClick: !1,
                        windowClass: "message-dialog",
                        templateUrl: "dialog/message.tpl.html",
                        controller: "MessageDialogCtrl",
                        resolve: {
                            msgObj: function() {
                                return b
                            }
                        }
                    }).result.then(c, d)
                }, b
            }
        ]), b.module("I18N.MESSAGES", []).constant("I18N.MESSAGES", {
            "notify.success": "success",
            "notify.info": "info",
            "notify.danger": "danger",
            "notify.warning": "warning",
            "errors.route.changeError": "Route change error",
            "crud.user.save.success": "A user with id '{{id}}' was saved successfully.",
            "crud.user.remove.success": "A user with id '{{id}}' was removed successfully.",
            "crud.user.remove.error": "Something went wrong when removing user with id '{{id}}'.",
            "crud.user.save.error": "Something went wrong when saving a user...",
            "crud.project.save.success": "A project with id '{{id}}' was saved successfully.",
            "crud.project.remove.success": "A project with id '{{id}}' was removed successfully.",
            "crud.project.save.error": "Something went wrong when saving a project...",
            "login.reason.notAuthorized": "离开久了，麻烦再登录一次吧！",
            "login.reason.notAuthenticated": "离开久了，麻烦再登录一次吧！",
            "login.error.invalidCredentials": "登录失败，请检查帐号和密码是否正确。",
            "login.error.serverError": "There was a problem with authenticating: {{exception}}.",
            "register.error.serverError": "There was a problem with authenticating: {{exception}}.",
            "login.reset.notmatch": "新密码和重复密码不匹配",
            "register.error.match": "两次输入密码不一致",
            "register.error.agreement": "请先同意注册协议再完成注册",
            "file.bg.pageSize": "18",
            "scene.save.success.published": "场景已保存成功！",
            "scene.save.success.nopublish": "保存成功，还需要发布哦！",
            "scene.publish.success": "发布成功！"
        }), b.module("services.notifications", []).factory("notifications", ["$rootScope",
            function(a) {
                var c = {
                        STICKY: [],
                        ROUTE_CURRENT: [],
                        ROUTE_NEXT: []
                    },
                    d = {},
                    e = function(a, c) {
                        if (!b.isObject(c)) throw new Error("Only object can be added to the notification service");
                        return a.push(c), c
                    };
                return a.$on("$routeChangeSuccess", function() {
                    c.ROUTE_CURRENT.length = 0, c.ROUTE_CURRENT = b.copy(c.ROUTE_NEXT), c.ROUTE_NEXT.length = 0
                }), d.getCurrent = function() {
                    return [].concat(c.STICKY, c.ROUTE_CURRENT)
                }, d.pushSticky = function(a) {
                    return e(c.STICKY, a)
                }, d.pushForCurrentRoute = function(a) {
                    return e(c.ROUTE_CURRENT, a)
                }, d.pushForNextRoute = function(a) {
                    return e(c.ROUTE_NEXT, a)
                }, d.remove = function(a) {
                    b.forEach(c, function(b) {
                        var c = b.indexOf(a);
                        c > -1 && b.splice(c, 1)
                    })
                }, d.removeAll = function() {
                    b.forEach(c, function(a) {
                        a.length = 0
                    })
                }, d
            }
        ]), b.module("services.pagetpl", []), b.module("services.pagetpl").factory("pageTplService", ["$http", "$rootScope", "$modal", "$q",
            function(a) {
                var b = {};
                return b.getPageTpls = function(b) {
                    var c = "?c=scene&a=syspagetpl&id=" + b,
                        d = new Date;
                    return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, b.getPageTplTypes = function() {
                    var b = "pageTplType.htm",
                        c = new Date;
                    return b += (/\?/.test(b) ? "&" : "?") + "time=" + c.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + b
                    })
                }, b.getPageTagLabel = function(b) {
                    var c = "?c=upfile&a=systag&type=1";
                    null != b && (c += (/\?/.test(c) ? "&" : "?") + "bizType=" + b);
                    var d = new Date;
                    return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, b.getPageTagLabelCheck = function(b) {
                    var c = "/m/scene/tag/page/list?id=" + b,
                        d = new Date;
                    return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, b.getPageTplTypestemp = function(b, c) {
                    var d = "?c=scene&a=syspagetpl",
                        e = new Date;
                    return null != b && (d += (/\?/.test(d) ? "&" : "?") + "tagId=" + b), null != c && (d += (/\?/.test(d) ? "&" : "?") + "bizType=" + c), d += (/\?/.test(d) ? "&" : "?") + "time=" + e.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + d
                    })
                }, b.updataChildLabel = function(b, c) {
                    var d = "/m/eqs/tag/page/set/?ids=" + b;
                    null != c && (d += (/\?/.test(d) ? "&" : "?") + "pageId=" + c);
                    var e = new Date;
                    return d += (/\?/.test(d) ? "&" : "?") + "time=" + e.getTime(), a({
                        withCredentials: !0,
                        method: "POST",
                        url: PREFIX_URL + d
                    })
                }, b
            }
        ]), b.module("services.sample", []).factory("sampleService", ["$rootScope", "$http",
            function(a, b) {
                var c = {};
                return c.getSamples = function(a, c, d) {
                    var e = PREFIX_S1_URL + "eqs/promotion";
                    return a && (e += "?type=" + a), c && (e += /\?/.test(e) ? "&" : "?", e += "pageNo=" + c), d && (e += /\?/.test(e) ? "&" : "?", e += "pageSize=" + d), e += (/\?/.test(e) ? "&" : "?") + "time=" + (new Date).getTime(), b({
                        withCredentials: !0,
                        method: "GET",
                        url: e
                    })
                }, c.getSamplesPV = function() {
                    var a = PREFIX_S1_URL + "eqs/topThree?time=" + (new Date).getTime();
                    return b({
                        withCredentials: !0,
                        method: "GET",
                        url: a
                    })
                }, c
            }
        ]), b.module("services.scene", ["scene.create.console"]), b.module("services.scene").factory("sceneService", ["$http", "$rootScope", "$modal", "$q", "security", "$cacheFactory",
            function(a, c, d, e, f, g) {
                function h(a, b) {
                    var c = {},
                        d = $(".edit_area"),
                        e = d.children().last(),
                        f = d.children(".maxIndex"),
                        g = 0;
                    if (g = f.length > 0 ? parseInt(f.css("z-index")) + 1 : e.length > 0 ? parseInt(e.css("z-index")) + 1 : 101, b) return b.zIndex = g, b;
                    var h = e;
                    return c = h.length <= 0 ? {
                        top: "30px",
                        left: "0px"
                    } : h.position().top + h.outerHeight() > $(".edit_area").outerHeight() - 10 ? {
                        top: h.position().top,
                        left: h.position().left + 10 + "px"
                    } : {
                        top: h.position().top + h.outerHeight() + 10 + "px",
                        left: h.position().left + "px"
                    }, c.zIndex = g, c
                }

                function i(a, b) {
                    var c = parseInt(a.css.top.substring(0, a.css.top.length - 2)) + 34 * C.sameCopyCount,
                        d = parseInt(a.css.left.substring(0, a.css.left.length - 2));
                    c + 34 > $(".edit_area").outerHeight() ? (b.css.top = c + "px", b.css.left = d + 10 + "px") : (b.css.top = c + 34 + "px", b.css.left = a.css.left, C.sameCopyCount++)
                }

                function j(a, b, c) {
                    var d, e = {};
                    if (3 == ("" + a).charAt(0)) {
                        if ($("#editBG:visible").length > 0) {
                            var f;
                            for (f = 0; f < F.length; f++)
                                if (3 == F[f].type) {
                                    e = F[f];
                                    break
                                }
                            return e
                        }
                        e = {
                            content: null,
                            css: {},
                            id: 100 * Math.random(),
                            num: 0,
                            pageId: E.obj.id,
                            properties: {
                                bgColor: null,
                                imgSrc: null
                            },
                            sceneId: E.obj.sceneId,
                            title: null,
                            type: 3
                        }
                    }
                    return 1 == ("" + a).charAt(0) && (e = {
                        id: Math.ceil(100 * Math.random()),
                        properties: {
                            title: "提交"
                        },
                        type: 1,
                        pageId: E.obj.id,
                        sceneId: E.obj.sceneId
                    }), 8 == ("" + a).charAt(0) && (d = h(a, b), $.extend(!0, d, {
                        color: "#676767",
                        borderWidth: "1",
                        borderStyle: "solid",
                        borderColor: "#ccc",
                        borderRadius: "5",
                        backgroundColor: "#f9f9f9"
                    }), e = {
                        content: "",
                        css: d,
                        id: Math.ceil(100 * Math.random()),
                        num: 1,
                        pageId: E.obj.id,
                        properties: {
                            title: "一键拨号",
                            number: ""
                        },
                        sceneId: E.obj.sceneId,
                        title: null,
                        type: 8
                    }), 2 == ("" + a).charAt(0) && (d = h(a, b), e = {
                        content: "点击此处进行编辑",
                        css: d,
                        id: Math.ceil(100 * Math.random()),
                        num: 1,
                        pageId: E.obj.id,
                        properties: {},
                        sceneId: E.obj.sceneId,
                        title: null,
                        type: 2
                    }), 4 == ("" + a).charAt(0) && (d = h(a, b), d.width = "100px", d.height = "100px", e = {
                        content: "",
                        css: d,
                        id: Math.ceil(100 * Math.random()),
                        num: 1,
                        pageId: E.obj.id,
                        properties: {
                            width: "100px",
                            height: "100px",
                            src: ""
                        },
                        sceneId: E.obj.sceneId,
                        title: null,
                        type: 4
                    }), 5 == ("" + a).charAt(0) && (d = h(a, b), $.extend(!0, d, {
                        color: "#676767",
                        borderWidth: "1",
                        borderStyle: "solid",
                        borderColor: "#ccc",
                        borderRadius: "5",
                        backgroundColor: "#f9f9f9"
                    }), e = {
                        content: "",
                        css: d,
                        id: Math.ceil(100 * Math.random()),
                        num: 1,
                        pageId: E.obj.id,
                        properties: {
                            placeholder: "请命名"
                        },
                        isInput: 1,
                        sceneId: E.obj.sceneId,
                        title: "请命名",
                        type: 5
                    }), 6 == ("" + a).charAt(0) && (d = h(a, b), $.extend(!0, d, {
                        color: "#676767",
                        borderWidth: "1",
                        borderStyle: "solid",
                        borderColor: "#ccc",
                        borderRadius: "5",
                        backgroundColor: "#f9f9f9"
                    }), e = {
                        content: "",
                        css: d,
                        id: Math.ceil(100 * Math.random()),
                        num: 1,
                        pageId: E.obj.id,
                        properties: {
                            title: "提交"
                        },
                        sceneId: E.obj.sceneId,
                        title: null,
                        type: 6
                    }), "p" == a && (d = h(a, b), e = {
                        content: "",
                        css: d,
                        id: Math.ceil(100 * Math.random()),
                        num: 1,
                        pageId: E.obj.id,
                        properties: {
                            title: "图集"
                        },
                        sceneId: E.obj.sceneId,
                        title: null,
                        type: "p"
                    }), "v" == a && (d = h(a, b), d.width = "48px", d.height = "48px", e = {
                        content: "",
                        css: d,
                        id: Math.ceil(100 * Math.random()),
                        num: 1,
                        pageId: E.obj.id,
                        properties: {
                            src: ""
                        },
                        sceneId: E.obj.sceneId,
                        title: null,
                        type: "v"
                    }), c && $.extend(!0, e, c), F.push(e), G[e.id] = e, e
                }

                function k(a, b) {
                    var d = D.wrapComp(b, "edit");
                    $(".edit_area").append(d);
                    for (var e = D.getInterceptors(), f = 0; f < e.length; f++) e[f](d, b);
                    D.getEventHandlers()[("" + a).charAt(0)](d, b), c.$broadcast("dom.changed")
                }

                function l(a) {
                    var b = [];
                    return "g101" == a && (b.push(I("501")), b.push(I("502")), b.push(I("503")), b.push(I("601"))), b
                }

                function m(a, b) {
                    $(a).css("cursor", "text"), $(a).parents("li").hasClass("inside-active") || ($(a).bind("click", function(a) {
                        a.stopPropagation()
                    }), $(document).bind("mousedown", function() {
                        $(a).css("cursor", "default"), $("#btn-toolbar").find("input[type=text][data-edit]").blur(), $("#btn-toolbar") && $("#btn-toolbar").remove(), $(a).unbind("click"), b.content = $(a).html(), $(a).parents("li").removeClass("inside-active").css("user-select", "none"), $(a).removeAttr("contenteditable"), $(document).unbind("mousedown")
                    }), $(a).parents("li").addClass("inside-active").css("user-select", "initial"), c.$broadcast("text.click", a))
                }

                function n(a) {
                    x(a, function(b) {
                        a.properties.src = b.data;
                        var c = b.width / b.height,
                            d = $("#" + a.id);
                        if (d.length > 0) {
                            var e = $("#inside_" + a.id).width(),
                                f = $("#inside_" + a.id).height(),
                                g = e / f;
                            c >= g ? (d.outerHeight(f), d.outerWidth(f * c), d.css("marginLeft", -(d.outerWidth() - e) / 2), d.css("marginTop", 0)) : (d.outerWidth(e), d.outerHeight(e / c), d.css("marginTop", -(d.outerHeight() - f) / 2), d.css("marginLeft", 0)), d.attr("src", PREFIX_FILE_HOST + b.data), a.properties.imgStyle = {}, a.properties.imgStyle.width = d.outerWidth(), a.properties.imgStyle.height = d.outerHeight(), a.properties.imgStyle.marginTop = d.css("marginTop"), a.properties.imgStyle.marginLeft = d.css("marginLeft")
                        } else b.width > $(".edit_area").width() && (b.width = $(".edit_area").width(), b.height = b.width / c), b.height > $(".edit_area").height() && (b.height = $(".edit_area").height(), b.width = b.height * c), a.css.width = b.width, a.css.height = b.height, a.properties.imgStyle = {}, a.properties.imgStyle.width = b.width, a.properties.imgStyle.height = b.height, a.properties.imgStyle.marginTop = "0", a.properties.imgStyle.marginLeft = "0", k(a.type, a)
                    }, function() {
                        a.properties.src || (F.splice(F.indexOf(G[a.id]), 1), delete G[a.id])
                    })
                }

                function o(a) {
                    d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/button.tpl.html",
                        controller: "ButtonConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return a
                            }
                        }
                    }).result.then(function(b) {
                        a.properties.title = b.title;
                        var c = b.title.replace(/ /g, "&nbsp;");
                        $("#" + a.id).html(c)
                    })
                }

                function p(a) {
                    J || (J = d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/tel.tpl.html",
                        controller: "TelConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return a
                            }
                        }
                    }).result.then(function(b) {
                        J = null, a.properties.title = b.title, a.properties.number = b.number;
                        b.title.replace(/ /g, "&nbsp;");
                        $.extend(!0, a.css, b.btnStyle), $("#" + a.id).length > 0 && $("#" + a.id).parents("li").remove(), k(a.type, a)
                    }, function() {
                        J = null, $("#" + a.id).length || (F.splice(F.indexOf(G[a.id]), 1), delete G[a.id])
                    }))
                }

                function r(a) {
                    J || (J = d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/input.tpl.html",
                        controller: "InputConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return a
                            }
                        }
                    }).result.then(function(b) {
                        J = null, b.type && (a.type = b.type), a.properties.placeholder = b.title, a.properties.required = b.required, a.title = b.title, $("#" + a.id).length > 0 ? ($("#" + a.id).attr("placeholder", b.title), $("#" + a.id).attr("required", b.required)) : k(a.type, a)
                    }, function() {
                        J = null, $("#" + a.id).length || (F.splice(F.indexOf(G[a.id]), 1), delete G[a.id])
                    }))
                }

                function s(a) {
                    J || (J = d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/pic_lunbo.tpl.html",
                        controller: "picsCtrl",
                        resolve: {
                            obj: function() {
                                return a
                            }
                        }
                    }).result.then(function(b) {
                        J = null, a.properties = b;
                        var c = $("#inside_" + a.id);
                        c.length && c.remove(), k(a.type, a)
                    }, function() {
                        J = null, $("#" + a.id).length || (F.splice(F.indexOf(G[a.id]), 1), delete G[a.id])
                    }))
                }

                function t(a) {
                    J || (J = d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/video.tpl.html",
                        controller: "VideoCtrl",
                        resolve: {
                            obj: function() {
                                return a
                            }
                        }
                    }).result.then(function(b) {
                        J = null, a.properties.src = b, $("#" + a.id).length || k(a.type, a)
                    }, function() {
                        J = null, $("#" + a.id).length || (F.splice(F.indexOf(G[a.id]), 1), delete G[a.id])
                    }))
                }

                function u(a) {
                    d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/microweb.tpl.html",
                        controller: "MicroConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return a.properties.labels || (a.properties.labels = [{
                                    id: 1,
                                    title: "栏目一",
                                    color: {
                                        backgroundColor: "#23A3D3",
                                        color: ""
                                    },
                                    link: ""
                                }, {
                                    id: 2,
                                    title: "栏目二",
                                    color: {
                                        backgroundColor: "#23A3D3",
                                        color: ""
                                    },
                                    link: ""
                                }]), a
                            }
                        }
                    }).result.then(function(c) {
                        $("#" + a.id).length > 0 ? (a.properties.labels = [], b.forEach(c, function(b) {
                            delete b.selected, delete b.mousedown, delete b.$$hashKey, a.properties.labels.push(b)
                        }), $("#" + a.id).parents("li").remove(), k(a.type, a)) : (a.css = {
                            left: "0px",
                            width: "100%",
                            bottom: "0px",
                            height: "50px",
                            zIndex: 999
                        }, a.properties.labels = [], b.forEach(c, function(b) {
                            delete b.selected, delete b.mousedown, delete b.$$hashKey, a.properties.labels.push(b)
                        }), position = null, k(a.type, a))
                    }, function() {
                        $("#" + a.id).length || (F.splice(F.indexOf(G[a.id]), 1), delete G[a.id]), console.log(a)
                    })
                }

                function v(a) {
                    x(a, function(b) {
                        var c = document.getElementsByClassName("edit_area")[0];
                        if (c = $(c).parent()[0], "imgSrc" == b.type) {
                            var d = b.data;
                            c.style.backgroundImage = "url(" + ((d.indexOf('syspic/') >=0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + d + ")", a.properties.bgColor = null, a.properties.imgSrc = d
                        }
                        "backgroundColor" == b.type && (c.style.backgroundImage = "none", c.style.backgroundColor = b.color, a.properties.imgSrc = null, a.properties.bgColor = b.color), $("#editBG").unbind("click"), $("#editBG").show().bind("click", function() {
                            v(a)
                        })
                    }, function() {})
                }

                function w() {
                    J || (J = d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/audio.tpl.html",
                        controller: "AudioConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return E.obj.scene.image && E.obj.scene.image.bgAudio ? E.obj.scene.image.bgAudio : {}
                            }
                        }
                    }).result.then(function(a) {
                        J = null, "bgAudio" == a.compType && (E.obj.scene.image || (E.obj.scene.image = {}), E.obj.scene.image.bgAudio = a.bgAudio)
                    }, function() {
                        J = null
                    }))
                }

                function x(a, b, c) {
                    if (!J) {
                        var e = "0";
                        3 == a.type && (e = "0"), 4 == a.type && (e = "1"), J = d.open({
                            windowClass: "console img_console",
                            templateUrl: "scene/console/bg.tpl.html",
                            controller: "BgConsoleCtrl",
                            resolve: {
                                obj: function() {
                                    return {
                                        fileType: e,
                                        elemDef: a
                                    }
                                }
                            }
                        }).result.then(function(a) {
                            J = null, b(a)
                        }, function(a) {
                            J = null, c(a)
                        })
                    }
                }

                function y(a) {
                    C.currentElemDef = a, c.$broadcast("showStylePanel", {
                        activeTab: "style"
                    })
                }

                function z(a) {
                    C.currentElemDef = a, c.$broadcast("showStylePanel", {
                        activeTab: "anim"
                    })
                }

                function A(a) {
                    console.log(a), C.currentElemDef = a, K = c.$broadcast("showCropPanel", a)
                }

                function B(a) {
                    d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/link.tpl.html",
                        controller: "LinkConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return a
                            }
                        }
                    }).result.then(function(b) {
                        b && "http://" != b ? (a.properties.url = isNaN(b) ? PREFIX_S1_URL + "scenedata-links?id=" + a.sceneId + "&url=" + encodeURIComponent(b) : b, $("#inside_" + a.id).find(".fa-link").removeClass("fa-link").addClass("fa-anchor")) : (delete a.properties.url, $("#inside_" + a.id).find(".fa-anchor").removeClass("fa-anchor").addClass("fa-link"))
                    })
                }
                var C = {},
                    D = eqShow.templateParser("jsonParser"),
                    E = null,
                    F = null,
                    G = {},
                    H = ($(".edit_area"), C.createCompGroup = function(a, b) {
                        for (var c = l(a), d = 0; d < c.length; d++) {
                            var e = j(c[d].type, b, c[d]);
                            b = null, k(c[d].type, e)
                        }
                    }),
                    I = function(a) {
                        var b;
                        return "501" == a && (b = {
                            properties: {
                                placeholder: "姓名"
                            },
                            title: "姓名",
                            type: 501
                        }), "502" == a && (b = {
                            properties: {
                                placeholder: "手机"
                            },
                            title: "手机",
                            type: 502
                        }), "503" == a && (b = {
                            properties: {
                                placeholder: "邮箱"
                            },
                            title: "邮箱",
                            type: 503
                        }), "601" == a && (b = {
                            properties: {
                                title: "提交"
                            },
                            type: 601
                        }), b
                    };
                C.createComp = function(a, b) {
                    if ("g" == ("" + a).charAt(0)) return void H(a, b);
                    if ("9" == ("" + a).charAt(0)) return void w();
                    if (1 == a) {
                        if ($(".comp_title").length > 0) return void alert("已存在一个标签");
                        var c = j(a, b);
                        return void u(c)
                    }
                    var c = j(a, b);
                    if (4 == a) return void n(c);
                    if (5 == a) return void r(c);
                    if (8 == a) return void p(c);
                    if ("p" == a) return void s(c);
                    if ("v" == a) return void t(c);
                    if (3 == a) v(c);
                    else {
                        k(a, c)
                    }
                }, C.updateCompPosition = function(a, b) {
                    for (var c = 0; c < F.length; c++) "inside_" + F[c].id == a && (F[c].css ? (F[c].css.left = b.left, F[c].css.top = b.top) : F[c].css = b)
                }, C.updateCompAngle = function(a, b) {
                    for (var c = 0; c < F.length; c++) "inside_" + F[c].id == a && (F[c].css ? F[c].css.transform = "rotateZ(" + b + "deg)" : F[c].css = {})
                }, C.getPageNames = function(b) {
                    var c = "?c=scene&a=pageList&id=" + b + "&date=" + (new Date).getTime();
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.changePageSort = function(b, c) {
                    var d = "m/scene/pageSort?id=" + c + "&pos=" + b + "&date=" + (new Date).getTime();
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + d
                    })
                }, C.updateCompSize = function(a, b) {
                    for (var c = 0; c < F.length; c++) "inside_" + F[c].id == a && (F[c].css || (F[c].css = {}), F[c].css.width = b.width, F[c].css.height = b.height, F[c].properties.width = b.width, F[c].properties.height = b.height, b.imgStyle && (F[c].properties.imgStyle = b.imgStyle))
                }, C.savePageNames = function(b) {
                    var c = "m/scene/savePage",
                        d = {
                            id: b.id,
                            sceneId: b.sceneId,
                            name: b.name
                        };
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: PREFIX_URL + c,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(d)
                    })
                }, C.resetCss = function() {
                    $(".edit_area li").each(function(a, b) {
                        var c = G[b.id.replace(/inside_/g, "")];
                        c && (c.css || (c.css = {}), c.css.zIndex = b.style.zIndex ? b.style.zIndex : "0")
                    })
                }, C.copyElement = function(a) {
                    var c = b.copy(a);
                    q = !0, C.originalElemDef = a, C.copyElemDef = c
                }, C.pasteElement = function(a, c) {
                    c.id = Math.ceil(100 * Math.random()), c.pageId = E.obj.id, c.id = Math.ceil(100 * Math.random()), C.pageId == c.pageId ? i(a, c) : (C.sameCopyCount = 0, c.css = b.copy(a.css));
                    var d = b.copy(c);
                    F.push(d), G[d.id] = d, k(d.type, d), C.pageId = E.obj.id
                };
                var J = null,
                    K = null;
                return D.addInterceptor(function(a, e) {
                    function g() {
                        var b = $('<ul id="popMenu" class="dropdown-menu" style="min-width: 100px; display: block;" role="menu" aria-labelledby="dropdownMenu1">                                <li class="edit" role="presentation"><a role="menuitem" tabindex="-1"><div class="glyphicon glyphicon-edit" style="color: #08a1ef;"></div>&nbsp;&nbsp;编辑</a></li>                                <li class="style" role="presentation"><a role="menuitem" tabindex="-1"><div class="fa fa-paint-brush" style="color: #08a1ef;"></div>&nbsp;&nbsp;样式</a></li>                                <li class="animation" role="presentation"><a role="menuitem" tabindex="-1"><div class="fa fa-video-camera" style="color: #08a1ef;"></div>&nbsp;&nbsp;动画</a></li>                                <li class="link" role="presentation"><a role="menuitem" tabindex="-1"><div class="fa fa-link" style="color: #08a1ef;"></div>&nbsp;&nbsp;链接</a></li>                                <li class="copy" role="presentation" style="margin-bottom:5px;"><a role="menuitem" tabindex="-1"><div class="fa fa-copy" style="color: #08a1ef;"></div>&nbsp;&nbsp;复制</a></li>                                <li class="cut" role="presentation" style="margin-bottom:5px;"><a role="menuitem" tabindex="-1"><div class="fa fa-cut" style="color: #08a1ef;"></div>&nbsp;&nbsp;裁剪</a></li>                                <li role="presentation" class="bottom_bar">                                    <a title="上移一层"><div class="up" style="display: inline-block; width: 26px;height: 22px; background: url(http://static.parastorage.com/services/skins/2.1127.3/images/wysiwyg/core/themes/editor_web/button/fpp-buttons-icons4.png) 0px -26px no-repeat;"></div></a>                                    <a title="下移一层"><div class="down" style="display: inline-block; width: 26px;height: 22px; background: url(http://static.parastorage.com/services/skins/2.1127.3/images/wysiwyg/core/themes/editor_web/button/fpp-buttons-icons4.png) 0px -80px no-repeat;"></div></a>                                    <a title="删除"><div class="remove" style="display: inline-block; width: 26px;height: 22px; background: url(http://static.parastorage.com/services/skins/2.1127.3/images/wysiwyg/core/themes/editor_web/button/fpp-buttons-icons4.png) 0px -1px no-repeat;"></div></a>                                </li>                            </ul>').css({
                            position: "absolute",
                            "user-select": "none"
                        });
                        return q && b.find(".copy").after($('<li class="paste" role="presentation"><a role="menuitem" tabindex="-1"><div class="fa fa-paste" style="color: #08a1ef;"></div>&nbsp;&nbsp;粘贴</a></li>')), b.find(".edit").click(function(c) {
                            switch (c.stopPropagation(), e.type.toString().charAt(0)) {
                                case "1":
                                    break;
                                case "2":
                                    m(a.find(".element").get(0), e);
                                    break;
                                case "3":
                                    break;
                                case "4":
                                    n(e);
                                    break;
                                case "5":
                                    r(e);
                                    break;
                                case "6":
                                    o(e);
                                    break;
                                case "7":
                                    break;
                                case "8":
                                    p(e);
                                    break;
                                case "9":
                                    break;
                                case "g":
                                    break;
                                case "p":
                                    s(e);
                                    break;
                                case "v":
                                    t(e)
                            }
                            b.hide()
                        }), b.find(".style").click(function(c) {
                            f.isAllowToAccess(f.accessDef.CREATE_STYLE_SETTING) ? (c.stopPropagation(), y(e, function(b) {
                                if (1 == e.type)
                                    for (var c in e.properties.labels) b.backgroundColor && (e.properties.labels[c].color.backgroundColor = b.backgroundColor, $(".label_content").css("background-color", b.backgroundColor)), b.color && (e.properties.labels[c].color.color = b.color, $(".label_content").css("color", b.color));
                                else $(".element-box", a).css(b), $.extend(!0, e.css, b)
                            })) : (c.stopPropagation(), d.open({
                                windowClass: "console",
                                templateUrl: "scene/console/fake.tpl.html",
                                controller: "FakeConsoleCtrl",
                                resolve: {
                                    type: function() {
                                        return "style"
                                    }
                                }
                            })), b.hide()
                        }), b.find(".animation").click(function(a) {
                            a.stopPropagation(), z(e, function(a) {
                                e.properties.anim = a
                            }), b.hide()
                        }), b.find(".link").click(function(a) {
                            a.stopPropagation(), B(e), b.hide()
                        }), b.find(".remove").click(function(d) {
                            d.stopPropagation(), a.remove(), F.splice(F.indexOf(G[e.id]), 1), INTERVAL_OBJ[e.id] && (clearInterval(INTERVAL_OBJ[e.id]), delete INTERVAL_OBJ[e.id]), b.hide(), c.$broadcast("hideStylePanel")
                        }), b.find(".down").click(function() {
                            var b = a.prev();
                            if (!(b.length <= 0)) {
                                var c = a.css("zIndex");
                                a.css("zIndex", b.css("zIndex")), b.css("zIndex", c), b.before(a);
                                for (var d = 0; d < F.length; d++)
                                    if (F[d].id == e.id && d > 0) {
                                        var c = F[d].css.zIndex;
                                        F[d].css.zIndex = F[d - 1].css.zIndex, F[d - 1].css.zIndex = c;
                                        break
                                    }
                            }
                        }), b.find(".up").click(function() {
                            var b = a.next();
                            if (!(b.length <= 0)) {
                                var c = a.css("zIndex");
                                a.css("zIndex", b.css("zIndex")), b.css("zIndex", c), b.after(a);
                                for (var d = 0; d < F.length; d++)
                                    if (F[d].id == e.id && d < F.length - 1) {
                                        var c = F[d].css.zIndex;
                                        F[d].css.zIndex = F[d + 1].css.zIndex, F[d + 1].css.zIndex = c;
                                        break
                                    }
                            }
                        }), b.find(".copy").click(function(a) {
                            a.stopPropagation(), C.sameCopyCount = 0, C.pageId = E.obj.id, $(".modal-dialog")[0] || C.copyElement(e), b.hide()
                        }), b.find(".paste").click(function(a) {
                            a.stopPropagation(), $(".modal-dialog")[0] || C.pasteElement(C.originalElemDef, C.copyElemDef), b.hide()
                        }), b.find(".cut").click(function(a) {
                            a.stopPropagation(), A(e), b.hide()
                        }), 4 != e.type && (b.find(".link").hide(), b.find(".cut").hide()), "p" == e.type && (b.find(".animation").hide(), b.find(".style").hide()), b
                    }
                    var h = $("#eq_main");
                    a.on("click contextmenu", ".element-box", function(a) {
                        a.stopPropagation(), $("#btn-toolbar")[0] || (C.elemDefTpl = b.copy(e)), $("#comp_setting:visible").length > 0 && "p" != e.type && (C.currentElemDef = e, c.$broadcast("showStylePanel"));
                        var d = g(),
                            f = $("#popMenu");
                        return f.length > 0 && f.remove(), h.append(d), d.css({
                            left: a.pageX + h.scrollLeft() + 15,
                            top: a.pageY + h.scrollTop()
                        }).show(), h.mousemove(function(a) {
                            (a.pageX < d.offset().left - 20 || a.pageX > d.offset().left + d.width() + 20 || a.pageY < d.offset().top - 20 || a.pageY > d.offset().top + d.height() + 20) && (d.hide(), $(this).unbind("mousemove"))
                        }), !1
                    }), a.attr("title", "按住鼠标进行拖动，点击鼠标进行编辑")
                }), $(document).on("keydown", function(a) {
                    !a.ctrlKey && !a.metaKey || 86 != a.keyCode || !C.elemDefTpl || $("#btn-toolbar")[0] || $(".modal-dialog")[0] || (a.preventDefault(), q && (a.preventDefault(), C.pasteElement(C.originalElemDef, C.copyElemDef)))
                }), $(document).keydown(function(a) {
                    !a.ctrlKey && !a.metaKey || 67 != a.keyCode || !C.elemDefTpl || $("#btn-toolbar")[0] || $(".modal-dialog")[0] || (a.preventDefault(), C.pageId = E.obj.id, C.sameCopyCount = 0, C.copyElement(C.elemDefTpl))
                }), D.bindEditEvent("1", function(a, b) {
                    $(a).unbind("dblclick"), $(a).show().bind("dblclick", function() {
                        u(b)
                    })
                }), D.bindEditEvent("2", function(a, b) {
                    var c = $(".element", a)[0];
                    $(c).mousedown(function(a) {
                        $(this).parents("li").hasClass("inside-active") && a.stopPropagation()
                    }), $(c).bind("contextmenu", function(a) {
                        $(this).parents("li").hasClass("inside-active") ? a.stopPropagation() : $(this).blur()
                    }), c.addEventListener("dblclick", function(a) {
                        m(c, b), $("#popMenu").hide(), a.stopPropagation()
                    })
                }), D.bindEditEvent("3", function(a, b) {
                    $("#editBG").unbind("click"), $("#editBG").show().bind("click", function() {
                        v(b)
                    })
                }), D.bindEditEvent("v", function(a, b) {
                    var c = $(".element", a)[0];
                    $(c).unbind("dblclick"), $(c).bind("dblclick", function() {
                        t(b), $("#popMenu").hide()
                    })
                }), D.bindEditEvent("4", function(a, b) {
                    var c = $(".element", a)[0];
                    $(c).unbind("dblclick"), $(c).bind("dblclick", function() {
                        n(b), $("#popMenu").hide()
                    })
                }), D.bindEditEvent("5", function(a, b) {
                    var c = $(".element", a)[0];
                    $(c).unbind("dblclick"), $(c).bind("dblclick", function() {
                        r(b), $("#popMenu").hide()
                    })
                }), D.bindEditEvent("p", function(a, b) {
                    var c = $(".element", a)[0];
                    $(c).unbind("dblclick"), $(c).bind("dblclick", function() {
                        s(b), $("#popMenu").hide()
                    })
                }), D.bindEditEvent("6", function(a, b) {
                    var c = $(".element", a)[0];
                    $(c).unbind("dblclick"), $(c).bind("dblclick", function() {
                        o(b), $("#popMenu").hide()
                    })
                }), D.bindEditEvent("8", function(a, b) {
                    var c = $(".element", a)[0];
                    $(c).unbind("dblclick"), $(c).bind("dblclick", function() {
                        p(b), $("#popMenu").hide()
                    })
                }), D.bindEditEvent("7", function(a, b) {
                    var c = $(".element", a)[0];
                    c.addEventListener("click", function() {
                        J || d.open({
                            windowClass: "",
                            templateUrl: "scene/console/map.tpl.html",
                            controller: "MapConsoleCtrl"
                        }).result.then(function(a) {
                            var c = new BMap.Map("map_" + b.id);
                            c.clearOverlays();
                            var d = new BMap.Point(a.lng, a.lat),
                                e = new BMap.Marker(d);
                            c.addOverlay(e);
                            var f = new BMap.Label(a.address, {
                                offset: new BMap.Size(20, -10)
                            });
                            e.setLabel(f), c.centerAndZoom(d, 12), b.properties.pointX = a.lng, b.properties.pointY = a.lat, b.properties.x = a.lng, b.properties.y = a.lat, b.properties.markTitle = a.address
                        })
                    })
                }), C.templateEditor = D, C.getTplById = function(b) {
                    var c = "m/scene/select?id=" + b,
                        d = new Date;
                    return c += "&time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, C.createByTpl = function(b) {
                    var c = JSON_URL + "?c=scene&a=createBySys";
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: c,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(b)
                    })
                }, C.getSceneDetail = function(b) {
                    var c = "?c=scene&a=detail&id=" + b;
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.saveSceneSettings = function(b) {
                    var c = "?c=scene&a=saveSettings";
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: JSON_URL + c,
                        headers: {
                            "Content-Type": "text/plain; charset=UTF-8"
                        },
                        data: JSON.stringify(b)
                    })
                }, C.publishScene = function(b) {
                    var c = "scene-publish.htm?id=" + b,
                        d = new Date;
                    return c += "&time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, C.closeScene = function(b) {
                    var c = "?c=scene&a=off&id=" + b,
                        d = new Date;
                    return c += "&time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.openScene = function(b) {
                    var c = "?c=scene&a=on&id=" + b,
                        d = new Date;
                    return c += "&time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.createBlankScene = function(b, c, d) {
                    var e = {
                            name: b,
                            type: c,
                            pageMode: d
                        },
                        f = "?c=scene&a=create";
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: JSON_URL + f,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(e)
                    })
                }, C.copySceneById = function(b) {
                    var c = "?c=scene&a=createByCopy&id=" + b;
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.deleteSceneById = function(b) {
                    var c = "?c=scene&a=delscene&id=" + b;
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.getCoverImages = function() {
                    var b = "?c=upfile&a=userlist&bizType=99&fileType=1&time=" + (new Date).getTime();
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + b
                    })
                }, C.getSceneByPage = function(b, c, d) {
                    var f = "";
                    c || d ? (f = "?c=scene&a=createPage&id=" + b, d && (f += "&copy=true")) : f = "?c=scene&a=design&id=" + b;
                    var g = e.defer(),
                        h = new Date;
                    return f += (/\?/.test(f) ? "&" : "?") + "time=" + h.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + f
                    }).then(function(a) {
                        g.resolve(a), E = a.data, E.obj.elements || (E.obj.elements = []), F = E.obj.elements;
                        for (var b = 0; F && b < F.length; b++) G[F[b].id] = F[b]
                    }, function(a) {
                        g.reject(a)
                    }), g.promise
                }, C.previewSceneTpl = function(b) {
                    var c = "?c=scene&a=syspageinfo&id=" + b,
                        d = (e.defer(), new Date);
                    return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.recordTplUsage = function(b) {
                    var c = "?c=scene&a=usepage&id=" + b;
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: JSON_URL + c
                    })
                }, C.getSceneTpl = function(b) {
                    var c = g.get("tplCache") ? g.get("tplCache") : g("tplCache"),
                        d = e.defer();
                    if (c.get(b)) {
                        var f = $.extend(!0, {}, c.get(b));
                        f.data.obj.scene && f.data.obj.scene.image && f.data.obj.scene.image.bgAudio && (E.obj.scene.image || (E.obj.scene.image = {}), E.obj.scene.image.bgAudio = f.data.obj.scene.image.bgAudio);
                        for (var h = 0; h < f.data.obj.elements.length; h++) {
                            var i = f.data.obj.elements[h];
                            i.id = Math.ceil(100 * Math.random()), i.sceneId = E.obj.sceneId, i.pageId = E.obj.id
                        }
                        F = f.data.obj.elements;
                        for (var j = 0; j < F.length; j++) G[F[j].id] = F[j];
                        d.resolve(f)
                    } else {
                        var k = "?c=scene&a=syspageinfo&id=" + b,
                            l = new Date;
                        k += (/\?/.test(k) ? "&" : "?") + "time=" + l.getTime(), a({
                            withCredentials: !0,
                            method: "GET",
                            url: JSON_URL + k
                        }).then(function(a) {
                            c.put(a.data.obj.id, $.extend(!0, {}, a)), a.data.obj.scene && a.data.obj.scene.image && a.data.obj.scene.image.bgAudio && (E.obj.scene.image || (E.obj.scene.image = {}), E.obj.scene.image.bgAudio = a.data.obj.scene.image.bgAudio);
                            for (var b = 0; b < a.data.obj.elements.length; b++) {
                                var e = a.data.obj.elements[b];
                                e.id = Math.ceil(100 * Math.random()), e.sceneId = E.obj.sceneId, e.pageId = E.obj.id
                            }
                            F = a.data.obj.elements;
                            for (var f = 0; f < F.length; f++) G[F[f].id] = F[f];
                            d.resolve(a)
                        }, function(a) {
                            d.reject(a)
                        })
                    }
                    return d.promise
                }, C.saveScene = function(b) {
                    var c = "?c=scene&a=savepage";
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: JSON_URL + c,
                        headers: {
                            "Content-Type": "text/plain; charset=UTF-8"
                        },
                        data: JSON.stringify(b)
                    })
                }, C.deletePage = function(b) {
                    var c = "?c=scene&a=delPage&id=" + b;
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.getBgImages = function(b) {
                    var c = "m/scene/gallery/" + b,
                        d = new Date;
                    return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, C.createCustomComp = I, C.openAudioModal = w, C.getElements = function() {
                    return F
                }, C.getSceneObj = function() {
                    return E
                }, C.getTpls = function(b, c, d, e) {
                    var f = "?c=scene&a=syslist";
                    null != b && (f += (/\?/.test(f) ? "&" : "?") + "sceneType=" + b), f += (/\?/.test(f) ? "&" : "?") + "pageNo=" + (c ? c : 1), f += (/\?/.test(f) ? "&" : "?") + "pageSize=" + (d ? d : 12), e && (f += (/\?/.test(f) ? "&" : "?") + "orderBy=" + e);
                    var g = new Date;
                    return f += (/\?/.test(f) ? "&" : "?") + "time=" + g.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + f
                    })
                }, C.getSceneType = function() {
                    var b = "?c=statics&a=typelist";
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + b
                    })
                }, C.getPageTpls = function(b, c, d, e, f, g) {
                    var h = "?c=scene&a=syslist";
                    b && (h += (/\?/.test(h) ? "&" : "?") + "tplType=1"), c && (h += (/\?/.test(h) ? "&" : "?") + "bizType=" + c), d && (h += (/\?/.test(h) ? "&" : "?") + "tagId=" + d), g && (h += (/\?/.test(h) ? "&" : "?") + "orderBy=" + g);
                    var i = new Date;
                    return h += (/\?/.test(h) ? "&" : "?") + "pageNo=" + (e ? e : 1), h += (/\?/.test(h) ? "&" : "?") + "pageSize=" + (f ? f : 12), h += (/\?/.test(h) ? "&" : "?") + "time=" + i.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + h
                    })
                }, C.getPageTplTypesTwo = function(b, c) {
                    var d = "?c=upfile&a=systag&type=2&bizType=" + c,
                        e = new Date;
                    return d += (/\?/.test(d) ? "&" : "?") + "time=" + e.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + d
                    })
                }, C
            }
        ]), b.module("services.spread", []), b.module("services.spread").factory("SpreadService", ["$http",
            function(a) {
                var b = {};
				
                return b.getDataBySceneId = function(b, c, d, e, f) {
                    var g = "m/scene/stat?id=" + b;
                    c && (g += "&startDate=" + c), d && (g += "&endDate=" + d), e && (g += "&pageSize=" + e), f && (g += "&pageNo=" + f);
                    var h = new Date;
                    return g += "&time=" + h.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + g
                    })
                }, b.getActivities = function() {
                    var b = new Date;
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + "m/u/promotion/list?type=pc&time=" + b.getTime()
                    })
                }, b.getActivityDetail = function(b) {
                    var c = new Date;
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + "?c=statics&a=all&line=7174&code=" + b + "&time=" + c.getTime()
                    })
                }, b
            }
        ]), b.module("services.usercenter", []).factory("usercenterService", ["$http",
            function(a) {
                var b = {};
                return b.getUserInfo = function() {
                    var b = PREFIX_URL + "m/u/info";
                    return b += "?time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: b
                    })
                }, b.saveUserInfo = function(b) {
                    var c = PREFIX_URL + "m/u/save";
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: c,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(b)
                    })
                }, b.getUserXd = function() {
                    var b = PREFIX_URL + "m/u/xd";
                    return b += "?time=" + (new Date).getTime(), a('')
                }, b.getgiveXd = function(b) {
                    var c = PREFIX_URL + "m/u/giveXd";
                    return c += "?toUser=" + b.toUser, c += "&xdCount=" + b.xdCount, c += "&time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "POST",
                        url: c
                    })
                }, b.getXdlog = function(b, c) {
                    var d = PREFIX_URL + "m/u/xdlog?pageNo=" + b + "&pageSize=" + c;
                    return d += "?time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "POST",
                        url: d
                    })
                }, b.getXdStat = function() {
                    var b = PREFIX_URL + "m/u/xdStat";
                    return b += "?time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: b
                    })
                }, b.relAccount = function(b, c, d) {
                    var e = PREFIX_URL + "eqs/bindAccount?relUser=" + b + "&loginName=" + c + "&loginPassword=" + d;
                    return e += "&time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "POST",
                        url: e,
                        headers: {
                            "Content-Type": "text/plain; charset=UTF-8"
                        }
                    })
                }, b.setRead = function(b) {
                    var c = PREFIX_URL + "m/u/markRead?ids=" + b;
                    return c += "&time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "POST",
                        url: c,
                        headers: {
                            "Content-Type": "text/plain; charset=UTF-8"
                        }
                    })
                }, b.getNewMessage = function(b, c, d) {
                    var e = JSON_URL + "?c=statics&a=all&line=7248&pageNo=" + b + "&pageSize=" + c;
                    return d && (e += "&unread=" + d), e += "&time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: e
                    })
                }, b
            }
        ]), b.module("templates-app", ["about.tpl.html", "data/associateData.tpl.html", "data/editData.tpl.html", "dialog/confirm.tpl.html", "dialog/message.tpl.html", "error.tpl.html", "error/error.tpl.html", "footer.tpl.html", "header.tpl.html", "help.tpl.html", "home/home.tpl.html", "main/customer.tpl.html", "main/main.tpl.html", "main/spread.tpl.html", "main/spreadDetail.tpl.html", "main/userGuide.tpl.html", "my/myscene.tpl.html", "my/sceneSetting.tpl.html", "my/upload.tpl.html", "notifications.tpl.html", "reg/agreement.tpl.html", "reg/reg.tpl.html", "sample/sample.tpl.html", "scene/console.tpl.html", "scene/console/angle-knob.tpl.html", "scene/console/anim.tpl.html", "scene/console/audio.tpl.html", "scene/console/bg.tpl.html", "scene/console/button.tpl.html", "scene/console/category.tpl.html", "scene/console/cropimage.tpl.html", "scene/console/fake.tpl.html", "scene/console/input.tpl.html", "scene/console/link.tpl.html", "scene/console/map.tpl.html", "scene/console/microweb.tpl.html", "scene/console/pic_lunbo.tpl.html", "scene/console/setting.tpl.html", "scene/console/style.tpl.html", "scene/console/tel.tpl.html", "scene/console/video.tpl.html", "scene/create.tpl.html", "scene/createNew.tpl.html", "scene/effect/falling.tpl.html", "scene/scene.tpl.html", "usercenter/console/relAccount.tpl.html", "usercenter/request_reg.tpl.html", "usercenter/transfer.tpl.html", "usercenter/usercenter.tpl.html"]), b.module("about.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("about.tpl.html", '<div class="about">\n    <div class="header">\n        <div class="content">\n            <div class="logo"><img ng-src="{{CLIENT_CDN}}images/logo.png" alt=""></div>\n        </div>\n    </div>\n    <div class="banner">\n    	<img ng-src="{{CLIENT_CDN}}images/contact1.jpg"/>\n    </div>\n    <div class="main clearfix">\n    	<h1>关于我们</h1>\n        <p>一秀是专门为中小微企业营销人员精心打造的移动场景营销管家，旨在帮助中小微企业的营销人员通过移动互联网，轻松构建业务场景，轻量化展示产品和服务，多渠道推广，吸引沉淀客户，再营销，从而持续积累客户，提升营销效果，创造更高更好的市场业绩。</p>\n        <p>如果您需要借助移动互联网做新产品发布、客户培训会、用户沟通沙龙、移动环境中的产品演示、线上调研沟通、服务预约报名等业务活动时，就来一秀吧，我们相信如是微营销一定能帮到您。</p>\n\n        <img ng-src="{{CLIENT_CDN}}images/contact2.jpg"/>\n\n        <p>联系我们：</p>\n        <p>诗 18611538643 </p>\n        <p>邮件：vip@e.wesambo.com</p>\n        <p>QQ：2523238422</p>\n        <p>微信公众号： \n            <img style="display: block;" src="{{CLIENT_CDN}}images/code_about.jpg"/>\n        </p>\n    </div>\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>')
            }
        ]), b.module("data/associateData.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("data/associateData.tpl.html", '<div class="modal-header">\n    <span>导入客户</span>\n</div>\n<div class="data_associate">\n  <form class="form-horizontal" role="form">\n	<ui-select ng-model="person.selected" theme="bootstrap">\n		<ui-select-match placeholder="选择待导入场景">{{$select.selected.TITLE}}</ui-select-match>\n		<ui-select-choices repeat="person in PremergeScenes | propsFilter: {TITLE: $select.search}">\n		  <div ng-click="selectScene(person.ID)" ng-bind-html="person.TITLE | highlight: $select.search"></div>\n		</ui-select-choices>\n	</ui-select>\n\n	<div class="panel panel-default" ng-show="fields">\n	  	<div class="panel-body">	  	\n			<div class="form-group" ng-repeat="(findex, field) in fields">\n			  	<label class="col-sm-2 control-label">{{field.title}}</label>\n			  	<div class="col-sm-10">\n			  		<select class="form-control" ng-change="associate($index)" ng-model="associateMap[findex]" ng-options="staticFiled.name for staticFiled in staticFileds"></select>\n			  	</div>\n			</div>\n		</div>\n	</div>\n  </form>\n</div>\n<div class="modal-footer">\n    <a class="btn-main login" style="width: 88px;" ng-click="confirm()">确定</a>\n    <a class="btn-grey0 cancel" style="width: 88px;" ng-click="cancel()">取消</a>\n</div>')
            }
        ]), b.module("data/editData.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("data/editData.tpl.html", '<div class="panel panel-default">\n  <div class="panel-body">\n    <form name="formName" class="form-horizontal" role="form" style="padding-left:25px;">\n      <div class="form-group form-group-sm">\n        <label for="userName" class="col-sm-2 control-label">\n          姓名\n        </label>\n        <div class="col-sm-8">\n          <input type="text" name="name" ng-model="dataDetail.name" class="form-control"\n          id="userName" placeholder="姓名" show-icon callback-fn="updateData(arg1)">\n        </div>\n      </div>\n      <div class="form-group form-group-sm">\n        <label for="sex" class="col-sm-2 control-label">\n          性别\n        </label>\n        <div class="col-sm-8">\n          <!-- <input type="text" name=" sex" ng-model=" dataDetail.sex" class="form-control"\n          id="sex" placeholder="性别" show-icon callback-fn="updateData(arg1)"> -->\n          <select class="form-control input-sm" ng-model="sex" ng-options="sexOption.name for sexOption in sexOptions"\n          ng-change="updateSex(sex)">\n          </select>\n        </div>\n      </div>\n      <!-- <div class="form-group form-group-sm">\n      <label for="mobile" class="col-sm-2 control-label">手机</label>\n      <div class="col-sm-8">\n      <input type="text" name = "mobile" ng-model = "dataDetail.mobile" class="form-control" id="mobile" placeholder="手机" show-icon callback-fn="updateData(arg1)">\n      </div>\n      </div> -->\n      <div class="form-group form-group-sm" ng-repeat="mobile in formMobiles track by $index">\n        <label for="mobile" class="col-sm-2 control-label" ng-show="$index==0">\n          手机\n        </label>\n        <label for="手机" class="col-sm-2 control-label" ng-show="$index!=0">\n        </label>\n        <div class="col-sm-8" id="mobileAddress">\n          <div class="input-group">\n            <input type="text" name="mobile" ng-model="formMobiles[$index]" class="form-control"\n            placeholder="手机" show-icon callback-fn="updateData(arg1,formMobiles)">\n            <span class="input-group-btn" >\n              <button class="btn btn-default add-btn btn-sm" ng-click="removeInputs($index, \'mobile\', formMobiles)"\n              type="button">\n                <span class="fa fa-minus" >\n                </span>\n              </button>\n            </span>\n          </div>\n        </div>\n        <div class="col-sm-1">\n          <span style="padding-top:10px;" ng-click="addInputs(formMobiles)" ng-show="$index==0" class="fa fa-plus add-inputs">\n          </span>\n        </div>\n      </div>\n      <div class="form-group form-group-sm" ng-repeat="email in formEmails track by $index">\n        <label for="email" class="col-sm-2 control-label" ng-show="$index==0">\n          邮箱\n        </label>\n        <label for="email" class="col-sm-2 control-label" ng-show="$index!=0">\n        </label>\n        <div class="col-sm-8" id="emailAddress">\n          <div class="input-group">\n            <input type="text" name="email" ng-model="formEmails[$index]" class="form-control"\n            placeholder="邮箱" show-icon callback-fn="updateData(arg1,formEmails, formName.emial.$invalid)">\n            <span class="input-group-btn">\n              <button class="btn btn-default add-btn btn-sm" ng-click="removeInputs($index, \'email\', formEmails)"\n              type="button">\n                <span class="fa fa-minus">\n                </span>\n              </button>\n            </span>\n          </div>\n          <!-- /input-group -->\n        </div>\n        <div class="col-sm-1">\n          <span style="padding-top:10px;" ng-click="addInputs(formEmails)" ng-show="$index==0" class="fa fa-plus add-inputs">\n          </span>\n        </div>\n      </div>\n      <div class="form-group form-group-sm">\n        <label for="company" class="col-sm-2 control-label">\n          公司\n        </label>\n        <div class="col-sm-8">\n          <input type="text" name="company" ng-model="dataDetail.company" class="form-control"\n          id="company" placeholder="公司" show-icon callback-fn="updateData(arg1)">\n        </div>\n      </div>\n      <div class="form-group form-group-sm">\n        <label for="job" class="col-sm-2 control-label">\n          职务\n        </label>\n        <div class="col-sm-8">\n          <input type="text" name="job" ng-model="dataDetail.job" class="form-control"\n          id="job" placeholder="职务" show-icon callback-fn="updateData(arg1)" required>\n        </div>\n      </div>\n      <!-- <div class="form-group form-group-sm">\n      <label for="tel" class="col-sm-2 control-label">固定电话</label>\n      <div class="col-sm-8">\n      <input type="text" name = "tel" ng-model = "dataDetail.tel" class="form-control" id="tel" placeholder="固定电话" show-icon callback-fn="updateData(arg1)">\n      </div>\n      </div> -->\n      <div class="form-group form-group-sm" ng-repeat="tel in formTels track by $index">\n        <label for="tel" class="col-sm-2 control-label" ng-show="$index==0">\n          固定电话\n        </label>\n        <label for="tel" class="col-sm-2 control-label" ng-show="$index!=0">\n        </label>\n        <div class="col-sm-8" id="tel">\n          <div class="input-group">\n            <input type="text" name="tel" ng-model="formTels[$index]" class="form-control"\n            placeholder="固定电话" show-icon callback-fn="updateData(arg1,formTels)">\n            <span class="input-group-btn">\n              <button class="btn btn-default add-btn btn-sm" ng-click="removeInputs($index, \'email\', formTels)"\n              type="button">\n                <span class="fa fa-minus">\n                </span>\n              </button>\n            </span>\n          </div>\n          <!-- /input-group -->\n        </div>\n        <div class="col-sm-1">\n          <span style="padding-top:10px;" ng-click="addInputs(formTels)" ng-show="$index==0" class="fa fa-plus add-inputs">\n          </span>\n        </div>\n      </div>\n      <div class="form-group form-group-sm">\n        <label for="address" class="col-sm-2 control-label">\n          地址\n        </label>\n        <div class="col-sm-8">\n          <input type="text" name="address" ng-model="dataDetail.address" class="form-control"\n          id="address" placeholder="地址" show-icon callback-fn="updateData(arg1)">\n        </div>\n      </div>\n      <div class="form-group form-group-sm">\n        <label for="website" class="col-sm-2 control-label">\n          个人网址\n        </label>\n        <div class="col-sm-8">\n          <input type="text" name="website" ng-model="dataDetail.website" class="form-control"\n          id="website" placeholder="网址" show-icon callback-fn="updateData(arg1)">\n        </div>\n      </div>\n      <div class="form-group form-group-sm">\n        <label for="qq" class="col-sm-2 control-label">\n          QQ号\n        </label>\n        <div class="col-sm-8">\n          <input type="text" name="qq" ng-model="dataDetail.qq" class="form-control"\n          id="qq" placeholder="QQ号" show-icon callback-fn="updateData(arg1)">\n        </div>\n      </div>\n      <div class="form-group form-group-sm">\n        <label for="weixin" class="col-sm-2 control-label">\n          微信号\n        </label>\n        <div class="col-sm-8">\n          <input type="text" name="weixin" ng-model="dataDetail.weixin" class="form-control"\n          id="weixin" placeholder="微信号" show-icon callback-fn="updateData(arg1)">\n        </div>\n      </div>\n      <div class="form-group form-group-sm">\n        <label for="yixin" class="col-sm-2 control-label">\n          易信号\n        </label>\n        <div class="col-sm-8">\n          <input type="text" name="yixin" ng-model="dataDetail.yixin" class="form-control"\n          id="yixin" placeholder="易信号" show-icon callback-fn="updateData(arg1)">\n        </div>\n      </div>\n      <div class="form-group form-group-sm">\n        <label for="weibo" class="col-sm-2 control-label">\n          微博号\n        </label>\n        <div class="col-sm-8">\n          <input type="text" name="weibo" ng-model="dataDetail.weibo" class="form-control"\n          id="weibo" placeholder="微博号" show-icon callback-fn="updateData(arg1)">\n        </div>\n      </div>\n      <div class="form-group form-group-sm">\n        <label for="laiwang" class="col-sm-2 control-label">\n          来往号\n        </label>\n        <div class="col-sm-8">\n          <input type="text" name="laiwang" ng-model="dataDetail.laiwang" class="form-control"\n          id="inputEmail3" placeholder="来往号" show-icon callback-fn="updateData(arg1)">\n        </div>\n      </div>\n      <div class="form-group form-group-sm">\n        <label for="remark" class="col-sm-2 control-label">\n          其它\n        </label>\n        <div class="col-sm-8">\n          <input type="text" name="remark" ng-model="dataDetail.remark" class="form-control"\n          id="remark" placeholder="其它" show-icon callback-fn="updateData(arg1)">\n        </div>\n      </div>\n    </form>\n      <div class="edit-bar" style="text-align:center;">\n        <a class="btn btn-main backicon" ng-click="saveData()">\n          <span>保存</span>\n        </a>\n      </div>    \n  </div>\n</div>')
            }
        ]), b.module("dialog/confirm.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("dialog/confirm.tpl.html", '<div class="modal-header">\n    <span class="glyphicon glyphicon-exclamation-sign"></span>\n    <span>提示</span>\n</div>\n<div class="modal-body" ng-if="confirmObj.msg">\n	<!-- confirm message -->\n	<div class="confirm-msg">{{confirmObj.msg}}</div>\n</div>\n<div class="modal-footer">\n    <a ng-click="ok();" class="btn-main"\n    style="width: 88px;">\n        {{confirmObj.confirmName || \'是\'}}\n    </a>\n    <a ng-click="cancel();" class="btn-grey0"\n    style="width: 88px;margin-left: 15px;">\n        {{confirmObj.cancelName || \'取消\'}}\n    </a>\n</div>')
            }
        ]), b.module("dialog/message.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("dialog/message.tpl.html", '<div class="modal-header">\n    <span class="glyphicon glyphicon-exclamation-sign"></span>\n    <span>{{msgObj.title || \'提示\'}}</span>\n</div>\n<div class="modal-body" ng-if="msgObj.msg">\n    <div class="msg" ng-class="msgObj.title ? \'\' : \'msg-padding\'">{{msgObj.msg}}</div>\n</div>\n<div class="modal-footer">\n	<a ng-click="close();" class="btn-main"\n    style="width: 88px;">关闭</a>\n</div>')
            }
        ]), b.module("error.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("error.tpl.html", '<div class="error">\n    <div class="header">\n        <div class="content">\n            <div class="logo"><img ng-src="{{CLIENT_CDN}}images/logo.png" alt=""></div>\n        </div>\n    </div>\n    <div class="error_contain">\n        <div class="error_con">\n            <img ng-src="{{CLIENT_CDN}}images/404_03.png" alt="" />\n            <p style="font-size:24px;margin-top:30px;margin-bottom:15px;">对不起，您想要进入的页面已经去火星了！</p>\n            <p style="text-align:left;"><a href="#/home">返回地球</a></p>\n        </div>\n    </div>\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>')
            }
        ]), b.module("error/error.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("error/error.tpl.html", '<div class="error">\n    <div class="header">\n        <div class="content">\n            <div class="logo"><img ng-src="{{CLIENT_CDN}}images/logo.png" alt="" /></div>\n        </div>\n    </div>\n    <div class="error_contain">\n        <div class="error_con">\n            <img ng-src="{{CLIENT_CDN}}images/404_03.png" alt="" />\n            <p style="font-size:24px;margin-top:30px;margin-bottom:15px;">对不起，您想要进入的页面已经去火星了！</p>\n            <p style="text-align:left;"><a href="#/home">返回地球</a></p>\n        </div>\n    </div>\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>')
            }
        ]), b.module("footer.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("footer.tpl.html", '<footer>\n	<div class="content_center">\n		<article class="footer">\n				<p>\n				<img ng-src="{{CLIENT_CDN}}images/logo.png">\n				      		<a target="_blank" href="javascript:void(0);">加入我们</a>|<a target="_blank" href="javascript:void(0);">意见反馈</a>|<a target="_blank" href="javascript:void(0);">内容举报</a>|<a target="_blank" href="javascript:void(0);">关于我们</a>|<a href="javascript:void(0);">论坛</a> ©2015 <a href="http://e.wesambo.com">e.wesambo.com</a>. All rights reserved\n        	</p>\n        </article>\n	</div>\n</footer>')
            }
        ]), b.module("header.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("header.tpl.html", '<div class="header_tpl">\n	<div class="content clearfix">\n		<div class="logo" id="logo"><a href="#/main"><img ng-src="{{CLIENT_CDN}}images/logo.png" alt=""></a></div>\n		<div class="head_nav" ng-show="showToolBar();">\n			<ul class="clearfix head_navs">\n				<li ng-class="{hover:isActive == \'main\'}"><a href="#/main">我的场景</a></li><li ng-class="{hover:isActive == \'spread\'}"><a href="#/main/spread">我的推广</a></li><li ng-class="{hover:isActive == \'customer\'}"><a href="#/main/customer">我的客户</a></li>\n				<!--<li class="help_center_con" style="height:300px;"  ng-mouseover="showCode2 = true" ng-mouseleave="showCode2 = flase">\n					<a>帮助中心</a>\n					<div class="help_center" ng-show="showCode2 == true">\n						<div><a href="javascript:void(0);">入门必读</a></div>\n						<div><a href="javascript:void(0);">问题反馈</a></div>\n						<div><a href="javascript:void(0);">关于积分</a></div>\n						<div><a href="javascript:void(0);">论坛帮助</a></div>\n					</div>					\n				</li>--><li ng-class="{hover:isActive == \'scene\'}"><a href="#/scene">创建场景</a></li><li><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=319871217&site=qq&menu=yes">付费升级</a></li><li><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=319870408&site=qq&menu=yes">内容举报</a></li><li><a  href="/index.php?c=user&a=logout">退出登录</a></li><li><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=319870408&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:319870408:51" alt="联系客服" /></a></li>				\n			</ul>\n		\n			<login-toolbar></login-toolbar>\n		</div>\n	    \n	</div>\n</div>	\n')
            }
        ]), b.module("help.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("help.tpl.html", '<div ng-include="\'header.tpl.html\'"></div>\n<div id = "usercenter" class="min_contain">\n  <div class = "main clearfix">\n    <div class="help_content">\n        <h1>快速获得积分</h1>\n        <p>1.场景展示得积分</p>\n        <table>\n            <tr><th class="col-sm-3">账号属性</th><th class="col-sm-3">获取积分条件</th><th class="col-sm-8">积分计算</th></tr>\n            <tr><td>普通账号</td><td>分享尾页展示</td><td>5000展示=100积分</td></tr>\n            <tr><td>高级账号</td><td>末页底标展示</td><td>10000展示=100积分</td></tr>\n            <tr><td>服务账号</td><td>末页底标展示</td><td>10000展示=100积分</td></tr>\n            <!-- <tr><td>企业账号</td><td>末页底标</td><td>5000展示=100积分</td></tr> -->\n        </table>\n        <p>2.推荐会员得积分</p>\n        <table>\n            <tr><td class="col-sm-3">推荐会员</td><td class="col-sm-3">注册会员</td><td class="col-sm-8">推荐一个会员，可以获得20个积分</td></tr>\n        </table>\n        <h1 style="margin:20px 0;">积分使用</h1>\n        <table>\n            <tr><th class="col-sm-3">账号属性</th><th class="col-sm-3">使用内容</th><th class="col-sm-8">所需积分</th></tr>\n            <tr><td>普通账号</td><td>去除分享尾页</td><td>100个</td></tr>\n            <tr><td>高级账号</td><td>去除末页底标</td><td>100个</td></tr>\n            <tr><td>服务账号</td><td>去除末页底标/修改载入logo</td><td>100个/500个</td></tr>\n        </table>\n    </div>\n  </div>\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>')
            }
        ]), b.module("home/home.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("home/home.tpl.html", '<div ng-include="\'footer.tpl.html\'"></div>')
            }
        ]), b.module("main/customer.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("main/customer.tpl.html", '<div ng-include="\'header.tpl.html\'"></div>\n<div id="main" class="min_contain">\n    <div class="main clearfix">\n        <ul class="create_btn_group">\n            <li class="btn-main" ng-show="isEditor" page-tpl-types ng-href="#/scene/create/2442?pageId=1">页面模板</li>            \n            <!-- <li><a class="btn-main hint--bottom hint--rounded" ng-click="createScene()" data-hint = "通过组件工具和页面模板创建">自主创建</a></li>\n            <li><a class="btn-secondary hint--rounded hint--bottom" href="#/scene" data-hint = "在推荐的样例场景上直接修改">样例创建</a></li> -->\n<!--             <li><a class="btn-main hint--bottom hint--rounded" href="#/scene" data-hint = "空白创建或通过已有样例创建场景">创建场景</a></li> -->\n        </ul>   \n\n        <div class="info">\n            <ul class="clearfix">\n                <li>\n                    <!-- <span class="glyphicon glyphicon-user secondaryColor"></span> -->\n                    <div class="shou">\n                        <h1 class="">{{allDataCount || 0 | fixnum}}</h1>\n                        <h2>已收集客户</h2>\n                    </div>\n                </li>\n                <li>\n                    <!-- <span class="glyphicon glyphicon-import lightVioletColor"></span> -->\n                    <div class="wei">\n                        <h1 class="lightVioletColor">{{prospectDataAccount || 0 | fixnum}}</h1>\n                        <h2>未导入数据</h2>\n                    </div>\n                </li>\n            </ul>\n        </div> \n\n        <tabset justified="true">     \n                <!-- <div ng-show="editData" ng-include="\'data/editData.tpl.html\'"></div> -->\n                <div class="data" ng-hide="editData">\n                    <div class="data_bar">\n                        <!-- <select ng-show="myScenes" class="scene_dropdown fl" ng-change="selectScene(selectedScene.id)" ng-model="selectedScene" ng-options="scene.name for scene in myScenes">\n                            <option value="" selected="selected">全部来源</option>\n                        </select> -->\n<!--                         \n                        <a style="display:none" class="btn btn-main fr hint--bottom hint--rounded daoru" ng-click="openDataAssociateModal()" tooltip-placement="bottom" tooltip="将数据导入到我的客户中"><span>导入数据</span></a>\n                        <h6 class="fr" style="margin: 18px 20px 0;">小提示：可将场景收集的数据导入到我的客户中</h6> -->\n                        <ul class="tab_head mt20" ng-init="tabcustom = \'custom\'">\n                            <li ng-class="{hover: tabcustom == \'custom\'}" ng-click="tabcustom =\'custom\'">客户信息</li><li style="display:none;" ng-class="{hover: tabcustom == \'daoru\'}" ng-click="tabcustom = \'daoru\'">导入数据</li>\n                        </ul>\n                    </div>\n                    <div class="custom_contain">\n                        <div ng-show="tabcustom == \'custom\'">\n                            <div  class="new_daochu clearfix">\n                                <div class="fr" ng-show="false"><a class="btn btn-secondary hint--bottom hint--rounded daochu" style="margin-left:1px;" ng-href="{{PREFIX_URL + \'m/c/exp\'}}" tooltip-placement="bottom" tooltip="将数据导出为excel文件" tooltip-append-to-body="true"><span>导出Excel</span></a></div>\n                                <!-- <div class="newcustom" ng-click="addCustom()"><span>+</span>新增客户</div> -->\n                            </div> \n                            <div ng-show="customerDatas">                  \n                                <table class = "col-sm-12 table table-bordered text-center data-table" >\n                                    <thead>\n                                        <tr>\n                                            <th>姓名</th>\n                                            <th>手机</th>\n                                            <th>客户群组</th>\n                                            <th>客户来源</th>\n                                            <th>管理</th>\n                                        </tr>\n                                    </thead>\n                                    <tbody>\n                                        <tr ng-class="{hovercolor: trIndex==$index}" ng-repeat="customerData in customerDatas" ng-mouseenter="addColor($index)" ng-mouseleave="removeColor()">\n                                            <td>{{customerData.name}}</td>\n                                            <td>{{customerData.mobile}}</td>\n                                            <td>{{customerData.groupName}}</td>\n                                            <td>{{customerData.originName}}</td>\n                                            <!-- ng-click="editCustomer(customerData)" -->\n                                            <td><a style = "" class="glyphicon glyphicon-cog" ng-click="editCustom(customerData, $index)"></a><a style="margin-left: 30px;" class="glyphicon glyphicon-trash" ng-click="removeCustomer(customerData)"></a></td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                                <pagination style="float: left" first-text="首页" last-text="尾页" previous-text="上一页" next-text="下一页" max-size="10" items-per-page="10" total-items="totalItems" ng-model="currentPage" ng-change="pageChanged(currentPage)" boundary-links="true" rotate="true" num-pages="numPages"></pagination>\n                                <div class="current_page">\n                                    <input type="text" ng-model="toPage" ng-keyup="$event.keyCode == 13 ? pageChanged(toPage) : null">\n                                    <a ng-click="pageChanged(toPage)" class="go">GO</a>\n                                    <span>当前: {{currentPage}} / {{numPages}} 页</span>\n                                </div>\n                            </div>\n                        </div>\n                        <div ng-show="tabcustom == \'daoru\'">\n                            <div class="new_daochu wai_daoru clearfix">\n                                <!-- <div class="newcustom fr" ng-click="addCustom()"><span>+</span>新增客户</div>  -->                               \n                                <div class="custom_data">可导入数据：<span>{{prospectDataAccount || 0 | fixnum}}</span><!-- <span>上传外部表格</span> --></div>\n\n                            </div>\n                            <div class="daoru_contain clearfix" style="text-align:center;" ng-show="importDatas">\n                                <div class="select_cj fl" style="text-align:left;">\n                                    <h2>1.选择新数据场景</h2>\n                                    <ul style="height:489px;">\n                                        <li ng-repeat="importData in importDatas" ng-click="selectScene(importData.ID,$index)" ng-class="{active: select == $index}"><span>{{importData.TITLE}}</span></li>\n                                    </ul>\n                                </div>\n                                <div class="tuo_data ml20 mr20 fl">\n                                    <h2>2.拖拽导入的数据</h2>\n                                    <ul class="item_remove_droppable" style="height:489px;overflow-y:auto;width:210px;" item-remove-droppable>\n                                        <li item-draggable item-id="{{field.id}}" class="list_darggable" ng-repeat="field in fields"><span>{{field.title}}</span></li>\n                                    </ul>                                    \n                                </div>\n                                <div class="nametoname fl">\n                                    <h2>3.拖入对应名称</h2>\n                                    <div class="clearfix tuozhuai" style="height:489px;">\n                                        <div >\n                                            <ul>\n                                                <li style="border-bottom:none;" class="clearfix" ng-repeat="staticFiled in staticFileds">\n                                                    <div class="list_attribute fl" item-droppable item-id="{{staticFiled.id}}">拖拽到此处</div>\n                                                    <div class="list_field fr">{{staticFiled.name}}</div>\n                                                </li>\n                                            </ul>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="action" style="text-align:right" ng-show="importDatas">\n                                <span style="padding-right:60px;">拖拽名称标签放到右侧对应名称中</span>\n                                <span style="padding-right:182px;">导入后原场景数据不会删除</span>\n                                <a type="button" class="btn btn-main" ng-click="confirm()">导入</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>      \n        </tabset>\n    </div>\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>')
            }
        ]), b.module("main/main.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("main/main.tpl.html", '<div ng-include="\'header.tpl.html\'"></div>\n<div id="main" class="min_contain">\n    <div class="main clearfix">\n        <ul class="create_btn_group">\n            <li class="btn-main" ng-show="isEditor" page-tpl-types ng-href="#/scene/create/2442?pageId=1">页面模板</li>            \n        </ul>\n\n        <div class="info"><!-- \n            <h3>我的场景</h3> -->\n            <ul ng-show = "showScene" ng-init="showScene=true;showCustomer=false" class="clearfix">\n                <li style = "float:right;">\n                    <a href="#/scene" alt="创建场景" title="创建场景"><div class="chuangjian"><img ng-src="{{CLIENT_CDN}}images/chuangjian.png" /></div></a>\n                </li>                 \n                <li>\n                    <div class="phone">\n                        <h1 class="baseColor">{{allPageCount || 0 | fixnum}}</h1>\n                        <h2>场景总计</h2>\n                    </div>\n                </li>\n                <li><a href="#/main/spread">\n                    <div class="eye">\n                        <h1 class="secondaryColor"><span>{{allPageView || 0 | fixnum}}</span></h1>\n                        <h2>场景展示</h2>\n                    </div></a>\n                </li>\n                <li>\n                    <div class="show">\n                        <h1 class="secondaryColor"><span>{{allSceneDataCount || 0 | fixnum}}</span></h1>\n                        <h2>收集数据</h2>\n                    </div>\n                </li>               \n            </ul>\n        </div>        \n\n        <tabset justified="true">\n                <div class="content clearfix">\n                    <div class="scene_type">\n                        <select ng-model="scene.type" ng-change="getMyScenes()" ng-options="scenetype.name for scenetype in scene.types">\n                            <option value="">全部</option>\n                        </select>\n                    </div>\n                    <div ng-hide="myScenes">\n                        该分类下还没有创建场景，请\n                        <a href="#/scene">创建场景</a>\n                    </div>\n                    <div class="mask fl" ng-show="myScenes">\n                        <ul class="scene_list">\n                            <li ng-repeat="scene in myScenes track by $index" ng-class="{mr0: $index%4 == 3}">\n                                <div ng-click="showDetail(scene.id)" class="scene_contain" ng-mouseover="scene.showCode = true" ng-mouseleave="scene.showCode = false">\n                                    <a class="f1_container">\n                                        <div class="f1_card" style=" width: 100%; height: 235px;position:relative;" >\n                                            <!-- todo: 给发布过但未更新的场景加标志-->\n                                            <div style="position: absolute;width: 0;height: 0;border-top: 36px solid #000;border-left: 36px solid transparent;top:0px;right:0px;opacity:0.6;" ng-if="!scene.publishTime || (scene.updateTime > scene.publishTime && scene.status != -1)" ng-click="publishScene(scene, $event);" title="点击发布场景">\n                                                <span style="position:relative;top:-40px;right:25px;color:#fff;" class="fa fa-refresh"></span>\n                                            </div>\n                                            <div ng-if="!scene.showCode" class="front face" ng-style="getStyle(scene.image.imgSrc)">\n                                                <div class="check-state rejected" ng-if="scene.status == -1" style="">\n                                                    <em class="fa fa-ban"></em>未通过审核\n                                                </div>\n                                                <div class="check-state checking" ng-if="scene.status == -2" style="">\n                                                    <em class="fa fa-clock-o"></em>场景审核中\n                                                </div>\n                                            </div>\n                                            <div ng-if="scene.showCode" class="face front  qrcode" qr-code qr-url="{{PREFIX_CLIENT_HOST + \'v-\' + scene.code}}">\n                                            </div>\n                                        </div>\n                                    </a>\n                                </div>\n                                <div class="scene_desc" title="{{scene.name}}">\n                                    <span class="item_title">{{scene.name}}</span>\n                                    \n                                    <div class="btn-group">\n                                          <div title="管理场景" class="glyphicon glyphicon-cog dropdown-toggle" data-toggle="dropdown">\n                                          </div>\n                                          <ul class="dropdown-menu" role="menu">\n                                            <li ng-click="sceneSettings(scene.id)"><span class="glyphicon glyphicon-phone baseColor"></span><span>设置</span></li>\n                                            <li ng-click="editScene(scene.id)"><span class="glyphicon glyphicon-edit baseColor"></span><span>编辑</span></li>\n                                            <li ng-if="(!scene.publishTime || scene.updateTime > scene.publishTime && scene.status != -1) && scene.status != -1" ng-click="publishScene(scene)"><span class="fa fa-paper-plane baseColor"></span><span>发布</span></li>\n                                            <li ng-if="scene.status != -1 && scene.status != -2" ng-click="copyScene(scene.id)"><span class="fa fa-copy baseColor"></span><span>复制</span></li>\n                                            <li ng-click="deleteScene(scene.id)"><span class="glyphicon glyphicon-trash baseColor"></span><span>删除</span></li>\n                                          </ul>\n                                    </div>        \n                                </div>\n                                <div class="bottom_info">\n                                    <div style = "position:relative; top:32px; float: right; margin-right: 15px; cursor: pointer;">\n                                        <div ng-if="!scene.publishTime">\n                                            未发布\n                                            <span style="color: #ff0000; display:inline;">!</span>\n                                        </div>\n                                        <img title="点击关闭场景" ng-src="{{CLIENT_CDN}}images/opened.png" ng-if = "scene.status == 1 && scene.publishTime" ng-click = "openScene(scene, false)"/>\n                                        <img title="点击开放场景" ng-src="{{CLIENT_CDN}}images/closed.png"ng-click = "openScene(scene, true)" ng-if = "scene.status == 2 && scene.publishTime"/>\n                                    </div>\n                                    <span>场景展示：<em class="baseColor"><a ng-href="#/main/spread/{{scene.id}}">{{scene.showCount | fixnum}}</a></em><em class="grey">&nbsp;次</em></span>\n                                    <span>收集数据：<em class="baseColor"><a ng-href="#/my/scene/{{scene.id}}">{{scene.dataCount | fixnum}}</a></em><em class="grey">&nbsp;条</em></span>\n                                </div>\n                                \n                            </li>\n                        </ul>\n\n                    </div>\n                    <div class="clearfix fl" ng-show="myScenes">\n                        <pagination style="float: left" first-text="首页" last-text="尾页" previous-text="上一页" next-text="下一页" max-size="10" items-per-page="pageSize" total-items="totalItems" ng-model="currentPage" ng-change="pageChanged(currentPage)" boundary-links="true" rotate="true" num-pages="numPages"></pagination>\n                        <div class="current_page">\n                            <input type="text" ng-model="toPage" ng-keyup="$event.keyCode == 13 ? pageChanged(toPage) : null">\n                            <a ng-click="pageChanged(toPage)" class="go">GO</a>\n                            <span>当前: {{currentPage}} / {{numPages}} 页</span>\n                        </div>\n                    </div>\n                </div>\n        </tabset>\n    </div>\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>\n<div ng-include="\'main/userGuide.tpl.html\'"></div>')
            }
        ]), b.module("main/spread.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("main/spread.tpl.html", '<div ng-include="\'header.tpl.html\'"></div>\n<div id="main" class="min_contain">\n    <div class="main clearfix">\n        <ul class="create_btn_group">\n            <li class="btn-main" ng-show="isEditor" page-tpl-types ng-href="#/scene/create/2442?pageId=1">页面模板</li>            \n            <!-- <li><a class="btn-main hint--bottom hint--rounded" ng-click="createScene()" data-hint = "通过组件工具和页面模板创建">自主创建</a></li>\n            <li><a class="btn-secondary hint--rounded hint--bottom" href="#/scene" data-hint = "在推荐的样例场景上直接修改">样例创建</a></li> -->\n<!--             <li><a class="btn-main hint--bottom hint--rounded" href="#/scene" data-hint = "空白创建或通过已有样例创建场景">创建场景</a></li> -->\n        </ul>   \n\n        <div class="info">\n            <ul class="clearfix">\n                <li><a href="#/main">\n                    <!-- <span class="glyphicon glyphicon-folder-close secondaryColor"></span> -->\n                    <div class="phone">\n                        <h1 class="secondaryColor"><span>{{allPageCount || 0 | fixnum}}</span></h1>\n                        <h2>场景总计</h2>\n                    </div>\n                    </a>\n                </li>\n                <li><a href="#/main">\n                    <!-- <span class="glyphicon glyphicon-folder-open lightVioletColor"></span> -->\n                    <div class="kai">\n                        <h1 class="lightVioletColor"><span>{{openCount || 0 | fixnum}}</span></h1>\n                        <h2>开放场景</h2>\n                    </div></a>\n                </li>\n                <li>\n                    <!-- <span class="glyphicon glyphicon-eye-open baseColor"></span> -->\n                    <div class="eye">\n                        <h1 class="lightBlueColor"><span>{{allPageView || 0 | fixnum}}</span></h1>\n                        <h2>场景展示</h2>\n                    </div>\n                </li>\n                <li>\n                    <!-- <span class="glyphicon glyphicon-list-alt secondaryColor"></span> -->\n                    <div class="show">\n                        <h1 class="secondaryColor"><span>{{allSceneDataCount || 0 | fixnum}}</span></h1>\n                        <h2>已收集数据</h2>\n                    </div>\n                </li>\n            </ul>\n        </div> \n\n        <tabset justified="true">\n            <div class="content clearfix">\n                <div class="panel panel-default">\n                  <div class="panel-body">\n                    <div class="col-xs-4 text-center">\n                        <div class="circle-data" style="color: #08a1ef;"><span num-change-anim content="{{allPageView}}"><span></span></span></div>\n                        <div class="h5">场景展示</div>\n                    </div>\n                    <div class="col-xs-4 text-center">\n                        <div class="circle-data" style="color: #9ad64b;"><span num-change-anim content="{{allSceneDataCount}}"><span></span></span></div>\n                        <div class="h5">收集数据</div>\n                    </div>\n                    <div class="col-xs-4 text-center">\n                        <div class="circle-data" style="color: #68dcc7;"><span num-change-anim content="{{dataRatio}}"><span></span>%</span></div>\n                        <div class="h5">转换率</div>\n                    </div>\n                  </div>\n                </div>\n                \n                <div class="data">\n                    <!-- <div external-scopes="spreadScope" ui-grid="spreadGridOptions" class="myGrid"></div> -->\n                    <table class = "col-sm-12 table table-bordered text-center data-table" >\n                        <thead>\n                            <tr>\n                                <th>场景</th>\n                                <th>展示次数</th>\n                                <th>收集数据</th>\n                                <th>转化率</th>\n                                <th>详情</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr ng-class="{hovercolor: trIndex==$index}" ng-repeat="spreadData in spreadDatas" ng-mouseenter="addColor($index)" ng-mouseleave="removeColor()">\n                                <td>{{spreadData.name}}</td>\n                                <td>{{spreadData.showCount}}</td>\n                                <td>{{spreadData.dataCount}}</td>\n                                <td>{{spreadData.showCount == 0 ? "0.00%":(spreadData.dataCount * 100/spreadData.showCount).toFixed(2) + "%"}}</td>\n                                <td><a class="glyphicon glyphicon-stats spread-detail" title="查看详情" ng-click="viewDetail(spreadData)"></a></td>\n                            </tr>\n                        </tbody>\n                    </table>\n                    <pagination style="float: left" first-text="首页" last-text="尾页" previous-text="上一页" next-text="下一页" max-size="10" items-per-page="10" total-items="totalItems" ng-model="currentPage" ng-change="pageChanged(currentPage)" boundary-links="true" rotate="true" num-pages="numPages"></pagination>\n                    <div class="current_page">\n                        <input type="text" ng-model="toPage" ng-keyup="$event.keyCode == 13 ? pageChanged(toPage) : null">\n                        <a ng-click="pageChanged(toPage)" class="go">GO</a>\n                        <span>当前: {{currentPage}} / {{numPages}} 页</span>\n                    </div>\n                    \n                </div>  \n            </div>\n        </tabset>\n    </div>\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>\n\n\n\n\n\n\n\n')
            }
        ]), b.module("main/spreadDetail.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("main/spreadDetail.tpl.html", '<div ng-include="\'header.tpl.html\'"></div>\n<div id="main" class="min_contain">\n    <div id="spread" class="main clearfix">\n        <div class="spread_content">\n            <div class="panel panel-default" style="margin-top:0;">\n<!--               <div class="panel-heading" style="background-color:#FFF;"><span class="title">{{scene.name}}</span>&nbsp;&nbsp;<a style="padding-left:30px;font-size:16px;" target="_blank" ng-href="{{VIEW_URL + \'v-\' + scene.code}}">查看场景</a></div> -->\n              <div class="panel-body spread_ge">\n                <div class="fl">\n                    <img height="110px" ng-src="{{PREFIX_FILE_HOST + scene.image.imgSrc}}"/>\n                    <div class="scene_info" style="padding-left:10px;">\n                        <div class="" style="border-bottom:1px solid #e6e6e6"><a style="font-size:18px;color:#666;" target="_blank" ng-href="{{VIEW_URL + \'v-\' + scene.code}}">{{scene.name}}</a></div>\n                        <div>场景状态：<span ng-show="scene.status == \'1\'" style="color:#08a1ef">开放</span><span ng-show="scene.status == \'0\'">关闭</span></div>\n                        <div>修改时间：{{scene.updateTime | date:\'yyyy年MM月dd日\'}}</div>\n                        <div>创建时间：{{scene.createTime | date:\'yyyy年MM月dd日\'}}</div>\n                    </div>\n                    \n                </div>\n                <ul class="fr">\n                    <li><a href="#/main">\n                        <!-- <span class="glyphicon glyphicon-folder-close secondaryColor"></span> -->\n                        <div class="phone">\n                            <h1 class="secondaryColor"><span>{{scene.showCount || 0 | fixnum}}</span></h1>\n                            <h2>场景展示</h2>\n                        </div>\n                        </a>\n                    </li>  \n                    <li><a href="#/main/customer">\n                        <!-- <span class="glyphicon glyphicon-list-alt secondaryColor"></span> -->\n                        <div class="show">\n                            <h1 class="secondaryColor"><span>{{scene.dataCount || 0 | fixnum}}</span></h1>\n                            <h2>已收集数据</h2>\n                        </div></a>\n                    </li>                  \n                </ul>\n              </div>\n            </div>\n            <div class="chang_contain">\n                <div class="tab_two clearfix" ng-init="tabclass=\'tongji\'">\n                    <div ng-show="false" ng-class="{hover: tabclass == \'tongji\'}" ng-click="tabclass=\'tongji\'">场景统计</div>\n                    <div ng-class="{hover: tabclass == \'tuiguang\'}" ng-show="tabclass= \'tuiguang\'">推广方法</div>\n                </div>\n                <div class="tab_contain">\n                    <div ng-show="false" class="changjing_tongji clearfix" ng-show="tabclass == \'tongji\'">\n                        <div class="col-sm-2 fl">\n                            <div class="col-sm-12" style="padding: 0;">\n                              <ul class="nav nav-tabs tabs-left" ng-init="tabid=\'viewinfo\'">\n                                <li ng-class="{active: tabid == \'viewinfo\'}"><a ng-click="tabid=\'viewinfo\'">访问概况</a></li>\n                                <li ng-class="{active: tabid == \'mobileinfo\'}"><a ng-click="tabid=\'mobileinfo\'">移动访问</a></li>\n                                <li ng-class="{active: tabid == \'viewclick\'}"><a ng-click="tabid=\'viewclick\'">内容统计</a></li>\n                              </ul>\n                            </div>\n                        </div>\n                        <div class="col-xs-10 fr">\n                            <div class="view_info panel panel-default">\n                                <div class="panel-body" ng-init="interval=7">                                \n                                    <span class="btn btn-main" ng-class="{active: interval==1 }" ng-click="getLastdayStats();interval=1">昨天</span>\n                                    <span class="btn btn-main" ng-class="{active: interval==7 }" ng-click="getLast7dayStats();interval=7">7天</span>\n                                    <span class="btn btn-main" ng-class="{active: interval==30 }" ng-click="getLast30dayStats();interval=30">30天</span>\n                                </div>\n                            </div>\n                            <div class="view_info panel panel-default" ng-show="tabid == \'viewinfo\'">\n                                <div class="panel-body">\n                                    <div ng-show="spreadViewGridOptions.data && spreadViewGridOptions.data.length > 0">\n                                        <div class="title">展示次数</div>\n                                        <canvas ng-if="viewLineChartData" line-chart data="{{viewLineChartData}}" width="750" height="200"/>\n                                        <div class="title" style="margin-top:20px;">收集数据</div>\n                                        <canvas ng-if="dataLineChartData" line-chart data="{{dataLineChartData}}" width="750"  height="200"/>\n                                        <div class="data">\n                                            <div ui-grid="spreadViewGridOptions" class="myGrid1"></div>\n                                        </div>\n                                    </div>\n\n                                    <div class="data" ng-show="!spreadViewGridOptions.data || spreadViewGridOptions.data.length <= 0">\n                                        暂无数据\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class="view_info panel panel-default" ng-if="tabid == \'mobileinfo\'">\n                                <div class="panel-body">\n                                    <div ng-show="spreadMobileGridOptions.data">\n                                        <div class="col-xs-4 text-center">\n                                            <div class="circle-data" style="color: #08a1ef;">\n                                                <span num-change-anim content="{{timelineData}}"><span>\n                                            </div>\n                                        </div>                                \n                                        <div class="col-xs-4 text-center">\n                                            <div class="circle-data" style="color: #68dcc7;">\n                                                <span num-change-anim content="{{weixinGroupData}}"><span>\n                                            </div>\n                                        </div>\n                                        <div class="col-xs-4 text-center">\n                                            <div class="circle-data" style="color: #9ad64b;">\n                                                <span num-change-anim content="{{weixinData}}"><span>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class="data" ng-show="spreadMobileGridOptions.data">\n                                        <div ui-grid="spreadMobileGridOptions" class="myGrid1"></div>\n                                    </div>\n\n                                    <div class="data" ng-show="!spreadMobileGridOptions.data || spreadMobileGridOptions.data.length <= 0">\n                                        暂无数据\n                                    </div>\n                                </div>\n                            </div>\n                              \n                            <div class="view_info panel panel-default" ng-show="tabid == \'viewclick\'">\n                                <div class="panel-body">\n                                    <div class="data" ng-show="spreadClickGridOptions.data">\n                                        <div ui-grid="spreadClickGridOptions" class="myGrid1"></div>\n                                    </div>\n                                    <div class="data" ng-show="!spreadClickGridOptions.data || spreadClickGridOptions.data.length <= 0">\n                                        暂无数据\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="tuiguang_content" ng-show="tabclass == \'tuiguang\'">\n                        <div class="weixin_title ">\n                            <ul class="clearfix">\n                                <li class="hover">微信推广</li>\n                            </ul>\n                        </div>\n                        <div class="tuiguang_one tuiguang_same">\n                            <h1><span>1. 微信扫描分享到朋友圈</span></h1>\n                            <div class="weixin_friend" style="margin-bottom:40px">\n                                <ul class="clearfix">\n                                    <li><div qr-code qr-url="{{PREFIX_CLIENT_HOST + \'v-\' + scene.code}}"></div></li>\n                                    <li><img ng-src="{{CLIENT_CDN}}images/weixin_05.png" alt="" /></li>\n                                    <li><img ng-src="{{CLIENT_CDN}}images/weixin_07.png" alt="" /></li>                                                                        \n                                </ul>\n                            </div>\n                            <div class="weixin_step">\n                                <ul class="clearfix">\n                                    <li><img ng-src="{{CLIENT_CDN}}images/weixin_13.png" alt="" /></li>\n                                    <li><img ng-src="{{CLIENT_CDN}}images/weixin_15.png" alt="" /></li>\n                                    <li><img ng-src="{{CLIENT_CDN}}images/weixin_16.png" alt="" /></li>                                                                        \n                                </ul>\n                            </div>                            \n                        </div>\n                        <div class="tuiguang_two tuiguang_same">\n                            <h1><span>2.通过微信公众号群发</span></h1>\n                            <div class="weixin_list">\n                                <p class="medth">方法一</p>\n                                <div class="weixin_list_con">\n                                    <p>群发消息，在微信公众账号群发消息时推广场景地址</p>\n                                    <div class="weixin_address clearfix">\n                                        <span class="" title="">{{url}}</span>\n                                        <a target="_blank" class="" ng-href="{{VIEW_URL + \'v-\' + scene.code}}">点击预览</a>\n                                    </div>\n                                    <div class="con_show clearfix">\n                                        <div style="color:#333;margin-top:20px;font-size:14px;font-weight:300;"><p style="float:left;">主动发送消息：请将这段“</p><xmp style="color:#333;font-weight:300;font-family:\'Microsoft Yahei\';margin:0px;padding:0px 0 0 0;float:left;"><a href="{{url}}">{{scene.name}}</a></xmp><p style="line-height:20px;">”修改和粘贴到群发消息中，点击下面群发</p></div>\n                                    </div>\n                                    <p style="margin-top:20px;">自动回复消息：在自动回复时设置回复内容为场景地址和场景名称。</p>\n                                </div>\n                            </div>\n                            <div class="weixin_list">\n                                <p class="medth">方法二</p>\n                                <div class="weixin_list_con">\n                                    <p>群发消息，在微信公众账号群发消息时推广场景二维码</p>\n                                    <div class="weixin_erwei weixin_address clearfix">\n                                        <span>\n                                            <div qr-code qr-url="{{PREFIX_CLIENT_HOST + \'v-\' + scene.code}}"></div></span><a ng-href="{{PREFIX_SERVER_HOST + \'eqs/qrcode/\' + scene.code + \'.png\'}}" target="_blank" download>下载二维码</a>\n                                    </div>\n                                </div>\n                            </div>                                                        \n                        </div>\n                        <div class="tuiguang_one tuiguang_same">\n                            <h1><span>3.公众号自定义菜单链接场景</span></h1>\n                            <div class="weixin_friend" style="margin-bottom:40px">\n                                <ul class="clearfix">\n                                    <li><img ng-src="{{CLIENT_CDN}}images/weixin_21.png" alt="" /></li>\n                                    <li><img ng-src="{{CLIENT_CDN}}images/weixin_24.png" alt="" /></li>\n                                    <li><img ng-src="{{CLIENT_CDN}}images/weixin_26.png" alt="" /></li>                                                                        \n                                </ul>\n                            </div>\n                            <div class="weixin_step">\n                                <ul class="clearfix">\n                                    <li><img ng-src="{{CLIENT_CDN}}images/weixin_32.png" alt="" /></li>\n                                    <li><img ng-src="{{CLIENT_CDN}}images/weixin_33.png" alt="" /></li>\n                                    <li><img ng-src="{{CLIENT_CDN}}images/weixin_34.png" alt="" /></li>                                                                        \n                                </ul>\n                            </div>                            \n                        </div>                        \n                    </div>\n                </div> \n            </div>                 \n        </div>\n            \n    </div>\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>')
            }
        ]), b.module("main/userGuide.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("main/userGuide.tpl.html", '<div style="position: fixed; left: 0; top: 0; bottom: 0; right: 0; background: rgba(0,0,0,0.8); z-index: 10000;" ng-show="firstLogin" ng-click="firstLogin = false;" ng-controller="userGuideCtrl">\n    <div style="width: 1000px; margin: 0 auto;">\n        <img style="margin: 109px 66px 0 30px; float: right;" ng-src="{{CLIENT_CDN}}images/chuangjian.png">\n        <img style="margin: 140px 0 0 0; float: right;" ng-src="{{CLIENT_CDN}}images/guide_main.png">\n    </div>\n</div>')
            }
        ]), b.module("my/myscene.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("my/myscene.tpl.html", '<div ng-include="\'header.tpl.html\'"></div>\n<div class="myscene">\n    <div class="main clearfix">\n        <div class="content">\n            <div class="fl">\n                <iframe style="border: 0; width: 322px; height: 641px;" ng-src="{{customUrl}}"></iframe>\n            </div>  \n            <div class="rcont" data-ng-init = "init()">\n                <div class="top" style="background-color:#FFF">\n                    <div class="title">\n                        <!--添加外部div class="scen_top_title"-->\n                        <div class="scen_top_title">\n                            <h1 title="{{scene.sceneName}}">{{scene.name}}</h1>\n                            <!-- <a title="编辑场景" href="#/scene/create/{{sceneId}}?pageId=1" class="glyphicon glyphicon-edit" tooltip = "编辑场景" tooltip-placement = "right" tooltip-append-to-body = "true" ></a> -->\n                        </div>\n                        <a class="btn-main" tooltip = "发布场景" tooltip-placement = "right" tooltip-append-to-body = "true" ng-click="publishScene(sceneId)">发布场景</a>\n                        <a class="btn-main" ng-href = "#/my/sceneSetting/{{sceneId}}" tooltip = "修改场景设置" tooltip-placement = "right" tooltip-append-to-body = "true" >场景设置</a>\n                        <a class="btn-main" ng-click = "closeScene(sceneId)" tooltip = "关闭场景" tooltip-placement = "right" tooltip-append-to-body = "true" ng-if = "showCloseSceneBtn">关闭场景</a>\n                        <a class="btn-main" ng-click = "openScene(sceneId)" tooltip = "开放场景" tooltip-placement = "right" tooltip-append-to-body = "true" ng-if = "showOpenSceneBtn">开放场景</a>\n                    </div>                  \n                    <div class="info">\n                        <div style="margin-right: 20px;">\n                            <a href="#/main/spread">\n                            <!-- <span class="glyphicon glyphicon-eye-open secondaryColor"></span> -->\n                            <div class="eye">\n                                <h1><span>{{scene.showCount >= 0 ? scene.showCount : 0 | fixnum}}</span></h1>\n                                <h2>场景展示</h2>\n                            </div></a>\n                        </div>                           \n                        <div>\n                            <a ng-click = "goData()">\n                            <!-- <span class="glyphicon glyphicon-list-alt baseColor"></span> -->\n                            <div class="show">\n                                <h1 class="baseColor"><span>{{totalItems | fixnum}}</span></h1>\n                                <h2>收集数据</h2>\n                            </div></a>\n                        </div>                                          \n                    </div>\n                </div>\n\n                <div class="bom" style="background-color:#FFF;">\n                    <div class="title">\n                        <span class="title_text">快速推广场景</span>\n                    </div>\n                    <div class="share_content">\n                        <ul>\n                            <li style="width: 250px;margin-right: 40px;">\n                                <div class="share_header" style="margin-bottom: 0;">\n                                    <span class="num">1</span>\n                                    <span class="share_title" style="width: 210px;">微信分享</span>\n                                </div>\n                                <div style="margin:17px 0 15px 40px" class="wc_code qr-code" qr-code qr-url="{{url}}"><!-- <img ng-src="{{code}}" width="240" alt=""> --></div>\n                                <p style="margin-left:40px;" style="color: #999;">现在扫一扫马上分享给朋友圈！</p>\n                            </li>\n\n                            <li style="margin-bottom: 50px;">\n                                <div class="share_header">\n                                    <span class="num">2</span>\n                                    <span class="share_title" style="width: 289px;">社交网络分享</span>\n                                </div>\n                                <div class="bdsharebuttonbox" data-tag="share_1">\n                                    <a class="bds_tsina" data-cmd="tsina"></a>\n                                    <a class="bds_tqq" data-cmd="tqq"></a>\n                                    <a class="bds_qzone" data-cmd="qzone" href="#"></a>\n                                    <a class="bds_sqq" data-cmd="sqq" href="#"></a>\n                                    <a class="bds_douban" data-cmd="douban" href="#"></a>\n                                    <a class="bds_count" data-cmd="count"></a>\n                                </div>\n                            </li>\n\n                            <li>\n                                <div class="share_header">\n                                    <span class="num">3</span>\n                                    <span class="share_title" style="width: 289px;">场景网址</span>\n                                </div>\n                                <p>\n                                    <span class="fl scene_url" title="{{url}}">{{url}}</span>\n                                    <a target="_blank" ng-href="{{url}}" class="tg_btn fl">点击预览</a>\n                                </p>\n                            </li>\n                        </ul>\n                    </div>\n                    <div class = "changjing_caozuo">\n                        <a href="#/scene/create/{{sceneId}}?pageId=1" class="btn-secondary" >编辑场景</a>\n                    </div>                    \n                </div>                \n            </div> \n            </div> \n            <div class="col-sm-12 export" ng-if="totalItems" id="collectData">\n                <span class="data_title">已收集数据</span>\n                <a ng-href="{{PREFIX_URL + \'m/scene/excel/\' + sceneId}}">\n                    <span ng-show="false" class="export_excel">导出excel</span>\n                </a>\n            </div>      \n            <div class="data">\n                <table class="header_table col-sm-12">\n                    <tr>\n                        <td class="data_header" ng-repeat="header in dataHeader track by $index">{{header}}</td>\n                    </tr>\n                </table>\n                <table>\n                    <tr ng-repeat="data in dataList">\n                        <td title="{{item}}" ng-repeat="item in data track by $index" ng-style="getTdStyle($index);">{{item}}</td>\n                    </tr>\n                </table>\n                <div ng-show="totalItems">\n                    <pagination style="float: left;" first-text="首页" last-text="尾页" previous-text="上一页" next-text="下一页" max-size="10" items-per-page="10" total-items="totalItems" ng-model="currentPage" ng-change="pageChanged(currentPage)" boundary-links="true" rotate="true" num-pages="numPages"></pagination>\n                    <div class="current_page">\n                        <input type="text" ng-model="toPage" ng-keyup="$event.keyCode == 13 ? pageChanged(toPage) : null">\n                        <a ng-click="pageChanged(toPage)" class="go">GO</a>\n                        <span>当前: {{currentPage}} / {{numPages}} 页</span>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>\n<script type="text/javascript">\n</script>\n')
            }
        ]), b.module("my/sceneSetting.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("my/sceneSetting.tpl.html", '<div ng-include="\'header.tpl.html\'"></div>\n<div class="myscene min-contain">\n	<div class="main clearfix">\n	    <div class="content">\n	        <div class="fl">\n	            <iframe style="border: 0; width: 322px; height: 641px;" ng-src="{{customUrl}}"></iframe>\n\n	        </div> \n			<div class="rcont">\n			    <div class="top" style = "height: auto;">                  \n			        <div style = " width:100%; font-size: 16px; font-weight: 200; color: #666;">\n			            <div class="alert alert-warning text-center" role="alert" ng-show = "invalidText" style = "margin-left: 15px; margin-right: 55px;">\n			                {{invalidText}}\n			            </div>\n			            <form class="form-horizontal" role="form" name = "myForm" novalidate>\n				            <div class="form_img_input clearfix">\n						        <div class="title">\n						            <h1 title="场景基本信息设置">基本设置</h1>\n						        </div>				            	\n				                <div class="form-group form_upload col-sm-4">\n				                    <div class = "cover-panel" style = "margin-left: 20px;">\n				                        <div class = "cover-list" >\n				                          <nobr>\n				                            <ul>\n				                                <li style = "display: inline line-height: 100px;" title="更换此场景封面"><a ng-click = "openImageModal()" style="display:block;"><img style = "width:190px; height:190px;" ng-src="{{PREFIX_FILE_HOST +  scene.image.imgSrc}}" /><em>更换场景封面</em></a></li>\n				                            </ul>\n				                          </nobr>\n				                    	</div>\n				                    </div>\n				                </div>				            	\n				            	<div class="form_input_groups col-sm-8">\n					                <div class="form-group control-group">\n					                    <label for="name" class="col-sm-3 control-label">场景名称</label>\n					                    <div class="col-sm-9">\n					                        <input name = "name" type="text" class="form-control" id="name" placeholder="场景名称" ng-model = "scene.name">\n					                    </div>\n					                </div>\n					                <div class="form-group">\n					                    <label for="type" class="col-sm-3 control-label">场景类型</label>\n					                    <div class="col-sm-9">\n					                        <select ng-model="scene.type" ng-options="scenetype.name for scenetype in types" id = "type" class = "form-control"></select>\n					                    </div>\n					                </div>\n					                <div class="form-group">\n					                    <label for="page_mode" class="col-sm-3 control-label">翻页方式</label>\n					                    <div class="col-sm-9">\n					                        <select ng-model="scene.pageMode" ng-options="pagemode.name for pagemode in pagemodes" id = "page_mode" class = "form-control"></select>\n					                    </div>\n					                </div>\n					                <div class="form-group">\n					                    <label for="description" class="col-sm-3 control-label">场景描述</label>\n					                    <div class="col-sm-9">\n					                        <textarea ng-model = "scene.description" class="form-control" rows="2" id = "description" name = "description" maxlength = "30" placeholder="你可以写下30字的场景描述哦！"></textarea>\n					                    </div>\n					                </div>					                \n					            </div>\n					        </div>\n					        <div class="gao_shezhi">\n						        <h1 style="font-size:18px;padding-left:20px;line-height:50px;border-bottom:1px solid #ddd;display:none;">高级设置</h1>\n				                <!--<section ng-if="!isAllowToAccessLastPageSetting && !hideAd">\n				                    <div class="form-group">                                \n				                        <label for="page_mode" style="margin-left:35px;padding:5px 0;" class="control-label">尾页设置</label>\n				                        <div class = "cover-panel" style = "margin-left: 20px;">\n				                            <div class = "cover-list col-sm-11" style="height:120px;overflow-x:auto;overflow-y:hidden; margin-left: 15px; border: 1px solid #ccc; margin-top: 10px;">\n				                              <nobr>\n				                                <ul>\n				                                    <li style = "display: inline; line-height: 115px;" ng-repeat="pageTpl in pageTpls" img-click\n				                                    ng-click = "chooseLastPage(pageTpl.id)">\n				                                    <a href=""><img ng-class="{checked: scene.image.lastPageId == pageTpl.id}" style = "width: 50px; height: 78px; margin-left: 10px;" ng-src="{{PREFIX_FILE_HOST + pageTpl.properties.thumbSrc}}"/></a>\n				                                    </li>\n				                                </ul>\n				                              </nobr>\n				                        </div>\n				                        </div>\n				                    </div>\n				                </section>\n	-->			                <div class="form-group" style = "margin-top: 15px;" ng-show="false">\n				                  <label for="start_date" class="col-sm-2 control-label">开放时间</label>\n				                  <div>\n				                    <div style = "margin-left: 130px;" class="input-group col-sm-3 col-sm-offset-2">\n				                    <input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="startDate" is-open="openedmin" min-date="minDateStart" max-date="maxDateStart" datepicker-options="dateOptions" ng-required="true" close-text="关闭" clear-text = "清除" current-text = "今天" placeholder = "开放时间" readonly/>\n				                    <span class="input-group-btn">\n				                      <button type="button" class="btn btn-default" ng-click="openmin($event)" ng-disabled = "alwaysOpen"><i class="glyphicon glyphicon-calendar"></i></button>\n				                    </span>\n				                  </div>\n				                  <div class="input-group col-sm-3 col-sm-offset-6" style = "margin-top: -35px;">\n				                    <input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="endDate" is-open="openedmax" min-date="minDateEnd" max-date="\'2015-06-22\'" datepicker-options="dateOptions" ng-required="true" close-text="关闭"  clear-text = "清除" current-text = "今天" placeholder = "结束时间"  readonly/>\n				                    <span class="input-group-btn">\n				                      <button type="button" class="btn btn-default" ng-click="openmax($event)" ng-disabled = "alwaysOpen"><i class="glyphicon glyphicon-calendar"></i></button>\n				                    </span>\n				                  </div>\n				                  <div class="checkbox col-sm-offset-9" style = "margin-top: -35px;">\n				                    <label style = "padding-left: 40px;">\n				                      <input type="checkbox" ng-model = "alwaysOpen" ng-change = "switchOpen()"> 不限制\n				                    </label>\n				                  </div>\n				                  </div>\n				                </div>\n				                <div ng-if = "!hideAd && scene.createTime > 1416502800000" class="form-group" style = "font-weight: 100; margin-top:10px!important;margin-bottom:10px!important">\n				                    <label for="description" class="col-sm-2 control-label">广告提醒</label>\n				                    <div class="col-sm-10">\n				                        <label style = "padding-top: 7px;">\n				                          <span ng-hide="isVendorUser || isAdvancedUser" style = "font-weight: 100;">免费用户的场景尾页会显示[一秀]的链接，付费用户则不会显示，如需要升级为付费用户，请到 <a href="http://e.wesambo.com" target = "_blank">http://e.wesambo.com</a> <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin319871217&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:319870408:51" alt="升级为付费用户请点我" /></a><br>如果您已经是付费用户，请忽略此提示！</span>\n				                          <span ng-if="isVendorUser || isAdvancedUser" ng-show="false" style = "font-weight: 100;padding-left:5px;">去掉场景中“一秀技术支持”，本次使用100个积分</span>\n				                        </label>\n				                    </div>\n				                    <div class = "col-sm-offset-2 col-sm-10" style = "margin-top: 5px;">\n				                         <div ng-show="false" style = "display: inline-block;padding-left: 24px; margin-left:0px; width: auto;">我的积分：<span>{{userXd | fixnum}}</span>个</div>\n				                        <div ng-show="false" style = "display: inline-block;"></div>\n				                    </div>\n				                </div>	\n			                \n				                  <div ng-show="false" class="form-group" style = "margin-top: 25px;">\n				                    <label for="share" class="col-sm-2 control-label">推广设置</label>\n				                    <div class="checkbox col-sm-offset-2">\n				                      <label style = "margin-left: 15px; font-weight: 300;">\n				                        <input id = "share"  type="checkbox" ng-true-value = "1" ng-false-value = "0" ng-model = "scene.applyPromotion"/>\n				                        申请帮助推荐\n				                        <span style = "margin-left: 10px; font-size: 14px;">(审核通过后，场景达到1000次展示将有机会被推荐到<a href="#/sample" target="_blank"><ins>场景案例中心</ins></a>)</span>\n				                      </label>\n				                    </div>\n				                  </div>\n				                  <div class="checkbox col-sm-offset-2" ng-if="isVendorUser" style="margin-bottom:25px;" >\n				                      <label style = "margin-left: 5px;font-weight:300;">\n				                        <input id = "share"  type="checkbox" value="" ng-true-value = "1" ng-false-value = "0" ng-model = "scene.applyTemplate" />\n				                        申请作为样例\n				                        <span style = "margin-left: 10px; font-size: 14px;">(审核通过后，每做一个样例送100个积分)</span>\n				                      </label>\n				                  </div>\n\n				                <div class = "changjing_caozuo">\n		            				<a href="#/scene/create/{{sceneId}}?pageId=1" class="btn-secondary" style="margin-right:10px">编辑场景</a>\n				                    <a ng-click = "saveSceneSettings(scene)" class="btn-save">保存设置</a>\n				                </div>\n					        </div>\n			            </form>                 \n			        </div>\n			    </div>\n			</div>\n		</div>\n	</div>\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>')
            }
        ]), b.module("my/upload.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("my/upload.tpl.html", '<div nv-file-drop="" uploader="uploader">\n\n        <div class="container">\n\n            <div class="row">\n\n                <div class="col-md-3">\n                    <div ng-show="uploader.isHTML5">\n                        <!-- 3. nv-file-over uploader="link" over-class="className" -->\n                        <div ng-show="category.fileType != \'2\'" class="well my-drop-zone" nv-file-over="" uploader="uploader">\n                            拖拽图片到此区域\n                        </div>\n                        <div ng-show="category.fileType == \'2\'" class="well my-drop-zone" nv-file-over="" uploader="uploader">\n                            拖拽音乐到此区域\n                        </div>\n                    </div>\n\n                    <!-- Example: nv-file-select="" uploader="{Object}" options="{Object}" filters="{String}" -->\n                    \n                    <div id="upload_btn" class="btn-main">\n                        <span ng-show="category.fileType == \'0\' || category.fileType == \'1\'">选择图片</span>\n                        <span ng-show="category.fileType == \'2\'">选择音乐</span>\n                        <input type="file" id="uploadBtn" ng-click = "removeQueue()" nv-file-select="" uploader="uploader" multiple/>\n                    </div>\n                    <br/>\n\n                </div>\n\n                <div class="col-md-9" style="margin-bottom: 40px">\n                    <!-- <p>等待上传图片个数: {{ uploader.queue.length }}</p> -->\n                    <p ng-show="category.fileType == \'1\' && !category.headerImage && !category.coverImage">每次最多上传5张图片，上传图片建议大小在3M以内，格式为jpg\\bmp\\png\\gif</p>\n                    <p ng-show="category.fileType == \'0\'">上传图片建议像素为640px*1008px，上传图片大小在3M以内，格式为jpg\\bmp\\png\\gif</p>\n                    <p ng-show="category.fileType == \'2\'">上传音乐大小不超过3M，格式为mp3</p>\n                    <p ng-show = "category.fileType == \'1\' && (category.headerImage || category.coverImage)">上传图片建议像素为250px*250px，上传图片大小在3M以内，格式为jpg\\bmp\\png\\gif</p>\n                    <table class="table">\n                        <thead>\n                            <tr>\n                                <th width="50%">名称</th>\n                                <th ng-show="uploader.isHTML5">大小</th><!-- \n                                <th ng-show="uploader.isHTML5">进度</th>\n                                <th>操作</th> -->\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr ng-repeat="item in uploader.queue">\n                                <td>\n                                    <strong>{{ item.file.name }}</strong>\n                                    <!-- Image preview -->\n                                    <!--auto height-->\n                                    <!--<div ng-thumb="{ file: item.file, width: 100 }"></div>-->\n                                    <!--auto width-->\n                                    <div ng-show="uploader.isHTML5" ng-thumbnail="{ file: item._file, height: 100 }"></div>\n                                    <!--<div ng-thumbnail="{ file: item._file, height: 100 }"></div>\n                                    fixed width and height -->\n                                    <!--<div ng-thumb="{ file: item.file, width: 100, height: 100 }"></div>-->\n                                </td>\n                                <td ng-show="uploader.isHTML5" nowrap>{{ item.file.size/1024/1024|number:2 }} MB</td>\n                                 <td ng-show="uploader.isHTML5">\n                                    <div class="progress" style="margin-bottom: 0;">\n                                        <div class="progress-bar" role="progressbar" ng-style="{ \'width\': item.progress + \'%\' }"></div>\n                                    </div>\n                                </td>\n                                <!--<td nowrap>\n                                    <button type="button" class="btn btn-success btn-xs" ng-click="item.upload()" ng-disabled="item.isReady || item.isUploading || item.isSuccess">\n                                        <span class="glyphicon glyphicon-upload"></span> 上传\n                                    </button>\n                                    <button type="button" class="btn btn-warning btn-xs" ng-click="item.cancel()" ng-disabled="!item.isUploading">\n                                        <span class="glyphicon glyphicon-ban-circle"></span> 取消\n                                    </button>\n                                    <button type="button" class="btn btn-danger btn-xs" ng-click="item.remove()">\n                                        <span class="glyphicon glyphicon-trash"></span> 删除\n                                    </button>\n                                </td> -->\n                            </tr>\n                        </tbody>\n                    </table>\n\n                    <div>\n                        <!-- <div>\n                            上传进度:\n                            <div class="progress" style="">\n                                <div class="progress-bar" role="progressbar" ng-style="{ \'width\': uploader.progress + \'%\' }"></div>\n                            </div>\n                        </div> -->\n                        <button type="button" class="btn btn-secondary btn-s" ng-click="uploader.uploadAll()" ng-disabled="!uploader.getNotUploadedItems().length">\n                            <span class="glyphicon glyphicon-upload"></span> 上传\n                        </button>\n                       <!--  <button type="button" class="btn btn-warning btn-s" ng-click="uploader.cancelAll()" ng-disabled="!uploader.isUploading">\n                            <span class="glyphicon glyphicon-ban-circle"></span> 取消\n                        </button> -->\n                        <button type="button" class="btn btn-danger btn-s" ng-click="uploader.clearQueue()" ng-disabled="!uploader.queue.length">\n                            <span class="glyphicon glyphicon-trash"></span> 删除\n                        </button>\n                    </div>\n\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>')
            }
        ]), b.module("notifications.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("notifications.tpl.html", '<div ng-class="[\'alert\', \'alert-\'+notification.type]" ng-repeat="notification in notifications.getCurrent()" notification-fadeout>\n    <button class="close" ng-click="removeNotification(notification)">x</button>\n    {{notification.message}}\n</div>\n')
            }
        ]), b.module("reg/agreement.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("reg/agreement.tpl.html", '<div class="about">\n    <div class="header">\n        <div class="content">\n                    </div>\n    </div>\n    <div class="banner">\n        <img ng-src="{{CLIENT_CDN}}images/contact1.jpg"/>\n    </div>\n    <div class="main clearfix">\n    	<div class="reg_xy_Box">\n            <h1>一秀注册协议</h1>\n            <div class="reg_xy">\n                <p>甲方：e.wesambo.com</p>\n                <p>乙方：“一秀”的注册用户（以下简称用户或“您”）</p>\n                <p class="para">您确认：在您开始“如是微营销”产品试用或购买前，您已充分阅读、理解并接受本协议的全部内容，一旦您选择“同意”并开始使用本服务或完成购买流程，即表示您同意遵循本协议之所有约定。不具备前述条件的，您应立即终止注册或停止使用本服务。</p>\n                <p class="para">甲方有权随时对协议内容进行单方面的变更，并以在eqshow.cn公告的方式予以公布，无需另行单独通知您；若您在本协议内容公告变更后继续使用本服务，表示您已充分阅读、理解并接受修改后的协议内容，也将遵循修改后的协议内容使用本服务；若您不同意修改后的协议内容，您应停止使用本服务。您可以访问 http://www.eqshow.cn来了解最新版本的服务条款。</p>\n                </p>\n                <p>帐户注册及条款</p>\n                <p>1.  您保证具有法律规定的完全民事权利能力和民事行为能力，能够独立承担民事责任的自然人、法人或其他组织；本协议内容不会被您所属国家或地区的法律禁止。\n                <p>2.  具体操作使用人应该是自然人。不允许采用注册机或者类似的自动化方式注册账户。\n                <p>3.  当您注册时应当按网站要求提供您真实的信息及其他必要的信息以完成注册。\n                <p>4.  您的登录信息只能用于一个人，不允许多人共享登录信息。您可以在网站允许的前提下注册多个登录用户名密码。\n                <p>5.  您应当保护好自己的用户名及密码信息不被泄露。“如是微营销”无法也不会保护因为您泄露用户名或密码导致的数据风险。\n                <p>6.  同一个用户只能拥有一个免费账户。\n                <p>7.  对于您以及您的账户所创建的内容负责。\n                <p>8.  您不得恶意攻击“如是微营销”服务。\n                <p>9.  您不得复制、转售或转授权任何部分或者全部的”如是微营销”服务。\n                <p>10. 甲方有权但并非义务删除以下内容：非法、歧视、恐吓、诽谤、色情、淫秽或者违反中国法律的。\n                <p>11. 您不得以口头或者文字方式攻击（包括恐吓、报复等）甲方客户、员工、成员或本产品及服务的其他使用者。\n                <p>12. 您不得上传或者发布垃圾邮件，短信，或上传计算机病毒程序或者恶意代码。\n                <p>13. 如果您的账户流量使用明显超过平均用户带宽使用，我们保留停用您的账户的权利，直到您降低您的流量使用。\n                <p>14. 您在本协议期间应遵守全部中国法律、法规和规章。\n                <p>15. 如果甲方因乙方的任何触犯中国法律法规的行为或违反本协议的行为而承受任何损失或损害，乙方应该采取所有行动使甲方免于承担责任，并对由此产生的全部损失和损害对乙方承担赔偿责任。\n                <p>16. 如果乙方存在任何触犯中国法律法规的行为或违反本协议的行为，甲方有权根据行为的严重性自行决定立即暂停或终止乙方对本服务的使用，甲方无须就服务暂停或终止对乙方承担任何责任，并且无须返还乙方已支付的当月费用。\n\n                <p>付费相关条款\n                <p>1.  “如是微营销”产品目前仅提供免费产品供您使用，但甲方保留未来推出“如是微营销”付费产品、功能或服务的权利。\n                <p>2.  您有权自由选择决定是否使用“如是微营销”中的付费产品、功能或服务。\n                <p>产品服务条款\n                <p>1.  甲方将以专业的方式提供产品及服务，但并不保证：1) 产品及服务满足您的所有需求或您的所有期待； 2) 产品及服务没有任何失误或缺陷； 或3) 产品及服务中的所有错误都会被修正。甲方无须对任何第三方提供的产品或服务负责，亦不对第三方产品或服务提供任何保证。\n                <p>2.  甲方保留不断修改调整这项服务的权利，而无需事先通知乙方。\n                知识产权条款\n                <p>1.  您提交的各种内容版权归属于您。\n                <p>2.  您应当了解并授权“如是微营销”及“如是微营销”许可的用户可以传播、二次编辑、分享您通过如是微营销编辑生成的作品。\n                <p>3.  甲方提供的服务及产品（包括但不限于观感、设计、图标、代码等）的版权、商标权、专利权及其他知识产权均归属于甲方。除非获得甲方明确书面允许，您不得复制、重用任何HTML/CSS, JavaScript或者任何视觉设计，也不得对甲方产品进行反向工程、分解或进行编译或其他修改。\n                <p>4.  本协议中未明确授予您的权利将由甲方保留。\n                <p>责任限制\n                在任何情况下、甲方均无须对任何间接性、后果性、惩戒性、偶然性、特殊性或刑罚性的损害(包括但不限于乙方因使用甲方服务而遭受的利润、收入损失、或预期的节约成本的损失或商誉损失等）承担责任，即使乙方已被告知该等损失的可能性。甲方对乙方承担的全部责任总额，无论因何原因（基于合同法、侵权法或其他法规）或何种行为方式产生，始终不超过乙方在当月服务期内因使用甲方服务而已经支付给甲方的费用。\n                服务取消与终止条款\n                <p>1.  您清楚的了解终止服务的后果。无需邮件或者电话确认，您可以在任何时候通过点击账户链接并执行相应操作来终止您的账户及相应的所有信息。\n                <p>2.  一旦终止，所有隶属于这个账户的数据及信息将由甲方作删除处理，并且无法恢复。\n                <p>3.  一旦终止账户，账户之下的用户将无法访问任何相关的服务。\n                <p>其他条款\n                <p>1.  您了解甲方使用第三方的运营商和网络提供商提供必要的硬件、软件、存储或网络来运行如是微营销服务。甲方无需因为第三方的、或者不在甲方控制范围内的原因（如不可抗力）造成的运行问题（如服务中断、停顿、中止等）负责。\n                <p>2.  如果本协议的某一条款或某一条款的一部分无效或不可执行，不影响本协议其他条款的有效性，无效或不可执行的条款将被视作已从本协议中删除。\n                <p>3.  本协议受中华人民共和国法律管辖。 在执行本协议过程中如发生纠纷，双方应及时协商解决。协商不成时，任何一方均应向甲方所在地人民法院提起诉讼。\n                <p>4.  若有任何疑问，请通过浏览http://e.wesambo.com网站下方的联系方式与我们联系。\n\n            </div>\n        </div>\n    </div>\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>')
            }
        ]), b.module("reg/reg.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("reg/reg.tpl.html", '<div><a ng-href="{{weiChatUrl}}">登录测试</a></div>')
            }
        ]), b.module("sample/sample.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("sample/sample.tpl.html", '<div class="sample contain min_contain">	\n	    <header>\n	        <div class="we_nav content_center">\n	            <div class="link_list">\n	                <ul class="clearfix">\n	                    <li class="bg_hover"><a>用户案例</a></li>\n	                    <li ng-hide="isAuthenticated()"><a ng-click = "login()">登录</a></li>\n	                    <li ng-hide="isAuthenticated()" class=""><a ng-click = "register()">注册</a></li>\n	                    <li ng-show="isAuthenticated()"><a href="#/main">进入</a></li>\n	                </ul>\n	            </div>                  \n	            <div id="logo"><a href="#/home"><img ng-src="{{CLIENT_CDN}}images/logo.png" alt=""></a></div>\n	        </div>    \n	    </header>\n	    <div class="content_center">\n<!-- 		    <div class="pv_contain clearfix">\n		    	<div class="img_pv_contain">\n			    	<div class="pv_images" >\n						<ul>\n							<li  class="con_list" ng-repeat="dayTop in dayTop" ng-show="page == \'day\'">\n							<a ng-href="{{VIEW_URL + \'v-\' + dayTop.code}}" target="_blank">\n								<div class="pv_images_cont">\n									<div ng-hide="showCode2 == true"><img ng-src="{{PREFIX_FILE_HOST + dayTop.image.imgSrc}}" alt="" width="235px" /></div>\n									<div ng-show="showCode2 == true" qr-code qr-url="{{PREFIX_FILE_HOST + dayTop.image.imgSrc}}" class="qrcode">\n									\n									</div>\n									<p class="anli_name" title="{{dayTop.name}}">{{dayTop.name}}</p>\n								</div>\n							</a>\n							<p class="changj_pv"><span class="er_name"><em>{{dayTop.userName}}</em><a ng-mouseover="showCode2 = true" ng-mouseleave="showCode2 = false" href="">二维码</a></span><span class="changj_show_num">展示:{{dayTop.showCount | fixnum}}</span></p>\n							\n						</li>\n						</ul>\n						<ul>\n							<li class="con_list" ng-repeat="monthTop in monthTop" ng-show="page == \'month\'">\n							<a ng-href="{{VIEW_URL + \'v-\' + monthTop.code}}" target="_blank">\n								<div class="pv_images_cont">\n									<div ng-hide="showCode1 == true"><img ng-src="{{PREFIX_FILE_HOST + monthTop.image.imgSrc}}" alt="" width="235px" /></div>\n									<div ng-show="showCode1 == true" qr-code qr-url="{{PREFIX_CLIENT_HOST + \'v-\' + monthTop.code}}" class="qrcode">\n									</div>\n								</div>\n								<p class="anli_name" title="{{monthTop.name}}">{{monthTop.name}}</p>\n							</a>\n							<p class="changj_pv"><span class="er_name"><em>{{monthTop.userName}}</em><a ng-mouseover="showCode1 = true" ng-mouseleave="showCode1 = false" href="">二维码</a></span><span class="changj_show_num">展示:{{monthTop.showCount | fixnum}}</span></p>\n							\n							</li>\n						</ul>\n						<ul>\n							<li class="con_list" ng-repeat="weekTop in weekTop" ng-show="page == \'week\'">\n							<a ng-href="{{VIEW_URL + \'v-\' + weekTop.code}}" target="_blank">\n								<div class="pv_images_cont" >\n									<div ng-hide="showCode3 == true"><img ng-src="{{PREFIX_FILE_HOST + weekTop.image.imgSrc}}" alt="" width="235px" /></div>\n									<div ng-show="showCode3 == true" qr-code qr-url="{{PREFIX_CLIENT_HOST + \'v-\' + weekTop.code}}" class="qrcode">\n									</div>\n									<p class="anli_name" title="{{weekTop.name}}">{{weekTop.name}}</p>\n								</div>\n\n							</a>\n							<p class="changj_pv"><span class="er_name"><em>{{weekTop.userName}}</em><a ng-mouseover="showCode3 = true" ng-mouseleave="showCode3 = false" href="">二维码</a></span><span class="changj_show_num">展示:{{weekTop.showCount | fixnum}}</span></p>\n							\n						</li>\n						</ul>\n			    	</div>		    			    			    			    	\n		 		</div>\n		    	<div class="pv_nav">\n		    		<h1><img ng-src="{{CLIENT_CDN}}images/sample/desr.png" alt="" /></h1>\n		    		<ul class="clearfix">\n		    			<li ng-class="{hover:page == \'month\'}" ng-click="page = \'month\'">本月排名</li><li ng-class="{hover:page == \'week\'}" ng-click="page = \'week\'">本周排名</li><li ng-click="page = \'day\'" ng-class="{hover:page == \'day\'}">昨日排名</li>\n		    		</ul>\n		    	</div>\n		    </div> -->\n		    <div class="header_con">	\n			    <div class="sample_cat clearfix" data-ng-init="load()">\n			    	<div class="sample_images mains">\n			    		<div class="clearfix">\n							<div class="con_list" ng-repeat = "home in homes">\n								<a ng-href="{{VIEW_URL + \'v-\' + home.code}}" target="_blank">\n									<div ng-show="showCode == true" class="cj_img qrcode" qr-code qr-url="{{PREFIX_CLIENT_HOST + \'v-\' + home.code}}">\n										<!-- <img ng-src="{{PREFIX_SERVER_HOST + \'eqs/qrcode/\' + home.code + \'.png\'}}" alt="" width="235px" /> -->\n									</div>\n									<div ng-hide="showCode == true" class="cj_img"><img ng-src="{{PREFIX_FILE_HOST + home.image.imgSrc}}" alt="" width="235px" /></div>\n									<p class="anli_name" title="{{home.name}}">{{home.name}}</p>\n								</a>\n								<p class="clearfix"><span class="er_name"><em>{{home.userName}}</em><a ng-mouseover="showCode = true" ng-mouseleave="showCode = false" href="">二维码</a></span>场景展示:{{home.showCount | fixnum}}</p>\n							</div>\n						</div>\n						<div class="mores" ng-init = "showMoreButton = true;" ng-hide = \'homes.length < 9\'>\n					    	<a ng-click="showMore(type)" ng-show = \'showMoreButton\'>查看更多</a>\n					    	<p ng-show = "!showMoreButton" style="font-size:16px;">没有更多了</p>\n					    </div>\n					    <p style="text-align:center;margin-top:100px;" ng-show = \'homes.length <= 0\'>该分类下暂无场景</p>\n			    	</div>\n			    	<div class="sample_cats">\n				    	<div class="sample_fix fixed">\n				    		<h1><img ng-src="{{CLIENT_CDN}}images/sample/case.png" alt="" /></h1>\n				    		<ul class="clearfix">\n			                    <li id="one1" ng-class="{hover:typeindex == \'all\'}" ng-click="getHomes(\'all\', null, 1, 9);type=null">全部案例</li>\n			                    <li ng-repeat = "sceneType in sceneTypes" ng-class = "{hover: typeindex == $index}" ng-click = "getHomes($index, sceneType.sort, 1, 9)">\n			                        {{sceneType.name}}\n			                    </li>\n				    		</ul>\n				    	</div>\n			    	</div>	\n			    </div>    \n			</div>\n		</div>	\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>\n\n')
            }
        ]), b.module("scene/console.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console.tpl.html", '<div>\n<div ng-show="comp_type==\'bg\'" ng-include="\'scene/console/bg.tpl.html\'" ng-controller="BgConsoleCtrl"></div>\n</div>')
            }
        ]), b.module("scene/console/angle-knob.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/angle-knob.tpl.html", '<div class="sliderContainer">\n	<div class="sliderKnob"></div>\n</div>')
            }
        ]), b.module("scene/console/anim.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/anim.tpl.html", '<div ng-if="activeTab == \'anim\'" ng-controller="AnimConsoleCtrl">\n	<div class="anim_area">\n		<div class="style_list_angel clearfix">\n			<div class="flo_lef">动画类型</div>\n			<div class="flo_right"><select style="width:100px;border:1px solid #C9C9C9" ng-model="activeAnim" ng-change="model.type=activeAnim.id; changeAnimation()" ng-options="animType.name for animType in animTypeEnum">\n				<option value="-1">无</option>\n			</select></div>\n			<div ng-show="model.type == 7" class="flo_right" style="clear:both;vertical-align: bottom;"><input type="checkbox" value="" ng-model="model.linear" ng-true-value="1" style="margin-right:3px;" />匀速</div>\n		</div>\n		<div class="row" ng-show="model.type != -1 && model.type != null">			\n			<form role="form">\n				<div class="style_list_angel clearfix" ng-show="model.type == 1 || model.type == 2">\n					<div class="flo_lef"><label>方向</label></div>\n					<div class="flo_right"><select style="color:#999" class="form-control" ng-model="direction" ng-change="changeAnimation()" ng-options="animDirection.name for animDirection in animDirectionEnum">\n					</select></div>\n				</div>\n				<div class="style_list_angel">\n					<label>动画时间</label>\n					<div class="touming clearfix">\n						<p class="num"><input limit-input class="input_kuang short" type="number" step="0.1" min="0" max="20" ng-model="model.duration" />秒</p>\n						<div class="num" style="width:100px;" ui-slider min="0" max="20" use-decimals step="0.1" ng-model="model.duration"></div>\n					</div>\n				</div>				\n				<div class="style_list_angel">\n					<label>延迟时间</label>\n					<div class="touming clearfix">\n						<p class="num"><input limit-input class="input_kuang short" type="number" step="0.1" min="0" max="20" class="form-control" ng-model="model.delay" />秒</p>\n						<div class="num" style="width:100px;" ui-slider min="0" max="20" use-decimals step="0.1" ng-model="model.delay"></div>\n					</div>\n				</div>\n				<div class="style_list_angel">\n					<label>动画次数</label>\n					<div class="touming clearfix">\n						<p class="num"><input ng-disabled  = "model.count" limit-input class="input_kuang short" type="number" min="1" max="10" class="form-control" ng-model="model.countNum"   />次</p>\n						<div class="num" style="width:100px;" ui-slider min="0" max="10" ng-model="model.countNum" ng-disabled  = "model.count"></div>\n					</div>\n					<div class="" style="text-align:right;margin-top:5px;"><input type="checkbox" value="" id="xunhuan" ng-model="model.count" style="margin-right:3px;" />循环播放</div>				\n				</div>\n			</form>					\n		</div>\n	</div>\n</div>')
            }
        ]), b.module("scene/console/audio.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/audio.tpl.html", '<div class="input_console">\n	<div class="modify_area">\n		<form class="form-horizontal" role="form">\n			<div class="category_list" style="padding-left:198px;">\n				<ul class="category_list_container clearfix">\n					<li ng-class="{active: category.value == model.bgAudio.type}" class="category_item" ng-repeat="category in categoryList" ng-click="model.bgAudio.type = category.value">\n						{{category.name}}\n					</li>\n				</ul>\n			</div>\n			<div ng-if="model.bgAudio.type == \'1\'" class="audio_area clearfix">\n				<span class="control-label" style="padding-top:12px;padding-right:5px;">链接地址</span>\n				<input class="" type="text" ng-model="model.type1" placeholder="请输入mp3文件链接" style="width:280px;height:35px;line-height:35px;border:1px solid #E7E7E7;border-radius:0px;padding-left:5px;font-size:12px;" />\n			</div>\n			<div ng-if="model.bgAudio.type == \'2\'" class="audio_area clearfix" style="height:auto;">\n				<select class="float-lf selectcartoon" ng-change="selectAudio(2)" ng-model="model.selectedMyAudio" ng-options="myAudio.name for myAudio in myAudios" id="nb_musicurl" style="padding-left:5px;width:280px;">\n	     			<option value="">选择我的音乐</option>\n	         	</select>\n	         	<span class="btn-main" ng-click="goUpload()">上传音乐</span>\n	         	<!-- <span ng-show="model.type2">\n					<a class="glyphicon glyphicon-play" ng-click="playAudio(1);" title="试听">\n		         		<audio id="audition1" ng-src="{{model.type2}}"></audio>\n		         	</a>\n		         	<a class="glyphicon glyphicon-pause" ng-click="pauseAudio(1);" title="暂停">\n		         	</a>  \n	         	</span> -->\n	         	<div ng-if = "model.type2" style = "margin-top:10px;">\n	         		<audio ng-src="{{model.type2}}" controls="controls">\n					</audio>								\n	         	</div>\n				<!-- <span class="btn-main" ng-click="goUpload()">上传音乐</span> -->\n			</div>\n			<div ng-if="model.bgAudio.type == \'3\'" class="audio_area clearfix">\n				<select class="float-lf selectcartoon" ng-change="selectAudio(3)" ng-model="model.selectedAudio" ng-options="reservedAudio.name for reservedAudio in reservedAudios" id="nb_musicurl" style="padding-left:5px;width:280px;height:35px;line-height:35px;border:1px solid #E7E7E7;">\n	     			<option value="">选择音乐库文件</option>\n	         	</select>\n	         	<!-- <span ng-show="model.type3">\n		         	<a class="glyphicon glyphicon-play" ng-click="playAudio(2);" title="试听">\n		         		<audio id="audition2" ng-src="{{model.type3}}"></audio>\n		         	</a>\n		         	<a class="glyphicon glyphicon-pause" ng-click="pauseAudio(2);" title="暂停">\n		         	</a>\n		        </span>   -->  	\n		        <div ng-if = "model.type3" style = "margin-top:10px;">\n	         		<audio  ng-src="{{model.type3}}" controls="controls">\n					</audio>								\n	         	</div>\n			</div>\n		</form>\n	</div>\n</div>\n<div class="modal-footer">\n    <a class="btn-main login" style="width: 88px;" ng-click="confirm()">确定</a>\n    <a class="btn-grey0 cancel" style="width: 88px;" ng-click="cancel()">取消</a>\n</div>')
            }
        ]), b.module("scene/console/bg.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/bg.tpl.html", '<!-- <div class="bg_console">\n	<div class="img_list">\n		<div class="category_list">\n			<div ng-show="fileType == \'0\'" class="category_item" ng-click="changeCategory(\'c\')" ng-class="{active: \'c\' == categoryId}">\n				<span>纯色背景</span>\n			</div>\n			<ul class="category_list_container">\n				<li ng-class="{active: category.value == categoryId}" class="category_item" ng-repeat="category in categoryList" ng-click="changeCategory(category.value)">\n					{{category.name}}\n				</li>\n			</ul>\n			<div class="btn-group fl" dropdown ng-show="otherCategory.length > 0">\n		      <span class="dropdown-toggle" ng-disabled="disabled">\n		        其它 <span class="caret"></span>\n		      </span>\n		      <ul class="dropdown-menu">\n		        <li ng-repeat="category in otherCategory">\n		          <a href ng-click="changeCategory(category.value)">{{category.name}}</a>\n		        </li>\n		      </ul>\n		    </div>\n		    <div class="category_item" ng-click="changeCategory(\'0\')" ng-class="{active: \'0\' == categoryId}">\n				<span ng-show="fileType == \'0\'">我的背景</span>\n				<span ng-show="fileType == \'1\'">我的图片</span>\n			</div>\n		</div>\n		<div class="img_list_container" ng-class="{photo_list: fileType == \'1\', bg_list: fileType == \'0\'}">\n			<ul class="img_box">\n				<li ng-show="isEditor || categoryId == \'0\'" class="upload" title="上传图片" ng-click="goUpload(img.path)">\n					<span class="glyphicon glyphicon-upload"></span>\n				</li>\n				<li ng-show="fileType == \'0\' && \'c\' != categoryId" ng-repeat="img in imgList track by $index" ng-click="replaceBgImage(img.path, $event)">\n					<span ng-click="deleteImage(img.id, $event)" ng-show="isEditor || categoryId == \'0\'" class="del_icon glyphicon glyphicon-remove-circle"></span>\n					<img responsive-image ng-src="{{PREFIX_FILE_HOST + img.tmbPath}}"></img>\n				</li>\n				<li class="photo_item" photo-draggable="{{img.path}}" ng-show="fileType == \'1\'"  ng-repeat="img in imgList track by $index" ng-click="replaceBgImage(img.path, $event)">\n					<span ng-click="deleteImage(img.id, $event)" ng-show="isEditor || categoryId == \'0\'" class="del_icon glyphicon glyphicon-remove-circle"></span>\n					<img responsive-image ng-src="{{PREFIX_FILE_HOST + img.tmbPath}}"></img>\n				</li>\n				<li class="photo_item" style="background-color: {{img.color}}" ng-show="fileType == \'0\' && \'c\' == categoryId"  ng-repeat="img in imgList track by $index" ng-click="replaceBgColor(img.color, $event)">\n				</li>\n			</ul>\n			\n		</div>\n		<div class="pagination_container" ng-show="numPages>1">\n			<pagination style="float: left" class="pagination-sm" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;" max-size="10" items-per-page="pageSize" total-items="totalItems" ng-model="currentPage" ng-change="changeCategory(categoryId, currentPage)" boundary-links="true" rotate="true" num-pages="numPages"></pagination>\n	        <div class="current_page">\n	            <input type="text" ng-model="toPage" ng-keyup="$event.keyCode == 13 ? changeCategory(categoryId, toPage) : null">\n	            <a ng-click="changeCategory(categoryId,toPage)" class="go">GO</a>\n	            <span>当前: {{currentPage}} / {{numPages}} 页</span>\n	        </div>\n	    </div>\n		<div ng-show="fileType == \'1\'" class="bottom_area" style="position: relative; min-height: 80px;">\n			<div class="crop_drop" crop-droppable style = "min-height: 80px;">\n				<p ng-hide="cropMode" class="">拖动图片到此区域剪裁</p>\n				<div class="image_crop">\n					<img id="target"></img>\n				</div>\n			</div>\n			<div class="fr" style="width: 180px;">\n				<p>*单击图片替换</p>\n				<p>*或拖动图片到左侧区域剪裁</p>\n				<a ng-show="cropMode" class="btn-main" style="width: 105px;position: absolute;bottom: 0;" ng-click="crop()">剪裁并替换</a>\n			</div>\n		</div>\n	</div>\n</div> -->\n<div class="bg_console clearfix" style="background-color:#E7E7E7;">\n	<div class="fl" style="width:188px;">\n		 <ul class="nav nav-tabs tabs-left" style="padding-top:0px;"><!-- \'tabs-right\' for right tabs -->\n    		<li class="active" ng-click="changeCategory(\'0\')">\n    			<a href="" ng-show="fileType == \'0\'" ng-click="systemImages = false;" data-toggle="tab">我的背景</a>\n    			<a href="" ng-show="fileType == \'1\'" ng-click="systemImages = false;" data-toggle="tab">我的图片</a>\n    		</li>\n		    <li>\n		    	<a href="" ng-show="fileType == \'0\'" ng-click="systemImages = true; changeCategory(\'all\')" data-toggle="tab">背景库</a>\n		    	<a href="" ng-show="fileType == \'1\'" ng-click="systemImages = true; changeCategory(\'all\')" data-toggle="tab">图片库</a>\n		    </li>\n		  </ul>\n	</div>\n	<div class="fl" style="width:710px;padding:0 10px;background-color:#FFF;">\n		<div class="tab-content" id="bg_contain">\n	        <div class="tab-pane active" ng-show="!systemImages">\n	        	<div class="img_list" style="padding-bottom: 0px;">\n	        		<div class="category_list clearfix">\n						<ul class="category_list_container clearfix" style="width:610px;float:left;">\n							<li ng-class="{active: tagIndex == -1}" class="category_item" ng-click="changeCategory(\'0\');">\n								全部\n							</li>\n							<li ng-class="{active: tagIndex == $index}" class="category_item" ng-repeat="myTag in myTags" ng-mouseenter="hoverTag(myTag)" ng-mouseleave="hoverTag(myTag)" ng-click="getImagesByTag(myTag.id, $index)">\n								{{myTag.name}}<span ng-if="myTag.hovered" ng-click="deleteTag(myTag.id, $index, $event)">x</span>\n							</li>						\n						</ul>\n						<div class="category_item active" ng-click="createCategory();" style="float:right;">\n							创建分类\n						</div>						\n					</div>\n					<div class="edit">\n						<input type="checkbox" ng-model="allImages.checked" ng-change="selectAll()"/>&nbsp;&nbsp;<span ng-click="deleteImage()"><a href="">删除</a></span>\n						<div class="btn-group">\n							<div class="dropdown-toggle"  data-toggle="dropdown" ng-click="setIndex($event);">分类到</div>\n							<div class="dropdown-menu" role="menu">\n								<ul forbidden-close>\n			                        <li ng-class="{selecttag: dropTagIndex == $index}" ng-repeat="myTag in myTags" ng-click="selectTag(myTag, $index)"><span>{{myTag.name}}</span></li>\n			                        <li ng-click="createCategory();" class="add_cate clearfix"><em>+</em><span>添加分类</span></li>\n		                      	</ul>\n		                      	<div class="fl btn-main" style="width:100%;" ng-click="setCategory(dropTagIndex)"><a href="" style="color:#FFF;">确定</a></div>\n		                    </div>\n						</div>\n						<div ng-if="tagIndex > -1" style="display: inline-block; margin-left: 20px;"><a href="" ng-click="unsetTag()">取消分类</a></div>\n					</div>\n	        	</div>\n	        </div>\n	        <div class="tab-pane" ng-class="{active: systemImages}" ng-show="systemImages">\n	        	<div class="img_list">\n	        		<div class="category_list">				\n						<ul class="category_list_container clearfix">\n							<li class="category_item"  ng-click="changeCategory(\'all\')" ng-class="{active: \'all\' == categoryId}">\n							最新\n							</li>\n							<li ng-class="{active: category.value == categoryId}" class="category_item" ng-repeat="category in categoryList" ng-click="changeCategory(category.value); getChildCategory(category.value);sysTagIndex = -1;">\n								{{category.name}}\n							</li>\n							<li ng-show="fileType == \'0\'" class="category_item"  ng-click="changeCategory(\'c\');numPages=2;" ng-class="{active: \'c\' == categoryId}">\n							纯色背景\n							</li>\n						</ul>	\n					</div>\n		        	<div class="cat_two_list clearfix" ng-if="\'c\' != categoryId && \'all\' != categoryId">\n		        		<ul>\n		        			<li ng-class="{active: sysTagIndex == $index}" ng-repeat = "childCatrgory in childCatrgoryList" ng-click="getImagesBySysTag(childCatrgory.id, $index, 1, categoryId)" style="cursor:pointer;">\n		        				{{childCatrgory.name}}\n		        			</li>\n		        		</ul>\n		        	</div>\n	        	</div>\n	        </div>\n	    </div>\n	    <div class="img_list" style="padding-top:0px;">\n	    	<div class="img_list_container" ng-class="{photo_list: fileType == \'1\', bg_list: fileType == \'0\'}">\n				<ul class="img_box clearfix">\n					<li ng-show="categoryId == \'0\'" class="upload" title="上传图cc片" ng-click="goUpload(img.path)">\n						<span class=""><img ng-src="{{CLIENT_CDN}}images/bg_15.jpg" alt="" /></span>\n					</li>\n					<li class="imageList" ng-show="fileType == \'0\' && \'c\' != categoryId" ng-repeat="img in imgList track by $index" ng-click="switchSelect(img, $event)" ng-mouseenter="hover(img)" ng-mouseleave="hover(img)" ng-class="{hovercolor: img.showOp || img.selected}" right-click>\n						<img ng-src="{{\'userfiles\'+ img.tmbPath}}" />\n						<div class="edit_content" ng-if="(img.showOp || img.selected) && categoryId == \'0\'">\n							<div class="select" ng-if="!img.selected && categoryId == \'0\'"><img ng-src="{{CLIENT_CDN}}images/nocheck.jpg"/></div>\n							<div class="select" ng-if="img.selected && categoryId == \'0\'"><img ng-src="{{CLIENT_CDN}}images/checked.png"/></div>\n							<div class="del" ng-click="deleteImage(img.id, $event)"><img ng-src="{{CLIENT_CDN}}images/bg_07.png" /></div>\n							<div ng-if="categoryId == \'0\'" class="set btn-group" class="dropdown-toggle"  data-toggle="dropdown" ng-click="prevent(img, $event)">\n								<img id="{{img.id}}" ng-src="{{CLIENT_CDN}}images/bg_19.png" />\n							</div>	\n							<div class="dropdown-menu set_category" id="{{img.id}}" role="menu">\n								<ul forbidden-close id="cat_tab">\n			                        <li ng-class="{selecttag: dropTagIndex == $index}" ng-repeat="myTag in myTags" ng-click="selectTag(myTag, $index)"><span>{{myTag.name}}</span></li>\n			                        <li ng-click="createCategory();" class="add_cate clearfix"><em>+</em><span>添加分类</span></li>\n		                      	</ul>\n		                      	<div class="fl btn-main" style="width:100%;"><a href="" style="color:#FFF;" ng-click="setCategory(dropTagIndex, img.id)">确定</a></div>\n		                    </div>\n								\n						</div>\n					</li>\n					<li class="imageList" ng-show="fileType == \'1\'"  ng-repeat="img in imgList track by $index" ng-click="switchSelect(img, $event)" ng-mouseenter="hover(img)" ng-mouseleave="hover(img)" ng-class="{hovercolor: img.showOp || img.selected}" right-click>\n						<img ng-src="{{PREFIX_FILE_HOST + img.tmbPath}}"/>\n						<div class="edit_content" ng-show="(img.showOp || img.selected) && categoryId == \'0\'">\n							<div class="select" ng-if="!img.selected && categoryId == \'0\'"><img ng-src="{{CLIENT_CDN}}images/nocheck.jpg"/></div>\n							<div class="select" ng-if="img.selected && categoryId == \'0\'"><img ng-src="{{CLIENT_CDN}}images/checked.png"/></div>\n							<div class="del" ng-click="deleteImage(img.id, $event)" ng-click="deleteImg()"><img ng-src="{{CLIENT_CDN}}images/bg_07.png" /></div>\n							<div class="set btn-group" ng-if="categoryId == \'0\'" class="dropdown-toggle" ng-click="prevent(img, $event)" data-toggle="dropdown">\n								<img id="{{img.id}}" ng-src="{{CLIENT_CDN}}images/bg_19.png" />\n							</div>\n							<div class="dropdown-menu set_category" role="menu">\n								<ul forbidden-close id="cat_tab">\n			                        <li ng-class="{selecttag: dropTagIndex == $index}" ng-repeat="myTag in myTags" ng-click="selectTag(myTag, $index)"><span>{{myTag.name}}</span></li>\n			                        <li ng-click="createCategory()" class="add_cate clearfix"><em>+</em><span>添加分类</span></li>\n		                      	</ul>\n		                      	<div class="fl btn-main" ng-click="setCategory(dropTagIndex, img.id)" style="width:100%;"><a href="" style="color:#FFF;">确定</a></div>\n		                    </div>\n						</div>\n					</li>\n					<li class="photo_item" style="background-color: {{img.color}}" ng-show="fileType == \'0\' && \'c\' == categoryId" ng-mouseenter="hover(img)" ng-mouseleave="hover(img)" ng-class="{hovercolor: img.showOp || img.selected, mr0: $index%9 == 8}" ng-click="switchSelect(img, $event)"  ng-repeat="img in imgList track by $index">\n					</li>\n				</ul>\n			</div>\n			<div class="fanye_foot clearfix" style="margin-top: 20px;">\n				<div class="fr btn-main" ng-click="replaceImage();"><a href="" style="color:#FFF;">确定</a></div>\n				<div class="pagination_container fl">\n					<pagination style="float: left" class="pagination-sm" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;" max-size="5" items-per-page="pageSize" total-items="totalItems" ng-model="currentPage" ng-change="getImagesByPage(categoryId, currentPage)" boundary-links="true" rotate="true" num-pages="numPages"></pagination>\n			        <div class="current_page">\n			            <input type="text" ng-model="toPage" ng-keyup="$event.keyCode == 13 ? getImagesByPage(categoryId, toPage) : null">\n			            <a ng-click="getImagesByPage(categoryId,toPage)" class="go">GO</a>\n			            <span>当前: {{currentPage}} / {{numPages}} 页</span>\n			        </div>\n			    </div>\n			</div>\n	    </div>\n	</div>\n</div>')
            }
        ]), b.module("scene/console/button.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/button.tpl.html", '<div class="button_console">\n	<div class="modify_area">\n		<span class="label">按钮名称：</span>\n		<input type="text" maxlength="15" ng-model="model.title" ng-keyup="$event.keyCode == 13 ? confirm() : null"/>\n	</div>\n	\n</div>\n<div class="modal-footer">\n    <a class="btn-main login" style="width: 88px;" ng-click="confirm()">确定</a>\n    <a class="btn-grey0 cancel" style="width: 88px;" ng-click="cancel()">取消</a>\n</div>')
            }
        ]), b.module("scene/console/category.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/category.tpl.html", '<div class="category_input">\n	<input type="text" ng-model="category.name" placeholder="分类名称" />\n</div>\n<div class="modal-footer">\n    <a class="btn-main login" style="width: 88px;" ng-click="confirm()">确定</a>\n</div>')
            }
        ]), b.module("scene/console/cropimage.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/cropimage.tpl.html", '\n\n<div class="cropimage" style="">\n	<!-- <img ng-src="{{PREFIX_FILE_HOST + imgUrl}}"/> -->\n	<div class="image_crop">\n		<img id="target"></img>\n	</div>\n	<div class="crop_close">\n		<a class=" btn-main" href="" ng-click="crop()">确定</a>\n		<a class=" btn-main" href="" ng-click="cancel()">取消</a>\n	</div>\n</div>')
            }
        ]), b.module("scene/console/fake.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/fake.tpl.html", '<div class="modal-footer">\n	<div class="alert alert-info" role="alert">此功能为高级账号功能，点击按钮免费申请成为高级账号！</div>\n    <a class="btn-main login" target="_blank" style="width: 188px;" ng-href="javascript:void(0);">免费成为高级账号</a>\n</div>\n<div class="anim_area" style="padding: 0 20px 20px;">\n	<img title="点击上方按钮成为高级账号" ng-show="type==\'style\'" src="{{CLIENT_CDN}}images/create/fakestyle.png"/>\n	<img title="点击上方按钮成为高级账号" ng-show="type==\'anim\'" src="{{CLIENT_CDN}}images/create/fakeanim.png"/>\n</div>')
            }
        ]), b.module("scene/console/input.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/input.tpl.html", '<div class="input_console">\n	<div class="modify_area">\n		<span class="label">输入框名称：</span>\n		<input type="text" maxlength="15" ng-model="model.title" ng-keyup="$event.keyCode == 13 ? confirm() : null"/>\n		<input type="checkbox" id="checkbox_required" ng-model="model.required" ng-true-value="required" style="margin-top:0;margin-left:5px;" />\n		<label for="checkbox_required" style="font-weight: lighter; margin:0;font-size:12px;">必填</label>\n	\n		<div class="customized_container">\n			<input type="radio" id="input_name" ng-model="model.type" ng-change="model.title=\'姓名\'" value="501" /><label for="input_name" style="font-weight: lighter; margin: 0;">姓名</label>\n			<input type="radio" id="input_phone" ng-model="model.type" ng-change="model.title=\'手机\'" value="502" /><label for="input_phone" style="font-weight: lighter; margin: 0;" />手机</label>\n			<input type="radio" id="input_email" ng-model="model.type" ng-change="model.title=\'邮箱\'" value="503" /><label for="input_email" style="font-weight: lighter; margin: 0;">邮箱</label>\n			<input type="radio" id="input_text" ng-model="model.type" ng-change="model.title=\'文本\'" value="5" /><label for="input_text" style="font-weight: lighter; margin: 0;">文本</label>\n		</div>\n	</div>\n</div>\n<div class="modal-footer">\n    <a class="btn-main login" style="width: 88px;" ng-click="confirm()">确定</a>\n    <a class="btn-grey0 cancel" style="width: 88px;" ng-click="cancel()">取消</a>\n</div>')
            }
        ]), b.module("scene/console/link.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/link.tpl.html", '<div class = "link-modal">	\n	<div class = "row" style = "font-size: 14px; text-align:center;">\n		<div class="input_console">\n			<div class = "modify_area" style="text-align:left;padding-left:110px;">\n				<div style="margin-bottom:20px;">\n					<input type="radio" name="externalRadio" id="externalRadio" ng-model = "url.link" value="external" ng-change = "changed()" style="margin:0px;">\n					    网站地址：\n					<input class = "" style="height:35px;width:280px;" type="text" ng-model = "url.externalLink" name="externalLink" id="externalLink" placeholder = "网站地址" ng-disabled = "url.link == \'internal\'" ng-change = "selectRadio(\'external\')"/>\n					<a style = "font-size: 16px;display: inline-block; margin-top: 5px;background-image: url(\'images/create/delete.png\'); width: 14px; height: 14px;" ng-show = "url.link == \'external\'" class = "delete-link" ng-click = "removeLink(\'external\')"></a>\n				</div>\n				<div class = "" >\n					<input type="radio" name="internalRadio" id="internalRadio" value="internal" ng-model = "url.link" ng-change = "changed()" style="margin:0px;">\n		    			场景页面：\n					<select style = "border:1px solid #E7E7E7; height: 35px;width:280px;" ng-model = "url.internalLink" ng-options = "page.name for page in pageList" ng-disabled = "url.link == \'external\'" ng-change = "selectRadio(\'internal\')"></select>\n					<a style = "display: inline-block;font-size: 16px; background-image: url(\'images/create/delete.png\'); width: 14px; height: 14px;" ng-show = "url.link == \'internal\'" ng-click = "removeLink(\'internal\')"></a>\n				</div>\n			</div>\n		</div>\n		<div class = "modal-footer">\n			<a type = "button" style="width:88px" class = "btn  btn-main" ng-click = "confirm()">确定</a>\n			<a type = "button" style="width:88px" class = "btn  btn-grey0" ng-click = "cancel()">取消</a>\n		</div>\n	</div>\n</div>')
            }
        ]), b.module("scene/console/map.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/map.tpl.html", '<div class="map_console">\n	<div id="l-map"></div>\n	<div class="search_area">\n		<div class="input-group">\n		  <input type="text" class="form-control" ng-model="search.address" ng-keyup="$event.keyCode == 13 ? searchAddress() : null" placeholder="请输入地名">\n		  <span class="input-group-btn">\n		    <button ng-click="searchAddress()" class="btn btn-default" type="button">搜索</button>\n		  </span>\n		</div><!-- /input-group -->\n		<div id="r-result">\n			<ul class="list-group">\n				<li class="list-group-item" ng-repeat="address in searchResult" ng-click="setPoint(address.point.lat, address.point.lng, address.address)">\n					{{address.address}}	\n				</li>\n			</ul>\n		</div>\n	</div>\n</div>\n<div class="modal-footer">\n    <a class="btn-main login" style="width: 88px;" ng-click="resetAddress()">确定</a>\n    <a class="btn-grey0 cancel" style="width: 88px;" ng-click="cancel()">取消</a>\n</div>')
            }
        ]), b.module("scene/console/microweb.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/microweb.tpl.html", '<div class="button_console">\n	<div class="modify_area">\n		<div>导航样式:\n			<ul>\n				<li ng-click = "selectColor(color)" ng-class = "{colorborder: model.color == color.backgroundColor}" style = "display: inline-block; margin: 10px;" ng-repeat = "color in backgroundColors"><div style = "width: 50px; height: 30px; margin: 10px; cursor:pointer;" ng-style = "color"></div></li>\n			</ul>\n		</div>\n	</div>\n	<div class = "divider" style = "margin-top: 10px; height: 1px; background: #ccc;"></div>\n	<div class="modify_area">\n		<div>\n			<ul class="clearfix" style="left:50%;margin-left:-160px;position:relative;height:65px;">\n				<li class = "title_color" ng-class = "{colorborder:labelIndex == $index && labelName.mousedown,selectedcolor: labelName.selected,whitecolor: labelName.color.backgroundColor == \'#fafafa\'}" ng-click = "switchLabel(labelName, $index)" style = "display: inline-block;float:left;" ng-repeat = "labelName in labelNames"><div style = "margin: 10px; width:50px; height: 30px;line-height:30px; border: 1px solid #ccc; cursor: pointer;" ng-style = "labelName.color">{{labelName.title}}</div></li>\n			</ul>\n		</div>\n		<span class="label">导航名称：</span>\n		<input type="text" ng-model="model.title" ng-change = "changeLabelName()" ng-keyup="$event.keyCode == 13 ? confirm() : null" placeholder = "导航名称" maxlength = "4"/>\n	</div>\n\n	<div class="modify_area">\n		<span class="label">链接页面：</span>\n		<select style = "width: 181px; height: 30px; display: inline-block;" ng-model = "model.link" ng-options = "page.name for page in pageList" ng-change = "selectLink(model.link)"></select>\n	</div>\n\n	<div class="modify_area" style = "color: #ff0000">\n		至少选择两个标签，并分别添加链接\n	</div>\n	\n</div>\n<div class="modal-footer">\n    <a class="btn-main login" style="width: 88px;" ng-click="confirm()">确定</a>\n    <a class="btn-grey0 cancel" style="width: 88px;" ng-click="cancel()">取消</a>\n</div>')
            }
        ]), b.module("scene/console/pic_lunbo.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/pic_lunbo.tpl.html", '<div class="pic_lunbo_console input_console">\n    <div class="modify_area">\n        <div class="row">\n            <div class="col-sm-7">\n                <div class="row" style="margin:0px -15px 10px -15px;">\n                    <div class="col-sm-5" style="line-height: 35px; vertical-align: middle; text-align: center;">图集样式</div>\n                    <div class="col-sm-7">\n                        <select class="" style="font-size:12px;padding-left:3px;width:150px;">\n                            <option value="1">图片轮播</option>\n                        </select>\n                    </div>\n                </div>\n                <div class="row" style="margin:10px -15px;">\n                    <div class="col-sm-5" style="line-height: 35px; vertical-align: middle; text-align: center;">自动播放</div>\n                    <div class="col-sm-7" style="font-size: 30px; color: #9ad64b;text-align:left;">\n                        <span class="fa fa-toggle-on" style="cursor: pointer;" ng-show="isAutoPlay" ng-click="autoPlay(false)"></span>\n                        <span class="fa fa-toggle-off" style="cursor: pointer;" ng-hide="isAutoPlay" ng-click="autoPlay(true)"></span>\n                    </div>\n                </div>\n                <div class="row" style="margin: 10px -15px;">\n                    <div class="col-sm-5" style="text-align: center;">\n                        <a style="border-radius:3px;width:88px;" class="btn-main btn-success" ng-click="choosePic()">选择图片</a>\n                    </div>\n                    <div class="col-sm-7" style="font-size:12px; line-height: 35px;text-align:left;">\n                        <div>最多可选择6张图片</div>\n                    </div>\n                </div>\n            </div>\n            <div class="col-sm-5">\n                <div class="well" style="margin-bottom: 0;">\n                    <img class="scratch" style="height: 100px; width: 100%;" ng-src="{{CLIENT_CDN}}images/u2462.png">\n                </div>\n            </div>\n        </div>\n        <div class="row" style="margin-top: 20px;" ng-hide="imgList.length">\n            <div class="col-sm-12">\n                <div class="divider" style="height: 1px; background: #ddd;"></div>\n            </div>\n        </div>\n        <div class="panel panel-default lunbo_upload" style="margin:20px 15px 0 15px;" ng-show="imgList.length">\n            <div class="panel-body">\n                <div style="margin: 10px 0; height: 66px;" ng-repeat="img in imgList track by $index">\n                    <div style="border-radius: 5px; overflow: hidden; width: 66px; height: 66px; float: left;">\n                        <img style="width: 100%; height: 100%;" ng-src="{{fileDomain + img.src}}">\n                    </div>\n                    <textarea placeholder="添加描述功能暂不开放" rows="4" disabled style="width: 75%; float: left; margin: 0 10px;" maxlength="150" ng-model="img.desc">{{img.desc}}</textarea>\n                    <div style="line-height: 66px; text-align: center; float: right;">\n                        <span class="glyphicon glyphicon-remove-circle" style="font-size: 30px; vertical-align: middle; cursor: pointer; color: orange;" ng-click="remove($index)"></span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class="modal-footer">\n    <a class="btn-main login" style="width: 88px;" ng-click="ok()">确定</a>\n    <a class="btn-grey0 cancel" style="width: 88px;" ng-click="cancel()">取消</a>\n</div>')
            }
        ]), b.module("scene/console/setting.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/setting.tpl.html", '<div panel-draggable id="comp_setting">\n	<div class="cancel"><a href="" title="关闭" ng-click="cancel()">x</a></div>\n	<div class="style_head clearfix">\n		<ul class="clearfix">\n			<li><a ng-click="activeTab = \'style\'" ng-class="{hover:activeTab == \'style\'}">样式</a></li>\n			<li><a ng-click="activeTab = \'anim\'" ng-class="{hover:activeTab == \'anim\'}">动画</a></li>\n		</ul>\n	</div>\n	<div class="style_content">\n		<div ng-include="\'scene/console/anim.tpl.html\'"></div>\n		<div ng-include="\'scene/console/style.tpl.html\'"></div>\n		\n	</div>		\n	\n</div>')
            }
        ]), b.module("scene/console/style.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/style.tpl.html", '<div ng-if="activeTab == \'style\'" ng-controller="StyleConsoleCtrl">\n	<div class="yangshi">\n		<section>\n			<div class="style_list" ng-init="showBasic=true" ng-click="showBasic = !showBasic; showBorder = false; showShadow = false;">\n				<b class="caret" ng-show="showBasic"></b><b class="caret off" ng-show="!showBasic"></b>基础样式\n			</div>\n			<div ng-show="showBasic"  class="style_con_hei">\n				<div class="style_list_angel clearfix">\n					<div class="">背景颜色</div>\n					<div class="color_select clearfix" style="margin-top:10px;">\n			    		<input class=" flo_right" style="font-size:12px;width:135px;" style-input elem-id="{{elemDef.id}}" ng-model="model.backgroundColor" css-item="backgroundColor" type="text" />\n			    		<a class="input_kuang flo_lef" ng-style="{backgroundColor: model.backgroundColor}" ng-model="model.backgroundColor" colorpicker="rgba" ></a>\n			    	</div>\n				</div>\n				<div class="style_list_angel clearfix" ng-show="elemDef.type == \'2\' ||elemDef.type == \'8\' || (\'\'+elemDef.type).charAt(0) == \'6\'">\n			  		<div class="">文字颜色</div>\n			  		<div class="color_select clearfix" style="margin-top:10px;">\n			  			<input class=" flo_right" style="font-size:12px;width:135px;" style-input elem-id="{{elemDef.id}}" ng-model="model.color" css-item="color" type="text" />\n				  		<a class="input_kuang flo_lef" ng-style="{backgroundColor: model.color}" ng-model="model.color" colorpicker="rgba" ></a>\n\n			    	</div>\n			  	</div>\n				<div class="style_list_angel clearfix">\n					<div>透明度</div>\n					<div class="touming clearfix">\n				  		<p class="num"><input type="number" min="0" max="100" limit-input style="width:56px;height:24px;border-radius:0px;" style-input elem-id="{{elemDef.id}}" css-item="opacity" ng-model="model.opacity"/>%</p>\n						<div style="width: 100px;" ui-slider min="0" max="100" ng-model="model.opacity"></div>\n				  	</div>\n			  	</div>				  	\n			  	<div class="style_list_angel clearfix" ng-show="elemDef.type == \'8\' || (\'\'+elemDef.type).charAt(0) == \'6\' || elemDef.type == \'2\' || (\'\'+elemDef.type).charAt(0) == \'5\'">\n			  		<div>\n						边距\n						<div class="touming clearfix">\n					  		<p class="num"><input min="0" max="20" limit-input class="input_kuang short" type="number" style-input css-item="padding" ng-model="model.paddingTop"/>px</p>				\n					  		<div style="width: 100px;" ui-slider min="0" max="20" ng-model="model.paddingTop"></div>\n					  	</div>\n					</div>\n				</div>\n				<div class="style_list_angel clearfix" ng-show="elemDef.type == \'8\' || (\'\'+elemDef.type).charAt(0) == \'6\' || elemDef.type == \'2\' || (\'\'+elemDef.type).charAt(0) == \'5\'">\n					<div>\n						行高\n						<div class="touming clearfix">\n					  		<p class="num"><input min="0" max="3" limit-input step="0.1" class="input_kuang short" type="number" style-input css-item="lineHeight" ng-model="model.lineHeight"/>倍</p>			\n					  		<div style="width: 100px;" use-decimals step="0.1" ui-slider min="0" max="3" ng-model="model.lineHeight"></div>\n					  	</div>\n					</div>\n				</div>								\n			</div>\n		</section>\n		<section>\n			<div class="style_list" ng-click="showBorder = !showBorder; showBasic=false;showShadow=false;">\n				<b class="caret" ng-show="showBorder"></b><b class="caret off" ng-show="!showBorder"></b>边框样式\n			</div>\n			<div ng-show="showBorder" class="style_con_hei">\n				<div class="style_list_angel clearfix">\n					边框尺寸\n					<div class="touming clearfix">\n				  		<p class="num"><input class="input_kuang short" limit-input type="number" min="0" max="20" style-input css-item="borderWidth" ng-model="model.borderWidth"/>px</p>				\n				  		<div style="width: 100px;" ui-slider min="0" max="20" ng-model="model.borderWidth"></div>\n				  	</div>\n				</div>\n				<div class="style_list_angel clearfix">\n			  		<div>边框弧度</div>\n			  		<!-- <div class="touming clearfix">\n			    		<p class="num"><input type="number" min="0" max="100" limit-input style="width:56px;height:24px;border-radius:2px;" style-input css-item="borderRadius" ng-model="model.borderRadiusPerc" />%</p>  		\n				  		<div class="num" style="width:100px;" ui-slider min="0" max="100" ng-model="model.borderRadiusPerc"></div>\n			    	</div> -->\n			    	<div class="touming clearfix">\n			    		<p class="num"><input class="input_kuang short" type="number" min="0" max="{{maxRadius}}" limit-input style-input css-item="borderRadius" ng-model="model.borderRadius" />px</p>  		\n				  		<div class="num" style="width:100px;" ui-slider min="0" max="{{maxRadius}}" ng-model="model.borderRadius"></div>\n			    	</div>\n			  	</div>	\n				<div class="style_list_angel clearfix">\n					<div class="flo_lef">边框样式</div>\n					<div class="flo_right">\n						<select style="border:1px solid #ccc" style-input css-item="borderStyle" ng-model="model.borderStyle">\n							<option value="solid">直线</option>\n							<option value="dashed">破折线</option>\n							<option value="dotted">点状线</option>\n							<option value="double">双划线</option>\n							<option value="groove">3D凹槽</option>\n							<option value="ridge">3D垄状</option>\n							<option value="inset">3D内嵌</option>\n							<option value="outset">3D外嵌</option>\n						</select>\n					</div>\n			  	</div>\n				<div class="style_list_angel clearfix">\n					<div class="">边框颜色</div>\n					<div class="clearfix" style="margin-top:10px;">\n						<input class="flo_right" style="font-size:12px;width:135px;" style-input ng-model="model.borderColor" css-item="borderColor" type="text" />\n				  		<a class="input_kuang flo_lef" ng-style="{backgroundColor: model.borderColor}" ng-model="model.borderColor" colorpicker="rgba"></a>\n			    	</div>\n			  	</div>\n			  	<div class="style_list_angel clearfix">\n					<div>\n						旋转\n						<div class="touming clearfix">\n					  		<p class="num"><input min="0" max="360" limit-input style-input css-item="transform" class="input_kuang short" type="number"  ng-model="model.transform"/>度</p>			\n					  		<div style="width: 100px;" ui-slider min="0" max="360" ng-model="model.transform"></div>\n					  	</div>\n					</div>\n				</div>			  	\n			</div>\n		</section>\n		<section>\n			<div class="style_list" ng-click="showShadow = !showShadow; showBasic=false;showBorder=false;">\n				<b class="caret" ng-show="showShadow"></b><b class="caret off" ng-show="!showShadow"></b>阴影样式\n			</div>\n			<div ng-show="showShadow" class="style_con_hei">\n				<div class="style_list_angel clearfix">\n					大小\n					<div class="touming clearfix">\n						<div style="width: 100px;" ui-slider min="0" max="20" ng-model="tmpModel.boxShadowSize"></div>\n						<p class="num"><input limit-input class="input_kuang short" min="0" max="20" type="number" style-input css-item="boxShadow" ng-model="tmpModel.boxShadowSize"/>px</p>\n					</div>\n			  	</div>\n			  	<div class="style_list_angel clearfix">\n					模糊\n					<div class="touming clearfix">\n						<div style="width: 100px;" ui-slider min="0" max="20" ng-model="tmpModel.boxShadowBlur"></div>\n						<p class="num"><input limit-input class="input_kuang short" min="0" max="20" type="number" style-input css-item="boxShadow" ng-model="tmpModel.boxShadowBlur"/>px</p>\n					</div>\n			  	</div>\n			  	<div class="style_list_angel clearfix">\n					<div class="">颜色</div>\n					<div class="clearfix" style="margin-top:10px;">\n			    		<input class=" flo_right" style="font-size:12px;width:135px;" style-input  ng-model="tmpModel.boxShadowColor" css-item="boxShadow" type="text" />						\n						<a class="input_kuang flo_lef" ng-style="{backgroundColor: tmpModel.boxShadowColor}" ng-model="tmpModel.boxShadowColor" colorpicker="rgba" colorpicker-fixed-position="true"></a>\n\n			    	</div>\n				</div>	\n			  	<div class="style_list_angel clearfix">\n					方向\n					<div class="clearfix" style="margin-top:15px;">\n				  		<div class="fr">\n				  			<p class="num" style="margin-top:18px;"><input style="width:58px;margin-right:5px;" min="0" max="359" limit-input class="input_kuang" type="number" style-input css-item="boxShadow" ng-model="tmpModel.boxShadowDirection"/>度</p></div>					\n				  		<angle-knob class="flo_lef" style="display: block;position: relative;height: 60px;margin-left:60px;"></angle-knob>\n				  	</div>\n				</div>\n			</div>\n		</section>\n		<div class="modal-footer">\n		    <a class="btn-main login" style="width: 120px;" ng-click="clear()">清除全部样式</a>\n		</div>\n	</div>\n</div>\n')
            }
        ]), b.module("scene/console/tel.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/tel.tpl.html", '<div class="button_console">\n	<div class="modify_area  tel_title">\n		<span ng-repeat = "button in buttons track by $index" ng-class = "{spanborder: $index == btnIndex}">\n			<!-- <a ng-class = "{btn1: $index==0, btn2: $index == 1, btn3: $index ==2, btn4: $index ==3}" ng-click = "chooseTelButton(button, $index, $event)" selected><span class = "glyphicon glyphicon-earphone"></span>{{button.text}}</a> -->\n			<a ng-style = "button.btnStyle" ng-click = "chooseTelButton(button, $index, $event)" selected>{{button.text}}</a>\n		</span>\n	</div>\n	<div class = "divider" style = "margin-top: 10px; height: 1px; background: #ccc;"></div>\n	<div class="modify_area">\n		<span class="label" style="font-weight:lighter;">按钮名称：&nbsp;</span>\n		<input type="text" ng-model="model.title" ng-keyup="$event.keyCode == 13 ? confirm() : null"/>\n	</div>\n\n	<div class="modify_area">\n		<span class="label" style="font-weight:lighter;">手机/电话：</span>\n		<input class = "tel-button" type="text" placeholder = "010-88888888" ng-model="model.number" ng-keyup="$event.keyCode == 13 ? confirm() : null" ng-focus = "removePlaceHolder($event)" ng-blur = "addPlaceHolder()"/>\n	</div>\n	\n</div>\n<div class="modal-footer">\n    <a class="btn-main login" style="width: 88px;" ng-click="confirm()">确定</a>\n    <a class="btn-grey0 cancel" style="width: 88px;" ng-click="cancel()">取消</a>\n</div>')
            }
        ]), b.module("scene/console/video.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/video.tpl.html", '<div class="video_console">\n	<div class="modify_area" style="height:auto">\n		<div>\n			<span class="label">视频通用代码：</span>\n			<span class="video_code"></span>\n		</div>\n		<div class="video_tip">\n			<textarea style="border-radius:0px;" class = "video_src" ng-model="model.src" ng-keyup="$event.keyCode == 13 ? confirm() : null"/>\n		</div>\n		<div class="video_tip">将视频的通用代码粘贴到文本框里即可。</div>\n		<div class="video_tip">建议使用视频：<a href="http://www.youku.com/" target="_blank"><ins>优酷</ins></a>、<a href="http://www.tudou.com/" target="_blank"><ins>土豆</ins></a>、<a href="http://v.qq.com/" target="_blank"><ins>腾讯视频</ins></a></div>\n	</div>	\n</div>\n<div class="modal-footer">\n    <a class="btn-main login" style="width: 88px;" ng-click="confirm()">确定</a>\n    <a class="btn-grey0 cancel" style="width: 88px;" ng-click="cancel()">取消</a>\n</div>')
            }
        ]), b.module("scene/create.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/create.tpl.html", '<div class="creat_head">\n  <div class="creat_head_con clearfix">\n    <div class="creat_logo"><a href="#/main" ng-click="stopCopy()"><img ng-src="{{CLIENT_CDN}}images/logo.png" /></a></div>\n    <div class="creat_con clearfix">\n        <ul class="comp_panel clearfix">\n          <li comp-draggable="panel" ctype="2" class="comp-draggable text" title="请拖动到编辑区域" ng-click="createComp(\'2\');">\n            <span>文本</span>\n          </li>\n          <li comp-draggable="panel" ctype="3" class="comp-draggable bg" title="请拖动到编辑区域" ng-click="createComp(\'3\');">\n            <span>背景</span>\n          </li>\n          <li comp-draggable="panel" ctype="9" class="comp-draggable music" title="请拖动到编辑区域" ng-click="createComp(\'9\');">\n            <span>音乐</span>\n          </li>  \n          <li ng-if="isAllowToAccessScrollImage" comp-draggable="panel" ctype="v" class="comp-draggable vedio" title="请拖动到编辑区域" ng-click="createComp(\'v\');">\n            <span>视频</span>\n          </li>        \n          <li comp-draggable="panel" ctype="4" class="comp-draggable image" title="请拖动到编辑区域" ng-click="createComp(\'4\');">\n            <span>图片</span>\n          </li>\n          <li comp-draggable="panel" ctype="5" class="comp-draggable textarea" title="请拖动到编辑区域" ng-click="createComp(\'5\');">\n            <span>输入框</span>\n          </li>\n          <li comp-draggable="panel" ctype="6" class="comp-draggable button" title="请拖动到编辑区域" ng-click="createComp(\'6\');">\n            <span>按钮</span>\n          </li>\n          <li ng-if="isAllowToAccessScrollImage" comp-draggable="panel" ctype="p" class="comp-draggable images" title="请拖动到编辑区域" ng-click="createComp(\'p\');">\n            <span>图集</span>\n          </li>\n          <li comp-draggable="panel" ctype="8" class="comp-draggable phone" title="请拖动到编辑区域" ng-click="createComp(\'8\');">\n            <span>电话</span>\n          </li>          \n          <li comp-draggable="panel" ctype="g101" class="comp-draggable contact" title="请拖动到编辑区域" ng-click="createCompGroup(\'g101\');">\n            <span>联系人</span>\n          </li>          \n          <li ng-click="openPageSetPanel()" class="texiao">\n            <span><a id = "toggle_button" class="page_effect" >特效</a></span></li>\n        </ul>\n  </div>\n    <div class="create-action">\n        <ul>\n            <!--<li class="act-border save"><span class="create-save" ng-click="saveScene(true)">保存</span></li>-->\n            <li class="publish"><span class="btn-main" style="height:35px;margin-top:8px;font-size:14px;padding-top:10px;" ng-click="publishScene()">保存场景</span></li>\n            <li class="act-border quit" ng-show="false"><span class="create-quit" ng-click="exitScene()">退出</span></li> \n        </ul>\n    </div>\n    <div ng-hide="showToolBar();">\n        <div ng-show="isEditor" style="position: absolute;right: -200px;top: 20px;">\n            <select ng-model="tpl.obj.scene.isTpl">\n                <option value="0">非模板</option>\n                <option value="1">保存为pc模板</option>\n                <option value="2">保存为移动端模板</option>\n            </select>\n        </div>\n    </div>\n</div>\n</div>\n<div class="create_scene">\n  <div class="main clearfix">\n      <div class="content">\n          <div class="create_left">\n            <tabset justified="true">\n              <tab heading="页面模版" class="hint--bottom hint--rounded" style = "width: 290px;">\n                  <tabset justified="true" class="tpl_tab">\n                    <tab ng-repeat="pageTplType in pageTplTypes" heading="{{pageTplType.name}}" ng-click="getPageTplsByType(pageTplType.value)">\n                      <div class="nav2 clearfix" dropdown >\n                        <div class="others dropdown-toggle" ng-show="otherCategory.length > 0"><span></span></div>\n                        <ul class="clearfix nav2_list">\n                          <li ng-class="{active:childCat.id == categoryId}" ng-click="getPageTplTypestemp(childCat.id ,bizType)" ng-repeat="childCat in childCatrgoryList">{{childCat.name}}</li>\n                        </ul>\n                        <ul class="clearfix nav2_other dropdown-menu">\n                          <li ng-class="{active:othercat.id == categoryId}" ng-click="getPageTplTypestemp(othercat.id ,bizType)" ng-repeat="othercat in otherCategory">{{othercat.name}}</li>\n                        </ul>                        \n                      </div>\n                      <ul id="tpl_panel" class="page_tpl_container clearfix">\n                        <li class="page_tpl_item" ng-repeat="pageTpl in pageTpls" class="comp-draggable" title="点击插入编辑区域" ng-click="insertPageTpl(pageTpl.id);">\n                          <img ng-src="{{PREFIX_FILE_HOST + pageTpl.properties.thumbSrc}}" />\n                        </li>\n                      </ul>\n                    </tab>\n                  </tabset>\n              </tab>\n            </tabset>\n          </div> \n          <div class="phoneBox">\n            <div >\n                <div class="top"></div>\n                <div class = "phone_menubar"></div>\n                <div class="scene_title_baner">\n                  <div ng-bind="tpl.obj.scene.name" class="scene_title"></div>\n                </div>\n                <div class="nr sortable"></div>\n                <div class="bottom"></div>\n                <div class = "tips">为了获得更好的使用，建议使用谷歌浏览器（chrome）、360浏览器、IE11浏览器。</div>\n            </div>\n            <div class="phone_texiao">\n                <div id="editBG" style="display: none;"><span class="hint--right hint--rounded" data-hint="选择新背景">背景</span><div style="margin:10px 0;border-bottom: 2px solid #666;"></div><a style = "color: #666;" class="hint--bottom hint--rounded" data-hint="删除当前页面的背景"><span ng-click="removeBG($event)" class="glyphicon glyphicon-remove"></span></a></div>\n                <div id="editBGAudio" ng-click="openAudioModal()" ng-show="tpl.obj.scene.image.bgAudio"><span class="hint--right hint--rounded" data-hint="选择新音乐">音乐</span><div style="margin:10px 0;border-bottom: 2px solid #666;"></div><a style = "color: #666;" class="hint--bottom hint--rounded" data-hint="删除当前页面的音乐"><span ng-click="removeBGAudio($event)" class="glyphicon glyphicon-remove"></span></a></div>\n                <div id="editScratch" ng-click="openOneEffectPanel(tpl.obj.properties)" ng-show="tpl.obj.properties"><span class="hint--right hint--rounded" data-hint="选择新特效">{{effectName}}</span><div style="margin:10px 0;border-bottom: 2px solid #666;"></div><a style = "color: #666;" class="hint--bottom hint--rounded" data-hint="删除当前页面特效"><span ng-click="removeScratch($event)" class="glyphicon glyphicon-remove"></span></a></div>\n            </div>\n          </div>\n\n          <div id = "containment" class="create_right"> \n            <div class="guanli">页面管理</div>\n            <div class = "nav_top">\n              <div class="nav_top_list">\n                <a ng-click="duplicatePage()" class="">复制</a>\n                <a class="" ng-click = "deletePage($event)" ng-show = "pages.length != 1">删除</a>\n              </div>\n             \n              <div class = "btn-group">\n                <div class="dropdown">\n                  <div id = "page_panel" ng-show="showPageEffect" class="dropdown-menu1 panel panel-default">\n                    <ul class = "effect_list">\n                      <li class = "effect" ng-repeat = "effect in effectList" ng-click = "openOneEffectPanel(effect)">\n                        <div class = "effect_img"><img ng-src="{{effect.src}}"></div>\n                        <div class = "effect_info">{{effect.name}}</div>\n                      </li>\n                    </ul>\n                  </div>\n\n                  <div id = "page_panel" ng-if="effectType == \'scratch\'" class="dropdown-menu1 panel panel-default">\n\n                    <div class="panel-heading">涂抹设置</div>\n                    <div class="panel-body">\n                      <form class="form-horizontal" role="form">\n                        <div class="form-group form-group-sm clearfix" style="margin-bottom:0;">\n                          <label class="col-sm-5 control-label">覆盖特效</label>\n                          <div class="col-sm-7">\n                            <select ng-model = "scratch.image" ng-options = "scracthImage.name for scracthImage in scratches"  style="width:115px;">\n                            </select>\n                          </div>\n                        </div>\n                        <div class="form-group form-group-sm" style="margin-bottom:0px;margin-top:5px;">\n                          <label class="col-sm-5 control-label" style="padding-top:6px;">覆盖图片</label>\n                          <div class="col-sm-7">\n                            <a ng-click = "openUploadModal()" class = "auto_img btn-main btn-success ">自定义图片</a>\n                          </div>\n                        </div>\n                        <div class = "divider" style="margin-top:6px;"></div>\n                        <div class = "well" style="margin-bottom:0px;">\n                          <img class = "scratch" ng-src="{{scratch.image.path}}"/>\n                        </div>\n                        <div class = "divider"></div>\n                        <div class="form-group form-group-sm" style="margin-bottom:10px;">\n                          <label for="inputEmail3" class="col-sm-5 control-label">涂抹比例</label>\n                          <div class="col-sm-7">\n                            <select ng-model = "scratch.percentage" ng-options = "percentage.name for percentage in percentages">\n                            </select>\n                          </div>\n                        </div>\n                         <div class="form-group form-group-sm" style="margin-bottom:10px;">\n                          <label for="inputEmail3" class="col-sm-5 control-label">提示文字</label>\n                          <div class="col-sm-7">\n                            <input type="text" ng-model = "scratch.tip" id="inputEmail3" placeholder="提示文字" maxlength = "15">\n                          </div>\n                        </div>\n                        <div class="form-group form-group-sm" style="margin-bottom:0px;">\n                          <div class="modal-footer" style="padding-bottom:0px;padding-top:0px;">\n                            <a dropdown-toggle type="button" ng-click = "saveEffect(scratch)" class="btn-main" style="width:88px;border:none;">保存</a>\n                            <a dropdown-toggle type="button" ng-click = "cancelEffect()" class="btn-grey0" style="width:88px;">取消</a>\n                          </div>\n                        </div>\n                      </form>\n                    </div>\n                  </div>\n\n                  <div id = "page_panel" ng-if="effectType==\'finger\'" class="dropdown-menu1 panel panel-default">\n\n                    <div class="panel-heading">指纹设置</div>\n                    <div class="panel-body">\n                      <form class="form-horizontal" role="form">\n                        <div class="form-group form-group-sm" style="margin-bottom:10px;">\n                          <label class="col-sm-5 control-label">背景图片</label>\n                          <div class="col-sm-7">\n                            <select ng-model = "finger.bgImage" ng-options = "bgImage.name for bgImage in fingerBackgrounds">\n                            </select>\n                          </div>\n                        </div>\n                        <div class="form-group form-group-sm" style="margin-bottom:10px;">\n                          <label class="col-sm-5 control-label">指纹图片</label>\n                          <div class="col-sm-7">\n                            <select ng-model = "finger.zwImage" ng-options = "zwImage.name for zwImage in fingerZws">\n                            </select>\n                          </div>\n                        </div>\n                        <div class = "divider"></div>\n                        <div class = "well" style="margin-bottom:15px;">\n                          <img class = "finger_bg" ng-src="{{finger.bgImage.path}}"/>\n                        \n                            <img class = "finger_zw" ng-src="{{finger.zwImage.path}}"/>\n                          \n                        </div>\n                        <div class="form-group form-group-sm" style="margin-bottom:0px;">\n                          <div class="modal-footer" style="padding-bottom:0px;padding-top:0px;">\n                            <a class="btn-main" dropdown-toggle type="button" ng-click = "saveEffect(finger)" class="btn btn-success btn-sm btn-main login" style="width:88px;">保存</a>\n                            <a dropdown-toggle type="button" ng-click = "cancelEffect()" class="btn-grey0" style="width:88px;">取消</a>\n                          </div>\n                        </div>\n                      </form>\n                    </div>\n                  </div>\n                  <div id = "page_panel" ng-show="effectType == \'money\'" class="dropdown-menu1 panel panel-default">\n                    <div class="panel-heading">数钱设置</div>\n                    <div class="panel-body">\n                      <div class = "well" style="margin-bottom:15px;">\n                          <img ng-src="{{CLIENT_CDN + \'images/create/money_thumb2.jpg\'}}"/>      \n                      </div>\n                      <div>\n                        <span>文字提示：</span>\n                        <span class="fr" style="width: 140px;"><input type="text" ng-model="money.tip" placeholder="让你数到手抽筋"></span>\n                      </div>\n                      <div class="form-group form-group-sm" style="margin-bottom:0px;">\n                        <div class="modal-footer" style="padding-bottom:0px;padding-top:0px;">\n                          <a class="btn-main" dropdown-toggle type="button" ng-click = "saveEffect(money)" class="btn btn-success btn-sm btn-main login" style="width:88px;">保存</a>\n                          <a dropdown-toggle type="button" ng-click = "cancelEffect()" class="btn-grey0" style="width:88px;">取消</a>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                  <div ng-include="\'scene/effect/falling.tpl.html\'"></div>\n                </div>\n              </div>\n            </div>\n\n            <div class="nav_content">\n              <ul id = "pageList" ui-sortable = "sortableOptions" ng-model="pages">\n                <li class = "blurClass" ng-repeat="page in pages track by $index" ng-click="navTo(page, $index, $event)" ng-init = "editableStatus[$index] = false" ng-class="{current: pageNum-1 == $index}" blur-children>\n                    <span style = "float: left; margin-top: 17px; background: #fff; color: #666; font-weight: 200;border-radius:9px;width:18px;height:18px;padding:0px;text-align:center;line-height:18px;" class = "badge">{{$index+1}}</span>\n                    <span style = "margin-left: 17px;font-size:14px;" >{{page.name}}</span>\n                    <input style = "width: 80px; height: 25px; margin-top: 8px; margin-left: 10px; color: #999;" type = "text" ng-model = "page.name" ng-show = "editableStatus[$index]" ng-blur = "editableStatus[$index] = false;savePageNames(page, $index)" ng-focus = "getOriginPageName(page)" maxlength = "7" custom-focus/>                   \n                </li>\n              </ul>\n              <div class = "page-list-label" ng-show="isEditor && pageList == true">\n                  <label ng-repeat = "allchild in pageLabelAll">\n                      <input type="checkbox" name="" value="" ng-model = "allchild.ischecked">{{allchild.name}}\n                  </label>\n                  <div class="select-labels">\n                      <a ng-click="pageChildLabel()">确定</a>\n                  </div>\n              </div>               \n            </div>\n            <div class="nav_bottom">\n              <a ng-click="insertPage()" class="" title="增加一页">+</a>\n             <!--  <a ng-click="duplicatePage()" class="duplicate_page">复制一页</a> -->\n            </div>\n\n            <div ng-show="isEditor">\n              <div class="btn-main" ng-click="chooseThumb()">选择本页缩略图</div>\n              <img width="100" ng-src="{{PREFIX_FILE_HOST + tpl.obj.properties.thumbSrc}}"></img>\n            </div>\n          </div>\n      </div>\n  </div>\n</div>\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>\n')
            }
        ]), b.module("scene/createNew.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/createNew.tpl.html", '<div class="modal-header">\n    <span class="glyphicon glyphicon-exclamation-sign"></span>\n    <span>新建场景</span>\n</div>\n<form name="resetForm" novalidate class="login-form">\n    <div class="login_form">\n        <div class="alert alert-warning" role="alert" ng-show="authReason">\n            {{authReason}}\n        </div>\n        <div class="alert alert-danger" role="alert" ng-show="authError">\n            {{authError}}\n        </div>\n        <div class="input-wrap">\n            <input name="name" placeholder="请填写场景名称" type="text" ng-model="scene.name" required autofocus>            \n        </div>\n        \n        <div class="input-wrap">\n            <select ng-model="scene.type" ng-options="scenetype.name for scenetype in scene.types" >\n            </select>\n        </div>\n        <div class="input-wrap" ng-show = "false">\n            <select ng-model="scene.pageMode" ng-options="pagemode.name for pagemode in pagemodes"></select>\n        </div>\n\n        <div class="modal-footer">\n            <div class="btn-main" ng-click="create()" ng-disabled=\'form.$invalid\'>创&nbsp;&nbsp;建</div>\n            <div class="btn-grey0" ng-click="cancel()" ng-disabled=\'form.$invalid\'>取&nbsp;&nbsp;消</div>\n        </div>\n\n        <p>特别说明：根据相关部门要求，暂不允许药品，医疗机构，医疗器械场景内容发布，请您理解。<a href="javascript:void(0);" style="font-weight: 400; color: red;">请查看审核规则</a></p>\n    </div>\n</form>\n')
            }
        ]), b.module("scene/effect/falling.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/effect/falling.tpl.html", '<div id = "page_panel" ng-if="effectType == \'fallingObject\'" class="dropdown-menu1 panel panel-default">\n    <div class="panel-heading">落物设置</div>\n    <div class="panel-body">\n      <form class="form-horizontal" role="form">\n        <div class="form-group form-group-sm" style="margin-bottom:10px;">\n          <label class="col-sm-5 control-label">环境图片</label>\n          <div class="col-sm-7">\n            <select ng-model = "falling.src" ng-options = "fallingObj.name for fallingObj in fallings">\n            </select>\n          </div>\n        </div>\n        <div class = "divider"></div>\n        <div class = "well" style="margin-bottom:15px;text-align: center;background-color: #ddd">\n          <img ng-src="{{falling.src.path}}"/>\n        </div>\n        <div class = "divider"></div>\n        <div class="form-group form-group-sm" style="margin-bottom:10px;">\n          <label class="col-sm-5 control-label">环境氛围</label>\n          <div class="col-sm-7">\n          	<div style="line-height: 24px;font-size: 12px;"><span style="margin-right:39px;">弱</span><span style="margin-right:37px;">中</span><span>强</span></div>\n          	<div style="width: 100px;" ui-slider min="1" max="3" ng-model="falling.density"></div>\n\n          </div>\n        </div>\n        \n        <div class="form-group form-group-sm" style="margin-bottom:0px;">\n          <div class="modal-footer" style="padding-bottom:0px;padding-top:0px;">\n            <a class="btn-main" dropdown-toggle type="button" ng-click = "saveEffect(falling)" class="btn btn-success btn-sm btn-main login" style="width:88px;">保存</a>\n            <a dropdown-toggle type="button" ng-click = "cancelEffect()" class="btn-grey0" style="width:88px;">取消</a>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>')
            }
        ]), b.module("scene/scene.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/scene.tpl.html", '\n<div ng-include="\'header.tpl.html\'"></div>\n<div class="choose_template min_contain">\n    <div class="main clearfix">\n        <div class="title">\n            空白自主创建，或者选择一个样例\n            <!-- <a class="btn-secondary" ng-click="createScene()">or自主创建</a> -->\n        </div>\n\n        <div class="scene_type clearfix">\n            <!--<div class="new_hot"><a ng-class="{hover: order==\'new\'}" ng-click="tplnew(\'new\')">最新场景</a><a ng-class="{hover: order==\'hot\'}" ng-click="tplnew(\'hot\')">热门场景</a></div>-->\n            <div class="scene_list">\n                <ul class="clearfix scene_cat">\n                    <li ng-class="{active : 0 == childcat}" ng-click="allpage(null,null)">全部</li>\n                    <li ng-class="{active : pageTplType.value == childcat}" ng-click="getPageTplsByType(pageTplType.value,pageTplType.id)" ng-repeat="pageTplType in pageTplTypes">{{pageTplType.name}}</li>\n                </ul>\n                <ul class="clearfix child_cat">\n                    <li ng-click="getPageTpls(type,childCat.bizType,childCat.id)" ng-class="{active:childCat.id == categoryId}" ng-repeat="childCat in childCatrgoryList">{{childCat.name}}</li>\n                </ul>                \n            </div>\n        </div>\n        \n        <div class="content clearfix">\n            <div class="mask">\n                <ul>\n                    <li ng-click = "createScene()" title="创建一个空白场景">                        \n                        <div style="height:240px; background-color:#bdd5ef;"><i class = "fa fa-plus"></i></div>\n                        <p style="height:100px;">自主创建<i class="add_icon"></i></p>                  \n                    </li>\n                    <li ng-repeat="tpl in tpls track by $index" ng-class="{mr0:$index%4 == 2}">         \n                        <div class = "roll" ng-hover>\n                            <div class = "mask-floor" style = "display: none">\n                            </div>\n                            <img style="width:235px;height:240px;" ng-src="{{PREFIX_FILE_HOST + tpl.image.imgSrc}}" alt="" />\n                            <div class="my_xinxi"><p>{{tpl.name}}<i class="add_icon"></i></p>\n                                <p style="background-color:#FFF;color:#999;padding-right:10px;">作者：{{tpl.userName}}</p>\n                            </div>\n                            <a class = "preview_scene btn" href="{{VIEW_URL + \'v-\' + tpl.code}}" target="_blank">预览</a>\n                            <a class = "preview_scene edit_scene btn" ng-click="createScene(tpl)">就这个了</a>\n                        </div>                \n                    </li>\n                </ul>\n            </div>\n        </div>\n        <div class="clearfix fl" ng-show="tpls.length > 0">\n            <pagination style="float: left" first-text="首页" last-text="尾页" previous-text="上一页" next-text="下一页" max-size="10" items-per-page="11" total-items="totalItems" ng-model="currentPage" ng-change="pageChanged(currentPage)" boundary-links="true" rotate="true" num-pages="numPages"></pagination>\n            <div class="current_page">\n                <input type="text" ng-model="toPage" ng-keyup="$event.keyCode == 13 ? pageChanged(toPage) : null">\n                <a ng-click="pageChanged(toPage)" class="go">GO</a>\n                <span>当前: {{currentPage}} / {{numPages}} 页</span>\n            </div>\n        </div>\n    </div>\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>\n</script>')
            }
        ]), b.module("usercenter/console/relAccount.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("usercenter/console/relAccount.tpl.html", '<div class="transfer">\n	<div class="clearfix">\n		<div class="alert" style="text-align: center;background-color: #f0f0f0;" ng-show="relErr">{{relErr}}</div>\n		<div class="transfer_list">\n			<label>登录账号</label><input type="text" ng-model="user.email" ng-blur="checkUpperCase();" placeholder="输入帐号"/>\n		</div>\n		<div class="transfer_list">\n			<label>密码</label><input type="password" style="float:right;" maxlength = "12" ng-model="user.password" placeholder="输入密码"/>\n		</div>	\n		<div class="modal-footer">\n		    <a class="btn-main login" style="width: 88px;" ng-click="relAccount()">立即绑定</a>\n		    <a class="btn-grey0 cancel" style="width: 88px;" ng-click="cancel()">取消</a>\n		</div>\n	</div>\n</div>')
            }
        ]), b.module("usercenter/request_reg.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("usercenter/request_reg.tpl.html", '<div class="request_reg">\n	<div class="close" ng-click="cancel()">x</div>\n	<div class="erwei" qr-code qr-url="{{PREFIX_CLIENT_HOST + \'/m/#/wxLogin?id=\' + currentUser.id}}"></div>\n<!-- 	<div class="erwei" qr-code qr-url="{{PREFIX_CLIENT_HOST + \'/m/#/wxreg?id=\' + currentUser.id}}"></div>	 -->	\n</div>')
            }
        ]), b.module("usercenter/transfer.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("usercenter/transfer.tpl.html", '<div class="transfer">\n	<div  ng-show="transfer">\n		<p>我的积分<span>{{xdCount | fixnum}}</span>个</p>\n		<div class="transfer_list">\n			<label>转送账号</label><input type="text" ng-model="userXd.toUser" /><!-- <span ng-hide="actionerror || !submit" class="right"><img ng-src="{{CLIENT_CDN}}images/dui.png" /></span> --><span ng-show="actionerror" class="error"><img ng-src="{{CLIENT_CDN}}images/wrong.png" /></span>\n			<div ng-show="actionerror">{{actionerror}}</div>\n		</div>\n		<div class="transfer_list">\n			<label>转送数目</label><input type="text" maxlength = "12" ng-model="userXd.xdCount" /><!-- <span ng-hide="retrieverror || !submit" class="right"><img ng-src="{{CLIENT_CDN}}images/dui.png" /></span> --><span ng-show="retrieverror" class="error"><img ng-src="{{CLIENT_CDN}}images/wrong.png" /></span>\n			<div ng-show="retrieverror">{{retrieverror}}</div>\n		</div>	\n		<div class="modal-footer">\n		    <a class="btn-main login" style="width: 88px;" ng-click="confirm()">确认</a>\n		    <a class="btn-grey0 cancel" style="width: 88px;" ng-click="cancel()">取消</a>\n		</div>\n		<div class="action" style="text-align:center;background-color:#CCC;padding:3px 0;"><a style="font-size:12px;" href="javascript:void(0);" target="_blank" >积分转送是用户个人行为，请注意防范风险！</a></div>\n	</div>\n	<div ng-hide="transfer" style="text-align:center;" id="transfer_mes">\n		<p>你已为<span style="padding:0 15px">{{userXd.toUser}}</span>成功转送<span style="padding:0 15px">{{userXd.xdCount | fixnum}}</span>个积分！</p>\n		<a class="btn-grey0 cancel" style="width: 88px;" ng-click="cancel()">关闭</a>\n	</div>\n</div>')
            }
        ]), b.module("usercenter/usercenter.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("usercenter/usercenter.tpl.html", '<div ng-include="\'header.tpl.html\'"></div>\n<div id = "usercenter" class="min_contain">\n  <div class = "main clearfix">\n    <div class = "content">\n<!--       <div class = "page_header col-sm-10">用户中心</div>\n      <div class = "col-sm-2" style = "height: 50px; font-size: 14px; line-height: 50px;"><a href = "#/main"><span class = "glyphicon glyphicon-share-alt"></span>返回我的场景</a></div> -->\n        <div class = "user_contain clearfix">\n          <div class = "user_img" ng-mouseover = "showCustomButton=true" ng-mouseleave = "showCustomButton=false;">\n            <img ng-src="{{headImg ||(PREFIX_FILE_HOST + userinfo.headImg)}}" width="160px" height="160px" />\n            <div ng-show = "showCustomButton" class = "upload_button" ng-click = "customerUpload()">上传头像</div>\n          </div>\n          <div class="user_message">\n            <p>用户名：{{userinfo.name}}</p>\n            <p>我的积分：{{xdCounts | fixnum}}个 </p>\n            <p>站内信息：<a href="#/usercenter/message">{{msgCount}}</a>条</p>\n          </div>\n        </div>\n        <div class="tab_user" style = "padding: 0;">\n          <ul class="nav nav-tabs tabs-left clearfix">\n            <li ng-class="{active: tabid == \'userinfo\'}"><a ng-click="goBaseInfo()">基础信息</a></li>\n            <li ng-class="{active: tabid == \'account\'}"><a ng-click="goAccount()">账号管理</a></li>\n            <li ng-class="{active: tabid == \'xd\'}"><a ng-click="goXd()">我的积分</a></li>\n             <li ng-class="{active: tabid == \'reset\'}" ng-if="!userinfo.noRel"><a ng-click="goReset()">修改密码</a></li>\n             <li ng-class="{active: tabid == \'message\'}"><a ng-click="goMessage()">站内消息</a></li>\n          </ul>\n        </div>        \n      <div class="">\n        <div class="tab-content">\n          <div class="tab-pane" ng-class="{active: tabid == \'userinfo\'}" id="home">\n            <div class="panel panel-default" ng-init = "isEditable = false">\n              <div class="panel-body">\n                <fieldset ng-disabled  = "!isEditable">                 \n                  <form class="form-horizontal" role="form" style="margin-left:220px;margin-top:25px;">\n                    <div class="form-group" style="margin-bottom: 22px;">\n                      <label for="inputPassword3" class="col-sm-2 control-label">登录账号</label>\n                      <div class="col-sm-6" style="top: 6px;">{{userinfo.noRel || userinfo.loginName}}</div>\n                    </div>\n                  <div class="form-group">\n                    <label for="inputEmail3" class="col-sm-2 control-label">用户名</label>\n                    <div class="col-sm-6">\n                      <input type="text" class="form-control" ng-model = "userinfo.name" id="inputEmail3" placeholder="用户名" maxlength = "12">\n                    </div>\n                  </div>\n                  <div class="form-group">\n                    <label class="col-sm-2 control-label">性别</label>\n                    <div class="col-sm-6">\n                      <label class="radio-inline">\n                        <input type="radio" ng-model = "userinfo.sex" id="inlineRadio1" value="1"> 男\n                      </label>\n                      <label class="radio-inline">\n                        <input type="radio" ng-model = "userinfo.sex" id="inlineRadio2" value="2"> 女\n                      </label>\n                    </div>\n                  </div>\n                  <div class="form-group">\n                    <label for="inputEmail3" class="col-sm-2 control-label">手机</label>\n                    <div class="col-sm-6">\n                      <input type="text" class="form-control" ng-model = "userinfo.phone" id="inputEmail3" placeholder="手机">\n                    </div>\n                  </div>\n                  <div class="form-group">\n                    <label for="inputPassword3" class="col-sm-2 control-label">QQ</label>\n                    <div class="col-sm-6">\n                      <input type="text" class="form-control" ng-model = "userinfo.qq" id="inputPassword3" placeholder="QQ">\n                    </div>\n                  </div>\n                  <div class="form-group">\n                    <label for="inputPassword3" class="col-sm-2 control-label">座机</label>\n                    <div class="col-sm-6">\n                      <input type="text" class="form-control" ng-model = "userinfo.tel" id="inputPassword3" placeholder="座机">\n                    </div>\n                  </div>\n                  <div class="form-group">\n                    <div>\n                      <script type="text/javascript" src="http://api.geetest.com/get.php?gt=1ebc844c9e3a8c23e2ea4b567a8afd2d"></script>\n                    </div>\n                  </div>\n                  <div class="form-group">\n                    <div class="col-sm-offset-2 col-sm-10">\n                      <a  class="btn-main" ng-show = "isEditable" ng-click = "saveUserInfo(userinfo)">保存</a>\n                      <a class="btn-grey0" ng-click = "cancel()" ng-show = "isEditable">取消</a>\n                    </div>\n                    <div class="col-sm-offset-2 col-sm-10"><a class="btn-main" ng-click = "isEditable = true;" ng-show="!isEditable"><span>编辑</span></a></div> \n                  </div>\n                </form>\n                </fieldset>\n                <!-- <form>\n                  <div validate-code>\n\n                  </div>\n                </form> -->\n              </div>\n            </div>\n          </div>\n          <div class="tab-pane" ng-class="{active: tabid == \'account\'}" id="account">\n            <div class="panel panel-default">\n              <div class="panel-body">\n                <div class="account">\n                  <div style = "border-bottom: 1px solid #E7E7E7; padding-bottom: 20px;">登录账号：\n                    <span>{{userinfo.noRel || userinfo.loginName}}</span>\n                    <span ng-if="userinfo.noRel"><a style="display:inline-block;" href="" ng-click="relAccount()"><img ng-src="{{CLIENT_CDN}}images/bangding.png"></a></span>\n                  </div> \n                  <div class="relInfo" ng-if="!userinfo.noRel">\n                    <div>账号关联后，可以通过关联账号直接登录！</div>\n                    <ul class="clearfix" style="margin-top: 20px;">\n                      <li class="wx" ng-class="{wxrel: wxRel}"><img ng-src="{{CLIENT_CDN}}images/wechatwhite.png">微信<span ng-if="!wxRel">未关联</span><span ng-if="wxRel">已关联</span></li>\n                      <li class="qq" ng-class="{qqrel: qqRel}"><img ng-src="{{CLIENT_CDN}}images/QQwhite.png">QQ<span ng-if="!qqRel">未关联</span><span ng-if="qqRel">已关联</span></li>\n                      <li class="wb" ng-class="{wbrel: wbRel}"><img ng-src="{{CLIENT_CDN}}images/weibowhite.png">微博<span ng-if="!wbRel">未关联</span><span ng-if="wbRel">已关联</span></li>\n                    </ul>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class="tab-pane" ng-class="{active: tabid == \'xd\'}" id="profile">\n            <div class="panel panel-default">\n              <div class="panel-body">\n                <div style="border-bottom:1px solid #E7E7E7;padding-bottom:20px;">\n                  <p style="float:right;padding-top:12px;"></p>\n                  <div style = "display: inline-block; width: auto;">我的积分: <span style = "font-size: 26px; font-weight: 500;color:#08a1ef;">{{xdCounts | fixnum}}</span>个&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span ng-click="openReg()" class="yaoqing" ng-show="sendXd.state"><em>邀请注册得积分</em></span></div>\n                </div>\n                <div class="xiudian clearfix">\n                  <div class="zhuansong"><img ng-click="openXd()" ng-src="{{CLIENT_CDN}}images/zengsong.png" title="转送积分" /></div>\n                  <div class="shiyong_xd">\n                    <ul class="clearfix">\n                      <li class="huode">获得积分<p>{{getXdStat.add | fixnum}}</p></li>\n                      <li class="song">转送积分<p>{{getXdStat.give | fixnum}}</p></li>\n                      <li class="shiyong">使用积分<p>{{getXdStat.pay | fixnum}}</p></li>\n                    </ul>\n                  </div>\n                </div>\n                <div class = "cols-sm-10 text-center" style = "margin-top: 30px;">\n                  <p style="text-align:left;padding-bottom:20px;">积分详情：</p>\n                  <table class = "table table-bordered col-sm-12 table-striped">\n                    <thead class = "text-center">\n                      <tr>\n                        <th class = "col-sm-2">类型</th>\n                        <th class = "col-sm-2">时间</th>\n                        <th class = "col-sm-2">数量</th>\n                        <th class = "col-sm-6">使用详情</th>\n                      </tr>\n                    </thead>\n                    <tbody>\n                      <tr ng-repeat = "xd in xdLogs" style = "text-valign:middle;">\n                        <td>{{xd.bizTitle}}</td>\n                        <td>{{xd.optTime | date:\'yyyy-MM-dd HH:mm:ss\'}}</td>\n                        <!-- <td>{{xd.bizType}}<a style = "height: 30px;" ng-href="{{VIEW_URL + \'v-\' + xd.sceneId}}">查看详情</a></td> -->\n                        <td>{{xd.xd | fixnum}}</td>\n                        <td>{{xd.remark}}</td>\n                      </tr>\n                    </tbody>\n                  </table>\n                  <div class="clearfix fl" ng-show = "xdLogs.length > 0">\n                        <pagination style="float: left" first-text="首页" last-text="尾页" previous-text="上一页" next-text="下一页" max-size="5" items-per-page="XdpageSize" total-items="XdCount" ng-click="XdpageChanged(XdcurrentPage)" ng-model="XdcurrentPage" boundary-links="true" rotate="true" num-pages="XdNumPages"></pagination>\n                        <div class="current_page">\n                            <input type="text" ng-model="XdcurrentPage" ng-keyup="$event.keyCode == 13 ? XdpageChanged(XdcurrentPage) : null">\n                            <a ng-click="XdpageChanged(XdcurrentPage)" class="go">GO</a>\n                            <span>当前: {{XdcurrentPage}} / {{XdNumPages}} 页</span>\n                        </div>\n                    </div>                                    \n                </div>\n              </div>\n            </div>\n          </div>\n          <div class="tab-pane" ng-class="{active: tabid == \'reset\'}" ng-if="!userinfo.noRel" id="profile">\n            <div class="panel panel-default">\n<!--               <div class="panel-heading">修改密码</div> -->\n              <div class="panel-body">\n                <div class="alert alert-danger" style="border:none;" role="alert" ng-show="authError">\n                  {{authError}}\n                </div>\n              <form class="form-horizontal" role="form" style = "margin-top: 25px;margin-left:220px;">\n                <div class="form-group" style="margin-bottom: 22px;">\n                  <label for="inputPassword3" class="col-sm-2 control-label">登录账号</label>\n                  <div class="col-sm-6" style="top: 6px;">{{userinfo.noRel || userinfo.loginName}}</div>\n                </div>\n                <div class="form-group">\n                    <label for="inputPassword3" class="col-sm-2 control-label">原始密码</label>\n                    <div class="col-sm-6">\n                      <input type="password" class="form-control" ng-model = "password.old" id="inputPassword3" placeholder="原始密码">\n                    </div>\n                  </div>\n                  <div class="form-group">\n                    <label for="inputPassword3" class="col-sm-2 control-label">新密码</label>\n                    <div class="col-sm-6">\n                      <input type="password" class="form-control" ng-model = "password.newPw" id="inputPassword3" placeholder="新密码">\n                    </div>\n                  </div>\n                  <div class="form-group">\n                    <label for="inputPassword3" class="col-sm-2 control-label">重复密码</label>\n                    <div class="col-sm-6">\n                      <input type="password" class="form-control" ng-model = "password.confirm" id="inputPassword3" placeholder="重复密码">\n                    </div>\n                  </div>\n                  <div class="form-group">\n                    <div class="col-sm-offset-2 col-sm-10" style="margin-top:14px;">\n                      <button type="button" class="btn-main" style="width:88px;" ng-click = "reset()">保存</button>\n                    </div>\n                  </div>\n                </form>\n              </div>\n            </div>\n          </div>\n          <div class="tab-pane" ng-class="{active: tabid == \'message\'}" id="profile" style = "background-color: #fff">\n            <div class="panel panel-default">\n              <div class="panel-body message-panel">\n                <div class="panel-heading" ng-show = "newMsgs.length > 0" style="padding-right:0px;">\n  <!--                 <span style = "float: left;">我的消息</span> -->\n                   <span style = "float: right;"><a style = "color: #08a1ef;" ng-click = "setRead(newMsgs)">全部设为已读</a></span>\n                </div>                \n                  <div class = "clearfix" style="border-bottom: 1px solid #F0F0F0;" ng-repeat = "newMsg in newMsgs">\n                    <div style="width:120px;float:left;" class = "mes_content mes_type" ng-class = "{new_msg: newMsg.status == 1,yidu_msg: newMsg.status == 2}"><span class = "glyphicon" ng-class = "{\'glyphicon-bullhorn\': newMsg.bizType==1,\'glyphicon-ban-circle\': newMsg.bizType==2, \'glyphicon-star-empty\': newMsg.bizType == 3}"></span> {{newMsg.type}}</div>\n                    <div class = "mes_content xiaoxi_con" ng-bind-html="newMsg.content">\n                    </div>\n                    <div class = "mes_content" style="width:165px;float:left;padding-right:0px;text-align:right;">{{newMsg.sendTime | date:\'yyyy-MM-dd HH:mm:ss\'}}</div>\n                  </div>\n                  <div ng-show = "newMsgs.length == 0">您暂时还没有消息！</div>\n                  <div class="clearfix fl" ng-show = "newMsgs.length > 0">\n                        <pagination style="float: left" first-text="首页" last-text="尾页" previous-text="上一页" next-text="下一页" max-size="5" items-per-page="pageSize" total-items="msgCount" ng-model="msgCurrentPage" boundary-links="true" rotate="true" num-pages="msgNumPages"></pagination>\n                        <div class="current_page">\n                            <input type="text" ng-model="toPage" ng-keyup="$event.keyCode == 13 ? pageChanged(toPage) : null">\n                            <a ng-click="pageChanged(toPage)" class="go">GO</a>\n                            <span>当前: {{msgCurrentPage}} / {{msgNumPages}} 页</span>\n                        </div>\n                    </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>')
            }
        ]), b.module("templates-common", ["directives/lineChart.tpl.html", "directives/mapeditor.tpl.html", "directives/page-tpl-types.tpl.html", "directives/pieChart.tpl.html", "directives/toolbar.tpl.html", "security/login/form.tpl.html", "security/login/reset.tpl.html", "security/login/toolbar.tpl.html", "security/register/otherregister.tpl.html", "security/register/register.tpl.html"]), b.module("directives/lineChart.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("directives/lineChart.tpl.html", '<canvas id="chart-area" width="300" height="300"/>')
            }
        ]), b.module("directives/mapeditor.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("directives/mapeditor.tpl.html", '\n\n<div class="col-lg-6">\n	<div class="input-group">\n	  <input type="text" class="form-control" ng-model="address" placeholder="请输入地名">\n	  <span class="input-group-btn">\n	    <button ng-click="searchAddress()" class="btn btn-default" type="button">搜索</button>\n	  </span>\n	</div><!-- /input-group -->\n</div><!-- /.col-lg-6 -->\n<div id="r-result"></div>')
            }
        ]), b.module("directives/page-tpl-types.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("directives/page-tpl-types.tpl.html", '<div class="btn-group" style="padding: 0;">\n    <div class="dropdown">\n        <a class="btn dropdown-toggle first-child" data-toggle="dropdown" title="页面模板" style=" color: #fff;">\n            页面模板\n            &nbsp;\n            <b class="caret">\n            </b>\n        </a>\n        <ul class="dropdown-menu size-menu">\n            <li ng-repeat="type in pageTplTypes">\n                <a ng-href="#/scene/create/{{type.value}}?pageId=1">\n                    {{type.name}}\n                </a>\n            </li>\n        </ul>\n    </div>\n</div>')
            }
        ]), b.module("directives/pieChart.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("directives/pieChart.tpl.html", '<canvas id="chart-area" width="300" height="300"/>')
            }
        ]), b.module("directives/toolbar.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("directives/toolbar.tpl.html", '<div class="btn-toolbar" id="btn-toolbar"  data-role="editor-toolbar">\n    <div class="btn-group">\n        <div class="dropdown">\n            <a class="btn dropdown-toggle first-child" data-toggle="dropdown" title="文字大小">\n                <i class="glyphicon glyphicon-text-width">\n                </i>\n                &nbsp;\n                <b class="caret">\n                </b>\n            </a>\n            <ul class="dropdown-menu size-menu">\n                <li>\n                    <a dropdown-toggle data-edit="fontSize 7">\n                        48px\n                    </a>\n                </li>\n                <li>\n                    <a dropdown-toggle data-edit="fontSize 6">\n                        32px\n                    </a>\n                </li>\n                <li>\n                    <a dropdown-toggle data-edit="fontSize 5">\n                        24px\n                    </a>\n                </li>\n                <li>\n                    <a dropdown-toggle data-edit="fontSize 4">\n                        18px\n                    </a>\n                </li>\n                <li>\n                    <a dropdown-toggle data-edit="fontSize 3">\n                        16px\n                    </a>\n                </li>\n                <li>\n                    <a dropdown-toggle data-edit="fontSize 2">\n                        13px\n                    </a>\n                </li>\n                <li>\n                    <a dropdown-toggle data-edit="fontSize 1">\n                        12px\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div class="btn-group">\n        <div class="dropdown">\n            <a class="btn dropdown-toggle" data-toggle="dropdown" title="文字颜色">\n                <i class="glyphicon glyphicon-font color-btn">\n                </i>\n                &nbsp;\n                <b class="caret">\n                </b>\n            </a>\n            <ul class="dropdown-menu color-menu">\n            </ul>\n        </div>\n    </div>\n    <div class="btn-group">\n        <div class="dropdown">\n            <a class="btn dropdown-toggle" data-toggle="dropdown" title="文字背景颜色">\n                <i class="glyphicon glyphicon-font bgcolor-btn">\n                </i>\n                &nbsp;\n                <b class="caret">\n                </b>\n            </a>\n            <ul class="dropdown-menu bgcolor-menu">\n            </ul>\n        </div>\n    </div>\n    <div class="btn-group">\n        <a class="btn" data-edit="bold" title="文字加粗">\n            <i class="glyphicon glyphicon-bold">\n            </i>\n        </a>\n    </div>\n    <div class="btn-group">\n        <a class="btn" data-edit="justifyleft" title="文字居左">\n            <i class="glyphicon glyphicon-align-left">\n            </i>\n        </a>\n        <a class="btn" data-edit="justifycenter" title="文字居中">\n            <i class="glyphicon glyphicon-align-center">\n            </i>\n        </a>\n        <a class="btn" data-edit="justifyright" title="文字居右">\n            <i class="glyphicon glyphicon-align-right">\n            </i>\n        </a>\n    </div>\n    <div class="btn-group">\n        <div class="dropdown">\n            <a class="btn dropdown-toggle createLink" data-toggle="dropdown" sceneid = "{{sceneId}}" title="先选中要加连接的文字"><i class="fa fa-link"></i></a>\n            <div class="dropdown-menu input-append" style="min-width: 335px;padding:4px 4px 14px 19px;">\n                <div class = "span4" style="margin-top:10px;">\n                    <input name = "external" ng-model = "link" class = "span2" type = "radio" value = "external" style="vertical-align:middle;margin:0px;"> 网站地址：\n                    <input class="span2" placeholder="URL" sceneid="{{sceneId}}" type="text" data-edit="createLink" value = "http://" style="border-radius:0px;width:200px;height:35px;" />\n                </div>\n                <!-- <input class="span2" placeholder="URL" sceneid="{{sceneId}}" type="text" data-edit="createLink" value="http://"/>   --> \n                <div class = "span4" style = "margin-top: 10px;">\n                     <input name = "internal" ng-model = "link" class = "span2" type = "radio" value = "internal" style="vertical-align:middle;margin:0px;"> 场景页面：\n                    <select class = "span2" style = "width: 200px;height:35px;" ng-options = "page.name for page in internalLinks" sceneid="{{sceneId}}" data-edit = "createLink" ng-model = "internalLink"></select> \n                </div>           \n                <div style="text-align:center"><a class="btn-main" style="color:#FFF; margin-top:20px;" dropdown-toggle>确定</a></div>\n            </div>\n        </div>        \n    </div>\n    <div class="btn-group">\n        <a class="btn" data-edit="unlink" title="清除超链接"><i class="fa fa-unlink"></i></a>\n    </div>\n    <div class="btn-group">\n        <a class="btn last-child" data-edit="RemoveFormat" title="清除样式">\n            <i class="fa fa-eraser">\n            </i>\n        </a>\n    </div>\n</div>')
            }
        ]), b.module("security/login/form.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("security/login/form.tpl.html", '<div class = "login-form-section">\n  <div class = "login-content">\n    <form class = "loginForm" novalidate ng-show = "showLogin && !sendPassword">\n      <div class = "section-title">\n        <h3>一秀用户登录</h3>\n      </div>\n      <div class="error-wrap">\n        <div class="alert alert-danger" role="alert" ng-show="authReason">\n            {{authReason}}\n        </div>\n        <div class="alert alert-danger" role="alert" ng-show="authError">\n            {{authError}}\n        </div>\n      </div>\n      <div class="textbox-wrap">\n        <div class="input-group">\n          <span class="input-group-addon "><i class="fa fa-envelope"></i></span>\n          <input class = "form-control" id = "username" name="userEmail" placeholder="帐号" type="text" ng-model="user.email" ng-keyup="$event.keyCode == 13 ? login() : null" required autofocus add-class/>\n        </div>\n      </div>\n      <div class="textbox-wrap">\n        <div class="input-group">\n          <span class="input-group-addon "><i class="fa fa-key"></i></span>\n          <input class = "form-control" name="pass" placeholder="密码" type="password" ng-model="user.password" ng-keyup="$event.keyCode == 13 ? login() : null" required add-class/>\n        </div>\n      </div>\n      <div class="textbox-wrap validate clearfix" ng-if="isValidateCodeLogin">\n        <div>\n          <script type="text/javascript" load-script ng-src="{{validateCodeUrl}}"></script>\n        </div>\n        <!-- <label class="input-label mid" for="validateCode">验证码</label>&nbsp;\n        <div class = "input-group" style = "display:inline-block;">\n          <input name="validateCode" id="validateCode" ng-model="user.validateCode" style="width: 100px; font-weight: bold; display: inline-block; height: 32px;" type="text" ng-keyup="$event.keyCode == 13 ? login() : null" add-class>\n        </div>&nbsp;\n        <img class="mid validateCode" onclick="$(\'.validateCodeRefresh\').click();" ng-src="{{validateCodeSrc}}">&nbsp;\n        <a class="mid validateCodeRefresh" onclick="$(\'.validateCode\').attr(\'src\', PREFIX_URL + \'servlet/validateCodeServlet?\'+new Date().getTime());" href="javascript:">看不清楚</a> -->\n      </div>\n      <div class="login-form-action clearfix">\n        <div class = "pull-left" style="display:none">\n          <!-- <a ng-click = "openRegister()"><ins>还没注册？</ins></a> -->\n          <input style="margin-top:0px;"  name="rememberMe" ng-model="user.rememberMe" type="checkbox" value="true" />&nbsp;记住密码\n        </div>\n        <div class = "pull-right">\n          <!-- <a ng-click = "showLogin = false;"><ins>忘记密码?</ins></a>\n          <a ng-click = "rotate(showLogin)"><ins>忘记密码？</ins></a> -->\n        </div>\n      </div>\n      <!-- <div class="forget login-form-action"><input style="margin-top:0px;"  name="rememberMe" ng-model="user.rememberMe" type="checkbox" value="true" />&nbsp;记住密码</div> -->\n      <div class="login-form-action clearfix">\n        <button type="button" class="btn btn-success pull-left blue-btn" ng-click="login()">登录</button>\n        <button type="button" class="btn btn-success pull-right reset-btn" ng-click="openRegister()">注册</button>\n    <!--<button type="button" class="btn btn-success pull-right reset-btn" ng-click="openRegister()">注册</button>\n-->   </div>\n      <div class="login-form-action clearfix third-party" style="line-height:30px;display:none;">\n        <span>第三方账号登录</span>\n        <a ng-href="{{weiChatUrl}}" class="wx_login"><span class="wx_title"></span></a>\n        <a ng-href="{{qqUrl}}" class="qq_login"><span class="qq_title"></span></a>\n        <!-- <a ng-href="{{weiboUrl}}" class="weibo_login"><span class="weibo_title"></span></a> -->\n      </div>\n    </form>\n    <form class = "retrieveForm" ng-show = "!showLogin && !sendPassword" novalidate>\n      <div class = "section-title">\n        <h3>找回密码</h3>\n      </div>\n      <div class="error-wrap">\n        <div class="alert alert-danger" role="alert" ng-show="retrieveError">\n            {{retrieveError}}\n        </div>\n      </div>\n      <div class="textbox-wrap">\n        <div class="input-group">\n          <span class="input-group-addon "><i class="fa fa-envelope"></i></span>\n          <input class = "form-control" id = "retrieveUsername" name="userEmail" placeholder="邮箱 " type="text" ng-model="retrieve.email" ng-keyup="$event.keyCode == 13 ? retrievePassword() : null" required autofocus add-class/>\n        </div>\n      </div>\n      <!-- <div class="textbox-wrap validate">\n        <label class="input-label mid" for="validateCode">验证码</label>&nbsp;\n        <div class = "input-group" style = "display:inline-block;">\n          <input name="validateCode" id="retrieveretrieveValidateCode" ng-model="retrieveretrieve.validateCode" style="width: 100px; font-weight: bold; display: inline-block; height: 32px;" type="text" ng-keyup="$event.keyCode == 13 ? retrieveretrievePassword() : null" add-class>\n        </div>&nbsp;\n        <img class="mid validateCode" onclick="$(\'.validateCodeRefresh\').click();" ng-src="{{validateCodeSrc}}">&nbsp;\n        <a class="mid validateCodeRefresh" onclick="$(\'.validateCode\').attr(\'src\', PREFIX_URL + \'servlet/validateCodeServlet?\'+new Date().getTime());" href="javascript:">看不清楚</a>\n      </div> -->\n      <div class="login-form-action clearfix">\n        <div>\n          <script type="text/javascript" load-script ng-src="{{validateCodeUrl}}"></script>\n        </div>\n        <div class = "pull-right" style = "padding-top: 5px;">\n          <a ng-click = "rotate(showLogin)"><ins>我想起来了</ins></a>\n        </div>\n      </div>\n      <div class="login-form-action clearfix">\n        <button type="button" class="btn btn-success pull-left blue-btn" ng-click="retrievePassword()">找回密码</button>\n        <button type="button" class="btn btn-success pull-right reset-btn" ng-click="reset()">重置</button>\n      </div>\n    </form>\n    <div ng-show = "sendPassword" class = "section-title text-center">\n        <h3>恭喜你，找回密码成功。</h3>\n    </div>\n    <div class = "send_email" ng-show = "sendPassword">\n      重置密码的链接已发送到你的 {{retrieve.email}}邮箱，登录邮箱重置密码吧！\n    </div>\n    <div class = "login-form-tip" ng-show = "!sendPassword && !unExist">\n      <h6>为了获得更好的使用，建议使用谷歌浏览器（chrome）、360浏览器、IE11浏览器。</h6>\n    </div>\n  </div>\n</div>')
            }
        ]), b.module("security/login/reset.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("security/login/reset.tpl.html", '<!-- <div class="modal-header">\n    <span class="glyphicon glyphicon-exclamation-sign"></span>\n    <span>修改密码</span>\n</div>\n<form name="resetForm" novalidate class="login-form">\n    <div class="login_form">\n        <div class="alert alert-warning" role="alert" ng-show="authReason">\n            {{authReason}}\n        </div>\n        <div class="alert alert-danger" role="alert" ng-show="authError">\n            {{authError}}\n        </div>\n        <div class="input-wrap">\n            <input name="oldPassword" placeholder="旧密码 " type="password" ng-model="password.old" required autofocus>            \n        </div>\n        \n        <div class="input-wrap">\n            <input name="newPassword" placeholder="新密码" type="password" ng-model="password.newPw" required equals="{{password.confirm}}">\n        </div>\n\n        <div class="input-wrap">\n            <input name="confirmPassword" placeholder="重复密码" type="password" ng-model="password.confirm" required equals="{{password.newPw}}">\n        </div>\n        <div class="modal-footer">\n            <div class="btn-main" ng-click="reset()" ng-disabled=\'form.$invalid\'>确&nbsp;&nbsp;定</div>\n            <div class="btn-grey0" ng-click="cancel()" ng-disabled=\'form.$invalid\'>取&nbsp;&nbsp;消</div>\n        </div>\n    </div>\n</form>\n -->\n<div class = "login-form-section">\n  <div class = "login-content">\n    <form class = "loginForm" novalidate>\n      <div class = "section-title">\n        <h3>重设密码</h3>\n      </div>\n      <div class="error-wrap">\n        <div class="alert alert-danger" role="alert" ng-show="authReason">\n            {{authReason}}\n        </div>\n        <div class="alert alert-danger" role="alert" ng-show="authError">\n            {{authError}}\n        </div>\n      </div>\n      <div class="textbox-wrap">\n        <div class="input-group">\n          <span class="input-group-addon "><i class="fa fa-key"></i></span>\n          <input class = "form-control" name="pass" placeholder="新密码" type="password" ng-model="password.newPw" ng-keyup="$event.keyCode == 13 ? reset() : null" required add-class/>\n        </div>\n      </div>\n      <div class="textbox-wrap">\n        <div class="input-group">\n          <span class="input-group-addon "><i class="fa fa-key"></i></span>\n          <input class = "form-control" name="confirmPassword" placeholder="确认密码" type="password" ng-model="password.confirm" ng-keyup="$event.keyCode == 13 ? reset() : null" required add-class/>\n        </div>\n      </div>\n      <div class="login-form-action clearfix">\n        <button type="button" class="btn btn-success pull-left blue-btn" ng-click="reset()">确认</button>\n        <button type="button" class="btn btn-success pull-right reset-btn" ng-click="cancel()">取消</button>\n      </div>\n    </form>\n    <div class = "login-form-tip">\n      <h6>为了获得更好的使用，建议使用谷歌浏览器（chrome）、360浏览器、IE11浏览器。</h6>\n    </div>\n  </div>\n</div>')
            }
        ]), b.module("security/login/toolbar.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("security/login/toolbar.tpl.html", '<ul class="nav pull-right" style="margin-right:0px;display:none;"><!-- \n    <li class="divider-vertical" ng-click="goCats =!goCats" ></li> -->\n    <li class="" style="width:150px;margin-top:-2px;cursor:pointer;" ng-show="sendXd.state"></li>\n    <li class="mes_con dropdown-toggle">\n        <a class = "mes_content" style ="position: relative;" href="" title="消息中心"  data-toggle = "dropdown" ng-click = "openMsgPanel()">消息中心      \n        </a>\n        <span class = "mes_count" ng-if = "newMsgCount">{{newMsgCount}}</span>\n        <div class="dropdown-menu msg_pannel" role="menu" forbidden-close>\n            <div class = "clearfix">\n                <div class = "panel_title pull-left">\n                您有<span class = "mes_new">{{count}}</span>新消息\n            </div>\n            <div class = "panel_title text-right" style = "margin-left:0px;">\n                <a ng-click = "setRead()" ng-if = "false">设为已读消息</a>\n            </div>\n            </div>\n            <div class = "panel_content head_list_newMsg" ng-class = "{content_status_new: newMsg.status == 1,content_status_yidu: newMsg.status == 2}" ng-repeat = "newMsg in newMsgs"><a href="#/usercenter/message" ng-bind-html="newMsg.content"></a></div>\n            <div class = "panel_more text-center">\n                <a href="#/usercenter/message">查看全部消息 >></a>\n            </div>\n        </div>\n    </li>\n    <!-- <li class="mes_con">\n        <div style="height:200px;" class="head_hover">\n            <div class="vip_c"><span style="text-align:center;"><img ng-src="{{headImg ||(PREFIX_FILE_HOST + currentUser.headImg)}}" style = "width: 30px; height: 30px;"/></span><span class="vip_po" style = "top:0px;" ng-show = "isVendorUser"></span></div>\n        </div>\n    </li> -->\n    <li ng-show="isAuthenticated()" class="custom_img">\n        <div style="height:200px;" class="head_hover" ng-mouseover="showCode = true" ng-mouseleave="showCode = false"><!-- <span>{{currentUser.loginName}}</span> -->\n            <div class="vip_c"><span style="text-align:right;"><img ng-src="{{headImg ||(PREFIX_FILE_HOST + currentUser.headImg)}}" style = "width: 30px; height: 30px;"/></span><span class="vip_po" style = "top:0px;" ng-show = "isVendorUser"></span></div>\n            <div class="head_click" style="z-index:10000;" ng-show="showCode == true"> \n                <div><a href = "#/usercenter/userinfo">用户中心</a></div>\n                <div><a href = "#/usercenter/xd">我的积分</a></div>\n                <div><a href = "#/usercenter/reset">修改密码</a></div>\n                <div><a ng-click="logout()">退出</a></div> \n            </div>\n        </div>\n    </li>\n</ul>  ')
            }
        ]), b.module("security/register/otherregister.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("security/register/otherregister.tpl.html", '<form name="formName" novalidate class="login-form">\n    <div class = "text-center">\n        <div style = "position: relative; top: 0px; font-size: 15px;">第三方账号已授权</div>\n        <div style = "margin-top: 15px;">欢迎您&nbsp;<code>{{otherUserInfo.nickname}}</code>&nbsp;<img ng-src = "{{otherUserInfo.figureUrl}}"/>，完善以下信息，就可以使用我们的服务!</div>\n    </div>\n    <div class="login_form">\n        <div class="alert alert-danger" role="alert" ng-show="regErr">\n            {{regErr}}\n        </div>\n\n        <div class="input-wrap">\n            <input name="userEmail" placeholder="邮箱 " type="email" ng-model="user.email" ng-keyup="$event.keyCode == 13 ? fullfil() : null"  required autofocus>       \n        </div>\n        \n        <div class="input-wrap">\n            <input name="pass" placeholder="密码" type="password" ng-model="user.password" ng-keyup="$event.keyCode == 13 ? fullfil() : null" required>\n        </div>\n\n        <div class="input-wrap">\n            <input name="repeatPass" placeholder="确认密码" type="password" ng-model="user.repeatPassword" ng-keyup="$event.keyCode == 13 ? fullfil() : null" required>\n        </div>\n\n        <div class="checkbox">\n          <label>\n            <input type="checkbox" ng-model = "user.agreement"> 我已阅读并同意<a href="#/agreement" target = "_blank">《一秀用户注册协议》</a>\n          </label>\n        </div>\n\n        <div class="login-btn btn-main" ng-click="fullfil()" ng-disabled=\'form.$invalid\'>完&nbsp;&nbsp;善</div>\n        \n    </div>\n</form>\n    \n')
            }
        ]), b.module("security/register/register.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("security/register/register.tpl.html", '<div class = "login-form-section">\n  <div class = "login-content">\n    <form novalidate>\n      <div class = "section-title">\n        <h3>注册</h3>\n      </div>\n      <div class="error-wrap">\n        <div class="alert alert-danger" role="alert" ng-show="regErr">\n            {{regErr}}\n        </div>\n      </div>\n      <div class="textbox-wrap">\n        <div class="input-group">\n          <span class="input-group-addon "><i class="fa fa-user"></i></span>\n          <input class = "form-control" id = "username1" name="userEmail" placeholder="邮箱 " type="text" ng-model="user.email" ng-keyup="$event.keyCode == 13 ? register() : null" ng-blur="checkUpperCase();" required autofocus add-class/>\n        </div>\n      </div>\n      <div class="textbox-wrap">\n        <div class="input-group">\n          <span class="input-group-addon "><i class="fa fa-key"></i></span>\n          <input class = "form-control" name="pass" placeholder="密码" type="password" ng-model="user.password" ng-keyup="$event.keyCode == 13 ? register() : null" required add-class/>\n        </div>\n      </div>\n      <div class="textbox-wrap">\n        <div class="input-group">\n          <span class="input-group-addon "><i class="fa fa-key"></i></span>\n          <input class = "form-control" name="repeatPass" placeholder="确认密码" type="password" ng-model="user.repeatPassword" ng-keyup="$event.keyCode == 13 ? register() : null" required add-class/>\n        </div>\n      </div>\n      <div class="login-form-action clearfix">\n        <div class="checkbox pull-left">\n          <div class="custom-checkbox">\n            <div class="icheckbox_square-blue" ng-class = "{checked: user.agreement == true, hover: user.agreement == false && hovered == true}" style="position: relative;"><input type="checkbox" ng-mouseenter = "hovered = true;" ng-mouseleave = "hovered = false;" ng-model = "user.agreement" name="iCheck" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"><!-- <ins class="iCheck-helper" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins> --></div>\n          </div>\n          <span class="checkbox-text pull-left">&nbsp;我已阅读并同意<a href="#/agreement" target = "_blank">《一秀用户注册协议》</a></span>\n        </div>\n        <div class = "checkbox pull-right">\n          <a ng-click = "openLogin()"><ins>已有账户?</ins></a>\n        </div>\n      </div>\n      <div class = "login-form-action clearfix">\n        <button type="submit" ng-click="register()" class="btn btn-success pull-left blue-btn">注册</button>\n        <button type="button" ng-click="openLogin()" class="btn btn-success pull-right reset-btn">登录</button>\n      </div>\n      <div ng-show="false" class="login-form-action clearfix third-party" style="line-height:30px;">\n        <span>第三方账号登录</span>\n        <a ng-href="{{weiChatUrl}}" class="wx_login"><span class="wx_title"></span></a>\n        <a href="{{qqUrl}}" class="qq_login"><span class="qq_title"></span></a>\n        <!-- <a ng-href="{{weiboUrl}}" class="weibo_login"><span class="weibo_title"></span></a> -->\n      </div>\n      <div class = "login-form-tip">\n        <h6>为了获得更好的使用，建议使用谷歌浏览器（chrome）、360浏览器、IE11浏览器。</h6>\n      </div>\n    </form>\n  </div>\n</div>')
            }
        ])
}(window, window.angular);