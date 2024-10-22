document.addEventListener("DOMContentLoaded", function () {
    let participateBtn = document.querySelector("#participateBtn");
    let counter = document.querySelector("#counter");

    participateBtn.addEventListener("click", addToCounter);

    function addToCounter() {
        let currentCounter = parseInt(counter.textContent);
        currentCounter++;
        console.log(currentCounter);
        counter.textContent = currentCounter;
    }

    console.log(participateBtn);
});