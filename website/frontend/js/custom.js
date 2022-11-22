const launchButton = document.getElementById('launch');

launchButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    alert('launch app');

    window.open("http://localhost:3000", "Pharus", "width=400,height=600")
});