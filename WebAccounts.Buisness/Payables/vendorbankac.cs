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
    public class vendorbankac
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _vendcode = string.Empty;
        public string _code = string.Empty;
        public string _name = string.Empty;
        public string _branch = string.Empty;
        public string _ifsc = string.Empty;
        public string _address = string.Empty;
        public string _isblock = string.Empty;
        public string _createdby = string.Empty;
        public string _creator_MAC_add = string.Empty;
        public string _cocd = string.Empty;

        public DataSet GetRoleCenter(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                ds = DataHelper.ExecuteDataset(str_ConnString, "get_Administrator_RoleCenter", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[vendorbankac.cs:GetRoleCenter]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_vendcd", SqlDbType.VarChar) { Value = ((string.Empty == this._vendcode) ? (object)DBNull.Value : this._vendcode) });
                SqlRecordParams.Add(new SqlParameter("@p_acno", SqlDbType.VarChar) { Value = ((string.Empty == this._code) ? (object)DBNull.Value : this._code) });
                SqlRecordParams.Add(new SqlParameter("@p_Name", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });
                SqlRecordParams.Add(new SqlParameter("@p_branch", SqlDbType.VarChar) { Value = ((string.Empty == this._branch) ? (object)DBNull.Value : this._branch) });
                SqlRecordParams.Add(new SqlParameter("@p_ifsc", SqlDbType.VarChar) { Value = ((string.Empty == this._ifsc) ? (object)DBNull.Value : this._ifsc) });
                SqlRecordParams.Add(new SqlParameter("@p_address", SqlDbType.VarChar) { Value = ((string.Empty == this._address) ? (object)DBNull.Value : this._address) });
                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });
                SqlRecordParams.Add(new SqlParameter("@cocd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "VendorBank_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[vendorbankac.cs:RoleOperation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_vendcd", SqlDbType.VarChar) { Value = ((string.Empty == this._vendcode) ? (object)DBNull.Value : this._vendcode) });
                SqlRecordParams.Add(new SqlParameter("@p_acno", SqlDbType.VarChar) { Value = ((string.Empty == this._code) ? (object)DBNull.Value : this._code) });
                SqlRecordParams.Add(new SqlParameter("@p_Name", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });
                SqlRecordParams.Add(new SqlParameter("@p_branch", SqlDbType.VarChar) { Value = ((string.Empty == this._branch) ? (object)DBNull.Value : this._branch) });
                SqlRecordParams.Add(new SqlParameter("@p_ifsc", SqlDbType.VarChar) { Value = ((string.Empty == this._ifsc) ? (object)DBNull.Value : this._ifsc) });
                SqlRecordParams.Add(new SqlParameter("@p_address", SqlDbType.VarChar) { Value = ((string.Empty == this._address) ? (object)DBNull.Value : this._address) });
                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });
                SqlRecordParams.Add(new SqlParameter("@cocd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "VendorBank_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[vendorbankac.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }

    }
}
