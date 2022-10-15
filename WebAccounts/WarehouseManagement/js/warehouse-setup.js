$(document).ready(function () {
    warehousesetupObject.cocd = $('#ddlCompany').val();
    warehousesetupObject.do_loadlookup();
    warehousesetupObject.do_loaddataedit();
    warehousesetupObject.do_getUserPagepermission();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var warehousesetupObject = {
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
    WareHouseCd: [],

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = warehousesetupObject.cocd;

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
                            warehousesetupObject.Administrator_NoSequence = JSON.stringify(objnew[key]);
                        }
                    }
                }

                warehousesetupObject.do_render_lookup();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_render_lookup: () => {
        var _html = [];
        var cntrl_cbo = [];
        cntrl_cbo = $("#div_warehousesetup").find("select");
        $.each(cntrl_cbo, function (key, value) {
            _html = [];
            var _data = JSON.parse(warehousesetupObject.Administrator_NoSequence);
            $.each(_data, function (key, value) {
                _html.push(
                    "<option value='" + value.RowId + "'>" + value.NsDescription.replace(/[\r\n]+/gm, '') + " (" + value.NsCode.replace(/[\r\n]+/gm, '') + ")</option>"
                );
            });

            if (value.id != 'dd_WareHouseCd') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='0' selected='selected'></option>");
            }
        });

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(warehousesetupObject);
        warehousesetupObject._vieweperm = MainObject.do_IsActionMenuPermission(warehousesetupObject.access, 'GENERAL SET-UP', 'view');
        warehousesetupObject._createperm = MainObject.do_IsActionMenuPermission(warehousesetupObject.access, 'GENERAL SET-UP', 'create');
        warehousesetupObject._editperm = MainObject.do_IsActionMenuPermission(warehousesetupObject.access, 'GENERAL SET-UP', 'edit');
        warehousesetupObject._deleteperm = MainObject.do_IsActionMenuPermission(warehousesetupObject.access, 'GENERAL SET-UP', 'delete');
        warehousesetupObject._mainmenuid = MainObject.do_IsActionMenuPermission(warehousesetupObject.access, 'GENERAL SET-UP', 'menuid');

        if (!warehousesetupObject._createperm[0]) {
            $('#btn_save').prop("disabled", true);
            $('#btn_save').attr('title', 'do not have permission to Add/Edit Record!!!');
        }

    },

    do_loaddataedit: () => {

        var _data = {};
        _data["cocd"] = warehousesetupObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "warehouse-setup.aspx/doedit",
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
                                warehousesetupObject.WareHouseCd = JSON.stringify(objnew[key]);

                                var _html = [];
                                var _data = JSON.parse(warehousesetupObject.WareHouseCd);
                                $.each(_data, function (key, value) {
                                    _html.push(
                                        "<option value='" + value.WareHouseCd + "'>" + value.WareHouseDesc.replace(/[\r\n]+/gm, '') + " (" + value.WareHouseCd.replace(/[\r\n]+/gm, '') + ")</option>"
                                    );
                                });

                                $('#dd_WareHouseCd').html(_html.join(""));
                                $('#dd_WareHouseCd').prepend("<option value='0' selected='selected'></option>");
                            }
                        }

                        if (attrName.toLowerCase() == "table1") {
                            if (objnew[key].length > 0) {

                                $('#dd_WareHouseCd').val(objnew[key][0].WareHouseCd);
                                $('#txt_PostingFrom').val(objnew[key][0].PostingFrom);
                                $('#txt_PostingTo').val(objnew[key][0].PostingTo);

                                $('#dd_QualityOrderNo').val(objnew[key][0].QualityOrderNo);
                                $('#dd_TransferOrderNo').val(objnew[key][0].TransferOrderNo);
                                $('#dd_MovementJounralNo').val(objnew[key][0].MovementJounralNo);
                                $('#dd_RegistrationNo').val(objnew[key][0].RegistrationNo);
                                $('#dd_PickingListNo').val(objnew[key][0].PickingListNo);
                                $('#dd_PackingSlipNo').val(objnew[key][0].PackingSlipNo);
                                $('#dd_RejectionNoteNo').val(objnew[key][0].RejectionNoteNo);
                                $('#dd_InwardGateEntryNo').val(objnew[key][0].InwardGateEntryNo);
                                $('#dd_OutwardGateEntryNo').val(objnew[key][0].OutwardGateEntryNo);

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

    if ($.trim($('#dd_WareHouseCd').val()) == '') {
        validate = false;
        $.alertable.alert(`Warehouse required.`);
        $("#dd_WareHouseCd").focus();
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

        _data["cocd"] = warehousesetupObject.cocd;
        _data["WareHouseCd"] = $('#dd_WareHouseCd').val();
        _data["PostingFrom"] = $('#txt_PostingFrom').val();
        _data["PostingTo"] = $('#txt_PostingTo').val();
        _data["QualityOrderNo"] = $('#dd_QualityOrderNo').val();
        _data["TransferOrderNo"] = $('#dd_TransferOrderNo').val();
        _data["MovementJounralNo"] = $('#dd_MovementJounralNo').val();
        _data["RegistrationNo"] = $('#dd_RegistrationNo').val();
        _data["PickingListNo"] = $('#dd_PickingListNo').val();
        _data["PackingSlipNo"] = $('#dd_PackingSlipNo').val();
        _data["RejectionNoteNo"] = $('#dd_RejectionNoteNo').val();
        _data["InwardGateEntryNo"] = $('#dd_InwardGateEntryNo').val();
        _data["OutwardGateEntryNo"] = $('#dd_OutwardGateEntryNo').val();

        _data["isblocked"] = $("#chk_IsBlock").is(':checked');
        _data["ip"] = warehousesetupObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "warehouse-setup.aspx/doSave";
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
                    warehousesetupObject.do_loaddataedit();
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
    warehousesetupObject.ip = response.ip;
};



