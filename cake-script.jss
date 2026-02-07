// ===== PAGE 2: BALLOON POPPING GAME =====

document.addEventListener('DOMContentLoaded', function() {
    console.log("🎈 Balloon page loaded!");
    
    // ===== CONFIGURATION =====
    const CONFIG = {
        totalBalloons: 15,
        // ===== YOUR 15 MESSAGES HERE =====
        balloonMessages: [
            // Balloon 1
            "You have the best sense of humour.",
            // Balloon 2
            "You are th kindest person i know.",
            // Balloon 3
            "I hope you never get child married because i want to marry you.",
            // Balloon 4
            "You are the prettiest girl in my life.",
            // Balloon 5
            "I hope you know whenever anyhting happens, i wonder how id be so happy to tell you",
            // Balloon 6
            "Never have i ever had a friend as best as you.",
            // Balloon 7
            "I cannot explain the amoutn of love i have for you.",
            // Balloon 8
            "Youve never made me feel alone or hurt or sad.",
            // Balloon 9
            "When you text me, i jsut wanna kiss you and hug you.",
            // Balloon 10
            "Youre the most kissable person ever and no man deserves you.",
            // Balloon 11
            "i hope you never ever have to deal with a m*nchild",
            // Balloon 12
            "We can be 75 and still listen to olivia at the nursing home and cuss out m*n",
            // Balloon 13
            "Stop saying you dont like your nose, all your features look straight out of apsara. ",
            // Balloon 14
            "I wish we lived closer, i wish we were even a little bit close to each other.",
            // Balloon 15
            "I will always love you, cherish you, and supprt you (even if you kill a m*n)."
        ],
        // ===== YOUR FINAL MESSAGE =====
        finalMessage: "Happiest Birthday to my favourite autistic lesbian, who is also my dyslexic randi naukrani, and my most most favourite baby, i love you so so so much.",
        // ===== REDIRECT TO NEXT PAGE =====
        nextPage: "letter.html" // CHANGE THIS to your Page 3 filename
    };
    
    // ===== CREATE BACKGROUND CONFETTI =====
    function createConfetti() {
        const bg = document.getElementById('partyBackground');
        
        // Create 100 confetti pieces
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-particle';
            
            // Random shape
            const shapes = ['confetti-square', 'confetti-heart', 'confetti-star'];
            confetti.classList.add(shapes[Math.floor(Math.random() * shapes.length)]);
            
            // Random position and animation
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDelay = `${Math.random() * 15}s`;
            confetti.style.animationDuration = `${10 + Math.random() * 10}s`;
            
            bg.appendChild(confetti);
        }
    }
    
    // ===== CREATE 15 BALLOONS =====
    function createBalloons() {
        const container = document.getElementById('balloonsContainer');
        const stringsContainer = document.getElementById('stringsContainer');
        const totalElement = document.getElementById('totalBalloons');
        
        totalElement.textContent = CONFIG.totalBalloons;
        
        // Clear any existing
        container.innerHTML = '';
        stringsContainer.innerHTML = '';
        
        // Create balloon positions (spread across top of screen)
        const positions = [];
        for (let i = 0; i < CONFIG.totalBalloons; i++) {
            const left = 5 + (i * (90 / (CONFIG.totalBalloons - 1)));
            const top = 10 + Math.random() * 40;
            positions.push({ left, top });
        }
        
        // Create each balloon
        positions.forEach((pos, index) => {
            // Create balloon
            const balloon = document.createElement('div');
            balloon.className = 'pixel-balloon';
            
            // Random color
            const colors = ['balloon-color1', 'balloon-color2', 'balloon-color3', 'balloon-color4', 'balloon-color5'];
            balloon.classList.add(colors[Math.floor(Math.random() * colors.length)]);
            
            // Position
            balloon.style.left = `${pos.left}%`;
            balloon.style.top = `${pos.top}%`;
            
            // Animation delay
            balloon.style.animationDelay = `${Math.random() * 3}s`;
            
            // Data attribute for message
            balloon.dataset.index = index;
            balloon.dataset.message = CONFIG.balloonMessages[index] || `Message ${index + 1}: You're amazing!`;
            
            // Click event
            balloon.addEventListener('click', function(e) {
                e.stopPropagation();
                popBalloon(this, index);
            });
            
            container.appendChild(balloon);
            
            // Create string
            const string = document.createElement('div');
            string.className = 'balloon-string';
            string.style.left = `${pos.left + 2.5}%`;
            string.style.top = `${pos.top + 70}%`;
            string.style.height = `${40 + Math.random() * 100}px`;
            string.style.transform = `rotate(${-5 + Math.random() * 10}deg)`;
            
            stringsContainer.appendChild(string);
        });
        
        console.log(`🎈 Created ${CONFIG.totalBalloons} balloons`);
    }
    
    // ===== POP A BALLOON =====
    function popBalloon(balloonElement, balloonIndex) {
        // Already popped?
        if (balloonElement.classList.contains('popped')) return;
        
        // Mark as popped
        balloonElement.classList.add('popped');
        
        // Play pop sound
        const sound = document.getElementById('popSound');
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log("Sound error:", e));
        }
        
        // Show message
        const message = balloonElement.dataset.message;
        document.getElementById('messageDisplay').textContent = message;
        
        // Create burst effect particles
        createBurstParticles(balloonElement);
        
        // Update counter
        const poppedCount = document.querySelectorAll('.pixel-balloon.popped').length;
        document.getElementById('poppedCount').textContent = poppedCount;
        
        // Update progress bar
        const progress = (poppedCount / CONFIG.totalBalloons) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        
        // Check if all balloons are popped
        if (poppedCount === CONFIG.totalBalloons) {
            allBalloonsPopped();
        }
        
        console.log(`💥 Balloon ${balloonIndex + 1} popped!`);
    }
    
    // ===== BURST PARTICLE EFFECT =====
    function createBurstParticles(balloon) {
        const rect = balloon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create 8 burst particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.backgroundColor = getComputedStyle(balloon).backgroundColor;
            particle.style.borderRadius = '50%';
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            particle.style.zIndex = '15';
            particle.style.pointerEvents = 'none';
            
            document.body.appendChild(particle);
            
            // Animate outward
            const angle = (i * 45) * Math.PI / 180;
            const distance = 30 + Math.random() * 30;
            
            particle.animate([
                { transform: 'translate(0,0) scale(1)', opacity: 1 },
                { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => {
                document.body.removeChild(particle);
            };
        }
    }
    
    // ===== ALL BALLOONS POPPED =====
    function allBalloonsPopped() {
        console.log("🎉 All balloons popped!");
        
        // Play celebration sound
        const celebrationSound = document.getElementById('celebrationSound');
        if (celebrationSound) {
            celebrationSound.currentTime = 0;
            celebrationSound.play();
        }
        
        // Show final message
        document.getElementById('messageDisplay').textContent = CONFIG.finalMessage;
        
        // Show next button
        const nextBtn = document.getElementById('nextButton');
        nextBtn.style.display = 'block';
        
        // Add celebration confetti
        createFinalConfetti();
        
        console.log("✨ Ready for next page!");
    }
    
    // ===== FINAL CONFETTI BURST =====
    function createFinalConfetti() {
        const container = document.getElementById('partyBackground');
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-particle';
            confetti.classList.add('confetti-star');
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDuration = '2s';
            confetti.style.animationDelay = '0s';
            
            container.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 2000);
        }
    }
    
    // ===== NEXT BUTTON =====
    document.getElementById('nextButton').addEventListener('click', function() {
        console.log("➡️ Moving to songs page...");
        
        // Add transition effect
        this.textContent = "To the stars... ✨";
        this.disabled = true;
        
        // ===== CHANGE THIS DELAY IF NEEDED =====
        setTimeout(() => {
            window.location.href = CONFIG.nextPage;
        }, 1500);
    });
    
    // ===== INITIALIZE EVERYTHING =====
    createConfetti();
    createBalloons();
    
    console.log("🚀 Balloon page ready!");
});