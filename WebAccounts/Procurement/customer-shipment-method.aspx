<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="customer-shipment-method.aspx.cs" Inherits="WebAccounts.customer_shipment_method" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/jsCustomerShipmentMethod.js"></script>
    <title>Customer Shipment Method</title>
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
					<strong>Customer Shipment Method</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                <table id="customer_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;" > <%--white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;"--%>
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Description</th>
                                            <th>Block</th>
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
                    <h5 class="modal-title">Shipment Method - New</h5>
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
							<input type="text" class="form-control" id="txtDesc">
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

