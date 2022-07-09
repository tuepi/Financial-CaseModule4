function showAll() {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8000/wallets/users/findByUser/" + window.sessionStorage.getItem("ID_USER_KEY"),
        success: function (data) {
            let content = ``;
            for (let i = 0; i < data.length; i++) {
                content += `<div  class="col-lg-4 col-md-12" style="padding-top: 50px">
                        <div class="white-box analytics-info">
                        <ul class="list-inline two-part d-flex align-items-center mb-0">
                                <li>
                                   <h1 class="box-title"><a style="text-align: center" href="#" onclick="findAllTransactionByWallet(${data[i].id})">${data[i].name}</a></h1>

                                </li>
                            </ul>
                            <ul class="list-inline two-part d-flex align-items-center mb-0">
                                <li>
                                    <div><img width="100px" height="70" src="/images.jpg">
                                    </div>
                                </li>
                                <li class="ms-auto"><span class="counter "  style="color: #1c7430; font-size: 25px">${data[i].moneyAmount.toLocaleString()} ${data[i].moneyType.name}</span></li>
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
function showAddWallet() {
    let showModal = document.getElementById("selectMoneyType")
    $('#modalAddWalletForm').modal('show')
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/wallets/users/showMoneyType",
        success: function (moneyType) {
            console.log(moneyType)
            let str = ""
            for (let i = 0; i < moneyType.length; i++) {
                str += ` <option class="form-control validate"  style="color: #28b498" id="${moneyType[i].id}">${moneyType[i].name}</option>`
            }
            showModal.innerHTML = str;
        }, error: function (error) {
            console.log(error);
        }
    })
}
function addWallet() {
    
}
function findAllTransactionByWallet(id) {
}