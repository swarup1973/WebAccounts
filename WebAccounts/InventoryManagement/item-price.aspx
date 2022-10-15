<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="item-price.aspx.cs" Inherits="WebAccounts.InventoryManagement.item_price" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Item Price - Inventory Management</title>
	 <script type="text/javascript" src="js/itemPrice.js"></script>
    <link href="administration.css" rel="stylesheet" />
	 <style>
        .dataTables_wrapper {
            margin-top : 10px;
        }
        .dataTables_filter {
            margin-top : 10px;
        }
        .dataTables_length{
            margin-top : 40px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">
		<form runat="server">
             <asp:HiddenField ID="txt" runat="server" ClientIDMode="Static" value="-1"></asp:HiddenField>
        </form>
      


        <div class="clearfix"></div>
		

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                    			<strong>Item : </strong><select id="ddProcItem" onchange="populateGridData();"></select>
						<br />
                                <!-- start role table -->
                                <table id="item_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>Price Type</th>
                                            <th>Variant Code</th>
                                            <th>Location Code</th>
                                            <%--<th>Currency</th>--%>
                                            <th>Unit of Measurement</th>
                                            <th>Minimum Qty.</th>
                                            <th>Maximum Qty.</th>
                                            <th>Price/Unit</th>
                                            <th>Discount %</th>
                                            <th>Discount Amount / Unit</th>
                                            <th>Starting Date</th>
                                            <th>Ending Date</th>
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
    <div class="modal fade" id="myModal"  data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Item Price - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-12">
						<strong>Item Code : </strong><span id="itemcode"></span>
                                <strong>Item Description : </strong> <span id="itemdes"></span>
						</div>
					</div>
					
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Price Type</label>
							<span class="requ">(*)</span>
						</div>
						<div class="col-sm-6">
							<select id="ddPriceType">
							<option value="-1">--Select--</option>
						    <option value="PP">1. Purchase Price</option>
						    <option value="SP">2. Sale Price</option>
					      </select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Variant Code</label>
							
						</div>
						<div class="col-sm-6">
							<select id="ddVariantCode">
						   
					      </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Location Code</label>
						</div>
						<div class="col-sm-6">
						  <select id="ddLocation">
						   
					      </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Currency</label>
						</div>
						<div class="col-sm-6">
							
							<input type="text" class="form-control" id="ddCurrency" disabled>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Unit of Measurement</label>
							<span class="requ">(*)</span>
						</div>
						<div class="col-sm-6">
							<select id="dduom">
						   
							</select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Minimum Qty.</label>
						</div>
						<div class="col-sm-6">
							<input type="number" class="form-control" id="minqty">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Maximum Qty.</label>
						</div>
						<div class="col-sm-6">
							<input type="number" class="form-control" id="maxqty">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Price/Unit</label>
							<span class="requ">(*)</span>
						</div>
						<div class="col-sm-6">
							<input type="number" class="form-control" id="price">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Discount %</label>
						</div>
						<div class="col-sm-6">
							<input type="number" class="form-control" id="discountpercent">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Discount Amount / Unit</label>
						</div>
						<div class="col-sm-6">
							<input type="number" class="form-control" id="discountamount">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Starting Date</label>
							<span class="requ">(*)</span>
						</div>
						<div class="col-sm-6">
							<%--<input type="date" class="form-control" >--%>
								 <input type="text" class="date-picker form-control col-md-7 col-xs-12" id="startdate">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Ending Date</label>
						</div>
						<div class="col-sm-6">
							<%--<input type="date" class="form-control" >--%>
							<input type="text" class="date-picker form-control col-md-7 col-xs-12" id="enddate">
						</div>
					</div>
                </div>
                <div class="modal-footer">
                     <button type="button" class="btn btn-primary" onclick="savedata();" id="btnSave">Save</button>
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
 
		$(document).ready(function () {
            var start = moment().add(1, 'days');
            //alert(start);
            $('#startdate').daterangepicker({
                locale: {
                    //format: 'DD-MMM-YYYY'
                },
               // startDate: start,
                autoUpdateInput: false,
                showDropdowns: true,
                singleDatePicker: true,
				calender_style: "picker_4",
                drops: "up"
                //minDate: start//new Date()
            }, function (start, end, label) {
                console.log(start.toISOString(), end.toISOString(), label);
			});
            $('#startdate').on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('DD-MMM-YYYY'));
			});

            $('#enddate').daterangepicker({
                locale: {
                    //format: 'DD-MMM-YYYY'
                },
                // startDate: start,
                autoUpdateInput: false,
                showDropdowns: true,
                singleDatePicker: true,
                calender_style: "picker_4",
                drops: "up"
                //minDate: start//new Date()
            }, function (start, end, label) {
                console.log(start.toISOString(), end.toISOString(), label);
			});

            $('#enddate').on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('DD-MMM-YYYY'));
            });



          
        })

        var showmodal = function () {
            $("#myModal").modal('show');
        };
		
	
		
		
    </script>
</asp:Content>

