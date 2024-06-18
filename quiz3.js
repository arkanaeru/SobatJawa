const questions = [
    {
        question: "'Ibu tindak peken tumbas beras.'\n"+
                    "Ukara ing nduwur iku kagolong ukara...",
        answers: [
            { text: "Andharan", correct: true },
            { text: "Wasesa", correct: false },
            { text: "Atha", correct: false },
            { text: "Pitakon", correct: false }
        ]
    },
    {
        question: "'Sapa sing ndamelke bapak teh?'\n"+
                    "Ukara ing nduwur iku kagalong ukara...",
        answers: [
            { text: "Pitakon", correct: true },
            { text: "Pakon", correct: false },
            { text: "Andharan", correct: false },
            { text: "Katrangan", correct: false }
        ]
    },
    {
        question: "Ing ngisor iki sing kalebu ukara pitakon, yaiku...",
        answers: [
            { text: "Tulung jipukno gelas kuwi!", correct: false },
            { text: "Ibu tindak ing kantor.", correct: false },
            { text: "Aku ora mudeng.", correct: false },
            { text: "Sinten asmanipun panjenengan?", correct: true }
        ]
    },
    {
        question: "'Kowe lagi maca buku apa?' Kalebu ukara jinis apa?",
        answers: [
            { text: "Pitakon ", correct: true },
            { text: "Andharan ", correct: false },
            { text: "Katrangan", correct: false },
            { text: "pakon ", correct: false }
        ]
    },
    {
        question: "'Muga-muga aku bisa lulus sekolah', ukara iku kalebu jinis...",
        answers: [
            { text: "Pakon", correct: false },
            { text: "Pitakon", correct: false },
            { text: "Tanggap", correct: false },
            { text: "Panjaluk ", correct: true }
        ]
    },
    {
        question: " 'Jupukna Buku kuwi!' Ukara iku kalebu jinis apa?",
        answers: [
            { text: "Pitakon", correct: false },
            { text: "Pakon", correct: true },
            { text: "Wasesa", correct: false },
            { text: "Tuladha", correct: false }
        ]
    },
    {
        question: '"Sandale digawe Adhit", ukara iku kalebu jinis apa?',
        answers: [
            { text: "Tanggap", correct: true },
            { text: "Dolanan", correct: false },
            { text: "Pakon", correct: false },
            { text: "Tanduk", correct: false }
        ]
    },
    {
        question: "Ing ngisor iki sing kalebu ukara Pandunga, yaiku...",
        answers: [
            { text: "Mugi-mugi aku seger waras", correct: true },
            { text: "Ayo sinau!", correct: false },
            { text: "Kowe lagi apa?", correct: false },
            { text: "Pira regane buku iki?", correct: false },
        ]
    },
    {
        question: 'Ing ngisor iki sing kalebu ukara Tanduk, yaiku...',
        answers: [
            { text: "Aku lagi ngerjakna tugas ", correct: true },
            { text: "Arka diparingi dhuwit karo si mbah", correct: false },
            { text: "Sinau ing kamar kuwi apik", correct: false },
            { text: "Apa kowe lagi pegel?", correct: false }
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
