var block = document.getElementById("block");
var hole = document.getElementById("hole");
var game = document.getElementById("game");
var g_over = document.getElementById("g-over");
var score = document.getElementById("score");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;
let interG;


function start() {
    g_over.style.display = 'none';

    hole.addEventListener('animationiteration', () => {
        var random = -((Math.random()*300)+150);
        hole.style.top = random + "px";
        counter++;
    });

    if(!interG) {
        interG = setInterval(function(){
            var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            if(jumping==0){
                character.style.top = (characterTop+2)+"px";
            }
            var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
            var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
            var cTop = -(500-characterTop);
            if((characterTop>480)||((blockLeft<20)&&(blockLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+130)))){
                console.log(counter);
                gameOver(counter);
                character.style.top = 100 + "px";
                counter=0;
            }
        },10);
    }
}

function gameOver(counter) {
    g_over.style.display = 'block';
    
    score.innerHTML = (parseInt(counter) -1);
    clearInterval(interG);
    interG = null;
}

function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<15)){
            character.style.top = (characterTop-2)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);

}

document.body.addEventListener('click', start);
game.addEventListener('click', jump);
