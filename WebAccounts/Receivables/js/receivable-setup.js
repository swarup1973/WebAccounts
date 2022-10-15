$(document).ready(function () {
    receivablesetupObject.cocd = $('#ddlCompany').val();
    receivablesetupObject.do_loadlookup();
    receivablesetupObject.do_loaddataedit();
    receivablesetupObject.do_getUserPagepermission();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var receivablesetupObject = {
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
        _data["cocd"] = receivablesetupObject.cocd;

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
                            receivablesetupObject.Administrator_NoSequence = JSON.stringify(objnew[key]);
                        }
                    }
                }

                receivablesetupObject.do_render_lookup();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_render_lookup: () => {
        var _html = [];
        var cntrl_cbo = [];
        cntrl_cbo = $("#div_receivablesetup").find("select");
        $.each(cntrl_cbo, function (key, value) {
            _html = [];
            var _data = JSON.parse(receivablesetupObject.Administrator_NoSequence);
            $.each(_data, function (key, value) {
                _html.push(
                    "<option value='" + value.RowId + "'>" + value.NsDescription.replace(/[\r\n]+/gm, '') + " (" + value.NsCode.replace(/[\r\n]+/gm, '') + ")</option>"
                );
            });

            //if (value.id != 'dd_WareHouseCd') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='0' selected='selected'></option>");
            //}
        });

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(receivablesetupObject);
        receivablesetupObject._vieweperm = MainObject.do_IsActionMenuPermission(receivablesetupObject.access, 'GENERAL SET-UP', 'view');
        receivablesetupObject._createperm = MainObject.do_IsActionMenuPermission(receivablesetupObject.access, 'GENERAL SET-UP', 'create');
        receivablesetupObject._editperm = MainObject.do_IsActionMenuPermission(receivablesetupObject.access, 'GENERAL SET-UP', 'edit');
        receivablesetupObject._deleteperm = MainObject.do_IsActionMenuPermission(receivablesetupObject.access, 'GENERAL SET-UP', 'delete');
        receivablesetupObject._mainmenuid = MainObject.do_IsActionMenuPermission(receivablesetupObject.access, 'GENERAL SET-UP', 'menuid');

        if (!receivablesetupObject._createperm[0]) {
            $('#btn_save').prop("disabled", true);
            $('#btn_save').attr('title', 'do not have permission to Add/Edit Record!!!');
        }

    },

    do_loaddataedit: () => {

        var _data = {};
        _data["cocd"] = receivablesetupObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "receivable-setup.aspx/doedit",
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

                                $('#txt_PostingFrom').val(objnew[key][0].PostingFrom);
                                $('#txt_PostingTo').val(objnew[key][0].PostingTo);

                                $('#txt_GraceDays').val(objnew[key][0].GraceDays);
                                $('#dd_CreditMemoNo').val(objnew[key][0].CreditMemoNo);
                                $('#dd_PackingSlipVchNo').val(objnew[key][0].PackingSlipVchNo);
                                $('#dd_InvoiceNo').val(objnew[key][0].InvoiceNo);
                                $('#dd_InvoiceVchNo').val(objnew[key][0].InvoiceVchNo);
                                $('#dd_CreditNoteNo').val(objnew[key][0].CreditNoteNo);
                                $('#dd_CreditNoteVchNo').val(objnew[key][0].CreditNoteVchNo);

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

        _data["cocd"] = receivablesetupObject.cocd;
        _data["PostingFrom"] = $('#txt_PostingFrom').val();
        _data["PostingTo"] = $('#txt_PostingTo').val();
        _data["GraceDays"] = $('#txt_GraceDays').val();
        _data["CreditMemoNo"] = $('#dd_CreditMemoNo').val();
        _data["PackingSlipVchNo"] = $('#dd_PackingSlipVchNo').val();
        _data["InvoiceNo"] = $('#dd_InvoiceNo').val();
        _data["InvoiceVchNo"] = $('#dd_InvoiceVchNo').val();
        _data["CreditNoteNo"] = $('#dd_CreditNoteNo').val();
        _data["CreditNoteVchNo"] = $('#dd_CreditNoteVchNo').val();

        _data["isblocked"] = $("#chk_IsBlock").is(':checked');
        _data["ip"] = receivablesetupObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "receivable-setup.aspx/doSave";
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
                    receivablesetupObject.do_loaddataedit();
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
    receivablesetupObject.ip = response.ip;
};



