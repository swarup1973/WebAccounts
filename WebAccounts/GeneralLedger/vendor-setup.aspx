<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="WebAccounts.roles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

        <div class="row">
            <div class="col">
                <p>
                   General Ledger
					>
					Master
					>
					<strong>Vendor Setup</strong>

                </p>
            </div>
        </div>


        <div class="clearfix"></div>
		

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                				<table id="budget_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>General</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Code</strong></td>
                                            <td>View from Overview. Modify-false</td>
                                            <td><strong>Balance</strong></td>
                                            <td>view and non editable</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Name</strong></td>
                                            <td>View from Overview. Modify-false</td>
                                            <td><strong>Balance LCY</strong></td>
                                            <td>view and non editable</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Search Name</strong></td>
                                            <td>View from Overview. Modify-false</td>
                                            <td><strong>Branch Applicable</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Credit Limit</strong></td>
                                            <td>123456</td>
                                            <td><strong>Entity Type</strong></td>
                                            <td><select>
                                                <option>Company</option>
                                                <option>Person</option>
                                            </select></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Vendor Posting Group</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                            <td><strong>Person Responsible</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Foreign Vendor?</strong></td>
                                            <td><input type="checkbox" /></td>
                                            <td><strong>Block</strong></td>
                                            <td><select>
                                                <option>No</option>
                                                <option>Invoice</option>
                                                <option>All</option>
                                            </select></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Currency</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                            <td><strong>Last Transaction Date</strong></td>
                                            <td>05/28/2021</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td><strong>Credit Rating</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                      </tbody>
                                      <thead>
                                      	<tr>
                                            <th>Contacts</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Address-1</strong></td>
                                            <td><input type="text" /></td>
                                            <td><strong>Phone No</strong></td>
                                            <td>+001 7181234567</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Address-2</strong></td>
                                            <td><input type="text" /></td>
                                            <td><strong>Alternate No</strong></td>
                                            <td>+001 7181234567</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Pin</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                            <td><strong>Fax No</strong></td>
                                            <td>+001 7181234567</td>
                                        </tr>
                                        <tr>
                                            <td><strong>City</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                            <td><strong>Contact Person</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Country</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                            <td><strong>Email</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>County</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                            <td><strong>Website</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                      	<tr>
                                            <th>Invoice &amp; Payment</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Payment %</strong></td>
                                            <td><input type="text" /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Payment Term</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                            <td><strong>Bank Account (Default)</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Payment Mothod</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                            <td><strong>Print Name on Check</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Price Includes Sales Tax?</strong></td>
                                            <td><input type="checkbox" /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                      	<tr>
                                            <th>Receiving</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Shipment Method</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Lead Time in days</strong></td>
                                            <td><input type="text" /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                     </tbody>
                                     <thead>
                                      	<tr>
                                            <th>Tax</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Tax ID/AC No.</strong></td>
                                            <td><input type="text" /></td>
                                            <td><strong>Witholding Tax</strong></td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>1099 Eligible?</strong></td>
                                            <td><input type="checkbox" /></td>
                                            <td><strong>Witholding Tax Group</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Nature of Business</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                            <td><strong>Tax Exemption No</strong></td>
                                            <td><input type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>GST Registration No.</strong></td>
                                            <td><input type="text" /></td>
                                            <td><strong>Sels Tax Group</strong></td>
                                            <td><select>
                                                <option>--Selection--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                                <option>--</option>
                                            </select></td>
                                        </tr>
                                     </tbody>     
                                </table>
                                <!-- end General table -->               

                    </div>
                </div>
            </div>
        </div>
    </div>


