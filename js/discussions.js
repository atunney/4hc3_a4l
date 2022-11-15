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

const selectedCourse = "Course 1";
const selectedChat = "professor";

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

$(function () {
  $.getJSON("database/discussions.json", function (json) {
    const courses = json.courses;
    for (const course of courses) {
      if (selectedCourse === course.name) {
        for (const chat of course.channels[selectedChat].chats) {
          appendChatMessage(chat);
        }
      }
    }
  }).fail(function () {
    console.log("An error has occurred while reading discussions.");
  });

  scrollToBottomOfChat();

  $("#chat-send-button").on("click", sendMessage);
  $("#chat-input-message").keypress(function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
});
