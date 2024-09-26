document.addEventListener('DOMContentLoaded', function() {
       const questions = [
        { id: "analyticalThinking", label: "How much do you agree with the statement: 'I enjoy analytical thinking.'" },
        { id: "creativity", label: "How much do you agree with the statement: 'I am very creative.'" },
        { id: "organization", label: "How much do you agree with the statement: 'I am very organized.'" },
        { id: "adaptability", label: "How much do you agree with the statement: 'I adapt quickly to new situations.'" },
        { id: "analyticalThinking2", label: "How much do you agree with the statement: 'I enjoy solving complex problems.'" },
        { id: "creativity2", label: "How much do you agree with the statement: 'I often think outside the box.'" },
        { id: "organization2", label: "How much do you agree with the statement: 'I prefer to follow a set routine.'" },
        { id: "adaptability2", label: "How much do you agree with the statement: 'I enjoy trying new activities.'" },
        { id: "analyticalThinking3", label: "How much do you agree with the statement: 'I enjoy working on data-driven tasks.'" },
        { id: "creativity3", label: "How much do you agree with the statement: 'I like to create new ideas.'" },
        { id: "organization3", label: "How much do you agree with the statement: 'I like to keep my space organized.'" },
        { id: "adaptability3", label: "How much do you agree with the statement: 'I enjoy exploring new cultures.'" },
        { id: "analyticalThinking4", label: "How much do you agree with the statement: 'I excel in analyzing complex information.'" },
        { id: "creativity4", label: "How much do you agree with the statement: 'I enjoy expressing myself through art.'" },
        { id: "organization4", label: "How much do you agree with the statement: 'I follow a structured approach to tasks.'" },
        { id: "adaptability4", label: "How much do you agree with the statement: 'I thrive in dynamic environments.'" }
    ];

    let currentQuestion = 0;
    const questionContainer = document.getElementById('questionsContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const resultContainer = document.getElementById('resultContainer');
    const form = document.getElementById('questionForm');

    function showQuestion(index) {
        questionContainer.innerHTML = '';
        if (index < 0 || index >= questions.length) return;

        const question = questions[index];
        questionContainer.innerHTML = `
            <p>${question.label}</p>
            <label><input type="radio" name="${question.id}" value="Strongly Agree" required> Strongly Agree</label><br>
            <label><input type="radio" name="${question.id}" value="Agree"> Agree</label><br>
            <label><input type="radio" name="${question.id}" value="Neutral"> Neutral</label><br>
            <label><input type="radio" name="${question.id}" value="Disagree"> Disagree</label><br>
            <label><input type="radio" name="${question.id}" value="Strongly Disagree"> Strongly Disagree</label>
        `;

        prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
        nextBtn.style.display = index === questions.length - 1 ? 'none' : 'inline-block';
        submitBtn.style.display = index === questions.length - 1 ? 'inline-block' : 'none';
    }

    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultContainer.innerHTML = `<div class="result-item"><strong>Error:</strong> ${data.error}</div>`;
            } else {
                resultContainer.innerHTML = `
                    <div class="result-item">
                        <strong>Personality Type:</strong> ${data.personality_type}
                    </div>
                    <div class="result-item">
                        <strong>Description:</strong> ${data.description}
                    </div>
                    <div class="result-item">
                        <strong>Strengths:</strong> ${data.strengths.join(', ')}
                    </div>
                    <div class="result-item">
                        <strong>Growth Areas:</strong> ${data.growth.join(', ')}
                    </div>
                    <div class="result-item">
                        <strong>Metaphor:</strong> ${data.metaphor}
                    </div>
                `;
                resultContainer.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error fetching results:', error);
        });
    });

    // Show the first question on page load
    showQuestion(currentQuestion);
});