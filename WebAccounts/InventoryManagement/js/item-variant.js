$(document).ready(function () {
    ItemVariantObject.cocd = $('#ddlCompany').val();
    ItemVariantObject.do_loadlist();
    ItemVariantObject.do_getUserPagepermission();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var ItemVariantObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _variantvalueviewperm: false,
    _menuid: '',
    _mainmenuid: '',
    _lastmenuid: '',


    do_loadlist: () => {

        var _data = {};
        _data["cocd"] = ItemVariantObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "item-variant.aspx/loadlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                $("#journal_table").dataTable().fnDestroy();
                ItemVariantObject.do_populateList(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateList: (obj) => {
        // editor init
        table = $('#journal_table').DataTable({
            paging: false
        });

        table.destroy();

        var editor = new $.fn.dataTable.Editor({
            table: "#journal_table",
            fields: [
                { label: "VariantCd", name: "VariantCd" },
                { label: "VariantName", name: "VariantName" },
                { label: "IsBlock", name: "IsBlock" },
            ],
        });

        var roletable = $("#journal_table");
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
                { data: "VariantCd" },
                { data: "VariantName" },
                { data: "IsBlock" },
                
            ],
            select: true,
            scrollX: true,
            lengthMenu: [50, 50, 50],
            buttons: [
                {
                    add: "create", text: 'New', disabled: 'true', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'variant_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: () => doaction($('.selected').attr('RowId'), 'edit'),
                    attr: {
                        title: 'Edit',
                        id: 'variant_edit'
                    },
                },
                {
                    add: "remove", text: 'Delete', editor: editor, action: () => doaction($('.selected').attr('RowId'), 'delete'),
                    attr: {
                        title: 'Delete',
                        id: 'variant_delete'
                    },
                },

                {
                    add: "variantvalue", text: 'Variant Value', editor: editor, action: function () { doactiondimension($('.selected').attr('RowId'), 'dimension', $('.selected').attr('VariantCd'), $('.selected').attr('VariantName')) },
                    attr: {
                        title: 'Variant Value',
                        id: 'Variant_Value'
                    },
                },

            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("VariantCd", `${data.VariantCd}`);
                $(row).attr("VariantName", `${data.VariantName}`);
            },
        });


        var table = $('#journal_table').DataTable();

        if (!ItemVariantObject._createperm[0]) {
            $('#variant_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#variant_create').prop("disabled", true);
            $('#variant_create').attr('title', 'do not have permission to Add New Record!!!');

            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!ItemVariantObject._editperm[0]) {
            $('#variant_edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#variant_edit').prop("disabled", true);
            $('#variant_edit').attr('title', 'do not have permission to Edit Record!!!');

            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!ItemVariantObject._deleteperm[0]) {
            $('#variant_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#variant_delete').prop("disabled", true);
            $('#variant_delete').attr('title', 'do not have permission to Delete Record!!!');

            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!ItemVariantObject._variantvalueviewperm[0]) {
            $('#Variant_Value').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Variant_Value').prop("disabled", true);
            $('#Variant_Value').attr('title', 'do not have permission to View Variant Value!!!');

            table.button(3).action(function () {
                this.active(false);
            });
        }

        $('.dataTables_scroll').css('overflow', 'auto hidden');

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
            url: "item-variant.aspx/doedit",
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

                                ItemVariantObject.hdnid = objnew[key][0].RowId;
                                $('#txt_VariantCd').val(objnew[key][0].VariantCd);
                                $('#txt_VariantCd').prop('readonly', true);
                                $('#txt_VariantName').val(objnew[key][0].VariantName);

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
        MainObject.do_getuserpageaccess(ItemVariantObject);
        ItemVariantObject._vieweperm = MainObject.do_IsActionMenuPermission(ItemVariantObject.access, 'ITEM VARIANT', 'view');
        ItemVariantObject._createperm = MainObject.do_IsActionMenuPermission(ItemVariantObject.access, 'ITEM VARIANT', 'create');
        ItemVariantObject._editperm = MainObject.do_IsActionMenuPermission(ItemVariantObject.access, 'ITEM VARIANT', 'edit');
        ItemVariantObject._deleteperm = MainObject.do_IsActionMenuPermission(ItemVariantObject.access, 'ITEM VARIANT', 'delete');

        ItemVariantObject._mainmenuid = MainObject.do_IsActionMenuPermission(ItemVariantObject.access, 'ITEM VARIANT', 'menuid');
        ItemVariantObject._variantvalueviewperm = MainObject.do_IsActionMenuPermission(ItemVariantObject.access, 'VARIANT VALUE', 'view');
        ItemVariantObject._menuid = MainObject.do_IsActionMenuPermission(ItemVariantObject.access, 'ITEM VARIANT', 'menuid');
    },

};

