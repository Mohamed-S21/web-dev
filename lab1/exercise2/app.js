function check(label, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "✔" : "✘"} ${label}`, ok ? "" : { actual, expected });
}

// TODO 1 — Letter for a grade out of 20 (highest threshold first!).
function letter(grade) {
  if (grade >= 16) {
    return "A";
  } else if (grade >= 14) {
    return "B";
  } else if (grade >= 12) {
    return "C";
  } else if (grade >= 10) {
    return "D";
  } else {
    return "F";
  }
}

// TODO 2 — "Pass" if the grade is 10 or more, "Fail" otherwise (ternary, one line).
function status(grade) {
  return grade >= 10 ? "Pass" : "Fail";
}

// TODO 3 — Sum of the numbers (for...of + let).
function sum(numbers) {
  let total = 0;
  for (const n of numbers) {
    total += n;
  }
  return total;
}

// TODO 4 — How many grades are 10 or more (for...of + if).
function countPassed(grades) {
  let passed = 0;
  for (const g of grades) {
    if (g >= 10) {
      passed++;
    }
  }
  return passed;
}

// TODO 5 — Array counting down from n to 1 (classic for loop + push).
function countdown(n) {
  const result = [];
  for (let i = n; i >= 1; i--) {
    result.push(i);
  }
  return result;
}

// ---------- Do not change ----------
check("letter A",    letter(17), "A");
check("letter B",    letter(14), "B");
check("letter D",    letter(10), "D");
check("letter F",    letter(9.5), "F");
check("status",      [status(10), status(9)], ["Pass", "Fail"]);
check("sum",         sum([4, 6, 10]), 20);
check("countPassed", countPassed([8, 12, 10, 15, 3]), 3);
check("countdown",   countdown(3), [3, 2, 1]);
