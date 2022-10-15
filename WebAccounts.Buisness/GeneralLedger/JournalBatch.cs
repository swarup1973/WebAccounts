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
    public class JournalBatch
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _BatchCd = string.Empty;
        public string _BatchDesc = string.Empty;
        public string _DocTypeId = string.Empty;
        public string _TranTypeId = string.Empty;
        public string _DrAcType = string.Empty;      
        public string _DrAcNo = string.Empty;
        public string _CrAcType = string.Empty;
        public string _CrAcNo = string.Empty;
        public string _NoSequenceId = string.Empty;
        public string _ApprovalCode = string.Empty;
        public string _UserType = string.Empty;
        public string _UserTypeId = string.Empty;

        public string _ApplyGenJrnl = string.Empty;
        public string _ApplyPurJrnl = string.Empty;
        public string _ApplySalesJrnl = string.Empty;
        public string _ApplyRecptJrnl = string.Empty;
        public string _ApplyPmtJrnl = string.Empty;
        public string _ApplyFAJrnl = string.Empty;
        public string _ApplyPayJrnl = string.Empty;

        public string _IsBlock = string.Empty;
        public string _CoCd = string.Empty;
        public string _created_by = string.Empty;
        public string _creator_MAC_add = string.Empty;

        public string _dim1_Branch = string.Empty;
        public string _dim1DefValue = string.Empty;
        public string _dim2_Dept = string.Empty;
        public string _dim2DefValue = string.Empty;
        public string _dim3 = string.Empty;
        public string _dim3DefValue = string.Empty;
        public string _dim4 = string.Empty;
        public string _dim4DefValue = string.Empty;
        public string _dim5 = string.Empty;
        public string _dim5DefValue = string.Empty;
        public string _dim6 = string.Empty;
        public string _dim6DefValue = string.Empty;
        public string _dim7 = string.Empty;
        public string _dim7DefValue = string.Empty;
        public string _dim8 = string.Empty;
        public string _dim8DefValue = string.Empty;
        public string _dim9 = string.Empty;
        public string _dim9DefValue = string.Empty;
        public string _dim10 = string.Empty;
        public string _dim10DefValue = string.Empty;

        public DataSet getLookup(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "journalbatch_lookup", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[JournalBatch.cs:journalbatch_lookup]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@BatchCd", SqlDbType.VarChar) { Value = ((string.Empty == this._BatchCd) ? (object)DBNull.Value : this._BatchCd) });
                SqlRecordParams.Add(new SqlParameter("@BatchDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._BatchDesc) ? (object)DBNull.Value : this._BatchDesc) });
                SqlRecordParams.Add(new SqlParameter("@DocTypeId", SqlDbType.Int) { Value = ((string.Empty == this._DocTypeId) ? (object)DBNull.Value : Convert.ToInt32(this._DocTypeId)) });
                SqlRecordParams.Add(new SqlParameter("@TranTypeId", SqlDbType.Int) { Value = ((string.Empty == this._TranTypeId) ? (object)DBNull.Value : Convert.ToInt32(this._TranTypeId)) });
                SqlRecordParams.Add(new SqlParameter("@DrAcType", SqlDbType.Int) { Value = ((string.Empty == this._DrAcType) ? (object)DBNull.Value : Convert.ToInt32(this._DrAcType)) });
                SqlRecordParams.Add(new SqlParameter("@DrAcNo", SqlDbType.VarChar) { Value = ((string.Empty == this._DrAcNo) ? (object)DBNull.Value : this._DrAcNo) });
                SqlRecordParams.Add(new SqlParameter("@CrAcType", SqlDbType.Int) { Value = ((string.Empty == this._CrAcType) ? (object)DBNull.Value : Convert.ToInt32(this._CrAcType)) });
                SqlRecordParams.Add(new SqlParameter("@CrAcNo", SqlDbType.VarChar) { Value = ((string.Empty == this._CrAcNo) ? (object)DBNull.Value : this._CrAcNo) });
                SqlRecordParams.Add(new SqlParameter("@NoSequenceId", SqlDbType.Int) { Value = ((string.Empty == this._NoSequenceId) ? (object)DBNull.Value : Convert.ToInt32(this._NoSequenceId)) });
                SqlRecordParams.Add(new SqlParameter("@ApprovalCode", SqlDbType.VarChar) { Value = ((string.Empty == this._ApprovalCode) ? (object)DBNull.Value : this._ApprovalCode) });
                SqlRecordParams.Add(new SqlParameter("@UserType", SqlDbType.Char) { Value = ((string.Empty == this._UserType) ? (object)DBNull.Value : this._UserType) });
                SqlRecordParams.Add(new SqlParameter("@UserTypeId", SqlDbType.VarChar) { Value = ((string.Empty == this._UserTypeId) ? (object)DBNull.Value : this._UserTypeId) });
                SqlRecordParams.Add(new SqlParameter("@ApplyGenJrnl", SqlDbType.Bit) { Value = ((string.Empty == this._ApplyGenJrnl) ? (object)DBNull.Value : Convert.ToBoolean(this._ApplyGenJrnl)) });
                SqlRecordParams.Add(new SqlParameter("@ApplyPurJrnl", SqlDbType.Bit) { Value = ((string.Empty == this._ApplyPurJrnl) ? (object)DBNull.Value : Convert.ToBoolean(this._ApplyPurJrnl)) });
                SqlRecordParams.Add(new SqlParameter("@ApplySalesJrnl", SqlDbType.Bit) { Value = ((string.Empty == this._ApplySalesJrnl) ? (object)DBNull.Value : Convert.ToBoolean(this._ApplySalesJrnl)) });
                SqlRecordParams.Add(new SqlParameter("@ApplyRecptJrnl", SqlDbType.Bit) { Value = ((string.Empty == this._ApplyRecptJrnl) ? (object)DBNull.Value : Convert.ToBoolean(this._ApplyRecptJrnl)) });
                SqlRecordParams.Add(new SqlParameter("@ApplyPmtJrnl", SqlDbType.Bit) { Value = ((string.Empty == this._ApplyPmtJrnl) ? (object)DBNull.Value : Convert.ToBoolean(this._ApplyPmtJrnl)) });
                SqlRecordParams.Add(new SqlParameter("@ApplyFAJrnl", SqlDbType.Bit) { Value = ((string.Empty == this._ApplyFAJrnl) ? (object)DBNull.Value : Convert.ToBoolean(this._ApplyFAJrnl)) });
                SqlRecordParams.Add(new SqlParameter("@ApplyPayJrnl", SqlDbType.Bit) { Value = ((string.Empty == this._ApplyPayJrnl) ? (object)DBNull.Value : Convert.ToBoolean(this._ApplyPayJrnl)) });

                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                SqlRecordParams.Add(new SqlParameter("@dim1_Branch", SqlDbType.Bit) { Value = ((string.Empty == this._dim1_Branch) ? (object)DBNull.Value : Convert.ToBoolean(this._dim1_Branch)) });
                SqlRecordParams.Add(new SqlParameter("@dim1DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim1DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim1DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim2_Dept", SqlDbType.Bit) { Value = ((string.Empty == this._dim2_Dept) ? (object)DBNull.Value : Convert.ToBoolean(this._dim2_Dept)) });
                SqlRecordParams.Add(new SqlParameter("@dim2DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim2DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim2DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim3", SqlDbType.Bit) { Value = ((string.Empty == this._dim3) ? (object)DBNull.Value : Convert.ToBoolean(this._dim3)) });
                SqlRecordParams.Add(new SqlParameter("@dim3DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim3DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim3DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim4", SqlDbType.Bit) { Value = ((string.Empty == this._dim4) ? (object)DBNull.Value : Convert.ToBoolean(this._dim4)) });
                SqlRecordParams.Add(new SqlParameter("@dim4DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim4DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim4DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim5", SqlDbType.Bit) { Value = ((string.Empty == this._dim5) ? (object)DBNull.Value : Convert.ToBoolean(this._dim5)) });
                SqlRecordParams.Add(new SqlParameter("@dim5DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim5DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim5DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim6", SqlDbType.Bit) { Value = ((string.Empty == this._dim6) ? (object)DBNull.Value : Convert.ToBoolean(this._dim6)) });
                SqlRecordParams.Add(new SqlParameter("@dim6DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim6DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim6DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim7", SqlDbType.Bit) { Value = ((string.Empty == this._dim7) ? (object)DBNull.Value : Convert.ToBoolean(this._dim7)) });
                SqlRecordParams.Add(new SqlParameter("@dim7DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim7DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim7DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim8", SqlDbType.Bit) { Value = ((string.Empty == this._dim8) ? (object)DBNull.Value : Convert.ToBoolean(this._dim8)) });
                SqlRecordParams.Add(new SqlParameter("@dim8DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim8DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim8DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim9", SqlDbType.Bit) { Value = ((string.Empty == this._dim9) ? (object)DBNull.Value : Convert.ToBoolean(this._dim9)) });
                SqlRecordParams.Add(new SqlParameter("@dim9DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim9DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim9DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim10", SqlDbType.Bit) { Value = ((string.Empty == this._dim10) ? (object)DBNull.Value : Convert.ToBoolean(this._dim10)) });
                SqlRecordParams.Add(new SqlParameter("@dim10DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim10DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim10DefValue)) });


                ds = DataHelper.ExecuteDataset(str_ConnString, "journalbatch_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[JournalBatch.cs:Operation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@BatchCd", SqlDbType.VarChar) { Value = ((string.Empty == this._BatchCd) ? (object)DBNull.Value : this._BatchCd) });
                SqlRecordParams.Add(new SqlParameter("@BatchDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._BatchDesc) ? (object)DBNull.Value : this._BatchDesc) });
                SqlRecordParams.Add(new SqlParameter("@DocTypeId", SqlDbType.Int) { Value = ((string.Empty == this._DocTypeId) ? (object)DBNull.Value : Convert.ToInt32(this._DocTypeId)) });
                SqlRecordParams.Add(new SqlParameter("@TranTypeId", SqlDbType.Int) { Value = ((string.Empty == this._TranTypeId) ? (object)DBNull.Value : Convert.ToInt32(this._TranTypeId)) });
                SqlRecordParams.Add(new SqlParameter("@DrAcType", SqlDbType.Int) { Value = ((string.Empty == this._DrAcType) ? (object)DBNull.Value : Convert.ToInt32(this._DrAcType)) });
                SqlRecordParams.Add(new SqlParameter("@DrAcNo", SqlDbType.VarChar) { Value = ((string.Empty == this._DrAcNo) ? (object)DBNull.Value : this._DrAcNo) });
                SqlRecordParams.Add(new SqlParameter("@CrAcType", SqlDbType.Int) { Value = ((string.Empty == this._CrAcType) ? (object)DBNull.Value : Convert.ToInt32(this._CrAcType)) });
                SqlRecordParams.Add(new SqlParameter("@CrAcNo", SqlDbType.VarChar) { Value = ((string.Empty == this._CrAcNo) ? (object)DBNull.Value : this._CrAcNo) });
                SqlRecordParams.Add(new SqlParameter("@NoSequenceId", SqlDbType.Int) { Value = ((string.Empty == this._NoSequenceId) ? (object)DBNull.Value : Convert.ToInt32(this._NoSequenceId)) });
                SqlRecordParams.Add(new SqlParameter("@ApprovalCode", SqlDbType.VarChar) { Value = ((string.Empty == this._ApprovalCode) ? (object)DBNull.Value : this._ApprovalCode) });
                SqlRecordParams.Add(new SqlParameter("@UserType", SqlDbType.Char) { Value = ((string.Empty == this._UserType) ? (object)DBNull.Value : this._UserType) });
                SqlRecordParams.Add(new SqlParameter("@UserTypeId", SqlDbType.VarChar) { Value = ((string.Empty == this._UserTypeId) ? (object)DBNull.Value : this._UserTypeId) });
                SqlRecordParams.Add(new SqlParameter("@ApplyGenJrnl", SqlDbType.Bit) { Value = ((string.Empty == this._ApplyGenJrnl) ? (object)DBNull.Value : Convert.ToBoolean(this._ApplyGenJrnl)) });
                SqlRecordParams.Add(new SqlParameter("@ApplyPurJrnl", SqlDbType.Bit) { Value = ((string.Empty == this._ApplyPurJrnl) ? (object)DBNull.Value : Convert.ToBoolean(this._ApplyPurJrnl)) });
                SqlRecordParams.Add(new SqlParameter("@ApplySalesJrnl", SqlDbType.Bit) { Value = ((string.Empty == this._ApplySalesJrnl) ? (object)DBNull.Value : Convert.ToBoolean(this._ApplySalesJrnl)) });
                SqlRecordParams.Add(new SqlParameter("@ApplyRecptJrnl", SqlDbType.Bit) { Value = ((string.Empty == this._ApplyRecptJrnl) ? (object)DBNull.Value : Convert.ToBoolean(this._ApplyRecptJrnl)) });
                SqlRecordParams.Add(new SqlParameter("@ApplyPmtJrnl", SqlDbType.Bit) { Value = ((string.Empty == this._ApplyPmtJrnl) ? (object)DBNull.Value : Convert.ToBoolean(this._ApplyPmtJrnl)) });
                SqlRecordParams.Add(new SqlParameter("@ApplyFAJrnl", SqlDbType.Bit) { Value = ((string.Empty == this._ApplyFAJrnl) ? (object)DBNull.Value : Convert.ToBoolean(this._ApplyFAJrnl)) });
                SqlRecordParams.Add(new SqlParameter("@ApplyPayJrnl", SqlDbType.Bit) { Value = ((string.Empty == this._ApplyPayJrnl) ? (object)DBNull.Value : Convert.ToBoolean(this._ApplyPayJrnl)) });

                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                SqlRecordParams.Add(new SqlParameter("@dim1_Branch", SqlDbType.Bit) { Value = ((string.Empty == this._dim1_Branch) ? (object)DBNull.Value : Convert.ToBoolean(this._dim1_Branch)) });
                SqlRecordParams.Add(new SqlParameter("@dim1DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim1DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim1DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim2_Dept", SqlDbType.Bit) { Value = ((string.Empty == this._dim2_Dept) ? (object)DBNull.Value : Convert.ToBoolean(this._dim2_Dept)) });
                SqlRecordParams.Add(new SqlParameter("@dim2DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim2DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim2DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim3", SqlDbType.Bit) { Value = ((string.Empty == this._dim3) ? (object)DBNull.Value : Convert.ToBoolean(this._dim3)) });
                SqlRecordParams.Add(new SqlParameter("@dim3DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim3DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim3DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim4", SqlDbType.Bit) { Value = ((string.Empty == this._dim4) ? (object)DBNull.Value : Convert.ToBoolean(this._dim4)) });
                SqlRecordParams.Add(new SqlParameter("@dim4DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim4DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim4DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim5", SqlDbType.Bit) { Value = ((string.Empty == this._dim5) ? (object)DBNull.Value : Convert.ToBoolean(this._dim5)) });
                SqlRecordParams.Add(new SqlParameter("@dim5DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim5DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim5DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim6", SqlDbType.Bit) { Value = ((string.Empty == this._dim6) ? (object)DBNull.Value : Convert.ToBoolean(this._dim6)) });
                SqlRecordParams.Add(new SqlParameter("@dim6DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim6DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim6DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim7", SqlDbType.Bit) { Value = ((string.Empty == this._dim7) ? (object)DBNull.Value : Convert.ToBoolean(this._dim7)) });
                SqlRecordParams.Add(new SqlParameter("@dim7DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim7DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim7DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim8", SqlDbType.Bit) { Value = ((string.Empty == this._dim8) ? (object)DBNull.Value : Convert.ToBoolean(this._dim8)) });
                SqlRecordParams.Add(new SqlParameter("@dim8DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim8DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim8DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim9", SqlDbType.Bit) { Value = ((string.Empty == this._dim9) ? (object)DBNull.Value : Convert.ToBoolean(this._dim9)) });
                SqlRecordParams.Add(new SqlParameter("@dim9DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim9DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim9DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim10", SqlDbType.Bit) { Value = ((string.Empty == this._dim10) ? (object)DBNull.Value : Convert.ToBoolean(this._dim10)) });
                SqlRecordParams.Add(new SqlParameter("@dim10DefValue", SqlDbType.Int) { Value = ((string.Empty == this._dim10DefValue) ? (object)DBNull.Value : Convert.ToInt32(this._dim10DefValue)) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "journalbatch_operation", SqlRecordParams.ToArray()).Tables[0];

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
