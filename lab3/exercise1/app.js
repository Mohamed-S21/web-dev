console.log("=== Exercise 1 Part A ===");
console.log("A");
setTimeout(() => {
  console.log("B");
}, 0);
console.log("C");

setTimeout(() => {
  console.log("=== Exercise 1 Part B ===");
  console.log("1");
  setTimeout(() => {
    console.log("2");
  }, 1000);
  setTimeout(() => {
    console.log("3");
  }, 0);
  console.log("4");
}, 50);

setTimeout(() => {
  console.log("=== Exercise 1 Part C ===");
  console.log("Start");
  setTimeout(() => {
    console.log("Timer 1");
  }, 2000);
  setTimeout(() => {
    console.log("Timer 2");
  }, 1000);
  console.log("End");
}, 1200);
