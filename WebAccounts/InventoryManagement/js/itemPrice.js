var ipaddress = "";
var CoCd = '';
var objItem;
var deflocationid = -1;
var CP_CostPriceByVariant = 1;
$(document).ready(function () {
    CoCd = $("#ddlCompany").val();
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ipaddress = e.ip;
    });

    /* localStorage.itemmasteroverviewrowid make it -1 when call from other page */

    
    if (queryString('id') != undefined || queryString("id") != null) {
        localStorage.itemmasteroverviewrowid = queryString('id');
    }
    else {
        localStorage.itemmasteroverviewrowid = -1;
    }
    
    itemPriceObject.do_populateVariantCode();
    //itemPriceObject.do_populateLocation();
    //itemPriceObject.do_populateCurrency();
    //itemPriceObject.do_populateUOM();

    itemPriceObject.do_getUserPagepermission();
   
}
);
//
var itemPriceObject = {
    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _addressdetailsmenuid: '',
    _vendormenuid: '',
    //Do Load data
    do_loaddata: (id,mode) => {
        var issBlock = 0
        var created_by, creator_MAC_add, CoCd, ItemId;
        var ddPriceType, ddVariantCode, ddLocation, ddCurrency, dduom, minqty, maxqty, price, discountpercent, discountamount, startdate, enddate;


        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
        ItemId = localStorage.itemmasteroverviewrowid;


        ddPriceType = '';
        ddVariantCode = 0;
        ddLocation = 0;

        ddCurrency =0;
        dduom = 0;
        minqty = 0;


        maxqty = 0;
        price =0;
        discountpercent =0;


        discountamount = 0;
        startdate = '';
        enddate = '';

        //itemPriceObject.rowid = '-1';


        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),

            $.ajax({
                url: apiurl + 'api/InventoryItemPrice',
                type: 'POST',
                data: { p_mode: mode, RowId: id, priceType: ddPriceType, CoCd: CoCd, ItemId: ItemId, variantCode: ddVariantCode, location: ddLocation, currency: ddCurrency, uom: dduom, minqty: minqty, maxqty: maxqty, price: price, discountpercent: discountpercent, discountamount: discountamount, startdate: startdate, enddate: enddate, IsBlock: issBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    fetchheadervalue();
                    //console.log(response);
                    var s = getObjectByValue(objItem, "RowId", localStorage.itemmasteroverviewrowid);
                    CP_CostPriceByVariant = s[0].CP_CostPriceByVariant;
                    deflocationid = s[0].sa_deflocation;
                    //var CP_CostPriceByVariant = obj[0].CP_CostPriceByVariant;
                    if (CP_CostPriceByVariant == 1) {
                        $('#ddVariantCode').prop("disabled", false);
                    }
                    else {
                        $('#ddVariantCode').prop("disabled", true);
                    }
                    if (mode == 'getlist') {
                        
                        itemPriceObject.do_populatewarehouseData(obj);
                    }
                    if (mode == 'edit') {
                        itemPriceObject.do_populateDataForEdit(obj);
                    }
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });


    },
    do_populateDataForEdit: (obj) => {
        itemPriceObject.rowid = obj[0].RowId;
        $('#ddPriceType').val(obj[0].PriceType);
        $('#ddVariantCode').val(obj[0].VariantId);
        $('#ddLocation').val(obj[0].LocationId);
        $('#dduom').val(obj[0].UomId);

        $('#minqty').val(obj[0].MinQty == 0 ? '' : obj[0].MinQty);
        $('#maxqty').val(obj[0].MaxQty == 0 ? '' : obj[0].MaxQty);
        $('#price').val(obj[0].PricePerUnit == 0 ? '' : obj[0].PricePerUnit);
        $('#discountpercent').val(obj[0].DiscPer == 0 ? '' : obj[0].DiscPer);
        $('#discountamount').val(obj[0].DiscAmtPerUnit == 0 ? '' : obj[0].DiscAmtPerUnit);
        $('#startdate').val(obj[0].startdt);
        $('#enddate').val(obj[0].CloseDt);
    },
    do_populatewarehouseData: (obj) => {
        // editor init
       
        var editor = new $.fn.dataTable.Editor({
            table: "#item_table",
            fields: [
                { label: "PriceType", name: "PriceType" },
                { label: "ItemVariantName", name: "ItemVariantName" },
                { label: "LocationDesc", name: "LocationDesc" },
                { label: "UomDesc", name: "UomDesc" },
                { label: "MinQty", name: "MinQty" },
                { label: "MaxQty", name: "MaxQty" },
                { label: "PricePerUnit", name: "PricePerUnit" },
                { label: "DiscPer", name: "DiscPer" },
                { label: "DiscAmtPerUnit", name: "DiscAmtPerUnit" },
                { label: "startdt", name: "startdt" },
                { label: "CloseDt", name: "CloseDt" }
                /*{ label: "enddate", name: "enddate" }*/

            ],
        });
        var roletable = $("#item_table");

        var roledata = [];
        roledata = obj;



        roletable.dataTable({
            //dom: "Bfrtip",
            dom: "lBfrtip",
            "bDestroy": true,
            fixedHeader: true,
            "pageLength": 10,
            data: roledata,
            columns: [
                { data: "PriceType" },
                { data: "ItemVariantName" },
                { data: "LocationDesc" },
                { data: "UomDesc" },
                { data: "MinQty" },
                { data: "MaxQty" },
                { data: "PricePerUnit" },
                { data: "DiscPer" },
                { data: "DiscAmtPerUnit" },
                { data: "startdt" },
                { data: "CloseDt" }
               /* { data: "isblock" }*/

            ],

            select: true,
            //scrollX: true,
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

                }


            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowid", `${data.RowId}`);
            },
        });

        var table = $('#item_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {

                if (!itemPriceObject._deleteperm[0]) {
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


        if (!itemPriceObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!itemPriceObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }

        if (!itemPriceObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }

        if (!itemPriceObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view item price !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }


    },


    //End of load data
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(itemPriceObject);

        itemPriceObject._vieweperm = MainObject.do_IsActionMenuPermission(itemPriceObject.access, 'ITEM PRICE', 'view');
        itemPriceObject._createperm = MainObject.do_IsActionMenuPermission(itemPriceObject.access, 'ITEM PRICE', 'create');
        itemPriceObject._editperm = MainObject.do_IsActionMenuPermission(itemPriceObject.access, 'ITEM PRICE', 'edit');
        itemPriceObject._deleteperm = MainObject.do_IsActionMenuPermission(itemPriceObject.access, 'ITEM PRICE', 'delete');

    },
    do_populateItemMaster: (ItemId) => {
        //var ItemId = localStorage.itemmasteroverviewrowid;
        $.ajax({
            url: apiurl + 'api/GetProcurementItemforItemPrice',
            type: 'POST',
            data: { CoCd: $("#ddlCompany").val() },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objItem = response;
                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].Itemcd + ' (' + response[i].ItemDesc + ') ' + "</option>"
                    );
                }
                $("#ddProcItem").html(_html.join(""));
                $("#ddProcItem").val(ItemId);
                if (ItemId > 0) {
                    $('#ddProcItem').prop("disabled", true);                   
                }
                localStorage.itemmasteroverviewrowid = ItemId;
                itemPriceObject.do_loaddata(-1, 'getlist');



            },
            error: function (err) {
                alert(err.responseText);
            }
        });

    },
    // Populate  Variant Code
    do_populateVariantCode: () => {
        var ItemId =  localStorage.itemmasteroverviewrowid;
        $.ajax({
            url: apiurl + 'api/GetInventoryItemVariantCode',
            type: 'POST',
            data: { CoCd: $("#ddlCompany").val(), ItemRowId: ItemId},
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objVendor = response;
                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].ItemVariantName + "</option>"
                    );
                }
                $("#ddVariantCode").html(_html.join(""));
                itemPriceObject.do_populateLocation();
                




            },
            error: function (err) {
                alert(err.responseText);
            }
        });

    },
    //Populate Location
     do_populateLocation: () => {
        var ItemId = localStorage.itemmasteroverviewrowid;
        $.ajax({
            url: apiurl + 'api/GetInventoryWarehouseLocation',
            type: 'POST',
            data: { CoCd: $("#ddlCompany").val()},
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objVendor = response;
                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].LocationCd + "</option>"
                    );
                }
                $("#ddLocation").html(_html.join(""));
                itemPriceObject.do_populateCurrency();
               




            },
            error: function (err) {
                alert(err.responseText);
            }
        });

    },
     //Populate Currency
    do_populateCurrency: () => {
       
        $.ajax({
            url: apiurl + 'api/GetCurrency',
            type: 'POST',
            data: { CoCd: $("#ddlCompany").val() },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objVendor = response;
                //var _html = [];
                //_html.push("<option value='-1'>--Select--</option>")
                //for (var i = 0; i < response.length; i++) {
                //    _html.push(
                //        "<option value='" + response[i].RowId + "'>" + response[i].CurrCd + "</option>"
                //    );
                //}
                $("#ddCurrency").val(response[0].CurrCd);
                itemPriceObject.do_populateUOM();




            },
            error: function (err) {
                alert(err.responseText);
            }
        });

    },
    //Populate UOM
    do_populateUOM: () => {

        $.ajax({
            url: apiurl + 'api/GetProcurementUomNew',
            type: 'POST',
            data: { CoCd: $("#ddlCompany").val(), Procurement_Item_pk: localStorage.itemmasteroverviewrowid },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objVendor = response;
                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].UomCd + "</option>"
                    );
                }
                $("#dduom").html(_html.join(""));
               
                if (localStorage.itemmasteroverviewrowid) {
                    itemPriceObject.do_populateItemMaster(localStorage.itemmasteroverviewrowid);
                }
                else {
                    itemPriceObject.do_populateItemMaster(-1);
                } 




            },
            error: function (err) {
                alert(err.responseText);
            }
        });

    },
    do_loaddataedit: (id) => {
        itemPriceObject.do_loaddata(id,'edit');
    }

}
//################################################# end of itemPriceObject ##############################
var datablank = function () {
    companylogo = "";
    contentType = "";
    $("#ddPriceType").val('-1');
    $("#ddVariantCode").val('-1');
    $("#ddLocation").val('-1');
    if (parseInt(deflocationid) == 0) {
        deflocationid = -1;
    }
    $("#ddLocation").val(deflocationid);
   // $("#ddCurrency").val('-1');
    $("#dduom").val('-1');
    $("#minqty").val('');
    $("#maxqty").val('');
    $("#price").val('');
    $("#discountpercent").val('');
    $("#discountamount").val('');
    $("#startdate").val('');
    $("#enddate").val('');

}
//################################################ Roleaction ##########################################
var roleaction = function (rowId, mode) {
    console.log(rowId);
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);

    if (mode == "viewlocation") {
        itemPriceObject.rowid = rowId;
        showmodalview();

    }
    if (mode == 'add') {
        companylogo = "";
        itemPriceObject.rowid = '-1';
        showmodal();
        $('.modal-title').html('Item Price - New');

        datablank();
        $('#btnSave').text('Add');
        $('#btnSave').show();
        
        //$('.readOnly').attr("disabled", false);

        //$('#txtCode').prop("disabled", false);

    }
    if (mode == 'edit') {
        showmodal();

        $('.modal-title').html('Item Price - Edit');
        $('#cbBlock').show();
        datablank();
        if (!itemPriceObject._deleteperm[0]) {
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

        itemPriceObject.rowid = rowId;
        itemPriceObject.do_loaddataedit(rowId);

    }
    else if (mode == 'view') {
        showmodal();
        datablank();
        $('.modal-title').html('Item Price - View');
        $('#cbBlock').show();
        // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!itemPriceObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete!!!');
        } else { $('#country_overview_delete').show(); }
        if (!itemPriceObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();

        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        itemPriceObject.rowid = rowId;
        itemPriceObject.do_loaddataedit(rowId);
    }

    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    var issBlock = 1
                    var created_by, creator_MAC_add, CoCd, ItemId;
                    var ddPriceType, ddVariantCode, ddLocation, ddCurrency, dduom, minqty, maxqty, price, discountpercent, discountamount, startdate, enddate;


                    creator_MAC_add = ipaddress;
                    created_by = $("#txt").val();
                    CoCd = $("#ddlCompany").val();
                    ItemId = localStorage.itemmasteroverviewrowid;


                    ddPriceType = '';
                    ddVariantCode = 0;
                    ddLocation = 0;

                    ddCurrency = 0;
                    dduom = 0;
                    minqty = 0;


                    maxqty = 0;
                    price = 0;
                    discountpercent = 0;


                    discountamount = 0;
                    startdate = '';
                    enddate = '';

                    _data = '{rowid:"' + rowId + '"}';
                    $.ajax({
                        url: apiurl + 'api/InventoryItemPrice',
                        type: 'POST',
                        //data: { p_mode: "remov", RowId: rowId },
                        data: { p_mode: "remove", RowId: rowId, priceType: ddPriceType, CoCd: CoCd, ItemId: ItemId, variantCode: ddVariantCode, location: ddLocation, currency: ddCurrency, uom: dduom, minqty: minqty, maxqty: maxqty, price: price, discountpercent: discountpercent, discountamount: discountamount, startdate: startdate, enddate: enddate, IsBlock: issBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            if (response[0].msg == "true") {
                                validate = true;
                                $.alertable.alert(`Data deleted successfully.`, ``, `Ok`, ``).then(function () {
                                    if (queryString('id') != undefined || queryString("id") != null) {
                                        window.location = "item-price.aspx?id=" + queryString('id');
                                    }
                                    else {
                                        window.location = "item-price.aspx";
                                    }
                                });
                            }
                            else {
                                validate = false;
                                $.alertable.alert(
                                    response[0].msg
                                );

                                validate = false;
                                return false;
                            }
                        },
                        error: function () {
                            alert("error in data delete");
                        }
                    });

                },
            );
    }

};
//############################################### end of roleaction #################################
//################################################# Start of  Savedata ##################################
var savedata = function () {
    var validate = true;
    //price
    if ($('#ddPriceType').val() == '-1') {
        validate = false;
        $.alertable.alert('Price type required.');
        $("#ddPriceType").focus();
        return false;
    }
    if (CP_CostPriceByVariant == 1 && $('#ddVariantCode').val() == '-1') {
        validate = false;
        $.alertable.alert('Variant code required.');
        $("#ddVariantCode").focus();
        return false;
    }
    if ($('#price').val().length < 1) {
        validate = false;
        $.alertable.alert('Price/Unit required.');
        $("#dduom").focus();
        return false;
    }
    if ($('#dduom').val() == '-1') {
        validate = false;
        $.alertable.alert('UOM required.');
        $("#dduom").focus();
        return false;
    }

    else {
       
        //if ($('#discountpercent').val().toString().length > 0 && $('#discountamount').val().toString().length > 0) {
        //    validate = false;
        //    $.alertable.alert(`Either discount percent or discount amount is required. `);
        //    $("#discountpercent").focus();
        //    return false;
        //}
        if ($('#discountpercent').val().toString().length > 0 && $('#discountamount').val().toString().length > 0) {

            if (parseFloat($('#discountpercent').val()) > 0 && parseFloat($('#discountamount').val()) > 0) {
                validate = false;
                $.alertable.alert(`Either discount percent or discount amount is allowed.`);
                $("#discountpercent").focus();
                return false;
            }
        }
        if ($('#startdate').val() == '') {
            validate = false;
            $.alertable.alert(`Start date required.`);
            $("#startdate").focus();
            return false;
        }
      
        if ($('#enddate').val() != '') {
            var dt1 = new Date($('#startdate').val());
            var dt2 = new Date($('#enddate').val());
            console.log(dt1);

            if (dt1 > dt2) {
                validate = false;
                $.alertable.alert(`Start date cannot be greater than end date.`);
                $("#startdate").focus();
                return false;
            }
        }
       

        $('#btnSave').prop("disabled", true);

        
        saveFinal(-1);

    }
   

};
function saveFinal(imgId) {
    var issBlock = 0
    var created_by, creator_MAC_add,  CoCd, ItemId;
    var ddPriceType, ddVariantCode, ddLocation, ddCurrency, dduom, minqty, maxqty, price, discountpercent, discountamount, startdate, enddate;

    creator_MAC_add = ipaddress;
    created_by = $("#txt").val();
    CoCd = $("#ddlCompany").val();
    ItemId = localStorage.itemmasteroverviewrowid;


    ddPriceType = $("#ddPriceType").val();
    ddVariantCode = $("#ddVariantCode").val();
    ddLocation = $("#ddLocation").val();

    ddCurrency = $("#ddCurrency").val();
    dduom = $("#dduom").val();
    minqty = $("#minqty").val();
    

    maxqty = $("#maxqty").val();
    price = $("#price").val();
    discountpercent = $("#discountpercent").val();


    discountamount = $("#discountamount").val();
    startdate = $("#startdate").val();
    enddate = $("#enddate").val();

    if ($('#minqty').val().toString().length <= 0) {
        minqty = 0;
    }
    if ($('#maxqty').val().toString().length <= 0) {
        maxqty=0
    }
    if ($('#price').val().toString().length <= 0) {
        price = 0;
    }
    if ($('#discountpercent').val().toString().length <= 0) {
        discountpercent = 0;
    }
    if ($('#discountamount').val().toString().length <= 0) {
        discountamount = 0;
    }

    if (parseInt(itemPriceObject.rowid) > 0) {
        $.ajax({

            url: apiurl + 'api/InventoryItemPrice',
            type: 'POST',
            //data: { p_mode: "update", RowId: parseInt(itemPriceObject.rowid), VendorId: VendorId, CoCd: CoCd, ItemId: ItemId, VendorItemNo: VendorItemNo, LeadTime: LeadTime, IsBlock: issBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },
            data: { p_mode: "update", RowId: parseInt(itemPriceObject.rowid), priceType: ddPriceType, CoCd: CoCd, ItemId: ItemId, variantCode: ddVariantCode, location: ddLocation, currency: ddCurrency, uom: dduom, minqty: minqty, maxqty: maxqty, price: price, discountpercent: discountpercent, discountamount: discountamount, startdate: startdate, enddate: enddate, IsBlock: issBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);


                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        if (queryString('id') != undefined || queryString("id") != null) {
                            window.location = "item-price.aspx?id=" + queryString('id');
                        }
                        else {
                            window.location = "item-price.aspx";
                        }
                        
                    });
                }
                else {
                    validate = false;
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $.alertable.alert(
                        response[0].msg
                    );

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
            url: apiurl + 'api/InventoryItemPrice',
            type: 'POST',
            data: { p_mode: "create", RowId: -1, priceType: ddPriceType, CoCd: CoCd, ItemId: ItemId, variantCode: ddVariantCode, location: ddLocation, currency: ddCurrency, uom: dduom, minqty: minqty, maxqty: maxqty, price: price, discountpercent: discountpercent, discountamount: discountamount, startdate: startdate, enddate: enddate, IsBlock: issBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);
                console.log(response);
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                        if (queryString('id') != undefined || queryString("id") != null) {
                            window.location = "item-price.aspx?id=" + queryString('id');
                        }
                        else {
                            window.location = "item-price.aspx";
                        }
                    });
                }
                else {
                    validate = false;
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $.alertable.alert(
                        response[0].msg
                    );

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
function populateGridData() {
    var itemrowId = $("#ddProcItem").val();
    localStorage.itemmasteroverviewrowid = itemrowId;
    itemPriceObject.do_populateUOM();
    itemPriceObject.do_populateVariantCode();
    itemPriceObject.do_loaddata(-1, 'getlist');
}
var getObjectByValue = function (array, key, value) {
    return array.filter(function (object) {
        return object[key] === value;
    });
};
var queryString = function (name) {
    var match = RegExp('[?&]' + name + '=([^&]*)')
        .exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};
function fetchheadervalue() {
    var s = getObjectByValue(objItem, "RowId", localStorage.itemmasteroverviewrowid);
   
    $("#itemcode").html(s[0].Itemcd);
    $("#itemdes").html(s[0].ItemDesc);
 
    
}