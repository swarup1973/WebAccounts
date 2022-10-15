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
    public partial class role_prototype : System.Web.UI.Page
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
            Administrator_Role role = new Administrator_Role();
            role._cocd = CoCd;
            DataSet ds = role.GetRoleCenter(_connectionstring, ref _catchmessage);

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
        public static string loadrolelist(string CoCd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Administrator_Role role = new Administrator_Role();
            role._mode = "getlist";
            role._roleid = string.Empty;
            role._cocd = CoCd;
            DataSet ds = role.RoleOperation(_connectionstring, ref _catchmessage);

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
        public static string docheckrolecode(string roleid, string rolecode)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _roleid = roleid;
            string _rolecode = rolecode;

            Administrator_Role role = new Administrator_Role();
            role._mode = "checkrole";
            role._roleid = _roleid;
            role._rolecd = _rolecode;

            isaccodeexists = role.checkrolecode(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string doSaveRole(string data)
        {
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string roleid = requestdata.roleid;
            string rolecode = requestdata.rolecode;
            string description = requestdata.description;
            string rolecentercode = requestdata.rolecentercode;
            string postingfrom = requestdata.postingfrom;
            string postingto = requestdata.postingto;
            string isblock = requestdata.isblock;
            string cocd = requestdata.cocd;

            Administrator_Role role = new Administrator_Role();
            role._mode = "rolemodify";
            role._roleid = roleid;
            role._rolecd = rolecode;
            role._description = description;
            role._rolecenterCd = rolecentercode;
            role._postingfrom = postingfrom;
            role._postingto = postingto;
            role._isblock = isblock;
            role._createdby = HttpContext.Current.Session["userid"].ToString();
            role._cocd = cocd;
            DataSet ds = role.RoleOperation(_connectionstring, ref _catchmessage);

            if (ds.Tables[0].Rows.Count > 0)
            {
                ok = true;
                _ret = ds.Tables[0].Rows[0]["roleid"].ToString();
            }

            return ok.ToString() + "|~|" + _ret;
        }

        [System.Web.Services.WebMethod]
        public static string doeditRole(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string roleid = requestdata.roleid;
            string cocd = requestdata.cocd;

            Administrator_Role role = new Administrator_Role();
            role._mode = "getrolebyid";
            role._roleid = roleid;
            role._cocd = cocd;
            
            role._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = role.RoleOperation(_connectionstring, ref _catchmessage);

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
        public static string dodelete(string roleid)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _roleid = roleid;

            Administrator_Role role = new Administrator_Role();
            role._mode = "deleterole";
            role._roleid = _roleid;


            isaccodeexists = role.checkrolecode(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }
    }
}