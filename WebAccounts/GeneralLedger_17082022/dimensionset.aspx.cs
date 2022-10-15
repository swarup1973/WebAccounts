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
    public partial class dimensionset : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string doloaddimensionsetlist(string CoCd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Dimension dm = new Dimension();
            dm._cocd = CoCd;
            DataSet ds = dm.getDimensionSetList(_connectionstring, ref _catchmessage);
            if (ds.Tables.Count > 0)
            {
                JSONString = JsonConvert.SerializeObject(ds);
            }
            return JSONString;
        }

        [System.Web.Services.WebMethod]
        public static string doloaddimensiondetails(string dimsetid, string cocd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Dimension dm = new Dimension();
            dm._dimSetId = dimsetid;
            dm._cocd = cocd;
            DataSet ds = dm.getDimensionSetdetails(_connectionstring, ref _catchmessage);
            if (ds.Tables.Count > 0)
            {
                JSONString = JsonConvert.SerializeObject(ds);
            }
            return JSONString;
        }
        [System.Web.Services.WebMethod]
        public static string doCheckDimensionset(string data)
        {
            bool isdimensionsetexists = false;
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Dimension dim = new Dimension();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string dimSetId = requestdata.dimSetId;
            //string dimSetCode = requestdata.dimSetCode;
            //string dimSetName = requestdata.dimSetName;
            string dim1_Branch = requestdata.dim1_Branch;
            string dim2_Dept = requestdata.dim2_Dept;
            string dim3 = requestdata.dim3;
            string dim4 = requestdata.dim4;
            string dim5 = requestdata.dim5;
            string dim6 = requestdata.dim6;
            string dim7 = requestdata.dim7;
            string dim8 = requestdata.dim8;
            string dim9 = requestdata.dim9;
            string dim10 = requestdata.dim10;
            //string enabled = requestdata.enabled;
            string cocd = requestdata.cocd;

            dim._dimSetId = dimSetId;
            //dim._dimSetCode = dimSetCode;
            //dim._dimSetName = dimSetName;
            dim._dim1_Branch = Convert.ToBoolean(dim1_Branch);
            dim._dim2_Dept = Convert.ToBoolean(dim2_Dept);
            dim._dim3 = Convert.ToBoolean(dim3);
            dim._dim4 = Convert.ToBoolean(dim4);
            dim._dim5 = Convert.ToBoolean(dim5);
            dim._dim6 = Convert.ToBoolean(dim6);
            dim._dim7 = Convert.ToBoolean(dim7);
            dim._dim8 = Convert.ToBoolean(dim8);
            dim._dim9 = Convert.ToBoolean(dim9);
            dim._dim10 = Convert.ToBoolean(dim10);
            //dim._enabled = Convert.ToBoolean(enabled);
            dim._userid = HttpContext.Current.Session["userid"].ToString();
            dim._cocd = cocd;

            isdimensionsetexists = dim.checkDimensionSet(_connectionstring, ref _catchmessage);

            return Convert.ToString(isdimensionsetexists);
        }

        [System.Web.Services.WebMethod]
        public static string doSaveDimensionset(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Dimension dim = new Dimension();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string dimSetId = requestdata.dimSetId;
            string dimSetCode = requestdata.dimSetCode;
            string dimSetName = requestdata.dimSetName;
            string dim1_Branch = requestdata.dim1_Branch;
            string dim2_Dept = requestdata.dim2_Dept;
            string dim3 = requestdata.dim3;
            string dim4 = requestdata.dim4;
            string dim5 = requestdata.dim5;
            string dim6 = requestdata.dim6;
            string dim7 = requestdata.dim7;
            string dim8 = requestdata.dim8;
            string dim9 = requestdata.dim9;
            string dim10 = requestdata.dim10;
            string enabled = requestdata.enabled;
            string cocd = requestdata.cocd;

            dim._dimSetId = dimSetId;
            dim._dimSetCode = dimSetCode;
            dim._dimSetName = dimSetName;
            dim._dim1_Branch = Convert.ToBoolean(dim1_Branch);
            dim._dim2_Dept = Convert.ToBoolean(dim2_Dept);
            dim._dim3 = Convert.ToBoolean(dim3);
            dim._dim4 = Convert.ToBoolean(dim4);
            dim._dim5 = Convert.ToBoolean(dim5);
            dim._dim6 = Convert.ToBoolean(dim6);
            dim._dim7 = Convert.ToBoolean(dim7);
            dim._dim8 = Convert.ToBoolean(dim8);
            dim._dim9 = Convert.ToBoolean(dim9);
            dim._dim10 = Convert.ToBoolean(dim10);
            dim._enabled = Convert.ToBoolean(enabled);
            dim._userid = HttpContext.Current.Session["userid"].ToString();
            dim._cocd = cocd;

            bool ok = dim.saveDimensionSet(_connectionstring, ref _catchmessage);

            return ok.ToString();
        }

        [System.Web.Services.WebMethod]
        public static string dodeletedimensionset(string dimsetid, string dimsetBlock, string dimSetBlockValue)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            bool enabled = false;
            if(dimSetBlockValue == "") { enabled = true; }
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            Dimension dm = new Dimension();
            dm._dimSetId = dimsetid;
            dm._enabled = enabled;
            dm._valueFlag = dimsetBlock;
            bool ok = dm.deleteDimensionSet(_connectionstring, ref _catchmessage);
            
            return ok.ToString();
        }
    }
}