// TODO 1 — Change the text of the h1 (#title)
document.querySelector("#title").textContent = "JavaScript changed me!";

// TODO 2 — Change the text of the paragraph with class "intro"
document.querySelector(".intro").textContent = "This sentence was changed by app.js.";

// TODO 3 — Make the link point to MDN and change its text
const link = document.querySelector("#link");
link.setAttribute("href", "https://developer.mozilla.org");
link.textContent = "Go to MDN";

// TODO 4 — Add the class "highlight" and rounded corners
const box = document.querySelector(".box");
box.classList.add("highlight");
box.style.borderRadius = "12px";

// TODO 5 — Read the value of #nameField and write the greeting in #output
const nameField = document.querySelector("#nameField");
document.querySelector("#output").textContent = `Hello, ${nameField.value}!`;
