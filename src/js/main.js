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

function handleClick(event) {
  const inputuservalue = inputUser.value;

if (inputuservalue.length===0){
  listOfShows.innerHTML=`<p class="alert">El campo enviado está vacio</p>`
}else{
  fetch('//api.tvmaze.com/search/shows?q=' + inputuservalue)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      series = data;
      displayList();
    });
  }
}
//función que depliega la lista de series
function displayList() {
  //hay que "limpiar" el contenido de la página cada vez que se recarge (o hagamos una nueva búsqueda)
  listOfShows.innerHTML = '';
  let printList = `<h2 class="subtitle"> Resultados de la busqueda </h2>`;
  //creamos un bucle para sacar la información que queremos de cada elemento del array (en este caso un titulo y una imagen)
  for (const eachData of series) {
    printList += `<li class="js-listitem eachitemlist" id="${eachData.show.id}">`;
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
  const serieHighlighted = series.find((eachData) => {
    return eachData.show.id === parseInt(myFavouriteShow);
  });
  //creamos un nuevo array donde meteremos los favoritos(la ponemos como global)
  //NOTA SUPER IMPORTANTE: .find devuelve el primer objeto que encuentra que cumpla esa condición (en este caso que el id sea igual al id del elemento clickado)el id al ser unico, no tiene que seguir buscando tras encontrar el primero.(serie.show.id===parseInt(myFavouriteShow, que contiene el valor del elemento clickado))
  
  //console.log(myFavouriteShow) <----nos devuelve el id del objeto clickado
  
  //console.log(serieHighlighted)  <-----nos devuelve el objeto clickado
  

  //
  const favouriteIsInVipSection= favourites.findIndex((eachItem) => {
    return eachItem.show.id === parseInt(myFavouriteShow);
  });
  console.log(favouriteIsInVipSection);
  if (favouriteIsInVipSection === -1) {
    favourites.push(serieHighlighted);
  }else{
    favourites.splice(favouriteIsInVipSection,1);
  }
  console.log(favourites);
  addFavouritesInVipSection();
 
}

//Ahora vamos a pintar las series favoritas en otra sección


function addFavouritesInVipSection() {
  let printVip=`<h2> Mis series favoritas </h2>`;
  for (const eachItem of favourites) {
    printVip += `<li class="js-listitem eachitemlist" id="${eachItem.show.id}">`;
    printVip += `<h4>${eachItem.show.name}</h4>`;
    if (eachItem.show.image === null) {
      printVip += `<img src="./assets/images/defaultimage.png" class="" alt="${eachItem.show.name} cover image">`;
    } else {
      printVip += `<img src="${eachItem.show.image.medium}" class="" alt="${eachItem.show.name} cover image">`;
    }
    printVip += `</li>`;
    favouriteIsFavourite(eachItem);
  } 
  const favouritesSection = document.querySelector('.js-favouritesection');
  favouritesSection.innerHTML= printVip;
  
}

//Par guardar esa lista de favoritos en el local (y que no se borren los favoritos al recargar) hay que: 1) Checkear que la serie (el li) es un favorito o no. 2) Añadirle una clase para diferenciarlos del resto de series NO favoritas 
 function favouriteIsFavourite(eachData){
  const favouriteFound= favourites.find((eachItem) =>{
    
    return eachItem.show.id === eachData.show.id;
  })
 
  if (favouriteFound===undefined){
    return false
    
  }else{
    return true
  }
 
}  

searchButton.addEventListener('click', handleClick);
formOfShows.addEventListener('submit', preventDefault);
