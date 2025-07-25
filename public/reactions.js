const ratings = { '😂': 0, '😐': 0, '🙄': 0 };

function rateJoke(emoji) {
  if (!currentJokeId) {
    alert("Please get a joke first!");
    return;
  }

  ratings[emoji]++;
  updateUI();

  fetch("/rate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jokeId: currentJokeId, emoji }),
  }).catch((err) => console.error("❌ Failed to send reaction:", err));
}

function updateUI() {
  document.getElementById("funny-count").innerText = ratings["😂"];
  document.getElementById("meh-count").innerText = ratings["😐"];
  document.getElementById("groan-count").innerText = ratings["🙄"];
}

function resetRatings() {
  ratings['😂'] = 0;
  ratings['😐'] = 0;
  ratings['🙄'] = 0;
  updateUI();
}
