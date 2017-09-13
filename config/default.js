module.exports = {
    server: {
        "port": 3001
    },
    cacheConfig: {
        "viewCache": false
    },
    manifest: {
        "css": "public/rev/manifest-css.json",
        "js": "public/rev/manifest-js.json",
        "cssDir": "/css",
        "jsDir": "/js"
    },
    host: {
        "portal_dev": "",
        "portal_pro": ""
    },
    wxApi: {
        //小程序
        "host": "https://api.weixin.qq.com",
        "appid": "",
        "secret": "",
    },
    opay: {
        "host": "",
        "path": ""
    }

};
