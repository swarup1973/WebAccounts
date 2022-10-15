<%@ Page Title="Bank Account Setup" Language="C#"
MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind=""
Inherits="WebAccounts.chartofacct" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
  <%-- javascript and header --%>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
  <%-- toolbar --%>
  <!-- Body -->
  <div class="row">
    <div class="">
      <div class="page-title">
        <div class="title_left">
          <h3>Bank Account Setup</h3>
          <p class="text-left"><span class="required-asterisk">*</span> indicates a required field.</p>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="container custom-toolbar">
        <div class="col">
          <div class="x-panel">
            <ul class="nav navbar-nav">
              <li class="toolbar-button">
                <a role="button" href="" aria-expanded="false" class="toolbar-button-link">
                  Edit
                </a>
              </li>
              <li class="toolbar-button">
                <a role="button" href="./transaction.aspx" aria-expanded="false" class="toolbar-button-link"
                  >Transaction</a
                >
              </li>
              <li class="toolbar-button">
                <a role="button" href="./dimension_setup.aspx" aria-expanded="false" class="toolbar-button-link"
                  >Dimension</a
                >
              </li>
              <li class="toolbar-button">
                <a role="button" href="./check_register.aspx" aria-expanded="false" class="toolbar-button-link">
                  Check Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- start of master row -->
      <div class="container">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="x_panel">
            <div class="x_content">
              <br />
              <!-- start of row 1 -->
              <div class="row">
                <div class="">
                  <h2>General <small></small></h2>
                  <div class="clearfix"></div>
                </div>
                <div class="col-md-6">
                  <div  class="form-horizontal form-label-left">
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Code
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="text"
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
													readonly
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Name
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="text"
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
													readonly
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Search Name
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="text"
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
													readonly
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        AC Code
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="text"
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
													readonly
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Min Balance
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="number"
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Posting Group<span class="required-asterisk">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
												<select class="form-control bank_account_input_width" name="" required  readonly>
													<option value="asset">--</option>
												</select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Currency<span class="required-asterisk">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
												<select class="form-control bank_account_input_width" name="" required  readonly>
													<option value="asset">--</option>
												</select>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- col 1 end -->
                <div class="col-md-6">
                  <div class="form-horizontal form-label-left">
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Branch Name
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input 
                          class="form-control bank_account_input_width"
                          type="text"
                          name=""
                          
                          maxlength="150"
                          readonly
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Branch Code
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input 
                          class="form-control bank_account_input_width"
                          type="text"
                          name=""
                          
                          maxlength="60"
                          readonly
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        IFSC
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input 
                          class="form-control bank_account_input_width"
                          type="text"
                          name=""
                          
                          maxlength="30"
                          readonly
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        IBAN
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input 
                          class="form-control bank_account_input_width"
                          type="text"
                          name=""
                          
                          maxlength="60"
                          readonly
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        GIRO Code
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input 
                          class="form-control bank_account_input_width"
                          type="text"
                          name=""
                          
                          maxlength="60"
                          readonly
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        SWIFT Code
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input 
                          class="form-control bank_account_input_width"
                          type="text"
                          maxlength="60"
                          readonly
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Person Responsible
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <select class="form-control bank_account_input_width"  class="" readonly>
													<option>--</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Block
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <span
                        >
                          <i class="fa fa-check check-mark-fontsize"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- col 2 end -->
              </div>
              <!-- row 2 start -->
							<div class="row">
                <div class="ln_solid"></div>
                <div class="">
                  <h2>Contacts <small></small></h2>
                  <div class="clearfix"></div>
                </div>
                <div class="col-md-6">
                  <div  class="form-horizontal form-label-left">
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Address
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="text"
                          maxlength="300"
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Address Line 2
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="text"
                          maxlength="300"
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Zip Code<span class="required-asterisk">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="text"
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
                          maxlength="20"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        City<span class="required-asterisk">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="text"
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
                          maxlength="100"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Country<span class="required-asterisk">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <select
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
                          readonly
                        >
                          <option>--</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        State<span class="required-asterisk">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
												<select class="form-control bank_account_input_width" name="" required  readonly>
													<option value="asset">--</option>
												</select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div  class="form-horizontal form-label-left">
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Phone No.
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="tel"
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
                          maxlength="16"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Alternate No.
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="tel"
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
                          maxlength="16"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Fax No.
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="text"
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Contact Person
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="text"
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
                          maxlength="250"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Email
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="email"
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
                          maxlength="250"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">
                        Website
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input
                          type="text"
                          class="form-control col-md-6 col-xs-12 bank_account_input_width"
                          maxlength="250"
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                </div>
							</div>
              <!-- real end of row content -->
              <div class="row mt-50">
                <div class="col text-center">
                  <button
                    id="btn_cancel"
                    class="btn btn-default"
                    formnovalidate
                  >
                    Cancel
                  </button>
                  <button id="btn_save" class="btn btn-primary" formnovalidate>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
  <script src=""></script>
</asp:Content>
