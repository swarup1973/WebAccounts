$(document).ready(function () {
    taxsetupObject.cocd = $("#ddlCompany").val();
    $('#dd_TaxId').on('change', function () {
        if (this.value != '') {
            var element = $(this).find('option:selected');
            var taxdesc = element.attr("taxdesc");
            var taxper = element.attr("taxper");
            var exeptper = element.attr("exeptper");
            $('#lbl_taxdescription').html(taxdesc);
            $('#lbl_taxpercent').html(taxper);
            $('#lbl_exemptionpercent').html(exeptper);
        }
        else {
            $('#lbl_taxdescription').html('');
            $('#lbl_taxpercent').html('');
            $('#lbl_exemptionpercent').html('');
        }
    });

    taxsetupObject.do_init();
    taxsetupObject.do_getUserPagepermission();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var taxsetupObject = {
    hdnid: '',
    cocd: '',
    grpid: '',
    ip: '',
    Item: [],
    Uom: [],
    menuid: '',
    _createperm: false,
    _editperm: false,
    _deleteperm: false,

    do_init: () => {
        if (queryString('id') != undefined || queryString("id") != null) {
            taxsetupObject.grpid = queryString("id");
        }
        else {
            taxsetupObject.grpid = '';
        }
     
        if (queryString('menuid') != undefined || queryString("menuid") != null) {
            taxsetupObject.menuid = queryString("menuid");
            localStorage.menu_id_premission = queryString("menuid");
        }

        taxsetupObject.do_loadTaxGroupdtls();
        taxsetupObject.do_loadlookup();
        taxsetupObject.do_loadvendoritemprice();
    },

    do_loadTaxGroupdtls: () => {
        var _data = {};
        _data["id"] = taxsetupObject.grpid;

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
                                $('#lbl_taxgroupcode').html(objnew[key][0].GrpCode);
                            }
                        }
                        else {
                            //$.alertable.
                            alert(`Tax Group not exists.`);
                            window.location = "tax-group.aspx";
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

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = taxsetupObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            async: false,
            url: "../handler/datahandler.aspx/loadTax",
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
                            taxsetupObject.Item = JSON.stringify(objnew[key]);

                            var _html = [];
                            var _data = JSON.parse(taxsetupObject.Item);
                            $.each(_data, function (key, value) {
                                _html.push(
                                    //"<option value='" + value.AcCd.replace(/[\r\n]+/gm, '') + "'>" + value.AcCd.replace(/[\r\n]+/gm, '') + ' (' + value.AcDesc.replace(/[\r\n]+/gm, '') + ")</option>"

                                     "<option TaxDesc='" + value.TaxDesc.replace(/[\r\n]+/gm, '') + "' TaxPer='" + value.TaxPer + "'  ExeptPer='" + value.ExeptPer + "' value='" + value.RowId + "'>" + value.Taxcode.replace(/[\r\n]+/gm, '') + "</option>"
                                );
                            });

                            $('#dd_TaxId').html(_html.join(""));
                            $('#dd_TaxId').prepend("<option value='' selected='selected'></option>");
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
        cntrl_cbo = $.find("select");

        $.each(cntrl_cbo, function (key, value) {
            if (value.id == 'dd_TaxId') {
                _html = [];
                var _data = JSON.parse(taxsetupObject.Item);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option TaxDesc='" + value.TaxDesc.replace(/[\r\n]+/gm, '') + "' TaxPer='" + value.TaxPer + "'  ExeptPer='" + value.ExeptPer + "' value='" + value.RowId + "'>" + value.Taxcode.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });

            }

            if (value.id == 'dd_TaxId') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='' selected='selected'></option>");
            }

        });

    },

    do_loadvendoritemprice: () => {

        var _data = {};
        /*_data["vendorcode"] = $('#txt_vendorno').val();
        _data["item"] = $('#dd_searchitem').val();
        _data["startdate"] = $('#txt_searchstartdate').val();
        _data["enddate"] = $('#txt_searchenddate').val();*/
        _data["cocd"] = taxsetupObject.cocd;
        _data["grpid"] = taxsetupObject.grpid;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "tax-setup.aspx/loadlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                $("#budget_table").dataTable().fnDestroy();

                taxsetupObject.do_populateVendorItemPrice(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

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
                { label: "Taxcode", name: "Taxcode" },
                { label: "TaxDesc", name: "TaxDesc" },
                { label: "TaxPer", name: "TaxPer" },
                { label: "ExeptPer", name: "ExeptPer" },
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
                { data: "Taxcode" },
                { data: "TaxDesc" },
                { data: "TaxPer" },
                { data: "ExeptPer" },
                { data: "IsBlock" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [50, 50, 50, 50, 50],
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'New',
                    }
                },
                //{
                //    add: "edit", text: 'Edit', editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'edit'); },
                //    attr: {
                //        title: 'Edit',
                //        id: 'edit',
                //    }
                //},

                {
                    extend: "edit", text: 'Edit',editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'edit',
                    }
            },

                {
                    extend: "remove", text: 'Delete',editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'delete',
                    }
                }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("TaxId", `${data.TaxId}`);
            },
        });
        var table = $('#budget_table').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!taxsetupObject._deleteperm[0]) {
                    $('#delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#delete').prop("disabled", true);
                    $('#delete').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!taxsetupObject._createperm[0]) {
            $('#New').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#New').prop("disabled", true);
            $('#New').attr('title', 'do not have permission to add Tax Setup!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!taxsetupObject._editperm[0]) {
            $('#edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#edit').prop("disabled", true);
            $('#edit').attr('title', 'do not have permission to Edit Tax Setup!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!taxsetupObject._deleteperm[0]) {
            $('#delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#delete').prop("disabled", true);
            $('#delete').attr('title', 'do not have delete permission!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["id"] = id;
        _data["grpid"] = taxsetupObject.grpid;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "tax-setup.aspx/doedit",
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
                                taxsetupObject.hdnid = objnew[key][0].RowId;
                                $('#dd_TaxId').val(objnew[key][0].taxid);
                                //$('#dd_TaxId').prop("disabled", true);
                                $("#dd_TaxId").change();    

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
        MainObject.do_getuserpageaccess(taxsetupObject);
        if (queryString('menuid') != undefined || queryString("menuid") != null) {
            taxsetupObject._createperm = MainObject.do_IsActionMenuPermission(taxsetupObject.access, 'Tax Setup', 'create');
            taxsetupObject._editperm = MainObject.do_IsActionMenuPermission(taxsetupObject.access, 'Tax Setup', 'edit');
            taxsetupObject._deleteperm = MainObject.do_IsActionMenuPermission(taxsetupObject.access, 'Tax Setup', 'delete');
        }
    },
};


var showmodal = function () {

    $('.modal-title').html('Tax Setup - New');
    taxsetupObject.hdnid = '';

    $('#dd_TaxId').val('');

    $('#lbl_taxdescription').html('');
    $('#lbl_taxpercent').html('');
    $('#lbl_exemptionpercent').html('');

    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();
    taxsetupObject.do_render_lookup();
    $("#myModal").modal('show');

};

var savedata = function () {
    var validate = true;
    /*
    var max = 0, min = 0;

    min = $('#txt_minqty').val();
    if ($('#txt_maxqty').val() == '' || $('#txt_maxqty').val() == '0') max = $('#txt_minqty').val() + 1;
    else max = $('#txt_maxqty').val();

    var startDate = new Date($('#txt_startdate').val());
    var endDate = new Date($('#txt_enddate').val());
    */


    if ($('#dd_TaxId').val() == '') {
        validate = false;
        $.alertable.alert(`Tax Code required.`);
        $("#dd_TaxId").focus();
        return false;
    }
    

    else {
        //  + '", cocd: "' + VendorBankAcObject.cocd + '"}';
        //var _data = '{id:"' + taxsetupObject.hdnid + '", vendorcode: "' + encodeURIComponent($("#lbl_vendorcode").html().trim()) + '", cocd: "' + encodeURIComponent(taxsetupObject.cocd) + '", startdate: "' + $('#txt_startdate').val() + '", enddate: "' + $('#txt_enddate').val() + '" , itemcode: "' + $('#dd_item').val() + '", uomcode: "' + $('#dd_uom').val() + '"}';
        var _data = '{id:"' + taxsetupObject.hdnid + '", grpid:"' + taxsetupObject.grpid + '", taxid: "' + encodeURIComponent($("#dd_TaxId").val().trim()) + '", cocd: "' + encodeURIComponent(taxsetupObject.cocd) + '"}';

        $.ajax({
            type: "POST",
            url: "tax-setup.aspx/docheckcode",
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
                                if (objnew[key][0].dataexists == '0') {
                                    validate = true;
                                }
                                else {
                                    validate = false;
                                    $.alertable.alert(
                                        objnew[key][0].errormsg
                                    );
                                    $("#txt_TaxCode").focus();
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

        if (taxsetupObject.hdnid == undefined || taxsetupObject.hdnid == 'undefined') taxsetupObject.hdnid = '';
        _data["id"] = taxsetupObject.hdnid;
        _data["cocd"] = taxsetupObject.cocd;
        _data["grpid"] = taxsetupObject.grpid;
        _data["taxid"] = $('#dd_TaxId').val();
        _data["Isblock"] = $("#chk_isblocked").is(':checked');
        _data["ip"] = taxsetupObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "tax-setup.aspx/doSave";
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
                    taxsetupObject.do_loadvendoritemprice();
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
        taxsetupObject.do_loaddataedit(id);
        $('.modal-title').html('Tax Setup - Edit');
        $('#dd_item').focus();
    }

    else if (mode == 'delete') {

        $.alertable.custconfirm(`Are you want to delete the Tax Setup ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{id:"' + id + '"}';
                    $.ajax({
                        type: "POST",
                        url: "tax-setup.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                //window.location = "bank_master_overview.aspx";
                                taxsetupObject.do_loadvendoritemprice();
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
    taxsetupObject.ip = response.ip;
};



