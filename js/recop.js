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

const btn_recop = document.getElementById('btn-recop');
const input_recop = document.getElementById('episode');
const details_recop = document.getElementById('details-recop');
const li = document.getElementById('ini-details');
const li2 = li.nextElementSibling;
const li3 = li2.nextElementSibling;
const li4 = li3.nextElementSibling;
const li5 = li4.nextElementSibling;

let queryContructorEp = (ep) => `
query {
    episode( id: ${ep} ) {
        id
        name
        episode
        air_date
    }
  }
`;

let inputEp;

btn_recop.addEventListener('click', ()=>{
    inputEp = input_recop.value;
    episodes(inputEp);   
})

function episodes(epi) {
    const ops = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: queryContructorEp(epi)
        })
    }

    fetch('https://rickandmortyapi.com/graphql', ops)
        .then(function(response){
            //console.log('el json: ', response);
            return response.json();
        }).then(function(json){
            detalles(json.data);
        }).catch(function(err){
            console.log('algo falló crack', err);
        })
}



function detalles(data) {
console.log(data);

    li.innerHTML += data.episode.episode;
    li2.innerHTML += data.episode.id;
    li3.innerHTML += data.episode.name;
    li4.innerHTML += data.episode.air_date;
    
    
}