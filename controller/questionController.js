const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

//function to post questions
async function postQuestion(req, res) {
  const { title, description } = req.body;
  if (!title || !description) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "please fill all required fields!" });
  }
  try {
    const questionid = uuidv4();

    await dbConnection.query(
      "INSERT INTO questions (questionid, title, description, userid) VALUES (?,?,?,?)",
      [questionid, title, description, req.user.userid]
    );

    return res
      .status(StatusCodes.OK)
      .json({ msg: "question added successfully!" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "somthing went wrong, try again!" });
  }
}
//function to get all questions function
async function allQuestions(req, res) {
  try {
    const [allQuestion] = await dbConnection.query(
      "SELECT title, questionid, username FROM questions JOIN users ON users.userid = questions.userid ORDER BY id DESC "
    );
    return res.status(StatusCodes.OK).json({ allQuestion });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "somthing went wrong, try again!" });
  }
}
//function to get details of a specific question
async function singleQuestion(req, res) {
  const questionid = req.params.questionid;
  const [question] = await dbConnection.query(
    "SELECT title, description FROM questions WHERE questionid = ?",
    [questionid]
  );

  if (question.length == 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Question not found" });
  }
  return res.status(StatusCodes.OK).json({ question });
}
module.exports = { postQuestion, allQuestions, singleQuestion };
