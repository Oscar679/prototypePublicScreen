document.addEventListener("DOMContentLoaded", function () {
    let participateBtn = document.querySelector("#participateBtn");
    let counter = document.querySelector("#counter");
    let counterYesterday = document.querySelector("#counterYesterday");
    let resElem = document.querySelector("#resElem");

    participateBtn.addEventListener("click", addToCounter);

    getData();
    compareParticipation();

    function addToCounter() {
        let currentCounter = counter.textContent;
        currentCounter++;
        console.log(currentCounter);
        counter.textContent = currentCounter;

        saveData(currentCounter);
        compareParticipation();
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
});