
$(document).ready(function () {
    CreditCardInfoObject.cocd = $('#ddlCompany').val();
    CreditCardInfoObject.do_init();
    CreditCardInfoObject.do_getUserPagepermission();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var CreditCardInfoObject = {
    hdnid: '',
    customerid: '',
    customercode: '',
    cocd: '',
    ip: '',
    Customers: [],
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    menuid: '',

    do_init: () => {

        CreditCardInfoObject.do_loadlookup();

        if (localStorage.vendor_dimension_Name != undefined && localStorage.vendor_dimension_Code != "undefined") {
            BankAccount.acNumber = localStorage.vendor_dimension_Code;
            BankAccount.bankName = localStorage.vendor_dimension_Name;
        }
        else {
            BankAccount.bankName = '';
            BankAccount.acNumber = '';
        }

        if (queryString('id') != undefined || queryString("id") != null) {
            CreditCardInfoObject.customerid = queryString("id");
            CreditCardInfoObject.customercode = BankAccount.acNumber;
            CreditCardInfoObject.do_loadcustomercreditcard();
            $('#dd_customers').val(CreditCardInfoObject.customercode);
            $('#bankName').text(BankAccount.bankName);
            $('#acNumber').text(BankAccount.acNumber);
            $('#lbl_customercode').html(BankAccount.acNumber);
            $('#lbl_customername').html(BankAccount.bankName);
            $('#dd_customers').prop("disabled", true);
        }
        else {
            $('#dd_customers').val('');
            $('#bankName').text('');
            $('#acNumber').text('');
            $('#lbl_customercode').html('');
            $('#lbl_customername').html('');
        }

        if (queryString('menuid') != undefined || queryString("menuid") != null) {
            CreditCardInfoObject.menuid = queryString("menuid");
            localStorage.menu_id_premission = queryString("menuid");
        }

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(CreditCardInfoObject);
        if (queryString('menuid') != undefined || queryString("menuid") != null) {
            CreditCardInfoObject._createperm = MainObject.do_IsActionMenuPermission(CreditCardInfoObject.access, 'Credit Card Info', 'create');
            CreditCardInfoObject._editperm = MainObject.do_IsActionMenuPermission(CreditCardInfoObject.access, 'Credit Card Info', 'edit');
            CreditCardInfoObject._deleteperm = MainObject.do_IsActionMenuPermission(CreditCardInfoObject.access, 'Credit Card Info', 'delete');
        }},

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = CreditCardInfoObject.cocd;

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
                        if (attrName.toLowerCase() == "table12") {
                            CreditCardInfoObject.Customers = JSON.stringify(objnew[key]);

                            var _html = [];
                            var _data = JSON.parse(CreditCardInfoObject.Customers);
                            $.each(_data, function (key, value) {
                                _html.push(
                                    "<option value='" + value.CustCd.replace(/[\r\n]+/gm, '') + "' vendname='" + value.CustName.replace(/[\r\n]+/gm, '') + "'>" + value.CustName.replace(/[\r\n]+/gm, '') + " (" + value.CustCd.replace(/[\r\n]+/gm, '') + ")</option>"
                                );
                            });
                            $('#dd_customers').html(_html.join(""));
                            $('#dd_customers').prepend("<option value='' selected='selected'></option>");
                        }

                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_loadcustomercreditcard: () => {

        var _data = {};
        _data["customercode"] = CreditCardInfoObject.customercode;
        _data["cocd"] = CreditCardInfoObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "credit-card-info.aspx/loadcardlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                CreditCardInfoObject.do_populatecard(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populatecard: (obj) => {
        // editor init
        table = $('#vendor_table').DataTable({
            paging: false
        });

        table.destroy();

        var editor = new $.fn.dataTable.Editor({
            table: "#vendor_table",
            fields: [
                { label: "CreditCardNo", name: "CreditCardNo" },
                { label: "ExpiryDate", name: "ExpiryDate" },
                { label: "NameOnCard", name: "NameOnCard" },
                { label: "Address", name: "Address" },
                { label: "Pin", name: "Pin" },
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
                { data: "CreditCardNo" },
                { data: "ExpiryDate" },
                { data: "NameOnCard" },
                { data: "Address" },
                { data: "Pin" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'Add',
                        id: 'cc_add'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'cc_Edit'
                    },
                },
                {
                    //extend: "remove", editor: editor
                    extend: "remove", editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'remove',
                        id: 'cc_remove'
                    },
                },
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("code", `${data.CreditCardNo}`);
            },
        });

        var table = $('#vendor_table').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!CreditCardInfoObject._deleteperm[0]) {
                    $('#cc_remove').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#cc_remove').prop("disabled", true);
                    $('#cc_remove').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!CreditCardInfoObject._createperm[0]) {
            $('#cc_add').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#cc_add').prop("disabled", true);
            $('#cc_add').attr('title', 'do not have permission to Add New Record!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!CreditCardInfoObject._editperm[0]) {
            $('#cc_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#cc_Edit').prop("disabled", true);
            $('#cc_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!CreditCardInfoObject._deleteperm[0]) {
            $('#cc_remove').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#cc_remove').prop("disabled", true);
            $('#cc_remove').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["id"] = CreditCardInfoObject.hdnid;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "credit-card-info.aspx/doedit",
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
                                CreditCardInfoObject.hdnid = objnew[key][0].RowId;
                                $('#txt_cardno').val(objnew[key][0].CreditCardNo);
                                $('#txt_cardno').prop('readonly', true);
                                $('#txt_name').val(objnew[key][0].NameOnCard);
                                $('#txt_expirydate').val(objnew[key][0].ExpiryDate);
                                $('#txt_pin').val(objnew[key][0].Pin);
                                $('#txt_Address').val(objnew[key][0].Address);

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

    do_loaddatapostingedit: (id) => {

        var _data = {};
        _data["bpgid"] = CreditCardInfoObject.hdnroleid;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "credit-card-info.aspx/doeditbpg",
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
                                CreditCardInfoObject.hdnroleid = objnew[key][0].RowId;
                                $('#txt_groupcode').val(objnew[key][0].GrpCd);
                                $('#cbo_acledger').val(objnew[key][0].AcCd_BankLedger.replace(/[\r\n]+/gm, ''));
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
    $('.modal-title').html('Customer Credit Card - New');
    CreditCardInfoObject.hdnid = '';
    $('#txt_cardno').val('');
    $('#txt_cardno').prop('readonly', false);
    $('#txt_name').val('');
    $('#txt_expirydate').val('');
    $('#txt_pin').val('');
    $('#txt_Address').val('');
    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();
    $('#txt_cardno').focus();
    $("#myModal").modal('show');
};

var getempname = function (sel) {
    $('#txt_ename').val($("option:selected", sel).attr("ename"));
};

var savedata = function () {
    var validate = true;

    if ($('#txt_cardno').val() == '') {
        validate = false;
        $.alertable.alert(`Card No. required.`);
        $("#txt_cardno").focus();
        return false;
    }
    else if ($('#txt_name').val() == '') {
        validate = false;
        $.alertable.alert(`Name on the Card required.`);
        $("#txt_name").focus();
        return false;
    }
    else if ($('#txt_expirydate').val() == '') {
        validate = false;
        $.alertable.alert(`Expiry Date required.`);
        $("#txt_expirydate").focus();
        return false;
    }
    /*else if ($('#txt_pin').val() == '') {
        validate = false;
        $.alertable.alert(`IFSC required.`);
        $("#txt_pin").focus();
        return false;
    }*/
    else {
        var _data = '{id:"' + CreditCardInfoObject.hdnid + '", cardno:"' + $.trim($('#txt_cardno').val()) + '", custcode: "' + CreditCardInfoObject.customercode + '", cocd: "' + CreditCardInfoObject.cocd + '"}';

        $.ajax({
            type: "POST",
            url: "credit-card-info.aspx/docheck",
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
                        `Card No. Already Exists.\n Please Try Another Card No.`
                    );
                    $("#txt_code").focus();
                    validate = false;
                    return false;
                }
            },
            failure: function (response) {
                validate = false;
                $.alertable.alert(`Problem in retreiving items...`);
            },
        });
    }



    var _data = {};
    if (validate == true) {

        _data["id"] = CreditCardInfoObject.hdnid;
        _data["custcode"] = CreditCardInfoObject.customercode;
        _data["cocd"] = CreditCardInfoObject.cocd;
        _data["cardno"] = $('#txt_cardno').val();
        _data["name"] = $('#txt_name').val();

        if ($('#txt_expirydate').val() != '') {
            _data["expirydate"] = $('#txt_expirydate').val() + '-01'
        }
        else {
            _data["expirydate"] = '';
        }

        _data["pin"] = $('#txt_pin').val();
        _data["address"] = $('#txt_Address').val();
        _data["isblock"] = $("#chk_isblocked").is(':checked');
        _data["ip"] = CreditCardInfoObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        var _url = "credit-card-info.aspx/doSavedata";
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
                    localStorage.vendor_dimension_Code = BankAccount.acNumber;
                    localStorage.vendor_dimension_Name = BankAccount.bankName;

                    window.location = "credit-card-info.aspx?id=" + CreditCardInfoObject.customerid;
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var roleaction = function (roleid, mode) {
    if (roleid == "" || roleid == undefined || roleid == "undefined") return;

    if (mode == 'edit') {
        showmodal();
        $('.modal-title').html('Customer Credit Card - Edit');
        CreditCardInfoObject.hdnid = roleid;
        CreditCardInfoObject.do_loaddataedit(roleid);
        $('#txt_name').focus();
    }
    else if (mode == 'delete') {
        debugger;
        var validate = true;

        var _data = '{id:"' + roleid + '"}';

        $.ajax({
            type: "POST",
            url: "credit-card-info.aspx/docheckdelete",
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
                .custconfirm(`Are you want to delete the Credit Card?`, ``, `Yes`, `No`)
                .then(
                    function () {
                        var _data;
                        _data = '{id:"' + roleid + '"}';

                        $.ajax({
                            type: "POST",
                            url: "credit-card-info.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    localStorage.vendor_dimension_Code = BankAccount.acNumber;
                                    localStorage.vendor_dimension_Name = BankAccount.bankName;
                                    window.location = "credit-card-info.aspx?id=" + CreditCardInfoObject.customerid;
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

    /*
    var _createperm = MainObject.do_IsActionMenuPermission(
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

function ShowIP(response) {
    CreditCardInfoObject.ip = response.ip;
}

function onvendorchange(sel) {
    var name = $("#dd_customers option:selected").attr('vendname');
    if (name == undefined || name == "undefined") name = '';
    var code = sel.value;
    CreditCardInfoObject.customercode = code;

    $('#bankName').text(name);
    $('#acNumber').text(code);
    $('#lbl_customercode').html(code);
    $('#lbl_customername').html(name);
    $("#vendor_table").dataTable().fnDestroy();
    CreditCardInfoObject.do_loadcustomercreditcard();

}

var onlyNumberKey = function (evt) {
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
};



