var selectData = [];
$(document).ready(function () {
    if (localStorage._userpagemenuid == '' || localStorage._userpagemenuid == undefined) { localStorage._userpagemenuid = localStorage.menu_id_premission; }
    else { localStorage.menu_id_premission = localStorage._userpagemenuid; }
    UsersObject.do_loadusers();
    UsersObject.do_getUserPagepermission();
});

var UsersObject = {
    hdnuserid: '',
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _assignroleperm: false,
    _applydimperm: false,

    _assignrolemenuid: '',
    _applydimmenuid: '',
    _userpagemenuid: '',


    do_loadlookup: (mode) => {
        var _data = {};
        _data["userid"] = UsersObject.hdnuserid;
        _data["cocd"] = $("#ddlCompany").val();
        _data["mode"] = mode;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            async: false,
            url: "user_prototype.aspx/loadlookupdata",
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
                            //employee
                            var _employee = objnew[key];
                            var _html = [];
                            $.each(_employee, function (key, value) {
                                _html.push(
                                    "<option value='" + value.rowid + "' ename='" + value.EName + "'>" + value.pno + "</option>"
                                );
                            });
                            $("#cbo_employee").html(_html.join(""));
                            $("#cbo_employee").prepend("<option value='' ename='' selected='selected'></option>");
                        }

                        if (attrName.toLowerCase() == "table1") {
                            //User Type
                            var _UTyoeCd = objnew[key];
                            var _html = [];
                            $.each(_UTyoeCd, function (key, value) {
                                _html.push(
                                    "<option value='" + value.UTypeCd + "' name='" + value.UTypeCd + "'>" + value.UTypeDesc + "</option>"
                                );
                            });
                            $("#cbo_user_type").html(_html.join(""));
                            $("#cbo_user_type").prepend("<option value='' name='' selected='selected'></option>");
                        }

                        if (attrName.toLowerCase() == "table2") {
                            //Company
                            
                            UsersObject.do_populatecompany(obj, 2);
                            $("#company_users_table_filter").hide();                            
                            $("#company_users_table_wrapper").css("width", "100%");
                            //$('.dt-buttons.btn-group.flex-wrap').hide();
                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });

    },

    do_loadusers: () => {
        
        $.ajax({
            type: "POST",
            url: "user_prototype.aspx/loaduserlist",
            data: JSON.stringify({ CoCd: $("#ddlCompany").val() }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                UsersObject.do_populateusers(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

       do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(UsersObject);
        UsersObject._createperm = MainObject.do_IsActionMenuPermission(UsersObject.access, 'User', 'create');
        UsersObject._editperm = MainObject.do_IsActionMenuPermission(UsersObject.access, 'User', 'edit');
        UsersObject._deleteperm = MainObject.do_IsActionMenuPermission(UsersObject.access, 'User', 'delete');
        UsersObject._assignroleperm = MainObject.do_IsActionMenuPermission(UsersObject.access, 'Assign Role', 'view');
        UsersObject._applydimperm = MainObject.do_IsActionMenuPermission(UsersObject.access, 'Apply Dimension', 'view');

        UsersObject._assignrolemenuid = MainObject.do_IsActionMenuPermission(UsersObject.access, 'Assign Role', 'menuid');
        UsersObject._applydimmenuid = MainObject.do_IsActionMenuPermission(UsersObject.access, 'Apply Dimension', 'menuid');
    },

    do_populateusers: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#coa_accounts_table",
            fields: [
                { label: "PNO", name: "PNO" },
                { label: "EName", name: "EName" },
                { label: "PostingFrom", name: "PostingFrom" },
                { label: "PostingTo", name: "PostingTo" },
                { label: "IsUserBlocked", name: "IsUserBlocked" },
                { label: "UTypeDesc", name: "UTypeDesc" }
            ],
        });

        var userstable = $("#admin_users_table");
        //userstable.html("");

        var usersdata = [];

        for (var i = 0; i < obj.length; i++) {
            var objnew = obj[i];
            for (var key in objnew) {
                var attrName = key;
                if (attrName.toLowerCase() == "table") {
                    usersdata = objnew[key];
                }
            }
        };

        userstable.dataTable({
            dom: "Bfrtip",
            fixedHeader: true,
            data: usersdata,
            columns: [
                { data: "PNO" },
                { data: "EName" },
                { data: "PostingFrom" },
                { data: "PostingTo" },
                { data: "IsUserBlocked" },
                { data: "UTypeDesc" },

                /*{
                    data: "AcId",
                    render: function (data, type, row) {
                        if (data != 0) {
                            return `<i class="fa fa-pencil" aria-hidden="true" style="cursor: pointer;" onclick="editChartofacct('${data}')" title="Edit"></i>&nbsp;&nbsp;<i class="fa fa-eye" aria-hidden="true" style="cursor: pointer;" onclick="viewChartofacct('${data}')" title="View"></i>&nbsp;&nbsp;<i class="fa fa-trash-o" aria-hidden="true" style="cursor: pointer;" onclick="deleteCharttofacct('${data}')" title="Delete"></i>`;
                        } else {
                            return `<i class="fa fa-plus" aria-hidden="true" style="cursor: pointer;" onclick="saveChartofacct();" title="Submit"></i>`;
                        }
                    },
                },*/
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [

                {
                    add: "create", text: 'New', editor: editor, action: function () {
                        useraction($('.selected').attr('userid'), 'new');
                    },
                    attr: {
                        title: 'New',
                        id: 'New_user'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { useraction($('.selected').attr('userid'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'Edit_user'
                    },
                },
                {
                    //extend: "remove", editor: editor
                    extend: "remove", editor: editor, action: function () { useraction($('.selected').attr('userid'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'Delete_user'
                    },
                },
                {
                    //add: "assign_roles", text: 'Assign Roles', editor: editor, action: () => window.open("role_assignment.aspx")
                    add: "assign_roles", text: 'Assign Roles', editor: editor, action: function () { useraction($('.selected').attr('userid'), 'roleassign'); },
                    attr: {
                        title: 'Assign Roles',
                        id: 'Assign_Roles',
                        value: UsersObject._assignrolemenuid[1]
                    },
                },
                {
                    //add: "apply_dimension", text: 'Apply Dimension', editor: editor, action: () => window.open("apply_dimension.aspx")
                    add: "apply_dimension", text: 'Apply Dimension', editor: editor, action: function () { useraction($('.selected').attr('userid'), 'applydimension'); },
                    attr: {
                        title: 'Apply Dimension',
                        id: 'Apply_Dimension',
                        value: UsersObject._applydimmenuid[1]
                    },
                },
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("userid", `${data.UserId}`);
            },
        });

        var table = $('#admin_users_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!UsersObject._deleteperm[0]) {
                    $('#Delete_user').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#Delete_user').prop("disabled", true);
                    $('#Delete_user').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!UsersObject._createperm[0]) {
            $('#New_user').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#New_user').prop("disabled", true);
            $('#New_user').attr('title', 'do not have permission to add user!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!UsersObject._editperm[0]) {
            $('#Edit_user').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Edit_user').prop("disabled", true);
            $('#Edit_user').attr('title', 'do not have permission to edit user!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!UsersObject._deleteperm[0]) {
            $('#Delete_user').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Delete_user').prop("disabled", true);
            $('#Delete_user').attr('title', 'do not have permission to remove user!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
        if (!UsersObject._assignroleperm[0]) {
            $('#Assign_Roles').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Assign_Roles').prop("disabled", true);
            $('#Assign_Roles').attr('title', 'do not have permission to Assign Roles!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
        if (!UsersObject._applydimperm[0]) {
            $('#Apply_Dimension').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Apply_Dimension').prop("disabled", true);
            $('#Apply_Dimension').attr('title', 'do not have permission to Apply Dimension!!!');
            table.button(4).action(function () {
                this.active(false);
            });
        }

    },

    do_populatecompany: (obj, flag) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#company_users_table",
            fields: [
                { label: "selects", name: "Select" },
                { label: "CoCd", name: "CompanyID" },
                { label: "CoName", name: "Company Name" }
            ],
        });

        var companytable = $("#company_users_table");
        var companydata = [];

        for (var i = 0; i < obj.length; i++) {
            var objnew = obj[i];
            for (var key in objnew) {
                var attrName = key;
                if (flag == 1) {
                    if (attrName.toLowerCase() == "table1") {
                        companydata = objnew[key];
                    }
                }
                if (flag == 2) {
                    if (attrName.toLowerCase() == "table2") {
                        companydata = objnew[key];
                    }
                }
            }
        };

        companytable.dataTable({
            searchPanes: {
                controls: false
            },
            dom: "Bfrtip",
            fixedHeader: true,
            destroy: true,
            data: companydata,
            columns: [
                {
                    data: "selects",
                    render: function (data, type, row) {
                        if (data == "true") {
                            return '<input type="checkbox" id= chksel_' + row.Row_Id + ' onclick="selectchange(this);"  checked="checked"  value="' + row.CoCd + '">';
                        }
                        else {
                            return '<input type="checkbox" id= chksel_' + row.Row_Id + ' onclick="selectchange(this);" value="' + row.CoCd + '">';
                        }
                    },
                },
                { data: "CoCd" },
                { data: "CoName" },
            ],
            select: true,
            //scrollX: true,
            lengthMenu: [5, 10, 25, 50],
            buttons: [{                
                init: function (api, node, config) {
                    $(node).removeClass('btn -default')
                }
            }],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("CoCd", `${data.CoCd}`);
            },
        });
    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["userid"] = UsersObject.hdnuserid;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "user_prototype.aspx/doeditUser",
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
                                UsersObject.hdnuserid = objnew[key][0].UserId;
                                $("#cbo_employee").val(objnew[key][0].EmpId);
                                getempname($("#cbo_employee"));
                                $("#txt_password").val(objnew[key][0].password);
                                $("#txt_loginname").val(objnew[key][0].LogInName);
                                $("#txt_postingfrom").val(objnew[key][0].PostingFrom);
                                $("#txt_postingto").val(objnew[key][0].PostingTo);
                                if (objnew[key][0].IsUserBlocked == true) {
                                    $('#chk_isblocked').prop('checked', true);
                                }
                                else {
                                    $('#chk_isblocked').prop('checked', false);
                                }

                                $('.modal-title').html('Edit User');
                                $('#cbo_employee').prop("disabled", true);
                                $("#cbo_user_type").val(objnew[key][0].UTypeCd);
                            }
                        }

                        //if (attrName.toLowerCase() == "table1") {
                        //    UsersObject.do_populatecompany(obj, 1);
                        //    $("#company_users_table_filter").hide();
                        //    $("#company_users_table_wrapper").css("width", "100%");                            
                        //}
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
    $('.modal-title').html('Add User');
    $('#cbo_employee').val('');
    $('#divBlock').hide();
    $('#lbl_ename').text('');
    $("#txt_loginname").val('');
    $('#txt_postingfrom').val(''); 
    $('#txt_password').val('');
    $('#txt_postingto').val('');
    $('#chk_isblocked').prop('checked', false);
    $('#cbo_employee').prop("disabled", false);
    UsersObject.hdnuserid = '';
    $("#myModalEDIT").modal('show');
};

//var showmodaledit = function () {
//    $('.modal-title').html('Edit User');
//    UsersObject.hdnuserid = '1111111';
////    UsersObject.do_loadlookup();
//    //$('#divBlock').prop('display',false);
//    $("#myModalEDIT").modal('show');
//};

var getempname = function (sel) {
    $('#lbl_ename').text($("option:selected", sel).attr("ename"));
};

var saveuser = function () {
    var validate = true;
    //

    if ($("#cbo_employee").val() == "") {
        validate = false;
        $.alertable.alert(`Employee required.`);
        $("#cbo_employee").focus();
        return false;
    }
    
    else {
        var _data = '{userid:"' + UsersObject.hdnuserid + '", empid: "' + $("#cbo_employee").val() + '"}';

        $.ajax({
            type: "POST",
            url: "user_prototype.aspx/docheckuser",
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
                        `User Already Exists.\n Please Try Another User.`
                    );
                    $("#cbo_employee").focus();
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

    if ($("#txt_loginname").val() == "") {
        validate = false;
        $.alertable.alert(`Login Name required.`);
        $("#txt_loginname").focus();
        return false;
    }
    else {
        var _data = '{userid:"' + UsersObject.hdnuserid + '", loginname: "' + $("#txt_loginname").val() + '"}';

        $.ajax({
            type: "POST",
            url: "user_prototype.aspx/docheckloginname",
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
                        `Login Name Already Exists.\n Please Try Another Login Name.`
                    );
                    $("#txt_loginname").focus();
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

    if ($("#cbo_user_type").val() == "") {
        validate = false;
        $.alertable.alert(`User Type is required.`);
        $("#cbo_user_type").focus();
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
        
        _data["userid"] = UsersObject.hdnuserid;
        _data["empid"] = $("#cbo_employee").val();
        _data["password"] = $("#txt_password").val();
        _data["loginname"] = $("#txt_loginname").val();
        _data["postingfrom"] = $('#txt_postingfrom').val();
        _data["postingto"] = $('#txt_postingto').val();
        _data["isblock"] = $("#chk_isblocked").is(':checked');
        _data["UTypeCd"] = $("#cbo_user_type").val();
        _data["CoCd"] = selectData;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(passdata));

        var _url = "user_prototype.aspx/doSaveUser";
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
                    alert(acid + ' ' + 'Data Saved Successfully');
                    window.location = "user_prototype.aspx";
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var selectchange = function (obj) {
    var chk_id = obj.value;
    var idx = $.inArray(chk_id, selectData);
    if (idx >= 0) {
        // Element was found, remove it.
        selectData.splice(idx, 1);
    } else {
        // Element was not found, add it.
        selectData.push(chk_id);
    }
};

var useraction = function (userid, mode) {
    if (mode != 'new') {
        if (userid == "" || userid == undefined || userid == "undefined") return;
    }

    if (mode == 'edit') {
        showmodal();
        UsersObject.hdnuserid = userid;
        UsersObject.do_loadlookup(userid);
        UsersObject.do_loaddataedit(userid);
        $('#txt_postingfrom').focus();
    }
    else if (mode == 'new') {
        showmodal();
        UsersObject.hdnuserid = userid;
        UsersObject.do_loadlookup('new');
        $('#txt_postingfrom').focus();
    }
    else if (mode == 'delete') {
        $.alertable
            .custconfirm(`Are you want to delete the user?`, ``, `Yes`, `No`)
            .then(
                function () {
                    //alert(userid);
                    var _data;
                    _data = '{userid:"' + userid + '"}';

                    $.ajax({
                        type: "POST",
                        url: "user_prototype.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                window.location = "user_prototype.aspx";
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
    else if (mode == 'roleassign') {
       // window.location = "role_assignment.aspx?u=" + userid;
        
        localStorage.RoleUserAssignment_callfor = 'u';
        localStorage.RoleUserAssignment_callerid = userid;
        //window.location = "role_assignment.aspx?t=u";

        window.location = "role_assignment.aspx?t=u" + "&menuid=" + UsersObject._assignrolemenuid[1];
    }
    else if (mode == 'applydimension') {
       // window.location = "apply_dimension.aspx?u=" + userid;
        window.location = "apply_dimension.aspx?u=" + userid + "&menuid=" + UsersObject._applydimmenuid[1];
        
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

