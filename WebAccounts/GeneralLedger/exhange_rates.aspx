<%@ Page Title="Exchange Rates" Language="C#"
MasterPageFile="~/master/base.Master" AutoEventWireup="true"
CodeBehind=""
Inherits="WebAccounts.chartofacct" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
  <%-- javascript and header --%>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <%-- toolbar --%>
    
    <div class="row">
	<div class="col">
    	<div class="x_panel">		  
			<a href="#">New</a> &#8226; <a href="#">Edit</a> &#8226; <a href="#">Delete</a> &#8226; <a href="#">Exchange Rate Service</a> 
		</div>
	</div>
</div>

	
	<%-- body --%>
	<div class="row">
          <div class="col">
            <div class="x_panel">
              <div class="x_title">
				<h2>Exchange Rates</h2>
				<p>                
                <div class="clearfix"></div>
              </div>
              <div class="x_content overflow-x-auto">
				<div class="row">
					<div class="col-md-4">
						<div class="form-group">
							<label>Currency Code</label>
							<input
								type="text"
								class="form-control"
								readonly
							/>
						</div>
						<div class="form-group">
							<label>Currency Description</label>
							<input
								type="text"
								class="form-control"
								readonly
							/>
						</div>
					</div>
				</div>
				</p>
				<p class="text-left"><span class="required-asterisk">*</span> indicates a required field.</p>
                <!-- start Accounts list -->
                <table
                  id=""
                  class="table table-bordered table-hover table-condensed"
                >
                  <thead class="">
                    <tr>
                        <th class="">Date</th>
					    <th class="">Start Date<span class="required-asterisk">*</span></th>
					    <th class="">Exchange Rate<span class="required-asterisk">*</span></th>
                        <th class="">Exchange Rate Per</th>
                    </tr>
                  </thead>
                  <tbody class="">
                      <tr>
                        <td class="">
                            <input type="date" class="form-control" name="date_display" readonly />
                        </td>
                        <td class="">
                            <input class="form-control" type="date" name="start_date" required />
                        </td>
                        <td class="">
                            <input class="form-control" type="number" name="exchange_rate" required />
                        </td>
                        <td class="">
                            <input class="form-control" type="number" name="exchange_rate_per" />
                        </td>
                      </tr>
                  </tbody>
                </table>
                <!-- end Accounts list -->
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
                    <button class="btn btn-primary btn-lg">Save</button>
                </div>
                </div>
            </div>
            </div>
        </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
  <script>
  </script>
</asp:Content>
