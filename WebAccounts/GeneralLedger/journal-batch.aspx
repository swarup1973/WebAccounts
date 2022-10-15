<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="journal-batch.aspx.cs" Inherits="WebAccounts.journal_batch" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/journal-batch.js"></script>
    <title>Journal-Batch</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                    Administration
					>
					Setup 
					>
					<strong>Journal Batch</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <!-- start role table -->
                        <table id="journal_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block;">
                            <thead>
                                <tr>
                                    <th>Batch Code</th>
                                    <th>Batch Description</th>
                                    <th>Document Type</th>
                                    <th>Transaction Type</th>
                                    <th>Debit AC Type</th>
                                    <th>Debit AC No.</th>
                                    <th>Credit AC Type</th>
                                    <th>Credit AC No.</th>
                                    <th>No Sequence</th>
                                    <th>Approval Code</th>
                                    <th>For User/User Group</th>
                                    <th>Select User/User Group</th>
                                    <th>Apply for Gen. Journal</th>
                                    <th>Apply for Purchase Journal</th>
                                    <th>Apply for Sales Journal</th>
                                    <th>Apply for Receipt Journal</th>
                                    <th>Apply for Payment Journal</th>
                                    <th>Apply for FA Journal</th>
                                    <th>Apply for Payroll Journal</th>
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
                    <h5 class="modal-title">Journal Batch - Edit</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-header">
                    <p>
                        <!--<button type="button" class="btn btn-secondary" id="btnEdit" onclick="doactionModal('edit')" style="display: inline-block;">Edit</button>
                        <button type="button" class="btn btn-secondary" id="btnDelete" onclick="doactionModal('delete')" style="display: inline-block;">Delete</button>-->
                        <span class="text-danger">*</span> indicates a required field.
                    </p>
                </div>
                <form>
                    <div class="modal-body" id="div_modal">

                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Batch Code</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txt_BatchCd" maxlength="50">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Batch Description</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <textarea class="form-control" id="txt_BatchDesc" maxlength="200"></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Document Type</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_DocTypeId" onchange="JournalBatchObject.do_documenttype(this.value);">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Transaction Type</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_TranTypeId">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Debit AC Type</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_DrAcType" onchange="JournalBatchObject.do_debitacno(this.value);">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Debit AC No.</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_DrAcNo">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Credit AC Type</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_CrAcType" onchange="JournalBatchObject.do_creditacno(this.value);">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Credit AC No</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_CrAcNo">
                                </select>
                            </div>

                        </div>

                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">For User/User Group</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_UserType" onchange="JournalBatchObject.do_loadUser(this.value);">
                                    <option value="N">None</option>
                                    <option value="U">User</option>
                                    <option value="R">User Group/Role</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Select User/User Group</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_UserTypeId">
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">No Sequence</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="dd_NoSequenceId">
                                </select>
                            </div>
                            <div id="div_approvalcode" style="display:none;">
                                <div class="col-sm-3">
                                    <label for="input">Approval Code</label>
                                </div>
                                <div class="col-sm-3">
                                    <select class="form-control" id="dd_ApprovalCode">
                                    </select>
                                </div>
                            </div>

                        </div>
                        

                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Apply for General Journal</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control" id="chk_ApplyGenJrnl" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Apply for Purchase Journal</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control" id="chk_ApplyPurJrnl" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Apply for Sales Journal</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control" id="chk_ApplySalesJrnl" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Apply for Receipt Journal</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control" id="chk_ApplyRecptJrnl" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Apply for Payment Journal</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control" id="chk_ApplyPmtJrnl" />
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Apply for Fixed Asset Journal</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control" id="chk_ApplyFAJrnl" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Apply for Payroll journal</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control" id="chk_ApplyPayJrnl" />
                            </div>

                        </div>

                        <div class="form-group row" id="div_block">
                            <div class="col-sm-3">
                                &nbsp;
                            </div>
                            <div class="col-sm-3">
                                &nbsp;
                            </div>

                            <div class="col-sm-3">
                                <label for="input">Block</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" class="form-control" id="chk_isblocked" />
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="btn_save" class="btn btn-primary" onclick="savedata();">Save</button>
                        <button type="button" id="btn_cancel" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <link href="../Administration/administration.css" rel="stylesheet" />
    <script type="text/javascript">

</script>
</asp:Content>
