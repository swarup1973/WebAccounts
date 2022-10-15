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
using WebAccounts.Common;

namespace WebAccounts
{
    public partial class fiscal_year : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string do_loadfiacalyear(string CoCd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            FiscalYear fs = new FiscalYear();
            fs._cocd = CoCd;
            DataSet ds = fs.getFiscalYearList(_connectionstring, ref _catchmessage);
            if (ds.Tables.Count > 0)
            {
                JSONString = JsonConvert.SerializeObject(ds);
            }
            return JSONString;
        }

        [System.Web.Services.WebMethod]
        public static string doupdatefiscalyear(string startdate, string rowid, bool IsPeriodLock, string CoCd)
        {
            clsCommon FobjCom = new clsCommon();
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            FiscalYear fs = new FiscalYear();
            fs._startdate = FobjCom.PFDBDateFormat(startdate);
            fs._IsPeriodLock = IsPeriodLock;
            fs._cocd = CoCd;
            bool ok = fs.updatefiscalyear(_connectionstring, ref _catchmessage);
            return ok.ToString();
        }

        [System.Web.Services.WebMethod]
        public static string dosavefiscalyear(string data)
        {
            clsCommon FobjCom = new clsCommon();
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            FiscalYear fis = new FiscalYear();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string startdate = requestdata.startdate;
            string periodlength = requestdata.periodlength;
            string noofperiod = requestdata.noofperiod;
            string cocd = requestdata.cocd;

            fis._startdate = FobjCom.PFDBDateFormat(startdate);
            fis._noofperiod = noofperiod;
            fis._periodlength = periodlength;
            fis._userid = HttpContext.Current.Session["userid"].ToString();
            fis._cocd = cocd;

            bool ok = fis.savefiscalyear(_connectionstring, ref _catchmessage);

            return ok.ToString();
        }

        [System.Web.Services.WebMethod]
        public static string dodeletefiscalyear(string data)
        {
            clsCommon FobjCom = new clsCommon();
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            StringBuilder _deletestring = null;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            FiscalYear fis = new FiscalYear();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string[] deletedates = requestdata.deletedates.ToObject<string[]>();

            _deletestring = new StringBuilder();

            _deletestring.Append("<Table>");
            for (var i = 0; i < deletedates.Length; i++)
            {
                if (deletedates[i] != null)
                {
                    _deletestring.Append("<Row>");
                    _deletestring.Append(FobjCom.SetXMLAttributes("deldates", FobjCom.PFDBDateFormat(deletedates[i].ToString())));
                    _deletestring.Append(FobjCom.SetXMLAttributes("rowid", i.ToString()));
                    _deletestring.Append("</Row>");
                }
            }
            _deletestring.Append("</Table>");

            fis._deletedates = _deletestring.ToString();
            fis._userid = HttpContext.Current.Session["userid"].ToString();

            DataSet ds = fis.deletefiscalyear(_connectionstring, ref _catchmessage);

            if (ds.Tables.Count > 0)
            {
                JSONString = JsonConvert.SerializeObject(ds);
            }
            return JSONString;
        }

        [System.Web.Services.WebMethod]
        public static string doshowdeleteyear(string startdate, string enddate)
        {
            clsCommon FobjCom = new clsCommon();
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            FiscalYear fs = new FiscalYear();
            fs._del_s_date = FobjCom.PFDBDateFormat(startdate);
            fs._del_e_date = FobjCom.PFDBDateFormat(enddate);
            DataSet ds = fs.showdelfinyear(_connectionstring, ref _catchmessage);             
            if (ds.Tables.Count > 0)
            {
                JSONString = JsonConvert.SerializeObject(ds);
            }
            return JSONString;
        }
    }
}