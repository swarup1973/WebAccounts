<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="WebAccounts.roles" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Tax Authorities Set-up</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>General Ledger 
                >
                <a href="tax-authorities-overview.aspx">Tax Authorities-Overview</a> 
                >
                <strong>Tax Authorities Set-up</strong></p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                                <table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                   <tbody>
                                        <tr>
                                            <td><strong>Code</strong></td>
                                            <td><input type="text" class="form-control" /></td>
                                            <td rowspan="4"><strong>Address</strong></td>
                                            <td rowspan="4"><textarea name="textarea" class="form-control"></textarea></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Description</strong></td>
                                            <td><input type="text" class="form-control" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Tax Authority Code</strong></td>
                                            <td><select name="select" class="form-control">
                                              <option>--</option>
                                              <option>--</option>
                                        </select></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Tax Authority Name</strong></td>
                                            <td><input type="text" class="form-control" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Phone No-1</strong></td>
                                            <td><input type="text" class="form-control" /></td>
                                            <td><strong>Extension</strong></td>
                                            <td><input type="text" class="form-control" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Phone No-2</strong></td>
                                            <td><input type="text" class="form-control" /></td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td><strong>E-mail</strong></td>
                                            <td><input type="text" class="form-control" /></td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Website</strong></td>
                                            <td><input type="text" class="form-control" /></td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                    </tbody>
                      </table>
            <div class="clearfix"></div>
                                <div class="card-body" style="text-align:center">
                                <button type="button" class="btn btn-primary">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                  </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>

