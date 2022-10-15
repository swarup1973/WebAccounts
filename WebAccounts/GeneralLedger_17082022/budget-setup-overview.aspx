<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="budget-setup-overview.aspx.cs" Inherits="WebAccounts.GeneralLedger.budget_setup_overview" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Budget Setup Overview</title>
	 <script type="text/javascript" src="js/budgetsetupoverview.js"></script>
    <link href="administration.css" rel="stylesheet" />
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
                                <table id="addressbook" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;" >
                                    <thead>
                                        <tr>
                                            <th>Setup Model Code</th>
                                            <th>Setup Model Name</th>	
                                            <th>Ledger AC Group for Budget</th>
                                            <th>Period Allocation Basis</th>
                                            <th>Allocation Group Name</th>
                                            <th>Threshold Limit (%)</th>
                                            <th>Threshold Warning</th>
                                            <th>Overbudgeting Policy</th>
                                            <th>Rivision Policy</th>
                                            <th>Stopped</th>
                                            <th>Blocked</th>
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
    <div class="modal fade" id="myModalNEW" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Budget Setup Overview - New</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
                	<div class="form-group row">
						<div class="col-sm-12">
							<label for="input"><strong>General Setup</strong></label>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Setup Model Code</label>
							<span class="requ">(*)</span>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtCode"/>
				   		</div>
                        <div class="col-sm-3">
							<label for="input">Allocation Group Code</label>
							<span class="requ">(*)</span>
						</div>
						<div class="col-sm-3">
						  <select id="ddAllocation" onchange="getAllocateName();">
                             
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Setup Model Name</label>
							<span class="requ">(*)</span>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtName"/>
				   		</div>
                        <div class="col-sm-3">
							<label for="input">Allocation Group Name</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control" id="txtAllocationName" disabled/>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">AC Group for Budget</label>
						</div>
						<div class="col-sm-3">
						  <select id="ddAccGrp">
                                
                            </select>
				   		</div>
                        <div class="col-sm-3">
							<label for="input">Stopped </label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" id="chkStop"/>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Period Allocation Basis</label>
						</div>
						<div class="col-sm-3">
						  <select id="ddGS_PeriodAlloBasis">
                                <option value="Y">Yearly (FY)</option>
                                <option value="M">Monthly</option>
                                <option value="W">Weekly</option>
                                <option value="D">Daily</option>
                            </select>
				   		</div>
                        <div class="col-sm-3">
							<label for="input">Blocked</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" id="chkBlock"/>
				   		</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-12">
							<label for="input"><strong>Reservation Policy</strong></label>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-5">
							<label for="input">Reservation for Confirmed Purchase Requisition</label>
						</div>
						<div class="col-sm-1">
                        	<input type="checkbox" checked="checked" id="chkReservation"/>
				   		</div>
                        <div class="col-sm-5">
							<label for="input">Reservation for Confirmed Expense  Journal</label>
						</div>
						<div class="col-sm-1">
						  	<input type="checkbox" checked="checked" id="chkReservationJournal"/>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-5">
							<label for="input">Reservation for confirmed Purchase Order</label>
						</div>
						<div class="col-sm-1">
                        	<input type="checkbox" checked="checked" id="chkReservationPO"/>
				   		</div>
                        <div class="col-sm-5">
							<label for="input">Reservation for Confirmed Fixed Assets Journal</label>
						</div>
						<div class="col-sm-1">
						  	<input type="checkbox" checked="checked" id="chkReservationFA"/>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-5">
							<label for="input">Reservation for Condirmed Purchase Invoice</label>
						</div>
						<div class="col-sm-1">
                        	<input type="checkbox" checked="checked" id="chkReservationPI"/>
				   		</div>
                        <div class="col-sm-5">
							<label for="input">Reservation for Confirmed Payroll Journal</label>
						</div>
						<div class="col-sm-1">
						  	<input type="checkbox" checked="checked" id="chkReservationPayroll"/>
				   		</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-12">
							<label for="input"><strong>Administration</strong></label>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Threshold Limit (%)</label>
						</div>
						<div class="col-sm-1">
                        	<input type="number" value="100" class="form-control" id="txtThreshold"/>
				   		</div>
                    </div>
                    <div class="form-group row">   
                        <div class="col-sm-3">
							<label for="input">Overbudgeting Policy </label>
						</div>
						<div class="col-sm-9">
							<select id="ddOverbudgeting">
                                <option value="1">1. Allow Transaction over budget</option>
                                <option value="2">2. Stop Transaction over budget</option>
                                <option value="3">3. Stop Transaction over Threshold Limit </option>
                            </select>  
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Threshold Warning</label>
						</div>
						<div class="col-sm-1">
						  <input type="checkbox" checked="checked" id="chkThreshold"/>	
				   		</div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							<label for="input">Rivision Policy </label>
						</div>
						<div class="col-sm-9">
							<select id="ddRivision">
                                <option value="1">1. Rivision not allowed</option>
                                <option value="2">2. Allow Rivision with new Version</option>
                                <option value="3">3. Allow Rivision with changing the Original Version</option>
                            </select>
				   		</div>
					</div>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="savedata();" id="btnSave">Add</button>
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
						add: "create", text: '<i class="fa fa-plus"></i> New', editor: editor, action: () => showmodal()
					},
				   {
                        add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
                    },
					{
                        extend: "remove", editor: editor
                    },
					{
                        add: "view", text: 'View', editor: editor, action: () => showmodalview()
                    },
					{
                        add: "stop", text: 'Stop', editor: editor
                    },
					{
                        add: "block", text: 'Block', editor: editor
                    }
                ],
         
            })
        })
		
		var showmodal = function () {
            $("#myModalNEW").modal('show');
        };
		var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
		var showmodalview = function () {
            $("#myModalVIEW").modal('show');
        };

    </script>
</asp:Content>
