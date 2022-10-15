<%@ Page Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="branch-responsibility-center-overview.aspx.cs" Inherits="WebAccounts.Administration.branch_responsibility_center_overview" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/branch_responsibility_center_overview.js"></script>
    <title>Branch Responsibility Center Overview</title>
    <link href="administration.css" rel="stylesheet" />

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
                        <table id="addressbook" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Block</th>
                                    <th>Close</th>
                                </tr>
                            </thead>

                        </table>
                        <!-- end role table -->

                        <!--<div class="clearfix"></div>
                                <div class="card-body" style="text-align:center">
                                <button type="button" class="btn btn-primary">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-xl" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Branch/Responsibility Center Overview - New</h5>
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
                                Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtCode" />
                            </div>
                            <div class="col-sm-3">
                                Country
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtCountry" disabled />
                            </div>
                            <div class="col-sm-3">
                                Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtName" />
                            </div>
                            <div class="col-sm-3">
                                County
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtState" disabled />
                            </div>
                            <div class="col-sm-3">
                                Address Line-1
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtAddress1" />
                            </div>
                            <div class="col-sm-3">
                                Branch Dimension Value
                            </div>
                            <div class="col-sm-3">
                                <select id="ddBranchDimension">
                                    <option>--Selection--</option>

                                </select>
                            </div>
                            <div class="col-sm-3">
                                Address Line-2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtAddress2" />
                            </div>
                            <div class="col-sm-3">
                                Warehouse/Location
                            </div>
                            <div class="col-sm-3">
                                <select id="ddLocation">
                                    <option>--Selection--</option>

                                </select>
                            </div>
                             <div class="col-sm-3">
                                Post Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPostCode" onblur="getPostCodeDetails();" maxlength="8" />
                                <input type="button" value="search" onclick="showmodalpincode();" />
                                <input type="text" id="txtPostId" style="display: none;" value="-1" />
                            </div>
                            <div class="col-sm-3">
                                Block
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkBlock" />
                            </div>
                            <div class="col-sm-3">
                                City
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtCity" disabled />
                            </div>
                           
                            <div class="col-sm-3">
                                Close
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="chkClose" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Contact Information</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Contact Person
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPerson" />
                            </div>
                            <div class="col-sm-3">
                                Fax No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtFax" />
                            </div>
                            <div class="col-sm-3">
                                Phone No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPhone" />
                            </div>
                            <div class="col-sm-3">
                                Email
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtEmail" />
                            </div>
                            <div class="col-sm-3">
                                Alternate Phone No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPhome1" />
                            </div>
                            <div class="col-sm-3">
                                Website
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtWeb" />
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


    <!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-xl" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Branch/Responsibility Center Overview - Edit</h5>
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
                                Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Country
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                County
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Address Line-1
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Branch Dimension Value
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Address Line-2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Warehouse/Location
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                City
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Block
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" />
                            </div>
                            <div class="col-sm-3">
                                Post Code
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Close
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Contact Information</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Contact Person
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
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal HTML VIEW -->
    <div class="modal fade" id="myModalVIEW" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-xl" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Branch/Responsibility Center Overview -  View</h5>
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
                                Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Country
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                County
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Address Line-1
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Branch Dimension Value
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Address Line-2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Warehouse/Location
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                City
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Block
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" />
                            </div>
                            <div class="col-sm-3">
                                Post Code
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Close
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Contact Information</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Contact Person
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
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
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

        $(document).ready(function () {
            editor = new $.fn.dataTable.Editor({
                table: "#budget_table",
            });
            $('#budget_table').DataTable({
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
                    },
                    {
                        add: "close", text: 'Close', editor: editor
                    },
                    {
                        add: "block", text: 'Block', editor: editor
                    },
                    {
                        add: "dimension", text: 'Dimension Setup', editor: editor, action: () => window.open("center-dimension.aspx")
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
        var showmodalpincode = function () {
            $('#myModalPincode .modal-title').html('Pincode Search');
            $("#myModalPincode").modal('show');
        };


    </script>
</asp:Content>

