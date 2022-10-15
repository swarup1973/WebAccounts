<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="sales-commission-setup-overview.aspx.cs" Inherits="WebAccounts.Sales.sales_commission_setup_overview" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Sales Commission Setup Overview</title>
       <script type="text/javascript" src="js/salescommissionsetupoverview.js"></script>
     <link href="../InventoryManagement/administration.css" rel="stylesheet" />
    
    <style>
			fieldset {
			transition: opacity 200ms;
			}
			fieldset[disabled] {
			opacity: 0.5;
			}
			[disabled] .ws-errormessage {
			color: #eee;
			}
		</style>
		<script>
            function optionChange() {
                
                if (document.getElementById("selectMe").value == "3"){
                    var cells = document.getElementsByClassName("sales"); 
                    for (var i = 0; i < cells.length; i++) { 
                        cells[i].disabled = true;
                    }
                }  
                else{
                    var cells = document.getElementsByClassName("sales"); 
                    for (var i = 0; i < cells.length; i++) { 
                        cells[i].disabled = false;
                    }
                }       
              
            /* populdate Calculation Relation */
                var sval = $("#selectMe").val();
                if (sval == 1 || sval == 2) {
                    var _html = [];
                    _html.push("<option value='-1'>--Select--</option>")
                    for (var i = 0; i < objMaster.length; i++) {
                        if (objMaster[i].ctype == "calculation" && parseInt(objMaster[i].grp) == sval) {
                            _html.push(
                                "<option value='" + objMaster[i].RowId + "'>" + objMaster[i].cdesc + "</option>"
                            );
                        }
                       
                    }
                    $("#ddCalc").html(_html.join(""));
                   
                }
                else {
                    var _html = [];
                    _html.push("<option value='-1'>--Select--</option>")
                    $("#ddCalc").html(_html.join(""));
                }
                
            /* populdate Calculation Relation */

            }
			
			function optionChange2() {
                if (document.getElementById("selectMe2").value == "3"){
                    var cells = document.getElementsByClassName("sales2"); 
                    for (var i = 0; i < cells.length; i++) { 
                        cells[i].disabled = true;
                    }
                }  
                else{
                    var cells = document.getElementsByClassName("sales2"); 
                    for (var i = 0; i < cells.length; i++) { 
                        cells[i].disabled = false;
                    }
                }    
                /* Sales Person Relation */
                var sval = $("#selectMe2").val();
                if (sval == 1 || sval == 2) {
                    var _html = [];
                    _html.push("<option value='-1'>--Select--</option>")
                    for (var i = 0; i < objMaster.length; i++) {
                        if (objMaster[i].ctype == 'sales' && objMaster[i].grp == sval) {
                            _html.push(
                                "<option value='" + objMaster[i].RowId + "'>" + objMaster[i].cdesc + "</option>"
                            );
                        }
                    }
                    $("#ddSales").html(_html.join(""));
                   
                }
                else {
                    var _html = [];
                    _html.push("<option value='-1'>--Select--</option>")
                    $("#ddSales").html(_html.join(""));
                }

            /* Sales Person Relation */
            }
			
			function optionChange3() {
                if (document.getElementById("selectMe3").value == "9"){
                    var cells = document.getElementsByClassName("sales3"); 
                    for (var i = 0; i < cells.length; i++) { 
                        cells[i].disabled = true;
                    }
                }  
                else{
                    var cells = document.getElementsByClassName("sales3"); 
                    for (var i = 0; i < cells.length; i++) { 
                        cells[i].disabled = false;
                    }
                }        
            }
			
			function optionChange4() {
                if (document.getElementById("selectMe4").value == "12"){
                    var cells = document.getElementsByClassName("sales4"); 
                    for (var i = 0; i < cells.length; i++) { 
                        cells[i].disabled = true;
                    }
                }  
                else{
                    var cells = document.getElementsByClassName("sales4"); 
                    for (var i = 0; i < cells.length; i++) { 
                        cells[i].disabled = false;
                    }
                }        
            }
        </script>
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
                               <!-- start role table -->
                                <table id="addressbook" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Description</th>
                                            <th>Calculation Basis</th>
                                            <th>Calculation Relation</th>
                                            <th>Sales Person/Representative</th>
                                            <th>Sales Person Relation</th>
                                            <th>Commission Percent</th>
                                            <th>Base value for Calculation</th>
                                            <th>Valid From</th>
                                            <th>Valid Till</th>
                                            <th>Comm. AC (Exp.)</th>
                                            <th>Comm. AC (Liab.)</th>
                                            <th>Block</th>
                                            <th>Stop</th>
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
                 <h5 class="modal-title">Sales Commission Setup - New</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-3">
							Code
                            <span class="requ">(*)</span>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control" id="txtCode"/>
                            
						</div>
                        <div class="col-sm-3">
							Commission Percent
						</div>
						<div class="col-sm-3">
							<input type="number" class="form-control" id="txtPercent" value="0"/>
						</div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Description
                            <span class="requ">(*)</span>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control" id="txtDesc"/>
						</div>
                        <div class="col-sm-3">
							Base value for Calculation
                            
						</div>
						<div class="col-sm-3">
							<select class="form-control" id="ddBaseValueCalc">
                            	<option value="1">1. Gross Value before Item & Invoice Discount</option>
                                <option value="2">2. Value after Item but before Invoice Discount</option>
                                <option value="3">3. Net Value after Item & Invoice Discount</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Calculation Basis
                            <span class="requ">(*)</span>
						</div>
						<div class="col-sm-3">
							<select class="form-control selectMe" required id="selectMe" onchange="optionChange()">
                            	<option value="0">Select</option>
                                <option value="1">1. Item wise</option>
                                <option value="2">2. Item Group Wise</option>
                                <option value="3">3. For All Items</option>
                            </select>
						</div>
                        <div class="col-sm-3">
							Valid from
						</div>
						<div class="col-sm-3">
							<input type="date" class="form-control" id="txtValidFrom"/>
						</div>
					</div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Calculation Relation
                            
						</div>
						<div class="col-sm-3">
                        	<fieldset id="chkdd">
                    		<div id="option3" class="group">
							<select class="form-control sales" id="ddCalc">
                            	
                            </select>
                            </div>
                    		</fieldset>
						</div>
                        
                        <div class="col-sm-3">
							Valid Till
						</div>
						<div class="col-sm-3">
							<input type="date" class="form-control" id="txtValidTo"/>
						</div>
					</div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Sales Person/Representative
						</div>
						<div class="col-sm-3">
							<select class="form-control selectMe2" required id="selectMe2" onchange="optionChange2()">
                            	<option value="0">Select</option>
                                <option value="1">1. Sales Person/Representative</option>
                                <option value="2">2. Sales Group</option>
                                <option value="3">3. For all Sales Group</option>
                            </select>
						</div>
                        <div class="col-sm-3">
							Commission Account for Expense
						</div>
						<div class="col-sm-3">
							<select class="form-control" id="ddExpense1">
                            	
                            </select>
						</div>
					</div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Sales Person Relation
						</div>
						<div class="col-sm-3">
                        	<fieldset id="chkdd2">
                    		<div id="option6" class="group">
							<select class="form-control sales2" id="ddSales">
                            	
                            </select>
                            </div>
                    		</fieldset>
						</div>
                        <div class="col-sm-3">
							Commission Account for Expense
						</div>
						<div class="col-sm-3">
							<select class="form-control" id="ddExpense">
                            	
                            </select>
						</div>
					</div>
                    <div class="form-group row">
                        <div class="col-sm-3">
                        	Block
						</div>
						<div class="col-sm-3">
							<input type="checkbox" id="chkBlock" />
						</div>
                        <div class="col-sm-3">
							Stop
						</div>
						<div class="col-sm-3">
							<input type="checkbox" id="chkStop" />
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

    <!-- Modal HTML Edit -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Sales Commission Setup - Edit</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-3">
							Code
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"/>
						</div>
                        <div class="col-sm-3">
							Commission Percent
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"/>
						</div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Description
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"/>
						</div>
                        <div class="col-sm-3">
							Base value for Calculation
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            	<option>1. Gross Value before Item & Invoice Discount</option>
                                <option>2. Value after Item but before Invoice Discount</option>
                                <option>3. Net Value after Item & Invoice Discount</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Calculation Basis
						</div>
						<div class="col-sm-3">
							<select class="form-control selectMe3" required id="selectMe3" onchange="optionChange3()">
                            	<option value="7">1. Item wise</option>
                                <option value="8">2. Item Group Wise</option>
                                <option value="9">3. For All Items</option>
                            </select>
						</div>
                        <div class="col-sm-3">
							Valid from
						</div>
						<div class="col-sm-3">
							<input type="date" class="form-control"/>
						</div>
					</div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Calculation Relation
						</div>
						<div class="col-sm-3">
                        	<fieldset id="chkdd">
                    		<div id="option9" class="group">
							<select class="form-control sales3">
                            	<option>--</option>
                            	<option>--</option>
                            </select>
                            </div>
                    		</fieldset>
						</div>
                        
                        <div class="col-sm-3">
							Valid Till
						</div>
						<div class="col-sm-3">
							<input type="date" class="form-control"/>
						</div>
					</div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Sales Person/Representative
						</div>
						<div class="col-sm-3">
							<select class="form-control selectMe4" required id="selectMe4" onchange="optionChange4()">
                            	<option value="10">1. Sales Person/Representative</option>
                                <option value="11">2. Sales Group</option>
                                <option value="12">3. For all Sales Group</option>
                            </select>
						</div>
                        <div class="col-sm-3">
							Commission Account for Expense
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            	<option>--</option>
                            	<option>--</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Sales Person Relation
						</div>
						<div class="col-sm-3">
                        	<fieldset id="chkdd2">
                    		<div id="option12" class="group">
							<select class="form-control sales4">
                            	<option>--</option>
                            	<option>--</option>
                            </select>
                            </div>
                    		</fieldset>
						</div>
                        <div class="col-sm-3">
							Commission Account for Expense
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            	<option>--</option>
                            	<option>--</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
                        <div class="col-sm-3">
                        	Block
						</div>
						<div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-3">
							Stop
						</div>
						<div class="col-sm-3">
							<input type="checkbox" />
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
                 <h5 class="modal-title">Sales Commission Setup - View</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-3">
							Code
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"/>
						</div>
                        <div class="col-sm-3">
							Commission Percent
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"/>
						</div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Description
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"/>
						</div>
                        <div class="col-sm-3">
							Base value for Calculation
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"/>
						</div>
					</div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Calculation Basis
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"/>
						</div>
                        <div class="col-sm-3">
							Valid from
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"/>
						</div>
					</div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Calculation Relation
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"/>
						</div>
                        <div class="col-sm-3">
							Valid Till
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"/>
						</div>
					</div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Sales Person/Representative
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"/>
						</div>
                        <div class="col-sm-3">
							Commission Account for Expense
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"/>
						</div>
					</div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Sales Person Relation
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"/>
						</div>
                        <div class="col-sm-3">
							Commission Account for Expense
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"/>
						</div>
					</div>
                    <div class="form-group row">
                        <div class="col-sm-3">
							Block
						</div>
						<div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-3">
							Stop
						</div>
						<div class="col-sm-3">
							<input type="checkbox" />
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
                        add: "stop", text: 'Stop', editor: editor
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


