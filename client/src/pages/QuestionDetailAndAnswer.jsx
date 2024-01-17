import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axiosConfig";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaUser } from "react-icons/fa6";

function QuestionDetailAndAnswer() {
  const token = localStorage.getItem("token");

  const { questionid } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [msg, setMsg] = useState("");

  const textDom = useRef();

  useEffect(() => {
    if (token) {
      checkLogedIn();
    } else {
      navigate("/");
    }
    fetchQuestion();
    allAnswer();
  }, []);

  // useEffect(() => {
  // 	if (user) {
  // 		checkLogedIn();
  // 	} else {
  // 		navigate("/");
  // 	}
  // }, []);

  const checkLogedIn = async () => {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // storeUser(data.user);
      // await fetchQuestion();
    } catch (error) {
      alert1("Please log in to your account first.");
      navigate("/");
      console.log(error.message);
    }
  };
  // /singleQuestion/:questionid

  const fetchQuestion = async () => {
    try {
      const { data } = await axios.get(
        `question/singleQuestion/${questionid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);

      setQuestion(data.question);
    } catch (error) {
      console.log(error.message);
    }
  };

  const allAnswer = async (id) => {
    try {
      const { data } = await axios.get(`answer/getAnswer/${questionid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data)
      setAnswers(data.answers);
    } catch (error) {
      console.log(error.message);
    }
  };

  const postAnswer = async (e) => {
    e.preventDefault();

    setMsg("");

    try {
      const { data } = await axios.post(
        `answer/answer/${questionid}`,
        {
          answer: textDom.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      // await fetchQuestion();
      textDom.current.value = "";
      setMsg("answer posted");
      setTimeout(() => {
        setMsg("");
      }, 5000);

      allAnswer();
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <Container>
        <h2 className="my-5">Question</h2>
        <div className="">
          <h4 className=" text-dark">{question[0]?.title}</h4>
          <h6>{question[0]?.description}</h6>
        </div>
        <hr />
        <h1>Answer From The Community </h1>
        <hr />

        {/* map */}
        {answers?.map((el, i) => {
          return (
            <div key={i} className="row">
              <div className="col-3 col-md-2 col-lg-1 user">
                <div className="avatar">
                  <FaUser />
                </div>
                <div className="username">{el.username}</div>
              </div>
              <div className="col-md-9 col-8">
                <p className="answer">{el.answer}</p>
              </div>
              <hr className="w-75 mt-2" />
            </div>
          );
        })}
        <div className="my-5 text-center">
          <h4>Answer The Above Question </h4>
        </div>
        <Form onSubmit={postAnswer}>
          <div className="my-3 ">
            <Form.Control
              ref={textDom}
              as="textarea"
              rows="4"
              placeholder="Your Answer ..."
            ></Form.Control>
          </div>
          <Button type="submit" className="mb-5">
            Post Your Anwser
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default QuestionDetailAndAnswer;
