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
    public class Profiles
    {
        public string _code = string.Empty;
        public string _description = string.Empty;
        public string _currency = string.Empty;
        public bool _IsBlock = false;
        public string _I_U_Flag = string.Empty;
        public string _editor_MAC_add = string.Empty;
        public string _userid = string.Empty;
        public string _errormsg = string.Empty;

        public DataSet getProfiles(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            //SqlParameter[] SqlRecordParams = new SqlParameter[0];
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                ds = DataHelper.ExecuteDataset(str_ConnString, "load_profile", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Profiles.cs:getProfiles]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool saveprofile(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.NVarChar) { Value = this._code });
                SqlRecordParams.Add(new SqlParameter("@CoName", SqlDbType.NVarChar) { Value = this._description });
                SqlRecordParams.Add(new SqlParameter("@LCurrCd", SqlDbType.NVarChar) { Value = this._currency });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.NVarChar) { Value = this._IsBlock });
                SqlRecordParams.Add(new SqlParameter("@I_U_D_flag", SqlDbType.NVarChar) { Value = this._I_U_Flag });
                SqlRecordParams.Add(new SqlParameter("@p_editor_MAC_add", SqlDbType.VarChar) { Value = this._editor_MAC_add });
                SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier) { Value = (String.IsNullOrEmpty(this._userid)) ? (object)DBNull.Value : (object)Guid.Parse(this._userid) });

                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "create_update_profile", SqlRecordParams.ToArray());
                ok = true;

            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[profiles.cs:saveprofile]" + expErr.Message;
            }
            finally { }
            return ok;

        }

        public bool updateprofiles(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.NVarChar) { Value = this._code });
                SqlRecordParams.Add(new SqlParameter("@CoName", SqlDbType.NVarChar) { Value = this._description });
                SqlRecordParams.Add(new SqlParameter("@LCurrCd", SqlDbType.NVarChar) { Value = this._currency });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.NVarChar) { Value = this._IsBlock });
                SqlRecordParams.Add(new SqlParameter("@I_U_D_flag", SqlDbType.NVarChar) { Value = this._I_U_Flag });
                SqlRecordParams.Add(new SqlParameter("@p_editor_MAC_add", SqlDbType.VarChar) { Value = this._editor_MAC_add });
                SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier) { Value = (String.IsNullOrEmpty(this._userid)) ? (object)DBNull.Value : (object)Guid.Parse(this._userid) });

                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "create_update_profile", SqlRecordParams.ToArray());
                ok = true;
            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[profiles.cs:saveprofile]" + expErr.Message;
            }
            finally { }
            return ok;
        }

        public bool deleteProfile(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.NVarChar) { Value = this._code });
                SqlRecordParams.Add(new SqlParameter("@CoName", SqlDbType.NVarChar) { Value = this._description });
                SqlRecordParams.Add(new SqlParameter("@LCurrCd", SqlDbType.NVarChar) { Value = this._currency });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.NVarChar) { Value = this._IsBlock });
                SqlRecordParams.Add(new SqlParameter("@I_U_D_flag", SqlDbType.NVarChar) { Value = this._I_U_Flag });
                SqlRecordParams.Add(new SqlParameter("@p_editor_MAC_add", SqlDbType.VarChar) { Value = this._editor_MAC_add });
                SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier) { Value = (String.IsNullOrEmpty(this._userid)) ? (object)DBNull.Value : (object)Guid.Parse(this._userid) });

                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "create_update_profile", SqlRecordParams.ToArray());
                ok = true;
            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[Dimension.cs:DeleteDimension]" + expErr.Message;
            }
            finally { }
            return ok;
        }

    }
}
