var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

exports.getList = function (req, resp) {
    db.executeSql("SELECT * FROM Stores", function (data, err) {
        if (err) {
            
            httpMsgs.show500(req, resp, err);            
         
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }
       
    });
 };

exports.get = function (req, resp, storeID) {
    db.executeSql("SELECT * FROM Stores WHERE StoreID=" + storeID, function (data, err) {
        if (err) {
            
            httpMsgs.show500(req, resp, err);
         
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }
       
    });
};

exports.add = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "INSERT INTO Stores(Name, Location) VALUES";
            sql += util.format("('%s', '%s')", data.Name, data.Location);
            db.executeSql(sql, function (data, err) {
                if (err) {
                    
                    httpMsgs.show500(req, resp, err);
         
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
                throw new Error("Input not valid")
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

exports.update = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            
            if (!data.StoreID) throw new Error("StoreID not provided");
            var sql = "UPDATE Stores SET";
            
            var isDataProvided = false;
            
            if (data.Name) {
                sql += " Name = '" + data.Name + "',";
                isDataProvided = true; 
            }
            if (data.Location) {
                sql += " Location = '" + data.Location + "',";
                isDataProvided = true;
            }
            
            sql = sql.slice(0, -1);

            sql += " WHERE StoreID = " + data.StoreID
            console.log(sql);
           
            db.executeSql(sql, function (data, err) {
                if (err) {
                    
                    httpMsgs.show500(req, resp, err);
         
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid")
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

exports.delete = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            
            if (!data.StoreID) throw new Error("StoreID not provided");
            var sql = "DELETE FROM Stores";
            var isDataProvided = false;
          
            
            
            sql += " WHERE StoreID = " + data.StoreID
            db.executeSql(sql, function (data, err) {
                if (err) {
                    
                    httpMsgs.show500(req, resp, err);
         
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid")
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};