$(document).ready(function () {
    TaxJurisdictionObject.do_loadroles();

    //if (localStorage._rolepagemenuid == '' || localStorage._rolepagemenuid == undefined) { localStorage._rolepagemenuid = localStorage.menu_id_premission; }
    //else { localStorage.menu_id_premission = localStorage._rolepagemenuid; }
    TaxJurisdictionObject.do_getUserPagepermission();
});


var TaxJurisdictionObject = {
    hdnledgerid: '',
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _assignuserroleperm: false,
    _menuid: '',
    _rolepagemenuid: '',

    do_loadlookup: () => {
        $.ajax({
            type: "POST",
            async: false,
            url: "tax-jurisdiction.aspx/loadlookupdata",
            data: JSON.stringify({ CoCd: $("#ddlCompany").val() }),
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
                            //employee
                            var _employee = objnew[key];
                            var _html = [];
                            $.each(_employee, function (key, value) {
                                _html.push(
                                    "<option value='" + value.RoleCenterCd + "'>" + value.RoleCenterName + "</option>"
                                );
                            });
                            $("#cbo_rolecenter").html(_html.join(""));
                            $("#cbo_rolecenter").prepend("<option value='' selected='selected'></option>");
                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });

    },

    do_loadroles: () => {

        $.ajax({
            type: "POST",
            url: "tax-jurisdiction.aspx/loadrolelist",
            data: JSON.stringify({ CoCd: $("#ddlCompany").val() }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                TaxJurisdictionObject.do_populateroles(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateroles: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#item_table",
            fields: [
                { label: "AuthCd", name: "AuthCd" },
                { label: "AuthName", name: "AuthName" },
                { label: "IsBlock", name: "IsBlock" }
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
                { data: "AuthCd" },
                { data: "AuthName" },
                { data: "IsBlock" },

            ],
            select: true,
            scrollX: true,
            lengthMenu: [25, 25, 25],
            buttons: [

                {
                    add: "create", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'New_Role'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'Edit_Role'
                    },
                },
                {
                    //extend: "remove", editor: editor
                    extend: "remove", editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'Delete_Role'
                    },
                },

            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("AuthCd", `${data.AuthCd}`);
            },
        });

        var table = $('#item_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!TaxJurisdictionObject._deleteperm[0]) {
                    $('#Delete_Role').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#Delete_Role').prop("disabled", true);
                    $('#Delete_Role').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!TaxJurisdictionObject._createperm[0]) {
            $('#New_Role').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#New_Role').prop("disabled", true);
            $('#New_Role').attr('title', 'do not have permission to add role!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!TaxJurisdictionObject._editperm[0]) {
            $('#Edit_Role').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Edit_Role').prop("disabled", true);
            $('#Edit_Role').attr('title', 'do not have permission to edit role!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!TaxJurisdictionObject._deleteperm[0]) {
            $('#Delete_Role').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Delete_Role').prop("disabled", true);
            $('#Delete_Role').attr('title', 'do not have permission to delete role!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["id"] = TaxJurisdictionObject.hdnledgerid;
        _data["cocd"] = $("#ddlCompany").val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "tax-jurisdiction.aspx/doeditRole",
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
                                TaxJurisdictionObject.hdnledgerid = objnew[key][0].RowId;
                                $('#txt_AuthCd').val(objnew[key][0].AuthCd);
                                $("#txt_AuthName").val(objnew[key][0].AuthName);

                                if (objnew[key][0].IsBlock == true) {
                                    $('#chk_IsBlock').prop('checked', true);
                                }
                                else {
                                    $('#chk_IsBlock').prop('checked', false);
                                }
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
        MainObject.do_getuserpageaccess(TaxJurisdictionObject);
        TaxJurisdictionObject._createperm = MainObject.do_IsActionMenuPermission(TaxJurisdictionObject.access, 'TAX JURISDICTION', 'create');
        TaxJurisdictionObject._editperm = MainObject.do_IsActionMenuPermission(TaxJurisdictionObject.access, 'TAX JURISDICTION', 'edit');
        TaxJurisdictionObject._deleteperm = MainObject.do_IsActionMenuPermission(TaxJurisdictionObject.access, 'TAX JURISDICTION', 'delete');
        TaxJurisdictionObject._menuid = MainObject.do_IsActionMenuPermission(TaxJurisdictionObject.access, 'TAX JURISDICTION', 'menuid');

    },
};

var showmodal = function () {
    $('.modal-title').html('Add New Tax Jurisdiction');
    //TaxJurisdictionObject.do_loadlookup();
    TaxJurisdictionObject.hdnledgerid = '';
    $('#txt_AuthCd').val('');
    $('#txt_AuthCd').removeAttr('readonly');
    $("#txt_AuthName").val('');
    $('#chk_IsBlock').prop('checked', false);
    $("#myModal").modal('show');
    $('#txt_AuthCd').focus();
};

var getempname = function (sel) {
    $('#txt_ename').val($("option:selected", sel).attr("ename"));
};

var saverole = function () {
    var validate = true;

    if ($.trim($('#txt_AuthCd').val()) == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txt_AuthCd").focus();
        return false;
    }
    else if ($('#txt_AuthName').val() == '') {
        validate = false;
        $.alertable.alert(`Name required.`);
        $("#txt_AuthName").focus();
        return false;
    }
    else {
        var _data = '{id:"' + TaxJurisdictionObject.hdnledgerid + '", code: "' + encodeURIComponent($.trim($("#txt_AuthCd").val().trim())) + '"}';

        $.ajax({
            type: "POST",
            url: "tax-jurisdiction.aspx/docheckrolecode",
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
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $.alertable.alert(
                        `Code Already Exists.\n Please Try Another Code.`
                    );
                    $("#txt_AuthCd").focus();
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

        _data["id"] = TaxJurisdictionObject.hdnledgerid;
        _data["code"] = $.trim($('#txt_AuthCd').val());
        _data["description"] = $('#txt_AuthName').val();
        _data["isblock"] = $("#chk_IsBlock").is(':checked');
        _data["cocd"] = $("#ddlCompany").val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(passdata));

        var _url = "tax-jurisdiction.aspx/doSaveRole";
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
                    $("#item_table").dataTable().fnDestroy();
                    TaxJurisdictionObject.do_loadroles();
                    $("#myModal").modal('hide');
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
        TaxJurisdictionObject.hdnledgerid = roleid;
        TaxJurisdictionObject.do_loaddataedit(roleid);
        $('.modal-title').html('Edit Tax Hurisdiction');
        $('#txt_AuthCd').attr('readonly', 'true');
        $('#txt_AuthName').focus();
    }
    else if (mode == 'delete') {
        $.alertable
            .custconfirm(`Are you want to delete the tax jurisdiction?`, ``, `Yes`, `No`)
            .then(
                function () {
                    //alert(userid);
                    var _data;
                    _data = '{id:"' + roleid + '"}';

                    $.ajax({
                        type: "POST",
                        url: "tax-jurisdiction.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                $("#item_table").dataTable().fnDestroy();
                                TaxJurisdictionObject.do_loadroles();
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
   
};

