var ipaddress = "";
var objCountry;
$(document).ready(function () {
    var cuserid = '<%=Session["userid"].ToString() %>';
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ipaddress = e.ip;
    });
    //localStorage.menu_id_premission = 326;
    if (localStorage.WarehouseOverviewmenuid == '' || localStorage.WarehouseOverviewmenuid == undefined) {
        localStorage.WarehouseOverviewmenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage.WarehouseOverviewmenuid;
    }

    $("#myModal").modal({
        show: false,
        backdrop: 'static'
    });

    $("#click-me").click(function () {
        $("#myModal").modal("show");
    });

    localStorage.menu_id_premission;
    WarehouseOverviewObject.do_populateLocationDropdown('COUNTRY', -1, $('#ddPincodeCountry'));
    WarehouseOverviewObject.do_populateWarehouoseType();
    //WarehouseOverviewObject.do_populateWarehousebyType();
    //WarehouseOverviewObject.do_populateAdministratorNoSequence();
    //WarehouseOverviewObject.do_loadwarehouse();
    WarehouseOverviewObject.do_getUserPagepermission();




    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var WarehouseOverviewObject = {

    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _locationmenuid : '',
    _addressdetailsmenuid: '',
    do_loadwarehouse: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            $.ajax({
                url: apiurl + 'api/InventoryWareHouseMaster',
                type: 'POST',
                data: { p_mode: "getlist", WareHouseCd: '', CoCd: $("#ddlCompany").val(), WareHouseDesc: '', Add1: '', Add2: '', PostId: -1, WhTypeId: -1, OtherWhId: "-1", Comm_ContactPerson: -1, Comm_PhoneNo: -1, Comm_AltPhoneNo: -1, Comm_Email: -1, Comm_Website: -1, SLR_UseAisle: -1, SLR_UseRack: -1, SLR_UseSelf: -1, SLR_UseBin: -1, SLR_DefRecptLocationId: -1, SLR_DefIssueLocationId: -1, NS_PurRecptNo: -1, NS_PurInvNo: -1, NS_PurRetShipNo: -1, NS_PurCreditMemoNo: -1, NS_TranfShipNo: -1, NS_TranfRecptNo: -1, NS_SalesShipNo: -1, NS_SalesInvNo: -1, NS_SalesRetRecptNo: -1, NS_SalesCreditMemoNo: -1, created_by: $("#txt").val(), RowId: -1, Comm_FaxNo: '', IsBlock: 0, IsClose: 0 },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].AddressCode);
                    //alert(response[0].AddressName);
                    //alert(response[0].CountryCd);
                    //alert(response[0].CountryName);
                    var obj = response;
                    WarehouseOverviewObject.do_populatewarehouseData(obj);
                },
                error: function () {
                    alert("error in data fetch");
                }
            });


    },
    do_populatewarehouseData: (obj) => {
        // editor init

        var editor = new $.fn.dataTable.Editor({
            table: "#addressbook",
            fields: [
                { label: "WareHouseCd", name: "WareHouseCd" },
                { label: "WareHouseDesc", name: "WareHouseDesc" },
                { label: "WearHouseType", name: "WearHouseType" },

                { label: "IsBlock", name: "IsBlock" },
                { label: "IsClose", name: "IsClose" }
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
            columnDefs: [{
                orderable: false,
                'render': function (data, type, full, meta) {
                    //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                    return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                },
                targets: 4
            },
            {
                orderable: false,
                'render': function (data, type, full, meta) {
                    //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                    return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                },
                targets: 3
            }

            ],

            data: roledata,
            columns: [
                { data: "WareHouseCd" },
                { data: "WareHouseDesc" },
                { data: "WearHouseType" },
                { data: "IsBlock" },
                { data: "IsClose" }
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

                    add: "Block", text: 'Block', action: function () { roleaction($('.selected').attr('rowid'), 'block'); },
                    attr: {
                        title: 'Block',
                        id: 'Block'
                        //,value: WarehouseOverviewObject._addressdetailsmenuid[1]
                    }

                },
                {

                    add: "location", text: 'Create Location', action: function () { otherWindow($('.selected').attr('rowid'), $('.selected').attr('warehousename'), $('.selected').attr('warehousedesc'), $('.selected').attr('SLR_UseAisle'), $('.selected').attr('SLR_UseRack'), $('.selected').attr('SLR_UseSelf'), $('.selected').attr('SLR_UseBin'), 'location'); },
                    attr: {
                        title: 'Create Location',
                        id: 'location'
                        , value: WarehouseOverviewObject._locationmenuid[1]
                    }

                },
                {

                    add: "viewlocation", text: 'View Location', action: function () { roleaction($('.selected').attr('rowid'), 'viewlocation'); },
                    attr: {
                        title: 'View Location',
                        id: 'viewlocation'
                        //,value: WarehouseOverviewObject._addressdetailsmenuid[1]
                    }

                }

            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowid", `${data.RowId}`);
                $(row).attr("warehousename", `${data.WareHouseCd}`);
                $(row).attr("warehousedesc", `${data.WareHouseDesc}`);
                $(row).attr("SLR_UseRack", `${data.SLR_UseRack}`);
                $(row).attr("SLR_UseAisle", `${data.SLR_UseAisle}`);
                $(row).attr("SLR_UseSelf", `${data.SLR_UseSelf}`);
                $(row).attr("SLR_UseBin", `${data.SLR_UseBin}`);
            },
        });

        var table = $('#addressbook').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {

                if (!WarehouseOverviewObject._deleteperm[0]) {
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


        if (!WarehouseOverviewObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!WarehouseOverviewObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }

        if (!WarehouseOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }

        if (!WarehouseOverviewObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view bank AC !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }

        //if (!WarehouseOverviewObject._uploadcountry[0]) {
        //    $('#addressdtl').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        //    $('#addressdtl').prop("disabled", true);
        //    $('#addressdtl').attr('title', 'do not have permission to view bank AC !!!');
        //    table.button(4).action(function () {
        //        this.active(false);
        //    });
        //}


    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(WarehouseOverviewObject);

        WarehouseOverviewObject._vieweperm = MainObject.do_IsActionMenuPermission(WarehouseOverviewObject.access, 'WAREHOUSE', 'view');
        WarehouseOverviewObject._createperm = MainObject.do_IsActionMenuPermission(WarehouseOverviewObject.access, 'WAREHOUSE', 'create');
        WarehouseOverviewObject._editperm = MainObject.do_IsActionMenuPermission(WarehouseOverviewObject.access, 'WAREHOUSE', 'edit');
        WarehouseOverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(WarehouseOverviewObject.access, 'WAREHOUSE', 'delete');

        //WarehouseOverviewObject._block = MainObject.do_IsActionMenuPermission(WarehouseOverviewObject.access, 'BLOCK', 'view');

        //WarehouseOverviewObject._close = MainObject.do_IsActionMenuPermission(WarehouseOverviewObject.access, 'CLOSE', 'view');
        //WarehouseOverviewObject._createlocation = MainObject.do_IsActionMenuPermission(WarehouseOverviewObject.access, 'CREATE LOCATION', 'view');
        //WarehouseOverviewObject._viewlocation = MainObject.do_IsActionMenuPermission(WarehouseOverviewObject.access, 'VIEW LOCATION', 'view');
        WarehouseOverviewObject._locationmenuid = MainObject.do_IsActionMenuPermission(WarehouseOverviewObject.access, 'CREATE LOCATION', 'menuid');
    },
    do_populateWarehouoseLocation: (val1, val2) => {
        $.ajax({
            url: apiurl + 'api/InventoryWarehouseLocation',
            type: 'POST',
            data: { p_mode: "getlist", LocationCd: '', CoCd: $("#ddlCompany").val(), LocationDesc: '', WhId: WarehouseOverviewObject.rowid, AisleNo: -1, RackNo: -1, SelfNo: -1, BinNo: "-1", created_by: $("#txt").val(), RowId: -1 },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objCountry = response;

                var _html = [];
                _html.push("<option value='-1'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].LocationCd + "</option>"
                    );
                }
                console.log(_html);
                $("#ddSLR_DefRecptLocationId").html(_html.join(""));
                $("#ddSLR_DefIssueLocationId").html(_html.join(""));

                $("#ddSLR_DefRecptLocationId").val(val1);
                $("#ddSLR_DefIssueLocationId").val(val2);

            },
            error: function () {
                alert("error in data fetch");
            }
        });
    },
    do_populateLocationDropdown: (cexternalType, cexternalPk, cObj) => {

        $.ajax({
            url: apiurl + 'api/GetCountryStateCityByParent',
            type: 'POST',
            data: { externaltype: cexternalType, externalpk: cexternalPk },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objCountry = response;

                var _html = [];
                _html.push("<option value='-1'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].id + "'>" + response[i].cdesc + "</option>"
                    );
                }

                cObj.html(_html.join(""));


            },
            error: function (ex) {
                console.log(ex);
                alert(ex.responseText);
            }
        });
    },
    do_populateWarehousebyType: () => {
        var ccompany = $("#ddlCompany").val();
        $.ajax({
            url: apiurl + 'api/getWarehouseMasterbyType',
            type: 'POST',
            data: { whtype: 2, ccompany: ccompany },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objCountry = response;

                var _html = [];
                _html.push("<option value='-1'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].WareHouseCd + "</option>"
                    );
                }
                console.log(_html);
                $("#ddTransit").html(_html.join(""));
                WarehouseOverviewObject.do_populateAdministratorNoSequence();
                WarehouseOverviewObject.do_loadwarehouse();




            },
            error: function () {
                alert("error in fetch data");
            }
        });

        $.ajax({
            url: apiurl + 'api/getWarehouseMasterbyType',
            type: 'POST',
            data: { whtype: 3, ccompany: ccompany },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objCountry = response;

                var _html = [];
                _html.push("<option value='-1'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].WareHouseCd + "</option>"
                    );
                }
                console.log(_html);
                $("#ddQuarantine").html(_html.join(""));




            },
            error: function () {
                alert("error in fetch data");
            }
        });
        $.ajax({
            url: apiurl + 'api/PayablesVendorFetch',
            type: 'POST',
            data: { ccompany: ccompany },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objCountry = response;

                var _html = [];
                _html.push("<option value='-1'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].VendCd + "</option>"
                    );
                }
                console.log(_html);
                $("#ddVendor").html(_html.join(""));




            },
            error: function () {
                alert("error in fetch data");
            }
        });
    },
    do_populateWarehouoseType: () => {
        $.ajax({
            url: apiurl + 'api/CommonWareHouseTypeFetch',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objCountry = response;

                var _html = [];
                _html.push("<option value='0'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].WearHouseType + "</option>"
                    );
                }

                $("#ddwarehousetype").html(_html.join(""));
                WarehouseOverviewObject.do_populateWarehousebyType();

            },
            error: function () {
                alert("error in data fetch");
            }
        });
    },
    do_populateAdministratorNoSequence: () => {
        $.ajax({
            url: apiurl + 'api/getAdministratorNoSequence',
            type: 'POST',
            data: { CoCd: $("#ddlCompany").val() },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objCountry = response;

                var _html = [];
                _html.push("<option value='0'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].NsCode + "</option>"
                    );
                }
                console.log(_html);
                $("#ddNS_PurRecptNo").html(_html.join(""));
                $("#ddNS_SalesShipNo").html(_html.join(""));
                $("#ddNS_PurInvNo").html(_html.join(""));
                $("#ddNS_SalesInvNo").html(_html.join(""));
                $("#ddNS_PurRetShipNo").html(_html.join(""));
                $("#ddNS_SalesRetRecptNo").html(_html.join(""));
                $("#ddNS_PurCreditMemoNo").html(_html.join(""));
                $("#ddNS_SalesCreditMemoNo").html(_html.join(""));
                $("#ddNS_TranfShipNo").html(_html.join(""));
                $("#ddNS_TranfRecptNo").html(_html.join(""));
            },
            error: function () {
                alert("error in data fetch");
            }
        });
    },
    do_updateblock: (id) => {

        $.ajax({
            url: apiurl + 'api/InventoryWareHouseMaster',
            type: 'POST',
            data: { p_mode: "block", WareHouseCd: '', CoCd: $("#ddlCompany").val(), WareHouseDesc: '', Add1: '', Add2: '', PostId: -1, WhTypeId: -1, TransitWhId: "-1", QuarantineWhId: "-1", VendorWhId: "-1", Comm_ContactPerson: -1, Comm_PhoneNo: -1, Comm_AltPhoneNo: -1, Comm_Email: -1, Comm_Website: -1, SLR_UseAisle: -1, SLR_UseRack: -1, SLR_UseSelf: -1, SLR_UseBin: -1, SLR_DefRecptLocationId: -1, SLR_DefIssueLocationId: -1, NS_PurRecptNo: -1, NS_PurInvNo: -1, NS_PurRetShipNo: -1, NS_PurCreditMemoNo: -1, NS_TranfShipNo: -1, NS_TranfRecptNo: -1, NS_SalesShipNo: -1, NS_SalesInvNo: -1, NS_SalesRetRecptNo: -1, NS_SalesCreditMemoNo: -1, created_by: $("#txt").val(), RowId: id, Comm_FaxNo: '', IsBlock: 1, IsClose: 0 },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "warehouse-overview.aspx";
                    });
                }
                else {
                    validate = false;
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $.alertable.alert(
                        response[0].msg
                    );
                    $("#txtCode").focus();
                    validate = false;
                    return false;
                }
            },
            error: function () {
                alert("error in data fetch");
            }
        });


    },
    do_loaddataedit: (id) => {

        $.ajax({
            url: apiurl + 'api/InventoryWareHouseMaster',
            type: 'POST',
            data: { p_mode: "edit", WareHouseCd: '', CoCd: $("#ddlCompany").val(), WareHouseDesc: '', Add1: '', Add2: '', PostId: -1, WhTypeId: -1, TransitWhId: "-1", QuarantineWhId: "-1", VendorWhId: "-1", Comm_ContactPerson: -1, Comm_PhoneNo: -1, Comm_AltPhoneNo: -1, Comm_Email: -1, Comm_Website: -1, SLR_UseAisle: -1, SLR_UseRack: -1, SLR_UseSelf: -1, SLR_UseBin: -1, SLR_DefRecptLocationId: -1, SLR_DefIssueLocationId: -1, NS_PurRecptNo: -1, NS_PurInvNo: -1, NS_PurRetShipNo: -1, NS_PurCreditMemoNo: -1, NS_TranfShipNo: -1, NS_TranfRecptNo: -1, NS_SalesShipNo: -1, NS_SalesInvNo: -1, NS_SalesRetRecptNo: -1, NS_SalesCreditMemoNo: -1, created_by: $("#txt").val(), RowId: id, Comm_FaxNo: '', IsBlock: 0, IsClose: 0 },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //console.log(response);
                WarehouseOverviewObject.rowid = response[0].RowId;
                WarehouseOverviewObject.do_populateWarehouoseLocation(response[0].SLR_DefRecptLocationId, response[0].SLR_DefIssueLocationId);

                $('#ddQuarantine').prop("disabled", true);
                $('#ddTransit').prop("disabled", true);
                $('#ddVendor').prop("disabled", true);

                $("#txtWareHouseCd").val(response[0].WareHouseCd);
                $("#txtWareHouseDesc").val(response[0].WareHouseDesc);
                $("#txtAdd1").val(response[0].Add1);
                $("#txtAdd2").val(response[0].Add2);
                $("#txtPostId").val(response[0].PostId);
                $("#ddwarehousetype").val(response[0].WhTypeId);
                $("#ddQuarantine").val(response[0].QuarantineWhId)
                $("#ddTransit").val(response[0].TransitWhId)
                $("#ddVendor").val(response[0].VendorWhId)
                $("#txtComm_PhoneNo").val(response[0].Comm_PhoneNo);
                $("#txtComm_ContactPerson").val(response[0].Comm_ContactPerson);
                $("#txtComm_AltPhoneNo").val(response[0].Comm_AltPhoneNo);
                $("#txtComm_Email").val(response[0].Comm_Email);
                $("#txtComm_Website").val(response[0].Comm_Website);
                $("#txtFaxno").val(response[0].Comm_FaxNo);
                $("#chkSLR_UseAisle").prop('checked', false);
                $("#chkSLR_UseRack").prop('checked', false);
                $("#chkSLR_UseSelf").prop('checked', false);
                $("#chkSLR_UseBin").prop('checked', false);
                $("#chkBlock").prop('checked', false);
                $("#chkClose").prop('checked', false);
                if (response[0].SLR_UseAisle == true) {
                    $("#chkSLR_UseAisle").prop('checked', true);
                }

                if (response[0].SLR_UseRack == true) {
                    $("#chkSLR_UseRack").prop('checked', true);
                }
                if (response[0].SLR_UseSelf == true) {
                    $("#chkSLR_UseSelf").prop('checked', true);
                }
                if (response[0].SLR_UseBin == true) {
                    $("#chkSLR_UseBin").prop('checked', true);
                }
                if (response[0].SLR_UseBin == true) {
                    $("#chkSLR_UseBin").prop('checked', true);
                }
                if (response[0].IsBlock == true) {
                    $("#chkBlock").prop('checked', true);
                }
                if (response[0].IsClose == true) {
                    $("#chkClose").prop('checked', true);
                }
                //SLR_DefRecptLocationId
                //SLR_DefIssueLocationId

                $("#ddNS_PurRecptNo").val(response[0].NS_PurRecptNo);
                $("#ddNS_PurInvNo").val(response[0].NS_PurInvNo);
                $("#ddNS_PurRetShipNo").val(response[0].NS_PurRetShipNo);
                $("#ddNS_PurCreditMemoNo").val(response[0].NS_PurCreditMemoNo);
                $("#ddNS_TranfShipNo").val(response[0].NS_TranfShipNo);
                $("#ddNS_TranfRecptNo").val(response[0].NS_TranfRecptNo);
                $("#ddNS_SalesShipNo").val(response[0].NS_SalesShipNo);
                $("#ddNS_SalesInvNo").val(response[0].NS_SalesInvNo);
                $("#ddNS_SalesRetRecptNo").val(response[0].NS_SalesRetRecptNo);
                $("#ddNS_SalesCreditMemoNo").val(response[0].NS_SalesCreditMemoNo);

                $("#txtPostCode").val(response[0].PostCode);
                $("#txtCity").val(response[0].CityName);
                $("#txtCountry").val(response[0].CountryName);
                $("#txtState").val(response[0].StateName);



                var whtype = response[0].WhTypeId;//$("#ddwarehousetype").val();
                if (whtype == 1) {
                    //$('#country_overview_create').prop("disabled", true);
                    $("#ddQuarantine").prop("disabled", false);
                    $("#ddTransit").prop("disabled", false);
                    $("#ddVendor").prop("disabled", true);
                }
                if (whtype == 2 || whtype == 3) {
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
                //alert($("#ddSLR_DefRecptLocationId"));
                //alert(response[0].SLR_DefRecptLocationId);
                //$("#ddSLR_DefRecptLocationId").val(response[0].SLR_DefRecptLocationId); 
                //$("#ddSLR_DefIssueLocationId").val(response[0].SLR_DefIssueLocationId);
            },
            error: function () {
                alert("error in data fetch");
            }
        });


    },
    do_loadwarehouselocation: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            $.ajax({
                url: apiurl + 'api/InventoryWarehouseLocation',
                type: 'POST',
                data: { p_mode: "getlist", LocationCd: '', CoCd: $("#ddlCompany").val(), LocationDesc: '', WhId: WarehouseOverviewObject.rowid, AisleNo: -1, RackNo: -1, SelfNo: -1, BinNo: "-1", created_by: $("#txt").val(), RowId: -1 },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    WarehouseOverviewObject.do_loadwarehouselocationData(obj);
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

    if ($('#txtWareHouseCd').val().length < 1) {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txtWareHouseCd").focus();
        return false;
    }
    else if ($('#txtWareHouseDesc').val().length < 1) {
        validate = false;
        $.alertable.alert(`Name required.`);
        $("#txtWareHouseDesc").focus();
        return false;
    }
    else if ($('#ddwarehousetype').val() < 1) {
        validate = false;
        $.alertable.alert(`Warehouose Type required.`);
        $("#ddwarehousetype").focus();
        return false;
    }
    else if ($('#txtPostId').val() < 1) {
        validate = false;
        $.alertable.alert(`Post Code required.`);
        $("#txtPostCode").focus();
        return false;
    }
    else if ($('#txtComm_Email').val().length > 1 && validateEmail($('#txtComm_Email').val()) == false) {
        validate = false;
        $.alertable.alert(`Not a valid e-mail address.`);
        $("#txtComm_Email").focus();
        return false;
    }
    //else if ($('#txtComm_Email').val().length > 1) {
    //    try {
    //        validate = false;
    //        //var x = $('#txtComm_Email').val();
    //        //var atpos = x.indexOf("@");
    //        //var dotpos = x.lastIndexOf(".");
    //        //alert(atpos);
    //        //if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
    //        //    $.alertable.alert('Not a valid e-mail address.');
    //        //    $("#txtComm_Email").focus();
    //        //    return false;
    //        //}
    //    }
    //    catch (ex) {
    //        alert(ex);
    //    }

    //}
    else {
        //if (ipaddress == '') {
        //    _data["creator_mac_add"] = "192.100.0.1";
        //} else {
        //    _data["creator_mac_add"] = "192.100.0.1"; //ipaddress;
        //}
        //_data["cocd"] = $("#ddlCompany").val();
        //var _data = '{roleid:"' + RoleObject.hdnroleid + '", rolecode: "' + encodeURIComponent($("#txt_rolecode").val().trim()) + '"}';
        var SLR_UseAisle = 'N', SLR_UseRack = 0, SLR_UseSelf = 0, SLR_UseBin = 0, issBlock = 0, issClose = 0;
        if ($('#chkSLR_UseAisle').is(':checked')) {
            SLR_UseAisle = 1;
        }
        if ($('#chkSLR_UseRack').is(':checked')) {
            SLR_UseRack = 1;
        }
        if ($('#chkSLR_UseSelf').is(':checked')) {
            SLR_UseSelf = 1;
        }
        if ($('#chkSLR_UseBin').is(':checked')) {
            SLR_UseBin = 1;
        }
        if ($('#chkBlock').is(':checked')) {
            issBlock = 1;
        }
        if ($('#chkClose').is(':checked')) {
            issClose = 1;
        }

        var SLR_DefRecptLocationId = -1;
        var SLR_DefIssueLocationId = -1;

        if (parseInt(WarehouseOverviewObject.rowid) > 0) {
            SLR_DefRecptLocationId = $("#ddSLR_DefRecptLocationId").val();
            SLR_DefIssueLocationId = $("#ddSLR_DefIssueLocationId").val();
            //var str = 'p_mode: "update", WareHouseCd:  ' + $("#txtWareHouseCd").val() + ', CoCd: ' + $("#ddlCompany").val() + ', WareHouseDesc: ' + $("#txtWareHouseDesc").val() + ', Add1: ' + $("#txtAdd1").val() + ', Add2: ' + $("#txtAdd2").val() + ', PostId: ' + $("#txtPostId").val() + ', WhTypeId: ' + $("#ddwarehousetype").val() + ', OtherWhId: "-1", Comm_ContactPerson: ' + $("#txtComm_ContactPerson").val() + ', Comm_PhoneNo: ' + $("#txtComm_PhoneNo").val() + ', Comm_AltPhoneNo: ' + $("#txtComm_AltPhoneNo").val() + ', Comm_Email: ' + $("#txtComm_Email").val() + ', Comm_Website: ' + $("#txtComm_Website").val() + ', SLR_UseAisle: ' + SLR_UseAisle + ', SLR_UseRack: ' + SLR_UseRack + ', SLR_UseSelf:  ' + SLR_UseSelf + ', SLR_UseBin: ' + SLR_UseBin + ', SLR_DefRecptLocationId: ' + SLR_DefRecptLocationId + ', SLR_DefIssueLocationId: ' + SLR_DefIssueLocationId + ', NS_PurRecptNo: ' + $("#ddNS_PurRecptNo").val() + ', NS_PurInvNo:  ' + $("#ddNS_PurInvNo").val() + ', NS_PurRetShipNo: ' + $("#ddNS_PurRetShipNo").val() + ', NS_PurCreditMemoNo:  ' + $("#ddNS_PurCreditMemoNo").val() + ', NS_TranfShipNo: ' + $("#ddNS_TranfShipNo").val() + ', NS_TranfRecptNo: ' + $("#ddNS_TranfRecptNo").val() + ', NS_SalesShipNo:  ' + $("#ddNS_SalesShipNo").val() + ', NS_SalesInvNo: ' + $("#ddNS_SalesInvNo").val() + ', NS_SalesRetRecptNo: ' + $("#ddNS_SalesRetRecptNo").val() + ', NS_SalesCreditMemoNo: ' + $("#ddNS_SalesCreditMemoNo").val() + ', created_by: ' + $("#txt").val() + ' , RowId: "-1",Comm_FaxNo: ' + $("#txtFaxno").val(); 
            //alert(str);
            $.ajax({

                url: apiurl + 'api/InventoryWareHouseMaster',
                type: 'POST',
                data: { p_mode: "update", WareHouseCd: $("#txtWareHouseCd").val(), CoCd: $("#ddlCompany").val(), WareHouseDesc: $("#txtWareHouseDesc").val(), Add1: $("#txtAdd1").val(), Add2: $("#txtAdd2").val(), PostId: $("#txtPostId").val(), WhTypeId: $("#ddwarehousetype").val(), QuarantineWhId: $("#ddQuarantine").val(), TransitWhId: $("#ddTransit").val(), VendorWhId: $("#ddVendor").val(), Comm_ContactPerson: $("#txtComm_ContactPerson").val(), Comm_PhoneNo: $("#txtComm_PhoneNo").val(), Comm_AltPhoneNo: $("#txtComm_AltPhoneNo").val(), Comm_Email: $("#txtComm_Email").val(), Comm_Website: $("#txtComm_Website").val(), SLR_UseAisle: SLR_UseAisle, SLR_UseRack: SLR_UseRack, SLR_UseSelf: SLR_UseSelf, SLR_UseBin: SLR_UseBin, SLR_DefRecptLocationId: SLR_DefRecptLocationId, SLR_DefIssueLocationId: SLR_DefIssueLocationId, NS_PurRecptNo: $("#ddNS_PurRecptNo").val(), NS_PurInvNo: $("#ddNS_PurInvNo").val(), NS_PurRetShipNo: $("#ddNS_PurRetShipNo").val(), NS_PurCreditMemoNo: $("#ddNS_PurCreditMemoNo").val(), NS_TranfShipNo: $("#ddNS_TranfShipNo").val(), NS_TranfRecptNo: $("#ddNS_TranfRecptNo").val(), NS_SalesShipNo: $("#ddNS_SalesShipNo").val(), NS_SalesInvNo: $("#ddNS_SalesInvNo").val(), NS_SalesRetRecptNo: $("#ddNS_SalesRetRecptNo").val(), NS_SalesCreditMemoNo: $("#ddNS_SalesCreditMemoNo").val(), created_by: $("#txt").val(), RowId: parseInt(WarehouseOverviewObject.rowid), Comm_FaxNo: $("#txtFaxno").val(), IsBlock: issBlock, IsClose: issClose },

                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].CountryCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "warehouse-overview.aspx";
                        });
                    }
                    else {
                        validate = false;
                        //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                        $.alertable.alert(
                            response[0].msg
                        );
                        $("#txtCode").focus();
                        validate = false;
                        return false;
                    }

                },
                error: function () {
                    alert("error in data insert");
                }
            });
        }
        else {
            //alert($("#txtFaxno").val());
            //var str = 'p_mode: "create", WareHouseCd:  ' + $("#txtWareHouseCd").val() + ', CoCd: ' + $("#ddlCompany").val() + ', WareHouseDesc: ' + $("#txtWareHouseDesc").val() + ', Add1: ' + $("#txtAdd1").val() + ', Add2: ' + $("#txtAdd2").val() + ', PostId: ' + $("#txtPostId").val() + ', WhTypeId: ' + $("#ddwarehousetype").val() + ', OtherWhId: "-1", Comm_ContactPerson: ' + $("#txtComm_ContactPerson").val() + ', Comm_PhoneNo: ' + $("#txtComm_PhoneNo").val() + ', Comm_AltPhoneNo: ' + $("#txtComm_AltPhoneNo").val() + ', Comm_Email: ' + $("#txtComm_Email").val() + ', Comm_Website: ' + $("#txtComm_Website").val() + ', SLR_UseAisle: ' + SLR_UseAisle + ', SLR_UseRack: ' + SLR_UseRack + ', SLR_UseSelf:  ' + SLR_UseSelf + ', SLR_UseBin: ' + SLR_UseBin + ', SLR_DefRecptLocationId: ' + SLR_DefRecptLocationId + ', SLR_DefIssueLocationId: ' + SLR_DefIssueLocationId + ', NS_PurRecptNo: ' + $("#ddNS_PurRecptNo").val() + ', NS_PurInvNo:  ' + $("#ddNS_PurInvNo").val() + ', NS_PurRetShipNo: ' + $("#ddNS_PurRetShipNo").val() + ', NS_PurCreditMemoNo:  ' + $("#ddNS_PurCreditMemoNo").val() + ', NS_TranfShipNo: ' + $("#ddNS_TranfShipNo").val() + ', NS_TranfRecptNo: ' + $("#ddNS_TranfRecptNo").val() + ', NS_SalesShipNo:  ' + $("#ddNS_SalesShipNo").val() + ', NS_SalesInvNo: ' + $("#ddNS_SalesInvNo").val() + ', NS_SalesRetRecptNo: ' + $("#ddNS_SalesRetRecptNo").val() + ', NS_SalesCreditMemoNo: ' + $("#ddNS_SalesCreditMemoNo").val() + ', created_by: ' + $("#txt").val() + ' , RowId: "-1",Comm_FaxNo: ' + $("#txtFaxno").val(); 
            //alert(str);


            $.ajax({
                url: apiurl + 'api/InventoryWareHouseMaster',
                type: 'POST',
                data: { p_mode: "create", WareHouseCd: $("#txtWareHouseCd").val(), CoCd: $("#ddlCompany").val(), WareHouseDesc: $("#txtWareHouseDesc").val(), Add1: $("#txtAdd1").val(), Add2: $("#txtAdd2").val(), PostId: $("#txtPostId").val(), WhTypeId: $("#ddwarehousetype").val(), QuarantineWhId: $("#ddQuarantine").val(), TransitWhId: $("#ddTransit").val(), VendorWhId: $("#ddVendor").val(), Comm_ContactPerson: $("#txtComm_ContactPerson").val(), Comm_PhoneNo: $("#txtComm_PhoneNo").val(), Comm_AltPhoneNo: $("#txtComm_AltPhoneNo").val(), Comm_Email: $("#txtComm_Email").val(), Comm_Website: $("#txtComm_Website").val(), SLR_UseAisle: SLR_UseAisle, SLR_UseRack: SLR_UseRack, SLR_UseSelf: SLR_UseSelf, SLR_UseBin: SLR_UseBin, SLR_DefRecptLocationId: SLR_DefRecptLocationId, SLR_DefIssueLocationId: SLR_DefIssueLocationId, NS_PurRecptNo: $("#ddNS_PurRecptNo").val(), NS_PurInvNo: $("#ddNS_PurInvNo").val(), NS_PurRetShipNo: $("#ddNS_PurRetShipNo").val(), NS_PurCreditMemoNo: $("#ddNS_PurCreditMemoNo").val(), NS_TranfShipNo: $("#ddNS_TranfShipNo").val(), NS_TranfRecptNo: $("#ddNS_TranfRecptNo").val(), NS_SalesShipNo: $("#ddNS_SalesShipNo").val(), NS_SalesInvNo: $("#ddNS_SalesInvNo").val(), NS_SalesRetRecptNo: $("#ddNS_SalesRetRecptNo").val(), NS_SalesCreditMemoNo: $("#ddNS_SalesCreditMemoNo").val(), created_by: $("#txt").val(), RowId: -1, Comm_FaxNo: $("#txtFaxno").val(), IsBlock: issBlock, IsClose: issClose },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].CountryCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data addes successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "warehouse-overview.aspx";
                        });
                    }
                    else {
                        validate = false;
                        //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                        $.alertable.alert(
                            response[0].msg
                        );
                        $("#txtCode").focus();
                        validate = false;
                        return false;
                    }

                },
                error: function (ex) {
                    console.log(ex);
                    alert(ex);
                    alert("error in data insert");
                }
            });
        }



    }

};


