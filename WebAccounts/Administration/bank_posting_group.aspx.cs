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
    public partial class bank_posting_group : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadbankpostinggrouplist(string CoCd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            BankPostingGroup bpg = new BankPostingGroup();
            bpg._mode = "getlist";
            bpg._code = string.Empty;
            bpg._cocd = CoCd;
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
        public static string docheckbpgcode(string bpgid, string bpgcode)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _bpgid = bpgid;
            string _bpgcode = bpgcode;

            BankPostingGroup bpg = new BankPostingGroup();
            bpg._mode = "check";
            bpg._rowid = _bpgid;
            bpg._code = _bpgcode;

            isaccodeexists = bpg.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string doSavebpg(string data)
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
            string isblock = requestdata.isblock; //Pran on 2021.05.23
            string cocd = requestdata.cocd;

            BankPostingGroup bpg = new BankPostingGroup();
            bpg._mode = "modify";
            bpg._rowid = bpgid;
            bpg._code = bpgcode;
            bpg._name = description;
            bpg._isblock = isblock; //Pran on 2021.05.23
            bpg._createdby = HttpContext.Current.Session["userid"].ToString();
            bpg._cocd = cocd;
            DataSet ds = bpg.Operation(_connectionstring, ref _catchmessage);

            if (ds.Tables[0].Rows.Count > 0)
            {
                ok = true;
                _ret = ds.Tables[0].Rows[0]["id"].ToString();
            }

            return ok.ToString() + "|~|" + _ret;
        }

        [System.Web.Services.WebMethod]
        public static string doeditbpg(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string bpgid = requestdata.bpgid;
            string isblock = requestdata.isblock; //Pran on 2021.05.23
            string cocd = requestdata.cocd;

            BankPostingGroup bpg = new BankPostingGroup();
            bpg._mode = "getbyid";
            bpg._rowid = bpgid;
            bpg._isblock = isblock; //Pran on 2021.05.23
            bpg._createdby = HttpContext.Current.Session["userid"].ToString();
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
        public static string dodelete(string bpgid)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _bpgid = bpgid;

            BankPostingGroup bpg = new BankPostingGroup();
            bpg._mode = "delete";
            bpg._rowid = _bpgid;


            isaccodeexists = bpg.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string doSavebank(string data)
        {
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string bpgid = requestdata.bpgid;
            string bpgcode = requestdata.bpgcode;
            //string description = requestdata.description;
            string acledger = requestdata.acledger;
            //string isblock = requestdata.isblock; //Pran on 2021.05.24
            string cocd = requestdata.cocd;

            BankPostingGroup bpg = new BankPostingGroup();
            bpg._mode = "modifybank";
            bpg._rowid = bpgid;
            bpg._code = bpgcode;
            bpg._bankledger = acledger;
            //bpg._isblock = isblock; //Pran on 2021.05.23
            bpg._createdby = HttpContext.Current.Session["userid"].ToString();
            bpg._cocd = cocd;
            DataSet ds = bpg.Operation(_connectionstring, ref _catchmessage);

            if (ds.Tables[0].Rows.Count > 0)
            {
                ok = true;
                _ret = ds.Tables[0].Rows[0]["id"].ToString();
            }

            return ok.ToString() + "|~|" + _ret;
        }
    }
}