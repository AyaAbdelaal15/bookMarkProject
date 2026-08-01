const siteName = document.getElementById("bookmarkName");
const siteURL = document.getElementById("bookmarkURL");
const submitBtn = document.getElementById("submitBtn");
const tableContent = document.getElementById("tableContent");
let deleteBtns;
let visitBtns;
const closeBtn = document.getElementById("closeBtn");
const boxModal = document.querySelector(".box-info");
let bookmarks = [];

if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  for (let x = 0; x < bookmarks.length; x++) {
    displayBookmark(x);
  }
}

// =====> Display Function and adding click event to visit and delete buttons

function displayBookmark(indexOfWebsite) {
  const userURL = bookmarks[indexOfWebsite].siteURL;
  const httpsRegex = /^https?:\/\//g;
  if (httpsRegex.test(userURL)) {
    validURL = userURL;
    fixedURL = validURL
      .split("")
      .splice(validURL.match(httpsRegex)[0].length)
      .join("");
  } else {
    var fixedURL = userURL;
    validURL = `https://${userURL}`;
  }
  const newBookmark = `
              <tr>
                <td>${indexOfWebsite + 1}</td>
                <td>${bookmarks[indexOfWebsite].siteName}</td>              
                <td>
                  <button class="btn btn-visit" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  tableContent.innerHTML += newBookmark;

  // =====> Adding Click Event to All delete buttons every time a new bookmark being added

  deleteBtns = document.querySelectorAll(".btn-delete");
  if (deleteBtns) {
    for (let j = 0; j < deleteBtns.length; j++) {
      deleteBtns[j].addEventListener("click", function (e) {
        deleteBookmark(e);
      });
    }
  }

  // =====> Adding Click Event to All visit buttons every time a new bookmark being added

  visitBtns = document.querySelectorAll(".btn-visit");
  if (visitBtns) {
    for (let l = 0; l < visitBtns.length; l++) {
      visitBtns[l].addEventListener("click", function (e) {
        visitWebsite(e);
      });
    }
  }
}

// =====> Clear Input Function

function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}

// =====> Capitalize Function ==> take string and makes it capitalize

function capitalize(str) {
  let strArr = str.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}

// =====> Submit Function

submitBtn.addEventListener("click", function () {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    const bookmark = {
      siteName: capitalize(siteName.value),
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    clearInput();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } else {
    boxModal.classList.remove("d-none");
  }
});

// =====> Delete Function

function deleteBookmark(e) {
  tableContent.innerHTML = "";
  const deletedIndex = e.target.dataset.index;
  bookmarks.splice(deletedIndex, 1);
  for (let k = 0; k < bookmarks.length; k++) {
    displayBookmark(k);
  }
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

// =====> Visit Function

function visitWebsite(e) {
  const websiteIndex = e.target.dataset.index;
  const httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmarks[websiteIndex].siteURL)) {
    open(bookmarks[websiteIndex].siteURL);
  } else {
    open(`https://${bookmarks[websiteIndex].siteURL}`);
  }
}

// =====> Making sure that user enter the correct data

const nameRegex = /^\w{3,}(\s+\w+)*$/;
const urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validate(siteURL, urlRegex);
});

function validate(element, regex) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

//Close Modal Function

function closeModal() {
  boxModal.classList.add("d-none");
}

// 3 ways to close modal => close button -  Esc key - clicking outside modal

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
});