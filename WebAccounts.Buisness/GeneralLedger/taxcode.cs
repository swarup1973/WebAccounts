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
    public class taxcode
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _TaxCode = string.Empty;
        public string _TaxDesc = string.Empty;
        public string _AcCd_TaxLiability = string.Empty;
        public string _BasisOfCalc = string.Empty;
        public string _ROff = string.Empty;
        public string _RType = string.Empty;
        public string _Block = string.Empty;
        public string _CoCd = string.Empty;
        public string _created_by = string.Empty;
        public string _creator_MAC_add = string.Empty;


        public DataSet getAccount(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "get_Account", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[taxcode.cs:Operation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_TaxCode", SqlDbType.VarChar) { Value = ((string.Empty == this._TaxCode) ? (object)DBNull.Value : this._TaxCode) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@p_TaxDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._TaxDesc) ? (object)DBNull.Value : this._TaxDesc) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_TaxLiability", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_TaxLiability) ? (object)DBNull.Value : this._AcCd_TaxLiability) });
                SqlRecordParams.Add(new SqlParameter("@p_BasisOfCalc", SqlDbType.Decimal) { Value = ((string.Empty == this._BasisOfCalc) ? (object)DBNull.Value : Convert.ToInt32(this._BasisOfCalc)) });
                SqlRecordParams.Add(new SqlParameter("@p_ROff", SqlDbType.VarChar) { Value = ((string.Empty == this._ROff) ? (object)DBNull.Value : Convert.ToDecimal(this._ROff)) });
                SqlRecordParams.Add(new SqlParameter("@p_RType", SqlDbType.VarChar) { Value = ((string.Empty == this._RType) ? (object)DBNull.Value : Convert.ToInt32(this._RType)) });
                //SqlRecordParams.Add(new SqlParameter("@p_startdate", SqlDbType.Bit) { Value = ((string.Empty == this._startdate) ? (object)DBNull.Value : Convert.ToDateTime(this._startdate)) });
                //SqlRecordParams.Add(new SqlParameter("@p_enddate", SqlDbType.VarChar) { Value = ((string.Empty == this._enddate) ? (object)DBNull.Value : Convert.ToDateTime(this._enddate)) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : Convert.ToBoolean(this._Block)) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_TaxCode_operation", SqlRecordParams.ToArray());
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
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_TaxCode", SqlDbType.VarChar) { Value = ((string.Empty == this._TaxCode) ? (object)DBNull.Value : this._TaxCode) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@p_TaxDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._TaxDesc) ? (object)DBNull.Value : this._TaxDesc) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_TaxLiability", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_TaxLiability) ? (object)DBNull.Value : this._AcCd_TaxLiability) });
                SqlRecordParams.Add(new SqlParameter("@p_BasisOfCalc", SqlDbType.Decimal) { Value = ((string.Empty == this._BasisOfCalc) ? (object)DBNull.Value : Convert.ToInt32(this._BasisOfCalc)) });
                SqlRecordParams.Add(new SqlParameter("@p_ROff", SqlDbType.VarChar) { Value = ((string.Empty == this._ROff) ? (object)DBNull.Value : Convert.ToDecimal(this._ROff)) });
                SqlRecordParams.Add(new SqlParameter("@p_RType", SqlDbType.VarChar) { Value = ((string.Empty == this._RType) ? (object)DBNull.Value : Convert.ToInt32(this._RType)) });
                //SqlRecordParams.Add(new SqlParameter("@p_startdate", SqlDbType.Bit) { Value = ((string.Empty == this._startdate) ? (object)DBNull.Value : Convert.ToDateTime(this._startdate)) });
                //SqlRecordParams.Add(new SqlParameter("@p_enddate", SqlDbType.VarChar) { Value = ((string.Empty == this._enddate) ? (object)DBNull.Value : Convert.ToDateTime(this._enddate)) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : Convert.ToBoolean(this._Block)) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_TaxCode_operation", SqlRecordParams.ToArray());
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
