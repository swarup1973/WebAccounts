﻿<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="ledger-category.aspx.cs" Inherits="WebAccounts.ledger_category" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/ledger-category.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                    General Ledger
					>
                   <strong>Ledger Category</strong>
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
                                    <th>Name</th>
                                    <th>Closed</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
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
                                <label for="input">Code</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txt_LedCatCd" maxlength="15" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Description</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txt_LedCatDesc" maxlength="50" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Closed</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="checkbox" class="form-control" id="chk_IsClose" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="saverole();">Save</button>
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
