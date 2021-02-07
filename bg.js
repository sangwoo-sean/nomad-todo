const body = document.querySelector("body");
const IMG_NUMBER = 9

function putImg(imgNum) {
    const image = new Image();
    image.src = `/imgs/${imgNum+1}.jpg`;
    image.src = `/nomad-todo/imgs/${imgNum+1}.jpg`;
    image.classList.add("backgroundImg");
    body.appendChild(image);
}

function getRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number
}

function init() {
    const randNum = getRandom();
    putImg(randNum);
}
init();
