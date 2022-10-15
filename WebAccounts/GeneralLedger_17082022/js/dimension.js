$(document).ready(function () {
    if (localStorage._dimensionpage_menuid == '' || localStorage._dimensionpage_menuid == undefined) {
        localStorage._dimensionpage_menuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._dimensionpage_menuid;
    }

    DimObject.do_getUserPagepermission();
    DimObject.do_getUserPagepermissiondimset();
});

var DimObject = {
    dimensiondata: [{
        dimid: '',
        actionmode: '',
        userid: '', 
        Name: '',
        row_id:'',
    }],
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _dimvalueperm: false,
    _dimvalueperm_menuid: '',
    _dimensionpage_menuid: '',

    _addeperm: false,
    _removeperm: false,
    _blockUnblockperm: false,

    do_loaddimensionlist: () => {
        $.ajax({
            type: "POST",
            url: "dimension.aspx/doloaddimensionlist",
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
                dopopulatedimensiontable(obj);                
            },
            failure: function (response) {
                alert('Problem in retreiving items...');
            }
        });
    },
    
    do_OnRowDimension_onclick: (obj) => {
        DimObject.dimensiondata.dimid = $(obj).parent().parent().attr('dimid');
        DimObject.dimensiondata.actionmode = $(obj).attr('mode');
        DimObject.dimensiondata.actionmode = $(obj).attr('mode');
        do_OnRowDimension_action();
    },

    dimensionsetdata: [{
        dimSetId: '',
        actionmode: '',
        userid: ''
    }],

    do_loaddimensionsetlist: () => {
        $.ajax({
            type: "POST",
            url: "dimensionset.aspx/doloaddimensionsetlist",
            data: JSON.stringify({ CoCd: $("#ddlCompany").val() }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                dopopulatedimensionsettable(obj);
            },
            failure: function (response) {
                alert('Problem in retreiving items...');
            }
        });
    },

    do_OnRowDimensionSet_onclick: (obj) => {
        DimObject.dimensionsetdata.dimSetId = $(obj).parent().parent().attr('dimSetId');
        DimObject.dimensionsetdata.actionmode = $(obj).attr('mode');
        do_OnRowDimensionSet_action();
    },

    do_loadDimensionSetData: () => {

        if (queryString('id') != undefined || queryString("id") != null) {
            DimObject.dimensionsetdata.dimSetId = queryString("id");
            $('#txt_dimSetCode').attr('disabled', 'disabled');
        }
        else {
            $('#txt_dimSetCode').removeAttr("disabled");
            DimObject.dimensionsetdata.dimSetId = "";
        }

        var _data = '{dimsetid: "' + DimObject.dimensionsetdata.dimSetId + '", cocd:"' + $("#ddlCompany").val() +'"}';

        $.ajax({
            type: "POST",
            url: "dimensionset.aspx/doloaddimensiondetails",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;

                var obj = JSON.parse(`[${result.d}]`);

                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = key;
                        if (attrName.toLowerCase() == "table") {
                            if (objnew[key].length > 0) {
                                $('#txt_dimSetCode').val(objnew[key][0].dimSetCode);
                                $('#txt_dimSetName').val(objnew[key][0].dimSetName);
                                if (objnew[key][0].enabled == 1) $('#chk_Isenabled').prop('checked', true);
                            }
                        }
                        if (attrName.toLowerCase() == "table1") {
                            var arraydtl = objnew[key];

                            $.each(arraydtl, function (k, item) {
                                let i = item.dimid;
                                //let ischked = item.ischecked;

                                if (i == 1) {
                                    $('#lbl_dim1').text(item.dimCaption);
                                    if (item.ischecked==1) $('#chk_dim1_Branch').prop('checked', true);
                                }
                                else if (i == 2) {
                                    $('#lbl_dim2').text(item.dimCaption);
                                    if (item.ischecked == 1) $('#chk_dim2_Dept').prop('checked', true);
                                }
                                else if (i == 3) {
                                    $('#lbl_dim3').text(item.dimCaption);
                                    if (item.ischecked == 1) $('#chk_dim3').prop('checked', true);
                                }
                                else if (i == 4) {
                                    $('#lbl_dim4').text(item.dimCaption);
                                    if (item.ischecked == 1) $('#chk_dim4').prop('checked', true);
                                }
                                else if (i == 5) {
                                    $('#lbl_dim5').text(item.dimCaption);
                                    if (item.ischecked == 1) $('#chk_dim5').prop('checked', true);
                                }
                                else if (i == 6) {
                                    $('#lbl_dim6').text(item.dimCaption);
                                    if (item.ischecked == 1) $('#chk_dim6').prop('checked', true);
                                }
                                else if (i == 7) {
                                    $('#lbl_dim7').text(item.dimCaption);
                                    if (item.ischecked == 1) $('#chk_dim7').prop('checked', true);
                                }
                                else if (i == 8) {
                                    $('#lbl_dim8').text(item.dimCaption);
                                    if (item.ischecked == 1) $('#chk_dim8').prop('checked', true);
                                }
                                else if (i == 9) {
                                    $('#lbl_dim9').text(item.dimCaption);
                                    if (item.ischecked == 1) $('#chk_dim9').prop('checked', true);
                                }
                                else if (i == 10) {
                                    $('#lbl_dim10').text(item.dimCaption);
                                    if (item.ischecked == 1) $('#chk_dim10').prop('checked', true);
                                }

                            });
                        }
                    }
                }
            },
            failure: function (response) {
                /*alert(response.d);*/
                alert('Problem in retreiving items...');
            }
        });
    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(DimObject);
        DimObject._createperm = MainObject.do_IsActionMenuPermission(DimObject.access, 'Dimension', 'create');
        DimObject._editperm = MainObject.do_IsActionMenuPermission(DimObject.access, 'Dimension', 'edit');
        DimObject._deleteperm = MainObject.do_IsActionMenuPermission(DimObject.access, 'Dimension', 'delete');
        DimObject._dimvalueperm = MainObject.do_IsActionMenuPermission(DimObject.access, 'Dimension Value', 'view');

        DimObject._dimvalueperm_menuid = MainObject.do_IsActionMenuPermission(DimObject.access, 'Dimension Value', 'menuid');
    },
    
    do_getUserPagepermissiondimset: () => {
        MainObject.do_getuserpageaccess(DimObject);
        DimObject._addeperm = MainObject.do_IsActionMenuPermission(DimObject.access, 'Dimension Set', 'create');
        DimObject._removeperm = MainObject.do_IsActionMenuPermission(DimObject.access, 'Dimension Set', 'delete');
        DimObject._blockUnblockperm = MainObject.do_IsActionMenuPermission(DimObject.access, 'Block/UnBlock', 'create');
    },

    do_savedimensionset: () => {
        dosavedimensionset();
    },

    do_savedimension: () => {
        dosavedimension();
    },

};

