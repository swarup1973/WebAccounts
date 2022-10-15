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
					<strong>GL Budget Overview</strong>

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
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                              <th>Description</th>
                                              <th>Date</th>
                                              <th>Account Type</th>
                                              <th>Period Basis</th>
                                              <th>Starting Date</th>
                                              <th>Ending Date</th>
                                              <th>Stopped</th>
                                              <th>Block</th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                            <td>Budget Name</td>
                                            <td>Budget Description</td>
                                            <td>2021/04/22</td>
                                            <td>All</td>
                                            <td>Yearly (FY)</td>
                                            <td>2021/04/22</td>
                                            <td>2021/04/22</td>
                                            <td>No</td>
                                            <td>Yes</td>
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
    <div class="modal fade" id="myModal" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Budget Overview - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Name</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" >
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Description</label>
						</div>
						<div class="col-sm-6">
							<textarea> </textarea>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Account Type</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
								<option selected="selected">All</option>
								<option>Assets</option>
								<option>Liabilities</option>
								<option>Income</option>
                                <option>Expenses</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Period Basis</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
								<option selected="selected">Yearly (FC)</option>
								<option>Monthly</option>
								<option>Weekly</option>
								<option>Daily</option>
							</select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Starting Date</label>
						</div>
						<div class="col-sm-6">
							 <input class="date-picker" type="date" id="txt_postingfrom" placeholder="yyyy/mm/dd" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Ending Date</label>
						</div>
						<div class="col-sm-6">
							 <input class="date-picker" type="date" id="txt_postingfrom" placeholder="yyyy//mm/dd" />
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
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save</button>
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
                    <h5 class="modal-title">Budget Overview - Edit</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Name</label>
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
							<textarea> </textarea>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Account Type</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
								<option selected="selected">All</option>
								<option>Assets</option>
								<option>Liabilities</option>
								<option>Income</option>
                                <option>Expenses</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Period Basis</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
								<option selected="selected">Yearly (FC)</option>
								<option>Monthly</option>
								<option>Weekly</option>
								<option>Daily</option>
							</select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Starting Date</label>
						</div>
						<div class="col-sm-6">
							 <input class="date-picker" type="date" id="txt_postingfrom" placeholder="yyyy/mm/dd" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Ending Date</label>
						</div>
						<div class="col-sm-6">
							 <input class="date-picker" type="date" id="txt_postingfrom" placeholder="yyyy//mm/dd" />
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
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Block</label>
						</div>
						<div class="col-sm-6">
							<div class="checkbox">
								<label>
								<input type="checkbox" checked="checked" class="flat">
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

<!-- Modal HTML COPY -->
    <div class="modal fade" id="myModalCOPY" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Budget Overview - Copy Budget</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Copy with Dimension Budget </label>
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
							<label for="input">Name</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" >
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Description</label>
						</div>
						<div class="col-sm-6">
							<textarea> </textarea>
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
                    },
                    {
                        add: "copy", text: 'Copy Budget', editor: editor, action: () => showmodalcopy()
                    },
					{
                        add: "register", text: 'Budget Register', editor: editor, action: () => window.open("budget-register.aspx")
                    },
					{
                        add: "stop", text: 'Stop', editor: editor, action: () => window.open("#")
                    },
					{
                        add: "approval", text: 'Approval', editor: editor, action: () => window.open("#")
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
		var showmodalcopy = function () {
            $("#myModalCOPY").modal('show');
        };
		
		
		
    </script>
</asp:Content>

