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
let navDropdown = document.getElementsByClassName("nav-dropdown");
let faqForm = document.querySelector("#faq-submit-form");
let viewportSize = document.querySelector('meta[name="viewport"]');
//let landingEnter = document.getElementById("enter-website");

var guestCount = 1;

if (faqForm != null) {
  faqForm.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    swal.fire({
      title: "Sending email to Alex & Michelle...",
      onBeforeOpen: () => {
        swal.showLoading();
      }
    });

    axios
      .post("/faq", {
        name: formData.get("name"),
        subject: formData.get("subject"),
        message: formData.get("message"),
        email: formData.get("email")
      })
      .then(response => {
        if (response.data === 1) {
          swal
            .fire({
              titleText: "We Received Your Message!",
              text:
                "Thanks for reaching out! Michelle or Alex will be in contact shortly!",
              type: "success",
              confirmButtonText: "OK",
              allowOutsideClick: false
            })
            .then(isConfirm => {
              if (isConfirm) {
                e.target.reset();
              }
            });
        }
      });
  });
}

[...navDropdown].forEach(el => {
  el.addEventListener("click", function() {
    this.classList.toggle("pseudo-hover");
  });
});

// add JS to click button in order to append additional text fields for additional guests.
// -------------------------------------------------------
hamburger.addEventListener("click", () => {
  links.classList.toggle("open-links");
  hamburger.classList.toggle("open-links");
});

[...images].forEach(img => {
  img.addEventListener("click", function() {
    if (imageFrame.style.display == "none" || imageFrame.style.display == "") {
      imageFrame.style.display = "flex";
      imageFrameContent.src = this.src;
      document.body.classList.toggle("noscroll");
      viewportSize.setAttribute(
        "content",
        "width=device-width, initial-scale=.999, maximum-scale=2.5"
      );
    }
  });
});

