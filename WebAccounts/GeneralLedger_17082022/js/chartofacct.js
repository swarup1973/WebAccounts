$(document).ready(function () {
    if (localStorage._chartofacctpagemenuid == '' || localStorage._chartofacctpagemenuid == undefined) {
        localStorage._chartofacctpagemenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._chartofacctpagemenuid;
    }
});
var ChartofacctObject = {
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _transaction: false,
    _transactiondimension: false,
    _transactionmenuid: '',
    _transactiondimensionmenuid: '',
    _chartofacctpagemenuid: '',

    coadata: [
        {
            pageid: "",
            actionmode: "",
            userid: "",
        },
    ],

    do_init: () => {
        ChartofacctObject.coadata.pageid = "128_coa";
        ChartofacctObject.do_getUserPagepermission();
        ChartofacctObject.lookup.do_loadlookup();
        ChartofacctObject.do_loadchatofacctlist();
        
    },

    do_getUserPagepermission: () =>
    {
        MainObject.do_getuserpageaccess(ChartofacctObject);
        ChartofacctObject._createperm = MainObject.do_IsActionMenuPermission(ChartofacctObject.access, 'CHART OF ACCOUNTS(COA)', 'create');//create
        ChartofacctObject._editperm = MainObject.do_IsActionMenuPermission(ChartofacctObject.access, 'CHART OF ACCOUNTS(COA)', 'edit');
        ChartofacctObject._deleteperm = MainObject.do_IsActionMenuPermission(ChartofacctObject.access, 'CHART OF ACCOUNTS(COA)', 'delete');
        ChartofacctObject._vieweperm = MainObject.do_IsActionMenuPermission(ChartofacctObject.access, 'CHART OF ACCOUNTS(COA)', 'view');
        ChartofacctObject._transaction = MainObject.do_IsActionMenuPermission(ChartofacctObject.access, 'Transaction', 'view');
        ChartofacctObject._transactiondimension = MainObject.do_IsActionMenuPermission(ChartofacctObject.access, 'Transaction by Dimension', 'view');

        ChartofacctObject._transactionmenuid = MainObject.do_IsActionMenuPermission(ChartofacctObject.access, 'Transaction', 'menuid');
        ChartofacctObject._transactiondimensionmenuid = MainObject.do_IsActionMenuPermission(ChartofacctObject.access, 'Transaction by Dimension', 'menuid');

    },

    lookup: {
        iscache: false,
        fa_AcType: [
            {
                AcTypeCd: "",
                AcType: "",
            },
        ],

        fa_Group: [
            {
                grpCd: "",
                grpDesc: "",
                IsGrpRangeFromReq: "",
                IsGrpRangeToReq: "",
                IsDispBal: "",
            },
        ],

        GroupRangeFrom: [
            {
                acid: "",
                grprangefrom: "",
            },
        ],

        do_loadlookup: () => {
            if (
                localStorage.chartofacctobject_lookup == undefined ||
                localStorage.chartofacctobject_lookup == "undefined"
            ) {
                $.ajax({
                    type: "POST",
                    async: false,
                    url: "chartofacct.aspx/loadlookupdata",
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
                                    //fa_AcType
                                    ChartofacctObject.lookup.fa_AcType = objnew[key];
                                }
                                if (attrName.toLowerCase() == "table1") {
                                    //fa_Group
                                    ChartofacctObject.lookup.fa_Group = objnew[key];
                                }
                            }
                            ChartofacctObject.lookup.iscache = true;
                            localStorage.chartofacctobject_lookup = JSON.stringify(
                                ChartofacctObject.lookup
                            );
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status + " - Error occurred");
                    },
                });
            } else {
                var lookup_object = JSON.parse(localStorage.chartofacctobject_lookup);
                ChartofacctObject.lookup.iscache = true;
                ChartofacctObject.lookup.fa_AcType = lookup_object.fa_AcType;
                ChartofacctObject.lookup.fa_Group = lookup_object.fa_Group;
            }
        },
    },

    do_loadchatofacctlist: () => {
        $.ajax({
            type: "POST",
            url: "chartofacct.aspx/loadchatofacctlist",
            data: JSON.stringify({ CoCd: $("#ddlCompany").val() }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                dopopulatechatofaccttable(obj);
            },
            failure: function (response) {
                $.alertable.alert(`Problem in retreiving items...`);
            },
        });
    },
};

