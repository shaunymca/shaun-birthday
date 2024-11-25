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

        // Chat toggle functionality
        chatButton.addEventListener('click', () => {
            chatPopup.classList.remove('hidden');
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
            chatMessages.scrollTop = chatMessages.scrollHeight;
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
