$(document).ready(function () {
    if (queryString('t') == undefined || queryString('t') == "undefined" || queryString("t") == null) {
        RoleUserAssignment.bothway = '1';
        RoleUserAssignment.callfor = '';
        RoleUserAssignment.callerid = '';
    }
    else {
        RoleUserAssignment.bothway = '';
    }

    if (localStorage.RoleUserAssignment_callfor != undefined && localStorage.RoleUserAssignment_callfor != "undefined") {
        RoleUserAssignment.callfor = localStorage.RoleUserAssignment_callfor;
        RoleUserAssignment.callerid = localStorage.RoleUserAssignment_callerid;
    }
    else {
        RoleUserAssignment.callfor = '';
        RoleUserAssignment.callerid = '';
    }

    if (RoleUserAssignment.callfor== 'u') {
        RoleAssignment.comefrom = 'u';
        RoleAssignment._userid = RoleUserAssignment.callerid;// queryString("u");

        RoleAssignment.usereditor = new $.fn.dataTable.Editor({
            table: "#role_assignment_table",
            fields: [
                { label: "RoleCd", name: "RoleCd" },
                { label: "Description", name: "Description" },
                { label: "IsDefaultRole", name: "IsDefaultRole" }
            ],
        });

        RoleAssignment.userroletable = $("#role_assignment_table");

        RoleAssignment.do_loadlookup();
        RoleAssignment.do_loaduserroles(RoleAssignment._userid);

        if (queryString('menuid') != undefined || queryString("menuid") != null) {
            RoleAssignment.menuid = queryString("menuid");
            localStorage.menu_id_premission = queryString("menuid");
        }
       
        RoleAssignment.do_getUserPagepermission();
    }

    if (RoleUserAssignment.callfor == 'r') {
        RoleAssignment.comefrom = 'r';
        RoleAssignment._roleid = RoleUserAssignment.callerid;//queryString("r");

        RoleAssignment.usereditor = new $.fn.dataTable.Editor({
            table: "#role_assignment_table",
            fields: [
                { label: "PNO", name: "PNO" },
                { label: "EName", name: "EName" },
                { label: "IsDefaultRole", name: "IsDefaultRole" }
            ],
        });

        RoleAssignment.userroletable = $("#role_assignment_table");

        RoleAssignment.do_loadlookup();
        RoleAssignment.do_loadroleuser(RoleAssignment._roleid);
        if (queryString('menuid') != undefined || queryString("menuid") != null) {
            RoleAssignment.menuid = queryString("menuid");
            localStorage.menu_id_premission = queryString("menuid");
        }
        RoleAssignment.do_getUserPagepermission();
    }

    if (RoleUserAssignment.callfor == '' || RoleUserAssignment.bothway == '1') {
        RoleUserAssignment.callfor = '';
        RoleUserAssignment.callerid = '';
        RoleAssignment.do_loadlookup();
    }

    if (RoleUserAssignment.bothway == '') {
        if (RoleUserAssignment.callfor == 'u') {
            $('#selectRole').attr('disabled', 'disabled');
        }
        else if (RoleUserAssignment.callfor == 'r') {
            $('#selectUser').attr('disabled', 'disabled');
        }
    }
    //localStorage.RoleUserAssignment_callfor ='';
    //localStorage.RoleUserAssignment_callerid ='';
   // localStorage.menu_id_premission = queryString("menuid");
   
});


