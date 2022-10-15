<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master"
AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="WebAccounts.roles"
%>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
  <script
    type="text/javascript"
    src="../Scripts/jquery-3.5.0.min.js?0"
  ></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
  <div>
		<div class="row">
			<div class="col">
				<p>
					Administration
					>
					Setups
					>
					<a href="http://staging.rksoftwareinc.com/accounts/Administration/posting_setup.aspx" class="text-dark page_path_link">Posting Setup</a>
				</p>
			</div>
		</div>
    <div class="page-title">
      <div class="title_left">
        <h3>Posting Setup</h3>
      </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
      <div class="col-md-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Test Setup Links - to be changed</h2>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <ul>
              <li>
                <a class="link" href="bank_posting_group.aspx"
                  >Bank Posting Setup</a
                >
              </li>
              <li>
                <a href="customer_posting_group.aspx">Customer Posting Setup</a>
              </li>
              <li>
                <a href="fixed_assets_posting_group.aspx"
                  >Fixed Assets Posting Setup</a
                >
              </li>
              <li>
                <a href="inventory_posting_group.aspx"
                  >Inventory Posting Setup</a
                >
              </li>
              <li>
                <a href="vendor_posting_group.aspx">Vendor Posting Setup</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
  <script type="text/javascript"></script>
</asp:Content>
