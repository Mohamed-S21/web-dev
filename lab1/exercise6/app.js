const value   = document.querySelector("#value");
const minus   = document.querySelector("#minus");
const plus    = document.querySelector("#plus");
const reset   = document.querySelector("#reset");
const message = document.querySelector("#message");
const hint    = document.querySelector("#hint");
const preview = document.querySelector("#preview");
const chars   = document.querySelector("#chars");

let count = 0;

// TODO 1 — + adds 1
plus.addEventListener("click", () => {
  count++;
  value.textContent = count;
});

// TODO 2 — − subtracts 1, never below 0
minus.addEventListener("click", () => {
  if (count > 0) {
    count--;
  }
  value.textContent = count;
});

// TODO 3 — Reset
reset.addEventListener("click", () => {
  count = 0;
  value.textContent = count;
});

// TODO 4 — Live preview and character count
message.addEventListener("input", () => {
  preview.textContent = message.value;
  chars.textContent = `${message.value.length} characters`;
});

// TODO 5 — Hint while the field has the focus
message.addEventListener("focus", () => {
  hint.textContent = "Your message appears below as you type.";
});
message.addEventListener("blur", () => {
  hint.textContent = "";
});
