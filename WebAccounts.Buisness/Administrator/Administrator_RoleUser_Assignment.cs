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
    public class Administrator_RoleUser_Assignment
    {
        public string _roleid = string.Empty;
        public string _id = string.Empty;
        public string _mode = string.Empty;

        public string _rolecd = string.Empty;
        public string _userid = string.Empty;
        public string _isdefaultrole = string.Empty;
        public string _createdby = string.Empty;
        public string _cocd = string.Empty;

        public DataSet GetLokupdata(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                ds = DataHelper.ExecuteDataset(str_ConnString, "Administrator_RoleUser_Assignment_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Administrator_RoleUser_Assignment.cs:GetLokupdata]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet RoleAssignmentOperation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_id", SqlDbType.BigInt) { Value = ((string.Empty == this._id) ? (object)DBNull.Value : Int64.Parse(this._id)) });
                SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.VarChar) { Value = ((string.Empty == this._userid) ? (object)DBNull.Value : (object)Guid.Parse(this._userid)) });
                SqlRecordParams.Add(new SqlParameter("@p_rolecode", SqlDbType.VarChar) { Value = ((string.Empty == this._rolecd) ? (object)DBNull.Value : this._rolecd) });
                SqlRecordParams.Add(new SqlParameter("@p_isdefaultrole", SqlDbType.Bit) { Value = ((string.Empty == this._isdefaultrole) ? (object)DBNull.Value : Convert.ToBoolean(this._isdefaultrole)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Administrator_RoleUser_Assignment_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[[Administrator_RoleUser_Assignment.cs:RoleAssignmentOperation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool checkdataexist(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_id", SqlDbType.BigInt) { Value = ((string.Empty == this._id) ? (object)DBNull.Value : Int64.Parse(this._id)) });
                SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.VarChar) { Value = ((string.Empty == this._userid) ? (object)DBNull.Value : (object)Guid.Parse(this._userid)) });
                SqlRecordParams.Add(new SqlParameter("@p_rolecode", SqlDbType.VarChar) { Value = ((string.Empty == this._rolecd) ? (object)DBNull.Value : this._rolecd) });
                SqlRecordParams.Add(new SqlParameter("@p_isdefaultrole", SqlDbType.Bit) { Value = ((string.Empty == this._isdefaultrole) ? (object)DBNull.Value : Convert.ToBoolean(this._isdefaultrole)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : (object)Guid.Parse(this._cocd)) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "Administrator_RoleUser_Assignment_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[Administrator_RoleUser_Assignment.cs:checkdataexist]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }
}
