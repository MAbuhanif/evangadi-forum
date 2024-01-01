const express = require("express");
const router = express.Router();
//auth middleware

//question controllers
const {
  postQuestion,
  allQuestions,
  singleQuestion,
} = require("../controller/questionController");
const authMiddleware = require("../middleware/authMiddleware");

//ask-question route
router.post("/ask-question", authMiddleware, postQuestion);

//get all questions route
router.get("/allQuestions", authMiddleware, allQuestions);

//single question route
router.get("/singleQuestion", authMiddleware, singleQuestion);

module.exports = router;
