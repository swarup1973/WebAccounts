$(document).ready(function () {
    UOMObject.cocd = $('#ddlCompany').val();
    if (localStorage._lastmenuid == '' || localStorage._lastmenuid == undefined) {
        localStorage._lastmenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._lastmenuid;
    }

    UOMObject.do_loadUOM();
    //UOMObject.do_loadlookup();
    UOMObject.do_getUserPagepermission();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var UOMObject = {
    cocd: '',
    type: '',
    mode: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _StandardUnitConversionviewperm: false,
    _UnitCreationWizardviewperm: false,
    _ItemSpecificConversionviewperm: false,
    _UnitCreationmenuid: '',
    _StandardUnitmenuid: '',
    _ItemSpecificmenuid: '',
    _mainmenuid: '',
    _lastmenuid: '',

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = UOMObject.cocd;

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
                            UOMObject.VendorPostingGroup = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table1") {
                            UOMObject.Currency = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table2") {
                            UOMObject.County = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table3") {
                            UOMObject.State = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table4") {
                            UOMObject.PaymentTerm = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table5") {
                            UOMObject.PaymentMothod = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table6") {
                            UOMObject.ShipmentMethod = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table7") {
                            UOMObject.NatureofBusiness = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table8") {
                            UOMObject.BranchApplicable = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table9") {
                            UOMObject.PersonResponsible = JSON.stringify(objnew[key]);
                        }
                        /*else if (attrName.toLowerCase() == "table10") {
                            UOMObject.BankAccount = JSON.stringify(objnew[key]);
                        }*/
                        else if (attrName.toLowerCase() == "table11") {
                            UOMObject.WitholdingTaxGroup = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table12") {
                            UOMObject.SelsTaxGroup = JSON.stringify(objnew[key]);
                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_loadUOM : () => {

        var _data = {};
        _data["cocd"] = UOMObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "unit-of-measurement.aspx/loadUOM",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                UOMObject.do_populateUOM(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateUOM: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#unit_table",
            fields: [
                { label: "UomCd", name: "UomCd" },
                { label: "UomDesc", name: "UomDesc" },
                { label: "DeciPrecision", name: "DeciPrecision" },
                { label: "IsBlock", name: "IsBlock" },
            ],
        });

        var uomtable = $("#unit_table");
        //userstable.html("");

        var uomdata = [];

        for (var i = 0; i < obj.length; i++) {
            var objnew = obj[i];
            for (var key in objnew) {
                var attrName = key;
                if (attrName.toLowerCase() == "table") {
                    uomdata = objnew[key];
                }
            }
        };


        uomtable.dataTable({
            dom: "Bfrtip",
            fixedHeader: true,
            data: uomdata,
            columns: [
                { data: "UomCd" },
                { data: "UomDesc" },
                { data: "DeciPrecision" },
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
                    add: "delete", text: 'Delete', editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'customer_delete'
                    },
                },
                {
                    add: "wizard", text: 'Unit Creation Wizard ', editor: editor, action: () => window.open("#"),
                    attr: {
                        title: 'Unit',
                        id: 'unit_wizard'
                    },
                },
                {
                    add: "wizard", text: 'Standard Unit Conversion', editor: editor, action: () => showPage('standard-conversion'),
                    attr: {
                        title: 'standard',
                        id: 'standard_unit'
                    },
                },
                {
                    add: "wizard", text: 'Item Specific Conversion', editor: editor, action: () => showPage('item-specific-conversion'),
                    attr: {
                        title: 'Item',
                        id: 'item_specific'
                    },
                }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("UomCd", `${data.UomCd}`);
                $(row).attr("UomDesc", `${data.UomDesc}`);
            },
        });

        var table = $('#unit_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!UOMObject._deleteperm[0]) {
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

        if (!UOMObject._createperm[0]) {
            $('#customer_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#customer_create').prop("disabled", true);
            $('#customer_create').attr('title', 'do not have permission to Add New Record!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!UOMObject._editperm[0]) {
            $('#customer_edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#customer_edit').prop("disabled", true);
            $('#customer_edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!UOMObject._deleteperm[0]) {
            $('#customer_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#customer_delete').prop("disabled", true);
            $('#customer_delete').attr('title', 'do not have delete permission!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!UOMObject._UnitCreationWizardviewperm[0]) {
            $('#unit_wizard').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#unit_wizard').prop("disabled", true);
            $('#unit_wizard').attr('title', 'do not have permission!!!');
            table.button(3).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!UOMObject._StandardUnitConversionviewperm[0]) {
            $('#standard_unit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#standard_unit').prop("disabled", true);
            $('#standard_unit').attr('title', 'do not have permission!!!');
            table.button(4).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!UOMObject._ItemSpecificConversionviewperm[0]) {
            $('#item_specific').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#item_specific').prop("disabled", true);
            $('#item_specific').attr('title', 'do not have permission!!!');
            table.button(5).action(function () {
                this.active(false);
                //this.disable();
            });
        }
    },


    do_loaddataedit: (id) => {

        var _data = {};
        _data["id"] = id;
        _data["cocd"] = UOMObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "unit-of-measurement.aspx/doedit",
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
                                UOMObject.hdnid = objnew[key][0].RowId;
                                $('#txtCode').val(objnew[key][0].UomCd);
                                $('#txtCode').prop('readonly', true);
                                $('#txtDesc').val(objnew[key][0].UomDesc);
                                $('#txtDecimal').val(objnew[key][0].DeciPrecision);
                                if (objnew[key][0].IsBlock == 1) {
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
        MainObject.do_getuserpageaccess(UOMObject);
        UOMObject._vieweperm = MainObject.do_IsActionMenuPermission(UOMObject.access, 'Unit of Measurement', 'view');
        UOMObject._createperm = MainObject.do_IsActionMenuPermission(UOMObject.access, 'Unit of Measurement', 'create');
        UOMObject._editperm = MainObject.do_IsActionMenuPermission(UOMObject.access, 'Unit of Measurement', 'edit');
        UOMObject._deleteperm = MainObject.do_IsActionMenuPermission(UOMObject.access, 'Unit of Measurement', 'delete');
        UOMObject._mainmenuid = MainObject.do_IsActionMenuPermission(UOMObject.access, 'Unit of Measurement', 'menuid');
        UOMObject._UnitCreationWizardviewperm = MainObject.do_IsActionMenuPermission(UOMObject.access, 'Unit Creation Wizard', 'view');
        UOMObject._UnitCreationmenuid = MainObject.do_IsActionMenuPermission(UOMObject.access, 'Unit Creation Wizard', 'menuid');
        UOMObject._StandardUnitConversionviewperm = MainObject.do_IsActionMenuPermission(UOMObject.access, 'Standard Unit Conversion', 'view');
        UOMObject._StandardUnitmenuid = MainObject.do_IsActionMenuPermission(UOMObject.access, 'Standard Unit Conversion', 'menuid');
        UOMObject._ItemSpecificConversionviewperm = MainObject.do_IsActionMenuPermission(UOMObject.access, 'Item Specific Conversion', 'view');
        UOMObject._ItemSpecificmenuid = MainObject.do_IsActionMenuPermission(UOMObject.access, 'Item Specific Conversion', 'menuid');
    },

};

var donosequencerelation = function (id, nscode, desc) {
    if (nscode == '' || nscode == undefined) {
        $.alertable.alert(`Please select the Row.`);
        return false;
    }

    window.location = "unit-of-measurement-relation.aspx?id=" + id + "&code=" + nscode + "&desc=" + desc + "&menuid=" + UOMObject._menuid[1];
};

var showmodal = function () {
    $('.modal-title').html('Unit of measurment - New');
    $('#txtCode').val('');
    $('#txtCode').prop('readonly', false);
    $('#txtDesc').val('');
    $('#txtDecimal').val('');
    $('#div_block').hide();
    $("#myModal").modal('show');
    UOMObject.mode = 'New';
};
var showmodaledit = function () {
    $("#myModal").modal('show');
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {
        UOMObject.mode = 'edit';
        UOMObject.do_loaddataedit(id);
        $('.modal-title').html('Edit');
        $('#txtDesc').focus();
        $('#editsection').show();
        $("#myModal").modal('show');
    }
    else if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '"}';

        $.ajax({
            type: "POST",
            url: "unit-of-measurement.aspx/docheckdelete",
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
                            url: "unit-of-measurement.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    window.location = "unit-of-measurement.aspx";
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
        $.alertable.alert(`Description required.`);
        $("#txtDesc").focus();
        return false;
    }
    else if ($('#txtDecimal').val() == '') {
        validate = false;
        $.alertable.alert(`Decimal Description required.`);
        $("#txtDecimal").focus();
        return false;
    }

    else {
        if (UOMObject.mode != "edit") {
            if (UOMObject.hdnid == undefined || UOMObject.hdnid == 'undefined') UOMObject.hdnid = '';
            var _data = '{id:"' + UOMObject.hdnid + '", pid:"",code: "' + encodeURIComponent($("#txtCode").val().trim()) + '", cocd: "' + encodeURIComponent(UOMObject.cocd) + '"} ';

            $.ajax({
                type: "POST",
                url: "unit-of-measurement.aspx/docheckcode",
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

        if (UOMObject.hdnid == undefined || UOMObject.hdnid == 'undefined') UOMObject.hdnid = '';
        _data["id"] = UOMObject.hdnid;
        _data["cocd"] = UOMObject.cocd;

        _data["code"] = $('#txtCode').val();
        _data["Desc"] = $('#txtDesc').val();
        _data["Deciaml"] = $('#txtDecimal').val();
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

        var _url = "unit-of-measurement.aspx/doSave";
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
                    window.location = "unit-of-measurement.aspx";
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

function showPage(value) {
    //var sel = document.getElementById('subjects');
    var option = value;//sel.options[sel.selectedIndex].value;
    var passmenid;
    if (value == "standard-conversion") {
        passmenid = UOMObject._StandardUnitmenuid[1];
    } else {
        passmenid = UOMObject._ItemSpecificmenuid[1];
    }
    window.location = option + ".aspx?menuid=" + passmenid;
}