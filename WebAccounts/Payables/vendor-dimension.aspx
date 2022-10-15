<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="vendor-dimension.aspx.cs" Inherits="WebAccounts.vendor_dimension" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/vendor-dimension.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

        <div class="row">
            <div class="col">
                <p>
                    General Ledger
					>
					Master
					>
					<a href="vendor-account-overview.aspx" class="text-dark page_path_link">Vendor Account Overview</a>
                    >
                    <strong>Dimension Set-up</strong>
                </p>
            </div>
        </div>


        <div class="clearfix"></div>


        <div class="row">
            <div class="col">

                <div class="card">
                    <div class="card-body">
                        <div class="col-md-12 col-sm-12">
                            Vendor Code: <strong id="acNumber"></strong> Vendor Name: <strong id="bankName"></strong>
                        </div>

                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <!-- start role table -->
                        <div class="row">
                            <div class="col-md-9 offset-md-1">
                                <div class="card">
                                    <div class="card-body">
                                        <table class="coasetup-dimensions-table table table-sm table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Dimension</th>
                                                    <th>Value</th>
                                                    <th class="separator"></th>
                                                    <th>Dimension</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <!-- dimension 1 -->
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input
                                                                type="checkbox"
                                                                id="dimension_1_checkbox"
                                                                class="form-check-input form-control-sm"
                                                                for="dddimvale_1"
                                                                onchange="DimSetup.onchangeDimension(this);">
                                                            <label id="lbl_dimension_1" class="form-check-label" for="dimension_1_checkbox">
                                                                Branch
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select class="form-control form-control-sm" id="dddimvale_1" disabled>
                                                            <option></option>
                                                        </select>
                                                    </td>
                                                    <td class="separator"></td>
                                                    <!-- dimension 2 -->
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input
                                                                type="checkbox"
                                                                id="dimension_2_checkbox"
                                                                for="dddimvale_2"
                                                                class="form-check-input form-control-sm"
                                                                onchange="DimSetup.onchangeDimension(this);">
                                                            <label id="lbl_dimension_2" for="dimension_2_checkbox" class="form-check-label">
                                                                Department
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select class="form-control form-control-sm" id="dddimvale_2" disabled>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <!-- dimension 3 -->
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input
                                                                type="checkbox"
                                                                class="form-check-input form-control-sm"
                                                                id="dimension_3_checkbox"
                                                                for="dddimvale_3"
                                                                onchange="DimSetup.onchangeDimension(this);">
                                                            <label id="lbl_dimension_3" for="dimension_3_checkbox" class="form-check-label">
                                                                Dimension 3
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select class="form-control form-control-sm" id="dddimvale_3" disabled>
                                                        </select>
                                                    </td>
                                                    <td class="separator"></td>
                                                    <!-- dimension 4 -->
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input type="checkbox"
                                                                class="form-check-input form-control-sm"
                                                                id="dimension_4_checkbox"
                                                                for="dddimvale_4"
                                                                onchange="DimSetup.onchangeDimension(this);">
                                                            <label id="lbl_dimension_4" for="dimension_4_checkbox" class="form-check-label">
                                                                Dimension 4
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select class="form-control form-control-sm" id="dddimvale_4" disabled>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <!-- dimension 5 -->
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input
                                                                type="checkbox"
                                                                class="form-check-input form-control-sm"
                                                                id="dimension_5_checkbox"
                                                                for="dddimvale_5"
                                                                onchange="DimSetup.onchangeDimension(this);">
                                                            <label id="lbl_dimension_5" for="dimension_5_checkbox" class="form-check-label">
                                                                Dimension 5
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select
                                                            class="form-control form-control-sm"
                                                            id="dddimvale_5"
                                                            disabled>
                                                        </select>
                                                    </td>
                                                    <td class="separator"></td>
                                                    <!-- dimension 6 -->
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input
                                                                class="form-check-input form-control-sm"
                                                                type="checkbox"
                                                                id="dimension_6_checkbox"
                                                                for="dddimvale_6"
                                                                onchange="DimSetup.onchangeDimension(this);">
                                                            <label id="lbl_dimension_6" for="dimension_6_checkbox" class="form-check-label">
                                                                Dimension 6
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select
                                                            class="form-control form-control-sm"
                                                            id="dddimvale_6"
                                                            disabled>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <!-- dimension 7 -->
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input type="checkbox"
                                                                class="form-check-input form-control-sm"
                                                                id="dimension_7_checkbox"
                                                                for="dddimvale_7"
                                                                onchange="DimSetup.onchangeDimension(this);">
                                                            <label id="lbl_dimension_7" for="dimension_7_checkbox" class="form-check-label">
                                                                Dimension 7
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select class="form-control form-control-sm" id="dddimvale_7" disabled>
                                                        </select>
                                                    </td>
                                                    <td class="separator"></td>
                                                    <!-- dimension 8 -->
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input type="checkbox"
                                                                class="form-check-input form-control-sm"
                                                                id="dimension_8_checkbox"
                                                                for="dddimvale_8"
                                                                onchange="DimSetup.onchangeDimension(this);">
                                                            <label id="lbl_dimension_8" for="dimension_8_checkbox" class="form-check-label">
                                                                Dimension 8
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select class="form-control form-control-sm" id="dddimvale_8" disabled>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <!-- dimension 9 -->
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input type="checkbox"
                                                                class="form-check-input form-control-sm"
                                                                id="dimension_9_checkbox"
                                                                for="dddimvale_9"
                                                                onchange="DimSetup.onchangeDimension(this);">
                                                            <label id="lbl_dimension_9" for="dimension_9_checkbox" class="form-check-label">
                                                                Dimension 9
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select class="form-control form-control-sm" id="dddimvale_9" disabled>
                                                        </select>
                                                    </td>
                                                    <td class="separator"></td>
                                                    <!-- dimension 10 -->
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input type="checkbox"
                                                                class="form-check-input form-control-sm"
                                                                id="dimension_10_checkbox"
                                                                for="dddimvale_10"
                                                                onchange="DimSetup.onchangeDimension(this);">
                                                            <label id="lbl_dimension_10" for="dimension_10_checkbox" class="form-check-label">
                                                                Dimension 10
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select class="form-control form-control-sm" id="dddimvale_10" disabled>
                                                        </select>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr />
                        <div class="row">
                            <div class="col-md-4 offset-md-3 text-center">
                                <button
                                    id="btn_cancel" onclick="window.location ='vendor-account-overview.aspx';"
                                    class="btn btn-primary btn-sm"
                                    formnovalidate>
                                    Cancel
                                </button>
                                <button id="btn_save" class="btn btn-success btn-sm" formnovalidate onclick="DimSetup.dosaveDimSetup();">
                                    Save
                                </button>
                            </div>
                        </div>
                        <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>



</asp:Content>


<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <script type="text/javascript" src="js/vendor-dimension.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            DimSetup.do_init();

        });
    </script>
</asp:Content>
