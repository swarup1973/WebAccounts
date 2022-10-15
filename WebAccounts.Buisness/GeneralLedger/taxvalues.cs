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
    public class taxvalues
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _TaxId = string.Empty;
        public string _FromDt = string.Empty;
        public string _ToDt = string.Empty;
        public string _MinBaseAmt = string.Empty;
        public string _MaxBaseAmt = string.Empty;
        public string _TaxPer = string.Empty;
        public string _ExeptPer = string.Empty;
        public string _Block = string.Empty;
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
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.Int) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Convert.ToInt32(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_TaxId", SqlDbType.Int) { Value = ((string.Empty == this._TaxId) ? (object)DBNull.Value : Convert.ToInt32(this._TaxId)) });
                SqlRecordParams.Add(new SqlParameter("@p_FromDt", SqlDbType.Bit) { Value = ((string.Empty == this._FromDt) ? (object)DBNull.Value : Convert.ToDateTime(this._FromDt)) });
                SqlRecordParams.Add(new SqlParameter("@p_ToDt", SqlDbType.VarChar) { Value = ((string.Empty == this._ToDt) ? (object)DBNull.Value : Convert.ToDateTime(this._ToDt)) });
                SqlRecordParams.Add(new SqlParameter("@p_TaxDesc", SqlDbType.Decimal) { Value = ((string.Empty == this._MinBaseAmt) ? (object)DBNull.Value : Convert.ToDecimal(this._MinBaseAmt)) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_TaxLiability", SqlDbType.Decimal) { Value = ((string.Empty == this._MaxBaseAmt) ? (object)DBNull.Value : Convert.ToDecimal(this._MaxBaseAmt)) });
                SqlRecordParams.Add(new SqlParameter("@p_BasisOfCalc", SqlDbType.Decimal) { Value = ((string.Empty == this._TaxPer) ? (object)DBNull.Value : Convert.ToDecimal(this._TaxPer)) });
                SqlRecordParams.Add(new SqlParameter("@p_ROff", SqlDbType.Decimal) { Value = ((string.Empty == this._ExeptPer) ? (object)DBNull.Value : Convert.ToDecimal(this._ExeptPer)) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : Convert.ToBoolean(this._Block)) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_TaxValue_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[taxcode.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet check(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.Int) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Convert.ToInt32(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_TaxId", SqlDbType.Int) { Value = ((string.Empty == this._TaxId) ? (object)DBNull.Value : Convert.ToInt32(this._TaxId)) });
                SqlRecordParams.Add(new SqlParameter("@p_FromDt", SqlDbType.Bit) { Value = ((string.Empty == this._FromDt) ? (object)DBNull.Value : Convert.ToDateTime(this._FromDt)) });
                SqlRecordParams.Add(new SqlParameter("@p_ToDt", SqlDbType.VarChar) { Value = ((string.Empty == this._ToDt) ? (object)DBNull.Value : Convert.ToDateTime(this._ToDt)) });
                SqlRecordParams.Add(new SqlParameter("@p_TaxDesc", SqlDbType.Decimal) { Value = ((string.Empty == this._MinBaseAmt) ? (object)DBNull.Value : Convert.ToDecimal(this._MinBaseAmt)) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_TaxLiability", SqlDbType.Decimal) { Value = ((string.Empty == this._MaxBaseAmt) ? (object)DBNull.Value : Convert.ToDecimal(this._MaxBaseAmt)) });
                SqlRecordParams.Add(new SqlParameter("@p_BasisOfCalc", SqlDbType.Decimal) { Value = ((string.Empty == this._TaxPer) ? (object)DBNull.Value : Convert.ToDecimal(this._TaxPer)) });
                SqlRecordParams.Add(new SqlParameter("@p_ROff", SqlDbType.Decimal) { Value = ((string.Empty == this._ExeptPer) ? (object)DBNull.Value : Convert.ToDecimal(this._ExeptPer)) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : Convert.ToBoolean(this._Block)) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_TaxValue_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[taxcode.cs:check]" + expErr.Message;
            }
            finally { }
            return ds;
        }

    }
}
