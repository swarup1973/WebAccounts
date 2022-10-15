<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="item-variant-setup.aspx.cs" Inherits="WebAccounts.InventoryManagement.item_variant_setup" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Variant Set-up Overview - Inventory Management</title>
    <script type="text/javascript" src="js/itemvariantsetup.js"></script>
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
            <asp:TextBox ID="txt" runat="server" ClientIDMode="Static" Style="display: none;"></asp:TextBox>
        </form>

        <div class="clearfix"></div>
		

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body table-responsive">
                    			<strong>Item Code : </strong><span id="itemcode"></span><br />
                                <strong>Item Description : </strong> <span id="itemdes"></span>
                                <br />
                                <!-- start role table -->
                                <table id="addressbook" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;" >
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th id="th1">Variant Code-1</th>
                                            <th id="th2">Variant Code-2</th>
                                            <th id="th3">Variant Code-3</th>
                                            <th id="th4">Variant Code-4</th>
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
                    <h5 class="modal-title">Variant Set-up Overview - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Name</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="txtName">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input" id="lblv1">Variant Name 1</label>
						</div>
						<div class="col-sm-6">
							<select id="ddVariantValueId_1">
                            	<option>Selection</option>
                            	<option>--</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input" id="lblv2">Variant Name 2</label>
						</div>
						<div class="col-sm-6">
						  <select id="ddVariantValueId_2">
						    <option>Selection</option>
						    <option>--</option>
					      </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input" id="lblv3">Variant Name 3</label>
						</div>
						<div class="col-sm-6">
						  <select id="ddVariantValueId_3">
						    <option>Selection</option>
						    <option>--</option>
					      </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input" id="lblv4">Variant Name 4</label>
						</div>
						<div class="col-sm-6">
						  <select id="ddVariantValueId_4">
						    <option>Selection</option>
						    <option>--</option>
					      </select>
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


