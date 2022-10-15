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
    public class Administrator_Role
    {

        public string _roleid = string.Empty;
        public string _mode = string.Empty;

        public string _rolecd = string.Empty;
        public string _description = string.Empty;
        public string _rolecenterCd = string.Empty;
        public string _postingfrom = string.Empty;
        public string _postingto = string.Empty;
        public string _isblock = string.Empty;
        public string _createdby = string.Empty;
        public string _cocd = string.Empty;

        public DataSet GetRoleCenter(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "get_Administrator_RoleCenter", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Administrator_Role.cs:GetRoleCenter]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet RoleOperation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_roleid", SqlDbType.BigInt) { Value = ((string.Empty == this._roleid) ? (object)DBNull.Value : Int64.Parse(this._roleid)) });
                SqlRecordParams.Add(new SqlParameter("@p_rolecode", SqlDbType.VarChar) { Value = ((string.Empty == this._rolecd) ? (object)DBNull.Value : this._rolecd) });
                SqlRecordParams.Add(new SqlParameter("@p_description", SqlDbType.VarChar) { Value = ((string.Empty == this._description) ? (object)DBNull.Value : this._description) }); 
                SqlRecordParams.Add(new SqlParameter("@p_rolecentercd", SqlDbType.VarChar) { Value = ((string.Empty == this._rolecenterCd) ? (object)DBNull.Value : this._rolecenterCd) }); 
                SqlRecordParams.Add(new SqlParameter("@p_postingfrom", SqlDbType.DateTime) { Value = ((string.Empty == this._postingfrom) ? (object)DBNull.Value : Convert.ToDateTime(this._postingfrom)) });
                SqlRecordParams.Add(new SqlParameter("@p_postingto", SqlDbType.DateTime) { Value = ((string.Empty == this._postingto) ? (object)DBNull.Value : Convert.ToDateTime(this._postingto)) });
                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Administrator_Role_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[[Administrator_Role.cs:RoleOperation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool checkrolecode(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_roleid", SqlDbType.BigInt) { Value = ((string.Empty == this._roleid) ? (object)DBNull.Value : Int64.Parse(this._roleid)) });
                SqlRecordParams.Add(new SqlParameter("@p_rolecode", SqlDbType.VarChar) { Value = ((string.Empty == this._rolecd) ? (object)DBNull.Value : this._rolecd) });
                SqlRecordParams.Add(new SqlParameter("@p_description", SqlDbType.VarChar) { Value = ((string.Empty == this._description) ? (object)DBNull.Value : this._description) });
                SqlRecordParams.Add(new SqlParameter("@p_rolecentercd", SqlDbType.VarChar) { Value = ((string.Empty == this._rolecenterCd) ? (object)DBNull.Value : this._rolecenterCd) });
                SqlRecordParams.Add(new SqlParameter("@p_postingfrom", SqlDbType.DateTime) { Value = ((string.Empty == this._postingfrom) ? (object)DBNull.Value : Convert.ToDateTime(this._postingfrom)) });
                SqlRecordParams.Add(new SqlParameter("@p_postingto", SqlDbType.DateTime) { Value = ((string.Empty == this._postingto) ? (object)DBNull.Value : Convert.ToDateTime(this._postingto)) });
                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "Administrator_Role_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[chatofacct.cs:checkacccode]" + expErr.Message;
            }
            finally { }
            return isexist;
        }


    }
}
