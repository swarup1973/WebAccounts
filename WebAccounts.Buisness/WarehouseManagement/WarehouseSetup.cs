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
    public class WarehouseSetup
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;

        public string _WareHouseCd = string.Empty;
        public string _PostingFrom = string.Empty;
        public string _PostingTo = string.Empty;
        public string _QualityOrderNo = string.Empty;
        public string _TransferOrderNo = string.Empty;
        public string _MovementJounralNo = string.Empty;
        public string _RegistrationNo = string.Empty;
        public string _PickingListNo = string.Empty;
        public string _PackingSlipNo = string.Empty;
        public string _RejectionNoteNo = string.Empty;
        public string _InwardGateEntryNo = string.Empty;
        public string _OutwardGateEntryNo = string.Empty;

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
                SqlRecordParams.Add(new SqlParameter("@WareHouseCd", SqlDbType.VarChar) { Value = ((string.Empty == this._WareHouseCd) ? (object)DBNull.Value : this._WareHouseCd) });
                SqlRecordParams.Add(new SqlParameter("@PostingFrom", SqlDbType.DateTime) { Value = ((string.Empty == this._PostingFrom) ? (object)DBNull.Value : this._PostingFrom) });
                SqlRecordParams.Add(new SqlParameter("@PostingTo", SqlDbType.DateTime) { Value = ((string.Empty == this._PostingTo) ? (object)DBNull.Value : this._PostingTo) });
                SqlRecordParams.Add(new SqlParameter("@QualityOrderNo", SqlDbType.BigInt) { Value = ((string.Empty == this._QualityOrderNo) ? (object)DBNull.Value : Int64.Parse(this._QualityOrderNo)) });
                SqlRecordParams.Add(new SqlParameter("@TransferOrderNo", SqlDbType.BigInt) { Value = ((string.Empty == this._TransferOrderNo) ? (object)DBNull.Value : Int64.Parse(this._TransferOrderNo)) });
                SqlRecordParams.Add(new SqlParameter("@MovementJounralNo", SqlDbType.BigInt) { Value = ((string.Empty == this._MovementJounralNo) ? (object)DBNull.Value : Int64.Parse(this._MovementJounralNo)) });
                SqlRecordParams.Add(new SqlParameter("@RegistrationNo", SqlDbType.BigInt) { Value = ((string.Empty == this._RegistrationNo) ? (object)DBNull.Value : Int64.Parse(this._RegistrationNo)) });
                SqlRecordParams.Add(new SqlParameter("@PickingListNo", SqlDbType.BigInt) { Value = ((string.Empty == this._PickingListNo) ? (object)DBNull.Value : Int64.Parse(this._PickingListNo)) });
                SqlRecordParams.Add(new SqlParameter("@PackingSlipNo", SqlDbType.BigInt) { Value = ((string.Empty == this._PackingSlipNo) ? (object)DBNull.Value : Int64.Parse(this._PackingSlipNo)) });
                SqlRecordParams.Add(new SqlParameter("@RejectionNoteNo", SqlDbType.BigInt) { Value = ((string.Empty == this._RejectionNoteNo) ? (object)DBNull.Value : Int64.Parse(this._RejectionNoteNo)) });
                SqlRecordParams.Add(new SqlParameter("@InwardGateEntryNo", SqlDbType.BigInt) { Value = ((string.Empty == this._InwardGateEntryNo) ? (object)DBNull.Value : Int64.Parse(this._InwardGateEntryNo)) });
                SqlRecordParams.Add(new SqlParameter("@OutwardGateEntryNo", SqlDbType.BigInt) { Value = ((string.Empty == this._OutwardGateEntryNo) ? (object)DBNull.Value : Int64.Parse(this._OutwardGateEntryNo)) });

                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Inventory_WarehouseSetup_Setup_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[warehouse.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }
    }
}
