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
    public class TaxJurisdiction
    {
        public string _id = string.Empty;
        public string _mode = string.Empty;

        public string _AuthCd = string.Empty;
        public string _AuthName = string.Empty;
        public string _IsBlock = string.Empty;
        public string _createdby = string.Empty;
        public string _cocd = string.Empty;


        public DataSet doOperation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._id) ? (object)DBNull.Value : Int64.Parse(this._id)) });
                SqlRecordParams.Add(new SqlParameter("@p_AuthCd", SqlDbType.VarChar) { Value = ((string.Empty == this._AuthCd) ? (object)DBNull.Value : this._AuthCd) });
                SqlRecordParams.Add(new SqlParameter("@p_AuthName", SqlDbType.VarChar) { Value = ((string.Empty == this._AuthName) ? (object)DBNull.Value : this._AuthName) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_TaxJurisdiction_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[TaxJurisdiction.cs:doOperation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool checkcode(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._id) ? (object)DBNull.Value : Int64.Parse(this._id)) });
                SqlRecordParams.Add(new SqlParameter("@p_AuthCd", SqlDbType.VarChar) { Value = ((string.Empty == this._AuthCd) ? (object)DBNull.Value : this._AuthCd) });
                SqlRecordParams.Add(new SqlParameter("@p_AuthName", SqlDbType.VarChar) { Value = ((string.Empty == this._AuthName) ? (object)DBNull.Value : this._AuthName) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_TaxJurisdiction_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[TaxJurisdiction.cs:checkcode]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }
}
