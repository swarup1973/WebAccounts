$(document).ready(function () {
    inventorysetupObject.cocd = $('#ddlCompany').val();
    inventorysetupObject.do_loadlookup();
    inventorysetupObject.do_loaddataedit();
    inventorysetupObject.do_getUserPagepermission();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var inventorysetupObject = {
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
    SalespersonDimCd: [],

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = inventorysetupObject.cocd;

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
                            inventorysetupObject.Administrator_NoSequence = JSON.stringify(objnew[key]);
                        }
                    }
                }

                inventorysetupObject.do_render_lookup();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_render_lookup: () => {
        var _html = [];
        var cntrl_cbo = [];
        cntrl_cbo = $("#div_inventorysetup").find("select");
        $.each(cntrl_cbo, function (key, value) {
            _html = [];
            var _data = JSON.parse(inventorysetupObject.Administrator_NoSequence);
            $.each(_data, function (key, value) {
                _html.push(
                    "<option value='" + value.RowId + "'>" + value.NsDescription.replace(/[\r\n]+/gm, '') + " (" + value.NsCode.replace(/[\r\n]+/gm, '') + ")</option>"
                );
            });

            if (value.id != 'dd_BarCodeSetup') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='0' selected='selected'></option>");
            }
        });

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(inventorysetupObject);
        inventorysetupObject._vieweperm = MainObject.do_IsActionMenuPermission(inventorysetupObject.access, 'GENERAL SET-UP', 'view');
        inventorysetupObject._createperm = MainObject.do_IsActionMenuPermission(inventorysetupObject.access, 'GENERAL SET-UP', 'create');
        inventorysetupObject._editperm = MainObject.do_IsActionMenuPermission(inventorysetupObject.access, 'GENERAL SET-UP', 'edit');
        inventorysetupObject._deleteperm = MainObject.do_IsActionMenuPermission(inventorysetupObject.access, 'GENERAL SET-UP', 'delete');
        inventorysetupObject._mainmenuid = MainObject.do_IsActionMenuPermission(inventorysetupObject.access, 'GENERAL SET-UP', 'menuid');

        if (!inventorysetupObject._createperm[0]) {
            $('#btn_save').prop("disabled", true);
            $('#btn_save').attr('title', 'do not have permission to Add/Edit Record!!!');
        }

    },

    do_loaddataedit: () => {

        var _data = {};
        _data["cocd"] = inventorysetupObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "inventory-setup.aspx/doedit",
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

                                if (objnew[key][0].AllowConsumAfterRNote == true) {
                                    $('#chk_AllowConsumAfterRNote').prop('checked', true);
                                }
                                else {
                                    $('#chk_AllowConsumAfterRNote').prop('checked', false);
                                }

                                if (objnew[key][0].QuaranticeRequirement == true) {
                                    $('#chk_QuaranticeRequirement').prop('checked', true);
                                }
                                else {
                                    $('#chk_QuaranticeRequirement').prop('checked', false);
                                }

                                if (objnew[key][0].RegistrationRequired == true) {
                                    $('#chk_RegistrationRequired').prop('checked', true);
                                }
                                else {
                                    $('#chk_RegistrationRequired').prop('checked', false);
                                }

                                if (objnew[key][0].LocationMandatory == true) {
                                    $('#chk_LocationMandatory').prop('checked', true);
                                }
                                else {
                                    $('#chk_LocationMandatory').prop('checked', false);
                                }

                                $('#dd_BarCodeSetup').val('0');

                                if (objnew[key][0].ActivateQualityManagement == true) {
                                    $('#chk_ActivateQualityManagement').prop('checked', true);
                                }
                                else {
                                    $('#chk_ActivateQualityManagement').prop('checked', false);
                                }

                                if (objnew[key][0].ReceivingRequirement == true) {
                                    $('#chk_ReceivingRequirement').prop('checked', true);
                                }
                                else {
                                    $('#chk_ReceivingRequirement').prop('checked', false);
                                }

                                if (objnew[key][0].PickingRequirement == true) {
                                    $('#chk_PickingRequirement').prop('checked', true);
                                }
                                else {
                                    $('#chk_PickingRequirement').prop('checked', false);
                                }

                                if (objnew[key][0].ReservationRequirement == true) {
                                    $('#chk_ReservationRequirement').prop('checked', true);
                                }
                                else {
                                    $('#chk_ReservationRequirement').prop('checked', false);
                                }

                                if (objnew[key][0].Auto_ManualReservation == true) {
                                    $('#chk_Auto_ManualReservation').prop('checked', true);
                                }
                                else {
                                    $('#chk_Auto_ManualReservation').prop('checked', false);
                                }

                                if (objnew[key][0].LockItemMovementDuringCount == true) {
                                    $('#chk_LockItemMovementDuringCount').prop('checked', true);
                                }
                                else {
                                    $('#chk_LockItemMovementDuringCount').prop('checked', false);
                                }

                                $('#txt_PostingFrom').val(objnew[key][0].PostingFrom);
                                $('#txt_PostingTo').val(objnew[key][0].PostingTo);


                                $('#dd_ItemMasterNo').val(objnew[key][0].ItemMasterNo);
                                $('#dd_ClosingVchNo').val(objnew[key][0].ClosingVchNo);
                                $('#dd_RequisitionNo').val(objnew[key][0].RequisitionNo);
                                $('#dd_TransferOrder').val(objnew[key][0].TransferOrder);
                                $('#dd_ItemJournalNo').val(objnew[key][0].ItemJournalNo);
                                $('#dd_CountingJournalNo').val(objnew[key][0].CountingJournalNo);
                                $('#dd_ReClassificationJournal').val(objnew[key][0].ReClassificationJournal);
                                $('#dd_RevaluationJournal').val(objnew[key][0].RevaluationJournal);
                                $('#dd_UpdateUnitCost').val(objnew[key][0].UpdateUnitCost);


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

        _data["cocd"] = inventorysetupObject.cocd;
        _data["AllowConsumAfterRNote"] = $("#chk_AllowConsumAfterRNote").is(':checked');
        _data["QuaranticeRequirement"] = $("#chk_QuaranticeRequirement").is(':checked');
        _data["RegistrationRequired"] = $("#chk_RegistrationRequired").is(':checked');
        _data["LocationMandatory"] = $("#chk_LocationMandatory").is(':checked');
        _data["BarCodeSetup"] = $('#dd_BarCodeSetup').val();
        _data["ActivateQualityManagement"] = $("#chk_ActivateQualityManagement").is(':checked');
        _data["ReceivingRequirement"] = $("#chk_ReceivingRequirement").is(':checked');
        _data["PickingRequirement"] = $("#chk_PickingRequirement").is(':checked');
        _data["ReservationRequirement"] = $("#chk_ReservationRequirement").is(':checked');
        _data["Auto_ManualReservation"] = $("#chk_Auto_ManualReservation").is(':checked');
        _data["LockItemMovementDuringCount"] = $("#chk_LockItemMovementDuringCount").is(':checked');
        _data["PostingFrom"] = $('#txt_PostingFrom').val();
        _data["PostingTo"] = $('#txt_PostingTo').val();
        _data["ItemMasterNo"] = $('#dd_ItemMasterNo').val();
        _data["ClosingVchNo"] = $('#dd_ClosingVchNo').val();
        _data["RequisitionNo"] = $('#dd_RequisitionNo').val();
        _data["TransferOrder"] = $('#dd_TransferOrder').val();
        _data["ItemJournalNo"] = $('#dd_ItemJournalNo').val();
        _data["CountingJournalNo"] = $('#dd_CountingJournalNo').val();
        _data["ReClassificationJournal"] = $('#dd_ReClassificationJournal').val();
        _data["RevaluationJournal"] = $('#dd_RevaluationJournal').val();
        _data["UpdateUnitCost"] = $('#dd_UpdateUnitCost').val();
        
        _data["isblocked"] = $("#chk_IsBlock").is(':checked');
        _data["ip"] = inventorysetupObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "inventory-setup.aspx/doSave";
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
                    inventorysetupObject.do_loaddataedit();
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
    inventorysetupObject.ip = response.ip;
};



