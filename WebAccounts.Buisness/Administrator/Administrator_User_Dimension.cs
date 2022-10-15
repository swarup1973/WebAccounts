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
    public class Administrator_User_Dimension
    {
        public string _id = string.Empty;
        public string _mode = string.Empty;

        public string _userid = string.Empty;
        public string _dimid = string.Empty;
        public string _dimvaluecd = string.Empty;
        public string _createdby = string.Empty;

        public DataSet GetLokupdata(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                ds = DataHelper.ExecuteDataset(str_ConnString, "Administrator_User_Dimension_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Administrator_User_Dimension.cs:GetLokupdata]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_dimid", SqlDbType.VarChar) { Value = ((string.Empty == this._dimid) ? (object)DBNull.Value : Int64.Parse(this._dimid)) });
                SqlRecordParams.Add(new SqlParameter("@p_dimvaluecd", SqlDbType.NVarChar) { Value = ((string.Empty == this._dimvaluecd) ? (object)DBNull.Value : this._dimvaluecd) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Administrator_User_Dimension_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[[Administrator_User_Dimension.cs:RoleAssignmentOperation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_dimid", SqlDbType.VarChar) { Value = ((string.Empty == this._dimid) ? (object)DBNull.Value : Int64.Parse(this._dimid)) });
                SqlRecordParams.Add(new SqlParameter("@p_dimvaluecd", SqlDbType.NVarChar) { Value = ((string.Empty == this._dimvaluecd) ? (object)DBNull.Value : this._dimvaluecd) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "Administrator_User_Dimension_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[Administrator_User_Dimension.cs:checkdataexist]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }
}
