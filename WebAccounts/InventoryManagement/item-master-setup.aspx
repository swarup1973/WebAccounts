<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="WebAccounts.roles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

        <div class="row">
            <div class="col">
                <p>
                   General Ledger
					>
					<a href="item-master-overview.aspx">Item Master Overview</a>
					>
                    <strong>Item Master Setup</strong>
                </p>
            </div>
        </div>


        <div class="clearfix"></div>
		

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                    
                                <!-- start role table -->
                      <div class="clearfix"></div>
<table id="item_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>General</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Item No</strong></td>
                                            <td>Display from overview. </td>
                                            <td><strong>Block</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                            <td>Picture Goes here</td>
                                        </tr>
                                        <tr>
                                            <td height="24"><strong>Descripton</strong></td>
                                          <td>Display from overview. </td>
                                            <td><strong>Stop</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                            <td>150 Characters, text field. </td>
                                        </tr>
                                        <tr>
                                            <td><strong>Search Description</strong></td>
                                            <td>Display from overview.</td>
                                            <td><strong>Allow Negative Stock?</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Item Group</strong></td>
                                            <td>Display from overview. </td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Item Category</strong></td>
                                            <td>Display from overview. </td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Item Type</strong></td>
                                            <td>Display from overview. </td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Posting Group</strong></td>
                                            <td>Dropdown Selection</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                      </tbody>
                                </table>
                                <!-- end General table -->
                                
                      <div class="clearfix"></div>
                      <table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                	<thead>
                                        <tr>
                                            <th>Sales & Invoicing</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                   <tbody>
                                        <tr>
                                            <td><strong>Sale Unit of Measurement</strong></td>
                                            <td>Dropdown selection from Unit of Measurement</td>
                                            <td><strong>Tax Group</strong></td>
                                            <td>Dropdown Selection</td>
                                        </tr>
                    </tbody>
                      </table>
                      
                      
                      <div class="clearfix"></div>
<table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                	<thead>
                                        <tr>
                                            <th>Purchase & Replenishment</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                   <tbody>
                                        <tr>
                                            <td><strong>Lead Time (In Days)</strong></td>
                                            <td>Numeric. Optional</td>
                                            <td><strong>Vendot Item No</strong></td>
                                            <td>Display only</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Default Vendor Name</strong></td>
                                            <td>Dropdown Selection from Vendor-Item Setup</td>
                                            <td><strong>Purchase Unit of Measurement</strong></td>
                                            <td>Dropdown selection from Unit of Measurement</td>
                                        </tr>
                    </tbody>
                      </table>
                      
                      <div class="clearfix"></div>
                      <table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                               	  <thead>
                                        <tr>
                                            <th>Cost & Price</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                        </thead>
                                   <tbody>
                                        <tr>
                                            <td><strong>Standard Cost</strong></td>
                                            <td>Manual. Numeric with decimal places</td>
                                            <td><strong>Costing Method</strong></td>
                                            <td>Dropdown selection</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Unit Cost</strong></td>
                                            <td>Manual. Numeric with decimal places</td>
                                            <td><strong>Manage Cost &amp; Price by Variant?</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Profit %</strong></td>
                                            <td>Manual. Numeric with decimal places</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Sale Price</strong></td>
                                            <td>Manual. Numeric with decimal places</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Maximum Sale Price</strong></td>
                                            <td>Manual. Numeric with decimal places</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                    </tbody>
                      </table>
                      <div class="clearfix"></div>
<table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                	<thead>
                                        <tr>
                                            <th>Planning (Future Development)</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                   <tbody>
                                        <tr>
                                            <td><strong>Minimum Stock Level</strong></td>
                                            <td>Manual. Numeric</td>
                                            <td><strong>Maximum Stock Level</strong></td>
                                            <td>Manual. Numeric</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Safety Stock</strong></td>
                                            <td>Manual. Numeric</td>
                                            <td><strong>Stockout Warning ?</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                        </tr>
</tbody>
                      </table>
                      
                      <div class="clearfix"></div>
                      <table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                	<thead>
                                        <tr>
                                            <th>Tracking &amp; Movement Set-up</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                   <tbody>
                                        <tr>
                                            <td><strong>Allow Consumption after Receipt Note</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                            <td><strong>Receiving Requirement</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Quarantice Requirement</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                            <td><strong>Picking Requirement</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Registration Required</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                            <td><strong>Reserve Requirement</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td><strong>Reservation</strong></td>
                                            <td>Manual Selection from dropdown.</td>
                                        </tr>
               			</tbody>
                      </table>
                      
                      <div class="clearfix"></div>
