var ipaddress = "";
var CoCd = '';
var objItem;
var deflocationid = -1;
var payrollcalendarsetuprowid = -1;
$(document).ready(function () {

    CoCd = $("#ddlCompany").val();
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ipaddress = e.ip;
    });
    payrollcalendarsetuprowid = localStorage.payrollcalendarsetuprowid;
    createCalendarObject.do_fetchcalendarsetupvalue();
    createCalendarObject.do_getUserPagepermission();
}
);
var createCalendarObject = {
    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _createworkingtimeperm: false,
    _createworkingtimemenuperm: false,
    do_fetchcalendarsetupvalue: () => {

        $.ajax({
            url: apiurl + 'api/GetPayrollCalendarSetupCodeDesc',
            type: 'POST',
            data: { payrollcalendarsetuprowid: payrollcalendarsetuprowid },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {


                console.log(response[0].CalendarCd);
                $('#spcalendarcode').text(response[0].CalendarCd);
                $('#spcalendarcodedesc').text(response[0].CalendarDesc);

                //var _html = [];
                //_html.push("<option value='-1'>--Select--</option>")
                //for (var i = 0; i < response.length; i++) {
                //    _html.push(
                //        "<option value='" + response[i].RowId + "'>" + response[i].WTDesc + "</option>"
                //    );
                //}
                //$("#slWTS").html(_html.join(""));


                createCalendarObject.do_loaddata(-1, 'getlist');



            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    },
    //################################## Load Data for the first time ###############################
    do_loaddata: (id, mode) => {
        //alert(111);
        var isBlock = 0
        var created_by, creater_MAC_add, CoCd;
        var startdate, enddate;
        //alert('11')
        startdate = $("#startdate").val();
        enddate = $("#enddate").val();

        creater_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();

       


        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            //alert(mode);
            $.ajax({
                url: apiurl + 'api/PayrollCreateCalendar',
                type: 'POST',
                data: { p_mode: mode, RowId: id, CalendarId: payrollcalendarsetuprowid, CoCd: CoCd, StartDate: startdate, EndDate: enddate, IsBlock: isBlock, created_by: created_by, creater_MAC_add: creater_MAC_add },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    console.log('IIII');
                    console.log(response);
                    var obj = response;

                    if (mode == 'getlist') {

                        createCalendarObject.do_populatecalendarcreatepdata(obj);
                    }
                    if (mode == 'edit') {
                        createCalendarObject.do_populateDataForEdit(obj);
                    }
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });


    },
    do_populatecalendarcreatepdata: (obj) => {
        // editor init

        var editor = new $.fn.dataTable.Editor({
            table: "#item_table",
            fields: [
                { label: "StartDate", name: "StartDate" },
                { label: "EndDate", name: "EndDate" }

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
                { data: "StartDate" },
                { data: "EndDate" }
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
                , {
                    add: "calendar", text: 'Create Working Calendar', editor: editor, action: function () { otherWindow($('.selected').attr('rowid'), 'createWorkingCalendar'); },
                    attr: {
                        title: 'Create Working Calendar',
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

                if (!createCalendarObject._deleteperm[0]) {
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


        if (!createCalendarObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!createCalendarObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }

        if (!createCalendarObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }

        if (!createCalendarObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view calendar setup!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }

        if (!createCalendarObject._createcalendarperm[0]) {
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
        MainObject.do_getuserpageaccess(createCalendarObject);

        createCalendarObject._vieweperm = MainObject.do_IsActionMenuPermission(createCalendarObject.access, 'CREATE CALENDAR', 'view');
        createCalendarObject._createperm = MainObject.do_IsActionMenuPermission(createCalendarObject.access, 'CREATE CALENDAR', 'create');
        createCalendarObject._editperm = MainObject.do_IsActionMenuPermission(createCalendarObject.access, 'CREATE CALENDAR', 'edit');
        createCalendarObject._deleteperm = MainObject.do_IsActionMenuPermission(createCalendarObject.access, 'CREATE CALENDAR', 'delete');



        createCalendarObject._createworkingtimeperm = MainObject.do_IsActionMenuPermission(createCalendarObject.access, 'CREATE WORKING CALENDAR', 'view');
        createCalendarObject._createworkingtimemenuperm = MainObject.do_IsActionMenuPermission(createCalendarObject.access, 'CREATE WORKING CALENDAR', 'menuid');

    },
   do_loaddataedit: (id) => {


        console.log(id);
        //console.log(obj);
        createCalendarObject.do_loaddata(id, 'edit');
    }
    , do_populateDataForEdit: (obj) => {

        console.log(obj);
        createCalendarObject.rowid = obj[0].RowId;
        $('#startdate').val(obj[0].StartDate);
        $('#enddate').val(obj[0].EndDate);
        
        showmodal();
    }

}
//################################################ Roleaction ##########################################
var roleaction = function (rowId, mode) {
    console.log(rowId);
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);

    
    if (mode == 'add') {
        companylogo = "";
        createCalendarObject.rowid = '-1';
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
        if (!createCalendarObject._deleteperm[0]) {
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
        $('#btnSave').prop("disabled", false);
        createCalendarObject.rowid = rowId;
        createCalendarObject.do_loaddataedit(rowId);

    }
    else if (mode == 'view') {
        //showmodal();
        datablank();
        $('.modal-title').html('Calendar Setup - View');
        $('#cbBlock').show();
        // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!createCalendarObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete!!!');
        } else { $('#country_overview_delete').show(); }
        if (!createCalendarObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();

        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        createCalendarObject.rowid = rowId;
        createCalendarObject.do_loaddataedit(rowId);
    }

    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    var isBlock = 1;
                    var created_by, creater_MAC_add, CoCd;
                    var startdate = '', enddate = '';


                    creater_MAC_add = ipaddress;
                    created_by = $("#txt").val();
                    CoCd = $("#ddlCompany").val();




                    _data = '{rowid:"' + rowId + '"}';
                    $.ajax({
                        url: apiurl + 'api/PayrollCreateCalendar',
                        type: 'POST',
                        data: { p_mode: mode, RowId: rowId, CalendarId: payrollcalendarsetuprowid, CoCd: CoCd, StartDate: startdate, EndDate: enddate, IsBlock: isBlock, created_by: created_by, creater_MAC_add: creater_MAC_add },

                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            if (response[0].msg == "true") {
                                validate = true;
                                $.alertable.alert(`Data deleted successfully.`, ``, `Ok`, ``).then(function () {
                                    if (queryString('id') != undefined || queryString("id") != null) {
                                        window.location = "create-calendar-overview.aspx?id=" + queryString('id');
                                    }
                                    else {
                                        window.location = "create-calendar-overview.aspx";
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
var otherWindow = function (payrollcreatecalendarrowid, mode) {
    if (payrollcreatecalendarrowid == "" || payrollcreatecalendarrowid == undefined || payrollcreatecalendarrowid == "undefined") return;
    localStorage.payrollcreatecalendarrowid = payrollcreatecalendarrowid;
    if (localStorage.payrollcreatecalendarrowid && mode == 'createWorkingCalendar') {
        location.href = 'working-time-calendar.aspx';
    }
}
var datablank = () => {
    $("#startdate").val('');
    $("#enddate").val('');
    
}
//#####################################
function saveFinal(imgId) {
    var isBlock = 0
    var created_by, creater_MAC_add, CoCd;
    var startdate, enddate;


    creater_MAC_add = ipaddress;
    created_by = $("#txt").val();
    CoCd = $("#ddlCompany").val();


    startdate = $("#startdate").val();
    enddate = $("#enddate").val();
    console.log('startdate');
    console.log(startdate);



    if (parseInt(createCalendarObject.rowid) > 0) {
        $.ajax({

            url: apiurl + 'api/PayrollCreateCalendar',
            type: 'POST',
            //data: { p_mode: "update", RowId: parseInt(createCalendarObject.rowid), calendarcode: calendarcode, CoCd: CoCd, calendardesc: calendardesc, wts: wts, IsBlock: isBlock, created_by: created_by, creater_MAC_add: creater_MAC_add },
            data: { p_mode: "update", RowId: createCalendarObject.rowid, CalendarId: payrollcalendarsetuprowid, CoCd: CoCd, StartDate: startdate, EndDate: enddate, IsBlock: isBlock, created_by: created_by, creater_MAC_add: creater_MAC_add },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);


                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        if (queryString('id') != undefined || queryString("id") != null) {
                            window.location = "create-calendar-overview.aspx?id=" + queryString('id');
                        }
                        else {
                            window.location = "create-calendar-overview.aspx";
                        }

                    });
                }
                else {
                    validate = false;
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $('#btnSave').prop("disabled", false);
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
        console.log(payrollcalendarsetuprowid);
        $.ajax({
            url: apiurl + 'api/PayrollCreateCalendar',
            type: 'POST',
            data: { p_mode: 'create', RowId: -1, CalendarId: payrollcalendarsetuprowid, CoCd: CoCd, StartDate: startdate, EndDate: enddate, IsBlock: isBlock, created_by: created_by, creater_MAC_add: creater_MAC_add },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);
                console.log(response);
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                        if (queryString('id') != undefined || queryString("id") != null) {
                            window.location = "create-calendar-overview.aspx?id=" + queryString('id');
                        }
                        else {
                            window.location = "create-calendar-overview.aspx";
                        }
                    });
                }
                else {
                    validate = false;
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $('#btnSave').prop("disabled", false);
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
    var startdate, enddate;
    startdate = $("#startdate").val();
    enddate = $("#enddate").val();
    var validate = true;
    if (startdate.trim() == '') {
        validate = false;
        $.alertable.alert('Start date required.');
        $("#startdate").focus();
        return false;

    }
    if (enddate.trim() == '') {
        validate = false;
        $.alertable.alert('End date required.');
        $("#enddate").focus();
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

//#################################### end of save data