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
    BudgetRegisterOverviewObject.do_checkcodeentry("GeneralLedger_BudgetRegister");
   //BudgetRegisterOverviewObject.do_populateMasterDropdown();

    
    //BudgetRegisterOverviewObject.do_loaddata();
    BudgetRegisterOverviewObject.do_getUserPagepermission();
  
    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var BudgetRegisterOverviewObject = {

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
    _balancevariancemenuid : '',
    do_loaddata: () => {
        var CoCd, BudCd, BudName, BudSetupId, BudStDt, BudEndDt, IsBlock, IsClosed, DtOfCreation, IsRevised, Approved, ApprovedBy, created_by, creator_MAC_add;
    
        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();

        IsBlock = 0;
        IsClosed = 0;
        BudCd = '';
        BudName = '';
        BudSetupId = -1;
        BudStDt = '01-01-1900';
        BudEndDt = '01-01-1900';
        DtOfCreation = '01-01-1900';
        IsRevised = 0;
        Approved = 0;
        ApprovedBy = '';

        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),

            $.ajax({
                url: apiurl + 'api/GeneralLedgerBudgetRegisterOperation',
                type: 'POST',
                data: { mode: "getlist", RowId: -1, CoCd: CoCd, created_by: created_by, creator_MAC_add: creator_MAC_add, BudCd: BudCd, BudName: BudName, BudSetupId: BudSetupId, BudStDt: BudStDt, BudEndDt: BudEndDt, IsBlock: IsBlock, IsClosed: IsClosed, DtOfCreation: DtOfCreation, IsRevised: IsRevised, Approved: Approved, ApprovedBy: ApprovedBy, created_by: created_by, creator_MAC_add: creator_MAC_add },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                  
                    BudgetRegisterOverviewObject.do_populateData(obj);
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
                { label: "BudCd", name: "BudCd" },
                { label: "BudName", name: "BudName" },
                { label: "GS_ModelName", name: "GS_ModelName" },
                { label: "BudGrpDesc", name: "BudGrpDesc" },
                { label: "GS_PeriodAlloBasis", name: "GS_PeriodAlloBasis" },
                { label: "AlloName", name: "AlloName" },
                { label: "Admin_ThresholdLimit", name: "Admin_ThresholdLimit" },
                { label: "Admin_ThresholdWarning", name: "Admin_ThresholdWarning" },
                { label: "Admin_OverbudgetingPolicy", name: "Admin_OverbudgetingPolicy" },
                { label: "Admin_RevisionPolicy", name: "Admin_RevisionPolicy" },
                { label: "BudStDt", name: "BudStDt" },
                { label: "BudEndDt", name: "BudEndDt" },
                { label: "DtOfCreation", name: "DtOfCreation" },
                { label: "IsClosed", name: "IsClosed" },
                { label: "IsBlock", name: "IsBlock" },
                { label: "IsRevised", name: "IsRevised" },
                { label: "LastRevisedDt", name: "LastRevisedDt" },
                { label: "Approved", name: "Approved" },
                { label: "ApprovedBy", name: "ApprovedBy" }
                
              
            ],
        });
        var roletable = $("#addressbook");

        var roledata = [];
        roledata = obj;

        

        roletable.dataTable({
            //dom: "Bfrtip",
            dom: "lBfrtip",
            //fixedHeader: true,
            "pageLength": 10,
            data: roledata,
            columnDefs: [{
                orderable: false,
                'render': function (data, type, full, meta) {
                    //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                    return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                },
                targets: 13
            },
            {
                orderable: false,
                'render': function (data, type, full, meta) {
                    //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                    return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                },
                targets: 14
            }
                ,
                {
                    orderable: false,
                    'render': function (data, type, full, meta) {
                        //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                        return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                    },
                    targets: 15
                }
                ,
                {
                    orderable: false,
                    'render': function (data, type, full, meta) {
                        //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                        return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                    },
                    targets: 17
                }
            ]
            ,
            columns: [
                { data: "BudCd" },
                { data: "BudName" },
                { data: "GS_ModelName" },
                { data: "BudGrpDesc" },
                { data: "GS_PeriodAlloBasis" },
                { data: "AlloName" },
                { data: "Admin_ThresholdLimit" },
                { data: "Admin_ThresholdWarning" },
                { data: "Admin_OverbudgetingPolicy" },
                { data: "Admin_RevisionPolicy" },
                { data: "BudStDt" },
                { data: "BudEndDt" },
                { data: "DtOfCreation" },
                { data: "IsClosed" },
                { data: "IsBlock" },
                { data: "IsRevised" },
                { data: "LastRevisedDt" },
                { data: "Approved" },
                { data: "ApprovedBy" }
               
            ],
         
            select: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: function () { roleaction('-1', 'add'); },
                    attr: {
                        title: 'New',
                        id: 'country_overview_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'country_overview_Edit'
                    },
                },
                {
                    extend: "remove", editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'country_overview_delete'
                    },
                },
                {
                    add: "view", text: 'View', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'view'); },
                    attr: {
                        title: 'View',
                        id: 'country_overview_View'
                    }

                },
                {
                    add: "BudgetEntry", text: 'Budget Entry', action: function () { otherWindow($('.selected').attr('rowid'), 'BUDGETENTRY'); },
                    attr: {
                        title: 'Budget Entry',
                        id: 'country_overview_budgetentry'
                    }

                },
                {
                    add: "ViewBudgetEntry", text: 'View Budget Entry', editor: editor, action: function () { otherWindow($('.selected').attr('rowid'), 'BUDGETENTRY'); },
                    attr: {
                        title: 'View Budget Entry',
                        id: 'country_overview_viewbudgetentry'
                    }

                },
                {
                    add: "ViewRivisionHistory", text: 'View Rivision History', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'block'); },
                    attr: {
                        title: 'View Rivision History',
                        id: 'country_overview_ViewRivisionHistory'
                    }

                },
                {
                    add: "BudgetBalanceVariance", text: 'Budget Balance & Variance', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'block'); },
                    attr: {
                        title: 'Budget Balance & Variance',
                        id: 'country_overview_BudgetBalanceVariance'
                    }

                },
                //{
                //    add: "BudgetTransfer", text: 'Budget Transfer', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'block'); },
                //    attr: {
                //        title: 'Budget Transfer',
                //        id: 'country_overview_BudgetTransfer'
                //    }

                //},
                {
                    add: "CopyBudget", text: 'Copy Budget', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'copybudget'); },
                    attr: {
                        title: 'Copy Budget',
                        id: 'country_overview_CopyBudget'
                    }

                },
                {
                    add: "Approve", text: 'Approve', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'approve'); },
                    attr: {
                        title: 'Approve',
                        id: 'country_overview_Approve'
                    }

                },
                {
                    add: "CloseBudget", text: 'Close Budget', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'block'); },
                    attr: {
                        title: 'Close Budget',
                        id: 'country_overview_CloseBudget'
                    }

                },
                {
                    add: "Block", text: 'Block', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'block'); },
                    attr: {
                        title: 'Block',
                        id: 'country_overview_Block'
                    }

                }
                
              
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
               
                if (!BudgetRegisterOverviewObject._deleteperm[0]) {
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


        if (!BudgetRegisterOverviewObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!BudgetRegisterOverviewObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        
        if (!BudgetRegisterOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
     
        if (!BudgetRegisterOverviewObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
        if (!BudgetRegisterOverviewObject._budgetentrycreateperm[0]) {
            $('#country_overview_budgetentry').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_budgetentry').prop("disabled", true);
            $('#country_overview_budgetentry').attr('title', 'do not have permission to view !!!');
            table.button(4).action(function () {
                this.active(false);
            });
        }
        if (!BudgetRegisterOverviewObject._budgetentryvieweperm[0]) {
            $('#country_overview_viewbudgetentry').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_viewbudgetentry').prop("disabled", true);
            $('#country_overview_viewbudgetentry').attr('title', 'do not have permission to view !!!');
            table.button(5).action(function () {
                this.active(false);
            });
        }
        if (!BudgetRegisterOverviewObject.revisionentryvieweperm[0]) {
            $('#country_overview_ViewRivisionHistory').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_ViewRivisionHistory').prop("disabled", true);
            $('#country_overview_ViewRivisionHistory').attr('title', 'do not have permission to view !!!');
            table.button(6).action(function () {
                this.active(false);
            });
        }
        if (!BudgetRegisterOverviewObject.balancevariancevieweperm[0]) {
            $('#country_overview_BudgetBalanceVariance').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_BudgetBalanceVariance').prop("disabled", true);
            $('#country_overview_BudgetBalanceVariance').attr('title', 'do not have permission to view !!!');
            table.button(7).action(function () {
                this.active(false);
            });
        }

    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(BudgetRegisterOverviewObject);
        
        BudgetRegisterOverviewObject._vieweperm = MainObject.do_IsActionMenuPermission(BudgetRegisterOverviewObject.access, 'BUDGET', 'view');
        BudgetRegisterOverviewObject._createperm = MainObject.do_IsActionMenuPermission(BudgetRegisterOverviewObject.access, 'BUDGET', 'create');
        BudgetRegisterOverviewObject._editperm = MainObject.do_IsActionMenuPermission(BudgetRegisterOverviewObject.access, 'BUDGET', 'edit');
        BudgetRegisterOverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(BudgetRegisterOverviewObject.access, 'BUDGET', 'delete');

        BudgetRegisterOverviewObject._budgetentrycreateperm = MainObject.do_IsActionMenuPermission(BudgetRegisterOverviewObject.access, 'BUDGET ENTRY', 'view');
        BudgetRegisterOverviewObject._budgetentrymenuid = MainObject.do_IsActionMenuPermission(BudgetRegisterOverviewObject.access, 'BUDGET ENTRY', 'menuid');
        BudgetRegisterOverviewObject._budgetentryvieweperm = MainObject.do_IsActionMenuPermission(BudgetRegisterOverviewObject.access, 'VIEW BUDGET ENTRY', 'view');
        BudgetRegisterOverviewObject._viewbudgetentrymenuid = MainObject.do_IsActionMenuPermission(BudgetRegisterOverviewObject.access, 'VIEW BUDGET ENTRY', 'menuid');

        BudgetRegisterOverviewObject.revisionentryvieweperm = MainObject.do_IsActionMenuPermission(BudgetRegisterOverviewObject.access, 'VIEW REVISION HISTORY', 'view');
        BudgetRegisterOverviewObject._revisionmenuid = MainObject.do_IsActionMenuPermission(BudgetRegisterOverviewObject.access, 'VIEW REVISION HISTORY', 'menuid');
        BudgetRegisterOverviewObject.balancevariancevieweperm = MainObject.do_IsActionMenuPermission(BudgetRegisterOverviewObject.access, 'BUDGET BALANCE & VARIANCE', 'view');
        BudgetRegisterOverviewObject._balancevariancemenuid = MainObject.do_IsActionMenuPermission(BudgetRegisterOverviewObject.access, 'BUDGET BALANCE & VARIANCE', 'menuid');

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
                BudgetRegisterOverviewObject.do_populateMasterDropdown();

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
                BudgetRegisterOverviewObject.do_loaddata();
                
              

                
               
            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    },
    do_updateblockstop: (id,ctype) => {
        var CoCd, BudCd, BudName, BudSetupId, BudStDt, BudEndDt, IsBlock, IsClosed, DtOfCreation, IsRevised, Approved, ApprovedBy, created_by, creator_MAC_add;
        var p_mode='';
    
        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();

        IsBlock = 0;
        IsClosed = 0;
        BudCd = '';
        BudName = '';
        BudSetupId = -1;
        BudStDt = '01-01-1900';
        BudEndDt = '01-01-1900';
        DtOfCreation = '01-01-1900';
        IsRevised = 0;
        Approved = 0;
        ApprovedBy = '';
        

        $.ajax({


            url: apiurl + 'api/GeneralLedgerBudgetRegisterOperation',
            type: 'POST',
            data: { mode: ctype, RowId: id, CoCd: CoCd, created_by: created_by, creator_MAC_add: creator_MAC_add, BudCd: BudCd, BudName: BudName, BudSetupId: BudSetupId, BudStDt: BudStDt, BudEndDt: BudEndDt, IsBlock: IsBlock, IsClosed: IsClosed, DtOfCreation: DtOfCreation, IsRevised: IsRevised, Approved: Approved, ApprovedBy: ApprovedBy, created_by: created_by, creator_MAC_add: creator_MAC_add },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "budget-register-overview.aspx";
                    });
                }
                else {
                    alert(response[0].msg);
                }

            },
            error: function (err) {

                alert(err.responseText);
            }
        });


    },
    do_loaddataedit: (id) => {
        var CoCd, BudCd, BudName, BudSetupId, BudStDt, BudEndDt, IsBlock, IsClosed, DtOfCreation, IsRevised, Approved, ApprovedBy, created_by, creator_MAC_add;
        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();

        IsBlock = 0;
        IsClosed = 0;
        BudCd = '';
        BudName = '';
        BudSetupId = -1;
        BudStDt = '01-01-1900';
        BudEndDt = '01-01-1900';
        DtOfCreation = '01-01-1900';
        IsRevised = 0;
        Approved = 0;
        ApprovedBy = '';

        $.ajax({

            url: apiurl + 'api/GeneralLedgerBudgetRegisterOperation',
            type: 'POST',
            data: { mode: "edit", RowId: id, CoCd: CoCd, created_by: created_by, creator_MAC_add: creator_MAC_add, BudCd: BudCd, BudName: BudName, BudSetupId: BudSetupId, BudStDt: BudStDt, BudEndDt: BudEndDt, IsBlock: IsBlock, IsClosed: IsClosed, DtOfCreation: DtOfCreation, IsRevised: IsRevised, Approved: Approved, ApprovedBy: ApprovedBy, created_by: created_by, creator_MAC_add: creator_MAC_add },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {

                
                
                BudgetRegisterOverviewObject.rowid = response[0].RowId;
                $("#txtBudgetCode").val(response[0].BudCd);
                $("#txtBudgetDesc").val(response[0].BudName);
                
                $('#txtStartDT').val(response[0].BudStDt.slice(0, 10));
                $('#txtEndDT').val(response[0].BudEndDt.slice(0, 10));
                //$("#txtStartDT").val(response[0].BudStDt);
                $("#ddBudgetModel").val(response[0].BudSetupId);
                $("#txtLedgerGroup").val(response[0].BudGrpDesc);
                $("#txtPeriod").val(response[0].GS_PeriodAlloBasis);
                $('#txtCreationDt').val(response[0].DtOfCreation.slice(0, 10));
                $("#txtAllocation").val(response[0].AlloName);

                $("#txtThreshold").val(response[0].Admin_ThresholdLimit);
                $("#txtLastRevised").val(response[0].LastRevisedDt);
                $("#txtwarning").val(response[0].Admin_ThresholdWarning);
                $("#txtPolicy").val(response[0].Admin_OverbudgetingPolicy);
                $("#txtRevisionPolicy").val(response[0].Admin_RevisionPolicy);
                $("#txtApproveBy").val(response[0].ApprovedBy);
                
                
                
                if (response[0].IsClosed == true) {
                    $("#chkClose").prop('checked', true);
                }
                else {
                    $("#chkClose").prop('checked', false);
                }
               
                if (response[0].IsBlock == true) {
                    $("#chkBlock").prop('checked', true);
                }
                else {
                    $("#chkBlock").prop('checked', false);
                }
                if (response[0].IsRevised == true) {
                    $("#chkRevised").prop('checked', true);
                }
                else {
                    $("#chkRevised").prop('checked', false);
                }
                if (response[0].Approved == true) {
                    $("#chkApprove").prop('checked', true);
                }
                else {
                    $("#chkApprove").prop('checked', false);
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
                data: { p_mode: "getlist", LocationCd: '', CoCd: $("#ddlCompany").val(), LocationDesc: '', WhId: BudgetRegisterOverviewObject.rowid, AisleNo: -1, RackNo: -1, SelfNo: -1, BinNo: "-1", created_by: $("#txt").val(), RowId: -1 },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    BudgetRegisterOverviewObject.do_loadwarehouselocationData(obj);
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
var savedataCopy = function () {
    if (manualentry == true && $('#txtCopyBudgetCode').val().length < 1) {
        validate = false;
        $.alertable.alert(`Budget Code required.`);
        $("#txtCopyBudgetCode").focus();
        return false;
    }
    else if (checkcode() != 0) {
        validate = false;
        $.alertable.alert(`Budget Code format mismatch / Invalid range.`);
        $("#txtCopyBudgetCode").focus();
        return false;
    }
    else if ($('#txtCopyBudgetDesc').val().length < 1) {
        validate = false;
        gotfocus($("#txtCopyBudgetDesc"));
        $.alertable.alert(`Budget Description required.`);
        //$("#txtName").focus();
        return false;
    }
    else if ($('#txtCopyStartDate').val().length < 3) {
        validate = false;
        gotfocus($("#txtCopyStartDate"));
        $.alertable.alert(`Starting date required.`);
        //$("#txtName").focus();
        return false;
    }
    else if ($('#txtCopyEndDate').val().length < 3) {
        validate = false;
        gotfocus($("#txtCopyEndDate"));
        $.alertable.alert(`Ending date required.`);
        //$("#txtName").focus();
        return false;
    }
    else {
        $('#btnSaveCopy').prop("disabled", true);
        var CoCd, BudCd, BudName, BudStDt, BudEndDt, copydimension, copyperiod, created_by, creator_MAC_add;
        copyperiod = 0;
        copydimension = 0;
        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
        BudCd = $("#txtCopyBudgetCode").val();
        BudName = $("#txtCopyBudgetDesc").val();
        BudStDt = $("#txtCopyStartDate").val();
        BudEndDt = $("#txtCopyEndDate").val();
        if ($('#chkCopyPeriod').is(':checked')) {
            copyperiod = 1;
        }

        if ($('#chkCopyDimension').is(':checked')) {
            copydimension = 1;
        }

       
       
        $.ajax({
            url: apiurl + 'api/GeneralLedgerBudgetCopy',
            type: 'POST',
            data: { RowId: parseInt(BudgetRegisterOverviewObject.rowid), CoCd: CoCd, created_by: created_by, creator_MAC_add: creator_MAC_add, BudCd: BudCd, BudName: BudName, BudStDt: BudStDt, BudEndDt: BudEndDt, copydimension: copydimension, copyperiod: copyperiod},

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                console.log(response);
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "budget-register-overview.aspx";
                    });
                }
                else {
                    $('#btnSaveCopy').prop("disabled", false);
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
                $('#btnSaveCopy').prop("disabled", false);
               
                alert(ex.responseText);
            }
        });
     




    }
}
var savedata = function () {
    var validate = true;
    //
    
    if (manualentry == true && $('#txtBudgetCode').val().length < 1) {
        validate = false;
        $.alertable.alert(`Budget Code required.`);
        $("#txtBudgetCode").focus();
        return false;
    }
    else if (checkcode() != 0) {
        validate = false;
        $.alertable.alert(`Budget Code format mismatch / Invalid range.`);
        $("#txtBudgetCode").focus();
        return false;
    }
    else if ($('#txtBudgetDesc').val().length < 1) {
        validate = false;
        gotfocus($("#txtBudgetDesc"));
        $.alertable.alert(`Budget Description required.`);
        //$("#txtName").focus();
        return false;
    }
    else if ($('#ddBudgetModel').val() < 1) {
        validate = false;
        gotfocus($("#ddBudgetModel"));
        $.alertable.alert(`Budget Setup Model Name required.`);
        //$("#txtName").focus();
        return false;
    }
    else if ($('#txtStartDT').val().length < 3) {
        validate = false;
        gotfocus($("#txtStartDT"));
        $.alertable.alert(`Starting date required.`);
        //$("#txtName").focus();
        return false;
    }
    else if ($('#txtEndDT').val().length < 3) {
        validate = false;
        gotfocus($("#txtEndDT"));
        $.alertable.alert(`Ending date required.`);
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
    var CoCd, BudCd, BudName, BudSetupId, BudStDt, BudEndDt, IsBlock, IsClosed, DtOfCreation, IsRevised, Approved, ApprovedBy, created_by, creator_MAC_add;


    creator_MAC_add = ipaddress;
    created_by = $("#txt").val();
    CoCd = $("#ddlCompany").val();
    
    IsBlock = 0;
    IsClosed = 0;
    BudCd = '';
    BudName = '';
    BudSetupId = -1;
    BudStDt = '01-01-1900';
    BudEndDt = '01-01-1900';
    DtOfCreation = '01-01-1900';
    IsRevised = 0;
    Approved = 0;
    ApprovedBy = '';

    BudCd = $("#txtBudgetCode").val();
    BudName = $("#txtBudgetDesc").val();
    BudSetupId = $("#ddBudgetModel").val();
    BudStDt = $("#txtStartDT").val();
    BudEndDt = $("#txtEndDT").val();

    if ($('#chkBlock').is(':checked')) {
        IsBlock = 1;
    }
    
    if ($('#chkClose').is(':checked')) {
        IsClosed = 1;
    }
   
    if ($('#chkRevised').is(':checked')) {
        IsRevised = 1;
    }
    if ($('#chkApprove').is(':checked')) {
        Approved = 1;
    }

  
   
    if (parseInt(BudgetRegisterOverviewObject.rowid) > 0) {
        $.ajax({

            url: apiurl + 'api/GeneralLedgerBudgetRegisterOperation',
            type: 'POST',
            data: { mode: "update", RowId: parseInt(BudgetRegisterOverviewObject.rowid), CoCd: CoCd, created_by: created_by, creator_MAC_add: creator_MAC_add, BudCd: BudCd, BudName: BudName, BudSetupId: BudSetupId, BudStDt: BudStDt, BudEndDt: BudEndDt, IsBlock: IsBlock, IsClosed: IsClosed, DtOfCreation: DtOfCreation, IsRevised: IsRevised, Approved: Approved, ApprovedBy: ApprovedBy, created_by: created_by, creator_MAC_add: creator_MAC_add },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);


                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "budget-register-overview.aspx";
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
            url: apiurl + 'api/GeneralLedgerBudgetRegisterOperation',
            type: 'POST',
            data: { mode: "create", RowId: -1, CoCd: CoCd, created_by: created_by, creator_MAC_add: creator_MAC_add, BudCd: BudCd, BudName: BudName, BudSetupId: BudSetupId, BudStDt: BudStDt, BudEndDt: BudEndDt, IsBlock: IsBlock, IsClosed: IsClosed, DtOfCreation: DtOfCreation, IsRevised: IsRevised, Approved: Approved, ApprovedBy: ApprovedBy, created_by: created_by, creator_MAC_add: creator_MAC_add },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);
                console.log(response);
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "budget-register-overview.aspx";
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
  
    localStorage.budgetregisteroverviewrowid = countryCd;
    //$('#addressbook').DataTable().rows('.selected').data()[0].AddressCode
    if (localStorage.budgetregisteroverviewrowid) {
        if (mode == "BUDGETENTRY") {


            localStorage.clickedmenu_id = BudgetRegisterOverviewObject._budgetentrymenuid[1];
            localStorage.menu_id_premission = BudgetRegisterOverviewObject._budgetentrymenuid[1];
            localStorage.budgetentry_menuid_permission = BudgetRegisterOverviewObject._budgetentrymenuid[1];

            localStorage.GS_PeriodAlloBasis = $('#addressbook').DataTable().rows('.selected').data()[0].GS_PeriodAlloBasis;
            localStorage.budgetregisteroverviewcode = $('#addressbook').DataTable().rows('.selected').data()[0].BudCd;
            localStorage.budgetregisteroverviewdesc = $('#addressbook').DataTable().rows('.selected').data()[0].BudName;
            localStorage.budgetregisteroverviewStDt = $('#addressbook').DataTable().rows('.selected').data()[0].BudStDt;
            localStorage.budgetregisteroverviewEndDt = $('#addressbook').DataTable().rows('.selected').data()[0].BudEndDt;
            //localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemType;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(BudgetRegisterOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + BudgetRegisterOverviewObject._addressdetailsmenuid[1];
            location.href = 'budget-entry.aspx';
            
        }
        
    }
    
}

var datablank = function () {
    companylogo = "";
    contentType = "";
    $("#txtBudgetCode").val('');
    $("#txtBudgetDesc").val('');

    $('#txtStartDT').val('');
    $('#txtEndDT').val('');
    //$("#txtStartDT").val(response[0].BudStDt);
    $("#ddBudgetModel").val(-1);
    $("#txtLedgerGroup").val('');
    $("#txtPeriod").val('');
    $('#txtCreationDt').val('');
    $("#txtAllocation").val('');

    $("#txtThreshold").val('');
    $("#txtLastRevised").val('');
    $("#txtwarning").val('');
    $("#txtPolicy").val('');
    $("#txtRevisionPolicy").val('');
    $("#chkClose").prop('checked', false);
    $("#chkBlock").prop('checked', false);
    $("#chkRevised").prop('checked', false);
    $("#chkApprove").prop('checked', false);
    $("#txtApproveBy").val('');

   
}
var roleaction = function (rowId, mode) {
    
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);
  
    if (mode == "viewlocation") {
        BudgetRegisterOverviewObject.rowid = rowId;
        showmodalview();

    }
    if (mode == 'add') {
        companylogo = "";
        BudgetRegisterOverviewObject.rowid = '-1';
        if (manualentry == true) {
            $('#txtBudgetCode').attr("disabled", false);
        }
        if (manualentry == false) {
            $('#txtBudgetCode').attr("disabled", true);
        }
        showmodal();
        $('.modal-title').html('Budget Register Overview - New');

        datablank();
        $('#btnSave').text('Save');
        $('#btnSave').show();
        //$('.readOnly').attr("disabled", false);
       
        //$('#txtCode').prop("disabled", false);

    }
    if (mode == 'copybudget') {
        //$('.modal-title').html('Copy Budget');
        BudgetRegisterOverviewObject.rowid = rowId;
        if (manualentry == true) {
            $('#txtCopyBudgetCode').attr("disabled", false);
        }
        if (manualentry == false) {
            $('#txtCopyBudgetCode').attr("disabled", true);
        }
        showmodalcopy();
    }
    if (mode == 'edit') {
        showmodal();
        
        $('.modal-title').html('Budget Register Overview - Edit');
        $('#cbBlock').show();
        datablank();
        if (!BudgetRegisterOverviewObject._deleteperm[0]) {
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

        BudgetRegisterOverviewObject.rowid = rowId;
        BudgetRegisterOverviewObject.do_loaddataedit(rowId);
        
    }
    else if(mode == 'view') {
        showmodal();
        datablank();
        $('.modal-title').html('Budget Register Overview - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!BudgetRegisterOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!BudgetRegisterOverviewObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        BudgetRegisterOverviewObject.rowid = rowId;
        BudgetRegisterOverviewObject.do_loaddataedit(rowId);
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
                    //            window.location = "budget-register-overview.aspx";
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
                    BudgetRegisterOverviewObject.do_updateblockstop(rowId,'block');

                },
            );
    }
    else if (mode == 'approve') {
        $.alertable.custconfirm(`Are you want to approve the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    BudgetRegisterOverviewObject.do_updateblockstop(rowId,'approve');

                },
            );
    }
    else if (mode == 'stop') {
        $.alertable.custconfirm(`Are you want to stop the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    BudgetRegisterOverviewObject.do_updateblockstop(rowId,'stop');

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
    BudgetRegisterOverviewObject.do_populateLocationDropdown('STATE', $('#ddPincodeCountry').val(), $('#ddPincodeCounty'));
}
function PopulateCity() {
    BudgetRegisterOverviewObject.do_populateLocationDropdown('CITY', $('#ddPincodeCounty').val(), $('#ddPincodeCity'));
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
function checkcodeCopy() {
    var rtn = 0;
    if (manualentry == true) {
        var itemcode = $('#txtCopyBudgetCode').val();
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






