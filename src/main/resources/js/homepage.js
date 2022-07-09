/*
function showHomepage() {
    document.getElementById("container").innerHTML =
        `<div class="container-fluid">
<nav class="navbar navbar-toggleable-sm navbar-light bg-faded fixed-top">

   <button class="navbar-toggler navbar-toggler-right hidden-lg-up" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
   </button>

   <a class="navbar-brand" href="javascript:;" style="font-family: 'Arial'; font-size: xx-large" >
    <img src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" width="30" height="30" class="align-top" alt="">
        Financial
   </a>
   <div class="collapse navbar-collapse" id="navbarsExampleDefault">
    <ul class="navbar-nav mr-auto">
     <li class="nav-item active">
      <a class="nav-link" href="javascript:;">middle1<span class="sr-only">(current)</span></a>
     </li>
     <li class="nav-item">
      <a class="nav-link" href="javascript:;">middle2</a>
     </li>
     <li class="nav-item">
      <a class="nav-link" href="javascript:;">middle3</a>
     </li>
     <li class="nav-item">
      <a class="nav-link" href="javascript:;">middle4</a>
     </li>
    </ul>

    <form class="form-inline mt-2 mt-md-0">
     <input class="form-control mr-sm-2" type="text" placeholder="Search">
     <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
   </div>
  </nav>


  <nav class="sidebar" data-toggle="pill">
   <ul class="nav">
<li class="nav-profile">
<div class="image">
<a href="javascript:;"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/325053/profile/profile-80.jpg" alt=""></a>
</div>
<div class="info">
Your Name
<small>Frontend Developer</small>
</div>
</li>
</ul>

   <ul class="nav flex-column">
    <li class="nav-header active">Navigation</li>
    <li class="nav-item">
     <a class="nav-link active" href="javascript:;"><i class="fa fa-bar-chart-o"></i>WAL<span class="sr-only">(current)</span></a>
    </li>
    <li class="nav-item">
     <a class="nav-link" href="javascript:;"><i class="fa fa-cogs"></i>menu left 2</a>
    </li>
    <li class="nav-item">
     <a class="nav-link" href="javascript:;"><i class="fa fa-cloud-download"></i>menu left 3</a>
    </li>
    <li class="nav-item">
     <a class="nav-link" href="javascript:;">
      <i class="fa fa-code"></i>
      menu left 4
     </a>
    </li>

    <li class="nav-item has-sub">
     <a class="nav-link" data-toggle="collapse" href="#sub1" aria-expanded="false" aria-controls="sub1">
<i class="fa fa-align-left"></i>
menu level 1
</a>
     <ul class="sub collapse" id="sub1">
      <li class="nav-item">
<a class="nav-link" href="javascript:;">
menu level 1.1
</a>
      </li>
      <li class="nav-item has-sub">
       <a class="nav-link" data-toggle="collapse" href="#sub2" aria-expanded="false" aria-controls="sub2">
        menu level 1.2
       </a>
        <ul  class="sub collapse" id="sub2">
        <li class="nav-item">
         <a class="nav-link" href="javascript:;">menu level 2.1</a>
        </li>
        <li class="nav-item">
         <a class="nav-link" href="javascript:;">menu level 2.2</a>
        </li>
       </ul>
      </li>
<li class="nav-item">
       <a class="nav-link" href="javascript:;">menu level 1.3</a>
      </li>
</ul>
    </li>

    <li class="nav-item has-sub">
     <a class="nav-link" data-toggle="collapse" href="#sub3" aria-expanded="false" aria-controls="sub3">
<i class="fa fa-align-left"></i>
  menu level 1
 </a>
     <ul class="sub collapse" id="sub3">
      <li class="nav-item">
 <a class="nav-link" href="javascript:;">
menu level 1.1
 </a>
      </li>
      <li class="nav-item has-sub">
       <a class="nav-link" data-toggle="collapse" href="#sub4" aria-expanded="false" aria-controls="sub4">
        menu level 1.2
       </a>
        <ul  class="sub collapse" id="sub4">
        <li class="nav-item">
         <a class="nav-link" href="javascript:;">menu level 2.1</a>
        </li>
        <li class="nav-item">
         <a class="nav-link" href="javascript:;">menu level 2.2</a>
        </li>
       </ul>
      </li>
<li class="nav-item">
       <a class="nav-link" href="javascript:;">menu level 1.3</a>
      </li>
 </ul>
    </li>

    <li class="">
     <a class="sidebar-minify" href="javascript:;">
      <i class="fa fa-angle-double-left"></i>
     </a>
    </li>

   </ul>
  </nav>
</div>`
}*/
$.ajax({
    headers: {
        Authorization: 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    type: "GET",
    url: "http://localhost:8000/wallets/"+id,
    success: function (data) {
        let content = ``;
        for (let i = 0; i < data.length; i++) {
            content += `  <div  class="col-lg-4 col-md-12">
                        <div class="white-box analytics-info">
                        <ul class="list-inline two-part d-flex align-items-center mb-0">
                                <li>
                                   <h1 class="box-title"><a href="#" onclick="findAllTransactionByWallet(${data[i].id})">${data[i].name}</a></h1>
                                
                                </li>
                                <li class="ms-auto"><span style="font-size: large" class="counter text-success">${data[i].moneyType.name}</span></li>
                            </ul>
                            
                            <ul class="list-inline two-part d-flex align-items-center mb-0">
                                <li>
                                    <div><img width="100px" height="70" src="/chart.png">
                                    </div>
                                </li>
                                <li class="ms-auto"><span class="counter text-danger">${data[i].moneyAmount.toLocaleString()}</span></li>
                            </ul>
                        </div>
                        </div>
                     `
        }
        document.getElementById("display").innerHTML = content;
    }, error: function (error) {
        console.log(error);
    }
})
function findAllTransactionByWallet(id) {

    $.ajax({
        type: "GET",
        url: "http://localhost:8000/wallets/transaction-by-wallet/" + id,
        success: function (data) {
            localStorage.setItem("data", JSON.stringify(data));
            window.location.href = "../transaction/transaction.html"
        }, error: function (error) {
            console.log(error);
        }
    })

}
function showAddForm(){
    $('#modalCreateForm').modal('show');
}
function addWallet() {

    let IdUser = window.sessionStorage.getItem("ID_USER_KEY");
    let token = window.sessionStorage.getItem("TOKEN_KEY");
    console.log("a==", token)
    console.log("id=", IdUser)
    let name = $("#name").val();
    let icon = $("#icon").val();
    let moneyAmount = $("#moneyAmount").val();
    let moneyType = $("#moneyType").val();
    let user = IdUser;
    let obj = {
        name: name,
        icon: icon,
        moneyType: {
            id: moneyType
        },
        moneyAmount: moneyAmount,
        user: {
            id: user
        }
    }
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8000/wallets",
        data: JSON.stringify(obj),
        success: function (data) {
            console.log(data)
            alert("Create successfully!")
        },
        error: function (error) {
            console.log(error)
        }

    });

}


