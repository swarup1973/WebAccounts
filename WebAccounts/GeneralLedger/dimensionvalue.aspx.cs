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
    public partial class dimensionvalue : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string doloaddimensiondetails(string dimid, string cocd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Dimension dm = new Dimension();
            dm._dimId = dimid;
            dm._cocd = cocd;
            DataSet ds = dm.getDimensionvalue(_connectionstring, ref _catchmessage);
            if (ds.Tables.Count > 0)
            {
                JSONString = JsonConvert.SerializeObject(ds);
            }
            return JSONString;
        }

        [System.Web.Services.WebMethod]
        public static string doloaddimensiondetails(string dimid, string valueid, string cocd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Dimension dm = new Dimension();
            dm._dimId = dimid;
            dm._valueId = valueid;
            dm._cocd = cocd;
            DataSet ds = dm.getDimensionvalue(_connectionstring, ref _catchmessage);
            if (ds.Tables.Count > 0)
            {
                JSONString = JsonConvert.SerializeObject(ds);
            }
            return JSONString;
        }

        [System.Web.Services.WebMethod]
        public static string dodeletedimensiondetails(string dimid, string valueid, string cocd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Dimension dm = new Dimension();
            dm._dimId = dimid;
            dm._valueId = valueid;
            dm._cocd = cocd;
            bool ok = dm.deleteDimensionValue(_connectionstring, ref _catchmessage);

            return ok.ToString();
        }

        [System.Web.Services.WebMethod]
        public static string doSaveDimensionvalue(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Dimension dim = new Dimension();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string dimId = requestdata.dimId;
            string valueId = requestdata.valueId;
            if (requestdata.valueId == null)
            {
                valueId = "";
            }
            string valueCd = requestdata.valueCd;
            string valueCaption = requestdata.valueCaption;
            string valueDesc = requestdata.valueDesc;
            string enabled = requestdata.enabled;
            string cocd = requestdata.cocd;

            dim._dimId = dimId;
            dim._valueId = valueId;
            dim._valueCd = valueCd;
            dim._valueCaption = valueCaption;
            dim._valueDesc = valueDesc;
            dim._enabled = Convert.ToBoolean(enabled);
            
            dim._userid = HttpContext.Current.Session["userid"].ToString();
            dim._cocd = cocd;

            bool ok = dim.saveDimensionvalue(_connectionstring, ref _catchmessage);

            return ok.ToString();
        }
    }
}