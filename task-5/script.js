
document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.querySelector("#start-button");
    const questionContainer = document.querySelector("#question-container");
    const scoreDisplay = document.querySelector("#score");

    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    startButton.addEventListener("click", async function () {
        startButton.style.display = "none";
        questionContainer.style.display = "block";
        scoreDisplay.style.display = "block";
        await fetchQuestions();
        displayQuestion();
    });

    async function fetchQuestions() {
        try {
            const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple");
            const data = await response.json();
            questions = data.results;
        } catch (error) {
            console.error("Error fetching quiz data:", error);
            questionContainer.innerHTML = "<p>Failed to load questions. Try again later.</p>";
        }
    }

    function displayQuestion() {
        if (currentQuestionIndex >= questions.length) {
            questionContainer.innerHTML = `<h2>Quiz Completed! 🎉</h2><p>Your final score: ${score} / ${questions.length}</p>`;
            return;
        }

        const questionObj = questions[currentQuestionIndex];
        let answers = [...questionObj.incorrect_answers, questionObj.correct_answer];
        answers = shuffleArray(answers);

        questionContainer.innerHTML = `
            <h2>${currentQuestionIndex + 1}. ${questionObj.question}</h2>
            <div id="answers-container">
                ${answers.map(answer => `
                    <button class="answer-btn">${answer}</button>
                `).join("")}
            </div>
            <button id="next-button" style="display: none;">Next Question</button>
        `;

        document.querySelectorAll(".answer-btn").forEach(button => {
            button.addEventListener("click", function () {
                checkAnswer(button, questionObj.correct_answer);
            });
        });

        document.querySelector("#next-button").addEventListener("click", nextQuestion);
    }

    function checkAnswer(selectedButton, correctAnswer) {
        const buttons = document.querySelectorAll(".answer-btn");
        buttons.forEach(button => {
            button.disabled = true; 
            if (button.innerText === correctAnswer) {
                button.style.backgroundColor = "green"; 
            } else if (button === selectedButton) {
                button.style.backgroundColor = "red"; 
            }
        });

        if (selectedButton.innerText === correctAnswer) {
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
        }

        document.querySelector("#next-button").style.display = "block";
    }

    function nextQuestion() {
        currentQuestionIndex++;
        displayQuestion();
    }

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }
});
