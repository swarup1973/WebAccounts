$(document).ready(function () {
    TaxSettlementObject.cocd = $('#ddlCompany').val();
    /*if (localStorage._vendoracpagemenuid == '' || localStorage._vendoracpagemenuid == undefined) {
        localStorage._vendoracpagemenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._vendoracpagemenuid;
    }*/
    TaxSettlementObject.do_getUserPagepermission();
    TaxSettlementObject.do_loadoverview();
    TaxSettlementObject.do_loadlookup();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var TaxSettlementObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _taxsettlementmenuid:'',
    _taxassignperiodviewperm: false,

    TaxAuth: [],

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = TaxSettlementObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            async: false,
            url: "tax-settlement.aspx/loadlookupdata",
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
                            TaxSettlementObject.TaxAuth = JSON.stringify(objnew[key]);
                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_render_lookup: () => {
        var _html = [];
        var cntrl_cbo = [];
        cntrl_cbo = $("#myModal").find("select");

        $.each(cntrl_cbo, function (key, value) {
            if (value.id == 'dd_TaxAuthId') {
                _html = [];
                if (TaxSettlementObject.TaxAuth != '[]') {
                    var _data = JSON.parse(TaxSettlementObject.TaxAuth);
                    $.each(_data, function (key, value) {
                        _html.push(
                            //"<option value='" + value.GrpCd.replace(/[\r\n]+/gm, '') + "'>" + value.GrpCd.replace(/[\r\n]+/gm, '') + " (" + value.GrpName.replace(/[\r\n]+/gm, '') + ")</option>"
                            "<option value='" + value.RowId + "' desc='" + value.AuthDesc + "' AuthCd='" + value.AuthCd + "'>" + value.AuthCd.replace(/[\r\n]+/gm, '') + "</option>"
                        );
                    });
                }
            }

            if (value.id == 'dd_TaxAuthId') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='0' selected='selected' desc='' AuthCd='' ></option>");
            }
        });

    },

    do_changeTaxAuthId: () => {

        if ($('#dd_TaxAuthId').val() != '') {
            var element = $('#dd_TaxAuthId').find('option:selected');
            var desc = element.attr("desc");
            var authcd = element.attr("authcd");
            $('#txt_TaxAuthIdDesc').val(desc);
        }
        else {
            $('#txt_TaxAuthIdDesc').val('');
        }

    },

    do_loadBasisofCalculation: (val) => {
        var _html = [];
        $("#dd_TaxOnTax").prop("disabled", true);

        if (val == 'P') {
            $('#dd_Unit').html(_html.join(""));
            $('#dd_Unit').prepend("<option value='' selected='selected'></option>");
            $("#dd_Unit").prop("disabled", true);

            var _data = JSON.parse(TaxSettlementObject.BasisOfCalc);
            $.each(_data, function (key, value) {
                //if (value.CountryCd.replace(/[\r\n]+/gm, '') == val) {
                _html.push(
                    "<option value='" + value.id.replace(/[\r\n]+/gm, '') + "'>" + value.descr.replace(/[\r\n]+/gm, '') + "</option>"
                );
                //}
            });

            $('#dd_BasisOfCalc').html(_html.join(""));
            $('#dd_BasisOfCalc').prepend("<option value='' selected='selected'></option>");
            $("#dd_BasisOfCalc").prop("disabled", false);
        }

        if (val == 'V') {
            $('#dd_BasisOfCalc').html(_html.join(""));
            $('#dd_BasisOfCalc').prepend("<option value='' selected='selected'></option>");
            $("#dd_BasisOfCalc").prop("disabled", true);

            var _data = JSON.parse(TaxSettlementObject.Unit);
            $.each(_data, function (key, value) {
                //if (value.CountryCd.replace(/[\r\n]+/gm, '') == val) {
                _html.push(
                    "<option value='" + value.RowId + "'>" + value.UomDesc.replace(/[\r\n]+/gm, '') + "</option>"
                );
                //}
            });

            $('#dd_Unit').html(_html.join(""));
            $('#dd_Unit').prepend("<option value='' selected='selected'></option>");
            $("#dd_Unit").prop("disabled", false);
        }
    },

    do_loadTaxonTax: (val) => {
        var _html = [];
        //dd_TaxOnTax
        if (val == 'TAmt') {
            $("#dd_TaxOnTax").prop("disabled", false);
            var _data = JSON.parse(TaxSettlementObject.TaxonTax);
            $.each(_data, function (key, value) {
                if (value.RowId != TaxSettlementObject.hdnid) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.SaleTaxCompDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                }
            });
        }
        else {
            $("#dd_TaxOnTax").prop("disabled", true);
        }

        $('#dd_TaxOnTax').html(_html.join(""));
        $('#dd_TaxOnTax').prepend("<option value='0' selected='selected'></option>");

    },

    do_changesettlement: (obj) => {

        alert(this.val);

    },

    do_loadoverview: () => {

        var _data = {};
        _data["cocd"] = TaxSettlementObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "tax-settlement.aspx/loadOverviewlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                TaxSettlementObject.do_populateOverview(obj);
                
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateOverview: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#item_table",
            fields: [
                { label: "SettleCd", name: "SettleCd" },
                { label: "SettleName", name: "SettleName" },
                { label: "PrdIntervalType", name: "PrdIntervalType" },
                { label: "PrdIntervalUnit", name: "PrdIntervalUnit" },
                { label: "AuthCd", name: "AuthCd" },
                { label: "AuthDesc", name: "AuthDesc" },
                { label: "IsBlock", name: "IsBlock" },
            ],
        });

        var roletable = $("#item_table");
        //userstable.html("");

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
                { data: "SettleCd" },
                { data: "SettleName" },
                { data: "PrdIntervalType" },
                { data: "PrdIntervalUnit" },
                { data: "AuthCd" },
                { data: "AuthDesc" },
                { data: "IsBlock" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [20, 50, 25, 50, 50,50,50],
            buttons: [
                {
                    add: "create", text: 'New', disabled: 'true', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'create_salestaxcomponent'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'edit_salestaxcomponent'
                    },
                },
                {
                    extend: "remove", text: "Delete", editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'remove',
                        id: 'remove_salestaxcomponent'
                    },
                },
                {
                    add: "Assign Settlement Period", text: 'Assign Settlement Period', editor: editor, action: function () { doactiontaxvalue($('.selected').attr('RowId'), 'settlementperion', $('.selected').attr('code'), $('.selected').attr('descr')); },
                    attr: {
                        title: 'Tax Value',
                        id: 'TaxValue'
                    },

                }

            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("code", `${data.SettleCd}`);
                $(row).attr("descr", `${data.SettleName}`);
            },
        });


        var table = $('#item_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!TaxSettlementObject._deleteperm[0]) {
                    $('#remove_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#remove_salestaxcomponent').prop("disabled", true);
                    $('#remove_salestaxcomponent').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!TaxSettlementObject._createperm[0]) {
            $('#create_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#create_salestaxcomponent').prop("disabled", true);
            $('#create_salestaxcomponent').attr('title', 'do not have Add permission!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!TaxSettlementObject._editperm[0]) {
            $('#edit_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#edit_salestaxcomponent').prop("disabled", true);
            $('#edit_salestaxcomponent').attr('title', 'do not have Edit permission!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!TaxSettlementObject._deleteperm[0]) {
            $('#remove_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#remove_salestaxcomponent').prop("disabled", true);
            $('#remove_salestaxcomponent').attr('title', 'do not have Delete permission!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }


        if (!TaxSettlementObject._taxvalueviewperm[0]) {
            $('#TaxValue').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#TaxValue').prop("disabled", true);
            $('#TaxValue').attr('title', 'do not have view permission!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }


    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["id"] = id;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "tax-settlement.aspx/doedit",
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
                                TaxSettlementObject.hdnid = objnew[key][0].RowId;
                                $('#txt_SettleCd').val(objnew[key][0].SettleCd);
                                $('#txt_SettleCd').prop('readonly', true);

                                $('#txt_SettleName').val(objnew[key][0].SettleName);
                                $('#dd_TaxAuthId').val(objnew[key][0].TaxAuthId);
                                $('#dd_PrdIntervalType').val(objnew[key][0].PrdIntervalType);
                                $('#txt_PrdIntervalUnit').val(objnew[key][0].PrdIntervalUnit);

                                if (objnew[key][0].IsBlock == true) {
                                    $('#chk_isblocked').prop('checked', true);
                                }
                                else {
                                    $('#chk_isblocked').prop('checked', false);
                                }

                                $('#div_block').show();
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

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(TaxSettlementObject);
        TaxSettlementObject._vieweperm = MainObject.do_IsActionMenuPermission(TaxSettlementObject.access, 'TAX SETTLEMENT SETUP', 'view');
        TaxSettlementObject._createperm = MainObject.do_IsActionMenuPermission(TaxSettlementObject.access, 'TAX SETTLEMENT SETUP', 'create');
        TaxSettlementObject._editperm = MainObject.do_IsActionMenuPermission(TaxSettlementObject.access, 'TAX SETTLEMENT SETUP', 'edit');
        TaxSettlementObject._deleteperm = MainObject.do_IsActionMenuPermission(TaxSettlementObject.access, 'TAX SETTLEMENT SETUP', 'delete');
        TaxSettlementObject._taxsettlementmenuid = MainObject.do_IsActionMenuPermission(TaxSettlementObject.access, 'TAX SETTLEMENT SETUP', 'menuid');
        //TaxSettlementObject._taxvalueviewperm = MainObject.do_IsActionMenuPermission(TaxSettlementObject.access, 'Dimension', 'view');
        TaxSettlementObject._taxvalueviewperm = MainObject.do_IsActionMenuPermission(TaxSettlementObject.access, 'ASSIGN SETTLEMENT PERIOD', 'view');
    },

};

var showmodal = function () {
    $('.modal-title').html('Tax Settlement Set-up - New');
    TaxSettlementObject.hdnid = '';
    $("#div_modal").find("*").prop('disabled', false);

    $('#txt_SettleCd').val('');
    $('#txt_SettleCd').prop('readonly', false);
    $('#txt_SettleName').val('');
    $('#dd_TaxAuthId').val('0');
    $('#dd_PrdIntervalType').val('D');
    $('#txt_PrdIntervalUnit').val('0');

    TaxSettlementObject.do_render_lookup();

    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();

    $("#myModal").modal('show');

};

var getempname = function (sel) {
    $('#txt_ename').val($("option:selected", sel).attr("ename"));
};

var savedata = function () {
    var validate = true;

    if ($('#txt_SettleCd').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txt_SettleCd").focus();
        return false;
    }
    else if ($('#txt_SettleName').val() == '') {
        validate = false;
        $.alertable.alert(`Name required.`);
        $("#txt_SettleName").focus();
        return false;
    }
    else if ($('#dd_TaxAuthId').val() == '0') {
        validate = false;
        $.alertable.alert(`Tax Authority Code required.`);
        $("#dd_TaxAuthId").focus();
        return false;
    }

    else {
        var _data = '{id:"' + TaxSettlementObject.hdnid + '", code: "' + encodeURIComponent($("#txt_SettleCd").val().trim()) + '", cocd: "' + encodeURIComponent(TaxSettlementObject.cocd) + '"}';

        $.ajax({
            type: "POST",
            url: "tax-settlement.aspx/docheckcode",
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
                    $.alertable.alert(
                        `Code Already Exists.\n Please Try Another Code.`
                    );
                    $("#txt_SettleCd").focus();
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



    var _data = {};
    if (validate == true) {

        if (TaxSettlementObject.hdnid == undefined || TaxSettlementObject.hdnid == 'undefined') TaxSettlementObject.hdnid = '';
        _data["id"] = TaxSettlementObject.hdnid;
        _data["cocd"] = TaxSettlementObject.cocd;

        _data["code"] = $('#txt_SettleCd').val();
        _data["SettleName"] = $('#txt_SettleName').val();
        _data["TaxAuthId"] = $('#dd_TaxAuthId').val();
        _data["PrdIntervalType"] = $('#dd_PrdIntervalType').val();
        _data["PrdIntervalUnit"] = $('#txt_PrdIntervalUnit').val();
        _data["isblock"] = $("#chk_isblocked").is(':checked');
        _data["ip"] = TaxSettlementObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "tax-settlement.aspx/doSave";
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
                    //window.location = "tax-settlement.aspx";
                    $("#myModal").modal('hide');
                    $("#item_table").dataTable().fnDestroy();
                    TaxSettlementObject.do_loadoverview();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var doactionModal = function (mode) {
    doaction(TaxSettlementObject.hdnid, mode);
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {

        TaxSettlementObject.do_loaddataedit(id);
        showmodal();
        $('.modal-title').html('Tax Settlement Set-up - Edit');
        $('#txt_SaleTaxCompDesc').focus();
    }
    else if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '"}';

        $.ajax({
            type: "POST",
            url: "tax-settlement.aspx/docheckdelete",
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
                    $.alertable.alert(
                        `Cant Delete.`
                    );
                    validate = false;
                    return false;
                }
            },
            failure: function (response) {
                validate = false;
                $.alertable.alert(`Problem in retreiving items...`);
            },
        });

        if (validate == true) {

            $.alertable
                .custconfirm(`Are you want to delete this  Sales tax Component?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + id + '"}';

                        $.ajax({
                            type: "POST",
                            url: "tax-settlement.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    //window.location = "tax-settlement.aspx";
                                    $("#item_table").dataTable().fnDestroy();
                                    TaxSettlementObject.do_loadoverview();
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
    }


};

var doactiontaxvalue = function (id, mode, code, name) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'settlementperion') {
        localStorage.tax_settlement_Desc = name;
        localStorage.tax_settlement_Code = code;

        window.location = "assign-settlement-period.aspx?id=" + id;
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
    TaxSettlementObject.ip = response.ip;
};

var OnchangeIsWitholdingTaxApp = function () {
    if ($("#chk_IsWitholdingTaxApp").is(':checked')) {
        $("#dd_WHTaxGrpCd").prop("disabled", false);
    }
    else {
        $("#dd_WHTaxGrpCd").prop("disabled", true);
        $("#dd_WHTaxGrpCd").val('');
    }
};
