var ipaddress = "";
$(document).ready(function () {
    var cuserid = '<%=Session["userid"].ToString() %>';
      
    //localStorage.menu_id_premission = 326;
    if (localStorage.StateCityOverviewmenuid == '' || localStorage.StateCityOverviewmenuid == undefined) {
        localStorage.StateCityOverviewmenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage.StateCityOverviewmenuid;
    }
    
    $("#hid").html("Country : " + localStorage.StateOverviewCountryName + "(" + localStorage.StateOverviewStateCd + ")");
    
    $("#myModal").modal({
        show: false,
        backdrop: 'static'
    });

    $("#click-me").click(function () {
        $("#myModal").modal("show");
    });

    localStorage.menu_id_premission;
    StateCityOverviewObject.do_loadState();
    StateCityOverviewObject.do_populateCity();
    StateCityOverviewObject.do_populateState();
    StateCityOverviewObject.do_getUserPagepermission();
 


    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var StateCityOverviewObject = {

    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    do_loadState: () => {
       
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            $.ajax({
                url: apiurl + 'api/AdministratorStateCityMappingFetch',
                type: 'POST',
                data: {
                    p_mode: "getlist", RowId: "-1", CountryCd: localStorage.StateOverviewStateCd, StateId: '', CityId: '', created_by: $("#txt").val().trim(), creator_MAC_add: ""
                },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                   
                    var obj = response;
                    StateCityOverviewObject.do_populateStateData(obj);
                },
                error: function () {
                    alert("error in data fetch");
                }
            }); 
       

    },
    do_populateStateData: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#statecity",
            fields: [
               
                { label: "CountryCd", name: "CountryCd" },
                { label: "StateId", name: "StateId" },
                { label: "CityId", name: "CityId" }
            ],
        });

        var roletable = $("#statecity");
       
        var roledata = [];
        roledata = obj;
        


        roletable.dataTable({
            dom: "lBfrtip",
            fixedHeader: true,
            data: roledata,
            columns: [
             
                { data: "CountryCd" },
                { data: "StateId" },
                { data: "CityId" }
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

        var table = $('#statecity').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
               
                if (!StateCityOverviewObject._deleteperm[0]) {
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


        if (!StateCityOverviewObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!StateCityOverviewObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }

        if (!StateCityOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
        if (!StateCityOverviewObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view bank AC !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
      

    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(StateCityOverviewObject);
        StateCityOverviewObject._vieweperm = MainObject.do_IsActionMenuPermission(StateCityOverviewObject.access, 'COUNTY/STATE & CITY/DISTRICT MAPPING', 'view');
        StateCityOverviewObject._createperm = MainObject.do_IsActionMenuPermission(StateCityOverviewObject.access, 'COUNTY/STATE & CITY/DISTRICT MAPPING', 'create');
        StateCityOverviewObject._editperm = MainObject.do_IsActionMenuPermission(StateCityOverviewObject.access, 'COUNTY/STATE & CITY/DISTRICT MAPPING', 'edit');
        StateCityOverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(StateCityOverviewObject.access, 'COUNTY/STATE & CITY/DISTRICT MAPPING', 'delete');
    },

    do_loaddataedit: (id) => {
      
        $.ajax({
            url: apiurl + 'api/AdministratorStateCityMappingInsert',
            type: 'POST',
            data: {
                p_mode: "edit", CountryCd: localStorage.StateOverviewStateCd, StateId: -1, CityId: -1, created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId: id
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                
                StateCityOverviewObject.rowid = response[0].RowId; 
                $('#ddState').val(response[0].StateId);
                $('#ddCity').val(response[0].CityId);
            },
            error: function () {
                alert("error in data fetch");
            }
        }); 

       
    },
    do_populateCity: () => {
        $.ajax({
            url: apiurl + 'api/StateCityByCountry',
            type: 'POST',
            data: {
                CountryCd: localStorage.StateOverviewStateCd, ctype: 'CITY'
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                var _html = [];
                _html.push("<option value='0'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    
                   
                    _html.push(
                        "<option value='" + response[i].ocode + "'>" + response[i].oname + "</option>"
                    );
                }
                console.log(_html);
                $("#ddCity").html(_html.join(""));
                
            },
            error: function () {
                alert("error in data fetch");
            }
        }); 
    },
    do_populateState: () => {
        $.ajax({
            url: apiurl + 'api/StateCityByCountry',
            type: 'POST',
            data: {
                CountryCd: localStorage.StateOverviewStateCd, ctype: 'STATE'
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                var _html = [];
                _html.push("<option value='0'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].ocode + "'>" + response[i].oname +  "</option>"
                    );
                }
                $("#ddState").html(_html.join(""));

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

    if ($('#ddState').val()<1) {
        validate = false;
        $.alertable.alert(`Please select County/State.`);
        $("#txtCode").focus();
        return false;
    }
    else if ($('#ddCity').val()<1) {
        validate = false;
        $.alertable.alert(`Please select City/District.`);
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
       
        if (parseInt(StateCityOverviewObject.rowid) > 0) {
            $.ajax({
                url: apiurl + 'api/AdministratorStateCityMappingInsert',
                type: 'POST',
                data: {
                    p_mode: "update", CountryCd: localStorage.StateOverviewStateCd, StateId: $("#ddState").val().trim(), CityId: $("#ddCity").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId: parseInt(StateCityOverviewObject.rowid)
                },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].StateCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "state-city-mapping.aspx";
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
            console.log($("#txt").val().trim());
            $.ajax({
                url: apiurl + 'api/AdministratorStateCityMappingInsert',
                type: 'POST',
                data: {
                    p_mode: "create", CountryCd: localStorage.StateOverviewStateCd, StateId: $("#ddState").val().trim(), CityId: $("#ddCity").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId : -1
                },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].StateCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data addes successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "state-city-mapping.aspx";
                        });
                    }
                    else {
                        validate = false;
                        //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                        $.alertable.alert(
                            response[0].msg
                        );
                        $("#ddState").focus();
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
    $('.modal-title').html('Add New Data');

    StateCityOverviewObject.rowId = '-1';
  
};



var roleaction = function (rowId, mode) {
   
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
   
    
    $("#txtCode").val(localStorage.StateOverviewStateCd);
    $('#txtCode').prop("disabled", true);
    if (mode == 'add') {
        StateCityOverviewObject.rowid = '-1';
        $("#ddCity").val(0);
        $("#ddState").val(0);
        $('#btnSave').show();
        showmodal();
        $('.modal-title').html('Add New Data');

        
        
    }
    if (mode == 'edit') {
        showmodal();
        $('.modal-title').html('Data - Edit');
        $('#cbBlock').show();
       
        if (!StateCityOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
        } else { $('#country_overview_delete').show(); }
        
        $('#lbBlock').show();
        $('#btnEdit').hide();

        $('#btnSave').show();
        $('.readOnly').attr("disabled", false);

        $('#txtCode').prop("disabled", true);

        StateCityOverviewObject.rowid = rowId;
        StateCityOverviewObject.do_loaddataedit(rowId);
        
    }
    else if(mode == 'view') {
        showmodal();
        $('.modal-title').html('Data - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!StateCityOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!StateCityOverviewObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);



        StateCityOverviewObject.rowid = rowId;
        StateCityOverviewObject.do_loaddataedit(rowId);
    }
    
    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    
                    $.ajax({
                        url: apiurl + 'api/AdministratorStateCityMappingInsert',
                        type: 'POST',
                        data: {
                            p_mode: "remov", CountryCd: localStorage.StateOverviewStateCd, StateId: -1, CityId: -1, created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId: rowId
                        },
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            $.alertable.alert(`Data removed successfully.`, ``, `Ok`, ``).then(function () {
                                window.location = "state-city-mapping.aspx";
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



