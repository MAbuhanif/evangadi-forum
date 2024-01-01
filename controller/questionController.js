const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
// const jwt = require("jsonwebtoken");

//function to post questions
async function postQuestion(req, res) {
  const { title, description, tag } = req.body;
  if (!title || !description || !tag) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please fill all required fields!" });
  }
  try {
    const userid = req.user.userid;
    // const username = req.user.username;
    const [result] = await dbConnection.query(
      "INSERT INTO questions (userid, title, description, tag) VALUES (?,?,?,?)",
      [userid, title, description, tag]
    );
    // return res.status(StatusCodes.ACCEPTED).json({ result });

    return res
      .status(StatusCodes.ACCEPTED)
      .json({ msg: "question posted successfully!" });
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
      "SELECT * FROM questions ORDER BY questionid DESC "
    );
    return res
      .status(StatusCodes.ACCEPTED)
      .json({ msg: "all questions posted are:", question: allQuestion });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "somthing went wrong, try again!" });
  }
}
//function to get details of a specific question
async function singleQuestion(req, res) {
  const {questionid}  = req.params;
  const [questionRows] = await dbConnection.query(
    "SELECT * FROM questions WHERE questionid = ?",
    [questionid]
  );
  return res.status(StatusCodes.ACCEPTED).json({questionRows})
  // if (questionRows.length === 0) {
  //   return res
  //     .status(StatusCodes.NOT_FOUND)
  //     .json({ error: "Question not found" });
  // }
  // const question = questionRows[0];
  // return res.status(StatusCodes.OK).json({ question });
}
module.exports = { postQuestion, allQuestions, singleQuestion };
