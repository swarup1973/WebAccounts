var ipaddress = "";
var objCountry;
var companylogo="";
var contentType="";
var imgfileName = "";
var objItemVendor;
$(document).ready(function () {
   
    $("#chkCostPriceByVariant").change(function () {

        if ($('#chkCostPriceByVariant').is(':checked')) {
            $('#ddVariantId_1').prop("disabled", false);
            $('#ddVariantId_2').prop("disabled", false);
            $('#ddVariantId_3').prop("disabled", false);
            $('#ddVariantId_4').prop("disabled", false);
           
        }
        else {
            $('#ddVariantId_1').val(-1);
            $('#ddVariantId_2').val(-1);
            $('#ddVariantId_3').val(-1);
            $('#ddVariantId_4').val(-1);
            $('#ddVariantId_1').prop("disabled", true);
            $('#ddVariantId_2').prop("disabled", true);
            $('#ddVariantId_3').prop("disabled", true);
            $('#ddVariantId_4').prop("disabled", true);
        }

    });
    $("#chkWarranty").change(function () {

        if ($('#chkWarranty').is(':checked')) {
            $('#txtWarrantyPeriod').prop("disabled", false);
           

        }
        else {
            $('#txtWarrantyPeriod').val(0);
            $('#txtWarrantyPeriod').prop("disabled", true);
            
        }

    });
    $("#chkReserveReq").change(function () {

        if ($('#chkReserveReq').is(':checked')) {
            $('#ddReservation').prop("disabled", false);


        }
        else {
            $('#ddReservation').val(-1);
            $('#ddReservation').prop("disabled", true);

        }

    });
    var cuserid = '<%=Session["userid"].ToString() %>';
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ipaddress = e.ip;
    });      
    //localStorage.menu_id_premission = 326;
    if (localStorage.ItemMasterOverviewmenuid == '' || localStorage.ItemMasterOverviewmenuid == undefined) {
        localStorage.ItemMasterOverviewmenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage.ItemMasterOverviewmenuid;
    }
    //setImage();
    $("#myModal").modal({
        show: false,
        backdrop: 'static'
    });

    $("#click-me").click(function () {
        $("#myModal").modal("show");
    });

    localStorage.menu_id_premission;
    ItemmasterOverviewObject.do_populateMasterDropdown('ITEMGROUP', $('#ddGroupId'));

    
    //ItemmasterOverviewObject.do_loaddata();
    ItemmasterOverviewObject.do_getUserPagepermission();
  
    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var ItemmasterOverviewObject = {

    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _addressdetailsmenuid: '',
    _vendorperm : '',
    _vendormenuid: '',
    _variantsetupperm: '',
    _variantsetupmenuid: '',
    _substituteperm: '',
    _substitutemenuid: '',
    _itempriceperm: '',
    _itempricemenuid: '',
    _unitconversionperm: '',
    _unitconversionemenuid: '',
    _itemvendorpriceperm: '',
    _itemvendorpricemenuid: '',
    _itemcustomerpriceperm: '',
    _itemcustomerpricemenuid: '',
    _itemvendordiscperm: '',
    _itemvendordiscmenuid: '',
    _itemcustomerdiscperm: '',
    _itemcustomerdismenuid: '',
    _saleinvoicediscperm: '',
    _saleinvoicediscmenuid: '',
    _purchaseinvoicediscperm: '',
    _purchaseinvoicediscmenuid: '',
    do_loaddata: () => {
        var issBlock=0,ItemCd = '', CoCd = $("#ddlCompany").val(), ItemDesc='', SearchDesc='', InternalId=0, GroupId=0, CategoryId=0, ItemType=0, PostingGrpId=0, IsStop=0, AllowNegtvStock=0, ItemPic=0, Notes='', SI_UomId=0, SI_STCompId=0
            , PR_LeadTime=0, PR_DefltVendorId=0, PR_STCompId=0, PR_UomId=0, PR_LossOnPurchase = 0, CP_StdCost = 0, CP_ProfitPer = 0, CP_SalePrice =0, CP_MaxSalePrice=0, CP_CostMethod=0
            , CP_CostPriceByVariant =0, P_MinStockLevel=0, P_SafetyStock=0, P_MaxStockLevel=0, P_StockWarning=0, TM_DirectInvoicing=0, TM_ACARN=0, TM_QuarantineReq=0
            , TM_RegdReq=0, TM_RecvReq=0, TM_PickReq=0, TM_ReserveReq=0, TM_Reservation=0, SA_DefWarehouse=0, SA_DefLocation=0, SA_UomId=0, SA_CaptureDOM=0, SA_BBU=0, SA_Warranty=0
            , SA_WarrantyPeriod=0, SA_TrackBatch=0, SA_TrackSrNo=0, SA_LotNo=0, SA_VariantId_1=0, SA_VariantId_2=0, SA_VariantId_3=0, SA_VariantId_4=0, FT_GTIN=0
            , FT_TariffCd=0, FT_COOId=0, TI_HSNId=0, TI_PriceWithTax=0, created_by='', creator_MAC_add='';

       

        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),

            $.ajax({
                //url: apiurl + 'api/administratorCompanyProfileOperation',
                url: apiurl + 'api/procurementItemOperation',
                type: 'POST',
                data: { p_mode: "getlist", RowId: -1, ItemCd: ItemCd, CoCd: CoCd, ItemDesc: ItemDesc, SearchDesc: SearchDesc, InternalId: InternalId, GroupId: GroupId, CategoryId: CategoryId, ItemType: ItemType, PostingGrpId: PostingGrpId, IsBlock: issBlock, IsStop: IsStop, AllowNegtvStock: AllowNegtvStock, ItemPic: ItemPic, Notes: Notes, SI_UomId: SI_UomId, SI_STCompId: SI_STCompId, PR_LeadTime: PR_LeadTime, PR_DefltVendorId: PR_DefltVendorId, PR_STCompId: PR_STCompId, PR_UomId: PR_UomId, PR_LossOnPurchase: PR_LossOnPurchase, CP_StdCost: CP_StdCost, CP_ProfitPer: CP_ProfitPer, CP_SalePrice: CP_SalePrice, CP_MaxSalePrice: CP_MaxSalePrice, CP_CostMethod: CP_CostMethod, CP_CostPriceByVariant: CP_CostPriceByVariant, P_MinStockLevel: P_MinStockLevel, P_SafetyStock: P_SafetyStock, P_MaxStockLevel: P_MaxStockLevel, P_StockWarning: P_StockWarning, TM_DirectInvoicing: TM_DirectInvoicing, TM_ACARN: TM_ACARN, TM_QuarantineReq: TM_QuarantineReq, TM_RegdReq: TM_RegdReq, TM_RecvReq: TM_RecvReq, TM_PickReq: TM_PickReq, TM_ReserveReq: TM_ReserveReq, TM_Reservation: TM_Reservation, SA_DefWarehouse: SA_DefWarehouse, SA_DefLocation: SA_DefLocation, SA_UomId: SA_UomId, SA_CaptureDOM: SA_CaptureDOM, SA_BBU: SA_BBU, SA_Warranty: SA_Warranty, SA_WarrantyPeriod: SA_WarrantyPeriod, SA_TrackBatch: SA_TrackBatch, SA_TrackSrNo: SA_TrackSrNo, SA_LotNo: SA_LotNo, SA_VariantId_1: SA_VariantId_1, SA_VariantId_2: SA_VariantId_2, SA_VariantId_3: SA_VariantId_3, SA_VariantId_4: SA_VariantId_4, FT_GTIN: FT_GTIN, FT_TariffCd: FT_TariffCd, FT_COOId: FT_COOId, TI_HSNId: TI_HSNId, TI_PriceWithTax: TI_PriceWithTax, created_by: created_by, creator_MAC_add: creator_MAC_add },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    ItemmasterOverviewObject.do_populatewarehouseData(obj);
                },
                error: function (err) {
                    alert(err.statusText);
                }
            }); 
       

    },
    do_populatewarehouseData: (obj) => {
        // editor init
        
        var editor = new $.fn.dataTable.Editor({
            table: "#addressbook",
            fields: [
                { label: "ItemCd", name: "ItemCd" },
                { label: "ItemType", name: "ItemType" },
                { label: "ItemDesc", name: "ItemDesc" },
                { label: "InternalId", name: "InternalId" },
                { label: "unitcost", name: "unitcost" },
                { label: "VendCd", name: "VendCd" },
                { label: "VendName", name: "VendName" },
                { label: "SearchDesc", name: "SearchDesc" },
                { label: "GroupDesc", name: "GroupDesc" },
                { label: "CategoryDesc", name: "CategoryDesc" },
                { label: "IsBlock", name: "IsBlock" },
                { label: "IsStop", name: "IsStop" }
            ],
        });
        var roletable = $("#addressbook");

        var roledata = [];
        roledata = obj;

        

        roletable.dataTable({
            //dom: "Bfrtip",
            dom: "lBfrtip",
            fixedHeader: true,
            "pageLength": 10,
            data: roledata,
            columns: [
                { data: "ItemCd" },
                { data: "ItemType" },
                { data: "ItemDesc" },
                { data: "InternalId" },
                { data: "UomDesc" },
                { data: "VendCd" },
                { data: "VendName" },
                { data: "SearchDesc" },
                { data: "GroupDesc" },
                { data: "CategoryDesc" },
                { data: "IsBlock" },
                { data: "IsStop" }
            ],
            columnDefs: [{
                orderable: false,
                'render': function (data, type, full, meta) {
                    //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                    return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                },
                targets: 10
            },
            {
                orderable: false,
                'render': function (data, type, full, meta) {
                    //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                    return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                },
                targets: 11
            }

            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: function () { roleaction('-1', 'add'); },
                    attr: {
                        title: 'New',
                        id: 'country_overview_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'country_overview_Edit'
                    },
                },
                {
                    extend: "remove", editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'country_overview_delete'
                    },
                },
                {
                    add: "view", text: 'View', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'view'); },
                    attr: {
                        title: 'View',
                        id: 'country_overview_View'
                    }

                },
                {
                    add: "viewitemprice", text: 'View Item Price' , editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'view'); },
                    attr: {
                        title: 'View Item Price',
                        id: 'view_item_price'
                    }

                },
                {
                    add: "viewnotes", text: 'View Notes', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'view'); },
                    attr: {
                        title: 'View Notes',
                        id: 'view_notes'
                    }

                },
                {
                    add: "Block", text: 'Block', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'view'); },
                    attr: {
                        title: 'Block',
                        id: 'block'
                    }

                },
                {
                    add: "stop", text: 'Stop', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'view'); },
                    attr: {
                        title: 'Stop',
                        id: 'stop'
                    }

                },
                {
                    add: "VariantsSetup", text: 'Variants Setup', action: function () { otherWindow($('.selected').attr('rowid'), 'VARIANTSSETUP'); },
                    attr: {
                        title: 'Variants Setup',
                        id: 'Variants_Setup'
                    }

                },
                {
                    add: "Unit_Conversion", text: 'Unit Conversion', action: function () { otherWindow($('.selected').attr('rowid'), 'UNITCONVERSION'); },
                    attr: {
                        title: 'Unit Conversion',
                        id: 'Unit_Conversion'
                    }

                },
                {
                    add: "ItemPrice", text: 'Item Price', action: function () { otherWindow($('.selected').attr('rowid'), 'ITEMPRICE'); },
                    attr: {
                        title: 'Item Price',
                        id: 'Item_Price'
                    }

                },
                {
                    add: "Item_Vendor_Price", text: 'Item-Vendor Price', action: function () { otherWindow($('.selected').attr('rowid'), 'ITEMVENDORPRICE'); },
                    attr: {
                        title: 'Item-Vendor Price',
                        id: 'Item_Vendor_Price'
                    }

                },
                {
                    add: "Item_Customer_Price", text: 'Item-Customer Price', action: function () { otherWindow($('.selected').attr('rowid'), 'ITEMCUSTOMERPRICE'); },
                    attr: {
                        title: 'Item-Customer Price',
                        id: 'Item_Customer_Price'
                    }

                },
                {
                    add: "Item-Vendor-Discount", text: 'Item-Vendor Discount', action: function () { otherWindow($('.selected').attr('rowid'), 'ITEMVENDORDISCOUNT'); },
                    attr: {
                        title: 'Item-Vendor Discount',
                        id: 'Item-Vendor-Discount'
                    }

                },
                {
                    add: "Item-Customer-Discount", text: 'Item-Customer Discount', action: function () { otherWindow($('.selected').attr('rowid'), 'ITEMCUSTOMERDISCOUNT'); },
                    attr: {
                        title: 'Item-Customer Discount',
                        id: 'Item-Customer-Discount'
                    }

                },
                {
                    add: "Purchase-Invoice-Discount", text: 'Purchase Invoice Discount', action: function () { otherWindow($('.selected').attr('rowid'), 'PURCHASEINVOICEDISCOUNT'); },
                    attr: {
                        title: 'Purchase Invoice Discount',
                        id: 'Purchase-Invoice-Discount'
                    }

                },
                {
                    add: "Sale-Invoice-Discount", text: 'Sale Invoice Discount', action: function () { otherWindow($('.selected').attr('rowid'), 'SALEINVOICEDISCOUNT'); },
                    attr: {
                        title: 'Sale Invoice Discount',
                        id: 'Sale-Invoice-Discount'
                    }

                },
                {
                    add: "Substitute_Items", text: 'Substitute Items', action: function () { otherWindow($('.selected').attr('rowid'), 'substitute'); },
                    attr: {
                        title: 'Substitute Items',
                        id: 'Substitute_Items'
                    }

                },
                {
                    add: "Vendors", text: 'Vendors', action: function () { otherWindow($('.selected').attr('rowid'),  'vendor'); },
                    attr: {
                        title: 'Vendors',
                        id: 'Vendors'
                    }

                },
                {
                    add: "Transactions", text: 'Transactions', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'view'); },
                    attr: {
                        title: 'Transactions',
                        id: 'Transactions'
                    }

                }

                
              
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowid", `${data.RowId}`);
            },
        });
        
        var table = $('#addressbook').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
               
                if (!ItemmasterOverviewObject._deleteperm[0]) {
                    $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#country_overview_delete').prop("disabled", true);
                    $('#country_overview_delete').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }
        });


        if (!ItemmasterOverviewObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!ItemmasterOverviewObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        
        if (!ItemmasterOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
     
        if (!ItemmasterOverviewObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
        if (!ItemmasterOverviewObject._vendorperm[0]) {
            $('#Vendors').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Vendors').prop("disabled", true);
            $('#Vendors').attr('title', 'do not have permission !!!');
            table.button(18).action(function () {
                this.active(false);
            });
        }
        if (!ItemmasterOverviewObject._variantsetupperm[0]) {
            $('#Variants_Setup').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Variants_Setup').prop("disabled", true);
            $('#Variants_Setup').attr('title', 'do not have permission !!!');
            table.button(8).action(function () {
                this.active(false);
            });
        }
        if (!ItemmasterOverviewObject._substituteperm[0]) {
            $('#Substitute_Items').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Substitute_Items').prop("disabled", true);
            $('#Substitute_Items').attr('title', 'do not have permission !!!');
            table.button(17).action(function () {
                this.active(false);
            });
        }
        if (!ItemmasterOverviewObject._itempriceperm[0]) {
            $('#Item_Price').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Item_Price').prop("disabled", true);
            $('#Item_Price').attr('title', 'do not have permission !!!');
            table.button(10).action(function () {
                this.active(false);
            });
        }
        if (!ItemmasterOverviewObject._unitconversionperm[0]) {
            $('#Unit_Conversion').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Unit_Conversion').prop("disabled", true);
            $('#Unit_Conversion').attr('title', 'do not have permission !!!');
            table.button(9).action(function () {
                this.active(false);
            });
        }
        if (!ItemmasterOverviewObject._itemcustomerpriceperm[0]) {
            $('#Item_Customer_Price').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Item_Customer_Price').prop("disabled", true);
            $('#Item_Customer_Price').attr('title', 'do not have permission !!!');
            table.button(12).action(function () {
                this.active(false);
            });
        }
        if (!ItemmasterOverviewObject._itemvendordiscperm[0]) {
            $('#Item-Vendor-Discount').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Item-Vendor-Discount').prop("disabled", true);
            $('#Item-Vendor-Discount').attr('title', 'do not have permission !!!');
            table.button(13).action(function () {
                this.active(false);
            });
        }
        if (!ItemmasterOverviewObject._itemcustomerdiscperm[0]) {
            $('#Item_Customer_Price').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Item_Customer_Price').prop("disabled", true);
            $('#Item_Customer_Price').attr('title', 'do not have permission !!!');
            table.button(14).action(function () {
                this.active(false);
            });
        }
        if (!ItemmasterOverviewObject._saleinvoicediscperm[0]) {
            $('#Sale-Invoice-Discount').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Sale-Invoice-Discount').prop("disabled", true);
            $('#Sale-Invoice-Discount').attr('title', 'do not have permission !!!');
            table.button(16).action(function () {
                this.active(false);
            });
        }
        if (!ItemmasterOverviewObject._purchaseinvoicediscperm[0]) {
            $('#Purchase-Invoice-Discount').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Purchase-Invoice-Discount').prop("disabled", true);
            $('#Purchase-Invoice-Discount').attr('title', 'do not have permission !!!');
            table.button(15).action(function () {
                this.active(false);
            });
        }
        //if (!ItemmasterOverviewObject._uploadcountry[0]) {
        //    $('#addressdtl').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        //    $('#addressdtl').prop("disabled", true);
        //    $('#addressdtl').attr('title', 'do not have permission !!!');
        //    table.button(4).action(function () {
        //        this.active(false);
        //    });
        //}
       

    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(ItemmasterOverviewObject);
        
        ItemmasterOverviewObject._vieweperm = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'ITEMS', 'view');
        ItemmasterOverviewObject._createperm = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'ITEMS', 'create');
        ItemmasterOverviewObject._editperm = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'ITEMS', 'edit');
        ItemmasterOverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'ITEMS', 'delete');
        ItemmasterOverviewObject._vendorperm = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'VENDORS', 'view');
        ItemmasterOverviewObject._vendormenuid = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'VENDORS', 'menuid');
        ItemmasterOverviewObject._variantsetupperm = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'VARIANTS SETUP', 'view');
        ItemmasterOverviewObject._variantsetupmenuid = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'VARIANTS SETUP', 'menuid');
        ItemmasterOverviewObject._substituteperm = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'SUBSTITUTE ITEM', 'view');
        ItemmasterOverviewObject._substitutemenuid = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'SUBSTITUTE ITEM', 'menuid');
        ItemmasterOverviewObject._itempriceperm = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'ITEM PRICE', 'view');
        ItemmasterOverviewObject._itempricemenuid = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'ITEM PRICE', 'menuid');

        ItemmasterOverviewObject._unitconversionperm = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'UNIT CONVERSION', 'view');
        ItemmasterOverviewObject._unitconversionemenuid = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'UNIT CONVERSION', 'menuid');
        ItemmasterOverviewObject._itemvendorpriceperm = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'ITEM-VENDOR PRICE', 'view');
        ItemmasterOverviewObject._itemvendorpricemenuid = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'ITEM-VENDOR PRICE', 'menuid');
        ItemmasterOverviewObject._itemcustomerpriceperm = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'ITEM-CUSTOMER PRICE', 'view');
        ItemmasterOverviewObject._itemcustomerpricemenuid = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'ITEM-CUSTOMER PRICE', 'menuid');
        ItemmasterOverviewObject._itemvendordiscperm = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'ITEM-VENDOR DISCOUNT', 'view');
        ItemmasterOverviewObject._itemvendordiscmenuid = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'ITEM-VENDOR DISCOUNT', 'menuid');
        ItemmasterOverviewObject._itemcustomerdiscperm = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'ITEM-CUSTOMER DISCOUNT', 'view');
        ItemmasterOverviewObject._itemcustomerdismenuid = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'ITEM-CUSTOMER DISCOUNT', 'menuid');
        ItemmasterOverviewObject._purchaseinvoicediscperm = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'PURCHASE INVOICE DISCOUNT', 'view');
        ItemmasterOverviewObject._purchaseinvoicediscmenuid = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'PURCHASE INVOICE DISCOUNT', 'menuid');
        ItemmasterOverviewObject._saleinvoicediscperm = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'SALES INVOICE DISCOUNT', 'view');
        ItemmasterOverviewObject._saleinvoicediscmenuid = MainObject.do_IsActionMenuPermission(ItemmasterOverviewObject.access, 'SALES INVOICE DISCOUNT', 'menuid');
    },
    do_populateWarehouseocation: (whid, selectid) => {
        if (whid == -1) {
            whid = $("#ddDefWarehouse").val();
        }
        $.ajax({
            url: apiurl + 'api/getWarehouseLocationbyWarehouse',
            type: 'POST',
            data: { whid: whid },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {

                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].LocationCd + "</option>"
                    );
                }
                $("#ddDefLocation").html(_html.join(""));
                $("#ddDefLocation").val(selectid);
               



            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    },
    do_populateMasterDropdown: (cexternalType, cObj) => {
        
        $.ajax({
            url: apiurl + 'api/fetchProcurementItemMaster',
            type: 'POST',
            data: { ctype: cexternalType, CoCd: $("#ddlCompany").val() },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
        
                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].cid + "'>" + response[i].cdesc + "</option>"
                    );
                }
                cObj.html(_html.join(""));

                if (cexternalType == "UNITOFMEASUREMENT"){
                    $("#ddPurchaseUOM").html(_html.join(""));    
                    $("#ddStockUOM").html(_html.join(""));    
                }
                if (cexternalType == "TAXGROUPITEM") {
                    $("#ddTaxItemGroup").html(_html.join(""));
                }
                if (cexternalType == "ITEMVARIANT") {
                    $("#ddVariantId_2").html(_html.join(""));
                    $("#ddVariantId_3").html(_html.join(""));
                    $("#ddVariantId_4").html(_html.join(""));
                }
                
                if (cexternalType == 'ITEMGROUP') {
                    ItemmasterOverviewObject.do_populateMasterDropdown('ITEMCATEGORY', $('#ddCategoryId'));
                }
                else if (cexternalType == 'ITEMCATEGORY') {
                    ItemmasterOverviewObject.do_populateMasterDropdown('POSTINGGROUP', $('#ddPostingGrpId'));
                }
                else if (cexternalType == 'POSTINGGROUP') {
                    ItemmasterOverviewObject.do_populateMasterDropdown('UNITOFMEASUREMENT', $('#ddUomId')); //ddPurchaseUOM , ddStockUOM
                    
                }
                else if (cexternalType == 'UNITOFMEASUREMENT') {
                    ItemmasterOverviewObject.do_populateMasterDropdown('TAXGROUPITEM', $('#ddtaxgroupitem'));//ddTaxItemGroup
                   
                }
                else if (cexternalType == 'TAXGROUPITEM') {
                    ItemmasterOverviewObject.do_populateMasterDropdown('DEFAULTVENDORNAME', $('#ddDefltVendorId'));

                }
                else if (cexternalType == 'DEFAULTVENDORNAME') {
                    ItemmasterOverviewObject.do_populateMasterDropdown('WAREHOUSE', $('#ddDefWarehouse'));
                }
                else if (cexternalType == 'WAREHOUSE') {
                    //ItemmasterOverviewObject.do_populateMasterDropdown('LOCATION', $('#ddDefLocation'));
                    ItemmasterOverviewObject.do_populateMasterDropdown('LOTNO', $('#ddLotNo'));
                }
                else if (cexternalType == 'LOCATION') {
                    ItemmasterOverviewObject.do_populateMasterDropdown('LOTNO', $('#ddLotNo'));
                }
                else if (cexternalType == 'LOTNO') {
                    ItemmasterOverviewObject.do_populateMasterDropdown('COUNTRY', $('#ddCOOId'));
                }
                else if (cexternalType == 'COUNTRY') {
                    ItemmasterOverviewObject.do_populateMasterDropdown('HSN', $('#ddHSNId'));
                }
                else if (cexternalType == 'HSN') {
                    ItemmasterOverviewObject.do_populateMasterDropdown('ITEMVARIANT', $('#ddVariantId_1'));
                }
                else if (cexternalType == 'ITEMVARIANT') {
                   
                    //ItemmasterOverviewObject.do_populateVendor();
                    ItemmasterOverviewObject.do_loaddata();
                }
              

                
               
            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    },
    do_populateVendor: (PR_DefltVendorId) => {
      
        $.ajax({
            url: apiurl + 'api/getInventoryItemVendor',
            type: 'POST',
            data: { ItemId: ItemmasterOverviewObject.rowid },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objItemVendor = response;
                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].VendName + "</option>"
                    );
                }
                $("#ddDefltVendorId").html(_html.join(""));
                $("#ddDefltVendorId").val(PR_DefltVendorId);

            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    },
    do_loaddataedit: (id) => {
        var issBlock = 0, ItemCd = '', CoCd = $("#ddlCompany").val(), ItemDesc = '', SearchDesc = '', InternalId = 0, GroupId = 0, CategoryId = 0, ItemType = 0, PostingGrpId = 0, IsStop = 0, AllowNegtvStock = 0, ItemPic = 0, Notes = '', SI_UomId = 0, SI_STCompId = 0
            , PR_LeadTime = 0, PR_DefltVendorId = 0, PR_STCompId = 0, PR_UomId = 0, PR_LossOnPurchase = 0, CP_StdCost = 0, CP_ProfitPer = 0, CP_SalePrice = 0, CP_MaxSalePrice = 0, CP_CostMethod = 0
            , CP_CostPriceByVariant = 0, P_MinStockLevel = 0, P_SafetyStock = 0, P_MaxStockLevel = 0, P_StockWarning = 0, TM_DirectInvoicing = 0, TM_ACARN = 0, TM_QuarantineReq = 0
            , TM_RegdReq = 0, TM_RecvReq = 0, TM_PickReq = 0, TM_ReserveReq = 0, TM_Reservation = 0, SA_DefWarehouse = 0, SA_DefLocation = 0, SA_UomId = 0, SA_CaptureDOM = 0, SA_BBU = 0, SA_Warranty = 0
            , SA_WarrantyPeriod = 0, SA_TrackBatch = 0, SA_TrackSrNo = 0, SA_LotNo = 0, SA_VariantId_1 = 0, SA_VariantId_2 = 0, SA_VariantId_3 = 0, SA_VariantId_4 = 0, FT_GTIN = 0
            , FT_TariffCd = 0, FT_COOId = 0, TI_HSNId = 0, TI_PriceWithTax = 0, created_by = '', creator_MAC_add = '';
        
        $.ajax({


            url: apiurl + 'api/procurementItemOperation',
            type: 'POST',
            data: { p_mode: "edit", RowId: id, ItemCd: ItemCd, CoCd: CoCd, ItemDesc: ItemDesc, SearchDesc: SearchDesc, InternalId: InternalId, GroupId: GroupId, CategoryId: CategoryId, ItemType: ItemType, PostingGrpId: PostingGrpId, IsBlock: issBlock, IsStop: IsStop, AllowNegtvStock: AllowNegtvStock, ItemPic: ItemPic, Notes: Notes, SI_UomId: SI_UomId, SI_STCompId: SI_STCompId, PR_LeadTime: PR_LeadTime, PR_DefltVendorId: PR_DefltVendorId, PR_STCompId: PR_STCompId, PR_UomId: PR_UomId, PR_LossOnPurchase: PR_LossOnPurchase, CP_StdCost: CP_StdCost, CP_ProfitPer: CP_ProfitPer, CP_SalePrice: CP_SalePrice, CP_MaxSalePrice: CP_MaxSalePrice, CP_CostMethod: CP_CostMethod, CP_CostPriceByVariant: CP_CostPriceByVariant, P_MinStockLevel: P_MinStockLevel, P_SafetyStock: P_SafetyStock, P_MaxStockLevel: P_MaxStockLevel, P_StockWarning: P_StockWarning, TM_DirectInvoicing: TM_DirectInvoicing, TM_ACARN: TM_ACARN, TM_QuarantineReq: TM_QuarantineReq, TM_RegdReq: TM_RegdReq, TM_RecvReq: TM_RecvReq, TM_PickReq: TM_PickReq, TM_ReserveReq: TM_ReserveReq, TM_Reservation: TM_Reservation, SA_DefWarehouse: SA_DefWarehouse, SA_DefLocation: SA_DefLocation, SA_UomId: SA_UomId, SA_CaptureDOM: SA_CaptureDOM, SA_BBU: SA_BBU, SA_Warranty: SA_Warranty, SA_WarrantyPeriod: SA_WarrantyPeriod, SA_TrackBatch: SA_TrackBatch, SA_TrackSrNo: SA_TrackSrNo, SA_LotNo: SA_LotNo, SA_VariantId_1: SA_VariantId_1, SA_VariantId_2: SA_VariantId_2, SA_VariantId_3: SA_VariantId_3, SA_VariantId_4: SA_VariantId_4, FT_GTIN: FT_GTIN, FT_TariffCd: FT_TariffCd, FT_COOId: FT_COOId, TI_HSNId: TI_HSNId, TI_PriceWithTax: TI_PriceWithTax, created_by: created_by, creator_MAC_add: creator_MAC_add },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                
                
                ItemmasterOverviewObject.rowid = response[0].RowId;
                ItemmasterOverviewObject.do_populateVendor(response[0].PR_DefltVendorId);
                try {
                    setImage(ItemmasterOverviewObject.rowid);
                }
                catch (e) {

                }
                
                $("#txtItemCd").val(response[0].ItemCd);
                $("#txtItemDesc").val(response[0].ItemDesc);
                $("#txtInternalId").val(response[0].InternalId);
                $("#txtSearchDesc").val(response[0].SearchDesc);
                $("#ddGroupId").val(response[0].GroupId);
                $("#ddCategoryId").val(response[0].CategoryId);
                $("#ddPostingGrpId").val(response[0].PostingGrpId);
                $("#txtnotes").val(response[0].Notes);
                $("#ddUomId").val(response[0].SI_UomId);
                $("#txtLeadTime").val(response[0].PR_LeadTime);
                
                $("#ddPurchaseUOM").val(response[0].PR_UomId);
                $("#txtLossOnPurchase").val(response[0].PR_LossOnPurchase);
                $("#txtStdCost").val(response[0].CP_StdCost);
                $("#txtProfitPer").val(response[0].CP_ProfitPer);
                $("#txtSalePrice").val(response[0].CP_SalePrice);
                $("#txtMaxSalePrice").val(response[0].CP_MaxSalePrice);
                $("#ddCostMethod").val(response[0].CP_CostMethod);
                $("#txtMinStockLevel").val(response[0].P_MinStockLevel);
                $("#txtSafetyStock").val(response[0].P_SafetyStock);
                $("#txtMaxStockLevel").val(response[0].P_MaxStockLevel);
                $("#ddReservation").val(response[0].TM_Reservation);
                $("#ddReservation").val(response[0].TM_Reservation);
                $("#ddDefWarehouse").val(response[0].SA_DefWarehouse);
                ItemmasterOverviewObject.do_populateWarehouseocation(response[0].SA_DefWarehouse, response[0].SA_DefLocation);
                //$("#ddDefLocation").val(response[0].SA_DefLocation);
                $("#ddStockUOM").val(response[0].SA_UomId);
                $("#txtBBU").val(response[0].SA_BBU);
                $("#txtWarrantyPeriod").val(response[0].SA_WarrantyPeriod);
                $("#ddLotNo").val(response[0].SA_LotNo);
                $("#ddVariantId_1").val(response[0].SA_VariantId_1);
                $("#ddVariantId_2").val(response[0].SA_VariantId_2);
                $("#ddVariantId_3").val(response[0].SA_VariantId_3);
                $("#ddVariantId_4").val(response[0].SA_VariantId_4);
                $("#txtGTIN").val(response[0].FT_GTIN);
                $("#txtTariffCd").val(response[0].FT_TariffCd);
                $("#ddCOOId").val(response[0].FT_COOId);
                $("#ddHSNId").val(response[0].TI_HSNId);
                $("#ddItemType").val(response[0].ItemType);
                $("#ddtaxgroupitem").val(response[0].PR_STCompId);
                $("#ddTaxItemGroup").val(response[0].SI_STCompId);
                $("#txtVendorItemNo").val(response[0].VendorItemNo);
                
                

                if (response[0].IsBlock == true) {
                    $("#chkBlock").prop('checked', true);
                }
                else {
                    $("#chkBlock").prop('checked', false);
                }

                if (response[0].IsStop == true) {
                    $("#chkstop").prop('checked', true);
                }
                else {
                    $("#chkstop").prop('checked', false);
                }

                if (response[0].AllowNegtvStock == true) {
                    $("#chkAllowNegtvStock").prop('checked', true);
                }
                else {
                    $("#chkAllowNegtvStock").prop('checked', false);
                }
                if (response[0].CP_CostPriceByVariant == true) {
                    $("#chkCostPriceByVariant").prop('checked', true);
                    $('#ddVariantId_1').prop("disabled", false);
                    $('#ddVariantId_2').prop("disabled", false);
                    $('#ddVariantId_3').prop("disabled", false);
                    $('#ddVariantId_4').prop("disabled", false);
                }
                else {
                    $("#chkCostPriceByVariant").prop('checked', false);
                    $('#ddVariantId_1').val(-1);
                    $('#ddVariantId_2').val(-1);
                    $('#ddVariantId_3').val(-1);
                    $('#ddVariantId_4').val(-1);
                    $('#ddVariantId_1').prop("disabled", true);
                    $('#ddVariantId_2').prop("disabled", true);
                    $('#ddVariantId_3').prop("disabled", true);
                    $('#ddVariantId_4').prop("disabled", true);
                }

                
                if (response[0].P_StockWarning == true) {
                    $("#chkStockWarning").prop('checked', true);
                }
                else {
                    $("#chkStockWarning").prop('checked', false);
                }

                if (response[0].TM_DirectInvoicing == true) {
                    $("#chkTrackingmovement").prop('checked', true);
                }
                else {
                    $("#chkTrackingmovement").prop('checked', false);
                }
                if (response[0].TM_ACARN == true) {
                    $("#chkConReceiptNote").prop('checked', true);
                }
                else {
                    $("#chkConReceiptNote").prop('checked', false);
                }
                if (response[0].TM_QuarantineReq == true) {
                    $("#chkQuaranticeReq").prop('checked', true);
                }
                else {
                    $("#chkQuaranticeReq").prop('checked', false);
                }
                if (response[0].TM_RegdReq == true) {
                    $("#chkRegdReq").prop('checked', true);
                }
                else {
                    $("#chkRegdReq").prop('checked', false);
                }
                if (response[0].TM_RecvReq == true) {
                    $("#chkRecvReq").prop('checked', true);
                }
                else {
                    $("#chkRecvReq").prop('checked', false);
                }
                if (response[0].TM_PickReq == true) {
                    $("#chkPickReq").prop('checked', true);
                }
                else {
                    $("#chkPickReq").prop('checked', false);
                }

                if (response[0].TM_ReserveReq == true) {
                    $("#chkReserveReq").prop('checked', true);
                    $('#ddReservation').prop("disabled", false);

                }
                else {
                    $("#chkReserveReq").prop('checked', false);
                    $('#ddReservation').val(-1);
                    $('#ddReservation').prop("disabled", true);
                }

                if (response[0].SA_CaptureDOM == true) {
                    $("#chkCDM").prop('checked', true);
                }
                else {
                    $("#chkCDM").prop('checked', false);
                }
                if (response[0].SA_Warranty == true) {
                    $("#chkWarranty").prop('checked', true);
                    $('#txtWarrantyPeriod').prop("disabled", false);
                }
                else {
                    $("#chkWarranty").prop('checked', false);
                    $('#txtWarrantyPeriod').val(0);
                    $('#txtWarrantyPeriod').prop("disabled", true);
                }
                if (response[0].TI_PriceWithTax == true) {
                    $("#chkPriceWithTax").prop('checked', true);
                }
                else {
                    $("#chkPriceWithTax").prop('checked', false);
                }
                
                
                
            },
            error: function (err) {
                
                alert(err.responseText);
            }
        }); 

       
    },
    do_loadwarehouselocation: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            $.ajax({
                url: apiurl + 'api/InventoryWarehouseLocation',
                type: 'POST',
                data: { p_mode: "getlist", LocationCd: '', CoCd: $("#ddlCompany").val(), LocationDesc: '', WhId: ItemmasterOverviewObject.rowid, AisleNo: -1, RackNo: -1, SelfNo: -1, BinNo: "-1", created_by: $("#txt").val(), RowId: -1 },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    ItemmasterOverviewObject.do_loadwarehouselocationData(obj);
                },
                error: function () {
                    alert("error in data fetch");
                }
            });


    },
    do_loadwarehouselocationData: (obj) => {
        // editor init

        var editor = new $.fn.dataTable.Editor({
            table: "#locationbook",
            fields: [
                { label: "WareHouseCd", name: "WareHouseCd" },
                { label: "AisleNo", name: "AisleNo" },
                { label: "RackNo", name: "RackNo" },
                { label: "SelfNo", name: "SelfNo" },
                { label: "BinNo", name: "BinNo" },
                { label: "LocationCd", name: "LocationCd" },
                { label: "LocationDesc", name: "LocationDesc" }
            ],
        });
        var roletable = $("#locationbook");

        var roledata = [];
        roledata = obj;



        roletable.dataTable({
            //dom: "Bfrtip",
            fixedHeader: true,
            data: roledata,
            "bDestroy": true,
            columns: [
                { data: "WareHouseCd" },
                { data: "AisleNo" },
                { data: "RackNo" },
                { data: "SelfNo" },
                { data: "BinNo" },
                { data: "LocationCd" },
                { data: "LocationDesc" }
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowid", `${data.RowId}`);

            },
        });

        //var table = $('#locationbook').DataTable();
        
       

    


    },

};
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}
var savedata = function () {
    var validate = true;
    //
   
    if ($('#txtItemDesc').val().length <1) {
        validate = false;
        $.alertable.alert(`Description required.`);
        $("#txtItemDesc").focus();
        return false;
    }
    else if ($('#txtSearchDesc').val().length < 1) {
        validate = false;
        $.alertable.alert(`Search Description required.`);
        $("#txtSearchDesc").focus();
        return false;
    }
    // else if ($('#ddGroupId').val()< 1) {
    //     validate = false;
    //     $.alertable.alert('Item Group required.');
    //     $("#ddGroupId").focus();
    //     return false;
    // }
    else if ($('#ddGroupId').val() < 1) {
        validate = false;
        $.alertable.alert(`Item Group required.`);
        $("#ddGroupId").focus();
        return false;
    }
    else if ($('#ddItemType').val() < 1) {
        validate = false;
        $.alertable.alert(`Item Type required.`);
        $("#ddItemType").focus();
        return false;
    }
    else if ($('#ddCategoryId').val() < 1) {
        validate = false;
        $.alertable.alert(`Item Category required.`);
        $("#ddCategoryId").focus();
        return false;
    }
    else if ($('#ddPostingGrpId').val() < 1) {
        validate = false;
        $.alertable.alert(`Posting Group required.`);
        $("#ddPostingGrpId").focus();
        return false;
    }
    else if ($('#ddUomId').val() < 1) {
        validate = false;
        $.alertable.alert(`Sale Unit of Measurement required.`);
        $("#ddUomId").focus();
        return false;
    }
    else if ($('#ddtaxgroupitem').val() < 1) {
        validate = false;
        $.alertable.alert(`Tax Group-Item required.`);
        $("#ddtaxgroupitem").focus();
        return false;
    }
    else if ($('#ddTaxItemGroup').val() < 1) {
        validate = false;
        $.alertable.alert(`Tax Group-Item required.`);
        $("#ddTaxItemGroup").focus();
        return false;
    }
    else if ($('#ddStockUOM').val() < 1) {
        validate = false;
        $.alertable.alert(`Stock Unit of Measurement required.`);
        $("#ddStockUOM").focus();
        return false;
    }

    else {
        $('#btnSave').prop("disabled", true);
        
        imgupload();
       
        //companylogo = "";
        //companylogo = companylogo.replace('data:image/png;base64,', '');
        //companylogo = companylogo.replace('data:image/jpeg;base64,', '');
        //companylogo = companylogo.replace('data:image/jpg;base64,', '');
        //companylogo = companylogo.replace('data:application/pdf;base64,', '');
       
       

        
    }

};

