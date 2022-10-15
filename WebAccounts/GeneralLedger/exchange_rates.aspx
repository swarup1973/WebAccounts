<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="exchange_rates.aspx.cs" Inherits="WebAccounts.exchange_rates" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="JS/exchange_rates.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

        <div class="row">
            <div class="col">
                <p>
                   General Ledger
					>
					Setup
					>
                    <a href="currency.aspx">Currency</a> >
                    <strong>Exchange Rates</strong>
                </p>
            </div>
        </div>


        <div class="clearfix"></div>
		

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                Currency Code: <strong id="currCode"></strong>. Currency Description: <strong id="currDescription"></strong>
                                <table id="exchange_rates_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                              <th>Date</th>
                                              <th>Start Date</th>
                                              <th>Exchange Rate</th>
                                              <th>Exchange Rate Per</th>
                                        </tr>
                                    </thead>
                                       <tbody></tbody>
                                </table>
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>



<!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title">Exchange Rates - New</h5>
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
               		 <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Start Date:</label>
						</div>
						<div class="col-sm-6">
							<input class="date-picker" type="date" required id="txt_startDt"/>
						</div>
						<div class="col-sm-6">
							<label for="input">Exchange Rate:</label>
						</div>
						<div class="col-sm-6">
							<input class="form-control" type="text" autocomplete="off" onkeypress="return isNumberKey( event,this);" required id="txt_exchangeRate"/>
						</div>
						<div class="col-sm-6">
							<label for="input">Exchange Rate Per:</label>
						</div>
						<div class="col-sm-6">
							<input class="form-control" type="text" autocomplete="off" onkeypress="return isNumberKey( event,this);" id="txt_exchangeRatePer"/>
						</div>
					</div>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary"  onclick="saveexchange();">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
				</form>
            </div>
        </div>
    </div>
   
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <link href="generalledger.css" rel="stylesheet" />
    <script type="text/javascript">
        function isNumberKey(evt, element) {
            // var n = Number(txt.value).toFixed(6);
            var charCode = (evt.which) ? evt.which : event.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode == 46 || charCode == 8))
                return false;
            else {
                var len = $(element).val().length;
                var index = $(element).val().indexOf('.');
                if (index > 0 && charCode == 46) {
                    return false;
                }
                if (index > 0) {
                    var CharAfterdot = (len + 1) - index;
                    if (CharAfterdot > 7) {
                        return false;
                    }
                }

            }
            return true;
        }

    </script>
</asp:Content>