const scheduleFrom = document.querySelector(".js-scheduleForm");
const scheduleInput = scheduleFrom.querySelector("input");
const scheduleList = document.querySelector(".js-scheduleList");

const SCHEDULE_LOCAL_STORAGE = "schedules";
let schedules = [];

function delSchedule(event) {
    const target = event.target.parentNode;
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

function addSchedule(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = schedules.length +1;
    delBtn.innerText = "X";
    delBtn.addEventListener("click", delSchedule);
    span.innerText = text

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    scheduleList.appendChild(li);

    const aSchedule = {
        text: text,
        id : newId
    };
    schedules.push(aSchedule);
    saveSchedules();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = scheduleInput.value;    
    addSchedule(currentValue);
    scheduleInput.value = "";
    
}

function loadSchedules() {
    const storageSchedules = localStorage.getItem(SCHEDULE_LOCAL_STORAGE);
    if (storageSchedules !== null){
        const parsed = JSON.parse(storageSchedules)
        parsed.forEach((each) => addSchedule(each.text));
    }
}

function init() {
    loadSchedules();
    scheduleFrom.addEventListener("submit", handleSubmit)
}

init();