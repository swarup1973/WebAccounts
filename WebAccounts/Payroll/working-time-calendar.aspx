<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="working-time-calendar.aspx.cs" Inherits="WebAccounts.Payroll.working_time_calendar" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Working Time Calendar</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                   Calendar
					>
                    <strong>Working Time Calendar</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                    <p>Calendar Code: <strong>Display</strong><br />
					   Calendar Ddescription: <strong>Display</strong><br />
                       Start Date: <strong>Display</strong><br />
                       End Date: <strong>Display</strong>
                     </p>
                    <!-- start role table -->
                                <table id="item_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>From time</th>
                                            <th>To time</th>
                                            <th>Working Hours</th>
                                            <th>Weekly off</th>
                                            <th>Normal Holiday</th>
                                            <th>Special Holiday</th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                        </tr>
                                        <tr>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                        </tr>
                                        <tr>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                        </tr>
                                      </tbody>
                                </table>
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal HTML Edit -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Working Time Calendar - Edit</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-3">
							Date
						</div>
						<div class="col-sm-3">
							<input type="date"/>
						</div>
						<div class="col-sm-3">
							From time
						</div>
						<div class="col-sm-3">
							<input type="time"/>
						</div>
                    </div>
                    <div class="form-group row">
						<div class="col-sm-3">
							To time
						</div>
						<div class="col-sm-3">
							<input type="time"/>
						</div>
						<div class="col-sm-3">
							Working Hours
						</div>
						<div class="col-sm-3">
							<input type="text"/>
						</div>
                    </div>
                    <div class="form-group row">
						<div class="col-sm-3">
							Weekly off
						</div>
						<div class="col-sm-3">
							<input type="checkbox"/>
						</div>
						<div class="col-sm-3">
							Normal Holiday
						</div>
						<div class="col-sm-3">
							<input type="checkbox"/>
						</div>
                    </div>
                    <div class="form-group row">
						<div class="col-sm-3">
							Special Holiday
						</div>
						<div class="col-sm-3">
							<input type="checkbox"/>
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
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Working Time Calendar - View</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-3">
							Date
						</div>
						<div class="col-sm-3">
							<input type="date"/>
						</div>
						<div class="col-sm-3">
							From time
						</div>
						<div class="col-sm-3">
							<input type="time"/>
						</div>
                    </div>
                    <div class="form-group row">
						<div class="col-sm-3">
							To time
						</div>
						<div class="col-sm-3">
							<input type="time"/>
						</div>
						<div class="col-sm-3">
							Working Hours
						</div>
						<div class="col-sm-3">
							<input type="text"/>
						</div>
                    </div>
                    <div class="form-group row">
						<div class="col-sm-3">
							Weekly off
						</div>
						<div class="col-sm-3">
							<input type="checkbox"/>
						</div>
						<div class="col-sm-3">
							Normal Holiday
						</div>
						<div class="col-sm-3">
							<input type="checkbox"/>
						</div>
                    </div>
                    <div class="form-group row">
						<div class="col-sm-3">
							Special Holiday
						</div>
						<div class="col-sm-3">
							<input type="checkbox"/>
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
                        add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
                    },
					{
                        add: "save", text: 'Save', editor
                    },
					{
                        add: "cancel", text: 'Cancel', editor
                    },
					{
                        add: "view", text: 'View', editor: editor, action: () => showmodalview()
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


