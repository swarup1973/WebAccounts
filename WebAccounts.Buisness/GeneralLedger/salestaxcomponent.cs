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
    public class salestaxcomponent
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _SaleTaxCompCd = string.Empty;
        public string _SaleTaxCompDesc = string.Empty;
        public string _TaxJurisdictionId = string.Empty;
        public string _ROffTo = string.Empty;
        public string _ROffRule = string.Empty;
        public string _SettleId = string.Empty;
        public string _AcId_SaleTaxPayable = string.Empty;
        public string _AcId_UseTaxPayable = string.Empty;
        public string _AcId_TaxSettlement = string.Empty;
        public string _MethodOfCalc = string.Empty;
        public string _BasisOfCalc = string.Empty;
        public string _TaxOnTax = string.Empty;
        public string _Unit = string.Empty;
        public string _IsBlock = string.Empty;
        public string _CoCd = string.Empty;
        public string _created_by = string.Empty;
        public string _creator_MAC_add = string.Empty;

        

        public DataSet getLookup(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "salestaxcomponentoverview_lookup", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[common.cs:getLookup]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@SaleTaxCompCd", SqlDbType.NVarChar) { Value = ((string.Empty == this._SaleTaxCompCd) ? (object)DBNull.Value : this._SaleTaxCompCd) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@SaleTaxCompDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._SaleTaxCompDesc) ? (object)DBNull.Value : this._SaleTaxCompDesc) });
                SqlRecordParams.Add(new SqlParameter("@TaxJurisdictionId", SqlDbType.BigInt) { Value = ((string.Empty == this._TaxJurisdictionId) ? (object)DBNull.Value : Convert.ToInt64(this._TaxJurisdictionId)) });
                SqlRecordParams.Add(new SqlParameter("@ROffTo", SqlDbType.Decimal) { Value = ((string.Empty == this._ROffTo) ? (object)DBNull.Value : Convert.ToDecimal(this._ROffTo)) });
                SqlRecordParams.Add(new SqlParameter("@ROffRule", SqlDbType.Char) { Value = ((string.Empty == this._ROffRule) ? (object)DBNull.Value : this._ROffRule) });
                SqlRecordParams.Add(new SqlParameter("@SettleId", SqlDbType.BigInt) { Value = ((string.Empty == this._SettleId) ? (object)DBNull.Value : Convert.ToInt64(this._SettleId)) });
                SqlRecordParams.Add(new SqlParameter("@AcId_SaleTaxPayable", SqlDbType.BigInt) { Value = ((string.Empty == this._AcId_SaleTaxPayable) ? (object)DBNull.Value : Convert.ToInt64(this._AcId_SaleTaxPayable)) });
                SqlRecordParams.Add(new SqlParameter("@AcId_UseTaxPayable", SqlDbType.BigInt) { Value = ((string.Empty == this._AcId_UseTaxPayable) ? (object)DBNull.Value : Convert.ToInt64(this._AcId_UseTaxPayable)) });
                SqlRecordParams.Add(new SqlParameter("@AcId_TaxSettlement", SqlDbType.BigInt) { Value = ((string.Empty == this._AcId_TaxSettlement) ? (object)DBNull.Value : Convert.ToInt64(this._AcId_TaxSettlement)) });
                SqlRecordParams.Add(new SqlParameter("@MethodOfCalc", SqlDbType.Char) { Value = ((string.Empty == this._MethodOfCalc) ? (object)DBNull.Value : this._MethodOfCalc) });
                SqlRecordParams.Add(new SqlParameter("@BasisOfCalc", SqlDbType.NVarChar) { Value = ((string.Empty == this._BasisOfCalc) ? (object)DBNull.Value : this._BasisOfCalc) });
                SqlRecordParams.Add(new SqlParameter("@TaxOnTax", SqlDbType.BigInt) { Value = ((string.Empty == this._TaxOnTax) ? (object)DBNull.Value : Convert.ToInt64(this._TaxOnTax)) });
                SqlRecordParams.Add(new SqlParameter("@Unit", SqlDbType.BigInt) { Value = ((string.Empty == this._Unit) ? (object)DBNull.Value : Convert.ToInt64(this._Unit)) });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "salestaxcomponent_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[salestaxcomponent.cs:Operation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@SaleTaxCompCd", SqlDbType.NVarChar) { Value = ((string.Empty == this._SaleTaxCompCd) ? (object)DBNull.Value : this._SaleTaxCompCd) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@SaleTaxCompDesc", SqlDbType.VarChar) { Value = ((string.Empty == this._SaleTaxCompDesc) ? (object)DBNull.Value : this._SaleTaxCompDesc) });
                SqlRecordParams.Add(new SqlParameter("@TaxJurisdictionId", SqlDbType.BigInt) { Value = ((string.Empty == this._TaxJurisdictionId) ? (object)DBNull.Value : Convert.ToInt64(this._TaxJurisdictionId)) });
                SqlRecordParams.Add(new SqlParameter("@ROffTo", SqlDbType.Decimal) { Value = ((string.Empty == this._ROffTo) ? (object)DBNull.Value : Convert.ToDecimal(this._ROffTo)) });
                SqlRecordParams.Add(new SqlParameter("@ROffRule", SqlDbType.Char) { Value = ((string.Empty == this._ROffRule) ? (object)DBNull.Value : this._ROffRule) });
                SqlRecordParams.Add(new SqlParameter("@SettleId", SqlDbType.BigInt) { Value = ((string.Empty == this._SettleId) ? (object)DBNull.Value : Convert.ToInt64(this._SettleId)) });
                SqlRecordParams.Add(new SqlParameter("@AcId_SaleTaxPayable", SqlDbType.BigInt) { Value = ((string.Empty == this._AcId_SaleTaxPayable) ? (object)DBNull.Value : Convert.ToInt64(this._AcId_SaleTaxPayable)) });
                SqlRecordParams.Add(new SqlParameter("@AcId_UseTaxPayable", SqlDbType.BigInt) { Value = ((string.Empty == this._AcId_UseTaxPayable) ? (object)DBNull.Value : Convert.ToInt64(this._AcId_UseTaxPayable)) });
                SqlRecordParams.Add(new SqlParameter("@AcId_TaxSettlement", SqlDbType.BigInt) { Value = ((string.Empty == this._AcId_TaxSettlement) ? (object)DBNull.Value : Convert.ToInt64(this._AcId_TaxSettlement)) });
                SqlRecordParams.Add(new SqlParameter("@MethodOfCalc", SqlDbType.Char) { Value = ((string.Empty == this._MethodOfCalc) ? (object)DBNull.Value : this._MethodOfCalc) });
                SqlRecordParams.Add(new SqlParameter("@BasisOfCalc", SqlDbType.NVarChar) { Value = ((string.Empty == this._BasisOfCalc) ? (object)DBNull.Value : this._BasisOfCalc) });
                SqlRecordParams.Add(new SqlParameter("@TaxOnTax", SqlDbType.BigInt) { Value = ((string.Empty == this._TaxOnTax) ? (object)DBNull.Value : Convert.ToInt64(this._TaxOnTax)) });
                SqlRecordParams.Add(new SqlParameter("@Unit", SqlDbType.BigInt) { Value = ((string.Empty == this._Unit) ? (object)DBNull.Value : Convert.ToInt64(this._Unit)) });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "salestaxcomponent_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[salestaxcomponent.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }
}
