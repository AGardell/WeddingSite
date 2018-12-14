let hamburger = document.getElementById("hamburger");
let links = document.getElementById("links");
let addPerson = document.getElementById("add-person");
let guestList = document.getElementById("guest-list");
let form = document.getElementById('guest-list');
var guestCount = 1;
// add JS to click button in order to append additional text fields for additional guests.
// -------------------------------------------------------
hamburger.addEventListener("click", () => {
    links.classList.toggle("open-links");
    hamburger.classList.toggle("open-links");
});

addPerson.addEventListener("click", () => {
    console.log("Add person clicked!");
    let divEl = document.createElement('div');
    divEl.classList.add('form-group');
    divEl.appendChild(createFirstNameElement(guestCount));
    divEl.appendChild(createSpanBarElement());
    divEl.appendChild(createLastNameElement(guestCount));
    divEl.appendChild(createSpanBarElement());
    divEl.appendChild(createEmailElement(guestCount));
    divEl.appendChild(createButtonElement());
    guestList.insertBefore(divEl, document.querySelector('#guest-list > .submit-button'));
    guestCount += 1;
});

function createFirstNameElement(num) {
    let firstNameEl = document.createElement('input');
    firstNameEl.type = 'text';
    firstNameEl.placeholder = 'First Name';
    firstNameEl.name = 'firstname' + num;
    return firstNameEl;
}

function createSpanBarElement() {
    let spanBar = document.createElement('span');
    spanBar.appendChild(document.createTextNode('/'));
    return spanBar;
}

function createLastNameElement(num) {
    let lastNameEl = document.createElement('input');
    lastNameEl.type = 'text';
    lastNameEl.placeholder = 'Last Name';
    lastNameEl.name = 'lastname' + num;
    return lastNameEl;
}

function createEmailElement(num) {
    let emailEl = document.createElement('input');
    emailEl.type = 'text';
    emailEl.placeholder = 'Email';
    emailEl.name = 'email' + num;
    return emailEl;
}

function createButtonElement() {
    let buttonEl = document.createElement('button');
    let iconEl = document.createElement('i');
    iconEl.classList.add('fa');
    iconEl.classList.add('fa-user-circle');
    buttonEl.id = 'add-person';
    buttonEl.style = 'visibility: hidden;';
    buttonEl.appendChild(iconEl);
    buttonEl.appendChild(document.createTextNode('\u00A0\u00A0Click me to add additional guests!'));
    return buttonEl;
}

// JS to compile proper JSON object before sending.
// -------------------------------------------------------

function sendData(data) {
    let guestList = {};
    let xhr = new XMLHttpRequest();

    for(var i = 0; i < guestCount; i++){
        let firstname = document.getElementsByName('firstname' + i)[0].value;
        let lastname = document.getElementsByName('lastname' + i)[0].value;
        let email = document.getElementsByName('email' + i)[0].value;
        let guestNum = 'guest' + i;

        guestList[guestNum] = {
            'firstname': firstname,
            'lastname': lastname,
            'email': email
        };
    };

    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.responseText === '1') {
                Swal({
                    titleText: 'Thank you!',
                    text: 'Look forward to seeing you Oct 27th!',
                    type: 'success'
                });
            }
            else {
                Swal({
                    titleText: 'Error',
                    text: 'Uh oh! Looks like something went wrong!',
                    type: 'error'
                })                
            }
        }
        else {
            Swal({
                titleText: 'Error',
                text: 'Uh oh! Looks like something went wrong!',
                type: 'error'
            })
        }
    };

    xhr.open('POST', '/rsvp', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');   
    xhr.send(JSON.stringify(guestList));
};

form.addEventListener('submit', () => {
    event.preventDefault();
    sendData(form);
});