function saveFinal(imgId) {
    var issBlock = 0
    var ItemCd, CoCd, ItemDesc, SearchDesc, InternalId, GroupId, CategoryId, ItemType, PostingGrpId, IsStop, AllowNegtvStock, ItemPic, Notes, SI_UomId, SI_STCompId
        , PR_LeadTime, PR_DefltVendorId, PR_STCompId, PR_UomId, PR_LossOnPurchase, CP_StdCost, CP_ProfitPer, CP_SalePrice, CP_MaxSalePrice, CP_CostMethod
        , CP_CostPriceByVariant, P_MinStockLevel, P_SafetyStock, P_MaxStockLevel, P_StockWarning, TM_DirectInvoicing, TM_ACARN, TM_QuarantineReq
        , TM_RegdReq, TM_RecvReq, TM_PickReq, TM_ReserveReq, TM_Reservation, SA_DefWarehouse, SA_DefLocation, SA_UomId, SA_CaptureDOM, SA_BBU, SA_Warranty
        , SA_WarrantyPeriod, SA_TrackBatch, SA_TrackSrNo, SA_LotNo, SA_VariantId_1, SA_VariantId_2, SA_VariantId_3, SA_VariantId_4, FT_GTIN
        , FT_TariffCd, FT_COOId, TI_HSNId, TI_PriceWithTax, created_by, creator_MAC_add; 

    IsStop = 0, AllowNegtvStock = 0, CP_CostPriceByVariant = 0, P_StockWarning = 0, TM_ACARN = 0, TM_QuarantineReq = 0, TM_RegdReq = 0, TM_RecvReq = 0, TM_PickReq = 0, TM_ReserveReq = 0;
    SA_CaptureDOM = 0, SA_Warranty = 0, TI_PriceWithTax = 0, TM_DirectInvoicing=0;
    creator_MAC_add = ipaddress;
    ItemPic = imgId;
    created_by = $("#txt").val();
    CoCd = $("#ddlCompany").val();
    ItemCd = $("#txtItemCd").val();
    ItemDesc = $("#txtItemDesc").val();
    SearchDesc = $("#txtSearchDesc").val();
    InternalId = $("#txtInternalId").val();
    GroupId = $("#ddGroupId").val();
    CategoryId = $("#ddCategoryId").val();
    PostingGrpId = $("#ddPostingGrpId").val();
    Notes = $("#txtnotes").val();
    SI_UomId = $("#ddUomId").val();
    SI_STCompId = $("#ddtaxgroupitem").val();
    PR_LeadTime = $("#txtLeadTime").val();
    PR_DefltVendorId = $("#ddDefltVendorId").val();
    PR_STCompId = $("#ddTaxItemGroup").val();
    PR_UomId = $("#ddPurchaseUOM").val();
    PR_LossOnPurchase = $("#txtLossOnPurchase").val();
    CP_StdCost = $("#txtStdCost").val();
    CP_ProfitPer = $("#txtProfitPer").val();
    CP_SalePrice = $("#txtSalePrice").val();
    CP_MaxSalePrice = $("#txtMaxSalePrice").val();
    CP_CostMethod = $("#ddCostMethod").val();
    
    P_MinStockLevel = $("#txtMinStockLevel").val();
    P_SafetyStock = $("#txtSafetyStock").val();
    P_MaxStockLevel = $("#txtMaxStockLevel").val();
    
    
    
    
    TM_Reservation = $("#ddReservation").val();
    SA_DefWarehouse = $("#ddDefWarehouse").val();
    SA_DefLocation = $("#ddDefLocation").val();
    SA_UomId = $("#ddStockUOM").val();
    
    SA_BBU = $("#txtBBU").val();
    
    SA_WarrantyPeriod = $("#txtWarrantyPeriod").val();
    
    SA_LotNo = $("#ddLotNo").val();
    SA_VariantId_1 = $("#ddVariantId_1").val();
    SA_VariantId_2 = $("#ddVariantId_2").val();
    SA_VariantId_3 = $("#ddVariantId_3").val();
    SA_VariantId_4 = $("#ddVariantId_4").val();
    FT_GTIN = $("#txtGTIN").val();
    FT_TariffCd = $("#txtTariffCd").val();
    FT_COOId = $("#ddCOOId").val();
    TI_HSNId = $("#ddHSNId").val();
    ItemType= $("#ddItemType").val();


    if ($('#chkBlock').is(':checked')) {
        issBlock = 1;
    }
    if ($('#chkstop').is(':checked')) {
        IsStop = 1;
    }
    if ($('#chkAllowNegtvStock').is(':checked')) {
        AllowNegtvStock = 1;
    }
    if ($('#chkCostPriceByVariant').is(':checked')) {
        CP_CostPriceByVariant = 1;
    }
    if ($('#chkStockWarning').is(':checked')) {
        P_StockWarning = 1;
    }
    if ($('#chkTrackingmovement').is(':checked')) {
        TM_DirectInvoicing = 1;
    }
    if ($('#chkConReceiptNote').is(':checked')) {
        TM_ACARN = 1;
    }
    if ($('#chkQuaranticeReq').is(':checked')) {
        TM_QuarantineReq = 1;
    }
    if ($('#chkRegdReq').is(':checked')) {
        TM_RegdReq = 1;
    }
    if ($('#chkRecvReq').is(':checked')) {
        TM_RecvReq = 1;
    }
    if ($('#chkPickReq').is(':checked')) {
        TM_PickReq = 1;
    }
    if ($('#chkReserveReq').is(':checked')) {
        TM_ReserveReq = 1;
    }
    if ($('#chkCDM').is(':checked')) {
        SA_CaptureDOM = 1;
    }
    if ($('#chkWarranty').is(':checked')) {
        SA_Warranty = 1;
    }
    if ($('#chkPriceWithTax').is(':checked')) {
        TI_PriceWithTax = 1;
    }
    
    if (parseInt(ItemmasterOverviewObject.rowid) > 0) {
        $.ajax({

            url: apiurl + 'api/procurementItemOperation',
            type: 'POST',
            data: { p_mode: "update", RowId: parseInt(ItemmasterOverviewObject.rowid), ItemCd: ItemCd, CoCd: CoCd, ItemDesc: ItemDesc, SearchDesc: SearchDesc, InternalId: InternalId, GroupId: GroupId, CategoryId: CategoryId, ItemType: ItemType, PostingGrpId: PostingGrpId, IsBlock: issBlock, IsStop: IsStop, AllowNegtvStock: AllowNegtvStock, ItemPic: ItemPic, Notes: Notes, SI_UomId: SI_UomId, SI_STCompId: SI_STCompId, PR_LeadTime: PR_LeadTime, PR_DefltVendorId: PR_DefltVendorId, PR_STCompId: PR_STCompId, PR_UomId: PR_UomId, PR_LossOnPurchase: PR_LossOnPurchase, CP_StdCost: CP_StdCost, CP_ProfitPer: CP_ProfitPer, CP_SalePrice: CP_SalePrice, CP_MaxSalePrice: CP_MaxSalePrice, CP_CostMethod: CP_CostMethod, CP_CostPriceByVariant: CP_CostPriceByVariant, P_MinStockLevel: P_MinStockLevel, P_SafetyStock: P_SafetyStock, P_MaxStockLevel: P_MaxStockLevel, P_StockWarning: P_StockWarning, TM_DirectInvoicing: TM_DirectInvoicing, TM_ACARN: TM_ACARN, TM_QuarantineReq: TM_QuarantineReq, TM_RegdReq: TM_RegdReq, TM_RecvReq: TM_RecvReq, TM_PickReq: TM_PickReq, TM_ReserveReq: TM_ReserveReq, TM_Reservation: TM_Reservation, SA_DefWarehouse: SA_DefWarehouse, SA_DefLocation: SA_DefLocation, SA_UomId: SA_UomId, SA_CaptureDOM: SA_CaptureDOM, SA_BBU: SA_BBU, SA_Warranty: SA_Warranty, SA_WarrantyPeriod: SA_WarrantyPeriod, SA_TrackBatch: SA_TrackBatch, SA_TrackSrNo: SA_TrackSrNo, SA_LotNo: SA_LotNo, SA_VariantId_1: SA_VariantId_1, SA_VariantId_2: SA_VariantId_2, SA_VariantId_3: SA_VariantId_3, SA_VariantId_4: SA_VariantId_4, FT_GTIN: FT_GTIN, FT_TariffCd: FT_TariffCd, FT_COOId: FT_COOId, TI_HSNId: TI_HSNId, TI_PriceWithTax: TI_PriceWithTax, created_by: created_by, creator_MAC_add: creator_MAC_add },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);


                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "item-master-overview.aspx";
                    });
                }
                else {
                    validate = false;
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $.alertable.alert(
                        response[0].msg
                    );
                    $("#txtItemCd").focus();
                    validate = false;
                    return false;
                }

            },
            error: function (ex) {
                $('#btnSave').prop("disabled", false);
                alert(ex.responseText);
            }
        });
    }
    else {
        
        $.ajax({
            url: apiurl + 'api/procurementItemOperation',
            type: 'POST',
            data: { p_mode: "create", RowId: -1, ItemCd: ItemCd, CoCd: CoCd, ItemDesc: ItemDesc, SearchDesc: SearchDesc, InternalId: InternalId, GroupId: GroupId, CategoryId: CategoryId, ItemType: ItemType, PostingGrpId: PostingGrpId, IsBlock: issBlock, IsStop: IsStop, AllowNegtvStock: AllowNegtvStock, ItemPic: ItemPic, Notes: Notes, SI_UomId: SI_UomId, SI_STCompId: SI_STCompId, PR_LeadTime: PR_LeadTime, PR_DefltVendorId: PR_DefltVendorId, PR_STCompId: PR_STCompId, PR_UomId: PR_UomId, PR_LossOnPurchase: PR_LossOnPurchase, CP_StdCost: CP_StdCost, CP_ProfitPer: CP_ProfitPer, CP_SalePrice: CP_SalePrice, CP_MaxSalePrice: CP_MaxSalePrice, CP_CostMethod: CP_CostMethod, CP_CostPriceByVariant: CP_CostPriceByVariant, P_MinStockLevel: P_MinStockLevel, P_SafetyStock: P_SafetyStock, P_MaxStockLevel: P_MaxStockLevel, P_StockWarning: P_StockWarning, TM_DirectInvoicing: TM_DirectInvoicing, TM_ACARN: TM_ACARN, TM_QuarantineReq: TM_QuarantineReq, TM_RegdReq: TM_RegdReq, TM_RecvReq: TM_RecvReq, TM_PickReq: TM_PickReq, TM_ReserveReq: TM_ReserveReq, TM_Reservation: TM_Reservation, SA_DefWarehouse: SA_DefWarehouse, SA_DefLocation: SA_DefLocation, SA_UomId: SA_UomId, SA_CaptureDOM: SA_CaptureDOM, SA_BBU: SA_BBU, SA_Warranty: SA_Warranty, SA_WarrantyPeriod: SA_WarrantyPeriod, SA_TrackBatch: SA_TrackBatch, SA_TrackSrNo: SA_TrackSrNo, SA_LotNo: SA_LotNo, SA_VariantId_1: SA_VariantId_1, SA_VariantId_2: SA_VariantId_2, SA_VariantId_3: SA_VariantId_3, SA_VariantId_4: SA_VariantId_4, FT_GTIN: FT_GTIN, FT_TariffCd: FT_TariffCd, FT_COOId: FT_COOId, TI_HSNId: TI_HSNId, TI_PriceWithTax: TI_PriceWithTax, created_by: created_by, creator_MAC_add: creator_MAC_add },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);
                console.log(response);
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "item-master-overview.aspx";
                    });
                }
                else {
                    validate = false;
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $.alertable.alert(
                        response[0].msg
                    );
                    $("#txtItemCd").focus();
                    validate = false;
                    return false;
                }

            },
            error: function (ex) {
                $('#btnSave').prop("disabled", false);
                console.log(ex);
                alert(ex.responseText);
            }
        });
    }
}


