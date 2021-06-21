let timerEl = $("#timer");
let actionBlock = $("#action-block");

let timeLeft = 60;
//index of current question
let question;
let score;

//DOM flow
////make form, append data, submit/next btn flow, remove form
$(document).ready(function () {
  loadStartPage();
});

//make start page
function loadStartPage() {
  //make start page
  let start = $(actionBlock).append("form");
  start.addClass("start-slide");
  //make title
  $(start).append("<h1>Coding Quiz Challenge</h1>");
  //make instruction
  $(start).append(
    "<p>Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p>"
  );
  //make start button
  $(start).append("<button>Start Quiz</button>").addClass("start-btn");
}

function makeSlide(ref) {
  let curr = questions[ref];
  let slide = $(actionBlock).append("form");
  //makes el with id ref
  slide.addClass(ref);
  //question
  $(slide).append("<div>" + curr + "<div>");
  let list = $(slide).append("ul");
  //options
  for (let i = 0; i < curr.options[i]; i++) {
    $(list).append("li").text(curr[i]);
  }
  $(slide).append("button").text("submit").addClass("submit-btn");
  //TODO: add transition animation
}

function removeSlide() {
  //removes form el
  $(actionBlock).remove("form");
  //TODO: add transition animation
}

function showAnswer() {
  let answer = $(actionBlock)
    .children()
    .append("<div>" + answer + "</div>");
}

//track time
function countdown() {
  var timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft--;
      timerEl.text(timeLeft);
    } else {
      timerEl.textContent = "";
      clearInterval(timeInterval);
    }
  }, 1000);
}

function validateAnswer() {
  //correct && score++
  //!correct && 
}

//handle the submit button click
function handleSubmit() {
  //check answer
  function validateAnswer();
  //remove submit btn
  $(".submit-btn").remove();
  //add next button
  $("form").append("button").text("next").addClass("next-btn");
}

//onclick start button- start countdown
$(".start-btn").click((e) => {
  e.preventDefault();
  question = 0;
  removeSlide();
  makeSlide(question);
});
//onclick submit button
$(".submit-btn").click(function (e) {
  e.preventDefault();
  handleSubmit();
});
//onclick next button
$(".next-btn").click(function (e) {
  e.preventDefault();
  removeSlide();
  question++;
  makeSlide(question);
});
