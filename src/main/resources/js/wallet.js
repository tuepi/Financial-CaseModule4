function showAllWallet() {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8000/wallets/users/findByUser/" + window.sessionStorage.getItem("ID_USER_KEY"),
        success: function (data) {
            let content = `<h4 onclick="showAddOnlyMoney()" class="btn btn-secondary">Add money</h4>`;
            for (let i = 0; i < data.length; i++) {
                content += `<div  class="col-lg-4 col-md-12" style="padding-top: 50px">
                        <div class="white-box analytics-info">
                        <ul class="list-inline two-part d-flex align-items-center mb-0">
                                <li>
                                   <h1 class="box-title"><a style="text-align: center" href="#" onclick="findAllTransactionByWalletId(${data[i].id})">${data[i].name}</a></h1>

                                </li>
                            </ul>
                            <ul class="list-inline two-part d-flex align-items-center mb-0">
                                <li>
                                    <div><img width="100px" height="70" src="/images.jpg">
                                    </div>
                                </li>
                                <li><span class="counter "  style="color: #1c7430; font-size: 25px" >${data[i].moneyAmount.toLocaleString()} ${data[i].moneyType.name}</span></li>
                                <li><button class="btn btn-primary" onclick="showEditWallet(${data[i].id})">Edit</button></li>
                                <li><button class="btn btn-danger" onclick="deleteWallet(${data[i].id})">Delete</button></li>
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
}

function showEditWallet(id) {
    let showModal = document.getElementById("selectMoneyTypeEdit")
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/wallets/" + id,
        success: function (data) {
            console.log(data)
            $('#modalEditWalletForm').modal('show')
            document.getElementById("moneyAmountEdit").value = data.moneyAmount;
            document.getElementById("nameWalletEdit").value = data.name;
            document.getElementById("idEdit").value = data.id;
            showMoneyTypeAll(showModal);
        }
    })
}

function editWallet() {
    let idEdit = document.getElementById("idEdit").value
    let money_amount = document.getElementById("moneyAmountEdit").value;
    let name = document.getElementById("nameWalletEdit").value;
    let money_type= document.getElementById("selectMoneyTypeEdit").value;
    let userId = window.sessionStorage.getItem('ID_USER_KEY');
    let wallet = {
        moneyAmount : money_amount,
        name : name,
        moneyType : {
            id: money_type
        },
        user : {
            id: userId
        }
    }
    console.log(wallet);
    $.ajax({
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        type: "PUT",
        url: "http://localhost:8000/wallets/" + idEdit +"?moneyOnly="+0 ,
        data: JSON.stringify(wallet),
        success : function (data) {
            console.log(data)
            $('#modalEditWalletForm').modal('hide');
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
            showAllWallet();
        }
    })
}

let deleteId = 0;

function deleteWallet(id) {
    $('#modalDeleteForm').modal('show')
    deleteId = id;
}

function acceptModal() {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8000/wallets/" + deleteId,
            success: function (data) {
                console.log(data)
                $('#modalDeleteForm').modal('hide')
                $("#myModal").modal('show');
                setTimeout(function () {
                    $("#myModal").modal('hide');
                }, 1000);
                showAllWallet();
                deleteId = 0;
            }
        })
}

function showMoneyTypeAll(data) {
    $.ajax({
        headers : {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
        },
        type: "GET",
        url: "http://localhost:8000/wallets/showMoneyType",
        success: function (moneyType) {
            console.log(moneyType)
            let str = ""
            for (let i = 0; i < moneyType.length; i++) {
                str += ` <option class="form-control validate"  style="color: #28b498" value="${moneyType[i].id}">${moneyType[i].name}</option>`
            }
            data.innerHTML = str;
        }, error: function (error) {
            console.log(error);
        }
    })
}

function showAddWallet() {
    let showModal = document.getElementById("selectMoneyType")
    $('#modalAddWalletForm').modal('show')
    showMoneyTypeAll(showModal);
}

function addWallet() {
    let money_amount = document.getElementById("moneyAmount").value;
    let name = document.getElementById("nameWallet").value;
    let money_type= document.getElementById("selectMoneyType").value;
    let userId = window.sessionStorage.getItem('ID_USER_KEY');
    let wallet = {
        moneyAmount : money_amount,
        name : name,
        moneyType : {
            id: money_type
        },
        user : {
            id: userId
        }
    }
    console.log(wallet);
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        type: "POST",
        url: "http://localhost:8000/wallets",
        data: JSON.stringify(wallet),
        success : function () {
            $('#modalAddWalletForm').modal('hide');
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
            showAllWallet();
        }
    })
}

function showAddOnlyMoney() {
    $('#modalAddMoneyForm').modal('show')
    let showWallet = document.getElementById("selectWalletOnly")
    let showModal = document.getElementById("selectMoneyTypeOnly")
    showAllWalletTransaction(showWallet);
    showMoneyTypeAll(showModal);
}

function addOnlyMoney() {
    let money_amount = document.getElementById("moneyOnly").value;
    let wallet_id = document.getElementById("selectWalletOnly").value;
    let type = document.getElementById("selectMoneyTypeOnly").value;
    let userId = window.sessionStorage.getItem('ID_USER_KEY');
    let wallet = {
        moneyType : {
            id: type
        },
        user : {
            id: userId
        }
    }
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        type: "PUT",
        url: "http://localhost:8000/wallets/add/" + wallet_id + "?moneyOnly="  + money_amount,
        data: JSON.stringify(wallet),
        success : function () {
            $('#modalAddMoneyForm').modal('hide');
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
            showAllWallet();
        }
    })
}

