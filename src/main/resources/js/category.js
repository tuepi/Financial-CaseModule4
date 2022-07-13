let aa = 0;
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
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        type: "POST",
        url: "http://localhost:8000/category",
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
        url: "http://localhost:8000/category" ,
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
showAllCategory();
function showMoneyCategory(id) {
    $('#modalEditCategoryForm').modal('show');
    $.ajax({
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        type: "GET",
        url: "http://localhost:8000/category/find-by-category-id/" + id,
        success : function (data) {
            document.getElementById("showNameCategory").innerHTML = `<div class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold" style="color: #28b498">Create Category</h4>
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
                <button class="btn btn-danger" onclick="deleteFromCategory()">Xoa</button>
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
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        type: "PUT",
        url: "http://localhost:8000/category/" + idEdit ,
        data: JSON.stringify(moneyCategory),
        success : function () {
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
        }
    })
}
function deleteFromCategory() {
    $('#modalEditCategoryForm').modal('hide');
    let str = "Do You Want delete ?"
    modalAlert(str)
}

function deleteCategory() {
    let id = document.getElementById("idCategory").value;
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8000/category/" + id,
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

function modalAlert(str) {
    $('#modalAlert').modal('show');
    document.getElementById("yesOfNo").innerHTML = `
    <div class="modal-content" style="border-radius: 20px">
            <div class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold" style="color: #28b498">${str}</h4>
            </div>
            <div class="modal-footer d-flex justify-content-center">
                <button className="btn btn-default" onclick="yes()">YES</button>
                <button className="btn btn-danger" onclick="no()">No</button>
            </div>
        </div>`
}
function yes() {
    deleteCategory();
    $('#modalEditCategoryForm').modal('hide');
}
function no() {
    $('#modalAlert').modal('hide');
    $('#modalEditCategoryForm').modal('show');
}