const dopopulatedimensiontable = (obj) => {
    //insertEmptyRow();
    var html = "";
    var visstyle = "";
    var htmlRoles = [];
    $('#dimension_table').html('');

    for (var i = 0; i < obj.length; i++) {
        var objnew = obj[i];
        for (var key in objnew) {
            var attrName = key;
            if (attrName.toLowerCase() == "table") {
                htmlRoles = objnew[key];
            }
        }
    }

    $("#dimension_table").append(
        "<thead><tr>" +
        
        "<th>Id</th><th>Code</th><th>Name (Caption)</th>" +
        "<th>Description</th><th>Applicable for Access Control</th>" +
        "<th>All Balance Sheet Ledgers</th><th>All Income Ledgers</th>" +
        "<th>All Expense Ledgers</th><th>All Opening Ledgers</th>" +
        "<th>Blocked</th></thead > " +
        "<tbody>"
    );


    $("#dimension_table").append("</tbody>");

    //ashim
    // editor init
    var editor = new $.fn.dataTable.Editor({
        table: "#dimension_table",
        fields: [
            { label: "Id", name: "dimid" },
            { label: "Code", name: "dimCd" },
            { label: "Name(Caption)", name: "dimCaption" },
            { label: "Description", name: "dimDesc" },
            { label: "Applicable for Access Control", name: "IsAcApp" },
            { label: "All Balance Sheet Ledgers", name: "IsAppBSLedger" },
            { label: "All Income Ledgers", name: "IsAppIncomeLedger" },
            { label: "All Expense Ledgers", name: "IsAppExpnsLedger" },
            { label: "All Opening Ledgers", name: "IsAppOBLedger" },
            { label: "Blocked", name: "enabled" }
            //{ label: "Action", name: "AcId" },
        ],
    });
    const tableEl = $("#dimension_table");
    // datatables init
    //$('.selected').attr('id')
    //tableEl.DataTable({


    //tableEl.destroy();

    tableEl.dataTable({
        dom: "Bfrtip",
        fixedHeader: true,
        data: htmlRoles,
        columns: [
            { data: "dimid" },
            { data: "dimCd" },
            { data: "dimCaption" },
            { data: "dimDesc" },
            { data: "IsAcApp" },
            { data: "IsAppBSLedger" },
            { data: "IsAppIncomeLedger" },
            { data: "IsAppExpnsLedger" },
            { data: "IsAppOBLedger" },
            { data: "enabled" },
        ],
        select: true,
        buttons: [
            {
                add: "create", text: 'New', editor: editor, action: () => showmodaledit("N", $('.selected').attr('id'), $('.selected').attr('row_id')),
                attr: {
                    title: 'New',
                    id: 'New_dim'
                },
            },

            {
                add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit("E", $('.selected').attr('id'), $('.selected').attr('row_id')),
                attr: {
                    title: 'Edit',
                    id: 'Edit_dim'
                },
            },
            {
                extend: "remove", editor: editor, action: () => deleteRow("D", $('.selected').attr('id'), $('.selected').attr('row_id')),
                attr: {
                    title: 'Delete',
                    id: 'Delete_dim'
                },
            },

            {
                text: 'Dimension Value',
                action: () => dodimensionvalue("", $('.selected').attr('id'), $('.selected').attr('name')),
                attr: {
                    title: 'Dimension',
                    id: 'Val_dim'
                },
            },
        ],
        createdRow: function (row, data, dataIndex) {
            $(row).attr("id", `${data.dimid}`);
            $(row).attr("name", `${data.dimCaption}`);
            $(row).attr("row_id", `${data.row_id}`);
        },
    });

    if (obj.length == 10) $('#btn_newdimension').hide();
    //end
    
    var table = $('#dimension_table').DataTable();
    table.on('select', function () {
        var selectedRows = table.rows({
            selected: true
        }).count();
        if (selectedRows == 1) {
            if (!DimObject._deleteperm[0]) {
                $('#Delete_dim').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                $('#Delete_dim').prop("disabled", true);
                $('#Delete_dim').attr('title', 'do not have delete permission!!!');
                table.button(2).action(function () {
                    this.active(false);
                    //this.disable();
                });
            }
        }

    });

    if (!DimObject._createperm[0]) {
        $('#New_dim').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#New_dim').prop("disabled", true);
        $('#New_dim').attr('title', 'do not have permission to add dimension!!!');
        table.button(0).action(function () {
            this.active(false);
        });
    }
    if (!DimObject._editperm[0]) {
        $('#Edit_dim').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#Edit_dim').prop("disabled", true);
        $('#Edit_dim').attr('title', 'do not have permission to edit dimension!!!');
        table.button(1).action(function () {
            this.active(false);
        });
    }
    if (!DimObject._deleteperm[0]) {
        $('#Delete_dim').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#Delete_dim').prop("disabled", true);
        $('#Delete_dim').attr('title', 'do not have permission to delete dimension!!!');
        table.button(2).action(function () {
            this.active(false);
            //this.disable();
        });
    }
    if (!DimObject._dimvalueperm[0]) {
        $('#Val_dim').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#Val_dim').prop("disabled", true);
        $('#Val_dim').attr('title', 'do not have permission to assign dimension!!!');
        table.button(3).action(function () {
            this.active(false);
        });
    }

};

