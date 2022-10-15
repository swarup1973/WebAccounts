<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="WebAccounts.roles" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Tax Destination</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                   General Ledger
					>
					<a href="sales-tax-group-overview.aspx">Vendor-Customer Sales Tax Group Overview</a> >
					<strong>Tax Destination</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>
		
		<div class="row">
            <div class="col">
				Group Description: <strong>Display of Group Description</strong>
            </div>
        </div>
		
		<div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                <table id="item_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>Country</th>
                                            <th>State</th>	
                                            <th>City</th>
                                            <th>District</th>
											<th>Postal Code</th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>
											<td>--</td>
                                        </tr>
                                      </tbody>
                                </table>
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>



<!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">New</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Country</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
				   		</div>
						<div class="col-sm-3">
							<label for="input">State</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">City</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
				    	</div>
						<div class="col-sm-3">
							<label for="input">District</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Postal Code</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
				    	</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Add</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>
        </div>
    </div>

<!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Edit</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Country</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
				   		</div>
						<div class="col-sm-3">
							<label for="input">State</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">City</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
				    	</div>
						<div class="col-sm-3">
							<label for="input">District</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Postal Code</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
				    	</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
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
                table: "#item_table",} );
            	$('#item_table').DataTable( {
                dom: "Bfrtip",
				"bPaginate": false,
				"bLengthChange": false,
                select: false,
				"bFilter": false,
        		"bInfo": false,
				"ordering": false,
                buttons: [
					{
						add: "create", text: 'New', editor: editor, action: () => showmodal()
					},
                    {
                        add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
                    },
                    {
                        add: "save", text: 'Save', editor: editor
                    },
					{
                        extend: "remove", editor: editor
                    }
                ],
         
            })
        })

        var showmodal = function () {
            $("#myModal").modal('show');
        };
		var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };

    </script>
</asp:Content>

