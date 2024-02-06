const x = document.querySelector.bind(document);

var Z = x('#search').addEventListener("click", main);

function main() {
    const breed = x('#breed').value.trim().toLowerCase();
    if (breed == "") { 
        x('.dog-images').innerHTML = "No Breed Selected"; 
    }
    else {
        url = "https://dog.ceo/api/breed/" + breed + "/images/random"
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

setInterval(main, 5000); 

x('.reset').addEventListener('click', () => {
    x('.dog-images').innerHTML = "";
    x('#breed').value = "";
});