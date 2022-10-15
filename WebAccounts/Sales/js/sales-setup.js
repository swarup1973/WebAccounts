$(document).ready(function () {
    salessetupObject.cocd = $('#ddlCompany').val();
    salessetupObject.do_loadlookup();
    salessetupObject.do_loaddataedit();
    salessetupObject.do_getUserPagepermission();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var salessetupObject = {
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
    SalespersonDimCd:[],

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = salessetupObject.cocd;

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
                            salessetupObject.Administrator_NoSequence = JSON.stringify(objnew[key]);
                        }
                    }
                }

                salessetupObject.do_render_lookup();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_render_lookup: () => {
        var _html = [];
        var cntrl_cbo = [];
        cntrl_cbo = $("#div_salessetup").find("select");
        $.each(cntrl_cbo, function (key, value) {
            _html = [];
            var _data = JSON.parse(salessetupObject.Administrator_NoSequence);
            $.each(_data, function (key, value) {
                _html.push(
                    "<option value='" + value.RowId + "'>" + value.NsDescription.replace(/[\r\n]+/gm, '') + " (" + value.NsCode.replace(/[\r\n]+/gm, '') + ")</option>"
                );
            });

            if (value.id != 'dd_SalespersonDimCd' && value.id != 'dd_Reservation' && value.id !='dd_TaxCalcBasis') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='0' selected='selected'></option>");
            }
        });

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(salessetupObject);
        salessetupObject._vieweperm = MainObject.do_IsActionMenuPermission(salessetupObject.access, 'GENERAL SET-UP', 'view');
        salessetupObject._createperm = MainObject.do_IsActionMenuPermission(salessetupObject.access, 'GENERAL SET-UP', 'create');
        salessetupObject._editperm = MainObject.do_IsActionMenuPermission(salessetupObject.access, 'GENERAL SET-UP', 'edit');
        salessetupObject._deleteperm = MainObject.do_IsActionMenuPermission(salessetupObject.access, 'GENERAL SET-UP', 'delete');
        salessetupObject._mainmenuid = MainObject.do_IsActionMenuPermission(salessetupObject.access, 'GENERAL SET-UP', 'menuid');

        if (!salessetupObject._createperm[0]) {
            $('#btn_save').prop("disabled", true);
            $('#btn_save').attr('title', 'do not have permission to Add/Edit Record!!!');
        }

    },

    do_loaddataedit: () => {

        var _data = {};
        _data["cocd"] = salessetupObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "sales-setup.aspx/doedit",
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
                                salessetupObject.SalespersonDimCd = JSON.stringify(objnew[key]);

                                var _html = [];
                                var _data = JSON.parse(salessetupObject.SalespersonDimCd);
                                $.each(_data, function (key, value) {
                                    _html.push(
                                        "<option value='" + value.Row_id + "'>" + value.dimCaption.replace(/[\r\n]+/gm, '') + " (" + value.dimcd.replace(/[\r\n]+/gm, '') + ")</option>"
                                    );
                                });

                                $('#dd_SalespersonDimCd').html(_html.join(""));
                                $('#dd_SalespersonDimCd').prepend("<option value='0' selected='selected'></option>");
                            }
                        }

                        if (attrName.toLowerCase() == "table1") {
                            if (objnew[key].length > 0) {

                                $('#dd_TaxCalcBasis').val(objnew[key][0].TaxCalcBasis);
                                $('#dd_SalespersonDimCd').val(objnew[key][0].SalespersonDimCd);
                                $('#dd_Reservation').val(objnew[key][0].Reservation);
                                $('#txt_PostingFrom').val(objnew[key][0].PostingFrom);
                                $('#txt_PostingTo').val(objnew[key][0].PostingTo);
                                $('#txt_SalesLeadTime').val(objnew[key][0].SalesLeadTime);

                                if (objnew[key][0].OverdueWarning == true) {
                                    $('#chk_OverdueWarning').prop('checked', true);
                                }
                                else {
                                    $('#chk_OverdueWarning').prop('checked', false);
                                }

                                if (objnew[key][0].CreditLimitWarning == true) {
                                    $('#chk_CreditLimitWarning').prop('checked', true);
                                }
                                else {
                                    $('#chk_CreditLimitWarning').prop('checked', false);
                                }

                                if (objnew[key][0].PickRequirement == true) {
                                    $('#chk_PickRequirement').prop('checked', true);
                                }
                                else {
                                    $('#chk_PickRequirement').prop('checked', false);
                                }

                                $("#dd_CustomerNo").val(objnew[key][0].CustomerNo);
                                $('#dd_QuotNo').val(objnew[key][0].QuotNo);
                                $('#dd_QuotConfNo').val(objnew[key][0].QuotConfNo);
                                $('#dd_BlanketOrderNo').val(objnew[key][0].BlanketOrderNo);
                                $('#dd_BlanketOrderReleaseNo').val(objnew[key][0].BlanketOrderReleaseNo);
                                $('#dd_SalesOrderNo').val(objnew[key][0].SalesOrderNo);
                                $('#dd_SalesOrderConfNo').val(objnew[key][0].SalesOrderConfNo);
                                $('#dd_SalesJournalNo').val(objnew[key][0].SalesJournalNo);
                                $('#dd_ReturnOrderNo').val(objnew[key][0].ReturnOrderNo);
                                $('#dd_ExchangeRateAdj').val(objnew[key][0].ExchangeRateAdj);
                                $('#dd_InvoiceNo').val(objnew[key][0].InvoiceNo);


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

        _data["cocd"] = salessetupObject.cocd;
        _data["TaxCalcBasis"] = $('#dd_TaxCalcBasis').val();
        _data["SalespersonDimCd"] = $('#dd_SalespersonDimCd').val();
        _data["Reservation"] = $('#dd_Reservation').val();
        _data["PostingFrom"] = $('#txt_PostingFrom').val();
        _data["PostingTo"] = $('#txt_PostingTo').val();
        _data["SalesLeadTime"] = $('#txt_SalesLeadTime').val();
        _data["OverdueWarning"] = $("#chk_OverdueWarning").is(':checked');
        _data["CreditLimitWarning"] = $("#chk_CreditLimitWarning").is(':checked');
        _data["PickRequirement"] = $("#chk_PickRequirement").is(':checked');
        _data["CustomerNo"] = $("#dd_CustomerNo").val();
        _data["QuotNo"] = $('#dd_QuotNo').val();
        _data["QuotConfNo"] = $('#dd_QuotConfNo').val();
        _data["BlanketOrderNo"] = $('#dd_BlanketOrderNo').val();
        _data["BlanketOrderReleaseNo"] = $('#dd_BlanketOrderReleaseNo').val();
        _data["SalesOrderNo"] = $('#dd_SalesOrderNo').val();
        _data["SalesOrderConfNo"] = $('#dd_SalesOrderConfNo').val();
        _data["SalesJournalNo"] = $('#dd_SalesJournalNo').val();
        _data["ReturnOrderNo"] = $('#dd_ReturnOrderNo').val();
        _data["ExchangeRateAdj"] = $('#dd_ExchangeRateAdj').val();
        _data["InvoiceNo"] = $('#dd_InvoiceNo').val();
        _data["isblocked"] = $("#chk_IsBlock").is(':checked');
        _data["ip"] = salessetupObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "sales-setup.aspx/doSave";
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
                    salessetupObject.do_loaddataedit();
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
    salessetupObject.ip = response.ip;
};



