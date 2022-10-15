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
    public partial class vendor_bank_ac : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadbanklist(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
            string vendorcode = requestdata.vendorcode;
            string cocd = requestdata.cocd;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            vendorbankac bpg = new vendorbankac();
            bpg._mode = "getlist";
            bpg._vendcode = vendorcode;
            bpg._cocd = cocd;
            DataSet ds = bpg.Operation(_connectionstring, ref _catchmessage);

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
        public static string docheck(string id, string acntno, string vndcode, string cocd)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            //string _id = id;
            //string _vndcode = vndcode;

            vendorbankac bpg = new vendorbankac();
            bpg._mode = "check";
            bpg._rowid = id;
            bpg._code = acntno;
            bpg._vendcode = vndcode;
            bpg._cocd = cocd;

            isaccodeexists = bpg.check(_connectionstring, ref _catchmessage);

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
            string vndcode = requestdata.vndcode;
            string cocd = requestdata.cocd;
            string acntno = requestdata.acntno;
            string bankname = requestdata.bankname;
            string branch = requestdata.branch;
            string ifsc = requestdata.ifsc;
            string address = requestdata.address;
            string isblock = requestdata.isblock;
            string ip = requestdata.ip;

            vendorbankac bpg = new vendorbankac();
            bpg._mode = "modify";
            bpg._rowid = id;
            bpg._vendcode = vndcode;
            bpg._cocd = cocd;
            bpg._code = acntno;
            bpg._name = bankname;
            bpg._branch = branch;
            bpg._ifsc = ifsc;
            bpg._address = address;
            bpg._isblock = isblock;
            bpg._creator_MAC_add = ip;
            bpg._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = bpg.Operation(_connectionstring, ref _catchmessage);

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

            string bpgid = requestdata.id;

            vendorbankac bpg = new vendorbankac();
            bpg._mode = "getbyid";
            bpg._rowid = bpgid;
            DataSet ds = bpg.Operation(_connectionstring, ref _catchmessage);

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

            vendorbankac bpg = new vendorbankac();
            bpg._mode = "delete";
            bpg._rowid = _id;
            isaccodeexists = bpg.check(_connectionstring, ref _catchmessage);
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

            vendorbankac bpg = new vendorbankac();
            bpg._mode = "checkref";
            bpg._rowid = _id;

            isaccodeexists = bpg.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

    }
}