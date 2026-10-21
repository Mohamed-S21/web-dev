async function loadUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    
    // Part A & B: inspecting status & ok
    console.log("Response object:", response);
    console.log("Status code:", response.status);
    console.log("Status OK?", response.ok);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Part C: parse JSON
    const users = await response.json();
    console.log("Users array:", users);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

loadUsers();
