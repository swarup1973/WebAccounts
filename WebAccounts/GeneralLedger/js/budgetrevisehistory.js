var ipaddress = "";
var objBudgetModel;
var companylogo="";
var contentType="";
var imgfileName = "";
var manualentry = false;
var No_Sequence;
var Prefix, Suffix, StartingNo, EndingNo;
$(document).ready(function () {
   
   


    var cuserid = '<%=Session["userid"].ToString() %>';
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ipaddress = e.ip;
    });      
    //localStorage.menu_id_premission = 326;
   
  
    //setImage();
    $("#myModal").modal({
        show: false,
        backdrop: 'static'
    });

    $("#click-me").click(function () {
        $("#myModal").modal("show");
    });

    localStorage.menu_id_premission;
    
    // $("#spnBudgetcode").html(localStorage.budgetregisteroverviewcode);
    // $("#spnBudgetDesc").html(localStorage.budgetregisteroverviewdesc);
    // $("#spnBudgetStDt").html(localStorage.budgetregisteroverviewStDt);
    // $("#spnBudgetEndDt").html(localStorage.budgetregisteroverviewEndDt);
  

    
    BudgetReviseHistoryOverviewObject.do_loaddata();
    BudgetReviseHistoryOverviewObject.do_getUserPagepermission();
  
    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var BudgetReviseHistoryOverviewObject = {

    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _stopperm: '',
    _blockperm: '',
    _budgetentrycreateperm: '',
    _budgetentrymenuid: '',
    _budgetentryvieweperm: '',
    _viewbudgetentrymenuid: '',
    revisionentryvieweperm: '',
    _revisionmenuid: '',
    balancevariancevieweperm: '',
    _balancevariancemenuid: '',
    _budgetallocationvieweperm: '',
    _budgetallocationviewvieweperm: '',
    _budgetallocationmenuid: '',
    _budgetallocationviewmenuid: '',
    _budgettransfermenuid: '',
    _budgettransferviewmenuid : '',
    do_loaddata: () => {
        var CoCd, BudId, created_by, creator_MAC_add;
    
        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
        BudId = localStorage.budgetregisteroverviewrowid;//localStorage.budgetentryoverviewrowid;
       
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),

            $.ajax({
                url: apiurl + 'api/BudgetReviseHistory',
                type: 'POST',
                data: { CoCd: CoCd, BudId: BudId },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                  
                    BudgetReviseHistoryOverviewObject.do_populateData(obj);
                },
                error: function (err) {
                    alert(err.statusText);
                }
            }); 
       

    },
    do_populateData: (obj) => {
        // editor init
        
        var editor = new $.fn.dataTable.Editor({
            table: "#addressbook",
            fields: [
                { label: "EntryNo", name: "EntryNo" },
                { label: "EntryDt", name: "EntryDt" },
                { label: "AcCd", name: "AcCd" },
                { label: "AcDesc", name: "AcDesc" },
                { label: "AcTypeCd", name: "AcTypeCd" },
                { label: "BudGrpDesc", name: "BudGrpDesc" },
                { label: "CYBud", name: "CYBud" },
                { label: "newbudgetamt", name: "newbudgetamt" },
                 { label: "PrdAllo", name: "PrdAllo" },
                { label: "PrdDim", name: "PrdDim" },
                { label: "RevisedRefNo", name: "RevisedRefNo" }
                
                
              
            ],
        });
        var roletable = $("#addressbook");

        var roledata = [];
        roledata = obj;

        

        roletable.dataTable({
            //dom: "Bfrtip",
            dom: "lBfrtip",
            "pageLength": 10,
            data: roledata,
            columnDefs: [{
                orderable: false,
                'render': function (data, type, full, meta) {
                    //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                    return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                },
                targets: 8
            },
            {
                orderable: false,
                'render': function (data, type, full, meta) {
                    //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                    return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                },
                targets: 9
            }
               
            ]
            ,
            columns: [
                { data: "EntryNo" },
                { data: "EntryDt" },
                { data: "AcCd" },
                { data: "AcDesc" },
                { data: "AcTypeCd" },
                { data: "BudGrpDesc" },
                { data: "CYBud" },
                { data: "newbudgetamt" },
                { data: "PrdAllo" },
                { data: "PrdDim" },
                { data: "RevisedRefNo" }

               
            ],
         
            select: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [
                
                
              
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowid", `${data.RowId}`);
            },
        });
        
        var table = $('#addressbook').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
               
                if (!BudgetReviseHistoryOverviewObject._deleteperm[0]) {
                    $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#country_overview_delete').prop("disabled", true);
                    $('#country_overview_delete').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }
        });


        //if (!BudgetReviseHistoryOverviewObject._createperm[0]) {
        //    $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        //    $('#country_overview_create').prop("disabled", true);
        //    $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
        //    table.button(0).action(function () {
        //        this.active(false);
        //    });
        //}
        if (!BudgetReviseHistoryOverviewObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        
        if (!BudgetReviseHistoryOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
     
        if (!BudgetReviseHistoryOverviewObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view !!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
        //if (!BudgetReviseHistoryOverviewObject._budgetentrycreateperm[0]) {
        //    $('#country_overview_budgetentry').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        //    $('#country_overview_budgetentry').prop("disabled", true);
        //    $('#country_overview_budgetentry').attr('title', 'do not have permission to view !!!');
        //    table.button(3).action(function () {
        //        this.active(false);
        //    });
        //}
        if (!BudgetReviseHistoryOverviewObject._budgetallocationviewvieweperm[0]) {
            $('#country_overview_ViewAllocation').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_ViewAllocation').prop("disabled", true);
            $('#country_overview_ViewAllocation').attr('title', 'do not have permission to view !!!');
            table.button(5).action(function () {
                this.active(false);
            });
        }
        //if (!BudgetReviseHistoryOverviewObject.revisionentryvieweperm[0]) {
        //    $('#country_overview_ViewRivisionHistory').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        //    $('#country_overview_ViewRivisionHistory').prop("disabled", true);
        //    $('#country_overview_ViewRivisionHistory').attr('title', 'do not have permission to view !!!');
        //    table.button(6).action(function () {
        //        this.active(false);
        //    });
        //}
        //if (!BudgetReviseHistoryOverviewObject.balancevariancevieweperm[0]) {
        //    $('#country_overview_BudgetBalanceVariance').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        //    $('#country_overview_BudgetBalanceVariance').prop("disabled", true);
        //    $('#country_overview_BudgetBalanceVariance').attr('title', 'do not have permission to view !!!');
        //    table.button(7).action(function () {
        //        this.active(false);
        //    });
        //}

    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(BudgetReviseHistoryOverviewObject);
        
        BudgetReviseHistoryOverviewObject._vieweperm = MainObject.do_IsActionMenuPermission(BudgetReviseHistoryOverviewObject.access, 'BUDGET ENTRY', 'view');
        BudgetReviseHistoryOverviewObject._createperm = MainObject.do_IsActionMenuPermission(BudgetReviseHistoryOverviewObject.access, 'BUDGET ENTRY', 'create');
        BudgetReviseHistoryOverviewObject._editperm = MainObject.do_IsActionMenuPermission(BudgetReviseHistoryOverviewObject.access, 'BUDGET ENTRY', 'edit');
        BudgetReviseHistoryOverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(BudgetReviseHistoryOverviewObject.access, 'BUDGET ENTRY', 'delete');
        BudgetReviseHistoryOverviewObject._budgetallocationvieweperm = MainObject.do_IsActionMenuPermission(BudgetReviseHistoryOverviewObject.access, 'BUDGET ALLOCATION', 'view');
        BudgetReviseHistoryOverviewObject._budgetallocationviewvieweperm = MainObject.do_IsActionMenuPermission(BudgetReviseHistoryOverviewObject.access, 'VIEW ALLOCATION', 'view');

        BudgetReviseHistoryOverviewObject._budgetallocationmenuid = MainObject.do_IsActionMenuPermission(BudgetReviseHistoryOverviewObject.access, 'BUDGET ALLOCATION', 'menuid');
        BudgetReviseHistoryOverviewObject._budgetallocationviewmenuid = MainObject.do_IsActionMenuPermission(BudgetReviseHistoryOverviewObject.access, 'VIEW ALLOCATION', 'menuid');

        BudgetReviseHistoryOverviewObject._budgettransfermenuid = MainObject.do_IsActionMenuPermission(BudgetReviseHistoryOverviewObject.access, 'BUDGET TRANSFER', 'menuid');
        BudgetReviseHistoryOverviewObject._budgettransferviewmenuid = MainObject.do_IsActionMenuPermission(BudgetReviseHistoryOverviewObject.access, 'BUDGET TRANSFER', 'menuid');

    },
    do_checkcodeentry: (ctype) => {

        $.ajax({
            url: apiurl + 'api/AdministratorNoSequenceCode',
            type: 'POST',
            data: { ctype: ctype, CoCd: $("#ddlCompany").val() },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                manualentry = response[0].AllowManual;
                Prefix = response[0].Prefix;
                Suffix = response[0].Suffix;
                No_Sequence = response[0].No_Sequence;
                StartingNo = response[0].StartingNo;
                EndingNo = response[0].EndingNo;
                $("#txtItemCdHelp").html('');
                if (manualentry == true) {
                    $("#txtItemCdHelp").html('Example : ' + No_Sequence);
                }
                BudgetReviseHistoryOverviewObject.do_populateMasterDropdown();

            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    },
    do_populateMasterDropdown: () => {
       
        $.ajax({
            url: apiurl + 'api/getBudgetSetupModel',
            type: 'POST',
            data: { CoCd: $("#ddlCompany").val(), RowId : -1 },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objBudgetModel = response;
                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].GS_ModelName + "</option>"
                    );
                }
                
                $("#ddBudgetModel").html(_html.join("")); 
                BudgetReviseHistoryOverviewObject.do_loaddata();
                
              

                
               
            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    },
    do_updateblockstop: (id,ctype) => {
        var CoCd, CYBud, BudAmtUtilised, BalCF_ToNextPrd, IsBlock, IsStop, PrdAllo, PrdDim, created_by, creator_MAC_add;

        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();

        IsBlock = 0;
        IsStop = 0;
        CYBud = 0;
        BudAmtUtilised = 0;
        BalCF_ToNextPrd = 0;
        PrdAllo = 0;
        PrdDim = 0;


        if (ctype == 'block'){
            IsBlock=1;
        }
        if (ctype == 'stop'){
            IsStop=1;
        }

        $.ajax({


            url: apiurl + 'api/GeneralLedgerBudgetRegisterDetailseditoperation',
            type: 'POST',
            data: { mode: ctype, RowId: id, CoCd: CoCd, created_by: created_by, creator_MAC_add: creator_MAC_add, CYBud: CYBud, BudAmtUtilised: BudAmtUtilised, BalCF_ToNextPrd: BalCF_ToNextPrd, IsBlock: IsBlock, IsStop: IsStop, PrdAllo: PrdAllo, PrdDim: PrdDim },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "budget-entry.aspx";
                    });
                }

            },
            error: function (err) {

                alert(err.responseText);
            }
        });


    },
    do_loaddataedit: (id) => {
        var CoCd, BudId, created_by, creator_MAC_add;
        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
        BudId = localStorage.budgetregisteroverviewrowid;

        $.ajax({


            url: apiurl + 'api/GeneralLedgerBudgetRegisterDetailsoperation',
            type: 'POST',
            data: { mode: "EDIT", RowId: id, CoCd: CoCd, created_by: created_by, creator_MAC_add: creator_MAC_add, BudId: BudId },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {

                
                
                BudgetReviseHistoryOverviewObject.rowid = response[0].RowId;
                $("#txtEntryNo").val(response[0].EntryNo);
                $('#txtEntryDt').val(response[0].EntryDt.slice(0, 10));
                $("#txtAcCode").val(response[0].AcCd);
                $("#txtDesc").val(response[0].AcDesc);
                $("#txtType").val(response[0].AcTypeCd);
                $("#txtGroup").val(response[0].BudGrpDesc);
                $("#txtCaryyForwardLastPeriod").val(response[0].BalCF_FromLastPrd);
                $("#txtCYBudget").val(response[0].CYBud);
                $("#txtTotalBudget").val(response[0].TotBudAmt);
                $("#txtBudgetUtilised").val(response[0].BudAmtUtilised);
                $("#txtBudgetBalance").val(response[0].BudBal);
                $("#txtCarryForwardNextPeriod").val(response[0].BalCF_ToNextPrd);
                if (response[0].IsBlock == true) {
                    $("#chkBlock").prop('checked', true);
                }
                else {
                    $("#chkBlock").prop('checked', false);
                }
                if (response[0].IsStop == true) {
                    $("#chkStop").prop('checked', true);
                }
                else {
                    $("#chkStop").prop('checked', false);
                }
                if (response[0].PrdAllo == true) {
                    $("#chkPeriodAllo").prop('checked', true);
                }
                else {
                    $("#chkPeriodAllo").prop('checked', false);
                }
                if (response[0].PrdDim == true) {
                    $("#chkDimensionAllo").prop('checked', true);
                }
                else {
                    $("#chkDimensionAllo").prop('checked', false);
                }
                if (response[0].Revised == true) {
                    $("#chkRevised").prop('checked', true);
                }
                else {
                    $("#chkRevised").prop('checked', false);
                }
                $("#txtLastRevised").val(response[0].LastRevisedDt);
                $("#txtRevisionRefNo").val(response[0].RevisedRefNo);
                if (response[0].BalCF == true) {
                    $("#chkBalanceCF").prop('checked', true);
                }
                else {
                    $("#chkBalanceCF").prop('checked', false);
                }
            },
            error: function (err) {

                alert(err.responseText);
            }
        });


    },
    do_loadwarehouselocation: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            $.ajax({
                url: apiurl + 'api/InventoryWarehouseLocation',
                type: 'POST',
                data: { p_mode: "getlist", LocationCd: '', CoCd: $("#ddlCompany").val(), LocationDesc: '', WhId: BudgetReviseHistoryOverviewObject.rowid, AisleNo: -1, RackNo: -1, SelfNo: -1, BinNo: "-1", created_by: $("#txt").val(), RowId: -1 },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    BudgetReviseHistoryOverviewObject.do_loadwarehouselocationData(obj);
                },
                error: function () {
                    alert("error in data fetch");
                }
            });


    },
    do_loadwarehouselocationData: (obj) => {
        // editor init

        var editor = new $.fn.dataTable.Editor({
            table: "#locationbook",
            fields: [
                { label: "WareHouseCd", name: "WareHouseCd" },
                { label: "AisleNo", name: "AisleNo" },
                { label: "RackNo", name: "RackNo" },
                { label: "SelfNo", name: "SelfNo" },
                { label: "BinNo", name: "BinNo" },
                { label: "LocationCd", name: "LocationCd" },
                { label: "LocationDesc", name: "LocationDesc" }
            ],
        });
        var roletable = $("#locationbook");

        var roledata = [];
        roledata = obj;



        roletable.dataTable({
            //dom: "Bfrtip",
            fixedHeader: true,
            data: roledata,
            "bDestroy": true,
            columns: [
                { data: "WareHouseCd" },
                { data: "AisleNo" },
                { data: "RackNo" },
                { data: "SelfNo" },
                { data: "BinNo" },
                { data: "LocationCd" },
                { data: "LocationDesc" }
            ],
            select: true,
            scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowid", `${data.RowId}`);

            },
        });

        //var table = $('#locationbook').DataTable();
        
       

    


    },

};
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}
function gotfocus(cobj) {
    cobj.animate({ left: 0, duration: 'slow' });
    cobj.focus();
}
var savedata = function () {
    var validate = true;
    //
    
   
    if ($('#txtCYBudget').val()<0) {
        validate = false;
        gotfocus($("#txtCYBudget"));
        $.alertable.alert(`Current Year Budget required.`);
        //$("#txtName").focus();
        return false;
    }
    else {
        $('#btnSave').prop("disabled", true);
        
        saveFinal(-1);
       
        //companylogo = "";
        //companylogo = companylogo.replace('data:image/png;base64,', '');
        //companylogo = companylogo.replace('data:image/jpeg;base64,', '');
        //companylogo = companylogo.replace('data:image/jpg;base64,', '');
        //companylogo = companylogo.replace('data:application/pdf;base64,', '');
       
       

        
    }

};

