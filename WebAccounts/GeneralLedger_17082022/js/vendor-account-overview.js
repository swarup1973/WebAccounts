$(document).ready(function () {
    VendorAccountOverviewObject.cocd = $('#ddlCompany').val();
    if (localStorage._vendoracpagemenuid == '' || localStorage._vendoracpagemenuid == undefined) {
        localStorage._vendoracpagemenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._vendoracpagemenuid;
    }
    VendorAccountOverviewObject.do_loadvendoraccountoverview();
    VendorAccountOverviewObject.do_loadlookup();
    VendorAccountOverviewObject.do_getUserPagepermission();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var VendorAccountOverviewObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _dimensionviewperm: false,
    _vendorbankwperm: false,
    _itemvendorpriceperm: false,
    _itemvendordiscountperm: false,
    _invoicediscountperm: false,
    _transactionperm: false,
    _sendreminderperm: false,
    _vendoracpagemenuid: '',
    _dimensionmenuid: '',
    _vendoracmenuid: '',
    _itemvendorpricemenuid: '',
    _itemcvendordiscemenuid: '',
    _invdismenuid: '',
    _tranmenuid: '',
    _sendremmenuid: '',
    VendorPostingGroup: [],
    Currency: [],
    County: [],
    State: [],
    PaymentTerm: [],
    PaymentMothod: [],
    ShipmentMethod: [],
    NatureofBusiness: [],
    BranchApplicable: [],
    PersonResponsible: [],
    BankAccount: [],
    WitholdingTaxGroup: [],
    SelsTaxGroup: [],

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = VendorAccountOverviewObject.cocd;

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
                        if (attrName.toLowerCase() == "table") {
                            VendorAccountOverviewObject.VendorPostingGroup = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table1") {
                            VendorAccountOverviewObject.Currency = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table2") {
                            VendorAccountOverviewObject.County = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table3") {
                            VendorAccountOverviewObject.State = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table4") {
                            VendorAccountOverviewObject.PaymentTerm = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table5") {
                            VendorAccountOverviewObject.PaymentMothod = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table6") {
                            VendorAccountOverviewObject.ShipmentMethod = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table7") {
                            VendorAccountOverviewObject.NatureofBusiness = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table8") {
                            VendorAccountOverviewObject.BranchApplicable = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table9") {
                            VendorAccountOverviewObject.PersonResponsible = JSON.stringify(objnew[key]);
                        }
                        /*else if (attrName.toLowerCase() == "table10") {
                            VendorAccountOverviewObject.BankAccount = JSON.stringify(objnew[key]);
                        }*/
                        else if (attrName.toLowerCase() == "table11") {
                            VendorAccountOverviewObject.WitholdingTaxGroup = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table12") {
                            VendorAccountOverviewObject.SelsTaxGroup = JSON.stringify(objnew[key]);
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
        cntrl_cbo = $("#div_modal").find("select");

        $.each(cntrl_cbo, function (key, value) {
            if (value.id == 'dd_VendGrpCd') {
                _html = [];
                var _data = JSON.parse(VendorAccountOverviewObject.VendorPostingGroup);
                $.each(_data, function (key, value) {
                    _html.push(
                        //"<option value='" + value.GrpCd.replace(/[\r\n]+/gm, '') + "'>" + value.GrpCd.replace(/[\r\n]+/gm, '') + " (" + value.GrpName.replace(/[\r\n]+/gm, '') + ")</option>"
                        "<option value='" + value.GrpCd.replace(/[\r\n]+/gm, '') + "'>" + value.GrpName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_CurrCd') {
                _html = [];
                var _data = JSON.parse(VendorAccountOverviewObject.Currency);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.CurrCd.replace(/[\r\n]+/gm, '') + "'>" + value.CurrDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_CountryCd') {
                _html = [];
                var _data = JSON.parse(VendorAccountOverviewObject.County);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.CountryCd.replace(/[\r\n]+/gm, '') + "'>" + value.CountryName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_PmtTermsCd') {
                _html = [];
                var _data = JSON.parse(VendorAccountOverviewObject.PaymentTerm);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.PmtTermsCd.replace(/[\r\n]+/gm, '') + "'>" + value.PmtTermsDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_PmtMethodCd') {
                _html = [];
                var _data = JSON.parse(VendorAccountOverviewObject.PaymentMothod);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.PmtMethodCd.replace(/[\r\n]+/gm, '') + "'>" + value.PmtMethodDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_ShipMethodCd') {
                _html = [];
                var _data = JSON.parse(VendorAccountOverviewObject.ShipmentMethod);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.MethodCd.replace(/[\r\n]+/gm, '') + "'>" + value.MethodDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_BusinessNatureCd') {
                _html = [];
                var _data = JSON.parse(VendorAccountOverviewObject.NatureofBusiness);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.NatureCd.replace(/[\r\n]+/gm, '') + "'>" + value.NatureDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_BranchCd') {
                _html = [];
                var _data = JSON.parse(VendorAccountOverviewObject.BranchApplicable);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.BranchCd.replace(/[\r\n]+/gm, '') + "'>" + value.BranchName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_PersonRespId') {
                _html = [];
                var _data = JSON.parse(VendorAccountOverviewObject.PersonResponsible);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.EName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            /*else if (value.id == 'dd_VendBankId') {
                _html = [];
                var _data = JSON.parse(VendorAccountOverviewObject.BankAccount);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.BankAcNo.replace(/[\r\n]+/gm, '') + "'>" + value.BankName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }*/
            else if (value.id == 'dd_WHTaxGrpCd') {
                _html = [];
                var _data = JSON.parse(VendorAccountOverviewObject.WitholdingTaxGroup);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.WHTaxDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_SalesTaxGrpCd') {
                _html = [];
                var _data = JSON.parse(VendorAccountOverviewObject.SelsTaxGroup);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.SalesTaxGrpDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }

            if (value.id != 'dd_StateCd' && value.id != 'dd_EntityType' && value.id != 'dd_Block' && value.id != 'dd_VendBankId') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='' selected='selected'></option>");
            }
        });

    },

    do_loadstate: (val) => {
        var _html = [];
        var _data = JSON.parse(VendorAccountOverviewObject.State);
        $.each(_data, function (key, value) {
            if (value.CountryCd.replace(/[\r\n]+/gm, '') == val) {
                _html.push(
                    "<option value='" + value.StateCd.replace(/[\r\n]+/gm, '') + "'>" + value.StateName.replace(/[\r\n]+/gm, '') + "</option>"
                );
            }
        });

        $('#dd_StateCd').html(_html.join(""));
        $('#dd_StateCd').prepend("<option value='' selected='selected'></option>");
    },

    do_loadvendoraccountoverview: () => {

        var _data = {};
        _data["cocd"] = VendorAccountOverviewObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "vendor-account-overview.aspx/loadVendorAccountOverviewlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                VendorAccountOverviewObject.do_populateVendorAccountOverview(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateVendorAccountOverview: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#vendor_table",
            fields: [
                { label: "VendCd", name: "VendCd" },
                { label: "VendName", name: "VendName" },
                { label: "VendSearch", name: "VendSearch" },
                { label: "balance", name: "balance" },
                { label: "balance_lcy", name: "balance_lcy" },
                { label: "cur_statistics", name: "cur_statistics" },
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
            dom: "Bfrtip",
            fixedHeader: true,
            data: roledata,
            columns: [
                { data: "VendCd" },
                { data: "VendName" },
                { data: "VendSearch" },
                { data: "balance" },
                { data: "balance_lcy" },
                { data: "cur_statistics" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 50, 50],
            buttons: [
                {
                    add: "create", text: 'New', disabled: 'true', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'create_vendor_bank_ac'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'edit_vendor_bank_ac'
                    },
                },
                {
                    extend: "remove", text: "Delete", editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'remove',
                        id: 'remove_vendor_bank_ac'
                    },
                },
                {
                    add: "view", text: 'View', editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'view'); },
                    attr: {
                        title: 'View',
                        id: 'view_vendor_bank_ac'
                    },
                },
                {
                    add: "dimension", text: 'Dimension', editor: editor, action: function () { doactiondimension($('.selected').attr('RowId'), 'dimension', $('.selected').attr('code'), $('.selected').attr('name')); },
                    attr: {
                        title: 'Dimension',
                        id: 'dimension'
                    },

                },
                {
                    add: "vendorbankac", text: 'Vendor Bank AC',
                    attr: {
                        title: 'Vendor Bank AC',
                        id: 'vendor_bank_ac'
                    },
                    editor: editor, action: function () { doactiondimension($('.selected').attr('RowId'), 'bank', $('.selected').attr('code'), $('.selected').attr('name')); } 
                },
                {
                    add: "itemvendorprice", text: 'Item-Vendor-Price', editor: editor, action: function () { doactiondimension($('.selected').attr('RowId'), 'itemprice', $('.selected').attr('code'), $('.selected').attr('name')); } ,
                    attr: {
                        title: 'Item Vendor Price',
                        id: 'item_vendor_price'
                    },
                },
                {
                    add: "itemvendordiscount", text: 'Item-Vendor-Discount', editor: editor, action: function () { doactiondimension($('.selected').attr('RowId'), 'itemdiscount', $('.selected').attr('code'), $('.selected').attr('name')); },
                    attr: {
                        title: 'Item Vendor Discount',
                        id: 'item_vendor_discount'
                    },
                },
                {
                    add: "invoicediscount", text: 'Invoice Discount', editor: editor, action: function () { doactiondimension($('.selected').attr('RowId'), 'invoicediscount', $('.selected').attr('code'), $('.selected').attr('name')); },
                    attr: {
                        title: 'Invoice Discount',
                        id: 'invoice_discount'
                    },
                },
                {
                    add: "transaction", text: 'Transaction', editor: editor, action: () => window.open("vendor-transaction.aspx"),
                    attr: {
                        title: 'Transaction',
                        id: 'transaction'
                    },
                },
                {
                    add: "sendreminder", text: 'Send Reminder', editor: editor, action: () => window.open("#"),
                    attr: {
                        title: 'Send Reminder',
                        id: 'send_reminder'
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
                if (!VendorAccountOverviewObject._deleteperm[0]) {
                    $('#remove_vendor_bank_ac').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#remove_vendor_bank_ac').prop("disabled", true);
                    $('#remove_vendor_bank_ac').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!VendorAccountOverviewObject._createperm[0]) {
            $('#create_vendor_bank_ac').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#create_vendor_bank_ac').prop("disabled", true);
            $('#create_vendor_bank_ac').attr('title', 'do not have Add permission!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!VendorAccountOverviewObject._editperm[0]) {
            $('#edit_vendor_bank_ac').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#edit_vendor_bank_ac').prop("disabled", true);
            $('#edit_vendor_bank_ac').attr('title', 'do not have Edit permission!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!VendorAccountOverviewObject._deleteperm[0]) {
            $('#remove_vendor_bank_ac').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#remove_vendor_bank_ac').prop("disabled", true);
            $('#remove_vendor_bank_ac').attr('title', 'do not have Delete permission!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!VendorAccountOverviewObject._vieweperm[0]) {
            $('#vendor_bank_ac').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#vendor_bank_ac').prop("disabled", true);
            table.button(3).action(function () {
                this.active(false);
            });
        }

        if (!VendorAccountOverviewObject._dimensionviewperm[0]) {
            $('#dimension').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#dimension').prop("disabled", true);
            $('#dimension').attr('title', 'do not have view permission!!!');
            table.button(4).action(function () {
                this.active(false);
            });
        }
        if (!VendorAccountOverviewObject._vendorbankwperm[0]) {
            $('#vendor_bank_ac').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#vendor_bank_ac').prop("disabled", true);
            $('#vendor_bank_ac').attr('title', 'do not have view permission!!!');
            table.button(5).action(function () {
                this.active(false);
            });
        }
        
        if (!VendorAccountOverviewObject._itemvendorpriceperm[0]) {
            $('#item_vendor_price').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#item_vendor_price').prop("disabled", true);
            $('#item_vendor_price').attr('title', 'do not have view permission!!!');
            table.button(6).action(function () {
                this.active(false);
            });
        }
        if (!VendorAccountOverviewObject._itemvendordiscountperm[0]) {
            $('#item_vendor_discount').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#item_vendor_discount').prop("disabled", true);
            $('#item_vendor_discount').attr('title', 'do not have view permission!!!');
            table.button(7).action(function () {
                this.active(false);
            });
        }

        if (!VendorAccountOverviewObject._invoicediscountperm[0]) {
            $('#invoice_discount').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#invoice_discount').prop("disabled", true);
            $('#invoice_discount').attr('title', 'do not have view permission!!!');
            table.button(8).action(function () {
                this.active(false);
            });
        }
        if (!VendorAccountOverviewObject._transactionperm[0]) {
            $('#transaction').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#transaction').prop("disabled", true);
            $('#transaction').attr('title', 'do not have view permission!!!');
            table.button(9).action(function () {
                this.active(false);
            });
        }
        if (!VendorAccountOverviewObject._sendreminderperm[0]) {
            $('#send_reminder').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#send_reminder').prop("disabled", true);
            $('#send_reminder').attr('title', 'do not have view permission!!!');
            table.button(10).action(function () {
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
            url: "vendor-account-overview.aspx/doedit",
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
                            VendorAccountOverviewObject.BankAccount = JSON.stringify(objnew[key]);
                            var _html = [];
                            var _data = JSON.parse(VendorAccountOverviewObject.BankAccount);
                            $.each(_data, function (key, value) {
                                _html.push(
                                    "<option value='" + value.RowId + "'>" + value.BankName.replace(/[\r\n]+/gm, '') + ' (' + value.BankAcNo.replace(/[\r\n]+/gm, '') + ")</option>"
                                );
                            });
                            $('#dd_VendBankId').html(_html.join(""));
                            $('#dd_VendBankId').prepend("<option value='' selected='selected'></option>");
                        }
                        if (attrName.toLowerCase() == "table1") {
                            if (objnew[key].length > 0) {
                                VendorAccountOverviewObject.hdnid = objnew[key][0].RowId;
                                $('#txt_VendCd').val(objnew[key][0].VendCd);
                                $('#txt_VendCd').prop('readonly', true);
                                $('#txt_VendName').val(objnew[key][0].VendName);
                                $('#txt_VendSearch').val(objnew[key][0].VendSearch);
                                $('#txt_CrLimit').val(objnew[key][0].CrLimit);
                                $('#dd_VendGrpCd').val(objnew[key][0].VendGrpCd);
                                if (objnew[key][0].IsForeignVendor == true) {
                                    $('#chk_IsForeignVendor').prop('checked', true);
                                }
                                else {
                                    $('#chk_IsForeignVendor').prop('checked', false);
                                }
                                $('#dd_CurrCd').val(objnew[key][0].CurrCd);
                                $('#dd_BranchCd').val(objnew[key][0].BranchCd);
                                $('#dd_EntityType').val(objnew[key][0].EntityType);
                                $('#dd_PersonRespId').val(objnew[key][0].PersonRespId);
                                $('#dd_Block').val(objnew[key][0].Block);
                                $('#txt_CreditRating').val(objnew[key][0].CreditRating);
                                $('#txt_Address1').val(objnew[key][0].Address1);
                                $('#txt_Address2').val(objnew[key][0].Address2);
                                $('#txt_Pin').val(objnew[key][0].Pin);
                                $('#txt_City').val(objnew[key][0].City);
                                $('#dd_CountryCd').val(objnew[key][0].CountryCd);
                                VendorAccountOverviewObject.do_loadstate(objnew[key][0].CountryCd);
                                $('#dd_StateCd').val(objnew[key][0].StateCd);
                                $('#txt_PhoneNo').val(objnew[key][0].PhoneNo);
                                $('#txt_AlternateNo').val(objnew[key][0].AlternateNo);
                                $('#txt_FaxNo').val(objnew[key][0].FaxNo);
                                $('#txt_ContactPerson').val(objnew[key][0].ContactPerson);
                                $('#txt_Email').val(objnew[key][0].Email);
                                $('#txt_Website').val(objnew[key][0].Website);
                                $('#txt_PrePmtPer').val(objnew[key][0].PrePmtPer);
                                $('#dd_PmtTermsCd').val(objnew[key][0].PmtTermsCd);
                                $('#dd_PmtMethodCd').val(objnew[key][0].PmtMethodCd);
                                if (objnew[key][0].PriceIncludeST == true) {
                                    $('#chk_PriceIncludeST').prop('checked', true);
                                }
                                else {
                                    $('#chk_PriceIncludeST').prop('checked', false);
                                }
                                $('#dd_VendBankId').val(objnew[key][0].VendBankId);
                                $('#txt_PrintNameOnCheque').val(objnew[key][0].PrintNameOnCheque);

                                $('#dd_ShipMethodCd').val(objnew[key][0].ShipMethodCd);
                                $('#txt_LeadTimeInDay').val(objnew[key][0].LeadTimeInDay);

                                $('#txt_TaxAcNo').val(objnew[key][0].TaxAcNo);
                                if (objnew[key][0].Is1099App == true) {
                                    $('#chk_Is1099App').prop('checked', true);
                                }
                                else {
                                    $('#chk_Is1099App').prop('checked', false);
                                }
                                $('#dd_BusinessNatureCd').val(objnew[key][0].BusinessNatureCd);
                                $('#txt_GstRegdNo').val(objnew[key][0].GstRegdNo);
                                if (objnew[key][0].IsWitholdingTaxApp == true) {
                                    $('#chk_IsWitholdingTaxApp').prop('checked', true);
                                    $("#dd_WHTaxGrpCd").prop("disabled", false);
                                    $('#dd_WHTaxGrpCd').val(objnew[key][0].WHTaxGrpCd);
                                }
                                else {
                                    $('#chk_IsWitholdingTaxApp').prop('checked', false);
                                    $("#dd_WHTaxGrpCd").prop("disabled", true);
                                    //$('#dd_WHTaxGrpCd').val(objnew[key][0].WHTaxGrpCd);
                                }

                                //$('#dd_WHTaxGrpCd').val(objnew[key][0].WHTaxGrpCd);
                                $('#txt_TaxExampNo').val(objnew[key][0].TaxExampNo);
                                $('#dd_SalesTaxGrpCd').val(objnew[key][0].SalesTaxGrpCd);
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
        MainObject.do_getuserpageaccess(VendorAccountOverviewObject);
        VendorAccountOverviewObject._vieweperm = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Vendor', 'view');
        VendorAccountOverviewObject._createperm = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Vendor', 'create');
        VendorAccountOverviewObject._editperm = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Vendor', 'edit');
        VendorAccountOverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Vendor', 'delete');
        VendorAccountOverviewObject._dimensionviewperm = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Dimension', 'view');
        VendorAccountOverviewObject._vendorbankwperm = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Vendor Bank A/c', 'view');
        VendorAccountOverviewObject._itemvendorpriceperm = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Item-Vendor-Price', 'view');
        VendorAccountOverviewObject._itemvendordiscountperm = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Item-Vendor-Discount', 'view');
        VendorAccountOverviewObject._invoicediscountperm = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Purchase Invoice Discount', 'view');
        VendorAccountOverviewObject._transactionperm = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Transaction', 'view');
        VendorAccountOverviewObject._sendreminderperm = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Send Reminder', 'view');

        VendorAccountOverviewObject._dimensionmenuid = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Dimension', 'menuid');
        VendorAccountOverviewObject._vendoracmenuid = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Vendor Bank A/c', 'menuid');
        VendorAccountOverviewObject._itemvendorpricemenuid = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Item-Vendor-Price', 'menuid');
        VendorAccountOverviewObject._itemcvendordiscemenuid = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Item-Vendor-Discount', 'menuid');
        VendorAccountOverviewObject._invdismenuid = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Purchase Invoice Discount', 'menuid');
        VendorAccountOverviewObject._tranmenuid = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Transaction', 'menuid');
        VendorAccountOverviewObject._sendremmenuid = MainObject.do_IsActionMenuPermission(VendorAccountOverviewObject.access, 'Send Reminder', 'menuid');
    },

};

var showmodal = function () {
    $('.modal-title').html('Vendor Account - New');
    /*VendorAccountOverviewObject.do_loadlookup();
    VendorAccountOverviewObject.hdnroleid = '';
    $('#txt_code').val('');
    $('#txt_code').prop('readonly', false);
    $('#txt_description').val('');
    $('#chk_isblocked').prop('checked', false);  //Pran 2021.05.23
    $("#myModalEDIT").modal('show');
    $('#div_block').hide();
    $('#txt_code').focus();*/
    VendorAccountOverviewObject.hdnid = '';
    $("#div_modal").find("*").prop('disabled', false);

    $('#btnEdit').hide();
    $('#btnDelete').hide();
    $('#btn_save').show();

    $('#txt_VendCd').val('');
    $('#txt_VendCd').prop('readonly', false);
    $('#txt_VendName').val('');
    $('#txt_VendSearch').val('');
    $('#txt_CrLimit').val('');
    //_data["VendGrpCd"] = $('#dd_VendGrpCd').val();
    $('#chk_IsForeignVendor').prop('checked', false);
    //_data["CurrCd"] = $('#dd_CurrCd').val();
    //_data["BranchCd"] = $('#dd_BranchCd').val();
    //_data["EntityType"] = $('#dd_EntityType').val();
    //_data["PersonRespId"] = $('#dd_PersonRespId').val();
    //_data["Block"] = $('#dd_Block').val();
    $('#txt_CreditRating').val('');

    $('#txt_Address1').val('');
    $('#txt_Address2').val('');
    $('#txt_Pin').val('');
    $('#txt_City').val('');
    //_data["CountryCd"] = $('#dd_CountryCd').val();
    //_data["StateCd"] = $('#dd_StateCd').val();
    $('#dd_StateCd').empty();
    $('#txt_PhoneNo').val('');
    $('#txt_AlternateNo').val('');
    $('#txt_FaxNo').val('');
    $('#txt_ContactPerson').val('');
    $('#txt_Email').val('');
    $('#txt_Website').val('');

    $('#txt_PrePmtPer').val('');
    //_data["PmtTermsCd"] = $('#dd_PmtTermsCd').val();
    //_data["PmtMethodCd"] = $('#dd_PmtMethodCd').val();
    $('#chk_PriceIncludeST').prop('checked', false);
    $("#dd_WHTaxGrpCd").prop("disabled", true);
    $('#dd_VendBankId').empty();
    //_data["VendBankId"] = $('#dd_VendBankId').val();
    $('#txt_PrintNameOnCheque').val('');

    //_data["ShipMethodCd"] = $('#dd_ShipMethodCd').val();
    $('#txt_LeadTimeInDay').val('');

    $('#txt_TaxAcNo').val('');
    $('#chk_Is1099App').prop('checked', false);
    //_data["BusinessNatureCd"] = $('#dd_BusinessNatureCd').val();
    $('#txt_GstRegdNo').val();
    $('#chk_IsWitholdingTaxApp').prop('checked', false);
    //_data["WHTaxGrpCd"] = $('#dd_WHTaxGrpCd').val();
    $('#txt_TaxExampNo').val('');
    //_data["SalesTaxGrpCd"] = $('#dd_SalesTaxGrpCd').val();
    VendorAccountOverviewObject.do_render_lookup();
    $("#myModal").modal('show');

};

var getempname = function (sel) {
    $('#txt_ename').val($("option:selected", sel).attr("ename"));
};

var savedata = function () {
    var validate = true;

    if ($('#txt_VendCd').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txt_VendCd").focus();
        return false;
    }
    else if ($('#dd_VendGrpCd').val() == '') {
        validate = false;
        $.alertable.alert(`Vendor Posting Group required.`);
        $("#dd_VendGrpCd").focus();
        return false;
    }
    else if ($('#txt_Pin').val() == '') {
        validate = false;
        $.alertable.alert(`Pin required.`);
        $("#txt_Pin").focus();
        return false;
    }
    else if ($('#txt_City').val() == '') {
        validate = false;
        $.alertable.alert(`City required.`);
        $("#txt_City").focus();
        return false;
    }
    else if ($('#dd_CountryCd').val() == '') {
        validate = false;
        $.alertable.alert(`Country required.`);
        $("#dd_CountryCd").focus();
        return false;
    }
    else if ($('#dd_StateCd').val() == '') {
        validate = false;
        $.alertable.alert(`County required.`);
        $("#dd_StateCd").focus();
        return false;
    }


    else {
        var _data = '{id:"' + VendorAccountOverviewObject.hdnid + '", code: "' + encodeURIComponent($("#txt_VendCd").val().trim()) + '", cocd: "' + encodeURIComponent(VendorAccountOverviewObject.cocd) + '"}';

        $.ajax({
            type: "POST",
            url: "vendor-account-overview.aspx/docheckcode",
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
                    $("#txt_VendCd").focus();
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

        if (VendorAccountOverviewObject.hdnid == undefined || VendorAccountOverviewObject.hdnid == 'undefined') VendorAccountOverviewObject.hdnid = '';
        _data["id"] = VendorAccountOverviewObject.hdnid;
        _data["cocd"] = VendorAccountOverviewObject.cocd;

        _data["code"] = $('#txt_VendCd').val();
        _data["VendName"] = $('#txt_VendName').val();
        _data["VendSearch"] = $('#txt_VendSearch').val();
        _data["CrLimit"] = $('#txt_CrLimit').val();
        _data["VendGrpCd"] = $('#dd_VendGrpCd').val();
        _data["IsForeignVendor"] = $("#chk_IsForeignVendor").is(':checked');

        _data["CurrCd"] = $('#dd_CurrCd').val();
        _data["BranchCd"] = $('#dd_BranchCd').val();
        _data["EntityType"] = $('#dd_EntityType').val();
        _data["PersonRespId"] = $('#dd_PersonRespId').val();
        _data["Block"] = $('#dd_Block').val();

        _data["CreditRating"] = $('#txt_CreditRating').val();

        _data["Address1"] = $('#txt_Address1').val();
        _data["Address2"] = $('#txt_Address2').val();
        _data["Pin"] = $('#txt_Pin').val();
        _data["City"] = $('#txt_City').val();
        _data["CountryCd"] = $('#dd_CountryCd').val();
        _data["StateCd"] = $('#dd_StateCd').val();
        _data["PhoneNo"] = $('#txt_PhoneNo').val();
        _data["AlternateNo"] = $('#txt_AlternateNo').val();
        _data["FaxNo"] = $('#txt_FaxNo').val();
        _data["ContactPerson"] = $('#txt_ContactPerson').val();
        _data["Email"] = $('#txt_Email').val();
        _data["Website"] = $('#txt_Website').val();

        _data["PrePmtPer"] = $('#txt_PrePmtPer').val();
        _data["PmtTermsCd"] = $('#dd_PmtTermsCd').val();
        _data["PmtMethodCd"] = $('#dd_PmtMethodCd').val();
        _data["PriceIncludeST"] = $("#chk_PriceIncludeST").is(':checked');

        if ($('#dd_VendBankId').val() == null)
            _data["VendBankId"] = '';
        else
            _data["VendBankId"] = $('#dd_VendBankId').val();

        _data["PrintNameOnCheque"] = $('#txt_PrintNameOnCheque').val();

        _data["ShipMethodCd"] = $('#dd_ShipMethodCd').val();
        _data["LeadTimeInDay"] = $('#txt_LeadTimeInDay').val();

        _data["TaxAcNo"] = $('#txt_TaxAcNo').val();
        _data["Is1099App"] = $("#chk_Is1099App").is(':checked');
        _data["BusinessNatureCd"] = $('#dd_BusinessNatureCd').val();
        _data["GstRegdNo"] = $('#txt_GstRegdNo').val();
        _data["IsWitholdingTaxApp"] = $("#chk_IsWitholdingTaxApp").is(':checked');
        _data["WHTaxGrpCd"] = $('#dd_WHTaxGrpCd').val();
        _data["TaxExampNo"] = $('#txt_TaxExampNo').val();
        _data["SalesTaxGrpCd"] = $('#dd_SalesTaxGrpCd').val();

        _data["ip"] = VendorAccountOverviewObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "vendor-account-overview.aspx/doSave";
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
                    window.location = "vendor-account-overview.aspx";
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var doactionModal = function (mode) {
    doaction(VendorAccountOverviewObject.hdnid, mode);
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {

        VendorAccountOverviewObject.do_loaddataedit(id);
        showmodal();
        $('.modal-title').html('Vendor Account - Edit');
        $('#txt_VendName').focus();
    }
    else if (mode == 'view') {

        VendorAccountOverviewObject.do_loaddataedit(id);
        showmodal();
        $('.modal-title').html('Vendor Account - View');
       
        $('#btnEdit').show();
        if (!VendorAccountOverviewObject._editperm[0]) {
            $('#btnEdit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#btnEdit').prop("disabled", true);
            $('#btnEdit').attr('title', 'do not have edit permission!!!');

        }
        $('#btnDelete').show();
        if (!VendorAccountOverviewObject._deleteperm[0]) {
            $('#btnDelete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#btnDelete').prop("disabled", true);
            $('#btnDelete').attr('title', 'do not have delete permission!!!');
        }

        $('#btn_save').hide();
        $("#div_modal").find("*").prop('disabled', true);
        //$('#txt_VendName').focus();
    }
    else if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '"}';

        $.ajax({
            type: "POST",
            url: "vendor-account-overview.aspx/docheckdelete",
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
                .custconfirm(`Are you want to delete this  Vendor Account Overview?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + id + '"}';

                        $.ajax({
                            type: "POST",
                            url: "vendor-account-overview.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    window.location = "vendor-account-overview.aspx";
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

    else if (mode == 'dimension') {
        localStorage.BankAccount_dimension_BankName = bankName;
        localStorage.BankAccount_dimension_AcNumber = acNumber

        //window.location = "vendor-dimension.aspx?id=" + id;
        window.location = "vendor-dimension.aspx?id=" + id + "&menuid=" + VendorAccountOverviewObject._dimensionmenuid [1];
    }

    /*    var _createperm = MainObject.do_IsActionMenuPermission(
        "",
        ChartofacctObject.coadata.pageid,
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

var doactiondimension = function (id, mode, code, name) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'dimension') {
        localStorage.vendor_dimension_Name = name;
        localStorage.vendor_dimension_Code = code

        //window.location = "vendor-dimension.aspx?id=" + id;
        window.location = "vendor-dimension.aspx?id=" + id + "&menuid=" + VendorAccountOverviewObject._dimensionmenuid[1];
    }
    if (mode == 'bank') {
        localStorage.vendor_dimension_Name = name;
        localStorage.vendor_dimension_Code = code;

        window.location = "vendor-bank-ac.aspx?id=" + id + "&menuid=" + VendorAccountOverviewObject._vendoracmenuid[1];
    }
    if (mode == 'itemprice') {
        localStorage.vendor_dimension_Name = name;
        localStorage.vendor_dimension_Code = code;

        window.location = "item-vendor-price.aspx?id=" + id + "&menuid=" + VendorAccountOverviewObject._itemvendorpricemenuid[1];
    }
    if (mode == 'itemdiscount') {
        localStorage.vendor_dimension_Name = name;
        localStorage.vendor_dimension_Code = code;

        window.location = "item-vendor-discount.aspx?id=" + id + "&menuid=" + VendorAccountOverviewObject._itemcvendordiscemenuid [1];
    }
    if (mode == 'invoicediscount') {
        window.location = "invoice-discount.aspx?id=" + id + "&menuid=" + VendorAccountOverviewObject._invdismenuid[1];
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
    VendorAccountOverviewObject.ip = response.ip;
};

var OnchangeIsWitholdingTaxApp=function () {
    if ($("#chk_IsWitholdingTaxApp").is(':checked')) {
        $("#dd_WHTaxGrpCd").prop("disabled", false);
    }
    else {
        $("#dd_WHTaxGrpCd").prop("disabled", true);
        $("#dd_WHTaxGrpCd").val('');
    }
};
