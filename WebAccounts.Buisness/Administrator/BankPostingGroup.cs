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
    public class BankPostingGroup
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _code = string.Empty;
        public string _name = string.Empty;
        public string _bankledger = string.Empty;
        public string _isblock = string.Empty;
        public string _createdby = string.Empty;
        public string _cocd = string.Empty;

        public DataSet GetRoleCenter(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                ds = DataHelper.ExecuteDataset(str_ConnString, "get_Administrator_RoleCenter", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[Administrator_Role.cs:GetRoleCenter]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_GrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this._code) ? (object)DBNull.Value : this._code) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpName", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_BankLedger", SqlDbType.VarChar) { Value = ((string.Empty == this._bankledger) ? (object)DBNull.Value : this._bankledger) });
                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Administrator_BankPosting_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[BankPostingGroup.cs:RoleOperation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_GrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this._code) ? (object)DBNull.Value : this._code) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpName", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_BankLedger", SqlDbType.VarChar) { Value = ((string.Empty == this._bankledger) ? (object)DBNull.Value : this._bankledger) });
                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "Administrator_BankPosting_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[BankPostingGroup.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }

    public class CustomerPostingGroup
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _code = string.Empty;
        public string _name = string.Empty;
        public string _AcCd_Receivable = string.Empty;
        public string _AcCd_PmtDisc = string.Empty;
        public string _AcCd_RO = string.Empty;
        public string _AcCd_PrePmt = string.Empty;
        public string _isblock = string.Empty;
        public string _createdby = string.Empty;
        public string _cocd = string.Empty;

        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this._code) ? (object)DBNull.Value : this._code) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpName", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_Receivable", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_Receivable) ? (object)DBNull.Value : this._AcCd_Receivable) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_PmtDisc", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_PmtDisc) ? (object)DBNull.Value : this._AcCd_PmtDisc) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_RO", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_RO) ? (object)DBNull.Value : this._AcCd_RO) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_PrePmt", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_PrePmt) ? (object)DBNull.Value : this._AcCd_PrePmt) });
                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Administrator_CustomerPosting_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[BankPostingGroup.cs:RoleOperation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_GrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this._code) ? (object)DBNull.Value : this._code) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpName", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_Receivable", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_Receivable) ? (object)DBNull.Value : this._AcCd_Receivable) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_PmtDisc", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_PmtDisc) ? (object)DBNull.Value : this._AcCd_PmtDisc) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_RO", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_RO) ? (object)DBNull.Value : this._AcCd_RO) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_PrePmt", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_PrePmt) ? (object)DBNull.Value : this._AcCd_PrePmt) });
                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "Administrator_CustomerPosting_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[BankPostingGroup.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }

    public class FixedassetPostingGroup
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _code = string.Empty;
        public string _name = string.Empty;
        public string _AcCd_Acquisition = string.Empty;
        public string _AcCd_AccumDepreciation = string.Empty;

        public string _AcCd_AccumOnDisposal = string.Empty;
        public string _AcCd_AccumDepreOnDisposal = string.Empty;
        public string _AcCd_GainOnSaleDisposal = string.Empty;
        public string _AcCd_LossOnSaleDisposal = string.Empty;
        public string _AcCd_RepairMaintenance = string.Empty;
        public string _AcCd_DepExpns = string.Empty;
        public string _isblock = string.Empty;
        public string _createdby = string.Empty;
        public string _cocd = string.Empty;

        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this._code) ? (object)DBNull.Value : this._code) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpName", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_Acquisition", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_Acquisition) ? (object)DBNull.Value : this._AcCd_Acquisition) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_AccumDepreciation", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_AccumDepreciation) ? (object)DBNull.Value : this._AcCd_AccumDepreciation) });
                              
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_AccumOnDisposal", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_AccumOnDisposal) ? (object)DBNull.Value : this._AcCd_AccumOnDisposal) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_AccumDepreOnDisposal", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_AccumDepreOnDisposal) ? (object)DBNull.Value : this._AcCd_AccumDepreOnDisposal) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_GainOnSaleDisposal", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_GainOnSaleDisposal) ? (object)DBNull.Value : this._AcCd_GainOnSaleDisposal) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_LossOnSaleDisposal", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_LossOnSaleDisposal) ? (object)DBNull.Value : this._AcCd_LossOnSaleDisposal) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_RepairMaintenance", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_RepairMaintenance) ? (object)DBNull.Value : this._AcCd_RepairMaintenance) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_DepExpns", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_DepExpns) ? (object)DBNull.Value : this._AcCd_DepExpns) });
                    
                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Administrator_FixedAssetPosting_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[FixedassetPostingGroup.cs:RoleOperation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_GrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this._code) ? (object)DBNull.Value : this._code) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpName", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_Acquisition", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_Acquisition) ? (object)DBNull.Value : this._AcCd_Acquisition) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_AccumDepreciation", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_AccumDepreciation) ? (object)DBNull.Value : this._AcCd_AccumDepreciation) });

                SqlRecordParams.Add(new SqlParameter("@p_AcCd_AccumOnDisposal", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_AccumOnDisposal) ? (object)DBNull.Value : this._AcCd_AccumOnDisposal) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_AccumDepreOnDisposal", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_AccumDepreOnDisposal) ? (object)DBNull.Value : this._AcCd_AccumDepreOnDisposal) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_GainOnSaleDisposal", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_GainOnSaleDisposal) ? (object)DBNull.Value : this._AcCd_GainOnSaleDisposal) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_LossOnSaleDisposal", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_LossOnSaleDisposal) ? (object)DBNull.Value : this._AcCd_LossOnSaleDisposal) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_RepairMaintenance", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_RepairMaintenance) ? (object)DBNull.Value : this._AcCd_RepairMaintenance) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_DepExpns", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_DepExpns) ? (object)DBNull.Value : this._AcCd_DepExpns) });

                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "Administrator_FixedAssetPosting_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[FixedassetPostingGroup.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }

    public class VendorPostingGroup
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _code = string.Empty;
        public string _name = string.Empty;
        public string _AcCd_Payable = string.Empty;
        public string _AcCd_PmtDisc = string.Empty;
        public string _AcCd_RO = string.Empty;
        public string _AcCd_PrePmt = string.Empty;
        public string _isblock = string.Empty;
        public string _createdby = string.Empty;
        public string _cocd = string.Empty;

        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this._code) ? (object)DBNull.Value : this._code) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpName", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_Payable", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_Payable) ? (object)DBNull.Value : this._AcCd_Payable) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_PmtDisc", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_PmtDisc) ? (object)DBNull.Value : this._AcCd_PmtDisc) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_RO", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_RO) ? (object)DBNull.Value : this._AcCd_RO) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_PrePmt", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_PrePmt) ? (object)DBNull.Value : this._AcCd_PrePmt) });
                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Administrator_VendorPosting_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[VendorPostingGroup.cs:RoleOperation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_GrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this._code) ? (object)DBNull.Value : this._code) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpName", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_Payable", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_Payable) ? (object)DBNull.Value : this._AcCd_Payable) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_PmtDisc", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_PmtDisc) ? (object)DBNull.Value : this._AcCd_PmtDisc) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_RO", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_RO) ? (object)DBNull.Value : this._AcCd_RO) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_PrePmt", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_PrePmt) ? (object)DBNull.Value : this._AcCd_PrePmt) });
                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });
                

                dt = DataHelper.ExecuteDataset(str_ConnString, "Administrator_VendorPosting_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[VendorPostingGroup.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }

    public class InventoryPostingGroup
    {
        public string _rowid = string.Empty;
        public string _mode = string.Empty;
        public string _code = string.Empty;
        public string _name = string.Empty;

        public string _AcCd_Sales = string.Empty;
        public string _AcCd_SalesReturnCrMemo = string.Empty;
        public string _AcCd_SalesItemDisc = string.Empty;
        public string _AcCd_SalesInvoiceDisc = string.Empty;

        public string _AcCd_Purchase = string.Empty;
        public string _AcCd_PurchReturnCrMemo = string.Empty;
        public string _AcCd_PurchItemDisc = string.Empty;
        public string _AcCd_PurchInvoiceDisc = string.Empty;

        public string _AcCd_Inventory = string.Empty;
        public string _AcCd_InventoryPL = string.Empty;
        public string _AcCd_InventoryAppliedCostPurch = string.Empty;
        public string _AcCd_InventoryCGS = string.Empty;
        public string _AcCd_InventoryPurchVarience = string.Empty;

        public string _AcCd_ECR_ExpCostOfPurch = string.Empty;
        public string _AcCd_ECR_ExpLiaForPurch = string.Empty;
        public string _AcCd_ECR_ExpReceivable = string.Empty;
        public string _AcCd_ECR_ExpCOGS = string.Empty;

        public string _isblock = string.Empty;
        public string _createdby = string.Empty;
        public string _cocd = string.Empty;

        public DataSet Operation(string str_ConnString, ref string str_catchmessage)
        {
            DataSet ds = null;
            try
            {
                List<SqlParameter> SqlRecordParams = new List<SqlParameter>();
                SqlRecordParams.Add(new SqlParameter("@p_mode", SqlDbType.NVarChar) { Value = this._mode });
                SqlRecordParams.Add(new SqlParameter("@p_RowId", SqlDbType.BigInt) { Value = ((string.Empty == this._rowid) ? (object)DBNull.Value : Int64.Parse(this._rowid)) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this._code) ? (object)DBNull.Value : this._code) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpName", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });

                SqlRecordParams.Add(new SqlParameter("@p_AcCd_Sales", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_Sales) ? (object)DBNull.Value : this._AcCd_Sales) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_SalesReturnCrMemo", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_SalesReturnCrMemo) ? (object)DBNull.Value : this._AcCd_SalesReturnCrMemo) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_SalesItemDisc", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_SalesItemDisc) ? (object)DBNull.Value : this._AcCd_SalesItemDisc) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_SalesInvoiceDisc", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_SalesInvoiceDisc) ? (object)DBNull.Value : this._AcCd_SalesInvoiceDisc) });

                SqlRecordParams.Add(new SqlParameter("@p_AcCd_Purchase", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_Purchase) ? (object)DBNull.Value : this._AcCd_Purchase) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_PurchReturnCrMemo", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_PurchReturnCrMemo) ? (object)DBNull.Value : this._AcCd_PurchReturnCrMemo) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_PurchItemDisc", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_PurchItemDisc) ? (object)DBNull.Value : this._AcCd_PurchItemDisc) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_PurchInvoiceDisc", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_PurchInvoiceDisc) ? (object)DBNull.Value : this._AcCd_PurchInvoiceDisc) });

                SqlRecordParams.Add(new SqlParameter("@p_AcCd_Inventory", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_Inventory) ? (object)DBNull.Value : this._AcCd_Inventory) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_InventoryPL", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_InventoryPL) ? (object)DBNull.Value : this._AcCd_InventoryPL) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_InventoryAppliedCostPurch", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_InventoryAppliedCostPurch) ? (object)DBNull.Value : this._AcCd_InventoryAppliedCostPurch) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_InventoryCGS", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_InventoryCGS) ? (object)DBNull.Value : this._AcCd_InventoryCGS) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_InventoryPurchVarience", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_InventoryPurchVarience) ? (object)DBNull.Value : this._AcCd_InventoryPurchVarience) });

                SqlRecordParams.Add(new SqlParameter("@p_AcCd_ECR_ExpCostOfPurch", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_ECR_ExpCostOfPurch) ? (object)DBNull.Value : this._AcCd_ECR_ExpCostOfPurch) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_ECR_ExpLiaForPurch", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_ECR_ExpLiaForPurch) ? (object)DBNull.Value : this._AcCd_ECR_ExpLiaForPurch) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_ECR_ExpReceivable", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_ECR_ExpReceivable) ? (object)DBNull.Value : this._AcCd_ECR_ExpReceivable) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_ECR_ExpCOGS", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_ECR_ExpCOGS) ? (object)DBNull.Value : this._AcCd_ECR_ExpCOGS) });


                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });

                SqlRecordParams.Add(new SqlParameter("@p_cocd", SqlDbType.NVarChar) { Value = this._cocd });

                ds = DataHelper.ExecuteDataset(str_ConnString, "Administrator_InventoryPosting_operation", SqlRecordParams.ToArray());
            }
            catch (Exception expErr)
            {
                ds = null;
                str_catchmessage = "[InventoryPostingGroup.cs:RoleOperation]" + expErr.Message;
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
                SqlRecordParams.Add(new SqlParameter("@p_GrpCd", SqlDbType.VarChar) { Value = ((string.Empty == this._code) ? (object)DBNull.Value : this._code) });
                SqlRecordParams.Add(new SqlParameter("@p_GrpName", SqlDbType.VarChar) { Value = ((string.Empty == this._name) ? (object)DBNull.Value : this._name) });

                SqlRecordParams.Add(new SqlParameter("@p_AcCd_Sales", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_Sales) ? (object)DBNull.Value : this._AcCd_Sales) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_SalesReturnCrMemo", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_SalesReturnCrMemo) ? (object)DBNull.Value : this._AcCd_SalesReturnCrMemo) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_SalesItemDisc", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_SalesItemDisc) ? (object)DBNull.Value : this._AcCd_SalesItemDisc) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_SalesInvoiceDisc", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_SalesInvoiceDisc) ? (object)DBNull.Value : this._AcCd_SalesInvoiceDisc) });

                SqlRecordParams.Add(new SqlParameter("@p_AcCd_Purchase", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_Purchase) ? (object)DBNull.Value : this._AcCd_Purchase) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_PurchReturnCrMemo", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_PurchReturnCrMemo) ? (object)DBNull.Value : this._AcCd_PurchReturnCrMemo) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_PurchItemDisc", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_PurchItemDisc) ? (object)DBNull.Value : this._AcCd_PurchItemDisc) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_PurchInvoiceDisc", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_PurchInvoiceDisc) ? (object)DBNull.Value : this._AcCd_PurchInvoiceDisc) });

                SqlRecordParams.Add(new SqlParameter("@p_AcCd_Inventory", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_Inventory) ? (object)DBNull.Value : this._AcCd_Inventory) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_InventoryPL", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_InventoryPL) ? (object)DBNull.Value : this._AcCd_InventoryPL) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_InventoryAppliedCostPurch", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_InventoryAppliedCostPurch) ? (object)DBNull.Value : this._AcCd_InventoryAppliedCostPurch) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_InventoryCGS", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_InventoryCGS) ? (object)DBNull.Value : this._AcCd_InventoryCGS) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_InventoryPurchVarience", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_InventoryPurchVarience) ? (object)DBNull.Value : this._AcCd_InventoryPurchVarience) });

                SqlRecordParams.Add(new SqlParameter("@p_AcCd_ECR_ExpCostOfPurch", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_ECR_ExpCostOfPurch) ? (object)DBNull.Value : this._AcCd_ECR_ExpCostOfPurch) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_ECR_ExpLiaForPurch", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_ECR_ExpLiaForPurch) ? (object)DBNull.Value : this._AcCd_ECR_ExpLiaForPurch) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_ECR_ExpReceivable", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_ECR_ExpReceivable) ? (object)DBNull.Value : this._AcCd_ECR_ExpReceivable) });
                SqlRecordParams.Add(new SqlParameter("@p_AcCd_ECR_ExpCOGS", SqlDbType.VarChar) { Value = ((string.Empty == this._AcCd_ECR_ExpCOGS) ? (object)DBNull.Value : this._AcCd_ECR_ExpCOGS) });

                SqlRecordParams.Add(new SqlParameter("@p_isblock", SqlDbType.Bit) { Value = ((string.Empty == this._isblock) ? (object)DBNull.Value : Convert.ToBoolean(this._isblock)) });
                SqlRecordParams.Add(new SqlParameter("@p_createdby", SqlDbType.UniqueIdentifier) { Value = ((string.Empty == this._createdby) ? (object)DBNull.Value : (object)Guid.Parse(this._createdby)) });

                dt = DataHelper.ExecuteDataset(str_ConnString, "Administrator_InventoryPosting_operation", SqlRecordParams.ToArray()).Tables[0];

                if (Convert.ToInt32(dt.Rows[0]["dataexists"].ToString()) > 0) isexist = true;
            }
            catch (Exception expErr)
            {
                dt = null;
                str_catchmessage = "[InventoryPostingGroup.cs:check]" + expErr.Message;
            }
            finally { }
            return isexist;
        }
    }

}
