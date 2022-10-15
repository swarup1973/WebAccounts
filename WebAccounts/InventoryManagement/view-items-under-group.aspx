<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="view-items-under-group.aspx.cs" Inherits="WebAccounts.InventoryManagement.view_items_under_group" %>
<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
    <title>View Item Under Group</title>
      <script type="text/javascript" src="js/viewitemsundergroup.js?v=1.1"></script>
     <style>
    .dataTables_length{
        margin-top : 15px;
        position : absolute;
    }
    .requ {
        color : #F00;
    }
      table.dataTable.display tbody tr:hover.selected > .sorting_1, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_1 {
        background-color: #a2aec7
    }

    table.dataTable.display tbody tr:hover.selected > .sorting_2, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_2 {
        background-color: #a3b0c9
    }

    table.dataTable.display tbody tr:hover.selected > .sorting_3, table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_3 {
        background-color: #a5b2cb
    }
      table.dataTable tbody tr.selected {
            background-color: #b0bed9
        }
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="">
       

        <div class="clearfix"></div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                    
                    <p><strong>Item Group:</strong> <span id="GroupDesc"></span></p>
                                <!-- start role table -->
                                <table id="addressbook" class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                                    <thead>
                                        <tr>
                                            <th>Item No</th>
                                            <th>Item Type</th>
                                            <th>Item Descreption</th>
                                            <th>Stock Unit of Measurement</th>
                                            <th>Item Category</th>
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


