let btnConcerten = document.querySelector("#btnConcerten");
let concerten = document.querySelector(".concerten");
let isShwon = false;

let baseApiAddress = "https://makoun.be/LiveCountry/api/";

async function getApiConcerten(){
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

        result.data.forEach(line => {
            concerten.removeAttribute("hidden");
            concerten.innerHTML += `<tr>
                                        <th>Artist</th>
                                        <th>Date</th>
                                        <th>Details</th>
                                    </tr>
                                    <tr>
                                        <td>${line.artist}</td>
                                        <td>${line.date}</td>
                                        <td>${line.hour}</td>
                                        <td>${line.venue}</td>
                                        <td>${line.price}</td>
                                    </tr>`
        });

        isShwon = true;
    } catch (error) {
        console.log(error.message);
    }
}


btnConcerten.addEventListener("click", getApiConcerten);