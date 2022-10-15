<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="bank_posting_group.aspx.cs" Inherits="WebAccounts.bank_posting_group" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/bank_posting_group.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">

    <div class="">
        <div class="row">
            <div class="col">
                <p>
                    Administration
					>
					Setups
					>
					<%--<a href="http://staging.rksoftwareinc.com/accounts/Administration/posting_setup.aspx" class="text-dark page_path_link">Posting Setup</a>--%>
                    <a href="posting_setup.aspx" class="text-dark page_path_link">Posting Setup</a>
                    >
					<strong>Bank Posting Group</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <table id="bank_posting_group_table"
                            class="table table-striped table-hover table-condensed projects display datatable width-100"
                            style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th>Block</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>

     <!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Role</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Code</label>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" id="txt_code" maxlength="30" class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Description</label>
                            </div>
                            <div class="col-sm-6">
                                <textarea id="txt_description" maxlength="200" placeholder="Group description here..."></textarea>
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
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button"  class="btn btn-primary" onclick="saverole();">Save</button>
                    </div>
                
            </div>
        </div>
    </div>


    <!-- Modal Posting Set-up -->
    <div class="modal fade" id="myModalSETUP" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Posting Set-up</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Group</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="txt_groupcode" maxlength="30" readonly >
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Bank Account Ledger</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control" id="cbo_acledger">
                                
                            </select>
						</div>
					</div>
<%--                    <div class="form-group row" id="div_block">
						<div class="col-sm-6">
							<label for="input">Block</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox" class="form-control" id="chk_isblocked" />
						</div>
					</div>--%>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" id="btnbankpost" class="btn btn-primary" onclick="saveacnt();">Save</button>                        						
					</div>
				</div>
				</form>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <link href="administration.css" rel="stylesheet" />
    <script type="text/javascript">

    </script>

</asp:Content>
