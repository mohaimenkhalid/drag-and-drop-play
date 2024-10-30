const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');

//Fill Listeners
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);


for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}
//Drag point
//
function dragOver(e) {
    e.preventDefault();
    console.log("over")
}
function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered'
    console.log("enter")
}
function dragLeave() {
    this.className = 'empty'
    console.log("leave")
}
function dragDrop() {
    console.log("droped")
    this.className = 'empty'
    this.append(fill)
}


//Functions
function dragStart() {
    console.log("start")
    this.className += ' hold'
}

function dragEnd() {
    console.log("drag end")
    this.className += 'fill'
}
