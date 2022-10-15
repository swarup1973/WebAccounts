<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="dimensionset.aspx.cs" Inherits="WebAccounts.dimensionset" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/dimension.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
	<div class="row">
		<div class="col">
        <div class="page-title">
            <div class="title_left">
                <h3>Dimension Set</small></h3>
            </div>
        </div>
		</div>
	</div>	

  <div class="row">
      <div class="col">
            <div class="card">
			  <div class="card-body" style="overflow-x:auto;">
					<!-- start Users table -->
                    <table id="dimensionset_table"
                      class="table table-striped table-hover table-condensed projects display datatable width-100">
                      <%--<thead>
                        <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Branch</th>
                        <th>Department</th>
                        <th>Dim3</th>
                        <th>Dim4</th>
                        <th>Dim5</th>
                        <th>Dim6</th>
                        <th>Dim7</th>
                        <th>Dim8</th>
                        <th>Dim9</th>
                        <th>Dim10</th>
                        <th>Block</th>
					    </tr>
					   </thead>
					   <tbody>
						  <tr>
                        <td>12345</td>
                        <td>Dept+Branch+Area</td>
                        <td>Yes</td>
                        <td>Yes</td>
                        <td>Yes</td>
                        <td>No</td>
                        <td>Yes</td>
                        <td>No</td>
                        <td>No</td>
                        <td>No</td>
                        <td>No</td>
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
    <div class="modal fade" id="myModalNEW" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="DimSetTitle">Add Dimension Set</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Code</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="txt_dimSetCode">
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Name</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="txt_dimSetName">
						</div>
					</div>
                    
                   <div class="form-group row">
						<div class="col-sm-6">
							<label for="input" id="lbl_dim1">Branch</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox" id="chk_dim1_Branch"/>
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input" id="lbl_dim2">Department</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox" id="chk_dim2_Dept"/>
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input" id="lbl_dim3">Dimension-3</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox" id="chk_dim3"/>
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input" id="lbl_dim4">Dimension-4</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox" id="chk_dim4"/>
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input" id="lbl_dim5">Dimension-5</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox" id="chk_dim5"/>
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input" id="lbl_dim6">Dimension-6</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox" id="chk_dim6"/>
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input" id="lbl_dim7">Dimension-7</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox" id="chk_dim7"/>
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input" id="lbl_dim8">Dimension-8</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox" id="chk_dim8"/>
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input" id="lbl_dim9">Dimension-9</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox" id="chk_dim9"/>
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input" id="lbl_dim10">Dimension-10</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox" id="chk_dim10"/>
						</div>
					</div>
                    
                    <div class="form-group row" id="divdimset">
						<div class="col-sm-6">
							<label for="input">Block</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox" id="chk_Isenabled"/>
						</div>
					</div>
 
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick ="SaveSetRow()">Save</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    
                </div>
				</form>
            </div>
        </div>
    </div>
											


</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
	<link href="generalledger.css" rel="stylesheet" />
    <script type="text/javascript">
        $(document).ready(function () {
                DimObject.do_loaddimensionsetlist();
        });
    </script>
</asp:Content>
