var ipaddress = "";
var ipaddress = "";
var objCountry;
var tblname = 'BUDGET ALLOCATION';
var allocd = -1;
let editor;
var objAllocation = [];
var objAllocationEdit = [];
$(document).ready(function () {
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ipaddress = e.ip;
    });

    $("#spnBudgetcode").html(localStorage.budgetregisteroverviewcode);
    $("#spnBudgetDesc").html(localStorage.budgetregisteroverviewdesc);
    $("#spnBudgetStDt").html(localStorage.budgetregisteroverviewStDt);
    $("#spnBudgetEndDt").html(localStorage.budgetregisteroverviewEndDt);
    $("#spnBudgetStDt").html(localStorage.budgetregisteroverviewStDt);
    $("#spnBudgetEndDt").html(localStorage.budgetregisteroverviewEndDt);
    $("#spnBudgetCode").html(localStorage.budgetallocationaccodedesc);
    $("#spnBudgetAmt").html(localStorage.budgetallocationaccodeamt);
    $("#spnBudgetAllo").html(localStorage.GS_PeriodAlloBasis);

   /* allocd = localStorage.budgetallocationrowid;*/
    //$("#itemcode").html(localStorage.budgetallocationcode);
    //$("#itemdes").html(localStorage.budgetallocationdesc);
    //budgetAllocationObject.do_populateMasterDimensionDropdown();
    budgetAllocationObject.do_loadcaption();
    //budgetAllocationObject.do_populateDimensionDropdown(1, $("#dddimvale_1"));
    //budgetAllocationObject.do_loaddata(-1, 'getlist');
    budgetAllocationObject.do_getUserPagepermission();
    
});