function saveFinal(imgId) {
    var CoCd, CYBud, BudAmtUtilised, BalCF_ToNextPrd, IsBlock, IsStop, PrdAllo, PrdDim, created_by, creator_MAC_add;


    creator_MAC_add = ipaddress;
    created_by = $("#txt").val();
    CoCd = $("#ddlCompany").val();
    
    IsBlock = 0;
    IsStop = 0;
    CYBud = 0;
    BudAmtUtilised = 0;
    BalCF_ToNextPrd = 0;
    PrdAllo = 0;
    PrdDim = 0;


    if ($('#chkBlock').is(':checked')) {
        IsBlock = 1;
    }
    
    if ($('#chkStop').is(':checked')) {
        IsStop = 1;
    }
   
    if ($('#chkPeriodAllo').is(':checked')) {
        PrdAllo = 1;
    }
    if ($('#chkDimensionAllo').is(':checked')) {
        PrdDim = 1;
    }
    CYBud = $('#txtCYBudget').val();
    BudAmtUtilised = $('#txtBudgetUtilised').val();
    BalCF_ToNextPrd = $('#txtCarryForwardNextPeriod').val();
  
   
    if (parseInt(BudgetReviseHistoryOverviewObject.rowid) > 0) {
        $.ajax({

            url: apiurl + 'api/GeneralLedgerBudgetRegisterDetailseditoperation',
            type: 'POST',
            data: { mode: "update", RowId: parseInt(BudgetReviseHistoryOverviewObject.rowid), CoCd: CoCd, created_by: created_by, creator_MAC_add: creator_MAC_add, CYBud: CYBud, BudAmtUtilised: BudAmtUtilised, BalCF_ToNextPrd: BalCF_ToNextPrd, IsBlock: IsBlock, IsStop: IsStop, PrdAllo: PrdAllo, PrdDim: PrdDim },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);


                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "budget-entry.aspx";
                    });
                }
                else {
                    $('#btnSave').prop("disabled", false);
                    validate = false;
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $.alertable.alert(
                        response[0].msg
                    );
                   
                    validate = false;
                    return false;
                }

            },
            error: function (ex) {
                $('#btnSave').prop("disabled", false);
                alert(ex.responseText);
            }
        });
    }
    else {
        
        $.ajax({
            url: apiurl + 'api/GeneralLedgerBudgetRegisterDetailseditoperation',
            type: 'POST',
            data: { mode: "update", RowId: parseInt(BudgetReviseHistoryOverviewObject.rowid), CoCd: CoCd, created_by: created_by, creator_MAC_add: creator_MAC_add, CYBud: CYBud, BudAmtUtilised: BudAmtUtilised, BalCF_ToNextPrd: BalCF_ToNextPrd, IsBlock: IsBlock, IsStop: IsStop, PrdAllo: PrdAllo, PrdDim: PrdDim },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);
                console.log(response);
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "budget-entry.aspx";
                    });
                }
                else {
                    $('#btnSave').prop("disabled", false);
                    validate = false;
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $.alertable.alert(
                        response[0].msg
                    );
                    
                    validate = false;
                    return false;
                }

            },
            error: function (ex) {
                $('#btnSave').prop("disabled", false);
                console.log(ex);
                alert(ex.responseText);
            }
        });
    }
}


