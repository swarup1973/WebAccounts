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
    public partial class journal_batch : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }


        [System.Web.Services.WebMethod]
        public static string loadlist(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string cocd = requestdata.cocd;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            JournalBatch vnd = new JournalBatch();
            vnd._mode = "getlist";
            vnd._BatchCd= string.Empty;
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
        public static string loadlookupdata(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
            string cocd = requestdata.cocd;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            JournalBatch vnd = new JournalBatch();
            vnd._CoCd = cocd;
            DataSet ds = vnd.getLookup(_connectionstring, ref _catchmessage);

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

            JournalBatch vnd = new JournalBatch();
            vnd._mode = "check";
            vnd._rowid = _id;
            vnd._BatchCd = _code;
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
            JournalBatch vnd = new JournalBatch();
            vnd._mode = "modify";

            string id = requestdata.id;
            string cocd = requestdata.cocd;
            vnd._rowid = id;
            vnd._CoCd = cocd;

            string code = requestdata.code;
            string BatchDesc = requestdata.BatchDesc;
            string DocTypeId = requestdata.DocTypeId;
            string TranTypeId= requestdata.TranTypeId;
            string DrAcType = requestdata.DrAcType;
            string DrAcNo = requestdata.DrAcNo;
            string CrAcType = requestdata.CrAcType;
            string CrAcNo = requestdata.CrAcNo;
            string NoSequenceId = requestdata.NoSequenceId;
            string ApprovalCode = requestdata.ApprovalCode;
            string UserType = requestdata.UserType;
            string UserTypeId = requestdata.UserTypeId;

            string ApplyGenJrnl = requestdata.ApplyGenJrnl;
            string ApplyPurJrnl = requestdata.ApplyPurJrnl;
            string ApplySalesJrnl = requestdata.ApplySalesJrnl;
            string ApplyRecptJrnl = requestdata.ApplyRecptJrnl;
            string ApplyPmtJrnl = requestdata.ApplyPmtJrnl;
            string ApplyFAJrnl = requestdata.ApplyFAJrnl;
            string ApplyPayJrnl = requestdata.ApplyPayJrnl;

            string isblocked = requestdata.isblocked;

            vnd._BatchCd = code;
            vnd._BatchDesc = BatchDesc;
            vnd._IsBlock = isblocked;
            vnd._DocTypeId = DocTypeId;
            vnd._TranTypeId = TranTypeId;
            vnd._DrAcType = DrAcType;
            vnd._DrAcNo = DrAcNo;
            vnd._CrAcType = CrAcType;
            vnd._CrAcNo = CrAcNo;
            vnd._NoSequenceId = NoSequenceId;
            vnd._ApprovalCode = ApprovalCode;
            vnd._UserType = UserType;
            vnd._UserTypeId = UserTypeId;

            vnd._ApplyGenJrnl = ApplyGenJrnl;
            vnd._ApplyPurJrnl = ApplyPurJrnl;
            vnd._ApplySalesJrnl = ApplySalesJrnl;
            vnd._ApplyRecptJrnl = ApplyRecptJrnl;
            vnd._ApplyPmtJrnl = ApplyPmtJrnl;
            vnd._ApplyFAJrnl = ApplyFAJrnl;
            vnd._ApplyPayJrnl = ApplyPayJrnl;
            vnd._IsBlock = isblocked;

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

            JournalBatch vnd = new JournalBatch();
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

            JournalBatch vnd = new JournalBatch();
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

            JournalBatch vnd = new JournalBatch();
            vnd._mode = "checkref";
            vnd._rowid = _id;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }
    }
}