<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="tax-setup.aspx.cs" Inherits="WebAccounts.tax_setup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/tax-setup.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">

        <div class="row">
            <div class="col">
                <p>
                    General Ledger
					>
					Master
					>
                    <a href="tax-group.aspx" class="text-dark page_path_link">Tax Group</a>
                    >
					<strong>Tax Setup</strong>

                </p>
            </div>
        </div>


        <div class="clearfix"></div>


        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <div class="col-md-12 col-sm-12">
                            <strong>Tax Group Code:
                                <label id="lbl_taxgroupcode" />
                            </strong>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <!-- start role table -->

                        <table id="budget_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Tax Code</th>
                                    <th>Description</th>
                                    <th>Tax Percent</th>
                                    <th>Exemption Percent</th>
                                    <th>Block</th>
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
    <div class="modal fade" id="myModal" tabindex="-1">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tax Setup - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">

                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Tax Code</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-6">
                                <select class="form-control" id="dd_TaxId">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Description</label>
                            </div>
                            <div class="col-sm-6">
                                <label for="input" id="lbl_taxdescription"></label>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Tax Percent</label>
                            </div>
                            <div class="col-sm-6">
                                <label for="input" id="lbl_taxpercent"></label>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Exemption Percent</label>
                            </div>
                            <div class="col-sm-6">
                                <label for="input" id="lbl_exemptionpercent"></label>
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
                        <button type="button" class="btn btn-primary" onclick="savedata();">Add</button>
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
