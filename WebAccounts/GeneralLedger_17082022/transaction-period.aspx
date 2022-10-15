<%@ Page Title="Fiscal Year" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="" Inherits="WebAccounts.users" %>



<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">

        <div class="row">
            <div class="col">
                <p>
                   General Ledger
					>
					Setup
					>
                    <strong>Transaction Period</strong>
                </p>
            </div>
        </div>	

  <div class="row">
      <div class="col">
            <div class="card">
			  <div class="card-body">
					<!-- start Users table -->
                    <table id="transaction_period_table"
                      class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                      <thead>
                        <tr>
							<th>Starting Date</th>
							<th>Period Name</th>
							<th>New Fiscal Year</th>
							<th>Closed</th>
                            <th>Period Locked</th>
					    </tr>
					   </thead>
					   <tbody>
						  <tr>
							<td>01/04/2021</td>
							<td>For the Week 28/03/2021-03/04/2021</td>
							<td><input type="checkbox" readonly="readonly" checked="checked" /></td>
							<td><input type="checkbox" readonly="readonly" /></td>
							<td><input type="checkbox" readonly="readonly" checked="checked" /></td>
						</tr>
                        <tr>
							<td>01/04/2021</td>
							<td>For the Week 28/03/2021-03/04/2021</td>
							<td><input type="checkbox" readonly="readonly" checked="checked" /></td>
							<td><input type="checkbox" readonly="readonly" /></td>
							<td><input type="checkbox" readonly="readonly" checked="checked" /></td>
						</tr>
                        <tr>
							<td>01/04/2021</td>
							<td>For the Week 28/03/2021-03/04/2021</td>
							<td><input type="checkbox" readonly="readonly" checked="checked" /></td>
							<td><input type="checkbox" readonly="readonly" /></td>
							<td><input type="checkbox" readonly="readonly" checked="checked" /></td>
						</tr>
                        <tr>
							<td>01/04/2021</td>
							<td>For the Week 28/03/2021-03/04/2021</td>
							<td><input type="checkbox" readonly="readonly" checked="checked" /></td>
							<td><input type="checkbox" readonly="readonly" /></td>
							<td><input type="checkbox" readonly="readonly" checked="checked" /></td>
						</tr>
                        <tr>
							<td>01/04/2021</td>
							<td>For the Week 28/03/2021-03/04/2021</td>
							<td><input type="checkbox" readonly="readonly" checked="checked" /></td>
							<td><input type="checkbox" readonly="readonly" /></td>
							<td><input type="checkbox" readonly="readonly" checked="checked" /></td>
						</tr>
                      </tbody>
                    </table>
                <!-- end Accounts list -->
					
                </div>
        </div>
      </div>
    </div>

<!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalDELETE" tabindex="-1">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title">Delete Transaction Period</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
                	<div class="form-group row">
						<div class="col-sm-12">
							<input type="checkbox"  /> Datewise 
						</div>
					</div>
                    
					<div class="form-group row">
						<div class="col-sm-12">
							From Date: <input type="date"> To Date: <input type="date"> <button type="button" class="btn btn-primary">Search</button>
						</div>
					</div>
                </div>
                
				<table id="cheque_register_table"  class="table table-striped table-hover table-condensed projects display datatable width-100">
                <thead>
                	<tr>
                       <th>Select</th>
                       <th>Start Date</th>
                       <th>Period Name</th>
                     </tr>
                </thead>
                <tbody>
                    <tr>
                       <td><input type="checkbox" name="select" /></td>
                       <td>01/04/2021</td>
                       <td>For the Week 28/03/2021-03/04/2021</td>
					</tr>
                    <tr>
                       <td><input type="checkbox" name="select" /></td>
                       <td>04/04/2021</td>
                       <td>For the Week 04/04/2021-10/04/2021</td>
					</tr>
                    <tr>
                       <td><input type="checkbox" name="select" /></td>
                       <td>18/04/2021</td>
                       <td>For the Week 18/04/2021-24/04/2021</td>
					</tr>
                    <tr>
                       <td><input type="checkbox" name="select" /></td>
                       <td>25/04/2021</td>
                       <td>For the Week 25/04/2021-01/05/2021</td>
					</tr>
                    <tr>
                       <td><input type="checkbox" name="select" /></td>
                       <td>02/05/2021</td>
                       <td>For the Week 02/05/2021-08/05/2021</td>
					</tr>
                 </tbody>
                 </table>                
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger">Delete</button>
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
                table: "#transaction_period_table",} );
            $('#transaction_period_table').DataTable( {
                dom: "Bfrtip",

                select: true,
                buttons: [
					{
						add: "create", text: 'Create Fiscal Year', editor: editor
					},
                    {
                        add: "lock", text: 'Period Lock/Unlock', editor: editor
                    },
					{
                        add: "delete", text: 'Delete', editor: editor, action: () => showmodaldelete()
                    }
                ],
            } );
        } );
		
		var showmodaldelete = function () {
            $("#myModalDELETE").modal('show');
        };
		

    </script>
</asp:Content>