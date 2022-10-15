$(document).ready(function () {
    if (localStorage._taxcodemenuid == '' || localStorage._taxcodemenuid == undefined) {
        localStorage._taxcodemenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._taxcodemenuid;
    }

    taxcodeObject.cocd = $("#ddlCompany").val();
    taxcodeObject.do_init();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var taxcodeObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    Item: [],
    Uom: [],
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _taxvalues: false,
    _taxvaluesmenuid: '',
    _taxcodemenuid: '',

    do_init: () => {
        /*
        if (localStorage.vendor_dimension_Name != undefined && localStorage.vendor_dimension_Code != "undefined") {
            BankAccount.acNumber = localStorage.vendor_dimension_Code;
            BankAccount.bankName = localStorage.vendor_dimension_Name;
        }
        else {
            BankAccount.bankName = '';
            BankAccount.acNumber = '';
        }

        if (queryString('id') != undefined || queryString("id") != null) {
            taxcodeObject.vendorid = queryString("id");
            taxcodeObject.vendorcode = BankAccount.acNumber;
            $('#txt_vendorno').prop('readonly', true);
        }
        else {
            $('#txt_vendorno').prop('readonly', false);
        }

        //$('#bankName').text(BankAccount.bankName);
        $('#txt_vendorno').val(BankAccount.acNumber);
        $('#lbl_vendorcode').html($('#txt_vendorno').val());
        $('#lbl_vendorname').html(BankAccount.bankName);
        */
        //taxcodeObject.do_getvendordetails();
        taxcodeObject.do_loadlookup();
        taxcodeObject.do_getUserPagepermission();
        taxcodeObject.do_loadvendoritemprice();
    },

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = taxcodeObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            async: false,
            url: "../handler/datahandler.aspx/loadAccount",
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
                            taxcodeObject.Item = JSON.stringify(objnew[key]);

                            var _html = [];
                            var _data = JSON.parse(taxcodeObject.Item);
                            $.each(_data, function (key, value) {
                                _html.push(
                                    "<option value='" + value.AcCd.replace(/[\r\n]+/gm, '') + "'>" + value.AcCd.replace(/[\r\n]+/gm, '') + ' (' + value.AcDesc.replace(/[\r\n]+/gm, '') + ")</option>"
                                );
                            });

                            $('#dd_AcCd_TaxLiability').html(_html.join(""));
                            $('#dd_AcCd_TaxLiability').prepend("<option value='' selected='selected'></option>");
                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(taxcodeObject);
        taxcodeObject._createperm = MainObject.do_IsActionMenuPermission(taxcodeObject.access, 'Tax Code', 'create');
        taxcodeObject._editperm = MainObject.do_IsActionMenuPermission(taxcodeObject.access, 'Tax Code', 'edit');
        taxcodeObject._deleteperm = MainObject.do_IsActionMenuPermission(taxcodeObject.access, 'Tax Code', 'delete');
        taxcodeObject._taxvalues = MainObject.do_IsActionMenuPermission(taxcodeObject.access, 'Tax Values', 'view');

        taxcodeObject._taxvaluesmenuid = MainObject.do_IsActionMenuPermission(taxcodeObject.access, 'TAX VALUES', 'menuid');
        
    },

    do_render_lookup: () => {
        var _html = [];
        var cntrl_cbo = [];
        cntrl_cbo = $.find("select");

        $.each(cntrl_cbo, function (key, value) {
            if (value.id == 'dd_AcCd_TaxLiability') {
                _html = [];
                var _data = JSON.parse(taxcodeObject.Item);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.AcCd.replace(/[\r\n]+/gm, '') + "'>" + value.AcCd.replace(/[\r\n]+/gm, '') + ' (' + value.AcDesc.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }

            if (value.id == 'dd_AcCd_TaxLiability') {
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
        _data["cocd"] = taxcodeObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "tax-code.aspx/loadlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                $("#budget_table").dataTable().fnDestroy();

                taxcodeObject.do_populateVendorItemPrice(obj);
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
                { label: "TaxCode", name: "TaxCode" },
                { label: "TaxDesc", name: "TaxDesc" },
                { label: "AcDesc", name: "AcDesc" },
                { label: "BasisOfCalc_txt", name: "BasisOfCalc_txt" },
                { label: "ROff", name: "ROff" },
                { label: "RType", name: "RType" },
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
                { data: "TaxCode" },
                { data: "TaxDesc" },
                { data: "AcDesc" },
                { data: "BasisOfCalc_txt" },
                { data: "ROff" },
                { data: "RType" },
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
                        id: 'Create_taxcode'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'Edit_taxcode'
                    },
                },
                {
                    extend: "remove", editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'Remove',
                        id: 'Remove_taxcode'
                    },

                },
                {
                    add: "taxvalues", text: 'Tax Values', editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'taxvalues'); },
                    attr: {
                        title: 'Tax Values',
                        id: 'txt_values',
                        value: taxcodeObject._taxvaluesmenuid[1]
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
                if (!taxcodeObject._deleteperm[0]) {
                    $('#Remove_taxcode').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#Remove_taxcode').prop("disabled", true);
                    $('#Remove_taxcode').attr('title', 'do not have remove permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }
        });
        if (!taxcodeObject._createperm[0]) {
            $('#Create_taxcode').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Create_taxcode').prop("disabled", true);
            $('#Create_taxcode').attr('title', 'do not have permission to create new tax code!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!taxcodeObject._editperm[0]) {
            $('#Edit_taxcode').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Edit_taxcode').prop("disabled", true);
            $('#Edit_taxcode').attr('title', 'do not have permission to edit tax code!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!taxcodeObject._deleteperm[0]) {
            $('#Remove_taxcode').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Remove_taxcode').prop("disabled", true);
            $('#Remove_taxcode').attr('title', 'do not have permission to delete tax code!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!taxcodeObject._taxvalues[0]) {
            $('#txt_values').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#txt_values').prop("disabled", true);
            $('#txt_values').attr('title', 'do not have permission to view tax values!!!');
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
                                taxcodeObject.hdnid = objnew[key][0].RowId;
                                $('#txt_TaxCode').val(objnew[key][0].TaxCode);
                                $('#txt_TaxCode').prop("disabled", true);
                                $('#txt_TaxDesc').val(objnew[key][0].TaxDesc);
                                $('#dd_AcCd_TaxLiability').val(objnew[key][0].AcCd_TaxLiability);
                                $('#dd_BasisOfCalc').val(objnew[key][0].BasisOfCalc);
                                $('#txt_ROff').val(objnew[key][0].ROff);
                                $('#dd_RType').val(objnew[key][0].RType);
                               
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

    $('.modal-title').html('Tax Codes - New');
    taxcodeObject.hdnid = '';

    //$('#dd_item').val('');
    //$('#dd_item').prop("disabled", false);
    $('#txt_TaxCode').val('');
    $('#txt_TaxCode').prop("disabled", false);
    $('#txt_TaxDesc').val('');
    $('#dd_AcCd_TaxLiability').val('');
    $('#dd_BasisOfCalc').val('');
    $('#txt_ROff').val('');
    $('#dd_RType').val('');
    //$('#txt_startdate').val('');
    //$('#txt_enddate').val('');
    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();
    taxcodeObject.do_render_lookup();
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


    if ($('#txt_TaxCode').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txt_TaxCode").focus();
        return false;
    }
    else if ($('#dd_AcCd_TaxLiability').val() == '') {
        validate = false;
        $.alertable.alert(`Ledger (Tax Liability) required.`);
        $("#dd_AcCd_TaxLiability").focus();
        return false;
    }
    else if ($('#dd_BasisOfCalc').val() == '') {
        validate = false;
        $.alertable.alert(`Basis of Calculation required.`);
        $("#dd_BasisOfCalc").focus();
        return false;
    }
    /*
    else if ($.trim($('#txt_startdate').val()) == '') {
        validate = false;
        $.alertable.alert(`Starting Date required.`);
        $("#txt_startdate").focus();
        return false;
    }

    else if ($.trim($('#txt_enddate').val()) != '') {
        if (endDate < startDate) {
            validate = false;
            $.alertable.alert(`End Date Should Greater Then Start Date.`);
            $("#txt_enddate").focus();
            return false;
        }
    }*/

    else {
        //  + '", cocd: "' + VendorBankAcObject.cocd + '"}';
        //var _data = '{id:"' + taxcodeObject.hdnid + '", vendorcode: "' + encodeURIComponent($("#lbl_vendorcode").html().trim()) + '", cocd: "' + encodeURIComponent(taxcodeObject.cocd) + '", startdate: "' + $('#txt_startdate').val() + '", enddate: "' + $('#txt_enddate').val() + '" , itemcode: "' + $('#dd_item').val() + '", uomcode: "' + $('#dd_uom').val() + '"}';
        var _data = '{id:"' + taxcodeObject.hdnid + '", taxcode: "' + encodeURIComponent($("#txt_TaxCode").val().trim()) + '", cocd: "' + encodeURIComponent(taxcodeObject.cocd) + '"}';

        $.ajax({
            type: "POST",
            url: "tax-code.aspx/docheckcode",
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

        if (taxcodeObject.hdnid == undefined || taxcodeObject.hdnid == 'undefined') taxcodeObject.hdnid = '';
        _data["id"] = taxcodeObject.hdnid;
        _data["cocd"] = taxcodeObject.cocd;

        _data["TaxCode"] = $('#txt_TaxCode').val();
        _data["TaxDesc"] = $('#txt_TaxDesc').val();
        _data["AcCd_TaxLiability"] = $('#dd_AcCd_TaxLiability').val();
        _data["BasisOfCalc"] = $('#dd_BasisOfCalc').val();
        _data["ROff"] = $('#txt_ROff').val();
        _data["RType"] = $('#dd_RType').val();
       
        //_data["startdate"] = $('#txt_startdate').val();
        //_data["enddate"] = $('#txt_enddate').val();
        _data["Isblock"] = $("#chk_isblocked").is(':checked');
        _data["ip"] = taxcodeObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "tax-code.aspx/doSave";
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
                    taxcodeObject.do_loadvendoritemprice();
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
        taxcodeObject.do_loaddataedit(id);
        $('.modal-title').html('Tax Codes - Edit');
        $('#dd_item').focus();
    }

    else if (mode == 'delete') {

        $.alertable.custconfirm(`Are you want to delete the Tax Code ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{id:"' + id + '"}';
                    $.ajax({
                        type: "POST",
                        url: "tax-code.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                //window.location = "bank_master_overview.aspx";
                                taxcodeObject.do_loadvendoritemprice();
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

    else if (mode == 'taxvalues') {
       // window.location = "tax-values.aspx?id=" + id;
        window.location = "tax-values.aspx?id=" + id + "&menuid=" + taxcodeObject._taxvaluesmenuid[1];

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
    taxcodeObject.ip = response.ip;
};