var budgetAllocationObject = {
    rowid: '',
    _dimensionmenuid: '',
    _vieweperm: false,
    _createperm: '',
    _editperm: false,
    _deleteperm: false,
    _addressdetailsmenuid: '',
    _runallocationvieweperm: '',
    _budgetallocationmenuid : '',
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(budgetAllocationObject);

        budgetAllocationObject._vieweperm = MainObject.do_IsActionMenuPermission(budgetAllocationObject.access, tblname, 'view');
        budgetAllocationObject._createperm = MainObject.do_IsActionMenuPermission(budgetAllocationObject.access, tblname, 'create');
        budgetAllocationObject._editperm = MainObject.do_IsActionMenuPermission(budgetAllocationObject.access, tblname, 'edit');
        budgetAllocationObject._deleteperm = MainObject.do_IsActionMenuPermission(budgetAllocationObject.access, tblname, 'delete');

        budgetAllocationObject._runallocationvieweperm = MainObject.do_IsActionMenuPermission(budgetAllocationObject.access, 'RUN ALLOCATION BATCH', 'view');
        budgetAllocationObject._budgetallocationmenuid = MainObject.do_IsActionMenuPermission(budgetAllocationObject.access, 'RUN ALLOCATION BATCH', 'menuid');
    },
    do_loadcaption: () => {
        
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            $.ajax({
                //url: apiurl + 'api/administratorCompanyProfileOperation',                

                url: apiurl + 'api/getDimensionCaption',
                type: 'POST',
                data: { ctype: $("#ddlCompany").val() },

                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    console.log(response);
                    for (var i = 0; i < response.length; i++) {
                        //$('#lbl_dimension_' + response[i].dimId).html(response[i].dimCaption);
                        $('#splbldim' + response[i].dimId).text(response[i].dimCaption);
                        $('#spldim' + response[i].dimId).text(response[i].dimCaption);
                        
                        
                    }
                    budgetAllocationObject.do_loaddata(localStorage.budgetentryoverviewrowid);


                },
                error: function (err) {
                    alert(err.responseText);
                }
            });


    },
    do_populateMasterDimensionDropdown: () => {

        $.ajax({
            url: apiurl + 'api/getDimensionCaption',
            type: 'POST',
            data: { ctype: $("#ddlCompany").val() },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
               
                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].dimId + "'>" + response[i].dimCaption + "</option>"
                    );
                }
                $("#ddDimension").html(_html.join(""));
                budgetAllocationObject.do_loadcaption();




            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    },
    do_populateDimensionDropdown: (cdimId, obj) => {

        $.ajax({
            url: apiurl + 'api/GetBranchDimensionByCompany',
            type: 'POST',
            data: { dimId: cdimId, ctype: $("#ddlCompany").val() },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                
                var _html = [];
                _html.push("<option value='-1'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].valueId + "'>" + response[i].valueDesc + "</option>"
                    );
                }

                obj.html(_html.join(""));
                if (cdimId == 1) {
                    budgetAllocationObject.do_populateDimensionDropdown(2, $("#dddimvale_2"));
                }
                if (cdimId == 2) {
                    budgetAllocationObject.do_populateDimensionDropdown(3, $("#dddimvale_3"));
                }
                if (cdimId == 3) {
                    budgetAllocationObject.do_populateDimensionDropdown(4, $("#dddimvale_4"));
                }
                if (cdimId == 4) {
                    budgetAllocationObject.do_populateDimensionDropdown(5, $("#dddimvale_5"));
                }
                if (cdimId == 5) {
                    budgetAllocationObject.do_populateDimensionDropdown(6, $("#dddimvale_6"));
                }
                if (cdimId == 6) {
                    budgetAllocationObject.do_populateDimensionDropdown(7, $("#dddimvale_7"));
                }
                if (cdimId == 7) {
                    budgetAllocationObject.do_populateDimensionDropdown(8, $("#dddimvale_8"));
                }
                if (cdimId == 8) {
                    budgetAllocationObject.do_populateDimensionDropdown(9, $("#dddimvale_9"));
                }
                if (cdimId == 9) {
                    budgetAllocationObject.do_populateDimensionDropdown(10, $("#dddimvale_10"));
                }
                if (cdimId == 10) {

                    //budgetAllocationObject.do_loaddata();
                }

                




            },
            error: function (err) {
                //budgetAllocationObject.do_loaddata();
                alert(err.responseText);
            }
        });
    }
    ,
    //############################################################### populate Data from database ##############################
    do_loaddata: (id) => {
        
        var created_by, creator_MAC_add, CoCd;
        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
       
        $.ajax({
            url: apiurl + 'api/GeneralLedgerBudgetAllocationPeriodDimOperation',
            type: 'POST',
            data: { BudgetRegisterRowId: id, CoCd: CoCd, created_by: created_by, creator_MAC_add: creator_MAC_add },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                var obj = response;
                for (var i = 0; i < response.length; i++) {
                    item = {}
                    if (checkrowidinjson(response[i].rowid) == 1) {
                        item["rowid"] = response[i].rowid;
                        item["PeriodAlloBasis"] = '';
                        item["PeriodAlloBasis1"] = '';
                        item["AlloAmt"] = 0;
                    }
                    else {
                        item["rowid"] = response[i].rowid;
                        item["PeriodAlloBasis"] = response[i].PeriodAlloBasis;
                        item["PeriodAlloBasis1"] = response[i].PeriodAlloBasis1;
                        item["AlloAmt"] = response[i].AlloAmt;
                    }
                    
                    //item["rowid"] = response[i].rowid;
                    //item["PeriodAlloBasis"] = response[i].PeriodAlloBasis;
                    //item["PeriodAlloBasis1"] = response[i].PeriodAlloBasis1;
                    //item["AlloAmt"] = response[i].AlloAmt;

                    item["dtlrowid"] = response[i].dtlrowid;
                    item["dim1ValueIdDesc"] = response[i].dim1ValueIdDesc;
                    item["dim1ValueId"] = response[i].dim1ValueId;
                    item["dim1Value"] = response[i].dim1Value;
                    item["dim2ValueIdDesc"] = response[i].dim2ValueIdDesc;
                    item["dim2ValueId"] = response[i].dim2ValueId;
                    item["dim2Value"] = response[i].dim2Value;
                    item["dim3ValueIdDesc"] = response[i].dim3ValueIdDesc;
                    item["dim3ValueId"] = response[i].dim3ValueId;
                    item["dim3Value"] = response[i].dim3Value;
                    item["dim4ValueIdDesc"] = response[i].dim4ValueIdDesc;
                    item["dim4ValueId"] = response[i].dim4ValueId;
                    item["dim4Value"] = response[i].dim4Value;
                    item["dim5ValueIdDesc"] = response[i].dim5ValueIdDesc;
                    item["dim5ValueId"] = response[i].dim5ValueId;
                    item["dim5Value"] = response[i].dim5Value;
                    item["dim6ValueIdDesc"] = response[i].dim6ValueIdDesc;
                    item["dim6ValueId"] = response[i].dim6ValueId;
                    item["dim6Value"] = response[i].dim6Value;
                    item["dim7ValueIdDesc"] = response[i].dim7ValueIdDesc;
                    item["dim7ValueId"] = response[i].dim7ValueId;
                    item["dim7Value"] = response[i].dim7Value;
                    item["dim8ValueIdDesc"] = response[i].dim8ValueIdDesc;
                    item["dim8ValueId"] = response[i].dim8ValueId;
                    item["dim8Value"] = response[i].dim8Value;
                    item["dim9ValueIdDesc"] = response[i].dim9ValueIdDesc;
                    item["dim9ValueId"] = response[i].dim9ValueId;
                    item["dim9Value"] = response[i].dim9Value;
                    item["dim10ValueIdDesc"] = response[i].dim10ValueIdDesc;
                    item["dim10ValueId"] = response[i].dim10ValueId;
                    item["dim10Value"] = response[i].dim10Value;
                    objAllocation.push(item);
                }
                budgetAllocationObject.do_populateAllData(objAllocation);

            },
            error: function (err) {
                alert(err.statusText);
            }
        });


    },
    do_populateDataForEdit: (obj) => {
        budgetAllocationObject.rowid = obj[0].RowId;
        $('#txtpercent').val(obj[0].AlloPer);
        $('#dddimvale_1').val(obj[0].dim1ValueId);
        $('#dddimvale_2').val(obj[0].dim2ValueId);
        $('#dddimvale_3').val(obj[0].dim3ValueId);

        $('#dddimvale_4').val(obj[0].dim4ValueId);
        $('#dddimvale_5').val(obj[0].dim5ValueId);
        $('#dddimvale_6').val(obj[0].dim6ValueId);

        $('#dddimvale_7').val(obj[0].dim7ValueId);
        $('#dddimvale_8').val(obj[0].dim8ValueId);
        $('#dddimvale_9').val(obj[0].dim9ValueId);

        $('#dddimvale_10').val(obj[0].dim10ValueId);
    },
    do_populateAllData: (obj) => {
        var editor = new $.fn.dataTable.Editor({
            table: "#item_table",
            fields: [
                
                { label: "dtlrowid", name: "dtlrowid" },
                { label: "PeriodAlloBasis1", name: "PeriodAlloBasis1" },
                { label: "AlloAmt", name: "AlloAmt" },
                { label: "dim1ValueIdDesc", name: "dim1ValueIdDesc" },
                { label: "dim1Value", name: "dim1Value" },
                { label: "dim2ValueIdDesc", name: "dim2ValueIdDesc" },
                { label: "dim2Value", name: "dim2Value" },
                { label: "dim3ValueIdDesc", name: "dim3ValueIdDesc" },
                { label: "dim3Value", name: "dim3Value" },
                { label: "dim4ValueIdDesc", name: "dim4ValueIdDesc" },
                { label: "dim4Value", name: "dim4Value" },
                { label: "dim5ValueIdDesc", name: "dim5ValueIdDesc" },
                { label: "dim5Value", name: "dim5Value" },
                { label: "dim6ValueIdDesc", name: "dim6ValueIdDesc" },
                { label: "dim6Value", name: "dim6Value" },
                { label: "dim7ValueIdDesc", name: "dim7ValueIdDesc" },
                { label: "dim7Value", name: "dim7Value" },
                { label: "dim8ValueIdDesc", name: "dim8ValueIdDesc" },
                { label: "dim8Value", name: "dim8Value" },
                { label: "dim9ValueIdDesc", name: "dim9ValueIdDesc" },
                { label: "dim9Value", name: "dim9Value" },
                { label: "dim10ValueIdDesc", name: "dim10ValueIdDesc" },
                { label: "dim10Value", name: "dim10Value" }
                
            ],
        });

        var roletable = $("#item_table");

        var roledata = [];
        roledata = obj;

        roletable.dataTable({
            //dom: "lBfrtip",
            dom: "lfrtip",
            //"bDestroy": true,
            "pageLength": 50,
            data: roledata,
            columns: [
                
                { data: "dtlrowid" },
                { data: "PeriodAlloBasis1" },
                { data: "AlloAmt" },
                { data: "dim1ValueIdDesc" },
                { data: "dim1Value" },
                { data: "dim2ValueIdDesc" },
                { data: "dim2Value" },
                { data: "dim3ValueIdDesc" },
                { data: "dim3Value" },
                { data: "dim4ValueIdDesc" },
                { data: "dim4Value" },
                { data: "dim5ValueIdDesc" },
                { data: "dim5Value" },
                { data: "dim6ValueIdDesc" },
                { data: "dim6Value" },
                { data: "dim7ValueIdDesc" },
                { data: "dim7Value" },
                { data: "dim8ValueIdDesc" },
                { data: "dim8Value" },
                { data: "dim9ValueIdDesc" },
                { data: "dim9Value" },
                { data: "dim10ValueIdDesc" },
                { data: "dim10Value" },

               
            ],
            //order: [[1, 'desc']],
            "aoColumnDefs": [{ "bVisible": false, "aTargets": [0] }],
            select: true,
            //scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: false,
            //buttons: [
               
            //    {
            //        add: "edit", text: 'Edit', editor: editor, action: function () { roleaction($('.selected').attr('rowId'), 'edit'); },
            //        attr: {
            //            title: 'Edit',
            //            id: 'country_overview_Edit'
            //        },
            //        enabled: false,
            //    },
            //    {
            //        extend: "remove", editor: editor, action: function () { roleaction($('.selected').attr('rowId'), 'delete'); },
            //        attr: {
            //            title: 'Delete',
            //            id: 'country_overview_delete'
            //        },
            //    },
            //    {
            //        add: "view", text: 'View', editor: editor, action: function () { roleaction($('.selected').attr('rowId'), 'view'); },
            //        attr: {
            //            title: 'View',
            //            id: 'country_overview_View'
            //        }

            //    },
            //    {
            //        add: "ballow", text: 'Run Allocation Batch', editor: editor, action: function () { roleaction($('.selected').attr('rowId'), 'batch'); },
            //        attr: {
            //            title: 'Run Allocation Batch',
            //            id: 'country_overview_ballow'
            //        }

            //    }


            //],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowid", `${data.rowid}`);
                $(row).attr("dtlrowid", `${data.dtlrowid}`);
            },
        });

        var table = $('#item_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {

                if (!budgetAllocationObject._deleteperm[0]) {
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


        if (!budgetAllocationObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!budgetAllocationObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }

        if (!budgetAllocationObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }

        if (!budgetAllocationObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view item price !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
    },
    do_loaddataedit: (id) => {
        budgetAllocationObject.do_loaddata(id, 'edit');
    },

}// End of Object
var showmodal = function () {
    $("#myModalNEW").modal('show');
};

var datablank = () => {
    $('#ddDimension').val('-1');
    $('#ddDimensionValue').val('-1');
    $('#txtPercn').val('0');
    resetdimensiondiv();
    //$('#txtpercent').val('');
    //for (var i = 0; i < 10; i++) {
    //    $("#dddimvale_" + (i + 1)).val(-1);
    //}
}
//################################################ Roleaction ##########################################
var roleaction = function (rowId, mode) {
    
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);
 

    if (mode == 'add') {
        datablank();
        companylogo = "";
        budgetAllocationObject.rowid = '-1';

        showmodal();
        $('.modal-title').html('Budget Allocation Rule');


        $('#btnSave').text('Save');
        $('#btnSave').show();
        //$('.readOnly').attr("disabled", false);

        //$('#txtCode').prop("disabled", false);

    }
    if (mode == 'edit') {
        location.href = 'budget_allocation_edit.aspx';
        //datablank();
        

        //$('.modal-title').html('Budget Allocation Rule');
        //gridview();
        ////
        //if (!budgetAllocationObject._deleteperm[0]) {
        //    $('#country_overview_delete').show();
        //    $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        //    $('#country_overview_delete').prop("disabled", true);
        //    $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
        //} else { $('#country_overview_delete').show(); }

        //$('#lbBlock').show();
        //$('#btnEdit').hide();
        //$('#btnSave').text('Save');
        //$('#btnSave').show();
        //$('.readOnly').attr("disabled", false);
        ////$('#txtCode').prop("disabled", true);

        //budgetAllocationObject.rowid = rowId;
      
        //editrole(rowId);
        //budgetAllocationObject.do_loaddataedit(rowId);
       

    }
    else if (mode == 'view') {
        datablank();
        showmodal();

        $('.modal-title').html('Budget Allocation Rule');
        $('#cbBlock').show();
        // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!budgetAllocationObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete!!!');
        } else { $('#country_overview_delete').show(); }
        if (!budgetAllocationObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();

        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        budgetAllocationObject.rowid = rowId;
        //budgetAllocationObject.do_loaddataedit(rowId);
        editrole(rowId);
    }

    else if (mode == 'delete') {
        datablank();
        showmodal();
        $('.modal-title').html('Budget Allocation Rule');
        budgetAllocationObject.rowid = rowId;
        $('#btnSave').show();
        editrole(rowId);
        //$.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
        //    .then(
        //        function () {

        //            budgetAllocationObject.rowid = rowId;
        //            var issBlock = 1
        //            var created_by, creator_MAC_add, CoCd;



        //            creator_MAC_add = ipaddress;
        //            created_by = $("#txt").val();
        //            CoCd = $("#ddlCompany").val();

        //            var AlloPer = 0;
        //            var dim1ValueId = -1;
        //            var dim2ValueId = -1;
        //            var dim3ValueId = -1;
        //            var dim4ValueId = -1;
        //            var dim5ValueId = -1;
        //            var dim6ValueId = -1;
        //            var dim7ValueId = -1;
        //            var dim8ValueId = -1;
        //            var dim9ValueId = -1;
        //            var dim10ValueId = -1;



        //            //alert(rowId);
        //            // _data = '{rowid:"' + rowId + '"}';
        //            $.ajax({
        //                url: apiurl + 'api/GeneralLedgerBudgetAllocationRuleOperation',
        //                type: 'POST',
        //                data: { p_mode: 'remove', RowId: rowId, CoCd: CoCd, AlloId: allocd, AlloPer: AlloPer, dim1ValueId: dim1ValueId, dim2ValueId: dim2ValueId, dim3ValueId: dim3ValueId, dim4ValueId: dim4ValueId, dim5ValueId: dim5ValueId, dim6ValueId: dim6ValueId, dim7ValueId: dim7ValueId, dim8ValueId: dim8ValueId, dim9ValueId: dim9ValueId, dim10ValueId: dim10ValueId, IsBlock: issBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },
        //                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        //                success: function (response) {
        //                    if (response[0].msg == "true") {
        //                        validate = true;
        //                        $.alertable.alert(`Data deleted successfully.`, ``, `Ok`, ``).then(function () {
        //                            if (queryString('id') != undefined || queryString("id") != null) {
        //                                window.location = "budget-allocation-rule.aspx?id=" + queryString('id');
        //                            }
        //                            else {
        //                                window.location = "budget-allocation-rule.aspx";
        //                            }
        //                        });
        //                    }
        //                    else {
        //                        validate = false;
        //                        $.alertable.alert(
        //                            response[0].msg
        //                        );

        //                        validate = false;
        //                        return false;
        //                    }
        //                },
        //                error: function () {
        //                    alert("error in data delete");
        //                }
        //            });

        //        },
        //    );
    }

};
//############################################### end of roleaction #################################
var savedata = () => {
    //$('#divDimension').find("select, text, input").each(function () {
    //$('#divDimension').find("input").each(function () {
    //    var cntrlId = $(this).attr('id');
    //    //alert(cntrlId);
    //    alert($(this).val());
    //});
    var totpercentage = 0;

    for (var i = 0; i < objAllocation.length; i++) {
        var cur = objAllocation[i];
        totpercentage = totpercentage + parseFloat(cur.percentage);
    }

    totpercentage = totpercentage + parseFloat($("#txtPercn").val());
    if (totpercentage != 100) {

        validate = false;
        $.alertable.alert(`Total Percentage of dimension allocation should be 100.`);
        $("#txtPercn").focus();
        return false;
    }
    $('#btnSave').prop("disabled", true);

 
   var creator_MAC_add = ipaddress;
   var created_by = $("#txt").val();
   var CoCd = $("#ddlCompany").val();
    //var finalStr = '';
    //for (var i = 0; i < objAllocation.length; i++) {
    //    finalStr = finalStr + objAllocation[i].dimId + '~' + objAllocation[i].dimValueId + '~' + objAllocation[i].percentage;
    //    finalStr = finalStr + '!';
    //}
    //console.log(JSON.stringify(objAllocation));
    $.ajax({
        url: apiurl + 'api/GeneralLedgerBudgetAllocationRuleNewOperation',
        type: 'POST',
        //data: { sdata: JSON.stringify(objAllocation) },
        data: { CoCd: CoCd, AlloId: allocd, created_by: created_by, creator_MAC_add: creator_MAC_add, sdata: JSON.stringify(objAllocation) },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            if (response[0].msg == "true") {
                validate = true;
                $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                    if (queryString('id') != undefined || queryString("id") != null) {
                        window.location = "budget-allocation-rule.aspx?id=" + queryString('id');
                    }
                    else {
                        window.location = "budget-allocation-rule.aspx";
                    }
                });
            }
            else {
                validate = false;
                $.alertable.alert(
                    response[0].msg
                );
                $('#btnSave').prop("disabled", false);
                validate = false;
                return false;
            }
        },
        error: function (err) {
            $('#btnSave').prop("disabled", false);
            alert(err.statusText);
        }
    });
    
}
var savedata_old = () => {
    if ($('#txtpercent').val() == '') {
        validate = false;
        $.alertable.alert(`Percentage  required.`);
        $("#txtpercent").focus();
        return false;
    }
    var flag = 'N';
    for (var i = 0; i < 10; i++) {
        if (parseInt($("#dddimvale_" + (i + 1)).val()) > 0) {
            flag = 'Y';
        }
           
    }
    if (flag == 'N') {
        $.alertable.alert(`At least one dimension is required`);
        return false;
    }
    $('#btnSave').prop("disabled", true);
    savefinal(-1);
}