<table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                	<thead>
                                        <tr>
                                            <th>Storage &amp; Administration</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                   <tbody>
                                        <tr>
                                            <td><strong>Default Warehouse	</strong></td>
                                            <td>Dropdown selection </td>
                                            <td><strong>Track Batch No?</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                            <td><strong>Variant Code-1</strong></td>
                                            <td>Selection from Variant Code</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Stock Unit of Measurement	</strong></td>
                                            <td>Dropdown selection from Unit of Measurement</td>
                                            <td><strong>Track Serial No ?</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                            <td><strong>Variant Code-2</strong></td>
                                            <td>Selection from Variant Code</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Capture Date of Manufacture	</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                            <td><strong>Reserve Requirement</strong></td>
                                            <td>Dropdown selection </td>
                                            <td><strong>Variant Code-3</strong></td>
                                            <td>Selection from Variant Code</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Best Before use (Days)	</strong></td>
                                            <td>Numeric</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td><strong>Variant Code-4</strong></td>
                                            <td>Selection from Variant Code</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Warranty</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Warranty Period</strong></td>
                                            <td>Numeric</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                    			</tbody>
                      </table>
                      
                      <div class="clearfix"></div>
<table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                	<thead>
                                        <tr>
                                            <th>Foreign Trade</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                   <tbody>
                                        <tr>
                                            <td><strong>GTIN</strong></td>
                                            <td>Text. 30 Digit</td>
                                            <td><strong>Country of Origin</strong></td>
                                            <td>Selection from Dropdown</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Tariff Code</strong></td>
                                            <td>Text. 30 Digit</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                    		</tbody>
                      </table>
                      
                      <div class="clearfix"></div>
<table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                	<thead>
                                        <tr>
                                            <th>Tax Info</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                   <tbody>
                                        <tr>
                                            <td><strong>Tax Group</strong></td>
                                            <td>Selection from Dropdown</td>
                                            <td><strong>Tax Calculation Structure</strong></td>
                                            <td>Selection from Dropdown</td>
                                        </tr>
                                        <tr>
                                            <td><strong>HSN Code</strong></td>
                                            <td>Selection from Dropdown</td>
                                            <td><strong>Price Including Tax</strong></td>
                                            <td><input type="checkbox" class="form-control" /></td>
                                        </tr>
                    		</tbody>
                      </table>
                      
                      <div class="clearfix"></div>
<table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                	<thead>
                                        <tr>
                                            <th>Statistics</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                   <tbody>
                                        <tr>
                                            <td><strong>Stock In Hand</strong></td>
                                            <td>Display only</td>
                                            <td><strong>Maximum Stock Level</strong></td>
                                            <td>Display only</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Qty on Purchase Order</strong></td>
                                            <td>Display only</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Qty on Sales Order</strong></td>
                                            <td>Display only</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                    		</tbody>
                      </table>                 
                      
					</div>
                </div>
            </div>
        </div>                                                     
                                
                                
<!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">New</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
                	<div class="form-group row">
						<div class="col-sm-12">
							<strong>General</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Posting Group</label>
						</div>
						<div class="col-sm-3">
						  <select name="select" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
				    </div>
						<div class="col-sm-3">
							<label for="input">Block</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" class="form-control" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Stop</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" class="form-control" />
				    </div>
						<div class="col-sm-3">
							<label for="input">Allow Negative Stock?</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" class="form-control" />
						</div>
					</div>

                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Upload Picture</label>
						</div>
						<div class="col-sm-3">
							<input type="file" accept="image/png, image/jpeg">
						</div>
                        <div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>

					<hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Sales &amp; Invoicing</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Sale Unit of Measurement</label>
						</div>
						<div class="col-sm-3">
						  <select name="select2" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
				    </div>
						<div class="col-sm-3">
							<label for="input">Tax Group</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
						</div>
					</div>

					<hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Purchase &amp; Replenishment</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Lead Time (In Days)</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control">
				    </div>
						<div class="col-sm-3">
							<label for="input">Purchase Unit of Measurement</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Default Vendor Name</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
				    </div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
                    
					<hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Cost &amp; Price</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Standard Cost</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Costing Method</label>
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
							<label for="input">Unit Cost</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Manage Cost &amp; Price by Variant?</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Profit %</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Sale Price</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                  <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Maximum Sale Price</label>
					  </div>
						<div class="col-sm-3"></div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
					
                    <span class="col-sm-3">
                    <input type="text" class="form-control" />
                    </span>
                    <hr />
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Planning (Future Development)</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Minimum Stock Level</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Maximum Stock Level</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Safety Stock</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Stockout Warning?</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    
                    <hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Tracking &amp; Movement Set-up</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Tracking & Movement Set-up</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Receiving Requirement	</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Quarantice Requirement</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Picking Requirement</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Registration Required</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Reserve Requirement</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Reservation</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
                    
                    <hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Storage &amp; Administration</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Default Warehouse</label>
						</div>
						<div class="col-sm-3">
						  <select name="select4" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
						</div>
						<div class="col-sm-3">
							<label for="input">Track Batch No?</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Stock Unit of Measurement</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							<label for="input">Track Serial No?</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Capture Date of Manufacture</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Reserve Requirement</label>
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
							<label for="input">Best Before use (Days)</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
                        	<label for="input">Warranty</label>
						</div>
						<div class="col-sm-3">
                        	<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Warranty Period</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
                        	<label for="input">Variant Code-1</label>
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
							<label for="input">Variant Code-2</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
                        	<label for="input">Variant Code-3</label>
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
							<label for="input">Variant Code-4</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
                    
                    <hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Foreign Trade</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">GTIN</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Tariff Code</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Country of Origin	</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Tax Info</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Tax Group</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							<label for="input">Tax Calculation Structure</label>
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
							<label for="input">HSN Code</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							<label for="input">Price Including Tax</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Add</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>
        </div>
    </div>

