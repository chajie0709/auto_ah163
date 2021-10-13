var e = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

module.exports = {
    formatTime: function(t) {
        var r = t.getFullYear(), n = t.getMonth() + 1, a = t.getDate(), o = t.getHours(), u = t.getMinutes(), s = t.getSeconds();
        return [ r, n, a ].map(e).join("-") + " " + [ o, u, s ].map(e).join(":");
    },
    formatYm: function(t) {
        return [ t.getFullYear(), t.getMonth() + 1 ].map(e).join("");
    },
    formatGMT: function(e) {
        if (null == e || "" == e) return "";
        var t = e.split(" "), r = t[0] + " " + t[1] + " " + t[2] + " " + t[5] + " " + t[3] + " GMT+0800", n = new Date(Date.parse(r)), a = n.getFullYear(), o = n.getMonth() + 1;
        o = o < 10 ? "0" + o : o;
        var u = n.getDate();
        u = u < 10 ? "0" + u : u;
        var s = n.getHours(), i = n.getMinutes();
        i = i < 10 ? "0" + i : i;
        var c = n.getSeconds();
        return a + "-" + o + "-" + u + " " + s + ":" + i + ":" + (c = c < 10 ? "0" + c : c);
    },
    formatDay: function(e) {
        var t = e.getDate();
        return console.info("formatDay:-------------" + t), t;
    },
    formatLastMonth: function(t) {
        var r = t.getFullYear(), n = t.getMonth();
        return 0 == n && (r -= 1, n = 12), [ r, n ].map(e).join("-");
    },
    formatTimeYMD: function(t) {
        var r = t.getFullYear(), n = t.getMonth() + 1, a = t.getDate();
        t.getHours(), t.getMinutes(), t.getSeconds();
        return [ r, n, a ].map(e).join("") + "";
    }
};

var t = require("./aes.js"), r = t.enc.Utf8.parse("hbdxWxSmall96548"), n = t.enc.Utf8.parse("6606136474185246");

var a = function(e) {
    return null == e || (null == e || ("" == e || 0 == e.length));
};

module.exports.Decrypt = function(e) {
    var a = t.enc.Hex.parse(e), o = t.enc.Base64.stringify(a);
    return t.AES.decrypt(o, r, {
        iv: n,
        mode: t.mode.CBC,
        padding: t.pad.Pkcs7
    }).toString(t.enc.Utf8).toString();
}, module.exports.Encrypt = function(e) {
    var a = t.enc.Utf8.parse(e);
    return t.AES.encrypt(a, r, {
        iv: n,
        mode: t.mode.CBC,
        padding: t.pad.Pkcs7
    }).ciphertext.toString();
}, module.exports.strIsNull = a, module.exports.storeExp = function(e) {
    try {
        var t = Date.parse(new Date()) + 60 * e * 1e3;
        wx.setStorageSync("small:hb:telecom:token:keys:exp", t);
    } catch (e) {}
}, module.exports.getExpDate = function() {
    try {
        var e = Date.parse(new Date()), t = wx.getStorageSync("small:hb:telecom:token:keys:exp");
        if (a(t) || e > t) return !0;
    } catch (e) {}
    return !1;
};