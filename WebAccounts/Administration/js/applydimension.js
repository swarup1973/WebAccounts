$(document).ready(function () {

    if (queryString('u') != undefined || queryString("u") != null) {
        ApplyDimension.comefrom = 'u';
        ApplyDimension._userid = queryString("u");

        ApplyDimension.usereditor = new $.fn.dataTable.Editor({
            table: "#apply_dimension_table",
            fields: [
                { label: "dimCd", name: "dimCd" },
                { label: "dimCaption", name: "dimCaption" },
                { label: "valueCd", name: "valueCd" },
                { label: "valueName", name: "valueName" }
            ],
        });

        ApplyDimension.userroletable = $("#apply_dimension_table");

        ApplyDimension.do_loadlookup();
        ApplyDimension.do_loaduserdimension(ApplyDimension._userid);
        ApplyDimension.do_getUserPagepermission();
    }
});


var ApplyDimension = {
    hdnid: '',
    comefrom: '',
    _userid: '',
    _roleid: '',

    usereditor: '',
    userroletable: '',

    maxdimensionallowed: 10,
    addeddimension: 0,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    menuid: '',

    dimvalcode: [
        {
            dimid: "",
            valuecd: "",
            valueName: "",
        },
    ],

    do_loadlookup: () => {
        $.ajax({
            type: "POST",
            async: false,
            url: "apply_dimension.aspx/loadlookupdata",
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
                            //user
                            var _user = objnew[key];
                            var _html = [];
                            $.each(_user, function (key, value) {
                                _html.push(
                                    "<option value='" + value.UserId + "' userid='" + value.RowId + "' uname='" + value.EName + "'>" + value.PNO + "</option>"
                                );
                            });


                            $("#selectUser").html(_html.join(""));
                            $("#selectUser").prepend("<option value='' selected='selected'>Choose...</option>");

                            $("#selectUser").val(ApplyDimension._userid);
                            $('#txt_username').val($("option:selected", $("#selectUser")).attr("uname"));
                            $('#selectUser').attr('disabled', 'disabled');
                            //getempnameuser($("#selectUser"));
                        }


                        if (attrName.toLowerCase() == "table1") {
                            //Role
                            var _role = objnew[key];
                            var _html = [];
                            $.each(_role, function (key, value) {
                                _html.push(
                                    "<option value='" + value.dimid + "' desc='" + value.dimCaption + "'>" + value.dimCd + "</option>"
                                );
                            });

                            $("#dd_dimcode").html(_html.join(""));
                            $("#dd_dimcode").prepend("<option value='' selected='selected' desc=''>Choose Dimension Code</option>");

                            //$('#selectRole').val(ApplyDimension._roleid);

                            $('#txt_dimcaption').val($("option:selected", $('#dd_dimcode')).attr("desc"));
                            //getempnameuser($('#selectRole'));

                        }
                        if (attrName.toLowerCase() == "table2") {
                            ApplyDimension.dimvalcode = objnew[key];
                        }


                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(ApplyDimension);
       // if (queryString('menuid') != undefined || queryString("menuid") != null) {
            ApplyDimension._createperm = MainObject.do_IsActionMenuPermission(ApplyDimension.access, 'APPLY DIMENSION', 'create');
            ApplyDimension._editperm = MainObject.do_IsActionMenuPermission(ApplyDimension.access, 'APPLY DIMENSION', 'edit');
            ApplyDimension._deleteperm = MainObject.do_IsActionMenuPermission(ApplyDimension.access, 'APPLY DIMENSION', 'delete');
      //  }

    },
    do_loaduserdimension: (_userid) => {
        if (queryString('menuid') != undefined || queryString("menuid") != null) {
            ApplyDimension.menuid = queryString("menuid");
            localStorage.menu_id_premission = queryString("menuid");
        }
        $.ajax({
            type: "POST",
            url: "apply_dimension.aspx/loaduserdimension",
            data: JSON.stringify({ userid: _userid }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                ApplyDimension.do_populateuserdimensions(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateuserdimensions: (obj) => {
        // editor init
        var roledata = [];
        
        for (var i = 0; i < obj.length; i++) {
            var objnew = obj[i];
            for (var key in objnew) {
                var attrName = key;
                if (attrName.toLowerCase() == "table") {
                    roledata = objnew[key];
                    ApplyDimension.addeddimension = roledata.length;
                }
            }
        };

        ApplyDimension.userroletable.dataTable({
            dom: "Bfrtip",
            fixedHeader: true,
            data: roledata,
            columns: [
                { data: "dimCd" },
                { data: "dimCaption" },
                { data: "valueCd" },
                { data: "valueName" },
            ],
            select: true,
            buttons: [
                {
                    add: "create", text: 'New', editor: ApplyDimension.usereditor, action: () => showmodal(),
                    attr: {
                        title: 'create',
                        id: 'createdim'
                    },
                },
                {
                    extend: "edit", editor: ApplyDimension.usereditor, action: function () { roleaction($('.selected').attr('rowid'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'editdim'
                    },
                },
                {
                    //extend: "remove", editor: editor
                    extend: "remove", editor: ApplyDimension.usereditor, action: function () { roleaction($('.selected').attr('rowid'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'removedim'
                    },
                },
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowid", `${data.RowId}`);
            },
        });
        var table = $('#apply_dimension_table').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!ApplyDimension._deleteperm[0]) {
                    $('#removedim').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#removedim').prop("disabled", true);
                    $('#removedim').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!ApplyDimension._createperm[0]) {
            $('#createdim').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#createdim').prop("disabled", true);
            $('#createdim').attr('title', 'do not have permission to add dimension!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!ApplyDimension._editperm[0]) {
            $('#editdim').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#editdim').prop("disabled", true);
            $('#editdim').attr('title', 'do not have permission to Edit dimension!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!ApplyDimension._deleteperm[0]) {
            $('#removedim').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#removedim').prop("disabled", true);
            $('#removedim').attr('title', 'do not have delete permission!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
    },


    do_loaddataedit: (id) => {
        
        var _data = {};
        _data["roleid"] = ApplyDimension.hdnid;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "apply_dimension.aspx/doeditDimension",
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
                                ApplyDimension.hdnid = objnew[key][0].RowId;

                                $('#dd_dimcode').val(objnew[key][0].dimId);
                                dimcodeonchange();
                                $('#dd_dimvalvode').val(objnew[key][0].dimValueCd);
                                dimvalcodeonchange();
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

};

var dimcodeonchange = function () {
    var _dimid = $('#dd_dimcode').val();
    var arr = ApplyDimension.dimvalcode;

    if (_dimid == '') _dimid = 0;
    $('#txt_dimcaption').val($("option:selected", $('#dd_dimcode')).attr("desc"));

    var val_dimval = arr.filter((x) => { return x.dimid === parseInt(_dimid); });

    var _html = [];
    $.each(val_dimval, function (key, value) {
        _html.push(
            "<option value='" + value.valuecd + "' desc='" + value.valueName + "'>" + value.valuecd + "</option>"
        );
    });

    $("#dd_dimvalvode").html(_html.join(""));
    $("#dd_dimvalvode").prepend("<option value='' selected='selected' desc=''>Choose Dimension Value</option>");

    $('#txt_dimvalname').val($("option:selected", $('#dd_dimvalvode')).attr("desc"));
};

var dimvalcodeonchange = function () {
    $('#txt_dimvalname').val($("option:selected", $('#dd_dimvalvode')).attr("desc"));
};

var showmodal = function () {
    $('.modal-title').html('New Dimension');
    $('#dd_dimcode').val('');
    $('#txt_dimcaption').val('');
    $('#dd_dimvalvode').val('');
    $('#txt_dimvalname').val('');
    $("#myModalEDIT").modal('show');
    $('#dd_dimcode').focus();
    ApplyDimension.hdnid = "";
};


var dosavedimension = function () {
    var validate = true;
    //

    if (ApplyDimension.addeddimension + 1 >= ApplyDimension.maxdimensionallowed) {
        validate = false;
        $.alertable.alert(`Dimension Not allowed more then ` + ApplyDimension.maxdimensionallowed + `.`);
        $("#dd_dimcode").focus();
        return false;
    }


    if ($('#dd_dimcode').val() == '') {
        validate = false;
        $.alertable.alert(`Dimension Code required.`);
        $("#dd_dimcode").focus();
        return false;
    }

    if ($('#dd_dimvalvode').val() == '') {
        validate = false;
        $.alertable.alert(`Dimension Value required.`);
        $("#dd_dimvalvode").focus();
        return false;
    }

    var _data;
    _data = '{userid:"' + ApplyDimension._userid + '", dimid: "' + $("#dd_dimcode").val() + '", dimvalcode: "' + $("#dd_dimvalvode").val() + '"}';
    $.ajax({
        type: "POST",
        url: "apply_dimension.aspx/docheckdataexist",
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
   

    var _data = {};
    if (validate == true) {

        _data["id"] = ApplyDimension.hdnid;
        _data["userid"] = ApplyDimension._userid;
        _data["dimid"] = $("#dd_dimcode").val();
        _data["dimvalcode"] = $("#dd_dimvalvode").val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(passdata));

        var _url = "apply_dimension.aspx/doSave";
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
                    window.location = "apply_dimension.aspx?u=" + ApplyDimension._userid;
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
        ApplyDimension.hdnid = roleid;
        ApplyDimension.do_loaddataedit(roleid);
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
                        url: "apply_dimension.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                window.location = "apply_dimension.aspx?u=" + ApplyDimension._userid;
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
        window.location = "apply_dimension.aspx?u=" + roleid;
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

