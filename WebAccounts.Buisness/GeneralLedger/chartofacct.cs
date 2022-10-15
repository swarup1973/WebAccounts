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
    public class Chartofacct
    {
        public string _AcId = string.Empty;
        public string _AcCd = string.Empty;
        public string _AcDesc = string.Empty;
        public string _AcSrcDesc = string.Empty;
        public string _AcAlias = string.Empty;
        public string _AcTypeCd = string.Empty;
        public string _grpCd = string.Empty;
        public string _grpRangeFrom = string.Empty;
        public string _grpRangeTo = string.Empty;
        public bool _IsDirectPosting = false;
        public bool _IsBlockPosting = false;
        public string _LedCatId = string.Empty;
        public string _dimType = string.Empty;
        public bool _dim1_Branch = false;
        public string _dim1DefValue = string.Empty;
        public bool _dim2_Dept = false;
        public string _dim2DefValue = string.Empty;
        public bool _dim3 = false;
        public string _dim3DefValue = string.Empty;
        public bool _dim4 = false;
        public string _dim4DefValue = string.Empty;
        public bool _dim5 = false;
        public string _dim5DefValue = string.Empty;
        public bool _dim6 = false;
        public string _dim6DefValue = string.Empty;
        public bool _dim7 = false;
        public string _dim7DefValue = string.Empty;
        public bool _dim8 = false;
        public string _dim8DefValue = string.Empty;
        public bool _dim9 = false;
        public string _dim9DefValue = string.Empty;
        public bool _dim10 = false;
        public string _dim10DefValue = string.Empty;
        public string _dimSetCode = string.Empty;
        public bool _enabled = false;
        public string _editor_MAC_add = string.Empty;
        public string _userid = string.Empty;
        public string _finyr = string.Empty;
        public string _cocd { get; set; }

        public DataSet getLookupdata(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            //SqlParameter[] SqlRecordParams = new SqlParameter[0];
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });
                ds = DataHelper.ExecuteDataset(str_ConnString, "co_get_lookup_chartofacct", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[chatofacct.cs:getDimensionSetList]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getchatofacctlistlist(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            //SqlParameter[] SqlRecordParams = new SqlParameter[0];
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd});
                ds = DataHelper.ExecuteDataset(str_ConnString, "co_get_fa_AccMaster", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[chatofacct.cs:getchatofacctlistlist]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool checkacccode(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_acId", SqlDbType.BigInt) { Value = ((string.Empty == this._AcId) ? (object)DBNull.Value : (object)Int64.Parse(this._AcId)) });
                SqlRecordParams.Add(new SqlParameter("@p_accd", SqlDbType.NVarChar) { Value = this._AcCd });

                dt = DataHelper.ExecuteDataset(str_ConnString, "co_checkaccode", SqlRecordParams.ToArray()).Tables[0];
                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[chatofacct.cs:checkacccode]" + expErr.Message;
            }
            finally { }
            return isexist;
        }

        public string saveChartofacct(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;
            DataTable dt = null;
            string _ret =string.Empty;
            List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
            SqlRecordParams.Add(new SqlParameter("@p_AcId", System.Data.SqlDbType.BigInt) { Value = ((string.Empty == this._AcId) ? (object)DBNull.Value : (object)Int64.Parse(this._AcId)) });
            SqlRecordParams.Add(new SqlParameter("@p_AcCd", System.Data.SqlDbType.NVarChar) { Value = ((string.Empty == this._AcCd) ? (object)DBNull.Value : this._AcCd) });
            SqlRecordParams.Add(new SqlParameter("@p_AcDesc", System.Data.SqlDbType.NVarChar) { Value = ((string.Empty == this._AcDesc) ? this._AcCd : this._AcDesc) });
            SqlRecordParams.Add(new SqlParameter("@p_AcSrcDesc", System.Data.SqlDbType.NVarChar) { Value = ((string.Empty == this._AcSrcDesc) ? (object)DBNull.Value : this._AcSrcDesc) });
            SqlRecordParams.Add(new SqlParameter("@p_AcAlias", System.Data.SqlDbType.NVarChar) { Value = ((string.Empty == this._AcAlias) ? (object)DBNull.Value : this._AcAlias) });
            SqlRecordParams.Add(new SqlParameter("@p_AcTypeCd", System.Data.SqlDbType.NVarChar) { Value = ((string.Empty == this._AcTypeCd) ? (object)DBNull.Value : this._AcTypeCd) });
            SqlRecordParams.Add(new SqlParameter("@p_grpCd", System.Data.SqlDbType.NVarChar) { Value = ((string.Empty == this._grpCd) ? (object)DBNull.Value : this._grpCd) });
            SqlRecordParams.Add(new SqlParameter("@p_grpRangeFrom", System.Data.SqlDbType.NVarChar) { Value = ((string.Empty == this._grpRangeFrom) ? (object)DBNull.Value : this._grpRangeFrom) });
            SqlRecordParams.Add(new SqlParameter("@p_grpRangeTo", System.Data.SqlDbType.NVarChar) { Value = ((string.Empty == this._grpRangeTo) ? (object)DBNull.Value : this._grpRangeTo) });
            SqlRecordParams.Add(new SqlParameter("@p_IsDirectPosting", System.Data.SqlDbType.Int) { Value = _IsDirectPosting });
            SqlRecordParams.Add(new SqlParameter("@p_IsBlockPosting", System.Data.SqlDbType.Bit) { Value = _IsBlockPosting });
            SqlRecordParams.Add(new SqlParameter("@p_LedCatId", System.Data.SqlDbType.Int) { Value = ((string.Empty == this._LedCatId) ? (object)DBNull.Value : (object)int.Parse(this._LedCatId)) });
            SqlRecordParams.Add(new SqlParameter("@p_dimType", System.Data.SqlDbType.NVarChar) { Value = ((string.Empty == this._dimType) ? "D" : this._dimType) });
            SqlRecordParams.Add(new SqlParameter("@p_dim1_Branch", System.Data.SqlDbType.Bit) { Value = _dim1_Branch });
            SqlRecordParams.Add(new SqlParameter("@p_dim1DefValue", System.Data.SqlDbType.Int) { Value = ((string.Empty == this._dim1DefValue) ? (object)DBNull.Value : (object)int.Parse(this._dim1DefValue)) });
            SqlRecordParams.Add(new SqlParameter("@p_dim2_Dept", System.Data.SqlDbType.Bit) { Value = this._dim2_Dept });
            SqlRecordParams.Add(new SqlParameter("@p_dim2DefValue", System.Data.SqlDbType.Int) { Value = ((string.Empty == this._dim2DefValue) ? (object)DBNull.Value : (object)int.Parse(this._dim2DefValue)) });
            SqlRecordParams.Add(new SqlParameter("@p_dim3", System.Data.SqlDbType.Bit) { Value = this._dim3 });
            SqlRecordParams.Add(new SqlParameter("@p_dim3DefValue", System.Data.SqlDbType.Int) { Value = ((string.Empty == this._dim3DefValue) ? (object)DBNull.Value : (object)int.Parse(this._dim3DefValue)) });
            SqlRecordParams.Add(new SqlParameter("@p_dim4", System.Data.SqlDbType.Bit) { Value = this._dim4 });
            SqlRecordParams.Add(new SqlParameter("@p_dim4DefValue", System.Data.SqlDbType.Int) { Value = ((string.Empty == this._dim4DefValue) ? (object)DBNull.Value : (object)int.Parse(this._dim4DefValue)) });
            SqlRecordParams.Add(new SqlParameter("@p_dim5", System.Data.SqlDbType.Bit) { Value = this._dim5 });
            SqlRecordParams.Add(new SqlParameter("@p_dim5DefValue", System.Data.SqlDbType.Int) { Value = ((string.Empty == this._dim5DefValue) ? (object)DBNull.Value : (object)int.Parse(this._dim5DefValue)) });
            SqlRecordParams.Add(new SqlParameter("@p_dim6", System.Data.SqlDbType.Bit) { Value = this._dim6 });
            SqlRecordParams.Add(new SqlParameter("@p_dim6DefValue", System.Data.SqlDbType.Int) { Value = ((string.Empty == this._dim6DefValue) ? (object)DBNull.Value : (object)int.Parse(this._dim6DefValue)) });
            SqlRecordParams.Add(new SqlParameter("@p_dim7", System.Data.SqlDbType.Bit) { Value = this._dim7 });
            SqlRecordParams.Add(new SqlParameter("@p_dim7DefValue", System.Data.SqlDbType.Int) { Value = ((string.Empty == this._dim7DefValue) ? (object)DBNull.Value : (object)int.Parse(this._dim7DefValue)) });
            SqlRecordParams.Add(new SqlParameter("@p_dim8", System.Data.SqlDbType.Bit) { Value = this._dim8 });
            SqlRecordParams.Add(new SqlParameter("@p_dim8DefValue", System.Data.SqlDbType.Int) { Value = ((string.Empty == this._dim8DefValue) ? (object)DBNull.Value : (object)int.Parse(this._dim8DefValue)) });
            SqlRecordParams.Add(new SqlParameter("@p_dim9", System.Data.SqlDbType.Bit) { Value = this._dim9 });
            SqlRecordParams.Add(new SqlParameter("@p_dim9DefValue", System.Data.SqlDbType.Int) { Value = ((string.Empty == this._dim9DefValue) ? (object)DBNull.Value : (object)int.Parse(this._dim9DefValue)) });
            SqlRecordParams.Add(new SqlParameter("@p_dim10", System.Data.SqlDbType.Bit) { Value = this._dim10 });
            SqlRecordParams.Add(new SqlParameter("@p_dim10DefValue", System.Data.SqlDbType.Int) { Value = ((string.Empty == this._dim10DefValue) ? (object)DBNull.Value : (object)int.Parse(this._dim10DefValue)) });
            SqlRecordParams.Add(new SqlParameter("@p_enabled", System.Data.SqlDbType.Bit) { Value = _enabled });
            SqlRecordParams.Add(new SqlParameter("@p_dimSetCode", System.Data.SqlDbType.NVarChar) { Value = ((string.Empty == this._dimSetCode) ? (object)DBNull.Value : this._dimSetCode) });
            SqlRecordParams.Add(new SqlParameter("@p_addedby", System.Data.SqlDbType.UniqueIdentifier) { Value = (String.IsNullOrEmpty(this._userid)) ? (object)DBNull.Value : (object)Guid.Parse(this._userid) });
            SqlRecordParams.Add(new SqlParameter("@p_macaddress", System.Data.SqlDbType.NVarChar) { Value = ((string.Empty == this._editor_MAC_add) ? (object)DBNull.Value : this._editor_MAC_add) });
            SqlRecordParams.Add(new SqlParameter("@p_cocd", System.Data.SqlDbType.NVarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });
            
            try
            {
                //DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "co_fa_AccMaster_modify", SqlRecordParams.ToArray());
                dt=DataHelper.ExecuteDataset(str_ConnString, CommandType.StoredProcedure, "co_fa_AccMaster_modify", SqlRecordParams.ToArray()).Tables[0];
                ok = true;
                _ret = dt.Rows[0]["acid"].ToString();
            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[chatofacct.cs:saveChartofacct]" + expErr.Message;
            }
            finally { }
            //_ret;
            return ok.ToString() + "|~|" + _ret;
        }

        public DataSet getCoaSetupdetails(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_acid", SqlDbType.Int) { Value = ((string.Empty == this._AcId) ? (object)DBNull.Value : (object)Int64.Parse(this._AcId)) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "co_getCoaSetupdetails", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[chatofacct.cs:getCoaSetupdetails]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool checkTransaction_ByAcCd(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_accd", SqlDbType.NVarChar) { Value = ((string.Empty == this._AcCd) ? (object)DBNull.Value : this._AcCd) });
                SqlRecordParams.Add(new SqlParameter("@p_fonyr", SqlDbType.NChar) { Value = ((string.Empty == this._finyr) ? (object)DBNull.Value : this._finyr) }); 

                 dt = DataHelper.ExecuteDataset(str_ConnString, "checkTran_VchDtl_ByAcCd", SqlRecordParams.ToArray()).Tables[0];
                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[chatofacct.cs:checkTransaction_ByAcCd]" + expErr.Message;
            }
            finally { }
            return isexist;
        }


        public bool deletefa_AccMaster(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;
            List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
            SqlRecordParams.Add(new SqlParameter("@p_AcId", System.Data.SqlDbType.BigInt) { Value = ((string.Empty == this._AcId) ? (object)DBNull.Value : (object)Int64.Parse(this._AcId)) });
            SqlRecordParams.Add(new SqlParameter("@p_AcCd", System.Data.SqlDbType.NVarChar) { Value = ((string.Empty == this._AcCd) ? (object)DBNull.Value : this._AcCd) });

            try
            {
                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "AccMaster_delete", SqlRecordParams.ToArray());
                ok = true;
            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[chatofacct.cs:deletefa_AccMaster]" + expErr.Message;
            }
            finally { }
            return ok;
        }
        
        public bool checkTransaction_GroupRange(string str_ConnString, string range, string type, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_acid", SqlDbType.Int) { Value = ((string.Empty == this._AcId) ? (object)DBNull.Value : (object)Int64.Parse(this._AcId)) });
                SqlRecordParams.Add(new SqlParameter("@p_range", SqlDbType.NVarChar) { Value = range });
                SqlRecordParams.Add(new SqlParameter("@p_type", SqlDbType.NVarChar) { Value = type });

                dt = DataHelper.ExecuteDataset(str_ConnString, "checkTran_Range", SqlRecordParams.ToArray()).Tables[0];
                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[chatofacct.cs:checkTransaction_GroupRange]" + expErr.Message;
            }
            finally { }
            return isexist;
        }

    }


}