var RoleAssignment = {
    hdnid: '',
    comefrom: '',
    _userid: '',
    _roleid: '',
    usereditor: '',
    userroletable: '',
    bothway:'',
    dd_user: '',
    dd_role: '',
    _createperm: false,
    _deleteperm: false,
    _create_userperm: false,
    _delete_userperm: false,
    menuid: '',

    do_loadlookup: () => {
        
      
        $.ajax({
            type: "POST",
            async: false,
            url: "role_assignment.aspx/loadlookupdata",
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
                            //user
                            var _user = objnew[key];
                            var _html = [];
                            $.each(_user, function (key, value) {
                                _html.push(
                                    "<option value='" + value.UserId + "' userid='" + value.RowId + "' uname='" + value.EName + "'>" + value.PNO + "</option>"
                                );
                            });

                            /*if (RoleAssignment.comefrom == 'r') {
                                $("#dd_userorrole").html(_html.join(""));
                                $("#dd_userorrole").prepend("<option value='' selected='selected'>Choose...</option>");
                            }

                            else if (RoleAssignment.comefrom == 'u') {
                                $("#selectUser").html(_html.join(""));
                                $("#selectUser").prepend("<option value='' selected='selected'>Choose...</option>");

                                //$('#selectRole').attr('disabled', 'disabled');
                                $("#selectUser").val(RoleAssignment._userid);

                                $('#txt_username').val($("option:selected", $("#selectUser")).attr("uname"));
                                //getempnameuser($("#selectUser"));
                            }
                            else if (RoleAssignment.comefrom == '') {
                                $("#selectUser").html(_html.join(""));
                                $("#selectUser").prepend("<option value='' selected='selected'>Choose...</option>");
                            }*/

                            RoleAssignment.dd_role = _html.join("");


                            $("#selectUser").html(_html.join(""));
                            $("#selectUser").prepend("<option value='' selected='selected'>Choose...</option>");

                            if (RoleAssignment.comefrom == 'u') {
                                $("#selectUser").val(RoleAssignment._userid);
                                $('#txt_username').val($("option:selected", $("#selectUser")).attr("uname"));
                            }
                        }


                        if (attrName.toLowerCase() == "table1") {
                            //Role
                            var _role = objnew[key];
                            var _html = [];
                            $.each(_role, function (key, value) {
                                _html.push(
                                    "<option value='" + value.RoleCd + "' desc='" + value.description + "'>" + value.RoleCd + "</option>"
                                );
                            });

                            /*if (RoleAssignment.comefrom == 'u') {
                                $("#dd_userorrole").html(_html.join(""));
                                $("#dd_userorrole").prepend("<option value='' selected='selected'>Choose...</option>");
                            }

                            else if (RoleAssignment.comefrom == 'r') {
                                $("#selectRole").html(_html.join(""));
                                $("#selectRole").prepend("<option value='' selected='selected'>Choose...</option>");

                                //$('#selectUser').attr('disabled', 'disabled');
                                $('#selectRole').val(RoleAssignment._roleid);

                                $('#txt_rolename').val($("option:selected", $('#selectRole')).attr("desc"));
                                //getempnameuser($('#selectRole'));
                            }
                            else if (RoleAssignment.comefrom == '') {
                                $("#selectRole").html(_html.join(""));
                                $("#selectRole").prepend("<option value='' selected='selected'>Choose...</option>");
                            }*/

                            RoleAssignment.dd_user = _html.join("");

                            $("#selectRole").html(_html.join(""));
                            $("#selectRole").prepend("<option value='' selected='selected'>Choose...</option>");
                            if (RoleAssignment.comefrom == 'r') {
                                $('#selectRole').val(RoleAssignment._roleid);
                                $('#txt_rolename').val($("option:selected", $('#selectRole')).attr("desc"));
                            }
                        }


                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });

    },

    do_loadlookuprole: () => {
        $.ajax({
            type: "POST",
            async: false,
            url: "role_prototype.aspx/loadlookupdata",
            data: JSON.stringify({ val: "" }),
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

    do_loaduserroles: (_userid) => {
        if (queryString('menuid') != undefined || queryString("menuid") != null) {
            RoleAssignment.menuid = queryString("menuid");
            localStorage.menu_id_premission = queryString("menuid");
        }

        $.ajax({
            type: "POST",
            url: "role_assignment.aspx/loaduserroles",
            data: JSON.stringify({ userid: _userid }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                RoleAssignment.do_populateuserroles(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateuserroles: (obj) => {
        // editor init
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

        RoleAssignment.userroletable.dataTable({
            dom: "Bfrtip",
            fixedHeader: true,
            data: roledata,
            columns: [
                { data: "RoleCd" },
                { data: "Description" },
                { data: "IsDefaultRole" }
            ],
            select: true,
            buttons: [
                {
                    add: "create", text: 'New', editor: RoleAssignment.usereditor, action: () => showmodal(),
                      attr: {
                        title: 'New',
                        id: 'add_user'
                    },
                },
                {
                    //extend: "remove", editor: editor
                    extend: "remove", editor: RoleAssignment.usereditor, action: function () { roleaction($('.selected').attr('rowid'), 'delete'); } ,
                    attr: {
                        title: 'remove',
                        id: 'drop_user'
                    },
                  
                },
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowid", `${data.rowid}`);
            },
        });

        var table = $('#role_assignment_table').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!RoleAssignment._delete_userperm[0]) {
                    $('#drop_user').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#drop_user').prop("disabled", true);
                    $('#drop_user').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!RoleAssignment._create_userperm[0]) {
            $('#add_user').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#add_user').prop("disabled", true);
            $('#add_user').attr('title', 'do not have permission to add user!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!RoleAssignment._delete_userperm[0]) {
            $('#drop_user').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#drop_user').prop("disabled", true);
            $('#drop_user').attr('title', 'do not have delete permission!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
    },

    do_loadroleuser: (_roleid) => {

        if (queryString('menuid') != undefined || queryString("menuid") != null) {
            RoleAssignment.menuid = queryString("menuid");
            localStorage.menu_id_premission = queryString("menuid");
        }

        $.ajax({
            type: "POST",
            url: "role_assignment.aspx/loadroleusers",
            data: JSON.stringify({ rolecode: _roleid }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                RoleAssignment.do_populateroleusers(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateroleusers: (obj) => {
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

        RoleAssignment.userroletable.dataTable({
            dom: "Bfrtip",
            fixedHeader: true,
            data: roledata,
            columns: [
                { data: "PNO" },
                { data: "EName" },
                { data: "IsDefaultRole" }
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [
                {
                    add: "create", text: 'New', editor: RoleAssignment.usereditor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'New_user'
                    },
                },
                {
                    //extend: "remove", editor: editor
                    extend: "remove", editor: RoleAssignment.usereditor, action: function () { roleaction($('.selected').attr('rowid'), 'delete'); },
                    attr: {
                        title: 'Remove',
                        id: 'New_remove'
                    },
                },
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowid", `${data.rowid}`);
            },
        });


        var table = $('#role_assignment_table').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!RoleAssignment._deleteperm[0]) {
                    $('#New_remove').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#New_remove').prop("disabled", true);
                    $('#New_remove').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!RoleAssignment._createperm[0]) {
            $('#New_user').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#New_user').prop("disabled", true);
            $('#New_user').attr('title', 'do not have permission to add user!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!RoleAssignment._deleteperm[0]) {
            $('#New_remove').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#New_remove').prop("disabled", true);
            $('#New_remove').attr('title', 'do not have delete permission!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["roleid"] = RoleAssignment.hdnid;

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
                                RoleAssignment.hdnid = objnew[key][0].RowId;
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
        MainObject.do_getuserpageaccess(RoleAssignment);
        if (queryString('menuid') != undefined || queryString("menuid") != null)
        {
            if (RoleAssignment.comefrom == 'r')
            {
                RoleAssignment._createperm = MainObject.do_IsActionMenuPermission(RoleAssignment.access, 'ASSIGN USERS', 'create');
                RoleAssignment._deleteperm = MainObject.do_IsActionMenuPermission(RoleAssignment.access, 'ASSIGN USERS', 'delete');
                RoleAssignment._create_userperm = MainObject.do_IsActionMenuPermission(RoleAssignment.access, 'ASSIGN USERS', 'create');
                RoleAssignment._delete_userperm = MainObject.do_IsActionMenuPermission(RoleAssignment.access, 'ASSIGN USERS', 'delete');
            }
            if (RoleAssignment.comefrom == 'u') {
                RoleAssignment._create_userperm = MainObject.do_IsActionMenuPermission(RoleAssignment.access, 'ASSIGN ROLE', 'create');
                RoleAssignment._delete_userperm = MainObject.do_IsActionMenuPermission(RoleAssignment.access, 'ASSIGN ROLE', 'delete');
                RoleAssignment._createperm = MainObject.do_IsActionMenuPermission(RoleAssignment.access, 'ASSIGN ROLE', 'create');
                RoleAssignment._deleteperm = MainObject.do_IsActionMenuPermission(RoleAssignment.access, 'ASSIGN ROLE', 'delete');
            }
        }
        else
        {
            if (RoleAssignment.comefrom == 'u')
            {
                RoleAssignment._create_userperm = MainObject.do_IsActionMenuPermission(RoleAssignment.access, 'Role Assignment', 'create');
                RoleAssignment._delete_userperm = MainObject.do_IsActionMenuPermission(RoleAssignment.access, 'Role Assignment', 'delete');
            }
            if (RoleAssignment.comefrom == 'r')
            {
                RoleAssignment._createperm = MainObject.do_IsActionMenuPermission(RoleAssignment.access, 'Role Assignment', 'create');
                RoleAssignment._deleteperm = MainObject.do_IsActionMenuPermission(RoleAssignment.access, 'Role Assignment', 'delete');
            }
        }
    },

};

var getempnameuser = function (sel) {
    $('#txt_username').val($("option:selected", sel).attr("uname"));
    RoleAssignment._userid = $("#selectUser").val();
    localStorage.RoleUserAssignment_callfor = 'u';
    localStorage.RoleUserAssignment_callerid = RoleAssignment._userid;
    if (RoleUserAssignment.bothway == '1') {
        window.location = "role_assignment.aspx";
    }
    else {
        if (queryString('menuid') != undefined || queryString("menuid") != null) {
            window.location = "role_assignment.aspx?t=u" + "&menuid=" + queryString("menuid");
        }
        else {
            window.location = "role_assignment.aspx?t=u";
        }
    }

};
var getempnamerole = function (sel) {
    $('#txt_rolename').val($("option:selected", sel).attr("desc"));
    RoleAssignment._roleid = $("#selectRole").val();
    localStorage.RoleUserAssignment_callfor = 'r';
    localStorage.RoleUserAssignment_callerid = RoleAssignment._roleid;
    if (RoleUserAssignment.bothway == '1') {
        window.location = "role_assignment.aspx";
    }
    else {

        if (queryString('menuid') != undefined || queryString("menuid") != null)
        {
            window.location = "role_assignment.aspx?t=r" + "&menuid=" + queryString("menuid");
        }
        else
        {
            window.location = "role_assignment.aspx?t=r";
        }

      
    }
};

var getdesc = function (sel) {
    if (RoleAssignment.comefrom == 'r') {
        $('#txt_userorrole').val($("option:selected", sel).attr("uname"));
    }
    if (RoleAssignment.comefrom == 'u') {
        $('#txt_userorrole').val($("option:selected", sel).attr("desc"));
    }
};

var showmodal = function () {
    $('.modal-title').html('New Entry');
    $('#dd_userorrole').val('');
    if (RoleAssignment.comefrom == 'u') {
        $("#dd_userorrole").html(RoleAssignment.dd_user);
    }
    else if (RoleAssignment.comefrom == 'r') {
        $("#dd_userorrole").html(RoleAssignment.dd_role);
    }
    $("#dd_userorrole").prepend("<option value='' selected='selected'>Choose...</option>");

    $('#txt_userorrole').val('');
    $("#myModalEDIT").modal('show');
    $('#dd_userorrole').focus();
};

var getempname = function (sel) {
    $('#txt_ename').val($("option:selected", sel).attr("ename"));
};

var dosaveassignment = function () {
    var validate = true;
    //

    var _user = '', _role = '';
    if (RoleAssignment.comefrom == 'u') {
        _user = RoleAssignment._userid;
    }
    if (RoleAssignment.comefrom == 'r') {
        _role = RoleAssignment._roleid;
    }

    if ($('#dd_userorrole').val() == '') {
        validate = false;
        $.alertable.alert(`Id required.`);
        $("#dd_userorrole").focus();
        return false;
    }
    else {
        var _data;
        if (RoleAssignment.comefrom == 'u') {
            _data = '{userid:"' + _user + '", rolecode: "' + $("#dd_userorrole").val() + '"}';
        }
        if (RoleAssignment.comefrom == 'r') {
            _data = '{userid:"' + $("#dd_userorrole").val() + '", rolecode: "' + _role + '"}';
        }

        $.ajax({
            type: "POST",
            url: "role_assignment.aspx/docheckdataexist",
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
                        `Already Exists.\n Please Try Another Code.`
                    );
                    $("#dd_userorrole").focus();
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

        _data["id"] = "";
        if (RoleAssignment.comefrom == 'u') {
            _data["userid"] = _user;
            _data["rolecode"] = $("#dd_userorrole").val();
        }
        else if (RoleAssignment.comefrom == 'r') {
            _data["userid"] = $("#dd_userorrole").val();
            _data["rolecode"] = _role;
        }
        _data["isdefaultrole"] = false;


        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(passdata));

        var _url = "role_assignment.aspx/doSave";
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
                    if (RoleAssignment.comefrom == 'u') {
                        RoleUserAssignment.callfor = 'u';
                        RoleUserAssignment.callerid = _user;
                        window.location = "role_assignment.aspx";
                        //window.location = "role_assignment.aspx?u=" + _user;
                    }
                    else if (RoleAssignment.comefrom == 'r') {
                        localStorage.RoleUserAssignment_callfor = 'r';
                        RoleUserAssignment.callerid = _role;
                        window.location = "role_assignment.aspx";
                        //window.location = "role_assignment.aspx?r=" + _role;
                    }
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
        RoleAssignment.hdnid = roleid;
        RoleAssignment.do_loaddataedit(roleid);
        $('#txt_description').focus();
    }
    else if (mode == 'delete') {
        $.alertable
            .custconfirm(`Are you want to delete the role?`, ``, `Yes`, `No`)
            .then(
                function () {
                    //alert('delete');

                    var _data;
                    _data = '{rowid:"' + roleid + '"}';

                    $.ajax({
                        type: "POST",
                        url: "role_assignment.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                if (RoleAssignment.comefrom == 'u') {
                                    //window.location = "role_assignment.aspx?u=" + RoleAssignment._userid;
                                    RoleUserAssignment.callfor = 'u';
                                    RoleUserAssignment.callerid = RoleAssignment._userid;
                                    window.location = "role_assignment.aspx";
                                }
                                else if (RoleAssignment.comefrom == 'r') {
                                    //window.location = "role_assignment.aspx?r=" + RoleAssignment._roleid;
                                    localStorage.RoleUserAssignment_callfor = 'r';
                                    RoleUserAssignment.callerid = RoleAssignment._roleid;
                                    window.location = "role_assignment.aspx";
                                }
                            } else if (result.d.toLowerCase() == "true") {
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
    else if (mode == 'roleassign') {
        //window.location = "role_assignment.aspx?u=" + roleid;

        localStorage.RoleUserAssignment_callfor = 'u';
        localStorage.RoleUserAssignment_callerid = roleid;
        window.location = "role_assignment.aspx";
    }
    else if (mode == 'applydimension') {
        window.location = "apply_dimension.aspx?u=" + roleid;
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

