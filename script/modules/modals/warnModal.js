
const warn__layer = document.querySelector('.warnModal__layer');
const closeWarnBtn = document.querySelector(".warnModal__x");
const warnUndo = document.querySelector('.warn__btn_cancel');

function openWarnModal() {
    warn__layer.style.zIndex = 5;
    warn__layer.style.opacity = 1;
    warn__layer.style.visibility = "visible";
}

function closeWarnModal() {
    warn__layer.style.zIndex = -1;
    warn__layer.style.opacity = 0;
    warn__layer.style.visibility = "hidden";
};

warnUndo.addEventListener("click", closeWarnModal);
closeWarnBtn.addEventListener("click", closeWarnModal);
window.addEventListener("click", e => {
    e.target === warn__layer ? closeWarnModal():false
})

export {openWarnModal, closeWarnModal}