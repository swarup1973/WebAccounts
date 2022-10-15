<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="currency.aspx.cs" Inherits="WebAccounts.currency" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
	<script type="text/javascript" src="JS/currency.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

        <div class="row">
            <div class="col">
                <p>
                   General Ledger
					>
					Setup
					>
                    <strong>Currency</strong>
                </p>
            </div>
        </div>


        <div class="clearfix"></div>
		

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                <table id="currency_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" 
									style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                              <th>Description</th>
                                              <th>Start Date</th>
                                              <th>Exchange Rate</th>
                                              <th>Exchange Rate per</th>
                                              <th>Realized Gains AC</th>
                                              <th>Realized Losses AC</th>
                                              <th>Unrealized Gains AC</th>
                                              <th>Unrealized Losses AC</th>
                                              <th>Conversion RO A/C (Debit)</th>
                                              <th>Conversion RO A/C (Credit)</th>
                                              <th>Currency unit Decimal Places</th>
                                              <th>Unit-Amount Rounding Precision</th>
                                              <th>Rounding Type</th>
                                              <th>Total Amount Rounfing Precision</th>
                                              <th>Total Rounding off to</th>
                                              <th>Last Date Modified</th>
                                        </tr>
                                    </thead>
                                       <tbody></tbody>
                                </table>
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>



<!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Currency - New</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
               		 <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Code:</label>
						</div>
						<div class="col-sm-3">
							<input type="text" id="txt_currcd" class="form-control" required>
						</div>
						<div class="col-sm-3">
							<label for="input">Description:</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control"  id="txt_currdesc" required>
						</div>
						<div class="col-sm-3">
							<label for="input">Realized Gains AC:</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control" id="cbo_ralizegainac">
								
							</select>
						</div>
						<div class="col-sm-3">
							<label for="input">Realized Losses AC:</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control"  id="cbo_realizelossac">
								
							</select>
						</div>  
						<div class="col-sm-3">
							<label for="input">Unrealized Gains AC:</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control"  id="cbo_unrealizegainac">
								
							</select>
						</div>
						<div class="col-sm-3">
							<label for="input">Unrealized Losses AC:</label>
						</div>
						<div class="col-sm-3">
							 <select class="form-control"  id="cbo_unrealizelossac">
								
							</select>
						</div>
						<div class="col-sm-3">
							<label for="input">Conversion RO A/C (Debit):</label>
						</div>
                        <div class="col-sm-3">
							 <select class="form-control"  id="cbo_convroacdr">
								
							</select>
						</div>
						<div class="col-sm-3">
							<label for="input">Conversion RO A/C (Credit):</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control"  id="cbo_convroaccr">
								
							</select>
						</div>
						<div class="col-sm-3">
							<label for="input">Currency unit Decimal Places:</label>
						</div>
						<div class="col-sm-3">
							 <input type="number"   id="txt_currunitdecplace" min="0" step="1" class="form-control  currency_unit_decimal_places_input" name="currency_unit_decimal_places_input" onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                      title="Numbers only" />
						</div>
						<div class="col-sm-3">
							<label for="input">Unit-Amount Rounding Precision:</label>
						</div>
						<div class="col-sm-3">
							 <input type="text" autocomplete="off" onkeypress="return isNumberKey( event,this);"  id="txt_unitamtroprecision" class="form-control  currency_unit_decimal_places_input" name="currency_unit_decimal_places_input" 
                      title="Numbers only" />
						</div>
						<div class="col-sm-3">
							<label for="input">Rounding Type:</label>
						</div>
						<div class="col-sm-3">
							 <select class="form-control"  id="cbo_rotype">
                                      <option value="N">Nearest</option>
                                      <option value="U">Up</option>
                                      <option value="D">Down</option>
                      </select>
						</div>
						<div class="col-sm-3">
							<label for="input">Total Amount Rounfing Precision:</label>
						</div>
						<div class="col-sm-3">
							 <input autocomplete="off" onkeypress="return isNumberKey(event,this);" id="txt_totalroprecision"  class="form-control  currency_unit_decimal_places_input" name="currency_unit_decimal_places_input" onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                      title="Numbers only" />
						</div>
						<div class="col-sm-3">
							<label for="input">Total Rounding off to:</label>
						</div>
						<div class="col-sm-3">
							 <select class="form-control"  id="cbo_totalroto">
                                     <option value="N">Nearest</option>
                                      <option value="U">Up</option>
                                      <option value="D">Down</option>
                      </select>
						</div>
					</div>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="saveacurr();">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>
        </div>
    </div>
   
<!-- Modal HTML EDIT -->
    

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
	<link href="generalledger.css" rel="stylesheet" />
    <script type="text/javascript">
     
        function isNumberKey(evt, element) {
           // var n = Number(txt.value).toFixed(6);
            var charCode = (evt.which) ? evt.which : event.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode == 46 || charCode == 8))
                return false;
            else {
                var len = $(element).val().length;
                var index = $(element).val().indexOf('.');
                if (index > 0 && charCode == 46) {
                    return false;
                }
                if (index > 0) {
                    var CharAfterdot = (len + 1) - index;
                    if (CharAfterdot > 3) {
                        return false;
                    }
                }

            }
            return true;
        }
    </script>
</asp:Content>

