<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="WebAccounts.roles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

        <div class="row">
            <div class="col">
                <p>
                    Fixed Assets
					>
					Master 
					>
					<a href="fixed-assets-master.aspx">Fixed Assets Overview</a> 
                    >
                    <a href="assets-transaction.aspx">Transaction</a> 
                    >
					<strong>Sub-ledger Updates</strong>

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
                                              <th>Sub-ledger AC No</th>
                                              <th>Sub-ledger AC Name</th>
                                              <th>Currency</th>
                                              <th>Amount Debit</th>
                                              <th>Amount Credit</th>
                                              <th>Amount (LCY)</th>
                                              <th>Payment Reference No</th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                            <th>05/24/2021</th>
                                              <th>REF12345</th>
                                              <th>12345</th>
                                              <th>Name</th>
                                              <th>Rupee</th>
                                              <th>56849</th>
                                              <th>46546</th>
                                              <th>5465</th>
                                              <th>EEFNO235</th>
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

