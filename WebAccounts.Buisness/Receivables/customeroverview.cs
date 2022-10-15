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
    public class customeroverview
    {
        public string RowId = string.Empty;
        public string mode = string.Empty;
        public string CustCd = string.Empty;
        public string CustName = string.Empty;
        public string CustSearch = string.Empty;
        public string CurrCd = string.Empty;
        public string CrLimit = string.Empty;
        public string CustGrpCd = string.Empty;
        public string IsForeignCust = string.Empty;
        public string GovtIdNo = string.Empty;
        public string BranchCd = string.Empty;
        public string EntityType = string.Empty;
        public string PersonRespId = string.Empty;
        public string Block = string.Empty;

        public string Address1 = string.Empty;
        public string Address2 = string.Empty;
        public string Pin = string.Empty;
        public string City = string.Empty;
        public string CountryCd = string.Empty;
        public string StateCd = string.Empty;
        public string PhoneNo = string.Empty;
        public string AlternateNo = string.Empty;
        public string FaxNo = string.Empty;
        public string ContactPerson = string.Empty;
        public string Email = string.Empty;
        public string Website = string.Empty;

        public string BillToCust = string.Empty;
        public string PrePmtPer = string.Empty;
        public string PmtTermsCd = string.Empty;
        public string PmtMethodCd = string.Empty;
        public string FinChgTermCd = string.Empty;
        public string DiscTollerancePer = string.Empty;
        public string PriceIncludeST = string.Empty;

        public string ShipMethodCd = string.Empty;
        public string LeadTimeInDay = string.Empty;
        public string Reserve = string.Empty;

        public string ShipAddSameAsPrimary = string.Empty;
        public string ShipToName = string.Empty;
        public string Ship_Address1 = string.Empty;
        public string Ship_Address2 = string.Empty;
        public string Ship_Pin = string.Empty;
        public string Ship_City = string.Empty;
        public string Ship_CountryCd = string.Empty;
        public string Ship_StateCd = string.Empty;

        public string Ship_PhoneNo = string.Empty;
        public string Ship_AlternateNo = string.Empty;
        public string Ship_FaxNo = string.Empty;
        public string Ship_ContactPerson = string.Empty;
        public string Ship_Email = string.Empty;
        public string Ship_Website = string.Empty;

        public string InvAddSameAsPrimary = string.Empty;
        public string InvToName = string.Empty;
        public string Inv_Address1 = string.Empty;
        public string Inv_Address2 = string.Empty;
        public string Inv_Pin = string.Empty;
        public string Inv_City = string.Empty;
        public string Inv_CountryCd = string.Empty;
        public string Inv_StateCd = string.Empty;

        public string InvAddSameAsShip = string.Empty;
        public string Inv_PhoneNo = string.Empty;
        public string Inv_AlternateNo = string.Empty;
        public string Inv_FaxNo = string.Empty;
        public string Inv_ContactPerson = string.Empty;
        public string Inv_Email = string.Empty;
        public string Inv_Website = string.Empty;

        public string TaxAcNo = string.Empty;
        public string BusinessNatureCd = string.Empty;
        public string GstRegdNo = string.Empty;
        public string TaxExampNo = string.Empty;
        public string SalesTaxGrpCd = string.Empty;

        public string CoCd = string.Empty;
        public string _created_by = string.Empty;
        public string _creator_MAC_add = string.Empty;


        public string dim1_Branch = string.Empty;
        public string dim1DefValue = string.Empty;
        public string dim2_Dept = string.Empty;
        public string dim2DefValue = string.Empty;
        public string dim3 = string.Empty;
        public string dim3DefValue = string.Empty;
        public string dim4 = string.Empty;
        public string dim4DefValue = string.Empty;
        public string dim5 = string.Empty;
        public string dim5DefValue = string.Empty;
        public string dim6 = string.Empty;
        public string dim6DefValue = string.Empty;
        public string dim7 = string.Empty;
        public string dim7DefValue = string.Empty;
        public string dim8 = string.Empty;
        public string dim8DefValue = string.Empty;
        public string dim9 = string.Empty;
        public string dim9DefValue = string.Empty;
        public string dim10 = string.Empty;
        public string dim10DefValue = string.Empty;

        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this.mode });
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this.RowId) ? (object)DBNull.Value : Int64.Parse(this.RowId)) });
                SqlRecordParams.Add(new SqlParameter("@CustCd", SqlDbType.VarChar) { Value = ((string.Empty == this.CustCd) ? (object)DBNull.Value : this.CustCd) });
                SqlRecordParams.Add(new SqlParameter("@CustName", SqlDbType.VarChar) { Value = ((string.Empty == this.CustName) ? (object)DBNull.Value : this.CustName) });
                SqlRecordParams.Add(new SqlParameter("@CustSearch", SqlDbType.VarChar) { Value = ((string.Empty == this.CustSearch) ? (object)DBNull.Value : this.CustSearch) });
                SqlRecordParams.Add(new SqlParameter("@CurrCd", SqlDbType.VarChar) { Value = ((string.Empty == this.CurrCd) ? (object)DBNull.Value : this.CurrCd) });
                SqlRecordParams.Add(new SqlParameter("@CrLimit", SqlDbType.Decimal) { Value = ((string.Empty == this.CrLimit) ? (object)DBNull.Value : Convert.ToDecimal(this.CrLimit)) });
                SqlRecordParams.Add(new SqlParameter("@CustGrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this.CustGrpCd) ? (object)DBNull.Value : this.CustGrpCd) });
                SqlRecordParams.Add(new SqlParameter("@IsForeignCust", SqlDbType.Bit) { Value = ((string.Empty == this.IsForeignCust) ? (object)DBNull.Value : Convert.ToBoolean(this.IsForeignCust)) });
                SqlRecordParams.Add(new SqlParameter("@GovtIdNo", SqlDbType.VarChar) { Value = ((string.Empty == this.GovtIdNo) ? (object)DBNull.Value : this.GovtIdNo) });
                SqlRecordParams.Add(new SqlParameter("@BranchCd", SqlDbType.VarChar) { Value = ((string.Empty == this.BranchCd) ? (object)DBNull.Value : this.BranchCd) });
                SqlRecordParams.Add(new SqlParameter("@EntityType", SqlDbType.VarChar) { Value = ((string.Empty == this.EntityType) ? (object)DBNull.Value : this.EntityType) });
                SqlRecordParams.Add(new SqlParameter("@PersonRespId", SqlDbType.BigInt) { Value = ((string.Empty == this.PersonRespId) ? (object)DBNull.Value : Int64.Parse(this.PersonRespId)) });
                SqlRecordParams.Add(new SqlParameter("@Block", SqlDbType.VarChar) { Value = ((string.Empty == this.Block) ? (object)DBNull.Value : this.Block) });


                SqlRecordParams.Add(new SqlParameter("@Address1", SqlDbType.VarChar) { Value = ((string.Empty == this.Address1) ? (object)DBNull.Value : this.Address1) });
                SqlRecordParams.Add(new SqlParameter("@Address2", SqlDbType.VarChar) { Value = ((string.Empty == this.Address2) ? (object)DBNull.Value : this.Address2) });
                SqlRecordParams.Add(new SqlParameter("@Pin", SqlDbType.VarChar) { Value = ((string.Empty == this.Pin) ? (object)DBNull.Value : this.Pin) });
                SqlRecordParams.Add(new SqlParameter("@City", SqlDbType.VarChar) { Value = ((string.Empty == this.City) ? (object)DBNull.Value : this.City) });
                SqlRecordParams.Add(new SqlParameter("@CountryCd", SqlDbType.VarChar) { Value = ((string.Empty == this.CountryCd) ? (object)DBNull.Value : this.CountryCd) });
                SqlRecordParams.Add(new SqlParameter("@StateCd", SqlDbType.VarChar) { Value = ((string.Empty == this.StateCd) ? (object)DBNull.Value : this.StateCd) });
                SqlRecordParams.Add(new SqlParameter("@PhoneNo", SqlDbType.VarChar) { Value = ((string.Empty == this.PhoneNo) ? (object)DBNull.Value : this.PhoneNo) });
                SqlRecordParams.Add(new SqlParameter("@AlternateNo", SqlDbType.VarChar) { Value = ((string.Empty == this.AlternateNo) ? (object)DBNull.Value : this.AlternateNo) });
                SqlRecordParams.Add(new SqlParameter("@FaxNo", SqlDbType.VarChar) { Value = ((string.Empty == this.FaxNo) ? (object)DBNull.Value : this.FaxNo) });
                SqlRecordParams.Add(new SqlParameter("@ContactPerson", SqlDbType.VarChar) { Value = ((string.Empty == this.ContactPerson) ? (object)DBNull.Value : this.ContactPerson) });
                SqlRecordParams.Add(new SqlParameter("@Email", SqlDbType.VarChar) { Value = ((string.Empty == this.Email) ? (object)DBNull.Value : this.Email) });
                SqlRecordParams.Add(new SqlParameter("@Website", SqlDbType.VarChar) { Value = ((string.Empty == this.Website) ? (object)DBNull.Value : this.Website) });


                SqlRecordParams.Add(new SqlParameter("@BillToCust", SqlDbType.VarChar) { Value = ((string.Empty == this.BillToCust) ? (object)DBNull.Value : this.BillToCust) });
                SqlRecordParams.Add(new SqlParameter("@PrePmtPer", SqlDbType.Decimal) { Value = ((string.Empty == this.PrePmtPer) ? (object)DBNull.Value : Convert.ToDecimal(this.PrePmtPer)) });
                SqlRecordParams.Add(new SqlParameter("@PmtTermsCd", SqlDbType.VarChar) { Value = ((string.Empty == this.PmtTermsCd) ? (object)DBNull.Value : this.PmtTermsCd) });
                SqlRecordParams.Add(new SqlParameter("@PmtMethodCd", SqlDbType.VarChar) { Value = ((string.Empty == this.PmtMethodCd) ? (object)DBNull.Value : this.PmtMethodCd) });
                SqlRecordParams.Add(new SqlParameter("@FinChgTermCd", SqlDbType.VarChar) { Value = ((string.Empty == this.FinChgTermCd) ? (object)DBNull.Value : this.FinChgTermCd) });
                SqlRecordParams.Add(new SqlParameter("@DiscTollerancePer", SqlDbType.Decimal) { Value = ((string.Empty == this.DiscTollerancePer) ? (object)DBNull.Value : Convert.ToDecimal(this.DiscTollerancePer)) });
                SqlRecordParams.Add(new SqlParameter("@PriceIncludeST", SqlDbType.Bit) { Value = ((string.Empty == this.PriceIncludeST) ? (object)DBNull.Value : Convert.ToBoolean(this.PriceIncludeST)) });

                SqlRecordParams.Add(new SqlParameter("@ShipMethodCd", SqlDbType.VarChar) { Value = ((string.Empty == this.ShipMethodCd) ? (object)DBNull.Value : this.ShipMethodCd) });
                SqlRecordParams.Add(new SqlParameter("@LeadTimeInDay", SqlDbType.Int) { Value = ((string.Empty == this.LeadTimeInDay) ? (object)DBNull.Value : Convert.ToInt32(this.LeadTimeInDay)) });
                SqlRecordParams.Add(new SqlParameter("@Reserve", SqlDbType.VarChar) { Value = ((string.Empty == this.Reserve) ? (object)DBNull.Value : this.Reserve) });
                SqlRecordParams.Add(new SqlParameter("@ShipAddSameAsPrimary", SqlDbType.Bit) { Value = ((string.Empty == this.ShipAddSameAsPrimary) ? (object)DBNull.Value : Convert.ToBoolean(this.ShipAddSameAsPrimary)) });

                SqlRecordParams.Add(new SqlParameter("@ShipToName", SqlDbType.VarChar) { Value = ((string.Empty == this.ShipToName) ? (object)DBNull.Value : this.ShipToName) });
                SqlRecordParams.Add(new SqlParameter("@Ship_Address1", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_Address1) ? (object)DBNull.Value : this.Ship_Address1) });
                SqlRecordParams.Add(new SqlParameter("@Ship_Address2", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_Address2) ? (object)DBNull.Value : this.Ship_Address2) });
                SqlRecordParams.Add(new SqlParameter("@Ship_Pin", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_Pin) ? (object)DBNull.Value : this.Ship_Pin) });
                SqlRecordParams.Add(new SqlParameter("@Ship_City", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_City) ? (object)DBNull.Value : this.Ship_City) });
                SqlRecordParams.Add(new SqlParameter("@Ship_CountryCd", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_CountryCd) ? (object)DBNull.Value : this.Ship_CountryCd) });
                SqlRecordParams.Add(new SqlParameter("@Ship_StateCd", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_StateCd) ? (object)DBNull.Value : this.Ship_StateCd) });

                SqlRecordParams.Add(new SqlParameter("@Ship_PhoneNo", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_PhoneNo) ? (object)DBNull.Value : this.Ship_PhoneNo) });
                SqlRecordParams.Add(new SqlParameter("@Ship_AlternateNo", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_AlternateNo) ? (object)DBNull.Value : this.Ship_AlternateNo) });
                SqlRecordParams.Add(new SqlParameter("@Ship_FaxNo", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_FaxNo) ? (object)DBNull.Value : this.Ship_FaxNo) });
                SqlRecordParams.Add(new SqlParameter("@Ship_ContactPerson", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_ContactPerson) ? (object)DBNull.Value : this.Ship_ContactPerson) });
                SqlRecordParams.Add(new SqlParameter("@Ship_Email", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_Email) ? (object)DBNull.Value : this.Ship_Email) });
                SqlRecordParams.Add(new SqlParameter("@Ship_Website", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_Website) ? (object)DBNull.Value : this.Ship_Website) });


                SqlRecordParams.Add(new SqlParameter("@InvAddSameAsPrimary", SqlDbType.Bit) { Value = ((string.Empty == this.InvAddSameAsPrimary) ? (object)DBNull.Value : Convert.ToBoolean(this.InvAddSameAsPrimary)) });
                SqlRecordParams.Add(new SqlParameter("@InvToName", SqlDbType.VarChar) { Value = ((string.Empty == this.InvToName) ? (object)DBNull.Value : this.InvToName) });
                SqlRecordParams.Add(new SqlParameter("@Inv_Address1", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_Address1) ? (object)DBNull.Value : this.Inv_Address1) });
                SqlRecordParams.Add(new SqlParameter("@Inv_Address2", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_Address2) ? (object)DBNull.Value : this.Inv_Address2) });
                SqlRecordParams.Add(new SqlParameter("@Inv_Pin", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_Pin) ? (object)DBNull.Value : this.Inv_Pin) });
                SqlRecordParams.Add(new SqlParameter("@Inv_City", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_City) ? (object)DBNull.Value : this.Inv_City) });
                SqlRecordParams.Add(new SqlParameter("@Inv_CountryCd", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_CountryCd) ? (object)DBNull.Value : this.Inv_CountryCd) });
                SqlRecordParams.Add(new SqlParameter("@Inv_StateCd", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_StateCd) ? (object)DBNull.Value : this.Inv_StateCd) });

                SqlRecordParams.Add(new SqlParameter("@InvAddSameAsShip", SqlDbType.Bit) { Value = ((string.Empty == this.InvAddSameAsShip) ? (object)DBNull.Value : Convert.ToBoolean(this.InvAddSameAsShip)) });
                SqlRecordParams.Add(new SqlParameter("@Inv_PhoneNo", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_PhoneNo) ? (object)DBNull.Value : this.Inv_PhoneNo) });
                SqlRecordParams.Add(new SqlParameter("@Inv_AlternateNo", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_AlternateNo) ? (object)DBNull.Value : this.Inv_AlternateNo) });
                SqlRecordParams.Add(new SqlParameter("@Inv_FaxNo", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_FaxNo) ? (object)DBNull.Value : this.Inv_FaxNo) });
                SqlRecordParams.Add(new SqlParameter("@Inv_ContactPerson", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_ContactPerson) ? (object)DBNull.Value : this.Inv_ContactPerson) });
                SqlRecordParams.Add(new SqlParameter("@Inv_Email", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_Email) ? (object)DBNull.Value : this.Inv_Email) });
                SqlRecordParams.Add(new SqlParameter("@Inv_Website", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_Website) ? (object)DBNull.Value : this.Inv_Website) });

                SqlRecordParams.Add(new SqlParameter("@TaxAcNo", SqlDbType.VarChar) { Value = ((string.Empty == this.TaxAcNo) ? (object)DBNull.Value : this.TaxAcNo) });
                SqlRecordParams.Add(new SqlParameter("@BusinessNatureCd", SqlDbType.VarChar) { Value = ((string.Empty == this.BusinessNatureCd) ? (object)DBNull.Value : this.BusinessNatureCd) });
                SqlRecordParams.Add(new SqlParameter("@GstRegdNo", SqlDbType.VarChar) { Value = ((string.Empty == this.GstRegdNo) ? (object)DBNull.Value : this.GstRegdNo) });
                SqlRecordParams.Add(new SqlParameter("@TaxExampNo", SqlDbType.VarChar) { Value = ((string.Empty == this.TaxExampNo) ? (object)DBNull.Value : this.TaxExampNo) });
                SqlRecordParams.Add(new SqlParameter("@SalesTaxGrpCd", SqlDbType.Int) { Value = ((string.Empty == this.SalesTaxGrpCd) ? (object)DBNull.Value : Convert.ToInt32(this.SalesTaxGrpCd)) });

                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this.CoCd) ? (object)DBNull.Value : this.CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });


                SqlRecordParams.Add(new SqlParameter("@dim1_Branch", SqlDbType.Bit) { Value = ((string.Empty == this.dim1_Branch) ? (object)DBNull.Value : Convert.ToBoolean(this.dim1_Branch)) });
                SqlRecordParams.Add(new SqlParameter("@dim1DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim1DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim1DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim2_Dept", SqlDbType.Bit) { Value = ((string.Empty == this.dim2_Dept) ? (object)DBNull.Value : Convert.ToBoolean(this.dim2_Dept)) });
                SqlRecordParams.Add(new SqlParameter("@dim2DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim2DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim2DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim3", SqlDbType.Bit) { Value = ((string.Empty == this.dim3) ? (object)DBNull.Value : Convert.ToBoolean(this.dim3)) });
                SqlRecordParams.Add(new SqlParameter("@dim3DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim3DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim3DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim4", SqlDbType.Bit) { Value = ((string.Empty == this.dim4) ? (object)DBNull.Value : Convert.ToBoolean(this.dim4)) });
                SqlRecordParams.Add(new SqlParameter("@dim4DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim4DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim4DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim5", SqlDbType.Bit) { Value = ((string.Empty == this.dim5) ? (object)DBNull.Value : Convert.ToBoolean(this.dim5)) });
                SqlRecordParams.Add(new SqlParameter("@dim5DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim5DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim5DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim6", SqlDbType.Bit) { Value = ((string.Empty == this.dim6) ? (object)DBNull.Value : Convert.ToBoolean(this.dim6)) });
                SqlRecordParams.Add(new SqlParameter("@dim6DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim6DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim6DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim7", SqlDbType.Bit) { Value = ((string.Empty == this.dim7) ? (object)DBNull.Value : Convert.ToBoolean(this.dim7)) });
                SqlRecordParams.Add(new SqlParameter("@dim7DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim7DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim7DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim8", SqlDbType.Bit) { Value = ((string.Empty == this.dim8) ? (object)DBNull.Value : Convert.ToBoolean(this.dim8)) });
                SqlRecordParams.Add(new SqlParameter("@dim8DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim8DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim8DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim9", SqlDbType.Bit) { Value = ((string.Empty == this.dim9) ? (object)DBNull.Value : Convert.ToBoolean(this.dim9)) });
                SqlRecordParams.Add(new SqlParameter("@dim9DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim9DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim9DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim10", SqlDbType.Bit) { Value = ((string.Empty == this.dim10) ? (object)DBNull.Value : Convert.ToBoolean(this.dim10)) });
                SqlRecordParams.Add(new SqlParameter("@dim10DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim10DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim10DefValue)) });


                ds = DataHelper.ExecuteDataset(str_ConnString, "customeroverview_operation", SqlRecordParams.ToArray());
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
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this.mode });
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this.RowId) ? (object)DBNull.Value : Int64.Parse(this.RowId)) });
                SqlRecordParams.Add(new SqlParameter("@CustCd", SqlDbType.VarChar) { Value = ((string.Empty == this.CustCd) ? (object)DBNull.Value : this.CustCd) });
                SqlRecordParams.Add(new SqlParameter("@CustName", SqlDbType.VarChar) { Value = ((string.Empty == this.CustName) ? (object)DBNull.Value : this.CustName) });
                SqlRecordParams.Add(new SqlParameter("@CustSearch", SqlDbType.VarChar) { Value = ((string.Empty == this.CustSearch) ? (object)DBNull.Value : this.CustSearch) });
                SqlRecordParams.Add(new SqlParameter("@CurrCd", SqlDbType.VarChar) { Value = ((string.Empty == this.CurrCd) ? (object)DBNull.Value : this.CurrCd) });
                SqlRecordParams.Add(new SqlParameter("@CrLimit", SqlDbType.Decimal) { Value = ((string.Empty == this.CrLimit) ? (object)DBNull.Value : Convert.ToDecimal(this.CrLimit)) });
                SqlRecordParams.Add(new SqlParameter("@CustGrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this.CustGrpCd) ? (object)DBNull.Value : this.CustGrpCd) });
                SqlRecordParams.Add(new SqlParameter("@IsForeignCust", SqlDbType.Bit) { Value = ((string.Empty == this.IsForeignCust) ? (object)DBNull.Value : Convert.ToBoolean(this.IsForeignCust)) });
                SqlRecordParams.Add(new SqlParameter("@GovtIdNo", SqlDbType.VarChar) { Value = ((string.Empty == this.GovtIdNo) ? (object)DBNull.Value : this.GovtIdNo) });
                SqlRecordParams.Add(new SqlParameter("@BranchCd", SqlDbType.VarChar) { Value = ((string.Empty == this.BranchCd) ? (object)DBNull.Value : this.BranchCd) });
                SqlRecordParams.Add(new SqlParameter("@EntityType", SqlDbType.VarChar) { Value = ((string.Empty == this.EntityType) ? (object)DBNull.Value : this.EntityType) });
                SqlRecordParams.Add(new SqlParameter("@PersonRespId", SqlDbType.BigInt) { Value = ((string.Empty == this.PersonRespId) ? (object)DBNull.Value : Int64.Parse(this.PersonRespId)) });
                SqlRecordParams.Add(new SqlParameter("@Block", SqlDbType.VarChar) { Value = ((string.Empty == this.Block) ? (object)DBNull.Value : this.Block) });


                SqlRecordParams.Add(new SqlParameter("@Address1", SqlDbType.VarChar) { Value = ((string.Empty == this.Address1) ? (object)DBNull.Value : this.Address1) });
                SqlRecordParams.Add(new SqlParameter("@Address2", SqlDbType.VarChar) { Value = ((string.Empty == this.Address2) ? (object)DBNull.Value : this.Address2) });
                SqlRecordParams.Add(new SqlParameter("@Pin", SqlDbType.VarChar) { Value = ((string.Empty == this.Pin) ? (object)DBNull.Value : this.Pin) });
                SqlRecordParams.Add(new SqlParameter("@City", SqlDbType.VarChar) { Value = ((string.Empty == this.City) ? (object)DBNull.Value : this.City) });
                SqlRecordParams.Add(new SqlParameter("@CountryCd", SqlDbType.VarChar) { Value = ((string.Empty == this.CountryCd) ? (object)DBNull.Value : this.CountryCd) });
                SqlRecordParams.Add(new SqlParameter("@StateCd", SqlDbType.VarChar) { Value = ((string.Empty == this.StateCd) ? (object)DBNull.Value : this.StateCd) });
                SqlRecordParams.Add(new SqlParameter("@PhoneNo", SqlDbType.VarChar) { Value = ((string.Empty == this.PhoneNo) ? (object)DBNull.Value : this.PhoneNo) });
                SqlRecordParams.Add(new SqlParameter("@AlternateNo", SqlDbType.VarChar) { Value = ((string.Empty == this.AlternateNo) ? (object)DBNull.Value : this.AlternateNo) });
                SqlRecordParams.Add(new SqlParameter("@FaxNo", SqlDbType.VarChar) { Value = ((string.Empty == this.FaxNo) ? (object)DBNull.Value : this.FaxNo) });
                SqlRecordParams.Add(new SqlParameter("@ContactPerson", SqlDbType.VarChar) { Value = ((string.Empty == this.ContactPerson) ? (object)DBNull.Value : this.ContactPerson) });
                SqlRecordParams.Add(new SqlParameter("@Email", SqlDbType.VarChar) { Value = ((string.Empty == this.Email) ? (object)DBNull.Value : this.Email) });
                SqlRecordParams.Add(new SqlParameter("@Website", SqlDbType.VarChar) { Value = ((string.Empty == this.Website) ? (object)DBNull.Value : this.Website) });


                SqlRecordParams.Add(new SqlParameter("@BillToCust", SqlDbType.VarChar) { Value = ((string.Empty == this.BillToCust) ? (object)DBNull.Value : this.BillToCust) });
                SqlRecordParams.Add(new SqlParameter("@PrePmtPer", SqlDbType.Decimal) { Value = ((string.Empty == this.PrePmtPer) ? (object)DBNull.Value : Convert.ToDecimal(this.PrePmtPer)) });
                SqlRecordParams.Add(new SqlParameter("@PmtTermsCd", SqlDbType.VarChar) { Value = ((string.Empty == this.PmtTermsCd) ? (object)DBNull.Value : this.PmtTermsCd) });
                SqlRecordParams.Add(new SqlParameter("@PmtMethodCd", SqlDbType.VarChar) { Value = ((string.Empty == this.PmtMethodCd) ? (object)DBNull.Value : this.PmtMethodCd) });
                SqlRecordParams.Add(new SqlParameter("@FinChgTermCd", SqlDbType.VarChar) { Value = ((string.Empty == this.FinChgTermCd) ? (object)DBNull.Value : this.FinChgTermCd) });
                SqlRecordParams.Add(new SqlParameter("@DiscTollerancePer", SqlDbType.Decimal) { Value = ((string.Empty == this.DiscTollerancePer) ? (object)DBNull.Value : Convert.ToDecimal(this.DiscTollerancePer)) });
                SqlRecordParams.Add(new SqlParameter("@PriceIncludeST", SqlDbType.Bit) { Value = ((string.Empty == this.PriceIncludeST) ? (object)DBNull.Value : Convert.ToBoolean(this.PriceIncludeST)) });

                SqlRecordParams.Add(new SqlParameter("@ShipMethodCd", SqlDbType.VarChar) { Value = ((string.Empty == this.ShipMethodCd) ? (object)DBNull.Value : this.ShipMethodCd) });
                SqlRecordParams.Add(new SqlParameter("@LeadTimeInDay", SqlDbType.Int) { Value = ((string.Empty == this.LeadTimeInDay) ? (object)DBNull.Value : Convert.ToInt32(this.LeadTimeInDay)) });
                SqlRecordParams.Add(new SqlParameter("@Reserve", SqlDbType.VarChar) { Value = ((string.Empty == this.Reserve) ? (object)DBNull.Value : this.Reserve) });
                SqlRecordParams.Add(new SqlParameter("@ShipAddSameAsPrimary", SqlDbType.Bit) { Value = ((string.Empty == this.ShipAddSameAsPrimary) ? (object)DBNull.Value : Convert.ToBoolean(this.ShipAddSameAsPrimary)) });

                SqlRecordParams.Add(new SqlParameter("@ShipToName", SqlDbType.VarChar) { Value = ((string.Empty == this.ShipToName) ? (object)DBNull.Value : this.ShipToName) });
                SqlRecordParams.Add(new SqlParameter("@Ship_Address1", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_Address1) ? (object)DBNull.Value : this.Ship_Address1) });
                SqlRecordParams.Add(new SqlParameter("@Ship_Address2", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_Address2) ? (object)DBNull.Value : this.Ship_Address2) });
                SqlRecordParams.Add(new SqlParameter("@Ship_Pin", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_Pin) ? (object)DBNull.Value : this.Ship_Pin) });
                SqlRecordParams.Add(new SqlParameter("@Ship_City", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_City) ? (object)DBNull.Value : this.Ship_City) });
                SqlRecordParams.Add(new SqlParameter("@Ship_CountryCd", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_CountryCd) ? (object)DBNull.Value : this.Ship_CountryCd) });
                SqlRecordParams.Add(new SqlParameter("@Ship_StateCd", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_StateCd) ? (object)DBNull.Value : this.Ship_StateCd) });

                SqlRecordParams.Add(new SqlParameter("@Ship_PhoneNo", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_PhoneNo) ? (object)DBNull.Value : this.Ship_PhoneNo) });
                SqlRecordParams.Add(new SqlParameter("@Ship_AlternateNo", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_AlternateNo) ? (object)DBNull.Value : this.Ship_AlternateNo) });
                SqlRecordParams.Add(new SqlParameter("@Ship_FaxNo", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_FaxNo) ? (object)DBNull.Value : this.Ship_FaxNo) });
                SqlRecordParams.Add(new SqlParameter("@Ship_ContactPerson", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_ContactPerson) ? (object)DBNull.Value : this.Ship_ContactPerson) });
                SqlRecordParams.Add(new SqlParameter("@Ship_Email", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_Email) ? (object)DBNull.Value : this.Ship_Email) });
                SqlRecordParams.Add(new SqlParameter("@Ship_Website", SqlDbType.VarChar) { Value = ((string.Empty == this.Ship_Website) ? (object)DBNull.Value : this.Ship_Website) });


                SqlRecordParams.Add(new SqlParameter("@InvAddSameAsPrimary", SqlDbType.Bit) { Value = ((string.Empty == this.InvAddSameAsPrimary) ? (object)DBNull.Value : Convert.ToBoolean(this.InvAddSameAsPrimary)) });
                SqlRecordParams.Add(new SqlParameter("@InvToName", SqlDbType.VarChar) { Value = ((string.Empty == this.InvToName) ? (object)DBNull.Value : this.InvToName) });
                SqlRecordParams.Add(new SqlParameter("@Inv_Address1", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_Address1) ? (object)DBNull.Value : this.Inv_Address1) });
                SqlRecordParams.Add(new SqlParameter("@Inv_Address2", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_Address2) ? (object)DBNull.Value : this.Inv_Address2) });
                SqlRecordParams.Add(new SqlParameter("@Inv_Pin", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_Pin) ? (object)DBNull.Value : this.Inv_Pin) });
                SqlRecordParams.Add(new SqlParameter("@Inv_City", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_City) ? (object)DBNull.Value : this.Inv_City) });
                SqlRecordParams.Add(new SqlParameter("@Inv_CountryCd", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_CountryCd) ? (object)DBNull.Value : this.Inv_CountryCd) });
                SqlRecordParams.Add(new SqlParameter("@Inv_StateCd", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_StateCd) ? (object)DBNull.Value : this.Inv_StateCd) });

                SqlRecordParams.Add(new SqlParameter("@InvAddSameAsShip", SqlDbType.Bit) { Value = ((string.Empty == this.InvAddSameAsShip) ? (object)DBNull.Value : Convert.ToBoolean(this.InvAddSameAsShip)) });
                SqlRecordParams.Add(new SqlParameter("@Inv_PhoneNo", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_PhoneNo) ? (object)DBNull.Value : this.Inv_PhoneNo) });
                SqlRecordParams.Add(new SqlParameter("@Inv_AlternateNo", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_AlternateNo) ? (object)DBNull.Value : this.Inv_AlternateNo) });
                SqlRecordParams.Add(new SqlParameter("@Inv_FaxNo", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_FaxNo) ? (object)DBNull.Value : this.Inv_FaxNo) });
                SqlRecordParams.Add(new SqlParameter("@Inv_ContactPerson", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_ContactPerson) ? (object)DBNull.Value : this.Inv_ContactPerson) });
                SqlRecordParams.Add(new SqlParameter("@Inv_Email", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_Email) ? (object)DBNull.Value : this.Inv_Email) });
                SqlRecordParams.Add(new SqlParameter("@Inv_Website", SqlDbType.VarChar) { Value = ((string.Empty == this.Inv_Website) ? (object)DBNull.Value : this.Inv_Website) });

                SqlRecordParams.Add(new SqlParameter("@TaxAcNo", SqlDbType.VarChar) { Value = ((string.Empty == this.TaxAcNo) ? (object)DBNull.Value : this.TaxAcNo) });
                SqlRecordParams.Add(new SqlParameter("@BusinessNatureCd", SqlDbType.VarChar) { Value = ((string.Empty == this.BusinessNatureCd) ? (object)DBNull.Value : this.BusinessNatureCd) });
                SqlRecordParams.Add(new SqlParameter("@GstRegdNo", SqlDbType.VarChar) { Value = ((string.Empty == this.GstRegdNo) ? (object)DBNull.Value : this.GstRegdNo) });
                SqlRecordParams.Add(new SqlParameter("@TaxExampNo", SqlDbType.VarChar) { Value = ((string.Empty == this.TaxExampNo) ? (object)DBNull.Value : this.TaxExampNo) });
                SqlRecordParams.Add(new SqlParameter("@SalesTaxGrpCd", SqlDbType.Int) { Value = ((string.Empty == this.SalesTaxGrpCd) ? (object)DBNull.Value : Convert.ToInt32(this.SalesTaxGrpCd)) });

                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this.CoCd) ? (object)DBNull.Value : this.CoCd) });
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });


                SqlRecordParams.Add(new SqlParameter("@dim1_Branch", SqlDbType.Bit) { Value = ((string.Empty == this.dim1_Branch) ? (object)DBNull.Value : Convert.ToBoolean(this.dim1_Branch)) });
                SqlRecordParams.Add(new SqlParameter("@dim1DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim1DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim1DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim2_Dept", SqlDbType.Bit) { Value = ((string.Empty == this.dim2_Dept) ? (object)DBNull.Value : Convert.ToBoolean(this.dim2_Dept)) });
                SqlRecordParams.Add(new SqlParameter("@dim2DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim2DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim2DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim3", SqlDbType.Bit) { Value = ((string.Empty == this.dim3) ? (object)DBNull.Value : Convert.ToBoolean(this.dim3)) });
                SqlRecordParams.Add(new SqlParameter("@dim3DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim3DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim3DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim4", SqlDbType.Bit) { Value = ((string.Empty == this.dim4) ? (object)DBNull.Value : Convert.ToBoolean(this.dim4)) });
                SqlRecordParams.Add(new SqlParameter("@dim4DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim4DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim4DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim5", SqlDbType.Bit) { Value = ((string.Empty == this.dim5) ? (object)DBNull.Value : Convert.ToBoolean(this.dim5)) });
                SqlRecordParams.Add(new SqlParameter("@dim5DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim5DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim5DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim6", SqlDbType.Bit) { Value = ((string.Empty == this.dim6) ? (object)DBNull.Value : Convert.ToBoolean(this.dim6)) });
                SqlRecordParams.Add(new SqlParameter("@dim6DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim6DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim6DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim7", SqlDbType.Bit) { Value = ((string.Empty == this.dim7) ? (object)DBNull.Value : Convert.ToBoolean(this.dim7)) });
                SqlRecordParams.Add(new SqlParameter("@dim7DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim7DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim7DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim8", SqlDbType.Bit) { Value = ((string.Empty == this.dim8) ? (object)DBNull.Value : Convert.ToBoolean(this.dim8)) });
                SqlRecordParams.Add(new SqlParameter("@dim8DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim8DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim8DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim9", SqlDbType.Bit) { Value = ((string.Empty == this.dim9) ? (object)DBNull.Value : Convert.ToBoolean(this.dim9)) });
                SqlRecordParams.Add(new SqlParameter("@dim9DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim9DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim9DefValue)) });
                SqlRecordParams.Add(new SqlParameter("@dim10", SqlDbType.Bit) { Value = ((string.Empty == this.dim10) ? (object)DBNull.Value : Convert.ToBoolean(this.dim10)) });
                SqlRecordParams.Add(new SqlParameter("@dim10DefValue", SqlDbType.Int) { Value = ((string.Empty == this.dim10DefValue) ? (object)DBNull.Value : Convert.ToInt32(this.dim10DefValue)) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "customeroverview_operation", SqlRecordParams.ToArray()).Tables[0];

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
