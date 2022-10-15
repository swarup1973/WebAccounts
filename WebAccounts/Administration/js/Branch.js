$(document).ready(function () {
    BranchObject.cocd = $('#ddlCompany').val();
    if (localStorage._lastmenuid == '' || localStorage._lastmenuid == undefined) {
        localStorage._lastmenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._lastmenuid;
    }
    
    BranchObject.do_loadnobranch();
    //BranchObject.do_loadlookup();
    BranchObject.do_getUserPagepermission();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var BranchObject = {
    cocd: '',
    type: '',
    mode:'',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    __dimensionsetupviewperm: false,
    _menuid : '',
    _mainmenuid: '',
    _lastmenuid:'',

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = BranchObject.cocd;

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
                            BranchObject.VendorPostingGroup = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table1") {
                            BranchObject.Currency = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table2") {
                            BranchObject.County = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table3") {
                            BranchObject.State = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table4") {
                            BranchObject.PaymentTerm = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table5") {
                            BranchObject.PaymentMothod = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table6") {
                            BranchObject.ShipmentMethod = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table7") {
                            BranchObject.NatureofBusiness = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table8") {
                            BranchObject.BranchApplicable = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table9") {
                            BranchObject.PersonResponsible = JSON.stringify(objnew[key]);
                        }
                        /*else if (attrName.toLowerCase() == "table10") {
                            BranchObject.BankAccount = JSON.stringify(objnew[key]);
                        }*/
                        else if (attrName.toLowerCase() == "table11") {
                            BranchObject.WitholdingTaxGroup = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table12") {
                            BranchObject.SelsTaxGroup = JSON.stringify(objnew[key]);
                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_loadnobranch: () => {

        var _data = {};
        _data["cocd"] = BranchObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "branch-responsibility-center-overview.aspx/loadBranch",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                BranchObject.do_populateBranch(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateBranch: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#branch_table",
            fields: [
                { label: "BranchCd", name: "BranchCd" },
                { label: "BranchName", name: "BranchName" },
                { label: "Location", name: "Location" },
                { label: "IsBlock", name: "IsBlock" },
            ],
        });

        var roletable = $("#branch_table");
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
                { data: "BranchCd"},
                { data: "BranchName"},
                { data: "Location"},
                {
                    data: "IsBlock",
                    render: function (data, type, row) {
                        if (data == true) {
                            return '<input type="checkbox" id= chkIsBlock_' + row.RowId + ' checked="checked">';
                        }
                        else {
                            return '<input type="checkbox" id= chkIsBlock_' + row.RowId + '>';
                        }
                    },
                },                
            ],
            select: true,
            //scrollX: true,
            lengthMenu: [50, 60],//, 25, 50, 50, 50
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: () => redirecttoSetup($('.selected').attr('RowId'), 'new'),
                    attr: {
                        title: 'New',
                        id: 'customer_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: () => redirecttoSetup($('.selected').attr('RowId'), 'edit'),
                    attr: {
                        title: 'Edit',
                        id: 'customer_edit'
                    },
                },
                {
                    extend: "remove", editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'customer_delete'
                    },
                }
                ,
                {
                    add: "DimensionSetup", text: 'Dimension Setup', editor: editor, action: function () {
                        dodimensionsetup($('.selected').attr('RowId'),
                            $('.selected').attr('BranchCd'), $('.selected').attr('BranchName'));
                    },
                    attr: {
                        title: 'Dimension Setup',
                        id: 'dimension_setup',
                        value: BranchObject._menuid[1]
                    },
                }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("BranchCd", `${data.BranchCd}`);
                $(row).attr("BranchName", `${data.BranchName}`);
            },
        });

        var table = $('#branch_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!BranchObject._deleteperm[0]) {
                    $('#customer_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#customer_delete').prop("disabled", true);
                    $('#customer_delete').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!BranchObject._createperm[0]) {
            $('#customer_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#customer_create').prop("disabled", true);
            $('#customer_create').attr('title', 'do not have permission to Add New Record!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!BranchObject._editperm[0]) {
            $('#customer_edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#customer_edit').prop("disabled", true);
            $('#customer_edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!BranchObject._deleteperm[0]) {
            $('#customer_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#customer_delete').prop("disabled", true);
            $('#customer_delete').attr('title', 'do not have delete permission!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!BranchObject._dimensionsetupviewperm[0]) {
            $('#dimension_setup').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#dimension_setup').prop("disabled", true);
            $('#dimension_setup').attr('title', 'do not have permission!!!');
            table.button(3).action(function () {
                this.active(false);
                //this.disable();
            });
        }
    },

    
    

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(BranchObject);
        BranchObject._vieweperm = MainObject.do_IsActionMenuPermission(BranchObject.access, 'BRANCH/RESPONSIBILITY CENTER', 'view');
        BranchObject._createperm = MainObject.do_IsActionMenuPermission(BranchObject.access, 'BRANCH/RESPONSIBILITY CENTER', 'create');
        BranchObject._editperm = MainObject.do_IsActionMenuPermission(BranchObject.access, 'BRANCH/RESPONSIBILITY CENTER', 'edit');
        BranchObject._deleteperm = MainObject.do_IsActionMenuPermission(BranchObject.access, 'BRANCH/RESPONSIBILITY CENTER', 'delete');
        BranchObject._mainmenuid = MainObject.do_IsActionMenuPermission(BranchObject.access, 'BRANCH/RESPONSIBILITY CENTER', 'menuid');
        BranchObject._dimensionsetupviewperm = MainObject.do_IsActionMenuPermission(BranchObject.access, 'DIMENSION SETUP', 'view');
        BranchObject._menuid = MainObject.do_IsActionMenuPermission(BranchObject.access, 'DIMENSION SETUP', 'menuid');
    },

};

