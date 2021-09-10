'use strict';

const inputUser = document.querySelector('.js-input');
const searchButton = document.querySelector('.js-button');
const listOfShows = document.querySelector('.js-result');
const formOfShows = document.querySelector('.js-form');
let series = [];
let favourites = [];

function preventDefault(event) {
  event.preventDefault();
}

function handleClick() {
  const inputuservalue = inputUser.value;
  fetch('//api.tvmaze.com/search/shows?q=' + inputuservalue)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      series = data;
      displayList();
    });
}
//función que depliega la lista de series
function displayList() {
  //hay que "limpiar" el contenido de la página cada vez que se recarge (o hagamos una nueva búsqueda)
  listOfShows.innerHTML = '';
  let printList = '';
  //creamos un bucle para sacar la información que queremos de cada elemento del array (en este caso un titulo y una imagen)
  for (const eachData of series) {
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
  //llamamos al siguiente paso
  handleListItem();
}

//Identificamos cada item clickado
function handleListItem() {
  const showsList = document.querySelectorAll('.js-listitem');
  for (const showsListElement of showsList) {
    //console.log(showsListElement);
    showsListElement.addEventListener('click', handleEachSerie);
  }
}
//Ahora cada vez que haga click en una serie, quiero que se cambie el color

function handleEachSerie(event) {
  const selectedShow = event.currentTarget;
  selectedShow.classList.toggle('colorVIP');
  const myFavouriteShow = event.currentTarget.id;
  const serieHighlighted = series.find((serie) => {
    return serie.show.id === parseInt(myFavouriteShow);
  });
  //NOTA SUPER IMPORTANTE: series.find({serie =>}) nos da EL OBJETO completo a través de la búsqueda que pedimos (en este caso buscará el objeto con el id de la serie que coincida o sea igual al id de la serie seleccionada por el usuario, pero find nos devuelve EL OBJETO COMPLETO )

  //creamos un nuevo array donde meteremos los favoritos(la ponemos como global)

  //
  const favouriteIsFavourite = favourites.findIndex((favourite) => {
    return favourite.id === myFavouriteShow;
  });
  console.log(favouriteIsFavourite);
  if (favouriteIsFavourite === -1) {
    favourites.push(serieHighlighted);
  }else{
    favourites.splice(favouriteIsFavourite,1);
  }
  //console.log(favourites);
  addFavouritesInVipSection();
}

//Ahora vamos a pintar las series favoritas en otra sección


function addFavouritesInVipSection() {
  let printVip=`<h3> Mis series favoritas </h3>`;
  for (const eachItem of favourites) {
    printVip += `<li class="js-listitem eachitemlist" id="${eachItem.show.id}">`;
    printVip += `<h4>${eachItem.show.name}</h4>`;
    if (eachItem.show.image === null) {
      printVip += `<img src="./assets/images/defaultimage.png" class="" alt="${eachItem.show.name} cover image">`;
    } else {
      printVip += `<img src="${eachItem.show.image.medium}" class="" alt="${eachItem.show.name} cover image">`;
    }
    printVip += `</li>`;

  }
  const vipSection = document.querySelector('.js-favouriteshows');
  vipSection.innerHTML= printVip;
}


searchButton.addEventListener('click', handleClick);
formOfShows.addEventListener('submit', preventDefault);
