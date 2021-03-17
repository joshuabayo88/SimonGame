  var buttonColours = ["red", "blue", "green", "yellow"];
  var gamePattern = [];
  var userClickedPattern = [];

  //You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
  var started = false;

  //2. Create a new variable called level and start at level 0.
  var level = 0;

  $(document).keypress(function(){
    if (!started) {

      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " +level);
      nextSequence();
      started = true;
    }
  });

  $(".btn").click(function(){

  // Storing Chosen Colour
  var userChosenColour = $(this).attr("id");

  // Add the contents of the userChosenColour to the end of the new userClickedPattern
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

  });

  function nextSequence(){

    userClickedPattern = [];

    //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " +level);

  var randNum = Math.floor(Math.random()*3);
  var randomChosenColour = buttonColours[randNum];
  gamePattern.push(randomChosenColour);

  // Animate using fade method
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  }

  // Play sound
  function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
  }

  function checkAnswer(currentLevel){
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }


    } else {
        console.log("Wrong!");

        //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong");

        //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();


    }
  }
    function startOver(){
      level = 0;
      started = false;
      gamePattern = [];
    }
