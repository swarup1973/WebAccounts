<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="coasetup.aspx.cs" Inherits="WebAccounts.coasetup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/coa_setup.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="row">
        <div class="col">
            <nav id="navid" class="card navbar navbar-expand-sm navbar-light bg-secondary">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item" id="li_edit" "aria-invalid">
                        <a href="#" onclick="CoaSetup.domovetoeditCoaSetup();" class="nav-link">Edit</a>
                    </li>
                    <li class="nav-item" id="li_delete">
                        <a href="#" onclick="CoaSetup.dodelete();" role="button"
                        aria-expanded="false" class="nav-link">Delete</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>



    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <p>Delete
                        <span class="text-danger">*</span>
                        indicates a required field.
                    </p>
                <div class="card-title">
                    <h2>General Setup</h2>
                </div>
                <div class="x_content">
                    <br />
                    <!-- start of row 1 -->
                    <div class="container coa-setup-upper">
                    <div class="row">
                        <div class="col-md-4 offset-md-1">
                                <div class="form-group row">
                                    <label class="col-sm-4 col-form-label text-right col-form-label-sm">
                                        AC Code<span class="text-danger">*</span>
                                    </label>
                                    <div class="col-sm-8">
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            maxlength="20"
                                            id="txt_AcCd"
                                            readonly 
                                        />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-4 col-form-label text-right col-form-label-sm">
                                        Description
                                    </label>
                                    <div class="col-sm-8">
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            maxlength="80"
                                            id="txt_AcDesc" 
                                        />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-4 col-form-label text-right col-form-label-sm">
                                        Search Name
                                    </label>
                                    <div class="col-sm-8">
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            maxlength="80"
                                            id="txt_AcSrcDesc" 
                                        />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-4 col-form-label text-right col-form-label-sm">
                                        Alias
                                    </label>
                                    <div class="col-sm-8">
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            maxlength="80"
                                            id="txt_AcAlias" />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-4 col-form-label text-right col-form-label-sm">
                                        Type<span class="text-danger">*</span>
                                    </label>
                                    <div class="col-sm-8">
                                        <select class="form-control form-control-sm" name="dd_AcTypeCd" id="dd_AcTypeCd" required >
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-4 col-form-label text-right col-form-label-sm">
                                        Group<span class="text-danger">*</span>
                                    </label>
                                    <div class="col-sm-8">
                                        <select class="coa_table_select form-control form-control-sm coa_row_value_holder" name="dd_grpCd" id="dd_grpCd" onchange="CoaSetup.lookup.onchangegroup();" required >
                                        </select>
                                    </div>
                                </div>
                            </div>
                        <!-- col 1 end -->
                        <div class="col-md-4">
                            <div class="form-group form-check">
                                <label class="form-label-vertical-align col-form-label-sm">
                                    Direct Posting Allowed
                                </label>
                                &nbsp;
                                <input type="checkbox"
                                    class="align-middle form-control-sm"
                                    name="chk_IsDirectPosting"
                                    id="chk_IsDirectPosting"/>
                            </div>
                            <div class="form-group form-check">
                                <label class="form-label-vertical-align col-form-label-sm">
                                    Block Posting
                                </label>
                                &nbsp;
                                <input type="checkbox"
                                    class="align-middle form-control-sm"
                                    name="chk_IsBlockPosting"
                                    id="chk_IsBlockPosting"
                                />
                            </div>
                            <div class="row form-group form-check">
                                    <label class="col-form-label col-sm-3 col-form-label-sm">
                                        Ledger Category
                                    </label>
                                    <div class="col-sm-8">
                                        <select class="form-control form-control-sm" id="dd_LedCatId">
                                        </select>
                                    </div>
                            </div>
                        </div>
                        <!-- col 2 end -->
                    </div>
                    <!-- ^ inner row 1 end -->
                    <div class="row">
                        <div class="col-md-4 offset-md-1">
                            <div class="form-group">
                                <label class="col-sm-4 col-form-label text-right col-form-label-sm">
                                    Group Range from<span class="text-danger">*</span>
                                </label>

                                <div class="col-sm-8">
                                    <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            maxlength="20"
                                            id="txt_grpRangeFrom" />
                                    <!--<select class="form-control form-control-sm" id="dd_grpRangeFrom">
                                    </select>-->
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-sm-3 col-form-label col-form-label-sm">
                                    Group Range to<span class="text-danger">*</span>
                                </label>
                                <div class="col-sm-8">
                                    <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            maxlength="20"
                                            id="txt_grpRangeTo" />
                                    <!--<select class="form-control form-control-sm" id="group_range_to_select">
                                    </select>-->
                                    <!-- <input
                                        type="text"
                                        class="form-control col-md-7 col-xs-12"
                                        maxlength="20"
                                        id="txt_grpRangeTo" disabled 
                                    /> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3 offset-md-4 text-center mt-2">
                            <button type="button" class="btn btn-link" id="toggle-coa-addtl-setup-button">
                                Additional Options
                                <i class="expandable-addtl-options-btn fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                    <!-- inner row 2 end -- DIMENSIONS START BELOW -->
                    <div id="coa-setup-lower" class="container hidden">
                    <div class="card-title">
                        <h2>Additional Setup</h2>
                    </div>
                    <div class="row">
                        <div class="ln_solid"></div>
                        <div class="col-md-4 offset-md-1">
                                <div class="form-group form-check text-right">
                                    <label class="form-label-vertical-align col-form-label-sm">
                                        Toggle Dimension Set
                                    </label>
                                    &nbsp;
                                    <input type="checkbox"
                                        class="align-middle form-control-sm"
                                        id="chk_dimType" 
                                        onchange="CoaSetup.onchangedimType()"
                                    />
                                </div>
                        </div>
                        <div class="col-md-4">
                                <div class="form-group">
                                    <label class="col-sm-3 col-form-label col-form-label-sm">
                                        Dimension Set
                                    </label>
                                    <div class="col-sm-8">
                                        <select class="form-control form-control-sm" id="dd_dimensionset">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                        </div>
                    </div>
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
                                                            onchange="CoaSetup.onchangeDimension(this);"
                                                        >
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
                                                        onchange="CoaSetup.onchangeDimension(this);"
                                                        >
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
                                                        onchange="CoaSetup.onchangeDimension(this);"
                                                        >
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
                                                        onchange="CoaSetup.onchangeDimension(this);"
                                                       >
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
                                                            onchange="CoaSetup.onchangeDimension(this);"
                                                        >
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
                                                            onchange="CoaSetup.onchangeDimension(this);"
                                                        >
                                                        <label id="lbl_dimension_6" for="dimension_6_checkbox" class="form-check-label">
                                                            Dimension 6
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <select 
                                                        class="form-control form-control-sm" 
                                                        id="dddimvale_6" 
                                                        disabled
                                                    >
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
                                                        onchange="CoaSetup.onchangeDimension(this);"
                                                        >
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
                                                        onchange="CoaSetup.onchangeDimension(this);"
                                                        >
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
                                                        onchange="CoaSetup.onchangeDimension(this);"
                                                        >
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
                                                        onchange="CoaSetup.onchangeDimension(this);"
                                                        >
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
                    </div>
                    <!-- inner row 3 end -->
                    <div class="row">
                        <hr />
                        <table id="tbl_all_pages" class="table table-striped"></table>
                    </div>
                    <!-- real end of row content -->
                    <hr />
                    <div class="row">
                        <div class="col-md-4 offset-md-3 text-center">
                            <button
                            id="btn_cancel" onclick="window.location ='Chartofacct.aspx';"
                            class="btn btn-primary btn-sm"
                            formnovalidate>
                            Cancel
                        </button>
                        <button id="btn_save" class="btn btn-success btn-sm" formnovalidate onclick="CoaSetup.dosaveCoaSetup();">
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
    <script type="text/javascript" src="js/coa_setup.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            CoaSetup.do_init();
            /*
            $('#btn_newdimensionset').on('click', function () {
                DimObject.dimensionsetdata.dimSetId = "";
                window.location.href = "dimensionsetnew.aspx";
            });
            */
        });
    </script>

    <script type="text/javascript" src="js/section-expander.js"></script>
</asp:Content>
