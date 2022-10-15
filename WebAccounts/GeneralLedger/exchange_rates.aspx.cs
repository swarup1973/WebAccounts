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
using WebAccounts.Buisness.GeneralLedger.Setup;

namespace WebAccounts
{
    public partial class exchange_rates : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadexchangelist(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();


            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            ExchangeRate exchange = new ExchangeRate();
            exchange._mode = "getlist";
            exchange._currcd = requestdata.currcd;

            DataSet ds = exchange.Operation(_connectionstring, ref _catchmessage);

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
        public static string docheckcurrcode(string rowid, string currcd)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

           
            ExchangeRate exchange = new ExchangeRate();
            exchange._mode = "check";
            exchange._rowid = rowid;
            exchange._currcd = currcd;

            isaccodeexists = exchange.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string doSaveexchange(string data)
        {
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            ExchangeRate exchange = new ExchangeRate();
            
            exchange._mode = "modify";
            exchange._closeDt = requestdata.closeDt;
            exchange._cocd = requestdata.cocd;
            exchange._creator_mac_add = requestdata.creator_mac_add;
            exchange._currcd= requestdata.currcd;
            exchange._entryDate= requestdata.entryDate;
            exchange._exchangeRate = requestdata.exchangeRate;
            exchange._exchangeRatePer = requestdata.exchangeRatePer;
            exchange._rowid = requestdata.rowid;
            exchange._startDt = requestdata.startDt;
            exchange._createdby = HttpContext.Current.Session["userid"].ToString();
            
            DataSet ds = exchange.Operation(_connectionstring, ref _catchmessage);

            if (ds.Tables[0].Rows.Count > 0)
            {
                ok = true;
                _ret = ds.Tables[0].Rows[0]["id"].ToString();
            }

            return ok.ToString() + "|~|" + _ret;
        }

        [System.Web.Services.WebMethod]
        public static string doeditexchange(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            ExchangeRate exchange = new ExchangeRate();
            exchange._mode = "getbyid";
            exchange._rowid = requestdata.rowid;

            exchange._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = exchange.Operation(_connectionstring, ref _catchmessage);

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
        public static string dodelete(string rowid)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();


            ExchangeRate exchange = new ExchangeRate();
            exchange._mode = "delete";
            exchange._rowid = rowid;


            isaccodeexists = exchange.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        
    }
}