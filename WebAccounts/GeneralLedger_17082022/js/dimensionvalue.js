var x = 1,
    dimensionvaldtl = [];

$(document).ready(function () {
    //$("#tbldimensionvalues").hide();
    DimensionObject.do_loadDimensionModify();
    DimensionObject.do_getUserPagepermission();
});

var DimensionObject = {

    dimension: [{
        dimId: '',
        valueId: '',
        dimname: '',

         menuid: '',
        _createperm: false,
        _editperm: false,
        _deleteperm: false,

    }],

    dimensionvaluedata: [],

    do_loadDimensionModify: () => {
        if (queryString('menuid') != undefined || queryString("menuid") != null) {
            DimensionObject.menuid = queryString("menuid");
            localStorage.menu_id_premission = queryString("menuid");
        }

        if (queryString('id') != undefined || queryString("id") != null) {
            DimensionObject.dimension.dimId = queryString("id");
            DimensionObject.dimension.dimname = queryString("dimname");
            $('#h3').text("Dimension Value for" + " " + DimensionObject.dimension.dimname);

            var _data = '{dimid: "' + DimensionObject.dimension.dimId + '", valueid: "", cocd:"' + $("#ddlCompany").val() +'"}';

            $.ajax({
                type: "POST",
                url: "dimensionvalue.aspx/doloaddimensiondetails",
                data: _data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (result) {
                    if (!dochkses(result.d)) return;
                    var rest = result.d;
                    var obj = JSON.parse(`[${result.d}]`);
                    dopopulatedimensionvtable(obj);                    
                },
                failure: function (response) {
                    /*alert(response.d);*/
                    alert('Problem in retreiving items...');
                }
            });
        }
        else {
            //$('#txt_dimCd').removeAttr("disabled");
        }
    },

    do_savedimension: () => {
        dosavedimension();
    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(DimensionObject);
        if (queryString('menuid') != undefined || queryString("menuid") != null)
        {
            DimensionObject._createperm = MainObject.do_IsActionMenuPermission(DimensionObject.access, 'Dimension Value', 'create');
            DimensionObject._editperm = MainObject.do_IsActionMenuPermission(DimensionObject.access, 'Dimension Value', 'edit');
            DimensionObject._deleteperm = MainObject.do_IsActionMenuPermission(DimensionObject.access, 'Dimension Value', 'delete');
        }
    },
};


