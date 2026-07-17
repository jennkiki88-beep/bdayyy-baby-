// ===== MOON PAGE =====

document.addEventListener("DOMContentLoaded", () => {

    console.log("🌙 Moon page loaded!");

    const moon = document.getElementById("moon");
    const moonSound = document.getElementById("moonSound");

    // ===== YOUR SPOTIFY PLAYLIST =====
    const SPOTIFY_LINK = "https://open.spotify.com/playlist/YOUR_PLAYLIST_HERE";

    moon.addEventListener("click", () => {

        // Play sound if one exists
        if (moonSound) {
            moonSound.currentTime = 0;
            moonSound.play().catch(() => {});
        }

        // Disable multiple clicks
        moon.style.pointerEvents = "none";

        // Click animation
        moon.style.transform = "scale(0.92)";
        moon.style.transition = "0.3s ease";

        // Glow effect
        moon.style.boxShadow = "0 0 80px white";

        // Fade the page
        document.body.style.transition = "opacity 1s ease";
        document.body.style.opacity = "0";

        // Open Spotify after animation
        setTimeout(() => {
            window.open(SPOTIFY_LINK, "_blank");
        }, 1000);

    });

});
