function home(){
    document.getElementById("main").innerHTML = `
<div class="container">
    <div class="row">
        <div class="col-12">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">okok</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onclick="showAddForm()">ADD</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onclick="showRegister()">Register</a>
                        </li>
                      
                        <li class="nav-item">
                            <a class="nav-link" onclick="logoutForm()">Logout</a>
                        </li>
                     
                    </ul>
                    <div class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="search-name">
                        <button class="btn btn-outline-success my-2 my-sm-0" onclick="search()">Search</button>
                    </div>
                </div>
            </nav>
        </div>
    </div>

    <div class="row">
        <div class="col-3">List</div>
        <div class="col-9">
            <h3>List Home</h3>

            <table class="table">
                <thead>
                <tr>
                    <th scope="col">stt</th>
                    <th scope="col">name</th>
                    <th scope="col">address</th>
                    <th scope="col">numberOfBedrooms</th>
                  
                    <th scope="col">img</th>
                </tr>
                </thead>
                <tbody id="list">
               
                </tbody>
            </table>
        </div>
        <div id="pageable"></div>
    </div>
</div>

`



}

