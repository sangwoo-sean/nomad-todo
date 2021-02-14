const scheduleFrom = document.querySelector(".js-scheduleForm");
const scheduleInput = scheduleFrom.querySelector("input");
const scheduleList = document.querySelector(".js-scheduleList");
const getTimebox = document.querySelector(".getTimebox");


const SCHEDULE_LOCAL_STORAGE = "schedules";
let schedules = [];


function getTime() {
    const today = new Date();
    const YYYY = today.getFullYear();
    const MM = today.getMonth() + 1;
    const DD = today.getDate();
    const hh = today.getHours();
    const mm = today.getMinutes();
    const classNames = ["js-year", "js-month", "js-date", "js-hour", "js-minute"]
    const allTime = [YYYY, MM, DD, hh, mm]

    for (i = 0; i < 5; i++) {
        const form = document.createElement("form");
        const inputbox = document.createElement("input");
        form.className = classNames[i];
        inputbox.type = "text";
        inputbox.placeholder = allTime[i];
        form.appendChild(inputbox);
        form.addEventListener("submit", handleSubmit);
        getTimebox.appendChild(form);
    }

}

function delSchedule(event) {
    const target = event.target.parentNode.parentNode;
    scheduleList.removeChild(target);
    const cleanSchedules = schedules.filter((each) => { // 클릭한 리스트 삭제하고, todos 에서 그 아이디를 제외한 나머지들로 다시 리스트를 구성
        return (each.id !== parseInt(target.id));
    });
    schedules = cleanSchedules;
    saveSchedules();
}

function saveSchedules() {
    localStorage.setItem(SCHEDULE_LOCAL_STORAGE, JSON.stringify(schedules));
}





function calTime(targetTime) { // 이걸 표시할때 계속초가 줄어들도록 표시해야함, 1초마다 새시간을 가져와야함
    const currentTime = new Date();
    const due = targetTime - currentTime;
    const DAY_TIME = 1000 * 60 * 60 * 24;
    const dayDue = Math.ceil(due / DAY_TIME);
    const HOUR_TIME = 1000 * 60 * 60;
    const hourDue = Math.ceil((due % DAY_TIME) / HOUR_TIME);
    const MIN_TIME = 1000 * 60;
    const minDue = Math.ceil((due % HOUR_TIME) / MIN_TIME);
    // console.log(dayDue, hourDue, minDue);
    // const SEC_TIME = 1000;
    // const secDue = Math.floor((due % MIN_TIME) / SEC_TIME);
    if (dayDue > 0 && hourDue >= 0 && minDue >= 0) {
        return (
            `${dayDue}일 후`
        );
    } else if (dayDue <= 0 && hourDue > 0 && minDue >= 0) {
        return (
            `${hourDue}시간 후`
        );
    } else if (dayDue <= 0 && hourDue <= 0 && minDue > 0) {
        return (
            `${minDue}분 후`
        );
    } else if (dayDue <= 0 && hourDue <= 0 && minDue <= 0) {
        return (
            `PAST`
        );
    }
}

function addSchedule(text, time) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const spanTime = document.createElement("span");
    const span = document.createElement("span");
    const newId = schedules.length + 1;
    const div = document.createElement("div");

    function appendTime() {
        const timeToShow = calTime(new Date(time));
        spanTime.innerText = timeToShow;
    }
    appendTime()
    setInterval(appendTime, 1000);

    delBtn.innerText = "X";
    delBtn.addEventListener("click", delSchedule);
    spanTime.className = "dueTime";
    span.innerText = text;
    div.className = "rights";

    div.appendChild(spanTime);
    div.appendChild(delBtn);
    li.appendChild(span);
    li.appendChild(div);
    li.id = newId;
    scheduleList.appendChild(li);

    const aSchedule = {
        text,
        time,
        id: newId
    };
    schedules.push(aSchedule);
    saveSchedules();
}



function handleSubmit(event) {
    event.preventDefault();

    const inputs = document.querySelector(".getTimebox");
    const targetTimeInput = inputs.querySelectorAll("input");

    const targetYear = parseInt(targetTimeInput[0].value);
    const targetMonth = parseInt(targetTimeInput[1].value) - 1; // month : 0~11
    const targetDate = parseInt(targetTimeInput[2].value);
    const targetHour = parseInt(targetTimeInput[3].value);
    const targetMinute = parseInt(targetTimeInput[4].value);
    const targetTime = new Date(targetYear, targetMonth, targetDate, targetHour, targetMinute);

    const currentValue = scheduleInput.value;

    if (currentValue.length > 0 &&
        targetYear.length !== null &&
        targetMonth.length !== null &&
        targetDate.length !== null &&
        targetHour.length !== null &&
        targetMinute.length !== null) {
        addSchedule(currentValue, targetTime);
        scheduleInput.value = "";
        targetTimeInput[0].value = "";
        targetTimeInput[1].value = "";
        targetTimeInput[2].value = "";
        targetTimeInput[3].value = "";
        targetTimeInput[4].value = "";
    } else {
        alert("입력되지 않은 정보가 있습니다.");
    }

}

function loadSchedules() {
    const storageSchedules = localStorage.getItem(SCHEDULE_LOCAL_STORAGE);
    if (storageSchedules !== null) {
        const parsed = JSON.parse(storageSchedules);
        parsed.forEach((each) => addSchedule(each.text, each.time));
    }
}

function init() {
    loadSchedules();

    scheduleFrom.addEventListener("submit", handleSubmit)
    getTime();
}

init();