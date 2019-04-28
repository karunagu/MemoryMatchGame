'use strict';

//Variables
var numberCells = 8;
var locationList = [];
var i,j = 0;

//Array to store all the images
MemoryItem.allImages = [];



// create objects
function MemoryItem(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.loc1 = 0;
  this.loc2 = 0;
  this.statusLoc1 = 'c';
  this.statusLoc2 = 'c';
  this.completed = 0;
  MemoryItem.allImages.push(this);
}

new MemoryItem('dubai', 'img/dubai.jpg');
new MemoryItem('newyork', 'img/newyork.jpg');
new MemoryItem('rome', 'img/rome.jpg');
new MemoryItem('amsterdam', 'img/amsterdam.jpg');

// Generate an array with list of random numbers
// function randomCell() {
for (i = 1; i <= numberCells; i++) {
  var randomIdx = (Math.ceil(Math.random() * numberCells));
  //console.log('i', randomIdx);
  j = 1;
  while (j <= locationList.length) {
    if (locationList[j] === randomIdx) {
      randomIdx = (Math.ceil(Math.random() * numberCells));
      //console.log('j', randomIdx);
      j = 1;
    }
    else{
      j++;
    }
  }
  locationList[i] = randomIdx;
}
i = 0;
j = 1;
while (i < MemoryItem.allImages.length) {
  MemoryItem.allImages[i].loc1 = locationList[j];
  MemoryItem.allImages[i].loc2 = locationList[j + 1];
  i++;
  j = j + 2;
}
console.log ('MemoryItem.allImages:');
console.log (MemoryItem.allImages);

var img1 = document.getElementById('block1');
var img2 = document.getElementById('block2');
img1.addEventListener('click', itemClick);
img2.addEventListener('click', itemClick);

function itemClick(event){
  console.log('test', event.target);
  console.log('event id test:', this.id);
}
