var rolesloadfromdb = false,
    roledata = '',
    asperroleallpages = '';

var RolesObject = {
    rolesdata: [{
        loadfromdb: false,
        rolesdata: '',
        roleshtml: '',
        roleid: '',
        rolename: '',
        actionmode: '',
        userid: ''
    }],

    do_loadroles: () => {
        if (rolesloadfromdb == false) {
            $.ajax({
                type: "POST",
                url: "../handler/Administrator/administrator_handler.aspx/doloadroles",
                data: "",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (result) {
                    if (!dochkses(result.d)) return;
                    var rest = result.d;
                    var resJson = JSON.parse(rest);
                    rolesloadfromdb = true;
                    //console.log(resJson);
                    roledata = resJson.Table;
                    dopopulateroles();
                },
                failure: function (response) {
                    /*alert(response.d);*/
                    alert('Problem in retreiving items...');
                }
            });
        }
        else {
            dopopulaterolesfromobject();
        }
    },

    do_OnRowRole_onclick: (obj) => {
        RolesObject.rolesdata.roleid = $(obj).parent().parent().attr('roleid');
        RolesObject.rolesdata.rolename = $(obj).parent().parent().attr('rolename');
        RolesObject.rolesdata.actionmode = $(obj).attr('mode');
        do_OnRowRole_action();
    },

    do_loadAllPages: () => {

        if (queryString('id') != undefined || queryString("id") != null) {
            RolesObject.rolesdata.roleid = queryString("id");
        }
        else {
            RolesObject.rolesdata.roleid = "";
        }

        var _data = '{roleid: "' + RolesObject.rolesdata.roleid + '"}';

        $.ajax({
            type: "POST",
            url: "../handler/Administrator/administrator_handler.aspx/doloadroledetails",
            data: _data,
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
                        if (attrName.toLowerCase() == "table") {//rolemaster
                            if (objnew[key].length > 0) {
                                RolesObject.rolesdata.rolename = objnew[key][0].rolename;
                                $('#txt_rolename').val(RolesObject.rolesdata.rolename);
                            }
                        }
                        if (attrName.toLowerCase() == "table1") {//roledetails
                            asperroleallpages = objnew[key];
                            $('#tbl_all_pages').html(generatePageList(asperroleallpages));
                        }
                    }
                }
            },
            failure: function (response) {
                /*alert(response.d);*/
                alert('Problem in retreiving items...');
            }
        });
    },

    do_saveroles: () => {
        dosaverole();
    },


    do_loadusers: () => {
        if (rolesloadfromdb == false) {
            $.ajax({
                type: "POST",
                url: "../handler/Administrator/administrator_handler.aspx/doloadusers",
                data: "",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (result) {
                    if (!dochkses(result.d)) return;
                    var rest = result.d;
                    var resJson = JSON.parse(rest);
                    rolesloadfromdb = true;
                    dopopulateusers(resJson.Table);
                },
                failure: function (response) {
                    alert('Problem in retreiving items...');
                }
            });
        }
        else {
            dopopulaterolesfromobject();
        }
    },

    do_fillDDroles: () => {
        $.ajax({
            type: "POST",
            url: "../handler/Administrator/administrator_handler.aspx/doloadroles",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var resJson = JSON.parse(rest);
                roledata = resJson.Table;
                $('#dd_role').append('<option value="">Select Role</option>');
                $.each(roledata, function (key, value) {
                    $('#dd_role').append('<option value="' + value.roleid.toLowerCase() + '">' + value.rolename + '</option>');
                })
            },
            failure: function (response) {
                alert('Problem in retreiving items...');
            }
        });
    },

    do_loadUserModify: () => {

        RolesObject.do_fillDDroles();

        if (queryString('id') != undefined || queryString("id") != null) {
            RolesObject.rolesdata.userid = queryString("id");
        }
        else {
            RolesObject.rolesdata.userid = "";
        }

        if (RolesObject.rolesdata.userid != "") {
            var _data = '{userid: "' + RolesObject.rolesdata.userid + '"}';

            $.ajax({
                type: "POST",
                url: "../handler/Administrator/administrator_handler.aspx/doloaduserdetails",
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
                            if (attrName.toLowerCase() == "table") {//userdetails
                                if (objnew[key].length > 0) {
                                    $('#txt_username').val(objnew[key][0].username);
                                    $('#txt_username').attr('readonly', true);
                                    $('#txt_password').val(objnew[key][0].password);
                                    $('#txt_firstname').val(objnew[key][0].first_name);
                                    $('#txt_lastname').val(objnew[key][0].last_name);
                                    $('#dd_role').val(objnew[key][0].role_id.toLowerCase());
                                }
                            }
                        }
                    }
                },
                failure: function (response) {
                    /*alert(response.d);*/
                    alert('Problem in retreiving items...');
                }
            });
        }
        else {
            $('#txt_username').val("");
            $('#txt_username').removeAttr('readonly');
            $('#txt_password').val("");
            $('#txt_firstname').val("");
            $('#txt_lastname').val("");
            $('#dd_role').val("");
        }
    },

    do_saveuser: () => {
        dosaveuser();
    },

    do_OnRowUser_onclick: (obj) => {
        RolesObject.rolesdata.userid = $(obj).parent().parent().attr('userid');
        RolesObject.rolesdata.actionmode = $(obj).attr('mode');
        do_OnRowUser_action();
    },

};

