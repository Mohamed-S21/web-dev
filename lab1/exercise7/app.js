const form   = document.querySelector("#guestForm");
const input  = document.querySelector("#guest");
const error  = document.querySelector("#error");
const guests = document.querySelector("#guests");

form.addEventListener("submit", (event) => {
  // TODO 1 — Stop the page from reloading.
  event.preventDefault();

  // TODO 2 — Read the name and remove the spaces around it.
  const name = input.value.trim();

  // TODO 3 — Empty name: show the error and stop.
  if (name === "") {
    error.textContent = "Please enter a name.";
    return;
  }

  // TODO 4 — Otherwise: clear the error, add the guest, empty the input.
  error.textContent = "";
  const li = document.createElement("li");
  li.textContent = name;
  guests.append(li);
  input.value = "";
});

// BONUS 5 — One listener on #guests toggles "arrived".
guests.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (li) {
    li.classList.toggle("arrived");
  }
});
