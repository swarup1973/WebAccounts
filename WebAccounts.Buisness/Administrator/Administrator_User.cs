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
    public class Administrator_User
    {
        public string _userid = string.Empty;
        public string _mode = string.Empty;

        public string _empid = string.Empty;
        public string _password = string.Empty;
        public string _loginname = string.Empty;
        public string _postingfrom = string.Empty;
        public string _postingto = string.Empty;
        public string _isblock = string.Empty;
        public string _createdby = string.Empty;
        public string _UTupeCd = string.Empty;
        public string _CoCd = string.Empty;

        public DataSet GetEmployee(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._userid) ? (object)DBNull.Value : (object)Guid.Parse(this._userid)) });
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.NVarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = ((string.Empty == this._mode) ? (object)DBNull.Value : this._mode) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "get_Administrator_Employee", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Administrator_User.cs:GetEmployee]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet UserOperation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                if (this._userid == null || this._userid == "" || this._userid == "undefined") {
                    SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._userid) ? (object)DBNull.Value : this._userid) });
                } else
                {
                    SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._userid) ? (object)DBNull.Value : (object)Guid.Parse(this._userid)) });
                }
                SqlRecordParams.Add(new SqlParameter("@p_empid", SqlDbType.BigInt) { Value = ((string.Empty == this._empid) ? (object)DBNull.Value : Int64.Parse(this._empid)) });
                SqlRecordParams.Add(new SqlParameter("@p_password", SqlDbType.NVarChar) { Value = ((string.Empty == this._password) ? (object)DBNull.Value : this._password) });
                SqlRecordParams.Add(new SqlParameter("@p_loginname", SqlDbType.NVarChar) { Value = ((string.Empty == this._loginname) ? (object)DBNull.Value : this._loginname) });
                SqlRecordParams.Add(new SqlParameter("@p_postingfrom", SqlDbType.DateTime) { Value = ((string.Empty == this._postingfrom) ? (object)DBNull.Value : Convert.ToDateTime(this._postingfrom)) });
                SqlRecordParams.Add(new SqlParameter("@p_postingto", SqlDbType.DateTime) { Value = ((string.Empty == this._postingto) ? (object)DBNull.Value : Convert.ToDateTime(this._postingto)) });
                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@p_UTupeCd", SqlDbType.NVarChar) { Value = ((string.Empty == this._UTupeCd) ? (object)DBNull.Value : this._UTupeCd) });
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.NVarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Administrator_User_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[chatofacct.cs:getchatofacctlistlist]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool checkusercode(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                if (this._userid == null || this._userid == "" || this._userid == "undefined")
                {
                    SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._userid) ? (object)DBNull.Value : this._userid) });
                }
                else
                {
                    SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._userid) ? (object)DBNull.Value : (object)Guid.Parse(this._userid)) });
                }
                SqlRecordParams.Add(new SqlParameter("@p_empid", SqlDbType.BigInt) { Value = ((string.Empty == this._empid) ? (object)DBNull.Value : Int64.Parse(this._empid)) });
                SqlRecordParams.Add(new SqlParameter("@p_password", SqlDbType.NVarChar) { Value = ((string.Empty == this._password) ? (object)DBNull.Value : this._password) });
                SqlRecordParams.Add(new SqlParameter("@p_loginname", SqlDbType.NVarChar) { Value = ((string.Empty == this._loginname) ? (object)DBNull.Value : this._loginname) });
                SqlRecordParams.Add(new SqlParameter("@p_postingfrom", SqlDbType.DateTime) { Value = ((string.Empty == this._postingfrom) ? (object)DBNull.Value : Convert.ToDateTime(this._postingfrom)) });
                SqlRecordParams.Add(new SqlParameter("@p_postingto", SqlDbType.DateTime) { Value = ((string.Empty == this._postingto) ? (object)DBNull.Value : Convert.ToDateTime(this._postingto)) });
                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@p_UTupeCd", SqlDbType.NVarChar) { Value = ((string.Empty == this._UTupeCd) ? (object)DBNull.Value : this._UTupeCd) });
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.NVarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "Administrator_User_operation", SqlRecordParams.ToArray()).Tables[0];

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
