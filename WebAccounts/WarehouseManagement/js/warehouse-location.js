var ipaddress = "";
$(document).ready(function () {
    var cuserid = '<%=Session["userid"].ToString() %>';
      
    //localStorage.menu_id_premission = 326;
    if (localStorage.WarehouseLocationmenuid == '' || localStorage.WarehouseLocationmenuid == undefined) {
        localStorage.WarehouseLocationmenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage.WarehouseLocationmenuid;
    }


    $("#warehousename").html(localStorage.warehousedesc + '(' +  localStorage.warehousename + ')');
    $("#txtWarehouse").val(localStorage.warehousename);
    $("#warehousebulk").html(localStorage.warehousedesc + '(' + localStorage.warehousename + ')');
 
    $('#txtAisle').prop("disabled", true);
    $('#txtRack').prop("disabled", true);
    $('#txtShelf').prop("disabled", true);
    $('#txtBin').prop("disabled", true);

   
    if (localStorage.SLR_UseAisle == "true") {
        $('#txtAisle').prop("disabled", false);
    }
    else {
        $('#txtAisle').val("0");
    }
  
    if (localStorage.SLR_UseRack == "true") {
        $('#txtRack').prop("disabled", false);
    }
    else {
        $('#txtRack').val("0");
    }
    if (localStorage.SLR_UseSelf == "true") {
        $('#txtShelf').prop("disabled", false);
    }
    else {
        $('#txtShelf').val("0");
    }
    if (localStorage.SLR_UseBin == "true") {
        $('#txtBin').prop("disabled", false);
    }
    else {
        $('#txtBin').val("0");
    }



    $("#myModal").modal({
        show: false,
        backdrop: 'static'
    });

    $("#click-me").click(function () {
        $("#myModal").modal("show");
    });

    localStorage.menu_id_premission;
    
    WarehouseLocationObject.do_loadwarehouse();
    WarehouseLocationObject.do_getUserPagepermission();
 


    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var WarehouseLocationObject = {

    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _addressdetailsmenuid: '',
   
    do_loadwarehouse: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            $.ajax({
                url: apiurl + 'api/InventoryWarehouseLocation',
                type: 'POST',
                data: { p_mode: "getlist", LocationCd: '', CoCd: $("#ddlCompany").val(), LocationDesc: '', WhId: localStorage.warehouserowid , AisleNo: -1, RackNo: -1, SelfNo: -1, BinNo: "-1",created_by: $("#txt").val(), RowId: -1 },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {

                    
                    var obj = response;
                    var _html = [];
                    _html.push("<option value='0'>--Select--</option>")
                    for (var i = 0; i < response.length; i++) {
                        _html.push(
                            "<option value='" + response[i].LocationCd + "'>" + response[i].LocationCd + "</option>"
                        );
                    }
                    $("#ddLocationFrom").html(_html.join(""));
                    $("#ddLocationTo").html(_html.join(""));
                    
                    WarehouseLocationObject.do_populatewarehouseData(obj);
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
                { label: "AisleNo", name: "AisleNo" },
                { label: "RackNo", name: "RackNo" },
                { label: "SelfNo", name: "SelfNo" },
                { label: "BinNo", name: "BinNo" },
                { label: "LocationCd", name: "LocationCd" },
                { label: "LocationDesc", name: "LocationDesc" }
            ],
        });
        var roletable = $("#addressbook");

        var roledata = [];
        roledata = obj;

        

        roletable.dataTable({
            //dom: "Bfrtip",
            dom: "lBfrtip",
            fixedHeader: true,
            data: roledata,
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

                    add: "WIZARDlocation", text: 'Create/Remove by Wizard', action: () => showmodalwizard(),
                    attr: {
                        title: 'Create/Remove by Wizard',
                        id: 'WIZARDlocation'
                        //,value: WarehouseOverviewObject._addressdetailsmenuid[1]
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
               
                if (!WarehouseLocationObject._deleteperm[0]) {
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


        if (!WarehouseLocationObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
            $('#selectMe option[value="option1"]').attr("disabled", true);
        }
        if (!WarehouseLocationObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        
        if (!WarehouseLocationObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
            $('#selectMe option[value="option2"]').attr("disabled", true);
        }
     
        if (!WarehouseLocationObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view bank AC !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
       
        //if (!WarehouseLocationObject._uploadcountry[0]) {
        //    $('#addressdtl').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        //    $('#addressdtl').prop("disabled", true);
        //    $('#addressdtl').attr('title', 'do not have permission to view bank AC !!!');
        //    table.button(4).action(function () {
        //        this.active(false);
        //    });
        //}
       

    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(WarehouseLocationObject);
        
        WarehouseLocationObject._vieweperm = MainObject.do_IsActionMenuPermission(WarehouseLocationObject.access, 'CREATE LOCATION', 'view');
        WarehouseLocationObject._createperm = MainObject.do_IsActionMenuPermission(WarehouseLocationObject.access, 'CREATE LOCATION', 'create');
        WarehouseLocationObject._editperm = MainObject.do_IsActionMenuPermission(WarehouseLocationObject.access, 'CREATE LOCATION', 'edit');
        WarehouseLocationObject._deleteperm = MainObject.do_IsActionMenuPermission(WarehouseLocationObject.access, 'CREATE LOCATION', 'delete');
        //WarehouseLocationObject._block = MainObject.do_IsActionMenuPermission(WarehouseLocationObject.access, 'BLOCK', 'view');

        //WarehouseLocationObject._close = MainObject.do_IsActionMenuPermission(WarehouseLocationObject.access, 'CLOSE', 'view');
        //WarehouseLocationObject._createlocation = MainObject.do_IsActionMenuPermission(WarehouseLocationObject.access, 'CREATE LOCATION', 'view');
        //WarehouseLocationObject._viewlocation = MainObject.do_IsActionMenuPermission(WarehouseLocationObject.access, 'VIEW LOCATION', 'view');
        
    },
    do_populateWarehouoseType: () => {
        $.ajax({
            url: apiurl + 'api/CommonWareHouseTypeFetch',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objCountry = response;

                var _html = [];
                _html.push("<option value='0'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].WearHouseType + "</option>"
                    );
                }
                console.log(_html);
                $("#ddwarehousetype").html(_html.join(""));

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
    do_loaddataedit: (id) => {
        
        $.ajax({
            url: apiurl + 'api/InventoryWarehouseLocation',
            type: 'POST',
            data: { p_mode: "edit", LocationCd: '', CoCd: $("#ddlCompany").val(), LocationDesc: '', WhId: localStorage.warehouserowid, AisleNo: -1, RackNo: -1, SelfNo: -1, BinNo: "-1", created_by: $("#txt").val(), RowId: id },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                
                WarehouseLocationObject.rowid = id; 
                $("#txtAisle").val(response[0].AisleNo);
                $("#txtRack").val(response[0].RackNo);
                $("#txtShelf").val(response[0].SelfNo);
                $("#txtBin").val(response[0].BinNo);
                $("#txtCode").val(response[0].LocationCd);
                $("#txtDesc").val(response[0].LocationDesc);
               
               

            },
            error: function () {
                alert("error in data fetch");
            }
        }); 

       
    },


};
var savedata = function () {
    var validate = true;
    //
    
    if ($('#txtCode').val().length <1) {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txtCode").focus();
        return false;
    }
    else if ($('#txtDesc').val().length <1) {
        validate = false;
        $.alertable.alert(`Location Description required.`);
        $("#txtDesc").focus();
        return false;
    }
    else {
        //if (ipaddress == '') {
        //    _data["creator_mac_add"] = "192.100.0.1";
        //} else {
        //    _data["creator_mac_add"] = "192.100.0.1"; //ipaddress;
        //}
        //_data["cocd"] = $("#ddlCompany").val();
        //var _data = '{roleid:"' + RoleObject.hdnroleid + '", rolecode: "' + encodeURIComponent($("#txt_rolecode").val().trim()) + '"}';
        var SLR_UseAisle = 0, SLR_UseRack = 0, SLR_UseSelf = 0, SLR_UseBin = 0,isBlock=0, isClose=0;
        
        if (parseInt(WarehouseLocationObject.rowid) > 0) {
            $.ajax({
             
                url: apiurl + 'api/InventoryWarehouseLocation',
                type: 'POST',
                data: { p_mode: "update", LocationCd: $("#txtCode").val(), CoCd: $("#ddlCompany").val(), LocationDesc: $("#txtDesc").val(), WhId: localStorage.warehouserowid, AisleNo: $("#txtAisle").val(), RackNo: $("#txtRack").val(), SelfNo: $("#txtShelf").val(), BinNo: $("#txtBin").val(), created_by: $("#txt").val(), RowId: parseInt(WarehouseLocationObject.rowid) },

                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].CountryCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "warehouse-location.aspx";
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
                
                url: apiurl + 'api/InventoryWarehouseLocation',
                type: 'POST',
                data: { p_mode: "create", LocationCd: $("#txtCode").val(), CoCd: $("#ddlCompany").val(), LocationDesc: $("#txtDesc").val(), WhId: localStorage.warehouserowid , AisleNo: $("#txtAisle").val(), RackNo: $("#txtRack").val(), SelfNo: $("#txtShelf").val(), BinNo: $("#txtBin").val(), created_by: $("#txt").val(), RowId: -1 },

                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].CountryCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data addes successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "warehouse-location.aspx";
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

var savedatabulk = function () {
    var sdt = $("#selectMe").val();
    if (sdt == "option2") {
        removedatabulk();
        return true;
    }
    var validate = true;
    //

    if ($('#txtAislestoCreate').val().length < 1) {
        validate = false;
        $.alertable.alert(`No of Aisles to Create required.`);
        $("#txtAislestoCreate").focus();
        return false;
    }
    
    else {
       
       
        $.ajax({

            url: apiurl + 'api/InventoryWarehouseLocationCreatewizard',
            type: 'POST',
            data: { p_mode: "create", CoCd: $("#ddlCompany").val(), WhId: localStorage.warehouserowid, NoofAislestoCreate: $("#txtAislestoCreate").val(), NewAisleNoStartsfrom: $("#txtAislesStartsfrom").val(), Racks: $("#txtBulkRacks").val(), Shelfs: $("#txtBulkShelf").val(), Bins: $("#txtBulkBins").val(), created_by: $("#txt").val() },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);

                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data addes successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "warehouse-location.aspx";
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
                console.log(ex);
                alert(ex);
                alert("error in data insert");
            }
        });



    }

};
var removedatabulk = function () {
    var validate = true;
    //

    if ($('#ddLocationFrom').val().length < 3) {
        validate = false;
        $.alertable.alert(`Select Location from.`);
        $("#ddLocationFrom").focus();
        return false;
    }
    else if ($('#ddLocationTo').val().length < 3) {
        validate = false;
        $.alertable.alert(`Select Location to.`);
        $("#ddLocationFrom").focus();
        return false;
    }
    else {
       

        $.ajax({

            url: apiurl + 'api/InventoryWarehouseLocationBulkRemove',
            type: 'POST',
            data: { WhId: localStorage.warehouserowid, fromLocationCd: $("#ddLocationFrom").val(), toLocationCd: $("#ddLocationTo").val()},

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);

                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data removed successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "warehouse-location.aspx";
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
                console.log(ex);
                alert(ex);
                alert("error in data remove");
            }
        });



    }

};
var showmodal = function () {
    //alert("111");
    $('.modal-title').html('Add New Warehouse Location');

    WarehouseLocationObject.rowId = '-1';
    $('#txtCode').val('');
    $('#txtName').val('');
};

var otherWindow = function (countryCd, mode) {
    
    if (countryCd == "" || countryCd == undefined || countryCd == "undefined") return;
    localStorage.addressoverviewrowid = countryCd;
    //$('#addressbook').DataTable().rows('.selected').data()[0].AddressCode
    if (localStorage.addressoverviewrowid) {
        if (mode == "addressdtl") {
            localStorage.addressoverviewrowid = countryCd;
            localStorage.AddressDetailAddressCode = $('#addressbook').DataTable().rows('.selected').data()[0].AddressCode;
            localStorage.AddressDetailAddressName = $('#addressbook').DataTable().rows('.selected').data()[0].AddressName;
            localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;
            //window.open("address-details.aspx");
            localStorage.menu_id_premission = WarehouseLocationObject._addressdetailsmenuid[1]; 
            //alert(WarehouseLocationObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + WarehouseLocationObject._addressdetailsmenuid[1];
            location.href = 'address-details.aspx';
            
        }
        
    }
    
}
function generatelocationcode() {
    var locationcode = localStorage.warehousename;
    if (localStorage.SLR_UseAisle == "true") {
        locationcode = locationcode + '-' + $('#txtAisle').val();
    }
    else {
        locationcode = locationcode + '-0';
    }

    if (localStorage.SLR_UseRack == "true") {
        locationcode = locationcode + '-' + $('#txtRack').val();
    }
    else {
        locationcode = locationcode + '-0';
    }
    if (localStorage.SLR_UseSelf == "true") {
        locationcode = locationcode + '-' + $('#txtShelf').val();
    }
    else {
        locationcode = locationcode + '-0';
    }
    if (localStorage.SLR_UseBin == "true") {
        locationcode = locationcode + '-' + $('#txtBin').val();
    }
    else {
        locationcode = locationcode + '-0';
    }
    $('#txtCode').val(locationcode);
}
var roleaction = function (rowId, mode) {
    
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    
    //$('#txtCode').prop("disabled", false);
    if (mode == 'add') {
        showmodal();
        $('.modal-title').html('Add New Address Book Overview');

        WarehouseLocationObject.rowid = '-1';
        $('#btnSave').text('Add');
        $('#btnSave').show();
        $('#txtCode').prop("disabled", true);
        //$('.readOnly').attr("disabled", false);

    }
    if (mode == 'edit') {
        showmodal();
        $('.modal-title').html('Address Book Overview - Edit');
        $('#cbBlock').show();
       
        if (!WarehouseLocationObject._deleteperm[0]) {
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

        WarehouseLocationObject.rowid = rowId;
        WarehouseLocationObject.do_loaddataedit(rowId);
        
    }
    else if(mode == 'view') {
        showmodal();
        $('.modal-title').html('Address Book Overview - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!WarehouseLocationObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!WarehouseLocationObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        WarehouseLocationObject.rowid = rowId;
        WarehouseLocationObject.do_loaddataedit(rowId);
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
                                window.location = "warehouse-location.aspx";
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

var getObjectByValue = function (array, key, value) {
    return array.filter(function (object) {
        return object[key] === value;
    });
};

function ShowIP(response) {
    ipaddress = response.ip;
}

var showmodalwizard = function () {
    $("#myModalWIZARD").modal('show');
};

