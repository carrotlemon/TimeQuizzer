window.onload = () => {
  const canvas = document.getElementById("canvas");
  const textbox = document.getElementById("text");
  const resetButton = document.getElementById("resetButton");
  const DEBUG = false; // shows correct time
  const SHOWTICKS = true;

  if (!canvas.getContext) {
    console.error("Canvas not supported");
    return;
  }

  const ctx = canvas.getContext("2d");
  let inputText = "helo world!"; // Default text

  function updateCanvas() {
    // Clear canvas
    ctx.beginPath();
    ctx.fillStyle = "#daffc2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Clock
    ctx.fillStyle = "#d5a6ff";
    ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI);
    ctx.fill();
    

    // Draw Ticks
    if(SHOWTICKS) {
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.fillStyle = "black";
      for(let i = 0; i < 12; ++i) {
        if(i % 3 == 0) {
          ctx.fillRect(87, -3, 10, 3);
        } else {
          ctx.fillRect(92, -3, 5, 3);
        }
        ctx.rotate(Math.PI/6);
      }
      ctx.restore();
    }

    // Draw Hands
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    let hrAngle = 2 * Math.PI * (((hours%12)/12)+(minutes/60/12)) - Math.PI/2, minAngle = 2 * Math.PI * (minutes/60) - Math.PI/2;
    ctx.rotate(hrAngle);
    ctx.fillStyle = "black"; // hour hand
    ctx.fillRect(-3, -3, 60, 6);
    ctx.fillStyle = "gray"; // minute hand
    ctx.rotate(minAngle - hrAngle);
    ctx.fillRect(-3, -3, 90, 6);
    ctx.restore();

    // ctx.fillStyle = "red";
    // ctx.arc(canvas.width/2, canvas.height/2, 5, 0, 2*Math.PI);
    // ctx.fill();

    // Show Score
    ctx.fillStyle = "black";
    ctx.font = "24px serif";
    ctx.fillText("Score: " + score, 10, 20);

    // Show Time
    if(DEBUG) {
      ctx.fillStyle = "black";
      ctx.font = "24px serif";
      ctx.fillText(hours + ":" + minutes, 10, 40);
    }

    requestAnimationFrame(updateCanvas);
  }

  let hours = parseInt(Math.random() * 12)+1, minutes = 15 * (parseInt(Math.random() * 3));
  minutes = String(minutes).padStart(2, "0");
  let score = 0;
  textbox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission if inside a form
      
      inputValue = textbox.value.trim(); // Get input value
      if (inputValue) {
        inputText = inputValue;
        console.log("Submitted:", inputValue); // Log the input (replace this with your actual submission logic)
      }

      textbox.value = ""; // Reset textbox

      // Increment score if the time entered is correct and indicate a mistake otherwise
      if (inputValue.length == 4 && inputValue.substring(0, 2) == hours && inputValue.substring(2, 4) == minutes ||
        // CORRECT
        inputValue.length == 3 && inputValue.substring(0, 1) == hours && inputValue.substring(1, 3) == minutes ||
        inputValue.length <= 2 && inputValue == hours && minutes == 0) {
        score++;
        const correctSound = new Audio('../resources/correctDing.mp3');
        correctSound.play();
      } else {
        // INCORRECT
        const incorrectSound = new Audio('../resources/incorrectDing.wav');
        incorrectSound.play();
      }
      hours = parseInt(Math.random() * 12)+1;
      minutes = 15 * (parseInt(Math.random() * 3));
      minutes = String(minutes).padStart(2, "0");
      requestAnimationFrame(updateCanvas);
    }
  });

  resetButton.addEventListener('click', function() {
    score = 0;
    requestAnimationFrame(updateCanvas);
  });

  // Start the draw loop
  updateCanvas();
};

function enterTime(inputTime) {

}