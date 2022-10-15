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
    public partial class vendor_account_overview : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

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
            vendraccountoverview vnd = new vendraccountoverview();
            vnd._mode = "getlist";
            vnd._code = string.Empty;
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

            vendraccountoverview vnd = new vendraccountoverview();
            vnd._mode = "check";
            vnd._rowid = _id;
            vnd._code = _code;
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
            vendraccountoverview vnd = new vendraccountoverview();
            vnd._mode = "modify";

            string id = requestdata.id;
            string cocd = requestdata.cocd;
            vnd._rowid = id;
            vnd._CoCd = cocd;

            string code = requestdata.code;
            string VendName = requestdata.VendName;
            string VendSearch = requestdata.VendSearch;
            string CrLimit = requestdata.CrLimit;
            string VendGrpCd = requestdata.VendGrpCd;
            string IsForeignVendor = requestdata.IsForeignVendor;
            string CurrCd = requestdata.CurrCd;
            string BranchCd = requestdata.BranchCd;
            string EntityType = requestdata.EntityType;
            string PersonRespId = requestdata.PersonRespId;
            string Block = requestdata.Block;
            string CreditRating = requestdata.CreditRating;
            vnd._code = code;
            vnd._name = VendName;
            vnd._vendorsearch = VendSearch;
            vnd._CrLimit = CrLimit;
            vnd._VendGrpCd = VendGrpCd;
            vnd._IsForeignVendor = IsForeignVendor;
            vnd._CurrCd = CurrCd;
            vnd._BranchCd = BranchCd;
            vnd._EntityType = EntityType;
            vnd._PersonRespId = PersonRespId;
            vnd._Block = Block;
            vnd._CreditRating = CreditRating;

            string Address1 = requestdata.Address1;
            string Address2 = requestdata.Address2;
            string Pin = requestdata.Pin;
            string City = requestdata.City;
            string CountryCd = requestdata.CountryCd;
            string StateCd = requestdata.StateCd;
            string PhoneNo = requestdata.PhoneNo;
            string AlternateNo = requestdata.AlternateNo;
            string FaxNo = requestdata.FaxNo;
            string ContactPerson = requestdata.ContactPerson;
            string Email = requestdata.Email;
            string Website = requestdata.Website;
            vnd._Address1 = Address1;
            vnd._Address2 = Address2;
            vnd._Pin = Pin;
            vnd._City = City;
            vnd._CountryCd = CountryCd;
            vnd._StateCd = StateCd;
            vnd._PhoneNo = PhoneNo;
            vnd._AlternateNo = AlternateNo;
            vnd._FaxNo = FaxNo;
            vnd._ContactPerson = ContactPerson;
            vnd._Email = Email;
            vnd._Website = Website;

            string PrePmtPer = requestdata.PrePmtPer;
            string PmtTermsCd = requestdata.PmtTermsCd;
            string PmtMethodCd = requestdata.PmtMethodCd;
            string PriceIncludeST = requestdata.PriceIncludeST;
            string VendBankId = requestdata.VendBankId;
            string PrintNameOnCheque = requestdata.PrintNameOnCheque;
            vnd._PrePmtPer = PrePmtPer;
            vnd._PmtTermsCd = PmtTermsCd;
            vnd._PmtMethodCd = PmtMethodCd;
            vnd._PriceIncludeST = PriceIncludeST;
            vnd._VendBankId = VendBankId;
            vnd._PrintNameOnCheque = PrintNameOnCheque;

            string ShipMethodCd = requestdata.ShipMethodCd;
            string LeadTimeInDay = requestdata.LeadTimeInDay;
            vnd._ShipMethodCd = ShipMethodCd;
            vnd._LeadTimeInDay = LeadTimeInDay;

            string TaxAcNo = requestdata.TaxAcNo;
            string Is1099App = requestdata.Is1099App;
            string BusinessNatureCd = requestdata.BusinessNatureCd;
            string GstRegdNo = requestdata.GstRegdNo;
            string IsWitholdingTaxApp = requestdata.IsWitholdingTaxApp;
            string WHTaxGrpCd = requestdata.WHTaxGrpCd;
            string TaxExampNo = requestdata.TaxExampNo;
            string SalesTaxGrpCd = requestdata.SalesTaxGrpCd;
            vnd._TaxAcNo = TaxAcNo;
            vnd._Is1099App = Is1099App;
            vnd._BusinessNatureCd = BusinessNatureCd;
            vnd._GstRegdNo = GstRegdNo;
            vnd._IsWitholdingTaxApp = IsWitholdingTaxApp;
            vnd._WHTaxGrpCd = WHTaxGrpCd;
            vnd._TaxExampNo = TaxExampNo;
            vnd._SalesTaxGrpCd = SalesTaxGrpCd;

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

            vendraccountoverview vnd = new vendraccountoverview();
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

            vendraccountoverview vnd = new vendraccountoverview();
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

            vendraccountoverview vnd = new vendraccountoverview();
            vnd._mode = "checkref";
            vnd._rowid = _id;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

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

            BankPostingGroup bpg = new BankPostingGroup();
            bpg._mode = "modifybank";
            bpg._rowid = bpgid;
            bpg._code = bpgcode;
            bpg._bankledger = acledger;
            //bpg._isblock = isblock; //Pran on 2021.05.23
            bpg._createdby = HttpContext.Current.Session["userid"].ToString();
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