document.addEventListener("DOMContentLoaded", function() {
    const startTestBtn = document.getElementById("startTestBtn");
    const nextBtn = document.getElementById("nextBtn");
    const testSection = document.getElementById("testSection");
    const resultSection = document.getElementById("resultSection");
    const questionBox = document.getElementById("questionBox");
    const personalityResult = document.getElementById("personalityResult");

    // Sample questions
    const questions = [
        { text: "I enjoy socializing with large groups of people.", type: "extraversion" },
        { text: "I prefer structured plans over spontaneous activities.", type: "judging" },
        { text: "I tend to focus on details more than big-picture ideas.", type: "sensing" }
    ];
    
    let currentQuestionIndex = 0;
    let personalityScores = {
        extraversion: 0,
        judging: 0,
        sensing: 0
    };

    // Function to load the next question
    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionBox.innerHTML = `
                <p>${currentQuestion.text}</p>
                <label><input type="radio" name="answer" value="1"> Agree</label>
                <label><input type="radio" name="answer" value="0"> Neutral</label>
                <label><input type="radio" name="answer" value="-1"> Disagree</label>
            `;
        } else {
            showResult();
        }
    }

    // Function to show the result
    function showResult() {
        testSection.style.display = "none";
        resultSection.style.display = "block";

        // Simple personality result logic based on scores
        let result = "";
        if (personalityScores.extraversion > 0) {
            result += "Extraverted, ";
        } else {
            result += "Introverted, ";
        }
        if (personalityScores.judging > 0) {
            result += "Judging, ";
        } else {
            result += "Perceiving, ";
        }
        if (personalityScores.sensing > 0) {
            result += "Sensing";
        } else {
            result += "Intuitive";
        }

        personalityResult.textContent = result;
    }

    // Event Listeners
    startTestBtn.addEventListener("click", function() {
        document.querySelector(".land").style.display = "none"; // Hide landing section
        testSection.style.display = "block"; // Show test section
        loadQuestion();
    });

    nextBtn.addEventListener("click", function() {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            const value = parseInt(selectedAnswer.value);
            const currentQuestion = questions[currentQuestionIndex];
            personalityScores[currentQuestion.type] += value;
            currentQuestionIndex++;
            loadQuestion();
        } else {
            alert("Please select an answer!");
        }
    });
});
