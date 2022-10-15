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
    public class LedgerCategory
    {
        public string _id = string.Empty;
        public string _mode = string.Empty;

        public string _LedCatCd = string.Empty;
        public string _LedCatDesc = string.Empty;
        public string _IsClose = string.Empty;
        public string _createdby = string.Empty;
        public string _cocd = string.Empty;


        public DataSet doOperation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_LedCatId", SqlDbType.Int) { Value = ((string.Empty == this._id) ? (object)DBNull.Value : Int32.Parse(this._id)) });
                SqlRecordParams.Add(new SqlParameter("@p_LedCatCd", SqlDbType.VarChar) { Value = ((string.Empty == this._LedCatCd) ? (object)DBNull.Value : this._LedCatCd) });
                SqlRecordParams.Add(new SqlParameter("@p_LedCatDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._LedCatDesc) ? (object)DBNull.Value : this._LedCatDesc) });
                SqlRecordParams.Add(new SqlParameter("@p_IsClose", SqlDbType.Bit) { Value = ((string.Empty == this._IsClose) ? (object)DBNull.Value : Convert.ToBoolean(this._IsClose)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Ledger_Category_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[LedgerCategory.cs:doOperation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_LedCatId", SqlDbType.Int) { Value = ((string.Empty == this._id) ? (object)DBNull.Value : Int32.Parse(this._id)) });
                SqlRecordParams.Add(new SqlParameter("@p_LedCatCd", SqlDbType.VarChar) { Value = ((string.Empty == this._LedCatCd) ? (object)DBNull.Value : this._LedCatCd) });
                SqlRecordParams.Add(new SqlParameter("@p_LedCatDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._LedCatDesc) ? (object)DBNull.Value : this._LedCatDesc) });
                SqlRecordParams.Add(new SqlParameter("@p_IsClose", SqlDbType.Bit) { Value = ((string.Empty == this._IsClose) ? (object)DBNull.Value : Convert.ToBoolean(this._IsClose)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "Ledger_Category_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[LedgerCategory.cs:checkcode]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }
}
