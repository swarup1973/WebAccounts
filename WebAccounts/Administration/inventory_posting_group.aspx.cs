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
    public partial class inventory_posting_group : System.Web.UI.Page
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
            InventoryPostingGroup bpg = new InventoryPostingGroup();
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

            InventoryPostingGroup bpg = new InventoryPostingGroup();
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
            string isblock = requestdata.isblock;
            string cocd = requestdata.cocd;

            InventoryPostingGroup bpg = new InventoryPostingGroup();
            bpg._mode = "modify";
            bpg._rowid = bpgid;
            bpg._code = bpgcode;
            bpg._name = description;
            bpg._isblock = isblock;
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
            string isblock = requestdata.isblock; //Pran on 2021.05.27
            string cocd = requestdata.cocd;

            InventoryPostingGroup bpg = new InventoryPostingGroup();
            bpg._mode = "getbyid";
            bpg._rowid = bpgid;
            bpg._isblock = isblock; //Pran on 2021.05.27

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

            InventoryPostingGroup bpg = new InventoryPostingGroup();
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

            string AcCd_Sales = requestdata.AcCd_Sales;
            string AcCd_SalesReturnCrMemo = requestdata.AcCd_SalesReturnCrMemo;
            string AcCd_SalesItemDisc = requestdata.AcCd_SalesItemDisc;
            string AcCd_SalesInvoiceDisc = requestdata.AcCd_SalesInvoiceDisc;

            string AcCd_Purchase = requestdata.AcCd_Purchase;
            string AcCd_PurchReturnCrMemo = requestdata.AcCd_PurchReturnCrMemo;
            string AcCd_PurchItemDisc = requestdata.AcCd_PurchItemDisc;
            string AcCd_PurchInvoiceDisc = requestdata.AcCd_PurchInvoiceDisc;

            string AcCd_Inventory = requestdata.AcCd_Inventory;
            string AcCd_InventoryPL = requestdata.AcCd_InventoryPL;
            string AcCd_InventoryAppliedCostPurch = requestdata.AcCd_InventoryAppliedCostPurch;
            string AcCd_InventoryCGS = requestdata.AcCd_InventoryCGS;
            string AcCd_InventoryPurchVarience = requestdata.AcCd_InventoryPurchVarience;

            string AcCd_ECR_ExpCostOfPurch = requestdata.AcCd_ECR_ExpCostOfPurch;
            string AcCd_ECR_ExpLiaForPurch = requestdata.AcCd_ECR_ExpLiaForPurch;
            string AcCd_ECR_ExpReceivable = requestdata.AcCd_ECR_ExpReceivable;
            string AcCd_ECR_ExpCOGS = requestdata.AcCd_ECR_ExpCOGS;

            //string isblock = requestdata.isblock; //Pran on 2021.05.27
            string cocd = requestdata.cocd;

            InventoryPostingGroup bpg = new InventoryPostingGroup();
            bpg._mode = "modifybank";
            bpg._rowid = bpgid;
            bpg._code = bpgcode;

            bpg._AcCd_Sales = AcCd_Sales;
            bpg._AcCd_SalesReturnCrMemo = AcCd_SalesReturnCrMemo;
            bpg._AcCd_SalesItemDisc = AcCd_SalesItemDisc;
            bpg._AcCd_SalesInvoiceDisc = AcCd_SalesInvoiceDisc;

            bpg._AcCd_Purchase = AcCd_Purchase;
            bpg._AcCd_PurchReturnCrMemo = AcCd_PurchReturnCrMemo;
            bpg._AcCd_PurchItemDisc = AcCd_PurchItemDisc;
            bpg._AcCd_PurchInvoiceDisc = AcCd_PurchInvoiceDisc;

            bpg._AcCd_Inventory = AcCd_Inventory;
            bpg._AcCd_InventoryPL = AcCd_InventoryPL;
            bpg._AcCd_InventoryAppliedCostPurch = AcCd_InventoryAppliedCostPurch;
            bpg._AcCd_InventoryCGS = AcCd_InventoryCGS;
            bpg._AcCd_InventoryPurchVarience = AcCd_InventoryPurchVarience;

            bpg._AcCd_ECR_ExpCostOfPurch = AcCd_ECR_ExpCostOfPurch;
            bpg._AcCd_ECR_ExpLiaForPurch = AcCd_ECR_ExpLiaForPurch;
            bpg._AcCd_ECR_ExpReceivable = AcCd_ECR_ExpReceivable;
            bpg._AcCd_ECR_ExpCOGS = AcCd_ECR_ExpCOGS;

            //bpg._isblock = isblock; //Pran on 2021.05.27

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