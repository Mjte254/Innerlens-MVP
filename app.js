document.addEventListener("DOMContentLoaded", function() {
    const startTestBtn = document.getElementById("startTestBtn");
    const nextBtn = document.getElementById("nextBtn");
    const testSection = document.getElementById("testSection");
    const resultSection = document.getElementById("resultSection");
    const questionBox = document.getElementById("questionBox");
    const personalityResult = document.getElementById("personalityResult");
    const landingSection = document.querySelector(".land");

    // Event listener for Start Test button
    startTestBtn.addEventListener("click", function() {
        landingSection.style.display = "none"; // Hide landing section
        testSection.style.display = "block"; // Show test section
    });

    // Questions with the type that corresponds to each MBTI dimension
    const questions = [
        { text: "I enjoy socializing with large groups of people.", type: "extraversion" },
        { text: "I prefer detailed tasks over brainstorming new ideas.", type: "sensing" },
        { text: "I make decisions more based on logic than feelings.", type: "thinking" },
        { text: "I feel more comfortable when I have a detailed plan.", type: "judging" },
        { text: "I often prefer to spend time alone to recharge.", type: "introversion" },
        { text: "I focus more on future possibilities than immediate realities.", type: "intuition" },
        { text: "I often prioritize relationships and harmony over objective truth.", type: "feeling" },
        { text: "I like to be spontaneous and go with the flow.", type: "perceiving" }
    ];
    
    let currentQuestionIndex = 0;
    let personalityScores = {
        extraversion: 0,
        introversion: 0,
        sensing: 0,
        intuition: 0,
        thinking: 0,
        feeling: 0,
        judging: 0,
        perceiving: 0
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

    // Function to show the final result
    function showResult() {
        testSection.style.display = "none";
        resultSection.style.display = "block";

        // Determine each dimension of personality based on scores
        let result = "";

        result += (personalityScores.extraversion >= personalityScores.introversion) ? "E" : "I";
        result += (personalityScores.sensing >= personalityScores.intuition) ? "S" : "N";
        result += (personalityScores.thinking >= personalityScores.feeling) ? "T" : "F";
        result += (personalityScores.judging >= personalityScores.perceiving) ? "J" : "P";

        // Display the final personality type
        personalityResult.textContent = "Your personality type is: " + result;
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

            // Adjust personality scores based on the answer
            if (currentQuestion.type === "extraversion") {
                personalityScores.extraversion += value;
            } else if (currentQuestion.type === "introversion") {
                personalityScores.introversion += value;
            } else if (currentQuestion.type === "sensing") {
                personalityScores.sensing += value;
            } else if (currentQuestion.type === "intuition") {
                personalityScores.intuition += value;
            } else if (currentQuestion.type === "thinking") {
                personalityScores.thinking += value;
            } else if (currentQuestion.type === "feeling") {
                personalityScores.feeling += value;
            } else if (currentQuestion.type === "judging") {
                personalityScores.judging += value;
            } else if (currentQuestion.type === "perceiving") {
                personalityScores.perceiving += value;
            }

            currentQuestionIndex++;
            loadQuestion();
        } else {
            alert("Please select an answer!");
        }
    });
});
