$(document).ready(function () {
    //do_loadFinyr();
    localStorage.clear();
});

var dochkses = function (rest) {
    if (rest.indexOf("CLXID='489660C5-3D11-4512-AD3C-00C4EF8F6851'") >= 0) {
        alert('Your session timeout has occurred. You will be logged out automatically');
        window.location.href = "login.aspx";
        return false;
    }
    return true;
};

/*var do_loadFinyr = function () {
    $.ajax({
        type: "POST",
        async: false,
        url: "login.aspx/loadfinyear",
        data: JSON.stringify({ val: '' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (!dochkses(result.d)) return;
            var obj = JSON.parse(`[${result.d}]`);
            for (var i = 0; i < obj.length; i++) {
                var objnew = obj[i];
                for (var key in objnew) {
                    var attrName = key;
                    if (attrName.toLowerCase() == "table") {//finyear
                        //CoaSetup.lookup.fa_AcType = objnew[key];
                        var _html = [];
                        $.each(objnew[key], function (key, value) {
                            _html.push("<option value='" + value.FinYr + "' StDt='" + value.StDt + "' EdDt='" + value.EdDt + "'>" + value.FinYr + "</option>");
                        });
                        $('#dd_finyear').html(_html.join(''));
                    }
                    
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " - Error occurred");
        }
    });
};*/

var doLogin = function () {
    var _data = {};
    _data["username"] = $('#txtusername').val();
    _data["psw"] = $('#txtuserpw').val();
    //_data["finyr"] = $('#dd_finyear').val();

    var passdata = {
        data: ""
    };
    passdata.data = JSON.stringify(_data);

    $.ajax({
        type: "POST",
        url: "login.aspx/dologin",
        data: JSON.stringify(passdata),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (result) {
            if (!dochkses(result.d)) return;
            var value = result.d;
            var _valiedlogin, _permission = '';
            _valiedlogin = value.split('Ç')[0].toLowerCase();
            if (_valiedlogin.toLowerCase() == "true") {
                _permission = value.split('Ç')[1].toLowerCase();
                _ispostingallowed = value.split('Ç')[2];
                if (_ispostingallowed == 'N') {
                    alert("Posting Not Allowed, Please Contact Administartor.");
                    return;
                }
                localStorage.permission = _permission;
                window.location = "home/home.aspx";
            }
            else {
                alert("Invalid Username or Password.\n Please Try Again.");
            }

            /*if (result.d == "True") { window.location = "home/home.aspx"; }
            else { alert("Invalid Username or Password.\n Please Try Again."); }*/
        },
        failure: function (response) {
            /*alert(response.d);*/
            alert('Problem in retreiving items...');
        }
    });
};

var dolog = function (e) {
    if (e.keyCode == 13) {
        doLogin();
    }
};