var showmodal = function () {
    $('.modal-title').html('Item Variant - New');

    ItemVariantObject.hdnid = '';
    $("#div_modal").find("*").prop('disabled', false);

    //$('#btnEdit').hide();
    //$('#btnDelete').hide();
    $('#btn_save').show();

    $('#txt_VariantCd').val('');
    $('#txt_VariantCd').prop('readonly', false);
    $('#txt_VariantName').val('');
   
    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();
    $("#myModal").modal('show');

};

var savedata = function () {
    var validate = true;

    if ($('#txt_VariantCd').val() == '') {
        validate = false;
        $.alertable.alert(`Variant Code required.`);
        $("#txt_VariantCd").focus();
        return false;
    }
    else if ($('#txt_VariantName').val() == '') {
        validate = false;
        $.alertable.alert(`Variant Name required.`);
        $("#txt_VariantName").focus();
        return false;
    }
    

    else {
        var _data = '{id:"' + ItemVariantObject.hdnid + '", code: "' + encodeURIComponent($("#txt_VariantCd").val().trim()) + '", cocd: "' + encodeURIComponent(ItemVariantObject.cocd) + '"}';

        $.ajax({
            type: "POST",
            url: "item-variant.aspx/docheckcode",
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
                    $("#txt_VariantCd").focus();
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

        if (ItemVariantObject.hdnid == undefined || ItemVariantObject.hdnid == 'undefined') ItemVariantObject.hdnid = '';
        _data["id"] = ItemVariantObject.hdnid;
        _data["cocd"] = ItemVariantObject.cocd;

        _data["code"] = $('#txt_VariantCd').val();
        _data["variantname"] = $('#txt_VariantName').val();
       
        _data["isblocked"] = $("#chk_isblocked").is(':checked');

        _data["ip"] = ItemVariantObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "item-variant.aspx/doSave";
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
                    //window.location = "item-variant.aspx";
                    $("#myModal").modal('hide');
                    ItemVariantObject.do_loadlist();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var doactionModal = function (mode) {
    doaction(ItemVariantObject.hdnid, mode);
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {
        showmodal();
        ItemVariantObject.do_loaddataedit(id);
        $('.modal-title').html('Item Variant - Edit');
        $('#txt_VariantName').focus();
    }
    else if (mode == 'view') {

        ItemVariantObject.do_loaddataedit(id);
        showmodal();
        $('.modal-title').html('Item Variant - View');

        if (ItemVariantObject._editperm) {
            $('#btnEdit').show();
        }
        if (ItemVariantObject._deleteperm) {
            $('#btnDelete').show();
        }

        $('#btn_save').hide();
        $("#div_modal").find("*").prop('disabled', true);
        //$('#txt_VendName').focus();
    }
    else if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '"}';

        $.ajax({
            type: "POST",
            url: "item-variant.aspx/docheckdelete",
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
                .custconfirm(`Are you want to delete this  Item Variant?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + id + '"}';

                        $.ajax({
                            type: "POST",
                            url: "item-variant.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    $("#myModal").modal('hide');
                                    ItemVariantObject.do_loadlist();
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

    else if (mode == 'dimension') {
        localStorage.BankAccount_dimension_BankName = bankName;
        localStorage.BankAccount_dimension_AcNumber = acNumber

        window.location = "vendor-dimension.aspx?id=" + id;
    }

};

var doactiondimension = function (id, mode, code, name) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'dimension') {
        localStorage.varname = name;
        localStorage.varcd = code;

        window.location = "variant-value.aspx?id=" + id + "&menuid=" + ItemVariantObject._menuid[1];
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
    ItemVariantObject.ip = response.ip;
};

var OnchangeIsWitholdingTaxApp = function () {
    if ($("#chk_IsWitholdingTaxApp").is(':checked')) {
        $("#dd_WHTaxGrpCd").prop("disabled", false);
    }
    else {
        $("#dd_WHTaxGrpCd").prop("disabled", true);
        $("#dd_WHTaxGrpCd").val('');
    }
};


