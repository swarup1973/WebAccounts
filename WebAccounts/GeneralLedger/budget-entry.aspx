<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="budget-entry.aspx.cs" Inherits="WebAccounts.GeneralLedger.budget_entry" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Budget Entry</title>
	<script type="text/javascript" src="js/budgetentry.js?v=1.1"></script>
    <%--<link href="administration.css" rel="stylesheet" />--%>
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
                    <div class="card-body">
                        <div class="col-md-8">
                            <p><strong>Budget Code:</strong> <span id="spnBudgetcode"></span><br />
                            <strong>Budget Description:</strong> <span id="spnBudgetDesc"></span><br />
                            <strong>Starting date:</strong> <span id="spnBudgetStDt"></span><br />
                            <strong>Ending Date:</strong> <span id="spnBudgetEndDt"></span></p>	
                        </div>
                        <%--<div class="col-md-4">
                            <div class="input-group">
                                <input type="text" placeholder="Filter Ledger...">&nbsp; &nbsp;<button class="btn btn-primary" type="button">Search</button>
                            </div>
                        </div>--%>
                	</div>
                </div>
         	</div>
        </div> 

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body table-responsive">
                                <!-- start role table -->
                                <table id="addressbook" class="table table-bordered table-hover projects display dataTable width-100">
                                    <thead>
                                        <tr>
                                            <th>Entry No</th>
                                            <th>Entry Date</th>	
                                            <th>AC Code</th>
                                            <th>Description</th>
                                            <th>Type</th>
                                            <th>Group</th>
                                            <th>Carry forwarded from last period</th>
                                            <th>Current Year Budget</th>
                                            <th>Total Budget Amount</th>
                                            <th>Budget Amount Utilised</th>
                                            <th>Budget Balance</th>
                                            <th>Carry Forwarded to next period</th>
                                            <th>Block</th>
                                            <th>Stop</th>
                                            <th>Period Allocation</th>
                                            <th>Dimension Allocation</th>
                                            <th>Revised</th>
                                            <th>Last Rivisrd on</th>
                                            <th>Revision Ref. No</th>
                                            <th>Balance Carry Forwarded</th>
                                        </tr>
                                    </thead>
                                    
                                </table>
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>



<!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Budget Entry - Edit</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Entry No</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" disabled="disabled" id="txtEntryNo"/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Entry Date</label>
						</div>
						<div class="col-sm-3">
						  <input type="date" class="form-control" disabled="disabled" id="txtEntryDt"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">AC Code	</label>
						</div>
						<div class="col-sm-3">
						  	<input type="text" class="form-control" id="txtAcCode" disabled/> 
				   		</div>
						<div class="col-sm-3">
							<label for="input">Description</label>
						</div>
						<div class="col-sm-3">
						  	<textarea class="form-control" id="txtDesc" disabled></textarea>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Type</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtType" disabled/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Group</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtGroup" disabled/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Carry forwarded from last period</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" disabled="disabled" id="txtCaryyForwardLastPeriod"/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Current Year Budget</label>
							 <span class="requ">(*)</span>
						</div>
						<div class="col-sm-3">
						  <input type="number" class="form-control" value="0" id="txtCYBudget"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Total Budget Amount</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" disabled="disabled" id="txtTotalBudget"/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Budget Amount Utilised</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" disabled="disabled" id="txtBudgetUtilised"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Budget Balance</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" disabled="disabled" id="txtBudgetBalance"/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Carry Forwarded to next period</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" disabled="disabled" id="txtCarryForwardNextPeriod" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Block</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" id="chkBlock"/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Stop</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" id="chkStop"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Period Allocation</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" disabled="disabled" id="chkPeriodAllo"/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Dimension Allocation</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" disabled="disabled" id="chkDimensionAllo"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Revised</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" id="chkRevised" disabled/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Last Revised on</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtLastRevised" disabled/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Revision Ref. No</label>
						</div>
						<div class="col-sm-3">
						  	<input type="text" class="form-control" id="txtRevisionRefNo" disabled/>
				   		</div>
						<div class="col-sm-3">
                        	<label for="input">Balance Carry Forwarded</label>
						</div>
						<div class="col-sm-3">
                        	<input type="checkbox" disabled="disabled" id="chkBalanceCF"/>
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
                    <button type="button" class="btn btn-primary">Allocate</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>
        </div>
    </div>

