$(document).ready(function () {
    if (localStorage._taxgrouppagemenuid == '' || localStorage._taxgrouppagemenuid == undefined) {
        localStorage._taxgrouppagemenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._taxgrouppagemenuid;
    }

    taxgroupObject.cocd = $("#ddlCompany").val();
    taxgroupObject.do_init();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var taxgroupObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _taxsetup: false,
    _taxsetupmenuid: '',
    _taxgrouppagemenuid: '',

    do_init: () => {
       
        taxgroupObject.do_loadvendoritemprice();
        taxgroupObject.do_getUserPagepermission();
    },


    do_loadvendoritemprice: () => {

        var _data = {};
        _data["cocd"] = taxgroupObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "tax-group.aspx/loadlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                $("#budget_table").dataTable().fnDestroy();

                taxgroupObject.do_populateVendorItemPrice(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(taxgroupObject);
        taxgroupObject._createperm = MainObject.do_IsActionMenuPermission(taxgroupObject.access, 'Tax Group', 'create');
        taxgroupObject._editperm = MainObject.do_IsActionMenuPermission(taxgroupObject.access, 'Tax Group', 'edit');
        taxgroupObject._deleteperm = MainObject.do_IsActionMenuPermission(taxgroupObject.access, 'Tax Group', 'delete');
        taxgroupObject._taxsetup = MainObject.do_IsActionMenuPermission(taxgroupObject.access, 'Tax Setup', 'view');
        taxgroupObject._taxsetupmenuid = MainObject.do_IsActionMenuPermission(taxgroupObject.access, 'Tax Setup', 'menuid');
    },


    do_populateVendorItemPrice: (obj) => {
        // editor init

        table = $('#budget_table').DataTable({
            paging: false
        });

        table.destroy();

        var editor = new $.fn.dataTable.Editor({
            table: "#budget_table",
            fields: [
                { label: "GrpCode", name: "GrpCode" },
                { label: "GrpDesc", name: "GrpDesc" },
                { label: "IsBlock", name: "IsBlock" },
            ],
        });

        var roletable = $("#budget_table");
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
                { data: "GrpCode" },
                { data: "GrpDesc" },
                { data: "IsBlock" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [50, 50, 50],
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'Create_taxgroup'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'Edit_taxgroup'
                    },
                },
                {
                    extend: "remove", editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'delete'); },
                     attr: {
                        title: 'Remove',
                         id: 'Remove_taxgroup'
                    },
                },
                {
                    add: "taxsetup", text: 'Tax Setup', editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'taxsetup'); },
                    attr: {
                        title: 'Tax Values',
                        id: 'tax_setup',
                        value:taxgroupObject._taxsetupmenuid[1]
                    },
                }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
            },
        });

        var table = $('#budget_table').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!taxgroupObject._deleteperm[0]) {
                    $('#Remove_taxgroup').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#Remove_taxgroup').prop("disabled", true);
                    $('#Remove_taxgroup').attr('title', 'do not have remove permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }
        });
        if (!taxgroupObject._createperm[0]) {
            $('#Create_taxgroup').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Create_taxgroup').prop("disabled", true);
            $('#Create_taxgroup').attr('title', 'do not have permission to create new tax group!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!taxgroupObject._editperm[0]) {
            $('#Edit_taxgroup').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Edit_taxgroup').prop("disabled", true);
            $('#Edit_taxgroup').attr('title', 'do not have permission to edit tax group!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!taxgroupObject._deleteperm[0]) {
            $('#Remove_taxgroup').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Remove_taxgroup').prop("disabled", true);
            $('#Remove_taxgroup').attr('title', 'do not have permission to delete tax group!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!taxgroupObject._taxsetup[0]) {
            $('#tax_setup').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#tax_setup').prop("disabled", true);
            $('#tax_setup').attr('title', 'do not have permission to view tax setup!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
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
            url: "tax-group.aspx/doedit",
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
                                taxgroupObject.hdnid = objnew[key][0].RowId;
                                $('#txt_GrpCode').val(objnew[key][0].GrpCode);
                                $('#txt_GrpCode').prop("disabled", true);
                                $('#txt_GrpDesc').val(objnew[key][0].GrpDesc);
                              
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

};

var showmodal = function () {

    $('.modal-title').html('Tax Group - New');
    taxgroupObject.hdnid = '';
    $('#txt_GrpCode').val('');
    $('#txt_GrpCode').prop("disabled", false);
    $('#txt_GrpDesc').val('');
    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();
    $("#myModal").modal('show');

};

var savedata = function () {
    var validate = true;

    if ($('#txt_GrpCode').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txt_GrpCode").focus();
        return false;
    }
   

    else {
        var _data = '{id:"' + taxgroupObject.hdnid + '", taxcode: "' + encodeURIComponent($("#txt_GrpCode").val().trim()) + '", cocd: "' + encodeURIComponent(taxgroupObject.cocd) + '"}';

        $.ajax({
            type: "POST",
            url: "tax-group.aspx/docheckcode",
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
                        if (attrName.toLowerCase() == "table") {
                            if (objnew[key].length > 0) {
                                if (objnew[key][0].exist == '0') {
                                    validate = true;
                                }
                                else {
                                    validate = false;
                                    $.alertable.alert(
                                        objnew[key][0].errormsg
                                    );
                                    $("#txt_GrpCode").focus();
                                    validate = false;
                                    return false;
                                }
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


    var _data = {};
    if (validate == true) {

        if (taxgroupObject.hdnid == undefined || taxgroupObject.hdnid == 'undefined') taxgroupObject.hdnid = '';
        _data["id"] = taxgroupObject.hdnid;
        _data["cocd"] = taxgroupObject.cocd;

        _data["TaxCode"] = $('#txt_GrpCode').val();
        _data["TaxDesc"] = $('#txt_GrpDesc').val();
        
        _data["Isblock"] = $("#chk_isblocked").is(':checked');
        _data["ip"] = taxgroupObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "tax-group.aspx/doSave";
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
                    //window.location = "item-customer-discount.aspx";
                    $("#myModal").modal('hide');
                    taxgroupObject.do_loadvendoritemprice();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {
        showmodal();
        taxgroupObject.do_loaddataedit(id);
        $('.modal-title').html('Tax Group - Edit');
        $('#dd_item').focus();
    }

    else if (mode == 'delete') {

        $.alertable.custconfirm(`Are you want to delete the Tax Group ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{id:"' + id + '"}';
                    $.ajax({
                        type: "POST",
                        url: "tax-group.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                //window.location = "bank_master_overview.aspx";
                                taxgroupObject.do_loadvendoritemprice();
                            }
                            else if (result.d.toLowerCase() == "true") {
                                $.alertable.alert(
                                    `Unable to delete.`
                                );
                            }
                        },
                        failure: function (response) {
                            validate = false;
                            $.alertable.alert(`Problem in retreiving items...`);
                        },
                    });

                },
            );
    }

    else if (mode == 'taxsetup') {
      //  window.location = "tax-setup.aspx?id=" + id;
        window.location = "tax-setup.aspx?id=" + id + "&menuid=" + taxgroupObject._taxsetupmenuid[1];
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
    taxgroupObject.ip = response.ip;
};



