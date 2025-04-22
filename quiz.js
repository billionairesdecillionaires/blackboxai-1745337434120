const quizData = [
  {
    id: 1,
    question: "Do you engage in any form of physical activity?",
    options: [
      { text: "No, I do not engage in any regular physical activity.", score: 0, next: 3 },
      { text: "Yes, I engage in physical activity.", score: 0, next: 2 }
    ]
  },
  {
    id: 2,
    question: "How often do you engage in the following types of physical activity?",
    subQuestions: [
      {
        text: "Cardiovascular Exercise (e.g., brisk walking, running, cycling, swimming)",
        options: [
          { text: "Rarely or never", score: 0 },
          { text: "1–2 times per week", score: 2 },
          { text: "3–4 times per week", score: 4 },
          { text: "5 or more times per week", score: 6 }
        ]
      },
      {
        text: "Strength Training (e.g., weightlifting, bodyweight exercises, resistance bands)",
        options: [
          { text: "Rarely or never", score: 0 },
          { text: "1–2 times per week", score: 2 },
          { text: "3–4 times per week", score: 4 },
          { text: "5 or more times per week", score: 6 }
        ]
      },
      {
        text: "Flexibility & Mobility Training (e.g., yoga, stretching, pilates, mobility drills)",
        options: [
          { text: "Rarely or never", score: 0 },
          { text: "1–2 times per week", score: 2 },
          { text: "3–4 times per week", score: 4 },
          { text: "5 or more times per week", score: 6 }
        ]
      }
    ]
  },
  {
    id: 3,
    question: "Dietary Factors Affecting AMPK Activation",
    subQuestions: [
      {
        text: "How often do you consume foods high in saturated fat? (e.g., red meat, dairy products, fried foods, desserts)",
        options: [
          { text: "Daily", score: 0 },
          { text: "4–5 times a week", score: 1 },
          { text: "Occasionally (1–3 times a week)", score: 2 },
          { text: "Rarely or never", score: 3 }
        ]
      },
      {
        text: "How often do you consume refined sugar or high-glycemic foods? (e.g., sugary beverages, white bread, pastries, processed snacks)",
        options: [
          { text: "Daily", score: 0 },
          { text: "4–5 times a week", score: 1 },
          { text: "Occasionally (1–3 times a week)", score: 2 },
          { text: "Rarely or never", score: 3 }
        ]
      },
      {
        text: "How often do you consume fiber-rich foods that activate AMPK? (e.g., legumes, whole grains, vegetables, nuts, seeds)",
        options: [
          { text: "Rarely or never", score: 0 },
          { text: "Occasionally (1–3 times a week)", score: 1 },
          { text: "4–5 times a week", score: 2 },
          { text: "Daily", score: 3 }
        ]
      }
    ]
  },
  {
    id: 4,
    question: "Lifestyle Factors Affecting AMPK Activation",
    subQuestions: [
      {
        text: "Do you engage in prolonged sitting without movement breaks?",
        options: [
          { text: "Yes, I sit for long hours without breaks", score: 0 },
          { text: "Occasionally, but I take some movement breaks", score: 1 },
          { text: "No, I make sure to move frequently throughout the day", score: 2 },
          { text: "No, I have an active lifestyle", score: 3 }
        ]
      }
    ]
  }
];

// Global variables for quiz state
let currentQuestionIndex = 0;
let physicalActivityScore = 0;
let dietaryScore = 0;
let lifestyleScore = 0;

// Global variables for modal content
let futureModalTitle = '';
let futureModalContent = '';

const quizContent = document.getElementById('quiz-content');
const resultContainer = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const interpretationDisplay = document.getElementById('interpretation');
const detailedExplanation = document.getElementById('detailed-explanation');
const detailedText = document.getElementById('detailed-text');
const additionalText = document.getElementById('additional-text');
const connectBtn = document.getElementById('connect-btn');

const restartBtn = document.getElementById('restart-btn');
const futureSelfModal = document.getElementById('future-self-modal');
const nextStepBtn = document.getElementById('next-step-btn');

let subQuestionIndex = 0;
let subQuestionScores = [];
let historyStack = [];

function renderQuestion() {
  quizContent.innerHTML = '';
  const questionData = quizData[currentQuestionIndex];

  if (!questionData) {
    showResult();
    return;
  }

  if (questionData.subQuestions) {
    subQuestionIndex = 0;
    subQuestionScores = [];
    renderSubQuestion(questionData);
  } else {
    renderSingleQuestion(questionData);
  }
}

