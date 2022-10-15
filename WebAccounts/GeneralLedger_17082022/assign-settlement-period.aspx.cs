using System;
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
    public partial class assign_settlement_period : System.Web.UI.Page
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
            string SaleTaxCompId = requestdata.taxid;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            AssignSettelemetPeriod vnd = new AssignSettelemetPeriod();
            vnd._mode = "getlist";
            vnd._SaleTaxCompId = SaleTaxCompId;
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
        public static string docheckcode(string id, string SaleTaxCompId, string cocd, string FromDt, string ToDt)
        {

            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            AssignSettelemetPeriod vnd = new AssignSettelemetPeriod();
            vnd._mode = "check";
            vnd._rowid = id;
            vnd._SaleTaxCompId = SaleTaxCompId;
            vnd._CoCd = cocd;
            vnd._FromDt = FromDt;
            vnd._ToDt = ToDt;

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
            AssignSettelemetPeriod vnd = new AssignSettelemetPeriod();
            vnd._mode = "modify";

            string id = requestdata.id;
            string cocd = requestdata.cocd;
            vnd._rowid = id;
            vnd._CoCd = cocd;

            string _SaleTaxCompId = requestdata.SaleTaxCompId;
            string _FromDt = requestdata.FromDt;
            string _ToDt = requestdata.ToDt;
           
            string _IsBlock = requestdata.Isblock;

            vnd._SaleTaxCompId = _SaleTaxCompId;
            vnd._FromDt = _FromDt;
            vnd._ToDt = _ToDt;
            vnd._IsBlock = _IsBlock;

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

            AssignSettelemetPeriod vnd = new AssignSettelemetPeriod();
            vnd._mode = "getbyid";
            vnd._rowid = id;

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

            AssignSettelemetPeriod vnd = new AssignSettelemetPeriod();
            vnd._mode = "delete";
            vnd._rowid = _id;

            DataSet ds = vnd.check(_connectionstring, ref _catchmessage);
            if (Convert.ToInt32(ds.Tables[0].Rows[0]["dataexists"].ToString()) > 0) isaccodeexists = true;
            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string docheckdelete(string id)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;

            AssignSettelemetPeriod vnd = new AssignSettelemetPeriod();
            vnd._mode = "checkref";
            vnd._rowid = _id;

            DataSet ds = vnd.check(_connectionstring, ref _catchmessage);
            if (ds.Tables[0].Rows.Count > 0) isaccodeexists = true;

            return Convert.ToString(isaccodeexists);

        }
    }
}