var otherWindow = function (countryCd, mode) {
   
    if (countryCd == "" || countryCd == undefined || countryCd == "undefined") return;
   
    localStorage.budgetentryoverviewrowid = countryCd;
    //$('#addressbook').DataTable().rows('.selected').data()[0].AddressCode
    if (localStorage.budgetentryoverviewrowid) {
       
        if (mode == "VIEWBUDGETALLOCATION") {


            localStorage.clickedmenu_id = BudgetReviseHistoryOverviewObject._budgetallocationmenuid[1];
            localStorage.menu_id_premission = BudgetReviseHistoryOverviewObject._budgetallocationmenuid[1];
            localStorage.budgetallocationaccode = $('#addressbook').DataTable().rows('.selected').data()[0].AcCd;
            localStorage.budgetallocationaccodedesc = $('#addressbook').DataTable().rows('.selected').data()[0].AcDesc;
            localStorage.budgetallocationaccodeamt = $('#addressbook').DataTable().rows('.selected').data()[0].CYBud;

            //localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            //localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemType;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(BudgetReviseHistoryOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + BudgetReviseHistoryOverviewObject._addressdetailsmenuid[1];
            location.href = 'budget-allocation-view.aspx';

        }
        if (mode == "BUDGETALLOCATION") {


            localStorage.clickedmenu_id = BudgetReviseHistoryOverviewObject._budgetallocationmenuid[1];
            localStorage.menu_id_premission = BudgetReviseHistoryOverviewObject._budgetallocationmenuid[1];
            localStorage.budgetallocationaccode = $('#addressbook').DataTable().rows('.selected').data()[0].AcCd;
            localStorage.budgetallocationaccodedesc = $('#addressbook').DataTable().rows('.selected').data()[0].AcDesc;
            localStorage.budgetallocationaccodeamt = $('#addressbook').DataTable().rows('.selected').data()[0].CYBud;
            //localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            //localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemType;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(BudgetReviseHistoryOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + BudgetReviseHistoryOverviewObject._addressdetailsmenuid[1];
            location.href = 'budget_allocation_edit.aspx';

        }
        if (mode == "BUDGETTRANSFER") {


            localStorage.clickedmenu_id = BudgetReviseHistoryOverviewObject._budgettransferviewmenuid[1];
            localStorage.menu_id_premission = BudgetReviseHistoryOverviewObject._budgettransferviewmenuid[1];
            localStorage.budgetallocationaccode = $('#addressbook').DataTable().rows('.selected').data()[0].AcCd;
            localStorage.budgetallocationaccodedesc = $('#addressbook').DataTable().rows('.selected').data()[0].AcDesc;
            localStorage.budgetallocationaccodeamt = $('#addressbook').DataTable().rows('.selected').data()[0].CYBud;
            //localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            //localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemType;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(BudgetReviseHistoryOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + BudgetReviseHistoryOverviewObject._addressdetailsmenuid[1];
            location.href = 'budget-transfer.aspx';

        }
        
    }
    
}

