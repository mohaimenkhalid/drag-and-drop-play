const dropzone = document.querySelector('.dropzone');
const dropzoneItem = document.querySelector('#dropzone-items');
const placeholderContainer = document.querySelector('.placeholder-container');
const fileInput = document.querySelector('#fileInput');

dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('dragenter', dragEnter);
dropzone.addEventListener('dragleave', dragLeave);
dropzone.addEventListener('drop', dragDrop);

fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    handlePreview(files);
})
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
    const imgParentContainer = document.createElement('div');
    const imageName = document.createElement('div');
    imgParentContainer.classList.add('image-parent-container');
    imageName.textContent = modifyString(file.name);

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            img.src = event.target.result;
            img.alt = file.name;
            img.classList.add('dropzone-imagePreview');
            imgParentContainer.appendChild(img)
            imgParentContainer.appendChild(imageName)
            dropzoneItem.appendChild(imgParentContainer);

        };
        reader.readAsDataURL(file);
    }
}

function modifyString(originalStr) {
    const parts = originalStr.split('.');
    const fileExtension = parts.pop();
    const baseName = parts.join('.');
    const modifiedBaseName = baseName.slice(0, 10) + '...';
    return `${modifiedBaseName}${fileExtension ? '.' + fileExtension : ''}`;
}

