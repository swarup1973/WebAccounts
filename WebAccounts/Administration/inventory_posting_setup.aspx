<%@ Page Title="Inventory Posting Setup" Language="C#"
MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind=""
Inherits="WebAccounts.users" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
  <script
    type="text/javascript"
    src="../Scripts/jquery-3.5.0.min.js?0"
  ></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
  <div class="">

<div class="row">
			<div class="col">
					Administration
					>
					Setups
					>
					<a href="http://staging.rksoftwareinc.com/accounts/Administration/posting_setup.aspx" class="text-dark page_path_link">Posting Setup</a>
					>
					<a href="http://staging.rksoftwareinc.com/accounts/Administration/inventory_posting_group.aspx" class="text-dark page_path_link">Inventory Posting Group</a>
                    >
					<a href="http://staging.rksoftwareinc.com/accounts/Administration/inventory_posting_setup.aspx" class="text-dark page_path_link">Inventory Posting Setup</a>
			</div>
		</div>

    <div class="page-title">
      <div class="title_left">
        <!-- page title -->
        <h3>Inventory Posting Setup</h3>
      </div>
    </div>

    <div class="clearfix"></div>

    <!-- table card -->
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
                <table id="inventory_posting_setup_table"
                class="table table-striped table-hover table-condensed projects display datatable width-100"
                style="width: 100%;">
                  <thead><tr style="text-align:center;">
                      <th style="border-bottom:0"></th>
                      <th colspan="4" style="border-left:1px solid #ccc;">Sales</th>
                      <th colspan="4" style="border-left:1px solid #ccc;">Purchase</th>
                      <th colspan="5" style="border-left:1px solid #ccc;">Inventory</th>
                      <th colspan="4" style="border-left:1px solid #ccc;">Expected Cost &amp; Revenue</th>
                    </tr>
                    <tr>
                      <th style="border-top:0">Group</th>
                      <th>Sales A/C</th>
                      <th>Sales Return/Cr. Memo A/C</th>
                      <th>Sales Item Disc. A/C</th>
                      <th>Sales Invoice Disc. A/C</th>
					  
                      <th>Purchase A/C</th>
                      <th>Purch. Return/Cr. Memo</th>
                      <th>Purch. Item Disc. A/C</th>
                      <th>Purch. Invoice Disc. A/C</th>
                      
                      <th>Inventory AC</th>
                      <th>Inventory Profit &amp; Loss</th>
                      <th>Applied Cost of Purchase</th>
                      <th>Cost of Goods Sold</th>
                      <th>Inv. Purch. Varience AC</th>
                      
                      <th>Expected Cost of Purchase</th>
                      <th>Expected Liability for Purchase</th>
                      <th>Expected Receivable A/C</th>
                      <th>Expected COGS</th>
                    </tr>
                    </thead>
                  <tbody></tbody>
                </table>
                
                <div style="clear:both;"><button type="button" class="btn btn-primary">Save</button>
                <button type="button" class="btn btn-secondary">Cancel</button></div>
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
                    <h5 class="modal-title">New Entry</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Group</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control">
						</div>
					</div>
                    
                    <h5>Sales</h5>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Sales A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Sales Return/Cr. Memo A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Sales Item Disc. A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Sales Invoice Disc. A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    
                    <h5>Purchase</h5>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Purchase A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Purchase Return/Cr. Memo A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Purchase Item Disc. A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Purchase Invoice Disc. A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    
                    <h5>Inventory</h5>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Inventory AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Inventory Profit & Loss</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Applied Cost of Purchase</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Cost of Goods Sold</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Inv. Purch. Varience AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    
                    <h5>Expected Cost &amp; Revenue</h5>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Expected Cost of Purchase</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Expected Liability for Purchase</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Expected Receivable A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Expected COGS</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    
					<div class="modal-footer">
						<button type="button" class="btn btn-primary">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
						
					</div>
				</div>
				</form>
            </div>
        </div>
    </div>

	<!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Entry</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Group</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control">
						</div>
					</div>
                    
                    <h5>Sales</h5>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Sales A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Sales Return/Cr. Memo A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Sales Item Disc. A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Sales Invoice Disc. A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    
                    <h5>Purchase</h5>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Purchase A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Purchase Return/Cr. Memo A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Purchase Item Disc. A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Purchase Invoice Disc. A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    
                    <h5>Inventory</h5>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Inventory AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Inventory Profit & Loss</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Applied Cost of Purchase</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Cost of Goods Sold</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Inv. Purch. Varience AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    
                    <h5>Expected Cost &amp; Revenue</h5>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Expected Cost of Purchase</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Expected Liability for Purchase</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Expected Receivable A/C</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Expected COGS</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    
					<div class="modal-footer">
						<button type="button" class="btn btn-primary">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
						
					</div>
				</div>
				</form>
        	</div>
    	</div>
	</div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
  <script type="text/javascript">
    // test data
    const dataSet = [1,2,3,4,5].map(idx => {
     const linkedValue = (idx % 1 === 0 ? true : false);
      const groupValue = String(idx) + String(idx) + String(idx) + String(idx);
	   const sales_acValue =123456;
	   const sales_returnValue =678901;
	   const sales_itemValue =246802;
	   const sales_invoiceValue =135791;
	   
	   const purchase_acValue =258963;
	   const purchase_returnValue =258963;
	   const purchase_itemValue =123456;
		const purchase_invoiceValue =123456;
		
		const in_acValue =123456;
		const in_profitValue =123456;;
		const in_costValue =123456;
		const in_soldValue =123456;
		const in_purchValue =123456;
		
		const ex_costValue =123456;
		const ex_liabilityValue =123456;
		const ex_acValue =123456;
		const ex_cogsValue =123456;
      return ({
        //id: idx,
group: groupValue,
sales_ac: sales_acValue,
sales_return: sales_returnValue,
sales_item: sales_itemValue,
sales_invoice: sales_invoiceValue,

purchase_ac:purchase_acValue,
purchase_return:purchase_returnValue,
purchase_item:purchase_itemValue,
purchase_invoice:purchase_invoiceValue,

in_ac:in_acValue,
in_profit:in_profitValue,
in_cost:in_costValue,
in_sold:in_soldValue,
in_purch:in_purchValue,

ex_cost:ex_costValue,
ex_liability:ex_liabilityValue,
ex_ac:ex_acValue,
ex_cogs:ex_cogsValue,
		
      })
    })

    $(document).ready(function() {
      let editor = new $.fn.dataTable.Editor({
        //table: '#inventory_posting_setup_table',
        //idSrc: 'id',
      })

      $('#inventory_posting_setup_table').dataTable({
        data: dataSet,
        dom: "Blfrtip",
        select: true,
        scrollX: true,
        lengthMenu: [5,10,25,50,100],
        buttons: [
			{
			add: "create", text: 'New', editor: editor, action: () => showmodal()
			},
			{
			add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
			},
			{
			extend: "remove", editor: editor
			},
        ],
        columns: [
        {title: 'Group', data: 'group'},
        {title: 'Sales A/C', data: 'sales_ac'},
		{title: 'Sales Return/Cr. Memo A/C', data: 'sales_return'},
		{title: 'Sales Item Disc. A/C', data: 'sales_item'},
		{title: 'Sales Invoice Disc. A/C', data: 'sales_invoice'},
		
		{title: 'Purchase A/C', data: 'purchase_ac'},
		{title: 'Purchase Return/Cr. Memo A/C', data: 'purchase_return'},
		{title: 'Purchase Item Disc. A/C', data: 'purchase_item'},
		{title: 'Purchase Invoice Disc. A/C', data: 'purchase_invoice'},
		
		{title: 'Inventory AC', data: 'in_ac'},
		{title: 'Inventory Profit & Loss', data: 'in_profit'},
		{title: 'Applied Cost of Purchase', data: 'in_cost'},
		{title: 'Cost of Goods Sold', data: 'in_sold'},
		{title: 'Inv. Purch. Varience AC', data: 'in_purch'},
		
		{title: 'Expected Cost of Purchase', data: 'ex_cost'},
		{title: 'Expected Liability for Purchase', data: 'ex_liability'},
		{title: 'Expected Receivable A/C', data: 'ex_ac'},
		{title: 'Expected COGS', data: 'ex_cogs'},
        ]
      })
    })
	  var showmodal = function () {
            $("#myModal").modal('show');
        };

		var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
  </script>
</asp:Content>