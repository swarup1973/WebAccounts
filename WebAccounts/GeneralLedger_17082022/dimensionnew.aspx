<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="dimensionnew.aspx.cs" Inherits="WebAccounts.dimensionnew" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/dimensionnew.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="page-title">
            <div class="title_left">
                <h3>Add/Edit Dimension</h3>
            </div>

            <!--<div class="title_right">
                <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for...">
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="button">Go!</button>
                    </span>
                  </div>
                </div>
              </div>-->
        </div>
        <div class="clearfix"></div>
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Add/Edit <small></small></h2>
                        <ul class="nav navbar-right panel_toolbox">
                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                            </li>

                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content">
                        <br />
                        <div id="div1" class="form-horizontal form-label-left">

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Code</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="text" id="txt_dimCd" class="form-control" placeholder="Code" maxlength="30">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Name (Caption) </label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="text" id="txt_dimCaption" class="form-control" placeholder="Name (Caption)" maxlength="120">
                                </div>
                            </div>
                             <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Description </label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="text" id="txt_dimDesc" class="form-control" placeholder="Description" maxlength="120">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Applicable for Access Control</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_IsAcApp" value="" style="height: 30px;">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">All Balance Sheet Ledgers</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_IsAppBSLedger" value="" style="height: 30px;">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">All Income Ledgers</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_IsAppIncomeLedger" value="" style="height: 30px;">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">All Expense Ledgers</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_IsAppExpnsLedger" value="" style="height: 30px;">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">All Opening Ledgers</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_IsAppOBLedger" value="" style="height: 30px;">
                                </div>
                            </div>
                             <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Enable</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_Isenabled" value="" style="height: 30px;">
                                </div>
                            </div>

                             <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Dimension Values</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <button id="btn_addnewdimensionvalues" class="btn btn-success"   value="Add" onclick ="appendRow()">Add New Dimension Value</button>
                                </div>
                            </div>
                            <div  id="div_dimensionvalues">
                           <table id="tbldimensionvalues"  style="padding:5px; border-spacing: 8px 6px;border-collapse: separate; border: 1px solid #2A3F54;"></table>
                            </div>
                            
                            <div class="ln_solid"></div>
                            <div class="form-group">
                                <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                    <button id="btn_cancel" class="btn btn-primary" formnovalidate>Cancel</button>
                                    <button id="btn_save" class="btn btn-success" formnovalidate>Save</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <script type="text/javascript">
        /*$(document).ready(function () {
            $('#btn_cancel').on('click', function () {
                DimensionObject.dimension.dimId = '';
                window.location.href = "dimension.aspx";
            });
            $('#btn_save').on('click', function () {
                //RolesObject.do_saveuser();
            });
        });*/
    </script>
</asp:Content>
