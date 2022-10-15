$(document).ready(function () {
    TaxAuthObject.cocd = $('#ddlCompany').val();
    /*if (localStorage._vendoracpagemenuid == '' || localStorage._vendoracpagemenuid == undefined) {
        localStorage._vendoracpagemenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._vendoracpagemenuid;
    }*/

    $("#txt_EMail").blur(function () {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (this.value.length > 250) {
            $.alertable.alert(`Email lenght not greather than 100`);
            this.value = "";
        }
        else if (!emailReg.test($("#txt_EMail").val())) {
            $.alertable.alert(`Enter valid email id`);
            this.value = "";
        }
    });

    $("#txt_Website").blur(function () {
        var urlregex = new RegExp("^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
        if (this.value.length > 250) {
            $.alertable.alert(`Website lenght not greather than 250`);
            this.value = "";
        }
        else if (!urlregex.test($("#txt_Website").val())) {
            $.alertable.alert(`Enter valid Website url`);
            this.value = "";
        }
        return;
    });

    TaxAuthObject.do_getUserPagepermission();
    TaxAuthObject.do_loadoverview();
    TaxAuthObject.do_loadlookup();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var TaxAuthObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _Receivables_Customer:[],

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = TaxAuthObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            async: false,
            url: "tax-authorities-overview.aspx/loadlookupdata",
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
                            TaxAuthObject._Receivables_Customer = JSON.stringify(objnew[key]);
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
        cntrl_cbo = $("#myModal").find("select");

        $.each(cntrl_cbo, function (key, value) {
            if (value.id == 'dd_TaxAuthCode') {
                _html = [];
                if (TaxAuthObject._Receivables_Customer != '[]') {
                    var _data = JSON.parse(TaxAuthObject._Receivables_Customer);
                    $.each(_data, function (key, value) {
                        _html.push(
                            //"<option value='" + value.GrpCd.replace(/[\r\n]+/gm, '') + "'>" + value.GrpCd.replace(/[\r\n]+/gm, '') + " (" + value.GrpName.replace(/[\r\n]+/gm, '') + ")</option>"
                            "<option value='" + value.RowId + "' CustCd='" + value.CustCd.replace(/[\r\n]+/gm, '') + "' CustName='" + value.CustName.replace(/[\r\n]+/gm, '') + "'>" + value.CustName.replace(/[\r\n]+/gm, '') + " (" + value.CustCd.replace(/[\r\n]+/gm, '') + ")</option>"
                        );
                    });
                }
            }


            //if (value.id != 'dd_StateCd' && value.id != 'dd_EntityType' && value.id != 'dd_Block' && value.id != 'dd_VendBankId') {
            if (value.id == 'dd_TaxAuthCode') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='0' selected='selected'></option>");
            }
        });

    },

    do_changeTaxAuthCode: () => {
        if ($('#dd_TaxAuthCode').val() != '0') {
            var element = $('#dd_TaxAuthCode').find('option:selected');
            var name = element.attr("CustName");
            
            $('#txt_TaxAuthName').val(name);
        }
        else {
            $('#txt_TaxAuthName').val('');
        }
    },

    do_loadoverview: () => {

        var _data = {};
        _data["cocd"] = TaxAuthObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "tax-authorities-overview.aspx/loadVendorAccountOverviewlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                TaxAuthObject.do_populateOverview(obj);
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
                { label: "AuthCd", name: "AuthCd" },
                { label: "AuthDesc", name: "AuthDesc" },
                { label: "CustCd", name: "CustCd" },
                { label: "CustName", name: "CustName" },
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
                { data: "AuthCd" },
                { data: "AuthDesc" },
                { data: "CustCd" },
                { data: "CustName" },
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
                }

            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("code", `${data.AuthCd}`);
                $(row).attr("descr", `${data.AuthDesc}`);
            },
        });


        var table = $('#item_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!TaxAuthObject._deleteperm[0]) {
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

        if (!TaxAuthObject._createperm[0]) {
            $('#create_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#create_salestaxcomponent').prop("disabled", true);
            $('#create_salestaxcomponent').attr('title', 'do not have Add permission!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!TaxAuthObject._editperm[0]) {
            $('#edit_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#edit_salestaxcomponent').prop("disabled", true);
            $('#edit_salestaxcomponent').attr('title', 'do not have Edit permission!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!TaxAuthObject._deleteperm[0]) {
            $('#remove_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#remove_salestaxcomponent').prop("disabled", true);
            $('#remove_salestaxcomponent').attr('title', 'do not have Delete permission!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
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
            url: "tax-authorities-overview.aspx/doedit",
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
                                TaxAuthObject.hdnid = objnew[key][0].RowId;
                                $('#txt_AuthCd').val(objnew[key][0].AuthCd);
                                $('#txt_AuthCd').prop('readonly', true);

                                $('#txt_AuthDesc').val(objnew[key][0].AuthDesc);

                                $('#txt_Address').val(objnew[key][0].Address);
                                $('#txt_Extension').val(objnew[key][0].Extension);
                                $('#dd_TaxAuthCode').val(objnew[key][0].TaxAuthCode);
                                TaxAuthObject.do_changeTaxAuthCode();
                                //$('#txt_TaxAuthName').val(objnew[key][0].AuthDesc);
                                $('#txt_PhoneNo1').val(objnew[key][0].PhoneNo1);
                                $('#txt_PhoneNo2').val(objnew[key][0].PhoneNo2);
                                $('#txt_EMail').val(objnew[key][0].EMail);
                                $('#txt_Website').val(objnew[key][0].Website);

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
        MainObject.do_getuserpageaccess(TaxAuthObject);
        TaxAuthObject._vieweperm = MainObject.do_IsActionMenuPermission(TaxAuthObject.access, 'TAX AUTHORITY', 'view');
        TaxAuthObject._createperm = MainObject.do_IsActionMenuPermission(TaxAuthObject.access, 'TAX AUTHORITY', 'create');
        TaxAuthObject._editperm = MainObject.do_IsActionMenuPermission(TaxAuthObject.access, 'TAX AUTHORITY', 'edit');
        TaxAuthObject._deleteperm = MainObject.do_IsActionMenuPermission(TaxAuthObject.access, 'TAX AUTHORITY', 'delete');
    },

};

var showmodal = function () {
    $('.modal-title').html('Tax Authorities - New');
    TaxAuthObject.hdnid = '';
    $("#div_modal").find("*").prop('disabled', false);

    $('#txt_AuthCd').val('');
    $('#txt_AuthCd').prop('readonly', false);
    $('#txt_AuthDesc').val('');
    $('#txt_Address').val('');
    $('#txt_Extension').val('');
    $('#dd_TaxAuthCode').val('');
    $('#txt_TaxAuthName').val('');
    $('#txt_PhoneNo1').val('');
    $('#txt_PhoneNo2').val('');
    $('#txt_EMail').val('');
    $('#txt_Website').val('');

    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();

    TaxAuthObject.do_render_lookup();

    $("#myModal").modal('show');

};


var savedata = function () {
    var validate = true;

    if ($('#txt_AuthCd').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txt_AuthCd").focus();
        return false;
    }

    else {
        var _data = '{id:"' + TaxAuthObject.hdnid + '", code: "' + encodeURIComponent($("#txt_AuthCd").val().trim()) + '", cocd: "' + encodeURIComponent(TaxAuthObject.cocd) + '"}';

        $.ajax({
            type: "POST",
            url: "tax-authorities-overview.aspx/docheckcode",
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
                    $("#txt_AuthCd").focus();
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

        if (TaxAuthObject.hdnid == undefined || TaxAuthObject.hdnid == 'undefined') TaxAuthObject.hdnid = '';
        _data["id"] = TaxAuthObject.hdnid;
        _data["cocd"] = TaxAuthObject.cocd;

        _data["code"] = $('#txt_AuthCd').val();
        _data["AuthDesc"] = $('#txt_AuthDesc').val();
        _data["Address"] = $('#txt_Address').val();
        _data["Extension"] = $('#txt_Extension').val();
        _data["TaxAuthCode"] = $('#dd_TaxAuthCode').val();
        _data["PhoneNo1"] = $('#txt_PhoneNo1').val();
        _data["PhoneNo2"] = $('#txt_PhoneNo2').val();
        _data["EMail"] = $('#txt_EMail').val();
        _data["Website"] = $('#txt_Website').val();        

        _data["isblock"] = $("#chk_isblocked").is(':checked');

        _data["ip"] = TaxAuthObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "tax-authorities-overview.aspx/doSave";
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
                    //window.location = "tax-authorities-overview.aspx";
                    $("#myModal").modal('hide');
                    $("#item_table").dataTable().fnDestroy();
                    TaxAuthObject.do_loadoverview();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var doactionModal = function (mode) {
    doaction(TaxAuthObject.hdnid, mode);
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {

        TaxAuthObject.do_loaddataedit(id);
        showmodal();
        $('.modal-title').html('Tax Authorities - Edit');
        $('#txt_AuthDesc').focus();
    }
    else if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '"}';

        $.ajax({
            type: "POST",
            url: "tax-authorities-overview.aspx/docheckdelete",
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
                .custconfirm(`Are you want to delete this  Tax Authorities?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + id + '"}';

                        $.ajax({
                            type: "POST",
                            url: "tax-authorities-overview.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    //window.location = "tax-authorities-overview.aspx";
                                    $("#item_table").dataTable().fnDestroy();
                                    TaxAuthObject.do_loadoverview();
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
    TaxAuthObject.ip = response.ip;
};

