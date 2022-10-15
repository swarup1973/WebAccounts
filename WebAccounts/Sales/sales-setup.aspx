<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="sales-setup.aspx.cs" Inherits="WebAccounts.sales_setup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/sales-setup.js"></script>
    <title>Sales Set-up</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="row">
        <div class="col">
            <p>
                Sales
					>
					Setups
					>
					<strong>Sales Set-up</strong>
            </p>
        </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
        <div class="col">
            <div class="card" id="div_salessetup">
                <div class="card-body">
                    <!-- start role table -->
                    <table id="sales_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                        <thead>
                            <tr>
                                <th>General</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Tax Calcultion Basis</strong></td>
                                <td>
                                    <select name="select" class="form-control" id="dd_TaxCalcBasis">
                                        <option value="BTC">Bill to Customer</option>
                                        <option value="STC">Ship to Customer</option>
                                    </select></td>
                                <td><strong>Overdue Warning</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_OverdueWarning" /></td>
                            </tr>
                            <tr>
                                <td><strong>Salesperson Dimension Code</strong></td>
                                <td>
                                    <select class="form-control" id="dd_SalespersonDimCd">
                                    </select></td>
                                <td><strong>Credit Limit Warning</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_CreditLimitWarning" /></td>
                            </tr>
                            <tr>
                                <td><strong>Reservation used in</strong></td>
                                <td>
                                    <select name="select" class="form-control" id="dd_Reservation">
                                        <option value="M">Manual</option>
                                        <option value="A">Automatic</option>
                                    </select></td>
                                <td><strong>Pick Requirement</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_PickRequirement" /></td>
                            </tr>
                            <tr>
                                <td><strong>Allow Posting From</strong></td>
                                <td>
                                    <input type="date" class="form-control" id="txt_PostingFrom" /></td>
                                <td><strong>Allow Posting to</strong></td>
                                <td>
                                    <input type="date" class="form-control" id="txt_PostingTo" /></td>
                            </tr>
                            <tr>
                                <td><strong>Sales Lead Time</strong></td>
                                <td>
                                    <input type="number" class="form-control" id="txt_SalesLeadTime" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" /></td>
                                <td></td>
                                <td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- end General table -->
                    <div class="clearfix"></div>
                    <table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                        <thead>
                            <tr>
                                <th>No Series</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Customer Master Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_CustomerNo">
                                    </select></td>
                                <td><strong>Sales Order Confirmation Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_SalesOrderConfNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Quote Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_QuotNo">
                                    </select></td>
                                <td><strong>Sales Journal</strong></td>
                                <td>
                                    <select class="form-control" id="dd_SalesJournalNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Quotation Confirmation Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_QuotConfNo">
                                    </select></td>
                                <td><strong>Invoice Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_InvoiceNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Blanket Order Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_BlanketOrderNo">
                                    </select></td>
                                <td><strong>Return Order Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_ReturnOrderNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Blanket Order Release Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_BlanketOrderReleaseNo">
                                    </select></td>
                                <td><strong>Exchange Rate Adjustment</strong></td>
                                <td>
                                    <select class="form-control" id="dd_ExchangeRateAdj">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Sales Order Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_SalesOrderNo">
                                    </select></td>
                                <td><strong>Is Block</strong></td>
                                <td><input type="checkbox" class="form-control" id="chk_IsBlock" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="clearfix"></div>
                    <div class="card-body" style="text-align: center">
                        <button type="button" id="btn_save" class="btn btn-primary" onclick="savedata();">Save</button>
                    </div>


                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <link href="../Administration/administration.css" rel="stylesheet" />
    <script type="text/javascript">

</script>
</asp:Content>