var dosavedimensionset = function () {

    var validate = true;

    if ($('#txt_dimSetCode').val() == '') {
        validate = false;
        alert('Dimension Set code required.');
        $('#txt_dimSetCode').focus();
        return false;
    }
    else {
        var _data = '{dimsetId: "' + DimObject.dimensionsetdata.dimSetId + '", dimsetCd: "' + encodeURIComponent($('#txt_dimSetCode').val().trim()) + '"}';

        $.ajax({
            type: "POST",
            url: "dimensionset.aspx/docheckdimensioncode",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") {
                    validate = false;
                    alert("Dimension Set Code Already Exists.\n Please Try Another Dimension Set Code.");
                    $('#txt_dimSetCode').focus();
                    return false;
                }
            },
            failure: function (response) {
                alert('Problem in retreiving items...');
            }
        });
    }

    // Dimension set check
    if ($('#txt_dimSetCode').val().trim() != '') {

        var _data = {};
        _data["dimSetId"] = DimObject.dimensionsetdata.dimSetId;
        //_data["dimSetCode"] = $('#txt_dimSetCode').val().trim();
        //_data["dimSetName"] = $('#txt_dimSetName').val();
        _data["dim1_Branch"] = $('#chk_dim1_Branch').is(":checked");
        _data["dim2_Dept"] = $('#chk_dim2_Dept').is(":checked");
        _data["dim3"] = $('#chk_dim3').is(":checked");
        _data["dim4"] = $('#chk_dim4').is(":checked");
        _data["dim5"] = $('#chk_dim5').is(":checked");
        _data["dim6"] = $('#chk_dim6').is(":checked");
        _data["dim7"] = $('#chk_dim7').is(":checked");
        _data["dim8"] = $('#chk_dim8').is(":checked");
        _data["dim9"] = $('#chk_dim9').is(":checked");
        _data["dim10"] = $('#chk_dim10').is(":checked");
        _data["cocd"] = $("#ddlCompany").val();

        var passdata = {
            data: ""
        };
        passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "dimensionset.aspx/docheckdimensionset",
            data: JSON.stringify(passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") {
                    validate = false;
                    alert("Dimension Set Already Exists.\n Please Try Another Dimension Set.");
                    //$('#txt_dimSetCode').focus();
                    return false;
                }
            },
            failure: function (response) {
                alert('Problem in retreiving items...');
            }
        });
    }

    if (validate == true) {
        var _data = {};
        _data["dimSetId"] = DimObject.dimensionsetdata.dimSetId;
        _data["dimSetCode"] = $('#txt_dimSetCode').val().trim();
        _data["dimSetName"] = $('#txt_dimSetName').val();
        _data["dim1_Branch"] = $('#chk_dim1_Branch').is(":checked");
        _data["dim2_Dept"] = $('#chk_dim2_Dept').is(":checked");
        _data["dim3"] = $('#chk_dim3').is(":checked");
        _data["dim4"] = $('#chk_dim4').is(":checked");
        _data["dim5"] = $('#chk_dim5').is(":checked");
        _data["dim6"] = $('#chk_dim6').is(":checked");
        _data["dim7"] = $('#chk_dim7').is(":checked");
        _data["dim8"] = $('#chk_dim8').is(":checked");
        _data["dim9"] = $('#chk_dim9').is(":checked");
        _data["dim10"] = $('#chk_dim10').is(":checked");
        _data["enabled"] = $('#chk_Isenabled').is(":checked");
        _data["cocd"] = $("#ddlCompany").val();

        var passdata = {
            data: ""
        };
        passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "dimensionset.aspx/doSaveDimensionset",
            data: JSON.stringify(passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") { DimObject.dimensionsetdata.dimSetId = ""; alert("Dimension Set saved successfully."); window.location = "dimensionset.aspx"; }
                else { alert("Problem in saving data...\n Please Try Again."); }
            },
            failure: function (response) {
                /*alert(response.d);*/
                alert('Problem in saving data...');
            }
        });
    }
};

