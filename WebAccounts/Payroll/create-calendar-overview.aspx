<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="create-calendar-overview.aspx.cs" Inherits="WebAccounts.Payroll.create_calendar_overview" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Create Calendar Overview</title>
    <script type="text/javascript" src="js/createcalendar.js"></script>
    <style>
        .requ {
            color: #F00;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
         <form runat="server">
            <asp:HiddenField ID="txt" runat="server" ClientIDMode="Static" value="-1"></asp:HiddenField>
        </form>
        <div class="row">
            <div class="col">
                <p>
                   Calendar
					>
                    <strong>Create Calendar Overview</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                    <p>Calendar Code: <strong><span id="spcalendarcode"></span></strong><br />
Calendar Ddescription: <strong><span id="spcalendarcodedesc"></span></strong></p>
                    <!-- start role table -->
                                <table id="item_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                        </tr>
                                    </thead>
                                    <%-- <tbody>
                                          <tr>
                                            <td>--</td>
                                            <td>--</td>
                                        </tr>
                                        <tr>
                                            <td>--</td>
                                            <td>--</td>
                                        </tr>
                                        <tr>
                                            <td>--</td>
                                            <td>--</td>
                                        </tr>
                                      </tbody>--%>
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
                 <h5 class="modal-title">Create Calendar Overview - New</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							Start Date  <span class="requ">(*)</span>
						</div>
						<div class="col-sm-6">
							<input id="startdate" class="date-picker form-control col-md-7 col-xs-12"/>
						</div>
                    </div>
                    <div class="form-group row">
						<div class="col-sm-6">
							End Date  <span class="requ">(*)</span>
						</div>
						<div class="col-sm-6">
							<input  id="enddate" class="date-picker form-control col-md-7 col-xs-12"/>
						</div>
                    </div>
				</div>	
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary"  onclick="savedata();" id="btnSave">Add</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
			  </form>
            </div>
        </div>
    </div>

    <!-- Modal HTML Edit -->
    <%--<div class="modal fade" id="myModalEDIT" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Create Calendar Overview - Edit</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							Start Date
						</div>
						<div class="col-sm-6">
							<input type="date"/>
						</div>
                    </div>
                    <div class="form-group row">
						<div class="col-sm-6">
							End Date
						</div>
						<div class="col-sm-6">
							<input type="date"/>
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
    </div>--%>

    <!-- Modal HTML View -->
  <%--  <div class="modal fade" id="myModalVIEW" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title">Create Calendar Overview - View</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							Start Date
						</div>
						<div class="col-sm-6">
							<input type="date"/>
						</div>
                    </div>
                    <div class="form-group row">
						<div class="col-sm-6">
							End Date
						</div>
						<div class="col-sm-6">
							<input type="date"/>
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
    </div>--%>
           
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
        let editor; // use a global for the submit and return data rendering in the examples
        $(document).ready(function () {
            var start = moment().add(1, 'days');
            //alert(start);
            $('#startdate').daterangepicker({
                locale: {
                    //format: 'DD-MMM-YYYY'
                },
                // startDate: start,
                autoUpdateInput: false,
                showDropdowns: true,
                singleDatePicker: true,
                calender_style: "picker_4"
                //,drops: "up"
                //minDate: start//new Date()
            }, function (start, end, label) {
                console.log(start.toISOString(), end.toISOString(), label);
            });
            $('#startdate').on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('DD-MMM-YYYY'));
            });

            $('#enddate').daterangepicker({
                locale: {
                    //format: 'DD-MMM-YYYY'
                },
                // startDate: start,
                autoUpdateInput: false,
                showDropdowns: true,
                singleDatePicker: true,
                calender_style: "picker_4"
                //,drops: "up"
                //minDate: start//new Date()
            }, function (start, end, label) {
                console.log(start.toISOString(), end.toISOString(), label);
            });

            $('#enddate').on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('DD-MMM-YYYY'));
            });




        })
     //   $(document).ready(function() {
     //       editor = new $.fn.dataTable.Editor( {
     //           table: "#item_table",} );
     //       $('#item_table').DataTable( {
     //           dom: "Bfrtip",

     //           select: true,
     //           buttons: [
					//{
					//	add: "create", text: 'Create New', editor: editor, action: () => showmodal()
					//},
     //               {
     //                   add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
     //               },
					//{
     //                   add: "view", text: 'View', editor: editor, action: () => showmodalview()
     //               },
					//{
     //                   extend: "remove", editor: editor
     //               },
					//{
     //                   add: "calendar", text: 'Create Working Calendar', editor: editor, action: () => window.open("working-time-calendar.aspx")
     //               }
     //           ],
         
     //       })
     //   })

        var showmodal = function () {
            $("#myModal").modal('show');
        };
		//var showmodaledit = function () {
  //          $("#myModalEDIT").modal('show');
  //      };
		//var showmodalview = function () {
  //          $("#myModalVIEW").modal('show');
  //      };


    </script>
</asp:Content>


