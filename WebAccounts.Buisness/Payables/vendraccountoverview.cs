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
    public class vendraccountoverview
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _code = string.Empty;
        public string _name = string.Empty;
        public string _vendorsearch = string.Empty;
        public string _CurrCd = string.Empty;
        public string _CrLimit = string.Empty;
        public string _VendGrpCd = string.Empty;
        public string _IsForeignVendor = string.Empty;
        public string _BranchCd = string.Empty;
        public string _EntityType = string.Empty;
        public string _PersonRespId = string.Empty;
        public string _Block = string.Empty;
        public string _CreditRating = string.Empty;
        public string _Address1 = string.Empty;
        public string _Address2 = string.Empty;
        public string _Pin = string.Empty;
        public string _City = string.Empty;
        public string _CountryCd = string.Empty;
        public string _StateCd = string.Empty;
        public string _PhoneNo = string.Empty;
        public string _AlternateNo = string.Empty;
        public string _FaxNo = string.Empty;
        public string _ContactPerson = string.Empty;
        public string _Email = string.Empty;
        public string _Website = string.Empty;
        public string _PrePmtPer = string.Empty;
        public string _PmtTermsCd = string.Empty;
        public string _PmtMethodCd = string.Empty;
        public string _PriceIncludeST = string.Empty;
        public string _VendBankId = string.Empty;
        public string _PrintNameOnCheque = string.Empty;
        public string _ShipMethodCd = string.Empty;
        public string _LeadTimeInDay = string.Empty;
        public string _TaxAcNo = string.Empty;
        public string _Is1099App = string.Empty;
        public string _BusinessNatureCd = string.Empty;
        public string _GstRegdNo = string.Empty;
        public string _IsWitholdingTaxApp = string.Empty;
        public string _WHTaxGrpCd = string.Empty;
        public string _TaxExampNo = string.Empty;
        public string _SalesTaxGrpCd = string.Empty;
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

        public DataSet GetRoleCenter(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                ds = DataHelper.ExecuteDataset(str_ConnString, "get_Administrator_RoleCenter", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Administrator_Role.cs:GetRoleCenter]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@VendCd", SqlDbType.VarChar) { Value = ((string.Empty == this._code) ? (object)DBNull.Value : this._code) });
                SqlRecordParams.Add(new SqlParameter("@VendName", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });
                SqlRecordParams.Add(new SqlParameter("@VendSearch", SqlDbType.VarChar) { Value = ((string.Empty == this._vendorsearch) ? (object)DBNull.Value : this._vendorsearch) });
                SqlRecordParams.Add(new SqlParameter("@CurrCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CurrCd) ? (object)DBNull.Value : this._CurrCd) });
                SqlRecordParams.Add(new SqlParameter("@CrLimit", SqlDbType.Decimal) { Value = ((string.Empty == this._CrLimit) ? (object)DBNull.Value : Convert.ToDecimal(this._CrLimit)) });
                SqlRecordParams.Add(new SqlParameter("@VendGrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this._VendGrpCd) ? (object)DBNull.Value : this._VendGrpCd) });
                SqlRecordParams.Add(new SqlParameter("@IsForeignVendor", SqlDbType.Bit) { Value = ((string.Empty == this._IsForeignVendor) ? (object)DBNull.Value : Convert.ToBoolean(this._IsForeignVendor)) });
                SqlRecordParams.Add(new SqlParameter("@BranchCd", SqlDbType.VarChar) { Value = ((string.Empty == this._BranchCd) ? (object)DBNull.Value : this._BranchCd) });
                SqlRecordParams.Add(new SqlParameter("@EntityType", SqlDbType.VarChar) { Value = ((string.Empty == this._EntityType) ? (object)DBNull.Value : this._EntityType) });
                SqlRecordParams.Add(new SqlParameter("@PersonRespId", SqlDbType.BigInt) { Value = ((string.Empty == this._PersonRespId) ? (object)DBNull.Value : Int64.Parse(this._PersonRespId)) });
                SqlRecordParams.Add(new SqlParameter("@Block", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : this._Block) });
                SqlRecordParams.Add(new SqlParameter("@CreditRating", SqlDbType.VarChar) { Value = ((string.Empty == this._CreditRating) ? (object)DBNull.Value : this._CreditRating) });
                SqlRecordParams.Add(new SqlParameter("@Address1", SqlDbType.VarChar) { Value = ((string.Empty == this._Address1) ? (object)DBNull.Value : this._Address1) });
                SqlRecordParams.Add(new SqlParameter("@Address2", SqlDbType.VarChar) { Value = ((string.Empty == this._Address2) ? (object)DBNull.Value : this._Address2) });
                SqlRecordParams.Add(new SqlParameter("@Pin", SqlDbType.VarChar) { Value = ((string.Empty == this._Pin) ? (object)DBNull.Value : this._Pin) });
                SqlRecordParams.Add(new SqlParameter("@City", SqlDbType.VarChar) { Value = ((string.Empty == this._City) ? (object)DBNull.Value : this._City) });
                SqlRecordParams.Add(new SqlParameter("@CountryCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CountryCd) ? (object)DBNull.Value : this._CountryCd) });
                SqlRecordParams.Add(new SqlParameter("@StateCd", SqlDbType.VarChar) { Value = ((string.Empty == this._StateCd) ? (object)DBNull.Value : this._StateCd) });
                SqlRecordParams.Add(new SqlParameter("@PhoneNo", SqlDbType.VarChar) { Value = ((string.Empty == this._PhoneNo) ? (object)DBNull.Value : this._PhoneNo) });
                SqlRecordParams.Add(new SqlParameter("@AlternateNo", SqlDbType.VarChar) { Value = ((string.Empty == this._AlternateNo) ? (object)DBNull.Value : this._AlternateNo) });
                SqlRecordParams.Add(new SqlParameter("@FaxNo", SqlDbType.VarChar) { Value = ((string.Empty == this._FaxNo) ? (object)DBNull.Value : this._FaxNo) });
                SqlRecordParams.Add(new SqlParameter("@ContactPerson", SqlDbType.VarChar) { Value = ((string.Empty == this._ContactPerson) ? (object)DBNull.Value : this._ContactPerson) });
                SqlRecordParams.Add(new SqlParameter("@Email", SqlDbType.VarChar) { Value = ((string.Empty == this._Email) ? (object)DBNull.Value : this._Email) });
                SqlRecordParams.Add(new SqlParameter("@Website", SqlDbType.VarChar) { Value = ((string.Empty == this._Website) ? (object)DBNull.Value : this._Website) });
                SqlRecordParams.Add(new SqlParameter("@PrePmtPer", SqlDbType.Decimal) { Value = ((string.Empty == this._PrePmtPer) ? (object)DBNull.Value : this._PrePmtPer) });
                SqlRecordParams.Add(new SqlParameter("@PmtTermsCd", SqlDbType.VarChar) { Value = ((string.Empty == this._PmtTermsCd) ? (object)DBNull.Value : this._PmtTermsCd) });
                SqlRecordParams.Add(new SqlParameter("@PmtMethodCd", SqlDbType.VarChar) { Value = ((string.Empty == this._PmtMethodCd) ? (object)DBNull.Value : this._PmtMethodCd) });
                SqlRecordParams.Add(new SqlParameter("@PriceIncludeST", SqlDbType.Bit) { Value = ((string.Empty == this._PriceIncludeST) ? (object)DBNull.Value : Convert.ToBoolean(this._PriceIncludeST)) });
                SqlRecordParams.Add(new SqlParameter("@VendBankId", SqlDbType.BigInt) { Value = ((string.Empty == this._VendBankId) ? (object)DBNull.Value : Int64.Parse(this._VendBankId)) });
                SqlRecordParams.Add(new SqlParameter("@PrintNameOnCheque", SqlDbType.VarChar) { Value = ((string.Empty == this._PrintNameOnCheque) ? (object)DBNull.Value : this._PrintNameOnCheque) });
                SqlRecordParams.Add(new SqlParameter("@ShipMethodCd", SqlDbType.VarChar) { Value = ((string.Empty == this._ShipMethodCd) ? (object)DBNull.Value : this._ShipMethodCd) });
                SqlRecordParams.Add(new SqlParameter("@LeadTimeInDay", SqlDbType.Int) { Value = ((string.Empty == this._LeadTimeInDay) ? (object)DBNull.Value : Convert.ToInt32(this._LeadTimeInDay)) });
                SqlRecordParams.Add(new SqlParameter("@TaxAcNo", SqlDbType.VarChar) { Value = ((string.Empty == this._TaxAcNo) ? (object)DBNull.Value : this._TaxAcNo) });
                SqlRecordParams.Add(new SqlParameter("@Is1099App", SqlDbType.Bit) { Value = ((string.Empty == this._Is1099App) ? (object)DBNull.Value : Convert.ToBoolean(this._Is1099App)) });
                SqlRecordParams.Add(new SqlParameter("@BusinessNatureCd", SqlDbType.VarChar) { Value = ((string.Empty == this._BusinessNatureCd) ? (object)DBNull.Value : this._BusinessNatureCd) });
                SqlRecordParams.Add(new SqlParameter("@GstRegdNo", SqlDbType.VarChar) { Value = ((string.Empty == this._GstRegdNo) ? (object)DBNull.Value : this._GstRegdNo) });
                SqlRecordParams.Add(new SqlParameter("@IsWitholdingTaxApp", SqlDbType.Bit) { Value = ((string.Empty == this._IsWitholdingTaxApp) ? (object)DBNull.Value : Convert.ToBoolean(this._IsWitholdingTaxApp)) });
                SqlRecordParams.Add(new SqlParameter("@WHTaxGrpCd", SqlDbType.Int) { Value = ((string.Empty == this._WHTaxGrpCd) ? (object)DBNull.Value : Convert.ToInt32(this._WHTaxGrpCd)) });
                SqlRecordParams.Add(new SqlParameter("@TaxExampNo", SqlDbType.VarChar) { Value = ((string.Empty == this._TaxExampNo) ? (object)DBNull.Value : this._TaxExampNo) });
                SqlRecordParams.Add(new SqlParameter("@SalesTaxGrpCd", SqlDbType.Int) { Value = ((string.Empty == this._SalesTaxGrpCd) ? (object)DBNull.Value : Convert.ToInt32(this._SalesTaxGrpCd)) });
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


                ds = DataHelper.ExecuteDataset(str_ConnString, "vendraccountoverview_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[vendraccountoverview.cs:Operation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@VendCd", SqlDbType.VarChar) { Value = ((string.Empty == this._code) ? (object)DBNull.Value : this._code) });
                SqlRecordParams.Add(new SqlParameter("@VendName", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });
                SqlRecordParams.Add(new SqlParameter("@VendSearch", SqlDbType.VarChar) { Value = ((string.Empty == this._vendorsearch) ? (object)DBNull.Value : this._vendorsearch) });
                SqlRecordParams.Add(new SqlParameter("@CurrCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CurrCd) ? (object)DBNull.Value : this._CurrCd) });
                SqlRecordParams.Add(new SqlParameter("@CrLimit", SqlDbType.Decimal) { Value = ((string.Empty == this._CrLimit) ? (object)DBNull.Value : this._CrLimit) });
                SqlRecordParams.Add(new SqlParameter("@VendGrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this._VendGrpCd) ? (object)DBNull.Value : this._VendGrpCd) });
                SqlRecordParams.Add(new SqlParameter("@IsForeignVendor", SqlDbType.Bit) { Value = ((string.Empty == this._IsForeignVendor) ? (object)DBNull.Value : Convert.ToBoolean(this._IsForeignVendor)) });
                SqlRecordParams.Add(new SqlParameter("@BranchCd", SqlDbType.VarChar) { Value = ((string.Empty == this._BranchCd) ? (object)DBNull.Value : this._BranchCd) });
                SqlRecordParams.Add(new SqlParameter("@EntityType", SqlDbType.VarChar) { Value = ((string.Empty == this._EntityType) ? (object)DBNull.Value : this._EntityType) });
                SqlRecordParams.Add(new SqlParameter("@PersonRespId", SqlDbType.BigInt) { Value = ((string.Empty == this._PersonRespId) ? (object)DBNull.Value : this._PersonRespId) });
                SqlRecordParams.Add(new SqlParameter("@Block", SqlDbType.VarChar) { Value = ((string.Empty == this._Block) ? (object)DBNull.Value : this._Block) });
                SqlRecordParams.Add(new SqlParameter("@CreditRating", SqlDbType.VarChar) { Value = ((string.Empty == this._CreditRating) ? (object)DBNull.Value : this._CreditRating) });
                SqlRecordParams.Add(new SqlParameter("@Address1", SqlDbType.VarChar) { Value = ((string.Empty == this._Address1) ? (object)DBNull.Value : this._Address1) });
                SqlRecordParams.Add(new SqlParameter("@Address2", SqlDbType.VarChar) { Value = ((string.Empty == this._Address2) ? (object)DBNull.Value : this._Address2) });
                SqlRecordParams.Add(new SqlParameter("@Pin", SqlDbType.VarChar) { Value = ((string.Empty == this._Pin) ? (object)DBNull.Value : this._Pin) });
                SqlRecordParams.Add(new SqlParameter("@City", SqlDbType.VarChar) { Value = ((string.Empty == this._City) ? (object)DBNull.Value : this._City) });
                SqlRecordParams.Add(new SqlParameter("@CountryCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CountryCd) ? (object)DBNull.Value : this._CountryCd) });
                SqlRecordParams.Add(new SqlParameter("@StateCd", SqlDbType.VarChar) { Value = ((string.Empty == this._StateCd) ? (object)DBNull.Value : this._StateCd) });
                SqlRecordParams.Add(new SqlParameter("@PhoneNo", SqlDbType.VarChar) { Value = ((string.Empty == this._PhoneNo) ? (object)DBNull.Value : this._PhoneNo) });
                SqlRecordParams.Add(new SqlParameter("@AlternateNo", SqlDbType.VarChar) { Value = ((string.Empty == this._AlternateNo) ? (object)DBNull.Value : this._AlternateNo) });
                SqlRecordParams.Add(new SqlParameter("@FaxNo", SqlDbType.VarChar) { Value = ((string.Empty == this._FaxNo) ? (object)DBNull.Value : this._FaxNo) });
                SqlRecordParams.Add(new SqlParameter("@ContactPerson", SqlDbType.VarChar) { Value = ((string.Empty == this._ContactPerson) ? (object)DBNull.Value : this._ContactPerson) });
                SqlRecordParams.Add(new SqlParameter("@Email", SqlDbType.VarChar) { Value = ((string.Empty == this._Email) ? (object)DBNull.Value : this._Email) });
                SqlRecordParams.Add(new SqlParameter("@Website", SqlDbType.VarChar) { Value = ((string.Empty == this._Website) ? (object)DBNull.Value : this._Website) });
                SqlRecordParams.Add(new SqlParameter("@PrePmtPer", SqlDbType.Decimal) { Value = ((string.Empty == this._PrePmtPer) ? (object)DBNull.Value : this._PrePmtPer) });
                SqlRecordParams.Add(new SqlParameter("@PmtTermsCd", SqlDbType.VarChar) { Value = ((string.Empty == this._PmtTermsCd) ? (object)DBNull.Value : this._PmtTermsCd) });
                SqlRecordParams.Add(new SqlParameter("@PmtMethodCd", SqlDbType.VarChar) { Value = ((string.Empty == this._PmtMethodCd) ? (object)DBNull.Value : this._PmtMethodCd) });
                SqlRecordParams.Add(new SqlParameter("@PriceIncludeST", SqlDbType.Bit) { Value = ((string.Empty == this._PriceIncludeST) ? (object)DBNull.Value : Convert.ToBoolean(this._PriceIncludeST)) });
                SqlRecordParams.Add(new SqlParameter("@VendBankId", SqlDbType.BigInt) { Value = ((string.Empty == this._VendBankId) ? (object)DBNull.Value : Convert.ToInt64(this._VendBankId)) });
                SqlRecordParams.Add(new SqlParameter("@PrintNameOnCheque", SqlDbType.VarChar) { Value = ((string.Empty == this._PrintNameOnCheque) ? (object)DBNull.Value : this._PrintNameOnCheque) });
                SqlRecordParams.Add(new SqlParameter("@ShipMethodCd", SqlDbType.VarChar) { Value = ((string.Empty == this._ShipMethodCd) ? (object)DBNull.Value : this._ShipMethodCd) });
                SqlRecordParams.Add(new SqlParameter("@LeadTimeInDay", SqlDbType.Int) { Value = ((string.Empty == this._LeadTimeInDay) ? (object)DBNull.Value : Convert.ToInt64(this._LeadTimeInDay)) });
                SqlRecordParams.Add(new SqlParameter("@TaxAcNo", SqlDbType.VarChar) { Value = ((string.Empty == this._TaxAcNo) ? (object)DBNull.Value : this._TaxAcNo) });
                SqlRecordParams.Add(new SqlParameter("@Is1099App", SqlDbType.Bit) { Value = ((string.Empty == this._Is1099App) ? (object)DBNull.Value : Convert.ToBoolean(this._Is1099App)) });
                SqlRecordParams.Add(new SqlParameter("@BusinessNatureCd", SqlDbType.VarChar) { Value = ((string.Empty == this._BusinessNatureCd) ? (object)DBNull.Value : this._BusinessNatureCd) });
                SqlRecordParams.Add(new SqlParameter("@GstRegdNo", SqlDbType.VarChar) { Value = ((string.Empty == this._GstRegdNo) ? (object)DBNull.Value : this._GstRegdNo) });
                SqlRecordParams.Add(new SqlParameter("@IsWitholdingTaxApp", SqlDbType.Bit) { Value = ((string.Empty == this._IsWitholdingTaxApp) ? (object)DBNull.Value : Convert.ToBoolean(this._IsWitholdingTaxApp)) });
                SqlRecordParams.Add(new SqlParameter("@WHTaxGrpCd", SqlDbType.Int) { Value = ((string.Empty == this._WHTaxGrpCd) ? (object)DBNull.Value : Convert.ToInt32(this._WHTaxGrpCd)) });
                SqlRecordParams.Add(new SqlParameter("@TaxExampNo", SqlDbType.VarChar) { Value = ((string.Empty == this._TaxExampNo) ? (object)DBNull.Value : this._TaxExampNo) });
                SqlRecordParams.Add(new SqlParameter("@SalesTaxGrpCd", SqlDbType.Int) { Value = ((string.Empty == this._SalesTaxGrpCd) ? (object)DBNull.Value : Convert.ToInt32(this._SalesTaxGrpCd)) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });

                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._vendorsearch) ? (object)DBNull.Value : this._vendorsearch) });

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

                dt = DataHelper.ExecuteDataset(str_ConnString, "vendraccountoverview_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[vendraccountoverview.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }

    }
}
