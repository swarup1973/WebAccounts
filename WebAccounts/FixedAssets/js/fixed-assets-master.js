$(document).ready(function () {
    assetmasterObject.cocd = $('#ddlCompany').val();
    /*if (queryString('id') == undefined || queryString("id") == null) {
        assetmasterObject.do_loadlist();
        //assetmasterObject.do_getUserPagepermission();
    }
    else {
        if (queryString('id') != '0' || queryString('id') != '') {
            assetmasterObject.do_loaddataedit(queryString('id'));
        }
    }*/
    //alert(localStorage.menu_id_premission);
    assetmasterObject.do_getUserPagepermission();

    assetmasterObject.do_loadlist();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var assetmasterObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _dimensionperm: false,
    _loconperm: false,
    _loanperm: false,
    _tranperm: false,
    _menuid: '',
    _mainmenuid: '',
    _lastmenuid: '',

    /*
    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = assetmasterObject.cocd;

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
                            assetmasterObject.DocumentType = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table1") {
                            assetmasterObject.TransactionType = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table2") {
                            assetmasterObject.DebitACType = JSON.stringify(objnew[key]);
                            assetmasterObject.CreditACType = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table3") {
                            assetmasterObject.DebitACNo = JSON.stringify(objnew[key]);
                            assetmasterObject.CreditACNo = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table4") {
                            assetmasterObject.NoSequence = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table5") {
                            assetmasterObject.UserTypeR = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table6") {
                            assetmasterObject.UserTypeU = JSON.stringify(objnew[key]);
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
                var _data = JSON.parse(assetmasterObject.DocumentType);
                $.each(_data, function (key, value) {
                    _html.push(
                        //"<option value='" + value.GrpCd.replace(/[\r\n]+/gm, '') + "'>" + value.GrpCd.replace(/[\r\n]+/gm, '') + " (" + value.GrpName.replace(/[\r\n]+/gm, '') + ")</option>"
                        "<option value='" + value.RowId + "'>" + value.TypeDesc.replace(/[\r\n]+/gm, '') + " (" + value.TypeCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            else if (value.id == 'dd_TranTypeId') {
                _html = [];
                var _data = JSON.parse(assetmasterObject.TransactionType);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.TypeDesc.replace(/[\r\n]+/gm, '') + " (" + value.TypeCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            else if (value.id == 'dd_DrAcType') {
                _html = [];
                var _data = JSON.parse(assetmasterObject.DebitACType);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.TypeDesc.replace(/[\r\n]+/gm, '') + " (" + value.TypeCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            else if (value.id == 'dd_CrAcType') {
                _html = [];
                var _data = JSON.parse(assetmasterObject.CreditACType);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.TypeDesc.replace(/[\r\n]+/gm, '') + " (" + value.TypeCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            else if (value.id == 'dd_NoSequenceId') {
                _html = [];
                var _data = JSON.parse(assetmasterObject.NoSequence);
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
        _data["cocd"] = assetmasterObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "fixed-assets-master.aspx/loadlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                $("#assets_table").dataTable().fnDestroy();
                assetmasterObject.do_populateList(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateList: (obj) => {
        // editor init
        table = $('#assets_table').DataTable({
            paging: false
        });

        table.destroy();

        var editor = new $.fn.dataTable.Editor({
            table: "#assets_table",
            fields: [
                { label: "FACode", name: "FACode" },
                { label: "FADesc", name: "FADesc" },
                { label: "FASearchName", name: "FASearchName" },
                { label: "Balance", name: "Balance" },
                { label: "Balance_LCY", name: "Balance_LCY" },
                { label: "IsBlock", name: "IsBlock" },
            ],
        });

        var roletable = $("#assets_table");
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
                { data: "FACode" },
                { data: "FADesc" },
                { data: "FASearchName" },
                { data: "Balance" },
                { data: "Balance_LCY" },
                { data: "IsBlock" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [25, 250, 25],
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: () => doaction('0', 'new'),
                    attr: {
                        title: 'New',
                        id: 'fa_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: () => doaction($('.selected').attr('RowId'), 'edit'),
                    attr: {
                        title: 'Edit',
                        id: 'fa_edit'
                    },
                },
                {
                    add: "view", text: 'View', editor: editor, action: () => doaction($('.selected').attr('RowId'), 'view'),
                    attr: {
                        title: 'View',
                        id: 'fa_view'
                    },
                },
                {
                    add: "remove", text: 'Delete', editor: editor, action: () => doaction($('.selected').attr('RowId'), 'delete'),
                    attr: {
                        title: 'Delete',
                        id: 'fa_delete'
                    },
                },
                {
                    add: "dimension", text: 'Assets Dimension', editor: editor, action: () => doactiondimension($('.selected').attr('RowId'), 'dimension', $('.selected').attr('FACode'), $('.selected').attr('FADesc')),
                    attr: {
                        title: 'Assets Dimension',
                        id: 'fa_dimension'
                    },
                },
                {
                    add: "loctransfer", text: 'Location Transfer', editor: editor, action: () => doactiondimension($('.selected').attr('RowId'), 'loctransfer', $('.selected').attr('FACode'), $('.selected').attr('FADesc')),
                    attr: {
                        title: 'Location Transfer',
                        id: 'fa_loctransfern'
                    },
                },
                {
                    add: "loantransfer", text: 'Loan Fixed Asset', editor: editor, action: () => doactiondimension($('.selected').attr('RowId'), 'loantransfer', $('.selected').attr('FACode'), $('.selected').attr('FADesc')),
                    attr: {
                        title: 'Loan Fixed Asset',
                        id: 'fa_loantransfern'
                    },
                },
                {
                    add: "transaction", text: 'Transaction', editor: editor, action: () => doaction($('.selected').attr('RowId'), 'transaction'),
                    attr: {
                        title: 'Transaction',
                        id: 'fa_transaction'
                    },
                },

            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("FACode", `${data.FACode}`);
                $(row).attr("FADesc", `${data.FADesc}`);
            },
        });


        var table = $('#assets_table').DataTable();

        if (!assetmasterObject._createperm[0]) {
            $('#fa_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#fa_create').prop("disabled", true);
            $('#fa_create').attr('title', 'do not have permission to Add New Record!!!');

            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!assetmasterObject._editperm[0]) {
            $('#fa_edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#fa_edit').prop("disabled", true);
            $('#fa_edit').attr('title', 'do not have permission to Edit Record!!!');

            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!assetmasterObject._vieweperm[0]) {
            $('#fa_view').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#fa_view').prop("disabled", true);
            $('#fa_view').attr('title', 'do not have permission to View Record!!!');

            table.button(2).action(function () {
                this.active(false);
            });
        }
        if (!assetmasterObject._deleteperm[0]) {
            $('#fa_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#fa_delete').prop("disabled", true);
            $('#fa_delete').attr('title', 'do not have permission to Delete Record!!!');

            table.button(3).action(function () {
                this.active(false);
                //this.disable();
            });
        }

        if (!assetmasterObject._dimensionperm[0]) {
            $('#fa_dimension').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#fa_dimension').prop("disabled", true);
            $('#fa_dimension').attr('title', 'do not have permission to View!!!');

            table.button(4).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!assetmasterObject._loconperm[0]) {
            $('#fa_loctransfern').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#fa_loctransfern').prop("disabled", true);
            $('#fa_loctransfern').attr('title', 'do not have permission to View!!!');

            table.button(5).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!assetmasterObject._loanperm[0]) {
            $('#fa_loantransfern').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#fa_loantransfern').prop("disabled", true);
            $('#fa_loantransfern').attr('title', 'do not have permission to View!!!');

            table.button(6).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!assetmasterObject._tranperm[0]) {
            $('#fa_transaction').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#fa_transaction').prop("disabled", true);
            $('#fa_transaction').attr('title', 'do not have permission to View!!!');

            table.button(7).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        $('.dataTables_scroll').css('overflow', 'auto hidden');

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(assetmasterObject);
        //assetmasterObject.access = (assetmasterObject.access).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '');
        assetmasterObject.access = (assetmasterObject.access).replace('\r\n', '');

        assetmasterObject._vieweperm = MainObject.do_IsActionMenuPermission(assetmasterObject.access, 'FIXED ASSETS', 'view');
        assetmasterObject._createperm = MainObject.do_IsActionMenuPermission(assetmasterObject.access, 'FIXED ASSETS', 'create');
        assetmasterObject._editperm = MainObject.do_IsActionMenuPermission(assetmasterObject.access, 'FIXED ASSETS', 'edit');
        assetmasterObject._deleteperm = MainObject.do_IsActionMenuPermission(assetmasterObject.access, 'FIXED ASSETS', 'delete');
        assetmasterObject._mainmenuid = MainObject.do_IsActionMenuPermission(assetmasterObject.access, 'FIXED ASSETS', 'menuid');

        assetmasterObject._dimensionperm = MainObject.do_IsActionMenuPermission(assetmasterObject.access, 'ASSETS DIMENSION', 'view');
        assetmasterObject._loconperm = MainObject.do_IsActionMenuPermission(assetmasterObject.access, 'LOCATION TRANSFER', 'view');
        assetmasterObject._loanperm = MainObject.do_IsActionMenuPermission(assetmasterObject.access, 'LOAN FIXED ASSET', 'view');
        assetmasterObject._tranperm = MainObject.do_IsActionMenuPermission(assetmasterObject.access, 'TRANSACTION', 'view');

        assetmasterObject._assetdimensionmenuid = MainObject.do_IsActionMenuPermission(assetmasterObject.access, 'ASSETS DIMENSION', 'menuid');
        assetmasterObject._locationmenuid = MainObject.do_IsActionMenuPermission(assetmasterObject.access, 'LOCATION TRANSFER', 'menuid');
        assetmasterObject._loanmenuid = MainObject.do_IsActionMenuPermission(assetmasterObject.access, 'LOAN FIXED ASSET', 'menuid');
        assetmasterObject._transactionmenuid = MainObject.do_IsActionMenuPermission(assetmasterObject.access, 'TRANSACTION', 'menuid');
        assetmasterObject._fixedassetmenuid = MainObject.do_IsActionMenuPermission(assetmasterObject.access, 'FIXED ASSETS', 'menuid');
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
            url: "fixed-assets-master.aspx/doedit",
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

                                assetmasterObject.hdnid = objnew[key][0].RowId;
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
        var _data = '{id:"' + assetmasterObject.hdnid + '", code: "' + encodeURIComponent($("#txt_DepnCode").val().trim()) + '", cocd: "' + encodeURIComponent(assetmasterObject.cocd) + '"}';

        $.ajax({
            type: "POST",
            url: "fixed-assets-master.aspx/docheckcode",
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

        if (assetmasterObject.hdnid == undefined || assetmasterObject.hdnid == 'undefined') assetmasterObject.hdnid = '';
        _data["id"] = assetmasterObject.hdnid;
        _data["cocd"] = assetmasterObject.cocd;

        _data["code"] = $('#txt_DepnCode').val();
        _data["DepnDesc"] = $('#txt_DepnDesc').val();
        _data["UpdateLedger"] = $("#chk_UpdateLedger").is(':checked');
        _data["FABookType"] = $('#dd_FABookType').val();
        _data["DefaultRndingAmtTo"] = $('#txt_DefaultRndingAmtTo').val();
        _data["DefaultEndingBookValue"] = $('#txt_DefaultEndingBookValue').val();
        _data["DepnThresholdDays"] = $('#txt_DepnThresholdDays').val();
        _data["AllowChangesDepnMethod"] = $("#chk_AllowChangesDepnMethod").is(':checked');

        _data["isblocked"] = $("#chk_IsBlock").is(':checked');
        _data["ip"] = assetmasterObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "fixed-assets-master.aspx/doSave";
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
                    window.location = "fixed-assets-master.aspx";
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }

};



var doactionModal = function (mode) {
    doaction(assetmasterObject.hdnid, mode);
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'new') {
        window.location = "assets-setup.aspx?id=" + id;
    }
    else if (mode == 'edit') {
        window.location = "assets-setup.aspx?id=" + id;
    }
    else if (mode == 'view') {

        window.location = "assets-setup.aspx?mode=v&id=" + id;
    }
    else if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '"}';

        $.ajax({
            type: "POST",
            url: "fixed-assets-master.aspx/docheckdelete",
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
                .custconfirm(`Are you want to delete this  Fixed Asset?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + id + '"}';

                        $.ajax({
                            type: "POST",
                            url: "fixed-assets-master.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    $("#myModal").modal('hide');
                                    assetmasterObject.do_loadlist();
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
    localStorage._fixedassetmenuid = assetmasterObject._fixedassetmenuid[1];
    if (mode == 'dimension') {
        localStorage.vendor_dimension_Name = name;
        localStorage.vendor_dimension_Code = code;


        localStorage.menu_id_premission = assetmasterObject._assetdimensionmenuid[1];
        localStorage.clickedmenu_id = assetmasterObject._assetdimensionmenuid[1];
       

        window.location = "assets-dimension.aspx?id=" + id;
    }
    if (mode == 'loctransfer') {
        localStorage.vendor_dimension_Name = name;
        localStorage.vendor_dimension_Code = code;

        localStorage.menu_id_premission = assetmasterObject._locationmenuid[1];
        localStorage.clickedmenu_id = assetmasterObject._locationmenuid[1];
        window.location = "location-transfer.aspx?id=" + id;
    }
    if (mode == 'loantransfer') {
        localStorage.vendor_dimension_Name = name;
        localStorage.vendor_dimension_Code = code;

        localStorage.menu_id_premission = assetmasterObject._loanmenuid[1];
        localStorage.clickedmenu_id = assetmasterObject._loanmenuid[1];
        window.location = "loan-fixed-asset.aspx?id=" + id;
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
    assetmasterObject.ip = response.ip;
};



