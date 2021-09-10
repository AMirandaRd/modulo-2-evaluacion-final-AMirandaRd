'use strict';

const inputUser = document.querySelector('.js-input');
const searchButton = document.querySelector('.js-button');
const listOfShows = document.querySelector('.js-result');
const formOfShows = document.querySelector('.js-form');
let shows = [];


function handleClick() {
  const inputuservalue = inputUser.value;
  fetch('//api.tvmaze.com/search/shows?q=' + inputuservalue)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      shows = data;
      displayList();
    });
}
//función que depliega la lista de series
function displayList() {
  //hay que "limpiar" el contenido de la página cada vez que se recarge (o hagamos una nueva búsqueda)
  listOfShows.innerHTML = '';
  let printList = '';
  //creamos un bucle para sacar la información que queremos de cada elemento del array (en este caso un titulo y una imagen)
  for (const eachData of shows) {
    printList += `<li class="js-listitem" id="${eachData.show.id}">`;
    printList += `<h3>${eachData.show.name}</h3>`;

    if (eachData.show.image === null) {
      //si la serie que aparece en la lista no tiene imagen, se le pondrá una por defecto.
      printList += `<img src="./assets/images/defaultimage.png" class="" alt="${eachData.show.name} cover image">`;
    } else {
      //si contiene una imagen, muestramela.
      printList += `<img src="${eachData.show.image.medium}" class="" alt="${eachData.show.name} cover image">`;
    }
    //printList += `<img src="${eachData.show.image.medium}" alt="${eachData.show.name} cover image">`;
    printList += `</li>`;
  }
  listOfShows.innerHTML = printList;
  handleListItem();
}


function handleListItem(){
  const showList =document.querySelectorAll('.js-listitem');
  for (const showListElement of showList){
    showListElement.addEventListener('click', handleEachShow);

  }

}
function preventDefault(event) {
  event.preventDefault();
}

searchButton.addEventListener('click', handleClick);
formOfShows.addEventListener('submit', preventDefault);
