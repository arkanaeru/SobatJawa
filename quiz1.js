const questions = [
    {
        question: " Ing wayah sore ibu nyapu latar. Basa kramane tembung sore, yaiku...",
        answers: [
            { text: "Enjang", correct: false },
            { text: "Wengi", correct: false },
            { text: "Sonten", correct: true },
            { text: "Pagi", correct: false }
        ]
    },
    {
        question: "Bapak badhe tindak wonten kantor. Tembung tindak pada karo tembung…",
        answers: [
            { text: "Lunga", correct: true },
            { text: "Teka", correct: false },
            { text: "Bali", correct: false },
            { text: "Budhal", correct: false }
        ]
    },
    {
        question: 'Linda: ... koe mau sore?\n'+
                  'Nana: Aku bar lunga saka omahe Rudi.\n'+
                  'Tembung pitakon sing bener kanggo ukara pitakon ing nduwur, yaiku...',
        answers: [
            { text: "Apa", correct: false },
            { text: "Saka Ngendi", correct: true },
            { text: "Jenengku Bambang.", correct: false },
            { text: "Kapan", correct: false }
        ]
    },
    {
        question: "Basa Krama Inggile aku, yaiku...",
        answers: [
            { text: "Kula", correct: true },
            { text: "Kowe", correct: false },
            { text: "Riko", correct: false },
            { text: "Panjenengan", correct: false }
        ]
    },
    {
        question: "Tembung ing ngisor iki nduweni teges podo karo 'koe', kajaba…",
        answers: [
            { text: "Panjenengan ", correct: false },
            { text: "Sampeyan ", correct: false },
            { text: "Dia", correct: true },
            { text: "Riko", correct: false }
        ]
    },
    {
        question: " Dinda: Bapak dhahar apa? Tembung 'apa' kudune diganti nganggo tembung...",
        answers: [
            { text: "Piye", correct: false },
            { text: "Menapa", correct: true },
            { text: "Kapan", correct: false },
            { text: "Pinten", correct: false }
        ]
    },
    {
        question: "Bude lagi bali saka toko.\n"+
                "Tembung bali basa kraan inggile yaiku...",
        answers: [
            { text: "Wangsul", correct: true },
            { text: "tindak", correct: false },
            { text: "Mlampah", correct: false },
            { text: "Mblayu", correct: false }
        ]
    },
    {
        question: 'Ibu lagi maca koran.\n'+
                    'Basa kramane sing bener yaiku...',
        answers: [
            { text: "Ibu nembe maos koran", correct: true },
            { text: "Ibu lagi maos koran", correct: false },
            { text: "Ibu nembe maca koran", correct: false },
            { text: "Ibu maca koran", correct: false }
        ]
    },
    {
        question: "Pitakon ing ngisor iki kanggop nakokake panggonan sing bener yaiku...",
        answers: [
            { text: "Sapa jenengmu?", correct: false },
            { text: "Ing ngendi omahmu?", correct: true },
            { text: "Apa sing mbok butuhake?", correct: false },
            { text: "Pira regane?", correct: false },
        ]
    },
    {
        question: 'Simbah bali saka pasar mlaku…\n'+
'Ukara ing nduwur kui yen diubah basa krama inggil dadi...',
        answers: [
            { text: "Simbah bali saking pasar mlampah ", correct: false },
            { text: "Simpah wangsul saka peken mlaku", correct: false },
            { text: "Simbah wangsul saking peken mlampah", correct: true },
            { text: "Simpah mlaku-mlaku", correct: false }
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
