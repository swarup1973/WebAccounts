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
    public class Dimension
    {
        public string _dimId = string.Empty;
        public string _valueId = string.Empty;
        public string _dimCd = string.Empty;
        public string _dimCaption = string.Empty;
        public string _dimDesc = string.Empty;
        public string _valueCd = string.Empty;
        public string _valueCaption = string.Empty;
        public string _valueDesc = string.Empty;
        public string _valueFlag = string.Empty;
        public bool _IsAcApp = false;
        public bool _IsAppBSLedger = false;
        public bool _IsAppIncomeLedger = false;
        public bool _IsAppExpnsLedger = false;
        public bool _IsAppOBLedger = false;
        public bool _enabled = false;
        public string _editor_MAC_add = string.Empty;
        public string _userid = string.Empty;
        public DataTable _dtdimensionvaltails = null;

        public string _dimSetId = string.Empty;
        public string _dimSetCode = string.Empty;
        public string _dimSetName = string.Empty;
        public bool _dim1_Branch = false;
        public bool _dim2_Dept = false;
        public bool _dim3 = false;
        public bool _dim4 = false;
        public bool _dim5 = false;
        public bool _dim6 = false;
        public bool _dim7 = false;
        public bool _dim8 = false;
        public bool _dim9 = false;
        public bool _dim10 = false;
        public string _cocd{ get; set; }

        public DataSet getDimensionList(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            //SqlParameter[] SqlRecordParams = new SqlParameter[0];
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });
                ds = DataHelper.ExecuteDataset(str_ConnString, "co_getdimensionlist", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Dimension.cs:getDimensionList]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool checkDimensioncode(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_dimid", SqlDbType.Int) { Value = ((string.Empty == this._dimId) ? (object)DBNull.Value : (object)int.Parse(this._dimId)) });
                SqlRecordParams.Add(new SqlParameter("@p_dimCd", SqlDbType.NVarChar) { Value = this._dimCd });

                dt = DataHelper.ExecuteDataset(str_ConnString, "co_checkdimensioncode", SqlRecordParams.ToArray()).Tables[0];
                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[Dimension.cs:checkDimensioncode]" + expErr.Message;
            }
            finally { }
            return isexist;
        }

        public bool saveDimension(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_dimid", SqlDbType.Int) { Value = ((string.Empty == this._dimId) ? (object)DBNull.Value : (object)int.Parse(this._dimId)) });
                SqlRecordParams.Add(new SqlParameter("@p_dimCd", SqlDbType.NVarChar) { Value = this._dimCd });
                SqlRecordParams.Add(new SqlParameter("@p_dimCaption", SqlDbType.VarChar) { Value = this._dimCaption });
                SqlRecordParams.Add(new SqlParameter("@p_dimDesc", SqlDbType.VarChar) { Value = this._dimDesc });
                SqlRecordParams.Add(new SqlParameter("@p_IsAcApp", SqlDbType.Bit) { Value = (this._IsAcApp ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_IsAppBSLedger", SqlDbType.Bit) { Value = (this._IsAppBSLedger ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_IsAppIncomeLedger", SqlDbType.Bit) { Value = (this._IsAppIncomeLedger ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_IsAppExpnsLedger", SqlDbType.Bit) { Value = (this._IsAppExpnsLedger ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_IsAppOBLedger", SqlDbType.Bit) { Value = (this._IsAppOBLedger ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_enabled", SqlDbType.Bit) { Value = (this._enabled ? 1 : 0) });
                //SqlRecordParams.Add(new SqlParameter("@p_dimensionvaletailslist", SqlDbType.Structured) { Value = "" });
                SqlRecordParams.Add(new SqlParameter("@p_editor_MAC_add", SqlDbType.VarChar) { Value = this._editor_MAC_add });
                SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier) { Value = (String.IsNullOrEmpty(this._userid)) ? (object)DBNull.Value : (object)Guid.Parse(this._userid) });
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });

                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "co_dimension_modify", SqlRecordParams.ToArray());
                ok = true;

            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[Dimension.cs:saveDimension]" + expErr.Message;
            }
            finally { }
            return ok;

        }

        public DataSet getDimensiondetails(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_dimid", SqlDbType.Int) { Value = ((string.Empty == this._dimId) ? (object)DBNull.Value : (object)int.Parse(this._dimId)) });
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });
                ds = DataHelper.ExecuteDataset(str_ConnString, "co_getDimensiondetails", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Dimension.cs:getDimensiondetails]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getDimensionvalue(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_dimid", SqlDbType.Int) { Value = ((string.Empty == this._dimId) ? (object)DBNull.Value : (object)int.Parse(this._dimId)) });
                SqlRecordParams.Add(new SqlParameter("@p_valueid", SqlDbType.Int) { Value = ((string.Empty == this._valueId) ? (object)DBNull.Value : (object)int.Parse(this._valueId)) });
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });
                ds = DataHelper.ExecuteDataset(str_ConnString, "co_getDimensionvalue", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Dimension.cs:getDimensionvalue]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool deleteDimension(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_dimid", SqlDbType.Int) { Value = ((string.Empty == this._dimId) ? (object)DBNull.Value : (object)int.Parse(this._dimId)) });
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });
                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "co_DimensionDelete", SqlRecordParams.ToArray());
                ok = true;
            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[Dimension.cs:DeleteDimension]" + expErr.Message;
            }
            finally { }
            return ok;
        }

        public bool deleteDimensionValue(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_dimid", SqlDbType.Int) { Value = ((string.Empty == this._dimId) ? (object)DBNull.Value : (object)int.Parse(this._dimId)) });
                SqlRecordParams.Add(new SqlParameter("@p_dimValue", SqlDbType.Int) { Value = ((string.Empty == this._valueId) ? (object)DBNull.Value : (object)int.Parse(this._valueId)) });
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });
                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "co_DimensionDelete", SqlRecordParams.ToArray());
                ok = true;
            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[Dimension.cs:DeleteDimension]" + expErr.Message;
            }
            finally { }
            return ok;
        }

        public bool deleteDimensionSet(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_dimSetId", SqlDbType.BigInt) { Value = ((string.Empty == this._dimSetId) ? (object)DBNull.Value : (object)Int64.Parse(this._dimSetId)) });
                SqlRecordParams.Add(new SqlParameter("@p_block_flag", SqlDbType.Char) { Value = this._valueFlag });
                SqlRecordParams.Add(new SqlParameter("@p_enabled", SqlDbType.Bit) { Value = (this._enabled ? 1 : 0) });
                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "co_DimensionsetDelete", SqlRecordParams.ToArray());
                ok = true;
            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[Dimension.cs:saveDimensionvalue]" + expErr.Message;
            }
            finally { }
            return ok;
        }
        public bool saveDimensionvalue(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_dimid", SqlDbType.Int) { Value = ((string.Empty == this._dimId) ? (object)DBNull.Value : (object)int.Parse(this._dimId)) });
                SqlRecordParams.Add(new SqlParameter("@p_valueid", SqlDbType.Int) { Value = ((string.Empty == this._valueId) ? (object)DBNull.Value : (object)int.Parse(this._valueId)) });
                SqlRecordParams.Add(new SqlParameter("@p_valueCd", SqlDbType.NVarChar) { Value = this._valueCd });
                SqlRecordParams.Add(new SqlParameter("@p_valueName", SqlDbType.VarChar) { Value = this._valueCaption });
                SqlRecordParams.Add(new SqlParameter("@p_valueDesc", SqlDbType.VarChar) { Value = this._valueDesc });
                SqlRecordParams.Add(new SqlParameter("@p_enabled", SqlDbType.Bit) { Value = (this._enabled ? 1 : 0) });
                //SqlRecordParams.Add(new SqlParameter("@p_dimensionvaletailslist", SqlDbType.Structured) { Value = "" });
                SqlRecordParams.Add(new SqlParameter("@p_editor_MAC_add", SqlDbType.VarChar) { Value = this._editor_MAC_add });
                SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier) { Value = (String.IsNullOrEmpty(this._userid)) ? (object)DBNull.Value : (object)Guid.Parse(this._userid) });
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });

                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "co_dimensionvalue_modify", SqlRecordParams.ToArray());
                ok = true;

            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[Dimension.cs:saveDimensionvalue]" + expErr.Message;
            }
            finally { }
            return ok;

        }
        public bool checkDimensionSetcode(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_dimSetId", SqlDbType.BigInt) { Value = ((string.Empty == this._dimSetId) ? (object)DBNull.Value : (object)Int64.Parse(this._dimSetId)) });
                SqlRecordParams.Add(new SqlParameter("@p_dimSetCode", SqlDbType.NVarChar) { Value = this._dimSetCode });

                dt = DataHelper.ExecuteDataset(str_ConnString, "co_checkdimensionsetcode", SqlRecordParams.ToArray()).Tables[0];
                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[Dimension.cs:checkDimensionSetcode]" + expErr.Message;
            }
            finally { }
            return isexist;
        }

        public bool checkDimensionSet(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_dimSetId", SqlDbType.BigInt) { Value = ((string.Empty == this._dimSetId) ? (object)DBNull.Value : (object)Int64.Parse(this._dimSetId)) });
                //SqlRecordParams.Add(new SqlParameter("@p_dimSetCode", SqlDbType.NVarChar) { Value = this._dimSetCode });
                //SqlRecordParams.Add(new SqlParameter("@p_dimSetName", SqlDbType.VarChar) { Value = this._dimSetName });
                SqlRecordParams.Add(new SqlParameter("@p_dim1_Branch", SqlDbType.Bit) { Value = (this._dim1_Branch ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim2_Dept", SqlDbType.Bit) { Value = (this._dim2_Dept ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim3", SqlDbType.Bit) { Value = (this._dim3 ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim4", SqlDbType.Bit) { Value = (this._dim4 ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim5", SqlDbType.Bit) { Value = (this._dim5 ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim6", SqlDbType.Bit) { Value = (this._dim6 ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim7", SqlDbType.Bit) { Value = (this._dim7 ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim8", SqlDbType.Bit) { Value = (this._dim8 ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim9", SqlDbType.Bit) { Value = (this._dim9 ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim10", SqlDbType.Bit) { Value = (this._dim10 ? 1 : 0) });
                //SqlRecordParams.Add(new SqlParameter("@p_enabled", SqlDbType.Bit) { Value = (this._enabled ? 1 : 0) });
                //SqlRecordParams.Add(new SqlParameter("@p_editor_MAC_add", SqlDbType.VarChar) { Value = this._editor_MAC_add });
                //SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier) { Value = (String.IsNullOrEmpty(this._userid)) ? (object)DBNull.Value : (object)Guid.Parse(this._userid) });
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });

                dt = DataHelper.ExecuteDataset(str_ConnString, CommandType.StoredProcedure, "co_checkdimensionset", SqlRecordParams.ToArray()).Tables[0];
                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[Dimension.cs:checkDimensionSetcode]" + expErr.Message;
            }
            finally { }
            return isexist;
        }

        public DataSet getDimensionSetList(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            //SqlParameter[] SqlRecordParams = new SqlParameter[0];
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });
                ds = DataHelper.ExecuteDataset(str_ConnString, "co_getDimensionsetList", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Dimension.cs:getDimensionSetList]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getDimensionSetdetails(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_dimSetId", SqlDbType.BigInt) { Value = ((string.Empty == this._dimSetId) ? (object)DBNull.Value : (object)Int64.Parse(this._dimSetId)) });
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });
                ds = DataHelper.ExecuteDataset(str_ConnString, "co_getDimensionset", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Dimension.cs:getDimensionSetdetails]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool saveDimensionSet(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_dimSetId", SqlDbType.BigInt) { Value = ((string.Empty == this._dimSetId) ? (object)DBNull.Value : (object)Int64.Parse(this._dimSetId)) });
                SqlRecordParams.Add(new SqlParameter("@p_dimSetCode", SqlDbType.NVarChar) { Value = this._dimSetCode });
                SqlRecordParams.Add(new SqlParameter("@p_dimSetName", SqlDbType.VarChar) { Value = this._dimSetName });
                SqlRecordParams.Add(new SqlParameter("@p_dim1_Branch", SqlDbType.Bit) { Value = (this._dim1_Branch ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim2_Dept", SqlDbType.Bit) { Value = (this._dim2_Dept ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim3", SqlDbType.Bit) { Value = (this._dim3 ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim4", SqlDbType.Bit) { Value = (this._dim4 ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim5", SqlDbType.Bit) { Value = (this._dim5 ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim6", SqlDbType.Bit) { Value = (this._dim6 ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim7", SqlDbType.Bit) { Value = (this._dim7 ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim8", SqlDbType.Bit) { Value = (this._dim8 ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim9", SqlDbType.Bit) { Value = (this._dim9 ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_dim10", SqlDbType.Bit) { Value = (this._dim10 ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_enabled", SqlDbType.Bit) { Value = (this._enabled ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@p_editor_MAC_add", SqlDbType.VarChar) { Value = this._editor_MAC_add });
                SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier) { Value = (String.IsNullOrEmpty(this._userid)) ? (object)DBNull.Value : (object)Guid.Parse(this._userid) });
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });
                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "co_dimensionset_modify", SqlRecordParams.ToArray());
                ok = true;

            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[Dimension.cs:saveDimensionSet]" + expErr.Message;
            }
            finally { }
            return ok;

        }

    }
}
