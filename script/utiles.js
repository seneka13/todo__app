


function createElem(tag, className, innerHTML) {
    let elemNode = document.createElement(tag);
        elemNode.classList.add(className);
        if(innerHTML) {
            elemNode.innerHTML = innerHTML
        }
    return elemNode
}

export {createElem}