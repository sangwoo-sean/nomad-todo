const form = document.querySelector(".js-form");
const input = document.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LOCAL_STORAGE = "currentUser"
const SHOWING_CLASS_NAME = "showing"

function saveName(text) {
    localStorage.setItem(USER_LOCAL_STORAGE, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askName() {
    form.classList.add(SHOWING_CLASS_NAME);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    const time = parseInt(localStorage.getItem("currentTime"));
    form.classList.remove(SHOWING_CLASS_NAME);
    greeting.classList.add(SHOWING_CLASS_NAME);
    if (time < 12) {
        greeting.innerText = `Good Morning ${text}`;
    } else if (time > 18) {
        greeting.innerText = `Good Evening ${text}`;
    } else {
        greeting.innerText = `Good Afternoon ${text}`;
    }
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LOCAL_STORAGE);
    if (currentUser === null){
        askName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();