<!-- Modal HTML Budget Rivision Batch -->
    <div class="modal fade" id="myModalREVISE" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Budget Revision Batch</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<strong>Budget Code:</strong><span id="revbudgetcode"></span><br />
							<strong>Budget Description:</strong><span id="revbudgetdesc"></span>	<br />		
							<strong>AC Name:</strong><span id="revaccode"></span> <br />			
							<strong>Budget Amount</strong>:<span id="revbudamt"></span>		
				   		</div>
						<div class="col-sm-6">
							<strong>Period Allocation Basis:</strong><span id="revallobasis"></span> <br />
							<strong>Starting date:</strong><span id="revstartdt"></span> <br />			
							<strong>Ending Date:</strong> <span id="revenddt"></span>		
						</div>
					</div>

                    <div class="form-group row">
						<div class="col-sm-3">
                        	<label for="input">Revised Amount</label>
				   		</div>
						<div class="col-sm-3">
                        	<input type="number" class="form-control" id="txtreviseAmt" value="0"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
                        	<label for="input">Allocation </label>
				   		</div>
						<div class="col-sm-3">
                        	<select id="ddRevType" onchange="reftype();">
                            <option value="1">1. Alllocate Across Budget period</option>
                            <option value="2">2. Allocate for the Remaining Period</option>
                            </select>
						</div>
					</div>    
					 <div class="form-group row">
						<div class="col-sm-3">
                        	<label for="input">Period </label>
				   		</div>
						<div class="col-sm-3">
                        	<select id="ddPeriod" disabled>
                            </select>
						</div>
					</div>    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btnReviseSave" onclick="revisesave();">Revise</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>

        </div>
    </div>
    
    <!-- Modal HTML Budget Rivision Batch -->
    <div class="modal fade" id="myModalCARRY" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Budget Carry Forward</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
                <p><strong>Budget Carry forward is run when unutilised  budget value of a Ledger is transferred from One Budget to  another budget, Carry forward value will be updated 'Carried Forwarded from Last Budget' field of the Budget, the value is transferred to.</strong></p>
                	<div class="form-group row">
						<div class="col-sm-6">
							<label for="input"><strong>Transfer from details:</strong></label>
						</div>
						<div class="col-sm-6">
						  	<label for="input"><strong>Transfer to details:</strong></label>
				   		</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Budget Code</label>
						</div>
						<div class="col-sm-3">
						  	<input type="text" class="form-control" disabled="disabled"/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Budget Code</label>
						</div>
						<div class="col-sm-3">
						  	<select>
                            	<option>--</option>
                                <option>--</option>
                            </select>
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
							<label for="input">Budget Description</label>
						</div>
						<div class="col-sm-3">
						  	<input type="text" class="form-control" disabled="disabled"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">AC Code</label>
						</div>
						<div class="col-sm-3">
						  	<input type="text" class="form-control" disabled="disabled"/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">AC Code</label>
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
							<label for="input">AC Name</label>
						</div>
						<div class="col-sm-3">
						  	<input type="text" class="form-control" disabled="disabled"/>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
                        	<label for="input">Budget Balance</label>
				   		</div>
						<div class="col-sm-3">
                        	<input type="text" class="form-control" disabled="disabled" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
                        	<label for="input">Amount to be Carried Forwarded </label>
				   		</div>
						<div class="col-sm-3">
                        	<input type="text" class="form-control"/>
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
 
     
		
        var showmodal = function () {
            $("#myModalEDIT").modal('show');
        };
		var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
		var showmodalbatch = function () {
            $("#myModalBATCH").modal('show');
        };
		var showmodalrevise = function () {
            $("#myModalREVISE").modal('show');
        };
		var showmodalcarry = function () {
            $("#myModalCARRY").modal('show');
        };


    </script>
</asp:Content>
