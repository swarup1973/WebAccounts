$(document).ready(function () {
    fixedassetsetupObject.cocd = $('#ddlCompany').val();
    fixedassetsetupObject.do_loadlookup();
    fixedassetsetupObject.do_loaddataedit();
    //fixedassetsetupObject.do_getUserPagepermission();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var fixedassetsetupObject = {
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _menuid: '',
    _mainmenuid: '',

    Administrator_NoSequence: [],
    DepreciationBook: [],

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = fixedassetsetupObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            async: false,
            url: "../handler/datahandler.aspx/loadAdministrator_NoSequence",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (!dochkses(result.d)) return;
                var obj = JSON.parse(`[${result.d}]`);

                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = key;
                        if (attrName.toLowerCase() == "table") {
                            fixedassetsetupObject.Administrator_NoSequence = JSON.stringify(objnew[key]);
                        }
                    }
                }

                fixedassetsetupObject.do_render_lookup();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_render_lookup: () => {
        var _html = [];
        var cntrl_cbo = [];
        cntrl_cbo = $("#div_fixedassetsetup").find("select");
        $.each(cntrl_cbo, function (key, value) {
            _html = [];
            var _data = JSON.parse(fixedassetsetupObject.Administrator_NoSequence);
            $.each(_data, function (key, value) {
                _html.push(
                    "<option value='" + value.RowId + "'>" + value.NsDescription.replace(/[\r\n]+/gm, '') + " (" + value.NsCode.replace(/[\r\n]+/gm, '') + ")</option>"
                );
            });

            if (value.id != 'dd_DefaultDepnCode') {
            $('#' + value.id).html(_html.join(""));
            $('#' + value.id).prepend("<option value='0' selected='selected'></option>");
            }
        });

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(fixedassetsetupObject);
        fixedassetsetupObject._vieweperm = MainObject.do_IsActionMenuPermission(fixedassetsetupObject.access, 'GENERAL SET-UP', 'view');
        fixedassetsetupObject._createperm = MainObject.do_IsActionMenuPermission(fixedassetsetupObject.access, 'GENERAL SET-UP', 'create');
        fixedassetsetupObject._editperm = MainObject.do_IsActionMenuPermission(fixedassetsetupObject.access, 'GENERAL SET-UP', 'edit');
        fixedassetsetupObject._deleteperm = MainObject.do_IsActionMenuPermission(fixedassetsetupObject.access, 'GENERAL SET-UP', 'delete');
        fixedassetsetupObject._mainmenuid = MainObject.do_IsActionMenuPermission(fixedassetsetupObject.access, 'GENERAL SET-UP', 'menuid');

        if (!fixedassetsetupObject._createperm[0]) {
            $('#btn_save').prop("disabled", true);
            $('#btn_save').attr('title', 'do not have permission to Add/Edit Record!!!');
        }

    },

    do_loaddataedit: () => {

        var _data = {};
        _data["cocd"] = fixedassetsetupObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "fixed-assets-general-setup.aspx/doedit",
            data: JSON.stringify(_passdata),
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

                        if (attrName.toLowerCase() == "table") {
                            if (objnew[key].length > 0) {
                                fixedassetsetupObject.DepreciationBook = JSON.stringify(objnew[key]);
                                var _html = [];
                                var _data = JSON.parse(fixedassetsetupObject.DepreciationBook);
                                $.each(_data, function (key, value) {
                                    _html.push(
                                        "<option value='" + value.RowId + "'>" + value.DepnDesc.replace(/[\r\n]+/gm, '') + " (" + value.DepnCode.replace(/[\r\n]+/gm, '') + ")</option>"
                                    );
                                });

                                $('#dd_DefaultDepnCode').html(_html.join(""));
                                $('#dd_DefaultDepnCode').prepend("<option value='0' selected='selected'></option>");
                            }
                        }
                        if (attrName.toLowerCase() == "table1") {
                            if (objnew[key].length > 0) {

                                $('#txt_MinDepAmount').val(objnew[key][0].MinDepAmount);
                                $('#txt_MinBookValueAfterDepn').val(objnew[key][0].MinBookValueAfterDepn);
                                $('#txt_CapitalisationThreshold').val(objnew[key][0].CapitalisationThreshold);
                                if (objnew[key][0].AllowPropDepn == true) {
                                    $('#chk_AllowPropDepn').prop('checked', true);
                                }
                                else {
                                    $('#chk_AllowPropDepn').prop('checked', false);
                                }
                                $('#dd_DefaultDepnCode').val(objnew[key][0].DefaultDepnCode);
                                $('#txt_PostingFrom').val(objnew[key][0].PostingFrom);
                                $('#txt_PostingTo').val(objnew[key][0].PostingTo);

                                $('#dd_FixedAssetNo').val(objnew[key][0].FixedAssetNo);
                                $('#dd_FixedAssetsTransfer').val(objnew[key][0].FixedAssetsTransfer);
                                $('#dd_FixedAssetsLoan').val(objnew[key][0].FixedAssetsLoan);
                                $('#dd_ReclassificationJournal').val(objnew[key][0].ReclassificationJournal);
                                $('#dd_InsuranceJournal').val(objnew[key][0].InsuranceJournal);
                                $('#dd_MaintenanceJournal').val(objnew[key][0].MaintenanceJournal);
                                $('#dd_DepreciationJournal').val(objnew[key][0].DepreciationJournal);

                                if (objnew[key][0].IsBlock == true) {
                                    $('#chk_IsBlock').prop('checked', true);
                                }
                                else {
                                    $('#chk_IsBlock').prop('checked', false);
                                }

                            }
                        }
                    }
                }
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });
    },

};

