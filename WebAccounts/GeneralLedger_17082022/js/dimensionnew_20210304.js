var x = 1,
    dimensionvaldtl = [];

$(document).ready(function () {
    $('#btn_cancel').on('click', function () {
        DimensionObject.dimension.dimId = '';
        window.location.href = "dimension.aspx";
    });
    $('#btn_save').on('click', function () {
        if (queryString('id') != undefined || queryString("id") != null) {
            DimensionObject.dimension.dimId = queryString("id");
        }
        else {
            DimensionObject.dimension.dimId = '';
        }

        DimensionObject.do_savedimension();
    });
    $("#tbldimensionvalues").hide();
    DimensionObject.do_loadDimensionModify();
});

var DimensionObject = {

    dimension: [{
        dimId: ''
    }],

    dimensionvaluedata: [],

    do_savedimension: () => {
        dosavedimension();
    },

    do_loadDimensionModify: () => {

        if (queryString('id') != undefined || queryString("id") != null) {
            DimensionObject.dimension.dimId = queryString("id");

            $('#txt_dimCd').attr('disabled', 'disabled');

            var _data = '{dimid: "' + DimensionObject.dimension.dimId + '"}';

            $.ajax({
                type: "POST",
                url: "dimensionnew.aspx/doloaddimensiondetails",
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
                                    $('#txt_dimCd').val(objnew[key][0].dimCd);
                                    $('#txt_dimCaption').val(objnew[key][0].dimCaption);
                                    $('#txt_dimDesc').val(objnew[key][0].dimDesc);

                                    if (objnew[key][0].IsAcApp == 1) $('#chk_IsAcApp').prop('checked', true);
                                    if (objnew[key][0].IsAppBSLedger == 1) $('#chk_IsAppBSLedger').prop('checked', true);
                                    if (objnew[key][0].IsAppIncomeLedger == 1) $('#chk_IsAppIncomeLedger').prop('checked', true);
                                    if (objnew[key][0].IsAppExpnsLedger == 1) $('#chk_IsAppExpnsLedger').prop('checked', true);
                                    if (objnew[key][0].IsAppOBLedger == 1) $('#chk_IsAppOBLedger').prop('checked', true);
                                    if (objnew[key][0].enabled == 1) $('#chk_Isenabled').prop('checked', true);

                                }
                            }
                            if (attrName.toLowerCase() == "table1") {//dimensionvaldetails
                                generateDimensionvalList(objnew[key]);
                            }
                        }
                    }
                },
                failure: function (response) {
                    /*alert(response.d);*/
                    alert('Problem in retreiving items...');
                }
            });
        }
        else {
            $('#txt_dimCd').removeAttr("disabled");
        }
    },

};

var generateDimensionvalList = function (arraydimval) {
    var html = '';

    $.each(arraydimval, function (k, item) {
        let i = item.serial;
        x = i;
        html += "<tr id=" + i + "><td><label>Code: </label></td><td><input type='text' maxlength='30' placeholder='Code' onBlur='checkvalcode(this);' value='" + item.valueCd + "' name='txtvalcode" + i + "' id='txtvalcode" + i + "'></td>" +
            "<td><label>Name: </label> </td><td><input type='text' maxlength='120' placeholder='Name(Caption)'  style='width: 550px !important;' value='" + item.valueName + "' id='txtvalname" + i + "'></td>" +
            "<td><label>Description: </label></td><td> <input type='text' maxlength='120' placeholder='Description' style=' width: 550px;' value='" + item.valueDesc + "' id='txtvaldescription" + i + "'></td>" +
            "<td> <label>Enable: </label></td>";
        if (item.enabled == 1)
            html += "<td><input type='checkbox' checked='checked' id='chk_valblocked" + i + "' value='' ></td>";
        else
            html += "<td><input type='checkbox' id='chk_valblocked" + i + "' value='' ></td>";

        html += "<td><i class='fa fa-trash fa-2x' aria-hidden='true' title='Click here to delete' onclick ='deleteRow(" + i + ")'></i></td></tr > ";

    });

    $('#tbldimensionvalues').append(html);
    if ($("#tbldimensionvalues tr").length > 0) $("#tbldimensionvalues").show(); x = x + 1;
}

