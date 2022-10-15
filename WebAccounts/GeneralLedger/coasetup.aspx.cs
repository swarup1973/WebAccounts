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
    public partial class coasetup : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.UrlReferrer == null)
            {
                Response.Redirect("../login.aspx");
            }
        }

        [System.Web.Services.WebMethod]
        public static string doloadCoaSetupData(string acid)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Chartofacct _obj = new Chartofacct();
            _obj._AcId = acid;
            DataSet ds = _obj.getCoaSetupdetails(_connectionstring, ref _catchmessage);
            if (ds.Tables.Count > 0)
            {
                JSONString = JsonConvert.SerializeObject(ds);
            }
            return JSONString;
        }

        [System.Web.Services.WebMethod]
        public static string doSavechartofacct(string data)
        {
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string acid = requestdata.acid;
            string accode = requestdata.accode;
            string desc = requestdata.desc;
            string srcdesc= requestdata.srcdesc;
            string acalias = requestdata.acalias;
            string actype = requestdata.actype;
            string group = requestdata.group;

            string isdirectposting = requestdata.isdirectposting;
            string isblockposting = requestdata.isblockposting;
            string ledcatid = requestdata.ledcatid;

            string grouprangefrom = requestdata.grouprangefrom;
            string grouprangeto = requestdata.grouprangeto;

            string dimType = requestdata.dimType;
            string dimensionset = requestdata.dimensionset;

            string dim1_Branch = requestdata.dim1_Branch;
            string dim1DefValue= requestdata.dim1DefValue;

            string dim2_Dept = requestdata.dim2_Dept;
            string dim2DefValue = requestdata.dim2DefValue;

            string dim3 = requestdata.dim3;
            string dim3DefValue = requestdata.dim3DefValue;

            string dim4 = requestdata.dim4;
            string dim4DefValue = requestdata.dim4DefValue;

            string dim5 = requestdata.dim5;
            string dim5DefValue = requestdata.dim5DefValue;

            string dim6 = requestdata.dim6;
            string dim6DefValue = requestdata.dim6DefValue;

            string dim7 = requestdata.dim7;
            string dim7DefValue = requestdata.dim7DefValue;

            string dim8 = requestdata.dim8;
            string dim8DefValue = requestdata.dim8DefValue;

            string dim9 = requestdata.dim9;
            string dim9DefValue = requestdata.dim9DefValue;

            string dim10 = requestdata.dim10;
            string dim10DefValue = requestdata.dim10DefValue;

            string cocd = requestdata.cocd;

        Chartofacct _obj = new Chartofacct();

            _obj._AcId = acid;
            _obj._AcCd = accode;
            _obj._AcDesc = desc;
            _obj._AcSrcDesc = srcdesc;
            _obj._AcAlias = acalias;
            _obj._AcTypeCd = actype;
            _obj._grpCd = group;

            _obj._IsDirectPosting = Convert.ToBoolean(isdirectposting);
            _obj._IsBlockPosting = Convert.ToBoolean(isblockposting); 
            _obj._LedCatId = ledcatid;

            _obj._grpRangeFrom = grouprangefrom;
            _obj._grpRangeTo = grouprangeto;
            _obj._dimType = dimType;
            _obj._dimSetCode = dimensionset;

            _obj._dim1_Branch = Convert.ToBoolean(dim1_Branch);
            _obj._dim1DefValue = dim1DefValue;
            _obj._dim2_Dept = Convert.ToBoolean(dim2_Dept);
            _obj._dim2DefValue = dim2DefValue;
            _obj._dim3 = Convert.ToBoolean(dim3);
            _obj._dim3DefValue = dim3DefValue;
            _obj._dim4 = Convert.ToBoolean(dim4);
            _obj._dim4DefValue = dim4DefValue;
            _obj._dim5 = Convert.ToBoolean(dim5);
            _obj._dim5DefValue = dim5DefValue;
            _obj._dim6 = Convert.ToBoolean(dim6);
            _obj._dim6DefValue = dim6DefValue;
            _obj._dim7 = Convert.ToBoolean(dim7);
            _obj._dim7DefValue = dim7DefValue;
            _obj._dim8 = Convert.ToBoolean(dim8);
            _obj._dim8DefValue = dim8DefValue;
            _obj._dim9 = Convert.ToBoolean(dim9);
            _obj._dim9DefValue = dim9DefValue;
            _obj._dim10 = Convert.ToBoolean(dim10);
            _obj._dim10DefValue = dim10DefValue;

            _obj._enabled = true;
            _obj._userid = HttpContext.Current.Session["userid"].ToString();
            _obj._cocd = cocd;

            //ok = _obj.saveChartofacct(_connectionstring, ref _catchmessage);
            //return ok.ToString();
            result = _obj.saveChartofacct(_connectionstring, ref _catchmessage);
            return result;
        }

        [System.Web.Services.WebMethod]
        public static string docheckVchDtl_GroupRangeFromTo(string acid, string range, string type)
        {
            bool istransactionexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            Chartofacct dim = new Chartofacct();
            dim._AcId = HttpContext.Current.Server.UrlDecode(acid);

            istransactionexists = dim.checkTransaction_GroupRange(_connectionstring, range, type, ref _catchmessage);
            return Convert.ToString(istransactionexists);
        }

       


    }
}