﻿var ipaddress = "";
var objVendor;
var objMaster;
var companylogo="";
var contentType="";
var imgfileName="";
$(document).ready(function () {
   
   


    var cuserid = '<%=Session["userid"].ToString() %>';
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ipaddress = e.ip;
    });      
    
    //setImage();
    $("#myModal").modal({
        show: false,
        backdrop: 'static'
    });

    $("#click-me").click(function () {
        $("#myModal").modal("show");
    });

    localStorage.menu_id_premission;
    SalescommissionsetupoverviewObject.do_populateMasterDropdown();

    
    //SalescommissionsetupoverviewObject.do_loaddata();
    SalescommissionsetupoverviewObject.do_getUserPagepermission();
  
    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var SalescommissionsetupoverviewObject = {

    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _accountmapvieweperm: '',
    _accountmapmenuid: '',
    _salesperm: '',
    _salesmenuid : '',
    do_loaddata: () => {
        var created_by, creator_MAC_add, CoCd, IsBlock, CommCd, CommDesc, CalcBasis, CalcRelation, SalesPerson, SalesPersonRelation, CommPercent, BaseValueForCalc, ValidFrom, ValidTill, AcCd_CommAcExpns, AcCd_CommAcLiab, isStop;


        
        IsBlock = 0
        isStop = 0
        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
        CommCd = $("#txtCode").val();
        CommDesc = $("#txtDesc").val();

        CalcBasis = 0;
        CalcRelation = 0;
        SalesPerson = 0;
        SalesPersonRelation = 0;
        CommPercent = 0;
        BaseValueForCalc = 0;
        ValidFrom = '01-Jan-2000';
        ValidTill = '01-Jan-2000';
        AcCd_CommAcExpns = 0;
        AcCd_CommAcLiab = 0;
        

        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),

            $.ajax({

                url: apiurl + 'api/SalesCommissionSetupoperation',
                type: 'POST',
                data: { pmode: "getlist", RowId:-1, CoCd: CoCd, IsBlock: IsBlock, IsStop: isStop, created_by: created_by, creator_MAC_add: creator_MAC_add, CommCd: CommCd, CommDesc: CommDesc, CalcBasis: CalcBasis, CalcRelation: CalcRelation, SalesPerson: SalesPerson, SalesPersonRelation: SalesPersonRelation, CommPercent: CommPercent, BaseValueForCalc: BaseValueForCalc, ValidFrom: ValidFrom, ValidTill: ValidTill, AcCd_CommAcExpns: AcCd_CommAcExpns, AcCd_CommAcLiab: AcCd_CommAcLiab },

                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    if (response[0].ValidFrom.indexOf("1900") > 0) {
                        response[0].ValidFrom = '';
                    }
                    if (response[0].ValidTill.indexOf("1900") > 0) {
                        response[0].ValidTill = '';
                    }
                    var obj = response;
                    SalescommissionsetupoverviewObject.do_populateData(obj);
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
                { label: "CommCd", name: "CommCd" },
                { label: "CommDesc", name: "CommDesc" },
                { label: "CalcBasis", name: "CalcBasis" },
                { label: "CalcRelation", name: "CalcRelation" },
                { label: "SalesPerson", name: "SalesPerson" },
                { label: "SalesPersonRelation", name: "SalesPersonRelation" },
                { label: "CommPercent", name: "CommPercent" },
                { label: "BaseValueForCalc", name: "BaseValueForCalc" },
                { label: "ValidFrom", name: "ValidFrom" },
                { label: "ValidTill", name: "ValidTill" },
                { label: "AcCd_CommAcExpns", name: "AcCd_CommAcExpns" },
                { label: "AcCd_CommAcLiab", name: "AcCd_CommAcLiab" },
                { label: "IsBlock", name: "IsBlock" },
                { label: "IsStop", name: "IsStop" }
              
              
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
            columns: [
                { data: "CommCd" },
                { data: "CommDesc" },
                { data: "CalcBasis" },
                { data: "CalcRelation" },
                { data: "SalesPerson" },
                { data: "SalesPersonRelation" },
                { data: "CommPercent" },
                { data: "BaseValueForCalc" },
                { data: "ValidFrom" },
                { data: "ValidTill" },
                { data: "AcCd_CommAcExpns" },
                { data: "AcCd_CommAcLiab" },
                { data: "IsBlock" },
                { data: "IsStop" }
               
            ],
            select: true,
            columnDefs: [{
                orderable: false,
                'render': function (data, type, full, meta) {
                    //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                    return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                },
                targets: 12
            },
            {
                orderable: false,
                'render': function (data, type, full, meta) {
                    //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                    return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                },
                targets: 13
            }

            ],
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

                }
                ,
                {
                    add: "stop", text: 'Stop', editor: editor, action: function () { roleaction($('.selected').attr('rowid'), 'stop'); },
                    attr: {
                        title: 'Stop',
                        id: 'country_overview_stop'
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
               
                if (!SalescommissionsetupoverviewObject._deleteperm[0]) {
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


        if (!SalescommissionsetupoverviewObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!SalescommissionsetupoverviewObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        
        if (!SalescommissionsetupoverviewObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
     
        if (!SalescommissionsetupoverviewObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
       
       

    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(SalescommissionsetupoverviewObject);
        
        SalescommissionsetupoverviewObject._vieweperm = MainObject.do_IsActionMenuPermission(SalescommissionsetupoverviewObject.access, 'SALES COMMISSION SET-UP', 'view');
        SalescommissionsetupoverviewObject._createperm = MainObject.do_IsActionMenuPermission(SalescommissionsetupoverviewObject.access, 'SALES COMMISSION SET-UP', 'create');
        SalescommissionsetupoverviewObject._editperm = MainObject.do_IsActionMenuPermission(SalescommissionsetupoverviewObject.access, 'SALES COMMISSION SET-UP', 'edit');
        SalescommissionsetupoverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(SalescommissionsetupoverviewObject.access, 'SALES COMMISSION SET-UP', 'delete');
        
        

    },
  
    do_populateMasterDropdown: () => {
        
        $.ajax({
            url: apiurl + 'api/populateExpenseforsalescommision',
            type: 'POST',
            data: { CoCd: $("#ddlCompany").val() },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objVendor = response;
                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].AcCd + "'>" + response[i].AcDesc + "</option>"
                    );
                }
                $("#ddExpense").html(_html.join(""));  
                $("#ddExpense1").html(_html.join(""));
                SalescommissionsetupoverviewObject.do_populateSalesDropdown();
              

                
               
            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    },
    do_populateSalesDropdown: () => {
        $.ajax({
            url: apiurl + 'api/PopulateMasterDropdownForSalesCommissionSetup',
            type: 'POST',
            data: { CoCd: $("#ddlCompany").val() },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objMaster = response;
                SalescommissionsetupoverviewObject.do_loaddata();
                //var _html = [];
                //_html.push("<option value='-1'>--Select--</option>")
                //for (var i = 0; i < response.length; i++) {
                //    _html.push(
                //        "<option value='" + response[i].RowId + "'>" + response[i].cdesc + "</option>"
                //    );
                //}
                //$("#ddSales").html(_html.join(""));
                //$("#ddSales").val(svalpselect);
            },
            error: function (err) {
                
                alert(err.responseText);
            }
        });
    },
    do_loaddataedit: (id) => {
       
        var created_by, creator_MAC_add, CoCd, IsBlock, CommCd, CommDesc, CalcBasis, CalcRelation, SalesPerson, SalesPersonRelation, CommPercent, BaseValueForCalc, ValidFrom, ValidTill, AcCd_CommAcExpns, AcCd_CommAcLiab, isStop;



        IsBlock = 0
        isStop = 0
        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
        CommCd = $("#txtCode").val();
        CommDesc = $("#txtDesc").val();

        CalcBasis = 0;
        CalcRelation = 0;
        SalesPerson = 0;
        SalesPersonRelation = 0;
        CommPercent = 0;
        BaseValueForCalc = 0;
        ValidFrom = '01-Jan-2000';
        ValidTill = '01-Jan-2000';
        AcCd_CommAcExpns = 0;
        AcCd_CommAcLiab = 0;


        $.ajax({

            url: apiurl + 'api/SalesCommissionSetupoperation',
            type: 'POST',
            data: { pmode: "edit", RowId: id, CoCd: CoCd, IsBlock: IsBlock, IsStop: isStop, created_by: created_by, creator_MAC_add: creator_MAC_add, CommCd: CommCd, CommDesc: CommDesc, CalcBasis: CalcBasis, CalcRelation: CalcRelation, SalesPerson: SalesPerson, SalesPersonRelation: SalesPersonRelation, CommPercent: CommPercent, BaseValueForCalc: BaseValueForCalc, ValidFrom: ValidFrom, ValidTill: ValidTill, AcCd_CommAcExpns: AcCd_CommAcExpns, AcCd_CommAcLiab: AcCd_CommAcLiab },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {


                console.log(response);
                SalescommissionsetupoverviewObject.rowid = response[0].RowId;

                $("#txtCode").val(response[0].CommCd);
                $("#txtDesc").val(response[0].CommDesc);

                $("#selectMe").val(response[0].CalcBasis);
                
                if (parseInt(response[0].CalcBasis) == 1 || parseInt(response[0].CalcBasis) == 2) {
                    var cells = document.getElementsByClassName("sales");
                    for (var i = 0; i < cells.length; i++) {
                        cells[i].disabled = false;
                    }
                    var sval = parseInt(response[0].CalcBasis);
                    var _html = [];
                    _html.push("<option value='-1'>--Select--</option>")
                    
                    for (var i = 0; i < objMaster.length; i++) {
                        if (objMaster[i].ctype == 'calculation' && parseInt(objMaster[i].grp) == sval) {
                            
                            _html.push(
                                "<option value='" + objMaster[i].RowId + "'>" + objMaster[i].cdesc + "</option>"
                            );
                        }
                    }
                    $("#ddCalc").html(_html.join(""));
                    $("#ddCalc").val(response[0].CalcRelation);
                    
                }
                else {
                    var cells = document.getElementsByClassName("sales");
                    for (var i = 0; i < cells.length; i++) {
                        cells[i].disabled = true;
                    }
                    var _html = [];
                    _html.push("<option value='-1'>--Select--</option>")
                    $("#ddCalc").html(_html.join(""));
                    $("#ddCalc").val(response[0].CalcRelation);
                }

               
                $("#selectMe2").val(response[0].SalesPerson);
                var svalp = parseInt(response[0].SalesPerson);
                if (svalp == 1 || svalp == 2) {
                    var cells = document.getElementsByClassName("sales2");
                    for (var i = 0; i < cells.length; i++) {
                        cells[i].disabled = false;
                    }
                    var _html = [];
                    _html.push("<option value='-1'>--Select--</option>")
                    for (var i = 0; i < objMaster.length; i++) {
                        if (objMaster[i].ctype == 'sales' && objMaster[i].grp == svalp) {
                            _html.push(
                                "<option value='" + objMaster[i].RowId + "'>" + objMaster[i].cdesc + "</option>"
                            );
                        }
                    }
                    $("#ddSales").html(_html.join(""));
                    $("#ddSales").val(response[0].SalesPersonRelation);
                    //SalescommissionsetupoverviewObject.do_populateSalesDropdown(svalp, response[0].SalesPersonRelation);  
                
                }
                else {
                    var cells = document.getElementsByClassName("sales2");
                    for (var i = 0; i < cells.length; i++) {
                        cells[i].disabled = true;
                    }
                    var _html = [];
                    _html.push("<option value='-1'>--Select--</option>")
                    $("#ddSales").html(_html.join(""));
                    $("#ddSales").val(response[0].SalesPersonRelation);
                }
                
                 $("#txtPercent").val(response[0].CommPercent);
                $("#ddBaseValueCalc").val(response[0].BaseValueForCalc);
                
                $("#txtValidFrom").val(response[0].ValidFrom.slice(0, 10));
                $("#txtValidTo").val(response[0].ValidTill.slice(0, 10));
                 $("#ddExpense").val(response[0].AcCd_CommAcExpns);
                 $("#ddExpense1").val(response[0].AcCd_CommAcLiab);

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
                data: { p_mode: "getlist", LocationCd: '', CoCd: $("#ddlCompany").val(), LocationDesc: '', WhId: SalescommissionsetupoverviewObject.rowid, AisleNo: -1, RackNo: -1, SelfNo: -1, BinNo: "-1", created_by: $("#txt").val(), RowId: -1 },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    SalescommissionsetupoverviewObject.do_loadwarehouselocationData(obj);
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
        $.alertable.alert(`Code required.`);
        //$("#txtCode").focus();
        return false;
    }
    else if ($('#txtDesc').val().length < 1) {
        validate = false;
        gotfocus($("#txtDesc"));
        $.alertable.alert(`Description required.`);
        //$("#txtName").focus();
        return false;
    }
    else if ($('#selectMe').val() < 1) {
        validate = false;
        gotfocus($("#selectMe"));
        $.alertable.alert(`Calculation Basis.`);
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
    
    var created_by, creator_MAC_add, CoCd, IsBlock, CommCd, CommDesc, CalcBasis, CalcRelation, SalesPerson, SalesPersonRelation, CommPercent, BaseValueForCalc, ValidFrom, ValidTill, AcCd_CommAcExpns, AcCd_CommAcLiab, isStop;

    IsBlock = 0
    isStop=0
    creator_MAC_add = ipaddress;
    created_by = $("#txt").val();
    CoCd = $("#ddlCompany").val();
    CommCd = $("#txtCode").val();
    CommDesc = $("#txtDesc").val();

    CalcBasis = $("#selectMe").val();
    CalcRelation = $("#ddCalc").val();
    SalesPerson = $("#selectMe2").val();
    SalesPersonRelation = $("#ddSales").val();
    CommPercent = $("#txtPercent").val();
    BaseValueForCalc = $("#ddBaseValueCalc").val();
    ValidFrom = $("#txtValidFrom").val();
    ValidTill = $("#txtValidTo").val();
    AcCd_CommAcExpns = $("#ddExpense").val();
    AcCd_CommAcLiab = $("#ddExpense1").val();
   
    if (ValidFrom.length < 2) {
        ValidFrom="01-01-1900"
    }
    if (ValidTill.length < 2) {
        ValidTill = "01-01-1900"
    }
    if ($('#chkBlock').is(':checked')) {
        IsBlock = 1;
    }
    if ($('#chkStop').is(':checked')) {
        isStop = 1;
    }

    
    if (parseInt(SalescommissionsetupoverviewObject.rowid) > 0) {
        $.ajax({

            url: apiurl + 'api/SalesCommissionSetupoperation',
            type: 'POST',
            data: { pmode: "update", RowId: parseInt(SalescommissionsetupoverviewObject.rowid), CoCd: CoCd, IsBlock: IsBlock, IsStop: isStop, created_by: created_by, creator_MAC_add: creator_MAC_add, CommCd: CommCd, CommDesc: CommDesc, CalcBasis: CalcBasis, CalcRelation: CalcRelation, SalesPerson: SalesPerson, SalesPersonRelation: SalesPersonRelation, CommPercent: CommPercent, BaseValueForCalc: BaseValueForCalc, ValidFrom: ValidFrom, ValidTill: ValidTill, AcCd_CommAcExpns: AcCd_CommAcExpns, AcCd_CommAcLiab: AcCd_CommAcLiab },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);


                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "sales-commission-setup-overview.aspx";
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
            url: apiurl + 'api/SalesCommissionSetupoperation',
            type: 'POST',
            data: { pmode: "create", RowId: -1, CoCd: CoCd, IsBlock: IsBlock, IsStop: isStop, created_by: created_by, creator_MAC_add: creator_MAC_add, CommCd: CommCd, CommDesc: CommDesc, CalcBasis: CalcBasis, CalcRelation: CalcRelation, SalesPerson: SalesPerson, SalesPersonRelation: SalesPersonRelation, CommPercent: CommPercent, BaseValueForCalc: BaseValueForCalc, ValidFrom: ValidFrom, ValidTill: ValidTill, AcCd_CommAcExpns: AcCd_CommAcExpns, AcCd_CommAcLiab: AcCd_CommAcLiab },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);
                console.log(response);
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "sales-commission-setup-overview.aspx";
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
  
    localStorage.salesgrouprowid = countryCd;
    //$('#addressbook').DataTable().rows('.selected').data()[0].AddressCode
    if (localStorage.salesgrouprowid) {
        if (mode == "salesperson") {

            localStorage.clickedmenu_id = SalescommissionsetupoverviewObject._salesmenuid[1];
            localStorage.menu_id_premission = SalescommissionsetupoverviewObject._salesmenuid[1];
           
          
            location.href = 'salesperson.aspx';
            
        }
        
    }
    
}

var datablank = function () {
    companylogo = "";
    contentType = "";
    $("#txtCode").val('');
    $("#txtDesc").val('');


    $("#selectMe").val(0);
    $("#ddCalc").val(-1);
    $("#selectMe2").val(0);
    $("#ddSales").val(-1);
    $("#txtPercent").val(0);
    $("#ddBaseValueCalc").val(-1);
    $("#txtValidFrom").val('');
    $("#txtValidTo").val('');
    $("#ddExpense").val(-1);
    $("#ddExpense1").val(-1);
    $("#chkStop").prop('checked', false);
    $("#chkBlock").prop('checked', false);
    
    
   
}
var roleaction = function (rowId, mode) {
    
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);
  
   
    if (mode == 'add') {
        companylogo = "";
        SalescommissionsetupoverviewObject.rowid = '-1';
        showmodal();
        $('.modal-title').html('Sales Commission Set-up - New');

        datablank();
        $('#btnSave').text('Save');
        $('#btnSave').show();
        //$('.readOnly').attr("disabled", false);
       
        $('#txtCode').prop("disabled", false);

    }
    if (mode == 'edit') {
        showmodal();
        
        $('.modal-title').html('Sales Commission Set-up - Edit');
        $('#cbBlock').show();
        datablank();
        if (!SalescommissionsetupoverviewObject._deleteperm[0]) {
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
        $('#txtCode').prop("disabled", true);
        
        SalescommissionsetupoverviewObject.rowid = rowId;
        
        SalescommissionsetupoverviewObject.do_loaddataedit(rowId);
        
    }
    else if(mode == 'view') {
        showmodal();
        datablank();
        $('.modal-title').html('Sales Commission Set-up - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!SalescommissionsetupoverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!SalescommissionsetupoverviewObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        SalescommissionsetupoverviewObject.rowid = rowId;
        SalescommissionsetupoverviewObject.do_loaddataedit(rowId);
    }
    
    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    var created_by, creator_MAC_add, CoCd, IsBlock, CommCd, CommDesc, CalcBasis, CalcRelation, SalesPerson, SalesPersonRelation, CommPercent, BaseValueForCalc, ValidFrom, ValidTill, AcCd_CommAcExpns, AcCd_CommAcLiab, isStop;


                    IsBlock = 0
                    isStop = 0
                    creator_MAC_add = ipaddress;
                    created_by = $("#txt").val();
                    CoCd = $("#ddlCompany").val();
                    CommCd = $("#txtCode").val();
                    CommDesc = $("#txtDesc").val();

                    CalcBasis = 0;
                    CalcRelation = 0;
                    SalesPerson = 0;
                    SalesPersonRelation = 0;
                    CommPercent = 0;
                    BaseValueForCalc = 0;
                    ValidFrom = '01-Jan-2000';
                    ValidTill = '01-Jan-2000';
                    AcCd_CommAcExpns = 0;
                    AcCd_CommAcLiab = 0;


                    $.ajax({


                        url: apiurl + 'api/SalesCommissionSetupoperation',
                        type: 'POST',
                        data: { pmode: "delete", RowId: rowId, CoCd: CoCd, IsBlock: IsBlock, IsStop: isStop, created_by: created_by, creator_MAC_add: creator_MAC_add, CommCd: CommCd, CommDesc: CommDesc, CalcBasis: CalcBasis, CalcRelation: CalcRelation, SalesPerson: SalesPerson, SalesPersonRelation: SalesPersonRelation, CommPercent: CommPercent, BaseValueForCalc: BaseValueForCalc, ValidFrom: ValidFrom, ValidTill: ValidTill, AcCd_CommAcExpns: AcCd_CommAcExpns, AcCd_CommAcLiab: AcCd_CommAcLiab },


                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {

                            if (response[0].msg == "true") {
                                validate = true;
                                $.alertable.alert(`Data removed successfully.`, ``, `Ok`, ``).then(function () {
                                    window.location = "sales-commission-setup-overview.aspx";
                                });
                            }
                            else {
                               
                                validate = false;
                                //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                                $.alertable.alert(
                                    response[0].msg
                                );
                               
                                validate = false;
                                return false;
                            }
                           
                        },
                        error: function () {
                            alert("error in data delete");
                        }
                    }); 

                },
            );
    }
    else if (mode == 'stop') {
        $.alertable.custconfirm(`Are you want to stop the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    var created_by, creator_MAC_add, CoCd, IsBlock, CommCd, CommDesc, CalcBasis, CalcRelation, SalesPerson, SalesPersonRelation, CommPercent, BaseValueForCalc, ValidFrom, ValidTill, AcCd_CommAcExpns, AcCd_CommAcLiab, isStop;


                    IsBlock = 0
                    isStop = 0
                    creator_MAC_add = ipaddress;
                    created_by = $("#txt").val();
                    CoCd = $("#ddlCompany").val();
                    CommCd = $("#txtCode").val();
                    CommDesc = $("#txtDesc").val();

                    CalcBasis = 0;
                    CalcRelation = 0;
                    SalesPerson = 0;
                    SalesPersonRelation = 0;
                    CommPercent = 0;
                    BaseValueForCalc = 0;
                    ValidFrom = '01-Jan-2000';
                    ValidTill = '01-Jan-2000';
                    AcCd_CommAcExpns = 0;
                    AcCd_CommAcLiab = 0;


                    $.ajax({


                        url: apiurl + 'api/SalesCommissionSetupoperation',
                        type: 'POST',
                        data: { pmode: "stop", RowId: rowId, CoCd: CoCd, IsBlock: IsBlock, IsStop: isStop, created_by: created_by, creator_MAC_add: creator_MAC_add, CommCd: CommCd, CommDesc: CommDesc, CalcBasis: CalcBasis, CalcRelation: CalcRelation, SalesPerson: SalesPerson, SalesPersonRelation: SalesPersonRelation, CommPercent: CommPercent, BaseValueForCalc: BaseValueForCalc, ValidFrom: ValidFrom, ValidTill: ValidTill, AcCd_CommAcExpns: AcCd_CommAcExpns, AcCd_CommAcLiab: AcCd_CommAcLiab },


                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {

                            if (response[0].msg == "true") {
                                validate = true;
                                $.alertable.alert(`Data Updated successfully.`, ``, `Ok`, ``).then(function () {
                                    window.location = "sales-commission-setup-overview.aspx";
                                });
                            }
                            else {

                                validate = false;
                                //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                                $.alertable.alert(
                                    response[0].msg
                                );

                                validate = false;
                                return false;
                            }

                        },
                        error: function () {
                            alert("error in data delete");
                        }
                    });

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
function getVendorName() {
    try {
        var cCode = $('#ddVendor').val();
        var s = getObjectByValue(objVendor, "RowId", cCode);
        $('#txtVendor').val(s[0].VendName);

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
    SalescommissionsetupoverviewObject.do_populateLocationDropdown('STATE', $('#ddPincodeCountry').val(), $('#ddPincodeCounty'));
}
function PopulateCity() {
    SalescommissionsetupoverviewObject.do_populateLocationDropdown('CITY', $('#ddPincodeCounty').val(), $('#ddPincodeCity'));
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
