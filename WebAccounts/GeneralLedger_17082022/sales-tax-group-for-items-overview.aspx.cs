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
    public partial class sales_tax_group_for_items_overview : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadlookupdata(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
            string cocd = requestdata.cocd;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            SalesTaxGroupItem com = new SalesTaxGroupItem();
            com._CoCd = cocd;
            com._module = "SalesTaxComponentSetup";
            com._mode = "loadlookup";
            DataSet ds = com.Operation(_connectionstring, ref _catchmessage);

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
        public static string loadVendorAccountOverviewlist(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string cocd = requestdata.cocd;
            string module= requestdata.module;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            SalesTaxGroupItem vnd = new SalesTaxGroupItem();
            vnd._module = module;
            vnd._mode = "getlist";
            if(module== "SalesTaxComponentSetup")
            {
                vnd._SalesTaxGrpId = requestdata.SalesTaxGrpId;
            }
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
        public static string docheckcode(string id, string code, string cocd, string module)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;
            string _code = code;
            string _cocd = cocd;
            string _module = module;

            SalesTaxGroupItem vnd = new SalesTaxGroupItem();
            vnd._module = _module;
            vnd._mode = "check";
            vnd._rowid = _id;
            vnd._SalesTaxGrpCd = _code;
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
            SalesTaxGroupItem vnd = new SalesTaxGroupItem();
            vnd._mode = "modify";

            string id = requestdata.id;
            string cocd = requestdata.cocd;
            string module = requestdata.module;
            vnd._rowid = id;
            vnd._CoCd = cocd;
            vnd._module = module;
            vnd._SalesTaxGrpCd = requestdata.code;
            vnd._SalesTaxGrpDesc = requestdata.SaleTaxCompDesc;
            string isblock = requestdata.isblock;
            vnd._Block = isblock;

            /*string code = requestdata.code;
            vnd._SaleTaxCompCd = code;
            string SaleTaxCompDesc = requestdata.SaleTaxCompDesc;
            vnd._SaleTaxCompDesc = SaleTaxCompDesc;
            string TaxJurisdictionId = requestdata.TaxJurisdictionId;
            vnd._TaxJurisdictionId = TaxJurisdictionId;
            string ROffTo = requestdata.ROffTo;
            vnd._ROffTo = ROffTo;
            string ROffRule = requestdata.ROffRule;
            vnd._ROffRule = ROffRule;
            string SettleId = requestdata.SettleId;
            vnd._SettleId = SettleId;
            string AcId_SaleTaxPayable = requestdata.AcId_SaleTaxPayable;
            vnd._AcId_SaleTaxPayable = AcId_SaleTaxPayable;
            string AcId_UseTaxPayable = requestdata.AcId_UseTaxPayable;
            vnd._AcId_UseTaxPayable = AcId_UseTaxPayable;
            string AcId_TaxSettlement = requestdata.AcId_TaxSettlement;
            vnd._AcId_TaxSettlement = AcId_TaxSettlement;
            string MethodOfCalc = requestdata.MethodOfCalc;
            vnd._MethodOfCalc = MethodOfCalc;
            string BasisOfCalc = requestdata.BasisOfCalc;
            vnd._BasisOfCalc = BasisOfCalc;
            string TaxOnTax = requestdata.TaxOnTax;
            vnd._TaxOnTax = TaxOnTax;
            string Unit = requestdata.Unit;
            vnd._Unit = Unit;
            string isblock = requestdata.isblock;
            vnd._IsBlock = isblock;*/

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
            string module = requestdata.module;

            string id = requestdata.id;
            //string isblock = requestdata.isblock; 

            SalesTaxGroupItem vnd = new SalesTaxGroupItem();
            vnd._mode = "getbyid";
            vnd._rowid = id;
            vnd._module = module;

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
        public static string dodelete(string id , string module)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;

            SalesTaxGroupItem vnd = new SalesTaxGroupItem();
            vnd._mode = "delete";
            vnd._rowid = _id;
            vnd._module = module;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string docheckdelete(string id, string module)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;

            SalesTaxGroupItem vnd = new SalesTaxGroupItem();
            vnd._mode = "checkref";
            vnd._rowid = _id;
            vnd._module = module;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

    }
}