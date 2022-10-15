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
    public class TaxAuthoritySetup
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _AuthCd = string.Empty;
        public string _AuthDesc = string.Empty;
        public string _TaxAuthCode = string.Empty;
        public string _PhoneNo1 = string.Empty;
        public string _PhoneNo2 = string.Empty;
        public string _EMail = string.Empty;
        public string _Website = string.Empty;
        public string _Address = string.Empty;
        public string _Extension = string.Empty;
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
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_AuthCd", SqlDbType.VarChar) { Value = ((string.Empty == this._AuthCd) ? (object)DBNull.Value : this._AuthCd) });
                SqlRecordParams.Add(new SqlParameter("@p_AuthDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._AuthDesc) ? (object)DBNull.Value : this._AuthDesc) });
                SqlRecordParams.Add(new SqlParameter("@p_TaxAuthCode", SqlDbType.BigInt) { Value = ((string.Empty == this._TaxAuthCode) ? (object)DBNull.Value : Convert.ToInt64(this._TaxAuthCode)) });
                SqlRecordParams.Add(new SqlParameter("@p_PhoneNo1", SqlDbType.VarChar) { Value = ((string.Empty == this._PhoneNo1) ? (object)DBNull.Value : this._PhoneNo1) });
                SqlRecordParams.Add(new SqlParameter("@p_PhoneNo2", SqlDbType.VarChar) { Value = ((string.Empty == this._PhoneNo2) ? (object)DBNull.Value : this._PhoneNo2) });
                SqlRecordParams.Add(new SqlParameter("@p_EMail", SqlDbType.VarChar) { Value = ((string.Empty == this._EMail) ? (object)DBNull.Value : this._EMail) });
                SqlRecordParams.Add(new SqlParameter("@p_Website", SqlDbType.VarChar) { Value = ((string.Empty == this._Website) ? (object)DBNull.Value : this._Website) });
                SqlRecordParams.Add(new SqlParameter("@p_Address", SqlDbType.VarChar) { Value = ((string.Empty == this._Address) ? (object)DBNull.Value : this._Address) });
                SqlRecordParams.Add(new SqlParameter("@p_Extension", SqlDbType.Int) { Value = ((string.Empty == this._Extension) ? (object)DBNull.Value : Convert.ToInt32(this._Extension)) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : Convert.ToBoolean(this._Block)) });
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@p_created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@p_editor_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_TaxAuthoritySetup_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[TaxAuthoritySetup.cs:Operation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_AuthCd", SqlDbType.VarChar) { Value = ((string.Empty == this._AuthCd) ? (object)DBNull.Value : this._AuthCd) });
                SqlRecordParams.Add(new SqlParameter("@p_AuthDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._AuthDesc) ? (object)DBNull.Value : this._AuthDesc) });
                SqlRecordParams.Add(new SqlParameter("@p_TaxAuthCode", SqlDbType.BigInt) { Value = ((string.Empty == this._TaxAuthCode) ? (object)DBNull.Value : Convert.ToInt64(this._TaxAuthCode)) });
                SqlRecordParams.Add(new SqlParameter("@p_PhoneNo1", SqlDbType.VarChar) { Value = ((string.Empty == this._PhoneNo1) ? (object)DBNull.Value : this._PhoneNo1) });
                SqlRecordParams.Add(new SqlParameter("@p_PhoneNo2", SqlDbType.VarChar) { Value = ((string.Empty == this._PhoneNo2) ? (object)DBNull.Value : this._PhoneNo2) });
                SqlRecordParams.Add(new SqlParameter("@p_EMail", SqlDbType.VarChar) { Value = ((string.Empty == this._EMail) ? (object)DBNull.Value : this._EMail) });
                SqlRecordParams.Add(new SqlParameter("@p_Website", SqlDbType.VarChar) { Value = ((string.Empty == this._Website) ? (object)DBNull.Value : this._Website) });
                SqlRecordParams.Add(new SqlParameter("@p_Address", SqlDbType.VarChar) { Value = ((string.Empty == this._Address) ? (object)DBNull.Value : this._Address) });
                SqlRecordParams.Add(new SqlParameter("@p_Extension", SqlDbType.Int) { Value = ((string.Empty == this._Extension) ? (object)DBNull.Value : Convert.ToInt32(this._Extension)) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : Convert.ToBoolean(this._Block)) });
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@p_created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@p_editor_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_TaxAuthoritySetup_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;

            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[TaxAuthoritySetup.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }

    }
}
