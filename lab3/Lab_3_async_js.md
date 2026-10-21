# Web Development

# Lab 3 — Asynchronous JavaScript

# Exercise 1 — Understanding Asynchronous Execution

### Goal

Understand the difference between synchronous code and asynchronous code, and learn to predict execution order.

---

## Part A — Predict the Output

Before running the code, write down exactly what you think will appear in the Console.

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

### Questions

1. What is the output?
2. Why does `"B"` not appear between `"A"` and `"C"`?
3. What changes if the timeout becomes `1000`?

Run the code and verify your answer.

---

## Part B — Add More Timers

Predict the output before running:

```js
console.log("1");

setTimeout(() => {
  console.log("2");
}, 1000);

setTimeout(() => {
  console.log("3");
}, 0);

console.log("4");
```

Write your prediction:

```text
1
?
?
?
```

Then test it.

### Think About It

Why does the `0` millisecond timer still execute **after** `"4"`?

---

## Part C — Build a Timeline

Consider:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer 1");
}, 2000);

setTimeout(() => {
  console.log("Timer 2");
}, 1000);

console.log("End");
```

Draw a timeline showing:

```text
Start
  ↓
?
  ↓
?
  ↓
?
```

Then explain why the order is:

```text
Start
End
Timer 2
Timer 1
```

### Key idea

> Asynchronous work can be scheduled while synchronous code continues running.

---

# Exercise 2 — Callbacks and Delayed Work

### Goal

Understand how callbacks are functions that can be executed later.

---

## Part A — Create a Delay Function

Create a function:

```js
function delay(message, seconds, callback) {
  // ...
}
```

It should display the message after the specified number of seconds.

For example:

```js
delay("Hello!", 2, () => {
  console.log("Finished");
});
```

Expected behaviour:

```text
... wait 2 seconds ...

Hello!
Finished
```

### Hint

Use:

```js
setTimeout(...)
```

---

## Part B — Multiple Steps

Use your `delay()` function to produce:

```text
Step 1
Step 2
Step 3
Done!
```

with one second between each step.

Your code should demonstrate that the next step only starts after the previous one has finished.

---

## Part C — Observe the Problem

Now write:

```js
delay("Step 1", 1, () => {

  delay("Step 2", 1, () => {

    delay("Step 3", 1, () => {

      console.log("Done!");

    });

  });

});
```

### Questions

1. Why does the code become increasingly indented?
2. What would happen if there were ten steps?
3. What problem does this style of code create?

> This is the problem that Promises will help us solve.

---

# Exercise 3 — Your First Promises

### Goal

Create and consume Promises.

---

## Part A — Create a Promise

Create a function:

```js
function wait(seconds) {
  // return a Promise
}
```

The Promise should resolve after the specified number of seconds.

For example:

```js
wait(2).then(() => {
  console.log("Two seconds have passed!");
});
```

### Hint

Start with:

```js
return new Promise((resolve) => {

  setTimeout(() => {
    resolve();
  }, ...);

});
```

---

## Part B — Resolve a Value

Modify your function so that it resolves with a message:

```js
wait(2).then((message) => {
  console.log(message);
});
```

Expected output:

```text
Two seconds have passed!
```

The important difference is:

```js
resolve();
```

versus:

```js
resolve("Two seconds have passed!");
```

---

## Part C — Chain Promises

Use your `wait()` function to create this sequence:

```text
Start
  ↓
1 second
  ↓
2 seconds
  ↓
3 seconds
  ↓
Finished
```

Start with:

```js
console.log("Start");

wait(1)
  .then(() => {
    console.log("1 second");
    return wait(1);
  })
  .then(() => {
    console.log("2 seconds");
    return wait(1);
  })
  .then(() => {
    console.log("3 seconds");
  });
