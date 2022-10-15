<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="role_assignment.aspx.cs" Inherits="WebAccounts.role_assignment" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/rolesassignment.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">

        <div class="row">
            <div class="col">
                <p>
                    <a href="role_prototype.aspx">Back to roles page [temporary link]</a>
                </p>
                <p>
                    <a href="user_prototype.aspx">Back to users page [temporary link]</a>
                </p>
            </div>
        </div>

        <div class="page-title">
            <div class="title_left">
                <h3>Role Assignment to Users</h3>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <form>
                            <div class="form-row" id="div_role">
                                <div class="form-group col-md-6">
                                    <label for="selectRole">Role</label>
                                    <select id="selectRole" class="form-control form-control-sm" onchange="getempnamerole(this);">
                                    </select>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="roleDescription">Description</label>
                                    <input type="text" class="form-control form-control-sm" id="txt_rolename" readonly>
                                </div>
                            </div>
                            <div class="form-row" id="div_user">
                                <div class="form-group col-md-6">
                                    <label for="selectUser">User</label>
                                    <select id="selectUser" class="form-control form-control-sm" onchange="getempnameuser(this);">
                                    </select>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="userDescription">Description</label>
                                    <input type="text" id="txt_username" class="form-control form-control-sm" readonly>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <div class="card">
                            <div class="card-body">
                                <!-- start role table -->
                                <table id="role_assignment_table" class="table table-striped table-hover table-condensed projects display datatable width-100"
                                    style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Default</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                                <!-- end role table -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Entry</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">ID</label>
                            </div>
                            <div class="col-sm-6">
                                <!--<input type="text" class="form-control" value="1">-->
                                 <select class="form-control" id="dd_userorrole" onchange="getdesc(this);">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Name</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txt_userorrole">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onclick="dosaveassignment();">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <link href="administration.css" rel="stylesheet" />
    <script type="text/javascript">
     
    </script>
</asp:Content>
