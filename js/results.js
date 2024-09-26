// Fetch results from the server
fetch('/submit', {
    method: 'POST',
    body: new URLSearchParams(new FormData(document.querySelector('form')))
})
.then(response => response.json())
.then(data => {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (data.error) {
        resultsContainer.innerHTML = `<div class="result-item"><strong>Error:</strong> ${data.error}</div>`;
    } else {
        resultsContainer.innerHTML = `
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
    }
})
.catch(error => {
    console.error('Error fetching results:', error);
});