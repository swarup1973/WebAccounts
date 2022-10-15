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
    public class SalesTaxGroupItem
    {
        public string _rowid = string.Empty;
        public string _module = string.Empty;
        public string _mode = string.Empty;
        public string _SalesTaxGrpCd = string.Empty;
        public string _SalesTaxGrpDesc = string.Empty;
        public string _SalesTaxGrpId = string.Empty;
        public string _SaleTaxCompId = string.Empty;
        public string _Block = string.Empty;
        public string _CoCd = string.Empty;
        public string _created_by = string.Empty;
        public string _creator_MAC_add = string.Empty;


        public DataSet getTax(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "populate_Tax_by_cocd", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[taxcode.cs:Operation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_module", SqlDbType.NVarChar) { Value = this._module });
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_SalesTaxGrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this._SalesTaxGrpCd) ? (object)DBNull.Value : this._SalesTaxGrpCd) });
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@p_SalesTaxGrpDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._SalesTaxGrpDesc) ? (object)DBNull.Value : this._SalesTaxGrpDesc) });
                SqlRecordParams.Add(new SqlParameter("@p_SalesTaxGrpId", SqlDbType.BigInt) { Value = ((string.Empty == this._SalesTaxGrpId) ? (object)DBNull.Value : Convert.ToInt64(this._SalesTaxGrpId)) });
                SqlRecordParams.Add(new SqlParameter("@p_SaleTaxCompId", SqlDbType.BigInt) { Value = ((string.Empty == this._SaleTaxCompId) ? (object)DBNull.Value : Convert.ToInt64(this._SaleTaxCompId)) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : Convert.ToBoolean(this._Block)) });
                SqlRecordParams.Add(new SqlParameter("@p_created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@p_editor_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_SalesTaxGroup_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[SalesTaxGroupItem.cs:Operation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_module", SqlDbType.NVarChar) { Value = this._module });
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_SalesTaxGrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this._SalesTaxGrpCd) ? (object)DBNull.Value : this._SalesTaxGrpCd) });
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@p_SalesTaxGrpDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._SalesTaxGrpDesc) ? (object)DBNull.Value : this._SalesTaxGrpDesc) });
                SqlRecordParams.Add(new SqlParameter("@p_SalesTaxGrpId", SqlDbType.BigInt) { Value = ((string.Empty == this._SalesTaxGrpId) ? (object)DBNull.Value : Convert.ToInt64(this._SalesTaxGrpId)) });
                SqlRecordParams.Add(new SqlParameter("@p_SaleTaxCompId", SqlDbType.BigInt) { Value = ((string.Empty == this._SaleTaxCompId) ? (object)DBNull.Value : Convert.ToInt64(this._SaleTaxCompId)) });
                SqlRecordParams.Add(new SqlParameter("@p_IsBlock", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : Convert.ToBoolean(this._Block)) });
                SqlRecordParams.Add(new SqlParameter("@p_created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@p_editor_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "GeneralLedger_SalesTaxGroup_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[SalesTaxGroupItem.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }

    }
}
