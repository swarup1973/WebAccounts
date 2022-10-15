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
    public partial class ledger_category : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadrolelist(string CoCd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            LedgerCategory role = new LedgerCategory();
            role._mode = "getlist";
            role._id = string.Empty;
            role._cocd = CoCd;
            DataSet ds = role.doOperation(_connectionstring, ref _catchmessage);

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
        public static string docheckrolecode(string id, string code)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _roleid = id;
            string _rolecode = code;

            LedgerCategory role = new LedgerCategory();
            role._mode = "check";
            role._id = _roleid;
            role._LedCatCd = code;

            isaccodeexists = role.checkcode(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string doSaveRole(string data)
        {
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string id = requestdata.id;
            string code = requestdata.code;
            string description = requestdata.description;
            string isblock = requestdata.isblock;
            string cocd = requestdata.cocd;

            LedgerCategory role = new LedgerCategory();
            role._mode = "modify";
            role._id = id;
            role._LedCatCd = code;
            role._LedCatDesc = description;
            role._IsClose = isblock;
            role._createdby = HttpContext.Current.Session["userid"].ToString();
            role._cocd = cocd;
            DataSet ds = role.doOperation(_connectionstring, ref _catchmessage);

            if (ds.Tables[0].Rows.Count > 0)
            {
                ok = true;
                _ret = ds.Tables[0].Rows[0]["roleid"].ToString();
            }

            return ok.ToString() + "|~|" + _ret;
        }

        [System.Web.Services.WebMethod]
        public static string doeditRole(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string id = requestdata.id;
            string cocd = requestdata.cocd;

            LedgerCategory role = new LedgerCategory();
            role._mode = "getbyid";
            role._id = id;
            role._cocd = cocd;

            role._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = role.doOperation(_connectionstring, ref _catchmessage);

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

            LedgerCategory role = new LedgerCategory();
            role._mode = "delete";
            role._id = _id;


            isaccodeexists = role.checkcode(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }
    }
}