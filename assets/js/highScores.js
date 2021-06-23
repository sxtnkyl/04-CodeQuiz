$(document).ready(function () {
  getLocalScores();

  $(".reset-scores").click(function (e) {
    e.preventDefault();
    window.localStorage.removeItem("allScores");
    //refresh to show scores erased
    window.location.reload();
  });
});

//get high scores from localStorage
function getLocalScores() {
  let allScores = JSON.parse(window.localStorage.getItem("allScores")) || [];
  allScores.sort((a, b) => b.score - a.score);
  allScores.forEach((el) => {
    let listEl = document.createElement("li");
    listEl.textContent = el.initials + "___" + el.score;
    let list = $("ol");
    list.append(listEl);
  });
}
