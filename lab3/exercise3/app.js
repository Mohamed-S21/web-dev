// Part A & B — Create Promise and resolve value
function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${seconds} second(s) have passed!`);
    }, seconds * 1000);
  });
}

// Part C — Chain Promises
console.log("Start");
wait(1)
  .then((msg) => {
    console.log("1 second");
    return wait(1);
  })
  .then(() => {
    console.log("2 seconds");
    return wait(1);
  })
  .then(() => {
    console.log("3 seconds");
    console.log("Finished");
  });
