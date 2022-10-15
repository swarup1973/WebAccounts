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
    public partial class center_setup : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadcentersetup(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string cocd = requestdata.cocd;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            BranchResposibility br = new BranchResposibility();
            br._cocd = cocd;
            DataSet ds = br.getLocation(_connectionstring, ref _catchmessage);

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
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string cocd = requestdata.cocd;
            string id = requestdata.id;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            BranchResposibility br = new BranchResposibility();
            br._cocd = cocd;
            br._id = id;
            DataSet ds = br.editBranch(_connectionstring, ref _catchmessage);

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
        public static string docheckcode(string id, string pid, string code, string cocd)
        {
            bool isaccodeexists = false; string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;
            string _code = code;
            string _cocd = cocd;
            string _pid = pid;

            UOM ns = new UOM();
            ns._mode = "check";
            ns._id = _id;
            ns._code = _code;
            ns._cocd = _cocd;

            //isaccodeexists = ns.check(_connectionstring, ref _catchmessage);
            DataSet ds = ns.validate(_connectionstring, ref _catchmessage);

            JSONString = JsonConvert.SerializeObject(ds);

            if (ds != null)
            {
                ds.Tables.Clear();
                ds.Dispose();
                ds = null;
            }
            return JSONString;
            //return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string doSave(string data)
        {
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
            BranchResposibility ns = new BranchResposibility();
            ns._mode = "modify";

            string id = requestdata.id;
            string cocd = requestdata.cocd;
            ns._id = id;
            ns._cocd = cocd;

            string code = requestdata.code;
            string Name = requestdata.Name;
            string City = requestdata.City;
            string PostCode = requestdata.PostCode;
            string Add1 = requestdata.Add1;
            string Add2 = requestdata.Add2;
            string Country = requestdata.Country;
            string Location = requestdata.Location;
            string ContactPerson = requestdata.ContactPerson;
            string Fax = requestdata.Fax;
            string Phone = requestdata.Phone;
            string Email = requestdata.Email;
            string AltPhone = requestdata.AltPhone;
            string WebSite = requestdata.WebSite;
            bool Block = requestdata.Block;
            ns._branchcode = code;
            ns._branchname = Name;
            ns._city = City;
            ns._postcode = PostCode;
            ns._addline1 = Add1;
            ns._addline2 = Add2;
            ns._country = Country;
            ns._location = Location;
            ns._contactperson = ContactPerson;
            ns._faxno = Fax;
            ns._phoneno = Phone;
            ns._email = Email;
            ns._alternatephoneno = AltPhone;
            ns._website = WebSite;
            ns._isblock = Block;

            string ip = requestdata.ip;
            ns._creator_MAC_add = ip;

            ns._createdby = HttpContext.Current.Session["userid"].ToString();

            DataSet ds = ns.Operation(_connectionstring, ref _catchmessage);

            if (ds.Tables[0].Rows.Count > 0)
            {
                ok = true;
                _ret = ds.Tables[0].Rows[0]["id"].ToString();
            }

            return ok.ToString() + "|~|" + _ret;
        }
    }
}