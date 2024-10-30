document.addEventListener("DOMContentLoaded", function () {
    let participateBtn = document.querySelector("#participateBtn");
    let counter;
    let resElem = document.querySelector("#resElem");

    participateBtn.addEventListener("click", addToCounter);

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

    function addToCounter() {
        counter++;

        saveData(counter);
        compareParticipation();
        feedbackAnimation();
        updateChart(counter);
    }

    function updateChart(counter) {
        console.log(counter);
        participationChart.data.datasets[0].data[1] = counter;
        participationChart.update();
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