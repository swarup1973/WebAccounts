<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="role_permissions.aspx.cs" Inherits="WebAccounts.role_permissions" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <%--<script type="text/javascript" src="js/roles.js"></script>--%>
    <script type="text/javascript" src="js/role_permissions.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
        <style>
        /* Remove default bullets */
        ul, #myUL {
            list-style-type: none;
        }

        /* Remove margins and padding from the parent ul */
        #myUL {
            margin: 0;
            padding: 0;
        }

        /* Style the caret/arrow */
        .caret {
            cursor: pointer;
            user-select: none; /* Prevent text selection */
        }

            /* Create the caret/arrow with a unicode, and style it */
            .caret::before {
                content: "\25B6";
                color: black;
                display: inline-block;
                margin-right: 6px;
            }

        /* Rotate the caret/arrow icon when clicked on (using JavaScript) */
        .caret-down::before {
            transform: rotate(90deg);
        }

        /* Hide the nested list */
        .nested {
            display: none;
        }

        /* Show the nested list when the user clicks on the caret/arrow (with JavaScript) */
        .active {
            display: block;
        }

    </style>
    <div class="">

        <div class="row">
            <div class="col">
                <p>
                    <a href="role_prototype.aspx">Back to roles page [temporary link]</a>
                </p>
            </div>
        </div>

        <div class="page-title">
            <div class="title_left">
                <h3>Rights and Permissions</h3>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <form>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="selectRole">Role</label>
                                    <select id="selectRole" class="form-control form-control-sm" onchange="onchangerole(this);">
                                        
                                    </select>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="roleDescription">Description</label>
                                    <input type="text"  class="form-control form-control-sm" id="roleDescription" readonly>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="selectUser">User</label>
                                    <select id="selectUser" class="form-control form-control-sm" onchange="onchangeuser(this);">
                                       
                                    </select>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="userDescription">Name</label>
                                    <input type="text"  class="form-control form-control-sm" id="userDescription" readonly>
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


                        <!--<div align="center">
                            <label>Block</label>
                            <input type="checkbox" class="flat">
                            <label>Stop</label>
                            <input type="checkbox" class="flat">
                        </div>-->

                        <div class="card col-md-3">
                            <div class="card-body">

                                <ul id="myUL" style="width: 100%; min-height: 358px;">
                                    
                                </ul>

                            </div>
                        </div>


                        <div class="card col-md-9">
                            <div class="card-body">
                                <div id="div_iscustomrole" style="display:none;"><input type="checkbox" id="chk_iscustomrole">
                                <label for="chk_iscustomrole"> Is Custom Role</label><br></div>
                                <div style=" height:390px; Overflow-x:scroll; Overflow-y:scroll;">
                                <table id="role_permission_table"
                                    class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th>Menu Name</th>
                                            <th>Type</th>
                                            <th>Read</th>
                                            <th>Write/Execute</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                            <th>All</th>
                                            <th>Path</th>
                                            <th>Link</th>
                                        </tr>
                                    </thead>

                                    <tbody id="role_permission_table_body">
                                        
                                    </tbody>
                                </table>
                                </div>
                                <div class="ln_solid"></div>
                                <div class="item form-group">
                                    <div class="col-md-6 col-sm-6 offset-md-3">
                                        <button type="submit" id="btn_submit" class="btn btn-success" onclick="dosavepermission();" >Save</button>
                                        <!--<button class="btn btn-primary btn-danger" type="button">Delete</button>-->
                                        <button class="btn btn-primary" type="reset" onclick="docancelpermission();">Cancel</button>
                                    </div>
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

        /*
        $(document).ready(function () {
            var table = $('#role_permission_table').DataTable({
                "paging": true,
                responsive: true,

                bInfo: true,
                "columnDefs": [{
                    "targets": [2, 3, 4, 5, 6],
                    "render": function (data, type, row, meta) {
                        console.log("XX " + meta.row + " " + meta.col);
                        return type === 'display' ?
                            '<input type="checkbox" /> ' + data :
                            data;
                    }
                }]
            });

            $('input[type="checkbox"]').on('change', function () {
                $('input[name="' + this.name + '"]').not(this).prop('checked', false);
            });

        });

        var toggler = document.getElementsByClassName("caret");
        var i;

        for (i = 0; i < toggler.length; i++) {
            toggler[i].addEventListener("click", function () {
                this.parentElement.querySelector(".nested").classList.toggle("active");
                this.classList.toggle("caret-down");
            });
        }*/
    </script>
</asp:Content>
