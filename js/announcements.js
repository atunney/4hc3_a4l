const ALL_COURSES = "All Courses";

let selectedCourse = ALL_COURSES;

function updateAnnouncements() {
  $(".annoucementWindow").empty();
  let announcements = json.announcements;
  if (selectedCourse !== ALL_COURSES) {
    announcements = announcements.filter((a) => a.course === selectedCourse);
  }
  if (announcements.length === 0) {
    $(".annoucementWindow").append('<h2 class="text-4xl font-bold">There are no announcements for the selected course.</h2>')
  }
  else {
    for (const announcement of announcements) {
        const announcementHTML = `
          <div class="annoucementMessageBox">
              <div class="annoucementMessageCourse">${announcement.course} - ${announcement.type}</div>
              <div class="annoucementMessageDate">${announcement.timestamp}</div>
              <hr></hr>
              <div class="annoucementMessageTitle">${announcement.title}</div>
              <div class="annoucementMessageDesc">
              ${announcement.content}
              </div>
              <div class="annoucementMessageAuthor">- ${announcement.author}</div>
          </div>
        `;
        $(".annoucementWindow").append(announcementHTML);
      }
  }
}

function updateSidebarCourses() {
  $(".sidebar-courses-list-item.selected").removeClass("selected");
  if (selectedCourse === ALL_COURSES) {
    $(".sidebar-courses-list-item:first").addClass("selected");
  } else {
    $(`.sidebar-courses-list-item:contains('${selectedCourse}')`).addClass(
      "selected"
    );
  }
}

function refresh() {
  updateAnnouncements();
  updateSidebarCourses();
}

function onCourseClick(courseName) {
  selectedCourse = courseName;
  refresh();
}

$(function () {
  updateAnnouncements();
});
