// ===== ROSE ANIMATION =====
const roseContainer = document.querySelector('.rose-container');
const roses = ['🌹', '🌹', '🌷', '💐'];

function createFallingRose() {
    const rose = document.createElement('div');
    rose.className = 'rose';
    rose.textContent = roses[Math.floor(Math.random() * roses.length)];
    
    const leftPosition = Math.random() * 100;
    const duration = 6 + Math.random() * 4; // 6-10 seconds
    
    rose.style.left = leftPosition + '%';
    rose.style.animationDuration = duration + 's';
    rose.style.animationDelay = Math.random() * 2 + 's';
    
    roseContainer.appendChild(rose);
    
    setTimeout(() => rose.remove(), (duration + 2) * 1000);
}

// Create roses continuously (every 1-2 seconds)
setInterval(createFallingRose, 1500);

// ===== SCREEN MANAGEMENT =====
function showScreen(screenNumber) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(`screen${screenNumber}`).classList.add('active');
}

// ===== AUDIO MANAGEMENT =====
const clickSound = document.getElementById('clickSound');
const loveSong = document.getElementById('loveSong');

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(err => console.log('Audio play failed:', err));
}

function startLoveSong() {
    loveSong.currentTime = 0;
    loveSong.play().catch(err => console.log('Audio play failed:', err));
}

// ===== SCREEN 1: THE QUESTION =====
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

yesBtn.addEventListener('click', () => {
    playClickSound();
    setTimeout(() => {
        startLoveSong();
        showScreen(2);
    }, 200);
});

// No button runs away on hover/touch
noBtn.addEventListener('mouseover', () => {
    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 200;
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 200;
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

// Reset on mouse leave
noBtn.addEventListener('mouseleave', () => {
    noBtn.style.transform = 'translate(0, 0)';
});

// ===== SCREEN 2: CELEBRATION =====
const nextBtn = document.getElementById('nextBtn');

nextBtn.addEventListener('click', () => {
    playClickSound();
    setTimeout(() => {
        showScreen(3);
    }, 200);
});

// ===== SCREEN 3: DATE PLANNING =====
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const vibeBtns = document.querySelectorAll('.vibe-btn');
const confirmBtn = document.getElementById('confirmBtn');

let selectedVibe = null;

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Vibe selection
vibeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        vibeBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedVibe = btn.getAttribute('data-vibe');
        checkFormComplete();
    });
});

// Check form completion
function checkFormComplete() {
    const date = dateInput.value;
    const time = timeInput.value;
    
    if (date && time && selectedVibe) {
        confirmBtn.disabled = false;
    } else {
        confirmBtn.disabled = true;
    }
}

dateInput.addEventListener('change', checkFormComplete);
timeInput.addEventListener('change', checkFormComplete);

// Confirm date selection
confirmBtn.addEventListener('click', () => {
    playClickSound();
    
    const date = new Date(dateInput.value);
    const time = timeInput.value;
    
    // Format date nicely
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    // Format time
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const formattedTime = `${displayHour}:${minutes} ${period}`;
    
    // Set ticket values
    document.getElementById('ticketDate').textContent = formattedDate;
    document.getElementById('ticketTime').textContent = formattedTime;
    document.getElementById('ticketVibe').textContent = selectedVibe;
    
    // Set ready text
    document.getElementById('readyText').textContent = `Be ready by ${formattedTime}, I'm coming to get you 🏎️`;
    
    setTimeout(() => {
        showScreen(4);
    }, 200);
});

// ===== INITIALIZATION =====
showScreen(1);
a
