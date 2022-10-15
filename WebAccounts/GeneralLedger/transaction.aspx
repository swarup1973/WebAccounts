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
					<a href="bank_master_overview.aspx" class="text-dark page_path_link">Bank Account Overview</a> 
					>
                    <strong>Transactions</strong>
                </p>
            </div>
        </div>


        <div class="clearfix"></div>
		

        <div class="row">
            <div class="col">
            
            <div class="card">
                <div class="card-body">
                
                <div class="col-md-12 col-sm-12">
                From Date: <input class="date-picker" type="date" id="txt_postingfrom" placeholder="yyyy/mm/dd" /> To Date: <input class="date-picker" type="date" id="txt_postingfrom" placeholder="yyyy/mm/dd" /> <select id="subjects">
                <option value="sub_ledger_updates">Sub-ledger Updates</option>
           <option value="tax_updates">Tax Updates</option>
			</select> <input class="SubmitButton" type="button" value="Linked Updates" onclick="showPage()" />
<script type = "text/javascript">
function showPage() {
  var sel = document.getElementById('subjects');
  var option = sel.options[sel.selectedIndex].value;
  window.open(option + ".aspx");
}
</script>
                </div>
                <div class="col-md-12 col-sm-12">    
                	Bank Name: ABC Bank . Bank Account No: 1234567890
                </div>

                </div>
                </div>
                
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                <table id="budget_register_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>Posting Date</th>
                                              <th>Voucher No/Document No</th>
                                              <th>Document Type</th>
                                              <th>Description/Narration</th>
                                              <th>AC No</th>
                                              <th>AC Name</th>
                                              <th>Currency</th>
                                              <th>Amount Debit</th>
                                              <th>Amount Credit</th>
                                              <th>Amount (LCY)</th>
                                              <th>Payment Reference No</th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                            <td>Posting Date</td>
                                              <td>Voucher No/Document No</td>
                                              <td>Document Type</td>
                                              <td>Description/Narration</td>
                                              <td>AC No</td>
                                              <td>AC Name</td>
                                              <td>Currency</td>
                                              <td>Amount Debit</td>
                                              <td>Amount Credit</td>
                                              <td>Amount (LCY)</td>
                                              <td>Payment Reference No</td>
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

