<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="company-overview.aspx.cs" Inherits="WebAccounts.Administration.company_overview" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/company_overview.js"></script>
    <title>Company Overview</title>
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
                    <div class="card-body">
                        <!-- start role table -->
                        <table id="addressbook" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Registration No</th>
                                    <th>Currency</th>
                                    <th>Type of the Org.</th>
                                    <th>Nature of Business</th>
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
    <div class="modal fade" id="myModal" tabindex="-1" data-keyboard="false" data-backdrop="static" style="overflow-y: scroll;">
        <div class="modal-dialog modal-xl" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Company Set-up - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>General</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <div class="col-sm-6">
                                    Code <span class="requ">(*)</span>
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" id="txtCode" />
                                </div>
                                <div class="col-sm-6">
                                    Name <span class="requ">(*)</span>
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" id="txtName" />
                                </div>
                                <div class="col-sm-6">
                                    Type of the Organization <span class="requ">(*)</span>
                                </div>
                                <div class="col-sm-6">
                                    <select id="ddOrganization">
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    Nature of Business <span class="requ">(*)</span>
                                </div>
                                <div class="col-sm-6">
                                    <select id="ddBusiness">
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    Co. Regn. No <span class="requ">(*)</span>
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" id="txtRegnNo" />
                                </div>
                                <div class="col-sm-6">
                                    Currency (LCY) 
                                </div>
                                <div class="col-sm-6">
                                    <select id="ddCurrency">
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    Financial Year Starting Month <span class="requ">(*)</span>
                                </div>
                                <div class="col-sm-6">
                                    <select id="ddFinYearStartingMonth">
                                       
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="col-sm-6">
                                    Company Logo
                                </div>
                                <div class="col-sm-6">
                                    <input type="file" accept="image/png, image/jpeg" onchange="readURL(this);">
                                    <img src="" id="blah">
                                    <a href="#" onclick="rmvlogo()" id="rmvlogo">Remove Logo</a> 
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Primary Address</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Address-1 <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPrimaryAddress1" />
                            </div>
                            <div class="col-sm-3">
                                Phone <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPrimaryPhone" />
                            </div>
                            <div class="col-sm-3">
                                Address-2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPrimaryAddress2" />
                            </div>
                            <div class="col-sm-3">
                                Phone 2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPrimaryPhone2" />
                            </div>
                            <div class="col-sm-3">
                                Post Code <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPrimaryAddressPostCode" onblur="getPostCodeDetails('PrimaryAddressPostCode');" maxlength="8" />
                                <input type="button" value="search" onclick="showmodalpincode('PrimaryAddressPostCode');" />
                                <input type="text" id="txttPrimaryAddressPostId" style="display: none;" value="-1" />
                            </div>
                            <div class="col-sm-3">
                                Fax
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPrimaryFax" />
                            </div>
                            <div class="col-sm-3">
                                City <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPrimaryAddresstxtCity" disabled />
                            </div>
                            <div class="col-sm-3">
                                Email
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPrimaryEmail" />
                            </div>
                            <div class="col-sm-3">
                                Country <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPrimaryAddresstxtCountry" disabled />
                            </div>
                            <div class="col-sm-3">
                                Responsible Person
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPrimaryResponsiblePerson" />
                            </div>
                            <div class="col-sm-3">
                                County <span class="requ">(*)</span>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPrimaryAddresstxtCounty" disabled />
                            </div>
                            <div class="col-sm-3">
                                Web
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPrimaryWeb" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Bank</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Code
                            </div>
                            <div class="col-sm-3">
                                <select id="ddBankcode" onchange="getBankDetails();">
                                    <option>--</option>
                                </select>

                            </div>
                            <div class="col-sm-3">
                                GIRO No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtGiro" disabled />
                            </div>
                            <div class="col-sm-3">
                                Bank Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtBankname" disabled />
                            </div>
                            <div class="col-sm-3">
                                SWIFT Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtBankSwift" disabled />
                            </div>
                            <div class="col-sm-3">
                                Account No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtBankAccount" disabled />
                            </div>
                            <div class="col-sm-3">
                                IBAN
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtBankIban" disabled />
                            </div>
                            <div class="col-sm-3">
                                Branch
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtBankBranch" disabled />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Invoice Address (Default)</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Same as Primary Address
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="SameAsPA" checked="checked" />
                            </div>
                            <div class="col-sm-3">
                                Contact Person 
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtInvoiceContactPerson" />
                            </div>
                            <div class="col-sm-3">
                                Address
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtInvoiceAddress" />
                            </div>
                            <div class="col-sm-3">
                                Email
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtInvoiceEmail" />
                            </div>
                            <div class="col-sm-3">
                                Address 2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtInvoiceAddress2" />
                            </div>
                            <div class="col-sm-3">
                                Phone
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtInvoicPhone" />
                            </div>
                            <div class="col-sm-3">
                                Post
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtInvoiceAddressPostCode" onblur="getPostCodeDetails('InvoiceAddressPostCode');" maxlength="8" />
                                <input type="button" value="search" onclick="showmodalpincode('InvoiceAddressPostCode');" />
                                <input type="text" id="txtInvoiceAddressPostId" style="display: none;" value="-1" />
                            </div>
                            <div class="col-sm-3">
                                Fax
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtInvoiceFax" />
                            </div>
                            <div class="col-sm-3">
                                City
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtInvoiceAddressCity" disabled />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Country
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtInvoiceAddressCountry" disabled />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                County
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtInvoiceAddressCounty" disabled />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Shipping Address (Default)</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Same as Invoice Address
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" id="SameAsIA" checked="checked" />
                            </div>
                            <div class="col-sm-3">
                                Contact Person 
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtShippingContactPerson" />
                            </div>
                            <div class="col-sm-3">
                                Address
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtShippingAddress" />
                            </div>
                            <div class="col-sm-3">
                                Email
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtShippingEmail" />
                            </div>
                            <div class="col-sm-3">
                                Address 2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtShippingAddress2" />
                            </div>
                            <div class="col-sm-3">
                                Phone
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtShippingPhone" />
                            </div>
                            <div class="col-sm-3">
                                Post
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtShippingAddressPostCode" onblur="getPostCodeDetails('ShippingAddressPostCode');" maxlength="8" />
                                <input type="button" value="search" onclick="showmodalpincode('ShippingAddressPostCode');" />
                                <input type="text" id="txtShippingAddressPostId" style="display: none;" value="-1" />
                            </div>
                            <div class="col-sm-3">
                                Fax
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtShippingFax" />
                            </div>
                            <div class="col-sm-3">
                                City
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtShippingCity" disabled />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Country
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtShippingCountry" disabled />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                County
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtShippingCounty" disabled />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Tax Information</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Tax Year Starting Month
                            </div>
                            <div class="col-sm-3">
                                <select id="ddTaxYearMonth">
                                   
                                </select>
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Federal Tax ID (EIN)
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtEIN" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Social Security Number 
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtSSN" />
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

    <!-- Modal HTML Edit -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-xl" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Company Set-up - Edit</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>General</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <div class="col-sm-6">
                                    Code
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" />
                                </div>
                                <div class="col-sm-6">
                                    Name
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" />
                                </div>
                                <div class="col-sm-6">
                                    Type of the Organization
                                </div>
                                <div class="col-sm-6">
                                    <select>
                                        <option>Sole Proprietorship</option>
                                        <option>Partnership</option>
                                        <option>Limited Liability Company (LLC)</option>
                                        <option>Corporation</option>
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    Nature of Business
                                </div>
                                <div class="col-sm-6">
                                    <select>
                                        <option>Trading</option>
                                        <option>Manufacturing</option>
                                        <option>Service</option>
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    Co. Regn. No
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" />
                                </div>
                                <div class="col-sm-6">
                                    Currency (LCY)
                                </div>
                                <div class="col-sm-6">
                                    <select>
                                        <option>--Selection--</option>
                                        <option>--</option>
                                        <option>--</option>
                                        <option>--</option>
                                        <option>--</option>
                                        <option>--</option>
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    Financial Year Starting Month
                                </div>
                                <div class="col-sm-6">
                                    <select>
                                        <option>January</option>
                                        <option>February</option>
                                        <option>...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="col-sm-6">
                                    Company Logo
                                </div>
                                <div class="col-sm-6">
                                    Display company logo here<br />
                                    <input type="file" accept="image/png, image/jpeg">
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Primary Address</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Address-1
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Phone
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Address-2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Phone 2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Post Code
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Fax
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                City
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Email
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Country
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Responsible Person
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                County
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Web
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Bank</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Code
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                GIRO No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Bank Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                SWIFT Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Account No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                IBAN
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Branch
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Invoice Address (Default)</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Same as Primary Address
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" />
                            </div>
                            <div class="col-sm-3">
                                Contact Person 
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Address
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Email
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Address 2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Phone
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Post
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Fax
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                City
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Country
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                County
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Shipping Address (Default)</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Same as Invoice Address
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" />
                            </div>
                            <div class="col-sm-3">
                                Contact Person 
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Address
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Email
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Address 2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Phone
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Post
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Fax
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                City
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Country
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                County
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Tax Information</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Tax Year Starting Month
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Federal Tax ID (EIN)
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Social Security Number 
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
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
    </div>

    <!-- Modal HTML View -->
    <div class="modal fade" id="myModalVIEW" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-xl" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Company Set-up - View</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>General</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <div class="col-sm-6">
                                    Code
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" />
                                </div>
                                <div class="col-sm-6">
                                    Name
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" />
                                </div>
                                <div class="col-sm-6">
                                    Type of the Organization
                                </div>
                                <div class="col-sm-6">
                                    <select>
                                        <option>Sole Proprietorship</option>
                                        <option>Partnership</option>
                                        <option>Limited Liability Company (LLC)</option>
                                        <option>Corporation</option>
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    Nature of Business
                                </div>
                                <div class="col-sm-6">
                                    <select>
                                        <option>Trading</option>
                                        <option>Manufacturing</option>
                                        <option>Service</option>
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    Co. Regn. No
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" />
                                </div>
                                <div class="col-sm-6">
                                    Currency (LCY)
                                </div>
                                <div class="col-sm-6">
                                    <select>
                                        <option>--Selection--</option>
                                        <option>--</option>
                                        <option>--</option>
                                        <option>--</option>
                                        <option>--</option>
                                        <option>--</option>
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    Financial Year Starting Month
                                </div>
                                <div class="col-sm-6">
                                    <select>
                                        <option>January</option>
                                        <option>February</option>
                                        <option>...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="col-sm-6">
                                    Company Logo
                                </div>
                                <div class="col-sm-6">
                                    Display Company Logo here
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Primary Address</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Address-1
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Phone
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Address-2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Phone 2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Post Code
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Fax
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                City
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Email
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Country
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Responsible Person
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                County
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Web
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Bank</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Code
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                GIRO No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Bank Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                SWIFT Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Account No
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                IBAN
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Branch
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Invoice Address (Default)</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Same as Primary Address
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" />
                            </div>
                            <div class="col-sm-3">
                                Contact Person 
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Address
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Email
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Address 2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Phone
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Post
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Fax
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                City
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Country
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                County
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Shipping Address (Default)</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Same as Invoice Address
                            </div>
                            <div class="col-sm-3">
                                <input type="checkbox" />
                            </div>
                            <div class="col-sm-3">
                                Contact Person 
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Address
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Email
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Address 2
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Phone
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Post
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Fax
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                City
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Country
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                County
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12">
                                <strong>Tax Information</strong>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Tax Year Starting Month
                            </div>
                            <div class="col-sm-3">
                                <select>
                                    <option>--Selection--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                    <option>--</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Federal Tax ID (EIN)
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                            </div>
                            <div class="col-sm-3">
                                Social Security Number 
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
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
    </div>
    <div class="modal fade" id="myModalPincode" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-xl" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Pincode Search</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-md-1">
                                Country
                            </div>
                            <div class="col-md-2">
                                <select id="ddPincodeCountry" onchange="PopulateState();">
                                </select>
                            </div>
                            <div class="col-md-1">
                                State
                            </div>
                            <div class="col-md-2">
                                <select id="ddPincodeCounty" onchange="PopulateCity();">
                                </select>
                            </div>
                            <div class="col-md-1">
                                City
                            </div>
                            <div class="col-md-2">
                                <select id="ddPincodeCity">
                                </select>
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn-primary" onclick="fetchPinCode();">Search</button>
                            </div>

                        </div>
                      
                        <table id="pincoderesult" class="table table-striped table-hover table-condensed projects datatable width-100" style="width: 100%; white-space: nowrap;  overflow-x: auto; overflow-y: hidden;">
                            <thead>
                                <tr>
                                    <th>Country</th>
                                    <th>State</th>
                                    <th>City</th>
                                    <th>Post Code</th>
                                    <th></th>

                                </tr>
                            </thead>

                        </table>
                           
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

                select: true,
                buttons: [
                    {
                        add: "create", text: 'New', editor: editor, action: () => showmodal()
                    },
                    {
                        add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit()
                    },
                    {
                        extend: "remove", editor: editor
                    },
                    {
                        add: "view", text: 'View', editor: editor, action: () => showmodalview()
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
        var showmodalview = function () {
            $("#myModalVIEW").modal('show');
        };
        var showmodalpincode = function (cfetchpincode) {
            localStorage.cfetchpincode = cfetchpincode;
            $('#myModalPincode .modal-title').html('Pincode Search');
            $("#myModalPincode").modal('show');
        };

    </script>
</asp:Content>

