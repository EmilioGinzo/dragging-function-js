const containers = document.querySelectorAll(".container")
const draggables = document.querySelectorAll(".draggable")

/*cuando el elemento arrastrable comienza a ser arrastrado se le aprega la clase dragging, cuando deja de ser arrastrado
se le remueve la clase*/
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
        if (afterElement == null) {
            container.append(dragging)
        } else {
            container.insertBefore(dragging, afterElement)
        }
    })
})

function getDragAfterElement(container, y){
    const draggableElement = [...container.querySelectorAll('.draggable:not(.dragging)')]


    return draggableElement.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = (box.top + box.height/2 ) - y
        /*cuando el elemento dragging este exactamente a la mitad de un child, entonces va a retornar 0, si esta por arriba retorna un numero positivo 
        y si esta por debajo retorna un numero negativo, si el offset que leemos del cliente es menor que el que tenemos, entonces lo retornamos,
        es importante tambien retornar el child ya que este sera el que nos dira sobre que elemento estamos */
        if (offset > 0 && offset < closest.offset) {
            return {offset: offset, element: child}
        } else {
            return closest
        }
    }, {offset: Number.POSITIVE_INFINITY}).element
}