
let selectedCourse = "Course 1";

function updateSidebarCourses() {
  $(".sidebar-courses-list-item.selected").removeClass("selected");
  $(`.sidebar-courses-list-item:contains('${selectedCourse}')`).addClass(
    "selected"
  );
}

function refresh() {
  updateSidebarCourses();
}

$(function () {
  openCourse(selectedCourse.split(" ").join(""));
});

var commentDisable = true;
var currentContent = "";
function openCourse(courseName) {
  selectedCourse = courseName.split("Course").join(" ");
  refresh();
  
  var i, courseTab, tablinks;
  courseTab = document.getElementsByClassName("CourseTab");
  for (i = 0; i < courseTab.length; i++) {
    courseTab[i].style.display = "none";
  }
  closeCourseContentListing()
  closeCourseContent()
  // tablinks = document.getElementsByClassName("CourseTablinks");
  // for (i = 0; i < tablinks.length; i++) {
  //   tablinks[i].className = tablinks[i].className.replace(" active", "");
  // }
  const courseNameTab = document.getElementById(`${courseName}Tab`);
  if (courseNameTab !== null){
    courseNameTab.style.display = "flex"
  }
}

function openCourseContentListing(evt, courseName) {
  var i, courseContent, tablinks;
  courseContent = document.getElementsByClassName("CourseContentListing");
  for (i = 0; i < courseContent.length; i++) {
    courseContent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("ContentTablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(courseName).style.display = "block";
  evt.currentTarget.className += " active";
}

function openCourseContent(evt, courseName) {
  var i, courseContent, tablinks;
  closeCourseContent();
  courseContent = document.getElementsByClassName("CourseContent");
  for (i = 0; i < courseContent.length; i++) {
    courseContent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("ContentListingTablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(courseName).style.display = "block";
  evt.currentTarget.className += " active";

  currentContent = courseName;
  commentDisable = !commentDisable;
  toggleComments();
}

function closeCourseContentListing() {
  var courseContent;
  courseContent = document.getElementsByClassName("CourseContentListing");
  for (i = 0; i < courseContent.length; i++) {
    courseContent[i].style.display = "none";
  }
}

function closeCourseContent() {
  var courseContent;
  courseContent = document.getElementsByClassName("CourseContent");
  for (i = 0; i < courseContent.length; i++) {
    courseContent[i].style.display = "none";
  }
  currentContent = "";
}

function toggleComments() {
  commentDisable = !commentDisable
  var comments;
  comments = document.getElementsByClassName("CommentListing");
  for (i = 0; i < comments.length; i++) {
    comments[i].style.display = "none";
  }
  document.getElementById("CommentNub").style.display = commentDisable ? "block" : "none";
  document.getElementById("CommentTab").style.display = commentDisable ? "none" : "block";
  document.getElementById("Comment" + currentContent).style.display = commentDisable ? "none" : "block";
}