var showmodaledit = function (mode, id, row_id) {    
    if (mode == "E") {
        $("#dmTitle").text('Edit Dimension');
        if (id == undefined || id == null) {
            alert('Please select the row...');
            return;
        }
        DimObject.dimensiondata.dimId = id;

        var _data = '{dimid: "' + DimObject.dimensiondata.dimId + '", cocd:"' + $("#ddlCompany").val() +'"}';

        $.ajax({
            type: "POST",
            url: "dimension.aspx/doloaddimensiondetails",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;

                var obj = JSON.parse(`[${result.d}]`);

                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = key;
                        if (attrName.toLowerCase() == "table") {//dimensionmaster
                            if (objnew[key].length > 0) {
                                //RolesObject.rolesdata.rolename = objnew[key][0].rolename;
                                $('#txt_dimCdedit').val(objnew[key][0].dimCd);
                                $('#txt_dimCaption').val(objnew[key][0].dimCaption);
                                $('#txt_description').val(objnew[key][0].dimDesc);

                                if (objnew[key][0].IsAcApp == 1) $('#chkaccesscontrol').prop('checked', true);
                                if (objnew[key][0].IsAppBSLedger == 1) $('#chkbalsheetledger').prop('checked', true);
                                if (objnew[key][0].IsAppIncomeLedger == 1) $('#chkincomeledger').prop('checked', true);
                                if (objnew[key][0].IsAppExpnsLedger == 1) $('#chkexpanseledger').prop('checked', true);
                                if (objnew[key][0].IsAppOBLedger == 1) $('#chkopeningledger').prop('checked', true);
                                if (objnew[key][0].enabled == 1) $('#chkblocked').prop('checked', true);

                            }
                        }
                        //if (attrName.toLowerCase() == "table1") {//dimensionvaldetails
                        //    generateDimensionvalList(objnew[key]);
                        //}
                    }
                }
                $('#txt_dimCdedit').attr('disabled', 'disabled');
                $('#divblock').show();
                $("#myModalEDIT").modal('show');
            },
            failure: function (response) {
                /*alert(response.d);*/
                alert('Problem in retreiving items...');
            }
        });
    }
    if (mode == "N") {
        $("#dmTitle").text('Add New Dimension');
        DimObject.dimensiondata.dimId = '';

        $('#txt_dimCdedit').val('');
        $('#txt_dimCaption').val('');
        $('#txt_description').val('');

        $('#chkaccesscontrol').prop('checked', false);
        $('#chkbalsheetledger').prop('checked', false);
        $('#chkincomeledger').prop('checked', false);
        $('#chkexpanseledger').prop('checked', false);
        $('#chkopeningledger').prop('checked', false);
        $('#chkblocked').prop('checked', false);
        $('#divblock').hide();
        $("#myModalEDIT").modal('show');
    }    
};

