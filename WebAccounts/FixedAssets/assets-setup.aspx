<%@ Page Title="Asset Setup" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="assets-setup.aspx.cs" Inherits="WebAccounts.assets_setup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/assets-setup.js"></script>
    <title>Fixed Assets Overview</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">

    <div class="">

       

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <nav class="card navbar navbar-expand-sm navbar-light bg-light" style="background-color: #2A3F54 !important">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item" id="li_edit">
                            <a href="#" onclick="assetsetuoObject.domovetoedit();" class="nav-link">Edit</a>
                        </li>
                        <li class="nav-item" id="li_delete">
                            <a href="#" onclick="assetsetuoObject.dodelete();" role="button"
                                aria-expanded="false" class="nav-link">Delete</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body" id="div_main">
                        <!-- start role table -->
                        <div style="clear: both; overflow: hidden;">

                            <div style="float: left;">
                                <table id="assets_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>General</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                         <tr>
                                            <td><strong>Fixed Asset Group</strong></td>
                                            <td>
                                                 <select id="sl1" onclick="fnselectFAGroup();"></select>
                                               <%-- <select id="ddFAGroup2"></select>
                                                <select id="ddFAGroup1"></select>--%>
                                            </td>
                                            <td><strong>Major Category </strong></td>
                                            <td>
                                                 <input type="text" class="form-control" id="txtMajorCategory" disabled="disabled" />
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <td><strong>Code</strong><span class="text-danger">*</span></td>
                                            <td>
                                                <input type="text" class="form-control" id="txt_FACode" maxlength="30" /></td>
                                            <td><strong>Employee Responsible</strong></td>
                                            <td>
                                                <select class="form-control" id="dd_EmpRespId"></select>
                                            </td>
                                            <td><strong>Block</strong></td>
                                            <td>
                                                <input type="checkbox" class="form-control" id="chk_IsBlock" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Description</strong><span class="text-danger">*</span></td>
                                            <td>
                                                <input type="text" class="form-control" id="txt_FADesc" maxlength="200" /></td>
                                            <td><strong>Last Depreciation Date</strong></td>
                                            <td>
                                                <input type="date" class="form-control" id="txt_LastDepDt" /></td>
                                            <td><strong>Inactive</strong></td>
                                            <td>
                                                <input type="checkbox" class="form-control" id="chk_IsInactive" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Search Description</strong><span class="text-danger">*</span></td>
                                            <td>
                                                <input type="text" class="form-control" id="txt_FASearchName" /></td>
                                            <td><strong>FA Location </strong><span class="text-danger">*</span></td>
                                            <td>
                                                <select class="form-control" id="dd_FALocId"></select>
                                            </td>
                                            <td><strong>Unit of Measurement</strong><span class="text-danger">*</span></td>
                                            <td>
                                                <select class="form-control" id="dd_UomId"></select>
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>

                            <div class="clearfix"></div>

                            <div style="float: left; width: 200px;">
                                image place holder <a id="a_removeimage" mode="delete" style="background-color: #2A3F54; color: white;" class="btn btn-danger btn-xs" onclick="assetsetuoObject.deletefile()" title="Remove Image"><i class="fa fa-trash-o"></i></a>
                                <br />
                                <div src="propic.png" width="200" height="200" id="image-holder" alt="Profile Picture"></div>
                                <img src="propic.png" width="200" height="200" alt="Profile Picture" id="img_FAPic" />
                                <div style="display: none;">
                                    <asp:Image ID="Image1" runat="server" Width="200" Height="200" Visible="false" ClientIDMode="Static" /></div>
                                <input type="file" id="file_FAPic" onchange="assetsetuoObject.onchangefile(this);">
                            </div>

                        </div>
                        <!-- end General table -->
                        <div class="clearfix"></div>
                        <table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                            <thead>
                                <tr>
                                    <th>Technical Details</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Make</strong></td>
                                    <td>
                                        <input type="text" class="form-control" id="txt_Make" maxlength="20" /></td>
                                    <td><strong>Serial No</strong></td>
                                    <td>
                                        <input type="text" class="form-control" id="txt_SerialNo" maxlength="50" /></td>
                                    <td><strong>Date of Manufacture/Completion</strong></td>
                                    <td>
                                        <input type="date" class="form-control" id="txt_DtOfMfg" />
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Model No</strong></td>
                                    <td>
                                        <input type="text" class="form-control" id="txt_Model" maxlength="20" /></td>
                                    <td><strong>Model Year</strong></td>
                                    <td>
                                        <input type="text" class="form-control" id="txt_ModelYear" maxlength="20" /></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>


                        <table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                            <thead>
                                <tr>
                                    <th>Manitenance &amp; Insurance</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Manit. Vendor No.</strong></td>
                                    <td>
                                        <select class="form-control" id="dd_MaintVendorId" onchange="getvendorname();"></select>
                                    </td>
                                    <td><strong>Warranty Period</strong></td>
                                    <td>
                                        <input type="date" class="form-control" id="txt_WarrantyPeriod" /></td>
                                    <td><strong>Value Insured</strong></td>
                                    <td>
                                        <input type="number" class="form-control" id="txt_ValueInsured" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" /></td>
                                </tr>
                                <tr>
                                    <td><strong>Maint. Vendor Name</strong></td>
                                    <td>
                                        <label id="lbl_vendorname"></label>
                                    </td>
                                    <td><strong>Insured</strong></td>
                                    <td>
                                        <input type="checkbox" class="form-control" id="chk_Insured" onchange="getchangeInsured(this);" /></td>
                                    <td><strong>Policy No</strong></td>
                                    <td>
                                        <input type="text" class="form-control" id="txt_PolicyNo" maxlength="50" /></td>
                                </tr>
                                <tr>
                                    <td><strong>Planned Service Date</strong></td>
                                    <td>
                                        <input type="date" class="form-control" id="txt_PlanedServcDt" /></td>
                                    <td><strong>Insurance Vendor</strong></td>
                                    <td>
                                        <input type="text" class="form-control" id="txt_InsurenceVendor" maxlength="200" /></td>
                                    <td><strong>Policy Expiry Date</strong></td>
                                    <td>
                                        <input type="date" class="form-control" id="txt_PolicyExpDt" /></td>
                                </tr>
                                <tr>
                                    <td><strong>Next Service Date</strong></td>
                                    <td>
                                        <input type="date" class="form-control" id="txt_NextServcDt" /></td>
                                    <td><strong>Insurance Due Date</strong></td>
                                    <td>
                                        <input type="date" class="form-control" id="txt_InsurenceDueDt" /></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                            <thead>
                                <tr>
                                    <th>Posting Setups</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>FA Types</strong><span class="text-danger">*</span></td>
                                    <td>
                                        <select class="form-control" id="dd_FATypeId" onchange="populateSubTypeDropdownbyType(0);"></select>
                                    </td>
                                    <td><strong>FA Posting Group</strong><span class="text-danger">*</span></td>
                                    <td>
                                        <select class="form-control" id="dd_FAPostingGrpId"></select></td>
                                </tr>
                                <tr>
                                    <td><strong>FA Sub-types</strong></td>
                                    <td>
                                        <select class="form-control" id="dd_FASubType">
                                            <option value="-1">select</option>
                                        </select>
                                    </td>
                                    <td><strong>Tax Group</strong><span class="text-danger">*</span></td>
                                    <td>
                                        <select class="form-control" id="dd_TaxGrpId"></select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <!-- start profile table -->
                        <strong>Depreciation Profile</strong>
                        <table id="profile_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block;">
                            <thead>
                                <tr>
                                    <!--<th>FA Book</th>-->
                                    <th>Depreciation Method</th>
                                    <th>Depreciation Starting from</th>
                                    <th>Depreciation Ending on</th>
                                    <th>Self Life (Months)</th>
                                    <th>Depreciation %</th>
                                    <th>Book Value</th>
                                    <th>Salvage Value</th>
                                    <th>Book Value after full Depn.</th>
                                    <th>Depreciation Frequency</th>
                                    <th>Calculate Depn.</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>

                        <table id="statistics_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                            <thead>
                                <tr>
                                    <th>Statistics</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Book Value</strong></td>
                                    <td>Display</td>
                                    <td><strong>Improvement</strong></td>
                                    <td>Display</td>
                                    <td><strong>Date of Acquisition</strong></td>
                                    <td>Display</td>
                                </tr>
                                <tr>
                                    <td><strong>Salvage Value</strong></td>
                                    <td>Display</td>
                                    <td><strong>Write -up</strong></td>
                                    <td>Display</td>
                                    <td><strong>Date of Disposal/Sale</strong></td>
                                    <td>Display</td>
                                </tr>
                                <tr>
                                    <td><strong>Accm Depn.</strong></td>
                                    <td>Display</td>
                                    <td><strong>Write-Down</strong></td>
                                    <td>Display</td>
                                    <td><strong>Depn. Period Remaining</strong></td>
                                    <td>Display</td>
                                </tr>
                                <tr>
                                    <td><strong>Book Value after full Depn.</strong></td>
                                    <td>Display</td>
                                    <td><strong>Depreciation </strong></td>
                                    <td>Display</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><strong>Depn. Method</strong></td>
                                    <td>Display</td>
                                    <td><strong>Disposal/Sale Value</strong></td>
                                    <td>Display</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><strong>Depn. Period (Month)</strong></td>
                                    <td>Display</td>
                                    <td><strong>Profit/Loss on Sale</strong></td>
                                    <td>Display</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><strong>Depn. %</strong></td>
                                    <td>Display</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- end Statistics table -->


                        <hr />
                        <div class="row">
                            <div class="col-md-4 offset-md-3 text-center">
                               
                                <button
                                    id="btn_cancel" onclick="window.location ='fixed-assets-master.aspx';"
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

    <!-- Modal HTML NEW2 -->
    <div class="modal fade" id="myModalNEW" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Depreciation Profile</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">FA Book</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_DepnBookId">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Depreciation Method	</label>
                                <span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_DepnMethod">
                                    <option value=""></option>
                                    <option value="SL">Straight Line</option>
                                    <option value="DB">Diminishing Balance</option>
                                    <option value="UD">User Defind</option>
                                    <option value="M">Manual</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Depreciation Starting from</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="date" class="form-control" id="txt_DepnStFrom">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Depreciation Ending on</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="date" class="form-control" id="txt_DepnEndOn">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Self Life (Months)</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txt_SelfLife" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Depreciation %</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txt_DepnPer" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Salvage Value</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txt_SalvageValue" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Book Value after full Depn.</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="txt_BookValueAfterFullDepn" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Depreciation Frequency</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_DepnFrequency">
                                    <option value=""></option>
                                    <option value="M">Monthly</option>
                                    <option value="Q">Quarterly</option>
                                    <option value="H">Half-yearly</option>
                                    <option value="Y">Yearly</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Calculate Depn.</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control" id="chk_DepnCalc">
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="btn_addprofile" onclick="saveprofile();">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="clearProfile();">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <style type="text/css">
        .thumb-image {
            float: left;
            width: 200px;
            height: 200px;
            position: relative;
            padding: 5px;
        }
    </style>

    <link href="../Administration/administration.css" rel="stylesheet" />
    <script type="text/javascript">
        var showmodalnew = function () {
            $("#myModalNEW").modal('show');
        };
    </script>

</asp:Content>
