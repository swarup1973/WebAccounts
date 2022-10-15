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
    public partial class sales_tax_exempt_codes : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadlookupdata(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
            string cocd = requestdata.cocd;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            SalesTaxExemptMaster com = new SalesTaxExemptMaster();
            com._CoCd = cocd;
            com._mode = "loadlookup";
            DataSet ds = com.Operation(_connectionstring, ref _catchmessage);

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
        public static string loadVendorAccountOverviewlist(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string cocd = requestdata.cocd;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            SalesTaxExemptMaster vnd = new SalesTaxExemptMaster();
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
        public static string docheckcode(string id, string code, string cocd)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;
            string _code = code;
            string _cocd = cocd;

            SalesTaxExemptMaster vnd = new SalesTaxExemptMaster();
            vnd._mode = "check";
            vnd._rowid = _id;
            vnd._ExemptCd = _code;
            vnd._CoCd = _cocd;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);
            return Convert.ToString(isaccodeexists);
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
            SalesTaxExemptMaster vnd = new SalesTaxExemptMaster();
            vnd._mode = "modify";

            string id = requestdata.id;
            string cocd = requestdata.cocd;
            string module = requestdata.module;
            vnd._rowid = id;
            vnd._CoCd = cocd;
            vnd._ExemptCd = requestdata.code;
            vnd._ExemptDesc = requestdata.ExemptDesc;
            string isblock = requestdata.isblock;
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
            string module = requestdata.module;

            string id = requestdata.id;
            //string isblock = requestdata.isblock; 

            SalesTaxExemptMaster vnd = new SalesTaxExemptMaster();
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

            SalesTaxExemptMaster vnd = new SalesTaxExemptMaster();
            vnd._mode = "delete";
            vnd._rowid = _id;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

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

            SalesTaxExemptMaster vnd = new SalesTaxExemptMaster();
            vnd._mode = "checkref";
            vnd._rowid = _id;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }
    }
}