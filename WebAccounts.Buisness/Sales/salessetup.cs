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
    public class salessetup
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;

        public string _TaxCalcBasis = string.Empty;
        public string _SalespersonDimCd = string.Empty;
        public string _Reservation = string.Empty;
        public string _PostingFrom = string.Empty;
        public string _PostingTo = string.Empty;
        public string _SalesLeadTime = string.Empty;
        public string _OverdueWarning = string.Empty;
        public string _CreditLimitWarning = string.Empty;
        public string _PickRequirement = string.Empty;
        public string _CustomerNo = string.Empty;
        public string _QuotNo = string.Empty;
        public string _QuotConfNo = string.Empty;
        public string _BlanketOrderNo = string.Empty;
        public string _BlanketOrderReleaseNo = string.Empty;
        public string _SalesOrderNo = string.Empty;
        public string _SalesOrderConfNo = string.Empty;
        public string _SalesJournalNo = string.Empty;
        public string _ReturnOrderNo = string.Empty;
        public string _ExchangeRateAdj = string.Empty;
        public string _InvoiceNo = string.Empty;

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
                SqlRecordParams.Add(new SqlParameter("@TaxCalcBasis", SqlDbType.VarChar) { Value = ((string.Empty == this._TaxCalcBasis) ? (object)DBNull.Value : this._TaxCalcBasis) });
                SqlRecordParams.Add(new SqlParameter("@SalespersonDimCd", SqlDbType.Int) { Value = ((string.Empty == this._SalespersonDimCd) ? (object)DBNull.Value : Convert.ToInt32(this._SalespersonDimCd)) });
                SqlRecordParams.Add(new SqlParameter("@Reservation", SqlDbType.Char) { Value = ((string.Empty == this._Reservation) ? (object)DBNull.Value : this._Reservation) });
                SqlRecordParams.Add(new SqlParameter("@PostingFrom", SqlDbType.DateTime) { Value = ((string.Empty == this._PostingFrom) ? (object)DBNull.Value : this._PostingFrom) });
                SqlRecordParams.Add(new SqlParameter("@PostingTo", SqlDbType.DateTime) { Value = ((string.Empty == this._PostingTo) ? (object)DBNull.Value : this._PostingTo) });
                SqlRecordParams.Add(new SqlParameter("@SalesLeadTime", SqlDbType.Decimal) { Value = ((string.Empty == this._SalesLeadTime) ? (object)DBNull.Value : Convert.ToDecimal(this._SalesLeadTime)) });
                SqlRecordParams.Add(new SqlParameter("@OverdueWarning", SqlDbType.Bit) { Value = ((string.Empty == this._OverdueWarning) ? (object)DBNull.Value : Convert.ToBoolean(this._OverdueWarning)) });
                SqlRecordParams.Add(new SqlParameter("@CreditLimitWarning", SqlDbType.Bit) { Value = ((string.Empty == this._CreditLimitWarning) ? (object)DBNull.Value : Convert.ToBoolean(this._CreditLimitWarning)) });
                SqlRecordParams.Add(new SqlParameter("@PickRequirement", SqlDbType.Bit) { Value = ((string.Empty == this._PickRequirement) ? (object)DBNull.Value : Convert.ToBoolean(this._PickRequirement)) });
                SqlRecordParams.Add(new SqlParameter("@CustomerNo", SqlDbType.BigInt) { Value = ((string.Empty == this._CustomerNo) ? (object)DBNull.Value : Int64.Parse(this._CustomerNo)) });
                SqlRecordParams.Add(new SqlParameter("@QuotNo", SqlDbType.Int) { Value = ((string.Empty == this._QuotNo) ? (object)DBNull.Value : Int64.Parse(this._QuotNo)) }); 
                SqlRecordParams.Add(new SqlParameter("@QuotConfNo", SqlDbType.Int) { Value = ((string.Empty == this._QuotConfNo) ? (object)DBNull.Value : Int64.Parse(this._QuotConfNo)) });
                SqlRecordParams.Add(new SqlParameter("@BlanketOrderNo", SqlDbType.Int) { Value = ((string.Empty == this._BlanketOrderNo) ? (object)DBNull.Value : Int64.Parse(this._BlanketOrderNo)) });
                SqlRecordParams.Add(new SqlParameter("@BlanketOrderReleaseNo", SqlDbType.Int) { Value = ((string.Empty == this._BlanketOrderReleaseNo) ? (object)DBNull.Value : Int64.Parse(this._BlanketOrderReleaseNo)) });
                SqlRecordParams.Add(new SqlParameter("@SalesOrderNo", SqlDbType.Int) { Value = ((string.Empty == this._SalesOrderNo) ? (object)DBNull.Value : Int64.Parse(this._SalesOrderNo)) });
                SqlRecordParams.Add(new SqlParameter("@SalesOrderConfNo", SqlDbType.BigInt) { Value = ((string.Empty == this._SalesOrderConfNo) ? (object)DBNull.Value : Int64.Parse(this._SalesOrderConfNo)) });
                SqlRecordParams.Add(new SqlParameter("@SalesJournalNo", SqlDbType.Int) { Value = ((string.Empty == this._SalesJournalNo) ? (object)DBNull.Value : Int64.Parse(this._SalesJournalNo)) });
                SqlRecordParams.Add(new SqlParameter("@ReturnOrderNo", SqlDbType.Int) { Value = ((string.Empty == this._ReturnOrderNo) ? (object)DBNull.Value : Int64.Parse(this._ReturnOrderNo)) });
                SqlRecordParams.Add(new SqlParameter("@ExchangeRateAdj", SqlDbType.Int) { Value = ((string.Empty == this._ExchangeRateAdj) ? (object)DBNull.Value : Int64.Parse(this._ExchangeRateAdj)) });
                SqlRecordParams.Add(new SqlParameter("@InvoiceNo", SqlDbType.Int) { Value = ((string.Empty == this._InvoiceNo) ? (object)DBNull.Value : Int64.Parse(this._InvoiceNo)) });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Sales_Setup_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[sales.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

    }
}
