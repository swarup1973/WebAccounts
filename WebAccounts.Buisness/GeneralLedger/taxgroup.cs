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

    public class taxgroup
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _TaxGrpCode = string.Empty;
        public string _Desc = string.Empty;
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
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpCode", SqlDbType.VarChar) { Value = ((string.Empty == this._TaxGrpCode) ? (object)DBNull.Value : this._TaxGrpCode) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._Desc) ? (object)DBNull.Value : this._Desc) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : Convert.ToBoolean(this._Block)) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_TaxGroup_operation", SqlRecordParams.ToArray());
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
                SqlRecordParams.Add(new SqlParameter("@p_GrpCode", SqlDbType.VarChar) { Value = ((string.Empty == this._TaxGrpCode) ? (object)DBNull.Value : this._TaxGrpCode) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._Desc) ? (object)DBNull.Value : this._Desc) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : Convert.ToBoolean(this._Block)) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_TaxGroup_operation", SqlRecordParams.ToArray());
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
