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
    public class BankAccount
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _bankCd = string.Empty;
        public string _bankName = string.Empty;
        public string _bankSrcName = string.Empty;
        public string _acNumber = string.Empty;
        public decimal _minBal = 0;
        public string _postingGrpCd = string.Empty;
        public string _currCd = string.Empty;
        public string _branchCd = string.Empty;
        public string _branchName = string.Empty;
        public string _iFSC = string.Empty;
        public string _iBAN = string.Empty;
        public string _giroCd = string.Empty;
        public string _swiftCd = string.Empty;
        public string _personRespId = string.Empty;
        public bool _block = false;
        public string _address1 = string.Empty;
        public string _address2 = string.Empty;
        public string _pin = string.Empty;
        public string _city = string.Empty;
        public string _countryCd = string.Empty;
        public string _stateCd = string.Empty;
        public string _phoneNo = string.Empty;
        public string _alternateNo = string.Empty;
        public string _faxNo = string.Empty;
        public string _contactPerson = string.Empty;
        public string _email = string.Empty;
        public string _website = string.Empty;
        public string _created_by = string.Empty;
        public string _creator_MAC_add = string.Empty;
        public string _coCd = string.Empty;

        //public DataSet GetBankAccounts(string str_ConnString, ref string str_catchmessage)
        //{
        //DataSet ds = null;
        //try
        //{
        //List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
        //ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_Currencies_operation", SqlRecordParams.ToArray());
        //}
        //catch (Exception expErr)
        //{
        //ds = null;
        //str_catchmessage = "[GeneralLedger_Currency.cs:GetCurrency]" + expErr.Message;
        //}
        //finally { }
        //return ds;
        //}

        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = BankAccountparamterset();

                ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_BankAccount_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[GeneralLedger_BankAccount.cs:BankAccountOperation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        private List<SqlParameter> BankAccountparamterset()
        {
            List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
            SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
            SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
           
            SqlRecordParams.Add(new SqlParameter("@P_bankCd", SqlDbType.VarChar) { Value = ((string.Empty == this._bankCd) ? (object)DBNull.Value : this._bankCd) });
            SqlRecordParams.Add(new SqlParameter("@P_bankName", SqlDbType.VarChar) { Value = ((string.Empty == this._bankName) ? (object)DBNull.Value : this._bankName) });
            SqlRecordParams.Add(new SqlParameter("@P_bankSrcName", SqlDbType.VarChar) { Value = ((string.Empty == this._bankSrcName) ? (object)DBNull.Value : this._bankSrcName) });
            SqlRecordParams.Add(new SqlParameter("@P_acNumber", SqlDbType.VarChar) { Value = ((string.Empty == this._acNumber) ? (object)DBNull.Value : this._acNumber) });
            SqlRecordParams.Add(new SqlParameter("@P_minBal", SqlDbType.Decimal) { Value = this._minBal });
            SqlRecordParams.Add(new SqlParameter("@P_postingGrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this._postingGrpCd) ? (object)DBNull.Value : this._postingGrpCd) });
            SqlRecordParams.Add(new SqlParameter("@P_currCd", SqlDbType.VarChar) { Value = ((string.Empty == this._currCd) ? (object)DBNull.Value : this._currCd) });
            SqlRecordParams.Add(new SqlParameter("@P_branchCd", SqlDbType.VarChar) { Value = ((string.Empty == this._branchCd) ? (object)DBNull.Value : this._branchCd) });
            SqlRecordParams.Add(new SqlParameter("@P_branchName", SqlDbType.VarChar) { Value = ((string.Empty == this._branchName) ? (object)DBNull.Value : this._branchName) });
            SqlRecordParams.Add(new SqlParameter("@P_iFSC", SqlDbType.VarChar) { Value = ((string.Empty == this._iFSC) ? (object)DBNull.Value : this._iFSC) });
            SqlRecordParams.Add(new SqlParameter("@P_iBAN", SqlDbType.VarChar) { Value = ((string.Empty == this._iBAN) ? (object)DBNull.Value : this._iBAN) });
            SqlRecordParams.Add(new SqlParameter("@P_giroCd", SqlDbType.VarChar) { Value = ((string.Empty == this._giroCd) ? (object)DBNull.Value : this._giroCd) });
            SqlRecordParams.Add(new SqlParameter("@P_swiftCd", SqlDbType.VarChar) { Value = ((string.Empty == this._swiftCd) ? (object)DBNull.Value : this._swiftCd) });
            SqlRecordParams.Add(new SqlParameter("@P_personRespId ", SqlDbType.BigInt) { Value = ((string.Empty == this._personRespId) ? (object)DBNull.Value : Int64.Parse(this._personRespId)) });
            SqlRecordParams.Add(new SqlParameter("@P_block", SqlDbType.Bit) { Value = this._block });
            SqlRecordParams.Add(new SqlParameter("@P_address1", SqlDbType.VarChar) { Value = ((string.Empty == this._address1) ? (object)DBNull.Value : this._address1) });
            SqlRecordParams.Add(new SqlParameter("@P_address2", SqlDbType.VarChar) { Value = ((string.Empty == this._address2) ? (object)DBNull.Value : this._address2) });
            SqlRecordParams.Add(new SqlParameter("@P_pin", SqlDbType.VarChar) { Value = ((string.Empty == this._pin) ? (object)DBNull.Value : this._pin) });
            SqlRecordParams.Add(new SqlParameter("@P_city", SqlDbType.VarChar) { Value = ((string.Empty == this._city) ? (object)DBNull.Value : this._city) });
            SqlRecordParams.Add(new SqlParameter("@P_countryCd", SqlDbType.VarChar) { Value = ((string.Empty == this._countryCd) ? (object)DBNull.Value : this._countryCd) });
            SqlRecordParams.Add(new SqlParameter("@P_stateCd", SqlDbType.VarChar) { Value = ((string.Empty == this._stateCd) ? (object)DBNull.Value : this._stateCd) });
            SqlRecordParams.Add(new SqlParameter("@P_phoneNo", SqlDbType.VarChar) { Value = ((string.Empty == this._phoneNo) ? (object)DBNull.Value : this._phoneNo) });
            SqlRecordParams.Add(new SqlParameter("@P_alternateNo", SqlDbType.VarChar) { Value = ((string.Empty == this._alternateNo) ? (object)DBNull.Value : this._alternateNo) });
            SqlRecordParams.Add(new SqlParameter("@P_faxNo", SqlDbType.VarChar) { Value = ((string.Empty == this._faxNo) ? (object)DBNull.Value : this._faxNo) });
            SqlRecordParams.Add(new SqlParameter("@P_contactPerson", SqlDbType.VarChar) { Value = ((string.Empty == this._contactPerson) ? (object)DBNull.Value : this._contactPerson) });
            SqlRecordParams.Add(new SqlParameter("@P_email", SqlDbType.VarChar) { Value = ((string.Empty == this._email) ? (object)DBNull.Value : this._email) });
            SqlRecordParams.Add(new SqlParameter("@P_website", SqlDbType.VarChar) { Value = ((string.Empty == this._website) ? (object)DBNull.Value : this._website) });
            SqlRecordParams.Add(new SqlParameter("@p_created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) }); SqlRecordParams.Add(new SqlParameter("@P_creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });
            SqlRecordParams.Add(new SqlParameter("@P_coCd", SqlDbType.VarChar) { Value = ((string.Empty == this._coCd) ? (object)DBNull.Value : this._coCd) });

            return SqlRecordParams;
        }

        public bool check(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = BankAccountparamterset();
                dt = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_BankAccount_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[GeneralLedger_BankAccount.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }
}
