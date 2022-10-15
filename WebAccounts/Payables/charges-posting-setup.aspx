<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="charges-posting-setup.aspx.cs" Inherits="WebAccounts.Payables.charges_posting_setup" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
        <script type="text/javascript" src="js/charges-posting.js"></script>
    <title>Posting Set-up for Charges</title>
<style>
			fieldset {
			transition: opacity 200ms;
			}
			fieldset[disabled] {
			opacity: 0.5;
			}
			[disabled] .ws-errormessage {
			color: #eee;
			}
		</style>
		<script>
            function optionChange() {
                if (document.getElementById("selectMe").value == "L"){
                    var cells = document.getElementsByClassName("debit"); 
                    for (var i = 0; i < cells.length; i++) { 
                        cells[i].disabled = false;
                    }
                }     
                else{
                    var cells = document.getElementsByClassName("debit"); 
                    for (var i = 0; i < cells.length; i++) { 
                        cells[i].disabled = true;
                    }
                    $("#ddDebit").val(-1);
                }        
            }
        </script>
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
                    
<form>
                <div class="modal-body">
                	<div class="form-group row">

						<div class="col-sm-12">
							<p><strong>Purchase</strong></p>
						</div>
                        
                        <div class="col-sm-3">
							Cost Posting Type (for Charge cost billing by Seller)
						</div>
						<div class="col-sm-3">
							<select required id="selectMe" class="selectMe" onchange="optionChange()">
                                <option value="C">Cost Loading on Inventory (Purchase Cost)</option>
                                <option value="L">Ledger</option>
                            </select>
						</div>
					</div>
                    
                    <fieldset id="chkdd">
                    <div id="option2" class="group">
					<div class="form-group row">
						<div class="col-sm-3">
							Debit Posting for Expense
						</div>
						<div class="col-sm-3">
							<select class="debit" disabled="disabled" id="ddDebit">
                            </select>
						</div>
                    </div> 
                    </div>
                    </fieldset>   
                    

                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Sale</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							Credit Posting for Revenue (for Charge cost billing to Seller)
						</div>
						<div class="col-sm-3">
							<select id="ddCredit">
                             
                            </select>
						</div>
                    </div>
				</div>	
                <div class="modal-footer">
                       <button type="button" class="btn btn-primary" onclick="savedata();" id="btnSave">Save</button>
                    <button type="button" class="btn btn-secondary" onclick="cancelbtn();">Cancel</button>
                </div>
			  </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal HTML Wizard --></asp:Content>

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
                        add: "wizard", text: 'Create/Remove by Wizard', editor: editor, action: () => showmodalwizard()
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
		var showmodalwizard = function () {
            $("#myModalWIZARD").modal('show');
        };

    </script>
</asp:Content>


