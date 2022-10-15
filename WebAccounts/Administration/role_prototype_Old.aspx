<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="WebAccounts.roles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/roles.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

        <div class="row">
            <div class="col">
                <p>
                    <a href="roles.aspx">Back to old roles page [temporary link]</a>

                     <button type="button" onclick="showmodal();">Show Modal</button>

                </p>
            </div>
        </div>

        <div class="page-title">
            <div class="title_left">
                <h3>Roles</h3>
            </div>
        </div>

        <div class="clearfix"></div>
		

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <div class="card">
                            <div class="card-body">
                                <!-- start role table -->
                                <table id="roles_table" class="table table-striped table-hover table-condensed projects display datatable width-100"
                                    style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th>Role ID</th>
                                            <th>Description</th>
                                            <th>Role Center ID</th>
                                            <th>Allow Posting From</th>
                                            <th>Allow Posting To</th>
                                            <th>Block</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                                <!-- end role table -->
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
                    <h5 class="modal-title">Add New Role</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Role ID</label>
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
							<label for="input">Role Center ID</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
								<option>Choose Role Center ID</option>
								<option>12345</option>
								<option>56789</option>
								<option>02468</option>
								<option>13579</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Allow Posting From</label>
						</div>
						<div class="col-sm-6">
							<input class="date-picker form-control" placeholder="dd-mm-yyyy" type="text" required="required" type="text" onfocus="this.type='date'" onmouseover="this.type='date'" onclick="this.type='date'" onblur="this.type='text'" onmouseout="timeFunctionLong(this)">
												<script>
													function timeFunctionLong(input) {
														setTimeout(function() {
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
							<input class="date-picker form-control" placeholder="dd-mm-yyyy" type="text" required="required" type="text" onfocus="this.type='date'" onmouseover="this.type='date'" onclick="this.type='date'" onblur="this.type='text'" onmouseout="timeFunctionLong(this)">
												<script>
													function timeFunctionLong(input) {
														setTimeout(function() {
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
                    <h5 class="modal-title">Edit Role</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Role ID</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" value="1">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Description</label>
						</div>
						<div class="col-sm-6">
							<textarea>Role description here...</textarea>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Role Center ID</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
								<option>Choose Role Center ID</option>
								<option selected>12345</option>
								<option>56789</option>
								<option>02468</option>
								<option>13579</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Allow Posting From</label>
						</div>
						<div class="col-sm-6">
							<input class="date-picker form-control" placeholder="11/18/2019" type="text" required="required" type="text" onfocus="this.type='date'" onmouseover="this.type='date'" onclick="this.type='date'" onblur="this.type='text'" onmouseout="timeFunctionLong(this)">
												<script>
													function timeFunctionLong(input) {
														setTimeout(function() {
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
							<input class="date-picker form-control" placeholder="11/18/2019" type="text" required="required" type="text" onfocus="this.type='date'" onmouseover="this.type='date'" onclick="this.type='date'" onblur="this.type='text'" onmouseout="timeFunctionLong(this)">
												<script>
													function timeFunctionLong(input) {
														setTimeout(function() {
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
                roleId: idx,
                description: 'Role description here...',
                role_center_id: 12345,
                allow_posting_from_date: '11/18/2019',
                allow_posting_to_date: '11/18/2020',
                block: blockValue,
            })
        })

        $(document).ready(function () {
            let editor = new $.fn.dataTable.Editor({
                table: '#roles_table',
                idSrc: 'roleId',
                fields: [
                    {
                        label: "Role ID:",
                        name: "roleId",
                        attr: {
                            maxlength: "60"
                        }
                    },
                    {
                        label: "Description:",
                        name: "description",
                        attr: {
                            maxlength: "200"
                        }
                    },
                    {
                        label: "Role Center ID:",
                        name: "role_center_id",
                        type: "select"
                    },
                    {
                        label: "Allow Posting From:",
                        name: "allow_posting_from_date",
                        type: "date"
                    },
                    {
                        label: "Allow Posting To:",
                        name: "allow_posting_to_date",
                        type: "date"
                    },
                    {
                        label: "Block",
                        name: "blockValue",
                        type: "checkbox",
                        options: [
                            { label: " True", value: true }
                        ],
                        unselectedValue: false
                    }
                ]
            })

            $('#roles_table').dataTable({
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
                        add: "assign_users", text: 'Assign Users', editor: editor, action: () => window.open("role_assignment.aspx")
                    },
                ],
                columns: [
                    { title: 'Role ID', data: 'roleId' },
                    { title: 'Description', data: 'description' },
                    { title: 'Role Center ID', data: 'role_center_id' },
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

