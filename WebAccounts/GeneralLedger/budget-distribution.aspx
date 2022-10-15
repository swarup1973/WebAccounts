<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="WebAccounts.roles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">


        <div class="row">
            <div class="col">
                <p>
                   General Ledger
					>
					Master
					>
                    <a href="budget-overview.aspx" class="text-dark page_path_link">Budget Overview</a>
                    >
                    <a href="budget-register.aspx" class="text-dark page_path_link">Budget Register</a>
                    >
					<strong>Budget Distribution</strong>

                </p>
            </div>
        </div>
        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
            
            	<div class="card">
                <div class="card-body">
                
                    <div class="col-md-12 col-sm-12">
                        <div class="col-md-5 col-sm-5">
                        
                        <div class="col-md-12 col-sm-12">
                            Ledger Account Name: Ledger Account
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-6 col-sm-6">
                            Budget Date from: 2021/04/22
                        </div>
                        <div class="col-md-6 col-sm-6">
                            Budget-to date: 2021/04/22
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-12 col-sm-12">
                            Budget Name: Name from Overview to display
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-12 col-sm-12">
                            Budget Amount Total: <input type="text" maxlength="20">
                        </div>
                        </div>
                        
                        <div class="col-md-7 col-sm-7">
                        	<div class="col-md-6 col-sm-6">
                            Filter Period from: <input class="date-picker" type="date" id="txt_postingfrom" placeholder="yyyy/mm/dd" />
                        	</div>
                            <div class="col-md-6 col-sm-6">
                            Filter Period to: <input class="date-picker" type="date" id="txt_postingfrom" placeholder="yyyy/mm/dd" /> 
                        	</div>
                            <div class="clearfix"></div>
                            <div class="col-md-6 col-sm-6">
                            <label>Filter Dimension:</label> 
                            <select>
                            	<option>Branch</option>
                            	<option>Department</option>
								<option>Dimension-3</option>
								<option>Dimension-4</option>
                                <option>Dimension-5</option>
                                <option>Dimension-6</option>
                                <option>Dimension-7</option>
                                <option>Dimension-8</option>
                                <option>Dimension-9</option>
                                <option>Dimension-10</option>
							</select>
                        	</div>
                            <div class="col-md-6 col-sm-6">
                            <label>Filter Dimension Value:</label> 
                            <select>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
							</select>
                        	</div>
                            <div class="clearfix"></div>
                            <div class="col-md-12 col-sm-12">
                            <button type="button" class="btn btn-secondary alignright">Search</button>
                        	</div>
                        </div>
                	</div>
                
                </div>
                </div>

                <div class="card">
                    <div class="card-body">
                    <button type="button" class="btn btn-secondary">Undo Distribution by Period</button>
                    <button type="button" class="btn btn-secondary">Undo Distribution by Dimension</button>
                    
                                <!-- start role table -->
                                <table id="budget_register_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>Entry No</th>
                                              <th>Date</th>
                                              <th>Period Basis</th>
                                              <th>From Date</th>
                                              <th>To Date</th>
                                              <th>Budget Amount</th>
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
                                              <th>Stopped</th>
                                              <th>Revised</th>
                                              <th>Last Revised on</th>
                                              <th>Revised-Ref</th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                            <td>12345</td>
                                            <td>2021/04/22</td>
                                            <td>Year</td>
                                            <td>2021/04/22</td>
                                            <td>2021/04/22</td>
                                            <td>90,000.00</td>
                                            <td>Branch Name</td>
                                            <td>Department Name</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>6</td>
                                            <td>7</td>
                                            <td>8</td>
                                            <td>9</td>
                                            <td>10</td>
                                            <td>No</td>
                                            <td>No</td>
                                            <td>2021/04/22</td>
                                            <td>Ref-12345</td>
                                        </tr>
                                      </tbody>
                                </table>
                                	<div class="ln_solid"></div>
									<div class="form-group row">
										<div class="col-md-9 col-sm-9  offset-md-3">
												<button type="submit" class="btn btn-success">Save</button>
                                                <button type="button" class="btn btn-primary">Cancel</button>
										</div>
									</div>
                                <!-- end role table -->

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
							<label for="input">Period Basis</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
								<option selected="selected">Year</option>
								<option>Month</option>
								<option>Week</option>
								<option>Day</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">From Date</label>
						</div>
						<div class="col-sm-6">
							<input class="date-picker" type="date" id="txt_postingfrom" placeholder="yyyy/mm/dd" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">To Date</label>
						</div>
						<div class="col-sm-6">
							 <input class="date-picker" type="date" id="txt_postingfrom" placeholder="yyyy/mm/dd" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Budget Amount</label>
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

