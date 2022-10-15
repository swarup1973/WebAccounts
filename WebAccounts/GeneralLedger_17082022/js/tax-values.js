$(document).ready(function () {
    if (localStorage._taxvaluesmenuid == '' || localStorage._taxvaluesmenuid == undefined) {
        localStorage._taxvaluesmenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._taxvaluesmenuid;
    }

    taxvaluesObject.cocd = $("#ddlCompany").val();
    taxvaluesObject.do_init();
    taxvaluesObject.do_getUserPagepermission();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var taxvaluesObject = {
    hdnid: '',
    taxid: '',
    taxcode:'',
    cocd: '',
    ip: '',
    menuid: '',
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _taxvaluesmenuid: false,

    do_init: () => {
        if (queryString('id') != undefined || queryString("id") != null ) {
            taxvaluesObject.taxid = queryString("id");
        }
        else
        {
            taxvaluesObject.taxid = '';
        }

        if (queryString('menuid') != undefined || queryString("menuid") != null) {
           taxvaluesObject.menuid = queryString("menuid");
            localStorage.menu_id_premission = queryString("menuid");
        }

        taxvaluesObject.do_loadTaxcodedtls();
        taxvaluesObject.do_loadvendoritemprice();
    },

    do_loadTaxcodedtls: () => {
        var _data = {};
        _data["id"] = taxvaluesObject.taxid;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "tax-code.aspx/doedit",
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
                                taxvaluesObject.taxcode = objnew[key][0].TaxCode;
                                $('#lbl_taxcode').html(objnew[key][0].TaxCode);
                            }
                            else {
                                //$.alertable.
                                alert(`Tax Code not exists.`);
                                window.location = "tax-code.aspx";
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

    do_loadvendoritemprice: () => {

        var _data = {};
        /*_data["vendorcode"] = $('#txt_vendorno').val();
        _data["item"] = $('#dd_searchitem').val();
        _data["startdate"] = $('#txt_searchstartdate').val();*/
        _data["taxid"] = taxvaluesObject.taxid;
        _data["cocd"] = taxvaluesObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "tax-values.aspx/loadlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                $("#budget_register_table").dataTable().fnDestroy();

                taxvaluesObject.do_populateVendorItemPrice(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateVendorItemPrice: (obj) => {
        // editor init

        table = $('#budget_register_table').DataTable({
            paging: false
        });

        table.destroy();

        var editor = new $.fn.dataTable.Editor({
            table: "#budget_register_table",
            fields: [
                { label: "FromDt", name: "FromDt" },
                { label: "ToDt", name: "ToDt" },
                { label: "MinBaseAmt", name: "MinBaseAmt" },
                { label: "MaxBaseAmt", name: "MaxBaseAmt" },
                { label: "TaxPer", name: "TaxPer" },
                { label: "ExeptPer", name: "ExeptPer" },
                { label: "IsBlock", name: "IsBlock" },
            ],
        });

        var roletable = $("#budget_register_table");
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
                { data: "FromDt" },
                { data: "ToDt" },
                { data: "MinBaseAmt" },
                { data: "MaxBaseAmt" },
                { data: "TaxPer" },
                { data: "ExeptPer" },
                { data: "IsBlock" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 50, 50, 50, 50, 50, 50],
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'Create_taxvalue'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: () => doaction($('.selected').attr('RowId'), 'edit'),
                    attr: {
                        title: 'Edit',
                        id: 'Edit_taxvalue'
                    },
                },
                {
                    add: "edit", text: 'Delete', editor: editor, action: () => doaction($('.selected').attr('RowId'), 'delete'),
                    attr: {
                        title: 'Remove',
                        id: 'Remove_taxvalue'
                    },

                }
                
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
            },
        });

        var table = $('#budget_register_table').DataTable();

        if (!taxvaluesObject._createperm[0]) {
            $('#Create_taxvalue').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Create_taxvalue').prop("disabled", true);
            $('#Create_taxvalue').attr('title', 'do not have permission to Add New Record!!!');

            table.button(0).action(function () {
                this.active(false);
            });
        }

        if (!taxvaluesObject._editperm[0]) {
            $('#Edit_taxvalue').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Edit_taxvalue').prop("disabled", true);
            $('#Edit_taxvalue').attr('title', 'do not have permission to Edit Tax code!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }

        if (!taxvaluesObject._deleteperm[0]) {
            $('#Remove_taxvalue').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Remove_taxvalue').prop("disabled", true);
            $('#Remove_taxvalue').attr('title', 'do not have permission to Delete Record!!!');

            table.button(2).action(function () {
                this.active(false);
                //this.disable();
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
            url: "tax-values.aspx/doedit",
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
                            
                                taxvaluesObject.hdnid = objnew[key][0].RowId;
                                $('#txt_FromDt').val(objnew[key][0].FromDt);
                                $('#txt_ToDt').val(objnew[key][0].ToDt);
                                $('#txt_MinBaseAmt').val(objnew[key][0].MinBaseAmt);
                                $('#txt_MaxBaseAmt').val(objnew[key][0].MaxBaseAmt);
                                $('#txt_TaxPer').val(objnew[key][0].TaxPer);
                                $('#txt_ExeptPer').val(objnew[key][0].ExeptPer);

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
        MainObject.do_getuserpageaccess(taxvaluesObject);
        if (queryString('menuid') != undefined || queryString("menuid") != null)
        {
            taxvaluesObject._createperm = MainObject.do_IsActionMenuPermission(taxvaluesObject.access, 'TAX VALUES', 'create');
            taxvaluesObject._editperm = MainObject.do_IsActionMenuPermission(taxvaluesObject.access, 'TAX VALUES', 'edit');
            taxvaluesObject._deleteperm = MainObject.do_IsActionMenuPermission(taxvaluesObject.access, 'TAX VALUES', 'delete');
        }
    },

};

var showmodal = function () {

    $('.modal-title').html('Tax Values - New');
    taxvaluesObject.hdnid = '';

    $('#txt_FromDt').val('');
    $('#txt_ToDt').val('');
    $('#txt_MinBaseAmt').val('');
    $('#txt_MaxBaseAmt').val('');
    $('#txt_TaxPer').val('');
    $('#txt_ExeptPer').val('');
    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();
    $("#myModal").modal('show');

};

var savedata = function () {
    var validate = true;
    /*
    var max = 0, min = 0;

    min = $('#txt_MinBaseAmt').val();
    if ($('#txt_MaxBaseAmt').val() == '' || $('#txt_MaxBaseAmt').val() == '0') max = $('#txt_MinBaseAmt').val() + 1;
    else max = $('#txt_MaxBaseAmt').val();*/

    var startDate = new Date($('#txt_FromDt').val());
    var endDate = new Date($('#txt_ToDt').val());
    
    if ($.trim($('#txt_FromDt').val()) == '') {
        validate = false;
        $.alertable.alert(`From Date required.`);
        $("#txt_FromDt").focus();
        return false;
    }
    else if ($.trim($('#txt_ToDt').val()) == '') {
        validate = false;
        $.alertable.alert(`To Date required.`);
        $("#txt_ToDt").focus();
        return false;
    }

    else if (endDate < startDate) {
        validate = false;
        $.alertable.alert(`To Date Should Greater Then From Date.`);
        $("#txt_ToDt").focus();
        return false;
     }

    else if ($('#txt_TaxPer').val() == '') {
        validate = false;
        $.alertable.alert(`Tax Percent  required.`);
        $("#txt_TaxPer").focus();
        return false;
    }


    /*
    else if ($('#txt_minqty').val() == '0' || $('#txt_minqty').val() == '0.00') {
        validate = false;
        $.alertable.alert(`Minimum Qty. should be greater then 0.`);
        $("#txt_minqty").focus();
        return false;
    }
    else if (max < min && (max != 0 && max != 0.00)) {
        validate = false;
        $.alertable.alert(`Maximum Qty. Cannot Be Less Then  Minimum Qty..`);
        $("#txt_maxqty").focus();
        return false;
    }*/
    
    else {
        var _data = '{id:"' + taxvaluesObject.hdnid + '", taxid: "' + encodeURIComponent(taxvaluesObject.taxid) + '", fromdate: "' + $('#txt_FromDt').val() + '", todate: "' + $('#txt_ToDt').val() + '"}';

        $.ajax({
            type: "POST",
            url: "tax-values.aspx/docheck",
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

        if (taxvaluesObject.hdnid == undefined || taxvaluesObject.hdnid == 'undefined') taxvaluesObject.hdnid = '';
        _data["id"] = taxvaluesObject.hdnid;
        _data["taxid"] = taxvaluesObject.taxid;
        _data["fromdate"] = $('#txt_FromDt').val();
        _data["todate"] = $('#txt_ToDt').val();
        _data["MinBaseAmt"] = $('#txt_MinBaseAmt').val();
        _data["MaxBaseAmt"] = $('#txt_MaxBaseAmt').val();
        _data["TaxPer"] = $('#txt_TaxPer').val();
        _data["ExeptPer"] = $('#txt_ExeptPer').val();
        _data["Isblock"] = $("#chk_isblocked").is(':checked');
        _data["ip"] = taxvaluesObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "tax-values.aspx/doSave";
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
                    taxvaluesObject.do_loadvendoritemprice();
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
        taxvaluesObject.do_loaddataedit(id);
        $('.modal-title').html('Tax Values - Edit');
        $('#dd_item').focus();
    }

    else if (mode == 'delete') {

        $.alertable.custconfirm(`Are you want to delete the Tax Value ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{id:"' + id + '"}';
                    $.ajax({
                        type: "POST",
                        url: "tax-values.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                //window.location = "bank_master_overview.aspx";
                                taxvaluesObject.do_loadvendoritemprice();
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
    taxvaluesObject.ip = response.ip;
};



