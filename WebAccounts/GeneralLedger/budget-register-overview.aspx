<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="budget-register-overview.aspx.cs" Inherits="WebAccounts.GeneralLedger.budget_register_overview" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
	 <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Budget Register Overview</title>
	 <script type="text/javascript" src="js/budgetregisteroverview.js"></script>
<%--    <link href="administration.css" rel="stylesheet" />--%>
	 <style>
    .dataTables_length{
        margin-top : 65px;
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
                                            <th>Budget Code</th>
                                            <th>Budget Description</th>	
                                            <th>Budget Model Name</th>
                                            <th>Ledger AC Group for Budget</th>
                                            <th>Period Allocation Basis</th>
                                            <th>Allocation Group Name</th>
                                            <th>Threshold Limit (%)	</th>
                                            <th>Threshold warning	</th>
                                            <th>Overbudgeting Policy</th>
                                            <th>Rivision Policy</th>
                                            <th>Starting Date</th>
                                            <th>Ending Date</th>
                                            <th>Date of Creation</th>
                                            <th>Closed</th>
                                            <th>Blocked</th>
                                            <th>Revised</th>
                                            <th>Last Revised on</th>
                                            <th>Approved	</th>
                                            <th>Approved by</th>
                                        </tr>
                                    </thead>
                                    
                                </table>
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>


<!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Budget Register Overview - New</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Budget Code</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtBudgetCode" disabled/>
							 <label for="input" id="txtItemCdHelp"></label>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Starting date</label>
							 <span class="requ">(*)</span>
						</div>
						<div class="col-sm-3">
						  <input type="date" class="form-control" id="txtStartDT"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Budget Description</label>
							 <span class="requ">(*)</span>
						</div>
						<div class="col-sm-3">
						  <textarea class="form-control" id="txtBudgetDesc"></textarea>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Ending Date</label>
							 <span class="requ">(*)</span>
						</div>
						<div class="col-sm-3">
						  <input type="date" class="form-control" id="txtEndDT"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Budget Setup Model Name</label>
							 <span class="requ">(*)</span>
						</div>
						<div class="col-sm-3">
						  <select class="form-control" id="ddBudgetModel" onchange="getOtherDetails();">
						   
					      </select>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Closed</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" id="chkClose"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Ledger AC Group for Budget</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtLedgerGroup" disabled/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Blocked</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" id="chkBlock"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Period Allocation Basis</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtPeriod" disabled/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Date of Creation</label>
						</div>
						<div class="col-sm-3">
						  <input type="date" class="form-control" id="txtCreationDt" disabled/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Allocation Group Name</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtAllocation" disabled/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Revised</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" disabled="disabled" id="chkRevised" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Threshold Limit (%)</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtThreshold" disabled/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Last Revised on</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" disabled="disabled" id="txtLastRevised"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Threshold warning</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtwarning" disabled/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Approved</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" id="chkApprove" disabled/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Overbudgeting Policy</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtPolicy" disabled/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Approved by</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtApproveBy" disabled/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Revision Policy</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtRevisionPolicy" disabled/>
				   		</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
                    
                </div>
                <div class="modal-footer">
                     <button type="button" class="btn btn-primary" onclick="savedata();" id="btnSave">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>
        </div>
    </div>



<!-- Modal HTML Copy Budget -->
    <div class="modal fade" id="myModalCOPY" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Copy Budget</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
                <p><strong>A new Budget with Entries will be copied to create a new budget. You will be allowed to Edit all necessary details including budget values in Budget Etntry and Budget Allocation Page.</strong></p>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Budget Code</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtCopyBudgetCode"/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Copy with Dimension Budget </label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" id="chkCopyDimension"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Budget Description</label>
						</div>
						<div class="col-sm-3">
						  	<textarea class="form-control" id="txtCopyBudgetDesc"></textarea>
	   		      </div>
						<div class="col-sm-3">
							<label for="input">Copy with Period Allocation Basis</label>
						</div>
						<div class="col-sm-3">
						  	<input type="checkbox" id="chkCopyPeriod"/>
					  </div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Starting Date</label>
						</div>
						<div class="col-sm-3">
					  	  <input type="date" class="form-control" id="txtCopyStartDate"/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Ending Date</label>
						</div>
						<div class="col-sm-3">
					  	  <input type="date" class="form-control" id="txtCopyEndDate"/>
						</div>
					</div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btnSaveCopy" onclick="savedataCopy();">OK</button>
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
 
		$(document).ready(function () {
            $('#txtCreationDt').val(new Date().toJSON().slice(0, 10));
         
        })

        

        
		var showmodal = function () {
            $("#myModal").modal('show');
        };
		
		
		var showmodalcopy = function () {
            $("#myModalCOPY").modal('show');
        };
		
		var showmodalnotes = function () {
            $("#myModalNOTES").modal('show');
        };

    </script>
</asp:Content>


