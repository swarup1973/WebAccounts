var ipaddress = "";
var objCountry;
$(document).ready(function () {
    var cuserid = '<%=Session["userid"].ToString() %>';
      


   
    $("#myModal").modal({
        show: false,
        backdrop: 'static'
    });

    $("#click-me").click(function () {
        $("#myModal").modal("show");
    });

    $("#txtAddressCode").val(localStorage.AddressDetailAddressCode);
    $("#txtAddressName").val(localStorage.AddressDetailAddressName);
    $("#txtCountryCode").val(localStorage.AddressDetailCountryCode);
    $("#txtCountryName").val(localStorage.AddressDetailCountryName);


    $("#divaddresscode").html(localStorage.AddressDetailAddressCode);
    $("#divaddressname").html(localStorage.AddressDetailAddressName);
    $("#divcountrycode").html(localStorage.AddressDetailCountryCode);
    $("#divcountryname").html(localStorage.AddressDetailCountryName);

    $("#lblAddressName").html("Address Name : <strong>" + localStorage.AddressDetailAddressName + "</strong>");
    $("#lblCountryName").html("Country Name : <strong>" + localStorage.AddressDetailCountryName + "</strong>");
    localStorage.StateOverviewCountryName = localStorage.AddressDetailCountryName;
    localStorage.menu_id_premission;
    AddressBookdtlObject.do_populateStateCode();
    //AddressBookdtlObject.do_populateCityCode();
    //AddressBookdtlObject.do_loaddata();
    AddressBookdtlObject.do_getUserPagepermission();
 


    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var AddressBookdtlObject = {

    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _statecitymappingid : '',
    do_loaddata: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            $.ajax({
                url: apiurl + 'api/AdministratorAddressBookDetailFetch',
                type: 'POST',
                
                data: { p_mode: "getlist", AddressMainId: "-1", StateId: "-1", CityId: "-1", PostCode : "", PostDescrip : "", created_by: "", creator_MAC_add: "", RowId: "-1" },
                //data: { p_mode: "getlist", AddressCode: "", AddressName: "", CountryCd: "", created_by: "", creator_MAC_add: "", RowId: "-1" },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    AddressBookdtlObject.do_populateData(obj);
                },
                error: function () {
                    alert("error in data fetch");
                }
            }); 
       

    },
    do_populateData: (obj) => {
        // editor init
        
        var editor = new $.fn.dataTable.Editor({
            table: "#addressdtl",
            fields: [
                { label: "StateName", name: "StateName" },
                { label: "CityName", name: "CityName" },
                { label: "PostCode", name: "PostCode" },
                { label: "PostDescrip", name: "PostDescrip" }
            ],
        });
        var roletable = $("#addressdtl");

        var roledata = [];
        roledata = obj;

        

        roletable.dataTable({
            //dom: "Bfrtip",
            dom: "lBfrtip",
            fixedHeader: true,
            data: roledata,
            columns: [
                { data: "StateName" },
                { data: "CityName" },
                { data: "PostCode" },
                { data: "PostDescrip" }
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [
                {
                    add: "create", text: 'Create New', editor: editor, action: function () { roleaction('-1', 'add'); },
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
                    add: "wizard", text: 'Create by Wizard', editor: editor, action: () => showmodalwizard(),
                    attr: {
                        title: 'Create by Wizard',
                        id: 'country_overview_Wizard'
                    }

                },
                {
                    add: "mapping", text: 'Open State City Mapping', editor: editor, action: function () { otherWindow(localStorage.AddressDetailCountryCode, 'mapping'); },
                    attr: {
                        title: 'Open State City Mapping',
                        id: 'country_overview_mapping'
                    }

                }
              
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowid", `${data.RowId}`);
                $(row).attr("statecd", `${data.StateCd}`);
                $(row).attr("citycd", `${data.CityCd}`);
            },
        });
        
        var table = $('#addressdtl').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
               
                if (!AddressBookdtlObject._deleteperm[0]) {
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


        if (!AddressBookdtlObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
            $('#selectMe option[value="1"]').attr("disabled", true);
        }
        if (!AddressBookdtlObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        
        if (!AddressBookdtlObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
            $('#selectMe option[value="2"]').attr("disabled", true);
        }
     
        if (!AddressBookdtlObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view bank AC !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
        if (!AddressBookdtlObject._wizard[0]) {
            $('#country_overview_Wizard').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Wizard').prop("disabled", true);
            $('#country_overview_Wizard').attr('title', 'do not have permission to view bank AC !!!');
            table.button(4).action(function () {
                this.active(false);
            });
        }
        if (!AddressBookdtlObject._statecitymapping[0]) {
            $('#country_overview_mapping').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_mapping').prop("disabled", true);
            $('#country_overview_mapping').attr('title', 'do not have permission to view bank AC !!!');
            table.button(5).action(function () {
                this.active(false);
            });
        }
  
       

    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(AddressBookdtlObject);
        AddressBookdtlObject._vieweperm = MainObject.do_IsActionMenuPermission(AddressBookdtlObject.access, 'ADDRESS DETAILS', 'view');
        AddressBookdtlObject._createperm = MainObject.do_IsActionMenuPermission(AddressBookdtlObject.access, 'ADDRESS DETAILS', 'create');
        AddressBookdtlObject._editperm = MainObject.do_IsActionMenuPermission(AddressBookdtlObject.access, 'ADDRESS DETAILS', 'edit');
        AddressBookdtlObject._deleteperm = MainObject.do_IsActionMenuPermission(AddressBookdtlObject.access, 'ADDRESS DETAILS', 'delete');
        AddressBookdtlObject._wizard = MainObject.do_IsActionMenuPermission(AddressBookdtlObject.access, 'CREATE BY WIZARD', 'view');
        AddressBookdtlObject._statecitymapping = MainObject.do_IsActionMenuPermission(AddressBookdtlObject.access, 'OPEN STATE CITY MAPPING', 'view');
        AddressBookdtlObject._statecitymappingid = MainObject.do_IsActionMenuPermission(AddressBookdtlObject.access, 'OPEN STATE CITY MAPPING', 'menuid');
        
        
    },
    do_populateStateCode: () => {
        $.ajax({
            url: apiurl + 'api/StateCityByCountry',
            type: 'POST',
            data: {
                CountryCd: localStorage.AddressDetailCountryCode, ctype: 'STATE'
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objCountry = response;

                var _html = [];
                _html.push("<option value='0'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].ocode + "'>" + response[i].oname + "</option>"
                    );
                }
                console.log(_html);
                $("#ddState").html(_html.join(""));
                $("#ddWizardState").html(_html.join(""));
                $("#ddWizardRemoveState").html(_html.join(""));
                AddressBookdtlObject.do_populateCityCode();
                
            },
            error: function () {
                alert("error in data fetch");
            }
        });
    },
    do_populateCityCode: () => {
        $.ajax({
            url: apiurl + 'api/StateCityByCountry',
            type: 'POST',
            data: {
                CountryCd: localStorage.AddressDetailCountryCode, ctype: 'CITY'
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objCountry = response;

                var _html = [];
                _html.push("<option value='0'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].ocode + "'>" + response[i].oname + "</option>"
                    );
                }
                console.log(_html);
                $("#ddCity").html(_html.join(""));
                $("#ddWizardCity").html(_html.join(""));
                $("#ddWizardRemoveCity").html(_html.join(""));
                AddressBookdtlObject.do_loaddata();

            },
            error: function () {
                alert("error in data fetch");
            }
        });
    },
    do_loaddataedit: (id) => {
        
        $.ajax({
            url: apiurl + 'api/AdministratorAddressBookDetailInsert',
            type: 'POST',
            data: { p_mode: "edit", AddressMainId: localStorage.addressoverviewrowid, StateId: $("#ddState").val().trim(), CityId: $("#ddCity").val().trim(), PostCode: $("#txtPostCode").val().trim(), PostDescrip: $("#txtPostDesc").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId: id },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                
                AddressBookdtlObject.rowid = response[0].RowId; 
                $('#txtPostCode').val(response[0].PostCode);
                $('#txtPostDesc').val(response[0].PostDescrip);
                $('#ddState').val(response[0].StateCd);
                $('#ddCity').val(response[0].CityCd);
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

    if ($('#txtPostCode').val().length <1) {
        validate = false;
        $.alertable.alert(`Postal Code required.`);
        $("#txtPostCode").focus();
        return false;
    }
    else if ($('#txtPostDesc').val().length <1) {
        validate = false;
        $.alertable.alert(`Postal Description required.`);
        $("#txtPostDesc").focus();
        return false;
    }
    else if($("#ddState").val() < 1){
        validate = false;
        $.alertable.alert(`County / State required.`);
        $("#ddState").focus();
        return false;
    }
    else if ($("#ddCity").val() < 1) {
        validate = false;
        $.alertable.alert(`City required.`);
        $("#ddCity").focus();
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
        
        if (parseInt(AddressBookdtlObject.rowid) > 0) {
            $.ajax({
                url: apiurl + 'api/AdministratorAddressBookDetailInsert',
                type: 'POST',
                data: { p_mode: "update", AddressMainId: localStorage.addressoverviewrowid, StateId: $("#ddState").val().trim(), CityId: $("#ddCity").val().trim(), PostCode: $("#txtPostCode").val().trim(), PostDescrip: $("#txtPostDesc").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId: parseInt(AddressBookdtlObject.rowid) },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].CountryCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "address-details.aspx";
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
           
            $.ajax({
                
                url: apiurl + 'api/AdministratorAddressBookDetailInsert',
                type: 'POST',
                //data: { p_mode: "create", AddressCode: $("#txtCode").val().trim(), AddressName: $("#txtName").val().trim(), CountryCd: $("#ddCountry").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId: "-1" },
                data: { p_mode: "create", AddressMainId: localStorage.addressoverviewrowid, StateId: $("#ddState").val().trim(), CityId: $("#ddCity").val().trim(), PostCode: $("#txtPostCode").val().trim(), PostDescrip: $("#txtPostDesc").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId: "-1" },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].CountryCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data addes successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "address-details.aspx";
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
       

        
    }

};
var savedataBulk = function () {
    //var validate = true;
    //
    
    var sbulktype = $('#selectMe').val();
    if (sbulktype == "1") {
        if ($('#txtStart').val().length < 1) {
            //validate = false;
            $.alertable.alert(`Post Code Starting from required.`);
            $("#txtStart").focus();
            return false;
        }
        else if ($('#txtStartEnd').val().length < 1) {
            validate = false;
            $.alertable.alert(`Post Code Ending on required.`);
            $("#txtStartEnd").focus();
            return false;
        }
        else if ($("#ddWizardState").val() < 1) {
            validate = false;
            $.alertable.alert(`County / State required.`);
            $("#ddWizardState").focus();
            return false;
        }
        else if ($("#ddWizardCity").val() < 1) {
            validate = false;
            $.alertable.alert(`City required.`);
            $("#ddWizardCity").focus();
            return false;
        }
        else {
            $.ajax({

                url: apiurl + 'api/AdministratorAddressBookDetailBulk',
                type: 'POST',
                //data: { p_mode: "create", AddressCode: $("#txtCode").val().trim(), AddressName: $("#txtName").val().trim(), CountryCd: $("#ddCountry").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId: "-1" },
                data: { p_mode: "create", AddressMainId: localStorage.addressoverviewrowid, StateId: $("#ddWizardState").val().trim(), CityId: $("#ddWizardCity").val().trim(), PostCodeFrom: $("#txtStart").val().trim(), PostCodeTo: $("#txtStartEnd").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId: "-1" },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].CountryCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data addes successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "address-details.aspx";
                        });
                    }
                    else {
                        validate = false;
                        //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                        $.alertable.alert(
                            response[0].msg
                        );
                        //$("#txtCode").focus();
                        validate = false;
                        return false;
                    }

                },
                error: function () {
                    alert("error in data insert");
                }
            });
        }
    }

    if (sbulktype == "2") {
        if ($('#txtRemoveStart').val().length < 1) {
            validate = false;
            $.alertable.alert(`Post Code Starting from required.`);
            $("#txtRemoveStart").focus();
            return false;
        }
        else if ($('#txtRemoveEnd').val().length < 1) {
            validate = false;
            $.alertable.alert(` Post Code Ending on required.`);
            $("#txtRemoveEnd").focus();
            return false;
        }
        else if ($("#ddWizardRemoveState").val() < 1) {
            validate = false;
            $.alertable.alert(`County / State required.`);
            $("#ddWizardRemoveState").focus();
            return false;
        }
        else if ($("#ddWizardRemoveCity").val() < 1) {
            validate = false;
            $.alertable.alert(`City required.`);
            $("#ddWizardRemoveCity").focus();
            return false;
        }
        else {
            $.ajax({

                url: apiurl + 'api/AdministratorAddressBookDetailBulk',
                type: 'POST',
                //data: { p_mode: "create", AddressCode: $("#txtCode").val().trim(), AddressName: $("#txtName").val().trim(), CountryCd: $("#ddCountry").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId: "-1" },
                data: { p_mode: "remov", AddressMainId: localStorage.addressoverviewrowid, StateId: $("#ddWizardRemoveState").val().trim(), CityId: $("#ddWizardRemoveCity").val().trim(), PostCodeFrom: $("#txtRemoveStart").val().trim(), PostCodeTo: $("#txtRemoveEnd").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId: "-1" },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].CountryCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data removed successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "address-details.aspx";
                        });
                    }
                    else {
                        validate = false;
                        //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                        $.alertable.alert(
                            response[0].msg
                        );
                        //$("#txtCode").focus();
                        validate = false;
                        return false;
                    }

                },
                error: function () {
                    alert("error in data remove");
                }
            });
        }
    }

   
    

};
var showmodal = function () {
    //alert("111");
    $('.modal-title').html('Add New Country');

    AddressBookdtlObject.rowId = '-1';
    $('#txtCode').val('');
    $('#txtName').val('');
};
var showmodalwizard = function () {
    $("#myModalWIZARD").modal('show');
};
var otherWindow = function (countryCd, mode) {
    
    if (countryCd == "" || countryCd == undefined || countryCd == "undefined") return;
    localStorage.addressoverviewrowid = countryCd;
    if (mode == "mapping") {
        if (localStorage.AddressDetailCountryCode) {
            localStorage.StateOverviewStateCd = localStorage.AddressDetailCountryCode;
            localStorage.clickedmenu_id = AddressBookdtlObject._statecitymappingid[1];
            //localStorage.menu_id_premission = AddressBookmainObject._statecitymappingid[1]; 
            location.href = 'state-city-mapping.aspx?id=' + localStorage.StateOverviewStateCd;
        }
        
    }
    
    
    if (localStorage.StateOverviewStateCd) {
        if (mode == "addressdtl") {
            localStorage.clickedmenu_id = AddressBookdtlObject._statecitymappingid[1];
            localStorage.StateOverviewStateCd = countryCd;
            window.open("address-details.aspx");
        }
        
    }
    
}

