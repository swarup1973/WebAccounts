<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="location-transfer.aspx.cs" Inherits="WebAccounts.location_transfer" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/location-transfer.js"></script>
    <title>Fixed Location Transfer</title>
    <style>
        table td {
        word-break: break-word !important;
        vertical-align: top !important;
        white-space: normal !important;
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
                        <div class="col-md-12 col-sm-12">
                            FA Code: <strong id="facode"></strong> Description: <strong id="fadesc"></strong>
                        </div>

                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <!-- start role table -->
                        <table id="assets_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block;">
                            <thead>
                                <tr>
                                    <th>Transfer Date</th>
                                    <th>From Location</th>
                                    <th>To Location</th>
                                    <th>From Dimension</th>
                                    <th>From Dimension Value</th>
                                    <th>To Dimension</th>
                                    <th>To Dimension Value</th>
                                    <th>Comment</th>
                                    <th>Is Block</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <!-- end role table -->
                        <div class="clearfix"></div>
                        <div class="card-body" style="text-align: center">
                            <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal"  onclick="cancelbtn();">Cancel</button>
                          
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
                                <label for="input">Transfer Date</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="date" class="form-control" id="txt_TransfDt">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">To Location</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_FALocIdTo" onchange="LocationTransferObject.do_loadothers(this);">
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
                    </div>
                    <div class="modal-footer">
                        <button type="button"  class="btn btn-primary" id="btn_addprofile" onclick="savelocationtran();">Add</button>
                        <button type="button"  class="btn btn-secondary" data-dismiss="modal" onclick="clearlocationtran();">Cancel</button>
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
