<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="fixed-assets-under-group.aspx.cs" Inherits="WebAccounts.FixedAssets.fixed_assets_under_group" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Fixed Assets Under Group</title>
     <script type="text/javascript" src="js/FixedAssetMasterbyFaGroup.js?v=1.3"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
       

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                    
                    <p><strong>Fixed Assets Group:</strong> <span id="FAGroupDesc"></span></p>
                                <!-- start role table -->
                                <table id="addressbook" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Description</th>
                                            <th>FA Location</th>
                                            <th>Unit of Measurement</th>
                                            <th>Type</th>
                                            <th>Sub-Type</th>
                                            <th>FA Book	</th>
                                            <th>Depreciation Method</th>
                                            <th>Depreciation %</th>
                                        </tr>
                                    </thead>
                                     
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


