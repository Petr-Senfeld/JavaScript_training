//number to guess variable to store the number
  var randomNumber = Math.floor(Math.random() * 100) + 1;
  //document.getElementById("numberToGuess").textContent = "Hádané číslo je: " + randomNumber;
  
  var guess_count = 1; //guess count
  var form = document.querySelector(".form");
  var lowOrHigh = document.querySelector(".lowOrHigh");
  var game_over = document.getElementById("reset").disabled = true;
  var over = document.getElementById("gameOver");
  var guesses = document.getElementById("guesses");
  var last_result = document.getElementById("lastResult");
  var winning_number = document.getElementById("winning_number");
  var helpButton = document.getElementById("button_help");
  var hint = document.getElementById("hint");

  // Hit "enter" instead of clicking
  addEventListener("keyup", function(event){
      if(event.keyCode === 13) {
          event.preventDefault();
          document.getElementById("button_play").click();
        }
  });
  addEventListener("keyup", function(event){
        if(event.keyCode === 107){
            event.preventDefault();
            document.getElementById("reset").click();
        }
   });

  // focus on form
  form.focus();

  //reset the game
  function reset() {
    guess_count = 1;
    lowOrHigh.textContent = "";
    over.textContent = "";
    guesses.textContent = "";      
    document.getElementById("button_play").disabled = false;
    document.querySelector(".form").disabled = false;
    randomNumber = Math.floor(Math.random() * 10) + 1;
    last_result.textContent = "";
    winning_number.textContent ="";   
    form.focus();
    document.getElementById("reset").disabled = true;
    hint.textContent = "";
  }

  function play() {
        //user input  
        var a = Number(document.getElementById("user_input").value); 
        // user input
        last_result.textContent = "Tvoje poslední hádané číslo je: " + a; 

        //low or high
        if(a === randomNumber) {
            lowOrHigh.textContent = "Jsi borec " + a + " je správně!";
            lowOrHigh.style.backgroundColor = "Yellow";
            document.getElementById("button_play").disabled = true;
            document.querySelector(".form").disabled = true;
            document.getElementById("reset").disabled = false;
        }
        // number of guess counts left
        else if(guess_count === 3) {
            over.textContent = "KONEC HRY BRO";
            over.style.backgroundColor = "red";
            winning_number.textContent = "Číslo k uhodnutí bylo: " + randomNumber;
            document.getElementById("button_play").disabled = true;
            document.getElementById("user_input").disabled = true;
            document.getElementById("reset").disabled = false;
        }
        else{
            if(a > randomNumber){
                document.getElementById("lowOrHigh").textContent = a + " je hodně kámo...";
                lowOrHigh.style.backgroundColor = "Pink";
            }
            else if(a < randomNumber) {
                document.getElementById("lowOrHigh").textContent = a + " je málo kámo...";
                lowOrHigh.style.backgroundColor = "Orange";
          }
        }
        guesses.textContent = "Počet pokusů: " + guess_count;
        guess_count++;
        document.querySelector(".form").value = "";
        form.focus(); 
    }
      // help button 
  function hintButton() {
      if(guess_count  === 1){
            hint.textContent = "Pětina hádaného čísla je: " + (randomNumber / 5);
      }
      else if(guess_count < 3){
            hint.textContent = "Třetina hádaného čísla je: " + (randomNumber / 3);
      }
      else{
          hint.textContent = "Polovina hádaného čísla je: " + (randomNumber / 2);
      }
}
