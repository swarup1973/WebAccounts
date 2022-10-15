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
    public class FixedAssetSetup
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;

        public string _MinDepAmount = string.Empty;
        public string _MinBookValueAfterDepn = string.Empty;
        public string _CapitalisationThreshold = string.Empty;
        public string _AllowPropDepn = string.Empty;
        public string _DefaultDepnCode = string.Empty;
        public string _PostingFrom = string.Empty;
        public string _PostingTo = string.Empty;
        public string _FixedAssetNo = string.Empty;
        public string _FixedAssetsTransfer = string.Empty;
        public string _FixedAssetsLoan = string.Empty;
        public string _ReclassificationJournal = string.Empty;
        public string _InsuranceJournal = string.Empty;
        public string _MaintenanceJournal = string.Empty;
        public string _DepreciationJournal = string.Empty;

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
                SqlRecordParams.Add(new SqlParameter("@MinDepAmount", SqlDbType.Decimal) { Value = ((string.Empty == this._MinDepAmount) ? (object)DBNull.Value : Convert.ToDecimal(this._MinDepAmount)) });
                SqlRecordParams.Add(new SqlParameter("@MinBookValueAfterDepn", SqlDbType.Decimal) { Value = ((string.Empty == this._MinBookValueAfterDepn) ? (object)DBNull.Value : Convert.ToDecimal(this._MinBookValueAfterDepn)) });
                SqlRecordParams.Add(new SqlParameter("@CapitalisationThreshold", SqlDbType.Decimal) { Value = ((string.Empty == this._CapitalisationThreshold) ? (object)DBNull.Value : Convert.ToDecimal(this._CapitalisationThreshold)) });
                SqlRecordParams.Add(new SqlParameter("@AllowPropDepn", SqlDbType.Bit) { Value = ((string.Empty == this._AllowPropDepn) ? (object)DBNull.Value : Convert.ToBoolean(this._AllowPropDepn)) });
                SqlRecordParams.Add(new SqlParameter("@DefaultDepnCode", SqlDbType.BigInt) { Value = ((string.Empty == this._DefaultDepnCode) ? (object)DBNull.Value : Int64.Parse(this._DefaultDepnCode)) });
                SqlRecordParams.Add(new SqlParameter("@PostingFrom", SqlDbType.DateTime) { Value = ((string.Empty == this._PostingFrom) ? (object)DBNull.Value : this._PostingFrom) });
                SqlRecordParams.Add(new SqlParameter("@PostingTo", SqlDbType.DateTime) { Value = ((string.Empty == this._PostingTo) ? (object)DBNull.Value : this._PostingTo) });
                SqlRecordParams.Add(new SqlParameter("@FixedAssetNo", SqlDbType.BigInt) { Value = ((string.Empty == this._FixedAssetNo) ? (object)DBNull.Value : Int64.Parse(this._FixedAssetNo)) });
                SqlRecordParams.Add(new SqlParameter("@FixedAssetsTransfer", SqlDbType.BigInt) { Value = ((string.Empty == this._FixedAssetsTransfer) ? (object)DBNull.Value : Int64.Parse(this._FixedAssetsTransfer)) });
                SqlRecordParams.Add(new SqlParameter("@FixedAssetsLoan", SqlDbType.BigInt) { Value = ((string.Empty == this._FixedAssetsLoan) ? (object)DBNull.Value : Int64.Parse(this._FixedAssetsLoan)) });
                SqlRecordParams.Add(new SqlParameter("@ReclassificationJournal", SqlDbType.BigInt) { Value = ((string.Empty == this._ReclassificationJournal) ? (object)DBNull.Value : Int64.Parse(this._ReclassificationJournal)) });
                SqlRecordParams.Add(new SqlParameter("@InsuranceJournal", SqlDbType.BigInt) { Value = ((string.Empty == this._InsuranceJournal) ? (object)DBNull.Value : Int64.Parse(this._InsuranceJournal)) });
                SqlRecordParams.Add(new SqlParameter("@MaintenanceJournal", SqlDbType.BigInt) { Value = ((string.Empty == this._MaintenanceJournal) ? (object)DBNull.Value : Int64.Parse(this._MaintenanceJournal)) });
                SqlRecordParams.Add(new SqlParameter("@DepreciationJournal", SqlDbType.BigInt) { Value = ((string.Empty == this._DepreciationJournal) ? (object)DBNull.Value : Int64.Parse(this._DepreciationJournal)) });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "FixedAsset_FixedAssetSetup_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[fixedasset.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }
    }
}
