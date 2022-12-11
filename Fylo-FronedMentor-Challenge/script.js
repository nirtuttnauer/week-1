const totalSize = 10;
let usedSize = 0;
let percent;
let sizeLeft;
totalSizeElement = document.getElementById("totalSize");
sizeLeftElement = document.getElementById("sizeLeft");
progressElement = document.getElementById("progress");
usedSizeElement = document.getElementById("sizeOccupied");


const init = () => {
    usedSize = Number(window.localStorage.getItem('usedSize'));
    percent = 100 * (usedSize / totalSize) + 4;
    sizeLeft = totalSize - usedSize;
    totalSizeElement.innerText = totalSize + " MB";
    sizeLeftElement.innerText = shorten(sizeLeft);
    usedSizeElement.innerText = shorten(usedSize) + " MB";
    progressElement.style.width = percent.toString(10) + "%";
}

const shorten = (x) => {
    return Number.parseFloat(x).toFixed(2);
}

const addSize = (s) => {
    s /= (Math.pow(1024, 2));
    if (usedSize + s < totalSize) {
        usedSize += s;
        sizeLeft = totalSize - usedSize;
        percent = 100 * (usedSize / totalSize) - 4;
        usedSizeElement.innerText = shorten(usedSize) + " MB";
        sizeLeftElement.innerText = shorten(sizeLeft);
        progressElement.style.width = percent.toString(10) + "%";
        progressElement.style.transition = "width 0.5s ease 0.1s";
    } else {
        alert("There is not enough space on the disk")
    }
}


const onFileInputChange = (e) => {
    const fileName = e.value;
    const isImgFile = new RegExp('(\.(gif|jpeg|jpg|png))').test(fileName);
    if (isImgFile) {
        const file = e.files[0];
        addSize(file.size)
    } else {
        alert("File Type Not Supported");
    }
}

var clear = document.getElementById('clear');
clear.addEventListener("click", () => {
    usedSize = 0;
    init();
});

//main start

init();




