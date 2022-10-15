$(document).ready(function () {
    payablesetupObject.cocd = $('#ddlCompany').val();
    payablesetupObject.do_loadlookup();
    payablesetupObject.do_loaddataedit();
    payablesetupObject.do_getUserPagepermission();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var payablesetupObject = {
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
        _data["cocd"] = payablesetupObject.cocd;

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
                            payablesetupObject.Administrator_NoSequence = JSON.stringify(objnew[key]);
                        }
                    }
                }

                payablesetupObject.do_render_lookup();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_render_lookup: () => {
        var _html = [];
        var cntrl_cbo = [];
        cntrl_cbo = $("#div_payablesetup").find("select");
        $.each(cntrl_cbo, function (key, value) {
            _html = [];
            var _data = JSON.parse(payablesetupObject.Administrator_NoSequence);
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
        MainObject.do_getuserpageaccess(payablesetupObject);
        payablesetupObject._vieweperm = MainObject.do_IsActionMenuPermission(payablesetupObject.access, 'GENERAL SET-UP', 'view');
        payablesetupObject._createperm = MainObject.do_IsActionMenuPermission(payablesetupObject.access, 'GENERAL SET-UP', 'create');
        payablesetupObject._editperm = MainObject.do_IsActionMenuPermission(payablesetupObject.access, 'GENERAL SET-UP', 'edit');
        payablesetupObject._deleteperm = MainObject.do_IsActionMenuPermission(payablesetupObject.access, 'GENERAL SET-UP', 'delete');
        payablesetupObject._mainmenuid = MainObject.do_IsActionMenuPermission(payablesetupObject.access, 'GENERAL SET-UP', 'menuid');

        if (!payablesetupObject._createperm[0]) {
            $('#btn_save').prop("disabled", true);
            $('#btn_save').attr('title', 'do not have permission to Add/Edit Record!!!');
        }

    },

    do_loaddataedit: () => {

        var _data = {};
        _data["cocd"] = payablesetupObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "payables-setup.aspx/doedit",
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

                                if (objnew[key][0].ExDocNoRequirement == true) {
                                    $('#chk_ExDocNoRequirement').prop('checked', true);
                                }
                                else {
                                    $('#chk_ExDocNoRequirement').prop('checked', false);
                                }

                                $('#dd_ExRateAdj').val(objnew[key][0].ExRateAdj);
                                $('#dd_InvoiceVchNo').val(objnew[key][0].InvoiceVchNo);
                                $('#dd_CreditMemoNo').val(objnew[key][0].CreditMemoNo);
                                $('#dd_ReceiptListNo').val(objnew[key][0].ReceiptListNo);
                                $('#dd_ReceiptListVchNo').val(objnew[key][0].ReceiptListVchNo);

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

        _data["cocd"] = payablesetupObject.cocd;
        _data["PostingFrom"] = $('#txt_PostingFrom').val();
        _data["PostingTo"] = $('#txt_PostingTo').val();
        _data["ExDocNoRequirement"] = $("#chk_ExDocNoRequirement").is(':checked');
        _data["ExRateAdj"] = $('#dd_ExRateAdj').val();
        _data["InvoiceVchNo"] = $('#dd_InvoiceVchNo').val();
        _data["CreditMemoNo"] = $('#dd_CreditMemoNo').val();
        _data["ReceiptListNo"] = $('#dd_ReceiptListNo').val();
        _data["ReceiptListVchNo"] = $('#dd_ReceiptListVchNo').val();

        _data["isblocked"] = $("#chk_IsBlock").is(':checked');
        _data["ip"] = payablesetupObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "payables-setup.aspx/doSave";
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
                    payablesetupObject.do_loaddataedit();
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
    payablesetupObject.ip = response.ip;
};



