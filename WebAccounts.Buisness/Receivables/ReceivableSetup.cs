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
    public class ReceivableSetup
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;

        public string _PostingFrom = string.Empty;
        public string _PostingTo = string.Empty;
        public string _GraceDays = string.Empty;
        public string _CreditMemoNo = string.Empty;
        public string _PackingSlipVchNo = string.Empty;
        public string _InvoiceNo = string.Empty;
        public string _InvoiceVchNo = string.Empty;
        public string _CreditNoteNo = string.Empty;
        public string _CreditNoteVchNo = string.Empty;

        public string _IsBlock = string.Empty;
        public string _CoCd = string.Empty;
        public string _created_by = string.Empty;
        public string _creator_MAC_add = string.Empty;


        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@PostingFrom", SqlDbType.DateTime) { Value = ((string.Empty == this._PostingFrom) ? (object)DBNull.Value : this._PostingFrom) });
                SqlRecordParams.Add(new SqlParameter("@PostingTo", SqlDbType.DateTime) { Value = ((string.Empty == this._PostingTo) ? (object)DBNull.Value : this._PostingTo) });
                SqlRecordParams.Add(new SqlParameter("@GraceDays", SqlDbType.Int) { Value = ((string.Empty == this._GraceDays) ? (object)DBNull.Value : Convert.ToInt32(this._GraceDays)) });
                SqlRecordParams.Add(new SqlParameter("@CreditMemoNo", SqlDbType.BigInt) { Value = ((string.Empty == this._CreditMemoNo) ? (object)DBNull.Value : Int64.Parse(this._CreditMemoNo)) });
                SqlRecordParams.Add(new SqlParameter("@PackingSlipVchNo", SqlDbType.BigInt) { Value = ((string.Empty == this._PackingSlipVchNo) ? (object)DBNull.Value : Int64.Parse(this._PackingSlipVchNo)) });
                SqlRecordParams.Add(new SqlParameter("@InvoiceNo", SqlDbType.BigInt) { Value = ((string.Empty == this._InvoiceNo) ? (object)DBNull.Value : Int64.Parse(this._InvoiceNo)) });
                SqlRecordParams.Add(new SqlParameter("@InvoiceVchNo", SqlDbType.BigInt) { Value = ((string.Empty == this._InvoiceVchNo) ? (object)DBNull.Value : Int64.Parse(this._InvoiceVchNo)) });
                SqlRecordParams.Add(new SqlParameter("@CreditNoteNo", SqlDbType.BigInt) { Value = ((string.Empty == this._CreditNoteNo) ? (object)DBNull.Value : Int64.Parse(this._CreditNoteNo)) });
                SqlRecordParams.Add(new SqlParameter("@CreditNoteVchNo", SqlDbType.BigInt) { Value = ((string.Empty == this._CreditNoteVchNo) ? (object)DBNull.Value : Int64.Parse(this._CreditNoteVchNo)) });

                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Receivables_AccountReceivablesSetup_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[receivable.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }
    }
}
