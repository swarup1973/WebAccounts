$(document).ready(function () {
    InventoryPostingGroupObject.do_loadbankpostinggroup();
    InventoryPostingGroupObject.do_getUserPagepermission();
    if (localStorage.postingaccount == undefined || localStorage.postingaccount == "undefined" || localStorage.postingaccount == '') {
        InventoryPostingGroupObject.do_loadlookup();
    }
    else {
        InventoryPostingGroupObject.do_bindAccount();
    }
});


var InventoryPostingGroupObject = {
    hdnroleid: '',
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _postsetupperm: false,
    _postsetupsaveperm: false,

    do_loadlookup: () => {
        if (!InventoryPostingGroupObject._postsetupsaveperm[0]) {
            $('#btnbankpost').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#btnbankpost').prop("disabled", true);
            $('#btnbankpost').attr('title', 'do not have permission to save Inventory group setup!!!');
        }
        $.ajax({
            type: "POST",
            async: false,
            url: "../handler/datahandler.aspx/loadlookupdataAccount",
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
                            localStorage.postingaccount = JSON.stringify(objnew[key]);
                            InventoryPostingGroupObject.do_bindAccount();
                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_bindAccount: () => {
        var _account = JSON.parse(localStorage.postingaccount);
        var _html = [];
        $.each(_account, function (key, value) {
            _html.push(
                "<option value='" + value.AcCd.replace(/[\r\n]+/gm, '') + "'>" + value.AcCd.replace(/[\r\n]+/gm, '') + " (" + value.AcSrcDesc.replace(/[\r\n]+/gm, '') + ")</option>"
            );
        });

        //var cntrl_cbo = [];
        //cntrl_cbo = $.find("select");
        //$.each(cntrl_cbo, function (key, value) {
        //    $('#' + value.id).html(_html.join(""));
        //    $('#' + value.id).prepend("<option value='' selected='selected'></option>");
        //});

        //#region cbo
        
        $("#cbo_AcCd_Sales").html(_html.join(""));
        $("#cbo_AcCd_Sales").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_SalesReturnCrMemo").html(_html.join(""));
        $("#cbo_AcCd_SalesReturnCrMemo").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_SalesItemDisc").html(_html.join(""));
        $("#cbo_AcCd_SalesItemDisc").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_SalesInvoiceDisc").html(_html.join(""));
        $("#cbo_AcCd_SalesInvoiceDisc").prepend("<option value='' selected='selected'></option>");

        ////
        $("#cbo_AcCd_Purchase").html(_html.join(""));
        $("#cbo_AcCd_Purchase").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_PurchReturnCrMemo").html(_html.join(""));
        $("#cbo_AcCd_PurchReturnCrMemo").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_PurchItemDisc").html(_html.join(""));
        $("#cbo_AcCd_PurchItemDisc").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_PurchInvoiceDisc").html(_html.join(""));
        $("#cbo_AcCd_PurchInvoiceDisc").prepend("<option value='' selected='selected'></option>");

        ////

        $("#cbo_AcCd_Inventory").html(_html.join(""));
        $("#cbo_AcCd_Inventory").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_InventoryPL").html(_html.join(""));
        $("#cbo_AcCd_InventoryPL").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_InventoryAppliedCostPurch").html(_html.join(""));
        $("#cbo_AcCd_InventoryAppliedCostPurch").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_InventoryCGS").html(_html.join(""));
        $("#cbo_AcCd_InventoryCGS").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_InventoryPurchVarience").html(_html.join(""));
        $("#cbo_AcCd_InventoryPurchVarience").prepend("<option value='' selected='selected'></option>");

        ////
        $("#cbo_AcCd_ECR_ExpCostOfPurch").html(_html.join(""));
        $("#cbo_AcCd_ECR_ExpCostOfPurch").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_ECR_ExpLiaForPurch").html(_html.join(""));
        $("#cbo_AcCd_ECR_ExpLiaForPurch").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_ECR_ExpReceivable").html(_html.join(""));
        $("#cbo_AcCd_ECR_ExpReceivable").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_ECR_ExpCOGS").html(_html.join(""));
        $("#cbo_AcCd_ECR_ExpCOGS").prepend("<option value='' selected='selected'></option>");
        
        //#endregion
    },

    do_loadbankpostinggroup: () => {

        $.ajax({
            type: "POST",
            url: "inventory_posting_group.aspx/loadbankpostinggrouplist",
            data: JSON.stringify({ CoCd: $("#ddlCompany").val() }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                InventoryPostingGroupObject.do_populatebankpostinggroup(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(InventoryPostingGroupObject);
        InventoryPostingGroupObject._createperm = MainObject.do_IsActionMenuPermission(InventoryPostingGroupObject.access, 'INVENTORY POSTING SETUP', 'create');
        InventoryPostingGroupObject._editperm = MainObject.do_IsActionMenuPermission(InventoryPostingGroupObject.access, 'INVENTORY POSTING SETUP', 'edit');
        InventoryPostingGroupObject._deleteperm = MainObject.do_IsActionMenuPermission(InventoryPostingGroupObject.access, 'INVENTORY POSTING SETUP', 'delete');
        InventoryPostingGroupObject._postsetupperm = MainObject.do_IsActionMenuPermission(InventoryPostingGroupObject.access, 'POSTING SETUP', 'view');
        InventoryPostingGroupObject._postsetupsaveperm = MainObject.do_IsActionMenuPermission(InventoryPostingGroupObject.access, 'POSTING SETUP', 'create');
    },

    do_populatebankpostinggroup: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#inventory-posting-group-table",
            fields: [
                { label: "GrpCd", name: "GrpCd" },
                { label: "GrpName", name: "GrpName" },
                { label: "IsBlock", name: "IsBlock" },
            ],
        });

        var roletable = $("#inventory-posting-group-table");
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
                { data: "GrpCd" },
                { data: "GrpName" },
                { data: "IsBlock" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [

                {
                    add: "create", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'invenpostgrp_create'
                    }
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'invenpostgrp_Edit'
                    },
                },
                {
                    //extend: "remove", editor: editor
                    extend: "remove", editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'invenpostgrp_delete'
                    },
                },
                {
                    //add: "assign_roles", text: 'Assign Roles', editor: editor, action: () => window.open("role_assignment.aspx")
                    add: "assign_postingsetup", text: 'Posting Setup', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'postingsetup'); },
                    attr: {
                        title: 'bankpostgrpSetup',
                        id: 'invenpostgrp_setup'
                    },
                },

            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("code", `${data.GrpCd}`);
            },
        });

        var table = $('#inventory-posting-group-table').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!InventoryPostingGroupObject._deleteperm[0]) {
                    $('#invenpostgrp_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#invenpostgrp_delete').prop("disabled", true);
                    $('#invenpostgrp_delete').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!InventoryPostingGroupObject._createperm[0]) {
            $('#invenpostgrp_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#invenpostgrp_create').prop("disabled", true);
            $('#invenpostgrp_create').attr('title', 'do not have permission to Add New Record!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!InventoryPostingGroupObject._editperm[0]) {
            $('#invenpostgrp_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#invenpostgrp_Edit').prop("disabled", true);
            $('#invenpostgrp_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!InventoryPostingGroupObject._deleteperm[0]) {
            $('#invenpostgrp_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#invenpostgrp_delete').prop("disabled", true);
            $('#invenpostgrp_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
        if (!InventoryPostingGroupObject._postsetupperm[0]) {
            $('#invenpostgrp_setup').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#invenpostgrp_setup').prop("disabled", true);
            $('#invenpostgrp_setup').attr('title', 'do not have permission to view inventory posting group setup!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }

    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["bpgid"] = InventoryPostingGroupObject.hdnroleid;
        _data["cocd"] = $('#ddlCompany').val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "inventory_posting_group.aspx/doeditbpg",
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
                                InventoryPostingGroupObject.hdnroleid = objnew[key][0].RowId;
                                $('#txt_code').val(objnew[key][0].GrpCd);
                                $('#txt_description').val(objnew[key][0].GrpName);

                                $('#txt_code').prop('readonly', true);

                                //Pran 2021.05.27
                                if (objnew[key][0].IsBlock == true) {
                                    $('#chk_isblocked').prop('checked', true);
                                }
                                else {
                                    $('#chk_isblocked').prop('checked', false);
                                }
                                if ($.trim(objnew[key][0].GrpCd) == '') {
                                    $('#div_block').hide();
                                    $('#chk_isblocked').prop('checked', false);
                                }
                                else {
                                    $('#div_block').show();
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

    do_loaddatapostingedit: (id) => {
        

        var _data = {};
        _data["bpgid"] = InventoryPostingGroupObject.hdnroleid;
        _data["cocd"] = $('#ddlCompany').val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "inventory_posting_group.aspx/doeditbpg",
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
                                InventoryPostingGroupObject.hdnroleid = objnew[key][0].RowId;
                                $('#txt_groupcode').val(objnew[key][0].GrpCd);

                                $('#cbo_AcCd_Sales').val(objnew[key][0].AcCd_Sales.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_SalesReturnCrMemo').val(objnew[key][0].AcCd_SalesReturnCrMemo.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_SalesItemDisc').val(objnew[key][0].AcCd_SalesItemDisc.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_SalesInvoiceDisc').val(objnew[key][0].AcCd_SalesInvoiceDisc.replace(/[\r\n]+/gm, ''));

                                $('#cbo_AcCd_Purchase').val(objnew[key][0].AcCd_Purchase.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_PurchReturnCrMemo').val(objnew[key][0].AcCd_PurchReturnCrMemo.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_PurchItemDisc').val(objnew[key][0].AcCd_PurchItemDisc.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_PurchInvoiceDisc').val(objnew[key][0].AcCd_PurchInvoiceDisc.replace(/[\r\n]+/gm, ''));

                                $('#cbo_AcCd_Inventory').val(objnew[key][0].AcCd_Inventory.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_InventoryPL').val(objnew[key][0].AcCd_InventoryPL.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_InventoryAppliedCostPurch').val(objnew[key][0].AcCd_InventoryAppliedCostPurch.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_InventoryCGS').val(objnew[key][0].AcCd_InventoryCGS.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_InventoryPurchVarience').val(objnew[key][0].AcCd_InventoryPurchVarience.replace(/[\r\n]+/gm, ''));

                                $('#cbo_AcCd_ECR_ExpCostOfPurch').val(objnew[key][0].AcCd_ECR_ExpCostOfPurch.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_ECR_ExpLiaForPurch').val(objnew[key][0].AcCd_ECR_ExpLiaForPurch.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_ECR_ExpReceivable').val(objnew[key][0].AcCd_ECR_ExpReceivable.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_ECR_ExpCOGS').val(objnew[key][0].AcCd_ECR_ExpCOGS.replace(/[\r\n]+/gm, ''));

                                //Pran 2021.05.27
                                //if (objnew[key][0].IsBlock == true) {
                                //    $('#chk_isblocked').prop('checked', true);
                                //}
                                //else {
                                //    $('#chk_isblocked').prop('checked', false);
                                //}

                                //var cbovalString = '';
                                //var cntrl_cbo = [];
                                //cntrl_cbo = $.find("select");
                                //$.each(cntrl_cbo, function (key, value) {
                                //    if ($('#' + value.id).val() != '') {
                                //        cbovalString += $('#' + value.id).val() + " "; 
                                //    }
                                //});

                                //if ($.trim(cbovalString)=='') {
                                //    $('#div_block').hide();
                                //    $('#chk_isblocked').prop('checked', false);
                                //}
                                //else {
                                //    $('#div_block').show();
                                //}
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
    $('.modal-title').html('New Entry');
    InventoryPostingGroupObject.do_loadlookup();
    InventoryPostingGroupObject.hdnroleid = '';
    $('#txt_code').val('');
    $('#txt_code').prop('readonly', false);
    $('#txt_description').val('');
    $('#chk_isblocked').prop('checked', false); //Pran 2021.05.27
    $('#div_block').hide(); //Pran 2021.05.27
    $("#myModalEDIT").modal('show');
    $('#txt_code').focus();
};

var getempname = function (sel) {
    $('#txt_ename').val($("option:selected", sel).attr("ename"));
};

var saverole = function () {
    var validate = true;
    //

    if ($('#txt_code').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txt_code").focus();
        return false;
    }
    else {
        var _data = '{bpgid:"' + InventoryPostingGroupObject.hdnroleid + '", bpgcode: "' + encodeURIComponent($("#txt_code").val().trim()) + '"}';

        $.ajax({
            type: "POST",
            url: "inventory_posting_group.aspx/docheckbpgcode",
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
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $.alertable.alert(
                        `Code Already Exists.\n Please Try Another Code.`
                    );
                    $("#txt_code").focus();
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

        _data["bpgid"] = InventoryPostingGroupObject.hdnroleid;
        _data["bpgcode"] = $('#txt_code').val();
        _data["description"] = $('#txt_description').val();
        _data["isblock"] = $("#chk_isblocked").is(':checked'); //Pran 2021.05.27
        _data["cocd"] = $('#ddlCompany').val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(passdata));

        var _url = "inventory_posting_group.aspx/doSavebpg";
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
                    //UsersObject.do_loadusers();
                    window.location = "inventory_posting_group.aspx";
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var roleaction = function (roleid, mode) {


    if (roleid == "" || roleid == undefined || roleid == "undefined") return;

    if (mode == 'edit') {
        showmodal();
        $('.modal-title').html('Edit Entry');
        InventoryPostingGroupObject.hdnroleid = roleid;
        InventoryPostingGroupObject.do_loaddataedit(roleid);
        $('#txt_description').focus();
    }
    else if (mode == 'delete') {
        $.alertable
            .custconfirm(`Are you want to delete?`, ``, `Yes`, `No`)
            .then(
                function () {
                    //alert(userid);
                    var _data;
                    _data = '{bpgid:"' + roleid + '"}';

                    $.ajax({
                        type: "POST",
                        url: "inventory_posting_group.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                window.location = "inventory_posting_group.aspx";
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
    else if (mode == 'postingsetup') {
        showmodalPosting();
        //$('.modal-title').html('Posting Set-up');
        InventoryPostingGroupObject.hdnroleid = roleid;
        InventoryPostingGroupObject.do_loaddatapostingedit(roleid);
        $('#cbo_AcCd_Payable').focus();
    }


    /*
    var _createperm = MainObject.do_IsActionMenuPermission(
        "",
        ChartofacctObject.coadata.pageid,
        "edit"
    );
    if (!_createperm) {
        $.alertable.alert(`You have no permission to edit data.`);
        return;
    }

    var _id = acid;
    if (_id != "0") window.location = "coasetup.aspx?id=" + _id;
    */
};

var showmodalPosting = function () {
    $('.modal-title').html('Posting Set-up');
    InventoryPostingGroupObject.do_loadlookup();
    InventoryPostingGroupObject.hdnroleid = '';
    $('#txt_groupcode').val('');
    $("#myModalSETUP").modal('show');
};

var saveacnt = function () {
    var _data = {};
    _data["bpgid"] = InventoryPostingGroupObject.hdnroleid;
    _data["bpgcode"] = $('#txt_groupcode').val();

    _data["AcCd_Sales"] = $('#cbo_AcCd_Sales').val();
    _data["AcCd_SalesReturnCrMemo"] = $('#cbo_AcCd_SalesReturnCrMemo').val();
    _data["AcCd_SalesItemDisc"] = $('#cbo_AcCd_SalesItemDisc').val();
    _data["AcCd_SalesInvoiceDisc"] = $('#cbo_AcCd_SalesInvoiceDisc').val();

    _data["AcCd_Purchase"] = $('#cbo_AcCd_Purchase').val();
    _data["AcCd_PurchReturnCrMemo"] = $('#cbo_AcCd_PurchReturnCrMemo').val();
    _data["AcCd_PurchItemDisc"] = $('#cbo_AcCd_PurchItemDisc').val();
    _data["AcCd_PurchInvoiceDisc"] = $('#cbo_AcCd_PurchInvoiceDisc').val();

    _data["AcCd_Inventory"] = $('#cbo_AcCd_Inventory').val();
    _data["AcCd_InventoryPL"] = $('#cbo_AcCd_InventoryPL').val();
    _data["AcCd_InventoryAppliedCostPurch"] = $('#cbo_AcCd_InventoryAppliedCostPurch').val();
    _data["AcCd_InventoryCGS"] = $('#cbo_AcCd_InventoryCGS').val();
    _data["AcCd_InventoryPurchVarience"] = $('#cbo_AcCd_InventoryPurchVarience').val();

    _data["AcCd_ECR_ExpCostOfPurch"] = $('#cbo_AcCd_ECR_ExpCostOfPurch').val();
    _data["AcCd_ECR_ExpLiaForPurch"] = $('#cbo_AcCd_ECR_ExpLiaForPurch').val();
    _data["AcCd_ECR_ExpReceivable"] = $('#cbo_AcCd_ECR_ExpReceivable').val();
    _data["AcCd_ECR_ExpCOGS"] = $('#cbo_AcCd_ECR_ExpCOGS').val();

    //_data["isblock"] = $("#chk_isblocked").is(':checked'); //Pran 2021.05.27
    _data["cocd"] = $('#ddlCompany').val();

    var _passdata = {
        data: "",
    };
    _passdata.data = JSON.stringify(_data);
    //console.log(JSON.stringify(passdata));

    var _url = "inventory_posting_group.aspx/doSavebank";
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
                //UsersObject.do_loadusers();
                window.location = "inventory_posting_group.aspx";
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + " - Error occurred");
        },
    });
};


