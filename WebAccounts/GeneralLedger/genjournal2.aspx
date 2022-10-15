<%@ Page Title="General Journal" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="" Inherits="WebAccounts.users" %>



<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">

		<div class="row">
			<div class="col">
				<p>
					<a href="roles.aspx">Back to old roles page [temporary link]</a>
				</p>
			</div>
		</div>

        <div class="page-title">
            <div class="title_left">
                <h3>General Journal</h3>
            </div>
        </div>

	<div class="row">
        <div class="col">
            <nav class="card navbar navbar-expand-lg navbar-light bg-light">
                <div class="col nav navbar-nav">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item"><a href="#" class="nav-link">Batch Post <i class="fa fa-external-link-square"></i></a>
                        </li>
						<li class="nav-item"><a href="genjournal_line.aspx" class="nav-link">Journal Line Details <i class="fa fa-external-link-square"></i></a>
                        </li>
						<li>
						  <select class="form-control" name="" id="myselect">
							<option value="">-Workflow Approval-</option>
							<option value=""><a href="#">Send for Approval</a></option>
							  <option value="secondoption">View Status & Comment</option>
							  <option value="genjournal_line.aspx">Reopen to Edit</option>
							  <option value="approvers_actions.aspx">Approver's Actions</option>
						  </select>
						</li>
               	  </ul>
           	  </div>
       	  </nav>
       </div>
  </div>
	
  <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="card">
			  <div class="card-body">
					<!-- start Users table -->
                    <table id="general_journal_table"
                      class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                      <thead>
                        <tr>
							<th>Batch<span class="required-asterisk">*</span></th>
							<th>Name</th>
							<th>Date</th>
							<th>User Created</th>
							<th>Approval Status</th>
							<th>Date Approved</th>
							<th>Posted</th>
					    </tr>
					   </thead>
					   <tbody>
						  <tr>
							<td><select class="form-control">
									<option selected>12345</option>
									<option>35678</option>
									<option>13456</option>
									<option>34567</option>
									<option>76543</option>
									<option>90876</option>
								</select></td>
							<td>Batch Name</td>
							<td>12/01/2020</td>
							<td>25636</td>
							<td>Approved</td>
							<td>12/16/2020</td>
							<td>Yes</td>
						</tr>
                      </tbody>
                    </table>
                <!-- end Accounts list -->
					
                </div>
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
                    <h5 class="modal-title">Add New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				</form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Batch*</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control">
						</div>
					</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Add</button>
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
                    <h5 class="modal-title">Edit</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Batch*</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" value="12345">
						</div>
					</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Save</button>
                </div>
				</form>
            </div>
        </div>
    </div>

<!-- Modal HTML View Status & Comment -->
    <div class="modal fade" id="myModalVSC" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">View Status & Comment</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">User ID</label>
						</div>
						<div class="col-sm-6">
							<label for="input">12345</label>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Name</label>
						</div>
						<div class="col-sm-6">
							<label for="input">Batch Name</label>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Approval Date</label>
						</div>
						<div class="col-sm-6">
							<label for="input">12/16/2020</label>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Approval Level</label>
						</div>
						<div class="col-sm-6">
							<label for="input">Level</label>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Comment</label>
						</div>
						<div class="col-sm-6">
							<label for="input">Comment Comment Comment</label>
						</div>
					</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                </div>
				</form>
            </div>
        </div>
    </div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
        let editor; // use a global for the submit and return data rendering in the examples
 
        $(document).ready(function() {
            editor = new $.fn.dataTable.Editor( {
                table: "#general_journal_table",} );
            $('#general_journal_table').DataTable( {
                dom: "Bfrtip",

                select: true,
                buttons: [
                    {
                      add: "create", text: 'New', editor: editor, action: () => 
						showmodal()
                    },
                    {
                        add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit("")
                    },
          {
              extend: "remove", editor: editor
          },
                ]
            } );
        } );
		
		var showmodal = function () {
            $("#myModal").modal('show');
        };
		
		var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
		var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
		
		$(document).ready(function(){ //Make script DOM ready
    $('#myselect').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="secondoption"){ //Compare it and if true
            $('#myModalVSC').modal("show"); //Open Modal
        }
		else 
		{
			window.location=$('#myselect').val();
		}
    });
});

    </script>
</asp:Content>