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
    public class common
    {
        public string _cocd = string.Empty;
        public string _countryCd = string.Empty;

        public DataSet getAccountsLookup(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@P_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "get_Acc_forsetupposting", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[common.cs:getAccountsLookup]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getPostingGroupLookup(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@P_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "get_postingGroup", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[common.cs:getPostingGroupLookup]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getCurrencyLookup(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@P_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "get_Currency", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[common.cs:getCurrencyLookup]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getPersonResponsibleLookup(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@P_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "get_PersonResponsible", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[common.cs:getPersonResponsibleLookup]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getCountryLookup(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                ds = DataHelper.ExecuteDataset(str_ConnString, "get_Country", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[common.cs:getCountryLookup]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getCountyLookup(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@P_CountryCd", SqlDbType.VarChar) { Value = ((string.Empty == this._countryCd) ? (object)DBNull.Value : this._countryCd) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "get_County", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[common.cs:getCountyLookup]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getVendorAccountsOverviewLookup(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "vendraccountoverview_lookup", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[common.cs:getVendorAccountsOverviewLookup]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getVendorCustomerOverviewLookup(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "customeroverview_lookup", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[common.cs:getVendorCustomerOverviewLookup]" + expErr.Message;
            }
            finally { }
            return ds;
        }

		public DataSet getVendorCustomerDimension(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });
                ds = DataHelper.ExecuteDataset(str_ConnString, "get_dimension_VendorCustomer", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[common.cs:getVendorCustomerOverviewLookup]" + expErr.Message;
            }
            finally { }
            return ds;
        }

        public DataSet getAdministrator_NoSequence(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_CoCd", SqlDbType.VarChar) { Value = ((string.Empty == this._cocd) ? (object)DBNull.Value : this._cocd) });

                ds = DataHelper.ExecuteDataset(str_ConnString, "get_Administrator_NoSequence", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[common.cs:Operation]" + expErr.Message;
            }
            finally { }
            return ds;
        }
    }
}