var showmodal = function () {
    //alert("111");
    $('.modal-title').html('Add New Country');

    WarehouseOverviewObject.rowId = '-1';
    $('#txtCode').val('');
    $('#txtName').val('');
};

var otherWindow = function (countryCd, coutryName, warehousedesc, SLR_UseAisle, SLR_UseRack, SLR_UseSelf, SLR_UseBin, mode) {

    if (countryCd == "" || countryCd == undefined || countryCd == "undefined") return;
    localStorage.warehouserowid = countryCd;
    //$('#addressbook').DataTable().rows('.selected').data()[0].AddressCode
    if (localStorage.warehouserowid) {
        if (mode == "location") {
            localStorage.clickedmenu_id = WarehouseOverviewObject._locationmenuid[1];
            localStorage.menu_id_premission = WarehouseOverviewObject._locationmenuid[1];
            localStorage.warehousename = coutryName;
            localStorage.warehousedesc = warehousedesc;
            localStorage.SLR_UseAisle = SLR_UseAisle;
            localStorage.SLR_UseRack = SLR_UseRack;
            localStorage.SLR_UseSelf = SLR_UseSelf;
            localStorage.SLR_UseBin = SLR_UseBin;


            //localStorage.AddressDetailAddressCode = $('#addressbook').DataTable().rows('.selected').data()[0].AddressCode;
            //localStorage.AddressDetailAddressName = $('#addressbook').DataTable().rows('.selected').data()[0].AddressName;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(WarehouseOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + WarehouseOverviewObject._addressdetailsmenuid[1];
            location.href = 'warehouse-location.aspx?id=' + countryCd;

        }

    }

}

