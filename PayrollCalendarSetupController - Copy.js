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
                //var sqlQuery = "select *  from GeneralLedger_State";
                var req = new sql.Request(conn);
                req.input("p_mode", sql.NVarChar, 'create')
                req.execute("Administrator_CompanyProfile_operation").then(function (recordset) {
                    console.log("test");
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
					request.input("p_mode", sql.VarChar,req.body.p_mode)
                    request.input("pRowId", sql.BigInt,req.body.RowId)
                    request.input("pCalendarCd", sql.VarChar,req.body.calendarcode)
                    request.input("pCoCd", sql.VarChar,req.body.CoCd)
                    request.input("pCalendarDesc", sql.VarChar,req.body.calendardesc)
                    request.input("pWTId", sql.BigInt,req.body.wts)
                    request.input("pIsBlock", sql.VarChar,req.body.IsBlock)
                    request.input("pcreated_by", sql.VarChar,req.body.created_by)
                    request.input("pcreater_MAC_add", sql.VarChar,req.body.creater_MAC_add)
                    
                 
                
                    
                  
                    request.execute("Payroll_CalendarSetup_Operation").then(function (recordset) {
                        transaction.commit().then(function (recordSet1) {
                            
                            console.log(recordset);
                            res.json(recordset.recordset);
                            conn.close();
                            //res.status(200).send(req.body);
                        }).catch(function (err) {
                            console.log(err.message);
                            conn.close();
                            res.status(400).send(err.message);
                        });
                    }).catch(function (err) {
                        conn.close();
                        console.log(err.message);
                        res.status(400).send(err.message);
                    });
                }).catch(function (err) {
                    conn.close();
                    console.log(err.message);
                    res.status(400).send(err.message);
                });
            }).catch(function (err) {
                conn.close();
                console.log(err.message);
                res.status(400).send(err.message);
            });
        });

     
  
    return router;
};
module.exports = routes;