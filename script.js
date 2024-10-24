document.addEventListener("DOMContentLoaded", function () {
    let participateBtn = document.querySelector("#participateBtn");
    let counter = document.querySelector("#counter");
    let counterYesterday = document.querySelector("#counterYesterday");
    let resElem = document.querySelector("#resElem");

    participateBtn.addEventListener("click", addToCounter);

    getData();
    compareParticipation();
    startCountdown();

    function addToCounter() {
        let currentCounter = counter.textContent;
        currentCounter++;
        console.log(currentCounter);
        counter.textContent = currentCounter;

        saveData(currentCounter);
        compareParticipation();
        feedbackAnimation();
    }

    function feedbackAnimation() {
        console.log("test");
        let loaderId = document.querySelector("#loaderId");
        loaderId.classList.remove("loader--hidden");
        loaderId.classList.add("loader");

        setTimeout(() => {
            loaderId.classList.add("loader--hidden");
        }, 2000);
    }

    function saveData(currentCounter) {
        let dataStr = encodeURIComponent(currentCounter);
        localStorage.setItem("counterData", dataStr);
    }

    function getData() {
        let dataStr = localStorage.getItem("counterData");
        if (dataStr == null) return;

        counter.textContent = dataStr;
    }

    function compareParticipation() {
        let difference = parseInt(counterYesterday.textContent) - parseInt(counter.textContent);
        console.log(difference);
        console.log
        if (difference <= 0 || difference == null) {
            resElem.innerHTML = "";
            return;
        } else {
            resElem.innerHTML = "<p>" + "Det behvös endast " + difference + " deltagare till för att slå gårdagens resultat!" + "</p>";
        }
    }

    function startCountdown() {
        var now = new Date().getTime();
        var countDownDate = now + 24 * 60 * 60 * 1000;

        var x = setInterval(() => {
            var now = new Date().getTime();
            var distance = countDownDate - now;

            if (distance <= 0) {
                clearInterval(x);
                startCountdown();
                return;
            }

            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("countdown").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
        }, 1000);
    }
});