function renderSingleQuestion(questionData) {
  const questionEl = document.createElement('div');
  questionEl.className = 'question';

  const questionTitle = document.createElement('h2');
  questionTitle.textContent = questionData.question;
  questionEl.appendChild(questionTitle);

  questionData.options.forEach((option, idx) => {
    const label = document.createElement('label');
    label.className = 'option-label';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'option';
    input.value = idx;

    label.appendChild(input);
    label.appendChild(document.createTextNode(option.text));
    questionEl.appendChild(label);
  });

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';
  nextBtn.disabled = true;

  const backBtn = document.createElement('button');
  backBtn.textContent = 'Back';
  backBtn.className = 'back-btn';

  nextBtn.addEventListener('click', () => {
    const selectedOptionIndex = [...document.getElementsByName('option')].findIndex(input => input.checked);
    if (selectedOptionIndex === -1) return;

    const selectedOption = questionData.options[selectedOptionIndex];
    historyStack.push({ questionIndex: currentQuestionIndex, subQuestionIndex: null, subQuestionScores: [...subQuestionScores], physicalActivityScore, dietaryScore, lifestyleScore });

    if (questionData.id === 1) {
      if (selectedOption.next) {
        currentQuestionIndex = quizData.findIndex(q => q.id === selectedOption.next);
      } else {
        currentQuestionIndex++;
      }
    } else {
      currentQuestionIndex++;
    }

    if (questionData.id !== 1) {
      physicalActivityScore += selectedOption.score;
    }

    renderQuestion();
  });

  backBtn.addEventListener('click', () => {
    if (historyStack.length === 0) return;
    const prevState = historyStack.pop();
    currentQuestionIndex = prevState.questionIndex;
    subQuestionIndex = prevState.subQuestionIndex !== null ? prevState.subQuestionIndex : 0;
    subQuestionScores = prevState.subQuestionScores;
    physicalActivityScore = prevState.physicalActivityScore;
    dietaryScore = prevState.dietaryScore;
    lifestyleScore = prevState.lifestyleScore;
    renderQuestion();
  });

  quizContent.appendChild(questionEl);
  quizContent.appendChild(backBtn);
  quizContent.appendChild(nextBtn);

  document.querySelectorAll('input[name="option"]').forEach(input => {
    input.addEventListener('change', () => {
      nextBtn.disabled = false;
    });
  });
}

function renderSubQuestion(questionData) {
  quizContent.innerHTML = '';
  if (subQuestionIndex >= questionData.subQuestions.length) {
    const sectionScore = subQuestionScores.reduce((a, b) => a + b, 0);
    if (questionData.id === 2) {
      physicalActivityScore += sectionScore;
    } else if (questionData.id === 3) {
      dietaryScore += sectionScore;
    } else if (questionData.id === 4) {
      lifestyleScore += sectionScore;
    }
    currentQuestionIndex++;
    renderQuestion();
    return;
  }

  const subQ = questionData.subQuestions[subQuestionIndex];
  const subQEl = document.createElement('div');
  subQEl.className = 'question';

  const subQTitle = document.createElement('h3');
  subQTitle.textContent = subQ.text;
  subQEl.appendChild(subQTitle);

  subQ.options.forEach((option, idx) => {
    const label = document.createElement('label');
    label.className = 'option-label';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'suboption';
    input.value = idx;

    label.appendChild(input);
    label.appendChild(document.createTextNode(option.text));
    subQEl.appendChild(label);
  });

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';
  nextBtn.disabled = true;

  const backBtn = document.createElement('button');
  backBtn.textContent = 'Back';
  backBtn.className = 'back-btn';

  nextBtn.addEventListener('click', () => {
    const selectedOptionIndex = [...document.getElementsByName('suboption')].findIndex(input => input.checked);
    if (selectedOptionIndex === -1) return;

    const selectedOption = subQ.options[selectedOptionIndex];
    subQuestionScores[subQuestionIndex] = selectedOption.score;

    historyStack.push({ questionIndex: currentQuestionIndex, subQuestionIndex, subQuestionScores: [...subQuestionScores], physicalActivityScore, dietaryScore, lifestyleScore });

    subQuestionIndex++;
    renderSubQuestion(questionData);
  });

  backBtn.addEventListener('click', () => {
    if (historyStack.length === 0) return;
    const prevState = historyStack.pop();
    currentQuestionIndex = prevState.questionIndex;
    subQuestionIndex = prevState.subQuestionIndex !== null ? prevState.subQuestionIndex : 0;
    subQuestionScores = prevState.subQuestionScores;
    physicalActivityScore = prevState.physicalActivityScore;
    dietaryScore = prevState.dietaryScore;
    lifestyleScore = prevState.lifestyleScore;
    renderQuestion();
  });

  quizContent.appendChild(subQEl);
  quizContent.appendChild(backBtn);
  quizContent.appendChild(nextBtn);

  document.querySelectorAll('input[name="suboption"]').forEach(input => {
    input.addEventListener('change', () => {
      nextBtn.disabled = false;
    });
  });
}

