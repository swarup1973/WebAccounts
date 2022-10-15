$(document).ready(function () {
    generalSetupObject.cocd = $('#ddlCompany').val();
    generalSetupObject.do_loadlookup();
    generalSetupObject.do_loaddataedit();
    generalSetupObject.do_getUserPagepermission();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var generalSetupObject = {
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
    fa_AccMaster: [],

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = generalSetupObject.cocd;

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
                            generalSetupObject.Administrator_NoSequence = JSON.stringify(objnew[key]);
                        }
                    }
                }

                generalSetupObject.do_render_lookup();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_render_lookup: () => {
        var _html = [];
        var cntrl_cbo = [];
        cntrl_cbo = $("#div_generalsetup").find("select");
        $.each(cntrl_cbo, function (key, value) {
            _html = [];
            var _data = JSON.parse(generalSetupObject.Administrator_NoSequence);
            $.each(_data, function (key, value) {
                _html.push(
                    "<option value='" + value.RowId + "'>" + value.NsDescription.replace(/[\r\n]+/gm, '') + " (" + value.NsCode.replace(/[\r\n]+/gm, '') + ")</option>"
                );
            });

            if (value.id != 'dd_RetainedEarningAcCd' && value.id != 'dd_PLAcCd' && value.id != 'dd_WHTaxRndingType' && value.id != 'dd_LCYRndingType' && value.id != 'dd_GSTRndingType' && value.id != 'dd_CustomsRndingType' && value.id != 'dd_ActionExceedingBudgetLimit' && value.id != 'dd_TaxCalculationDate' && value.id != 'dd_TaxCalculate') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='0' selected='selected'></option>");
            }
        });

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(generalSetupObject);
        generalSetupObject._vieweperm = MainObject.do_IsActionMenuPermission(generalSetupObject.access, 'GENERAL SET-UP', 'view');
        generalSetupObject._createperm = MainObject.do_IsActionMenuPermission(generalSetupObject.access, 'GENERAL SET-UP', 'create');
        generalSetupObject._editperm = MainObject.do_IsActionMenuPermission(generalSetupObject.access, 'GENERAL SET-UP', 'edit');
        generalSetupObject._deleteperm = MainObject.do_IsActionMenuPermission(generalSetupObject.access, 'GENERAL SET-UP', 'delete');
        generalSetupObject._mainmenuid = MainObject.do_IsActionMenuPermission(generalSetupObject.access, 'GENERAL SET-UP', 'menuid');

        if (!generalSetupObject._createperm[0]) {
            $('#btn_save').prop("disabled", true);
            $('#btn_save').attr('title', 'do not have permission to Add/Edit Record!!!');
        }

    },

    do_loaddataedit: () => {

        var _data = {};
        _data["cocd"] = generalSetupObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "general-setup.aspx/doedit",
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
                                generalSetupObject.fa_AccMaster = JSON.stringify(objnew[key]);
                                var _html = [];
                                var _data = JSON.parse(generalSetupObject.fa_AccMaster);
                                $.each(_data, function (key, value) {
                                    _html.push(
                                        "<option value='" + value.AcCd + "'>" + value.AcDesc.replace(/[\r\n]+/gm, '') + " (" + value.AcCd.replace(/[\r\n]+/gm, '') + ")</option>"
                                    );
                                });

                                $('#dd_RetainedEarningAcCd').html(_html.join(""));
                                $('#dd_RetainedEarningAcCd').prepend("<option value='0' selected='selected'></option>");

                                $('#dd_PLAcCd').html(_html.join(""));
                                $('#dd_PLAcCd').prepend("<option value='0' selected='selected'></option>");
                            }
                        }
                        if (attrName.toLowerCase() == "table1") {
                            if (objnew[key].length > 0) {

                                $('#txt_PostingFrom').val(objnew[key][0].PostingFrom);
                                $('#txt_PostingTo').val(objnew[key][0].PostingTo);
                                $('#txt_DiscTollerence').val(objnew[key][0].DiscTollerence);
                                $('#txt_DiscTollerenceAmt').val(objnew[key][0].DiscTollerenceAmt);

                                if (objnew[key][0].FinPostingOnItemRecpt == true) {
                                    $('#chk_FinPostingOnItemRecpt').prop('checked', true);
                                }
                                else {
                                    $('#chk_FinPostingOnItemRecpt').prop('checked', false);
                                }

                                if (objnew[key][0].FinPostingOnPackingSlip == true) {
                                    $('#chk_FinPostingOnPackingSlip').prop('checked', true);
                                }
                                else {
                                    $('#chk_FinPostingOnPackingSlip').prop('checked', false);
                                }

                                $('#dd_RetainedEarningAcCd').val(objnew[key][0].RetainedEarningAcCd);
                                $('#dd_PLAcCd').val(objnew[key][0].PLAcCd);

                                if (objnew[key][0].ExptdCostPosting == true) {
                                    $('#chk_ExptdCostPosting').prop('checked', true);
                                }
                                else {
                                    $('#chk_ExptdCostPosting').prop('checked', false);
                                }

                                if (objnew[key][0].ExptdRevenuePosting == true) {
                                    $('#chk_ExptdRevenuePosting').prop('checked', true);
                                }
                                else {
                                    $('#chk_ExptdRevenuePosting').prop('checked', false);
                                }

                                $('#txt_ExchangeRateServiceUrl').val(objnew[key][0].ExchangeRateServiceUrl);
                                $('#txt_WHTaxRndingPrecision').val(objnew[key][0].WHTaxRndingPrecision);
                                $('#txt_WHTaxDecPlaces').val(objnew[key][0].WHTaxDecPlaces);
                                $('#dd_WHTaxRndingType').val(objnew[key][0].WHTaxRndingType);
                                $('#txt_GSTRndingPrecision').val(objnew[key][0].GSTRndingPrecision);
                                $('#txt_GSTDecPlaces').val(objnew[key][0].GSTDecPlaces);
                                $('#dd_GSTRndingType').val(objnew[key][0].GSTRndingType);
                                $('#txt_LCYRndingPrecision').val(objnew[key][0].LCYRndingPrecision);
                                $('#txt_LCYDecPlaces').val(objnew[key][0].LCYDecPlaces);
                                $('#dd_LCYRndingType').val(objnew[key][0].LCYRndingType);
                                $('#txt_CustomsRndingPrecision').val(objnew[key][0].CustomsRndingPrecision);
                                $('#txt_CustomsDecPlaces').val(objnew[key][0].CustomsDecPlaces);
                                $('#dd_CustomsRndingType').val(objnew[key][0].CustomsRndingType);
                                $('#dd_BankAcNo').val(objnew[key][0].BankAcNo);
                                $('#dd_YearEndClosingBatchNo').val(objnew[key][0].YearEndClosingBatchNo);
                                $('#dd_ExchangeAdjBatchNo').val(objnew[key][0].ExchangeAdjBatchNo);
                                $('#dd_GLTranReversal').val(objnew[key][0].GLTranReversal);
                                $('#dd_BudgetNo').val(objnew[key][0].BudgetNo);
                                $('#dd_BudgetEntryNo').val(objnew[key][0].BudgetEntryNo);
                                $('#dd_RevisedBudgetNo').val(objnew[key][0].RevisedBudgetNo);
                                $('#dd_JournalBatchNo').val(objnew[key][0].JournalBatchNo);
                                $('#dd_TranReversalVchNo').val(objnew[key][0].TranReversalVchNo);
                                $('#dd_WHTaxPmtNo').val(objnew[key][0].WHTaxPmtNo);
                                $('#dd_WHTaxAdjNo').val(objnew[key][0].WHTaxAdjNo);
                                $('#dd_GSTPmtNo').val(objnew[key][0].GSTPmtNo);
                                $('#dd_GSTAdjNo').val(objnew[key][0].GSTAdjNo);
                                $('#dd_CustomsPmtNo').val(objnew[key][0].CustomsPmtNo);
                                $('#dd_CustomsAdjNo').val(objnew[key][0].CustomsAdjNo);
                                $('#dd_BankReconNo').val(objnew[key][0].BankReconNo);
                                $('#dd_BankStatementNo').val(objnew[key][0].BankStatementNo);

                                $('#dd_ActionExceedingBudgetLimit').val(objnew[key][0].ActionExceedingBudgetLimit);

                                if (objnew[key][0].BudgetMinusUnpostedActualTran == true) {
                                    $('#chk_BudgetMinusUnpostedActualTran').prop('checked', true);
                                }
                                else {
                                    $('#chk_BudgetMinusUnpostedActualTran').prop('checked', false);
                                }

                                $('#dd_TaxCalculationDate').val(objnew[key][0].TaxCalculationDate);
                                $('#dd_TaxCalculate').val(objnew[key][0].TaxCalculate);

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

        _data["cocd"] = generalSetupObject.cocd;

        _data["PostingFrom"] = $('#txt_PostingFrom').val();
        _data["PostingTo"] = $('#txt_PostingTo').val();
        _data["DiscTollerence"] = $('#txt_DiscTollerence').val();
        _data["DiscTollerenceAmt"] = $('#txt_DiscTollerenceAmt').val();
        _data["FinPostingOnItemRecpt"] = $("#chk_FinPostingOnItemRecpt").is(':checked');
        _data["FinPostingOnPackingSlip"] = $("#chk_FinPostingOnPackingSlip").is(':checked');
        _data["RetainedEarningAcCd"] = $('#dd_RetainedEarningAcCd').val();
        _data["PLAcCd"] = $('#dd_PLAcCd').val();
        _data["ExptdCostPosting"] = $("#chk_ExptdCostPosting").is(':checked');
        _data["ExptdRevenuePosting"] = $("#chk_ExptdRevenuePosting").is(':checked');
        _data["ExchangeRateServiceUrl"] = $('#txt_ExchangeRateServiceUrl').val();
        _data["WHTaxRndingPrecision"] = $('#txt_WHTaxRndingPrecision').val();
        _data["WHTaxDecPlaces"] = $('#txt_WHTaxDecPlaces').val();
        _data["WHTaxRndingType"] = $('#dd_WHTaxRndingType').val();
        _data["GSTRndingPrecision"] = $('#txt_GSTRndingPrecision').val();
        _data["GSTDecPlaces"] = $('#txt_GSTDecPlaces').val();
        _data["GSTRndingType"] = $('#dd_GSTRndingType').val();
        _data["LCYRndingPrecision"] = $('#txt_LCYRndingPrecision').val();
        _data["LCYDecPlaces"] = $('#txt_LCYDecPlaces').val();
        _data["LCYRndingType"] = $('#dd_LCYRndingType').val();
        _data["CustomsRndingPrecision"] = $('#txt_CustomsRndingPrecision').val();
        _data["CustomsDecPlaces"] = $('#txt_CustomsDecPlaces').val();
        _data["CustomsRndingType"] = $('#dd_CustomsRndingType').val();
        _data["BankAcNo"] = $('#dd_BankAcNo').val();
        _data["YearEndClosingBatchNo"] = $('#dd_YearEndClosingBatchNo').val();
        _data["ExchangeAdjBatchNo"] = $('#dd_ExchangeAdjBatchNo').val();
        _data["GLTranReversal"] = $('#dd_GLTranReversal').val();
        _data["BudgetNo"] = $('#dd_BudgetNo').val();
        _data["BudgetEntryNo"] = $('#dd_BudgetEntryNo').val();
        _data["RevisedBudgetNo"] = $('#dd_RevisedBudgetNo').val();
        _data["JournalBatchNo"] = $('#dd_JournalBatchNo').val();
        _data["TranReversalVchNo"] = $('#dd_TranReversalVchNo').val();
        _data["WHTaxPmtNo"] = $('#dd_WHTaxPmtNo').val();
        _data["WHTaxAdjNo"] = $('#dd_WHTaxAdjNo').val();
        _data["GSTPmtNo"] = $('#dd_GSTPmtNo').val();
        _data["GSTAdjNo"] = $('#dd_GSTAdjNo').val();
        _data["CustomsPmtNo"] = $('#dd_CustomsPmtNo').val();
        _data["CustomsAdjNo"] = $('#dd_CustomsAdjNo').val();
        _data["BankReconNo"] = $('#dd_BankReconNo').val();
        _data["BankStatementNo"] = $('#dd_BankStatementNo').val();

        _data["ActionExceedingBudgetLimit"] = $('#dd_ActionExceedingBudgetLimit').val();
        _data["BudgetMinusUnpostedActualTran"] = $("#chk_BudgetMinusUnpostedActualTran").is(':checked');
        _data["TaxCalculationDate"] = $('#dd_TaxCalculationDate').val();
        _data["TaxCalculate"] = $('#dd_TaxCalculate').val();

        _data["isblocked"] = $("#chk_IsBlock").is(':checked');
        _data["ip"] = generalSetupObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "general-setup.aspx/doSave";
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
                    generalSetupObject.do_loaddataedit();
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
    generalSetupObject.ip = response.ip;
};



