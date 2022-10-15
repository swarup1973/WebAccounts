<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="procurement-setup.aspx.cs" Inherits="WebAccounts.procurement_setup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/procurement-setup.js"></script>
    <title>Procurement Set-up</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="row">
        <div class="col">
            <p>
                Procurement
					>
					Setups
					>
					<strong>Procurement Set-up</strong>
            </p>
        </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
        <div class="col">
            <div class="card" id="div_procurementsetup">
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
                                <td><strong>Accept Overdelivery</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_AcceptOverdelivery" /></td>
                                <td><strong>Accept Underdelivery</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_AcceptUnderdelivery" /></td>
                            </tr>

                            <tr>
                                <td><strong>Allow Posting From</strong></td>
                                <td>
                                    <input type="date" class="form-control" id="txt_PostingFrom" /></td>
                                <td><strong>Allow Posting to</strong></td>
                                <td>
                                    <input type="date" class="form-control" id="txt_PostingTo" /></td>
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
                                <td><strong>Vendor Master Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_VendorMasterNo">
                                    </select></td>
                                <td><strong>Purchase Order Confirmation Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_POConfNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Quote Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_QuotNo">
                                    </select></td>
                                <td><strong>Request for Quotation Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_Request_QuotNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Blanket Order Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_BlanketOrderNo">
                                    </select></td>
                                <td><strong>Quotation Confirmation Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_QuotConfNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Blanket Order Release Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_BlanketOrderReleaseNo">
                                    </select></td>
                                <td><strong>Return Order Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_ReturnOrderNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Purchase Order Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_PONo">
                                    </select></td>
                                <td><strong>Purchase Journal</strong></td>
                                <td>
                                    <select class="form-control" id="dd_PurchaseJournal">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Is Block</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_IsBlock" /></td>
                                <td></td>
                                <td></td>
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
