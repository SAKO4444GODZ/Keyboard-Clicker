// 
//TODO: 
//All Done!
//

var score = 0;
var keyLevel = 1;
var prestigeMult = 1;

//ensures that all numbers on the screen match the variables
refreshNumbers();

onEvent("start_game_btn", "click", function(event) {
  setScreen("game_screen");
  refreshNumbers();
});

onEvent("keep_playing_btn", "click", function(event) {
  goToGameScreen();
});

onEvent("prestige_btn", "click", function(event) {
  goToGameScreen();
  resetGame(1);
});

onEvent("reset_game_btn", "click", function(event) {
  goToGameScreen();
  resetGame(0);
});

onEvent("reset_choose_btn", "click", function(event) {
  goToReset();
});

onEvent("choose_btn", "click", function(event) {
  goToReset();
  setScreen("are_you_sure_screen");
});

onEvent("game_screen", "keydown", function(event) {
  var label = "Key: " + event.key;
  setText("key_label", label);
  score += Math.pow(keyLevel, 2)  * prestigeMult * randomNumber(1, 10);
  refreshNumbers();
});

onEvent("upgrade_button", "click", function(event) {
  if (score>=(10 * (Math.pow(keyLevel, 2)))) {
    keyLevel ++;
    refreshNumbers();
  } else {
    prompt("Too expensive! (press)");
  }
  
});

//takes you to the reset screen
function goToReset() {
  setScreen("are_you_sure_screen");
  refreshNumbers();
}

//resets the game, if the "prestige" parameter is set to 1, then it will increase the prestige multiplier based on
//the player's score and level
function resetGame(prestige) {
  if (prestige==1) {
    prestigeMult = 1 + ((score/10000000)*keyLevel);
    resetVariables(0);
  } else {
    resetVariables(1);
  }
  refreshNumbers();
}

//resets the score and keyLevel variables to default values, unless the parameter "wipe" is 1, 
//in which case the prestige multiplier also resets to the default value
function resetVariables(wipe) {
  if (wipe==1) {
    prestigeMult = 1;
  }
  score = 0;
  keyLevel = 1;
}

//updates numbers on screen(s)
function refreshNumbers() {
  setText("score_label", score);
  setText("key_level_label", keyLevel);
  setText("prestige_mult_label", prestigeMult);
  if (score>=1000000) {
    setScreen("win_screen");
    
  }
  
}

//sends player back to the game screen
function goToGameScreen() {
  setScreen("game_screen");
  refreshNumbers();
}
