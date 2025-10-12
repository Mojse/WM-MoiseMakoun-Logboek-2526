let concerten = document.querySelector(".concerten");
let bezoekers = document.querySelector(".bezoekers");
let concert__section = document.querySelector(".concert__section");

// edit
let editID = 0;
let btnEdit = document.querySelector("#btnEdit");
let btnEditB = document.querySelector("#btnEditB");
let edit_container = document.querySelector(".edit__container");
let editB_container = document.querySelector(".editB__container");

// add
let btnAdd = document.querySelector("#btnAdd");
let btnAddApi = document.querySelector("#btnAddApi");
let btnAddB = document.querySelector("#btnAddB");
let btnAddBApi = document.querySelector("#btnAddBApi");

// details
let btnDetails = document.querySelector("#btnDetails");
let btnDetailsB = document.querySelector("#btnDetailsB");

// delete 
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

async function editConcert(id){
    console.log(id);
    editID = id;
    edit_container.removeAttribute("hidden");
    const url = baseApiAddress + `concerten.php?id=${id}`;

    let response = await fetch(url);
    try {
        if (!response.ok) {
            throw new Error(`Error: ${response.message}`);
        }

        let result = await response.json();
        console.log(result);

        document.getElementById("concert_artist").value = result.data.artist;
        document.getElementById("concert_date").value = result.data.date;
        document.getElementById("concert_hour").value = result.data.hour;
        document.getElementById("concert_venue").value = result.data.venue;
        document.getElementById("concert_price").value = result.data.price;
    } catch (error) {
    }
}

async function sendEdit(e) {
    e.preventDefault();

    if (!editID) {
        alert('Geen concert geselecteerd.');
        return;
    }

    const artist = document.getElementById('concert_artist').value.trim();
    const date   = document.getElementById('concert_date').value.trim();
    const hour   = document.getElementById('concert_hour').value.trim();
    const venue  = document.getElementById('concert_venue').value.trim();
    const price  = document.getElementById('concert_price').value.trim();

    if (!artist || !date || !hour || !venue) {
        alert('Vul alle velden in.');
        return;
    }

    try {
        const url = baseApiAddress + 'concerten.php'; // of 'concerten/' als je router dat doet

        const opties = {
            method: 'PUT',
            body: JSON.stringify({
                id: editID,
                artist: artist,
                date: date,
                hour: hour,
                venue: venue,
                price: price
            })
        };

        const response = await fetch(url, opties);
        const result = await response.text();

        if (result.status < 200 || result.status > 299) {
            alert('Aanpassen mislukt.');
            return;
        }

        document.querySelector('.edit__container').setAttribute('hidden', true);
        document.getElementById('concert_artist').value = '';
        document.getElementById('concert_date').value   = '';
        document.getElementById('concert_hour').value   = '';
        document.getElementById('concert_venue').value  = '';
        document.getElementById('concert_price').value  = '';

        editID = 0;
        location.reload();

    } catch (err) {
        alert('fout : ' + err);
    }
}

async function editBezoeker(id){
    console.log(id);
    editID = id;
    editB_container.removeAttribute("hidden");
    const url = baseApiAddress + `bezoekers.php?id=${id}`;

    let response = await fetch(url);
    try {
        if (!response.ok) {
            throw new Error(`Error: ${response.message}`);
        }

        let result = await response.json();
        console.log(result);

        document.getElementById("bezoeker_firstName").value = result.data.first_name;
        document.getElementById("bezoeker_lastName").value = result.data.last_name;
        document.getElementById("bezoeker_birthDate").value = result.data.birth_date;
        document.getElementById("bezoeker_email").value = result.data.email;
    } catch (error) {
    }
}