```

### Question

Why must we write:

```js
return wait(1);
```

instead of simply:

```js
wait(1);
```

---

# Exercise 4 — Promises and Errors

### Goal

Learn that asynchronous operations can succeed or fail.

---

## Part A — Create a Random Result

Create:

```js
function checkServer() {
  // return a Promise
}
```

The Promise should randomly:

* resolve with `"Server is online"`
* reject with `"Server is unavailable"`

Hint:

```js
Math.random() < 0.5
```

Then use:

```js
checkServer()
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });
```

Run it several times.

---

## Part B — Add `finally`

Add:

```js
.finally(() => {
  console.log("Request finished.");
});
```

Observe that this message appears whether the request succeeds or fails.

### Questions

1. When does `.then()` run?
2. When does `.catch()` run?
3. When does `.finally()` run?

---

# Exercise 5 — Rewrite Promises Using `async/await`

### Goal

Understand that `async/await` is another way to work with Promises.

---

## Part A — Convert the Code

Start with:

```js
wait(1)
  .then(() => {
    console.log("Step 1");
    return wait(1);
  })
  .then(() => {
    console.log("Step 2");
    return wait(1);
  })
  .then(() => {
    console.log("Step 3");
  });
```

Rewrite it using:

```js
async function run() {
  // ...
}
```

Your final code should look conceptually like:

```js
async function run() {

  await wait(1);
  console.log("Step 1");

  await wait(1);
  console.log("Step 2");

  await wait(1);
  console.log("Step 3");

}

run();
```

---

## Part B — Add Error Handling

Modify the function so that errors are handled using:

```js
try {

} catch (error) {

}
```

Test both success and failure.

---

## Part C — Explain the Difference

Compare:

```js
wait(1)
  .then(...)
  .then(...)
  .catch(...);
```

with:

```js
try {
  await wait(1);
} catch (error) {
  ...
}
```

### Question

Which version do you find easier to read?

The goal is not to memorize one syntax.

The important concept is:

> Both approaches work with Promises.

---

# Exercise 6 — Your First `fetch()`

### Goal

Use asynchronous JavaScript to retrieve real data from a server.

We will use a public API for practice.

Use:

```text
https://jsonplaceholder.typicode.com/users
```

---

## Part A — Make the Request

Write:

```js
async function loadUsers() {

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  console.log(response);

}

loadUsers();
```

Open DevTools and inspect the Response object.

---

## Part B — Check the Response

Add:

```js
console.log(response.status);
console.log(response.ok);
```

### Questions

What do these values tell you?

What happens if you request:

```text
https://jsonplaceholder.typicode.com/does-not-exist
```

---

## Part C — Convert the Response to JSON

Add:

```js
const users = await response.json();

console.log(users);
```

Inspect the result.

You should now have an array of objects.

For example:

```js
[
  {
    id: 1,
    name: "...",
    email: "..."
  },
  ...
]
```

### Question

Why do we need:

```js
await response.json();
```

if we already used:

```js
await fetch(...);
```

> Remember: `fetch()` gives us a `Response`. Reading the response body is another asynchronous operation.

---

# Exercise 7 — Build a User List

### Goal

Connect asynchronous data with the DOM.

Create:

```html
<h1>Users</h1>

<p id="status">Loading...</p>

<ul id="users"></ul>
```

Then write JavaScript that:

1. Fetches the users
2. Checks `response.ok`
3. Converts the response to JSON
4. Loops through the users
5. Creates an `<li>` for each user
6. Displays the user's name and email
7. Updates the status message

The final page should look approximately like:

```text
Users

Leanne Graham
leanne@example.com

Ervin Howell
ervin@example.com

...
```

---

## Suggested Structure

Do not write everything in one large block.

Start with:

```js
const status = document.querySelector("#status");
const list = document.querySelector("#users");

async function loadUsers() {

  // 1. request

  // 2. check response

  // 3. parse JSON

  // 4. render users

}

