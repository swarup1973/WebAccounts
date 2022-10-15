<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="WebAccounts.roles" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <title>Home</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
        <div class="row">
            <div class="col page-title">
                  <div class="title_left">
                    <h5>Title: Home</h5>
                  </div>
                  <div class="title_right">
                    <p>Home > <strong>Breadcrumbs</strong>
                    </p>
                </div>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body table-responsive">

<!-- CONTENT GOES HERE-->

<ul>
<li><a href="../GeneralLedger/item-master-overview.aspx">Vendor Account Overview</a></li>
<li><a href="../GeneralLedger/chartofacct.aspx">Chart of Account</a></li>
<li><a href="../InventoryManagement/item-master-overview.aspx">Inventory Master</a></li>

</ul>

<!-- CONTENT END -->
                                
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>