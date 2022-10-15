var ipaddress = "";
var objCountry;
var companylogo="";
var contentType="";
var imgfileName="";
$(document).ready(function () {
    $("#SameAsPA").change(function () {
      
        if ($('#SameAsPA').is(':checked')) {
            $("#txtInvoiceAddress").val($("#txtPrimaryAddress1").val());
            $("#txtInvoiceAddress2").val($("#txtPrimaryAddress2").val());

            $("#txtInvoiceContactPerson").val($("#txtPrimaryResponsiblePerson").val());
            $("#txtInvoiceEmail").val($("#txtPrimaryEmail").val());
            $("#txtInvoicPhone").val($("#txtPrimaryPhone").val());
            $("#txtInvoiceFax").val($("#txtPrimaryFax").val());

            $("#txtInvoiceAddressPostCode").val($("#txtPrimaryAddressPostCode").val());
            $("#txtInvoiceAddressPostId").val($("#txttPrimaryAddressPostId").val());
            $("#txtInvoiceAddressCity").val($("#txtPrimaryAddresstxtCity").val());
            $("#txtInvoiceAddressCountry").val($("#txtPrimaryAddresstxtCountry").val());
            $("#txtInvoiceAddressCounty").val($("#txtPrimaryAddresstxtCounty").val());
        }
        else {
            $("#txtInvoiceAddress").val('');
            $("#txtInvoiceAddress2").val('');

            $("#txtInvoiceContactPerson").val('');
            $("#txtInvoiceEmail").val('');
            $("#txtInvoicPhone").val('');
            $("#txtInvoiceFax").val('');

            $("#txtInvoiceAddressPostCode").val('');
            $("#txtInvoiceAddressPostId").val('-1');
            $("#txtInvoiceAddressCity").val('');
            $("#txtInvoiceAddressCountry").val('');
            $("#txtInvoiceAddressCounty").val('');
        }

    });

    $("#SameAsIA").change(function () {

        if ($('#SameAsIA').is(':checked')) {
            $("#txtShippingAddress").val($("#txtInvoiceAddress").val());
            $("#txtShippingAddress2").val($("#txtInvoiceAddress2").val());

            $("#txtShippingContactPerson").val($("#txtInvoiceContactPerson").val());
            $("#txtShippingEmail").val($("#txtInvoiceEmail").val());
            $("#txtShippingPhone").val($("#txtInvoicPhone").val());
            $("#txtShippingFax").val($("#txtInvoiceFax").val());

            $("#txtShippingAddressPostCode").val($("#txtInvoiceAddressPostCode").val());
            $("#txtShippingAddressPostId").val($("#txtInvoiceAddressPostId").val());
            $("#txtShippingCity").val($("#txtInvoiceAddressCity").val());
            $("#txtShippingCountry").val($("#txtInvoiceAddressCountry").val());
            $("#txtShippingCounty").val($("#txtInvoiceAddressCounty").val());
        }
        else {
            $("#txtShippingAddress").val('');
            $("#txtShippingAddress2").val('');

            $("#txtShippingContactPerson").val('');
            $("#txtShippingEmail").val('');
            $("#txtShippingPhone").val('');
            $("#txtShippingFax").val('');

            $("#txtShippingAddressPostCode").val('');
            $("#txtShippingAddressPostId").val('-1');
            $("#txtShippingCity").val('');
            $("#txtShippingCountry").val('');
            $("#txtShippingCounty").val('');
        }

    });

    var cuserid = '<%=Session["userid"].ToString() %>';
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ipaddress = e.ip;
    });      
    //localStorage.menu_id_premission = 326;
    if (localStorage.CompanyOverviewmenuid == '' || localStorage.CompanyOverviewmenuid == undefined) {
        localStorage.CompanyOverviewmenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage.CompanyOverviewmenuid;
    }
    //setImage();
    $("#myModal").modal({
        show: false,
        backdrop: 'static'
    });

    $("#click-me").click(function () {
        $("#myModal").modal("show");
    });

    localStorage.menu_id_premission;
    CompanyOverviewObject.do_populateLocationDropdown('COUNTRY', -1, $('#ddPincodeCountry'));
    CompanyOverviewObject.do_populateMasterDropdown('ORGANISATIONTYPE', $('#ddOrganization'));
    //CompanyOverviewObject.do_populateMasterDropdown('BUSINESSNATURE', $('#ddBusiness'));
    //CompanyOverviewObject.do_populateMasterDropdown('CURRENCY', $('#ddCurrency'));
    /*CompanyOverviewObject.do_populateMasterDropdown('BANK', $('#ddBankcode'));*/
    
    //CompanyOverviewObject.do_loaddata();
    CompanyOverviewObject.do_getUserPagepermission();
  
    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var CompanyOverviewObject = {

    rowid: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _addressdetailsmenuid : '',
    do_loaddata: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            $.ajax({
                //url: apiurl + 'api/administratorCompanyProfileOperation',
                url: apiurl + 'api/administratorCompanyProfileOperationFetch',
                type: 'POST',
                data: { p_mode: "getlist", Row_Id: -1, CoCd: '', CoName: '', IsBlock: 0, OrgTypeId: -1, NOB_Id: -1, CoRegNo: '-1', LCurrCd: '-1', FYearStartMon: '-1', CompanyLogo: null, PA_Address: '-1', PA_Address2: '-1', PA_Phone1: '-1', PA_Fax: '-1', PA_Email: '-1', PA_RespPerson: '-1', PA_Web: '-1', BankId: '-1', SameAsPA: 0, IA_Address: '-1', IA_Address2: '-1', SameAsIA: 0, SA_Address: '-1', SA_Address2: '-1', SA_Email: '-1', SA_Phone: '-1', SA_Fax: '-1', TaxYrStartMonth: '-1', EIN: '-1', SSN: '-1', created_by: $("#txt").val(), creater_MAC_add: ipaddress },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    CompanyOverviewObject.do_populatewarehouseData(obj);
                },
                error: function () {
                    alert("error in data fetch");
                }
            }); 
       

    },
    do_populatewarehouseData: (obj) => {
        // editor init
        
        var editor = new $.fn.dataTable.Editor({
            table: "#addressbook",
            fields: [
                { label: "Cocd", name: "Cocd" },
                { label: "CoName", name: "CoName" },
                { label: "CoRegNo", name: "CoRegNo" },
                { label: "LCurrCd", name: "LCurrCd" },
                { label: "TypeOfOrg", name: "TypeOfOrg" },
                { label: "NatureDesc", name: "NatureDesc" }
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
            columns: [
                { data: "Cocd" },
                { data: "CoName" },
                { data: "CoRegNo" },
                { data: "LCurrCd" },
                { data: "TypeOfOrg" },
                { data: "NatureDesc" }
            ],
            select: true,
            scrollX: true,
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
                
              
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowid", `${data.Row_Id}`);
            },
        });
        
        var table = $('#addressbook').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
               
                if (!CompanyOverviewObject._deleteperm[0]) {
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


        if (!CompanyOverviewObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!CompanyOverviewObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        
        if (!CompanyOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
     
        if (!CompanyOverviewObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission to view bank AC !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
       
        //if (!CompanyOverviewObject._uploadcountry[0]) {
        //    $('#addressdtl').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        //    $('#addressdtl').prop("disabled", true);
        //    $('#addressdtl').attr('title', 'do not have permission to view bank AC !!!');
        //    table.button(4).action(function () {
        //        this.active(false);
        //    });
        //}
       

    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(CompanyOverviewObject);
        
        CompanyOverviewObject._vieweperm = MainObject.do_IsActionMenuPermission(CompanyOverviewObject.access, 'COMPANY', 'view');
        CompanyOverviewObject._createperm = MainObject.do_IsActionMenuPermission(CompanyOverviewObject.access, 'COMPANY', 'create');
        CompanyOverviewObject._editperm = MainObject.do_IsActionMenuPermission(CompanyOverviewObject.access, 'COMPANY', 'edit');
        CompanyOverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(CompanyOverviewObject.access, 'COMPANY', 'delete');
    },
    do_populateLocationDropdown: (cexternalType, cexternalPk, cObj) => {

        $.ajax({
            url: apiurl + 'api/GetCountryStateCityByParent',
            type: 'POST',
            data: { externaltype: cexternalType, externalpk: cexternalPk },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                objCountry = response;

                var _html = [];
                _html.push("<option value='-1'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].id + "'>" + response[i].cdesc + "</option>"
                    );
                }

                cObj.html(_html.join(""));


            },
            error: function (ex) {
                console.log(ex);
                alert(ex.responseText);
            }
        });
    },
    do_populateMasterDropdown: (cexternalType, cObj) => {
       
        $.ajax({
            url: apiurl + 'api/administratorCompanyProfileOtherMaster',
            type: 'POST',
            data: { ctype: cexternalType },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
               
                var _html = [];
                _html.push("<option value='-1'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].cid + "'>" + response[i].cdesc + "</option>"
                    );
                }
                cObj.html(_html.join(""));
                if (cexternalType == "CMONTH"){
                    $("#ddTaxYearMonth").html(_html.join(""));    
                }
                
                if (cexternalType == 'ORGANISATIONTYPE') {
                    CompanyOverviewObject.do_populateMasterDropdown('BUSINESSNATURE', $('#ddBusiness'));
                }
                else if (cexternalType == 'BUSINESSNATURE') {
                    CompanyOverviewObject.do_populateMasterDropdown('CURRENCY', $('#ddCurrency'));
                }
                else if (cexternalType == 'CURRENCY') {
                    CompanyOverviewObject.do_populateMasterDropdown('BANK', $('#ddBankcode'));
                    
                }
                else if (cexternalType == 'BANK') {
                    CompanyOverviewObject.do_populateMasterDropdown('CMONTH', $('#ddFinYearStartingMonth'));
                   
                }
                else if (cexternalType == 'CMONTH') {
                    CompanyOverviewObject.do_loaddata();
                }
              

                
               
            },
            error: function () {
                alert("error in data fetch");
            }
        });
    },
  
    do_loaddataedit: (id) => {
            
        $.ajax({

            url: apiurl + 'api/administratorCompanyProfileOperation',
            type: 'POST',
            data: { p_mode: "edit", Row_Id: id, CoCd: '', CoName: '', IsBlock: 0, OrgTypeId: -1, NOB_Id: -1, CoRegNo: '-1', LCurrCd: '-1', FYearStartMon: '-1', CompanyLogo: '-1', PA_Address: '-1', PA_Address2: '-1', PA_Phone1: '-1', PA_Fax: '-1', PA_Email: '-1', PA_RespPerson: '-1', PA_Web: '-1', BankId: '-1', SameAsPA: 0, IA_Address: '-1', IA_Address2: '-1', SameAsIA: 0, SA_Address: '-1', SA_Address2: '-1', SA_Email: '-1', SA_Phone: '-1', SA_Fax: '-1', TaxYrStartMonth: '-1', EIN: '-1', SSN: '-1', created_by: $("#txt").val(), creater_MAC_add: ipaddress },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                
                
                CompanyOverviewObject.rowid = response[0].Row_Id;
                try {
                    setImage(CompanyOverviewObject.rowid);
                }
                catch (e) {

                }
                
                
                    //CompanyLogo: companylogo , SameAsPA: SameAsPA,SameAsIA: SameAsIA,sBlock: issBlock,
                if (response[0].SameAsPA == true) {
                    $("#SameAsPA").prop('checked', true);
                }
                else {
                    $("#SameAsPA").prop('checked', false);
                }
                if (response[0].SameAsIA == true) {
                    $("#SameAsIA").prop('checked', true);
                }
                else {
                    $("#SameAsIA").prop('checked', false);
                }
                $("#txtCode").val(response[0].CoCd);
                $("#txtName").val(response[0].CoName);
                $("#ddOrganization").val(response[0].OrgTypeId);
                $("#ddBusiness").val(response[0].NOB_Id);
                $("#txtRegnNo").val(response[0].CoRegNo);
                $("#ddCurrency").val(response[0].LCurrCd);
                $("#ddFinYearStartingMonth").val(response[0].FYearStartMon)
                $("#txtPrimaryAddress1").val(response[0].PA_Address)
                $("#txtPrimaryAddress2").val(response[0].PA_Address2)

                $("#txttPrimaryAddressPostId").val(response[0].PA_PostId)
                $("#txtPrimaryAddressPostCode").val(response[0].papostcode)
                $("#txtPrimaryAddresstxtCity").val(response[0].pacityname)
                $("#txtPrimaryAddresstxtCountry").val(response[0].pacountryname)
                $("#txtPrimaryAddresstxtCounty").val(response[0].pastatename)

                $("#txtPrimaryPhone").val(response[0].PA_Phone1);
                $("#txtPrimaryFax").val(response[0].PA_Fax);
                $("#txtPrimaryEmail").val(response[0].PA_Email);
                $("#txtPrimaryResponsiblePerson").val(response[0].PA_RespPerson);
                $("#txtPrimaryWeb").val(response[0].PA_Web);
                $("#ddBankcode").val(response[0].BankId);

                $("#txtGiro").val(response[0].GiroCd);
                $("#txtBankname").val(response[0].BankName);
                $("#txtBankSwift").val(response[0].SwiftCd);
                $("#txtBankAccount").val(response[0].AcNumber);
                $("#txtBankIban").val(response[0].Iban);
                $("#txtBankBranch").val(response[0].BranchName);

                $("#txtInvoiceAddress").val(response[0].IA_Address);
                $("#txtInvoiceAddress2").val(response[0].IA_Address2);

                $("#txtInvoiceContactPerson").val(response[0].IA_ContactPerson);
                $("#txtInvoiceEmail").val(response[0].IA_Email);
                $("#txtInvoicPhone").val(response[0].IA_Phone);
                $("#txtInvoiceFax").val(response[0].IA_Fax);
                

                $("#txtInvoiceAddressPostId").val(response[0].IA_PostId)
                $("#txtInvoiceAddressPostCode").val(response[0].iapostcode)
                $("#txtInvoiceAddressCity").val(response[0].iacityname)
                $("#txtInvoiceAddressCountry").val(response[0].iacountryname)
                $("#txtInvoiceAddressCounty").val(response[0].iastatename)


                $("#txtShippingAddress").val(response[0].SA_Address);
                $("#txtShippingAddress2").val(response[0].SA_Address2);

                $("#txtShippingAddressPostId").val(response[0].SA_PostId)
                $("#txtShippingAddressPostCode").val(response[0].sapostcode)
                $("#txtShippingCity").val(response[0].sacityname)
                $("#txtShippingCountry").val(response[0].sacountryname)
                $("#txtShippingCounty").val(response[0].sastatename)
                $("#txtShippingContactPerson").val(response[0].SA_ContactPerson);
                $("#txtShippingEmail").val(response[0].SA_Email);
                $("#txtShippingPhone").val(response[0].SA_Phone);
                $("#txtShippingFax").val(response[0].SA_Fax);
                $("#ddTaxYearMonth").val(response[0].TaxYrStartMonth);
                $("#txtEIN").val(response[0].EIN);
                $("#txtSSN").val(response[0].SSN);
                
              
                
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
                data: { p_mode: "getlist", LocationCd: '', CoCd: $("#ddlCompany").val(), LocationDesc: '', WhId: CompanyOverviewObject.rowid, AisleNo: -1, RackNo: -1, SelfNo: -1, BinNo: "-1", created_by: $("#txt").val(), RowId: -1 },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    CompanyOverviewObject.do_loadwarehouselocationData(obj);
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
var savedata = function () {
    var validate = true;
    //
    if ($('#SameAsPA').is(':checked')) {
        $("#txtInvoiceAddress").val($("#txtPrimaryAddress1").val());
        $("#txtInvoiceAddress2").val($("#txtPrimaryAddress2").val());

        $("#txtInvoiceContactPerson").val($("#txtPrimaryResponsiblePerson").val());
        $("#txtInvoiceEmail").val($("#txtPrimaryEmail").val());
        $("#txtInvoicPhone").val($("#txtPrimaryPhone").val());
        $("#txtInvoiceFax").val($("#txtPrimaryFax").val());

        $("#txtInvoiceAddressPostCode").val($("#txtPrimaryAddressPostCode").val());
        $("#txtInvoiceAddressPostId").val($("#txttPrimaryAddressPostId").val());
        $("#txtInvoiceAddressCity").val($("#txtPrimaryAddresstxtCity").val());
        $("#txtInvoiceAddressCountry").val($("#txtPrimaryAddresstxtCountry").val());
        $("#txtInvoiceAddressCounty").val($("#txtPrimaryAddresstxtCounty").val());
    }
    
    if ($('#SameAsIA').is(':checked')) {
        $("#txtShippingAddress").val($("#txtInvoiceAddress").val());
        $("#txtShippingAddress2").val($("#txtInvoiceAddress2").val());

        $("#txtShippingContactPerson").val($("#txtInvoiceContactPerson").val());
        $("#txtShippingEmail").val($("#txtInvoiceEmail").val());
        $("#txtShippingPhone").val($("#txtInvoicPhone").val());
        $("#txtShippingFax").val($("#txtInvoiceFax").val());

        $("#txtShippingAddressPostCode").val($("#txtInvoiceAddressPostCode").val());
        $("#txtShippingAddressPostId").val($("#txtInvoiceAddressPostId").val());
        $("#txtShippingCity").val($("#txtInvoiceAddressCity").val());
        $("#txtShippingCountry").val($("#txtInvoiceAddressCountry").val());
        $("#txtShippingCounty").val($("#txtInvoiceAddressCounty").val());
    }
   
    if ($('#txtCode').val().length <1) {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txtCode").focus();
        return false;
    }
    else if ($('#txtName').val().length <1) {
        validate = false;
        $.alertable.alert(`Name required.`);
        $("#txtName").focus();
        return false;
    }
    else if ($('#ddOrganization').val() < 1) {
        validate = false;
        $.alertable.alert(` Type of the Organization required.`);
        $("#ddOrganization").focus();
        return false;
    }
    else if ($('#ddBusiness').val() < 1) {
        validate = false;
        $.alertable.alert(` Nature of Business required.`);
        $("#ddBusiness").focus();
        return false;
    }
    else if ($('#txtRegnNo').val() < 1) {
        validate = false;
        $.alertable.alert(` Co. Regn. No required.`);
        $("#txtRegnNo").focus();
        return false;
    }
    else if ($('#ddCurrency').val() < 1) {
        validate = false;
        $.alertable.alert(` Currency (LCY) required.`);
        $("#ddCurrency").focus();
        return false;
    }
   
    
    else if ($('#txttPrimaryAddressPostId').val() < 1) {
        validate = false;
        $.alertable.alert(`Primary Address Post Code required.`);
        $("#txttPrimaryAddressPostId").focus();
        return false;
    }
    else if ($('#txtPrimaryAddress1').val() < 1) {
        validate = false;
        $.alertable.alert(`Primary Address Address-1 required.`);
        $("#txtPrimaryAddress1").focus();
        return false;
    }
    else if ($('#txtPrimaryPhone').val() < 1) {
        validate = false;
        $.alertable.alert(`Primary Address Phone required.`);
        $("#txtPrimaryPhone").focus();
        return false;
    }
    else if ($('#txtPrimaryEmail').val().length > 1 && validateEmail($('#txtPrimaryEmail').val()) == false) {
        validate = false;
        $.alertable.alert(`Not a valid Primary Address e-mail address.`);
        $("#txtPrimaryEmail").focus();
        return false;
    }
    else if ($('#txtInvoiceEmail').val().length > 1 && validateEmail($('#txtInvoiceEmail').val()) == false) {
        validate = false;
        $.alertable.alert(`Not a valid Primary Address e-mail address.`);
        $("#txtInvoiceEmail").focus();
        return false;
    }
    else if ($('#txtShippingEmail').val().length > 1 && validateEmail($('#txtShippingEmail').val()) == false) {
        validate = false;
        $.alertable.alert(`Not a valid Shipping e-mail address.`);
        $("#txtShippingEmail").focus();
        return false;
    }
    else {
        $('#btnSave').prop("disabled", true);
        
        imgupload();
       
        //companylogo = "";
        //companylogo = companylogo.replace('data:image/png;base64,', '');
        //companylogo = companylogo.replace('data:image/jpeg;base64,', '');
        //companylogo = companylogo.replace('data:image/jpg;base64,', '');
        //companylogo = companylogo.replace('data:application/pdf;base64,', '');
       
       

        
    }

};

function saveFinal(imgId) {
    var SameAsPA = 0, issBlock = 0, SameAsIA = 0;
    if ($('#SameAsPA').is(':checked')) {
        SameAsPA = 1;
    }
    if ($('#SameAsIA').is(':checked')) {
        SameAsIA = 1;
    }

    if ($('#chkBlock').is(':checked')) {
        issBlock = 1;
    }
    if (parseInt(CompanyOverviewObject.rowid) > 0) {
        $.ajax({

            url: apiurl + 'api/administratorCompanyProfileOperation',
            type: 'POST',
            data: { p_mode: "update", Row_Id: parseInt(CompanyOverviewObject.rowid), CoCd: $("#txtCode").val(), CoName: $("#txtName").val(), IsBlock: issBlock, OrgTypeId: $("#ddOrganization").val(), NOB_Id: $("#ddBusiness").val(), CoRegNo: $("#txtRegnNo").val(), LCurrCd: $("#ddCurrency").val(), FYearStartMon: $("#ddFinYearStartingMonth").val(), CompanyLogo: imgId, PA_Address: $("#txtPrimaryAddress1").val(), PA_Address2: $("#txtPrimaryAddress2").val(), PA_PostId: $("#txttPrimaryAddressPostId").val(), IA_PostId: $("#txtInvoiceAddressPostId").val(), SA_PostId: $("#txtShippingAddressPostId").val(), PA_Phone1: $("#txtPrimaryPhone").val(), PA_Fax: $("#txtPrimaryFax").val(), PA_Email: $("#txtPrimaryEmail").val(), PA_RespPerson: $("#txtPrimaryResponsiblePerson").val(), PA_Web: $("#txtPrimaryWeb").val(), BankId: $("#ddBankcode").val(), SameAsPA: SameAsPA, IA_Address: $("#txtInvoiceAddress").val(), IA_Address2: $("#txtInvoiceAddress2").val(), IA_ContactPerson: $("#txtInvoiceContactPerson").val(), IA_Phone: $("#txtInvoicPhone").val(), IA_Email: $("#txtInvoiceEmail").val(), IA_Fax: $("#txtInvoiceFax").val(), SameAsIA: SameAsIA, SA_Address: $("#txtShippingAddress").val(), SA_Address2: $("#txtShippingAddress2").val(), SA_ContactPerson: $("#txtShippingContactPerson").val(),SA_Email: $("#txtShippingEmail").val(), SA_Phone: $("#txtShippingPhone").val(), SA_Fax: $("#txtShippingFax").val(), TaxYrStartMonth: $("#ddTaxYearMonth").val(), EIN: $("#txtEIN").val(), SSN: $("#txtSSN").val(), created_by: $("#txt").val(), creater_MAC_add: ipaddress },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);


                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "company-overview.aspx";
                    });
                }
                else {
                    validate = false;
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $.alertable.alert(
                        response[0].msg
                    );
                    $("#txtCode").focus();
                    validate = false;
                    return false;
                }

            },
            error: function () {
                $('#btnSave').prop("disabled", false);
                alert("error in data update");
            }
        });
    }
    else {
        $.ajax({
            url: apiurl + 'api/administratorCompanyProfileOperation',
            type: 'POST',
            data: { p_mode: "create", Row_Id: -1, CoCd: $("#txtCode").val(), CoName: $("#txtName").val(), IsBlock: issBlock, OrgTypeId: $("#ddOrganization").val(), NOB_Id: $("#ddBusiness").val(), CoRegNo: $("#txtRegnNo").val(), LCurrCd: $("#ddCurrency").val(), FYearStartMon: $("#ddFinYearStartingMonth").val(), CompanyLogo: imgId, PA_Address: $("#txtPrimaryAddress1").val(), PA_Address2: $("#txtPrimaryAddress2").val(), PA_PostId: $("#txttPrimaryAddressPostId").val(), IA_PostId: $("#txtInvoiceAddressPostId").val(), SA_PostId: $("#txtShippingAddressPostId").val(), PA_Phone1: $("#txtPrimaryPhone").val(), PA_Fax: $("#txtPrimaryFax").val(), PA_Email: $("#txtPrimaryEmail").val(), PA_RespPerson: $("#txtPrimaryResponsiblePerson").val(), PA_Web: $("#txtPrimaryWeb").val(), BankId: $("#ddBankcode").val(), SameAsPA: SameAsPA, IA_Address: $("#txtInvoiceAddress").val(), IA_Address2: $("#txtInvoiceAddress2").val(), IA_ContactPerson: $("#txtInvoiceContactPerson").val(), IA_Phone: $("#txtInvoicPhone").val(), IA_Email: $("#txtInvoiceEmail").val(), IA_Fax: $("#txtInvoiceFax").val(), SameAsIA: SameAsIA, SA_Address: $("#txtShippingAddress").val(), SA_Address2: $("#txtShippingAddress2").val(), SA_ContactPerson: $("#txtShippingContactPerson").val(), SA_Email: $("#txtShippingEmail").val(), SA_Phone: $("#txtShippingPhone").val(), SA_Fax: $("#txtShippingFax").val(), TaxYrStartMonth: $("#ddTaxYearMonth").val(), EIN: $("#txtEIN").val(), SSN: $("#txtSSN").val(), created_by: $("#txt").val(), creater_MAC_add: ipaddress },

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                //alert(response.length);
                //alert(response[0].CountryCd);
                console.log(response);
                if (response[0].msg == "true") {
                    validate = true;
                    $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                        window.location = "company-overview.aspx";
                    });
                }
                else {
                    validate = false;
                    //alert("A/C Code Already Exists.\n Please Try Another A/C Code.");
                    $.alertable.alert(
                        response[0].msg
                    );
                    $("#txtCode").focus();
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
    //alert("111");
    $('.modal-title').html('Add New Country');

    CompanyOverviewObject.rowId = '-1';
    $('#txtCode').val('');
    $('#txtName').val('');
};

var otherWindow = function (countryCd, coutryName, warehousedesc,SLR_UseAisle, SLR_UseRack, SLR_UseSelf, SLR_UseBin, mode) {
    
    if (countryCd == "" || countryCd == undefined || countryCd == "undefined") return;
    localStorage.warehouserowid = countryCd;
    //$('#addressbook').DataTable().rows('.selected').data()[0].AddressCode
    if (localStorage.warehouserowid) {
        if (mode == "location") {

            localStorage.menu_id_premission = CompanyOverviewObject._locationmenuid[1];
            localStorage.warehousename = coutryName;
            localStorage.warehousedesc = warehousedesc;
            localStorage.SLR_UseAisle = SLR_UseAisle;
            localStorage.SLR_UseRack = SLR_UseRack;
            localStorage.SLR_UseSelf = SLR_UseSelf;
            localStorage.SLR_UseBin = SLR_UseBin;

          
            //localStorage.AddressDetailAddressCode = $('#addressbook').DataTable().rows('.selected').data()[0].AddressCode;
            //localStorage.AddressDetailAddressName = $('#addressbook').DataTable().rows('.selected').data()[0].AddressName;
            //localStorage.AddressDetailCountryName = $('#addressbook').DataTable().rows('.selected').data()[0].CountryName;
            //localStorage.AddressDetailCountryCode = $('#addressbook').DataTable().rows('.selected').data()[0].CountryCd;

            //alert(CompanyOverviewObject._addressdetailsmenuid[1]);
            //location.href = 'address-details.aspx?id=1&menuid=' + CompanyOverviewObject._addressdetailsmenuid[1];
            location.href = 'warehouse-location.aspx';
            
        }
        
    }
    
}

var datablank = function () {
    companylogo = "";
    contentType = "";
    $("#txtCode").val('');
    $("#txtName").val('');
    $("#ddOrganization").val('-1');
    $("#ddBusiness").val('-1');
    $("#txtRegnNo").val('');
    $("#ddCurrency").val(-1);
    $("#ddFinYearStartingMonth").val('')
    $("#txtPrimaryAddress1").val('')
    $("#txtPrimaryPhone").val('')
    $("#txtPrimaryAddress2").val('');
    $("#txtPrimaryPhone2").val('');
    $("#txtPrimaryAddressPostCode").val('');
    $("#txttPrimaryAddressPostId").val('-1');
    $("#txtPrimaryFax").val('');
    $("#txtPrimaryAddresstxtCity").val('');
    $("#txtPrimaryEmail").val('');
    $("#txtPrimaryAddresstxtCountry").val('');
    $("#txtPrimaryResponsiblePerson").val('');
    $("#txtPrimaryAddresstxtCounty").val('');
    $("#txtPrimaryWeb").val('');
    $("#ddBankcode").val('-1');
    $("#txtGiro").val('');
    $("#txtBankname").val('');
    $("#txtBankSwift").val('');
    $("#txtBankAccount").val('');
    $("#txtBankIban").val('');
    $("#txtBankBranch").val('');
    $("#txtInvoiceContactPerson").val('');
    $("#txtInvoiceAddress").val('');
    $("#txtInvoiceEmail").val('');
    $("#txtInvoiceAddress2").val('');
    $("#txtInvoicPhone").val('');
    $("#txtInvoiceAddressPostCode").val('');
    $("#txtInvoiceAddressPostId").val('-1');
    $("#txtInvoiceFax").val('');
    $("#txtInvoiceAddressCity").val('');
    $("#txtInvoiceAddressCountry").val('');
    $("#txtInvoiceAddressCounty").val('');
    $("#txtShippingContactPerson").val('');
    $("#txtShippingAddress").val('');
    $("#txtShippingEmail").val('');
    $("#txtShippingAddress2").val('');
    $("#txtShippingPhone").val('');
    $("#txtShippingAddressPostCode").val('');
    $("#txtShippingAddressPostId").val('-1');
    $("#txtShippingFax").val('');
    $("#txtShippingCity").val('');
    $("#txtShippingCountry").val('');
    $("#txtShippingCounty").val('');
    $("#ddTaxYearMonth").val('');
    $("#txtEIN").val('');
    $("#txtSSN").val('');
    $('#blah')
        .attr('src', '')
    $("#rmvlogo").hide();
}
var roleaction = function (rowId, mode) {
    
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);
  
    if (mode == "viewlocation") {
        CompanyOverviewObject.rowid = rowId;
        showmodalview();

    }
    if (mode == 'add') {
        companylogo = "";
        CompanyOverviewObject.rowid = '-1';
        showmodal();
        $('.modal-title').html('Add New Company');

        datablank();
        $('#btnSave').text('Add');
        $('#btnSave').show();
        //$('.readOnly').attr("disabled", false);
       
        $('#txtCode').prop("disabled", false);

    }
    if (mode == 'edit') {
        showmodal();
        
        $('.modal-title').html('Company Overview - Edit');
        $('#cbBlock').show();
        datablank();
        if (!CompanyOverviewObject._deleteperm[0]) {
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
        $('#txtCode').prop("disabled", true);

        CompanyOverviewObject.rowid = rowId;
        CompanyOverviewObject.do_loaddataedit(rowId);
        
    }
    else if(mode == 'view') {
        showmodal();
        datablank();
        $('.modal-title').html('Company Overview - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!CompanyOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!CompanyOverviewObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        CompanyOverviewObject.rowid = rowId;
        CompanyOverviewObject.do_loaddataedit(rowId);
    }
    
    else if (mode == 'delete') {
        $.alertable.custconfirm(`Are you want to delete the Record ?`, ``, `Yes`, `No`)
            .then(
                function () {
                    var _data;
                    _data = '{rowid:"' + rowId + '"}';
                    $.ajax({
                        //url: apiurl + 'api/AdministratorAddressBookMainFetch',
                        type: 'POST',
                        data: { p_mode: "remov", RowId: rowId },
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (response) {
                            $.alertable.alert(`Data removed successfully.`, ``, `Ok`, ``).then(function () {
                                window.location = "company-overview.aspx";
                            });
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
var getObjectByValue = function (array, key, value) {
    return array.filter(function (object) {
        return object[key] === value;
    });
};

function ShowIP(response) {
    ipaddress = response.ip;
}
function PopulateState() {
    CompanyOverviewObject.do_populateLocationDropdown('STATE', $('#ddPincodeCountry').val(), $('#ddPincodeCounty'));
}
function PopulateCity() {
    CompanyOverviewObject.do_populateLocationDropdown('CITY', $('#ddPincodeCounty').val(), $('#ddPincodeCity'));
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
        url: "../handler/datahandler.aspx/GetImagenew",
        data: JSON.stringify({ id: rowid }),
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

function imgupload() {


    if (companylogo.length > 2) {
        var filename = companylogo;
        filename = filename.replace('data:image/png;base64,', '');
        filename = filename.replace('data:image/jpeg;base64,', '');
        filename = filename.replace('data:image/jpg;base64,', '');
        filename = filename.replace('data:application/pdf;base64,', '');
       
        $.ajax({
            type: "POST",
            url: "../handler/datahandler.aspx/UploadImagenew",
            data: JSON.stringify({ docname: imgfileName, imageData: filename, contentType: contentType }),
            //data: '{imageData: "' + filename + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            crossDomain: true,
            success: function (result) {
                saveFinal(result.d);
                
            },
            error: function (err) {
                $('#btnSave').prop("disabled", false);
                alert(err.statusText)
            }
        });
    }
    else {
        saveFinal(-1);
    }
   
}
function rmvlogo() {
    companylogo = "";
    contentType = "";
    $('#blah')
        .attr('src', '')
    $("#rmvlogo").hide();
}