var dopopulateroles = function () {
    RolesObject.rolesdata.rolesdata = roledata;
    RolesObject.rolesdata.loadfromdb = true;
    var html = '';
    var htmlRoles = [];
    $('#tbl_data').html('');

    html += '<thead><tr>';
    html += '<th style="width: 35%">Role Name</th><th style="width: 20%">Creation Date</th><th style="width: 20%">Last Edit Date</th><th style="width: 9%">Status</th><th style="width: 25%">#Edit</th></tr></thead>';
    html += '<tbody>';

    if (roledata.length == 0) html += '<tr><td clospan="6"> No Data Present </td></tr>';
    else {
        $.each(roledata, function (key, value) {
            html += '<tr roleid="' + value.roleid + '" rolename="' + value.rolename + '"><td><a>' + value.rolename + '</a></td><td>' + value.creationdate + '</td><td>' + value.lasteditdate;
            html += '<td><button type="button" class="btn btn-success btn-xs">' + value.enabled + '</button></td>';
            html += '<td>' +
                '<a class="btn btn-primary btn-xs" style="display:none;" > <i class="fa fa-folder"></i>View </a>' +
                '<a mode="edit" class="btn btn-info btn-xs" onclick=RolesObject.do_OnRowRole_onclick(this)><i class="fa fa-pencil"></i>Edit </a>' +
                '<a mode="delete" style="display:none;" class="btn btn-danger btn-xs" onclick=RolesObject.do_OnRowRole_onclick(this)><i class="fa fa-trash-o"></i>Delete </a>' +
                '</td></tr>';

        });
    }
    html += '</tbody>';
    RolesObject.rolesdata.roleshtml = html;
    $('#tbl_data').html(RolesObject.rolesdata.roleshtml);
};

var dopopulaterolesfromobject = function () {
    $('#tbl_data').html(RolesObject.rolesdata.roleshtml);
};

