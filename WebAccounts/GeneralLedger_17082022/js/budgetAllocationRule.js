var ipaddress = "";
var objCountry;
var tblname = 'CREATE ALLOCATION RULE';
var allocd = -1;
let editor;
$(document).ready(function () {
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ipaddress = e.ip;
    });
    allocd = localStorage.budgetallocationrowid;
    budgetAllocationRuleObject.do_loadcaption();
    budgetAllocationRuleObject.do_populateDimensionDropdown(1, $("#dddimvale_1"));
    budgetAllocationRuleObject.do_loaddata(-1, 'getlist');
    budgetAllocationRuleObject.do_getUserPagepermission();
    
});

var budgetAllocationRuleObject = {
    rowid: '',
    _dimensionmenuid: '',
    _vieweperm: false,
    _createperm: '',
    _editperm: false,
    _deleteperm: false,
    _addressdetailsmenuid: '',
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(budgetAllocationRuleObject);

        budgetAllocationRuleObject._vieweperm = MainObject.do_IsActionMenuPermission(budgetAllocationRuleObject.access, tblname, 'view');
        budgetAllocationRuleObject._createperm = MainObject.do_IsActionMenuPermission(budgetAllocationRuleObject.access, tblname, 'create');
        budgetAllocationRuleObject._editperm = MainObject.do_IsActionMenuPermission(budgetAllocationRuleObject.access, tblname, 'edit');
        budgetAllocationRuleObject._deleteperm = MainObject.do_IsActionMenuPermission(budgetAllocationRuleObject.access, tblname, 'delete');

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
                    for (var i = 0; i < response.length; i++) {
                        $('#lbl_dimension_' + response[i].dimId).html(response[i].dimCaption);
                        $('#splbldim' + response[i].dimId).text(response[i].dimCaption);
                        
                    }



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
                    budgetAllocationRuleObject.do_populateDimensionDropdown(2, $("#dddimvale_2"));
                }
                if (cdimId == 2) {
                    budgetAllocationRuleObject.do_populateDimensionDropdown(3, $("#dddimvale_3"));
                }
                if (cdimId == 3) {
                    budgetAllocationRuleObject.do_populateDimensionDropdown(4, $("#dddimvale_4"));
                }
                if (cdimId == 4) {
                    budgetAllocationRuleObject.do_populateDimensionDropdown(5, $("#dddimvale_5"));
                }
                if (cdimId == 5) {
                    budgetAllocationRuleObject.do_populateDimensionDropdown(6, $("#dddimvale_6"));
                }
                if (cdimId == 6) {
                    budgetAllocationRuleObject.do_populateDimensionDropdown(7, $("#dddimvale_7"));
                }
                if (cdimId == 7) {
                    budgetAllocationRuleObject.do_populateDimensionDropdown(8, $("#dddimvale_8"));
                }
                if (cdimId == 8) {
                    budgetAllocationRuleObject.do_populateDimensionDropdown(9, $("#dddimvale_9"));
                }
                if (cdimId == 9) {
                    budgetAllocationRuleObject.do_populateDimensionDropdown(10, $("#dddimvale_10"));
                }
                if (cdimId == 10) {

                    //budgetAllocationRuleObject.do_loaddata();
                }

                




            },
            error: function (err) {
                //budgetAllocationRuleObject.do_loaddata();
                alert(err.responseText);
            }
        });
    }
    ,
    //############################################################### populate Data from database ##############################
    do_loaddata: (id, mode) => {
        var issBlock = 0
        var created_by, creator_MAC_add, CoCd;
       

        var AlloPer = 0;
        var dim1ValueId =-1;
        var dim2ValueId = -1;
        var dim3ValueId = -1;
        var dim4ValueId = -1;
        var dim5ValueId = -1;
        var dim6ValueId = -1;
        var dim7ValueId = -1;
        var dim8ValueId = -1;
        var dim9ValueId = -1;
        var dim10ValueId = -1;
        


        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
        // budgrpid = 4;// localStorage.budgrpoverviewrowid;




        //budgetAllocationRuleObject.rowid = '-1';


        //var _data;
        //_data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
        console.log('id')
        console.log(id);
        console.log(mode);
        $.ajax({
            url: apiurl + 'api/GeneralLedgerBudgetAllocationRuleOperation',
            type: 'POST',
            data: { p_mode: mode, RowId: id, CoCd: CoCd, AlloId: allocd, AlloPer: AlloPer, dim1ValueId: dim1ValueId, dim2ValueId: dim2ValueId, dim3ValueId: dim3ValueId, dim4ValueId: dim4ValueId, dim5ValueId: dim5ValueId, dim6ValueId: dim6ValueId, dim7ValueId: dim7ValueId, dim8ValueId: dim8ValueId, dim9ValueId: dim9ValueId, dim10ValueId: dim10ValueId,   IsBlock: issBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                var obj = response;
                
                console.log('Hello');
                console.log(response);

                if (mode == 'getlist') {

                    budgetAllocationRuleObject.do_populateAllData(obj);
                }
                if (mode == 'edit') {
                    budgetAllocationRuleObject.do_populateDataForEdit(obj);
                }
            },
            error: function (err) {
                alert(err.statusText);
            }
        });


    },
    do_populateDataForEdit: (obj) => {
        budgetAllocationRuleObject.rowid = obj[0].RowId;
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
                { label: "AlloPer", name: "AlloPer" },
                { label: "dim1Value", name: "dim1Value" },
                { label: "dim2Value", name: "dim2Value" },
                { label: "dim3Value", name: "dim3Value" },

                { label: "dim4Value", name: "dim4Value" },
                { label: "dim5Value", name: "dim5Value" },
                { label: "dim6Value", name: "dim6Value" },
                { label: "dim7Value", name: "dim7Value" },
                { label: "dim8Value", name: "dim8Value" },
                { label: "dim9Value", name: "dim9Value" },
                { label: "dim10Value", name: "dim10Value" }
            ],
        });

        var roletable = $("#item_table");

        var roledata = [];
        roledata = obj;

        roletable.dataTable({
            //dom: "Bfrtip",
            dom: "lBfrtip",
            "bDestroy": true,
            fixedHeader: true,
            "pageLength": 10,
            data: roledata,
            columns: [
                { data: "AlloPer" },
                { data: "dim1Value" },
                { data: "dim2Value" },
                { data: "dim3Value" },

                { data: "dim4Value" },
                { data: "dim5Value" },
                { data: "dim6Value" },
                { data: "dim7Value" },
                { data: "dim8Value" },
                { data: "dim9Value" },
                { data: "dim10Value" },
               
            ],

            select: true,
            //scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [
               
                {

                    add: "create", text: 'Add Row', editor: editor, action: function () { roleaction('-1', 'add'); },
                    attr: {
                        title: 'New',
                        id: 'country_overview_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { roleaction($('.selected').attr('rowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'country_overview_Edit'
                    },
                },
                {
                    extend: "remove", editor: editor, action: function () { roleaction($('.selected').attr('rowId'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'country_overview_delete'
                    },
                },
                {
                    add: "view", text: 'View', editor: editor, action: function () { roleaction($('.selected').attr('rowId'), 'view'); },
                    attr: {
                        title: 'View',
                        id: 'country_overview_View'
                    }

                }


            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowId", `${data.RowId}`);
            },
        });

        var table = $('#item_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {

                if (!budgetAllocationRuleObject._deleteperm[0]) {
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


        if (!budgetAllocationRuleObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!budgetAllocationRuleObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }

        if (!budgetAllocationRuleObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }

        if (!budgetAllocationRuleObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view item price !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
    },
    do_loaddataedit: (id) => {
        budgetAllocationRuleObject.do_loaddata(id, 'edit');
    },

}// End of Object
var showmodal = function () {
    $("#myModalNEW").modal('show');
};

var datablank = () => {
    $('#txtpercent').val('');
    for (var i = 0; i < 10; i++) {
        $("#dddimvale_" + (i + 1)).val(-1);
    }
}
//################################################ Roleaction ##########################################
var roleaction = function (rowId, mode) {
    console.log(mode);
    console.log(rowId);
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);
 

    if (mode == 'add') {
        datablank();
        companylogo = "";
        budgetAllocationRuleObject.rowid = '-1';

        showmodal();
        $('.modal-title').html('Budget Allocation Rule - New');


        $('#btnSave').text('Add');
        $('#btnSave').show();
        //$('.readOnly').attr("disabled", false);

        //$('#txtCode').prop("disabled", false);

    }
    if (mode == 'edit') {
        
        datablank();
        showmodal();

        $('.modal-title').html('Budget Allocation Rule - Edit');

        //
        if (!budgetAllocationRuleObject._deleteperm[0]) {
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

        budgetAllocationRuleObject.rowid = rowId;
        budgetAllocationRuleObject.do_loaddataedit(rowId);

    }
    else if (mode == 'view') {
        datablank();
        showmodal();

        $('.modal-title').html('Budget Allocation Rule - View');
        $('#cbBlock').show();
        // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!budgetAllocationRuleObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete!!!');
        } else { $('#country_overview_delete').show(); }
        if (!budgetAllocationRuleObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();

        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        budgetAllocationRuleObject.rowid = rowId;
        budgetAllocationRuleObject.do_loaddataedit(rowId);
    }

    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {

                    budgetAllocationRuleObject.rowid = rowId;
                    var issBlock = 1
                    var created_by, creator_MAC_add, CoCd;



                    creator_MAC_add = ipaddress;
                    created_by = $("#txt").val();
                    CoCd = $("#ddlCompany").val();

                    var AlloPer = 0;
                    var dim1ValueId = -1;
                    var dim2ValueId = -1;
                    var dim3ValueId = -1;
                    var dim4ValueId = -1;
                    var dim5ValueId = -1;
                    var dim6ValueId = -1;
                    var dim7ValueId = -1;
                    var dim8ValueId = -1;
                    var dim9ValueId = -1;
                    var dim10ValueId = -1;



                    //alert(rowId);
                    // _data = '{rowid:"' + rowId + '"}';
                    $.ajax({
                        url: apiurl + 'api/GeneralLedgerBudgetAllocationRuleOperation',
                        type: 'POST',
                        data: { p_mode: 'remove', RowId: rowId, CoCd: CoCd, AlloId: allocd, AlloPer: AlloPer, dim1ValueId: dim1ValueId, dim2ValueId: dim2ValueId, dim3ValueId: dim3ValueId, dim4ValueId: dim4ValueId, dim5ValueId: dim5ValueId, dim6ValueId: dim6ValueId, dim7ValueId: dim7ValueId, dim8ValueId: dim8ValueId, dim9ValueId: dim9ValueId, dim10ValueId: dim10ValueId, IsBlock: issBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            if (response[0].msg == "true") {
                                validate = true;
                                $.alertable.alert(`Data deleted successfully.`, ``, `Ok`, ``).then(function () {
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
//############################################### end of roleaction #################################
var savedata = () => {
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
    if (parseInt(budgetAllocationRuleObject.rowid) > 0) {
        id = budgetAllocationRuleObject.rowid;
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