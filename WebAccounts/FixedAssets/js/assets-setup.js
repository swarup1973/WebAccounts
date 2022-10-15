var objVendor;
$(document).ready(function () {
    $('#Image1').hide();
    assetsetuoObject.cocd = $('#ddlCompany').val();
    
   
    assetsetuoObject.do_getUserPagepermission();
    if (queryString('id') == undefined || queryString("id") == null) {
        //assetsetuoObject.do_loadlist();
        //assetsetuoObject.do_getUserPagepermission();
    }
    else {
        populatefaGroup();
        assetsetuoObject.ProfileFrom.splice(0, 1);
        if (queryString('id') != '0' && queryString('id') != '') {
            $('#txt_FACode').attr('readonly', 'true');
            if ($('#Image1').attr('src') != '') {
                $('#img_FAPic').attr('src', $('#Image1').attr('src'));
            }
            else {
                $('#a_removeimage').hide();
            }

            if ($('#Image1').attr('src') == undefined || $('#Image1').attr('src') == "undefined" || $('#Image1').attr('src') == '') {
                $('#a_removeimage').hide();
            }
            assetsetuoObject.do_loaddataedit(queryString('id'));
            $('#txt_FADesc').focus();
        }
        else {

            ($('#li_edit').parent().parent()).hide();
            $('#a_removeimage').hide();
            $('#txt_FACode').removeAttr('readonly');
            assetsetuoObject.do_populateList();
            $('#dd_FALocId').prop("disabled", false);
            $('#txt_FACode').focus();
        }

        assetsetuoObject.do_disabledformodeview();
    }

    assetsetuoObject.do_loadlookup();

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var assetsetuoObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _dimensionperm: false,
    _loconperm: false,
    _loanperm: false,
    _tranperm: false,
    _menuid: '',
    _mainmenuid: '',
    _lastmenuid: '',
    Procurement_Uom: [],
    Payables_Vendor: [],
    FixedAsset_FAType: [],
    Administrator_FixedAssetPosting: [],
    FixedAsset_FASubType: [],
    GeneralLedger_TaxGroup: [],
    FixedAsset_DepreciationBookSetup: [],
    FixedAsset_LocationMaster: [],
    Administrator_Employee: [],
    imagechange: 0,
    deletedimage: 0,

    ProfileFrom: [
        {
            RowId: "",
            FAId: "",
            FAId_name: "",
            DepnBookId: "",
            DepnBookId_name: "",
            DepnMethod: "",
            DepnMethod_name: "",
            DepnStFrom: "",
            DepnStFrom_txt: "",
            DepnEndOn: "",
            DepnEndOn_txt: "",
            SelfLife: "",
            DepnPer: "",
            BookValue: "",
            SalvageValue: "",
            BookValueAfterFullDepn: "",
            DepnFrequency: "",
            DepnFrequency_txt: "",
            DepnCalc: "",
            DepnCalc_txt: "",
            type: "",
        },
    ],

    do_disabledformodeview: () => {
        if (queryString('mode') != undefined || queryString("mode") != null) {
            if (queryString('mode') == 'v') {
                //$(".container :input").prop("disabled", true);
                $('#btn_cancel').prop("disabled", false);
                $('#btn_save').hide();
                $('#profile_create').hide();
                $('#profilea_delete').hide();
                $('#a_removeimage').hide();
                $('#file_FAPic').hide();
            }

        }
        else {
            ($('#li_edit').children()).hide();
        }

        if (!assetsetuoObject._createperm[0]) {
            //$('#li_edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            //$('#li_edit').prop("disabled", true);
            $('#li_edit').attr('title', 'do not have permission to Add New Record!!!');
            ($('#li_edit').children()).removeAttr("onclick");

            $('#btn_save').hide();
            $('#file_FAPic').hide();
            $('#a_removeimage').hide();
        }

        if (!assetsetuoObject._deleteperm[0]) {
            //$('#li_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            //$('#li_delete').prop("disabled", true);
            $('#li_delete').attr('title', 'do not have permission to Delete Record!!!');
            ($('#li_delete').children()).removeAttr("onclick");
            $('#a_removeimage').hide();
        }
    },

    domovetoedit: () => {
        if (queryString('id') != undefined || queryString("id") != null) {
            //var _createperm = MainObject.do_IsActionMenuPermission('', CoaSetup.coasetupdata.pageid, 'edit');
            //if (!_createperm) { $.alertable.alert('You have no permission to edit data.'); return; }
            window.location = "assets-setup.aspx?id=" + queryString('id');
        }
    },

    dodelete: () => {
        //var _createperm = MainObject.do_IsActionMenuPermission('', CoaSetup.coasetupdata.pageid, 'delete');
        //if (!_createperm) { $.alertable.alert('You have no permission to delete the record.'); return; }
        //else {
        var _id = assetsetuoObject.hdnid;
        if (_id != '0') {
            //$.alertable.alert(_id);
            assetsetuoObject.dodeletefa(_id);
        }

        //}
    },

    dodeletefa: (acid) => {
        var validate = true;

        var _data = '{id:"' + acid + '"}';

        $.ajax({
            type: "POST",
            url: "fixed-assets-master.aspx/docheckdelete",
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
                        `Cant Delete.`
                    );
                    validate = false;
                    return false;
                }
            },
            failure: function (response) {
                validate = false;
                $.alertable.alert(`Problem in retreiving items...`);
            },
        });

        if (validate == true) {

            $.alertable
                .custconfirm(`Are you want to delete this  Fixed Asset?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + acid + '"}';

                        $.ajax({
                            type: "POST",
                            url: "fixed-assets-master.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {

                                    window.location = "fixed-assets-master.aspx";
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

    },

    onchangefile: function (obj) {
        var countFiles = $(obj)[0].files.length;
        var imgPath = $(obj)[0].value;
        var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
        var image_holder = $("#image-holder");
        image_holder.empty();
        if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof (FileReader) != "undefined") {
                //loop for each file selected for uploaded.
                for (var i = 0; i < countFiles; i++) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $("<img />", {
                            "src": e.target.result,
                            "class": "thumb-image"
                        }).appendTo(image_holder);
                    }
                    $('#a_removeimage').show();
                    $('#img_FAPic').hide();
                    image_holder.show();
                    reader.readAsDataURL($(obj)[0].files[i]);
                    assetsetuoObject.imagechange = 1;
                }
            } else {
                $('#img_FAPic').show();
                $('#a_removeimage').hide();
                image_holder.hide();
                $('#file_FAPic').val('');
                $.alertable.alert(`his browser does not support FileReader.`);
                //alert("This browser does not support FileReader.");
            }
        } else {
            $('#img_FAPic').show();
            $('#a_removeimage').hide();
            image_holder.hide();
            $('#file_FAPic').val('');
            $.alertable.alert(`Pls select only images`);
            //alert("Pls select only images");
        }
    },

    deletefile: function () {
        $('#img_FAPic').attr('src', 'propic.png');
        $('#img_FAPic').show();
        $('#a_removeimage').hide();
        $("#image-holder").empty();
        $("#image-holder").hide();
        $('#file_FAPic').val('');
        assetsetuoObject.deletedimage = 1;
    },

    do_loadlookup: () => {

        var _data = {};
        _data["cocd"] = assetsetuoObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            async: false,
            url: "assets-setup.aspx/loadlookupdata",
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
                            assetsetuoObject.Procurement_Uom = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table1") {
                            assetsetuoObject.Payables_Vendor = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table2") {
                            assetsetuoObject.FixedAsset_FAType = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table3") {
                            assetsetuoObject.Administrator_FixedAssetPosting = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table4") {
                            objnew[key] = {};
                            assetsetuoObject.FixedAsset_FASubType = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table5") {
                            assetsetuoObject.GeneralLedger_TaxGroup = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table6") {
                            assetsetuoObject.FixedAsset_DepreciationBookSetup = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table7") {
                            assetsetuoObject.FixedAsset_LocationMaster = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table8") {
                            assetsetuoObject.Administrator_Employee = JSON.stringify(objnew[key]);
                        }

                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });

        assetsetuoObject.do_render_lookup();
    },

    do_render_lookup: () => {
        var _html = [];
        var cntrl_cbo = [];
        cntrl_cbo = $("#div_main").find("select");
        $.each(cntrl_cbo, function (key, value) {


            if (value.id == 'dd_EmpRespId') {
                _html = [];
                var _data = JSON.parse(assetsetuoObject.Administrator_Employee);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.EName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_FALocId') {
                _html = [];
                var _data = JSON.parse(assetsetuoObject.FixedAsset_LocationMaster);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.LocName.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_UomId') {
                _html = [];
                var _data = JSON.parse(assetsetuoObject.Procurement_Uom);
                $.each(_data, function (key, value) {
                    _html.push(
                        //"<option value='" + value.GrpCd.replace(/[\r\n]+/gm, '') + "'>" + value.GrpCd.replace(/[\r\n]+/gm, '') + " (" + value.GrpName.replace(/[\r\n]+/gm, '') + ")</option>"
                        "<option value='" + value.RowId + "'>" + value.UomDesc.replace(/[\r\n]+/gm, '') + " (" + value.UomCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            else if (value.id == 'dd_MaintVendorId') {
                _html = [];
                var _data = JSON.parse(assetsetuoObject.Payables_Vendor);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "' vendorname='" + value.VendName.replace(/[\r\n]+/gm, '') + "'>" + value.VendCd.replace(/[\r\n]+/gm, '') + "</option>"
                    );
                });
            }
            else if (value.id == 'dd_FATypeId') {
                _html = [];
                var _data = JSON.parse(assetsetuoObject.FixedAsset_FAType);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.FAType.replace(/[\r\n]+/gm, '') + " (" + value.TypeCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            else if (value.id == 'dd_FAPostingGrpId') {
                _html = [];
                var _data = JSON.parse(assetsetuoObject.Administrator_FixedAssetPosting);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.GrpName.replace(/[\r\n]+/gm, '') + " (" + value.GrpCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            else if (value.id == 'dd_FASubType') {
                _html = [];
                var _data = JSON.parse(assetsetuoObject.FixedAsset_FASubType);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.FASubType.replace(/[\r\n]+/gm, '') + " (" + value.SubTypeCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            else if (value.id == 'dd_TaxGrpId') {
                _html = [];
                var _data = JSON.parse(assetsetuoObject.GeneralLedger_TaxGroup);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.GrpDesc.replace(/[\r\n]+/gm, '') + " (" + value.GrpCode.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }


            if (value.id == 'dd_EmpRespId' || value.id == 'dd_FALocId' || value.id == 'dd_UomId' || value.id == 'dd_FATypeId' || value.id == 'dd_FAPostingGrpId' || value.id == 'dd_FASubType' || value.id == 'dd_TaxGrpId') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='0' selected='selected'></option>");
            }
            else if (value.id = 'dd_MaintVendorId') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='0' vendorname='' selected='selected'></option>");
            }
        });

    },

    do_loadlist: () => {

        var _data = {};
        _data["cocd"] = assetsetuoObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "fixed-assets-master.aspx/loadlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                $("#assets_table").dataTable().fnDestroy();
                assetsetuoObject.do_populateList(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    //do_populateList: (obj) => {
    do_populateList: () => {
        // editor init

        table = $('#profile_table').DataTable({
            paging: false
        });

        table.destroy();

        var editor = new $.fn.dataTable.Editor({
            table: "#assets_table",
            fields: [
                //{ label: "DepnBookId_name", name: "DepnBookId_name" },
                { label: "DepnMethod_name", name: "DepnMethod_name" },
                { label: "DepnStFrom_txt", name: "DepnStFrom_txt" },
                { label: "DepnEndOn_txt", name: "DepnEndOn_txt" },
                { label: "SelfLife", name: "SelfLife" },
                { label: "DepnPer", name: "DepnPer" },
                { label: "BookValue", name: "BookValue" },
                { label: "SalvageValue", name: "SalvageValue" },
                { label: "BookValueAfterFullDepn", name: "BookValueAfterFullDepn" },
                { label: "DepnFrequency_txt", name: "DepnFrequency_txt" },
                { label: "DepnCalc_txt", name: "DepnCalc_txt" },
            ],
        });

        var roletable = $("#profile_table");
        //userstable.html("");

        var roledata = [];
        /*debugger;
        for (var i = 0; i < obj.length; i++) {
            var objnew = obj[i];
            for (var key in objnew) {
                var attrName = key;
                if (attrName.toLowerCase() == "table") {
                    roledata = objnew[key];
                }
            }
        };*/

        //assetsetuoObject.ProfileFrom.splice(0, 1);
        roledata = assetsetuoObject.ProfileFrom;


        roletable.dataTable({
            dom: "Bfrtip",
            "bPaginate": false,
            "bLengthChange": false,
            select: false,
            //"bFilter": false,
            "bInfo": false,
            "ordering": false,
            //dom: "Bfrtip",
            //fixedHeader: true,
            data: roledata,
            columns: [
                //{ data: "FAId_name" },
                { data: "DepnMethod_name" },
                { data: "DepnStFrom_txt" },
                { data: "DepnEndOn_txt" },
                { data: "SelfLife" },
                { data: "DepnPer" },
                { data: "BookValue" },
                { data: "SalvageValue" },
                { data: "BookValueAfterFullDepn" },
                { data: "DepnFrequency_txt" },
                { data: "DepnCalc_txt" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [25, 250, 25],
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: () => doaction('0', 'new'),
                    attr: {
                        title: 'New',
                        id: 'profile_create'
                    },
                },

                {
                    add: "remove", text: 'Delete', editor: editor, action: () => doaction($('.selected').attr('RowId'), 'delete'),
                    attr: {
                        title: 'Delete',
                        id: 'profilea_delete'
                    },
                },


            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
            },
        });


        var table = $('#profile_table').DataTable();

        if (!assetsetuoObject._createperm[0]) {
            $('#profile_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#profile_create').prop("disabled", true);
            $('#profile_create').attr('title', 'do not have permission to Add New Record!!!');

            table.button(0).action(function () {
                this.active(false);
            });
        }

        if (!assetsetuoObject._deleteperm[0]) {
            $('#profilea_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#profilea_delete').prop("disabled", true);
            $('#profilea_delete').attr('title', 'do not have permission to Delete Record!!!');

            table.button(3).action(function () {
                this.active(false);
                //this.disable();
            });
        }

        assetsetuoObject.do_disabledformodeview();

        $('.dataTables_scroll').css('overflow', 'auto hidden');


    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(assetsetuoObject);
        //assetsetuoObject.access = (assetsetuoObject.access).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '');
        assetsetuoObject.access = (assetsetuoObject.access).replace('\r\n', '');

        assetsetuoObject._vieweperm = MainObject.do_IsActionMenuPermission(assetsetuoObject.access, 'FIXED ASSETS', 'view');
        assetsetuoObject._createperm = MainObject.do_IsActionMenuPermission(assetsetuoObject.access, 'FIXED ASSETS', 'create');
        assetsetuoObject._editperm = MainObject.do_IsActionMenuPermission(assetsetuoObject.access, 'FIXED ASSETS', 'edit');
        assetsetuoObject._deleteperm = MainObject.do_IsActionMenuPermission(assetsetuoObject.access, 'FIXED ASSETS', 'delete');
        assetsetuoObject._mainmenuid = MainObject.do_IsActionMenuPermission(assetsetuoObject.access, 'FIXED ASSETS', 'menuid');

        assetsetuoObject._dimensionperm = MainObject.do_IsActionMenuPermission(assetsetuoObject.access, 'ASSETS DIMENSION', 'view');
        assetsetuoObject._loconperm = MainObject.do_IsActionMenuPermission(assetsetuoObject.access, 'LOCATION TRANSFER', 'view');
        assetsetuoObject._loanperm = MainObject.do_IsActionMenuPermission(assetsetuoObject.access, 'LOAN FIXED ASSET', 'view');
        assetsetuoObject._tranperm = MainObject.do_IsActionMenuPermission(assetsetuoObject.access, 'TRANSACTION', 'view');
    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["id"] = id;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "assets-setup.aspx/doedit",
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

                                assetsetuoObject.hdnid = objnew[key][0].RowId;

                                $('#txt_FACode').val(objnew[key][0].FACode);
                                $('#txt_FADesc').val(objnew[key][0].FADesc);
                                $('#txt_FASearchName').val(objnew[key][0].FASearchName);
                                $('#dd_EmpRespId').val(objnew[key][0].EmpRespId);

                                $('#txt_LastDepDt').val(objnew[key][0].LastDepDt);
                                $('#dd_FALocId').val(objnew[key][0].FALocId);
                                $('#dd_FALocId').prop("disabled", true);
                                if (objnew[key][0].IsBlock == true) {
                                    $('#chk_IsBlock').prop('checked', true);
                                }
                                else {
                                    $('#chk_IsBlock').prop('checked', false);
                                }

                                if (objnew[key][0].IsInactive == true) {
                                    $('#chk_IsInactive').prop('checked', true);
                                }
                                else {
                                    $('#chk_IsInactive').prop('checked', false);
                                }

                                //_data["FAPic"] = fd;
                                $('#dd_UomId').val(objnew[key][0].UomId);
                                $('#txt_Make').val(objnew[key][0].Make);
                                $('#txt_Model').val(objnew[key][0].Model);
                                $('#txt_SerialNo').val(objnew[key][0].SerialNo);
                                $("#txt_ModelYear").val(objnew[key][0].ModelYear);
                                $('#txt_DtOfMfg').val(objnew[key][0].DtOfMfg);
                                $('#dd_MaintVendorId').val(objnew[key][0].MaintVendorId);
                                getvendorname();
                                $('#txt_PlanedServcDt').val(objnew[key][0].PlanedServcDt);
                                $('#txt_NextServcDt').val(objnew[key][0].NextServcDt);
                                $("#txt_WarrantyPeriod").val(objnew[key][0].WarrantyPeriod);

                                if (objnew[key][0].Insured == true) {
                                    $('#chk_Insured').prop('checked', true);
                                }
                                else {
                                    $('#chk_Insured').prop('checked', false);
                                }

                                getchangeInsured($('#chk_Insured'));

                                $("#txt_InsurenceVendor").val(objnew[key][0].InsurenceVendor);
                                $('#txt_InsurenceDueDt').val(objnew[key][0].InsurenceDueDt);
                                $('#txt_ValueInsured').val(objnew[key][0].ValueInsured);
                                $('#txt_PolicyNo').val(objnew[key][0].PolicyNo);
                                $('#txt_PolicyExpDt').val(objnew[key][0].PolicyExpDt);
                                $("#dd_FATypeId").val(objnew[key][0].FATypeId);
                                populateSubTypeDropdownbyType(objnew[key][0].FASubType);
                                //$("#dd_FASubType").val(objnew[key][0].FASubType);
                                $('#dd_FAPostingGrpId').val(objnew[key][0].FAPostingGrpId);
                                $('#dd_TaxGrpId').val(objnew[key][0].TaxGrpId);


                            }
                        }
                        else if (attrName.toLowerCase() == "table1") {
                            var _data = JSON.parse(JSON.stringify(objnew[key]));
                            $.each(_data, function (key, value) {
                                //_html.push(
                                //    "<option value='" + value.RowId + "'>" + value.EName.replace(/[\r\n]+/gm, '') + "</option>"
                                //);

                                assetsetuoObject.ProfileFrom.push({
                                    RowId: value.RowId,
                                    FAId: value.FAId,
                                    FAId_name: value.FAId_name,
                                    DepnBookId: value.DepnBookId,
                                    DepnBookId_name: value.DepnBookId_name,
                                    DepnMethod: value.DepnMethod,
                                    DepnMethod_name: value.DepnMethod_name,
                                    DepnStFrom: value.DepnStFrom,
                                    DepnStFrom_txt: value.DepnStFrom_txt,
                                    DepnEndOn: value.DepnEndOn,
                                    DepnEndOn_txt: value.DepnEndOn_txt,
                                    SelfLife: value.SelfLife,
                                    DepnPer: value.DepnPer,
                                    BookValue: value.BookValue,
                                    SalvageValue: value.SalvageValue,
                                    BookValueAfterFullDepn: value.BookValueAfterFullDepn,
                                    DepnFrequency: value.DepnFrequency,
                                    DepnFrequency_txt: value.DepnFrequency_txt,
                                    DepnCalc: value.DepnCalc,
                                    DepnCalc_txt: value.DepnCalc_txt,
                                    type: value.type,
                                });

                            });

                            //assetsetuoObject.ProfileFrom = JSON.stringify(objnew[key]);
                            $("#profile_table").dataTable().fnDestroy();
                            assetsetuoObject.do_populateList();
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

    do_loaddpic: (id) => {
        var _data = {};
        _data["id"] = id;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        $.ajax({
            type: "POST",
            url: "assets-setup.aspx/Bindpics",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                debugger;
                if (!dochkses(result.d)) return;
                //var rest = result.d;
                $('#img_FAPic').attr('src', result.d);

                /*for (var i = 0; i < result.d.length; i++) {
                    $('#img_FAPic').attr('src', result.d[i].Pic);
                    //$("#tbDetails").append("<tr><td>"+ "<img src=" + "'" + result.d[i].Pic + "'" + " />" + "</td></tr>");
                }*/
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });
    },

};

var getchangeInsured = function (checkbox) {
    if (checkbox.checked == true) {
        $('#txt_ValueInsured').prop("disabled", false);
        $('#txt_PolicyNo').prop("disabled", false);
        $('#txt_InsurenceVendor').prop("disabled", false);
        $('#txt_PolicyExpDt').prop("disabled", false);
        $('#txt_InsurenceDueDt').prop("disabled", false);
    }
    else {
        $('#txt_ValueInsured').prop("disabled", true);
        $('#txt_ValueInsured').val('0');
        $('#txt_PolicyNo').prop("disabled", true);
        $('#txt_PolicyNo').val('0');
        $('#txt_InsurenceVendor').prop("disabled", true);
        $('#txt_InsurenceVendor').val('');
        $('#txt_PolicyExpDt').prop("disabled", true);
        $('#txt_PolicyExpDt').val('');
        $('#txt_InsurenceDueDt').prop("disabled", true);
        $('#txt_InsurenceDueDt').val('');

    }
};

var saveprofile = function () {
    var validate = true;

    var startDate = new Date($('#txt_DepnStFrom').val());
    var endDate = new Date($('#txt_DepnEndOn').val());

    if ($('#dd_DepnBookId').val() == '' || $('#dd_DepnBookId').val() == null) {
        validate = false;
        $.alertable.alert(`FA Book required.`);
        $("#dd_DepnBookId").focus();
        return false;
    }
    else if ($('#dd_DepnMethod').val() == '' || $('#dd_DepnMethod').val() == null) {
        validate = false;
        $.alertable.alert(`Depreciation Method required.`);
        $("#dd_DepnMethod").focus();
        return false;
    }

    else if ($.trim($('#txt_DepnStFrom').val()) == '') {
        validate = false;
        $.alertable.alert(`Depreciation Starting from required.`);
        $("#txt_DepnStFrom").focus();
        return false;
    }
    else if ($.trim($('#txt_DepnEndOn').val()) == '') {
        validate = false;
        $.alertable.alert(`Depreciation Ending required.`);
        $("#txt_DepnEndOn").focus();
        return false;
    }
    else if (endDate < startDate) {
        validate = false;
        $.alertable.alert(`Depreciation Ending on Should Greater Then Depreciation Starting from.`);
        $("#txt_DepnEndOn").focus();
        return false;
    }
    else if ($.trim($('#txt_SelfLife').val()) == '') {
        validate = false;
        $.alertable.alert(`Self Life (Months) required.`);
        $("#txt_SelfLife").focus();
        return false;
    }
    else if ($.trim($('#txt_DepnPer').val()) == '') {
        validate = false;
        $.alertable.alert(`Depreciation % required.`);
        $("#txt_DepnPer").focus();
        return false;
    }
    else if ($.trim($('#txt_SalvageValue').val()) == '') {
        validate = false;
        $.alertable.alert(`Salvage Value required.`);
        $("#txt_SalvageValue").focus();
        return false;
    }
    else if ($.trim($('#txt_BookValueAfterFullDepn').val()) == '') {
        validate = false;
        $.alertable.alert(`Book Value after full Depn. required.`);
        $("#txt_BookValueAfterFullDepn").focus();
        return false;
    }
    else if ($('#dd_DepnFrequency').val() == '' && $('#dd_DepnFrequency').val() == null) {
        validate = false;
        $.alertable.alert(`Depreciation Frequency required.`);
        $("#dd_DepnFrequency").focus();
        return false;
    }

    if (validate == true) {
        var maxid = assetsetuoObject.ProfileFrom.length + 1;

        assetsetuoObject.ProfileFrom.push({
            RowId: maxid,
            FAId: "0",
            FAId_name: "",
            DepnBookId: $('#dd_DepnBookId').val(),
            DepnBookId_name: $('#dd_DepnBookId option:selected').text(),
            DepnMethod: $('#dd_DepnMethod').val(),
            DepnMethod_name: $('#dd_DepnMethod option:selected').text(),
            DepnStFrom: $('#txt_DepnStFrom').val(),
            DepnStFrom_txt: $('#txt_DepnStFrom').val(),
            DepnEndOn: $('#txt_DepnEndOn').val(),
            DepnEndOn_txt: $('#txt_DepnEndOn').val(),
            SelfLife: isEmptyDecimal($('#txt_SelfLife')),
            DepnPer: isEmptyDecimal($('#txt_DepnPer')),
            BookValue: "0",
            SalvageValue: isEmptyDecimal($('#txt_SalvageValue')),
            BookValueAfterFullDepn: isEmptyDecimal($('#txt_BookValueAfterFullDepn')),
            DepnFrequency: $('#dd_DepnFrequency').val(),
            DepnFrequency_txt: $('#dd_DepnFrequency option:selected').text(),
            DepnCalc: $("#chk_DepnCalc").is(':checked'),
            DepnCalc_txt: $("#chk_DepnCalc").is(':checked') ? "Yes" : "No",
            type: 'new',
        });

        clearProfile();
        $("#profile_table").dataTable().fnDestroy();
        assetsetuoObject.do_populateList();
    }

};

var isEmptyDecimal = function (el) {
    if (el.val() == "") return 0
    else return el.val();

}

var clearProfile = function () {
    $("#myModalNEW").modal('hide');
    $('#dd_DepnBookId').val('');
    $('#txt_DepnStFrom').val('');
    $('#txt_DepnEndOn').val('');
    $('#txt_SelfLife').val('0');
    $('#txt_DepnPer').val('0');
    $('#txt_SalvageValue').val('0');
    $('#txt_BookValueAfterFullDepn').val('0');
    $('#dd_DepnMethod').val('');
    $('#dd_DepnFrequency').val('');
    $('#chk_DepnCalc').prop('checked', false);
};

var savedata = function () {

    var validate = true;

    if ($('#txt_FACode').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txt_FACode").focus();
        return false;
    }
    else if ($('#txt_FADesc').val() == '') {
        validate = false;
        $.alertable.alert(`Description required.`);
        $("#txt_FADesc").focus();
        return false;
    }
    else if ($('#txt_FASearchName').val() == '') {
        validate = false;
        $.alertable.alert(`Search Description required.`);
        $("#txt_FASearchName").focus();
        return false;
    }

    else if ($('#dd_FALocId').val() == '0') {
        validate = false;
        $.alertable.alert(`FA Location required.`);
        $("#dd_FALocId").focus();
        return false;
    }
    else if ($('#dd_UomId').val() == '0') {
        validate = false;
        $.alertable.alert(`Unit of Measurement	 required.`);
        $("#dd_UomId").focus();
        return false;
    }
    else if ($('#dd_FATypeId').val() == '0') {
        validate = false;
        $.alertable.alert(`FA Types required.`);
        $("#dd_FATypeId").focus();
        return false;
    }
    else if ($('#dd_FAPostingGrpId').val() == '0') {
        validate = false;
        $.alertable.alert(`FA Posting Group required.`);
        $("#dd_FAPostingGrpId").focus();
        return false;
    }
    else if ($('#dd_TaxGrpId').val() == '0') {
        validate = false;
        $.alertable.alert(`Tax Group required.`);
        $("#dd_TaxGrpId").focus();
        return false;
    }
    else if (assetsetuoObject.ProfileFrom.length <= 0) {
        validate = false;
        $.alertable.alert(`Depreciation Profile required.`);
        $("#profile_create").focus();
        return false;
    }

    else {
        var _data = '{id:"' + assetsetuoObject.hdnid + '", code: "' + encodeURIComponent($("#txt_FACode").val().trim()) + '", cocd: "' + encodeURIComponent(assetsetuoObject.cocd) + '"}';

        $.ajax({
            type: "POST",
            url: "assets-setup.aspx/docheckcode",
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
                        `Code Already Exists.\n Please Try Another Code.`
                    );
                    $("#txt_FACode").focus();
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

        if (assetsetuoObject.hdnid == undefined || assetsetuoObject.hdnid == 'undefined') assetsetuoObject.hdnid = '';
        _data["id"] = assetsetuoObject.hdnid;
        _data["cocd"] = assetsetuoObject.cocd;

        _data["FACode"] = $('#txt_FACode').val();
        _data["FADesc"] = $('#txt_FADesc').val();
        _data["FASearchName"] = $('#txt_FASearchName').val();
        _data["EmpRespId"] = $('#dd_EmpRespId').val();
        _data["LastDepDt"] = $('#txt_LastDepDt').val();
        _data["FALocId"] = $('#dd_FALocId').val();
        _data["IsBlock"] = $("#chk_IsBlock").is(':checked');
        _data["IsInactive"] = $("#chk_IsInactive").is(':checked');
        //_data["FAPic"] = fd;
        _data["UomId"] = $('#dd_UomId').val();
        _data["Make"] = $('#txt_Make').val();
        _data["Model"] = $('#txt_Model').val();
        _data["SerialNo"] = $('#txt_SerialNo').val();
        _data["ModelYear"] = $("#txt_ModelYear").val();
        _data["DtOfMfg"] = $('#txt_DtOfMfg').val();
        _data["MaintVendorId"] = $('#dd_MaintVendorId').val();
        _data["PlanedServcDt"] = $('#txt_PlanedServcDt').val();
        _data["NextServcDt"] = $('#txt_NextServcDt').val();
        _data["WarrantyPeriod"] = $("#txt_WarrantyPeriod").val();
        _data["Insured"] = $("#chk_Insured").is(':checked');
        _data["InsurenceVendor"] = $("#txt_InsurenceVendor").val();
        _data["InsurenceDueDt"] = $('#txt_InsurenceDueDt').val();
        _data["ValueInsured"] = isEmptyDecimal($('#txt_ValueInsured'));
        _data["PolicyNo"] = $('#txt_PolicyNo').val();
        _data["PolicyExpDt"] = $('#txt_PolicyExpDt').val();
        _data["FATypeId"] = $("#dd_FATypeId").val();
        _data["FASubType"] = $("#dd_FASubType").val();
        _data["FAPostingGrpId"] = $('#dd_FAPostingGrpId').val();
        _data["TaxGrpId"] = isEmptyDecimal($('#dd_TaxGrpId'));
        _data["ip"] = assetsetuoObject.ip;
        _data["profile"] = JSON.stringify(assetsetuoObject.ProfileFrom);
        _data["deletedimage"] = assetsetuoObject.deletedimage;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //_passdata.postedFiles = JSON.stringify(data);
        //console.log(JSON.stringify(_passdata));

        var _success = 0, _id = 0;

        var _url = "assets-setup.aspx/doSave";
        $.ajax({
            type: "POST",
            url: _url,
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                let suc = result.d.toString().split("|~|")[0];
                let acid = result.d.toString().split("|~|")[1];
                if (suc.toLowerCase() == `true`) {
                    _success = 1;
                }
                _id = acid;

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

        if (_success == 1) {

            if ($('#file_FAPic').val() != '') {
                var formData = new FormData();
                formData.append('file', $('#file_FAPic')[0].files[0]);

                $.ajax({
                    type: 'post',
                    url: 'fileuploadImage.ashx?delteimage=0&refid=' + _id,
                    data: formData,
                    success: function (status) {
                        if (status != 'error') {
                            //var my_path = "MediaUploader/" + status;
                            //$("#myUploadedImg").attr("src", my_path);
                            window.location = "fixed-assets-master.aspx";
                        }
                    },
                    processData: false,
                    contentType: false,
                    error: function () {
                        alert("Whoops something went wrong!");
                    }
                });
            }
            else if (assetsetuoObject.deletedimage == 1 && $('#file_FAPic').val() == '') {
                $.ajax({
                    type: 'post',
                    url: 'fileuploadImage.ashx?delteimage=1&refid=' + _id,
                    data: formData,
                    success: function (status) {
                        if (status != 'error') {
                            //var my_path = "MediaUploader/" + status;
                            //$("#myUploadedImg").attr("src", my_path);
                            window.location = "fixed-assets-master.aspx";
                        }
                    },
                    processData: false,
                    contentType: false,
                    error: function () {
                        alert("Whoops something went wrong!");
                    }
                });
            }
            else {
                window.location = "fixed-assets-master.aspx";

            }
        }
    }

};

var getvendorname = function () {
    var vendorname = $('option:selected', $('#dd_MaintVendorId')).attr('vendorname');
    $('#lbl_vendorname').html(vendorname);
};

var doactionModal = function (mode) {
    doaction(assetsetuoObject.hdnid, mode);
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'new') {
        //window.location = "assets-setup.aspx?id=" + id;
        var _html = [];
        var _data = JSON.parse(assetsetuoObject.FixedAsset_DepreciationBookSetup);
        $.each(_data, function (key, value) {
            _html.push(
                "<option value='" + value.RowId + "'>" + value.DepnDesc.replace(/[\r\n]+/gm, '') + " (" + value.DepnCode.replace(/[\r\n]+/gm, '') + ")</option>"
            );
        });

        $('#dd_DepnBookId').html(_html.join(""));
        $('#dd_DepnBookId').prepend("<option value='0' selected='selected'></option>");

        $("#myModalNEW").modal('show');
    }
    else if (mode == 'edit') {
        window.location = "assets-setup.aspx?id=" + id;
    }
    else if (mode == 'view') {

        window.location = "assets-setup.aspx?id=" + id;
    }
    else if (mode == 'delete') {

        $.alertable.custconfirm(`Are you want to delete the Depreciation Profile ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    for (var i = 0; i < assetsetuoObject.ProfileFrom.length; i++) {
                        if (assetsetuoObject.ProfileFrom[i].RowId == id) {

                            assetsetuoObject.ProfileFrom.splice(i, 1);
                        }
                    }

                    clearProfile();
                    $("#profile_table").dataTable().fnDestroy();
                    assetsetuoObject.do_populateList();

                },
            );
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

