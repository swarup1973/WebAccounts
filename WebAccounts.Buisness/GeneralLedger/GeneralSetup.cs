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
    public class GeneralSetup
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;

        public string _PostingFrom = string.Empty;
        public string _PostingTo = string.Empty;
        public string _DiscTollerence = string.Empty;
        public string _DiscTollerenceAmt = string.Empty;
        public string _FinPostingOnItemRecpt = string.Empty;
        public string _FinPostingOnPackingSlip = string.Empty;
        public string _RetainedEarningAcCd = string.Empty;
        public string _PLAcCd = string.Empty;
        public string _ExptdCostPosting = string.Empty;
        public string _ExptdRevenuePosting = string.Empty;
        public string _ExchangeRateServiceUrl = string.Empty;
        public string _WHTaxRndingPrecision = string.Empty;
        public string _WHTaxDecPlaces = string.Empty;
        public string _WHTaxRndingType = string.Empty;
        public string _GSTRndingPrecision = string.Empty;
        public string _GSTDecPlaces = string.Empty;
        public string _GSTRndingType = string.Empty;
        public string _LCYRndingPrecision = string.Empty;
        public string _LCYDecPlaces = string.Empty;
        public string _LCYRndingType = string.Empty;
        public string _CustomsRndingPrecision = string.Empty;
        public string _CustomsDecPlaces = string.Empty;
        public string _CustomsRndingType = string.Empty;
        public string _BankAcNo = string.Empty;
        public string _YearEndClosingBatchNo = string.Empty;
        public string _ExchangeAdjBatchNo = string.Empty;
        public string _GLTranReversal = string.Empty;
        public string _BudgetNo = string.Empty;
        public string _BudgetEntryNo = string.Empty;
        public string _RevisedBudgetNo = string.Empty;
        public string _JournalBatchNo = string.Empty;
        public string _TranReversalVchNo = string.Empty;
        public string _WHTaxPmtNo = string.Empty;
        public string _WHTaxAdjNo = string.Empty;
        public string _GSTPmtNo = string.Empty;
        public string _GSTAdjNo = string.Empty;
        public string _CustomsPmtNo = string.Empty;
        public string _CustomsAdjNo = string.Empty;
        public string _BankReconNo = string.Empty;
        public string _BankStatementNo = string.Empty;
        public string _ActionExceedingBudgetLimit = string.Empty;
        public string _BudgetMinusUnpostedActualTran = string.Empty;
        public string _TaxCalculationDate = string.Empty;
        public string _TaxCalculate = string.Empty;

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
                SqlRecordParams.Add(new SqlParameter("@DiscTollerence", SqlDbType.Decimal) { Value = ((string.Empty == this._DiscTollerence) ? (object)DBNull.Value : Convert.ToDecimal(this._DiscTollerence)) });
                SqlRecordParams.Add(new SqlParameter("@DiscTollerenceAmt", SqlDbType.Decimal) { Value = ((string.Empty == this._DiscTollerenceAmt) ? (object)DBNull.Value : Convert.ToDecimal(this._DiscTollerenceAmt)) });
                SqlRecordParams.Add(new SqlParameter("@FinPostingOnItemRecpt", SqlDbType.Bit) { Value = ((string.Empty == this._FinPostingOnItemRecpt) ? (object)DBNull.Value : Convert.ToBoolean(this._FinPostingOnItemRecpt)) });
                SqlRecordParams.Add(new SqlParameter("@FinPostingOnPackingSlip", SqlDbType.Bit) { Value = ((string.Empty == this._FinPostingOnPackingSlip) ? (object)DBNull.Value : Convert.ToBoolean(this._FinPostingOnPackingSlip)) });
                SqlRecordParams.Add(new SqlParameter("@RetainedEarningAcCd", SqlDbType.NVarChar) { Value = this._RetainedEarningAcCd });
                SqlRecordParams.Add(new SqlParameter("@PLAcCd", SqlDbType.NVarChar) { Value = this._PLAcCd });
                SqlRecordParams.Add(new SqlParameter("@ExptdCostPosting", SqlDbType.Bit) { Value = ((string.Empty == this._ExptdCostPosting) ? (object)DBNull.Value : Convert.ToBoolean(this._ExptdCostPosting)) });
                SqlRecordParams.Add(new SqlParameter("@ExptdRevenuePosting", SqlDbType.Bit) { Value = ((string.Empty == this._ExptdRevenuePosting) ? (object)DBNull.Value : Convert.ToBoolean(this._ExptdRevenuePosting)) });
                SqlRecordParams.Add(new SqlParameter("@ExchangeRateServiceUrl", SqlDbType.VarChar) { Value = this._ExchangeRateServiceUrl });
                SqlRecordParams.Add(new SqlParameter("@WHTaxRndingPrecision", SqlDbType.Decimal) { Value = ((string.Empty == this._WHTaxRndingPrecision) ? (object)DBNull.Value : Convert.ToDecimal(this._WHTaxRndingPrecision)) });
                SqlRecordParams.Add(new SqlParameter("@WHTaxDecPlaces", SqlDbType.Int) { Value = ((string.Empty == this._WHTaxDecPlaces) ? (object)DBNull.Value : Convert.ToInt32(this._WHTaxDecPlaces)) });
                SqlRecordParams.Add(new SqlParameter("@WHTaxRndingType", SqlDbType.NVarChar) { Value = this._WHTaxRndingType });
                SqlRecordParams.Add(new SqlParameter("@GSTRndingPrecision", SqlDbType.Decimal) { Value = ((string.Empty == this._GSTRndingPrecision) ? (object)DBNull.Value : Convert.ToDecimal(this._GSTRndingPrecision)) });
                SqlRecordParams.Add(new SqlParameter("@GSTDecPlaces", SqlDbType.Int) { Value = ((string.Empty == this._GSTDecPlaces) ? (object)DBNull.Value : Convert.ToInt32(this._GSTDecPlaces)) });
                SqlRecordParams.Add(new SqlParameter("@GSTRndingType", SqlDbType.NVarChar) { Value = this._GSTRndingType });
                SqlRecordParams.Add(new SqlParameter("@LCYRndingPrecision", SqlDbType.Decimal) { Value = ((string.Empty == this._LCYRndingPrecision) ? (object)DBNull.Value : Convert.ToDecimal(this._LCYRndingPrecision)) });
                SqlRecordParams.Add(new SqlParameter("@LCYDecPlaces", SqlDbType.Int) { Value = ((string.Empty == this._LCYDecPlaces) ? (object)DBNull.Value : Convert.ToInt32(this._LCYDecPlaces)) });
                SqlRecordParams.Add(new SqlParameter("@LCYRndingType", SqlDbType.NVarChar) { Value = this._LCYRndingType });
                SqlRecordParams.Add(new SqlParameter("@CustomsRndingPrecision", SqlDbType.Decimal) { Value = ((string.Empty == this._CustomsRndingPrecision) ? (object)DBNull.Value : Convert.ToDecimal(this._CustomsRndingPrecision)) });
                SqlRecordParams.Add(new SqlParameter("@CustomsDecPlaces", SqlDbType.Int) { Value = ((string.Empty == this._CustomsDecPlaces) ? (object)DBNull.Value : Convert.ToInt32(this._CustomsDecPlaces)) });
                SqlRecordParams.Add(new SqlParameter("@CustomsRndingType", SqlDbType.NVarChar) { Value = this._CustomsRndingType });
                SqlRecordParams.Add(new SqlParameter("@BankAcNo", SqlDbType.BigInt) { Value = ((string.Empty == this._BankAcNo) ? (object)DBNull.Value : Int64.Parse(this._BankAcNo)) });
                SqlRecordParams.Add(new SqlParameter("@YearEndClosingBatchNo", SqlDbType.BigInt) { Value = ((string.Empty == this._YearEndClosingBatchNo) ? (object)DBNull.Value : Int64.Parse(this._YearEndClosingBatchNo)) });
                SqlRecordParams.Add(new SqlParameter("@ExchangeAdjBatchNo", SqlDbType.BigInt) { Value = ((string.Empty == this._ExchangeAdjBatchNo) ? (object)DBNull.Value : Int64.Parse(this._ExchangeAdjBatchNo)) });
                SqlRecordParams.Add(new SqlParameter("@GLTranReversal", SqlDbType.BigInt) { Value = ((string.Empty == this._GLTranReversal) ? (object)DBNull.Value : Int64.Parse(this._GLTranReversal)) });
                SqlRecordParams.Add(new SqlParameter("@BudgetNo", SqlDbType.BigInt) { Value = ((string.Empty == this._BudgetNo) ? (object)DBNull.Value : Int64.Parse(this._BudgetNo)) });
                SqlRecordParams.Add(new SqlParameter("@BudgetEntryNo", SqlDbType.BigInt) { Value = ((string.Empty == this._BudgetEntryNo) ? (object)DBNull.Value : Int64.Parse(this._BudgetEntryNo)) });
                SqlRecordParams.Add(new SqlParameter("@RevisedBudgetNo", SqlDbType.BigInt) { Value = ((string.Empty == this._RevisedBudgetNo) ? (object)DBNull.Value : Int64.Parse(this._RevisedBudgetNo)) });
                SqlRecordParams.Add(new SqlParameter("@JournalBatchNo", SqlDbType.BigInt) { Value = ((string.Empty == this._JournalBatchNo) ? (object)DBNull.Value : Int64.Parse(this._JournalBatchNo)) });
                SqlRecordParams.Add(new SqlParameter("@TranReversalVchNo", SqlDbType.BigInt) { Value = ((string.Empty == this._TranReversalVchNo) ? (object)DBNull.Value : Int64.Parse(this._TranReversalVchNo)) });
                SqlRecordParams.Add(new SqlParameter("@WHTaxPmtNo", SqlDbType.BigInt) { Value = ((string.Empty == this._WHTaxPmtNo) ? (object)DBNull.Value : Int64.Parse(this._WHTaxPmtNo)) });
                SqlRecordParams.Add(new SqlParameter("@WHTaxAdjNo", SqlDbType.BigInt) { Value = ((string.Empty == this._WHTaxAdjNo) ? (object)DBNull.Value : Int64.Parse(this._WHTaxAdjNo)) });
                SqlRecordParams.Add(new SqlParameter("@GSTPmtNo", SqlDbType.BigInt) { Value = ((string.Empty == this._GSTPmtNo) ? (object)DBNull.Value : Int64.Parse(this._GSTPmtNo)) });
                SqlRecordParams.Add(new SqlParameter("@GSTAdjNo", SqlDbType.BigInt) { Value = ((string.Empty == this._GSTAdjNo) ? (object)DBNull.Value : Int64.Parse(this._GSTAdjNo)) });
                SqlRecordParams.Add(new SqlParameter("@CustomsPmtNo", SqlDbType.BigInt) { Value = ((string.Empty == this._CustomsPmtNo) ? (object)DBNull.Value : Int64.Parse(this._CustomsPmtNo)) });
                SqlRecordParams.Add(new SqlParameter("@CustomsAdjNo", SqlDbType.BigInt) { Value = ((string.Empty == this._CustomsAdjNo) ? (object)DBNull.Value : Int64.Parse(this._CustomsAdjNo)) });
                SqlRecordParams.Add(new SqlParameter("@BankReconNo", SqlDbType.BigInt) { Value = ((string.Empty == this._BankReconNo) ? (object)DBNull.Value : Int64.Parse(this._BankReconNo)) });
                SqlRecordParams.Add(new SqlParameter("@BankStatementNo", SqlDbType.BigInt) { Value = ((string.Empty == this._BankStatementNo) ? (object)DBNull.Value : Int64.Parse(this._BankStatementNo)) });
                SqlRecordParams.Add(new SqlParameter("@ActionExceedingBudgetLimit", SqlDbType.Char) { Value = this._ActionExceedingBudgetLimit });
                SqlRecordParams.Add(new SqlParameter("@BudgetMinusUnpostedActualTran", SqlDbType.Bit) { Value = ((string.Empty == this._BudgetMinusUnpostedActualTran) ? (object)DBNull.Value : Convert.ToBoolean(this._BudgetMinusUnpostedActualTran)) });
                SqlRecordParams.Add(new SqlParameter("@TaxCalculationDate", SqlDbType.VarChar) { Value = this._TaxCalculationDate });
                SqlRecordParams.Add(new SqlParameter("@TaxCalculate", SqlDbType.VarChar) { Value = this._TaxCalculate });
                
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_GeneralSetup_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[general.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

    }
}