var datablank = function () {
    companylogo = "";
    contentType = "";

    $("#txtEntryNo").val('');
    $('#txtEntryDt').val('');
    $("#txtAcCode").val('');
    $("#txtDesc").val('');
    $("#txtType").val('');
    $("#txtGroup").val('');
    $("#txtCaryyForwardLastPeriod").val('');
    $("#txtCYBudget").val('');
    $("#txtTotalBudget").val('');
    $("#txtBudgetUtilised").val('');
    $("#txtBudgetBalance").val('');
    $("#txtCarryForwardNextPeriod").val('');
    $("#chkBlock").prop('checked', false);
    $("#chkStop").prop('checked', false);
    $("#chkPeriodAllo").prop('checked', false);
    $("#chkDimensionAllo").prop('checked', false);
    $("#chkRevised").prop('checked', false);
    $("#txtLastRevised").val('');
    $("#txtRevisionRefNo").val('');
    $("#chkBalanceCF").prop('checked', false);


   
   
}
var roleaction = function (rowId, mode) {
    
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);
  
    if (mode == "viewlocation") {
        BudgetReviseHistoryOverviewObject.rowid = rowId;
        showmodalview();

    }
    if (mode == 'REVISEBUDGET') {
        BudgetReviseHistoryOverviewObject.rowid = rowId;

        $("#revbudgetcode").html(localStorage.budgetregisteroverviewcode);
        $("#revbudgetdesc").html(localStorage.budgetregisteroverviewdesc);
        $("#revstartdt").html(localStorage.budgetregisteroverviewStDt);
        $("#revenddt").html(localStorage.budgetregisteroverviewEndDt);

        $("#revaccode").html($('#addressbook').DataTable().rows('.selected').data()[0].AcCd);
        $("#revbudamt").html($('#addressbook').DataTable().rows('.selected').data()[0].CYBud);
        $("#revallobasis").html(localStorage.GS_PeriodAlloBasis);
        populatePeriodDropdown();
    
   
        
       
    }
    if (mode == 'add') {
        companylogo = "";
        BudgetReviseHistoryOverviewObject.rowid = '-1';
        if (manualentry == true) {
            $('#txtBudgetCode').attr("disabled", false);
        }
        if (manualentry == false) {
            $('#txtBudgetCode').attr("disabled", true);
        }
        showmodal();
        $('.modal-title').html('Budget Entry - New');

        datablank();
        $('#btnSave').text('Save');
        $('#btnSave').show();
        //$('.readOnly').attr("disabled", false);
       
        //$('#txtCode').prop("disabled", false);

    }
    if (mode == 'edit') {
        showmodal();
        
        $('.modal-title').html('Budget Entry - Edit');
        $('#cbBlock').show();
        datablank();
        if (!BudgetReviseHistoryOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
        } else { $('#country_overview_delete').show(); }
        
        $('#lbBlock').show();
        $('#btnEdit').hide();
        $('#btnSave').text('Save');
        $('#btnSave').show();
        $('.readOnly').attr("disabled", false);
        //$('#txtCode').prop("disabled", true);

        BudgetReviseHistoryOverviewObject.rowid = rowId;
        BudgetReviseHistoryOverviewObject.do_loaddataedit(rowId);
        
    }
    else if(mode == 'view') {
        showmodal();
        datablank();
        $('.modal-title').html('Budget Entry - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!BudgetReviseHistoryOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!BudgetReviseHistoryOverviewObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        BudgetReviseHistoryOverviewObject.rowid = rowId;
        BudgetReviseHistoryOverviewObject.do_loaddataedit(rowId);
    }
    
    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                   
                    //$.ajax({
                    //    url: apiurl + 'api/GeneralLedgerBudgetSetupOperation',
                    //    type: 'POST',
                    //    data: { p_mode: "delete", RowId: rowId, CoCd: CoCd, created_by: created_by, creater_MAC_add: creator_MAC_add, GS_ModelCd: GS_ModelCd, GS_BudGrpId: GS_BudGrpId, GS_ModelName: GS_ModelName, GS_PeriodAlloBasis: GS_PeriodAlloBasis, GS_AlloId: GS_AlloId, GS_IsStop: GS_IsStop, GS_IsBlock: GS_IsBlock, RP_ConfPurchReq: RP_ConfPurchReq, RP_ConfPurchOrder: RP_ConfPurchOrder, RP_ConfPurchInv: RP_ConfPurchInv, RP_ConfExpnsJrnl: RP_ConfExpnsJrnl, RP_ConfFAJrnl: RP_ConfFAJrnl, RP_ConfPayJrnl: RP_ConfPayJrnl, Admin_ThresholdLimit: Admin_ThresholdLimit, Admin_ThresholdWarning: Admin_ThresholdWarning, Admin_OverbudgetingPolicy: Admin_OverbudgetingPolicy, Admin_RevisionPolicy: Admin_RevisionPolicy },
                    //    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    //    success: function (response) {
                    //        $.alertable.alert(`Data removed successfully.`, ``, `Ok`, ``).then(function () {
                    //            window.location = "budget-entry.aspx";
                    //        });
                    //    },
                    //    error: function () {
                    //        alert("error in data delete");
                    //    }
                    //}); 

                },
            );
    }
    else if (mode == 'block') {
        $.alertable.custconfirm(`Are you want to block the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    BudgetReviseHistoryOverviewObject.do_updateblockstop(rowId,'block');

                },
            );
    }
    else if (mode == 'stop') {
        $.alertable.custconfirm(`Are you want to stop the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    BudgetReviseHistoryOverviewObject.do_updateblockstop(rowId,'stop');

                },
            );
    }
    
};

