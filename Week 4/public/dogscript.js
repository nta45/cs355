const x = document.querySelector.bind(document);

fetch('http://localhost:3000/breeds')
    .then(response => response.json())
    .then(data => {
        const breedsList = Object.keys(data.message);

        // Add breeds to datalist for autocomplete
        const datalist = document.getElementById('breeds');
        breedsList.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            datalist.appendChild(option);
        });
    });

var Z = x('#search').addEventListener("click", main);

function main() {
    const breed = x('#breed').value.trim().toLowerCase();
    if (breed == "") {
        x('.dog-images').innerHTML = "No Breed Selected";
    }
    else {
        url = "http://localhost:3000/image/" + breed
        fetch(url)
            .then(r => r.json())
            .then(data => {
                console.log(data);
                if (data.status == "error") {
                    x('.dog-images').innerHTML = "Breed not found";
                }
                else {
                    x('.dog-images').innerHTML = "<img src='" + data.message + "'>";
                }
            });
    }
}

let intervalId;

x('.reset').addEventListener('click', () => {
    x('.dog-images').innerHTML = "";
    x('#breed').value = "";
    clearInterval(intervalId);
});

x('#search').addEventListener("click", () => {
    clearInterval(intervalId);
    main();
    intervalId = setInterval(main, 5000);
});