<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="customer-overview.aspx.cs" Inherits="WebAccounts.customer_overview" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/customer-overview.js"></script>
    <title>Customer Overview</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                    Receivables
					>
					Master
					>
					<strong>Customer Overview</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <!-- start role table -->
                        <table id="grid_customer" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
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
                                <tr>
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
                    <h5 class="modal-title">Customer - New</h5>
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
                    <div class="modal-body"  id="div_modal">
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
                                <input type="text" id="txt_CustCd" maxlength="30" />
                            </div>
                            <div class="col-sm-3">
                                Balance
                            </div>
                            <div class="col-sm-3">
                                <label id="lbl_balance" />
                            </div>
                            <div class="col-sm-3">
                                Name<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_CustName" maxlength="200" />
                            </div>
                            <div class="col-sm-3">
                                Balance LCY
                            </div>
                            <div class="col-sm-3">
                                <label id="lbl_balancelcy" />
                            </div>
                            <div class="col-sm-3">
                                Search Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_CustSearch" maxlength="200" />
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
                                    <option value=""></option>
                                    <option value="C">Company</option>
                                    <option value="P">Person</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Customer Posting Group<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_CustGrpCd">
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
                                Foreign Customer?
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chk_IsForeignCust" />
                            </div>
                            <div class="col-sm-3">
                                Block<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_Block">
                                    <option value="N" selected>No</option>
                                    <option value="S">Ship</option>
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
                                <label id="lbl_lasttransactiondate" />
                            </div>
                            <div class="col-sm-3">
                                Gov. Identification No.
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_GovtIdNo" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
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
                                <input type="text" id="txt_City" maxlength="100" />
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
                                <select id="dd_CountryCd" onchange="CustomerOverviewObject.do_loadstate(this);">
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
                                Bill to Customer Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_BillToCust" maxlength="100" />
                            </div>
                            <div class="col-sm-3">
                                Finance Charge Term
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_FinChgTermCd">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Prepayment %
                            </div>
                            <div class="col-sm-3">
                                <input type="number" id="txt_PrePmtPer"  min="0" value="0" step="0.01" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" />
                            </div>
                            <div class="col-sm-3">
                                Discount Tollerence %
                            </div>
                            <div class="col-sm-3">
                                <input type="number" id="txt_DiscTollerancePer" min="0" value="0" step="0.01" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" />
                            </div>
                            <div class="col-sm-3">
                                Payment Term
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_PmtTermsCd">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Price Includes Sales Tax? 
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chk_PriceIncludeST" />
                            </div>
                            <div class="col-sm-3">
                                Payment Mothod 
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_PmtMethodCd">
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Shipping</strong>
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
                                Reserve 
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_Reserve">
                                    <option value="A">Automatic</option>
                                    <option value="M">Manual-Optional</option>
                                    <option value="N" selected>Never</option>
                                </select>
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
                                <strong>Shipping Address</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Same as Primary Address?
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chk_ShipAddSameAsPrimary"  onclick="copydata(this);" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Ship to Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_ShipToName" maxlength="100" />
                            </div>
                            <div class="col-sm-3">
                                Phone No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Ship_PhoneNo" maxlength="17" />
                            </div>
                            <div class="col-sm-3">
                                Address-1
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Ship_Address1" maxlength="300" />
                            </div>
                            <div class="col-sm-3">
                                Alternare No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Ship_AlternateNo" maxlength="17" />
                            </div>
                            <div class="col-sm-3">
                                Address-2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Ship_Address2" maxlength="300" />
                            </div>
                            <div class="col-sm-3">
                                Fax No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Ship_FaxNo" maxlength="17" />
                            </div>
                            <div class="col-sm-3">
                                Pin<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Ship_Pin" maxlength="20" />
                            </div>
                            <div class="col-sm-3">
                                Contact Person
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Ship_ContactPerson" maxlength="200" />
                            </div>
                            <div class="col-sm-3">
                                City<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Ship_City" maxlength="100" />
                            </div>
                            <div class="col-sm-3">
                                Email
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Ship_Email" maxlength="250" />
                            </div>
                            <div class="col-sm-3">
                                Country<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_Ship_CountryCd" onchange="CustomerOverviewObject.do_loadstate(this);">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Website
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Ship_Website" maxlength="250" />
                            </div>
                            <div class="col-sm-3">
                                County<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_Ship_StateCd">
                                </select>
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Invoice Address</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Same as Primary Address?
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chk_InvAddSameAsPrimary" onclick="copydata(this);" />
                            </div>
                            <div class="col-sm-3">
                                Same as Shipping Address	 
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chk_InvAddSameAsShip" onclick="copydata(this);" />
                            </div>
                            <div class="col-sm-3">
                                Invoice to Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_InvToName" maxlength="100" />
                            </div>
                            <div class="col-sm-3">
                                Phone No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Inv_PhoneNo" maxlength="17" />
                            </div>
                            <div class="col-sm-3">
                                Address-1
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Inv_Address1" maxlength="300" />
                            </div>
                            <div class="col-sm-3">
                                Alternare No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Inv_AlternateNo" maxlength="17" />
                            </div>
                            <div class="col-sm-3">
                                Address-2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Inv_Address2" maxlength="300" />
                            </div>
                            <div class="col-sm-3">
                                Fax No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Inv_FaxNo" maxlength="17" />
                            </div>
                            <div class="col-sm-3">
                                Pin<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Inv_Pin" maxlength="20" />
                            </div>
                            <div class="col-sm-3">
                                Contact Person
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Inv_ContactPerson" maxlength="200" />
                            </div>
                            <div class="col-sm-3">
                                City<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Inv_City" maxlength="100" />
                            </div>
                            <div class="col-sm-3">
                                Email
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Inv_Email" maxlength="250" />
                            </div>
                            <div class="col-sm-3">
                                Country<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_Inv_CountryCd" onchange="CustomerOverviewObject.do_loadstate(this);">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Website
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_Inv_Website" maxlength="250" />
                            </div>
                            <div class="col-sm-3">
                                County<span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_Inv_StateCd">
                                </select>
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
                                GST Registration No.
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_GstRegdNo" maxlength="20" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Tax Exemption No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txt_TaxExampNo" maxlength="20" />
                            </div>
                            <div class="col-sm-3">
                                Nature of Business
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_BusinessNatureCd">
                                </select>
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
