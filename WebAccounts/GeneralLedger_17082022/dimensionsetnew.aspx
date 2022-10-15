<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="dimensionsetnew.aspx.cs" Inherits="WebAccounts.dimensionsetnew" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/dimension.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="page-title">
            <div class="title_left">
                <h3>Add/Edit Dimension Set</h3>
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
                                    <input type="text" id="txt_dimSetCode" class="form-control" placeholder="Code" maxlength="30">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Name </label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="text" id="txt_dimSetName" class="form-control" placeholder="Name" maxlength="120">
                                </div>
                            </div>

                            <div class="form-group">
                                <label id="lbl_dim1" class="control-label col-md-3 col-sm-3 col-xs-12">Branch</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_dim1_Branch" value="" style="height: 30px;">
                                </div>
                            </div>

                            <div class="form-group">
                                <label id="lbl_dim2" class="control-label col-md-3 col-sm-3 col-xs-12">Department</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_dim2_Dept" value="" style="height: 30px;">
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lbl_dim3" class="control-label col-md-3 col-sm-3 col-xs-12">Dimension-3</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_dim3" value="" style="height: 30px;">
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lbl_dim4" class="control-label col-md-3 col-sm-3 col-xs-12">Dimension-4</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_dim4" value="" style="height: 30px;">
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lbl_dim5" class="control-label col-md-3 col-sm-3 col-xs-12">Dimension-5</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_dim5" value="" style="height: 30px;">
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lbl_dim6" class="control-label col-md-3 col-sm-3 col-xs-12">Dimension-6</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_dim6" value="" style="height: 30px;">
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lbl_dim7" class="control-label col-md-3 col-sm-3 col-xs-12">Dimension-7</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_dim7" value="" style="height: 30px;">
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lbl_dim8" class="control-label col-md-3 col-sm-3 col-xs-12">Dimension-8</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_dim8" value="" style="height: 30px;">
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lbl_dim9" class="control-label col-md-3 col-sm-3 col-xs-12">Dimension-9</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_dim9" value="" style="height: 30px;">
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lbl_dim10" class="control-label col-md-3 col-sm-3 col-xs-12">Dimension-10</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_dim10" value="" style="height: 30px;">
                                </div>
                            </div>
                            <div class="form-group">
                                <label  class="control-label col-md-3 col-sm-3 col-xs-12">Enable</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="checkbox" id="chk_Isenabled" value="" style="height: 30px;">
                                </div>
                            </div>


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

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {
            $('#btn_cancel').on('click', function () {
                DimObject.dimensionsetdata.dimSetId = "";
                window.location.href = "dimensionset.aspx";
            });
            $('#btn_save').on('click', function () {
                DimObject.do_savedimensionset();
            });

            DimObject.do_loadDimensionSetData();
        });
    </script>
</asp:Content>