function getRow() {
    // here you need to return the value
    // to be available when function was called
    return $('table > tbody > tr.selected');
}
var deleteRow = function (mode, id, row_id) {

    if (id == undefined || id == null) {
        alert('Please select the row...');
        return;
    }
    var _data = '{dimid: "' + id + '", valueid:"", cocd:"' + $("#ddlCompany").val() +'"}';

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
    DimObject.do_savedimension();
};

var dodimensionvalue = function (mode,id, name) {
    if (id == undefined || id == null) {
        alert('Please select the row...');
        return;
    }
    
    DimObject.dimensiondata.dimId = id;
    //window.location.assign("dimensionvalue.aspx?id=" + id + "&dimname=" + name);
    window.location.assign("dimensionvalue.aspx?id=" + id + "&dimname=" + name + "&menuid=" + DimObject._dimvalueperm_menuid[1]);
};


var dosavedimension = function () {

    var validate = true;

    if ($('#txt_dimCdedit').val() == '') {
        validate = false;
        alert('Dimension code required.');
        $('#txt_dimCdedit').focus();
        return false;
    }
    /*else {
        var _data = '{dimId: "' + DimensionObject.dimension.dimId + '"}';

        $.ajax({
            type: "POST",
            url: "dimensionnew.aspx/docheckdimensioncode",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") {
                    validate = false;
                    alert("Dimension Code Already Exists.\n Please Try Another Dimension Code.");
                    $('#txt_dimCd').focus();
                    return false;
                }
            },
            failure: function (response) {
                alert('Problem in retreiving items...');
            }
        });
    }*/

    //console.log(DimensionObject.dimensionvaluedata);

    //return;

    if (validate == true) {
        var _data = {};
        _data["dimId"] = DimObject.dimensiondata.dimId;
        _data["dimCd"] = $('#txt_dimCdedit').val().trim();
        _data["dimCaption"] = $('#txt_dimCaption').val();
        _data["dimDesc"] = $('#txt_description').val();
        _data["IsAcApp"] = $('#chkaccesscontrol').is(":checked");
        _data["IsAppBSLedger"] = $('#chkbalsheetledger').is(":checked");
        _data["IsAppIncomeLedger"] = $('#chkincomeledger').is(":checked");
        _data["IsAppExpnsLedger"] = $('#chkexpanseledger').is(":checked");
        _data["IsAppOBLedger"] = $('#chkopeningledger').is(":checked");
        _data["enabled"] = $('#chkblocked').is(":checked");
        _data["cocd"] = $("#ddlCompany").val();
        //_data["dimensionvaldtls"] = JSON.stringify(DimensionObject.dimensionvaluedata);

        var passdata = {
            data: ""
        };
        passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "dimension.aspx/doSaveDimension",
            data: JSON.stringify(passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") { DimObject.dimensiondata.dimId = ""; alert("Dimension saved successfully."); window.location = "dimension.aspx"; }
                else { alert("Problem in saving data...\n Please Try Again."); }
            },
            failure: function (response) {
                /*alert(response.d);*/
                alert('Problem in saving data...');
            }
        });
    }
};

