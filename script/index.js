import { openCreateTaskModal, closeCreateTaskModal } from "./modules/modals/createBtnModal.js";
import {createElem} from './utiles.js';
import {openWarnModal, closeWarnModal} from './modules/modals/warnModal.js'

const datas = JSON.parse(localStorage.getItem("data")) || [];

const taskBox = document.querySelector('.task__tasks');
const createBtn = document.querySelector("#createBtn");
const inputTitle = document.querySelector('.input__title');
const inputDesc = document.querySelector('.input__desc');
const errMsg = document.querySelector("#err__msg");

const saveBtn = document.querySelector('.create__save');


function renderTasks(datas) {
    taskBox.innerHTML = ''
    let datasForRender = [...datas].filter(data => data.isForDelete === false);
    datasForRender.forEach((data, index) => {
        let task = createElem('div', "taskNode");
            let taskHeader = createElem("div", 'taskHeader');
            let title = createElem("h3", "task__h3", data.title);
            let taskCheckBox = createElem("input", "taskCheckBox");
            taskCheckBox.type = "checkbox";
            taskCheckBox.style.cursor = "pointer"
            taskHeader.append(title, taskCheckBox);

            taskCheckBox.addEventListener('click', () => {
                if(taskCheckBox.checked) {
                    data.isChecked = true
                    updateLocal();
                }else {
                    data.isChecked = false
                    updateLocal();
                }

                if(data.isChecked === true){
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

            removeTaskBtn.addEventListener("click", () => {
                openWarnModal();
                let delBtn = document.querySelector('.warn__btn_delete');
                delBtn.addEventListener("click", () => {
                    data.isForDelete = true
                    updateLocal();
                    console.log(data);
                    renderTasks(datas);
                    closeWarnModal();
                })
            })

        task.append(taskHeader, desc, removeTaskBtn);

        taskBox.prepend(task)
    })
};


createBtn.addEventListener('click', openCreateTaskModal);

saveBtn.addEventListener("click", () => {
    if(inputTitle.value) {
            let data = {
                title: inputTitle.value,
                desc: inputDesc.value,
                isForDelete: false,
                isChecked: false
            };

            datas.unshift(data);
            updateLocal();
            renderTasks(datas);
            clearInputs();
            closeCreateTaskModal();
    }else {
        errMsg.innerHTML = "Нету заголовка..";
        errMsg.style.color = 'red';
        errMsg.style.display = 'block';
    }
})

function updateLocal() {
    localStorage.setItem("data", JSON.stringify(datas))
};

function clearInputs() {
    inputTitle.value = ""
    inputDesc.value = ""
}