<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="budget-rivision-history.aspx.cs" Inherits="WebAccounts.GeneralLedger.budget_rivision_history" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Budget Rivision History</title>
    <script type="text/javascript" src="js/budgetrevisehistory.js?v=1.1"></script>
     <style>
    .dataTables_length{
        margin-top : 20px;
        position : absolute;
    }
    .requ {
        color : #F00;
    }
      table.dataTable.display tbody tr:hover.selected > .sorting_1, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_1 {
        background-color: #a2aec7
    }

    table.dataTable.display tbody tr:hover.selected > .sorting_2, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_2 {
        background-color: #a3b0c9
    }

    table.dataTable.display tbody tr:hover.selected > .sorting_3, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_3 {
        background-color: #a5b2cb
    }
      table.dataTable tbody tr.selected {
            background-color: #b0bed9
        }
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
    
       <form runat="server">
            <asp:TextBox ID="txt" runat="server" ClientIDMode="Static" Style="display: none;"></asp:TextBox>
        </form>
        
        <div class="clearfix"></div>
        
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body table-responsive">
                                <!-- start role table -->
                                <table id="addressbook" class="table table-bordered table-hover projects display dataTable width-100">
                                    <thead>
                                        <tr>
                                            <th>Revised Budget Entry No</th>
                                            <th>Revision Entry Date</th>	
                                            <th>AC Code</th>
                                            <th>Description</th>
                                            <th>Type</th>
                                            <th>Group</th>
                                            <th>Last Budget Amount</th>
                                            <th>Revised Amount</th>
                                            <th>Period Allocation</th>
                                            <th>Dimension Allocation</th>
                                            <th>Revision Ref. No</th>
                                        </tr>
                                    </thead>
                                    
                                </table>
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>


<!-- Modal HTML Run Allocation Batch -->
    <div class="modal fade" id="myModalBATCH" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Run Allocation Batch</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
                <p><strong>Note: Allocation will be done equally across the selected period. User can change the value manually wherever needed.</strong></p>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Budget Code</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" disabled="disabled"/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Period Allocation Basis</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" disabled="disabled"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Budget Description</label>
						</div>
						<div class="col-sm-3">
						  	<input type="text" class="form-control" disabled="disabled"/>
	   		      </div>
						<div class="col-sm-3">
							<label for="input">Starting date</label>
						</div>
						<div class="col-sm-3">
						  	<input type="text" class="form-control" disabled="disabled"/>
					  </div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">AC Name</label>
						</div>
						<div class="col-sm-3">
					  	  <input type="text" class="form-control" disabled="disabled"/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Ending Date</label>
						</div>
						<div class="col-sm-3">
					  	  <input type="text" class="form-control" disabled="disabled"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Budget Amount</label>
						</div>
						<div class="col-sm-3">
						  	<input type="text" class="form-control" disabled="disabled"/>
				   		</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
                    <div class="form-group row">
		  <div class="col-sm-1">
							<label for="input">A</label>
						</div>
		  <div class="col-sm-4">
                        	<label for="input">Allocate Across Whole Budget Period</label>
				   		</div>
						<div class="col-sm-3">
                       	  <input type="checkbox"/>
						</div>
					</div>
                    <div class="form-group row">
		  <div class="col-sm-1">
							<label for="input">OR</label>
						</div>
					</div>
                    <div class="form-group row">
		  <div class="col-sm-1">
							<label for="input">B</label>
						</div>
						<div class="col-sm-3">
                        	<label for="input">Allocation Starting from date</label>
				   		</div>
						<div class="col-sm-3">
                        	<input type="date" class="form-control"/>
						</div>
					</div>
                    <div class="form-group row">
					  <div class="col-sm-1">
						</div>
						<div class="col-sm-3">
                        	<label for="input">Allocation  Ending date</label>
				   		</div>
						<div class="col-sm-3">
                        	<input type="date" class="form-control"/>
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
                table: "#item_table",} );
            	$('#item_table').DataTable( {
                dom: "Bfrtip",
				//"bPaginate": false,
				//"bLengthChange": false,
                //select: false,
				//"bFilter": false,
        		//"bInfo": false,
				//"ordering": false,
                buttons: [

					{
                        add: "ballow", text: 'View Allocation', editor: editor, action: () => window.open("budget-allocation.aspx")
                    }
                ],
         
            })
        })
		

		var showmodalbatch = function () {
            $("#myModalBATCH").modal('show');
        };


    </script>
</asp:Content>
