$(document).ready(function () {
    RolePermissionObject.do_loadCombo();
    //RolePermissionObject.do_loadAllPages();
    RolePermissionObject.do_getUserPagepermission();
});

var RolePermissionObject = {
    rolespermissiondata: [{
        loadfromdb: false,
        rolesdata: '',
        roleshtml: '',
        roleid: '',
        rolename: '',
        actionmode: '',
        userid: '',
        rolecd: '',
        permissionchanged: 0,
        changeforrole: 0,
        changeforuser: 0,
        _createperm: false,
    }],

    do_loadCombo: () => {
        $.ajax({
            type: "POST",
            url: "role_permissions.aspx/doPopulateDD",
            data: JSON.stringify({ CoCd: $("#ddlCompany").val() }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                //var rest = result.d;
                //console.log(rest);
                var obj = JSON.parse(`[${result.d}]`);

                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = key;
                        if (attrName.toLowerCase() == "table") {
                            //debugger;
                            if (objnew[key].length > 0) {
                                var role = objnew[key];
                                //RolePermissionObject.rolespermissiondata.rolename = objnew[key][0].rolename;
                                //$('#txt_rolename').val(RolesObject.rolesdata.rolename);
                                
                                $('#selectRole').append('<option value="" description="">Choose Role</option>');
                                $.each(role, function (key, value) {
                                    $('#selectRole').append('<option value="' + value.RoleCd.toLowerCase() + '" description="' + value.Description + '" rolecentercode="' + value.RoleCenterCd + '">' + value.RoleCd + '</option>');
                                });

                            }
                        }
                        if (attrName.toLowerCase() == "table1") {
                            if (objnew[key].length > 0) {
                                var users = objnew[key];
                                $('#selectUser').append('<option value="" description="">Choose User</option>');
                                $.each(users, function (key, value) {
                                    $('#selectUser').append('<option value="' + value.UserId.toLowerCase() + '" empid="' + value.EmpId + '" ename="' + value.EName + '">' + value.PNO + '</option>');
                                });
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
    },

    do_getUserPagepermission: () =>
    {
        MainObject.do_getuserpageaccess(RolePermissionObject);
        RolePermissionObject._createperm = MainObject.do_IsActionMenuPermission(RolePermissionObject.access, 'RIGHTS AND PERMISSIONS', 'create');

        if (!RolePermissionObject._createperm[0]) {
            $('#btn_submit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#btn_submit').prop("disabled", true);
            $('#btn_submit').attr('title', 'do not have save permission !!!');
        }
    },
   
    do_loadAllPages: (rolecd, userid, type) => {
        if (rolecd != undefined && userid == undefined) RolePermissionObject.rolespermissiondata.rolecd = rolecd;
        if (rolecd == undefined && userid != undefined) RolePermissionObject.rolespermissiondata.userid = userid;

        //RolePermissionObject.rolespermissiondata.userid = '';
        //var _data = '{rolecd: "' + RolePermissionObject.rolespermissiondata.rolecd + '", userid: "' + RolePermissionObject.rolespermissiondata.userid + '"}';
        var _data;
        var _url = '';
        RolePermissionObject.rolespermissiondata.permissionchanged = 0;
        old_cdata_json = [];
        new_cdata_json = [];
        $('#div_iscustomrole').hide();

        if (type == 'R') {
            //_data = '{pno: "' + rolecd + '", type: "' + type + '"}';
            RolePermissionObject.rolespermissiondata.userid = '';
            RolePermissionObject.rolespermissiondata.changeforrole = 1;
            RolePermissionObject.rolespermissiondata.changeforuser = 0;
            //var _data = '{rolecd: "' + RolePermissionObject.rolespermissiondata.rolecd + '", userid: "' + RolePermissionObject.rolespermissiondata.userid + '"}';
            //_url = "role_permissions.aspx/dogetRolePermissions";
            _data = '{pno: "' + RolePermissionObject.rolespermissiondata.rolecd + '", type: "' + type + '"}';
            _url = "role_permissions.aspx/dogetLoadPermissions";
        }
        else if (type == 'U') {
            RolePermissionObject.rolespermissiondata.changeforrole = 0;
            RolePermissionObject.rolespermissiondata.changeforuser = 1;
            _data = '{pno: "' + $("option:selected", selectUser).text() + '", type: "' + type + '"}';
            _url = "role_permissions.aspx/dogetLoadPermissions";
        }

        //dogetRolePermissions",
        $.ajax({
            type: "POST",
            url: _url,
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                //console.log(rest);
                var obj = JSON.parse(`[${result.d}]`);

                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = key;
                        /*if (attrName.toLowerCase() == "table") {
                            if (objnew[key].length > 0) {
                                RolePermissionObject.rolespermissiondata.rolename = objnew[key][0].rolename;
                                //$('#txt_rolename').val(RolesObject.rolesdata.rolename);
                            }
                        }*/
                        if (attrName.toLowerCase() == "table") {//roledetails
                            asperroleallpages = objnew[key];
                            $('#myUL').html('');
                            $('#myUL').html(generatePageList(asperroleallpages));

                            var toggler = document.getElementsByClassName("caret");
                            var i;

                            for (i = 0; i < toggler.length; i++) {
                                toggler[i].addEventListener("click", function () {
                                    this.parentElement.querySelector(".nested").classList.toggle("active");
                                    this.classList.toggle("caret-down");
                                });
                            }

                        }

                        if (type == 'U') {
                            $('#div_iscustomrole').show();
                            if (attrName.toLowerCase() == "table1") {//customrole
                                var customrole = objnew[key];
                                //console.log(customrole);
                                if (customrole[0].IsCustomRole == false) {
                                    $('#chk_iscustomrole').attr('disabled', 'disabled');
                                    $('#chk_iscustomrole').prop('checked', false);
                                }
                                else {
                                    $('#chk_iscustomrole').removeAttr('disabled');
                                    //$('#chk_iscustomrole').attr('checked', 'checked');
                                    $('#chk_iscustomrole').prop('checked', true);
                                }
                                //alert(customrole[0].IsCustomRole);
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
    },
};

var generatePageList = function (arrayPages) {
    var html = '';
    var subpage = [];
    var subsubpage = [];
    var subsubsubpage = [];

    var subpage1 = [];
    var subpage1pages = [];

    var parentid = '', parentparentid = '', parentparentparentid = '', parentparentparentparentid = '';

    $.each(arrayPages, function (k, item) {
        if (item.PARENT_ID == 0) {
            parentid = item.PARENT_ID;
            html += "<li id='li_" + item.MENU_ID + "' parentid='" + parentid + "' menulink='" + item.ACTION_LINK + "'  menuid='" + item.MENU_ID + "' onclick='onchangeparent(this);'><span class='caret' id='span_" + item.MENU_ID +"'>" + $.trim(item.MENU_NAME) + "</span>";
            html += "<ul class='nested' id='ul_"+ item.MENU_ID +"'>";
            subpage = [];
            subpage = getchildpage(item.MENU_ID);
            if (subpage.length > 0) {
                $.each(subpage, function (i, val) {
                    subsubpage = [];
                    subsubpage = getchildpage_withounthashlink(val.MENU_ID);
                    parentparentid = val.PARENT_ID
                    /*if (subsubpage.length > 0) {
                        $.each(subsubpage, function (i, val) {
                        });
                    }*/

                    subsubsubpage = [];
                    subsubsubpage = getchildpage_withhashlink(val.MENU_ID);
                    if (subsubsubpage.length <= 0) {
                        html += "<li id='li_" + val.MENU_ID + "' parentid='" + parentid + "' parentparentid='" + parentparentid + "' menulink='" + val.ACTION_LINK + "' menuid='" + val.MENU_ID + "' style='cursor: pointer;' cdata='" + JSON.stringify(subsubpage) + "' onclick='getPages(event,this);'>" + $.trim(val.MENU_NAME) + "</li>";
                    }
                    else {
                        html += "<li id='li_" + val.MENU_ID + "' parentid='" + parentid + "' parentparentid='" + parentparentid + "' menulink='" + val.ACTION_LINK + "'  menuid='" + val.MENU_ID + "'  cdata='" + JSON.stringify(subsubpage) + "'  onclick='getPages(event,this);'><span class='caret' id='span_" + item.MENU_ID +"'>" + $.trim(val.MENU_NAME) + "</span>";
                        html += "<ul class='nested' id='ul_" + item.MENU_ID +"'>";
                        subpage1 = [];
                        subpage1 = getchildpage_withhashlink(val.MENU_ID);
                        
                        if (subpage1.length > 0) {
                            $.each(subpage1, function (i, val) {
                                subpage1pages = [];
                                subpage1pages = getchildpage_withounthashlink(val.MENU_ID);
                                parentparentparentid = val.PARENT_ID;
                                html += "<li id='li_" + val.MENU_ID + "' parentid='" + parentid + "' parentparentid='" + parentparentid + "' parentparentparentid='" + parentparentparentid + "'  menulink='" + val.ACTION_LINK + "' menuid='" + val.MENU_ID + "' style='cursor: pointer;' 1=1 cdata='" + JSON.stringify(subpage1pages) + "' onclick='getPages(event,this);'>" + $.trim(val.MENU_NAME) + "</li>";
                            });
                        }

                        html += "</ul>";
                        html += "</li>";
                    }


                });

            }
            html += "</ul>";
            html += "</li>";
        }
    });

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
                MenuFunction: val.MenuFunction,
                MenuPath: val.MenuPath,
                Level: val.Level,
                LEVELs: val.LEVELs,
                ORDER: val.ORDER,
                isview: (val.isview == true) ? 1 : 0, //val.isview,
                isadd: (val.isadd == true) ? 1 : 0, //val.isadd,
                isedit: (val.isedit == true) ? 1 : 0, //val.isedit,
                isdelete: (val.isdelete == true) ? 1 : 0 //val.isdelete
            });
        }
    });

    return array2;

};

var getchildpage_withounthashlink = function (parentid) {

    var array1 = [];
    var array2 = [];

    array1 = asperroleallpages;

    array2 = [];

    $.each(array1, function (i, val) {
        if ($.trim(val.PARENT_ID) == parentid && $.trim(val.ACTION_LINK) != '#') {
            array2.push({
                MENU_ID: val.MENU_ID,
                PARENT_ID: val.PARENT_ID,
                MENU_NAME: val.MENU_NAME,
                MENU_CAPTION: val.MENU_CAPTION,
                ACTION_LINK: val.ACTION_LINK,
                MenuFunction: val.MenuFunction,
                MenuPath: val.MenuPath,
                Level: val.Level,
                LEVELs: val.LEVELs,
                ORDER: val.ORDER,
                isview: (val.isview == true) ? 1 : 0, //val.isview,
                isadd: (val.isadd == true) ? 1 : 0, //val.isadd,
                isedit: (val.isedit == true) ? 1 : 0, //val.isedit,
                isdelete: (val.isdelete == true) ? 1 : 0 //val.isdelete
            });
        }
    });

    return array2;

};

var getchildpage_withhashlink = function (parentid) {

    var array1 = [];
    var array2 = [];

    array1 = asperroleallpages;

    array2 = [];

    $.each(array1, function (i, val) {
        if ($.trim(val.PARENT_ID) == parentid && $.trim(val.ACTION_LINK) == '#') {
            array2.push({
                MENU_ID: val.MENU_ID,
                PARENT_ID: val.PARENT_ID,
                MENU_NAME: val.MENU_NAME,
                MENU_CAPTION: val.MENU_CAPTION,
                ACTION_LINK: val.ACTION_LINK,
                MenuFunction: val.MenuFunction,
                MenuPath: val.MenuPath,
                Level: val.Level,
                LEVELs: val.LEVELs,
                ORDER: val.ORDER,
                isview: (val.isview == true) ? 1 : 0, //val.isview,
                isadd: (val.isadd == true) ? 1 : 0, //val.isadd,
                isedit: (val.isedit == true) ? 1 : 0, //val.isedit,
                isdelete: (val.isdelete == true) ? 1 : 0 //val.isdelete
            });
        }
    });

    return array2;

};

var getchildchildpage = function (parentid) {

    var array1 = [];
    var array2 = [];

    array1 = asperroleallpages;

    array2 = [];

    $.each(array1, function (i, val) {
        if ($.trim(val.PARENT_ID) == parentid && $.trim(val.ACTION_LINK)=='#') {
            array2.push({
                MENU_ID: val.MENU_ID,
                PARENT_ID: val.PARENT_ID,
                MENU_NAME: val.MENU_NAME,
                MENU_CAPTION: val.MENU_CAPTION,
                ACTION_LINK: val.ACTION_LINK,
                MenuFunction: val.MenuFunction,
                MenuPath: val.MenuPath,
                Level: val.Level,
                LEVELs: val.LEVELs,
                ORDER: val.ORDER,
                isview: (val.isview == true) ? 1 : 0, //val.isview,
                isadd: (val.isadd == true) ? 1 : 0, //val.isadd,
                isedit: (val.isedit == true) ? 1 : 0, //val.isedit,
                isdelete: (val.isdelete == true) ? 1 : 0 //val.isdelete
            });
        }
    });

    return array2;

};

var old_cdata_json = [];
var new_cdata_json = [];

var getPages = function (e, obj) {
    e.stopPropagation();

    //$(".active").removeClass("active").addClass("");

    if (old_cdata_json.length > 0 && new_cdata_json.length > 0) {
        if (JSON.stringify(old_cdata_json) == JSON.stringify(new_cdata_json)) {
            //alert('Collections are equal');
            RolePermissionObject.rolespermissiondata.permissionchanged = 0;
        } else {
            //alert('Collections are not equal');
            RolePermissionObject.rolespermissiondata.permissionchanged = 1;
        }
    }
    else {
        RolePermissionObject.rolespermissiondata.permissionchanged = 0;
    }

    if (RolePermissionObject.rolespermissiondata.permissionchanged == 1) {
        $.alertable.alert(
            `You Changed the permisson of page. Need to Save the permission changes.`
        );

        return;
    }    

    var li_id = obj.id;
    $(".selectedmenuforpages").removeClass("selectedmenuforpages").addClass("");
    $('#' + obj.id).addClass("selectedmenuforpages");


    var parent_menuid = $('#' + li_id).attr('menuid');
    var parentparent_menuid = $('#' + li_id).attr('parentparentparentid');
    var parentparentparent_menuid = $('#' + li_id).attr('parentparentid');
    var parentparentparentparent_menuid = $('#' + li_id).attr('parentid');
    var cdata_json = [];
    var _html = [];
    cdata_json = JSON.parse($('#' + li_id).attr('cdata'));
    old_cdata_json = [];
    old_cdata_json = cdata_json;
    new_cdata_json = [];
    //console.log(cdata_json);

    $('#role_permission_table_body').html('');


    var _isview = '', _isadd = '', _isedit = '', _isdelete = '', _isall = '';
    var x = 0;
    _html = [];
    $.each(cdata_json, function (i, val) {
        _isview = '', _isadd = '', _isedit = '', _isdelete = '', _isall = '';

        if (val.isview == true || val.isview == 1) _isview = "checked = 'checked'";
        if (val.isadd == true || val.isadd == 1) _isadd = "checked = 'checked'";
        if (val.isedit == true || val.isedit == 1) _isedit = "checked = 'checked'";
        if (val.isdelete == true || val.isdelete == 1) _isdelete = "checked = 'checked'";

        if ((val.isview == true || val.isview == 1) && (val.isadd == true || val.isadd == 1) && (val.isedit == true || val.isedit == 1) && (val.isdelete == true || val.isdelete == 1)) _isall = "checked = 'checked'";

        _html.push("<tr parentmenuid='" + li_id + "' parent_id='" + parent_menuid + "' parentparent_menuid='" + parentparent_menuid + "' parentparentparent_menuid='" + parentparentparent_menuid + "' parentparentparentparent_menuid='" + parentparentparentparent_menuid +"' menuid='" + val.MENU_ID + "' id='tr_" + i + "'>");
        _html.push("<td parnetmenuid='" + li_id + "' parent_id='" + parent_menuid + "' menuid='" + val.MENU_ID + "'>" + $.trim(val.MENU_NAME) + "</td>");
        _html.push("<td parnetmenuid='" + li_id + "' parent_id='" + parent_menuid + "' menuid='" + val.MENU_ID + "'>" + $.trim(val.MenuFunction) + "</td>");
        _html.push("<td parnetmenuid='" + li_id + "' parent_id='" + parent_menuid + "' menuid='" + val.MENU_ID + "'><input type='checkbox' checktype='visible' permtype='view' id='chk_view_" + val.MENU_ID + "' onclick='allowperm(this);' " + _isview + "></td>");
        _html.push("<td parnetmenuid='" + li_id + "' parent_id='" + parent_menuid + "' menuid='" + val.MENU_ID + "'><input type='checkbox' checktype='add' permtype='add' id='chk_add_" + val.MENU_ID + "' onclick='allowperm(this);'  " + _isadd + "></td>");
        _html.push("<td parnetmenuid='" + li_id + "' parent_id='" + parent_menuid + "' menuid='" + val.MENU_ID + "'><input type='checkbox' checktype='edit' permtype='edit' id='chk_edit_" + val.MENU_ID + "' onclick='allowperm(this);'  " + _isedit + "></td>");
        _html.push("<td parnetmenuid='" + li_id + "' parent_id='" + parent_menuid + "' menuid='" + val.MENU_ID + "'><input type='checkbox' checktype='delete' permtype='delete' id='chk_delete_" + val.MENU_ID + "' onclick='allowperm(this);'  " + _isdelete + "></td>");
        _html.push("<td parnetmenuid='" + li_id + "' parent_id='" + parent_menuid + "' menuid='" + val.MENU_ID + "'><input type='checkbox' permtype='all' srl='" + val.MENU_ID + "' id='chk_all_" + val.MENU_ID + "' onclick='allowperm(this);' " + _isall + "></td>");
        _html.push("<td parnetmenuid='" + li_id + "' parent_id='" + parent_menuid + "' menuid='" + val.MENU_ID + "'>" + $.trim(val.MenuPath) + "</td>");
        _html.push("<td parnetmenuid='" + li_id + "' parent_id='" + parent_menuid + "' menuid='" + val.MENU_ID + "'>" + $.trim(val.ACTION_LINK) + "</td>");
        _html.push("</tr>");
        x = x + 1;
        //console.log(x + '  ' + cdata_json.length);
    });
    $("#role_permission_table_body").append(_html.join(''));

    return false;
};

var allowperm = function (obj) {
    
    var chk_id = obj.id;
    var _ischecked = 0;// false;
    if ($('#' + chk_id).prop('checked')) {
        _ischecked = 1;//true;
    }
    else {
        _ischecked = 0;//false;
    }
    var type = $('#' + chk_id).attr('permtype');
    var parentmenuid = $('#' + chk_id).parent().attr('parnetmenuid');
    var parent_id = $('#' + chk_id).parent().attr('parent_id');
    var menu_id = $('#' + chk_id).parent().attr('menuid');

    if (type == 'all') {
        var _srl = $('#' + chk_id).attr('srl');
        if (_ischecked == 1) {
            $("#chk_view_" + _srl).prop("checked", true);
            $("#chk_add_" + _srl).prop("checked", true);
            $("#chk_edit_" + _srl).prop("checked", true);
            $("#chk_delete_" + _srl).prop("checked", true);

        }
        else if(_ischecked == 0) {
            $("#chk_view_" + _srl).prop("checked", false);
            $("#chk_add_" + _srl).prop("checked", false);
            $("#chk_edit_" + _srl).prop("checked", false);
            $("#chk_delete_" + _srl).prop("checked", false);
        }
    }

    //alert(type + ' - ' + parentmenuid + ' - ' + _ischecked);
    var cdata_json = [];
    cdata_json = JSON.parse($('#' + parentmenuid).attr('cdata'));

    $.each(cdata_json, function (i, val) {
        if (val.PARENT_ID == parent_id && val.MENU_ID == menu_id) {
            if (type == 'view') {
                val.isview = _ischecked;
            }
            else if (type == 'add') {
                val.isadd = _ischecked;
            }
            else if (type == 'edit') {
                val.isedit = _ischecked;
            }
            else if (type == 'delete') {
                val.isdelete = _ischecked;
            }
            else if (type == 'all') {
                val.isview = _ischecked;
                val.isadd = _ischecked;
                val.isedit = _ischecked;
                val.isdelete = _ischecked;
            }
        }
    });
    $('#' + parentmenuid).attr('cdata', JSON.stringify(cdata_json));
    new_cdata_json = cdata_json;
    RolePermissionObject.rolespermissiondata.permissionchanged = 1;
};

var onchangerole = function (sel) {
    $('#roleDescription').val($("option:selected", sel).attr("description"));
    $('#selectUser').val('');
    $('#userDescription').val('');
    $('#myUL').html('');
    $('#role_permission_table_body').html('');

    if ($("option:selected", sel).val() != '') {
        RolePermissionObject.rolespermissiondata.changeforrole = 1;
        RolePermissionObject.rolespermissiondata.changeforuser = 0;

        RolePermissionObject.do_loadAllPages($("option:selected", sel).val(),null,'R');
    }
};

var onchangeuser = function (sel) {
    $('#userDescription').val($("option:selected", sel).attr("ename"));
    $('#selectRole').val('');
    $('#roleDescription').val('');
    $('#myUL').html('');
    $('#role_permission_table_body').html('');

    if ($("option:selected", sel).val() != '') {
        RolePermissionObject.rolespermissiondata.changeforrole = 0;
        RolePermissionObject.rolespermissiondata.changeforuser = 1;
        RolePermissionObject.do_loadAllPages(null, $("option:selected", sel).val(), 'U');
    }
    else {
        $('#div_iscustomrole').hide();
        $('#chk_iscustomrole').prop('checked', false);
    }
};

var dosavepermission = function () {

    /*console.log('a and b = ' + $.compareObject(old_cdata_json, new_cdata_json)); // a and b = true

    if (JSON.stringify(old_cdata_json) == JSON.stringify(new_cdata_json)) {
        alert('Collections are equal');
    } else {
        alert('Collections are not equal');
    }

    RolePermissionObject.rolespermissiondata.permissionchanged = 0;
    debugger;*/

    var _iscustomrole = false;
    if ($('#selectUser').val() != '') {
        if (old_cdata_json.length > 0 && new_cdata_json.length > 0) {
            if (JSON.stringify(old_cdata_json) == JSON.stringify(new_cdata_json)) {
                //alert('Collections are equal');
                RolePermissionObject.rolespermissiondata.permissionchanged = 0;
            } else {
                //alert('Collections are not equal');
                RolePermissionObject.rolespermissiondata.permissionchanged = 1;
                if ($("#chk_iscustomrole").prop('disabled')) { _iscustomrole = true; }
                else { _iscustomrole = $("#chk_iscustomrole").is(":checked");}
            }
        }
    }
   

    old_cdata_json = [];
    new_cdata_json = [];

    var _getforsavevall = [];
    var _srl = 0;
    var _isparentallow = 0, _alreadyexistinarray=0;

    var parentid, parentparentid, parentparentparentid, parentparentparentparentid;

    $('#role_permission_table_body').find('tr').each(function (i, el) {

        //alert(this.id);

        parentid = $(this).attr('parent_id');
        parentparentid = $(this).attr('parentparent_menuid');
        parentparentparentid = $(this).attr('parentparentparent_menuid');
        parentparentparentparentid = $(this).attr('parentparentparentparent_menuid');


        var $tds = $(this).find('td'),
            menu_id = $tds.eq(0).attr('menuid'),
            parent_id = $tds.eq(0).attr('parent_id'),
            //menu_name = $tds.eq(0).attr('MENU_NAME'),
            //menu_caption = $tds.eq(0).attr('MENU_CAPTION'),
            //action_link = $tds.eq(0).attr('ACTION_LINK'),
            //menuname = $tds.eq(0).text(),
           
            isvisible = $tds.eq(2).find("[checktype='visible']"),
            isadd = $tds.eq(3).find("[checktype='add']"),
            isedit = $tds.eq(4).find("[checktype='edit']"),
            isdelete = $tds.eq(5).find("[checktype='delete']");

        if (isvisible.is(":checked") == true || isadd.is(":checked") == true || isedit.is(":checked") == true || isdelete.is(":checked") == true) _isparentallow = 1;

        if (_isparentallow == 1 && _alreadyexistinarray == 0) {

            if (parentparentid == "undefined" || parentparentid == undefined) {
                _getforsavevall.push({
                    serial: _srl,
                    MENU_ID: parentid,
                    PARENT_ID: parentparentparentid,
                    //MENU_NAME: menu_name,
                    // MENU_CAPTION: menu_caption,
                    // ACTION_LINK: action_link,
                    isallowvisible: true,
                    isallowadd: true,
                    isallowedit: true,
                    isallowdelete: true
                });
                _srl = _srl + 1;

                _getforsavevall.push({
                    serial: _srl,
                    MENU_ID: parentparentparentid,
                    PARENT_ID: parentparentparentparentid,
                    //MENU_NAME: menu_name,
                    // MENU_CAPTION: menu_caption,
                    // ACTION_LINK: action_link,
                    isallowvisible: true,
                    isallowadd: true,
                    isallowedit: true,
                    isallowdelete: true
                });
                _srl = _srl + 1;

            }
            else {

                _getforsavevall.push({
                    serial: _srl,
                    MENU_ID: parentid,
                    PARENT_ID: parentparentid,
                    //MENU_NAME: menu_name,
                    // MENU_CAPTION: menu_caption,
                    // ACTION_LINK: action_link,
                    isallowvisible: true,
                    isallowadd: true,
                    isallowedit: true,
                    isallowdelete: true
                });
                _srl = _srl + 1;

                _getforsavevall.push({
                    serial: _srl,
                    MENU_ID: parentparentid,
                    PARENT_ID: parentparentparentid,
                    //MENU_NAME: menu_name,
                    // MENU_CAPTION: menu_caption,
                    // ACTION_LINK: action_link,
                    isallowvisible: true,
                    isallowadd: true,
                    isallowedit: true,
                    isallowdelete: true
                });
                _srl = _srl + 1;

                _getforsavevall.push({
                    serial: _srl,
                    MENU_ID: parentparentparentid,
                    PARENT_ID: parentparentparentparentid,
                    //MENU_NAME: menu_name,
                    // MENU_CAPTION: menu_caption,
                    // ACTION_LINK: action_link,
                    isallowvisible: true,
                    isallowadd: true,
                    isallowedit: true,
                    isallowdelete: true
                });
                _srl = _srl + 1;
            }

            _isparentallow = 0;
            _alreadyexistinarray = 1;
        }

        //if (_srl != 0) {
            _getforsavevall.push({
                serial: _srl,
                MENU_ID: menu_id,
                PARENT_ID: parent_id,
                //MENU_NAME: menu_name,
               // MENU_CAPTION: menu_caption,
               // ACTION_LINK: action_link,
                isallowvisible: isvisible.is(":checked"),
                isallowadd: isadd.is(":checked"),
                isallowedit: isedit.is(":checked"),
                isallowdelete: isdelete.is(":checked")
            });
        //}
        _srl = _srl + 1;
    });

    //console.log(JSON.stringify(_getforsavevall));
   //return;

    var _data = {};
    _data["rolecd"] = $('#selectRole').val();
    _data["userid"] = $('#selectUser').val();
    _data["rolepermissions"] = JSON.stringify(_getforsavevall);
    _data["iscustomrole"] = _iscustomrole;
    _data["cocd"] = $("#ddlCompany").val();

    var passdata = {
        data: ""
    };
    passdata.data = JSON.stringify(_data);

    $.ajax({
        type: "POST",
        url: "role_permissions.aspx/doSaveRolePermissions",
        data: JSON.stringify(passdata),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (result) {
            if (!dochkses(result.d)) return;
            if (result.d == "True") { alert("Role Permission saved successfully."); }
            else { alert("Problem in saving data...\n Please Try Again."); }
        },
        failure: function (response) {
            /*alert(response.d);*/
            alert('Problem in saving data...');
        }
    });

    if (RolePermissionObject.rolespermissiondata.changeforrole == 1 && RolePermissionObject.rolespermissiondata.changeforuser==0) {
        onchangerole($('#selectRole'));
    }
    if (RolePermissionObject.rolespermissiondata.changeforrole == 0 && RolePermissionObject.rolespermissiondata.changeforuser == 1) {
        onchangeuser($('#selectUser'));
    }
};

var docancelpermission = function () {
    RolePermissionObject.rolespermissiondata.permissionchanged = 0;
    if (RolePermissionObject.rolespermissiondata.changeforrole == 1 && RolePermissionObject.rolespermissiondata.changeforuser == 0) {
        onchangerole($('#selectRole'));
    }
    if (RolePermissionObject.rolespermissiondata.changeforrole == 0 && RolePermissionObject.rolespermissiondata.changeforuser == 1) {
        onchangeuser($('#selectUser'));
    }
};

var onchangeparent = function (obj) {
    //alert($('#' + obj.id).attr('menuid'));
    //$(".caret-down").removeClass("caret-down").addClass("");
    var activeUL = $("ul .active");
    $('#role_permission_table_body').html('');
    $.each(activeUL, function (i, val) {
        //alert(val.id);
        if (val.id != 'ul_' + $('#' + obj.id).attr('menuid')) {
            $('#' + val.id).removeClass("active").addClass("");
            $('#span_' + obj.id).removeClass("caret-down").addClass("");
        }
    });

};
