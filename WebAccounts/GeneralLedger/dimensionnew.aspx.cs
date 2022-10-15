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
    public partial class dimensionnew : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string docheckdimensioncode(string dimId, string dimCd)
        {
            bool isdimensionexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            Dimension dim = new Dimension();
            dim._dimId = dimId;
            dim._dimCd = HttpContext.Current.Server.UrlDecode(dimCd);

            isdimensionexists = dim.checkDimensioncode(_connectionstring, ref _catchmessage);

            return Convert.ToString(isdimensionexists);

        }

        [System.Web.Services.WebMethod]
        public static string doSaveDimension(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Dimension dim = new Dimension();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string dimId = requestdata.dimId;
            string dimCd = requestdata.dimCd;
            string dimCaption = requestdata.dimCaption;
            string dimDesc = requestdata.dimDesc;
            string IsAcApp = requestdata.IsAcApp;
            string IsAppBSLedger = requestdata.IsAppBSLedger;
            string IsAppIncomeLedger = requestdata.IsAppIncomeLedger;
            string IsAppExpnsLedger = requestdata.IsAppExpnsLedger;
            string IsAppOBLedger = requestdata.IsAppOBLedger;
            string enabled = requestdata.enabled;

            string dimensionvaldtls = requestdata.dimensionvaldtls;

            DataTable table_dimensionvaldetails = new DataTable();

            table_dimensionvaldetails = JsonConvert.DeserializeObject<DataTable>(dimensionvaldtls);
            if (table_dimensionvaldetails.Rows.Count <= 0)
            {
                table_dimensionvaldetails.Columns.AddRange(new DataColumn[5] { new DataColumn("srl"), new DataColumn("code"), new DataColumn("name"), new DataColumn("description"), new DataColumn("enabled") });
            }

            dim._dimId = dimId;
            dim._dimCd = dimCd;
            dim._dimCaption = dimCaption;
            dim._dimDesc = dimDesc;
            dim._IsAcApp = Convert.ToBoolean(IsAcApp);
            dim._IsAppBSLedger = Convert.ToBoolean(IsAppBSLedger);
            dim._IsAppIncomeLedger = Convert.ToBoolean(IsAppIncomeLedger);
            dim._IsAppExpnsLedger = Convert.ToBoolean(IsAppExpnsLedger);
            dim._IsAppOBLedger = Convert.ToBoolean(IsAppOBLedger);
            dim._enabled = Convert.ToBoolean(enabled);
            dim._dtdimensionvaltails = table_dimensionvaldetails;
            dim._userid = HttpContext.Current.Session["userid"].ToString();

            bool ok = dim.saveDimension(_connectionstring, ref _catchmessage);

            return ok.ToString();
        }

        [System.Web.Services.WebMethod]
        public static string doloaddimensiondetails(string dimid)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Dimension dm = new Dimension();
            dm._dimId = dimid;
            DataSet ds = dm.getDimensiondetails(_connectionstring, ref _catchmessage);
            if (ds.Tables.Count > 0)
            {
                JSONString = JsonConvert.SerializeObject(ds);
            }
            return JSONString;
        }
    }
}