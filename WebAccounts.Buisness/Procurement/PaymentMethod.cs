using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using WebAccounts.Data;

namespace WebAccounts.Buisness
{
    public class PaymentMethod
    {
        public String RowId = String.Empty;
        public string Mode = string.Empty;
        public String MethodCd = String.Empty;
        public String MethodDesc = String.Empty;
        public bool IsBlock = false;
        public String CoCd = String.Empty;
        public String created_by = String.Empty;
        public String creation_date = String.Empty;
        public String creator_MAC_add = String.Empty;
        public String edit_by = String.Empty;
        public String edit_date = String.Empty;
        public String editor_MAC_add = String.Empty;
        public String VC = String.Empty;

        public DataSet GetVendorMethod(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.VarChar) { Value = ((string.Empty == this.CoCd) ? (object)DBNull.Value : this.CoCd) });
                SqlRecordParams.Add(new SqlParameter("@p_row_id", SqlDbType.BigInt) { Value = ((string.Empty == this.RowId) ? (object)DBNull.Value : Int64.Parse(this.RowId)) });
                SqlRecordParams.Add(new SqlParameter("@p_type", SqlDbType.VarChar) { Value = ((string.Empty == this.VC) ? (object)DBNull.Value : this.VC) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "get_customerpayment_method", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Payment_Method.cs:GetRoleCenter]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this.Mode });
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this.RowId) ? (object)DBNull.Value : Int64.Parse(this.RowId)) });
                SqlRecordParams.Add(new SqlParameter("@PmtMethodCd", SqlDbType.VarChar) { Value = ((string.Empty == this.MethodCd) ? (object)DBNull.Value : this.MethodCd) });
                SqlRecordParams.Add(new SqlParameter("@PmtMethodName", SqlDbType.VarChar) { Value = ((string.Empty == this.MethodDesc) ? (object)DBNull.Value : this.MethodDesc) });
                SqlRecordParams.Add(new SqlParameter("@Block", SqlDbType.Bit) { Value = ((this.IsBlock) ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@PmtVC", SqlDbType.VarChar) { Value = ((string.Empty == this.VC) ? (object)DBNull.Value : this.VC) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this.CoCd) ? (object)DBNull.Value : this.CoCd) });
                
                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this.created_by) ? (object)DBNull.Value : (object)Guid.Parse(this.created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this.creator_MAC_add) ? (object)DBNull.Value : this.creator_MAC_add) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "save_payment_method", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Payment_Method.cs:Operation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@mode", SqlDbType.NVarChar) { Value = this.Mode });
                SqlRecordParams.Add(new SqlParameter("@RowId", SqlDbType.BigInt) { Value = ((string.Empty == this.RowId) ? (object)DBNull.Value : Int64.Parse(this.RowId)) });
                SqlRecordParams.Add(new SqlParameter("@PmtMethodCd", SqlDbType.VarChar) { Value = ((string.Empty == this.MethodCd) ? (object)DBNull.Value : this.MethodCd) });
                SqlRecordParams.Add(new SqlParameter("@PmtMethodName", SqlDbType.VarChar) { Value = ((string.Empty == this.MethodDesc) ? (object)DBNull.Value : this.MethodDesc) });
                SqlRecordParams.Add(new SqlParameter("@Block", SqlDbType.Bit) { Value = ((this.IsBlock) ? 1 : 0) });
                SqlRecordParams.Add(new SqlParameter("@PmtVC", SqlDbType.VarChar) { Value = ((string.Empty == this.VC) ? (object)DBNull.Value : this.VC) });
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this.CoCd) ? (object)DBNull.Value : this.CoCd) });

                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this.created_by) ? (object)DBNull.Value : (object)Guid.Parse(this.created_by)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this.creator_MAC_add) ? (object)DBNull.Value : this.creator_MAC_add) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "save_payment_method", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[Payment_Method.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }

    }
}