var otherWindow = function (countryCd, mode) {
    
    if (countryCd == "" || countryCd == undefined || countryCd == "undefined") return;
  
    localStorage.itemmasteroverviewrowid = countryCd;
    //$('#addressbook').DataTable().rows('.selected').data()[0].AddressCode
    if (localStorage.itemmasteroverviewrowid) {
        if (mode == "vendor") {


            localStorage.clickedmenu_id = ItemmasterOverviewObject._vendormenuid[1];
            localStorage.menu_id_premission = ItemmasterOverviewObject._vendormenuid[1];
          
            localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemDesc;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(ItemmasterOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + ItemmasterOverviewObject._addressdetailsmenuid[1];
            location.href = 'vendor-item.aspx';
            
        }
        
    }
    if (localStorage.itemmasteroverviewrowid) {
        if (mode == "VARIANTSSETUP") {


            localStorage.clickedmenu_id = ItemmasterOverviewObject._variantsetupmenuid[1];
            localStorage.menu_id_premission = ItemmasterOverviewObject._variantsetupmenuid[1];

            localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemDesc;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(ItemmasterOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + ItemmasterOverviewObject._addressdetailsmenuid[1];
            location.href = 'item-variant-setup.aspx';

        }

    }
    if (localStorage.itemmasteroverviewrowid) {
        if (mode == "substitute") {


            localStorage.clickedmenu_id = ItemmasterOverviewObject._substitutemenuid[1];
            localStorage.menu_id_premission = ItemmasterOverviewObject._substitutemenuid[1];
            localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemDesc;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(ItemmasterOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + ItemmasterOverviewObject._addressdetailsmenuid[1];
            location.href = 'substitute-item.aspx';

        }

    }
    if (localStorage.itemmasteroverviewrowid) {
        if (mode == "ITEMPRICE") {


            localStorage.clickedmenu_id = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.menu_id_premission = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemDesc;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(ItemmasterOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + ItemmasterOverviewObject._addressdetailsmenuid[1];
            location.href = 'item-price.aspx?id=' + localStorage.itemmasteroverviewrowid;

        }

    }
    if (localStorage.itemmasteroverviewrowid) {
        if (mode == "UNITCONVERSION") {


            localStorage.clickedmenu_id = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.menu_id_premission = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemDesc;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(ItemmasterOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + ItemmasterOverviewObject._addressdetailsmenuid[1];
            location.href = 'item-specific-conversion.aspx';

        }

    }
    if (localStorage.itemmasteroverviewrowid) {
        if (mode == "ITEMVENDORPRICE") {


            localStorage.clickedmenu_id = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.menu_id_premission = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemDesc;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(ItemmasterOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + ItemmasterOverviewObject._addressdetailsmenuid[1];
            location.href = '../Payables/item-vendor-price.aspx';

        }

    }
    if (localStorage.itemmasteroverviewrowid) {
        if (mode == "ITEMCUSTOMERPRICE") {


            localStorage.clickedmenu_id = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.menu_id_premission = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemDesc;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(ItemmasterOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + ItemmasterOverviewObject._addressdetailsmenuid[1];
            location.href = '../Receivables/item-customer-price.aspx';

        }

    }
    if (localStorage.itemmasteroverviewrowid) {
        if (mode == "ITEMCUSTOMERDISCOUNT") {


            localStorage.clickedmenu_id = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.menu_id_premission = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemDesc;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(ItemmasterOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + ItemmasterOverviewObject._addressdetailsmenuid[1];
            location.href = '../Receivables/item-customer-discount.aspx';

        }

    }
    if (localStorage.itemmasteroverviewrowid) {
        if (mode == "PURCHASEINVOICEDISCOUNT") {


            localStorage.clickedmenu_id = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.menu_id_premission = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemDesc;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(ItemmasterOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + ItemmasterOverviewObject._addressdetailsmenuid[1];
            location.href = '../Payables/invoice-discount.aspx';

        }

    }
    if (localStorage.itemmasteroverviewrowid) {
        if (mode == "SALEINVOICEDISCOUNT") {


            localStorage.clickedmenu_id = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.menu_id_premission = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemDesc;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(ItemmasterOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + ItemmasterOverviewObject._addressdetailsmenuid[1];
            location.href = '../Receivables/invoice-customer-discount.aspx';

        }

    }
    if (localStorage.itemmasteroverviewrowid) {
        if (mode == "ITEMVENDORDISCOUNT") {


            localStorage.clickedmenu_id = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.menu_id_premission = ItemmasterOverviewObject._itempricemenuid[1];
            localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemDesc;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(ItemmasterOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + ItemmasterOverviewObject._addressdetailsmenuid[1];
            location.href = '../Payables/item-vendor-discount.aspx';

        }

    }
}

var datablank = function () {
    companylogo = "";
    contentType = "";

    $("#txtItemCd").val('');
    $("#txtItemDesc").val('');
    $("#txtSearchDesc").val('');
    $("#ddGroupId").val('-1');
    $("#ddCategoryId").val('-1');
    $("#ddPostingGrpId").val('-1');
    $("#txtnotes").val('');
    $("#ddUomId").val('-1');
    $("#txtLeadTime").val(0);
    $("#ddDefltVendorId").val('-1');
    $("#ddPurchaseUOM").val('-1');
    $("#txtLossOnPurchase").val('0');
    $("#txtStdCost").val('0');
    $("#txtProfitPer").val('0');
    $("#txtSalePrice").val('0');
    $("#txtMaxSalePrice").val('0');
    $("#ddCostMethod").val('-1');
    $("#txtMinStockLevel").val('0');
    $("#txtSafetyStock").val('0');
    $("#txtMaxStockLevel").val('0');
    $("#ddReservation").val('-1');
    $("#ddDefWarehouse").val('-1');
    $("#ddDefLocation").val('-1');
    $("#ddStockUOM").val('-1');
    $("#txtBBU").val('');
    $("#txtWarrantyPeriod").val('');
    $("#ddLotNo").val('-1');
    $("#ddVariantId_1").val('-1');
    $("#ddVariantId_2").val('-1');
    $("#ddVariantId_3").val('-1');
    $("#ddVariantId_4").val('-1');
    $("#txtGTIN").val('');
    $("#txtTariffCd").val('');
    $("#ddCOOId").val('-1');
    $("#ddHSNId").val('-1');
    $("#ddItemType").val('-1');


    $("#chkBlock").prop('checked', false);
    $("#chkstop").prop('checked', false);
    $("#chkAllowNegtvStock").prop('checked', false);
    $("#chkCostPriceByVariant").prop('checked', false);
    $("#chkStockWarning").prop('checked', false);
    $("#chkTrackingmovement").prop('checked', false);
    $("#chkConReceiptNote").prop('checked', false);
    $("#chkQuaranticeReq").prop('checked', false);
    $("#chkRegdReq").prop('checked', false);
    $("#chkRecvReq").prop('checked', false);
    $("#chkPickReq").prop('checked', false);
    $("#chkReserveReq").prop('checked', false);
    $("#chkCDM").prop('checked', false);
    $("#chkWarranty").prop('checked', false);
    $("#chkPriceWithTax").prop('checked', false);
    $('#blah')
        .attr('src', '')
    $("#rmvlogo").hide();
}
var roleaction = function (rowId, mode) {
    
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);
  
    if (mode == "viewlocation") {
        ItemmasterOverviewObject.rowid = rowId;
        showmodalview();

    }
    if (mode == 'add') {
        companylogo = "";
        ItemmasterOverviewObject.rowid = '-1';
        showmodal();
        $('.modal-title').html('Item Master Overview - New');

        datablank();
        $('#btnSave').text('Add');
        $('#btnSave').show();
        //$('.readOnly').attr("disabled", false);
       
        //$('#txtCode').prop("disabled", false);

    }
    if (mode == 'edit') {
        showmodal();
        
        $('.modal-title').html('Item Master Overview - Edit');
        $('#cbBlock').show();
        datablank();
        if (!ItemmasterOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
        } else { $('#country_overview_delete').show(); }
        
        $('#lbBlock').show();
        $('#btnEdit').hide();
        $('#btnSave').text('Save');
        $('#btnSave').show();
        $('.readOnly').attr("disabled", false);
        //$('#txtCode').prop("disabled", true);

        ItemmasterOverviewObject.rowid = rowId;
        ItemmasterOverviewObject.do_loaddataedit(rowId);
        
    }
    else if(mode == 'view') {
        showmodal();
        datablank();
        $('.modal-title').html('Item Master Overview - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!ItemmasterOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!ItemmasterOverviewObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        ItemmasterOverviewObject.rowid = rowId;
        ItemmasterOverviewObject.do_loaddataedit(rowId);
    }
    
    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    $.ajax({
                        //url: apiurl + 'api/AdministratorAddressBookMainFetch',
                        type: 'POST',
                        data: { p_mode: "remov", RowId: rowId },
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            $.alertable.alert(`Data removed successfully.`, ``, `Ok`, ``).then(function () {
                                window.location = "item-master-overview.aspx";
                            });
                        },
                        error: function () {
                            alert("error in data delete");
                        }
                    }); 

                },
            );
    }
    
};

function getPostCodeDetails() {
    try {
       
        var cpostCode = $('#txtPostCode').val();
        $('#txtCity').val('');
        $('#txtCountry').val('');
        $('#txtState').val('');
        $('#txtPostId').val('-1');
        if (cpostCode.length > 1) {
            $.ajax({
                url: apiurl + 'api/getPostCodeDetails',
                type: 'POST',
                data: { PostCode: cpostCode },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    console.log(response);
                    //alert(response.length);
                    //alert(response[0].CountryCd);
                    
                    if (response.length > 0) {
                        $('#txtCity').val(response[0].CityName);
                        $('#txtCountry').val(response[0].CountryName);
                        $('#txtState').val(response[0].StateName);

                        $('#txtPostId').val(response[0].addressID);
                      
                    }
                    else {
                        alert('Invalid Post Code!');
                        //$("#txtPostCode").focus();
                        //return true;
                    }


                },
                error: function () {
                    alert("error in fetch data for postcode");
                }
            }); 
        }
     
        
    }
    catch (ex) {

    }
}
function getWarehouseByType() {

    $("#ddQuarantine").val(-1);
    $("#ddTransit").val(-1);
    $("#ddVendor").val(-1);
    var whtype = $("#ddwarehousetype").val();
    if (whtype == 1) {
        //$('#country_overview_create').prop("disabled", true);
        $("#ddQuarantine").prop("disabled", false);
        $("#ddTransit").prop("disabled", false);
        $("#ddVendor").prop("disabled", true);
    }
    if (whtype == 2 || whtype==3) {
        //$('#country_overview_create').prop("disabled", true);
        $("#ddQuarantine").prop("disabled", true);
        $("#ddTransit").prop("disabled", true);
        $("#ddVendor").prop("disabled", true);
    }
    if (whtype == 4) {
        //$('#country_overview_create').prop("disabled", true);
        $("#ddQuarantine").prop("disabled", false);
        $("#ddTransit").prop("disabled", false);
        $("#ddVendor").prop("disabled", false);
    }
    //var ccompany = $("#ddlCompany").val();
 
    //var _html1 = [];
    //_html1.push("<option value='-1'>  --Select--</option>");
    //$("#ddOtherWarehouse").html(_html1.join(""));
    //if (whtype > 1) {
    //    $('#otherwarehouseType').html($("#ddwarehousetype :selected").text());
    //    $("#divwarehousetype").show();
    //    $.ajax({
    //        url: apiurl + 'api/getWarehouseMasterbyType',
    //        type: 'POST',
    //        data: { whtype: whtype, ccompany: ccompany },
    //        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    //        success: function (response) {
    //            objCountry = response;

    //            var _html = [];
    //            _html.push("<option value='-1'>  --Select--</option>")
    //            for (var i = 0; i < response.length; i++) {


    //                _html.push(
    //                    "<option value='" + response[i].RowId + "'>" + response[i].WareHouseCd + "</option>"
    //                );
    //            }
    //            console.log(_html);
    //            $("#ddOtherWarehouse").html(_html.join(""));




    //        },
    //        error: function () {
    //            alert("error in fetch data for postcode");
    //        }
    //    }); 
    //}
   
}
var getObjectByValue = function (array, key, value) {
    return array.filter(function (object) {
        return object[key] === value;
    });
};

function ShowIP(response) {
    ipaddress = response.ip;
}
function PopulateState() {
    ItemmasterOverviewObject.do_populateLocationDropdown('STATE', $('#ddPincodeCountry').val(), $('#ddPincodeCounty'));
}
function PopulateCity() {
    ItemmasterOverviewObject.do_populateLocationDropdown('CITY', $('#ddPincodeCounty').val(), $('#ddPincodeCity'));
}
var setpincode = function (cpincode) {
    
    var cpostCode = '';
    var cCityObj, cCountryObj, cStateObj, cPostCodeObj, cPostCodeIdobj;
    var cType = localStorage.cfetchpincode;
    
    if (cType == 'PrimaryAddressPostCode') {
        cCityObj = $('#txtPrimaryAddresstxtCity');
        cCountryObj = $('#txtPrimaryAddresstxtCountry');
        cStateObj = $('#txtPrimaryAddresstxtCounty');
        cPostCodeObj = $('#txtPrimaryAddressPostCode');
        cPostCodeIdobj = $('#txttPrimaryAddressPostId');

    }
    if (cType == 'InvoiceAddressPostCode') {
        cCityObj = $('#txtInvoiceAddressCity');
        cCountryObj = $('#txtInvoiceAddressCountry');
        cStateObj = $('#txtInvoiceAddressCounty');
        cPostCodeObj = $('#txtInvoiceAddressPostCode');
        cPostCodeIdobj = $('#txtInvoiceAddressPostId');

    }
    if (cType == 'ShippingAddressPostCode') {
        cCityObj = $('#txtShippingCity');
        cCountryObj = $('#txtShippingCountry');
        cStateObj = $('#txtShippingCounty');
        cPostCodeObj = $('#txtShippingAddressPostCode');
        cPostCodeIdobj = $('#txtShippingAddressPostId');

    }
    cPostCodeObj.val('');
    cCityObj.val('');
    cCountryObj.val('');
    cStateObj.val('');
    cPostCodeIdobj.val(-1);

    $.ajax({
        url: apiurl + 'api/getPostCodeDetailsByPostCodeId',
        type: 'POST',
        data: { PostCodeId: cpincode },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            console.log(response);
            //alert(response.length);
            //alert(response[0].CountryCd);

            if (response.length > 0) {
                cCityObj.val(response[0].CityName);
                cCountryObj.val(response[0].CountryName);
                cStateObj.val(response[0].StateName);
                cPostCodeObj.val(response[0].PostCode);
                cPostCodeIdobj.val(response[0].addressID);
                $("#myModalPincode .close").click();

            }
            else {
                alert('Invalid Post Code!');
                //$("#txtPostCode").focus();
                //return true;
            }


        },
        error: function () {
            alert("error in fetch data for postcode");
        }
    }); 
}

function fetchPinCode() {
    var cCountry = $('#ddPincodeCountry').val();
    var cState = $('#ddPincodeCounty').val();
    var cCity = $('#ddPincodeCity').val();
    $.ajax({
        url: apiurl + 'api/GetPinCodebyStateCity',
        type: 'POST',
        data: { CountryId: cCountry, StateId: cState, CityId: cCity },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            var obj = response;
            /* datatable */
            var editor = new $.fn.dataTable.Editor({
                table: "#pincoderesult",
                fields: [
                    { label: "CountryName", name: "CountryName" },
                    { label: "StateName", name: "StateName" },
                    { label: "CityName", name: "CityName" },
                    { label: "PostCode", name: "PostCode" },
                    { label: "sele", name: "sele" }
                 
                ],
            });
            var roletable = $("#pincoderesult");

            var roledata = [];
            roledata = obj;



            roletable.dataTable({
                //dom: "Bfrtip",
                fixedHeader: true,
                data: roledata,
                "bDestroy": true,
                columns: [
                    { data: "CountryName" },
                    { data: "StateName" },
                    { data: "CityName" },
                    { data: "PostCode" },
                    { data: "sele" }
                 
                ],
                "pageLength": 10,
                columnDefs: [{
                    orderable: false,
                    'render': function (data, type, full, meta) {
                        //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                        return '<input type="button" name="btnpinid[]" value="select" onclick=setpincode("' + $('<div/>').text(data).html() + '")>';
                    },
                    targets: 4
                }
                ],
                select: true,
                scrollX: true,
                lengthMenu: [5, 10, 25, 50, 100],
                
            });
            /* datatable */
        },
        error: function () {
            alert("error in data fetch pincode search");
        }
    }); 
}
function getPostCodeDetails(cType) {
    try {
       
        var cpostCode = '';
        var cCityObj, cCountryObj, cStateObj, cPostCodeObj, cPostCodeIdobj;

        if (cType == 'PrimaryAddressPostCode') {
            cCityObj = $('#txtPrimaryAddresstxtCity');    
            cCountryObj = $('#txtPrimaryAddresstxtCountry');
            cStateObj = $('#txtPrimaryAddresstxtCounty');
            cPostCodeObj = $('#txtPrimaryAddressPostCode');
            cPostCodeIdobj = $('#txttPrimaryAddressPostId');

        }
        if (cType == 'InvoiceAddressPostCode') {
            cCityObj = $('#txtInvoiceAddressCity');
            cCountryObj = $('#txtInvoiceAddressCountry');
            cStateObj = $('#txtInvoiceAddressCounty');
            cPostCodeObj = $('#txtInvoiceAddressPostCode');
            cPostCodeIdobj = $('#txtInvoiceAddressPostId');

        }
        if (cType == 'ShippingAddressPostCode') {
            cCityObj = $('#txtShippingCity');
            cCountryObj = $('#txtShippingCountry');
            cStateObj = $('#txtShippingCounty');
            cPostCodeObj = $('#txtShippingAddressPostCode');
            cPostCodeIdobj = $('#txtShippingAddressPostId');

        }
        cpostCode = cPostCodeObj.val();
        cCityObj.val('');
        cCountryObj.val('');
        cStateObj.val('');
        cPostCodeIdobj.val(-1);
     
        if (cpostCode.length > 1) {
            $.ajax({
                url: apiurl + 'api/getPostCodeDetails',
                type: 'POST',
                data: { PostCode: cpostCode },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    console.log(response);
                    //alert(response.length);
                    //alert(response[0].CountryCd);

                    if (response.length > 0) {
                        cCityObj.val(response[0].CityName);
                        cCountryObj.val(response[0].CountryName);
                        cStateObj.val(response[0].StateName);
                        cPostCodeIdobj.val(response[0].addressID);
                    }
                    else {
                        alert('Invalid Post Code!');
                        //$("#txtPostCode").focus();
                        //return true;
                    }


                },
                error: function () {
                    alert("error in fetch data for postcode");
                }
            });
        }


    }
    catch (ex) {

    }
}
function getBankDetails() {
    var bankId = $("#ddBankcode").val();
    if (bankId > 0) {
        $.ajax({
            url: apiurl + 'api/getBankDetailsbyBankId',
            type: 'POST',
            data: { bankid: bankId },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //console.log(response);
                //alert(response.length);
                //alert(response[0].CountryCd);

                if (response.length > 0) {
                    $("#txtGiro").val(response[0].GiroCd);
                    $("#txtBankname").val(response[0].BankName);
                    $("#txtBankSwift").val(response[0].SwiftCd);
                    $("#txtBankAccount").val(response[0].AcNumber);
                    $("#txtBankIban").val(response[0].IBAN);
                    $("#txtBankBranch").val(response[0].BranchName);
                }
                else {
                    alert('Invalid Bank Code!');
                    //$("#txtPostCode").focus();
                    //return true;
                }


            },
            error: function () {
                alert("error in fetch data for postcode");
            }
        });
    }
}

function setImage(rowid) {

    $.ajax({
        type: "POST",
        url: "../handler/datahandler.aspx/GetImageGeneral",
        data: JSON.stringify({ id: rowid, ctype: "Procurement_Item" }),
        //data: '{imageData: "' + filename + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        crossDomain: true,
        success: function (result) {
            var rslt = result.d.split('|');
            if (result.d.length > 6) {
                companylogo = rslt[0];
                contentType = rslt[1];
                $('#blah')
                    .attr('src', rslt[0])
                    .width(80)
                    .height(80);

                $("#rmvlogo").show();
            }
           
        },
        error: function (err) {
            alert(err.statusText)
        }
    });

}
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            companylogo = e.target.result;
            $('#blah')
                .attr('src', e.target.result)
                .width(80)
                    .height(80);
        };
        imgfileName = input.files[0].name;
        contentType = input.files[0].type;

        //companylogo = reader.result;
        reader.readAsDataURL(input.files[0]);
    }
}