<!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Edit</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
                	<div class="form-group row">
						<div class="col-sm-12">
							<strong>General</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Posting Group</label>
						</div>
						<div class="col-sm-3">
						  <select name="select" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
				    </div>
						<div class="col-sm-3">
							<label for="input">Block</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" class="form-control" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Stop</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" class="form-control" />
				    </div>
						<div class="col-sm-3">
							<label for="input">Allow Negative Stock?</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" class="form-control" />
						</div>
					</div>

                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Upload Picture</label>
						</div>
						<div class="col-sm-3">
							<input type="file" accept="image/png, image/jpeg">
						</div>
                        <div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>

					<hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Sales &amp; Invoicing</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Sale Unit of Measurement</label>
						</div>
						<div class="col-sm-3">
						  <select name="select2" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
				    </div>
						<div class="col-sm-3">
							<label for="input">Tax Group</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
						</div>
					</div>

					<hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Purchase &amp; Replenishment</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Lead Time (In Days)</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control">
				    </div>
						<div class="col-sm-3">
							<label for="input">Purchase Unit of Measurement</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Default Vendor Name</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
				    </div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
                    
					<hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Cost &amp; Price</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Standard Cost</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Costing Method</label>
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
							<label for="input">Unit Cost</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Manage Cost &amp; Price by Variant?</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Profit %</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Sale Price</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                  <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Maximum Sale Price</label>
					  </div>
						<div class="col-sm-3"></div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
					
                    <span class="col-sm-3">
                    <input type="text" class="form-control" />
                    </span>
                    <hr />
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Planning (Future Development)</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Minimum Stock Level</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Maximum Stock Level</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Safety Stock</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Stockout Warning?</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    
                    <hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Tracking &amp; Movement Set-up</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Tracking & Movement Set-up</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Receiving Requirement	</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Quarantice Requirement</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Picking Requirement</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Registration Required</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Reserve Requirement</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Reservation</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
                    
                    <hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Storage &amp; Administration</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Default Warehouse</label>
						</div>
						<div class="col-sm-3">
						  <select name="select4" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
						</div>
						<div class="col-sm-3">
							<label for="input">Track Batch No?</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Stock Unit of Measurement</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							<label for="input">Track Serial No?</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Capture Date of Manufacture</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Reserve Requirement</label>
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
							<label for="input">Best Before use (Days)</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
                        	<label for="input">Warranty</label>
						</div>
						<div class="col-sm-3">
                        	<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Warranty Period</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
                        	<label for="input">Variant Code-1</label>
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
							<label for="input">Variant Code-2</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
                        	<label for="input">Variant Code-3</label>
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
							<label for="input">Variant Code-4</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
                    
                    <hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Foreign Trade</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">GTIN</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Tariff Code</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Country of Origin	</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Tax Info</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Tax Group</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							<label for="input">Tax Calculation Structure</label>
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
							<label for="input">HSN Code</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							<label for="input">Price Including Tax</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
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
    </div>


