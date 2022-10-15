$(document).ready(function () {
    SalesTaxComponentObject.cocd = $('#ddlCompany').val();
    /*if (localStorage._vendoracpagemenuid == '' || localStorage._vendoracpagemenuid == undefined) {
        localStorage._vendoracpagemenuid = localStorage.menu_id_premission;
    } else {
        localStorage.menu_id_premission = localStorage._vendoracpagemenuid;
    }*/
    SalesTaxComponentObject.do_getUserPagepermission();
    SalesTaxComponentObject.do_loadoverview();
    SalesTaxComponentObject.do_loadlookup();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});


var SalesTaxComponentObject = {
    hdnid: '',
    cocd: '',
    ip: '',
    access: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,
    _taxvalueviewperm: false,
    
    TaxJurisdiction: [],
    SettlementCode: [],
    AccMaster: [],
    TaxonTax : [],
    Unit: [],
    BasisOfCalc:[],

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = SalesTaxComponentObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            async: false,
            url: "sales-tax-component.aspx/loadlookupdata",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (!dochkses(result.d)) return;
                var obj = JSON.parse(`[${result.d}]`);

                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = key;
                        if (attrName.toLowerCase() == "table") {
                            SalesTaxComponentObject.TaxJurisdiction = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table1") {
                            SalesTaxComponentObject.SettlementCode = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table2") {
                            SalesTaxComponentObject.AccMaster = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table3") {
                            SalesTaxComponentObject.TaxonTax = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table4") {
                            SalesTaxComponentObject.Unit = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table5") {
                            SalesTaxComponentObject.BasisOfCalc = JSON.stringify(objnew[key]);
                        }
                        
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_render_lookup: () => {
        var _html = [];
        var cntrl_cbo = [];
        cntrl_cbo = $("#myModal").find("select");

        $.each(cntrl_cbo, function (key, value) {
            if (value.id == 'dd_TaxJurisdictionId') {
                _html = [];
                if (SalesTaxComponentObject.TaxJurisdiction != '[]') {
                    var _data = JSON.parse(SalesTaxComponentObject.TaxJurisdiction);
                    $.each(_data, function (key, value) {
                        _html.push(
                            //"<option value='" + value.GrpCd.replace(/[\r\n]+/gm, '') + "'>" + value.GrpCd.replace(/[\r\n]+/gm, '') + " (" + value.GrpName.replace(/[\r\n]+/gm, '') + ")</option>"
                            "<option value='" + value.RowId + "'>" + value.AuthCd.replace(/[\r\n]+/gm, '') + " (" + value.AuthName.replace(/[\r\n]+/gm, '') + ")</option>"
                        );
                    });
                }
            }
            else if (value.id == 'dd_SettleId') {
                _html = [];
                if (SalesTaxComponentObject.SettlementCode != '[]') {
                    var _data = JSON.parse(SalesTaxComponentObject.SettlementCode);
                    $.each(_data, function (key, value) {
                        _html.push(
                            "<option value='" + value.RowId + "' TaxAuthId='" + value.TaxAuthId + "' AuthCd='" + value.AuthCd + "' AuthDesc='" + value.AuthDesc + "' PrdIntervalType='" + value.PrdIntervalType + "' PrdIntervalUnit='" + value.PrdIntervalUnit + "'>" + value.SettleCd.replace(/[\r\n]+/gm, '') + " (" + value.SettleName.replace(/[\r\n]+/gm, '') + ")</option>"
                        );
                    });
                }
            }
            else if (value.id == 'dd_AcId_SaleTaxPayable') {
                _html = [];
                if (SalesTaxComponentObject.AccMaster != '[]') {
                    var _data = JSON.parse(SalesTaxComponentObject.AccMaster);
                    $.each(_data, function (key, value) {
                        _html.push(
                            "<option value='" + value.AcId + "'>" + value.AcCd.replace(/[\r\n]+/gm, '') + " (" + value.AcDesc.replace(/[\r\n]+/gm, '') + ")</option>"
                        );
                    });
                }
            }
            else if (value.id == 'dd_AcId_UseTaxPayable') {
                _html = [];
                if (SalesTaxComponentObject.AccMaster != '[]') {
                    var _data = JSON.parse(SalesTaxComponentObject.AccMaster);
                    $.each(_data, function (key, value) {
                        _html.push(
                            "<option value='" + value.AcId + "'>" + value.AcCd.replace(/[\r\n]+/gm, '') + " (" + value.AcDesc.replace(/[\r\n]+/gm, '') + ")</option>"
                        );
                    });
                }
            }
            else if (value.id == 'dd_AcId_TaxSettlement') {
                _html = [];
                if (SalesTaxComponentObject.AccMaster != '[]') {
                    var _data = JSON.parse(SalesTaxComponentObject.AccMaster);
                    $.each(_data, function (key, value) {
                        _html.push(
                            "<option value='" + value.AcId + "'>" + value.AcCd.replace(/[\r\n]+/gm, '') + " (" + value.AcDesc.replace(/[\r\n]+/gm, '') + ")</option>"
                        );
                    });
                }
            }
            
            //if (value.id != 'dd_StateCd' && value.id != 'dd_EntityType' && value.id != 'dd_Block' && value.id != 'dd_VendBankId') {
            if (value.id == 'dd_TaxJurisdictionId' || value.id == 'dd_SettleId' || value.id == 'dd_AcId_SaleTaxPayable' || value.id == 'dd_AcId_UseTaxPayable' || value.id == 'dd_AcId_TaxSettlement') {
                $('#' + value.id).html(_html.join(""));
                $('#' + value.id).prepend("<option value='0' selected='selected'></option>");
            }
        });

    },

    do_loadBasisofCalculation: (val) => {
        var _html = [];
        $("#dd_TaxOnTax").prop("disabled", true);

        if (val == 'P') {
            $('#dd_Unit').html(_html.join(""));
            $('#dd_Unit').prepend("<option value='' selected='selected'></option>");
            $("#dd_Unit").prop("disabled", true);

            var _data = JSON.parse(SalesTaxComponentObject.BasisOfCalc);
            $.each(_data, function (key, value) {
                //if (value.CountryCd.replace(/[\r\n]+/gm, '') == val) {
                _html.push(
                    "<option value='" + value.id.replace(/[\r\n]+/gm, '') + "'>" + value.descr.replace(/[\r\n]+/gm, '') + "</option>"
                );
                //}
            });

            $('#dd_BasisOfCalc').html(_html.join(""));
            $('#dd_BasisOfCalc').prepend("<option value='' selected='selected'></option>");
            $("#dd_BasisOfCalc").prop("disabled", false);
        }

        if (val == 'V') {
            $('#dd_BasisOfCalc').html(_html.join(""));
            $('#dd_BasisOfCalc').prepend("<option value='' selected='selected'></option>");
            $("#dd_BasisOfCalc").prop("disabled", true);

            var _data = JSON.parse(SalesTaxComponentObject.Unit);
            $.each(_data, function (key, value) {
                //if (value.CountryCd.replace(/[\r\n]+/gm, '') == val) {
                _html.push(
                    "<option value='" + value.RowId + "'>" + value.UomCd.replace(/[\r\n]+/gm, '') + " (" + value.UomDesc.replace(/[\r\n]+/gm, '') + ")</option>"
                );
                //}
            });

            $('#dd_Unit').html(_html.join(""));
            $('#dd_Unit').prepend("<option value='' selected='selected'></option>");
            $("#dd_Unit").prop("disabled", false);
        }
    },

    do_loadTaxonTax: (val) => {
        var _html = [];
        //dd_TaxOnTax
        if (val == 'TAmt') {
            $("#dd_TaxOnTax").prop("disabled", false);
            var _data = JSON.parse(SalesTaxComponentObject.TaxonTax);
            $.each(_data, function (key, value) {
                if (value.RowId != SalesTaxComponentObject.hdnid) {
                    _html.push(
                        "<option value='" + value.RowId + "'>" + value.SaleTaxCompCd.replace(/[\r\n]+/gm, '') + " (" + value.SaleTaxCompDesc.replace(/[\r\n]+/gm, '') + ")</option>"
                    );
                }
            });
        }
        else {
            $("#dd_TaxOnTax").prop("disabled", true);
        }

        $('#dd_TaxOnTax').html(_html.join(""));
        $('#dd_TaxOnTax').prepend("<option value='0' selected='selected'></option>");

    },

    do_changesettlement: () => {

        if ($('#dd_SettleId').val() != '') {
            var element = $('#dd_SettleId').find('option:selected');
            var AuthCd = element.attr("AuthCd");
            var AuthDesc = element.attr("AuthDesc");
            var PrdIntervalType = element.attr("PrdIntervalType");
            var PrdIntervalUnit = element.attr("PrdIntervalUnit");

            $('#txt_TaxAuthorityCode').val(AuthCd);
            $('#txt_PeriodIntervalType').val(PrdIntervalType);
            $('#txt_PeriodIntervalUnit').val(PrdIntervalUnit);
        }
        else {
            $('#txt_TaxAuthorityCode').val('');
            $('#txt_PeriodIntervalType').val('');
            $('#txt_PeriodIntervalUnit').val('');
        }

    },

    do_loadoverview: () => {

        var _data = {};
        _data["cocd"] = SalesTaxComponentObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "sales-tax-component.aspx/loadVendorAccountOverviewlist",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                SalesTaxComponentObject.do_populateOverview(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateOverview: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#item_table",
            fields: [
                { label: "SaleTaxCompCd", name: "SaleTaxCompCd" },
                { label: "SaleTaxCompDesc", name: "SaleTaxCompDesc" },
                { label: "MethodOfCalc", name: "MethodOfCalc" },
                { label: "AuthName", name: "AuthName" },
                { label: "IsBlock", name: "IsBlock" },
            ],
        });

        var roletable = $("#item_table");
        //userstable.html("");

        var roledata = [];

        for (var i = 0; i < obj.length; i++) {
            var objnew = obj[i];
            for (var key in objnew) {
                var attrName = key;
                if (attrName.toLowerCase() == "table") {
                    roledata = objnew[key];
                }
            }
        };


        roletable.dataTable({
            dom: "Bfrtip",
            fixedHeader: true,
            data: roledata,
            columns: [
                { data: "SaleTaxCompCd" },
                { data: "SaleTaxCompDesc" },
                { data: "MethodOfCalc" },
                { data: "AuthName" },
                { data: "IsBlock" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [20, 50, 25, 50, 50],
            buttons: [
                {
                    add: "create", text: 'New', disabled: 'true', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'create_salestaxcomponent'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'edit'); },
                    attr: {
                        title: 'Edit',
                        id: 'edit_salestaxcomponent'
                    },
                },
                {
                    extend: "remove", text: "Delete", editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'remove',
                        id: 'remove_salestaxcomponent'
                    },
                },
                {
                    add: "Tax Value", text: 'Tax Value', editor: editor, action: function () { doactiontaxvalue($('.selected').attr('RowId'), 'taxvalue', $('.selected').attr('code'), $('.selected').attr('descr')); },
                    attr: {
                        title: 'Tax Value',
                        id: 'TaxValue'
                    },

                }
                
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("code", `${data.SaleTaxCompCd}`);
                $(row).attr("descr", `${data.SaleTaxCompDesc}`);
            },
        });


        var table = $('#item_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!SalesTaxComponentObject._deleteperm[0]) {
                    $('#remove_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#remove_salestaxcomponent').prop("disabled", true);
                    $('#remove_salestaxcomponent').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }

        });

        if (!SalesTaxComponentObject._createperm[0]) {
            $('#create_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#create_salestaxcomponent').prop("disabled", true);
            $('#create_salestaxcomponent').attr('title', 'do not have Add permission!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!SalesTaxComponentObject._editperm[0]) {
            $('#edit_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#edit_salestaxcomponent').prop("disabled", true);
            $('#edit_salestaxcomponent').attr('title', 'do not have Edit permission!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!SalesTaxComponentObject._deleteperm[0]) {
            $('#remove_salestaxcomponent').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#remove_salestaxcomponent').prop("disabled", true);
            $('#remove_salestaxcomponent').attr('title', 'do not have Delete permission!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        

        if (!SalesTaxComponentObject._taxvalueviewperm[0]) {
            $('#TaxValue').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#TaxValue').prop("disabled", true);
            $('#TaxValue').attr('title', 'do not have view permission!!!');
            table.button(3).action(function () {
                this.active(false);
            });
        }
       

    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["id"] = id;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "sales-tax-component.aspx/doedit",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                for (var i = 0; i < obj.length; i++) {
                    var objnew = obj[i];
                    for (var key in objnew) {
                        var attrName = key;
                       
                        if (attrName.toLowerCase() == "table") {
                            if (objnew[key].length > 0) {
                                SalesTaxComponentObject.hdnid = objnew[key][0].RowId;
                                $('#txt_SaleTaxCompCd').val(objnew[key][0].SaleTaxCompCd);
                                $('#txt_SaleTaxCompCd').prop('readonly', true);
                                $('#txt_ROffTo').val(objnew[key][0].ROffTo);
                                $('#txt_SaleTaxCompDesc').val(objnew[key][0].SaleTaxCompDesc);
                                $('#txt_percentageamnt').val(objnew[key][0].MethodOfCalc_txt);

                                $('#dd_ROffRule').val(objnew[key][0].ROffRule);
                                $('#dd_TaxJurisdictionId').val(objnew[key][0].TaxJurisdictionId);
                                $('#dd_SettleId').val(objnew[key][0].SettleId);
                                SalesTaxComponentObject.do_changesettlement();

                                $('#dd_AcId_SaleTaxPayable').val(objnew[key][0].AcId_SaleTaxPayable);
                                $('#dd_AcId_UseTaxPayable').val(objnew[key][0].AcId_UseTaxPayable);
                                $('#dd_AcId_TaxSettlement').val(objnew[key][0].AcId_TaxSettlement);

                                $('#dd_MethodOfCalc').val(objnew[key][0].MethodOfCalc);

                                //SalesTaxComponentObject.do_render_lookup();
                                SalesTaxComponentObject.do_loadBasisofCalculation(objnew[key][0].MethodOfCalc);
                                SalesTaxComponentObject.do_loadTaxonTax(objnew[key][0].BasisOfCalc);

                                $('#dd_BasisOfCalc').val(objnew[key][0].BasisOfCalc);
                                $('#dd_TaxOnTax').val(objnew[key][0].TaxOnTax);
                                $('#dd_Unit').val(objnew[key][0].Unit);
                               

                                if (objnew[key][0].IsBlock == true) {
                                    $('#chk_isblocked').prop('checked', true);
                                }
                                else {
                                    $('#chk_isblocked').prop('checked', false);
                                }

                                $('#div_block').show();
                            }
                        }
                    }
                }
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });
    },

    do_getUserPagepermission: () => {
        MainObject.do_getuserpageaccess(SalesTaxComponentObject);
        SalesTaxComponentObject._vieweperm = MainObject.do_IsActionMenuPermission(SalesTaxComponentObject.access, 'SALES TAX COMPONENT', 'view');
        SalesTaxComponentObject._createperm = MainObject.do_IsActionMenuPermission(SalesTaxComponentObject.access, 'SALES TAX COMPONENT', 'create');
        SalesTaxComponentObject._editperm = MainObject.do_IsActionMenuPermission(SalesTaxComponentObject.access, 'SALES TAX COMPONENT', 'edit');
        SalesTaxComponentObject._deleteperm = MainObject.do_IsActionMenuPermission(SalesTaxComponentObject.access, 'SALES TAX COMPONENT', 'delete');
        //SalesTaxComponentObject._taxvalueviewperm = MainObject.do_IsActionMenuPermission(SalesTaxComponentObject.access, 'Dimension', 'view');
        SalesTaxComponentObject._taxvalueviewperm = MainObject.do_IsActionMenuPermission(SalesTaxComponentObject.access, 'TAX VALUE', 'view');
    },

};

