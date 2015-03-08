$(function () {
    RegExp.escape = function (s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var textareaDnsmasqRule = $("#textarea-dnsmasq-rule");
    var textareaDnsagentRule = $("#textarea-dnsagent-rule");
    $("#btn-clear").click(function() {
        textareaDnsmasqRule.val("");
    });
    $("#btn-select-results").click(function() {
        textareaDnsagentRule.focus();
        textareaDnsagentRule.select();
    });
    $("#btn-convert").click(function() {
        var resultRules = [];
        var regexServer = new RegExp("^server=/(.*)/(.*)$", "i");
        var regexAddress = new RegExp("^address=/(.*)/(.*)$", "i");
        var lines = textareaDnsmasqRule.val().split("\n");
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (line.length === 0)
                continue;
            if (line.charAt(0) === "#")
                continue;
            var result = regexServer.exec(line);
            if (result !== null) {
                resultRules.push({
                    "Pattern": "^(.*\\.)?" + RegExp.escape(result[1]) + "$",
                    "NameServer": result[2]
                });
            }
            result = regexAddress.exec(line);
            if (result !== null) {
                resultRules.push({
                    "Pattern": "^(.*\\.)?" + RegExp.escape(result[1]) + "$",
                    "Address": result[2]
                });
            }
        }
        textareaDnsagentRule.val(JSON.stringify(resultRules, null, 4));
    });
});