const dropzone = document.querySelector('.dropzone');
const dropzoneItem = document.querySelector('#dropzone-items');
const placeholderContainer = document.querySelector('.placeholder-container');

// const fileInput = document.getElementById('fileInput');

dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('dragenter', dragEnter);
dropzone.addEventListener('dragleave', dragLeave);
dropzone.addEventListener('drop', dragDrop);

// fileInput.addEventListener('change', (e) => {
//     console.log(e)
// })
//Drag point
function dragOver(e) {
    e.preventDefault();
    console.log("over")
}
function dragEnter(e) {
    e.preventDefault();
    //this.className += ' hovered'
    dropzone.classList.add('hovered');
    console.log("enter")
}
function dragLeave() {
    dropzone.classList.remove('hovered');
    console.log("leave")
}
function dragDrop(e) {
    e.preventDefault()
    console.log("droped")
    const dt = e.dataTransfer;
    const files = dt.files;

    //console.log(files)
    handlePreview(files);
    dropzone.classList.remove('hovered');
}

function handlePreview(files) {
    if(files.length) {
        placeholderContainer.style.display = 'none'
    }
    Array.from(files).forEach(function (file, index) {
        preview(file)
    })
}

function preview(file) {
    const img = document.createElement('img');
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            img.src = event.target.result;
            img.classList.add('dropzone-imagePreview');
            dropzoneItem.appendChild(img);

        };
        reader.readAsDataURL(file);
    }
}