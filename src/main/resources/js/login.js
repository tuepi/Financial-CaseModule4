

let token = ""
function showLogin() {
    // if (token == "") {
        $("#modalLoginForm").modal('show');
    // }
}

function login() {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let user = {
        username : username,
        password : password
    }
    console.log(user)
    $.ajax({

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8000/login",
        data: JSON.stringify(user),
        success: function (data) {
            console.log("OKOKOKOKO")
        //     token = data.accessToken
        //     id = data.id
        //     showUserPage()
        //     let notification = "Successful login."
        //     document.getElementById("notification").innerHTML = notification
        //     $('#modalLoginForm').modal('hide');
        //     $("#myModal").modal('show');
        //     setTimeout(function () {
        //         $("#myModal").modal('hide');
        //     }, 1000);
        },
        error: function (error) {
            console.log(error)
        },
    })
}
