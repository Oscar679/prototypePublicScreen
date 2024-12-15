document.addEventListener("DOMContentLoaded", function () {
    console.log(window.innerWidth, window.innerHeight);

    let participateBtn = document.querySelector("#participateBtn");
    let counter = 0;
    let resElem = document.querySelector("#resElem");

    participateBtn.addEventListener("click", addToCounter);

    let activityIx = 0;
    let activityList = [];
    let activityDiv = document.querySelector("#activityDiv");

    let benefitIx = 0;
    let benefitList = [];
    let healthDiv = document.querySelector("#healthDiv");

    const counterYesterday = 309;
    const ctx = document.getElementById('myChart');

    const participationChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Igår', 'Idag'],
            datasets: [{
                label: 'Antal deltagare',
                data: [counterYesterday],
                borderWidth: 1,
                backgroundColor: '#F2FFFFFF',
                barThickness: 100,
                color: 'black'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white'
                    }
                },
                x: {
                    ticks: {
                        color: 'white',
                        font: {
                            size: '35'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white',
                        font: {
                            size: 13
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    getData();
    compareParticipation();
    startCountdown();
    updateChart(counter);
    activateButtons();
    fetchData("json/data.json");

    fetchData2("json/data.json")
    activateHealthButtons();
    showBenefit();

    async function fetchData(activity) {
        let response = await fetch(activity);
        if (response.ok) {
            let data = await response.json();
            getActivities(data);
        } else {
            activityDiv.innerHTML = response.status;
        }
    }

    function getActivities(json) {
        activityList = json.activity.map(item => item.description);
    }

    function activateButtons() {
        document.querySelector(".leftBtn").addEventListener("click", prevActivity);

        document.querySelector(".rightBtn").addEventListener("click", nextActivity);
    }

    function prevActivity() {
        if (activityIx > 0) activityIx--;
        else activityIx = activityList.length - 1;
        showActivity();
    }

    function nextActivity() {
        if (activityIx < activityList.length - 1) activityIx++;
        else activityIx = 0;
        showActivity();
    }

    function showActivity() {
        activityDiv.innerHTML = activityList[activityIx];
    }

    async function fetchData2(benefits) {
        let response = await fetch(benefits);
        if (response.ok) {
            let data = await response.json();
            getBenefits(data);
            showBenefit();
        } else {
            healthDiv.innerHTML = response.status;
        }
    }

    function getBenefits(json) {
        benefitList = json.benefits.map(item => item.description);
    }

    function activateHealthButtons() {
        document.querySelector("#leftBtn2").addEventListener("click", prevBenefit);

        document.querySelector("#rightBtn2").addEventListener("click", nextBenefit);
    }

    function prevBenefit() {
        if (benefitIx > 0) benefitIx--;
        else benefitIx = benefitList.length - 1;
        showBenefit();
    }

    function nextBenefit() {
        if (benefitIx < benefitList.length - 1) benefitIx++;
        else benefitIx = 0;
        showBenefit();
    }

    function showBenefit() {
        healthDiv.innerHTML = benefitList[benefitIx];
    }

    function addToCounter() {
        counter++;

        saveData(counter);
        compareParticipation();
        feedbackAnimation();
        updateChart(counter);

    }

    function updateChart(counter) {
        participationChart.data.datasets[0].data[1] = counter;
        participationChart.update();
    }

    function feedbackAnimation() {
        let loaderId = document.querySelector("#loaderId");
        loaderId.classList.remove("loader--hidden");
        loaderId.classList.add("loader");

        setTimeout(() => {
            loaderId.classList.add("loader--hidden");
        }, 2000);
    }

    function saveData(counter) {
        let dataStr = encodeURIComponent(counter);
        localStorage.setItem("counterData", dataStr);
    }

    function getData() {
        let dataStr = localStorage.getItem("counterData");
        if (dataStr == null) return;

        counter = dataStr;
    }

    function compareParticipation() {
        let difference = counterYesterday - counter;
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