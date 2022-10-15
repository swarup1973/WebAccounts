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
    public class NoSequence
    {
        public string _id = string.Empty;
        public string _pid = string.Empty;
        public string _mode = string.Empty;
        public string _sequencetype = string.Empty;
        public string _relatedseqid = string.Empty;
        public string _nscode = string.Empty;
        public string _nsdescription = string.Empty;
        public string _startdate = string.Empty;
        public string _enddate = string.Empty;
        public string _startingno = string.Empty;
        public string _endingno = string.Empty;
        public string _nointerval = string.Empty;
        public string _prefix = string.Empty;
        public string _suffix = string.Empty;
        public bool _allowmanual = false;
        public bool _closesequence = false;
        public bool _isblock = false;
        public string _relationexist = string.Empty;
        public string _lastnoused = string.Empty;
        public string _createdby = string.Empty;
        public string _createddate = string.Empty;
        public string _creator_MAC_add = string.Empty;

        public string _editdby = string.Empty;
        public string _editeddate = string.Empty;
        public string _editor_MAC_add = string.Empty;
        public string _cocd = string.Empty;
        public string _related_flag = string.Empty;
        public string _error_msg = string.Empty;

        public DataSet getSequence(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });
                SqlRecordParams.Add(new SqlParameter("@p_row_id", SqlDbType.BigInt) { Value = ((string.Empty == this._id) ? (object)DBNull.Value : Int64.Parse(this._id)) });
                SqlRecordParams.Add(new SqlParameter("@ns_code", SqlDbType.VarChar) { Value = ((string.Empty == this._nscode) ? (object)DBNull.Value : this._nscode ) });
                SqlRecordParams.Add(new SqlParameter("@p_related_flag", SqlDbType.Char) { Value = ((string.Empty == this._related_flag) ? (object)DBNull.Value : this._related_flag) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "getSequence", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[NoSequence.cs:Operation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@PRowId", SqlDbType.BigInt) { Value = ((string.Empty == this._pid) ? (object)DBNull.Value : Int64.Parse(this._pid)) });
                SqlRecordParams.Add(new SqlParameter("@NsCode", SqlDbType.VarChar) { Value = ((string.Empty == this._nscode) ? (object)DBNull.Value : this._nscode) });
                SqlRecordParams.Add(new SqlParameter("@NsDescription", SqlDbType.VarChar) { Value = ((string.Empty == this._nsdescription) ? (object)DBNull.Value : this._nsdescription) });
                SqlRecordParams.Add(new SqlParameter("@StartDate", SqlDbType.DateTime) { Value = ((string.Empty == this._startdate) ? (object)DBNull.Value : Convert.ToDateTime(this._startdate)) });
                SqlRecordParams.Add(new SqlParameter("@EndDate", SqlDbType.DateTime) { Value = ((string.Empty == this._enddate) ? (object)DBNull.Value : Convert.ToDateTime(this._enddate)) });
                SqlRecordParams.Add(new SqlParameter("@StartingNo", SqlDbType.Int) { Value = ((string.Empty == this._startingno) ? (object)DBNull.Value : (object)int.Parse(this._startingno)) });
                SqlRecordParams.Add(new SqlParameter("@EndingNo", SqlDbType.Int) { Value = ((string.Empty == this._endingno) ? (object)DBNull.Value : (object)int.Parse(this._endingno)) });
                SqlRecordParams.Add(new SqlParameter("@NoInterval", SqlDbType.Int) { Value = ((string.Empty == this._nointerval) ? (object)DBNull.Value : (object)int.Parse(this._nointerval)) });
                SqlRecordParams.Add(new SqlParameter("@Prefix", SqlDbType.VarChar) { Value = ((string.Empty == this._prefix) ? (object)DBNull.Value : this._prefix) });
                SqlRecordParams.Add(new SqlParameter("@Suffix", SqlDbType.VarChar) { Value = ((string.Empty == this._suffix) ? (object)DBNull.Value : this._suffix) });
                SqlRecordParams.Add(new SqlParameter("@AllowManual", SqlDbType.Bit) { Value = ((this._allowmanual) ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@CloseSequence", SqlDbType.Bit) { Value = ((this._closesequence) ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@Block", SqlDbType.Bit) { Value = ((this._isblock) ? 1 : 0) });
                
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });
                //SqlRecordParams.Add(new SqlParameter("@error_code", SqlDbType.NVarChar) { Value = ((string.Empty == this._error_msg) ? (object)DBNull.Value : this._error_msg) });
                //SqlRecordParams.Add(new SqlParameter("@error_code", SqlDbType.NVarChar) { SqlRecordParams.Direction = ParameterDirection.Output });
                ds = DataHelper.ExecuteDataset(str_ConnString, "save_no_sequence", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[NoSequence.cs:Operation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@PRowId", SqlDbType.BigInt) { Value = ((string.Empty == this._pid) ? (object)DBNull.Value : Int64.Parse(this._pid)) });
                SqlRecordParams.Add(new SqlParameter("@NsCode", SqlDbType.VarChar) { Value = ((string.Empty == this._nscode) ? (object)DBNull.Value : this._nscode) });
                SqlRecordParams.Add(new SqlParameter("@NsDescription", SqlDbType.VarChar) { Value = ((string.Empty == this._nsdescription) ? (object)DBNull.Value : this._nsdescription) });
                SqlRecordParams.Add(new SqlParameter("@StartDate", SqlDbType.DateTime) { Value = ((string.Empty == this._startdate) ? (object)DBNull.Value : Convert.ToDateTime(this._startdate)) });
                SqlRecordParams.Add(new SqlParameter("@EndDate", SqlDbType.DateTime) { Value = ((string.Empty == this._enddate) ? (object)DBNull.Value : Convert.ToDateTime(this._enddate)) });
                SqlRecordParams.Add(new SqlParameter("@StartingNo", SqlDbType.Int) { Value = ((string.Empty == this._startingno) ? (object)DBNull.Value : (object)int.Parse(this._startingno)) });
                SqlRecordParams.Add(new SqlParameter("@EndingNo", SqlDbType.Int) { Value = ((string.Empty == this._endingno) ? (object)DBNull.Value : (object)int.Parse(this._endingno)) });
                SqlRecordParams.Add(new SqlParameter("@NoInterval", SqlDbType.Int) { Value = ((string.Empty == this._nointerval) ? (object)DBNull.Value : (object)int.Parse(this._nointerval)) });
                SqlRecordParams.Add(new SqlParameter("@Prefix", SqlDbType.VarChar) { Value = ((string.Empty == this._prefix) ? (object)DBNull.Value : this._prefix) });
                SqlRecordParams.Add(new SqlParameter("@Suffix", SqlDbType.VarChar) { Value = ((string.Empty == this._suffix) ? (object)DBNull.Value : this._suffix) });
                SqlRecordParams.Add(new SqlParameter("@AllowManual", SqlDbType.Bit) { Value = ((this._allowmanual) ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@CloseSequence", SqlDbType.Bit) { Value = ((this._closesequence) ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@Block", SqlDbType.Bit) { Value = ((this._isblock) ? 1 : 0) });

                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "save_no_sequence", SqlRecordParams.ToArray()).Tables[0];
                //ds = DataHelper.ExecuteDataset(str_ConnString, "save_no_sequence", SqlRecordParams.ToArray());

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[NoSequence.cs:check]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@PRowId", SqlDbType.BigInt) { Value = ((string.Empty == this._pid) ? (object)DBNull.Value : Int64.Parse(this._pid)) });
                SqlRecordParams.Add(new SqlParameter("@NsCode", SqlDbType.VarChar) { Value = ((string.Empty == this._nscode) ? (object)DBNull.Value : this._nscode) });
                SqlRecordParams.Add(new SqlParameter("@NsDescription", SqlDbType.VarChar) { Value = ((string.Empty == this._nsdescription) ? (object)DBNull.Value : this._nsdescription) });
                SqlRecordParams.Add(new SqlParameter("@StartDate", SqlDbType.DateTime) { Value = ((string.Empty == this._startdate) ? (object)DBNull.Value : Convert.ToDateTime(this._startdate)) });
                SqlRecordParams.Add(new SqlParameter("@EndDate", SqlDbType.DateTime) { Value = ((string.Empty == this._enddate) ? (object)DBNull.Value : Convert.ToDateTime(this._enddate)) });
                SqlRecordParams.Add(new SqlParameter("@StartingNo", SqlDbType.Int) { Value = ((string.Empty == this._startingno) ? (object)DBNull.Value : (object)int.Parse(this._startingno)) });
                SqlRecordParams.Add(new SqlParameter("@EndingNo", SqlDbType.Int) { Value = ((string.Empty == this._endingno) ? (object)DBNull.Value : (object)int.Parse(this._endingno)) });
                SqlRecordParams.Add(new SqlParameter("@NoInterval", SqlDbType.Int) { Value = ((string.Empty == this._nointerval) ? (object)DBNull.Value : (object)int.Parse(this._nointerval)) });
                SqlRecordParams.Add(new SqlParameter("@Prefix", SqlDbType.VarChar) { Value = ((string.Empty == this._prefix) ? (object)DBNull.Value : this._prefix) });
                SqlRecordParams.Add(new SqlParameter("@Suffix", SqlDbType.VarChar) { Value = ((string.Empty == this._suffix) ? (object)DBNull.Value : this._suffix) });
                SqlRecordParams.Add(new SqlParameter("@AllowManual", SqlDbType.Bit) { Value = ((this._allowmanual) ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@CloseSequence", SqlDbType.Bit) { Value = ((this._closesequence) ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@Block", SqlDbType.Bit) { Value = ((this._isblock) ? 1 : 0) });

                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                //dt = DataHelper.ExecuteDataset(str_ConnString, "save_no_sequence", SqlRecordParams.ToArray()).Tables[0];
                ds = DataHelper.ExecuteDataset(str_ConnString, "save_no_sequence", SqlRecordParams.ToArray());

                //if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[NoSequence.cs:check]" + expErr.Message;
            }
            finally { }
            return ds;
        }


    }

}
