module.exports = {
    "/ReservaHotelesMs/*": {
        "target": "http://localhost:8080/ReservaHotelesMs",
        "secure": false,
        "logLevel": "debug",
        "pathRewrite": {
            "^/ReservaHotelesMs/": ""
        }
    }
}