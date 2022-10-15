var menu_id_premission = "";
var apiurl = "https://demos.rksoftwareinc.com:1321/";
//var apiurl = "https://staging.rksoftwareinc.com:1321/";
var apikey = "2e35f242a46d67eeb74aabc37d5e5d05";
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

    //menu_id_premission = $('.sub_menu').find('a').attr('name');
    $('#sidebar-menu').find('a').filter(function () {
        return this.href == CURRENT_URL;
    }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
        setContentHeight();
    }).parent().addClass('active');
});

$(document).on('click', '.sub_menu', function () {
    //localStorage.menu_id_premission = $(this).find('a').attr('name');
});

$(document).ready(function () {
    //alert('ready');
});

/*
$(document).ready(function () {
    $(window).load(function () {
        //insert all your ajax callback code here. 
        //alert('Which will run only after page is fully loaded in background.');
        //MainObject.do_activemenu();
    });
});
*/

var menuloadfromdb = false,menudata = "",menudatahtml = "";

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
    activatemenu: [],
    _isstd: 0,
    _isfn: 0,


    usermenu: [{
        menuloadfromdb: false,
        menudata: '',
        menudatahtml: '',
        userrolename: ''
    }],
    menuproperty: {
        do_activemenu_url: '',
        background_property: '',
        background_property_val: '',
        focus_property: '',
        focus_property_val: '',
    },
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

    do_pageredirect: (obj) => {
        localStorage.menu_id_premission = $(obj).attr('name');
        localStorage.clickedmenu_id = $(obj).attr('name');
        MainObject._isstd = 1;
        MainObject._isfn = 0;
        window.location = $(obj).attr('actionlink');
    },

    assignproperty: () => {
        MainObject.menuproperty.do_activemenu_url = '../handler/datahandler.aspx/dogetactivemenulist';
        MainObject.menuproperty.background_property = 'background-color';
        MainObject.menuproperty.background_property_val = '#F3F3F3';
        MainObject.menuproperty.focus_property = 'color';
        MainObject.menuproperty.focus_property_val = '#0078D4';
    },

    do_logout: () => {
        localStorage.clear();
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

    do_loadusermenu: () => {
        MainObject.assignproperty();
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
                                MainObject.do_activemenu();
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


    do_IsActionMenuPermission: (permission, module, action) => {
        //coa»Y,Y,Y,Y
        //return false;
        //if (permission == undefined || permission == 'undefined' || permission == '') permission = localStorage.permission;
        if (permission == undefined || permission == 'undefined' || permission == '') return false;

        var oK = false;
        var str_pm = permission;
        var colRow = str_pm.split('|');

        var _op = '';
        var _dt = ''; var _menuid = '';

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
                else if (action == "menuid")
                    _menuid = _dt.split(',')[4].toLowerCase();

                oK = (_dt == "y");
                return oK;
            }
        });
        //console.log(oK);
        return [oK, _menuid];
    },

    do_getuserpageaccess_table: (ob) => {

        var _data = {};
        _data["pagelink"] = localStorage.menu_id_premission;//window.location.pathname;

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
        _data["pagelink"] = localStorage.menu_id_premission;//window.location.pathname;

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

        _data["pagelink"] = localStorage.menu_id_premission;//url.pathname;

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
    },
    
    do_activemenu: () => {
        
        $.ajax({
            type: "POST",
            async: true,
            url: MainObject.menuproperty.do_activemenu_url,
            data: JSON.stringify({ menuid: localStorage.clickedmenu_id }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;

                var obj = JSON.parse(`[${result.d}]`);
                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = key;
                        if (attrName.toLowerCase() == "table") {
                            MainObject.activatemenu = JSON.stringify(objnew[key]);

                            //var _html = [];
                            var _data = JSON.parse(MainObject.activatemenu);

                            var _maxid = _data.length;
                            var _dyntitleright = '';
                            $.each(_data, function (key, value) {
                                //alert(value.id);
                                if (value.id == '1') {
                                    $('#' + value.dyn_menuid.split("|")[0]).parent().addClass("active");
                                    $('#' + value.dyn_menuid.split("|")[1]).css("display", "block");
                                    $('#' + value.dyn_menuid.split("|")[1]).children().addClass('active');
                                }
                                if (value.id == '2') {
                                    $('#' + value.dyn_menuid).css("display", "block");
                                    $('#' + value.dyn_menuid).children().addClass('active');
                                }
                                if (value.id == '3') {
                                    try {
                                        if (value.dyn_menuid.split("|").length >= 2) {
                                            //$('#' + value.dyn_menuid.split("|")[0]).parent().addClass("active");
                                            $('#' + value.dyn_menuid.split("|")[1]).css("display", "block");
                                            if (_maxid != '4') {
                                                //$('#' + value.dyn_menuid.split("|")[0]).children().css('background-color', 'blanchedalmond');
                                            }
                                        }
                                        else {
                                            if (_maxid != '4') {
                                                //$('#' + value.dyn_menuid).children().css('background-color', 'blanchedalmond');
                                            }
                                        }

                                        if (value.id != _maxid) {
                                            $('#' + value.dyn_menuid).children().css(MainObject.menuproperty.background_property, MainObject.menuproperty.background_property_val);
                                            $('#' + value.dyn_menuid).children().css(MainObject.menuproperty.focus_property, MainObject.menuproperty.focus_property_val);
                                        }
                                    }
                                    catch { }
                                }
                                if (value.id == '4') {
                                    if (value.id != _maxid) {
                                        $('#' + value.dyn_menuid).children().css(MainObject.menuproperty.background_property, MainObject.menuproperty.background_property_val);
                                        $('#' + value.dyn_menuid).children().css(MainObject.menuproperty.focus_property, MainObject.menuproperty.focus_property_val);
                                    }
                                }
                                if (value.id == _maxid) {
                                    if (_maxid == '4') {
                                        //$('#' + value.dyn_menuid).children().css('background-color', 'blanchedalmond');
                                        //color: royalblue;
                                    }

                                    $('#' + value.dyn_menuid).children().css(MainObject.menuproperty.background_property, MainObject.menuproperty.background_property_val);
                                    $('#' + value.dyn_menuid).children().css(MainObject.menuproperty.focus_property, MainObject.menuproperty.focus_property_val);

                                    $('#' + value.dyn_menuid).parent().css("display", "block");
                                    //$('#' + value.dyn_menuid).css("display", "block");

                                    $('.bodytext').css({ 'color': 'red' });
                                    $('.title_left').html('<h5>' + value.MENU_CAPTION + '</h5>');
                                    $('.title_right').html(value.dyn_titleright);

                                    /*
                                    var _titleright = value.MenuPath.split("||");
                                    _html = '';//[];

                                    $.each(_titleright, function (key, val) {
                                        _dyntitleright = _dyntitleright + val;
                                        _html = _html + val + ' »';
                                    });
                                   
                                    $('.title_right').html('<p>Home »' + _html + '</p>');
                                    */
                                }
                            });
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

//$('li.sub_menu').click(function () {
//    console.log($(this).find('a').attr('name'));
//});

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

    var _main = '', _sub = '', _subsub = '', _subsubsub = '', _subsubsubsub = '';

    $.each(array, function (k, item) {
        if (item.PARENT_ID == 0) {
            _main = 'main_' + item.MENU_ID;

            switch (item.MENU_NAME.trim()) {
                case 'Procurement':
                    html += '<li id="li_' + _main + '"><a id="' + _main + '"><i class="fa fa-cart-arrow-down" data-toggle="tooltip" data-placement="right" title="Procurement"></i> ' + item.MENU_NAME + ' <span class="fa fa-chevron-down"></span></a>';
                    break;

                case 'Sales':
                    html += '<li id="li_' + _main + '"><a id="' + _main + '"><i class="fa-solid fa-chart-line" data-toggle="tooltip" data-placement="right" title="Sales"></i> ' + item.MENU_NAME + ' <span class="fa fa-chevron-down"></span></a>';
                    break;

                case 'Inventory Management':
                    html += '<li id="li_' + _main + '"><a id="' + _main + '"><i class="fa fa-dolly-flatbed" data-toggle="tooltip" data-placement="right" title="Inventory Management"></i> ' + item.MENU_NAME + ' <span class="fa fa-chevron-down"></span></a>';
                    break;

                case 'Warehouse Management':
                    html += '<li id="li_' + _main + '"><a id="' + _main + '"><i class="fa fa-warehouse" data-toggle="tooltip" data-placement="right" title="Warehouse Management"></i> ' + item.MENU_NAME + ' <span class="fa fa-chevron-down"></span></a>';
                    break;

                case 'Payables':
                    html += '<li id="li_' + _main + '"><a id="' + _main + '"><i class="fa fa-file-invoice" data-toggle="tooltip" data-placement="right" title="Payables"></i> ' + item.MENU_NAME + ' <span class="fa fa-chevron-down"></span></a>';
                    break;

                case 'Receivables':
                    html += '<li id="li_' + _main + '"><a id="' + _main + '"><i class="fa fa-hand-holding-dollar" data-toggle="tooltip" data-placement="right" title="Receivables"></i> ' + item.MENU_NAME + ' <span class="fa fa-chevron-down"></span></a>';
                    break;

                case 'General Ledger':
                    html += '<li id="li_' + _main + '"><a id="' + _main + '"><i class="fa fa-circle-dollar-to-slot" data-toggle="tooltip" data-placement="right" title="General Ledger"></i> ' + item.MENU_NAME + ' <span class="fa fa-chevron-down"></span></a>';
                    break;


                case 'Fixed Assets':
                    html += '<li id="li_' + _main + '"><a id="' + _main + '"><i class="fa fa-sack-dollar" data-toggle="tooltip" data-placement="right" title="Fixed Assets"></i> ' + item.MENU_NAME + ' <span class="fa fa-chevron-down"></span></a>';
                    break;

                case 'Administration':
                    html += '<li id="li_' + _main + '"><a id="' + _main + '"><i class="fa fa-user-gear" data-toggle="tooltip" data-placement="right" title="Administration"></i> ' + item.MENU_NAME + ' <span class="fa fa-chevron-down"></span></a>';
                    break;


                default:
                    html += '<li id=li_' + _main + '"><a id="' + _main + '"><i class="fa fa-sitemap" title=""></i> ' + item.MENU_NAME + ' <span class="fa fa-chevron-down"></span></a>';
            }
            /*
            if (item.MENU_NAME == "Procurement") {
                 html += '<li><a><i class="fa fa-cart-arrow-down"></i> ' + item.MENU_NAME + ' <span class="fa fa-chevron-down"></span></a>';
            }
            else {
        	
            html += '<li><a><i class="fa fa-sitemap"></i> ' + item.MENU_NAME + ' <span class="fa fa-chevron-down"></span></a>';
            }
            */

            submenu = [];
            submenu = getchildmenu(item.MENU_ID);

            if (submenu.length > 0) {
                _sub = 'sub_' + item.MENU_ID;

                html += '<ul id="ul_' + _sub + '" class="nav child_menu">';
                $.each(submenu, function (i, val) {
                    subsubmenu = [];
                    subsubmenu = getchildmenu(val.MENU_ID);
                    _subsub = 'subsub_' + val.MENU_ID;

                    if (subsubmenu.length > 0) {

                        html += '<li>';
                        html += '<a>' + val.MENU_NAME + '<span class="fa fa-chevron-down"></span></a>';
                        html += '<ul id="ul_' + _subsub + '" class="nav child_menu">';

                        $.each(subsubmenu, function (i, val) {

                            subsubsubpage = [];
                            subsubsubpage = getchildmenu(val.MENU_ID);
                            _subsubsub = 'subsubsub_' + val.MENU_ID;

                            if (subsubsubpage.length <= 0) {
                                //html += '<li id="li_' + _subsubsub + '" class="sub_menu" ><a  href="' + val.ACTION_LINK + '" name="' + val.MENU_ID + '">' + val.MENU_NAME + '</a></li>';
                                html += '<li id="li_' + _subsubsub + '" class="sub_menu" ><a onclick="MainObject.do_pageredirect(this);" actionlink="' + val.ACTION_LINK + '" href="#" name="' + val.MENU_ID + '">' + val.MENU_NAME + '</a></li>';
                            }
                            else {

                                html += '<li id="li_' + _subsubsub + '">';
                                html += '<a>' + val.MENU_NAME + '<span class="fa fa-chevron-down"></span></a>';
                                html += '<ul id="ul_' + _subsubsub + '" class="nav child_menu" >';

                                subpage1 = [];
                                subpage1 = getchildmenu(val.MENU_ID);
                                $.each(subpage1, function (i, val) {
                                    _subsubsubsub = 'subsubsubsub_' + val.MENU_ID;
                                    //html += '<li id="li_' + _subsubsubsub + '" class="sub_menu"><a href="' + val.ACTION_LINK + '" name="' + val.MENU_ID + '">' + val.MENU_NAME + '</a></li>';
                                    html += '<li id="li_' + _subsubsubsub + '" class="sub_menu"><a onclick="MainObject.do_pageredirect(this);" actionlink="' + val.ACTION_LINK + '" href="#" name="' + val.MENU_ID + '">' + val.MENU_NAME + '</a></li>';
                                });

                                html += '</ul>';
                                html += '</li>';
                            }

                        });

                        html += '</ul>';
                        html += '</li>';

                    }
                    else {
                        //html += '<li id="li_' + _subsub + '"><a href="' + val.ACTION_LINK + '" name="' + val.MENU_ID + '">' + val.MENU_NAME + '</a></li>';
                        html += '<li id="li_' + _subsub + '"><a onclick="MainObject.do_pageredirect(this);" actionlink="' + val.ACTION_LINK + '" href="#" name="' + val.MENU_ID + '">' + val.MENU_NAME + '</a></li>';
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
    gridData: [],
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
