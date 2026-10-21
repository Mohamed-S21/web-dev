function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

// Part A & B — Rewriting promise chains with async/await & try/catch
async function run() {
  try {
    console.log("Start async run");
    await wait(1);
    console.log("Step 1");

    await wait(1);
    console.log("Step 2");

    await wait(1);
    console.log("Step 3");
    console.log("All steps complete!");
  } catch (error) {
    console.error("Encountered error:", error);
  }
}

run();
