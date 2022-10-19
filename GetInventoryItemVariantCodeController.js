var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("../connection/connect")();
function setConn(x){
    conn=require("../connection/" + x)();
}
var routes = function () {
    router.route('/')
        .get(function (req, res) {
            conn.connect().then(function () {
                var sqlQuery = "select top 1 *  from GeneralLedger_State";
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function (recordset) {
                    res.json(recordset.recordset);
                    conn.close();
                })
                    .catch(function (err) {
                        conn.close();
                        res.status(400).send(err.message);
                    });
            })
                .catch(function (err) {
                    conn.close();
                    res.status(400).send(err.message);
                });
        });

    router.route('/')
        .post(function (req, res) {
            
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("CoCd", sql.VarChar, req.body.CoCd)
                    request.input("ItemRowId", sql.BigInt, req.body.ItemRowId)
                    request.execute("getInventoryItemVariant").then(function (recordset) {
                        transaction.commit().then(function (recordSet1) {
                             console.log(recordset);
                            res.json(recordset.recordset);
                            conn.close();
                            //res.status(200).send(req.body);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send(err.message);
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send(err.message);
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send(err.message);
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send(err.message);
            });
        });

     
  
    return router;
};
module.exports = routes;