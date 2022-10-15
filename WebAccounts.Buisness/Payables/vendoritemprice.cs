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
    public class vendoritemprice
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _vendorcode = string.Empty;
        public string _itemcode = string.Empty;
        public string _uomcode = string.Empty;
        public string _minqty = string.Empty;
        public string _maxqty = string.Empty;
        public string _priceperunit = string.Empty;
        public string _startdate = string.Empty;
        public string _enddate = string.Empty;
        public string _Block = string.Empty;
        public string _CoCd = string.Empty;
        public string _created_by = string.Empty;
        public string _creator_MAC_add = string.Empty;

        public DataSet getvendordetails(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_vendcd", SqlDbType.VarChar) { Value = ((string.Empty == this._vendorcode) ? (object)DBNull.Value : this._vendorcode) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "getVendordetails", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[vendraccountoverview.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_vendcd", SqlDbType.VarChar) { Value = ((string.Empty == this._vendorcode) ? (object)DBNull.Value : this._vendorcode) });
                SqlRecordParams.Add(new SqlParameter("@p_itemcd", SqlDbType.VarChar) { Value = ((string.Empty == this._itemcode) ? (object)DBNull.Value : this._itemcode) });
                SqlRecordParams.Add(new SqlParameter("@p_uomcd", SqlDbType.VarChar) { Value = ((string.Empty == this._uomcode) ? (object)DBNull.Value : this._uomcode) });
                SqlRecordParams.Add(new SqlParameter("@p_minqty", SqlDbType.VarChar) { Value = ((string.Empty == this._minqty) ? (object)DBNull.Value : Convert.ToDecimal(this._minqty)) });
                SqlRecordParams.Add(new SqlParameter("@p_maxqty", SqlDbType.Decimal) { Value = ((string.Empty == this._maxqty) ? (object)DBNull.Value : Convert.ToDecimal(this._maxqty)) });
                SqlRecordParams.Add(new SqlParameter("@p_priceperunit", SqlDbType.VarChar) { Value = ((string.Empty == this._priceperunit) ? (object)DBNull.Value : Convert.ToDecimal(this._priceperunit)) });
                SqlRecordParams.Add(new SqlParameter("@p_startdate", SqlDbType.Bit) { Value = ((string.Empty == this._startdate) ? (object)DBNull.Value : Convert.ToDateTime(this._startdate)) });
                SqlRecordParams.Add(new SqlParameter("@p_enddate", SqlDbType.VarChar) { Value = ((string.Empty == this._enddate) ? (object)DBNull.Value : Convert.ToDateTime(this._enddate)) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : Convert.ToBoolean(this._Block)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "VendorItemPrice_operation", SqlRecordParams.ToArray());
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
            bool isexist = false;
            DataSet ds = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_vendcd", SqlDbType.VarChar) { Value = ((string.Empty == this._vendorcode) ? (object)DBNull.Value : this._vendorcode) });
                SqlRecordParams.Add(new SqlParameter("@p_itemcd", SqlDbType.VarChar) { Value = ((string.Empty == this._itemcode) ? (object)DBNull.Value : this._itemcode) });
                SqlRecordParams.Add(new SqlParameter("@p_uomcd", SqlDbType.VarChar) { Value = ((string.Empty == this._uomcode) ? (object)DBNull.Value : this._uomcode) });
                SqlRecordParams.Add(new SqlParameter("@p_minqty", SqlDbType.VarChar) { Value = ((string.Empty == this._minqty) ? (object)DBNull.Value : Convert.ToDecimal(this._minqty)) });
                SqlRecordParams.Add(new SqlParameter("@p_maxqty", SqlDbType.Decimal) { Value = ((string.Empty == this._maxqty) ? (object)DBNull.Value : Convert.ToDecimal(this._maxqty)) });
                SqlRecordParams.Add(new SqlParameter("@p_priceperunit", SqlDbType.VarChar) { Value = ((string.Empty == this._priceperunit) ? (object)DBNull.Value : Convert.ToDecimal(this._priceperunit)) });
                SqlRecordParams.Add(new SqlParameter("@p_startdate", SqlDbType.Bit) { Value = ((string.Empty == this._startdate) ? (object)DBNull.Value : Convert.ToDateTime(this._startdate)) });
                SqlRecordParams.Add(new SqlParameter("@p_enddate", SqlDbType.VarChar) { Value = ((string.Empty == this._enddate) ? (object)DBNull.Value : Convert.ToDateTime(this._enddate)) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : Convert.ToBoolean(this._Block)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });


                ds = DataHelper.ExecuteDataset(str_ConnString, "VendorItemPrice_operation", SqlRecordParams.ToArray());

                //if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
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
