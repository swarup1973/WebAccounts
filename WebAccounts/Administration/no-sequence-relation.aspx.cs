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
    public partial class no_sequence_relation : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadNoSequence(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string cocd = requestdata.cocd;
            string ns_code = requestdata.nscode;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            NoSequence ns = new NoSequence();
            ns._cocd = cocd;
            ns._nscode = ns_code;
            ns._related_flag = "Y";

            DataSet ds = ns.getSequence(_connectionstring, ref _catchmessage);

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
        public static string docheckcode(string id, string pid, string code, string cocd, string startdate, string enddate, string startno, string endno)
        {
            bool isaccodeexists = false; string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;
            string _code = code;
            string _cocd = cocd;
            string _pid = pid;
            string _startdate = startdate;
            string _enddate = enddate;
            string _startno = startno;
            string _endno = endno;

            NoSequence ns = new NoSequence();
            ns._mode = "check";
            ns._id = _id;
            ns._nscode = _code;
            ns._cocd = _cocd;
            ns._pid = _pid;
            ns._startdate = _startdate;
            ns._enddate = _enddate;
            ns._startingno = _startno;
            ns._endingno = _endno;

            //isaccodeexists = ns.check(_connectionstring, ref _catchmessage);
            DataSet ds = ns.validate(_connectionstring, ref _catchmessage);

            JSONString = JsonConvert.SerializeObject(ds);

            if (ds != null)
            {
                ds.Tables.Clear();
                ds.Dispose();
                ds = null;
            }
            return JSONString;
            //return Convert.ToString(isaccodeexists);

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
            NoSequence ns = new NoSequence();
            ns._mode = "modify";

            string id = requestdata.id;
            string cocd = requestdata.cocd;
            ns._id = id;
            ns._cocd = cocd;

            string code = requestdata.code;
            string Desc = requestdata.Desc;
            string StartDate = requestdata.StartDate;
            string EndDate = requestdata.EndDate;
            string StartNo = requestdata.StartNo;
            string EndNo = requestdata.EndNo;
            string NoInterval = requestdata.NoInterval;
            string Prefix = requestdata.Prefix;
            string Suffix = requestdata.Suffix;
            bool Manual = requestdata.Manual;
            bool Close = requestdata.Close;
            bool Block = requestdata.Block;
            ns._nscode = code;
            ns._nsdescription = Desc;
            ns._startdate = StartDate;
            ns._enddate = EndDate;
            ns._startingno = StartNo;
            ns._endingno = EndNo;
            ns._nointerval = NoInterval;
            ns._prefix = Prefix;
            ns._suffix = Suffix;
            ns._allowmanual = Manual;
            ns._closesequence = Close;
            ns._isblock = Block;

            string ip = requestdata.ip;
            ns._creator_MAC_add = ip;

            ns._createdby = HttpContext.Current.Session["userid"].ToString();

            DataSet ds = ns.Operation(_connectionstring, ref _catchmessage);

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
            string nscode = requestdata.nscode; 

            NoSequence ns = new NoSequence();
            ns._id = id;
            ns._cocd = cocd;
            ns._related_flag = "Y";
            ns._nscode = nscode;

            //vnd._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = ns.getSequence(_connectionstring, ref _catchmessage);

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

            NoSequence vnd = new NoSequence();
            vnd._mode = "delete";
            vnd._id = _id;

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

            NoSequence vnd = new NoSequence();
            vnd._mode = "checkref";
            vnd._id = _id;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }
    }
}