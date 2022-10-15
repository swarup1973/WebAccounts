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
    public class StandardConversion
    {
        public string _id = string.Empty;
        public string _pid = string.Empty;
        public string _mode = string.Empty;
        public string _code = string.Empty;
        public string _itemcode = string.Empty;
        public string _FromUomCd = string.Empty;
        public string _ToUomCd = string.Empty;
        public string _ConvFactor = string.Empty;
        public string _RoType = string.Empty;
        public bool _isblock = false;
        public string _createdby = string.Empty;
        public string _createddate = string.Empty;
        public string _creator_MAC_add = string.Empty;

        public string _editdby = string.Empty;
        public string _editeddate = string.Empty;
        public string _editor_MAC_add = string.Empty;
        public string _cocd = string.Empty;
        public string _related_flag = string.Empty;
        public string _error_msg = string.Empty;

        public DataSet getStandardConversion(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });
                SqlRecordParams.Add(new SqlParameter("@p_row_id", SqlDbType.BigInt) { Value = ((string.Empty == this._id) ? (object)DBNull.Value : Int64.Parse(this._id)) });
                SqlRecordParams.Add(new SqlParameter("@ns_code", SqlDbType.VarChar) { Value = ((string.Empty == this._code) ? (object)DBNull.Value : this._code ) });
                SqlRecordParams.Add(new SqlParameter("@p_related_flag", SqlDbType.Char) { Value = ((string.Empty == this._related_flag) ? (object)DBNull.Value : this._related_flag) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "getStandardConversion", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[StandardConversion.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null; string LsReturnCode = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._id) ? (object)DBNull.Value : Int64.Parse(this._id)) });
                SqlRecordParams.Add(new SqlParameter("@FromUomCd", SqlDbType.VarChar) { Value = ((string.Empty == this._FromUomCd) ? (object)DBNull.Value : this._FromUomCd) });
                SqlRecordParams.Add(new SqlParameter("@ToUomCd", SqlDbType.VarChar) { Value = ((string.Empty == this._ToUomCd) ? (object)DBNull.Value : this._ToUomCd) });
                SqlRecordParams.Add(new SqlParameter("@ConvFactor", SqlDbType.Decimal) { Value = ((string.Empty == this._ConvFactor) ? (object)DBNull.Value : this._ConvFactor) });
                SqlRecordParams.Add(new SqlParameter("@RoType", SqlDbType.Int) { Value = ((string.Empty == this._RoType) ? (object)DBNull.Value : this._RoType) });
                SqlRecordParams.Add(new SqlParameter("@Block", SqlDbType.Bit) { Value = ((this._isblock) ? 1 : 0) });

                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                //dt = DataHelper.ExecuteDataset(str_ConnString, "save_no_sequence", SqlRecordParams.ToArray()).Tables[0];
                ds = DataHelper.ExecuteDataset(str_ConnString, "save_StandardConversion", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[UOM.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool check(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null; DataSet ds = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._id) ? (object)DBNull.Value : Int64.Parse(this._id)) });
                SqlRecordParams.Add(new SqlParameter("@FromUomCd", SqlDbType.VarChar) { Value = ((string.Empty == this._FromUomCd) ? (object)DBNull.Value : this._FromUomCd) });
                SqlRecordParams.Add(new SqlParameter("@ToUomCd", SqlDbType.VarChar) { Value = ((string.Empty == this._ToUomCd) ? (object)DBNull.Value : this._ToUomCd) });
                SqlRecordParams.Add(new SqlParameter("@ConvFactor", SqlDbType.Decimal) { Value = ((string.Empty == this._ConvFactor) ? (object)DBNull.Value : this._ConvFactor) });
                SqlRecordParams.Add(new SqlParameter("@RoType", SqlDbType.Int) { Value = ((string.Empty == this._RoType) ? (object)DBNull.Value : this._RoType) });
                SqlRecordParams.Add(new SqlParameter("@Block", SqlDbType.Bit) { Value = ((this._isblock) ? 1 : 0) });

                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                //dt = DataHelper.ExecuteDataset(str_ConnString, "save_no_sequence", SqlRecordParams.ToArray()).Tables[0];
                dt = DataHelper.ExecuteDataset(str_ConnString, "save_StandardConversion", SqlRecordParams.ToArray()).Tables[0];
                
                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[UOM.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
        public DataSet validate(string str_ConnString, ref string str_catchmessage)
        {
            bool isexist = false;
            DataTable dt = null; DataSet ds = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._id) ? (object)DBNull.Value : Int64.Parse(this._id)) });
                SqlRecordParams.Add(new SqlParameter("@FromUomCd", SqlDbType.VarChar) { Value = ((string.Empty == this._FromUomCd) ? (object)DBNull.Value : this._FromUomCd) });
                SqlRecordParams.Add(new SqlParameter("@ToUomCd", SqlDbType.VarChar) { Value = ((string.Empty == this._ToUomCd) ? (object)DBNull.Value : this._ToUomCd) });
                SqlRecordParams.Add(new SqlParameter("@ConvFactor", SqlDbType.Decimal) { Value = ((string.Empty == this._ConvFactor) ? (object)DBNull.Value : this._ConvFactor) });
                SqlRecordParams.Add(new SqlParameter("@RoType", SqlDbType.Int) { Value = ((string.Empty == this._RoType) ? (object)DBNull.Value : this._RoType) });
                SqlRecordParams.Add(new SqlParameter("@Block", SqlDbType.Bit) { Value = ((this._isblock) ? 1 : 0) });

                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                //dt = DataHelper.ExecuteDataset(str_ConnString, "save_no_sequence", SqlRecordParams.ToArray()).Tables[0];
                ds = DataHelper.ExecuteDataset(str_ConnString, "save_StandardConversion", SqlRecordParams.ToArray());

                //if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[UOM.cs:check]" + expErr.Message;
            }
            finally { }
            return ds;
        }


    }

}
