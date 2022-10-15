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
    public class CheckRegister
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _bankCd = string.Empty;
        public string _receiptDt = string.Empty;
        public string _noOfLeaf = string.Empty;
        public string _remarks = string.Empty;
        public string _created_by = string.Empty;
        public string _creator_MAC_add = string.Empty;
        public string _coCd = string.Empty;
        public string _status = string.Empty;
        public string _chequeNo = string.Empty;
        public string _chequePrefix = string.Empty;
        public string _chequeLengthWoPrefix = string.Empty;
        public string _cancelRowIds = string.Empty;
        public string _startingNo = string.Empty;

        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = CheckRegisterParametesSet();

                ds = DataHelper.ExecuteDataset(str_ConnString, "Generalledger_Bankaccount_ChequeCreation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[GeneralLedger_CheckRegister.cs:BankAccountOperation]" + expErr.Message;
            }
            finally { }
            return ds;
        }



        private List<SqlParameter> CheckRegisterParametesSet()
        {
            List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
            SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
            SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
            SqlRecordParams.Add(new SqlParameter("@P_bankCd", SqlDbType.VarChar) { Value = ((string.Empty == this._bankCd) ? (object)DBNull.Value : this._bankCd) });
            SqlRecordParams.Add(new SqlParameter("@p_created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
            SqlRecordParams.Add(new SqlParameter("@P_coCd", SqlDbType.VarChar) { Value = ((string.Empty == this._coCd) ? (object)DBNull.Value : this._coCd) });
            
            SqlRecordParams.Add(new SqlParameter("@P_creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });
            SqlRecordParams.Add(new SqlParameter("@P_noOfLeaf", SqlDbType.Int) { Value = ((string.Empty == this._noOfLeaf) ? (object)DBNull.Value : Int32.Parse(this._noOfLeaf)) });
            SqlRecordParams.Add(new SqlParameter("@_receiptDt", SqlDbType.DateTime) { Value = ((string.Empty == this._receiptDt) ? (object)DBNull.Value : Convert.ToDateTime(this._receiptDt)) });
            SqlRecordParams.Add(new SqlParameter("@P_remarks", SqlDbType.VarChar) { Value = ((string.Empty == this._remarks) ? (object)DBNull.Value : this._remarks) });
            SqlRecordParams.Add(new SqlParameter("@P_status", SqlDbType.VarChar) { Value = ((string.Empty == this._status) ? (object)DBNull.Value : this._status) });
            SqlRecordParams.Add(new SqlParameter("@P_chequeNo", SqlDbType.VarChar) { Value = ((string.Empty == this._chequeNo) ? (object)DBNull.Value : this._chequeNo) });
            SqlRecordParams.Add(new SqlParameter("@P_ChequePrefix", SqlDbType.VarChar) { Value = ((string.Empty == this._chequePrefix) ? (object)DBNull.Value : this._chequePrefix) });
            SqlRecordParams.Add(new SqlParameter("@P_ChequeLengthWoPrefix", SqlDbType.BigInt) { Value = ((string.Empty == this._chequeLengthWoPrefix) ? (object)DBNull.Value : Int64.Parse(this._chequeLengthWoPrefix))});
            SqlRecordParams.Add(new SqlParameter("@P_startingNo", SqlDbType.Int) { Value = ((string.Empty == this._startingNo) ? (object)DBNull.Value : Int32.Parse(this._startingNo)) });

            return SqlRecordParams;

        }
        public bool cancelCheque(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = null });
                SqlRecordParams.Add(new SqlParameter("@P_BANKCD", SqlDbType.NVarChar) { Value = null });
                SqlRecordParams.Add(new SqlParameter("@P_DTOFISSUE", SqlDbType.DateTime2) { Value = null});
                SqlRecordParams.Add(new SqlParameter("@P_DOCNO", SqlDbType.BigInt) { Value = null });
                SqlRecordParams.Add(new SqlParameter("@P_DOCTYPECD", SqlDbType.NVarChar) { Value = null });
                SqlRecordParams.Add(new SqlParameter("@P_ISSUETONAME", SqlDbType.NVarChar) { Value = null });
                SqlRecordParams.Add(new SqlParameter("@P_STATUS", SqlDbType.NVarChar) { Value = null });
                SqlRecordParams.Add(new SqlParameter("@P_PRINTCOUNT", SqlDbType.Int) { Value = null });
                SqlRecordParams.Add(new SqlParameter("@P_RETURNREASON", SqlDbType.NVarChar) { Value = null });
                SqlRecordParams.Add(new SqlParameter("@P_ISREVERSED", SqlDbType.Bit) { Value = null });
                SqlRecordParams.Add(new SqlParameter("@P_ISRECONCILED", SqlDbType.Bit) { Value = null });
                SqlRecordParams.Add(new SqlParameter("@P_CREATED_BY", SqlDbType.UniqueIdentifier) { Value = null });
                SqlRecordParams.Add(new SqlParameter("@P_creator_MAC_add", SqlDbType.VarChar) { Value = null });
                SqlRecordParams.Add(new SqlParameter("@P_COCD", SqlDbType.NVarChar) { Value = null });
                SqlRecordParams.Add(new SqlParameter("@P_noOfLeaf", SqlDbType.BigInt) { Value = null });
                SqlRecordParams.Add(new SqlParameter("@P_StartingNo", SqlDbType.BigInt) { Value = null });
                SqlRecordParams.Add(new SqlParameter("@P_cancelRowIds", SqlDbType.VarChar) { Value = ((string.Empty == this._cancelRowIds)
                    ? (object)DBNull.Value : this._cancelRowIds) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_BankAccount_CheckRegister", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                
                str_catchmessage = "[GeneralLedger_CheckRegister.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }
}
