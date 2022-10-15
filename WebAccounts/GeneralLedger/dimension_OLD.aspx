<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="dimension.aspx.cs" Inherits="WebAccounts.dimension" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/dimension.js"></script>
    <script type="text/javascript" src="js/dimensionnew.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="page-title">
            <div class="title_left">
                <h3>Dimension <small>Listing page</small></h3>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col-md-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Dimension</h2>
                        <ul class="nav navbar-right panel_toolbox">
                            <li>
                                <button type="button" id="btn_newdimension" class="btn btn-dark">New Dimension</button></li>
                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                            </li>
                            <!--<li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="#">Settings 1</a>
                                    </li>
                                    <li><a href="#">Settings 2</a>
                                    </li>
                                </ul>
                            </li>
                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                            </li>-->
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content">

                        <!--<p>Simple table with project listing with progress and editing options</p>-->

                        <!-- start Users list -->
                        <table id="tbl_data" class="table table-striped projects">
                        </table>
                        <!-- end Users list -->

                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {
            DimObject.do_loaddimensionlist();

            $('#btn_newdimension').on('click', function () {
                DimensionObject.dimension.dimId = "";
                window.location.href = "dimensionnew.aspx";
            });

        });

    </script>
</asp:Content>
