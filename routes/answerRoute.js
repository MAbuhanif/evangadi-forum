const express = require("express");
const router = express.Router();
const { postAnswer, getAnswer } = require("../controller/answerController");
const authMiddleware = require("../middleware/authMiddleware");

//get answer for a question
router.get("/getAnswer/:questionid", authMiddleware, getAnswer);

//post answer for a question
router.post("/answer/:questionid", authMiddleware, postAnswer);

module.exports = router;
