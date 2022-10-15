<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/master/base.Master" CodeBehind="center-setup.aspx.cs" Inherits="WebAccounts.Administration.center_setup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
	<script type="text/javascript" src="js/CenterSetup.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

        <div class="row">
            <div class="col">
                <p>
                   Administration
					>
					<a href="branch-responsibility-center-overview.aspx">Branch/Responsibility Center Overview</a>
					>
					<strong>Setup</strong>
                </p>
            </div>
        </div>


        <div class="clearfix"></div>
		

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                <table id="budget_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap;  overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>General</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Code</strong></td>
                                            <td><input type="text" class="form-control" id="txtCode"/></td>
                                            <td><strong>City</strong></td>
                                            <td><input type="text" class="form-control" id="txtCity"/></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Name</strong></td>
                                            <td><input type="text" class="form-control" id="txtDesc"/></td>
                                            <td><strong>Post Code</strong></td>
                                            <td><input type="text" class="form-control" id="txtPostCode"/></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Address Line-1</strong></td>
                                            <td><input type="text" class="form-control" id="txtAdd1"/></td>
                                            <td><strong>Country </strong></td>
                                            <td><input type="text" class="form-control" id="txtCountry"/></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Address Line-2</strong></td>
                                            <td><input type="text" class="form-control" id="txtAdd2"/></td>
                                            <td><strong>Location</strong></td>
                                            <td>
												<select class="form-control" id="ddl_location">
												
												</select>

                                            </td>
                                        </tr>
                                      </tbody>
                                        
                                </table>
                                <!-- end General table -->
                                
                                <table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; overflow-x:auto; overflow-y: hidden;">
                                	<thead>
                                        <tr>
                                            <th>Contact Information</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                   <tbody>
                                        <tr>
                                            <td><strong>Contact Person</strong></td>
                                            <td><input type="text" class="form-control" id="txtContactPerson"/></td>
                                            <td><strong>Fax No</strong></td>
                                            <td><input type="text" class="form-control" id="txtFax"/></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Phone No</strong></td>
                                            <td><input type="text" class="form-control" id="txtPhone"/></td>
                                            <td><strong>Email</strong></td>
                                            <td><input type="text" class="form-control" id="txtEmail"/></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Alternate Phone No</strong></td>
                                            <td><input type="text" class="form-control" id="txtAltPhone"/></td>
                                            <td><strong>Website </strong></td>
                                            <td><input type="text" class="form-control" id="txtWebSite"/></td>
                                        </tr>
									   <tr id="tr_block" runat="server">
										   <td><strong>Block</strong></td>
                                            <td><input type="checkbox" class="form-control" id="chkBlock"/></td>
                                            <td></td>
                                            <td></td>
									   </tr>
                                      </tbody>
                                </table>
                                <!-- end Contacts table -->
                                <div class="clearfix"></div>
                                <div class="card-body" style="text-align:center">
                                <button type="button" class="btn btn-primary" onclick="savedata();">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="cancel();">Cancel</button>
                                </div>
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
                 <h5 class="modal-title">New</h5>
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
						<div class="col-sm-3">
							<label for="input">Code</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">City</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Name</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Post Code</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Address Line-1</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Country</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Address Line-2</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Location</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Contact Information</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Contact Person</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Fax No</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Phone No</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Email</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Alternate Phone No</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
                        	<label for="input">Website</label>
						</div>
						<div class="col-sm-3">
                        	<input type="text" class="form-control">
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

<%--<!-- Modal HTML EDIT -->
<div class="modal fade" id="myModalEDIT" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">New</h5>
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
						<div class="col-sm-3">
							<label for="input">Code</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">City</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Name</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Post Code</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Address Line-1</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Country</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Address Line-2</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Location</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Contact Information</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Contact Person</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Fax No</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Phone No</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Email</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Alternate Phone No</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
                        	<label for="input">Website</label>
						</div>
						<div class="col-sm-3">
                        	<input type="text" class="form-control">
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

<!-- Modal HTML VIEW -->
<div class="modal fade" id="myModalVIEW" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">New</h5>
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
						<div class="col-sm-3">
							<label for="input">Code</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">City</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Name</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Post Code</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Address Line-1</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Country</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Address Line-2</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Location</label>
						</div>
						<div class="col-sm-3">
							<select class="form-control">
                            <option>--</option>
                            <option>--</option>
                            </select>
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-12">
							<strong>Contact Information</strong>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Contact Person</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Fax No</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Phone No</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
							<label for="input">Email</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-3">
							<label for="input">Alternate Phone No</label>
						</div>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-3">
                        	<label for="input">Website</label>
						</div>
						<div class="col-sm-3">
                        	<input type="text" class="form-control">
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
    </div>--%>
    
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
  //      let editor; // use a global for the submit and return data rendering in the examples
 
  //      $(document).ready(function() {
  //          editor = new $.fn.dataTable.Editor( {
  //              table: "#budget_table",} );
  //          $('#budget_table').DataTable( {
  //              dom: "Bfrtip",
		//		"bPaginate": false,
		//		"bLengthChange": false,
  //              select: false,
		//		"bFilter": false,
  //      		"bInfo": false,
		//		"ordering": false,
  //              buttons: [

  //                  {
		//				add: "create", text: 'New', editor: editor, action: () => showmodal()
		//			},
  //                  {
  //                      add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
  //                  },
  //                  {
  //                      extend: "remove", editor: editor
  //                  },
  //                  {
  //                      add: "view", text: 'View', editor: editor, action: () => showmodalview()
  //                  },
		//			{
  //                      add: "dimensionsetup", text: 'Dimension Setup', editor: editor, action: () => window.open("center-dimension.aspx")
  //                  }
  //              ],
         
  //          })
  //      })

		//var showmodal = function () {
  //          $("#myModal").modal('show');
  //      };
		
		//var showmodaledit = function () {
  //          $("#myModalEDIT").modal('show');
  //      };
		
		//var showmodalview = function () {
  //          $("#myModalVIEW").modal('show');
  //      };
		
		
		
    </script>
</asp:Content>