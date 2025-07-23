const jokeBtn = document.getElementById("jokeBtn");
const jokeDiv = document.getElementById("joke");
const loading = document.getElementById("loading");

jokeBtn.addEventListener("click", () => {
    jokeDiv.innerHTML = "";
    loading.style.display = "block";

    fetch("/joke")
        .then(response => response.json())
        .then(data => {
            loading.style.display = "none";

            if (data.type === "single") {
                jokeDiv.innerHTML = `<p>${data.joke}</p>`;
            } else if (data.type === "twopart") {
                jokeDiv.innerHTML = `<p><strong>${data.setup}</strong><br>${data.delivery}</p>`;
            } else {
                jokeDiv.innerHTML = "<p>No joke found. Try again!</p>";
            }
        })
        .catch(err => {
            loading.style.display = "none";
            jokeDiv.innerHTML = "<p>Oops! Something went wrong.</p>";
        });
});
