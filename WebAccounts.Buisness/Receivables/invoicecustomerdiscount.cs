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
    public class invoicecustomerdiscount
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _invoicediscountcode = string.Empty;
        public string _currcode = string.Empty;
        public string _minamt = string.Empty;
        public string _maxamt = string.Empty;
        public string _discount = string.Empty;
        public string _discountamnt = string.Empty;
        public string _startdate = string.Empty;
        public string _enddate = string.Empty;
        public string _Block = string.Empty;
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
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_invdisccd", SqlDbType.VarChar) { Value = ((string.Empty == this._invoicediscountcode) ? (object)DBNull.Value : this._invoicediscountcode) });
                SqlRecordParams.Add(new SqlParameter("@p_currcd", SqlDbType.VarChar) { Value = ((string.Empty == this._currcode) ? (object)DBNull.Value : this._currcode) });
                SqlRecordParams.Add(new SqlParameter("@p_minamt", SqlDbType.VarChar) { Value = ((string.Empty == this._minamt) ? (object)DBNull.Value : Convert.ToDecimal(this._minamt)) });
                SqlRecordParams.Add(new SqlParameter("@p_maxamt", SqlDbType.Decimal) { Value = ((string.Empty == this._maxamt) ? (object)DBNull.Value : Convert.ToDecimal(this._maxamt)) });
                SqlRecordParams.Add(new SqlParameter("@p_discount", SqlDbType.VarChar) { Value = ((string.Empty == this._discount) ? (object)DBNull.Value : Convert.ToDecimal(this._discount)) });
                SqlRecordParams.Add(new SqlParameter("@p_discountamnt", SqlDbType.VarChar) { Value = ((string.Empty == this._discountamnt) ? (object)DBNull.Value : Convert.ToDecimal(this._discountamnt)) });
                SqlRecordParams.Add(new SqlParameter("@p_startdate", SqlDbType.Bit) { Value = ((string.Empty == this._startdate) ? (object)DBNull.Value : Convert.ToDateTime(this._startdate)) });
                SqlRecordParams.Add(new SqlParameter("@p_enddate", SqlDbType.VarChar) { Value = ((string.Empty == this._enddate) ? (object)DBNull.Value : Convert.ToDateTime(this._enddate)) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : Convert.ToBoolean(this._Block)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "InvoiceCustomerDiscount_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[vendraccountoverview.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet check(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_invdisccd", SqlDbType.VarChar) { Value = ((string.Empty == this._invoicediscountcode) ? (object)DBNull.Value : this._invoicediscountcode) });
                SqlRecordParams.Add(new SqlParameter("@p_currcd", SqlDbType.VarChar) { Value = ((string.Empty == this._currcode) ? (object)DBNull.Value : this._currcode) });
                SqlRecordParams.Add(new SqlParameter("@p_minamt", SqlDbType.VarChar) { Value = ((string.Empty == this._minamt) ? (object)DBNull.Value : Convert.ToDecimal(this._minamt)) });
                SqlRecordParams.Add(new SqlParameter("@p_maxamt", SqlDbType.Decimal) { Value = ((string.Empty == this._maxamt) ? (object)DBNull.Value : Convert.ToDecimal(this._maxamt)) });
                SqlRecordParams.Add(new SqlParameter("@p_discount", SqlDbType.VarChar) { Value = ((string.Empty == this._discount) ? (object)DBNull.Value : Convert.ToDecimal(this._discount)) });
                SqlRecordParams.Add(new SqlParameter("@p_discountamnt", SqlDbType.VarChar) { Value = ((string.Empty == this._discountamnt) ? (object)DBNull.Value : Convert.ToDecimal(this._discountamnt)) });
                SqlRecordParams.Add(new SqlParameter("@p_startdate", SqlDbType.Bit) { Value = ((string.Empty == this._startdate) ? (object)DBNull.Value : Convert.ToDateTime(this._startdate)) });
                SqlRecordParams.Add(new SqlParameter("@p_enddate", SqlDbType.VarChar) { Value = ((string.Empty == this._enddate) ? (object)DBNull.Value : Convert.ToDateTime(this._enddate)) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : Convert.ToBoolean(this._Block)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });


                ds = DataHelper.ExecuteDataset(str_ConnString, "InvoiceCustomerDiscount_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[vendraccountoverview.cs:check]" + expErr.Message;
            }
            finally { }
            return ds;
        }
    }
}
