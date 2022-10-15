$(document).ready(function () {
    CustomerShipmentMethodObject.cocd = $('#ddlCompany').val();
    CustomerShipmentMethodObject.do_loadvendorshipment();
    //CustomerShipmentMethodObject.do_loadlookup();
    CustomerShipmentMethodObject.do_getUserPagepermission();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.ipify.org?format=jsonp&callback=ShowIP";
    document.getElementsByTagName("head")[0].appendChild(script);
});

var CustomerShipmentMethodObject = {
    cocd: '',
    type: '',
    _vieweperm: false,
    _createperm: false,
    _editperm: false,
    _deleteperm: false,

    do_loadlookup: () => {
        var _data = {};
        _data["cocd"] = CustomerShipmentMethodObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            async: false,
            url: "../handler/datahandler.aspx/loadlookupdataVendorAccountOverview",
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
                            CustomerShipmentMethodObject.VendorPostingGroup = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table1") {
                            CustomerShipmentMethodObject.Currency = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table2") {
                            CustomerShipmentMethodObject.County = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table3") {
                            CustomerShipmentMethodObject.State = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table4") {
                            CustomerShipmentMethodObject.PaymentTerm = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table5") {
                            CustomerShipmentMethodObject.PaymentMothod = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table6") {
                            CustomerShipmentMethodObject.ShipmentMethod = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table7") {
                            CustomerShipmentMethodObject.NatureofBusiness = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table8") {
                            CustomerShipmentMethodObject.BranchApplicable = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table9") {
                            CustomerShipmentMethodObject.PersonResponsible = JSON.stringify(objnew[key]);
                        }
                        /*else if (attrName.toLowerCase() == "table10") {
                            CustomerShipmentMethodObject.BankAccount = JSON.stringify(objnew[key]);
                        }*/
                        else if (attrName.toLowerCase() == "table11") {
                            CustomerShipmentMethodObject.WitholdingTaxGroup = JSON.stringify(objnew[key]);
                        }
                        else if (attrName.toLowerCase() == "table12") {
                            CustomerShipmentMethodObject.SelsTaxGroup = JSON.stringify(objnew[key]);
                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " - Error occurred");
            },
        });
    },

    do_loadvendorshipment: () => {

        var _data = {};
        _data["cocd"] = CustomerShipmentMethodObject.cocd;
        
        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "customer-shipment-method.aspx/loadVendorShipmentMethod",
            data: JSON.stringify(_passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                var obj = JSON.parse(`[${result.d}]`);
                CustomerShipmentMethodObject.do_populateVendorAccountShipment(obj);
            },
            failure: function (response) {
                alert(response.d);
                alert('Problem in retreiving items...');
            }
        });

    },

    do_populateVendorAccountShipment: (obj) => {
        // editor init
        var editor = new $.fn.dataTable.Editor({
            table: "#customer_table",
            fields: [
                { label: "MethodCd", name: "MethodCd" },
                { label: "MethodDesc", name: "MethodDesc" },
                { label: "IsBlock", name: "IsBlock" },
            ],
        });

        var roletable = $("#customer_table");
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
                { data: "MethodCd" },
                { data: "MethodDesc" },
                { data: "IsBlock" },
            ],
            select: true,
            scrollX: true,
            lengthMenu: [50, 60],//, 25, 50, 50, 50
            buttons: [
                {
                    add: "create", text: 'New', editor: editor, action: () => showmodal(),
                    attr: {
                        title: 'New',
                        id: 'customer_create'
                    },
                },
                {
                    add: "edit", text: 'Edit', editor: editor, action: () => doaction($('.selected').attr('RowId'), 'edit'),
                    attr: {
                        title: 'Edit',
                        id: 'customer_edit'
                    },
                },
                {
                    extend: "remove", editor: editor, action: function () { doaction($('.selected').attr('RowId'), 'delete'); },
                    attr: {
                        title: 'Delete',
                        id: 'customer_delete'
                    },
                }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).attr("RowId", `${data.RowId}`);
                $(row).attr("MethodCd", `${data.MethodCd}`);
                $(row).attr("MethodDesc", `${data.MethodDesc}`);
            },
        });


        var table = $('#customer_table').DataTable();

        table.on('select', function () {
            var selectedRows = table.rows({
                selected: true
            }).count();
            if (selectedRows == 1) {
                if (!CustomerShipmentMethodObject._deleteperm) {
                    $('#customer_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
                    $('#customer_delete').prop("disabled", true);
                    $('#customer_delete').attr('title', 'do not have delete permission!!!');
                    table.button(2).action(function () {
                        this.active(false);
                        //this.disable();
                    });
                }
            }
            //alert(selectedRows);
            //table.button(1).enable(selectedRows === 1);
            //table.button(2).enable(selectedRows === 1);
            //table.button(3).enable(selectedRows === 1);
            //table.button( 1 ).enable( selectedRows > 0 );
        });

        if (!CustomerShipmentMethodObject._createperm) {
            $('#customer_create').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#customer_create').prop("disabled", true);
            $('#customer_create').attr('title', 'do not have permission to Add New Record!!!');
            table.button(0).action(function () {
                this.active(false);
            });
        }
        if (!CustomerShipmentMethodObject._editperm) {
            $('#customer_edit').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#customer_edit').prop("disabled", true);
            $('#customer_edit').attr('title', 'do not have permission to Edit Record!!!');
            table.button(1).action(function () {
                this.active(false);
            });
        }
        if (!CustomerShipmentMethodObject._deleteperm) {
            $('#customer_delete').addClass('btn btn-secondary buttons-selected buttons-remove disabled');
            $('#customer_delete').prop("disabled", true);
            $('#customer_delete').attr('title', 'do not have delete permission!!!');
            table.button(2).action(function () {
                this.active(false);
                //this.disable();
            });
        }
        //if (!CustomerShipmentMethodObject._vieweperm) {
        //    table.button(3).action(function () {
        //        this.active(false);
        //    });
        //}
    },

    do_loaddataedit: (id) => {

        var _data = {};
        _data["id"] = id;
        _data["cocd"] = CustomerShipmentMethodObject.cocd;

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "customer-shipment-method.aspx/doedit",
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
                                CustomerShipmentMethodObject.hdnid = objnew[key][0].RowId;
                                $('#txtCode').val(objnew[key][0].MethodCd);
                                $('#txtCode').prop('readonly', true);
                                $('#txtDesc').val(objnew[key][0].MethodDesc);
                                if (objnew[key][0].Block == 1) {
                                    $('#chk_block').prop('checked', true);
                                } else {
                                    $('#chk_block').prop('checked', false);
                                }
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
        MainObject.do_getuserpageaccess(CustomerShipmentMethodObject);
        CustomerShipmentMethodObject._vieweperm = MainObject.do_IsActionMenuPermission(CustomerShipmentMethodObject.access, 'Customer Shipment Method', 'view');
        CustomerShipmentMethodObject._createperm = MainObject.do_IsActionMenuPermission(CustomerShipmentMethodObject.access, 'Customer Shipment Method', 'create');
        CustomerShipmentMethodObject._editperm = MainObject.do_IsActionMenuPermission(CustomerShipmentMethodObject.access, 'Customer Shipment Method', 'edit');
        CustomerShipmentMethodObject._deleteperm = MainObject.do_IsActionMenuPermission(CustomerShipmentMethodObject.access, 'Customer Shipment Method', 'delete');
    },

};