var getchange = function (checkbox) {
    if (checkbox.checked == true) {
        if ($('#' + checkbox.id).attr("checktype") == "visibleAll") {
            $("[checktype='visible']").prop("checked", true);
        }
        else if ($('#' + checkbox.id).attr("checktype") == "addAll") {
            $("[checktype='add']").prop("checked", true);
        }
        else if ($('#' + checkbox.id).attr("checktype") == "editAll") {
            $("[checktype='edit']").prop("checked", true);
        }
        else if ($('#' + checkbox.id).attr("checktype") == "deleteAll") {
            $("[checktype='delete']").prop("checked", true);
        }
       
    } else {
        if ($('#' + checkbox.id).attr("checktype") == "visibleAll") {
            $("[checktype='visible']").prop("checked", false);
        }
        else if ($('#' + checkbox.id).attr("checktype") == "addAll") {
            $("[checktype='add']").prop("checked", false);
        }
        else if ($('#' + checkbox.id).attr("checktype") == "editAll") {
            $("[checktype='edit']").prop("checked", false);
        }
        else if ($('#' + checkbox.id).attr("checktype") == "deleteAll") {
            $("[checktype='delete']").prop("checked", false);
        }
    }
};

var generatePageList = function (arrayPages) {
    var html = '';
    $('#tbl_all_pages').html('');

    html += '<thead><tr>' +
        '<th>Page Name</th>' +
        '<th>View <input id="chkviewall" value="view" checktype="visibleAll" type="checkbox" class="largerCheckbox" onchange="getchange(this); "></th>' +
        '<th>Add <input id="chkaddall" checktype="addAll" type="checkbox" class="largerCheckbox" onchange="getchange(this); "></th>' +
        '<th>Edit <input id="chkeditall" checktype="editAll" type="checkbox" class="largerCheckbox" onchange="getchange(this); "></th>' +
        '<th>Delete <input id="chkdelall" checktype="deleteAll" type="checkbox" class="largerCheckbox" onchange="getchange(this); "></th>' +
        '</tr></thead>';
    html += '<tbody>';

    /*
     * $('#checkBox1').is(":checked")
     <tr>
        <td>Master</td>
        <td>
            <input type="checkbox" class="largerCheckbox" name="checkBox1">
        </td>

        <td><input type="checkbox" class="largerCheckbox" name="checkBox2"></td>
        <td><input type="checkbox" class="largerCheckbox" name="checkBox3"></td>
        <td><input type="checkbox" class="largerCheckbox" name="checkBox4"></td>
     </tr>
     */


    //var html = '<h3>' + MainObject.usermenu.userrolename + '</h3><ul class="nav side-menu">';
    var subpage = [];
    var subsubpage = [];

    $.each(arrayPages, function (k, item) {
        if (item.PARENT_ID == 0) {
            html += '<tr id="tr_"' + item.MENU_ID + '">' +
                '<td colspan="5" MENU_ID="' + item.MENU_ID + '"  PARENT_ID="' + item.PARENT_ID + '" MENU_NAME="' + item.MENU_NAME + '"  MENU_CAPTION="' + item.MENU_CAPTION + '" ACTION_LINK="' + item.ACTION_LINK + '">' + item.MENU_NAME + '</td>';
            if (item.isview == 1)
                html += '<td style="display:none;"><input checked="checked" checktype="visible" type="checkbox" class="largerCheckbox"></td>';
            else
                html += '<td style="display:none;"><input checktype="visible" type="checkbox" class="largerCheckbox"></td>';

            if (item.isadd == 1)
                html += '<td style="display:none;"><input checked="checked" checktype="add" type="checkbox" class="largerCheckbox"></td>';
            else
                html += '<td style="display:none;"><input checktype="add" type="checkbox" class="largerCheckbox"></td>';

            if (item.isedit == 1)
                html += '<td style="display:none;"><input checked="checked" checktype="edit" type="checkbox" class="largerCheckbox"></td>';
            else
                html += '<td style="display:none;"><input checktype="edit" type="checkbox" class="largerCheckbox"></td>';

            if (item.isdelete == 1)
                html += '<td style="display:none;"><input checked="checked" checktype="delete" type="checkbox" class="largerCheckbox"></td>';
            else
                html += '<td style="display:none;"><input checktype="delete" type="checkbox" class="largerCheckbox"></td>';

            html += '</tr>';

            subpage = [];
            subpage = getchildpage(item.MENU_ID);

            if (subpage.length > 0) {
                $.each(subpage, function (i, val) {
                    var _isshow = "", _colspan = "";
                    if ($.trim(val.ACTION_LINK) == "#") {
                        _isshow = 'style="display:none;"';
                        _colspan = ' colspan="5" ';
                    }

                    html += '<tr id="tr_"' + val.MENU_ID + '">' +
                        '<td' + _colspan + ' MENU_ID="' + val.MENU_ID + '"  PARENT_ID="' + val.PARENT_ID + '" MENU_NAME="' + val.MENU_NAME + '"  MENU_CAPTION="' + val.MENU_CAPTION + '" ACTION_LINK="' + val.ACTION_LINK + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + val.MENU_NAME + '</td>';
                    if (val.isview == 1)
                        html += '<td' + _isshow + '><input checked="checked" checktype="visible" type="checkbox" class="largerCheckbox"></td>';
                    else
                        html += '<td' + _isshow + '><input checktype="visible" type="checkbox" class="largerCheckbox"></td>';

                    if (val.isadd == 1)
                        html += '<td' + _isshow + '><input checked="checked" checktype="add" type="checkbox" class="largerCheckbox"></td>';
                    else
                        html += '<td' + _isshow + '><input checktype="add" type="checkbox" class="largerCheckbox"></td>';

                    if (val.isedit == 1)
                        html += '<td' + _isshow + '><input checked="checked" checktype="edit" type="checkbox" class="largerCheckbox"></td>';
                    else
                        html += '<td' + _isshow + '><input checktype="edit" type="checkbox" class="largerCheckbox"></td>';

                    if (val.isdelete == 1)
                        html += '<td' + _isshow + '><input checked="checked" checktype="delete" type="checkbox" class="largerCheckbox"></td>';
                    else
                        html += '<td' + _isshow + '><input checktype="delete" type="checkbox" class="largerCheckbox"></td>';

                    html += '</tr>';


                    subsubpage = [];
                    subsubpage = getchildpage(val.MENU_ID);
                    if (subsubpage.length > 0) {
                        $.each(subsubpage, function (i, val) {
                            html += '<tr id="tr_"' + val.MENU_ID + '">' +
                                '<td MENU_ID="' + val.MENU_ID + '"  PARENT_ID="' + val.PARENT_ID + '" MENU_NAME="' + val.MENU_NAME + '"  MENU_CAPTION="' + val.MENU_CAPTION + '" ACTION_LINK="' + val.ACTION_LINK + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + val.MENU_NAME + '</td>';
                            if (val.isview == 1)
                                html += '<td><input checked="checked" checktype="visible" type="checkbox" class="largerCheckbox"></td>';
                            else
                                html += '<td><input checktype="visible" type="checkbox" class="largerCheckbox"></td>';

                            if (val.isadd == 1)
                                html += '<td><input checked="checked" checktype="add" type="checkbox" class="largerCheckbox"></td>';
                            else
                                html += '<td><input checktype="add" type="checkbox" class="largerCheckbox"></td>';

                            if (val.isedit == 1)
                                html += '<td><input checked="checked" checktype="edit" type="checkbox" class="largerCheckbox"></td>';
                            else
                                html += '<td><input checktype="edit" type="checkbox" class="largerCheckbox"></td>';

                            if (val.isdelete == 1)
                                html += '<td><input checked="checked" checktype="delete" type="checkbox" class="largerCheckbox"></td>';
                            else
                                html += '<td><input checktype="delete" type="checkbox" class="largerCheckbox"></td>';

                            html += '</tr>';

                        });

                    }
                });

            }

        }

    });

    html += '<tbody>';

    return html;
};

