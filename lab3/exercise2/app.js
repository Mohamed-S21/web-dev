// Part A — Create a Delay Function
function delay(message, seconds, callback) {
  setTimeout(() => {
    console.log(message);
    if (callback) {
      callback();
    }
  }, seconds * 1000);
}

// Part B & C — Sequential steps using callbacks
console.log("Starting callback chain...");
delay("Step 1", 1, () => {
  delay("Step 2", 1, () => {
    delay("Step 3", 1, () => {
      console.log("Done!");
    });
  });
});
