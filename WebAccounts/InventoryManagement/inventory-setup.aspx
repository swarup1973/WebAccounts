<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="inventory-setup.aspx.cs" Inherits="WebAccounts.inventory_setup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/inventory-setup.js"></script>
    <title>Inventory Set-up</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="row">
        <div class="col">
            <p>
                Inventory Management
					>
					Setups
					>
					<strong>Inventory Set-up</strong>
            </p>
        </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
        <div class="col">
            <div class="card"  id="div_inventorysetup">
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
                                <td><strong>Allow Consumption after Receipt Note</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_AllowConsumAfterRNote" /></td>
                                <td><strong>Receiving Requirement</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_ReceivingRequirement" /></td>
                            </tr>
                            <tr>
                                <td><strong>Quarantice Requirement</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_QuaranticeRequirement" /></td>
                                <td><strong>Picking Requirement</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_PickingRequirement" /></td>
                            </tr>
                            <tr>
                                <td><strong>Registration Required</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_RegistrationRequired" /></td>
                                <td><strong>Reservation Requirement</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_ReservationRequirement" /></td>
                            </tr>
                            <tr>
                                <td><strong>Location Mandatory</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_LocationMandatory" /></td>
                                <td><strong>Auto/Manual Reservation</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_Auto_ManualReservation" /></td>
                            </tr>
                            <tr>
                                <td><strong>Bar Code Setup</strong></td>
                                <td>
                                    <select name="select" class="form-control" id="dd_BarCodeSetup">
                                    </select></td>
                                <td><strong>Lock Item Movement During Count</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_LockItemMovementDuringCount" /></td>
                            </tr>
                            <tr>
                                <td><strong>Activate Quality Management</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_ActivateQualityManagement" /></td>
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
                                <td><strong>Item Master Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_ItemMasterNo">
                                    </select></td>
                                <td><strong>Counting Journal</strong></td>
                                <td>
                                    <select class="form-control" id="dd_CountingJournalNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Closing Voucher Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_ClosingVchNo">
                                    </select></td>
                                <td><strong>Re-classification Journal</strong></td>
                                <td>
                                    <select class="form-control" id="dd_ReClassificationJournal">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Requisition Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_RequisitionNo">
                                    </select></td>
                                <td><strong>Revaluation Journal</strong></td>
                                <td>
                                    <select class="form-control" id="dd_RevaluationJournal">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Transfer Order</strong></td>
                                <td>
                                    <select class="form-control" id="dd_TransferOrder">
                                    </select></td>
                                <td><strong>Update Unit Cost</strong></td>
                                <td>
                                    <select class="form-control" id="dd_UpdateUnitCost">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Item Journal</strong></td>
                                <td>
                                    <select class="form-control" id="dd_ItemJournalNo">
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
