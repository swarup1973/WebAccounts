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
    public partial class customer_overview : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadCustomerOverviewlist(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string cocd = requestdata.cocd;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            customeroverview vnd = new customeroverview();
            vnd.mode = "getlist";
            vnd.CustCd = string.Empty;
            vnd.CoCd = cocd;
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

            customeroverview vnd = new customeroverview();
            vnd.mode = "check";
            vnd.RowId = _id;
            vnd.CustCd = _code;
            vnd.CoCd = _cocd;

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
            customeroverview vnd = new customeroverview();
            vnd.mode = "modify";

            string id = requestdata.id;
            string cocd = requestdata.cocd;
            vnd.RowId = id;
            vnd.CoCd = cocd;

            string CustCd = requestdata.CustCd;
            string CustName = requestdata.CustName;
            string CustSearch = requestdata.CustSearch;
            string CurrCd = requestdata.CurrCd;
            string CrLimit = requestdata.CrLimit;
            string CustGrpCd = requestdata.CustGrpCd;
            string IsForeignCust = requestdata.IsForeignCust;
            string GovtIdNo = requestdata.GovtIdNo;
            string BranchCd = requestdata.BranchCd;
            string EntityType = requestdata.EntityType;
            string PersonRespId = requestdata.PersonRespId;
            string Block = requestdata.Block;

            vnd.CustCd = CustCd;
            vnd.CustName = CustName;
            vnd.CustSearch = CustSearch;
            vnd.CurrCd = CurrCd;
            vnd.CrLimit = CrLimit;
            vnd.CustGrpCd = CustGrpCd;
            vnd.IsForeignCust = IsForeignCust;
            vnd.GovtIdNo = GovtIdNo;
            vnd.BranchCd = BranchCd;
            vnd.EntityType = EntityType;
            vnd.PersonRespId = PersonRespId;
            vnd.Block = Block;

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
            vnd.Address1 = Address1;
            vnd.Address2 = Address2;
            vnd.Pin = Pin;
            vnd.City = City;
            vnd.CountryCd = CountryCd;
            vnd.StateCd = StateCd;
            vnd.PhoneNo = PhoneNo;
            vnd.AlternateNo = AlternateNo;
            vnd.FaxNo = FaxNo;
            vnd.ContactPerson = ContactPerson;
            vnd.Email = Email;
            vnd.Website = Website;

            string BillToCust = requestdata.BillToCust;
            string PrePmtPer = requestdata.PrePmtPer;
            string PmtTermsCd = requestdata.PmtTermsCd;
            string PmtMethodCd = requestdata.PmtMethodCd;
            string FinChgTermCd = requestdata.FinChgTermCd;
            string DiscTollerancePer = requestdata.DiscTollerancePer;
            string PriceIncludeST = requestdata.PriceIncludeST;
            
            vnd.BillToCust = BillToCust;
            vnd.PrePmtPer = PrePmtPer;
            vnd.PmtTermsCd = PmtTermsCd;
            vnd.PmtMethodCd = PmtMethodCd;
            vnd.FinChgTermCd = FinChgTermCd;
            vnd.DiscTollerancePer = DiscTollerancePer;
            vnd.PriceIncludeST = PriceIncludeST;

            string ShipMethodCd = requestdata.ShipMethodCd;
            string LeadTimeInDay = requestdata.LeadTimeInDay;
            string Reserve = requestdata.Reserve;

            vnd.ShipMethodCd = ShipMethodCd;
            vnd.LeadTimeInDay = LeadTimeInDay;
            vnd.Reserve = Reserve;

            string ShipAddSameAsPrimary = requestdata.ShipAddSameAsPrimary;
            vnd.ShipAddSameAsPrimary = ShipAddSameAsPrimary;

            string ShipToName = requestdata.ShipToName;
            string Ship_Address1 = requestdata.Ship_Address1;
            string Ship_Address2 = requestdata.Ship_Address2;
            string Ship_Pin = requestdata.Ship_Pin;
            string Ship_City = requestdata.Ship_City;
            string Ship_CountryCd = requestdata.Ship_CountryCd;
            string Ship_StateCd = requestdata.Ship_StateCd;

            vnd.ShipToName = ShipToName;
            vnd.Ship_Address1 = Ship_Address1;
            vnd.Ship_Address2 = Ship_Address2;
            vnd.Ship_Pin = Ship_Pin;
            vnd.Ship_City = Ship_City;
            vnd.Ship_CountryCd = Ship_CountryCd;
            vnd.Ship_StateCd = Ship_StateCd;

            string Ship_PhoneNo = requestdata.Ship_PhoneNo;
            string Ship_AlternateNo = requestdata.Ship_AlternateNo;
            string Ship_FaxNo = requestdata.Ship_FaxNo;
            string Ship_ContactPerson = requestdata.Ship_ContactPerson;
            string Ship_Email = requestdata.Ship_Email;
            string Ship_Website = requestdata.Ship_Website;

            vnd.Ship_PhoneNo = Ship_PhoneNo;
            vnd.Ship_AlternateNo = Ship_AlternateNo;
            vnd.Ship_FaxNo = Ship_FaxNo;
            vnd.Ship_ContactPerson = Ship_ContactPerson;
            vnd.Ship_Email = Ship_Email;
            vnd.Ship_Website = Ship_Website;

            string InvAddSameAsPrimary = requestdata.InvAddSameAsPrimary;
            string InvToName = requestdata.InvToName;
            string Inv_Address1 = requestdata.Inv_Address1;
            string Inv_Address2 = requestdata.Inv_Address2;
            string Inv_Pin = requestdata.Inv_Pin;
            string Inv_City = requestdata.Inv_City;
            string Inv_CountryCd = requestdata.Inv_CountryCd;
            string Inv_StateCd = requestdata.Inv_StateCd;

            vnd.InvAddSameAsPrimary = InvAddSameAsPrimary;
            vnd.InvToName = InvToName;
            vnd.Inv_Address1 = Inv_Address1;
            vnd.Inv_Address2 = Inv_Address2;
            vnd.Inv_Pin = Inv_Pin;
            vnd.Inv_City = Inv_City;
            vnd.Inv_CountryCd = Inv_CountryCd;
            vnd.Inv_StateCd = Inv_StateCd;

            string InvAddSameAsShip = requestdata.InvAddSameAsShip;
            vnd.InvAddSameAsShip = InvAddSameAsShip;

            string Inv_PhoneNo = requestdata.Inv_PhoneNo;
            string Inv_AlternateNo = requestdata.Inv_AlternateNo;
            string Inv_FaxNo = requestdata.Inv_FaxNo;
            string Inv_ContactPerson = requestdata.Inv_ContactPerson;
            string Inv_Email = requestdata.Inv_Email;
            string Inv_Website = requestdata.Inv_Website;

            vnd.Inv_PhoneNo = Inv_PhoneNo;
            vnd.Inv_AlternateNo = Inv_AlternateNo;
            vnd.Inv_FaxNo = Inv_FaxNo;
            vnd.Inv_ContactPerson = Inv_ContactPerson;
            vnd.Inv_Email = Inv_Email;
            vnd.Inv_Website = Inv_Website;

            string TaxAcNo = requestdata.TaxAcNo;
            string BusinessNatureCd = requestdata.BusinessNatureCd;
            string GstRegdNo = requestdata.GstRegdNo;
            string TaxExampNo = requestdata.TaxExampNo;
            string SalesTaxGrpCd = requestdata.SalesTaxGrpCd;

            vnd.TaxAcNo = TaxAcNo;
            vnd.BusinessNatureCd = BusinessNatureCd;
            vnd.GstRegdNo = GstRegdNo;
            vnd.TaxExampNo = TaxExampNo;
            vnd.SalesTaxGrpCd = SalesTaxGrpCd;

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

            customeroverview vnd = new customeroverview();
            vnd.mode = "getbyid";
            vnd.RowId = id;

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

            customeroverview vnd = new customeroverview();
            vnd.mode = "delete";
            vnd.RowId = _id;

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

            customeroverview vnd = new customeroverview();
            vnd.mode = "checkref";
            vnd.RowId = _id;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }


    }
}