<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="payables-setup.aspx.cs" Inherits="WebAccounts.payables_setup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/payables-setup.js"></script>
    <title>Payables Set-up</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="row">
        <div class="col">
            <p>
                Payables
					>
					Setups
					>
					<strong>Accounts Payables Set-up</strong>
            </p>
        </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
        <div class="col">
            <div class="card" id="div_payablesetup">
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
                                <td><strong>Allow Posting From</strong></td>
                                <td>
                                    <input type="date" class="form-control" id="txt_PostingFrom" /></td>
                                <td><strong>Allow Posting to</strong></td>
                                <td>
                                    <input type="date" class="form-control" id="txt_PostingTo" /></td>

                            </tr>
                            <tr>
                                <td><strong>External Document No Rquirement </strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_ExDocNoRequirement" /></td>
                                <td></td>
                                <td></td>
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
                                <td><strong>Exchange Rate Adjustment</strong></td>
                                <td>
                                    <select class="form-control" id="dd_ExRateAdj">
                                    </select></td>
                                <td><strong>Receipt List Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_ReceiptListNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Invoice Voucher Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_InvoiceVchNo">
                                    </select></td>
                                <td><strong>Receipt List Voucher Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_ReceiptListVchNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Credit Memo Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_CreditMemoNo">
                                    </select></td>
                                <td><strong>Is Block</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_IsBlock" /></td>
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
