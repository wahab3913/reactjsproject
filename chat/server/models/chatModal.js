const moongoose = require("mongoose");
const chat = moongoose.Schema;

const chatSchema = new chat(
  {
    chatName: { type: String, required: true, trim: true, unique: true },
    isGroupChat: { type: Boolean, required: true, default: false },
    user: [
      {
        type: moongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    message: [
      {
        type: moongoose.Schema.Types.ObjectId,
        ref: "message",
      },
    ],
    groupAdmin: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = moongoose.model("chat", chatSchema);
