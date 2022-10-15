<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="budget_allocation_edit.aspx.cs" Inherits="WebAccounts.GeneralLedger.budget_allocation_edit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Budget Allocation</title>
     <script type="text/javascript" src="js/budgetAllocationedit.js"></script>
    <style>
        @media (min-width: 992px) {
            .modal-lg, .modal-xl {
                max-width: 1200px;
            }
        }
        .sdiv1{
            margin-left: 0px;
            margin-right: 0px;
        }
        .row label{
            padding-left : 15px;
        }
        .sdiv1 .row{
            margin-left: 0px !important;
            margin-right: 0px !important;
            padding-left : 0px !important;
            padding-right : 0px !important;
        }
        .sdiv{
            margin-left: 0px;
        }
        .form-group.row.sdiv div{
                padding : 5px;
                border : 1px solid #000;
                
                width: 100px;
                margin-left: 0px;
        } 
        .form-group.row.sdiv input{
                
                width: 80px;
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
                        <div class="col-md-4">
                            <p><strong>Budget Code:</strong><span id="spnBudgetcode"></span><br />
                            <strong>Budget Description:</strong> <span id="spnBudgetDesc"></span><br />
                            <strong>AC Name:</strong> <span id="spnBudgetCode"></span><br />
                            <strong>Total Budget Amount:</strong><span id="spnBudgetAmt"></span></p>	
                        </div>
                        <div class="col-md-4">
                            <p><strong>Period Allocation Basis:</strong> <span id="spnBudgetAllo"></span><br />
                            <strong>Starting date:</strong> <span id="spnBudgetStDt"></span><br />
                            <strong>Ending Date:</strong> <span id="spnBudgetEndDt"></span></p>
                        </div>
                	</div>
                </div>
         	</div>
        </div> 

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body table-responsive">
                                <!-- start role table -->
                                <table id="item_table" class="table table-bordered table-hover projects display dataTable width-100">
                                    <thead>
                                        <tr>
                                            <th>dtlid</th>
                                            <th>Date/Period</th>
                                            <th>Total Budget Amount</th>	
                                            <th><span id="splbldim1">Dimension 1</span></th>	
                                             <th>Amount</th>
                                            <th><span id="splbldim2">Dimension 2</span></th>
                                             <th>Amount</th>
                                            <th><span id="splbldim3">Dimension 3</span></th>
                                             <th>Amount</th>
                                            <th><span id="splbldim4">Dimension 4</span></th>
                                             <th>Amount</th>
                                            <th><span id="splbldim5">Dimension 5</span></th>
                                             <th>Amount</th>
                                            <th><span id="splbldim6">Dimension 6</span></th>
                                             <th>Amount</th>
                                            <th><span id="splbldim7">Dimension 7</span></th>
                                             <th>Amount</th>
                                            <th><span id="splbldim8">Dimension 8</span></th>
                                             <th>Amount</th>
                                            <th><span id="splbldim9">Dimension 9</span></th>
                                             <th>Amount</th>
                                            <th><span id="splbldim10">Dimension 10</span></th>
                                             <th>Amount</th>
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
                 <h5 class="modal-title">Budget Allocation - Edit</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
                    <div class="form-group row">
                        <div class="col-sm-3"><strong>Budget Code:</strong><span id="spnBudgetcode1"></span></div>
                        <div class="col-sm-3"><strong>Budget Description:</strong><span id="spnBudgetDesc1"></span></div>
                        <div class="col-sm-3"><strong>AC Name:</strong><span id="spnBudgetCode1"></span></div>
                        <div class="col-sm-3"><strong>Total Budget Amount:</strong><span id="spnBudgetAmt1"></span></div>
                    </div>
                     <div class="form-group row">
                        <div class="col-sm-3"><strong>Period Allocation Basis:</strong><span id="spnBudgetAllo1"></span></div>
                        <div class="col-sm-3"><strong>Starting date:</strong><span id="spnBudgetStDt1"></span></div>
                        <div class="col-sm-3"><strong>Ending Date:</strong><span id="spnBudgetEndDt1"></span></div>
                        
                    </div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Select Type</label>
						</div>
						<div class="col-sm-3">
						  <select class="form-control" id="ddType" onchange="popudivType();">
                              <option value="P">Period</option>
                              <option value="D">Dimension</option>
						  </select>
				   		</div>
                        <div class="col-sm-3" id="divType" style="display : none;">
						  <select class="form-control" id="ddPeriod" onchange="fetchDatabyType();">
                              
						  </select>
						</div>
						<div class="col-sm-3">
							   <button type="button" class="btn btn-primary" onclick="fetchDatabyType()">Search</button>
						</div>
						
					</div>
                   <div class="form-group row"  style="border : 1px solid;">
                        <div class="col-sm-12">
                        <div id="divDimension" style="overflow-x: scroll;">

                          </div>
                        </div>    
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btnSave" onclick="return dataSave();">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>
        </div>
    </div>

<!-- Modal HTML VIEW -->
    <div class="modal fade" id="myModalVIEW" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Budget Allocation - View</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Date/Period</label>
						</div>
						<div class="col-sm-3">
						  <input type="date" class="form-control"/>
				   		</div>
						<div class="col-sm-3">
							<label for="input">Total Budget Amount</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control"/>
						</div>
					</div>
                  
                    
                </div>
                    
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="dataSave();">OK</button>
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
						<div class="col-sm-6">
							<strong>Budget Code:</strong> Display budget code<br />
							<strong>Budget Description:</strong> Display budget Description	<br />		
							<strong>AC Name:</strong> Display AC Code<br />			
							<strong>Budget Amount</strong>: Display Budget Amount			
				   		</div>
						<div class="col-sm-6">
							<strong>Period Allocation Basis:</strong> Display as selected<br />
							<strong>Starting date:</strong> Display date<br />			
							<strong>Ending Date:</strong> Display date			
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
    

        
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
        let editor; // use a global for the submit and return data rendering in the examples
 
    //    $(document).ready(function() {
    //        editor = new $.fn.dataTable.Editor( {
    //            table: "#item_table",} );
    //        	$('#item_table').DataTable( {
    //            dom: "Bfrtip",
				////"bPaginate": false,
				////"bLengthChange": false,
    //            //select: false,
				////"bFilter": false,
    //    		//"bInfo": false,
				////"ordering": false,
    //            buttons: [
    //                {
    //                    add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
    //                },
				//	{
    //                    extend: "remove", editor: editor
    //                },
				//	{
    //                    add: "view", text: 'View', editor: editor, action: () => showmodalview()
    //                },
				//	{
    //                    add: "ballow", text: 'Run Allocation Batch', editor: editor, action: () => showmodalbatch()
    //                }
    //            ],
         
    //        })
    //    })
		

		var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
		var showmodalview = function () {
            $("#myModalVIEW").modal('show');
        };
		var showmodalbatch = function () {
            $("#myModalBATCH").modal('show');
        };


    </script>
</asp:Content>
