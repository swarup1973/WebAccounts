$(document).ready(function () {
    ItemGroupObject.cocd = $('#ddlCompany').val();
    /*if (localStorage._vendoracpagemenuid == '' || localStorage._vendoracpagemenuid == undefined) {
        localStorage._vendoracpagemenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._vendoracpagemenuid;
    }*/
    ItemGroupObject.do_getUserPagepermission();
    ItemGroupObject.do_loadoverview();
    //ItemGroupObject.do_loadlookup();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var ItemGroupObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _ComponentSetupperm: false,


    do_loadBasisofCalculation: (val) => {
        var _html = [];
        $("#dd_TaxOnTax").prop("disabled", true);

        if (val == 'P') {
            $('#dd_Unit').html(_html.join(""));
            $('#dd_Unit').prepend("<option value='' selected='selected'></option>");
            $("#dd_Unit").prop("disabled", true);

            var _data = JSON.parse(ItemGroupObject.BasisOfCalc);
            $.each(_data, function (key, value) {
                //if (value.CountryCd.replace(/[\r\n]+/gm, '') == val) {
                _html.push(
                    "<option value='" + value.id.replace(/[\r\n]+/gm, '') + "'>" + value.descr.replace(/[\r\n]+/gm, '') + "</option>"
                );
                //}
            });

            $('#dd_BasisOfCalc').html(_html.join(""));
            $('#dd_BasisOfCalc').prepend("<option value='' selected='selected'></option>");
            $("#dd_BasisOfCalc").prop("disabled", false);
        }

        if (val == 'V') {
            $('#dd_BasisOfCalc').html(_html.join(""));
            $('#dd_BasisOfCalc').prepend("<option value='' selected='selected'></option>");
            $("#dd_BasisOfCalc").prop("disabled", true);

            var _data = JSON.parse(ItemGroupObject.Unit);
            $.each(_data, function (key, value) {
                //if (value.CountryCd.replace(/[\r\n]+/gm, '') == val) {
                _html.push(
                    "<option value='" + value.RowId + "'>" + value.UomDesc.replace(/[\r\n]+/gm, '') + "</option>"
                );
                //}
            });

            $('#dd_Unit').html(_html.join(""));
            $('#dd_Unit').prepend("<option value='' selected='selected'></option>");
            $("#dd_Unit").prop("disabled", false);
        }
    },

    do_loadoverview: () => {

        var _data = {};
        _data["cocd"] = ItemGroupObject.cocd;
        _data["module"] = 'SalesTaxGroup';

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "sales-tax-group-for-items-overview.aspx/loadVendorAccountOverviewlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                ItemGroupObject.do_populateOverview(obj);
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
                { label: "SalesTaxGrpCd", name: "SalesTaxGrpCd" },
                { label: "SalesTaxGrpDesc", name: "SalesTaxGrpDesc" },
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
                { data: "SalesTaxGrpCd" },
                { data: "SalesTaxGrpDesc" },
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
                },
                {
                    add: "Component Set-up", text: 'Component Set-up', editor: editor, action: function () { doactiontaxvalue($('.selected').attr('RowId'), 'componentsetup', $('.selected').attr('code'), $('.selected').attr('descr')); },
                    attr: {
                        title: 'Component Set-up',
                        id: 'ComponentSetup'
                    },

                }

            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("code", `${data.SalesTaxGrpCd}`);
                $(row).attr("descr", `${data.SalesTaxGrpDesc}`);
            },
        });


        var table = $('#item_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!ItemGroupObject._deleteperm[0]) {
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

        if (!ItemGroupObject._createperm[0]) {
            $('#create_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#create_salestaxcomponent').prop("disabled", true);
            $('#create_salestaxcomponent').attr('title', 'do not have Add permission!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!ItemGroupObject._editperm[0]) {
            $('#edit_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#edit_salestaxcomponent').prop("disabled", true);
            $('#edit_salestaxcomponent').attr('title', 'do not have Edit permission!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!ItemGroupObject._deleteperm[0]) {
            $('#remove_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#remove_salestaxcomponent').prop("disabled", true);
            $('#remove_salestaxcomponent').attr('title', 'do not have Delete permission!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }


        if (!ItemGroupObject._ComponentSetupperm[0]) {
            $('#ComponentSetup').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#ComponentSetup').prop("disabled", true);
            $('#ComponentSetup').attr('title', 'do not have view permission!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }


    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["id"] = id;
        _data["module"] = 'SalesTaxGroup';

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "sales-tax-group-for-items-overview.aspx/doedit",
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
                                ItemGroupObject.hdnid = objnew[key][0].RowId;
                                $('#txt_SalesTaxGrpCd').val(objnew[key][0].SalesTaxGrpCd);
                                $('#txt_SalesTaxGrpCd').prop('readonly', true);
                                
                                $('#txt_SalesTaxGrpDesc').val(objnew[key][0].SalesTaxGrpDesc);

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
        MainObject.do_getuserpageaccess(ItemGroupObject);
        ItemGroupObject._vieweperm = MainObject.do_IsActionMenuPermission(ItemGroupObject.access, 'SALES TAX GROUP FOR ITEMS', 'view');
        ItemGroupObject._createperm = MainObject.do_IsActionMenuPermission(ItemGroupObject.access, 'SALES TAX GROUP FOR ITEMS', 'create');
        ItemGroupObject._editperm = MainObject.do_IsActionMenuPermission(ItemGroupObject.access, 'SALES TAX GROUP FOR ITEMS', 'edit');
        ItemGroupObject._deleteperm = MainObject.do_IsActionMenuPermission(ItemGroupObject.access, 'SALES TAX GROUP FOR ITEMS', 'delete');
        //ItemGroupObject._ComponentSetupperm = MainObject.do_IsActionMenuPermission(ItemGroupObject.access, 'Dimension', 'view');
        ItemGroupObject._ComponentSetupperm = MainObject.do_IsActionMenuPermission(ItemGroupObject.access, 'COMPONENT SET-UP', 'view');
    },

};

var showmodal = function () {
    $('.modal-title').html('Sales Tax Group for Item - New');
    ItemGroupObject.hdnid = '';
    $("#div_modal").find("*").prop('disabled', false);

    $('#txt_SalesTaxGrpCd').val('');
    $('#txt_SalesTaxGrpCd').prop('readonly', false);
   
    $('#txt_SalesTaxGrpDesc').val('');
   
    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();

    $("#myModal").modal('show');

};


var savedata = function () {
    var validate = true;

    if ($('#txt_SalesTaxGrpCd').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txt_SalesTaxGrpCd").focus();
        return false;
    }

    else {
        var _data = '{id:"' + ItemGroupObject.hdnid + '", code: "' + encodeURIComponent($("#txt_SalesTaxGrpCd").val().trim()) + '", cocd: "' + encodeURIComponent(ItemGroupObject.cocd) + '", module: "SalesTaxGroup"}';

        $.ajax({
            type: "POST",
            url: "sales-tax-group-for-items-overview.aspx/docheckcode",
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
                    $("#txt_SalesTaxGrpCd").focus();
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

        if (ItemGroupObject.hdnid == undefined || ItemGroupObject.hdnid == 'undefined') ItemGroupObject.hdnid = '';
        _data["id"] = ItemGroupObject.hdnid;
        _data["cocd"] = ItemGroupObject.cocd;
        _data["module"] = 'SalesTaxGroup';

        _data["code"] = $('#txt_SalesTaxGrpCd').val();
        _data["SaleTaxCompDesc"] = $('#txt_SalesTaxGrpDesc').val();
       
        _data["isblock"] = $("#chk_isblocked").is(':checked');

        _data["ip"] = ItemGroupObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "sales-tax-group-for-items-overview.aspx/doSave";
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
                    //window.location = "sales-tax-group-for-items-overview.aspx";
                    $("#myModal").modal('hide');
                    $("#item_table").dataTable().fnDestroy();
                    ItemGroupObject.do_loadoverview();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var doactionModal = function (mode) {
    doaction(ItemGroupObject.hdnid, mode);
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {

        ItemGroupObject.do_loaddataedit(id);
        showmodal();
        $('.modal-title').html('Sales Tax Group for Item - Edit');
        $('#txt_SalesTaxGrpDesc').focus();
    }
    else if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '", module:"SalesTaxGroup"}';

        $.ajax({
            type: "POST",
            url: "sales-tax-group-for-items-overview.aspx/docheckdelete",
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
                .custconfirm(`Are you want to delete this  Sales Tax Group Item?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + id + '", module:"SalesTaxGroup"}';

                        $.ajax({
                            type: "POST",
                            url: "sales-tax-group-for-items-overview.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    //window.location = "sales-tax-group-for-items-overview.aspx";
                                    $("#item_table").dataTable().fnDestroy();
                                    ItemGroupObject.do_loadoverview();
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
    ItemGroupObject.ip = response.ip;
};