var showmodal = function () {
    $('.modal-title').html('Sales Tax Component - New');
    SalesTaxComponentObject.hdnid = '';
    $("#div_modal").find("*").prop('disabled', false);

    $('#txt_SaleTaxCompCd').val('');
    $('#txt_SaleTaxCompCd').prop('readonly', false);
    $('#txt_ROffTo').val('');
    $('#txt_SaleTaxCompDesc').val('');
    $('#dd_ROffRule').val('');
    $('#dd_TaxJurisdictionId').val('0');
    $('#dd_SettleId').val('0');
    //SalesTaxComponentObject.do_changesettlement($('#dd_SettleId'));

    $('#dd_AcId_SaleTaxPayable').val('0');
    $('#dd_AcId_UseTaxPayable').val('0');
    $('#dd_AcId_TaxSettlement').val('0');

    $('#dd_MethodOfCalc').val('P');
   
    SalesTaxComponentObject.do_render_lookup();
    SalesTaxComponentObject.do_loadBasisofCalculation('P');
    SalesTaxComponentObject.do_loadTaxonTax('');

    $('#chk_isblocked').prop('checked', false);
    $('#div_block').hide();

    $("#myModal").modal('show');

};

var getempname = function (sel) {
    $('#txt_ename').val($("option:selected", sel).attr("ename"));
};

