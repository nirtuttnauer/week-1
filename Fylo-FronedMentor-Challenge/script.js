let totalSize = 10;
var sizeOccupied = 0;
var percent;
var sizeLeft;

init();

function init(){
   // sizeOccupied = localStorage.sizeO;
   var percent = 100 * (sizeOccupied/totalSize) + 4;
   var sizeLeft = totalSize-sizeOccupied;
   document.getElementById("totalSize").innerText = totalSize + " MB";
   document.getElementById("sizeLeft").innerText = financial(sizeLeft);
   document.getElementById("sizeOccupied").innerText = financial(sizeOccupied)  + " MB";
   document.getElementById("size-left-type").innerText = "MB Left"
   document.getElementById("progress").style.width = percent.toString(10)  + "%";
}

function financial(x) {
   return Number.parseFloat(x).toFixed(2);
}

function addSize(s){
   s/= (Math.pow(1024,2));
   sizeOccupied += s;
   if (sizeOccupied < totalSize){
      sizeLeft = totalSize-sizeOccupied;
      percent = 100 * (sizeOccupied/totalSize) - 4;
      document.getElementById("sizeOccupied").innerText = financial(sizeOccupied)  + " MB";
      document.getElementById("sizeLeft").innerText = financial(sizeLeft);
      document.getElementById("progress").style.width = percent.toString(10) + "%";
      document.getElementById("progress").style.transition = "width 0.5s ease 0.1s";
   }
   else {
      sizeOccupied -= s;
      alert("There is not enough space on the disk")
   }
}

var uploadBtn = document.getElementById('choose-file');
uploadBtn.addEventListener("change",() =>{
   const pattern = new RegExp('(\.(gif|jpe?g|jpg|png))');
   if (pattern.test(uploadBtn.files[0].name)){
      const file = uploadBtn.files[0];
      addSize(file.size)
      uploadBtn.files[0].name = "";
   }
   else{
      alert("File Type Not Supported");
   }
});

var clear = document.getElementById('clear');
clear.addEventListener("click",() => {
   // localStorage.setItem('sizeO', 0);
   sizeOccupied = 0;
   init();
});