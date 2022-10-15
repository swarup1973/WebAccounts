<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="calculate-sales-commission.aspx.cs" Inherits="WebAccounts.Sales.calculate_sales_commission" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
	 <script type="text/javascript" src="js/calculatesalescommission.js"></script>
    <title>Posting Set-up for Charges</title>
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
                if (document.getElementById("selectMe").value == "2"){
                    var cells = document.getElementsByClassName("debit"); 
                    for (var i = 0; i < cells.length; i++) { 
                        cells[i].disabled = false;
                    }
                }     
                else{
                    var cells = document.getElementsByClassName("debit"); 
                    for (var i = 0; i < cells.length; i++) { 
                        cells[i].disabled = true;
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
                    
					<form>
                	<div class="form-group row">
						<div class="col-sm-12">
							<p><strong>On Running the batch system will create a journal and Voucher under the selected Journal Batch </strong></p>
						</div>
                        
                        <div class="col-sm-3">
							Select Journal Batch
						</div>
						<div class="col-sm-3">
							<select id="ddJournal">
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							Select Date
						</div>
						<div class="col-sm-3">
							<input type="date" />
						</div>
                    </div>
                    <div class="form-group row">
						<div class="col-sm-3">
							Sales Commission Code
						</div>
						<div class="col-sm-3">
							<select id="ddCommission" onchange="getSalesCommissionOverViewdetails();">
                               
                            </select>
						</div>
                    </div>                     
					
                    <div class="form-group row">
						<div class="col-sm-2">
						</div>
						<div class="col-sm-3">
							<button type="button" class="btn btn-primary">Run</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
						</div>
                    </div>

			  </form>
                </div>
            </div>
        </div>
    </div>

	<div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">

                	<div class="form-group row">                      
                        <div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
							Commission Percent
						</div>
						<div class="col-sm-3">
							<input type="text" disabled="disabled" id="txtPercent" />
						</div>
                    </div>
                    
                    <div class="form-group row">                      
                        <div class="col-sm-3">
                        	Description
						</div>
						<div class="col-sm-3">
                        	<input type="text" disabled="disabled" id="txtDesc" />
						</div>
						<div class="col-sm-3">
							Base value for Calculation
						</div>
						<div class="col-sm-3">
							<input type="text" disabled="disabled" id="txtBase" />
						</div>
                    </div>
                    
                    <div class="form-group row">                      
                        <div class="col-sm-3">
                        	Calculation Basis
						</div>
						<div class="col-sm-3">
                        	<input type="text" disabled="disabled" id="txtCalculationBasis" />
						</div>
						<div class="col-sm-3">
							Valid From
						</div>
						<div class="col-sm-3">
							<input type="text" disabled="disabled" id="txtFrom" />
						</div>
                    </div>
                    
                    <div class="form-group row">                      
                        <div class="col-sm-3">
                        	Calculation Relation
						</div>
						<div class="col-sm-3">
                        	<input type="text" disabled="disabled" id="txtCalculationRelation" />
						</div>
						<div class="col-sm-3">
							Valid Till
						</div>
						<div class="col-sm-3">
							<input type="text" disabled="disabled"  id="txtTill"/>
						</div>
                    </div> 
                    <div class="form-group row">                      
                        <div class="col-sm-3">
                        	Sales Person/Representative
						</div>
						<div class="col-sm-3">
                        	<input type="text" disabled="disabled" id="txtPerson" />
						</div>
						<div class="col-sm-3">
							Commission Account for Expense
						</div>
						<div class="col-sm-3">
							<input type="text" disabled="disabled" id="txtExpenseAC" />
						</div>
                    </div> 
                    
                    <div class="form-group row">                      
                        <div class="col-sm-3">
                        	Sales Person Relation
						</div>
						<div class="col-sm-3">
                        	<input type="text" disabled="disabled" id="txtPersonRelation" />
						</div>
						<div class="col-sm-3">
							Commission Account for Liability
						</div>
						<div class="col-sm-3">
							<input type="text" disabled="disabled" id="txtLiabilityAC" />
						</div>
                    </div>                    

                </div>
            </div>
        </div>
    </div>
    
    </div>
    <!-- Modal HTML Wizard --></asp:Content>



