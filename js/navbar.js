$(function () {
  $("nav").append(
    `
        <div class="navbar-item selected">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon">
              <i class="fa-solid fa-bullhorn scale-110"></i>
            </div>
            <a href="/announcements.html" class="navbar-text">Announcements</a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon">
              <i class="fa-solid fa-book-open scale-110"></i>
            </div>
            <a href="/content.html" class="navbar-text">Content</a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon">
              <i class="fa-solid fa-comment scale-110"></i>
            </div>
            <a href="/discussions.html" class="navbar-text">Discussions</a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon">
              <i class="fa-solid fa-calendar scale-110"></i>
            </div>
            <a href="/calendar.html" class="navbar-text">Calender</a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon bg-gray-200 rounded-xl mr-2">HA</div>
            <a href="/" class="navbar-text">Himanshu</a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="navbar-item-content-wrapper">
            <div class="navbar-icon">
              <i class="fa-solid fa-gear scale-125"></i>
            </div>
            <a href="/" class="navbar-text">Settings</a>
          </div>
        </div>
          `
  );
});
