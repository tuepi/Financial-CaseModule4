let walletId = 0;
let transaction_id = 0;
let money_detail_id = 0;
let old_money_amount = 0;
function findAllTransactionByWallet() {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8000/transactions",
        success: function (data) {
            let content = `<h3 onclick="showAllWallet()">Back to wallet</h3>
                            <button onclick="showAddTransactionNoChoice()">Add Transaction</button>
                            <table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Wallet</th>
                                  <th scope="col">Create Date</th>
                                  <th scope="col">Money Amount</th>
                                  <th scope="col">Note</th>
                                  <th scope="col">Detail</th>
                                  <th scope="col">Type</th>
                                  <th scope="col"></th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                                <tbody id="display1">  
                                </tbody>
                    </table>
<div id="result"></div>`;
            let content1 = "";
            if (data == null) {
                document.getElementById("display").innerHTML = `<h3>No Transaction</h3> <button onclick="showAllWallet()">Back to wallet</button>`;
            } else {
                for (let i = 0; i < data.length; i++) {
                    content1 += `
                            <tr>
                                <th scope="row">${i + 1} </th>
                                <td>${data[i].wallet.name}</td>
                                <td>${data[i].createdDate}</td>
                                <td>${data[i].moneyAmount}</td>
                                <td>${data[i].note}</td>
                                <td>${data[i].moneyDetail.name}</td>
                                <td> ${data[i].moneyCategory.name}</div></td>
                                <td><button onclick="showEditTransaction(${data[i].id})" class="btn-primary">Edit</button></td>
                                <td><button onclick="deleteTransaction(${data[i].id})" class="btn-danger">Delete</button></td></tr>`
                }
                document.getElementById("display").innerHTML = content;
                document.getElementById("display1").innerHTML = content1;
                walletId = id;
                // totalAmountMoney();
                // money_detail_id = 0;
            }
        }
    })
}

function findAllTransactionByWalletId(id) {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8000/transactions/findAllByWallet/" + id,
        success: function (data) {
            dataMoneyDetail(data);
        }
    })
}

function showAllMoneyDetailDisplay(id) {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8000/transactions/findAllMoneyDetail/" + id,
        success: function (data) {
            dataMoneyDetail(data);
            money_detail_id = id;
            old_money_amount = data.moneyAmount;
            console.log(data.moneyAmount)
            totalAmountMoney();
        }
    })
}

function dataMoneyDetail(data) {
    let content = `<h3 onclick="showAllWallet()">Back to wallet</h3>
                            <button onclick="showAddTransaction()">Add Transaction</button>
                            <table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Create Date</th>
                                  <th scope="col">Money Amount</th>
                                  <th scope="col">Note</th>
                                  <th scope="col">Detail</th>
                                  <th scope="col">Type</th>
                                  <th scope="col"></th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                                <tbody id="display1">  
                                </tbody>
                    </table><div id="result"></div>`
    let content1 = "";
    if (data == null) {
        content += `<h3>No Transaction</h3>`;
        document.getElementById("display").innerHTML = content;
    } else {
        for (let i = 0; i < data.length; i++) {
            content1 += `
                            <tr>
                                <th scope="row">${i + 1} </th>
                                <td>${data[i].createdDate}</td>
                                <td>${data[i].moneyAmount}</td>
                                <td>${data[i].note}</td>
                                <td>${data[i].moneyDetail.name}</td>
                                <td> ${data[i].moneyCategory.name}</div></td>
                                <td><button onclick="showEditTransaction(${data[i].id})" class="btn-primary">Edit</button></td>
                                <td><button onclick="deleteTransaction(${data[i].id})" class="btn-danger">Delete</button></td></tr>`
        }

        document.getElementById("display").innerHTML = content;
        document.getElementById("display1").innerHTML = content1;
        walletId = id;
        // totalAmountMoney();
    }
}

function totalAmountMoney() {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8000/transactions/findAllByAmountMoney/" + money_detail_id,
        success: function (moneyDetail) {
            console.log(moneyDetail)
            let content = "";
            if (money_detail_id == 1){
                content += `<h3>Interest : ${moneyDetail}</h3>`
            }else {
                content += `<h3>Loss : ${moneyDetail}</h3>`
            }
            document.getElementById("result").innerHTML = content;
        }
    })
}

function totalAmountMoneyAll() {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8000/transactions/findAllByAmountMoney" ,
        success: function (moneyDetail) {
            console.log(moneyDetail)
            let content = "";
                content += `<h3>Total : ${moneyDetail}</h3>`
            document.getElementById("result").innerHTML = content;
        }
    })
}

function showAllMoneyCategory(data) {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8000/transactions/findAllMoneyCategories",
        success: function (moneyCategory) {
            let content = "";
            for (let i = 0; i < moneyCategory.length; i++) {
                content += ` <option class="form-control validate"  style="color: #28b498" value="${moneyCategory[i].id}">${moneyCategory[i].name}</option>`
            }
            data.innerHTML = content;
        }
    })
}

