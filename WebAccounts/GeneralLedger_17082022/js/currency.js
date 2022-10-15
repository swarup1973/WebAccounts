$(document).ready(function () {
    var currencyresult = [];
    var ipaddress = "";

    if (localStorage._currencymenuid == '' || localStorage._currencymenuid == undefined) {
        localStorage._currencymenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._currencymenuid;
    }

    CurrencyObject.do_loadcurrency();
    //CurrencyObject.do_bindAccount();
    CurrencyObject.do_getUserPagepermission();
    CurrencyObject.do_loadlookup();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var CurrencyObject = {

    do_bindAccount: () => {

        var obj = JSON.parse(localStorage.postingaccount);

        var _html = [];
        $.each(obj, function (key, value) {
            // alert("ok");
            _html.push(
                "<option value='" + value.AcCd.replace(/[\r\n]+/gm, '') + "'>" + value.AcCd.replace(/[\r\n]+/gm, '') + " (" + value.AcSrcDesc.replace(/[\r\n]+/gm, '') + ")</option>"
            );
        });
        $("#cbo_ralizegainac").html(_html.join(""));
        $("#cbo_ralizegainac").prepend("<option value='' selected='selected'></option>");

        $("#cbo_realizelossac").html(_html.join(""));
        $("#cbo_realizelossac").prepend("<option value='' selected='selected'></option>");

        $("#cbo_unrealizegainac").html(_html.join(""));
        $("#cbo_unrealizegainac").prepend("<option value='' selected='selected'></option>");

        $("#cbo_unrealizelossac").html(_html.join(""));
        $("#cbo_unrealizelossac").prepend("<option value='' selected='selected'></option>");

        $("#cbo_convroacdr").html(_html.join(""));
        $("#cbo_convroacdr").prepend("<option value='' selected='selected'></option>");

        $("#cbo_convroaccr").html(_html.join(""));
        $("#cbo_convroaccr").prepend("<option value='' selected='selected'></option>");

    },

    hdnroleid: '',
    rowid: '',
    mode: '',
    currcd: '',
    currdesc: '',
    ralizegainac: '',
    realizelossac: '',
    unrealizegainac: '',
    unrealizelossac: '',
    convroacdr: '',
    convroaccr: '',
    currunitdecplace: '',
    unitamtroprecision: '',
    rotype: '',
    totalroprecision: '',
    totalroto: '',
    createdby: '',
    creator_mac_add: '',
    cocd: '',
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _exchangerate: false,
    _exchangerateservice: false,
    _exchangeratemenuid: '',
    _exchangerateservicemenuid: '',
     _currencymenuid: '',

    do_loadlookup: () => {
        $.ajax({
            type: "POST",
            async: false,
            url: "../handler/datahandler.aspx/loadlookupdataAccount",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (!dochkses(result.d)) return;
                var obj = JSON.parse(`[${result.d}]`);

                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = keyChartofacctObject
                        if (attrName.toLowerCase() == "table") {
                            localStorage.postingaccount = JSON.stringify(objnew[key]);
                            CurrencyObject.do_bindAccount();
                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_loadcurrency: () => {

        $.ajax({
            type: "POST",
            url: "currency.aspx/loadcurrencylist",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                currencyresult = obj;
                CurrencyObject.do_populatecurrency(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(CurrencyObject);
        CurrencyObject._createperm = MainObject.do_IsActionMenuPermission(CurrencyObject.access, 'CURRENCIES & EXCHANGE RATES', 'create');
        CurrencyObject._editperm = MainObject.do_IsActionMenuPermission(CurrencyObject.access, 'CURRENCIES & EXCHANGE RATES', 'edit');
        CurrencyObject._deleteperm = MainObject.do_IsActionMenuPermission(CurrencyObject.access, 'CURRENCIES & EXCHANGE RATES', 'delete');
        CurrencyObject._exchangerate = MainObject.do_IsActionMenuPermission(CurrencyObject.access, 'EXCHANGE RATES', 'view');
        CurrencyObject._exchangerateservice = MainObject.do_IsActionMenuPermission(CurrencyObject.access, 'EXCHANGE RATE SERVICES', 'view');

        CurrencyObject._exchangeratemenuid = MainObject.do_IsActionMenuPermission(CurrencyObject.access, 'Exchange Rates', 'menuid');
        CurrencyObject._exchangerateservicemenuid = MainObject.do_IsActionMenuPermission(CurrencyObject.access, 'Exchange Rate Services', 'menuid');
    
    },

    do_populatecurrency: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#currency_table",
            fields: [
                { label: "CurrCd", name: "CurrCd" },
                { label: "CurrDesc", name: "CurrDesc" },
                { label: "StartDt", name: "StartDt" },
                { label: "ExchangeRate", name: "ExchangeRate" },
                { label: "ExchangeRatePer", name: "ExchangeRatePer" },
                { label: "RealizeGainAc", name: "RealizeGainAc" },
                { label: "RealizeLossAc", name: "RealizeLossAc" },
                { label: "UnRealizeGainAc", name: "UnRealizeGainAc" },
                { label: "UnRealizeLossAc", name: "UnRealizeLossAc" },
                { label: "ConvRoAcDr", name: "ConvRoAcDr" },
                { label: "ConvRoAcCr", name: "ConvRoAcCr" },
                { label: "CurrUnitDecPlace", name: "CurrUnitDecPlace" },
                { label: "UnitAmtRoPrecision", name: "UnitAmtRoPrecision" },
                { label: "RoType", name: "RoType" },
                { label: "TotalRoPrecision", name: "TotalRoPrecision" },
                { label: "TotalRoTo", name: "TotalRoTo" },
                { label: "EntryDate", name: "EntryDate" },
            ],
        });

        var roletable = $("#currency_table");

        var roledata = [];

        for (var i = 0; i < obj.length; i++) {
            var objnew = obj[i];
            for (var key in objnew) {
                var attrName = key;
                if (attrName.toLowerCase() == "table") {
                    roledata = objnew[key];
                }
            }
        };


        roletable.dataTable({
            dom: "Bfrtip",
            fixedHeader: true,
            data: roledata,
            columns: [
                { data: "CurrCd" },
                { data: "CurrDesc" },
                { data: "StartDt" },
                { data: "ExchangeRate" },
                { data: "ExchangeRatePer" },
                { data: "RealizeGainAc" },
                { data: "RealizeLossAc" },
                { data: "UnRealizeGainAc" },
                { data: "UnRealizeLossAc" },
                { data: "ConvRoAcDr" },
                { data: "ConvRoAcCr" },
                { data: "CurrUnitDecPlace" },
                { data: "UnitAmtRoPrecision" },
                { data: "RoType" },
                { data: "TotalRoPrecision" },
                { data: "TotalRoTo" },
                { data: "EntryDate" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [
                {
                    add: "new", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'create_newcurrency'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'edit', ''); },
                    attr: {
                        title: 'New',
                        id: 'edit_currency'
                    },
                },
                {
                    add: "edit", text: 'Delete', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'delete', ''); },
                    attr: {
                        title: 'New',
                        id: 'delete_currency'
                    },
                },
                {
                    //add: "exchangerates", text: 'Exchange Rates', editor: editor, action: () => window.open("exchange_rates.aspx")
                    add: "exchangerates", text: 'Exchange Rates', editor: editor, action: function () { roleaction($('.selected').attr('CurrCd'), 'exchangerates', $('.selected').attr('CurrDesc')) },
                    attr: {
                        title: 'New',
                        id: 'currencyexchangerate',
                        value: CurrencyObject._exchangeratemenuid[1]
                    },
                },
                {
                    /*add: "exchangeratesservices", text: 'Exchange Rate Services', editor: editor, action: () => window.open("#"),*/
                    add: "exchangeratesservices", text: 'Exchange Rate Services', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'currency', ''); },
                    attr: {
                        title: 'New',
                        id: 'currencyexcrateservice',
                        value: CurrencyObject._exchangerateservicemenuid[1]
                    },
                }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("currcd", `${data.CurrCd}`);
                $(row).attr("CurrDesc", `${data.CurrDesc}`);
            },
        });

        var table = $('#currency_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!CurrencyObject._deleteperm[0]) {
                    $('#delete_currency').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#delete_currency').prop("disabled", true);
                    $('#delete_currency').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }
        });

        if (!CurrencyObject._createperm[0]) {
            $('#create_newcurrency').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#create_newcurrency').prop("disabled", true);
            $('#create_newcurrency').attr('title', 'do not have permission to add new currency!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!CurrencyObject._editperm[0]) {
            $('#edit_currency').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#edit_currency').prop("disabled", true);
            $('#edit_currency').attr('title', 'do not have permission to edit currency!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!CurrencyObject._deleteperm[0]) {
            $('#delete_currency').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#delete_currency').prop("disabled", true);
            $('#delete_currency').attr('title', 'do not have permission to delete currency!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!CurrencyObject._exchangerate[0]) {
            $('#currencyexchangerate').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#currencyexchangerate').prop("disabled", true);
            $('#currencyexchangerate').attr('title', 'do not have permission to see currency exchange rate!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }

        if (!CurrencyObject._exchangerateservice[0]) {
            $('#currencyexcrateservice').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#currencyexcrateservice').prop("disabled", true);
            $('#currencyexcrateservice').attr('title', 'do not have permission to currency exchange rate services!!!');
            table.button(4).action(function () {
                this.active(false);
            });
        }

    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["rowid"] = CurrencyObject.hdnroleid;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "currency.aspx/doeditcurr",
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
                                CurrencyObject.hdnroleid = objnew[key][0].RowId;

                                $('#txt_currcd').val(objnew[key][0].CurrCd);
                                $('#txt_currdesc').val(objnew[key][0].CurrDesc);
                                $("#cbo_ralizegainac").val(objnew[key][0].RealizeGainAc);
                                $("#cbo_ralizegainac").val(objnew[key][0].RealizeGainAc);
                                $("#cbo_realizelossac").val(objnew[key][0].RealizeLossAc);
                                $("#cbo_ralizegainac").val(objnew[key][0].RealizeGainAc);
                                $("#cbo_unrealizegainac").val(objnew[key][0].UnRealizeGainAc);
                                $("#cbo_unrealizelossac").val(objnew[key][0].UnRealizeLossAc);
                                $("#cbo_convroacdr").val(objnew[key][0].ConvRoAcDr);
                                $("#cbo_convroaccr").val(objnew[key][0].ConvRoAcCr);
                                $("#txt_currunitdecplace").val(objnew[key][0].CurrUnitDecPlace);
                                $("#txt_unitamtroprecision").val(objnew[key][0].UnitAmtRoPrecision);
                                $("#cbo_rotype").val(objnew[key][0].RoType);
                                $("#cbo_totalroto").val(objnew[key][0].TotalRoTo);
                                $("#txt_totalroprecision").val(objnew[key][0].TotalRoPrecision);

                                $('#txt_currcd').prop('readonly', true);


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

var showmodal = function () {
    $('.modal-title').html('Add New Currency');
    // CurrencyObject.do_loadlookup();
    CurrencyObject.hdnroleid = '';
    $('#txt_currcd').val('');
    $('#txt_currcd').prop('readonly', false);
    $('#txt_currdesc').val('');

    $("#cbo_ralizegainac").val('');
    $("#cbo_ralizegainac").val('');
    $("#cbo_realizelossac").val('');
    $("#cbo_ralizegainac").val('');
    $("#cbo_unrealizegainac").val('');
    $("#cbo_unrealizelossac").val('');
    $("#cbo_convroacdr").val('');
    $("#cbo_convroaccr").val('');
    $("#txt_currunitdecplace").val('');
    $("#txt_unitamtroprecision").val('');
    $("#cbo_rotype").val('N');
    $("#cbo_totalroto").val('N');
    $("#txt_totalroprecision").val('');
    $("#myModal").modal('show');
    $('#div_block').hide();
    $('#txt_currcd').focus();

};

var getempname = function (sel) {
    $('#txt_ename').val($("option:selected", sel).attr("ename"));
};

var roleaction = function (roleid, mode, description) {
    if (roleid == "" || roleid == undefined || roleid == "undefined") return;
    if (mode == 'currency') {
        window.location = "currency.aspx";
    }

    if (mode == 'edit') {
        showmodal();
        $('.modal-title').html('Edit Currency');
        CurrencyObject.hdnroleid = roleid;
        CurrencyObject.do_loaddataedit(roleid);
        $('#txt_currcd').focus();
    }
    else if (mode == 'delete') {
        $.alertable
            .custconfirm(`Are you want to delete the Currency ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    //alert(userid);
                    var _data;
                    _data = '{rowid:"' + roleid + '"}';

                    $.ajax({
                        type: "POST",
                        url: "currency.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                window.location = "currency.aspx";
                            }
                            else if (result.d.toLowerCase() == "true") {
                                $.alertable.alert(
                                    `Unable to delete.`
                                );
                            }
                        },
                        failure: function (response) {
                            validate = false;
                            //$.alertable.alert(`Problem in retreiving items...`);
                            $.alertable.alert(`Problem in retreiving items...`);
                        },
                    });

                },
                function () {
                    // alert('no delete');
                }
            );
    }
    else if (mode == 'exchangerates')
    {
        localStorage.CurrencyExchange_callfor = 'ce';
        localStorage.CurrencyExchange_callerid = roleid;
        localStorage.CurrencyExchange_calldescription = description
        //window.location = "exchange_rates.aspx";
        // window.open("exchange_rates.aspx")
        window.location = "exchange_rates.aspx?menuid=" + CurrencyObject._exchangeratemenuid[1];
    }
    /*
    var _createperm = MainObject.do_IsActionMenuPermission(
        "",
        CurrencyObject.coadata.pageid,
        "edit"
    );
    if (!_createperm) {
        $.alertable.alert(`You have no permission to edit data.`);
        return;
    }

    var _id = acid;
    if (_id != "0") window.location = "coasetup.aspx?id=" + _id;
    */
};

var showmodalPosting = function () {
    $('.modal-title').html('Currency - New');
    CurrencyObject.do_loadlookup();
    CurrencyObject.hdnroleid = '';
    $('#txt_currcd').val('');
    $('#txt_currdesc').val('');
    $("#myModal").modal('show');
};

var saveacurr = function () {
    var validate = true;
    if ($('#txt_currcd').val() == '') {
        validate = false;
        $.alertable.alert(`Currency Code required.`);
        $("#txt_currcd").focus();
        return false;
    }
    else if ($('#txt_currdesc').val() == '') {
        validate = false;
        $.alertable.alert(`Description required.`);
        $("#txt_currdesc").focus();
        return false;
    }
    else {
        var _data = '{rowid:"' + CurrencyObject.hdnroleid + '", currcd: "' + encodeURIComponent($("#txt_currcd").val().trim()) + '"}';

        $.ajax({
            type: "POST",
            url: "currency.aspx/docheckcurrcode",
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
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $.alertable.alert(
                        `Currency Code Already Exists.\n Please Try Another Currency Code.`
                    );
                    $("#txt_currcd").focus();
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
    //if (currencyresult.length > 0 && CurrencyObject.hdnroleid == '') {
    //    if (currencyresult[0].Table.filter(x => x.CurrCd == $('#txt_currcd').val()).length > 0) {
    //        validate = false;
    //        $.alertable.alert(`Currency code already exists.`);
    //        $("#txt_currcd").focus();
    //        return false;
    //    }
    //}
    if (Number($("#txt_currunitdecplace").val()) > 6) {
        validate = false;
        $.alertable.alert(`Maximum currency unit decimal place is 6`);
        $("#txt_currunitdecplace").focus();
        return false;
    }
    if (validate == true) {
        var _data = {};
        _data["rowid"] = CurrencyObject.hdnroleid;
        _data["currcd"] = $('#txt_currcd').val();
        _data["currdesc"] = $('#txt_currdesc').val();
        _data["ralizegainac"] = $("#cbo_ralizegainac").val();
        _data["realizelossac"] = $("#cbo_realizelossac").val();
        _data["unrealizegainac"] = $("#cbo_unrealizegainac").val();
        _data["unrealizelossac"] = $("#cbo_unrealizelossac").val();
        _data["convroacdr"] = $("#cbo_convroacdr").val();
        _data["convroaccr"] = $("#cbo_convroaccr").val();
        if ($("#txt_currunitdecplace").val() == '') {
            _data["currunitdecplace"] = 0;
        } else {
            _data["currunitdecplace"] = $("#txt_currunitdecplace").val();
        }
        if ($("#txt_unitamtroprecision").val() == '') {
            _data["unitamtroprecision"] = 0;
        } else {
            _data["unitamtroprecision"] = $("#txt_unitamtroprecision").val();
        }
        if ($("#txt_totalroprecision").val() == '') {
            _data["totalroprecision"] = 0;
        } else {
            _data["totalroprecision"] = $("#txt_totalroprecision").val();
        }
        _data["rotype"] = $("#cbo_rotype").val();
        _data["totalroto"] = $("#cbo_totalroto").val();
        _data["cocd"] = "ABC";
        if (ipaddress == '') {
            _data["creator_mac_add"] = "192.100.0.1";
        } else {
            _data["creator_mac_add"] = ipaddress;
        }
        //_data["isblock"] = $("#chk_isblocked").is(':checked'); //Pran 2021.05.23

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(passdata));

        var _url = "currency.aspx/doSavecurr";
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
                    //UsersObject.do_loadusers();
                    window.location = "currency.aspx";
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });
    }
};
function ShowIP(response) {
    ipaddress = response.ip;
}

