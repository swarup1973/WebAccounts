<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="fixed_assets_posting_group.aspx.cs" Inherits="WebAccounts.fixed_assets_posting_group" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/fixed_assets_posting_group.js"></script>
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
					<a href="posting_setup.aspx" class="text-dark page_path_link">Posting Setup</a>
					>
					<strong>Fixed Assets Posting</strong>
				</p>
			</div>
		</div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <table id="assets_posting_group_table"
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
                            <textarea id="txt_description" maxlength="200"></textarea>
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
                    <button type="button" class="btn btn-primary" onclick="saverole();">Save</button>
                </div>

            </div>
        </div>
    </div>

    <!-- Modal Posting Set-up -->
    <div class="modal fade" id="myModalSETUP" tabindex="-1">
        <div class="modal-dialog" style="height: 100%;">
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
                                <input type="text" class="form-control" id="txt_groupcode" maxlength="30" readonly>
                            </div>
                        </div>                        
                        <%--<div class="form-group row">
						    <div class="col-sm-6">
							    <label for="input">Acquisition AC</label>
						    </div>
						    <div class="col-sm-6">
							    <select class="form-control" id="cbo_AcCd_Acquisition">
                                </select>
						    </div>
					    </div>
                        <div class="form-group row">
						    <div class="col-sm-6">
							    <label for="input">Accm. Depreciation AC </label>
						    </div>
						    <div class="col-sm-6">
							    <select class="form-control" id="cbo_AcCd_AccmDepreciation">
                                </select>
						    </div>
					    </div>
                        <div class="form-group row">
						    <div class="col-sm-6">
							    <label for="input">Depreciation Expense AC</label>
						    </div>
						    <div class="col-sm-6">
							    <select class="form-control" id="cbo_AcCd_DepreExpns">
                                </select>
						    </div>
					    </div>
                        <div class="form-group row">
						    <div class="col-sm-6">
							    <label for="input">Adjustment AC on Disposal</label>
						    </div>
						    <div class="col-sm-6">
							    <select class="form-control" id="cbo_AcCd_AdjOnDisposal">
                                </select>
						    </div>
					    </div>
                        <div class="form-group row">
						    <div class="col-sm-6">
							    <label for="input">Gain/Loss on Disposal</label>
						    </div>
						    <div class="col-sm-6">
							    <select class="form-control" id="cbo_AcCd_GainLossOnDisposal">
                                </select>
						    </div>
					    </div>--%>


                        <div class="form-group row">
						    <div class="col-sm-6">
                             <label for="input">Cost of Acquisition A/C</label>
						    </div>
						    <div class="col-sm-6">
							    <select class="form-control" id="cbo_AcCd_Acquisition">  
                                </select>
						    </div>
					    </div>

                        <div class="form-group row">
						    <div class="col-sm-6">
							    <label for="input">Accum. Depreciation A/C</label>
						    </div>
						    <div class="col-sm-6">
							    <select class="form-control" id="cbo_AcCd_AccumDepreciation">   
                                </select>
						    </div>
					    </div>
                        <div class="form-group row">
						    <div class="col-sm-6">
							    <label for="input">Cost of Acq. on A/C Disposal</label>
						    </div>
						    <div class="col-sm-6">
							    <select class="form-control" id="cbo_AcCd_AccumOnDisposal">
                                </select>
						    </div>
					    </div>
                        <div class="form-group row">
						    <div class="col-sm-6">
							    <label for="input">Accum. Depreciation A/C on Disposal</label>
						    </div>
						    <div class="col-sm-6">
							    <select class="form-control" id="cbo_AcCd_AccumDepreOnDisposal">
                                </select>
						    </div>
					    </div>
                           <div class="form-group row">
						    <div class="col-sm-6">
							    <label for="input">Gain on Sale/Disposal A/C</label>
						    </div>
						    <div class="col-sm-6">
							    <select class="form-control" id="cbo_AcCd_GainOnSaleDisposal">
                                </select>
						    </div>
					    </div>
                               <div class="form-group row">
						    <div class="col-sm-6">
							    <label for="input">Loss on Sale/Disposal A/C</label>
						    </div>
						    <div class="col-sm-6">
							    <select class="form-control" id="cbo_AcCd_LossOnSaleDisposal">
                                </select>
						    </div>
					    </div>
                               <div class="form-group row">
						    <div class="col-sm-6">
							    <label for="input">Repair & Maintenance A/C</label>
						    </div>
						    <div class="col-sm-6">
							    <select class="form-control" id="cbo_AcCd_RepairMaintenance">
                                </select>
						    </div>
					    </div>
                               <div class="form-group row">
						    <div class="col-sm-6">
							    <label for="input">Depreciation Expense A/C</label>
						    </div>
						    <div class="col-sm-6">
							    <select class="form-control" id="cbo_AcCd_DepExpns">
                                </select>
						    </div>
					    </div>


<%--                        <div class="form-group row" id="div_block">
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
