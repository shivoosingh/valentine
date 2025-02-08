let currentCard = 1;
const totalCards = 6;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });
    
    // Initialize button states
    updateButtonStates();
});

function startPresentation() {
    document.getElementById('introCard').classList.add('animate__animated', 'animate__fadeOutUp');
    setTimeout(() => {
        document.getElementById('introCard').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('mainContent').classList.add('animate__animated', 'animate__fadeIn');
        document.getElementById('card1').classList.remove('hidden');
        updateButtonStates();
    }, 1000);
}

function navigate(direction) {
    // Hide current card with animation
    const currentCardElement = document.getElementById(`card${currentCard}`);
    const animationOut = direction > 0 ? 'animate__slideOutLeft' : 'animate__slideOutRight';
    currentCardElement.classList.add('animate__animated', animationOut);
    
    setTimeout(() => {
        currentCardElement.classList.add('hidden');
        currentCardElement.classList.remove('animate__animated', animationOut);
        
        // Calculate new card number
        currentCard += direction;
        
        // Show new card with animation
        const newCardElement = document.getElementById(`card${currentCard}`);
        const animationIn = direction > 0 ? 'animate__slideInRight' : 'animate__slideInLeft';
        newCardElement.classList.remove('hidden');
        newCardElement.classList.add('animate__animated', animationIn);
        
        // Update progress bar with animation
        const progress = (currentCard / totalCards) * 100;
        document.querySelector('.progress-bar').style.width = `${progress}%`;
        
        updateButtonStates();
        
        // Remove animation classes after animation completes
        setTimeout(() => {
            newCardElement.classList.remove('animate__animated', animationIn);
        }, 1000);
    }, 500);
}

function updateButtonStates() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const proposalBtn = document.getElementById('proposalBtn');
    
    // Update Previous button
    if (currentCard === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-block';
    }
    
    // Update Next button and Proposal button
    if (currentCard === totalCards) {
        nextBtn.style.display = 'none';
        proposalBtn.classList.remove('hidden');
    } else {
        nextBtn.style.display = 'inline-block';
        proposalBtn.classList.add('hidden');
    }
}

function calculateCompatibility() {
    const resultElement = document.getElementById('compatibilityResult');
    // const imageElement = document.querySelector('#card4 .gif-container img');
    const titleElement = document.querySelector('#card4 .card-title');
    const textElement = document.querySelector('#card4 .card-text');
    
    // Change the image
    // imageElement.src ='../assets/love.png';
    
    // Change the title to h6 and update text
    titleElement.outerHTML = '<h6 style="font-size: 1.2rem;" class="card-title">See? Told you! 😏</h6>';
    textElement.innerHTML = "";
    
    
    // Show the result text with animation
    resultElement.classList.remove('hidden');
    resultElement.classList.add('animate__animated', 'animate__fadeIn');
    resultElement.innerHTML = "OMG, it's infinity... WTH?! I've never seen this before! I think he's telling you the truth😱😱";
    
    // Add some fun animation to the result
    setTimeout(() => {
        resultElement.classList.add('animate__pulse');
    }, 500);
}