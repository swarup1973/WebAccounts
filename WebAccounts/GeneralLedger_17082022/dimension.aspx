<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="dimension.aspx.cs" Inherits="WebAccounts.dimension" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/dimension.js"></script>    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
<div class="row">
	<div class="col">
    <div class="page-title">
        <div class="title_left">
            <h3>Dimension <small>Listing page</small></h3>
        </div>
    </div>
	</div>
</div>	

<div class="row">
    <div class="col">
        <div class="card">
			<div class="card-body" style="overflow-x:auto;">
				<!-- start Users table -->
                <table id="dimension_table"
                    class="table table-striped table-hover table-condensed projects display datatable width-100">
                    <%--<thead>
                    <tr>
						<th>Code</th>
						<th>Name (Caption)</th>
						<th>Description</th>
						<th>Applicable for Access Control</th>
                        <th>All Balance Sheet Ledgers</th>
                        <th>All Income Ledgers</th>
                        <th>All Expense Ledgers</th>
                        <th>All Opening Ledgers</th>
                        <th>Blocked</th>
					</tr>
					</thead>
					<tbody>
						<tr>
						<td>Branch</td>
						<td>Department</td>
                        <td>Department Department Department</td>
						<td>No</td>
						<td>No</td>
						<td>Yes</td>
                        <td>Yes</td>
                        <td>No</td>
                        <td>No</td>
					</tr>
                    </tbody>--%>
                </table>
            <!-- end Accounts list -->
					
            </div>
    </div>
    </div>
</div>

<!-- Modal HTML NEW -->
<%--<div class="modal fade" id="myModalNEW" tabindex="-1">
    <div class="modal-dialog" style="height:100%;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add New Dimension</h5>
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
						<label for="input">Applicable for Access Control</label>
					</div>
					<div class="col-sm-6">
						<input type="checkbox"/>
					</div>
				</div>
                    
                <div class="form-group row">
					<div class="col-sm-6">
						<label for="input">All Balance Sheet Ledgers</label>
					</div>
					<div class="col-sm-6">
						<input type="checkbox"/>
					</div>
				</div>
                    
                <div class="form-group row">
					<div class="col-sm-6">
						<label for="input">All Income Ledgers</label>
					</div>
					<div class="col-sm-6">
						<input type="checkbox"/>
					</div>
				</div>
                    
                <div class="form-group row">
					<div class="col-sm-6">
						<label for="input">All Expense Ledgers</label>
					</div>
					<div class="col-sm-6">
						<input type="checkbox"/>
					</div>
				</div>
                    
                <div class="form-group row">
					<div class="col-sm-6">
						<label for="input">All Opening Ledgers</label>
					</div>
					<div class="col-sm-6">
						<input type="checkbox"/>
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
                <h5 class="modal-title" id="dmTitle">Edit Dimension</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
			<form>
            <div class="modal-body">
				<div class="form-group row">
					<div class="col-sm-6">
						<label for="input">Code</label>
					</div>
					<div class="col-sm-6">
						<input type="text" class="form-control" id="txt_dimCdedit">
					</div>
				</div>
                    
                <div class="form-group row">
					<div class="col-sm-6">
						<label for="input">Name (Caption)</label>
					</div>
					<div class="col-sm-6">
						<input type="text" class="form-control" id="txt_dimCaption">
					</div>
				</div>
                    
                <div class="form-group row">
					<div class="col-sm-6">
						<label for="input">Description</label>
					</div>
					<div class="col-sm-6">
						<textarea class="form-control" id="txt_description"></textarea>
					</div>
				</div>
                    
                <div class="form-group row">
					<div class="col-sm-6">
						<label for="input">Applicable for Access Control</label>
					</div>
					<div class="col-sm-6">
						<input type="checkbox"/ id="chkaccesscontrol">
					</div>
				</div>
                    
                <div class="form-group row">
					<div class="col-sm-6">
						<label for="input">All Balance Sheet Ledgers</label>
					</div>
					<div class="col-sm-6">
						<input type="checkbox"/ id="chkbalsheetledger">
					</div>
				</div>
                    
                <div class="form-group row">
					<div class="col-sm-6">
						<label for="input">All Income Ledgers</label>
					</div>
					<div class="col-sm-6">
						<input type="checkbox"/ id="chkincomeledger">
					</div>
				</div>
                    
                <div class="form-group row">
					<div class="col-sm-6">
						<label for="input">All Expense Ledgers</label>
					</div>
					<div class="col-sm-6">
						<input type="checkbox"/ id="chkexpanseledger">
					</div>
				</div>
                    
                <div class="form-group row">
					<div class="col-sm-6">
						<label for="input">All Opening Ledgers</label>
					</div>
					<div class="col-sm-6">
						<input type="checkbox"/ id="chkopeningledger">
					</div>
				</div>
                    
                <div class="form-group row" id="divblock">
					<div class="col-sm-6">
						<label for="input">Blocked</label>
					</div>
					<div class="col-sm-6">
						<input type="checkbox"/ id="chkblocked">
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
<%--<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {
            DimObject.do_loaddimensionlist();

            $('#btn_newdimension').on('click', function () {
                DimensionObject.dimension.dimId = "";
                window.location.href = "dimensionnew.aspx";
            });

        });

    </script>
</asp:Content>--%>

<asp:Content ID="Content4" ContentPlaceHolderID="contentfooter" runat="Server">
	<link href="generalledger.css" rel="stylesheet" />
    <script type="text/javascript">
        let editor; // use a global for the submit and return data rendering in the examples

		$(document).ready(function () {
			DimObject.do_loaddimensionlist();
        });
    </script>
</asp:Content>
