$(document).ready(function () {

    MainObject.do_loadusermenu();
    //$(".child_menu").toggle();

    $MENU_TOGGLE.on('click', function () {
        if ($BODY.hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide();
            $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
        } else {
            $SIDEBAR_MENU.find('li.active-sm ul').show();
            $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
        }

        $BODY.toggleClass('nav-md nav-sm');

        setContentHeight();
    });

    // check active menu
    $('#sidebar-menu').find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

    $('#sidebar-menu').find('a').filter(function () {
        return this.href == CURRENT_URL;
    }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
        setContentHeight();
    }).parent().addClass('active');
});

var menuloadfromdb = false,
    menudata = "";
    menudatahtml = "";
var oldcompany_Value = $("#ddlCompany").val();
var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
    $BODY = $('body'),
    $MENU_TOGGLE = $('#menu_toggle'),
    $SIDEBAR_MENU = $('#sidebar-menu'),
    $SIDEBAR_FOOTER = $('.sidebar-footer'),
    $LEFT_COL = $('.left_col'),
    $RIGHT_COL = $('.right_col'),
    $NAV_MENU = $('.nav_menu'),
    $FOOTER = $('footer');

var dochkses = function (rest) {
    if (rest.indexOf("CLXID='489660C5-3D11-4512-AD3C-00C4EF8F6851'") >= 0) {
        alert('Your session timeout has occurred. You will be logged out automatically');
        window.location.href = "login.aspx";
        return false;
    }
    return true;
};

