// Part A & B — Promise with resolution, rejection, and finally
function checkServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isOnline = Math.random() < 0.5;
      if (isOnline) {
        resolve("Server is online");
      } else {
        reject("Server is unavailable");
      }
    }, 500);
  });
}

checkServer()
  .then((message) => {
    console.log("Success:", message);
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Request finished.");
  });
