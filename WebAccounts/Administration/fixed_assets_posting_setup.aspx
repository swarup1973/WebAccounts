<%@ Page Title="Fixed Assets Posting Setup" Language="C#"
MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind=""
Inherits="WebAccounts.users" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
  <script
    type="text/javascript"
    src="../Scripts/jquery-3.5.0.min.js?0"
  ></script>
  <script type="text/javascript" src="js/roles.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
  <div class="">
    <div class="page-title">
      <div class="title_left">
        <!-- page title -->
        <h3>Fixed Assets Posting Set-up</h3>
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
        </ul>
      </div>
    </nav>

    <div class="row">
      <div class="col-md-12">
        <div class="x_panel">
            <div class="x_content">
              <!-- panel content -->
            <br>
                <table class="table">
                    <thead>
                      <tr>
                        <th>Group</th>
                        <th>Acquisition AC</th>
                        <th>Accm. Depreciation AC</th>
                        <th>Depreciation Expense AC</th>
                        <th>Adjustment AC on Disposal</th>
                        <th>Gain/Loss on Disposal</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" class="form-control" readonly>
                            </td>
                            <td>
                                <select name="acquisition_ac" id="acquisition_ac" class="form-control"></select>
                            </td>
                            <td>
                                <select name="accm_depreciation_ac" id="accm_depreciation_ac" class="form-control"></select>
                            </td>
                            <td>
                                <select name="depreciation_expense_ac" id="depreciation_expense_ac" class="form-control"></select>
                            </td>
                            <td>
                                <select name="adjustment_ac" id="adjustment_ac" class="form-control"></select>
                            </td>
                            <td>
                              <select name="gain_loss_disposal" id="gain_loss_disposal" class="form-control"></select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            <div class="ln_solid"></div>
            <div class="item form-group">
            <div class="col-md-12 col-sm-12 text-center">
            <button class="btn btn-danger btn-lg">Cancel</button>
            <button class="btn btn-primary btn-lg">Save</button>
            </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
  <script type="text/javascript"></script>
</asp:Content>
