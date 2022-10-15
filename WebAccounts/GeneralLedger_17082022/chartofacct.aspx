<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master"
    AutoEventWireup="true" CodeBehind="chartofacct.aspx.cs"
    Inherits="WebAccounts.chartofacct" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">

    <div class="row">
            <div class="col">
                <p>
                   General Ledger
					>
					Setup
					>
					<strong>Chart of Accounts (CoA)</strong>
                </p>
            </div>
        </div>

    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-body">
                            <!-- start Accounts list -->
                            <table
                                id="coa_accounts_table"
                                class="table table-striped table-hover table-condensed projects display datatable">

                            </table>
                            <!-- end Accounts list -->
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="server">
    <script type="text/javascript" src="js/chartofacct.js"></script>
    <link href="chartodacct.css" rel="stylesheet" />
   <!-- <script type="text/javascript" src="js/coa_table.js"></script>-->
    <script type="text/javascript">
        $(document).ready(function () {
            ChartofacctObject.do_init();
            // $("#coa_accounts_table tbody").on("mouseenter", "td", function () {
            //   var colIdx = table.cell(this).index().column;

            //   $(table.cells().nodes()).removeClass("highlight");
            //   $(table.column(colIdx).nodes()).addClass("highlight");
            // });
            /*
              $('#btn_newdimensionset').on('click', function () {
                  DimObject.dimensionsetdata.dimSetId = "";
                  window.location.href = "dimensionsetnew.aspx";
              });
            */
        });
    </script>
</asp:Content>
