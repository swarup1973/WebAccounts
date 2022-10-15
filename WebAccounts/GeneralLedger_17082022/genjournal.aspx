<%@ Page Title="General Journal" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="" Inherits="WebAccounts.users" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">

		<div class="row">
			<div class="col">
				<p>
					<a href="roles.aspx">Back to old roles page [temporary link]</a>
				</p>
			</div>
		</div>

        <div class="page-title">
            <div class="title_left">
                <h3>General Journal</h3>
            </div>
        </div>

		<div class="row">
        <div class="col">
            <nav class="card navbar navbar-expand-lg navbar-light bg-light">
                <div class="col nav navbar-nav">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item"><a href="#" class="nav-link">Batch Post <i class="fa fa-external-link-square"></i></a>
                        </li>
						<li class="nav-item"><a href="genjournal_line.aspx" class="nav-link">Journal Line Details <i class="fa fa-external-link-square"></i></a>
                        </li>
						<li>
						  <select class="form-control" name="">
							<option value="">-Workflow Approval-</option>
							<option value=""><a href="#">Send for Approval</a></option>
							  <option value=""><a href="view_status_and_comments.aspx">View Status & Comment</a></option>
							  <option value=""><a href="genjournal_line.aspx">Reopen to Edit</a></option>
							  <option value=""><a href="approvers_actions.aspx">Approver's Actions</a></option>
						  </select>
						</li>
               	  </ul>
           	  </div>
       	  </nav>
       	  </div>
  </div>
	
  <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
                <div class="card">
                <div class="card-body">
                <!-- start Accounts list -->
                    <table id="general_journal_table"
                      class="table table-striped table-hover table-condensed datatable width-100"
                      style="width: 100%;"
                    >
                      <thead style="width: 100%;">
                        <tr class="">
							<th class="">Batch<span class="required-asterisk">*</span></th>
							<th class="">Name</th>
							<th class="">Date</th>
							<th class="">User Created</th>
							<th class="">Approval Status</th>
							<th class="">Date Approved</th>
							<th class="">Posted</th>
					    </tr>
                      </thead>
                      <tbody style="width: 100%;">
                          <tr>
                            <td class="">
											<select class="form-control" name="" required>
												<option value="">--</option>
											</select>
							</td>
                    <td class="">
                      <input
											 type="text"
											 name=""
											 class="form-control"
											 readonly
											>
                    </td>
                    <td class="">
											<input
											 type="text"
											 name=""
											 class="form-control"
											 readonly
											>
							</td>
                    <td class="">
											<input
											 type="text"
											 name=""
											 class="form-control"
											 readonly
											>
							</td>
                    <td class="">
											<select class="form-control" name="" readonly>
                        <option>Approved</option>
                        <option>Rejected</option>
                        <option>Edit Request</option>
                        <option>Waiting</option>
                        <option>Sent for Approval</option>
                        <option>On Hold</option>
											</select>
							</td>
                    <td class="">
											<input
											 type="text"
											 name=""
											 class="form-control"
											 readonly
											>
                    </td>
                    <td>
                      <i class="fa fa-check"></i>
                    </td>
                          </tr>
                      </tbody>
                    </table>
                <!-- end Accounts list -->
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
        const dummyData = [
            
        ]

        let editor; // use a global for the submit and return data rendering in the examples
 
        $(document).ready(function() {
            editor = new $.fn.dataTable.Editor( {
                table: "#general_journal_table",

                } );

            
        
            // Activate an inline edit on click of a table cell
            // $('#no_sequence_master_table').on( 'click', 'tbody td:not(:first-child)', function (e) {
            //     editor.inline( this );
            // } );
        
            $('#general_journal_table').DataTable( {
                dom: "Bfrtip",
                scrollX: true,
                order: [[ 1, 'asc' ]],
                data: dummyData,
                columns: [
                    { "data": "code" },
                    { "data": "description" },
                    { "data": "start_date" },
                    { "data": "starting_no" },
                    { "data": "ending_no" },
                    { "data": "no_interval" },
                    { "data": "prefix" },
                    { "data": "suffix" },
                    { "data": "display_no_sequence" },
                    { data: "manual",
                      render: function (data,type,row) {
                          if (data == true) {
                            return '<input type="checkbox" checked>';
                          } else {
                            return '<input type="checkbox">';
                          }
                        return data;
                      }  
                    },
                    { data: "close",
                      render: function (data,type,row) {
                          if (data == true) {
                            return '<input type="checkbox" checked>';
                          } else {
                            return '<input type="checkbox">';
                          }
                        return data;
                        }  
                    },
                    { data: "block",
                      render: function (data,type,row) {
                        if (data == true) {
                            return '<input type="checkbox" checked>';
                          } else {
                            return '<input type="checkbox">';
                          }
                        return data;
                      }
                    },
                    { "data": "relation_exists", 
                      render: function (data,type,row) {
                        if (data == true) {
                            return '<input type="checkbox" checked>';
                          } else {
                            return '<input type="checkbox">';
                          }
                        return data;
                      }
                    },
                    { "data": "end_date" },
                    { "data": "last_no_used" }
                ],
                select: true,
                buttons: [
                    { extend: "create", editor: editor },
                    { extend: "edit",   editor: editor },
					
                    { extend: "remove", editor: editor }
                ]
            } );
        } );
    </script>
</asp:Content>