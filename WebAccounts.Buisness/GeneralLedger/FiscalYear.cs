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
    public class FiscalYear
    {
        public string _startdate = string.Empty;
        public string _noofperiod = string.Empty;
        public string _periodlength = string.Empty;
        public string _editor_MAC_add = string.Empty;
        public string _userid = string.Empty;
        public bool _IsPeriodLock = false;
        public string _del_s_date = string.Empty;
        public string _del_e_date = string.Empty;
        public DateTime _ustartdate;
        public string _deletedates;
        public string _errormsg = string.Empty;
        public string _cocd { get; set; }

        public DataSet getFiscalYearList(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            //SqlParameter[] SqlRecordParams = new SqlParameter[0];
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });
                ds = DataHelper.ExecuteDataset(str_ConnString, "load_gl_period", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Dimension.cs:getDimensionList]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public bool savefiscalyear(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@start_date", SqlDbType.NVarChar) { Value = this._startdate });
                SqlRecordParams.Add(new SqlParameter("@noofperiod", SqlDbType.NVarChar) { Value = this._noofperiod });
                SqlRecordParams.Add(new SqlParameter("@period_length", SqlDbType.NVarChar) { Value = this._periodlength });
                SqlRecordParams.Add(new SqlParameter("@p_editor_MAC_add", SqlDbType.VarChar) { Value = this._editor_MAC_add });
                SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier) { Value = (String.IsNullOrEmpty(this._userid)) ? (object)DBNull.Value : (object)Guid.Parse(this._userid) });
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });

                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "create_gl_period", SqlRecordParams.ToArray());
                ok = true;

            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[Fiscalyear.cs:savefiscalyear]" + expErr.Message;
            }
            finally { }
            return ok;

        }

        public bool updatefiscalyear(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_startdate", SqlDbType.NVarChar) { Value = this._startdate });                
                SqlRecordParams.Add(new SqlParameter("@p_isperiodlock", SqlDbType.NVarChar) { Value = this._IsPeriodLock });
                SqlRecordParams.Add(new SqlParameter("@p_editor_MAC_add", SqlDbType.VarChar) { Value = this._editor_MAC_add });
                SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier) { Value = (String.IsNullOrEmpty(this._userid)) ? (object)DBNull.Value : (object)Guid.Parse(this._userid) });
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });
                DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "update_gl_period", SqlRecordParams.ToArray());
                ok = true;
            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[Fiscalyear.cs:UpdateFiscalyear]" + expErr.Message;
            }
            finally { }
            return ok;
        }

        public DataSet showdelfinyear(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_startdate", SqlDbType.NVarChar) { Value = this._del_s_date });
                SqlRecordParams.Add(new SqlParameter("@p_enddate", SqlDbType.NVarChar) { Value = this._del_e_date});
                ds = DataHelper.ExecuteDataset(str_ConnString, "show_del_period", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Dimension.cs:getDimensionList]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet deletefiscalyear(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;
            DataSet dt = null;

            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@deletedates", SqlDbType.NVarChar) { Value = this._deletedates });                
                SqlRecordParams.Add(new SqlParameter("@p_editor_MAC_add", SqlDbType.VarChar) { Value = this._editor_MAC_add });
                SqlRecordParams.Add(new SqlParameter("@p_userid", SqlDbType.UniqueIdentifier) { Value = (String.IsNullOrEmpty(this._userid)) ? (object)DBNull.Value : (object)Guid.Parse(this._userid) });
                SqlRecordParams.Add(new SqlParameter("@p_error_msg", SqlDbType.VarChar) { Value = this._errormsg });

                //DataHelper.ExecuteNonQuery(str_ConnString, CommandType.StoredProcedure, "delete_gl_period", SqlRecordParams.ToArray());
                dt = DataHelper.ExecuteDataset(str_ConnString, "delete_gl_period", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[Fiscalyear.cs:savefiscalyear]" + expErr.Message;
            }
            finally { }
            return dt;

        }

    }
}
