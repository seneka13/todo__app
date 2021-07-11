

const changeModal__layer = document.querySelector(".changeModal__layer");
const closeChangeModalBtn = document.querySelector(".changeModal__closeBtn");
const changeModalUndoBtn = document.querySelector('.changeModal__button_undo');

function openChangeModal() {
    changeModal__layer.style.zIndex = 5;
    changeModal__layer.style.visibility = "visible";
    changeModal__layer.style.opacity = 1;
}

function closeChangeModal() {
    changeModal__layer.style.zIndex = -5;
    changeModal__layer.style.visibility = "hidden";
    changeModal__layer.style.opacity = 0;
}
window.addEventListener("click", e => e.target === changeModal__layer ? closeChangeModal():false);
closeChangeModalBtn.addEventListener("click", closeChangeModal);
changeModalUndoBtn.addEventListener("click", closeChangeModal);

export {openChangeModal, closeChangeModal}