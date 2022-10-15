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
    public class procurementsetup
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _PostingFrom = string.Empty;
        public string _PostingTo = string.Empty;
        public string _AcceptOverdelivery = string.Empty;
        public string _AcceptUnderdelivery = string.Empty;
        public string _VendorMasterNo = string.Empty;
        public string _QuotNo = string.Empty;
        public string _BlanketOrderNo = string.Empty;
        public string _BlanketOrderReleaseNo = string.Empty;
        public string _PONo = string.Empty;
        public string _POConfNo = string.Empty;
        public string _Request_QuotNo = string.Empty;
        public string _QuotConfNo = string.Empty;
        public string _ReturnOrderNo = string.Empty;
        public string _PurchaseJournal = string.Empty;

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
                SqlRecordParams.Add(new SqlParameter("@PostingFrom", SqlDbType.DateTime) { Value = ((string.Empty == this._PostingFrom) ? (object)DBNull.Value : this._PostingFrom) });
                SqlRecordParams.Add(new SqlParameter("@PostingTo", SqlDbType.DateTime) { Value = ((string.Empty == this._PostingTo) ? (object)DBNull.Value : this._PostingTo) });
                SqlRecordParams.Add(new SqlParameter("@AcceptOverdelivery", SqlDbType.Bit) { Value = ((string.Empty == this._AcceptOverdelivery) ? (object)DBNull.Value : Convert.ToBoolean(this._AcceptOverdelivery)) });
                SqlRecordParams.Add(new SqlParameter("@AcceptUnderdelivery", SqlDbType.Bit) { Value = ((string.Empty == this._AcceptUnderdelivery) ? (object)DBNull.Value : Convert.ToBoolean(this._AcceptUnderdelivery)) });
                SqlRecordParams.Add(new SqlParameter("@VendorMasterNo", SqlDbType.BigInt) { Value = ((string.Empty == this._VendorMasterNo) ? (object)DBNull.Value : Int64.Parse(this._VendorMasterNo)) });
                SqlRecordParams.Add(new SqlParameter("@QuotNo", SqlDbType.Int) { Value = ((string.Empty == this._QuotNo) ? (object)DBNull.Value : Int64.Parse(this._QuotNo)) });
                SqlRecordParams.Add(new SqlParameter("@BlanketOrderNo", SqlDbType.Int) { Value = ((string.Empty == this._BlanketOrderNo) ? (object)DBNull.Value : Int64.Parse(this._BlanketOrderNo)) });
                SqlRecordParams.Add(new SqlParameter("@BlanketOrderReleaseNo", SqlDbType.Int) { Value = ((string.Empty == this._BlanketOrderReleaseNo) ? (object)DBNull.Value : Int64.Parse(this._BlanketOrderReleaseNo)) });
                SqlRecordParams.Add(new SqlParameter("@PONo", SqlDbType.Int) { Value = ((string.Empty == this._PONo) ? (object)DBNull.Value : Int64.Parse(this._PONo)) });
                SqlRecordParams.Add(new SqlParameter("@POConfNo", SqlDbType.Int) { Value = ((string.Empty == this._POConfNo) ? (object)DBNull.Value : Int64.Parse(this._POConfNo)) });
                SqlRecordParams.Add(new SqlParameter("@Request_QuotNo", SqlDbType.Int) { Value = ((string.Empty == this._Request_QuotNo) ? (object)DBNull.Value : Int64.Parse(this._Request_QuotNo)) });
                SqlRecordParams.Add(new SqlParameter("@QuotConfNo", SqlDbType.Int) { Value = ((string.Empty == this._QuotConfNo) ? (object)DBNull.Value : Int64.Parse(this._QuotConfNo)) });
                SqlRecordParams.Add(new SqlParameter("@ReturnOrderNo", SqlDbType.Int) { Value = ((string.Empty == this._ReturnOrderNo) ? (object)DBNull.Value : Int64.Parse(this._ReturnOrderNo)) });
                SqlRecordParams.Add(new SqlParameter("@PurchaseJournal", SqlDbType.Int) { Value = ((string.Empty == this._PurchaseJournal) ? (object)DBNull.Value : Int64.Parse(this._PurchaseJournal)) });

                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Procurement_Setup_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[procurement.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

    }
}
