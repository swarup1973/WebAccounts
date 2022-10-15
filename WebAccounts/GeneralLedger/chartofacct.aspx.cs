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
    public partial class chartofacct : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.UrlReferrer == null)
            {
                Response.Redirect("../login.aspx");
            }
        }

        [System.Web.Services.WebMethod]
        public static string loadlookupdata(string CoCd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Chartofacct co = new Chartofacct();
            co._cocd = CoCd;
            DataSet ds = co.getLookupdata(_connectionstring, ref _catchmessage);

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
        public static string loadchatofacctlist(string CoCd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Chartofacct co = new Chartofacct();
            co._cocd = CoCd;
            DataSet ds = co.getchatofacctlistlist(_connectionstring, ref _catchmessage);

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
        public static string docheckaccode(string acid,string accode)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            if (acid.Trim() == "0") acid = string.Empty;
            
            Chartofacct dim = new Chartofacct();
            dim._AcId = acid;
            dim._AcCd = HttpContext.Current.Server.UrlDecode(accode);

            isaccodeexists = dim.checkacccode(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string doSavechartofacct(string data)
        {
            //bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string acid = requestdata.acid;
            string accode = requestdata.accode;
            string desc = requestdata.desc;
            string actype = requestdata.actype;
            string group = requestdata.group;
            string grouprangefrom = requestdata.grouprangefrom;
            string grouprangeto = requestdata.grouprangeto;
            string cocd = requestdata.cocd;

            Chartofacct _obj = new Chartofacct();

            _obj._AcId = acid;
            _obj._AcCd = accode;

            if(string.IsNullOrEmpty(desc)) _obj._AcDesc = accode;
            else _obj._AcDesc = desc;

            _obj._AcTypeCd = actype;
            _obj._grpCd = group;
            _obj._grpRangeFrom = grouprangefrom;
            _obj._grpRangeTo = grouprangeto;
            _obj._dimType = "D";
            _obj._enabled = true;
            _obj._LedCatId = "0";
            _obj._userid= HttpContext.Current.Session["userid"].ToString();
            _obj._cocd = cocd;

            result =_obj.saveChartofacct(_connectionstring, ref _catchmessage);
            //ok = _obj.saveChartofacct(_connectionstring, ref _catchmessage);
            //return ok.ToString();
            return result;
        }

        [System.Web.Services.WebMethod]
        public static string docheckVchDtl_ByAcCd(string accode)
        {
            bool istransactionexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            Chartofacct dim = new Chartofacct();
            dim._AcCd = HttpContext.Current.Server.UrlDecode(accode);
            dim._finyr = HttpContext.Current.Session["finyear"].ToString();

            istransactionexists = dim.checkTransaction_ByAcCd(_connectionstring, ref _catchmessage);
            return Convert.ToString(istransactionexists);
        }

        [System.Web.Services.WebMethod]
        public static string deletefa_AccMaster(string acid, string accode)
        {
            string ret = string.Empty;
            string str_connection = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            string str_catchmessage = "";

            Chartofacct _obj = new Chartofacct();
            _obj._AcId = HttpContext.Current.Server.UrlDecode(acid); 
            _obj._AcCd = HttpContext.Current.Server.UrlDecode(accode); 

            bool oK = _obj.deletefa_AccMaster(str_connection, ref str_catchmessage);
            ret = oK.ToString().ToLower();
            return ret;
        }
    }

    
}