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
    public partial class procurement_setup : System.Web.UI.Page
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
            procurementsetup vnd = new procurementsetup();
            vnd._mode = "modify";

            string cocd = requestdata.cocd;
            vnd._CoCd = cocd;

            string PostingFrom = requestdata.PostingFrom;
            string PostingTo = requestdata.PostingTo;
            string AcceptOverdelivery = requestdata.AcceptOverdelivery;
            string AcceptUnderdelivery = requestdata.AcceptUnderdelivery;
            string VendorMasterNo = requestdata.VendorMasterNo;
            string QuotNo = requestdata.QuotNo;
            string BlanketOrderNo = requestdata.BlanketOrderNo;
            string BlanketOrderReleaseNo = requestdata.BlanketOrderReleaseNo;
            string PONo = requestdata.PONo;
            string POConfNo = requestdata.POConfNo;
            string Request_QuotNo = requestdata.Request_QuotNo;
            string QuotConfNo = requestdata.QuotConfNo;
            string ReturnOrderNo = requestdata.ReturnOrderNo;
            string PurchaseJournal = requestdata.PurchaseJournal;
            string isblocked = requestdata.isblocked;
            string ip = requestdata.ip;


            vnd._PostingFrom = PostingFrom;
            vnd._PostingTo = PostingTo;
            vnd._AcceptOverdelivery = AcceptOverdelivery;
            vnd._AcceptUnderdelivery = AcceptUnderdelivery;
            vnd._VendorMasterNo = VendorMasterNo;
            vnd._QuotNo = QuotNo;
            vnd._BlanketOrderNo = BlanketOrderNo;
            vnd._BlanketOrderReleaseNo = BlanketOrderReleaseNo;
            vnd._PONo = PONo;
            vnd._POConfNo = POConfNo;
            vnd._Request_QuotNo = Request_QuotNo;
            vnd._QuotConfNo = QuotConfNo;
            vnd._ReturnOrderNo = ReturnOrderNo;
            vnd._PurchaseJournal = PurchaseJournal;
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

            procurementsetup vnd = new procurementsetup();
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