const swal = require("sweetalert2");
const axios = require("axios");

let hamburger = document.getElementById("hamburger");
let links = document.getElementById("links");
let addPerson = document.getElementById("add-person");
let guestList = document.getElementById("guest-list");
let deleteBtn = document.getElementsByClassName(
  "far fa-times-circle delete-button"
)[0];
let images = document.querySelectorAll(".images, .grid-thumbnail-image");
let imageFrame = document.getElementById("imageFrame");
let imageFrameContent = document.getElementById("frameContent");
let navDropdown = document.getElementById("nav-dropdown");
let landingEnter = document.getElementById("enter-website");

var guestCount = 1;

navDropdown.addEventListener("click", function() {
  this.classList.toggle("pseudo-hover");
});

// add JS to click button in order to append additional text fields for additional guests.
// -------------------------------------------------------
hamburger.addEventListener("click", () => {
  links.classList.toggle("open-links");
  hamburger.classList.toggle("open-links");
});

[...images].forEach(img => {
  img.addEventListener("click", function() {
    console.log(imageFrame.style.display);
    if (imageFrame.style.display == "none" || imageFrame.style.display == "") {
      imageFrame.style.display = "flex";
      imageFrameContent.src = this.src;
      document.body.classList.toggle("noscroll");
    } else {
      imageFrame.style.display = "none";
      document.body.classList.toggle("noscroll");
    }
  });
});

if (imageFrameContent != null) {
  imageFrameContent.addEventListener("click", () => {
    if (imageFrame.style.display != "none") {
      imageFrame.style.display = "none";
      document.body.classList.toggle("noscroll");
    }
  });
}

if (addPerson != null) {
  addPerson.addEventListener("click", () => {
    // console.log("Add person clicked!");
    let divEl = document.createElement("div");
    divEl.classList.add("form-group");
    divEl.appendChild(createFirstNameElement(guestCount));
    divEl.appendChild(createSpanBarElement());
    divEl.appendChild(createLastNameElement(guestCount));
    divEl.appendChild(createSpanBarElement());
    divEl.appendChild(createEmailElement(guestCount));
    // divEl.appendChild(createButtonElement());
    guestList.insertBefore(
      divEl,
      document.querySelector("#guest-list > .submit-button")
    );
    guestCount += 1;
  });
}

function createFirstNameElement(num) {
  let firstNameEl = document.createElement("input");
  firstNameEl.type = "text";
  firstNameEl.placeholder = "First Name";
  firstNameEl.name = "firstname" + num;
  return firstNameEl;
}

function createSpanBarElement() {
  let spanBar = document.createElement("span");
  spanBar.appendChild(document.createTextNode("|"));
  spanBar.classList.add("box-break");
  return spanBar;
}

function createLastNameElement(num) {
  let lastNameEl = document.createElement("input");
  lastNameEl.type = "text";
  lastNameEl.placeholder = "Last Name";
  lastNameEl.name = "lastname" + num;
  return lastNameEl;
}

function createEmailElement(num) {
  let emailEl = document.createElement("input");
  emailEl.type = "text";
  emailEl.placeholder = "Email";
  emailEl.name = "email" + num;
  // emailEl.style = 'margin-bottom: 40px;';
  return emailEl;
}

function createButtonElement() {
  let buttonEl = document.createElement("button");
  buttonEl.classList.add("submit-button");
  buttonEl.type = "submit";
  buttonEl.appendChild(document.createTextNode("SEND RSVP"));
  // buttonEl.appendChild(document.createTextNode('\u00A0\u00A0Click me to add additional guests!'));
  return buttonEl;
}

