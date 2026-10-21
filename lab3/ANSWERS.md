# Lab 3 Answers — Asynchronous JavaScript

## Exercise 1 — Understanding Asynchronous Execution

### Part A
1. **Output:**
   ```text
   A
   C
   B
   ```
2. **Why "B" does not appear between "A" and "C":**
   `setTimeout` registers its callback in the host API environment and defers execution to the Task Queue (Callback Queue). The JavaScript engine continues executing the main call stack synchronously to completion. Even with a delay of `0` ms, the callback cannot execute until the call stack is completely clear and the Event Loop pushes it onto the stack.
3. **What changes if timeout becomes 1000:**
   The printed order remains identical (`A`, `C`, `B`). The only change is that `"B"` waits at least 1000 milliseconds (1 second) before its callback is moved to the queue and executed.

### Part B
- **Prediction:**
  ```text
  1
  4
  3
  2
  ```
- **Why the 0ms timer executes after "4":**
  Synchronous statements run immediately on the execution stack. `"1"` and `"4"` log synchronously. The 0ms callback waits in the Task Queue until all synchronous code in the stack finishes.

### Part C
- **Timeline:**
  ```text
  Start (t = 0s, synchronous)
    ↓
  End (t = 0s, synchronous)
    ↓
  Timer 2 (t = 1s, 1000ms timer expires)
    ↓
  Timer 1 (t = 2s, 2000ms timer expires)
  ```
- **Explanation:**
  `"Start"` and `"End"` run synchronously on the call stack first. `Timer 2` is queued to run after 1000ms, and `Timer 1` is queued to run after 2000ms. Since 1000ms < 2000ms, `Timer 2`'s callback enters the queue and runs before `Timer 1`.

---

## Exercise 2 — Callbacks and Delayed Work
1. **Why indentation increases:**
   Each subsequent step is nested inside the callback of the preceding step to guarantee sequential execution.
2. **Ten steps:**
   It results in severe "Callback Hell" (Pyramid of Doom), heavily indented code extending far to the right.
3. **Problems created:**
   It harms code readability, makes refactoring error-prone, complicates scope management, and makes handling errors across steps extremely tedious.

---

## Exercise 3 — Your First Promises
- **Why write `return wait(1);` instead of `wait(1);`:**
  Returning a Promise inside a `.then()` handler chains the resolution of the next `.then()` to that returned Promise. Omitting `return` causes the next `.then()` to resolve immediately with `undefined` instead of waiting for the 1-second delay.

---

## Exercise 4 — Promises and Errors
1. **`.then()`:** Runs when the Promise resolves successfully (fulfilled state).
2. **`.catch()`:** Runs when the Promise is rejected or if an error is thrown within the chain.
3. **`.finally()`:** Runs unconditionally once the Promise settles (regardless of whether it resolved or rejected).

---

## Exercise 5 — Rewrite Promises Using async/await
- **Readability comparison:**
  `async/await` reads like synchronous procedural code from top to bottom. It flattens promise chains, allows standard `try/catch` error handling, and removes callback/handler nesting.

---

## Exercise 6 — Your First fetch()
- **Response properties:**
  - `response.status`: The HTTP status code (e.g., `200` for OK, `404` for Not Found).
  - `response.ok`: A boolean that is `true` if status code is in the 200–299 range, and `false` otherwise.
- **Requesting a non-existent URL:**
  The server responds with a `404` status code. `response.ok` is `false`, and `response.status` is `404`. Note that `fetch()` does NOT reject the promise on 404; it only rejects on network failures.
- **Why `await response.json()` is needed:**
  `fetch()` resolves as soon as the HTTP response headers arrive. Reading and parsing the full body payload as JSON streams over the network asynchronously, requiring a second `await`.

---

## Exercise 9 — Sequential vs Parallel Requests
1. **Sequential duration:** Approximately 4.5 seconds (2.0s + 1.0s + 1.5s).
2. **Parallel duration:** Approximately 2.0 seconds (the duration of the longest operation, `getCourses`).
3. **Why parallel is faster:** All three network/timer operations initiate concurrently in background threads rather than waiting for each to finish before starting the next.
4. **Is `Promise.all()` appropriate if dependent:** No. If `getNews()` requires data returned from `getCourses()`, it must run sequentially using `await getCourses()` first.

---

## Exercise 11 — The Race Condition Challenge
- **Preventing old requests from overwriting newer ones:**
  1. **`AbortController`:** Abort the active in-flight fetch request before dispatching a new search (`controller.abort()`).
  2. **Request ID / Counter tracking:** Increment an integer sequence ID on every search keystroke and only render results if the returned response matches the latest ID.

---

## Reflection Questions (Lab 3 Wrap-up)

### 1. Difference between `fetch("/api/users")` and `await fetch("/api/users")`:
`fetch("/api/users")` immediately returns a `Promise<Response>` in a pending state without pausing code execution. `await fetch("/api/users")` pauses execution within an `async` function until that Promise settles, directly yielding the resolved `Response` object.

### 2. What does a Promise represent?
A Promise represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

### 3. The three states of a Promise:
- **Pending:** Initial state; neither fulfilled nor rejected.
- **Fulfilled (Resolved):** The asynchronous operation succeeded.
- **Rejected:** The asynchronous operation failed.

### 4. Why `A -> setTimeout 0 -> C` produces `A`, `C`, `B`:
JavaScript is single-threaded. `"A"` and `"C"` run immediately on the synchronous Call Stack. `setTimeout` delegates the callback to the Task Queue via the host environment. The Event Loop only dequeues `"B"` onto the Call Stack after all synchronous script execution finishes.

### 5. Difference between `.then()` and `await`:
`.then()` takes callback functions to handle resolved values, continuing synchronous execution around the chain. `await` halts further execution inside an `async` function until the Promise resolves, allowing values to be assigned directly to variables without nesting callbacks.

### 6. Why `await response.json()` is needed after `await fetch()`:
`fetch()` resolves when HTTP headers are received. The response body continues streaming in chunks across the network. Parsing those chunks into a JSON JavaScript object is an asynchronous I/O operation that returns another Promise.

### 7. Why should we check `response.ok`?
`fetch()` only rejects its Promise on network failure or DNS errors, not HTTP error codes like `404` or `500`. Checking `response.ok` ensures the server returned a successful 2xx status code before attempting to process data.

### 8. When should we use `Promise.all()`?
Use `Promise.all()` when multiple asynchronous operations are completely independent of each other and should run concurrently to minimize total execution time, where all results are required.

### 9. Why can asynchronous requests create race conditions?
Network delays and server processing times are non-deterministic. A subsequent request dispatched later might complete faster than an earlier request, potentially allowing obsolete data to arrive and overwrite current state.
