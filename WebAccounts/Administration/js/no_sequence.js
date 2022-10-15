$(document).ready(function () {
    NoSequenceObject.cocd = $('#ddlCompany').val();
    //if (localStorage._lastmenuid == '' || localStorage._lastmenuid == undefined) {
    //    localStorage._lastmenuid = localStorage.menu_id_premission;
    //} else {
    //    localStorage.menu_id_premission = localStorage._lastmenuid;
    //}
    
    NoSequenceObject.do_loadnosequence();
    //NoSequenceObject.do_loadlookup();
    NoSequenceObject.do_getUserPagepermission();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var NoSequenceObject = {
    cocd: '',
    type: '',
    mode:'',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _nosequencerelationviewperm: false,
    _menuid : '',
    _mainmenuid: '',
    _lastmenuid:'',

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = NoSequenceObject.cocd;

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
                            NoSequenceObject.VendorPostingGroup = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table1") {
                            NoSequenceObject.Currency = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table2") {
                            NoSequenceObject.County = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table3") {
                            NoSequenceObject.State = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table4") {
                            NoSequenceObject.PaymentTerm = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table5") {
                            NoSequenceObject.PaymentMothod = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table6") {
                            NoSequenceObject.ShipmentMethod = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table7") {
                            NoSequenceObject.NatureofBusiness = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table8") {
                            NoSequenceObject.BranchApplicable = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table9") {
                            NoSequenceObject.PersonResponsible = JSON.stringify(objnew[key]);
                        }
                        /*else if (attrName.toLowerCase() == "table10") {
                            NoSequenceObject.BankAccount = JSON.stringify(objnew[key]);
                        }*/
                        else if (attrName.toLowerCase() == "table11") {
                            NoSequenceObject.WitholdingTaxGroup = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table12") {
                            NoSequenceObject.SelsTaxGroup = JSON.stringify(objnew[key]);
                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_loadnosequence: () => {

        var _data = {};
        _data["cocd"] = NoSequenceObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "no-sequence.aspx/loadNoSequence",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                NoSequenceObject.do_populateNoSequence(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateNoSequence: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#no_sequence_table",
            fields: [
                { label: "NsCode", name: "NsCode" },
                { label: "NsDescription", name: "NsDescription" },
                { label: "StartDate", name: "StartDate" },
                { label: "EndDate", name: "EndDate" },
                { label: "StartingNo", name: "StartingNo" },
                { label: "EndingNo", name: "EndingNo" },
                { label: "NoInterval", name: "NoInterval" },
                { label: "Prefix", name: "Prefix" },
                { label: "Suffix", name: "Suffix" },
                { label: "No_Sequence", name: "No_Sequence" },
                { label: "AllowManual", name: "AllowManual" },
                { label: "CloseSequence", name: "CloseSequence" },
                { label: "IsBlock", name: "IsBlock" },
                { label: "RelationExist", name: "RelationExist" },
                { label: "LastNoUsed", name: "LastNoUsed" },
            ],
        });

        var roletable = $("#no_sequence_table");
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
                { data: "NsCode"},
                { data: "NsDescription"},
                {
                    data: "StartDate",
                    "render": function (data, type, row) {
                        return moment(row.StartDate).format('MM/DD/YYYY');
                    }
                },
                {
                    data: "EndDate",
                    "render": function (data, type, row) {
                        return moment(row.EndDate).format('MM/DD/YYYY');
                    }
                },
                { data: "StartingNo"},
                { data: "EndingNo"},
                { data: "NoInterval" },
                { data: "Prefix" },
                { data: "Suffix" },
                { data: "No_Sequence" },
                {
                    data: "AllowManual",
                    render: function (data, type, row) {
                        if (data == true) {
                            return '<input type="checkbox" id= chkAllowManual_' + row.RowId + ' checked="checked">';
                        }
                        else {
                            return '<input type="checkbox" id= chkAllowManual_' + row.RowId + '>';
                        }
                    },
                },
                {
                    data: "CloseSequence",
                    render: function (data, type, row) {
                        if (data == true) {
                            return '<input type="checkbox" id= chkCloseSequence_' + row.RowId + ' checked="checked">';
                        }
                        else {
                            return '<input type="checkbox" id= chkCloseSequence_' + row.RowId + '>';
                        }
                    },
                },
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
                {
                    data: "RelationExist",
                    render: function (data, type, row) {
                        if (data == true) {
                            return '<input type="checkbox" id= chkRelationExist_' + row.RowId + ' checked="checked">';
                        }
                        else {
                            return '<input type="checkbox" id= chkRelationExist_' + row.RowId + '>';
                        }
                    },
                },
                { data: "LastNoUsed"},
            ],
            select: true,
            //scrollX: true,
            lengthMenu: [50, 60],//, 25, 50, 50, 50
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'customer_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: () => doaction($('.selected').attr('RowId'), 'edit'),
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
                },
                {
                    add: "nosequencerelation", text: 'No Sequence Relation', editor: editor, action: function () { donosequencerelation($('.selected').attr('RowId'), $('.selected').attr('NsCode'), $('.selected').attr('NsDescription')); },
                    attr: {
                        title: 'No Sequence Relation',
                        id: 'no_sequence_relation',
                        value: NoSequenceObject._menuid[1]
                    },
                }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("NsCode", `${data.NsCode}`);
                $(row).attr("NsDescription", `${data.NsDescription}`);
            },
        });

        var table = $('#no_sequence_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!NoSequenceObject._deleteperm[0]) {
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

        if (!NoSequenceObject._createperm[0]) {
            $('#customer_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#customer_create').prop("disabled", true);
            $('#customer_create').attr('title', 'do not have permission to Add New Record!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!NoSequenceObject._editperm[0]) {
            $('#customer_edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#customer_edit').prop("disabled", true);
            $('#customer_edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!NoSequenceObject._deleteperm[0]) {
            $('#customer_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#customer_delete').prop("disabled", true);
            $('#customer_delete').attr('title', 'do not have delete permission!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!NoSequenceObject._nosequencerelationviewperm[0]) {
            $('#no_sequence_relation').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#no_sequence_relation').prop("disabled", true);
            $('#no_sequence_relation').attr('title', 'do not have delete permission!!!');
            table.button(3).action(function () {
                this.active(false);
                //this.disable();
            });
        }
    },

    
    do_loaddataedit: (id) => {

        var _data = {};
        _data["id"] = id;
        _data["cocd"] = NoSequenceObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "no-sequence.aspx/doedit",
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
                                NoSequenceObject.hdnid = objnew[key][0].RowId;
                                $('#txtCode').val(objnew[key][0].NsCode);
                                $('#txtCode').prop('readonly', true);
                                $('#txtDesc').val(objnew[key][0].NsDescription);
                                $('#txtStartDate').val(objnew[key][0].StartDate.substring(0, 10));
                                $('#txtEndDate').val(objnew[key][0].EndDate.substring(0,10));
                                $('#txtStartNo').val(objnew[key][0].StartingNo);
                                $('#txtEndNo').val(objnew[key][0].EndingNo);
                                $('#txtNoInterval').val(objnew[key][0].NoInterval);
                                $('#txtPrefix').val(objnew[key][0].Prefix);
                                $('#txtSuffix').val(objnew[key][0].Suffix);
                                if (objnew[key][0].AllowManual == 1) {
                                    $('#chkManual').prop('checked', true);
                                } else {
                                    $('#chkManual').prop('checked', false);
                                }
                                if (objnew[key][0].CloseSequence == 1) {
                                    $('#chkClose').prop('checked', true);
                                } else {
                                    $('#chkClose').prop('checked', false);
                                }
                                if (objnew[key][0].Block == 1) {
                                    $('#chkBlock').prop('checked', true);
                                } else {
                                    $('#chkBlock').prop('checked', false);
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
        MainObject.do_getuserpageaccess(NoSequenceObject);
        NoSequenceObject._vieweperm = MainObject.do_IsActionMenuPermission(NoSequenceObject.access, 'No Sequence', 'view');
        NoSequenceObject._createperm = MainObject.do_IsActionMenuPermission(NoSequenceObject.access, 'No Sequence', 'create');
        NoSequenceObject._editperm = MainObject.do_IsActionMenuPermission(NoSequenceObject.access, 'No Sequence', 'edit');
        NoSequenceObject._deleteperm = MainObject.do_IsActionMenuPermission(NoSequenceObject.access, 'No Sequence', 'delete');
        NoSequenceObject._mainmenuid = MainObject.do_IsActionMenuPermission(NoSequenceObject.access, 'No Sequence', 'menuid');
        NoSequenceObject._nosequencerelationviewperm = MainObject.do_IsActionMenuPermission(NoSequenceObject.access, 'No Sequence Relation', 'view');
        NoSequenceObject._menuid = MainObject.do_IsActionMenuPermission(NoSequenceObject.access, 'No Sequence Relation', 'menuid');
    },

};

var donosequencerelation = function (id, nscode, desc) {
    if (nscode == '' || nscode == undefined) {
        $.alertable.alert(`Please select the Row.`);
        return false;
    }

    window.location = "no-sequence-relation.aspx?id=" + id + "&code=" + nscode + "&desc=" + desc + "&menuid=" + NoSequenceObject._menuid[1];
};

var showmodal = function () {
    $('.modal-title').html('No. Sequence - New');
    $('#txtCode').val('');
    $('#txtCode').prop('readonly', false);
    $('#txtDesc').val('');
    $('#txtStartDate').val('');
    $('#txtEndDate').val('');
    $('#txtStartNo').val('');
    $('#txtEndNo').val('');
    $('#txtNoInterval').val('');
    $('#txtPrefix').val('');
    $('#txtSuffix').val('');
    $('#chkManual').prop('checked', false);
    $('#chkClose').prop('checked', false);
    $('#chkBlock').prop('checked', false);
    $('#editsection').hide();
    $("#myModal").modal('show');
    NoSequenceObject.mode = 'New';
};
var showmodaledit = function () {
    $("#myModal").modal('show');
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {
        NoSequenceObject.mode = 'edit';
        NoSequenceObject.do_loaddataedit(id);
        $('.modal-title').html('No. Sequence - Edit');
        $('#txtEndDate').focus();
        $('#editsection').show();
        $("#myModal").modal('show');
    }
    else if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '"}';

        $.ajax({
            type: "POST",
            url: "no-sequence.aspx/docheckdelete",
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
                .custconfirm(`Are you want to delete?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + id + '"}';

                        $.ajax({
                            type: "POST",
                            url: "no-sequence.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    window.location = "no-sequence.aspx";
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
        if (NoSequenceObject.mode != "edit") {
            if (NoSequenceObject.hdnid == undefined || NoSequenceObject.hdnid == 'undefined') NoSequenceObject.hdnid = '';
            var _data = '{id:"' + NoSequenceObject.hdnid + '", pid:"",code: "' + encodeURIComponent($("#txtCode").val().trim()) + '", cocd: "' + encodeURIComponent(NoSequenceObject.cocd) + '", startdate: "' + encodeURIComponent($('#txtStartDate').val()) + '", enddate: "' + encodeURIComponent($('#txtEndDate').val()) + '", startno: "' + encodeURIComponent($('#txtStartNo').val()) + '", endno: "' + encodeURIComponent($('#txtEndNo').val()) + '"} ';

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

        if (NoSequenceObject.hdnid == undefined || NoSequenceObject.hdnid == 'undefined') NoSequenceObject.hdnid = '';
        _data["id"] = NoSequenceObject.hdnid;
        _data["cocd"] = NoSequenceObject.cocd;

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
