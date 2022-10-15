<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="country-overview.aspx.cs" Inherits="WebAccounts.Administration.country_overview" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Country Master Overview - Inventory Management</title>
     <script type="text/javascript" src="js/country_overview.js"></script>
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
                    <div class="card-body table-responsive">
                    			<!--<strong>Item Code:</strong> Selected item code display <strong>Item Description:</strong> Selected item description display-->
                                <!-- start role table -->
                                <table id="countryoverview" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                                    <thead>
                                        <tr>
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
    <div class="modal fade" id="myModal"  data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Country Master Overview - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Country Code</label>
						</div>
						<div class="col-sm-6">
							  <input type="text" class="form-control" id="txtCode" maxlength="3">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Country Name</label>
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
   

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
       

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