var roleaction = function (rowId, mode) {

    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);

    if (mode == "viewlocation") {
        WarehouseOverviewObject.rowid = rowId;
        WarehouseOverviewObject.do_loadwarehouselocation();
        showmodalview();

    }
    if (mode == 'add') {
        WarehouseOverviewObject.rowid = '-1';
        showmodal();
        $('.modal-title').html('Add New Warehouse Overview');


        $('#btnSave').text('Add');
        $('#btnSave').show();
        //$('.readOnly').attr("disabled", false);
        $("#txtWareHouseCd").val('');
        $("#txtWareHouseDesc").val('');
        $("#txtAdd1").val('');
        $("#txtAdd2").val('');
        $("#txtPostId").val(-1);
        $("#ddwarehousetype").val(-1);
        $("#ddQuarantine").val(-1)
        $("#ddTransit").val(-1)
        $("#ddVendor").val(-1)
        $("#txtComm_PhoneNo").val('');
        $("#txtComm_ContactPerson").val('');
        $("#txtComm_AltPhoneNo").val('');
        $("#txtComm_Email").val('');
        $("#txtComm_Website").val('');
        $("#txtFaxno").val('');
        $("#chkSLR_UseAisle").prop('checked', false);
        $("#chkSLR_UseRack").prop('checked', false);
        $("#chkSLR_UseSelf").prop('checked', false);
        $("#chkSLR_UseBin").prop('checked', false);
        $("#chkBlock").prop('checked', false);
        $("#chkClose").prop('checked', false);
        $('#txtPostId').val('-1');
        //SLR_DefRecptLocationId
        //SLR_DefIssueLocationId
        $("#ddNS_PurRecptNo").val('');
        $("#ddNS_PurInvNo").val('');
        $("#ddNS_PurRetShipNo").val('');
        $("#ddNS_PurCreditMemoNo").val('');
        $("#ddNS_TranfShipNo").val('');
        $("#ddNS_TranfRecptNo").val('');
        $("#ddNS_SalesShipNo").val('');
        $("#ddNS_SalesInvNo").val('');
        $("#ddNS_SalesRetRecptNo").val('');
        $("#ddNS_SalesCreditMemoNo").val('');

        $("#txtPostCode").val('');
        $("#txtCity").val('');
        $("#txtCountry").val('');
        $("#txtState").val('');
        $("#ddSLR_DefRecptLocationId").val(-1);
        $("#ddSLR_DefIssueLocationId").val(-1);
    }
    if (mode == 'edit') {
        showmodal();
        $('.modal-title').html('Warehouse Overview - Edit');
        $('#cbBlock').show();

        if (!WarehouseOverviewObject._deleteperm[0]) {
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
        $('#txtCode').prop("disabled", true);

        WarehouseOverviewObject.rowid = rowId;
        WarehouseOverviewObject.do_loaddataedit(rowId);

    }
    else if (mode == 'view') {
        showmodal();
        $('.modal-title').html('Warehouse Overview - View');
        $('#cbBlock').show();
        // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!WarehouseOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!WarehouseOverviewObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();

        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        WarehouseOverviewObject.rowid = rowId;
        WarehouseOverviewObject.do_loaddataedit(rowId);
    }
    else if (mode == 'block') {
        $.alertable.custconfirm(`Are you want to block the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    WarehouseOverviewObject.do_updateblock(rowId);

                },
            );
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
                                window.location = "warehouse-overview.aspx";
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
    if (whtype == 2 || whtype == 3) {
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
    WarehouseOverviewObject.do_populateLocationDropdown('STATE', $('#ddPincodeCountry').val(), $('#ddPincodeCounty'));
}
function PopulateCity() {
    WarehouseOverviewObject.do_populateLocationDropdown('CITY', $('#ddPincodeCounty').val(), $('#ddPincodeCity'));
}
var setpincode = function (cpincode) {


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
                $('#txtCity').val(response[0].CityName);
                $('#txtCountry').val(response[0].CountryName);
                $('#txtState').val(response[0].StateName);
                $('#txtPostCode').val(response[0].PostCode);
                $('#txtPostId').val(response[0].addressID);
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

