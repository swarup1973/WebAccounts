<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="WebAccounts.roles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

        <div class="row">
            <div class="col">
                <p>
                    Administration > Unit of Measurement > <strong>Standard Conversion</strong>
                </p>
            </div>
        </div>
        <div class="clearfix"></div>
        
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                     <!-- start role table -->
                                <div class="clearfix"></div>
                                <table id="unit_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                    <tr>
                                    <th>From Unit</th>
                                    <th>Equals to</th>
                                    <th>To Unit</th>
                                    <th>Factor</th>
                                    <th>Rounding to</th>
                                    </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                            <td>Box</td>
                                            <td>=</td>
                                            <td>Pcs</td>
                                            <td>12.00</td>
                                            <td>Nearest</td>
                                        </tr>
                                      </tbody>
                                </table>
                                <!-- end role table -->
                                <div class="clearfix"></div>
                                <div class="card-body" style="text-align:center">
                                <button type="button" class="btn btn-primary">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">

                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">From Unit</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control">
                                	<option>Box</option>
                                	<option>---</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">To Unit</label>
                            </div>
                            <div class="col-sm-6">
                            	<select class="form-control">
                                	<option>Pcs</option>
                                	<option>---</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Factor</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Rounding to</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control">
                                	<option>Nearest</option>
                                	<option>---</option>
                                </select>
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
    <div class="modal fade" id="myModalEDIT" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">

                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">From Unit</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control">
                                	<option>Box</option>
                                	<option>---</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">To Unit</label>
                            </div>
                            <div class="col-sm-6">
                            	<select class="form-control">
                                	<option>Pcs</option>
                                	<option>---</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Factor</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Rounding to</label>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control">
                                	<option>Nearest</option>
                                	<option>---</option>
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

<!-- Modal HTML Show -->
    <div class="modal fade" id="myModalSHOW" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Conversion Calculation</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
						<table id="unit_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                    <tr>
                                    <th>From Unit Qty.</th>
                                    <th>From Unit Code</th>
                                    <th>Equals to</th>
                                    <th>To Unit Qty.</th>
                                    <th>To Unit Code</th>
                                    </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                          	<td>--</td>
                                            <td>--</td>
                                            <td>=</td>
                                            <td>--</td>
                                            <td>--</td>
                                        </tr>
                                      </tbody>
                                </table>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
                table: "#unit_table",} );
            $('#unit_table').DataTable( {
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
                        add: "delete", text: 'Delete', editor: editor
                    },
					{
						//add: "show", text: 'Show Conversion', editor: editor, action: () => window.open("#")
						add: "show", text: 'Show Conversion', editor: editor, action: () => showmodalshow()
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
		var showmodalshow = function () {
            $("#myModalSHOW").modal('show');
        };
		

	
		
    </script>
</asp:Content>
