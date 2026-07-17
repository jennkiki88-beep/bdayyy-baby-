// ===== CAKE PAGE =====

document.addEventListener("DOMContentLoaded", () => {

    const startButton = document.getElementById("startButton");
    const countdown = document.getElementById("countdown");
    const birthdayMessage = document.getElementById("birthdayMessage");
    const continueButton = document.getElementById("continueButton");
    const flames = document.querySelectorAll(".flame");
    const confettiContainer = document.getElementById("confettiContainer");

    let running = false;

    startButton.addEventListener("click", () => {

        if (running) return;

        running = true;

        startButton.style.display = "none";

        let number = 5;

        countdown.textContent = number;

        const timer = setInterval(() => {

            number--;

            if (number > 0) {

                countdown.textContent = number;

            }

            else if (number === 0) {

                countdown.textContent = "BLOW! 💨";

            }

            else {

                clearInterval(timer);

                // Blow out candles
                flames.forEach(flame => {
                    flame.classList.add("out");
                });

                // Show celebration
                birthdayMessage.style.display = "block";
                continueButton.style.display = "inline-block";

                countdown.textContent = "";

                createConfetti();

            }

        }, 1000);

    });

    continueButton.addEventListener("click", () => {

        window.location.href = "letter.html";

    });

    function createConfetti() {

        const colors = [
            "#ff69b4",
            "#FFD700",
            "#00e5ff",
            "#98fb98",
            "#ffffff",
            "#ff914d"
        ];

        for (let i = 0; i < 180; i++) {

            const piece = document.createElement("div");

            piece.className = "confetti";

            piece.style.left = Math.random() * 100 + "%";

            piece.style.backgroundColor =
                colors[Math.floor(Math.random() * colors.length)];

            piece.style.animationDelay =
                Math.random() * 1 + "s";

            piece.style.animationDuration =
                (2 + Math.random() * 2) + "s";

            piece.style.transform =
                `rotate(${Math.random()*360}deg)`;

            confettiContainer.appendChild(piece);

            setTimeout(() => {

                piece.remove();

            }, 4500);

        }

    }

});
