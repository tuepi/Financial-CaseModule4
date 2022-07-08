function showRegister(){
    $('#registerModal').modal('show');
}

function register(){
    let addForm= document.getElementById("addForm");
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let user={
        username: username  ,
        password:password,
        confirmPassword:confirmPassword,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8000/register",
        data: JSON.stringify(user),
        success: function () {
            alert("Register done!")
            $('#registerModal').modal('hide');
            addForm.reset();
        },
        error: function (error) {
            console.log(error)
        }
    })
}


function loginForm() {
    $('#loginModal').modal('show');
}

function login() {

    let username = document.getElementById('username1').value;
    let password = document.getElementById('password1').value;
    let user = {
        username: username,
        password: password
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8000/login",
        data: JSON.stringify(user),
        success: function (data) {
            console.log(data)
            localStorage.setItem('token', data.accessToken)
            localStorage.setItem('id', data.id)
            $("#loginModal").modal("hide")
            home();
            loaddataWallet(0)
            write()


        },
        error: function (error) {
            document.write("Sai tai khoan or mat khau")
            console.log(error)
        }
    })
}

function write() {
    let str = `<button onclick="roleUser()">User</button>
    <button onclick="roleAdmin()">Admin</button>`
    main.innerHTML = str
}

function roleAdmin() {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        type: "GET",
        url: "http://localhost:8000/admin/users",
        success: function (data) {
            console.log(data)
            writeUser(data)
            $("#loginModal").modal("hide")
            home();
            loaddataWallet(0)
        },
        error: function (error) {
            document.getElementById("main").innerHTML = `<h4>Bạn không có quyền ở đây<\h4>`
            console.log(error)
        }
    })
}

function roleUser() {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        type: "GET",
        url: "http://localhost:8000/users",
        success: function (data) {
            console.log(data)
            writeUser(data)
            $("#loginModal").modal("hide")
            home();
            loaddataWallet(0)
        },
        error: function (error) {
            document.getElementById("main").innerHTML = `<h4>Bạn không có quyền ở đây<\h4>`
            console.log(error)
        }
    })
}

function writeUser(data) {
    let str = ""
    for (let i = 0; i < data.length; i++) {
        str += `<h4>Id : ${data[i].id}, ${data[i].username} - Tôi là User<\h4>`
    }
    document.getElementById("main").innerHTML = str
}



function logoutForm(){
    localStorage.removeItem('token');
    loadHome()
}