var redirecttoSetup = function (id, mode) {
    if ((id == '' || id == undefined) && mode == 'edit') {
        $.alertable.alert(`Please select the Row.`);
        return false;
    }

    window.location = "center-setup.aspx?id=" + id + "&mode=" + mode;//"no-sequence-relation.aspx?id=" + id + "&code=" + nscode + "&desc=" + desc + "&menuid=" + BranchObject._menuid[1];
};

//var showmodal = function () {
//    $('.modal-title').html('No. Sequence - New');
//    $('#txtCode').val('');
//    $('#txtCode').prop('readonly', false);
//    $('#txtDesc').val('');
//    $('#txtStartDate').val('');
//    $('#txtEndDate').val('');
//    $('#txtStartNo').val('');
//    $('#txtEndNo').val('');
//    $('#txtNoInterval').val('');
//    $('#txtPrefix').val('');
//    $('#txtSuffix').val('');
//    $('#chkManual').prop('checked', false);
//    $('#chkClose').prop('checked', false);
//    $('#chkBlock').prop('checked', false);
//    $('#editsection').hide();
//    $("#myModal").modal('show');
//    BranchObject.mode = 'New';
//};
//var showmodaledit = function () {
//    $("#myModal").modal('show');
//};

var dodimensionsetup = function (id, code, name) {
    if ((id == '' || id == undefined) && mode == 'edit') {
        $.alertable.alert(`Please select the Row.`);
        return false;
    }

    localStorage.code = code;
    localStorage.name = name;
    localStorage.dimensionMenuid = BranchObject._menuid[1];
    window.location = "center-dimension.aspx?id=" + id;//"no-sequence-relation.aspx?id=" + id + "&code=" + nscode + "&desc=" + desc + "&menuid=" + BranchObject._menuid[1];
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '"}';

        $.ajax({
            type: "POST",
            url: "branch-responsibility-center-overview.aspx/docheckdelete",
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
                $.alertable.alert(`Problem in retreiving...`);
            },
        });

        if (validate == true) {

            $.alertable
                .custconfirm(`Are you want to delete?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + id + '"}';

                        $.ajax({
                            type: "POST",
                            url: "branch-responsibility-center-overview.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    window.location = "branch-responsibility-center-overview.aspx";
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
                                $.alertable.alert(`Problem in retreiving...`);
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

var savedata = function () {
    var validate = true;

    if ($('#txtCode').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txtCode").focus();
        return false;
    }
    else if ($('#txtDesc').val() == '') {
        validate = false;
        $.alertable.alert(`Vendor Shipment Description required.`);
        $("#txtDesc").focus();
        return false;
    }
    else if ($('#txtStartDate').val() == '') {
        validate = false;
        $.alertable.alert(`Start Date required.`);
        $("#txtStartDate").focus();
        return false;
    }
    else if ($('#txtEndDate').val() == '') {
        validate = false;
        $.alertable.alert(`End Date required.`);
        $("#txtEndDate").focus();
        return false;
    }
    else if ($('#txtStartNo').val() == '') {
        validate = false;
        $.alertable.alert(`Start Number required.`);
        $("#txtStartNo").focus();
        return false;
    }
    else if ($('#txtEndNo').val() == '') {
        validate = false;
        $.alertable.alert(`End Number required.`);
        $("#txtEndNo").focus();
        return false;
    }
    else if ($('#txtNoInterval').val() == '') {
        validate = false;
        $.alertable.alert(`No Interval required.`);
        $("#txtNoInterval").focus();
        return false;
    }
    else if ($('#txtPrefix').val() == '') {
        validate = false;
        $.alertable.alert(`Prefix required.`);
        $("#txtPrefix").focus();
        return false;
    }
    else if ($('#txtSuffix').val() == '') {
        validate = false;
        $.alertable.alert(`Suffix required.`);
        $("#txtSuffix").focus();
        return false;
    }

    if ($('#txtStartNo').val().length != $('#txtEndNo').val().length) {
        validate = false;
        $.alertable.alert(`Start and End Number should be same.`);
        $("#txtEndNo").focus();
        return false;
    }
    
    else {
        if (BranchObject.mode != "edit") {
            if (BranchObject.hdnid == undefined || BranchObject.hdnid == 'undefined') BranchObject.hdnid = '';
            var _data = '{id:"' + BranchObject.hdnid + '", pid:"",code: "' + encodeURIComponent($("#txtCode").val().trim()) + '", cocd: "' + encodeURIComponent(BranchObject.cocd) + '", startdate: "' + encodeURIComponent($('#txtStartDate').val()) + '", enddate: "' + encodeURIComponent($('#txtEndDate').val()) + '", startno: "' + encodeURIComponent($('#txtStartNo').val()) + '", endno: "' + encodeURIComponent($('#txtEndNo').val()) + '"} ';

            $.ajax({
                type: "POST",
                url: "no-sequence.aspx/docheckcode",
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
                            if (attrName.toLowerCase() == "table1") {
                                if (objnew[key].length > 0) {
                                    validate = false;
                                    $.alertable.alert(objnew[key][0].error_code + '- ' + objnew[key][0].error_msg);
                                } else {
                                    validate = true;
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
    }



    var _data = {};
    if (validate == true) {

        if (BranchObject.hdnid == undefined || BranchObject.hdnid == 'undefined') BranchObject.hdnid = '';
        _data["id"] = BranchObject.hdnid;
        _data["cocd"] = BranchObject.cocd;

        _data["code"] = $('#txtCode').val();
        _data["Desc"] = $('#txtDesc').val();
        _data["StartDate"] = $('#txtStartDate').val();
        _data["EndDate"] = $('#txtEndDate').val();
        _data["StartNo"] = $('#txtStartNo').val();
        _data["EndNo"] = $('#txtEndNo').val();
        _data["NoInterval"] = $('#txtNoInterval').val();
        _data["Prefix"] = $('#txtPrefix').val();
        _data["Suffix"] = $('#txtSuffix').val();
        _data["Manual"] = false;
        if ($("#chkManual").is(':checked')) {
            //if ($('#chkBlock').checked) {
            _data["Manual"] = true;
        }
        _data["Close"] = false;
        if ($("#chkClose").is(':checked')) {
            //if ($('#chkBlock').checked) {
            _data["Close"] = true;
        }
        _data["Block"] = false;
        if ($("#chkBlock").is(':checked')) {
            //if ($('#chkBlock').checked) {
            _data["Block"] = true;
        }

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "no-sequence.aspx/doSave";
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
                    window.location = "no-sequence.aspx";
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};
