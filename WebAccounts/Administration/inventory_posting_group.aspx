<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="inventory_posting_group.aspx.cs" Inherits="WebAccounts.inventory_posting_group" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/inventory_posting_group.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="row">
            <div class="col">
                Administration
					>
					Setups
					>
					<a href="posting_setup.aspx" class="text-dark page_path_link">Posting Setup</a>
					>
					<strong>Inventory Posting</strong>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <table id="inventory-posting-group-table"
                            class="table table-striped table-hover table-condensed projects display datatable width-100"
                            style="width: 100%;">
                            <thead>
                                <tr>
                                    <th class="sticky_header">Code</th>
                                    <th class="sticky_header">Description</th>
                                    <th>Block</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Role</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">
                    <div class="form-group row">
                        <div class="col-sm-6">
                            <label for="input">Code</label>
                        </div>
                        <div class="col-sm-6">
                            <input type="text" id="txt_code" maxlength="30" class="form-control">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-6">
                            <label for="input">Description</label>
                        </div>
                        <div class="col-sm-6">
                            <textarea id="txt_description" maxlength="200"></textarea>
                        </div>
                    </div>
                    <div class="form-group row" id="div_block">
                        <div class="col-sm-6">
                            <label for="input">Block</label>
                        </div>
                        <div class="col-sm-6">
                            <input type="checkbox" class="form-control" id="chk_isblocked" />
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="saverole();">Save</button>
                </div>

            </div>
        </div>
    </div>


    <!-- Modal Posting Set-up -->
    <div class="modal fade" id="myModalSETUP" tabindex="-1">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Posting Set-up</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Group</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txt_groupcode" maxlength="30" readonly>
                            </div>
                        </div>

                        <h5>Sales</h5>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Sales A/C</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_Sales">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Sales Return/Cr. Memo A/C</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_SalesReturnCrMemo">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Sales Item Disc. A/C</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_SalesItemDisc">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Sales Invoice Disc. A/C</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_SalesInvoiceDisc">
                                </select>
                            </div>
                        </div>

                        <h5>Purchase</h5>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Purchase A/C</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_Purchase">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Purchase Return/Cr. Memo A/C</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_PurchReturnCrMemo">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Purchase Item Disc. A/C</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_PurchItemDisc">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Purchase Invoice Disc. A/C</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_PurchInvoiceDisc">
                                </select>
                            </div>
                        </div>

                        <h5>Inventory</h5>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Inventory AC</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_Inventory">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Inventory Profit & Loss</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_InventoryPL">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Applied Cost of Purchase</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_InventoryAppliedCostPurch">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Cost of Goods Sold</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_InventoryCGS">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Inv. Purch. Varience AC</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_InventoryPurchVarience">
                                </select>
                            </div>
                        </div>

                        <h5>Expected Cost &amp; Revenue</h5>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Expected Cost of Purchase</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_ECR_ExpCostOfPurch">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Expected Liability for Purchase</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_ECR_ExpLiaForPurch">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Expected Receivable A/C</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_ECR_ExpReceivable">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Expected COGS</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_AcCd_ECR_ExpCOGS">
                                </select>
                            </div>
                        </div>
<%--                        <div class="form-group row" id="div_block">
                            <div class="col-sm-6">
                                <label for="input">Block</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="checkbox" class="form-control" id="chk_isblocked" />
                            </div>
                        </div>--%>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" id="btnbankpost" class="btn btn-primary" onclick="saveacnt();">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <link href="administration.css" rel="stylesheet" />
    <script type="text/javascript">

</script>
</asp:Content>
