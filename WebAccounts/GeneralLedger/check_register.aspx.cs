using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Data;
using System.Web;
using WebAccounts.Buisness;
using System.Collections.Generic;

namespace WebAccounts
{
    public partial class check_register : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadCheckRegiterlist(string cocd,string bankCd,string status,string chequeNo)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            CheckRegister checkRegister = new CheckRegister();
            checkRegister._mode = "getlist";
            checkRegister._coCd = cocd;
            checkRegister._bankCd = bankCd;
            checkRegister._status = status;
            checkRegister._chequeNo = chequeNo;
            DataSet ds = checkRegister.Operation(_connectionstring, ref _catchmessage);

            JSONString = JsonConvert.SerializeObject(ds);

            if (ds != null)
            {
                ds.Tables.Clear();
                ds.Dispose();
                ds = null;
            }
            return JSONString;
        }

        [System.Web.Services.WebMethod]
        public static string doCancelCheque(string values)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();


            CheckRegister checkRegister = new CheckRegister();
            checkRegister._mode = "cancel";
            checkRegister._cancelRowIds = values;
            isaccodeexists = checkRegister.cancelCheque(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string doSaveCheckRegister(string data)
        {
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            CheckRegister checkRegister = new CheckRegister();
            checkRegister._mode = "modify";
            checkRegister._rowid = requestdata.rowid;
            checkRegister._bankCd = requestdata.bankCd;            
            checkRegister._coCd = requestdata.coCd;
            checkRegister._created_by = HttpContext.Current.Session["userid"].ToString();
            checkRegister._creator_MAC_add = requestdata.creator_mac_add;
            checkRegister._noOfLeaf = requestdata.noOfLeaf;
            checkRegister._receiptDt = requestdata.receiptDt;
            checkRegister._remarks = requestdata.remarks;
            checkRegister._chequePrefix = requestdata.chequePrefix;
            checkRegister._chequeLengthWoPrefix = requestdata.chequeLengthWoPrefix;
            checkRegister._startingNo = requestdata.startingNo;

            DataSet ds = checkRegister.Operation(_connectionstring, ref _catchmessage);

            if (ds.Tables[0].Rows.Count > 0)
            {
                ok = true;
                _ret = ds.Tables[0].Rows[0]["id"].ToString();
            }

            return ok.ToString() + "|~|" + _ret;
        }

        //[System.Web.Services.WebMethod]
        //public static string loadStartingNo(string cocd, string bankCd)
        //{
        //    string JSONString = string.Empty;
        //    string _catchmessage = string.Empty;
        //    string _ret = string.Empty;
        //    string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        //    CheckRegister checkRegister = new CheckRegister();
        //    checkRegister._mode = "check";
        //    checkRegister._coCd = cocd;
        //    checkRegister._bankCd = bankCd;
        //    DataSet ds = checkRegister.Operation(_connectionstring, ref _catchmessage);

        //    JSONString = JsonConvert.SerializeObject(ds);

        //    if (ds != null)
        //    {
        //        ds.Tables.Clear();
        //        ds.Dispose();
        //        ds = null;
        //    }
        //    return JSONString;
        //}

        //[System.Web.Services.WebMethod]
        //public static string doeditcurr(string data)
        //{
        //    string JSONString = string.Empty;
        //    string _catchmessage = string.Empty;
        //    string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        //    dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

        //    CheckRegister checkRegister = new CheckRegister();
        //    checkRegister._mode = "getbyid";
        //    checkRegister._rowid = requestdata.rowid;

        //    checkRegister._created_by = HttpContext.Current.Session["userid"].ToString();
        //    DataSet ds = checkRegister.Operation(_connectionstring, ref _catchmessage);

        //    JSONString = JsonConvert.SerializeObject(ds);

        //    if (ds != null)
        //    {
        //        ds.Tables.Clear();
        //        ds.Dispose();
        //        ds = null;
        //    }
        //    return JSONString;
        //}

        //[System.Web.Services.WebMethod]
        //public static string dodelete(string rowid)
        //{
        //    bool isaccodeexists = false;
        //    string _catchmessage = string.Empty;
        //    string _ret = string.Empty;
        //    string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

        //    CheckRegister checkRegister = new CheckRegister();
        //    checkRegister._mode = "delete";
        //    checkRegister._rowid = rowid;


        //    isaccodeexists = checkRegister.check(_connectionstring, ref _catchmessage);

        //    return Convert.ToString(isaccodeexists);

        //}


    }
}