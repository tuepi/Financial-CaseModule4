
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
            console.log("vao day")
            window.sessionStorage.removeItem('TOKEN_KEY');
            window.sessionStorage.setItem('TOKEN_KEY', data.accessToken);
            window.sessionStorage.removeItem('NAME_KEY');
            window.sessionStorage.setItem('NAME_KEY', data.username);
            window.sessionStorage.removeItem('AVATAR_KEY');
            window.sessionStorage.setItem('ID_USER_KEY', data.id);
            let notification = "Successful login."
            document.getElementById("notification").innerHTML = notification
            $('#modalLoginForm').modal('hide');
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
            profile()
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
    profile()
    $("#modalLoginForm").modal('show');
}
function change_pass() {
    let no={
        message:"no"
    }
    let yes={
        message:"yes"
    }
    let changePasswordForm={};
    changePasswordForm.currentPassword=$('#currentPassword').val();
    changePasswordForm.newPassword=$('#newPassword').val();
    let changePassword=JSON.stringify(changePasswordForm);
    console.log("changPASSform=",changePasswordForm)
    $.ajax({
        headers:{
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY")
        },
        url: 'http://localhost:8000/users/change-password',
        method: 'PUT',
        data: changePassword,
        contentType: 'application/json; charset=utf8',
        success: function (data) {
            console.log('data ===', data);
            if (JSON.stringify(data) == JSON.stringify(no)) {
                console.log("failed")
                document.getElementById('status').innerHTML = 'Old password is not correct! Please try again!'
            }
            if (JSON.stringify(data) == JSON.stringify(yes)) {console.log("success")
                document.getElementById('status').innerHTML = "Change password successfully!"
            }
        }
    })
}


function profile() {
    if (window.sessionStorage.getItem("TOKEN_KEY") != null) {
        document.getElementById("profile").innerHTML = `<a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false"><i class="fa " > ${window.sessionStorage.getItem("NAME_KEY")} </i> </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-cyan"
                             aria-labelledby="navbarDropdownMenuLink-4" id="">
                            <a class="dropdown-item" data-target="#modalLoginForm" onclick="logout()">Logout</a>
                            <a class="dropdown-item" data-target="#modalRegisterForm" onclick="change_pass()">ChangePassword</a>
                        </div>`;
    } else {
        document.getElementById("profile").innerHTML = ""
    }
}








