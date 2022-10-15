
$(document).ready(function () {
    LoanFixedAssetObject.cocd = $('#ddlCompany').val();
    LoanFixedAssetObject.do_init();
    LoanFixedAssetObject.do_getUserPagepermission();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var LoanFixedAssetObject = {
    hdnid: '',
    faid: '',
    facode: '',
    fadesc: '',
    cocd: '',
    ip: '',
    fromlocationid: '',
    lastTransdt: '',
    location: [],
    dimension: [],
    dimvalue: [],
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _menuid: '',
    _mainmenuid: '',
    _lastmenuid: '',

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(LoanFixedAssetObject);
        //assetmasterObject.access = (assetmasterObject.access).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '');
        LoanFixedAssetObject.access = (LoanFixedAssetObject.access).replace('\r\n', '');

        LoanFixedAssetObject._vieweperm = MainObject.do_IsActionMenuPermission(LoanFixedAssetObject.access, 'LOAN FIXED ASSET', 'view');
        LoanFixedAssetObject._createperm = MainObject.do_IsActionMenuPermission(LoanFixedAssetObject.access, 'LOAN FIXED ASSET', 'create');
        LoanFixedAssetObject._editperm = MainObject.do_IsActionMenuPermission(LoanFixedAssetObject.access, 'LOAN FIXED ASSET', 'edit');
        LoanFixedAssetObject._deleteperm = MainObject.do_IsActionMenuPermission(LoanFixedAssetObject.access, 'LOAN FIXED ASSET', 'delete');
        LoanFixedAssetObject._mainmenuid = MainObject.do_IsActionMenuPermission(LoanFixedAssetObject.access, 'LOAN FIXED ASSET', 'menuid');
    },

    do_init: () => {

        //LoanFixedAssetObject.do_loadlookup();


        if (queryString('id') != undefined || queryString("id") != null) {
            LoanFixedAssetObject.faid = queryString("id");
            LoanFixedAssetObject.facode = localStorage.vendor_dimension_Code;
            LoanFixedAssetObject.fadesc = localStorage.vendor_dimension_Name;

            LoanFixedAssetObject.do_loadlist();

            /*$('#dd_customers').val(LoanFixedAssetObject.facode);
            $('#bankName').text(BankAccount.bankName);
            $('#acNumber').text(BankAccount.acNumber);
            $('#lbl_facode').html(BankAccount.acNumber);
            $('#lbl_customername').html(BankAccount.bankName);
            $('#dd_customers').prop("disabled", true);*/

            $('#facode').text(LoanFixedAssetObject.facode);
            $('#fadesc').text(LoanFixedAssetObject.fadesc);
        }
        else {
            /*$('#dd_customers').val('');
            $('#bankName').text('');
            $('#acNumber').text('');
            $('#lbl_facode').html('');
            $('#lbl_customername').html('');*/
        }


    },

    do_loadlist: () => {

        var _data = {};
        _data["faid"] = LoanFixedAssetObject.faid;
        _data["cocd"] = LoanFixedAssetObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "loan-fixed-asset.aspx/loadlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;

                var obj = JSON.parse(`[${result.d}]`);

                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = key;
                        if (attrName.toLowerCase() == "table") {
                            LoanFixedAssetObject.do_populatelist(objnew[key]);
                        }
                        if (attrName.toLowerCase() == "table1") {
                            LoanFixedAssetObject.location = JSON.stringify(objnew[key]);
                        }
                        if (attrName.toLowerCase() == "table2") {
                            LoanFixedAssetObject.dimension = JSON.stringify(objnew[key]);
                        }
                        if (attrName.toLowerCase() == "table3") {
                            LoanFixedAssetObject.dimvalue = JSON.stringify(objnew[key]);
                        }
                        if (attrName.toLowerCase() == "table4") {
                            LoanFixedAssetObject.fromlocationid = objnew[key][0].FALocId;
                            LoanFixedAssetObject.lastTransdt = objnew[key][0].lastTransdt;
                        }
                    }
                }
                LoanFixedAssetObject.do_render_lookup();
                $('#dd_FALocIdFrom').val(LoanFixedAssetObject.fromlocationid);
                $('#dd_FALocIdFrom').prop('disabled', true);

                $("#dd_FALocIdTo option[value='" + LoanFixedAssetObject.fromlocationid + "']").remove();

                var _selecteddimid = $('option:selected', $('#dd_FALocIdFrom')).attr('dimid');
                var _selectedvalid = $('option:selected', $('#dd_FALocIdFrom')).attr('dimvalueid');
                if (_selecteddimid != '0') {
                    $('#dd_DimIdFrom').val(_selecteddimid);
                    $('#dd_DimIdFrom').prop('disabled', true);
                }
                if (_selectedvalid != '0') {
                    $('#dd_DimValueIdFrom').val(_selectedvalid);
                    $('#dd_DimValueIdFrom').prop('disabled', true);
                }

            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populatelist: (obj) => {
        // editor init
        table = $('#assets_table').DataTable({
            paging: false
        });

        table.destroy();

        var editor = new $.fn.dataTable.Editor({
            table: "#assets_table",
            fields: [
                { label: "LoanDt", name: "LoanDt" },
                { label: "LocNameFrom", name: "LocNameFrom" },
                { label: "LocNameTo", name: "LocNameTo" },
                { label: "dimDescFrom", name: "dimDescFrom" },
                { label: "valueNameFrom", name: "valueNameFrom" },
                { label: "dimDescTo", name: "dimDescTo" },
                { label: "valueNameTo", name: "valueNameTo" },
                { label: "Remarks", name: "Remarks" },
                { label: "ExptReturnDt", name: "ExptReturnDt" },
                { label: "ActualReturnDt", name: "ActualReturnDt" },
                { label: "IsBlock", name: "IsBlock" },
            ],
        });

        var roletable = $("#assets_table");
        //userstable.html("");

        var roledata = [];
        roledata = obj;

        /*for (var i = 0; i < obj.length; i++) {
            var objnew = obj[i];
            for (var key in objnew) {
                var attrName = key;
                if (attrName.toLowerCase() == "table") {
                    roledata = objnew[key];
                }
            }
        };*/


        roletable.dataTable({
            dom: "Bfrtip",
            fixedHeader: true,
            data: roledata,
            columns: [
                { data: "LoanDt" },
                { data: "LocNameFrom" },
                { data: "LocNameTo" },
                { data: "dimDescFrom" },
                { data: "valueNameFrom" },
                { data: "dimDescTo" },
                { data: "valueNameTo" },
                { data: "Remarks" },
                { data: "ExptReturnDt" },
                { data: "ActualReturnDt" },
                { data: "IsBlock" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [
                {
                    add: "create", text: 'New Loan', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'loan_create'
                    },
                },
                {
                    add: "remove", text: 'Delete', editor: editor, action: () => roleaction($('.selected').attr('RowId'), $('.selected').attr('LoanDt'), $('.selected').attr('IsBlock'), 'delete'),
                    attr: {
                        title: 'Delete',
                        id: 'loan_delete'
                    },
                },
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("LoanDt", `${data.LoanDt}`);
                $(row).attr("IsBlock", `${data.IsBlock}`);

            },
        });

        var table = $('#assets_table').DataTable();

        if (!LoanFixedAssetObject._createperm[0]) {
            $('#loan_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#loan_create').prop("disabled", true);
            $('#loan_create').attr('title', 'do not have permission to Add New Record!!!');

            table.button(0).action(function () {
                this.active(false);
            });
        }

        if (!LoanFixedAssetObject._deleteperm[0]) {
            $('#loan_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#loan_delete').prop("disabled", true);
            $('#loan_delete').attr('title', 'do not have permission to Delete Record!!!');

            table.button(1).action(function () {
                this.active(false);
                //this.disable();
            });
        }

        $('.dataTables_scroll').css('overflow', 'auto hidden');
    },

    do_render_lookup: () => {
        var _html = [];
        var cntrl_cbo = [];
        cntrl_cbo = $(".modal-body").find("select");
        $.each(cntrl_cbo, function (key, value) {
            _html = [];
            if (value.id == 'dd_FALocIdFrom' || value.id == 'dd_FALocIdTo') {
                _html = [];
                var _data = JSON.parse(LoanFixedAssetObject.location);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "' DimId='" + value.DimId + "' DimValueId='" + value.DimValueId + "'>" + value.LocName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_DimIdFrom') {
                _html = [];
                var _data = JSON.parse(LoanFixedAssetObject.dimension);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.dimCaption.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }

            else if (value.id == 'dd_DimValueIdFrom') {
                _html = [];
                var _data = JSON.parse(LoanFixedAssetObject.dimvalue);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.valueName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }

            if (value.id == 'dd_FALocIdFrom' || value.id == 'dd_FALocIdTo' || value.id == 'dd_DimIdFrom' || value.id == 'dd_DimValueIdFrom') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='0' selected='selected'></option>");
            }
        });

    },

    do_loadothers: (obj) => {
        //$("#FIELDID option[value='X']").remove();
        var _selecteddimid = $('option:selected', obj).attr('dimid');
        var _selectedvalid = $('option:selected', obj).attr('dimvalueid');

        var _html = [];

        if (_selecteddimid != '0') {
            var _data = JSON.parse(LoanFixedAssetObject.dimension);
            $.each(_data, function (key, value) {
                if (value.RowId == _selecteddimid) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.dimCaption.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                }
            });
            $('#dd_DimIdTo').html(_html.join(""));
            $('#dd_DimIdTo').prepend("<option value='0' selected='selected'></option>");
            if (_selecteddimid != undefined && _selecteddimid != 'undefined' && _selecteddimid != '') {
                $('#dd_DimIdTo').val(_selecteddimid);
            }
        }
        else {
            $('#dd_DimIdTo').empty();
            $('#dd_DimIdTo').prepend("<option value='0' selected='selected'></option>");
        }

        if (_selectedvalid != '0') {
            _html = [];
            var _data = JSON.parse(LoanFixedAssetObject.dimvalue);
            $.each(_data, function (key, value) {
                if (value.RowId == _selectedvalid) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.valueName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                }
            });
            $('#dd_DimValueIdTo').html(_html.join(""));
            $('#dd_DimValueIdTo').prepend("<option value='0' selected='selected'></option>");
            if (_selectedvalid != undefined && _selectedvalid != 'undefined' && _selectedvalid != '') {
                $('#dd_DimValueIdTo').val(_selectedvalid);
            }
        }
        else {
            $('#dd_DimValueIdTo').empty();
            $('#dd_DimValueIdTo').prepend("<option value='0' selected='selected'></option>");
        }

    },


};

