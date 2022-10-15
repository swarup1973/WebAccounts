$(document).ready(function () {
    var ipaddress = "";
    if (localStorage._exchangratemenuid == '' || localStorage._exchangratemenuid == undefined) {
        localStorage._exchangratemenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._exchangratemenuid;
    }
    if (localStorage.CurrencyExchange_callfor != undefined && localStorage.CurrencyExchange_callfor != "undefined") {
        CurrencyExchange.callfor = localStorage.CurrencyExchange_callfor;
        CurrencyExchange.callerid = localStorage.CurrencyExchange_callerid;
        CurrencyExchange.calldescription = localStorage.CurrencyExchange_calldescription;
    }
    else {
        CurrencyExchange.callfor = '';
        CurrencyExchange.callerid = '';
        CurrencyExchange.calldescription = '';
    }
    ExchangeObject.do_loadexchange();
    ExchangeObject.do_getUserPagepermission();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var ExchangeObject = {
    hdnroleid: '',
    rowid: '',
    mode: '',
    currcd: '',
    entryDate: '',
    startDt: '',
    closeDt: '',
    exchangeRate: '',
    exchangeRatePer: '',
    createdby: '',
    creator_mac_add: '',
    cocd: '',

    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _exchangeRateservice: false,
    _menuid: '',
    _exchangratemenuid: '',
    
    do_loadexchange: () => {
        if (queryString('menuid') != undefined || queryString("menuid") != null) {
          ExchangeObject.menuid= queryString("menuid");
            localStorage.menu_id_premission = queryString("menuid");
        }
        var _data = {};
        _data["currcd"] = CurrencyExchange.callerid;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        $.ajax({
            type: "POST",
            url: "exchange_rates.aspx/loadexchangelist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                ExchangeObject.do_populateexchange(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

        $('#currCode').text(CurrencyExchange.callerid);
        $('#currDescription').text(CurrencyExchange.calldescription);

    },
    do_populateexchange: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#exchange_rates_table",
            fields: [
                { label: "EntryDate", name: "EntryDate" },
                { label: "StartDt", name: "StartDt_1" },
                { label: "ExchangeRate", name: "ExchangeRate" },
                { label: "ExchangeRatePer", name: "ExchangeRatePer" }
            ],
        });

        var roletable = $("#exchange_rates_table");
        
        var roledata = [];
        CurrencyExchange.gridData = [];
        for (var i = 0; i < obj.length; i++) {
            var objnew = obj[i];
            for (var key in objnew) {
                var attrName = key;
                if (attrName.toLowerCase() == "table") {
                    roledata = objnew[key];
                    CurrencyExchange.gridData = objnew[key];
                }
            }
        };


        roletable.dataTable({
            dom: "Bfrtip",
            fixedHeader: true,
            data: roledata,
            columns: [
                { data: "EntryDate" },
                { data: "StartDt_1" },
                { data: "ExchangeRate" },
                { data: "ExchangeRatePer" }
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [
                {
                    add: "new", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'new',
                    }
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'edit',
                    }
                },
                {
                    add: "edit", text: 'Delete', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'delete',
                    }
                },
                {
                    /*add: "exchangeratesservices", text: 'Exchange Rate Services', editor: editor, action: () => window.open("#"),*/
                    add: "exchangeratesservices", text: 'Exchange Rate Services', editor: editor, action: function () { roleaction($('.selected').attr('RowId'), 'excservices', ''); },
                    attr: {
                        title: 'Exchange Rates Services',
                        id: 'Exchangerateserv',
                    }
                }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("currcd", `${data.CurrCd}`);
            },
        });

        var table = $('#exchange_rates_table').DataTable();
        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!ExchangeObject._deleteperm[0]) {
                    $('#delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#delete').prop("disabled", true);
                    $('#delete').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!ExchangeObject._createperm[0]) {
            $('#new').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#new').prop("disabled", true);
            $('#new').attr('title', 'do not have permission to add Exchange Rates Services!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!ExchangeObject._editperm[0]) {
            $('#edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#edit').prop("disabled", true);
            $('#edit').attr('title', 'do not have permission to Edit Exchange Rates Services!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!ExchangeObject._deleteperm[0]) {
            $('#delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#delete').prop("disabled", true);
            $('#delete').attr('title', 'do not have delete permission!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
        if (!ExchangeObject._exchangeRateservice[0]) {
            $('#Exchangerateserv').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#Exchangerateserv').prop("disabled", true);
            $('#Exchangerateserv').attr('title', 'do not have view permission Exchange Rates Services!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }

    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["rowid"] = ExchangeObject.hdnroleid;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "exchange_rates.aspx/doeditexchange",
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
                                ExchangeObject.hdnroleid = objnew[key][0].RowId;
                                ExchangeObject.currcd = objnew[key][0].currcd;
                                ExchangeObject.startDt = objnew[key][0].StartDt;
                                $('#txt_startDt').val(objnew[key][0].StartDt);
                                $('#txt_exchangeRate').val(objnew[key][0].ExchangeRate);
                                $("#txt_exchangeRatePer").val(objnew[key][0].ExchangeRatePer);
                                                                                            
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
        MainObject.do_getuserpageaccess(ExchangeObject);
        if (queryString('menuid') != undefined || queryString("menuid") != null) {
            ExchangeObject._createperm = MainObject.do_IsActionMenuPermission(ExchangeObject.access, 'EXCHANGE RATES', 'create');
            ExchangeObject._editperm = MainObject.do_IsActionMenuPermission(ExchangeObject.access, 'EXCHANGE RATES', 'edit');
            ExchangeObject._deleteperm = MainObject.do_IsActionMenuPermission(ExchangeObject.access, 'EXCHANGE RATES', 'delete');
            ExchangeObject._exchangeRateservice = MainObject.do_IsActionMenuPermission(ExchangeObject.access, 'Exchange Rate Services', 'view');
        }
    },
};

var showmodal = function () {

    $('.modal-title').html('Add New Exchange');
    ExchangeObject.hdnroleid = '';
    $('#txt_exchangeRate').val('');
    $('#txt_exchangeRatePer').val('');
    $("#myModal").modal('show');
    $('#div_block').hide();
    
};

var roleaction = function (roleid, mode) {
    if (roleid == "" || roleid == undefined || roleid == "undefined") return;

    if (mode == 'excservices') {
        if (queryString('menuid') != undefined || queryString("menuid") != null) {
            window.location = "exchange_rates.aspx?menuid=" + queryString('menuid');
        }
    }

    if (mode == 'edit') {
        var checkDelete = CurrencyExchange.gridData.filter(function (obj) {
            return (obj.CloseDt === null && obj.RowId == roleid);
        });
        if (checkDelete.length == 0) {
            $.alertable.alert(`Unable to Edit`);
            return false;
        }
        else {
            showmodal();
            $('.modal-title').html('Edit Exchange');
            ExchangeObject.hdnroleid = roleid;
            ExchangeObject.do_loaddataedit(roleid);
        }
    }
    else if (mode == 'delete') {
       var checkDelete= CurrencyExchange.gridData.filter(function (obj) {
            return (obj.CloseDt === null && obj.RowId == roleid);
       });
        if (checkDelete.length == 0) {
            $.alertable.alert(`Unable to Delete`);
            return false;
        }
        $.alertable
            .custconfirm(`Are you want to delete the Currency Exchange ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    //alert(userid);
                    var _data;
                    _data = '{rowid:"' + roleid + '"}';

                    $.ajax({
                        type: "POST",
                        url: "exchange_rates.aspx/dodelete",
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            if (!dochkses(result.d)) return;
                            if (result.d.toLowerCase() == "false") {
                                window.location = "exchange_rates.aspx";
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
    
};

var showmodalPosting = function () {
    $('.modal-title').html('Exchange - New');
    ExchangeObject.do_loadlookup();
    ExchangeObject.hdnroleid = '';
    $('#txt_currcd').val('');
    $('#txt_currdesc').val('');
    $("#myModal").modal('show');
};

var saveexchange = function () {
    var validate = true;
    if ($('#txt_exchangeRate').val() == '') {
        validate = false;
        $.alertable.alert(`Exchange Rate required.`);
        $("#txt_exchangeRate").focus();
        return false;
    }
    else if (!dateValidation()) {
        $.alertable.alert(`Start date should be greather than last start date`);
    }
    else if (validate == true) {
        var _data = {};
        _data["rowid"] = ExchangeObject.hdnroleid;
        _data["startDt"] = $('#txt_startDt').val();
        _data["currcd"] = CurrencyExchange.callerid;
        _data["exchangeRate"] = $("#txt_exchangeRate").val();
        _data["exchangeRatePer"] = $("#txt_exchangeRatePer").val();
        if (ipaddress == '') {
            _data["creator_mac_add"] = "192.100.0.1";
        } else {
            _data["creator_mac_add"] = ipaddress;
        }
        _data["cocd"] = "ABC";
        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        var _url = "exchange_rates.aspx/doSaveexchange";
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
                    window.location = "exchange_rates.aspx";
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });
    }
};

var dateValidation = function () {
    var lastStartDt = CurrencyExchange.gridData.filter(function (obj) {
        return (obj.CloseDt === null);
    });
    if (lastStartDt.length < 1) {
        return true;
    }
    if (ExchangeObject.hdnroleid === lastStartDt[0].RowId && $('#txt_startDt').val() >= lastStartDt[0].StartDt) {
        return true
    }
    else if ($('#txt_startDt').val() > lastStartDt[0].StartDt) {
        return true;
    }
    else
        return false;
}
function ShowIP(response) {
    ipaddress = response.ip;
} 

