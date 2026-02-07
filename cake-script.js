// ===== PAGE 2: INTERACTIVE CAKE =====

document.addEventListener('DOMContentLoaded', function() {
    console.log("🎂 Cake page loaded!");
    
    // ===== CONFIGURATION =====
    const CONFIG = {
        totalCandles: 15, // Number of candles
        // ===== YOUR MESSAGES HERE =====
        // Add 15 messages (one for each candle)
        candleMessages: [
            // Candle 1
            "YOUR MESSAGE FOR CANDLE 1 HERE",
            // Candle 2
            "YOUR MESSAGE FOR CANDLE 2 HERE",
            // Candle 3
            "YOUR MESSAGE FOR CANDLE 3 HERE",
            // Candle 4
            "YOUR MESSAGE FOR CANDLE 4 HERE",
            // Candle 5
            "YOUR MESSAGE FOR CANDLE 5 HERE",
            // Candle 6
            "YOUR MESSAGE FOR CANDLE 6 HERE",
            // Candle 7
            "YOUR MESSAGE FOR CANDLE 7 HERE",
            // Candle 8
            "YOUR MESSAGE FOR CANDLE 8 HERE",
            // Candle 9
            "YOUR MESSAGE FOR CANDLE 9 HERE",
            // Candle 10
            "YOUR MESSAGE FOR CANDLE 10 HERE",
            // Candle 11
            "YOUR MESSAGE FOR CANDLE 11 HERE",
            // Candle 12
            "YOUR MESSAGE FOR CANDLE 12 HERE",
            // Candle 13
            "YOUR MESSAGE FOR CANDLE 13 HERE",
            // Candle 14
            "YOUR MESSAGE FOR CANDLE 14 HERE",
            // Candle 15
            "YOUR MESSAGE FOR CANDLE 15 HERE"
        ],
        // ===== YOUR FINAL WISH MESSAGE =====
        finalWishMessage: "YOUR FINAL WISH MESSAGE HERE (appears after all candles lit)",
        // ===== REDIRECT TO NEXT PAGE =====
        nextPage: "page3.html" // CHANGE THIS to your page 3 filename
    };
    
    // ===== MASSIVE PARTY BACKGROUND =====
    function createPartyBackground() {
        const bg = document.getElementById('partyBackground');
        
        // Create 150 confetti pieces
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-particle';
            
            // Random shape
            const shapes = ['confetti-square', 'confetti-heart', 'confetti-circle', 'confetti-star'];
            confetti.classList.add(shapes[Math.floor(Math.random() * shapes.length)]);
            
            // Random position and animation
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDelay = `${Math.random() * 15}s`;
            confetti.style.animationDuration = `${10 + Math.random() * 10}s`;
            
            bg.appendChild(confetti);
        }
        
        // Create 50 balloons
        for (let i = 0; i < 50; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'party-balloon';
            
            // Random color
            const colors = ['balloon-pink', 'balloon-blue', 'balloon-yellow', 'balloon-green'];
            balloon.classList.add(colors[Math.floor(Math.random() * colors.length)]);
            
            // Random position and animation
            balloon.style.left = `${Math.random() * 100}vw`;
            balloon.style.animationDelay = `${Math.random() * 25}s`;
            balloon.style.animationDuration = `${20 + Math.random() * 15}s`;
            
            bg.appendChild(balloon);
        }
        
        console.log(`✨ Created 150 confetti and 50 balloons!`);
    }
    
    // ===== CREATE CANDLES =====
    function createCandles() {
        const container = document.getElementById('candlesContainer');
        const totalCandles = document.getElementById('totalCandles');
        totalCandles.textContent = CONFIG.totalCandles;
        
        // Clear any existing candles
        container.innerHTML = '';
        
        for (let i = 0; i < CONFIG.totalCandles; i++) {
            const candle = document.createElement('div');
            candle.className = 'pixel-candle';
            candle.dataset.index = i;
            
            // Create flame
            const flame = document.createElement('div');
            flame.className = 'candle-flame';
            candle.appendChild(flame);
            
            // Click event
            candle.addEventListener('click', function() {
                if (!this.classList.contains('lit')) {
                    lightCandle(this, i);
                }
            });
            
            container.appendChild(candle);
        }
        
        console.log(`🕯️ Created ${CONFIG.totalCandles} candles`);
    }
    
    // ===== LIGHT A CANDLE =====
    function lightCandle(candleElement, candleIndex) {
        // Mark as lit
        candleElement.classList.add('lit');
        
        // Play sound
        const sound = document.getElementById('candleSound');
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log("Sound error:", e));
        }
        
        // Show message
        const message = CONFIG.candleMessages[candleIndex] || 
                       `Wish #${candleIndex + 1}: You're amazing!`;
        document.getElementById('messageDisplay').textContent = message;
        
        // Update counter
        const litCandles = document.querySelectorAll('.pixel-candle.lit').length;
        document.getElementById('litCount').textContent = litCandles;
        
        // Update progress bar
        const progress = (litCandles / CONFIG.totalCandles) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        
        // Check if all candles are lit
        if (litCandles === CONFIG.totalCandles) {
            allCandlesLit();
        }
        
        console.log(`🕯️ Candle ${candleIndex + 1} lit!`);
    }
    
    // ===== ALL CANDLES LIT =====
    function allCandlesLit() {
        console.log("🎉 All candles lit!");
        
        // Play celebration sound
        const completeSound = document.getElementById('completeSound');
        if (completeSound) {
            completeSound.currentTime = 0;
            completeSound.play();
        }
        
        // Show final message
        document.getElementById('messageDisplay').textContent = CONFIG.finalWishMessage;
        
        // Show next button
        const nextBtn = document.getElementById('nextButton');
        nextBtn.style.display = 'block';
        
        // Add celebration effect (optional)
        document.body.style.animation = 'celebrate 0.5s 3';
        
        console.log("✨ Ready for wish!");
    }
    
    // ===== NEXT BUTTON =====
    document.getElementById('nextButton').addEventListener('click', function() {
        console.log("➡️ Moving to next page...");
        
        // Add transition effect
        this.textContent = "Making wish... ✨";
        this.disabled = true;
        
        // ===== CHANGE THIS DELAY IF NEEDED =====
        setTimeout(() => {
            window.location.href = CONFIG.nextPage;
        }, 1500);
    });
    
    // ===== INITIALIZE EVERYTHING =====
    createPartyBackground();
    createCandles();
    
    console.log("🚀 Cake page ready!");
});

// Celebration animation
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrate {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
`;
document.head.appendChild(style);