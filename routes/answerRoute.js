const express = require("express");
const router = express.Router();
const { postAnswer, getAnswer } = require("../controller/answerController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/answer", authMiddleware, postAnswer);
router.post("/getAnswer", authMiddleware, getAnswer);

module.exports = router;
