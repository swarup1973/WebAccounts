<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="WebAccounts.roles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

        <div class="row">
            <div class="col">
                <p>
                   General Ledger
					>
					Master
					>
					<strong>Bank Account Setup</strong>

                </p>
            </div>
        </div>


        <div class="clearfix"></div>
		

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                <table id="budget_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>General</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Code</strong></td>
                                            <td>View from Overview. Modify-false</td>
                                            <td><strong>Branch Name</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Name</strong></td>
                                            <td>View from Overview. Modify-false</td>
                                            <td><strong>Branch Code</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Search Name</strong></td>
                                            <td>View from Overview. Modify-false</td>
                                            <td><strong>IFSC</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>A/C No</strong></td>
                                            <td>View from Overview. Modify-false</td>
                                            <td><strong>IBAN</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Min Balance</strong></td>
                                            <td><input type="text" /></td>
                                            <td><strong>GIRO Code</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Posting Group</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                            <td><strong>SWIFT Code</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Currency</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                            <td><strong>Person Responsible</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td><strong>Block</strong></td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                      </tbody>
                                </table>
                                <!-- end General table -->
                                
                                <table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                	<thead>
                                        <tr>
                                            <th>Contacts</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                   <tbody>
                                        <tr>
                                            <td><strong>Address-1</strong></td>
                                            <td><input type="text" /></td>
                                            <td><strong>Phone No</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Address-2</strong></td>
                                            <td><input type="text" /></td>
                                            <td><strong>Alternate No</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Pin</strong></td>
                                            <td><input type="text" /></td>
                                            <td><strong>Fax No</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>City</strong></td>
                                            <td><input type="text" /></td>
                                            <td><strong>Contact Person</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Country</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                            <td><strong>Email</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>County</strong></td>
                                            <td><input type="text" /></td>
                                            <td><strong>Website</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                      </tbody>
                                </table>
                                <!-- end Contacts table -->
                    </div>
                </div>
            </div>
        </div>
    </div>


<!-- Modal HTML NEW -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Edit</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
                	<div class="form-group row">
						<div class="col-sm-12">
							<strong>General</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Code</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Branch Name</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Name</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Branch Code</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Search Name</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">IFSC</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">A/C No</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">IBAN</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">A/C No</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">IBAN</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Min Balance</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">GIRO Code</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Posting Group</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">SWIFT Code</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Currency</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Person Responsible</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							
						</div>
						<div class="col-sm-3">
							
						</div>
						<div class="col-sm-3">
							<label for="input">Block</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Contacts</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Address-1</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Phone No</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Address-1</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Alternate No</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Pin</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Fax No</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">City</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Contact Person</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Country</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Email</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">County</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Website</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
					
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
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
                table: "#budget_table",} );
            $('#budget_table').DataTable( {
                dom: "Bfrtip",
				"bPaginate": false,
				"bLengthChange": false,
                select: false,
				"bFilter": false,
        		"bInfo": false,
				"ordering": false,
                buttons: [

                    {
                        add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
                    },
					{
                        add: "save", text: 'Save', editor: editor
                    },
					{
                        add: "transaction", text: 'Transaction', editor: editor, action: () => window.open("transaction.aspx")
                    },
					{
                        add: "check", text: 'Cheque Register', editor: editor, action: () => window.open("check_register.aspx")
                    },
					{
                        add: "dimension", text: 'Dimension', editor: editor, action: () => window.open("dimension_setup.aspx")
                    }
                ],
         
            })
        })

		var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
		
		
		
    </script>
</asp:Content>

