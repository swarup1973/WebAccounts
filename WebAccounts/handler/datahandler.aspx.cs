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
using System.Data.SqlClient; 

public partial class datahandler : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    public static bool IsActionMenuPermission(string value, string menu, string operation)
    {
        //ROLE»Y,Y,Y,Y
        //return false;

        bool oK = false;
        string str_pm = value;
        string[] colRow = str_pm.Split('|');

        string _op = string.Empty;
        string _dt = string.Empty;
        foreach (string s in colRow)
        {
            if (s == "") break;
            _op = ""; _dt = "";
            _op = s.Split('»')[0].ToLower();
            _dt = s.Split('»')[1].ToLower();

            if (_dt.Split(',').Length < 3) continue;

            if (_op.ToLower() == menu.ToLower())
            {
                if (operation == "view")
                    _dt = _dt.Split(',')[0].ToLower();
                else if (operation == "create")
                    _dt = _dt.Split(',')[1].ToLower();
                else if (operation == "edit")
                    _dt = _dt.Split(',')[2].ToLower();
                else if (operation == "delete")
                    _dt = _dt.Split(',')[3].ToLower();
                
                oK = (_dt == "y");
                break;
            }
        }
        return oK;
    }

    [System.Web.Services.WebMethod]
    public static string dogetusermenu(string CoCd)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        User user = new User();
        //user._userroleid = HttpContext.Current.Session["roleid"].ToString();
        //user._iscustomrole = Convert.ToBoolean(HttpContext.Current.Session["iscustomrole"].ToString());
        user._pno = HttpContext.Current.Session["pno"].ToString();
        user._type = "U";
		user._cocd = CoCd;//HttpContext.Current.Session["cocd"].ToString();																   
        /*if (Convert.ToBoolean(HttpContext.Current.Session["iscustomrole"].ToString()))
        {
            
        }*/
		HttpContext.Current.Session["CompanyCode"] = CoCd;
        DataSet ds = user.getusermenu(_connectionstring, ref _catchmessage);
        if (ds.Tables.Count > 0)
        {
            JSONString = JsonConvert.SerializeObject(ds);
            //HttpContext.Current.Session["usermenu"] = JSONString;
        }
        return JSONString;
    }

    [System.Web.Services.WebMethod]
    public static string do_logout()
    {
        HttpContext.Current.Session.Abandon();
        HttpContext.Current.Session["userid"] = "";
        HttpContext.Current.Session["userfullname"] = "";
        HttpContext.Current.Session["roleid"] = "";
        HttpContext.Current.Session["rolename"] = "";
        HttpContext.Current.Session["finyear"] = "";
        return "True";
    }

    [System.Web.Services.WebMethod]
    public static string iscreate(string menuname, string actiontype)
    {
        string ret = string.Empty;
        bool _allow = false;
        string _catchmessage = string.Empty;
        if (menuname.Trim().ToLower() == "") return "false";

        //|COA»Y,Y,Y,Y|DIMENSION»Y,Y,Y,Y|DIMENSION SET»Y,Y,Y,Y|ROLE»Y,Y,Y,Y|USER»Y,Y,Y,Y

        string mod = menuname.Trim().ToLower();
        string _perm = HttpContext.Current.Session["permission"].ToString();
        _allow = datahandler.IsActionMenuPermission(_perm, mod.ToLower(), actiontype);
        return _allow ? "true" : "false";
    }

    [System.Web.Services.WebMethod]
    public static string GetPagePermission(string data)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

        string userid = HttpContext.Current.Session["userid"].ToString();
        string rolecode = HttpContext.Current.Session["roleid"].ToString();
        string iscustomrole = HttpContext.Current.Session["iscustomrole"].ToString();
        string pagelink = requestdata.pagelink;
        
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

        User user = new User();
        user._userid = userid;
        user._userroleid = rolecode;
        user._iscustomrole = Convert.ToBoolean(iscustomrole);
        user._pagelink= pagelink;
        DataSet ds = user.getuserpagespermission(_connectionstring, ref _catchmessage);

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
    public static string loadlookupdataAccount(string CoCd)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        common com = new common();
		com._cocd = CoCd;				 
        DataSet ds = com.getAccountsLookup(_connectionstring, ref _catchmessage);

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
    public static string loadlookupdataPostingGroup(string cocd)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        common com = new common();
        com._cocd = cocd;
        DataSet ds = com.getPostingGroupLookup(_connectionstring, ref _catchmessage);

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
    public static string loadlookupdataCurrency(string cocd)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        common com = new common();
        com._cocd = cocd;
        DataSet ds = com.getCurrencyLookup(_connectionstring, ref _catchmessage);

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
    public static string loadlookupdataPersonResponsible(string cocd)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        common com = new common();
        com._cocd = cocd;
        DataSet ds = com.getPersonResponsibleLookup(_connectionstring, ref _catchmessage);

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
    public static string loadlookupdataCountry()
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        common com = new common();
        DataSet ds = com.getCountryLookup(_connectionstring, ref _catchmessage);

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
    public static string loadlookupdataCounty(string countryCd)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        common com = new common();
        com._countryCd = countryCd;
        DataSet ds = com.getCountyLookup(_connectionstring, ref _catchmessage);

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
    public static string loadlookupdataVendorAccountOverview(string data)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
        string cocd = requestdata.cocd;

        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        common com = new common();
        com._cocd = cocd;
        DataSet ds = com.getVendorAccountsOverviewLookup(_connectionstring, ref _catchmessage);

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
    public static string loadVendordetails(string data)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

        string cocd = requestdata.cocd;

        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

        vendoritemprice vnd = new vendoritemprice();
        vnd._vendorcode = requestdata.vendorcode;
        vnd._CoCd = cocd;
        DataSet ds = vnd.getvendordetails(_connectionstring, ref _catchmessage);

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
    public static string loadlookupdataCustomerOverview(string data)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
        string cocd = requestdata.cocd;

        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        common com = new common();
        com._cocd = cocd;
        DataSet ds = com.getVendorCustomerOverviewLookup(_connectionstring, ref _catchmessage);

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
    public static string loadCustomerdetails(string data)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

        string cocd = requestdata.cocd;

        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

        customeritemprice vnd = new customeritemprice();
        vnd._vendorcode = requestdata.vendorcode;
        vnd._CoCd = cocd;
        DataSet ds = vnd.getcustomerdetails(_connectionstring, ref _catchmessage);

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
    public static string loadDimensionVendorCustomer(string data)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
        string cocd = requestdata.cocd;

        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        common com = new common();
        com._cocd = cocd;
        DataSet ds = com.getVendorCustomerDimension(_connectionstring, ref _catchmessage);

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
    public static string loadAccount(string data)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

        string cocd = requestdata.cocd;

        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

        taxcode vnd = new taxcode();
        vnd._CoCd = cocd;
        DataSet ds = vnd.getAccount(_connectionstring, ref _catchmessage);

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
    public static string loadTax(string data)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

        string cocd = requestdata.cocd;

        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

        taxsetup vnd = new taxsetup();
        vnd._CoCd = cocd;
        DataSet ds = vnd.getTax(_connectionstring, ref _catchmessage);

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
    public static string loadAdministrator_NoSequence(string data)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

        string cocd = requestdata.cocd;

        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

        common vnd = new common();
        vnd._cocd = cocd;
        DataSet ds = vnd.getAdministrator_NoSequence(_connectionstring, ref _catchmessage);

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
    public static string dogetactivemenulist(string menuid)
    {
        string JSONString = string.Empty;
        string _catchmessage = string.Empty;
        string _ret = string.Empty;
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        User user = new User();
        user._menuid = menuid;															   
        DataSet ds = user.getactivemenulist(_connectionstring, ref _catchmessage);
        if (ds.Tables.Count > 0)
        {
            JSONString = JsonConvert.SerializeObject(ds);
        }
        return JSONString;
    }
    [System.Web.Services.WebMethod]
    public static string GetImageGeneral(int id,string ctype)
    {

        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        var contentType = "";
        var str = "-1";
        SqlParameter[] arParam = new SqlParameter[2];
        arParam[0] = new SqlParameter("@id", id);
        arParam[1] = new SqlParameter("@ctype", ctype);
        DataSet ds = new DataSet();
        ds = ExecQueryDS("get_getImageDetails", arParam);
        contentType = ds.Tables[0].Rows[0]["CompanyLogoType"].ToString();
        if (contentType.Length > 2)
        {
            byte[] bytes = (byte[])ds.Tables[0].Rows[0]["CompanyLogo"];
            string base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
            if (contentType == "image/png")
            {
                str = "data:image/png;base64," + base64String;
            }
            else if (contentType == "image/jpg")
            {
                str = "data:image/jpg;base64," + base64String;
            }
            else if (contentType == "image/jpeg")
            {
                str = "data:image/jpeg;base64," + base64String;
            }
        }


        return str + "|" + contentType;
    }
    [System.Web.Services.WebMethod]
    public static string GetImagenew(int id)
    {
        
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        var contentType = "";
        var str = "-1";
        SqlParameter[] arParam = new SqlParameter[1];
        arParam[0] = new SqlParameter("@id", id);
        DataSet ds = new DataSet();
        ds = ExecQueryDS("get_Administrator_CompanyProfile_logo", arParam);
        contentType = ds.Tables[0].Rows[0]["CompanyLogoType"].ToString();
        if (contentType.Length > 2)
        {
            byte[] bytes = (byte[])ds.Tables[0].Rows[0]["CompanyLogo"];
            string base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
            if (contentType == "image/png")
            {
                str = "data:image/png;base64," + base64String;
            }
            else if (contentType == "image/jpg")
            {
                str = "data:image/jpg;base64," + base64String;
            }
            else if (contentType == "image/jpeg")
            {
                str = "data:image/jpeg;base64," + base64String;
            }
        }
        

        return str  + "|" + contentType;
    }
    [System.Web.Services.WebMethod]
    public static string UploadImagenew(string docname,string imageData,string contentType)
    {
        var filename = "";
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        byte[] bytes = Convert.FromBase64String(imageData);
        var str = "-1";
        SqlParameter[] arParam = new SqlParameter[3];
        arParam[0] = new SqlParameter("@docname", docname);
        arParam[1] = new SqlParameter("@doctype", contentType);
        arParam[2] = new SqlParameter("@docvalue", bytes);



        DataSet ds = new DataSet();
        ds = ExecQueryDS("insert_docsdetails", arParam);
        str = ds.Tables[0].Rows[0][0].ToString(); // ds.Tables(0).Rows(0).Item("rtn").ToString()
        return str;
    }
    public static DataSet ExecQueryDS(string strSQL, SqlParameter[] param = null)
    {
        SqlConnection conn = null/* TODO Change to default(_) if this is not a reference type */;
        DataSet ds = new DataSet();
        string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        try
        {
            conn = new SqlConnection(_connectionstring);
            SqlCommand cmd = new SqlCommand(strSQL, conn);
            cmd.CommandTimeout = 180;
            cmd.CommandType = CommandType.StoredProcedure;

            if (param != null)
            {
                if (param.Length > 0)
                {
                    foreach (SqlParameter par in param)
                        cmd.Parameters.Add(new SqlParameter(par.ParameterName, par.Value));
                }
            }

            conn.Open();
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(ds);

            conn.Close();
            conn.Dispose();
            conn = null/* TODO Change to default(_) if this is not a reference type */;
        }
        catch (Exception ex)
        {

            // MsgBox(ex.Message)
            // Dim new_ex As New Exception("Error..")
            // Throw new_ex
            conn.Close();
            conn.Dispose();
            conn = null/* TODO Change to default(_) if this is not a reference type */;
        }

        return ds;
    }

}

