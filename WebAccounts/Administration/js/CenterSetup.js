var ipaddress= '';
$(document).ready(function () {
    ConterSetupObject.cocd = $('#ddlCompany').val();
    if (localStorage._lastmenuid == '' || localStorage._lastmenuid == undefined) {
        localStorage._lastmenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._lastmenuid;
    }
    
    ConterSetupObject.do_loadnocentersetup();
    ConterSetupObject.do_loaddataedit();
    ConterSetupObject.do_getUserPagepermission();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var ConterSetupObject = {
    id: '',
    cocd: '',
    type: '',
    mode:'',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _nosequencerelationviewperm: false,
    _menuid : '',
    _mainmenuid: '',
    _lastmenuid:'',

    do_loadnocentersetup: () => {

        var _data = {};
        _data["cocd"] = ConterSetupObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "center-setup.aspx/loadcentersetup",
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
                            //location
                            var _location = objnew[key];
                            var _html = [];
                            $.each(_location, function (key, value) {
                                _html.push(
                                    "<option value='" + value.RowId + "'>" + value.LocationName  + "</option>"
                                );
                            });
                            $("#ddl_location").html(_html.join(""));
                            $("#ddl_location").prepend("<option value='' selected='selected'></option>");
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

    do_loaddataedit: (id) => {

        if (queryString('id') != undefined || queryString("id") != null) {
            id= ConterSetupObject.id = queryString("id");
            localStorage.id = queryString("id");
        }

        if (queryString('mode') == 'new') {
            id = '';
            $('#contentbody_tr_block').hide();
        } else {
            $('#contentbody_tr_block').show();
        }

        var _data = {};
        _data["id"] = id;
        _data["cocd"] = ConterSetupObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "center-setup.aspx/doedit",
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
                                ConterSetupObject.hdnid = objnew[key][0].RowId;
                                $('#txtCode').val(objnew[key][0].BranchCd);
                                $('#txtCode').prop('readonly', true);
                                $('#txtDesc').val(objnew[key][0].BranchName);
                                $('#txtCity').val(objnew[key][0].City);
                                $('#txtPostCode').val(objnew[key][0].PostCode);
                                $('#txtAdd1').val(objnew[key][0].AddLine1);
                                $('#txtAdd2').val(objnew[key][0].AddLine2);
                                $('#txtCountry').val(objnew[key][0].Country);
                                $('#ddl_location').val(objnew[key][0].LocationId);

                                $('#txtContactPerson').val(objnew[key][0].ContactPerson);
                                $('#txtFax').val(objnew[key][0].FaxNo);
                                $('#txtPhone').val(objnew[key][0].PhoneNo);
                                $('#txtEmail').val(objnew[key][0].Email);
                                $('#txtAltPhone').val(objnew[key][0].AlternatePhoneNo);
                                $('#txtWebSite').val(objnew[key][0].Website);

                                if (objnew[key][0].IsBlock == 1) {
                                    $('#chkBlock').prop('checked', true);
                                } else {
                                    $('#chkBlock').prop('checked', false);
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
        MainObject.do_getuserpageaccess(ConterSetupObject);
        ConterSetupObject._vieweperm = MainObject.do_IsActionMenuPermission(ConterSetupObject.access, 'centersetup/Responsibility Center', 'view');
        ConterSetupObject._createperm = MainObject.do_IsActionMenuPermission(ConterSetupObject.access, 'centersetup/Responsibility Center', 'create');
        ConterSetupObject._editperm = MainObject.do_IsActionMenuPermission(ConterSetupObject.access, 'centersetup/Responsibility Center', 'edit');
        ConterSetupObject._deleteperm = MainObject.do_IsActionMenuPermission(ConterSetupObject.access, 'centersetup/Responsibility Center', 'delete');
        ConterSetupObject._mainmenuid = MainObject.do_IsActionMenuPermission(ConterSetupObject.access, 'centersetup/Responsibility Center', 'menuid');
        //ConterSetupObject._nosequencerelationviewperm = MainObject.do_IsActionMenuPermission(ConterSetupObject.access, 'No Sequence Relation', 'view');
        //ConterSetupObject._menuid = MainObject.do_IsActionMenuPermission(ConterSetupObject.access, 'No Sequence Relation', 'menuid');
    },

};

var savedata = function () {
    var validate = true;

    if ($('#txtCode').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txtCode").focus();
        return false;
    }
    else if ($('#txtDesc').val() == '') {
        validate = false;
        $.alertable.alert(`Vendor Shipment Description required.`);
        $("#txtDesc").focus();
        return false;
    }
    
    //else {
    //    if (ConterSetupObject.mode != "edit") {
    //        if (ConterSetupObject.hdnid == undefined || ConterSetupObject.hdnid == 'undefined') ConterSetupObject.hdnid = '';
    //        var _data = '{id:"' + ConterSetupObject.hdnid + '",code: "' + encodeURIComponent($("#txtCode").val().trim()) + '",cocd: "' + encodeURIComponent(ConterSetupObject.cocd) + '"        } ';

    //        $.ajax({
    //            type: "POST",
    //            url: "center-setup.aspx/docheckcode",
    //            data: _data,
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            async: false,
    //            success: function (result) {
    //                if (!dochkses(result.d)) return;
    //                var rest = result.d;
    //                var obj = JSON.parse(`[${result.d}]`);
    //                for (var i = 0; i < obj.length; i++) {
    //                    var objnew = obj[i];
    //                    for (var key in objnew) {
    //                        var attrName = key;
    //                        if (attrName.toLowerCase() == "table1") {
    //                            if (objnew[key].length > 0) {
    //                                validate = false;
    //                                $.alertable.alert(objnew[key][0].error_code + '- ' + objnew[key][0].error_msg);
    //                            } else {
    //                                validate = true;
    //                            }
    //                        }
    //                    }
    //                }
    //            },
    //            failure: function (response) {
    //                validate = false;
    //                //$.alertable.alert(`Problem in retreiving items...`);
    //                $.alertable.alert(`Problem in retreiving items...`);
    //            },
    //        });
    //    }
    //}



    var _data = {};
    if (validate == true) {

        if (ConterSetupObject.hdnid == undefined || ConterSetupObject.hdnid == 'undefined') ConterSetupObject.hdnid = '';
        _data["id"] = ConterSetupObject.hdnid;
        _data["cocd"] = ConterSetupObject.cocd;

        _data["code"] = $('#txtCode').val();
        _data["Name"] = $('#txtDesc').val();
        _data["City"] = $('#txtCity').val();
        _data["PostCode"] = $('#txtPostCode').val();
        _data["Add1"] = $('#txtAdd1').val();
        _data["Add2"] = $('#txtAdd2').val();
        _data["Country"] = $('#txtCountry').val();
        _data["Location"] = $('#ddl_location').val();
        _data["ContactPerson"] = $('#txtContactPerson').val();
        _data["Fax"] = $('#txtFax').val();
        _data["Phone"] = $('#txtPhone').val();
        _data["Email"] = $('#txtEmail').val();
        _data["AltPhone"] = $('#txtAltPhone').val();
        _data["WebSite"] = $('#txtWebSite').val();
        _data["Block"] = false;
        if ($("#chkBlock").is(':checked')) {
            //if ($('#chkBlock').checked) {
            _data["Block"] = true;
        }
        if (ipaddress == '') {
            _data["ip"] = "192.100.0.1";
        } else {
            _data["ip"] = ipaddress;
        }

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "center-setup.aspx/doSave";
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
                    window.location = "branch-responsibility-center-overview.aspx";
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var cancel = function () {
    window.location = "branch-responsibility-center-overview.aspx";
};
