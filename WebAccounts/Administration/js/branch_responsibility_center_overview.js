var ipaddress = "";
var objCountry;

$(document).ready(function () {
    

    var cuserid = '<%=Session["userid"].ToString() %>';
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ipaddress = e.ip;
    });      
    //localStorage.menu_id_premission = 326;
    if (localStorage.BranchOverviewmenuid == '' || localStorage.BranchOverviewmenuid == undefined) {
        localStorage.BranchOverviewmenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage.BranchOverviewmenuid;
    }
    //setImage();
    $("#myModal").modal({
        show: false,
        backdrop: 'static'
    });

    $("#click-me").click(function () {
        $("#myModal").modal("show");
    });
    BranchOverviewObject.do_populateLocationDropdown('COUNTRY', -1, $('#ddPincodeCountry'));
    localStorage.menu_id_premission;
    BranchOverviewObject.do_populateBranchDropdown();
    
    //BranchOverviewObject.do_loaddata();
    BranchOverviewObject.do_getUserPagepermission();
  
    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var BranchOverviewObject = {

    rowid: '',
    _dimensionmenuid : '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _dimensionview : '',
    _addressdetailsmenuid : '',
    do_loaddata: () => {
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            $.ajax({
                //url: apiurl + 'api/administratorCompanyProfileOperation',                

                url: apiurl + 'api/administratorBranchOperation',
                type: 'POST',
                data: { p_mode: "getlist", RowId: -1, CoCd: $("#ddlCompany").val(), created_by: $("#txt").val(), creater_MAC_add: ipaddress, BranchCd: '', BranchName: '', AddLine1: '', AddLine2: '', PostId: -1, BranchValueId: -1, LocationId: -1, ContactPerson:'', PhoneNo: '', AlternatePhoneNo: '', FaxNo:'', Email: '', Website: '', IsBlock: 0, IsClose: 0 },

                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    BranchOverviewObject.do_populateData(obj);
                },
                error: function (err) {
                    alert(err.responseText);
                }
            }); 
       

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
    do_populateData: (obj) => {
        // editor init
        
        var editor = new $.fn.dataTable.Editor({
            table: "#addressbook",
            fields: [
                { label: "BranchCd", name: "BranchCd" },
                { label: "BranchName", name: "BranchName" },
                { label: "LocationName", name: "LocationName" },
                { label: "IsBlock", name: "IsBlock" },
                { label: "IsClose", name: "IsClose" }
                
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
            columnDefs: [{
                orderable: false,
                'render': function (data, type, full, meta) {
                    //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                    return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                },
                targets: 4
            },
            {
                orderable: false,
                'render': function (data, type, full, meta) {
                    //return '<input type="checkbox" name="id[]" checked="' + $('<div/>').text(data).html() + '">';
                    return '<input disabled type="checkbox" name="id[]" ' + $('<div/>').text(data).html() + '>';
                },
                targets: 3
            }

            ],
            data: roledata,
            columns: [
                { data: "BranchCd" },
                { data: "BranchName" },
                { data: "LocationName" },
                { data: "IsBlock" },
                { data: "IsClose" }
                
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

                },
                {

                    add: "dimension", text: 'Dimension Setup', action: function () { otherWindow($('.selected').attr('rowid'), 'dimension'); },
                    attr: {
                        title: 'Dimension Setup',
                        id: 'dimension'
                        ,value: BranchOverviewObject._dimensionmenuid
                    }

                }
                
              
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("rowid", `${data.rowid}`);
            },
        });
        
        var table = $('#addressbook').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
               
                if (!BranchOverviewObject._deleteperm[0]) {
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


        if (!BranchOverviewObject._createperm[0]) {
            $('#country_overview_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_create').prop("disabled", true);
            $('#country_overview_create').attr('title', 'do not have permission to Add New Record !!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!BranchOverviewObject._editperm[0]) {
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        
        if (!BranchOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete Record!!!');
            table.button(2).action(function () {
                this.active(false);
            });
        }
     
        if (!BranchOverviewObject._vieweperm[0]) {
            $('#country_overview_View').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_View').prop("disabled", true);
            $('#country_overview_View').attr('title', 'do not have permission !!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
        if (!BranchOverviewObject._dimensionview[0]) {
            $('#dimension').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#dimension').prop("disabled", true);
            $('#dimension').attr('title', 'do not have permission !!!');
            table.button(4).action(function () {
                this.active(false);
            });
        }
        //if (!BranchOverviewObject._uploadcountry[0]) {
        //    $('#addressdtl').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
        //    $('#addressdtl').prop("disabled", true);
        //    $('#addressdtl').attr('title', 'do not have permission !!!');
        //    table.button(4).action(function () {
        //        this.active(false);
        //    });
        //}
       

    },
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(BranchOverviewObject);
        
        BranchOverviewObject._vieweperm = MainObject.do_IsActionMenuPermission(BranchOverviewObject.access, 'BRANCH/RESPONSIBILITY CENTER', 'view');
        BranchOverviewObject._createperm = MainObject.do_IsActionMenuPermission(BranchOverviewObject.access, 'BRANCH/RESPONSIBILITY CENTER', 'create');
        BranchOverviewObject._editperm = MainObject.do_IsActionMenuPermission(BranchOverviewObject.access, 'BRANCH/RESPONSIBILITY CENTER', 'edit');
        BranchOverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(BranchOverviewObject.access, 'BRANCH/RESPONSIBILITY CENTER', 'delete');
        BranchOverviewObject._dimensionview = MainObject.do_IsActionMenuPermission(BranchOverviewObject.access, 'DIMENSION SETUP', 'view');
        BranchOverviewObject._dimensionmenuid = MainObject.do_IsActionMenuPermission(BranchOverviewObject.access, 'DIMENSION SETUP', 'menuid');
    },
  
    do_populateBranchDropdown: () => {
       
        $.ajax({
            url: apiurl + 'api/getBranch',
            type: 'POST',
            data: { ctype: $("#ddlCompany").val()  },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
               
                var _html = [];
                _html.push("<option value='-1'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].valueId + "'>" + response[i].valueDesc + "</option>"
                    );
                }
               
                $("#ddBranchDimension").html(_html.join(""));

                BranchOverviewObject.do_populateBLocationDropdown();
              

                
               
            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    },
    do_populateBLocationDropdown: () => {
        
        $.ajax({
            url: apiurl + 'api/getAdministratorLocation',
            type: 'POST',
            data: { ctype: $("#ddlCompany").val() },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {

                var _html = [];
                _html.push("<option value='-1'>  --Select--</option>")
                for (var i = 0; i < response.length; i++) {


                    _html.push(
                        "<option value='" + response[i].RowId + "'>" + response[i].LocationName + "</option>"
                    );
                }

                $("#ddLocation").html(_html.join(""));

                BranchOverviewObject.do_loaddata();




            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    },
    do_loaddataedit: (id) => {
            
        $.ajax({

           
            url: apiurl + 'api/administratorBranchOperation',
            type: 'POST',
            data: { p_mode: "edit", RowId:id, CoCd: $("#ddlCompany").val(), created_by: $("#txt").val(), creater_MAC_add: ipaddress, BranchCd: '', BranchName: '', AddLine1: '', AddLine2: '', PostId: -1, BranchValueId: -1, LocationId: -1, ContactPerson: '', PhoneNo: '', AlternatePhoneNo: '', FaxNo: '', Email: '', Website: '', IsBlock: 0, IsClose: 0 },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                
                
                
                
                
                
                    //CompanyLogo: companylogo , SameAsPA: SameAsPA,SameAsIA: SameAsIA,sBlock: issBlock,
                if (response[0].IsBlock == true) {
                    $("#chkBlock").prop('checked', true);
                }
                else {
                    $("#chkBlock").prop('checked', false);
                }
                if (response[0].IsClose == true) {
                    $("#chkClose").prop('checked', true);
                }
                else {
                    $("#chkClose").prop('checked', false);
                }
                
                $("#txtCode").val(response[0].BranchCd);
                $("#txtCountry").val(response[0].countryname);

                $("#txtName").val(response[0].BranchName)
                $("#txtState").val(response[0].StateName)
                $("#txtAddress1").val(response[0].AddLine1);
                $("#ddBranchDimension").val(response[0].BranchValueId);
                $("#txtAddress2").val(response[0].AddLine2);
                $("#ddLocation").val(response[0].LocationId);
                $("#txtCity").val(response[0].cityname);

                $("#txtPostCode").val(response[0].PostCode);
                $("#txtPostId").val(response[0].PostId);
                $("#txtPerson").val(response[0].ContactPerson);
                $("#txtFax").val(response[0].FaxNo);
                $("#txtPhone").val(response[0].PhoneNo);
                $("#txtEmail").val(response[0].Email);
                $("#txtPhome1").val(response[0].AlternatePhoneNo);

                $("#txtWeb").val(response[0].Website);
               


                
              
                
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
                data: { p_mode: "getlist", LocationCd: '', CoCd: $("#ddlCompany").val(), LocationDesc: '', WhId: BranchOverviewObject.rowid, AisleNo: -1, RackNo: -1, SelfNo: -1, BinNo: "-1", created_by: $("#txt").val(), RowId: -1 },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    BranchOverviewObject.do_loadwarehouselocationData(obj);
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
    else if ($('#txtPostId').val() < 1) {
        validate = false;
        $.alertable.alert(`Post Code required.`);
        $("#txtPostId").focus();
        return false;
    }
    else if ($('#txtEmail').val().length > 1 && validateEmail($('#txtEmail').val()) == false) {
        validate = false;
        $.alertable.alert(`Not a valid e-mail address.`);
        $("#txtEmail").focus();
        return false;
    }
   
    else {
        issBlock = 0, issClose = 0;
       
        if ($('#chkClose').is(':checked')) {
            issClose = 1;
        }

        if ($('#chkBlock').is(':checked')) {
            issBlock = 1;
        }
        
        if (parseInt(BranchOverviewObject.rowid) > 0) {
            $.ajax({

                url: apiurl + 'api/administratorBranchOperation',
                type: 'POST',
                data: { p_mode: "update", RowId: parseInt(BranchOverviewObject.rowid), CoCd: $("#ddlCompany").val(), created_by: $("#txt").val(), creater_MAC_add: ipaddress, BranchCd: $("#txtCode").val(), BranchName: $("#txtName").val(), AddLine1: $("#txtAddress1").val(), AddLine2: $("#txtAddress2").val(), PostId: $("#txtPostId").val(), BranchValueId: $("#ddBranchDimension").val(), LocationId: $("#ddLocation").val(), ContactPerson: $("#txtPerson").val(), PhoneNo: $("#txtPhone").val(), AlternatePhoneNo: $("#txtPhome1").val(), FaxNo: $("#txtFax").val(), Email: $("#txtEmail").val(), Website: $("#txtWeb").val(), IsBlock: issBlock, IsClose: issClose },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].CountryCd);


                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "branch-responsibility-center-overview.aspx";
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
                error: function (err) {
                    alert(err.responseText);
                }
            });
        }
        else {
            
            $.ajax({
                url: apiurl + 'api/administratorBranchOperation',
                type: 'POST',
                data: { p_mode: "create", RowId: -1, CoCd: $("#ddlCompany").val(), created_by: $("#txt").val(), creater_MAC_add: ipaddress, BranchCd: $("#txtCode").val(), BranchName: $("#txtName").val(), AddLine1: $("#txtAddress1").val(), AddLine2: $("#txtAddress2").val(), PostId: $("#txtPostId").val(), BranchValueId: $("#ddBranchDimension").val(), LocationId: $("#ddLocation").val(), ContactPerson: $("#txtPerson").val(), PhoneNo: $("#txtPhone").val(), AlternatePhoneNo: $("#txtPhome1").val(), FaxNo: $("#txtFax").val(), Email: $("#txtEmail").val(), Website: $("#txtWeb").val(), IsBlock: issBlock, IsClose: issClose },

                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    //alert(response.length);
                    //alert(response[0].CountryCd);
                    console.log(response);
                    if (response[0].msg == "true") {
                        validate = true;
                        $.alertable.alert(`Data added successfully.`, ``, `Ok`, ``).then(function () {
                            window.location = "branch-responsibility-center-overview.aspx";
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
                    console.log(ex);
                    alert(ex.responseText);
                }
            });
        }
       
        
       

        
    }

};


var showmodal = function () {
    //alert("111");
    $('.modal-title').html('Add New Country');

    BranchOverviewObject.rowId = '-1';
    $('#txtCode').val('');
    $('#txtName').val('');
};

var otherWindow = function (countryCd,  mode) {
    
    if (countryCd == "" || countryCd == undefined || countryCd == "undefined") return;
    localStorage.brannchdimensionrowid = countryCd;
    //$('#addressbook').DataTable().rows('.selected').data()[0].AddressCode
    if (localStorage.brannchdimensionrowid) {
        if (mode == "dimension") {
            localStorage.clickedmenu_id = BranchOverviewObject._dimensionmenuid[1];
            localStorage.menu_id_premission = BranchOverviewObject._dimensionmenuid[1];
            localStorage.dimensionbranchnode = $('#addressbook').DataTable().rows('.selected').data()[0].BranchCd;
            localStorage.dimensionbranchname = $('#addressbook').DataTable().rows('.selected').data()[0].BranchName;

            window.location = "center-dimension.aspx?id=" + countryCd;
            
        }
        
    }
    
}

var roleaction = function (rowId, mode) {
    
    if (rowId == "" || rowId == undefined || rowId == "undefined") return;
    //$('#txtCode').prop("disabled", false);
  
   
    if (mode == 'add') {
        companylogo = "";
        BranchOverviewObject.rowid = '-1';
        showmodal();
        $('.modal-title').html('Add New Branch');

        
        $('#btnSave').text('Add');
        $('#btnSave').show();
        //$('.readOnly').attr("disabled", false);
       
        $("#txtCode").val('');
        $("#txtCountry").val('');
      
        $("#txtName").val('')
        $("#txtState").val('')
        $("#txtAddress1").val('');
        $("#ddBranchDimension").val('-1');
        $("#txtAddress2").val('');
        $("#ddLocation").val('-1');
        $("#txtCity").val('');

        $("#txtPostCode").val('');
        $("#txtPostId").val('-1');
        $("#txtPerson").val('');
        $("#txtFax").val('');
        $("#txtPhone").val('');
        $("#txtEmail").val('');
        $("#txtPhome1").val('');

        $("#txtWeb").val('');
        $("#chkClose").prop('checked', false);
        $("#chkBlock").prop('checked', false);
        $('#txtCode').prop("disabled", false);

    }
    if (mode == 'edit') {
        showmodal();
        $('.modal-title').html('Branch Overview - Edit');
        $('#cbBlock').show();
       
        if (!BranchOverviewObject._deleteperm[0]) {
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

        BranchOverviewObject.rowid = rowId;
        BranchOverviewObject.do_loaddataedit(rowId);
        
    }
    else if(mode == 'view') {
        showmodal();
        $('.modal-title').html('Branch Overview - View');
        $('#cbBlock').show();
       // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!BranchOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!BranchOverviewObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();
       
        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        BranchOverviewObject.rowid = rowId;
        BranchOverviewObject.do_loaddataedit(rowId);
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
                                window.location = "branch-responsibility-center-overview.aspx";
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

var getObjectByValue = function (array, key, value) {
    return array.filter(function (object) {
        return object[key] === value;
    });
};

function ShowIP(response) {
    ipaddress = response.ip;
}
function PopulateState() {
    BranchOverviewObject.do_populateLocationDropdown('STATE', $('#ddPincodeCountry').val(), $('#ddPincodeCounty'));
}
function PopulateCity() {
    BranchOverviewObject.do_populateLocationDropdown('CITY', $('#ddPincodeCounty').val(), $('#ddPincodeCity'));
}
var setpincode = function (cpincode) {
   

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
                $('#txtCity').val(response[0].CityName);
                $('#txtCountry').val(response[0].CountryName);
                $('#txtState').val(response[0].StateName);
                $('#txtPostCode').val(response[0].PostCode);
                $('#txtPostId').val(response[0].addressID);
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





