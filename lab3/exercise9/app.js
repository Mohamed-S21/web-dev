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

async function loadSequentially() {
  console.log("--- Starting Sequential ---");
  console.time("sequential");
  const courses = await getCourses();
  const news = await getNews();
  const events = await getEvents();
  console.log(courses, news, events);
  console.timeEnd("sequential");
}

async function loadInParallel() {
  console.log("--- Starting Parallel ---");
  console.time("parallel");
  const [courses, news, events] = await Promise.all([
    getCourses(),
    getNews(),
    getEvents()
  ]);
  console.log(courses, news, events);
  console.timeEnd("parallel");
}

async function runDemo() {
  await loadSequentially();
  await loadInParallel();
}

runDemo();
