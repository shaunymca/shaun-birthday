// Set the date of Shaun's birthday
const birthday = new Date('2024-12-27T00:00:00');

// Function to update the countdown
function updateCountdown() {
    const now = new Date();
    const diff = birthday - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('countdown').innerHTML = `
        <div class="countdown-item"><span class="countdown-value">${days}</span> Days</div>
        <div class="countdown-item"><span class="countdown-value">${hours}</span> Hours</div>
        <div class="countdown-item"><span class="countdown-value">${minutes}</span> Minutes</div>
    `;
}
// Call updateCountdown function every second
setInterval(updateCountdown, 1000);


function createConfetti(x, y) {
    const numParticles = 40 // Adjust the number of confetti particles as needed
    for (let i = 0; i < numParticles; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Calculate random position within a range of -100 to 100 pixels around the mouse cursor
        const offsetX = Math.random() * 1000 - 350;
        const offsetY = Math.random() * 1000 - 350;
        
        confetti.style.left = x + offsetX + 'px';
        confetti.style.top = y + offsetY + 'px';
        confetti.style.backgroundColor = getRandomColor();
        document.body.appendChild(confetti);
        
        // Remove the confetti after animation ends
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function confettiHandler(event) {
        const x = event.clientX;
        const y = event.clientY;
        createConfetti(x, y);    
}

document.getElementById('profile-image').addEventListener('mouseenter', confettiHandler);
