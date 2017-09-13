const fs             = require('fs');
const path           = require('path');
const config         = require("config");
const _path          = path.resolve(process.cwd());
const manifestCss    = fs.readFileSync(path.join(_path, config.manifest.css));
const manifestJs     = fs.readFileSync(path.join(_path, config.manifest.js));
const env            = process.env.NODE_ENV;
const manifestCssObj = JSON.parse(manifestCss);
const manifestJsObj  = JSON.parse(manifestJs);


//dust模板工具
module.exports = {
    tagcss: function(chunk, context, bodies, params) {
        if (env == "development") {
            chunk.write(path.join(config.manifest.cssDir, params.name));
        } else {
            chunk.write(path.join(config.manifest.cssDir, manifestCssObj[params.name]));
        }
    },
    tagjs: function(chunk, context, bodies, params) {
        if (env == "development") {
            chunk.write(path.join(config.manifest.jsDir, params.name));
        } else {
            let curDir = manifestJsObj[params.name].split('');
            let dotIndex = curDir.indexOf(".");
            curDir.splice(dotIndex, 0, '-min');
            chunk.write(path.join(config.manifest.jsDir, curDir.join("")));
        }
    },
    //格式化时间，只显示日期
    cutTime: function(chunk, context, bodies, params) {
        let value = params.value;
        let timeDay = value.split(" ");
        chunk.write(timeDay[0]);
    },
    //内容匹配
    ifString: function(chunk, context, bodies, params) {
        if (params.key == params.value) {
            chunk.write(params.if);
        } else {
            chunk.write(params.else);
        }
    }

};
