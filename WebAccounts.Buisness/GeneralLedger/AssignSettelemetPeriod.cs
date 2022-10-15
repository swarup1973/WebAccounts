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
    public class AssignSettelemetPeriod
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _CoCd = string.Empty;
        public string _SaleTaxCompId = string.Empty;
        public string _FromDt = string.Empty;
        public string _ToDt = string.Empty;
        public string _PrdIntervalType = string.Empty;
        public string _PrdIntervalUnit = string.Empty;
        public string _IsBlock = string.Empty;
        public string _created_by = string.Empty;
        public string _creator_MAC_add = string.Empty;

        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@TaxSetmntId", SqlDbType.BigInt) { Value = ((string.Empty == this._SaleTaxCompId) ? (object)DBNull.Value : Int64.Parse(this._SaleTaxCompId)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@FromDt", SqlDbType.Bit) { Value = ((string.Empty == this._FromDt) ? (object)DBNull.Value : Convert.ToDateTime(this._FromDt)) });
                SqlRecordParams.Add(new SqlParameter("@ToDt", SqlDbType.VarChar) { Value = ((string.Empty == this._ToDt) ? (object)DBNull.Value : Convert.ToDateTime(this._ToDt)) });
                SqlRecordParams.Add(new SqlParameter("@PrdIntervalType", SqlDbType.Char) { Value = ((string.Empty == this._PrdIntervalType) ? (object)DBNull.Value : this._PrdIntervalType) });
                SqlRecordParams.Add(new SqlParameter("@PrdIntervalUnit", SqlDbType.Char) { Value = ((string.Empty == this._PrdIntervalUnit) ? (object)DBNull.Value : Convert.ToInt32(this._PrdIntervalUnit)) });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "AssignSettlementPeriod_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[AssignSettelemetPeriod.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet check(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataSet ds = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@TaxSetmntId", SqlDbType.BigInt) { Value = ((string.Empty == this._SaleTaxCompId) ? (object)DBNull.Value : Int64.Parse(this._SaleTaxCompId)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@FromDt", SqlDbType.Bit) { Value = ((string.Empty == this._FromDt) ? (object)DBNull.Value : Convert.ToDateTime(this._FromDt)) });
                SqlRecordParams.Add(new SqlParameter("@ToDt", SqlDbType.VarChar) { Value = ((string.Empty == this._ToDt) ? (object)DBNull.Value : Convert.ToDateTime(this._ToDt)) });
                SqlRecordParams.Add(new SqlParameter("@PrdIntervalType", SqlDbType.Char) { Value = ((string.Empty == this._PrdIntervalType) ? (object)DBNull.Value : this._PrdIntervalType) });
                SqlRecordParams.Add(new SqlParameter("@PrdIntervalUnit", SqlDbType.Char) { Value = ((string.Empty == this._PrdIntervalUnit) ? (object)DBNull.Value : Convert.ToInt32(this._PrdIntervalUnit)) });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "AssignSettlementPeriod_operation", SqlRecordParams.ToArray());

                //if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[AssignSettelemetPeriod.cs:check]" + expErr.Message;
            }
            finally { }
            return ds;
        }

    }
}
