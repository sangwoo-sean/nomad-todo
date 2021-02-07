const dailyForm = document.querySelector(".js-dailyForm");
const dailyInput = dailyForm.querySelector("input");
const dailyList = document.querySelector(".js-dailyList");

const DAILY_LOCAL_STORAGE = "daily";
let dailys = [];

function delDaily(event) {
    const target = event.target.parentNode.parentNode;
    dailyList.removeChild(target);
    const cleanDailys = dailys.filter((each) => { // 클릭한 리스트 삭제하고, todos 에서 그 아이디를 제외한 나머지들로 다시 리스트를 구성
        return (each.id !== parseInt(target.id));
    });
    dailys = cleanDailys;
    saveDailys();
}

function checkDaily(event) {
    const targetId = parseInt(event.target.id);
    const li = dailyList.querySelector(`#${CSS.escape(targetId)}`);
    const div = li.querySelector("div");
    const btn = div.querySelector(".check")

    dailys.forEach(each => {
        if (each.id === targetId) {
            const status = each.check;

            if (status === false) {
                each.check = true;
                btn.classList.add("doneBtn");
                btn.innerHTML = "✔";
            } else {
                btn.classList.remove("doneBtn");
                each.check = false;
                btn.innerHTML = "";
            }

        }
    })
    saveDailys();
}




function saveDailys() {
    localStorage.setItem(DAILY_LOCAL_STORAGE, JSON.stringify(dailys));
}

function addDaily(text, check) {
    //html
    const li = document.createElement("li");
    const btns = document.createElement("div");
    const checkBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = dailys.length +1;
    checkBtn.addEventListener("click", checkDaily);
    delBtn.innerText = "X";
    delBtn.addEventListener("click", delDaily);
    span.innerText = text

    li.appendChild(span);
    if (check) {
        checkBtn.className = "check doneBtn";
        checkBtn.innerHTML = "✔";
    } else {
        checkBtn.className = "check";
    }
    checkBtn.id = newId;
    btns.appendChild(checkBtn);
    btns.appendChild(delBtn);
    li.appendChild(btns);
    li.id = newId;
    dailyList.appendChild(li);

    // 로컬스토리지
    const aDaily = {
        text: text,
        id : newId,
        check : check
    };
    dailys.push(aDaily);
    saveDailys();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = dailyInput.value;    
    addDaily(currentValue, false);
    dailyInput.value = "";
    
}

function loadDailys() {
    const storageDailys = localStorage.getItem(DAILY_LOCAL_STORAGE);
    if (storageDailys !== null){
        const parsed = JSON.parse(storageDailys)
        parsed.forEach((each) => addDaily(each.text, each.check));
    }
}

function init() {
    loadDailys();
    dailyForm.addEventListener("submit", handleSubmit)
}

init();