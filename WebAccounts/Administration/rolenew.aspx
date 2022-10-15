<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="rolenew.aspx.cs" Inherits="WebAccounts.rolenew" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">

    <style type="text/css">
        input.largerCheckbox {
            width: 30px;
            height: 20px;
        }
    </style>

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/roles.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="page-title">
            <div class="title_left">
                <h3>Add/Edit Role</h3>
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
                                <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">
                                    Role Name <span class="required">*</span>
                                </label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" id="txt_rolename" required="required" class="form-control col-md-7 col-xs-12" maxlength="50">
                                </div>
                            </div>
                            <div class="ln_solid"></div>
                            <div class="form-group">

                                <table id="tbl_all_pages" class="table table-striped">
                                </table>

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
        $(document).ready(function () {
            $('#btn_cancel').on('click', function () {
                RolesObject.rolesdata.roleid = "";
                window.location.href = "roles.aspx";
            });
            $('#btn_save').on('click', function () {
                RolesObject.do_saveroles();
            });

            RolesObject.do_loadAllPages();
        });
    </script>
</asp:Content>
