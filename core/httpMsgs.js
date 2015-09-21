var settings = require("../settings");

exports.show500 = function (req, resp, err) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(500, "Internal Error occured", { "Content-Type": "text/html" });
        resp.write("<html><head><title>500</title></head><body>500: Internal Error. Details: " + err + "</body></html>");
    }
    else {
        resp.writeHead(500, "Internal Error occured", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "ERROR occured:" + err }));     
    }
    resp.end();
};

exports.sendJson = function (req, resp, data){
    resp.writeHead(200, { "Content-Type" : "application/json" });
    if (data) {
        resp.write(JSON.stringify(data));
    }
    resp.end();
}

exports.show405 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(405, "Internal Error occured", { "Content-Type": "text/html" });
        resp.write("<html><head><title>405</title></head><body>405: Method not supported </body></html>");
    }
    else {
        resp.writeHead(405, "Method not supported", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Method not supported"}));
    }
    resp.end();
};

exports.show404 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(404, "Resource not found", { "Content-Type": "text/html" });
        resp.write("<html><head><title>404</title></head><body>404: Resource not found </body></html>");
    }
    else {
        resp.writeHead(404, "Resource not found", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Resource not found" }));
    }
    resp.end();
};


exports.show404 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(413, "Request Entity Too Large", { "Content-Type": "text/html" });
        resp.write("<html><head><title>413</title></head><body>413: Request Entity Too Large </body></html>");
    }
    else {
        resp.writeHead(413, "Request Entity Too Large", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Request Entity Too Large" }));
    }
    resp.end();
};


exports.send200 = function (req, resp) {
  
    resp.writeHead(200, { "Content-Type": "application/json" });
    resp.end();
};

exports.showHome = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.write("<html><head><title>404</title></head><body>Valid endpoints: <br> /stores - GET - To List all Stores<br>/stores/storeno - GET - To search for an StoreNo with 'storeno'</body></html>");
    }
    else {
        resp.writeHead(404, { "Content-Type": "application/json" });
        resp.write(JSON.stringify([
            { url: "/stores", operation : "GET", description: "To List all Stores" },
            { url: "/stores/id", operation : "GET", description: "To search for an store" }
        ]));
    }
    resp.end();

};