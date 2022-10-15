<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="loan-fixed-asset.aspx.cs" Inherits="WebAccounts.loan_fixed_asset" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/loan-fixed-asset.js"></script>
    <title>Loan Fixed Asset</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">

      
        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <!-- start role table -->
                        <table id="assets_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block;">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Loan From Location</th>
                                    <th>Loan To Location</th>
                                    <th>Loan From Dimension</th>
                                    <th>Loan From Dimension Value</th>
                                    <th>Loan To Dimension</th>
                                    <th>Loan To Dimension Value</th>
                                    <th>Comment</th>
                                    <th>Expencted Return Date</th>
                                    <th>Actual Return Date</th>
                                    <th>Is Block</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <!-- end role table -->
                        <div class="clearfix"></div>
                        <div class="card-body" style="text-align: center">
                            <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" onclick="cancelbtn();">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add New Transfer</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            
                            <div class="col-sm-3">
                                <label for="input">From Location</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_FALocIdFrom">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Date</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="date" class="form-control" id="txt_LoanDt">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">To Location</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_FALocIdTo" onchange="LoanFixedAssetObject.do_loadothers(this);">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">From Dimension</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_DimIdFrom">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">From Dimension Value</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_DimValueIdFrom">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">To Dimension</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_DimIdTo">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">To Dimension Value</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_DimValueIdTo">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Comment</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_Remarks" maxlength="500">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Expencted Return Date</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="date" class="form-control" id="txt_ExptReturnDt">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Actual Return Date</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="date" class="form-control" id="txt_ActualReturnDt">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary"  onclick="savelocationtran();">Save</button>
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