<!-- Modal HTML TRANSFER -->
    <div class="modal fade bd-example-modal-lg" id="myModalTRANSFER" tabindex="-1">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Budget Transfer</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Transfer Budget Value between:</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
								<option>Dimension</option>
								<option>Period</option>
							</select>
						</div>
						<div class="col-sm-3">
							<label for="input">Amount to transfer:</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">From Dimension:</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
								<option>--</option>
								<option>--</option>
							</select>
						</div>
					</div>
                    
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">From Dimension Value:</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
								<option>--</option>
								<option>--</option>
							</select>
						</div>
						<div class="col-sm-3">
							<label for="input">Period from:</label>
						</div>
						<div class="col-sm-3">
							 <select class="form-control">
								<option>--</option>
								<option>--</option>
							</select>
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">To Dimension:</label>
						</div>
						<div class="col-sm-3">
							 <select class="form-control">
								<option>--</option>
								<option>--</option>
							</select>
						</div>
						<div class="col-sm-3">
							<label for="input">Period to:</label>
						</div>
						<div class="col-sm-3">
							 <select class="form-control">
								<option>--</option>
								<option>--</option>
							</select>
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">To Dimension Value:</label>
						</div>
						<div class="col-sm-3">
							 <select class="form-control">
								<option>--</option>
								<option>--</option>
							</select>
						</div>
					</div>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">OK</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>
        </div>
    </div>

<!-- Modal HTML Budget Distribution by Period -->
    <div class="modal fade" id="myModalPERIOD" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Budget Distribution by Period</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Full Period?</label>
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
							<label for="input">Remaining Period?</label>
						</div>
						<div class="col-sm-6">
							<label>
								<input type="checkbox" class="flat">
							</label>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Period Basis:</label>
						</div>
						<div class="col-sm-6">
							 Year
						</div>
					</div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">OK</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>
        </div>
    </div>

<!-- Modal HTML Budget Distribution by Dimension -->
    <div class="modal fade" id="myModalDIMENSION" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Budget Distribution by Dimension</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-3">
							<strong>Select</strong>
						</div>
                        <div class="col-sm-9">
							<strong>Dimension</strong>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-9">
							<label>Branch</label>
						</div>
                        <div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-9">
							<label>Department</label>
						</div>
                        <div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-9">
							<label>Dimension 3 Caption will appear as display</label>
						</div>
                        <div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-9">
							<label>Dimension 4 Caption will appear as display</label>
						</div>
                        <div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-9">
							<label>Dimension 5 Caption will appear as display</label>
						</div>
                        <div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-9">
							<label>Dimension 6 Caption will appear as display</label>
						</div>
                        <div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-9">
							<label>Dimension 7 Caption will appear as display</label>
						</div>
                        <div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-9">
							<label>Dimension 8 Caption will appear as display</label>
						</div>
                        <div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-9">
							<label>Dimension 9 Caption will appear as display</label>
						</div>
                        <div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-9">
							<label>Dimension 10 Caption will appear as display</label>
						</div>
					</div>
					
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">OK</button>
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
                        add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
                    },
                    {
                        extend: "remove", editor: editor
                    },
					{
                        add: "revise", text: 'Revise', editor: editor, action: () => window.open("#")
                    },
					{
                        add: "stop", text: 'Stop', editor: editor, action: () => window.open("#")
                    },
					{
                        add: "transfer", text: 'Transfer', editor: editor, action: () => showmodaltransfer()
                    },
					{
                        add: "distribute-evenly-by-dimension", text: 'Distribute Evenly by Period', editor: editor, action: () => showmodalperiod()
                    },
					{
                        add: "distribution-by-dimension", text: 'Distribute by Dimension Value', editor: editor, action: () => showmodaldimension()
                    },

                ],
         
            })
        })

        var showmodal = function () {
            $("#myModal").modal('show');
        };
		
		var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
		var showmodaltransfer = function () {
            $("#myModalTRANSFER").modal('show');
        };
		var showmodalperiod = function () {
            $("#myModalPERIOD").modal('show');
        };
		var showmodaldimension = function () {
            $("#myModalDIMENSION").modal('show');
        };
		
    </script>
</asp:Content>