<!-- Modal HTML VIEW -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Vendor Setup - Edit</h5>
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
							Code
						</div>
						<div class="col-sm-3">
							<input type="text" value="12345" />
						</div>
						<div class="col-sm-3">
							Balance
						</div>
						<div class="col-sm-3">
							<input type="text" value="$12345" />
						</div>
						<div class="col-sm-3">
							Name
						</div>
						<div class="col-sm-3">
							<input type="text" value="Name" />
						</div>
						<div class="col-sm-3">
							Balance LCY
						</div>
						<div class="col-sm-3">
							<input type="text" value="12345" />
						</div>
						<div class="col-sm-3">
							Search Name
						</div>
						<div class="col-sm-3">
							<input type="text" value="name" />
						</div>
						<div class="col-sm-3">
							Branch Applicable
						</div>
						<div class="col-sm-3">
							<select>
                                <option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							Credit Limit
						</div>
						<div class="col-sm-3">
							<input type="text" value="$12345" />
						</div>
						<div class="col-sm-3">
							Entity Type
						</div>
						<div class="col-sm-3">
							<select>
                                <option>Company</option>
                                <option>Person</option>
                            </select>
						</div>
						<div class="col-sm-3">
							Vendor Posting Group
						</div>
						<div class="col-sm-3">
							<select>
                                <option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							Person Responsible
						</div>
						<div class="col-sm-3">
							<select>
                                <option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							Foreign Vendor?
						</div>
						<div class="col-sm-3">
							<input type="checkbox" />
						</div>
						<div class="col-sm-3">
							Block
						</div>
						<div class="col-sm-3">
							<select>
                                <option>No</option>
                                <option>Invoice</option>
                                <option>Yes</option>
                            </select>
						</div>
						<div class="col-sm-3">
							Currency
						</div>
						<div class="col-sm-3">
							<select>
                                <option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							Last Transaction Date
						</div>
						<div class="col-sm-3">
							<input type="date" />
						</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
						<div class="col-sm-3">
							Credit Rating
						</div>
						<div class="col-sm-3">
							<input type="text" value="Good" />
						</div>
					</div>
                                    
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Contacts</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							Address-1
						</div>
						<div class="col-sm-3">
							<input type="text" value="???" />
						</div>
                        <div class="col-sm-3">
							Phone No
						</div>
						<div class="col-sm-3">
							<input type="text" value="+001 123456789" />
						</div>
                        <div class="col-sm-3">
							Address-2
						</div>
                        <div class="col-sm-3">
							<input type="text" value="???" />
						</div>
						<div class="col-sm-3">
							Alternate No
						</div>
						<div class="col-sm-3">
							<input type="text" value="+001 123456789" />
						</div>
						<div class="col-sm-3">
							Pin
						</div>
						<div class="col-sm-3">
							<select>
                                <option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							Fax No
						</div>
						<div class="col-sm-3">
							<input type="text" value="+001 123456789" />
						</div>
						<div class="col-sm-3">
							City
						</div>
						<div class="col-sm-3">
							<select>
                                <option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							Contact Person
						</div>
						<div class="col-sm-3">
                        	<input type="text" value="Joe John" />
						</div>
						<div class="col-sm-3">
							Country
						</div>
						<div class="col-sm-3">
							<select>
                                <option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							Email
						</div>
						<div class="col-sm-3">
							<input type="text" value="email@example.com" />
						</div>
						<div class="col-sm-3">
							County
						</div>
						<div class="col-sm-3">
							<select>
                                <option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
						<div class="col-sm-3">
							Website
						</div>
						<div class="col-sm-3">
							<input type="text" value="www.website.com" />
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-12">
							<strong>Invoice &amp; Payment</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							Prepayment %
						</div>
						<div class="col-sm-3">
							<input type="text" value="8%" />
						</div>
                        <div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
							Payment Term
						</div>
						<div class="col-sm-3">
							<select>
                                <option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
                        <div class="col-sm-3">
							Bank Account (Default) 
						</div>
						<div class="col-sm-3">
							<select>
                                <option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
                        <div class="col-sm-3">
							Payment Mothod 
						</div>
						<div class="col-sm-3">
							<select>
                                <option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
                        <div class="col-sm-3">
							Print Name on Check
						</div>
						<div class="col-sm-3">
							<input type="text" value="Name On Check" />
						</div>
                        <div class="col-sm-3">
							Price Includes Sales Tax?
						</div>
						<div class="col-sm-3">
							<input type="checkbox" checked="checked" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Receiving</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							Shipment Method
						</div>
                        <div class="col-sm-3">
							<select>
                                <option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
                        <div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
							Lead Time in days
						</div>
                        <div class="col-sm-3">
							<input type="text" value="30 days" />
						</div>
                        <div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Tax</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							Tax ID/AC No.
						</div>
                        <div class="col-sm-3">
							<input type="text" value="3235468" />
						</div>
                        <div class="col-sm-3">
                        	Witholding Tax
						</div>
                        <div class="col-sm-3">
                        	<input type="checkbox" />
						</div>
                        <div class="col-sm-3">
							1099 Eligible ?
						</div>
                        <div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-3">
                        	Witholding Tax Group
						</div>
                        <div class="col-sm-3">
                        	<select>
                                <option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
                        <div class="col-sm-3">
                        	Nature of Business
						</div>
                        <div class="col-sm-3">
                        	<select>
                                <option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
						</div>
                        <div class="col-sm-3">
                        	Tax Exemption No
						</div>
                        <div class="col-sm-3">
                        	<input type="text" value="123456" />
						</div>
                        <div class="col-sm-3">
                        	GST Registration No.
						</div>
                        <div class="col-sm-3">
                        	<input type="text" value="32456789" />
						</div>
                        <div class="col-sm-3">
                        	Sels Tax Group
						</div>
                        <div class="col-sm-3">
                        	<select>
                                <option>--Selection--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>
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

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
        let editor; // use a global for the submit and return data rendering in the examples
 
        $(document).ready(function() {
            editor = new $.fn.dataTable.Editor( {
                table: "#budget_table",} );
            $('#budget_table').DataTable( {
                dom: "Bfrtip",
				"bPaginate": false,
				"bLengthChange": false,
                select: false,
				"bFilter": false,
        		"bInfo": false,
				"ordering": false,
                buttons: [

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
                        add: "transaction", text: 'Transaction', editor: editor, action: () => window.open("vendor-transaction.aspx")
                    },
					{
                        add: "reminder", text: 'Send Reminder', editor: editor, action: () => window.open("#")
                    },
					{
                        add: "dimension", text: 'Dimension', editor: editor, action: () => window.open("vendor-dimension.aspx")
                    },
					{
                        add: "bankac", text: 'Vendor Bank AC', editor: editor, action: () => window.open("vendor-bank-ac.aspx"),
					},
					{
                        add: "price", text: 'Item-Vendor-Price', editor: editor, action: () => window.open("item-vendor-price.aspx")
                    },
					{
                        add: "Discount", text: 'Item-Vendor-Discount', editor: editor, action: () => window.open("item-vendor-discount.aspx")
					},
					{
                        add: "invoicediscount", text: 'Invoice Discount', editor: editor, action: () => window.open("invoice-discount.aspx")
					}
                ],
         
            })
        })

		var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
		
		
		
    </script>
</asp:Content>

