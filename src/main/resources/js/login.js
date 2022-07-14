
function showLogin() {
    if (window.sessionStorage.getItem("TOKEN_KEY") == null) {
        $("#modalLoginForm").modal('show');
    }
}

function login() {
    let logInForm = {};
    logInForm.username = $('#username').val();
    logInForm.password = $('#password').val();
    $.ajax({
        async: false,
        url: 'http://localhost:8000/login',
        method: 'POST',
        data: JSON.stringify(logInForm),
        contentType: 'application/json; charset=utf8',
        success: function (data) {
            window.sessionStorage.removeItem('TOKEN_KEY');
            window.sessionStorage.setItem('TOKEN_KEY', data.accessToken);
            window.sessionStorage.removeItem('NAME_KEY');
            window.sessionStorage.setItem('NAME_KEY', data.username);
            window.sessionStorage.removeItem('AVATAR_KEY');
            window.sessionStorage.setItem('AVATAR_KEY', data.avatar);
            window.sessionStorage.removeItem('ID_USER_KEY');
            window.sessionStorage.setItem('ID_USER_KEY', data.id);
            let notification = "Successful"
            let notificationCancel = "Fail"
            document.getElementById("notification").innerHTML = notification
            document.getElementById("notificationCancel").innerHTML = notificationCancel
            console.log(window.sessionStorage.getItem("AVATAR_KEY"))
            $('#modalLoginForm').modal('hide');
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
            profile()
            // showAllWallet();
            showAllWallet();
            showAllMoneyDetailIndex();
            showAllCategory()
        }
    })
}

function register() {
    let noUser={
        message:"no"
    }
    let createSuccess={
        message:"yes"
    }
    let signUpForm = {};
    signUpForm.username = $('#user').val();
    signUpForm.password = $('#pass').val();
    signUpForm.confirmPassword = $('#confirmPassword').val();
    console.log(signUpForm);
    $.ajax({
        url: 'http://localhost:8000/register',
        method: 'POST',
        data: JSON.stringify(signUpForm),
        contentType: 'application/json; charset=utf8',
        success: function (data) {
            console.log('data ===', data);
            if (signUpForm.confirmPassword === signUpForm.confirmPassword) {
                if (JSON.stringify(data) == JSON.stringify(noUser)) {
                    document.getElementById('status').innerHTML = 'The username is existed! Please try again!'
                    document.getElementById("status").style.color = "red";
                }
            }else {
                document.getElementById("")
            }
            if (JSON.stringify(data) == JSON.stringify(createSuccess)) {
                document.getElementById('status').innerHTML = 'Create User Account Success!'
                document.getElementById("status").style.color = "green";
            }
            $("#modalRegisterForm").modal('hide');
            $("#modalLoginForm").modal('show');
        }
    })
}

function logout() {
    window.sessionStorage.clear();
    window.sessionStorage.removeItem("TOKEN_KEY")
    document.getElementById("display").innerHTML = "";
    document.getElementById("showCategory").innerHTML = "";
    document.getElementById("homeSubmenu").innerHTML = "";
    profile()
    $("#modalLoginForm").modal('show');
}

function showEditUser() {
    $("#modalEditForm").modal('show');
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY")
        },
        type: "GET",
        url: "http://localhost:8000/users/" + window.sessionStorage.getItem("ID_USER_KEY"),
        success: function (account) {
            console.log(account.username)
            document.getElementById('usernameEdit').innerHTML = ` ${account.username} `
            document.getElementById('id').value = account.id
            document.getElementById("oldFile").innerHTML = `<img  src="${account.avatar}" style="max-width: 50px;
                                                                           height: 50px;margin-left: 3rem;width: 92%;">`;
        }
    })
}

function change_pass() {
    let avatar = localStorage.getItem(key);
    let changePasswordForm={};
    changePasswordForm.password=$('#passEdit').val();
    changePasswordForm.id = $('#id').val();
    changePasswordForm.avatar = avatar;
    let changePassword=JSON.stringify(changePasswordForm);
    console.log(changePasswordForm)
    $.ajax({
        headers:{
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY")
        },
        url: 'http://localhost:8000/users/'+ window.sessionStorage.getItem("ID_USER_KEY"),
        method: 'PUT',
        data: changePassword,
        contentType: 'application/json; charset=utf8',
        success: function (data) {
            console.log(data.avatar)
            document.getElementById("passEdit").value = "";
            $("#modalEditForm").modal('hide');
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
            window.sessionStorage.setItem('AVATAR_KEY', data.avatar);
            changePassword = "";
            profile()
        }
    })
}

function resetValue() {
    document.getElementById("passEdit").value = "";
    $("#myModalCancel").modal('show');
    setTimeout(function () {
        $("#myModalCancel").modal('hide');
    }, 1000);
}

function profile() {
    if (window.sessionStorage.getItem("TOKEN_KEY") != null) {
        document.getElementById("profile").innerHTML = `<a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false"><i class="fa " > ${window.sessionStorage.getItem("NAME_KEY")} </i> </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-cyan"
                             aria-labelledby="navbarDropdownMenuLink-4" id="">
                            <a class="dropdown-item" data-target="#modalLoginForm" onclick="logout()">Logout</a>
                            <a class="dropdown-item" data-target="#modalRegisterForm" onclick="showEditUser()">ChangePassword</a>
                        </div>`;
    } else {
        document.getElementById("profile").innerHTML = ""
    }
    document.getElementById("avatar").innerHTML = `<img src="${window.sessionStorage.getItem("AVATAR_KEY")}" style="height: 100px;width: 100px;border-radius: 50%">`
    localStorage.removeItem(key);
}








