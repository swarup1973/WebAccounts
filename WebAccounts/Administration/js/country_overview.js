var ipaddress = "";
$(document).ready(function () {
    var cuserid = '<%=Session["userid"].ToString() %>';
      
    //localStorage.menu_id_premission = 326;
    if (localStorage.CountryStateCitymenuid == '' || localStorage.CountryStateCitymenuid == undefined) {
        localStorage.CountryStateCitymenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage.CountryStateCitymenuid;
    }

    $("#myModal").modal({
        show: false,
        backdrop: 'static'
    });

    $("#click-me").click(function () {
        $("#myModal").modal("show");
    });

    localStorage.menu_id_premission;
    CountryOverviewObject.do_loadCountry();
    CountryOverviewObject.do_getUserPagepermission();
 


    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var CountryOverviewObject = {

    rowid: '',
    _countrycitystatemapmenuid: '',
    _statemenuid: '',
    _citymenuid : '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    do_loadCountry: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            $.ajax({
                url: apiurl + 'api/GeneralLedgerCountryFetch',
                type: 'POST',
                data: { p_mode: "getlist",RowId : "-1" },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].CountryCd);
                    var obj = response;
                    CountryOverviewObject.do_populateCountryData(obj);
                },
                error: function () {
                    alert("error in data fetch");
                }
            }); 
       

    },
    do_populateCountryData: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#countryoverview",
            fields: [
               
                { label: "CountryCd", name: "CountryCd" },
                { label: "CountryName", name: "CountryName" }
            ],
        });
        var roletable = $("#countryoverview");

        var roledata = [];
        roledata = obj;
        


        roletable.dataTable({
            dom: "lBfrtip",
            fixedHeader: true,
            data: roledata,
            columns: [
             
                { data: "CountryCd" },
                { data: "CountryName"}
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
                    add: "upload", text: 'Upload Country', editor: editor,
                    attr: {
                        title: 'Upload Country',
                        id: 'uploadcountry'
                    }
                    
                },
                {
                    //add: "mapping", text: 'Create County/State & City/District', editor: editor, action: () => window.open("state-city-mapping.aspx")
                    add: "mapping", text: 'County/State & City/District Mapping', action: function () { otherWindow($('.selected').attr('countrycd'), 'statecity'); },
                    attr: {
                        title: 'County/State & City/District Mapping',
                        id: 'country-state-city-mapping'
                    }
                },
                {
                    //add: "state", text: 'County/State', editor: editor, action: () => window.open("state-overview.aspx")
                    add: "state", text: 'County/State', editor: editor, action: function () { otherWindow($('.selected').attr('countrycd'), 'state'); },
                    attr: {
                        title: 'County/State',
                        id: 'state'
                    }
                     //action: function () { roleaction($('.selected').attr('rowid'), 'delete'); }
                },
                {
                    add: "city", text: 'City/District', editor: editor, action: function () { otherWindow($('.selected').attr('countrycd'), 'city'); },
                    attr: {
                        title: 'City/District',
                        id: 'city'
                    }
                }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowid", `${data.RowId}`);
                $(row).attr("CountryCd", `${data.CountryCd}`);
            },
        });

        var table = $('#countryoverview').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
               
                if (!CountryOverviewObject._deleteperm[0]) {
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


        if (!CountryOverviewObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!CountryOverviewObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        
        if (!CountryOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
     
        if (!CountryOverviewObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
        if (!CountryOverviewObject._countrycitystatemap[0]) {
            $('#country-state-city-mapping').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country-state-city-mapping').prop("disabled", true);
            $('#country-state-city-mapping').attr('title', 'do not have permission !!!');
            table.button(5).action(function () {
                this.active(false);
            });
        }
        if (!CountryOverviewObject._state[0]) {
            $('#state').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#state').prop("disabled", true);
            $('#state').attr('title', 'do not have permission !!!');
            table.button(6).action(function () {
                this.active(false);
            });
        }
        if (!CountryOverviewObject._city[0]) {
            $('#city').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#city').prop("disabled", true);
            $('#city').attr('title', 'do not have permission !!!');
            table.button(7).action(function () {
                this.active(false);
            });
        }
        
        if (!CountryOverviewObject._uploadcountry[0]) {
            $('#uploadcountry').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#uploadcountry').prop("disabled", true);
            $('#uploadcountry').attr('title', 'do not have permission !!!');
            table.button(4).action(function () {
                this.active(false);
            });
        }
  
        //if (!BankAccountObject._transaction[0]) {
        //    $('#bankac_Transaction').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        //    $('#bankac_Transaction').prop("disabled", true);
        //    $('#bankac_Transaction').attr('title', 'do not have permission to view Transaction!!!');
        //    table.button(4).action(function () {
        //        this.active(false);
        //    });
        //}
        //if (!BankAccountObject._chequeregister[0]) {
        //    $('#bankac_ChequeRegister').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        //    $('#bankac_ChequeRegister').prop("disabled", true);
        //    $('#bankac_ChequeRegister').attr('title', 'do not have permission to view ChequeRegister !!!');
        //    table.button(5).action(function () {
        //        this.active(false);
        //    });
        //}
        //if (!BankAccountObject._dimension[0]) {
        //    $('#bankac_Dimension').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        //    $('#bankac_Dimension').prop("disabled", true);
        //    $('#bankac_Dimension').attr('title', 'do not have permission to View Dimensiond!!!');
        //    table.button(6).action(function () {
        //        this.active(false);
        //    });
        //}

    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(CountryOverviewObject);
        CountryOverviewObject._vieweperm = MainObject.do_IsActionMenuPermission(CountryOverviewObject.access, 'COUNTRY-STATE-CITY MASTER', 'view');
        CountryOverviewObject._createperm = MainObject.do_IsActionMenuPermission(CountryOverviewObject.access, 'COUNTRY-STATE-CITY MASTER', 'create');
        CountryOverviewObject._editperm = MainObject.do_IsActionMenuPermission(CountryOverviewObject.access, 'COUNTRY-STATE-CITY MASTER', 'edit');
        CountryOverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(CountryOverviewObject.access, 'COUNTRY-STATE-CITY MASTER', 'delete');

        CountryOverviewObject._uploadcountry = MainObject.do_IsActionMenuPermission(CountryOverviewObject.access, 'UPLOAD COUNTRY', 'view');
        
        CountryOverviewObject._countrycitystatemap = MainObject.do_IsActionMenuPermission(CountryOverviewObject.access, 'COUNTY/STATE & CITY/DISTRICT MAPPING', 'view');
        CountryOverviewObject._countrycitystatemapmenuid = MainObject.do_IsActionMenuPermission(CountryOverviewObject.access, 'COUNTY/STATE & CITY/DISTRICT MAPPING', 'menuid');

        CountryOverviewObject._state = MainObject.do_IsActionMenuPermission(CountryOverviewObject.access, 'COUNTY/STATE', 'view');
        CountryOverviewObject._statemenuid = MainObject.do_IsActionMenuPermission(CountryOverviewObject.access, 'COUNTY/STATE', 'menuid');

        CountryOverviewObject._city = MainObject.do_IsActionMenuPermission(CountryOverviewObject.access, 'CITY/DISTRICT', 'view');
        CountryOverviewObject._citymenuid = MainObject.do_IsActionMenuPermission(CountryOverviewObject.access, 'CITY/DISTRICT', 'menuid');
    },

    do_loaddataedit: (id) => {
      
        $.ajax({
            url: apiurl + 'api/GeneralLedgerCountryFetch',
            type: 'POST',
            data: { p_mode: "edit", RowId: id },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                
                CountryOverviewObject.rowid = response[0].RowId; 
                $('#txtCode').val(response[0].CountryCd);
                $('#txtCode').prop("disabled", true);
                $('#txtName').val(response[0].CountryName);
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

    if ($('#txtCode').val().length !=3) {
        validate = false;
        $.alertable.alert(`Country Code required.`);
        $("#txtCode").focus();
        return false;
    }
    else if ($('#txtName').val().length <1) {
        validate = false;
        $.alertable.alert(`Country Name required.`);
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
        
        if (parseInt(CountryOverviewObject.rowid) > 0) {
            $.ajax({
                url: apiurl + 'api/GeneralLedgerCountryUpdate',
                type: 'POST',
                data: { RowId: parseInt(CountryOverviewObject.rowid), CountryCd: $("#txtCode").val().trim(), CountryName: $("#txtName").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "" },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].CountryCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "country-overview.aspx";
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
                url: apiurl + 'api/GeneralLedgerCountryInsert',
                type: 'POST',
                data: { CountryCd: $("#txtCode").val().trim(), CountryName: $("#txtName").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "" },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].CountryCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data addes successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "country-overview.aspx";
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

    CountryOverviewObject.rowId = '-1';
    $('#txtCode').val('');
    $('#txtName').val('');
};

var otherWindow = function (countryCd, mode) {
    
    if (countryCd == "" || countryCd == undefined || countryCd == "undefined") return;
    localStorage.StateOverviewStateCd = countryCd;
    if (localStorage.StateOverviewStateCd) {
        localStorage.StateOverviewCountryName = $('#countryoverview').DataTable().rows('.selected').data()[0].CountryName;
        if (mode == "state") {
            localStorage.StateOverviewStateCd = countryCd;
            //window.open("state-overview.aspx");
            localStorage.clickedmenu_id = CountryOverviewObject._statemenuid[1];
            location.href = 'state-overview.aspx?id=' + countryCd;
        }
        if (mode == "city") {
            localStorage.StateOverviewStateCd = countryCd;
            //window.open("city-overview.aspx");
            localStorage.clickedmenu_id = CountryOverviewObject._citymenuid[1];
            location.href = 'city-overview.aspx?id=' + countryCd;
        }
        if (mode == "statecity") {
            localStorage.StateOverviewStateCd = countryCd;
            localStorage.clickedmenu_id = CountryOverviewObject._countrycitystatemapmenuid[1];
            //window.open("state-city-mapping.aspx");
            location.href = 'state-city-mapping.aspx?id=' + countryCd;
        }
    }
    
}

var roleaction = function (rowId, mode) {
    
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    $('#txtCode').prop("disabled", false);
    if (mode == 'add') {
        showmodal();
        $('.modal-title').html('Add New Country');

        CountryOverviewObject.rowId = '-1';
        $('#btnSave').show();
        //$('.readOnly').attr("disabled", false);
        $('#txtCode').val('');
        $('#txtName').val('');
    }
    if (mode == 'edit') {
        showmodal();
        $('.modal-title').html('Country - Edit');
        $('#cbBlock').show();
       
        if (!CountryOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
        } else { $('#country_overview_delete').show(); }
        
        $('#lbBlock').show();
        $('#btnEdit').hide();

        $('#btnSave').show();
        $('.readOnly').attr("disabled", false);

        CountryOverviewObject.rowid = rowId;
        CountryOverviewObject.do_loaddataedit(rowId);
        
    }
    else if(mode == 'view') {
        showmodal();
        $('.modal-title').html('Country - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!CountryOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!CountryOverviewObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        CountryOverviewObject.rowid = rowId;
        CountryOverviewObject.do_loaddataedit(rowId);
    }
    
    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    $.ajax({
                        url: apiurl + 'api/GeneralLedgerCountryFetch',
                        type: 'POST',
                        data: { p_mode: "remov", RowId: rowId },
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            $.alertable.alert(`Data removed successfully.`, ``, `Ok`, ``).then(function () {
                                window.location = "country-overview.aspx";
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





function ShowIP(response) {
    ipaddress = response.ip;
}



