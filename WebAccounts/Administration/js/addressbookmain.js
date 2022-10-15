var ipaddress = "";
var objCountry;
$(document).ready(function () {
    var cuserid = '<%=Session["userid"].ToString() %>';
      
    //localStorage.menu_id_premission = 326;
    if (localStorage.AddressbookMainmenuid == '' || localStorage.AddressbookMainmenuid == undefined) {
        localStorage.AddressbookMainmenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage.AddressbookMainmenuid;
    }

    $("#myModal").modal({
        show: false,
        backdrop: 'static'
    });

    $("#click-me").click(function () {
        $("#myModal").modal("show");
    });

    localStorage.menu_id_premission;
    AddressBookmainObject.do_populateCountryCode();
    AddressBookmainObject.do_loadCountry();
    AddressBookmainObject.do_getUserPagepermission();
 


    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var AddressBookmainObject = {

    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _addressdetailsmenuid : '',
    do_loadCountry: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            $.ajax({
                url: apiurl + 'api/AdministratorAddressBookMainFetch',
                type: 'POST',
                data: { p_mode: "getlist", AddressCode:"", AddressName: "", CountryCd: "", created_by: "", creator_MAC_add: "", RowId: "-1"  },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].AddressCode);
                    //alert(response[0].AddressName);
                    //alert(response[0].CountryCd);
                    //alert(response[0].CountryName);
                    var obj = response;
                    AddressBookmainObject.do_populateCountryData(obj);
                },
                error: function () {
                    alert("error in data fetch");
                }
            }); 
       

    },
    do_populateCountryData: (obj) => {
        // editor init
        
        var editor = new $.fn.dataTable.Editor({
            table: "#addressbook",
            fields: [
                { label: "AddressCode", name: "AddressCode" },
                { label: "AddressName", name: "AddressName" },
                { label: "CountryCd", name: "CountryCd" },
                { label: "CountryName", name: "CountryName" }
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
                { data: "AddressCode" },
                { data: "AddressName" },
                { data: "CountryCd" },
                { data: "CountryName" }
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
                   
                    add: "AddressDetails", text: 'Address Details', action: function () { otherWindow($('.selected').attr('rowid'), 'addressdtl'); },
                    attr: {
                        title: 'Address Details',
                        id: 'addressdtl',
                        value: AddressBookmainObject._addressdetailsmenuid[1]
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
               
                if (!AddressBookmainObject._deleteperm[0]) {
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


        if (!AddressBookmainObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!AddressBookmainObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        
        if (!AddressBookmainObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
     
        if (!AddressBookmainObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view bank AC !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
       
        if (!AddressBookmainObject._uploadcountry[0]) {
            $('#addressdtl').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#addressdtl').prop("disabled", true);
            $('#addressdtl').attr('title', 'do not have permission to view bank AC !!!');
            table.button(4).action(function () {
                this.active(false);
            });
        }
       

    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(AddressBookmainObject);
        AddressBookmainObject._vieweperm = MainObject.do_IsActionMenuPermission(AddressBookmainObject.access, 'ADDRESS BOOK', 'view');
        AddressBookmainObject._createperm = MainObject.do_IsActionMenuPermission(AddressBookmainObject.access, 'ADDRESS BOOK', 'create');
        AddressBookmainObject._editperm = MainObject.do_IsActionMenuPermission(AddressBookmainObject.access, 'ADDRESS BOOK', 'edit');
        AddressBookmainObject._deleteperm = MainObject.do_IsActionMenuPermission(AddressBookmainObject.access, 'ADDRESS BOOK', 'delete');

        AddressBookmainObject._uploadcountry = MainObject.do_IsActionMenuPermission(AddressBookmainObject.access, 'ADDRESS DETAILS', 'view');

        AddressBookmainObject._addressdetailsmenuid = MainObject.do_IsActionMenuPermission(AddressBookmainObject.access, 'ADDRESS DETAILS', 'menuid');
        
        
    },
    do_populateCountryCode: () => {
        $.ajax({
            url: apiurl + 'api/StateCityByCountry',
            type: 'POST',
            data: {
                CountryCd: localStorage.StateOverviewStateCd, ctype: 'COUNTRY'
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objCountry = response;

                var _html = [];
                _html.push("<option value='0'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].ocode + "'>" + response[i].ocode + "</option>"
                    );
                }
                console.log(_html);
                $("#ddCountry").html(_html.join(""));

            },
            error: function () {
                alert("error in data fetch");
            }
        });
    },
    do_loaddataedit: (id) => {
      
        $.ajax({
            url: apiurl + 'api/AdministratorAddressBookMainFetch',
            type: 'POST',
            data: { p_mode: "edit", RowId: id },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                
                AddressBookmainObject.rowid = response[0].RowId; 
                $('#txtCode').val(response[0].AddressCode);
                $('#txtName').val(response[0].AddressName);
                $('#ddCountry').val(response[0].CountryCd);
                $('#txtCountry').val(response[0].CountryName);
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
        $.alertable.alert(`Address Code required.`);
        $("#txtCode").focus();
        return false;
    }
    else if ($('#txtName').val().length <1) {
        validate = false;
        $.alertable.alert(`Address Name required.`);
        $("#txtName").focus();
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
        
        if (parseInt(AddressBookmainObject.rowid) > 0) {
            $.ajax({
                url: apiurl + 'api/AdministratorAddressBookMainInsert',
                type: 'POST',
                //data: { RowId: parseInt(AddressBookmainObject.rowid), CountryCd: $("#txtCode").val().trim(), CountryName: $("#txtName").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "" },
                data: { p_mode: "update", AddressCode: $("#txtCode").val().trim(), AddressName: $("#txtName").val().trim(), CountryCd: $("#ddCountry").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId: parseInt(AddressBookmainObject.rowid) },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].CountryCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "address-book-overview.aspx";
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
                url: apiurl + 'api/AdministratorAddressBookMainInsert',
                type: 'POST',
                data: { p_mode: "create", AddressCode: $("#txtCode").val().trim(), AddressName: $("#txtName").val().trim(), CountryCd: $("#ddCountry").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId : "-1" },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].CountryCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data addes successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "address-book-overview.aspx";
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


var showmodal = function () {
    //alert("111");
    $('.modal-title').html('Add New Country');

    AddressBookmainObject.rowId = '-1';
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
            localStorage.menu_id_premission = AddressBookmainObject._addressdetailsmenuid[1]; 
            localStorage.clickedmenu_id = AddressBookmainObject._addressdetailsmenuid[1]; 
            //alert(AddressBookmainObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + AddressBookmainObject._addressdetailsmenuid[1];
            location.href = 'address-details.aspx';
            
        }
        
    }
    
}

var roleaction = function (rowId, mode) {
    
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    $('#txtCode').prop("disabled", false);
    $('#txtCode').prop("disabled", false);
    if (mode == 'add') {
        showmodal();
        $('.modal-title').html('Add New Address Book Overview');

        AddressBookmainObject.rowId = '-1';
        $('#btnSave').text('Add');
        $('#btnSave').show();
        //$('.readOnly').attr("disabled", false);
        $('#txtCode').val('');
        $('#txtName').val('');
        $('#ddCountry').val('0');
        $('#txtCountry').val('');
    }
    if (mode == 'edit') {
        showmodal();
        $('.modal-title').html('Address Book Overview - Edit');
        $('#cbBlock').show();
       
        if (!AddressBookmainObject._deleteperm[0]) {
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

        AddressBookmainObject.rowid = rowId;
        AddressBookmainObject.do_loaddataedit(rowId);
        
    }
    else if(mode == 'view') {
        showmodal();
        $('.modal-title').html('Address Book Overview - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!AddressBookmainObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!AddressBookmainObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        AddressBookmainObject.rowid = rowId;
        AddressBookmainObject.do_loaddataedit(rowId);
    }
    
    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    $.ajax({
                        url: apiurl + 'api/AdministratorAddressBookMainFetch',
                        type: 'POST',
                        data: { p_mode: "remov", RowId: rowId },
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            $.alertable.alert(`Data removed successfully.`, ``, `Ok`, ``).then(function () {
                                window.location = "address-book-overview.aspx";
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



