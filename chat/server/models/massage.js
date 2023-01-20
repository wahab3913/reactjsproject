const mongoose = require("mongoose");
const massage = mongoose.Schema;

const massageSchema = new massage({
  massage: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  content: { type: String, trim: true },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chat",
  },
  timestamp: true,
});

module.exports = mongoose.model("massage", massageSchema);