var showmodal = function () {
    $('.modal-title').html('Add New Loan');
    LoanFixedAssetObject.hdnid = '';
    $('#dd_FALocIdTo').val('0');
    $('#dd_DimIdTo').val('0');
    $('#dd_DimValueIdTo').val('0');
    $('#txt_Remarks').val('');
    $("#myModal").modal('show');
};

var getempname = function (sel) {
    $('#txt_ename').val($("option:selected", sel).attr("ename"));
};

var savelocationtran = function () {
    var validate = true;

    var cudtranDate = new Date($('#txt_LoanDt').val());
    var lasttranDate = new Date(LoanFixedAssetObject.lastTransdt);

    var ExptReturnDt = new Date($('#txt_ExptReturnDt').val());
    var ActualReturnDt = new Date($('#txt_ActualReturnDt').val());

    if ($('#txt_LoanDt').val() == '') {
        validate = false;
        $.alertable.alert(`Loan Date required.`);
        $("#txt_LoanDt").focus();
        return false;
    }
    else if (cudtranDate.getTime() <= lasttranDate.getTime()) {
        validate = false;
        $.alertable.alert(`Date Should Greater Last Loan Date. ${LoanFixedAssetObject.lastTransdt}`);
        $("#txt_LoanDt").focus();
        return false;
    }
    else if ($('#dd_FALocIdTo').val() == '0') {
        validate = false;
        $.alertable.alert(`To Location required.`);
        $("#dd_FALocIdTo").focus();
        return false;
    }
    else if ($('#txt_ExptReturnDt').val() == '') {
        validate = false;
        $.alertable.alert(`Expencted Return Date required.`);
        $("#txt_ExptReturnDt").focus();
        return false;
    }
    else if (ExptReturnDt.getTime() <= cudtranDate.getTime()) {
        validate = false;
        $.alertable.alert(`Date Should Greater Last Loan Date. ${$('#txt_LoanDt').val()}`);
        $("#txt_ExptReturnDt").focus();
        return false;
    }
    /*else if ($('#txt_ActualReturnDt').val() == '') {
        validate = false;
        $.alertable.alert(`Actual Return Date required.`);
        $("#txt_ActualReturnDt").focus();
        return false;
    }
    else if (ActualReturnDt.getTime() <= ExptReturnDt.getTime()) {
        validate = false;
        $.alertable.alert(`Actual Return Date Should Greater Then Expencted Return Date. ${$('#txt_ExptReturnDt').val()}`);
        $("#txt_enddate").focus();
        return false;
    }*/

    var _data = {};
    if (validate == true) {

        _data["id"] = LoanFixedAssetObject.hdnid;
        _data["faid"] = LoanFixedAssetObject.faid;
        _data["cocd"] = LoanFixedAssetObject.cocd;
        _data["LoanDt"] = $('#txt_LoanDt').val();
        _data["FALocIdFrom"] = $('#dd_FALocIdFrom').val();
        _data["FALocIdTo"] = $('#dd_FALocIdTo').val();
        _data["DimIdFrom"] = $('#dd_DimIdFrom').val();
        _data["DimValueIdFrom"] = $('#dd_DimValueIdFrom').val();

        _data["DimIdTo"] = $('#dd_DimIdTo').val();
        _data["DimValueIdTo"] = $('#dd_DimValueIdTo').val();
        _data["Remarks"] = $('#txt_Remarks').val();
        _data["ExptReturnDt"] = $('#txt_ExptReturnDt').val();
        _data["ActualReturnDt"] = $('#txt_ActualReturnDt').val();
        _data["isblock"] = 'false';
        _data["ip"] = LoanFixedAssetObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        var _url = "loan-fixed-asset.aspx/doSave";
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
                    $("#assets_table").dataTable().fnDestroy();
                    LoanFixedAssetObject.do_loadlist();
                    $('#dd_FALocIdTo').val('0');
                    $('#dd_DimIdTo').val('0');
                    $('#dd_DimValueIdTo').val('0');
                    $('#txt_Remarks').val('');
                    $("#myModal").modal('hide');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var roleaction = function (roleid, loandate, isblock, mode) {
    if (roleid == "" || roleid == undefined || roleid == "undefined") return;

    if (mode == 'delete') {
        var validate = true;

        var rowloanDate = new Date($.trim(loandate));
        var lasttranDate = new Date(LoanFixedAssetObject.lastTransdt);

        if ((lasttranDate.getTime() === rowloanDate.getTime()) && isblock == 'No') {
            $.alertable
                .custconfirm(`Are you want to delete the loan fixed asset?`, ``, `Yes`, `No`)
                .then(
                    function () {
                        var _data;
                        _data = '{id:"' + roleid + '", faid:"' + LoanFixedAssetObject.faid + '"}';

                        $.ajax({
                            type: "POST",
                            url: "loan-fixed-asset.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    $("#assets_table").dataTable().fnDestroy();
                                    LoanFixedAssetObject.do_loadlist();
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
        else {
            $.alertable.alert(`Unable to delete record!`);
        }

    }

};

function ShowIP(response) {
    LoanFixedAssetObject.ip = response.ip;
}


var onlyNumberKey = function (evt) {
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
};
function cancelbtn() {
    localStorage.menu_id_premission = localStorage._fixedassetmenuid;
    localStorage.clickedmenu_id = localStorage._fixedassetmenuid;

    window.location = 'fixed-assets-master.aspx';
}


