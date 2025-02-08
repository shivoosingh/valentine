        // No button interaction
        const noBtn = document.querySelector('.no-btn');
        const proposalCard = document.querySelector('.proposal-card');
        
        const messages = [
            "Come on baby wtf😢",
            "Really? Think again! 💭",
            "Don't be like that! 🥺",
            "You're breaking my heart 💔",
            "Give me a chance! 🙏",
            "Pretty please! 🌹",
            "Don't be mean! 😭",
            "Is that your final answer? 🤔",
            "You can't mean that😩",
            "But we're perfect together! ✨"
        ];

        const reactionImages = [
            "https://media1.giphy.com/media/jRtGjzkm8JbRC/200.gif", // Crying cat
            "https://media0.giphy.com/media/OPU6wzx8JrHna/200.gif", // Crying kid
            "https://media3.giphy.com/media/L95W4wv8nnb9K/200.gif", // Sad puppy
            "https://media2.giphy.com/media/PHZ7v9tfQu0o0/200.gif", // Broken heart
            "https://media3.giphy.com/media/3o6wrvdHFbwBrUFenu/200.gif", // Pleading eyes
            "https://media4.giphy.com/media/BEob5qwFkSJ7G/200.gif", // Sad cartoon
            "https://media2.giphy.com/media/11HxElzKUMmBxu/200.gif", // Crying anime
            "https://media1.giphy.com/media/d2lcHJTG5Tscg/200.gif", // Michael Scott crying
            "https://media2.giphy.com/media/10tIjpzIu8fe0/200.gif", // Sad panda
            "https://media1.giphy.com/media/7SF5scGB2AFrgsXP63/200.gif" // Cute pleading
        ];

        let messageIndex = 0;
        let imageIndex = 0;

        const boomSound = document.getElementById('boomSound');
        
        function playBoomSound() {
            boomSound.currentTime = 0; // Reset sound to start
            boomSound.play().catch(err => console.log('Audio play failed:', err));
        }

        function createReactionImage() {
            const img = document.createElement('img');
            img.className = 'reaction-image';
            img.src = reactionImages[imageIndex];
            
            // Random position around the button
            const randomX = Math.random() * (proposalCard.offsetWidth - 150);
            const randomY = Math.random() * (proposalCard.offsetHeight - 150);
            
            img.style.left = `${randomX}px`;
            img.style.top = `${randomY}px`;
            
            proposalCard.appendChild(img);
            
    
            setTimeout(() => {
                img.style.opacity = '0';
                img.style.transform = 'scale(0)';
                setTimeout(() => img.remove(), 300);
            }, 800); 

            imageIndex = (imageIndex + 1) % reactionImages.length;
        }

        function moveButton() {
            playBoomSound(); // Play sound effect
            const buttonRect = noBtn.getBoundingClientRect();
            const parentRect = noBtn.parentElement.getBoundingClientRect();
            
            // Calculate random position within parent boundaries
            const maxX = parentRect.width - buttonRect.width;
            const maxY = parentRect.height - buttonRect.height;
            
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            
            noBtn.style.position = 'absolute';
            noBtn.style.left = `${randomX}px`;
            noBtn.style.top = `${randomY}px`;
            
            // Change button text
            noBtn.textContent = messages[messageIndex];
            messageIndex = (messageIndex + 1) % messages.length;
            
            // Add some rotation for fun
            const rotation = Math.random() * 20 - 10;
            noBtn.style.transform = `rotate(${rotation}deg)`;

            // Create reaction image
            createReactionImage();
        }

        // Remove mouseover event and only keep click event
        noBtn.addEventListener('click', moveButton);

        // Make sure the button stays within viewport on mobile
        function updateButtonPosition() {
            const buttonRect = noBtn.getBoundingClientRect();
            const parentRect = noBtn.parentElement.getBoundingClientRect();
            
            if (!parentRect.contains(buttonRect)) {
                noBtn.style.left = '50%';
                noBtn.style.top = '50%';
                noBtn.style.transform = 'translate(-50%, -50%)';
            }
        }

        window.addEventListener('resize', updateButtonPosition);


        // Add yes button interaction
        const yesBtn = document.querySelector('.yes-btn');
        const messageDiv = document.getElementById('message');
        const cheerSound = document.getElementById('cheerSound');
        
        const loveMessages = [
            "I knew you'd say yes 🥰",
        ];

        function playCheerSound() {
            cheerSound.currentTime = 0;
            cheerSound.play().catch(err => console.log('Audio play failed:', err));
        }

        function showSuccessMessage() {
            // Play cheer sound
            playCheerSound();

            // Show the message div
            messageDiv.classList.remove('hidden');

            // Random love message
            const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
            messageDiv.querySelector('h3').textContent = randomMessage;

            // Show the message button container
            messageDiv.querySelector('.message-btn-container').classList.remove('hidden');

            // Hide the buttons container with animation
            const buttonsContainer = document.querySelector('.buttons-container');
            buttonsContainer.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(() => {
                buttonsContainer.style.display = 'none';
            }, 500);
        }

        yesBtn.addEventListener('click', showSuccessMessage);

        // Create floating hearts background
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'floating-hearts';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 2 + 's';
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }

        setInterval(createHeart, 300);

        // google form

        const scriptURL = 'https://script.google.com/macros/s/AKfycbwx39n5HHd8szhZ_3A1XcPpLhIyNL2q7up71o_MJwjC7lQxiJ8JutVkzWTkDHW_4tDM/exec'
        const form = document.forms['submit-to-google-sheet']
        const msg = document.getElementById('msg')

        form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
            msg.style.display = 'block'
            msg.querySelector('.message-text').textContent = "Message sent successfully! 💖"
            msg.classList.add('show')
            
            setTimeout(function(){
                msg.classList.remove('show')
                setTimeout(() => {
                msg.style.display = 'none'
                }, 500)
            }, 3000)
            
            form.reset()
            })
            .catch(error => {
            msg.style.display = 'block'
            msg.classList.add('show', 'alert-danger')
            msg.querySelector('.message-text').textContent = "Error sending message! 😢"
            })
        })

