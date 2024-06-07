var bookmarkInput = document.getElementById("bookmark");
var urlInput = document.getElementById("bookmarkurl");
var addBtn = document.getElementById("addBtn");
var tableData = document.getElementById("tableData");
var boxInfo = document.getElementById("box");
var closeBtn = document.getElementById("close");
var allBookmarks = [];
var indexOfSite = 0;
if (localStorage.getItem("allBookmarks") != null) {
    allBookmarks = JSON.parse(localStorage.getItem("allBookmarks"));
    displayData();
}

function submitBookmark(){
    var bookmark={
       name:bookmarkInput.value,
       url:urlInput.value,
    };
    allBookmarks.push(bookmark);
    console.log(allBookmarks)
    localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks));    
    validation()
    displayData();
    clearData();
};

function clearData(){
    bookmarkInput.value = "";
    urlInput.value = "";
}

function displayData(){
    var cartona =``;
    for(var i=0; i<allBookmarks.length; i++){
        cartona =  cartona + `
        <tr>
            <td>${indexOfSite+=1}</td>
            <td>${allBookmarks[i].name}</td>
            <td> 
                <a href="${allBookmarks[i].url}"> <button class="btn button1"> <i class="fa-regular fa-eye"></i> Visit </button> </a>
            </td>
            <td>  
                <button class="btn  button2" onclick="deleteData(${i})"> <i class="fa-regular fa-trash-can"></i> Delete </button>
            </td>
        </tr>
        `;
    }
    document.getElementById("tableData").innerHTML=cartona;   
}

function deleteData(index){
    allBookmarks.splice(index, 1);
    displayData();
    localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks));
}


function validation() {
    var x = document.getElementById("bookmark").value;
    var y = document.getElementById("bookmarkurl").value;
    if (x == "") {
    boxInfo.classList.replace("d-none", "d-block");
      return false;
    }
    if (y == "") {
    boxInfo.classList.replace("d-none", "d-block");
      return true;
    }
    localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks));  
    clearData();
}

function Close(){
    boxInfo.classList.replace("d-block", "d-none");
}  