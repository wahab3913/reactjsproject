const expres = require("express");
const protect = require("../middleware/auth");
const {
  accessChat,
  fetchChat,
  createGroupChat,
} = require("../controllor/chatControllor");

const router = expres.Router();
router.route("/").post(protect, accessChat);
// router.route("/").post(protect, acessChat);
router.route("/").get(protect, fetchChat);
router.route("/group").post(protect, createGroupChat);

module.exports = router;
