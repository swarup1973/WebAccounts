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

public partial class administrator_handler : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [System.Web.Services.WebMethod]
    public static string doloadroles()
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        Roles role = new Roles();
        DataSet ds = role.getRoles(_connectionstring, ref _catchmessage);
        if (ds.Tables.Count > 0)
        {
            JSONString = JsonConvert.SerializeObject(ds);
        }
        return JSONString;
    }

    [System.Web.Services.WebMethod]
    public static string doloadroledetails(string roleid)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        Roles role = new Roles();
        role._roleid = roleid;
        DataSet ds = role.getAllPages(_connectionstring, ref _catchmessage);
        if (ds.Tables.Count > 0)
        {
            JSONString = JsonConvert.SerializeObject(ds);
        }
        return JSONString;
    }

    [System.Web.Services.WebMethod]
    public static string docheckrolename(string roleid, string rolename)
    {
        bool isrolenameexists = false;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

        Roles role = new Roles();
        role._roleid = roleid;
        role._rolename = HttpContext.Current.Server.UrlDecode(rolename);

        isrolenameexists = role.checkRolename(_connectionstring, ref _catchmessage);

        return Convert.ToString(isrolenameexists);

    }

    [System.Web.Services.WebMethod]
    public static string doSaveRoleDetails(string data)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        Roles role = new Roles();
        dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

        string roleid = requestdata.roleid;
        string rolename = requestdata.rolename;
        string roledetails = requestdata.roledtls;

        DataTable table_roledetails = new DataTable();

        table_roledetails = JsonConvert.DeserializeObject<DataTable>(roledetails);
        if (table_roledetails.Rows.Count <= 0)
        {
            table_roledetails.Columns.AddRange(new DataColumn[10] { new DataColumn("serial"), new DataColumn("MENU_ID"), new DataColumn("PARENT_ID"), new DataColumn("MENU_NAME"), new DataColumn("MENU_CAPTION"), new DataColumn("ACTION_LINK"), new DataColumn("isallowvisible"), new DataColumn("isallowadd"), new DataColumn("isallowedit"), new DataColumn("isallowdelete") });
        }

        role._roleid = roleid;
        role._rolename = rolename;
        role._dtroledetails = table_roledetails;
        role._userid = HttpContext.Current.Session["userid"].ToString();

        bool ok = role.saveRoleDetails(_connectionstring, ref _catchmessage);

        return ok.ToString();
    }


    [System.Web.Services.WebMethod]
    public static string doloadusers()
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        Roles role = new Roles();
        DataSet ds = role.getUsers(_connectionstring, ref _catchmessage);
        if (ds.Tables.Count > 0)
        {
            JSONString = JsonConvert.SerializeObject(ds);
        }
        return JSONString;
    }


    [System.Web.Services.WebMethod]
    public static string doloaduserdetails(string userid)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        User user = new User();
        user._userid = userid;
        DataSet ds = user.getUserDetails(_connectionstring, ref _catchmessage);
        if (ds.Tables.Count > 0)
        {
            JSONString = JsonConvert.SerializeObject(ds);
        }
        return JSONString;
    }

    [System.Web.Services.WebMethod]
    public static string docheckusername(string userid, string username)
    {
        bool isusernameexists = false;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

        User user = new User();
        user._userid = userid;
        user._username = HttpContext.Current.Server.UrlDecode(username);

        isusernameexists = user.checkUsername(_connectionstring, ref _catchmessage);

        return Convert.ToString(isusernameexists);

    }

    [System.Web.Services.WebMethod]
    public static string doSaveUserDetails(string data)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        User user = new User();
        dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

        string userid = requestdata.userid;
        string username = requestdata.username;
        string userpassword = requestdata.userpassword;
        string userfirstname = requestdata.userfirstname;
        string userlastname = requestdata.userlstname;
        string userroleid = requestdata.userroleid;


        user._userid = userid;
        user._username = username;
        user._userpsw = userpassword;
        user._user_firstname = userfirstname;
        user._user_lastname = userlastname;
        user._userroleid = userroleid;
        user._userby= HttpContext.Current.Session["userid"].ToString();

        bool ok = user.saveUserDetails(_connectionstring, ref _catchmessage);

        return ok.ToString();
    }

}
