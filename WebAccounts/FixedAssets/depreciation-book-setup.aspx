<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="depreciation-book-setup.aspx.cs" Inherits="WebAccounts.depreciation_book_setup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/depreciation-book-overview.js"></script>
    <title>Depriciation-Book</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                    Fixed Assets
					>
					Setups
					>
					<a href="depreciation-book-overview.aspx">Depreciation Book Overview</a> >
                    <strong>Depreciation Book Setup</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <!-- start role table -->

                        <table id="depn_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                            <tbody>
                                <tr>
                                    <td><strong>Code</strong></td>
                                    <td>
                                        <input type="text" class="form-control" id="txt_DepnCode" maxlength="30" /></td>
                                    <td><strong>Default Rounding amount to </strong></td>
                                    <td>
                                        <input type="number" class="form-control" id="txt_DefaultRndingAmtTo" pattern="^[0-9]*$" onkeypress="return onlyNumberKey(event)" />
                                </tr>
                                <tr>
                                    <td><strong>Description</strong></td>
                                    <td>
                                        <input type="text" class="form-control" id="txt_DepnDesc" maxlength="100" /></td>
                                    <td><strong>Default Ending Book Value</strong></td>
                                    <td>
                                        <input type="number" class="form-control" id="txt_DefaultEndingBookValue" pattern="^[0-9]*$" onkeypress="return onlyNumberKey(event)" /></td>
                                </tr>
                                <tr>
                                    <td><strong>Update Ledger?</strong></td>
                                    <td>
                                        <input type="checkbox" class="form-control" id="chk_UpdateLedger" /></td>
                                    <td><strong>Depreciation Threshold Days</strong></td>
                                    <td>
                                        <input type="number" class="form-control" id="txt_DepnThresholdDays" pattern="^[0-9]*$" onkeypress="return onlyNumberKey(event)" /></td>
                                </tr>
                                <tr>
                                    <td><strong>FA Book Type</strong></td>
                                    <td>
                                        <select class="form-control form-control-sm" id="dd_FABookType">
                                            <option value="IncomeTax">Income Tax</option>
                                            <option value="Others">Others</option>
                                        </select></td>
                                    <td><strong>Allow Changes Depn. Method?</strong></td>
                                    <td>
                                        <input type="checkbox" class="form-control" id="chk_AllowChangesDepnMethod" /></td>
                                </tr>
                                <tr>
                                    <td><strong>Is Block</strong></td>
                                    <td>
                                        <input type="checkbox" class="form-control" id="chk_IsBlock" /></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>

                        <hr />
                        <div class="row">
                            <div class="col-md-4 offset-md-3 text-center">
                                <button
                                    id="btn_cancel" onclick="window.location ='depreciation-book-overview.aspx';"
                                    class="btn btn-primary btn-sm"
                                    formnovalidate>
                                    Cancel
                                </button>
                                <button id="btn_save" class="btn btn-success btn-sm" formnovalidate onclick="savedata();">
                                    Save
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <link href="../Administration/administration.css" rel="stylesheet" />
    <script type="text/javascript">

</script>
</asp:Content>
