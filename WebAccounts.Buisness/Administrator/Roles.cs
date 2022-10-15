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
        public string _rolecd = string.Empty;
        public string _createdby = string.Empty;

        public string _pno = string.Empty;
        public string _type = string.Empty;
        public string _cocd = string.Empty;
        public bool _iscustomrole = false;

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

        public DataSet doloadcombo_rolepermission(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            SqlParameter[] SqlRecordParams = new SqlParameter[1];
            SqlRecordParams[0] = new SqlParameter("@p_CoCd", SqlDbType.VarChar);
            //SqlRecordParams[1] = new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier);
            try
            {
                SqlRecordParams[0].Value = _cocd;
                //SqlRecordParams[1].Value = ((string.Empty == _userid) ? (object)DBNull.Value : (object)Guid.Parse(_userid));
                ds = DataHelper.ExecuteDataset(str_ConnString, "loadcombo_rolepermission", SqlRecordParams);
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Roles.cs:doloadcombo_rolepermission]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getAdministrator_Permission(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            SqlParameter[] SqlRecordParams = new SqlParameter[2];
            SqlRecordParams[0] = new SqlParameter("@p_rolecd", SqlDbType.VarChar);
            SqlRecordParams[1] = new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier);
            try
            {
                SqlRecordParams[0].Value = _rolecd;
                SqlRecordParams[1].Value = ((string.Empty == _userid) ? (object)DBNull.Value : (object)Guid.Parse(_userid));
                ds = DataHelper.ExecuteDataset(str_ConnString, "rolepermission_get", SqlRecordParams);
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Roles.cs:getAdministrator_Permission]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet get_LoadPermission(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            SqlParameter[] SqlRecordParams = new SqlParameter[2];
            SqlRecordParams[0] = new SqlParameter("@pPNO", SqlDbType.VarChar);
            SqlRecordParams[1] = new SqlParameter("@pType", SqlDbType.Char);
            try
            {
                SqlRecordParams[0].Value = _pno;
                SqlRecordParams[1].Value = _type;
                ds = DataHelper.ExecuteDataset(str_ConnString, "USP_LoadPermission", SqlRecordParams);
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Roles.cs:get_LoadPermission]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool saveAdministrator_Permission(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;
            SqlParameter[] SqlRecordParams = new SqlParameter[6];
            SqlRecordParams[0] = new SqlParameter("@p_rolecd", SqlDbType.VarChar);
            SqlRecordParams[1] = new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier);
            SqlRecordParams[2] = new SqlParameter("@p_rolepermissions", System.Data.SqlDbType.Structured);
            SqlRecordParams[3] = new SqlParameter("@p_iscustomrole", SqlDbType.Bit);
            SqlRecordParams[4] = new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier);
            SqlRecordParams[5] = new SqlParameter("@p_CoCd", SqlDbType.VarChar);

            try
            {
                SqlRecordParams[0].Value = _rolecd;
                SqlRecordParams[1].Value = ((string.Empty == _userid) ? (object)DBNull.Value : (object)Guid.Parse(_userid));
                SqlRecordParams[2].Value = _dtroledetails;
                SqlRecordParams[3].Value = _iscustomrole;
                SqlRecordParams[4].Value = ((string.Empty == _createdby) ? (object)DBNull.Value : (object)Guid.Parse(_createdby));
                SqlRecordParams[5].Value = _cocd;

                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "rolepermission_modify", SqlRecordParams);
                ok = true;

            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[Roles.cs:saveAdministrator_Permission]" + expErr.Message;
            }
            finally { }
            return ok;

        }
    }

}
