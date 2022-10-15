
$(document).ready(function () {
  
    CustomerPostingGroupObject.do_getUserPagepermission();
    if (localStorage.postingaccount == undefined || localStorage.postingaccount == "undefined" || localStorage.postingaccount == '') {
        CustomerPostingGroupObject.do_loadlookup();
    }
    else {
        CustomerPostingGroupObject.do_bindAccount();
    }
    CustomerPostingGroupObject.do_loadbankpostinggroup();

});


var CustomerPostingGroupObject = {
    hdnroleid: '',
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _postsetupperm: false,
    _postsetupsaveperm: false,

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
                            CustomerPostingGroupObject.do_bindAccount();
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
        $("#cbo_AcCd_Receivable").html(_html.join(""));
        $("#cbo_AcCd_Receivable").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_PmtDisc").html(_html.join(""));
        $("#cbo_AcCd_PmtDisc").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_RO").html(_html.join(""));
        $("#cbo_AcCd_RO").prepend("<option value='' selected='selected'></option>");

        $("#cbo_AcCd_PrePmt").html(_html.join(""));
        $("#cbo_AcCd_PrePmt").prepend("<option value='' selected='selected'></option>");
        //#endregion
    },

    do_loadbankpostinggroup: () => {

        $.ajax({
            type: "POST",
            url: "customer_posting_group.aspx/loadbankpostinggrouplist",
            data: JSON.stringify({ CoCd: $("#ddlCompany").val() }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                CustomerPostingGroupObject.do_populatebankpostinggroup(obj);
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
            table: "#customer_posting_group_table",
            fields: [
                { label: "GrpCd", name: "GrpCd" },
                { label: "GrpName", name: "GrpName" },
                { label: "IsBlock", name: "IsBlock" },
            ],
        });

        var roletable = $("#customer_posting_group_table");
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
                        id: 'custpostgrp_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'custpostgrp_Edit'
                    },
                },
                {
                    //extend: "remove", editor: editor
                    extend: "remove", editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'custpostgrp_delete'
                    },
                },
                {
                    //add: "assign_roles", text: 'Assign Roles', editor: editor, action: () => window.open("role_assignment.aspx")
                    add: "assign_postingsetup", text: 'Posting Setup', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'postingsetup'); },
                    attr: {
                        title: 'custpostgrpSetup',
                        id: 'custpostgrp_setup'
                    },
                },

            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("code", `${data.GrpCd}`);
            },
        });

        var table = $('#customer_posting_group_table').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!CustomerPostingGroupObject._deleteperm[0]) {
                    $('#custpostgrp_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#custpostgrp_delete').prop("disabled", true);
                    $('#custpostgrp_delete').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!CustomerPostingGroupObject._createperm[0]) {
            $('#custpostgrp_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#custpostgrp_create').prop("disabled", true);
            $('#custpostgrp_create').attr('title', 'do not have permission to Add New Record!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!CustomerPostingGroupObject._editperm[0]) {
            $('#custpostgrp_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#custpostgrp_Edit').prop("disabled", true);
            $('#custpostgrp_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!CustomerPostingGroupObject._deleteperm[0]) {
            $('#custpostgrp_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#custpostgrp_delete').prop("disabled", true);
            $('#custpostgrp_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
        if (!CustomerPostingGroupObject._postsetupperm[0]) {
            $('#custpostgrp_setup').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#custpostgrp_setup').prop("disabled", true);
            $('#custpostgrp_setup').attr('title', 'do not have permission to view customer posting group setup!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
    },



    do_loaddataedit: (id) => {

        var _data = {};
        _data["bpgid"] = CustomerPostingGroupObject.hdnroleid;
        _data["cocd"] = $("#ddlCompany").val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "customer_posting_group.aspx/doeditbpg",
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
                                CustomerPostingGroupObject.hdnroleid = objnew[key][0].RowId;
                                $('#txt_code').val(objnew[key][0].GrpCd);
                                $('#txt_description').val(objnew[key][0].GrpName);

                                $('#txt_code').prop('readonly', true);

                            /*Pran 2021.05.24 */
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
        if (!CustomerPostingGroupObject._postsetupsaveperm[0]) {
            $('#btnbankpost').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#btnbankpost').prop("disabled", true);
            $('#btnbankpost').attr('title', 'do not have permission to save customer posting group setup!!!');
        }

        var _data = {};
        _data["bpgid"] = CustomerPostingGroupObject.hdnroleid;
        _data["cocd"] = $("#ddlCompany").val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "customer_posting_group.aspx/doeditbpg",
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
                                CustomerPostingGroupObject.hdnroleid = objnew[key][0].RowId;
                                $('#txt_groupcode').val(objnew[key][0].GrpCd);
                                $('#cbo_AcCd_Receivable').val(objnew[key][0].AcCd_Receivable.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_PmtDisc').val(objnew[key][0].AcCd_PmtDisc.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_RO').val(objnew[key][0].AcCd_RO.replace(/[\r\n]+/gm, ''));
                                $('#cbo_AcCd_PrePmt').val(objnew[key][0].AcCd_PrePmt.replace(/[\r\n]+/gm, ''));
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
                                }*/
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

        MainObject.do_getuserpageaccess(CustomerPostingGroupObject);
        CustomerPostingGroupObject._postsetupperm = MainObject.do_IsActionMenuPermission(CustomerPostingGroupObject.access, 'POSTING SETUP', 'view');
        CustomerPostingGroupObject._createperm = MainObject.do_IsActionMenuPermission(CustomerPostingGroupObject.access, 'CUSTOMER POSTING SETUP', 'create');
        CustomerPostingGroupObject._editperm = MainObject.do_IsActionMenuPermission(CustomerPostingGroupObject.access, 'CUSTOMER POSTING SETUP', 'edit');
        CustomerPostingGroupObject._deleteperm = MainObject.do_IsActionMenuPermission(CustomerPostingGroupObject.access, 'CUSTOMER POSTING SETUP', 'delete');
        CustomerPostingGroupObject._postsetupsaveperm = MainObject.do_IsActionMenuPermission(CustomerPostingGroupObject.access, 'POSTING SETUP', 'create');
     
    },
};

var showmodal = function () {
    $('.modal-title').html('New Entry');
    CustomerPostingGroupObject.do_loadlookup();
    CustomerPostingGroupObject.hdnroleid = '';
    $('#txt_code').val('');
    $('#txt_code').prop('readonly', false);
    $('#txt_description').val('');
    $('#chk_isblocked').prop('checked', false); //Pran 2021.05.24
    $('#div_block').hide(); //Pran 2021.05.24
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
        var _data = '{bpgid:"' + CustomerPostingGroupObject.hdnroleid + '", bpgcode: "' + encodeURIComponent($("#txt_code").val().trim()) + '"}';

        $.ajax({
            type: "POST",
            url: "customer_posting_group.aspx/docheckbpgcode",
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

        _data["bpgid"] = CustomerPostingGroupObject.hdnroleid;
        _data["bpgcode"] = $('#txt_code').val();
        _data["description"] = $('#txt_description').val();
        _data["isblock"] = $("#chk_isblocked").is(':checked'); //Pran 2021.05.24
        _data["cocd"] = $('#ddlCompany').val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(passdata));

        var _url = "customer_posting_group.aspx/doSavebpg";
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
                    window.location = "customer_posting_group.aspx";
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
        CustomerPostingGroupObject.hdnroleid = roleid;
        CustomerPostingGroupObject.do_loaddataedit(roleid);
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
                        url: "customer_posting_group.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                window.location = "customer_posting_group.aspx";
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
        CustomerPostingGroupObject.hdnroleid = roleid;
        CustomerPostingGroupObject.do_loaddatapostingedit(roleid);
        $('#cbo_AcCd_Receivable').focus();
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
    CustomerPostingGroupObject.do_loadlookup();
    CustomerPostingGroupObject.hdnroleid = '';
    $('#txt_groupcode').val('');
    $("#myModalSETUP").modal('show');
};

var saveacnt = function () {
    var _data = {};
    _data["bpgid"] = CustomerPostingGroupObject.hdnroleid;
    _data["bpgcode"] = $('#txt_groupcode').val();
    _data["AcCd_Receivable"] = $('#cbo_AcCd_Receivable').val();
    _data["AcCd_PmtDisc"] = $('#cbo_AcCd_PmtDisc').val();
    _data["AcCd_RO"] = $('#cbo_AcCd_RO').val();
    _data["AcCd_PrePmt"] = $('#cbo_AcCd_PrePmt').val();
    //_data["isblock"] = $("#chk_isblocked").is(':checked'); //Pran 2021.05.24
    _data["cocd"] = $("#ddlCompany").val();

    var _passdata = {
        data: "",
    };
    _passdata.data = JSON.stringify(_data);
    //console.log(JSON.stringify(passdata));

    var _url = "customer_posting_group.aspx/doSavebank";
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
                window.location = "customer_posting_group.aspx";
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + " - Error occurred");
        },
    });
};


