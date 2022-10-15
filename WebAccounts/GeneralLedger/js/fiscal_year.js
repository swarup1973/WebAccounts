
$(document).ready(function () {
    //FinObject.do_loadfiacalyear();
    FinObject.do_getUserPagepermission();
});

var deleteDates = [];
var FinObject = {
    fiscaldata: [{
        start_date: '',
        actionmode: '',
        userid: '', 
        Name: '',
        row_id: '',
        _createperm: false,
        _editperm: false,
        _deleteperm: false,
        _closefy: false,
    }],

    do_loadfiacalyear: () => {
        $.ajax({
            type: "POST",
            url: "fiscal_year.aspx/do_loadfiacalyear",
            data: JSON.stringify({ CoCd: $("#ddlCompany").val() }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                //var resJson = JSON.parse(rest);
                //rolesloadfromdb = true;
                var obj = JSON.parse(`[${result.d}]`);
                dopopulatefiscaltable(obj);                
            },
            failure: function (response) {
                alert('Problem in retreiving items...');
            }
        });
    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(FinObject);
        //FinObject._createperm = MainObject.do_IsActionMenuPermission(FinObject.access, 'Transaction Period', 'create');
        //FinObject._editperm = MainObject.do_IsActionMenuPermission(FinObject.access, 'Period Lock/Unlock', 'create');
        //FinObject._deleteperm = MainObject.do_IsActionMenuPermission(FinObject.access, 'Delete', 'create');
        //FinObject._closefy = MainObject.do_IsActionMenuPermission(FinObject.access, 'Close Fiscal Year', 'create');

        FinObject._createperm = MainObject.do_IsActionMenuPermission(FinObject.access, 'ACCOUNTING PERIOD', 'create');
        FinObject._editperm = MainObject.do_IsActionMenuPermission(FinObject.access, 'PERIOD LOCK/UNLOCK', 'create');
        FinObject._deleteperm = MainObject.do_IsActionMenuPermission(FinObject.access, 'DELETE', 'create');
        FinObject._closefy = MainObject.do_IsActionMenuPermission(FinObject.access, 'CLOSE PERIOD', 'create');
    },

    do_savefiscalyear: () => {
        dosavefiscalyear();
    },

    do_deletefiscalyear: () => {
        dodeletefiscalyear();
    },
};

