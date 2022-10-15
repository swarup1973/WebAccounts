﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Globalization;
using System.IO;
using System.Text;
using System.Configuration;
using System.Data;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebAccounts.Buisness;

namespace WebAccounts
{
    public partial class tax_code : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadlist(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string cocd = requestdata.cocd;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            taxcode vnd = new taxcode();
            vnd._mode = "getlist";
            vnd._CoCd = cocd;
            DataSet ds = vnd.Operation(_connectionstring, ref _catchmessage);

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
        public static string docheckcode(string id, string taxcode, string cocd)
        {

            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;
            string _taxcode = taxcode;
            string _cocd = cocd;
            /*string _startdate = startdate;
            string _enddate = enddate;
            string _curcode = curcode;*/

            taxcode vnd = new taxcode();
            vnd._mode = "check";
            vnd._rowid = _id;
            vnd._TaxCode = _taxcode;
            vnd._CoCd = _cocd;
            //vnd._startdate = startdate;
            //vnd._enddate = _enddate;
            //vnd._currcode = _curcode;

            DataSet ds = vnd.check(_connectionstring, ref _catchmessage);

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
        public static string doSave(string data)
        {
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
            taxcode vnd = new taxcode();
            vnd._mode = "modify";

            string id = requestdata.id;
            string cocd = requestdata.cocd;
            vnd._rowid = id;
            vnd._CoCd = cocd;

            string TaxCode = requestdata.TaxCode;
            string TaxDesc = requestdata.TaxDesc;
            string AcCd_TaxLiability = requestdata.AcCd_TaxLiability;
            string BasisOfCalc = requestdata.BasisOfCalc;
            string ROff = requestdata.ROff;
            string RType = requestdata.RType;
            string isblock = requestdata.Isblock;


            vnd._TaxCode = TaxCode;
            vnd._TaxDesc = TaxDesc;
            vnd._AcCd_TaxLiability = AcCd_TaxLiability;
            vnd._BasisOfCalc = BasisOfCalc;
            vnd._ROff = ROff;
            vnd._RType = RType;
            vnd._Block = isblock;

            string ip = requestdata.ip;
            vnd._creator_MAC_add = ip;

            vnd._created_by = HttpContext.Current.Session["userid"].ToString();

            DataSet ds = vnd.Operation(_connectionstring, ref _catchmessage);

            if (ds.Tables[0].Rows.Count > 0)
            {
                ok = true;
                _ret = ds.Tables[0].Rows[0]["id"].ToString();
            }

            return ok.ToString() + "|~|" + _ret;
        }

        [System.Web.Services.WebMethod]
        public static string doedit(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string id = requestdata.id;
            //string isblock = requestdata.isblock; 

            taxcode vnd = new taxcode();
            vnd._mode = "getbyid";
            vnd._rowid = id;

            //vnd._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = vnd.Operation(_connectionstring, ref _catchmessage);

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
        public static string dodelete(string id)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;

            taxcode vnd = new taxcode();
            vnd._mode = "delete";
            vnd._rowid = _id;

            DataSet ds = vnd.check(_connectionstring, ref _catchmessage);
            if (Convert.ToInt32(ds.Tables[0].Rows[0]["dataexists"].ToString()) > 0) isaccodeexists = true;
            return Convert.ToString(isaccodeexists);

        }
    }
}