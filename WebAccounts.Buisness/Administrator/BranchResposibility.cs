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
    public class BranchResposibility
    {
        public string _id = string.Empty;
        public string _mode = string.Empty;
        public string _branchcode = string.Empty;
        public string _branchname = string.Empty;
        public string _addline1 = string.Empty;
        public string _addline2 = string.Empty;
        public string _city = string.Empty;
        public string _postcode = string.Empty;
        public string _country = string.Empty;
        public string _location = string.Empty;
        public string _contactperson = string.Empty;
        public string _phoneno = string.Empty;
        public string _alternatephoneno = string.Empty;
        public string _faxno = string.Empty;
        public string _email = string.Empty;
        public string _website = string.Empty;
        public bool _isblock = false;
        public string _createdby = string.Empty;
        public string _createddate = string.Empty;
        public string _creator_MAC_add = string.Empty;

        public string _editdby = string.Empty;
        public string _editeddate = string.Empty;
        public string _editor_MAC_add = string.Empty;
        public string _cocd = string.Empty;
        public string _error_msg = string.Empty;

        public DataSet getBranch(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "getBranch", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[BranchResposibility.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet editBranch(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });
                SqlRecordParams.Add(new SqlParameter("@id", SqlDbType.VarChar) { Value = ((string.Empty == this._id) ? (object)DBNull.Value : this._id) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "getBranchEdit", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[BranchResposibility.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getLocation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "getLocation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[BranchResposibility.cs:Operation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@Code", SqlDbType.VarChar) { Value = ((string.Empty == this._branchcode) ? (object)DBNull.Value : this._branchcode) });
                SqlRecordParams.Add(new SqlParameter("@Name", SqlDbType.VarChar) { Value = ((string.Empty == this._branchname) ? (object)DBNull.Value : this._branchname) });
                SqlRecordParams.Add(new SqlParameter("@Add1", SqlDbType.VarChar) { Value = ((string.Empty == this._addline1) ? (object)DBNull.Value : this._addline1) });
                SqlRecordParams.Add(new SqlParameter("@Add2", SqlDbType.VarChar) { Value = ((string.Empty == this._addline2) ? (object)DBNull.Value : this._addline2) });
                SqlRecordParams.Add(new SqlParameter("@City", SqlDbType.VarChar) { Value = ((string.Empty == this._city) ? (object)DBNull.Value : this._city) });
                SqlRecordParams.Add(new SqlParameter("@PinCode", SqlDbType.VarChar) { Value = ((string.Empty == this._postcode) ? (object)DBNull.Value : this._postcode) });
                SqlRecordParams.Add(new SqlParameter("@Country", SqlDbType.VarChar) { Value = ((string.Empty == this._country) ? (object)DBNull.Value : this._country) });
                SqlRecordParams.Add(new SqlParameter("@Location", SqlDbType.VarChar) { Value = ((string.Empty == this._location) ? (object)DBNull.Value : this._location) });
                SqlRecordParams.Add(new SqlParameter("@ContactPerson", SqlDbType.VarChar) { Value = ((string.Empty == this._contactperson) ? (object)DBNull.Value : this._contactperson) });
                SqlRecordParams.Add(new SqlParameter("@PhoneNo", SqlDbType.VarChar) { Value = ((string.Empty == this._phoneno) ? (object)DBNull.Value : this._phoneno) });
                SqlRecordParams.Add(new SqlParameter("@AlternatePhoneNo", SqlDbType.VarChar) { Value = ((string.Empty == this._alternatephoneno) ? (object)DBNull.Value : this._alternatephoneno) });
                SqlRecordParams.Add(new SqlParameter("@FaxNo", SqlDbType.VarChar) { Value = ((string.Empty == this._faxno) ? (object)DBNull.Value : this._faxno) });
                SqlRecordParams.Add(new SqlParameter("@Email", SqlDbType.VarChar) { Value = ((string.Empty == this._email) ? (object)DBNull.Value : this._email) });
                SqlRecordParams.Add(new SqlParameter("@Website", SqlDbType.VarChar) { Value = ((string.Empty == this._website) ? (object)DBNull.Value : this._website) });
                SqlRecordParams.Add(new SqlParameter("@Block", SqlDbType.Bit) { Value = ((this._isblock) ? 1 : 0) });
                
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });
                //SqlRecordParams.Add(new SqlParameter("@error_code", SqlDbType.NVarChar) { Value = ((string.Empty == this._error_msg) ? (object)DBNull.Value : this._error_msg) });
                //SqlRecordParams.Add(new SqlParameter("@error_code", SqlDbType.NVarChar) { SqlRecordParams.Direction = ParameterDirection.Output });
                ds = DataHelper.ExecuteDataset(str_ConnString, "save_Branch", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[BranchResposibility.cs:Operation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@Code", SqlDbType.VarChar) { Value = ((string.Empty == this._branchcode) ? (object)DBNull.Value : this._branchcode) });
                SqlRecordParams.Add(new SqlParameter("@Name", SqlDbType.VarChar) { Value = ((string.Empty == this._branchname) ? (object)DBNull.Value : this._branchname) });
                SqlRecordParams.Add(new SqlParameter("@Add1", SqlDbType.VarChar) { Value = ((string.Empty == this._addline1) ? (object)DBNull.Value : this._addline1) });
                SqlRecordParams.Add(new SqlParameter("@Add2", SqlDbType.VarChar) { Value = ((string.Empty == this._addline2) ? (object)DBNull.Value : this._addline2) });
                SqlRecordParams.Add(new SqlParameter("@City", SqlDbType.VarChar) { Value = ((string.Empty == this._city) ? (object)DBNull.Value : this._city) });
                SqlRecordParams.Add(new SqlParameter("@PinCode", SqlDbType.VarChar) { Value = ((string.Empty == this._postcode) ? (object)DBNull.Value : this._postcode) });
                SqlRecordParams.Add(new SqlParameter("@Country", SqlDbType.VarChar) { Value = ((string.Empty == this._country) ? (object)DBNull.Value : this._country) });
                SqlRecordParams.Add(new SqlParameter("@Location", SqlDbType.VarChar) { Value = ((string.Empty == this._location) ? (object)DBNull.Value : this._location) });
                SqlRecordParams.Add(new SqlParameter("@ContactPerson", SqlDbType.VarChar) { Value = ((string.Empty == this._contactperson) ? (object)DBNull.Value : this._contactperson) });
                SqlRecordParams.Add(new SqlParameter("@PhoneNo", SqlDbType.VarChar) { Value = ((string.Empty == this._phoneno) ? (object)DBNull.Value : this._phoneno) });
                SqlRecordParams.Add(new SqlParameter("@AlternatePhoneNo", SqlDbType.VarChar) { Value = ((string.Empty == this._alternatephoneno) ? (object)DBNull.Value : this._alternatephoneno) });
                SqlRecordParams.Add(new SqlParameter("@FaxNo", SqlDbType.VarChar) { Value = ((string.Empty == this._faxno) ? (object)DBNull.Value : this._faxno) });
                SqlRecordParams.Add(new SqlParameter("@Email", SqlDbType.VarChar) { Value = ((string.Empty == this._email) ? (object)DBNull.Value : this._email) });
                SqlRecordParams.Add(new SqlParameter("@Website", SqlDbType.VarChar) { Value = ((string.Empty == this._website) ? (object)DBNull.Value : this._website) });
                SqlRecordParams.Add(new SqlParameter("@Block", SqlDbType.Bit) { Value = ((this._isblock) ? 1 : 0) });

                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });
                
                dt = DataHelper.ExecuteDataset(str_ConnString, "save_Branch", SqlRecordParams.ToArray()).Tables[0];
                //ds = DataHelper.ExecuteDataset(str_ConnString, "save_no_sequence", SqlRecordParams.ToArray());

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[BranchResposibility.cs:check]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@Code", SqlDbType.VarChar) { Value = ((string.Empty == this._branchcode) ? (object)DBNull.Value : this._branchcode) });
                SqlRecordParams.Add(new SqlParameter("@Name", SqlDbType.VarChar) { Value = ((string.Empty == this._branchname) ? (object)DBNull.Value : this._branchname) });
                SqlRecordParams.Add(new SqlParameter("@Add1", SqlDbType.VarChar) { Value = ((string.Empty == this._addline1) ? (object)DBNull.Value : this._addline1) });
                SqlRecordParams.Add(new SqlParameter("@Add2", SqlDbType.VarChar) { Value = ((string.Empty == this._addline2) ? (object)DBNull.Value : this._addline2) });
                SqlRecordParams.Add(new SqlParameter("@City", SqlDbType.VarChar) { Value = ((string.Empty == this._city) ? (object)DBNull.Value : this._city) });
                SqlRecordParams.Add(new SqlParameter("@PinCode", SqlDbType.VarChar) { Value = ((string.Empty == this._postcode) ? (object)DBNull.Value : this._postcode) });
                SqlRecordParams.Add(new SqlParameter("@Country", SqlDbType.VarChar) { Value = ((string.Empty == this._country) ? (object)DBNull.Value : this._country) });
                SqlRecordParams.Add(new SqlParameter("@Location", SqlDbType.VarChar) { Value = ((string.Empty == this._location) ? (object)DBNull.Value : this._location) });
                SqlRecordParams.Add(new SqlParameter("@ContactPerson", SqlDbType.VarChar) { Value = ((string.Empty == this._contactperson) ? (object)DBNull.Value : this._contactperson) });
                SqlRecordParams.Add(new SqlParameter("@PhoneNo", SqlDbType.VarChar) { Value = ((string.Empty == this._phoneno) ? (object)DBNull.Value : this._phoneno) });
                SqlRecordParams.Add(new SqlParameter("@AlternatePhoneNo", SqlDbType.VarChar) { Value = ((string.Empty == this._alternatephoneno) ? (object)DBNull.Value : this._alternatephoneno) });
                SqlRecordParams.Add(new SqlParameter("@FaxNo", SqlDbType.VarChar) { Value = ((string.Empty == this._faxno) ? (object)DBNull.Value : this._faxno) });
                SqlRecordParams.Add(new SqlParameter("@Email", SqlDbType.VarChar) { Value = ((string.Empty == this._email) ? (object)DBNull.Value : this._email) });
                SqlRecordParams.Add(new SqlParameter("@Website", SqlDbType.VarChar) { Value = ((string.Empty == this._website) ? (object)DBNull.Value : this._website) });
                SqlRecordParams.Add(new SqlParameter("@Block", SqlDbType.Bit) { Value = ((this._isblock) ? 1 : 0) });

                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                SqlRecordParams.Add(new SqlParameter("@created_by", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@creator_MAC_add", SqlDbType.VarChar) { Value = ((string.Empty == this._creator_MAC_add) ? (object)DBNull.Value : this._creator_MAC_add) });

                //dt = DataHelper.ExecuteDataset(str_ConnString, "save_no_sequence", SqlRecordParams.ToArray()).Tables[0];
                ds = DataHelper.ExecuteDataset(str_ConnString, "save_Branch", SqlRecordParams.ToArray());

                //if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[BranchResposibility.cs:check]" + expErr.Message;
            }
            finally { }
            return ds;
        }


    }

}
