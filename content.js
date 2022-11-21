let selectedCourse = "Course 1",
  selectedContentType = null,
  selectedContent = null;

function getAllComments() {
  return JSON.parse(localStorage.getItem("comments")) || json.comments;
}

function storeComments(comments) {
  localStorage.setItem("comments", JSON.stringify(comments));
}

function getComments(selectedCourse, selectedContentType, selectedContent) {
  const comments = getAllComments();
  if (!(selectedCourse && selectedContentType && selectedContent)) {
    return [];
  }
  console.log(`${selectedCourse}|${selectedContentType}|${selectedContent}`);
  return comments[selectedCourse].content[selectedContentType][selectedContent]
    .comments;
}

function addComment(
  selectedCourse,
  selectedContentType,
  selectedContent,
  comment
) {
  const comments = getAllComments();
  comments[selectedCourse].content[selectedContentType][
    selectedContent
  ].comments.push(comment);
  storeComments(comments);
}

function displayComments() {
  const comments = getComments(
    selectedCourse,
    selectedContentType,
    selectedContent
  );
  hideComments();
  for (const comment of comments) {
    appendComment(comment);
  }
}

function hideComments() {
  $(".chat-wrapper").empty();
}

function appendComment(comment) {
  const commentType = comment.type === "received" ? "from" : "to";
  $(".chat-wrapper").append(
    `
    <div class="${commentType}-chat-wrapper">
      <div class="relative">
        <div class="${commentType}-chat-icon">
          <i class="fa-solid fa-user"></i>
        </div>
        <div class="${commentType}-chat-text-wrapper">
            ${comment.message}
        </div>
        <div class="${commentType}-chat-receipt-wrapper">
            <div>${comment.from}</div> 
        </div>
      </div>
    </div>
    `
  );
}

function updateSidebarCourses() {
  $(".sidebar-courses-list-item.selected").removeClass("selected");
  $(`.sidebar-courses-list-item:contains('${selectedCourse}')`).addClass(
    "selected"
  );
}

function refresh() {
  updateSidebarCourses();
}

function sendComment(message) {
  const comment = {
    type: "sent",
    message: message,
    from: "You",
  };

  addComment(selectedCourse, selectedContentType, selectedContent, comment);
  appendComment(comment);
}

function onCommentSend() {
  const message = $("#chat-input-message").val();
  if (message.length > 0) {
    $("#chat-input-message").val("");
    sendComment(message);
    // scrollToBottomOfChat(); // TODO
  }
}

$(function () {
  openCourse(selectedCourse.split(" ").join(""));

  $("#chat-send-button").on("click", onCommentSend);
  $("#chat-input-message").keypress(function (event) {
    if (event.key === "Enter") {
      onCommentSend();
    }
  });
});

var commentDisable = true;
var currentContent = "";
function openCourse(courseName) {
  const temp = courseName.split(/(Course)/);
  temp.shift();
  selectedCourse = temp.join(" ");
  selectedContentType = null;
  selectedContent = null;
  displayComments();
  refresh();

  var i, courseTab;
  courseTab = document.getElementsByClassName("CourseTab");
  for (i = 0; i < courseTab.length; i++) {
    courseTab[i].style.display = "none";
  }
  closeCourseContentListing();
  closeCourseContent();

  const courseNameTab = document.getElementById(`${courseName}Tab`);
  if (courseNameTab !== null) {
    courseNameTab.style.display = "flex";
  }
}

function openCourseContentListing(evt, courseName) {
  selectedContentType = courseName
    .replace(selectedCourse.replace(" ", ""), "")
    .trim();
  displayComments();
  selectedContent = null;
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
  selectedContent = courseName
    .replace(selectedCourse.replace(" ", ""), "")
    .split(selectedContentType.slice(0, -1))
    .join(`${selectedContentType.slice(0, -1)} `)
    .trim();
  displayComments();
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
  commentDisable = !commentDisable;
  var comments;
  comments = document.getElementsByClassName("CommentListing");
  for (i = 0; i < comments.length; i++) {
    comments[i].style.display = "none";
  }
  document.getElementById("CommentNub").style.display = commentDisable
    ? "block"
    : "none";
  document.getElementById("CommentTab").style.display = commentDisable
    ? "none"
    : "flex";
  displayComments();
}
