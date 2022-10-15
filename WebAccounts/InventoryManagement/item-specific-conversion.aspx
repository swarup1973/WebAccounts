<%@ Page Language="C#" MasterPageFile="~/master/base.Master"  AutoEventWireup="true" CodeBehind="item-specific-conversion.aspx.cs" Inherits="WebAccounts.InventoryManagement.item_specific_conversion" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/ItemConversion.js"></script>
     <style>
        
        .dataTables_filter {
            margin-top : 20px;
        }
        .dataTables_length{
            margin-top : 40px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

      
        <div class="clearfix"></div>
        
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                     <!-- start role table -->
                                <div class="clearfix"></div>
                                <table id="item_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                    <tr>
                                    <th>Item No</th>
                                    <th>From Unit</th>
                                    <th>Equals to</th>
                                    <th>To Unit</th>
                                    <th>Factor</th>
                                    <th>Rounding to</th>
                                    <th>Block</th>
                                    </tr>
                                    </thead>
                                     <tbody>
                                          <%--<tr>
                                          	<td>123</td>
                                            <td>Box</td>
                                            <td>=</td>
                                            <td>Pcs</td>
                                            <td>12.00</td>
                                            <td>Nearest</td>
                                        </tr>--%>
                                      </tbody>
                                </table>
                                <!-- end role table -->
                                <div class="clearfix"></div>
                                
                    </div>
                </div>
            </div>
        </div>
    </div>

<!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                    	<div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Item No</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="ddl_item_no">
                                	
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">From Unit</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="ddl_from_unit">
                                	
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">To Unit</label>
                            </div>
                            <div class="col-sm-6">
                            	<select class="form-control" id="ddl_to_unit">
                                	
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Factor</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="number" class="form-control" id="txtfactor">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Rounding to</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="ddl_round">
                                	<option value="N">Nearest</option>
                                	<option value="U">Up</option>
                                    <option value="D">Down</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row" id="div_block">
                            <div class="col-sm-6">
                                <label for="input">Block</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="checkbox" class="form-control" id="chkBlock">
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
    
    

<!-- Modal HTML Show -->
    <div class="modal fade" id="myModalSHOW" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Conversion Calculation</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">From Unit Qty.</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txt_from_unit_qty"> 
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">From Unit Code</label>
                            </div>
                            <div class="col-sm-6">
                            	<input type="text" class="form-control" readonly id="txtcon_from_unit"> 
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Equals to</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" value="=" class="form-control" readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">To Unit Qty</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" readonly id="txtconto_unit_qty"> 
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">To Unit Code</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" readonly id="txtcontounitcode"> 
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <%--<div class="modal-dialog modal-lg" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Show Conversion</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
						<table id="unit_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                    <tr>
                                    <th>From Unit Qty.</th>
                                    <th>From Unit Code</th>
                                    <th>Equals to</th>
                                    <th>To Unit Qty.</th>
                                    <th>To Unit Code</th>
                                    </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                          	<td>--</td>
                                            <td>--</td>
                                            <td>=</td>
                                            <td>--</td>
                                            <td>--</td>
                                        </tr>
                                      </tbody>
                                </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        </div>--%>
    </div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <link href="../Administration/administration.css" rel="stylesheet" />
    <script type="text/javascript">
  //      let editor; // use a global for the submit and return data rendering in the examples
 
  //      $(document).ready(function() {
  //          editor = new $.fn.dataTable.Editor( {
  //              table: "#item_table",} );
  //          $('#item_table').DataTable( {
  //              dom: "Bfrtip",

  //              select: true,
  //              buttons: [
		//			{
		//				add: "create", text: 'New', editor: editor, action: () => showmodal()
		//			},
		//			{
  //                      add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
  //                  },
		//			{
  //                      add: "delete", text: 'Delete', editor: editor
  //                  },
		//			{
		//				//add: "show", text: 'Show Conversion', editor: editor, action: () => window.open("#")
		//				add: "show", text: 'Show Conversion', editor: editor, action: () => showmodalshow()
  //                  }
  //              ],
         
  //          })
  //      })

  //      var showmodal = function () {
  //          $("#myModal").modal('show');
  //      };
		
		//var showmodaledit = function () {
  //          $("#myModalEDIT").modal('show');
  //      };
		//var showmodalshow = function () {
  //          $("#myModalSHOW").modal('show');
  //      };
		

	
		
    </script>
</asp:Content>