loadUsers();
```

### Challenge

Create a separate function:

```js
function renderUsers(users) {
  // ...
}
```

Then your asynchronous function is responsible for **getting data**, while `renderUsers()` is responsible for **displaying data**.

This separation will become very useful as applications grow.

---

# Exercise 8 — Loading and Error States

### Goal

Make the application behave like a real web application.

Modify the previous exercise so that the interface has three states:

```text
Loading...
```

then either:

```text
Users loaded successfully
```

or:

```text
Could not load users.
```

---

## Requirements

Use:

```js
try {

} catch (error) {

} finally {

}
```

Your code should:

### Before the request

Display:

```text
Loading...
```

### If successful

Display the users.

### If an error occurs

Display:

```text
Could not load users.
```

### When everything is finished

Remove or update the loading message.

---

## Test the Error State

Temporarily change the URL to:

```text
https://jsonplaceholder.typicode.com/does-not-exist
```

Your application should not silently fail.

### Important

Remember that `fetch()` does not normally reject simply because the server returns `404`.

Therefore check:

```js
if (!response.ok) {
  throw new Error("Request failed");
}
```

---

# Exercise 9 — Sequential vs Parallel Requests

### Goal

Understand when asynchronous operations should run sequentially and when they can run in parallel.

Create these helper functions:

```js
function getCourses() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Courses loaded");
    }, 2000);
  });
}

function getNews() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("News loaded");
    }, 1000);
  });
}

function getEvents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Events loaded");
    }, 1500);
  });
}
```

---

## Part A — Sequential

Write:

```js
async function loadSequentially() {

  console.time("sequential");

  const courses = await getCourses();
  const news = await getNews();
  const events = await getEvents();

  console.log(courses);
  console.log(news);
  console.log(events);

  console.timeEnd("sequential");

}
```

Run it.

Approximately how long does it take?

---

## Part B — Parallel

Now write:

```js
async function loadInParallel() {

  console.time("parallel");

  const [courses, news, events] = await Promise.all([
    getCourses(),
    getNews(),
    getEvents()
  ]);

  console.log(courses);
  console.log(news);
  console.log(events);

  console.timeEnd("parallel");

}
```

Run it.

### Questions

1. How long does the sequential version take?
2. How long does the parallel version take?
3. Why is the parallel version faster?
4. Would `Promise.all()` be appropriate if `getNews()` depended on the result of `getCourses()`?

---

# Exercise 10 — A Search Interface

### Goal

Combine everything learned so far.

Build a small user-search application.

HTML:

```html
<h1>User Search</h1>

<form id="search-form">

  <label for="search">Search users</label>

  <input id="search">

  <button type="submit">Search</button>

</form>

<p id="status"></p>

<ul id="results"></ul>
```

---

## Requirements

When the form is submitted:

### 1\. Prevent the default form behaviour

```js
event.preventDefault();
```

### 2\. Read the search value

```js
const query = input.value.trim();
```

### 3\. Show a loading message

```text
Searching...
```

### 4\. Fetch users

Use:

```text
https://jsonplaceholder.typicode.com/users
```

### 5\. Filter the users

Search by name:

```js
user.name.toLowerCase().includes(query.toLowerCase())
```

### 6\. Render the matching users

Display:

```text
Name
Email
```

### 7\. Handle an empty result

Display:

```text
No users found.
```

### 8\. Handle errors

Display:

```text
Could not load users.
```

---

## Suggested Structure

```js
const form = document.querySelector("#search-form");
const input = document.querySelector("#search");
const status = document.querySelector("#status");
const results = document.querySelector("#results");

