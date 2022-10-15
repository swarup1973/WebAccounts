<%@ Page Title="Customer Posting Group" Language="C#"
MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind=""
Inherits="WebAccounts.users" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
  <script
    type="text/javascript"
    src="../Scripts/jquery-3.5.0.min.js?0"
  ></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
  <div class="">
    <div class="page-title">
      <div class="title_left">
        <!-- page title -->
        <h3>Customer Posting Group</h3>
      </div>
    </div>

    <div class="clearfix"></div>

    <!-- Place toolbar here -->
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li><a href="">New</a></li>
          <li><a href="">Edit</a></li>
          <li><a href="">Delete</a></li>
          <li><a href="customer_posting_setup.aspx">Posting Set-up</a></li>
        </ul>
      </div>
    </nav>

    <div class="row">
      <div class="col-md-12">
        <div class="x_panel">
            <div class="x_content">
              <!-- panel content -->
            <br>
            <form id="demo-form2" data-parsley-validate="" class="form-horizontal form-label-left" novalidate="">
            <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="code">Code
            </label>
            <div class="col-md-6 col-sm-6 ">
            <input type="text" id="code" class="form-control" maxlength="60">
            </div>
            </div>
            <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="description">Description
            </label>
            <div class="col-md-6 col-sm-6">
              <textarea placeholder="Max 200 characters" id="description" cols="30" rows="4" maxlength="200" class="form-control"></textarea>
            </div>
            </div>
            <div class="ln_solid"></div>
            <div class="item form-group">
            <div class="col-md-12 col-sm-12 text-center">
            <button class="btn btn-danger btn-lg">Cancel</button>
            <button class="btn btn-primary btn-lg">Save</button>
            </div>
            </div>
            </form>
            </div>
        </div>
      </div>
    </div>
  </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
  <script type="text/javascript"></script>
</asp:Content>
