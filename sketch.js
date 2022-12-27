// sketch.js
// Author = Joseph Manfredi Cameron
// Touch-Free Museum Quiz Exhibit Main JavaScript File

// Serial Variables
let serial;
// This corresponds to the computer this is running on
let portName = '/dev/tty.usbmodem14201';
let inData;

// Canvas variables
let canvas;
const canvasWidth = 640;
const canvasHeight = 480;

// ml5 handpose finger counter variables
let hands = [];
let fingerCount = 0;
let fingerLengths = [];

// Countdown Timer
let countdownTimer = 5;

// State Booleans
let welcome = false;
let countdown = false;
let quizActive = false;
let quizOver = false;

// Selection
let selection = 0;
let lockedSelection = false;

// ---------------
// NEW

let currentQuestion = {};
let currentQuestionIndex = 0;
let questionsArray = [];
let currentScore = 0;
let currentResult = 'waiting';
let visualFeedback;
let questionOptions = [];
// ---------------

function setup() {

  // Serial setup
  // This corresponds to the computer this is running on
  serial = new p5.SerialPort('138.251.249.106');
  serial.on('data', serialEvent);
  serial.open(portName);

  // Show the welcome screen first
  showWelcomeScreen();

  // Load question data
  loadJSON("questions.json", loadQuestionData);

  // Create canvas
  canvas = createCanvas(640, 480);

  // Always centre-align text
  textAlign(CENTER);

  console.log('ml5 version:', ml5.version);

  // Video setup
  video = createCapture(VIDEO);
  video.size(width, height);
  handpose = ml5.handpose(video, () => {
    console.log("Handpose Model Loaded");
  });
  handpose.on("hand", results => {
    hands = results;
  });
  video.hide();
}

function serialEvent() {
  inData = Number(serial.read());
}

function draw() {

  // Light-Yellow background
  background(255,250,205);

  if (welcome) {

    textSize(30);
    textFont('Helvetica');
    textStyle(BOLD);
    text("Touch-Free Museum Quiz Exhibit!", width/2, 60);
    textFont("Georgia");
    textStyle(NORMAL);
    textSize(14);
    text("Hold up 1 finger for option 1, 2 fingers for option 2 etc...", width/2, height - 20);
    textSize(20);
    text("Hover your hand over the sensor to begin the quiz...", width/2, height/2);

    if (inData > 50) {
      showCountdown();
    }

  } else if (countdown) {

    if (countdownTimer > 3) {
      text("The quiz will begin in...", width/2, height/2);
    } else {
      text(countdownTimer, width/2, height/2);
    }

    // Show a countdown
    if ((frameCount % 15 == 0) && (countdownTimer > 0)) {
      countdownTimer--;
    } else if (countdownTimer == 0) {
      countdownTimer = 5;
      startQuiz();
    }

  } else if (quizActive) {

    // Finger count resets to zero
    fingerCount = 0;

    // lengths array also resets
    fingerLengths = [];

    // Gets real-time count of fingers held up
    for (let i = 0; i < hands.length; ++i) {
      const hand = hands[i];
      for (let key in hand.annotations) {
        if (hand.annotations.hasOwnProperty(key)) {
          fingerLengths.push(getDigit(hand.annotations[key]));
        }
      }
    }
    fingerCount = countFingers(fingerLengths);

    // Show finger count
    //text(fingerCount, 100, 60);
    //text("Selection Made = " + selection, 100, 80);
    //text(inData, 100, 100);

    // Draw current score
    text("Correct Answers: " + currentScore + "/5", (canvasWidth / 2), 30);

    // Draw the question text
    drawQuestion();

    // Draw question options
    if (questionOptions.length > 0) {
      // Show selection
      if (fingerCount == 1) {
        questionOptions[0].highlight();
        questionOptions[1].lowlight();
        questionOptions[2].lowlight();
        questionOptions[3].lowlight();
        selection = 1;
      } else if (fingerCount == 2) {
        questionOptions[0].lowlight();
        questionOptions[1].highlight();
        questionOptions[2].lowlight();
        questionOptions[3].lowlight();
        selection = 2;
      } else if (fingerCount == 3) {
        questionOptions[0].lowlight();
        questionOptions[1].lowlight();
        questionOptions[2].highlight();
        questionOptions[3].lowlight();
        selection = 3;
      } else if (fingerCount == 4) {
        questionOptions[0].lowlight();
        questionOptions[1].lowlight();
        questionOptions[2].lowlight();
        questionOptions[3].highlight();
        selection = 4;
      }
      for (let questionOption of questionOptions) {
        questionOption.show();
      }
    }

    // Lock selection when photo transistor is sensing less light
    if ((inData > 50) && (!lockedSelection)) {
      selectionMade(selection);
    }

    // Only show result after selection
    if (currentResult != "waiting") {
      visualFeedback.grow();
      visualFeedback.show();
    }

  } else if (quizOver) {
    // Show score for a few seconds before returning to welcome screen
    textStyle(BOLD);
    text("Final Score = " + currentScore + "/5", canvasWidth/2, canvasHeight/2);
    textStyle(NORMAL);
    text("Taking you back to the welcome screen shortly...", canvasWidth/2, (canvasHeight/2) + 30);
    setTimeout(() => { showWelcomeScreen(); }, 5000);
  }

}

