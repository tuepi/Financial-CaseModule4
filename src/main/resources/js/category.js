function showCategoryFrom() {
    $('#modalAddCategoryForm').modal('show');
}

function addCategory() {
    let nameCategory = document.getElementById("moneyNameCategory").value;
    let category = {
        name : nameCategory
    }
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        type: "POST",
        url: "http://localhost:8000/users/money_categories",
        data: JSON.stringify(category),
        success : function () {
            $('#modalAddCategoryForm').modal('hide');
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
            showAllCategory();
        }
    })
}

function showAllCategory() {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8000/users/money_categories" ,
        success: function (moneyCategory) {
            let content = ``;
            for (let i = 0; i < moneyCategory.length; i++) {
                content += `<li>
                                <a onclick="showMoneyCategory(${moneyCategory[i].id})">${moneyCategory[i].name}</a>
                            </li>`
            }
            document.getElementById("showCategory").innerHTML = content;
        }
    })
}

function showMoneyCategory(id) {
    $('#modalEditCategoryForm').modal('show');
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        type: "GET",
        url: "http://localhost:8000/users/money_categories/find-by-category-id/" + id,
        success : function (data) {
            document.getElementById("showNameCategory").innerHTML = `<div class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold" style="color: #28b498">Category</h4>
            </div>
            <div class="modal-body mx-3">
                <div class="md-form mb-5" >
                    <i class="fas fa-user prefix grey-text"></i>
                    <input type="text" value="${data.name}" id="moneyEditNameCategory" className="form-control validate" placeholder="Name Category"
                           style="color: #28b498">
                </div>
            </div>
            <input type="hidden" id="idCategory" value="${data.id}">
            <div class="modal-footer d-flex justify-content-center">
                <button class="btn btn-default" onclick="editFromCategory()">Edit</button>
                <button class="btn btn-danger" onclick="deleteFromCategory()">Delete</button>
            </div> `;

        }
    })
}

function editFromCategory() {
    editCategory();
    $('#modalEditCategoryForm').modal('hide');
    showAllCategory();
}

function editCategory() {
    let idEdit = document.getElementById("idCategory").value;
    let name = document.getElementById("moneyEditNameCategory").value;
    let moneyCategory = {
        name : name,
    }
    console.log(moneyCategory);
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        type: "PUT",
        url: "http://localhost:8000/users/money_categories/" + idEdit ,
        data: JSON.stringify(moneyCategory),
        success : function () {
            showAllCategory();
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
        }
    })
}

function deleteFromCategory() {
    $('#modalEditCategoryForm').modal('hide');
    modalAlert(removes)
}

function deleteCategory() {
    let id = document.getElementById("idCategory").value;
    $.ajax({
        headers : {
            Authorization: 'Bearer ' + window.sessionStorage.getItem("TOKEN_KEY"),
        },
        type: "DELETE",
        url: "http://localhost:8000/users/money_categories/" + id,
        success: function () {
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
            showAllCategory();
        }
    })
    $('#modalAlert').modal('hide')
}

let removes = "Do You Want delete ?";

function modalAlert(str) {
    $('#modalAlert').modal('show');
    document.getElementById("yesOfNo").innerHTML = `
    <div class="modal-content" style="border-radius: 20px">
            <div class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold" style="color: #28b498">${str}</h4>
            </div>
            <div class="modal-footer d-flex justify-content-center">
                <button class="btn btn-default" onclick="yes('${str}')">Accpect</button>
                <button class="btn btn-danger" onclick="no('${str}')">Cancel</button>
            </div>
        </div>`
}

function yes(str) {
    if (str === removes) {
        deleteCategory();
        $('#modalEditCategoryForm').modal('hide');
        $("#myModal").modal('show');
        setTimeout(function () {
            $("#myModal").modal('hide');
        }, 1000);
    }
}

function no(str) {
    if (str === removes) {
        resetValue();
        $('#modalAlert').modal('hide');
        $('#modalEditCategoryForm').modal('show');

    }
}