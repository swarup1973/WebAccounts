<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="user_prototype.aspx.cs" Inherits="WebAccounts.user_prototype" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/user_new.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">

        <div class="row">
            <div class="col">
                <p>
                    <a href="users.aspx">Back to old users page [temporary link]</a>
                </p>
            </div>
        </div>

        <div class="page-title">
            <div class="title_left">
                <h3>Users <small>Listing page</small></h3>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <div class="card">
                            <div class="card-body">
                                <!-- start Users table -->
                                <table
                                    id="admin_users_table"
                                    class="table table-striped table-hover table-condensed projects display datatable width-100"
                                    style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>Name</th>
                                            <th>Allow Posting From</th>
                                            <th>Allow Posting To</th>
                                            <th>Block</th>
                                            <th>User Type</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                                <!-- end Users table -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal HTML User -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit User</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">User ID</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_employee" onchange="getempname(this);">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Emplayee Name</label>
                            </div>
                            <div class="col-sm-6">
                                <!--<input type="text" class="form-control"id="txt_ename">-->
                                <label for="input" id="lbl_ename"></label>
                                </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Login Name</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txt_loginname" maxlength="20">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Password</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="password" class="form-control" id="txt_password">
                            </div>
                        </div>
                        
                                <div class="form-group row">
                                    <div class="col-sm-6">
                                        <label for="input">Allow Posting From</label>
                                    </div>
                                    <div class="col-sm-6">
                                        <input class="date-picker" type="date" id="txt_postingfrom" placeholder="mm/dd/yyyy" />
                                        <!--<input class="date-picker form-control" id="txt_postingfrom" placeholder="mm/dd/yyyy" type="text" onfocus="this.type='date'" onmouseover="this.type='date'" onclick="this.type = 'date'" onblur="this.type='date''" onmouseout="this.type='date'">
                                <script>
                                    function timeFunctionLong(input) {
                                        setTimeout(function () {
                                            input.type = 'text';
                                        }, 60000);
                                    }
                                </script>-->
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Allow Posting To</label>
                            </div>
                            <div class="col-sm-6">
                                <input class="date-picker" type="date" id="txt_postingto" placeholder="mm/dd/yyyy" />
                                <!--<input class="date-picker form-control" id="txt_postingto" placeholder="mm/dd/yyyy" type="text" onfocus="this.type='date'" onmouseover="this.type='date'" onclick="this.type = 'date'" onblur="this.type='date''" onmouseout="this.type='date'">
                                <script>
                                    function timeFunctionLong(input) {
                                        setTimeout(function () {
                                            input.type = 'text';
                                        }, 60000);
                                    }
                                </script>-->
                            </div>
                        </div>
                        <div class="form-group row" id="divBlock">
                            <div class="col-sm-6">
                                <label for="input">Block</label>
                            </div>
                            <div style="margin-left: 10px;">
                                <input type="checkbox" id="chk_isblocked">
                                <!--<div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="chk_isblocked" class="flat">
                                    </label>
                                </div>-->
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">User Type</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_user_type">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row" id="divCompany">
                            <!-- start Users table -->
                                <table
                                    id="company_users_table"
                                    class="table table-striped table-hover table-condensed projects display datatable width-100"
                                    style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th>Select</th>
                                            <th>Company ID</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                              <!-- end Users table -->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" id="btn_save" class="btn btn-primary" onclick="saveuser();">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <link href="administration.css" rel="stylesheet" />
    <script type="text/javascript">

</script>
</asp:Content>