form.addEventListener("submit", async (event) => {

  event.preventDefault();

  // Read query

  // Show loading

  try {

    // fetch users

    // check response

    // parse JSON

    // filter users

    // render results

  } catch (error) {

    // show error

  }

});
```

### Challenge

Create:

```js
function renderUsers(users) {
  // ...
}
```

and:

```js
function showMessage(message) {
  // ...
}
```

Keep the event handler focused on coordinating the operation rather than creating every DOM element itself.

---

# Exercise 11 — The Race Condition Challenge

### Goal

Understand that asynchronous results can arrive in a different order from the order in which requests were started.

Create:

```js
function search(query) {

  const delay = Math.random() * 3000;

  return new Promise((resolve) => {

    setTimeout(() => {
      resolve(`Results for "${query}"`);
    }, delay);

  });

}
```

Now run:

```js
search("web").then(console.log);
search("web development").then(console.log);
```

Run it several times.

You may see:

```text
Results for "web development"
Results for "web"
```

or:

```text
Results for "web"
Results for "web development"
```

The order is unpredictable.

---

## Challenge

Imagine this is a search box.

The user types:

```text
web
```

then quickly changes it to:

```text
web development
```

The application should display only the newest search.

### Question

How could you prevent an old request from replacing a newer result?

Think about:

```text
AbortController
```

or tracking which request is the latest.

---

# Exercise 12 — Mini Project: Course Dashboard

## Goal

Build a small dashboard that combines the main concepts from the lecture.

Create a page with:

```text
Course Dashboard

[ Load Dashboard ]

Courses
------

Announcements
-------------

Status
------
```

---

## Requirements

When the user clicks:

```text
Load Dashboard
```

the application should load:

* courses
* announcements

Use two asynchronous operations.

For example, you can simulate them with:

```js
function getCourses() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { code: "CS210", title: "Web Development" },
        { code: "CS220", title: "Mobile Development" }
      ]);
    }, 1500);
  });
}
```

Create a similar function for announcements.

---

## Step 1 — Loading State

When the button is clicked:

```text
Loading dashboard...
```

should appear.

---

## Step 2 — Parallel Requests

Because courses and announcements are independent:

```js
const [courses, announcements] = await Promise.all([
  getCourses(),
  getAnnouncements()
]);
```

---

## Step 3 — Render Courses

Turn:

```js
[
  {
    code: "CS210",
    title: "Web Development"
  }
]
```

into:

```html
<li>CS210 — Web Development</li>
```

---

## Step 4 — Render Announcements

Turn:

```js
[
  {
    title: "Exam registration opens Monday"
  }
]
```

into:

```html
<li>Exam registration opens Monday</li>
```

---

## Step 5 — Error Handling

If either operation fails:

```text
Could not load the dashboard.
```

should appear.

---

## Step 6 — Improve the UI

Disable the button while loading:

```js
button.disabled = true;
```

and restore it in:

```js
finally {
  button.disabled = false;
}
```

---

# Final Challenge — From Static Page to Dynamic Application

You now have the tools to build a small dynamic application.

Choose one:

### Option A — Student Dashboard

Display:

* student information
* enrolled courses
* upcoming assignments
* announcements

### Option B — Course Browser

Display:

* course list
* search
* filtering
* loading state
* error state

### Option C — University News

Display:

* articles
* article titles
* publication dates
* loading state
* error state
* search

### Option D — Task Manager

Display:

* tasks
* loading state
* completed tasks
* filtering
* asynchronous creation of a task

---

## Minimum Requirements

Your project must include:

- [ ] `async/await`
- [ ] at least one `fetch()` request
- [ ] `try/catch`
- [ ] a loading state
- [ ] an error state
- [ ] JSON data
- [ ] an array of objects
- [ ] DOM rendering
- [ ] at least one event listener
- [ ] at least one user interaction
- [ ] a function dedicated to rendering data

---

# Reflection Questions

After completing the exercises, answer these questions without looking at your code.

### 1.

What is the difference between:

```js
fetch("/api/users")
```

and:

```js
await fetch("/api/users")
```

---

### 2.

What does a Promise represent?

---

### 3.

What are the three states of a Promise?

---

### 4.

Why does this:

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

produce:

```text
A
C
B
```

?

---

### 5.

What is the difference between:

```js
.then()
```

and:

```js
await
```

?

---

### 6.

Why do we need:

```js
await response.json();
```

after:

```js
await fetch(...);
```

?

---

### 7.

Why should we check:

```js
response.ok
```

?

---

### 8.

When should we use:

```js
Promise.all()
```

?

---

### 9.

Why can asynchronous requests create race conditions?