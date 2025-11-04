const button = document.getElementById("searchBtn");
const input = document.getElementById("tagInput");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
  const tag = input.value.trim();
  if (!tag) {
    result.innerText = "Please enter a player tag.";
    return;
  }

  result.innerText = "Loading...";

  try {
    const res = await fetch(`/api/player/${tag}`);
    const data = await res.json();

    if (data.reason === "notFound") {
      result.innerText = "Player not found.";
      return;
    }

    if (data.name) {
      result.innerHTML = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Trophies:</strong> ${data.trophies}</p>
        <p><strong>Arena:</strong> ${data.arena.name}</p>
        <p><strong>Clan:</strong> ${data.clan ? data.clan.name : "No clan"}</p>
      `;
    } else {
      result.innerText = "Error fetching player data.";
    }
  } catch (err) {
    console.error(err);
    result.innerText = "Something went wrong.";
  }
});
