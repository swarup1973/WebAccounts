<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master"
AutoEventWireup="true" CodeBehind="users.aspx.cs" Inherits="WebAccounts.users"
%>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
  <script
    type="text/javascript"
    src="../Scripts/jquery-3.5.0.min.js?0"
  ></script>
  <script type="text/javascript" src="js/roles.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
  <div class="">

		<div class="row">
			<div class="col">
				<p>
					<a href="users.aspx">Back to old users page [temporary link]</a>
				</p>
			</div>
		</div>

    <div class="page-title">
      <div class="title_left">
        <h3>Users <small>Listing page</small></h3>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="card">
							<div class="card-body">
								<!-- start Users table -->
								<table
									id="admin_users_table"
									class="table table-striped table-hover table-condensed projects display datatable width-100"
									style="width: 100%;"
								>
									<thead>
										<tr>
											<th>User ID</th>
											<th>Name</th>
											<th>Allow Posting From</th>
											<th>Allow Posting To</th>
											<th>Block</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
								<!-- end Users table -->
							</div>
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
                    <h5 class="modal-title">Add New User</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				</form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">User ID</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
													<option selected value="">Choose User ID</option>
													<option value="">1</option>
													<option value="">2</option>
													<option value="">3</option>
												</select>
						</div>
					</div>
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
							<label for="input">Allow Posting From</label>
						</div>
						<div class="col-sm-6">
							<input class="date-picker form-control" placeholder="mm/dd/yyyy" type="text" onfocus="this.type='date'" onmouseover="this.type='date'" onclick="this.type = 'date'" onblur="this.type='date''" onmouseout="this.type='date'">
												<script>
                                                    function timeFunctionLong(input) {
                                                        setTimeout(function () {
                                                            input.type = 'text';
                                                        }, 60000);
                                                    }
												</script>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Allow Posting To</label>
						</div>
						<div class="col-sm-6">
							<input class="date-picker form-control" placeholder="mm/dd/yyyy" type="text" onfocus="this.type='date'" onmouseover="this.type='date'" onclick="this.type = 'date'" onblur="this.type='date''" onmouseout="this.type='date'">
												<script>
                                                    function timeFunctionLong(input) {
                                                        setTimeout(function () {
                                                            input.type = 'text';
                                                        }, 60000);
                                                    }
												</script>
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
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Save</button>
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
                    <h5 class="modal-title">Edit User</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">User ID</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
													<option value="">Choose User ID</option>
													<option selected value="">1</option>
													<option value="">2</option>
													<option value="">3</option>
												</select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Name</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" value="John Smith">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Allow Posting From</label>
						</div>
						<div class="col-sm-6">
							<input class="date-picker form-control" placeholder="mm/dd/yyyy" type="text" onfocus="this.type='date'" onmouseover="this.type='date'" onclick="this.type = 'date'" onblur="this.type='date''" onmouseout="this.type='date'">
												<script>
                                                    function timeFunctionLong(input) {
                                                        setTimeout(function () {
                                                            input.type = 'text';
                                                        }, 60000);
                                                    }
												</script>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Allow Posting To</label>
						</div>
						<div class="col-sm-6">
							<input class="date-picker form-control" placeholder="mm/dd/yyyy" type="text" onfocus="this.type='date'" onmouseover="this.type='date'" onclick="this.type = 'date'" onblur="this.type='date''" onmouseout="this.type='date'">
												<script>
                                                    function timeFunctionLong(input) {
                                                        setTimeout(function () {
                                                            input.type = 'text';
                                                        }, 60000);
                                                    }
												</script>
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
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Save</button>
                </div>
				</form>
            </div>
        </div>
    </div>
	
	
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
	<script type="text/javascript">
        // test data
        const dataSet = [1, 2, 3, 4, 5].map(idx => {
            const blockValue = (idx % 2 === 0 ? true : false);
            return ({
                userId: idx,
                name: 'John Smith',
                allow_posting_from_date: '11/18/2019',
                allow_posting_to_date: '11/18/2020',
                block: blockValue,
            })
        })

        $(document).ready(function () {
            let editor = new $.fn.dataTable.Editor({
                table: '#admin_users_table',
                idSrc: 'userId',
                fields: [
                    {
                        label: "User ID:",
                        name: "userId",
                    },
                    {
                        label: "Name:",
                        name: "name",
                    },
                    {
                        label: "Allow Posting From:",
                        name: "allow_posting_from_date",
                        type: 'datetime',
                        def: function () { return new Date(); }
                    },
                    {
                        label: "Allow Posting To:",
                        name: "allow_posting_to_date",
                        type: 'datetime',
                        def: function () { return new Date(); }
                    },
                    {
                        label: "Block:",
                        name: "block",
                        type: "checkbox",
                        separator: "|",
                        options: [
                            { label: "", value: true }
                        ],
                        unselectedValue: false,
                    },
                ]
            })

            $('#admin_users_table').dataTable({
                data: dataSet,
                dom: "Blfrtip",
                select: true,
                scrollX: true,
                lengthMenu: [5, 10, 25, 50, 100],
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
                    {
                        add: "assign_roles", text: 'Assign Roles', editor: editor, action: () => window.open("role_assignment.aspx")
                    },
                    {
                        add: "apply_dimension", text: 'Apply Dimension', editor: editor, action: () => window.open("apply_dimension.aspx")
                    },
                ],
                columns: [
                    { title: 'User ID', data: 'userId' },
                    { title: 'Name', data: 'name' },
                    { title: 'Allow Posting From', data: 'allow_posting_from_date' },
                    { title: 'Allow Posting To', data: 'allow_posting_to_date' },
                    {
                        title: 'Block',
                        data: 'block',
                        render: (data) => (data === true ? 'Yes' : 'No')
                    }
                ]
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