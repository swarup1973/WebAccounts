<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="assign-settlement-period.aspx.cs" Inherits="WebAccounts.assign_settlement_period" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/assign-settlement-period.js"></script>
    <title>Assign Settlement Period</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                    General Ledger
					>
					<a href="tax-settlement.aspx">Tax Settlement Set-up Overview</a>
                    >
                   <strong>Assign Settlement Period</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        Settlement Code: <strong>
                            <label id="lbl_code"></label>
                        </strong>
                        <br />
                        Description: <strong>
                            <label id="lbl_desc"></label>
                        </strong>

                        <!-- start role table -->
                        <table id="item_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                            <thead>
                                <tr>
                                    <th>Period from</th>
                                    <th>Period to</th>
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
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Create New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Period from</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="date" class="form-control" id="txt_FromDt" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Period to</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="date" class="form-control" id="txt_ToDt" />
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
