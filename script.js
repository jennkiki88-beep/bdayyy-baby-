// ===== PAGE 1: LANDING PAGE =====

document.addEventListener('DOMContentLoaded', function() {
    const mainButton = document.getElementById('mainButton');
    const popSound = document.getElementById('popSound');
    
    // Button click handler
    mainButton.addEventListener('click', function() {
        // Play pop sound
        if (popSound) {
            popSound.currentTime = 0;
            popSound.play().catch(e => console.log("Audio play failed:", e));
        }
        
        // Visual press feedback
        this.style.transform = 'translateY(6px)';
        this.style.boxShadow = '0 2px 0 #8B4513, 0 4px 4px rgba(0,0,0,0.1)';
        
        // Reset button style after short delay
        setTimeout(() => {
            this.style.transform = '';
            this.style.boxShadow = '';
        }, 150);
        
        // ===== IMPORTANT: CHANGE THIS TO YOUR ACTUAL PAGE 2 FILENAME =====
        setTimeout(() => {
            window.location.href = 'cake.html'; // CHANGE THIS
        }, 400);
    });
    
    // Optional hover effects
    mainButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(2px)';
        this.style.boxShadow = '0 6px 0 #8B4513, 0 10px 8px rgba(0,0,0,0.15)';
    });
    
    mainButton.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '0 8px 0 #8B4513, 0 12px 10px rgba(0,0,0,0.15)';
    });
    
    // Bonus: Make confetti react to button hover (optional)
    mainButton.addEventListener('mouseenter', function() {
        const confetti = document.querySelectorAll('.pixel-confetti');
        confetti.forEach(c => {
            c.style.animationDuration = '3s'; // Speed up briefly
            setTimeout(() => {
                c.style.animationDuration = '';
            }, 500);
        });
    });
});
