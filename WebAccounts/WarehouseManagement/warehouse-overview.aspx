<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="warehouse-overview.aspx.cs" Inherits="WebAccounts.WarehouseManagement.warehouse_overview" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>WareHouse Overview</title>
      <script type="text/javascript" src="js/warehouse-overview.js"></script>
      <link href="administration.css" rel="stylesheet" />
       <script>
           $(document).ready(function () {
               $('.group').hide();
               $('#option0').show();
               $('#selectMe').change(function () {
                   $('.group').hide();
                   $('#' + $(this).val()).show();
               })
           });
       </script>
    <script>
        $(document).ready(function () {
            $('.group2').hide();
            $('#option02').show();
            $('#selectMe2').change(function () {
                $('.group2').hide();
                $('#' + $(this).val()).show();
            })
        });
    </script>
    <script>
        $(document).ready(function () {
            $('.group3').hide();
            $('#option03').show();
            $('#selectMe3').change(function () {
                $('.group3').hide();
                $('#' + $(this).val()).show();
            })
        });
    </script>
    <title>Warehouse Overview</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
       
        <form runat="server">
            <asp:TextBox ID="txt" runat="server" ClientIDMode="Static" style="display : none;"></asp:TextBox>
        </form>
        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                <table id="addressbook" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;" >
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Warehouse Name</th>
                                            <th>Warehouse Type</th>
                                            <th>Block</th>
                                            <th>Close</th>
                                        </tr>
                                    </thead>
                                     <%--<tbody>
                                          <tr>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                        </tr>
                                        <tr>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                        </tr>
                                        <tr>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                            <td><input type="checkbox" disabled="disabled" /></td>
                                        </tr>
                                      </tbody>--%>
                                </table>
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1" data-keyboard="false" data-backdrop="static" style="overflow-y: scroll;">
        <div class="modal-dialog modal-xl" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Warehouse Set-up - New</h5>
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
                    <div class="col-sm-6">
						<div class="col-sm-6">
							Code
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtWareHouseCd" maxlength="6"/>
						</div>
                        <div class="col-sm-6">
							Name
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtWareHouseDesc" maxlength="100"/>
						</div>
                        <div class="col-sm-6">
							Address Line-1
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtAdd1" maxlength="100"/>
						</div>
						<div class="col-sm-6">
							Address Line-2
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtAdd2"  maxlength="100"/>
						</div>
						<div class="col-sm-6">
							Post Code
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtPostCode" onblur="getPostCodeDetails();"  maxlength="8" />
                            <input type="button" value="search" onclick="showmodalpincode();" />
						</div>
                        
                        <div class="col-sm-6">
							City
						</div>
                        <div class="col-sm-6">
                            <input type="text" id="txtCity" disabled/>
                            <input type="text" id="txtPostId" style="display:none;" />
                    	</div>
                        <div class="col-sm-6">
							Country
						</div>
                        <div class="col-sm-6">
                         <input type="text" id="txtCountry" disabled/>
                          
                      	</div>
                        <div class="col-sm-6">
							State/County
						</div>
                        <div class="col-sm-6">
							<input type="text" id="txtState" disabled/>
                            
						</div>
                        
                    </div> <!-- left col 6 -->    
                     
                     <div class="col-sm-6">   
                         <div class="col-sm-6">
							Warehouose Type
						</div>
						<div class="col-sm-6">
							<select id="ddwarehousetype" onchange="getWarehouseByType();">
                                <option value="option0">Select Warehouose Type</option>
                                <option value="option1">1. Own/Default Warehouse</option>
                                <option value="option2">2. Transit Warehouse</option>
                                <option value="option3">3. Quarantine Warehouse</option>
                                <option value="option4">4. Vendor Warehouse</option>
                            </select>
						</div>
                        
                        <div id="option0" class="group">
                        <div class="col-sm-6">
							Quarantine Warehouse
						</div>
						<div class="col-sm-6">
							<select  id="ddQuarantine" disabled>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Transit Warehouse
						</div>
						<div class="col-sm-6">
							<select  id="ddTransit" disabled>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Vendor Warehouse
						</div>
						<div class="col-sm-6">
							<select id="ddVendor" disabled>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        </div>

                        <div id="option1" class="group">
                        <div class="col-sm-6">
							Quarantine Warehouse
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Transit Warehouse
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Vendor Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        </div>
                        
                        <div id="option2" class="group">
                        <div class="col-sm-6">
							Quarantine Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Transit Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Vendor Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        </div>
                        
                        <div id="option3" class="group">
                        <div class="col-sm-6">
							Quarantine Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Transit Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Vendor Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        </div>
                        
                        <div id="option4" class="group">
                        <div class="col-sm-6">
							Quarantine Warehouse
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Transit Warehouse
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Vendor Warehouse
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        </div>
					

                        
                     
                        
                       
                        
                       
                        
                        <div class="col-sm-6">
							Block
						</div>
                        <div class="col-sm-6">
							<input type="checkbox" id="chkBlock" />
						</div>
                        <div class="col-sm-6">
							Close
						</div>
                        <div class="col-sm-6">
							<input type="checkbox" id="chkClose" />
						</div>
						</div><!-- right col 6 -->
					</div><!--form-group row-->
                                    
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Communication</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							Contact Percon Name
						</div>
						<div class="col-sm-3">
							<input type="text" id="txtComm_ContactPerson"  maxlength="50"/>
						</div>
                        <div class="col-sm-3">
							Fax No
						</div>
						<div class="col-sm-3">
							<input type="text" id="txtFaxno"  maxlength="15" />
						</div>
                        <div class="col-sm-3">
							Phone No
						</div>
                        <div class="col-sm-3">
							<input type="text" id="txtComm_PhoneNo" maxlength="15"/>
						</div>
						<div class="col-sm-3">
							Email
						</div>
						<div class="col-sm-3">
							<input type="text" id="txtComm_Email" maxlength="100"/>
						</div>
						<div class="col-sm-3">
							Alternate Phone No
						</div>
						<div class="col-sm-3">
							<input type="text" id="txtComm_AltPhoneNo" maxlength="15"/>
						</div>
						<div class="col-sm-3">
							Website
						</div>
						<div class="col-sm-3">
							<input type="text" id="txtComm_Website" maxlength="100" />
						</div>
					</div>
                    
					<div class="form-group row">
						<div class="col-sm-12">
							<strong>Storage Location Requirements</strong>
						</div>
					</div>
                    <div class="form-group row">
                    	<div class="col-sm-3">
							Use Aisle?
						</div>
						<div class="col-sm-3">
							<input type="checkbox" id="chkSLR_UseAisle" />
						</div>
                        <div class="col-sm-3">
							Default Receipt Location
						</div>
						<div class="col-sm-3">
							<select id="ddSLR_DefRecptLocationId">
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-3">
							Use Rack?
						</div>
						<div class="col-sm-3">
							<input type="checkbox" id="chkSLR_UseRack" />
						</div>
                        <div class="col-sm-3">
							Default Issue Location
						</div>
						<div class="col-sm-3">
							<select id="ddSLR_DefIssueLocationId">
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-3">
                        	Use Shelf?
						</div>
						<div class="col-sm-3">
                        	<input type="checkbox" id="chkSLR_UseSelf" />
						</div>
                        <div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
                        	Use Bin?
						</div>
						<div class="col-sm-3">
                        	<input type="checkbox" id="chkSLR_UseBin" />
						</div>
                        <div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
                    </div>
                    
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>No Sequence</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							Purchase Receipt Nos
						</div>
                        <div class="col-sm-3">
                          <select id="ddNS_PurRecptNo">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
						</div>
                        <div class="col-sm-3">
                        	Sales Shipment Nos
						</div>
                        <div class="col-sm-3">
                          <select id="ddNS_SalesShipNo">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
      					</div>
                        <div class="col-sm-3">
							Purchase Invoice Nos
						</div>
                        <div class="col-sm-3">
                          <select id="ddNS_PurInvNo">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
        </div>
                        <div class="col-sm-3">
                        	Sales Invoice Nos
						</div>
                        <div class="col-sm-3">
                          <select id="ddNS_SalesInvNo">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
          </div>
                        <div class="col-sm-3">
                        	Purchase Return Shipment Nos
						</div>
                        <div class="col-sm-3">
                          <select id="ddNS_PurRetShipNo">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
            </div>
                        <div class="col-sm-3">
                        	Sales Return Receipt Nos
						</div>
                        <div class="col-sm-3">
                          <select id="ddNS_SalesRetRecptNo">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
              </div>
                        <div class="col-sm-3">
                        	Purchase Credit Memo/Return Invoice Nos
						</div>
                        <div class="col-sm-3">
                          <select id="ddNS_PurCreditMemoNo">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                </div>
                        <div class="col-sm-3">
                        	Sales Credit Memo/Return Incoice Nos
						</div>
                        <div class="col-sm-3">
                          <select id="ddNS_SalesCreditMemoNo">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                  </div>
                        <div class="col-sm-3">
                        	Transfer Shipment Nos
						</div>
                        <div class="col-sm-3">
                          <select id="ddNS_TranfShipNo">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                    </div>
                        <div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
                        	Transfer Receipt Nos
						</div>
                        <div class="col-sm-3">
                          <select id="ddNS_TranfRecptNo">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                      </div>
                        <div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
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

    <!-- Modal HTML Edit -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-xl" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Warehouse Set-up - Edit</h5>
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
                    <div class="col-sm-6">
						<div class="col-sm-6">
							Code
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                        <div class="col-sm-6">
							Name
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                        <div class="col-sm-6">
							Address Line-1
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
						<div class="col-sm-6">
							Address Line-2
						</div>
						<div class="col-sm-6">
							<input type="text" />
						</div>
						<div class="col-sm-6">
							Post Code
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                                <option>...</option>
                            </select>
                          
						</div>
                        
                        <div class="col-sm-6">
							City
						</div>
                        <div class="col-sm-6">
                          <select name="select15">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                    	</div>
                        <div class="col-sm-6">
							Country
						</div>
                        <div class="col-sm-6">
                          <select name="select16">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                      	</div>
                        <div class="col-sm-6">
							State/County
						</div>
                        <div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                                <option>...</option>
                            </select>
						</div>
                        
                    </div> <!-- left col 6 -->    
                     
                     <div class="col-sm-6">   
                        <div class="col-sm-6">
							Warehouose Type
						</div>
						<div class="col-sm-6">
							<select id="selectMe2">
                            	<option value="option02">Select Warehouose Type</option>
                                <option value="option5">1. Own/Default Warehouse</option>
                                <option value="option6">2. Transit Warehouse</option>
                                <option value="option7">3. Quarantine Warehouse</option>
                                <option value="option8">4. Vendor Warehouse</option>
                            </select>
						</div>

                        <div id="option02" class="group2">
                        <div class="col-sm-6">
							Quarantine Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Transit Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Vendor Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        </div>

                        <div id="option5" class="group2">
                        <div class="col-sm-6">
							Quarantine Warehouse
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Transit Warehouse
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Vendor Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        </div>
                        
                        <div id="option6" class="group2">
                        <div class="col-sm-6">
							Quarantine Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Transit Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Vendor Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        </div>
                        
                        <div id="option7" class="group2">
                        <div class="col-sm-6">
							Quarantine Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Transit Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Vendor Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        </div>
                        
                        <div id="option8" class="group2">
                        <div class="col-sm-6">
							Quarantine Warehouse
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Transit Warehouse
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Vendor Warehouse
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        </div>
                        
                        <div class="col-sm-6">
							Block
						</div>
                        <div class="col-sm-6">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-6">
							Close
						</div>
                        <div class="col-sm-6">
							<input type="checkbox" />
						</div>
						</div><!-- right col 6 -->
					</div><!--form-group row-->
                                    
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Communication</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							Contact Percon Name
						</div>
						<div class="col-sm-3">
							<input type="text" />
						</div>
                        <div class="col-sm-3">
							Fax No
						</div>
						<div class="col-sm-3">
							<input type="text" />
						</div>
                        <div class="col-sm-3">
							Phone No
						</div>
                        <div class="col-sm-3">
							<input type="text" />
						</div>
						<div class="col-sm-3">
							Email
						</div>
						<div class="col-sm-3">
							<input type="text" />
						</div>
						<div class="col-sm-3">
							Alternate Phone No
						</div>
						<div class="col-sm-3">
							<input type="text" />
						</div>
						<div class="col-sm-3">
							Website
						</div>
						<div class="col-sm-3">
							<input type="text" />
						</div>
					</div>
                    
					<div class="form-group row">
						<div class="col-sm-12">
							<strong>Storage Location Requirements</strong>
						</div>
					</div>
                    <div class="form-group row">
                    	<div class="col-sm-3">
							Use Aisle?
						</div>
						<div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-3">
							Default Receipt Location
						</div>
						<div class="col-sm-3">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-3">
							Use Rack?
						</div>
						<div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-3">
							Default Issue Location
						</div>
						<div class="col-sm-3">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-3">
                        	Use Shelf?
						</div>
						<div class="col-sm-3">
                        	<input type="checkbox" />
						</div>
                        <div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
                        	Use Bin?
						</div>
						<div class="col-sm-3">
                        	<input type="checkbox" />
						</div>
                        <div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
                    </div>
                    
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>No Sequence</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							Purchase Receipt Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
						</div>
                        <div class="col-sm-3">
                        	Sales Shipment Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select2">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
      					</div>
                        <div class="col-sm-3">
							Purchase Invoice Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select3">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
        </div>
                        <div class="col-sm-3">
                        	Sales Invoice Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select4">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
          </div>
                        <div class="col-sm-3">
                        	Purchase Return Shipment Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select5">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
            </div>
                        <div class="col-sm-3">
                        	Sales Return Receipt Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select6">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
              </div>
                        <div class="col-sm-3">
                        	Purchase Credit Memo/Return Invoice Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select7">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                </div>
                        <div class="col-sm-3">
                        	Sales Credit Memo/Return Incoice Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select8">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                  </div>
                        <div class="col-sm-3">
                        	Transfer Shipment Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select9">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                    </div>
                        <div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
                        	Transfer Receipt Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select10">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                      </div>
                        <div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
						</div>
					</div>
				</div>	
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
                
			  </form>
            </div>
        </div>
    </div>

    <!-- Modal HTML View -->
   <%-- <div class="modal fade" id="myModalVIEW" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-xl" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Warehouse Set-up - View</h5>
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
                    <div class="col-sm-6">
						<div class="col-sm-6">
							Code
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                        <div class="col-sm-6">
							Name
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                        <div class="col-sm-6">
							Address Line-1
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
						<div class="col-sm-6">
							Address Line-2
						</div>
						<div class="col-sm-6">
							<input type="text" />
						</div>
						<div class="col-sm-6">
							Post Code
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                                <option>...</option>
                            </select>
						</div>
                        
                        <div class="col-sm-6">
							City
						</div>
                        <div class="col-sm-6">
                          <select name="select15">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                    	</div>
                        <div class="col-sm-6">
							Country
						</div>
                        <div class="col-sm-6">
                          <select name="select16">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                      	</div>
                        <div class="col-sm-6">
							State/County
						</div>
                        <div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                                <option>...</option>
                            </select>
						</div>
                        
                    </div> <!-- left col 6 -->    
                     
                     <div class="col-sm-6">   
                        <div class="col-sm-6">
							Warehouose Type
						</div>
						<div class="col-sm-6">
							<select id="selectMe3">
                                <option value="option03">Select Warehouose Type</option>
                                <option value="option9">1. Own/Default Warehouse</option>
                                <option value="option10">2. Transit Warehouse</option>
                                <option value="option11">3. Quarantine Warehouse</option>
                                <option value="option12">4. Vendor Warehouse</option>
                            </select>
						</div>

                        <div id="option03" class="group3">
                        <div class="col-sm-6">
							Quarantine Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Transit Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Vendor Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        </div>

                        <div id="option9" class="group3">
                        <div class="col-sm-6">
							Quarantine Warehouse
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Transit Warehouse
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Vendor Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        </div>
                        
                        <div id="option10" class="group3">
                        <div class="col-sm-6">
							Quarantine Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Transit Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Vendor Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        </div>
                        
                        <div id="option11" class="group3">
                        <div class="col-sm-6">
							Quarantine Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Transit Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Vendor Warehouse
						</div>
						<div class="col-sm-6">
							<select disabled="disabled">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        </div>
                        
                        <div id="option12" class="group3">
                        <div class="col-sm-6">
							Quarantine Warehouse
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Transit Warehouse
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-6">
							Vendor Warehouse
						</div>
						<div class="col-sm-6">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                            </select>
						</div>
                        </div>
                        
                        <div class="col-sm-6">
							Block
						</div>
                        <div class="col-sm-6">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-6">
							Close
						</div>
                        <div class="col-sm-6">
							<input type="checkbox" />
						</div>
						</div><!-- right col 6 -->
					</div><!--form-group row-->
                                    
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Communication</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							Contact Percon Name
						</div>
						<div class="col-sm-3">
							<input type="text" />
						</div>
                        <div class="col-sm-3">
							Fax No
						</div>
						<div class="col-sm-3">
							<input type="text" />
						</div>
                        <div class="col-sm-3">
							Phone No
						</div>
                        <div class="col-sm-3">
							<input type="text" />
						</div>
						<div class="col-sm-3">
							Email
						</div>
						<div class="col-sm-3">
							<input type="text" />
						</div>
						<div class="col-sm-3">
							Alternate Phone No
						</div>
						<div class="col-sm-3">
							<input type="text" />
						</div>
						<div class="col-sm-3">
							Website
						</div>
						<div class="col-sm-3">
							<input type="text" />
						</div>
					</div>
                    
					<div class="form-group row">
						<div class="col-sm-12">
							<strong>Storage Location Requirements</strong>
						</div>
					</div>
                    <div class="form-group row">
                    	<div class="col-sm-3">
							Use Aisle?
						</div>
						<div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-3">
							Default Receipt Location
						</div>
						<div class="col-sm-3">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-3">
							Use Rack?
						</div>
						<div class="col-sm-3">
							<input type="checkbox" />
						</div>
                        <div class="col-sm-3">
							Default Issue Location
						</div>
						<div class="col-sm-3">
							<select>
                                <option>--</option>
                                <option>--</option>
                                <option>...</option>
                                <option>...</option>
                            </select>
						</div>
                        <div class="col-sm-3">
                        	Use Shelf?
						</div>
						<div class="col-sm-3">
                        	<input type="checkbox" />
						</div>
                        <div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
                        	Use Bin?
						</div>
						<div class="col-sm-3">
                        	<input type="checkbox" />
						</div>
                        <div class="col-sm-3">
						</div>
						<div class="col-sm-3">
						</div>
                    </div>
                    
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>No Sequence</strong>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							Purchase Receipt Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
						</div>
                        <div class="col-sm-3">
                        	Sales Shipment Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select2">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
      					</div>
                        <div class="col-sm-3">
							Purchase Invoice Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select3">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
        </div>
                        <div class="col-sm-3">
                        	Sales Invoice Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select4">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
          </div>
                        <div class="col-sm-3">
                        	Purchase Return Shipment Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select5">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
            </div>
                        <div class="col-sm-3">
                        	Sales Return Receipt Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select6">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
              </div>
                        <div class="col-sm-3">
                        	Purchase Credit Memo/Return Invoice Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select7">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                </div>
                        <div class="col-sm-3">
                        	Sales Credit Memo/Return Incoice Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select8">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                  </div>
                        <div class="col-sm-3">
                        	Transfer Shipment Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select9">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                    </div>
                        <div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
                        	Transfer Receipt Nos
						</div>
                        <div class="col-sm-3">
                          <select name="select10">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
                      </div>
                        <div class="col-sm-3">
						</div>
                        <div class="col-sm-3">
						</div>
					</div>
				</div>		
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
                
			  </form>
            </div>
        </div>
    </div>--%>
     <!-- Modal HTML View Location -->
    <div class="modal fade" id="myModalVIEW" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-xl" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Warehouse Location - View</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                  <div class="modal-body">
                       <table id="locationbook" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;" >
                                    <thead>
                                        <tr>
                                            <th>Warehouse Code</th>
                                            <th>Aisle No</th>
                                            <th>Rack  No</th>
                                            <th>Shelf No</th>
                                            <th>Bin No</th>
                                            <th>Location Code</th>
                                            <th>Location Description</th>
                                        </tr>
                                    </thead>
                                    
                                </table>
                    </div>
			  </form>
            </div>
        </div>
    </div>
      <div class="modal fade" id="myModalPincode" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-xl" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Pincode Search</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                  <div class="modal-body">
                      <div class="form-group row">
                          <div class="col-md-2">
							Country
						</div>
						<div class="col-md-2">
							<select id="ddPincodeCountry" onchange="PopulateState();">

							</select>
						</div>
                          <div class="col-md-2">
							State
						</div>
						<div class="col-md-2">
							<select id="ddPincodeCounty" onchange="PopulateCity();">

							</select>
						</div>
                            <div class="col-md-2">
							City
						</div>
						<div class="col-md-2">
							<select id="ddPincodeCity">

							</select>
						</div>
                        <div class="col-md-2">
                            <button type="button" class="btn btn-primary" onclick="fetchPinCode();">Search</button>
						</div>
                           
                      </div>  
                       <table id="pincoderesult" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>Country</th>
                                            <th>State</th>
                                            <th>City</th>
                                            <th>Post Code</th>
                                            <th></th>
                                            
                                        </tr>
                                    </thead>
                                    
                                </table>
                    </div>
			  </form>
            </div>
        </div>
    </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
        let editor; // use a global for the submit and return data rendering in the examples
 
     

        var showmodal = function () {
            $("#myModal").modal('show');
        };
		var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
		var showmodalview = function () {
            $("#myModalVIEW").modal('show');
        };
        var showmodalpincode = function () {
            $('#myModalPincode .modal-title').html('Pincode Search');
            $("#myModalPincode").modal('show');
        };

    </script>
</asp:Content>

