<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="warehouse-setup.aspx.cs" Inherits="WebAccounts.warehouse_setup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/warehouse-setup.js"></script>
    <title>Warehouse Set-up</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="row">
        <div class="col">
            <p>
                Warehouse
					>
					Setups
					>
					<strong>Warehouse Setup</strong>
            </p>
        </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
        <div class="col">
            <div class="card" id="div_warehousesetup">
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
                                <td><strong>Default Warehouse</strong></td>
                                <td>
                                    <select name="select" class="form-control" id="dd_WareHouseCd">
                                    </select></td>
                                <td><strong>Allow Posting From</strong></td>
                                <td>
                                    <input type="date" class="form-control" id="txt_PostingFrom" /></td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
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
                                <td><strong>Quality Order Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_QualityOrderNo">
                                    </select></td>
                                <td><strong>Picking List Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_PickingListNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Transfer Order</strong></td>
                                <td>
                                    <select class="form-control" id="dd_TransferOrderNo">
                                    </select></td>
                                <td><strong>Packing Slip Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_PackingSlipNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Movement Jounral</strong></td>
                                <td>
                                    <select class="form-control" id="dd_MovementJounralNo">
                                    </select></td>
                                <td><strong>Rejection Note Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_RejectionNoteNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Registration</strong></td>
                                <td>
                                    <select class="form-control" id="dd_RegistrationNo">
                                    </select></td>
                                <td><strong>Inward Gate Entry</strong></td>
                                <td>
                                    <select class="form-control" id="dd_InwardGateEntryNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Is Block</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_IsBlock" /></td>
                                <td><strong>Outward Gate Entry</strong></td>
                                <td>
                                    <select class="form-control" id="dd_OutwardGateEntryNo">
                                    </select></td>
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