var getchildpage = function (parentid) {

    var array1 = [];
    var array2 = [];

    array1 = asperroleallpages;

    array2 = [];

    $.each(array1, function (i, val) {
        if ($.trim(val.PARENT_ID) == parentid) {
            array2.push({
                MENU_ID: val.MENU_ID,
                PARENT_ID: val.PARENT_ID,
                MENU_NAME: val.MENU_NAME,
                MENU_CAPTION: val.MENU_CAPTION,
                ACTION_LINK: val.ACTION_LINK,
                Level: val.Level,
                LEVELs: val.LEVELs,
                ORDER: val.ORDER,
                isview: val.isview,
                isadd: val.isadd,
                isedit: val.isedit,
                isdelete: val.isdelete
            });
        }
    });

    return array2;

};

var dosaverole = function () {

    var validate = true;

    if ($('#txt_rolename').val() == '') {
        validate = false;
        alert('Role Name Required.');
        return false;
    }
    else {
        var _data = '{roleid: "' + RolesObject.rolesdata.roleid + '", rolename: "' + encodeURIComponent($('#txt_rolename').val().trim()) + '"}';

        $.ajax({
            type: "POST",
            url: "../handler/Administrator/administrator_handler.aspx/docheckrolename",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") {
                    validate = false;
                    alert("Role Name Already Exists.\n Please Try Another Role Name.");
                    $('#txt_rolename').focus();
                    return false;
                }
            },
            failure: function (response) {
                alert('Problem in retreiving items...');
            }
        });
    }

    var _srl = 0;
    var _getforsavevall = [];

    if (validate == true) {
        $('#tbl_all_pages').find('tr').each(function (i, el) {
            var $tds = $(this).find('td'),
                menu_id = $tds.eq(0).attr('MENU_ID'),
                parent_id = $tds.eq(0).attr('PARENT_ID'),
                menu_name = $tds.eq(0).attr('MENU_NAME'),
                menu_caption = $tds.eq(0).attr('MENU_CAPTION'),
                action_link = $tds.eq(0).attr('ACTION_LINK'),
                menuname = $tds.eq(0).text(),
                isvisible = $tds.eq(1).find("[checktype='visible']"),
                isadd = $tds.eq(2).find("[checktype='add']"),
                isedit = $tds.eq(3).find("[checktype='edit']"),
                isdelete = $tds.eq(4).find("[checktype='delete']");

            if (_srl != 0) {
                _getforsavevall.push({
                    serial: _srl,
                    MENU_ID: menu_id,
                    PARENT_ID: parent_id,
                    MENU_NAME: menu_name,
                    MENU_CAPTION: menu_caption,
                    ACTION_LINK: action_link,
                    isallowvisible: isvisible.is(":checked"),
                    isallowadd: isadd.is(":checked"),
                    isallowedit: isedit.is(":checked"),
                    isallowdelete: isdelete.is(":checked")
                });
            }
            _srl = _srl + 1;
        });

        var _data = {};
        _data["roleid"] = RolesObject.rolesdata.roleid;
        _data["rolename"] = $('#txt_rolename').val();
        _data["roledtls"] = JSON.stringify(_getforsavevall);

        var passdata = {
            data: ""
        };
        passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "../handler/Administrator/administrator_handler.aspx/doSaveRoleDetails",
            data: JSON.stringify(passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") { RolesObject.rolesdata.roleid = ""; alert("Role saved successfully."); window.location = "roles.aspx"; }
                else { alert("Problem in saving data...\n Please Try Again."); }
            },
            failure: function (response) {
                /*alert(response.d);*/
                alert('Problem in saving data...');
            }
        });
    }
};