const dopopulatefiscaltable = (obj) => {
    //insertEmptyRow();
    var html = "";
    var visstyle = "";
    var htmlRoles = [];
    var htmlDateFormat = [];
    var htmlstartDate = [];
    $('#fiscal_year_table').html('');

    for (var i = 0; i < obj.length; i++) {
        var objnew = obj[i];
        for (var key in objnew) {
            var attrName = key;
            if (attrName.toLowerCase() == "table") {
                htmlRoles = objnew[key];
            }

            if (attrName.toLowerCase() == "table1") {
                htmlDateFormat = objnew[key];
            }

            if (attrName.toLowerCase() == "table2") {
                htmlstartDate = objnew[key];
            }
        }
    }

    FsDateFormat = htmlDateFormat[0].GlobalDateFormat;
    FsDateSeperator = htmlDateFormat[0].DateSeperator;

    //$('#txtstartdate').val(moment(htmlstartDate[0].next_start_date).format('DD/MM/YYYY'));
    var today = moment(htmlstartDate[0].next_start_date).format('YYYY-MM-DD');
    $('#txtstartdate').val(today);
    if ($('#txtstartdate').val() != '') {
        $('#txtstartdate').attr('disable', true);
    }
    
    
    $("#fiscal_year_table").append(
        "<thead><tr>" +        
        "<th>Starting Date</th><th>Period Name</th><th>New Period</th>" +
        "<th>Closed</th><th>Period Locked</th>" +
        "<tbody>"
    );


    $("#fiscal_year_table").append("</tbody>");

    //ashim
    // editor init
    var editor = new $.fn.dataTable.Editor({
        table: "#fiscal_year_table",
        fields: [
            { label: "Starting Date", name: "PeriodStartDt" },
            { label: "Period Name", name: "PeriodName" },
            { label: "New Period", name: "IsFirstYear", type: "checkbox", separator: "|", options: [{ label: '', value: 1 }]},
            { label: "Closed", name: "IsClosed" },
            { label: "Period Locked", name: "IsPeriodLock" }
        ],
    });
    const tableEl = $("#fiscal_year_table");
    // datatables init
    //$('.selected').attr('id')
    //tableEl.DataTable({


    //tableEl.destroy();    
    tableEl.dataTable({
        dom: "Bfrtip",        
        fixedHeader: true,
        data: htmlRoles,
        columns: [
            {
                data: "PeriodStartDt",
                "render": function (data, type, row) {
                    //var date = new Date(data);
                    //return PFDateFormat(data, FsDateFormat, FsDateSeperator);
                    //var date = new Date(data);
                    //var month = date.getMonth() + 1;
                    //return (month.toString().length > 1 ? month : "0" + month) + "/" + date.getDate() + "/" + date.getFullYear();
                    return moment(row.PeriodStartDt).format('DD/MM/YYYY');
                }
            },
            { data: "PeriodName" },
            {
                data: "IsFirstYear",
                render: function (data, type, row) {
                    if (type === 'display' && data == true) {
                        return '<input type="checkbox"  checked="checked" disabled="disabled">';
                    }
                    else {
                        return '<input type="checkbox" disabled="disabled">';
                    }
                },
            },
            {
                data: "IsClosed",
                render: function (data, type, row) {
                    if (type === 'display' && data == true) {
                        return '<input type="checkbox"  checked="checked" disabled="disabled">';
                    }
                    else {
                        return '<input type="checkbox" disabled="disabled">';
                    }
                },
            },
            {
                data: "IsPeriodLock",
                render: function (data, type, row) {
                    if (type === 'display' && data == true) {
                        return '<input type="checkbox"  checked="checked" disabled="disabled">';
                    }
                    else {
                        return '<input type="checkbox"  disabled="disabled">';
                    }
                },
            },
        ],
        select: true,
        buttons: [
            /*{
                add: "create", text: 'New', editor: editor, action: () =>
                    showmodal()
            },*/
            {
                text: 'Create Accounting Period',
                action: function (e, dt, node, config) {
                    $('#myModal').modal('show')
                },
                attr: {
                    title: 'Create Accounting Period',
                    id: 'New_fy'
                },
            },
            {
                add: "edit", text: 'Period Lock/Unlock', editor: editor, action: () => showmodaledit($('.selected').attr('PeriodStartDt'), $('.selected').attr('RowId'), $('.selected').attr('IsPeriodLock')),
                attr: {
                    title: 'Period Lock/Unlock',
                    id: 'Edit_fy'
                },
            },
            {
                add: "delete", text: 'Delete', editor: editor, action: () => showmodaldelete(),
                attr: {
                    title: 'Delete',
                    id: 'Delete_fy'
                },
            },
            {
                extend: "selectedSingle", text: "Close Period",
                attr: {
                    title: 'Close Period',
                    id: 'Closefy'
                },
            },
        ],
        createdRow: function (row, data, dataIndex) {
            $(row).attr("RowId", `${data.RowId}`);
            $(row).attr("PeriodStartDt", `${data.PeriodStartDt}`);
            $(row).attr("IsPeriodLock", `${data.IsPeriodLock}`);
        },
        "order": [[3, "desc"]]
    });    
    //end
    var table = $('#fiscal_year_table').DataTable();
    //table.on('select', function () {
    //    var selectedRows = table.rows({
    //        selected: true
    //    }).count();
    //    if (selectedRows == 1) {
    //        if (!FinObject._deleteperm[0]) {
    //            $('#Delete_fy').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
    //            $('#Delete_fy').prop("disabled", true);
    //            $('#Delete_fy').attr('title', 'do not have delete permission!!!');
    //            table.button(2).action(function () {
    //                this.active(false);
    //                //this.disable();
    //            });
    //        }
    //    }
    //});

    if (!FinObject._createperm[0]) {
        $('#New_fy').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#New_fy').prop("disabled", true);
        $('#New_fy').attr('title', 'do not have permission to create Accounting Period!!!');
        table.button(0).action(function () {
            this.active(false);
        });
    }
    if (!FinObject._editperm[0]) {
        $('#Edit_fy').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#Edit_fy').prop("disabled", true);
        $('#Edit_fy').attr('title', 'do not have permission to Period Lock/Unlock!!!');
        table.button(1).action(function () {
            this.active(false);
        });
    }
    if (!FinObject._deleteperm[0]) {
        $('#Delete_fy').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#Delete_fy').prop("disabled", true);
        $('#Delete_fy').attr('title', 'do not have permission to Delete Accounting Period!!!');
        table.button(2).action(function () {
            this.active(false);
            //this.disable();
        });
    }
    if (!FinObject._closefy[0]) {
        $('#close_fy').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#close_fy').prop("disabled", true);
        $('#close_fy').attr('title', 'do not have permission to Close Accounting Period !!!');
        table.button(3).action(function () {
            this.active(false);
            //this.disable();
        });
    }

};

