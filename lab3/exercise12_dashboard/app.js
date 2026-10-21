const loadBtn = document.querySelector("#loadBtn");
const statusEl = document.querySelector("#dashboardStatus");
const courseList = document.querySelector("#courseList");
const announcementList = document.querySelector("#announcementList");

function getCourses() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { code: "CS210", title: "Web Development" },
        { code: "CS220", title: "Mobile Development" },
        { code: "CS310", title: "Cloud Computing" }
      ]);
    }, 1200);
  });
}

function getAnnouncements() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { title: "Exam registration opens Monday" },
        { title: "Lab 3 solutions will be reviewed in tutorial" }
      ]);
    }, 800);
  });
}

function renderCourses(courses) {
  courseList.innerHTML = "";
  for (const course of courses) {
    const li = document.createElement("li");
    li.textContent = `${course.code} — ${course.title}`;
    courseList.append(li);
  }
}

function renderAnnouncements(announcements) {
  announcementList.innerHTML = "";
  for (const ann of announcements) {
    const li = document.createElement("li");
    li.textContent = ann.title;
    announcementList.append(li);
  }
}

loadBtn.addEventListener("click", async () => {
  loadBtn.disabled = true;
  statusEl.textContent = "Loading dashboard...";
  courseList.innerHTML = "";
  announcementList.innerHTML = "";

  try {
    const [courses, announcements] = await Promise.all([
      getCourses(),
      getAnnouncements()
    ]);

    renderCourses(courses);
    renderAnnouncements(announcements);
    statusEl.textContent = "Dashboard loaded successfully.";
  } catch (error) {
    statusEl.textContent = "Could not load the dashboard.";
    console.error(error);
  } finally {
    loadBtn.disabled = false;
  }
});
