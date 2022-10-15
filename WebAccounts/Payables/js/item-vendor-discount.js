$(document).ready(function () {
    VendorItemDiscountObject.cocd = $('#ddlCompany').val();
    VendorItemDiscountObject.do_init();
    VendorItemDiscountObject.do_getUserPagepermission();

    var e = jQuery.Event("keydown");
    e.which = 13;
    e.keyCode = 13;
    $("#dd_vendorno").trigger(e);

    $('#dd_vendorno').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            //alert('You pressed a "enter" key in textbox');
            VendorItemDiscountObject.do_getvendordetails();
        }
    });


    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var VendorItemDiscountObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    Item: [],
    Vendorname: [],
    Uom: [],

    do_getvendordetails: () => {

        if (queryString('id') != undefined || queryString("id") != null) {
            VendorItemDiscountObject.vendorid = queryString("id");
            VendorItemDiscountObject.vendorcode = BankAccount.acNumber;
            $('#dd_vendorno').prop('readonly', true);
        }
        else {
            VendorItemDiscountObject.vendorid = "";
            VendorItemDiscountObject.vendorcode = "";
            localStorage.vendor_dimension_Name = undefined;
            localStorage.vendor_dimension_Code = undefined;
            $('#dd_vendorno').prop('readonly', false);
        }

        var _data = {};
        _data["cocd"] = VendorItemDiscountObject.cocd;
        _data["vendorcode"] = $('#dd_vendorno').val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            async: false,
            url: "../handler/datahandler.aspx/loadVendordetails",
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
                            if (objnew[key].length > 0) {
                                $('#dd_vendorno').val(objnew[key][0].VendCd);
                                VendorItemDiscountObject.vendorcode = objnew[key][0].VendCd;
                                $('#lbl_vendorcode').html(objnew[key][0].VendCd);
                                $('#lbl_vendorname').html(objnew[key][0].VendName);
                                $('#lbl_currency').html(objnew[key][0].CurrCd);

                              //  VendorItemDiscountObject.do_loadlookup();
                                VendorItemDiscountObject.do_loadvendoritemprice();
                            }
                            else {

                                $('#dd_vendorno').val('');
                                VendorItemDiscountObject.vendorcode = '';
                                $('#lbl_vendorcode').html('');
                                $('#lbl_vendorname').html('');
                                $('#lbl_currency').html('');
                               // $.alertable.alert(`Vendor Code Not Exist.`);

                            //    VendorItemDiscountObject.do_loadlookup();
                                VendorItemDiscountObject.do_loadvendoritemprice();
                                return;
                            }

                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });

    },

    do_init: () => {
        if (localStorage.vendor_dimension_Name != undefined && localStorage.vendor_dimension_Code != "undefined") {
            BankAccount.acNumber = localStorage.vendor_dimension_Code;
            BankAccount.bankName = localStorage.vendor_dimension_Name;
        }
        else {
            BankAccount.bankName = '';
            BankAccount.acNumber = '';
        }

        if (queryString('id') != undefined || queryString("id") != null) {
            VendorItemDiscountObject.vendorid = queryString("id");
            VendorItemDiscountObject.vendorcode = BankAccount.acNumber;
            VendorItemDiscountObject.do_loadlookup();
            $('#dd_vendorno').val(VendorItemDiscountObject.vendorcode);
            $('#dd_vendorno').prop("disabled", true);
            $('#dd_vendorno').prop('readonly', true);
               VendorItemDiscountObject.do_loadvendoritemprice();
            $('#lbl_vendorcode').html($('#dd_vendorno').val());  
        }
        else {
            $('#dd_vendorno').prop('readonly', false);
            var ck = $('#dd_vendorno').val();
            //$('#bankName').text(BankAccount.bankName);
            //  $('#dd_vendorno').val(BankAccount.acNumber);
            $('#lbl_vendorcode').html($('#dd_vendorno').val());
           // $('#lbl_vendorname').html(BankAccount.bankName);
                 VendorItemDiscountObject.do_getvendordetails();
                 VendorItemDiscountObject.do_loadlookup();
                 VendorItemDiscountObject.do_loadvendoritemprice();
        }

        ////$('#bankName').text(BankAccount.bankName);
        //$('#dd_vendorno').val(BankAccount.acNumber);
        //$('#lbl_vendorcode').html($('#dd_vendorno').val());
        //$('#lbl_vendorname').html(BankAccount.bankName);
        //VendorItemDiscountObject.do_getvendordetails();
        //VendorItemDiscountObject.do_loadlookup();
        //VendorItemDiscountObject.do_loadvendoritemprice();
    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(VendorItemDiscountObject);
        VendorItemDiscountObject._vieweperm = MainObject.do_IsActionMenuPermission(VendorItemDiscountObject.access, 'ITEM-VENDOR-DISCOUNT', 'view');
        VendorItemDiscountObject._createperm = MainObject.do_IsActionMenuPermission(VendorItemDiscountObject.access, 'ITEM-VENDOR-DISCOUNT', 'create');
        VendorItemDiscountObject._editperm = MainObject.do_IsActionMenuPermission(VendorItemDiscountObject.access, 'ITEM-VENDOR-DISCOUNT', 'edit');
        VendorItemDiscountObject._deleteperm = MainObject.do_IsActionMenuPermission(VendorItemDiscountObject.access, 'ITEM-VENDOR-DISCOUNT', 'delete');
    },

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = VendorItemDiscountObject.cocd;

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
                        if (attrName.toLowerCase() == "table13") {
                            VendorItemDiscountObject.Item = JSON.stringify(objnew[key]);

                            var _html = [];
                            var _data = JSON.parse(VendorItemDiscountObject.Item);
                            $.each(_data, function (key, value) {
                                _html.push(
                                    "<option value='" + value.ItemCd.replace(/[\r\n]+/gm, '') + "'>" + value.ItemDesc.replace(/[\r\n]+/gm, '') + "</option>"
                                );
                            });

                            $('#dd_searchitem').html(_html.join(""));
                            $('#dd_searchitem').prepend("<option value='' selected='selected'></option>");
                            if (localStorage.itemmasteroverviewitemno) {
                                $("#dd_searchitem").val(localStorage.itemmasteroverviewitemno);
                            }
                        }

                        if (attrName.toLowerCase() == "table16") {
                            VendorItemDiscountObject.Vendorname = JSON.stringify(objnew[key]);

                            var _html = [];
                            var _data = JSON.parse(VendorItemDiscountObject.Vendorname);
                            $.each(_data, function (key, value) {
                                _html.push(
                                    "<option value='" + value.VendCd.replace(/[\r\n]+/gm, '') + "' vendname='" + value.VendName.replace(/[\r\n]+/gm, '') + "'>" + value.VendName.replace(/[\r\n]+/gm, '') + " (" + value.VendCd.replace(/[\r\n]+/gm, '') + ")</option>"
                                );
                            });

                            $('#dd_vendorno').html(_html.join(""));
                            $('#dd_vendorno').prepend("<option value='' selected='selected'>--Select--</option>");
                        }


                        else if (attrName.toLowerCase() == "table14") {
                            VendorItemDiscountObject.Uom = JSON.stringify(objnew[key]);
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
            if (value.id == 'dd_item') {
                _html = [];
                var _data = JSON.parse(VendorItemDiscountObject.Item);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.ItemCd.replace(/[\r\n]+/gm, '') + "'>" + value.ItemDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_uom') {
                _html = [];
                var _data = JSON.parse(VendorItemDiscountObject.Uom);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.UomCd.replace(/[\r\n]+/gm, '') + "'>" + value.UomDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }

            if (value.id == 'dd_item' || value.id == 'dd_uom') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='' selected='selected'></option>");
            }

        });

    },

    do_loadvendoritemprice: () => {

        var _data = {};
        _data["vendorcode"] = $('#dd_vendorno').val();
        _data["item"] = $('#dd_searchitem').val();
        _data["startdate"] = $('#txt_searchstartdate').val();
        _data["enddate"] = $('#txt_searchenddate').val();
        _data["cocd"] = VendorItemDiscountObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "item-vendor-discount.aspx/loadvendoritemdiscountlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                $("#vendor_itemprice").dataTable().fnDestroy();

                VendorItemDiscountObject.do_populateVendorItemPrice(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateVendorItemPrice: (obj) => {
        // editor init

        table = $('#vendor_itemprice').DataTable({
            paging: false
        });

        table.destroy();

        var editor = new $.fn.dataTable.Editor({
            table: "#vendor_itemprice",
            fields: [
                { label: "VendCd", name: "VendCd" },
                { label: "VendName", name: "VendName" },
                { label: "ItemCd", name: "ItemCd" },
                { label: "UomDesc", name: "UomDesc" },
                { label: "MinQty", name: "MinQty" },
                { label: "MaxQty", name: "MaxQty" },
                { label: "DiscPer", name: "DiscPer" },
                { label: "DiscAmtPerUnit", name: "DiscAmtPerUnit" },
                { label: "StartDt", name: "StartDt" },
                { label: "EndDt", name: "EndDt" },
            ],
        });

        var roletable = $("#vendor_itemprice");
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
                { data: "VendCd" },
                { data: "VendName" },
                { data: "ItemCd" },
                { data: "CurrCd" },
                { data: "UomDesc" },
                { data: "MinQty" },
                { data: "MaxQty" },
                { data: "DiscPer" },
                { data: "DiscAmtPerUnit" },
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
                        id: 'itemvendordisc_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'itemvendordisc_edit'
                    },
                },
                {
                    extend: "remove", editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'itemvendordisc_remove'
                    },
                }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("code", `${data.VendCd}`);
                $(row).attr("name", `${data.VendName}`);
            },
        });

        var table = $('#vendor_itemprice').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!VendorItemDiscountObject._deleteperm[0]) {
                    $('#itemvendordisc_remove').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#itemvendordisc_remove').prop("disabled", true);
                    $('#itemvendordisc_remove').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!VendorItemDiscountObject._createperm[0]) {
            $('#itemvendordisc_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#itemvendordisc_create').prop("disabled", true);
            $('#itemvendordisc_create').attr('title', 'do not have permission to Add New Record!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!VendorItemDiscountObject._editperm[0]) {
            $('#itemvendordisc_edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#itemvendordisc_edit').prop("disabled", true);
            $('#itemvendordisc_edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!VendorItemDiscountObject._deleteperm[0]) {
            $('#itemvendordisc_remove').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#itemvendordisc_remove').prop("disabled", true);
            $('#itemvendordisc_remove').attr('title', 'do not have permission to delete Record!!!');
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
            url: "item-vendor-discount.aspx/doedit",
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
                                VendorItemDiscountObject.hdnid = objnew[key][0].RowId;
                                $('#dd_item').val(objnew[key][0].ItemCd);
                                $('#dd_item').prop("disabled", true);
                                $('#dd_uom').val(objnew[key][0].UomCd);
                                $('#txt_minqty').val(objnew[key][0].MinQty);
                                $('#txt_maxqty').val(objnew[key][0].MaxQty);
                                $('#txt_discount').val(objnew[key][0].DiscPer);
                                $('#txt_discountamount').val(objnew[key][0].DiscAmtPerUnit);
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

    if ($('#dd_vendorno').val() == '') {
        $.alertable.alert(`Vendor Code Not Exist.`);
        return;
    }

    $('.modal-title').html('Item-Vendor-Price - New');
    VendorItemDiscountObject.hdnid = '';

    $('#dd_item').val('');
    $('#dd_item').prop("disabled", false);
    $('#dd_uom').val('');
    $('#txt_minqty').val('');
    $('#txt_maxqty').val('');
    $('#txt_discount').val('');
    $('#txt_discountamount').val('');
    $('#txt_startdate').val('');
    $('#txt_enddate').val('');
    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();
    VendorItemDiscountObject.do_render_lookup();
    VendorItemDiscountObject.do_getvendordetails();
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

    

    if ($('#dd_item').val() == '') {
        validate = false;
        $.alertable.alert(`Item required.`);
        $("#dd_item").focus();
        return false;
    }
    else if ($('#dd_uom').val() == '') {
        validate = false;
        $.alertable.alert(`Unit of Measurement required.`);
        $("#dd_uom").focus();
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
        
    else if (parseFloat(min) > parseFloat(max) && (parseFloat(max) != 0 || parseFloat(max) != 0.00)) {
        validate = false;
        $.alertable.alert(`Maximum Qty. Cannot Be Less Then  Minimum Qty..`);
        $("#txt_maxqty").focus();
        return false;
    }
    else if (($('#txt_discountamount').val() == '' || $('#txt_discountamount').val() == '0' || $('#txt_discountamount').val() == '0.00') && ($('#txt_discount').val() == '' || $('#txt_discount').val() == '0' || $('#txt_discount').val() == '0.00')) {
        validate = false;
        $.alertable.alert(`Discount% or Discount Amount/Unit required.`);
        $("#txt_discountamount").focus();
        return false;
    }
    else if (($('#txt_discountamount').val() == '' && $('#txt_discountamount').val() == '0' && $('#txt_discountamount').val() == '0.00') && ($('#txt_discount').val() == '' && $('#txt_discount').val() == '0' && $('#txt_discount').val() == '0.00')) {
        validate = false;
        $.alertable.alert(`Discount% or Discount Amount/Unit required.`);
        $("#txt_discountamount").focus();
        return false;
    }
    else if (($('#txt_discountamount').val() != '' && $('#txt_discountamount').val() != '0' && $('#txt_discountamount').val() != '0.00') && ($('#txt_discount').val() != '') && $('#txt_discount').val() != '0' && $('#txt_discount').val() != '0.00') {
        validate = false;
        $.alertable.alert(`Only Discount% or Discount Amount required.`);
        $("#txt_discountamount").focus();
        return false;
    }
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
        //  + '", cocd: "' + VendorBankAcObject.cocd + '"}';
        var _data = '{id:"' + VendorItemDiscountObject.hdnid + '", vendorcode: "' + encodeURIComponent($("#lbl_vendorcode").html().trim()) + '", cocd: "' + encodeURIComponent(VendorItemDiscountObject.cocd) + '", startdate: "' + $('#txt_startdate').val() + '", enddate: "' + $('#txt_enddate').val() + '" , itemcode: "' + $('#dd_item').val() + '", uomcode: "' + $('#dd_uom').val() + '"}';

        $.ajax({
            type: "POST",
            url: "item-vendor-discount.aspx/docheckcode",
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

        if (VendorItemDiscountObject.hdnid == undefined || VendorItemDiscountObject.hdnid == 'undefined') VendorItemDiscountObject.hdnid = '';
        _data["id"] = VendorItemDiscountObject.hdnid;
        _data["cocd"] = VendorItemDiscountObject.cocd;

        _data["vendcode"] = $('#lbl_vendorcode').html();
        _data["itemcode"] = $('#dd_item').val();
        _data["uomcode"] = $('#dd_uom').val();
        _data["minqty"] = $('#txt_minqty').val();
        _data["maxqty"] = $('#txt_maxqty').val();
        _data["discount"] = $('#txt_discount').val();
        _data["discountperunit"] = $('#txt_discountamount').val();
        _data["startdate"] = $('#txt_startdate').val();
        _data["enddate"] = $('#txt_enddate').val();
        _data["Isblock"] = $("#chk_isblocked").is(':checked');
        _data["ip"] = VendorItemDiscountObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "item-vendor-discount.aspx/doSave";
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
                    VendorItemDiscountObject.do_loadvendoritemprice();
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
        VendorItemDiscountObject.do_loaddataedit(id);
        $('.modal-title').html('Item-Vendor-Price - Edit');
        $('#dd_item').focus();
    }

    else if (mode == 'delete') {

        $.alertable.custconfirm(`Are you want to delete the Item Discount ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{id:"' + id + '"}';
                    $.ajax({
                        type: "POST",
                        url: "item-vendor-discount.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                //window.location = "bank_master_overview.aspx";
                                VendorItemDiscountObject.do_loadvendoritemprice();
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
    VendorItemDiscountObject.ip = response.ip;
}
function onvendorchange(sel) {
    VendorItemDiscountObject.do_loadvendoritemprice();
};



