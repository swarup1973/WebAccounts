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

namespace WebAccounts.InventoryManagement
{
    public partial class standard_conversion : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadlookupdata(string CoCd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            UOM role = new UOM();
            role._cocd = CoCd;
            DataSet ds = role.getUOM(_connectionstring, ref _catchmessage);

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
        public static string loadStandard(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string cocd = requestdata.cocd;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            StandardConversion ns = new StandardConversion();
            ns._cocd = cocd;
            DataSet ds = ns.getStandardConversion(_connectionstring, ref _catchmessage);

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
        public static string docheckcode(string id, string pid, string code, string cocd)
        {
            bool isaccodeexists = false; string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;
            string _code = code;
            string _cocd = cocd;
            string _pid = pid;

            StandardConversion ns = new StandardConversion();
            ns._mode = "check";
            ns._id = _id;
            ns._code = _code;
            ns._cocd = _cocd;

            //isaccodeexists = ns.check(_connectionstring, ref _catchmessage);
            DataSet ds = ns.validate(_connectionstring, ref _catchmessage);

            JSONString = JsonConvert.SerializeObject(ds);

            if (ds != null)
            {
                ds.Tables.Clear();
                ds.Dispose();
                ds = null;
            }
            return JSONString;
            //return Convert.ToString(isaccodeexists);

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
            StandardConversion ns = new StandardConversion();
            ns._mode = "modify";

            string id = requestdata.id;
            string cocd = requestdata.cocd;
            ns._id = id;
            ns._cocd = cocd;

            string FromUomCd = requestdata.FromUomCd;
            string ToUomCd = requestdata.ToUomCd; 
            string ConvFactor = requestdata.ConvFactor;
            string RoType = requestdata.RoType;
            bool Block = requestdata.Block;
            ns._FromUomCd = FromUomCd;
            ns._ToUomCd = ToUomCd;
            ns._ConvFactor = ConvFactor;
            ns._RoType = RoType;
            ns._isblock = Block;

            string ip = requestdata.ip;
            ns._creator_MAC_add = ip;

            ns._createdby = HttpContext.Current.Session["userid"].ToString();

            DataSet ds = ns.Operation(_connectionstring, ref _catchmessage);

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
            string cocd = requestdata.cocd;
            //string isblock = requestdata.isblock; 

            StandardConversion ns = new StandardConversion();
            ns._id = id;
            ns._cocd = cocd;

            //vnd._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = ns.getStandardConversion(_connectionstring, ref _catchmessage);

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

            StandardConversion vnd = new StandardConversion();
            vnd._mode = "delete";
            vnd._id = _id;

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

            StandardConversion vnd = new StandardConversion();
            vnd._mode = "checkref";
            vnd._id = _id;

            //isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }
    }
}