const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt=require("jsonwebtoken")

//register
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all information!" });
  }
  try {
    const [user] = await dbConnection.query(
      "SELECT username, userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    // return res.json({user:user})
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "user already registerd!" });
    }
    if (password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "password must be more than 8 characters!" });
    }
    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "user registered!" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}

//login
async function login(req, res) {
 const {email, password} = req.body
 if(!email || !password){
  return res.status(StatusCodes.BAD_REQUEST).json({msg:"please enter all reqired fields!"})
 }
 try {
  const [user] = await dbConnection.query(
    "SELECT  userid, username,password FROM users WHERE  email = ?",
    [email])
    if(user.length==0){
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential"})
    }
    //compare password
    const isMatch=await bcrypt.compare(password,user[0].password)
    if(!isMatch){
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential"})
    }

    const username= user[0].username
    const userid= user[0].userid
    const token= jwt.sign({username, userid},"secret", {expiresIn:"id"})




 } catch (error) {
  console.log(error.message);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "something went wrong, try again later!" });
 }

}

async function checkUser(req, res) {
  res.send("check user");
}

module.exports = { register, login, checkUser };
