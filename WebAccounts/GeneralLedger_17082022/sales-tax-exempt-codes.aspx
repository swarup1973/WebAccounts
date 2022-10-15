﻿<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="sales-tax-exempt-codes.aspx.cs" Inherits="WebAccounts.sales_tax_exempt_codes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/sales-tax-exempt-codes.js"></script>
    <title>Sales Tax Exempt Codes</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                    General Ledger
					>
					<strong>Sales Tax Exempt Codes</strong>
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
                                <label for="input">Code</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_ExemptCd" maxlength="60" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Description</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_ExemptDesc" maxlength="100" />
                            </div>
                            <br />


                        </div>
                        <div class="form-group row" id="div_block">
                            <div class="col-sm-3">
                                <label for="input">Is Block</label>
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
