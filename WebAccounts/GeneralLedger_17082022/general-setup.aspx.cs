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
    public partial class general_setup : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.UrlReferrer == null)
            {
                Response.Redirect("../login.aspx");
            }
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
            GeneralSetup vnd = new GeneralSetup();
            vnd._mode = "modify";

            string cocd = requestdata.cocd;
            vnd._CoCd = cocd;

            string PostingFrom = requestdata.PostingFrom;
            string PostingTo = requestdata.PostingTo;
            string DiscTollerence = requestdata.DiscTollerence;
            string DiscTollerenceAmt = requestdata.DiscTollerenceAmt;
            string FinPostingOnItemRecpt = requestdata.FinPostingOnItemRecpt;
            string FinPostingOnPackingSlip = requestdata.FinPostingOnPackingSlip;
            string RetainedEarningAcCd = requestdata.RetainedEarningAcCd;
            string PLAcCd = requestdata.PLAcCd;
            string ExptdCostPosting = requestdata.ExptdCostPosting;
            string ExptdRevenuePosting = requestdata.ExptdRevenuePosting;
            string ExchangeRateServiceUrl = requestdata.ExchangeRateServiceUrl;
            string WHTaxRndingPrecision = requestdata.WHTaxRndingPrecision;
            string WHTaxDecPlaces = requestdata.WHTaxDecPlaces;
            string WHTaxRndingType = requestdata.WHTaxRndingType;
            string GSTRndingPrecision = requestdata.GSTRndingPrecision;
            string GSTDecPlaces = requestdata.GSTDecPlaces;
            string GSTRndingType = requestdata.GSTRndingType;
            string LCYRndingPrecision = requestdata.LCYRndingPrecision;
            string LCYDecPlaces = requestdata.LCYDecPlaces;
            string LCYRndingType = requestdata.LCYRndingType;
            string CustomsRndingPrecision = requestdata.CustomsRndingPrecision;
            string CustomsDecPlaces = requestdata.CustomsDecPlaces;
            string CustomsRndingType = requestdata.CustomsRndingType;
            string BankAcNo = requestdata.BankAcNo;
            string YearEndClosingBatchNo = requestdata.YearEndClosingBatchNo;
            string ExchangeAdjBatchNo = requestdata.ExchangeAdjBatchNo;
            string GLTranReversal = requestdata.GLTranReversal;
            string BudgetNo = requestdata.BudgetNo;
            string BudgetEntryNo = requestdata.BudgetEntryNo;
            string RevisedBudgetNo = requestdata.RevisedBudgetNo;
            string JournalBatchNo = requestdata.JournalBatchNo;
            string TranReversalVchNo = requestdata.TranReversalVchNo;
            string WHTaxPmtNo = requestdata.WHTaxPmtNo;
            string WHTaxAdjNo = requestdata.WHTaxAdjNo;
            string GSTPmtNo = requestdata.GSTPmtNo;
            string GSTAdjNo = requestdata.GSTAdjNo;
            string CustomsPmtNo = requestdata.CustomsPmtNo;
            string CustomsAdjNo = requestdata.CustomsAdjNo;
            string BankReconNo = requestdata.BankReconNo;
            string BankStatementNo = requestdata.BankStatementNo;
            string ActionExceedingBudgetLimit = requestdata.ActionExceedingBudgetLimit;
            string BudgetMinusUnpostedActualTran = requestdata.BudgetMinusUnpostedActualTran;
            string TaxCalculationDate = requestdata.TaxCalculationDate;
            string TaxCalculate = requestdata.TaxCalculate;
                   
            string isblocked = requestdata.isblocked;
            string ip = requestdata.ip;

            vnd._PostingFrom = PostingFrom;
            vnd._PostingTo = PostingTo;

            vnd._DiscTollerence = DiscTollerence;
            vnd._DiscTollerenceAmt = DiscTollerenceAmt;
            vnd._FinPostingOnItemRecpt = FinPostingOnItemRecpt;
            vnd._FinPostingOnPackingSlip = FinPostingOnPackingSlip;
            vnd._RetainedEarningAcCd = RetainedEarningAcCd;
            vnd._PLAcCd = PLAcCd;
            vnd._ExptdCostPosting = ExptdCostPosting;
            vnd._ExptdRevenuePosting = ExptdRevenuePosting;
            vnd._ExchangeRateServiceUrl = ExchangeRateServiceUrl;
            vnd._WHTaxRndingPrecision = WHTaxRndingPrecision;
            vnd._WHTaxDecPlaces = WHTaxDecPlaces;
            vnd._WHTaxRndingType = WHTaxRndingType;
            vnd._GSTRndingPrecision = GSTRndingPrecision;
            vnd._GSTDecPlaces = GSTDecPlaces;
            vnd._GSTRndingType = GSTRndingType;
            vnd._LCYRndingPrecision = LCYRndingPrecision;
            vnd._LCYDecPlaces = LCYDecPlaces;
            vnd._LCYRndingType = LCYRndingType;
            vnd._CustomsRndingPrecision = CustomsRndingPrecision;
            vnd._CustomsDecPlaces = CustomsDecPlaces;
            vnd._CustomsRndingType = CustomsRndingType;
            vnd._BankAcNo = BankAcNo;
            vnd._YearEndClosingBatchNo = YearEndClosingBatchNo;
            vnd._ExchangeAdjBatchNo = ExchangeAdjBatchNo;
            vnd._GLTranReversal = GLTranReversal;
            vnd._BudgetNo = BudgetNo;
            vnd._BudgetEntryNo = BudgetEntryNo;
            vnd._RevisedBudgetNo = RevisedBudgetNo;
            vnd._JournalBatchNo = JournalBatchNo;
            vnd._TranReversalVchNo = TranReversalVchNo;
            vnd._WHTaxPmtNo = WHTaxPmtNo;
            vnd._WHTaxAdjNo = WHTaxAdjNo;
            vnd._GSTPmtNo = GSTPmtNo;
            vnd._GSTAdjNo = GSTAdjNo;
            vnd._CustomsPmtNo = CustomsPmtNo;
            vnd._CustomsAdjNo = CustomsAdjNo;
            vnd._BankReconNo = BankReconNo;
            vnd._BankStatementNo = BankStatementNo;
            vnd._ActionExceedingBudgetLimit = ActionExceedingBudgetLimit;
            vnd._BudgetMinusUnpostedActualTran = BudgetMinusUnpostedActualTran;
            vnd._TaxCalculationDate = TaxCalculationDate;
            vnd._TaxCalculate = TaxCalculate;

            vnd._IsBlock = isblocked;
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

            string cocd = requestdata.cocd;
            //string isblock = requestdata.isblock; 

            GeneralSetup vnd = new GeneralSetup();
            vnd._mode = "getdetail";
            vnd._CoCd = cocd;

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
    }
}