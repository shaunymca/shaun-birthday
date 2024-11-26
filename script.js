document.addEventListener('DOMContentLoaded', () => {
    // Firebase configuration
    const firebaseConfig = {
        // You'll need to replace these with your Firebase project details
        apiKey: "AIzaSyAo7y5O3wPYJmkXHt17-NcS2FW8v_7QOBs",
        authDomain: "birthdaychat-39827.firebaseapp.com",
        databaseURL: "https://birthdaychat-39827-default-rtdb.firebaseio.com/",
        projectId: "birthdaychat-39827",
        storageBucket: "birthdaychat-39827.firebasestorage.app",
        messagingSenderId: "472042379204",
        appId: "1:472042379204:web:443bc062427f45fcdfb691"
    };

    // Initialize Firebase with error handling
    try {
        firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        const chatRef = database.ref('chat');

        // Chat UI elements
        const chatButton = document.getElementById('chat-button');
        const chatPopup = document.getElementById('chat-popup');
        const closeChat = document.getElementById('close-chat');
        const chatMessages = document.getElementById('chat-messages');
        const messageInput = document.getElementById('message-input');
        const usernameInput = document.getElementById('username');
        const sendButton = document.getElementById('send-button');
        const notificationSound = document.getElementById('notification-sound');
        let isWindowActive = true;

        // Track window focus
        window.onfocus = () => { isWindowActive = true; };
        window.onblur = () => { isWindowActive = false; };

        function scrollToBottom() {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function playNotificationSound() {
            // Only play sound if the window is not active
            if (!isWindowActive) {
                notificationSound.currentTime = 0; // Reset sound to start
                notificationSound.play().catch(e => console.log('Error playing sound:', e));
            }
        }

        // Chat toggle functionality
        chatButton.addEventListener('click', () => {
            chatPopup.classList.remove('hidden');
            setTimeout(scrollToBottom, 100); // Small delay to ensure chat is visible
        });

        closeChat.addEventListener('click', () => {
            chatPopup.classList.add('hidden');
        });

        // Chat message functionality with error handling
        chatRef.on('child_added', (snapshot) => {
            try {
                const message = snapshot.val();
                addMessage(message);
            } catch (error) {
                console.error('Error loading message:', error);
            }
        }, (error) => {
            console.error('Error connecting to Firebase:', error);
        });

        function addMessage(message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'chat-message';
            messageDiv.textContent = `${message.username}: ${message.text}`;
            chatMessages.appendChild(messageDiv);
            
            // Play sound and scroll to bottom
            playNotificationSound();
            scrollToBottom();
        }

        async function sendMessage() {
            const text = messageInput.value.trim();
            const username = usernameInput.value.trim() || 'Anonymous';
            
            if (text) {
                try {
                    await chatRef.push({
                        username: username,
                        text: text,
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    });
                    messageInput.value = '';
                } catch (error) {
                    console.error('Error sending message:', error);
                    alert('Failed to send message. Please try again.');
                }
            }
        }

        sendButton.onclick = sendMessage;
        messageInput.onkeypress = (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        };

    } catch (error) {
        console.error('Error initializing Firebase:', error);
    }
});

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