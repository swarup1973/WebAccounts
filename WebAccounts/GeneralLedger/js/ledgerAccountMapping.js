var ipaddress = "";
var CoCd = '';
var objItem;
var tblname = 'LEDGER ACCOUNT MAPPING';
var budgrpid = -1;
$(document).ready(function () {
    let editor;
    CoCd = $("#ddlCompany").val();
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ipaddress = e.ip;
    });

    /* localStorage.itemmasteroverviewrowid make it -1 when call from other page */


    budgrpid = localStorage.budgetgrouprowid;
   
    $("#ddledgercode").change(function () {
        ledgerAccountMappingObject.do_FetchLedgerDescription();
    });
    ;// localStorage.budgrpoverviewrowid;
    
    ledgerAccountMappingObject.do_populateLedgerCode();
    ledgerAccountMappingObject.do_loaddata(-1,'getlist');

    ledgerAccountMappingObject.do_getUserPagepermission();

}
);
//

var ledgerAccountMappingObject = {
    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _addressdetailsmenuid: '',
    //#################################### 
    do_populateLedgerCode: () => {
        
        $.ajax({
            url: apiurl + 'api/GetAccountCode',
            type: 'POST',
            data: { CoCd: $("#ddlCompany").val(), budgroupid: budgrpid },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objVendor = response;
                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].AcId + "'>" + response[i].AcDesc + "</option>"
                    );
                }
                $("#ddledgercode").html(_html.join(""));
                





            },
            error: function (err) {
                alert(err.responseText);
            }
        });

    },

    do_FetchLedgerDescription: () => {

        $.ajax({
            url: apiurl + 'api/FetchLedgerDescription',
            type: 'POST',
            data: { CoCd: $("#ddlCompany").val(), AcId: $('#ddledgercode').val(), budgroupid: budgrpid  },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                var AcDesc = response[0].AcDesc;
                var AcSrcDesc = response[0].AcSrcDesc;
                var AcAlias = response[0].AcAlias;
                var AcTypeCd = response[0].AcTypeCd;
                var grpCd = response[0].grpCd;
                var grouptype = response[0].grouptype;
                var budggroupdec = response[0].budggroupdec;
                $('#description').val(AcDesc);
                $('#ltype').val(AcTypeCd);
                $('#lgroup').val(budggroupdec);


            },
            error: function (err) {
                alert(err.responseText);
            }
        });

    },
    do_loaddataedit: (id) => {
        ledgerAccountMappingObject.do_loaddata(id, 'edit');
    },
    ///######################################## user permission 
    //############################################################### populate Data from database ##############################
    do_loaddata: (id, mode) => {
        var issBlock = 0
        var created_by, creator_MAC_add, CoCd, AcCd='';
        var ddledgercode, description, ltype, lgroup;

        

        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
       // budgrpid = 4;// localStorage.budgrpoverviewrowid;


        

        //ledgerAccountMappingObject.rowid = '-1';


        //var _data;
        //_data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
        console.log('id')
        console.log(id);
        console.log(mode);
            $.ajax({
                url: apiurl + 'api/GeneralLedgerBudgetLedgerGroupMap',
                type: 'POST',
                data: { p_mode: mode, RowId: id, CoCd: CoCd, BudGrpId: budgrpid, AcCd: AcCd, IsBlock: issBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                   
                    
                    if (mode == 'getlist') {

                        ledgerAccountMappingObject.do_populateAllData(obj);
                    }
                    if (mode == 'edit') {
                        ledgerAccountMappingObject.do_populateDataForEdit(obj);
                    }
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });


    },
    do_populateDataForEdit: (obj) => {
        ledgerAccountMappingObject.rowid = obj[0].rowid;
        $('#ddledgercode').val(obj[0].AcCd);
        $('#description').val(obj[0].Description);
        $('#ltype').val(obj[0].LType);
        $('#lgroup').val(obj[0].LGroup);

      
    },
    do_populateAllData: (obj)=> {
        var editor = new $.fn.dataTable.Editor({
            table: "#item_table",
            fields: [
                { label: "LedgerCode", name: "LedgerCode" },
                { label: "Description", name: "Description" },
                { label: "LType", name: "LType" },
                { label: "LGroup", name: "LGroup" }

            ],
        });

        var roletable = $("#item_table");

        var roledata = [];
        roledata = obj;

        roletable.dataTable({
            //dom: "Bfrtip",
            dom: "lBfrtip",
            "bDestroy": true,
            "pageLength": 10,
            data: roledata,
            columns: [
                { data: "LedgerCode" },
                { data: "Description" },
                { data: "LType" },
                { data: "LGroup" }

            ],

            select: true,
            //scrollX: true,
            lengthMenu: [5, 10, 25, 50, 100],
            buttons: [
                {

                    add: "createAuto", text: 'Load Ledgers Automatically', editor: editor, action: function () { roleaction('-1', 'addauto'); },
                    attr: {
                        title: 'Auto',
                        id: 'country_overview_createauto'
                    },
                },
                {

                    add: "create", text: 'Add Row Manually', editor: editor, action: function () { roleaction('-1', 'add'); },
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


            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowid", `${data.rowid}`);
            },
        });

        var table = $('#item_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {

                if (!ledgerAccountMappingObject._deleteperm[0]) {
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


        if (!ledgerAccountMappingObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!ledgerAccountMappingObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }

        if (!ledgerAccountMappingObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }

        if (!ledgerAccountMappingObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view !!!');
            table.button(4).action(function () {
                this.active(false);
            });
        }
        if (!ledgerAccountMappingObject._autocreateperm[0]) {
            $('#country_overview_createauto').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_createauto').prop("disabled", true);
            $('#country_overview_createauto').attr('title', 'do not have permission to view !!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
    },

    //####################################################### end of populate Data ######################
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(ledgerAccountMappingObject);

        ledgerAccountMappingObject._vieweperm = MainObject.do_IsActionMenuPermission(ledgerAccountMappingObject.access, tblname, 'view');
        ledgerAccountMappingObject._createperm = MainObject.do_IsActionMenuPermission(ledgerAccountMappingObject.access, tblname, 'create');
        ledgerAccountMappingObject._editperm = MainObject.do_IsActionMenuPermission(ledgerAccountMappingObject.access, tblname, 'edit');
        ledgerAccountMappingObject._deleteperm = MainObject.do_IsActionMenuPermission(ledgerAccountMappingObject.access, tblname, 'delete');
        ledgerAccountMappingObject._autocreateperm = MainObject.do_IsActionMenuPermission(ledgerAccountMappingObject.access, 'LOAD LEDGERS AUTOMATICALLY', 'view');

    },

    //######################################## end of permission
}

//################################################ Roleaction ##########################################
var roleaction = function (rowId, mode) {
    console.log(rowId);
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);
    if (mode == 'addauto') {
        addauto();
    }
  
    if (mode == 'add') {
        datablank();
        companylogo = "";
        ledgerAccountMappingObject.rowid = '-1';
        
        showmodal();
        $('.modal-title').html('Ledger Account Mapping - New');

       
        $('#btnSave').text('Save');
        $('#btnSave').show();
        $('.readOnly').attr("disabled", false);

        //$('#txtCode').prop("disabled", false);

    }
    if (mode == 'edit') {
        datablank();
        showmodal();
       
        $('.modal-title').html('Ledger Account Mapping - Edit');
       
        //
        if (!ledgerAccountMappingObject._deleteperm[0]) {
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

        ledgerAccountMappingObject.rowid = rowId;
        ledgerAccountMappingObject.do_loaddataedit(rowId);

    }
    else if (mode == 'view') {
        datablank();
        showmodal();
        
        $('.modal-title').html('Ledger Account Mapping - View');
        $('#cbBlock').show();
        // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!ledgerAccountMappingObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete!!!');
        } else { $('#country_overview_delete').show(); }
        if (!ledgerAccountMappingObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();

        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        ledgerAccountMappingObject.rowid = rowId;
        ledgerAccountMappingObject.do_loaddataedit(rowId);
    }

    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    
                    ledgerAccountMappingObject.rowid = rowId;
                    var issBlock = 1
                    var created_by, creator_MAC_add, CoCd, AcCd=-1 ;
                   


                    creator_MAC_add = ipaddress;
                    created_by = $("#txt").val();
                    CoCd = $("#ddlCompany").val();
                    


                    

                   // _data = '{rowid:"' + rowId + '"}';
                    $.ajax({
                        url: apiurl + 'api/GeneralLedgerBudgetLedgerGroupMap',
                        type: 'POST',
                        data: { p_mode: 'remove', RowId: parseInt(ledgerAccountMappingObject.rowid), CoCd: CoCd, BudGrpId: budgrpid, AcCd: AcCd, IsBlock: issBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            if (response[0].msg == "true") {
                                validate = true;
                                $.alertable.alert(`Data deleted successfully.`, ``, `Ok`, ``).then(function () {
                                    if (queryString('id') != undefined || queryString("id") != null) {
                                        window.location = "ledger-account-mapping.aspx?id=" + queryString('id');
                                    }
                                    else {
                                        window.location = "ledger-account-mapping.aspx";
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
var addauto = () => {
    $.alertable.custconfirm(`Do you want to add the records automatically ?`, ``, `Yes`, `No`)
        .then(
            function () {

                
                var issBlock = 0;
                var created_by, creator_MAC_add, CoCd, AcCd = -1;



                creator_MAC_add = ipaddress;
                created_by = $("#txt").val();
                CoCd = $("#ddlCompany").val();





                // _data = '{rowid:"' + rowId + '"}';
                $.ajax({
                    url: apiurl + 'api/GeneralLedgerBudgetLedgerGroupMap',
                    type: 'POST',
                    data: { p_mode: 'createauto', RowId: -1, CoCd: CoCd, BudGrpId: budgrpid, AcCd: AcCd, IsBlock: issBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    success: function (response) {
                        if (response[0].msg == "true") {
                            validate = true;
                            $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                                if (queryString('id') != undefined || queryString("id") != null) {
                                    window.location = "ledger-account-mapping.aspx?id=" + queryString('id');
                                }
                                else {
                                    window.location = "ledger-account-mapping.aspx";
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
var datablank = function () {
    $('#ddledgercode').val('-1');
    $('#description').val('');
    $('#ltype').val('');
    $('#lgroup').val('');
}
//################################################# Start of  Savedata ##################################
var savedata = function () {
    var validate = true;
    //price
    if ($('#ddledgercode').val() == '-1') {
        validate = false;
        $.alertable.alert(`Ledger code required.`);
        $("#ddledgercode").focus();
        return false;
    }
    

        $('#btnSave').prop("disabled", true);


        saveFinal(-1);

   


};
function saveFinal(imgId) {
    var issBlock = 0
    var created_by, creator_MAC_add, CoCd,  AcCd = '';
 

    AcCd = $('#ddledgercode').val();

    creator_MAC_add = ipaddress;
    created_by = $("#txt").val();
    CoCd = $("#ddlCompany").val();

    console.log('budgrpid');
    console.log(budgrpid);
    console.log(ledgerAccountMappingObject.rowid);
    if (parseInt(ledgerAccountMappingObject.rowid) > 0) {
        $.ajax({

            url: apiurl + 'api/GeneralLedgerBudgetLedgerGroupMap',
            type: 'POST',
            data: { p_mode: 'update', RowId: parseInt(ledgerAccountMappingObject.rowid), CoCd: CoCd, BudGrpId: budgrpid, AcCd: AcCd, IsBlock: issBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);


                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        if (queryString('id') != undefined || queryString("id") != null) {
                            window.location = "ledger-account-mapping.aspx?id=" + queryString('id');
                        }
                        else {
                            window.location = "ledger-account-mapping.aspx";
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
            error: function (ex) {
                $('#btnSave').prop("disabled", false);
                alert(ex.responseText);
            }
        });
    }
    else {
       
        $.ajax({
            url: apiurl + 'api/GeneralLedgerBudgetLedgerGroupMap',
            type: 'POST',
            data: { p_mode: 'create', RowId: -1, CoCd: CoCd, BudGrpId: budgrpid, AcCd: AcCd, IsBlock: issBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);
                console.log(response);
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                        if (queryString('id') != undefined || queryString("id") != null) {
                            window.location = "ledger-account-mapping.aspx?id=" + queryString('id');
                        }
                        else {
                            window.location = "ledger-account-mapping.aspx";
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
            error: function (ex) {
                $('#btnSave').prop("disabled", false);
                console.log(ex);
                alert(ex.responseText);
            }
        });
    }
}
var showmodal = function () {
    $("#myModalEDIT").modal('show');
};

