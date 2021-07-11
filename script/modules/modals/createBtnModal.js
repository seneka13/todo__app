const body = document.body;
const createModalLayer = document.querySelector(".create__modal__layer");
const createModalCloseBtn = document.getElementById('create__modal__close');
const undoBtn = document.querySelector(".create__undo");

function openCreateTaskModal() {
    body.style.overflow = "hidden"
    createModalLayer.style.zIndex = 2;
    createModalLayer.style.opacity = 1;
    createModalLayer.style.visibility = "visible";
    createModalLayer.style.transitionDuration = 0.4 + "s";
}

function closeCreateTaskModal() {
    body.style.overflow = "auto"
    createModalLayer.style.zIndex = -1;
    createModalLayer.style.opacity = 0;
    createModalLayer.style.visibility = "hidden";
}
undoBtn.addEventListener("click", closeCreateTaskModal);
window.addEventListener("click", e => e.target === createModalLayer ? closeCreateTaskModal():false);
createModalCloseBtn.addEventListener("click", closeCreateTaskModal);

export {closeCreateTaskModal, openCreateTaskModal};