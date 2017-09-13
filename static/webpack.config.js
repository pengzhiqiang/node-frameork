var path = require("path");
var fs = require("fs");
module.exports = {
    entry: getEntry(),
    output: {
        filename: '[name].js'
    }
};

function getEntry() {
    var jsPath = "./js";
    var dirs = fs.readdirSync(jsPath);
    var matchs = [],
        files = {};
    dirs.forEach(function(item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = "./js/" + item;
        }
    });
    return files;
}
