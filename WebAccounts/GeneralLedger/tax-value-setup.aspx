<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="tax-value-setup.aspx.cs" Inherits="WebAccounts.tax_value_setup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/tax-value-setup.js"></script>
    <title>Sales Tax Component</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                    General Ledger
					>
					<a href="sales-tax-component.aspx">Sales Tax Component</a> >
					<strong>Tax Value Setup</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                Tax Code: <strong>
                    <label id="lbl_taxcode"></label>
                </strong>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <!-- start role table -->
                        <table id="item_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block;">

                            <%--<table id="item_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">--%>
                            <thead>
                                <tr>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Minimum Base Value for Calculation</th>
                                    <th>Maximum Base Value for Calculation</th>
                                    <th>Value (% or Amount)</th>
                                    <th>Minimum Sales Tax Amount</th>
                                    <th>Maximum Sales Tax Amount</th>
                                    <th>Is Block</th>
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
        <div class="modal-dialog modal-lg" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Component Code</label> 
                            </div>
                            <div class="col-sm-3">
                                <label id="lbl_componentcode"></label>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Description</label> 
                            </div>
                            <div class="col-sm-3">
                                <label id="lbl_componentdesc"></label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">From Date</label> <span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="date" class="form-control" id="txt_FromDt" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">To Date</label> <span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="date" class="form-control" id="txt_ToDt" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Minimum Base Value for Calculation</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txt_MinBaseValueCalc" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Maximum Base Value for Calculation</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txt_MaxBaseValueCalc" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Value (% or Amount)</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txt_ValuePerOrAmt" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Minimum Sales Tax Amount</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txt_MinSaleTaxAmt" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Maximum Sales Tax Amount</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txt_MaxSaleTaxAmt" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                        </div>
                        <div class="form-group row" id="div_block">
                            <div class="col-sm-3">
                                <label for="input">Block</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control" id="chk_isblocked" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                         <button type="button" class="btn btn-primary" onclick="savedata();">Save</button>
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