var do_OnRowRole_action = function () {

    if (RolesObject.rolesdata.actionmode == 'edit') {
        window.location.assign("rolenew.aspx?id=" + RolesObject.rolesdata.roleid);
    }
};

var dopopulateusers = function (userdata) {
    var html = '';
    var visstyle = '';
    var htmlRoles = [];
    $('#tbl_data').html('');

    html += '<thead><tr>';
    html += '<th style="width: 35%">User Name</th><th style="width: 35%">Role</th><th style="width: 20%">Creation Date</th><th style="width: 20%">Last Edit Date</th><th style="width: 9%">Status</th><th style="width: 25%">#Edit</th></tr></thead>';
    html += '<tbody>';

    if (userdata.length == 0) html += '<tr><td clospan="7"> No Data Present </td></tr>';
    else {
        $.each(userdata, function (key, value) {

            if (value.userid.toLowerCase() == '00000000-0000-0000-0000-0000000000ad')
                visstyle = ' style="display:none;"';
            else
                visstyle = '';

            html += '<tr userid="' + value.userid + '"><td><a>' + value.username + '</a></td><td>' + value.rolename + '</td><td>' + value.creationdate + '</td><td>' + value.lasteditdate + '</td>';
            html += '<td><button type="button" class="btn btn-success btn-xs">' + value.enabled + '</button></td>';
            html += '<td>' +
                '<a class="btn btn-primary btn-xs" style="display:none;" > <i class="fa fa-folder"></i>View </a>' +
                '<a mode="edit" ' + visstyle + ' class="btn btn-info btn-xs" onclick=RolesObject.do_OnRowUser_onclick(this)><i class="fa fa-pencil"></i>Edit </a>' +
                '<a mode="delete" style="display:none;" class="btn btn-danger btn-xs" onclick=RolesObject.do_OnRowUser_onclick(this)><i class="fa fa-trash-o"></i>Delete </a>' +
                '</td></tr>';

        });
    }
    html += '</tbody>';
    $('#tbl_data').html(html);
};