var showmodaledit = function (start_date, row_id, IsPeriodLock) {    
    
        if (start_date == undefined || start_date == null) {
            alert('Please select the row...');
            return;
        }
        var _lockunlock = 'UnLocked'; var _IsPeriodLock = false;
        if (IsPeriodLock == 'false') { _lockunlock = 'Locked'; }

        if (IsPeriodLock == 'false') { _IsPeriodLock = true}
    var _data = '{startdate: "' + start_date + '", rowid: "' + row_id + '", IsPeriodLock: "' + _IsPeriodLock + '", CoCd: "' + $("#ddlCompany").val() +'"}';

        $.ajax({
            type: "POST",
            url: "fiscal_year.aspx/doupdatefiscalyear",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") {
                    alert("Period " + _lockunlock + " successfully.");
                    window.location = "fiscal_year.aspx";
                }
            },
            failure: function (response) {
                alert('Problem in ' + _lockunlock + 'Period...');
            }
        });     
};

var deleteRow = function (mode, id, row_id) {

    if (id == undefined || id == null) {
        alert('Please select the row...');
        return;
    }
    var _data = '{dimid: "' + id + '"}';

    if (confirm("Are you sure want to delete?")) {
        $.ajax({
            type: "POST",
            url: "dimension.aspx/dodeletedimensiondetails",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") {
                    alert("Dimension deleted successfully .");
                    window.location = "dimension.aspx";
                }
            },
            failure: function (response) {
                alert('Problem in deleting items...');
            }
        });
    }
    /*if (confirm("Are you sure wat to delete?")) {
        $('#' + id).remove();
        if ($("#tbldimensionvalues tr").length == 0) $("#tbldimensionvalues").hide();

    }
    return false;*/
};

var SaveRow = function () {
    FinObject.do_savefiscalyear();
};

var dosavefiscalyear = function () {

    var validate = true;
    
    if ($('#txtstartdate').val() == '') {
        validate = false;
        alert('Start Date Required.');
        $('#txtstartdate').focus();
        return false;
    }
    
    if (validate == true) {
        var _data = {};
        _data["startdate"] = $('#txtstartdate').val();
        _data["noofperiod"] = $('#txtnoofperiod').val();
        _data["periodlength"] = $("#ddlperiodlength option:selected").val();
        _data["cocd"] = $("#ddlCompany").val();
        
        var passdata = {
            data: ""
        };
        passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "fiscal_year.aspx/dosavefiscalyear",
            data: JSON.stringify(passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") { FinObject.fiscaldata.dimId = ""; alert("Dimension saved successfully."); window.location = "fiscal_year.aspx"; }
                else { alert("Problem in saving data...\n Please Try Again."); }
            },
            failure: function (response) {
                /*alert(response.d);*/
                alert('Problem in saving data...');
            }
        });
    }
};

var showmodaldelete = function () {
    $("#myModalDELETE").modal('show');
    $("#cheque_register_table").html('');
    $("#cheque_register_table_info").hide(); 
    $("#cheque_register_table_paginate").hide(); 
    $("#cheque_register_table_wrapper").hide();
    $("#del_popup").hide();
    $("#can_popup").hide();
};