function showAllWalletTransaction(data) {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8000/wallets/users/findByUser/" + window.sessionStorage.getItem("ID_USER_KEY"),
        success: function (wallet) {
            let content = ``;
            for (let i = 0; i < wallet.length; i++) {
                content += `<option class="form-control validate"  style="color: #28b498" value="${wallet[i].id}">${wallet[i].name}</option>`
            }
            data.innerHTML = content;
        }, error: function (error) {
            console.log(error);
        }
    })
}

function addTransaction() {
    let money_amount = document.getElementById("moneyAmountTransaction").value;
    let note = document.getElementById("nameWalletTransaction").value;
    let money_detail = document.getElementById("selectMoneyDetail").value;
    let money_category = document.getElementById("selectMoneyCategory").value;
    let transaction = {
        moneyAmount: money_amount,
        moneyDetail: {
            id: money_detail,
        },
        moneyCategory: {
            id: money_category
        },
        note: note,
        wallet: {
            id: walletId
        }
    }
    console.log(transaction)
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        type: "POST",
        url: "http://localhost:8000/transactions",
        data: JSON.stringify(transaction),
        success: function (data) {
            $('#modalAddTransactionForm').modal('hide')
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
            findAllTransactionByWalletId(walletId);
        }
    })
}

function showAddTransaction() {
    let showModal = document.getElementById("selectMoneyDetail")
    let showCategory = document.getElementById("selectMoneyCategory")
    $('#modalAddTransactionForm').modal('show')
    showAllMoneyDetail(showModal);
    showAllMoneyCategory(showCategory);
}

function showAddTransactionNoChoice() {
    let showModal = document.getElementById("selectMoneyDetail1")
    let showCategory = document.getElementById("selectMoneyCategory1")
    let showWallet = document.getElementById("selectWallet")
    $('#modalAddTransaction1Form').modal('show')
    showAllMoneyDetail(showModal);
    showAllMoneyCategory(showCategory);
    showAllWalletTransaction(showWallet);
}

function addTransactionNoChoice() {
    let money_amount = document.getElementById("moneyAmountTransaction1").value;
    let note = document.getElementById("noteWalletTransaction").value;
    let money_detail = document.getElementById("selectMoneyDetail1").value;
    let money_category = document.getElementById("selectMoneyCategory1").value;
    let wallet_id = document.getElementById("selectWallet").value;
    let transaction = {
        moneyAmount: money_amount,
        moneyDetail: {
            id: money_detail,
        },
        moneyCategory: {
            id: money_category
        },
        note: note,
        wallet: {
            id: wallet_id
        }
    }
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        type: "POST",
        url: "http://localhost:8000/transactions",
        data: JSON.stringify(transaction),
        success: function (data) {
            $('#modalAddTransaction1Form').modal('hide')
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
            findAllTransactionByWallet();
        }
    })
}

function showEditTransaction(id) {
    $.ajax({
        Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
        type: "GET",
        url: "http://localhost:8000/transactions/" + id,
        success: function (data) {
            document.getElementById("transactionId").value = data.id;
            document.getElementById("moneyAmountTransactionEdit").value = data.moneyAmount;
            document.getElementById("oldAmountMoney").value = data.moneyAmount;
            document.getElementById("noteWalletTransactionEdit").value = data.note;
            let showModal = document.getElementById("selectMoneyDetailEdit")
            let showCategory = document.getElementById("selectMoneyCategoryEdit")
            let showWallet = document.getElementById("selectWalletEdit")
            $('#modalEditTransactionForm').modal('show')
            showAllMoneyDetail(showModal);
            showAllMoneyCategory(showCategory);
            showAllWalletTransaction(showWallet);
        }
    })
}

function editTransaction() {
    let idEdit = document.getElementById("transactionId").value
    let money_amount = document.getElementById("moneyAmountTransactionEdit").value;
    let note = document.getElementById("noteWalletTransactionEdit").value;
    let money_detail = document.getElementById("selectMoneyDetailEdit").value;
    let money_category = document.getElementById("selectMoneyCategoryEdit").value;
    let wallet_id = document.getElementById("selectWalletEdit").value;
    let old_money = document.getElementById("oldAmountMoney").value;
    let transaction = {
        moneyAmount: money_amount,
        moneyDetail: {
            id: money_detail,
        },
        moneyCategory: {
            id: money_category
        },
        note: note,
        wallet: {
            id: wallet_id
        }
    }
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        type: "PUT",
        url: "http://localhost:8000/transactions/" + idEdit + "?old=" + old_money,
        data: JSON.stringify(transaction),
        success: function (data) {
            $('#modalEditTransactionForm').modal('hide')
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
            showAllWallet();
        }
    })
}

function deleteTransaction(id) {
    $('#modalDeleteTransactionForm').modal('show')
    transaction_id = id;
    $.ajax({
        Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
        type: "GET",
        url: "http://localhost:8000/transactions/" + id,
        success: function (data) {
            old_money_amount = data.moneyAmount;
        }
    })
}

function acceptModal1() {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8000/transactions/" + transaction_id + "?old="+old_money_amount,
        success: function (data) {
            console.log(data)
            $('#modalDeleteTransactionForm').modal('hide')
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
            findAllTransactionByWallet()
            transaction_id = 0;
            old_money_amount =0;
        }
    })
}