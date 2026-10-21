const form = document.querySelector("#search-form");
const input = document.querySelector("#search");
const status = document.querySelector("#status");
const results = document.querySelector("#results");

let currentController = null;

function showMessage(msg) {
  status.textContent = msg;
}

function renderUsers(users) {
  results.innerHTML = "";
  if (users.length === 0) {
    showMessage("No users found.");
    return;
  }
  showMessage(`${users.length} user(s) found.`);
  for (const user of users) {
    const li = document.createElement("li");
    li.innerHTML = `<div class="name">${user.name}</div><div class="email">${user.email}</div>`;
    results.append(li);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = input.value.trim().toLowerCase();

  // Exercise 11: Prevent race conditions by aborting any in-flight request
  if (currentController) {
    currentController.abort();
  }
  currentController = new AbortController();

  showMessage("Searching...");
  results.innerHTML = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      signal: currentController.signal
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const users = await response.json();
    const filtered = users.filter((u) => u.name.toLowerCase().includes(query));
    renderUsers(filtered);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch aborted for newer search query.");
      return;
    }
    showMessage("Could not load users.");
    console.error(error);
  } finally {
    currentController = null;
  }
});