var MainObject = {
    usermenu: [{
        menuloadfromdb: false,
        menudata: '',
        menudatahtml: '',
        userrolename: ''
    }],
    loggedinuser: [{
        id: '',
        name: '',
        profile: '',
        userimagepath: ''
    }],
    usermenu: [{
        MENU_ID: '',
        PARENT_ID: '',
        MENU_NAME: '',
        MENU_CAPTION: '',
        ACTION_LINK: ''
    }],
    do_loadusermenu: () => {
        if (menuloadfromdb == false) {
            //$('.menu_section').html("");
            $.ajax({
                type: "POST",
                url: "../handler/datahandler.aspx/dogetusermenu",
                data: JSON.stringify({ CoCd: $("#ddlCompany").val() }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (result) {
                    if (!dochkses(result.d)) return;
                    /*var rest = result.d;
                    var resJson = JSON.parse(rest);
                    menuloadfromdb = true;
                    //console.log(resJson);
                    menudata = resJson.Table;
                    //const _doy = moment(dayDate).day();
                    dogeneratemenu();*/
                    var obj = JSON.parse(`[${result.d}]`);
                    for (var i = 0; i < obj.length; i++) {
                        var objnew = obj[i];
                        for (var key in objnew) {
                            var attrName = key;
                            if (attrName.toLowerCase() == "table") {//menu
                                //CoaSetup.lookup.fa_AcType = objnew[key];
                                //var rest = objnew[key];
                                //var resJson = JSON.parse(rest);
                                menuloadfromdb = true;
                                //console.log(resJson);
                                menudata = objnew[key];// resJson.Table;
                                //const _doy = moment(dayDate).day();
                                dogeneratemenu();
                            }
                            if (attrName.toLowerCase() == "table1") {//permission
                                //CoaSetup.lookup.fa_Group = objnew[key];
                                //localStorage.permission = JSON.stringify(objnew[key]);
                                localStorage.permission = JSON.stringify(objnew[key]);
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
            dogeneratemenufromobject();
        }
    },
    do_logout: () => {
        $.ajax({
            type: "POST",
            url: "../handler/datahandler.aspx/do_logout",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                localStorage.clear();
                window.location.href = "../login.aspx";
            },
            failure: function (response) {
                /*alert(response.d);*/
                alert('Problem in retreiving items...');
            }
        });
    },

    do_IsActionMenuPermission: (permission, module, action)=> {
        //coa»Y,Y,Y,Y
        //return false;
        //if (permission == undefined || permission == 'undefined' || permission == '') permission = localStorage.permission;
        if (permission == undefined || permission == 'undefined' || permission == '') return false;																								   

        var oK = false;
        var str_pm = permission;
        var colRow = str_pm.split('|');

        var _op = '';
        var _dt = '';

        $.each(colRow, function (index, value) {
            //console.log(value);
            if (value == '') return false;
            _op = ""; _dt = "";
            _op = value.split('»')[0].toLowerCase();
            _dt = value.split('»')[1].toLowerCase();

            if (_dt.split(',').length < 3) return;//continue;

            if (_op.toLowerCase() == module.toLowerCase()) {
                if (action == "view")
                    _dt = _dt.split(',')[0].toLowerCase();
                else if (action == "create")
                    _dt = _dt.split(',')[1].toLowerCase();
                else if (action == "edit")
                    _dt = _dt.split(',')[2].toLowerCase();
                else if (action == "delete")
                    _dt = _dt.split(',')[3].toLowerCase();

                oK = (_dt == "y");
                return oK;
            }
        });
        //console.log(oK);
        return oK;
    },

    do_getuserpageaccess_table: (ob) => {
        var _data = {};
        _data["pagelink"] = window.location.pathname;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "../handler/datahandler.aspx/GetPagePermission",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var obj = JSON.parse(`[${result.d}]`);
                debugger;
                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = key;
                        if (attrName.toLowerCase() == "table") {
                            ob.pageaccess = JSON.stringify(objnew[key]);
                        }
                        if (attrName.toLowerCase() == "table1") {
                            ob.functionpageaccess = JSON.stringify(objnew[key]);
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

    do_getuserpageaccess: (ob) => {
        var _data = {};
        _data["pagelink"] = window.location.pathname;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "../handler/datahandler.aspx/GetPagePermission",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var obj = JSON.parse(`[${result.d}]`);
                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = key;
                        if (attrName.toLowerCase() == "table") {
                            if (objnew[key].length > 0) {
                                if (objnew[key][0].rolewisepermission != '') {
                                    ob.access = objnew[key][0].rolewisepermission;
                                }
                                else {
                                    MainObject.do_getuserpageaccess_byreferrer(ob);
                                }
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

    do_getuserpageaccess_byreferrer: (ob) => {
         var _data = {};
         const url = new URL(document.referrer)
         
         _data["pagelink"] = url.pathname;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "../handler/datahandler.aspx/GetPagePermission",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var obj = JSON.parse(`[${result.d}]`);
                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = key;
                        if (attrName.toLowerCase() == "table") {
                            if (objnew[key].length > 0) {
                                ob.access = objnew[key][0].rolewisepermission;
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

};

var queryString = function (name) {
    var match = RegExp('[?&]' + name + '=([^&]*)')
        .exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

var setContentHeight = function () {
    // reset height
    $RIGHT_COL.css('min-height', $(window).height());

    var bodyHeight = $BODY.outerHeight(),
        footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
        leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
        contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

    // normalize content
    contentHeight -= $NAV_MENU.height() + footerHeight;

    $RIGHT_COL.css('min-height', contentHeight);
};

var dogeneratemenu = function () {
    MainObject.usermenu.menudata = menudata;
    MainObject.usermenu.menuloadfromdb = true;
    MainObject.usermenu.menudatahtml = createList(MainObject.usermenu.menudata);
    var htmlMenu = [];
    $('.menu_section').html(MainObject.usermenu.menudatahtml);

    $('#linklogout').on('click', (e) => {
        MainObject.do_logout();
    });
    $('#link_right_logout').on('click', (e) => {
        MainObject.do_logout();
    });

    $('#sidebar-menu').find('a').on('click', function (ev) {
        var $li = $(this).parent();

        if ($li.is('.active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function () {
                setContentHeight();
            });
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
                $('#sidebar-menu').find('li').removeClass('active active-sm');
                $('#sidebar-menu').find('li ul').slideUp();
            }

            $li.addClass('active');

            $('ul:first', $li).slideDown(function () {
                setContentHeight();
            });
        }
    });

    // toggle small or large menu
    $MENU_TOGGLE.on('click', function () {
        if ($BODY.hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide();
            $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
        } else {
            $SIDEBAR_MENU.find('li.active-sm ul').show();
            $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
        }

        $BODY.toggleClass('nav-md nav-sm');

        setContentHeight();
    });

    // check active menu
    $('#sidebar-menu').find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

};

var selectedcompany = function () {  
    menuloadfromdb = false;
    MainObject.do_loadusermenu();
    $.alertable
        .custconfirm(`Company change will redirect you to Home Page?`, ``, `Yes`, `No`)
        .then(
            function () {
                window.location = "../home/home.aspx";
            },
            function () {
                $("#ddlCompany").val(oldcompany_Value);
            }
        );
    
};
var dogeneratemenufromobject = function () {
    $('.menu_section').html(MainObject.usermenu.menudatahtml);
};

var createList = function (array) {
    var html = '<h3>' + MainObject.usermenu.userrolename + '</h3><ul class="nav side-menu">';
    var submenu = [];
    var subsubmenu = [];

    var subsubsubpage = [];
    var subpage1 = [];

    $.each(array, function (k, item) {
        if (item.PARENT_ID == 0) {
            html += '<li><a><i class="fa fa-sitemap"></i> ' + item.MENU_NAME + ' <span class="fa fa-chevron-down"></span></a>';
            submenu = [];
            submenu = getchildmenu(item.MENU_ID);

            if (submenu.length > 0) {
                html += '<ul class="nav child_menu">';
                $.each(submenu, function (i, val) {
                    subsubmenu = [];
                    subsubmenu = getchildmenu(val.MENU_ID);
                    if (subsubmenu.length > 0) {

                        html += '<li>';
                        html += '<a>' + val.MENU_NAME + '<span class="fa fa-chevron-down"></span></a>';
                        html += '<ul class="nav child_menu">';

                        $.each(subsubmenu, function (i, val) {

                            /*if (val.MENU_ID == '161') {
                                debugger;
                            }*/

                            subsubsubpage = [];
                            subsubsubpage = getchildmenu(val.MENU_ID);

                            if (subsubsubpage.length <= 0) {
                                html += '<li class="sub_menu"><a href="' + val.ACTION_LINK + '">' + val.MENU_NAME + '</a></li>';
                            }
                            else {

                                html += '<li>';
                                html += '<a>' + val.MENU_NAME + '<span class="fa fa-chevron-down"></span></a>';
                                html += '<ul class="nav child_menu">';

                                subpage1 = [];
                                subpage1 = getchildmenu(val.MENU_ID);

                                $.each(subpage1, function (i, val) {
                                    html += '<li class="sub_menu"><a href="' + val.ACTION_LINK + '">' + val.MENU_NAME + '</a></li>';
                                });

                                html += '</ul>';
                                html += '</li>';
                            }

                        });

                        html += '</ul>';
                        html += '</li>';

                    }
                    else {
                        html += '<li><a href="' + val.ACTION_LINK + '">' + val.MENU_NAME + '</a></li>';
                    }
                });

                html += '</ul>';
            }

            html += '</li>';

        }

    });

    html += '</ul>';
    return html;
};

var getchildmenu = function (parentid) {

    var array1 = [];
    var array2 = [];

    array1 = menudata;

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
                ORDER: val.ORDER
            });
        }
    });

    return array2;

};

var getchildpage_withhashlink_new = function (parentid) {

    var array1 = [];
    var array2 = [];

    array1 = menudata;

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
                ORDER: val.ORDER
            });
        }
    });

    return array2;

};

var CurrencyExchange = {
    callfor: localStorage.CurrencyExchange_callfor,
    callerid: localStorage.CurrencyExchange_callerid,
    calldescription: localStorage.CurrencyExchange_calldescription,
    gridData:[],
};

var BankAccount = {
    bankName: localStorage.BankAccount_dimension_BankName,
    acNumber: localStorage.BankAccount_dimension_AcNumber,
	bankCD: localStorage.BankAccount_dimension_BankCD												 
};

var RoleUserAssignment = {
    callfor: localStorage.RoleUserAssignment_callfor,
    callerid: localStorage.RoleUserAssignment_callerid,
};

jQuery.extend({
    compare: function (a, b) {
        var obj_str = '[object Object]',
            arr_str = '[object Array]',
            a_type = Object.prototype.toString.apply(a),
            b_type = Object.prototype.toString.apply(b);

        if (a_type !== b_type) { return false; }
        else if (a_type === obj_str) {
            return $.compareObject(a, b);
        }
        else if (a_type === arr_str) {
            return $.compareArray(a, b);
        }
        return (a === b);
    }
});

jQuery.extend({
    compareArray: function (arrayA, arrayB) {
        var a, b, i, a_type, b_type;
        // References to each other?
        if (arrayA === arrayB) { return true; }

        if (arrayA.length != arrayB.length) { return false; }
        // sort modifies original array
        // (which are passed by reference to our method!)
        // so clone the arrays before sorting
        a = jQuery.extend(true, [], arrayA);
        b = jQuery.extend(true, [], arrayB);
        a.sort();
        b.sort();
        for (i = 0, l = a.length; i < l; i += 1) {
            a_type = Object.prototype.toString.apply(a[i]);
            b_type = Object.prototype.toString.apply(b[i]);

            if (a_type !== b_type) {
                return false;
            }

            if ($.compare(a[i], b[i]) === false) {
                return false;
            }
        }
        return true;
    }
});

jQuery.extend({
    compareObject: function (objA, objB) {

        var i, a_type, b_type;

        // Compare if they are references to each other 
        if (objA === objB) { return true; }

        if (Object.keys(objA).length !== Object.keys(objB).length) { return false; }
        for (i in objA) {
            if (objA.hasOwnProperty(i)) {
                if (typeof objB[i] === 'undefined') {
                    return false;
                }
                else {
                    a_type = Object.prototype.toString.apply(objA[i]);
                    b_type = Object.prototype.toString.apply(objB[i]);

                    if (a_type !== b_type) {
                        return false;
                    }
                }
            }
            if ($.compare(objA[i], objB[i]) === false) {
                return false;
            }
        }
        return true;
    }
});




