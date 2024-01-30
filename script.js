let startButton = document.querySelector("#startBtn");
let ques1pg = document.getElementById("ques1");
let btn1 = document.getElementById("1");
let startPage = document.getElementById("landingPage");

let wrong = document.getElementById("WrongAns");
const questions = [
  {
    question: "This is question 1",
    ans: ["1", "2", "3", "4"],
    corrans: "1",
  },
  {
    question: "This is question 2",
    ans: ["1", "2", "3", "4"],
    corrans: "2",
  },
  {
    question: "This is question 3",
    ans: ["1", "2", "3", "4"],
    corrans: "3",
  },
];
var currentIndex = 0;
function startquiz(event) {
  startPage.classList.add("hide");
  question(currentIndex);
}
function handleBtnClick(event) {
  var selectedAns = event.target.innerHTML;
  var correctAns = questions[currentIndex].corrans;
  var correct = 0;
  var wrong = 0;
  if (selectedAns === correctAns) {
    console.log(true);
    correct++;
  } else {
    console.log(false);
    wrong++;
  }
}
function question(idx) {
  ques1pg.classList.remove("hide");
  var btnwrap = document.getElementById("btnwrap");

  var currentQues = questions[idx];

  for (let i = 0; i < currentQues.ans.length; i++) {
    var btn = document.createElement("button");
    btnwrap.appendChild(btn);
    btn.textContent = currentQues.ans[i];
    btn.addEventListener("click", handleBtnClick);
  }
}

startButton.addEventListener("click", startquiz);

// setTimeout google
