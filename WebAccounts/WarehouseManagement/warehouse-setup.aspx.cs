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
    public partial class warehouse_setup : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.UrlReferrer == null)
            {
                Response.Redirect("../login.aspx");
            }
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
            WarehouseSetup vnd = new WarehouseSetup();
            vnd._mode = "modify";

            string cocd = requestdata.cocd;
            vnd._CoCd = cocd;

            string WareHouseCd = requestdata.WareHouseCd;
            string PostingFrom = requestdata.PostingFrom;
            string PostingTo = requestdata.PostingTo;
            string QualityOrderNo = requestdata.QualityOrderNo;
            string TransferOrderNo = requestdata.TransferOrderNo;
            string MovementJounralNo = requestdata.MovementJounralNo;
            string RegistrationNo = requestdata.RegistrationNo;
            string PickingListNo = requestdata.PickingListNo;
            string PackingSlipNo = requestdata.PackingSlipNo;
            string RejectionNoteNo = requestdata.RejectionNoteNo;
            string InwardGateEntryNo = requestdata.InwardGateEntryNo;
            string OutwardGateEntryNo = requestdata.OutwardGateEntryNo;
            string isblocked = requestdata.isblocked;
            string ip = requestdata.ip;
            
            vnd._WareHouseCd = WareHouseCd;
            vnd._PostingFrom = PostingFrom;
            vnd._PostingTo = PostingTo;
            vnd._QualityOrderNo = QualityOrderNo;
            vnd._TransferOrderNo = TransferOrderNo;
            vnd._MovementJounralNo = MovementJounralNo;
            vnd._RegistrationNo = RegistrationNo;
            vnd._PickingListNo = PickingListNo;
            vnd._PackingSlipNo = PackingSlipNo;
            vnd._RejectionNoteNo = RejectionNoteNo;
            vnd._InwardGateEntryNo = InwardGateEntryNo;
            vnd._OutwardGateEntryNo = OutwardGateEntryNo;

            vnd._IsBlock = isblocked;
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

            string cocd = requestdata.cocd;
            //string isblock = requestdata.isblock; 

            WarehouseSetup vnd = new WarehouseSetup();
            vnd._mode = "getdetail";
            vnd._CoCd = cocd;

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

    }
}