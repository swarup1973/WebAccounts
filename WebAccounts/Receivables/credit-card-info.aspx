<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="credit-card-info.aspx.cs" Inherits="WebAccounts.credit_card_info" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/creditcardinfo.js"></script>
    <title>Customer Overview</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <p>
                    Receivables
					>
					Master
					>
					<a href="customer-overview.aspx" class="text-dark page_path_link">Customer Overview</a>
                    >
					<strong>Credit Card Information</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <div class="col-md-12 col-sm-12">
                            Customer: <select id="dd_customers" style="width: 200px; height: 24px;" onchange="onvendorchange(this);">
                            </select>
                           <!-- Vendor Code: <strong id="acNumber"></strong>   Vendor Name: <strong id="bankName"></strong>-->
                        </div>

                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <!-- start role table -->
                        <table id="vendor_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Credit Card No.</th>
                                    <th>Expiry Date</th>
                                    <th>Name on the Card</th>
                                    <th>Address</th>
                                    <th>Pin</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>



    <!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Credit Card - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Customer Code</label>
                            </div>
                            <div class="col-sm-6">
                                <label id="lbl_customercode"></label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Customer Name</label>
                            </div>
                            <div class="col-sm-6">
                                <label id="lbl_customername"></label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Credit Card No.</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-6">
                                <input type="number" class="form-control" id="txt_cardno" maxlength="20"  pattern="^[0-9]*$" onkeypress="return onlyNumberKey(event)">
                            </div>
                        </div>
                        <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Expiry Date</label><span class="text-danger">*</span>
						</div>
						<div class="col-sm-6">
							<input type="month" class="form-control" id="txt_expirydate" >
						</div>
					</div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Name on the Card</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txt_name" maxlength="100">
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Address</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txt_Address" maxlength="300">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Pin</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="number" class="form-control" id="txt_pin" maxlength="100"  pattern="^[0-9]*$" onkeypress="return onlyNumberKey(event)">
                            </div>
                        </div>
                        <div class="form-group row" id="div_block">
                            <div class="col-sm-6">
                                <label for="input">Block</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="checkbox" class="form-control" id="chk_isblocked" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="savedata();">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <link href="../Administration/administration.css" rel="stylesheet" />
    <script type="text/javascript">

    </script>
</asp:Content>