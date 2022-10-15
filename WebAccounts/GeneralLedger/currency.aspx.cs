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
    public partial class currency : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadcurrencylist()
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Currency currency = new Currency();
            currency._mode = "getlist";
            currency._currcd = string.Empty;
            DataSet ds = currency.Operation(_connectionstring, ref _catchmessage);

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

            //string _bpgid = bpgid;
            //string _bpgcode = bpgcode;

            Currency currency = new Currency();
            currency._mode = "check";
            currency._rowid = rowid;
            currency._currcd = currcd;

            isaccodeexists = currency.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string doSavecurr(string data)
        {
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string bpgid = requestdata.bpgid;
            string bpgcode = requestdata.bpgcode;
            string description = requestdata.description;

            Currency currency = new Currency();
            currency._mode = "modify";
            currency._rowid = requestdata.rowid;
            currency._currcd = requestdata.currcd;
            currency._currdesc = requestdata.currdesc;
            currency._cocd = requestdata.cocd;
            currency._convroaccr = requestdata.convroaccr;
            currency._convroacdr = requestdata.convroacdr;
            currency._creator_mac_add = requestdata.creator_mac_add;
            currency._currunitdecplace= requestdata.currunitdecplace;
            currency._ralizegainac= requestdata.ralizegainac;
            currency._realizelossac = requestdata.realizelossac;
            currency._rotype= requestdata.rotype;
            currency._totalroprecision = requestdata.totalroprecision ;
            currency._totalroto= requestdata.totalroto;
            currency._unitamtroprecision = requestdata.unitamtroprecision;
            currency._unrealizegainac= requestdata.unrealizegainac;
            currency._unrealizelossac = requestdata.unrealizelossac;
            currency._createdby = HttpContext.Current.Session["userid"].ToString();

            DataSet ds = currency.Operation(_connectionstring, ref _catchmessage);

            if (ds.Tables[0].Rows.Count > 0)
            {
                ok = true;
                _ret = ds.Tables[0].Rows[0]["id"].ToString();
            }

            return ok.ToString() + "|~|" + _ret;
        }

        [System.Web.Services.WebMethod]
        public static string doeditcurr(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            Currency currency = new Currency();
            currency._mode = "getbyid";
            currency._rowid = requestdata.rowid;

            currency._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = currency.Operation(_connectionstring, ref _catchmessage);

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

            Currency currency = new Currency();
            currency._mode = "delete";
            currency._rowid = rowid;


            isaccodeexists = currency.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        
    }
}