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
    public class Roles
    {
        public string _id = string.Empty;
        public string _roleid = string.Empty;
        public string _rolename = string.Empty;
        public string _userid = string.Empty;
        public DataTable _dtroledetails = null;

        public DataSet getRoles(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            SqlParameter[] SqlRecordParams = new SqlParameter[0];
            try
            {
                ds = DataHelper.ExecuteDataset(str_ConnString, "co_getroles", SqlRecordParams);
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Roles.cs:getRoles]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getAllPages(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            SqlParameter[] SqlRecordParams = new SqlParameter[1];
            SqlRecordParams[0] = new SqlParameter("@p_roleid", SqlDbType.UniqueIdentifier);
            try
            {
                SqlRecordParams[0].Value = ((string.Empty == _roleid) ? (object)DBNull.Value : (object)Guid.Parse(_roleid));
                ds = DataHelper.ExecuteDataset(str_ConnString, "co_getAllpages", SqlRecordParams);
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Roles.cs:getAllPages]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool checkRolename(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;
            SqlParameter[] SqlRecordParams = new SqlParameter[2];
            SqlRecordParams[0] = new SqlParameter("@p_roleid", SqlDbType.UniqueIdentifier);
            SqlRecordParams[1] = new SqlParameter("@p_rolename", SqlDbType.NVarChar);

            try
            {
                SqlRecordParams[0].Value = ((string.Empty == _roleid) ? (object)DBNull.Value : (object)Guid.Parse(_roleid));
                SqlRecordParams[1].Value = _rolename;
                dt = DataHelper.ExecuteDataset(str_ConnString, "co_checkrolename", SqlRecordParams).Tables[0];
                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[Roles.cs:checkRolename]" + expErr.Message;
            }
            finally { }
            return isexist;
        }

        public bool saveRoleDetails(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;
            SqlParameter[] SqlRecordParams = new SqlParameter[4];
            SqlRecordParams[0] = new SqlParameter("@p_roleid", SqlDbType.UniqueIdentifier);
            SqlRecordParams[1] = new SqlParameter("@p_rolename", SqlDbType.NVarChar);
            SqlRecordParams[2] = new SqlParameter("@p_roledetailslist", System.Data.SqlDbType.Structured);
            SqlRecordParams[3] = new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier);

            try
            {
                SqlRecordParams[0].Value = ((string.Empty == _roleid) ? (object)DBNull.Value : (object)Guid.Parse(_roleid));
                SqlRecordParams[1].Value = _rolename;
                SqlRecordParams[2].Value = _dtroledetails;
                SqlRecordParams[3].Value = ((string.Empty == _userid) ? (object)DBNull.Value : (object)Guid.Parse(_userid));

                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "co_role_modify", SqlRecordParams);
                ok = true;

            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[Roles.cs:saveRoleDetails]" + expErr.Message;
            }
            finally { }
            return ok;

        }

        public DataSet getUsers(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            SqlParameter[] SqlRecordParams = new SqlParameter[0];
            try
            {
                ds = DataHelper.ExecuteDataset(str_ConnString, "co_getusers", SqlRecordParams);
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Roles.cs:getUsers]" + expErr.Message;
            }
            finally { }
            return ds;
        }
    }

}
