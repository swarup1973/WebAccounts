$(document).ready(function () {
    InvoiceDiscountObject.cocd = $('#ddlCompany').val();
    InvoiceDiscountObject.do_init();
    InvoiceDiscountObject.do_getUserPagepermission();


    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var InvoiceDiscountObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    Currency: [],


    do_init: () => {
        InvoiceDiscountObject.do_loadlookup();
        InvoiceDiscountObject.do_loadinvoicediscount();
    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(InvoiceDiscountObject);
        InvoiceDiscountObject._vieweperm = MainObject.do_IsActionMenuPermission(InvoiceDiscountObject.access, 'Purchase Invoice Discount', 'view');
        InvoiceDiscountObject._createperm = MainObject.do_IsActionMenuPermission(InvoiceDiscountObject.access, 'Purchase Invoice Discount', 'create');
        InvoiceDiscountObject._editperm = MainObject.do_IsActionMenuPermission(InvoiceDiscountObject.access, 'Purchase Invoice Discount', 'edit');
        InvoiceDiscountObject._deleteperm = MainObject.do_IsActionMenuPermission(InvoiceDiscountObject.access, 'Purchase Invoice Discount', 'delete');
    },

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = InvoiceDiscountObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            async: false,
            url: "../handler/datahandler.aspx/loadlookupdataVendorAccountOverview",
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
                        if (attrName.toLowerCase() == "table15") {
                            InvoiceDiscountObject.Currency = JSON.stringify(objnew[key]);
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
        cntrl_cbo = $.find("select");

        $.each(cntrl_cbo, function (key, value) {
            if (value.id == 'dd_currency') {
                _html = [];
                var _data = JSON.parse(InvoiceDiscountObject.Currency);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.CurrCd.replace(/[\r\n]+/gm, '') + "'>" + value.CurrDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }

            if (value.id == 'dd_currency') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='' selected='selected'></option>");
            }

        });

    },

    do_loadinvoicediscount: () => {

        var _data = {};
        _data["cocd"] = InvoiceDiscountObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "invoice-discount.aspx/loadlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                $("#vendor_table").dataTable().fnDestroy();

                InvoiceDiscountObject.do_populateVendorItemPrice(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateVendorItemPrice: (obj) => {
        // editor init

        table = $('#vendor_table').DataTable({
            paging: false
        });

        table.destroy();

        var editor = new $.fn.dataTable.Editor({
            table: "#vendor_table",
            fields: [
                { label: "InvDiscCd", name: "InvDiscCd" },
                { label: "CurrDesc", name: "CurrDesc" },
                { label: "MinQty", name: "MinQty" },
                { label: "MaxQty", name: "MaxQty" },
                { label: "DiscPer", name: "DiscPer" },
                { label: "DiscAmt", name: "DiscAmt" },
                { label: "StartDt", name: "StartDt" },
                { label: "EndDt", name: "EndDt" },
            ],
        });

        var roletable = $("#vendor_table");
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
            dom: "lBfrtip",
            fixedHeader: true,
            data: roledata,
            columns: [
                { data: "InvDiscCd" },
                { data: "CurrDesc" },
                { data: "MinQty" },
                { data: "MaxQty" },
                { data: "DiscPer" },
                { data: "DiscAmt" },
                { data: "StartDt" },
                { data: "EndDt" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 25, 10, 10, 50, 50, 50, 50, 50, 50],
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'invdisc_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'invdisc_edit'
                    },
                },
                {
                    extend: "remove", editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'invdisc_remove'
                    },
                }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("code", `${data.VendCd}`);
                $(row).attr("name", `${data.VendName}`);
            },
        });

        var table = $('#vendor_table').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!InvoiceDiscountObject._deleteperm[0]) {
                    $('#invdisc_remove').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#invdisc_remove').prop("disabled", true);
                    $('#invdisc_remove').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!InvoiceDiscountObject._createperm[0]) {
            $('#invdisc_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#invdisc_create').prop("disabled", true);
            $('#invdisc_create').attr('title', 'do not have permission to Add New Record!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!InvoiceDiscountObject._editperm[0]) {
            $('#invdisc_edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#invdisc_edit').prop("disabled", true);
            $('#invdisc_edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!InvoiceDiscountObject._deleteperm[0]) {
            $('#invdisc_remove').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#invdisc_remove').prop("disabled", true);
            $('#invdisc_remove').attr('title', 'do not have permission to delete Record!!!');
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
            url: "invoice-discount.aspx/doedit",
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
                                InvoiceDiscountObject.hdnid = objnew[key][0].RowId;
                                $('#txt_invoicediscountcode').val(objnew[key][0].InvDiscCd);
                                $('#txt_invoicediscountcode').prop("disabled", true);
                                $('#dd_currency').val(objnew[key][0].CurrCd);
                                $('#dd_item').prop("disabled", true);
                                $('#txt_minqty').val(objnew[key][0].MinQty);
                                $('#txt_maxqty').val(objnew[key][0].MaxQty);
                                $('#txt_discount').val(objnew[key][0].DiscPer);
                                $('#txt_discountamount').val(objnew[key][0].DiscAmt);
                                $('#txt_startdate').val(objnew[key][0].StartDt);
                                $('#txt_enddate').val(objnew[key][0].EndDt);
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

    $('.modal-title').html('Invoice Discount - New');
    InvoiceDiscountObject.hdnid = '';
    $('#txt_invoicediscountcode').val('');
    $('#txt_invoicediscountcode').prop("disabled", false);
    $('#dd_currency').val('');
    $('#dd_currency').prop("disabled", false);
    $('#txt_minqty').val('');
    $('#txt_maxqty').val('');
    $('#txt_discount').val('');
    $('#txt_discountamount').val('');
    $('#txt_startdate').val('');
    $('#txt_enddate').val('');
    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();
    InvoiceDiscountObject.do_render_lookup();
    $("#myModal").modal('show');

};

var savedata = function () {
    var validate = true;
    var max = 0, min = 0;

    min = $('#txt_minqty').val();
    if ($('#txt_maxqty').val() == '' || $('#txt_maxqty').val() == '0') max = $('#txt_minqty').val() + 1;
    else max = $('#txt_maxqty').val();

    var startDate = new Date($('#txt_startdate').val());
    var endDate = new Date($('#txt_enddate').val());



    if ($('#txt_invoicediscountcode').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txt_invoicediscountcode").focus();
        return false;
    }
    else if ($('#dd_currency').val() == '') {
        validate = false;
        $.alertable.alert(`Currency required.`);
        $("#dd_currency").focus();
        return false;
    }
    else if ($('#txt_minqty').val() == '') {
        validate = false;
        $.alertable.alert(`Minimum Qty. required.`);
        $("#txt_minqty").focus();
        return false;
    }
    else if ($('#txt_minqty').val() == '0' || $('#txt_minqty').val() == '0.00') {
        validate = false;
        $.alertable.alert(`Minimum Qty. should be greater then 0.`);
        $("#txt_minqty").focus();
        return false;
    }
    
    else if (max < min) {
        validate = false;
        $.alertable.alert(`Maximum Qty. Cannot Be Less Then  Minimum Qty..`);
        $("#txt_maxqty").focus();
        return false;
    }
    else if ($('#txt_discountamount').val() == '' && $('#txt_discount').val() == '') {
        validate = false;
        $.alertable.alert(`Discount% or Discount Amount required.`);
        $("#txt_discountamount").focus();
        return false;
    }
    /*else if (($('#txt_discountamount').val() != '' || $('#txt_discountamount').val() != '0' || $('#txt_discountamount').val() != '0.00') && ($('#txt_discount').val() != '') || $('#txt_discount').val() != '0' || $('#txt_discount').val() != '0.00') {
        validate = false;
        $.alertable.alert(`Only Discount% or Discount Amount required.`);
        $("#txt_discountamount").focus();
        return false;
    }*/

    else if ($.trim($('#txt_startdate').val()) == '') {
        validate = false;
        $.alertable.alert(`Starting Date required.`);
        $("#txt_startdate").focus();
        return false;
    }

    else if ($.trim($('#txt_enddate').val()) != '') {
        if (endDate < startDate) {
            validate = false;
            $.alertable.alert(`End Date Should Greater Then Start Date.`);
            $("#txt_enddate").focus();
            return false;
        }
    }

    else {
        var _data = '{id:"' + InvoiceDiscountObject.hdnid + '", invdiscountcode: "' + encodeURIComponent($("#txt_invoicediscountcode").val().trim()) + '", cocd: "' + encodeURIComponent(InvoiceDiscountObject.cocd) + '", startdate: "' + $('#txt_startdate').val() + '", enddate: "' + $('#txt_enddate').val() + '" , curcode: "' + $('#dd_currency').val() + '"}';

        $.ajax({
            type: "POST",
            url: "invoice-discount.aspx/docheckcode",
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
                                    $("#txt_startdate").focus();
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

        if (InvoiceDiscountObject.hdnid == undefined || InvoiceDiscountObject.hdnid == 'undefined') InvoiceDiscountObject.hdnid = '';
        _data["id"] = InvoiceDiscountObject.hdnid;
        _data["cocd"] = InvoiceDiscountObject.cocd;

        _data["invoicediscountcode"] = $('#txt_invoicediscountcode').val();
        _data["currcode"] = $('#dd_currency').val();
        _data["minqty"] = $('#txt_minqty').val();
        _data["maxqty"] = $('#txt_maxqty').val();
        _data["discount"] = $('#txt_discount').val();
        _data["discountamount"] = $('#txt_discountamount').val();
        _data["startdate"] = $('#txt_startdate').val();
        _data["enddate"] = $('#txt_enddate').val();
        _data["Isblock"] = $("#chk_isblocked").is(':checked');
        _data["ip"] = InvoiceDiscountObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "invoice-discount.aspx/doSave";
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
                    InvoiceDiscountObject.do_loadinvoicediscount();
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
        InvoiceDiscountObject.do_loaddataedit(id);
        $('.modal-title').html('Invoice Discount - Edit');
        $('#dd_item').focus();
    }

    else if (mode == 'delete') {

        $.alertable.custconfirm(`Are you want to delete the Invoice Discount ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{id:"' + id + '"}';
                    $.ajax({
                        type: "POST",
                        url: "invoice-discount.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                //window.location = "bank_master_overview.aspx";
                                InvoiceDiscountObject.do_loadinvoicediscount();
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
    InvoiceDiscountObject.ip = response.ip;
};



