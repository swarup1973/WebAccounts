
$(document).ready(function () {
    FixedassetsPostingGroupObject.do_loadbankpostinggroup();
    FixedassetsPostingGroupObject.do_getUserPagepermission();
    if (localStorage.postingaccount == undefined || localStorage.postingaccount == "undefined" || localStorage.postingaccount == '') {
        FixedassetsPostingGroupObject.do_loadlookup();
    }
    else {
        FixedassetsPostingGroupObject.do_bindAccount();
    }
});


var FixedassetsPostingGroupObject = {
    hdnroleid: '',
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _postsetupperm: false,

    do_loadlookup: () => {
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
                            FixedassetsPostingGroupObject.do_bindAccount();
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

       

        $("#cbo_AcCd_Acquisition").html(_html.join(""));
        $("#cbo_AcCd_Acquisition").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_AccumDepreciation").html(_html.join(""));
        $("#cbo_AcCd_AccumDepreciation").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_AccumOnDisposal").html(_html.join(""));
        $("#cbo_AcCd_AccumOnDisposal").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_AccumDepreOnDisposal").html(_html.join(""));
        $("#cbo_AcCd_AccumDepreOnDisposal").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_GainOnSaleDisposal").html(_html.join(""));
        $("#cbo_AcCd_GainOnSaleDisposal").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_LossOnSaleDisposal").html(_html.join(""));
        $("#cbo_AcCd_LossOnSaleDisposal").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_RepairMaintenance").html(_html.join(""));
        $("#cbo_AcCd_RepairMaintenance").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_DepExpns").html(_html.join(""));
        $("#cbo_AcCd_DepExpns").prepend("<option value='' selected='selected'></option>");
        //#endregion
    },

    do_loadbankpostinggroup: () => {

        $.ajax({
            type: "POST",
            url: "fixed_assets_posting_group.aspx/loadbankpostinggrouplist",
            data: JSON.stringify({ CoCd: $("#ddlCompany").val() }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                FixedassetsPostingGroupObject.do_populatebankpostinggroup(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populatebankpostinggroup: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#assets_posting_group_table",
            fields: [
                { label: "GrpCd", name: "GrpCd" },
                { label: "GrpName", name: "GrpName" },
                { label: "IsBlock", name: "IsBlock" },
            ],
        });

        var roletable = $("#assets_posting_group_table");
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
                        id: 'fixassetpostgrp_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'fixassetpostgrp_Edit'
                    },
                },
                {
                    //extend: "remove", editor: editor
                    extend: "remove", editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'fixassetpostgrp_delete'
                    },
                },
                {
                    //add: "assign_roles", text: 'Assign Roles', editor: editor, action: () => window.open("role_assignment.aspx")
                    add: "assign_postingsetup", text: 'Posting Setup', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'postingsetup'); },
                    attr: {
                        title: 'bankpostgrpSetup',
                        id: 'fixassetpostgrp_setup'
                    },
                },

            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("code", `${data.GrpCd}`);
            },
        });
        var table = $('#assets_posting_group_table').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!FixedassetsPostingGroupObject._deleteperm) {
                    $('#fixassetpostgrp_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#fixassetpostgrp_delete').prop("disabled", true);
                    $('#fixassetpostgrp_delete').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!FixedassetsPostingGroupObject._createperm) {
            $('#fixassetpostgrp_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#fixassetpostgrp_create').prop("disabled", true);
            $('#fixassetpostgrp_create').attr('title', 'do not have permission to Add New Record!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!FixedassetsPostingGroupObject._editperm) {
            $('#fixassetpostgrp_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#fixassetpostgrp_Edit').prop("disabled", true);
            $('#fixassetpostgrp_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!FixedassetsPostingGroupObject._deleteperm) {
            $('#fixassetpostgrp_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#fixassetpostgrp_delete').prop("disabled", true);
            $('#fixassetpostgrp_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
        if (!FixedassetsPostingGroupObject._postsetupperm) {
            $('#fixassetpostgrp_setup').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#fixassetpostgrp_setup').prop("disabled", true);
            $('#fixassetpostgrp_setup').attr('title', 'do not have permission to view fixed assets posting group setup!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }


    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["bpgid"] = FixedassetsPostingGroupObject.hdnroleid;
        _data["cocd"] = $('#ddlCompany').val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "fixed_assets_posting_group.aspx/doeditbpg",
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
                                FixedassetsPostingGroupObject.hdnroleid = objnew[key][0].RowId;
                                $('#txt_code').val(objnew[key][0].GrpCd);
                                $('#txt_description').val(objnew[key][0].GrpName);

                                $('#txt_code').prop('readonly', true);

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
        _data["bpgid"] = FixedassetsPostingGroupObject.hdnroleid;
        _data["cocd"] = $('#ddlCompany').val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "fixed_assets_posting_group.aspx/doeditbpg",
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
                                FixedassetsPostingGroupObject.hdnroleid = objnew[key][0].RowId;
                                $('#txt_groupcode').val(objnew[key][0].GrpCd);
                                $('#cbo_AcCd_Acquisition').val(objnew[key][0].AcCd_Acquisition.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_AccumDepreciation').val(objnew[key][0].AcCd_AccumDepreciation.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_AccumOnDisposal').val(objnew[key][0].AcCd_AccumOnDisposal.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_AccumDepreOnDisposal').val(objnew[key][0].AcCd_AccumDepreOnDisposal.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_GainOnSaleDisposal').val(objnew[key][0].AcCd_GainOnSaleDisposal.replace(/[\r\n]+/gm, ''));

                                $('#cbo_AcCd_LossOnSaleDisposal').val(objnew[key][0].AcCd_LossOnSaleDisposal.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_RepairMaintenance').val(objnew[key][0].AcCd_RepairMaintenance.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_DepExpns').val(objnew[key][0].AcCd_DepExpns.replace(/[\r\n]+/gm, ''));

                                /*
                                if (objnew[key][0].IsBlock == true) {
                                    $('#chk_isblocked').prop('checked', true);
                                }
                                else {
                                    $('#chk_isblocked').prop('checked', false);
                                }
                                
                                var cbovalString = '';
                                var cntrl_cbo = [];
                                cntrl_cbo = $.find("select");
                                $.each(cntrl_cbo, function (key, value) {
                                    if ($('#' + value.id).val() != '') {
                                        cbovalString += $('#' + value.id).val() + " ";
                                    }
                                });

                                if ($.trim(cbovalString) == '') {
                                    $('#div_block').hide();
                                    $('#chk_isblocked').prop('checked', false);
                                }
                                else {
                                    $('#div_block').show();
                                }
                                */
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
        MainObject.do_getuserpageaccess(FixedassetsPostingGroupObject);
        FixedassetsPostingGroupObject._createperm = MainObject.do_IsActionMenuPermission(FixedassetsPostingGroupObject.access, 'Fixed Assets Posting', 'create');
        FixedassetsPostingGroupObject._editperm = MainObject.do_IsActionMenuPermission(FixedassetsPostingGroupObject.access, 'Fixed Assets Posting', 'edit');
        FixedassetsPostingGroupObject._deleteperm = MainObject.do_IsActionMenuPermission(FixedassetsPostingGroupObject.access, 'Fixed Assets Posting', 'delete');
        FixedassetsPostingGroupObject._postsetupperm = MainObject.do_IsActionMenuPermission(FixedassetsPostingGroupObject.access, 'Fixed Assets Posting', 'view');
    },
};

var showmodal = function () {
    $('.modal-title').html('New Entry');
    FixedassetsPostingGroupObject.do_loadlookup();
    FixedassetsPostingGroupObject.hdnroleid = '';
    $('#txt_code').val('');
    $('#txt_code').prop('readonly', false);
    $('#txt_description').val('');
    $('#chk_isblocked').prop('checked', false); //Pran 2021.05.26
    $('#div_block').hide(); //Pran 2021.05.26
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
        var _data = '{bpgid:"' + FixedassetsPostingGroupObject.hdnroleid + '", bpgcode: "' + encodeURIComponent($("#txt_code").val().trim()) + '"}';

        $.ajax({
            type: "POST",
            url: "fixed_assets_posting_group.aspx/docheckbpgcode",
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

        _data["bpgid"] = FixedassetsPostingGroupObject.hdnroleid;
        _data["bpgcode"] = $('#txt_code').val();
        _data["description"] = $('#txt_description').val();
        _data["isblock"] = $("#chk_isblocked").is(':checked'); //Pran 2021.05.26
        _data["cocd"] = $('#ddlCompany').val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(passdata));

        var _url = "fixed_assets_posting_group.aspx/doSavebpg";
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
                    window.location = "fixed_assets_posting_group.aspx";
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
        FixedassetsPostingGroupObject.hdnroleid = roleid;
        FixedassetsPostingGroupObject.do_loaddataedit(roleid);
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
                        url: "fixed_assets_posting_group.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                window.location = "fixed_assets_posting_group.aspx";
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
        FixedassetsPostingGroupObject.hdnroleid = roleid;
        FixedassetsPostingGroupObject.do_loaddatapostingedit(roleid);
        $('#cbo_AcCd_Acquisition').focus();
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
    FixedassetsPostingGroupObject.do_loadlookup();
    FixedassetsPostingGroupObject.hdnroleid = '';
    $('#txt_groupcode').val('');
    $("#myModalSETUP").modal('show');
};

var saveacnt = function () {
    var _data = {};
    _data["bpgid"] = FixedassetsPostingGroupObject.hdnroleid;
    _data["bpgcode"] = $('#txt_groupcode').val();
    _data["AcCd_Acquisition"] = $('#cbo_AcCd_Acquisition').val();
    _data["AcCd_AccumDepreciation"] = $('#cbo_AcCd_AccumDepreciation').val();

    _data["AcCd_AccumOnDisposal"] = $('#cbo_AcCd_AccumOnDisposal').val();
    _data["AcCd_AccumDepreOnDisposal"] = $('#cbo_AcCd_AccumDepreOnDisposal').val();
    _data["AcCd_GainOnSaleDisposal"] = $('#cbo_AcCd_GainOnSaleDisposal').val();


    _data["AcCd_LossOnSaleDisposal"] = $('#cbo_AcCd_LossOnSaleDisposal').val();
    _data["AcCd_RepairMaintenance"] = $('#cbo_AcCd_RepairMaintenance').val();
    _data["AcCd_DepExpns"] = $('#cbo_AcCd_DepExpns').val();

    _data["cocd"] = $('#ddlCompany').val();
    //_data["isblock"] = $("#chk_isblocked").is(':checked'); //Pran 2021.05.26

    var _passdata = {
        data: "",
    };
    _passdata.data = JSON.stringify(_data);
    //console.log(JSON.stringify(passdata));

    var _url = "fixed_assets_posting_group.aspx/doSavebank";
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
                window.location = "fixed_assets_posting_group.aspx";
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + " - Error occurred");
        },
    });
};


