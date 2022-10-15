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
    public partial class profiles : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string do_loadprofile()
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Profiles pf = new Profiles();
            DataSet ds = pf.getProfiles(_connectionstring, ref _catchmessage);
            if (ds.Tables.Count > 0)
            {
                JSONString = JsonConvert.SerializeObject(ds);
            }
            return JSONString;
        }

        [System.Web.Services.WebMethod]
        public static string doSaveProfile(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Profiles pf = new Profiles();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string Code = requestdata.Code;
            string Description = requestdata.Description;
            string Currency = requestdata.Currency;
            string Block = requestdata.Block;
            string I_U_flag = requestdata.I_U_Flag;



            pf._code = Code;
            pf._description = Description;
            pf._currency = Currency;
            pf._IsBlock = Convert.ToBoolean(Block);
            pf._I_U_Flag = I_U_flag;
            pf._userid = HttpContext.Current.Session["userid"].ToString();

            bool ok = pf.saveprofile(_connectionstring, ref _catchmessage);

            return ok.ToString();
        }

        [System.Web.Services.WebMethod]
        public static string doupdateprofiles(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Profiles pf = new Profiles();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string Code = requestdata.Code;
            string Description = requestdata.Description;
            string Currency = requestdata.Currency;
            string Block = requestdata.Block;
            string I_U_flag = requestdata.I_U_Flag;

            pf._code = Code;
            pf._description = Description;
            pf._currency = Currency;
            pf._IsBlock = Convert.ToBoolean(Block);
            pf._I_U_Flag = I_U_flag;
            pf._userid = HttpContext.Current.Session["userid"].ToString();

            bool ok = pf.updateprofiles(_connectionstring, ref _catchmessage);
            return ok.ToString();
        }

        [System.Web.Services.WebMethod]
        public static string dodeleteprofiles(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Profiles pf = new Profiles();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string Code = requestdata.Code;
            string Description = requestdata.Description;
            string Currency = requestdata.Currency;
            string Block = requestdata.Block;
            string I_U_flag = requestdata.I_U_Flag;



            pf._code = Code;
            pf._description = Description;
            pf._currency = Currency;
            pf._IsBlock = Convert.ToBoolean(Block);
            pf._I_U_Flag = I_U_flag;
            pf._userid = HttpContext.Current.Session["userid"].ToString();

            bool ok = pf.deleteProfile(_connectionstring, ref _catchmessage);

            return ok.ToString();
        }
    }
}