var showmodal = function () {
    $('.modal-title').html('Customer Shipment - New');
    $('#txtCode').val('');
    $('#txtCode').prop('readonly', false);
    $('#txtDesc').val('');
    $('#div_block').hide();
    $("#myModal").modal('show');
};
var showmodaledit = function () {
    $("#myModal").modal('show');
};

var doaction = function (id, mode) {
    if (id == "" || id == undefined || id == "undefined") return;

    if (mode == 'edit') {

        CustomerShipmentMethodObject.do_loaddataedit(id);
        $('.modal-title').html('Customer Shipment - Edit');
        $('#txt_VendName').focus();
        $('#div_block').show();
        $("#myModal").modal('show');
    }
    else if (mode == 'delete') {

        var validate = true;

        var _data = '{id:"' + id + '"}';

        $.ajax({
            type: "POST",
            url: "customer-shipment-method.aspx/docheckdelete",
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
                .custconfirm(`Are you want to delete?`, ``, `Yes`, `No`)
                .then(
                    function () {

                        var _data;
                        _data = '{id:"' + id + '"}';

                        $.ajax({
                            type: "POST",
                            url: "customer-shipment-method.aspx/dodelete",
                            data: _data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            success: function (result) {
                                if (!dochkses(result.d)) return;
                                if (result.d.toLowerCase() == "false") {
                                    window.location = "customer-shipment-method.aspx";
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

var savedata = function () {
    var validate = true;

    if ($('#txtCode').val() == '') {
        validate = false;
        $.alertable.alert(`Code required.`);
        $("#txtCode").focus();
        return false;
    }
    else if ($('#txtDesc').val() == '') {
        validate = false;
        $.alertable.alert(`Vendor Shipment Description required.`);
        $("#txtDesc").focus();
        return false;
    }
    //else {
    //    var _data = '{id:"' + CustomerShipmentMethodObject.hdnid + '", code: "' + encodeURIComponent($("#txtCode").val().trim()) + '", cocd: "' + encodeURIComponent(CustomerShipmentMethodObject.cocd) + '"}';

    //    $.ajax({
    //        type: "POST",
    //        url: "customer-shipment-method.aspx/docheckcode",
    //        data: _data,
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        async: false,
    //        success: function (result) {
    //            if (!dochkses(result.d)) return;
    //            if (result.d.toLowerCase() == "false") {
    //                validate = true;
    //            } else if (result.d.toLowerCase() == "true") {
    //                validate = false;
    //                $.alertable.alert(
    //                    `Code Already Exists.\n Please Try Another Code.`
    //                );
    //                $("#txt_VendCd").focus();
    //                validate = false;
    //                return false;
    //            }
    //        },
    //        failure: function (response) {
    //            validate = false;
    //            //$.alertable.alert(`Problem in retreiving items...`);
    //            $.alertable.alert(`Problem in retreiving items...`);
    //        },
    //    });
    //}



    var _data = {};
    if (validate == true) {

        if (CustomerShipmentMethodObject.hdnid == undefined || CustomerShipmentMethodObject.hdnid == 'undefined') CustomerShipmentMethodObject.hdnid = '';
        _data["id"] = CustomerShipmentMethodObject.hdnid;
        _data["cocd"] = CustomerShipmentMethodObject.cocd;

        _data["code"] = $('#txtCode').val();
        _data["Desc"] = $('#txtDesc').val();
        _data["Block"] = false;
        if ($("#chk_block").is(':checked')) {
            //if ($('#chk_block').checked) {
            _data["Block"] = true;
        }

        var _passdata = {
            data: "",
        };
        _passdata.data = JSON.stringify(_data);
        //console.log(JSON.stringify(_passdata));

        var _url = "customer-shipment-method.aspx/doSave";
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
                    window.location = "customer-shipment-method.aspx";
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " - Error occurred");
            },
        });

    }
};