var dosaveuser = function () {

    var validate = true;

    if ($('#txt_username').val() == '') {
        validate = false;
        alert('User Name Required.');
        return;
    }
    else {
        var _data = '{userid: "' + RolesObject.rolesdata.userid + '", username: "' + encodeURIComponent($('#txt_username').val().trim()) + '"}';

        $.ajax({
            type: "POST",
            url: "../handler/Administrator/administrator_handler.aspx/docheckusername",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") {
                    validate = false;
                    alert("User Name Already Exists.\n Please Try Another User Name.");
                    $('#txt_username').focus();
                    return;
                }
            },
            failure: function (response) {
                alert('Problem in retreiving items...');
            }
        });
    }

    if ($('#txt_password').val() == '') {
        validate = false;
        alert('Password Required.');
        return;
    }
    if ($('#txt_firstname').val() == '') {
        validate = false;
        alert('First Name Required.');
        return;
    }
    if ($('#txt_lastname').val() == '') {
        validate = false;
        alert('Last Name Required.');
        return;
    }
    if ($('#dd_role').val() == '') {
        validate = false;
        alert('Role Required.');
        return;
    }


    if (validate == true) {
        var _data = {};
        _data["userid"] = RolesObject.rolesdata.userid;
        _data["username"] = $('#txt_username').val().trim();
        _data["userpassword"] = $('#txt_password').val().trim();
        _data["userfirstname"] = $('#txt_firstname').val().trim();
        _data["userlstname"] = $('#txt_lastname').val().trim();
        _data["userroleid"] = $('#dd_role').val();

        var passdata = {
            data: ""
        };
        passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "../handler/Administrator/administrator_handler.aspx/doSaveUserDetails",
            data: JSON.stringify(passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") { RolesObject.rolesdata.userid = ""; alert("User saved successfully."); window.location = "users.aspx"; }
                else { alert("Problem in saving data...\n Please Try Again."); }
            },
            failure: function (response) {
                /*alert(response.d);*/
                alert('Problem in saving data...');
            }
        });
    }
};

var do_OnRowUser_action = function () {

    if (RolesObject.rolesdata.actionmode == 'edit') {
        window.location.assign("usernew.aspx?id=" + RolesObject.rolesdata.userid);
    }
};

