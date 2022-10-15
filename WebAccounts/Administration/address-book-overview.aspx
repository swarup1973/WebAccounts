<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="address-book-overview.aspx.cs" Inherits="WebAccounts.Administration.address_book_overview" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Address Book Overview</title>
      <script type="text/javascript" src="js/addressbookmain.js"></script>
      <link href="administration.css" rel="stylesheet" />
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
                                            <th>Address Code</th>
                                            <th>Address Name</th>
                                            <th>Country Code</th>
                                            <th>Country Name</th>
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
                 <h5 class="modal-title">Address Book Overview - New</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							Address Code
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="txtCode" maxlength="20">
						</div>
                        <div class="col-sm-6">
							Address Name
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control" id="txtName">
						</div>
						<div class="col-sm-6">
							Country Code
						</div>
						<div class="col-sm-6">
							<select class="form-control" id="ddCountry" onchange="getCountryName();">
                              </select>
						</div>
						<div class="col-sm-6">
							Country Name
						</div>
						<div class="col-sm-6">
							<input type="text" disabled="disabled" id="txtCountry"/>
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
                 <h5 class="modal-title">Address Book Overview - Edit</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
												<div class="col-sm-6">
							Address Code
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                        <div class="col-sm-6">
							Address Name
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
						<div class="col-sm-6">
							Country Code
						</div>
						<div class="col-sm-6">
							<select name="select9">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
						</div>
						<div class="col-sm-6">
							Country Name
						</div>
						<div class="col-sm-6">
							<input type="text" disabled="disabled"/>
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
                 <h5 class="modal-title">Address Book Overview - View</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
												<div class="col-sm-6">
							Address Code
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
                        <div class="col-sm-6">
							Address Name
						</div>
						<div class="col-sm-6">
							<input type="text"/>
						</div>
						<div class="col-sm-6">
							Country Code
						</div>
						<div class="col-sm-6">
							<select name="select9">
                            <option>--</option>
                            <option>--</option>
                            <option>...</option>
                            <option>...</option>
                          </select>
						</div>
						<div class="col-sm-6">
							Country Name
						</div>
						<div class="col-sm-6">
							<input type="text" disabled="disabled"/>
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


