<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="sales-tax-component.aspx.cs" Inherits="WebAccounts.sales_tax_component" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/sales-tax-component.js"></script>
    <title>Sales Tax Component</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                    General Ledger
					>
					<strong>Sales Tax Component</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <!-- start role table -->
                        <table id="item_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th>Percentage/Amount</th>
                                    <th>Tax Jurisdiction</th>
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
                            <div class="col-sm-12">
                                <strong>General</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Code</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_SaleTaxCompCd" maxlength="30" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Round off to</label>
                            </div>
                            <div class="col-sm-3">
                                <input class="form-control" id="txt_ROffTo" maxlength="21" type="number" min="0" value="0" step="0.01" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Description</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_SaleTaxCompDesc" maxlength="100"/>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Round off Rule</label>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_ROffRule" class="form-control" >
                                    <option value="A">Actual</option>
                                    <option value="U">Up</option>
                                    <option value="D">Down</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Percentage/Amount</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_percentageamnt" disabled="disabled" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Tax Jurisdiction</label>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_TaxJurisdictionId" class="form-control">
                                </select>
                            </div>
                        </div>


                        <hr />
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Settlement</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Settlement Code</label>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_SettleId" class="form-control" onchange="SalesTaxComponentObject.do_changesettlement();">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Tax Authority Code</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_TaxAuthorityCode" disabled="disabled" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Period Interval Type</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_PeriodIntervalType" disabled="disabled" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Period Interval Unit</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_PeriodIntervalUnit" disabled="disabled" />
                            </div>
                        </div>

                        <hr />
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Ledger Posting</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Sales Tax Payable</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_AcId_SaleTaxPayable">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Use Tax Payable</label>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_AcId_UseTaxPayable" class="form-control">
                                </select>
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Tax Settlement</label>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_AcId_TaxSettlement" class="form-control">
                                </select>
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                        </div>

                        <hr />
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Calculation Set-up</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Method of Calculation</label>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_MethodOfCalc" class="form-control" onchange="SalesTaxComponentObject.do_loadBasisofCalculation(this.value);">
                                    <option value="P">Percent</option>
                                    <option value="V">Value</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Basis of Calculation</label>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_BasisOfCalc" class="form-control" onchange="SalesTaxComponentObject.do_loadTaxonTax(this.value);">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Tax on Tax</label>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_TaxOnTax" class="form-control">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Unit</label>
                            </div>
                            <div class="col-sm-3">
                                <select id="dd_Unit" class="form-control">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row" id="div_block">
                            <div class="col-sm-3">
                                <label for="input">Block</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control" id="chk_isblocked" />
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
