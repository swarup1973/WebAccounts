<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="ledger-account-mapping.aspx.cs" Inherits="WebAccounts.GeneralLedger.ledger_account_mapping" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Ledger / Group Mapping</title>
    <script type="text/javascript" src="js/ledgerAccountMapping.js"></script>
    <link href="administration.css" rel="stylesheet" />
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
                                <!-- start role table -->
                                <table id="item_table" class="table table-bordered table-hover projects display dataTable width-100">
                                    <thead>
                                        <tr>
                                            <%--<th>Select</th>--%>
                                            <th>Ledger Code</th>	
                                            <th>Description</th>
                                            <th>Type</th>
                                            <th>Group</th>
                                        </tr>
                                    </thead>
                                    
                                </table>
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>


<!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height:100%;max-width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Ledger / Group Mapping</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Ledger Code</label>
                            <span class="requ">(*)</span>
						</div>
						<div class="col-sm-6">
						  	<select id="ddledgercode">
                              
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Description</label>
						</div>
						<div class="col-sm-6">
                        	<textarea class="form-control" id="description" disabled></textarea>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Type</label>
						</div>
						<div class="col-sm-6">
						  	<input type="text" class="form-control" id="ltype" disabled/>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Group</label>
						</div>
						<div class="col-sm-6">
						  	<input type="text" class="form-control" id="lgroup" disabled/>
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
       // let editor; // use a global for the submit and return data rendering in the examples
 
        $(document).ready(function() {
    //        editor = new $.fn.dataTable.Editor( {
    //            table: "#item_table",} );
    //        	$('#item_table').DataTable( {
    //            dom: "Bfrtip",
				////"bPaginate": false,
				////"bLengthChange": false,
    //            //select: false,
				////"bFilter": false,
    //    		//"bInfo": false,
				////"ordering": false,
    //            buttons: [
    //               	{
    //                    add: "lla", text: 'Load Ledgers Automatically', editor: editor
    //                },
				//	{
    //                    add: "arm", text: 'Add Row Manually', editor: editor
    //                },
				//   	{
    //                    add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
    //                },
				//	{
    //                    extend: "remove", editor: editor
    //                },
				//	{
    //                    add: "view", text: 'View', editor: editor, action: () => showmodalview()
    //                }
                  
    //            ],
         
    //            })

          
        })
		
       

    </script>
</asp:Content>