if (imageFrameContent != null) {
  imageFrameContent.addEventListener("click", () => {
    if (imageFrame.style.display != "none") {
      imageFrame.style.display = "none";
      document.body.classList.toggle("noscroll");
      viewportSize.setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=2.5"
      );
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
  firstNameEl.required = true;
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
  lastNameEl.required = true;
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
function sendData(roomConfirm, showerRSVP) {
  swal.fire({
    title: "Sending RSVP...",
    onBeforeOpen: () => {
      swal.showLoading();
    }
  });

  let guestList = {};
  for (var i = 0; i < guestCount; i++) {
    let firstname = document.getElementsByName("firstname" + i)[0].value;
    let lastname = document.getElementsByName("lastname" + i)[0].value;
    let email = document.getElementsByName("email" + i)[0].value;
    let guestNum = "guest" + i;

    guestList[guestNum] = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      roomConfirm: roomConfirm
    };
  }

  let postURL = "/rsvp";
  if (showerRSVP == true) {
    postURL = "/rsvpShower";
  }

  // ------------------------------------------------
  // ajax request for guests to rsvp to our wedding.
  // ------------------------------------------------
  axios
    .post(postURL, {
      guestList: guestList
    })
    .then(response => {
      if (response.data === 1) {
        swal
          .fire({
            titleText: "Thank you!",
            text: "Look forward to seeing you Oct 27th!",
            type: "success",
            confirmButtonText: "See you there!",
            allowOutsideClick: false
          })
          .then(isConfirm => {
            if (isConfirm) {
              clearRsvpForm();
            }
          });
      } else {
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
  //#region AJAX request using long form XMLHttpRequest
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
  //#endregion
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

  while (guestList.hasChildNodes()) {
    guestList.lastChild.remove();
  }

  let iconEl = document.createElement("i");
  iconEl.classList.add("far", "fa-times-circle", "delete-button");
  addDeleteEvent(iconEl);
  guestList.appendChild(iconEl);
  guestList.appendChild(divEl);
  guestList.appendChild(createButtonElement());
}

if (guestList != null) {
  guestList.addEventListener("submit", () => {
    event.preventDefault();
    let senderPage = event.srcElement.ownerDocument.URL;
    let showerRSVP = senderPage.indexOf("rsvpShower") > -1;
    let roomConfirm = false;

    if (!showerRSVP) {
      swal
        .fire({
          title: "Will you be requiring a hotel room?",
          type: "question",
          showCancelButton: true,
          confirmButtonText: "Yes, I will be reserving a room in your block",
          cancelButtonText: "No, I will find my own accomodations. Thanks!"
        })
        .then(result => {
          if (result.value) {
            roomConfirm = true;
            swal
              .fire({
                title: "Reserve a room in our block!",
                type: "info",
                text:
                  "You can reserve a room at our block by calling (865)-881-0048 and mention the Gardell-Wagner Wedding Group!",
                confirmButtonText: "OK!",
                allowOutsideClick: false
              })
              .then(() => {
                sendData(roomConfirm, showerRSVP);
              });
          } else if (result.dismiss === swal.DismissReason.cancel) {
            sendData(roomConfirm, showerRSVP);
          }
        });
    } else {
      sendData(roomConfirm, showerRSVP);
    }
  });
}

if (deleteBtn != null) {
  addDeleteEvent(deleteBtn);
}

// ------------------------------------------------
// ajax request for guests to make song requests.
// ------------------------------------------------
let songReqFrm = document.getElementById("song-request-form");
if (songReqFrm != null) {
  songReqFrm.addEventListener("submit", () => {
    event.preventDefault();
    findMatchingSong();
    //sendSongData();
  });
}

function findMatchingSong() {
  let requestedSong = document.getElementById("song-title");
  let requestedArtist = document.getElementById("artist");
  // let songList = document.getElementById("song-list");
  swal.fire({
    title: "Locating matching song...",
    onBeforeOpen: () => {
      swal.showLoading();
    }
  });

  axios
    .get(
      "/music?song=" + requestedSong.value + "&artist=" + requestedArtist.value
    )
    .then(async response => {
      if (response.data.length > 1) {
        let options = {};
        let index = 0;

        response.data.forEach(song => {
          options[index] = song.name + " by " + song.artist;
          index++;
        });

        const { value: selectedSong } = await swal.fire({
          title:
            "Looks like Spotify found multiple matching titles. Please select the one you want to hear!",
          type: "question",
          input: "select",
          inputOptions: options,
          inputPlaceholder: "Song",
          showCancelButton: true
        });
        sendSongData(
          response.data[selectedSong].name,
          response.data[selectedSong].artist
        );
      } else if (
        requestedSong != response.data.song ||
        requestedArtist != response.data.artist
      ) {
        swal.fire({
          title: "Is this the song you meant?",
          text: response.data[0].name + ' by ' + response.data[0].artist,
          type: "question",
          showCancelButton: true,
          confirmButtonText: "Add to playlist!"
        }).then((res) => {
          if (res.value) {
            sendSongData(response.data[0].name, response.data[0].artist);
          }
        });
      } else {
        sendSongData(response.data[0].name, response.data[0].artist);
      }
    })
    .catch(err => {
      console.log(err);
      swal.fire({
        title: "ERROR!",
        text: err.response.data,
        type: "error"
      });
    });
}

// post the song request to the DB and then build the list again to catch any changes made by outside users.
function sendSongData(songTitle, artist) {
  let requestedSong = document.getElementById("song-title");
  let requestedArtist = document.getElementById("artist");
  let songList = document.getElementById("song-list");

  swal.fire({
    title: "Adding song to list...",
    onBeforeOpen: () => {
      swal.showLoading();
    }
  });

  axios
    .post("/music", {
      song: songTitle,
      artist: artist
    })
    .then(response => {
      let list = document.createElement("ul");
      songList.innerHTML = "";
      songList.appendChild(list);
      response.data.forEach(request => {
        let listItem = document.createElement("li");
        listItem.innerHTML = request.song + " | " + request.artist;
        list.appendChild(listItem);
      });
      requestedSong.value = "";
      requestedArtist.value = "";
      swal.close();
    })
    .catch(err => {
      console.log(err);
      swal.fire({
        title: "ERROR!",
        text: err.response.data,
        type: "error"
      });
    });
}

function addDeleteEvent(button) {
  button.addEventListener("click", () => {
    if (guestCount > 1) {
      let removeEl = document.querySelector(".form-group:last-of-type");
      removeEl.parentElement.removeChild(removeEl);
      guestCount -= 1;
    }
  });
}