var doactiondimension = function (id, mode, code, name) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'dimension') {
        localStorage.vendor_dimension_Name = name;
        localStorage.vendor_dimension_Code = code

        window.location = "journal-batch-set-dimension.aspx?id=" + id + "&menuid=" + assetsetuoObject._menuid[1];
    }

};

var setTwoNumberDecimal = function (obj) {
    var obj_val = $('#' + obj.id).val();
    if (obj_val == '') obj_val = '0.00';
    $('#' + obj.id).val(parseFloat(obj_val).toFixed(2));
};

var onlyNumberKey = function (evt) {
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
};

var ShowIP = function (response) {
    assetsetuoObject.ip = response.ip;
};
function populateSubTypeDropdownbyType(sval) {
    var FATypeId;
    FATypeId = $("#dd_FATypeId").val();

    $.ajax({

        url: apiurl + 'api/GetFixedAssetFASubTypebyType',
        type: 'POST',
        data: { FATypeId: FATypeId },


        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            objVendor = response;
            var _html = [];
            _html.push("<option value='-1'>--Select--</option>")
            for (var i = 0; i < response.length; i++) {
                _html.push(
                    "<option value='" + response[i].RowId + "'>" + response[i].FASubType + "</option>"
                );
            }
            $("#dd_FASubType").html(_html.join(""));
            if (sval > 0) {
                $("#dd_FASubType").val(sval);
            }




        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function populatefaGroup() {
    

    $.ajax({

        url: apiurl + 'api/GetFixedAssetFAGroup',
        type: 'POST',
        data: { CoCd: $('#ddlCompany').val() },


        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            console.log(response);
            objVendor = response;
           
            var _html = [];
            _html.push("<option value='-1'>--Select--</option>")
            for (var i = 0; i < response.length; i++) {
                _html.push(
                    "<option value='" + response[i].RowId + "'>" + response[i].GroupDesc + "</option>"
                );
            }
            $("#ddFAGroup").html(_html.join(""));
            




        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function fnselectFAGroup() {
    alert(1);
    alert($('#sl1').val());
}

