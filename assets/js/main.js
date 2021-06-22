let timerEl = $("#timer");
let actionBlock = $("#action-block");

let timeLeft = 60;
//index of current question
let question;
//correct answer = +1
let score = 0;

//DOM flow
////make form, append data, submit/next btn flow, remove form
$(document).ready(function () {
  loadStartPage();

  //onclick start button- start countdown
  $(".start-btn").on("click", (e) => {
    console.log("start btn clicked");
    e.preventDefault();
    question = 0;
    removeSlide();
    countdown();
    makeSlide(question);
  });
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
}

function makeSlide(ref) {
  console.log(ref);
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
        "<input type='radio' name='question' value='" +
          curr.options[i] +
          "'>" +
          "<label>" +
          curr.options[i] +
          "</label>" +
          "</input>"
      )
    );
  }
  //make submit button
  $(slide).append("<button></button>");
  $("button").text("submit").addClass("submit-btn");

  //onclick submit button
  $(".submit-btn").on("click", (e) => {
    e.preventDefault();
    handleSubmit();
  });
  //TODO: add transition animation
}

function removeSlide() {
  console.log("im removing a slide");
  //removes form el
  $("form").remove();
  //TODO: add transition animation
}

function showAnswer() {
  $("form").append(
    "<div class='answer'> The correct answer is: " +
      questions[question].answer +
      "</div>"
  );
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
  let getSelectedValue = document.querySelector(
    'input[name="question"]:checked'
  );
  console.log(
    "value selected: ",
    getSelectedValue.value,
    questions[question].answer
  );

  if (getSelectedValue == null) {
    $("form").append(
      "<div class='error'>*You have not selected any season</div>"
    );
  }
  //correct && score++
  if (getSelectedValue.value == questions[question].answer) {
    score++;
  }
  //!correct && timeLeft -+ 10
  if (getSelectedValue.value !== questions[question].answer) {
    timeLeft - +10;
  }
}

//handle the submit button click
function handleSubmit() {
  //check answer
  validateAnswer();
  showAnswer();
  //remove submit btn
  let submitBtn = $(".submit-btn");
  submitBtn.remove();
  //add next button
  $("form").append("<button class='next-btn'>Next</button>");

  // //onclick next button
  // $(".next-btn").click(function (e) {
  //   console.log("clicked next btn");
  //   e.preventDefault();
  //   removeSlide();
  //   $(".answer").remove();
  //   question++;
  //   makeSlide(question);
  // });
}