// Change state of quiz to the welcome screen
function showWelcomeScreen() {
  serial.write('c');
  countdown = false;
  quizActive = false;
  quizOver = false;
  welcome = true;
}

// Change state of quiz to the countdown screen
function showCountdown() {
  welcome = false;
  quizActive = false;
  quizOver = false;
  countdown = true;
}

// Change state of quiz to start the quiz
function startQuiz() {
  currentScore = 0;
  currentQuestionIndex = 0;
  selection = 0;
  currentQuestion = questionsArray[currentQuestionIndex];
  drawQuestionOptions(currentQuestion);
  welcome = false;
  countdown = false;
  quizOver = false;
  quizActive = true;
}

// Change state of quiz to the quiz over screen
function showFinalScore() {
  welcome = false;
  countdown = false;
  quizActive = false;
  quizOver = true;
}

// Load the question data
function loadQuestionData(data) {
  for (let q of data.questions) {
    let questionObject = new question(q.questionID, q.questionText, q.questionAnswers);
    questionsArray.push(questionObject);
  }
  currentQuestion = questionsArray[currentQuestionIndex];
  drawQuestionOptions(currentQuestion);
}

// Draw the question text
function drawQuestion() {
  push();
  textSize(24);
  fill(0);
  text((currentQuestion.questionID+1) + ". " + currentQuestion.questionText, (canvasWidth/2), (canvasHeight * 0.25));
  pop();
}

// Get the next question
function nextQuestion() {
  lockedSelection = false;
  selection = 0;
  currentQuestionIndex++;
  if (currentQuestionIndex < questionsArray.length) {
    currentQuestion = questionsArray[currentQuestionIndex];
    drawQuestionOptions(currentQuestion);
  } else {
    showFinalScore(); // Display quiz over screen
  }
}

// Draw the 4 options for each question
function drawQuestionOptions(question) {
  questionOptions = [];
  createOptions(question.questionAnswers);
}

// Create the options
function createOptions(answers) {
  let optionYPosition = 0;
  for (let answer of answers) {
    let option = new quizOption(((optionYPosition+1) + ". " + answer.text), answer.correct, 10, ((canvasHeight/2)-30) + (optionYPosition * ((canvasHeight/10)+10)), (canvasWidth-20), 48);
    questionOptions.push(option);
    optionYPosition++;
  }
}

// Call this when selection has been made
function selectionMade(selection) {
  lockedSelection = true;
  if (questionOptions.length > 0) {
    if (selection == 1) {
      checkAnswer(questionOptions[0].tag);
    } else if (selection == 2) {
      checkAnswer(questionOptions[1].tag);
    } else if (selection == 3) {
      checkAnswer(questionOptions[2].tag);
    } else if (selection == 4) {
      checkAnswer(questionOptions[3].tag);
    } else {
      lockedSelection = false;
    }
  }
}

// Check if answer is correct or not
function checkAnswer(tag) {
  if (tag) {
    currentResult = "yes";
    visualFeedback = new response(tag, canvasWidth, canvasHeight);
    currentScore++;
    // Write to Arduino through serial
    // Lets arduino play the correct tone
    serial.write('a');
    serial.write(currentQuestionIndex);
  } else {
    currentResult = "no";
    visualFeedback = new response(tag, canvasWidth, canvasHeight);
    // Write to Arduino through serial
    // Lets arduino play the incorrect tone
    serial.write('b');
  }
  setTimeout(() => { nextQuestion(); }, 1000); // Leave a second between questions
}

// --------------------------------------------------------------------------
// These functions are here to also enable classic interaction with the mouse
// In case the user does not wish to/is not able to interact with hands etc.

function mouseMoved() {
  if (quizActive) {
    let pointer = createVector(mouseX, mouseY);
    for (let option of questionOptions) {
      if (option.contains(pointer)) {
        option.highlight();
      } else {
        option.lowlight();
      }
    }
  }
}

function mousePressed() {
  if (quizActive) {
    let pointer = createVector(mouseX, mouseY);
    for (let option of questionOptions) {
      if (option.contains(pointer)) {
        checkAnswer(option.tag);
      }
    }
  } else if (welcome) {
    showCountdown();
  }
}
