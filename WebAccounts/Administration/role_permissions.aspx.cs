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
    public partial class role_permissions : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string doPopulateDD(string CoCd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Roles role = new Roles();
            role._cocd = CoCd;
            DataSet ds = role.doloadcombo_rolepermission(_connectionstring, ref _catchmessage);
            if (ds.Tables.Count > 0)
            {
                JSONString = JsonConvert.SerializeObject(ds);
            }
            return JSONString;
        }

        [System.Web.Services.WebMethod]
        public static string dogetRolePermissions(string rolecd, string userid)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Roles role = new Roles();
            role._rolecd = rolecd;
            role._userid = userid;
            DataSet ds = role.getAdministrator_Permission(_connectionstring, ref _catchmessage);
            if (ds.Tables.Count > 0)
            {
                JSONString = JsonConvert.SerializeObject(ds);
            }
            return JSONString;
        }

        [System.Web.Services.WebMethod]
        public static string dogetLoadPermissions(string pno, string type)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Roles role = new Roles();
            role._pno = pno;
            role._type = type;
            DataSet ds = role.get_LoadPermission(_connectionstring, ref _catchmessage);
            if (ds.Tables.Count > 0)
            {
                JSONString = JsonConvert.SerializeObject(ds);
            }
            return JSONString;
        }

        [System.Web.Services.WebMethod]
        public static string doSaveRolePermissions(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Roles role = new Roles();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string rolecd = requestdata.rolecd;
            string userid = requestdata.userid;
            string rolepermissions = requestdata.rolepermissions;
            bool iscustomrole = Convert.ToBoolean(requestdata.iscustomrole);
            string CoCd = requestdata.cocd;

            DataTable table_rolepermissions = new DataTable();

            table_rolepermissions = JsonConvert.DeserializeObject<DataTable>(rolepermissions);
            if (table_rolepermissions.Rows.Count <= 0)
            {
                table_rolepermissions.Columns.AddRange(new DataColumn[7] { new DataColumn("serial"), new DataColumn("MENU_ID"), new DataColumn("PARENT_ID"), new DataColumn("isallowvisible"), new DataColumn("isallowadd"), new DataColumn("isallowedit"), new DataColumn("isallowdelete") });
            }

            role._rolecd = rolecd;
            role._userid = userid;
            role._dtroledetails = table_rolepermissions;
            role._createdby = HttpContext.Current.Session["userid"].ToString();
            role._iscustomrole = iscustomrole;
            role._cocd = CoCd;

            bool ok = role.saveAdministrator_Permission(_connectionstring, ref _catchmessage);

            return ok.ToString();
        }
    }
}