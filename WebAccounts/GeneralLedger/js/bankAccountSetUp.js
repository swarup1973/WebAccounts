var ipaddress = "";
$(document).ready(function () {
    if (localStorage.bankacsetupmenuid == '' || localStorage.bankacsetupmenuid == undefined) {
        localStorage.bankacsetupmenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage.bankacsetupmenuid;
    }
    
    $("#myModal").modal({
        show: false,
        backdrop: 'static'
    });

    $("#click-me").click(function () {
        $("#myModal").modal("show");
    });

    localStorage.menu_id_premission;
    BankAccountObject.do_loadBankAccount();
    BankAccountObject.do_getUserPagepermission();
    BankAccountObject.do_loadlookupdataPostingGroup();
    BankAccountObject.do_loadlookupdataCurrency();
    BankAccountObject.do_loadlookupdataPersonResponsible();
    BankAccountObject.do_loadlookupdataCountry();

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

    $("#txtName").blur(function () {
        if (this.value.length > 200) {
            $.alertable.alert(`Name lenght not greather than 200`);
            this.value = "";
        }
        else {
            $("#txtSearchName").val($("#txtName").val());
        }
    });
    $("#txtBranchCode").blur(function () {
        if (this.value.length > 60) {
            $.alertable.alert(`Branch Code lenght not greather than 60`);
            this.value = "";
        }
    });
    $("#txtSearchName").blur(function () {
        if (this.value.length > 200) {
            $.alertable.alert(`Search Name lenght not greather than 200`);
            this.value = "";
        }
    });

    $("#txtIFSC").blur(function () {
        if (this.value.length > 30) {
            $.alertable.alert(`IFSC lenght not greather than 30`);
            this.value = "";
        }
    });
    $("#txtChequePrefix").blur(function () {
        if (this.value.length > 10) {
            $.alertable.alert(`Cheque Prefix lenght not greather than 10`);
            this.value = "";
        }
    });

    $("#txtACNo").blur(function () {
        if (this.value.length > 30) {
            $.alertable.alert(`AC No lenght not greather than 30`);
            this.value = "";
        }
    });

    $("#txtIBAN").blur(function () {
        if (this.value.length > 60) {
            $.alertable.alert(`IBAN lenght not greather than 60`);
            this.value = "";
        }
    });

    $("#txtGIROCode").blur(function () {
        if (this.value.length > 60) {
            $.alertable.alert(`GIRO Code lenght not greather than 60`);
            this.value = "";
        }
    });

    $("#txtSWIFTCode").blur(function () {
        if (this.value.length > 60) {
            $.alertable.alert(`SWIFT Code lenght not greather than 60`);
            this.value = "";
        }
    });

    $("#txtAddress1").blur(function () {
        if (this.value.length > 300) {
            $.alertable.alert(`Address 1 lenght not greather than 300`);
            this.value = "";
        }
    });

    $("#txtAddress2").blur(function () {
        if (this.value.length > 300) {
            $.alertable.alert(`Address 2 lenght not greather than 300`);
            this.value = "";
        }
    });

    $("#txtPhoneNo").blur(function () {
        if (this.value.length > 16) {
            $.alertable.alert(`Phone No lenght not greather than 16`);
            this.value = "";
        }
    });

    $("#txtAlternateNo").blur(function () {
        if (this.value.length > 16) {
            $.alertable.alert(`Alternate No lenght not greather than 16`);
            this.value = "";
        }
    });

    $("#txtPin").blur(function () {
        if (this.value.length > 20) {
            $.alertable.alert(`Pin lenght not greather than 20`);
            this.value = "";
        }
    });

    $("#txtFaxNo").blur(function () {
        if (this.value.length > 16) {
            $.alertable.alert(`Fax No lenght not greather than 16`);
            this.value = "";
        }
    });

    $("#txtCity").blur(function () {
        if (this.value.length > 100) {
            $.alertable.alert(`City lenght not greather than 100`);
            this.value = "";
        }
    });

    $("#txtContactPerson").blur(function () {
        if (this.value.length > 200) {
            $.alertable.alert(`Contact Person lenght not greather than 200`);
            this.value = "";
        }
    });

    $("#txtEmail").blur(function () {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (this.value.length > 250) {
            $.alertable.alert(`Email lenght not greather than 250`);
            this.value = "";
        }
        else if (!emailReg.test($("#txtEmail").val())) {
            $.alertable.alert(`Enter valid email id`);
            this.value = "";
        } 
    });

    $("#txtWebsite").blur(function () {
        var urlregex = new RegExp("^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
        if (this.value.length > 250) {
            $.alertable.alert(`Website lenght not greather than 250`);
            this.value = "";
        }
        else if (!urlregex.test($("#txtWebsite").val())) {
            $.alertable.alert(`Enter valid Website url`);
            this.value = "";
        }
       
        return ;
    });

    var _html = [];
    _html.push("<option value=''>  --Select--</option>")
    $("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var BankAccountObject = {

    rowId: '',
    bankCd: '',
    bankName: '',
    bankSrcName: '',
    acNumber: '',
    minBal: '',
    postingGrpCd: '',
    currCd: '',
    branchCd: '',
    branchName: '',
    iFSC: '',
    iBAN: '',
    giroCd: '',
    swiftCd: '',
    personRespId: '',
    block: '',
    address1: '',
    address2: '',
    pin: '',
    city: '',
    countryCd: '',
    stateCd: '',
    phoneNo: '',
    alternateNo: '',
    faxNo: '',
    contactPerson: '',
    email: '',
    website: '',
    created_by: '',
    creation_date: '',
    creator_MAC_add: '',
    edit_by: '',
    edit_date: '',
    editor_MAC_add: '',
    coCd: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _transaction: false,
    _chequeregister: false,
    _dimension: false,
    _transactionmenuid: '',
    _chequeregistermenuid: '',
    _dimensionmenuid: '',
    bankacsetupmenuid: '',


    do_loadlookupdataPostingGroup: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
        $.ajax({
            type: "POST",
            async: false,
            url: "../handler/datahandler.aspx/loadlookupdataPostingGroup",
            data: _data,
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
                            var obj = JSON.parse(JSON.stringify(objnew[key]));
                            var _html = [];
                            _html.push("<option value=''>  --Select--</option>")
                            $.each(obj, function (key, value) {
                                _html.push(
                                    "<option value='" + value.GrpCd.replace(/[\r\n]+/gm, '') + "'>" + value.GrpName.replace(/[\r\n]+/gm, '') + "</option>"
                                );
                            });
                            $("#cbo_postinggroupdr").html(_html.join(""));

                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_loadlookupdataCurrency: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
        $.ajax({
            type: "POST",
            async: false,
            url: "../handler/datahandler.aspx/loadlookupdataCurrency",
            data: _data,
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
                            var obj = JSON.parse(JSON.stringify(objnew[key]));
                            var _html = [];
                            _html.push("<option value=''>  --Select--</option>")
                            $.each(obj, function (key, value) {
                                _html.push(
                                    "<option value='" + value.CurrCd.replace(/[\r\n]+/gm, '') + "'>" + value.CurrDesc.replace(/[\r\n]+/gm, '') + "</option>"
                                );
                            });
                            $("#cbo_currencydr").html(_html.join(""));

                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_loadlookupdataPersonResponsible: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
        $.ajax({
            type: "POST",
            async: false,
            url: "../handler/datahandler.aspx/loadlookupdataPersonResponsible",
            data: _data,
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
                            var obj = JSON.parse(JSON.stringify(objnew[key]));
                            var _html = [];
                            _html.push("<option value=''>  --Select--</option>")
                            $.each(obj, function (key, value) {
                                _html.push(
                                    "<option value='" + value.PersonResponsibleId + "'>" + value.EName.replace(/[\r\n]+/gm, '') + "</option>"
                                );
                            });
                            $("#cbo_personResponsibledr").html(_html.join(""));

                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_loadlookupdataCountry: () => {

        $.ajax({
            type: "POST",
            async: false,
            url: "../handler/datahandler.aspx/loadlookupdataCountry",
            data: "",
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
                            var obj = JSON.parse(JSON.stringify(objnew[key]));
                            var _html = [];
                            _html.push("<option value=''>  --Select--</option>")
                            $.each(obj, function (key, value) {
                                _html.push(
                                    "<option value='" + value.CountryCd.replace(/[\r\n]+/gm, '') + "'>" + value.CountryName.replace(/[\r\n]+/gm, '') + "</option>"
                                );
                            });
                            $("#cbo_countrydr").html(_html.join(""));

                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_loadBankAccount: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
        $.ajax({
            type: "POST",
            url: "bank_master_overview.aspx/loadBankAccountlist",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                currencyresult = obj;
                BankAccountObject.do_populateBankAccount(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(BankAccountObject);
        BankAccountObject._vieweperm = MainObject.do_IsActionMenuPermission(BankAccountObject.access, 'Bank Accounts', 'view');
        BankAccountObject._createperm = MainObject.do_IsActionMenuPermission(BankAccountObject.access, 'Bank Accounts', 'create');
        BankAccountObject._editperm = MainObject.do_IsActionMenuPermission(BankAccountObject.access, 'Bank Accounts', 'edit');
        BankAccountObject._deleteperm = MainObject.do_IsActionMenuPermission(BankAccountObject.access, 'Bank Accounts', 'delete');
        BankAccountObject._transaction = MainObject.do_IsActionMenuPermission(BankAccountObject.access, 'Transaction', 'view');
        BankAccountObject._chequeregister = MainObject.do_IsActionMenuPermission(BankAccountObject.access, 'Check Master', 'view');
        BankAccountObject._dimension = MainObject.do_IsActionMenuPermission(BankAccountObject.access, 'Dimension', 'view');

        BankAccountObject._transactionmenuid = MainObject.do_IsActionMenuPermission(BankAccountObject.access, 'TRANSACTION', 'menuid');
        BankAccountObject._chequeregistermenuid = MainObject.do_IsActionMenuPermission(BankAccountObject.access, 'CHEQUE REGISTER', 'menuid');
        BankAccountObject._dimensionmenuid = MainObject.do_IsActionMenuPermission(BankAccountObject.access, 'DIMENSION', 'menuid');
 },

    do_populateBankAccount: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#budget_table",
            fields: [
                { label: "BankCd", name: "BankCd" },
                { label: "BankName", name: "BankName" },
                { label: "BankSrcName", name: "BankSrcName" },
                { label: "AcNumber", name: "AcNumber" },
                { label: "Balance", name: "Balance" },
                { label: "BalanceLCY", name: "BalanceLCY" }
            ],
        });

        var roletable = $("#budget_table");

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
                { data: "BankCd" },
                { data: "BankName" },
                { data: "BankSrcName" },
                { data: "AcNumber" },
                { data: "Balance" },
                { data: "BalanceLCY" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'bankac_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'edit', '', '', ''); },
                    attr: {
                        title: 'Edit',
                        id: 'bankac_Edit'
                    },
                },
                {
                    extend: "remove", editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'delete', '', '', ''); },
                    attr: {
                        title: 'Delete',
                        id: 'bankac_delete'
                    },
                },
                {
                    add: "view", text: 'View', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'view', '', '', ''); },
                    attr: {
                        title: 'View',
                        id: 'bankac_View'
                    },
                
                },
                {
                    add: "transaction", text: 'Transaction', editor: editor, action: () => window.open(""),
                    attr: {
                        title: 'Transaction',
                        id: 'bankac_Transaction',
                        value: BankAccountObject._transactionmenuid[1]
                    },
                },
                {
                    add: "check", text: 'Cheque Register', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'chequeRegister', $('.selected').attr('BankName'), $('.selected').attr('AcNumber'), $('.selected').attr('BankCd')) },
                    attr: {
                        title: 'Cheque Register',
                        id: 'bankac_ChequeRegister',
                        value: BankAccountObject._chequeregistermenuid[1]

                    },
                },
                {
                    add: "dimension", text: 'Dimension', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'dimension', $('.selected').attr('BankName'), $('.selected').attr('AcNumber'), $('.selected').attr('BankCd')) },
                    attr: {
                        title: 'Dimension',
                        id: 'bankac_Dimension',
                        value: BankAccountObject._dimensionmenuid[1]
                    },
                    //, action: () => window.open("dimension_setup.aspx")
                }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("BankName", `${data.BankName}`);
                $(row).attr("AcNumber", `${data.AcNumber}`);
                $(row).attr("BankCd", `${data.BankCd}`);
            },
        });

        var table = $('#budget_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!BankAccountObject._deleteperm[0]) {
                    $('#bankac_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#bankac_delete').prop("disabled", true);
                    $('#bankac_delete').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }
        });


        if (!BankAccountObject._createperm[0])
        {
            $('#bankac_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#bankac_create').prop("disabled", true);
            $('#bankac_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!BankAccountObject._editperm[0])
        {
            $('#bankac_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#bankac_Edit').prop("disabled", true);
            $('#bankac_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }

        if (!BankAccountObject._deleteperm[0])
        {
            $('#bankac_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#bankac_delete').prop("disabled", true);
            $('#bankac_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
        if (!BankAccountObject._vieweperm[0]) {
            $('#bankac_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#bankac_View').prop("disabled", true);
            $('#bankac_View').attr('title', 'do not have permission to view bank AC !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
        if (!BankAccountObject._transaction[0]) {
            $('#bankac_Transaction').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#bankac_Transaction').prop("disabled", true);
            $('#bankac_Transaction').attr('title', 'do not have permission to view Transaction!!!');
            table.button(4).action(function () {
                this.active(false);
            });
        }
        if (!BankAccountObject._chequeregister[0]) {
            $('#bankac_ChequeRegister').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#bankac_ChequeRegister').prop("disabled", true);
            $('#bankac_ChequeRegister').attr('title', 'do not have permission to view ChequeRegister !!!');
            table.button(5).action(function () {
                this.active(false);
            });
        }
        if (!BankAccountObject._dimension[0]) {
            $('#bankac_Dimension').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#bankac_Dimension').prop("disabled", true);
            $('#bankac_Dimension').attr('title', 'do not have permission to View Dimensiond!!!');
            table.button(6).action(function () {
                this.active(false);
            });
        }

    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["rowid"] = BankAccountObject.hdnroleid;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "bank_master_overview.aspx/doeditcurr",
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
                                BankAccountObject.hdnroleid = objnew[key][0].RowId;
                                do_loadlookupdataCounty(objnew[key][0].CountryCd);
                                $('#txtCode').val(objnew[key][0].BankCd);
                                $('#txtACNo').val(objnew[key][0].AcNumber);
                                $('#txtAddress1').val(objnew[key][0].Address1);
                                $('#txtAddress2').val(objnew[key][0].Address2);
                                $('#txtAlternateNo').val(objnew[key][0].AlternateNo);
                                $('#txtName').val(objnew[key][0].BankName);
                                $('#txtSearchName').val(objnew[key][0].BankSrcName);
                                if (objnew[key][0].Block)
                                    $("#cbBlock").prop("checked", true);
                                else
                                    $("#cbBlock").prop("checked", false);

                                $('#txtBranchCode').val(objnew[key][0].BranchCd);
                                $('#txtBranchName').val(objnew[key][0].BranchName);
                                $('#txtCity').val(objnew[key][0].City);
                                $('#txtContactPerson').val(objnew[key][0].ContactPerson);
                                $('#cbo_countrydr').val(objnew[key][0].CountryCd);
                                $('#cbo_currencydr').val(objnew[key][0].CurrCd);
                                $('#txtEmail').val(objnew[key][0].Email);
                                $('#txtFaxNo').val(objnew[key][0].FaxNo);
                                $('#txtGIROCode').val(objnew[key][0].GiroCd);
                                $('#txtIBAN').val(objnew[key][0].IBAN);
                                $('#txtIFSC').val(objnew[key][0].IFSC);
                                $('#txtChequePrefix').val(objnew[key][0].ChequePrefix);
                                $('#txtChequeLengthWoPrefix').val(objnew[key][0].ChequeLengthWoPrefix);
                                $("#txtMinBalance").val(objnew[key][0].MinBal);
                                $('#cbo_personResponsibledr').val(objnew[key][0].PersonRespId);
                                $('#txtPhoneNo').val(objnew[key][0].PhoneNo);
                                $('#txtPin').val(objnew[key][0].Pin);
                                $('#cbo_postinggroupdr').val(objnew[key][0].PostingGrpCd);
                                $('#cbo_countydr').val(objnew[key][0].StateCd);
                                $('#txtSWIFTCode').val(objnew[key][0].SwiftCd);
                                $('#txtWebsite').val(objnew[key][0].Website);
                                $('#txtCode').prop('readonly', true);


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

function do_loadlookupdataCounty(countryCd) {
    var _data;
    _data = '{countryCd:"' + countryCd + '"}';
    $.ajax({
        type: "POST",
        async: false,
        url: "../handler/datahandler.aspx/loadlookupdataCounty",
        data: _data,
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
                        var obj = JSON.parse(JSON.stringify(objnew[key]));
                        var _html = [];
                        _html.push("<option value=''>  --Select--</option>")
                        $.each(obj, function (key, value) {
                            _html.push(
                                "<option value='" + value.StateCd.replace(/[\r\n]+/gm, '') + "'>" + value.StateName.replace(/[\r\n]+/gm, '') + "</option>"
                            );
                        });
                        $("#cbo_countydr").html(_html.join(""));

                    }
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " - Error occurred");
        },
    });
};

var showmodal = function () {
    $('.modal-title').html('Add New Bank Account');
   
    BankAccountObject.hdnroleid = '';
    $('#txtCode').prop('readonly', false);
    $('#txtCode').val('');
    $('#txtACNo').val('');
    $('#txtAddress1').val('');
    $('#txtAddress2').val('');
    $('#txtAlternateNo').val('');
    $('#txtName').val('');
    $('#txtSearchName').val('');
    $("#cbBlock").prop("checked", false);
    $('#txtBranchCode').val('');
    $('#txtBranchName').val('');
    $('#txtCity').val('');
    $('#txtContactPerson').val('');
    $('#cbo_countrydr').val('');
    $('#cbo_currencydr').val('');
    $('#txtEmail').val('');
    $('#txtFaxNo').val('');
    $('#txtGIROCode').val('');
    $('#txtIBAN').val('');
    $('#txtIFSC').val('');
    $('#txtChequePrefix').val('');
    $('#txtChequeLengthWoPrefix').val('');
    $("#txtMinBalance").val('');
    $('#cbo_personResponsibledr').val('');
    $('#txtPhoneNo').val('');
    $('#txtPin').val('');
    $('#cbo_postinggroupdr').val('');
    $('#cbo_countydr').val('');
    $('#txtSWIFTCode').val('');
    $('#txtWebsite').val('');
    $("#myModal").modal('show');
    $('#div_block').hide();

    $('#cbBlock').hide();
    $('#btnDelete').hide();
    $('#lbBlock').hide();
    $('#btnEdit').hide();
    $('#btnSave').show();
    $('.readOnly').attr("disabled", false);

};

var getempname = function (sel) {
    $('#txt_ename').val($("option:selected", sel).attr("ename"));
};

var roleaction = function (rowId, mode, bankName, acNumber,bankCD) {

    if (rowId == "" || rowId == undefined || rowId == "undefined") return;

    if (mode == 'edit') {
        showmodal();
        $('.modal-title').html('Bank Account - Edit');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        //deepak
        if (!BankAccountObject._deleteperm[0]) {
            $('#btnDelete').show();
            $('#btnDelete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#btnDelete').prop("disabled", true);
            $('#btnDelete').attr('title', 'do not have permission to delete Record!!!');
        } else { $('#btnDelete').show(); }
        
        $('#lbBlock').show();
        $('#btnEdit').hide();

        $('#btnSave').show();
        $('.readOnly').attr("disabled", false);

        BankAccountObject.hdnroleid = rowId;
        BankAccountObject.do_loaddataedit(rowId);
    }
    else if(mode == 'view') {
        showmodal();
        $('.modal-title').html('Bank Account - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!BankAccountObject._deleteperm[0]) {
            $('#btnDelete').show();
            $('#btnDelete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#btnDelete').prop("disabled", true);
            $('#btnDelete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#btnDelete').show(); }
        if (!BankAccountObject._editperm[0]) {
            $('#btnEdit').show();
            $('#btnEdit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#btnEdit').prop("disabled", true);
            $('#btnEdit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#btnEdit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        BankAccountObject.hdnroleid = rowId;
        BankAccountObject.do_loaddataedit(rowId);
    }
    else if (mode == 'dimension') {
        //localStorage.BankAccount_dimension_RowId = rowId;
        localStorage.BankAccount_dimension_BankName = bankName;
        localStorage.BankAccount_dimension_AcNumber = acNumber
        //window.location = "dimension_setup.aspx?id=" + rowId;
        window.location = "dimension_setup.aspx?id=" + rowId + "&menuid=" +BankAccountObject._dimensionmenuid[1];
    }
    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Bank Account ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    $.ajax({
                        type: "POST",
                        url: "bank_master_overview.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                window.location = "bank_master_overview.aspx";
                            }
                            else if (result.d.toLowerCase() == "true") {
                                $.alertable.alert(
                                    `Unable to delete.`
                                );
                            }
                        },
                        failure: function (response) {
                            validate = false;
                            $.alertable.alert(`Problem in retreiving items...`);
                        },
                    });

                },
            );
    }
    else if (mode == 'chequeRegister') {
        localStorage.BankAccount_dimension_BankName = bankName;
        localStorage.BankAccount_dimension_BankCD = bankCD
        localStorage.BankAccount_dimension_AcNumber = acNumber

        window.location = "check_register.aspx?id=1" +"&menuid=" +BankAccountObject._chequeregistermenuid[1];
    }
};

var showmodalPosting = function () {
    $('.modal-title').html('Currency - New');
    BankAccountObject.hdnroleid = '';
    $('#txt_currcd').val('');
    $('#txt_currdesc').val('');
    $("#myModal").modal('show');
};

var saveBankAccount = function () {
    var validate = true;
    if ($('#txtCode').val() == '') {
        validate = false;
        $.alertable.alert(`Bank Code required.`);
        $("#txtCode").focus();
        return false;
    }
    else if ($("#txtName").val() == '') {
        validate = false;
        $.alertable.alert(`Bank Name required.`);
        $("#txtName").focus();
        return false;
    }
    else if ($('#txtACNo').val() == '') {$("#txtName")
        validate = false;
        $.alertable.alert(`Account No required.`);
        $("#txtACNo").focus();
        return false;
    }
    else if ($('#cbo_postinggroupdr').val() == '') {
        validate = false;
        $.alertable.alert(`Posting Group required.`);
        $("#cbo_postinggroupdr").focus();
        return false;
    }
    else if ($('#cbo_currencydr').val() == '') {
        validate = false;
        $.alertable.alert(`Currency required.`);
        $("#cbo_currencydr").focus();
        return false;
    }
    else if ($('#txtPin').val() == '') {
        validate = false;
        $.alertable.alert(`Pin required.`);
        $("#txtPin").focus();
        return false;
    }
    else if ($('#txtCity').val() == '') {
        validate = false;
        $.alertable.alert(`City required.`);
        $("#txtCity").focus();
        return false;
    }
    else if ($('#cbo_countrydr').val() == '') {
        validate = false;
        $.alertable.alert(`Country required.`);
        $("#cbo_countrydr").focus();
        return false;
    }
    else if ($('#cbo_countydr').val() == '') {
        validate = false;
        $.alertable.alert(`County required.`);
        $("#cbo_countydr").focus();
        return false;
    }
    else if ($('#txtChequeLengthWoPrefix').val() == '') {
        validate = false;
        $.alertable.alert(`Cheque Length Without Prefix.`);
        $("#txtChequeLengthWoPrefix").focus();
        return false;
    }
    else {
        var _dataCheck = '{rowid:"' + BankAccountObject.hdnroleid + '", bankCd: "' + $("#txtCode").val().trim() + '"}';

        $.ajax({
            type: "POST",
            url: "bank_master_overview.aspx/doCheckBankCode",
            data: _dataCheck,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d.toLowerCase() == "false") {
                    validate = true;
                } else if (result.d.toLowerCase() == "true") {
                    validate = false;
                    $.alertable.alert(`Bank Code Already Exists.\n Please Try Another Bank Code.`);
                    validate = false;
                    return false;
                }
            },
            failure: function (response) {
                validate = false;
                $.alertable.alert(`Problem in retreiving items...`);
            },
        });
    }
    if (validate == true) {
        var _data = {};
        _data["rowid"] = BankAccountObject.hdnroleid;
        _data["bankCd"] = $('#txtCode').val();
        _data["acNumber"] = $('#txtACNo').val();
        _data["address1"] = $('#txtAddress1').val();
        _data["address2"] = $('#txtAddress2').val();
        _data["alternateNo"] = $('#txtAlternateNo').val();
        _data["bankName"] = $('#txtName').val();
        _data["bankSrcName"] = $('#txtSearchName').val();
        if ($('#cbBlock').is(":checked"))
            _data["block"] = true;
        else
            _data["block"] = false;

        _data["branchCd"] = $('#txtBranchCode').val();
        _data["branchName"] = $('#txtBranchName').val();
        _data["city"] = $('#txtCity').val();
        _data["coCd"] = 'ABC';
        _data["contactPerson"] = $('#txtContactPerson').val();
        _data["countryCd"] = $('#cbo_countrydr').val();
        _data["currCd"] = $('#cbo_currencydr').val();
        _data["email"] = $('#txtEmail').val();
        _data["faxNo"] = $('#txtFaxNo').val();
        _data["giroCd"] = $('#txtGIROCode').val();
        _data["iBAN"] = $('#txtIBAN').val();
        _data["iFSC"] = $('#txtIFSC').val();
        _data["chequePrefix"] = $('#txtChequePrefix').val();
        _data["chequeLengthWoPrefix"] = $('#txtChequeLengthWoPrefix').val();
        if ($("#txtMinBalance").val() == '') {
            _data["minBal"] = 0;
        } else {
            _data["minBal"] = $('#txtMinBalance').val();
        }

        _data["personRespId"] = $('#cbo_personResponsibledr').val();
        _data["phoneNo"] = $('#txtPhoneNo').val();
        _data["pin"] = $('#txtPin').val();
        _data["postingGrpCd"] = $('#cbo_postinggroupdr').val();
        _data["stateCd"] = $('#cbo_countydr').val();
        _data["swiftCd"] = $('#txtSWIFTCode').val();
        _data["website"] = $('#txtWebsite').val();

        if ($("#txt_currunitdecplace").val() == '') {
            _data["currunitdecplace"] = 0;
        } else {
            _data["currunitdecplace"] = $("#txt_currunitdecplace").val();
        }
        if (ipaddress == '') {
            _data["creator_mac_add"] = "192.100.0.1";
        } else {
            _data["creator_mac_add"] = "192.100.0.1"; //ipaddress;
        }
        _data["cocd"] = $("#ddlCompany").val();

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        

        var _url = "bank_master_overview.aspx/doSaveBankAccount";
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

                    $.alertable.custconfirm(`Bank Account saved successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "bank_master_overview.aspx";
                    });                  
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });
    }
};

function ShowIP(response) {
    ipaddress = response.ip;
}

var deleteBankAccount = function () {
    roleaction(BankAccountObject.hdnroleid,'delete')
}

var EditBankAccount = function () {
    $('#btnSave').show();
    $('.readOnly').attr("disabled", false);
}

