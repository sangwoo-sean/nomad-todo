const todoForm = document.querySelector(".js-todoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-toDoList");

const TODOS_LOCAL_STORAGE = "toDos";
let toDos = [];

function delToDo(event) {
    const target = event.target.parentNode;
    todoList.removeChild(target);
    const cleanToDos = toDos.filter((each) => { // 클릭한 리스트 삭제하고, todos 에서 그 아이디를 제외한 나머지들로 다시 리스트를 구성
        return (each.id !== parseInt(target.id));
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LOCAL_STORAGE, JSON.stringify(toDos));
}

function addToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length +1;
    delBtn.innerText = "X";
    delBtn.addEventListener("click", delToDo);
    span.innerText = text

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    todoList.appendChild(li);

    const aToDo = {
        text: text,
        id : newId
    };
    toDos.push(aToDo);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    if (currentValue.length > 0){  
        addToDo(currentValue);
        todoInput.value = "";
    }
}

function loadToDos() {
    const storageToDos = localStorage.getItem(TODOS_LOCAL_STORAGE);
    if (storageToDos !== null){
        const parsed = JSON.parse(storageToDos)
        parsed.forEach((each) => addToDo(each.text));
    }
}

function init() {
    loadToDos();
    todoForm.addEventListener("submit", handleSubmit)
}

init();