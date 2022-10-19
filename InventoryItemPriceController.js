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
                    request.input("RowId", sql.BigInt,req.body.RowId)
                    request.input("priceType", sql.VarChar,req.body.priceType)
                    request.input("CoCd", sql.VarChar,req.body.CoCd)
                    request.input("ItemId", sql.BigInt,req.body.ItemId)
                    request.input("variantCode", sql.BigInt,req.body.variantCode)
                    request.input("location", sql.BigInt,req.body.location)
					
					request.input("currency", sql.VarChar,req.body.currency)
                    request.input("uom", sql.BigInt,req.body.uom)
                    request.input("minqty", sql.Decimal,req.body.minqty)
                    request.input("maxqty", sql.Decimal,req.body.maxqty)
					request.input("price", sql.Decimal,req.body.price)
                    request.input("discountpercent", sql.Decimal,req.body.discountpercent)
					
					request.input("discountamount", sql.Decimal,req.body.discountamount)
                    request.input("startdate", sql.VarChar,req.body.startdate)
                    request.input("enddate", sql.VarChar,req.body.enddate)
               
					
					
					
                    request.input("IsBlock", sql.VarChar,req.body.IsBlock)
                    request.input("created_by", sql.VarChar,req.body.created_by)
                    request.input("creator_MAC_add", sql.VarChar,req.body.creator_MAC_add)
                    
                 
                
                    
                  
                    request.execute("Inventory_ItemPrice_operation").then(function (recordset) {
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