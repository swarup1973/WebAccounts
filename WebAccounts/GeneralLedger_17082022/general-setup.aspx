<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="general-setup.aspx.cs" Inherits="WebAccounts.general_setup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/general-setup.js"></script>
    <title>General Set-up</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="row">
        <div class="col">
            <p>
                General Ledger
					>
					Setups
					>
					<strong>General Set-up</strong>
            </p>
        </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
        <div class="col">
            <div class="card" id="div_generalsetup">
                <div class="card-body">
                    <!-- start role table -->
                    <table id="gl_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                        <thead>
                            <tr>
                                <th>General</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Allow Posting from</strong></td>
                                <td>
                                    <input type="date" class="form-control" id="txt_PostingFrom" /></td>
                                <td><strong>Retained Earning Ledger Account</strong></td>
                                <td>
                                    <select class="form-control" id="dd_RetainedEarningAcCd">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Allow Posting to</strong></td>
                                <td>
                                    <input type="date" class="form-control" id="txt_PostingTo" /></td>
                                <td><strong>Profit &amp; Loss Account</strong></td>
                                <td>
                                    <select class="form-control" id="dd_PLAcCd">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Discount Tollerence %</strong></td>
                                <td>
                                    <input type="number" class="form-control" id="txt_DiscTollerence"  maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" /></td>
                                <td><strong>Expected Cost Posting in Ledger</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_ExptdCostPosting" /></td>
                            </tr>
                            <tr>
                                <td><strong>Discount Tollerence Amount</strong></td>
                                <td>
                                    <input type="number" class="form-control" id="txt_DiscTollerenceAmt"  maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" /></td>
                                <td><strong>Expected Revenue Posting in Ledger</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_ExptdRevenuePosting" /></td>
                            </tr>
                            <tr>
                                <td><strong>Finance Posting on Item Receipt</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_FinPostingOnItemRecpt" /></td>
                                <td><strong>Exchange Rate Service URL</strong></td>
                                <td>
                                    <input type="text" class="form-control" id="txt_ExchangeRateServiceUrl" maxlength="100" /></td>
                            </tr>
                            <tr>
                                <td><strong>Finance Posting on Packing Slip</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" id="chk_FinPostingOnPackingSlip" /></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- end General table -->
                    <div class="clearfix"></div>
                    <table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                        <thead>
                            <tr>
                                <th>Rounding off (RO)</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>WH Tax Rounding Precision</strong></td>
                                <td>
                                    <input type="number" class="form-control" id="txt_WHTaxRndingPrecision"  maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" /></td>
                                <td><strong>LCY Rounding Precision</strong></td>
                                <td>
                                    <input type="number" class="form-control" id="txt_LCYRndingPrecision"  maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" /></td>
                            </tr>
                            <tr>
                                <td height="24"><strong>WH Tax Decimal Places</strong></td>
                                <td>
                                    <input type="number" class="form-control" id="txt_WHTaxDecPlaces" pattern="^[0-9]*$" onkeypress="return onlyNumberKey(event)" /></td>
                                <td><strong>LCY Decimal Places</strong></td>
                                <td>
                                    <input type="number" class="form-control" id="txt_LCYDecPlaces"  pattern="^[0-9]*$" onkeypress="return onlyNumberKey(event)" /></td>
                            </tr>
                            <tr>
                                <td height="24"><strong>WH Tax Rounding Type</strong></td>
                                <td>
                                    <select class="form-control" id="dd_WHTaxRndingType">
                                        <option value="N">Nearest</option>
                                        <option value="U">Up</option>
                                        <option value="D">Down</option>
                                    </select></td>
                                <td><strong>LCY Rounding Type</strong></td>
                                <td>
                                    <select class="form-control" id="dd_LCYRndingType">
                                        <option value="N">Nearest</option>
                                        <option value="U">Up</option>
                                        <option value="D">Down</option>
                                    </select></td>
                            </tr>
                            <tr>
                                <td height="24"><strong>GST Rounding Precision</strong></td>
                                <td>
                                    <input type="number" class="form-control" id="txt_GSTRndingPrecision" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" /></td>
                                <td><strong>Customs Rounding Precision</strong></td>
                                <td>
                                    <input type="number" class="form-control" id="txt_CustomsRndingPrecision" maxlength="21" pattern="^\d+(?:\.\d{1,2})?$" onchange="setTwoNumberDecimal(this);" /></td>
                            </tr>
                            <tr>
                                <td height="24"><strong>GST Decimal Places</strong></td>
                                <td>
                                    <input type="number" class="form-control" id="txt_GSTDecPlaces"  pattern="^[0-9]*$" onkeypress="return onlyNumberKey(event)" /></td>
                                <td><strong>Customs Decimal Places</strong></td>
                                <td>
                                    <input type="number" class="form-control" id="txt_CustomsDecPlaces"   pattern="^[0-9]*$" onkeypress="return onlyNumberKey(event)" /></td>
                            </tr>
                            <tr>
                                <td height="24"><strong>GST Rounding Type</strong></td>
                                <td>
                                    <select class="form-control" id="dd_GSTRndingType">
                                        <option value="N">Nearest</option>
                                        <option value="U">Up</option>
                                        <option value="D">Down</option>
                                    </select></td>
                                <td><strong>Customs Rounding Type</strong></td>
                                <td>
                                    <select class="form-control" id="dd_CustomsRndingType">
                                        <option value="N">Nearest</option>
                                        <option value="U">Up</option>
                                        <option value="D">Down</option>
                                    </select></td>
                            </tr>
                        </tbody>
                    </table>


                    <table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                        <thead>
                            <tr>
                                <th>No Series</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Bank A/C Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_BankAcNo">
                                    </select></td>
                                <td><strong>WH Tax Payment Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_WHTaxPmtNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Year End Closing Batch Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_YearEndClosingBatchNo">
                                    </select></td>
                                <td><strong>WH Tax Adjustment Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_WHTaxAdjNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Exchange Adjustment Batch Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_ExchangeAdjBatchNo">
                                    </select></td>
                                <td><strong>GST Payment Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_GSTPmtNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>GL Transaction Reversal</strong></td>
                                <td>
                                    <select class="form-control" id="dd_GLTranReversal">
                                    </select></td>
                                <td><strong>GST Adjustment Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_GSTAdjNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Budget Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_BudgetNo">
                                    </select></td>
                                <td><strong>Customs Payment Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_CustomsPmtNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Budget Entry Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_BudgetEntryNo">
                                    </select></td>
                                <td><strong>Customs Adjustment Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_CustomsAdjNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Revised Budget No</strong></td>
                                <td>
                                    <select class="form-control" id="dd_RevisedBudgetNo">
                                    </select></td>
                                <td><strong>Bank Reconciliation No</strong></td>
                                <td>
                                    <select class="form-control" id="dd_BankReconNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Journal Batch Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_JournalBatchNo">
                                    </select></td>
                                <td><strong>Bank Statement Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_BankStatementNo">
                                    </select></td>
                            </tr>
                            <tr>
                                <td><strong>Transaction Reversal Voucher Nos</strong></td>
                                <td>
                                    <select class="form-control" id="dd_TranReversalVchNo">
                                    </select></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                        <thead>
                            <tr>
                                <th>Budget</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Action on Exceeding Budget Limit</strong></td>
                                <td>
                                    <select class="form-control" id="dd_ActionExceedingBudgetLimit">
                                        <option value="A">Warn and Allow posting after Revision</option>
                                        <option value="B">Warn, Stop Posting and Don't Allow Revision</option>
                                        <option value="C">Warn and Allow posting without Revision</option>
                                        <option value="D">No Warning and Allow posting without Revision</option>
                                    </select></td>
                                <td><strong>Budget minus Unposted Actual Transactions?</strong></td>
                                <td>
                                    <input type="checkbox" class="form-control" style=" width: 40px; height: 40px;" id="chk_BudgetMinusUnpostedActualTran" /></td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                        <thead>
                            <tr>
                                <th>Tax</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Calculation Date</strong></td>
                                <td>
                                    <select class="form-control" id="dd_TaxCalculationDate">
                                        <option value="InvoiceDate">Invoice Date</option>
                                        <option value="DeliveryDate">Delivery Date</option>
                                        <option value="DocumentDate">Document Date</option>
                                    </select></td>
                                <td><strong>Calculate</strong></td>
                                <td>
                                    <select name="select" class="form-control" id="dd_TaxCalculate">
                                        <option value="PerLine">Per Line</option>
                                        <option value="OnTotal">On Total</option>
                                    </select></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="clearfix"></div>
                    <div class="card-body" style="text-align: center">
                        <button type="button" id="btn_save" class="btn btn-primary" onclick="savedata();">Save</button>
                    </div>


                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <link href="../Administration/administration.css" rel="stylesheet" />
    <script type="text/javascript">

</script>
</asp:Content>