function showResult() {
  quizContent.style.display = 'none';
  resultContainer.style.display = 'block';

  const total = physicalActivityScore + dietaryScore + lifestyleScore;

  // Circular progress bar update
  const progressBar = document.querySelector('.progress-bar');
  const progressText = document.querySelector('.progress-text');
  const radius = progressBar.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const percent = (total / 30) * 100;
  const offset = circumference - (percent / 100) * circumference;

  progressBar.style.strokeDasharray = circumference;
  progressBar.style.strokeDashoffset = offset;
  progressText.textContent = `${total}/30`;

  // Color coding and content based on score
  let color = '#ff4d4d'; // red for low
  let interpretation = '';
  let additionalTextContent = '';

  if (total <= 10) {
    color = '#ff4d4d'; // red
    interpretation = 'Low AMPK Activation – High risk of metabolic dysfunction';
    additionalTextContent = 'Your cellular energy systems need significant improvement to reduce inflammation and metabolic dysfunction.';
    futureModalTitle = 'Your Future Self: Low AMPK Activation';
    futureModalContent = "Hey there, it's your future self here. I need to be honest with you – I wish I'd known how our sedentary lifestyle and poor diet were suppressing our AMPK activation. Since I started moving more and eating better, my energy levels have skyrocketed, and our metabolism has improved dramatically. Even small changes like taking walking breaks and cutting back on processed foods made a huge difference. Please don't wait like I did – each day of improved AMPK activation is a day of better cellular health for us.";
  } else if (total <= 19) {
    color = '#ffa500'; // orange
    interpretation = 'Moderate AMPK Activation – Some protective effects, but room for improvement';
    additionalTextContent = 'Your cellular energy systems show some protective effects, but there is room for improvement.';
    futureModalTitle = 'Your Future Self: Moderate AMPK Activation';
    futureModalContent = "Hello from your future! I see you're on the right track with some of your habits, but our inconsistency held us back. Once I committed to regular exercise and cleaned up our diet more consistently, our weight stabilized and my energy became more consistent throughout the day. The key was making our good habits more frequent rather than trying to be perfect occasionally. Build on what you're already doing right – your future self is cheering you on!";
  } else if (total <= 26) {
    color = '#4caf50'; // green
    interpretation = 'High AMPK Activation – Strong metabolic benefits';
    additionalTextContent = 'Your cellular energy systems have strong metabolic benefits.';
    futureModalTitle = 'Your Future Self: High AMPK Activation';
    futureModalContent = "Hi there, it's you from the future! I want you to know you're doing great with your AMPK activation! I maintained these habits and added just a bit more consistency with movement breaks throughout the day. The compounding benefits over time have been incredible for our metabolic health. Keep up the great work and consider adding some variety to your exercise routine to challenge our body in new ways. I'm so grateful for the foundation you're building now.";
  } else {
    color = '#2e7d32'; // dark green
    interpretation = 'Optimal AMPK Activation – Ideal conditions for longevity and health';
    additionalTextContent = 'Your cellular energy systems are in ideal condition for longevity and health.';
    futureModalTitle = 'Your Future Self: Optimal AMPK Activation';
    futureModalContent = "Hello from your future! I'm so thankful for the incredible habits you've established. Your choices now are setting us up for incredible long-term health! I've maintained this level of AMPK activation for years now, and at our age, doctors are amazed at my metabolic markers. The disciplined choices you're making today are truly paying off in how I feel and function. Stay consistent with what you're doing – it's the gold standard for cellular health, and I'm reaping the benefits every day.";
  }

  progressBar.style.stroke = color;
  progressText.style.fill = color;
  interpretationDisplay.textContent = interpretation;
  additionalText.textContent = additionalTextContent;
  detailedExplanation.style.display = 'block';
  connectBtn.style.display = 'inline-block';
}

connectBtn.addEventListener('click', () => {  
  document.getElementById('modal-title').textContent = futureModalTitle;
  document.getElementById('modal-content').textContent = futureModalContent;
  futureSelfModal.classList.remove('hidden');
});

restartBtn.addEventListener('click', () => {
  currentQuestionIndex = 0;
  physicalActivityScore = 0;
  dietaryScore = 0;
  lifestyleScore = 0;
  historyStack = [];
  quizContent.style.display = 'block';
  resultContainer.style.display = 'none';
  detailedExplanation.style.display = 'none';
  connectBtn.style.display = 'none';
  futureSelfModal.classList.add('hidden');
  renderQuestion();
});

nextStepBtn.addEventListener('click', () => {
  futureSelfModal.classList.add('hidden');
});

renderQuestion();
