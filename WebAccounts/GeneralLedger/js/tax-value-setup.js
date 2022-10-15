$(document).ready(function () {
    TaxValueSetupObject.cocd = $('#ddlCompany').val();
    TaxValueSetupObject.do_init();
    TaxValueSetupObject.do_getUserPagepermission();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var TaxValueSetupObject = {
    taxid: '',
    taxcode: '',
    taxdesc: '',
    hdnid: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,

    do_init: () => {
        if (queryString('id') != undefined || queryString("id") != null) {
            TaxValueSetupObject.taxid = queryString('id');
            TaxValueSetupObject.taxcode = localStorage.sales_tax_component_Code;
            TaxValueSetupObject.taxdesc = localStorage.sales_tax_component_Desc;
            $('#lbl_taxcode').text(TaxValueSetupObject.taxcode + ' (' + TaxValueSetupObject.taxdesc + ')');
            localStorage.removeItem("sales_tax_component_Desc");
            localStorage.removeItem("sales_tax_component_Code");
            TaxValueSetupObject.do_load();
        }
        else {
            localStorage.removeItem("sales_tax_component_Desc");
            localStorage.removeItem("sales_tax_component_Code");
            window.location = "sales-tax-component.aspx";
        }

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(TaxValueSetupObject);
        TaxValueSetupObject._vieweperm = MainObject.do_IsActionMenuPermission(TaxValueSetupObject.access, 'TAX VALUE', 'view');
        TaxValueSetupObject._createperm = MainObject.do_IsActionMenuPermission(TaxValueSetupObject.access, 'TAX VALUE', 'create');
        TaxValueSetupObject._editperm = MainObject.do_IsActionMenuPermission(TaxValueSetupObject.access, 'TAX VALUE', 'edit');
        TaxValueSetupObject._deleteperm = MainObject.do_IsActionMenuPermission(TaxValueSetupObject.access, 'TAX VALUE', 'delete');
    },

    do_load: () => {

        var _data = {};
        _data["cocd"] = TaxValueSetupObject.cocd;
        _data["taxid"] = TaxValueSetupObject.taxid;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "tax-value-setup.aspx/loadlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                $("#item_table").dataTable().fnDestroy();

                TaxValueSetupObject.do_populate(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populate: (obj) => {
        // editor init

        table = $('#item_table').DataTable({
            paging: false
        });

        table.destroy();

        var editor = new $.fn.dataTable.Editor({
            table: "#item_table",
            fields: [
                { label: "FromDt", name: "FromDt" },
                { label: "ToDt", name: "ToDt" },
                { label: "MinBaseValueCalc", name: "MinBaseValueCalc" },
                { label: "MaxBaseValueCalc", name: "MaxBaseValueCalc" },
                { label: "ValuePerOrAmt", name: "ValuePerOrAmt" },
                { label: "MinSaleTaxAmt", name: "MinSaleTaxAmt" },
                { label: "MaxSaleTaxAmt", name: "MaxSaleTaxAmt" },
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
                { data: "FromDt" },
                { data: "ToDt" },
                { data: "MinBaseValueCalc" },
                { data: "MaxBaseValueCalc" },
                { data: "ValuePerOrAmt" },
                { data: "MinSaleTaxAmt" },
                { data: "MaxSaleTaxAmt" },
                { data: "IsBlock" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [25, 25, 25, 25, 25, 25, 25, 25],
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'taxvalue_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'taxvalue_edit'
                    },
                },
                {
                    extend: "remove", editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'taxvalue_remove'
                    },
                }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
            },
        });

        var table = $('#item_table').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!TaxValueSetupObject._deleteperm[0]) {
                    $('#taxvalue_remove').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#taxvalue_remove').prop("disabled", true);
                    $('#taxvalue_remove').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!TaxValueSetupObject._createperm[0]) {
            $('#taxvalue_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#taxvalue_create').prop("disabled", true);
            $('#taxvalue_create').attr('title', 'do not have permission to Add New Record!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!TaxValueSetupObject._editperm[0]) {
            $('#taxvalue_edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#taxvalue_edit').prop("disabled", true);
            $('#taxvalue_edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!TaxValueSetupObject._deleteperm[0]) {
            $('#taxvalue_remove').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#taxvalue_remove').prop("disabled", true);
            $('#taxvalue_remove').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
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
            url: "tax-value-setup.aspx/doedit",
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

                                TaxValueSetupObject.hdnid = objnew[key][0].RowId;
                                $('#txt_FromDt').val(objnew[key][0].FromDt);
                                $('#txt_ToDt').val(objnew[key][0].ToDt);
                                $('#txt_MinBaseValueCalc').val(objnew[key][0].MinBaseValueCalc);
                                $('#txt_MaxBaseValueCalc').val(objnew[key][0].MaxBaseValueCalc);
                                $('#txt_ValuePerOrAmt').val(objnew[key][0].ValuePerOrAmt);
                                $('#txt_MinSaleTaxAmt').val(objnew[key][0].MinSaleTaxAmt);
                                $('#txt_MaxSaleTaxAmt').val(objnew[key][0].MaxSaleTaxAmt);

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

};

var showmodal = function () {
    $('.modal-title').html('Tax Value Setup - New');
    TaxValueSetupObject.hdnid = '';
    $('#txt_FromDt').val('');
    $('#txt_ToDt').val('');
    $('#txt_MinBaseValueCalc').val('');
    $('#txt_MaxBaseValueCalc').val('');
    $('#txt_ValuePerOrAmt').val('');
    $('#txt_MinSaleTaxAmt').val('');
    $('#txt_MaxSaleTaxAmt').val('');
    $('#div_block').hide();

    $('#lbl_componentcode').text(TaxValueSetupObject.taxcode);
    $('#lbl_componentdesc').text(TaxValueSetupObject.taxdesc);

    $("#myModal").modal('show');

};

var savedata = function () {
    var validate = true;
    var MaxBaseValueCalc = 0, MinBaseValueCalc = 0, ValuePerOrAmt = 0, MinSaleTaxAmt = 0, MaxSaleTaxAmt = 0;

    var startDate = new Date($('#txt_FromDt').val());
    var endDate = new Date($('#txt_ToDt').val());

    if ($.trim($('#txt_MinBaseValueCalc').val()) == '') { MinBaseValueCalc = 0; } else { MinBaseValueCalc = $.trim($('#txt_MinBaseValueCalc').val()); }
    if ($.trim($('#txt_MaxBaseValueCalc').val()) == '') { MaxBaseValueCalc = 0; } else { MaxBaseValueCalc = $.trim($('#txt_MaxBaseValueCalc').val()); }

    if ($.trim($('#txt_ValuePerOrAmt').val()) == '') { ValuePerOrAmt = 0; } else { ValuePerOrAmt = $.trim($('#txt_ValuePerOrAmt').val()); }

    if ($.trim($('#txt_MinSaleTaxAmt').val()) == '') { MinSaleTaxAmt = 0; } else { MinSaleTaxAmt = $.trim($('#txt_MinSaleTaxAmt').val()); }
    if ($.trim($('#txt_MaxSaleTaxAmt').val()) == '') { MaxSaleTaxAmt = 0; } else { MaxSaleTaxAmt = $.trim($('#txt_MaxSaleTaxAmt').val()); }

    if ($.trim($('#txt_FromDt').val()) == '') {
        validate = false;
        $.alertable.alert(`From Date Required.`);
        $("#txt_FromDt").focus();
        return false;
    }
    else if ($.trim($('#txt_ToDt').val()) == '') {
        validate = false;
        $.alertable.alert(`To Date Required.`);
        $("#txt_ToDt").focus();
        return false;
    }
    else if (($.trim($('#txt_ToDt').val()) != '') && (endDate < startDate)) {
        validate = false;
        $.alertable.alert(`To Date Should Greater Then From Date.`);
        $("#txt_ToDt").focus();
        return false;
    }
    else if (parseFloat(MaxBaseValueCalc) < parseFloat(MinBaseValueCalc)) {
        validate = false;
        $.alertable.alert(`Maximum Base Value for Calculation Cannot Be Less Then  Minimum Base Value for Calculation.`);
        $("#txt_MaxBaseValueCalc").focus();
        return false;
    }
    else if (parseFloat(MaxSaleTaxAmt) < parseFloat(MinSaleTaxAmt)) {
        validate = false;
        $.alertable.alert(`Maximum Sales Tax Amount Cannot Be Less Then  Minimum Sales Tax Amount.`);
        $("#txt_MaxBaseValueCalc").focus();
        return false;
    }
    
    else {
        var _data = '{id:"' + TaxValueSetupObject.hdnid + '", SaleTaxCompId: "' + encodeURIComponent(TaxValueSetupObject.taxid) + '", cocd: "' + encodeURIComponent(TaxValueSetupObject.cocd) + '", FromDt: "' + $('#txt_FromDt').val() + '", ToDt: "' + $('#txt_ToDt').val() + '"}';

        $.ajax({
            type: "POST",
            url: "tax-value-setup.aspx/docheckcode",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
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
                                if (objnew[key][0].exist == '0') {
                                    validate = true;
                                }
                                else {
                                    validate = false;
                                    $.alertable.alert(
                                        objnew[key][0].errormsg
                                    );
                                    $("#txt_FromDt").focus();
                                    validate = false;
                                    return false;
                                }
                            }
                        }
                    }
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

        if (TaxValueSetupObject.hdnid == undefined || TaxValueSetupObject.hdnid == 'undefined') TaxValueSetupObject.hdnid = '';
        _data["id"] = TaxValueSetupObject.hdnid;
        _data["cocd"] = TaxValueSetupObject.cocd;
        _data["SaleTaxCompId"] = TaxValueSetupObject.taxid;
        _data["FromDt"] = $('#txt_FromDt').val();
        _data["ToDt"] = $('#txt_ToDt').val();
        _data["MinBaseValueCalc"] = MinBaseValueCalc;
        _data["MaxBaseValueCalc"] = MaxBaseValueCalc;
        _data["ValuePerOrAmt"] = ValuePerOrAmt;
        _data["MinSaleTaxAmt"] = MinSaleTaxAmt;
        _data["MaxSaleTaxAmt"] = MaxSaleTaxAmt;
        _data["Isblock"] = $("#chk_isblocked").is(':checked');
        _data["ip"] = TaxValueSetupObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "tax-value-setup.aspx/doSave";
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
                    //window.location = "item-vendor-discount.aspx";
                    $("#myModal").modal('hide');
                    $("#item_table").dataTable().fnDestroy();
                    TaxValueSetupObject.do_load();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {
        showmodal();
        TaxValueSetupObject.do_loaddataedit(id);
        $('.modal-title').html('Invoice Discount - Edit');
        $('#dd_item').focus();
    }

    else if (mode == 'delete') {

        $.alertable.custconfirm(`Are you want to delete the Tax Value Setup ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{id:"' + id + '"}';
                    $.ajax({
                        type: "POST",
                        url: "tax-value-setup.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                //window.location = "bank_master_overview.aspx";
                                $("#item_table").dataTable().fnDestroy();
                                TaxValueSetupObject.do_load();
                            }
                            else if (result.d.toLowerCase() == "true") {
                                $.alertable.alert(
                                    `Unable to delete.`
                                );
                            }
                        },
                        failure: function (response) {
                            validate = false;
                            $.alertable.alert(`Problem in retreiving items...`);
                        },
                    });

                },
            );
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
    TaxValueSetupObject.ip = response.ip;
};



