<%@ Page Title="Create Checks" Language="C#"
MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind=""
Inherits="WebAccounts.chartofacct" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
  <%-- javascript and header --%>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
  <%-- body --%>
  <div class="row">
    <div class="col">
      <div class="x_panel">
        <div class="x_title">
          <h2>Create Check Book</h2>
          <div class="clearfix"></div>
        </div>
        <div class="x_content" style="overflow-x: hidden">
          <div class="row">
            <div class="col-md-12">
              <p class="text-left">
                <span style="color: red">*</span> indicates a required field.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Receipt Date<span style="color: red">*</span></label>
                <input type="date" class="form-control" />
              </div>
              <div class="form-group">
                <label>Bank Name</label>
                <input type="text" class="form-control" readonly />
              </div>
              <div class="form-group">
                <label>Account No.</label>
                <input type="text" class="form-control" readonly />
              </div>
              <div class="form-group">
                <label>No. of Leaf<span style="color: red">*</span></label>
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Prefix</label>
                <input type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label>Starting No.<span style="color: red">*</span></label>
                <input type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label
                  >Numeric Character Length<span style="color: red"
                    >*</span
                  ></label
                >
                <input type="text" class="form-control" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="create_checks_remarks">Remarks</label>
                <textarea
                  class="form-control"
                  rows="6"
                  id="create_checks_remarks"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <%-- footer --%>
  <div class="row">
    <div class="col">
      <div class="x-panel">
        <div class="x-content">
          <div class="col text-center">
            <button class="btn btn-default btn-lg">Cancel</button>
            <button class="btn btn-primary btn-lg">Generate</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</asp:Content>
