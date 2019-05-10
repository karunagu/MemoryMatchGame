
//Search
'use strict';

Result.allResults = [];
var table = document.getElementById('displayResult'); //Get

//Result object
function Result(name, clickCount, datePlayed) {
  this.name = name;
  this.clickCount = clickCount;
  this.datePlayed = datePlayed;
  Result.allResults.push(this);
}
function getResults() {
  //retrieve results already stored
  var storageResults = localStorage.getItem('memorygame.results');
  if (storageResults) {
    Result.allResults = JSON.parse(storageResults);
  }
}
//display the results in table rows
function render() {
  for (var i = 0; i < Result.allResults.length; i++) {
    var newRow = document.createElement('tr');
    var eachElement = Result.allResults[i];
    newRow.innerHTML = `<td> ${eachElement.name} </td> <td> ${eachElement.clickCount} </td> <td> ${eachElement.datePlayed} </td>`;
    table.appendChild(newRow);

  }
}
function compare(a, b) {
  var aClickcount = parseInt(a.clickCount);
  var bClickcount = parseInt(b.clickCount);
  if (a.clickCount < b.clickCount) return -1;
  if (b.clickCount < a.clickCount) return 1;

  return 0;
}


getResults();
Result.allResults.sort(compare);
render();

console.log('end here');

