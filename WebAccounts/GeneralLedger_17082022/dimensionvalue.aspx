<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="dimensionvalue.aspx.cs" Inherits="WebAccounts.dimensionvalue" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>    
    <script type="text/javascript" src="js/dimensionvalue.js"></script>    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="row">
			<div class="col">
				<p>
					General Ledger
					>
					Setups
					>
					<a href="dimension.aspx" class="text-dark page_path_link">Dimension Set up</a>
					>
					Dimension Value
				</p>
			</div>
		</div>
	<div class="row">
		<div class="col">
        <div class="page-title">
            <div class="title_left">
                <h3 id ="h3">Dimension Value for Department</h3>
            </div>
        </div>
		</div>
	</div>	

  <div class="row">
      <div class="col">
            <div class="card">
			  <div class="card-body" style="overflow-x:auto;">
					<!-- start Users table -->
                    <table id="dimension_table_value"
                      class="table table-striped table-hover table-condensed projects display datatable width-100" style="white-space: Nowrap;">
                      
                    </table>
                <!-- end Accounts list -->
					
                </div>
        </div>
      </div>
    </div>

<!-- Modal HTML NEW -->
  <%--  <div class="modal fade" id="myModalNEW" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add New Dimension Value</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Code</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control">
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Name (Caption)</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control">
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Description</label>
						</div>
						<div class="col-sm-6">
							<textarea class="form-control"></textarea>
						</div>
					</div>

                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Blocked</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox"/>
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
    </div>--%>

<!-- Modals -->	
	<div class="modal fade" id="myModalEDIT" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="h5">Edit Dimension Value</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Code</label>
						</div>
						<div class="col-sm-6">
							<input type="text" id="dmvalcode" class="form-control" value="">
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Name (Caption)</label>
						</div>
						<div class="col-sm-6">
							<input type="text" id="dmvalname" class="form-control" value="">
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Description</label>
						</div>
						<div class="col-sm-6">
							<textarea class="form-control" id="dmvalDept"></textarea>
						</div>
					</div>

                    <div class="form-group row" id="divvalblock">
						<div class="col-sm-6">
							<label for="input">Blocked</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox" id="chkBlock"/>
						</div>
					</div>
 
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick ="SaveRow()">Save</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    
                </div>
				</form>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <link href="generalledger.css" rel="stylesheet" />
</asp:Content>
