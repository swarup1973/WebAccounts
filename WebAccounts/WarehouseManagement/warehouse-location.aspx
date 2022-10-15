<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="warehouse-location.aspx.cs" Inherits="WebAccounts.WarehouseManagement.warehouse_location" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
      <script type="text/javascript" src="js/warehouse-location.js"></script>
      <link href="administration.css" rel="stylesheet" />
	 
    <title>Warehouse Locations</title>
    <script>
	$(document).ready(function () {
	  $('.group').hide();
	  $('#option1').show();
	  $('#selectMe').change(function () {
		$('.group').hide();
		$('#'+$(this).val()).show();
	  })
	});
	</script>
    <script>
	$(document).ready(function () {
	  $('.group2').hide();
	  $('#option3').show();
	  $('#selectMe2').change(function () {
		$('.group2').hide();
		$('#'+$(this).val()).show();
	  })
	});
	</script>
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
                    
                    <p><strong>Warehouse Name:</strong> <span id="warehousename" ></span></p>
                                <!-- start role table -->
                                <table id="addressbook" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;" >
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
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Warehouse Locations - New</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							Warehouse Code
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtWarehouse" disabled/>
						</div>
                        <div class="col-sm-6">
							Aisle No
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtAisle" onchange="generatelocationcode()"/>
						</div>
						<div class="col-sm-6">
							Rack  No
						</div>
						<div class="col-sm-6">
							<input type="text"  id="txtRack" onchange="generatelocationcode()"/>
						</div>
						<div class="col-sm-6">
							Shelf No
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtShelf" onchange="generatelocationcode()"/>
						</div>
                        <div class="col-sm-6">
							Bin No
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtBin" onchange="generatelocationcode()"/>
						</div>
						<div class="col-sm-6">
							Location Code
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtCode" />
						</div>
						<div class="col-sm-6">
							Location Description
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtDesc" />
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
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Warehouse Locations - Edit</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							Warehouse Code
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                        <div class="col-sm-6">
							Aisle No
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
						<div class="col-sm-6">
							Rack  No
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
						<div class="col-sm-6">
							Shelf No
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                        <div class="col-sm-6">
							Bin No
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
						<div class="col-sm-6">
							Location Code
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
						<div class="col-sm-6">
							Location Description
						</div>
						<div class="col-sm-6">
							<input type="text" />
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
    <div class="modal fade" id="myModalVIEW" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Warehouse Locations - View</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							Warehouse Code
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                        <div class="col-sm-6">
							Aisle No
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
						<div class="col-sm-6">
							Rack  No
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
						<div class="col-sm-6">
							Shelf No
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                        <div class="col-sm-6">
							Bin No
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
						<div class="col-sm-6">
							Location Code
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
						<div class="col-sm-6">
							Location Description
						</div>
						<div class="col-sm-6">
							<input type="text" />
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
    </div>
    
    <!-- Modal HTML Wizard -->
    <div class="modal fade" id="myModalWIZARD" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Create/Remove Location Wizard</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
                	<div class="form-group row">
                    <div class="col-sm-12">
							<p>This wizard will help you to create locations automatically based on input required as per the setup in the warehouse page or you can remove locations that created erroneously before making any transaction with locations subject to removal.</p>
						</div>
						<div class="col-sm-12">
							<p>Warehouse : <strong><span id="warehousebulk">--</span></strong></p>
						</div>
                        
                        <div class="col-sm-6">
							Create/Remove Location
						</div>
						<div class="col-sm-6">
							<select id="selectMe">
                                <option value="option1">1. Create Locations</option>
                                <option value="option2">2. Remove Locations</option>
                            </select>
						</div>
					</div>
                    
                    <div id="option1" class="group">
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Create</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6" >
							No of Aisles to Create
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtAislestoCreate"/>
						</div>
                        <div class="col-sm-6">
							Create Aisle based on
						</div>
						<div class="col-sm-6">
							<select id="selectMe2">
                                <option value="option3">1. Create from Last No</option>
                                <option value="option4">2. Specify New Number</option>
                            </select>
						</div>
                        
                        <div class="col-sm-12">
                        <div id="option4" class="group2">
                        	<div class="col-sm-6">
                                New Aisle No Starts from
                            </div>
                            <div class="col-sm-6">
                                <input type="text" id="txtAislesStartsfrom" value="0"/>
                            </div>     
                        </div>
                        </div>
                        
                        <div class="col-sm-6">
							No of Racks per Aisle to Create
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtBulkRacks"/>
						</div>
                        <div class="col-sm-6">
							No of Shelfs Per Rack to Create
                        </div>
						<div class="col-sm-6">
							<input type="text" id="txtBulkShelf"/>
						</div>
                        <div class="col-sm-6">
							No of Bins per Shelf to Create
						</div>
						<div class="col-sm-6">
							<input type="text" id="txtBulkBins"/>
						</div>
                    </div> 
                    </div>   
                    
                    <div id="option2" class="group">
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Remove</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							Select Location from
						</div>
						<div class="col-sm-6">
							<select id="ddLocationFrom">
                                
                            </select>
						</div>
                        <div class="col-sm-6">
							Select Location to
						</div>
						<div class="col-sm-6">
							<select id="ddLocationTo">
                                
                            </select>
						</div>   
					</div>
                    </div>
				</div>	
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="savedatabulk();">OK</button>
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
 
      

        var showmodal = function () {
            $("#myModal").modal('show');
        };
		var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
		var showmodalview = function () {
            $("#myModalVIEW").modal('show');
        };
		var showmodalwizard = function () {
            $("#myModalWIZARD").modal('show');
        };

    </script>
</asp:Content>
