
const dropzone = document.querySelector('.dropzone');
const dropzoneItem = document.querySelector('#dropzone-items');
const placeholderContainer = document.querySelector('.placeholder-container');
const fileInput = document.querySelector('#fileInput');

//Register drag listeners
dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('dragenter', dragEnter);
dropzone.addEventListener('dragleave', dragLeave);
dropzone.addEventListener('drop', dragDrop);

//added input change listener for click to select image
fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    handlePreview(files);
})
//Drag functions
function dragOver(e) {
    e.preventDefault();
    console.log("over")
}
function dragEnter(e) {
    e.preventDefault();
    //added hovered class for showing dropzone dashed border
    dropzone.classList.add('hovered');
    console.log("enter")
}
function dragLeave() {
    //remove dashed border after leave dropzone
    dropzone.classList.remove('hovered');
    console.log("leave")
}
function dragDrop(e) {
    e.preventDefault()
    console.log("droped")
    //get dropped data
    const dt = e.dataTransfer;
    const files = dt.files;
    handlePreview(files);
    dropzone.classList.remove('hovered');
}

// handle preview files
function handlePreview(files) {
    //check length for hiding placeholder
    if(files.length) {
        placeholderContainer.style.display = 'none'
    }
    //looping over files and preview image
    Array.from(files).forEach(function (file, index) {
        preview(file)
    })
}

//Preview single file
function preview(file) {
    const img = document.createElement('img');
    const imageName = document.createElement('div');
    const imgParentContainer = document.createElement('div');
    const filesize = calculateImageSize(file)

    imgParentContainer.classList.add('image-parent-container');
    img.classList.add('dropzone-imagePreview');
    imageName.textContent = `${modifyString(file.name)} (${filesize})`;

    //read file
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            img.src = event.target.result;
            img.alt = file.name;

            //append image into image container
            imgParentContainer.appendChild(img)
            //append image name into image container
            imgParentContainer.appendChild(imageName)
            //append image container into dropzoneItem
            dropzoneItem.appendChild(imgParentContainer);
        };
        reader.readAsDataURL(file);
    }
}

//short/modifying image name
function modifyString(originalStr) {
    const parts = originalStr.split('.');
    const fileExtension = parts.pop();
    const baseName = parts.join('.');
    const modifiedBaseName = baseName.slice(0, 10) + '...';
    return `${modifiedBaseName}${fileExtension ? '.' + fileExtension : ''}`;
}

//convert image size to kb or mb
function calculateImageSize(file) {
    const sizeInBytes = file.size;
    const sizeInKB = (sizeInBytes / 1024).toFixed(2); // Convert to KB
    const sizeInMB = (sizeInKB / 1024).toFixed(2); // Convert to MB
    if (sizeInMB < 1) {
        return `${sizeInKB} kb`
    }
    return `${sizeInMB} mb`
}