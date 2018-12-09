let hamburger = document.getElementById("hamburger");
let links = document.getElementById("links");
let addPerson = document.getElementById("add-person");
let guestList = document.getElementById("guest-list");
var guestCount = 1;

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
    spanBar.appendChild(document.createTextNode('|'));
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