const dopopulatedimensionsettable = function (obj) {
    var html = '';
    var visstyle = '';
    $('#dimensionset_table').html('');

    var dimensionheader = [], dimensionsetdata = [];

    for (var i = 0; i < obj.length; i++) {
        var objnew = obj[i];
        for (var key in objnew) {
            var attrName = key;
            if (attrName.toLowerCase() == "table") {
                dimensionheader = objnew[key];
                console.log(dimensionheader);

                html += '<thead><tr>';
                html += '<th>Code</th><th>Name</th>' +
                    '<th>' + dimensionheader[0].dim1 + '</th><th>' + dimensionheader[0].dim2 + '</th>' +
                    '<th>' + dimensionheader[0].dim3 + '</th><th>' + dimensionheader[0].dim4 + '</th>' +
                    '<th>' + dimensionheader[0].dim5 + '</th><th>' + dimensionheader[0].dim6 + '</th>' +
                    '<th>' + dimensionheader[0].dim7 + '</th><th>' + dimensionheader[0].dim8 + '</th>' +
                    '<th>' + dimensionheader[0].dim9 + '</th><th>' + dimensionheader[0].dim10 + '</th>' +
                    '<th>Blocked</th></tr ></thead > ';

                html += '<tbody>';
            }
            if (attrName.toLowerCase() == "table1") {
                dimensionsetdata = objnew[key];
            }
        }
    }

    $("#dimensionset_table").append(html);

    $("#dimensionset_table").append("</tbody>");

    var editor = new $.fn.dataTable.Editor({
        table: "#dimensionset_table",
        fields: [
            { label: "Code", name: "dimSetCode" },
            { label: "Name", name: "dimSetName" },
            { label: dimensionheader[0].dim1, name: "dim1_Branch" },
            { label: dimensionheader[0].dim2, name: "dim2_Dept" },
            { label: dimensionheader[0].dim3, name: "dim3" },
            { label: dimensionheader[0].dim4, name: "dim4" },
            { label: dimensionheader[0].dim5, name: "dim5" },
            { label: dimensionheader[0].dim6, name: "dim6" },
            { label: dimensionheader[0].dim7, name: "dim7" },
            { label: dimensionheader[0].dim8, name: "dim8" },
            { label: dimensionheader[0].dim9, name: "dim9" },
            { label: dimensionheader[0].dim10, name: "dim10" },
            { label: "Blocked", name: "enabled" }
            //{ label: "Action", name: "AcId" },
        ],
    });

    const tableEl = $("#dimensionset_table");
    // datatables init
    //$('.selected').attr('id')
    //tableEl.DataTable({


    //tableEl.destroy();

    tableEl.dataTable({
        dom: "Bfrtip",
        fixedHeader: true,
        data: dimensionsetdata,
        columns: [
            { data: "dimSetCode" },
            { data: "dimSetName" },
            { data: "dim1_Branch" },
            { data: "dim2_Dept" },
            { data: "dim3" },
            { data: "dim4" },
            { data: "dim5" },
            { data: "dim6" },
            { data: "dim7" },
            { data: "dim8" },
            { data: "dim9" },
            { data: "dim10" },
            { data: "enabled" },
        ],
        select: true,
        buttons: [
            {
                add: "create", text: 'Create', editor: editor, action: () => showmodal("N", $('.selected').attr('dimSetId'), $('.selected').attr('dimSetName')),
                attr: {
                    title: 'New',
                    id: 'Add_dimset'
                },
            },
            {
                extend: "remove", editor: editor, action: () => showmodal("D", $('.selected').attr('dimSetId'), $('.selected').attr('dimSetName')),
                attr: {
                    title: 'New',
                    id: 'Remove_dimset'
                },
            },
            {
                add: "block", text: 'Block/UnBlock', editor: editor, action: () => showmodal("B", $('.selected').attr('dimSetId'), $('.selected').attr('dimSetBlock')),
                attr: {
                    title: 'New',
                    id: 'blockUnblock_dimset'
                },
            },

        ],
        createdRow: function (row, data, dataIndex) {
            $(row).attr("dimSetId", `${data.dimSetId}`);
            $(row).attr("dimSetName", `${data.dimSetName}`);
            $(row).attr("dimSetBlock", `${data.enabled}`);
        },
    });

    var table = $('#dimension_table').DataTable();
    table.on('select', function () {
        var selectedRows = table.rows({
            selected: true
        }).count();
        if (selectedRows == 1) {
            if (!DimObject._removeperm[0]) {
                $('#Remove_dimset').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                $('#Remove_dimset').prop("disabled", true);
                $('#Remove_dimset').attr('title', 'do not have delete permission!!!');
                table.button(1).action(function () {
                    this.active(false);
                    //this.disable();
                });
            }
        }

    });

    if (!DimObject._addeperm[0]) {
        $('#Add_dimset').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#Add_dimset').prop("disabled", true);
        $('#Add_dimset').attr('title', 'do not have permission to add dimension!!!');
        table.button(0).action(function () {
            this.active(false);
        });
    }
    if (!DimObject._removeperm[0]) {
        $('#Remove_dimset').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#Remove_dimset').prop("disabled", true);
        $('#Remove_dimset').attr('title', 'do not have permission to delete dimension set!!!');
        table.button(1).action(function () {
            this.active(false);
        });
    }
    if (!DimObject._blockUnblockperm[0]) {
        $('#blockUnblock_dimset').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#blockUnblock_dimset').prop("disabled", true);
        $('#blockUnblock_dimset').attr('title', 'do not have permission to block/unblock!!!');
        table.button(2).action(function () {
            this.active(false);
            //this.disable();
        });
    }
};

