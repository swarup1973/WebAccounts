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
    public partial class payables_setup : System.Web.UI.Page
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
            PayableSetup vnd = new PayableSetup();
            vnd._mode = "modify";

            string cocd = requestdata.cocd;
            vnd._CoCd = cocd;

            string PostingFrom = requestdata.PostingFrom;
            string PostingTo = requestdata.PostingTo;
            string ExDocNoRequirement = requestdata.ExDocNoRequirement;
            string ExRateAdj = requestdata.ExRateAdj;
            string InvoiceVchNo = requestdata.InvoiceVchNo;
            string CreditMemoNo = requestdata.CreditMemoNo;
            string ReceiptListNo = requestdata.ReceiptListNo;
            string ReceiptListVchNo = requestdata.ReceiptListVchNo;
            string isblocked = requestdata.isblocked;
            string ip = requestdata.ip;

            vnd._PostingFrom = PostingFrom;
            vnd._PostingTo = PostingTo;
            vnd._ExDocNoRequirement = ExDocNoRequirement;
            vnd._ExRateAdj = ExRateAdj;
            vnd._InvoiceVchNo = InvoiceVchNo;
            vnd._CreditMemoNo = CreditMemoNo;
            vnd._ReceiptListNo = ReceiptListNo;
            vnd._ReceiptListVchNo = ReceiptListVchNo;

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

            PayableSetup vnd = new PayableSetup();
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