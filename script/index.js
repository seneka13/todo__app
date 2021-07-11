import {closeCreateTaskModal, openCreateTaskModal} from './modules/modals/createBtnModal.js'
import {createElem} from './utiles.js'
import {openWarnModal, closeWarnModal} from './modules/modals/warnModal.js'

const datas = JSON.parse(localStorage.getItem("data")) || [];

console.log(datas);

const createModalCloseBtn = document.getElementById('create__modal__close');
const createBtn = document.getElementById("createBtn");

createModalCloseBtn.addEventListener("click", closeCreateTaskModal);
createBtn.addEventListener("click", openCreateTaskModal);


const errMsg = document.getElementById("err__msg");
const saveBtn = document.querySelector(".create__save");

const tasksBlock = document.querySelector(".task__tasks");
const taskTitle = document.querySelector(".input__title");
const taskDesc = document.querySelector(".input__desc");


function renderTasks(datas) {
    tasksBlock.innerHTML = "";
    datas.forEach((data, index) => {
            let task = createElem("div", "taskNode");
                let taskHeader = createElem("div", 'taskHeader');
                    let title = createElem("h3", "task__h3", data.title);
                    let taskCheckBox = createElem("input", "taskCheckBox");
                    taskCheckBox.type = "checkbox";
                    taskCheckBox.style.cursor = "pointer"
                taskHeader.append(title, taskCheckBox);

            taskCheckBox.addEventListener("click", () => {
                if(taskCheckBox.checked) {
                    task.style.opacity = 0.6;
                    task.style.transitionDuration = "0.3s";
                    title.style.textDecoration = "line-through"
                }else {
                    task.style.opacity = 1;
                    task.style.transitionDuration = "0.3s";
                    title.style.textDecoration = "none"
                }
            })

            let desc = createElem("p", "task__desc", data.desc);
            let removeTaskBtn = createElem("button", "removeTaskBtn");
            removeTaskBtn.style.backgroundImage = "url(../img/trush.png)";
            task.append(taskHeader, desc, removeTaskBtn);

            // removeTaskBtn.addEventListener("click", () => {openWarnModal(this.data)}

            removeTaskBtn.addEventListener("click", () => {
                console.log(index);
                deleteTask(index);
                renderTasks(datas);
            });

        tasksBlock.prepend(task);
    })   
}

function deleteTask(index) {
    datas.splice(index, 1);
    updateLocal();
};

function updateLocal() {
    localStorage.setItem("data", JSON.stringify(datas));
}

renderTasks(datas);


saveBtn.addEventListener("click", function() {

        // if(taskTitle.value) {
        //     taskTitleV = taskTitle.value 
        //     taskTitle.style.border = 'none'
        // }else {
        //     taskTitle.style.border = '1px solid red';
        //     errMsg.innerHTML = "Заголовок не задан";
        //     errMsg.style.display = 'block'
        // }

        // if(taskDesc.value) {
        //     taskDescV = taskDesc.value 
        //     taskDesc.style.border = 'none'
        // }else {
        //     taskDesc.style.border = '1px solid red';
        //     errMsg.innerHTML = "Описание пусто..";
        //     errMsg.style.display = 'block'
        // }
    
    let taskTitleV = taskTitle.value
    let taskDescV = taskDesc.value;

    let data = {
        title: taskTitleV,
        desc: taskDescV,
        isForDelete: false
    };


    datas.push(data);
    updateLocal();
    clearInputs();
    closeCreateTaskModal();
    renderTasks(datas);
})

function clearInputs() {
    taskTitle.value = "";
    taskDesc.value = "";
}

