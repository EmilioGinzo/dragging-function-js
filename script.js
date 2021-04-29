const containers = document.querySelectorAll(".container")
const draggables = document.querySelectorAll(".draggable")

//cuando el elemento arrastrable comienza a ser arrastrado se le aprega la clase dragging, cuando deja de ser arrastrado
//se le remueve la clase
draggables.forEach( draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach( container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const dragging = document.querySelector('.dragging')
        container.append(dragging)
    })
})

function getDragAfterElement(container, y){
    const draggableElement = container.querySelectorAll('.draggable:not(.dragging)')
}