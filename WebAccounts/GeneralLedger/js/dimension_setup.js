$(document).ready(function () {
    
    var ipaddress = "";
    if (localStorage.BankAccount_dimension_BankName != undefined && localStorage.BankAccount_dimension_AcNumber != "undefined") {
        BankAccount.acNumber = localStorage.BankAccount_dimension_AcNumber;
        BankAccount.bankName = localStorage.BankAccount_dimension_BankName ;
    }
    else {
        BankAccount.bankName = '';
        BankAccount.acNumber = '';
    }


   
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);


    if (queryString('menuid') != undefined || queryString("menuid") != null)
    {
        DimSetup.menuid = queryString("menuid");
        localStorage.menu_id_premission = queryString("menuid");
    }

    DimSetup.do_getUserPagepermission();

});
var DimSetup = {
    dimsetupdata: [{
        pageid: '',
        rowid: '',
        bankcd:'',
        actionmode: '',
        dim1_chk: false,
        dim1_val: '',
        dim2_chk: false,
        dim2_val: '',
        dim3_chk: false,
        dim3_val: '',
        dim4_chk: false,
        dim4_val: '',
        dim5_chk: false,
        dim5_val: '',
        dim6_chk: false,
        dim6_val: '',
        dim7_chk: false,
        dim7_val: '',
        dim8_chk: false,
        dim8_val: '',
        dim9_chk: false,
        dim9_val: '',
        dim10_chk: false,
        dim10_val: '',
        createdby: '',
        creator_mac_add: '',
        cocd: '',
        _createperm: false,
        menuid: '',
    }],

    do_init: () => {
        localStorage.removeItem("DimSetup_lookup");
        DimSetup.dimsetupdata.pageid = '128_dim';
        DimSetup.lookup.do_loadlookup();
        DimSetup.lookup.do_fillCombo();

        
        if (queryString('id') != undefined || queryString("id") != null) {
            DimSetup.dimsetupdata.rowid = queryString("id");
            if (DimSetup.dimsetupdata.rowid == "0") {
                DimSetup.onchangedimType();
            }
            else {
                DimSetup.do_loaddimSetupData();
                DimSetup.onchangedimType();
            }
        } else {
            DimSetup.onchangedimType();
        }

        $('#bankName').text(BankAccount.bankName);
        $('#acNumber').text(BankAccount.acNumber);
    },

    lookup: {
        iscache: false,
       
        dimension_table: [{
            dim1id: '',
            dim1: '',
            dim2id: '',
            dim2: '',
            dim3id: '',
            dim3: '',
            dim4id: '',
            dim4: '',
            dim5id: '',
            dim5: '',
            dim6id: '',
            dim6: '',
            dim7id: '',
            dim7: '',
            dim8id: '',
            dim8: '',
            dim9id: '',
            dim9: '',
            dim10id: '',
            dim10: ''
        }],
        dimensionValue: [{
            valueId: '',
            valueCd: '',
            dimid: '',
            valueName: '',
            valueDesc: ''
        }],

        dimensionSet: [{
            dimSetId: '',
            dimSetCode: '',
            dimSetName: ''
        }],

        do_loadlookup: () => {
            if (localStorage.DimSetup_lookup == undefined || localStorage.DimSetup_lookup == "undefined") {
                $.ajax({
                    type: "POST",
                    async: false,
                    url: "chartofacct.aspx/loadlookupdata",
                    data: JSON.stringify({ CoCd: $("#ddlCompany").val() }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (!dochkses(result.d)) return;
                        var obj = JSON.parse(`[${result.d}]`);

                        for (var i = 0; i < obj.length; i++) {
                            var objnew = obj[i];
                            for (var key in objnew) {
                                var attrName = key;
                               
                                if (attrName.toLowerCase() == "table3") {//dimension_table
                                    DimSetup.lookup.dimension_table = objnew[key];
                                }
                                if (attrName.toLowerCase() == "table4") {//dimensionValue
                                    DimSetup.lookup.dimensionValue = objnew[key];
                                }
                                if (attrName.toLowerCase() == "table5") {//dimensionset
                                    DimSetup.lookup.dimensionSet = objnew[key];
                                }
                            }
                            DimSetup.lookup.iscache = true;
                            localStorage.DimSetup_lookup = JSON.stringify(DimSetup.lookup);
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status + " - Error occurred");
                    }
                });
            }
            else {
                var lookup_object = JSON.parse(localStorage.DimSetup_lookup);
                DimSetup.lookup.iscache = true;
                DimSetup.lookup.dimension_table = lookup_object.dimension_table;
                DimSetup.lookup.dimensionValue = lookup_object.dimensionValue;
                DimSetup.lookup.dimensionSet = lookup_object.dimensionSet;
            }
        },

        do_fillCombo: () => {
            var lookup_object = JSON.parse(localStorage.DimSetup_lookup);
           
            DimSetup.lookup.dimension_table = lookup_object.dimension_table;
            DimSetup.lookup.dimensionValue = lookup_object.dimensionValue;
            DimSetup.lookup.dimensionSet = lookup_object.dimensionSet;

            var _html = [];
            
            $.each(DimSetup.lookup.dimension_table, function (key, value) {
                $('#lbl_dimension_1').html(value.dim1);
                $('#lbl_dimension_2').html(value.dim2);
                $('#lbl_dimension_3').html(value.dim3);
                $('#lbl_dimension_4').html(value.dim4);
                $('#lbl_dimension_5').html(value.dim5);
                $('#lbl_dimension_6').html(value.dim6);
                $('#lbl_dimension_7').html(value.dim7);
                $('#lbl_dimension_8').html(value.dim8);
                $('#lbl_dimension_9').html(value.dim9);
                $('#lbl_dimension_10').html(value.dim10);
            });

            // console.log(val_dim1);

            /*$.map(DimSetup.lookup.dimensionValue, function (elementOfArray, indexInArray) {
                if (elementOfArray.rowid != "") {
                    $("#dd_grouprangefrom_" + elementOfArray.rowid).val(elementOfArray.grprangefrom);
                }
            });*/
        },

    

    },

    do_disabledformodeview: () => {
        if (queryString('mode') != undefined || queryString("mode") != null) {
            if (queryString('mode') == 'v') {
                //$(".container :input").prop("disabled", true);
                $('#btn_cancel').prop("disabled", false);
                $('#btn_save').hide();
            }
        }
    },

    do_loaddimSetupData: () => {

        if (queryString('id') != undefined || queryString("id") != null) {
            DimSetup.dimsetupdata.rowid = queryString("id");
        }
        else {
            window.location.href = "dimension_setup.aspx";
        }

        var _data = '{rowid: "' + DimSetup.dimsetupdata.rowid + '", cocd:"' + $("#ddlCompany").val() +'"}';

        $.ajax({
            type: "POST",
            url: "dimension_setup.aspx/doloadDimSetupData",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;

                var obj = JSON.parse(`[${result.d}]`);

                //var _grouprangefrom = '';

                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = key;
                        if (attrName.toLowerCase() == "table") {
                            if (objnew[key].length > 0) {
                                
                                $('.title_left').html('<h3>Setup (' + $('#dd_AcTypeCd option:selected').text() + ')</h3>');
                                DimSetup.dimsetupdata.dim1_chk = objnew[key][0].dim1_Branch;
                                DimSetup.dimsetupdata.dim1_val = objnew[key][0].dim1DefValue;
                                DimSetup.dimsetupdata.dim2_chk = objnew[key][0].dim2_Dept;
                                DimSetup.dimsetupdata.dim2_val = objnew[key][0].dim2DefValue;
                                DimSetup.dimsetupdata.dim3_chk = objnew[key][0].dim3;
                                DimSetup.dimsetupdata.dim3_val = objnew[key][0].dim3DefValue;
                                DimSetup.dimsetupdata.dim4_chk = objnew[key][0].dim4;
                                DimSetup.dimsetupdata.dim4_val = objnew[key][0].dim4DefValue;
                                DimSetup.dimsetupdata.dim5_chk = objnew[key][0].dim5;
                                DimSetup.dimsetupdata.dim5_val = objnew[key][0].dim5DefValue;
                                DimSetup.dimsetupdata.dim6_chk = objnew[key][0].dim6;
                                DimSetup.dimsetupdata.dim6_val = objnew[key][0].dim6DefValue;
                                DimSetup.dimsetupdata.dim7_chk = objnew[key][0].dim7;
                                DimSetup.dimsetupdata.dim7_val = objnew[key][0].dim7DefValue;
                                DimSetup.dimsetupdata.dim8_chk = objnew[key][0].dim8;
                                DimSetup.dimsetupdata.dim8_val = objnew[key][0].dim8DefValue;
                                DimSetup.dimsetupdata.dim9_chk = objnew[key][0].dim9;
                                DimSetup.dimsetupdata.dim9_val = objnew[key][0].dim9DefValue;
                                DimSetup.dimsetupdata.dim10_chk = objnew[key][0].dim10;
                                DimSetup.dimsetupdata.dim10_val = objnew[key][0].dim10DefValue;
                            }
                        }
                        
                    }
                }
            },
            failure: function (response) {
                /*$.alertable.alert(response.d);*/
                $.alertable.alert('Problem in retreiving items...');
            }
        });

        DimSetup.do_disabledformodeview();
    },

    onchangedimType: () => {

        var lookup_object = JSON.parse(localStorage.DimSetup_lookup);
        //DimSetup.lookup.dimension_table = lookup_object.dimension_table;
        DimSetup.lookup.dimensionValue = lookup_object.dimensionValue;
        DimSetup.lookup.dimensionSet = lookup_object.dimensionSet;

        var _html = [];

        //if ($('#chk_dimType').is(":checked")) {
            $('input[id^=dimension_]').attr("disabled", false);
            $('input[id^=dimension_]').removeAttr("disabled");

            $('select[id^=dddimvale_]').attr("disabled", false);

            $('#dd_dimensionset').empty();
            $('#dd_dimensionset').attr("disabled", true);

            var myArray = DimSetup.lookup.dimensionValue;

            var val_dim1 = myArray.filter((x) => { return x.dimid === 1; });
            _html = [];
            $.each(val_dim1, function (key, value) {
                _html.push("<option value='" + $.trim(value.valueId) + "'>" + $.trim(value.valueCd) + " (" + value.valueName + ")</option>");
            });
            $('#dddimvale_1').html(_html.join(''));
            $("#dddimvale_1").prepend("<option value='0'></option>");
            $('#dimension_1_checkbox').prop('checked', DimSetup.dimsetupdata.dim1_chk);
            $('#dddimvale_1').val(DimSetup.dimsetupdata.dim1_val);

            if ($('#dimension_1_checkbox').is(":checked")) {
                $('#dddimvale_1').attr("disabled", false);
                $('#dddimvale_1').removeAttr("disabled");
            }
            else {
                $('#dddimvale_1').attr("disabled", true);
                $('#dddimvale_1').val('');
            }

            var val_dim2 = myArray.filter((x) => { return x.dimid === 2; });
            _html = [];
            $.each(val_dim2, function (key, value) {
                _html.push("<option value='" + $.trim(value.valueId) + "'>" + $.trim(value.valueCd) + " (" + value.valueName + ")</option>");
            });
            $('#dddimvale_2').html(_html.join(''));
            $("#dddimvale_2").prepend("<option value='0'></option>");
            $('#dimension_2_checkbox').prop('checked', DimSetup.dimsetupdata.dim2_chk);
            $('#dddimvale_2').val(DimSetup.dimsetupdata.dim2_val);

            if ($('#dimension_2_checkbox').is(":checked")) {
                $('#dddimvale_2').attr("disabled", false);
                $('#dddimvale_2').removeAttr("disabled");
            }
            else {
                $('#dddimvale_2').attr("disabled", true);
                $('#dddimvale_2').val('');
            }

            var val_dim3 = myArray.filter((x) => { return x.dimid === 3; });
            _html = [];
            $.each(val_dim3, function (key, value) {
                _html.push("<option value='" + $.trim(value.valueId) + "'>" + $.trim(value.valueCd) + " (" + value.valueName + ")</option>");
            });
            $('#dddimvale_3').html(_html.join(''));
            $("#dddimvale_3").prepend("<option value='0'></option>");
            $('#dimension_3_checkbox').prop('checked', DimSetup.dimsetupdata.dim3_chk);
            $('#dddimvale_3').val(DimSetup.dimsetupdata.dim3_val);

            if ($('#dimension_3_checkbox').is(":checked")) {
                $('#dddimvale_3').attr("disabled", false);
                $('#dddimvale_3').removeAttr("disabled");
            }
            else {
                $('#dddimvale_3').attr("disabled", true);
                $('#dddimvale_3').val('');
            }

            var val_dim4 = myArray.filter((x) => { return x.dimid === 4; });
            _html = [];
            $.each(val_dim4, function (key, value) {
                _html.push("<option value='" + $.trim(value.valueId) + "'>" + $.trim(value.valueCd) + " (" + value.valueName + ")</option>");
            });
            $('#dddimvale_4').html(_html.join(''));
            $("#dddimvale_4").prepend("<option value='0'></option>");
            $('#dimension_4_checkbox').prop('checked', DimSetup.dimsetupdata.dim4_chk);
            $('#dddimvale_4').val(DimSetup.dimsetupdata.dim4_val);

            if ($('#dimension_4_checkbox').is(":checked")) {
                $('#dddimvale_4').attr("disabled", false);
                $('#dddimvale_4').removeAttr("disabled");
            }
            else {
                $('#dddimvale_4').attr("disabled", true);
                $('#dddimvale_4').val('');
            }

            var val_dim5 = myArray.filter((x) => { return x.dimid === 5; });
            _html = [];
            $.each(val_dim5, function (key, value) {
                _html.push("<option value='" + $.trim(value.valueId) + "'>" + $.trim(value.valueCd) + " (" + value.valueName + ")</option>");
            });
            $('#dddimvale_5').html(_html.join(''));
            $("#dddimvale_5").prepend("<option value='0'></option>");
            $('#dimension_5_checkbox').prop('checked', DimSetup.dimsetupdata.dim5_chk);
            $('#dddimvale_5').val(DimSetup.dimsetupdata.dim5_val);

            if ($('#dimension_5_checkbox').is(":checked")) {
                $('#dddimvale_5').attr("disabled", false);
                $('#dddimvale_5').removeAttr("disabled");
            }
            else {
                $('#dddimvale_5').attr("disabled", true);
                $('#dddimvale_5').val('');
            }

            var val_dim6 = myArray.filter((x) => { return x.dimid === 6; });
            _html = [];
            $.each(val_dim6, function (key, value) {
                _html.push("<option value='" + $.trim(value.valueId) + "'>" + $.trim(value.valueCd) + " (" + value.valueName + ")</option>");
            });
            $('#dddimvale_6').html(_html.join(''));
            $("#dddimvale_6").prepend("<option value='0'></option>");
            $('#dimension_6_checkbox').prop('checked', DimSetup.dimsetupdata.dim6_chk);
            $('#dddimvale_6').val(DimSetup.dimsetupdata.dim6_val);

            if ($('#dimension_6_checkbox').is(":checked")) {
                $('#dddimvale_6').attr("disabled", false);
                $('#dddimvale_6').removeAttr("disabled");
            }
            else {
                $('#dddimvale_6').attr("disabled", true);
                $('#dddimvale_6').val('');
            }

            var val_dim7 = myArray.filter((x) => { return x.dimid === 7; });
            _html = [];
            $.each(val_dim7, function (key, value) {
                _html.push("<option value='" + $.trim(value.valueId) + "'>" + $.trim(value.valueCd) + " (" + value.valueName + ")</option>");
            });
            $('#dddimvale_7').html(_html.join(''));
            $("#dddimvale_7").prepend("<option value='0'></option>");
            $('#dimension_7_checkbox').prop('checked', DimSetup.dimsetupdata.dim7_chk);
            $('#dddimvale_7').val(DimSetup.dimsetupdata.dim7_val);

            if ($('#dimension_7_checkbox').is(":checked")) {
                $('#dddimvale_7').attr("disabled", false);
                $('#dddimvale_7').removeAttr("disabled");
            }
            else {
                $('#dddimvale_7').attr("disabled", true);
                $('#dddimvale_7').val('');
            }

            var val_dim8 = myArray.filter((x) => { return x.dimid === 8; });
            _html = [];
            $.each(val_dim8, function (key, value) {
                _html.push("<option value='" + $.trim(value.valueId) + "'>" + $.trim(value.valueCd) + " (" + value.valueName + ")</option>");
            });
            $('#dddimvale_8').html(_html.join(''));
            $("#dddimvale_8").prepend("<option value='0'></option>");
            $('#dimension_8_checkbox').prop('checked', DimSetup.dimsetupdata.dim8_chk);
            $('#dddimvale_8').val(DimSetup.dimsetupdata.dim8_val);

            if ($('#dimension_8_checkbox').is(":checked")) {
                $('#dddimvale_8').attr("disabled", false);
                $('#dddimvale_8').removeAttr("disabled");
            }
            else {
                $('#dddimvale_8').attr("disabled", true);
                $('#dddimvale_8').val('');
            }

            var val_dim9 = myArray.filter((x) => { return x.dimid === 9; });
            _html = [];
            $.each(val_dim9, function (key, value) {
                _html.push("<option value='" + $.trim(value.valueId) + "'>" + $.trim(value.valueCd) + " (" + value.valueName + ")</option>");
            });
            $('#dddimvale_9').html(_html.join(''));
            $("#dddimvale_9").prepend("<option value='0'></option>");
            $('#dimension_9_checkbox').prop('checked', DimSetup.dimsetupdata.dim9_chk);
            $('#dddimvale_9').val(DimSetup.dimsetupdata.dim9_val);

            if ($('#dimension_9_checkbox').is(":checked")) {
                $('#dddimvale_9').attr("disabled", false);
                $('#dddimvale_9').removeAttr("disabled");
            }
            else {
                $('#dddimvale_9').attr("disabled", true);
                $('#dddimvale_9').val('');
            }

            var val_dim10 = myArray.filter((x) => { return x.dimid === 10; });
            _html = [];
            $.each(val_dim10, function (key, value) {
                _html.push("<option value='" + $.trim(value.valueId) + "'>" + $.trim(value.valueCd) + " (" + value.valueName + ")</option>");
            });
            $('#dddimvale_10').html(_html.join(''));
            $("#dddimvale_10").prepend("<option value='0'></option>");
            $('#dimension_10_checkbox').prop('checked', DimSetup.dimsetupdata.dim10_chk);
            $('#dddimvale_10').val(DimSetup.dimsetupdata.dim10_val);

            if ($('#dimension_10_checkbox').is(":checked")) {
                $('#dddimvale_10').attr("disabled", false);
                $('#dddimvale_10').removeAttr("disabled");
            }
            else {
                $('#dddimvale_10').attr("disabled", true);
                $('#dddimvale_10').val('');
            }
        //}
        //else {
        //    $('#chk_dimType').prop('checked', false);
        //    // $('input[id^=dimension_]').prop('checked', $(this).is(':checked'));
        //    $('input[id^=dimension_]').attr("disabled", true);
        //    $('input[id^=dimension_]').prop('checked', false);

        //    $('select[id^=dddimvale_]').attr("disabled", true);
        //    $('select[id^=dddimvale_]').empty();

        //    $('#dd_dimensionset').attr("disabled", false);

        //    _html = [];
        //    $.each(DimSetup.lookup.dimensionSet, function (key, value) {
        //        _html.push("<option value='" + $.trim(value.dimSetId) + "'>" + $.trim(value.dimSetCode) + " (" + value.dimSetName + ")</option>");
        //    });
        //    $('#dd_dimensionset').html(_html.join(''));
        //    $("#dd_dimensionset").prepend("<option value='0'></option>");
        //    $('#dd_dimensionset').val(DimSetup.dimsetupdata.dimensionsetval);

        //}
    },

    onchangeDimension: (obj) => {
        if ($('#' + obj.id).is(":checked")) {
            $('#' + $('#' + obj.id).attr("for")).attr("disabled", false);
            $('#' + $('#' + obj.id).attr("for")).removeAttr("disabled");
        }
        else {
            $('#' + $('#' + obj.id).attr("for")).attr("disabled", true);
            $('#' + $('#' + obj.id).attr("for")).val('');
        }
    },

    dosaveDimSetup: () => {
        var validate = true;

        //var _createperm = MainObject.do_IsActionMenuPermission('', DimSetup.dimsetupdata.pageid, 'edit');
        //if (!_createperm) { $.alertable.alert('You have no permission to edit data.'); validate = false; return; }

        
        //var _dimensionset = '';
        //if ($('#dd_dimensionset').val() != 'null' && $('#dd_dimensionset').val() != null) { _dimensionset = $('#dd_dimensionset').val(); }
        var _data = {};
        if (validate == true) {
            _data["rowid"] = DimSetup.dimsetupdata.rowid;
           // _data["bankcd"] = $('#txt_AcCd').val().trim();
            
          //  _data["dimensionset"] = _dimensionset;

            _data["dim1_Branch"] = $('#dimension_1_checkbox').is(":checked");
            var _dim1DefValue = '';
            if ($('#dddimvale_1').val() != 'null' && $('#dddimvale_1').val() != null) _dim1DefValue = $('#dddimvale_1').val();
            _data["dim1DefValue"] = _dim1DefValue;

            _data["dim2_Dept"] = $('#dimension_2_checkbox').is(":checked");
            var _dim2DefValue = '';
            if ($('#dddimvale_2').val() != 'null' && $('#dddimvale_2').val() != null) _dim2DefValue = $('#dddimvale_2').val();
            _data["dim2DefValue"] = _dim2DefValue;

            _data["dim3"] = $('#dimension_3_checkbox').is(":checked");
            var _dim3DefValue = '';
            if ($('#dddimvale_3').val() != 'null' && $('#dddimvale_3').val() != null) _dim3DefValue = $('#dddimvale_3').val();
            _data["dim3DefValue"] = _dim3DefValue;

            _data["dim4"] = $('#dimension_4_checkbox').is(":checked");
            var _dim4DefValue = '';
            if ($('#dddimvale_4').val() != 'null' && $('#dddimvale_4').val() != null) _dim4DefValue = $('#dddimvale_4').val();
            _data["dim4DefValue"] = _dim4DefValue;

            _data["dim5"] = $('#dimension_5_checkbox').is(":checked");
            var _dim5DefValue = '';
            if ($('#dddimvale_5').val() != 'null' && $('#dddimvale_5').val() != null) _dim5DefValue = $('#dddimvale_5').val();
            _data["dim5DefValue"] = _dim5DefValue;

            _data["dim6"] = $('#dimension_6_checkbox').is(":checked");
            var _dim6DefValue = '';
            if ($('#dddimvale_6').val() != 'null' && $('#dddimvale_6').val() != null) _dim6DefValue = $('#dddimvale_6').val();
            _data["dim6DefValue"] = _dim6DefValue;

            _data["dim7"] = $('#dimension_7_checkbox').is(":checked");
            var _dim7DefValue = '';
            if ($('#dddimvale_7').val() != 'null' && $('#dddimvale_7').val() != null) _dim7DefValue = $('#dddimvale_7').val();
            _data["dim7DefValue"] = _dim7DefValue;

            _data["dim8"] = $('#dimension_8_checkbox').is(":checked");
            var _dim8DefValue = '';
            if ($('#dddimvale_8').val() != 'null' && $('#dddimvale_8').val() != null) _dim8DefValue = $('#dddimvale_8').val();
            _data["dim8DefValue"] = _dim8DefValue;

            _data["dim9"] = $('#dimension_9_checkbox').is(":checked");
            var _dddimvale_9 = '';
            if ($('#dddimvale_9').val() != 'null' && $('#dddimvale_9').val() != null) _dddimvale_9 = $('#dddimvale_9').val();
            _data["dim9DefValue"] = _dddimvale_9;

            _data["dim10"] = $('#dimension_10_checkbox').is(":checked");
            var _dim10DefValue = '';
            if ($('#dddimvale_10').val() != 'null' && $('#dddimvale_10').val() != null) _dim10DefValue = $('#dddimvale_10').val();
            _data["dim10DefValue"] = _dim10DefValue;
            _data["cocd"] = $("#ddlCompany").val();
            if (ipaddress == '') {
                _data["creator_mac_add"] = "192.100.0.1";
            } else {
                _data["creator_mac_add"] = ipaddress;
            }
            var _passdata = {
                data: ""
            };
            _passdata.data = JSON.stringify(_data);
            //console.log(_data);

            var _url = "dimension_setup.aspx/doSavedimsetup";
            $.ajax({
                type: "POST",
                url: _url,
                data: JSON.stringify(_passdata),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (result) {
                    if (!dochkses(result.d)) return;

                    let suc = result.d.toString().split('|~|')[0];
                    let rowid = result.d.toString().split('|~|')[1];
                    if (suc.toLowerCase() == `true`) {
                        //alert("Data Set saved successfully.");
                        $.alertable.custconfirm(`Setup saved successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "bank_master_overview.aspx";
                        }, function () {
                            //console.log('Confirmation canceled');
                            //$.alertable.alert('Confirmation canceled');
                        });
                    }
                    else {
                        $.alertable.alert("Unable to save.");
                    }

                    /*if (result.d.toString() == "true") {
                        $.alertable.alert("Data Set saved successfully.");
                    }
                    window.location = "Chartofacct.aspx";*/
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $.alertable.alert(xhr.status + " - Error occurred");
                }
            });
        }

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(DimSetup);
        DimSetup._createperm = MainObject.do_IsActionMenuPermission(DimSetup.access, 'DIMENSION', 'create');

        if (!DimSetup._createperm[0]) {
            $('#btn_save').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#btn_save').prop("disabled", true);
            $('#btn_save').attr('title', 'do not have save permission !!!');
        }
    },

};

function ShowIP(response) {
    ipaddress = response.ip;
}
