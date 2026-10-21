const searchInput = document.querySelector("#searchInput");
const cityFilter = document.querySelector("#cityFilter");
const refreshBtn = document.querySelector("#refreshBtn");
const statusMsg = document.querySelector("#statusMessage");
const resultsContainer = document.querySelector("#resultsContainer");

let allUsers = [];

function setStatus(text, type = "loading") {
  statusMsg.className = `status-msg ${type}`;
  statusMsg.textContent = text;
  statusMsg.style.display = text ? "block" : "none";
}

// Dedicated rendering function
function renderCards(users) {
  resultsContainer.innerHTML = "";

  if (users.length === 0) {
    setStatus("No users or records match your query.", "error");
    return;
  }

  setStatus(`Displaying ${users.length} contact(s).`, "success");

  for (const user of users) {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Company:</strong> ${user.company?.name || "Independent"}</p>
      <p><strong>City:</strong> ${user.address?.city || "N/A"}</p>
      <span class="badge">ID: #${user.id}</span>
    `;
    resultsContainer.append(card);
  }
}

function populateCityFilter(users) {
  const cities = Array.from(new Set(users.map((u) => u.address?.city).filter(Boolean))).sort();
  cityFilter.innerHTML = '<option value="ALL">All Cities</option>';
  for (const city of cities) {
    const opt = document.createElement("option");
    opt.value = city;
    opt.textContent = city;
    cityFilter.append(opt);
  }
}

function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  const selectedCity = cityFilter.value;

  const filtered = allUsers.filter((user) => {
    const matchName = user.name.toLowerCase().includes(q);
    const matchCompany = user.company?.name.toLowerCase().includes(q);
    const matchQuery = matchName || matchCompany;
    const matchCity = selectedCity === "ALL" || user.address?.city === selectedCity;
    return matchQuery && matchCity;
  });

  renderCards(filtered);
}

async function fetchPortalData() {
  refreshBtn.disabled = true;
  setStatus("Fetching latest portal data from API...", "loading");
  resultsContainer.innerHTML = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    allUsers = data;
    populateCityFilter(allUsers);
    applyFilters();
  } catch (error) {
    setStatus("Could not load users. Please check your network connection.", "error");
    console.error("Portal fetch error:", error);
  } finally {
    refreshBtn.disabled = false;
  }
}

// Event Listeners
searchInput.addEventListener("input", applyFilters);
cityFilter.addEventListener("change", applyFilters);
refreshBtn.addEventListener("click", fetchPortalData);

// Initial Load
fetchPortalData();