function showEditWallet(id) {
    $("#editWallet").modal('show');
    let token = window.sessionStorage.getItem("TOKEN_KEY");
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8000/wallets/"+id,
        success: function (data) {
            $("#editId").val(data.id);
            $("#editName").val(data.name);
            $("#editIcon").val(data.icon);
            $("#editMoneyAmount").val(data.moneyAmount);
            $("#editMoneyType").val(data.moneyType.id);
        }, error: function (err) {
            console.log("error: ", err);
        }
    })
}
function editWallet() {
    $('#editWallet').modal('hide');
    let IdUser = window.sessionStorage.getItem("IDUSER_KEY");
    let token = window.sessionStorage.getItem("TOKEN_KEY");
    let id = $("#editId").val();
    let name = $("#editName").val();
    let icon = $("#editIcon").val();
    let moneyAmount = $("#editMoneyAmount").val();
    let moneyType = $("#editMoneyType").val();
    let appUser = IdUser;
    let obj = {
        name: name,
        icon: icon,
        moneyType: {
            id: moneyType
        },
        moneyAmount: moneyAmount,
        appUser: {
            id: appUser
        }
    }
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8000/wallets/" +id ,
        data: JSON.stringify(obj),
        success: function (data) {
            console.log(data)
            alert("Edit successfully!")
            showListWallet();
        },
        error: function (error) {
            console.log(error)
        }

    });
}
