$(document).ready(function () {
    TaxComponentSetupObject.cocd = $('#ddlCompany').val();
    
    TaxComponentSetupObject.do_getUserPagepermission();
    TaxComponentSetupObject.do_init();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var TaxComponentSetupObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _SalesTaxGrpId:'',
    SalesTaxComponent: [],

    do_init: () => {
        if (queryString('id') != undefined || queryString("id") != null) {
            TaxComponentSetupObject._SalesTaxGrpId = queryString("id");

            $('#lbl_code').text(localStorage.sales_tax_grpitem_Code);
            $('#lbl_descr').text(localStorage.sales_tax_grpitem_Desc);
            localStorage.removeItem("sales_tax_grpitem_Code");
            localStorage.removeItem("sales_tax_grpitem_Desc");

            TaxComponentSetupObject.do_loadoverview();
            TaxComponentSetupObject.do_loadlookup();
        }
        else {
            TaxComponentSetupObject._SalesTaxGrpId = '';
            window.location = "sales-tax-group-for-items-overview.aspx";
        }

    },
  
    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = TaxComponentSetupObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            async: false,
            url: "tax-component-setup.aspx/loadlookupdata",
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
                            TaxComponentSetupObject.SalesTaxComponent = JSON.stringify(objnew[key]);
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
            if (value.id == 'dd_SaleTaxCompId') {
                _html = [];
                if (TaxComponentSetupObject.SalesTaxComponent != '[]') {
                    var _data = JSON.parse(TaxComponentSetupObject.SalesTaxComponent);
                    $.each(_data, function (key, value) {
                        _html.push(
                            //"<option value='" + value.GrpCd.replace(/[\r\n]+/gm, '') + "'>" + value.GrpCd.replace(/[\r\n]+/gm, '') + " (" + value.GrpName.replace(/[\r\n]+/gm, '') + ")</option>"
                            "<option value='" + value.RowId + "' code='" + value.SaleTaxCompCd.replace(/[\r\n]+/gm, '') + "' SaleTaxCompDesc='" + value.SaleTaxCompDesc.replace(/[\r\n]+/gm, '') + "' MethodOfCalc='" + value.MethodOfCalc.replace(/[\r\n]+/gm, '') + "'>" + value.SaleTaxCompDesc.replace(/[\r\n]+/gm, '') + " (" + value.SaleTaxCompCd.replace(/[\r\n]+/gm, '') + ")</option>"
                        );
                    });
                }
            }
            

            //if (value.id != 'dd_StateCd' && value.id != 'dd_EntityType' && value.id != 'dd_Block' && value.id != 'dd_VendBankId') {
            if (value.id == 'dd_SaleTaxCompId') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='0' selected='selected'></option>");
            }
        });

    },

    do_loadBasisofCalculation: (val) => {
        var _html = [];
        $("#dd_TaxOnTax").prop("disabled", true);

        if (val == 'P') {
            $('#dd_Unit').html(_html.join(""));
            $('#dd_Unit').prepend("<option value='' selected='selected'></option>");
            $("#dd_Unit").prop("disabled", true);

            var _data = JSON.parse(TaxComponentSetupObject.BasisOfCalc);
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

            var _data = JSON.parse(TaxComponentSetupObject.Unit);
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
            var _data = JSON.parse(TaxComponentSetupObject.TaxonTax);
            $.each(_data, function (key, value) {
                if (value.RowId != TaxComponentSetupObject.hdnid) {
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

    do_changeSaleTaxCompId: () => {
        if ($('#dd_SaleTaxCompId').val() != '') {
            var element = $('#dd_SaleTaxCompId').find('option:selected');
            var desc = element.attr("saletaxcompdesc");
            var method = element.attr("methodofcalc");
            if (method == 'V') method = 'Value';
            else if (method == 'P') method = 'Percentage';
            else method = '';
            $('#txt_descr').val(desc);
            $('#txt_type').val(method);
        }
        else {
            $('#txt_descr').val('');
            $('#txt_type').val('');
        }
    },

    do_loadoverview: () => {

        var _data = {};
        _data["cocd"] = TaxComponentSetupObject.cocd;
        _data["module"] = 'SalesTaxComponentSetup';
        _data["SalesTaxGrpId"] = TaxComponentSetupObject._SalesTaxGrpId;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "tax-component-setup.aspx/loadVendorAccountOverviewlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                TaxComponentSetupObject.do_populateOverview(obj);
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
                { label: "SaleTaxCompCd", name: "SaleTaxCompCd" },
                { label: "SaleTaxCompDesc", name: "SaleTaxCompDesc" },
                { label: "MethodOfCalc", name: "MethodOfCalc" },
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
                { data: "SaleTaxCompCd" },
                { data: "SaleTaxCompDesc" },
                { data: "MethodOfCalc" },
                { data: "IsBlock" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [20, 100, 50],
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
                }

            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("code", `${data.SaleTaxCompCd}`);
                $(row).attr("descr", `${data.SaleTaxCompDesc}`);
            },
        });


        var table = $('#item_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!TaxComponentSetupObject._deleteperm[0]) {
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

        if (!TaxComponentSetupObject._createperm[0]) {
            $('#create_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#create_salestaxcomponent').prop("disabled", true);
            $('#create_salestaxcomponent').attr('title', 'do not have Add permission!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!TaxComponentSetupObject._editperm[0]) {
            $('#edit_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#edit_salestaxcomponent').prop("disabled", true);
            $('#edit_salestaxcomponent').attr('title', 'do not have Edit permission!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!TaxComponentSetupObject._deleteperm[0]) {
            $('#remove_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#remove_salestaxcomponent').prop("disabled", true);
            $('#remove_salestaxcomponent').attr('title', 'do not have Delete permission!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }

    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["id"] = id;
        _data["module"] = 'SalesTaxComponentSetup';

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "tax-component-setup.aspx/doedit",
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
                                TaxComponentSetupObject.hdnid = objnew[key][0].RowId;
                                $('#dd_SaleTaxCompId').val(objnew[key][0].SaleTaxCompId);
                                $('#dd_SaleTaxCompId').prop('readonly', true);
                                TaxComponentSetupObject.do_changeSaleTaxCompId();
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
        MainObject.do_getuserpageaccess(TaxComponentSetupObject);
        TaxComponentSetupObject._vieweperm = MainObject.do_IsActionMenuPermission(TaxComponentSetupObject.access, 'COMPONENT SET-UP', 'view');
        TaxComponentSetupObject._createperm = MainObject.do_IsActionMenuPermission(TaxComponentSetupObject.access, 'COMPONENT SET-UP', 'create');
        TaxComponentSetupObject._editperm = MainObject.do_IsActionMenuPermission(TaxComponentSetupObject.access, 'COMPONENT SET-UP', 'edit');
        TaxComponentSetupObject._deleteperm = MainObject.do_IsActionMenuPermission(TaxComponentSetupObject.access, 'COMPONENT SET-UP', 'delete');
    },

};

var showmodal = function () {
    $('.modal-title').html('Tax Component Set-up - New');
    TaxComponentSetupObject.hdnid = '';
    $("#div_modal").find("*").prop('disabled', false);

    $('#dd_SaleTaxCompId').val('');
    $('#dd_SaleTaxCompId').prop('readonly', false);

    $('#txt_descr').val('');
    $('#txt_type').val('');

    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();
    TaxComponentSetupObject.do_render_lookup();
    $("#myModal").modal('show');

};

var getempname = function (sel) {
    $('#txt_ename').val($("option:selected", sel).attr("ename"));
};

var savedata = function () {
    var validate = true;

    if ($('#dd_SaleTaxCompId').val() == '0') {
        validate = false;
        $.alertable.alert(`Component Code required.`);
        $("#dd_SaleTaxCompId").focus();
        return false;
    }

    else {
        var _data = '{id:"' + TaxComponentSetupObject.hdnid + '", componentid: "' + encodeURIComponent($("#dd_SaleTaxCompId").val().trim()) + '",grpid: "' + encodeURIComponent(TaxComponentSetupObject._SalesTaxGrpId) + '", cocd: "' + encodeURIComponent(TaxComponentSetupObject.cocd) + '", module: "SalesTaxComponentSetup"}';

        $.ajax({
            type: "POST",
            url: "tax-component-setup.aspx/docheckcode",
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
                        `Data Already Exists.\n Please Try Another Component Code.`
                    );
                    $("#txt_SalesTaxGrpCd").focus();
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

        if (TaxComponentSetupObject.hdnid == undefined || TaxComponentSetupObject.hdnid == 'undefined') TaxComponentSetupObject.hdnid = '';
        _data["id"] = TaxComponentSetupObject.hdnid;
        _data["cocd"] = TaxComponentSetupObject.cocd;
        _data["module"] = 'SalesTaxComponentSetup';
        _data["SalesTaxGrpId"] = TaxComponentSetupObject._SalesTaxGrpId;
        _data["componentid"] = $("#dd_SaleTaxCompId").val();
        _data["code"] = $('#txt_SalesTaxGrpCd').val();
        _data["isblock"] = $("#chk_isblocked").is(':checked');

        _data["ip"] = TaxComponentSetupObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "tax-component-setup.aspx/doSave";
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
                    //window.location = "tax-component-setup.aspx";
                    $("#myModal").modal('hide');
                    $("#item_table").dataTable().fnDestroy();
                    TaxComponentSetupObject.do_loadoverview();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var doactionModal = function (mode) {
    doaction(TaxComponentSetupObject.hdnid, mode);
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {

        TaxComponentSetupObject.do_loaddataedit(id);
        showmodal();
        $('.modal-title').html('Tax Component Set-up - Edit');
        $('#dd_SaleTaxCompId').focus();
    }
    else if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '", module:"SalesTaxComponentSetup"}';

        $.ajax({
            type: "POST",
            url: "tax-component-setup.aspx/docheckdelete",
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
                .custconfirm(`Are you want to delete this  Tax Component Set-up?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + id + '", module:"SalesTaxComponentSetup"}';

                        $.ajax({
                            type: "POST",
                            url: "tax-component-setup.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    //window.location = "tax-component-setup.aspx";
                                    $("#item_table").dataTable().fnDestroy();
                                    TaxComponentSetupObject.do_loadoverview();
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

    if (mode == 'componentsetup') {
        localStorage.sales_tax_grpitem_Desc = name;
        localStorage.sales_tax_grpitem_Code = code;

        //window.location = "vendor-dimension.aspx?id=" + id;
        window.location = "tax-component-setup.aspx?id=" + id;
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
    TaxComponentSetupObject.ip = response.ip;
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
