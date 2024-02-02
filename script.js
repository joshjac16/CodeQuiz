let startButton = document.querySelector("#startBtn");
let ques1pg = document.getElementById("ques1");
let btn1 = document.getElementById("1");
let startPage = document.getElementById("landingPage");
let corr = document.getElementById("CorrectAns");
let wrongAns = document.getElementById("WrongAns");
let score = document.getElementById("score");
let finalPg = document.getElementById("finalPg");
let initial = document.getElementById("initials");
let subBtn = document.getElementById("submit");
let scoreBtn = document.getElementById("highBtn");
var olEl = document.getElementById("highscores");
var backBtn = document.getElementById("back");
var clearBtn = document.getElementById("clear");
var wrong = 0;
const questions = [
  {
    question:
      "The condition in an if / else statement is enclosed within _______.",
    ans: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    corrans: "Parenthesis",
  },
  {
    question: "Arrays in JavaScript can be used to store ________",
    ans: ["Numbers & Strings", "Other arrays", "booleans", "All of the above"],
    corrans: "All of the above",
  },
  {
    question:
      "A very useful tool during development and debugging for printing content to the debugger is:",
    ans: ["JavaScript", "Terminal/Bash", "for loops", "console.log"],
    corrans: "console.log",
  },
  {
    question: "Commonly used data types DO NOT include:",
    ans: ["Strings", "Booleans", "Alerts", "Numbers"],
    corrans: "Alerts",
  },
];
var currentIndex = 0;
//function to start quiz
function startquiz(event) {
  console.log(questions.length);
  console.log(currentIndex);

  startPage.classList.add("hide"); // hides the initial page

  question(currentIndex); //calls question function
}
// goes through the questions in the quiz
function question(idx) {
  console.log(currentIndex);
  ques1pg.classList.remove("hide");
  var btnwrap = document.getElementById("btnwrap");

  var currentQues = questions[idx];
  ques1pg.children[0].textContent = currentQues.question;

  for (let i = 0; i < currentQues.ans.length; i++) {
    var btn = document.createElement("button");
    btnwrap.appendChild(btn);
    btn.textContent = currentQues.ans[i];
    btn.addEventListener("click", handleBtnClick);
  }
}
//function to check the answer picked is correct or not and shows output
function handleBtnClick(event) {
  var selectedAns = event.target.innerHTML;
  var correctAns = questions[currentIndex].corrans;
  console.log(correctAns);

  var result = 100 - wrong * 25;
  if (selectedAns === correctAns) {
    console.log(true);

    corr.textContent = "Correct";

    currentIndex++;
    btnwrap.innerHTML = "";
    setTimeout(() => {
      corr.innerHTML = "";
      if (currentIndex < questions.length) {
        question(currentIndex);
      } else {
        showResult();
      }
    }, 500);
  } else {
    wrongAns.textContent = "Wrong";

    wrong++;
    console.log("this is wrong" + wrong);

    currentIndex++;
    btnwrap.innerHTML = "";
    setTimeout(() => {
      wrongAns.innerHTML = "";
      if (currentIndex < questions.length) {
        question(currentIndex);
      } else {
        showResult();
      }
    }, 500);
  }
}

function showResult() {
  ques1pg.classList.add("hide");
  finalPg.classList.remove("hide");
  score.textContent = 100 - 25 * wrong;
}

function saveScore() {
  var initials = initial.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: 100 - 25 * wrong,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
  }
  getLocalStorage();
}
function getLocalStorage() {
  startPage.classList.add("hide");
  ques1pg.classList.add("hide");
  scoreBtn.classList.add("hide");
  finalPg.classList.add("hide");
  olEl.classList.remove("hide");
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  for (var i = 0; i < highscores.length; i++) {
    // create li tag for each high score
    var liTag = document.createElement("li");
    liTag.textContent = highscores[i].initials + " - " + highscores[i].score;

    olEl.appendChild(liTag);
  }
}
scoreBtn.addEventListener("click", getLocalStorage);
startButton.addEventListener("click", startquiz);
subBtn.onclick = saveScore;
backBtn.addEventListener("click", function () {
  window.location.reload();
});
clearBtn.addEventListener("click", function () {
  localStorage.clear();
  window.location.reload();
});