var savedata = function () {
    var validate = true;

    if ($('#txt_SaleTaxCompCd').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txt_SaleTaxCompCd").focus();
        return false;
    }
    
    else {
        var _data = '{id:"' + SalesTaxComponentObject.hdnid + '", code: "' + encodeURIComponent($("#txt_SaleTaxCompCd").val().trim()) + '", cocd: "' + encodeURIComponent(SalesTaxComponentObject.cocd) + '"}';

        $.ajax({
            type: "POST",
            url: "sales-tax-component.aspx/docheckcode",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d.toLowerCase() == "false") {
                    validate = true;
                } else if (result.d.toLowerCase() == "true") {
                    validate = false;
                    $.alertable.alert(
                        `Code Already Exists.\n Please Try Another Code.`
                    );
                    $("#txt_SaleTaxCompCd").focus();
                    validate = false;
                    return false;
                }
            },
            failure: function (response) {
                validate = false;
                //$.alertable.alert(`Problem in retreiving items...`);
                $.alertable.alert(`Problem in retreiving items...`);
            },
        });
    }



    var _data = {};
    if (validate == true) {

        if (SalesTaxComponentObject.hdnid == undefined || SalesTaxComponentObject.hdnid == 'undefined') SalesTaxComponentObject.hdnid = '';
        _data["id"] = SalesTaxComponentObject.hdnid;
        _data["cocd"] = SalesTaxComponentObject.cocd;

        _data["code"] = $('#txt_SaleTaxCompCd').val();
        _data["SaleTaxCompDesc"] = $('#txt_SaleTaxCompDesc').val();
        _data["TaxJurisdictionId"] = $('#dd_TaxJurisdictionId').val();
        _data["ROffTo"] = $('#txt_ROffTo').val();
        _data["ROffRule"] = $('#dd_ROffRule').val();

        _data["SettleId"] = $('#dd_SettleId').val();
        _data["AcId_SaleTaxPayable"] = $('#dd_AcId_SaleTaxPayable').val();
        _data["AcId_UseTaxPayable"] = $('#dd_AcId_UseTaxPayable').val();
        _data["AcId_TaxSettlement"] = $('#dd_AcId_TaxSettlement').val();

        _data["MethodOfCalc"] = $('#dd_MethodOfCalc').val();
        _data["BasisOfCalc"] = $('#dd_BasisOfCalc').val();
        _data["TaxOnTax"] = $('#dd_TaxOnTax').val();
        _data["Unit"] = $('#dd_Unit').val();

        _data["isblock"] = $("#chk_isblocked").is(':checked');

        _data["ip"] = SalesTaxComponentObject.ip;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "sales-tax-component.aspx/doSave";
        $.ajax({
            type: "POST",
            url: _url,
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                let suc = result.d.toString().split("|~|")[0];
                let acid = result.d.toString().split("|~|")[1];
                if (suc.toLowerCase() == `true`) {
                    //window.location = "sales-tax-component.aspx";
                    $("#myModal").modal('hide');
                    $("#item_table").dataTable().fnDestroy();
                    SalesTaxComponentObject.do_loadoverview();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};

var doactionModal = function (mode) {
    doaction(SalesTaxComponentObject.hdnid, mode);
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {

        SalesTaxComponentObject.do_loaddataedit(id);
        showmodal();
        $('.modal-title').html('Sales Tax Component - Edit');
        $('#txt_SaleTaxCompDesc').focus();
    }
    else if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '"}';

        $.ajax({
            type: "POST",
            url: "sales-tax-component.aspx/docheckdelete",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d.toLowerCase() == "false") {
                    validate = true;
                } else if (result.d.toLowerCase() == "true") {
                    validate = false;
                    $.alertable.alert(
                        `Cant Delete.`
                    );
                    validate = false;
                    return false;
                }
            },
            failure: function (response) {
                validate = false;
                $.alertable.alert(`Problem in retreiving items...`);
            },
        });

        if (validate == true) {

            $.alertable
                .custconfirm(`Are you want to delete this  Sales tax Component?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + id + '"}';

                        $.ajax({
                            type: "POST",
                            url: "sales-tax-component.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    //window.location = "sales-tax-component.aspx";
                                    $("#item_table").dataTable().fnDestroy();
                                    SalesTaxComponentObject.do_loadoverview();
                                }
                                else if (result.d.toLowerCase() == "true") {
                                    $.alertable.alert(
                                        `Unable to delete.`
                                    );
                                }
                            },
                            failure: function (response) {
                                validate = false;
                                //$.alertable.alert(`Problem in retreiving items...`);
                                $.alertable.alert(`Problem in retreiving items...`);
                            },
                        });

                    },
                    function () {
                        // alert('no delete');
                    }
                );

        }
    }

    
};

var doactiontaxvalue = function (id, mode, code, name) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'taxvalue') {
        localStorage.sales_tax_component_Desc = name;
        localStorage.sales_tax_component_Code = code;

        //window.location = "vendor-dimension.aspx?id=" + id;
        window.location = "tax-value-setup.aspx?id=" + id;
    }

};

var setTwoNumberDecimal = function (obj) {
    var obj_val = $('#' + obj.id).val();
    if (obj_val == '') obj_val = '0.00';
    $('#' + obj.id).val(parseFloat(obj_val).toFixed(2));
};

var onlyNumberKey = function (evt) {
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
};

var ShowIP = function (response) {
    SalesTaxComponentObject.ip = response.ip;
};

var OnchangeIsWitholdingTaxApp = function () {
    if ($("#chk_IsWitholdingTaxApp").is(':checked')) {
        $("#dd_WHTaxGrpCd").prop("disabled", false);
    }
    else {
        $("#dd_WHTaxGrpCd").prop("disabled", true);
        $("#dd_WHTaxGrpCd").val('');
    }
};
