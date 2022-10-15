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
                    <a href="budget-overview.aspx" class="text-dark page_path_link">Budget Overview</a>
                    >
					<strong>Budget Register</strong>

                </p>
            </div>
        </div>
        <div class="clearfix"></div>
        
		<div class="row">
            <div class="col">
                
            </div>
        </div>
        
		<div class="clearfix"></div>
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                    <div class="col-md-8 col-sm-8">
                <div class="col-md-8 col-sm-8">
                	<div class="col-md-12 col-sm-12">
                    	Name: Display Name
                	</div>
                    <div class="col-md-12 col-sm-12">
                    	Description: Display Description
                	</div>
                    <div class="col-md-6 col-sm-6">
                    	Budget-from date: 2021/04/22
                	</div>
                    <div class="col-md-6 col-sm-6">
                    	Budget-to date: 2021/04/22
                	</div>
                </div>
                <div class="col-md-4 col-sm-4 form-group pull-right top_search">
					<div class="input-group">
						<input type="text" class="form-control" placeholder="Filter Ledger...">
						<span class="input-group-btn">
						<button class="btn btn-default" type="button">Search</button>
						</span>
					</div>
                </div>
                </div>
                </div>
                </div>
                
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                <table id="budget_register_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>Select</th>
                                              <th>Ledger Code</th>
                                              <th>Description</th>
                                              <th>Account Type</th>
                                              <th>Budget Amount-Total</th>
                                              <th>Branch</th>
                                              <th>Department</th>
                                              <th>Dimension-3</th>
                                              <th>Dimension-4</th>
                                              <th>Dimension-5</th>
                                              <th>Dimension-6</th>
                                              <th>Dimension-7</th>
                                              <th>Dimension-8</th>
                                              <th>Dimension-9</th>
                                              <th>Dimension-10</th>
                                              <th>Revised</th>
                                              <th>Last Revised on</th>
                                              <th>Block</th>
                                              <th>Stopped</th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                            <td><input type="checkbox"></td>
                                            <td>Code12345</td>
                                            <td>Description of code</td>
                                            <td>12345</td>
                                            <td>67890</td>
                                            <td>Branch Name</td>
                                            <td>Budget Department</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>6</td>
                                            <td>7</td>
                                            <td>8</td>
                                            <td>9</td>
                                            <td>10</td>
                                            <td>No</td>
                                            <td>2021/04/22</td>
                                            <td><input type="checkbox"></td>
                                            <td>No</td>
                                        </tr>
                                      </tbody>
                                </table>
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>

<!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Budget Distribution - Edit</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Ledger Code</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Description</label>
						</div>
						<div class="col-sm-6">
							<textarea></textarea>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Total</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Branch</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Department</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension-3</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension-4</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension-5</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension-6</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension-7</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension-8</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension-9</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension-10</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control">
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Revised</label>
						</div>
						<div class="col-sm-6">
							<div class="checkbox">
								<label>
								<input type="checkbox" class="flat">
								</label>
							</div>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Last Revised on</label>
						</div>
						<div class="col-sm-6">
							<input class="date-picker" type="date" id="txt_postingfrom" placeholder="yyyy/mm/dd" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Block</label>
						</div>
						<div class="col-sm-6">
							<div class="checkbox">
								<label>
								<input type="checkbox" class="flat">
								</label>
							</div>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Stopped</label>
						</div>
						<div class="col-sm-6">
							<div class="checkbox">
								<label>
								<input type="checkbox" class="flat">
								</label>
							</div>
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
                table: "#budget_register_table",} );
            $('#budget_register_table').DataTable( {
                dom: "Bfrtip",

                select: true,
                buttons: [
                    {
                        add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit("")
                    },
                    {
                        extend: "remove", editor: editor
                    },
					{
                        add: "stop", text: 'Stop', editor: editor, action: () => window.open("#")
                    },
					{
                        add: "budget-distribution", text: 'Budget Distribution', editor: editor, action: () => window.open("budget-distribution.aspx")
                    },
					{
                        add: "budget-balance-variance", text: 'Budget Balance & Variance', editor: editor, action: () => window.open("budget-balance-variance.aspx")
                    }
                ],
         
            })
        })


		var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
		
		
    </script>
</asp:Content>

