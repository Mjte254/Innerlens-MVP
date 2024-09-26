document.getElementById('submitTest').addEventListener('click', calculatePersonality);

function calculatePersonality() {
    const form = document.getElementById('personalityTestForm');
    const formData = new FormData(form);

    let scores = {
        Analysts: 0,
        Diplomats: 0
    };

    // Calculating the Analysts score
    scores.Analysts += parseInt(formData.get('analyst_q1')) || 0;
    scores.Analysts += parseInt(formData.get('analyst_q2')) || 0;

    // Calculating the Diplomats score
    scores.Diplomats += parseInt(formData.get('diplomat_q1')) || 0;
    scores.Diplomats += parseInt(formData.get('diplomat_q2')) || 0;

    // Determine which group has the highest score
    const highestScoreGroup = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    // Generate the personality result based on the highest score
    let personality = '';
    if (highestScoreGroup === 'Analysts') {
        personality = identifyAnalysts(scores.Analysts);
    } else if (highestScoreGroup === 'Diplomats') {
        personality = identifyDiplomats(scores.Diplomats);
    }

    // Display the result
    displayResult(personality);
}

function identifyAnalysts(score) {
    if (score > 3) return 'INTJ (Architect)';
    if (score > 1) return 'INTP (Logician)';
    if (score > 0) return 'ENTJ (Commander)';
    return 'ENTP (Debater)';
}

function identifyDiplomats(score) {
    if (score > 3) return 'INFJ (Advocate)';
    if (score > 1) return 'INFP (Mediator)';
    if (score > 0) return 'ENFJ (Protagonist)';
    return 'ENFP (Campaigner)';
}

function displayResult(personality) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = `<h3>Your Personality Type: ${personality}</h3>`;
}