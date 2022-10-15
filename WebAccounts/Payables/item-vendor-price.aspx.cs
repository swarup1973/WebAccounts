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
    public partial class item_vendor_price : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadVendorItemPricelist(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string cocd = requestdata.cocd;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            /*_data["vendorcode"] = $('#txt_vendorno').val();
            _data["item"] = $('#dd_searchitem').val();
            _data["startdate"] = $('#txt_searchstartdate').val();
            _data["enddate"] = $('#txt_searchenddate').val();
            _data["cocd"] = VendorItemPriceObject.cocd;*/

            vendoritemprice vnd = new vendoritemprice();
            vnd._mode = "getlist";
            vnd._vendorcode = requestdata.vendorcode; 
            vnd._itemcode= requestdata.item;
            vnd._startdate= requestdata.startdate;
            vnd._enddate = requestdata.enddate;
            vnd._CoCd = cocd;
            DataSet ds = vnd.Operation(_connectionstring, ref _catchmessage);

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
        public static string docheckcode(string id, string vendorcode, string cocd, string startdate, string enddate, string itemcode, string uomcode)
        {

            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;
            string _vendorcode = vendorcode;
            string _cocd = cocd;
            string _startdate = startdate;
            string _enddate = enddate;
            string _itemcode = itemcode;
            string _uomcode = uomcode;

            vendoritemprice vnd = new vendoritemprice();
            vnd._mode = "check";
            vnd._rowid = _id;
            vnd._vendorcode = _vendorcode;
            vnd._CoCd = _cocd;
            vnd._startdate = startdate;
            vnd._enddate = _enddate;
            vnd._itemcode = _itemcode;
            vnd._uomcode = uomcode;

            DataSet ds =vnd.check(_connectionstring, ref _catchmessage);

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
        public static string doSave(string data)
        {
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
            vendoritemprice vnd = new vendoritemprice();
            vnd._mode = "modify";

            string id = requestdata.id;
            string cocd = requestdata.cocd;
            vnd._rowid = id;
            vnd._CoCd = cocd;

            string vendorcode = requestdata.vendcode;
            string itemcode = requestdata.itemcode;
            string uomcode = requestdata.uomcode;
            string minqty = requestdata.minqty;
            string maxqty = requestdata.maxqty;
            string priceperunit = requestdata.priceperunit;
            string startdate = requestdata.startdate;
            string enddate = requestdata.enddate;
            string isblock = requestdata.Isblock;


            vnd._vendorcode = vendorcode;
            vnd._itemcode = itemcode;
            vnd._uomcode = uomcode;
            vnd._minqty = minqty;
            vnd._maxqty = maxqty;
            vnd._priceperunit = priceperunit;
            vnd._startdate = startdate;
            vnd._enddate = enddate;
            vnd._Block = isblock;


            string ip = requestdata.ip;
            vnd._creator_MAC_add = ip;

            vnd._created_by = HttpContext.Current.Session["userid"].ToString();

            DataSet ds = vnd.Operation(_connectionstring, ref _catchmessage);

            if (ds.Tables[0].Rows.Count > 0)
            {
                ok = true;
                _ret = ds.Tables[0].Rows[0]["id"].ToString();
            }

            return ok.ToString() + "|~|" + _ret;
        }

        [System.Web.Services.WebMethod]
        public static string doedit(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string id = requestdata.id;
            //string isblock = requestdata.isblock; 

            vendoritemprice vnd = new vendoritemprice();
            vnd._mode = "getbyid";
            vnd._rowid = id;

            //vnd._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = vnd.Operation(_connectionstring, ref _catchmessage);

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

            vendoritemprice vnd = new vendoritemprice();
            vnd._mode = "delete";
            vnd._rowid = _id;

            DataSet ds = vnd.check(_connectionstring, ref _catchmessage);
            if (Convert.ToInt32(ds.Tables[0].Rows[0]["dataexists"].ToString()) > 0) isaccodeexists = true;
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

            vendraccountoverview vnd = new vendraccountoverview();
            vnd._mode = "checkref";
            vnd._rowid = _id;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

       
    }
}