var showmodalsearch = function () {
    var start_date, end_date;
    start_date = $('#del_s_date').val(); 
    end_date = $('#del_e_date').val();

    if (start_date == undefined || start_date == null || start_date =="") {
        alert('Please enter the Date...');
        return;
    }

    if (end_date == undefined || end_date == null || end_date == "") {
        alert('Please enter the Date...');
        return;
    }

    if (Date.parse(start_date) > Date.parse(end_date)) {
        alert("Invalid Date Range");
    }

    var _data = '{startdate: "' + start_date + '", enddate: "' + end_date + '"}';

    $.ajax({
        type: "POST",
        url: "fiscal_year.aspx/doshowdeleteyear",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            if (!dochkses(result.d)) return;
            var obj = JSON.parse(`[${result.d}]`);
            dopopulatedeletefiscaltable(obj);
            $("#cheque_register_table_filter").hide();
            $("#del_popup").show();
            $("#can_popup").show();
            $("#chk_select").prop('checked', false);
        },
        failure: function (response) {
            alert('Problem in ' + _lockunlock + 'Period...');
        }
    });
};
const dopopulatedeletefiscaltable = (obj) => {
    var html = "";
    var visstyle = "";
    var htmldelRoles = [];
    
    $("#cheque_register_table").html('');

    for (var i = 0; i < obj.length; i++) {
        var objnew = obj[i];
        for (var key in objnew) {
            var attrName = key;
            if (attrName.toLowerCase() == "table") {
                htmldelRoles = objnew[key];
            }
        }
    }
    
    $("#cheque_register_table").append(
        "<thead><tr>" +
        "<th><input type='checkbox' onclick='selectAll(this);' id='chk_select'></th>" +
        "<th>Start Date</th><th>Period Name</th>" +
        "<tbody>"
    );

    $("#cheque_register_table").append("</tbody>");

    var editor = new $.fn.dataTable.Editor({
        table: "#cheque_register_table",
        fields: [
            { label: "Select", name: "select1", type: "checkbox" },
            { label: "Start Date", name: "PeriodStartDt" },
            { label: "Period Name", name: "PeriodName" }            
        ],
    });
    const deltableEl = $("#cheque_register_table");

    deltableEl.dataTable({
        dom: "Bfrtip",
        destroy: true,
        searching: false,
        fixedHeader: false,
        data: htmldelRoles,
        columns: [
            {
                data: "select1",
                render: function (data, type, row) {
                    return '<input type="checkbox" name="id[]" id= chk_' + row.RowId + ' onclick="selectchange(this);"  value="' + moment(row.PeriodStartDt).format('DD/MM/YYYY') +'">';
                },
            }, 
            {
                data: "PeriodStartDt",
                "render": function (data, type, row) {
                    return moment(row.PeriodStartDt).format('DD/MM/YYYY');
                }
            },
            { data: "PeriodName" },                       
        ],
        select: true,
        buttons: [
            {
                editor: editor
            },
        ],
        
        createdRow: function (row, data, dataIndex) {
            $(row).attr("PeriodStartDt", `${data.PeriodStartDt}`);            
        },        
    });
};

var selectchange = function (obj) {
    var chk_id = obj.value;
    var idx = $.inArray(chk_id, deleteDates);
    if (idx >= 0) {
        // Element was found, remove it.
        deleteDates.splice(idx, 1);
    } else {
        // Element was not found, add it.
        deleteDates.push(chk_id);
    }
};

var selectAll = function (obj) {
    var chks_id = obj.checked;
    var deltableE2 = $("#cheque_register_table").DataTable().rows().data();
    var allPages = deltableE2.cells().nodes();
    var checked_control;
    deltableE2
        .column(0)
        .data()
        .each(function (value, index, data) {
            checked_control = index;
            
            //var obj_chk = $('#chk_' + checked_control);
            if (chks_id == true) {
                var chk_id_v = moment(deltableE2[index].PeriodStartDt).format('DD-MMM-YYYY');//obj_chk.val();
                $(allPages).find('input[type="checkbox"]').prop('checked', true);
                //alert($(allPages).find(obj_chk).value);
                // Element was not found, add it.
                deleteDates.push(chk_id_v);
            }
            else {
                $(allPages).find('input[type="checkbox"]').prop('checked', false);
            }
        });
    
    //alert(deleteDates);
};

var DeleteRow = function () {
    FinObject.do_deletefiscalyear();
};

var dodeletefiscalyear = function () {
    var validate = true;

    if (deleteDates == '') {
        validate = false;
        alert('select the Date.');        
        return false;
    }

    if (validate == true) {
        var _data = {};
        _data["deletedates"] = deleteDates;
        
        var passdata = {
            data: ""
        };
        passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "fiscal_year.aspx/dodeletefiscalyear",
            data: JSON.stringify(passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var obj = JSON.parse(`[${result.d}]`);
                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = key;
                        if (attrName.toLowerCase() == "table") {
                            if (objnew[key].length > 0) {
                                alert(objnew[key][0].p_error_msg);
                            } else {
                                FinObject.fiscaldata.dimId = "";
                                alert("Data saved successfully."); window.location = "fiscal_year.aspx";
                            }
                        }
                        else { alert("Problem in saving data...\n Please Try Again."); }
                    }
                }
                if (result.d == "") {
                    FinObject.fiscaldata.dimId = "";
                    alert("Data saved successfully."); window.location = "fiscal_year.aspx";
                }
                //else { alert("Problem in saving data...\n Please Try Again."); }
            },
            failure: function (response) {
                /*alert(response.d);*/
                alert('Problem in saving data...');
            }
        });
    }
};