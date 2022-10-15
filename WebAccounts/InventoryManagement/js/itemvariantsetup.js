var ipaddress = "";
var objVendor;
var companylogo="";
var contentType="";
var imgfileName="";
$(document).ready(function () {
   
   


    var cuserid = '<%=Session["userid"].ToString() %>';
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ipaddress = e.ip;
    });      
    //localStorage.menu_id_premission = 326;
    if (localStorage.ItemVariantOverviewmenuid == '' || localStorage.ItemVariantOverviewmenuid == undefined) {
        localStorage.ItemVariantOverviewmenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage.ItemVariantOverviewmenuid;
    }
    
    $("#itemcode").html(localStorage.itemmasteroverviewitemno);
    $("#itemdes").html(localStorage.itemmasteroverviewitemdesc);
    

    //setImage();
    $("#myModal").modal({
        show: false,
        backdrop: 'static'
    });

    $("#click-me").click(function () {
        $("#myModal").modal("show");
    });

    localStorage.menu_id_premission;
    ItemVariantSetupOverviewObject.do_populateMasterDropdown("SA_VariantId_1");

    
    //ItemVariantSetupOverviewObject.do_loaddata();
   ItemVariantSetupOverviewObject.do_getUserPagepermission();
  
    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var ItemVariantSetupOverviewObject = {

    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _addressdetailsmenuid: '',
    _vendormenuid : '',
    do_loaddata: () => {
        var created_by, creator_MAC_add, CoCd, ItemId, ItemVariantName, VariantValueId_1, VariantValueId_2, VariantValueId_3, VariantValueId_4; 


        
        creator_MAC_add = '';
        created_by = '';
        CoCd = $("#ddlCompany").val();
        ItemId = localStorage.itemmasteroverviewrowid;
        ItemVariantName = '';
        VariantValueId_1 = -1;
        VariantValueId_2 = -1;
        VariantValueId_3 = -1;
        VariantValueId_4 = -1;


        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),

            $.ajax({
                url: apiurl + 'api/InventoryItemVariantOperation',
                type: 'POST',
                data: { p_mode: "getlist", RowId: -1, ItemId: ItemId, CoCd: CoCd, ItemVariantName: ItemVariantName, VariantValueId_1: VariantValueId_1, VariantValueId_2: VariantValueId_2, VariantValueId_3: VariantValueId_3, VariantValueId_4: VariantValueId_4, created_by: created_by, creator_MAC_add: creator_MAC_add },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                  
                    ItemVariantSetupOverviewObject.do_populatewarehouseData(obj);
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
                { label: "ItemVariantName", name: "ItemVariantName" },
                { label: "VariantValueId_1", name: "VariantValueId_1" },
                { label: "VariantValueId_2", name: "VariantValueId_2" },
                { label: "VariantValueId_3", name: "VariantValueId_3" },
                { label: "VariantValueId_4", name: "VariantValueId_4" }
              
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
                { data: "ItemVariantName" },
                { data: "VariantValueId_1" },
                { data: "VariantValueId_2" },
                { data: "VariantValueId_3" },
                { data: "VariantValueId_4" }
               
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
               
                if (!ItemVariantSetupOverviewObject._deleteperm[0]) {
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


        if (!ItemVariantSetupOverviewObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!ItemVariantSetupOverviewObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        
        if (!ItemVariantSetupOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
     
        if (!ItemVariantSetupOverviewObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view bank AC !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
       

    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(ItemVariantSetupOverviewObject);
        
        ItemVariantSetupOverviewObject._vieweperm = MainObject.do_IsActionMenuPermission(ItemVariantSetupOverviewObject.access, 'VARIANTS SETUP', 'view');
        ItemVariantSetupOverviewObject._createperm = MainObject.do_IsActionMenuPermission(ItemVariantSetupOverviewObject.access, 'VARIANTS SETUP', 'create');
        ItemVariantSetupOverviewObject._editperm = MainObject.do_IsActionMenuPermission(ItemVariantSetupOverviewObject.access, 'VARIANTS SETUP', 'edit');
        ItemVariantSetupOverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(ItemVariantSetupOverviewObject.access, 'VARIANTS SETUP', 'delete');

    },
  
    do_populateMasterDropdown: (ctype) => {
       
        $.ajax({
            url: apiurl + 'api/GetInventoryItemVariantValue',
            type: 'POST',
            data: { ItemRowId: localStorage.itemmasteroverviewrowid, CoCd: $("#ddlCompany").val(), ctype: ctype},
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].VariantVal + "</option>"
                    );
                }
                if (ctype == "SA_VariantId_1") {
                    $("#ddVariantValueId_1").html(_html.join(""));
                    ItemVariantSetupOverviewObject.do_populateMasterDropdown("SA_VariantId_2");
                }
                if (ctype == "SA_VariantId_2") {
                    $("#ddVariantValueId_2").html(_html.join(""));
                    ItemVariantSetupOverviewObject.do_populateMasterDropdown("SA_VariantId_3");
                }
                if (ctype == "SA_VariantId_3") {
                    $("#ddVariantValueId_3").html(_html.join(""));
                    ItemVariantSetupOverviewObject.do_populateMasterDropdown("SA_VariantId_4");
                }
                if (ctype == "SA_VariantId_4") {
                    $("#ddVariantValueId_4").html(_html.join(""));
                    ItemVariantSetupOverviewObject.do_updatevariacaption();
                    ItemVariantSetupOverviewObject.do_loaddata();
                    
                }
          
               
            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    },
    do_updatevariacaption: () => {
        

        $.ajax({


            url: apiurl + 'api/ProcurementUomVariantcaption',
            type: 'POST',
            data: { prodid: localStorage.itemmasteroverviewrowid},

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {

                if (parseInt(response[0].SA_VariantId_1) > 0) {
                    $("#lblv1").html(response[0].s1Variantname);
                    $("#th1").html(response[0].s1Variantname);
                }
                if (parseInt(response[0].SA_VariantId_2) > 0) {
                    $("#lblv2").html(response[0].s2Variantname);
                    $("#th2").html(response[0].s2Variantname);
                }
                if (parseInt(response[0].SA_VariantId_3) > 0) {
                    $("#lblv3").html(response[0].s3Variantname);
                    $("#th3").html(response[0].s3Variantname);
                }
                if (parseInt(response[0].SA_VariantId_4) > 0) {
                    $("#lblv4").html(response[0].s4Variantname);
                    $("#th4").html(response[0].s4Variantname);
                }

                




            },
            error: function (err) {

                alert(err.responseText);
            }
        });


    },
    do_loaddataedit: (id) => {
        var created_by, creator_MAC_add, CoCd, ItemId, ItemVariantName, VariantValueId_1, VariantValueId_2, VariantValueId_3, VariantValueId_4;


        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
        ItemId = localStorage.itemmasteroverviewrowid;
        ItemVariantName = '';
        VariantValueId_1 = -1;
        VariantValueId_2 = -1;
        VariantValueId_3 =-1;
        VariantValueId_4 = -1;

        $.ajax({


            url: apiurl + 'api/InventoryItemVariantOperation',
            type: 'POST',
            data: { p_mode: "edit", RowId: id, ItemId: ItemId, CoCd: CoCd, ItemVariantName: ItemVariantName, VariantValueId_1: VariantValueId_1, VariantValueId_2: VariantValueId_2, VariantValueId_3: VariantValueId_3, VariantValueId_4: VariantValueId_4, created_by: created_by, creator_MAC_add: creator_MAC_add },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {

                
                
                ItemVariantSetupOverviewObject.rowid = response[0].RowId;
                $("#txtName").val(response[0].ItemVariantName);
                $("#ddVariantValueId_1").val(response[0].VariantValueId_1);
                $("#ddVariantValueId_2").val(response[0].VariantValueId_2);
                $("#ddVariantValueId_3").val(response[0].VariantValueId_3);
                $("#ddVariantValueId_4").val(response[0].VariantValueId_4);




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
                data: { p_mode: "getlist", LocationCd: '', CoCd: $("#ddlCompany").val(), LocationDesc: '', WhId: ItemVariantSetupOverviewObject.rowid, AisleNo: -1, RackNo: -1, SelfNo: -1, BinNo: "-1", created_by: $("#txt").val(), RowId: -1 },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    ItemVariantSetupOverviewObject.do_loadwarehouselocationData(obj);
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
function chkVariableValue() {
    var rtn = 0;
    var ddVariantValueId_1length = $('#ddVariantValueId_1 > option').length;
    var ddVariantValueId_2length = $('#ddVariantValueId_2 > option').length;
    var ddVariantValueId_3length = $('#ddVariantValueId_3 > option').length;
    var ddVariantValueId_4length = $('#ddVariantValueId_4 > option').length;
  
    if (ddVariantValueId_1length>1 && $('#ddVariantValueId_1').val() <1) {
        rtn = 1;
    }
    if (rtn == 0) {
        if (ddVariantValueId_2length > 1 && $('#ddVariantValueId_2').val() < 1) {
            rtn = 1;
        }
    }
    if (rtn == 0) {
        if (ddVariantValueId_3length > 1 && $('#ddVariantValueId_3').val() < 1) {
            rtn = 1;
        }
    }
    if (rtn == 0) {
        if (ddVariantValueId_4length > 1 && $('#ddVariantValueId_4').val() < 1) {
            rtn = 1;
        }
    }
    return rtn;
}
var savedata = function () {
    var validate = true;
    //
    if ($('#txtName').val().length < 1) {
        validate = false;
        $.alertable.alert(`Name required.`);
        $("#txtName").focus();
        return false;
    }
    else if ($('#ddVariantValueId_1').val() < 1 && $('#ddVariantValueId_2').val() < 1 && $('#ddVariantValueId_3').val() < 1 && $('#ddVariantValueId_4').val() < 1) {
        validate = false;
        $.alertable.alert(`Variant required.`);
        $("#ddVariantValueId_1").focus();
        return false;
    }
    else if (chkVariableValue() == 1) {
        validate = false;
        $.alertable.alert(`Variant required.`);
        $("#ddVariantValueId_1").focus();
        return false;
    }
    else {
        $('#btnSave').prop("disabled", true);
        
        saveFinal(-1);
       
        //companylogo = "";
        //companylogo = companylogo.replace('data:image/png;base64,', '');
        //companylogo = companylogo.replace('data:image/jpeg;base64,', '');
        //companylogo = companylogo.replace('data:image/jpg;base64,', '');
        //companylogo = companylogo.replace('data:application/pdf;base64,', '');
       
       

        
    }

};

function saveFinal(imgId) {
    var issBlock = 0
    var created_by, creator_MAC_add, CoCd, ItemId, ItemVariantName, VariantValueId_1, VariantValueId_2,VariantValueId_3, VariantValueId_4; 


    creator_MAC_add = ipaddress;
    created_by = $("#txt").val();
    CoCd = $("#ddlCompany").val();
    ItemId = localStorage.itemmasteroverviewrowid;
    ItemVariantName = $("#txtName").val();
    VariantValueId_1 = $("#ddVariantValueId_1").val();
    VariantValueId_2 = $("#ddVariantValueId_2").val();
    VariantValueId_3 = $("#ddVariantValueId_3").val();
    VariantValueId_4 = $("#ddVariantValueId_4").val();
    
    if (parseInt(ItemVariantSetupOverviewObject.rowid) > 0) {
        $.ajax({

            url: apiurl + 'api/InventoryItemVariantOperation',
            type: 'POST',
            data: { p_mode: "update", RowId: parseInt(ItemVariantSetupOverviewObject.rowid), ItemId: ItemId, CoCd: CoCd, ItemVariantName: ItemVariantName, VariantValueId_1: VariantValueId_1, VariantValueId_2: VariantValueId_2, VariantValueId_3: VariantValueId_3, VariantValueId_4: VariantValueId_4, created_by: created_by, creator_MAC_add: creator_MAC_add },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);


                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "item-variant-setup.aspx";
                    });
                }
                else {
                    validate = false;
                    $('#btnSave').prop("disabled", false);
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
            url: apiurl + 'api/InventoryItemVariantOperation',
            type: 'POST',
            data: { p_mode: "create", RowId: parseInt(ItemVariantSetupOverviewObject.rowid), ItemId: ItemId, CoCd: CoCd, ItemVariantName: ItemVariantName, VariantValueId_1: VariantValueId_1, VariantValueId_2: VariantValueId_2, VariantValueId_3: VariantValueId_3, VariantValueId_4: VariantValueId_4, created_by: created_by, creator_MAC_add: creator_MAC_add },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);
                console.log(response);
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "item-variant-setup.aspx";
                    });
                }
                else {
                    validate = false;
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $.alertable.alert(
                        response[0].msg
                    );
                    $('#btnSave').prop("disabled", false);
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


            localStorage.clickedmenu_id = ItemVariantSetupOverviewObject._vendormenuid[1];

          
            localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemType;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(ItemVariantSetupOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + ItemVariantSetupOverviewObject._addressdetailsmenuid[1];
            location.href = 'item-variant-setup.aspx';
            
        }
        
    }
    
}

var datablank = function () {
    companylogo = "";
    contentType = "";
    $("#ddVendor").val('-1');
    $("#txtVendorItemNo").val('');
    $("#txtLead").val('');
   
}
var roleaction = function (rowId, mode) {
    
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);
  
    if (mode == "viewlocation") {
        ItemVariantSetupOverviewObject.rowid = rowId;
        showmodalview();

    }
    if (mode == 'add') {
        companylogo = "";
        ItemVariantSetupOverviewObject.rowid = '-1';
        showmodal();
        $('.modal-title').html('Variant Setup - New');

        datablank();
        $('#btnSave').text('Add');
        $('#btnSave').show();
        //$('.readOnly').attr("disabled", false);
       
        //$('#txtCode').prop("disabled", false);

    }
    if (mode == 'edit') {
        showmodal();
        
        $('.modal-title').html('Variant Setup - Edit');
        $('#cbBlock').show();
        datablank();
        if (!ItemVariantSetupOverviewObject._deleteperm[0]) {
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

        ItemVariantSetupOverviewObject.rowid = rowId;
        ItemVariantSetupOverviewObject.do_loaddataedit(rowId);
        
    }
    else if(mode == 'view') {
        showmodal();
        datablank();
        $('.modal-title').html('Variant Setup - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!ItemVariantSetupOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!ItemVariantSetupOverviewObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        ItemVariantSetupOverviewObject.rowid = rowId;
        ItemVariantSetupOverviewObject.do_loaddataedit(rowId);
    }
    
    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    var created_by, creator_MAC_add, CoCd, ItemId, ItemVariantName, VariantValueId_1, VariantValueId_2, VariantValueId_3, VariantValueId_4;
                    creator_MAC_add = ipaddress;
                    created_by = $("#txt").val();
                    CoCd = $("#ddlCompany").val();
                    ItemId = localStorage.itemmasteroverviewrowid;
                    ItemVariantName = '';
                    VariantValueId_1 = -1;
                    VariantValueId_2 = -1;
                    VariantValueId_3 = -1;
                    VariantValueId_4 = -1;
                    _data = '{rowid:"' + rowId + '"}';
                    $.ajax({
                        url: apiurl + 'api/InventoryItemVariantOperation',
                        type: 'POST',
                        data: { p_mode: "delete", RowId: rowId, ItemId: ItemId, CoCd: CoCd, ItemVariantName: ItemVariantName, VariantValueId_1: VariantValueId_1, VariantValueId_2: VariantValueId_2, VariantValueId_3: VariantValueId_3, VariantValueId_4: VariantValueId_4, created_by: created_by, creator_MAC_add: creator_MAC_add },
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            $.alertable.alert(`Data removed successfully.`, ``, `Ok`, ``).then(function () {
                                window.location = "item-variant-setup.aspx";
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
function getVendorName() {
    try {
        var cCode = $('#ddVendor').val();
        var s = getObjectByValue(objVendor, "RowId", cCode);
        $('#txtVendor').val(s[0].VendName);

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
function PopulateState() {
    ItemVariantSetupOverviewObject.do_populateLocationDropdown('STATE', $('#ddPincodeCountry').val(), $('#ddPincodeCounty'));
}
function PopulateCity() {
    ItemVariantSetupOverviewObject.do_populateLocationDropdown('CITY', $('#ddPincodeCounty').val(), $('#ddPincodeCity'));
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


function rmvlogo() {
    companylogo = "";
    contentType = "";
    $('#blah')
        .attr('src', '')
    $("#rmvlogo").hide();
}