async function sendEditB(e) {
    e.preventDefault();

    if (!editID) {
        alert('Geen bezoeker geselecteerd.');
        return;
    }

    const first_name = document.getElementById('bezoeker_firstName').value.trim();
    const last_name   = document.getElementById('bezoeker_lastName').value.trim();
    const birth_date   = document.getElementById('bezoeker_birthDate').value.trim();
    const email  = document.getElementById('bezoeker_email').value.trim();

    if (!first_name || !last_name || !birth_date || !email) {
        alert('Vul alle velden in.');
        return;
    }

    try {
        const url = baseApiAddress + 'bezoekers.php'; 

        const opties = {
            method: 'PUT',
            body: JSON.stringify({
                id: editID,
                first_name: first_name,
                last_name: last_name,
                birth_date: birth_date,
                email: email
            })
        };

        const response = await fetch(url, opties);
        const result = await response.text();

        if (result.status < 200 || result.status > 299) {
            alert('Aanpassen mislukt.');
            return;
        }

        document.querySelector('.editB__container').setAttribute('hidden', true);
        document.getElementById('bezoeker_firstName').value = '';
        document.getElementById('bezoeker_lastName').value   = '';
        document.getElementById('bezoeker_birthDate').value   = '';
        document.getElementById('bezoeker_email').value  = '';

        editID = 0;
        location.reload();

    } catch (err) {
        alert('fout : ' + err);
    }
}

async function addConcert(e) {
    e.preventDefault();

    const artist = document.getElementById('add_artist').value.trim();
    const date   = document.getElementById('add_date').value.trim();
    const hour   = document.getElementById('add_hour').value.trim();
    const venue  = document.getElementById('add_venue').value.trim();
    const price  = document.getElementById('add_price').value.trim();

    try {
        const url = baseApiAddress + 'concerten.php';

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ artist, date, hour, venue, price })
        });

        if (!resp.ok) {
            const t = await resp.text();
            throw new Error(`Serverfout (${resp.status}): ${t}`);
        }

        const result = await resp.json();
        if (result.status < 200 || result.status > 299) {
            throw new Error(result.message || 'Toevoegen mislukt');
        }

        document.querySelector('.add__container').setAttribute('hidden', true);
        document.getElementById('add_artist').value = '';
        document.getElementById('add_date').value   = '';
        document.getElementById('add_hour').value   = '';
        document.getElementById('add_venue').value  = '';
        document.getElementById('add_price').value  = '';

        location.reload();

    } catch (err) {
        alert(`Fout bij toevoegen: ${err.message}`);
    }
}

async function addBezoeker(e) {
    e.preventDefault();

    const first_name = document.getElementById('add_firstName').value.trim();
    const last_name   = document.getElementById('add_lastName').value.trim();
    const birth_date   = document.getElementById('add_birthDate').value.trim();
    const email  = document.getElementById('add_email').value.trim();

    try {
        const url = baseApiAddress + 'bezoekers.php';

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ first_name, last_name, birth_date, email })
        });

        if (!resp.ok) {
            const t = await resp.text();
            throw new Error(`Serverfout (${resp.status}): ${t}`);
        }

        const result = await resp.json();
        if (result.status < 200 || result.status > 299) {
            throw new Error(result.message || 'Toevoegen mislukt');
        }

        document.querySelector('.addB__container').setAttribute('hidden', true);
        document.getElementById('add_firstName').value = '';
        document.getElementById('add_lastName').value   = '';
        document.getElementById('add_birthDate').value   = '';
        document.getElementById('add_email').value  = '';

        location.reload();

    } catch (err) {
        alert(`Fout bij toevoegen: ${err.message}`);
    }
}

concerten.addEventListener('click', function (e) {
    if (e.target.classList.contains('btnDetails')) {
        getDetails(e.target.dataset.id);
    }
    if (e.target.classList.contains('btnDelete')) {
        deleteConcert(e.target.dataset.id);
    }
    if (e.target.classList.contains('btnEdit')) {
        editConcert(e.target.dataset.id);
    }
});

bezoekers.addEventListener('click', function (e) {
    if (e.target.classList.contains('btnDetailsB')) {
        getDetailsB(e.target.dataset.id);
    }
    if (e.target.classList.contains('btnDeleteB')) {
        deleteBezoeker(e.target.dataset.id);
    }
    if (e.target.classList.contains('btnEditB')) {
        editBezoeker(e.target.dataset.id);
    }
});

btnEdit.addEventListener('click', sendEdit);
btnEditB.addEventListener('click', sendEditB);
btnAdd.addEventListener('click', () => {
  document.querySelector('.add__container').removeAttribute('hidden');
});
btnAddApi.addEventListener('click', addConcert);
btnAddB.addEventListener('click', () => {
  document.querySelector('.addB__container').removeAttribute('hidden');
});
btnAddBApi.addEventListener('click', addBezoeker);
