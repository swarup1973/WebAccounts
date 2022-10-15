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
    public class FixedAssetMaster
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;

        public string _FACode = string.Empty;
        public string _FADesc = string.Empty;
        public string _FASearchName = string.Empty;
        public string _EmpRespId = string.Empty;
        public string _LastDepDt = string.Empty;
        public string _FALocId = string.Empty;
        public string _IsBlock = string.Empty;
        public string _IsInactive = string.Empty;
        public Byte[] _FAPic = null;
        public string _UomId = string.Empty;
        public string _Make = string.Empty;
        public string _Model = string.Empty;
        public string _SerialNo = string.Empty;
        public string _ModelYear = string.Empty;
        public string _DtOfMfg = string.Empty;
        public string _MaintVendorId = string.Empty;
        public string _PlanedServcDt = string.Empty;
        public string _NextServcDt = string.Empty;
        public string _WarrantyPeriod = string.Empty;
        public string _Insured = string.Empty;
        public string _InsurenceVendor = string.Empty;
        public string _InsurenceDueDt = string.Empty;
        public string _ValueInsured = string.Empty;
        public string _PolicyNo = string.Empty;
        public string _PolicyExpDt = string.Empty;
        public string _FATypeId = string.Empty;
        public string _FASubType = string.Empty;
        public string _FAPostingGrpId = string.Empty;
        public string _TaxGrpId = string.Empty;

        public DataTable _profiledata;

        public string _profilexml = string.Empty;

        public string _CoCd = string.Empty;
        public string _created_by = string.Empty;
        public string _creator_MAC_add = string.Empty;
        public bool _deletedimage = false;

        public byte[] pic_bytes;



        public DataTable emptytable()
        {
            DataTable dt_empty = new DataTable();

            #region (column add)

            dt_empty.Columns.Add("RowId", Type.GetType("System.Int16"));
            dt_empty.Columns.Add("FAId", Type.GetType("System.Int16"));
            dt_empty.Columns.Add("FAId_name", Type.GetType("System.String"));
            dt_empty.Columns.Add("DepnBookId", Type.GetType("System.Int16"));
            dt_empty.Columns.Add("DepnBookId_name", Type.GetType("System.String"));
            dt_empty.Columns.Add("DepnMethod", Type.GetType("System.String"));
            dt_empty.Columns.Add("DepnMethod_name", Type.GetType("System.String"));
            dt_empty.Columns.Add("DepnStFrom", Type.GetType("System.DateTime"));
            dt_empty.Columns.Add("DepnStFrom_txt", Type.GetType("System.String"));
            dt_empty.Columns.Add("DepnEndOn", Type.GetType("System.DateTime"));
            dt_empty.Columns.Add("DepnEndOn_txt", Type.GetType("System.String"));
            dt_empty.Columns.Add("SelfLife", Type.GetType("System.Decimal"));
            dt_empty.Columns.Add("DepnPer", Type.GetType("System.Decimal"));
            dt_empty.Columns.Add("BookValue", Type.GetType("System.Decimal"));
            dt_empty.Columns.Add("SalvageValue", Type.GetType("System.Decimal"));
            dt_empty.Columns.Add("BookValueAfterFullDepn", Type.GetType("System.Decimal"));
            dt_empty.Columns.Add("DepnFrequency", Type.GetType("System.Boolean"));
            dt_empty.Columns.Add("DepnFrequency_txt", Type.GetType("System.String"));
            dt_empty.Columns.Add("DepnCalc", Type.GetType("System.Boolean"));
            dt_empty.Columns.Add("DepnCalc_txt", Type.GetType("System.String"));
            dt_empty.Columns.Add("type", Type.GetType("System.String"));

            #endregion

            return dt_empty;
        }

        public string ConvertDatatableToXML(DataTable dt)
        {
            MemoryStream str = new MemoryStream();
            dt.WriteXml(str, true);
            str.Seek(0, SeekOrigin.Begin);
            StreamReader sr = new StreamReader(str);
            string xmlstring = "";
            xmlstring = sr.ReadToEnd();
            return (xmlstring);
        }

        public static string ToStringAsXml(DataTable dt)
        {
            StringWriter sw = new StringWriter();
            dt.WriteXml(sw, XmlWriteMode.IgnoreSchema);
            string s = sw.ToString();
            return s;

        }

        public DataSet getLookup(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "assetsetup_lookup", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[fixedAsset.cs:getLookup]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@FACode", SqlDbType.NVarChar) { Value = this._FACode });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@FADesc", SqlDbType.NVarChar) { Value = this._FADesc });
                SqlRecordParams.Add(new SqlParameter("@FASearchName", SqlDbType.NVarChar) { Value = this._FASearchName });
                SqlRecordParams.Add(new SqlParameter("@EmpRespId", SqlDbType.BigInt) { Value = ((string.Empty == this._EmpRespId) ? (object)DBNull.Value : Int64.Parse(this._EmpRespId)) });
                SqlRecordParams.Add(new SqlParameter("@LastDepDt", SqlDbType.Date) { Value = ((string.Empty == this._LastDepDt) ? (object)DBNull.Value : this._LastDepDt) });
                SqlRecordParams.Add(new SqlParameter("@FALocId", SqlDbType.Int) { Value = ((string.Empty == this._FALocId) ? (object)DBNull.Value : int.Parse(this._FALocId)) });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@IsInactive", SqlDbType.Bit) { Value = ((string.Empty == this._IsInactive) ? (object)DBNull.Value : Convert.ToBoolean(this._IsInactive)) });
                SqlRecordParams.Add(new SqlParameter("@FAPic", SqlDbType.VarBinary) { Value = this._FAPic });
                SqlRecordParams.Add(new SqlParameter("@UomId", SqlDbType.BigInt) { Value = ((string.Empty == this._UomId) ? (object)DBNull.Value : Int64.Parse(this._UomId)) });
                SqlRecordParams.Add(new SqlParameter("@Make", SqlDbType.NVarChar) { Value = this._Make });
                SqlRecordParams.Add(new SqlParameter("@Model", SqlDbType.VarChar) { Value = ((string.Empty == this._Model) ? (object)DBNull.Value : this._Model) });
                SqlRecordParams.Add(new SqlParameter("@SerialNo", SqlDbType.NVarChar) { Value = this._SerialNo });
                SqlRecordParams.Add(new SqlParameter("@ModelYear", SqlDbType.NVarChar) { Value = this._ModelYear });
                SqlRecordParams.Add(new SqlParameter("@DtOfMfg", SqlDbType.Date) { Value = ((string.Empty == this._DtOfMfg) ? (object)DBNull.Value : this._DtOfMfg) });
                SqlRecordParams.Add(new SqlParameter("@MaintVendorId", SqlDbType.BigInt) { Value = ((string.Empty == this._MaintVendorId) ? (object)DBNull.Value : Int64.Parse(this._MaintVendorId)) });
                SqlRecordParams.Add(new SqlParameter("@PlanedServcDt", SqlDbType.Date) { Value = ((string.Empty == this._PlanedServcDt) ? (object)DBNull.Value : this._PlanedServcDt) });
                SqlRecordParams.Add(new SqlParameter("@NextServcDt", SqlDbType.Date) { Value = ((string.Empty == this._NextServcDt) ? (object)DBNull.Value : this._NextServcDt) });
                SqlRecordParams.Add(new SqlParameter("@WarrantyPeriod", SqlDbType.Date) { Value = ((string.Empty == this._WarrantyPeriod) ? (object)DBNull.Value : this._WarrantyPeriod) });
                SqlRecordParams.Add(new SqlParameter("@Insured", SqlDbType.Bit) { Value = ((string.Empty == this._Insured) ? (object)DBNull.Value : Convert.ToBoolean(this._Insured)) });
                SqlRecordParams.Add(new SqlParameter("@InsurenceVendor", SqlDbType.VarChar) { Value = ((string.Empty == this._InsurenceVendor) ? (object)DBNull.Value : this._InsurenceVendor) });
                SqlRecordParams.Add(new SqlParameter("@InsurenceDueDt", SqlDbType.Date) { Value = ((string.Empty == this._InsurenceDueDt) ? (object)DBNull.Value : this._InsurenceDueDt) });
                SqlRecordParams.Add(new SqlParameter("@ValueInsured", SqlDbType.Decimal) { Value = ((string.Empty == this._ValueInsured) ? (object)DBNull.Value : Convert.ToDecimal(this._ValueInsured)) });
                SqlRecordParams.Add(new SqlParameter("@PolicyNor", SqlDbType.VarChar) { Value = ((string.Empty == this._PolicyNo) ? (object)DBNull.Value : this._PolicyNo) });
                SqlRecordParams.Add(new SqlParameter("@PolicyExpDt", SqlDbType.Date) { Value = ((string.Empty == this._PolicyExpDt) ? (object)DBNull.Value : this._PolicyExpDt) });
                SqlRecordParams.Add(new SqlParameter("@FATypeId", SqlDbType.Int) { Value = ((string.Empty == this._FATypeId) ? (object)DBNull.Value : int.Parse(this._FATypeId)) });
                SqlRecordParams.Add(new SqlParameter("@FASubType", SqlDbType.Int) { Value = ((string.Empty == this._FASubType) ? (object)DBNull.Value : int.Parse(this._FASubType)) });
                SqlRecordParams.Add(new SqlParameter("@FAPostingGrpId", SqlDbType.BigInt) { Value = ((string.Empty == this._FAPostingGrpId) ? (object)DBNull.Value : Int64.Parse(this._FAPostingGrpId)) });
                SqlRecordParams.Add(new SqlParameter("@TaxGrpId", SqlDbType.Int) { Value = ((string.Empty == this._TaxGrpId) ? (object)DBNull.Value : int.Parse(this._TaxGrpId)) });
              
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });
                //SqlRecordParams.Add(new SqlParameter("@profiledata", System.Data.SqlDbType.Structured) { Value = _profiledata });
                SqlRecordParams.Add(new SqlParameter("@profile_xml", SqlDbType.NVarChar) { Value = this._profilexml });
                SqlRecordParams.Add(new SqlParameter("@deletedimage", SqlDbType.Bit) { Value = this._deletedimage });

                
                ds = DataHelper.ExecuteDataset(str_ConnString, "FixedAssetMaster_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[fixedassetmaster.cs:Operation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@FACode", SqlDbType.NVarChar) { Value = this._FACode });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._CoCd) ? (object)DBNull.Value : this._CoCd) });
                SqlRecordParams.Add(new SqlParameter("@FADesc", SqlDbType.NVarChar) { Value = this._FADesc });
                SqlRecordParams.Add(new SqlParameter("@FASearchName", SqlDbType.NVarChar) { Value = this._FASearchName });
                SqlRecordParams.Add(new SqlParameter("@EmpRespId", SqlDbType.BigInt) { Value = ((string.Empty == this._EmpRespId) ? (object)DBNull.Value : Int64.Parse(this._EmpRespId)) });
                SqlRecordParams.Add(new SqlParameter("@LastDepDt", SqlDbType.Date) { Value = ((string.Empty == this._LastDepDt) ? (object)DBNull.Value : this._LastDepDt) });
                SqlRecordParams.Add(new SqlParameter("@FALocId", SqlDbType.Int) { Value = ((string.Empty == this._FALocId) ? (object)DBNull.Value : int.Parse(this._FALocId)) });
                SqlRecordParams.Add(new SqlParameter("@IsBlock", SqlDbType.Bit) { Value = ((string.Empty == this._IsBlock) ? (object)DBNull.Value : Convert.ToBoolean(this._IsBlock)) });
                SqlRecordParams.Add(new SqlParameter("@IsInactive", SqlDbType.Bit) { Value = ((string.Empty == this._IsInactive) ? (object)DBNull.Value : Convert.ToBoolean(this._IsInactive)) });
                SqlRecordParams.Add(new SqlParameter("@FAPic", SqlDbType.VarBinary) { Value = this._FAPic });
                SqlRecordParams.Add(new SqlParameter("@UomId", SqlDbType.BigInt) { Value = ((string.Empty == this._UomId) ? (object)DBNull.Value : Int64.Parse(this._UomId)) });
                SqlRecordParams.Add(new SqlParameter("@Make", SqlDbType.NVarChar) { Value = this._Make });
                SqlRecordParams.Add(new SqlParameter("@Model", SqlDbType.VarChar) { Value = ((string.Empty == this._Model) ? (object)DBNull.Value : this._Model) });
                SqlRecordParams.Add(new SqlParameter("@SerialNo", SqlDbType.NVarChar) { Value = this._SerialNo });
                SqlRecordParams.Add(new SqlParameter("@ModelYear", SqlDbType.NVarChar) { Value = this._ModelYear });
                SqlRecordParams.Add(new SqlParameter("@DtOfMfg", SqlDbType.Date) { Value = ((string.Empty == this._DtOfMfg) ? (object)DBNull.Value : this._DtOfMfg) });
                SqlRecordParams.Add(new SqlParameter("@MaintVendorId", SqlDbType.BigInt) { Value = ((string.Empty == this._MaintVendorId) ? (object)DBNull.Value : Int64.Parse(this._MaintVendorId)) });
                SqlRecordParams.Add(new SqlParameter("@PlanedServcDt", SqlDbType.Date) { Value = ((string.Empty == this._PlanedServcDt) ? (object)DBNull.Value : this._PlanedServcDt) });
                SqlRecordParams.Add(new SqlParameter("@NextServcDt", SqlDbType.Date) { Value = ((string.Empty == this._NextServcDt) ? (object)DBNull.Value : this._NextServcDt) });
                SqlRecordParams.Add(new SqlParameter("@WarrantyPeriod", SqlDbType.Date) { Value = ((string.Empty == this._WarrantyPeriod) ? (object)DBNull.Value : this._WarrantyPeriod) });
                SqlRecordParams.Add(new SqlParameter("@Insured", SqlDbType.Bit) { Value = ((string.Empty == this._Insured) ? (object)DBNull.Value : Convert.ToBoolean(this._Insured)) });
                SqlRecordParams.Add(new SqlParameter("@InsurenceVendor", SqlDbType.VarChar) { Value = ((string.Empty == this._InsurenceVendor) ? (object)DBNull.Value : this._InsurenceVendor) });
                SqlRecordParams.Add(new SqlParameter("@InsurenceDueDt", SqlDbType.Date) { Value = ((string.Empty == this._InsurenceDueDt) ? (object)DBNull.Value : this._InsurenceDueDt) });
                SqlRecordParams.Add(new SqlParameter("@ValueInsured", SqlDbType.Decimal) { Value = ((string.Empty == this._ValueInsured) ? (object)DBNull.Value : Convert.ToDecimal(this._ValueInsured)) });
                SqlRecordParams.Add(new SqlParameter("@PolicyNor", SqlDbType.VarChar) { Value = ((string.Empty == this._PolicyNo) ? (object)DBNull.Value : this._PolicyNo) });
                SqlRecordParams.Add(new SqlParameter("@PolicyExpDt", SqlDbType.Date) { Value = ((string.Empty == this._PolicyExpDt) ? (object)DBNull.Value : this._PolicyExpDt) });
                SqlRecordParams.Add(new SqlParameter("@FATypeId", SqlDbType.Int) { Value = ((string.Empty == this._FATypeId) ? (object)DBNull.Value : int.Parse(this._FATypeId)) });
                SqlRecordParams.Add(new SqlParameter("@FASubType", SqlDbType.Int) { Value = ((string.Empty == this._FASubType) ? (object)DBNull.Value : int.Parse(this._FASubType)) });
                SqlRecordParams.Add(new SqlParameter("@FAPostingGrpId", SqlDbType.BigInt) { Value = ((string.Empty == this._FAPostingGrpId) ? (object)DBNull.Value : Int64.Parse(this._FAPostingGrpId)) });
                SqlRecordParams.Add(new SqlParameter("@TaxGrpId", SqlDbType.Int) { Value = ((string.Empty == this._TaxGrpId) ? (object)DBNull.Value : int.Parse(this._TaxGrpId)) });

                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._created_by) ? (object)DBNull.Value : (object)Guid.Parse(this._created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                SqlRecordParams.Add(new SqlParameter("@profile_xml", SqlDbType.NVarChar) { Value = this._profilexml });
                SqlRecordParams.Add(new SqlParameter("@deletedimage", SqlDbType.Bit) { Value = this._deletedimage });

                dt = DataHelper.ExecuteDataset(str_ConnString, "FixedAssetMaster_operation", SqlRecordParams.ToArray()).Tables[0];

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

        public bool saveImage(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;
            //SqlParameter[] SqlRecordParams = new SqlParameter[2];
            //SqlRecordParams[0] = new SqlParameter("@p_id", SqlDbType.BigInt);
            //SqlRecordParams[1] = new SqlParameter("@p_FAPic", SqlDbType.VarBinary);

            List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
            SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
            SqlRecordParams.Add(new SqlParameter("@p_FAPic", SqlDbType.VarBinary) { Value = pic_bytes });


            try
            {
                //SqlRecordParams[0].Value = Int64.Parse(this._rowid);
                //SqlRecordParams[1].Value = pic_bytes;
                
                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "FixedAssetMaster_picupload", SqlRecordParams.ToArray());
                ok = true;
            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[User.cs:saveUserDetails]" + expErr.Message;
            }
            finally { }
            return ok;

        }

    }
}
