<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="vendor-account-overview.aspx.cs" Inherits="WebAccounts.vendor_account_overview" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/vendor-account-overview.js"></script>
    <title>Vendor Account Overview</title>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                    General Ledger
					>
					Master
					>
					<strong>Vendor Account Overview</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <!-- start role table -->
                        <table id="vendor_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Search Name</th>
                                    <th>Balance</th>
                                    <th>Balance (LCY)</th>
                                    <th>Current Statistics</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-xl" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Vendor Account - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-header">
                    <p>
                        <button type="button" class="btn btn-secondary" id="btnEdit" onclick="doactionModal('edit')" style="display: inline-block;">Edit</button>
                        <button type="button" class="btn btn-secondary" id="btnDelete" onclick="doactionModal('delete')" style="display: inline-block;">Delete</button>
                        <span class="text-danger">*</span> indicates a required field.
                    </p>
                </div>
                <form>
                    <div class="modal-body" id="div_modal">
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>General</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Code<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_VendCd" maxlength="30" />
                            </div>
                            <div class="col-sm-3">
                                Balance
                            </div>
                            <div class="col-sm-3">
                                <label id="lbl_balance">0</label>
                            </div>
                            <div class="col-sm-3">
                                Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_VendName" maxlength="200" />
                            </div>
                            <div class="col-sm-3">
                                Balance LCY
                            </div>
                            <div class="col-sm-3">
                                <label id="lbl_balancelcy">0</label>
                            </div>
                            <div class="col-sm-3">
                                Search Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_VendSearch" maxlength="200" />
                            </div>
                            <div class="col-sm-3">
                                Branch Applicable
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_BranchCd">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Credit Limit
                            </div>
                            <div class="col-sm-3">
                                <input type="number" id="txt_CrLimit" min="0" value="0" step="0.01" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" />
                            </div>
                            <div class="col-sm-3">
                                Entity Type<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_EntityType">
                                    <option value="C">Company</option>
                                    <option value="P">Person</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Vendor Posting Group<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_VendGrpCd">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Person Responsible
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_PersonRespId">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Foreign Vendor?
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chk_IsForeignVendor" />
                            </div>
                            <div class="col-sm-3">
                                Block<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_Block">
                                    <option value="N">No</option>
                                    <option value="I">Invoice</option>
                                    <option value="A">All</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Currency<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_CurrCd">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Last Transaction Date
                            </div>
                            <div class="col-sm-3">
                                <%--<input type="date" id="txt_lasttransactiondate" />--%>
                                <label id="txt_lasttransactiondate"></label>
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Credit Rating
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_CreditRating" maxlength="100" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Contacts</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Address-1
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Address1" maxlength="300" />
                            </div>
                            <div class="col-sm-3">
                                Phone No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_PhoneNo" maxlength="17" />
                            </div>
                            <div class="col-sm-3">
                                Address-2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Address2" maxlength="300" />
                            </div>
                            <div class="col-sm-3">
                                Alternate No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_AlternateNo" maxlength="17" />
                            </div>
                            <div class="col-sm-3">
                                Pin<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Pin" maxlength="20" />
                            </div>
                            <div class="col-sm-3">
                                Fax No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_FaxNo" maxlength="17" />
                            </div>
                            <div class="col-sm-3">
                                City<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_City" maxlength="17" />
                            </div>
                            <div class="col-sm-3">
                                Contact Person
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_ContactPerson" maxlength="200" />
                            </div>
                            <div class="col-sm-3">
                                Country<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_CountryCd" onchange="VendorAccountOverviewObject.do_loadstate(this.value);">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Email
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Email" maxlength="250" />
                            </div>
                            <div class="col-sm-3">
                                County<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_StateCd">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Website
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Website" maxlength="250" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Invoice &amp; Payment</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Prepayment %
                            </div>
                            <div class="col-sm-3">
                                <input type="number" id="txt_PrePmtPer" min="0" value="0" step="0.01" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Payment Term
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_PmtTermsCd">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Bank Account (Default) 
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_VendBankId">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Payment Mothod 
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_PmtMethodCd">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Print Name on Check
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_PrintNameOnCheque" maxlength="100" />
                            </div>
                            <div class="col-sm-3">
                                Price Includes Sales Tax?
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chk_PriceIncludeST" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Receiving</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Shipment Method
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_ShipMethodCd">
                                </select>
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Lead Time in days
                            </div>
                            <div class="col-sm-3">
                                <input type="number" id="txt_LeadTimeInDay" pattern="^[0-9]*$" onkeypress="return onlyNumberKey(event)" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Tax</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Tax ID/AC No.
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_TaxAcNo" maxlength="20" />
                            </div>
                            <div class="col-sm-3">
                                Witholding Tax
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chk_IsWitholdingTaxApp" onchange="OnchangeIsWitholdingTaxApp()" />
                            </div>
                            <div class="col-sm-3">
                                1099 Eligible ?
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chk_Is1099App" />
                            </div>
                            <div class="col-sm-3">
                                Witholding Tax Group
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_WHTaxGrpCd">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Nature of Business
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_BusinessNatureCd">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Tax Exemption No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_TaxExampNo" maxlength="20" />
                            </div>
                            <div class="col-sm-3">
                                GST Registration No.
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_GstRegdNo" maxlength="20" />
                            </div>
                            <div class="col-sm-3">
                                Sels Tax Group
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_SalesTaxGrpCd">
                                </select>
                            </div>
                        </div>


                    </div>
                    <div class="modal-footer">
                        <button type="button" id="btn_save" class="btn btn-primary" onclick="savedata();">Save</button>
                        <button type="button" id="btn_cancel" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <link href="../Administration/administration.css" rel="stylesheet" />
    <script type="text/javascript">

</script>


</asp:Content>
