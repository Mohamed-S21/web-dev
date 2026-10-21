function check(label, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "✔" : "✘"} ${label}`, ok ? "" : { actual, expected });
}

const products = [
  { name: "Mango",   price: 500, stock: 12 },
  { name: "Bissap",  price: 300, stock: 0 },
  { name: "Bread",   price: 150, stock: 30 },
  { name: "Thiakry", price: 700, stock: 5 },
];

// TODO 1 — Array with only the names (map).
function names(list) {
  return list.map((p) => p.name);
}

// TODO 2 — Only the products whose stock is above 0 (filter).
function inStock(list) {
  return list.filter((p) => p.stock > 0);
}

// TODO 3 — The product with this name, or undefined (find).
function findProduct(list, name) {
  return list.find((p) => p.name === name);
}

// TODO 4 — Value of the whole stock: sum of price × stock (reduce, start at 0).
function stockValue(list) {
  return list.reduce((total, p) => total + p.price * p.stock, 0);
}

// TODO 5 — A NEW product with a new price (spread, original untouched).
function withPrice(product, newPrice) {
  return { ...product, price: newPrice };
}

// ---------- Do not change ----------
check("names",           names(products), ["Mango", "Bissap", "Bread", "Thiakry"]);
check("inStock",         names(inStock(products)), ["Mango", "Bread", "Thiakry"]);
check("findProduct",     findProduct(products, "Bread").price, 150);
check("stockValue",      stockValue(products), 14000);
check("withPrice",       withPrice(products[0], 600).price, 600);
check("original intact", products[0].price, 500);
