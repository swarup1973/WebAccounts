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
    public class depreciationbook
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _DepnCode = string.Empty;
        public string _DepnDesc = string.Empty;
        public string _UpdateLedger = string.Empty;
        public string _FABookType = string.Empty;
        public string _DefaultRndingAmtTo = string.Empty;
        public string _DefaultEndingBookValue = string.Empty;
        public string _DepnThresholdDays = string.Empty;
        public string _AllowChangesDepnMethod = string.Empty;
        public string _IsBlock = string.Empty;
        public string _CoCd = string.Empty;
        public string _created_by = string.Empty;
        public string _creator_MAC_add = string.Empty;

        public DataSet getLookup(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "depreciationbook_lookup", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[JournalBatch.cs:journalbatch_lookup]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@DepnCode", SqlDbType.VarChar) { Value = ((string.Empty == this._DepnCode) ? (object)DBNull.Value : this._DepnCode) });
                SqlRecordParams.Add(new SqlParameter("@DepnDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._DepnDesc) ? (object)DBNull.Value : this._DepnDesc) });
                SqlRecordParams.Add(new SqlParameter("@UpdateLedger", SqlDbType.Int) { Value = ((string.Empty == this._UpdateLedger) ? (object)DBNull.Value : Convert.ToBoolean(this._UpdateLedger)) });
                SqlRecordParams.Add(new SqlParameter("@FABookType", SqlDbType.VarChar) { Value = ((string.Empty == this._FABookType) ? (object)DBNull.Value : this._FABookType) });
                SqlRecordParams.Add(new SqlParameter("@DefaultRndingAmtTo", SqlDbType.Int) { Value = ((string.Empty == this._DefaultRndingAmtTo) ? (object)DBNull.Value : Convert.ToInt32(this._DefaultRndingAmtTo)) });
                SqlRecordParams.Add(new SqlParameter("@DefaultEndingBookValue", SqlDbType.VarChar) { Value = ((string.Empty == this._DefaultEndingBookValue) ? (object)DBNull.Value : Convert.ToInt32(this._DefaultEndingBookValue)) });
                SqlRecordParams.Add(new SqlParameter("@DepnThresholdDays", SqlDbType.Int) { Value = ((string.Empty == this._DepnThresholdDays) ? (object)DBNull.Value : Convert.ToInt32(this._DepnThresholdDays)) });
                SqlRecordParams.Add(new SqlParameter("@AllowChangesDepnMethod", SqlDbType.VarChar) { Value = ((string.Empty == this._AllowChangesDepnMethod) ? (object)DBNull.Value : Convert.ToBoolean(this._AllowChangesDepnMethod)) });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "FixedAsset_DepreciationBookSetup_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[JournalBatch.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool check(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@DepnCode", SqlDbType.VarChar) { Value = ((string.Empty == this._DepnCode) ? (object)DBNull.Value : this._DepnCode) });
                SqlRecordParams.Add(new SqlParameter("@DepnDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._DepnDesc) ? (object)DBNull.Value : this._DepnDesc) });
                SqlRecordParams.Add(new SqlParameter("@UpdateLedger", SqlDbType.Int) { Value = ((string.Empty == this._UpdateLedger) ? (object)DBNull.Value : Convert.ToBoolean(this._UpdateLedger)) });
                SqlRecordParams.Add(new SqlParameter("@FABookType", SqlDbType.VarChar) { Value = ((string.Empty == this._FABookType) ? (object)DBNull.Value : this._FABookType) });
                SqlRecordParams.Add(new SqlParameter("@DefaultRndingAmtTo", SqlDbType.Int) { Value = ((string.Empty == this._DefaultRndingAmtTo) ? (object)DBNull.Value : Convert.ToInt32(this._DefaultRndingAmtTo)) });
                SqlRecordParams.Add(new SqlParameter("@DefaultEndingBookValue", SqlDbType.VarChar) { Value = ((string.Empty == this._DefaultEndingBookValue) ? (object)DBNull.Value : Convert.ToInt32(this._DefaultEndingBookValue)) });
                SqlRecordParams.Add(new SqlParameter("@DepnThresholdDays", SqlDbType.Int) { Value = ((string.Empty == this._DepnThresholdDays) ? (object)DBNull.Value : Convert.ToInt32(this._DepnThresholdDays)) });
                SqlRecordParams.Add(new SqlParameter("@AllowChangesDepnMethod", SqlDbType.VarChar) { Value = ((string.Empty == this._AllowChangesDepnMethod) ? (object)DBNull.Value : Convert.ToBoolean(this._AllowChangesDepnMethod)) });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });


                dt = DataHelper.ExecuteDataset(str_ConnString, "FixedAsset_DepreciationBookSetup_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[JournalBatch.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }




    }
}
