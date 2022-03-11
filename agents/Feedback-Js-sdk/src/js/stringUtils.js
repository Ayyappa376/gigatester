let GigaTester_StringUtils = {
    escapeSpecialChars: function(str, nl2br) {
        let text = String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
        if (nl2br) {
            text = text.replace(/(?:\r\n|\r|\n)/g, "<br>")
        }
        return text
    },
};

module.exports = GigaTester_StringUtils;