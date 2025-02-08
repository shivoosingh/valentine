// Create floating hearts animation
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.opacity = Math.random();
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.animation = 'floatUp linear forwards';
    heart.style.animationDuration = '5s';
    
    document.querySelector('.floating-hearts').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

// Add this to your CSS
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes floatUp {
            from {
                transform: translateY(100vh) rotate(0deg);
            }
            to {
                transform: translateY(-100vh) rotate(360deg);
            }
        }
    </style>
`);

// Simple background music autoplay
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.play();
});

// Add carousel slide event handler
document.getElementById('letterCarousel').addEventListener('slide.bs.carousel', function (event) {
    const continueBtn = document.getElementById('continueBtn');
    // Show continue button only on last slide (index 4)
    if (event.to === 4) {
        continueBtn.classList.remove('d-none');
    } else {
        continueBtn.classList.add('d-none');
    }
});