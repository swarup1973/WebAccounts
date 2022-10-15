using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using WebAccounts.Data;

namespace WebAccounts.Buisness.GeneralLedger.Setup
{
    public class ExchangeRate
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _currcd = string.Empty;
        public string _entryDate = string.Empty;
        public string _startDt = string.Empty;
        public string _closeDt = string.Empty;
        public string _exchangeRate = string.Empty;
        public string _exchangeRatePer = string.Empty;
        public string _createdby = string.Empty;
        public string _creator_mac_add = string.Empty;
        public string _cocd = string.Empty;

        public DataSet GetExchangeRate(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_ExchangeRate_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[GeneralLedger_ExchangeRate.cs:GetCurrency]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = SetParameters();
                ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_ExchangeRate_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[GeneralLedger_ExchangeRate.cs:CurrencyOperation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        private List<SqlParameter> SetParameters()
        {
            List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
            SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
            SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
            SqlRecordParams.Add(new SqlParameter("@p_Currcd", SqlDbType.VarChar) { Value = ((string.Empty == this._currcd) ? (object)DBNull.Value : this._currcd) });
            SqlRecordParams.Add(new SqlParameter("@P_StartDt", SqlDbType.DateTime) { Value = ((string.Empty == this._startDt) ? (object)DBNull.Value : this._startDt) });
            SqlRecordParams.Add(new SqlParameter("@P_ExchangeRate", SqlDbType.VarChar) { Value = ((string.Empty == this._exchangeRate) ? (object)DBNull.Value : this._exchangeRate) });
            SqlRecordParams.Add(new SqlParameter("@P_ExchangeRatePer", SqlDbType.VarChar) { Value = ((string.Empty == this._exchangeRatePer) ? (object)DBNull.Value : this._exchangeRatePer) });
            SqlRecordParams.Add(new SqlParameter("@p_Creator_mac_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_mac_add) ? (object)DBNull.Value : this._creator_mac_add) });
            SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
            SqlRecordParams.Add(new SqlParameter("@P_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });
            return SqlRecordParams;
        }

        public bool check(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = SetParameters();
                dt = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_ExchangeRate_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[GeneralLedger_ExchangeRate.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }
}
