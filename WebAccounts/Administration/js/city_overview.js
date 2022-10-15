var ipaddress = "";
$(document).ready(function () {
    var cuserid = '<%=Session["userid"].ToString() %>';
      
    //localStorage.menu_id_premission = 326;
    if (localStorage.CityOverviewmenuid == '' || localStorage.CityOverviewmenuid == undefined) {
        localStorage.CityOverviewmenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage.CityOverviewmenuid;
    }
   
    $("#hid").html("Country : " + localStorage.StateOverviewCountryName + "(" + localStorage.StateOverviewStateCd + ")");
    $("#lblCountry").html(localStorage.StateOverviewCountryName + " (" + localStorage.StateOverviewStateCd + ")");
    $("#myModal").modal({
        show: false,
        backdrop: 'static'
    });

    $("#click-me").click(function () {
        $("#myModal").modal("show");
    });

    localStorage.menu_id_premission;
    CityOverviewObject.do_loadState();
    CityOverviewObject.do_getUserPagepermission();
 


    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var CityOverviewObject = {

    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    do_loadState: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            $.ajax({
                url: apiurl + 'api/AdministratorCityFetch',
                type: 'POST',
                data: {
                    p_mode: "getlist", RowId: "-1", CountryCd: localStorage.StateOverviewStateCd, CityCd: '', CityName: '', created_by: $("#txt").val().trim(), creator_MAC_add: ""
                },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                   
                    var obj = response;
                    CityOverviewObject.do_populateStateData(obj);
                },
                error: function () {
                    alert("error in data fetch");
                }
            }); 
       

    },
    do_populateStateData: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#cityoverview",
            fields: [
               
                { label: "CityCd", name: "CityCd" },
                { label: "CityName", name: "CityName" }
            ],
        });

        var roletable = $("#cityoverview");
       
        var roledata = [];
        roledata = obj;
        


        roletable.dataTable({
            dom: "lBfrtip",
            fixedHeader: true,
            data: roledata,
            columns: [
             
                { data: "CityCd" },
                { data: "CityName"}
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

        var table = $('#cityoverview').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
               
                if (!CityOverviewObject._deleteperm[0]) {
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


        if (!CityOverviewObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!CityOverviewObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }

        if (!CityOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
        if (!CityOverviewObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view bank AC !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
      

    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(CityOverviewObject);
        CityOverviewObject._vieweperm = MainObject.do_IsActionMenuPermission(CityOverviewObject.access, 'CITY/DISTRICT', 'view');
        CityOverviewObject._createperm = MainObject.do_IsActionMenuPermission(CityOverviewObject.access, 'CITY/DISTRICT', 'create');
        CityOverviewObject._editperm = MainObject.do_IsActionMenuPermission(CityOverviewObject.access, 'CITY/DISTRICT', 'edit');
        CityOverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(CityOverviewObject.access, 'CITY/DISTRICT', 'delete');
    },

    do_loaddataedit: (id) => {
      
        $.ajax({
            url: apiurl + 'api/AdministratorCityInsert',
            type: 'POST',
            data: {
                p_mode: "edit", RowId: id, CountryCd: localStorage.StateOverviewStateCd, StateCd: '', StateName: '', created_by: $("#txt").val().trim(), creator_MAC_add: ""
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                
                CityOverviewObject.rowid = response[0].RowId; 
                $('#txtCode').val(response[0].CityCd);
                $('#txtName').val(response[0].CityName);
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
        $.alertable.alert(`City Code required.`);
        $("#txtCode").focus();
        return false;
    }
    else if ($('#txtName').val().length <1) {
        validate = false;
        $.alertable.alert(`City Name required.`);
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
       
        if (parseInt(CityOverviewObject.rowid) > 0) {
            $.ajax({
                url: apiurl + 'api/AdministratorCityInsert',
                type: 'POST',
                data: {
                    p_mode: "update", RowId: parseInt(CityOverviewObject.rowid), CountryCd: localStorage.StateOverviewStateCd, CityCd: $("#txtCode").val().trim(), CityName: $("#txtName").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: ""
                },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].StateCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "city-overview.aspx";
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
                url: apiurl + 'api/AdministratorCityInsert',
                type: 'POST',
                data: {
                    p_mode: "create", CountryCd: localStorage.StateOverviewStateCd, CityCd: $("#txtCode").val().trim(), CityName: $("#txtName").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId : -1
                },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].StateCd);

                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data addes successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "city-overview.aspx";
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
    $('.modal-title').html('Add New City');

    CityOverviewObject.rowId = '-1';
    $('#txtCode').val('');
    $('#txtName').val('');
};



var roleaction = function (rowId, mode) {
   
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    $('#txtCode').prop("disabled", false);
    $('#txtName').prop("disabled", false);
    if (mode == 'add') {
        CityOverviewObject.rowid = '-1';
       
        showmodal();
        $('.modal-title').html('Add New City');

        
        $('#txtCode').val('');
        $('#txtName').val('');
    }
    if (mode == 'edit') {
        showmodal();
        $('.modal-title').html('City - Edit');
        $('#cbBlock').show();
       
        if (!CityOverviewObject._deleteperm[0]) {
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

        CityOverviewObject.rowid = rowId;
        CityOverviewObject.do_loaddataedit(rowId);
        
    }
    else if(mode == 'view') {
        showmodal();
        $('.modal-title').html('City - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!CityOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!CityOverviewObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        $('#txtCode').val('');
        $('#txtName').val('');
        $('#txtCode').prop("disabled", true);
        $('#txtName').prop("disabled", true);

        CityOverviewObject.rowid = rowId;
        CityOverviewObject.do_loaddataedit(rowId);
    }
    
    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    $.ajax({
                        url: apiurl + 'api/AdministratorCityInsert',
                        type: 'POST',
                        data: {
                            p_mode: "remov", CountryCd: localStorage.StateOverviewStateCd, CityCd: $("#txtCode").val().trim(), CityName: $("#txtName").val().trim(), created_by: $("#txt").val().trim(), creator_MAC_add: "", RowId: rowId
                        },
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            $.alertable.alert(`Data removed successfully.`, ``, `Ok`, ``).then(function () {
                                window.location = "city-overview.aspx";
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



