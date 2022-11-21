const paths = {
  announcements: "announcements.html",
  content: "content.html",
  discussions: "discussions.html",
  calendar: "calendar.html",
  profile: "",
  settings: "",
  login: "index.html",
};

function clearLocalStorage() {
  localStorage.removeItem("courses");
  localStorage.removeItem("events");
  location.reload();
}


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
            <span class="navbar-text-content">Announcements</span>
          </div>
        </a>
        <a href="${paths.content}" class="navbar-item${
          pathname === paths.content ? " selected" : ""
        }">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon">
              <i class="fa-solid fa-book-open scale-110"></i>
            </div>
            <span class="navbar-text-content">Content</span>
          </div>
        </a>
        <a href="${paths.discussions}" class="navbar-item${
          pathname === paths.discussions ? " selected" : ""
        }">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon">
              <i class="fa-solid fa-comment scale-110"></i>
            </div>
            <span class="navbar-text-content">Discussions</span>
          </div>
        </a>
        <a href="${paths.calendar}" class="navbar-item${
          pathname === paths.calendar ? " selected" : ""
        }">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon">
              <i class="fa-solid fa-calendar scale-110"></i>
            </div>
            <span class="navbar-text-content">Calender</span>
          </div>
        </a>
        <div class="navbar-item navbar-dropdown-wrapper">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon bg-gray-200 rounded-xl mr-2">HA</div>
            <span class="navbar-text-content">Himanshu</span>
          </div>
          <div class="navbar-dropdown">
            <a href="${paths.login}" class="navbar-dropdown-item">Logout</a>
          </div>
        </div>
        <div class="navbar-item navbar-dropdown-wrapper">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon">
              <i class="fa-solid fa-gear scale-125"></i>
            </div>
            <span class="navbar-text-content">Settings</span>
          </div>
          <div class="navbar-dropdown">
            <div onclick="clearLocalStorage();" class="navbar-dropdown-item">Reset To Default</div>
          </div>
        </div>
          `
  );
});
