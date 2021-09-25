// Questions Array
const questions = [
  { question: 'Enter Your First Name' },
  { question: 'Enter Your Last Name' },
  { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
  { question: 'Create A Password', type: 'password' }
];

// Transition Times
const shakeTime = 100; // Shake Transition Time
const switchTime = 200; // Transition Between Questions

// Init Position At First Question
let position = 0;

// Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');
//Events
// Get Question On DOM Load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next Button Click
nextBtn.addEventListener('click', validate);

//Input field enter Click
inputField.addEventListener('keyup', (e) => {
  if (e.keyCode == 13) {
    validate();
  }
})

//Functions
function getQuestion() {
  //Get current question
  inputLabel.innerHTML = questions[position].question;
  //Get current type
  inputField.type = questions[position].type || 'text';
  //Get current answer
  inputField.value = questions[position].answer || '';
  //Focus on element
  inputField.focus();

  //Set progress bar width -variabole to the questions  length
  progress.style.width = (position*100) / questions.length+ '%';

  //Add back button or user icon
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
}

//Display Questions
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width= '100%';
}

//Hide question
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.transition = 'none';
  inputProgress.style.width= 0;
  inputGroup.style.border = null;
}

//Transform to create shake montion
function transform(x,y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`
}

//Validate field
function validate() {
  //Make sure pattern matches if there is one
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  }else {
    inputPass();
  }
}

//Field input Fail
function inputFail() {
  formBox.className = 'error';
  //Repeat shake montion -set i to number of shakes
  for (var i = 0; i <6; i++) {
    setTimeout(transform,shakeTime * i,((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform,shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

//Field input pass
function inputPass() {
  formBox.className = '';
  setTimeout(transform,shakeTime * 0, 0, 10);
  setTimeout(transform,shakeTime * 1, 0, 0);

  //Store answer in array
  questions[position].answer = inputField.value;

  //Incrimate position
  position ++;

  //if new question hide current and get next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  }else {
    //Remove if no more Questions
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    //Form complete
    formComplete();
  }
}


// All fields complete -show h1 end
function formComplete() {
  console.log(questions)
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer} you are
    register and you'll get a email shortly at ${questions[2].answer} `));
    setTimeout(() => {
      formBox.parentElement.appendChild(h1);
      setTimeout(() => {
        h1.style.opacity = 1;
      },50);
    },1000);
}
