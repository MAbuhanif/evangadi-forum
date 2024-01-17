const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");

//post answer function
async function postAnswer(req, res) {
  const { answer } = req.body;
  const { questionid } = req.params;
  // const userid = req.user.id;
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide the answer" });
  }

  try {
    const answerid = uuidv4();

    await dbConnection.query(
      "INSERT INTO answer (answerid, questionid, userid, answer) VALUES (?, ?, ?, ?)",
      [answerid, questionid, req.user.userid, answer]
    );
    return res.status(StatusCodes.ACCEPTED).json({
      message: "Answer posted successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Something went wrong. Please try again");
  }
}

//get answer function

async function getAnswer(req, res) {
  const { questionid } = req.params;

  try {
    const allAnswersForQuestion = `SELECT username, answer FROM answer JOIN users ON answer.userid = users.userid WHERE answer.questionid = ?`;
    const [answers] = await dbConnection.query(allAnswersForQuestion, [
      questionid,
    ]);

    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Something went wrong. Please try again");
  }
}

module.exports = { postAnswer, getAnswer };
