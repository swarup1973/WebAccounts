<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="item-customer-discount.aspx.cs" Inherits="WebAccounts.item_customer_discount" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/item-customer-discount.js"></script>
    <title>Customer Account Overview</title>
         <style>
        .dataTables_wrapper {
            margin-top : 10px;
        }
        .dataTables_filter {
            margin-top : 20px;
        }
        .dataTables_length{
            margin-top : 40px !important;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
       

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">

                <div class="card">
                    <div class="card-body">
                        Customer No.
                        <select id="dd_customers" style="width: 200px; height: 24px;" onchange="onvendorchange(this);">
                        </select>
                        Item Filter:
                        <select id="dd_searchitem" style="width: 200px; height: 24px;">
                        </select>
                        From Date Filter:
                        <input type="date" id="txt_searchstartdate">
                        To Date Filter:
                        <input type="date" id="txt_searchenddate">
                        <button type="button" id="btn_search" class="btn btn-secondary" onclick="CustomerItemDiscountObject.do_loadvendoritemprice();">Search</button>

                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <!-- start role table -->
                        <%--<table id="vendor_itemprice" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">--%>
                        <table id="vendor_itemprice" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block;">
                            <thead>
                                <tr>
                                    <th>Customer Code</th>
                                    <th>Customer Name</th>
                                    <th>Item No.</th>
                                    <th>Currency Code</th>
                                    <th>Unit of Measurement</th>
                                    <th>Minimum Qty.</th>
                                    <th>Maximum Qty.</th>
                                    <th>Discount %</th>
                                    <th>Discount Amount/Unit</th>
                                    <th>Starting Date</th>
                                    <th>Ending Date</th>
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
    <div class="modal fade" id="myModal" tabindex="-1">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Item Customer-Discount - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Customer Code</label>
                            </div>
                            <div class="col-sm-6">
                                <label for="input" id="lbl_vendorcode"></label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Customer Name</label>
                            </div>
                            <div class="col-sm-6">
                                <label for="input" id="lbl_vendorname"></label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Item No.</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="dd_item">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Currency Code</label>
                            </div>
                            <div class="col-sm-6">
                                <label for="input" id="lbl_currency"></label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Unit of Measurement</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="dd_uom">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Minimum Qty.</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-6">
                                <input type="number" class="form-control" id="txt_minqty" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Maximum Qty.</label>
                            </div>
                            <div class="col-sm-6">
                               <input type="number" class="form-control" id="txt_maxqty" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Discount %</label>
                            </div>
                            <div class="col-sm-6">
                                 <input type="number" class="form-control" id="txt_discount" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Discount Amount/Unit</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="number" class="form-control" id="txt_discountamount" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Starting Date</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-6">
                                <input type="date" class="form-control" id="txt_startdate">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Ending Date</label>
                            </div>
                            <div class="col-sm-6">
                                 <input type="date" class="form-control" id="txt_enddate">
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
                        <button type="button" class="btn btn-primary" onclick="savedata();">Add</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
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

