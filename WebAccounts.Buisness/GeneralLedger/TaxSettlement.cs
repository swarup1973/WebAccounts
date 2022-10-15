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
    public class TaxSettlement
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _SettleCd = string.Empty;
        public string _SettleName = string.Empty;
        public string _TaxAuthId = string.Empty;
        public string _PrdIntervalType = string.Empty;
        public string _PrdIntervalUnit = string.Empty;
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
                ds = DataHelper.ExecuteDataset(str_ConnString, "salestaxcomponentoverview_lookup", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[common.cs:getLookup]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@SettleCd", SqlDbType.NVarChar) { Value = ((string.Empty == this._SettleCd) ? (object)DBNull.Value : this._SettleCd) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@SettleName", SqlDbType.VarChar) { Value = ((string.Empty == this._SettleName) ? (object)DBNull.Value : this._SettleName) });
                SqlRecordParams.Add(new SqlParameter("@TaxAuthId", SqlDbType.BigInt) { Value = ((string.Empty == this._TaxAuthId) ? (object)DBNull.Value : Convert.ToInt64(this._TaxAuthId)) });
                SqlRecordParams.Add(new SqlParameter("@PrdIntervalType", SqlDbType.Char) { Value = ((string.Empty == this._PrdIntervalType) ? (object)DBNull.Value : this._PrdIntervalType) });
                SqlRecordParams.Add(new SqlParameter("@PrdIntervalUnit", SqlDbType.Char) { Value = ((string.Empty == this._PrdIntervalUnit) ? (object)DBNull.Value : Convert.ToInt32(this._PrdIntervalUnit)) });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "TaxSettlementSetup_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[TaxSettlement.cs:Operation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@SettleCd", SqlDbType.NVarChar) { Value = ((string.Empty == this._SettleCd) ? (object)DBNull.Value : this._SettleCd) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@SettleName", SqlDbType.VarChar) { Value = ((string.Empty == this._SettleName) ? (object)DBNull.Value : this._SettleName) });
                SqlRecordParams.Add(new SqlParameter("@TaxAuthId", SqlDbType.BigInt) { Value = ((string.Empty == this._TaxAuthId) ? (object)DBNull.Value : Convert.ToInt64(this._TaxAuthId)) });
                SqlRecordParams.Add(new SqlParameter("@PrdIntervalType", SqlDbType.Char) { Value = ((string.Empty == this._PrdIntervalType) ? (object)DBNull.Value : this._PrdIntervalType) });
                SqlRecordParams.Add(new SqlParameter("@PrdIntervalUnit", SqlDbType.Char) { Value = ((string.Empty == this._PrdIntervalUnit) ? (object)DBNull.Value : Convert.ToInt32(this._PrdIntervalUnit)) });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "TaxSettlementSetup_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[TaxSettlement.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }
}
