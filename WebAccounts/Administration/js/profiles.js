var deleteDates = [];
var ProObject = {
    profiledata: [{
        CoCd: '',
        CoName: '',
        LCurrCd: '',
        IsBlock:'',
        row_id:'',
    }],

    do_loadprofile: () => {
        $.ajax({
            type: "POST",
            url: "profiles.aspx/do_loadprofile",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                var rest = result.d;
                //var resJson = JSON.parse(rest);
                //rolesloadfromdb = true;
                var obj = JSON.parse(`[${result.d}]`);
                dopopulateprofiletable(obj);                
            },
            failure: function (response) {
                alert('Problem in retreiving items...');
            }
        });
    },
    
    
    do_saveprofile: () => {
        dosaveprofile();
    },

    do_deleteprofile: () => {
        dodeleteprofile();
    },

};

const dopopulateprofiletable = (obj) => {
    //insertEmptyRow();
    var html = "";
    var visstyle = "";
    var htmlProfile = [];
    var htmlDateFormat = [];
    var htmlstartDate = [];
    $('#budget_table').html('');

    for (var i = 0; i < obj.length; i++) {
        var objnew = obj[i];
        for (var key in objnew) {
            var attrName = key;
            if (attrName.toLowerCase() == "table") {
                htmlProfile = objnew[key];
            }

            if (attrName.toLowerCase() == "table") {
                htmlProfile = objnew[key];
            }

            if (attrName.toLowerCase() == "table1") {
                var _currency = objnew[key];
                var _html = [];
                $.each(_currency, function (key, value) {
                    _html.push(
                        "<option value='" + value.CurrCd + "' desc='" + value.Currdesc + "'>" + value.CurrCd + "</option>"
                    );
                });

                $("#ddlcurrency").html(_html.join(""));
                $("#ddlcurrency").prepend("<option value='' selected='selected'>Choose...</option>");

                $("#ddleditcurrency").html(_html.join(""));
                $("#ddleditcurrency").prepend("<option value='' selected='selected'>Choose...</option>");
                //$("#selectUser").val(RoleAssignment.CurrCd);
            }
        }
    }

    
    $("#budget_table").append(
        "<thead><tr>" +        
        "<th>Code</th><th>Description</th><th>Local Currency</th>" +
        "<th>Block</th>" +
        "<tbody>"
    );


    $("#budget_table").append("</tbody>");

    //ashim
    // editor init
    var editor = new $.fn.dataTable.Editor({
        table: "#budget_table",
        fields: [
            { label: "Code", name: "CoCd" },
            { label: "Description", name: "CoName" },
            { label: "Local Currency", name: "LCurrCd" },
            { label: "Block", name: "IsBlock", type: "checkbox", separator: "|", options: [{ label: '', value: 1 }] },
        ],
    });
    const tableEl = $("#budget_table");
    // datatables init
    //$('.selected').attr('id')
    //tableEl.DataTable({


    //tableEl.destroy();    
    tableEl.dataTable({
        dom: "Bfrtip",        
        fixedHeader: true,
        data: htmlProfile,
        columns: [
            {
                data: "CoCd"
            },
            { data: "CoName" },
            {
                data: "LCurrCd"
            },
            {
                data: "IsBlock",
                render: function (data, type, row) {
                    if (type === 'display' && data == true) {
                        return '<input type="checkbox"  checked="checked" disabled="disabled">';
                    }
                    else {
                        return '<input type="checkbox" disabled="disabled">';
                    }
                },
            },            
        ],
        select: true,
        buttons: [
            {
                add: "create", text: 'New', editor: editor, action: () => showmodal()
            },
            {
                add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit($('.selected').attr('CoCd'), $('.selected').attr('CoName'), $('.selected').attr('LCurrCd'), $('.selected').attr('IsBlock'))
            },
            {
                extend: "remove", editor: editor, action: () => showmodaldelete($('.selected').attr('CoCd'), $('.selected').attr('CoName'), $('.selected').attr('LCurrCd'), $('.selected').attr('IsBlock'))
            }
        ],
        createdRow: function (row, data, dataIndex) {
            $(row).attr("Row_Id", `${data.Row_Id}`);
            $(row).attr("CoCd", `${data.CoCd}`);
            $(row).attr("CoName", `${data.CoName}`);
            $(row).attr("LCurrCd", `${data.LCurrCd}`);
            $(row).attr("IsBlock", `${data.IsBlock}`);
        },
    });    
    //end

};

