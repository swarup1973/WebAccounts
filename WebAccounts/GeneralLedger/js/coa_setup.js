$(document).ready(function () {
    CoaSetup.do_getUserPagepermission();

});

var CoaSetup = {
    _saveperm: false,
    _editperm: false,
    _deleteperm: false,
    coasetupdata: [{
        pageid: '',
        acid: '',
        actionmode: '',
        userid: '',
        grouprangefrom: '',
        grouprangeto: '',
        dimensionsetval: '',
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
    }],

    do_getUserPagepermission: () =>
    {
        MainObject.do_getuserpageaccess(CoaSetup);
        
        CoaSetup._saveperm = MainObject.do_IsActionMenuPermission(CoaSetup.access, 'CHART OF ACCOUNTS(COA)', 'create');
        CoaSetup._editperm = MainObject.do_IsActionMenuPermission(CoaSetup.access, 'CHART OF ACCOUNTS(COA)', 'edit');
        CoaSetup._deleteperm = MainObject.do_IsActionMenuPermission(CoaSetup.access, 'CHART OF ACCOUNTS(COA)', 'delete');
        //if (!CoaSetup._editperm[0])
        //{
            
        //    $('#li_edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        //    $('#li_edit').prop("disabled", true);
        //    $('#li_edit').attr('title', 'do not have permission to Edit Record!!!');
        //    table.button(1).action(function ()
        //    {
        //        this.active(false);
        //    });
        //}


    },

    do_init: () => {
        localStorage.removeItem("CoaSetup_lookup");
        CoaSetup.coasetupdata.pageid = '128_coa';
        CoaSetup.lookup.do_loadlookup();
        CoaSetup.lookup.do_fillCombo();


        if (queryString('id') != undefined || queryString("id") != null) {
            CoaSetup.coasetupdata.acid = queryString("id");
            if (CoaSetup.coasetupdata.acid == "0") {
                $('.mr-auto').parent().hide();
                $('#li_edit').hide();
                $('#li_delete').hide();
                $('#txt_AcCd').removeAttr('readonly');

                $('#txt_grpRangeFrom').attr("readonly", true);
                $('#txt_grpRangeFrom').attr("disabled", true);
                $('#txt_grpRangeFrom').val('');

                $('#txt_grpRangeTo').attr('readonly', 'true');
                $('#txt_grpRangeTo').val("");

                $('#chk_dimType').prop('checked', false);
                /*$('input[id^=dimension_]').attr("disabled", true);
                $('input[id^=dimension_]').prop('checked', false);

                $('select[id^=dddimvale_]').attr("disabled", true);
                $('select[id^=dddimvale_]').empty();

                $('#dd_dimensionset').attr("disabled", false);*/

                CoaSetup.onchangedimType();

            }
            else { CoaSetup.do_loadCoaSetupData(); }
        }
        
       // var _createperm = MainObject.do_IsActionMenuPermission('', CoaSetup.coasetupdata.pageid, 'edit');
       // if (!_createperm) { $('#btn_save').hide(); }
        if (!CoaSetup._editperm[0])
        {$('#btn_save').hide();}
    },

    lookup: {
        iscache: false,
        fa_AcType: [{
            AcTypeCd: '',
            AcType: ''
        }],

        fa_Group: [{
            grpCd: '',
            grpDesc: '',
            IsGrpRangeFromReq: '',
            IsGrpRangeToReq: '',
            IsDispBal: ''
        }],

        GroupRangeFrom: [{
            acid: '',
            grprangefrom: ''
        }],

        fa_LedCategory: [{
            LedCatId: '',
            LedCatCd: '',
            LedCatDesc: ''
        }],

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
            if (localStorage.CoaSetup_lookup == undefined || localStorage.CoaSetup_lookup == "undefined") {
                $.ajax({
                    type: "POST",
                    async: false,
                    url: "chartofacct.aspx/loadlookupdata",
                    data: JSON.stringify({ CoCd: $("#ddlCompany").val()}),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (!dochkses(result.d)) return;
                        var obj = JSON.parse(`[${result.d}]`);

                        for (var i = 0; i < obj.length; i++) {
                            var objnew = obj[i];
                            for (var key in objnew) {
                                var attrName = key;
                                if (attrName.toLowerCase() == "table") {//fa_AcType
                                    CoaSetup.lookup.fa_AcType = objnew[key];
                                }
                                if (attrName.toLowerCase() == "table1") {//fa_Group
                                    CoaSetup.lookup.fa_Group = objnew[key];
                                }
                                if (attrName.toLowerCase() == "table2") {//fa_LedCategory
                                    CoaSetup.lookup.fa_LedCategory = objnew[key];
                                }
                                if (attrName.toLowerCase() == "table3") {//dimension_table
                                    CoaSetup.lookup.dimension_table = objnew[key];
                                }
                                if (attrName.toLowerCase() == "table4") {//dimensionValue
                                    CoaSetup.lookup.dimensionValue = objnew[key];
                                }
                                if (attrName.toLowerCase() == "table5") {//dimensionset
                                    CoaSetup.lookup.dimensionSet = objnew[key];
                                }
                            }
                            CoaSetup.lookup.iscache = true;
                            localStorage.CoaSetup_lookup = JSON.stringify(CoaSetup.lookup);
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status + " - Error occurred");
                    }
                });
            }
            else {
                var lookup_object = JSON.parse(localStorage.CoaSetup_lookup);
                CoaSetup.lookup.iscache = true;
                CoaSetup.lookup.fa_AcType = lookup_object.fa_AcType;
                CoaSetup.lookup.fa_Group = lookup_object.fa_Group;
                CoaSetup.lookup.fa_LedCategory = lookup_object.fa_LedCategory;
                CoaSetup.lookup.dimension_table = lookup_object.dimension_table;
                CoaSetup.lookup.dimensionValue = lookup_object.dimensionValue;
                CoaSetup.lookup.dimensionSet = lookup_object.dimensionSet;
            }
        },

        do_fillCombo: () => {
            var lookup_object = JSON.parse(localStorage.CoaSetup_lookup);
            CoaSetup.lookup.fa_AcType = lookup_object.fa_AcType;
            CoaSetup.lookup.fa_Group = lookup_object.fa_Group;
            CoaSetup.lookup.fa_LedCategory = lookup_object.fa_LedCategory;
            CoaSetup.lookup.dimension_table = lookup_object.dimension_table;
            CoaSetup.lookup.dimensionValue = lookup_object.dimensionValue;
            CoaSetup.lookup.dimensionSet = lookup_object.dimensionSet;

            var _html = [];
            $.each(CoaSetup.lookup.fa_AcType, function (key, value) {
                _html.push("<option value='" + value.AcTypeCd + "'>" + value.AcType + "</option>");
            });
            $('#dd_AcTypeCd').html(_html.join(''));

            _html = [];
            $.each(CoaSetup.lookup.fa_Group, function (key, value) {
                _html.push("<option value='" + value.grpCd + "' IsGrpRangeFromReq='" + value.IsGrpRangeFromReq + "' IsGrpRangeToReq='" + value.IsGrpRangeToReq + "' IsDispBal='" + value.IsDispBal + "'>" + value.grpDesc + "</option>");
            });
            $('#dd_grpCd').html(_html.join(''));

            _html = [];
            $.each(CoaSetup.lookup.fa_LedCategory, function (key, value) {
                _html.push("<option value='" + $.trim(value.LedCatId) + "'>" + $.trim(value.LedCatCd) + " (" + value.LedCatDesc + ")</option>");
            });
            $('#dd_LedCatId').html(_html.join(''));
            $("#dd_LedCatId").prepend("<option value='0'></option>");

            $.each(CoaSetup.lookup.dimension_table, function (key, value) {
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

            /*$.map(CoaSetup.lookup.dimensionValue, function (elementOfArray, indexInArray) {
                if (elementOfArray.acid != "") {
                    $("#dd_grouprangefrom_" + elementOfArray.acid).val(elementOfArray.grprangefrom);
                }
            });*/
        },

        onchangegroup: () => {
            var _isgrprangefromreq = $('option:selected', $('#dd_grpCd')).attr('isgrprangefromreq');
            var _isdisplaybal = $('option:selected', $('#dd_grpCd')).attr('isdispbal');
            var _isgrprangetoreq = $('option:selected', $('#dd_grpCd')).attr('isgrprangetoreq');


            if (_isgrprangefromreq.toLowerCase() == "true") {
                /*$('#dd_grpRangeFrom').attr("readonly", false);
                $('#dd_grpRangeFrom').attr("disabled", false);
                $('#dd_grpRangeFrom').removeAttr("disabled");*/

                $('#txt_grpRangeFrom').attr("readonly", false);
                $('#txt_grpRangeFrom').attr("disabled", false);
                $('#txt_grpRangeFrom').removeAttr("disabled");
                

                /*if (localStorage.CoaSetup_GroupRangeFrom != undefined && localStorage.CoaSetup_GroupRangeFrom != "undefined" && localStorage.CoaSetup_GroupRangeFrom != "") {
                    var GroupRangeFrom = JSON.parse(localStorage.CoaSetup_GroupRangeFrom);
                    var _html = [];
                    $.each(GroupRangeFrom, function (key, value) {
                        _html.push("<option value='" + $.trim(value.ACCd.replace(/\\n/g, "")) + "'>" + $.trim(value.ACCd) + " (" + value.AcDesc + ")</option>");
                    });
                    $('#dd_grpRangeFrom').html(_html.join(''));
                    $('#dd_grpRangeFrom').val(CoaSetup.coasetupdata.grouprangefrom);

                    if ($('#dd_grpRangeFrom').val() == '') $('#dd_grpRangeFrom').attr("disabled", true);
                }*/

                if (localStorage.CoaSetup_GroupRangeFrom != undefined && localStorage.CoaSetup_GroupRangeFrom != "undefined" && localStorage.CoaSetup_GroupRangeFrom != "") {
                    $('#txt_grpRangeFrom').val(CoaSetup.coasetupdata.grouprangefrom);
                }

            }
            else {
                /*$('#dd_grpRangeFrom').attr('readonly', 'true');
                $('#dd_grpRangeFrom').attr("disabled", true);
                $('#dd_grpRangeFrom').empty();*/

                $('#txt_grpRangeFrom').attr("readonly", true);
                $('#txt_grpRangeFrom').attr("disabled", true);
                $('#txt_grpRangeFrom').val('');
            }

            /*if (_isdisplaybal.toLowerCase() == "true") {
                $('#txt_balance_' + acid).removeAttr("readonly");
                $('#txt_balance_' + acid).attr("readonly", false);
            }
            else {
                $('#txt_balance_' + acid).attr('readonly', 'true');
            }*/


            if (_isgrprangetoreq.toLowerCase() == "true") {
                //$('#txt_grpRangeTo').removeAttr("readonly");
                //$('#txt_grpRangeTo').attr("readonly", false);
                //$('#txt_grpRangeTo').removeAttr("disabled");

                $('#txt_grpRangeTo').removeAttr("readonly");
                $('#txt_grpRangeTo').attr("readonly", false);
                $('#txt_grpRangeTo').val(CoaSetup.coasetupdata.grouprangeto);
            }
            else {
                $('#txt_grpRangeTo').attr('readonly', 'true');
                $('#txt_grpRangeTo').val("");
                //$('#txt_grpRangeTo').attr("disabled", true);
            }
        }

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

    do_loadCoaSetupData: () => {

        if (queryString('id') != undefined || queryString("id") != null) {
            CoaSetup.coasetupdata.acid = queryString("id");
            //$('#txt_dimSetCode').attr('disabled', 'disabled');
        }
        else {
            //$('#txt_dimSetCode').removeAttr("disabled");
            //DimObject.dimensionsetdata.dimSetId = "";
            window.location.href = "chartofacct.aspx";
        }

        var _data = '{acid: "' + CoaSetup.coasetupdata.acid + '"}';

        $.ajax({
            type: "POST",
            url: "coasetup.aspx/doloadCoaSetupData",
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
                                $('#txt_AcCd').val(objnew[key][0].AcCd);
                                $('#txt_AcDesc').val(objnew[key][0].AcDesc);
                                $('#txt_AcSrcDesc').val(objnew[key][0].AcSrcDesc);
                                $('#txt_AcAlias').val(objnew[key][0].AcAlias);
                                $('#dd_AcTypeCd').val(objnew[key][0].AcTypeCd);

                                $('.title_left').html('<h3>Setup (' + $('#dd_AcTypeCd option:selected').text() + ')</h3>');

                                $('#dd_LedCatId').val(objnew[key][0].LedCatId);

                                $('#dd_grpCd').val(objnew[key][0].grpCd);

                                if (objnew[key][0].IsDirectPosting == 1) $('#chk_IsDirectPosting').prop('checked', true);
                                //$('#chk_IsDirectPosting').val(objnew[key][0].dimSetCode);
                                if (objnew[key][0].IsBlockPosting == 1) $('#chk_IsBlockPosting').prop('checked', true);
                                //$('#chk_IsBlockPosting').val(objnew[key][0].dimSetName);

                                //$('#dd_grpRangeFrom').val(objnew[key][0].grpRangeFrom);

                                CoaSetup.coasetupdata.grouprangefrom = objnew[key][0].grpRangeFrom;
                                //_grouprangefrom = objnew[key][0].grpRangeFrom;
                                $('#txt_grpRangeTo').val(objnew[key][0].grpRangeTo);
                                CoaSetup.coasetupdata.grouprangeto = objnew[key][0].grpRangeTo;

                                CoaSetup.lookup.onchangegroup();

                                if (objnew[key][0].dimType == "D") {
                                    $('#chk_dimType').prop('checked', true);
                                }
                                else if (objnew[key][0].dimType == "DS") {
                                    $('#chk_dimType').prop('checked', false);
                                }
                                CoaSetup.coasetupdata.dimensionsetval = objnew[key][0].dimSetCode;
                                CoaSetup.coasetupdata.dim1_chk = objnew[key][0].dim1_Branch;
                                CoaSetup.coasetupdata.dim1_val = objnew[key][0].dim1DefValue;
                                CoaSetup.coasetupdata.dim2_chk = objnew[key][0].dim2_Dept;
                                CoaSetup.coasetupdata.dim2_val = objnew[key][0].dim2DefValue;
                                CoaSetup.coasetupdata.dim3_chk = objnew[key][0].dim3;
                                CoaSetup.coasetupdata.dim3_val = objnew[key][0].dim3DefValue;
                                CoaSetup.coasetupdata.dim4_chk = objnew[key][0].dim4;
                                CoaSetup.coasetupdata.dim4_val = objnew[key][0].dim4DefValue;
                                CoaSetup.coasetupdata.dim5_chk = objnew[key][0].dim5;
                                CoaSetup.coasetupdata.dim5_val = objnew[key][0].dim5DefValue;
                                CoaSetup.coasetupdata.dim6_chk = objnew[key][0].dim6;
                                CoaSetup.coasetupdata.dim6_val = objnew[key][0].dim6DefValue;
                                CoaSetup.coasetupdata.dim7_chk = objnew[key][0].dim7;
                                CoaSetup.coasetupdata.dim7_val = objnew[key][0].dim7DefValue;
                                CoaSetup.coasetupdata.dim8_chk = objnew[key][0].dim8;
                                CoaSetup.coasetupdata.dim8_val = objnew[key][0].dim8DefValue;
                                CoaSetup.coasetupdata.dim9_chk = objnew[key][0].dim9;
                                CoaSetup.coasetupdata.dim9_val = objnew[key][0].dim9DefValue;
                                CoaSetup.coasetupdata.dim10_chk = objnew[key][0].dim10;
                                CoaSetup.coasetupdata.dim10_val = objnew[key][0].dim10DefValue;

                                CoaSetup.onchangedimType();
                            }
                        }
                        if (attrName.toLowerCase() == "table1") {//fa_Group
                            var GroupRangeFrom = objnew[key];
                            CoaSetup.lookup.GroupRangeFrom = objnew[key];

                            localStorage.CoaSetup_GroupRangeFrom = JSON.stringify(CoaSetup.lookup.GroupRangeFrom);
                            /*var _html = [];

                            $.each(GroupRangeFrom, function (key, value) {
                                _html.push("<option value='" + $.trim(value.ACCd.replace(/\\n/g, "")) + "'>" + $.trim(value.ACCd) + " (" + value.AcDesc + ")</option>");
                            });
                            $('#dd_grpRangeFrom').html(_html.join(''));
                            $("#dd_grpRangeFrom").prepend("<option value=''></option>");
                            $('#dd_grpRangeFrom').val(CoaSetup.coasetupdata.grouprangefrom);

                            if ($('#dd_grpRangeFrom').val() == '') $('#dd_grpRangeFrom').attr("disabled", true);*/

                            $('#txt_grpRangeFrom').val(CoaSetup.coasetupdata.grouprangefrom);
                            if ($('#txt_grpRangeFrom').val() == '') $('#txt_grpRangeFrom').attr("disabled", true);
                        }
                    }
                }
            },
            failure: function (response) {
                /*$.alertable.alert(response.d);*/
                $.alertable.alert('Problem in retreiving items...');
            }
        });

        CoaSetup.do_disabledformodeview();
    },

    onchangedimType: () => {

        var lookup_object = JSON.parse(localStorage.CoaSetup_lookup);
        //CoaSetup.lookup.dimension_table = lookup_object.dimension_table;
        CoaSetup.lookup.dimensionValue = lookup_object.dimensionValue;
        CoaSetup.lookup.dimensionSet = lookup_object.dimensionSet;

        var _html = [];

        if ($('#chk_dimType').is(":checked")) {
            $('input[id^=dimension_]').attr("disabled", false);
            $('input[id^=dimension_]').removeAttr("disabled");

            $('select[id^=dddimvale_]').attr("disabled", false);

            $('#dd_dimensionset').empty();
            $('#dd_dimensionset').attr("disabled", true);

            var myArray = CoaSetup.lookup.dimensionValue;

            var val_dim1 = myArray.filter((x) => { return x.dimid === 1; });
            _html = [];
            $.each(val_dim1, function (key, value) {
                _html.push("<option value='" + $.trim(value.valueId) + "'>" + $.trim(value.valueCd) + " (" + value.valueName + ")</option>");
            });
            $('#dddimvale_1').html(_html.join(''));
            $("#dddimvale_1").prepend("<option value='0'></option>");
            $('#dimension_1_checkbox').prop('checked', CoaSetup.coasetupdata.dim1_chk);
            $('#dddimvale_1').val(CoaSetup.coasetupdata.dim1_val);

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
            $('#dimension_2_checkbox').prop('checked', CoaSetup.coasetupdata.dim2_chk);
            $('#dddimvale_2').val(CoaSetup.coasetupdata.dim2_val);

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
            $('#dimension_3_checkbox').prop('checked', CoaSetup.coasetupdata.dim3_chk);
            $('#dddimvale_3').val(CoaSetup.coasetupdata.dim3_val);

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
            $('#dimension_4_checkbox').prop('checked', CoaSetup.coasetupdata.dim4_chk);
            $('#dddimvale_4').val(CoaSetup.coasetupdata.dim4_val);

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
            $('#dimension_5_checkbox').prop('checked', CoaSetup.coasetupdata.dim5_chk);
            $('#dddimvale_5').val(CoaSetup.coasetupdata.dim5_val);

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
            $('#dimension_6_checkbox').prop('checked', CoaSetup.coasetupdata.dim6_chk);
            $('#dddimvale_6').val(CoaSetup.coasetupdata.dim6_val);

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
            $('#dimension_7_checkbox').prop('checked', CoaSetup.coasetupdata.dim7_chk);
            $('#dddimvale_7').val(CoaSetup.coasetupdata.dim7_val);

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
            $('#dimension_8_checkbox').prop('checked', CoaSetup.coasetupdata.dim8_chk);
            $('#dddimvale_8').val(CoaSetup.coasetupdata.dim8_val);

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
            $('#dimension_9_checkbox').prop('checked', CoaSetup.coasetupdata.dim9_chk);
            $('#dddimvale_9').val(CoaSetup.coasetupdata.dim9_val);

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
            $('#dimension_10_checkbox').prop('checked', CoaSetup.coasetupdata.dim10_chk);
            $('#dddimvale_10').val(CoaSetup.coasetupdata.dim10_val);

            if ($('#dimension_10_checkbox').is(":checked")) {
                $('#dddimvale_10').attr("disabled", false);
                $('#dddimvale_10').removeAttr("disabled");
            }
            else {
                $('#dddimvale_10').attr("disabled", true);
                $('#dddimvale_10').val('');
            }
        }
        else {
            $('#chk_dimType').prop('checked', false);
            // $('input[id^=dimension_]').prop('checked', $(this).is(':checked'));
            $('input[id^=dimension_]').attr("disabled", true);
            $('input[id^=dimension_]').prop('checked', false);

            $('select[id^=dddimvale_]').attr("disabled", true);
            $('select[id^=dddimvale_]').empty();

            $('#dd_dimensionset').attr("disabled", false);

            _html = [];
            $.each(CoaSetup.lookup.dimensionSet, function (key, value) {
                _html.push("<option value='" + $.trim(value.dimSetId) + "'>" + $.trim(value.dimSetCode) + " (" + value.dimSetName + ")</option>");
            });
            $('#dd_dimensionset').html(_html.join(''));
            $("#dd_dimensionset").prepend("<option value='0'></option>");
            $('#dd_dimensionset').val(CoaSetup.coasetupdata.dimensionsetval);

        }
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

    domovetoeditCoaSetup: () => {
        if (queryString('id') != undefined || queryString("id") != null) {
            if (!CoaSetup._editperm[0]) {
                $.alertable.alert('You have no permission to edit data.'); return;
            }
            else { window.location = "coasetup.aspx?id=" + queryString('id');}
           //// var _createperm = MainObject.do_IsActionMenuPermission('', CoaSetup.coasetupdata.pageid, 'edit');
          ////  if (!_createperm) { $.alertable.alert('You have no permission to edit data.'); return; }
          /////  window.location = "coasetup.aspx?id=" + queryString('id');
        }
    },

    dosaveCoaSetup: () => {
        var validate = true;

      //  var _createperm = MainObject.do_IsActionMenuPermission('', CoaSetup.coasetupdata.pageid, 'edit');
      //  if (!_createperm) { $.alertable.alert('You have no permission to edit data.'); validate = false; return; }

        if (!CoaSetup._saveperm[0]) { $.alertable.alert('You have no permission to edit data.'); validate = false; return;}



        var grouprangefrom = '';
        //if ($('#txt_grpRangeFrom').val() != null && $('#txt_grpRangeFrom').val() != 'null') grouprangefrom = $('#txt_grpRangeFrom').val();

        if ($('#txt_AcCd').val() == '') {
            validate = false;
            $.alertable.alert('A/C Code required.');
            $('#txt_AcCd').focus();
            return false;
        }

        if (CoaSetup.coasetupdata.acid == "0") {
            var _data = '{acid:"0", accode: "' + encodeURIComponent($.trim($("#txt_AcCd").val())) + '"}';
            $.ajax({
                type: "POST",
                url: "chartofacct.aspx/docheckaccode",
                data: _data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (result) {
                    if (!dochkses(result.d)) return;
                    if (result.d.toLowerCase() == "false") {
                        validate = true;
                    } else if (result.d.toLowerCase() == "true") {
                        validate = false;
                        $.alertable.alert('A/C Code Already Exists.\n Please Try Another A/C Code.');
                        $("#txt_AcCd").focus();
                        validate = false;
                        return false;
                    }
                },
                failure: function (response) {
                    validate = false;
                    //$.alertable.alert(`Problem in retreiving items...`);
                    $.alertable.alert(`Problem in retreiving items...`);
                },
            });
        }


        if ($('#dd_AcTypeCd').val() == '' || $('#dd_AcTypeCd').val() == null) {
            validate = false;
            $.alertable.alert('Type required.');
            $('#dd_AcTypeCd').focus();
            return false;
        }
        if ($('#dd_grpCd').val() == '' || $('#dd_grpCd').val() == null) {
            validate = false;
            $.alertable.alert('Group required.');
            $('#dd_grpCd').focus();
            return false;
        }


        if ($('#dd_grpCd').val() == "T") {

            if ($.trim($('#txt_grpRangeFrom').val()) == '') {
                validate = false;
                $.alertable.alert('Group Range From required.');
                $('#txt_grpRangeFrom').focus();
                return false;
            }
            else {
                if ($('#txt_grpRangeFrom').val() != null && $('#txt_grpRangeFrom').val() != 'null') grouprangefrom = $('#txt_grpRangeFrom').val();
            }


            var _data = '{acid:"' + encodeURIComponent(CoaSetup.coasetupdata.acid) + '", range: "' + grouprangefrom + '", type:"from"}';
            $.ajax({
                type: "POST",
                url: "coasetup.aspx/docheckVchDtl_GroupRangeFromTo",
                data: _data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (result) {
                    if (!dochkses(result.d)) return;
                    if (result.d.toLowerCase() == "false") {
                        validate = false;
                        //$.alertable.alert('Invalid Group Range from.');
                        //$("#txt_grpRangeFrom").focus();
                        return false;
                    } else if (result.d.toLowerCase() == "true") {
                        validate = true;
                    }
                },
                failure: function (response) {
                    validate = false;
                    //$.alertable.alert(`Problem in retreiving items...`);
                    $.alertable.alert(`Problem in retreiving items...`);
                },
            });

            if (validate == false) {
                $.alertable.alert('Invalid Group Range from.');
                $("#txt_grpRangeFrom").focus();
            }

            if (validate == true) {
                if ($.trim($('#txt_grpRangeTo').val()) == '') {
                    alert('Group Range To is blank. Group Range to will override by current AC Code ' + $('#txt_AcCd').val().trim());
                    $('#txt_grpRangeTo').val($('#txt_AcCd').val());
                   /* $.alertable
                        .custconfirm(`Group Range To is blank. Group Range to will override by current AC Code ` + $('#txt_AcCd').val().trim(), ``, `Yes`, `No`)
                        .then(
                            function () {
                                validate = true;
                                $('#txt_grpRangeTo').val($('#txt_AcCd').val());
                            },
                            function () {
                                //console.log('Confirmation canceled');
                                //$.alertable.alert('Confirmation canceled');
                                validate = false;
                            }
                        );*/
                }
                else {
                    _data = '{acid:"' + encodeURIComponent(CoaSetup.coasetupdata.acid) + '", range: "' + $.trim($('#txt_grpRangeTo').val()) + '", type:"to"}';
                    $.ajax({
                        type: "POST",
                        url: "coasetup.aspx/docheckVchDtl_GroupRangeFromTo",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                validate = false;
                                //$.alertable.alert('Invalid Group Range to.');
                                //$("#txt_grpRangeTo").focus();
                                return false;
                            } else if (result.d.toLowerCase() == "true") {
                                validate = true;
                            }
                        },
                        failure: function (response) {
                            validate = false;
                            //$.alertable.alert(`Problem in retreiving items...`);
                            $.alertable.alert(`Problem in retreiving items...`);
                        },
                    });
                }

                if (validate == false) {
                    $.alertable.alert('Invalid Group Range to.');
                    $("#txt_grpRangeTo").focus();
                }
            }
        }


        var _dimtype = '';
        if ($('#chk_dimType').is(":checked")) _dimtype = 'D';
        else _dimtype = 'DS';

        var _dimensionset = '';
        if ($('#dd_dimensionset').val() != 'null' && $('#dd_dimensionset').val() != null) { _dimensionset = $('#dd_dimensionset').val(); }
        var _data = {};
        if (validate == true) {
            _data["acid"] = CoaSetup.coasetupdata.acid;
            _data["accode"] = $('#txt_AcCd').val().trim();
            _data["desc"] = $('#txt_AcDesc').val();
            _data["srcdesc"] = $('#txt_AcSrcDesc').val();
            _data["acalias"] = $('#txt_AcAlias').val();
            _data["actype"] = $('#dd_AcTypeCd').val();
            _data["group"] = $('#dd_grpCd').val();

            _data["isdirectposting"] = $('#chk_IsDirectPosting').is(":checked");
            _data["isblockposting"] = $('#chk_IsBlockPosting').is(":checked");
            _data["ledcatid"] = $('#dd_LedCatId').val();

            _data["grouprangefrom"] = grouprangefrom;
            _data["grouprangeto"] = $.trim($('#txt_grpRangeTo').val());

            _data["dimType"] = _dimtype;
            _data["dimensionset"] = _dimensionset;

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

            var _passdata = {
                data: ""
            };
            _passdata.data = JSON.stringify(_data);
            //console.log(_data);

            var _url = "coasetup.aspx/doSavechartofacct";
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
                    let acid = result.d.toString().split('|~|')[1];
                    if (suc.toLowerCase() == `true`) {
                        //alert("Data Set saved successfully.");
                        $.alertable.custconfirm(`Setup saved successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "Chartofacct.aspx";
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

    dodelete: () => {
        if (!CoaSetup._deleteperm[0]) { $.alertable.alert('You have no permission to delete the record.'); return; }
        else {
            var _id = CoaSetup.coasetupdata.acid;
            if (_id != '0') {
                //$.alertable.alert(_id);
                dodeletefacct(_id, $('#txt_AcCd').val().trim());
            }
        }
    }

};

var doCheckTransactionexits = function (accode) {
    var validate = false;

    var _data = '{accode: "' + encodeURIComponent(accode.trim()) + '"}';
    $.ajax({
        type: "POST",
        url: "chartofacct.aspx/docheckVchDtl_ByAcCd",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            if (!dochkses(result.d)) return;
            if (result.d.toLowerCase() == "false") {
                validate = true;
            }
            else if (result.d.toLowerCase() == "true") {
                validate = false;
                //$.alertable.alert("Unable to delete the record.\n Data Exists against this A/C Code.");
                //return false;
            }
        },
        failure: function (response) {
            validate = false;
            $.alertable.alert('Problem in retreiving items...');
        }
    });

    return validate;
};

var dodeletefacct = function (acid, accode) {
    var validate = doCheckTransactionexits(accode);

    if (validate) {

        $.alertable.custconfirm(`Are you sure want to delete?`, ``, `Yes`, `No`).then(function () {
            var _data = '{acid:"' + encodeURIComponent(acid.trim()) + '", accode: "' + encodeURIComponent(accode.trim()) + '"}';
            $.ajax({
                type: "POST",
                url: "chartofacct.aspx/deletefa_AccMaster",
                data: _data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (result) {
                    if (!dochkses(result.d)) return;
                    if (result.d.toLowerCase() == "true") {
                        $.alertable.alert("Record deleted successfully.");
                        window.location = "Chartofacct.aspx";
                    }

                },
                failure: function (response) {
                    validate = false;
                    $.alertable.alert('Problem in retreiving items...');
                }
            });
        }, function () {
            //console.log('Confirmation canceled');
            //$.alertable.alert('Confirmation canceled');
        });

        /*var r = confirm('Are you sure want to delete?');
        if (r == true) {
            var _data = '{acid:"' + encodeURIComponent(acid.trim()) + '", accode: "' + encodeURIComponent(accode.trim()) + '"}';
            $.ajax({
                type: "POST",
                url: "chartofacct.aspx/deletefa_AccMaster",
                data: _data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (result) {
                    if (!dochkses(result.d)) return;
                    if (result.d.toLowerCase() == "true") {
                        $.alertable.alert("Record deleted successfully.");
                        window.location = "Chartofacct.aspx";
                    }

                },
                failure: function (response) {
                    validate = false;
                    $.alertable.alert('Problem in retreiving items...');
                }
            });
        }*/
    }
    else {
        $.alertable.alert("Unable to delete the record.\n Data Exists against this A/C Code.");
    }

};
