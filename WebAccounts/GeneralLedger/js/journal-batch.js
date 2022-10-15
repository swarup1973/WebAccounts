$(document).ready(function () {
    JournalBatchObject.cocd = $('#ddlCompany').val();
    JournalBatchObject.do_loadlist();
    JournalBatchObject.do_loadlookup();
    JournalBatchObject.do_getUserPagepermission();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var JournalBatchObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _dimensionviewperm: false,
    _menuid: '',
    _mainmenuid: '',
    _lastmenuid: '',

    DocumentType: [],
    TransactionType: [],
    DebitACType: [],
    DebitACNo: [],
    CreditACType: [],
    CreditACNo: [],
    NoSequence: [],
    UserTypeR: [],
    UserTypeU: [],

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = JournalBatchObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            async: false,
            url: "journal-batch.aspx/loadlookupdata",
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
                            JournalBatchObject.DocumentType = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table1") {
                            JournalBatchObject.TransactionType = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table2") {
                            JournalBatchObject.DebitACType = JSON.stringify(objnew[key]);
                            JournalBatchObject.CreditACType = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table3") {
                            JournalBatchObject.DebitACNo = JSON.stringify(objnew[key]);
                            JournalBatchObject.CreditACNo = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table4") {
                            JournalBatchObject.NoSequence = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table5") {
                            JournalBatchObject.UserTypeR = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table6") {
                            JournalBatchObject.UserTypeU = JSON.stringify(objnew[key]);
                        }

                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_render_lookup: () => {
        var _html = [];
        var cntrl_cbo = [];
        cntrl_cbo = $("#div_modal").find("select");
        $.each(cntrl_cbo, function (key, value) {
            if (value.id == 'dd_DocTypeId') {
                _html = [];
                var _data = JSON.parse(JournalBatchObject.DocumentType);
                $.each(_data, function (key, value) {
                    _html.push(
                        //"<option value='" + value.GrpCd.replace(/[\r\n]+/gm, '') + "'>" + value.GrpCd.replace(/[\r\n]+/gm, '') + " (" + value.GrpName.replace(/[\r\n]+/gm, '') + ")</option>"
                        "<option value='" + value.RowId + "'>" + value.TypeDesc.replace(/[\r\n]+/gm, '') + " (" + value.TypeCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            else if (value.id == 'dd_TranTypeId') {
                _html = [];
                var _data = JSON.parse(JournalBatchObject.TransactionType);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.TypeDesc.replace(/[\r\n]+/gm, '') + " (" + value.TypeCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            else if (value.id == 'dd_DrAcType') {
                _html = [];
                var _data = JSON.parse(JournalBatchObject.DebitACType);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.TypeDesc.replace(/[\r\n]+/gm, '') + " (" + value.TypeCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            /*else if (value.id == 'dd_DrAcNo') {
                _html = [];
                var _data = JSON.parse(JournalBatchObject.DebitACNo);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.AcId.replace(/[\r\n]+/gm, '') + "'>" + value.AcDesc.replace(/[\r\n]+/gm, '') + " (" + value.AcCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }*/
            else if (value.id == 'dd_CrAcType') {
                _html = [];
                var _data = JSON.parse(JournalBatchObject.CreditACType);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.TypeDesc.replace(/[\r\n]+/gm, '') + " (" + value.TypeCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }
            /*else if (value.id == 'dd_CrAcNo') {
                _html = [];
                var _data = JSON.parse(JournalBatchObject.CreditACNo);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.AcId.replace(/[\r\n]+/gm, '') + "'>" + value.AcDesc.replace(/[\r\n]+/gm, '') + " (" + value.AcCd.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }*/
            else if (value.id == 'dd_NoSequenceId') {
                _html = [];
                var _data = JSON.parse(JournalBatchObject.NoSequence);
                $.each(_data, function (key, value) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.NsDescription.replace(/[\r\n]+/gm, '') + " (" + value.NsCode.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                });
            }


            if (value.id != 'dd_UserTypeId' && value.id != 'dd_DrAcNo' && value.id != 'dd_CrAcNo' && value.id != 'dd_UserType' && value.id != 'dd_ApprovalCode') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='' selected='selected'></option>");
            }
        });

    },

    do_debitacno: (val) => {
        var _html = [];
        var _data;
        if ($.trim(val) != '') {
            _data = JSON.parse(JournalBatchObject.DebitACNo);
            $.each(_data, function (key, value) {
                _html.push(
                    "<option value='" + value.AcId + "'>" + value.AcDesc.replace(/[\r\n]+/gm, '') + " (" + value.AcCd.replace(/[\r\n]+/gm, '') + ")</option>"
                );
            });
        }
        else {
            $('#dd_DrAcNo').html(_html.join(""));
            $('#dd_DrAcNo').prepend("<option value='' selected='selected'></option>");
            return;
        }


        $('#dd_DrAcNo').html(_html.join(""));
        $('#dd_DrAcNo').prepend("<option value='' selected='selected'></option>");
    },

    do_documenttype: (val) => {
        var _html = [];
        var _data;
        $("#chk_ApplyGenJrnl").prop("disabled", true);
        $('#chk_ApplyGenJrnl').prop('checked', false);
        $("#chk_ApplyPurJrnl").prop("disabled", true);
        $('#chk_ApplyPurJrnl').prop('checked', false);
        $("#chk_ApplySalesJrnl").prop("disabled", true);
        $('#chk_ApplySalesJrnl').prop('checked', false);
        $("#chk_ApplyRecptJrnl").prop("disabled", true);
        $('#chk_ApplyRecptJrnl').prop('checked', false);
        $("#chk_ApplyPmtJrnl").prop("disabled", true);
        $('#chk_ApplyPmtJrnl').prop('checked', false);
        $("#chk_ApplyFAJrnl").prop("disabled", true);
        $('#chk_ApplyFAJrnl').prop('checked', false);
        $("#chk_ApplyPayJrnl").prop("disabled", true);
        $('#chk_ApplyPayJrnl').prop('checked', false);

        //payment, receipt, journal, tax
        if ($.trim(val) == '1' || $.trim(val) == '2' || $.trim(val) == '5' || $.trim(val) == '8') {
            $("#chk_ApplyGenJrnl").prop("disabled", false);
            $("#chk_ApplyRecptJrnl").prop("disabled", false);
            $("#chk_ApplyPmtJrnl").prop("disabled", false);
        }
        //purchase
        else if ($.trim(val) == '3') {
            $('#chk_ApplyPurJrnl').prop('checked', true);
        }
        //sale
        else if ($.trim(val) == '4') {
            $('#chk_ApplySalesJrnl').prop('checked', true);
        }
        //fixed asset
        else if ($.trim(val) == '6') {
            $('#chk_ApplyFAJrnl').prop('checked', true);
        }
        //payroll
        else if ($.trim(val) == '7') {
            $('#chk_ApplyPayJrnl').prop('checked', true);
        }
        else {
            return;
        }
    },

    do_creditacno: (val) => {
        var _html = [];
        var _data;
        if ($.trim(val) != '') {
            _data = JSON.parse(JournalBatchObject.DebitACNo);
            $.each(_data, function (key, value) {
                _html.push(
                    "<option value='" + value.AcId + "'>" + value.AcDesc.replace(/[\r\n]+/gm, '') + " (" + value.AcCd.replace(/[\r\n]+/gm, '') + ")</option>"
                );
            });
        }
        else {
            $('#dd_CrAcNo').html(_html.join(""));
            $('#dd_CrAcNo').prepend("<option value='' selected='selected'></option>");
            return;
        }


        $('#dd_CrAcNo').html(_html.join(""));
        $('#dd_CrAcNo').prepend("<option value='' selected='selected'></option>");
    },

    do_loadUser: (val) => {
        var _html = [];
        var _data;
        if (val == 'U') {
            _data = JSON.parse(JournalBatchObject.UserTypeU);
            $.each(_data, function (key, value) {
                _html.push(
                    "<option value='" + value.UserId + "'>" + value.EName.replace(/[\r\n]+/gm, '') + "</option>"
                );
            });
        }
        else if (val == 'R') {
            _data = JSON.parse(JournalBatchObject.UserTypeR);
            $.each(_data, function (key, value) {
                _html.push(
                    "<option value='" + value.RowId + "'>" + value.Description.replace(/[\r\n]+/gm, '') + " (" + value.RoleCd.replace(/[\r\n]+/gm, '') + ")</option>"
                );
            });
        }
        else {
            $('#dd_UserTypeId').html(_html.join(""));
            $('#dd_UserTypeId').prepend("<option value='' selected='selected'></option>");
            return;
        }


        $('#dd_UserTypeId').html(_html.join(""));
        $('#dd_UserTypeId').prepend("<option value='' selected='selected'></option>");
    },

    do_loadlist: () => {

        var _data = {};
        _data["cocd"] = JournalBatchObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "journal-batch.aspx/loadlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                $("#journal_table").dataTable().fnDestroy();
                JournalBatchObject.do_populateList(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateList: (obj) => {
        // editor init
        table = $('#journal_table').DataTable({
            paging: false
        });

        table.destroy();

        var editor = new $.fn.dataTable.Editor({
            table: "#journal_table",
            fields: [
                { label: "BatchCd", name: "BatchCd" },
                { label: "BatchDesc", name: "BatchDesc" },
                { label: "DocTypeDesc", name: "DocTypeDesc" },
                { label: "TranTypeDesc", name: "TranTypeDesc" },
                { label: "DrAcTypeDesc", name: "DrAcTypeDesc" },
                { label: "DrAcNo", name: "DrAcNo" },
                { label: "CrAcTypeDesc", name: "CrAcTypeDesc" },
                { label: "CrAcNo", name: "CrAcNo" },
                { label: "NsDescription", name: "NsDescription" },
                { label: "ApprovalCode", name: "ApprovalCode" },
                { label: "UserType", name: "UserType" },
                { label: "Username", name: "Username" },
                { label: "ApplyGenJrnl", name: "ApplyGenJrnl" },
                { label: "ApplyPurJrnl", name: "ApplyPurJrnl" },
                { label: "ApplySalesJrnl", name: "ApplySalesJrnl" },
                { label: "ApplyRecptJrnl", name: "ApplyRecptJrnl" },
                { label: "ApplyPmtJrnl", name: "ApplyPmtJrnl" },
                { label: "ApplyFAJrnl", name: "ApplyFAJrnl" },
                { label: "ApplyPayJrnl", name: "ApplyPayJrnl" },
            ],
        });

        var roletable = $("#journal_table");
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
                { data: "BatchCd" },
                { data: "BatchDesc" },
                { data: "DocTypeDesc" },
                { data: "TranTypeDesc" },
                { data: "DrAcTypeDesc" },
                { data: "DrAcNo" },
                { data: "CrAcTypeDesc" },
                { data: "CrAcNo" },
                { data: "NsDescription" },
                { data: "ApprovalCode" },
                { data: "UserType" },
                { data: "Username" },
                { data: "ApplyGenJrnl" },
                { data: "ApplyPurJrnl" },
                { data: "ApplySalesJrnl" },
                { data: "ApplyRecptJrnl" },
                { data: "ApplyPmtJrnl" },
                { data: "ApplyFAJrnl" },
                { data: "ApplyPayJrnl" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            buttons: [
                {
                    add: "create", text: 'New', disabled: 'true', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'journal_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: () => doaction($('.selected').attr('RowId'), 'edit'),
                    attr: {
                        title: 'Edit',
                        id: 'journal_edit'
                    },
                },
                {
                    add: "remove", text: 'Delete', editor: editor, action: () => doaction($('.selected').attr('RowId'), 'delete'),
                    attr: {
                        title: 'Delete',
                        id: 'journal_delete'
                    },
                },

                {
                    add: "dimension", text: 'Dimension Set-up', editor: editor, action: function () { doactiondimension($('.selected').attr('RowId'), 'dimension', $('.selected').attr('BatchCd'), $('.selected').attr('BatchDesc')) },
                    attr: {
                        title: 'Dimension',
                        id: 'journal_dimension'
                    },
                },

            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("BatchCd", `${data.BatchCd}`);
                $(row).attr("BatchDesc", `${data.BatchDesc}`);
            },
        });


        var table = $('#journal_table').DataTable();

        if (!JournalBatchObject._createperm[0]) {
            $('#journal_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#journal_create').prop("disabled", true);
            $('#journal_create').attr('title', 'do not have permission to Add New Record!!!');

            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!JournalBatchObject._editperm[0]) {
            $('#journal_edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#journal_edit').prop("disabled", true);
            $('#journal_edit').attr('title', 'do not have permission to Edit Record!!!');

            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!JournalBatchObject._deleteperm[0]) {
            $('#journal_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#journal_delete').prop("disabled", true);
            $('#journal_delete').attr('title', 'do not have permission to Delete Record!!!');

            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!JournalBatchObject._dimensionviewperm[0]) {
            $('#journal_dimension').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#journal_dimension').prop("disabled", true);
            $('#journal_dimension').attr('title', 'do not have permission to View Dimension!!!');

            table.button(3).action(function () {
                this.active(false);
            });
        }

        $('.dataTables_scroll').css('overflow', 'auto hidden');

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
            url: "journal-batch.aspx/doedit",
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

                                JournalBatchObject.hdnid = objnew[key][0].RowId;
                                $('#txt_BatchCd').val(objnew[key][0].BatchCd);
                                $('#txt_BatchCd').prop('readonly', true);
                                $('#txt_BatchDesc').val(objnew[key][0].BatchDesc);

                                if (objnew[key][0].DocTypeId == '0') $('#dd_DocTypeId').val('');
                                else $('#dd_DocTypeId').val(objnew[key][0].DocTypeId);

                                if (objnew[key][0].TranTypeId == '0') $('#dd_TranTypeId').val('');
                                else $('#dd_TranTypeId').val(objnew[key][0].TranTypeId);

                                if (objnew[key][0].DrAcType == '0') $('#dd_DrAcType').val('');
                                else $('#dd_DrAcType').val(objnew[key][0].DrAcType);

                                JournalBatchObject.do_documenttype(objnew[key][0].DrAcType);
                                JournalBatchObject.do_debitacno(objnew[key][0].DrAcType);
                                if (objnew[key][0].DrAcNo == '0') $('#dd_DrAcNo').val('');
                                else $('#dd_DrAcNo').val(objnew[key][0].DrAcNo);

                                if (objnew[key][0].CrAcType == '0') $('#dd_CrAcType').val('');
                                else $('#dd_CrAcType').val(objnew[key][0].CrAcType);
                                JournalBatchObject.do_creditacno(objnew[key][0].CrAcType);
                                if (objnew[key][0].CrAcNo == '0') $('#dd_CrAcNo').val('');
                                else $('#dd_CrAcNo').val(objnew[key][0].CrAcNo);

                                if (objnew[key][0].NoSequenceId == '0') $('#dd_NoSequenceId').val('');
                                else $('#dd_NoSequenceId').val(objnew[key][0].NoSequenceId);
                                if (objnew[key][0].ApprovalCode == '0') $('#dd_ApprovalCode').val('');
                                else $('#dd_ApprovalCode').val(objnew[key][0].ApprovalCode);

                                if (objnew[key][0].UserType == '0') $('#dd_UserType').val('');
                                else $('#dd_UserType').val(objnew[key][0].UserType);
                                JournalBatchObject.do_loadUser(objnew[key][0].UserType);
                                if (objnew[key][0].UserTypeId == '0') $('#dd_UserTypeId').val('');
                                else $('#dd_UserTypeId').val(objnew[key][0].UserTypeId);

                                if (objnew[key][0].ApplyGenJrnl == true) {
                                    $('#chk_ApplyGenJrnl').prop('checked', true);
                                }
                                else {
                                    $('#chk_ApplyGenJrnl').prop('checked', false);
                                }

                                if (objnew[key][0].ApplyPurJrnl == true) {
                                    $('#chk_ApplyPurJrnl').prop('checked', true);
                                }
                                else {
                                    $('#chk_ApplyPurJrnl').prop('checked', false);
                                }

                                if (objnew[key][0].ApplySalesJrnl == true) {
                                    $('#chk_ApplySalesJrnl').prop('checked', true);
                                }
                                else {
                                    $('#chk_ApplySalesJrnl').prop('checked', false);
                                }

                                if (objnew[key][0].ApplyRecptJrnl == true) {
                                    $('#chk_ApplyRecptJrnl').prop('checked', true);
                                }
                                else {
                                    $('#chk_ApplyRecptJrnl').prop('checked', false);
                                }

                                if (objnew[key][0].ApplyPmtJrnl == true) {
                                    $('#chk_ApplyPmtJrnl').prop('checked', true);
                                }
                                else {
                                    $('#chk_ApplyPmtJrnl').prop('checked', false);
                                }

                                if (objnew[key][0].ApplyFAJrnl == true) {
                                    $('#chk_ApplyFAJrnl').prop('checked', true);
                                }
                                else {
                                    $('#chk_ApplyFAJrnl').prop('checked', false);
                                }

                                if (objnew[key][0].ApplyPayJrnl == true) {
                                    $('#chk_ApplyPayJrnl').prop('checked', true);
                                }
                                else {
                                    $('#chk_ApplyPayJrnl').prop('checked', false);
                                }


                                if (objnew[key][0].IsBlock == true) {
                                    $('#chk_isblocked').prop('checked', true);
                                }
                                else {
                                    $('#chk_isblocked').prop('checked', false);
                                }

                                $('#div_block').show();
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
        MainObject.do_getuserpageaccess(JournalBatchObject);
        JournalBatchObject._vieweperm = MainObject.do_IsActionMenuPermission(JournalBatchObject.access, 'Journal Batch', 'view');
        JournalBatchObject._createperm = MainObject.do_IsActionMenuPermission(JournalBatchObject.access, 'Journal Batch', 'create');
        JournalBatchObject._editperm = MainObject.do_IsActionMenuPermission(JournalBatchObject.access, 'Journal Batch', 'edit');
        JournalBatchObject._deleteperm = MainObject.do_IsActionMenuPermission(JournalBatchObject.access, 'Journal Batch', 'delete');

        JournalBatchObject._mainmenuid = MainObject.do_IsActionMenuPermission(JournalBatchObject.access, 'Journal Batch', 'menuid');
        JournalBatchObject._dimensionviewperm = MainObject.do_IsActionMenuPermission(JournalBatchObject.access, 'DIMENSION SET-UP', 'view');
        JournalBatchObject._menuid = MainObject.do_IsActionMenuPermission(JournalBatchObject.access, 'DIMENSION SET-UP', 'menuid');
    },

};

var showmodal = function () {
    $('.modal-title').html('Journal Batch - New');

    JournalBatchObject.hdnid = '';
    $("#div_modal").find("*").prop('disabled', false);

    //$('#btnEdit').hide();
    //$('#btnDelete').hide();
    $('#btn_save').show();

    $('#txt_BatchCd').val('');
    $('#txt_BatchCd').prop('readonly', false);
    $('#txt_BatchDesc').val('');
    $('#dd_DocTypeId').val('');
    $('#dd_TranTypeId').val('');
    $('#dd_DrAcType').val('');
    $('#dd_DrAcNo').val('');
    $('#dd_CrAcType').val('');
    $('#dd_CrAcNo').val('');
    $('#dd_NoSequenceId').val('');
    $('#dd_ApprovalCode').val('');
    $('#dd_UserType').val('N');
    $('#dd_UserTypeId').val('');
    $('#chk_ApplyGenJrnl').prop('checked', false);
    $('#chk_ApplyPurJrnl').prop('checked', false);
    $('#chk_ApplySalesJrnl').prop('checked', false);
    $('#chk_ApplyRecptJrnl').prop('checked', false);
    $('#chk_ApplyPmtJrnl').prop('checked', false);
    $('#chk_ApplyFAJrnl').prop('checked', false);
    $('#chk_ApplyPayJrnl').prop('checked', false);
    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();
    JournalBatchObject.do_render_lookup();
    JournalBatchObject.do_documenttype($('#dd_DocTypeId').val(''));
    $("#myModal").modal('show');

};

var savedata = function () {
    var validate = true;

    if ($('#txt_BatchCd').val() == '') {
        validate = false;
        $.alertable.alert(`Batch Code required.`);
        $("#txt_BatchCd").focus();
        return false;
    }
    else if ($('#txt_BatchDesc').val() == '') {
        validate = false;
        $.alertable.alert(`Batch Description required.`);
        $("#txt_BatchDesc").focus();
        return false;
    }
    else if ($('#dd_DocTypeId').val() == '') {
        validate = false;
        $.alertable.alert(`Document Type required.`);
        $("#dd_DocTypeId").focus();
        return false;
    }
    else if ($('#dd_DrAcType').val() != '' && $('#dd_DrAcNo').val() == '') {
        validate = false;
        $.alertable.alert(`Debit AC No. required.`);
        $("#dd_DrAcNo").focus();
        return false;
    }
    else if ($('#dd_CrAcType').val() != '' && $('#dd_CrAcNo').val() == '') {
        validate = false;
        $.alertable.alert(`Credit AC No. required.`);
        $("#dd_CrAcNo").focus();
        return false;
    }
    else if ($('#dd_NoSequenceId').val() == '') {
        validate = false;
        $.alertable.alert(`No Sequence required.`);
        $("#dd_NoSequenceId").focus();
        return false;
    }
    else if ($('#dd_UserType').val() != 'N' && $('#dd_UserTypeId').val() == '') {
        validate = false;
        $.alertable.alert(`User/User Group required.`);
        $("#dd_UserTypeId").focus();
        return false;
    }

    else {
        var _data = '{id:"' + JournalBatchObject.hdnid + '", code: "' + encodeURIComponent($("#txt_BatchCd").val().trim()) + '", cocd: "' + encodeURIComponent(JournalBatchObject.cocd) + '"}';

        $.ajax({
            type: "POST",
            url: "journal-batch.aspx/docheckcode",
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
                    $("#txt_BatchCd").focus();
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

        if (JournalBatchObject.hdnid == undefined || JournalBatchObject.hdnid == 'undefined') JournalBatchObject.hdnid = '';
        _data["id"] = JournalBatchObject.hdnid;
        _data["cocd"] = JournalBatchObject.cocd;

        _data["code"] = $('#txt_BatchCd').val();
        _data["BatchDesc"] = $('#txt_BatchDesc').val();
        _data["DocTypeId"] = $('#dd_DocTypeId').val();
        _data["TranTypeId"] = $('#dd_TranTypeId').val();
        _data["DrAcType"] = $('#dd_DrAcType').val();
        _data["DrAcNo"] = $('#dd_DrAcNo').val();
        _data["CrAcType"] = $('#dd_CrAcType').val();
        _data["CrAcNo"] = $('#dd_CrAcNo').val();
        _data["NoSequenceId"] = $('#dd_NoSequenceId').val();
        _data["ApprovalCode"] = $('#dd_ApprovalCode').val();
        _data["UserType"] = $('#dd_UserType').val();
        _data["UserTypeId"] = $('#dd_UserTypeId').val();

        _data["ApplyGenJrnl"] = $("#chk_ApplyGenJrnl").is(':checked');
        _data["ApplyPurJrnl"] = $("#chk_ApplyPurJrnl").is(':checked');
        _data["ApplySalesJrnl"] = $("#chk_ApplySalesJrnl").is(':checked');
        _data["ApplyRecptJrnl"] = $("#chk_ApplyRecptJrnl").is(':checked');
        _data["ApplyPmtJrnl"] = $("#chk_ApplyPmtJrnl").is(':checked');
        _data["ApplyFAJrnl"] = $("#chk_ApplyFAJrnl").is(':checked');
        _data["ApplyPayJrnl"] = $("#chk_ApplyPayJrnl").is(':checked');
        _data["isblocked"] = $("#chk_isblocked").is(':checked');

        _data["ip"] = JournalBatchObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "journal-batch.aspx/doSave";
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
                    //window.location = "journal-batch.aspx";
                    $("#myModal").modal('hide');
                    JournalBatchObject.do_loadlist();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var doactionModal = function (mode) {
    doaction(JournalBatchObject.hdnid, mode);
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {
        showmodal();
        JournalBatchObject.do_loaddataedit(id);
        $('.modal-title').html('Journal Batch - Edit');
        $('#txt_BatchDesc').focus();
    }
    else if (mode == 'view') {

        JournalBatchObject.do_loaddataedit(id);
        showmodal();
        $('.modal-title').html('Vendor Account - View');

        if (JournalBatchObject._editperm) {
            $('#btnEdit').show();
        }
        if (JournalBatchObject._deleteperm) {
            $('#btnDelete').show();
        }

        $('#btn_save').hide();
        $("#div_modal").find("*").prop('disabled', true);
        //$('#txt_VendName').focus();
    }
    else if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '"}';

        $.ajax({
            type: "POST",
            url: "journal-batch.aspx/docheckdelete",
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
                .custconfirm(`Are you want to delete this  Journal-Batch?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + id + '"}';

                        $.ajax({
                            type: "POST",
                            url: "journal-batch.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    $("#myModal").modal('hide');
                                    JournalBatchObject.do_loadlist();
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
    }

    else if (mode == 'dimension') {
        localStorage.BankAccount_dimension_BankName = bankName;
        localStorage.BankAccount_dimension_AcNumber = acNumber

        window.location = "vendor-dimension.aspx?id=" + id;
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

        window.location = "journal-batch-set-dimension.aspx?id=" + id + "&menuid=" + JournalBatchObject._menuid[1];
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
    JournalBatchObject.ip = response.ip;
};

var OnchangeIsWitholdingTaxApp = function () {
    if ($("#chk_IsWitholdingTaxApp").is(':checked')) {
        $("#dd_WHTaxGrpCd").prop("disabled", false);
    }
    else {
        $("#dd_WHTaxGrpCd").prop("disabled", true);
        $("#dd_WHTaxGrpCd").val('');
    }
};


