var ipaddress = "";
var objCountry;

$(document).ready(function () {


    var cuserid = '<%=Session["userid"].ToString() %>';
    $('#branchcode').html(localStorage.dimensionbranchnode);
    $('#branchname').html(localStorage.dimensionbranchname);
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ipaddress = e.ip;
    });
    //localStorage.menu_id_premission = 326;
    if (localStorage.DimensionOverviewmenuid == '' || localStorage.DimensionOverviewmenuid == undefined) {
        localStorage.DimensionOverviewmenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage.DimensionOverviewmenuid;
    }
  
   
    localStorage.menu_id_premission;
    DimensionOverviewObject.do_populateDimensionDropdown(1, $("#dddimvale_1"));

    //DimensionOverviewObject.do_loaddata();
    DimensionOverviewObject.do_getUserPagepermission();

    //var _html = [];
    //_html.push("<option value=''>  --Select--</option>")
    //$("#cbo_countydr").html(_html.join(""));

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var DimensionOverviewObject = {

    rowid: '',
    _dimensionmenuid: '',
    _vieweperm: false,
    _createperm: '',
    _editperm: false,
    _deleteperm: false,
    _addressdetailsmenuid: '',
    onchangeDimension: (obj) => {
        if ($('#' + obj.id).is(":checked")) {
            $('#' + $('#' + obj.id).attr("for")).attr("disabled", false);
            $('#' + $('#' + obj.id).attr("for")).removeAttr("disabled");
        }
        else {
            $('#' + $('#' + obj.id).attr("for")).attr("disabled", true);
            $('#' + $('#' + obj.id).attr("for")).val('');
        }
    },
    do_loaddata: () => {
        
        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            $.ajax({
                //url: apiurl + 'api/administratorCompanyProfileOperation',                

                url: apiurl + 'api/administratorBranchDimensionOperation',
                type: 'POST',
                data: { p_mode: "edit", RowId: parseInt(localStorage.brannchdimensionrowid), dim1_Branch: 0, dim1DefValue: 0, creater_MAC_add: ipaddress, dim2_Dept: 0, dim2DefValue: 0, dim3: 0, dim3DefValue: 0, dim4: 0, dim4DefValue: 0, dim5: 0, dim5DefValue: 0, dim6: 0, dim6DefValue : 0, dim7: 0, dim7DefValue: 0, dim8: 0, dim8DefValue: 0, dim9: 0, dim9DefValue: 0, dim10: 0, dim10DefValue: 0, created_by: $("#txt").val() },

                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    DimensionOverviewObject.do_loadcaption();
                    if (response[0].dim1_Branch == true) {
                        $("#dimension_1_checkbox").prop('checked', true);
                        $('#' + $('#dimension_1_checkbox').attr("for")).removeAttr("disabled");
                        
                    }
                    if (response[0].dim2_Dept == true) {
                        $("#dimension_2_checkbox").prop('checked', true);
                        $('#' + $('#dimension_2_checkbox').attr("for")).removeAttr("disabled");
                    }
                    if (response[0].dim3 == true) {
                        $("#dimension_3_checkbox").prop('checked', true);
                        $('#' + $('#dimension_3_checkbox').attr("for")).removeAttr("disabled");
                    }
                    if (response[0].dim4 == true) {
                        $("#dimension_4_checkbox").prop('checked', true);
                        $('#' + $('#dimension_4_checkbox').attr("for")).removeAttr("disabled");
                    }
                    if (response[0].dim5 == true) {
                        $("#dimension_5_checkbox").prop('checked', true);
                        $('#' + $('#dimension_5_checkbox').attr("for")).removeAttr("disabled");
                    }
                    if (response[0].dim6 == true) {
                        $("#dimension_6_checkbox").prop('checked', true);
                        $('#' + $('#dimension_6_checkbox').attr("for")).removeAttr("disabled");
                    }
                    if (response[0].dim7 == true) {
                        $("#dimension_7_checkbox").prop('checked', true);
                        $('#' + $('#dimension_7_checkbox').attr("for")).removeAttr("disabled");
                    }
                    if (response[0].dim8 == true) {
                        $("#dimension_8_checkbox").prop('checked', true);
                        $('#' + $('#dimension_8_checkbox').attr("for")).removeAttr("disabled");
                    }
                    if (response[0].dim9 == true) {
                        $("#dimension_9_checkbox").prop('checked', true);
                        $('#' + $('#dimension_9_checkbox').attr("for")).removeAttr("disabled");
                    }
                    if (response[0].dim10 == true) {
                        $("#dimension_10_checkbox").prop('checked', true);
                        $('#' + $('#dimension_10_checkbox').attr("for")).removeAttr("disabled");
                    }
                    
                    $('#dddimvale_1').val(response[0].dim1DefValue);
                    $('#dddimvale_2').val(response[0].dim2DefValue);
                    $('#dddimvale_3').val(response[0].dim3DefValue);
                    $('#dddimvale_4').val(response[0].dim4DefValue);
                    $('#dddimvale_5').val(response[0].dim5DefValue);
                    $('#dddimvale_6').val(response[0].dim6DefValue);
                    $('#dddimvale_7').val(response[0].dim7DefValue);
                    $('#dddimvale_8').val(response[0].dim8DefValue);
                    $('#dddimvale_9').val(response[0].dim9DefValue);
                    $('#dddimvale_10').val(response[0].dim10DefValue);

                    
                },
                error: function (err) {
                    alert(err.responseText);
                }
            });


    },
    do_loadcaption: () => {

        var _data;
        _data = JSON.stringify({ cocd: $("#ddlCompany").val() }),
            $.ajax({
                //url: apiurl + 'api/administratorCompanyProfileOperation',                

                url: apiurl + 'api/getDimensionCaption',
                type: 'POST',
                data: { ctype: $("#ddlCompany").val()},

                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    for (var i = 0; i < response.length; i++){
                        $('#lbl_dimension_' + response[i].dimId).html(response[i].dimCaption);
                    }
                     
                    
                    
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
    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(DimensionOverviewObject);

        DimensionOverviewObject._vieweperm = MainObject.do_IsActionMenuPermission(DimensionOverviewObject.access, 'DIMENSION SETUP', 'view');
        DimensionOverviewObject._createperm = MainObject.do_IsActionMenuPermission(DimensionOverviewObject.access, 'DIMENSION SETUP', 'create');
        DimensionOverviewObject._editperm = MainObject.do_IsActionMenuPermission(DimensionOverviewObject.access, 'DIMENSION SETUP', 'edit');
        DimensionOverviewObject._deleteperm = MainObject.do_IsActionMenuPermission(DimensionOverviewObject.access, 'DIMENSION SETUP', 'delete');
        
        if (DimensionOverviewObject._createperm == 'false,') {
            $('#btn_save').prop("disabled", true);
        }
        else {
            $('#btn_save').prop("disabled", false);
        }
    },

    do_populateDimensionDropdown: (cdimId,obj) => {

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
                    DimensionOverviewObject.do_populateDimensionDropdown(2, $("#dddimvale_2"));
                }
                if (cdimId == 2) {
                    DimensionOverviewObject.do_populateDimensionDropdown(3, $("#dddimvale_3"));
                }
                if (cdimId == 3) {
                    DimensionOverviewObject.do_populateDimensionDropdown(4, $("#dddimvale_4"));
                }
                if (cdimId == 4) {
                    DimensionOverviewObject.do_populateDimensionDropdown(5, $("#dddimvale_5"));
                }
                if (cdimId == 5) {
                    DimensionOverviewObject.do_populateDimensionDropdown(6, $("#dddimvale_6"));
                }
                if (cdimId == 6) {
                    DimensionOverviewObject.do_populateDimensionDropdown(7, $("#dddimvale_7"));
                }
                if (cdimId == 7) {
                    DimensionOverviewObject.do_populateDimensionDropdown(8, $("#dddimvale_8"));
                }
                if (cdimId == 8) {
                    DimensionOverviewObject.do_populateDimensionDropdown(9, $("#dddimvale_9"));
                }
                if (cdimId == 9) {
                    DimensionOverviewObject.do_populateDimensionDropdown(10, $("#dddimvale_10"));
                }
                if (cdimId == 10) {

                    DimensionOverviewObject.do_loaddata();
                }
                
                //DimensionOverviewObject.do_populateBLocationDropdown();




            },
            error: function (err) {
                //DimensionOverviewObject.do_loaddata();
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

                DimensionOverviewObject.do_loaddata();




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
            data: { p_mode: "edit", RowId: id, CoCd: $("#ddlCompany").val(), created_by: $("#txt").val(), creater_MAC_add: ipaddress, BranchCd: '', BranchName: '', AddLine1: '', AddLine2: '', PostId: -1, BranchValueId: -1, LocationId: -1, ContactPerson: '', PhoneNo: '', AlternatePhoneNo: '', FaxNo: '', Email: '', Website: '', IsBlock: 0, IsClose: 0 },
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
                data: { p_mode: "getlist", LocationCd: '', CoCd: $("#ddlCompany").val(), LocationDesc: '', WhId: DimensionOverviewObject.rowid, AisleNo: -1, RackNo: -1, SelfNo: -1, BinNo: "-1", created_by: $("#txt").val(), RowId: -1 },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (response) {
                    var obj = response;
                    DimensionOverviewObject.do_loadwarehouselocationData(obj);
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
    $('#btnSave').prop("disabled", true);
    var dim1_Branch = 0, dim2_Dept = 0, dim3 = 0, dim4 = 0, dim5 = 0, dim6 = 0, dim7 = 0, dim8 = 0, dim9 = 0, dim10 = 0;
    var dim1DefValue = 0, dim2DefValue = 0, dim3DefValue = 0, dim4DefValue = 0, dim5DefValue = 0, dim6DefValue = 0, dim7DefValue = 0, dim8DefValue = 0, dim9DefValue = 0, dim10DefValue = 0;


    if ($('#dimension_1_checkbox').is(':checked')) {
        dim1_Branch = 1;
    }

    if ($('#dimension_2_checkbox').is(':checked')) {
        dim2_Dept = 1;
    }
    if ($('#dimension_3_checkbox').is(':checked')) {
        dim3 = 1;
    }
    if ($('#dimension_4_checkbox').is(':checked')) {
        dim4 = 1;
    }
    if ($('#dimension_5_checkbox').is(':checked')) {
        dim5 = 1;
    }
    if ($('#dimension_6_checkbox').is(':checked')) {
        dim6 = 1;
    }
    if ($('#dimension_7_checkbox').is(':checked')) {
        dim7 = 1;
    }
    if ($('#dimension_8_checkbox').is(':checked')) {
        dim8 = 1;
    }
    if ($('#dimension_9_checkbox').is(':checked')) {
        dim9 = 1;
    }
    if ($('#dimension_10_checkbox').is(':checked')) {
        dim10 = 1;
    }

    dim1DefValue = $('#dddimvale_1').val();
    dim2DefValue = $('#dddimvale_2').val();
    dim3DefValue = $('#dddimvale_3').val();
    dim4DefValue = $('#dddimvale_4').val();
    dim5DefValue = $('#dddimvale_5').val();
    dim6DefValue = $('#dddimvale_6').val();
    dim7DefValue = $('#dddimvale_7').val();
    dim8DefValue = $('#dddimvale_8').val();
    dim9DefValue = $('#dddimvale_9').val();
    dim10DefValue = $('#dddimvale_10').val();
    
    $.ajax({

        url: apiurl + 'api/administratorBranchDimensionOperation',
        type: 'POST',
        data: { p_mode: "update", RowId: parseInt(localStorage.brannchdimensionrowid), dim1_Branch: dim1_Branch, dim1DefValue: dim1DefValue, creater_MAC_add: ipaddress, dim2_Dept: dim2_Dept, dim2DefValue: dim2DefValue, dim3: dim3, dim3DefValue: dim3DefValue, dim4: dim4, dim4DefValue: dim4DefValue, dim5: dim5, dim5DefValue: dim5DefValue, dim6: dim6, dim6DefValue: dim6DefValue, dim7: dim7, dim7DefValue: dim7DefValue, dim8: dim8, dim8DefValue: dim8DefValue, dim9: dim9, dim9DefValue: dim9DefValue, dim10: dim10, dim10DefValue: dim10DefValue, created_by: $("#txt").val() },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            //alert(response.length);
            //alert(response[0].CountryCd);


            if (response[0].msg == "true") {
                validate = true;
                $.alertable.alert(`Data updated successfully.`, ``, `Ok`, ``).then(function () {
                    $('#btnSave').prop("disabled", false);
                    window.location = "center-dimension.aspx";
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


    

};


var showmodal = function () {
    //alert("111");
    $('.modal-title').html('Add New Country');

    DimensionOverviewObject.rowId = '-1';
    $('#txtCode').val('');
    $('#txtName').val('');
};

var otherWindow = function (countryCd, mode) {

    if (countryCd == "" || countryCd == undefined || countryCd == "undefined") return;
    localStorage.brannchdimensionrowid = countryCd;
    //$('#addressbook').DataTable().rows('.selected').data()[0].AddressCode
    if (localStorage.brannchdimensionrowid) {
        if (mode == "dimension") {
            localStorage.clickedmenu_id = DimensionOverviewObject._dimensionmenuid[1];
            localStorage.menu_id_premission = DimensionOverviewObject._dimensionmenuid[1];
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
        DimensionOverviewObject.rowid = '-1';
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

        if (!DimensionOverviewObject._deleteperm[0]) {
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

        DimensionOverviewObject.rowid = rowId;
        DimensionOverviewObject.do_loaddataedit(rowId);

    }
    else if (mode == 'view') {
        showmodal();
        $('.modal-title').html('Branch Overview - View');
        $('#cbBlock').show();
        // $('#btnDelete').show();
        // $('#btnEdit').show();
        if (!DimensionOverviewObject._deleteperm[0]) {
            $('#country_overview_delete').show();
            $('#country_overview_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_delete').prop("disabled", true);
            $('#country_overview_delete').attr('title', 'do not have permission to delete bank A/C!!!');
        } else { $('#country_overview_delete').show(); }
        if (!DimensionOverviewObject._editperm[0]) {
            $('#country_overview_Edit').show();
            $('#country_overview_Edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#country_overview_Edit').prop("disabled", true);
            $('#country_overview_Edit').attr('title', 'do not have permission to edit bank A/C Record!!!');
        } else { $('#country_overview_Edit').show(); }


        $('#lbBlock').show();

        $('#btnSave').hide();
        $('.readOnly').attr("disabled", true);

        DimensionOverviewObject.rowid = rowId;
        DimensionOverviewObject.do_loaddataedit(rowId);
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
                                window.location = "center-dimension.aspx";
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






