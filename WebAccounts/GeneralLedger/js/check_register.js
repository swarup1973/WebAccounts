
$(document).ready(function () {

    // if (localStorage._lastmenuid == '' || localStorage._lastmenuid == undefined) {
    //    localStorage._lastmenuid = localStorage.menu_id_premission;
    //} else {
    //    localStorage.menu_id_premission = localStorage._lastmenuid;
    //}
    
    $("#myModal").modal({
        show: false,
        backdrop: 'static'
    });

    $("#click-me").click(function () {
        $("#myModal").modal("show");
    });
    var dataTable;
    var ipaddress = "";
    var bankData;

    if ((queryString('id') != undefined || queryString("id") != null) && (queryString('id') == "1" || queryString('id') == "2")) {
        if (localStorage.BankAccount_dimension_BankName != undefined && localStorage.BankAccount_dimension_AcNumber != "undefined") {
            BankAccount.acNumber = localStorage.BankAccount_dimension_AcNumber;
            BankAccount.bankCD = localStorage.BankAccount_dimension_BankCD;
            BankAccount.bankName = localStorage.BankAccount_dimension_BankName;
        }
    }
    else {
        localStorage.BankAccount_dimension_AcNumber = "";
        localStorage.BankAccount_dimension_BankCD = "";
        localStorage.BankAccount_dimension_BankName = "";

        BankAccount.bankName = '';
        BankAccount.acNumber = '';
        BankAccount.bankCD = '';
    }
    CheckRegisterObject.do_init();
    CheckRegisterObject.do_loadRegisteredCheque("", "");
    CheckRegisterObject.do_getUserPagepermission();
    $("#txtCode").blur(function () {
        if (this.value.length > 30) {
            $.alertable.alert(`Code lenght not greather than 30`);
            this.value = "";
        }
    });

    $("#txtBranchName").blur(function () {
        if (this.value.length > 150) {
            $.alertable.alert(`Branch Name lenght not greather than 150`);
            this.value = "";
        }
    });

    var _html = [];
    _html.push("<option value=''>  --Select--</option>")
    $("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);

    
});


var CheckRegisterObject = {

    rowId: '',
    bankCd: '',
    chequeLengthWoPrefix: '',
    _noOfLeaf: '',
    _receiptDt: '',
    _remarks: '',
    created_by: '',
    creation_date: '',
    creator_MAC_add: '',
    coCd: '',
    _createChequeperm: false,
    _reversepostingperm: false,
    _cancelperm: false,
    _chequreturnperm: false,
    _transactionperm: false,
    menuid: '',

    do_init: () => {
        CheckRegisterObject.do_loadBankAccount();
        /// CheckRegisterObject.do_loadStartingNo()
       
    },

    do_loadBankAccount: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() });
        $.ajax({
            type: "POST",
            url: "bank_master_overview.aspx/loadBankAccountlist",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var obj = JSON.parse(`[${result.d}]`);
                bankData = obj;
                if ((queryString('id') != undefined || queryString("id") != null) && queryString('id')=="1") {
                    $("#txtChequePrefix").val(obj[0].Table.filter(element => element.BankCd == BankAccount.bankCD)[0].ChequePrefix);
                    $("#txtChequeLengthWoPrefix").val(obj[0].Table.filter(element => element.BankCd == BankAccount.bankCD)[0].ChequeLengthWoPrefix);
                }
                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = key;
                        if (attrName.toLowerCase() == "table") {
                            var obj = JSON.parse(JSON.stringify(objnew[key]));

                            var _html = [];
                            _html.push("<option value=''>  --Select--</option>")
                            $.each(obj, function (key, value) {
                                _html.push(
                                    "<option value='" + value.BankCd.replace(/[\r\n]+/gm, '') + "'>" + value.BankName.replace(/[\r\n]+/gm, '') + "</option>"
                                );
                            });
                            $("#cbo_bankNamedr").html(_html.join(""));

                        }
                    }
                }

              
                if ((queryString('id') != undefined || queryString("id") != null) && queryString("id") == "1") {
                    $('#cbo_bankNamedr').val(BankAccount.bankCD);
                    $('#acNumber').text(BankAccount.acNumber);
                    $('#bankName').text(BankAccount.bankName);
                    $('#acNo').text(BankAccount.acNumber);
                    $("#cbo_bankNamedr").prop("disabled", true);
                }
                else if ((queryString('id') != undefined || queryString("id") != null) && queryString("id") == "2") {
                    $('#cbo_bankNamedr').val(BankAccount.bankCD);
                    $('#acNumber').text(BankAccount.acNumber);
                    $('#bankName').text(BankAccount.bankName);
                    $('#acNo').text(BankAccount.acNumber);
                    $("#cbo_bankNamedr").prop("disabled", false);
                }
                else {
                    $("#cbo_bankNamedr").prop("disabled", false);
                }
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_getUserPagepermission: () => {

        MainObject.do_getuserpageaccess(CheckRegisterObject);
        if (queryString('menuid') != undefined || queryString("menuid") != null) {
            CheckRegisterObject._createChequeperm = MainObject.do_IsActionMenuPermission(CheckRegisterObject.access, 'Cheque Register', 'create');
            CheckRegisterObject._reversepostingperm = MainObject.do_IsActionMenuPermission(CheckRegisterObject.access, 'Reverse Posting', 'create');
            CheckRegisterObject._cancelperm = MainObject.do_IsActionMenuPermission(CheckRegisterObject.access, 'Cancel', 'create');
            CheckRegisterObject._chequreturnperm = MainObject.do_IsActionMenuPermission(CheckRegisterObject.access, 'Cheque Return', 'create');
            CheckRegisterObject._transactionperm = MainObject.do_IsActionMenuPermission(CheckRegisterObject.access, 'Transaction', 'view');

        }
        else
        {
            CheckRegisterObject._createChequeperm = MainObject.do_IsActionMenuPermission(CheckRegisterObject.access, 'Cheque Master', 'create');
            CheckRegisterObject._reversepostingperm = MainObject.do_IsActionMenuPermission(CheckRegisterObject.access, 'Reverse Posting', 'create');
            CheckRegisterObject._cancelperm = MainObject.do_IsActionMenuPermission(CheckRegisterObject.access, 'Cancel', 'create');
            CheckRegisterObject._chequreturnperm = MainObject.do_IsActionMenuPermission(CheckRegisterObject.access, 'Cheque Return', 'create');
            CheckRegisterObject._transactionperm = MainObject.do_IsActionMenuPermission(CheckRegisterObject.access, 'Transaction', 'view');
        }
       

    },

    //do_loadStartingNo: () => {
    //    var _data;
    //    _data = '{"cocd":"ABC","bankCd":"' + BankAccount.bankCD + '"}';
    //    $.ajax({
    //        type: "POST",
    //        url: "check_register.aspx/loadStartingNo",
    //        data: _data,
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        async: true,
    //        success: function (result) {
    //            if (!dochkses(result.d)) return;
    //            var obj = JSON.parse(`[${result.d}]`);
    //            $('#startingNo').text(obj[0].Table[0].StartingNo);

    //        },
    //        failure: function (response) {
    //            alert(response.d);
    //            alert('Problem in retreiving items...');
    //        }
    //    });

    //},
    do_loadRegisteredCheque: (status, chequeNo) => {
        
        if (queryString('menuid') != undefined || queryString("menuid") != null)
        {
            CheckRegisterObject.menuid = queryString("menuid");
            localStorage.menu_id_premission = queryString("menuid");
        }
        
        var _data;
        _data = '{"cocd":"' + $("#ddlCompany").val() +'","bankCd":"' + BankAccount.bankCD + '","status":"' + status + '","chequeNo":"' + chequeNo + '"}';
        $.ajax({
            type: "POST",
            url: "check_register.aspx/loadCheckRegiterlist",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                currencyresult = obj;
                CheckRegisterObject.do_populateCheckRegister(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });
    },
    do_populateCheckRegister: (obj) => {
        var editor = new $.fn.dataTable.Editor({
            table: "#cheque_register_table",
            fields: [
                { label: "Select:", name: "Select", type: "checkbox" },
                { label: "ChequeNo", name: "ChequeNo" },
                { label: "DtOfIssue", name: "DtOfIssue" },
                { label: "DocNo", name: "DocNo" },
                { label: "DocType", name: "DocType" },
                { label: "IssueToName", name: "IssueToName" },
                { label: "Status", name: "Status" },
                { label: "PrintCount", name: "PrintCount" },
                { label: "ReturnReason", name: "ReturnReason" },
                { label: "IsReversed", name: "IsReversed" },
                { label: "IsReconciled", name: "IsReconciled" }
            ],
        });

        var roletable = $("#cheque_register_table");

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
        $("#cheque_register_table").dataTable().fnDestroy();

        dataTable = roletable.dataTable({
            dom: "Bfrtip",
            fixedHeader: true,
            data: roledata,
            columns: [
                {
                    data: "Select",
                    render: function (data, type, row) {
                        if (type === 'display') {
                            return '<input type="checkbox" value="' + row.RowId + '" id="checkboxes" class="editor-active">';
                        }
                        return data;
                    },
                    className: "dt-body-center"
                },
                { data: "ChequeNo" },
                { data: "DtOfIssue" },
                { data: "DocNo" },
                { data: "DocType" },
                { data: "IssueToName" },
                { data: "Status" },
                { data: "PrintCount" },
                { data: "ReturnReason" },
                { data: "IsReversed" },
                { data: "IsReconciled" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [
                {
                    add: "create", text: 'Create Cheque', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'Create_Cheque'
                    },
                },
                {
                    add: "edit", text: 'Reverse Posting', editor: editor, action: () => showmodaledit(),
                    attr: {
                        title: 'New',
                        id: 'Reverse_Posting'
                    },

                },
                {
                    add: "cancel", text: 'Cancel', editor: editor, action: function () { cancelCheque($('.selected').attr('RowId')); },
                    attr: {
                        title: 'New',
                        id: 'Chequerereg_Cancel'
                    },
                },
                {
                    add: "return", text: 'Cheque Return', editor: editor,
                    attr: {
                        title: 'New',
                        id: 'Cheque_Return'
                    },
                },
                {
                    add: "transaction", text: 'Transaction', editor: editor, action: () => window.open("transaction.aspx"),
                    attr: {
                        title: 'New',
                        id: 'Chequereg_Transaction'
                    },
                }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
            },
        });
        var table = $('#cheque_register_table').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!CheckRegisterObject._cancelperm[0]) {
                    $('#Chequerereg_Cancel').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#Chequerereg_Cancel').prop("disabled", true);
                    $('#Chequerereg_Cancel').attr('title', 'do not have cancle permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }
        });

        if (!CheckRegisterObject._createChequeperm[0]) {
            $('#Create_Cheque').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Create_Cheque').prop("disabled", true);
            $('#Create_Cheque').attr('title', 'do not have permission to Create Cheque!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!CheckRegisterObject._reversepostingperm[0]) {
            $('#Reverse_Posting').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Reverse_Posting').prop("disabled", true);
            $('#Reverse_Posting').attr('title', 'do not have permission to Reverse Posting!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!CheckRegisterObject._cancelperm[0]) {
            $('#Chequerereg_Cancel').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Chequerereg_Cancel').prop("disabled", true);
            $('#Chequerereg_Cancel').attr('title', 'do not have permission to Cheque Cancel!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        if (!CheckRegisterObject._chequreturnperm[0]) {
            $('#Cheque_Return').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Cheque_Return').prop("disabled", true);
            $('#Cheque_Return').attr('title', 'do not have permission to Cheque Return!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }

        if (!CheckRegisterObject._transactionperm[0]) {
            $('#Chequereg_Transaction').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Chequereg_Transaction').prop("disabled", true);
            $('#Chequereg_Transaction').attr('title', 'do not have permission to Cheque Transaction!!!');
            table.button(4).action(function () {
                this.active(false);
            });
        }

    },
};



var showmodal = function () {

    CheckRegisterObject.hdnroleid = '';
};

var getempname = function (sel) {
    $('#txt_ename').val($("option:selected", sel).attr("ename"));
};


var saveCheckRegister = function () {
    var validate = true;
    if ($('#txtReceiptDate').val() == '') {
        validate = false;
        $.alertable.alert(`Rreceipt Date required.`);
        return false;
    }
    else if ($('#txtNoOfLeaf').val() == '') {
        validate = false;
        $.alertable.alert(`No of leaf required.`);
        $("#txtNoOfLeaf").focus();
        return false;
    }
    else if ($('#txtChequeLengthWoPrefix').val() == '') {
        validate = false;
        $.alertable.alert(`Cheque Length Without Prefix.`);
        $("#txtChequeLengthWoPrefix").focus();
        return false;
    }
    if (validate == true) {
        var _data = {};
        //if (CheckRegisterObject.hdnroleid == null)
        //    _data["rowid"] = 0;
        //else
        _data["rowid"] = "";// CheckRegisterObject.hdnroleid;

        _data["bankCd"] = BankAccount.bankCD;
        _data["chequeLengthWoPrefix"] = $('#txtNoOfCharacter').val();
        _data["coCd"] = $("#ddlCompany").val();
        if (ipaddress == '') {
            _data["creator_mac_add"] = "192.100.0.1";
        } else {
            _data["creator_mac_add"] = ipaddress;
        }
        _data["noOfLeaf"] = $('#txtNoOfLeaf').val();
        _data["receiptDt"] = $('#txtReceiptDate').val();
        _data["remarks"] = $('#txtRemark').val();
        _data["chequePrefix"] = $('#txtChequePrefix').val();
        _data["chequeLengthWoPrefix"] = $('#txtChequeLengthWoPrefix').val();
        _data["startingNo"] = $('#txtStartingNo').val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        var _url = "check_register.aspx/doSaveCheckRegister";
        //  url: "bank_master_overview.aspx/doeditcurr",
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

                    $.alertable.custconfirm(`Data saved successfully.`, ``, `Ok`, ``).then(function () {
                        if ((queryString('id') != undefined || queryString("id") != null) && queryString('id')=="1") {
                            window.location = "check_register.aspx?id=1";
                        }
                        else {
                            window.location = "check_register.aspx?id=2";
                        }
                    });
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $.alertable.alert(`Data not save,try again`);
            },
        });
    }
};

var searchChequeRegisterList = function () {

    var status = $('#drSerachSatus').val();
    var chequeNo = $('#txtSearchChequeNo').val();
    CheckRegisterObject.do_loadRegisteredCheque(status, chequeNo);
}

function ShowIP(response) {
    ipaddress = response.ip;
}

var cancelCheque = function (s) {
    var selected = [];
    $($('input[type=checkbox]:checked', dataTable.fnGetNodes())).each(function (i, d) {
        selected.push(d.value);
    });

    var _data;
    _data = '{"values":"' + selected.join() + '"}';

    $.ajax({
        type: "POST",
        url: "check_register.aspx/doCancelCheque",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (result) {
            $.alertable.alert(`Selected Open cheque cancelled successfully`);
            CheckRegisterObject.do_loadRegisteredCheque("", "");
        },
        failure: function (response) {
            alert(response.d);
            alert('Problem in retreiving items...');
        }
    });
}

var onBankChange = function (data) {
    BankAccount.bankCD = $("#cbo_bankNamedr").val();
    
    $("#txtChequePrefix").val(bankData[0].Table.filter(element => element.BankCd == BankAccount.bankCD)[0].ChequePrefix);
    $("#txtChequeLengthWoPrefix").val(bankData[0].Table.filter(element => element.BankCd == BankAccount.bankCD)[0].ChequeLengthWoPrefix);
    $('#acNumber').text(bankData[0].Table.filter(element => element.BankCd == BankAccount.bankCD)[0].AcNumber);
    $('#bankName').text(bankData[0].Table.filter(element => element.BankCd == BankAccount.bankCD)[0].BankName);
    $('#acNo').text(bankData[0].Table.filter(element => element.BankCd == BankAccount.bankCD)[0].AcNumber);

    localStorage.BankAccount_dimension_BankCD = BankAccount.bankCD;
    localStorage.BankAccount_dimension_AcNumber = bankData[0].Table.filter(element => element.BankCd == BankAccount.bankCD)[0].AcNumber;
    localStorage.BankAccount_dimension_BankName = bankData[0].Table.filter(element => element.BankCd == BankAccount.bankCD)[0].BankName;
    CheckRegisterObject.do_loadRegisteredCheque("", "");
}
