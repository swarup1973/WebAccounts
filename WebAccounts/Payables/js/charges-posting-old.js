var ipaddress = "";
var objVendor;
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
    //ChargesPostingOverviewObject.do_loaddata();

    
    //ChargesPostingOverviewObject.do_loaddata();
    ChargesPostingOverviewObject.do_populateMasterDropdown('E');
    ChargesPostingOverviewObject.do_getUserPagepermission();
  
    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var ChargesPostingOverviewObject = {

    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _accountmapvieweperm: '',
    _accountmapmenuid : '',
    do_loaddata: () => {
        var created_by, creator_MAC_add, CoCd, IsBlock, ChargCd, ChargesDesc, Purchase_CostPostType, Purchase_DebitPost, Sales_CreditPost;
        IsBlock = 0
        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
        ChargCd = '';
        ChargesDesc = '';
        Purchase_CostPostType = '';
        Purchase_DebitPost = '';
        Sales_CreditPost = '';

        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),

            $.ajax({

                url: apiurl + 'api/PayablesChargesOperation',
                type: 'POST',
                data: { mode: "getlist", RowId: -1, CoCd: CoCd, IsBlock: IsBlock, created_by: created_by, creator_MAC_add: creator_MAC_add, ChargCd: ChargCd, ChargesDesc: ChargesDesc, Purchase_CostPostType: Purchase_CostPostType, Purchase_DebitPost: Purchase_DebitPost, Sales_CreditPost: Sales_CreditPost },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                  
                    ChargesPostingOverviewObject.do_populateData(obj);
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
                { label: "ChargCd", name: "ChargCd" },
                { label: "ChargesDesc", name: "ChargesDesc" }
                
              
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
                { data: "ChargCd" },
                { data: "ChargesDesc" }
               
            ],
            select: true,
            //scrollX: true,
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
                    add: "PostingSetup", text: 'Posting Setup', editor: editor, action: function () { otherWindow($('.selected').attr('rowid'), 'POSTINGSETUP'); },
                    attr: {
                        title: 'Posting Setup',
                        id: 'country_overview_PostingSetup'
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
               
                if (!ChargesPostingOverviewObject._deleteperm[0]) {
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


        if (!ChargesPostingOverviewObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!ChargesPostingOverviewObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        
        if (!ChargesPostingOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
     
        if (!ChargesPostingOverviewObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
        
       

    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(ChargesPostingOverviewObject);
        
        ChargesPostingOverviewObject._vieweperm = MainObject.do_IsActionMenuPermission(ChargesPostingOverviewObject.access, 'CHARGES', 'view');
        ChargesPostingOverviewObject._createperm = MainObject.do_IsActionMenuPermission(ChargesPostingOverviewObject.access, 'CHARGES', 'create');
        ChargesPostingOverviewObject._editperm = MainObject.do_IsActionMenuPermission(ChargesPostingOverviewObject.access, 'CHARGES', 'edit');
        ChargesPostingOverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(ChargesPostingOverviewObject.access, 'CHARGES', 'delete');
     

    },
  
    do_populateMasterDropdown: (ctype) => {
        
        $.ajax({
            url: apiurl + 'api/GetfaAccMasterbyAcTypeCd',
            type: 'POST',
            data: { CoCd: $("#ddlCompany").val(), AcTypeCd: ctype },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
               
                var _html = [];
                _html.push("<option value='-1'>--Select--</option>")
                for (var i = 0; i < response.length; i++) {
                    _html.push(
                        "<option value='" + response[i].AcCd + "'>" + response[i].AcDesc + "</option>"
                    );
                }
                if (ctype == 'E') {
                    
                    $("#ddDebit").html(_html.join(""));
                    ChargesPostingOverviewObject.do_populateMasterDropdown('L');
                }
                if (ctype == 'L') {
                    
                    $("#ddCredit").html(_html.join(""));
                    ChargesPostingOverviewObject.do_loaddataedit(localStorage.chargesOverViewid);
                }
                
               
              

                
               
            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    },
   
    do_loaddataedit: (id) => {
        var issBlock = 0
        var created_by, creator_MAC_add, CoCd, IsBlock, ChargCd, ChargesDesc, Purchase_CostPostType, Purchase_DebitPost, Sales_CreditPost;


        IsBlock = 0
        creator_MAC_add = ipaddress;
        created_by = $("#txt").val();
        CoCd = $("#ddlCompany").val();
        ChargCd = '';
        ChargesDesc = '';
        Purchase_CostPostType = '';
        Purchase_DebitPost = '';
        Sales_CreditPost = '';

        $.ajax({


            url: apiurl + 'api/PayablesChargesOperation',
            type: 'POST',
            data: { mode: "edit", RowId: id, CoCd: CoCd, IsBlock: IsBlock, created_by: created_by, creator_MAC_add: creator_MAC_add, ChargCd: ChargCd, ChargesDesc: ChargesDesc, Purchase_CostPostType: Purchase_CostPostType, Purchase_DebitPost: Purchase_DebitPost, Sales_CreditPost: Sales_CreditPost },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {

                
                
                ChargesPostingOverviewObject.rowid = response[0].RowId;
                $("#selectMe").val(response[0].Purchase_CostPostType);
                $("#ddDebit").val('-1');
                $("#ddCredit").val('-1');
                if (response[0].Purchase_CostPostType == 'L') {
                    $('#ddDebit').prop("disabled", false);
                }
                if (response[0].Purchase_DebitPost != '') {
                    $("#ddDebit").val(response[0].Purchase_DebitPost);
                }
                if (response[0].Purchase_CostPostType != '') {
                    $("#ddCredit").val(response[0].Sales_CreditPost);
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
                data: { p_mode: "getlist", LocationCd: '', CoCd: $("#ddlCompany").val(), LocationDesc: '', WhId: ChargesPostingOverviewObject.rowid, AisleNo: -1, RackNo: -1, SelfNo: -1, BinNo: "-1", created_by: $("#txt").val(), RowId: -1 },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    ChargesPostingOverviewObject.do_loadwarehouselocationData(obj);
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
  
    if (($('#selectMe').val() == 'L') && ($('#ddDebit').val() == undefined || $('#ddDebit').val() == '-1')) {
        validate = false;
        gotfocus($("#ddDebit"));
        $.alertable.alert(`Debit Posting for Expense required.`);
        //$("#txtCode").focus();
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
    var created_by, creator_MAC_add, CoCd, IsBlock, ChargCd, ChargesDesc, Purchase_CostPostType, Purchase_DebitPost,Sales_CreditPost;

    IsBlock=0
    creator_MAC_add = ipaddress;
    created_by = $("#txt").val();
    CoCd = $("#ddlCompany").val();
    ChargCd = '';
    ChargesDesc = '';
    Purchase_CostPostType = '';
    Purchase_DebitPost = '';
    Sales_CreditPost = '';

    Purchase_CostPostType = $("#selectMe").val();
    Purchase_DebitPost = $("#ddDebit").val();
    Sales_CreditPost = $("#ddCredit").val();
    
   
    
    $.ajax({
        url: apiurl + 'api/PayablesChargesOperation',
        type: 'POST',
        data: { mode: "updateall", RowId: localStorage.chargesOverViewid, CoCd: CoCd, IsBlock: IsBlock, created_by: created_by, creator_MAC_add: creator_MAC_add, ChargCd: ChargCd, ChargesDesc: ChargesDesc, Purchase_CostPostType: Purchase_CostPostType, Purchase_DebitPost: Purchase_DebitPost, Sales_CreditPost: Sales_CreditPost },

        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            //alert(response.length);
            //alert(response[0].CountryCd);
            console.log(response);
            if (response[0].msg == "true") {
                validate = true;
                $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                    window.location = "charges-posting-setup.aspx";
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


var otherWindow = function (countryCd, mode) {
    
    if (countryCd == "" || countryCd == undefined || countryCd == "undefined") return;
  
    localStorage.budgetgrouprowid = countryCd;
    //$('#addressbook').DataTable().rows('.selected').data()[0].AddressCode
    if (localStorage.budgetgrouprowid) {
        if (mode == "POSTINGSETUP") {

            //localStorage.menu_id_premission = ChargesPostingOverviewObject._accountmapmenuid[1];
            //localStorage.clickedmenu_id = ChargesPostingOverviewObject._accountmapmenuid[1];

          
            //localStorage.itemmasteroverviewitemno = $('#addressbook').DataTable().rows('.selected').data()[0].ItemCd;
            //localStorage.itemmasteroverviewitemdesc = $('#addressbook').DataTable().rows('.selected').data()[0].ItemType;
            
            //window.open('ledger-account-mapping.aspx');
            location.href = 'charges-posting-setup.aspx';
            
        }
        
    }
    
}

var datablank = function () {
    companylogo = "";
    contentType = "";
    $("#txtCode").val('');
    $("#txtDescription").val('');
   
}
var roleaction = function (rowId, mode) {
    
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);
  
    if (mode == "viewlocation") {
        ChargesPostingOverviewObject.rowid = rowId;
        showmodalview();

    }
    if (mode == 'add') {
        companylogo = "";
        ChargesPostingOverviewObject.rowid = '-1';
        showmodal();
        $('.modal-title').html('Charges - New');

        datablank();
        $('#btnSave').text('Save');
        $('#btnSave').show();
        //$('.readOnly').attr("disabled", false);
       
        $('#txtCode').prop("disabled", false);

    }
    if (mode == 'edit') {
        showmodal();
        
        $('.modal-title').html('Charges - Edit');
        $('#cbBlock').show();
        datablank();
        if (!ChargesPostingOverviewObject._deleteperm[0]) {
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
        ChargesPostingOverviewObject.rowid = rowId;
        ChargesPostingOverviewObject.do_loaddataedit(rowId);
        
    }
    else if(mode == 'view') {
        showmodal();
        datablank();
        $('.modal-title').html('Charges - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!ChargesPostingOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!ChargesPostingOverviewObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        ChargesPostingOverviewObject.rowid = rowId;
        ChargesPostingOverviewObject.do_loaddataedit(rowId);
    }
    
    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    var created_by, creator_MAC_add, BudGrpCd, CoCd, BudGrpDesc, IsBlock, LedTypeCd;


                    IsBlock = 0
                    creator_MAC_add = ipaddress;
                    created_by = $("#txt").val();
                    CoCd = $("#ddlCompany").val();
                    BudGrpCd = '';
                    BudGrpDesc = '';
                    LedTypeCd = '';
                    $.ajax({
                        url: apiurl + 'api/GeneralLedgerBudgetGroupOperation',
                        type: 'POST',
                        data: { p_mode: "delete", RowId: rowId, BudGrpCd: BudGrpCd, BudGrpDesc: BudGrpDesc, LedTypeCd: LedTypeCd, CoCd: CoCd, IsBlock: IsBlock, created_by: created_by, creator_MAC_add: creator_MAC_add },
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {

                            if (response[0].msg == "true") {
                                validate = true;
                                $.alertable.alert(`Data removed successfully.`, ``, `Ok`, ``).then(function () {
                                    window.location = "charges-overview.aspx";
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
    ChargesPostingOverviewObject.do_populateLocationDropdown('STATE', $('#ddPincodeCountry').val(), $('#ddPincodeCounty'));
}
function PopulateCity() {
    ChargesPostingOverviewObject.do_populateLocationDropdown('CITY', $('#ddPincodeCounty').val(), $('#ddPincodeCity'));
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
