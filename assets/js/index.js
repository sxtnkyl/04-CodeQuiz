let timerEl = $("#timer");
let actionBlock = $("#action-block");

//time = score
let timeLeft = 60;
let interval;
//index of current question
let question = 0;

//DOM flow
////make form, append data, btn data flow, remove form
$(document).ready(function () {
  loadStartPage();
});

//make start page
function loadStartPage() {
  //make start page
  $(actionBlock).append("<form></form>");
  let start = $("form");
  start.addClass("start-slide");
  //make title
  $(start).append("<h1>Coding Quiz Challenge</h1>");
  //make instruction
  $(start).append(
    "<p>Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p>"
  );
  //make start button
  $(start).append("<button>Start Quiz</button>");
  $("button").addClass("start-btn");

  //onclick start button- start countdown
  $(".start-btn").on("click", (e) => {
    e.preventDefault();
    $("form").remove();
    countdown();
    makeSlide(question);
  });
}

//ref = index of current question
function makeSlide(ref) {
  let curr = questions[ref];
  $(actionBlock).append("<form></form>");
  let slide = $("form");
  //makes el with id ref
  slide.addClass(ref);
  //make question
  $(slide).append("<h1>" + curr.question + "<h1>");
  //make options
  for (let i = 0; i < curr.options.length; i++) {
    $(slide).append(
      $(
        "<button name='question' value='" +
          curr.options[i] +
          "'>" +
          curr.options[i] +
          "</button>"
      )
    );
  }
  $(slide).append("<h3 class='answerDisplay'><h1>");

  //onclick submit button
  $("button").on("click", (e) => {
    e.preventDefault();
    handleSubmit(e);
  });
  //TODO: add transition animation
}

function removeSlide() {
  //removes form el
  $("form").remove();
  //TODO: add transition animation
}

//track time
function countdown() {
  interval = setInterval(function () {
    //if game ended
    if (timeLeft > 0) {
      timeLeft--;
      timerEl.text(timeLeft);
    } else {
      timerEl.textContent = "";
      clearInterval(interval);
    }
  }, 1000);
}

//handle the submit button click
function handleSubmit(e) {
  let answer = $(".answerDisplay");
  if (e.target.value !== questions[question].answer) {
    timeLeft -= 10;
    answer.text("WRONG");
  } else {
    answer.text("CORRECT");
  }
  question++;

  setTimeout(() => {
    answer.text("");
    removeSlide();
    if (question === questions.length) {
      loadSaveScorePage();
    } else {
      makeSlide(question);
    }
  }, 1000);
}

function loadSaveScorePage() {
  //stop timer
  clearInterval(interval);
  //make score page
  $(actionBlock).append("<form></form>");
  let start = $("form");
  start.addClass("score-slide");
  //make title
  $(start).append("<h1>Quiz Done!</h1>");
  //show final score
  $(start).append("Your final score is: " + timeLeft + ".");
  //make restart button
  $(start).append("<button class='restart'>Restart Quiz</button>");
  $(start).append(
    "<input type='text' placeholder='Submit Your Initials Here'></input>"
  );

  //handle initials submission (with Enter Key)

  //onclick initials button
  $(".restart").on("click", (e) => {
    e.preventDefault();
    timeLeft = 60;
    removeSlide();
    loadStartPage();
  });
}

function saveScore() {}
