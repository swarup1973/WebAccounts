$(document).ready(function () {
    StandardObject.cocd = $('#ddlCompany').val();
    

    StandardObject.do_loadlookup();
    StandardObject.do_loadStandard();
    StandardObject.do_getUserPagepermission();
    $('#txt_from_unit_qty').change(function () {
        $('#txtconto_unit_qty').val($('#txt_from_unit_qty').val() * StandardObject.qty);
    });
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var StandardObject = {
    cocd: '',
    type: '',
    mode: '',
    qty:'',
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
        $.ajax({
            type: "POST",
            async: false,
            url: "standard-conversion.aspx/loadlookupdata",
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
                                    "<option value='" + value.RowId + "'>" + value.UomDesc + "</option>"
                                );
                            });
                            $("#from_unit").html(_html.join(""));
                            $("#from_unit").prepend("<option value='' selected='selected'></option>");

                            $("#to_unit").html(_html.join(""));
                            $("#to_unit").prepend("<option value='' selected='selected'></option>");
                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });

    },

    do_loadStandard: () => {

        if (queryString('menuid') != undefined || queryString("menuid") != null) {
            localStorage.menu_id_premission = queryString("menuid");
        }

        var _data = {};
        _data["cocd"] = StandardObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "standard-conversion.aspx/loadStandard",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                StandardObject.do_populateStandard(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateStandard: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#standard_table",
            fields: [
                { label: "FromUomCd", name: "FromUomCd" },
                { label: "ToUomCd", name: "ToUomCd" },
                { label: "EqualTo", name: "EqualTo" },
                { label: "ConvFactor", name: "ConvFactor" },
                { label: "RoType", name: "RoType" },
                { label: "IsBlock", name: "IsBlock" },
            ],
        });

        var standardtable = $("#standard_table");

        var standarddata = [];

        for (var i = 0; i < obj.length; i++) {
            var objnew = obj[i];
            for (var key in objnew) {
                var attrName = key;
                if (attrName.toLowerCase() == "table") {
                    standarddata = objnew[key];
                }
            }
        };


        standardtable.dataTable({
            dom: "Bfrtip",
            fixedHeader: true,
            data: standarddata,
            columns: [
                { data: "FromUomCdDesc" },
                { data: "ToUomCdDesc" },
                { data: "EqualTo" },
                { data: "ConvFactor" },
                { data: "RoType" },
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
                    add: "show", text: 'Show Conversion', editor: editor, action: () => showmodalshow(),
                    attr: {
                        title: 'Unit',
                        id: 'show_conversion'
                    },
                }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("UomCd", `${data.UomCd}`);
                $(row).attr("UomDesc", `${data.UomDesc}`);
            },
        });

        var table = $('#standard_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!StandardObject._deleteperm[0]) {
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

        if (!StandardObject._createperm[0]) {
            $('#customer_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#customer_create').prop("disabled", true);
            $('#customer_create').attr('title', 'do not have permission to Add New Record!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!StandardObject._editperm[0]) {
            $('#customer_edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#customer_edit').prop("disabled", true);
            $('#customer_edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!StandardObject._deleteperm[0]) {
            $('#customer_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#customer_delete').prop("disabled", true);
            $('#customer_delete').attr('title', 'do not have delete permission!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        //if (!StandardObject._UnitCreationWizardviewperm[0]) {
        //    $('#show_conversion').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        //    $('#show_conversion').prop("disabled", true);
        //    $('#show_conversion').attr('title', 'do not have permission!!!');
        //    table.button(3).action(function () {
        //        this.active(false);
        //        //this.disable();
        //    });
        //}
        
    },


    do_loaddataedit: (id) => {

        var _data = {};
        _data["id"] = id;
        _data["cocd"] = StandardObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "standard-conversion.aspx/doedit",
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
                                StandardObject.hdnid = objnew[key][0].RowId;
                                $('#from_unit').val(objnew[key][0].FromUomCd);
                                $('#from_unit').prop('readonly', true);
                                $('#to_unit').val(objnew[key][0].ToUomCd); 
                                $('#factor').val(objnew[key][0].ConvFactor);
                                $('#ddlroundup').val(objnew[key][0].RoType1);
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
        MainObject.do_getuserpageaccess(StandardObject);
        StandardObject._vieweperm = MainObject.do_IsActionMenuPermission(StandardObject.access, 'Standard Unit Conversion', 'view');
        StandardObject._createperm = MainObject.do_IsActionMenuPermission(StandardObject.access, 'Standard Unit Conversion', 'create');
        StandardObject._editperm = MainObject.do_IsActionMenuPermission(StandardObject.access, 'Standard Unit Conversion', 'edit');
        StandardObject._deleteperm = MainObject.do_IsActionMenuPermission(StandardObject.access, 'Standard Unit Conversion', 'delete');
        StandardObject._mainmenuid = MainObject.do_IsActionMenuPermission(StandardObject.access, 'Standard Unit Conversion', 'menuid');
        //StandardObject._UnitCreationWizardviewperm = MainObject.do_IsActionMenuPermission(StandardObject.access, 'Unit Creation Wizard', 'view');
        //StandardObject._UnitCreationmenuid = MainObject.do_IsActionMenuPermission(StandardObject.access, 'Unit Creation Wizard', 'menuid');
        //StandardObject._StandardUnitConversionviewperm = MainObject.do_IsActionMenuPermission(StandardObject.access, 'Standard Unit Conversion', 'view');
        //StandardObject._StandardUnitmenuid = MainObject.do_IsActionMenuPermission(StandardObject.access, 'Standard Unit Conversion', 'menuid');
        //StandardObject._ItemSpecificConversionviewperm = MainObject.do_IsActionMenuPermission(StandardObject.access, 'Item Specific Conversion', 'view');
        //StandardObject._ItemSpecificmenuid = MainObject.do_IsActionMenuPermission(StandardObject.access, 'Item Specific Conversion', 'menuid');
    },

};

var donosequencerelation = function (id, nscode, desc) {
    if (nscode == '' || nscode == undefined) {
        $.alertable.alert(`Please select the Row.`);
        return false;
    }

    window.location = "unit-of-measurement-relation.aspx?id=" + id + "&code=" + nscode + "&desc=" + desc + "&menuid=" + StandardObject._menuid[1];
};

var showmodal = function () {
    $('.modal-title').html('Unit of measurment - New');
    $('#txtCode').val('');
    $('#txtCode').prop('readonly', false);
    $('#txtDesc').val('');
    $('#txtDecimal').val('');
    $('#div_block').hide();
    $("#myModal").modal('show');
    StandardObject.mode = 'New';
};
var showmodaledit = function () {
    $("#myModal").modal('show');
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {
        StandardObject.mode = 'edit';
        StandardObject.do_loaddataedit(id);
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
            url: "standard-conversion.aspx/docheckdelete",
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
                            url: "standard-conversion.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    window.location = "standard-conversion.aspx";
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

    if ($('#from_unit').val() == '') {
        validate = false;
        $.alertable.alert(`From Unit required.`);
        $("#from_unit").focus();
        return false;
    }
    else if ($('#to_unit').val() == '') {
        validate = false;
        $.alertable.alert(`To Unit required.`);
        $("#to_unit").focus();
        return false;
    }
    else if ($('#factor').val() == '') {
        validate = false;
        $.alertable.alert(`Factor required.`);
        $("#factor").focus();
        return false;
    }
    else if ($('#ddlroundup').val() == '') {
        validate = false;
        $.alertable.alert(`Rounding to required.`);
        $("#ddlroundup").focus();
        return false;
    }
    else if ($('#from_unit').val() == $('#to_unit').val()) {
        validate = false;
        $.alertable.alert(`From Unit and To Unit can not be same.`);
        $("#from_unit").focus();
        return false;
    }

    //else {
    //    if (StandardObject.mode != "edit") {
    //        if (StandardObject.hdnid == undefined || StandardObject.hdnid == 'undefined') StandardObject.hdnid = '';
    //        var _data = '{id:"' + StandardObject.hdnid + '", pid:"",code: "' + encodeURIComponent($("#txtCode").val().trim()) + '", cocd: "' + encodeURIComponent(StandardObject.cocd) + '"} ';

    //        $.ajax({
    //            type: "POST",
    //            url: "standard-conversion.aspx/docheckcode",
    //            data: _data,
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            async: false,
    //            success: function (result) {
    //                if (!dochkses(result.d)) return;
    //                var rest = result.d;
    //                var obj = JSON.parse(`[${result.d}]`);
    //                for (var i = 0; i < obj.length; i++) {
    //                    var objnew = obj[i];
    //                    for (var key in objnew) {
    //                        var attrName = key;
    //                        if (attrName.toLowerCase() == "table1") {
    //                            if (objnew[key].length > 0) {
    //                                validate = false;
    //                                $.alertable.alert(objnew[key][0].error_code + '- ' + objnew[key][0].error_msg);
    //                            } else {
    //                                validate = true;
    //                            }
    //                        }
    //                    }
    //                }
    //            },
    //            failure: function (response) {
    //                validate = false;
    //                //$.alertable.alert(`Problem in retreiving items...`);
    //                $.alertable.alert(`Problem in retreiving items...`);
    //            },
    //        });
    //    }
    //}



    var _data = {};
    if (validate == true) {

        if (StandardObject.hdnid == undefined || StandardObject.hdnid == 'undefined') StandardObject.hdnid = '';
        _data["id"] = StandardObject.hdnid;
        _data["cocd"] = StandardObject.cocd;

        _data["FromUomCd"] = $("#from_unit").val();
        _data["ToUomCd"] = $("#to_unit").val();
        _data["ConvFactor"] = $('#factor').val();
        _data["RoType"] = $("#ddlroundup").val();
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

        var _url = "standard-conversion.aspx/doSave";
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
                    rdmenuid = localStorage.menu_id_premission;
                    window.location = "standard-conversion.aspx?menuid=" + rdmenuid;
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
    window.location=option + ".aspx";
}
var showmodalshow = function () {
    var table = $('#standard_table').DataTable();
    if (table.rows('.selected').data().length == 0) {
        $.alertable.alert(`Please select the row .`);
        return false;
    }
    StandardObject.qty = 0; $('#txt_from_unit_qty').val('');
    $('#txtconto_unit_qty').val('');
    for (var i = 0; i < table.rows('.selected').data().length; i++) {
        $("#txtcon_from_unit").val(table.rows('.selected').data()[i].FromUomCdDesc);
        StandardObject.qty = table.rows('.selected').data()[i].ConvFactor;
        $("#txtcontounitcode").val(table.rows('.selected').data()[i].ToUomCdDesc);
    }
    $("#myModalSHOW").modal('show');
};

