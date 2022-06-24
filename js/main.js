window.addEventListener('offline', e=> {
    document.getElementById('header').style.backgroundColor = "lightcoral";
    document.getElementById('offM').style.display = 'block';
})

window.addEventListener('online', e=> {
    document.getElementById('header').style.backgroundColor = "transparent";
    document.getElementById('offM').style.display = 'none';
})

window.onload = function() {
    if(!navigator.onLine){
        document.getElementById('header').style.backgroundColor = "lightcoral";
        document.getElementById('offM').style.display = 'block';
    }
}

// --------------------------------------------------------------//

const btn_home = document.getElementById('btn-home');
const input_home = document.getElementById('input-home');

const card_home = document.getElementById('card-home');
const img_home = document.getElementById('img-home');
const name_home = document.getElementById('name-home');
const id_home = document.getElementById('id-home');
const more_home = document.getElementById('more-home');
const race_home = document.getElementById('race-home');

const fav_star = document.createElement('img');
fav_star.src = 'imgs/fav.png';
const favs_home = document.getElementById('favs-home');
const favs_cards = document.getElementById('favs-cards'); 

let inputVal;


let queryContructor = (personaje) => `
query {
  characters(filter: { name: "${personaje}"} ) {
    results {
      id
      name
      species
      image
      status
    }
  }
}
`;

btn_home.addEventListener('click', all);

input_home.addEventListener('keypress', (e)=>{
    if(e.keyCode === 13) {
        e.preventDefault();
        all();
        input_home.value = '';
    }
    
})

function all() {
    inputVal = input_home.value;
    character(inputVal);
}

    function character(inputValue) {

        const ops = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: queryContructor(inputValue)
            })
        }

        fetch('https://rickandmortyapi.com/graphql', ops)
            .then(function(response){
                return response.json();
            }).then(function(json){
                //name_home.innerHTML = JSON.stringify(json.data);
                theName(json.data);
                agregarDisabled();
            }).catch(function(json){
                errorUD();
                agregarDisabled();
            })
}

function theName(data) {
    name_home.innerHTML = data.characters.results[0].name;
    id_home.innerHTML = data.characters.results[0].id;
    more_home.innerHTML = data.characters.results[0].status;
    race_home.innerHTML = data.characters.results[0].species;
    img_home.src = data.characters.results[0].image;
} 


function errorUD() {
    name_home.innerHTML = 'Ups hay un problem...';
    race_home.innerHTML = '...';
    more_home.innerHTML = 'El individuo al que buscas no se ha encontrado, intenta buscarlo con otro nombre';
    img_home.src = 'imgs/idk.gif';
}

function agregarDisabled() {
    if(name_home.innerHTML=='Snuffles' || name_home.innerHTML=='Ups hay un problem...') {
        favs_home.classList.add("d-none");
    } else {
        favs_home.classList.remove("d-none");
    }
}

agregarDisabled();

//////////////////////////////////////////////////////////////////////

var db;

function init() {
    db = new Dexie('laPwa');
    row = favs_cards.firstElementChild;
    
    document.body.addEventListener('submit', addFav);

    db.version(1).stores({fav: '_id'});
    db.open();
}

function addFav(e) {
    
    e.preventDefault();

    db.fav.add({text: name_home.innerHTML, _id: id_home.innerHTML, img: img_home.src})
    .then(function(){
        name_home.appendChild(fav_star);
    });
}



init();