
$(document).ready(function () {
    RoleObject.do_loadroles();
    RoleObject.do_getUserPagepermission();
});


var RoleObject = {
    hdnroleid: '',
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _assign_userrole: false,

    do_loadlookup: () => {
        $.ajax({
            type: "POST",
            async: false,
            url: "role_prototype.aspx/loadlookupdata",
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
                            //employee
                            var _employee = objnew[key];
                            var _html = [];
                            $.each(_employee, function (key, value) {
                                _html.push(
                                    "<option value='" + value.RoleCenterCd + "'>" + value.RoleCenterName + "</option>"
                                );
                            });
                            $("#cbo_rolecenter").html(_html.join(""));
                            $("#cbo_rolecenter").prepend("<option value='' selected='selected'></option>");
                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });

    },

    do_loadroles: () => {
        
        $.ajax({
            type: "POST",
            url: "role_prototype.aspx/loadrolelist",
            data: JSON.stringify({ CoCd: $("#ddlCompany").val() }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                RoleObject.do_populateroles(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateroles: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#roles_table",
            fields: [
                { label: "RoleCd", name: "RoleCd" },
                { label: "Description", name: "Description" },
                { label: "RoleCenterName", name: "RoleCenterName" },
                { label: "AllowPostingFrom", name: "AllowPostingFrom" },
                { label: "PostingTo", name: "PostingTo" },
                { label: "IsRoleBlocked", name: "IsRoleBlocked" }
            ],
        });

        var roletable = $("#roles_table");
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
                { data: "RoleCd" },
                { data: "Description" },
                { data: "RoleCenterName" },
                { data: "PostingFrom" },
                { data: "PostingTo" },
                { data: "IsRoleBlocked" },

            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [

                {
                    add: "create", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'New_Role'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { roleaction($('.selected').attr('roleid'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'Edit_Role'
                    },
                },
                {
                    //extend: "remove", editor: editor
                    extend: "remove", editor: editor, action: function () { roleaction($('.selected').attr('roleid'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'Delete_Role'
                    },
                },
                {
                    //add: "assign_roles", text: 'Assign Roles', editor: editor, action: () => window.open("role_assignment.aspx")
                    add: "assign_roles", text: 'Assign Users', editor: editor, action: function () { roleaction($('.selected').attr('rolecode'), 'userassign'); },
                    attr: {
                        title: 'Assign Users',
                        id: 'Assign_userrole'
                    },
                },
                
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("roleid", `${data.RowId}`);
                $(row).attr("rolecode", `${data.RoleCd}`);
            },
        });

        var table = $('#roles_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!RoleObject._deleteperm) {
                    $('#Delete_Role').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#Delete_Role').prop("disabled", true);
                    $('#Delete_Role').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!RoleObject._createperm) {
            $('#New_Role').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#New_Role').prop("disabled", true);
            $('#New_Role').attr('title', 'do not have permission to add role!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!RoleObject._editperm) {
            $('#Edit_Role').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Edit_Role').prop("disabled", true);
            $('#Edit_Role').attr('title', 'do not have permission to edit role!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!RoleObject._deleteperm) {
            $('#Delete_Role').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Delete_Role').prop("disabled", true);
            $('#Delete_Role').attr('title', 'do not have permission to delete role!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!RoleObject._assign_userrole) {
            $('#Assign_userrole').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Assign_userrole').prop("disabled", true);
            $('#Assign_userrole').attr('title', 'do not have permission to assign users role!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["roleid"] = RoleObject.hdnroleid;
        _data["cocd"] = $("#ddlCompany").val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "role_prototype.aspx/doeditRole",
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
                                RoleObject.hdnroleid = objnew[key][0].RowId;
                                $('#txt_rolecode').val(objnew[key][0].RoleCd);
                                $("#cbo_rolecenter").val(objnew[key][0].RoleCenterCd);
                                $("#txt_postingfrom").val(objnew[key][0].PostingFrom);
                                $("#txt_postingto").val(objnew[key][0].PostingTo);
                                $('#txt_description').val(objnew[key][0].Description);
                                if (objnew[key][0].IsRoleBlocked == true) {
                                    $('#chk_isblocked').prop('checked', true);
                                }
                                else {
                                    $('#chk_isblocked').prop('checked', false);
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
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(RoleObject);
        RoleObject._createperm = MainObject.do_IsActionMenuPermission(RoleObject.access, 'Role', 'create');
        RoleObject._editperm = MainObject.do_IsActionMenuPermission(RoleObject.access, 'Role', 'edit');
        RoleObject._deleteperm = MainObject.do_IsActionMenuPermission(RoleObject.access, 'Role', 'delete');
        RoleObject._assignusers = MainObject.do_IsActionMenuPermission(RoleObject.access, 'Role', 'view');
    },
};

var showmodal = function () {
    $('.modal-title').html('Add New Role');
    RoleObject.do_loadlookup();
    RoleObject.hdnroleid = '';
    $('#txt_rolecode').val('');
    $("#cbo_rolecenter").val('');
    $("#txt_postingfrom").val('');
    $("#txt_postingto").val('');
    $('#txt_description').val('');
    $("#myModalEDIT").modal('show');
    $('#txt_rolecode').focus();
};

var getempname = function (sel) {
    $('#txt_ename').val($("option:selected", sel).attr("ename"));
};

var saverole = function () {
    var validate = true;
    //

    if ($('#txt_rolecode').val() == '') {
        validate = false;
        $.alertable.alert(`Role Code required.`);
        $("#txt_rolecode").focus();
        return false;
    }
    else {
        var _data = '{roleid:"' + RoleObject.hdnroleid + '", rolecode: "' + encodeURIComponent($("#txt_rolecode").val().trim()) + '"}';

        $.ajax({
            type: "POST",
            url: "role_prototype.aspx/docheckrolecode",
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
                        `Role Code Already Exists.\n Please Try Another Role Code.`
                    );
                    $("#txt_rolecode").focus();
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

    if ($("#cbo_rolecenter").val() == "") {
        validate = false;
        $.alertable.alert(`Role Center required.`);
        $("#cbo_rolecenter").focus();
        return false;
    }
    if ($("#txt_postingfrom").val() == "") {
        validate = false;
        $.alertable.alert(`Allow Posting From required.`);
        $("#txt_postingfrom").focus();
        return false;
    }
    if ($("#txt_postingto").val() == "") {
        validate = false;
        $.alertable.alert(`Allow Posting To required.`);
        $("#txt_postingto").focus();
        return false;
    }

    var fromDate = $('#txt_postingfrom').val();
    var toDate = $('#txt_postingto').val();

    if (Date.parse(fromDate) > Date.parse(toDate)) {
        validate = false;
        $.alertable.alert(`Allow Posting To can't less then Allow Posting From.`);
        $("#txt_postingto").focus();
        return false;
    }

    var _data = {};
    if (validate == true) {

        _data["roleid"] = RoleObject.hdnroleid;
        _data["rolecode"] = $('#txt_rolecode').val();
        _data["rolecentercode"] = $("#cbo_rolecenter").val();
        _data["description"] = $('#txt_description').val();
        _data["postingfrom"] = $('#txt_postingfrom').val();
        _data["postingto"] = $('#txt_postingto').val();
        _data["isblock"] = $("#chk_isblocked").is(':checked');
        _data["cocd"] =$("#ddlCompany").val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(passdata));

        var _url = "role_prototype.aspx/doSaveRole";
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
                    window.location = "role_prototype.aspx";
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
        RoleObject.hdnroleid = roleid;
        RoleObject.do_loaddataedit(roleid);
        $('#txt_description').focus();
    }
    else if (mode == 'delete') {
        $.alertable
            .custconfirm(`Are you want to delete the role?`, ``, `Yes`, `No`)
            .then(
                function () {
                    //alert(userid);
                    var _data;
                    _data = '{roleid:"' + roleid + '"}';

                    $.ajax({
                        type: "POST",
                        url: "role_prototype.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                window.location = "role_prototype.aspx";
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
    else if (mode == 'userassign') {
        localStorage.RoleUserAssignment_callfor = 'r';
        localStorage.RoleUserAssignment_callerid = roleid;
        window.location = "role_assignment.aspx?t=r";
        //window.location = "role_assignment.aspx?r=" + roleid;
    }
   

    /*
    var _createperm = MainObject.
    (
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

