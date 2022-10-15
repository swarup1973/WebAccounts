<%@ Page Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="unit-of-measurement.aspx.cs" Inherits="WebAccounts.InventoryManagement.unit_of_measurement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/UOM.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

        <div class="row">
            <div class="col">
                <p>
                    Administration > <strong>Unit of Measurement</strong>
                </p>
            </div>
        </div>
        <div class="clearfix"></div>
        
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                     <!-- start role table -->
                     <%--<select id="subjects">
                     <option value="standard-conversion">Standard</option>
                     <option value="item-specific-conversion">Item Specific</option>
                     </select> <input class="SubmitButton" type="button" value="Unit Conversion" onclick="showPage()" />
                     <script type = "text/javascript">
                         
                     </script>--%>
                                <div class="clearfix"></div>
                                <%--<table id="unit_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">--%>
                                 <table id="unit_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                    <tr>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th>Decimal Precision</th>
                                    <th>Block</th>
                                    </tr>
                                    </thead>
                                     <tbody>
                                          
                                      </tbody>
                                </table>
                                <!-- end role table -->
                                <div class="clearfix"></div>
                                <%--<div class="card-body" style="text-align:center">
                                <button type="button" class="btn btn-primary">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>--%>
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
                                <label for="input">Code</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txtCode">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Description</label>
                            </div>
                            <div class="col-sm-6">
                            	<textarea class="form-control" id="txtDesc"></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Decimal Precision</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="number" class="form-control" id="txtDecimal">
                            </div>
                        </div>
                        <div class="form-group row" id="div_block">
                            <div class="col-sm-6">
                                <label for="input">Block</label>
                            </div>
                            <div class="col-sm-6">
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
    
<!-- Modal HTML EDIT -->
    <%--<div class="modal fade" id="myModalEDIT" data-keyboard="false" data-backdrop="static">
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
                                <label for="input">Code</label>
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
                                <label for="input">Decimal Precision</label>
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

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <link href="../Administration/administration.css" rel="stylesheet" />
    <script type="text/javascript">
        //let editor; // use a global for the submit and return data rendering in the examples

        //$(document).ready(function () {
        //    editor = new $.fn.dataTable.Editor({
        //        table: "#unit_table",
        //    });
        //    $('#unit_table').DataTable({
        //        dom: "Bfrtip",

        //        select: true,
        //        buttons: [
        //            {
        //                add: "create", text: 'New', editor: editor, action: () => showmodal()
        //            },
        //            {
        //                add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
        //            },
        //            {
        //                add: "delete", text: 'Delete', editor: editor
        //            },
        //            {
        //                add: "wizard", text: 'Unit Creation Wizard ', editor: editor, action: () => window.open("#")
        //            },
        //            {
        //                add: "wizard", text: 'Standard Unit Conversion', editor: editor, action: () => showPage('standard-conversion')
        //            },
        //            {
        //                add: "wizard", text: 'Item Specific Conversion', editor: editor, action: () => showPage('item-specific-conversion')
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

        //function showPage(value) {
        //    //var sel = document.getElementById('subjects');
        //    var option = value;//sel.options[sel.selectedIndex].value;
        //    window.open(option + ".aspx");
        //}


    </script>
</asp:Content>
