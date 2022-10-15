<%@ Page Title="Vendor Posting Setup" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="" Inherits="WebAccounts.users" %>



<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
<div class="row">
			<div class="col">
				<p>
					Administration
					>
					Setups
					>
					<a href="http://staging.rksoftwareinc.com/accounts/Administration/posting_setup.aspx" class="text-dark page_path_link">Posting Setup</a>
					>
					<a href="http://staging.rksoftwareinc.com/accounts/Administration/vendor_posting_group.aspx" class="text-dark page_path_link">Vendor Posting Group</a>
                    >
					<a href="http://staging.rksoftwareinc.com/accounts/Administration/vendor_posting_setup.aspx" class="text-dark page_path_link">Vendor Posting Setup</a>
				</p>
			</div>
		</div>
        
	<div class="row">
		<div class="col">
        <div class="page-title">
            <div class="title_left">
                <h3>Vendor Posting Setup</h3>
            </div>
        </div>
		</div>
	</div>	

  <div class="row">
      <div class="col">
            <div class="card">
			  <div class="card-body">
					<!-- start Users table -->
                    <table id="vendor_posting_setup"
                      class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                      <thead>
                        <tr>
							<th>Group</th>
							<th>Payable Ledger AC</th>
							<th>Payment Discount AC</th>
							<th>Reoudnig-off AC</th>
                            <th>Prepayment AC</th>
					    </tr>
					   </thead>
					   <tbody>
						  <tr>
							<td>Group Name</td>
							<td>123456</td>
							<td>789012</td>
							<td>345678</td>
							<td>901234</td>
						</tr>
                      </tbody>
                    </table>
                <!-- end Accounts list -->
					
                </div>
        </div>
      </div>
    </div>

<!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">New Entry</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Group</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Payable Ledger AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
								<option selected></option>
								<option>12345</option>
								<option>56789</option>
								<option>02468</option>
								<option>13579</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Payment Discount AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
								<option selected></option>
								<option>12345</option>
								<option>56789</option>
								<option>02468</option>
								<option>13579</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Rounding-off AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
								<option selected></option>
								<option>12345</option>
								<option>56789</option>
								<option>02468</option>
								<option>13579</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Prepayment AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
								<option selected></option>
								<option>12345</option>
								<option>56789</option>
								<option>02468</option>
								<option>13579</option>
							</select>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
						<button type="button" class="btn btn-primary">Save</button>
					</div>
				</div>
				</form>
            </div>
        </div>
    </div>

<!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Entry</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Group</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" value="1111">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Payable Ledger AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
								<option selected>12345</option>
								<option>12345</option>
								<option>56789</option>
								<option>02468</option>
								<option>13579</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Payment Discount AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
								<option selected>02468</option>
								<option>12345</option>
								<option>56789</option>
								<option>02468</option>
								<option>13579</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Rounding-off AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
								<option selected>02468</option>
								<option>12345</option>
								<option>56789</option>
								<option>02468</option>
								<option>13579</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Prepayment AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
								<option selected>12345</option>
								<option>12345</option>
								<option>56789</option>
								<option>02468</option>
								<option>13579</option>
							</select>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
						<button type="button" class="btn btn-primary">Save</button>
					</div>
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
                table: "#vendor_posting_setup",} );
            $('#vendor_posting_setup').DataTable( {
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
		

    </script>
</asp:Content>