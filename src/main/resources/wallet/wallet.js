
// let searchName= document.getElementById("search-name");



function loaddataWallet() {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        type: "GET",
        url:"http://localhost:8000/api/wallets",
        success: function (list) {
            loadtable(list.content);

        }
    });
}


function loadtable(list){
    let house=document.getElementById("list");
    let str= "";
    for(let i=0;i<list.length; i++){
        console.log(list[i].name)
        str+=`<tr>
                    <th scope="row">${i+1}</th>
                    <td>${list[i].name}</td>
                    <td>${list[i].moneyAmount.toLocaleString()}</td>
                    <td><img src="${list[i].icon}" width="20px" height="20px"></td>
                    <td>${list[i].moneyType.name}</td>
                    
                   
                 </tr>`
    }
    house.innerHTML=str;
}

// function showAddForm(){
//     $('#exampleModal').modal('show');
// }
// function save(){
//     // let addForm=document.getElementById("addForm");
//     // let formData = new FormData(addForm);
//     let name=document.getElementById("name").value;
//     let moneyAmount=document.getElementById("moneyAmount").value;
//     let icon=localStorage.getItem(key)
//     let moneyType=document.getElementById("moneyType.name").value;
//     let house={
//         name:name,
//         address:address,
//         numberOfBedrooms:numberOfBedrooms,
//         numberOfBathrooms:numberOfBathrooms,
//         price:price,
//         icon:icon
//     }
//     $.ajax({
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer ' + localStorage.getItem('token')
//         },
//
//         type: "POST",
//         url: "http://localhost:8081/api/wallets",
//         // data: formData,
//         // processData: false,
//         // contentType: false,
//         // cache: false,
//         // timeout: 1000000,
//         data:JSON.stringify(house),
//         success: function () {
//             loaddataWallet()
//             $('#exampleModal').modal('hide');
//             addForm.reset();
//             localStorage.setItem(key, "");
//         },
//         error: function (error) {
//             console.log(error)
//         }
//     })
// }
//
//
//
// let key='';
//
// var image = '';
// // firebase bucket name
// // REPLACE WITH THE ONE YOU CREATE
// // ALSO CHECK STORAGE RULES IN FIREBASE CONSOLE
// var fbBucketName = 'images';
//
// // get elements
// var uploader = document.getElementById('uploader');
// var fileButton = document.getElementById('fileButton');

// listen for file selection
function upload (e) {

    // what happened
    console.log('file upload event', e);

    // get file
    var file = e.target.files[0];

    // create a storage ref
    var storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);

    // upload file
    var uploadTask = storageRef.put(file);

    // The part below is largely copy-pasted from the 'Full Example' section from
    // https://firebase.google.com/docs/storage/web/upload-files

    // update progress bar
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = progress;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors</html>
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, function () {
            // Upload completed successfully, now we can get the download URL
            // save this link somewhere, e.g. put it in an input field
            var downloadURL = uploadTask.snapshot.downloadURL;
            // image = downloadURL;
            localStorage.setItem(key,downloadURL);
            console.log('downloadURL ===>', image);
            let divLocation = document.getElementById("imgDiv");
            let imgElement = document.createElement("img");
            imgElement.src = downloadURL
            console.log('pic ==', image)
            divLocation.append(imgElement);
        });

}

