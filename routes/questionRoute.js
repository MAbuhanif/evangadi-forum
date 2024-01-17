const express = require("express");
const router = express.Router();
//auth middleware

//question controllers
const {
  postQuestion,
  allQuestions,
  singleQuestion,
} = require("../controller/questionController");

//ask-question route
router.post("/ask-question", postQuestion);

//get all questions route
router.get("/allQuestions", allQuestions);

//single question route
router.get("/singleQuestion/:questionid", singleQuestion);

module.exports = router;
