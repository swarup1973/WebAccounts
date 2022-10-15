<%@ Page Title="General Journal Line Item Edit" Language="C#"
MasterPageFile="~/master/base.Master" AutoEventWireup="true"
CodeBehind=""
Inherits="WebAccounts.chartofacct" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
  <%-- javascript and header --%>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
  <%-- toolbar --%>
	
		<div class="row">
        <div class="col">
            <nav class="card navbar navbar-expand-lg navbar-light bg-light">
                <div class="col nav navbar-nav">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item"><a href="#" class="nav-link">New</a>
                        </li>
						<li class="nav-item"><a href="#" class="nav-link">Edit</a>
                        </li>
						<li class="nav-item"><a href="#" class="nav-link">Delete</a>
                        </li>
						<li class="nav-item"><a href="apply_entry.aspx" class="nav-link">Apply Entry</a>
                        </li>
						<li class="nav-item"><a href="#" class="nav-link">Suggest Payment</a>
                        </li>
						<li class="nav-item"><a href="#" class="nav-link">Reverse Transaction</a>
                        </li>
						<li class="nav-item"><a href="#" class="nav-link">Post</a>
                        </li>
						<li class="nav-item"><a href="#" class="nav-link">Preview</a>
                        </li>
						<li class="nav-item"><a href="#" class="nav-link">View/Print</a>
                        </li>
						<li class="nav-item"><a href="#" class="nav-link">Save as Standard Journal</a>
                        </li>
						<li class="nav-item"><a href="#" class="nav-link">Get Standard Journal</a>
                        </li>
						<li class="nav-item"><a href="#" class="nav-link">Set Dimension</a>
                        </li>
						<li class="nav-item"><a href="#" class="nav-link">Tax Payment Journal</a>
                        </li>
						<li class="nav-item"><a href="#" class="nav-link">Tax Journal (Direct Update)</a>
                        </li>
						<li class="nav-item"><a href="#" class="nav-link">View Tax Calculation</a>
                        </li>
						<li class="nav-item"><a href="#" class="nav-link">Print Cheque</a>
                        </li>

               	  </ul>
           	  </div>
       	  </nav>
       </div>
  </div>
	

	<%-- body --%>
	<div class="row">
          <div class="col">
            <div class="x_panel">
              <div class="x_title">
				<h2>General Journal Line</h2>
				<p>                
                <div class="clearfix"></div>
              </div>
			  <div class="x_content" style="overflow-x:auto;">
				Batch:
				<input
					type="text"
					placeholder="Batch name here..."
					readonly
				/>
				</p>
				<p class="text-left"><span style="color:red;">*</span> indicates a required field.</p>
                <!-- start Accounts list -->
                <table
                  id="coa_accounts_table"
                  class="table table-bordered table-hover table-condensed projects"
                >
                  <tr class="genjournal_line_row">
                    <th class="genjournal_line_th">Document Date<span style="color:red;">*</span></th>
					<th class="genjournal_line_th">Voucher No</th>
					<th class="genjournal_line_th">Document Type<span style="color:red;">*</span></th>
                    <th class="genjournal_line_th">A/C Type<span style="color:red;">*</span></th>
                    <th class="genjournal_line_th">A/C No<span style="color:red;">*</span></th>
                    <th class="genjournal_line_th">A/C Description</th>
                    <th class="genjournal_line_th">Debit<span style="color:red;">*</span></th>
					<th class="genjournal_line_th">Credit<span style="color:red;">*</span></th>
					<th class="genjournal_line_th">Amount in LCY</th>
                    <th class="genjournal_line_th">Credit A/C Type<span style="color:red;">*</span></th>
                    <th class="genjournal_line_th">Credit A/C No<span style="color:red;">*</span></th>
					<th class="genjournal_line_th">Credit A/C Description</th>
					  <th class="genjournal_line_th">Discount %</th>
					  <th class="genjournal_line_th">Discount Amount</th>
					<th class="genjournal_line_th">Transaction Currency Code</th>
					<th class="genjournal_line_th">Payment Term</th>
					<th class="genjournal_line_th">Payment Method</th>
					<th class="genjournal_line_th">Narration/Comment</th>
					<th class="genjournal_line_th">Creation Date</th>
                    <th class="genjournal_line_th">Posting Date</th>
                    <th class="genjournal_line_th">Branch<span style="color:red;">*</span></th>
					<th class="genjournal_line_th">Department<span style="color:red;">*</span></th>
                    <th class="genjournal_line_th">Dimension<span style="color:red;">*</span></th>
                    <th class="genjournal_line_th">WH Tax Group</th>
                    <th class="genjournal_line_th">WH Tax %</th>
                    <th class="genjournal_line_th">Sales Tax Group</th>
                    <th class="genjournal_line_th">Sales Tax %</th>
					<th class="genjournal_line_th">Posted</th>
                  </tr>
                  <tr class="">
                    <td class="">
						<input type="date" class="form-control" name="gj_line_tablediv_0" />
					</td>
					<td class="">
						<input
							type="text"
							name="gj_line_tablediv_1"
							class="form-control"
							readonly
						>
					</td>
					<td class="">
						<select class="form-control" name="gj_line_tablediv_2">
							<option>--</option>
						</select>
					</td>
					<td class="">
						<select class="form-control" name="gj_line_tablediv_3">
							<!-- document type -->
							<option>GL Voucher</option>
							<option>Invoice</option>
							<option>Payment</option>
							<option>Collection</option>
							<option>Dr/Cr Memo</option>
						</select>
					</td>
					<td class="">
						<select class="form-control" name="gj_line_tablediv_4">
							<option>GL</option>
							<option>Bank</option>
							<option>Vendor</option>
							<option>Customer</option>
						</select>
					</td>
					<td class="">
						<input
							type="text"
							name="gj_line_tablediv_5"
							class="form-control"
							readonly
						>
					</td>
					<td class="">
						<input
							type="number"
							name="gj_line_tablediv_6"
							class="form-control"
						>
					</td>
					<td class="">
						<input
							type="number"
							name="gj_line_tablediv_7"
							class="form-control"
						>
					</td>
					<td class="">
						<input
							type="number"
							name="gj_line_tablediv_8"
							class="form-control"
							readonly
						>
					</td>
					<td class="">
						<select class="form-control" name="gj_line_tablediv_9">
							<option>--</option>
						</select>
					</td>
					<td class="">
						<select class="form-control" name="gj_line_tablediv_10">
							<!-- credit account type -->
							<option>GL</option>
							<option>Bank</option>
							<option>Vendor</option>
							<option>Customer</option>
						</select>
					</td>
					<td class="">
						<input
							type="number"
							name="gj_line_tablediv_11"
							class="form-control"
							readonly
						>
					</td>
					  <td class="">
						<input
							type="number"
							name="gj_line_tablediv_11"
							class="form-control"
							readonly
						>
					</td>
					  <td class="">
						<input
							type="number"
							name="gj_line_tablediv_11"
							class="form-control"
							readonly
						>
					</td>
					  					  
					<td class="">
						<select class="form-control" name="gj_line_tablediv_12">
							<option>--</option>
						</select>
					</td>
					<td class="">
						<select class="form-control" name="gj_line_tablediv_13">
							<option>--</option>
						</select>
					</td>
					<td class="">
						<select class="form-control" name="gj_line_tablediv_14">
							<option>--</option>
						</select>
					</td>
					<td class="">
						<input type="text" class="form-control" name="gj_line_tablediv_15"/>
					</td>
					<td class="">
						<input
							type="date"
							name="gj_line_tablediv_16"
							class="form-control"
							readonly
						>
					</td>
					<td class="">
						<input
							type="date"
							name="gj_line_tablediv_17"
							class="form-control"
							readonly
						>
					</td>
					<td class="">
						<select class="form-control" name="gj_line_tablediv_18">
							<option>--</option>
						</select>
					</td>
					<td class="">
						<select class="form-control" name="gj_line_tablediv_19">
							<option>--</option>
						</select>
					</td>
					<td class="">
						<select class="form-control" name="gj_line_tablediv_20">
							<option>--</option>
						</select>
					</td>
					<td class="">
						<select class="form-control" name="gj_line_tablediv_21">
							<option>--</option>
						</select>
					</td>
					<td class="">
						<select class="form-control" name="gj_line_tablediv_22">
							<option>--</option>
						</select>
					</td>
					<td class="">
						<select class="form-control" name="gj_line_tablediv_23">
							<option>--</option>
						</select>
					</td>
					<td class="">
						<select class="form-control" name="gj_line_tablediv_24">
							<option>--</option>
						</select>
					</td>
					<td class="">
						<span><i class="fa fa-check" aria-hidden="true" style="font-size: 1.7rem;"></i></span>
					</td>
                  </tr>
                </table>
                <!-- end Accounts list -->
              </div>
            </div>
          </div>
        </div>
	<%-- footer  --%>
	
	
	
	<div class="row">
          <div class="col">
            <div class="x_panel">
				<div class="">
					
					<div class="col-md-12">
                    <div class="form-group">
                      <label class="col-md-1">
                        Debit Amount
                      </label>
                      <div class="col-md-3">
                        <input type="number" class="form-control"
						placeholder=""
						readonly
						>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="col-md-1">
                        Credit Amount
                      </label>
                      <div class="col-md-3">
                        <input type="number" class="form-control"
						placeholder=""
						readonly
						>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="col-md-1">
                        Withholding Tax
                      </label>
                      <div class="col-md-3">
                        <input type="number" class="form-control"
						placeholder=""
						readonly
						>
                      </div>
                    </div>
					</div>

					<div class="col-md-12">
                    <div class="form-group">
                      <label class="col-md-1">
                        Sales Tax
                      </label>
                      <div class="col-md-3">
                        <input type="number" class="form-control"
						placeholder=""
						readonly
						>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="col-md-1">
                        Local Currency
                      </label>
                      <div class="col-md-3">
                        <input type="text" class="form-control"
						placeholder=""
						readonly
						>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="col-md-1">
                        Check No
                      </label>
                      <div class="col-md-3">
                        <select class="form-control">
							<option>--</option>
						</select>
                      </div>
                    </div>
					</div>

					<div class="col-md-12">
                    <div class="form-group">
                      <label class="col-md-1">
                         Print Name
                      </label>
                      <div class="col-md-3">
                        <input 
						type="text" class="form-control"
						placeholder="Text..."
						>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="col-md-1">
                        Print Status
                      </label>
                      <div class="col-md-3">
                        <input
							type="text" class="form-control"
							placeholder="Status..."
							Readonly
						>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="col-md-1">
                        Re-Use
                      </label>
                      <div class="col-md-3">
                        <input type="checkbox"
							checked
						>
                      </div>
                    </div>
					</div>

					<div class="col-md-12">
						<div class="form-group">
							<label class="col-md-1">
								Applied
							  </label>
							  <div class="col-md-3">
								<input type="checkbox"
									checked
								>
							  </div>
						</div>

						<div class="form-group">
						  <label class="col-md-1">
							Applied Doc No
						  </label>
						  <div class="col-md-3">
							<input 
								type="text" class="form-control"
								readonly
							/>
						  </div>
						</div>

						<div class="form-group">
						  <label class="col-md-1">
							Bank Account No
						  </label>
						  <div class="col-md-3">
							<select class="form-control">
								<option>--</option>
							</select>
						  </div>
						</div>
					</div>
					
					  </div>
				</div>
			</div>
		</div>


	<!-- Modals -->	
	<div id="myModal1" class="modal fade" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">Save Standard Journal</h4>
				</div>
				<div class="modal-body">
					<p class="text-left"><span style="color:red;">*</span> indicates a required field.</p>
					<table
                  class="table table-condensed"
                >
                  <tr class="genjournal_line_modal_tr">
                    <th class="">Name<span style="color:red;">*</span></th>
                    <th class="">Description</th>
						</tr>
						<tr class="">
                    <td class="">
						<input
							type="text"
							name=""
							placeholder="Title..."
							class="form-control"
						>
					</td>
                    <td class="">
                      <input
						type="text"
						name=""
						placeholder="Item Description..."
						class="form-control"
					>
                    </td>
						</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
					<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
				</div>
			</div>
		</div>
	</div>

	<div id="myModal2" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">Retrieve Standard Journal</h4>
				</div>
				<div class="modal-body">
					<div class="modal-table-container container">
						<p class="text-left"><span style="color:red;">*</span> indicates a required field.</p>
						<table class="table table-hover table-bordered table-condensed table-striped">
							<tr class="genjournal_line_modal_tr">
								<th class="">Name</th>
								<th class="">Description</th>
								<th class="">Select<span style="color:red;">*</span></th>
								<th class="">Select Document Date</th>
							</tr>
							<tr class="">
								<td class="">
									Item Name
								</td>
								<td class="">
									Item Description
								</td>
								<td class="">
									<input type="checkbox" name="">
								</td>
								<td class="">
									<input
										type="date"
									/>
								</td>
						</table>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal">Retrieve</button>
					<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
				</div>
			</div>

		</div>
	</div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
  <script src=""></script>
</asp:Content>
