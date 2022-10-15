<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="budget-allocation-rule.aspx.cs" Inherits="WebAccounts.GeneralLedger.budget_allocation_rule" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Budget Allocation Rule</title>
     <script type="text/javascript" src="js/budgetAllocationRule.js"></script>
    <link href="administration.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
    <form runat="server">
             <asp:HiddenField ID="txt" runat="server" ClientIDMode="Static" value="-1"></asp:HiddenField>
        </form>
     <%--   <div class="row">
            <div class="col page-title">
                  <div class="title_left">
                    <h5>Budget Allocation Rule</h5>
                  </div>
                  <div class="title_right">
                    <p><a href="#">Budget Master</a> &raquo; <strong>Budget Allocation Rule</strong></p>
                </div>
            </div>
        </div>--%>
        
        <div class="clearfix"></div>
        
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body table-responsive">
                                <!-- start role table -->
                                <table id="item_table" class="table table-bordered table-hover projects display dataTable width-100">
                                    <thead>
                                        <tr>
                                            <th>Percentage</th>
                                            <th><span id="splbldim1">Dimension 1</span></th>	
                                            <th><span id="splbldim2">Dimension 2</span></th>
                                            <th><span id="splbldim3">Dimension 3</span></th>
                                            <th><span id="splbldim4">Dimension 4</span></th>
                                            <th><span id="splbldim5">Dimension 5</span></th>
                                            <th><span id="splbldim6">Dimension 6</span></th>
                                            <th><span id="splbldim7">Dimension 7</span></th>
                                            <th><span id="splbldim8">Dimension 8</span></th>
                                            <th><span id="splbldim9">Dimension 9</span></th>
                                            <th><span id="splbldim10">Dimension 10</span></th>
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
    <div class="modal fade" id="myModalNEW" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Budget Allocation Rule - New</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Percentage</label>
                            <span class="requ">(*)</span>
						</div>
						<div class="col-sm-6">
						  <input type="number" class="form-control" id="txtpercent"/>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input" id="lbl_dimension_1">Branch</label>
						</div>
						<div class="col-sm-6">
                        	<select id="dddimvale_1">
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input"  id="lbl_dimension_2">Department</label>
						</div>
						<div class="col-sm-6">
                        	<select id="dddimvale_2">
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input"  id="lbl_dimension_3">Dimension 3</label>
						</div>
						<div class="col-sm-6">
                        	<select id="dddimvale_3">
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input"  id="lbl_dimension_4">Dimension 4</label>
						</div>
						<div class="col-sm-6">
                        	<select id="dddimvale_4">
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input"  id="lbl_dimension_5">Dimension 5</label>
						</div>
						<div class="col-sm-6">
                        	<select id="dddimvale_5">
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input"  id="lbl_dimension_6">Dimension 6</label>
						</div>
						<div class="col-sm-6">
                        	<select id="dddimvale_6">
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input"  id="lbl_dimension_7">Dimension 7</label>
						</div>
						<div class="col-sm-6">
                        	<select id="dddimvale_7">
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input"  id="lbl_dimension_8">Dimension 8</label>
						</div>
						<div class="col-sm-6">
                        	<select id="dddimvale_8">
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input"  id="lbl_dimension_9">Dimension 9</label>
						</div>
						<div class="col-sm-6">
                        	<select  id="dddimvale_9">
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input"  id="lbl_dimension_10">Dimension 10</label>
						</div>
						<div class="col-sm-6"  >
                        	<select id="dddimvale_10">
                                <option>--</option>
                                <option>--</option>
                            </select>
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


<%--<!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Budget Allocation Rule - Edit</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Percentage</label>
						</div>
						<div class="col-sm-6">
						  <input type="text" class="form-control"/>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Branch</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Department</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 3</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 4</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 5</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 6</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 7</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 8</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 9</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 10</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
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
    <div class="modal fade" id="myModalVIEW" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Budget Allocation Rule - View</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Percentage</label>
						</div>
						<div class="col-sm-6">
						  <input type="text" class="form-control"/>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Branch</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Department</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 3</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 4</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 5</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 6</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 7</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 8</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 9</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
				   		</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Dimension 10</label>
						</div>
						<div class="col-sm-6">
                        	<select>
                                <option>--</option>
                                <option>--</option>
                            </select>
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
    </div>--%>

    
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
         // use a global for the submit and return data rendering in the examples
 
    //    $(document).ready(function() {
    //        editor = new $.fn.dataTable.Editor( {
    //            table: "#item_table",} );
    //        	$('#item_table').DataTable( {
    //            dom: "Bfrtip",
				////"bPaginate": false,
				////"bLengthChange": false,
    //            //select: false,
				////"bFilter": false,
    //    		//"bInfo": false,
				////"ordering": false,
    //            buttons: [
    //               {
				//		add: "create", text: '<i class="fa fa-plus"></i> Add Row', editor: editor, action: () => showmodal()
				//	},
				//   {
    //                    add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
    //                },
				//	{
    //                    extend: "remove", editor: editor
    //                },
				//	{
    //                    add: "view", text: 'View', editor: editor, action: () => showmodalview()
    //                }
    // //               ,
				//	//{
    // //                   add: "save", text: 'Save', editor: editor
    // //               },
				//	//{
    // //                   add: "cancel", text: 'Cancel', editor: editor
    // //               }
    //            ],
         
    //        })
    //    })
		
		
		

    </script>
</asp:Content>