const dopopulatedimensionvtable = (obj) => {
    //insertEmptyRow();
    var html = "";
    var visstyle = "";
    var htmlRoles = [];
    $('#dimension_table_value').html('');    

    for (var i = 0; i < obj.length; i++) {
        var objnew = obj[i];
        for (var key in objnew) {
            var attrName = key;
            if (attrName.toLowerCase() == "table") {
                htmlRoles = objnew[key];
            }
        }
    }

    $("#dimension_table_value").append(
        "<thead><tr>"+
        "<th>Code</th><th>Name (Caption)</th>" +
        "<th>Description</th>" +
        "<th>Blocked</th></thead >"+
        "<tbody>"
    );


    $("#dimension_table_value").append("</tbody>");

    //ashim
    // editor init
    var editor = new $.fn.dataTable.Editor({
        table: "#dimension_table_value",
        fields: [
            { label: "Code", name: "valueCd" },
            { label: "Name(Caption)", name: "valueName" },
            { label: "Description", name: "valueDesc" },
            { label: "Blocked", name: "enabled" }
            //{ label: "Action", name: "AcId" },
        ],
    });
    const tableEl = $("#dimension_table_value");
    // datatables init
    //$('.selected').attr('id')
    //tableEl.DataTable({


    //tableEl.destroy();

    tableEl.dataTable({
        dom: "Bfrtip",
        fixedHeader: true,
        data: htmlRoles,
        columns: [
            { data: "valueCd" },
            { data: "valueName" },
            { data: "valueDesc" },
            { data: "enabled" },
        ],
        select: true,
        buttons: [
            {
                add: "create", text: 'New', editor: editor, action: () => showmodaledit("N", $('.selected').attr('dimid'), $('.selected').attr('valueid')),
                attr: {
                    title: 'New',
                    id: 'New',
                }
            },

            {
                add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit("E", $('.selected').attr('dimid'), $('.selected').attr('valueid')),
                attr: {
                    title: 'Edit',
                    id: 'edit',
                }
            },
            {
                extend: "remove", editor: editor, action: () => deleteRow("D", $('.selected').attr('dimid'), $('.selected').attr('valueid')),
                attr: {
                    title: 'Delete',
                    id: 'delete',
                }
            },

        ],
        createdRow: function (row, data, dataIndex) {
            $(row).attr("dimid", `${data.dimId}`);
            $(row).attr("valueid", `${data.valueId}`);
            if (DimensionObject.dimension.dimname == null || DimensionObject.dimension.dimname == undefined) {
                $('#h3').text("Dimension Value for" + " " + `${data.dimCaption}`);
            }
        },
    });    
    //end
    var table = $('#dimension_table_value').DataTable();
    table.on('select', function () {
        var selectedRows = table.rows({
            selected: true
        }).count();
        if (selectedRows == 1) {
            if (!DimensionObject._deleteperm[0]) {
                $('#delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                $('#delete').prop("disabled", true);
                $('#delete').attr('title', 'do not have delete permission!!!');
                table.button(2).action(function () {
                    this.active(false);
                    //this.disable();
                });
            }
        }

    });

    if (!DimensionObject._createperm[0]) {
        $('#New').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#New').prop("disabled", true);
        $('#New').attr('title', 'do not have permission to add dimension Value!!!');
        table.button(0).action(function () {
            this.active(false);
        });
    }
    if (!DimensionObject._editperm[0]) {
        $('#edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#edit').prop("disabled", true);
        $('#edit').attr('title', 'do not have permission to Edit dimension Value!!!');
        table.button(1).action(function () {
            this.active(false);
        });
    }
    if (!DimensionObject._deleteperm[0]) {
        $('#delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#delete').prop("disabled", true);
        $('#delete').attr('title', 'do not have delete permission!!!');
        table.button(1).action(function () {
            this.active(false);
        });
    }
};

var deleteRow = function (mode, dimid, valueid) {

    
    var _data = '{dimid: "' + dimid + '", valueid: "' + valueid + '"}';

    if (confirm("Are you sure want to delete?")) {
        $.ajax({
            type: "POST",
            url: "dimensionvalue.aspx/dodeletedimensiondetails",
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

var showmodaledit = function (mode, dimid, valueid) {
    
    if (mode == "E") {
        $("#h5").text('Edit Dimension Value');
        $("#divvalblock").show();
        if (dimid == undefined || dimid == null) {
            alert('Please select the row...');
            return;
        }
        DimensionObject.dimension.dimId = dimid;
        DimensionObject.dimension.valueId = valueid;
        
        var _data = '{dimid: "' + DimensionObject.dimension.dimId + '", valueid: "' + DimensionObject.dimension.valueId + '", cocd:"' + $("#ddlCompany").val() +'"}';

        $.ajax({
            type: "POST",
            url: "dimensionvalue.aspx/doloaddimensiondetails",
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
                                $('#dmvalcode').val(objnew[key][0].valueCd);
                                $('#dmvalname').val(objnew[key][0].valueName);
                                $('#dmvalDept').val(objnew[key][0].valueDesc);
                                if (objnew[key][0].enabled == 1) $('#chkBlock').prop('checked', true);
                            }
                        }
                    }
                }

                $("#myModalEDIT").modal('show');
            },
            failure: function (response) {
                /*alert(response.d);*/
                alert('Problem in retreiving items...');
            }
        });
    }
    if (mode == "N") {
        $("#dmTitle").text('Add New Dimension Value');
        $('#dmvalcode').val('');
        $('#dmvalname').val('');
        $('#dmvalDept').val('');
        $('#chkBlock').prop('checked', false);
        $("#divvalblock").hide();
        $("#myModalEDIT").modal('show');
    }
};

var SaveRow = function () {
    DimensionObject.do_savedimension();
};

function getRow() {
    // here you need to return the value
    // to be available when function was called
    return $('table > tbody > tr.selected');
}

var dosavedimension = function () {
    var validate = true;

    if ($('#dmvalcode').val() == '') {
        validate = false;
        alert('Dimension value code required.');
        $('#dmvalcode').focus();
        return false;
    }

    if (validate == true) {
        var _data = {};
        _data["dimId"] = DimensionObject.dimension.dimId;
        _data["valueId"] = DimensionObject.dimension.valueId;
        _data["valueCd"] = $('#dmvalcode').val().trim();
        _data["valueCaption"] = $('#dmvalname').val();
        _data["valueDesc"] = $('#dmvalDept').val();
        _data["enabled"] = $('#chkBlock').is(":checked");
        _data["cocd"] = $("#ddlCompany").val();

        var passdata = {
            data: ""
        };
        passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "dimensionvalue.aspx/doSaveDimensionvalue",
            data: JSON.stringify(passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") {
                    //DimObject.dimensiondata.dimId = "";
                    alert("Dimension saved successfully."); window.location = "dimensionvalue.aspx?id=" + DimensionObject.dimension.dimId;
                }
                else { alert("Problem in saving data...\n Please Try Again."); }
            },
            failure: function (response) {
                /*alert(response.d);*/
                alert('Problem in saving data...');
            }
        });
    }
};