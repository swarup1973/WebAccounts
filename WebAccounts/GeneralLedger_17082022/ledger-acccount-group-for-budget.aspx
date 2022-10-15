<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="ledger-acccount-group-for-budget.aspx.cs" Inherits="WebAccounts.GeneralLedger.ledger_acccount_group_for_budget" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Ledger Account Group for Budget</title>
        	 <script type="text/javascript" src="js/budgetgroup.js"></script>
    <link href="administration.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">

        <form runat="server">
            <asp:TextBox ID="txt" runat="server" ClientIDMode="Static" Style="display: none;"></asp:TextBox>
        </form>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body table-responsive">
                        <!-- start role table -->
                        <table id="addressbook" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;" >
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th>Ledger AC type</th>
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
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Ledger Account Group for Budget - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Code</label>
                                <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txtCode"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Description</label>
                                <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-6">
                                <textarea class="form-control" id="txtName"></textarea>

                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Ledger AC type</label>
                            </div>
                            <div class="col-sm-6">
                                <select id="ddType">
                                    <option value="ALL">All</option>
                                    <option value="A">Assets</option>
                                    <option value="L">Liabilities</option>
                                    <option value="I">Income</option>
                                    <option value="E">Expenses</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                       <button type="button" class="btn btn-primary" onclick="savedata();" id="btnSave">Add</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Ledger Account Group for Budget - Edit</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Code</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" />
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
                                <label for="input">Ledger AC type</label>
                            </div>
                            <div class="col-sm-6">
                                <select>
                                    <option>All</option>
                                    <option>Assets</option>
                                    <option>Liabilities</option>
                                    <option>Income</option>
                                    <option>Expenses</option>
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
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Ledger Account Group for Budget - View</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Code</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" />
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
                                <label for="input">Ledger AC type</label>
                            </div>
                            <div class="col-sm-6">
                                <select>
                                    <option>All</option>
                                    <option>Assets</option>
                                    <option>Liabilities</option>
                                    <option>Income</option>
                                    <option>Expenses</option>
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
    </div>


</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
        let editor; // use a global for the submit and return data rendering in the examples

        $(document).ready(function () {
            editor = new $.fn.dataTable.Editor({
                table: "#item_table",
            });
            $('#item_table').DataTable({
                dom: "Bfrtip",
                //"bPaginate": false,
                //"bLengthChange": false,
                //select: false,
                //"bFilter": false,
                //"bInfo": false,
                //"ordering": false,
                buttons: [
                    {
                        add: "create", text: '<i class="fa fa-plus"></i> New', editor: editor, action: () => showmodal()
                    },
                    {
                        add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
                    },
                    {
                        extend: "remove", editor: editor
                    },
                    {
                        add: "view", text: 'View', editor: editor, action: () => showmodalview()
                    },
                    {
                        add: "lam", text: 'Ledger Account Mapping', editor: editor, action: () => window.open("ledger-account-mapping.aspx")
                    }
                ],

            })
        })

        var showmodal = function () {
            $("#myModalNEW").modal('show');
        };
        var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
        var showmodalview = function () {
            $("#myModalVIEW").modal('show');
        };

    </script>
</asp:Content>