var savedata = function () {
    var validate = true;

    var startDate = new Date($('#txt_PostingFrom').val());
    var endDate = new Date($('#txt_PostingTo').val());

    if ($.trim($('#dd_DefaultDepnCode').val()) == '' || $.trim($('#dd_DefaultDepnCode').val()) == '0') {
        validate = false;
        $.alertable.alert(`Default Depreciation Book required.`);
        $("#dd_DefaultDepnCode").focus();
        return false;
    }
    if ($.trim($('#txt_PostingFrom').val()) == '') {
        validate = false;
        $.alertable.alert(`Posting From required.`);
        $("#txt_PostingFrom").focus();
        return false;
    }
    if ($.trim($('#txt_PostingTo').val()) == '') {
        validate = false;
        $.alertable.alert(`Posting To required.`);
        $("#txt_PostingTo").focus();
        return false;
    }

    else if ($.trim($('#txt_PostingTo').val()) != '') {
        if (endDate < startDate) {
            validate = false;
            $.alertable.alert(`Allow Posting to Should Greater Then Allow Posting From.`);
            $("#txt_PostingTo").focus();
            return false;
        }
    }

    var _data = {};
    if (validate == true) {

        _data["cocd"] = fixedassetsetupObject.cocd;
        _data["MinDepAmount"] = $('#txt_MinDepAmount').val();
        _data["MinBookValueAfterDepn"] = $('#txt_MinBookValueAfterDepn').val();
        _data["CapitalisationThreshold"] = $('#txt_CapitalisationThreshold').val();
        _data["AllowPropDepn"] = $("#chk_AllowPropDepn").is(':checked');
        _data["DefaultDepnCode"] = $('#dd_DefaultDepnCode').val();
        _data["PostingFrom"] = $('#txt_PostingFrom').val();
        _data["PostingTo"] = $('#txt_PostingTo').val();
        _data["FixedAssetNo"] = $('#dd_FixedAssetNo').val();
        _data["FixedAssetsTransfer"] = $('#dd_FixedAssetsTransfer').val();
        _data["FixedAssetsLoan"] = $('#dd_FixedAssetsLoan').val();
        _data["ReclassificationJournal"] = $('#dd_ReclassificationJournal').val();
        _data["InsuranceJournal"] = $('#dd_InsuranceJournal').val();
        _data["MaintenanceJournal"] = $('#dd_MaintenanceJournal').val();
        _data["DepreciationJournal"] = $('#dd_DepreciationJournal').val();
        _data["isblocked"] = $("#chk_IsBlock").is(':checked');
        _data["ip"] = fixedassetsetupObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "fixed-assets-general-setup.aspx/doSave";
        $.ajax({
            type: "POST",
            url: _url,
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                let suc = result.d.toString().split("|~|")[0];
                let acid = result.d.toString().split("|~|")[1];
                if (suc.toLowerCase() == `true`) {
                    $.alertable.alert(`Data Saved Successfully.`);
                    fixedassetsetupObject.do_loaddataedit();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }

};


var setTwoNumberDecimal = function (obj) {
    var obj_val = $('#' + obj.id).val();
    if (obj_val == '') obj_val = '0.00';
    $('#' + obj.id).val(parseFloat(obj_val).toFixed(2));
};

var onlyNumberKey = function (evt) {
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
};

var ShowIP = function (response) {
    fixedassetsetupObject.ip = response.ip;
};



