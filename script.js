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
        
        document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.style.width = '30%'; // Set the width to the final value
        });

        // Update progress bar widths based on confidence scores
        document.getElementById('predictedClass').textContent = data.class;
        document.getElementById('percentageGrassy').textContent = data.percentages.Grassy;
        document.getElementById('percentageMarshy').textContent = data.percentages.Marshy;
        document.getElementById('percentageRocky').textContent = data.percentages.Rocky;
        document.getElementById('percentageSandy').textContent = data.percentages.Sandy;

        // Calculate progress bar widths based on confidence scores (adjust the widths as needed)
        const grassyWidth = data.percentages.Grassy;
        const marshyWidth = data.percentages.Marshy;
        const rockyWidth = data.percentages.Rocky;
        const sandyWidth = data.percentages.Sandy;

        document.getElementById('progressGrassy').style.width = grassyWidth + '%';
        document.getElementById('progressMarshy').style.width = marshyWidth + '%';
        document.getElementById('progressRocky').style.width = rockyWidth + '%';
        document.getElementById('progressSandy').style.width = sandyWidth + '%';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});