document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        resultDiv.classList.remove('hidden');
        document.getElementById('predictedClass').textContent = data.class;
        document.getElementById('percentageGrassy').textContent = data.percentages.Grassy;
        document.getElementById('percentageMarshy').textContent = data.percentages.Marshy;
        document.getElementById('percentageRocky').textContent = data.percentages.Rocky;
        document.getElementById('percentageSandy').textContent = data.percentages.Sandy;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});