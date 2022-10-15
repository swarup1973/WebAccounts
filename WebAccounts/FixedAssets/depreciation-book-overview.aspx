﻿<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="depreciation-book-overview.aspx.cs" Inherits="WebAccounts.depreciation_book_overview" %>

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
					<strong>Depreciation Book Overview</strong>
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
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th>Block</th>
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


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <link href="../Administration/administration.css" rel="stylesheet" />
    <script type="text/javascript">

</script>
</asp:Content>
