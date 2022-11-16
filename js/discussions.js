const chatClassNames = {
  from: {
    "chat-wrapper": "from-chat-wrapper",
    "chat-icon": "from-chat-icon",
    "chat-text-wrapper": "from-chat-text-wrapper",
  },
  to: {
    "chat-wrapper": "to-chat-wrapper",
    "chat-icon": "to-chat-icon",
    "chat-text-wrapper": "to-chat-text-wrapper",
  },
};

let selectedCourse = "Course 1",
  selectedChat = "professor";

function scrollToBottomOfChat() {
  $("main").animate({ scrollTop: $("main").prop("scrollHeight") }, 100);
}

function appendChatMessage(chat) {
  const chatClass = chatClassNames[chat.type === "received" ? "from" : "to"];
  $(".chat-wrapper").append(
    `
          <div class="${chatClass["chat-wrapper"]}">
              <div class="relative">
                  <div
                  class="${chatClass["chat-icon"]}"
                  >
                      <i class="fa-solid fa-user"></i>
                  </div>
                  <div
                  class="${chatClass["chat-text-wrapper"]}"
                  >
                      ${chat.message}
                  </div>
                  <div class="chat-receipt-wrapper">
                      <div>${chat.from} - ${chat.timestamp}</div>
                      ${
                        chat.status !== undefined
                          ? `<div>${chat.status}</div>`
                          : ""
                      }
                  </div>
              </div>
          </div>
          `
  );
}

function sendChatMessage(message) {
  const chat = {
    type: "sent",
    message: message,
    from: "You",
    timestamp: "Now",
  };
  appendChatMessage(chat);
}

function sendMessage() {
  const message = $("#chat-input-message").val();
  if (message.length > 0) {
    $("#chat-input-message").val("");
    sendChatMessage(message);
    scrollToBottomOfChat();
  }
}

function refreshSidebar(courses) {
  $(".course-tree-wrapper").empty();
  for (const courseName in courses) {
    const course = courses[courseName];
    let courseHTML = $.parseHTML(
      `
        <div>
        <h2 class="course-name-text">${course.name}</h2>
        <div class="course-tree">
          <ul class="mt-3" id="channel-list">
          </ul>
        </div>`
    );
    for (const channel in course.channels) {
      const selectedChannel =
        selectedCourse === course.name && channel === selectedChat;
      $(courseHTML)
        .find("#channel-list")
        .append(
          `<li onclick="onChannelClick('${course.name}', '${channel}');">
            <span class="${selectedChannel ? "selected-channel" : ""}">
                #${course.channels[channel].name}
            </span>
        </li>`
        );
    }
    $(".course-tree-wrapper").append(courseHTML);
  }
}

function refreshChat(courses) {
  $(".chat-wrapper").empty();
  for (const courseName in courses) {
    const course = courses[courseName];
    if (selectedCourse === courseName) {
      for (const chat of course.channels[selectedChat].chats) {
        appendChatMessage(chat);
      }
    }
  }
}

function refresh() {
  $.getJSON("database/discussions.json", function (json) {
    const courses = json.courses;
    refreshSidebar(courses);
    refreshChat(courses);
    scrollToBottomOfChat();
  }).fail(function () {
    console.log("An error has occurred while reading discussions.");
  });
}

function onChannelClick(courseName, channelName) {
  selectedCourse = courseName;
  selectedChat = channelName;
  refresh();
}

$(function () {
  refresh();

  scrollToBottomOfChat();

  $("#chat-send-button").on("click", sendMessage);
  $("#chat-input-message").keypress(function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
});
