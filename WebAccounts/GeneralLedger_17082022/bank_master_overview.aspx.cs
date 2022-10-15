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
    public partial class bank_master_overview : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadBankAccountlist(string cocd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            BankAccount bankAccount = new BankAccount();
            bankAccount._mode = "getlist";
            bankAccount._bankCd = string.Empty;
            bankAccount._coCd = cocd;
            DataSet ds = bankAccount.Operation(_connectionstring, ref _catchmessage);

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
        public static string doCheckBankCode(string rowid, string bankCd)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();


            BankAccount bankAccount = new BankAccount();
            bankAccount._mode = "check";
            bankAccount._rowid = rowid;
            bankAccount._bankCd = bankCd;

            isaccodeexists = bankAccount.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string doSaveBankAccount(string data)
        {
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            //string bpgid = requestdata.bpgid;
            //string bpgcode = requestdata.bpgcode;
            //string description = requestdata.description;

            BankAccount bankAccount = new BankAccount();
            bankAccount._mode = "modify";
            bankAccount._rowid = requestdata.rowid;
            bankAccount._bankCd = requestdata.bankCd;
            bankAccount._acNumber = requestdata.acNumber;
            bankAccount._address1 = requestdata.address1;
            bankAccount._address2 = requestdata.address2;
            bankAccount._alternateNo = requestdata.alternateNo;
            bankAccount._bankName = requestdata.bankName;
            bankAccount._bankSrcName = requestdata.bankSrcName;
            bankAccount._block = requestdata.block;
            bankAccount._branchCd = requestdata.branchCd;
            bankAccount._branchName = requestdata.branchName;
            bankAccount._city= requestdata.city;
            bankAccount._coCd = requestdata.coCd;
            bankAccount._contactPerson = requestdata.contactPerson;
            bankAccount._countryCd = requestdata.countryCd;
            bankAccount._currCd = requestdata.currCd;
            bankAccount._email = requestdata.email;
            bankAccount._faxNo = requestdata.faxNo;
            bankAccount._giroCd = requestdata.giroCd;
            bankAccount._iBAN = requestdata.iBAN;
            bankAccount._iFSC = requestdata.iFSC;
            bankAccount._chequePrefix = requestdata.chequePrefix;
            bankAccount._ChequeLengthWoPrefix = requestdata.chequeLengthWoPrefix;
            bankAccount._minBal = requestdata.minBal;
            bankAccount._personRespId = requestdata.personRespId;
            bankAccount._phoneNo = requestdata.phoneNo;
            bankAccount._pin= requestdata.pin;
            bankAccount._postingGrpCd = requestdata.postingGrpCd;
            bankAccount._stateCd= requestdata.stateCd;
            bankAccount._swiftCd = requestdata.swiftCd;
            bankAccount._website = requestdata.website;
            bankAccount._created_by = HttpContext.Current.Session["userid"].ToString();
            bankAccount._creator_MAC_add = requestdata.creator_mac_add;
            bankAccount._coCd = requestdata.cocd;


            DataSet ds = bankAccount.Operation(_connectionstring, ref _catchmessage);

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

            BankAccount bankAccount = new BankAccount();
            bankAccount._mode = "getbyid";
            bankAccount._rowid = requestdata.rowid;

            bankAccount._created_by = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = bankAccount.Operation(_connectionstring, ref _catchmessage);

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

            BankAccount bankAccount = new BankAccount();
            bankAccount._mode = "delete";
            bankAccount._rowid = rowid;


            isaccodeexists = bankAccount.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }


    }
}