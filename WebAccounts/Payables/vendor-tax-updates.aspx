<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="WebAccounts.roles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>

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
                    <a href="vendor-account-overview.aspx" class="text-dark page_path_link">Vendor Account Overview</a> 
                    >
                    <a href="vendor-transaction.aspx" class="text-dark page_path_link">Transactions</a>
                    >
					<strong>Tax Updates</strong>

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
                                            <th>Posting Date</th>
                                              <th>Reference No</th>
                                              <th>Tax Type</th>
                                              <th>Tax Group</th>
                                              <th>Tax Component</th>
                                              <th>Tax Percentage</th>
                                              <th>Tax Calculated on</th>
                                              <th>Currency</th>
                                              <th>Amount Debit</th>
                                              <th>Amount (LCY)</th>
                                              <th>Amount Credit</th>
                                              <th>Amount (LCY)</th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                            <td>05/24/2021</td>
                                              <td>REF12345</td>
                                              <td>Type</td>
                                              <td>Group</td>
                                              <td>Component</td>
                                              <td>8%</td>
                                              <td>Calculated on</td>
                                              <td>Rupee</td>
                                              <td>23567</td>
                                              <td>5465</td>
                                              <td>1321321</td>
                                              <td>132165</td>
                                        </tr>
                                      </tbody>
                                </table>
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
        
		
    </script>
</asp:Content>

