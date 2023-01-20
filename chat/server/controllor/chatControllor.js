const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModal");
const User = require("../models/userModal");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  var isChat = await Chat.findOne({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email pic",
  });
  if (isChat.length > 0) {
    console.log("Chat already exists");
    return res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      console.log("Chat created");
      const FullChat = await Chat.findById({
        _id: createdChat._id,
      }).populate("users", "-password");
      res.status(201).send(FullChat);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
});

const fetchChat = asyncHandler(async (req, res) => {
  try {
    Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name email pic",
        });
        res.status(200).send(results);
        console.log(results);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send("Users and name are required");
  }
  if (users.length < 2) {
    return res.status(400).send("More than 2 users are required");
  }
  try {
    const groupChat = await Chat.create({
      ChatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({
      _id: groupChat._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(201).send(fullGroupChat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = { accessChat, fetchChat, createGroupChat };
