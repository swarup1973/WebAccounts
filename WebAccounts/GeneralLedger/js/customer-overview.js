$(document).ready(function () {
    CustomerOverviewObject.cocd = $("#ddlCompany").val();
    if (localStorage._custoverviewpagemenuid == '' || localStorage._custoverviewpagemenuid == undefined) {
        localStorage._custoverviewpagemenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._custoverviewpagemenuid;
    }
    CustomerOverviewObject.do_loadvendoraccountoverview();
    CustomerOverviewObject.do_loadlookup();
    CustomerOverviewObject.do_getUserPagepermission();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var CustomerOverviewObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    CustomerPostomgGroup: [],
    BranchApplicable: [],
    PersonResponsible: [],
    Currency: [],
    County: [],
    State: [],
    FinanceChargeTerm: [],
    PaymentTerm: [],
    PaymentMothod: [],
    ShipmentMethod: [],
    NatureofBusiness: [],
    SalesTaxGroup: [],
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _viewperm: false,
    _dimensionperm: false,
    _ccardinfoperm: false,
    _itemcuspriceperm: false,
    _itemcusdisceperm: false,
    _invdisperm: false,
    _tranperm: false,
    _sendremperm: false,

    _dimensionmenuid: '',
    _ccardinfomenuid: '',
    _itemcuspricemenuid: '',
    _itemcusdiscemenuid: '',
    _invdismenuid: '',
    _tranmenuid: '',
    _sendremmenuid: '',

    _mainmenuid: '',
    _custoverviewpagemenuid: '',


    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = CustomerOverviewObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            async: false,
            url: "../handler/datahandler.aspx/loadlookupdataCustomerOverview",
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
                            CustomerOverviewObject.CustomerPostomgGroup = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table1") {
                            CustomerOverviewObject.BranchApplicable = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table2") {
                            CustomerOverviewObject.PersonResponsible = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table3") {
                            CustomerOverviewObject.Currency = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table4") {
                            CustomerOverviewObject.County = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table5") {
                            CustomerOverviewObject.State = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table6") {
                            CustomerOverviewObject.FinanceChargeTerm = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table7") {
                            CustomerOverviewObject.PaymentTerm = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table8") {
                            CustomerOverviewObject.PaymentMothod = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table9") {
                            CustomerOverviewObject.ShipmentMethod = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table10") {
                            CustomerOverviewObject.NatureofBusiness = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table11") {
                            CustomerOverviewObject.SalesTaxGroup = JSON.stringify(objnew[key]);
                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },


    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(CustomerOverviewObject);
        CustomerOverviewObject._createperm = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Customers', 'create');
        CustomerOverviewObject._editperm = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Customers', 'edit');
        CustomerOverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Customers', 'delete');
        CustomerOverviewObject._viewperm = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Customers', 'view');
        CustomerOverviewObject._dimensionperm = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Dimension', 'view');
        CustomerOverviewObject._ccardinfoperm = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Credit Card Info', 'view');
        CustomerOverviewObject._itemcuspriceperm = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Item-Customer-Price', 'view');
        CustomerOverviewObject._itemcusdisceperm = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Item-Customer-Discount', 'view');
        CustomerOverviewObject._invdisperm = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'SALES INVOICE DISCOUNT', 'view');
        CustomerOverviewObject._tranperm = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Transaction', 'view');
        CustomerOverviewObject._sendremperm = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Send Reminder', 'view');

        CustomerOverviewObject._mainmenuid = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Customers', 'menuid');
        CustomerOverviewObject._dimensionmenuid = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Dimension', 'menuid');
        CustomerOverviewObject._ccardinfomenuid = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Credit Card Info', 'menuid');
        CustomerOverviewObject._itemcuspricemenuid = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Item-Customer-Price', 'menuid');
        CustomerOverviewObject._itemcusdiscemenuid = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Item-Customer-Discount', 'menuid');
        CustomerOverviewObject._invdismenuid = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'SALES INVOICE DISCOUNT', 'menuid');
        CustomerOverviewObject._tranmenuid = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Transaction', 'menuid');
        CustomerOverviewObject._sendremmenuid = MainObject.do_IsActionMenuPermission(CustomerOverviewObject.access, 'Send Reminder', 'menuid');

    },
    do_render_lookup: () => {
        var _html = [];
        var cntrl_cbo = [];
        cntrl_cbo = $("#div_modal").find("select");
        //$.find("select");


        $.each(cntrl_cbo, function (key, value) {
            if (value.id == 'dd_CustGrpCd') {
                _html = [];
                var _data = JSON.parse(CustomerOverviewObject.CustomerPostomgGroup);
                $.each(_data, function (key, value) {
                    _html.push(
                        //"<option value='" + value.GrpCd.replace(/[\r\n]+/gm, '') + "'>" + value.GrpCd.replace(/[\r\n]+/gm, '') + " (" + value.GrpName.replace(/[\r\n]+/gm, '') + ")</option>"
                        "<option value='" + value.GrpCd.replace(/[\r\n]+/gm, '') + "'>" + value.GrpName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_BranchCd') {
                _html = [];
                var _data = JSON.parse(CustomerOverviewObject.BranchApplicable);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.BranchCd.replace(/[\r\n]+/gm, '') + "'>" + value.BranchName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_PersonRespId') {
                _html = [];
                var _data = JSON.parse(CustomerOverviewObject.PersonResponsible);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.EName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_CurrCd') {
                _html = [];
                var _data = JSON.parse(CustomerOverviewObject.Currency);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.CurrCd.replace(/[\r\n]+/gm, '') + "'>" + value.CurrDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_CountryCd') {
                _html = [];
                var _data = JSON.parse(CustomerOverviewObject.County);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.CountryCd.replace(/[\r\n]+/gm, '') + "'>" + value.CountryName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }

            else if (value.id == 'dd_FinChgTermCd') {
                _html = [];
                var _data = JSON.parse(CustomerOverviewObject.FinanceChargeTerm);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.FinChgTermCd.replace(/[\r\n]+/gm, '') + "'>" + value.FinChgTerm.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_PmtTermsCd') {
                _html = [];
                var _data = JSON.parse(CustomerOverviewObject.PaymentTerm);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.PmtTermsCd.replace(/[\r\n]+/gm, '') + "'>" + value.PmtTermsDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_PmtMethodCd') {
                _html = [];
                var _data = JSON.parse(CustomerOverviewObject.PaymentMothod);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.PmtMethodCd.replace(/[\r\n]+/gm, '') + "'>" + value.PmtMethodDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_ShipMethodCd') {
                _html = [];
                var _data = JSON.parse(CustomerOverviewObject.ShipmentMethod);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.MethodCd.replace(/[\r\n]+/gm, '') + "'>" + value.MethodDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_Ship_CountryCd') {
                _html = [];
                var _data = JSON.parse(CustomerOverviewObject.County);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.CountryCd.replace(/[\r\n]+/gm, '') + "'>" + value.CountryName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_Inv_CountryCd') {
                _html = [];
                var _data = JSON.parse(CustomerOverviewObject.County);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.CountryCd.replace(/[\r\n]+/gm, '') + "'>" + value.CountryName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_BusinessNatureCd') {
                _html = [];
                var _data = JSON.parse(CustomerOverviewObject.NatureofBusiness);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.NatureCd.replace(/[\r\n]+/gm, '') + "'>" + value.NatureDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }

            else if (value.id == 'dd_SalesTaxGrpCd') {
                _html = [];
                var _data = JSON.parse(CustomerOverviewObject.SalesTaxGroup);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.SalesTaxGrpDesc.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }

            if (value.id != 'dd_EntityType' && value.id != 'dd_Block' && value.id != 'dd_StateCd' && value.id != 'dd_Ship_StateCd' && value.id != 'dd_Inv_StateCd' && value.id != 'dd_Reserve') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='' selected='selected'></option>");
            }
        });

    },

    do_loadstate: (obj) => {

        var _html = [];
        var _data = JSON.parse(CustomerOverviewObject.State);
        $.each(_data, function (key, value) {
            if (value.CountryCd.replace(/[\r\n]+/gm, '') == $('#' + obj.id).val()) {
                _html.push(
                    "<option value='" + value.StateCd.replace(/[\r\n]+/gm, '') + "'>" + value.StateName.replace(/[\r\n]+/gm, '') + "</option>"
                );
            }
        });
        if (obj.id == 'dd_CountryCd') {
            $('#dd_StateCd').html(_html.join(""));
            $('#dd_StateCd').prepend("<option value='' selected='selected'></option>");
        }
        else if (obj.id == 'dd_Ship_CountryCd') {
            $('#dd_Ship_StateCd').html(_html.join(""));
            $('#dd_Ship_StateCd').prepend("<option value='' selected='selected'></option>");
        }
        else if (obj.id == 'dd_Inv_CountryCd') {
            $('#dd_Inv_StateCd').html(_html.join(""));
            $('#dd_Inv_StateCd').prepend("<option value='' selected='selected'></option>");
        }
    },

    do_loadstateedit: (byid) => {

        var _html = [];
        var _data = JSON.parse(CustomerOverviewObject.State);
        $.each(_data, function (key, value) {
            if (value.CountryCd.replace(/[\r\n]+/gm, '') == $('#' + byid).val()) {
                _html.push(
                    "<option value='" + value.StateCd.replace(/[\r\n]+/gm, '') + "'>" + value.StateName.replace(/[\r\n]+/gm, '') + "</option>"
                );
            }
        });
        if (byid == 'dd_CountryCd') {
            $('#dd_StateCd').html(_html.join(""));
            $('#dd_StateCd').prepend("<option value='' selected='selected'></option>");
        }
        else if (byid == 'dd_Ship_CountryCd') {
            $('#dd_Ship_StateCd').html(_html.join(""));
            $('#dd_Ship_StateCd').prepend("<option value='' selected='selected'></option>");
        }
        else if (byid == 'dd_Inv_CountryCd') {
            $('#dd_Inv_StateCd').html(_html.join(""));
            $('#dd_Inv_StateCd').prepend("<option value='' selected='selected'></option>");
        }
    },

    do_loadvendoraccountoverview: () => {

        var _data = {};
        _data["cocd"] = CustomerOverviewObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "customer-overview.aspx/loadCustomerOverviewlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                //$("#grid_customer").dataTable().fnDestroy();
                CustomerOverviewObject.do_populateCustomerOverview(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateCustomerOverview: (obj) => {
        // editor init

        /*table = $('#grid_customer').DataTable({
            paging: false
        });

        table.destroy();*/


        var editor = new $.fn.dataTable.Editor({
            table: "#grid_customer",
            fields: [
                { label: "Custcd", name: "Custcd" },
                { label: "CustName", name: "CustName" },
                { label: "CustSearch", name: "CustSearch" },
                { label: "balance", name: "balance" },
                { label: "balance_lcy", name: "balance_lcy" },
                { label: "cur_statistics", name: "cur_statistics" },
            ],
        });

        var roletable = $("#grid_customer");

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
                { data: "Custcd" },
                { data: "CustName" },
                { data: "CustSearch" },
                { data: "balance" },
                { data: "balance_lcy" },
                { data: "cur_statistics" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 50, 50],
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'cust_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'cust_Edit'
                    },
                },
                {
                    extend: "remove", editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'remove',
                        id: 'cust_remove'
                    },

                },
                {
                    add: "view", text: 'View', editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'view'); },
                    attr: {
                        title: 'View',
                        id: 'cust_view'
                    },
                },
                {
                    add: "dimension", text: 'Dimension', editor: editor, action: function () { doactiondimension($('.selected').attr('RowId'), 'dimension', $('.selected').attr('code'), $('.selected').attr('name')); },
                    attr: {
                        title: 'Dimension',
                        id: 'cust_dimension',
                        value: CustomerOverviewObject._dimensionmenuid[1]
                    },
                },
                {
                    add: "creditcard", text: 'Credit Card Info', editor: editor, action: function () { doactiondimension($('.selected').attr('RowId'), 'creditcard', $('.selected').attr('code'), $('.selected').attr('name')); },
                    attr: {
                        title: 'CreditCardInfo',
                        id: 'cust_ccinfo',
                        value: CustomerOverviewObject._ccardinfomenuid[1]
                    },
                },
                {
                    add: "itemcustomerprice", text: 'Item-Customer-Price', editor: editor, action: function () { doactiondimension($('.selected').attr('RowId'), 'itemprice', $('.selected').attr('code'), $('.selected').attr('name')); },

                    attr: {
                        title: 'ItemCustomerPrice',
                        id: 'cust_item_price',
                        value: CustomerOverviewObject._itemcuspricemenuid[1]
                    },
                },
                {
                    add: "itemcustomerdiscount", text: 'Item-Customer-Discount', editor: editor, action: function () { doactiondimension($('.selected').attr('RowId'), 'itemdiscount', $('.selected').attr('code'), $('.selected').attr('name')); },
                    attr: {
                        title: 'Item-Customer-Discount',
                        id: 'cust_Item_Discount',
                        value: CustomerOverviewObject._itemcusdiscemenuid[1]
                    },
                },
                {
                    add: "invoicecustomerdiscount", text: 'Invoice Discount', editor: editor, action: function () { doactiondimension($('.selected').attr('RowId'), 'invoicediscount', $('.selected').attr('code'), $('.selected').attr('name')); },
                    attr: {
                        title: 'Invoice Discount',
                        id: 'cust_Inv_Discount',
                        value: CustomerOverviewObject._invdismenuid[1]
                    },
                },
                {
                    add: "customertransaction", text: 'Transaction', editor: editor, action: () => window.open("customer-transaction.aspx"),
                    attr: {
                        title: 'Transaction',
                        id: 'cust_Transaction',
                        value: CustomerOverviewObject._tranmenuid[1]
                    },
                },
                {
                    add: "sendreminder", text: 'Send Reminder', editor: editor, action: () => window.open("#"),
                    attr: {
                        title: 'Send Reminder',
                        id: 'cust_Send_Reminder',
                        value: CustomerOverviewObject._sendremmenuid[1]
                    },
                }
            ],

            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("code", `${data.Custcd}`);
                $(row).attr("name", `${data.CustName}`);
            },
        });

        var table = $('#grid_customer').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!CustomerOverviewObject._deleteperm[0]) {
                    $('#cust_remove').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#cust_remove').prop("disabled", true);
                    $('#cust_remove').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!CustomerOverviewObject._createperm[0]) {
            $('#cust_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#cust_create').prop("disabled", true);
            $('#cust_create').attr('title', 'do not have permission to Add New Record!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!CustomerOverviewObject._editperm[0]) {
            $('#cust_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#cust_Edit').prop("disabled", true);
            $('#cust_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!CustomerOverviewObject._deleteperm[0]) {
            $('#cust_remove').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#cust_remove').prop("disabled", true);
            $('#cust_remove').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
        if (!CustomerOverviewObject._viewperm[0]) {
            $('#cust_view').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#cust_view').prop("disabled", true);
            $('#cust_view').attr('title', 'do not have permission to view Record!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
        if (!CustomerOverviewObject._dimensionperm[0]) {
            $('#cust_dimension').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#cust_dimension').prop("disabled", true);
            $('#cust_dimension').attr('title', 'do not have permission to view dimension!!!');
            table.button(4).action(function () {
                this.active(false);
            });
        }
        if (!CustomerOverviewObject._ccardinfoperm[0]) {
            $('#cust_ccinfo').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#cust_ccinfo').prop("disabled", true);
            $('#cust_ccinfo').attr('title', 'do not have permission to view credit card info!!!');
            table.button(5).action(function () {
                this.active(false);
            });
        }
        if (!CustomerOverviewObject._itemcuspriceperm[0]) {
            $('#cust_item_price').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#cust_item_price').prop("disabled", true);
            $('#cust_item_price').attr('title', 'do not have permission to view item customer price!!!');
            table.button(6).action(function () {
                this.active(false);
            });
        }
        if (!CustomerOverviewObject._itemcusdisceperm[0]) {
            $('#cust_Item_Discount').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#cust_Item_Discount').prop("disabled", true);
            $('#cust_Item_Discount').attr('title', 'do not have permission to view item customer discount!!!');
            table.button(7).action(function () {
                this.active(false);
            });
        }
        if (!CustomerOverviewObject._invdisperm[0])
        {
            $('#cust_Inv_Discount').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#cust_Inv_Discount').prop("disabled", true);
            $('#cust_Inv_Discount').attr('title', 'do not have permission to view invoice discount!!!');
            table.button(8).action(function () {
                this.active(false);
            });
        }
        if (!CustomerOverviewObject._tranperm[0]) {
            $('#cust_Transaction').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#cust_Transaction').prop("disabled", true);
            $('#cust_Transaction').attr('title', 'do not have permission to view transaction!!!');
            table.button(9).action(function () {
                this.active(false);
            });
        }
        if (!CustomerOverviewObject._sendremperm[0]) {
            $('#cust_Send_Reminder').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#cust_Send_Reminder').prop("disabled", true);
            $('#cust_Send_Reminder').attr('title', 'do not have permission to Send Reminder!!!');
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
            url: "customer-overview.aspx/doedit",
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
                        /*if (attrName.toLowerCase() == "table") {
                            CustomerOverviewObject.BankAccount = JSON.stringify(objnew[key]);
                            var _html = [];
                            var _data = JSON.parse(CustomerOverviewObject.BankAccount);
                            $.each(_data, function (key, value) {
                                _html.push(
                                    "<option value='" + value.RowId + "'>" + value.BankName.replace(/[\r\n]+/gm, '') + ' (' + value.BankAcNo.replace(/[\r\n]+/gm, '') + ")</option>"
                                );
                            });
                            $('#dd_VendBankId').html(_html.join(""));
                            $('#dd_VendBankId').prepend("<option value='' selected='selected'></option>");
                        }*/
                        if (attrName.toLowerCase() == "table") {
                            if (objnew[key].length > 0) {
                                CustomerOverviewObject.hdnid = objnew[key][0].RowId;
                                $('#txt_CustCd').val(objnew[key][0].CustCd);
                                $('#txt_CustCd').prop('readonly', true);
                                $('#txt_CustName').val(objnew[key][0].CustName);
                                $('#txt_CustSearch').val(objnew[key][0].CustSearch);
                                ///////////
                                $('#dd_CurrCd').val(objnew[key][0].CurrCd);
                                $('#txt_CrLimit').val(objnew[key][0].CrLimit);
                                $('#dd_CustGrpCd').val(objnew[key][0].CustGrpCd);
                                if (objnew[key][0].IsForeignCust == true) {
                                    $('#chk_IsForeignCust').prop('checked', true);
                                }
                                else {
                                    $('#chk_IsForeignCust').prop('checked', false);
                                }

                                $('#txt_GovtIdNo').val(objnew[key][0].GovtIdNo);
                                $('#dd_BranchCd').val(objnew[key][0].BranchCd);
                                $('#dd_EntityType').val(objnew[key][0].EntityType);
                                $('#dd_PersonRespId').val(objnew[key][0].PersonRespId);
                                $('#dd_Block').val(objnew[key][0].Block);

                                $('#txt_Address1').val(objnew[key][0].Address1);
                                $('#txt_Address2').val(objnew[key][0].Address2);
                                $('#txt_Pin').val(objnew[key][0].Pin);
                                $('#txt_City').val(objnew[key][0].City);
                                $('#dd_CountryCd').val(objnew[key][0].CountryCd);
                                CustomerOverviewObject.do_loadstateedit('dd_CountryCd');
                                $('#dd_StateCd').val(objnew[key][0].StateCd);
                                $('#txt_PhoneNo').val(objnew[key][0].PhoneNo);
                                $('#txt_AlternateNo').val(objnew[key][0].AlternateNo);
                                $('#txt_FaxNo').val(objnew[key][0].FaxNo);
                                $('#txt_ContactPerson').val(objnew[key][0].ContactPerson);
                                $('#txt_Email').val(objnew[key][0].Email);
                                $('#txt_Website').val(objnew[key][0].Website);

                                $('#txt_BillToCust').val(objnew[key][0].BillToCust);
                                $('#txt_PrePmtPer').val(objnew[key][0].PrePmtPer);
                                $('#dd_PmtTermsCd').val(objnew[key][0].PmtTermsCd);
                                $('#dd_PmtMethodCd').val(objnew[key][0].PmtMethodCd);
                                $('#dd_FinChgTermCd').val(objnew[key][0].FinChgTermCd);
                                $('#txt_DiscTollerancePer').val(objnew[key][0].DiscTollerancePer);
                                if (objnew[key][0].PriceIncludeST == true) {
                                    $('#chk_PriceIncludeST').prop('checked', true);
                                }
                                else {
                                    $('#chk_PriceIncludeST').prop('checked', false);
                                }

                                $('#dd_ShipMethodCd').val(objnew[key][0].ShipMethodCd);
                                $('#txt_LeadTimeInDay').val(objnew[key][0].LeadTimeInDay);
                                $('#dd_Reserve').val(objnew[key][0].Reserve);

                                if (objnew[key][0].ShipAddSameAsPrimary == true) {
                                    $('#chk_ShipAddSameAsPrimary').prop('checked', true);
                                }
                                else {
                                    $('#chk_ShipAddSameAsPrimary').prop('checked', false);
                                }

                                $('#txt_ShipToName').val(objnew[key][0].ShipToName);
                                $('#txt_Ship_Address1').val(objnew[key][0].Ship_Address1);
                                $('#txt_Ship_Address2').val(objnew[key][0].Ship_Address2);
                                $('#txt_Ship_Pin').val(objnew[key][0].Ship_Pin);
                                $('#txt_Ship_City').val(objnew[key][0].Ship_City);
                                $('#dd_Ship_CountryCd').val(objnew[key][0].Ship_CountryCd);
                                CustomerOverviewObject.do_loadstateedit('dd_Ship_CountryCd');
                                $('#dd_Ship_StateCd').val(objnew[key][0].Ship_StateCd);

                                $('#txt_Ship_PhoneNo').val(objnew[key][0].Ship_PhoneNo);
                                $('#txt_Ship_AlternateNo').val(objnew[key][0].Ship_AlternateNo);
                                $('#txt_Ship_FaxNo').val(objnew[key][0].Ship_FaxNo);
                                $('#txt_Ship_ContactPerson').val(objnew[key][0].Ship_ContactPerson);
                                $('#txt_Ship_Email').val(objnew[key][0].Ship_Email);
                                $('#txt_Ship_Website').val(objnew[key][0].Ship_Website);

                                if (objnew[key][0].InvAddSameAsPrimary == true) {
                                    $('#chk_InvAddSameAsPrimary').prop('checked', true);
                                }
                                else {
                                    $('#chk_InvAddSameAsPrimary').prop('checked', false);
                                }
                                $('#txt_InvToName').val(objnew[key][0].InvToName);
                                $('#txt_Inv_Address1').val(objnew[key][0].Inv_Address1);
                                $('#txt_Inv_Address2').val(objnew[key][0].Inv_Address2);
                                $('#txt_Inv_Pin').val(objnew[key][0].Inv_Pin);
                                $('#txt_Inv_City').val(objnew[key][0].Inv_City);
                                $('#dd_Inv_CountryCd').val(objnew[key][0].Inv_CountryCd);
                                CustomerOverviewObject.do_loadstateedit('dd_Inv_CountryCd');
                                $('#dd_Inv_StateCd').val(objnew[key][0].Inv_StateCd);

                                if (objnew[key][0].InvAddSameAsShip == true) {
                                    $('#chk_InvAddSameAsShip').prop('checked', true);
                                }
                                else {
                                    $('#chk_InvAddSameAsShip').prop('checked', false);
                                }

                                $('#txt_Inv_PhoneNo').val(objnew[key][0].Inv_PhoneNo);
                                $('#txt_Inv_AlternateNo').val(objnew[key][0].Inv_AlternateNo);
                                $('#txt_Inv_FaxNo').val(objnew[key][0].Inv_FaxNo);
                                $('#txt_Inv_ContactPerson').val(objnew[key][0].Inv_ContactPerson);
                                $('#txt_Inv_Email').val(objnew[key][0].Inv_Email);
                                $('#txt_Inv_Website').val(objnew[key][0].Inv_Website);


                                $('#txt_TaxAcNo').val(objnew[key][0].TaxAcNo);
                                $('#dd_BusinessNatureCd').val(objnew[key][0].BusinessNatureCd);
                                $('#txt_GstRegdNo').val(objnew[key][0].GstRegdNo);
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


};

var showmodal = function () {
    $('.modal-title').html('Customer - New');


    CustomerOverviewObject.hdnid = '';
    $("#div_modal").find("*").prop('disabled', false);

    $('#btnEdit').hide();
    $('#btnDelete').hide();
    $('#btn_save').show();

    $("#myModal").find("input:text").val('');
    $("#myModal").find("input:checkbox").prop('checked', false);

    $('#dd_StateCd').html("");
    $('#dd_Ship_StateCd').html("");
    $('#dd_Inv_StateCd').html("");
    $('#dd_EntityType').val('');
    $('#dd_Block').val('N');
    $('#dd_Reserve').val('N');
    CustomerOverviewObject.do_render_lookup();

    $("#myModal").modal('show');

};

var getempname = function (sel) {
    $('#txt_ename').val($("option:selected", sel).attr("ename"));
};

var savedata = function () {
    var validate = true;

    if ($('#txt_CustCd').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txt_CustCd").focus();
        return false;
    }
    else if ($('#txt_CustName').val() == '') {
        validate = false;
        $.alertable.alert(`Name required.`);
        $("#txt_CustName").focus();
        return false;
    }
    else if ($('#dd_EntityType').val() == '') {
        validate = false;
        $.alertable.alert(`Entity Type required.`);
        $("#dd_EntityType").focus();
        return false;
    }
    else if ($('#dd_CustGrpCd').val() == '') {
        validate = false;
        $.alertable.alert(`Customer Posting Group required.`);
        $("#dd_CustGrpCd").focus();
        return false;
    }
    else if ($('#dd_CurrCd').val() == '') {
        validate = false;
        $.alertable.alert(`Cuurrency required.`);
        $("#dd_CustGrpCd").focus();
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
    else if ($('#txt_Ship_Pin').val() == '') {
        validate = false;
        $.alertable.alert(`Shipping Pin required.`);
        $("#txt_Ship_Pin").focus();
        return false;
    }
    else if ($('#txt_Ship_City').val() == '') {
        validate = false;
        $.alertable.alert(`Shipping City required.`);
        $("#txt_Ship_City").focus();
        return false;
    }
    else if ($('#dd_Ship_CountryCd').val() == '') {
        validate = false;
        $.alertable.alert(`Shipping Country required.`);
        $("#dd_Ship_CountryCd").focus();
        return false;
    }
    else if ($('#dd_Ship_StateCd').val() == '') {
        validate = false;
        $.alertable.alert(`Shipping County required.`);
        $("#dd_Ship_StateCd").focus();
        return false;
    }
    else if ($('#txt_Inv_Pin').val() == '') {
        validate = false;
        $.alertable.alert(`Invoice Pin required.`);
        $("#txt_Inv_Pin").focus();
        return false;
    }
    else if ($('#txt_Inv_City').val() == '') {
        validate = false;
        $.alertable.alert(`Invoice City required.`);
        $("#txt_Inv_City").focus();
        return false;
    }
    else if ($('#dd_Inv_CountryCd').val() == '') {
        validate = false;
        $.alertable.alert(`Invoice Country required.`);
        $("#dd_Inv_CountryCd").focus();
        return false;
    }
    else if ($('#dd_Inv_StateCd').val() == '') {
        validate = false;
        $.alertable.alert(`Invoice County required.`);
        $("#dd_Inv_StateCd").focus();
        return false;
    }


    else {
        var _data = '{id:"' + CustomerOverviewObject.hdnid + '", code: "' + encodeURIComponent($("#txt_CustCd").val().trim()) + '", cocd: "' + encodeURIComponent(CustomerOverviewObject.cocd) + '"}';

        $.ajax({
            type: "POST",
            url: "customer-overview.aspx/docheckcode",
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
                    $("#txt_CustCd").focus();
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

        if (CustomerOverviewObject.hdnid == undefined || CustomerOverviewObject.hdnid == 'undefined') CustomerOverviewObject.hdnid = '';
        _data["id"] = CustomerOverviewObject.hdnid;
        _data["cocd"] = CustomerOverviewObject.cocd;

        _data["CustCd"] = $('#txt_CustCd').val();
        _data["CustName"] = $('#txt_CustName').val();
        _data["CustSearch"] = $('#txt_CustSearch').val();
        _data["CurrCd"] = $('#dd_CurrCd').val();
        _data["CrLimit"] = $('#txt_CrLimit').val();
        _data["CustGrpCd"] = $('#dd_CustGrpCd').val();
        _data["IsForeignCust"] = $("#chk_IsForeignCust").is(':checked');
        _data["GovtIdNo"] = $('#txt_GovtIdNo').val();
        _data["BranchCd"] = $('#dd_BranchCd').val();
        _data["EntityType"] = $('#dd_EntityType').val();

        if ($('#dd_PersonRespId').val() == null)
            _data["PersonRespId"] = '';
        else
            _data["PersonRespId"] = $('#dd_PersonRespId').val();

        if ($('#dd_Block').val() == null)
            _data["Block"] = '';
        else
            _data["Block"] = $('#dd_Block').val();

        _data["Address1"] = $('#txt_Address1').val();
        _data["Address2"] = $('#txt_Address2').val();
        _data["Pin"] = $('#txt_Pin').val();
        _data["City"] = $('#txt_City').val();

        if ($('#dd_CountryCd').val() == null)
            _data["CountryCd"] = '';
        else
            _data["CountryCd"] = $('#dd_CountryCd').val();

        if ($('#dd_StateCd').val() == null)
            _data["StateCd"] = '';
        else
            _data["StateCd"] = $('#dd_StateCd').val();

        _data["PhoneNo"] = $('#txt_PhoneNo').val();
        _data["AlternateNo"] = $('#txt_AlternateNo').val();
        _data["FaxNo"] = $('#txt_FaxNo').val();
        _data["ContactPerson"] = $('#txt_ContactPerson').val();
        _data["Email"] = $('#txt_Email').val();
        _data["Website"] = $('#txt_Website').val();

        _data["BillToCust"] = $('#txt_BillToCust').val();
        _data["PrePmtPer"] = $('#txt_PrePmtPer').val();
        if ($('#dd_PmtTermsCd').val() == null)
            _data["PmtTermsCd"] = '';
        else
            _data["PmtTermsCd"] = $('#dd_PmtTermsCd').val();

        if ($('#dd_PmtMethodCd').val() == null)
            _data["PmtMethodCd"] = '';
        else
            _data["PmtMethodCd"] = $('#dd_PmtMethodCd').val();

        if ($('#dd_FinChgTermCd').val() == null)
            _data["FinChgTermCd"] = '';
        else
            _data["FinChgTermCd"] = $('#dd_FinChgTermCd').val();

        _data["DiscTollerancePer"] = $('#txt_DiscTollerancePer').val();
        _data["PriceIncludeST"] = $("#chk_PriceIncludeST").is(':checked');


        _data["ShipMethodCd"] = $('#dd_ShipMethodCd').val();
        _data["LeadTimeInDay"] = $('#txt_LeadTimeInDay').val();
        _data["Reserve"] = $('#dd_Reserve').val();

        _data["ShipAddSameAsPrimary"] = $("#chk_ShipAddSameAsPrimary").is(':checked');

        _data["ShipToName"] = $('#txt_ShipToName').val();
        _data["Ship_Address1"] = $('#txt_Ship_Address1').val();
        _data["Ship_Address2"] = $('#txt_Ship_Address2').val();
        _data["Ship_Pin"] = $('#txt_Ship_Pin').val();
        _data["Ship_City"] = $('#txt_Ship_City').val();

        if ($('#dd_Ship_CountryCd').val() == null)
            _data["Ship_CountryCd"] = '';
        else
            _data["Ship_CountryCd"] = $('#dd_Ship_CountryCd').val();

        if ($('#dd_Ship_StateCd').val() == null)
            _data["Ship_StateCd"] = '';
        else
            _data["Ship_StateCd"] = $('#dd_Ship_StateCd').val();

        _data["Ship_PhoneNo"] = $('#txt_Ship_PhoneNo').val();
        _data["Ship_AlternateNo"] = $('#txt_Ship_AlternateNo').val();
        _data["Ship_FaxNo"] = $('#txt_Ship_FaxNo').val();
        _data["Ship_ContactPerson"] = $('#txt_Ship_ContactPerson').val();
        _data["Ship_Email"] = $('#txt_Ship_Email').val();
        _data["Ship_Website"] = $('#txt_Ship_Website').val();

        _data["InvAddSameAsPrimary"] = $("#chk_InvAddSameAsPrimary").is(':checked');
        _data["InvToName"] = $('#txt_InvToName').val();
        _data["Inv_Address1"] = $('#txt_Inv_Address1').val();
        _data["Inv_Address2"] = $('#txt_Inv_Address2').val();
        _data["Inv_Pin"] = $('#txt_Inv_Pin').val();
        _data["Inv_City"] = $('#txt_Inv_City').val();

        if ($('#dd_Inv_CountryCd').val() == null)
            _data["Inv_CountryCd"] = '';
        else
            _data["Inv_CountryCd"] = $('#dd_Inv_CountryCd').val();

        if ($('#dd_Inv_StateCd').val() == null)
            _data["Inv_StateCd"] = '';
        else
            _data["Inv_StateCd"] = $('#dd_Inv_StateCd').val();

        _data["InvAddSameAsShip"] = $("#chk_InvAddSameAsShip").is(':checked');

        _data["Inv_PhoneNo"] = $('#txt_Inv_PhoneNo').val();
        _data["Inv_AlternateNo"] = $('#txt_Inv_AlternateNo').val();
        _data["Inv_FaxNo"] = $('#txt_Inv_FaxNo').val();
        _data["Inv_ContactPerson"] = $('#txt_Inv_ContactPerson').val();
        _data["Inv_Email"] = $('#txt_Inv_Email').val();
        _data["Inv_Website"] = $('#txt_Inv_Website').val();


        _data["TaxAcNo"] = $('#txt_TaxAcNo').val();

        if ($('#dd_BusinessNatureCd').val() == null)
            _data["BusinessNatureCd"] = '';
        else
            _data["BusinessNatureCd"] = $('#dd_BusinessNatureCd').val();

        _data["GstRegdNo"] = $('#txt_GstRegdNo').val();
        _data["TaxExampNo"] = $('#txt_TaxExampNo').val();

        if ($('#dd_SalesTaxGrpCd').val() == null)
            _data["SalesTaxGrpCd"] = '';
        else
            _data["SalesTaxGrpCd"] = $('#dd_SalesTaxGrpCd').val();

        _data["ip"] = CustomerOverviewObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "customer-overview.aspx/doSave";
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
                    window.location = "customer-overview.aspx";

                    //CustomerOverviewObject.do_loadvendoraccountoverview();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var doactionModal = function (mode) {
    doaction(CustomerOverviewObject.hdnid, mode);
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {

        CustomerOverviewObject.do_loaddataedit(id);
        showmodal();
        $('.modal-title').html('Vendor Account - Edit');
        $('#txt_VendName').focus();
    }
    else if (mode == 'view') {

        CustomerOverviewObject.do_loaddataedit(id);
        showmodal();
        $('.modal-title').html('Vendor Account - View');
        $('#btnEdit').show();
        $('#btnDelete').show();
        $('#btn_save').hide();
        $("#div_modal").find("*").prop('disabled', true);
        //$('#txt_VendName').focus();
    }
    else if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '"}';

        $.ajax({
            type: "POST",
            url: "customer-overview.aspx/docheckdelete",
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
                .custconfirm(`Are you want to delete this  Customer Overview?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + id + '"}';

                        $.ajax({
                            type: "POST",
                            url: "customer-overview.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    window.location = "customer-overview.aspx";
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

        window.location = "vendor-dimension.aspx?id=" + id;
    }

};

var doactiondimension = function (id, mode, code, name) {
    if (id == "" || id == undefined || id == "undefined") return;
    if (mode == 'dimension') {
        localStorage.vendor_dimension_Name = name;
        localStorage.vendor_dimension_Code = code

        /*window.location = "customer-dimension.aspx?id=" + id;*/
        window.location = "customer-dimension.aspx?id=" + id + "&menuid=" + CustomerOverviewObject._dimensionmenuid[1];
    }
    if (mode == 'creditcard') {
        localStorage.vendor_dimension_Name = name;
        localStorage.vendor_dimension_Code = code;

        window.location = "credit-card-info.aspx?id=" + id + "&menuid=" + CustomerOverviewObject._ccardinfomenuid[1];
    }
    if (mode == 'itemprice') {
        localStorage.vendor_dimension_Name = name;
        localStorage.vendor_dimension_Code = code;

        window.location = "item-customer-price.aspx?id=" + id + "&menuid=" + CustomerOverviewObject._itemcuspricemenuid[1];
    }
    if (mode == 'itemdiscount') {
        localStorage.vendor_dimension_Name = name;
        localStorage.vendor_dimension_Code = code;

        window.location = "item-customer-discount.aspx?id=" + id + "&menuid=" + CustomerOverviewObject._itemcusdiscemenuid[1];
    }
    if (mode == 'invoicediscount') {
        window.location = "invoice-customer-discount.aspx?menuid=" + CustomerOverviewObject._invdismenuid[1];
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
    CustomerOverviewObject.ip = response.ip;
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

var copydata = function (obj) {
    var chk_id = obj.id;
    var _ischecked = 0;// false;

    if (chk_id == 'chk_ShipAddSameAsPrimary') {
        if ($('#' + chk_id).prop('checked')) {
            _ischecked = 1;//true;

            $('#txt_Ship_Address1').val($('#txt_Address1').val());
            $('#txt_Ship_Address2').val($('#txt_Address2').val());
            $('#txt_Ship_Pin').val($('#txt_Pin').val());
            $('#txt_Ship_City').val($('#txt_City').val());

            $('#dd_Ship_CountryCd').val($('#dd_CountryCd').val());
            CustomerOverviewObject.do_loadstateedit('dd_Ship_CountryCd');

            $('#dd_Ship_StateCd').val($('#dd_StateCd').val());

            $('#txt_Ship_PhoneNo').val($('#txt_PhoneNo').val());
            $('#txt_Ship_AlternateNo').val($('#txt_AlternateNo').val());
            $('#txt_Ship_FaxNo').val($('#txt_FaxNo').val());
            $('#txt_Ship_ContactPerson').val($('#txt_ContactPerson').val());
            $('#txt_Ship_Email').val($('#txt_Email').val());
            $('#txt_Ship_Website').val($('#txt_Website').val());
        }
        else {
            _ischecked = 0;//false;
            $('#txt_Ship_Address1').val('');
            $('#txt_Ship_Address2').val('');
            $('#txt_Ship_Pin').val('');
            $('#txt_Ship_City').val('');

            $('#dd_Ship_CountryCd').val('');
            CustomerOverviewObject.do_loadstateedit('dd_Ship_CountryCd');
            $('#dd_Ship_StateCd').val('');

            $('#txt_Ship_PhoneNo').val('');
            $('#txt_Ship_AlternateNo').val('');
            $('#txt_Ship_FaxNo').val('');
            $('#txt_Ship_ContactPerson').val('');
            $('#txt_Ship_Email').val('');
            $('#txt_Ship_Website').val('');
        }
    }
    else if (chk_id == 'chk_InvAddSameAsPrimary') {
        if ($('#' + chk_id).prop('checked')) {
            _ischecked = 1;//true;

            $('#txt_Inv_Address1').val($('#txt_Address1').val());
            $('#txt_Inv_Address2').val($('#txt_Address2').val());
            $('#txt_Inv_Pin').val($('#txt_Pin').val());
            $('#txt_Inv_City').val($('#txt_City').val());

            $('#dd_Inv_CountryCd').val($('#dd_CountryCd').val());
            CustomerOverviewObject.do_loadstateedit('dd_Inv_CountryCd');
            $('#dd_Inv_StateCd').val($('#dd_StateCd').val());

        }
        else {
            _ischecked = 0;//false;
            $('#txt_Inv_Address1').val('');
            $('#txt_Inv_Address2').val('');
            $('#txt_Inv_Pin').val('');
            $('#txt_Inv_City').val('');

            $('#dd_Inv_CountryCd').val('');
            CustomerOverviewObject.do_loadstateedit('dd_Inv_CountryCd');
            $('#dd_Inv_StateCd').val('');
        }
    }
    else if (chk_id == 'chk_InvAddSameAsShip') {
        if ($('#' + chk_id).prop('checked')) {
            _ischecked = 1;//true;

            $('#txt_Inv_PhoneNo').val($('#txt_Ship_PhoneNo').val());
            $('#txt_Inv_AlternateNo').val($('#txt_Ship_AlternateNo').val());
            $('#txt_Inv_FaxNo').val($('#txt_Ship_FaxNo').val());
            $('#txt_Inv_ContactPerson').val($('#txt_Ship_ContactPerson').val());
            $('#txt_Inv_Email').val($('#txt_Ship_Email').val());
            $('#txt_Inv_Website').val($('#txt_Ship_Website').val());
        }
        else {
            _ischecked = 0;//false;
            $('#txt_Inv_PhoneNo').val('');
            $('#txt_Inv_AlternateNo').val('');
            $('#txt_Inv_FaxNo').val('');
            $('#txt_Inv_ContactPerson').val('');
            $('#txt_Inv_Email').val('');
            $('#txt_Inv_Website').val('');
        }
    }

};
