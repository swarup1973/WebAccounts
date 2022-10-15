
$(document).ready(function () {
    VendorBankAcObject.cocd = $('#ddlCompany').val();
    VendorBankAcObject.do_init();
    VendorBankAcObject.do_getUserPagepermission();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var VendorBankAcObject = {
    hdnid: '',
    vendorid: '',
    vendorcode: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,

    Vendors: [],

    do_init: () => {

        VendorBankAcObject.do_loadlookup();

        if (localStorage.vendor_dimension_Name != undefined && localStorage.vendor_dimension_Code != "undefined") {
            BankAccount.acNumber = localStorage.vendor_dimension_Code;
            BankAccount.bankName = localStorage.vendor_dimension_Name;
        }
        else {
            BankAccount.bankName = '';
            BankAccount.acNumber = '';
        }

        if (queryString('id') != undefined || queryString("id") != null) {
            VendorBankAcObject.vendorid = queryString("id");
            VendorBankAcObject.vendorcode = BankAccount.acNumber;
            VendorBankAcObject.do_loadvendorbank();
            $('#dd_vendors').val(VendorBankAcObject.vendorcode);
            $('#bankName').text(BankAccount.bankName);
            $('#acNumber').text(BankAccount.acNumber);
            $('#lbl_vendorcode').html(BankAccount.acNumber);
            $('#lbl_vendorname').html(BankAccount.bankName);
            $('#dd_vendors').prop("disabled", true);
        }
        else {
            $('#dd_vendors').val('');
            $('#bankName').text('');
            $('#acNumber').text('');
            $('#lbl_vendorcode').html('');
            $('#lbl_vendorname').html('');
        }
        

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(VendorBankAcObject);
        VendorBankAcObject._vieweperm = MainObject.do_IsActionMenuPermission(VendorBankAcObject.access, 'VENDOR BANK A/C', 'view');
        VendorBankAcObject._createperm = MainObject.do_IsActionMenuPermission(VendorBankAcObject.access, 'VENDOR BANK A/C', 'create');
        VendorBankAcObject._editperm = MainObject.do_IsActionMenuPermission(VendorBankAcObject.access, 'VENDOR BANK A/C', 'edit');
        VendorBankAcObject._deleteperm = MainObject.do_IsActionMenuPermission(VendorBankAcObject.access, 'VENDOR BANK A/C', 'delete');
    },

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = VendorBankAcObject.cocd;

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
                        if (attrName.toLowerCase() == "table16") {
                            VendorBankAcObject.Vendors = JSON.stringify(objnew[key]);

                            var _html = [];
                            var _data = JSON.parse(VendorBankAcObject.Vendors);
                            $.each(_data, function (key, value) {
                                _html.push(
                                    "<option value='" + value.VendCd.replace(/[\r\n]+/gm, '') + "' vendname='" + value.VendName.replace(/[\r\n]+/gm, '') + "'>" + value.VendName.replace(/[\r\n]+/gm, '') + " (" + value.VendCd.replace(/[\r\n]+/gm, '') + ")</option>"
                                );
                            });
                            $('#dd_vendors').html(_html.join(""));
                            $('#dd_vendors').prepend("<option value='' selected='selected'></option>");
                        }

                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_loadvendorbank: () => {

        var _data = {};
        _data["vendorcode"] = VendorBankAcObject.vendorcode;
        _data["cocd"] = VendorBankAcObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "vendor-bank-ac.aspx/loadbanklist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                VendorBankAcObject.do_populatevendorbank(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populatevendorbank: (obj) => {
        // editor init
        table = $('#vendor_table').DataTable({
            paging: false
        });

        table.destroy();

        var editor = new $.fn.dataTable.Editor({
            table: "#vendor_table",
            fields: [
                { label: "BankAcNo", name: "BankAcNo" },
                { label: "BankName", name: "BankName" },
                { label: "BranchName", name: "BranchName" },
                { label: "IFSC", name: "IFSC" },
                { label: "Address", name: "Address" },
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
                { data: "BankAcNo" },
                { data: "BankName" },
                { data: "BranchName" },
                { data: "IFSC" },
                { data: "Address" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'vendor_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'vendor_Edit'
                    },
                },
                {
                    //extend: "remove", editor: editor
                    extend: "remove", editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'remove', 
                        id: 'vendor_remove'
                    },
                },
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("code", `${data.GrpCd}`);
            },
        });

        var table = $('#vendor_table').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!VendorBankAcObject._deleteperm[0]) {
                    $('#vendor_remove').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#vendor_remove').prop("disabled", true);
                    $('#vendor_remove').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!VendorBankAcObject._createperm[0]) {
            $('#vendor_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#vendor_create').prop("disabled", true);
            $('#vendor_create').attr('title', 'do not have permission to Add New Record!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!VendorBankAcObject._editperm[0]) {
            $('#vendor_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#vendor_Edit').prop("disabled", true);
            $('#vendor_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!VendorBankAcObject._deleteperm[0]) {
            $('#vendor_remove').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#vendor_remove').prop("disabled", true);
            $('#vendor_remove').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
       
    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["id"] = VendorBankAcObject.hdnid;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "vendor-bank-ac.aspx/doedit",
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
                                VendorBankAcObject.hdnid = objnew[key][0].RowId;
                                $('#txt_BankAcNo').val(objnew[key][0].BankAcNo);
                                $('#txt_BankAcNo').prop('readonly', true);
                                $('#txt_BankName').val(objnew[key][0].BankName);
                                $('#txt_BranchName').val(objnew[key][0].BranchName);
                                $('#txt_IFSC').val(objnew[key][0].IFSC);
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
        _data["bpgid"] = VendorBankAcObject.hdnroleid;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "vendor-bank-ac.aspx/doeditbpg",
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
                                VendorBankAcObject.hdnroleid = objnew[key][0].RowId;
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
    $('.modal-title').html('Vendor Bank Account - New');
    VendorBankAcObject.hdnid = '';
    $('#txt_BankAcNo').val('');
    $('#txt_BankAcNo').prop('readonly', false);
    $('#txt_BankName').val('');
    $('#txt_BranchName').val('');
    $('#txt_IFSC').val('');
    $('#txt_Address').val('');
    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();
    $('#txt_BankAcNo').focus();
    $("#myModal").modal('show');
};

var getempname = function (sel) {
    $('#txt_ename').val($("option:selected", sel).attr("ename"));
};

var savedata = function () {
    var validate = true;

    if ($('#txt_BankAcNo').val() == '') {
        validate = false;
        $.alertable.alert(`Bank AC No. required.`);
        $("#txt_BankAcNo").focus();
        return false;
    }
    else if ($('#txt_BankName').val() == '') {
        validate = false;
        $.alertable.alert(`Bank Name required.`);
        $("#txt_BankName").focus();
        return false;
    }
    else if ($('#txt_BranchName').val() == '') {
        validate = false;
        $.alertable.alert(`Branch Name required.`);
        $("#txt_BranchName").focus();
        return false;
    }
    else if ($('#txt_IFSC').val() == '') {
        validate = false;
        $.alertable.alert(`IFSC required.`);
        $("#txt_IFSC").focus();
        return false;
    }
    else {
        var _data = '{id:"' + VendorBankAcObject.hdnid + '", acntno:"' + $.trim($('#txt_BankAcNo').val()) + '", vndcode: "' + VendorBankAcObject.vendorcode + '", cocd: "' + VendorBankAcObject.cocd + '"}';

        $.ajax({
            type: "POST",
            url: "vendor-bank-ac.aspx/docheck",
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
                        `Account No. Already Exists.\n Please Try Another Account No.`
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

        _data["id"] = VendorBankAcObject.hdnid;
        _data["vndcode"] = VendorBankAcObject.vendorcode;
        _data["cocd"] = VendorBankAcObject.cocd;
        _data["acntno"] = $('#txt_BankAcNo').val();
        _data["bankname"] = $('#txt_BankName').val();
        _data["branch"] = $('#txt_BranchName').val();
        _data["ifsc"] = $('#txt_IFSC').val();
        _data["address"] = $('#txt_Address').val();
        _data["isblock"] = $("#chk_isblocked").is(':checked');
        _data["ip"] = VendorBankAcObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        var _url = "vendor-bank-ac.aspx/doSavedata";
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

                    window.location = "vendor-bank-ac.aspx?id=" + VendorBankAcObject.vendorid;
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
        $('.modal-title').html('Vendor Bank Account - Edit');
        VendorBankAcObject.hdnid = roleid;
        VendorBankAcObject.do_loaddataedit(roleid);
        $('#txt_BankName').focus();
    }
    else if (mode == 'delete') {
        debugger;
        var validate = true;

        var _data = '{id:"' + roleid + '"}';

        $.ajax({
            type: "POST",
            url: "vendor-bank-ac.aspx/docheckdelete",
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
                .custconfirm(`Are you want to delete the Bank Account?`, ``, `Yes`, `No`)
                .then(
                    function () {
                        var _data;
                        _data = '{id:"' + roleid + '"}';

                        $.ajax({
                            type: "POST",
                            url: "vendor-bank-ac.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    localStorage.vendor_dimension_Code = BankAccount.acNumber;
                                    localStorage.vendor_dimension_Name = BankAccount.bankName;
                                    window.location = "vendor-bank-ac.aspx?id=" + VendorBankAcObject.vendorid;
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
    VendorBankAcObject.ip = response.ip;
}

function onvendorchange(sel) {
    var name = $("#dd_vendors option:selected").attr('vendname');
    if (name == undefined || name == "undefined") name = '';
    var code = sel.value;
    VendorBankAcObject.vendorcode = code;
    
    $('#bankName').text(name);
    $('#acNumber').text(code);
    $('#lbl_vendorcode').html(code);
    $('#lbl_vendorname').html(name);
    $("#vendor_table").dataTable().fnDestroy();
    VendorBankAcObject.do_loadvendorbank();

}