var savefinal = (id) => {
    var issBlock = 0
    var created_by, creator_MAC_add, CoCd, AcCd = '';

    creator_MAC_add = ipaddress;
    created_by = $("#txt").val();
    CoCd = $("#ddlCompany").val();

    var dim1ValueId = $('#dddimvale_1').val();
    var dim2ValueId = $('#dddimvale_2').val();
    var dim3ValueId = $('#dddimvale_3').val();
    var dim4ValueId = $('#dddimvale_4').val();
    var dim5ValueId = $('#dddimvale_5').val();
    var dim6ValueId = $('#dddimvale_6').val();
    var dim7ValueId = $('#dddimvale_7').val();
    var dim8ValueId = $('#dddimvale_8').val();
    var dim9ValueId = $('#dddimvale_9').val();
    var dim10ValueId = $('#dddimvale_10').val();
    if (parseInt(budgetAllocationObject.rowid) > 0) {
        id = budgetAllocationObject.rowid;
        $.ajax({
            url: apiurl + 'api/GeneralLedgerBudgetAllocationRuleOperation',
            type: 'POST',
            data: { p_mode: 'update', RowId: id, CoCd: CoCd, AlloId: allocd, AlloPer: $('#txtpercent').val(), dim1ValueId: dim1ValueId, dim2ValueId: dim2ValueId, dim3ValueId: dim3ValueId, dim4ValueId: dim4ValueId, dim5ValueId: dim5ValueId, dim6ValueId: dim6ValueId, dim7ValueId: dim7ValueId, dim8ValueId: dim8ValueId, dim9ValueId: dim9ValueId, dim10ValueId: dim10ValueId, IsBlock: issBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                console.log(response);
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        if (queryString('id') != undefined || queryString("id") != null) {
                            window.location = "budget-allocation-rule.aspx?id=" + queryString('id');
                        }
                        else {
                            window.location = "budget-allocation-rule.aspx";
                        }
                    });
                }
                else {
                    validate = false;
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $('#btnSave').prop("disabled", false);
                    $.alertable.alert(
                        response[0].msg
                    );

                    validate = false;
                    return false;
                }
            },
            error: function (err) {
                $('#btnSave').prop("disabled", false);
                alert(err.statusText);
            }
        });
    }
    else {
        $.ajax({
            url: apiurl + 'api/GeneralLedgerBudgetAllocationRuleOperation',
            type: 'POST',
            data: { p_mode: 'create', RowId: id, CoCd: CoCd, AlloId: allocd, AlloPer: $('#txtpercent').val(), dim1ValueId: dim1ValueId, dim2ValueId: dim2ValueId, dim3ValueId: dim3ValueId, dim4ValueId: dim4ValueId, dim5ValueId: dim5ValueId, dim6ValueId: dim6ValueId, dim7ValueId: dim7ValueId, dim8ValueId: dim8ValueId, dim9ValueId: dim9ValueId, dim10ValueId: dim10ValueId, IsBlock: issBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                console.log(response);
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                        if (queryString('id') != undefined || queryString("id") != null) {
                            window.location = "budget-allocation-rule.aspx?id=" + queryString('id');
                        }
                        else {
                            window.location = "budget-allocation-rule.aspx";
                        }
                    });
                }
                else {
                    validate = false;
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $.alertable.alert(
                        response[0].msg
                    );
                    $('#btnSave').prop("disabled", false);
                    validate = false;
                    return false;
                }
            },
            error: function (err) {
                $('#btnSave').prop("disabled", false);
                alert(err.statusText);
            }
        });
    }
 


}

