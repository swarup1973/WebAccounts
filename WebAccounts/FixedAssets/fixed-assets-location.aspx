<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="fixed-assets-location.aspx.cs" Inherits="WebAccounts.FixedAssets.fixed_assets_location" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Fixed Assets Location</title>
	 <script type="text/javascript" src="js/FixedAssetLocationMaster.js?v=1.1"></script>
	 <style>
    .dataTables_length{
        margin-top : 35px;
        position : absolute;
    }
    .requ {
        color : #F00;
    }
      table.dataTable.display tbody tr:hover.selected > .sorting_1, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_1 {
        background-color: #a2aec7
    }

    table.dataTable.display tbody tr:hover.selected > .sorting_2, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_2 {
        background-color: #a3b0c9
    }

    table.dataTable.display tbody tr:hover.selected > .sorting_3, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_3 {
        background-color: #a5b2cb
    }
      table.dataTable tbody tr.selected {
            background-color: #b0bed9
        }
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
        <form runat="server">
            <asp:TextBox ID="txt" runat="server" ClientIDMode="Static" Style="display: none;"></asp:TextBox>
        </form>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                    <!-- start role table -->
                                <table id="addressbook" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>Location Code</th>
                                            <th>Location Name</th>
                                            <th>Dimension</th>
                                            <th>Dimension Value</th>
                                            <th>Block</th>
                                            <th>Stop</th>
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
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Fixed Assets Location Set-up - New</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-2">
							Code
							  <span class="requ">(*)</span>
						</div>
						<div class="col-sm-3">
							<input type="text" id="txtCode"/>
						</div>
                        <div class="col-sm-2">
							Address
						</div>
						<div class="col-sm-3">
							<textarea id="txtAddress"></textarea>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-2">
							Name
							  <span class="requ">(*)</span>
						</div>
						<div class="col-sm-3">
							<input type="text" id="txtName"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-2">
							Dimension Name
						</div>
						<div class="col-sm-3">
							<select id="ddDimension" onchange="populatedimensionvalue(-1);"></select>
						</div>
                        <div class="col-sm-2">
							Block
						</div>
						<div class="col-sm-3">
							<input type="checkbox" id="chkBlock" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-2">
							Dimension Value
						</div>
						<div class="col-sm-3">
							<select id="ddDimensionValue"></select>
						</div>
                        <div class="col-sm-2">
							Stop
						</div>
						<div class="col-sm-3">
							<input type="checkbox"  id="chkStop"/>
						</div>
					</div>
				</div>	
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="savedata();" id="btnSave">Add</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
			  </form>
            </div>
        </div>
    </div>

    <!-- Modal HTML Edit -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Fixed Assets Location Set-up - Edit</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-2">
							Code
						</div>
						<div class="col-sm-3">
							<input type="text"/>
						</div>
                        <div class="col-sm-2">
							Address
						</div>
						<div class="col-sm-3">
							<textarea></textarea>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-2">
							Name
						</div>
						<div class="col-sm-3">
							<input type="text"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-2">
							Dimension Name
						</div>
						<div class="col-sm-3">
							<input type="text"/>
						</div>
                        <div class="col-sm-2">
							Block
						</div>
						<div class="col-sm-3">
							<input type="checkbox" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-2">
							Dimension Value
						</div>
						<div class="col-sm-3">
							<input type="text"/>
						</div>
                        <div class="col-sm-2">
							Stop
						</div>
						<div class="col-sm-3">
							<input type="checkbox" />
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
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Fixed Assets Location Set-up - View</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-2">
							Code
						</div>
						<div class="col-sm-3">
							<input type="text"/>
						</div>
                        <div class="col-sm-2">
							Address
						</div>
						<div class="col-sm-3">
							<textarea></textarea>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-2">
							Name
						</div>
						<div class="col-sm-3">
							<input type="text"/>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-2">
							Dimension Name
						</div>
						<div class="col-sm-3">
							<input type="text"/>
						</div>
                        <div class="col-sm-2">
							Block
						</div>
						<div class="col-sm-3">
							<input type="checkbox" />
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-2">
							Dimension Value
						</div>
						<div class="col-sm-3">
							<input type="text"/>
						</div>
                        <div class="col-sm-2">
							Stop
						</div>
						<div class="col-sm-3">
							<input type="checkbox" />
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
           
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
        let editor; // use a global for the submit and return data rendering in the examples
 
        $(document).ready(function() {
            editor = new $.fn.dataTable.Editor( {
                table: "#item_table",} );
            $('#item_table').DataTable( {
                dom: "Bfrtip",

                select: true,
                buttons: [
					{
						add: "create", text: 'New', editor: editor, action: () => showmodal()
					},
                    {
                        add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
                    },
					{
                        add: "view", text: 'View', editor: editor, action: () => showmodalview()
                    },
					{
                        extend: "remove", editor: editor
                    },
					{
                        add: "stop", text: 'Stop', editor: editor
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


