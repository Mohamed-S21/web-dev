const meals = [
  { day: "Monday",    dish: "Thieboudienne",        vegetarian: false },
  { day: "Tuesday",   dish: "Ndambé",               vegetarian: true },
  { day: "Wednesday", dish: "Yassa poulet",         vegetarian: false },
  { day: "Thursday",  dish: "Couscous aux légumes", vegetarian: true },
  { day: "Friday",    dish: "Mafé",                 vegetarian: false },
];

const menu  = document.querySelector("#menu");
const count = document.querySelector("#count");

// TODO 1 + BONUS 4 — Create and return ONE <li> for a meal.
// Plain version: li.textContent = `${meal.day}: ${meal.dish}`;
// Bonus version (used here): the day is in bold.
function createMealItem(meal) {
  const li = document.createElement("li");
  const day = document.createElement("strong");
  day.textContent = meal.day;
  li.append(day, `: ${meal.dish}`);
  if (meal.vegetarian) {
    li.classList.add("veg");
  }
  return li;
}

// TODO 2 — Loop over meals and append each item to #menu.
for (const meal of meals) {
  menu.append(createMealItem(meal));
}

// TODO 3 — Write the count line.
const vegCount = meals.filter((m) => m.vegetarian).length;
count.textContent = `${meals.length} meals · ${vegCount} vegetarian`;
