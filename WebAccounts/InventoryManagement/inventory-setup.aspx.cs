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
    public partial class inventory_setup : System.Web.UI.Page
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
            InventorySetup vnd = new InventorySetup();
            vnd._mode = "modify";

            string cocd = requestdata.cocd;
            vnd._CoCd = cocd;

            string AllowConsumAfterRNote = requestdata.AllowConsumAfterRNote;
            string QuaranticeRequirement = requestdata.QuaranticeRequirement;
            string RegistrationRequired = requestdata.RegistrationRequired;
            string LocationMandatory = requestdata.LocationMandatory;
            string BarCodeSetup = string.Empty; // requestdata.BarCodeSetup;
            string ActivateQualityManagement = requestdata.ActivateQualityManagement;
            string ReceivingRequirement = requestdata.ReceivingRequirement;
            string PickingRequirement = requestdata.PickingRequirement;
            string ReservationRequirement = requestdata.ReservationRequirement;
            string Auto_ManualReservation = requestdata.Auto_ManualReservation;
            string LockItemMovementDuringCount = requestdata.LockItemMovementDuringCount;
            string PostingFrom = requestdata.PostingFrom;
            string PostingTo = requestdata.PostingTo;
            string ItemMasterNo = requestdata.ItemMasterNo;
            string ClosingVchNo = requestdata.ClosingVchNo;
            string RequisitionNo = requestdata.RequisitionNo;
            string TransferOrder = requestdata.TransferOrder;
            string ItemJournalNo = requestdata.ItemJournalNo;
            string CountingJournalNo = requestdata.CountingJournalNo;
            string ReClassificationJournal = requestdata.ReClassificationJournal;
            string RevaluationJournal = requestdata.RevaluationJournal;
            string UpdateUnitCost = requestdata.UpdateUnitCost;
            string isblocked = requestdata.isblocked;
            string ip = requestdata.ip;


            vnd._AllowConsumAfterRNote = AllowConsumAfterRNote;
            vnd._QuaranticeRequirement = QuaranticeRequirement;
            vnd._RegistrationRequired = RegistrationRequired;
            vnd._LocationMandatory = LocationMandatory;
            vnd._BarCodeSetup = BarCodeSetup;
            vnd._ActivateQualityManagement = ActivateQualityManagement;
            vnd._ReceivingRequirement = ReceivingRequirement;
            vnd._PickingRequirement = PickingRequirement;
            vnd._ReservationRequirement = ReservationRequirement;
            vnd._Auto_ManualReservation = Auto_ManualReservation;
            vnd._LockItemMovementDuringCount = LockItemMovementDuringCount;
            vnd._PostingFrom = PostingFrom;
            vnd._PostingTo = PostingTo;
            vnd._ItemMasterNo = ItemMasterNo;
            vnd._ClosingVchNo = ClosingVchNo;
            vnd._RequisitionNo = RequisitionNo;
            vnd._TransferOrder = TransferOrder;
            vnd._ItemJournalNo = ItemJournalNo;
            vnd._CountingJournalNo = CountingJournalNo;
            vnd._ReClassificationJournal = ReClassificationJournal;
            vnd._RevaluationJournal = RevaluationJournal;
            vnd._UpdateUnitCost = UpdateUnitCost;

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

            InventorySetup vnd = new InventorySetup();
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