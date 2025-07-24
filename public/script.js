document.addEventListener("DOMContentLoaded", () => {
    const jokeBtn = document.getElementById("jokeBtn");
    const jokeDiv = document.getElementById("joke");
    const loading = document.getElementById("loading");
  
    if (!jokeBtn || !jokeDiv || !loading) {
      console.error("❌ One or more required elements are missing in index.ejs.");
      return;
    }
  
    console.log("✅ Script loaded and DOM ready");
  
    jokeBtn.addEventListener("click", () => {
      console.log("😂 Joke button clicked");
      jokeDiv.innerHTML = "";
      loading.style.display = "block";
  
      fetch("/joke")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch joke");
          }
          return response.json();
        })
        .then((data) => {
          loading.style.display = "none";
          console.log("✅ Joke received:", data);
  
          if (data.type === "single") {
            jokeDiv.innerHTML = `<p>${data.joke}</p>`;
          } else if (data.type === "twopart") {
            jokeDiv.innerHTML = `<p><strong>${data.setup}</strong><br>${data.delivery}</p>`;
          } else {
            jokeDiv.innerHTML = "<p>⚠️ No joke found. Try again!</p>";
          }
        })
        .catch((err) => {
          console.error("❌ Error fetching joke:", err);
          loading.style.display = "none";
          jokeDiv.innerHTML = "<p>❌ Oops! Something went wrong.</p>";
        });
    });
  });
  