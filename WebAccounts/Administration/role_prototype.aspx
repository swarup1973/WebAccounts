<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="role_prototype.aspx.cs" Inherits="WebAccounts.role_prototype" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/role_new.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

        <div class="row">
            <div class="col">
                <p>
                    <a href="roles.aspx">Back to old roles page [temporary link]</a>
                </p>
            </div>
        </div>

        <div class="page-title">
            <div class="title_left">
                <h3>Roles</h3>
            </div>
        </div>

        <div class="clearfix"></div>


        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <div class="card">
                            <div class="card-body">
                                <!-- start role table -->
                                <table id="roles_table" class="table table-striped table-hover table-condensed projects display datatable width-100"
                                    style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th>Role Code</th>
                                            <th>Description</th>
                                            <th>Role Center</th>
                                            <th>Allow Posting From</th>
                                            <th>Allow Posting To</th>
                                            <th>Block</th>
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
                    <h5 class="modal-title">Edit Role</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Role Code</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" id="txt_rolecode" maxlength="30" class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Description</label>
                            </div>
                            <div class="col-sm-6">
                                <textarea id="txt_description" maxlength="150" placeholder="Role description here..."></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Role Center ID</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="cbo_rolecenter">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Allow Posting From</label>
                            </div>
                            <div class="col-sm-6">
                                <!--<input class="date-picker form-control" id="txt_postingfrom" placeholder="mm/dd/yyyy" type="text"  onblur="this.type='date''" >-->
                                <input class="date-picker" type="date" id="txt_postingfrom" placeholder="mm/dd/yyyy" />
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
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Block</label>
                            </div>
                            <div style="margin-left: 10px;">
                                 <input type="checkbox" id="chk_isblocked" >
                                <!--<div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="chk_isblocked" class="flat">
                                    </label>
                                </div>-->
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="saverole();">Save</button>
                    </div>
                
            </div>
        </div>
    </div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <link href="administration.css" rel="stylesheet" />
    <script type="text/javascript">

</script>
</asp:Content>
