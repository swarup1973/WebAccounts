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
    public partial class apply_dimension : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadlookupdata(string val)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Administrator_User_Dimension dimassign = new Administrator_User_Dimension();
            dimassign._mode = "loadlookup";
            DataSet ds = dimassign.RoleAssignmentOperation(_connectionstring, ref _catchmessage);

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
        public static string loaduserdimension(string userid)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Administrator_User_Dimension dimassign = new Administrator_User_Dimension();
            dimassign._mode = "getuserdimension";
            dimassign._userid = userid;
            DataSet ds = dimassign.RoleAssignmentOperation(_connectionstring, ref _catchmessage);

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
        public static string docheckdataexist(string userid, string dimid, string dimvalcode)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _userid = userid;
            string _dimid = dimid;
            string _dimvalcd = dimvalcode;

            Administrator_User_Dimension dimassign = new Administrator_User_Dimension();
            dimassign._mode = "checkuser";
            dimassign._userid = _userid;
            dimassign._dimid = _dimid;
            dimassign._dimvaluecd = _dimvalcd;

            isaccodeexists = dimassign.checkdataexist(_connectionstring, ref _catchmessage);

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
            string userid = requestdata.userid;
            string dimid = requestdata.dimid; 
            string dimvalcd = requestdata.dimvalcode;


            Administrator_User_Dimension dimassign = new Administrator_User_Dimension();
            dimassign._mode = "modify";
            dimassign._id = id;
            dimassign._userid = userid;
            dimassign._dimid = dimid;
            dimassign._dimvaluecd = dimvalcd;
            dimassign._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = dimassign.RoleAssignmentOperation(_connectionstring, ref _catchmessage);

            if (ds.Tables[0].Rows.Count > 0)
            {
                ok = true;
                _ret = ds.Tables[0].Rows[0]["rowid"].ToString();
            }

            return ok.ToString() + "|~|" + _ret;
        }

        [System.Web.Services.WebMethod]
        public static string doeditDimension(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string roleid = requestdata.roleid;

            Administrator_User_Dimension dimassign = new Administrator_User_Dimension();
            dimassign._mode = "getdataforedit";
            dimassign._id = roleid;

            DataSet ds = dimassign.RoleAssignmentOperation(_connectionstring, ref _catchmessage);

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
        public static string dodelete(string rowid)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _rowid = rowid;

            Administrator_User_Dimension dimassign = new Administrator_User_Dimension();
            dimassign._mode = "delete";
            dimassign._id = _rowid;

            isaccodeexists = dimassign.checkdataexist(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }
    }
}