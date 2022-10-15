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
    public class creditcardinfo
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _custcode = string.Empty;
        public string _cardno = string.Empty;
        public string _expirydate = string.Empty;
        public string _name = string.Empty;
        public string _address = string.Empty;
        public string _pin = string.Empty;
        public string _isblock = string.Empty;
        public string _createdby = string.Empty;
        public string _creator_MAC_add = string.Empty;
        public string _cocd = string.Empty;

        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_custcd", SqlDbType.VarChar) { Value = ((string.Empty == this._custcode) ? (object)DBNull.Value : this._custcode) });
                SqlRecordParams.Add(new SqlParameter("@p_cardno", SqlDbType.BigInt) { Value = ((string.Empty == this._cardno) ? (object)DBNull.Value : Convert.ToInt64(this._cardno)) });
                SqlRecordParams.Add(new SqlParameter("@p_expirydate", SqlDbType.DateTime) { Value = ((string.Empty == this._expirydate) ? (object)DBNull.Value : Convert.ToDateTime(this._expirydate)) });
                SqlRecordParams.Add(new SqlParameter("@p_Name", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });
                SqlRecordParams.Add(new SqlParameter("@p_address", SqlDbType.VarChar) { Value = ((string.Empty == this._address) ? (object)DBNull.Value : this._address) });
                SqlRecordParams.Add(new SqlParameter("@p_pin", SqlDbType.BigInt) { Value = ((string.Empty == this._pin) ? (object)DBNull.Value : Convert.ToInt64(this._pin)) });
                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });
                SqlRecordParams.Add(new SqlParameter("@cocd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Receivables_CreditCardInfo_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[vendorbankac.cs:RoleOperation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool check(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_custcd", SqlDbType.VarChar) { Value = ((string.Empty == this._custcode) ? (object)DBNull.Value : this._custcode) });
                SqlRecordParams.Add(new SqlParameter("@p_cardno", SqlDbType.BigInt) { Value = ((string.Empty == this._cardno) ? (object)DBNull.Value : Convert.ToInt64(this._cardno)) });
                SqlRecordParams.Add(new SqlParameter("@p_expirydate", SqlDbType.DateTime) { Value = ((string.Empty == this._expirydate) ? (object)DBNull.Value : Convert.ToDateTime(this._expirydate)) });
                SqlRecordParams.Add(new SqlParameter("@p_Name", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });
                SqlRecordParams.Add(new SqlParameter("@p_address", SqlDbType.VarChar) { Value = ((string.Empty == this._address) ? (object)DBNull.Value : this._address) });
                SqlRecordParams.Add(new SqlParameter("@p_pin", SqlDbType.BigInt) { Value = ((string.Empty == this._pin) ? (object)DBNull.Value : Convert.ToInt64(this._pin)) });
                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });
                SqlRecordParams.Add(new SqlParameter("@cocd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "Receivables_CreditCardInfo_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[vendorbankac.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }
}
