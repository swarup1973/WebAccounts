<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="fiscal_year.aspx.cs" Inherits="WebAccounts.fiscal_year" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js"></script>
    <script type="text/javascript" src="js/fiscal_year.js"></script>    
    <script type="text/javascript" src="../Scripts/CommonFunction.js"></script> 
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
	<div class="row">
		<div class="col">
        <div class="page-title">
            <div class="title_left">
                <h3>Fiscal Year</h3>
            </div>
        </div>
		</div>
	</div>	

  <div class="row">
      <div class="col">
            <div class="card">
			  <div class="card-body">
					<!-- start Users table -->
                    <table id="fiscal_year_table"
                      class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                      <%--<thead>
                        <tr>
							<th>Starting Date</th>
							<th>Period Name</th>
							<th>New Fiscal Year</th>
							<th>Closed</th>
                            <th>Period Locked</th>
					    </tr>
					   </thead>
					   <tbody>
						  <tr>
							<td><input
                  name="starting_date_display"
                  type="date"
                  id="starting_date_display"
                  class="form-control" readonly="readonly"
                /></td>
							<td><input
                  type="text"
                  maxlength="60"
                  name="period_name_display"
                  id="period_name_display"
                  class="form-control" readonly="readonly"
                /></td>
							<td><input type="checkbox" checked="checked" disabled="disabled" /></td>
							<td><input type="checkbox" checked="checked" disabled="disabled" /></td>
							<td><input type="checkbox" checked="checked" disabled="disabled" /></td>
						</tr>
                      </tbody>--%>
                    </table>
                <!-- end Accounts list -->
					
                </div>
        </div>
      </div>
    </div>

<!-- Modal HTML EDIT -->
<div class="modal fade" id="myModalDELETE" tabindex="-1">
        <div class="modal-dialog modal-lg" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title">Delete Transaction Period</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
                	<div class="form-group row">
						<div class="col-sm-12">
							<%--<input type="checkbox"  /> Datewise--%> 
						</div>
					</div>
                    
					<div class="form-group row">
						<div class="col-sm-12">
							From Date: <input type="date" id="del_s_date"> 
                            To Date: <input type="date" id="del_e_date"> 
                            <button type="button" class="btn btn-primary" id="d_search" onclick="showmodalsearch()">Search</button>
						</div>
					</div>
                </div>
                
				<table id="cheque_register_table"  class="table table-striped table-hover table-condensed projects display datatable width-100">
                <%--<thead>
                	<tr>
                       <th>Select</th>
                       <th>Start Date</th>
                       <th>Period Name</th>
                     </tr>
                </thead>
                <tbody>
                    <tr>
                       <td><input type="checkbox" name="select" /></td>
                       <td>01/04/2021</td>
                       <td>For the Week 28/03/2021-03/04/2021</td>
					</tr>
                    <tr>
                       <td><input type="checkbox" name="select" /></td>
                       <td>04/04/2021</td>
                       <td>For the Week 04/04/2021-10/04/2021</td>
					</tr>
                    <tr>
                       <td><input type="checkbox" name="select" /></td>
                       <td>18/04/2021</td>
                       <td>For the Week 18/04/2021-24/04/2021</td>
					</tr>
                    <tr>
                       <td><input type="checkbox" name="select" /></td>
                       <td>25/04/2021</td>
                       <td>For the Week 25/04/2021-01/05/2021</td>
					</tr>
                    <tr>
                       <td><input type="checkbox" name="select" /></td>
                       <td>02/05/2021</td>
                       <td>For the Week 02/05/2021-08/05/2021</td>
					</tr>
                 </tbody>--%>
                 </table>                
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="del_popup" onclick ="DeleteRow()">Delete</button>
                    <button type="button" class="btn btn-secondary" id="can_popup" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>
        </div>
    </div>
    <%--<div class="modal fade" id="myModalEDIT" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Starting Date</label>
						</div>
						<div class="col-sm-6">
							<input type="date" class="form-control" id="startdate"/>
						</div>
					</div>
                    
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Period Name</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control">
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
	<div id="myModal" class="modal fade" role="dialog">
		<div class="modal-dialog modal-lg">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
                <h4 class="modal-title">Create Fiscal Year</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					
				</div>
				<div class="modal-body">
				  <p class="text-left"><span class="required-asterisk">*</span> indicates a required field.</p>
				  <table class="table table-condensed">
            <tr class="genjournal_line_modal_tr">
                <th class="">Starting Date</th>
                <th class="">No. of Periods</th>
                <th class="">Period Length</th>
            </tr>
             <tr class="">
                <td class="">
                    <input
                        type="date"
                        name="create_fiscal_year_input"
                        class="form-control"
                        id="txtstartdate"
                    >
                </td>
                <td class="">
                    <input
                        type="number"
                        name="number_of_periods_input"
                        class="form-control"
                        id="txtnoofperiod"
                    >
                </td>
                <td class="">
                    <select name="period_length_input" class="form-control" id="ddlperiodlength">
                        <option value="D">Day</option>
                        <option value="W">Week</option>
                        <option value="M">Month</option>
                        <option value="Q" >Quarter</option>
                    </select>
                </td>
				    </table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal" onclick ="SaveRow()">OK</button>
					<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
				</div>
			</div>
		</div>
	</div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <input id="hidtxtDateSeperator" runat="server" type="hidden" value="/" />
    <input id="hidtxtDateFormat" runat="server" type="hidden" value="dd-mm-yyyy" />
    <script type="text/javascript">
        var FsDateFormat = document.getElementById('<%=hidtxtDateFormat.ClientID%>').value;
        var FsDateSeperator = document.getElementById('<%=hidtxtDateSeperator.ClientID%>').value;

        let editor; // use a global for the submit and return data rendering in the examples

        $(document).ready(function () {
            FinObject.do_loadfiacalyear();
        });
    </script>
    <%--<script type="text/javascript">
        let editor; // use a global for the submit and return data rendering in the examples

        $(document).ready(function () {
            editor = new $.fn.dataTable.Editor({
                table: "#fiscal_year_table",
            });
            $('#fiscal_year_table').DataTable({
                dom: "Bfrtip",

                select: true,
                buttons: [
                    /*{
                        add: "create", text: 'New', editor: editor, action: () =>
                            showmodal()
                    },*/
                    {
                        text: 'Create Fiscal Year',
                        action: function (e, dt, node, config) {
                            $('#myModal').modal('show')
                        }
                    },
                    {
                        add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit("")
                    },
                    {
                        extend: "remove", editor: editor
                    },

                    
                    /*{
                        extend: "selectedSingle", text: "Close Fiscal Year",
                    },*/
                ]
            });
        });

        var showmodal = function () {
            $("#myModal").modal('show');
        };
        var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };


    </script>--%>
</asp:Content>
