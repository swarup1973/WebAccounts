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
                    <a href="budget-overview.aspx" class="text-dark page_path_link">Budget Overview</a>
                    >
                    <a href="budget-register.aspx" class="text-dark page_path_link">Budget Register</a>
                    >
					<strong>Budget Balance and Variance</strong>

                </p>
            </div>
        </div>
        <div class="clearfix"></div>
        
		<div class="row">
            <div class="col">
                
            </div>
        </div>
        
		<div class="clearfix"></div>
        <div class="row">
            <div class="col">
            
                <div class="card">
                    <div class="card-body">
                   
                    <div class="col-md-12 col-sm-12">
                	
                	<div class="col-md-1 col-sm-1">
                    	By Ledger: 
                	</div>
                    <div class="col-md-1 col-sm-1">
                    	<div class="checkbox">
								<label>
								<input type="checkbox" class="flat">
								</label>
							</div>
                	</div>
                    <div class="col-md-1 col-sm-1">
                    	By Period: 
                	</div>
                    <div class="col-md-1 col-sm-1">
                    	<div class="checkbox">
								<label>
								<input type="checkbox" class="flat">
								</label>
							</div>
                	</div>
                    <div class="col-md-2 col-sm-2">
                    	By Dimension: 
                	</div>
                    <div class="col-md-2 col-sm-2">
                    	<select class="form-control">
								<option>Branch</option>
                                <option>Department</option>
                                <option>Dimension-3</option>
								<option>Dimension-4</option>
                                <option>Dimension-5</option>
                                <option>Dimension-6</option>
                                <option>Dimension-7</option>
                                <option>Dimension-8</option>
                                <option>Dimension-9</option>
                                <option>Dimension-10</option>
							</select>
                	</div>
                   
                </div>
                </div>
                </div>
                
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                <table id="budget_register_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th>Ledger No</th>
                                              <th>Ledger Name</th>
                                              <th>Period From</th>
                                              <th>Period To</th>
                                              <th>Dimension</th>
                                              <th>Budgeted Amount</th>
                                              <th>Actual Amount</th>
                                              <th>Variance Amount (+/-)</th>
                                              <th>Variance % (+/-)</th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                            <td>12345</td>
                                            <td>Ledger Name</td>
                                            <td>2021/04/23</td>
                                            <td>2021/04/23</td>
                                            <td>Dimension</td>
                                            <td>10,000.00</td>
                                            <td>12,000.00</td>
                                            <td>2,000.00</td>
                                            <td>1,000.00</td>
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

