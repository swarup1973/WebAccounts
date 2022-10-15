<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="profiles.aspx.cs" Inherits="WebAccounts.profiles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/profiles.js"></script> 
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

        <div class="row">
            <div class="col">
                <p>
                   Administration
					>
					Master
					>
					<strong>Profiles</strong>
                </p>
            </div>
        </div>


        <div class="clearfix"></div>
		

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                <table id="budget_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                                   <%-- <thead>
                                        <tr>
                                            <th>Code</th>
                                              <th>Description</th>
                                              <th>Local Currency</th>
                                              <th>Block</th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                            <td>123456789</td>
                                            <td>Company Description goes here</td>
                                            <th>Local Currency goes here</th>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                        </tr>
                                      </tbody>--%>
                                </table>
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>



    <!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Profiles - New</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Code</label>
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtCode" class="form-control">
						</div>
						<div class="col-sm-6">
							<label for="input">Description</label>
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtDescription" class="form-control">
						</div>
                        <div class="col-sm-6">
							<label for="input">Local Currency</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control" id="ddlcurrency">
                            	<%--<option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>--%>
                             </select>
						</div>
						<div class="col-sm-6">
							<label for="input">Block</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox" id="chk_block"/>
						</div>
					</div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="dosaveprofile();">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>
        </div>
    </div>
   
<!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Profiles - Edit</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Code</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="edittxtcode" readonly>
						</div>
						<div class="col-sm-6">
							<label for="input">Description</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="edittxtdescription">
						</div>
                        <div class="col-sm-6">
							<label for="input">Local Currency</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control" id="ddleditcurrency">
                             </select>
						</div>
						<div class="col-sm-6">
							<label for="input">Block</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox" id="chkeditblock"/>
						</div>
					</div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="updateprofiles();">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>
        </div>
    </div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
        $(document).ready(function () {
            ProObject.do_loadprofile();
        });

        var showmodal = function () {
            $("#myModal").modal('show');
        };

        
    </script>
    <%--<script type="text/javascript">
        let editor; // use a global for the submit and return data rendering in the examples

        $(document).ready(function () {
            editor = new $.fn.dataTable.Editor({
                table: "#budget_table",
            });
            $('#budget_table').DataTable({
                dom: "Bfrtip",

                select: true,
                buttons: [
                    {
                        add: "create", text: 'New', editor: editor, action: () => showmodal()
                    },
                    {
                        add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
                    },
                    {
                        extend: "remove", editor: editor
                    }
                ],

            })
        })

        

    </script>--%>
</asp:Content>

