var ipaddress = "";
var objVendor;
var objBUDGETGROUP;
var objBUDGETALLOCATIONGROUP;
var companylogo="";
var contentType="";
var imgfileName="";
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
   BudgetSetupOverviewObject.do_populateMasterDropdown('BUDGETGROUP');

    
    //BudgetSetupOverviewObject.do_loaddata();
    BudgetSetupOverviewObject.do_getUserPagepermission();
  
    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var BudgetSetupOverviewObject = {

    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _stopperm: '',
    _blockperm : '',
    do_loaddata: () => {
        var created_by, creator_MAC_add,  CoCd, GS_ModelCd, GS_BudGrpId, GS_ModelName,GS_PeriodAlloBasis,GS_AlloId,GS_IsStop,GS_IsBlock,RP_ConfPurchReq,RP_ConfPurchOrder,
        RP_ConfPurchInv,RP_ConfExpnsJrnl,RP_ConfFAJrnl,RP_ConfPayJrnl,Admin_ThresholdLimit,Admin_ThresholdWarning,Admin_OverbudgetingPolicy,Admin_RevisionPolicy; 
    
    
        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
        GS_ModelCd='';
        GS_BudGrpId=-1;
        GS_ModelName='';
        GS_PeriodAlloBasis=-1;
        GS_AlloId=-1;
        GS_IsStop=0;
        
        GS_IsBlock=0;
       
        RP_ConfPurchReq=0;
        
        RP_ConfPurchOrder=0;
       
        RP_ConfPurchInv=0;
        
        RP_ConfExpnsJrnl=0;
       
        RP_ConfFAJrnl=0;
        
        RP_ConfPayJrnl=0;
        
        Admin_ThresholdLimit=0;
        Admin_ThresholdWarning=0;
        
        Admin_OverbudgetingPolicy=0;
        Admin_RevisionPolicy=0;

        
      


        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),

            $.ajax({
                url: apiurl + 'api/GeneralLedgerBudgetSetupOperation',
                type: 'POST',
                data: { p_mode: "getlist", RowId: -1, CoCd: CoCd, created_by: created_by, creater_MAC_add: creator_MAC_add ,GS_ModelCd : GS_ModelCd,GS_BudGrpId : GS_BudGrpId,GS_ModelName : GS_ModelName,GS_PeriodAlloBasis : GS_PeriodAlloBasis,GS_AlloId : GS_AlloId,GS_IsStop : GS_IsStop,GS_IsBlock : GS_IsBlock,RP_ConfPurchReq : RP_ConfPurchReq,RP_ConfPurchOrder : RP_ConfPurchOrder,RP_ConfPurchInv : RP_ConfPurchInv,RP_ConfExpnsJrnl : RP_ConfExpnsJrnl,RP_ConfFAJrnl : RP_ConfFAJrnl,RP_ConfPayJrnl : RP_ConfPayJrnl,Admin_ThresholdLimit : Admin_ThresholdLimit,Admin_ThresholdWarning : Admin_ThresholdWarning,Admin_OverbudgetingPolicy : Admin_OverbudgetingPolicy,Admin_RevisionPolicy : Admin_RevisionPolicy},
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                  
                    BudgetSetupOverviewObject.do_populateData(obj);
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
                { label: "GS_ModelCd", name: "GS_ModelCd" },
                { label: "GS_ModelName", name: "GS_ModelName" },
                { label: "BudGrpDesc", name: "BudGrpDesc" },
                { label: "GS_PeriodAlloBasis", name: "GS_PeriodAlloBasis" },
                { label: "AlloName", name: "AlloName" },
                { label: "Admin_ThresholdLimit", name: "Admin_ThresholdLimit" },
                { label: "Admin_ThresholdWarning", name: "Admin_ThresholdWarning" },
                { label: "Admin_OverbudgetingPolicy", name: "Admin_OverbudgetingPolicy" },
                { label: "Admin_RevisionPolicy", name: "Admin_RevisionPolicy" },
                { label: "GS_IsStop", name: "GS_IsStop" },
                { label: "GS_IsBlock", name: "GS_IsBlock" }
                
              
            ],
        });
        var roletable = $("#addressbook");

        var roledata = [];
        roledata = obj;

        

        roletable.dataTable({
            //dom: "Bfrtip",
            dom: "lBfrtip",
            fixedHeader: true,
            "pageLength": 10,
            data: roledata,
            columnDefs: [{
                orderable: false,
                'render': function (data, type, full, meta) {
                    //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                    return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                },
                targets: 9
            },
            {
                orderable: false,
                'render': function (data, type, full, meta) {
                    //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                    return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                },
                targets: 10
            }

            ],
            columns: [
                { data: "GS_ModelCd" },
                { data: "GS_ModelName" },
                { data: "BudGrpDesc" },
                { data: "GS_PeriodAlloBasis" },
                { data: "AlloName" },
                { data: "Admin_ThresholdLimit" },
                { data: "Admin_ThresholdWarning" },
                { data: "Admin_OverbudgetingPolicy" },
                { data: "Admin_RevisionPolicy" },
                { data: "GS_IsStop" },
                { data: "GS_IsBlock" }
               
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
                    add: "stop", text: 'stop', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'stop'); },
                    attr: {
                        title: 'stop',
                        id: 'country_overview_stop'
                    }

                },
                {
                    add: "block", text: 'block', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'block'); },
                    attr: {
                        title: 'block',
                        id: 'country_overview_block'
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
               
                if (!BudgetSetupOverviewObject._deleteperm[0]) {
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


        if (!BudgetSetupOverviewObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!BudgetSetupOverviewObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        
        if (!BudgetSetupOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
     
        if (!BudgetSetupOverviewObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
       

    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(BudgetSetupOverviewObject);
        
        BudgetSetupOverviewObject._vieweperm = MainObject.do_IsActionMenuPermission(BudgetSetupOverviewObject.access, 'BUDGET SETUP OVERVIEW', 'view');
        BudgetSetupOverviewObject._createperm = MainObject.do_IsActionMenuPermission(BudgetSetupOverviewObject.access, 'BUDGET SETUP OVERVIEW', 'create');
        BudgetSetupOverviewObject._editperm = MainObject.do_IsActionMenuPermission(BudgetSetupOverviewObject.access, 'BUDGET SETUP OVERVIEW', 'edit');
        BudgetSetupOverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(BudgetSetupOverviewObject.access, 'BUDGET SETUP OVERVIEW', 'delete');
        BudgetSetupOverviewObject._stopperm = MainObject.do_IsActionMenuPermission(BudgetSetupOverviewObject.access, 'BUDGET SETUP OVERVIEW', 'stop');
        BudgetSetupOverviewObject._blockperm = MainObject.do_IsActionMenuPermission(BudgetSetupOverviewObject.access, 'BUDGET SETUP OVERVIEW', 'block');

    },
  
    do_populateMasterDropdown: (ctype) => {
        
        $.ajax({
            url: apiurl + 'api/getMasterforGeneralLedgerBudgetSetup',
            type: 'POST',
            data: { CoCd: $("#ddlCompany").val(),ctype : ctype },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
               
                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].cid + "'>" + response[i].ccode + "</option>"
                    );
                }
                if (ctype == 'BUDGETGROUP'){
                    objBUDGETGROUP=response;
                    $("#ddAccGrp").html(_html.join("")); 
                    BudgetSetupOverviewObject.do_populateMasterDropdown('BUDGETALLOCATIONGROUP');
                }
                if (ctype == 'BUDGETALLOCATIONGROUP'){
                    objBUDGETALLOCATIONGROUP=response;
                    $("#ddAllocation").html(_html.join("")); 
                    BudgetSetupOverviewObject.do_loaddata();
                }
                
                
              

                
               
            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    },
    do_updateblockstop: (id,ctype) => {
        var created_by, creator_MAC_add,  CoCd, GS_ModelCd, GS_BudGrpId, GS_ModelName,GS_PeriodAlloBasis,GS_AlloId,GS_IsStop,GS_IsBlock,RP_ConfPurchReq,RP_ConfPurchOrder,
        RP_ConfPurchInv,RP_ConfExpnsJrnl,RP_ConfFAJrnl,RP_ConfPayJrnl,Admin_ThresholdLimit,Admin_ThresholdWarning,Admin_OverbudgetingPolicy,Admin_RevisionPolicy; 
    
    
        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
        GS_ModelCd='';
        GS_BudGrpId=-1;
        GS_ModelName='';
        GS_PeriodAlloBasis=-1;
        GS_AlloId=-1;
       
        GS_IsStop=0;
        
        GS_IsBlock=0;
       
        RP_ConfPurchReq=0;
        
        RP_ConfPurchOrder=0;
       
        RP_ConfPurchInv=0;
        
        RP_ConfExpnsJrnl=0;
       
        RP_ConfFAJrnl=0;
        
        RP_ConfPayJrnl=0;
        
        Admin_ThresholdLimit=0;
        Admin_ThresholdWarning=0;
        
        Admin_OverbudgetingPolicy=0;
        Admin_RevisionPolicy=0;
        if (ctype == 'block'){
            GS_IsBlock=1;
        }
        if (ctype == 'stop'){
            GS_IsStop=1;
        }

        $.ajax({


            url: apiurl + 'api/GeneralLedgerBudgetSetupOperation',
            type: 'POST',
            data: { p_mode: ctype, RowId: id, CoCd: CoCd, created_by: created_by, creater_MAC_add: creator_MAC_add ,GS_ModelCd : GS_ModelCd,GS_BudGrpId : GS_BudGrpId,GS_ModelName : GS_ModelName,GS_PeriodAlloBasis : GS_PeriodAlloBasis,GS_AlloId : GS_AlloId,GS_IsStop : GS_IsStop,GS_IsBlock : GS_IsBlock,RP_ConfPurchReq : RP_ConfPurchReq,RP_ConfPurchOrder : RP_ConfPurchOrder,RP_ConfPurchInv : RP_ConfPurchInv,RP_ConfExpnsJrnl : RP_ConfExpnsJrnl,RP_ConfFAJrnl : RP_ConfFAJrnl,RP_ConfPayJrnl : RP_ConfPayJrnl,Admin_ThresholdLimit : Admin_ThresholdLimit,Admin_ThresholdWarning : Admin_ThresholdWarning,Admin_OverbudgetingPolicy : Admin_OverbudgetingPolicy,Admin_RevisionPolicy : Admin_RevisionPolicy},

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "budget-setup-overview.aspx";
                    });
                }

            },
            error: function (err) {

                alert(err.responseText);
            }
        });


    },
    do_loaddataedit: (id) => {
        var created_by, creator_MAC_add,  CoCd, GS_ModelCd, GS_BudGrpId, GS_ModelName,GS_PeriodAlloBasis,GS_AlloId,GS_IsStop,GS_IsBlock,RP_ConfPurchReq,RP_ConfPurchOrder,
        RP_ConfPurchInv,RP_ConfExpnsJrnl,RP_ConfFAJrnl,RP_ConfPayJrnl,Admin_ThresholdLimit,Admin_ThresholdWarning,Admin_OverbudgetingPolicy,Admin_RevisionPolicy; 
    
    
        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
        GS_ModelCd='';
        GS_BudGrpId=-1;
        GS_ModelName='';
        GS_PeriodAlloBasis=-1;
        GS_AlloId=-1;
        GS_IsStop=0;
        
        GS_IsBlock=0;
       
        RP_ConfPurchReq=0;
        
        RP_ConfPurchOrder=0;
       
        RP_ConfPurchInv=0;
        
        RP_ConfExpnsJrnl=0;
       
        RP_ConfFAJrnl=0;
        
        RP_ConfPayJrnl=0;
        
        Admin_ThresholdLimit=0;
        Admin_ThresholdWarning=0;
        
        Admin_OverbudgetingPolicy=0;
        Admin_RevisionPolicy=0;

        $.ajax({


            url: apiurl + 'api/GeneralLedgerBudgetSetupOperation',
            type: 'POST',
            data: { p_mode: "edit", RowId: id, CoCd: CoCd, created_by: created_by, creater_MAC_add: creator_MAC_add ,GS_ModelCd : GS_ModelCd,GS_BudGrpId : GS_BudGrpId,GS_ModelName : GS_ModelName,GS_PeriodAlloBasis : GS_PeriodAlloBasis,GS_AlloId : GS_AlloId,GS_IsStop : GS_IsStop,GS_IsBlock : GS_IsBlock,RP_ConfPurchReq : RP_ConfPurchReq,RP_ConfPurchOrder : RP_ConfPurchOrder,RP_ConfPurchInv : RP_ConfPurchInv,RP_ConfExpnsJrnl : RP_ConfExpnsJrnl,RP_ConfFAJrnl : RP_ConfFAJrnl,RP_ConfPayJrnl : RP_ConfPayJrnl,Admin_ThresholdLimit : Admin_ThresholdLimit,Admin_ThresholdWarning : Admin_ThresholdWarning,Admin_OverbudgetingPolicy : Admin_OverbudgetingPolicy,Admin_RevisionPolicy : Admin_RevisionPolicy},

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {

                
                
                BudgetSetupOverviewObject.rowid = response[0].RowId;
                $("#txtCode").val(response[0].GS_ModelCd);
                $("#ddAccGrp").val(response[0].GS_BudGrpId);
                $("#txtName").val(response[0].GS_ModelName);
                $("#ddGS_PeriodAlloBasis").val(response[0].GS_PeriodAlloBasis);
                $("#ddAllocation").val(response[0].GS_AlloId);
                $("#ddOverbudgeting").val(response[0].Admin_OverbudgetingPolicy);
                $("#ddRivision").val(response[0].Admin_RevisionPolicy);
                $("#txtThreshold").val(response[0].Admin_ThresholdLimit);
                $("#txtAllocationName").val(response[0].AlloName);
                
                if (response[0].GS_IsStop == true) {
                    $("#chkStop").prop('checked', true);
                }
                else {
                    $("#chkStop").prop('checked', false);
                }
               
                if (response[0].GS_IsBlock == true) {
                    $("#chkBlock").prop('checked', true);
                }
                else {
                    $("#chkBlock").prop('checked', false);
                }
                if (response[0].RP_ConfPurchReq == true) {
                    $("#chkReservation").prop('checked', true);
                }
                else {
                    $("#chkReservation").prop('checked', false);
                }
                if (response[0].RP_ConfPurchOrder == true) {
                    $("#chkReservationPO").prop('checked', true);
                }
                else {
                    $("#chkReservationPO").prop('checked', false);
                }
                if (response[0].RP_ConfPurchInv == true) {
                    $("#chkReservationPI").prop('checked', true);
                }
                else {
                    $("#chkReservationPI").prop('checked', false);
                }
                if (response[0].RP_ConfExpnsJrnl == true) {
                    $("#chkReservationJournal").prop('checked', true);
                }
                else {
                    $("#chkReservationJournal").prop('checked', false);
                }
                if (response[0].RP_ConfFAJrnl == true) {
                    $("#chkReservationFA").prop('checked', true);
                }
                else {
                    $("#chkReservationFA").prop('checked', false);
                }
                if (response[0].RP_ConfPayJrnl == true) {
                    $("#chkReservationPayroll").prop('checked', true);
                }
                else {
                    $("#chkReservationPayroll").prop('checked', false);
                }
                if (response[0].Admin_ThresholdWarning == true) {
                    $("#chkThreshold").prop('checked', true);
                }
                else {
                    $("#chkThreshold").prop('checked', false);
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
                data: { p_mode: "getlist", LocationCd: '', CoCd: $("#ddlCompany").val(), LocationDesc: '', WhId: BudgetSetupOverviewObject.rowid, AisleNo: -1, RackNo: -1, SelfNo: -1, BinNo: "-1", created_by: $("#txt").val(), RowId: -1 },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    BudgetSetupOverviewObject.do_loadwarehouselocationData(obj);
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
    
    if ($('#txtCode').val().length <1) {
        validate = false;
        gotfocus($("#txtCode"));
        $.alertable.alert(`Setup Model Code required.`);
        //$("#txtCode").focus();
        return false;
    }
    else if ($('#ddAllocation').val() < 1) {
        validate = false;
        gotfocus($("#ddAllocation"));
        $.alertable.alert(`Allocation Group Code required.`);
        //$("#ddAllocation").focus();
        return false;
    }
    else if ($('#txtName').val().length < 1) {
        validate = false;
        gotfocus($("#txtName"));
        $.alertable.alert(`Setup Model Name required.`);
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
    var issBlock = 0
    var created_by, creator_MAC_add,  CoCd, GS_ModelCd, GS_BudGrpId, GS_ModelName,GS_PeriodAlloBasis,GS_AlloId,GS_IsStop,GS_IsBlock,RP_ConfPurchReq,RP_ConfPurchOrder,
    RP_ConfPurchInv,RP_ConfExpnsJrnl,RP_ConfFAJrnl,RP_ConfPayJrnl,Admin_ThresholdLimit,Admin_ThresholdWarning,Admin_OverbudgetingPolicy,Admin_RevisionPolicy; 


    creator_MAC_add = ipaddress;
    created_by = $("#txt").val();
    CoCd = $("#ddlCompany").val();
    GS_ModelCd=$("#txtCode").val();
    GS_BudGrpId=$("#ddAccGrp").val();
    GS_ModelName=$("#txtName").val();
    GS_PeriodAlloBasis=$("#ddGS_PeriodAlloBasis").val();
    GS_AlloId=$("#ddAllocation").val();
    GS_IsStop=0;
    if ($('#chkStop').is(':checked')) {
        GS_IsStop = 1;
    }
    GS_IsBlock=0;
    if ($('#chkBlock').is(':checked')) {
        GS_IsBlock = 1;
    }
    RP_ConfPurchReq=0;
    if ($('#chkReservation').is(':checked')) {
        RP_ConfPurchReq = 1;
    }
    RP_ConfPurchOrder=0;
    if ($('#chkReservationPO').is(':checked')) {
        RP_ConfPurchOrder = 1;
    }
    RP_ConfPurchInv=0;
    if ($('#chkReservationPI').is(':checked')) {
        RP_ConfPurchInv = 1;
    }
    RP_ConfExpnsJrnl=0;
    if ($('#chkReservationJournal').is(':checked')) {
        RP_ConfExpnsJrnl = 1;
    }
    RP_ConfFAJrnl=0;
    if ($('#chkReservationFA').is(':checked')) {
        RP_ConfFAJrnl = 1;
    }
    RP_ConfPayJrnl=0;
    if ($('#chkReservationPayroll').is(':checked')) {
        RP_ConfPayJrnl = 1;
    }
    Admin_ThresholdLimit=$("#txtThreshold").val();
    Admin_ThresholdWarning=0;
    if ($('#chkThreshold').is(':checked')) {
        Admin_ThresholdWarning = 1;
    }
    Admin_OverbudgetingPolicy=$("#ddOverbudgeting").val();
    Admin_RevisionPolicy=$("#ddRivision").val();
    
    
    if (parseInt(BudgetSetupOverviewObject.rowid) > 0) {
        $.ajax({

            url: apiurl + 'api/GeneralLedgerBudgetSetupOperation',
            type: 'POST',
            data: { p_mode: "update", RowId: parseInt(BudgetSetupOverviewObject.rowid), CoCd: CoCd, created_by: created_by, creater_MAC_add: creator_MAC_add ,GS_ModelCd : GS_ModelCd,GS_BudGrpId : GS_BudGrpId,GS_ModelName : GS_ModelName,GS_PeriodAlloBasis : GS_PeriodAlloBasis,GS_AlloId : GS_AlloId,GS_IsStop : GS_IsStop,GS_IsBlock : GS_IsBlock,RP_ConfPurchReq : RP_ConfPurchReq,RP_ConfPurchOrder : RP_ConfPurchOrder,RP_ConfPurchInv : RP_ConfPurchInv,RP_ConfExpnsJrnl : RP_ConfExpnsJrnl,RP_ConfFAJrnl : RP_ConfFAJrnl,RP_ConfPayJrnl : RP_ConfPayJrnl,Admin_ThresholdLimit : Admin_ThresholdLimit,Admin_ThresholdWarning : Admin_ThresholdWarning,Admin_OverbudgetingPolicy : Admin_OverbudgetingPolicy,Admin_RevisionPolicy : Admin_RevisionPolicy},
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);


                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "budget-setup-overview.aspx";
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
            url: apiurl + 'api/GeneralLedgerBudgetSetupOperation',
            type: 'POST',
            data: { p_mode: "create", RowId: -1, CoCd: CoCd, created_by: created_by, creater_MAC_add: creator_MAC_add ,GS_ModelCd : GS_ModelCd,GS_BudGrpId : GS_BudGrpId,GS_ModelName : GS_ModelName,GS_PeriodAlloBasis : GS_PeriodAlloBasis,GS_AlloId : GS_AlloId,GS_IsStop : GS_IsStop,GS_IsBlock : GS_IsBlock,RP_ConfPurchReq : RP_ConfPurchReq,RP_ConfPurchOrder : RP_ConfPurchOrder,RP_ConfPurchInv : RP_ConfPurchInv,RP_ConfExpnsJrnl : RP_ConfExpnsJrnl,RP_ConfFAJrnl : RP_ConfFAJrnl,RP_ConfPayJrnl : RP_ConfPayJrnl,Admin_ThresholdLimit : Admin_ThresholdLimit,Admin_ThresholdWarning : Admin_ThresholdWarning,Admin_OverbudgetingPolicy : Admin_OverbudgetingPolicy,Admin_RevisionPolicy : Admin_RevisionPolicy},

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);
                console.log(response);
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "budget-setup-overview.aspx";
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
  
    localStorage.itemmasteroverviewrowid = countryCd;
    //$('#addressbook').DataTable().rows('.selected').data()[0].AddressCode
    if (localStorage.itemmasteroverviewrowid) {
        if (mode == "vendor") {


            localStorage.clickedmenu_id = BudgetSetupOverviewObject._vendormenuid[1];

          
            localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemType;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(BudgetSetupOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + BudgetSetupOverviewObject._addressdetailsmenuid[1];
            location.href = 'budget-setup-overview.aspx';
            
        }
        
    }
    
}

var datablank = function () {
    companylogo = "";
    contentType = "";
    $("#txtCode").val('');
    $("#ddAccGrp").val(-1);
    $("#txtName").val('');
    $("#ddGS_PeriodAlloBasis").val('Y');
    $("#ddAllocation").val(-1);
    $("#txtAllocationName").val('');
    $("#chkStop").prop('checked', false);
    $("#chkBlock").prop('checked', false);
    $("#chkReservation").prop('checked', true);
    $("#chkReservationPO").prop('checked', true);
    $("#chkReservationPI").prop('checked', true);
    $("#chkReservationJournal").prop('checked', true);
    $("#chkReservationFA").prop('checked', true);
    $("#chkReservationPayroll").prop('checked', true);
   
    $("#txtThreshold").val(100);
    $("#chkThreshold").prop('checked', true);
    
    $("#ddOverbudgeting").val(1);
    $("#ddRivision").val(1);
   
}
var roleaction = function (rowId, mode) {
    
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);
  
    if (mode == "viewlocation") {
        BudgetSetupOverviewObject.rowid = rowId;
        showmodalview();

    }
    if (mode == 'add') {
        companylogo = "";
        BudgetSetupOverviewObject.rowid = '-1';
        showmodal();
        $('.modal-title').html('Budget Setup Overview - New');

        datablank();
        $('#btnSave').text('Save');
        $('#btnSave').show();
        //$('.readOnly').attr("disabled", false);
       
        //$('#txtCode').prop("disabled", false);

    }
    if (mode == 'edit') {
        showmodal();
        
        $('.modal-title').html('Budget Setup Overview - Edit');
        $('#cbBlock').show();
        datablank();
        if (!BudgetSetupOverviewObject._deleteperm[0]) {
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

        BudgetSetupOverviewObject.rowid = rowId;
        BudgetSetupOverviewObject.do_loaddataedit(rowId);
        
    }
    else if(mode == 'view') {
        showmodal();
        datablank();
        $('.modal-title').html('Budget Setup Overview - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!BudgetSetupOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!BudgetSetupOverviewObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        BudgetSetupOverviewObject.rowid = rowId;
        BudgetSetupOverviewObject.do_loaddataedit(rowId);
    }
    
    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    var created_by, creator_MAC_add, CoCd, GS_ModelCd, GS_BudGrpId, GS_ModelName, GS_PeriodAlloBasis, GS_AlloId, GS_IsStop, GS_IsBlock, RP_ConfPurchReq, RP_ConfPurchOrder,
                        RP_ConfPurchInv, RP_ConfExpnsJrnl, RP_ConfFAJrnl, RP_ConfPayJrnl, Admin_ThresholdLimit, Admin_ThresholdWarning, Admin_OverbudgetingPolicy, Admin_RevisionPolicy;


                    creator_MAC_add = ipaddress;
                    created_by = $("#txt").val();
                    CoCd = $("#ddlCompany").val();
                    GS_ModelCd = '';
                    GS_BudGrpId = -1;
                    GS_ModelName = '';
                    GS_PeriodAlloBasis = -1;
                    GS_AlloId = -1;
                    GS_IsStop = 0;

                    GS_IsBlock = 0;

                    RP_ConfPurchReq = 0;

                    RP_ConfPurchOrder = 0;

                    RP_ConfPurchInv = 0;

                    RP_ConfExpnsJrnl = 0;

                    RP_ConfFAJrnl = 0;

                    RP_ConfPayJrnl = 0;

                    Admin_ThresholdLimit = 0;
                    Admin_ThresholdWarning = 0;

                    Admin_OverbudgetingPolicy = 0;
                    Admin_RevisionPolicy = 0;
                    $.ajax({
                        url: apiurl + 'api/GeneralLedgerBudgetSetupOperation',
                        type: 'POST',
                        data: { p_mode: "delete", RowId: rowId, CoCd: CoCd, created_by: created_by, creater_MAC_add: creator_MAC_add, GS_ModelCd: GS_ModelCd, GS_BudGrpId: GS_BudGrpId, GS_ModelName: GS_ModelName, GS_PeriodAlloBasis: GS_PeriodAlloBasis, GS_AlloId: GS_AlloId, GS_IsStop: GS_IsStop, GS_IsBlock: GS_IsBlock, RP_ConfPurchReq: RP_ConfPurchReq, RP_ConfPurchOrder: RP_ConfPurchOrder, RP_ConfPurchInv: RP_ConfPurchInv, RP_ConfExpnsJrnl: RP_ConfExpnsJrnl, RP_ConfFAJrnl: RP_ConfFAJrnl, RP_ConfPayJrnl: RP_ConfPayJrnl, Admin_ThresholdLimit: Admin_ThresholdLimit, Admin_ThresholdWarning: Admin_ThresholdWarning, Admin_OverbudgetingPolicy: Admin_OverbudgetingPolicy, Admin_RevisionPolicy: Admin_RevisionPolicy },
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            $.alertable.alert(`Data removed successfully.`, ``, `Ok`, ``).then(function () {
                                window.location = "budget-setup-overview.aspx";
                            });
                        },
                        error: function () {
                            alert("error in data delete");
                        }
                    }); 

                },
            );
    }
    else if (mode == 'block') {
        $.alertable.custconfirm(`Are you want to block the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    BudgetSetupOverviewObject.do_updateblockstop(rowId,'block');

                },
            );
    }
    else if (mode == 'stop') {
        $.alertable.custconfirm(`Are you want to stop the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    BudgetSetupOverviewObject.do_updateblockstop(rowId,'stop');

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
function getAllocateName() {
    try {
        var cCode = $('#ddAllocation').val();
        var s = getObjectByValue(objBUDGETALLOCATIONGROUP, "cid", cCode);
        $('#txtAllocationName').val(s[0].cdesc1);

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
    BudgetSetupOverviewObject.do_populateLocationDropdown('STATE', $('#ddPincodeCountry').val(), $('#ddPincodeCounty'));
}
function PopulateCity() {
    BudgetSetupOverviewObject.do_populateLocationDropdown('CITY', $('#ddPincodeCounty').val(), $('#ddPincodeCity'));
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

function setImage(rowid) {

    $.ajax({
        type: "POST",
        url: "../handler/datahandler.aspx/GetImageGeneral",
        data: JSON.stringify({ id: rowid, ctype: "Procurement_Item" }),
        //data: '{imageData: "' + filename + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        crossDomain: true,
        success: function (result) {
            var rslt = result.d.split('|');
            if (result.d.length > 6) {
                companylogo = rslt[0];
                contentType = rslt[1];
                $('#blah')
                    .attr('src', rslt[0])
                    .width(80)
                    .height(80);

                $("#rmvlogo").show();
            }
           
        },
        error: function (err) {
            alert(err.statusText)
        }
    });

}
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            companylogo = e.target.result;
            $('#blah')
                .attr('src', e.target.result)
                .width(80)
                    .height(80);
        };
        imgfileName = input.files[0].name;
        contentType = input.files[0].type;

        //companylogo = reader.result;
        reader.readAsDataURL(input.files[0]);
    }
}


function rmvlogo() {
    companylogo = "";
    contentType = "";
    $('#blah')
        .attr('src', '')
    $("#rmvlogo").hide();
}
