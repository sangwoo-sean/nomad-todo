const clockContainer = document.querySelector(".clock");
const clockTitle = clockContainer.querySelector(".js-clock");

function getTime() {
    const date = new Date();
    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();
    clockTitle.innerText = `${
        hh < 10 ? `0${hh}` : `${hh}`
    } : ${
        mm < 10 ? `0${mm}` : `${mm}`
    } : ${
        ss < 10 ? `0${ss}` : `${ss}`
    }`;

    localStorage.setItem("currentTime", hh);
}


function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();

