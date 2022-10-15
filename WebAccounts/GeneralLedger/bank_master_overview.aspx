<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="bank_master_overview.aspx.cs" Inherits="WebAccounts.bank_master_overview" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/bankAccountSetUp.js"></script>

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
					<strong>Bank Account Overview</strong>
                </p>
            </div>
        </div>


        <div class="clearfix"></div>


        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <!-- start role table -->
                        <table id="budget_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Search Name</th>
                                    <th>A/C Number</th>
                                    <th>Balance</th>
                                    <th>Balance(LCY)</th>
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
                    <h5 class="modal-title">Bank Account - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-header">
                    <p>
                         <button type="button" class="btn btn-secondary" id="btnEdit" onclick="EditBankAccount()">Edit</button>
                        <button type="button" class="btn btn-secondary" id="btnDelete" onclick="deleteBankAccount()">Delete</button><span class="text-danger">*</span> indicates a required field.
                    </p>
                </div>
                <form>
                    <div class="modal-body">

                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Code<span class="text-danger">*</span></label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="readOnly" id="txtCode">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Branch Name</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="readOnly" id="txtBranchName">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Name<span class="text-danger">*</span></label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="readOnly" id="txtName">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Branch Code</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtBranchCode" class="readOnly">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input" class="readOnly">Search Name</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtSearchName" class="readOnly">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">IFSC</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtIFSC" class="readOnly">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">A/C No<span class="text-danger">*</span></label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtACNo" class="readOnly">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">IBAN</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtIBAN" class="readOnly">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Min Balance</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtMinBalance"  onkeypress="return isNumberKey( event,this);"  class="readOnly">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">GIRO Code</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtGIROCode" class="readOnly">
                            </div>
                        </div>
                         <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Cheque Prefix</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtChequePrefix"  class="readOnly">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Cheque Length Without Prefix<span class="text-danger">*</span></label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtChequeLengthWoPrefix" onkeypress="return isNumberKey( event,this);"  class="readOnly">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Posting Group<span class="text-danger">*</span></label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control readOnly" id="cbo_postinggroupdr">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">SWIFT Code</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtSWIFTCode" class="readOnly">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Currency<span class="text-danger">*</span></label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control readOnly" id="cbo_currencydr">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Person Responsible</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control readOnly" id="cbo_personResponsibledr">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                <label for="input" id="lbBlock" >Block</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="cbBlock" class="readOnly" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Contacts</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Address-1</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtAddress1" class="readOnly">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Phone No</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPhoneNo" class="readOnly">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Address-2</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtAddress2" class="readOnly">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Alternate No</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtAlternateNo" class="readOnly">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Pin<span class="text-danger">*</span></label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPin" class="readOnly">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Fax No</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtFaxNo" class="readOnly">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">City<span class="text-danger">*</span></label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtCity" class="readOnly">
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Contact Person</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtContactPerson" class="readOnly">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">Country<span class="text-danger">*</span></label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control readOnly" id="cbo_countrydr" onchange="do_loadlookupdataCounty(this.value);">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Email</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtEmail" class="readOnly">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <label for="input">County<span class="text-danger">*</span></label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control readOnly" id="cbo_countydr">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="input">Website</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtWebsite" class="readOnly">
                            </div>
                        </div>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="btnSave" onclick="saveBankAccount();">Save</button>
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

