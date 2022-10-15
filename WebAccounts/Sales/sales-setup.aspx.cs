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
    public partial class sales_setup : System.Web.UI.Page
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
            salessetup vnd = new salessetup();
            vnd._mode = "modify";

            string cocd = requestdata.cocd;
            vnd._CoCd = cocd;

            string TaxCalcBasis = requestdata.TaxCalcBasis;
            string SalespersonDimCd = requestdata.SalespersonDimCd;
            string Reservation = requestdata.Reservation;
            string PostingFrom = requestdata.PostingFrom;
            string PostingTo = requestdata.PostingTo;
            string SalesLeadTime = requestdata.SalesLeadTime;
            string OverdueWarning = requestdata.OverdueWarning;
            string CreditLimitWarning = requestdata.CreditLimitWarning;
            string PickRequirement = requestdata.PickRequirement;
            string CustomerNo = requestdata.CustomerNo;
            string QuotNo = requestdata.QuotNo;
            string QuotConfNo = requestdata.QuotConfNo;
            string BlanketOrderNo = requestdata.BlanketOrderNo;
            string BlanketOrderReleaseNo = requestdata.BlanketOrderReleaseNo;
            string SalesOrderNo = requestdata.SalesOrderNo;
            string SalesOrderConfNo = requestdata.SalesOrderConfNo;
            string SalesJournalNo = requestdata.SalesJournalNo;
            string ReturnOrderNo = requestdata.ReturnOrderNo;
            string ExchangeRateAdj = requestdata.ExchangeRateAdj;
            string InvoiceNo = requestdata.InvoiceNo;
            string isblocked = requestdata.isblocked;
            string ip = requestdata.ip;

            vnd._TaxCalcBasis=TaxCalcBasis;
            vnd._SalespersonDimCd=SalespersonDimCd;
            vnd._Reservation=Reservation;
            vnd._PostingFrom=PostingFrom;
            vnd._PostingTo=PostingTo;
            vnd._SalesLeadTime=SalesLeadTime;
            vnd._OverdueWarning=OverdueWarning;
            vnd._CreditLimitWarning=CreditLimitWarning;
            vnd._PickRequirement=PickRequirement;
            vnd._CustomerNo=CustomerNo;
            vnd._QuotNo=QuotNo;
            vnd._QuotConfNo=QuotConfNo;
            vnd._BlanketOrderNo=BlanketOrderNo;
            vnd._BlanketOrderReleaseNo=BlanketOrderReleaseNo;
            vnd._SalesOrderNo=SalesOrderNo;
            vnd._SalesOrderConfNo=SalesOrderConfNo;
            vnd._SalesJournalNo=SalesJournalNo;
            vnd._ReturnOrderNo=ReturnOrderNo;
            vnd._ExchangeRateAdj=ExchangeRateAdj;
            vnd._InvoiceNo=InvoiceNo;

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

            salessetup vnd = new salessetup();
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