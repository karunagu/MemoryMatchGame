'use strict';

//Variables
var numberCells = 20;
var numberImages = numberCells/2;
var locationList = [];
var i,j, clickCount = 0;

var startButton = document.getElementById('start-button');
startButton.addEventListener('click', shuffleImages);

var cardDownImgPath = 'img/card-down.png';
var prevClickID = '';
var imgMatch, prevImgMatch;

//Array to store all the images
MemoryItem.allImages = [];


// create objects
function MemoryItem(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.loc1 = '';
  this.loc2 = '';
  this.statusLoc1 = 'c';
  this.statusLoc2 = 'c';
  this.completed = 0;
  MemoryItem.allImages.push(this);
}

new MemoryItem('amsterdam', 'img/amsterdam.jpg');
new MemoryItem('dallas', 'img/dallas.jpg');
new MemoryItem('detroit', 'img/detroit.jpg');
new MemoryItem('dubai', 'img/dubai.jpg');
new MemoryItem('london', 'img/london.jpg');
new MemoryItem('milan', 'img/milan.jpg');
new MemoryItem('newyork', 'img/newyork.jpg');
new MemoryItem('pariseiffel', 'img/pariseiffel.jpg');
new MemoryItem('paristower', 'img/paristower.jpg');
new MemoryItem('prague', 'img/prague.jpg');
new MemoryItem('sanfran', 'img/sanfran.jpg');
new MemoryItem('seattle', 'img/seattle.jpg');
new MemoryItem('tajmahal', 'img/tajmahal.jpg');
new MemoryItem('vegas', 'img/vegas.jpg');


/**** Generate an array with list of random numbers (random cell numbers for each image) and assign it to a Location List array ****/
function randomNumber() {
  // Flush the array every time this function is called
  locationList = [];

  for (i = 1; i <= numberCells; i++) {
    var randomIdx = (Math.ceil(Math.random() * numberCells));

    j = 1;
    while (j <= locationList.length) {
      if (locationList[j] === randomIdx) {
        randomIdx = (Math.ceil(Math.random() * numberCells));

        j = 1;
      }
      else{
        j++;
      }
    }

    // Assign the generated random number to the Location List array
    locationList[i] = randomIdx;
  }
}


/**** Shuffle and assign images to each cell in html ****/
function shuffleImages(){
  console.log ('Shuffling Images.....');
  i = 0;
  j = 1;
  clickCount = 0;

  // Generate a random Location List
  randomNumber();

  i = 0;
  j = 1;
  while (i < numberImages) {
    // From the random numbers available in Location List array, assign cell locations to each image
    MemoryItem.allImages[i].loc1 = 'cell-' + locationList[j];
    MemoryItem.allImages[i].statusLoc1 = 'c';
    MemoryItem.allImages[i].loc2 = 'cell-' + locationList[j + 1];
    MemoryItem.allImages[i].statusLoc2 = 'c';
    MemoryItem.allImages[i].completed = 0;

    // Set the image source for the above cells and add onClick Event Listener
    document.getElementById(MemoryItem.allImages[i].loc1).src = cardDownImgPath;
    document.getElementById(MemoryItem.allImages[i].loc1).addEventListener('click', itemClick);

    document.getElementById(MemoryItem.allImages[i].loc2).src = cardDownImgPath;
    document.getElementById(MemoryItem.allImages[i].loc2).addEventListener('click', itemClick);
    i++;
    j = j + 2;
  }
  console.log ('MemoryItem.allImages:');
  console.log (MemoryItem.allImages);
}

function calcImgMatch (currentLoc, adjLoc, currObjID) {
  imgMatch[currentLoc] = 'd';
  if (clickCount % 2 === 0) {
    if (imgMatch[adjLoc] === 'd') {
      imgMatch.completed = 1;
      document.getElementById(currObjID).src = imgMatch.filepath;
      document.getElementById(currObjID).className += ' cardMatched';
      document.getElementById(prevClickID).className += ' cardMatched';
    }
    else {
      imgMatch[currentLoc] = 'c';
      prevImgMatch.statusLoc1 = 'c';
      prevImgMatch.statusLoc2 = 'c';
      document.getElementById(currObjID).className += ' notMatched';
      document.getElementById(prevClickID).className += ' notMatched';
    }
  }
  // Else for odd number
  else {
    document.getElementById(currObjID).src = imgMatch.filepath;
  }
  console.log('calcImgMatch function end imgMatch:', imgMatch);
}

function itemClick(event){
  //console.log('test', event.target);
  clickCount++;
  console.log('event id test:', this);
  console.log('Click Count =', clickCount);
  console.log('prevClickID before:', prevClickID);


  imgMatch = MemoryItem.allImages.find(item => item.loc1 === this.id);
  if (imgMatch !== undefined && imgMatch.completed === 0) {
    document.getElementById(this.id).src = imgMatch.filepath;
    calcImgMatch('statusLoc1', 'statusLoc2', this.id);
    prevImgMatch = imgMatch;
  }
  console.log('Array lookup loc1:', imgMatch);


  imgMatch = MemoryItem.allImages.find(item => item.loc2 === this.id);
  if (imgMatch !== undefined && imgMatch.completed === 0) {
    document.getElementById(this.id).src = imgMatch.filepath;
    calcImgMatch('statusLoc2', 'statusLoc1', this.id);
    prevImgMatch = imgMatch;
  }

  console.log('Array lookup loc2:', imgMatch);

  prevClickID = this.id;
  console.log('prevClickID after:', prevClickID);

  //close the images after certain time incase of incorrect picks
  setTimeout(function(){
    var clickedPics = document.getElementsByClassName('notMatched');
    for(var cp=0; cp<clickedPics.length; cp++){
      clickedPics[cp].src = cardDownImgPath;
    }
    while(clickedPics.length){
      clickedPics[0].classList.remove('notMatched');
    }
  }, 1000);
}
