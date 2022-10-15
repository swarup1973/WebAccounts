<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="fixed-assets-general-setup.aspx.cs" Inherits="WebAccounts.fixed_assets_general_setup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/fixedasset-setup.js"></script>
    <title>Fixed Assets Set-up</title>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="row">
        <div class="col">
            <p>
                Fixed Assets
					>
					Setups
					>
					<strong>Fixed Assets Set-up</strong>
            </p>
        </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
        <div class="col">
            <div class="card" id="div_fixedassetsetup">
                <div class="card-body">
                    <!-- start role table -->
                    <table id="sales_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                        <thead>
                            <tr>
                                <th>General</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Minimum Depreciation Amount</strong></td>
                                <td>
                                    <input type="number" class="form-control" id="txt_MinDepAmount" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" /></td>
                                <td><strong>Allow Proportionate Depreciation </strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_AllowPropDepn" /></td>
                            </tr>
                            <tr>
                                <td><strong>Minimum Book Value after Depreciation</strong></td>
                                <td>
                                    <input type="number" class="form-control" id="txt_MinBookValueAfterDepn" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" /></td>
                                <td><strong>Default Depreciation Book</strong></td>
                                <td>
                                    <select name="select" class="form-control" id="dd_DefaultDepnCode">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Capitalisation Threshold Value</strong></td>
                                <td>
                                    <input type="number" class="form-control" id="txt_CapitalisationThreshold"  pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);"  /></td>
                                <td><strong>Allow Posting From</strong></td>
                                <td>
                                    <input type="date" class="form-control" id="txt_PostingFrom" /></td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td><strong>Allow Posting to</strong></td>
                                <td>
                                    <input type="date" class="form-control" id="txt_PostingTo" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- end General table -->
                    <div class="clearfix"></div>
                    <table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                        <thead>
                            <tr>
                                <th>No Series</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Fixed Assets Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_FixedAssetNo">
                                    </select></td>
                                <td><strong>Insurance Journal</strong></td>
                                <td>
                                    <select class="form-control" id="dd_InsuranceJournal">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Fixed Assets Transfer </strong></td>
                                <td>
                                    <select class="form-control" id="dd_FixedAssetsTransfer">
                                    </select></td>
                                <td><strong>Maintenance Journal</strong></td>
                                <td>
                                    <select class="form-control" id="dd_MaintenanceJournal">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Fixed Assets Loan</strong></td>
                                <td>
                                    <select class="form-control" id="dd_FixedAssetsLoan">
                                    </select></td>
                                <td><strong>Depreciation Journal</strong></td>
                                <td>
                                    <select class="form-control" id="dd_DepreciationJournal">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Reclassification Journal</strong></td>
                                <td>
                                    <select class="form-control" id="dd_ReclassificationJournal">
                                    </select></td>
                               <td><strong>Is Block</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_IsBlock" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="clearfix"></div>
                    <div class="card-body" style="text-align: center">
                        <button type="button" id="btn_save" class="btn btn-primary" onclick="savedata();">Save</button>
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
