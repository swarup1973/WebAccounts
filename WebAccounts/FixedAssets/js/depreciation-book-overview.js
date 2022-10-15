$(document).ready(function () {
    depreciationbookObject.cocd = $('#ddlCompany').val();
    if (queryString('id') == undefined || queryString("id") == null) {
        depreciationbookObject.do_loadlist();
        //depreciationbookObject.do_getUserPagepermission();
    }
    else {
        if (queryString('id') != '0' || queryString('id') != '') {
            depreciationbookObject.do_loaddataedit(queryString('id'));
        }
    }
    depreciationbookObject.do_getUserPagepermission();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var depreciationbookObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _setupperm: false,
    _menuid: '',
    _mainmenuid: '',
    _lastmenuid: '',

    /*
    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = depreciationbookObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            async: false,
            url: "depreciation_book_overview.aspx/loadlookupdata",
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
                            depreciationbookObject.DocumentType = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table1") {
                            depreciationbookObject.TransactionType = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table2") {
                            depreciationbookObject.DebitACType = JSON.stringify(objnew[key]);
                            depreciationbookObject.CreditACType = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table3") {
                            depreciationbookObject.DebitACNo = JSON.stringify(objnew[key]);
                            depreciationbookObject.CreditACNo = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table4") {
                            depreciationbookObject.NoSequence = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table5") {
                            depreciationbookObject.UserTypeR = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table6") {
                            depreciationbookObject.UserTypeU = JSON.stringify(objnew[key]);
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
            if (value.id == 'dd_DocTypeId') {
                _html = [];
                var _data = JSON.parse(depreciationbookObject.DocumentType);
                $.each(_data, function (key, value) {
                    _html.push(
                        //"<option value='" + value.GrpCd.replace(/[\r\n]+/gm, '') + "'>" + value.GrpCd.replace(/[\r\n]+/gm, '') + " (" + value.GrpName.replace(/[\r\n]+/gm, '') + ")</option>"
                        "<option value='" + value.RowId + "'>" + value.TypeDesc.replace(/[\r\n]+/gm, '') + " (" + value.TypeCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            else if (value.id == 'dd_TranTypeId') {
                _html = [];
                var _data = JSON.parse(depreciationbookObject.TransactionType);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.TypeDesc.replace(/[\r\n]+/gm, '') + " (" + value.TypeCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            else if (value.id == 'dd_DrAcType') {
                _html = [];
                var _data = JSON.parse(depreciationbookObject.DebitACType);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.TypeDesc.replace(/[\r\n]+/gm, '') + " (" + value.TypeCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            else if (value.id == 'dd_CrAcType') {
                _html = [];
                var _data = JSON.parse(depreciationbookObject.CreditACType);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.TypeDesc.replace(/[\r\n]+/gm, '') + " (" + value.TypeCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            else if (value.id == 'dd_NoSequenceId') {
                _html = [];
                var _data = JSON.parse(depreciationbookObject.NoSequence);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.NsDescription.replace(/[\r\n]+/gm, '') + " (" + value.NsCode.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }


            if (value.id != 'dd_UserTypeId' && value.id != 'dd_DrAcNo' && value.id != 'dd_CrAcNo' && value.id != 'dd_UserType' && value.id != 'dd_ApprovalCode') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='' selected='selected'></option>");
            }
        });

    },
    */


    do_loadlist: () => {

        var _data = {};
        _data["cocd"] = depreciationbookObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "depreciation-book-overview.aspx/loadlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                $("#depn_table").dataTable().fnDestroy();
                depreciationbookObject.do_populateList(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateList: (obj) => {
        // editor init
        table = $('#depn_table').DataTable({
            paging: false
        });

        table.destroy();

        var editor = new $.fn.dataTable.Editor({
            table: "#depn_table",
            fields: [
                { label: "DepnCode", name: "DepnCode" },
                { label: "DepnDesc", name: "DepnDesc" },
                { label: "IsBlock", name: "IsBlock" },
            ],
        });

        var roletable = $("#depn_table");
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
                { data: "DepnCode" },
                { data: "DepnDesc" },
                { data: "IsBlock" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [25, 250, 25],
            buttons: [
                {
                    add: "create", text: 'New', disabled: 'true', editor: editor, action: () => doaction('0','new'),
                    attr: {
                        title: 'New',
                        id: 'depreciationbook_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: () => doaction($('.selected').attr('RowId'), 'edit'),
                    attr: {
                        title: 'Edit',
                        id: 'depreciationbook_edit'
                    },
                },
                {
                    add: "remove", text: 'Delete', editor: editor, action: () => doaction($('.selected').attr('RowId'), 'delete'),
                    attr: {
                        title: 'Delete',
                        id: 'depreciationbook_delete'
                    },
                },

            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("DepnCode", `${data.DepnCode}`);
            },
        });


        var table = $('#depn_table').DataTable();

        if (!depreciationbookObject._createperm[0]) {
            $('#depreciationbook_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#depreciationbook_create').prop("disabled", true);
            $('#depreciationbook_create').attr('title', 'do not have permission to Add New Record!!!');

            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!depreciationbookObject._editperm[0]) {
            $('#depreciationbook_edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#depreciationbook_edit').prop("disabled", true);
            $('#depreciationbook_edit').attr('title', 'do not have permission to Edit Record!!!');

            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!depreciationbookObject._deleteperm[0]) {
            $('#depreciationbook_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#depreciationbook_delete').prop("disabled", true);
            $('#depreciationbook_delete').attr('title', 'do not have permission to Delete Record!!!');

            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        $('.dataTables_scroll').css('overflow', 'auto hidden');

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(depreciationbookObject);
        depreciationbookObject._vieweperm = MainObject.do_IsActionMenuPermission(depreciationbookObject.access, 'DEPRECIATION BOOK', 'view');
        depreciationbookObject._createperm = MainObject.do_IsActionMenuPermission(depreciationbookObject.access, 'DEPRECIATION BOOK', 'create');
        depreciationbookObject._editperm = MainObject.do_IsActionMenuPermission(depreciationbookObject.access, 'DEPRECIATION BOOK', 'edit');
        depreciationbookObject._deleteperm = MainObject.do_IsActionMenuPermission(depreciationbookObject.access, 'DEPRECIATION BOOK', 'delete');

        depreciationbookObject._mainmenuid = MainObject.do_IsActionMenuPermission(depreciationbookObject.access, 'DEPRECIATION BOOK', 'menuid');
        //depreciationbookObject._setupperm = MainObject.do_IsActionMenuPermission(depreciationbookObject.access, 'DIMENSION SET-UP', 'view');
        //depreciationbookObject._menuid = MainObject.do_IsActionMenuPermission(depreciationbookObject.access, 'DIMENSION SET-UP', 'menuid');
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
            url: "depreciation-book-overview.aspx/doedit",
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

                                depreciationbookObject.hdnid = objnew[key][0].RowId;
                                $('#txt_DepnCode').val(objnew[key][0].DepnCode);
                                $('#txt_DepnCode').prop('readonly', true);
                                $('#txt_DepnDesc').val(objnew[key][0].DepnDesc);

                                if (objnew[key][0].UpdateLedger == true) {
                                    $('#chk_UpdateLedger').prop('checked', true);
                                }
                                else {
                                    $('#chk_UpdateLedger').prop('checked', false);
                                }

                                $('#dd_FABookType').val(objnew[key][0].FABookType);

                                if (objnew[key][0].DefaultRndingAmtTo == '0') $('#txt_DefaultRndingAmtTo').val('');
                                else $('#txt_DefaultRndingAmtTo').val(objnew[key][0].DefaultRndingAmtTo);

                                if (objnew[key][0].DefaultEndingBookValue == '0') $('#txt_DefaultEndingBookValue').val('');
                                else $('#txt_DefaultEndingBookValue').val(objnew[key][0].DefaultEndingBookValue);

                                if (objnew[key][0].DepnThresholdDays == '0') $('#txt_DepnThresholdDays').val('');
                                else $('#txt_DepnThresholdDays').val(objnew[key][0].DepnThresholdDays);

                                if (objnew[key][0].AllowChangesDepnMethod == true) {
                                    $('#chk_AllowChangesDepnMethod').prop('checked', true);
                                }
                                else {
                                    $('#chk_AllowChangesDepnMethod').prop('checked', false);
                                }

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

};

var savedata = function () {
    var validate = true;

    if ($('#txt_DepnCode').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txt_DepnCode").focus();
        return false;
    }
   
    else {
        var _data = '{id:"' + depreciationbookObject.hdnid + '", code: "' + encodeURIComponent($("#txt_DepnCode").val().trim()) + '", cocd: "' + encodeURIComponent(depreciationbookObject.cocd) + '"}';

        $.ajax({
            type: "POST",
            url: "depreciation-book-overview.aspx/docheckcode",
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
                    $("#txt_BatchCd").focus();
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

        if (depreciationbookObject.hdnid == undefined || depreciationbookObject.hdnid == 'undefined') depreciationbookObject.hdnid = '';
        _data["id"] = depreciationbookObject.hdnid;
        _data["cocd"] = depreciationbookObject.cocd;

        _data["code"] = $('#txt_DepnCode').val();
        _data["DepnDesc"] = $('#txt_DepnDesc').val();
        _data["UpdateLedger"] = $("#chk_UpdateLedger").is(':checked');
        _data["FABookType"] = $('#dd_FABookType').val();
        _data["DefaultRndingAmtTo"] = $('#txt_DefaultRndingAmtTo').val();
        _data["DefaultEndingBookValue"] = $('#txt_DefaultEndingBookValue').val();
        _data["DepnThresholdDays"] = $('#txt_DepnThresholdDays').val();
        _data["AllowChangesDepnMethod"] = $("#chk_AllowChangesDepnMethod").is(':checked');
             
        _data["isblocked"] = $("#chk_IsBlock").is(':checked');
        _data["ip"] = depreciationbookObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "depreciation-book-overview.aspx/doSave";
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
                    window.location = "depreciation-book-overview.aspx";
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }

};



var doactionModal = function (mode) {
    doaction(depreciationbookObject.hdnid, mode);
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'new') {
        window.location = "depreciation-book-setup.aspx?id=" + id;
    }
    else if (mode == 'edit') {
        window.location = "depreciation-book-setup.aspx?id=" + id;
    }
    else if (mode == 'view') {

        window.location = "depreciation-book-setup.aspx?id=" + id;
    }
    else if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '"}';

        $.ajax({
            type: "POST",
            url: "depreciation-book-overview.aspx/docheckdelete",
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
                .custconfirm(`Are you want to delete this  Depriciation Book?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + id + '"}';

                        $.ajax({
                            type: "POST",
                            url: "depreciation-book-overview.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    $("#myModal").modal('hide');
                                    depreciationbookObject.do_loadlist();
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

var doactiondimension = function (id, mode, code, name) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'dimension') {
        localStorage.vendor_dimension_Name = name;
        localStorage.vendor_dimension_Code = code

        window.location = "journal-batch-set-dimension.aspx?id=" + id + "&menuid=" + depreciationbookObject._menuid[1];
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
    depreciationbookObject.ip = response.ip;
};



