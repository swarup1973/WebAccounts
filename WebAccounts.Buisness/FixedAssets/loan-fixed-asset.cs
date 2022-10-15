using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Data;
using System.Data.SqlClient;
using WebAccounts.Data;
using System.IO;


namespace WebAccounts.Buisness
{
    public class loanfixedasset
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _FAId = string.Empty;
        public string _LoanDt = string.Empty;
        public string _FALocIdFrom = string.Empty;
        public string _FALocIdTo = string.Empty;
        public string _DimIdFrom = string.Empty;
        public string _DimValueIdFrom = string.Empty;
        public string _DimIdTo = string.Empty;
        public string _DimValueIdTo = string.Empty;
        public string _Remarks = string.Empty;
        public string _ExptReturnDt = string.Empty;
        public string _ActualReturnDt = string.Empty;
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
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_FAId", SqlDbType.BigInt) { Value = ((string.Empty == this._FAId) ? (object)DBNull.Value : Int64.Parse(this._FAId)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@LoanDt", SqlDbType.Date) { Value = ((string.Empty == this._LoanDt) ? (object)DBNull.Value : this._LoanDt) });
                SqlRecordParams.Add(new SqlParameter("@FALocIdFrom", SqlDbType.Int) { Value = ((string.Empty == this._FALocIdFrom) ? (object)DBNull.Value : int.Parse(this._FALocIdFrom)) });
                SqlRecordParams.Add(new SqlParameter("@FALocIdTo", SqlDbType.Int) { Value = ((string.Empty == this._FALocIdTo) ? (object)DBNull.Value : int.Parse(this._FALocIdTo)) });
                SqlRecordParams.Add(new SqlParameter("@DimIdFrom", SqlDbType.Int) { Value = ((string.Empty == this._DimIdFrom) ? (object)DBNull.Value : int.Parse(this._DimIdFrom)) });
                SqlRecordParams.Add(new SqlParameter("@DimValueIdFrom", SqlDbType.Int) { Value = ((string.Empty == this._DimValueIdFrom) ? (object)DBNull.Value : int.Parse(this._DimValueIdFrom)) });
                SqlRecordParams.Add(new SqlParameter("@DimIdTo", SqlDbType.Int) { Value = ((string.Empty == this._DimIdTo) ? (object)DBNull.Value : int.Parse(this._DimIdTo)) });
                SqlRecordParams.Add(new SqlParameter("@DimValueIdTo", SqlDbType.Int) { Value = ((string.Empty == this._DimValueIdTo) ? (object)DBNull.Value : int.Parse(this._DimValueIdTo)) });
                SqlRecordParams.Add(new SqlParameter("@Remarks", SqlDbType.NVarChar) { Value = this._Remarks });
                SqlRecordParams.Add(new SqlParameter("@ExptReturnDt", SqlDbType.Date) { Value = ((string.Empty == this._ExptReturnDt) ? (object)DBNull.Value : this._ExptReturnDt) });
                SqlRecordParams.Add(new SqlParameter("@ActualReturnDt", SqlDbType.Date) { Value = ((string.Empty == this._ActualReturnDt) ? (object)DBNull.Value : this._ActualReturnDt) });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "FixedAsset_Loan_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[loan_fixed_asset.cs:Operation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_FAId", SqlDbType.BigInt) { Value = ((string.Empty == this._FAId) ? (object)DBNull.Value : Int64.Parse(this._FAId)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@LoanDt", SqlDbType.Date) { Value = ((string.Empty == this._LoanDt) ? (object)DBNull.Value : this._LoanDt) });
                SqlRecordParams.Add(new SqlParameter("@FALocIdFrom", SqlDbType.Int) { Value = ((string.Empty == this._FALocIdFrom) ? (object)DBNull.Value : int.Parse(this._FALocIdFrom)) });
                SqlRecordParams.Add(new SqlParameter("@FALocIdTo", SqlDbType.Int) { Value = ((string.Empty == this._FALocIdTo) ? (object)DBNull.Value : int.Parse(this._FALocIdTo)) });
                SqlRecordParams.Add(new SqlParameter("@DimIdFrom", SqlDbType.Int) { Value = ((string.Empty == this._DimIdFrom) ? (object)DBNull.Value : int.Parse(this._DimIdFrom)) });
                SqlRecordParams.Add(new SqlParameter("@DimValueIdFrom", SqlDbType.Int) { Value = ((string.Empty == this._DimValueIdFrom) ? (object)DBNull.Value : int.Parse(this._DimValueIdFrom)) });
                SqlRecordParams.Add(new SqlParameter("@DimIdTo", SqlDbType.Int) { Value = ((string.Empty == this._DimIdTo) ? (object)DBNull.Value : int.Parse(this._DimIdTo)) });
                SqlRecordParams.Add(new SqlParameter("@DimValueIdTo", SqlDbType.Int) { Value = ((string.Empty == this._DimValueIdTo) ? (object)DBNull.Value : int.Parse(this._DimValueIdTo)) });
                SqlRecordParams.Add(new SqlParameter("@Remarks", SqlDbType.NVarChar) { Value = this._Remarks });
                SqlRecordParams.Add(new SqlParameter("@ExptReturnDt", SqlDbType.Date) { Value = ((string.Empty == this._ExptReturnDt) ? (object)DBNull.Value : this._ExptReturnDt) });
                SqlRecordParams.Add(new SqlParameter("@ActualReturnDt", SqlDbType.Date) { Value = ((string.Empty == this._ActualReturnDt) ? (object)DBNull.Value : this._ActualReturnDt) });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "FixedAsset_Loan_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[JournalBatch.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }

    }
}
