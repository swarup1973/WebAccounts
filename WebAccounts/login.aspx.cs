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

public partial class login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [System.Web.Services.WebMethod]
    public static string loadfinyear()
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        User user = new User();
        DataSet ds = user.getFinYear(_connectionstring, ref _catchmessage);

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
    public static string dologin(string data)
    {
        string ret = string.Empty;

        string _catchmessage = string.Empty;
        string _ispostingallowed = "Y"; DateTime Curr_date = DateTime.Today;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
        // HttpContext.Current.Server.UrlDecode

        string _username = requestdata.username;
        string _psw = requestdata.psw;
        //string _finyr = requestdata.finyr;

        User user = new User();
        user._username = _username;
        user._userpsw = _psw;
        bool isuserexists = false;
        DataSet ds = user.dologin(_connectionstring, ref _catchmessage);
        DataTable dt_userexist, dt_userdetails, dt_CompanyList;
        if (ds.Tables.Count > 0)
        {
            dt_userexist = ds.Tables[0];
            if (ds.Tables.Count > 1)
            {
                dt_userdetails = ds.Tables[1];

                HttpContext.Current.Session["userid"] = dt_userdetails.Rows[0]["userid"].ToString();
                HttpContext.Current.Session["userfullname"] = dt_userdetails.Rows[0]["userfullname"].ToString();
                HttpContext.Current.Session["pno"] = dt_userdetails.Rows[0]["PNO"].ToString();                
                HttpContext.Current.Session["iscustomrole"] = dt_userdetails.Rows[0]["iscustomrole"].ToString();
                HttpContext.Current.Session["roleid"] = dt_userdetails.Rows[0]["roleid"].ToString();
                HttpContext.Current.Session["rolename"] = dt_userdetails.Rows[0]["rolename"].ToString();
                //HttpContext.Current.Session["finyear"] = _finyr;
                HttpContext.Current.Session["permission"] = dt_userdetails.Rows[0]["rolewisepermission"].ToString();
                HttpContext.Current.Session["rolecentercode"] = dt_userdetails.Rows[0]["rolecentercode"].ToString();
                HttpContext.Current.Session["rolecentername"] = dt_userdetails.Rows[0]["rolecentername"].ToString();
                HttpContext.Current.Session["posting_to"] = dt_userdetails.Rows[0]["posting_to"].ToString();
            }
            isuserexists = Convert.ToBoolean(dt_userexist.Rows[0]["userexists"]);

            if(ds.Tables.Count > 2)
            {
                dt_CompanyList = ds.Tables[2];
                HttpContext.Current.Session.Add("CompanyList", dt_CompanyList);
            }
            HttpContext.Current.Session["CompanyCode"] = "";

            DateTime posting_to = DateTime.Parse(HttpContext.Current.Session["posting_to"].ToString());
            if (Curr_date > posting_to)
            {
                _ispostingallowed = "N";
            }
        }
        ret = isuserexists.ToString() + "Ç" + HttpContext.Current.Session["permission"] + "Ç" + _ispostingallowed;
        return ret;

    }

}