function getPostCodeDetails() {
    try {
       
        var cpostCode = $('#txtPostCode').val();
        $('#txtCity').val('');
        $('#txtCountry').val('');
        $('#txtState').val('');
        $('#txtPostId').val('-1');
        if (cpostCode.length > 1) {
            $.ajax({
                url: apiurl + 'api/getPostCodeDetails',
                type: 'POST',
                data: { PostCode: cpostCode },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    console.log(response);
                    //alert(response.length);
                    //alert(response[0].CountryCd);
                    
                    if (response.length > 0) {
                        $('#txtCity').val(response[0].CityName);
                        $('#txtCountry').val(response[0].CountryName);
                        $('#txtState').val(response[0].StateName);

                        $('#txtPostId').val(response[0].addressID);
                      
                    }
                    else {
                        alert('Invalid Post Code!');
                        //$("#txtPostCode").focus();
                        //return true;
                    }


                },
                error: function () {
                    alert("error in fetch data for postcode");
                }
            }); 
        }
     
        
    }
    catch (ex) {

    }
}
function getWarehouseByType() {

    $("#ddQuarantine").val(-1);
    $("#ddTransit").val(-1);
    $("#ddVendor").val(-1);
    var whtype = $("#ddwarehousetype").val();
    if (whtype == 1) {
        //$('#country_overview_create').prop("disabled", true);
        $("#ddQuarantine").prop("disabled", false);
        $("#ddTransit").prop("disabled", false);
        $("#ddVendor").prop("disabled", true);
    }
    if (whtype == 2 || whtype==3) {
        //$('#country_overview_create').prop("disabled", true);
        $("#ddQuarantine").prop("disabled", true);
        $("#ddTransit").prop("disabled", true);
        $("#ddVendor").prop("disabled", true);
    }
    if (whtype == 4) {
        //$('#country_overview_create').prop("disabled", true);
        $("#ddQuarantine").prop("disabled", false);
        $("#ddTransit").prop("disabled", false);
        $("#ddVendor").prop("disabled", false);
    }
    //var ccompany = $("#ddlCompany").val();
 
    //var _html1 = [];
    //_html1.push("<option value='-1'>  --Select--</option>");
    //$("#ddOtherWarehouse").html(_html1.join(""));
    //if (whtype > 1) {
    //    $('#otherwarehouseType').html($("#ddwarehousetype :selected").text());
    //    $("#divwarehousetype").show();
    //    $.ajax({
    //        url: apiurl + 'api/getWarehouseMasterbyType',
    //        type: 'POST',
    //        data: { whtype: whtype, ccompany: ccompany },
    //        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    //        success: function (response) {
    //            objCountry = response;

    //            var _html = [];
    //            _html.push("<option value='-1'>  --Select--</option>")
    //            for (var i = 0; i < response.length; i++) {


    //                _html.push(
    //                    "<option value='" + response[i].RowId + "'>" + response[i].WareHouseCd + "</option>"
    //                );
    //            }
    //            console.log(_html);
    //            $("#ddOtherWarehouse").html(_html.join(""));




    //        },
    //        error: function () {
    //            alert("error in fetch data for postcode");
    //        }
    //    }); 
    //}
   
}
function getOtherDetails() {
    try {
        var cCode = $('#ddBudgetModel').val();
        var s = getObjectByValue(objBudgetModel, "RowId", cCode);
        $('#txtLedgerGroup').val(s[0].BudGrpDesc);
        $('#txtPeriod').val(s[0].GS_PeriodAlloBasis);
        $('#txtAllocation').val(s[0].AlloName);
        $('#txtThreshold').val(s[0].Admin_ThresholdLimit);
        $('#txtwarning').val(s[0].Admin_ThresholdWarning);
        $('#txtPolicy').val(s[0].Admin_OverbudgetingPolicy);
        $('#txtRevisionPolicy').val(s[0].Admin_RevisionPolicy);
    }
    catch (ex) {

    }
}

