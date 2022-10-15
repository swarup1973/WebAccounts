<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="address-details.aspx.cs" Inherits="WebAccounts.Administration.address_details" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>Address Details</title>
    <script type="text/javascript" src="js/addressdetails.js"></script>
    <link href="administration.css" rel="stylesheet" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
       
        <form runat="server">
            <asp:TextBox ID="txt" runat="server" ClientIDMode="Static" Style="display: none;"></asp:TextBox>
        </form>
        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">

                        <p id="lblAddressName"></p>
                        <p id="lblCountryName"></p>

                        <!-- start role table -->
                        <table id="addressdtl" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space: nowrap; display: block; overflow-x: auto; overflow-y: hidden;">
                            <thead>
                                <tr>
                                    <th>County/State Name</th>
                                    <th>City/District Name</th>
                                    <th>Post Code</th>
                                    <th>Post Code Description</th>
                                </tr>
                            </thead>

                        </table>
                        <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Address Details - New</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Address Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtAddressCode" disabled="disabled" />
                            </div>
                            <div class="col-sm-3">
                                County/State Name
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddState">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Address Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtAddressName" disabled="disabled" />
                            </div>
                            <div class="col-sm-3">
                                City/District Name
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control" id="ddCity">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Country Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" disabled="disabled" id="txtCountryCode" />
                            </div>
                            <div class="col-sm-3">
                                Post Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPostCode" maxlength="15" />
                            </div>
                            <div class="col-sm-3">
                                Country Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" disabled="disabled" id="txtCountryName" />
                            </div>
                            <div class="col-sm-3">
                                Post Description
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="txtPostDesc" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="savedata();" id="btnSave">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal HTML Edit -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Address Details - Edit</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Address Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                County/State Name
                            </div>
                            <div class="col-sm-3">
                                <select name="select9">
                                    <option>--</option>
                                    <option>--</option>
                                    <option>...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Address Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                City/District Name
                            </div>
                            <div class="col-sm-3">
                                <select name="select9">
                                    <option>--</option>
                                    <option>--</option>
                                    <option>...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Country Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Post Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Country Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Post Code Description
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal HTML View -->
    <div class="modal fade" id="myModalVIEW" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Address Details - View</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-3">
                                Address Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                County/State Name
                            </div>
                            <div class="col-sm-3">
                                <select name="select9">
                                    <option>--</option>
                                    <option>--</option>
                                    <option>...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Address Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                City/District Name
                            </div>
                            <div class="col-sm-3">
                                <select name="select9">
                                    <option>--</option>
                                    <option>--</option>
                                    <option>...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                Country Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Post Code
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Country Name
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                            <div class="col-sm-3">
                                Post Code Description
                            </div>
                            <div class="col-sm-3">
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    <!-- Modal HTML Wizard -->
    <div class="modal fade" id="myModalWIZARD" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="height: 100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Address Creation Wizard</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <p>
                                    The Address Creation Wizard will help you to create Post Codes automatically based on the County/State and or City/District selected (if already created) or Created (if not created earlier).<br />
                                    Also removal of Post Codes created erroneously through the wizard can be done.
                                </p>
                            </div>

                            <div class="col-sm-12">
                                <div class="col-sm-3">
                                    Country Code:
                                </div>
                                <div class="col-sm-3" id="divcountrycode">
                                    
                                </div>
                                <div class="col-sm-3">
                                    Address Code: 
                                </div>
                                <div class="col-sm-3" id="divaddresscode">
                                    Display silected address code
                                </div>
                                <div class="col-sm-3">
                                    Country Name: 
                                </div>
                                <div class="col-sm-3" id="divcountryname">
                                    Display selected country name
                                </div>
                                <div class="col-sm-3">
                                    Address Name
                                </div>
                                <div class="col-sm-3" id="divaddressname">
                                    Display selected address name
                                </div>
                            </div>

                            <div class="col-sm-12">
                                <div class="col-sm-6">
                                    Create/Remove Location
                                </div>
                                <div class="col-sm-6">
                                    <select id="selectMe">
                                        <option value="1">1. Create</option>
                                        <option value="2">2. Remove</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div id="option1" class="group">
                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <strong>Create</strong>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    Select County/State
                                </div>
                                <div class="col-sm-6">
                                    <select class="form-control" id="ddWizardState">
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    Select City/District
                                </div>
                                <div class="col-sm-6">
                                    <select class="form-control" id="ddWizardCity">
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    Post Code Starting from
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" id="txtStart" />
                                </div>
                                <div class="col-sm-6">
                                    Post Code Ending on
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" id="txtStartEnd" />
                                </div>
                            </div>
                        </div>

                        <div id="option2" class="group">
                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <strong>Remove</strong>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    Select County/State to delete all Post Codes  
                                </div>
                                <div class="col-sm-6">
                                    <select class="form-control" id="ddWizardRemoveState">
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    Select City/District to delete all Post Codes 
                                </div>
                                <div class="col-sm-6">
                                    
                                        <select class="form-control" id="ddWizardRemoveCity">
                                        </select>
                                    
                                </div>
                                <div class="col-sm-6">
                                    Post Code Starting from
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" id="txtRemoveStart" />
                                </div>
                                <div class="col-sm-6">
                                    Post Code Ending to
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" id="txtRemoveEnd" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary"  onclick="savedataBulk();" id="btnwiz">OK</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>

                    </div>
                </form>
            </div>
        </div>
    </div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
        let editor; // use a global for the submit and return data rendering in the examples



        var showmodal = function () {
            $("#myModal").modal('show');
        };
        var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
        var showmodalview = function () {
            $("#myModalVIEW").modal('show');
        };
        //var showmodalwizard = function () {
        //    $("#myModalWIZARD").modal('show');
        //};


    </script>
     <script>
         $(document).ready(function () {
             $('.group').hide();
             $('#option1').show();
             $('#selectMe').change(function () {
                 $('.group').hide();
                 $('#option' + $(this).val()).show();
             })
         });
     </script>
</asp:Content>


