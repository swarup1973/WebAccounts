<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="calendar-setup-overview.aspx.cs" Inherits="WebAccounts.Payroll.calendar_setup_overview" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Calendar Setup Overview</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                   Calendar
					>
                    <strong>Calendar Setup Overview</strong>
                </p>
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
                                            <th>Calendar Code</th>
                                            <th>Description</th>
                                            <th>Working Time Setup</th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>
                                        </tr>
                                        <tr>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>
                                        </tr>
                                        <tr>
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
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Calendar Setup Overview - New</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							Calendar Code
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                    </div>
                    <div class="form-group row">
						<div class="col-sm-6">
							Description
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-6">
							Working Time Setup
						</div>
						<div class="col-sm-6">
							<select>
                            	<option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
					</div>
				</div>	
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Add</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
			  </form>
            </div>
        </div>
    </div>

    <!-- Modal HTML Edit -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Calendar Setup Overview - Edit</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							Calendar Code
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                    </div>
                    <div class="form-group row">
						<div class="col-sm-6">
							Description
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-6">
							Working Time Setup
						</div>
						<div class="col-sm-6">
							<select>
                            	<option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
					</div>
				</div>	
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
			  </form>
            </div>
        </div>
    </div>

    <!-- Modal HTML View -->
    <div class="modal fade" id="myModalVIEW" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Calendar Setup Overview - View</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							Calendar Code
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                    </div>
                    <div class="form-group row">
						<div class="col-sm-6">
							Description
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-6">
							Working Time Setup
						</div>
						<div class="col-sm-6">
							<select>
                            	<option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
					</div>
				</div>	
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
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

                select: true,
                buttons: [
					{
						add: "create", text: 'New', editor: editor, action: () => showmodal()
					},
                    {
                        add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
                    },
					{
                        add: "view", text: 'View', editor: editor, action: () => showmodalview()
                    },
					{
                        extend: "remove", editor: editor
                    },
					{
                        add: "calendar", text: 'Create Calendar', editor: editor, action: () => window.open("create-calendar-overview.aspx")
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
		var showmodalview = function () {
            $("#myModalVIEW").modal('show');
        };


    </script>
</asp:Content>


