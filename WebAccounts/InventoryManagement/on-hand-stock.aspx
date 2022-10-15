<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="WebAccounts.roles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div class="">

        <div class="row">
            <div class="col">
                <p>
                   General Ledger
					>
					<a href="item-master-overview.aspx">Item Master Overview</a>
					>
                    <strong>On-Hand Stock</strong>
                </p>
            </div>
        </div>


        <div class="clearfix"></div>
		

        <div class="row">
            <div class="col">
            
            <div class="card">
                <div class="card-body">
                <div class="col-md-12 col-sm-12">    
                	Item Code: <strong>Item Code Goes Here</strong> | Item Description : <strong>Item Description Goes Here</strong> | Stock Unit of Measurement: <strong>Stock Unit of Measurement Goes Here</strong>
                </div>

                </div>
                </div>
                
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                <table id="item_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>Warehouse</th>
                                              <th>Variant-1</th>
                                              <th>Variant-2</th>
                                              <th>Variant-3</th>
                                              <th>Variant-4</th>
                                              <th>Batch No</th>
                                              <th>Serial No</th>
                                              <th>Physical Qty.</th>
                                              <th>Reserved (Sales Order) Qty.</th>
                                              <th>Available Qty.</th>
                                              <th>Qty. on Purchase Order</th>
                                              <th>Total Qty.</th>
                                              <th>Total Cost</th>
                                              <th>Cost per Unit</th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                          <tr>
                                            <td>--</td>
                                              <td>--</td>
                                              <td>--</td>
                                              <td>--</td>
                                              <td>--</td>
                                              <td>--</td>
                                              <td>--</td>
                                              <td>--</td>
                                              <td>--</td>
                                              <td>--</td>
                                              <td>--</td>
                                              <td>--</td>
                                              <td>--</td>
                                              <td>--</td>
                                        </tr>
                                      </tbody>
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

