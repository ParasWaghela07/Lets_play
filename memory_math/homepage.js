let homeMusic = new Audio("home.mp3");

// document.addEventListener('DOMContentLoaded', function() {
//     // Play audio after a delay to ensure it's properly loaded
//     setTimeout(function() {
//         homeMusic.play().catch(function(error) {
//             // Handle autoplay error (if any)
//             console.error("Autoplay failed: ", error);
//         });
//     }, 1000); // Adjust the delay as needed
// });

let difficulties = document.getElementsByClassName("diffi");
let difficultiesArray = Array.from(difficulties);

difficultiesArray.forEach(element => {
    element.addEventListener('click', function() {
        homeMusic.pause();
        let selectedDifficulty = "";

        if (element.innerText === "EASY") {
            selectedDifficulty = 'easy';
        } else if (element.innerText === "MEDIUM") {
            selectedDifficulty = 'medium';
        } else if (element.innerText === "INSANE") {
            selectedDifficulty = 'insane';
        }

        // Set the selected difficulty in localStorage
        localStorage.setItem('selectedDifficulty', selectedDifficulty);
    });
});