function imgupload() {


    if (companylogo.length > 2) {
        var filename = companylogo;
        filename = filename.replace('data:image/png;base64,', '');
        filename = filename.replace('data:image/jpeg;base64,', '');
        filename = filename.replace('data:image/jpg;base64,', '');
        filename = filename.replace('data:application/pdf;base64,', '');
       
        $.ajax({
            type: "POST",
            url: "../handler/datahandler.aspx/UploadImagenew",
            data: JSON.stringify({ docname: imgfileName, imageData: filename, contentType: contentType }),
            //data: '{imageData: "' + filename + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            crossDomain: true,
            success: function (result) {
                saveFinal(result.d);
                
            },
            error: function (err) {
                $('#btnSave').prop("disabled", false);
                alert(err.statusText)
            }
        });
    }
    else {
        saveFinal(-1);
    }
   
}
function rmvlogo() {
    companylogo = "";
    contentType = "";
    $('#blah')
        .attr('src', '')
    $("#rmvlogo").hide();
}
function geVendorIdno() {

    try {
        $('#txtVendorItemNo').val('');
        var cCode = $('#ddDefltVendorId').val();
        var s = getObjectByValue(objItemVendor, "RowId", cCode);
        $('#txtVendorItemNo').val(s[0].VendorItemNo);

    }
    catch (ex) {

    }
}