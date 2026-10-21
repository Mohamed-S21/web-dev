const statusElement = document.querySelector("#status");
const userList = document.querySelector("#users");

function renderUsers(users) {
  userList.innerHTML = "";
  for (const user of users) {
    const li = document.createElement("li");
    li.innerHTML = `<div class="name">${user.name}</div><div class="email">${user.email}</div>`;
    userList.append(li);
  }
}

async function loadUsers() {
  statusElement.className = "";
  statusElement.textContent = "Loading...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    renderUsers(users);
    statusElement.className = "success";
    statusElement.textContent = "Users loaded successfully";
  } catch (error) {
    userList.innerHTML = "";
    statusElement.className = "error";
    statusElement.textContent = "Could not load users.";
    console.error(error);
  }
}

loadUsers();
