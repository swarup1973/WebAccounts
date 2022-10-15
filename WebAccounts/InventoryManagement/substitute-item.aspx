<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="substitute-item.aspx.cs" Inherits="WebAccounts.InventoryManagement.substitute_item" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Substitute Item Set-up Overview - Inventory Management</title>
     <script type="text/javascript" src="js/substituteitem.js"></script>
    <link href="administration.css" rel="stylesheet" />
     <style>
        .dataTables_wrapper {
            margin-top : 10px;
        }
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

        <form runat="server">
            <asp:TextBox ID="txt" runat="server" ClientIDMode="Static" Style="display: none;"></asp:TextBox>
        </form>



        <div class="clearfix"></div>
		

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body table-responsive">
                    			 <strong>Item Code : </strong><span id="itemcode"></span>&nbsp;<strong>Item Description : </strong> <span id="itemdes"></span>
                                <!-- start role table -->
                                <table id="addressbook" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;" >
                                    <thead>
                                        <tr>
                                            <th>Variant Name</th>
                                            <th>Item Type</th>
                                            <th>Substitute Item Code</th>
                                            <th>Substitute Item Description</th>
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
                    <h5 class="modal-title">Substitute Item Set-up Overview - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Variant Name</label>
                             <span class="requ">(*)</span>
						</div>
						<div class="col-sm-6">
							<select id="ddItem">
                            	<option>Selection</option>
                            	<option>--</option>
                            </select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Item Type</label>
						</div>
						<div class="col-sm-6">
							<select id="ddItemType">
                            	 <option value="1">1. Item</option>
                                 <option value="2">2. Service</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Substitute Item Code</label>
                            <span class="requ">(*)</span>
						</div>
						<div class="col-sm-6">
						  <select id="ddSubstitute" onchange="getProdDesc();">
					      </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Substitute Item Description</label>
						</div>
						<div class="col-sm-6">
						  <input type="text" class="form-control"  id="txtDesc" disabled>
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
                        extend: "remove", editor: editor
                    },
                    {
                        add: "view", text: 'View', editor: editor, action: () => showmodalview()
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


