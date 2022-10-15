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
    public partial class credit_card_info : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadcardlist(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
            string customercode = requestdata.customercode;
            string cocd = requestdata.cocd;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            creditcardinfo obj = new creditcardinfo();
            obj._mode = "getlist";
            obj._custcode = customercode;
            obj._cocd = cocd;
            DataSet ds = obj.Operation(_connectionstring, ref _catchmessage);

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
        public static string docheck(string id, string cardno, string custcode, string cocd)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            //string _id = id;
            //string _vndcode = vndcode;

            creditcardinfo obj = new creditcardinfo();
            obj._mode = "check";
            obj._rowid = id;
            obj._cardno = cardno;
            obj._custcode = custcode;
            obj._cocd = cocd;

            isaccodeexists = obj.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);
        }

        [System.Web.Services.WebMethod]
        public static string doSavedata(string data)
        {
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string id = requestdata.id;
            string custcode = requestdata.custcode;
            string cocd = requestdata.cocd;
            string cardno = requestdata.cardno;
            string name = requestdata.name;
            string expirydate = requestdata.expirydate;
            string pin = requestdata.pin;
            string address = requestdata.address;
            string isblock = requestdata.isblock;
            string ip = requestdata.ip;

            creditcardinfo obj = new creditcardinfo();
            obj._mode = "modify";
            obj._rowid = id;
            obj._custcode = custcode;
            obj._cocd = cocd;
            obj._cardno = cardno;
            obj._name = name;
            obj._expirydate = expirydate;
            obj._pin = pin;
            obj._address = address;
            obj._isblock = isblock;
            obj._creator_MAC_add = ip;
            obj._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = obj.Operation(_connectionstring, ref _catchmessage);

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

            string objid = requestdata.id;

            creditcardinfo obj = new creditcardinfo();
            obj._mode = "getbyid";
            obj._rowid = objid;
            DataSet ds = obj.Operation(_connectionstring, ref _catchmessage);

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

            creditcardinfo obj = new creditcardinfo();
            obj._mode = "delete";
            obj._rowid = _id;
            isaccodeexists = obj.check(_connectionstring, ref _catchmessage);
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

            creditcardinfo obj = new creditcardinfo();
            obj._mode = "checkref";
            obj._rowid = _id;

            isaccodeexists = obj.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }
    }
}