var roleaction = function (rowId, mode) {
    
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    $('#txtCode').prop("disabled", false);
    $('#txtCode').prop("disabled", false);
    if (mode == 'add') {
        showmodal();
        $('.modal-title').html('Add New Address Book Details');

        AddressBookdtlObject.rowId = '-1';
        $('#btnSave').text('Add');
        $('#btnSave').show();
        //$('.readOnly').attr("disabled", false);
        $('#txtPostCode').val('');
        $('#txtPostDesc').val('');
        $('#ddCity').val('0');
        $('#ddState').val('0');
    }
    if (mode == 'edit') {
        showmodal();
        $('.modal-title').html('Address Book Details - Edit');
        $('#cbBlock').show();
       
        if (!AddressBookdtlObject._deleteperm[0]) {
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

        AddressBookdtlObject.rowid = rowId;
        AddressBookdtlObject.do_loaddataedit(rowId);
        
    }
    else if(mode == 'view') {
        showmodal();
        $('.modal-title').html('Address Book Overview - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!AddressBookdtlObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!AddressBookdtlObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        AddressBookdtlObject.rowid = rowId;
        AddressBookdtlObject.do_loaddataedit(rowId);
    }
    
    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    $.ajax({
                        url: apiurl + 'api/AdministratorAddressBookDetailInsert',
                        type: 'POST',
                        data: { p_mode: "remov", RowId: rowId },
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            $.alertable.alert(`Data removed successfully.`, ``, `Ok`, ``).then(function () {
                                window.location = "address-details.aspx";
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

function getCountryName() {
    try {
        var cCode = $('#ddCountry').val();
        var s = getObjectByValue(objCountry, "ocode", cCode);
        $('#txtCountry').val(s[0].oname);
        
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