function resetdimensiondiv() {
    $("#divDimension").html('');
}
function populateDimensionValue() {
    var dimId = $("#ddDimension").val();
    $('#txtPercn').val('0');
    var budgetallocationrowid = localStorage.budgetallocationrowid;
    if (objAllocation.length > 0) {
        
        $.alertable.custconfirm(`If you change the dimension, you will lose all the previous data. Are you want to change the Dimension ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    $.ajax({
                        url: apiurl + 'api/SearchDimenionforBudgetAllocation',
                        type: 'POST',
                        data: { CoCd: $("#ddlCompany").val(), dimId: dimId, budgetallocationrowid: budgetallocationrowid },
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            var strResponse = response;
                            objAllocation = [];
                            for (var i = 0; i < strResponse.length; i++) {
                                if (strResponse[i].percn > 0) {
                                    item = {}
                                    item["dimId"] = strResponse[i].dimId;
                                    item["dimValueId"] = strResponse[i].valueId;
                                    item["dimValueDesc"] = strResponse[i].valueDesc;
                                    item["percentage"] = strResponse[i].percn;
                                    objAllocation.push(item);
                                }

                            }

                            gridview();

                            var _html = [];
                            _html.push("<option value='-1'>--Select--</option>")
                            for (var i = 0; i < response.length; i++) {
                                _html.push(
                                    "<option value='" + response[i].valueId + "'>" + response[i].valueDesc + "</option>"
                                );
                            }
                            $("#ddDimensionValue").html(_html.join(""));

                        },
                        error: function (err) {
                            alert(err.responseText);
                        }
                    });

                }, function () {
                    $("#ddDimension").val(objAllocation[0].dimId);
                }
            );

    }
    else {
        $.ajax({
            url: apiurl + 'api/SearchDimenionforBudgetAllocation',
            type: 'POST',
            data: { CoCd: $("#ddlCompany").val(), dimId: dimId, budgetallocationrowid: budgetallocationrowid },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                var strResponse = response;
                objAllocation = [];
                for (var i = 0; i < strResponse.length; i++) {
                    if (strResponse[i].percn > 0) {
                        item = {}
                        item["dimId"] = strResponse[i].dimId;
                        item["dimValueId"] = strResponse[i].valueId;
                        item["dimValueDesc"] = strResponse[i].valueDesc;
                        item["percentage"] = strResponse[i].percn;
                        objAllocation.push(item);
                    }

                }

                gridview();

                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].valueId + "'>" + response[i].valueDesc + "</option>"
                    );
                }
                $("#ddDimensionValue").html(_html.join(""));

            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    }
    //confirm dimension change
    //resetdimensiondiv();
  
}
function removedatafromobjAllocation(uniqueId) {
    
    for (var i = 0; i < objAllocation.length; i++) {
        var cur = objAllocation[i];
        if (cur.dimValueId == uniqueId) {
            objAllocation.splice(i, 1);
            break;
        }
    }
  
    gridview();
}
function gridview() {
    objAllocationEdit = objAllocation;
    //resetdimensiondiv();
   
    if (objAllocationEdit.length > 0) {
        
        chtml = '<div class="form-group row" style="font-weight : bold; display : flex;">'
        chtml = chtml + '<div>';
        chtml = chtml + 'Date/Period';
        chtml = chtml + '</div>';

        chtml = chtml + '<div>';
        chtml = chtml + 'Total Budget Amount';
        chtml = chtml + '</div>';

        chtml = chtml + '<div>';
        chtml = chtml + '<span id="spldim1"></span>';
        chtml = chtml + '</div><div>Amount</div>';
        chtml = chtml + '<div>';
        chtml = chtml + '<span id="spldim2"></span>';
        chtml = chtml + '</div><div>Amount</div>';
        chtml = chtml + '<div>';
        chtml = chtml + '<span id="spldim3"></span>';
        chtml = chtml + '</div><div>Amount</div>';
        chtml = chtml + '<div>';
        chtml = chtml + '<span id="spldim4"></span>';
        chtml = chtml + '</div><div>Amount</div>';
        chtml = chtml + '<div>';
        chtml = chtml + '<span id="spldim5"></span>';
        chtml = chtml + '</div><div>Amount</div>';
        chtml = chtml + '<div>';
        chtml = chtml + '<span id="spldim6"></span>';
        chtml = chtml + '</div><div>Amount</div>';
        chtml = chtml + '<div>';
        chtml = chtml + '<span id="spldim7"></span>';
        chtml = chtml + '</div><div>Amount</div>';
        chtml = chtml + '<div>';
        chtml = chtml + '<span id="spldim8"></span>';
        chtml = chtml + '</div><div>Amount</div>';
        chtml = chtml + '<div>';
        chtml = chtml + '<span id="spldim9"></span>';
        chtml = chtml + '</div><div>Amount</div>';
        chtml = chtml + '<div>';
        chtml = chtml + '<span id="spldim10"></span>';
        chtml = chtml + '</div><div>Amount</div>';

        chtml = chtml + '</div>';
        //$("#divDimension").append(chtml);
        //for (var i = 0; i < objAllocation.length; i++) {
        //            totpercn = totpercn + parseFloat(objAllocation[i].percentage);
        //            chtml = '<div class="form-group row">'
        //            chtml = chtml + '<div class="col-sm-6">';
        //            chtml = chtml + '<label for="input">' + objAllocation[i].dimValueDesc + '</label>';
        //            chtml = chtml + '</div>';

        //            chtml = chtml + '<div class="col-sm-4">';
        //            chtml = chtml + objAllocation[i].percentage;
        //            chtml = chtml + '</div>';

        //            chtml = chtml + '<div class="col-sm-2">';
        //            chtml = chtml + ' <button type="button" class="btn btn-primary" onclick="removedatafromobjAllocation(' + objAllocation[i].dimValueId + ');">Delete</button>';
        //            chtml = chtml + '</div>';
        //            chtml = chtml + '</div>';

        //            $("#divDimension").append(chtml);
        //        }
        //chtml = '<div class="form-group row" style="font-weight : bold;">'
        //chtml = chtml + '<div class="col-sm-6">';
        //chtml = chtml + '<label for="input">Total</label>';
        //chtml = chtml + '</div>';

        //chtml = chtml + '<div class="col-sm-4">';
        //chtml = chtml + totpercn;
        //chtml = chtml + '</div>';

        //chtml = chtml + '<div class="col-sm-2">';
        //chtml = chtml + '';
        //chtml = chtml + '</div>';
        //chtml = chtml + '</div>';

        //$("#divDimension").append(chtml);
        }
        
}
function adddatatotable() {
    var dimId = $("#ddDimension").val();
    var dimValueId = $("#ddDimensionValue").val();
    var dimValueDesc = $("#ddDimensionValue option:selected").text();
    var budgetallocationrowid = localStorage.budgetallocationrowid;
   
    var rtn = -1;
    if ($("#ddDimension").val() < 1) {
        rtn = 0;
        validate = false;
        $.alertable.alert(`Select Dimension`);
        $("#ddDimension").focus();
        return false;
    }
    if ($("#ddDimensionValue").val() < 1) {
        rtn = 0;
        validate = false;
        $.alertable.alert(`Select Dimension Value`);
        $("#ddDimensionValue").focus();
        return false;
    }
    if ($("#txtPercn").val() < 1) {
        rtn = 0;
        validate = false;
        $.alertable.alert(`Invalid Percentage.`);
        $("#txtPercn").focus();
        return false;
    }
    if (rtn == -1) {
        for (var i = 0; i < objAllocation.length; i++) {
            var cur = objAllocation[i];
            //totpercentage = totpercentage + cur.percentage;
            if (cur.dimId != dimId) {
                rtn = 1;
                break;
            }
            if (cur.dimValueId == dimValueId) {
                rtn = 2;
                break;
            }

        }
    }
   

    
   
    if (rtn == -1) {
        item = {}
        item["dimId"] = dimId;
        item["dimValueId"] = dimValueId;
        item["dimValueDesc"] = dimValueDesc;
        item["percentage"] = $("#txtPercn").val();
        objAllocation.push(item);
        $("#txtPercn").val(0);
        $("#ddDimensionValue").val(-1);
        gridview();
    }
    else if (rtn == 1) {
        validate = false;
        $.alertable.alert(`Invalid Dimension.`);
        $("#ddDimensionValue").focus();
      
    }
    else if (rtn == 2) {
        validate = false;
        $.alertable.alert(`Duplicate Dimension Value.`);
        $("#ddDimensionValue").focus();
        return false;
    }
    //alert(objAllocation.length);
    //$.ajax({
    //    url: apiurl + 'api/SearchDimenionforBudgetAllocation',
    //    type: 'POST',
    //    data: { CoCd: $("#ddlCompany").val(), dimId: dimId, budgetallocationrowid: budgetallocationrowid },
    //    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    //    success: function (response) {
    //        var chtml = '';

    //        if (response.length > 0) {
    //            for (var i = 0; i < response.length; i++) {
    //                chtml = '<div class="form-group row">'
    //                chtml = chtml + '<div class="col-sm-6">';
    //                chtml = chtml + '<label for="input">' + response[i].valueDesc + '</label>';
    //                chtml = chtml + '</div>';

    //                chtml = chtml + '<div class="col-sm-6">';
    //                chtml = chtml + '<input type="number" value="0" class="form-control" id="txtDimenSionv' + response[i].valueId + '" />';
    //                chtml = chtml + '</div>';

    //                chtml = chtml + '</div>';

    //                $("#divDimension").append(chtml);
    //            }

    //        }

    //    },
    //    error: function (err) {
    //        alert(err.responseText);
    //    }
    //});
}
function searchdimendiondata() {
    var dimId = $("#ddDimension").val();
    var budgetallocationrowid = localStorage.budgetallocationrowid;
    resetdimensiondiv();
    $.ajax({
        url: apiurl + 'api/SearchDimenionforBudgetAllocation',
        type: 'POST',
        data: { CoCd: $("#ddlCompany").val(), dimId: dimId, budgetallocationrowid: budgetallocationrowid },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            var chtml = '';
            
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    chtml = '<div class="form-group row">'
                    chtml = chtml + '<div class="col-sm-6">';
                    chtml = chtml + '<label for="input">' + response[i].valueDesc + '</label>';
                    chtml = chtml + '</div>';

                    chtml = chtml + '<div class="col-sm-6">';
                    chtml = chtml + '<input type="number" value="0" class="form-control" id="txtDimenSionv' + response[i].valueId + '" />';
                    chtml = chtml + '</div>';

                    chtml = chtml + '</div>';

                    $("#divDimension").append(chtml);
                }

            }
           
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function editrole(rowId) {
    $.ajax({
        url: apiurl + 'api/GeneralLedgerBudgetAllocationRuleEditOperation',
        type: 'POST',
        data: { rowid: rowId },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            $("#ddDimension").val(response[0].dimid);
            populateDimensionValue();
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function checkrowidinjson(newrowid) {
    var rtn = 0;
    for (var i = 0; i < objAllocation.length; i++) {
        var cur = objAllocation[i];
        if (cur.rowid == newrowid) {
            rtn = 1;
            break;
        }
    }
    return rtn;
}
var showmodaledit = function () {
    $("#myModalEDIT").modal('show');
};