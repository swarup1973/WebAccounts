<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="WebAccounts.roles" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Vendor Account Overview</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                   Procurement
					>
					Setup
					>
					<strong>Payment Terms</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                <table id="vendor_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Description</th>
                                            <th>Payment Period Type</th>
                                            <th>Payment Terms Period</th>
                                            <th>Discount Period Type</th>
                                            <th>Discount Calculation Period</th>
                                            <th>Discount %</th>
                                            <th>Calculate Discount on Return/Cr Memo </th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                            <td>123456</td>
                                            <td>Description goes here</td>
                                            <td>Month</td>
                                            <td>Terms Period</td>
                                            <td>Month</td>
                                            <td>Calculation Period</td>
                                            <td>10%</td>
                                            <td>Yes</td>
                                        </tr>
                                      </tbody>
                                </table>
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>



    <!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Payment Terms - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Code</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" >
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Description</label>
						</div>
						<div class="col-sm-6">
							<textarea  class="form-control"></textarea>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Payment Period Type</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                            	<option>Day</option>
                                <option>Week</option>
                                <option>Month</option>
                                <option>Quarter</option>
                             </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Payment Terms Period</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Discount Period Type</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                            	<option>Blank</option>
                                <option>Day</option>
                                <option>Week</option>
                                <option>Month</option>
                                <option>Quarter</option>
                             </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Discount Calculation Period</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Discount %</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Calculate Discount on Return/Cr Memo </label>
						</div>
						<div class="col-sm-6">
							 <input type="checkbox" class="form-control">
						</div>
					</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Add</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>
        </div>
    </div>
   
<!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Payment Terms - Edit</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Code</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" value="12345">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Description</label>
						</div>
						<div class="col-sm-6">
                            <textarea class="form-control">Description goes here</textarea>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Payment Period Type</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                            	<option>Day</option>
                                <option>Week</option>
                                <option selected="selected">Month</option>
                                <option>Quarter</option>
                             </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Payment Terms Period</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" value="Terms Period">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Discount Period Type</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                            	<option>Blank</option>
                                <option>Day</option>
                                <option>Week</option>
                                <option selected="selected">Month</option>
                                <option>Quarter</option>
                             </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Discount Calculation Period</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control" value="Calculation Period">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Discount %</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control" value="10%">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Calculate Discount on Return/Cr Memo </label>
						</div>
						<div class="col-sm-6">
							 <input type="checkbox" class="form-control" checked="checked">
						</div>
					</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save</button>
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
                table: "#vendor_table",} );
            $('#vendor_table').DataTable( {
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

    </script>
</asp:Content>

