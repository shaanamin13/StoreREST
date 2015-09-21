var http = require("http");
var store = require("../controllers/store");
var settings = require("../settings");
var httpMsgs = require("./httpMsgs");


http.createServer(function (req, resp) {
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                httpMsgs.showHome(req, resp);
                resp.end();
            }
            else if (req.url === "/stores") {
                store.getList(req, resp);
            }
            else {
                var storeNoPatt = "[0-9]+";
                var pattern = new RegExp("/stores/" + storeNoPatt);
                
                if (pattern.test(req.url)) {
                    pattern = new RegExp(storeNoPatt);
                    var storeNo = pattern.exec(req.url);
                    store.get(req, resp, storeNo);
                }

                else {
                    httpMsgs.show404(req, resp);
                }
            }
            
            break;
        case "POST":
            if (req.url === "/stores/add") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) //10MB
                    {
                        httpMsgs.show413(req, resp);
                    }

                });
                req.on("end", function () {
                    store.add(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp)
            }
            
            break;
        case "PUT":
            if (req.url === "/stores/update") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) //10MB
                    {
                        httpMsgs.show413(req, resp);
                    }

                });
                req.on("end", function () {
                    store.update(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp)
            }
            break;
        case "DELETE":
            if (req.url === "/stores/delete") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) //10MB
                    {
                        httpMsgs.show413(req, resp);
                    }

                });
                req.on("end", function () {
                    store.delete(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp)
            }
            break;
    }
}).listen(settings.webPort, function () {
    console.log("Started listening at:" + settings.webPort);
});