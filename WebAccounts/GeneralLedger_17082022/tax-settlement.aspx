<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="tax-settlement.aspx.cs" Inherits="WebAccounts.tax_settlement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/tax-settlement.js"></script>
    <title>Sales Tax Component</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                    General Ledger
					>
					<strong>Tax Settlement Set-up Overview</strong>
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
                                    <th>Settlement Code</th>
                                    <th>Description</th>
                                    <th>Period Interval Type</th>
                                    <th>Period Interval Unit</th>
                                    <th>Tax Authority Code</th>
                                    <th>Tax Authority Description</th>
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
                                <label for="input">Settlement Code</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_SettleCd" maxlength="60" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Tax Authority Code</label>
                            </div>
                            <div class="col-sm-3">
                                <select name="select" class="form-control" id="dd_TaxAuthId" onchange="TaxSettlementObject.do_changeTaxAuthId();">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Description</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_SettleName" maxlength="100" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Tax Authority Description</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_TaxAuthIdDesc" disabled />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Period Interval Type</label>
                            </div>
                            <div class="col-sm-3">
                                <select name="select" class="form-control" id="dd_PrdIntervalType">
                                    <option value="D">Day</option>
                                    <option value="M">Month</option>
                                    <option value="Y">Year</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Period Interval Unit</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txt_PrdIntervalUnit" pattern="^[0-9]*$" onkeypress="return onlyNumberKey(event)" maxlength="100" />
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
