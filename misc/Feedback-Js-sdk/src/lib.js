let Lib = {
    length: function(obj) {
        var size = 0;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) size++
        }
        return size
    },
    htmlEntities: function(str, nl2br) {
        var text = String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
        if (nl2br) {
            text = text.replace(/(?:\r\n|\r|\n)/g, "<br>")
        }
        return text
    },
    htmlEntitiesWithA: function(str, nl2br) {
        var text = String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        text = text.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4" target="_blank">$1</a>');
        if (nl2br) {
            text = text.replace(/(?:\r\n|\r|\n)/g, "<br>")
        }
        return text
    },
    escapeRegExp: function(string) {
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
        var reHasRegExpChar = RegExp(reRegExpChar.source);
        return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string || ""
    },
    getQueryString: function(key) {
        var search = window.location.search.replace(/^\?/, "").split("&");
        var query_string = {};
        $.each(search, function(index, parameter) {
            parameter = parameter.split("=");
            if (parameter.length === 2 && query_string[parameter[0]] === undefined) {
                query_string[parameter[0]] = decodeURIComponent(parameter[1])
            }
        });
        if (key) {
            return query_string[key]
        } else {
            return query_string
        }
    },
    b64EncodeUnicode: function(str) {
        str = Lib.replaceUnpairedSurrogates(str);
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
            return String.fromCharCode("0x" + p1)
        }))
    },
    replaceUnpairedSurrogates: function(str) {
        return str.replace(/[\uD800-\uDBFF]+([^\uDC00-\uDFFF]|$)/g, "ï¿½$1").replace(/(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]+/g, "$1ï¿½")
    },
    baseName: function(path) {
        var path_array = path.split("/");
        return path_array[path_array.length - 1]
    },
    fileExtension: function(path) {
        var base_name = this.baseName(path);
        var base_name_array = base_name.split(".");
        if (base_name_array.length >= 2) {
            return base_name_array[base_name_array.length - 1]
        } else {
            return false
        }
    },
    getImageSize: function(image_src, callback, context) {
        var image = new Image;
        image.onload = function() {
            callback.call(context, image.width, image.height)
        };
        image.src = image_src
    },
    resizeImage: function(image_data_uri, width, image_format, callback, context) {
        var canvas = document.createElement("canvas");
        if (!canvas.getContext || !canvas.getContext("2d")) {
            return image_data_uri
        }
        var ctx = canvas.getContext("2d");
        var image = new Image;
        image.onload = function() {
            var image_ratio = image.width / image.height;
            image_format = image_format || "image/png";
            canvas.width = width;
            canvas.height = width / image_ratio;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            callback.call(context, canvas.toDataURL(image_format, 1))
        };
        image.src = image_data_uri
        console.log(image_data_uri, 'img')
    },
    storage: {
        key: "ubwc",
        hasLocalStroage: function() {
            try {
                localStorage.setItem("test", 1);
                localStorage.removeItem("test");
                return true
            } catch (e) {
                return false
            }
        },
        set: function(key, value) {
            if (!Lib.storage.hasLocalStroage()) {
                return
            }
            var items = localStorage.getItem(Lib.storage.key);
            if (items) {
                try {
                    items = JSON.parse(items)
                } catch (e) {
                    items = {}
                }
                items[key] = value
            } else {
                items = {};
                items[key] = value
            }
            localStorage.setItem(Lib.storage.key, JSON.stringify(items))
        },
        get: function(key) {
            if (!Lib.storage.hasLocalStroage()) {
                return null
            }
            var items = localStorage.getItem(Lib.storage.key);
            if (items) {
                try {
                    items = JSON.parse(items);
                    return items[key] === undefined ? null : items[key]
                } catch (e) {}
            }
            return null
        },
        remove: function(key) {
            if (!Lib.storage.hasLocalStroage()) {
                return
            }
            var items = localStorage.getItem(Lib.storage.key);
            if (items) {
                try {
                    items = JSON.parse(items);
                    delete items[key];
                    localStorage.setItem(Lib.storage.key, JSON.stringify(items))
                } catch (e) {}
            }
        }
    }
};

export default Lib;