var dosaveprofile = function () {

    var validate = true;

    if ($('#txtCode').val() == '') {
        validate = false;
        alert('Profile code required.');
        $('#txtCode').focus();
        return false;
    }

    if ($('#txtDescription').val() == '') {
        validate = false;
        alert('Please Enter Description.');
        $('#txtDescription').focus();
        return false;
    }
    

    if (validate == true) {
        var _data = {};        
        _data["Code"] = $('#txtCode').val();
        _data["Description"] = $('#txtDescription').val();
        _data["Currency"] = $('#ddlcurrency').val();
        _data["Block"] = $('#chk_block').is(":checked");
        _data["I_U_Flag"] = 'I';

        var passdata = {
            data: ""
        };
        passdata.data = JSON.stringify(_data);

        $.ajax({
            type: "POST",
            url: "profiles.aspx/doSaveProfile",
            data: JSON.stringify(passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") { alert("Profiles saved successfully."); window.location = "profiles.aspx"; }
                else { alert("Problem in saving data...\n Please Try Again."); }
            },
            failure: function (response) {
                /*alert(response.d);*/
                alert('Problem in saving data...');
            }
        });
    }
};

var showmodaledit = function (CoCd, CoName, LCurrCd, IsBlock) {
    if (CoCd == undefined || CoCd == null) {
        alert('Please select the row...');
        return;
    }

    $('#edittxtcode').val(CoCd);
    $('#edittxtdescription').val(CoName);
    $('#ddleditcurrency').val(LCurrCd);
    if (IsBlock == 'true') {
        $("#chkeditblock").prop('checked', true);        
    } else {
        $("#chkeditblock").prop('checked', false);
    }    

    if ($('#edittxtcode').val() != '') {
        $('#edittxtcode').prop('disable', true);
    }

    $("#myModalEDIT").modal('show');
};

var updateprofiles = function () {
    var _data = {}; 

    _data["Code"] = $('#edittxtcode').val();
    _data["Description"] = $('#edittxtdescription').val();
    _data["Currency"] = $('#ddleditcurrency').val();
    _data["Block"] = $('#chkeditblock').is(":checked");
    _data["I_U_Flag"] = 'U';

    var passdata = {
        data: ""
    };
    passdata.data = JSON.stringify(_data);

    $.ajax({
        type: "POST",
        url: "profiles.aspx/doupdateprofiles",
        data: JSON.stringify(passdata),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            if (!dochkses(result.d)) return;
            if (result.d == "True") {
                alert("Profile Updated successfully.");
                window.location = "Profiles.aspx";
            }
        },
        failure: function (response) {
            alert('Problem in Updated Profile...');
        }
    });
};

var showmodaldelete = function (CoCd, CoName, LCurrCd, IsBlock) {
    var _data = {};

    _data["Code"] = CoCd;
    _data["Description"] = CoName;
    _data["Currency"] = LCurrCd;
    _data["Block"] = IsBlock;
    _data["I_U_Flag"] = 'D';

    var passdata = {
        data: ""
    };
    passdata.data = JSON.stringify(_data);

    if (confirm("Are you sure want to delete?")) {
        $.ajax({
            type: "POST",
            url: "profiles.aspx/dodeleteprofiles",
            data: JSON.stringify(passdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (!dochkses(result.d)) return;
                if (result.d == "True") {
                    alert("Profile deleted successfully .");
                    window.location = "profiles.aspx";
                }
            },
            failure: function (response) {
                alert('Problem in deleting Profile...');
            }
        });
    }    
};

