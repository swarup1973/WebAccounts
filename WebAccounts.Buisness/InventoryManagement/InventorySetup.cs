using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Data;
using System.Data.SqlClient;
using WebAccounts.Data;

namespace WebAccounts.Buisness
{
    public class InventorySetup
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;

        public string _AllowConsumAfterRNote = string.Empty;
        public string _QuaranticeRequirement = string.Empty;
        public string _RegistrationRequired = string.Empty;
        public string _LocationMandatory = string.Empty;
        public string _BarCodeSetup = string.Empty;
        public string _ActivateQualityManagement = string.Empty;
        public string _ReceivingRequirement = string.Empty;
        public string _PickingRequirement = string.Empty;
        public string _ReservationRequirement = string.Empty;
        public string _Auto_ManualReservation = string.Empty;
        public string _LockItemMovementDuringCount = string.Empty;
        public string _PostingFrom = string.Empty;
        public string _PostingTo = string.Empty;
        public string _ItemMasterNo = string.Empty;
        public string _ClosingVchNo = string.Empty;
        public string _RequisitionNo    = string.Empty;
        public string _TransferOrder = string.Empty;
        public string _ItemJournalNo    = string.Empty;
        public string _CountingJournalNo = string.Empty;
        public string _ReClassificationJournal  = string.Empty;
        public string _RevaluationJournal = string.Empty;
        public string _UpdateUnitCost   = string.Empty;

        public string _IsBlock = string.Empty;
        public string _CoCd = string.Empty;
        public string _created_by = string.Empty;
        public string _creator_MAC_add = string.Empty;


        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@AllowConsumAfterRNote", SqlDbType.Bit) { Value = ((string.Empty == this._AllowConsumAfterRNote) ? (object)DBNull.Value : Convert.ToBoolean(this._AllowConsumAfterRNote)) });
                SqlRecordParams.Add(new SqlParameter("@QuaranticeRequirement", SqlDbType.Bit) { Value = ((string.Empty == this._QuaranticeRequirement) ? (object)DBNull.Value : Convert.ToBoolean(this._QuaranticeRequirement)) });
                SqlRecordParams.Add(new SqlParameter("@RegistrationRequired", SqlDbType.Bit) { Value = ((string.Empty == this._RegistrationRequired) ? (object)DBNull.Value : Convert.ToBoolean(this._RegistrationRequired)) });
                SqlRecordParams.Add(new SqlParameter("@LocationMandatory", SqlDbType.Bit) { Value = ((string.Empty == this._LocationMandatory) ? (object)DBNull.Value : Convert.ToBoolean(this._LocationMandatory)) });
                SqlRecordParams.Add(new SqlParameter("@BarCodeSetup", SqlDbType.VarChar) { Value = ((string.Empty == this._BarCodeSetup) ? (object)DBNull.Value : this._BarCodeSetup) });
                SqlRecordParams.Add(new SqlParameter("@ActivateQualityManagement", SqlDbType.Bit) { Value = ((string.Empty == this._ActivateQualityManagement) ? (object)DBNull.Value : Convert.ToBoolean(this._ActivateQualityManagement)) });
                SqlRecordParams.Add(new SqlParameter("@ReceivingRequirement", SqlDbType.Bit) { Value = ((string.Empty == this._ReceivingRequirement) ? (object)DBNull.Value : Convert.ToBoolean(this._ReceivingRequirement)) });
                SqlRecordParams.Add(new SqlParameter("@PickingRequirement", SqlDbType.Bit) { Value = ((string.Empty == this._PickingRequirement) ? (object)DBNull.Value : Convert.ToBoolean(this._PickingRequirement)) });
                SqlRecordParams.Add(new SqlParameter("@ReservationRequirement", SqlDbType.Bit) { Value = ((string.Empty == this._ReservationRequirement) ? (object)DBNull.Value : Convert.ToBoolean(this._ReservationRequirement)) });
                SqlRecordParams.Add(new SqlParameter("@Auto_ManualReservation", SqlDbType.VarChar) { Value = ((string.Empty == this._Auto_ManualReservation) ? (object)DBNull.Value : this._Auto_ManualReservation) });
                SqlRecordParams.Add(new SqlParameter("@LockItemMovementDuringCount", SqlDbType.VarChar) { Value = ((string.Empty == this._LockItemMovementDuringCount) ? (object)DBNull.Value : this._LockItemMovementDuringCount) });
                SqlRecordParams.Add(new SqlParameter("@PostingFrom", SqlDbType.DateTime) { Value = ((string.Empty == this._PostingFrom) ? (object)DBNull.Value : this._PostingFrom) });
                SqlRecordParams.Add(new SqlParameter("@PostingTo", SqlDbType.DateTime) { Value = ((string.Empty == this._PostingTo) ? (object)DBNull.Value : this._PostingTo) });
                SqlRecordParams.Add(new SqlParameter("@ItemMasterNo", SqlDbType.BigInt) { Value = ((string.Empty == this._ItemMasterNo) ? (object)DBNull.Value : Int64.Parse(this._ItemMasterNo)) });
                SqlRecordParams.Add(new SqlParameter("@ClosingVchNo", SqlDbType.BigInt) { Value = ((string.Empty == this._ClosingVchNo) ? (object)DBNull.Value : Int64.Parse(this._ClosingVchNo)) });
                SqlRecordParams.Add(new SqlParameter("@RequisitionNo", SqlDbType.BigInt) { Value = ((string.Empty == this._RequisitionNo) ? (object)DBNull.Value : Int64.Parse(this._RequisitionNo)) });
                SqlRecordParams.Add(new SqlParameter("@TransferOrder", SqlDbType.BigInt) { Value = ((string.Empty == this._TransferOrder) ? (object)DBNull.Value : Int64.Parse(this._TransferOrder)) });
                SqlRecordParams.Add(new SqlParameter("@ItemJournalNo", SqlDbType.BigInt) { Value = ((string.Empty == this._ItemJournalNo) ? (object)DBNull.Value : Int64.Parse(this._ItemJournalNo)) });
                SqlRecordParams.Add(new SqlParameter("@CountingJournalNo", SqlDbType.BigInt) { Value = ((string.Empty == this._CountingJournalNo) ? (object)DBNull.Value : Int64.Parse(this._CountingJournalNo)) });
                SqlRecordParams.Add(new SqlParameter("@ReClassificationJournal", SqlDbType.BigInt) { Value = ((string.Empty == this._ReClassificationJournal) ? (object)DBNull.Value : Int64.Parse(this._ReClassificationJournal)) });
                SqlRecordParams.Add(new SqlParameter("@RevaluationJournal", SqlDbType.BigInt) { Value = ((string.Empty == this._RevaluationJournal) ? (object)DBNull.Value : Int64.Parse(this._RevaluationJournal)) });
                SqlRecordParams.Add(new SqlParameter("@UpdateUnitCost", SqlDbType.BigInt) { Value = ((string.Empty == this._UpdateUnitCost) ? (object)DBNull.Value : Int64.Parse(this._UpdateUnitCost)) });

                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Inventory_Setup_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[inventory.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }
    }
}
