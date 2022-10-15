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
    public partial class customer_shipment_term : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadCustomerPaymentTerm(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string cocd = requestdata.cocd;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            PaymentTerms vnd = new PaymentTerms();
            vnd.VC = "C";
            vnd.CoCd = cocd;
            DataSet ds = vnd.GetVendorMethod(_connectionstring, ref _catchmessage);

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

            PaymentTerms vnd = new PaymentTerms();
            vnd.Mode = "check";
            vnd.RowId = _id;
            vnd.PmtTermsCd = _code;
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
            PaymentTerms vnd = new PaymentTerms();
            vnd.Mode = "modify";

            string id = requestdata.id;
            string code = requestdata.code;
            string Desc = requestdata.Desc;
            string cocd = requestdata.cocd;
            string Pay_type = requestdata.Pay_type;
            string PaymenttermP = requestdata.PaymenttermP;
            string Period_type = requestdata.Period_type;
            string Dis_Cal_Period = requestdata.Dis_Cal_Period;
            string Discount = requestdata.Discount;
            bool Caldismemo = requestdata.Caldismemo;
            bool Block = requestdata.Block;

            vnd.RowId = id;
            vnd.CoCd = cocd;

            vnd.PmtTermsCd = code;
            vnd.PmtTermsDesc = Desc;
            vnd.PmtPaymentType = Pay_type;
            vnd.PmtTermsPeriod = PaymenttermP;
            vnd.DiscPeriodType = Period_type;
            vnd.DiscCalcPeriod = Dis_Cal_Period;
            vnd.DiscPer = Discount;
            vnd.CalcDiscOnReturn = Caldismemo;
            vnd.IsBlock = Block;
            vnd.VC = "C";

            string ip = requestdata.ip;
            vnd.creator_MAC_add = ip;

            vnd.created_by = HttpContext.Current.Session["userid"].ToString();

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
            string cocd = requestdata.cocd;
            //string isblock = requestdata.isblock; 

            PaymentTerms vnd = new PaymentTerms();
            vnd.Mode = "getbyid";
            vnd.RowId = id;
            vnd.VC = "C";
            vnd.CoCd = cocd;

            //vnd._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = vnd.GetVendorMethod(_connectionstring, ref _catchmessage);

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

            PaymentTerms vnd = new PaymentTerms();
            vnd.Mode = "delete";
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

            PaymentTerms vnd = new PaymentTerms();
            vnd.Mode = "checkref";
            vnd.RowId = _id;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }
    }
}