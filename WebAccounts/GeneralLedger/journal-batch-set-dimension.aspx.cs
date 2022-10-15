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
    public partial class journal_batch_set_dimension : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.UrlReferrer == null)
            {
                Response.Redirect("../login.aspx");
            }
        }

        [System.Web.Services.WebMethod]
        public static string doloadDimSetupData(string rowid, string cocd)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            journalbatchdimension _obj = new journalbatchdimension();
            _obj._rowid = rowid;
            _obj._cocd = cocd;
            _obj._mode = "getbyid";
            DataSet ds = _obj.getDimSetupdetails(_connectionstring, ref _catchmessage);
            if (ds.Tables.Count > 0)
            {
                JSONString = JsonConvert.SerializeObject(ds);
            }
            return JSONString;
        }

        [System.Web.Services.WebMethod]
        public static string doSavedimsetup(string data)
        {
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string rowid = requestdata.rowid;
            string bankcd = requestdata.bankcd;

            string dim1_Branch = requestdata.dim1_Branch;
            string dim1DefValue = requestdata.dim1DefValue;

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

            journalbatchdimension _obj = new journalbatchdimension();

            _obj._rowid = rowid;
            _obj._mode = "modify";
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

            _obj._cocd = requestdata.cocd;

            _obj._creator_mac_add = requestdata.creator_mac_add;
            _obj._createdby = HttpContext.Current.Session["userid"].ToString();

            result = _obj.saveDimSetup(_connectionstring, ref _catchmessage);
            return result;
        }
    }
}