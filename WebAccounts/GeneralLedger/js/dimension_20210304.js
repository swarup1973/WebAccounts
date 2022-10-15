
var DimObject = {
    dimensiondata: [{
        dimid: '',
        actionmode: '',
        userid: ''
    }],

    do_loaddimensionlist: () => {
        $.ajax({
            type: "POST",
            url: "dimension.aspx/doloaddimensionlist",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var resJson = JSON.parse(rest);
                //rolesloadfromdb = true;
                dopopulatedimensiontable(resJson.Table);
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
            data: "",
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

        var _data = '{dimsetid: "' + DimObject.dimensionsetdata.dimSetId + '"}';

        $.ajax({
            type: "POST",
            url: "dimensionsetnew.aspx/doloaddimensiondetails",
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

    do_savedimensionset: () => {
        dosavedimensionset();
    },

};

var dopopulatedimensiontable = function (dimensiondata) {
    var html = '';
    var visstyle = '';
    var htmlRoles = [];
    $('#tbl_data').html('');

    html += '<thead><tr>';
    html += '<th style="width: 18%">Code</th><th style="width: 25%">Name (Caption)</th>' +
        '<th style="width: 35%">Description</th><th style="width: 10%">Applicable for Access Control</th>' +
        '<th style="width: 10%">All Balance Sheet Ledgers</th><th style="width: 10%">All Income Ledgers</th>' +
        '<th style="width: 10%">All Expense Ledgers</th><th style="width: 10%">All Opening Ledgers</th>' +
        '<th style="width: 9%">Status</th> <th style="width: 25%">#Edit</th></tr ></thead > ';

    html += '<tbody>';

    if (dimensiondata.length == 0) html += '<tr><td clospan="10"> No Data Present </td></tr>';
    else {

        if (dimensiondata.length == 10) $('#btn_newdimension').hide();

        $.each(dimensiondata, function (key, value) {

            if (value.dimid == 1 && value.dimid == 2)
                visstyle = ' style="display:none;"';
            else
                visstyle = '';

            html += '<tr dimid="' + value.dimid + '"><td><a>' + value.dimCd + '</a></td><td>' + value.dimCaption + '</td>' +
                ' <td>' + value.dimDesc + '</td> <td>' + value.IsAcApp + '</td>'+
                ' <td>' + value.IsAppBSLedger + '</td> <td>' + value.IsAppIncomeLedger + '</td>'+
                ' <td>' + value.IsAppExpnsLedger + '</td> <td>' + value.IsAppOBLedger + '</td>';
            html += '<td><button type="button" class="btn btn-success btn-xs">' + value.enabled + '</button></td>';
            html += '<td>' +
                '<a class="btn btn-primary btn-xs" style="display:none;" > <i class="fa fa-folder"></i>View </a>' +
                '<a mode="edit" ' + visstyle + ' class="btn btn-info btn-xs" onclick=DimObject.do_OnRowDimension_onclick(this)><i class="fa fa-pencil"></i>Edit </a>' +
                '<a mode="delete" style="display:none;" class="btn btn-danger btn-xs" onclick=DimObject.do_OnRowDimension_onclick(this)><i class="fa fa-trash-o"></i>Delete </a>' +
                '</td></tr>';

        });
    }
    html += '</tbody>';
    $('#tbl_data').html(html);
};

var do_OnRowDimension_action = function () {
    if (DimObject.dimensiondata.actionmode == 'edit') {
        window.location.assign("dimensionnew.aspx?id=" + DimObject.dimensiondata.dimid);
    }
};

var dopopulatedimensionsettable = function (obj) {
    var html = '';
    var visstyle = '';
    $('#tbl_data').html('');
   
    var dimensionheader=[], dimensionsetdata=[];

    for (var i = 0; i < obj.length; i++) {
        var objnew = obj[i];
        for (var key in objnew) {
            var attrName = key;
            if (attrName.toLowerCase() == "table") {
                dimensionheader = objnew[key];
                console.log(dimensionheader);

                html += '<thead><tr>';
                html += '<th style="width: 9%">Code</th><th style="width: 9%">Name</th>' +
                    '<th style="width: 8%">' + dimensionheader[0].dim1 + '</th><th style="width: 8%">' + dimensionheader[0].dim2 +'</th>' +
                    '<th style="width: 8%">' + dimensionheader[0].dim3 + '</th><th style="width: 8%">' + dimensionheader[0].dim4 +'</th>' +
                    '<th style="width: 8%">' + dimensionheader[0].dim5 + '</th><th style="width: 8%">' + dimensionheader[0].dim6 +'</th>' +
                    '<th style="width: 8%">' + dimensionheader[0].dim7 + '</th><th style="width: 8%">' + dimensionheader[0].dim8 +'</th>' +
                    '<th style="width: 8%">' + dimensionheader[0].dim9 + '</th><th style="width: 8%">' + dimensionheader[0].dim10 +'</th>' +
                    '<th style="width: 5%">Status</th> <th style="width: 5%">#Edit</th></tr ></thead > ';

                html += '<tbody>';
            }
            if (attrName.toLowerCase() == "table1") {
                dimensionsetdata = objnew[key];
            }
        }
    }

    if (dimensionsetdata.length == 0) html += '<tr><td clospan="13"> No Data Present </td></tr>';
    else {

        $.each(dimensionsetdata, function (key, value) {

            /*if (value.dimid == 1 && value.dimid == 2)
                visstyle = ' style="display:none;"';
            else
                visstyle = '';*/

            html += '<tr dimSetId="' + value.dimSetId + '"><td><a>' + value.dimSetCode + '</a></td><td>' + value.dimSetName + '</td>' +
                ' <td>' + value.dim1_Branch + '</td> <td>' + value.dim2_Dept + '</td>' +
                ' <td>' + value.dim3 + '</td> <td>' + value.dim4 + '</td>' +
                ' <td>' + value.dim5 + '</td> <td>' + value.dim6 + '</td>' +
                ' <td>' + value.dim7 + '</td> <td>' + value.dim8 + '</td>' +
                ' <td>' + value.dim9 + '</td> <td>' + value.dim10 + '</td>';
            html += '<td><button type="button" class="btn btn-success btn-xs">' + value.enabled + '</button></td>';
            html += '<td>' +
                '<a class="btn btn-primary btn-xs" style="display:none;" > <i class="fa fa-folder"></i>View </a>' +
                '<a mode="edit" ' + visstyle + ' class="btn btn-info btn-xs" onclick=DimObject.do_OnRowDimensionSet_onclick(this)><i class="fa fa-pencil"></i>Edit </a>' +
                '<a mode="delete" style="display:none;" class="btn btn-danger btn-xs" onclick=DimObject.do_OnRowDimensionSet_onclick(this)><i class="fa fa-trash-o"></i>Delete </a>' +
                '</td></tr>';

        });
    }
    html += '</tbody>';
    $('#tbl_data').html(html);
};

var do_OnRowDimensionSet_action = function () {
    if (DimObject.dimensionsetdata.actionmode == 'edit') {
        window.location.assign("dimensionsetnew.aspx?id=" + DimObject.dimensionsetdata.dimSetId);
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
            url: "dimensionsetnew.aspx/docheckdimensioncode",
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
        var passdata = {
            data: ""
        };
        passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "dimensionsetnew.aspx/docheckdimensionset",
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

        var passdata = {
            data: ""
        };
        passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "dimensionsetnew.aspx/doSaveDimensionset",
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
