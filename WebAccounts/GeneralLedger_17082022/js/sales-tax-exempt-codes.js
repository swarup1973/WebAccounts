$(document).ready(function () {
    ExemptObject.cocd = $('#ddlCompany').val();
    /*if (localStorage._vendoracpagemenuid == '' || localStorage._vendoracpagemenuid == undefined) {
        localStorage._vendoracpagemenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._vendoracpagemenuid;
    }*/
    ExemptObject.do_getUserPagepermission();
    ExemptObject.do_loadoverview();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var ExemptObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,

    do_loadoverview: () => {

        var _data = {};
        _data["cocd"] = ExemptObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "sales-tax-exempt-codes.aspx/loadVendorAccountOverviewlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                ExemptObject.do_populateOverview(obj);
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
                { label: "ExemptCd", name: "ExemptCd" },
                { label: "ExemptDesc", name: "ExemptDesc" },
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
                { data: "ExemptCd" },
                { data: "ExemptDesc" },
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
                $(row).attr("code", `${data.ExemptCd}`);
                $(row).attr("descr", `${data.ExemptDesc}`);
            },
        });


        var table = $('#item_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!ExemptObject._deleteperm[0]) {
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

        if (!ExemptObject._createperm[0]) {
            $('#create_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#create_salestaxcomponent').prop("disabled", true);
            $('#create_salestaxcomponent').attr('title', 'do not have Add permission!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!ExemptObject._editperm[0]) {
            $('#edit_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#edit_salestaxcomponent').prop("disabled", true);
            $('#edit_salestaxcomponent').attr('title', 'do not have Edit permission!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!ExemptObject._deleteperm[0]) {
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

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "sales-tax-exempt-codes.aspx/doedit",
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
                                ExemptObject.hdnid = objnew[key][0].RowId;
                                $('#txt_ExemptCd').val(objnew[key][0].ExemptCd);
                                $('#txt_ExemptCd').prop('readonly', true);

                                $('#txt_ExemptDesc').val(objnew[key][0].ExemptDesc);

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
        MainObject.do_getuserpageaccess(ExemptObject);
        ExemptObject._vieweperm = MainObject.do_IsActionMenuPermission(ExemptObject.access, 'EXEMPT CODE', 'view');
        ExemptObject._createperm = MainObject.do_IsActionMenuPermission(ExemptObject.access, 'EXEMPT CODE', 'create');
        ExemptObject._editperm = MainObject.do_IsActionMenuPermission(ExemptObject.access, 'EXEMPT CODE', 'edit');
        ExemptObject._deleteperm = MainObject.do_IsActionMenuPermission(ExemptObject.access, 'EXEMPT CODE', 'delete');
    },

};

var showmodal = function () {
    $('.modal-title').html('Sales Tax Exempt Codes - New');
    ExemptObject.hdnid = '';
    $("#div_modal").find("*").prop('disabled', false);

    $('#txt_ExemptCd').val('');
    $('#txt_ExemptCd').prop('readonly', false);

    $('#txt_ExemptDesc').val('');

    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();

    $("#myModal").modal('show');

};


var savedata = function () {
    var validate = true;

    if ($('#txt_ExemptCd').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txt_ExemptCd").focus();
        return false;
    }

    else {
        var _data = '{id:"' + ExemptObject.hdnid + '", code: "' + encodeURIComponent($("#txt_ExemptCd").val().trim()) + '", cocd: "' + encodeURIComponent(ExemptObject.cocd) + '"}';

        $.ajax({
            type: "POST",
            url: "sales-tax-exempt-codes.aspx/docheckcode",
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
                    $("#txt_ExemptCd").focus();
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

        if (ExemptObject.hdnid == undefined || ExemptObject.hdnid == 'undefined') ExemptObject.hdnid = '';
        _data["id"] = ExemptObject.hdnid;
        _data["cocd"] = ExemptObject.cocd;

        _data["code"] = $('#txt_ExemptCd').val();
        _data["ExemptDesc"] = $('#txt_ExemptDesc').val();

        _data["isblock"] = $("#chk_isblocked").is(':checked');

        _data["ip"] = ExemptObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "sales-tax-exempt-codes.aspx/doSave";
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
                    //window.location = "sales-tax-exempt-codes.aspx";
                    $("#myModal").modal('hide');
                    $("#item_table").dataTable().fnDestroy();
                    ExemptObject.do_loadoverview();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var doactionModal = function (mode) {
    doaction(ExemptObject.hdnid, mode);
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {

        ExemptObject.do_loaddataedit(id);
        showmodal();
        $('.modal-title').html('Sales Tax Exempt Codes - Edit');
        $('#txt_ExemptDesc').focus();
    }
    else if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '"}';

        $.ajax({
            type: "POST",
            url: "sales-tax-exempt-codes.aspx/docheckdelete",
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
                .custconfirm(`Are you want to delete this  Sales Tax Exempt Code?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + id + '"}';

                        $.ajax({
                            type: "POST",
                            url: "sales-tax-exempt-codes.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    //window.location = "sales-tax-exempt-codes.aspx";
                                    $("#item_table").dataTable().fnDestroy();
                                    ExemptObject.do_loadoverview();
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
    ExemptObject.ip = response.ip;
};

