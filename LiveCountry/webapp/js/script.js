let btnConcerten = document.querySelector("#btnConcerten");
let btnBezoekers = document.querySelector("#btnBezoekers");
let concerten = document.querySelector(".concerten");
let bezoekers = document.querySelector(".bezoekers");
let btnDetails = document.querySelector("#btnDetails");
let btnDetailsB = document.querySelector("#btnDetailsB");
let concertData = [];
let bezoekerData = [];
let isShwon = false;
let isShwonB = false;


let baseApiAddress = "https://makoun.be/LiveCountry/api/";

async function getApiConcerten() {
    if (isShwon == true) {
        return;
    }
    let url = baseApiAddress + "concerten.php";
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        concertData = result.data;
        
        concerten.removeAttribute("hidden");
        result.data.forEach(line => {
            concerten.innerHTML += `<tr>
                                        <th>Artist</th>
                                        <th>Date</th>
                                        <th>Details</th>
                                    </tr>
                                    <tr>
                                        <td>${line.artist}</td>
                                        <td>${line.date}</td>
                                        <td><button type="button" class="btnDetails" data-id="${line.id}">Details</button></td>
                                    </tr>`
        });

        isShwon = true;
    } catch (error) {
         throw new Error(`Error: ${error.message}`);
    }
}

async function getApiBezoekers() {
    if (isShwonB == true) {
        return;
    }
    let url = baseApiAddress + "bezoekers.php";
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        bezoekerData = result.data;
        
        bezoekers.removeAttribute("hidden");
        result.data.forEach(line => {
            bezoekers.innerHTML += `<tr>
                                        <th>First Name</th>
                                        <th>last Name</th>
                                        <th>Details</th>
                                    </tr>
                                    <tr>
                                        <td>${line.first_name}</td>
                                        <td>${line.last_name}</td>
                                        <td><button type="button" class="btnDetailsB" data-id="${line.id}">Details</button></td>
                                    </tr>`
        });

        isShwonB = true;
    } catch (error) {
         throw new Error(`Error: ${error.message}`);
    }
}

function getDetails(id) {
    document.querySelector(".details__container").removeAttribute("hidden");
     let table = document.querySelector(".details");
     table.innerHTML = "";
     let concert;

     concertData.forEach(c => {
        if (c.id == id) {
            concert = c;
        }
     });

     table.innerHTML += `<tr>
                            <th>Artist</th>
                            <th>Date</th>
                            <th>Hour</th>
                            <th>Venue</th>
                            <th>price</th>
                        </tr>
                        <tr>
                            <td>${concert.artist}</td>
                            <td>${concert.date}</td>
                            <td>${concert.hour}</td>
                            <td>${concert.venue}</td>
                            <td>${concert.price}</td>
                        </tr>`
}

function getDetailsB(id) {
    document.querySelector(".detailsB__container").removeAttribute("hidden");
     let table = document.querySelector(".detailsB");
     table.innerHTML = "";
     let bezoeker;

     bezoekerData.forEach(b => {
        if (b.id == id) {
            bezoeker = b;
        }
     });

     table.innerHTML +=  `<tr>
                                <th>First Name</th>
                                <th>last Name</th>
                                <th>Birth Date</th>
                                <th>E-mail</th>
                        </tr>
                        <tr>
                            <td>${bezoeker.first_name}</td>
                            <td>${bezoeker.last_name}</td>
                            <td>${bezoeker.birth_date}</td>
                            <td>${bezoeker.email}</td>
                        </tr>`
}


btnConcerten.addEventListener("click", getApiConcerten);
concerten.addEventListener('click', function (e) {
    if (e.target.classList.contains('btnDetails')) {
        getDetails(e.target.dataset.id);
    }
});

btnBezoekers.addEventListener("click", getApiBezoekers);
bezoekers.addEventListener('click', function (e) {
    if (e.target.classList.contains('btnDetailsB')) {
        getDetailsB(e.target.dataset.id);
    }
});