var getObjectByValue = function (array, key, value) {
    return array.filter(function (object) {
        return object[key] === value;
    });
};

function ShowIP(response) {
    ipaddress = response.ip;
}
function PopulateState() {
    BudgetReviseHistoryOverviewObject.do_populateLocationDropdown('STATE', $('#ddPincodeCountry').val(), $('#ddPincodeCounty'));
}
function PopulateCity() {
    BudgetReviseHistoryOverviewObject.do_populateLocationDropdown('CITY', $('#ddPincodeCounty').val(), $('#ddPincodeCity'));
}
var setpincode = function (cpincode) {
    
    var cpostCode = '';
    var cCityObj, cCountryObj, cStateObj, cPostCodeObj, cPostCodeIdobj;
    var cType = localStorage.cfetchpincode;
    
    if (cType == 'PrimaryAddressPostCode') {
        cCityObj = $('#txtPrimaryAddresstxtCity');
        cCountryObj = $('#txtPrimaryAddresstxtCountry');
        cStateObj = $('#txtPrimaryAddresstxtCounty');
        cPostCodeObj = $('#txtPrimaryAddressPostCode');
        cPostCodeIdobj = $('#txttPrimaryAddressPostId');

    }
    if (cType == 'InvoiceAddressPostCode') {
        cCityObj = $('#txtInvoiceAddressCity');
        cCountryObj = $('#txtInvoiceAddressCountry');
        cStateObj = $('#txtInvoiceAddressCounty');
        cPostCodeObj = $('#txtInvoiceAddressPostCode');
        cPostCodeIdobj = $('#txtInvoiceAddressPostId');

    }
    if (cType == 'ShippingAddressPostCode') {
        cCityObj = $('#txtShippingCity');
        cCountryObj = $('#txtShippingCountry');
        cStateObj = $('#txtShippingCounty');
        cPostCodeObj = $('#txtShippingAddressPostCode');
        cPostCodeIdobj = $('#txtShippingAddressPostId');

    }
    cPostCodeObj.val('');
    cCityObj.val('');
    cCountryObj.val('');
    cStateObj.val('');
    cPostCodeIdobj.val(-1);

    $.ajax({
        url: apiurl + 'api/getPostCodeDetailsByPostCodeId',
        type: 'POST',
        data: { PostCodeId: cpincode },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            console.log(response);
            //alert(response.length);
            //alert(response[0].CountryCd);

            if (response.length > 0) {
                cCityObj.val(response[0].CityName);
                cCountryObj.val(response[0].CountryName);
                cStateObj.val(response[0].StateName);
                cPostCodeObj.val(response[0].PostCode);
                cPostCodeIdobj.val(response[0].addressID);
                $("#myModalPincode .close").click();

            }
            else {
                alert('Invalid Post Code!');
                //$("#txtPostCode").focus();
                //return true;
            }


        },
        error: function () {
            alert("error in fetch data for postcode");
        }
    }); 
}

