<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="tax-authorities-overview.aspx.cs" Inherits="WebAccounts.tax_authorities_overview" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/tax-authorities-overview.js"></script>
    <title>Tax Authorities-Overview</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                    General Ledger
					>
					<strong>Tax Authorities-Overview</strong>
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
                                    <th>Tax Authority Code</th>
                                    <th>Tax Authority Name</th>
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
                                <input type="text" class="form-control" id="txt_AuthCd" maxlength="30" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Address</label>
                            </div>
                            <div class="col-sm-3">
                                <textarea name="textarea" class="form-control" id="txt_Address" maxlength="200"></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Description</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_AuthDesc" maxlength="100" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Extension</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txt_Extension" maxlength="1000" pattern="^[0-9]*$" onkeypress="return onlyNumberKey(event)" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Tax Authority Code</label>
                            </div>
                            <div class="col-sm-3">
                                <select name="select" class="form-control" id="dd_TaxAuthCode" onchange="TaxAuthObject.do_changeTaxAuthCode();">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Tax Authority Name</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" disabled id="txt_TaxAuthName"  />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Phone No-1</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_PhoneNo1" maxlength="20" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Phone No-2</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_PhoneNo2" maxlength="20" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">E-mail</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_EMail" maxlength="100" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Website</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_Website" maxlength="100" />
                            </div>
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
