var gamepattern = [];
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var userClickedpattern = [];
var level=0;
var started = false;

$(document).keydown(function(){
    if(started==false){
        $('h1').text('Level ' + level);
        nextSequence();
        started = true;
    }
   
});


$('.btn').click(function(){
    var userChosenColour = $(this).attr('id');
    userClickedpattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkClick(userClickedpattern.length-1);
});

function nextSequence() {
    userClickedpattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamepattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function checkClick(currentLevel) {
    if (userClickedpattern[currentLevel] == gamepattern[currentLevel]){
       console.log('correct');
       if (userClickedpattern.length === gamepattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound('wrong');
      $('body').addClass('game-over');
      setTimeout(function () {
        $('body').removeClass('game-over');;
      }, 200);
      $('h1').text("GAME OVER, press any key to restart");
      startOver();

    }
}

function startOver() {
    level=0;
    gamepattern = [];
    started=false;
    
}
