// ===== PAGE 3: PERSONAL LETTER PAGE =====

document.addEventListener('DOMContentLoaded', function() {
    console.log("💌 Letter page loaded!");
    
    // ===== CONFIGURATION =====
    const CONFIG = {
        // ===== YOUR LETTER CONTENT =====
        // (You can also edit this directly in the HTML)
        
        // ===== REDIRECT TO NEXT PAGE =====
        nextPage: "songs.html" // CHANGE THIS to your Page 4 (songs) filename
    };
    
    // ===== ELEMENTS =====
    const envelope = document.getElementById('envelope');
    const instruction = document.getElementById('instruction');
    const letterContainer = document.getElementById('letterContainer');
    const continueBtn = document.getElementById('continueBtn');
    const envelopeSound = document.getElementById('envelopeSound');
    const pageSound = document.getElementById('pageSound');
    
    // ===== ENVELOPE CLICK =====
    let envelopeOpened = false;
    
    envelope.addEventListener('click', function() {
        if (envelopeOpened) return;
        
        envelopeOpened = true;
        
        // Play envelope sound
        if (envelopeSound) {
            envelopeSound.currentTime = 0;
            envelopeSound.play().catch(e => console.log("Sound error:", e));
        }
        
        // Open envelope animation
        this.classList.add('open');
        
        // Hide instruction
        instruction.style.opacity = '0';
        
        // Show letter after delay
        setTimeout(() => {
            // Hide instruction completely
            instruction.style.display = 'none';
            
            // Play page sound
            if (pageSound) {
                pageSound.currentTime = 0;
                pageSound.play().catch(e => console.log("Sound error:", e));
            }
            
            // Show letter with animation
            letterContainer.style.display = 'block';
            
            // Add a little floating effect to hearts
            const hearts = document.querySelectorAll('.floating-heart');
            hearts.forEach(heart => {
                heart.style.animationDuration = '3s';
            });
            
            console.log("✉️ Letter opened!");
            
            // Auto-scroll to letter after a moment
            setTimeout(() => {
                letterContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Show continue button after reading time
                setTimeout(showContinueButton, 3000);
            }, 500);
            
        }, 800); // Wait for envelope animation to complete
    });
    
    // ===== SHOW CONTINUE BUTTON =====
    function showContinueButton() {
        continueBtn.style.display = 'block';
        
        // Fade in animation
        setTimeout(() => {
            continueBtn.style.opacity = '1';
            continueBtn.style.transform = 'translateY(0)';
        }, 100);
        
        console.log("➡️ Continue button shown");
    }
    
    // ===== CONTINUE BUTTON =====
    continueBtn.addEventListener('click', function() {
        console.log("🌟 Moving to songs page...");
        
        // Disable button and show loading state
        this.disabled = true;
        this.textContent = "To the stars... ✨";
        
        // Add fade out effect to page
        document.body.style.animation = 'fadeOut 1s forwards';
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = CONFIG.nextPage;
        }, 1200);
    });
    
    // ===== SCROLL DETECTION =====
    // Optional: Show continue button when user scrolls to bottom of letter
    let continueButtonShown = false;
    
    window.addEventListener('scroll', function() {
        if (continueButtonShown || !envelopeOpened) return;
        
        const letterRect = letterContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // If letter is mostly visible
        if (letterRect.bottom < windowHeight + 100) {
            showContinueButton();
            continueButtonShown = true;
        }
    });
    
    // ===== ADD FADE OUT ANIMATION =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .pixel-continue-btn {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s, transform 0.8s;
        }
    `;
    document.head.appendChild(style);
    
    console.log("🚀 Letter page ready!");
});