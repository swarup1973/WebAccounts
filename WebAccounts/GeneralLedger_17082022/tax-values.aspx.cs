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
    public partial class tax_values : System.Web.UI.Page
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
            string taxid = requestdata.taxid;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            taxvalues vnd = new taxvalues();
            vnd._mode = "getlist";
            vnd._TaxId = taxid;
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
        public static string docheck(string id, string taxid, string fromdate, string todate)
        {

            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;
            string _taxid = taxid;
            string _fromdate = fromdate;
            string _todate = todate;

            taxvalues vnd = new taxvalues();
            vnd._mode = "check";
            vnd._rowid = _id;
            vnd._TaxId = _taxid;
            vnd._FromDt = _fromdate;
            vnd._ToDt = _todate;

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
            taxvalues vnd = new taxvalues();
            vnd._mode = "modify";

            string id = requestdata.id;
            string cocd = requestdata.cocd;
            vnd._rowid = id;
            vnd._CoCd = cocd;

            string taxid = requestdata.taxid;
            string fromdate = requestdata.fromdate;
            string todate = requestdata.todate;
            string MinBaseAmt = requestdata.MinBaseAmt;
            string MaxBaseAmt = requestdata.MaxBaseAmt;
            string TaxPer = requestdata.TaxPer;
            string ExeptPer = requestdata.ExeptPer;
            string isblock = requestdata.Isblock;


            vnd._TaxId = taxid;
            vnd._FromDt = fromdate;
            vnd._ToDt = todate;
            vnd._MinBaseAmt = MinBaseAmt;
            vnd._MaxBaseAmt = MaxBaseAmt;
            vnd._TaxPer = TaxPer;
            vnd._ExeptPer = ExeptPer;
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

            taxvalues vnd = new taxvalues();
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

            taxvalues vnd = new taxvalues();
            vnd._mode = "delete";
            vnd._rowid = _id;

            DataSet ds = vnd.check(_connectionstring, ref _catchmessage);
            if (Convert.ToInt32(ds.Tables[0].Rows[0]["dataexists"].ToString()) > 0) isaccodeexists = true;
            return Convert.ToString(isaccodeexists);

        }
    }
}