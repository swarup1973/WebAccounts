<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="variant-value.aspx.cs" Inherits="WebAccounts.variant_value" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
   <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <script type="text/javascript" src="js/variant-value.js"></script>
    <title>Variant Value</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">
    <div class="">
        <div class="row">
            <div class="col">
                <p>
                     Inventory Managemnet
					>
					Setup 
					>
                    <a href="item-variant.aspx">Item Variant</a> 
                    >
					<strong>Variant Value</strong>
                </p>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">

                 <div class="card">
                    <div class="card-body">
                        <div class="col-md-12 col-sm-12">
                            Variant Code: <strong id="acNumber"></strong> Variant Name: <strong id="bankName"></strong>
                        </div>

                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <!-- start role table -->
                        <table id="journal_table" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block;">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Name</th>
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
    <div class="modal fade" id="myModal" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Variant-Value - Edit</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-header">
                    <p>
                        <span class="text-danger">*</span> indicates a required field.
                    </p>
                </div>
                <form>
                    <div class="modal-body" id="div_modal">

                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Variant Value Code</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="txt_VariantValCd" maxlength="30">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="input">Variant Value Name</label><span class="text-danger">*</span>
                            </div>
                            <div class="col-sm-6">
                                 <input type="text" class="form-control" id="txt_VariantVal" maxlength="60">
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
                        <button type="button" id="btn_save" class="btn btn-primary" onclick="savedata();">Save</button>
                        <button type="button" id="btn_cancel" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
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