function fetchPinCode() {
    var cCountry = $('#ddPincodeCountry').val();
    var cState = $('#ddPincodeCounty').val();
    var cCity = $('#ddPincodeCity').val();
    $.ajax({
        url: apiurl + 'api/GetPinCodebyStateCity',
        type: 'POST',
        data: { CountryId: cCountry, StateId: cState, CityId: cCity },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            var obj = response;
            /* datatable */
            var editor = new $.fn.dataTable.Editor({
                table: "#pincoderesult",
                fields: [
                    { label: "CountryName", name: "CountryName" },
                    { label: "StateName", name: "StateName" },
                    { label: "CityName", name: "CityName" },
                    { label: "PostCode", name: "PostCode" },
                    { label: "sele", name: "sele" }
                 
                ],
            });
            var roletable = $("#pincoderesult");

            var roledata = [];
            roledata = obj;



            roletable.dataTable({
                //dom: "Bfrtip",
                fixedHeader: true,
                data: roledata,
                "bDestroy": true,
                columns: [
                    { data: "CountryName" },
                    { data: "StateName" },
                    { data: "CityName" },
                    { data: "PostCode" },
                    { data: "sele" }
                 
                ],
                "pageLength": 10,
                columnDefs: [{
                    orderable: false,
                    'render': function (data, type, full, meta) {
                        //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                        return '<input type="button" name="btnpinid[]" value="select" onclick=setpincode("' + $('<div/>').text(data).html() + '")>';
                    },
                    targets: 4
                }
                ],
                select: true,
                scrollX: true,
                lengthMenu: [5, 10, 25, 50, 100],
                
            });
            /* datatable */
        },
        error: function () {
            alert("error in data fetch pincode search");
        }
    }); 
}
function getPostCodeDetails(cType) {
    try {
       
        var cpostCode = '';
        var cCityObj, cCountryObj, cStateObj, cPostCodeObj, cPostCodeIdobj;

        if (cType == 'PrimaryAddressPostCode') {
            cCityObj = $('#txtPrimaryAddresstxtCity');    
            cCountryObj = $('#txtPrimaryAddresstxtCountry');
            cStateObj = $('#txtPrimaryAddresstxtCounty');
            cPostCodeObj = $('#txtPrimaryAddressPostCode');
            cPostCodeIdobj = $('#txttPrimaryAddressPostId');

        }
        if (cType == 'InvoiceAddressPostCode') {
            cCityObj = $('#txtInvoiceAddressCity');
            cCountryObj = $('#txtInvoiceAddressCountry');
            cStateObj = $('#txtInvoiceAddressCounty');
            cPostCodeObj = $('#txtInvoiceAddressPostCode');
            cPostCodeIdobj = $('#txtInvoiceAddressPostId');

        }
        if (cType == 'ShippingAddressPostCode') {
            cCityObj = $('#txtShippingCity');
            cCountryObj = $('#txtShippingCountry');
            cStateObj = $('#txtShippingCounty');
            cPostCodeObj = $('#txtShippingAddressPostCode');
            cPostCodeIdobj = $('#txtShippingAddressPostId');

        }
        cpostCode = cPostCodeObj.val();
        cCityObj.val('');
        cCountryObj.val('');
        cStateObj.val('');
        cPostCodeIdobj.val(-1);
     
        if (cpostCode.length > 1) {
            $.ajax({
                url: apiurl + 'api/getPostCodeDetails',
                type: 'POST',
                data: { PostCode: cpostCode },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    console.log(response);
                    //alert(response.length);
                    //alert(response[0].CountryCd);

                    if (response.length > 0) {
                        cCityObj.val(response[0].CityName);
                        cCountryObj.val(response[0].CountryName);
                        cStateObj.val(response[0].StateName);
                        cPostCodeIdobj.val(response[0].addressID);
                    }
                    else {
                        alert('Invalid Post Code!');
                        //$("#txtPostCode").focus();
                        //return true;
                    }


                },
                error: function () {
                    alert("error in fetch data for postcode");
                }
            });
        }


    }
    catch (ex) {

    }
}
function checkcode() {
    var rtn = 0;
    if (manualentry == true) {
        var itemcode = $('#txtBudgetCode').val();
        if (itemcode.indexOf(Prefix) != 0) {
            rtn = 1;

        }
        if (rtn == 0) {
            var psuffix = itemcode.indexOf(Suffix);

            if (psuffix != (itemcode.length - Suffix.length)) {
                rtn = 1;

            }
        }
        if (rtn == 0) {
            if (itemcode.length < Prefix.length + Suffix.length + 2) {
                rtn = 1;

            }
        }
        if (rtn == 0) {
            var str = itemcode.replace(Prefix, '');
            str = str.replace(Suffix, '');

            if ($.isNumeric(str) == false) {
                rtn = 1;
            }
        }
        if (rtn == 0) {
            var str1 = itemcode.replace(Prefix, '');
            str1 = str1.replace(Suffix, '');
            if (StartingNo.toString().length != str1.length) {
                rtn = 1;
            }
        }
        if (rtn == 0) {
            var str2 = itemcode.replace(Prefix, '');
            str2 = str2.replace(Suffix, '');
            str2 = parseInt(str2);
            if (str2 >= StartingNo && str2 <= EndingNo) {
                rtn = 0;
            }
            else {
                rtn = 1;
            }
        }
        //INVXXXX22 - 23
    }
    return rtn;
}
function getBankDetails() {
    var bankId = $("#ddBankcode").val();
    if (bankId > 0) {
        $.ajax({
            url: apiurl + 'api/getBankDetailsbyBankId',
            type: 'POST',
            data: { bankid: bankId },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //console.log(response);
                //alert(response.length);
                //alert(response[0].CountryCd);

                if (response.length > 0) {
                    $("#txtGiro").val(response[0].GiroCd);
                    $("#txtBankname").val(response[0].BankName);
                    $("#txtBankSwift").val(response[0].SwiftCd);
                    $("#txtBankAccount").val(response[0].AcNumber);
                    $("#txtBankIban").val(response[0].IBAN);
                    $("#txtBankBranch").val(response[0].BranchName);
                }
                else {
                    alert('Invalid Bank Code!');
                    //$("#txtPostCode").focus();
                    //return true;
                }


            },
            error: function () {
                alert("error in fetch data for postcode");
            }
        });
    }
}
function populatePeriodDropdown() {
    var ctype = 'period';
    
    $.ajax({
        url: apiurl + 'api/GetMasterForBudgetTransfer',
        type: 'POST',
        data: { CoCd: $("#ddlCompany").val(), BudgetRegisterRowId: BudgetReviseHistoryOverviewObject.rowid, ctype: ctype },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            
            if (ctype == 'period') {
                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].PeriodAlloBasis1 + "</option>"
                    );
                }

                $("#ddPeriod").html(_html.join(""));
                $("#ddPeriod").html(_html.join(""));
                showmodalrevise();
            }

         





        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function reftype() {
    var tt = $("#ddRevType").val();
    $('#ddPeriod').prop("disabled", true);
    if (tt == 2) {
        $('#ddPeriod').prop("disabled", false);
    }
}
function revisesave() {

    var RowId, amt, ctype, period;

    RowId = BudgetReviseHistoryOverviewObject.rowid;
    amt = $("#txtreviseAmt").val();
    ctype = $("#ddRevType").val();
    period = $("#ddPeriod").val();
    if (amt < 1) {
        validate = false;
        gotfocus($("#txtreviseAmt"));
        $.alertable.alert(`Amount required.`);
        //$("#txtName").focus();
        return false;
    }
    if (ctype == 2 && period < 1) {
        validate = false;
        gotfocus($("#ddPeriod"));
        $.alertable.alert(`Period required.`);
        //$("#txtName").focus();
        return false;
    }
    //alert(RowId);
    //alert(amt);
    //alert(ctype);
    //alert(period);
    $('#btnReviseSave').prop("disabled", true);

    $.ajax({

        url: apiurl + 'api/BudgetRevise',
        type: 'POST',
        data: { RowId: RowId, amt: amt, ctype: ctype, period: period},
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            //alert(response.length);
            //alert(response[0].CountryCd);


            if (response[0].msg == "true") {
                validate = true;
                $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                    window.location = "budget-entry.aspx";
                });
            }
            else {
                $('#btnReviseSave').prop("disabled", false);
                validate = false;
                //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                $.alertable.alert(
                    response[0].msg
                );

                validate = false;
                return false;
            }

        },
        error: function (ex) {
            $('#btnReviseSave').prop("disabled", false);
            alert(ex.responseText);
        }
    });
}



