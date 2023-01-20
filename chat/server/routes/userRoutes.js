const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  allUser,
} = require("../controllor/userControllor");
const upload = require("./multer");
const protect = require("../middleware/auth");

router.post("/register", upload.single("pic"), registerUser);
router.post("/login", loginUser);
router.get("/", protect, allUser);

module.exports = router;
