const paths = {
  announcements: "announcements.html",
  content: "content.html",
  discussions: "discussions.html",
  calendar: "calendar.html",
  profile: "",
  settings: "",
};

$(function () {
  const pathname = window.location.pathname.split("/").pop();
  $("nav").append(
    `
        <a href="${paths.announcements}" class="navbar-item${
          pathname === paths.announcements ? " selected" : ""
        }">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon">
              <i class="fa-solid fa-bullhorn scale-110"></i>
            </div>
            <span class="navbar-text">Announcements</span>
          </div>
        </a>
        <a href="${paths.content}" class="navbar-item${
          pathname === paths.content ? " selected" : ""
        }">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon">
              <i class="fa-solid fa-book-open scale-110"></i>
            </div>
            <span class="navbar-text">Content</span>
          </div>
        </a>
        <a href="${paths.discussions}" class="navbar-item${
          pathname === paths.discussions ? " selected" : ""
        }">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon">
              <i class="fa-solid fa-comment scale-110"></i>
            </div>
            <span class="navbar-text">Discussions</span>
          </div>
        </a>
        <a href="${paths.calendar}" class="navbar-item${
          pathname === paths.calendar ? " selected" : ""
        }">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon">
              <i class="fa-solid fa-calendar scale-110"></i>
            </div>
            <span class="navbar-text">Calender</span>
          </div>
        </a>
        <a href="${paths.profile}" class="navbar-item">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon bg-gray-200 rounded-xl mr-2">HA</div>
            <span class="navbar-text">Himanshu</span>
          </div>
        </a>
        <a href="${paths.settings}" class="navbar-item">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon">
              <i class="fa-solid fa-gear scale-125"></i>
            </div>
            <span class="navbar-text">Settings</span>
          </div>
        </a>
          `
  );
});