var showmodal = function (dimSetmode, dimSetId, dimSetName) {
    DimObject.dimensionsetdata.dimSetId = dimSetId;

    if (dimSetmode == "D") {
        
        var _data = '{dimsetid: "' + DimObject.dimensionsetdata.dimSetId + '", dimsetBlock:"D", dimSetBlockValue:"' + dimSetName +'" }';

        $.ajax({
            type: "POST",
            url: "dimensionset.aspx/dodeletedimensionset",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") {
                    alert("Dimension Set deleted successfully .");
                    window.location = "dimensionset.aspx";
                }
            },
            failure: function (response) {
                alert('Problem in deleting items...');
            }
        });
    }
    else if (dimSetmode == "B") {
        var dimSetEnable = ""; var dimSetBlock = "Block";
        if (dimSetName == "Yes") { dimSetBlock = "UnBlock"; }
        var sts_block = confirm("Do you want " + dimSetBlock + "?");
        if (sts_block == true) {
            if (dimSetName == "Yes") {
                dimSetEnable = "enabled";
            }
            var _data = '{dimsetid: "' + DimObject.dimensionsetdata.dimSetId + '", dimsetBlock:"B", dimSetBlockValue:"' + dimSetEnable +'" }';

            $.ajax({
                type: "POST",
                url: "dimensionset.aspx/dodeletedimensionset",
                data: _data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (result) {
                    if (!dochkses(result.d)) return;
                    if (result.d == "True") {
                        alert("DimensionSet updated successfully .");
                        window.location = "dimensionset.aspx";
                    }
                },
                failure: function (response) {
                    alert('Problem in deleting items...');
                }
            });
        } else {
            alert("You pressed Cancel!");
        }
    }
    else {
        /*if (dimSetId == null || dimSetId == undefined) {*/
        DimObject.dimensionsetdata.dimSetId = '';
        var _data = '{dimsetid: "' + DimObject.dimensionsetdata.dimSetId + '", cocd:"' + $("#ddlCompany").val() +'"}';

        $('#divdimset').hide();
            /*
            $("#DimSetTitle").text("Add Dimension Set");
            $('#txt_dimSetCode').val();
            $('#txt_dimSetName').val();
            $('#chk_dim1_Branch').prop('checked', false);
            $('#chk_dim2_Dept').prop('checked', false); 
            $('#chk_dim3').prop('checked', false); 
            $('#chk_dim4').prop('checked', false); 
            $('#chk_dim5').prop('checked', false); 
            $('#chk_dim6').prop('checked', false); 
            $('#chk_dim7').prop('checked', false); 
            $('#chk_dim8').prop('checked', false); 
            $('#chk_dim9').prop('checked', false); 
            $('#chk_dim10').prop('checked', false); 
            $('#chk_Isenabled').prop('checked', false);
        } else {
            $("#DimSetTitle").text("Edit Dimension Set");*/

            $.ajax({
                type: "POST",
                url: "dimensionset.aspx/doloaddimensiondetails",
                data: _data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (result) {
                    if (!dochkses(result.d)) return;
                    var rest = result.d;

                    var obj = JSON.parse(`[${result.d}]`);

                    for (var i = 0; i < obj.length; i++) {
                        var objnew = obj[i];
                        for (var key in objnew) {
                            var attrName = key;
                            if (attrName.toLowerCase() == "table") {
                                if (objnew[key].length > 0) {
                                    $('#txt_dimSetCode').val(objnew[key][0].dimSetCode);
                                    $('#txt_dimSetName').val(objnew[key][0].dimSetName);
                                    if (objnew[key][0].enabled == 1) { $('#chk_Isenabled').prop('checked', true); }
                                    else { $('#chk_Isenabled').prop('checked', false); }
                                }
                            }
                            if (attrName.toLowerCase() == "table1") {
                                var arraydtl = objnew[key];

                                $.each(arraydtl, function (k, item) {
                                    let i = item.dimid;
                                    //let ischked = item.ischecked;

                                    if (i == 1) {
                                        $('#lbl_dim1').text(item.dimCaption);
                                        if (item.ischecked == 1) { $('#chk_dim1_Branch').prop('checked', true); }
                                        else { $('#chk_dim1_Branch').prop('checked', false); }
                                    }
                                    else if (i == 2) {
                                        $('#lbl_dim2').text(item.dimCaption);
                                        if (item.ischecked == 1) { $('#chk_dim2_Dept').prop('checked', true); }
                                        else { $('#chk_dim2_Dept').prop('checked', false); }
                                    }
                                    else if (i == 3) {
                                        $('#lbl_dim3').text(item.dimCaption);
                                        if (item.ischecked == 1) { $('#chk_dim3').prop('checked', true); }
                                        else { $('#chk_dim3').prop('checked', false); }
                                    }
                                    else if (i == 4) {
                                        $('#lbl_dim4').text(item.dimCaption);
                                        if (item.ischecked == 1) { $('#chk_dim4').prop('checked', true); }
                                        else { $('#chk_dim4').prop('checked', false); }
                                    }
                                    else if (i == 5) {
                                        $('#lbl_dim5').text(item.dimCaption);
                                        if (item.ischecked == 1) { $('#chk_dim5').prop('checked', true); }
                                        else { $('#chk_dim5').prop('checked', false); }
                                    }
                                    else if (i == 6) {
                                        $('#lbl_dim6').text(item.dimCaption);
                                        if (item.ischecked == 1) { $('#chk_dim6').prop('checked', true); }
                                        else { $('#chk_dim6').prop('checked', false); }
                                    }
                                    else if (i == 7) {
                                        $('#lbl_dim7').text(item.dimCaption);
                                        if (item.ischecked == 1) { $('#chk_dim7').prop('checked', true); }
                                        else { $('#chk_dim7').prop('checked', false); }
                                    }
                                    else if (i == 8) {
                                        $('#lbl_dim8').text(item.dimCaption);
                                        if (item.ischecked == 1) { $('#chk_dim8').prop('checked', true); }
                                        else { $('#chk_dim8').prop('checked', false); }
                                    }
                                    else if (i == 9) {
                                        $('#lbl_dim9').text(item.dimCaption);
                                        if (item.ischecked == 1) { $('#chk_dim9').prop('checked', true); }
                                        else { $('#chk_dim9').prop('checked', false); }
                                    }
                                    else if (i == 10) {
                                        $('#lbl_dim10').text(item.dimCaption);
                                        if (item.ischecked == 1) { $('#chk_dim10').prop('checked', true); }
                                        else { $('#chk_dim10').prop('checked', false) }
                                    }

                                });
                            }
                        }
                    }
                },
                failure: function (response) {
                    /*alert(response.d);*/
                    alert('Problem in retreiving items...');
                }
            });
        //}
        $("#myModalNEW").modal('show');
    }
};

var SaveSetRow = function () {
    DimObject.do_savedimensionset();
};