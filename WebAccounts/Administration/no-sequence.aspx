<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="no-sequence.aspx.cs" Inherits="WebAccounts.no_sequence" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
     <script type="text/javascript" src="js/no_sequence.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

        <div class="row">
            <div class="col">
                <p>
                    Administration
					>
					Setup 
					>
					<strong>No. Sequence</strong>
                </p>
            </div>
        </div>
        <div class="clearfix"></div>
        
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                <table id="no_sequence_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                    <tr>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Starting No.</th>
                                    <th>Ending No.</th>
                                    <th>No. Interval</th>
                                    <th>Prefix</th>
                                    <th>Suffix</th>
                                    <th>Display No Sequence</th>
                                    <th>Manual</th>
                                    <th>Close</th>
                                    <th>Block</th>
                                    <th>Relation Exists</th>
                                    <th>Last No Used</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                          
                                    </tbody>
                                </table>
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>

<!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">No. Sequence - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">

                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Code</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txtCode"> 
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Description</label>
                            </div>
                            <div class="col-sm-3">
                                <textarea class="form-control"  id="txtDesc"></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Start Date</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="date" class="form-control" id="txtStartDate">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">End Date</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="date" class="form-control" id="txtEndDate"/>
                            </div>
                        </div>
                        <div class="form-group row">
                        	<div class="col-sm-3">
                                <label for="input">Starting No.</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" name="number" id="txtStartNo">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Ending No.</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" name="number" id="txtEndNo">
                            </div>
                            
                        </div>
                        <div class="form-group row">
                        <div class="col-sm-3">
                                <label for="input">No. Interval</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" name="number" id="txtNoInterval">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Prefix</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txtPrefix">
                            </div>
                            
                        </div>
                        <div class="form-group row">
                        <div class="col-sm-3">
                                <label for="input">Suffix</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txtSuffix">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Manual</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control" id="chkManual">
                            </div>
                            
                        </div>
                         <div class="form-group row" id="editsection">
                         <div class="col-sm-3">
                                <label for="input">Close</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control" id="chkClose">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Block</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control" id="chkBlock">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="savedata();">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <!-- Modal HTML NEW -->
    <%--<div class="modal fade" id="myModalEDIT" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">No. Sequence - Edit</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">

                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Code</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Description</label>
                            </div>
                            <div class="col-sm-3">
                                <textarea class="form-control"></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Start Date</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="date" class="form-control">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">End Date</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="date" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                        	<div class="col-sm-3">
                                <label for="input">Starting No.</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Ending No.</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control">
                            </div>
                            
                        </div>
                        <div class="form-group row">
                        <div class="col-sm-3">
                                <label for="input">No. Interval</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Prefix</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control">
                            </div>
                            
                        </div>
                        <div class="form-group row">
                        <div class="col-sm-3">
                                <label for="input">Suffix</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Manual</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control">
                            </div>
                            
                        </div>
                         <div class="form-group row">
                         <div class="col-sm-3">
                                <label for="input">Close</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Block</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control">
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

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <link href="../Administration/administration.css" rel="stylesheet" />
    <script type="text/javascript">
        
        //let editor; // use a global for the submit and return data rendering in the examples

        //$(document).ready(function () {
        //    editor = new $.fn.dataTable.Editor({
        //        table: "#budget_register_table",
        //    });
        //    $('#budget_register_table').DataTable({
        //        dom: "Bfrtip",

        //        select: true,
        //        buttons: [
        //            {
        //                add: "create", text: 'New', editor: editor, action: () => showmodal()
        //            },
        //            {
        //                add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
        //            },
        //            //{
        //            //    add: "save", text: 'Save', editor: editor
        //            //},
        //            {
        //                extend: "remove", editor: editor
        //            },
        //            {
        //                add: "nosequencerelation", text: 'No Sequence Relation', editor: editor, action: () => window.open("no-sequence-relation.aspx")
        //            }
        //        ],

        //    })
        //})

        //var showmodal = function () {
        //    $("#myModal").modal('show');
        //};

        //var showmodaledit = function () {
        //    $("#myModalEDIT").modal('show');
        //};


    </script>
</asp:Content>
