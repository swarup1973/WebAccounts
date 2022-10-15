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
    public class Currency
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _currcd = string.Empty;
        public string _currdesc = string.Empty;
        public string _ralizegainac = string.Empty;
        public string _realizelossac = string.Empty;
        public string _unrealizegainac = string.Empty;
        public string _unrealizelossac = string.Empty;
        public string _convroacdr = string.Empty;
        public string _convroaccr = string.Empty;
        public int      _currunitdecplace = 0;
        public decimal _unitamtroprecision = 0;
        public string _rotype = string.Empty;
        public decimal _totalroprecision = 0;
        public string _totalroto = string.Empty;
        public string _createdby = string.Empty;
        public string _creator_mac_add = string.Empty;
        public string _cocd = string.Empty;
        public DataSet GetCurrency(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_Currencies_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[GeneralLedger_Currency.cs:GetCurrency]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = Currencyparamterset();

                ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_Currencies_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[GeneralLedger_Currency.cs:CurrencyOperation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        private List<SqlParameter> Currencyparamterset()
        {
            List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
            SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
            SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
            SqlRecordParams.Add(new SqlParameter("@p_Currcd", SqlDbType.VarChar) { Value = ((string.Empty == this._currcd) ? (object)DBNull.Value : this._currcd) });
            SqlRecordParams.Add(new SqlParameter("@p_Currdesc", SqlDbType.VarChar) { Value = ((string.Empty == this._currdesc) ? (object)DBNull.Value : this._currdesc) });
            SqlRecordParams.Add(new SqlParameter("@p_Ralizegainac", SqlDbType.VarChar) { Value = ((string.Empty == this._ralizegainac) ? (object)DBNull.Value : this._ralizegainac) });
            SqlRecordParams.Add(new SqlParameter("@p_Realizelossac", SqlDbType.VarChar) { Value = ((string.Empty == this._realizelossac) ? (object)DBNull.Value : this._realizelossac) });
            SqlRecordParams.Add(new SqlParameter("@p_Unrealizegainac", SqlDbType.VarChar) { Value = ((string.Empty == this._unrealizegainac) ? (object)DBNull.Value : this._unrealizegainac) });
            SqlRecordParams.Add(new SqlParameter("@p_Unrealizelossac", SqlDbType.VarChar) { Value = ((string.Empty == this._unrealizelossac) ? (object)DBNull.Value : this._unrealizelossac) });
            SqlRecordParams.Add(new SqlParameter("@p_Convroacdr", SqlDbType.VarChar) { Value = ((string.Empty == this._convroacdr) ? (object)DBNull.Value : this._convroacdr) });
            SqlRecordParams.Add(new SqlParameter("@p_Convroaccr", SqlDbType.VarChar) { Value = ((string.Empty == this._convroaccr) ? (object)DBNull.Value : this._convroaccr) });
            SqlRecordParams.Add(new SqlParameter("@p_Currunitdecplace", SqlDbType.VarChar) { Value = this._currunitdecplace });
            SqlRecordParams.Add(new SqlParameter("@p_Unitamtroprecision", SqlDbType.VarChar) { Value = this._unitamtroprecision });
            SqlRecordParams.Add(new SqlParameter("@p_Rotype", SqlDbType.VarChar) { Value = ((string.Empty == this._rotype) ? (object)DBNull.Value : this._rotype) });
            SqlRecordParams.Add(new SqlParameter("@p_Totalroprecision", SqlDbType.VarChar) { Value = this._totalroprecision });
            SqlRecordParams.Add(new SqlParameter("@p_Totalroto", SqlDbType.VarChar) { Value = ((string.Empty == this._totalroto) ? (object)DBNull.Value : this._totalroto) });
            SqlRecordParams.Add(new SqlParameter("@p_Creator_mac_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_mac_add) ? (object)DBNull.Value : this._creator_mac_add) });
            SqlRecordParams.Add(new SqlParameter("@p_created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
            //SqlRecordParams.Parameters.Add("@GuidParameter", SqlDbType.UniqueIdentifier).Value = new System.Data.SqlTypes.SqlGuid(this._createdby);
            SqlRecordParams.Add(new SqlParameter("@P_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });
            return SqlRecordParams;
        }

        public bool check(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = Currencyparamterset();
                dt = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_Currencies_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[GeneralLedger_Currency.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }
}
