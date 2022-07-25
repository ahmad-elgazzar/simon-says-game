var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function start() {
    $(document).one("keydown", function() {
        nextSequence();
    });
}

start();

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor;
    userClickedPattern = [];
    switch (randomNumber) {
        case 0:
            randomChosenColor = buttonColors[0];
            break;
        case 1:
            randomChosenColor = buttonColors[1];
            break;
        case 2:
            randomChosenColor = buttonColors[2];
            break;
        case 3:
            randomChosenColor = buttonColors[3];
            break;
        default:
            break;
    }
    gamePattern.push(randomChosenColor);
    $("." + randomChosenColor).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();
    level++;
    $("#level-title").text("Level " + level);
}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor)
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(colorName) {
    var audio = new Audio("sounds/" + colorName + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(() => {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
                
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    start();
}

