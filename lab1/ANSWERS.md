# Lab 1 — Think answers

''**Exercise 1.** `e` is still `" A@B.org "`. Strings are immutable: `trim` and `toLowerCase` do not change the original, they return a new string, and that result is lost unless I store it (`const clean = cleanEmail(e);`).
''

''**Exercise 2.** With `grade >= 10` first, `letter(17)` returns `"D"`: 17 ≥ 10 is true, so the chain stops at the first match and never reaches the `"A"` test. The tests must go from the highest threshold to the lowest.
''

''**Exercise 3.** The spread syntax copies the properties into a new object, so the original is untouched. Without it, `product` is a reference to the same object stored in the array, so `product.price = newPrice` would change `products[0].price` to 600 and the "original intact" check would fail.
''

''**Exercise 4.** `querySelector("title")` (no `#`) looks for a `<title>` tag, and the first one in the document is the one in `<head>`. So the browser tab text changed, not the `<h1>`. `#` selects an id, `.` a class, and a bare word selects a tag name.
''

''**Exercise 5.** The sixth meal appears in the list and the count line becomes "6 meals · …" automatically, because the page is built from the array. The data lives in one place, there is no repeated HTML to copy, and the count cannot get out of sync with the list.
''

''**Exercise 6.** With `addOne()` the parentheses call the function immediately, while the listener is being registered. The value passed to `addEventListener` is then the return value (`undefined`), not the function. The counter goes up once on page load and clicking `+` does nothing. The fix is to pass the function itself: `addEventListener("click", addOne)`.
''

''**Exercise 7.** The browser's default behaviour for a form is to submit and reload the page. The page reloads, so the `<li>` I just added (it only existed in the page's memory) disappears and the list is empty again. `event.preventDefault()` cancels that default.
''
