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
    public class User
    {
        public string _userid = string.Empty;
        public string _userroleid = string.Empty;
        public string _username = string.Empty;
        public string _userpsw = string.Empty;
        public string _userprofile = string.Empty;
        public string _userprofileid = string.Empty;
        public string _user_firstname = string.Empty;
        public string _user_lastname = string.Empty;
        public string _userimagepath = string.Empty;
        public string _userby = string.Empty;
        public bool _iscustomrole = false;
        public string _pno = string.Empty;
        public string _type = string.Empty;
        public string _cocd = string.Empty;
        public string _pagelink = string.Empty;
        public string _menuid = string.Empty;

        public DataSet getFinYear(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            //SqlParameter[] SqlRecordParams = new SqlParameter[0];
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                ds = DataHelper.ExecuteDataset(str_ConnString, "co_get_finyear", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[User.cs:getFinYear]" + expErr.Message;
            }
            finally { }
            return ds;
        }
        public DataSet dologin(string str_ConnString, ref string str_catchmessage)
        {
            //bool isexists = false;
            DataSet ds = null;
            SqlParameter[] SqlRecordParams = new SqlParameter[2];
            SqlRecordParams[0] = new SqlParameter("@p_username", SqlDbType.NVarChar);
            SqlRecordParams[1] = new SqlParameter("@p_psw", SqlDbType.NVarChar);
            try
            {
                SqlRecordParams[0].Value = _username;
                SqlRecordParams[1].Value = _userpsw;
                //ds = DataHelper.ExecuteDataset(str_ConnString, "co_login", SqlRecordParams);
                ds = DataHelper.ExecuteDataset(str_ConnString, "user_login", SqlRecordParams);
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[users.cs:dologin]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getusermenu(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            SqlParameter[] SqlRecordParams = new SqlParameter[3];
            //SqlRecordParams[0] = new SqlParameter("@p_roleid", SqlDbType.UniqueIdentifier);
            SqlRecordParams[0] = new SqlParameter("@pPNO", SqlDbType.VarChar);
            SqlRecordParams[1] = new SqlParameter("@pType", SqlDbType.Char);
            SqlRecordParams[2] = new SqlParameter("@CoCd", SqlDbType.Char);
            try
            {
                //SqlRecordParams[0].Value = Guid.Parse(_userroleid);
                //ds = DataHelper.ExecuteDataset(str_ConnString, "co_getusermenu", SqlRecordParams);

                SqlRecordParams[0].Value = _pno;
                SqlRecordParams[1].Value = _type;
                SqlRecordParams[2].Value = _cocd; 
                ds = DataHelper.ExecuteDataset(str_ConnString, "get_LoadPermission_afterlogin", SqlRecordParams);
                
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[users.cs:getusermenu]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getUserDetails(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            SqlParameter[] SqlRecordParams = new SqlParameter[1];
            SqlRecordParams[0] = new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier);
            try
            {
                SqlRecordParams[0].Value = ((string.Empty == _userid) ? (object)DBNull.Value : (object)Guid.Parse(_userid));
                ds = DataHelper.ExecuteDataset(str_ConnString, "co_get_userdetails", SqlRecordParams);
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[users.cs:getUserDetails]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool checkUsername(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;
            SqlParameter[] SqlRecordParams = new SqlParameter[2];
            SqlRecordParams[0] = new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier);
            SqlRecordParams[1] = new SqlParameter("@p_username", SqlDbType.NVarChar);

            try
            {
                SqlRecordParams[0].Value = ((string.Empty == _userid) ? (object)DBNull.Value : (object)Guid.Parse(_userid));
                SqlRecordParams[1].Value = _username;
                dt = DataHelper.ExecuteDataset(str_ConnString, "co_checkusername", SqlRecordParams).Tables[0];
                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[Roles.cs:checkUsername]" + expErr.Message;
            }
            finally { }
            return isexist;
        }

        public bool saveUserDetails(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;
            SqlParameter[] SqlRecordParams = new SqlParameter[7];
            SqlRecordParams[0] = new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier);
            SqlRecordParams[1] = new SqlParameter("@p_username", SqlDbType.NVarChar);
            SqlRecordParams[2] = new SqlParameter("@p_userpassword", SqlDbType.NVarChar);
            SqlRecordParams[3] = new SqlParameter("@p_userfirstname", SqlDbType.NVarChar);
            SqlRecordParams[4] = new SqlParameter("@p_userlastname", SqlDbType.NVarChar);
            SqlRecordParams[5] = new SqlParameter("@p_roleid", SqlDbType.UniqueIdentifier);
            SqlRecordParams[6] = new SqlParameter("@p_addedby", SqlDbType.UniqueIdentifier);

            try
            {
                SqlRecordParams[0].Value = ((string.Empty == _userid) ? (object)DBNull.Value : (object)Guid.Parse(_userid));
                SqlRecordParams[1].Value = _username;
                SqlRecordParams[2].Value = _userpsw;
                SqlRecordParams[3].Value = _user_firstname;
                SqlRecordParams[4].Value = _user_lastname;
                SqlRecordParams[5].Value = ((string.Empty == _userroleid) ? (object)DBNull.Value : (object)Guid.Parse(_userroleid));
                SqlRecordParams[6].Value = ((string.Empty == _userby) ? (object)DBNull.Value : (object)Guid.Parse(_userby));

                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "co_user_modify", SqlRecordParams);
                ok = true;
            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[User.cs:saveUserDetails]" + expErr.Message;
            }
            finally { }
            return ok;

        }

        public DataSet getuserpagespermission(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            SqlParameter[] SqlRecordParams = new SqlParameter[4];
            SqlRecordParams[0] = new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier);
            SqlRecordParams[1] = new SqlParameter("@p_rolecode", SqlDbType.NVarChar);
            SqlRecordParams[2] = new SqlParameter("@p_iscustomrole", SqlDbType.Bit);
            SqlRecordParams[3] = new SqlParameter("@p_pagelink", SqlDbType.NVarChar);
            try
            {
                SqlRecordParams[0].Value = ((string.Empty == _userid) ? (object)DBNull.Value : (object)Guid.Parse(_userid));
                SqlRecordParams[1].Value = _userroleid;
                SqlRecordParams[2].Value = _iscustomrole;
                SqlRecordParams[3].Value = _pagelink;

                ds = DataHelper.ExecuteDataset(str_ConnString, "user_getpermission_details", SqlRecordParams);

            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[users.cs:getuserpagespermission]" + expErr.Message;
            }
            finally { }
            return ds;		 
        }

        public DataSet getactivemenulist(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            SqlParameter[] SqlRecordParams = new SqlParameter[1];
            SqlRecordParams[0] = new SqlParameter("@menuid", SqlDbType.BigInt);
            try
            {
                SqlRecordParams[0].Value = ((string.Empty == _menuid) ? (object)DBNull.Value : Convert.ToInt64(_menuid));
                ds = DataHelper.ExecuteDataset(str_ConnString, "get_hiererchymenu_bymenuid", SqlRecordParams);
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[users.cs:getactivemenulist]" + expErr.Message;
            }
            finally { }
            return ds;
        }

    }
}
