function showAddMoneyDetail() {
    $('#modalAddMoneyDetailForm').modal('show')
}
function addMoneyDetail() {
    let name = document.getElementById("nameMoneyDetail").value;
    let money_detail = {
        name : name
    }
    $.ajax({
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        type: "POST",
        url: "http://localhost:8000/money_details",
        data: JSON.stringify(money_detail),
        success : function () {
            $('#modalAddMoneyDetailForm').modal('hide');
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
            showAllWallet();
        }
    })
}

function showAllMoneyDetail(data) {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8000/users/money_details",
        success: function (moneyDetail) {
            let content = "";
            for (let i = 0; i < moneyDetail.length; i++) {
                content += ` <option class="form-control validate"  style="color: #28b498" value="${moneyDetail[i].id}">${moneyDetail[i].name}</option>`
            }
            data.innerHTML = content;
        }
    })
}

function showAllMoneyDetailIndex() {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8000/users/money_details",
        success: function (moneyDetail) {
            let content = ``;
            content += `<li><a onclick="findAllTransactionByWallet()">All</a></li>`;
            for (let i = 0; i < moneyDetail.length; i++) {
                content += `
                            <li><a onclick="showAllMoneyDetailDisplay(${moneyDetail[i].id})">${moneyDetail[i].name}</a></li>`
            }

            document.getElementById("homeSubmenu").innerHTML = content;
        }
    })
}
showAllMoneyDetailIndex();