const dopopulatechatofaccttable = (obj) => {
    //insertEmptyRow();
    var html = "";
    var visstyle = "";
    $("#coa_accounts_table").html("");

    var chartofacctdata = [];

    for (var i = 0; i < obj.length; i++) {
        var objnew = obj[i];
        for (var key in objnew) {
            var attrName = key;
            if (attrName.toLowerCase() == "table") {
                chartofacctdata = objnew[key];
            }
        }
    }


    $("#coa_accounts_table").append(
        "<thead> " +
        "<tr class= 'coa_row coa_header_row sticky-header'>" +
        "<th class='coa_header sticky-header' scope='col'>" +
        "A/C Code" +
        "</th>" +
        "<th class='coa_header sticky-header' scope='col'>Description</th>" +
        "<th class='coa_header sticky-header' scope='col'>" +
        "Type" +
        "</th>" +
        "<th class='coa_header sticky-header' scope='col'>" +
        "Group" +
        "</th>" +
        "<th class='coa_header sticky-header' scope='col'>" +
        "Group Range from" +
        "</th>" +
        "<th class='coa_header sticky-header' scope='col'>" +
        "Group Range to" +
        "</th>" +
        "<th class='coa_header sticky-header' scope='col'>Balance</th>" +
        "</tr>" +
        "</thead><tbody>"
    );


    $("#coa_accounts_table").append("</tbody>");

    //ashim
    // editor init
    var editor = new $.fn.dataTable.Editor({
        table: "#coa_accounts_table",
        fields: [
            { label: "A/C Code", name: "AcCd" },
            { label: "Description", name: "AcDesc" },
            { label: "Type", name: "AcTypeCd" },
            { label: "Group", name: "grpCd" },
            { label: "Group Range from", name: "grpRangeFrom" },
            { label: "Group Range to", name: "grpRangeTo" },
            { label: "Balance", name: "balance" }
            //{ label: "Action", name: "AcId" },
        ],
    });
    const tableEl = $("#coa_accounts_table");
    // datatables init
    //$('.selected').attr('id')
    //tableEl.DataTable({


    //tableEl.destroy();

    tableEl.dataTable({
        dom: "Bfrtip",
        fixedHeader: true,
        data: chartofacctdata,
        columns: [
            { data: "AcCd" },
            { data: "AcDesc" },
            { data: "AcTypeCd" },
            { data: "grpCd" },
            { data: "grpRangeFrom" },
            { data: "grpRangeTo" },
            { data: "balance" },

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
        buttons: [
            {
                extend: "create", editor: editor, action: function () { newChartofacct(); },
                attr: {
                    title: 'New',
                    id: 'chartofacct_new'
                },
            }, 
            {
                add: "view", text: 'View', editor: editor, action: function () { viewChartofacct($('.selected').attr('acid')); },
                attr: {
                    title: 'View',
                    id: 'chartofacct_view'
                },
            },
            {
                extend: "edit", editor: editor, action: function () { editChartofacct($('.selected').attr('acid')); },
                attr: {
                    title: 'Edit',
                    id: 'chartofacct_Edit'
                },
            },
            {
                extend: "remove", editor: editor, action: function () { deleteCharttofacct($('.selected').attr('acid'), $('.selected').attr('accode')); },
                attr: {
                    title: 'remove',
                    id: 'chartofacct_delete'
                },
            },
            {

                add: "transaction", text: 'Transaction', editor: editor, action: () => window.open("#"),
                attr: {
                    title: 'Transaction',
                    id: 'chartofacct_tran',
                    value: ChartofacctObject._transactionmenuid[1]
                },
            },
            {
                add: "transactiondimension", text: 'Transaction by Dimension', editor: editor, action: () => window.open("#"),
                attr: {
                    title: 'Transaction',
                    id: 'chartofacct_trandimen',
                    value: ChartofacctObject._transactiondimensionmenuid[1]
                },
            },
        ],
        createdRow: function (row, data, dataIndex) {
            $(row).attr("id", `txt_accode_${data.AcId}`);
            $(row).attr("accode",`${data.AcCd}`);
            $(row).attr("acid", `${data.AcId}`);
        },
    });
    //end

    var table = $('#coa_accounts_table').DataTable();
    table.on('select', function () {
        var selectedRows = table.rows({
            selected: true
        }).count();
        if (selectedRows == 1) {
            if (!ChartofacctObject._deleteperm[0]) {
                $('#chartofacct_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                $('#chartofacct_delete').prop("disabled", true);
                $('#chartofacct_delete').attr('title', 'do not have delete permission!!!');
                table.button(3).action(function () {
                    this.active(false);
                    //this.disable();
                });
            }
        }

    });
    table.on('select', function () {
        var selectedRows = table.rows({
            selected: true
        }).count();
        if (selectedRows == 1) {
            if (!ChartofacctObject._editperm[0]) {
                $('#chartofacct_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                $('#chartofacct_Edit').prop("disabled", true);
                $('#chartofacct_Edit').attr('title', 'do not have Edit permission!!!');
                table.button(2).action(function () {
                    this.active(false);
                    //this.disable();
                });
            }
        }

    });

    if (!ChartofacctObject._createperm[0]) {
        $('#chartofacct_new').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#chartofacct_new').prop("disabled", true);
        $('#chartofacct_new').attr('title', 'do not have permission to Add Chart of Accounts!!!');
        table.button(0).action(function () {
            this.active(false);
        });
    }
    if (!ChartofacctObject._vieweperm[0]) {
        $('#chartofacct_view').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#chartofacct_view').prop("disabled", true);
        $('#chartofacct_view').attr('title', 'do not have permission to view Chart of Accounts!!!');
        table.button(1).action(function () {
            this.active(false);
        });
    }
    if (!ChartofacctObject._editperm[0]) {
        $('#chartofacct_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#chartofacct_Edit').prop("disabled", true);
        $('#chartofacct_Edit').attr('title', 'do not have permission to Edit Chart of Accounts!!!');
        table.button(2).action(function () {
            this.active(false);
            //this.disable();
        });
    }
    if (!ChartofacctObject._deleteperm[0]) {
        $('#chartofacct_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#chartofacct_delete').prop("disabled", true);
        $('#chartofacct_delete').attr('title', 'do not have permission to delete Chart of Accounts!!!');
        table.button(3).action(function () {
            this.active(false);
        });
    }
    if (!ChartofacctObject._transaction[0]) {
        $('#chartofacct_tran').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#chartofacct_tran').prop("disabled", true);
        $('#chartofacct_tran').attr('title', 'do not have permission to transation!!!');
        table.button(4).action(function () {
            this.active(false);
        });
    }
    if (!ChartofacctObject._transactiondimension[0]) {
        $('#chartofacct_trandimen').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        $('#chartofacct_trandimen').prop("disabled", true);
        $('#chartofacct_trandimen').attr('title', 'do not have permission to transation by dimension!!!');
        table.button(5).action(function () {
            this.active(false);
        });
    }

};

const insertEmptyRow = (
    acid,
    AcCd,
    AcDesc,
    AcTypeCd,
    grpCd,
    grpRangeFrom,
    grpRangeTo,
    balance
) => {
    const trid = "tr_" + acid;
    var _action = ``;

    let _disabled = "";
    if (acid != "0") _disabled = `disabled`;

    if (acid == "0") {
        _action = `<i class="fa fa-plus" aria-hidden="true" style="cursor: pointer;" onclick="saveChartofacct();" title="Submit"></i>`;
    } else {
        _action = `<i class="fa fa-pencil" aria-hidden="true" style="cursor: pointer;" onclick="editChartofacct('${acid}')" title="Edit"></i>&nbsp;&nbsp;<i class="fa fa-eye" aria-hidden="true" style="cursor: pointer;" onclick="viewChartofacct('${acid}')" title="View"></i>&nbsp;&nbsp;<i class="fa fa-trash-o" aria-hidden="true" style="cursor: pointer;" onclick="deleteCharttofacct('${acid}')" title="Delete"></i>`;
    }

    $("#coa_accounts_table").append(`<tr id=${trid} class="coa_standard_row">
        <td><input
        type="text" id="txt_accode_${acid}"
        name="ac_code_cell_input"
        placeholder="A/C Code"
        class="coa_code_input form-control coa_row_value_holder" ${_disabled} /></td>

        <td><input
		type="text" id="txt_desc_${acid}"
		name="desc_cell_input"
		placeholder="Description"
		class="coa_desc_input form-control coa_row_value_holder" ${_disabled} /></td>
		
        <td><select class="coa_table_select form-control coa_row_value_holder" id="dd_actype_${acid}" name="type_cell_input" ${_disabled}>
		<option></option></select></td>

        <td><select class="coa_table_select form-control coa_row_value_holder" id="dd_group_${acid}" name="group_cell_input" onchange="onchangegroup('${acid}');" ${_disabled}>
		<option></option></select></td>

        <td><select class="coa_table_select range_from_cell form-control coa_row_value_holder" id="dd_grouprangefrom_${acid}" name="range_from_cell_input" readonly ${_disabled}>
		<option></option></select></td>

        <td><input type="text" id="txt_grouprangeto_${acid}"
		class="coa_code_input form-control coa_row_value_holder" readonly ${_disabled} /> </td>

        <td><input type="number" class="form-control coa_row_value_holder"
        id="txt_balance_${acid}"
		name="balance_cell_input" style="text-align: right;"
		readonly ${_disabled} /></td>

        <td>${_action}</td></tr>`);



    var lookup_object = JSON.parse(localStorage.chartofacctobject_lookup);
    ChartofacctObject.lookup.fa_AcType = lookup_object.fa_AcType;
    ChartofacctObject.lookup.fa_Group = lookup_object.fa_Group;

    var _html = [];

    $.each(ChartofacctObject.lookup.fa_AcType, function (key, value) {
        _html.push(
            "<option value='" + value.AcTypeCd + "'>" + value.AcType + "</option>"
        );
    });
    $("#dd_actype_" + acid).html(_html.join(""));

    _html = [];
    $.each(ChartofacctObject.lookup.fa_Group, function (key, value) {
        _html.push(
            "<option value='" +
            value.grpCd +
            "' IsGrpRangeFromReq='" +
            value.IsGrpRangeFromReq +
            "' IsGrpRangeToReq='" +
            value.IsGrpRangeToReq +
            "' IsDispBal='" +
            value.IsDispBal +
            "'>" +
            value.grpDesc +
            "</option>"
        );
    });
    $("#dd_group_" + acid).html(_html.join(""));

    if ($.trim(AcCd) != "") {
        $("#txt_accode_" + acid).val(AcCd);
        $("#txt_accode_" + acid).attr("readonly", "true");
    }
    $("#txt_desc_" + acid).val(AcDesc);

    $("#dd_actype_" + acid).val(AcTypeCd);
    $("#dd_group_" + acid).val(grpCd);

    $("#txt_balance_" + acid).val(balance);

    onchangegroup(acid);
    creategrouprangefrom();

    if (
        acid != "" &&
        grpRangeFrom != "" &&
        grpRangeFrom != "null" &&
        grpRangeFrom != undefined
    )
        ChartofacctObject.lookup.GroupRangeFrom.push({
            acid: acid,
            grprangefrom: grpRangeFrom.replace(/\\n/g, ""),
        });

    if (!$("#txt_grouprangeto_" + acid).attr("readonly"))
        $("#txt_grouprangeto_" + acid).val(grpRangeTo);
};

var assignsavedgrouprangefrom = () => {
    $.map(ChartofacctObject.lookup.GroupRangeFrom, function (
        elementOfArray,
        indexInArray
    ) {
        if (elementOfArray.acid != "") {
            $("#dd_grouprangefrom_" + elementOfArray.acid).val(
                elementOfArray.grprangefrom
            );
        }
    });
};

var onchangegroup = (acid) => {
    //alert($('#' + objid).val());

    var _isgrprangefromreq = $("option:selected", $("#dd_group_" + acid)).attr(
        "isgrprangefromreq"
    );
    var _isdisplaybal = $("option:selected", $("#dd_group_" + acid)).attr(
        "isdispbal"
    );
    var _isgrprangetoreq = $("option:selected", $("#dd_group_" + acid)).attr(
        "isgrprangetoreq"
    );

    if (_isgrprangefromreq == "true") {
        $("#dd_grouprangefrom_" + acid).attr("readonly", false);
        //creategrouprangefrom();
        $("#dd_grouprangefrom_" + acid).html(localStorage.GroupRangeFrom);

        $("#dd_grouprangefrom_" + acid + " option")
            .filter(function () {
                return (
                    !this.value ||
                    $.trim(this.value).length == 0 ||
                    $.trim(this.text).length == 0
                );
            })
            .remove();
    } else {
        $("#dd_grouprangefrom_" + acid).attr("readonly", "true");
        $("#dd_grouprangefrom_" + acid).empty();
    }

    /*if (_isdisplaybal == "true") {
          $('#txt_balance_' + acid).removeAttr("readonly");
          $('#txt_balance_' + acid).attr("readonly", false);
      }
      else {
          $('#txt_balance_' + acid).attr('readonly', 'true');
      }*/

    $("#txt_grouprangeto_" + acid).attr("disabled", true);
    if (_isgrprangetoreq == "true") {
        //$('#txt_grouprangeto_' + acid).removeAttr("readonly");
        //$('#txt_grouprangeto_' + acid).attr("readonly", false);
        $("#txt_grouprangeto_" + acid).val($("#txt_accode_" + acid).val());
    } else {
        //$('#txt_grouprangeto_' + acid).attr('readonly', 'true');
        $("#txt_grouprangeto_" + acid).val("");
    }
};

var creategrouprangefrom = () => {
    var _htmlgrp = [];

    $("#coa_accounts_table tr").each(function () {
        var str_trid = this.id;
        if (str_trid != "") {
            var id = str_trid.replace("tr_", "");

            if ($("#dd_grouprangefrom_" + id).attr("readonly")) {
                let controlid = "txt_accode_" + id;
                let controldescr = "txt_desc_" + id;
                _htmlgrp.push(
                    "<option value='" +
                    $("#" + controlid).val() +
                    "'>" +
                    $("#" + controlid).val() +
                    "  (" +
                    $("#" + controldescr).val() +
                    ")</option>"
                );
            }
        }
    });

    localStorage.GroupRangeFrom = _htmlgrp.join("");

    $("#coa_accounts_table tr").each(function () {
        var str_trid = this.id;
        if (str_trid != "") {
            var id = str_trid.replace("tr_", "");

            if (!$("#dd_grouprangefrom_" + id).attr("readonly")) {
                $("#dd_grouprangefrom_" + id).html(_htmlgrp.join(""));
            }
        }
    });
};

var dosavechartofacct = function () {
    var validate = true;

    //var _createperm = MainObject.do_IsActionMenuPermission(
    //    "",
    //    ChartofacctObject.coadata.pageid,
    //    "create"
    //);
    //if (!_createperm) {
    //    //$.alertable.alert(`You have no permission to add data.`);
    //    $.alertable.alert(`You have no permission to add data.`);
    //    validate = false;
    //    return;
    //}

    var grouprangefrom = "";
    if (
        $("#dd_grouprangefrom_0").val() == "" ||
        $("#dd_grouprangefrom_0").val() == null
    )
        grouprangefrom = "";
    else grouprangefrom = $("#dd_grouprangefrom_0").val();

    if ($("#txt_accode_0").val() == "") {
        validate = false;
        //alert('A/C Code required.');
        $.alertable.alert(`A/C Code required.`);
        $("#txt_accode_0").focus();
        return false;
    }
    if ($("#dd_actype_0").val() == "" || $("#dd_actype_0").val() == null) {
        validate = false;
        //alert('Type required.');
        $.alertable.alert(`Type required.`);
        $("#dd_actype_0").focus();
        return false;
    }
    if ($("#dd_group_0").val() == "" || $("#dd_group_0").val() == null) {
        validate = false;
        //alert('Group required.');
        $.alertable.alert(`Group required.`);
        $("#dd_group_0").foucs();
        return false;
    }

    var _data =
        '{acid:"0", accode: "' +
        encodeURIComponent($("#txt_accode_0").val().trim()) +
        '"}';
    $.ajax({
        type: "POST",
        url: "chartofacct.aspx/docheckaccode",
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
                    `A/C Code Already Exists.\n Please Try Another A/C Code.`
                );
                $("#txt_accode_0").focus();
                $("#dd_group_0").val("");
                $("#dd_grouprangefrom_0").val("");
                $("#txt_grouprangeto_0").val("");
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
        _data["acid"] = "0";
        _data["accode"] = $("#txt_accode_0").val().trim();
        _data["desc"] = $("#txt_desc_0").val();
        _data["actype"] = $("#dd_actype_0").val();
        _data["group"] = $("#dd_group_0").val();
        _data["grouprangefrom"] = grouprangefrom;
        _data["grouprangeto"] = $("#txt_grouprangeto_0").val().trim();
        _data["cocd"] = $("#ddlCompany").val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(passdata));

        var _url = "chartofacct.aspx/doSavechartofacct";
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
                    /*var r = confirm(`Are you want to go setup page?`);
                              if (r == true) {
                                  editChartofacct(acid);
                              } else {
                                  ChartofacctObject.do_loadchatofacctlist();
                              }*/

                    $.alertable
                        .custconfirm(`Are you want to go setup page?`, ``, `Yes`, `No`)
                        .then(
                            function () {
                                editChartofacct(acid);
                            },
                            function () {
                                ChartofacctObject.do_loadchatofacctlist();
                            }
                        );
                } else {
                    //alert("Unable to save.");
                    $.alertable.alert(`Unable to save.`);
                    //ChartofacctObject.do_loadchatofacctlist();
                }

                /*if (result.d.toString().toLowerCase() == "true") {
                            //alert("Data Set saved successfully.");
                            //var txt;
                            var r = confirm("Are you want to go setup page?");
                            if (r == true) {
                                alert("You pressed OK!");
                            } else {
                                ChartofacctObject.do_loadchatofacctlist();
                            }
                        }
                        else {
                            //localStorage.chartofacctobject_lookup = undefined;
                            //ChartofacctObject.do_init();
                            ChartofacctObject.do_loadchatofacctlist();
                            // window.location = "Chartofacct.aspx";
                        }*/
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });
    }
};

