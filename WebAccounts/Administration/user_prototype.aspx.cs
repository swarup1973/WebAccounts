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
using WebAccounts.Common;

namespace WebAccounts
{
    public partial class user_prototype : System.Web.UI.Page
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
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
            string _userid = requestdata.userid;
            string _cocd = requestdata.cocd;
            string _mode = requestdata.mode;
            if (string.IsNullOrEmpty(_userid))
            {
               _userid = HttpContext.Current.Session["userid"].ToString();
            }

            Administrator_User user = new Administrator_User();
            user._userid = _userid;
            user._CoCd = _cocd;
            user._mode = _mode;
            DataSet ds = user.GetEmployee(_connectionstring, ref _catchmessage);

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
        public static string loaduserlist(string CoCd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Administrator_User user = new Administrator_User();
            user._mode = "getlist";
            user._userid = string.Empty;
            user._CoCd = CoCd;

            if (string.IsNullOrEmpty(user._userid))
            {
                user._userid = HttpContext.Current.Session["userid"].ToString();
            }
            DataSet ds = user.UserOperation(_connectionstring, ref _catchmessage);

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
        public static string docheckuser(string userid, string empid)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _userid = userid;
            string _empid = empid;

            Administrator_User user = new Administrator_User();
            user._mode = "checkuser";
            user._userid = _userid;
            user._empid = _empid;

            isaccodeexists = user.checkusercode(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string docheckloginname(string userid, string loginname)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _userid = userid;
            string _loginname = loginname;

            Administrator_User user = new Administrator_User();
            user._mode = "checkloginname";
            user._userid = _userid;
            user._loginname = _loginname;

            isaccodeexists = user.checkusercode(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string doSaveUser(string data)
        {
            clsCommon FobjCom = new clsCommon();
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            StringBuilder _CoCdstring = null;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string userid = requestdata.userid;
            string empid = requestdata.empid;
            string password = requestdata.password;
            string loginname = requestdata.loginname;
            string postingfrom = requestdata.postingfrom;
            string postingto = requestdata.postingto;
            string isblock = requestdata.isblock;
            string UTypeCd = requestdata.UTypeCd;
            string[] CoCd = requestdata.CoCd.ToObject<string[]>();

            _CoCdstring = new StringBuilder();

            _CoCdstring.Append("<Table>");
            for (var i = 0; i < CoCd.Length; i++)
            {
                if (CoCd[i] != null)
                {
                    _CoCdstring.Append("<Row>");
                    _CoCdstring.Append(FobjCom.SetXMLAttributes("UserId", userid==null?"0": userid));
                    _CoCdstring.Append(FobjCom.SetXMLAttributes("CoCd", CoCd[i].ToString()));
                    _CoCdstring.Append(FobjCom.SetXMLAttributes("rowid", i.ToString()));
                    _CoCdstring.Append("</Row>");
                }
            }
            _CoCdstring.Append("</Table>");

            Administrator_User user = new Administrator_User();
            user._mode = "usermodify";
            user._userid = userid;
            user._empid = empid;
            user._password = password;
            user._loginname = loginname;
            user._postingfrom = postingfrom;
            user._postingto = postingto;
            user._isblock = isblock;
            user._UTupeCd = UTypeCd;
            user._CoCd = _CoCdstring.ToString();
            user._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = user.UserOperation(_connectionstring, ref _catchmessage);

            if (ds.Tables[0].Rows.Count > 0)
            {
                ok = true;
                _ret= ds.Tables[0].Rows[0]["userid"].ToString();
            }

            return ok.ToString() + "|~|" + _ret;
        }

        [System.Web.Services.WebMethod]
        public static string doeditUser(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string _userid = requestdata.userid;

            Administrator_User user = new Administrator_User();
            user._mode = "getuserbyid";
            user._userid = _userid;

            user._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = user.UserOperation(_connectionstring, ref _catchmessage);

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
        public static string dodelete(string userid)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _userid = userid;

            Administrator_User user = new Administrator_User();
            user._mode = "deleteuser";
            user._userid = _userid;


            isaccodeexists = user.checkusercode(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }
    }
}