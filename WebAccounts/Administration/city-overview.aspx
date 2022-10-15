<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="city-overview.aspx.cs" Inherits="WebAccounts.Administration.city_overview" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>City Master Overview - Inventory Management</title>
         <script type="text/javascript" src="js/city_overview.js"></script>
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
                     <p id="hid" style="font-weight : bold;"></p>
                    <div class="card-body table-responsive">
                    			<!--<strong>Item Code:</strong> Selected item code display <strong>Item Description:</strong> Selected item description display-->
                                <!-- start role table -->
                                <table id="cityoverview" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th>City Code</th>
                                            <th>City Name</th>
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
                    <h5 class="modal-title">City Master Overview - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
                     <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Country</label>
						</div>
						<div class="col-sm-6">
							 <label id="lblCountry"></label>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">City Code</label>
						</div>
						<div class="col-sm-6">
							  <input type="text" class="form-control" id="txtCode" maxlength="20">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">City Name</label>
						</div>
						<div class="col-sm-6">
							  <input type="text" class="form-control" id="txtName">
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
    <div class="modal fade" id="myModalEDIT"  data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">City Master Overview - Edit</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">City Code</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control" >
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">City Name</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control" >
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

<!-- Modal HTML VIEW -->
    <div class="modal fade" id="myModalVIEW"  data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">City Master Overview - View</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">City Code</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control" >
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">City Name</label>
						</div>
						<div class="col-sm-6">
							 <input type="text" class="form-control" >
						</div>
					</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">OK</button>
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


