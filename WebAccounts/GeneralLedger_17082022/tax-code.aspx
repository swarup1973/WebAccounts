<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="tax-code.aspx.cs" Inherits="WebAccounts.tax_code" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/tax-code.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">

        <div class="row">
            <div class="col">
                <p>
                    General Ledger
					>
					Master
					>
					<strong>Tax Codes</strong>

                </p>
            </div>
        </div>


        <div class="clearfix"></div>


        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <!-- start role table -->

                        <table id="budget_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th>Ledger (Tax Liability)</th>
                                    <th>Basis of Calculation</th>
                                    <th>Round-off</th>
                                    <th>Reounding Type</th>
                                    <th>Block</th>
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
                    <h5 class="modal-title">Tax Codes - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Code</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txt_TaxCode" maxlength="20">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Description</label>
                            </div>
                            <div class="col-sm-6">
                                <textarea class="form-control" id="txt_TaxDesc" maxlength="60"> </textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Ledger (Tax Liability)</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="dd_AcCd_TaxLiability">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Basis of Calculation</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="dd_BasisOfCalc">
                                    <option value=""></option>
                                    <option value="1">On Net Amount</option>
                                    <option value="2">On Gross Amount</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Round-off</label>
                            </div>
                            <div class="col-sm-6">
                                <input class="form-control" type="text" id="txt_ROff" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Reounding Type</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="dd_RType">
                                    <option value=""></option>
                                    <option value="1">Normal</option>
                                    <option value="2">Upward Rounding</option>
                                </select>
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
