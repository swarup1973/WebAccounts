<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="budget-transfer.aspx.cs" Inherits="WebAccounts.GeneralLedger.budget_transfer" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Budget Transfer</title>
    <script type="text/javascript" src="js/budgettransfer.js?v=1.3"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
    
       
        
        <div class="clearfix"></div>
        
        <div class="row ">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                    	<!-- start role table -->
             <form>
                	<div class="form-group row">
                    	<div class="col-sm-12">
							<p><strong>Transfers budgets within same period range from one dimension to another or one period to another or both will occur.<br />
* Transfer will have no effect on total  budget only inter change in value between period or dimension will occur</strong></p>
						</div>
                    </div>
                    <table>
                    	<tr>
                        	<td>Transfer Budget Value between</td>
                            <td><select id="selectMe" onchange="vchange();">
                                <option value="dimension">Dimension</option>
                                <option value="period">Period</option>
                            </select></td>
                            <td>Amount to transfer</td>
                            <td><input type="number" class="form-control" id="txtAmt" value="0" /></td>
                        </tr>
                        <tr class="ddim">
                       	  <td>From Dimension</td>
                            <td><select id="fromDimension" onchange="populateDimension();">
                              
                            </select></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                        	<td>From Dimension Value</td>
                            <td><select id="fromDimensionValue">
                               
                            </select></td>
                            <td>Period from</td>
                            <td><select id="fromPeriod"></select></td>
                        </tr>
                        <tr>
                            <td>To Dimension Value</td>
                            <td><select id="toDimensionValue">
                            
                            </select></td>
                        	
                            <td>Period to</td>
                            <td><select id="toPeriod"></select></td>
                        </tr>
                        <tr>
                        	
                            <td><select id="toDimension" style="display : none;">
                             
                            </select></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                        	<td>&nbsp;</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                        	<td></td>
                            <td></td>
                            <td><button type="button" class="btn btn-primary" id="btnSave" onclick="savedata();">OK</button>
                                <button type="button" class="btn btn-secondary" onclick="cancelclick();">Cancel</button></td>
                            <td></td>
                        </tr>
                    </table>
			  </form>
              
                    </div>
                </div>
            </div>
        </div>
    </div>
        
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">

</asp:Content>