var doCheckTransactionexits = function (accode) {
    var validate = false;

    var _data = '{accode: "' + encodeURIComponent(accode.trim()) + '"}';
    $.ajax({
        type: "POST",
        url: "chartofacct.aspx/docheckVchDtl_ByAcCd",
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
                //alert("Unable to delete the record.\n Data Exists against this A/C Code.");
                //return false;
            }
        },
        failure: function (response) {
            validate = false;
            //$.alertable.alert(`Problem in retreiving items...`);
            $.alertable.alert(`Problem in retreiving items...`);
        },
    });

    return validate;
};

var dodeletefacct = function (acid, accode) {
    var validate = doCheckTransactionexits(accode);

    if (validate) {
        $.alertable
            .custconfirm(`Are you sure want to delete?`, ``, `Yes`, `No`)
            .then(
                function () {
                    //console.log('Confirmation submitted');
                    var _data =
                        '{acid:"' +
                        encodeURIComponent(acid.trim()) +
                        '", accode: "' +
                        encodeURIComponent(accode.trim()) +
                        '"}';
                    $.ajax({
                        type: "POST",
                        url: "chartofacct.aspx/deletefa_AccMaster",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "true") {
                                //alert("Record deleted successfully.");
                                $.alertable.alert(`Record deleted successfully.`);
                                //ChartofacctObject.do_loadchatofacctlist();
                                window.location = "Chartofacct.aspx";
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
                    //console.log('Confirmation canceled');
                    //$.alertable.alert('Confirmation canceled');
                }
            );

        /*var r = confirm('Are you sure want to delete?');
            if (r == true) {
                var _data = '{acid:"' + encodeURIComponent(acid.trim()) + '", accode: "' + encodeURIComponent(accode.trim()) + '"}';
                $.ajax({
                    type: "POST",
                    url: "chartofacct.aspx/deletefa_AccMaster",
                    data: _data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (result) {
                        if (!dochkses(result.d)) return;
                        if (result.d.toLowerCase() == "true") {
                            alert("Record deleted successfully.");
                            ChartofacctObject.do_loadchatofacctlist();
                        }
    
                    },
                    failure: function (response) {
                        validate = false;
                        $.alertable.alert(`Problem in retreiving items...`);
                    }
                });
            }*/
    } else {
        //alert("Unable to delete the record.\n Data Exists against this A/C Code.");
        $.alertable.alert(
            `Unable to delete the record.\n Data Exists against this A/C Code.`
        );
    }
};

var saveChartofacct = function () {
    //var _createperm = MainObject.do_IsActionMenuPermission(
    //    "",
    //    ChartofacctObject.coadata.pageid,
    //    "create"
    //);
    //if (!_createperm) {
    //    $.alertable.alert(`You have no permission to add data.`);
    //    return;
    //} else

        dosavechartofacct();
};

var newChartofacct = function () {
//    var _createperm = MainObject.do_IsActionMenuPermission(
//        "",
//        ChartofacctObject.coadata.pageid,
//        "create"
//    );
//    if (!_createperm) {
//        $.alertable.alert(`You have no permission to add data.`);
//        return;
//    }
    window.location = "coasetup.aspx?id=0";
};

var viewChartofacct = function (acid) {
   if (acid == "" || acid == undefined || acid == "undefined") return;

//    var _createperm = MainObject.do_IsActionMenuPermission(
//        "",
//        ChartofacctObject.coadata.pageid,
//        "view"
//    );
//    if (!_createperm) {
//        $.alertable.alert(`You have no permission to view data.`);
//        return;
//    }

    var _id = acid;
    if (_id != "0") window.location = "coasetup.aspx?id=" + _id + "&mode=v";
};

var editChartofacct = function (acid) {
    if (acid == "" || acid == undefined || acid == "undefined") return;

//    var _createperm = MainObject.do_IsActionMenuPermission(
//        "",
//        ChartofacctObject.coadata.pageid,
//        "edit"
//    );
//    if (!_createperm) {
//        $.alertable.alert(`You have no permission to edit data.`);
//        return;
//    }

    var _id = acid;
    if (_id != "0") window.location = "coasetup.aspx?id=" + _id;
};

var deleteCharttofacct = function (acid, accode)
{
    if (!ChartofacctObject._deleteperm[0])
    { $.alertable.alert('You have no permission to delete the record.'); return; }
    //console.log(`Attempting delete of row at acid: ${acid}`);
 
    if (acid == "" || acid == undefined || acid == "undefined")
    {
        console.log(
            `Delete of row was attempted but account id is equal to: ${acid}`
        );
        return;
    }
        var _id = acid;

        if (_id != "0")
        {
            //alert(_id);
            //console.log(_id, $("#txt_accode_" + _id).val());
            // Error with delete is happening in this code block... element with id #txt_accode_ does not exist in DOM.
            dodeletefacct(_id, accode);
    }
    //}
    //var _createperm = MainObject.do_IsActionMenuPermission(
    //    "",
    //    ChartofacctObject.coadata.pageid,
    //    "delete"
   // );
   // if (!_createperm) {
    //    $.alertable.alert(`You have no permission to delete the record.`);
    //    return;
   // } 
};

// $(window).resize(function () {
// write logic here to deal with table size on window resize
// });
