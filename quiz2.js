const questions = [
    {
        question: "Atha njipuk sandal ning dapur. Jejere ukara iku, yaiku…",
        answers: [
            { text: "Njipuk", correct: false },
            { text: "Sandal", correct: false },
            { text: "Atha", correct: true },
            { text: "Dapur", correct: false }
        ]
    },
    {
        question: "Adik maem sego ing kamar. Wasesane ukara iku, yaiku…",
        answers: [
            { text: "Adik", correct: false },
            { text: "Maem", correct: true },
            { text: "Sego", correct: false },
            { text: "Ing kamar", correct: false }
        ]
    },
    {
        question: 'Budi sinau ing kamare dewe. Katrangane ukara iku, yaiku...',
        answers: [
            { text: "Ing kamare dewe", correct: true },
            { text: "Budi", correct: false },
            { text: "Sinau", correct: false },
            { text: "Ibu", correct: false }
        ]
    },
    {
        question: "Andi dolanan bal ing lapangan. Lesane ukara iku, yaiku...",
        answers: [
            { text: "Andi", correct: false },
            { text: "Dolanan", correct: false },
            { text: "Lapangan", correct: false },
            { text: "Bal", correct: true }
        ]
    },
    {
        question: "Gamar seneng maca buku. Jejer ing ukara iku yaiku",
        answers: [
            { text: "Gamar ", correct: true },
            { text: "Maca ", correct: false },
            { text: "Seneng", correct: false },
            { text: "Buku ", correct: false }
        ]
    },
    {
        question: " Yazid mlaku menyang sekolah. wasesa ne ukara iku yaiku,.",
        answers: [
            { text: "Yazid", correct: false },
            { text: "Mlaku", correct: true },
            { text: "Menyang", correct: false },
            { text: "sekolah", correct: false }
        ]
    },
    {
        question: "Akbar saiki numpak bis menyang Jogja. Katrangane ukara kuwi yaiku,",
        answers: [
            { text: "Akbar", correct: false },
            { text: "Numpak", correct: false },
            { text: "Bis", correct: false },
            { text: "Jogja ", correct: true }
        ]
    },
    {
        question: 'Adit dolanan ing sawah. Jejere ukara iku, yaiku',
        answers: [
            { text: "Adit", correct: true },
            { text: "Dolanan", correct: false },
            { text: "Ing Sawah", correct: false },
            { text: "Sawah", correct: false }
        ]
    },
    {
        question: "Arka sinau basa jawa ing sekolah. Jejere ukara iku, yaiku",
        answers: [
            { text: "Arka", correct: true },
            { text: "Sinau", correct: false },
            { text: "Ing sekolah", correct: false },
            { text: "Sekolah", correct: false },
        ]
    },
    {
        question: 'Najoan mangan krupuk karo arka ing omahe. Lesane ukara iku yaiku',
        answers: [
            { text: "Najoan ", correct: false },
            { text: "Arka", correct: false },
            { text: "Mangan", correct: false },
            { text: "krupuk", correct: true }
        ]
    },
    // Tambahkan pertanyaan lainnya sesuai kebutuhan
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const finishButton = document.getElementById('finish-button');
const questionNumberElement = document.getElementById('question-number');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;
let answers = new Array(questions.length).fill(null);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = 'inline-block';
    prevButton.style.display = 'none';
    finishButton.style.display = 'none';
    scoreElement.textContent = '';
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionNumberElement.textContent = `Pertanyaan ${currentQuestionIndex + 1}`;
    questionElement.textContent = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        button.dataset.index = index;
        if (answers[currentQuestionIndex] !== null && answers[currentQuestionIndex] === index) {
            setStatusClass(button, answer.correct);
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
    prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
    finishButton.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    const index = selectedButton.dataset.index;
    answers[currentQuestionIndex] = parseInt(index);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
        button.disabled = true;
    });
    if (correct) {
        score++;
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
    }
});

prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(questions[currentQuestionIndex]);
    }
});

finishButton.addEventListener('click', () => {
    scoreElement.textContent = `Kamu mendapatkan skor ${score} dari ${questions.length}!`;
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';
    finishButton.style.display = 'none';
    questionElement.textContent = 'Kuis Selesai!';
    answerButtonsElement.innerHTML = '';
});

startQuiz();
