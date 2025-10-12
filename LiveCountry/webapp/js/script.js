let concerten = document.querySelector(".concerten");
let bezoekers = document.querySelector(".bezoekers");
let concert__section = document.querySelector(".concert__section");

// Alle functieknoppen
let btnDetails = document.querySelector("#btnDetails");
let btnDetailsB = document.querySelector("#btnDetailsB");
let btnDelete = document.querySelector("#btnDelete");
let btnDeleteB = document.querySelector("#btnDeleteB");

let concertBezoekers = document.querySelector(".concert__bezoekers");
let bezoekerConcerten = document.querySelector(".bezoeker__concerten");
let concertData = [];
let bezoekerData = [];
let isShwon = false;
let isShwonB = false;
let showMessage = false;


let baseApiAddress = "https://makoun.be/LiveCountry/api/";

getApiConcerten();
getApiBezoekers();

async function getApiConcerten() {
    concerten.innerHTML = "";
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
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td>${line.artist}</td>
                                        <td>${line.date}</td>
                                        <td><button type="button" class="btnDetails" data-id="${line.id}">Details</button></td>
                                        <td><button type="button" class="btnEdit" data-id="${line.id}">Edit</button></td>
                                        <td><button type="button" class="btnDelete" data-id="${line.id}">Delete</button></td>
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
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td>${line.first_name}</td>
                                        <td>${line.last_name}</td>
                                        <td><button type="button" class="btnDetailsB" data-id="${line.id}">Details</button></td>
                                        <td><button type="button" class="btnEditB" data-id="${line.id}">Edit</button></td>
                                        <td><button type="button" class="btnDeleteB" data-id="${line.id}">Delete</button></td>
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
    getConcertBezoekers(concert.id);
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
    getBezoekerConcerten(bezoeker.id);
}

async function getConcertBezoekers(id){
    concertBezoekers.innerHTML = "";
    console.log(id);
    const url = baseApiAddress + `tickets.php?concert_id=${id}`;

    let response = await fetch(url);
    try {
        if (!response.ok) {
            throw new Error(`Error: ${response.message}`);
        }

        const result = await response.json();
        console.log(result);

        result.data.forEach(b => {
            concertBezoekers.innerHTML += `<div>${b.first_name} ${b.last_name}</div>`;
        });
    } catch (error) {
        
    }
}

async function getBezoekerConcerten(id){
    bezoekerConcerten.innerHTML = "";
    console.log(id);
    const url = baseApiAddress + `tickets.php?bezoeker_id=${id}`;

    let response = await fetch(url);
    try {
        if (!response.ok) {
            throw new Error(`Error: ${response.message}`);
        }

        const result = await response.json();
        console.log(result);

        result.data.forEach(c => {
            bezoekerConcerten.innerHTML += `<div>${c.artist} ${c.date}</div>`;
        });
    } catch (error) {
        
    }
}

async function deleteConcert(id){
    console.log(id);
    const url = baseApiAddress + `concerten.php?id=${id}`;

    let response = await fetch(url, { method: 'DELETE' });
    try {
        if (!response.ok) {
            throw new Error(`Error: ${response.message}`);
        }
    } catch (error) {
    }

    location.reload();
}

async function deleteBezoeker(id){
    console.log(id);
    const url = baseApiAddress + `bezoekers.php?id=${id}`;

    let response = await fetch(url, { method: 'DELETE' });
    try {
        if (!response.ok) {
            throw new Error(`Error: ${response.message}`);
        }
    } catch (error) {
    }

    location.reload();
}

concerten.addEventListener('click', function (e) {
    if (e.target.classList.contains('btnDetails')) {
        getDetails(e.target.dataset.id);
    }
    if (e.target.classList.contains('btnDelete')) {
        deleteConcert(e.target.dataset.id);
    }
});

bezoekers.addEventListener('click', function (e) {
    if (e.target.classList.contains('btnDetailsB')) {
        getDetailsB(e.target.dataset.id);
    }
    if (e.target.classList.contains('btnDeleteB')) {
        deleteBezoeker(e.target.dataset.id);
    }
});