// JS to compile proper JSON object before sending.
// -------------------------------------------------------
function sendData() {
  let guestList = {};

  for (var i = 0; i < guestCount; i++) {
    let firstname = document.getElementsByName("firstname" + i)[0].value;
    let lastname = document.getElementsByName("lastname" + i)[0].value;
    let email = document.getElementsByName("email" + i)[0].value;
    let guestNum = "guest" + i;

    guestList[guestNum] = {
      firstname: firstname,
      lastname: lastname,
      email: email
    };
  }

  // ------------------------------------------------
  // ajax request for guests to rsvp to our wedding.
  // ------------------------------------------------
  axios
    .post("/rsvp", {
      guestList: guestList
    })
    .then(response => {
      if (response.data === 1) {
        swal.fire({
          titleText: "Thank you!",
          text: "Look forward to seeing you Oct 27th!",
          type: "success",
          confirmButtonText: "See you there!",
          allowOutsideClick: false
        }).then(isConfirm => {
          if (isConfirm) {
            clearRsvpForm();
          }
        });
      } else {
        console.log(response);
        swal.fire({
          titleText: "Error",
          text:
            "Uh oh! Looks like something went wrong! Please double check the names and emails and try submitting again!",
          type: "error"
        });
      }
    })
    .catch(err => {
      swal.fire({
        titleText: "Error",
        text: "Hmmm something went wrong..." + err,
        type: "error"
      });
    });

  // AJAX request using long form XMLHttpRequest
  // let xhr = new XMLHttpRequest();
  // xhr.onload = () => {
  //     if (xhr.readyState == 4 && xhr.status == 200) {
  //         if (xhr.responseText === '1') {
  //             swal.fire({
  //                 titleText: 'Thank you!',
  //                 text: 'Look forward to seeing you Oct 27th!',
  //                 type: 'success',
  //                 confirmButtonText: 'See you there!',
  //                 allowOutsideClick: false
  //             }).then((isConfirm) => {
  //                 if (isConfirm){
  //                     clearRsvpForm();
  //                 }
  //             });
  //         }
  //         else {
  //             console.log(xhr.responseText);
  //             swal.fire({
  //                 titleText: 'Error',
  //                 text: 'Uh oh! Looks like something went wrong! Please double check the names and emails and try submitting again!',
  //                 type: 'error'
  //             })
  //         }
  //     }
  //     else {
  //         swal.fire({
  //             titleText: 'Error',
  //             text: 'Uh oh! Looks like something went wrong!',
  //             type: 'error'
  //         })
  //         console.log(xhr.responseText);
  //     }
  // };

  // xhr.open('POST', '/rsvp', true);
  // xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  // xhr.send(JSON.stringify(guestList));
}

function clearRsvpForm() {
  guestCount = 0;
  let divEl = document.createElement("div");
  divEl.classList.add("form-group");
  divEl.appendChild(createFirstNameElement(guestCount));
  divEl.appendChild(createSpanBarElement());
  divEl.appendChild(createLastNameElement(guestCount));
  divEl.appendChild(createSpanBarElement());
  divEl.appendChild(createEmailElement(guestCount));
  guestCount += 1;

  guestList.innerHTML = "";
  guestList.appendChild(divEl);
  guestList.appendChild(createButtonElement());
}

if (guestList != null) {
  guestList.addEventListener("submit", () => {
    event.preventDefault();
    sendData();
  });
}

if (deleteBtn != null) {
  deleteBtn.addEventListener("click", () => {
    if (guestCount > 1) {
      let removeEl = document.querySelector(".form-group:last-of-type");
      removeEl.parentElement.removeChild(removeEl);
      guestCount -= 1;
    }
  });
}

// ------------------------------------------------
// ajax request for guests to make song requests.
// ------------------------------------------------
let songReqFrm = document.getElementById("song-request-form");
if (songReqFrm != null) {
  songReqFrm.addEventListener("submit", () => {
    event.preventDefault();
    sendSongData();
  });
}

// post the song request to the DB and then build the list again to catch any changes made by outside users.
function sendSongData() {
  let requestedSong = document.getElementById("song-title");
  let requestedArtist = document.getElementById("artist");
  let songList = document.getElementById("song-list");

  axios
    .post("/music", {
      song: requestedSong.value,
      artist: requestedArtist.value
    })
    .then(response => {
      console.log(response);
      let list = document.createElement('ul');
      songList.innerHTML = "";
      songList.appendChild(list);
      response.data.forEach(request => {
          let listItem = document.createElement('li');
          listItem.innerHTML = request.song + ' | ' + request.artist;
          list.appendChild(listItem);
      });
      requestedSong.value = "";
      requestedArtist.value = "";
    })
    .catch(err => {
      swal.fire({
        titleText: "ERROR!",
        text: err.response.data,
        type: "error"
      });
    });
}