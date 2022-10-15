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
    public partial class location_transfer : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static string loadlist(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string faid = requestdata.faid;
            string cocd = requestdata.cocd;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            locationtransfer vnd = new locationtransfer();
            vnd._mode = "getlist";
            vnd._CoCd = cocd;
            vnd._FAId = faid;
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
        public static string doSave(string data)
        {
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
            locationtransfer vnd = new locationtransfer();
            vnd._mode = "modify";

            string cocd = requestdata.cocd;
            vnd._CoCd = cocd;

            string id = requestdata.id;
            string faid = requestdata.faid;
            string TransfDt = requestdata.TransfDt;
            string FALocIdFrom = requestdata.FALocIdFrom;
            string FALocIdTo = requestdata.FALocIdTo;
            string DimIdFrom = requestdata.DimIdFrom;
            string DimValueIdFrom = requestdata.DimValueIdFrom;
            string DimIdTo = requestdata.DimIdTo;
            string DimValueIdTo = requestdata.DimValueIdTo;
            string Remarks = requestdata.Remarks;
            string isblock = requestdata.isblock;
            string ip = requestdata.ip;

            vnd._rowid = id;
            vnd._FAId = faid;
            vnd._TransfDt = TransfDt;
            vnd._FALocIdFrom = FALocIdFrom;
            vnd._FALocIdTo = FALocIdTo;
            vnd._DimIdFrom = DimIdFrom;
            vnd._DimValueIdFrom = DimValueIdFrom;
            vnd._DimIdTo = DimIdTo;
            vnd._DimValueIdTo = DimValueIdTo;
            vnd._Remarks = Remarks;            
            vnd._IsBlock = isblock;
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
        public static string dodelete(string id, string faid)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;
            string _faid = faid;

            locationtransfer vnd = new locationtransfer();
            vnd._mode = "delete";
            vnd._rowid = _id;
            vnd._FAId = _faid;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

    }
}