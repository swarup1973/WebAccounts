<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="item-master-overview.aspx.cs" Inherits="WebAccounts.InventoryManagement.item_master_overview" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Item Master Overview - Inventory Management</title>
    <script type="text/javascript" src="js/itemmasteroverview.js?v=1.2"></script>
     
    <style>
    .dataTables_length{
        margin-top : 85px;
        position : absolute;
    }
    .requ {
        color : #F00;
    }
      table.dataTable.display tbody tr:hover.selected > .sorting_1, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_1 {
        background-color: #a2aec7
    }

    table.dataTable.display tbody tr:hover.selected > .sorting_2, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_2 {
        background-color: #a3b0c9
    }

    table.dataTable.display tbody tr:hover.selected > .sorting_3, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_3 {
        background-color: #a5b2cb
    }
      table.dataTable tbody tr.selected {
            background-color: #b0bed9
        }
</style>
    <%--<link href="administration.css" rel="stylesheet" />--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">

        <form runat="server">
            <asp:TextBox ID="txt" runat="server" ClientIDMode="Static" Style="display: none;"></asp:TextBox>
        </form>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body table-responsive">
                         <%-- <tr>
                                            <th>Item No</th>
                                            <th>Item Type</th>	
                                            <th>Description</th>
                                            <th>Internal Identifier Code</th>
                                            <th>Stock Unit of Measurement</th>
                                            <th>Unit Cost</th>
                                            <th>Unit Price</th>
                                            <th>Default Vendor No</th>
                                            <th>Default Vendor Name</th>
                                            <th>Search Description</th>
                                            <th>Item Group</th>
                                            <th>Item Category</th>
                                            <th>Blocked</th>
                                            <th>Stopped</th>
                                        </tr>--%>
                        <!-- start role table -->
                        <table id="addressbook" class="table table-striped table-hover table-condensed projects display datatable width-100">
                            <thead>
                                <tr>
                                    <th>Item No</th>
                                    <th>Item Type</th>
                                    <th>Description</th>
                                    <th>Internal Identifier Code</th>
                                    <th>Stock Unit of Measurement</th>
                                    <th>Default Vendor No</th>
                                    <th>Default Vendor Name</th>
                                    <th>Search Description</th>
                                    <th>Item Group</th>
                                    <th>Item Category</th>
                                    <th>Blocked</th>
                                    <th>Stopped</th>
                                </tr>
                            </thead>
                           
                        </table>
                        <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Item Master Overview - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>General</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Item No.</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" disabled="disabled" id="txtItemCd" />
                                 <label for="input" id="txtItemCdHelp"></label>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Block</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkblock" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Description</label>
                                <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txtItemDesc" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Stop</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkstop" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Search Description</label>
                               
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txtSearchDesc" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Allow Negative Stock Movement?</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkAllowNegtvStock" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Internal Identifier Code</label>
                                
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txtInternalId" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Item Group</label>
                                <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddGroupId">
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Item Category</label>
                                <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddCategoryId">
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Item Type</label>
                                <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddItemType">
                                    <option value="1">1. Item</option>
                                    <option value="2">2. Service</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Posting Group</label>
                                <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddPostingGrpId">
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Upload Picture</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="file" accept="image/png, image/jpeg" onchange="readURL(this);">
                                <img src="" id="blah">
                                <a href="#" onclick="rmvlogo()" id="rmvlogo">Remove Logo</a>

                            </div>
                            <div class="col-sm-3">
                                <label for="input">Notes</label>
                            </div>
                            <div class="col-sm-3">
                                <textarea class="form-control" id="txtnotes"></textarea>
                            </div>
                        </div>

                        <hr />
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Sales &amp; Invoicing</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Sale Unit of Measurement</label>
                                <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddUomId">
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Tax Group-Item</label>
                                <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <select name="select3" class="form-control" id="ddtaxgroupitem">
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                        </div>

                        <hr />
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Purchase &amp; Replenishment</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Lead Time (In Days)</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txtLeadTime" value="0">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Vendor Item No</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txtVendorItemNo" disabled="disabled">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Default Vendor Name</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddDefltVendorId" onchange="geVendorIdno();">
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Purchase Unit of Measurement</label>
                                <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddPurchaseUOM">
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Tax Group-Item</label>
                                <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddTaxItemGroup">
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Quantity Loss on Purchase (%)</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txtLossOnPurchase" value="0">
                            </div>
                        </div>

                        <hr />
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Cost &amp; Price</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Standard Cost</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txtStdCost" value="0">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Costing Method</label>
                                <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddCostMethod">
                                    <option value="1">1. FIFO</option>
                                    <option value="2">2. LIFO</option>
                                    <option value="3">3. Weighted Average</option>
                                    <option value="4">4. Standard</option>
                                    <option value="5">5. Specific</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Unit Cost</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" disabled="disabled">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Manage Cost &amp; Price by Variant?</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkCostPriceByVariant">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Profit %</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txtProfitPer" value="0">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Sale Price</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txtSalePrice" value="0">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Maximum Sale Price</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txtMaxSalePrice" value="0">
                            </div>
                            <div class="col-sm-3"></div>
                            <div class="col-sm-3"></div>
                        </div>


                        <hr />
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Planning</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Minimum Stock Level</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txtMinStockLevel" value="0">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Maximum Stock Level</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txtMaxStockLevel" value="0">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Safety Stock</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txtSafetyStock" value="0">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Stockout Warning?</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkStockWarning">
                            </div>
                        </div>

                        <hr />
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Tracking &amp; Movement Set-up</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Tracking & Movement Set-up</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkTrackingmovement">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Receiving Requirement	</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkRecvReq">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Allow Consumption after Receipt Note</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkConReceiptNote">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Pick Requirement</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkPickReq">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Quarantine Requirement</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkQuaranticeReq">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Reserve Requirement</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkReserveReq">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Registration Required</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkRegdReq">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Reservation</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddReservation">
                                    <option value="1">Automatic</option>
                                    <option value="2">Manual</option>
                                </select>
                            </div>
                        </div>

                        <hr />
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Storage &amp; Administration</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Default Warehouse</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddDefWarehouse" onchange="ItemmasterOverviewObject.do_populateWarehouseocation(-1,-1);">
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Track Batch No?</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkTrackBatch">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Default Location</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddDefLocation">
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Track Serial No ?</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="ckkTrackSrNo">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Stock Unit of Measurement</label>
                                <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddStockUOM">
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3" style="display : none;">
                                <label for="input">Lot No</label>
                            </div>
                            <div class="col-sm-3" style="display : none;">
                                <select class="form-control" id="ddLotNo">
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Capture Date of Manufacture</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkCDM">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Best Before use (Days)</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txtBBU">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Warranty</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkWarranty">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Warranty Period</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txtWarrantyPeriod">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Variant Code-1</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddVariantId_1" disabled>
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Variant Code-2</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddVariantId_2" disabled>
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Variant Code-3</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddVariantId_3" disabled>
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Variant Code-4</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddVariantId_4" disabled>
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                        </div>


                        <hr />
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Foreign Trade</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">GTIN</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txtGTIN">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Country of Origin	</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddCOOId">
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Tariff Code</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txtTariffCd">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                        </div>

                        <hr />
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Tax Info</strong>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">HSN Code</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddHSNId">
                                    <option>Selection</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Price Including Tax</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkPriceWithTax">
                            </div>
                        </div>

                        <hr />
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Statistics</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Stock In Hand</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" disabled="disabled">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Average Cost per unit</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" disabled="disabled">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Qty on Purchase Order</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" disabled="disabled">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Last Purchase Cost</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" disabled="disabled">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Qty on Sales Order</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" disabled="disabled">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="savedata();" id="btnSave">Add</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    

    <!-- Modal HTML Picture -->
    <div class="modal fade" id="myModalPIC" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Item Picture</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <img src="item-pic.jpg" width="400" height="400" alt="Item Picture" id="pimg" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Modal HTML Notes -->
    <div class="modal fade" id="myModalNOTES" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Item Notes</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <p id="pnotes"></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
        let editor; // use a global for the submit and return data rendering in the examples

        $(document).ready(function () {
            editor = new $.fn.dataTable.Editor({
                table: "#item_table",
            });
            $('#item_table').DataTable({
                dom: "Bfrtip",
                //"bPaginate": false,
                //"bLengthChange": false,
                //select: false,
                //"bFilter": false,
                //"bInfo": false,
                //"ordering": false,
                buttons: [
                    {
                        add: "create", text: '<i class="fa fa-plus"></i> New', editor: editor, action: () => showmodal()
                    },
                    {
                        add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
                    },
                    {
                        extend: "remove", editor: editor
                    },
                    {
                        add: "view", text: 'View', editor: editor, action: () => showmodalview()
                    },
                    {
                        add: "vipic", text: 'View Item Picture', editor: editor, action: () => showmodalpic()
                    },
                    {
                        add: "vnotes", text: 'View Notes', editor: editor, action: () => showmodalnotes()
                    },
                    {
                        add: "block", text: 'Block', editor: editor
                    },
                    {
                        add: "stop", text: 'Stop', editor: editor
                    },
                    {
                        add: "variant", text: 'Variants Setup', editor: editor, action: () => window.open("item-variant-setup.aspx")
                    },
                    {
                        add: "unit", text: 'Unit Conversion', editor: editor, action: () => window.open("unit-of-measurement.aspx")
                    },
                    {
                        add: "itemprice", text: 'Item Price', editor: editor, action: () => window.open("item-price.aspx")
                    },
                    {
                        add: "itemvend", text: 'Item-Vendor Price', editor: editor, action: () => window.open("item-vendor-price.aspx")
                    },
                    {
                        add: "icp", text: 'Item-Customer Price', editor: editor, action: () => window.open("item-customer-price.aspx")
                    },
                    {
                        add: "itemvendordiscount", text: 'Item-Vendor-Discount', editor: editor, action: () => window.open("item-vendor-discount.aspx")
                    },
                    {
                        add: "icd", text: 'Item-Customer Discount', editor: editor, action: () => window.open("item-customer-discount.aspx")
                    },
                    {
                        add: "pid", text: 'Purchase Invoice Discount', editor: editor, action: () => window.open("invoice-discount.aspx")
                    },
                    {
                        add: "sid", text: 'Sales Invoice Discount', editor: editor, action: () => window.open("invoice-customer-discount.aspx")
                    },
                    {
                        add: "si", text: 'Substitute Items', editor: editor, action: () => window.open("substitute-item.aspx")
                    },
                    {
                        add: "vendors", text: 'Vendors', editor: editor, action: () => window.open("vendor-item.aspx")
                    },
                    {
                        add: "transactions", text: 'Transactions', editor: editor, action: () => window.open("item-transaction.aspx")
                    },

                    {
                        add: "ohb", text: 'On Hand', editor: editor, action: () => window.open("on-hand-stock.aspx")
                    }
                ],

            })
        })

        var showmodal = function () {
            $("#myModal").modal('show');
        };
        var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
        var showmodalview = function () {
            $("#myModalVIEW").modal('show');
        };

        var showmodalpic = function () {
            $("#myModalPIC").modal('show');
        };

        var showmodalnotes = function () {
            $("#myModalNOTES").modal('show');
        };

    </script>
</asp:Content>


