import { openCreateTaskModal, closeCreateTaskModal } from "./modules/modals/createBtnModal.js";
import {createElem} from './utiles.js';
import {openWarnModal, closeWarnModal} from './modules/modals/warnModal.js'
import { openChangeModal, closeChangeModal} from "./modules/modals/changeModal.js";
const datas = JSON.parse(localStorage.getItem("data")) || [];

const taskBox = document.querySelector('.task__tasks');
const createBtn = document.querySelector("#createBtn");
const inputTitle = document.querySelector('.input__title');
const inputDesc = document.querySelector('.input__desc');
const errMsg = document.querySelector("#err__msg");
const saveBtn = document.querySelector('.create__save');


const changeTitle = document.querySelector(".changeInput__title");
const changeDesc = document.querySelector(".changeInput__desc");

let filteredDatas = null
function renderTasks(datas) {
    taskBox.innerHTML = ''
    let datasForRender = [...datas].filter(data => data.isForDelete === false);
    filteredDatas = datasForRender
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
                    task.style.opacity = 0.6;
                    task.style.transitionDuration = "0.3s";
                    title.style.textDecoration = "line-through"
                    updateLocal();
                }else {
                    data.isChecked = false
                    task.style.opacity = 1;
                    task.style.transitionDuration = "0.3s";
                    title.style.textDecoration = "none"
                    updateLocal();
                }
                
            })


            let desc = createElem("p", "task__desc", data.desc);

            let taskFooter = createElem("div", "task__footer");
                let removeTaskBtn = createElem("button", "removeTaskBtn");
                removeTaskBtn.style.backgroundImage = "url(../img/trush.png)";

                removeTaskBtn.addEventListener("click", () => {
                    openWarnModal();

                    let delBtn = document.querySelector('.warn__btn_delete');
                    delBtn.addEventListener("click", () => {
                        data.isForDelete = true
                        updateLocal();
                        renderTasks(datas);
                        closeWarnModal();
                    })
                })

                let changeBtnBlock = createElem("div", "changeBtnBlock");
                    let changeBtn = createElem("button", "changeBtn", "изменить");

                    changeBtn.addEventListener("click", () => {
                        openChangeModal();

                        let saveBtn = document.querySelector(".changeModal__button_save");
                        saveBtn.addEventListener("click", () => {                            
                            if(changeTitle.value) {
                                const changeTitle = document.querySelector(".changeInput__title");
                                const changeDesc = document.querySelector(".changeInput__desc");
                                data.title = changeTitle.value;
                                data.desc = changeDesc.value
                                updateLocal();
                                renderTasks(datas);
                                closeChangeModal();
                            }else {
                                alert("заголовок не задан..");
                            }
                        })
                    });

                    let changeBtnIcon = createElem('img', "changeBtnIcon");
                    changeBtnIcon.setAttribute("src", "../img/pen.png");
                    changeBtnBlock.append(changeBtnIcon, changeBtn);
                    taskFooter.append(changeBtnBlock,removeTaskBtn);

        task.append(taskHeader, desc, taskFooter);
        taskBox.prepend(task)
    })
};

renderTasks(datas);


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
    let clearedDatas = [];
    datas.forEach(data => {
        if(!data.isForDelete === true) {
            clearedDatas.push(data);
        }
    })
    localStorage.setItem("data", JSON.stringify(clearedDatas));
};

function clearInputs() {
    inputTitle.value = ""
    inputDesc.value = ""
}
