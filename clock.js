const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();
    clockTitle.innerText = `${hh < 9 ? `0${hh}` : `${hh}`}:${mm < 9 ? `0${mm}` : `${mm}`}:${ss < 9 ? `0${ss}` : `${ss}`}`;

}


function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();

