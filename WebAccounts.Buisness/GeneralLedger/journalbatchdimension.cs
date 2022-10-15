using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAccounts.Data;

namespace WebAccounts.Buisness
{
    public class journalbatchdimension
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _bankcd = string.Empty;
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
        public string _createdby = string.Empty;
        public string _creator_mac_add = string.Empty;
        public string _cocd = string.Empty;
        public DataSet getDimSetupdetails(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = Dimsetupparamterset();

                ds = DataHelper.ExecuteDataset(str_ConnString, "journalbatch_Dimension_Modify", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[journalbatchdimension.cs:getDimSetupdetails]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public string saveDimSetup(string str_ConnString, ref string str_catchmessage)
        {
            bool ok = false;
            DataTable dt = null;
            string _ret = string.Empty;
            List<SqlParameter> SqlRecordParams = Dimsetupparamterset();

            try
            {
                dt = DataHelper.ExecuteDataset(str_ConnString, CommandType.StoredProcedure, "journalbatch_Dimension_Modify", SqlRecordParams.ToArray()).Tables[0];
                ok = true;
                _ret = dt.Rows[0]["id"].ToString();
            }
            catch (Exception expErr)
            {
                ok = false;
                str_catchmessage = "[journalbatchdimension.cs:saveDimSetup]" + expErr.Message;
            }
            finally { }
            //_ret;
            return ok.ToString() + "|~|" + _ret;
        }

        private List<SqlParameter> Dimsetupparamterset()
        {
            List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
            SqlRecordParams.Add(new SqlParameter("@p_RowId", System.Data.SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : (object)Int64.Parse(this._rowid)) });
            SqlRecordParams.Add(new SqlParameter("@p_Mode", System.Data.SqlDbType.NVarChar) { Value = ((string.Empty == this._mode) ? (object)DBNull.Value : this._mode) });
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

            SqlRecordParams.Add(new SqlParameter("@p_Creator_mac_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_mac_add) ? (object)DBNull.Value : this._creator_mac_add) });
            SqlRecordParams.Add(new SqlParameter("@p_created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });

            SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });
            return SqlRecordParams;
        }
    }
}



