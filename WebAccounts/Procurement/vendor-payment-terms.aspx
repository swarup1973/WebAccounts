<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="vendor-payment-terms.aspx.cs" Inherits="WebAccounts.vendor_payment_terms" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/jsVendorPaymentTerm.js"></script>
    <title>Vendor Payment Term</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                   Procurement 
					>
					Setup 
					>
					<strong>Vendor Payment Term</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                <table id="Vnd_payment_term_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Description</th>
                                            <th>Payment Period Type</th>
                                            <th>Payment Terms Period</th>
                                            <th>Discount Period Type</th>
                                            <th>Discount Calculation Period</th>
                                            <th>Discount %</th>
                                            <th>Calculate Discount on Return/Cr Memo </th>
                                            <th>IsBlock </th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                     </tbody>
                                </table>
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>



    <!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Payment Terms - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Code</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="txtCode">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Description</label>
						</div>
						<div class="col-sm-6">
							<textarea  class="form-control" id="txtDescription"></textarea>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Payment Period Type</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control" id="Payment_type">
                                <option value="">Select</option>
                            	<option value="D">Day</option>
                                <option value="W">Week</option>
                                <option value="M">Month</option>
                                <option value="Q">Quarter</option>
                             </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Payment Terms Period</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="txtPaymenttermP">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Discount Period Type</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control" id="Period_type">
                            	<option value="">Select</option>
                                <option value ="D">Day</option>
                                <option value="W">Week</option>
                                <option value="M">Month</option>
                                <option value="Q">Quarter</option>
                             </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Discount Calculation Period</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control" id="txt_Dis_Cal_Period">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Discount %</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control" id="txtDiscount">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Calculate Discount on Return/Cr Memo </label>
						</div>
						<div class="col-sm-6">
							 <input type="checkbox" class="form-control" id="chk_caldismemo">
						</div>
					</div>
                    <div class="form-group row" id="div_block">
					    <div class="col-sm-6">
						    <label for="input">Blocked</label>
					    </div>
					    <div class="col-sm-6">
						    <input type="checkbox" class="form-control" id="chk_block"/>
					    </div>
				    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="savedata();">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>
        </div>
    </div>
   
    <!-- Modal HTML EDIT -->
    <%--<div class="modal fade" id="myModalEDIT" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Shipment Method - Edit</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Code</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" >
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Description</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row" id="div_block">
					    <div class="col-sm-6">
						    <label for="input">Blocked</label>
					    </div>
					    <div class="col-sm-6">
						    <input type="checkbox"/>
					    </div>
				    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>
        </div>
    </div>--%>
    
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <link href="../Administration/administration.css" rel="stylesheet" />
    <script type="text/javascript">
        let editor; // use a global for the submit and return data rendering in the examples
 
        //$(document).ready(function() {
        //    editor = new $.fn.dataTable.Editor( {
        //        table: "#customer_table",} );
        //    $('#customer_table').DataTable( {
        //        dom: "Bfrtip",

        //        select: true,
                
         
        //    })
        //})

        

    </script>
</asp:Content>

