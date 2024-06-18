const questions = [
    {
        question: " Ibu tindak peken tumbas beras. Ukara ing nduwur iku kagolong ukara...",
        answers: [
            { text: "Andharan", correct: true },
            { text: "Wakesa", correct: false },
            { text: "Pakon", correct: false },
            { text: "Pitakon", correct: false }
        ]
    },
    {
        question: "Sapa sing ndamelke bapak teh? Ukara ing nduwur iku kagalong ukara... ",
        answers: [
            { text: "Andharan", correct: false },
            { text: "Pitakon", correct: true },
            { text: "Pakon", correct: false },
            { text: "Katrangan", correct: false }
        ]
    },
    {
        question: "Ing ngisor iki sing kalebu ukara pakon, yaiku...",
        answers: [
            { text: "Sapa jenengmu?", correct: false },
            { text: "Yagene koe ora mlebu sekolah?", correct: false },
            { text: "Jenengku Bambang.", correct: false },
            { text: "Tukokno lombok ing warung!", correct: true }
        ]
    },
    {
        question: "Ing ngisor iki sing kalebu ukara pitakon, yaiku...",
        answers: [
            { text: "Tulung jipukno gelas kuwi!", correct: false },
            { text: "Ibu tindak ing kantor.", correct: false },
            { text: "Sinten asmanipun panjenengan?", correct: true },
            { text: " Aku ora mudeng.", correct: false }
        ]
    },
    {
        question: "Gundul gundul pacul, menthog menthog termasuk golongan tembang…",
        answers: [
            { text: "Dolanan ", correct: true },
            { text: "Delikan ", correct: false },
            { text: "Makaryo", correct: false },
        ]
    },
    {
        question: "Tembang dolanan biasane ditembangke deneng..",
        answers: [
            { text: "Ibu-ibu ", correct: false },
            { text: "mbah-mbah ", correct: false },
            { text: "bocah cilik", correct: true },
        ]
    },
    {
        question: "Tujuan utama isine tembang dolanan yaiku…",
        answers: [
            { text: "Nyenengake bocah", correct: true },
            { text: "ajaran nilai budi pekerti", correct: false },
            { text: "Bisa dienggo nari daerah", correct: false },
        ]
    },
    {
        question: "Wakule ngglimpang segane wutah dadi..",
        answers: [
            { text: "Saratan", correct: true },
            { text: "Sagudhang", correct: false },
            { text: "sakranjang", correct: false },
        ]
    },
    {
        question: "Tembang methog-menthog iku menehi ngenalake babagan sato..",
        answers: [
            { text: "Barang", correct: false },
            { text: "kewan", correct: true },
            { text: "kembang", correct: false },
        ]
    },
    {
        question: "Gajah - gajah kowe tak kandani jah mata koyok…",
        answers: [
            { text: "lintah ", correct: false },
            { text: "uler", correct: false },
            { text: "laron", correct: true },
        ]
    },
    {
        question: "wakule ing tembang gundhul -  gundhul pacul isine…",
        answers: [
            { text: "Jagung  ", correct: false },
            { text: "dele", correct: false },
            { text: "sega", correct: true },
        ]
    },
    {
        question: "kewan sing kupinge gedhe yaiku…",
        answers: [
            { text: "kucing", correct: false },
            { text: "menthog", correct: false },
            { text: "gajah", correct: true },
        ]
    },
    {
        question: "Tak pakani lonthong Atiku seneng Kancaku… Terusane syair tembang iku…",
        answers: [
            { text: "Ndomblong", correct: true },
            { text: "Meneng wae", correct: false },
            { text: "Gawe guyu", correct: false },
        ]
    },
    {
        question: "Swarane kucing yaiku…",
        answers: [
            { text: "Meong", correct: true },
            { text: "Rawr", correct: false },
            { text: "MOOOh", correct: false },
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
