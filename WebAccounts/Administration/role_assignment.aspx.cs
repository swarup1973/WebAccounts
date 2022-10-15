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
    public partial class role_assignment : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadlookupdata(string CoCd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Administrator_RoleUser_Assignment roleassign = new Administrator_RoleUser_Assignment();
            roleassign._mode = "loadlookup";
            roleassign._cocd = CoCd;
            DataSet ds = roleassign.RoleAssignmentOperation(_connectionstring, ref _catchmessage);

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
        public static string loaduserroles(string userid)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Administrator_RoleUser_Assignment roleassign = new Administrator_RoleUser_Assignment();
            roleassign._mode = "getuserassignment";
            roleassign._userid = userid;
            DataSet ds = roleassign.RoleAssignmentOperation(_connectionstring, ref _catchmessage);

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
        public static string loadroleusers(string rolecode)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Administrator_RoleUser_Assignment roleassign = new Administrator_RoleUser_Assignment();
            roleassign._mode = "getroleassignment";
            roleassign._rolecd = rolecode;
            DataSet ds = roleassign.RoleAssignmentOperation(_connectionstring, ref _catchmessage);

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
        public static string docheckdataexist(string userid, string rolecode)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _userid = userid;
            string _rolecode = rolecode;

            Administrator_RoleUser_Assignment roleassign = new Administrator_RoleUser_Assignment();
            roleassign._mode = "checkuser";
            roleassign._userid = _userid;
            roleassign._rolecd = _rolecode;

            isaccodeexists = roleassign.checkdataexist(_connectionstring, ref _catchmessage);

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

            string id = requestdata.id;
            string rolecode = requestdata.rolecode;
            string userid = requestdata.userid;
            string isdefaultrole = requestdata.isdefaultrole;
            string cocd = requestdata.cocd;

            Administrator_RoleUser_Assignment roleassign = new Administrator_RoleUser_Assignment();
            roleassign._mode = "modify";
            roleassign._id = id;
            roleassign._userid = userid;
            roleassign._rolecd = rolecode;
            roleassign._isdefaultrole = isdefaultrole;
            roleassign._createdby = HttpContext.Current.Session["userid"].ToString();
            roleassign._cocd = cocd;
            DataSet ds = roleassign.RoleAssignmentOperation(_connectionstring, ref _catchmessage);

            if (ds.Tables[0].Rows.Count > 0)
            {
                ok = true;
                _ret = ds.Tables[0].Rows[0]["rowid"].ToString();
            }

            return ok.ToString() + "|~|" + _ret;
        }

        [System.Web.Services.WebMethod]
        public static string dodelete(string rowid)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _rowid = rowid;

            Administrator_RoleUser_Assignment roleassign = new Administrator_RoleUser_Assignment();
            roleassign._mode = "delete";
            roleassign._id = _rowid;

            isaccodeexists = roleassign.checkdataexist(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }
    }
}