<!-- Modal HTML VIEW -->
    <div class="modal fade" id="myModalVIEW" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">View</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
                	<div class="form-group row">
						<div class="col-sm-12">
							<strong>General</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Posting Group</label>
						</div>
						<div class="col-sm-3">
						  <select name="select" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
				    </div>
						<div class="col-sm-3">
							<label for="input">Block</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" class="form-control" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Stop</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" class="form-control" />
				    </div>
						<div class="col-sm-3">
							<label for="input">Allow Negative Stock?</label>
						</div>
						<div class="col-sm-3">
						  <input type="checkbox" class="form-control" />
						</div>
					</div>

                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Upload Picture</label>
						</div>
						<div class="col-sm-3">
							<input type="file" accept="image/png, image/jpeg">
						</div>
                        <div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>

					<hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Sales &amp; Invoicing</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Sale Unit of Measurement</label>
						</div>
						<div class="col-sm-3">
						  <select name="select2" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
				    </div>
						<div class="col-sm-3">
							<label for="input">Tax Group</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
						</div>
					</div>

					<hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Purchase &amp; Replenishment</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Lead Time (In Days)</label>
						</div>
						<div class="col-sm-3">
						  <input type="text" class="form-control">
				    </div>
						<div class="col-sm-3">
							<label for="input">Purchase Unit of Measurement</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Default Vendor Name</label>
						</div>
						<div class="col-sm-3">
						  <select name="select3" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
				    </div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
                    
					<hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Cost &amp; Price</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Standard Cost</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Costing Method</label>
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
							<label for="input">Unit Cost</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Manage Cost &amp; Price by Variant?</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Profit %</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Sale Price</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                  <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Maximum Sale Price</label>
					  </div>
						<div class="col-sm-3"></div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
					
                    <span class="col-sm-3">
                    <input type="text" class="form-control" />
                    </span>
                    <hr />
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Planning (Future Development)</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Minimum Stock Level</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Maximum Stock Level</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Safety Stock</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Stockout Warning?</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    
                    <hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Tracking &amp; Movement Set-up</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Tracking & Movement Set-up</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Receiving Requirement	</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Quarantice Requirement</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Picking Requirement</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Registration Required</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Reserve Requirement</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Reservation</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
                    
                    <hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Storage &amp; Administration</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Default Warehouse</label>
						</div>
						<div class="col-sm-3">
						  <select name="select4" class="form-control">
						    <option>--</option>
						    <option>--</option>
					      </select>
						</div>
						<div class="col-sm-3">
							<label for="input">Track Batch No?</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Stock Unit of Measurement</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							<label for="input">Track Serial No?</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Capture Date of Manufacture</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Reserve Requirement</label>
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
							<label for="input">Best Before use (Days)</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
                        	<label for="input">Warranty</label>
						</div>
						<div class="col-sm-3">
                        	<input type="checkbox" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Warranty Period</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
                        	<label for="input">Variant Code-1</label>
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
							<label for="input">Variant Code-2</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
                        	<label for="input">Variant Code-3</label>
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
							<label for="input">Variant Code-4</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
                    
                    <hr/>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Foreign Trade</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">GTIN</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Tariff Code</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Country of Origin	</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Tax Info</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Tax Group</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							<label for="input">Tax Calculation Structure</label>
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
							<label for="input">HSN Code</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							<label for="input">Price Including Tax</label>
						</div>
						<div class="col-sm-3">
							<input type="checkbox" class="form-control">
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
				"bPaginate": false,
				"bLengthChange": false,
                select: false,
				"bFilter": false,
        		"bInfo": false,
				"ordering": false,
                buttons: [
					{
						add: "create", text: 'New', editor: editor, action: () => showmodal()
					},
                    {
                        add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
                    },
                    {
                        add: "save", text: 'Save', editor: editor
                    },
					{
                        extend: "remove", editor: editor
                    },
					{
                        add: "view", text: 'View', editor: editor, action: () => showmodalview()
                    },
					{
                        add: "block", text: 'Block', editor: editor
                    },
                    {
                        add: "dimension", text: 'Dimension', editor: editor, action: () => window.open("item-dimension.aspx")
                    },
					{
                        add: "variant", text: 'Variants Setup', editor: editor, action: () => window.open("item-variant-setup.aspx")
                    },
					{
                        add: "unit", text: 'Unit Conversion', editor: editor, action: () => window.open("unit-of-measurement.aspx")
                    },
					
					{
                        add: "itemvend", text: 'Item-Vendor Price', editor: editor, action: () => window.open("item-vendor-price.aspx")
                    },
					{
                        add: "icp", text: 'Item-Customer Price', editor: editor, action: () => window.open("item-customer-price.aspx")
                    },
					{
                        add: "itemvendordiscount", text: 'Item-Vendor-Discount', editor: editor, action: () => window.open("item-vendor-discount.aspx")
                    },
					{
                        add: "pid", text: 'Purchase Invoice Discount', editor: editor, action: () => window.open("invoice-discount.aspx")
                    },
					{
                        add: "icd", text: 'Item-Customer Discount', editor: editor, action: () => window.open("item-customer-discount.aspx")
                    },

					{
                        add: "sid", text: 'Sales Invoice Discount', editor: editor, action: () => window.open("invoice-customer-discount.aspx")
                    },
					{
                        add: "si", text: 'Substitute Items', editor: editor, action: () => window.open("substitute-item.aspx")
                    },
					{
                        add: "vendors", text: 'Vendors', editor: editor, action: () => window.open("vendor-item.aspx")
                    },
					{
                        add: "transactions", text: 'Transactions', editor: editor, action: () => window.open("item-transaction.aspx")
                    },
					
					{
                        add: "ohb", text: 'On Hand by', editor: editor, action: () => window.open("on-hand-stock.aspx")
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

