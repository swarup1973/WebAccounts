<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true"
    CodeBehind="check_register.aspx.cs" Inherits="WebAccounts.check_register" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/check_register.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

        <div class="row">
            <div class="col">
                <p>
                    General Ledger
					>
					Master
					>
					<a href="bank_master_overview.aspx" class="text-dark page_path_link">Bank Account Overview</a>
                    >
                    <strong>Check Register</strong>
                </p>
            </div>
        </div>


        <div class="clearfix"></div>


        <div class="row">
            <div class="col">

                <div class="card">
                    <div class="card-body">
                        <div class="col-md-6 col-sm-6">
                            Bank Name: 
                            <select id="cbo_bankNamedr" onchange="onBankChange(this)">
                            </select>
                            Bank Account No: <strong id="acNumber"></strong>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <select id="drSerachSatus">
                                <option value="">--Dropdown Selection--</option>
                                <option value="O">Open</option>
                                <option value="U">Used</option>
                                <option value="D">Dishonoured</option>
                                <option value="C">Cancelled</option>
                                <option value="">Cheque No</option>
                            </select>
                            <input type="text" placeholder="Cheque No" id="txtSearchChequeNo">
                            <button type="button" class="btn btn-secondary" onclick="searchChequeRegisterList();">Search</button>
                        </div>

                    </div>
                </div>

                <div class="card">
                    <div class="card-body">

                        <table id="cheque_register_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Cheque No</th>
                                    <th>Date of issue/Transaction</th>
                                    <th>Document No</th>
                                    <th>Document Type</th>
                                    <th>Issued to</th>
                                    <th>Status</th>
                                    <th>Print</th>
                                    <th>Reason</th>
                                    <th>Reversed</th>
                                    <th>Reconciled</th>
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
    <div class="modal fade" id="myModal" tabindex="-1">
        <div class="modal-dialog modal-lg" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Create Cheque Book</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">

                            <div class="col-sm-3">
                                <label for="input">Bank Name:</label>
                            </div>
                            <div class="col-sm-3">
                                <strong id="bankName"></strong>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Account No:</label>
                            </div>
                            <div class="col-sm-3">
                                <strong id="acNo"></strong>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Receipt Date:<span class="text-danger">*</span></label>
                            </div>
                            <div class="col-sm-3">
                                <input class="date-picker" type="date" id="txtReceiptDate" placeholder="mm/dd/yyyy" />
                            </div>

                            <div class="col-sm-3">
                                <label for="input">Cheque Starting No:</label>
                            </div>
                            <div class="col-sm-3">
                                  <input type="text" class="form-control" id="txtStartingNo" onkeypress="return isNumberKey( event,this);" >
                            </div>
                        </div>
                         <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Cheque Prefix:</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txtChequePrefix">
                            </div>
                              <div class="col-sm-3">
                                <label for="input">Cheque Length Without Prefix:</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txtChequeLengthWoPrefix" onkeypress="return isNumberKey( event,this);" >
                            </div>
                        </div>
                        <div class="form-group row">

                            <div class="col-sm-3">
                                <label for="input">No. of Leaf:</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="txtNoOfLeaf"  onkeypress="return isNumberKey( event,this);">
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Remarks:</label>
                            </div>
                            <div class="col-sm-9">
                                <textarea class="form-control" id="txtRemark"></textarea>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="saveCheckRegister();">Generate</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Warning Message</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>
                </div>
                </form>
            </div>
        </div>
    </div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
<link href="generalledger.css" rel="stylesheet" />
    <script type="text/javascript">
        let editor; // use a global for the submit and return data rendering in the examples

      
        var showmodal = function () {
            $("#myModal").modal('show');
        };

        var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
        var showmodalview = function () {
            $("#myModalView").modal('show');
        };

        function isNumberKey(evt, element) {
            var charCode = (evt.which) ? evt.which : event.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode == 46 || charCode == 8))
                return false;
            else {
                var len = $(element).val().length;
                var index = $(element).val().indexOf('.');
                if (index > 0 && charCode == 46) {
                    return false;
                }
                if (index > 0) {
                    var CharAfterdot = (len + 1) - index;
                    if (CharAfterdot > 6) {
                        return false;
                    }
                }

            }
            return true;
        }

    </script>
</asp:Content>

