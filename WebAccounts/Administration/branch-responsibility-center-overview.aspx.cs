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

namespace WebAccounts.Administration
{
    public partial class branch_responsibility_center_overview : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                txt.Text = Session["userid"].ToString();
            }
        }

        [System.Web.Services.WebMethod]
        public static string loadBranch(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string cocd = requestdata.cocd;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            BranchResposibility br = new BranchResposibility();
            br._cocd = cocd;
            DataSet ds = br.getBranch(_connectionstring, ref _catchmessage);

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
        public static string doedit(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string id = requestdata.id;
            string cocd = requestdata.cocd;
            //string isblock = requestdata.isblock; 

            UOM ns = new UOM();
            ns._id = id;
            ns._cocd = cocd;

            //vnd._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = ns.getUOM(_connectionstring, ref _catchmessage);

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
        public static string dodelete(string id)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;

            BranchResposibility vnd = new BranchResposibility();
            vnd._mode = "delete";
            vnd._id = _id;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string docheckdelete(string id)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;

            BranchResposibility vnd = new BranchResposibility();
            vnd._mode = "checkref";
            vnd._id = _id;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }
    }
}