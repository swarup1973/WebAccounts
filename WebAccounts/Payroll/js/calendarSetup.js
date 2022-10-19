var ipaddress = "";
var CoCd = '';
var objItem;
var deflocationid = -1;
$(document).ready(function () {
    
    CoCd = $("#ddlCompany").val();
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ipaddress = e.ip;
    });
    
    calendarSetupObject.do_populatWorkingTimeSetup();
    calendarSetupObject.do_getUserPagepermission();
}
);
var calendarSetupObject = {
    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _createcalendarperm: false,
    _createcalendarmenuperm: false,
    //################################## Load Data for the first time ###############################
    do_loaddata: (id, mode) => {
        var isBlock = 0
        var created_by, creater_MAC_add, CoCd;
        var calendarcode, calendardesc, wts;


        creater_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
        



        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            //alert(mode);
            $.ajax({
                url: apiurl + 'api/PayrollCalendarSetup',
                type: 'POST',
                data: { p_mode: mode, RowId: id, calendarcode: calendarcode, CoCd: CoCd, calendardesc: calendardesc, wts: wts, IsBlock: isBlock, created_by: created_by, creater_MAC_add: creater_MAC_add },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    console.log('IIII');
                    console.log(response);
                    var obj = response;
                  
                    if (mode == 'getlist') {

                        calendarSetupObject.do_populatecalendarsetupdata(obj);
                    }
                    if (mode == 'edit') {
                        calendarSetupObject.do_populateDataForEdit(obj);
                    }
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });


    },
    do_populatecalendarsetupdata: (obj) => {
        // editor init

        var editor = new $.fn.dataTable.Editor({
            table: "#item_table",
            fields: [
                { label: "CalendarCode", name: "CalendarCode" },
                { label: "Description", name: "Description" },
                { label: "WorkingTimeSetup", name: "WorkingTimeSetup" }

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
                { data: "CalendarCd" },
                { data: "CalendarDesc" },
                { data: "WTDesc" }
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
                ,{
                    add: "calendar", text: 'Create Calendar', editor: editor, action: function () { otherWindow($('.selected').attr('rowid'), 'createCalendar'); },
                    attr: {
                        title: 'Create Calendar',
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

                if (!calendarSetupObject._deleteperm[0]) {
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


        if (!calendarSetupObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!calendarSetupObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }

        if (!calendarSetupObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }

        if (!calendarSetupObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view calendar setup!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }

        if (!calendarSetupObject._createcalendarperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to create calendar !!!');
            table.button(4).action(function () {
                this.active(false);
            });
        }


    },
    //############################################ end of load data ################################
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(calendarSetupObject); 

        calendarSetupObject._vieweperm = MainObject.do_IsActionMenuPermission(calendarSetupObject.access, 'CALENDAR SETUP', 'view');
        calendarSetupObject._createperm = MainObject.do_IsActionMenuPermission(calendarSetupObject.access, 'CALENDAR SETUP', 'create');
        calendarSetupObject._editperm = MainObject.do_IsActionMenuPermission(calendarSetupObject.access, 'CALENDAR SETUP', 'edit');
        calendarSetupObject._deleteperm = MainObject.do_IsActionMenuPermission(calendarSetupObject.access, 'CALENDAR SETUP', 'delete');

      

        calendarSetupObject._createcalendarperm = MainObject.do_IsActionMenuPermission(calendarSetupObject.access, 'CREATE CALENDAR', 'view');
        calendarSetupObject._createcalendarmenuperm = MainObject.do_IsActionMenuPermission(calendarSetupObject.access, 'CREATE CALENDAR', 'menuid');

    },
  // Populate working time setup ############################
    do_populatWorkingTimeSetup: () => {
        
        $.ajax({
            url: apiurl + 'api/GetPayrollWorkingTime',
            type: 'POST',
            data: { CoCd: $("#ddlCompany").val() },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                

                objVendor = response;
                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].WTDesc + "</option>"
                    );
                }
                $("#slWTS").html(_html.join(""));
               

                calendarSetupObject.do_loaddata(-1, 'getlist');



            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    }
    //#################### end of populate working time set up ###############
    , do_loaddataedit: (id) => {
     
        
        console.log(id);
        //console.log(obj);
        calendarSetupObject.do_loaddata(id, 'edit');
    }
    , do_populateDataForEdit: (obj) => {
        
        console.log(obj);
        calendarSetupObject.rowid = obj[0].RowId;
        $('#txtcalendarcode').val(obj[0].CalendarCd);
        $('#txtcalendardescription').val(obj[0].CalendarDesc);
        $('#slWTS').val(obj[0].WTId);
        showmodal();
    }

}
//################################################ Roleaction ##########################################
var roleaction = function (rowId, mode) {
    console.log(rowId);
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);

    if (mode == "viewlocation") {
        calendarSetupObject.rowid = rowId;
        showmodalview();

    }
    if (mode == 'add') {
        companylogo = "";
        calendarSetupObject.rowid = '-1';
        showmodal();
        $('.modal-title').html('Calendar Setup - New');

        datablank();
        $('#btnSave').text('Add');
        $('#btnSave').show();

        //$('.readOnly').attr("disabled", false);

        //$('#txtCode').prop("disabled", false);

    }
    if (mode == 'edit') {
        // showmodal();

        $('.modal-title').html('Calendar Setup - Edit');
        //$('#cbBlock').show();
        datablank();
        if (!calendarSetupObject._deleteperm[0]) {
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

        calendarSetupObject.rowid = rowId;
        calendarSetupObject.do_loaddataedit(rowId);

    }
    else if (mode == 'view') {
        //showmodal();
        datablank();
        $('.modal-title').html('Calendar Setup - View');
        $('#cbBlock').show();
        // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!calendarSetupObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete!!!');
        } else { $('#country_overview_delete').show(); }
        if (!calendarSetupObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();

        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        calendarSetupObject.rowid = rowId;
        calendarSetupObject.do_loaddataedit(rowId);
    }

    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    var isBlock = 1;
                    var created_by, creater_MAC_add, CoCd;
                    var calendarcode = '', calendardesc = '', wts = -1;


                    creater_MAC_add = ipaddress;
                    created_by = $("#txt").val();
                    CoCd = $("#ddlCompany").val();




                    _data = '{rowid:"' + rowId + '"}';
                    $.ajax({
                        url: apiurl + 'api/PayrollCalendarSetup',
                        type: 'POST',
                        //data: { p_mode: "remov", RowId: rowId },
                        data: { p_mode: mode, RowId: rowId, calendarcode: calendarcode, CoCd: CoCd, calendardesc: calendardesc, wts: wts, IsBlock: isBlock, created_by: created_by, creater_MAC_add: creater_MAC_add },
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            if (response[0].msg == "true") {
                                validate = true;
                                $.alertable.alert(`Data deleted successfully.`, ``, `Ok`, ``).then(function () {
                                    if (queryString('id') != undefined || queryString("id") != null) {
                                        window.location = "calendar-setup-overview.aspx?id=" + queryString('id');
                                    }
                                    else {
                                        window.location = "calendar-setup-overview.aspx";
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
    else if (mode == 'createcalendar') {

    }

};
//############################################### end of roleaction #################################
var otherWindow = function (calendarsetuprowid, mode) {
    if (calendarsetuprowid == "" || calendarsetuprowid == undefined || calendarsetuprowid == "undefined") return;
    localStorage.payrollcalendarsetuprowid = calendarsetuprowid;
    if (localStorage.payrollcalendarsetuprowid && mode =='createCalendar') {
        location.href = 'create-calendar-overview.aspx';
    }
}
var datablank= () => {
    $("#txtcalendarcode").val('');
    $("#txtcalendardescription").val('');
    $("#slWTS").val('-1');;
}
//#####################################
function saveFinal(imgId) {
    var isBlock = 0
    var created_by, creater_MAC_add, CoCd;
    var calendarcode, calendardesc, wts;


    creater_MAC_add = ipaddress;
    created_by = $("#txt").val();
    CoCd = $("#ddlCompany").val();


    calendarcode = $("#txtcalendarcode").val();
    calendardesc = $("#txtcalendardescription").val();
    wts = $("#slWTS").val();




    if (parseInt(calendarSetupObject.rowid) > 0) {
        $.ajax({

            url: apiurl + 'api/PayrollCalendarSetup',
            type: 'POST',
            data: { p_mode: "update", RowId: parseInt(calendarSetupObject.rowid) ,calendarcode: calendarcode, CoCd: CoCd, calendardesc: calendardesc, wts: wts, IsBlock: isBlock, created_by: created_by, creater_MAC_add: creater_MAC_add},

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);


                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        if (queryString('id') != undefined || queryString("id") != null) {
                            window.location = "calendar-setup-overview.aspx?id=" + queryString('id');
                        }
                        else {
                            window.location = "calendar-setup-overview.aspx";
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
        console.log('calendarcode');
        console.log(calendarcode);
        $.ajax({
            url: apiurl + 'api/PayrollCalendarSetup',
            type: 'POST',
            data: { p_mode: "create", RowId: -1, calendarcode: calendarcode, CoCd: CoCd, calendardesc: calendardesc, wts: wts, IsBlock: isBlock, created_by: created_by, creater_MAC_add: creater_MAC_add },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);
                console.log(response);
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                        if (queryString('id') != undefined || queryString("id") != null) {
                            window.location = "calendar-setup-overview.aspx?id=" + queryString('id');
                        }
                        else {
                            window.location = "calendar-setup-overview.aspx";
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
//###################################

//################################## savedata ##############################
var savedata = () => {
    var calendarcode, calendardesc, wts;
    calendarcode = $("#txtcalendarcode").val();
    calendardesc = $("#txtcalendardescription").val();
    wts = $("#slWTS").val();
    var validate = true;
    if (calendarcode.trim() == '') {
        validate = false;
        $.alertable.alert('Calendar code required.');
        $("#txtcalendarcode").focus();
        return false;

    }
    if (wts.trim() == '-1') {
        validate = false;
        $.alertable.alert('Working time required.');
        $("#wts").focus();
        return false;

    }
    $('#btnSave').prop("disabled", true);
    saveFinal(-1);

}

//#################################### end of save data