var appendRow = function () {
    var i = x++;
    $('#tbldimensionvalues').append("<tr id=" + i + "><td><label>Code: </label></td><td><input type='text' maxlength='30' placeholder='Code' onBlur='checkvalcode(this);' name='txtvalcode" + i + "' id='txtvalcode" + i + "'></td>" +
        "<td><label>Name: </label> </td><td><input type='text' maxlength='120' placeholder='Name(Caption)'  style='width: 550px !important;' id='txtvalname" + i + "'></td>" +
        "<td><label>Description: </label></td><td> <input type='text' maxlength='120' placeholder='Description' style=' width: 550px;' id='txtvaldescription" + i + "'></td>" +
        "<td> <label>Enable: </label></td><td><input type='checkbox' id='chk_valblocked" + i + "' value='' ></td>" +
        "<td><i class='fa fa-trash fa-2x' aria-hidden='true' title='Click here to delete' onclick ='deleteRow(" + i + ")'></i></td></tr > ");
    if ($("#tbldimensionvalues tr").length > 0) $("#tbldimensionvalues").show();
    $('#txtvalcode' + i).focus();
};

var deleteRow = function (id) {
    /*$('#tbldimensionvalues tr').each(function () {
        console.log(this.id)
    })*/

    if (confirm("Are you sure wat to delete?")) {
        $('#' + id).remove();
        if ($("#tbldimensionvalues tr").length == 0) $("#tbldimensionvalues").hide();

    }
    return false;
};

function checkvalcode(obj) {
    var ids = [];
    $('#tbldimensionvalues input[name*="txtvalcode"]').each(function () {
        //ids.push($(this).attr('id') + '   value: ' + $('#' + $(this).attr('id')).val());
        ids.push($(this).attr('id'));
    });


    $.each(ids, function (index, value) {
        if (obj.id != value) {
            if ($('#' + obj.id).val().trim() != '' && $('#' + value).val().trim() != '') {
                if ($('#' + obj.id).val().trim().toLowerCase() == $('#' + value).val().trim().toLowerCase()) {
                    alert('Code already exists. Try another code');
                    $('#' + obj.id).val('');
                    $('#' + obj.id).focus();
                }
            }
        }
    });

}

var dosavedimension = function () {

    var validate = true;

    if ($('#txt_dimCd').val() == '') {
        validate = false;
        alert('Dimension code required.');
        $('#txt_dimCd').focus();
        return false;
    }
    else {
        var _data = '{dimId: "' + DimensionObject.dimension.dimId + '", dimCd: "' + encodeURIComponent($('#txt_dimCd').val().trim()) + '"}';

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
    }

    DimensionObject.dimensionvaluedata = [];
    $('#tbldimensionvalues tr').each(function () {
        let _trid = this.id;
        if ($('#txtvalcode' + _trid).val().trim() == '') {
            validate = false;
            alert('Dimension value code required.');
            $('#txtvalcode' + _trid).focus();
            return false;
        }
        else {
            DimensionObject.dimensionvaluedata.push({
                "srl": _trid,
                "code": $('#txtvalcode' + _trid).val().trim(),
                "name": $('#txtvalname' + _trid).val().trim(),
                "description": $('#txtvaldescription' + _trid).val().trim(),
                "enabled": $('#chk_valblocked' + _trid).is(":checked")
            });
        }
    });

    //console.log(DimensionObject.dimensionvaluedata);

    //return;

    if (validate == true) {
        var _data = {};
        _data["dimId"] = DimensionObject.dimension.dimId;
        _data["dimCd"] = $('#txt_dimCd').val().trim();
        _data["dimCaption"] = $('#txt_dimCaption').val();
        _data["dimDesc"] = $('#txt_dimDesc').val();
        _data["IsAcApp"] = $('#chk_IsAcApp').is(":checked");
        _data["IsAppBSLedger"] = $('#chk_IsAppBSLedger').is(":checked");
        _data["IsAppIncomeLedger"] = $('#chk_IsAppIncomeLedger').is(":checked");
        _data["IsAppExpnsLedger"] = $('#chk_IsAppExpnsLedger').is(":checked");
        _data["IsAppOBLedger"] = $('#chk_IsAppOBLedger').is(":checked");
        _data["enabled"] = $('#chk_Isenabled').is(":checked");
        _data["dimensionvaldtls"] = JSON.stringify(DimensionObject.dimensionvaluedata);

        var passdata = {
            data: ""
        };
        passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "dimensionnew.aspx/doSaveDimension",
            data: JSON.stringify(passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") { DimensionObject.dimension.dimId = ""; alert("Dimension saved successfully."); window.location = "dimension.aspx"; }
                else { alert("Problem in saving data...\n Please Try Again."); }
            },
            failure: function (response) {
                /*alert(response.d);*/
                alert('Problem in saving data...');
            }
        });
    }
};

