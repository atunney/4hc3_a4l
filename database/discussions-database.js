const json = {
  courses: {
    "Course 1": {
      name: "Course 1",
      channels: {
        professor: {
          name: "Professor",
          chats: [
            {
              type: "received",
              from: "Professor",
              timestamp: "10:18AM",
              message:
                "Hey, the question you asked me during lecture today was quite interesting. I think I finally have the answer. As far as I can tell, you need to use a path-finding algorithm to find the distances between the nodes, and then return the lowest distance.",
            },
            {
              type: "sent",
              from: "You",
              timestamp: "10:18AM",
              message:
                "I see. Thanks for getting back to me! It makes sense now. I will keep you updated on how the project moves forward.",
              status: "Seen",
            },
          ],
        },
        ta: {
          name: "TA",
          chats: [],
        },
        classmates: {
          name: "Classmates",
          chats: [],
        },
        other: {
          name: "Other",
          chats: [],
        },
      },
    },
    "Course 2": {
      name: "Course 2",
      channels: {
        professor: {
          name: "Professor",
          chats: [],
        },
        ta: {
          name: "TA",
          chats: [],
        },
        classmates: {
          name: "Classmates",
          chats: [],
        },
        other: {
          name: "Other",
          chats: [],
        },
      },
    },
  },
};
