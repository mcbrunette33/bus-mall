'use strict';

//Global Vars
let votingRounds = 5;
let itemArray = [];

//Dom Ref
let imgContainer =document.getElementById('container');
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');

// let resultsButton = document.getElementById('view-results-button');
// let resultsList = document.getElementById('display-results-list');

let ctx = document.getElementById('myChart').getContext('2d');


// console.log('parsed Items >>>', parsedItems);

function Item (name, fileExtension = 'jpg'){
  this.itemName = name;
  this.image = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  
  itemArray.push(this);
}
let retrievedItems = localStorage.getItem('item');

let parsedItems = JSON.parse(retrievedItems);
console.log(parsedItems);
if(retrievedItems){
  itemArray = parsedItems;
}else{

  new Item('bag');
  new Item('banana');
  new Item('bathroom');
  new Item('boots');
  new Item('breakfast');
  new Item('bubblegum');
  new Item('chair');
  new Item('cthulhu');
  new Item('dog-duck');
  new Item('dragon');
  new Item('pen');
  new Item('pet-sweep');
  new Item('scissors');
  new Item('shark');
  new Item('sweep', 'png');
  new Item('tauntaun');
  new Item('unicorn');
  new Item('water-can');
  new Item('wine-glass');
}

console.log(itemArray);

function getRandomIndex(){
  return Math.floor(Math.random()* itemArray.length);

}
//ask if this is right
function renderImgs(){
  let itemOneIndex = getRandomIndex();
  let itemTwoIndex = getRandomIndex();
  let itemThreeIndex = getRandomIndex();

  while(itemOneIndex === itemTwoIndex || itemOneIndex === itemThreeIndex){
    itemOneIndex = getRandomIndex();
  }
  while(itemTwoIndex === itemThreeIndex || itemTwoIndex === itemOneIndex){
    itemTwoIndex = getRandomIndex();
  }
  imgOne.src = itemArray[itemOneIndex].image;
  imgOne.alt = itemArray[itemOneIndex].itemName;
  itemArray[itemOneIndex].views++;

  imgTwo.src = itemArray[itemTwoIndex].image;
  imgTwo.alt = itemArray[itemTwoIndex].itemName;
  itemArray[itemOneIndex].views++;

  imgThree.src = itemArray[itemThreeIndex].image;
  imgThree.alt = itemArray[itemThreeIndex].itemName;
  itemArray[itemThreeIndex].views++;

}

renderImgs();

function renderChart(){
  let itemNames = [];
  let itemVotes = [];
  let itemViews = [];

  for (let i = 0; i < itemArray.length; i++) {
    itemNames.push(itemArray[i].itemName);
    itemVotes.push(itemArray[i].clicks);
    itemViews.push(itemArray[i].views);
  }
  let myChartObj = {
    type: 'bar',
    data: {
      labels: itemNames,
      datasets: [{
        label: '# of Votes',
        data: itemVotes,
        backgroundColor: [
          'yellow'
        ],
        borderColor: [
          'pink'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: itemViews,
        backgroundColor: [
          'green'
        ],
        borderColor: [
          'pink'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 35
            }
          }
        }
      }
    }
  };
  const myChart = new Chart(ctx, myChartObj);
}

function handleClick(event){
  let imgClicked = event.target.alt;

  for(let i = 0; i < itemArray.length; i++){
    if(imgClicked === itemArray[i].itemName){
      itemArray[i].clicks++;
    }

  }
  //got this from the example, short of confused still
  votingRounds--;
  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleClick);
    renderChart();
    let stringifiedItems = JSON.stringify(itemArray);
    localStorage.setItem('items', stringifiedItems);
    return;
  }
  renderImgs();

}

// function handleViewResults(){
//   if(votingRounds === 0){
//     for(let i = 0; i < itemArray.length; i++){
//       let li = document.createElement('li');

//       li.textContent = `${itemArray[i].itemName} was viewed ${itemArray[i].views} times and clicked on ${itemArray[i].clicks} times.`;
//       resultsList.appendChild(li);
//     }
//   }
// }
imgContainer.addEventListener('click', handleClick);
