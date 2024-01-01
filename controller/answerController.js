const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");

//post answer function
async function postAnswer(req, res) {
  const { answer } = req.body;
  const { questionid } = req.params;
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide the answer content" });
  }

  try {
    // check if the client posts an identical answer
    const [existingAnswer] = await dbConnection.query(
      "SELECT questionid, userid FROM answers WHERE answer = ?",
      [answer]
    );

    if (existingAnswer.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Your answer is identical to a previous one.");
    }
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Something went wrong. Please try again");
  }

  // Get user information from the JWT token
  const userid = req.user.userid;
  const username = req.user.username;

  const [insertResult] = await dbConnection.query(
    "INSERT INTO answers (userid, username, questionid, answer) VALUES (?, ?, ?, ?)",
    [userid, username, questionid, answer]
  );

  const insertedAnswerId = insertResult.insertId;

  const email = req.user.email;

  return res.status(StatusCodes.ACCEPTED).json({
    message: "Answer posted successfully",
    answer_id: insertedAnswerId,
    questionid,
    email,
    username,
  });
}

//get answer function

async function getAnswer(req, res) {
  const { questionid } = req.params;

  try {
    const [answers] = await dbConnection.query(
      "SELECT * FROM answers WHERE questionid = ?",
      [questionid]
    );

    if (answers.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "No answers found for the specified question",
      });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Answers found for the specified question",
      answers,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Something went wrong. Please try again");
  }
}

module.exports = { postAnswer, getAnswer };
